/**
 *  @fileOverview The GridOverlay Settings widget
 *  @author Esri
 *
 *  @todo Add and cleanup the code comments (including JSDoc comments)
 *  @todo Revisit all getters/setters for latest GridOverlay logic
 */

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
  'dojo/dom-class',
  'dojo/dom-style',
  'dojo/query',
  'dojo/_base/array',
  'dojo/promise/all',
  'dojo/Deferred',
  'jimu/BaseWidgetSetting',
  'dojo/_base/lang',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/registry',
  'dojo/_base/Color',
  '../lib/GridOverlay',
  'esri/map',
  'esri/dijit/BasemapGallery',
  'esri/dijit/BasemapLayer',
  'esri/dijit/Basemap',
  'jimu/dijit/Message',
  'jimu/portalUtils',
  'jimu/portalUrlUtils',
  'jimu/utils',
  './utils',
  'dijit/form/HorizontalSlider',
  'dijit/ColorPalette',
  'dijit/form/NumberSpinner',
  'jimu/dijit/ColorPicker',
  'dijit/TitlePane',
  'dijit/layout/ContentPane'
],
function(
  declare,
  domClass,
  domStyle,
  query,
  array,
  all,
  Deferred,
  BaseWidgetSetting,
  lang,
  _WidgetsInTemplateMixin,
  registry,
  Color,
  GridOverlay,
  Map,
  BasemapGallery,
  BasemapLayer,
  Basemap,
  Message,
  portalUtils,
  portalUrlUtils,
  jimuUtils,
  utils
) {

  var setColorText = function(domNode, color) {
    if (!(color instanceof Color)) {
      color = new Color(color);
    }
    var text = color.toHex();
    var textColor = (0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b) > 128 ?
      new Color([0,0,0]) :
      new Color([255,255,255]);
    //var height = domGeometry.position(domNode).h + 'px';
    var style = 'color:' + textColor + ';';
    var domNodeClass = 'grid-overlay-setting-color-picker-text';
    domNode.innerHTML = "<div class='" + domNodeClass + "' style='" +
      style + "'>" + text + "</div>";
  };

  var setDefaultFontSize = function(fontCtrl, gridCtrl, fontIndex, val) {
    if (isNaN(val)) {
      fontCtrl.value = 5;
      fontCtrl.setDisplayedValue(5);
    } else {
      if (val > 4 && val < 73) {
        gridCtrl.setFontSize(fontIndex, val);
      }
    }
  };

  var setDefaultLineWidth = function(lineCtrl, gridCtrl, lineIndex, val) {
    if (isNaN(val)) {
      lineCtrl.value = 1;
      lineCtrl.setDisplayedValue(1);
    } else {
      if (val > 0 && val < 11) {
        gridCtrl.setLineWidth(lineIndex, val);
      }
    }
  };

  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'grid-overlay-setting',
    verticalLabelsClicked: false,
    horizontalLabelsClicked: false,
    basemapDict: null,
    sampmap: null,

    postCreate: function(){
      //the config object is passed in
      this.setConfig(this.config);

      //Set the title for the basemap switcher
      this.switchBasemapBtn.set("title", this.nls.switchBasemap);

      this.sampmap = new Map(this.sampleMap,{
        center: this.map.extent.getCenter(), //Get centroid of the map
        basemap: "topo",
        zoom: this.map.getLevel() //Get map level
      });

      this._getBasemapsConfig().then(lang.hitch(this, function(config) {
        config.map = this.sampmap;
        var basemapGallery = new BasemapGallery(config, this.basemapGalleryWidget);
        basemapGallery.startup();

        basemapGallery.on("selection-change", lang.hitch(this, this._basemapGalleryOnSelectionChanged));
      }));

      var self = this;
      var grid = new GridOverlay(lang.mixin({map:this.sampmap, enabled: true}, this.config));
      this.sampleGrid = grid;
      this.minIntervalSpacing.onChange = lang.hitch(this, function(val) {
        var width = val + 'px';
        this.minIntervalSpacingVal.innerHTML = width;
        // this.minIntervalDisplay.style.width = width;
        grid.setMinIntervalSpacing(val);
      });
      this.lineOpacity.onChange = lang.hitch(this, function(val) {
        this.lineOpacityVal.innerHTML = Math.round(val * 100) + '%';
        grid.setLineOpacity(val);
      });
      this.labelOpacity.onChange = lang.hitch(this, function(val) {
        this.labelOpacityVal.innerHTML = Math.round(val * 100) + '%';
        grid.setLabelOpacity(val);
      });
      this.colorPicker0.onChange = function(val) {
        setColorText(this.domNode, val);
        grid.setColor(0, val.toHex());
      };
      this.colorPicker1.onChange = function(val) {
        setColorText(this.domNode, val);
        grid.setColor(1, val.toHex());
      };
      this.colorPicker2.onChange = function(val) {
        setColorText(this.domNode, val);
        grid.setColor(2, val.toHex());
      };
      this.colorPicker3.onChange = function(val) {
        setColorText(this.domNode, val);
        grid.setColor(3, val.toHex());
      };
      this.colorPicker4.onChange = function(val) {
        setColorText(this.domNode, val);
        grid.setColor(4, val.toHex());
      };
      this.colorPicker5.onChange = function(val) {
        setColorText(this.domNode, val);
        grid.setColor(5, val.toHex());
      };
      this.fontSize0.onChange = function(val) {
        setDefaultFontSize(this, grid, 0, val);
      };
      this.fontSize1.onChange = function(val) {
        setDefaultFontSize(this, grid, 1, val);
      };
      this.fontSize2.onChange = function(val) {
        setDefaultFontSize(this, grid, 2, val);
      };
      this.fontSize3.onChange = function(val) {
        setDefaultFontSize(this, grid, 3, val);
      };
      this.fontSize4.onChange = function(val) {
        setDefaultFontSize(this, grid, 4, val);
      };
      this.fontSize5.onChange = function(val) {
        setDefaultFontSize(this, grid, 5, val);
      };
      this.lineSize0.onChange = function(val) {
        setDefaultLineWidth(this, grid, 0, val);
      };
      this.lineSize1.onChange = function(val) {
        setDefaultLineWidth(this, grid, 1, val);
      };
      this.lineSize2.onChange = function(val) {
        setDefaultLineWidth(this, grid, 2, val);
      };
      this.lineSize3.onChange = function(val) {
        setDefaultLineWidth(this, grid, 3, val);
      };
      this.lineSize4.onChange = function(val) {
        setDefaultLineWidth(this, grid, 4, val);
      };
      this.lineSize5.onChange = function(val) {
        setDefaultLineWidth(this, grid, 5, val);
      };
      this.verticalLabels.onclick = function() {
        self.verticalLabelsClicked = true;
        self.horizontalLabelsClicked = false;
        self._toggleHorzVertOptions(false);
        grid.setVerticalLabels(self.verticalLabelsClicked);
      };
      this.horizontalLabels.onclick = function() {
        self.verticalLabelsClicked = false;
        self.horizontalLabelsClicked = true;
        self._toggleHorzVertOptions(true);
        grid.setVerticalLabels(!self.horizontalLabelsClicked);
      };
      this._addOverflow();
    },

    setConfig: function(){
      this.minIntervalSpacing.set('value', this.config.minIntervalSpacing);
      this.minIntervalSpacingVal.innerHTML = this.config.minIntervalSpacing + 'px';
      // this.minIntervalDisplay.style.width = this.config.minIntervalSpacing + 'px';
      this.lineOpacity.set('value', this.config.lineOpacity);
      this.lineOpacityVal.innerHTML = Math.round(this.config.lineOpacity * 100) + '%';
      this.labelOpacity.set('value', this.config.labelOpacity);
      this.labelOpacityVal.innerHTML = Math.round(this.config.labelOpacity * 100) + '%';

      for (var i = 0; i < 6; i++) {
        this['colorPicker' + i].setColor(new Color(this.config.colors[i]));
        this['colorPicker' + i].picker.setColor(this.config.colors[i]);
        setColorText(this['colorPicker' + i].domNode, this.config.colors[i]);
      }
      this.fontSize0.setValue(this.config.fontSizes[0]);
      this.fontSize1.setValue(this.config.fontSizes[1]);
      this.fontSize2.setValue(this.config.fontSizes[2]);
      this.fontSize3.setValue(this.config.fontSizes[3]);
      this.fontSize4.setValue(this.config.fontSizes[4]);
      this.fontSize5.setValue(this.config.fontSizes[5]);
      this.lineSize0.setValue(this.config.lineWidths[0]);
      this.lineSize1.setValue(this.config.lineWidths[1]);
      this.lineSize2.setValue(this.config.lineWidths[2]);
      this.lineSize3.setValue(this.config.lineWidths[3]);
      this.lineSize4.setValue(this.config.lineWidths[4]);
      this.lineSize5.setValue(this.config.lineWidths[5]);

      this._toggleHorzVertOptions(!this.config.verticalLabels);
    },

    getConfig: function() {
      if (this._checkValidValues()) {
        new Message({
          message: this.nls.errorMessage
        });
        return false;
      } else {
        //WAB will get config object through this method
        this.config = this.sampleGrid.getSettings();
        return this.config;
      }
    },

    _addOverflow: function() {
      var nl = query(".neo", this.domNode);
      if (nl) {
        array.forEach(nl, function(node) {
          domStyle.set(node, "overflow-y", "scroll");
        }, this);
      }
    },

    _checkValidValues: function(){
      var nodes = [this.fontSize0, this.fontSize1, this.fontSize2,
        this.fontSize3, this.fontSize4, this.fontSize5, this.lineSize0,
        this.lineSize1, this.lineSize2, this.lineSize3, this.lineSize4,
        this.lineSize5];
      return array.some(nodes, function(node) {
        var n = registry.byId(node);
        if (n) {
          if(n.value < n.constraints.min || n.value > n.constraints.max) {
            return true;
          }
        }
      }, this);
    },

    _toggleHorzVertOptions: function(isHorizontal) {
      //horizontal
      if (isHorizontal) {
        //Make horizontal div active
        domClass.remove(this.horizontalLabels, "image-labels horizontalLabel");
        domClass.add(this.horizontalLabels, "image-labels horizontalLabelClicked");
        //Make vertical div inactive
        domClass.remove(this.verticalLabels, "image-labels verticalLabelClicked");
        domClass.add(this.verticalLabels, "image-labels verticalLabel");
      } else {
        //Make horizontal div inactive
        domClass.remove(this.horizontalLabels, "image-labels horizontalLabelClicked");
        domClass.add(this.horizontalLabels, "image-labels horizontalLabel");
        //Make vertical div active
        domClass.remove(this.verticalLabels, "image-labels verticalLabel");
        domClass.add(this.verticalLabels, "image-labels verticalLabelClicked");
      }
    },

    _toggleLabelPlacement: function(ctrl, enabled) {
      if (ctrl) {
        var ctrlClass = ctrl.className.replace("image-labels", "").trim();
        if (enabled) {
          //Make ctrl div active
          domClass.remove(ctrl, "image-labels " + ctrlClass);
          domClass.add(ctrl, "image-labels " + ctrlClass + "Clicked");
        } else {
          //Make ctrl div inactive
          var origClassName = ctrlClass.substring(0,ctrlClass.indexOf("Clicked"));
          domClass.remove(ctrl, "image-labels " + ctrlClass);
          domClass.add(ctrl, "image-labels " + origClassName);
        }
      }
    },

    _basemapGalleryOnSelectionChanged: function(selectedBasemap) {
      var initExt = selectedBasemap.target._selectedBasemap.layers[0].initialExtent;
      if (initExt !== undefined) {
        this.sampmap.centerAt(initExt.getCenter());
      }
    },
    _getWebmapBasemap: function() {
      var thumbnailUrl;
      if (this.map.itemInfo.item.thumbnail) {
        thumbnailUrl = portalUrlUtils.getItemUrl(this.appConfig.portalUrl,
                       this.map.itemInfo.item.id) + "/info/" + this.map.itemInfo.item.thumbnail;
      } else {
        thumbnailUrl = null;
      }
      return {
        title: this.map.itemInfo.itemData.baseMap.title,
        thumbnailUrl: thumbnailUrl,
        layers: this.map.itemInfo.itemData.baseMap.baseMapLayers,
        spatialReference: this.map.spatialReference
      };
    },

    _getBasemapsConfig: function() {
      var def = new Deferred();

      var basemapsDef = utils._loadPortalBaseMaps(this.appConfig.portalUrl, this.map);
      var portal = portalUtils.getPortal(this.appConfig.portalUrl);
      var portalSelfDef = portal.loadSelfInfo();
      all({
        'portalSelf': portalSelfDef,
        'basemaps': basemapsDef
      }).then(lang.hitch(this, function(result) {
        var basemaps = result.basemaps;
        var basemapObjs = [];
        var i = 0;
        var webmapBasemap = this._getWebmapBasemap();

        basemaps = array.filter(basemaps, function(basemap) {
          if(!basemap || !basemap.title) {
            return false;
          }
          var bingKeyResult;
          // first, filter bingMaps
          if(!utils.isBingMap(basemap)) {
            // do not have bingKey and basemap is not bingMap.
            bingKeyResult = true;
          } else if(result.portalSelf.bingKey) {
            // has bingKey, can add any bing map or not;
            bingKeyResult = true;
          } else {
            // do not show basemap if do not has bingKey as well as basemap is bingMap.
            bingKeyResult = false;
          }

          // basemap does not have title means basemap load failed.
          return basemap.title && bingKeyResult;
        }, this);

        // if basemap of current webmap is not include, so add it.
        for(i = 0; i < basemaps.length; i++) {
          if (utils.compareSameBasemapByOrder(basemaps[i], webmapBasemap)) {
            break;
          }
        }
        if(i === basemaps.length) {
          basemaps.push(webmapBasemap);
        }

        for (i = 0; i < basemaps.length; i++) {
          var n = basemaps[i].layers.length;
          var layersArray = [];
          for (var j = 0; j < n; j++) {
            layersArray.push(new BasemapLayer(basemaps[i].layers[j]));
          }
          basemaps[i].layers = layersArray;
          if (!basemaps[i].thumbnailUrl) {
            basemaps[i].thumbnailUrl = this.folderUrl + "images/default.jpg";
          } else {
            var reg = /^(https?:)?\/\//;
            if (reg.test(basemaps[i].thumbnailUrl)) {
              basemaps[i].thumbnailUrl = basemaps[i].thumbnailUrl +
                                         utils.getToken(this.appConfig.portalUrl);
            } else {
              basemaps[i].thumbnailUrl =
                jimuUtils.processUrlInWidgetConfig(basemaps[i].thumbnailUrl, this.folderUrl);
            }
          }
          basemapObjs.push(new Basemap(basemaps[i]));
        }

        var config = {
          portalUrl: (this.appConfig.portalUrl) ? this.appConfig.portalUrl : "",
          basemaps: basemapObjs,
          showArcGISBasemaps: false,
          bingMapsKey: result.portalSelf.bingKey
        };
        def.resolve(config);
      }));
      return def.promise;
    }
  });
});
