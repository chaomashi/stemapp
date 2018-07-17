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
//====================================================================================================================//
define([
  'dojo/_base/array'
], function (
  array
) {
  var mo = {};
  /*------------------------------------------------------------------------------------------------------------------*/

  /**
   * Converts distance units codes to terms in the current language.
   * @param {object} nls The terms in the current language
   * @param {array} codeList List of distance units codes
   * @return {array} Corresponding list of natural-language terms
   */
  mo.unitCodesToLabels = function (nls, codeList) {
    var labelList = [];
    array.forEach(codeList, function (code) {
      switch (code) {
      case 'CENTIMETERS':
        labelList.push(nls.centimeters);
        break;
      case 'INCHES':
        labelList.push(nls.inches);
        break;
      case 'FEET':
        labelList.push(nls.feet);
        break;
      case 'YARDS':
        labelList.push(nls.yards);
        break;
      case 'METERS':
        labelList.push(nls.meters);
        break;
      case 'KILOMETERS':
        labelList.push(nls.kilometers);
        break;
      case 'MILES':
        labelList.push(nls.miles);
        break;
      default:
        labelList.push(code);
      }
    });
    return labelList;
  };

  /**
   * Converts units terms in the current language to distance units codes.
   * @param {object} nls The terms in the current language
   * @param {array} labelList List of natural-language units terms
   * @return {array} Corresponding list of distance units codes
   */
  mo.labelsToUnitCodes = function (nls, labelList) {
    var codeList = [];
    array.forEach(labelList, function (label) {
      switch (label) {
      case nls.centimeters:
        codeList.push('CENTIMETERS');
        break;
      case nls.inches:
        codeList.push('INCHES');
        break;
      case nls.feet:
        codeList.push('FEET');
        break;
      case nls.yards:
        codeList.push('YARDS');
        break;
      case nls.meters:
        codeList.push('METERS');
        break;
      case nls.kilometers:
        codeList.push('KILOMETERS');
        break;
      case nls.miles:
        codeList.push('MILES');
        break;
      default:
        codeList.push(label);
      }
    });
    return codeList;
  };

  /**
   * Converts draw tool codes to terms in the current language.
   * @param {object} nls The terms in the current language
   * @param {array} codeList List of draw tool codes
   * @return {array} Corresponding list of natural-language terms
   */
  mo.toolCodesToLabels = function (nls, codeList) {
    var labelList = [];
    array.forEach(codeList, function (code) {
      switch (code) {
      case 'POINT':
        labelList.push(nls.drawingToolsPoint);
        break;
      case 'LINE':
        labelList.push(nls.drawingToolsLine);
        break;
      case 'POLYLINE':
        labelList.push(nls.drawingToolsPolyline);
        break;
      case 'POLYGON':
        labelList.push(nls.drawingToolsPolygon);
        break;
      case 'FREEHAND_POLYGON':
        labelList.push(nls.drawingToolsFreehandPolygon);
        break;
      default:
        labelList.push(code);
      }
    });
    return labelList;
  };

  /**
   * Converts draw tool terms in the current language to draw tool codes.
   * @param {object} nls The terms in the current language
   * @param {array} labelList List of natural-language draw tool terms
   * @return {array} Corresponding list of draw tool codes
   */
  mo.labelsToToolCodes = function (nls, labelList) {
    var codeList = [];
    array.forEach(labelList, function (label) {
      switch (label) {
      case nls.drawingToolsPoint:
        codeList.push('POINT');
        break;
      case nls.drawingToolsLine:
        codeList.push('LINE');
        break;
      case nls.drawingToolsPolyline:
        codeList.push('POLYLINE');
        break;
      case nls.drawingToolsPolygon:
        codeList.push('POLYGON');
        break;
      case nls.drawingToolsFreehandPolygon:
        codeList.push('FREEHAND_POLYGON');
        break;
      default:
        codeList.push(label);
      }
    });
    return codeList;
  };

  /*------------------------------------------------------------------------------------------------------------------*/
  return mo;
});
