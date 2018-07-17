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
  'esri/request',
  'esri/geometry/geometryEngine',
  'dojo/Deferred',
  'dojo/_base/lang',
  'jimu/dijit/Message',
  'dojo/_base/array'
], function (
  esriRequest,
  geometryEngine,
  Deferred,
  lang,
  Message,
  array
) {

  var mo = {};

  mo.units = {
    "feet": {
      "lengthUnit": "feet",
      "areaUnit": "square-feet",
      "bufferUnit": "UNIT_FOOT",
      "lengthAbbr": window.jimuNls.units.feetAbbr,
      "areaAbbr": window.jimuNls.units.squareFeetAbbr
    },
    "meters": {
      "lengthUnit": "meters",
      "areaUnit": "square-meters",
      "bufferUnit": "UNIT_METER",
      "lengthAbbr": window.jimuNls.units.metersAbbr,
      "areaAbbr": window.jimuNls.units.squareMetersAbbr
    },
    "miles": {
      "lengthUnit": "miles",
      "areaUnit": "square-miles",
      "bufferUnit": "UNIT_STATUTE_MILE",
      "lengthAbbr": window.jimuNls.units.milesAbbr,
      "areaAbbr": window.jimuNls.units.squareMilesAbbr
    },
    "yards": {
      "lengthUnit": "yards",
      "areaUnit": "square-yards",
      "bufferUnit": "UNIT_SURVEY_YARD",
      "lengthAbbr": window.jimuNls.units.yardsAbbr,
      "areaAbbr": window.jimuNls.units.squareYardsAbbr
    },
    "kilometers": {
      "lengthUnit": "kilometers",
      "areaUnit": "square-kilometers",
      "bufferUnit": "UNIT_KILOMETER",
      "lengthAbbr": window.jimuNls.units.kilometersAbbr,
      "areaAbbr": window.jimuNls.units.squareKilometerAbbr
    }
  };

  /**
  * Switch to specified tab
  */
  mo.switchToTab = function (tabContainer, tabName) {
    tabContainer.selectTab(tabName);
  };

  /**
  * This function is used to remove negative exponential
  */
  mo.removeNegativeExponents = function (num) {
    var returnValue;
    if (num.toString().toLowerCase().split('e-').length > 1) {
      returnValue = 0;
    } else {
      returnValue = num;
    }
    return returnValue;
  };

  /**
  * This function is used to do rounding according to number of places
  */
  mo.applyRounding = function (value, places) {
    var returnValue, roundingValue;
    //if places not found by default show only 4 places
    if (isNaN(places) || places === null) {
      places = 2;
    }
    roundingValue = Math.pow(10, places);
    returnValue = (Math.round(value * roundingValue)) / roundingValue;
    returnValue = returnValue.toFixed(places);
    return returnValue;
  };


  /**
   * Returns the geodesic length of simplified geometry using geometry engine
   * @memberOf Screening/geometryUtils
   */
  mo.getLengthOfGeometry = function (geometry, lengthUnit) {
    var length, simplifiedGeometry;
    length = 0;
    simplifiedGeometry = geometryEngine.simplify(geometry);
    if (simplifiedGeometry) {
      //Check if feature's SpatialReference is webMercator or non-webMercator
      //to calculate length either in geodesic or planar respectively
      if (geometry.spatialReference.isWebMercator() || geometry.spatialReference
        .wkid === 4326) {
        length = geometryEngine.geodesicLength(simplifiedGeometry, lengthUnit);
      } else {
        length = geometryEngine.planarLength(simplifiedGeometry, lengthUnit);
      }
    }
    return length;
  };
  /**
   * Returns the object containing area of the geometry, in acre, sqMeters,sqFeet, and sqUSFeet.
   * if geometry is not simplified it will return 0 in all units
   * @memberOf Screening/geometryUtils
   */
  mo.getAreaOfGeometry = function (geometry, areaUnit) {
    var area, simplifiedGeometry;
    simplifiedGeometry = geometryEngine.simplify(geometry);
    area = 0;
    if (simplifiedGeometry) {
      //Check if feature's SpatialReference is webMercator or non-webMercator
      //to calculate area either in geodesic or planar respectively
      if (geometry.spatialReference.isWebMercator() || geometry.spatialReference
        .wkid === 4326) {
        area = geometryEngine.geodesicArea(simplifiedGeometry, areaUnit);
      } else {
        area = geometryEngine.planarArea(simplifiedGeometry, areaUnit);
      }
    }
    return area;
  };

  mo.deleteFeatures = function (layerURL, queryString) {
    var deferred = new Deferred();
    esriRequest({
      "url": layerURL + "/deleteFeatures",
      "content": {
        "where": queryString,
        "f": "json"
      }
    }, { usePost: true }).then(lang.hitch(this, function (deleteResult) {
      deferred.resolve(deleteResult);
    }), function () {
      deferred.reject(false);
    });
    return deferred.promise;
  };

  mo.getUnitsAbbreviation = function (geometryType, configuredUnit) {
    var unitsAbbr = "";
    if (geometryType === "esriGeometryPolygon" || geometryType === "polygon") {
      unitsAbbr = mo.units[configuredUnit].areaAbbr;
    } else if (geometryType === "esriGeometryPolyline" || geometryType === "polyline") {
      unitsAbbr = mo.units[configuredUnit].lengthAbbr;
    }
    return unitsAbbr;
  };

  /**
  * Round the values as per the configuration
  */
  mo.roundProjectCostValue = function (configuredRoundingType, cost) {
    var temp_cost = 0;
    cost = parseFloat(cost);
    switch (configuredRoundingType) {
      case "nearestWholeNumber":
        temp_cost = cost.toFixed();
        break;
      case "nearestTen":
        temp_cost = eval(cost.toFixed()) / 10; // jshint ignore : line
        temp_cost = eval(temp_cost.toFixed()) * 10; // jshint ignore : line
        break;
      case "nearestHundred":
        temp_cost = eval(cost.toFixed()) / 100; // jshint ignore : line
        temp_cost = eval(temp_cost.toFixed()) * 100; // jshint ignore : line
        break;
      case "nearestThousand":
        temp_cost = eval(cost.toFixed()) / 1000; // jshint ignore : line
        temp_cost = eval(temp_cost.toFixed()) * 1000; // jshint ignore : line
        break;
      case "nearestTenThousands":
        temp_cost = eval(cost.toFixed()) / 10000; // jshint ignore : line
        temp_cost = eval(temp_cost.toFixed()) * 10000; // jshint ignore : line
        break;
      default:
        temp_cost = cost.toFixed(2);
    }
    return temp_cost;
  };

  /**
  * Fetch fields for project asset table
  */
  mo.getPrjAssetTableFields = function (layer) {
    var prjTableFieldInfo = {};
    array.forEach(layer.fields, lang.hitch(this, function (field) {
      if (field.name.toUpperCase() === "ASSETGUID") {
        prjTableFieldInfo.ASSETGUID = field.name;
      } else if (field.name.toUpperCase() === "COSTEQUATION") {
        prjTableFieldInfo.COSTEQUATION = field.name;
      } else if (field.name.toUpperCase() === "SCENARIO") {
        prjTableFieldInfo.SCENARIO = field.name;
      } else if (field.name.toUpperCase() === "TEMPLATENAME") {
        prjTableFieldInfo.TEMPLATENAME = field.name;
      } else if (field.name.toUpperCase() === "GEOGRAPHYGUID") {
        prjTableFieldInfo.GEOGRAPHYGUID = field.name;
      } else if (field.name.toUpperCase() === "PROJECTGUID") {
        prjTableFieldInfo.PROJECTGUID = field.name;
      }
    }));
    prjTableFieldInfo.OBJECTID = layer.objectIdField;
    return prjTableFieldInfo;
  };

  /**
  * Fetch fields for project layer
  */
  mo.getPrjLayerFields = function (layer) {
    var prjLayerFieldInfo = {};
    array.forEach(layer.fields, lang.hitch(this, function (field) {
      if (field.name.toUpperCase() === "PROJECTNAME") {
        prjLayerFieldInfo.PROJECTNAME = field.name;
      } else if (field.name.toUpperCase() === "DESCRIPTION") {
        prjLayerFieldInfo.DESCRIPTION = field.name;
      } else if (field.name.toUpperCase() === "TOTALASSETCOST") {
        prjLayerFieldInfo.TOTALASSETCOST = field.name;
      } else if (field.name.toUpperCase() === "GROSSPROJECTCOST") {
        prjLayerFieldInfo.GROSSPROJECTCOST = field.name;
      } else if (field.name.toUpperCase() === "GLOBALID") {
        prjLayerFieldInfo.GLOBALID = field.name;
      }
    }));
    return prjLayerFieldInfo;
  };

  /**
  * Fetch fields for project multiplier table
  */
  mo.getPrjMultiplierFields = function (layer) {
    var prjMultiplierFieldInfo = {};
    array.forEach(layer.fields, lang.hitch(this, function (field) {
      if (field.name.toUpperCase() === "DESCRIPTION") {
        prjMultiplierFieldInfo.DESCRIPTION = field.name;
      } else if (field.name.toUpperCase() === "TYPE") {
        prjMultiplierFieldInfo.TYPE = field.name;
      } else if (field.name.toUpperCase() === "VALUE") {
        prjMultiplierFieldInfo.VALUE = field.name;
      } else if (field.name.toUpperCase() === "COSTINDEX") {
        prjMultiplierFieldInfo.COSTINDEX = field.name;
      } else if (field.name.toUpperCase() === "PROJECTGUID") {
        prjMultiplierFieldInfo.PROJECTGUID = field.name;
      }
    }));
    prjMultiplierFieldInfo.OBJECTID = layer.objectIdField;
    return prjMultiplierFieldInfo;
  };

  /**
   * Show message
   */
  mo.showMessage = function (msg) {
    var alertMessage = new Message({
      message: msg
    });
    alertMessage.message = msg;
  };

  /**
   * This function is used to evaluate equations
   */
  mo.evaluate = function (formula) {
    var func = new Function("return " + formula); // jshint ignore:line
    return func();
  };

  /**
   * This function is used to validate cost equations
   */
  mo.validateEquation = function (value) {
    var finalValue;
    //return if value is empty or value has &,| or a comma symbol
    if (value === "" || value.indexOf("&") > -1 || value.indexOf("|") > -1 ||
      value.indexOf(",") > -1) {
      return false;
    }
    //replace values of Measure/TotalMeasure/TotalCount
    value = value.replace(/{measure}/ig, 1); //to replace all occurrences of measure
    value = value.replace(/{totalmeasure}/ig, 1); //to replace all occurrences of total measure
    value = value.replace(/{totalcount}/ig, 1); //to replace all occurrences of total count
    //after replacement if any brackets are available it is invalid equation
    if (value.indexOf('{') !== -1 || value.indexOf('}') !== -1) {
      return false;
    }
    try {
      finalValue = mo.evaluate(value);
      //return false if final value is not finite -(NaN/Infinity)
      if (!isFinite(finalValue)) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      return false;
    }
  };
  return mo;
});