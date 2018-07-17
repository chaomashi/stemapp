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
  'esri/lang',
  'jimu/utils',
  'jimu/BaseWidgetSetting',
  './SingleFilterSetting',
  'jimu/LayerInfos/LayerInfos',
  'jimu/dijit/CheckBox',
  'jimu/dijit/LoadingShelter'
],
function(on, query, html, lang, array, declare, _WidgetsInTemplateMixin, esriLang, jimuUtils, BaseWidgetSetting,
  SingleSetting, LayerInfos) {

  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-filter-setting',
    singleSetting: null,
    layerChooserSelect: null,
    layerInfosObj: null,

    postMixInProperties:function(){
      this.jimuNls = window.jimuNls;
      this.layerInfosObj = LayerInfos.getInstanceSync();
      if(this.config){
        this.config = this._getConfigWithValidDataSource(this.config);
      }
      this.noTaskNls = this.nls.noTasksTip;
      this.noTaskNls = esriLang.substitute({newFilter: "<span>" + this.nls.newFilter + "</span>"}, this.noTaskNls);
    },

    _getConfigWithValidDataSource: function(config) {
      var validConfig = {
        collapse: config.collapse,
        zoomto: config.zoomto,
        allowCustom: config.allowCustom,
        filters: []
      };
      validConfig.filters = array.filter(config.filters, lang.hitch(this, function(singleConfig) {
        if (singleConfig.layerId) {
          var layerInfo = this.layerInfosObj.getLayerInfoById(singleConfig.layerId);
          return !!layerInfo;
        } else {
          return true;
        }
      }));
      return validConfig;
    },

    postCreate: function(){
      this.inherited(arguments);
      this.noTaskTip.innerHTML = this.noTaskNls;
      this.zoomtoTip.innerHTML = this.nls.zoomtoTip || "";
      this.allowCustomTip.innerHTML = this.nls.allowCustom || "";
      if(this.config){
        this.setConfig(this.config);
      }
    },

    _onListContentClicked: function(event){
      var target = event.target || event.srcElement;
      var itemDom = jimuUtils.getAncestorDom(target, function(dom){
        return html.hasClass(dom, 'item');
      }, 3);
      if(!itemDom){
        return;
      }
      if(html.hasClass(target, 'action')){
        if(html.hasClass(target, 'up')){
          if(itemDom.previousElementSibling){
            html.place(itemDom, itemDom.previousElementSibling, 'before');
          }
        }else if(html.hasClass(target, 'down')){
          if(itemDom.nextElementSibling){
            html.place(itemDom, itemDom.nextElementSibling, 'after');
          }
        }else if(html.hasClass(target, 'delete')){
          if(this.singleSetting && this.singleSetting.target === itemDom){
            this.singleSetting.destroy();
            this.singleSetting = null;
          }
          html.destroy(itemDom);
          var filterItemDoms = query('.item', this.listContent);
          if(filterItemDoms.length > 0){
            this._createSingleSetting(filterItemDoms[0]);
          }
          this._updateNoQueryTip();
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

    _onBtnAddItemClicked: function(){
      if(this.singleSetting){
        var singleConfig = this.singleSetting.getConfig();
        if(singleConfig){
          this.singleSetting.destroy();
          this.singleSetting = null;
        }else{
          return;
        }
      }

      var target = this._createTarget();
      this._createSingleSetting(target, null);
    },

    _createSingleSetting: function(target){
      query('.item', this.listContent).removeClass('selected');
      if(this.singleSetting){
        this.singleSetting.destroy();
      }
      this.singleSetting = null;
      this.singleSetting = new SingleSetting({
        map: this.map,
        nls: this.nls,
        target: target,
        folderUrl: this.folderUrl,
        layerInfosObj: this.layerInfosObj
      });
      this.singleSetting.placeAt(this.singleSettingContent);
      this.own(on(this.singleSetting, 'loading', lang.hitch(this, function(){
        this.shelter.show();
      })));
      this.own(on(this.singleSetting, 'unloading', lang.hitch(this, function(){
        this.shelter.hide();
      })));
      this.own(on(this.singleSetting, 'before-destroy', lang.hitch(this, function(){
        html.addClass(this.separator, 'not-visible');
      })));
      html.addClass(target, 'selected');
      if(target.singleConfig){
        this.singleSetting.setConfig(target.singleConfig);
      }else{
        setTimeout(lang.hitch(this, function(){
          this.singleSetting.showLayerChooserPopup();
        }), 50);
      }
      html.removeClass(this.separator, 'not-visible');
      html.addClass(this.noTaskTip, 'not-visible');
    },

    _createTarget: function(name){
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

    _updateNoQueryTip: function(){
      var itemDoms = query('.item', this.listContent);
      if (itemDoms.length > 0) {
        html.addClass(this.noTaskTip, 'not-visible');
      } else {
        html.removeClass(this.noTaskTip, 'not-visible');
      }
    },

    setConfig: function(config){
      this.cbxZoomto.setValue(!!config.zoomto);
      this.cbxAllowCustom.setValue(!!config.allowCustom);
      var firstTarget = null;
      array.forEach(config.filters, lang.hitch(this, function(singleConfig, index){
        var target = this._createTarget(singleConfig.name);
        target.singleConfig = singleConfig;
        if(index === 0){
          firstTarget = target;
        }
      }));
      if(firstTarget){
        this._createSingleSetting(firstTarget);
      }
      this._updateNoQueryTip();
    },

    getConfig: function(){
      if(this.singleSetting){
        var singleConfig = this.singleSetting.getConfig();
        if(!singleConfig){
          return false;
        }
      }
      var targets = query('.item', this.listContent);
      var config = {
        zoomto: this.cbxZoomto.getValue(),
        allowCustom: this.cbxAllowCustom.getValue(),
        filters: []
      };
      config.filters = array.map(targets, lang.hitch(this, function(target){
        return target.singleConfig;
      }));
      return config;
    },

    destroy: function(){
      if(this.singleSetting){
        this.singleSetting.destroy();
      }
      this.singleSetting = null;
      this.inherited(arguments);
    }
  });
});