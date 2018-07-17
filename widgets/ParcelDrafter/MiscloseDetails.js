///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'jimu/BaseWidget',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./MiscloseDetails.html',
  'dojo/_base/lang',
  'dojo/Evented',
  'dojo/dom-class',
  'dojo/dom-attr'
],
  function (
    declare,
    BaseWidget,
    _WidgetsInTemplateMixin,
    MiscloseDetailsTemplate,
    lang,
    Evented,
    domClass,
    domAttr
  ) {
    return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'jimu-widget-ParcelDrafter-MisclosedDetails',
      templateString: MiscloseDetailsTemplate,
      details: null, //Object to hold the calculated misclose info

      constructor: function (options) {
        lang.mixin(this, options);
      },

      postCreate: function () {
        this.inherited(arguments);
        domClass.add(this.domNode, "esriCTFullWidth");
        //if field is configured for statedArea then show it and set validator according to field
        if (this.config.polygonLayer.statedArea &&
          this.config.polygonLayer.statedArea.hasOwnProperty('name')) {
          domClass.remove(this.traverseStatedAreaNode, "esriCTHidden");
          this.traverseStatedArea.trim = true;
          //if stated area field is not nullable it should be an required field
          if (!this.config.polygonLayer.statedArea.nullable) {
            this.traverseStatedArea.required = true;
          }
          //if selected field is numeric set the validator to accept numbers only
          if (this.numberFieldTypes.indexOf(this.config.polygonLayer.statedArea.type) >= 0) {
            this.traverseStatedArea.validator = lang.hitch(this, function (value) {
              //if statedArea is required then it should not have null or empty value
              if (!this.config.polygonLayer.statedArea.nullable) {
                if (value === null || value === "") {
                  return false;
                }
              }
              // validate if valid value according to type
              if (value !== "" &&
                !this.validateNumericField(value, this.config.polygonLayer.statedArea.type)) {
                return false;
              }
              return true;
            });
          }
        }
        this._setBackgroundColorForDartTheme();
      },

      /**
      * This function overrides background color for dart theme
      * @memberOf widgets/ParcelDrafter/MiscloseDetails
      **/
      _setBackgroundColorForDartTheme: function () {
        // if applied Theme is for widget is dart Theme
        if (this.appConfig.theme.name === "DartTheme") {
          domClass.add(this.traverseDetailsContainer, "esriCTMiscloseHeaderDiv");
        }
      },

      /**
      * Returns the misclose info
      * @memberOf widgets/ParcelDrafter/MiscloseDetails
      **/
      getMiscloseDetails: function () {
        return this.details;
      },

      /**
      * Sets the misclose info in respective node accordingly
      * @memberOf widgets/ParcelDrafter/MiscloseDetails
      **/
      updateAccordingToPlanSettings: function (miscloseDetailsInfo) {
        domAttr.set(this.miscloseBearingNode, "innerHTML", miscloseDetailsInfo.miscloseBearing);
        domAttr.set(this.miscloseDistanceNode, "innerHTML", miscloseDetailsInfo.miscloseDistance);
        domAttr.set(this.calculatedAreaNode, "innerHTML", miscloseDetailsInfo.calculatedArea);
      },

      /**
      * Sets the misclose info in respective node and also sets its visibility accordingly
      * @memberOf widgets/ParcelDrafter/MiscloseDetails
      **/
      setMiscloseDetails: function (details) {
        this.details = details;
        if (details) {
          domAttr.set(this.miscloseBearingNode, "innerHTML", details.miscloseBearing);
          domAttr.set(this.miscloseDistanceNode, "innerHTML", details.miscloseDistance);
          //set misclose ratio
          if (details.miscloseRatio !== 0) {
            domClass.remove(this.traverseMiscloseRatioNode, "esriCTHidden");
            domAttr.set(this.miscloseRatioNode, "innerHTML", details.miscloseRatio);
          } else {
            domClass.add(this.traverseMiscloseRatioNode, "esriCTHidden");
          }
          //set accuracy
          if (details.accuracy) {
            domClass.add(this.traverseMiscloseRatioNode, "esriCTHidden");
            domClass.remove(this.traverseAccuracyNode, "esriCTHidden");
          } else {
            domClass.add(this.traverseAccuracyNode, "esriCTHidden");
          }
          //set calculated area
          if (details.calculatedArea) {
            domAttr.set(this.calculatedAreaNode, "innerHTML", details.calculatedArea);
            domClass.remove(this.traverseCalculatedAreaNode, "esriCTHidden");
          } else {
            domClass.add(this.traverseCalculatedAreaNode, "esriCTHidden");
          }
          domClass.add(this.noMiscloseCalculated, "esriCTHidden");
          domClass.remove(this.miscloseDetailsContainer, "esriCTHidden");
        } else {
          domClass.add(this.miscloseDetailsContainer, "esriCTHidden");
          domClass.remove(this.noMiscloseCalculated, "esriCTHidden");
        }
      }
    });
  });