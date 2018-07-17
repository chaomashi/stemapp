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
  'dojo/_base/declare',
  'jimu/BaseWidgetSetting',
  "dijit/_WidgetsInTemplateMixin",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/promise/all",
  "dojo/Deferred",
  "dojo/on",
  "dojo/dom-class",
  "dojo/text!./LayerChooser.html",
  "jimu/dijit/LayerChooserFromMap",
  "jimu/dijit/LayerChooserFromMapWithDropbox",
  "esri/request",
  "jimu/dijit/Message",
  "dojo/domReady!"
], function (
  declare,
  BaseWidgetSetting,
  _WidgetsInTemplateMixin,
  lang,
  array,
  all,
  Deferred,
  on,
  domClass,
  layerChooserTemplate,
  LayerChooserFromMap,
  LayerChooserFromMapWithDropbox,
  esriRequest,
  Message
) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-RelatedTableCharts-setting',
    templateString: layerChooserTemplate,
    selectRouteURL: null,
    agolFlag: false,
    serviceFlag: false,
    _numberFieldTypes: ['esriFieldTypeSmallInteger',
        'esriFieldTypeInteger',
        'esriFieldTypeSingle',
        'esriFieldTypeDouble'
      ],

    startup: function () {
      this.inherited(arguments);
    },

    postCreate: function () {
      this._createPolygonChooserArgs();
      this.own(on(this.cancelButton, 'click', lang.hitch(this,
        function (evt) {
          this.onCancleClick(evt);
        })));
      this.own(on(this.okButton, 'click', lang.hitch(this, this._onOKButtonClicked)));
    },

    /**
    * This function is used to get layer type
    * @memberOf widgets/RelatedTableCharts/setting/LayerChooser.js
    */
    _getGeometryType: function (geometryType) {
      switch (geometryType) {
        case "esriGeometryPolygon":
          return "polygon";
        case "esriGeometryPolyline":
          return "polyline";
        case "esriGeometryPoint":
          return "point";
        default:
          return "*";
      }
    },

    /**
    * This function is used to create polygon layer drop down.
    * @memberOf widgets/RelatedTableCharts/setting/LayerChooser.js
    **/
    _createPolygonChooserArgs: function () {
      var args, templayerChooserFromMap, layerChooserFromMap, types = [], featureLayerFilter,
       queryableLayerFilter, filters;
      //set the filters for geometry type
      types.push(this.geometryType);
      featureLayerFilter = LayerChooserFromMap.createFeaturelayerFilter(types, false);
      queryableLayerFilter = LayerChooserFromMap.createQueryableLayerFilter();
      filters = [featureLayerFilter, queryableLayerFilter];
      args = {
        multiple: false,
        createMapResponse: this.map.webMapResponse,
        showLayerTypes: ['FeatureLayer'],
        filter: LayerChooserFromMap.andCombineFilters(filters)
      };
      templayerChooserFromMap = new LayerChooserFromMap(args);
      layerChooserFromMap = new LayerChooserFromMapWithDropbox({
        layerChooser: templayerChooserFromMap
      });
      layerChooserFromMap.placeAt(this.itemSelectDiv);
      layerChooserFromMap.startup();
      this.own(on(layerChooserFromMap, 'selection-change', lang.hitch(
        this, this._createRelatedTableOptions)));
    },

    /**
    * This function is used to create related tables drop down from selected layer.
    * it also creates config data for the selected layer
    * @memberOf widgets/RelatedTableCharts/setting/LayerChooser.js
    **/
    _createRelatedTableOptions: function (selectedPolygonLayer) {
      var options = [], deferredLayerInfoArray, baseURL;
      if (selectedPolygonLayer && selectedPolygonLayer.length > 0) {
        this.polygonLayer = selectedPolygonLayer[0];
        this.polygonLayerInfo = {
          "url": this.polygonLayer.url,
          "geometryType": this._getGeometryType(this.polygonLayer.geometryType),
          "supportsDistinct": false
        };
        if (this.polygonLayer.advancedQueryCapabilities &&
            this.polygonLayer.advancedQueryCapabilities.supportsDistinct) {
          this.polygonLayerInfo.supportsDistinct = true;
        }
        //add selected layers field in layer info
        if (this.polygonLayer.fields) {
          this.polygonLayerInfo.fields = lang.clone(this.polygonLayer.fields);
        }
        //set selected layers layerID
        if (this.polygonLayer.layerId) {
          this.polygonLayerInfo.layerId = this.polygonLayer.layerId;
        } else {
          this.polygonLayerInfo.layerId = this.polygonLayer.url
            .substr(this.polygonLayer.url.lastIndexOf('/') + 1,
              this.polygonLayer.url.length);
        }
        //create base url of the selected layer
        baseURL = this.polygonLayer.url.substr(0, this.polygonLayer
          .url.lastIndexOf('/') + 1);
        this.polygonLayerInfo.baseURL = baseURL;
        //get additional layer info like title, popupInfo, layerDefination from webmap
        this.polygonLayerInfo = lang.mixin(this.polygonLayerInfo,
          this._getLayerDetailsFromMap(baseURL, this.polygonLayerInfo
            .layerId));
        //set relatedTableInfo
        this.relatedTableInfo = [];
        deferredLayerInfoArray = [];
        array.forEach(this.polygonLayer.relationships, lang.hitch(
          this,
          function (item) {
            var selectedDeferred = new Deferred();
            deferredLayerInfoArray.push(selectedDeferred);
            esriRequest({
              url: baseURL + item.relatedTableId,
              content: {
                f: 'json'
              },
              handleAs: 'json'
            }).then(lang.hitch(this, function (response) {
              selectedDeferred.resolve(response);
            }), lang.hitch(this, function () {
              selectedDeferred.resolve();
            }));
          }));

        all(deferredLayerInfoArray).then(lang.hitch(this, function (
          result) {
          var relatedTableInfo, addRelatedTable, i;
          //create new options for related tables selector according to selected polygon layer
          for (i = 0; i < result.length; i++) {
            //check if related table/layer is having fields
            if (result[i].fields) {
              //check if related table/layer is having any numeric filed
              addRelatedTable = array.some(result[i].fields, lang.hitch(this, function (fieldInfo) {
                return this._numberFieldTypes.indexOf(fieldInfo.type) >= 0;
              }));
              //if layer is not having any numeric field then skip that related table/layer from showing in dropdown
              if (addRelatedTable) {
                relatedTableInfo = {
                  "url": baseURL + result[i].id,
                  "baseURL": baseURL,
                  "relationShipId": this.polygonLayer.relationships[
                  i].id,
                  "layerId": result[i].id,
                  "title": this.polygonLayer.relationships[
                  i].name
                };
                //add related table/layers field in relatedTableInfo
                relatedTableInfo.fields = lang.clone(result[i].fields);
                //try to get related layers details from webmap's operational layer
                relatedTableInfo = lang.mixin(relatedTableInfo,
                this._getLayerDetailsFromMap(baseURL, result[
                  i].id));
                //try to get related layers details from webmap,s table array
                relatedTableInfo = lang.mixin(relatedTableInfo,
                this._getLayerDetailsFromMapTables(baseURL, result[
                  i].id));
                //if relationship has title then only add it to dropdown options
                if (relatedTableInfo.title) {
                  this.relatedTableInfo[options.length] =
                  relatedTableInfo;
                  options.push({
                    label: this.relatedTableInfo[options.length]
                    .title,
                    value: options.length
                  });
                }
              }
            }
          }
          //set new options according to selected polygon layer
          if (options.length > 0) {
            //remove previous options
            this.relationshipSelect.options.length = 0;
            //set first option by default
            options[0].selected = true;
            //set new options in related table selector
            this.relationshipSelect.addOption(options);
            //Enable ok button
            domClass.remove(this.okButton,
              "jimu-state-disabled");
          } else {
            //remove previous options
            this._resetRelatedLayerSelector();
          }
        }), lang.hitch(this, function () {
          this._resetRelatedLayerSelector();
        }));
      } else {
        //remove previous options
        this._resetRelatedLayerSelector();
      }
    },


    /**
    * This function is used to reset the related table drop down.
    * @memberOf widgets/RelatedTableCharts/setting/LayerChooser.js
    **/
    _resetRelatedLayerSelector: function () {
      this.relationshipSelect.value = "";
      this.relationshipSelect.options.length = 0;
      this.relationshipSelect.addOption({
        value: "",
        label: "",
        selected: true
      });
      //Disable OK button
      domClass.add(this.okButton, "jimu-state-disabled");
    },

    /**
    * This function gets selected layer details from map
    * @param {string} : baseURL
    * @param {int} : relatedTableId - id of the layer
    * @return {object} Object of config
    * @memberOf widgets/RelatedTableCharts/setting/LayerChooser.js
    **/
    _getLayerDetailsFromMap: function (baseURL, relatedLayerId) {
      var selectedLayer = {};
      if (this.map && this.map.webMapResponse && this.map.webMapResponse
        .itemInfo && this.map.webMapResponse.itemInfo.itemData &&
        this.map.webMapResponse.itemInfo.itemData.operationalLayers) {
        array.forEach(this.map.webMapResponse.itemInfo.itemData.operationalLayers,
          lang.hitch(this, function (layer) {
            if (layer.layerObject) {
              if (layer.layerType === "ArcGISMapServiceLayer" ||
                layer.layerType === "ArcGISTiledMapServiceLayer") {
                if (baseURL.substring(0, baseURL.length - 1) ===
                  layer.url) {
                  array.forEach(layer.resourceInfo.layers, lang.hitch(
                    this,
                    function (subLayer) {
                      if (subLayer.id === parseInt(
                          relatedLayerId, 10)) {
                        selectedLayer.title = subLayer.name;
                        return;
                      }
                    }));
                  array.forEach(layer.layers, lang.hitch(this,
                    function (subLayer) {
                      if (subLayer.id === parseInt(
                          relatedLayerId, 10)) {
                        if (subLayer.name) {
                          selectedLayer.title = subLayer.name;
                        }
                        selectedLayer.popupInfo = subLayer.popupInfo;
                        //set layer's definitionExpression
                        if (subLayer.layerDefinition &&
                          subLayer.layerDefinition.definitionExpression
                        ) {
                          selectedLayer.definitionExpression =
                            subLayer.layerDefinition.definitionExpression;
                        }
                        return;
                      }
                    }));
                }
              } else {
                if (layer.url.replace(/.*?:\/\//g, "") === (
                    baseURL + relatedLayerId).replace(/.*?:\/\//g,
                    "")) {
                  selectedLayer.title = layer.title;
                  selectedLayer.popupInfo = layer.popupInfo;
                  //set layer's definitionExpression
                  if (layer.layerDefinition && layer.layerDefinition
                    .definitionExpression) {
                    selectedLayer.definitionExpression = layer.layerDefinition
                      .definitionExpression;
                  }
                  return;
                }
              }
            }
          }));
      }
      return selectedLayer;
    },

    /**
    * This function gets selected table details from map
    * @param {string} : baseURL
    * @param {int} : relatedTableId
    * @return {object} Object of config
    * @memberOf widgets/RelatedTableCharts/setting/LayerChooser.js
    **/
    _getLayerDetailsFromMapTables: function (baseURL, relatedTableId) {
      var selectedTable = {};
      if (this.map && this.map.webMapResponse && this.map.webMapResponse
        .itemInfo && this.map.webMapResponse.itemInfo.itemData &&
        this.map.webMapResponse.itemInfo.itemData.tables) {
        array.forEach(this.map.webMapResponse.itemInfo.itemData.tables,
          lang.hitch(this, function (table) {
            if (table.url.replace(/.*?:\/\//g, "") === (
                    baseURL + relatedTableId).replace(/.*?:\/\//g,
                    "")) {
              selectedTable.title = table.title;
              selectedTable.popupInfo = table.popupInfo;
              //set table's definitionExpression
              if (table.layerDefinition && table.layerDefinition
                    .definitionExpression) {
                selectedTable.definitionExpression = table.layerDefinition
                      .definitionExpression;
              }
              return;
            }
          }));
      }
      return selectedTable;
    },

    /**
    * Validates and show error if invalid layers selected else generates onOkClick event
    * @memberOf widgets/RelatedTableCharts/settings/LayerChooser.js
    **/
    _onOKButtonClicked: function () {
      //this.onOkClick(this.itemSelectDiv.value);
      var selectedLayerDetails;
      //check if ok button is enabled
      if (!domClass.contains(this.okButton, "jimu-state-disabled")) {
        //if invalid layer info return error
        //if invalid related table/layer info return error
        //if both the infos are valid return the data
        if (!this.polygonLayerInfo) {
          this._errorMessage(this.nls.layerChooser.errorInSelectingPolygonLayer);
          return false;
        } else if (this.relationshipSelect.value === "") {
          this._errorMessage(this.nls.layerChooser.errorInSelectingRelatedLayer);
          return false;
        } else {
          selectedLayerDetails = {
            "polygonLayerInfo": this.polygonLayerInfo,
            "relatedLayerInfo": this.relatedTableInfo[this.relationshipSelect
              .value]
          };
          this.onOkClick(selectedLayerDetails);
        }
      }
    },

    /**
    * This function create error alert.
    * @param {string} err
    * @memberOf widgets/RelatedTableCharts/settings/LayerChooser.js
    **/
    _errorMessage: function (err) {
      var errorMessage = new Message({
        message: err
      });
      errorMessage.message = err;
    },

    /**
    * Event which will be generated on clicking ok button
    * @param {object} evt
    * @memberOf widgets/RelatedTableCharts/settings/LayerChooser.js
    **/
    onOkClick: function (evt) {
      return evt;
    },

    /**
    * Event which will be generated on clicking cancel button
    * @param {object} evt
    * @memberOf widgets/RelatedTableCharts/settings/LayerChooser.js
    **/
    onCancleClick: function (evt) {
      return evt;
    }
  });
});


