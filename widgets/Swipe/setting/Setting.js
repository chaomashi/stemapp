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
  'jimu/BaseWidgetSetting',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/registry',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/on',
  'dojo/query',
  'dojo/_base/html',
  'dojo/Deferred',
  '../utils',
  'jimu/LayerInfos/LayerInfos',
  'jimu/dijit/LoadingShelter',
  "jimu/dijit/LayerChooserFromMapLite",
  'jimu/dijit/CheckBox',
  'jimu/dijit/RadioBtn',
  'dijit/form/Select',
  "jimu/dijit/ColorPickerButton"
], function (
  declare, BaseWidgetSetting, _WidgetsInTemplateMixin, registry,
  lang, array, on, query, html, Deferred, utils,
  LayerInfos, LoadingShelter, LayerChooserFromMapLite, CheckBox) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-swipe-setting',
    _selectedStyle: "",

    postCreate: function () {
      this.own(on(this.verticalNode, 'click', lang.hitch(this, function () {
        this._selectItem('vertical');
      })));
      this.own(on(this.horizontalNode, 'click', lang.hitch(this, function () {
        this._selectItem('horizontal');
      })));
      this.own(on(this.scopeNode, 'click', lang.hitch(this, function () {
        this._selectItem('scope');
      })));

      this.shelter = new LoadingShelter({
        hidden: true
      });
      this.shelter.placeAt(this.domNode);
      this.shelter.startup();

      //update swipeLayers
      this.shelter.show();
      this._getLayerInfoObj(this.map).then(lang.hitch(this, function () {
        this._setDefaultLayerByState(this.config.layerState);
      }), function (err) {
        console.log(err);
      }).always(lang.hitch(this, function () {
        this.shelter.hide();
      }));

      this.own(on(this.swipeLayers, 'change', lang.hitch(this, function (value) {
        this.config.layer = value;
      })));

      this.isZoomCheckBox = new CheckBox({
        label: this.nls.isZoom,
        checked: false
      }, this.isZoomNode);
    },

    startup: function () {
      this.inherited(arguments);
      this.setConfig(this.config);
    },
    getConfig: function () {
      //check error
      // if(this._checkIsError()){
      //   return false;
      // }

      this.config.style = this._selectedStyle;
      this.config.layer = this.swipeLayers.get('value');

      this.config.isZoom = this.isZoomCheckBox.getValue();

      this.config.layerState = this._layerChooserFromMap.getState();
      //TODO save +title

      this.config.handleColor = this.colorPicker.getColor().toHex();

      return this.config;
    },
    setConfig: function (config) {
      this.config = config;
      if (this.config.style) {
        this._selectItem(this.config.style);
      } else {
        this._selectItem('vertical');
      }

      //layers to swipe(no set method so create it in setConfig)
      if (!this._layerChooserFromMap) {
        //filter for LayerChooserFromMap
        var filter = function (layerInfo) {
          var def = new Deferred();

          var webmapLayerInfoArray = LayerInfos.getInstanceSync().getLayerInfoArrayOfWebmap();
          var isWebmapLayerInfo = array.some(webmapLayerInfoArray, function(webmapLayerInfo) {
            if(webmapLayerInfo.id === layerInfo.id) {
              return true;
            }
          }, this);

          if (!isWebmapLayerInfo) {
            def.resolve(false);
          } else if (layerInfo.isRootLayer()) {
            def.resolve(true);
          } else {
            var layerInTheMap = this.map.getLayer(layerInfo.id);
            if (layerInTheMap) {
              def.resolve(true);
            } else {
              def.resolve(false);
            }
          }
          return def;
        };

        this._layerChooserFromMap = new LayerChooserFromMapLite({
          showTables: false,
          onlyShowWebMapLayers: true,//hide layers that runtime added
          customFilter: lang.hitch(this, filter),
          layerState: this.config.layerState
        });
        this._layerChooserFromMap.placeAt(this.layersChooser);
        this._layerChooserFromMap.startup();

        //hide collapseIcon of MapServiceLayer
        array.forEach(this._layerInfosObj.getLayerInfoArray(), function (layerInfo) {
          if (layerInfo && layerInfo.layerObject && layerInfo.layerObject.declaredClass &&
            (layerInfo.layerObject.declaredClass === "esri.layers.ArcGISDynamicMapServiceLayer" ||
              layerInfo.layerObject.declaredClass === "esri.layers.ArcGISTiledMapServiceLayer" ||
              layerInfo.layerObject.declaredClass === "esri.layers.FeatureCollection")) {
            var domNodes = this._layerChooserFromMap.getLayerAssociateDomNodesById(layerInfo.id);
            if (domNodes) {
              var collapseIcon = domNodes.collapseIcon;
              html.addClass(collapseIcon, "transparent");
            }
          }
        }, this);

        this.own(on(this._layerChooserFromMap, 'tree-click', lang.hitch(this, function () {
          var layerOptions = this._layerChooserFromMap.getState();
          this._setDefaultLayerByState(layerOptions);

          if (this._isLayersChooserStateEmpty()) {//set error info, when no selected
            this.swipeLayers.set('options', [{ value: "", label: "" }]);
            this.swipeLayers.reset();
          }
        })));
      }

      //default layerlayer
      var st = this._getOptionsFromState(this.config.layerState);
      if (this._isSelectedLayerInOptions(st)) {
        this.swipeLayers.set('value', this.config.layer);//select one
      } else {
        //do nothing
      }

      //isZoom
      if (true === this.config.isZoom) {
        this.isZoomCheckBox.setValue(true);
      } else {
        this.isZoomCheckBox.setValue(false);
      }

      if (!this.config.handleColor){
        this.colorPicker.setColor(utils.processColor());
      }else{
        this.colorPicker.setColor(utils.processColor(this.config.handleColor));
      }
    },

    //0. init
    _getLayerInfoObj: function (map) {
      return LayerInfos.getInstance(map, map.itemInfo)
        .then(lang.hitch(this, function (layerInfosObj) {
          this._layerInfosObj = layerInfosObj;

          var infos = this._layerInfosObj.getLayerInfoArray();
          var data = array.filter(infos, lang.hitch(this, function (info) {
            if (!this._isNewAddedLayer(info)) {
              return true;
            }
          }));
          var options = array.map(data, function (info) {
            return {
              label: info.title,
              value: info.id
            };
          });

          this.swipeLayers.set('options', options);//set all layers in options, when init
        }));
    },
    //1.swipe mode
    _selectItem: function (style) {
      var _selectedNode = null;
      var _layerText = "";
      if (style === 'scope') {
        _selectedNode = this.scopeNode;
        _layerText = this.nls.spyglassText;

        html.addClass(this.handlerColorPicker, "hide");
      } else if (style === 'horizontal') {
        _selectedNode = this.horizontalNode;
        _layerText = this.nls.layerText;

        html.removeClass(this.handlerColorPicker, "hide");
      } else {
        _selectedNode = this.verticalNode;
        _layerText = this.nls.layerText;

        html.removeClass(this.handlerColorPicker, "hide");
      }
      this.layerTextNode.innerHTML = _layerText;
      var _radio = registry.byNode(query('.jimu-radio', _selectedNode)[0]);
      _radio.check(true);

      this._selectedStyle = style;
    },
    //2.layer chooser
    _isSelectedLayerInOptions: function (layers) {
      var layerId = this.config.layer || this.swipeLayers.getValue();//""==this.config.layer, when new widget
      for (var i = 0, len = layers.length; i < len; i++) {
        var item = layers[i];
        if (item.value === layerId) {
          return true;
        }
      }
      return false;
    },
    //3.default layer
    _setDefaultLayerByState: function (state) {
      if ("undefined" === typeof state || null === state) {
        return;
      }

      var layers = this._getOptionsFromState(state);

      this.swipeLayers.set('options', layers);
      if (!this._isSelectedLayerInOptions(layers) || //change selected option
        0 === layers.length) { //no layers choose
        this.swipeLayers.reset();//reset all options
      } else {
        this.swipeLayers.setValue(this.config.layer || this.swipeLayers.getValue());//just change other options
      }
    },
    _getOptionsFromState: function (layerOptions) {
      var layers = [];
      //layers = this.swipeLayers.getOptions();//TODO
      if (!layerOptions) {
        return layers;
      }

      for (var key in layerOptions) {
        if (layerOptions.hasOwnProperty(key)) {
          var layer = layerOptions[key];
          if (true === layer.selected) {
            var layerInfo = this._layerInfosObj.getLayerInfoById(key);
            if (layerInfo && !this._isNewAddedLayer(layerInfo)) {
              var title = layerInfo.title;
              if (title) {
                layers.push({ value: key, label: title });
              }
            }
          }
        }
      }

      return layers;
    },
    _isNewAddedLayer: function (layerInfo) {
      var webmapLayerInfoArray = this._layerInfosObj.getLayerInfoArrayOfWebmap();
      for (var i = 0, len = webmapLayerInfoArray.length; i < len; i++) {
        var webmapLayerInfo = webmapLayerInfoArray[i];
        if (webmapLayerInfo.id === layerInfo.id) {
          return false;
        }
      }

      return true;
    },
    /*
    //4.display errors
    _checkIsError: function(){
      if(this._isLayersChooserStateEmpty()){
        this._setError();
        return true;
      }

      this._cleanError();
      return false;
    },*/
    _isLayersChooserStateEmpty: function() {
      var layers = this._getOptionsFromState(this._layerChooserFromMap.getState());
      if(0 === layers.length){
        return true;
      }

      return false;
    }/*,
    _setError: function(){
      //html.removeClass(this.layersChooserError,"hide");
      html.addClass(this.layersChooser, "error");
    },
    _cleanError: function(){
      //html.addClass(this.layersChooserError,"hide");
      html.removeClass(this.layersChooser, "error");
    }*/
  });
});
