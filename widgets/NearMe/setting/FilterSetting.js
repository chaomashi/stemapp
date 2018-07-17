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
  'dojo/on',
  'dojo/query',
  'dojo/_base/html',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/_base/declare',
  'dijit/_WidgetsInTemplateMixin',
  "dojo/text!./FilterSetting.html",
  'esri/lang',
  'jimu/utils',
  'jimu/BaseWidgetSetting',
  './SingleFilterSetting',
  'jimu/LayerInfos/LayerInfos',
  'jimu/dijit/CheckBox',
  'jimu/dijit/LoadingShelter'
], function (
  on,
  query,
  html,
  lang,
  array,
  declare,
  _WidgetsInTemplateMixin,
  FilterSettingTemplate,
  esriLang,
  jimuUtils,
  BaseWidgetSetting,
  SingleSetting,
  LayerInfos,
  CheckBox
) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-nearme-filter-setting',
    templateString: FilterSettingTemplate,
    singleSetting: null,
    layerChooserSelect: null,
    layerInfosObj: null,
    selectedSearchLayers: [],

    postMixInProperties: function () {
      this.jimuNls = window.jimuNls;
      this.layerInfosObj = LayerInfos.getInstanceSync();
      if (this.config) {
        this.config = this._getConfigWithValidDataSource(this.config);
      }
      this.noTaskNls = this.nls.filterSetting.noTasksTip;
      this.noTaskNls = esriLang.substitute(
        { newFilter: "<span>" + this.nls.filterSetting.newFilter + "</span>" },
        this.noTaskNls);
    },

    _getConfigWithValidDataSource: function (config) {
      if (!config.filterSettings) {
        config.filterSettings = {};
        config.filterSettings.filters = [];
        config.filterSettings.collapse = false;
      }
      config.filterSettings.filters = array.filter(config.filterSettings.filters,
        lang.hitch(this, function (singleConfig) {
          if (singleConfig.layerId) {
            var layerInfo = this.layerInfosObj.getLayerInfoById(singleConfig.layerId);
            return !!layerInfo;
          } else {
            return true;
          }
        }));
      return config;
    },

    postCreate: function () {
      this.inherited(arguments);
      this.selectedSearchLayers = [];
      this.noTaskTip.innerHTML = this.noTaskNls;
      this.updateLayerOptions();
      //Create checkbox to collapse filters
      this.cbxCollapseFilterExp = new CheckBox({
        'class': "esriCTFilterLabel",
        'label': this.nls.filterSetting.collapseFiltersTip || ""
      });
      this.cbxCollapseFilterExp.placeAt(this.cbxCollapseFilters);
      this.cbxCollapseFilterExp.setValue(false);

      //Create checkbox to group filters by layer name
      this.cbxGroupFilters = new CheckBox({
        'class': "esriCTFilterLabel",
        'label': this.nls.filterSetting.groupFiltersTip || ""
      });
      this.cbxGroupFilters.placeAt(this.cbxGroupFiltersNode);
      this.cbxGroupFilters.setValue(false);
      if (this.config) {
        this.setConfig(this.config);
      }
    },

    _onListContentClicked: function (event) {
      var target = event.target || event.srcElement;
      var itemDom = jimuUtils.getAncestorDom(target, function (dom) {
        return html.hasClass(dom, 'item');
      }, 3);
      if (!itemDom) {
        return;
      }
      if (html.hasClass(target, 'action')) {
        if (html.hasClass(target, 'up')) {
          if (itemDom.previousElementSibling) {
            html.place(itemDom, itemDom.previousElementSibling, 'before');
          }
        } else if (html.hasClass(target, 'down')) {
          if (itemDom.nextElementSibling) {
            html.place(itemDom, itemDom.nextElementSibling, 'after');
          }
        } else if (html.hasClass(target, 'delete')) {
          this._deleteItem(itemDom);
          this._resetSelection();
        }
        return;
      }

      if (this.singleSetting) {
        if (this.singleSetting.target !== itemDom) {
          var singleConfig = this.singleSetting.getConfig();
          if (singleConfig) {
            this.singleSetting.destroy();
            this.singleSetting = null;
            this._createSingleSetting(itemDom);
          }
        }
      } else {
        this._createSingleSetting(itemDom);
      }
    },

    _onBtnAddItemClicked: function () {
      if (this.singleSetting) {
        var singleConfig = this.singleSetting.getConfig();
        if (singleConfig) {
          this.singleSetting.destroy();
          this.singleSetting = null;
        } else {
          return;
        }
      }

      var target = this._createTarget();
      this._createSingleSetting(target, null);
    },

    _createSingleSetting: function (target) {
      query('.item', this.listContent).removeClass('selected');
      if (this.singleSetting) {
        this.singleSetting.destroy();
      }
      this.singleSetting = null;
      this.singleSetting = new SingleSetting({
        map: this.map,
        nls: this.nls,
        target: target,
        folderUrl: this.folderUrl,
        layerInfosObj: this.layerInfosObj,
        selectedSearchLayers: this.selectedSearchLayers
      });
      this.singleSetting.placeAt(this.singleSettingContent);
      this.own(on(this.singleSetting, 'loading', lang.hitch(this, function () {
        this.shelter.show();
      })));
      this.own(on(this.singleSetting, 'unloading', lang.hitch(this, function () {
        this.shelter.hide();
      })));
      this.own(on(this.singleSetting, 'before-destroy', lang.hitch(this, function () {
        html.addClass(this.separator, 'not-visible');
      })));
      html.addClass(target, 'selected');
      if (target.singleConfig) {
        this.singleSetting.setConfig(target.singleConfig);
      } else {
        setTimeout(lang.hitch(this, function () {
          this.singleSetting.showLayerChooserPopup();
        }), 50);
      }
      html.removeClass(this.separator, 'not-visible');
      html.addClass(this.noTaskTip, 'not-visible');
    },

    _createTarget: function (name) {
      name = name || "";
      var target = html.create("div", {
        "class": "item",
        "innerHTML": '<div class="label jimu-ellipsis" title="' + name + '">' + name + '</div>' +
          '<div class="actions jimu-float-trailing">' +
          '<div class="delete action jimu-float-trailing"></div>' +
          '<div class="down action jimu-float-trailing"></div>' +
          '<div class="up action jimu-float-trailing"></div>' +
          '</div>'
      }, this.listContent);
      return target;
    },

    _updateNoQueryTip: function () {
      var itemDoms = query('.item', this.listContent);
      if (itemDoms.length > 0) {
        html.addClass(this.noTaskTip, 'not-visible');
      } else {
        html.removeClass(this.noTaskTip, 'not-visible');
      }
    },

    setConfig: function (config) {
      //  this.cbxCollapseFilters.setValue(!!config.collapse);
      if (config.hasOwnProperty('filterSettings')) {
        if (config.filterSettings.hasOwnProperty('collapse')) {
          this.cbxCollapseFilterExp.setValue(config.filterSettings.collapse);
        }
        if (config.filterSettings.hasOwnProperty('groupFiltersByLayer')) {
          this.cbxGroupFilters.setValue(config.filterSettings.groupFiltersByLayer);
        }
        var firstTarget = null;
        array.forEach(config.filterSettings.filters, lang.hitch(this, function (singleConfig, index) {
          var target = this._createTarget(singleConfig.name);
          target.singleConfig = singleConfig;
          if (index === 0) {
            firstTarget = target;
          }
        }));
        if (firstTarget) {
          this._createSingleSetting(firstTarget);
        }
      }
      this._updateNoQueryTip();
    },

    getConfig: function () {
      if (this.singleSetting) {
        var singleConfig = this.singleSetting.getConfig();
        if (!singleConfig) {
          return false;
        }
      }
      var targets = query('.item', this.listContent);
      var config = {
        collapse: this.cbxCollapseFilterExp.getValue(),
        groupFiltersByLayer: this.cbxGroupFilters.getValue(),
        filters: []
      };
      config.filters = array.map(targets, lang.hitch(this, function (target) {
        return target.singleConfig;
      }));
      return config;
    },

    destroy: function () {
      if (this.singleSetting) {
        this.singleSetting.destroy();
      }
      this.singleSetting = null;
      this.inherited(arguments);
    },

    /**
     * Once layer selection is updated, update the filter settings and layer allowed to be used for filters
     */
    updateLayerOptions: function (layers) {
      var featureLayersArr = [], featureLayers, targets, itemsToBeDeleted;
      //Set current selected/previously configured feature layers
      featureLayers = layers || this.config.searchLayers;
      //loop through all layers and create an array with layer ids
      array.forEach(featureLayers, lang.hitch(this, function (featureLayer) {
        featureLayersArr.push(featureLayer.id);
      }));
      //set the selected search layers for this widget
      this.selectedSearchLayers = featureLayersArr;
      //update the layer chooser in current selected filter setting
      if (this.singleSetting) {
        this.singleSetting.updateLayerOptions(this.selectedSearchLayers);
      }
      //update item list to keep only selected layers in a list
      targets = query('.item', this.listContent);
      itemsToBeDeleted = [];
      //from already added filters list creat the list of itmes to be deleted
      array.forEach(targets, lang.hitch(this, function (item) {
        if (!item.singleConfig ||
          this.selectedSearchLayers.indexOf(item.singleConfig.layerId) < 0) {
          itemsToBeDeleted.push(item);
        }
      }));
      //delete each item individually
      array.forEach(itemsToBeDeleted, lang.hitch(this, function (itemDom) {
        this._deleteItem(itemDom);
      }));
      //once all the items are deleted update the selection
      this._resetSelection();
    },

    /**
     * Deletes each item from the list
     */
    _deleteItem: function (itemDom) {
      if (!itemDom) {
        return;
      }
      //if deleteing current item then delete its settings as well
      if (this.singleSetting && this.singleSetting.target === itemDom) {
        this.singleSetting.destroy();
        this.singleSetting = null;
      }
      //destroy the item
      html.destroy(itemDom);
    },

    /**
     * Based on current remainig list updates the selection and msg if required
     */
    _resetSelection: function () {
      var filterItemDoms = query('.item', this.listContent);
      if (filterItemDoms.length > 0) {
        this._createSingleSetting(filterItemDoms[0]);
      }
      this._updateNoQueryTip();
    }
  });
});