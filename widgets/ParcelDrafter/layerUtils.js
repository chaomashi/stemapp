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

define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dojo/_base/array",
  "dojo/_base/lang"
],
  function (
    declare,
    _WidgetBase,
    array,
    lang
  ) {
    return declare([_WidgetBase], {
      map: null,
      getPopupInfo: true, //if set to true will return popupInfo of the layer
      getRenderer: true, //if set to true will return renderer of the layer

      postCreate: function () {
      },

      /**
      * This function gets selected layer details from map
      * @memberOf widgets/NearMe/utils
      **/
      getLayerDetailsFromMap: function (baseURL, layerId, id) {
        var selectedLayer = {}, layerIdOnMap;
        if (this.map && this.map.webMapResponse && this.map.webMapResponse
          .itemInfo && this.map.webMapResponse
            .itemInfo.itemData && this.map.webMapResponse.itemInfo.itemData
            .operationalLayers) {
          array.forEach(this.map.webMapResponse.itemInfo.itemData.operationalLayers,
            lang.hitch(this,
              function (layer) {
                if (layer.layerObject) {
                  if (layer.layerType === "ArcGISMapServiceLayer" ||
                    layer.layerType === "ArcGISTiledMapServiceLayer") {
                    //fetch id of map server layer
                    layerIdOnMap = id && id.substring(0, id.lastIndexOf('_'));
                    //check whether id of layer is saved in config then only match layers
                    //with id value to support backward compatibility of widget
                    if (!layerIdOnMap || layer.id === layerIdOnMap) {
                      //set flag to identify layer type
                      selectedLayer.isMapServer = true;
                      if (baseURL.substring(0, baseURL.length - 1) === layer.url) {
                        array.forEach(layer.resourceInfo.layers, lang.hitch(this,
                          function (subLayer) {
                            //set layer title
                            if (subLayer.id === parseInt(layerId, 10)) {
                              selectedLayer.title = subLayer.name;
                              return;
                            }
                          }));
                        array.forEach(layer.layers, lang.hitch(this, function (subLayer) {
                          if (subLayer.id === parseInt(layerId, 10)) {
                            //set layer title
                            if (subLayer.name) {
                              selectedLayer.title = subLayer.name;
                            }
                            //set popup info
                            if (this.getPopupInfo) {
                              selectedLayer.popupInfo = subLayer.popupInfo;
                            }
                            if (subLayer.layerDefinition) {
                              //set layers definitionExpression
                              if (subLayer.layerDefinition.definitionExpression) {
                                selectedLayer.definitionExpression = subLayer.layerDefinition
                                  .definitionExpression;
                              }
                              //set layers renderer from webmap
                              if (this.getRenderer && subLayer.layerDefinition.drawingInfo &&
                                subLayer.layerDefinition.drawingInfo.renderer) {
                                selectedLayer.renderer = subLayer.layerDefinition.drawingInfo
                                  .renderer;
                              }
                            }
                            return;
                          }
                        }));
                      }
                    }
                  } else {
                    if (!id || layer.id === id) {
                      if (layer.url.replace(/.*?:\/\//g, "").toLowerCase() ===
                        (baseURL + layerId).replace(/.*?:\/\//g, "").toLowerCase() &&
                        layer.id === id) {
                        //set flag to identify layer type
                        selectedLayer.isMapServer = false;
                        //set layer title
                        selectedLayer.title = layer.title;
                        //set popup info
                        if (this.getPopupInfo) {
                          selectedLayer.popupInfo = layer.popupInfo;
                        }
                        if (layer.layerDefinition) {
                          //set layers definitionExpression
                          if (layer.layerDefinition.definitionExpression) {
                            selectedLayer.definitionExpression = layer.layerDefinition
                              .definitionExpression;
                          }
                          //set layers renderer from webmap
                          if (this.getRenderer && layer.layerDefinition.drawingInfo &&
                            layer.layerDefinition.drawingInfo.renderer) {
                            selectedLayer.renderer = layer.layerDefinition.drawingInfo
                              .renderer;
                          }
                        }
                        return;
                      }
                    }
                  }
                }
              }));
        }
        return selectedLayer;
      }
    });
  });
