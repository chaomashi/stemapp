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
  "esri/geometry/Point",
  "esri/geometry/Polyline",
  "esri/geometry/Polygon",
  "esri/geometry/webMercatorUtils",
  "dojo/Deferred",
  "dojo/_base/array",
  "dojo/_base/lang",
  "esri/geometry/geometryEngine",
  "esri/SpatialReference",
  "esri/geometry/scaleUtils"
],
  function (
    Point,
    Polyline,
    Polygon,
    webMercatorUtils,
    Deferred,
    array,
    lang,
    geometryEngine,
    SpatialReference,
    scaleUtils) {
    var mo = {};

    /**
    * Returns the projected geometry in outSR
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getProjectedGeometry = function (geometry, outSR, geometryService) {
      var deferred, result;
      deferred = new Deferred();
      if (webMercatorUtils.canProject(geometry, outSR)) {
        result = webMercatorUtils.project(geometry, outSR);
        deferred.resolve(result);
      } else {
        geometryService.project([geometry], outSR, function (projectedGeometries) {
          result = projectedGeometries[0];
          deferred.resolve(result);
        });
      }
      return deferred.promise;
    };

    /*---------------------------------------------------------------------------------------------
    * Vincenty Direct and Inverse Solution of Geodesics on the Ellipsoid (c) Chris Veness 2002-2016
    *                                                                                   MIT Licence
    *
    * www.movable-type.co.uk/scripts/latlong-vincenty.html
    * www.movable-type.co.uk/scripts/geodesy/docs/module-latlon-vincenty.html
    *---------------------------------------------------------------------------------------------
    * Returns the destination mapPoint using Vincenty direct solution.
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getDestinationPoint = function (startPoint, initialBearing, distance) {
      var a = 6378137;
      var b = 6356752.314245;
      var f = (a - b) / a;

      var φ1 = startPoint.y * Math.PI / 180, λ1 = startPoint.x * Math.PI / 180;
      var α1 = initialBearing * Math.PI / 180;
      var s = distance;

      var sinα1 = Math.sin(α1);
      var cosα1 = Math.cos(α1);

      var tanU1 = (1 - f) * Math.tan(φ1),
        cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)), sinU1 = tanU1 * cosU1;
      var σ1 = Math.atan2(tanU1, cosα1);
      var sinα = cosU1 * sinα1;
      var cosSqα = 1 - sinα * sinα;
      var uSq = cosSqα * (a * a - b * b) / (b * b);
      var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
      var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));

      var cos2σM, sinσ, cosσ, Δσ;

      var σ = s / (b * A), σʹ, iterations = 0;
      do {
        cos2σM = Math.cos(2 * σ1 + σ);
        sinσ = Math.sin(σ);
        cosσ = Math.cos(σ);
        Δσ = B * sinσ * (cos2σM + B / 4 * (cosσ * (-1 + 2 * cos2σM * cos2σM) -
          B / 6 * cos2σM * (-3 + 4 * sinσ * sinσ) * (-3 + 4 * cos2σM * cos2σM)));
        σʹ = σ;
        σ = s / (b * A) + Δσ;
      } while (Math.abs(σ - σʹ) > 1e-12 && ++iterations < 200);
      if (iterations >= 200) {
        return null;
      }

      var x = sinU1 * sinσ - cosU1 * cosσ * cosα1;
      var φ2 = Math.atan2(sinU1 * cosσ + cosU1 * sinσ * cosα1,
        (1 - f) * Math.sqrt(sinα * sinα + x * x));
      var λ = Math.atan2(sinσ * sinα1, cosU1 * cosσ - sinU1 * sinσ * cosα1);
      var C = f / 16 * cosSqα * (4 + f * (4 - 3 * cosSqα));
      var L = λ - (1 - C) * f * sinα *
        (σ + C * sinσ * (cos2σM + C * cosσ * (-1 + 2 * cos2σM * cos2σM)));
      var λ2 = (λ1 + L + 3 * Math.PI) % (2 * Math.PI) - Math.PI;  // normalize to -180..+180

      var α2 = Math.atan2(sinα, -x);
      α2 = (α2 + 2 * Math.PI) % (2 * Math.PI); // normalize to 0..360

      φ2 = φ2 * 180 / Math.PI;
      λ2 = λ2 * 180 / Math.PI;
      α2 = α2 * 180 / Math.PI;
      return new Point(λ2, φ2, new SpatialReference(4326));
    };

    /*---------------------------------------------------------------------------------------------
    * Vincenty Direct and Inverse Solution of Geodesics on the Ellipsoid (c) Chris Veness 2002-2016
    *                                                                                   MIT Licence
    *
    * www.movable-type.co.uk/scripts/latlong-vincenty.html
    * www.movable-type.co.uk/scripts/geodesy/docs/module-latlon-vincenty.html
    *---------------------------------------------------------------------------------------------
    * Returns the Info (Distance, initialBearing, finalBearing) using Vincenty inverse solution.
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getInverseCalculations = function (startPoint, endPoint) {
      var φ1 = startPoint.y * Math.PI / 180, λ1 = startPoint.x * Math.PI / 180;
      var φ2 = endPoint.y * Math.PI / 180, λ2 = endPoint.x * Math.PI / 180;

      var a = 6378137; var b = 6356752.314245; var f = (a - b) / a;

      var L = λ2 - λ1;
      var tanU1 = (1 - f) * Math.tan(φ1),
        cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)), sinU1 = tanU1 * cosU1;
      var tanU2 = (1 - f) * Math.tan(φ2),
        cosU2 = 1 / Math.sqrt((1 + tanU2 * tanU2)), sinU2 = tanU2 * cosU2;

      var sinλ, cosλ, sinSqσ, sinσ, cosσ, σ, sinα, cosSqα, cos2σM, C;

      var λ = L, λʹ, iterations = 0;
      do {
        sinλ = Math.sin(λ);
        cosλ = Math.cos(λ);
        sinSqσ = (cosU2 * sinλ) * (cosU2 * sinλ) +
          (cosU1 * sinU2 - sinU1 * cosU2 * cosλ) * (cosU1 * sinU2 - sinU1 * cosU2 * cosλ);
        sinσ = Math.sqrt(sinSqσ);
        if (sinσ == 0) { // jshint ignore:line
          return 0;  // co-incident points
        }
        cosσ = sinU1 * sinU2 + cosU1 * cosU2 * cosλ;
        σ = Math.atan2(sinσ, cosσ);
        sinα = cosU1 * cosU2 * sinλ / sinσ;
        cosSqα = 1 - sinα * sinα;
        cos2σM = cosσ - 2 * sinU1 * sinU2 / cosSqα;
        if (isNaN(cos2σM)) {
          cos2σM = 0;  // equatorial line: cosSqα=0 (§6)
        }
        C = f / 16 * cosSqα * (4 + f * (4 - 3 * cosSqα));
        λʹ = λ;
        λ = L + (1 - C) * f * sinα *
          (σ + C * sinσ * (cos2σM + C * cosσ * (-1 + 2 * cos2σM * cos2σM)));
      } while (Math.abs(λ - λʹ) > 1e-12 && ++iterations < 200);
      if (iterations >= 200) {
        return null;
      }

      var uSq = cosSqα * (a * a - b * b) / (b * b);
      var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
      var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
      var Δσ = B * sinσ * (cos2σM + B / 4 * (cosσ * (-1 + 2 * cos2σM * cos2σM) -
        B / 6 * cos2σM * (-3 + 4 * sinσ * sinσ) * (-3 + 4 * cos2σM * cos2σM)));

      var s = b * A * (σ - Δσ);

      var α1 = Math.atan2(cosU2 * sinλ, cosU1 * sinU2 - sinU1 * cosU2 * cosλ);
      var α2 = Math.atan2(cosU1 * sinλ, -sinU1 * cosU2 + cosU1 * sinU2 * cosλ);

      α1 = (α1 + 2 * Math.PI) % (2 * Math.PI); // normalize to 0..360
      α2 = (α2 + 2 * Math.PI) % (2 * Math.PI); // normalize to 0..360

      s = Number(s.toFixed(3)); // round to 1mm precision
      α1 = α1 * 180 / Math.PI;
      α2 = α2 * 180 / Math.PI;
      return { distance: s, initialBearing: α1, finalBearing: α2 };
    };

    /**
    * Returns the polyline geometry between point
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getLineBetweenPoints = function (pointsArray) {
      var polyline, pathsArray = [];
      //iterate through all the points and create paths array
      array.forEach(pointsArray, lang.hitch(this, function (point) {
        pathsArray.push([point.x, point.y]);
      }));
      //check if paths exist and create polyline object from it
      if (pathsArray.length > 0) {
        polyline = new Polyline({
          "paths": [
            pathsArray
          ], "spatialReference": {
            "wkid": 4326
          }
        });
      }
      return polyline;
    };

    /**
    * Returns angle between to points
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getAngleBetweenPoints = function (originPoint, chordPoint) {
      var angle;
      var inverseInfo = mo.getInverseCalculations(originPoint, chordPoint);
      if (inverseInfo === null) {
        angle = 0;
      } else {
        angle = inverseInfo.initialBearing;
      }
      return angle;
    };

    /**
    * Returns distance between two point in meters using geometry engine
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getDistanceBetweenPoints = function (startPoint, endPoint) {
      var distance;
      var inverseInfo = mo.getInverseCalculations(startPoint, endPoint);
      if (inverseInfo === null) {
        distance = 0;
      } else {
        distance = inverseInfo.distance;
      }
      return distance;
    };

    /**
    * Returns the geodesic length of simplified geometry using geometry engine
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getLengthOfGeometry = function (geometry) {
      var lengthInMeters, simplifiedGeometry;
      simplifiedGeometry = geometryEngine.simplify(geometry);
      if (simplifiedGeometry) {
        lengthInMeters = geometryEngine.geodesicLength(simplifiedGeometry, 9001);
      } else {
        lengthInMeters = 0;
      }
      return lengthInMeters;
    };

    /**
    * Returns the object containing area of the geometry, in acre, sqMeters,sqFeet, and sqUSFeet.
    * if geometry is not simplified it will return 0 in all units
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getAreaOfGeometry = function (geometry) {
      var simplifiedGeometry, areaConversions;
      simplifiedGeometry = geometryEngine.simplify(geometry);
      areaConversions = {};
      if (simplifiedGeometry) {
        areaConversions.acres = geometryEngine.geodesicArea(simplifiedGeometry, 109402);
        areaConversions.squareMeters = geometryEngine.geodesicArea(simplifiedGeometry, 109404);
        areaConversions.squareFeet = geometryEngine.geodesicArea(simplifiedGeometry, 109405);
        areaConversions.squareUsFeet = geometryEngine.geodesicArea(simplifiedGeometry, 109406);
      } else {
        areaConversions.acres = 0;
        areaConversions.squareMeters = 0;
        areaConversions.squareFeet = 0;
        areaConversions.squareUsFeet = 0;
      }
      return areaConversions;
    };

    /**
    * Returns the polyline object form the paths array
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getPolyLineFromPaths = function (pathsArray) {
      var polyline, i;
      //create polyline in 102100 spatial reference
      polyline = new Polyline(new SpatialReference({ wkid: 4326 }));
      for (i = 0; i < pathsArray.length; i++) {
        polyline.addPath(pathsArray[i]);
      }
      return polyline;
    };

    /**
    * Returns the polygon object form the paths array
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getPolygonFromPolyLines = function (pathsArray, addLastPoint, updateLastPoint,
      spatialReference) {
      var ring, polygon, i, j;
      ring = [];
      //create polygon in 102100 spatial reference if spatial reference is not valid
      if (!spatialReference) {
        polygon = new Polygon(new SpatialReference({ wkid: 4326 }));
      } else {
        polygon = new Polygon(new SpatialReference(spatialReference));
      }
      for (i = 0; i < pathsArray.length; i++) {
        for (j = 0; j < pathsArray[i].length; j++) {
          ring.push(pathsArray[i][j]);
        }
      }
      if (addLastPoint) {
        ring.push(lang.clone(ring[0]));
      } else if (updateLastPoint) {
        ring[ring.length - 1][0] = ring[0][0];
        ring[ring.length - 1][1] = ring[0][1];
      }
      //if ring is not in clockwise direction reverse the ring
      if (!polygon.isClockwise(ring)) {
        ring.reverse();
      }
      polygon.addRing(ring);
      return polygon;
    };

    /**
    * Returns the pointArray for an arc
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getPointsForArc = function (startAngle, endAngle, centerPoint, radius) {
      var i, pointArray = [], angleOfArc, segments, unitAngle, bearingForEachPoint, point;
      angleOfArc = endAngle - startAngle;
      segments = parseInt(angleOfArc, 10);
      //in case if angle is in between 0 to 1, segments parseInt value will be 0,
      //but we would require at least 1 segment to draw arc
      if (segments <= 0) {
        segments = 1;
      }
      unitAngle = Math.abs(angleOfArc) / Math.abs(segments);
      //unit angle is zero then we cannot calculate points of arc
      if (unitAngle > 0) {
        for (i = 0; i < Math.abs(segments) + 1; i++) {
          bearingForEachPoint = startAngle + (unitAngle * i);
          point = mo.getDestinationPoint(centerPoint, bearingForEachPoint, Math.abs(radius));
          if (point) {
            pointArray.push(point);
          }
        }
      }
      return pointArray;
    };

    /**
    * Returns the arc params required to draw arc
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getArcParam = function (param) {
      var returnValue;
      returnValue = {};
      if (param.distance < 0) { //major arc
        if (param.radius < 0) { // left side of chord
          returnValue.bearing = param.initBearing + 90;
          returnValue.centerPoint = mo.getDestinationPoint(param.chordMidPoint, returnValue.bearing,
            param.centerAndChordDistance);
          returnValue.startAngle = mo.getAngleBetweenPoints(returnValue.centerPoint,
            param.chordEndPoint);
          returnValue.endAngle = mo.getAngleBetweenPoints(returnValue.centerPoint,
            param.chordStartPoint);
        } else { // Right side of chord
          returnValue.bearing = param.initBearing - 90;
          returnValue.centerPoint = mo.getDestinationPoint(param.chordMidPoint, returnValue.bearing,
            param.centerAndChordDistance);
          returnValue.startAngle = mo.getAngleBetweenPoints(returnValue.centerPoint,
            param.chordStartPoint);
          returnValue.endAngle = mo.getAngleBetweenPoints(returnValue.centerPoint,
            param.chordEndPoint);
        }
      } else { //minor arc
        if (param.radius > 0) { // right side of chord
          returnValue.bearing = param.initBearing + 90;
          returnValue.centerPoint = mo.getDestinationPoint(param.chordMidPoint, returnValue.bearing,
            param.centerAndChordDistance);
          returnValue.startAngle = mo.getAngleBetweenPoints(returnValue.centerPoint,
            param.chordStartPoint);
          returnValue.endAngle = mo.getAngleBetweenPoints(returnValue.centerPoint,
            param.chordEndPoint);
        } else { // left side of chord
          returnValue.bearing = param.initBearing - 90;
          returnValue.centerPoint = mo.getDestinationPoint(param.chordMidPoint,
            returnValue.bearing, param.centerAndChordDistance);
          returnValue.startAngle = mo.getAngleBetweenPoints(returnValue.centerPoint,
            param.chordEndPoint);
          returnValue.endAngle = mo.getAngleBetweenPoints(returnValue.centerPoint,
            param.chordStartPoint);
        }
      }
      return returnValue;
    };

    /**
    * Returns the value after removing negative exponents from it
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
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
    * Converts the chord length to arc length
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getChordLengthFromArcLength = function (arcLength, radius) {
      var chordLength, arcLengthOfSemiCircle, theta;
      arcLength = Math.abs(arcLength);
      // using formula 'Math.PI * radius' for calculating circumference of a semi-circle.
      arcLengthOfSemiCircle = Math.PI * Math.abs(radius);
      // calculating angle for half of the triangle
      theta = Math.abs(arcLength) / Math.abs(radius);
      // calculate chordLength(perpendicular in our case) using formula
      //sin(theta) = perpendicular / hypotenuse,
      //so, perpendicular = hypotenuse * sin(theta)
      chordLength = Math.abs(radius) * Math.sin(theta / 2);
      if (arcLength <= arcLengthOfSemiCircle) {
        chordLength = chordLength * 2;
      } else {
        chordLength = chordLength * (-2);
      }
      return chordLength;
    };

    /**
    * Converts the arc length to chord length
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getArcLengthFromChordLength = function (chordLength, radius) {
      var arcLength, absChordLength;
      absChordLength = Math.abs(chordLength);
      radius = Math.abs(radius);
      arcLength = (2 * Math.asin(absChordLength / (2 * radius)) * radius);
      if (chordLength < 0) {
        arcLength = (2 * Math.PI * radius) - arcLength;
      }
      return arcLength;
    };

    /**
    * Converts the chord bearing to tangent bearing
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.chordBearingToTangentBearing = function (chordBearing, radius, chordLength) {
      var radToChordAngle, minorArc, leftOfChord, tanBearing;
      radToChordAngle = Math.acos((Math.abs(chordLength) / 2) / Math.abs(radius)) * (180 / Math.PI);
      //angle between radius and chord
      minorArc = radius / Math.abs(radius);
      leftOfChord = chordLength / Math.abs(chordLength);
      /*
      Combinations:
      1. +r +c -> tb = cb + 90 - a
      2. +r -c -> tb = cb + 90 + a
      3. -r +c -> tb = cb - 90 + a
      4. -r -c -> tb = cb - 90 - a
      */
      tanBearing = chordBearing + minorArc * 90 - minorArc * leftOfChord * radToChordAngle;
      //ensure that angle is between 0 to 360
      tanBearing =
        tanBearing < 0 ? tanBearing + 360 :
          (tanBearing >= 360 ? tanBearing % 360 : tanBearing);
      //return the tanBearing removing negative exponent
      return mo.removeNegativeExponents(tanBearing);
    };

    /**
    * Converts the tangent bearing to chord bearing
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.tangentBearingToChordBearing = function (tanBearing, radius, chordLength) {
      var radToChordAngle, minorArc, leftOfChord, chordBearing;
      radToChordAngle = Math.acos((Math.abs(chordLength) / 2) / Math.abs(radius)) * (180 / Math.PI);
      //angle between radius and chord
      minorArc = radius / Math.abs(radius);
      leftOfChord = chordLength / Math.abs(chordLength);
      /*
      Combinations:
      1. +r +c -> cb = tb + 90 - a
      2. +r -c -> cb = tb + 90 + a
      3. -r +c -> cb = tb - 90 + a
      4. -r -c -> cb = tb - 90 - a
      */
      chordBearing = tanBearing + minorArc * 90 - minorArc * leftOfChord * radToChordAngle;
      //ensure that angle is between 0 to 360
      chordBearing =
        chordBearing < 0 ? chordBearing + 360 :
          (chordBearing >= 360 ? chordBearing % 360 : chordBearing);
      //return the chordBearing removing negative exponent
      return mo.removeNegativeExponents(chordBearing);
    };

    /**
    * This function is used to get unit from spatialReference
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getUnitValueForSR = function (spatialReference) {
      var mapUnit;
      mapUnit = scaleUtils.getUnitValueForSR(spatialReference);
      switch (mapUnit) {
        case 1: // meters
          return "meters";
        case 111194.87428468118: // degrees
          return "meters";
        case 0.3048: // feet
          return "feet";
        case 0.3048006096: // us survey feet
        case 0.3048006096012192:
          return "uSSurveyFeet";
      }
    };

    /**
    * Returns the angle between two points
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getRotationAngleBetweenPoints = function (originPoint, chordPoint) {
      var dx, dy, XByY, YByX;
      originPoint = webMercatorUtils.project(originPoint, new SpatialReference(102100));
      chordPoint = webMercatorUtils.project(chordPoint, new SpatialReference(102100));
      dx = chordPoint.x - originPoint.x;
      dy = chordPoint.y - originPoint.y;
      XByY = Math.atan2(Math.abs(dx), Math.abs(dy)) * 180 / Math.PI;
      YByX = Math.atan2(Math.abs(dy), Math.abs(dx)) * 180 / Math.PI;
      //remove negative exponents from the calculated value
      dx = mo.removeNegativeExponents(dx);
      dy = mo.removeNegativeExponents(dy);
      XByY = mo.removeNegativeExponents(XByY);
      YByX = mo.removeNegativeExponents(YByX);
      if (dy === 0) {
        if (dx === 0) {
          return 0;
        } else if (dx > 0) {
          return 90;
        } else if (dx < 0) {
          return 270;
        }
      } else if (dy > 0) {
        if (dx === 0) {
          return 0;
        } else if (dx > 0) {
          return XByY;
        } else if (dx < 0) {
          return 270 + YByX;
        }
      } else if (dy < 0) {
        if (dx === 0) {
          return 180;
        } else if (dx > 0) {
          return 90 + YByX;
        } else if (dx < 0) {
          return 180 + XByY;
        }
      }
    };

    /**
    * Returns the distance between two points
    * @memberOf widgets/GRGDrafter/geometryUtils
    **/
    mo.getScaleDistanceBetweenPoints = function (startPoint, endPoint) {
      startPoint = webMercatorUtils.project(startPoint, new SpatialReference(102100));
      endPoint = webMercatorUtils.project(endPoint, new SpatialReference(102100));
      var distance = geometryEngine.distance(startPoint, endPoint, 9001);
      //as their could be very small distance between points,
      //geometryEngine will return values in negative exponent which means
      // it is equivalent to zero so removeNegativeExponents from values
      return mo.removeNegativeExponents(distance);
    };

    return mo;
  });