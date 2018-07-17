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
 *  @fileOverview Contains the NonPolarGridZone class used by MGRS GridOverlay widgets.
 *  @author Esri
 */

define([
  "dojo/_base/declare",
  "dojo/json",
  "./constants",
  "esri/geometry/Polygon",
  "esri/geometry/Polyline",
  "esri/geometry/Extent"
], function(
  declare,
  JSON,
  constants,
  Polygon,
  Polyline,
  Extent
) {

  /**
   * An object that contains arguments used during NonPolarGridZone construction
   * @typedef {Object} module:mgrs-utils~NonPolarGridZoneArguments
   * @property {String} properties.id       The MGRS grid zone ID (e.g. "12S")
   * @property {Number} properties.xmin     The minimum longitude of the grid zone (-180 => 174)
   * @property {Number} properties.ymin     The minimum latitude of the grid zone (-80 => 72)
   * @property {Number} properties.xmax     The maximum longitude of the grid zone (-174 => 180)
   * @property {Number} properties.ymax     The maximum latitude of the grid zone (-72 => 84)
   * @property {external:SpatialReference}
   * [properties.spatialReference={wkid: 4326}]   The spatial referencence object
   */

  /**
   * @class module:mgrs-utils~NonPolarGridZone
   * @classdesc Contains the properties of a non-polar MGRS grid zone,
   * as defined in the MGRS definition.
   *
   * @constructor
   * @param {module:mgrs-utils~NonPolarGridZoneArguments} args
   * The NonPolarGridZone constructor arguments object
   *
   * @example
   * var nonPolarGridZoneArgs = {
   *   xmin: -114,
   *   ymin: 32,
   *   xmax: -108,
   *   ymax: 40,
   *   id: "12S"
   * }
   *
   * // gridZone will be an object equivalent to:
   * //   {
   * //      "id": "12S",
   * //      "utmZone": 12,
   * //      "latitudeZone": "S",
   * //      "extent": {
   * //          "type": "extent",
   * //          "xmin": -114,
   * //          "ymin": 32,
   * //          "xmax": -108,
   * //          "ymax": 40,
   * //          "spatialReference": {"wkid": 4326}
   * //      }
   * //   }
   * var gridZone = new NonPolarGridZone(nonPolarGridZoneArgs);
   */
  return declare(null, /** @lends module:mgrs-utils~NonPolarGridZone# */ {

    /** The extent of the grid zone
     * @type {external:Extent}
     */
    "extent": null,

    /** The MGRS grid zone ID (or label; e.g. "12S")
     * @type {String}
     */
    "id": null,

    /** The UTM longitude zone (usually 6° wide)
     * @type {Number}
     */
    "utmZone": null,

    /** The latitude zone (usually 8° tall)
     * @type {String}
     */
    "latitudeZone": null,

    /** An array of rings, used to construct a polygon from the NonPolarGridZone
     * @type {Number[][][]}
     * @private
     */
    "_rings": [],

    constructor: function(args) {
      var lowerLeftCorner, lowerRightCorner, upperRightCorner, upperLeftCorner;

      // parse and set the UTM zone and latitude zone from the id
      // (i.e. "12S" would parse to ['12', 'S'])
      var parseId = args.id.match(/(\d+)|([A-Za-z]+)/g);
      this.id = args.id;
      this.utmZone = parseId[0] * 1;
      this.latitudeZone = parseId[1];

      // create the extent object for this instance
      this.extent = new Extent({
        "xmin": args.xmin,
        "ymin": args.ymin,
        "xmax": args.xmax,
        "ymax": args.ymax,
        "spatialReference": args.spatialReference || {wkid: 4326}
      });

      // Construct rings to be used later to construct a polygon
      // from a NonPolarGridZone instance.
      // Don't create the polygon now, because the same instance
      // is reused as the map is in wraparound mode.
      // Thus, the 'toPolygon' method is used for retreiving a polygon when needed
      lowerLeftCorner = [this.extent.xmin, this.extent.ymin];
      lowerRightCorner = [this.extent.xmax, this.extent.ymin];
      upperRightCorner = [this.extent.xmax, this.extent.ymax];
      upperLeftCorner = [this.extent.xmin, this.extent.ymax];
      this._rings = [[
        lowerLeftCorner,
        lowerRightCorner,
        upperRightCorner,
        upperLeftCorner,
        lowerLeftCorner
       ]];
    },

    /**
     * Convert to a polygon
     * @param  {Number} [offsetX=0] Instruction to return a non-normalized polygon
     * (i.e. falls outside the normal world extent)
     * Used for drawing grids when a map is in wraparound mode
     * NOTE: Specify a negative integer for west of W180° OR a positive integer for east of E180°
     * @return {external:Polygon} The zone, represented as a Polygon
     */
    toPolygon: function(offsetX) {
      var rings = JSON.parse(JSON.stringify(this._rings));

      // Shift the rings left/right to match the x-offset (i.e. how many increments left or right
      // of the dateline, to support wraparound maps)
      if (offsetX) {
        for (var i = 0; i < rings[0].length; i++) { // modify the zone paths for x_offset
          rings[0][i][0] += offsetX * constants.GEOGRAPHIC_360;
        }
      }

      // build and return the polygon
      return new Polygon({
        "rings": rings,
        "spatialReference": this.spatialReference
      });
    },

    /**
     * Convert to a polyline
     * @param  {Number} [offsetX=0] Instruction to return a non-normalized polyline
     * (i.e. falls outside the normal world extent)
     * Used for drawing grids when a map is in wraparound mode
     * NOTE: Specify a negative integer for west of W180° OR a positive integer for east of E180°
     * @return {external:Polyline} The zone, represented as a Polyline
     */
    toPolyline: function(offsetX) {
      var paths = JSON.parse(JSON.stringify(this._rings));

      // Shift the rings left/right to match the x-offset (i.e. how many increments left or right
      // of the dateline, to support wraparound maps)
      if (offsetX) {
        for (var i = 0; i < paths[0].length; i++) { // modify the zone paths for x_offset
          paths[0][i][0] += offsetX * constants.GEOGRAPHIC_360;
        }
      }

      // build and return the polyline
      return new Polyline({
        "paths": paths,
        "spatialReference": this.spatialReference
      });
    }

  });
});