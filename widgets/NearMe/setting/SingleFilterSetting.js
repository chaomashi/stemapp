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
  'dojo/Evented',
  'dojo/_base/lang',
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./SingleFilterSetting.html',
  'jimu/utils',
  'jimu/dijit/Filter',
  'jimu/dijit/Message',
  'jimu/dijit/CheckBox',
  'jimu/dijit/LayerChooserFromMapWithDropbox',
  './CustomFeaturelayerChooserFromMap',
  'jimu/dijit/ImageChooser',
  'dijit/form/ValidationTextBox'
], function(
  on,
  query,
  Evented,
  lang,
  declare,
  _WidgetBase,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  template,
  jimuUtils,
  Filter,
  Message,
  CheckBox,
  LayerChooserFromMapWithDropbox,
  CustomFeaturelayerChooserFromMap) {

  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
    baseClass: 'jimu-widget-nearme-singlefilter-setting',
    templateString: template,
    jimuNls: null,
    _defaultTaskIcon: null,

    //options
    map: null,
    nls: null,
    target: null,
    layerInfosObj: null,
    folderUrl: '',
    appConfig: null,

    //public methods:
    //reset
    //setConfig
    //getConfig
    //setNewLayerDefinition

    //events:
    //loading
    //unloading

    postMixInProperties:function(){
      this.inherited(arguments);
      this._defaultTaskIcon = this.folderUrl + "css/images/default_task_icon.png";
      this.jimuNls = window.jimuNls;
    },

    postCreate: function(){
      this.inherited(arguments);
      this.cbxRemoveMapFilter = new CheckBox({
        'class': "esriCTFilterLabel",
        'label': this.nls.filterSetting.enableMapFilter || ""
      });
      this.cbxRemoveMapFilter.placeAt(this.tdUseMapFilter);
      this.cbxRemoveMapFilter.setValue(false);

      this._recreateLayerChooserSelect(true);
      this.filter = new Filter({
        enableAskForValues: true,
        noFilterTip: this.nls.noFilterTip,
        style: "width:100%;"
      });
      this.filter.placeAt(this.filterDiv);
      this._setDefaultTaskIcon();
    },

    _recreateLayerChooserSelect: function(bindEvent){
      if(this.layerChooserSelect){
        this.layerChooserSelect.destroy();
      }
      this.layerChooserSelect = null;
      var layerChooser = new CustomFeaturelayerChooserFromMap({
        showLayerFromFeatureSet: false,
        showTable: false,
        onlyShowVisible: false,
        createMapResponse: this.map.webMapResponse,
        selectedSearchLayers: this.selectedSearchLayers
      });
      this.layerChooserSelect = new LayerChooserFromMapWithDropbox({
        layerChooser: layerChooser
      });
      this.layerChooserSelect.placeAt(this.layerTd);
      if(bindEvent){
        this._bindEventForLayerChooserSelect(this.layerChooserSelect);
      }
    },

    showLayerChooserPopup: function(){
      this.layerChooserSelect.showLayerChooser();
    },

    destroy: function(){
      this.target = null;
      this.emit('before-destroy');
      this.inherited(arguments);
    },

    //reset by config
    setConfig: function(_config) {
      var config = lang.clone(_config);
      this._showLoading();
      this.reset();

      //set layerChooser
      this._recreateLayerChooserSelect(false);
      var callback = lang.hitch(this, function(){
        if (!this.domNode) {
          return;
        }
        this._bindEventForLayerChooserSelect(this.layerChooserSelect);
        this._hideLoading();
      });
      var layerInfo = this.layerInfosObj.getLayerInfoById(config.layerId);
      layerInfo.getLayerObject().then(lang.hitch(this, function(layer) {
        if (!this.domNode) {
          return;
        }
        this.layerChooserSelect.setSelectedLayer(layer).then(lang.hitch(this, function(success) {
          if (!this.domNode) {
            return;
          }
          this._hideLoading();
          if (!success) {
            return;
          }

          //set icon
          if(config.icon){
            this.imageChooser.setDefaultSelfSrc(jimuUtils.processUrlInWidgetConfig(config.icon, this.folderUrl));
          }else{
            this._setDefaultTaskIcon();
          }

          //enableMapFilter
          this.cbxRemoveMapFilter.setValue(!config.enableMapFilter);

          //nameTextBox
          this.nameTextBox.set('value', config.name);

          //filter
          var layerDefinition = this._getLayerDefinitionForFilterDijit(layer);
          this.filter.buildByFilterObj(layer.url, config.filter, layerDefinition);

          //at last, bind event for layerChooserSelect
          this._bindEventForLayerChooserSelect(this.layerChooserSelect);
        }), lang.hitch(this, function(err) {
          console.error(err);
          callback();
        }));
      }), lang.hitch(this, function(err) {
        console.error(err);
        callback();
      }));
    },

    getConfig: function(){
      var config = {
        layerId: null,
        url: null,
        name: null,
        filter: null,
        icon: null,
        enableMapFilter: !this.cbxRemoveMapFilter.getValue()
      };

      var item = this.layerChooserSelect.getSelectedItem();
      if(!item){
        this._showMessage(this.nls.filterSetting.selectLayerTip);
        return false;
      }

      var layer = item.layerInfo.layerObject;
      config.layerId = layer.id;
      config.url = layer.url;
      config.name = this.nameTextBox.get('value');
      if(!config.name){
        this._showMessage(this.nls.setTitleTip);
        return false;
      }

      //icon
      var icon = this.imageChooser.getImageData();
      if(icon === this._defaultTaskIcon){
        icon = '';
      }
      config.icon = icon;

      //filter
      config.filter = this.filter.toJson();
      if(!config.filter){
        this._showMessage(window.jimuNls.filterBuilder.setFilterTip);
        return false;
      }

      this.target.singleConfig = config;
      return config;
    },

    reset: function(){
      //reset UI without layerChooserSet

      //reset icon
      this._setDefaultTaskIcon();

      //reset enableMapFilter
      this.cbxRemoveMapFilter.setValue(false);

      //reset name
      this.nameTextBox.set('value', '');

      //reset filter
      this.filter.reset();
    },

    _setDefaultTaskIcon: function(){
      this.imageChooser.setDefaultSelfSrc(this._defaultTaskIcon);
    },

    _onNameTextBoxChanged: function(){
      var labelNode = query('.label', this.target)[0];
      var name = this.nameTextBox.get('value');
      labelNode.innerHTML = name;
      labelNode.title = name;
    },

    _bindEventForLayerChooserSelect: function(layerChooserSelect){
      if(!layerChooserSelect.isBindEvent){
        this.own(on(layerChooserSelect, 'selection-change', lang.hitch(this, this._onLayerChanged)));
        layerChooserSelect.isBindEvent = true;
      }
    },

    _showMessage: function(msg){
      new Message({
        message: msg
      });
    },

    //reset by new layer
    _onLayerChanged: function(){
      this.reset();
      var item = this.layerChooserSelect.getSelectedItem();
      if(!item){
        return;
      }
      //nameTextBox
      var layerInfo = item.layerInfo;
      var layer = layerInfo.layerObject;
      this.nameTextBox.set('value', layerInfo.title);
      //filter
      var layerDefinition = this._getLayerDefinitionForFilterDijit(layer);
      this.filter.buildByExpr(layer.url, "1=1", layerDefinition);
    },

    _getLayerDefinitionForFilterDijit: function(layer){
      var layerDefinition = null;

      if(layer.declaredClass === 'esri.layers.FeatureLayer'){
        layerDefinition = jimuUtils.getFeatureLayerDefinition(layer);
      }

      if (!layerDefinition) {
        layerDefinition = {
          currentVersion: layer.currentVersion,
          fields: lang.clone(layer.fields)
        };
      }

      return layerDefinition;
    },

    _showLoading: function(){
      this.emit("loading");
    },

    _hideLoading: function(){
      this.emit("unloading");
    },

    _onImageChooserDivClicked: function(evt){
      if(!this.imageChooser.mask){
        return;
      }

      var target = evt.target || evt.srcElement;
      if(target !== this.imageChooser.mask && target !== this.imageChooser.fileInput){
        jimuUtils.simulateClickEvent(this.imageChooser.mask);
      }
    },

    updateLayerOptions: function (layers) {
      this.selectedSearchLayers = layers;
      this._recreateLayerChooserSelect(true);
    }

  });
});