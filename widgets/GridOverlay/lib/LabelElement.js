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
 *
 * @todo  Review, add and cleanup the code comments (including JSDoc comments)
 */

define([
  "dojo/_base/declare",
  "./geometry-utils",
  "./labeling-utils",
  "esri/geometry/geometryEngine",
  "esri/geometry/screenUtils",
  "esri/graphic",
  "esri/geometry/Point",
  "esri/geometry/Extent",
  "esri/symbols/Font",
  "esri/symbols/TextSymbol"
], function(
  declare,
  gridGeomUtils,
  gridLabelUtils,
  geometryEngine,
  screenUtils,
  Graphic,
  Point,
  Extent,
  Font,
  TextSymbol
) {

  /**
   * An object that contains arguments used during labeling,
   * allowing objects to be passed by reference
   * @typedef module:labeling-utils~LabelParameters
   * @property {Number} xOffset: The <em>x</em> offset
   * @property {Number} yOffset: The <em>y</em> offset
   * @property {Number} rotation:
   * The text rotation in degrees clockwise (must be an increment of 90°). 0 = Horizontal
   * @property {external:Color}         The color of the label text
   * @property {String} fontFamily      The font-family of the text
   * @property {Number|String} fontSize The css font size (if Number, then "px" units are assumed)
   */
  // labelParameters = {
  //   xOffset: 0,
  //   yOffset: 0,
  //   rotation: 0,
  //   color: null,
  //   fontFamily: "",
  //   fontSize: ""
  // };

  /**
   * @class LabelElement
   * @classdesc Used to determine screen size and position of
   * text labels before they are added to the map.
   *
   * @constructor
   * @param {Object}
   * properties
   * The LabelElement constructor takes an object as described below
   * @param {external:Map}
   * properties.map
   * The Map object that is tied to the Grid Overlay
   * @param {external:Point} properties.point The geometry
   * Point object where the label will be placed
   * @param {module:labeling-utils~LabelParameters} properties
   * labelParameters An object holding all the label parameters
   * @param {String}
   * properties.text
   * The label text
   * @param {external:Color}
   * properties.color
   * The color of the text label
   * @param {String} [properties.verticalAlign="center"]
   * The vertical alignment "<bottom | lower | middle | center | upper|top>"
   * @param {String} [properties.horizontalAlign="middle"]
   * The vertical alignment "<left | middle | center | right>"
   *
   * @todo  Review, add and cleanup the code comments (including JSDoc comments)
   */
  return declare(null,  /** @lends module:labeling-utils~LabelElement# */{
    /** The Map object that is tied to the Grid Overlay
     * @type {external:Map}
     */
    "map": null,
    "point": null,
    "xOffset" : 0,
    "yOffset" : 0,
    "text": "",
    "verticalAlign": "", // "<bottom|lower | middle|center | upper|top>"
    "horizontalAlign": "", // "<left | middle|center | right>"
    "rotation": 0, // must be a multiple of 90
    "color": null,
    "fontFamily" : "",
    "fontSize" : 0,
    "font": null,
    constructor: function(args) {
      this.map = args.map;
      this.point = args.point;
      this.xOffset = args.labelParameters.xOffset || 0;
      this.yOffset = args.labelParameters.yOffset || 0;
      this.text = args.text;
      this.verticalAlign = args.verticalAlign || "bottom";
      this.verticalAlign.toLowerCase();
      this.horizontalAlign = args.horizontalAlign || "middle";
      this.horizontalAlign.toLowerCase();
      this.rotation = args.labelParameters.rotation || 0;
      this.rotation = Math.round(this.rotation / 90) * 90;
      this.color = args.labelParameters.color;
      this.font = new Font()
      .setFamily(args.labelParameters.fontFamily || "Arial, Helvetica, sans-serif")
      .setSize(args.labelParameters.fontSize || 0)
      .setWeight(Font.WEIGHT_BOLD);
    },
    getPixelWidth: function() {
      var vertical = this.rotation % 180 !== 0;
      if (vertical) {
        return this.font.size;
      } else {
        return gridLabelUtils.getWidthOfText(this.text, this.font.family, this.font.size);
      }
    },
    getPixelHeight: function() {
      var vertical = this.rotation % 180 !== 0;
      if (vertical) {
        return gridLabelUtils.getWidthOfText(this.text, this.font.family, this.font.size);
      } else {
        return this.font.size;
      }
    },
    decreaseFontSize: function(increment) {
      if (this.font.size === 0) {return;}
      increment = increment || 1;
      this.font.setSize(this.font.size - increment);
      this.setExtent();
    },
    setExtent: function() {
      var map = this.map;
      var referenceScreenPoint = map.toScreen(this.point)
      ;//.offset(this.xOffset, this.yOffset);
      var width = this.getPixelWidth();
      var height = this.getPixelHeight() / 1.3333;
      var xmin, ymin, xmax, ymax, extent;

      switch(this.horizontalAlign) {
        case "left":
          referenceScreenPoint = referenceScreenPoint.offset(this.xOffset, 0);
          xmin = referenceScreenPoint.x;
          xmax = referenceScreenPoint.x + width;
          break;
        case "middle":
        case "center":
          xmin = referenceScreenPoint.x - width / 2;
          xmax = referenceScreenPoint.x + width / 2;
          break;
        case "right":
          referenceScreenPoint = referenceScreenPoint.offset(-this.xOffset, 0);
          xmin = referenceScreenPoint.x - width;
          xmax = referenceScreenPoint.x;
          break;
      }

      switch(this.verticalAlign) {
        case "bottom":
        case "lower":
          referenceScreenPoint = referenceScreenPoint.offset(0, -this.yOffset);
          ymin = referenceScreenPoint.y;
          ymax = referenceScreenPoint.y - height;
          break;
        case "middle":
        case "center":
          ymin = referenceScreenPoint.y + height / 2;
          ymax = referenceScreenPoint.y - height / 2;
          break;
        case "upper":
        case "top":
          referenceScreenPoint = referenceScreenPoint.offset(0, this.yOffset);
          ymin = referenceScreenPoint.y + height;
          ymax = referenceScreenPoint.y;
          break;
      }
      extent = new Extent({
        "xmin": xmin,
        "ymin": ymin,
        "xmax": xmax,
        "ymax": ymax
      });
      this.extent = gridGeomUtils.toWebMercator(
        screenUtils.toMapGeometry(
          map.extent, map.width, map.height, extent
          ));
    },
    getExtent: function() {
      if (!this.extent) {
        this.setExtent();
      }
      return this.extent;
    },
    fitsInPolygon: function(polygon) {
      var extent = this.getExtent();
      extent = gridGeomUtils.toWebMercator(extent);
      polygon = gridGeomUtils.toWebMercator(polygon);
      return geometryEngine.contains(polygon, extent);
    },
    fitsInExtent: function(testExtent) {
      var extent = this.getExtent();
      extent = gridGeomUtils.toWebMercator(extent);
      testExtent = gridGeomUtils.toWebMercator(testExtent);
      return geometryEngine.contains(testExtent, extent);
    },
    shrinkToFit: function(geometry, minSize) {
      minSize = minSize || 0;
      if (!this.fitsInPolygon(geometry) && this.font.size > 0) {
        // if (this.xOffset > 0) {this.xOffset -= 1;}
        // if (this.yOffset > 0) {this.yOffset -= 1;}
        this.font.setSize(this.font.size - 1);
        if (this.font.size < minSize) {
          this.font.setSize(0);
        }
        this.setExtent();
        this.shrinkToFit(geometry, minSize);
      }
    },
    getLabelGraphic: function() {
      var textSymbol = new TextSymbol(this.text)
      .setColor(this.color)
      .setAlign(TextSymbol.ALIGN_START)
      .setFont(this.font);
      var extent = this.getExtent();
      var labelPoint = this.map.toScreen(this.point);
      var offsetPoint = this.map.toScreen(new Point(
        [extent.xmin, extent.ymin], extent.spatialReference));
      textSymbol.setOffset(offsetPoint.x - labelPoint.x, -(offsetPoint.y - labelPoint.y));
      return new Graphic(this.point, textSymbol);
    }
  });
});