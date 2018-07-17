///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  'dojo/_base/lang',
  'dojo/_base/array',
  "esri/geometry/Point",
  "esri/geometry/Polygon",
  'esri/geometry/Polyline',
  'esri/graphic',
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/Color"
], function (
  lang,
  array,
  Point,
  Polygon,
  Polyline,
  Graphic,
  SimpleMarkerSymbol,
  SimpleLineSymbol,
  SimpleFillSymbol,
  Color
) {
  var mo = {};

  /**
  * Get symbol used for highlighting feature
  * @param{object} selected feature which needs to be highlighted
  * @param{object} details of selected layer
  */
  mo.getHighLightSymbol = function (graphic, layer) {
    // If feature geometry is of type point, add a square symbol
    // If feature geometry is of type polyline, highlight the line
    // If feature geometry is of type polygon, highlight the boundary of the polygon
    switch (graphic.geometry.type) {
      case "point":
        return mo._getPointSymbol(graphic, layer);
      case "polyline":
        return mo._getPolyLineSymbol(graphic, layer);
      case "polygon":
        return mo._getPolygonSymbol(graphic, layer);
    }
  };

  /**
   *  This function is used to get symbol size
   */
  mo._getSizeInfo = function (layer) {
    var sizeInfo = null;
    if (layer.renderer.visualVariables) {
      array.forEach(layer.renderer.visualVariables, lang.hitch(this, function (info) {
        if (info.type === "sizeInfo") {
          sizeInfo = info;
        }
      }));
    }
    return sizeInfo;
  };

  /**
  * This function is used to get symbol for point geometry
  * @param{object} selected feature which needs to be highlighted
  * @param{object} details of selected layer
  */
  mo._getPointSymbol = function (graphic, layer) {
    var symbol, isSymbolFound, graphics, point, graphicInfoValue, layerInfoValue, i, symbolShape,
      symbolDetails, sizeInfo, arcSymbolSize;
    isSymbolFound = false;
    symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, null,
      new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255, 1]), 3));
    symbol.setColor(null);
    symbol.size = 30; //set default Symbol size which will be used in case symbol not found.
    //if layer is valid and have valid renderer then only check for other symbol properties
    if (layer && layer.renderer) {
      if (layer.renderer.symbol) {
        isSymbolFound = true;
        symbol = mo._updatePointSymbolProperties(symbol, layer.renderer.symbol);
      } else if (layer.renderer.infos && (layer.renderer.infos.length > 0)) {
        for (i = 0; i < layer.renderer.infos.length; i++) {
          if (layer.typeIdField) {
            graphicInfoValue = graphic.attributes[layer.typeIdField];
          } else if (layer.renderer.attributeField) {
            graphicInfoValue = graphic.attributes[layer.renderer.attributeField];
          }
          layerInfoValue = layer.renderer.infos[i].value;
          // To get properties of symbol when infos contains other than class break renderer.
          if (graphicInfoValue !== undefined && graphicInfoValue !== null &&
            graphicInfoValue !== "" && layerInfoValue !== undefined &&
            layerInfoValue !== null && layerInfoValue !== "") {
            if (graphicInfoValue.toString() === layerInfoValue.toString()) {
              isSymbolFound = true;
              symbol = mo._updatePointSymbolProperties(symbol, layer.renderer.infos[i].symbol);
            }
          }
        }
        if (!isSymbolFound) {
          if (layer.renderer.defaultSymbol) {
            isSymbolFound = true;
            symbol = mo._updatePointSymbolProperties(symbol, layer.renderer.defaultSymbol);
          }
        }
      }
    }
    if (layer && layer.graphics && layer.graphics.length > 0) {
      if (layer._getSymbol(graphic)) {
        symbolShape = graphic.getShape();
        if (symbolShape && symbolShape.shape) {
          if (symbolShape.shape.hasOwnProperty("r")) {
            isSymbolFound = true;
            symbol.size = (symbolShape.shape.r * 2) + 10;
          } else if (symbolShape.shape.hasOwnProperty("width")) {
            isSymbolFound = true;
            //get offsets in case of smart mapping symbols from the renderer info if available
            if (layer.renderer && layer.renderer.infos && layer.renderer.infos.length > 0) {
              symbol = mo._updatePointSymbolProperties(symbol, layer.renderer.infos[0].symbol);
            }
            symbol.size = symbolShape.shape.width + 10;
          }
          //handle arcade expressions, take max size of symbol
        } else if (layer.renderer.visualVariables) {
          symbolDetails = layer._getRenderer(graphic);
          sizeInfo = mo._getSizeInfo(layer);
          if (sizeInfo) {
            arcSymbolSize = symbolDetails.getSize(graphic, {
              sizeInfo: sizeInfo,
              shape: layer._getSymbol(graphic),
              resolution: layer && layer.getResolutionInMeters && layer.getResolutionInMeters()
            });
            if (arcSymbolSize !== null) {
              symbol.size = arcSymbolSize + 10;
            }
          }
        }
      }
    }
    point = new Point(graphic.geometry.x, graphic.geometry.y, graphic.geometry.spatialReference);
    graphics = new Graphic(point, symbol, graphic.attributes);
    return graphics;
  };


  /**
  * This function is used to get different data of symbol from infos properties of renderer object.
  * @param{object} symbol that needs to be assigned to selected/activated feature
  * @param{object} renderer layer Symbol
  */
  mo._updatePointSymbolProperties = function (symbol, layerSymbol) {
    var height, width, size;
    if (layerSymbol.hasOwnProperty("height") && layerSymbol.hasOwnProperty("width")) {
      height = layerSymbol.height;
      width = layerSymbol.width;
      // To display cross hair properly around feature its size needs to be calculated
      size = (height > width) ? height : width;
      size = size + 10;
      symbol.size = size;
    }
    if (layerSymbol.hasOwnProperty("size")) {
      if (!size || size < layerSymbol.size) {
        symbol.size = layerSymbol.size + 10;
      }
    }
    if (layerSymbol.hasOwnProperty("xoffset")) {
      symbol.xoffset = layerSymbol.xoffset;
    }
    if (layerSymbol.hasOwnProperty("yoffset")) {
      symbol.yoffset = layerSymbol.yoffset;
    }
    return symbol;
  };

  /**
  * This function is used to get symbol for polyline geometry
  * @param{object} selected feature which needs to be highlighted
  * @param{object} details of selected layer
  */
  mo._getPolyLineSymbol = function (graphic, layer) {
    var symbol, graphics, polyline, symbolWidth, graphicInfoValue, layerInfoValue, i;
    symbolWidth = 5; // default line width
    //if layer is valid and have valid renderer then only check for other symbol properties
    if (layer && layer.renderer) {
      if (layer.renderer.symbol && layer.renderer.symbol.hasOwnProperty("width")) {
        symbolWidth = layer.renderer.symbol.width;
      } else if ((layer.renderer.infos) && (layer.renderer.infos.length > 0)) {
        for (i = 0; i < layer.renderer.infos.length; i++) {
          if (layer.typeIdField) {
            graphicInfoValue = graphic.attributes[layer.typeIdField];
          } else if (layer.renderer.attributeField) {
            graphicInfoValue = graphic.attributes[layer.renderer.attributeField];
          }
          layerInfoValue = layer.renderer.infos[i].value;
          // To get properties of symbol when infos contains other than class break renderer.
          if (graphicInfoValue !== undefined && graphicInfoValue !== null &&
            graphicInfoValue !== "" && layerInfoValue !== undefined &&
            layerInfoValue !== null && layerInfoValue !== "") {
            if (graphicInfoValue.toString() === layerInfoValue.toString() &&
              layer.renderer.infos[i].symbol.hasOwnProperty("width")) {
              symbolWidth = layer.renderer.infos[i].symbol.width;
            }
          }
        }
      } else if (layer.renderer.defaultSymbol &&
        layer.renderer.defaultSymbol.hasOwnProperty("width")) {
        symbolWidth = layer.renderer.defaultSymbol.width;
      }
    }
    symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
      new Color([0, 255, 255, 1]), symbolWidth);
    polyline = new Polyline(graphic.geometry.spatialReference);
    if (graphic.geometry.paths && graphic.geometry.paths.length > 0) {
      polyline.addPath(graphic.geometry.paths[0]);
    }
    graphics = new Graphic(polyline, symbol, graphic.attributes);
    return graphics;
  };

  /**
  * This function is used to get symbol for polygon geometry
  * @param{object} selected feature which needs to be highlighted
  * @param{object} details of selected layer
  */
  mo._getPolygonSymbol = function (graphic) {
    var symbol, graphics, polygon;
    symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
      new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
        new Color([0, 255, 255, 1]), 4), new Color([0, 0, 0, 0]));
    polygon = new Polygon(graphic.geometry.spatialReference);
    if (graphic.geometry.rings) {
      polygon.rings = lang.clone(graphic.geometry.rings);
    }
    graphics = new Graphic(polygon, symbol, graphic.attributes);
    return graphics;
  };

  return mo;
});