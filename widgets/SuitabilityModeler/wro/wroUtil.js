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
define(["dojo/_base/lang",
  "dojo/_base/array",
  "dojo/Deferred",
  "esri/layers/RasterFunction"],
function(lang, array, Deferred, RasterFunction) {

  var oThisObject = {

    serverSideRasterFunctionName: "WeightedOverlay_7_1_9_colormap",

    applyItemDataRenderingRule: function(layer,wroInfo,data) {
      var rf;
      try {
        if (this.isServerSideWRORule(data)) {
          rf = new RasterFunction();
          rf.functionName = data.renderingRule.rasterFunction ||
            data.renderingRule.functionName;
          rf["arguments"] = data.renderingRule.rasterFunctionArguments ||
            data.renderingRule["arguments"];
          rf.variableName = data.renderingRule.variableName;
          layer.setRenderingRule(rf,false);
        } else if (data && data.renderingRule){
          if (wroInfo.supportsClientSideWRO) {
            rf = new RasterFunction(data.renderingRule);
            layer.setRenderingRule(rf,false);
          }
        }
      } catch(ex) {
        console.error(ex);
      }
    },

    hasServerSideWROFunction: function(layer) {
      var rf = this.serverSideRasterFunctionName;
      if (layer) {
        if (this.isServerSideWRORule(layer)) {
          return true;
        }
        if (layer.rasterFunctionInfos){
          var b = array.some(layer.rasterFunctionInfos,function(rfi){
            if (rfi && (rfi.name === rf)) {
              return true;
            }
          });
          if (b) {
            return true;
          }
        }
      }
      return false;
    },

    isServerSideWRORule: function(obj) {
      var rf = this.serverSideRasterFunctionName;
      if (obj && obj.renderingRule && obj.renderingRule.rasterFunction &&
          obj.renderingRule.rasterFunction === rf) {
        return true;
      } else if (obj && obj.renderingRule && obj.renderingRule.functionName &&
          obj.renderingRule.functionName === rf) {
        return true;
      }
      return false;
    },

    makeItemData: function(weightedOverlayWidget,model) {
      // renderingRule remapRangeLabels noDataRangeLabels
      var svc = weightedOverlayWidget.designModelView.weightedOverlayService;
      var opLayer = svc.modelToImageServiceLayer(model,{
        modelTitle: 'New Model'
      });
      var itemData = {};
      lang.mixin(itemData,opLayer);
      delete itemData.id;
      delete itemData.url;
      delete itemData.opacity;
      delete itemData.title;
      return itemData;
    },

    newWROInfo: function() {
      return {
        isGETen3: false,
        isWROLayer: false,
        isWROModel: false,
        hasServerSideWROFunction: false,
        supportsClientSideWRO: false
      };
    },

    validateWROLayer: function(i18n,layer,wroInfo,errors,checkAll) {
      //console.warn("validateWROLayer.wroInfo",wroInfo);
      var dfd = new Deferred();
      var req = ["Title","Url","Description","InputRanges","OutputValues",
        "NoDataRanges","RangeLabels","NoDataRangeLabels"];
      //var checkProps = !!checkAll;
      var checkProps = false;

      wroInfo.isGETen3 = (layer.version >= 10.3);
      wroInfo.hasServerSideWROFunction = this.hasServerSideWROFunction(layer);
      if (!wroInfo.isGETen3) {
        if (!wroInfo.hasServerSideWROFunction) {
          errors.push(i18n.wro.validation.notAWroService);
        }
        dfd.resolve();
      } else {
        if (!layer.allowRasterFunction) {
          errors.push(i18n.wro.validation.notAllowRasterFunction);
        }
        if (!layer.defaultResamplingMethod || layer.defaultResamplingMethod !== "Nearest") {
          errors.push(i18n.wro.validation.notNearestResampling);
        }
        var fields = [];
        if (layer.fields) {
          fields = layer.fields;
        }
        array.forEach(req,function(s){
          var b = array.some(fields,function(f){
            return (s === f.name);
          });
          if (!b) {
            errors.push(i18n.wro.validation.missingFieldPattern.replace("{field}",s));
          }
        });

        if (errors.length > 0 && !checkAll) {
          checkProps = false;
        }
        if (!checkProps) {
          if (errors.length === 0) {
            wroInfo.supportsClientSideWRO = true;
          }
          dfd.resolve();
        } else {
          //console.warn("validateWROLayer.getKeyProperties");
          layer.getKeyProperties().then(
            function(props){
              if (typeof(props) === "undefined" || props === null || !props.IsWeightedOverlay) {
                errors.push(i18n.wro.validation.notIsWeightedOverlayProp);
              } else {
                wroInfo.supportsClientSideWRO = true;
              }
              dfd.resolve();
            },
            function(error){
              dfd.reject(error);
            }
          );
        }
      }
      return dfd;
    },

    waitForLayer: function(layer,i18n) {
      var dfd = new Deferred(), handles = [];
      if (layer.loaded) {
        dfd.resolve(layer);
        return dfd;
      }
      if (layer.loadError) {
        dfd.reject(layer.loadError);
        return dfd;
      }
      var clearHandles = function() {
        array.forEach(handles, function(h) {
          h.remove();
        });
      };
      //console.warn("_waitForLayer");
      handles.push(layer.on("load", function(layerLoaded) {
        //console.warn("_waitForLayer.load",layerLoaded);
        clearHandles();
        dfd.resolve(layerLoaded.layer);
      }));
      handles.push(layer.on("error", function(layerError) {
        //console.warn("_waitForLayer.error",layerError);
        clearHandles();
        var error = layerError.error;
        try {
          if (error.message && (error.message.indexOf("Unable to complete") !== -1)) {
            console.warn("layerAccessError", error);
            dfd.reject(new Error(i18n.wro.validation.inaccessible));
          } else {
            dfd.reject(error);
          }
        } catch (ex) {
          //console.warn("layerAccessError",ex);
          dfd.reject(error);
        }
      }));
      return dfd;
    }

  };

  return oThisObject;
});
