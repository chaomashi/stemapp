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
  'dojo/on',
  'dojo/json',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/_base/Color',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/registry',
  './lib/GridOverlay',
  'jimu/dijit/Message',
  'dojo/i18n!./setting/nls/strings',
  'dojo/text!./GridSetting.html',
  'dijit/form/HorizontalSlider',
  'dijit/form/NumberSpinner',
  'jimu/dijit/ColorPicker',
  'dijit/form/CheckBox'
],
function(
  declare,
  domClass,
  on,
  JSON,
  array,
  lang,
  Color,
  dijitWidgetBase,
  dijitTemplatedMixin,
  dijitWidgetsInTemplate,
  registry,
  GridOverlay,
  Message,
  i18nStrings,
  GridTemplate
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

  return declare([dijitWidgetBase, dijitTemplatedMixin, dijitWidgetsInTemplate], {
    templateString: GridTemplate,
    baseClass: 'grid-overlay-setting',
    verticalLabelsClicked: false,
    horizontalLabelsClicked: false,
    map: null,
    config: null,
    nls: null,
    gridOverlayCtrl: null,

    constructor: function(options) {
      this.map = options.map;
      this.config = options.config;
      this.nls = i18nStrings;
    },

    postCreate: function() {
      this.setConfig(this.config);

      var self = this;
      var grid = new GridOverlay(lang.mixin({map:this.map, enabled: true}, this.config));
      this.gridOverlayCtrl = grid;
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
    },

    startup: function() {
      this.inherited(arguments);
    },

    setConfig: function(origConfig){
      this.config = (origConfig !== undefined) ? origConfig : this._setConfig();

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

      if (this.config.enableGridOnClose) {
        this.cbxShowGrid.set('checked', true);
      } else {
        this.cbxShowGrid.set('checked', false);
      }
    },

    getConfig: function() {
      if (this._checkValidValues()) {
        new Message({
          message: this.nls.errorMessage
        });
        return false;
      } else {
        //WAB will get config object through this method
        this.config = this.gridOverlayCtrl.getSettings();
        this.config.enableGridOnClose = this.cbxShowGrid.getValue();
        return this.config;
      }
    },

    alterToggleSwitch: function() {
      this.checkBoxLabel.innerHTML = this.nls.checkBoxLabelDashboard;
      this.own(
        on(this.cbxShowGrid,'change', lang.hitch(this, function() {
          if(this.cbxShowGrid.checked) {
            this.gridOverlayCtrl.enable();
          } else {
            this.gridOverlayCtrl.disable();
          }
        }))
      );
    },

    _saveConfig: function() {
      window.localStorage.setItem("storedGridSettings", JSON.stringify(this.getConfig()));
    },

    _setConfig: function() {
      var cfg = JSON.parse(window.localStorage.getItem("storedGridSettings"));
      return (cfg !== null) ? cfg : this.config;
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
    }
  });
});