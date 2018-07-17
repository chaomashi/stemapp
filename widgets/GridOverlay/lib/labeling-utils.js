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
 *  @fileOverview Module containing labeling utilities used by GridOverlay widgets.
 *  @author Esri
 */

/**
 *  @module labeling-utils
 *  @description Module containing labeling utilities used by GridOverlay widgets.
 */

define([
  "./mgrs",
  "esri/geometry/Point"
], function(
  mgrs,
  Point
) {

  // a virtual canvas (for use with getWidthOfText)
  var virtualCanvasContext = document.createElement('canvas').getContext('2d');

  return {

    /**
     * Determines the width of a text element in pixels
     * @param  {String} text       The text string to measure
     * @param  {String} fontFamily The font family (e.g. "Arial, Helvetica, sans-serif")
     * @param  {Number} fontSize   The font size in pixels
     * @return {Number} The font width in pixels
     * @example
     * // returns 22
     * getWidthOfText("12S", "Arial, Helvetica, sans-serif", 12)
     */
    getWidthOfText: function(text, fontFamily, fontSize) {
      // Set the context.font to the specified font family
      virtualCanvasContext.font = fontSize + 'px ' + fontFamily;

      // Measure the string on the virtual canvas and return the width
      return virtualCanvasContext.measureText(text).width;
    },

    /**
     * Converts a number to a string and adds leading zeros to match the specified width
     * @param  {Number} number The number to be converted to string with leading zeros
     * @param  {Number} width  The desired width of the returned string
     * @return {String} The resulting number, converted to a string, with leading zeros
     * @example
     * // returns "001"
     * padZero(1, 3)
     *
     * // returns "30" (no zero is added because width is already 2)
     * padZero(30, 2)
     */
    padZero: function(number, width) {
      number = number.toString();
      while (number.length < width) {
        number = "0" + number;
      }
      return number;
    },

    /**
     * An object that contains height and width properties,
     * used for determining screen size of graphics
     * @typedef module:labeling-utils~ScreenSize
     * @property {Number} width     The width in pixels
     * @property {Number} height    The height in pixels
     */

    /**
     * Computes the height and width of a geometry (in pixels)
     * based on the current map display (on screen)
     * @param  {external:Geometry} geometry       Any non-point esri geometry object
     * @param  {external:Map} map                 An esri map object
     * @return {module:labeling-utils~ScreenSize} An object with the height and width properties
     */
    getScreenSize: function(geometry, map) {
      var extent = geometry.getExtent();

      // lower left point
      var llPt = new Point([extent.xmin, extent.ymin], extent.spatialReference);

      // upper right point
      var urPt = new Point([extent.xmax, extent.ymax], extent.spatialReference);

      // lower left point as an esri ScreenPoint object
      var s_llPt = map.toScreen(llPt);

      // upper right point as an esri ScreenPoint object
      var s_urPt = map.toScreen(urPt);

      // the max width of the gometry (in pixels)
      var width = Math.abs(s_urPt.x - s_llPt.x);

      // the max height of the gometry (in pixels)
      var height = Math.abs(s_urPt.y - s_llPt.y);
      return {
        width: width,
        height: height
      };
    },

    /**
     * An object that contains horizontal and vertical properties,
     * used for determining screen distance of points
     * @typedef module:labeling-utils~ScreenDistance
     * @property {Number} horizontal  The horizontal distance in pixels
     * @property {Number} vertical    The vertical distance in pixels
     * @property {Number} total       The total distance in pixels
     */

    /**
     * Computes the pixel distance of a point from the map edge
     * (based on the current map screen display)
     * @param  {external:Geometry} mapPoint An esri map point geometry object
     * @param  {external:Map} map An esri map object
     * @param  {boolean} [mgrs=true] A boolean indicating if the check is for MGRS coords
     * @return {module:labeling-utils~ScreenDistance} An object with the height and width properties
     */
    distanceFromMapEdge: function(mapPoint, map) {
      var xDist, yDist, latitude;
      var screenPoint = map.toScreen(mapPoint);
      if (typeof mgrs === "undefined") {
        mgrs = true;
      }

      // compute the horizontal distance to the map edge
      xDist = Math.min(
        Math.abs(map.width - screenPoint.x),
        Math.abs(screenPoint.x));

      // compute the vertical distance to the map edge
      yDist = Math.min(
        Math.abs(map.height - screenPoint.y),
        Math.abs(screenPoint.y));

      // since MGRS vertical limits are -80 and 84, if the latitude is this value, then yDist = 0
      if (mgrs) {
        latitude = Math.round(mapPoint.getLatitude() * 10000) / 10000;
        if (latitude === 84 || latitude === -80) {
          yDist = 0;
        }
      }

      // compute the total distance
      var totalDist = Math.sqrt(xDist * xDist + yDist * yDist);

      return {
        "horizontal": xDist,
        "vertical": yDist,
        "total": totalDist
      };
    },

    /**
     * Computes the pixel distance between points (based on the current map screen display)
     * @param  {external:Geometry} mapPoint1          An esri map point geometry object
     * @param  {external:Geometry} mapPoint2          An esri map point geometry object
     * @param  {external:Map} map                     An esri map object
     * @return {module:labeling-utils~ScreenDistance} An object with the height and width properties
     */
    screenDistanceBetweenPoints: function(mapPoint1, mapPoint2, map) {
      var screenPoint1 = map.toScreen(mapPoint1);
      var screenPoint2 = map.toScreen(mapPoint2);

      // compute the horizontal distance between points
      var xDist = Math.abs(screenPoint1.x - screenPoint2.x);

      // compute the vertical distance between points
      var yDist = Math.abs(screenPoint1.y - screenPoint2.y);

      // compute the total distance
      var totalDist = Math.sqrt(xDist * xDist + yDist * yDist);

      return {
        "horizontal": xDist,
        "vertical": yDist,
        "total": totalDist
      };
    }

  };
});
