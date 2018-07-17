/*
 | Copyright © 2014 - 2018 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define([
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/Deferred',
  'dojo/promise/all',
  'dojo/string',
  'esri/arcade/arcade',
  'esri/arcade/Feature',
  'esri/graphic',
  './generalUtils'
], function (
  array,
  lang,
  Deferred,
  all,
  string,
  Arcade,
  ArcadeFeature,
  Graphic,
  generalUtils
) {
  var mo = {};
  /*------------------------------------------------------------------------------------------------------------------*/

  /**
   * Converts the text of a custom popup into a multiline label
   * specification; conversion splits text into lines on <br>s,
   * removes HTML tags, and changes field tags from popup style to
   * string.substitute form.
   * @param {string} popupDesc Custom popup text
   * @return {string} Label spec
   */
  mo.convertPopupToLabelSpec = function (popupDesc) {
    var desc;

    // e.g., Occupant<br/>{FULLADDR}<br />{MUNICIPALITY}, IL {PSTLZIP5}
    // Sanitize the description after converting <br>s and </p>s to line breaks
    desc = generalUtils.sanitizeNoTags(mo.convertBreaksToEOLs(mo.convertEndParasToEOLs(popupDesc))).trim();

    // Change the open brace used for attribute names to "${" so that we can use dojo/string's substitute()
    desc = desc.replace(/\{/gi, '${');

    // Remove non-breaking spaces, which aren't rendered correctly in CSV output and aren't needed in PDF output
    desc = desc.replace(/\u00a0/gi, ' ');

    // Split on the line breaks
    desc = desc.split('\n');

    // Trim each line, since HTML pretty much does that
    desc = array.map(desc, function (line) {
      return line.trim();
    });

    return desc;
  };

  /**
   * Creates labels from features.
   * @param {array} features Features whose attributes are to be
   *        used to populate labels
   * @param {string} labelLineTemplates Label specification as created by
   *        convertPopupToLabelSpec
   * @return {Deferred} Array of labels; each label is an array of
   *         label line strings
   */
  mo.createLabelsFromFeatures = function (features, labelLineTemplates) {
    var deferred = new Deferred(), content = [], promises = [], relatedRecordsFound = 0;

    if (labelLineTemplates.relationships) {
      // For each feature,
      array.forEach(features, function (feature) {

        // For each relationship in the label,
        mo.objEach(labelLineTemplates.relationships, function (relationship, relationshipId) {
          var promise = new Deferred(), relatedQuery = relationship.relatedQuery, objectId;
          promises.push(promise);

          // Query the relationship for this feature
          objectId = feature.attributes[relationship.operLayer.layerObject.objectIdField];
          relatedQuery.objectIds = [objectId];
          relationship.operLayer.layerObject.queryRelatedFeatures(relatedQuery, function (relatedRecords) {
            var labels = [], relatedFeatures;

            if (relatedRecords[objectId] && relatedRecords[objectId].features) {
              relatedFeatures = relatedRecords[objectId].features;

              array.forEach(relatedFeatures, function (relatedFeature) {
                var labelLines = [], attributes, prefix, newKey, featureWithRelationshipAttribs;

                // Merge the base and related feature attributes and create the label
                // Prefix related feature's attributes with "relationships/<id>/" to match popup
                attributes = feature.attributes;
                prefix = 'relationships/' + relationshipId + '/';
                mo.objEach(relatedFeature.attributes, function (value, key) {
                  newKey = prefix + key;
                  attributes[newKey] = value;
                });

                featureWithRelationshipAttribs = new Graphic(feature.geometry, null, attributes);

                // Substitute attribute values and resolved Arcade expressions into label lines
                array.forEach(labelLineTemplates, function (labelLineRule) {
                  labelLines.push(string.substitute(labelLineRule,
                    mo.combineFeatureAttributesAndExpressionResolutions(
                      featureWithRelationshipAttribs, labelLineTemplates.parsedExpressions),
                    mo.useEmptyStringForNull));
                });
                labels.push(labelLines);
              });
            }

            promise.resolve(labels);
          });
        });
      });

      all(promises).then(function (results) {
        // Look at the related records for each found address
        array.forEach(results, function (labels) {
          // For each found address, save its labels
          array.forEach(labels, function (labelLines) {
            ++relatedRecordsFound;
            content.push(labelLines);
          });
        });
        console.log(relatedRecordsFound + ' related address features found');
        deferred.resolve(content);
      });

    } else {
      array.forEach(features, function (feature) {
        var labelLines = [];

        // Substitute attribute values and resolved Arcade expressions into label lines
        array.forEach(labelLineTemplates, function (labelLineRule) {
          labelLines.push(string.substitute(labelLineRule,
            mo.combineFeatureAttributesAndExpressionResolutions(feature, labelLineTemplates.parsedExpressions),
            mo.useEmptyStringForNull));
        });

        content.push(labelLines);
      });
      deferred.resolve(content);
    }

    return deferred;
  };

  /**
   * Parses Arcade expression infos.
   * @param {array} expressionInfos Expression info list from popupInfo
   * @return {object} List of parsed expressions keyed by the expression name
   */
  mo.parseArcadeExpressions = function (expressionInfos) {
    var parsedExpressions;
    if (Array.isArray(expressionInfos) && expressionInfos.length > 0) {
      parsedExpressions = {};
      array.forEach(expressionInfos, function (info) {
        parsedExpressions[info.name] = Arcade.parseScript(info.expression);
      });
    }
    return parsedExpressions;
  };

  /**
   * Initializes the Arcade context with an ArcadeFeature.
   * @param {object} feature Feature to convert into an ArcadeFeature and to add to the context's vars object
   * @return {object} Arcade context object
   */
  mo.initArcadeContext = function (feature) {
    var context = {
      vars: {}
    };
    context.vars.$feature = new ArcadeFeature(feature);
    return context;
  };

  /**
   * Creates a list of feature attributes and resolved Arcade expressions for the feature.
   * @param {object} feature Feature whose attributes are to be used
   * @param {object} parsedExpressions Parsed Arcade expressions keyed by the expression name; each expression
   *        is resolved and added to the output object keyed by 'expression/' + the expression's name
   * @return {object} Combination of feature attributes and resolved expressions
   */
  mo.combineFeatureAttributesAndExpressionResolutions = function (feature, parsedExpressions) {
    var attributesAndExpressionResolutions, arcadeContext, name, resolvedExpression;

    // Resolve Arcade expressions for this feature; convert to string in case its return type is not already string
    attributesAndExpressionResolutions = lang.mixin({}, feature.attributes);
    if (parsedExpressions) {
      arcadeContext = mo.initArcadeContext(feature);

      for (name in parsedExpressions) {
        resolvedExpression = Arcade.executeScript(parsedExpressions[name], arcadeContext);
        attributesAndExpressionResolutions['expression/' + name] =
          resolvedExpression ? resolvedExpression.toString() : '';
      }
    }

    return attributesAndExpressionResolutions;
  };

  /**
   * Converts </p>s into CRLFs.
   * @param {string} html Text to scan
   * @return {string} Converted text
   */
  mo.convertEndParasToEOLs = function (html) {
    var html2 = html, matches = html.match(/<\/p>/gi);
    array.forEach(matches, function (match) {
      html2 = html2.replace(match, '\n');
    });
    return html2;
  };

  /**
   * Converts <br>s into CRLFs.
   * @param {string} html Text to scan
   * @return {string} Converted text
   */
  mo.convertBreaksToEOLs = function (html) {
    var html2 = html, matches = html.match(/<br\s*\/?>/gi);
    array.forEach(matches, function (match) {
      html2 = html2.replace(match, '\n');
    });
    return html2;
  };

  /**
   * Insures that a string is not undefined or null.
   * @param {string} str String to check
   * @return {string} str, or '' if str is undefined, null, or
   *         empty
   */
  mo.useEmptyStringForNull = function (str) {
    return str ? str : '';
  };

  /**
   * Interates over the items in an associative array (forIn).
   * @param {object} obj Object to interate over
   * @param {function} fcn Function to call for each item
   * @param {object} scope Scope to apply to function call
   */
  mo.objEach = function (obj, fcn, scope){
    var key;
    for (key in obj){
      if(obj.hasOwnProperty(key)){
        fcn.call(scope, obj[key], key);
      }
    }
  };

  /*------------------------------------------------------------------------------------------------------------------*/
  return mo;
});
