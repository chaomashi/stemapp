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
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./SpatialFilterConfig.html',
  'dojo/on',
  'dojo/query',
  'dojo/_base/lang',
  'dojo/_base/html',
  'dojo/_base/array',
  './SearchDistance',
  './RelationshipsSelector',
  'jimu/utils',
  'jimu/dijit/Popup',
  'jimu/dijit/CheckBox'
],
function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, query, lang,
  html, array, SearchDistance, RelationshipsSelector, jimuUtils, Popup, CheckBox) {

  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-query-setting-spatialfilter-config',
    templateString: template,
    _allRelationshipInfos: null,

    //options:
    nls: null,
    config:null,//{currentMapExtent, drawing, useFeatures, fullLayerExtent}

    //methods:
    //setConfig
    //getConfig
    //reset

    postCreate: function(){
      this.inherited(arguments);
      this._allRelationshipInfos = [{
        'relationship': 'SPATIAL_REL_WITHIN',
        'nls': this.nls.contain,
        'label': this.nls.contain
      }, {
        'relationship': 'SPATIAL_REL_CROSSES',
        'nls': this.nls.cross,
        'label': this.nls.cross
      }, {
        'relationship': 'SPATIAL_REL_ENVELOPEINTERSECTS',
        'nls': this.nls.envelopeIntersect,
        'label': this.nls.envelopeIntersect
      }, {
        'relationship': 'SPATIAL_REL_INDEXINTERSECTS',
        'nls': this.nls.indexIntersect,
        'label': this.nls.indexIntersect
      }, {
        'relationship': 'SPATIAL_REL_INTERSECTS',
        'nls': this.nls.intersect,
        'label': this.nls.intersect
      }, {
        'relationship': 'SPATIAL_REL_OVERLAPS',
        'nls': this.nls.overlap,
        'label': this.nls.overlap
      }, {
        'relationship': 'SPATIAL_REL_TOUCHES',
        'nls': this.nls.touch,
        'label': this.nls.touch
      }, {
        'relationship': 'SPATIAL_REL_CONTAINS',
        'nls': this.nls.within,
        'label': this.nls.within
      }];

      this._initSelf();
      this.reset();
      if(this.config){
        this.setConfig(this.config);
      }
    },

    setConfig:function(config){
      this.reset();

      this.config = lang.clone(config);

      //set currentMapExtent
      if(this.config.currentMapExtent){
        this.cbxMapExtent.check();
        if(this.config.currentMapExtent["default"]){
          this._makeDefaultItem(this.mapExtentSection);
        }else{
          this._makeNotDefaultItem(this.mapExtentSection);
        }
      }else{
        this.cbxMapExtent.uncheck();
      }

      //set drawing
      if(this.config.drawing){
        this.cbxDrawGraphic.check();
        if(this.config.drawing["default"]){
          this._makeDefaultItem(this.drawGraphicSection);
        }else{
          this._makeNotDefaultItem(this.drawGraphicSection);
        }
        this._selectDrawingTools(this.config.drawing.geometryTypes);
        if(this.config.drawing.buffer){
          this.cbxDrawBufferSetting.check();
          this.drawingSearchDistance.setConfig(this.config.drawing.buffer);
        }else{
          this.cbxDrawBufferSetting.uncheck();
        }
      }else{
        this.cbxDrawGraphic.uncheck();
      }

      //set useFeatures
      if(this.config.useFeatures){
        this.cbxUseFeatures.check();
        if(this.config.useFeatures["default"]){
          this._makeDefaultItem(this.useFeaturesSection);
        }else{
          this._makeNotDefaultItem(this.useFeaturesSection);
        }
        this._setRelationshipsForTextBox(this.config.useFeatures.relationships);
        if(this.config.useFeatures.buffer){
          this.cbxFeatureBufferSetting.check();
          this.featuresSearchDistance.setConfig(this.config.useFeatures.buffer);
        }else{
          this.cbxFeatureBufferSetting.uncheck();
        }
      }else{
        this.cbxUseFeatures.uncheck();
      }

      //set fullLayerExtent
      if(this.config.fullLayerExtent){
        this.cbxLayerExtent.check();
        if(this.config.fullLayerExtent["default"]){
          this._makeDefaultItem(this.layerExtentSection);
        }else{
          this._makeNotDefaultItem(this.layerExtentSection);
        }
      }else{
        this.cbxLayerExtent.uncheck();
      }

      var cbxes = [this.cbxMapExtent, this.cbxDrawGraphic, this.cbxUseFeatures, this.cbxLayerExtent];
      array.forEach(cbxes, lang.hitch(this, function(cbx){
        if(cbx.labelNode){
          html.addClass(cbx.labelNode, 'light-stress');
        }
      }));

      //hide setting
      this._hideDrawGraphicSettting();
      this._hideFeaturesSetting();
    },

    getConfig: function(){
      var config = {
        currentMapExtent: null,
        drawing: null,
        useFeatures: null,
        fullLayerExtent: null
      };

      if(this.cbxMapExtent.getValue()){
        config.currentMapExtent = {
          "default": this._isDefaultItem(this.mapExtentSection)
        };
      }

      if(this.cbxDrawGraphic.getValue()){
        config.drawing = {
          "default": false,
          "geometryTypes": [],
          "buffer": null//{defaultDistance,defaultUnit}
        };
        config.drawing["default"] = this._isDefaultItem(this.drawGraphicSection);
        config.drawing.geometryTypes = this._getSelectedDrawingTools();
        if(this.cbxDrawBufferSetting.getValue()){
          var searchDistanceForDrawing = this.drawingSearchDistance.getConfig();
          if(!searchDistanceForDrawing){
            return;
          }
          config.drawing.buffer = searchDistanceForDrawing;
        }
      }

      if(this.cbxUseFeatures.getValue()){
        config.useFeatures = {
          "default": false,
          "relationships": [],
          "buffer": null//{defaultDistance,defaultUnit}
        };
        config.useFeatures['default'] = this._isDefaultItem(this.useFeaturesSection);
        //[{relationship,label}]
        config.useFeatures.relationships = this._getRelationshipsFromTextBox();
        if(this.cbxFeatureBufferSetting.getValue()){
          var searchDistanceForFeatures = this.featuresSearchDistance.getConfig();
          if(!searchDistanceForFeatures){
            return;
          }
          config.useFeatures.buffer = searchDistanceForFeatures;
        }
      }

      if(this.cbxLayerExtent.getValue()){
        config.fullLayerExtent = {
          "default": this._isDefaultItem(this.layerExtentSection)
        };
      }

      return config;
    },

    reset: function(){
      //reset map extent option
      this.cbxMapExtent.uncheck();

      //reset drawing option
      this.cbxDrawGraphic.uncheck();
      this._selectDrawingTools(['POINT', 'POLYLINE', 'EXTENT']);
      this.drawingSearchDistance.reset();
      this._hideDrawGraphicSettting();

      //reset features option
      this.cbxUseFeatures.uncheck();
      this._resetToDefaultRelationshipForTextBox();
      this.featuresSearchDistance.reset();
      this._hideFeaturesSetting();

      //reset whole layer option
      this.cbxLayerExtent.uncheck();
    },

    _initSelf: function(){
      //init checkboxes for spatial filter
      this.cbxMapExtent = new CheckBox({
        label: this.nls.useCurrentExtentTip,
        onChange: lang.hitch(this, function(){
          this._onCbxChanged(this.cbxMapExtent, this.mapExtentSection);
        })
      });
      this.cbxMapExtent.placeAt(this.cbxMapExtentDiv);

      this.cbxDrawGraphic = new CheckBox({
        label: this.nls.useDrawGraphicTip,
        onChange: lang.hitch(this, function(checked){
          if(checked){
            this._showDrawGraphicSettting();
          }else{
            this._hideDrawGraphicSettting();
          }
          this._onCbxChanged(this.cbxDrawGraphic, this.drawGraphicSection);
        })
      });
      this.cbxDrawGraphic.placeAt(this.cbxDrawGraphicDiv);

      this.cbxUseFeatures = new CheckBox({
        label: this.nls.useFeaturesTip,
        onChange: lang.hitch(this, function(checked){
          if(checked){
            this._showFeaturesSetting();
          }else{
            this._hideFeaturesSetting();
          }
          this._onCbxChanged(this.cbxUseFeatures, this.useFeaturesSection);
        })
      });
      this.cbxUseFeatures.placeAt(this.cbxUseFeaturesDiv);

      this.cbxLayerExtent = new CheckBox({
        label: this.nls.noSpatialLimitTip,
        onChange: lang.hitch(this, function(){
          this._onCbxChanged(this.cbxLayerExtent, this.layerExtentSection);
        })
      });
      this.cbxLayerExtent.placeAt(this.cbxLayerExtentDiv);

      //init SearchDistance for drawing
      this.drawingSearchDistance = new SearchDistance({
        nls: this.nls
      });
      this.drawingSearchDistance.placeAt(this.drawingSearchDistanceDiv);

      this.cbxDrawBufferSetting = new CheckBox({
        label: this.nls.bufferSettings
      });
      html.addClass(this.cbxDrawBufferSetting.domNode, 'buffer-checkbox');
      this.own(on(this.cbxDrawBufferSetting, 'change', lang.hitch(this, function(){
        if(this.cbxDrawBufferSetting.getValue()){
          this.drawingSearchDistance.enable();
        }else{
          this.drawingSearchDistance.disable();
        }
      })));
      this.cbxDrawBufferSetting.placeAt(this.drawBufferSettingCbxDiv);

      //init SearchDistance for features
      this.featuresSearchDistance = new SearchDistance({
        nls: this.nls
      });
      this.featuresSearchDistance.placeAt(this.featuresSearchDistanceDiv);

      this.cbxFeatureBufferSetting = new CheckBox({
        label: this.nls.bufferSettings
      });
      html.addClass(this.cbxFeatureBufferSetting.domNode, 'buffer-checkbox');
      this.own(on(this.cbxFeatureBufferSetting, 'change', lang.hitch(this, function(){
        if(this.cbxFeatureBufferSetting.getValue()){
          this.featuresSearchDistance.enable();
        }else{
          this.featuresSearchDistance.disable();
        }
      })));
      this.cbxFeatureBufferSetting.placeAt(this.featureBufferSettingCbxDiv);
    },

    /*---------------------------default item----------------------------------------*/

    _onCbxChanged: function(cbx, spatialFilterItemDom){
      if(cbx.getValue()){
        var enabledDefaultItems = query('.spatial-filter-item.default', this.domNode);
        if(enabledDefaultItems.length === 0){
          this._makeDefaultItem(spatialFilterItemDom);
        }
      }else{
        this._makeNotDefaultItem(spatialFilterItemDom);
      }
    },

    _onBtnMakeDefaultClicked: function(event){
      var btnMakeDefault = event.target || event.srcElement;

      var spatialFilterItemDom = jimuUtils.getAncestorDom(btnMakeDefault, lang.hitch(this, function(dom){
        return html.hasClass(dom, "spatial-filter-item");
      }), this.domNode);

      if(!spatialFilterItemDom){
        return;
      }

      var cbx = this._getCbxBySpatialFiterItemDom(spatialFilterItemDom);

      if(cbx){
        if(cbx.getValue()){
          this._makeDefaultItem(spatialFilterItemDom);
        }else{
          this._makeNotDefaultItem(spatialFilterItemDom);
        }
      }
    },

    _isDefaultItem: function(spatialFilterItemDom){
      return html.hasClass(spatialFilterItemDom, 'default');
    },

    _makeDefaultItem: function(spatialFilterItemDom){
      var cbx = this._getCbxBySpatialFiterItemDom(spatialFilterItemDom);

      if(cbx && cbx.getValue()){
        query('.spatial-filter-item', this.domNode).removeClass('default');
        html.addClass(spatialFilterItemDom, 'default');
      }
    },

    _makeNotDefaultItem: function(spatialFilterItemDom){
      var itemsAndCbxes = [{
        spatialFilterItemDom: this.mapExtentSection,
        cbx: this.cbxMapExtent
      }, {
        spatialFilterItemDom: this.drawGraphicSection,
        cbx: this.cbxDrawGraphic
      }, {
        spatialFilterItemDom: this.useFeaturesSection,
        cbx: this.cbxUseFeatures
      }, {
        spatialFilterItemDom: this.layerExtentSection,
        cbx: this.cbxLayerExtent
      }];

      var checkedItemsAndCbxes = array.filter(itemsAndCbxes, function(item){
        return item.cbx.getValue();
      });

      if(checkedItemsAndCbxes.length === 0){
        query('.spatial-filter-item', this.domNode).removeClass('default');
      }else if(checkedItemsAndCbxes.length === 1){
        //only one cbx is checked, so we should keep it default
        this._makeDefaultItem(checkedItemsAndCbxes[0].spatialFilterItemDom);
      }else if(checkedItemsAndCbxes.length >= 2){
        var otherCheckedItemsAndCbxes = array.filter(checkedItemsAndCbxes, function(item){
          return item.spatialFilterItemDom !== spatialFilterItemDom;
        });
        //check if one spatialFilterItemDom is default in checkedItemsAndCbxes
        var isExistEnabled = array.some(otherCheckedItemsAndCbxes, function(item){
          return html.hasClass(item.spatialFilterItemDom, 'default');
        });
        if(!isExistEnabled){
          var firstOtherItemAndCbx = otherCheckedItemsAndCbxes[0];
          this._makeDefaultItem(firstOtherItemAndCbx.spatialFilterItemDom);
        }
      }
    },

    _getCbxBySpatialFiterItemDom: function(spatialFilterItemDom){
      var cbx = null;

      if(spatialFilterItemDom === this.mapExtentSection){
        cbx = this.cbxMapExtent;
      }else if(spatialFilterItemDom === this.drawGraphicSection){
        cbx = this.cbxDrawGraphic;
      }else if(spatialFilterItemDom === this.useFeaturesSection){
        cbx = this.cbxUseFeatures;
      }else if(spatialFilterItemDom === this.layerExtentSection){
        cbx = this.cbxLayerExtent;
      }

      return cbx;
    },


    /*---------------------------arrow icon----------------------------------------*/
    _onDrawGraphicArrowIconClicked: function(){
      if(html.hasClass(this.drawGraphicSettting, 'hidden-setting')){
        this._showDrawGraphicSettting();
      }else{
        this._hideDrawGraphicSettting();
      }
    },

    _showDrawGraphicSettting: function(){
      html.removeClass(this.drawGraphicSettting, 'hidden-setting');
      this._updateDrawGraphicArrowIcon();
      html.addClass(this.featuresSetting, 'hidden-setting');
      this._updateFeaturesArrowIcon();
    },

    _hideDrawGraphicSettting: function(){
      html.addClass(this.drawGraphicSettting, 'hidden-setting');
      this._updateDrawGraphicArrowIcon();
    },

    _updateDrawGraphicArrowIcon: function(){
      if(html.hasClass(this.drawGraphicSettting, 'hidden-setting')){
        html.removeClass(this.arrowIconDrawGraphic, 'opened');
      }else{
        html.addClass(this.arrowIconDrawGraphic, 'opened');
      }
    },

    _onFeaturesArrowIconClicked: function(){
      if(html.hasClass(this.featuresSetting, 'hidden-setting')){
        this._showFeaturesSetting();
      }else{
        this._hideFeaturesSetting();
      }
    },

    _showFeaturesSetting: function(){
      html.addClass(this.drawGraphicSettting, 'hidden-setting');
      this._updateDrawGraphicArrowIcon();
      html.removeClass(this.featuresSetting, 'hidden-setting');
      this._updateFeaturesArrowIcon();
    },

    _hideFeaturesSetting: function(){
      html.addClass(this.featuresSetting, 'hidden-setting');
      this._updateFeaturesArrowIcon();
    },

    _updateFeaturesArrowIcon: function(){
      if(html.hasClass(this.featuresSetting, 'hidden-setting')){
        html.removeClass(this.arrowIconFeatures, 'opened');
      }else{
        html.addClass(this.arrowIconFeatures, 'opened');
      }
    },

    /*-------------------------drawing tool--------------------------------*/
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
    },

    /*--------------------------Relationships------------------------------------*/
    _onBtnRelationshipClicked: function(){
      var relationships = this._getRelationshipsFromTextBox();
      var relationshipsSelector = new RelationshipsSelector({
        nls: this.nls,
        allRelationshipInfos: lang.clone(this._allRelationshipInfos)
      });
      var popup = new Popup({
        width: 640,
        height: 405,
        titleLabel: this.nls.setSpatialRelationships,
        content: relationshipsSelector,
        onClose: lang.hitch(this, function(){
          relationshipsSelector.destroy();
          relationshipsSelector = null;
        }),
        buttons: [{
          label: this.nls.ok,
          onClick: lang.hitch(this, function(){
            var newRelationships = relationshipsSelector.getSelectedRelationships();
            this._setRelationshipsForTextBox(newRelationships);
            popup.close();
          })
        }, {
          label: this.nls.cancel,
          onClick: lang.hitch(this, function(){
            popup.close();
          })
        }]
      });
      relationshipsSelector.setSelectedRelationshipInfos(relationships);
    },

    _resetToDefaultRelationshipForTextBox: function(){
      this._setRelationshipsForTextBox([{
        'relationship': 'SPATIAL_REL_INTERSECTS',
        'label': this.nls.intersect
      }]);
    },

    //[{relationship,label}]
    _setRelationshipsForTextBox: function(relationshipInfos){
      this.relationshipTextBox.relationships = lang.clone(relationshipInfos);
      var labels = array.map(relationshipInfos, function(item){
        return item.label;
      });
      var strLabels = labels.join("; ");
      this.relationshipTextBox.set('value', strLabels);
      this.relationshipTextBox.domNode.title = strLabels;
    },

    //[{relationship,label}]
    _getRelationshipsFromTextBox: function(){
      var relationships = [];
      if(this.relationshipTextBox.relationships){
        relationships = array.map(this.relationshipTextBox.relationships, function(item){
          return {
            relationship: item.relationship,
            label: item.label
          };
        });
      }
      return relationships;
    }

  });
});