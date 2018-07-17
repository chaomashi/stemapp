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
  "jimu/BaseWidgetSetting",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/_base/lang",
  "dojo/text!./layerChooserPopup.html",
  "jimu/dijit/LayerChooserFromMap",
  "jimu/dijit/Popup",
  "dojo/dom-construct",
  "dojo/_base/array"
], function (
  declare,
  BaseWidgetSetting,
  _WidgetsInTemplateMixin,
  lang,
  LayerChooseTemplate,
  LayerChooserFromMap,
  Popup,
  domConstruct,
  array
) {
  // to create a widget, derive it from BaseWidget.
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-nearme-setting',
    templateString: LayerChooseTemplate,
    _layerChooserFromMap: null, //to store layer chooser widget instance
    popup: null, //to store popup instance for layer chooser
    searchLayers: [], //to store selected  search layers
    startup: function () {
      this.inherited(arguments);
    },
    postCreate: function () {
      this.searchLayers = []; //to store selected  search layers
      // initialize layer chooser
      this._initLayerSelector();
      //create popup for layer selector
      this._createLayerSelectorPopup();
      this._layerChooserFromMap.tree.expandAll().then(lang.hitch(this, this._showSelectedLayer));
    },

    /**
    * This function used to retain previuosely selected rows
    * @memberOf widgets/NearMe/setting/layerChooserPopup
    **/
    _showSelectedLayer: function () {
      if (this._layerChooserFromMap && this.configuredSearchLayer) {
        var selectedItem = [];
        array.forEach(this.configuredSearchLayer, lang.hitch(this, function (layer) {
          selectedItem.push(layer.id);
        }));
        var items = this._layerChooserFromMap.tree.getAllItems();
        array.forEach(items, lang.hitch(this, function (item) {
          if (item.id !== 'root' && selectedItem.indexOf(item.layerInfo.id) > -1) {
            this._layerChooserFromMap.tree.selectItem(item.id);
          }
        }));
      }
    },


    /**
    * initialize layer chooser widget to display the search layers
    * @memberOf widgets/NearMe/setting/layerChooserPopup
    **/
    _initLayerSelector: function () {
      var args = {
        multiple: true,
        createMapResponse: this.map.webMapResponse,
        showLayerTypes: ['FeatureLayer'],
        filter: this._createFiltersForLayerSelector()
      };
      this._layerChooserFromMap = new LayerChooserFromMap(args);
      this._layerChooserFromMap.placeAt(this.layerSelectorNode);
      this._layerChooserFromMap.startup();
      this._layerChooserFromMap._onTreeClick = lang.hitch(this, function () {
        if (this._layerChooserFromMap.getSelectedItems().length) {
          //enable 'OK' button if any layer is selected
          this.popup.enableButton(0);
        } else {
          //disable 'OK' button if no layer is selected
          this.popup.disableButton(0);
        }
      });
    },

    /*create filters to get layers with supported features
    * @memberOf widgets/NearMe/setting/layerChooserPopup
    **/
    _createFiltersForLayerSelector: function () {
      var types, featureLayerFilter, imageServiceLayerFilter, filters, combinedFilter;
      types = ['point', 'polyline', 'polygon'];
      featureLayerFilter = LayerChooserFromMap.createFeaturelayerFilter(types, false, false);
      imageServiceLayerFilter = LayerChooserFromMap.createImageServiceLayerFilter(true);
      filters = [featureLayerFilter, imageServiceLayerFilter];
      combinedFilter = LayerChooserFromMap.orCombineFilters(filters);
      return combinedFilter;
    },

    /**
    * create popup to display layer chooser
    * @memberOf widgets/NearMe/setting/layerChooserPopup
    **/
    _createLayerSelectorPopup: function () {
      //creating ok button
      this.okButton = domConstruct.create("button", {
        title: this.nls.common.ok
      });
      this.okButton.label = this.nls.common.ok;
      this.okButton.onClick = lang.hitch(this, this._getSelectedSearchLayers);
      //creating cancel button
      this.cancelButton = domConstruct.create("button", {
        title: this.nls.common.cancel
      });
      this.cancelButton.label = this.nls.common.cancel;
      //initializing popup with default configuration
      this.popup = new Popup({
        titleLabel: this.nls.layerSelector.selectLayerLabel,
        content: this.layerSelectorContainer,
        width: 640,
        autoHeight: true,
        buttons: [this.okButton, this.cancelButton]
      });
      //Setting default state of ok button as disabled
      this.popup.disableButton(0);
    },

    /**
    * This function get selected layer and create map server URL
    * @memberOf widgets/NearMe/setting/layerChooserPopup
    **/
    _getSelectedSearchLayers: function () {
      var i, selectedLayerItems, baseURL, layerItem;
      this.searchLayers = [];
      //get selected items from chooser
      selectedLayerItems = this._layerChooserFromMap.getSelectedItems();
      //Show error if no layers selected
      if (selectedLayerItems.length > 0) {
        for (i = 0; i < selectedLayerItems.length; i++) {
          layerItem = {
            "url": selectedLayerItems[i].layerInfo.layerObject.url,
            "geometryType": selectedLayerItems[i].layerInfo.layerObject.geometryType,
            "id": selectedLayerItems[i].layerInfo.id
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
          this.searchLayers.push(layerItem);
        }
      }
      this.onOkClick();
    },
    onOkClick: function (evt) {
      return evt;
    }
  });
});