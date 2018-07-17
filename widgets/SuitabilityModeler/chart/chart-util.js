///////////////////////////////////////////////////////////////////////////
// Copyright © 2018 Esri. All Rights Reserved.
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
define(["dojo/_base/array",
  "dojo/Deferred",
  "dojo/json",
  "dojo/number",
  "esri/Color",
  "esri/request",
  "esri/geometry/Polygon"],
function(array, Deferred, djJson, djNumber, Color, esriRequest, Polygon) {

  var _def = {

    computeHistograms: function(nls, layer, features) {
      //console.log("computeHistograms",layer,features);
      var self = this, dfd = new Deferred();
      var maxWidth = layer.maxImageWidth;
      var maxHeight = layer.maxImageHeight;
      var polygon = this.makePolygon(features);
      var pixelSize = this.getModelPixelSize(polygon,maxWidth,maxHeight);
      var renderingRule = layer.renderingRule.toJson();
      var dfd2 = this.execComputeHistograms(layer,polygon,pixelSize,renderingRule);
      dfd2.then(function(response){
        var result = self.processHistogramResponse(nls,response,renderingRule);
        //console.log("computeHistograms response",response);
        dfd.resolve(result);
      }).otherwise(function(error){
        dfd.reject(error);
      });
      return dfd;
    },

    execComputeHistograms: function(layer, polygon, pixelSize, renderingRule) {
      var url = layer.url+"/computeHistograms";
      //url = "/none"; // for fault test
      var content = {f:"json"}, options = {};
      content.geometry = djJson.stringify(polygon.toJson());
      content.geometryType = "esriGeometryPolygon";
      content.renderingRule = djJson.stringify(renderingRule);
      content.pixelSize = djJson.stringify(pixelSize);
      var params = {
        url: url,
        content: content,
        handleAs: "json",
        callbackParamName: "callback"
      };
      return esriRequest(params,options);
    },

    getGeometries: function(features) {
      var geometries = [];
      array.forEach(features,function(feature) {
        if (feature.geometry) {
          geometries.push(feature.geometry);
        }
      });
      return geometries;
    },

    getModelPixelSize: function(geometry,maxImageWidth,maxImageHeight) {
      //console.warn("maxImageWidth",maxImageWidth,"maxImageHeight",maxImageHeight);
    	var forceSquare = true, width = 0, height = 0, max, pixelSize;
  		var extent = geometry.getExtent();
  		width = extent.getWidth();
  		height = extent.getHeight();
    	if (width < 1) {
        width = 1;
      }
    	if (height < 1) {
        height = 1;
      }
    	var pixelSizeX = Math.ceil(width / maxImageWidth);
    	var pixelSizeY = Math.ceil(height / maxImageHeight);
    	if (forceSquare) {
      	max = Math.max(pixelSizeX,pixelSizeY);
      	pixelSize = {x:max,y:max};
    	} else {
    		pixelSize = {x:pixelSizeX,y:pixelSizeY};
    	}
    	return pixelSize;
    },

    isPolygonLayer: function(layer) {
      if (layer && layer.geometryType === "esriGeometryPolygon") {
        return true;
      }
      return false;
    },

    isWROModelLayer: function(layer) {
      var req = ["Title","Url","Description","InputRanges","OutputValues",
                 "NoDataRanges","RangeLabels","NoDataRangeLabels"];
      if (layer &&
          layer.type === "ArcGISImageServiceLayer" &&
          layer.version >= 10.3 &&
          layer.renderingRule &&
          layer.renderingRule.rasterFunctionArguments &&
          layer.renderingRule.rasterFunctionArguments.Colormap &&
          layer.allowRasterFunction &&
          layer.defaultResamplingMethod === "Nearest") {
        var hasFields = array.every(req,function(s){
          return array.some(layer.fields,function(f){
            return (s === f.name);
          });
        });
        if (hasFields) {
          return true;
        }
      }
      return false;
    },

    makePolygon: function(features) {
      return this.mergePolygons(this.getGeometries(features));
    },

    mergePolygons: function(geometries) {
      var polygon = null;
      if (geometries.length === 1) {
        polygon = geometries[0];
      } else {
        //polygon = geometryEngine.union(geometries);
        polygon = new Polygon(geometries[0].spatialReference);
        array.forEach(geometries,function(geometry) {
          array.forEach(geometry.rings,function(ring) {
            polygon.addRing(ring);
          });
        });
      }
      return polygon;
    },

    processHistogramResponse: function(nls, response, renderingRule) {
      var result = {
        noDataCount: 0,
        colorCounts: []
      };
      if (!response || !response.histograms || response.histograms.length === 0) {
      	return result;
      }
      var pattern = nls.util.colorRamp.tipPattern;
  		var histogram = response.histograms[0];
      var histogramMin = Math.round(histogram.min);
      var histogramMax = Math.round(histogram.max) - 1;
      if ((histogramMin === 0) && (histogram.counts > 0)) {
      	result.noDataCount = histogram.counts[0];
      }
      var totalCount = 0;
      var totalNum = 0;
      array.forEach(renderingRule.rasterFunctionArguments.Colormap,function(color) {
      	var count = 0;
      	var value = color[0];
        var label = null;
        var fullLabel = label;
      	var rgb = [color[1],color[2],color[3]];
        var hex = (new Color(rgb)).toHex();
        if ((value < histogramMin) || (value > histogramMax)) {
          count = 0;
        } else {
          count = histogram.counts[value - histogramMin];
        }
        totalCount += count;
        totalNum += 1;
        if (nls.util.colorRamp[""+value]) {
          label = nls.util.colorRamp[""+value];
          fullLabel = pattern.replace("{label}",label).replace("{value}",value);
        }
        result.colorCounts.push({
        	count: count,
        	value: value,
          pct: 0,
          label: label,
          fullLabel: fullLabel,
        	rgb: rgb,
          hex: hex
        });
      });
      if (result.noDataCount > 0) {
        totalCount += result.noDataCount;
        totalNum += 1;
      }
      if (totalCount > 0) {
        array.forEach(result.colorCounts,function(colorCount) {
          var pct = colorCount.count / totalCount * 100;
          pct = djNumber.format(pct,{places:2});
          colorCount.pct = pct;
        });
      }
      return result;
    }

  };

  return _def;
});
