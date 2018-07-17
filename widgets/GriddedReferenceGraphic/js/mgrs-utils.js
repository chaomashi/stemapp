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
/**
 *  @fileOverview Module containing MGRS grid utilities used by GRG widget.
 *  @author Esri
 */

/**
 *  @module mgrs-utils
 *  @description Module containing MGRS grid utilities used by GRG widget.
 */

define([
  "dojo/json",
  "./constants",
  "./geometry-utils",
  "./geometryUtils",
  "./mgrs",
  "./NonPolarGridZone",
  "./VisibleGridZone",
  "./GridPolygon",
  "esri/geometry/geometryEngine",
  "esri/geometry/Point",
  "esri/geometry/Polygon"
], function(
  JSON,
  constants,
  gridGeomUtils,
  geomUtils,
  mgrs,
  NonPolarGridZone,
  VisibleGridZone,
  GridPolygon,
  geometryEngine,
  Point,
  Polygon
) {
  // If Math.log10 is not supported by default in the browser, add it here
  if (!Math.log10) {
    Math.log10 = function log10(val) {
      return Math.log(val) / Math.LN10;
    };
  }
  return {
    /**
     * The zonesDictionary object contains all 1197 unique keys
     * (one for each non-polar MGRS grid zone)
     * @type {Object.<String, module:mgrs-utils~NonPolarGridZone>}
     * @private
     * @example
     * // returns 12
     * _ZonesDictionary["12S"].utmZone;
     */
    _ZonesDictionary: (function() {
      // The zonesDictionary object has 1197 unique keys (one for eqch MGRS grid zone).
      // Rather than load it through a single, large json text file,
      // we build it here programmatically,
      // one time, on the client

      var zoneNum, zoneLtr, nonPolarGridZone;
      // Per MGRS definition, these are the valid grid zone letters
      var zoneLetters = [
        "C","D","E","F","G","H","J","K","L","M","N",
        "P","Q","R","S","T","U","V","W","X"
      ];
      // A dictionary object containing all MGRS zones (excluding any zones that don't exist)
      // this is the object that will be returned (i.e. set as the _ZonesDictionary)
      var zonesDictionary = {};

      /**
       * Returns the NonPolarGridZone object for the zone.
       * NOTE: This is only used during the initial creation of '_ZonesDictionary' object
       * @param  {Number} zoneNum The MGRS grid zone number
       * @param  {Number} zoneLtrIndex
       * The index of the MGRS grid zone letter (w.r.t. the zoneLetters object)
       * @return {module:mgrs-utils~NonPolarGridZone}  The NonPolarGridZone object
       * @private
       */
      var ltrZoneToExtent = function(zoneNum, zoneLtrIndex) {
        var nonPolarGridZoneArgs, xmin, xmax, ymin, ymax;
        var zoneLtr = zoneLetters[zoneLtrIndex];
        var zoneId = zoneNum + zoneLtr;

        // There are several unique MGRS zones which don't follow the standard convention,
        // they are defined here:
        if (zoneId === "32X" || zoneId === "34X" || zoneId === "36X") {
          // Per the MGRS definition, these zones don't exist
          return null;
        } else if (zoneId === "31V") {
          // unique sized zone
          nonPolarGridZoneArgs = {
            "xmin": 0,
            "ymin": 56,
            "xmax": 3,
            "ymax": 64,
            "id": zoneId
          };
        } else if (zoneId === "32V") {
          // unique sized zone
          nonPolarGridZoneArgs = {
            "xmin": 3,
            "ymin": 56,
            "xmax": 12,
            "ymax": 64,
            "id": zoneId
          };
        } else if (zoneId === "31X") {
          // unique sized zone
          nonPolarGridZoneArgs = {
            "xmin": 0,
            "ymin": 72,
            "xmax": 9,
            "ymax": 84,
            "id": zoneId
          };
        } else if (zoneId === "33X") {
          // unique sized zone
          nonPolarGridZoneArgs = {
            "xmin": 9,
            "ymin": 72,
            "xmax": 21,
            "ymax": 84,
            "id": zoneId
          };
        } else if (zoneId === "35X") {
          // unique sized zone
          nonPolarGridZoneArgs = {
            "xmin": 21,
            "ymin": 72,
            "xmax": 33,
            "ymax": 84,
            "id": zoneId
          };
        } else if (zoneId === "37X") {
          // unique sized zone
          nonPolarGridZoneArgs = {
            "xmin": 33,
            "ymin": 72,
            "xmax": 42,
            "ymax": 84,
            "id": zoneId
          };
        } else {
          // These are the default zones that do follow the standard MGRS convention:

          // Compute the extent attributes of the zone
          xmin = (zoneNum - 1) * constants.ZONE_WIDTH_DEGREES - 180;
          xmax = zoneNum * constants.ZONE_WIDTH_DEGREES - 180;
          ymin = zoneLtrIndex * constants.ZONE_HEIGHT_DEGREES + constants.MIN_MGRS_LATITUDE;
          ymax = (zoneLtrIndex + 1) * constants.ZONE_HEIGHT_DEGREES  + constants.MIN_MGRS_LATITUDE;

          // Fix special cases where the numbers need to be adjusted
          // exactly 180 or -180 causes problems, changes it to something close
          xmin = xmin === 180 ? constants.POSITIVE_180 : xmin;
          xmin = xmin === -180 ? constants.NEGATIVE_180 : xmin;
          xmax = xmax === 180 ? constants.POSITIVE_180 : xmax;
          xmax = xmax === -180 ? constants.NEGATIVE_180 : xmax;
          if (ymax === 80) {
            // the top row of MGRS grid zones is taller than most, in order to extent to N84°
            ymax  =  constants.MAX_MGRS_LATITUDE;
          }

          nonPolarGridZoneArgs = {
            "xmin": xmin,
            "ymin": ymin,
            "xmax": xmax,
            "ymax": ymax,
            "id": zoneId
          };
        }
        return new NonPolarGridZone(nonPolarGridZoneArgs);
      };

      // Loop through all possible zone number/letter combinations,
      // building the NonPolarGridZone object for each
      for (zoneNum = 1; zoneNum <= 60; zoneNum++) {
        for (zoneLtr = 0; zoneLtr < zoneLetters.length; zoneLtr++) {
          nonPolarGridZone = ltrZoneToExtent(zoneNum, zoneLtr);
          if (nonPolarGridZone) {
            zonesDictionary[nonPolarGridZone.id] = nonPolarGridZone;
          }
        }
      }

      // Loop through all possible zone number/letter combinations,
      // and add the full utm zone geometry
      for (zoneNum = 1; zoneNum <= 60; zoneNum++) {
        var geometriesToUnion = [];
        //this first loop creates an array of geometries for a single UTM zone
        for (zoneLtr = 0; zoneLtr < zoneLetters.length; zoneLtr++) {
          nonPolarGridZone = ltrZoneToExtent(zoneNum, zoneLtr);
          if (nonPolarGridZone) {
            var polygon = new Polygon({
              rings: JSON.parse(JSON.stringify(nonPolarGridZone._rings))
            });
            geometriesToUnion.push(polygon);
          }
        }
        //union the geometries to create a single polygon
        var union = geometryEngine.union(geometriesToUnion);
        // loop back through each letter combination add the single zone geometry
        for (zoneLtr = 0; zoneLtr < zoneLetters.length; zoneLtr++) {
          nonPolarGridZone = ltrZoneToExtent(zoneNum, zoneLtr);
          if (nonPolarGridZone) {
            zonesDictionary[nonPolarGridZone.id.fullZoneGeometry] = union;
          }
        }
      }
      return zonesDictionary;
    })(),

    /**
     * Finds the intersecting MGRS grid zones from the input extent
     * @param  {Object} grid The grid overlay object
     * @return {module:mgrs-utils~VisibleGridZone[]} An array of non-polar grid zones
     */
    zonesFromExtent: function(extent,map) {
      var xmin, ymin, xmax, ymax, minLtr, maxLtr, minNum, maxNum,
          ltr, idx, rings, polygon, polygon_i,
          minXOffset, maxXOffset;
      var mapExtent = extent;
      var deg360 = mapExtent.spatialReference.isWebMercator() ?
        constants.WEBMERCATOR_360 :
        constants.GEOGRAPHIC_360;

      // per MGRS definition, these are the valid grid zone letters
      var zoneLetters = [
        "C","D","E","F","G","H","J","K","L","M",
        "N","P","Q","R","S","T","U","V","W","X"
      ];
      // this will be the returned array (of VisibleGridZone objects)
      var visibleGridZones = [];

      // check to see if the map extent spans the entire globe
      // (longitudinally) and hide the grid if it does
      if ((mapExtent.xmax - mapExtent.xmin) > deg360) {
        return visibleGridZones;
      }

      // polygon geometry of map extent, used for intersect later on
      var mapExtentPolygon = gridGeomUtils.extentToPolygon(mapExtent);
      mapExtentPolygon = gridGeomUtils.toWebMercator(mapExtentPolygon);

      // used to find min/max values of x and y, as well as to determine wraparound offset
      var southwestPoint = gridGeomUtils.pointToGeographic(
        new Point([mapExtent.xmin, mapExtent.ymin],mapExtent.spatialReference)
      );
      var northeastPoint = gridGeomUtils.pointToGeographic(
        new Point([mapExtent.xmax, mapExtent.ymax], mapExtent.spatialReference)
      );

      // ymin and ymax are geographic latitudes
      ymin = southwestPoint.y;
      ymax = northeastPoint.y;

      // when map is in wraparound mode, determine if map extent spans left of 180°W
      minXOffset = southwestPoint.offsetX;

      // when map is in wraparound mode, determine if map extent spans east of 180°E
      maxXOffset = northeastPoint.offsetX;

      // when the map is in wraparound mode, handle each span separately
      // (divided by Int'l Date Line)
      for (var x_offset = minXOffset; x_offset <= maxXOffset; x_offset++) {

        // xmin and xmax are gegraphic longitudes
        if (x_offset > minXOffset) {
          xmin = constants.NEGATIVE_180;
        } else {
          xmin = southwestPoint.x;
        }
        if (x_offset < maxXOffset) {
          xmax = constants.POSITIVE_180;
        } else {
          xmax = northeastPoint.x;
        }

        // find the min and max MGRS grid zone letters by dividing the
        // vertical extent by zone height (normally 8°),
        // only considering the valid range of -80° => +84°
        minLtr = Math.min(Math.max(Math.floor((ymin + 80) / constants.ZONE_HEIGHT_DEGREES), 0), 19);
        maxLtr = Math.min(Math.floor((ymax + 80) / constants.ZONE_HEIGHT_DEGREES), 19);
        minNum = Math.floor((xmin + 180) / constants.ZONE_WIDTH_DEGREES);
        maxNum = Math.min(Math.floor((xmax + 180) / constants.ZONE_WIDTH_DEGREES) + 2, 60);

        // loop through each zone number
        for (var num = minNum; num <= maxNum; num++) {

          // loop through each zone letter
          for (var l = minLtr; l <= maxLtr; l++) {

            // convert zone letter from int to character
            ltr = zoneLetters[l];
            idx = num + ltr; // index of zone

            if (!this._ZonesDictionary[idx]) {
              // skip and goto next zone if zone index is valid?
              continue;
            }
            // create a copy of the zone paths
            rings = JSON.parse(JSON.stringify(this._ZonesDictionary[idx]._rings));

            // modify the zone paths for x_offset
            for (var i = 0; i < rings[0].length; i++) {
              rings[0][i][0] += x_offset * constants.GEOGRAPHIC_360;
            }

            // create polygon from new zone paths
            polygon = new Polygon({
              rings: rings
            });

            // check if zone polygon intersects with the original mapextent
            polygon_i = geometryEngine.intersect(
              gridGeomUtils.toWebMercator(polygon),
              mapExtentPolygon);
            if (polygon_i) {
              // create a VisibleGridZone instance and add it to the visibleGridZones results array
              visibleGridZones.push( new VisibleGridZone({
                "map": map,
                "polygon": polygon_i,
                "fullZoneGeometry": this._ZonesDictionary[idx].fullZoneGeometry,
                "offset": x_offset,
                "nonPolarGridZone": this._ZonesDictionary[idx],
                "utmZone": this._ZonesDictionary[idx].utmZone,
                "latitudeBand": this._ZonesDictionary[idx].latitudeZone
              }));
            }
          }
        }
      }
      return visibleGridZones;
    },

    /**
     * Processes an array of visible grid zone and hands them off to the appropriate handler(s)
     * @param  {module:mgrs-utils~VisibleGridZone[]} visibleGridZone A VisibleGridZone object
     * @param  {object} grid The grid overlay object that is calling this method
     */
    processZonePolygons: function(visibleGridZones, map, extent) {

      var polys = [];
      extent = gridGeomUtils.toWebMercator(extent);

      for (var i = 0; i < visibleGridZones.length; i++) {
        var visibleGridZone = visibleGridZones[i];
        if (visibleGridZone) {

          var latitudeZone = visibleGridZone.nonPolarGridZone.latitudeZone;

          var clippedExtent = gridGeomUtils.toGeographic(visibleGridZone.polygon.getExtent());

          // compute the UTM of each extent corner, as a basis for finding the min/max values
          var lowerLeftUtm = mgrs.LLtoUTM(clippedExtent.ymin, clippedExtent.xmin,
            visibleGridZone.nonPolarGridZone.utmZone);
          var lowerRightUtm = mgrs.LLtoUTM(clippedExtent.ymin, clippedExtent.xmax,
            visibleGridZone.nonPolarGridZone.utmZone);
          var upperRightUtm = mgrs.LLtoUTM(clippedExtent.ymax, clippedExtent.xmax,
            visibleGridZone.nonPolarGridZone.utmZone);
          var upperLeftUtm = mgrs.LLtoUTM(clippedExtent.ymax, clippedExtent.xmin,
            visibleGridZone.nonPolarGridZone.utmZone);

          // using the UTM coordinates, find the min/max values
          // (index 0 of a UTM point is easting, 1 is northing)
          var minEasting = Math.min(lowerLeftUtm[0],
            lowerRightUtm[0], upperRightUtm[0], upperLeftUtm[0]);
          var maxEasting = Math.max(lowerLeftUtm[0],
            lowerRightUtm[0], upperRightUtm[0], upperLeftUtm[0]);
          var minNorthing = Math.min(lowerLeftUtm[1],
          lowerRightUtm[1], upperRightUtm[1], upperLeftUtm[1]); // - 10000;
          var maxNorthing = Math.max(lowerLeftUtm[1],
            lowerRightUtm[1], upperRightUtm[1], upperLeftUtm[1]);

          var handlerArgs = {
            "minE": minEasting,
            "maxE": maxEasting,
            "minN": minNorthing,
            "maxN": maxNorthing,
            "utmZone": visibleGridZone.nonPolarGridZone.utmZone,
            "latitudeZone": latitudeZone,
            "polygon": visibleGridZone.polygon,
            "offset": visibleGridZone.offset,
            "fullZoneGeometry": gridGeomUtils.extentToPolygon(
              visibleGridZone.nonPolarGridZone.extent)
          };
          polys = polys.concat(this.handle100kGrids(handlerArgs, map, extent));
        }
      }
      return polys;
    },

    /**
     * Creates graphics for the 100K meter grids
     * @param  {module:mgrs-utils~MgrsGridHandlerArguments} args
     * An object holding the arguments for the various handlers
     *
     */
    handle100kGrids: function(args, map, extent) {
      var zonePolygon = args.polygon;
      var offset = args.offset;
      var utmZone = args.utmZone;
      var latitudeZone = args.latitudeZone;
      var fullZoneGeometry = args.fullZoneGeometry;
      var minE = args.minE;
      var maxE = args.maxE;
      var minN = args.minN;
      var maxN = args.maxN;
      var poly100k = [];

      var n, e, i, ring, pt, text, polygon, gridPolygonArgs, gridPolygon;

      // Loop through northings, starting at the increment just south of minN
      // go through each increment of 100K meters, until maxN is reached
      for (n = Math.floor(minN / 100000) * 100000; n < maxN; n += 100000) {

        // Loop through eastings, starting at the increment just west of minE
        // go through each increment of 100K meters, until maxE is reached
        for (e = Math.floor(minE / 100000) * 100000; e < maxE; e += 100000) {
          // For each 100k increment of n & e, build a 100k by 100k grid polygon,
          // used for labeling and border graphics

          // find the label of the 100K grid
          text = mgrs.findGridLetters(utmZone,
            (n + 50000 < 0 ? 10000000 + (n + 50000) : n + 50000), e + 50000);

          // Build the 100k grid boundary
          ring = [];
          // start at the bottom left corner, and work east to
          // the bottom right corner (in 10k m increments)
          // this is a faster way of densifying the line, since it
          // will appear to be curved on the map
          for (i = e; i <= e + 100000; i += 10000) {
            pt = mgrs.UTMtoLL(n, i, utmZone);
            ring.push([pt.lon, pt.lat]);
          }
          // continue adding points to the polygon, working from the
          // bottom right to top right corner
          for (i = n; i < n + 100000; i += 10000) {
            pt = mgrs.UTMtoLL(i, e + 100000, utmZone);
            ring.push([pt.lon, pt.lat]);
          }
          // continue adding points to the polygon, working from the top right to top left corner
          for (i = e + 100000; i >= e;i -= 10000) {
            pt = mgrs.UTMtoLL(n + 100000, i, utmZone);
            ring.push([pt.lon, pt.lat]);
          }
          // continue adding points to the polygon, working from
          // the top left to the bottom left corner (to close the polygon)
          for (i = n + 100000; i >= n; i -= 10000) {
            pt = mgrs.UTMtoLL(i, e, utmZone);
            ring.push([pt.lon, pt.lat]);
          }
          // now that the polygon ring is built, shift it left/right to match the x-offset
          // (i.e. how many increments left or right of the dateline, to support wraparound maps)
          for (i = 0; i < ring.length; i++) {
            ring[i][0] += offset * constants.GEOGRAPHIC_360;
          }
          // create the polygon, from the ring created above
          polygon = new Polygon([ring]);

          //we need to rotate the drawn extent to match the angle of the grid
          var angle = geomUtils.getAngleBetweenPoints(
            polygon.getPoint(0, polygon.rings[0].length - 1),
            polygon.getPoint(0, polygon.rings[0].length - 2));
          var extentRotated = geometryEngine.rotate(
            gridGeomUtils.extentToPolygon(extent),angle * -1);

          // now that the 100k grid polygon exists, clip it by the grid zone polygon
          var clippedPolygon = geometryEngine.intersect(
            gridGeomUtils.toWebMercator(polygon),
            gridGeomUtils.toWebMercator(zonePolygon));

          var clippedPolygonRotated = geometryEngine.intersects(
              extentRotated,
              gridGeomUtils.toWebMercator(polygon));

          // after being clipped above, they may no longer exist
          // (i.e. they were not within the bounds of the zone)
          // if this is the case, skip the rest and move on to the next increment of n or e
          if (clippedPolygon || clippedPolygonRotated) {
            var clippedPolyToUTMZone;
            if(clippedPolygonRotated) {
                clippedPolyToUTMZone = geometryEngine.intersect(
                gridGeomUtils.toWebMercator(polygon),
                gridGeomUtils.toWebMercator(fullZoneGeometry));
              }

            gridPolygonArgs = {
              "clippedPolygon": clippedPolygon,
              "unclippedPolygon": polygon,
              "clippedPolyToUTMZone": clippedPolyToUTMZone,
              "map": map,
              "xmin": e,
              "ymin": n,
              "xmax": (e + 100000),
              "ymax": (n + 100000),
              "x": "",
              "y": "",
              "minMaxType": "utm",
              "utmZone": utmZone,
              "latitudeZone": latitudeZone,
              "utmZonePoly": zonePolygon,
              "fullZoneGeometry" : fullZoneGeometry,
              "GZD": text,
              "text": text
            };

            if(!clippedPolyToUTMZone){
                continue;
            }

            gridPolygon = new GridPolygon(gridPolygonArgs);
            poly100k.push(gridPolygon);
          }
        }
      }
      return poly100k;
    },

    /**
     * Creates graphics for grid interval
     * (i.e. lines at less than 100K meter spacing)
     * @param  {module:mgrs-utils~MgrsGridHandlerArguments} poly
     * An object holding the arguments for the various handlers
     */
    handleGridSquares: function(poly, map, interval, extent) {
      // This method is similar in nature to the 'handle100kGrids' method
      var polyOut = [];
      var zonePolygon = poly.utmZonePoly;
      var latitudeZone = poly.latitudeZone;
      var utmZone = poly.utmZone;
      var fullZoneGeometry = poly.fullZoneGeometry;
      var GZD = poly.GZD;
      var minE = poly.xmin;
      var maxE = poly.xmax;
      var minN = poly.ymin;
      var maxN = poly.ymax;
      var n, e, text, polygon, gridPolygonArgs, extentRotated;
      var ptBL, ptBR, ptTL, ptTR;
      var firstRow = true;
      var firstColumn = true;

      extent = gridGeomUtils.toWebMercator(extent);

      for (n = Math.floor(minN / interval) * interval; n < maxN; n += interval) {
        for (e = Math.floor(minE / interval) * interval; e < maxE; e += interval) {
            var ring = [];
            ptBL = mgrs.UTMtoLL(n, e, utmZone);
            ring.push([ptBL.lon, ptBL.lat]);
            ptTL = mgrs.UTMtoLL(n + interval, e, utmZone);
            ring.push([ptTL.lon, ptTL.lat]);
            ptTR = mgrs.UTMtoLL(n + interval, e + interval, utmZone);
            ring.push([ptTR.lon, ptTR.lat]);
            ptBR = mgrs.UTMtoLL(n, e + interval, utmZone);
            ring.push([ptBR.lon, ptBR.lat]);
            //close off poly
            ring.push([ptBL.lon, ptBL.lat]);

            polygon = new Polygon([ring]);

            var clippedExtent = geometryEngine.intersect(
              gridGeomUtils.toWebMercator(gridGeomUtils.extentToPolygon(extent)),
              gridGeomUtils.toWebMercator(fullZoneGeometry));

            if (firstRow && firstColumn) {
              //we only need to calculate the angle for the first polygon in the group
              var angle = geomUtils.getAngleBetweenPoints(
                new Point(ptBL.lon,ptBL.lat),new Point(ptTL.lon,ptTL.lat));
              extentRotated = geometryEngine.rotate(clippedExtent,angle * -1);
            }

            var clippedPolygon = geometryEngine.intersect(
              gridGeomUtils.toWebMercator(polygon),
              zonePolygon);

            var clippedPolygonRotated = geometryEngine.intersects(
              extentRotated,
              gridGeomUtils.toWebMercator(polygon));

            var clippedPolyToUTMZone;
            if (clippedPolygon || clippedPolygonRotated) {
              if(clippedPolygonRotated) {
                clippedPolyToUTMZone = geometryEngine.intersect(
                gridGeomUtils.toWebMercator(polygon),
                gridGeomUtils.toWebMercator(fullZoneGeometry));
              }
              text = GZD + (this._padZero(e % 100000 / interval,
                5 - Math.log10(interval))).toString() +
                (this._padZero((minN < 0 ? (10000000 + n) : n) % 100000 / interval,
                5 - Math.log10(interval))).toString();

              gridPolygonArgs = {
                "clippedPolygon": clippedPolygon,
                "unclippedPolygon": polygon,
                "fullZoneGeometry": fullZoneGeometry,
                "clippedPolyToUTMZone": clippedPolyToUTMZone,
                "map": map,
                "xmin": e,
                "ymin": n,
                "xmax": e + interval,
                "ymax": n + interval,
                "x": this._padZero(e % 100000 / interval,  5 - Math.log10(interval)).toString(),
                "y": this._padZero((minN < 0 ? (10000000 + n) : n) % 100000 /
                  interval,5 - Math.log10(interval)).toString(),
                "minMaxType": "utm",
                "utmZone": utmZone,
                "latitudeZone": latitudeZone,
                "GZD": GZD,
                "utmZonePoly": zonePolygon,
                "text": text
              };

              if(!clippedPolyToUTMZone){
                continue;
              }
              var gridPolygon = new GridPolygon(gridPolygonArgs);
              polyOut.push(gridPolygon);
            }
        firstRow = false;
        firstColumn = false;
        }
      }
      return polyOut;
    },

    /**
     * Pads text with zeros
     */
    _padZero: function(number, width) {
      number = number.toString();
      while (number.length < width) {
        number = "0" + number;
      }
      return number;
    }
  };
});