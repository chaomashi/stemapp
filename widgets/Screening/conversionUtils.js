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
define([],
  function () {
  var mo = {};
  mo.bearingFieldPlaces = 4;

  //Object that holds all the options and their keys for plan settings
  mo.planSettingsOptions = {
    "directionOrAngleType": ["northAzimuth", "southAzimuth", "quadrantBearing"],
    "directionOrAngleUnits": ["decimalDegree", "degreeMinuteSeconds"],
    "distanceAndLengthUnits": ["uSSurveyFeet", "meters"],
    "areaUnits": ["squareUsFeet", "acres", "squareMeters"],
    "circularCurveParameters": ["radiusAndChordLength", "radiusAndArcLength"]
  };

  /**
   * This function is used to get quadrant from quadrant shortcut.
   * @memberOf Screening/utils
   */
  mo.getQuadrant = function (quadrantShortcut) {
    var quadrantObj;
    quadrantObj = { "-1": "NE", "-2": "SE", "-3": "SW", "-4": "NW" };
    return quadrantObj[quadrantShortcut];
  };

  /**
   * This function is used to get quadrant shortcut from quadrant.
   * @memberOf Screening/utils
   */
  mo.getQuadrantShortcut = function (quadrant) {
    var quadrantObj;
    quadrant = quadrant.toUpperCase();
    quadrantObj = { "NE": "-1", "SE": "-2", "SW": "-3", "NW": "-4" };
    return quadrantObj[quadrant];
  };

  /**
   * This function is used to get quadrant shortcut from decimal degree.
   * This is used to identify the quadrant that a particular angle is in while converting to
   * a quadrant bearing.
   * @memberOf Screening/utils
   */
  mo.getQuadrantShortcutFromDD = function (decimalDegree) {
    var quadrantShortcut;
    if (decimalDegree >= 0 && decimalDegree <= 90) {
      quadrantShortcut = "-1";
    } else if (decimalDegree > 90 && decimalDegree <= 180) {
      quadrantShortcut = "-2";
    } else if (decimalDegree > 180 && decimalDegree < 270) {
      quadrantShortcut = "-3";
    } else if (decimalDegree >= 270 && decimalDegree < 360) {
      quadrantShortcut = "-4";
    }
    return quadrantShortcut;
  };

  /**
   * This function is used to get bearing in quadrant format from north azimuth bearing format.
   * It is used during screen digitization.
   * @memberOf Screening/utils
   */
  mo.getQuadrantAngleFromNADD = function (angle) {
    var quadrantInfo;
    quadrantInfo = mo.getQuadrantAngleAndShortcut(angle);
    return quadrantInfo.quadrant.charAt(0) + quadrantInfo.quadrantAngle +
      quadrantInfo.quadrant.charAt(1);
  };

  /**
   * This function is used to get south azimuth bearing from north azimuth bearing
   * @memberOf Screening/utils
   */
  mo.getSouthAzimuthFromNorthAzimuth = function (northAzimuthAngle) {
    var southAzimuthAngle;
    if (northAzimuthAngle > 180) {
      southAzimuthAngle = northAzimuthAngle - 180;
    } else if (northAzimuthAngle < 180) {
      southAzimuthAngle = northAzimuthAngle + 180;
    } else if (northAzimuthAngle === 180) {
      southAzimuthAngle = 0;
    }
    return southAzimuthAngle;
  };

  /**
   * This function is used to convert DMS to DD.
   * @memberOf Screening/utils
   */
  mo.DMStoDD = function (dmsObj) {
    var degreeValue, minutesValue, secondsValue, ddMinutes, ddSeconds, DD;
    degreeValue = Math.abs(parseFloat(dmsObj.degree));
    minutesValue = parseFloat(dmsObj.minutes);
    secondsValue = parseFloat(dmsObj.seconds);
    ddMinutes = minutesValue / 60;
    ddSeconds = secondsValue / 3600;
    DD = degreeValue + ddMinutes + ddSeconds;
    if (dmsObj.isNegative) {
      DD = -1 * DD;
    }
    return DD;
  };

  /**
   * This function is used to convert DD to DMS.
   * @memberOf Screening/utils
   */
  mo.DDtoDMS = function (ddObj) {
    var dmsObj, degree, minutes, seconds, totalSeconds, totalMins;
    totalSeconds = ddObj.angle * 3600;
    seconds = Math.round(totalSeconds % 60);
    /* jshint ignore:start */
    seconds = seconds == 60 ? 0 : seconds;
    /* jshint ignore:end */
    totalMins = (totalSeconds - seconds) / 60;
    minutes = Math.round(totalMins % 60);
    /* jshint ignore:start */
    minutes = minutes == 60 ? 0 : minutes;
    /* jshint ignore:end */
    degree = Math.round((totalMins - minutes) / 60);
    dmsObj = {
      "degree": degree,
      "minutes": minutes,
      "seconds": seconds
    };
    return dmsObj;
  };

  /**
   * This function is used to get bearing details from bearing format 0.
   * @memberOf Screening/utils
   */
  mo.getBearingObjForFormat0 = function (res) {
    var bearingObj, isNegative;
    bearingObj = {};
    bearingObj.degree = parseInt(res[1], 10);
    bearingObj.minutes = parseInt(res[2] || 0, 10);
    bearingObj.seconds = parseInt(res[3] || 0, 10);
    bearingObj.quadrant = mo.getQuadrant("-" + res[4]);
    bearingObj.quadrantShortcut = "-" + res[4];
    if (typeof res[1] === "string") {
      isNegative = res[1].charAt(0) === '-';
    }
    bearingObj.decimalDegrees = mo.DMStoDD({
      "degree": bearingObj.degree,
      "minutes": bearingObj.minutes,
      "seconds": bearingObj.seconds,
      "isNegative": isNegative
    });
    return bearingObj;
  };

  /**
   * This function is used to get bearing details from bearing format 1.
   * @memberOf Screening/utils
   */
  mo.getBearingObjForFormat1 = function (res) {
    var bearingObj, isNegative;
    bearingObj = {};
    bearingObj.degree = parseInt(res[2], 10);
    bearingObj.minutes = parseInt(res[3] || 0, 10);
    bearingObj.seconds = parseInt(res[4] || 0, 10);
    bearingObj.quadrant = res[1] + res[5];
    bearingObj.quadrantShortcut = mo.getQuadrantShortcut(res[1] + res[5]);
    if (typeof res[2] === "string") {
      isNegative = res[2].charAt(0) === '-';
    }
    bearingObj.decimalDegrees = mo.DMStoDD({
      "degree": bearingObj.degree,
      "minutes": bearingObj.minutes,
      "seconds": bearingObj.seconds,
      "isNegative": isNegative
    });
    return bearingObj;
  };

  /**
   * This function is used to get bearing details from bearing format 2.
   * @memberOf Screening/utils
   */
  mo.getBearingObjForFormat2 = function (res) {
    var bearingObj, isNegative;
    bearingObj = {};
    bearingObj.degree = parseInt(res[2], 10);
    bearingObj.minutes = parseInt(res[3] || 0, 10);
    bearingObj.seconds = parseInt(res[4] || 0, 10);
    bearingObj.quadrant = res[1] + res[5];
    bearingObj.quadrantShortcut = mo.getQuadrantShortcut(res[1] + res[5]);
    if (typeof res[2] === "string") {
      isNegative = res[2].charAt(0) === '-';
    }
    bearingObj.decimalDegrees = mo.DMStoDD({
      "degree": bearingObj.degree,
      "minutes": bearingObj.minutes,
      "seconds": bearingObj.seconds,
      "isNegative": isNegative
    });
    return bearingObj;
  };

  /**
   * This function is used to get bearing details from bearing format 3.
   * @memberOf Screening/utils
   */
  mo.getBearingObjForFormat3 = function (res) {
    var bearingObj, isNegative;
    bearingObj = {};
    bearingObj.degree = parseInt(res[1], 10);
    bearingObj.minutes = parseInt(res[2] || 0, 10);
    bearingObj.seconds = parseInt(res[3] || 0, 10);
    if (typeof res[1] === "string") {
      isNegative = res[1].charAt(0) === '-';
    }
    bearingObj.decimalDegrees = mo.DMStoDD({
      "degree": bearingObj.degree,
      "minutes": bearingObj.minutes,
      "seconds": bearingObj.seconds,
      "isNegative": isNegative
    });
    bearingObj.quadrantShortcut = mo.getQuadrantShortcutFromDD(bearingObj.decimalDegrees);
    bearingObj.quadrant = mo.getQuadrant(bearingObj.quadrantShortcut);
    return bearingObj;
  };

  /**
   * This function is used to get bearing details from bearing format 4.
   * @memberOf Screening/utils
   */
  mo.getBearingObjForFormat4 = function (res) {
    var dmsObj, bearingObj;
    dmsObj = mo.DDtoDMS({
      "angle": res[1]
    });
    bearingObj = {};
    bearingObj.degree = dmsObj.degree;
    bearingObj.minutes = dmsObj.minutes;
    bearingObj.seconds = dmsObj.seconds;
    bearingObj.decimalDegrees = res[1];
    bearingObj.quadrantShortcut = mo.getQuadrantShortcutFromDD(bearingObj.decimalDegrees);
    bearingObj.quadrant = mo.getQuadrant(bearingObj.quadrantShortcut);
    return bearingObj;
  };

  /**
   * This function is used to get bearing details from bearing format 5.
   * @memberOf Screening/utils
   */
  mo.getBearingObjForFormat5 = function (res) {
    var bearingObj, isNegative;
    bearingObj = {};
    bearingObj.degree = parseInt(res[1], 10);
    bearingObj.minutes = parseInt(res[2] || 0, 10);
    bearingObj.seconds = parseInt(res[3] || 0, 10);
    if (typeof res[1] === "string") {
      isNegative = res[1].charAt(0) === '-';
    }
    bearingObj.decimalDegrees = mo.DMStoDD({
      "degree": bearingObj.degree,
      "minutes": bearingObj.minutes,
      "seconds": bearingObj.seconds,
      "isNegative": isNegative
    });
    bearingObj.quadrantShortcut = mo.getQuadrantShortcutFromDD(bearingObj.decimalDegrees);
    bearingObj.quadrant = mo.getQuadrant(bearingObj.quadrantShortcut);
    return bearingObj;
  };

  /**
   * This function is used to get bearing details from bearing format 6.
   * @memberOf Screening/utils
   */
  mo.getBearingObjForFormat6 = function (res) {
    var bearingObj, isNegative;
    bearingObj = {};
    bearingObj.degree = parseInt(res[1], 10);
    bearingObj.minutes = parseInt(res[2] || 0, 10);
    bearingObj.seconds = parseInt(res[3] || 0, 10);
    bearingObj.quadrantShortcut = res[4];
    bearingObj.quadrant = mo.getQuadrant(bearingObj.quadrantShortcut);
    if (typeof res[1] === "string") {
      isNegative = res[1].charAt(0) === '-';
    }
    bearingObj.decimalDegrees = mo.DMStoDD({
      "degree": bearingObj.degree,
      "minutes": bearingObj.minutes,
      "seconds": bearingObj.seconds,
      "isNegative": isNegative
    });
    return bearingObj;
  };

  /**
   * This function is used to get bearing details from bearing format 7.
   * @memberOf Screening/utils
   */
  mo.getBearingObjForFormat7 = function (res) {
    var bearingObj, dmsObj;
    bearingObj = {};
    bearingObj.decimalDegrees = res[2];
    dmsObj = mo.DDtoDMS({
      "angle": bearingObj.decimalDegrees
    });
    bearingObj.degree = parseInt(dmsObj.degree, 10);
    bearingObj.minutes = parseInt(dmsObj.minutes || 0, 10);
    bearingObj.seconds = parseInt(dmsObj.seconds || 0, 10);
    bearingObj.quadrant = res[1] + res[3];
    bearingObj.quadrantShortcut = mo.getQuadrantShortcut(bearingObj.quadrant);
    return bearingObj;
  };

  /**
   * This function is used to get bearing details from bearing format 8.
   * @memberOf Screening/utils
   */
  mo.getBearingObjForFormat8 = function (res) {
    var bearingObj, dmsObj;
    bearingObj = {};
    bearingObj.decimalDegrees = res[1];
    dmsObj = mo.DDtoDMS({
      "angle": bearingObj.decimalDegrees
    });
    bearingObj.degree = parseInt(dmsObj.degree, 10);
    bearingObj.minutes = parseInt(dmsObj.minutes || 0, 10);
    bearingObj.seconds = parseInt(dmsObj.seconds || 0, 10);
    bearingObj.quadrantShortcut = res[2];
    bearingObj.quadrant = mo.getQuadrant(bearingObj.quadrantShortcut);
    return bearingObj;
  };

  /**
   * This function is used to quadrant angle and quadrant from north azimuth angle
   * @memberOf Screening/utils
   */
  mo.getQuadrantAngleAndShortcut = function (decimalDegree) {
    var quadrantObj = {};
    if (decimalDegree >= 0 && decimalDegree <= 90) {
      quadrantObj.quadrantAngle = decimalDegree;
      quadrantObj.quadrant = "NE";
    } else if (decimalDegree > 90 && decimalDegree <= 180) {
      quadrantObj.quadrantAngle = 180 - decimalDegree;
      quadrantObj.quadrant = "SE";
    } else if (decimalDegree > 180 && decimalDegree < 270) {
      quadrantObj.quadrantAngle = decimalDegree - 180;
      quadrantObj.quadrant = "SW";
    } else if (decimalDegree >= 270 && decimalDegree < 360) {
      quadrantObj.quadrantAngle = 360 - decimalDegree;
      quadrantObj.quadrant = "NW";
    }
    return quadrantObj;
  };

  /**
   * This function is used to do rounding calculation for seconds
   * @memberOf Screening/utils
   */
  mo.roundSeconds = function (seconds) {
    seconds = Number(seconds);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return seconds;
  };

  /**
   * This function is used to do rounding according to number of places
   * @memberOf Screening/utils
   */
  mo.honourPopupRounding = function (places, value) {
    var returnValue, roundingValue;
    if (isNaN(value)) {
      return value;
    }
    //if places not found by default show only 4 places
    if (isNaN(places) || places === null) {
      places = 4;
    }
    roundingValue = Math.pow(10, places);
    returnValue = (Math.round(value * roundingValue)) / roundingValue;
    returnValue = returnValue.toFixed(places);
    return parseFloat(returnValue);
  };

  /**
   * This function is used to convert bearing to all possible output formats.
   * @memberOf Screening/utils
   */
  mo.convertBearingToOutputFormats = function (bearingObj) {
    var dmsObj, bearingFormat, quadrantObj, naMinutes, naSeconds,
      saMinutes, saSeconds, saDD, naDD, qbDMSObj, qbMinutes, qbSeconds;
    dmsObj = {};
    bearingFormat = {};
    if (bearingObj.degree === 360) {
      bearingObj.degree = 0;
    }
    // output for naDD
    naDD = bearingObj.decimalDegrees;
    if (naDD === 360) {
      naDD = 0;
    }
    bearingFormat.naDD = naDD;
    bearingFormat.naDDRound = mo.honourPopupRounding(mo.bearingFieldPlaces, naDD);
    if (Number(bearingFormat.naDDRound) === 360) {
      bearingFormat.naDDRound = 0;
    }
    // output for naDMS
    naMinutes = bearingObj.minutes < 10 ? "0" + bearingObj.minutes : bearingObj.minutes;
    naSeconds = bearingObj.seconds;
    // display minutes & seconds if its greater than 0
    if ((Number(naMinutes) > 0) && (Number(mo.roundSeconds(naSeconds)) > 0)) {
      bearingFormat.naDMS =
        bearingObj.degree + "-" + naMinutes + "-" + mo.roundSeconds(naSeconds);
      // display minutes & seconds if seconds is greater than 0
    } else if ((Number(naMinutes) === 0) && (Number(mo.roundSeconds(naSeconds)) > 0)) {
      bearingFormat.naDMS =
        bearingObj.degree + "-" + naMinutes + "-" + mo.roundSeconds(naSeconds);
      // display only minutes if its greater than 0 & seconds is 0
    } else if ((Number(naMinutes) > 0) &&
      (Number(mo.roundSeconds(naSeconds)) === 0)) {
      bearingFormat.naDMS = bearingObj.degree + "-" + naMinutes + "-" + "00";
      // display only degree if minutes & seconds is 0
    } else if ((Number(naMinutes) === 0) &&
      (Number(mo.roundSeconds(naSeconds)) === 0)) {
      bearingFormat.naDMS = bearingObj.degree + "-" + "00" + "-" + "00";
    }
    // output for qb3DD
    quadrantObj = mo.getQuadrantAngleAndShortcut(naDD);
    bearingFormat.qb3DD = quadrantObj.quadrant.charAt(0) + quadrantObj.quadrantAngle +
      quadrantObj.quadrant.charAt(1);
    bearingFormat.qb3DDRound = quadrantObj.quadrant.charAt(0) +
      mo.honourPopupRounding(mo.bearingFieldPlaces, quadrantObj.quadrantAngle) +
      quadrantObj.quadrant.charAt(1);
    // output for qb3DMS
    qbDMSObj = mo.DDtoDMS({
      "angle": quadrantObj.quadrantAngle
    });
    qbMinutes = qbDMSObj.minutes < 10 ? "0" + qbDMSObj.minutes : qbDMSObj.minutes;
    qbSeconds = qbDMSObj.seconds;
    // display minutes & seconds if its greater than 0
    if ((Number(qbMinutes) > 0) && (Number(mo.roundSeconds(qbSeconds)) > 0)) {
      bearingFormat.qb3DMS = quadrantObj.quadrant.charAt(0) +
        qbDMSObj.degree + "-" + qbMinutes + "-" + mo.roundSeconds(qbSeconds) +
        quadrantObj.quadrant.charAt(1);
      // display minutes & seconds if seconds is greater than 0
    } else if ((Number(qbMinutes) === 0) && (Number(mo.roundSeconds(qbSeconds)) > 0)) {
      bearingFormat.qb3DMS = quadrantObj.quadrant.charAt(0) +
        qbDMSObj.degree + "-" + qbMinutes + "-" + mo.roundSeconds(qbSeconds) +
        quadrantObj.quadrant.charAt(1);
      // display only minutes if its greater than 0 & seconds is 0
    } else if ((Number(qbMinutes) > 0) && (Number(mo.roundSeconds(qbSeconds)) === 0)) {
      bearingFormat.qb3DMS = quadrantObj.quadrant.charAt(0) +
        qbDMSObj.degree + "-" + qbMinutes + "-" + "00" + quadrantObj.quadrant.charAt(1);
      // display only degree if minutes & seconds is 0
    } else if ((Number(qbMinutes) === 0) &&
      (Number(mo.roundSeconds(qbSeconds)) === 0)) {
      bearingFormat.qb3DMS = quadrantObj.quadrant.charAt(0) +
        qbDMSObj.degree + "-" + "00" + "-" + "00" + quadrantObj.quadrant.charAt(1);
    }
    // output for saDD
    saDD = mo.getSouthAzimuthFromNorthAzimuth(naDD);
    if (saDD === 360) {
      saDD = 0;
    }
    bearingFormat.saDD = saDD;
    bearingFormat.saDDRound = mo.honourPopupRounding(mo.bearingFieldPlaces, saDD);
    if (Number(bearingFormat.saDDRound) === 360) {
      bearingFormat.saDDRound = 0;
    }
    // output for saDMS
    dmsObj = mo.DDtoDMS({
      "angle": saDD
    });
    if (dmsObj.degree === 360) {
      dmsObj.degree = 0;
    }
    saMinutes = dmsObj.minutes < 10 ? "0" + dmsObj.minutes : dmsObj.minutes;
    saSeconds = dmsObj.seconds;
    // display minutes & seconds if its greater than 0
    if ((Number(saMinutes) > 0) && (Number(mo.roundSeconds(saSeconds)) > 0)) {
      bearingFormat.saDMS = dmsObj.degree + "-" + saMinutes + "-" + mo.roundSeconds(saSeconds);
      // display minutes & seconds if seconds is greater than 0
    } else if ((Number(saMinutes) === 0) && (Number(mo.roundSeconds(saSeconds)) > 0)) {
      bearingFormat.saDMS = dmsObj.degree + "-" + saMinutes + "-" + mo.roundSeconds(saSeconds);
      // display only minutes if its greater than 0 & seconds is 0
    } else if ((Number(saMinutes) > 0) && (Number(mo.roundSeconds(saSeconds)) === 0)) {
      bearingFormat.saDMS = dmsObj.degree + "-" + saMinutes + "-" + "00";
      // display only degree if minutes & seconds is 0
    } else if ((Number(saMinutes) === 0) && (Number(mo.roundSeconds(saSeconds)) === 0)) {
      bearingFormat.saDMS = dmsObj.degree + "-" + "00" + "-" + "00";
    }
    return bearingFormat;
  };

  /**
   * This function is used to get bearing details from different formats
   * @memberOf Screening/utils
   */
  mo.getBearingDetailsOfRequiredFormat = function (res, i) {
    var bearingObj = {};
    switch (i) {
      case 0:
        bearingObj = mo.getBearingObjForFormat0(res);
        break;
      case 1:
        bearingObj = mo.getBearingObjForFormat1(res);
        break;
      case 2:
        bearingObj = mo.getBearingObjForFormat2(res);
        break;
      case 3:
        bearingObj = mo.getBearingObjForFormat3(res);
        break;
      case 4:
        bearingObj = mo.getBearingObjForFormat4(res);
        break;
      case 5:
        bearingObj = mo.getBearingObjForFormat5(res);
        break;
      case 6:
        bearingObj = mo.getBearingObjForFormat6(res);
        break;
      case 7:
        bearingObj = mo.getBearingObjForFormat7(res);
        break;
      case 8:
        bearingObj = mo.getBearingObjForFormat8(res);
        break;
    }
    return mo.convertBearingToOutputFormats(bearingObj);
  };

  /**
   * This function is used to create array of regex of valid bearings.
   * Assumptions:
   * 1. degrees are within -359 to +359. "+" character is considered invalid.
   * 2. minutes and seconds are 00 to 59 and are optional. single digit are invalid
   * 3. For Decimal Degrees unlimited precision is supported
   * 4. In Decimal Degrees .5 is invalid and has to preceded with 0 like 0.5
   * 5. Each regex returns result array having its deg, min, sec & seconds
   * in different array location
   * @memberOf Screening/utils
   */
  mo.getBearingFormatArr = function () {
    var formatRegExArr = [];
    // dd-mm-ss.ss-[1234]  (0)
    // RESULT OBJ : res[1] = degree; res[2] = minutes; res[3] = seconds;
    formatRegExArr.push({ "regex": /^((?:\-)?(?:3[0-5]\d|[12]\d{2}|[1-9]\d?|0))(?:\-(0|[0-5]?\d)\-(0|[0-5]\d))?\-([1-4])$/, "type": "degreeMinuteSeconds" }); // jshint ignore:line
    // [NS]dd-mm-ss.ss[EW]  (1)
    // RESULT OBJ : res[1] = quadrant 1st character; res[2] = degree; res[3] = minutes;
    // res[4] = seconds; res[5] = quadrant 2nd character;
    formatRegExArr.push({ "regex": /^([nNsS])((?:\-)?(?:3[0-5]\d|[12]\d{2}|[1-9]\d?|0))(?:\-(0|[0-5]?\d)\-(0|[0-5]\d))?([eEwW])$/, "type": "degreeMinuteSeconds" }); // jshint ignore:line
    // [NS]dd.mmssss[EW]  (2)
    // RESULT OBJ : res[1] = quadrant 1st character; res[2] = degree; res[3] = minutes;
    // res[4] = // seconds; res[5] = quadrant 2nd character;
    formatRegExArr.push({ "regex": /^([nNsS])((?:\-)?(?:3[0-5]\d|[12]\d{2}|[1-9]\d?|0))(?:\.([0-5]\d)(?:([0-5]\d))?)?([eEwW])$/, "type": "degreeMinuteSeconds" }); // jshint ignore:line
    // dd.mmss[ss]  (3)
    // RESULT OBJ : res[1] = degree; res[2] = minutes; res[3] = seconds;
    formatRegExArr.push({ "regex": /^((?:\-)?(?:3[0-5]\d|[12]\d{2}|[1-9]\d?|0))(?:\.([0-5]\d)(?:([0-5]\d))?)?$/, "type": "degreeMinuteSeconds" }); // jshint ignore:line
    // dd.dddd (4)
    // RESULT OBJ : res[1] = degree;
    formatRegExArr.push({ "regex": /^((?:(?:\-?)(?:3[0-5]\d|[12]\d{2}|[1-9]\d?|0)(?:\.\d+)?)|(?:\-?)(?:\.\d+))$/, "type": "decimalDegree" }); // jshint ignore:line
    // dd-mm-ss[.ss]  (5)
    // RESULT OBJ : res[1] = degree; res[2] = minutes; res[3] = seconds;
    formatRegExArr.push({ "regex": /^((?:\-)?(?:3[0-5]\d|[12]\d{2}|[1-9]\d?|0))(?:\-(0|[0-5]?\d)\-((?:[0-5]\d)))?$/, "type": "degreeMinuteSeconds" }); // jshint ignore:line
    // 'dd.mmssss-[1234]  (6)
    // RESULT OBJ : res[1] = degree; res[2] = minutes; res[3] = seconds;
    // res[4] = quadrant shortcut;
    formatRegExArr.push({ "regex": /^((?:\-)?(?:3[0-5]\d|[12]\d{2}|[1-9]\d?|0))(?:\.([0-5]\d)(?:([0-5]\d))?)?(\-[1-4])$/, "type": "degreeMinuteSeconds" }); // jshint ignore:line
    // [NS]dd.dddd[EW] (7)
    // RESULT OBJ : res[1] = quadrant 1st character; res[2] = degree; res[3] = quadrant 2nd
    // character;
    formatRegExArr.push({ "regex": /^([nNsS])((?:(?:\-?)(?:3[0-5]\d|[12]\d{2}|[1-9]\d?|0)(?:\.\d+)?)|(?:\-?)(?:\.\d+))([eEwW])$/, "type": "decimalDegree" }); // jshint ignore:line
    // dd.dddd-[1234] (8)
    // RESULT OBJ : res[1] = degree; res[2] = quadrant shortcut;
    formatRegExArr.push({ "regex": /^((?:(?:\-?)(?:3[0-5]\d|[12]\d{2}|[1-9]\d?|0)(?:\.\d+)?)|(?:\-?)(?:\.\d+))(\-[1-4])$/, "type": "decimalDegree" }); // jshint ignore:line
    return formatRegExArr;
  };

  /**
   * This function is used to convert a number from any quadrant to NA DD
   * @memberOf Screening/utils
   */
  mo.getNorthAzimuthAngle = function (angle, quadrant) {
    var degree;
    quadrant = quadrant.toUpperCase();
    angle = Number(angle);
    switch (quadrant) {
      case "-1":
      case "NE":
        degree = (angle + 360) % 360;
        return degree;
      case "-2":
      case "SE": // d = ( 360 + 180 - angle) % 360
        degree = (360 + 180 - angle) % 360;
        return degree;
      case "-3":
      case "SW": // d = ( 360 + 180 + angle) % 360
        degree = (360 + 180 + angle) % 360;
        return degree;
      case "-4":
      case "NW": // d = ( 360 - angle) % 360
        degree = (360 - angle) % 360;
        return degree;
    }
  };

  /**
   * This function is used to convert bearing to north azimuth.
   * @memberOf Screening/utils
   */
  mo.convertBearingToNorthAzimuth = function (res, regExFormatArrIndex, planSettings) {
    var bearingObj, northAzimuthDD, dmsObj;
    switch (regExFormatArrIndex) {
      case 0:
        // get DD of user entered bearing
        bearingObj = mo.getBearingObjForFormat0(res);
        // get DD on basis of north azimuth
        northAzimuthDD = mo.getNorthAzimuthAngle(bearingObj.decimalDegrees, "-" + res[4]);
        // get DMS of new DD which is on basis of north azimuth
        dmsObj = mo.DDtoDMS({
          "angle": northAzimuthDD
        });
        // assign new dms data to existing object
        res[1] = dmsObj.degree;
        res[2] = dmsObj.minutes;
        res[3] = dmsObj.seconds;
        return res;
      case 1:
        // get DD of user entered bearing
        bearingObj = mo.getBearingObjForFormat1(res);
        // get DD on basis of north azimuth
        northAzimuthDD = mo.getNorthAzimuthAngle(bearingObj.decimalDegrees, (res[1] + res[5]));
        // get DMS of new DD which is on basis of north azimuth
        dmsObj = mo.DDtoDMS({
          "angle": northAzimuthDD
        });
        // assign new dms data to existing object
        res[2] = dmsObj.degree;
        res[3] = dmsObj.minutes;
        res[4] = dmsObj.seconds;
        return res;
      case 2:
        // get DD of user entered bearing
        bearingObj = mo.getBearingObjForFormat2(res);
        // get DD on basis of north azimuth
        northAzimuthDD = mo.getNorthAzimuthAngle(bearingObj.decimalDegrees, (res[1] + res[5]));
        // get DMS of new DD which is on basis of north azimuth
        dmsObj = mo.DDtoDMS({
          "angle": northAzimuthDD
        });
        // assign new dms data to existing object
        res[2] = dmsObj.degree;
        res[3] = dmsObj.minutes;
        res[4] = dmsObj.seconds;
        break;
      case 3:
        if ((planSettings.directionOrAngleType === "northAzimuth") ||
          (planSettings.directionOrAngleType === "quadrantBearing")) {
          // get DD of user entered bearing
          bearingObj = mo.getBearingObjForFormat3(res);
          // get DD on basis of north azimuth
          northAzimuthDD = mo.getNorthAzimuthAngle(bearingObj.decimalDegrees, "-1");
          // get DMS of new DD which is on basis of north azimuth
          dmsObj = mo.DDtoDMS({
            "angle": northAzimuthDD
          });
          // assign new dms data to existing object
          res[1] = dmsObj.degree;
          res[2] = dmsObj.minutes;
          res[3] = dmsObj.seconds;
        } else if (planSettings.directionOrAngleType === "southAzimuth") {
          // get DD of user entered bearing
          bearingObj = mo.getBearingObjForFormat3(res);
          // get DD on basis of north azimuth
          northAzimuthDD = mo.getNorthAzimuthAngle(bearingObj.decimalDegrees, "-3");
          // get DMS of new DD which is on basis of north azimuth
          dmsObj = mo.DDtoDMS({
            "angle": northAzimuthDD
          });
          // assign new dms data to existing object
          res[1] = dmsObj.degree;
          res[2] = dmsObj.minutes;
          res[3] = dmsObj.seconds;
        }
        return res;
      case 4:
        if ((planSettings.directionOrAngleType === "northAzimuth") ||
          (planSettings.directionOrAngleType === "quadrantBearing")) {
          res[1] = mo.getNorthAzimuthAngle(res[1], "-1");
        } else if (planSettings.directionOrAngleType === "southAzimuth") {
          res[1] = mo.getNorthAzimuthAngle(res[1], "-3");
        }
        break;
      case 5:
        if (planSettings.directionOrAngleType === "northAzimuth") {
          // get DD of user entered bearing
          bearingObj = mo.getBearingObjForFormat5(res);
          // get DD on basis of north azimuth
          northAzimuthDD = mo.getNorthAzimuthAngle(bearingObj.decimalDegrees, "-1");
          // get DMS of new DD which is on basis of north azimuth
          dmsObj = mo.DDtoDMS({
            "angle": northAzimuthDD
          });
          // assign new dms data to existing object
          res[1] = dmsObj.degree;
          res[2] = dmsObj.minutes;
          res[3] = dmsObj.seconds;
        } else if (planSettings.directionOrAngleType === "southAzimuth") {
          // get DD of user entered bearing
          bearingObj = mo.getBearingObjForFormat5(res);
          // get DD on basis of north azimuth
          northAzimuthDD = mo.getNorthAzimuthAngle(bearingObj.decimalDegrees, "-3");
          // get DMS of new DD which is on basis of north azimuth
          dmsObj = mo.DDtoDMS({
            "angle": northAzimuthDD
          });
          // assign new dms data to existing object
          res[1] = dmsObj.degree;
          res[2] = dmsObj.minutes;
          res[3] = dmsObj.seconds;
        } else if (planSettings.directionOrAngleType === "quadrantBearing") {
          res = null;
        }
        return res;
      case 6:
        // get DD of user entered bearing
        bearingObj = mo.getBearingObjForFormat6(res);
        // get DD on basis of north azimuth
        northAzimuthDD = mo.getNorthAzimuthAngle(bearingObj.decimalDegrees, res[4]);
        // get DMS of new DD which is on basis of north azimuth
        dmsObj = mo.DDtoDMS({
          "angle": northAzimuthDD
        });
        // assign new dms data to existing object
        res[1] = dmsObj.degree;
        res[2] = dmsObj.minutes;
        res[3] = dmsObj.seconds;
        return res;
      case 7:
        res[2] = mo.getNorthAzimuthAngle(res[2], (res[1] + res[3]));
        break;
      case 8:
        res[1] = mo.getNorthAzimuthAngle(res[1], res[2]);
        break;
    }
    return res;
  };

  /**
   * This function is used to get format of bearing.
   * @memberOf Screening/utils
   */
  mo.categorizeBearingFormat = function (bearing, planSettings) {
    var formatRegExArr, res, i, returnValue;
    bearing = bearing.toString();
    formatRegExArr = mo.getBearingFormatArr();
    // first check for all the cases having directionOrAngleUnits based on plan settings
    for (i = 0; i < formatRegExArr.length; i++) {
      if (formatRegExArr[i].type === planSettings.directionOrAngleUnits) {
        res = formatRegExArr[i].regex.exec(bearing.trim());
        if (res && res.length > 0) {
          res = mo.convertBearingToNorthAzimuth(res, i, planSettings);
          break;
        }
      }
    }
    // next check would be for all the cases in which
    // directionOrAngleUnits is not based on plan  settings
    if (!res) {
      for (i = 0; i < formatRegExArr.length; i++) {
        if (formatRegExArr[i].type !== planSettings.directionOrAngleUnits) {
          res = formatRegExArr[i].regex.exec(bearing.trim());
          if (res && res.length > 0) {
            res = mo.convertBearingToNorthAzimuth(res, i, planSettings);
            break;
          }
        }
      }
    }
    if (!res) {
      // return null if bearing is invalid
      returnValue = null;
    } else {
      returnValue = mo.getBearingDetailsOfRequiredFormat(res, i);
    }
    // return bearing conversions
    return returnValue;
  };

  /**
   * This function is used to convert meters to us survey feets.
   * @memberOf Screening/utils
   */
  mo.metersToUSSurveyFeet = function (meterValue) {
    var feetValue;
    meterValue = Number(meterValue);
    feetValue = meterValue * 3.28083333333;
    return feetValue;
  };

  /**
   * This function is used to convert us survey feets to meters.
   * @memberOf Screening/utils
   */
  mo.usSurveyFeetToMeters = function (feetValue) {
    var meterValue;
    feetValue = Number(feetValue);
    meterValue = feetValue * 0.304800609601;
    return meterValue;
  };

  /**
   * This function is used to convert feet to US Survey feet
   * @memberOf Screening/utils
   */
  mo.feetToUSSurveyFeet = function (feetValue) {
    var usSurveyFeetValue, meterValue;
    feetValue = Number(feetValue);
    meterValue = feetValue * 0.3048;
    usSurveyFeetValue = mo.metersToUSSurveyFeet(meterValue);
    return usSurveyFeetValue;
  };

  /**
   * This function is used to convert feet to Meters
   * @memberOf Screening/utils
   */
  mo.feetToMeters = function (feetValue) {
    var meterValue;
    feetValue = Number(feetValue);
    meterValue = feetValue * 0.3048;
    return meterValue;
  };

  /**
   * This function is used to convert us survey feet to feet.
   * @memberOf Screening/utils
   */
  mo.usSurveyFeetToFeet = function (usSurveyFeetValue) {
    var feetValue, meterValue;
    usSurveyFeetValue = Number(usSurveyFeetValue);
    meterValue = usSurveyFeetValue * 0.304800609601;
    feetValue = meterValue * 3.280839895;
    return feetValue;
  };

  /**
   * This function is used to convert meters to feet.
   * @memberOf Screening/utils
   */
  mo.metersToFeet = function (meterValue) {
    var feetValue;
    meterValue = Number(meterValue);
    feetValue = meterValue * 3.280839895;
    return feetValue;
  };

  /**
   * This function is used to convert acres to square kilometer
   * @memberOf Screening/utils
   */
  mo.acresToSquareKilometer = function (acresValue) {
    var squareKilometerValue;
    acresValue = Number(acresValue);
    squareKilometerValue = acresValue * 0.00404686;
    return squareKilometerValue;
  };

  /**
   * This function is used to convert miles to kilometer
   * @memberOf Screening/utils
   */
  mo.milesToKilometer = function (milesValue) {
    var kilometerValue;
    milesValue = Number(milesValue);
    kilometerValue = milesValue * 1.60934;
    return kilometerValue;
  };

  /**
   * This function is used to get length details from bearing format 0.
   * @memberOf Screening/utils
   */
  mo.getLengthObjForFormat0 = function (res, distanceAndLengthUnits) {
    var lengthObj;
    lengthObj = {};
    if (distanceAndLengthUnits === "uSSurveyFeet") {
      lengthObj.uSSurveyFeet = Number(res[0]);
      lengthObj.uSSurveyFeetRound = (Math.round(lengthObj.uSSurveyFeet * 10000)) / 10000;
      lengthObj.meters = mo.usSurveyFeetToMeters(res[0]);
      lengthObj.metersRound = (Math.round(lengthObj.meters * 10000)) / 10000;
      lengthObj.feet = mo.usSurveyFeetToFeet(lengthObj.uSSurveyFeet);
      lengthObj.feetRound = (Math.round(lengthObj.feet * 10000)) / 10000;
    } else if (distanceAndLengthUnits === "meters") {
      lengthObj.uSSurveyFeet = mo.metersToUSSurveyFeet(res[0]);
      lengthObj.uSSurveyFeetRound = (Math.round(lengthObj.uSSurveyFeet * 10000)) / 10000;
      lengthObj.meters = Number(res[0]);
      lengthObj.metersRound = (Math.round(lengthObj.meters * 10000)) / 10000;
      lengthObj.feet = mo.metersToFeet(lengthObj.meters);
      lengthObj.feetRound = (Math.round(lengthObj.feet * 10000)) / 10000;
    }
    return lengthObj;
  };

  /**
   * This function is used to get length details from bearing format 1(feets).
   * @memberOf Screening/utils
   */
  mo.getLengthObjForFormat1 = function (res) {
    var lengthObj;
    lengthObj = {};
    lengthObj.uSSurveyFeet = Number(res[2]);
    lengthObj.uSSurveyFeetRound = (Math.round(lengthObj.uSSurveyFeet * 10000)) / 10000;
    lengthObj.meters = mo.usSurveyFeetToMeters(res[2]);
    lengthObj.metersRound = (Math.round(lengthObj.meters * 10000)) / 10000;
    lengthObj.feet = mo.usSurveyFeetToFeet(lengthObj.uSSurveyFeet);
    lengthObj.feetRound = (Math.round(lengthObj.feet * 10000)) / 10000;
    return lengthObj;
  };

  /**
   * This function is used to get length details from bearing format 2(meters).
   * @memberOf Screening/utils
   */
  mo.getLengthObjForFormat2 = function (res) {
    var lengthObj;
    lengthObj = {};
    lengthObj.uSSurveyFeet = mo.metersToUSSurveyFeet(res[2]);
    lengthObj.uSSurveyFeetRound = (Math.round(lengthObj.uSSurveyFeet * 10000)) / 10000;
    lengthObj.meters = Number(res[2]);
    lengthObj.metersRound = (Math.round(lengthObj.meters * 10000)) / 10000;
    lengthObj.feet = mo.metersToFeet(lengthObj.meters);
    lengthObj.feetRound = (Math.round(lengthObj.feet * 10000)) / 10000;
    return lengthObj;
  };

  /**
   * This function is used to get length details from bearing format 3(feet).
   * @memberOf Screening/utils
   */
  mo.getLengthObjForFormat3 = function (res) {
    var lengthObj;
    lengthObj = {};
    lengthObj.uSSurveyFeet = mo.feetToUSSurveyFeet(res[2]);
    lengthObj.uSSurveyFeetRound = (Math.round(lengthObj.uSSurveyFeet * 10000)) / 10000;
    lengthObj.meters = mo.feetToMeters(res[2]);
    lengthObj.metersRound = (Math.round(lengthObj.meters * 10000)) / 10000;
    lengthObj.feet = Number(res[2]);
    lengthObj.feetRound = (Math.round(lengthObj.feet * 10000)) / 10000;
    return lengthObj;
  };

  /**
   * This function is used to get format of distance.
   * @memberOf Screening/utils
   */
  mo.categorizeLengthFormat = function (length, distanceAndLengthUnits) {
    var formatRegExArr, res, returnValue, i;
    formatRegExArr = [];
    length = length.toString();
    // 46, 46.50
    formatRegExArr.push(/^((\-?)((0?|([1-9]\d*))(\.\d+)?))$/);
    // 46ft, 46FT, 46fT, 46Ft
    formatRegExArr.push(/^(((\-?)((0?|([1-9]\d*))(\.\d+)?))(ft|FT|fT|Ft))$/);
    // 46m, 46M
    formatRegExArr.push(/^(((\-?)((0?|([1-9]\d*))(\.\d+)?))(m|M))$/);
    for (i = 0; i < formatRegExArr.length; i++) {
      res = formatRegExArr[i].exec(length.trim());
      if (res && res.length > 0) {
        break;
      }
    }
    if (!res) {
      returnValue = null;
    } else {
      returnValue = mo.getLengthOfRequiredFormat(res, i, distanceAndLengthUnits);
      if (returnValue && isNaN(returnValue.meters)) {
        returnValue = null;
      }
    }
    return returnValue;
  };

  /**
   * This function is used to get details of length when it is entered in feet
   * @memberOf Screening/utils
   */
  mo.categorizeLengthFormatForFeet = function (length) {
    var formatRegExArr, res, returnValue, i;
    formatRegExArr = [];
    length = length.toString();
    formatRegExArr.push(/^((\-?)((0?|([1-9]\d*))(\.\d+)?))$/); // 46, 46.50
    for (i = 0; i < formatRegExArr.length; i++) {
      res = formatRegExArr[i].exec(length.trim());
      if (res && res.length > 0) {
        break;
      }
    }
    if (!res) {
      returnValue = null;
    } else {
      returnValue = mo.getLengthObjForFormat3(res);
    }
    return returnValue;
  };

  /**
   * This function is used to get length details of required format.
   * @memberOf Screening/utils
   */
  mo.getLengthOfRequiredFormat = function (res, i, distanceAndLengthUnits) {
    var lengthObj = {};
    switch (i) {
      case 0:
        lengthObj = mo.getLengthObjForFormat0(res, distanceAndLengthUnits);
        break;
      case 1:
        lengthObj = mo.getLengthObjForFormat1(res);
        break;
      case 2:
        lengthObj = mo.getLengthObjForFormat2(res);
        break;
    }
    return lengthObj;
  };
  return mo;
});