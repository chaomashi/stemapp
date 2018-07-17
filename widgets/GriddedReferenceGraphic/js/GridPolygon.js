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
 *  @fileOverview Contains the GridPolygon class used by GRG widget.
 *  @author Esri
 *
 * @todo  Review, add and cleanup the code comments (including JSDoc comments)
 */

define([
  "dojo/_base/declare"
], function (
  declare
) {

  /**
   * @classdesc A GridPolygon object is derived by taking a parent (non-clipped) grid polygon,
   * along with the same polygon clipped by the current map screen extent
   * (clippedPolygon) and used for deriving labels and priority
   *
   * @constructor
   * @param {Object}
   * properties
   * The GridPolygon constructor takes an object as described below
   * @param {external:Polygon}
   * properties.unclippedPolygon
   * A geometry Polygon object that represents the non-clipped geometry of the grid polygon
   * @param {external:Polygon}
   * properties.clippedPolygon
   * A geometry Polygon object that represents the visible portion of the unclipped polygon
   * @param {external:Map}
   * properties.map
   * The Map object that is tied to the Grid Overlay
   * @param {Number}
   * properties.xmin
   * The minimum x-coordinate value of the unclipped polygon
   * (the coordinate units are specified in the minMaxType property)
   * @param {Number}
   * properties.ymin
   * The minimum y-coordinate value of the unclipped polygon
   * (the coordinate units are specified in the minMaxType property)
   * @param {Number}
   * properties.xmax
   * The maximum x-coordinate value of the unclipped
   * polygon (the coordinate units are specified in the minMaxType property)
   * @param {Number}
   * properties.ymax
   * The maximum y-coordinate value of the unclipped polygon
   * (the coordinate units are specified in the minMaxType property)
   * @param {String}
   * [properties.minMaxType="degrees"]
   * The type of unit for the min and max coordinate values "<degrees | utm>"
   * @param {Number}
   * [properties.utmZone=0]
   * If minMaxType is "utm", then this poperty holds the utm zone number
   * @param {String}
   * properties.text
   *
   * @todo  Review, add and cleanup the code comments (including JSDoc comments)
   */
  return declare(null, {
    /** A geometry Polygon object that represents the clipped geometry of the grid polygon
     * @type external:Polygon
     */
    "clippedPolygon": null,

    /** A geometry Polygon object that represents the visible portion of the unclipped polygon
     * @type external:Polygon
     */
    "unclippedPolygon": null,

    /** A geometry Polygon object that represents the visible portion of
     * the clipped polygon to the full utm zone
     * @type external:Polygon
     */
     "clippedPolyToUTMZone": null,

    /** The Map object that is tied to the Grid Overlay
     * @type external:Polygon
     */
    "utmZonePoly": null,

    /** A geometry Polygon object that represents the full utm zone geometry
     * @type external:Polygon
     */
    "fullZoneGeometry": null,

    /** A geometry Polygon object that represents utm zone
     * @type external:Map
     */
    "map": null,

    /** The minimum x-coordinate value of the unclipped polygon
    (the coordinate units are specified in the minMaxType property)
     * @type Number
     */
    "xmin": 0,

    /** The minimum y-coordinate value of the unclipped polygon
    (the coordinate units are specified in the minMaxType property)
     * @type Number
     */
    "ymin": 0,

    /** The minimum x-coordinate value of the unclipped polygon
    (the coordinate units are specified in the minMaxType property)
     * @type string
     */
    "x": "",

    /** The minimum y-coordinate value of the unclipped polygon
    (the coordinate units are specified in the minMaxType property)
     * @type string
     */
    "y": "",

    /** The maximum x-coordinate value of the unclipped polygon
    (the coordinate units are specified in the minMaxType property)
     * @type Number
     */
    "xmax": 0,

    /** The maximum y-coordinate value of the unclipped polygon
    (the coordinate units are specified in the minMaxType property)
     * @type Number
     */
    "ymax": 0,

    /** The type of unit for the min and max coordinate values "<degrees | utm>"
     * @type String
     */
    "minMaxType": "",

    /** If minMaxType is "utm", then this poperty holds the utm zone number
     * @type Number
     */
    "utmZone": 0,

    /** If grid is 100k or less then this property holds the 100k GZD
     * @type String
     */
    "latitudeZone": "",

    /** If grid is 100k or less then this property holds the latitude zone
     * @type String
     */
    "GZD": "",

    /** The label text for the polygon
     * @type String
     */
    "text": "",

    constructor: function (args) {
      this.unclippedPolygon = args.unclippedPolygon;
      this.clippedPolygon = args.clippedPolygon;
      this.utmZonePoly = args.utmZonePoly;
      this.fullZoneGeometry = args.fullZoneGeometry;
      this.clippedPolyToUTMZone = args.clippedPolyToUTMZone;
      this.map = args.map;
      this.xmin = args.xmin;
      this.ymin = args.ymin;
      this.xmax = args.xmax;
      this.ymax = args.ymax;
      this.x = args.x;
      this.y = args.y;
      this.minMaxType = args.minMaxType;
      this.utmZone = Math.round(args.utmZone);
      this.latitudeZone = args.latitudeZone;
      this.GZD = args.GZD;
      this.text = args.text;
    }
  });
});