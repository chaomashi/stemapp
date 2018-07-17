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
 *  @fileOverview Contains the GridPolygon class used by GridOverlay widgets.
 *  @author Esri
 *
 * @todo  Review, add and cleanup the code comments (including JSDoc comments)
 */

define([
  "dojo/_base/declare",
  "./mgrs",
  "./labeling-utils",
  "./LabelElement",
  // "esri/geometry/geometryEngine",
  "esri/geometry/Point"
], function(
  declare,
  mgrs,
  gridLabelUtils,
  LabelElement,
  // geometryEngine,
  Point
) {

  /**
   * @class module:labeling-utils~GridPolygon
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
   * The label text for the polygon
   * @param {external:Color}    properties.color
   * The foreground color of the text label(s)
   * @param {module:labeling-utils~LabelParameters}
   * properties.labelParameters
   * An object holding all the label parameters
   *
   * @todo  Review, add and cleanup the code comments (including JSDoc comments)
   */
  return declare(null, /** @lends module:labeling-utils~GridPolygon# */{
    /** A geometry Polygon object that represents the non-clipped geometry of the grid polygon
     * @type external:Polygon
     */
    "clippedPolygon": null,
    /** A geometry Polygon object that represents the visible portion of the unclipped polygon
     * @type external:Polygon
     */
    "unclippedPolygon": null,
    /** The Map object that is tied to the Grid Overlay
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
    /** The label text for the polygon
     * @type String
     */
    "text": "",
    /** The foreground color of the text label(s)
     * @type external:Color
     */
    "color": null,
    /** An object holding all the label parameters
     * @type module:labeling-utils~LabelParameters
     */
    "labelParameters": null,
    "_centerLabelSet": false,
    "_centerLabel": null,
    "_labelsSet": false,
    "_labels": [],
    "_cornerLabels": [],
    "_borderLabels": [],
    "_interiorLabels": [],
    candidatePoint: null,
    constructor: function(args) {
      this.unclippedPolygon = args.unclippedPolygon;
      this.clippedPolygon = args.clippedPolygon;
      this.map = args.map;
      this.xmin = args.xmin;
      this.ymin = args.ymin;
      this.xmax = args.xmax;
      this.ymax = args.ymax;
      this.minMaxType = args.minMaxType;
      this.utmZone = Math.round(args.utmZone);
      this.text = args.text;
      this.labelParameters = args.labelParameters;
      this._cornerLabels = [];
      this._borderLabels = [];
      this._interiorLabels = [];
      this._centerLabel = null;
      this._centerLabelSet = false;
      this._labelsSet = false;
    },

    getLabels: function(useUnclipped) {
      useUnclipped = useUnclipped || false;
      var labels;

      if (!this._labelsSet) {
        this._cornerLabels = this.setLabels(useUnclipped);
        this._labelsSet = true;
      }

      if (this._cornerLabels.length > 0) {
        labels = this._cornerLabels;
      } else if (this._borderLabels.length > 0) {
        labels = this._borderLabels;
      } else {
        labels = this._interiorLabels;
      }
      for (var i = 0; i < labels.length; i++) {
        labels[i] = labels[i].getLabelGraphic();
      }

      return labels;
    },

    getCenterLabel: function(useClipped) {
      if (!this._centerLabelSet) {
        this.setCenterLabel(useClipped);
        this._centerLabelSet = true;
      }
      return this._centerLabel.getLabelGraphic();
    },

    setCenterLabel: function(useClipped) {
      useClipped = useClipped || false;
      var polygon = useClipped ? this.clippedPolygon : this.unclippedPolygon;
      var labelParameters = {
        xOffset: 0,
        yOffset: 0,
        rotation: 0,
        color: this.labelParameters.color,
        fontFamily: this.labelParameters.fontFamily,
        fontSize: this.labelParameters.fontSize
      };
      this._centerLabel = new LabelElement({
        map: this.map,
        point: polygon.getCentroid(),
        labelParameters: labelParameters,
        text: this.text,
        verticalAlign: "middle",
        horizontalAlign: "middle"
      });
      // var testLabel = this._centerLabel;
      var testLabel = new LabelElement({
        map: this._centerLabel.map,
        point: this._centerLabel.point,
        labelParameters: labelParameters,
        text: this.minMaxType === "utm" ? "WW" : "22W",
        verticalAlign: "middle",
        horizontalAlign: "middle"
      });
      var bbb = 0;
      if (this.text === "KC" || this.text === "KD") {
        bbb = 5;
      }
      // testLabel.shrinkToFit(polygon.getExtent(), 12);
      testLabel.shrinkToFit(polygon, 12);
      this._centerLabel.font.setSize(testLabel.font.size);
      this._centerLabel.setExtent();
    },

    setLabels: function(useUnclipped) {
      useUnclipped = useUnclipped || false;
      var rings = this.clippedPolygon.rings;
      var clippedPolygonScreenSize = gridLabelUtils.getScreenSize(
        this.clippedPolygon.getExtent(), this.map);
      var limits = {
        "xmin": Math.round(this.xmin * 1000) / 1000,
        "ymin": Math.round(this.ymin * 1000) / 1000,
        "xmax": Math.round(this.xmax * 1000) / 1000,
        "ymax": Math.round(this.ymax * 1000) / 1000,
        "map_xmin": this.map.extent.xmin,
        "map_ymin": this.map.extent.ymin,
        "map_xmax": this.map.extent.xmax,
        "map_ymax": this.map.extent.ymax
      };
      var prevSlope, slope;

      var cornerLabels = {
        "lower-left": {
          label: null,
          priority: 99,
          hidden: false
        },
        "lower-right": {
          label: null,
          priority: 99,
          hidden: false
        },
        "upper-left": {
          label: null,
          priority: 99,
          hidden: false
        },
        "upper-right": {
          label: null,
          priority: 99,
          hidden: false
        }
      };

      for (var i = 0; i < rings.length; i++) {
        prevSlope = null;
        var nextPoint;
        for (var j = 0; j < rings[i].length - 1; j++) {
          this.candidatePoint = new Point(rings[i][j], this.clippedPolygon.spatialReference);
          // if  (j === rings[i].length - 1) {
          //   nextPoint = new Point(rings[i][1], this.clippedPolygon.spatialReference);
          // } else {
          nextPoint = new Point(rings[i][j + 1], this.clippedPolygon.spatialReference);
          // }
          if (j === 0) {
            var prevPoint = new Point(
              rings[i][rings[i].length - 2], this.clippedPolygon.spatialReference);
            prevSlope = this._findAngle(prevPoint, this.candidatePoint);
          }
          slope = this._findAngle(this.candidatePoint, nextPoint);
          if (slope !== prevSlope) {
            var corner = "";
            if      (slope === 0  && prevSlope === 90 ) {corner = "lower-right";}
            else if (slope === 270 && prevSlope === 180) {corner = "lower-right";}
            else if (slope === 0  && prevSlope === 270) {corner = "lower-left";}
            else if (slope === 90  && prevSlope === 180) {corner = "lower-left";}
            else if (slope === 90  && prevSlope === 0 ) {corner = "upper-left";}
            else if (slope === 180 && prevSlope === 270) {corner = "upper-left";}
            else if (slope === 180 && prevSlope === 90 ) {corner = "upper-right";}
            else if (slope === 270 && prevSlope === 0 ) {corner = "upper-right";}
            if (corner) {
              var cornerProps = this._findType(this.candidatePoint, limits);
              var priority = cornerProps.priority;
              var labelElement = new LabelElement({
                map: this.map,
                point: this.candidatePoint,
                labelParameters: this.labelParameters,
                text: this.text,
                verticalAlign: corner.split('-')[0],
                horizontalAlign: corner.split('-')[1]
              });
              if (cornerLabels[corner].priority > priority) {
                cornerLabels[corner].label = labelElement;
                cornerLabels[corner].priority = priority;
                cornerLabels[corner].xOffset = cornerProps.xOffset;
                cornerLabels[corner].yOffset = cornerProps.yOffset;
              }
            }
          }
          prevSlope = slope;
        }
      }
      var minWidth = 300;
      var minHeight = 200;
      var lowerLeft = cornerLabels["lower-left"];
      var upperLeft = cornerLabels["upper-left"];
      var lowerRight = cornerLabels["lower-right"];
      var upperRight = cornerLabels["upper-right"];
      if (clippedPolygonScreenSize.width < minWidth) {
        if (lowerLeft.priority > lowerRight.priority) {
          lowerLeft.hidden = true;
        }
        if (lowerRight.priority > lowerLeft.priority) {
          lowerRight.hidden = true;
        }
        if (upperLeft.priority > upperRight.priority) {
          upperLeft.hidden = true;
        }
        if (upperRight.priority > upperLeft.priority) {
          upperRight.hidden = true;
        }
      }
      if (clippedPolygonScreenSize.height < minHeight) {
        if (lowerLeft.priority > upperLeft.priority) {
          lowerLeft.hidden = true;
        }
        if (lowerRight.priority > upperRight.priority) {
          lowerRight.hidden = true;
        }
        if (upperLeft.priority > lowerLeft.priority) {
          upperLeft.hidden = true;
        }
        if (upperRight.priority > lowerRight.priority) {
          upperRight.hidden = true;
        }
      }
      if (this.minMaxType === "utm") {
        if (lowerLeft.xOffset) {lowerLeft.label.xOffset = 70;}
        if (upperLeft.xOffset) {upperLeft.label.xOffset = 70;}
        if (upperRight.xOffset) {upperRight.label.xOffset = 70;}
        if (lowerRight.xOffset) {lowerRight.label.xOffset = 70;}

        if (lowerLeft.yOffset) {lowerLeft.label.yOffset = 40;}
        if (upperLeft.yOffset) {upperLeft.label.yOffset = 40;}
        if (upperRight.yOffset) {upperRight.label.yOffset = 40;}
        if (lowerRight.yOffset) {lowerRight.label.yOffset = 40;}
      }

      var labels = [];
      if (!lowerLeft.hidden && lowerLeft.label) {labels.push(lowerLeft.label);}
      if (!upperLeft.hidden && upperLeft.label) {labels.push(upperLeft.label);}
      if (!upperRight.hidden && upperRight.label) {labels.push(upperRight.label);}
      if (!lowerRight.hidden && lowerRight.label) {labels.push(lowerRight.label);}
      var fitPolygon = useUnclipped ? this.unclippedPolygon : this.clippedPolygon;
      for (var k = 0; k < labels.length; k++) {
        var testLabel = new LabelElement({
          map: this.map,
          point: labels[k].point,
          labelParameters: this.labelParameters,
          text: this.minMaxType === "utm" ? "WW" : "22W",
          verticalAlign: labels[k].verticalAlign,
          horizontalAlign: labels[k].horizontalAlign
        });
        if (!testLabel.fitsInPolygon(fitPolygon)) {
          labels.splice(k, 1);
          k--;
        }
      }
      return labels;
    },

    _findXY: function(point) {
      var x, y, utmPoint;
      x = point.getLongitude();
      y = point.getLatitude();
      if (this.minMaxType === "utm") {
        utmPoint = mgrs.LLtoUTM(y, x, this.utmZone);
        x = Math.round(utmPoint[0] / 100) * 100;
        y = Math.round(utmPoint[1] / 100) * 100;
        x = x % 1000000;
        y = y % 1000000;
      } else {
        x = Math.round(x * 1000) / 1000;
        y = Math.round(y * 1000) / 1000;
      }
      return {"x": x, "y": y};
    },

    _findAngle: function(fromPt, toPt) {
      var angle = -(Math.atan2(toPt.y - fromPt.y, toPt.x - fromPt.x) * 180 / Math.PI) + 90;
      while (angle < 0) {angle += 360;}
      while (angle >= 360) {angle -= 360;}
      if (angle < 15 || angle > 345) {angle = 0;}
      else if (angle < 105 && angle > 75) {angle = 90;}
      else if (angle < 195 && angle > 165) {angle = 180;}
      else if (angle < 285 && angle > 255) {angle = 270;}
      return angle;
    },

    // Priority is: corners, edges, then screen corners.
    // For example, if a NonPolorGridZone corner is not visible,
    // then the labels returned represent the zone boundary edge(s)
    // If no edges are visible, then the screen corner labels are returned.
    _findType: function(pt, limits) {
      var testPoint = this._findXY(this.candidatePoint);
      var x = testPoint.x;
      var y = testPoint.y;
      var xOffset = false, yOffset = false, priority = 0;

      if (pt.x === limits.map_xmin || pt.x === limits.map_xmax) {
        xOffset = true;
        priority += 2;
      }
      else if (x === limits.xmin || x === limits.xmax) {
        console.warn();
      }
      else {
        priority += 1;
      }

      if (pt.y === limits.map_ymin || pt.y === limits.map_ymax) {
        yOffset = true;
        priority += 2;
      }
      else if (y === limits.ymin || y === limits.ymax) {
        console.warn();
      }
      else {
        priority += 1;
      }

      return {
        priority: priority,
        xOffset: xOffset,
        yOffset: yOffset
      };
    }

  });
});