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
 *  @fileOverview Module containing geometry utilities used by GridOverlay widgets.
 *  @author Esri
 */

/**
 *  @module geometry-utils
 *  @description Module containing geometry utilities used by GridOverlay widgets.
 */

define([
  "./constants",
  "esri/geometry/webMercatorUtils",
  "esri/geometry/Polyline",
  "esri/geometry/Polygon"
], function(
  constants,
  webMercatorUtils,
  Polyline,
  Polygon
) {

  return {

    /**
     * Converts any geometry from WebMercator to Geographic, or does nothing if it already is
     * NOTE: Does not modify the input geometry object
     * @param  {external:Geometry} geometry   An esri geometry object
     * @return {external:Geometry}            A geometry oject that is Geographic
     */
    toGeographic: function(geometry) {
      if (geometry.spatialReference.isWebMercator()) {
        return webMercatorUtils.webMercatorToGeographic(geometry);
      }
      return geometry;
    },

    /**
     * Converts any geometry to WebMercator from Geographic, or does nothing if it already is
     * NOTE: Does not modify the input geometry object
     * @param  {external:Geometry} geometry   An esri geometry object
     * @return {external:Geometry}            A geometry oject that is WebMercator
     */
    toWebMercator: function(geometry) {
      if (!geometry.spatialReference.isWebMercator()) {
        return webMercatorUtils.geographicToWebMercator(geometry);
      }
      return geometry;
    },

    /**
     * Converts a geographic latitude to Web Mercator (assumes WGS84)
     * NOTE: This local method is favored over external API methods for better performances
     * @param  {Number} latitude A WGS84 geographic latitude
     * @return {Number} A WGS84 Web Mercator <em>y</em>
     * @private
     */
    _latitudeToWebMercatorY: function(latitude) {
      var y = latitude;
      var deg180 = constants.GEOGRAPHIC_360 / 2;
      var eRadius = constants.WGS84_EQUATORIAL_RADIUS;
      return (constants.HALF_PI -
        (2.0 * Math.atan(Math.exp((-1.0 * y) / eRadius)))) * deg180 / Math.PI;
    },

    /**
     * Converts a geographic longitude to Web Mercator (assumes WGS84)
     * NOTE: This local method is favored over external API methods for better performance
     * @param  {number} longitude A WGS84 geographic longitude
     * @return {Number} A WGS84 Web Mercator <em>x</em>
     * @private
     */
    _longitudeToWebMercatorX: function(longitude) {
      var x = longitude;
      var deg360 = constants.GEOGRAPHIC_360;
      var deg180 = constants.GEOGRAPHIC_360 / 2;
      var eRadius = constants.WGS84_EQUATORIAL_RADIUS;
      return x / eRadius * deg180 / Math.PI -
        (Math.floor((x / eRadius * deg180 / Math.PI + deg180) / deg360) * deg360);
    },

    /**
     * A point-like geometry object, with x an y properties,
     * and containing the non-normalized x-offset of the point
     * @typedef  module:geometry-utils~GeogprahicPoint
     * @property {Number} x         The longitude
     * @property {Number} y         The latitude
     * @property {Number} offsetX   The <em>x</em> offset
     */

    /**
     * Converts a geometry Point from WebMercator to Geographic and
     * denotes the <em>x</em> offset from the range: 180°W => 180°E
     * NOTE: Does not modify the input point object
     * @param  {external:Point} point A geometry Point object
     * @return {module:geometry-utils~GeogprahicPoint} A geographic point object
     */
    pointToGeographic: function(point) {
      var x = point.x;
      var y = point.y;
      var isWebMercator = point.spatialReference.isWebMercator();

      // Set the limits based on whether or not the point is WebMercator or Geographic
      // This is used to calculate the x_offset value
      var westernLimit = isWebMercator ?
        constants.WEST_WEBMERCATOR_LIMIT :
        constants.WEST_GEOGRAPHIC_LIMIT;
      var easternLimit = isWebMercator ?
        constants.EAST_WEBMERCATOR_LIMIT :
        constants.EAST_GEOGRAPHIC_LIMIT;
      var span360 = isWebMercator ?
        constants.WEBMERCATOR_360 :
        constants.GEOGRAPHIC_360;

      // retain how far left/right of int'l dateline the original point is
      var x_offset = 0;

      // fix for x west of int'l dateline
      while (x <= westernLimit) {
        x += span360;
        x_offset -= 1;
      }

      // fix for x east of int'l dateline
      while (x > easternLimit) {
        x -= span360;
        x_offset += 1;
      }

      if (isWebMercator) {
        // convert web mercator point to geographic
        x = this._longitudeToWebMercatorX(x);
        y = this._latitudeToWebMercatorY(y);
      }

      return {
        "x": x,
        "y": y,
        "offsetX": x_offset
      };
    },

    /**
     * Converts an Extent geometry to a Polygon geometry (it does not modify the input point object)
     * <strong>NOTE:</strong> Unlike the ArcGIS API for JavaScript's method (Polygon.fromExtent),
     * this does not normalize the extent before converting to polygon
     * @param  {external:Extent}   extent  A geometry Extent object
     * @return {external:Polygon}          A geometry Polygon object
     */
    extentToPolygon: function(extent) {
      return new Polygon({
        rings: [[
          [extent.xmin, extent.ymin],
          [extent.xmax, extent.ymin],
          [extent.xmax, extent.ymax],
          [extent.xmin, extent.ymax],
          [extent.xmin, extent.ymin]  // close the polygon
        ]],
        spatialReference: extent.spatialReference
      });
    },

    /**
     * Converts an Polygon geometry to a Polyline geometry
     * NOTE: Does not modify the input polygon object
     * @param  {external:Polygon} polygon   A geometry Polygon object
     * @return {external:Polyline}          A geometry Polyline object
     */
    polygonToPolyline: function(polygon) {
      return new Polyline({
        "paths": polygon.rings,
        "spatialReference":{"wkid": polygon.spatialReference.wkid}
      });
    }

  };
});