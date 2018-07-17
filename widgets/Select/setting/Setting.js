///////////////////////////////////////////////////////////////////////////
// Copyright © 2015 Esri. All Rights Reserved.
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
  "dojo/_base/declare",
  "dojo/_base/lang",
  'dojo/_base/Color',
  "dojo/on",
  'dojo/_base/array',
  'dojo/query',
  'dojo/Deferred',
  'dojo/_base/html',
  "dijit/_WidgetsInTemplateMixin",
  "jimu/BaseWidgetSetting",
  'jimu/LayerInfos/LayerInfos',
  "jimu/dijit/CheckBox",
  "jimu/dijit/LayerChooserFromMap",
  "jimu/dijit/LayerChooserFromMapLite",
  "jimu/dijit/ColorPickerButton"
], function(declare, lang, Color, on, array, query, Deferred, html, _WidgetsInTemplateMixin, BaseWidgetSetting,
  LayerInfos, CheckBox, LayerChooserFromMap, LayerChooserFromMapLite) {
  var PARTIAL_WITHIN = 'partial', WHOLLY_WITHIN = 'wholly';
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-select-setting',

    selectionColor: '',
    selectionMode: '',
    allowExport: false,

    postMixInProperties:function(){
      this.inherited(arguments);
      lang.mixin(this.nls, window.jimuNls.featureSetChooser);
    },

    postCreate: function() {
      this.inherited(arguments);

      this.allowExportCheckBox = new CheckBox({
        label: this.nls.allowExport,
        checked: this.config && this.config.allowExport,
        onChange: lang.hitch(this, this._onAllowExportChange)
      }, this.exportCheckBoxDiv);

      this.includeRuntimeLayersCheckBox = new CheckBox({
        label: this.nls.includeRuntimeLayers,
        checked: this.config && this.config.includeRuntimeLayers !== false,
        onChange: lang.hitch(this, this._onIncludeRuntimeLayersChange)
      }, this.runtimeLayersCheckBoxDiv);

      if(this.config) {
        this._init();
      }

      this.own(on(this.colorPicker, 'change', lang.hitch(this,
          this._onColorChange)));
    },

    _onColorChange: function(color) {
      this.selectionColor = color.toHex();
    },

    _onSelectPartialMode: function() {
      this.selectionMode = PARTIAL_WITHIN;
    },

    _onSelectWhollyMode: function() {
      this.selectionMode = WHOLLY_WITHIN;
    },

    _onAllowExportChange: function(checked) {
      this.allowExport = checked;
    },

    _onIncludeRuntimeLayersChange: function(checked) {
      this.includeRuntimeLayers = checked;
    },

    _init: function() {
      this.selectionColor = this.config.selectionColor;
      if(this.config.selectionColor) {
        this.colorPicker.setColor(new Color(this.selectionColor));
      }

      this.selectionMode = this.config.selectionMode;
      if(this.config.selectionMode === PARTIAL_WITHIN) {
        this.partialMode.checked = true;
        this._onSelectPartialMode();
      }else if(this.config.selectionMode === WHOLLY_WITHIN) {
        this.whollyMode.checked = true;
        this._onSelectWhollyMode();
      }

      this.allowExport = this.config.allowExport;
      this.allowExportCheckBox.setValue(this.allowExport);

      this.includeRuntimeLayers = this.config.includeRuntimeLayers !== false;
      this.includeRuntimeLayersCheckBox.setValue(this.includeRuntimeLayers);

      this._selectDrawingTools(this.config.geometryTypes || ['EXTENT']);

      if (!this.layerChooser) {
        var webmapFilter = function (layerInfo) {
          var def = new Deferred();

          var webmapLayerInfoArray = LayerInfos.getInstanceSync().getLayerInfoArrayOfWebmap();
          var isWebmapLayerInfo = array.some(webmapLayerInfoArray, function(webmapLayerInfo) {
            if(webmapLayerInfo.id === layerInfo.id) {
              return true;
            }
          }, this);

          def.resolve(isWebmapLayerInfo);
          return def;
        };
        var featurelayerFilter = LayerChooserFromMap.createFeaturelayerFilter(null, true, false, false);
        this.layerChooser = new LayerChooserFromMapLite({
          customFilter: featurelayerFilter,
          onlySelectLeafLayer:true,
          onlyShowWebMapLayers: true,
          layerState: this.config.layerState
        });
        this.layerChooser.placeAt(this.layerChooserDiv);
        this.layerChooser.startup();
      } else if (this.config.layerState) {
        this.layerChooser.restoreState(this.config.layerState);
      }
    },

    setConfig: function(config) {
      this.config = config;
      this._init();
    },

    getConfig: function() {
      return {
        selectionColor: this.selectionColor,
        selectionMode: this.selectionMode,
        allowExport: this.allowExport,
        includeRuntimeLayers: this.includeRuntimeLayers,
        geometryTypes: this._getSelectedDrawingTools(),
        layerState: this.layerChooser.getState()
      };
    },

    _onDrawingToolsContainerClicked: function(event){
      var target = event.target || event.srcElement;

      var darwItemDom = null;

      if(html.hasClass(target, 'draw-item')){
        darwItemDom = target;
      }else if(html.hasClass(target, 'draw-item-icon')){
        darwItemDom = target.parentNode;
      }

      if(!darwItemDom){
        return;
      }

      html.toggleClass(darwItemDom, 'selected');

      var selectedDrawItems = query('.selected', this.drawingToolsContainer);

      if(selectedDrawItems.length === 0){
        html.addClass(darwItemDom, 'selected');
      }
    },

    _selectDrawingTools: function(geometryTypes){
      var drawItems = query('.draw-item', this.drawingToolsContainer);
      array.forEach(drawItems, lang.hitch(this, function(darwItem){
        var geoType = darwItem.getAttribute('data-geotype');
        if(geometryTypes.indexOf(geoType) >= 0){
          html.addClass(darwItem, 'selected');
        }else{
          html.removeClass(darwItem, 'selected');
        }
      }));
    },

    _getSelectedDrawingTools: function(){
      var geometryTypes = [];
      var drawItems = query(".draw-item.selected", this.drawingToolsContainer);
      geometryTypes = array.map(drawItems, lang.hitch(this, function(darwItem){
        return darwItem.getAttribute('data-geotype');
      }));
      return geometryTypes;
    }
  });
});