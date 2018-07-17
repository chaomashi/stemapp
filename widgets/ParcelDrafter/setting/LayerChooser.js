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
  'dijit/_WidgetsInTemplateMixin',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/text!./LayerChooser.html',
  'jimu/dijit/LayerChooserFromMap',
  'jimu/dijit/LayerChooserFromMapWithDropbox',
  'dojo/dom-class',
  'jimu/utils',
  'dojo/Deferred',
  'esri/request',
  'dojo/promise/all',
  'jimu/dijit/Message',
  'jimu/dijit/Popup',
  'dojo/dom-construct',
  'dojo/domReady!'
],
  function (
    declare,
    BaseWidgetSetting,
    _WidgetsInTemplateMixin,
    array,
    lang,
    on,
    layerChooserTemplate,
    LayerChooserFromMap,
    LayerChooserFromMapWithDropbox,
    domClass,
    jimuUtils,
    Deferred,
    esriRequest,
    all,
    Message,
    Popup,
    domConstruct
  ) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-ParcelDrafter-setting',
      templateString: layerChooserTemplate,
      selectedLayerDetails: [],
      relatedLayerInfo: [],
      relatedLayerTypes: [],
      chooseRelatedLayers: false,
      _layerChooserFromMap: null,

      startup: function () {
        this.inherited(arguments);
      },

      postCreate: function () {
        //init widget var
        this.selectedLayerDetails = [];
        this.relatedLayerInfo = [];
        //if related layer types are not set load all types of layer
        if (!this.relatedLayerTypes || this.relatedLayerTypes.length === 0) {
          this.relatedLayerTypes = ["point", 'polyline', 'polygon'];
        }
        this._initPopup();
        this._initLayerSelector();
      },

      /**
      * Initialize Popup to show layer selector.
      * @memberOf widgets/ParcelDrafter/setting/layerChooserPopup
      **/
      _initPopup: function () {
        //creating ok button
        this.okButton = domConstruct.create("button", {
          title: this.nls.common.ok
        });
        this.okButton.label = this.nls.common.ok;
        //handle ok button click
        this.okButton.onClick = lang.hitch(this, function () {
          //in case of multiple layer selector get selected layers
          if (this.multiple) {
            this._getSelectedLayers();
          }
          //in case of related layer chooser get the selected related layer
          if (this.chooseRelatedLayers && this.relatedLayerInfo.length > 0) {
            this.selectedLayerDetails.push(
              this.relatedLayerInfo[this.relatedLayerSelector.value]);
          }
          this.onOKButtonClicked(this.selectedLayerDetails);
          this.popup.close();
        });
        //creating cancel button
        this.cancelButton = domConstruct.create("button", {
          title: this.nls.common.cancel
        });
        this.cancelButton.label = this.nls.common.cancel;
        //handle cancel button click
        this.cancelButton.onClick = lang.hitch(this, function (evt) {
          this.onCancelClick(evt);
          this.popup.close();
        });
        //initializing popup with default configuration
        this.popup = new Popup({
          titleLabel: this.title,
          content: this.domNode,
          width: 830,
          autoHeight: true,
          buttons: [this.okButton, this.cancelButton]
        });
        //Setting default state of ok button as disabled
        this.popup.disableButton(0);
      },

      /**
      * Initialize layer chooser widget to display the layers from map.
      * Based on parameters it will create Single/Multiple/Related Layer selector.
      * @memberOf widgets/ParcelDrafter/setting/layerChooserPopup
      **/
      _initLayerSelector: function () {
        var tempLayerChooserFromMap, args;
        args = {
          multiple: this.multiple,
          createMapResponse: this.map.webMapResponse,
          showLayerTypes: this.showLayerTypes,
          filter: this._createFiltersForLayerSelector()
        };
        //multiple create object of LayerChooserFromMap so that user can select multiple layers,
        //if not then create LayerChooserFromMapWithDropbox so that user can select single layer
        if (this.multiple) {
          this._layerChooserFromMap = new LayerChooserFromMap(args);
        } else {
          tempLayerChooserFromMap = new LayerChooserFromMap(args);
          this._layerChooserFromMap = new LayerChooserFromMapWithDropbox({
            layerChooser: tempLayerChooserFromMap
          });
        }
        //if choose related layers show the selector to select related layer,
        //else show only layer chooser
        if (this.chooseRelatedLayers) {
          this._layerChooserFromMap.placeAt(this.relatedLayerChooserDiv);
        } else {
          domClass.add(this.relatedLayerChooser, "esriCTHidden");
          this._layerChooserFromMap.placeAt(this.singleLayerChooser);
        }
        this._layerChooserFromMap.startup();
        //if multiple handle tree click else handle selection-change event
        if (this.multiple) {
          this._layerChooserFromMap._onTreeClick = lang.hitch(this, function () {
            if (this._layerChooserFromMap.getSelectedItems().length) {
              //enable 'OK' button if any layer is selected
              this.popup.enableButton(0);
            } else {
              //disable 'OK' button if no layer is selected
              this.popup.disableButton(0);
            }
          });
        } else {
          this.own(on(this._layerChooserFromMap, 'selection-change', lang.hitch(
            this, function (evt) {
              this._setSelectedLayerDetails(evt);
            })));
        }
      },

      /**
      * Create filters to get layers with supported features
      * @memberOf widgets/ParcelDrafter/setting/layerChooserPopup
      **/
      _createFiltersForLayerSelector: function () {
        var types, featureLayerFilter, imageServiceLayerFilter, filters, combinedFilter;
        types = this.types ? this.types : ['point', 'polyline', 'polygon'];
        featureLayerFilter = LayerChooserFromMap.createFeaturelayerFilter(types, false, false);
        imageServiceLayerFilter = LayerChooserFromMap.createImageServiceLayerFilter(true);
        filters = [featureLayerFilter, imageServiceLayerFilter];
        combinedFilter = LayerChooserFromMap.orCombineFilters(filters);
        return combinedFilter;
      },

      /**
      * On selection change sel selected layer details
      * @memberOf widgets/ParcelDrafter/setting/layerChooserPopup
      **/
      _setSelectedLayerDetails: function (evt) {
        var layerItem;
        layerItem = {};
        this.selectedLayerDetails = [];
        layerItem.id = evt[0].id;
        layerItem.url = evt[0].url;
        layerItem.geometryType = evt[0].geometryType;
        layerItem.layerId = evt[0].layerId;
        //create base URL
        layerItem.baseURL = evt[0].url.substr(0, evt[0].url.lastIndexOf(
          '/') + 1);
        //if item has relationships add in item
        if (evt[0].relationships) {
          layerItem.relationships = evt[0].relationships;
        }
        //add the selected layer in selectedLayerDetails
        this.selectedLayerDetails.push(layerItem);
        //if chooseRelatedLayers is true add options for related layer using relation ships.
        //else enable the ok button as layer is selected.
        if (this.chooseRelatedLayers) {
          this._createRelatedLayerOptions(this.selectedLayerDetails[0]);
        } else {
          this.popup.enableButton(0);
        }
      },


      /**
      * This function get selected layer and create map server URL
      * @memberOf widgets/ParcelDrafter/setting/layerChooserPopup
      **/
      _getSelectedLayers: function () {
        var i, selectedLayerItems, baseURL, layerItem;
        this.selectedLayerDetails = [];
        //get selected items from chooser
        selectedLayerItems = this._layerChooserFromMap.getSelectedItems();
        if (selectedLayerItems.length > 0) {
          //Enable ok button as layers are selected in case of multiple select
          this.popup.enableButton(0);
          //iterate through all the selected layers and add in selectedLayerDetails
          for (i = 0; i < selectedLayerItems.length; i++) {
            layerItem = {
              "url": selectedLayerItems[i].layerInfo.layerObject.url,
              "geometryType": selectedLayerItems[i].layerInfo.layerObject.geometryType,
              "id": selectedLayerItems[i].layerInfo.layerObject.id
            };
            if (selectedLayerItems[i].layerId) {
              layerItem.layerId = selectedLayerItems[i].layerId;
            } else {
              layerItem.layerId = layerItem.url.substr(layerItem.url.lastIndexOf(
                '/') + 1, layerItem.url
                  .length);
            }
            //create map server URL
            baseURL = layerItem.url.substr(0, layerItem.url.lastIndexOf(
              '/') + 1);
            layerItem.baseURL = baseURL;
            this.selectedLayerDetails.push(layerItem);
          }
        }
      },

      /**
      * This function gets selected layer details from map
      * @param {string} : baseURL
      * @param {int} : relatedLayerId - id of the layer
      * @memberOf widgets/ParcelDrafter/setting/LayerChooser
      **/
      _getLayerDetailsFromMap: function (baseURL, relatedLayerId) {
        var selectedLayersArray = [], selectedLayer;
        if (this.map && this.map.webMapResponse && this.map.webMapResponse
          .itemInfo && this.map.webMapResponse.itemInfo.itemData &&
          this.map.webMapResponse.itemInfo.itemData.operationalLayers) {
          array.forEach(this.map.webMapResponse.itemInfo.itemData.operationalLayers,
            lang.hitch(this, function (layer) {
              selectedLayer = {};
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
                          selectedLayersArray.push(selectedLayer);
                        }
                      }));
                    array.forEach(layer.layers, lang.hitch(this,
                      function (subLayer) {
                        if (subLayer.id === parseInt(
                          relatedLayerId, 10)) {
                          if (subLayer.name) {
                            selectedLayer.title = subLayer.name;
                          }
                          selectedLayer.id = layer.id;
                          selectedLayersArray.push(selectedLayer);
                        }
                      }));
                  }
                } else {
                  if (layer.url.replace(/.*?:\/\//g, "").toLowerCase() ===
                    (baseURL + relatedLayerId).replace(/.*?:\/\//g, "").toLowerCase()) {
                    selectedLayer.id = layer.id;
                    selectedLayer.title = layer.title;
                    selectedLayersArray.push(selectedLayer);
                  }
                }
              }
            }));
        }
        return selectedLayersArray;
      },

      /**
      * This function is used to create options for related layer based on
      * selected layer and its relationships.
      * @memberOf widgets/ParcelDrafter/settings/Settings
      **/
      _createRelatedLayerOptions: function (selectedLayer) {
        var options = [], deferredLayerInfoArray;
        //check if valid selected layer and its relationships else reset the related layer selector
        if (selectedLayer && selectedLayer.relationships &&
          selectedLayer.relationships.length > 0) {
          this.relatedLayerInfo = [];
          deferredLayerInfoArray = [];
          var baseURL = selectedLayer.baseURL;
          //iterate through all the relationships and get its info
          array.forEach(selectedLayer.relationships, lang.hitch(this, function (item) {
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
          //after getting all the infos get its details from map and add in selector
          all(deferredLayerInfoArray).then(lang.hitch(this, function (
            result) {
            var relatedLayerInfo, updatedRelatedLayerInfo, relatedLayerType, i, j,
              relatedLayerDetailsFromMap;
            //create new options for related layer selector according to selected layer
            for (i = 0; i < result.length; i++) {
              if (result[i]) {
                relatedLayerType = jimuUtils.getTypeByGeometryType(result[i].geometryType);
                if (this.relatedLayerTypes.indexOf(relatedLayerType) > -1) {
                  relatedLayerInfo = {
                    "url": baseURL + result[i].id,
                    "baseURL": baseURL,
                    "relationShipId": selectedLayer.relationships[i].id,
                    "layerId": result[i].id,
                    "geometryType": result[i].geometryType,
                    "title": result[i].name
                  };
                  //add related table/layers field in relatedLayerInfo
                  if (result[i].fields) {
                    relatedLayerInfo.fields = lang.clone(result[i].fields);
                  }
                  //try to get related layers details from webmap's operational layer
                  relatedLayerDetailsFromMap = this._getLayerDetailsFromMap(baseURL,
                    result[i].id);
                  //the related layer may have multiple instance in webMap so show all of them
                  for (j = 0; j < relatedLayerDetailsFromMap.length; j++) {
                    //set relatedLayerInfo in all instances
                    updatedRelatedLayerInfo = lang.clone(relatedLayerInfo);
                    lang.mixin(updatedRelatedLayerInfo, relatedLayerDetailsFromMap[j]);
                    if (updatedRelatedLayerInfo.title) {
                      this.relatedLayerInfo[options.length] = updatedRelatedLayerInfo;
                      options.push({
                        label: this.relatedLayerInfo[options.length].title,
                        value: options.length
                      });
                    }
                  }
                }
              }
            }
            //set new options according to selected layer
            if (options.length > 0) {
              //remove previous options
              this.relatedLayerSelector.options.length = 0;
              //set first option by default
              options[0].selected = true;
              //set new options in related layer selector
              this.relatedLayerSelector.addOption(options);
              //Enable ok button
              this.popup.enableButton(0);
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
      * This function is used to reset the related layer selector.
      * @memberOf widgets/ParcelDrafter/settings/Settings
      **/
      _resetRelatedLayerSelector: function () {
        this.relatedLayerSelector.value = "";
        this.relatedLayerSelector.options.length = 0;
        this.relatedLayerSelector.addOption({
          value: "",
          label: "",
          selected: true
        });
        //Disable OK button
        this.popup.disableButton(0);
        //Show error as the selected layer is not having any valid related layer
        this._showMessage(this.nls.layerSelector.selectedLayerNotHavingRelatedLayer);
      },

      /**
      * Event which will be generated on clicking cancel button
      * @param {object} evt
      * @memberOf widgets/ParcelDrafter/settings/TableField.js
      **/
      onOKButtonClicked: function () {
        return this.selectedLayerDetails;
      },

      /**
      * Event which will be generated on clicking cancel button
      * @param {object} evt
      * @memberOf widgets/ParcelDrafter/settings/TableField.js
      **/
      onCancelClick: function (evt) {
        return evt;
      },

      /**
      * show message in popup
      * @param {string} message
      * @memberOf widgets/ParcelDrafter/settings/LayerChooser
      **/
      _showMessage: function (msg) {
        var alertMessage = new Message({
          message: msg,
          buttons: [{
            "label": this.nls.common.ok
          }]
        });
        alertMessage.message = msg;
      }
    });
  });