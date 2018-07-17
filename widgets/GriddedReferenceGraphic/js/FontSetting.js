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
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/on",
  "dojo/_base/html",
  "dojo/_base/array",
  "dojo/Evented",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!../templates/FontSetting.html",
  "jimu/dijit/ColorPickerPopup",
  "dijit/form/HorizontalSlider",
  "./TransparencyEditor",
  "dojo/store/Memory",
  "dijit/form/ComboBox",
  "jimu/dijit/CheckBox",
  "jimu/dijit/ImageChooser"
],
  function (declare, lang, on, html, array,
    Evented, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template,
    ColorPickerPopup, HorizontalSlider, TransparencyEditor, Memory) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      templateString: template,
      nls: null,
      _FONTS: null,
      _MIN_TEXT_SIZE: 12,
      _MAX_TEXT_SIZE: 48,
      _INTERVAL_TEXT_SIZE: 2,

      _DEFAULT_CONFIG: null,

      postCreate: function () {
        this.inherited(arguments);
        this._FONTS =
          "Arial;Comic Sans MS;Courier New;Garamond;Tahoma;Times New Roman;Verdana".split(";");
        this._DEFAULT_CONFIG = {
          font: {
            fontFamily: this._FONTS[0],//first one
            bold: false,
            italic: false,
            underline: false
          },
          fontSize: "24",
          textColor: "#282828",
          haloSize: 1,
          haloColor: "#FFFFFF",
          haloOn: true,
          labelTransparency: 1
        };
        this.config = lang.mixin(lang.clone(this._DEFAULT_CONFIG), this.config);

        //font
        array.forEach(this._FONTS, lang.hitch(this, function (font) {
          this.fontSelect.addOption({ value: font, label: font });
        }));
        //text size
        var textSizeStore = new Memory({});
        for (var i = this._MIN_TEXT_SIZE, max = this._MAX_TEXT_SIZE;
          i <= max; i += this._INTERVAL_TEXT_SIZE) {
          textSizeStore.put({ id: i, name: i });
        }
        this.textSizeSelect.store = textSizeStore;
        this.textSizeSelect.validator = lang.hitch(this, function () {
          var s = this.textSizeSelect.getValue();
          if (s !== null && s !== "") {
            return !isNaN(s);
          }
          return false;
        });
        this.textSizeSlider = new HorizontalSlider({
          name: "slider",
          value: 0,
          minimum: this._MIN_TEXT_SIZE,
          maximum: this._MAX_TEXT_SIZE,
          discreteValues: this.textSizeSelect.store.data.length + 1,
          intermediateChanges: true,
          showButtons: false,
          style: "display: inline-block;"
        }, this.sliderBar);
        this.textSizeSlider.startup();
        //.textColor
        this.textColorPicker = new ColorPickerPopup({
          appearance: {
            showTransparent: false,
            showColorPalette: true,
            showCoustom: true,
            showCoustomRecord: true
          },
          recordUID: this.recordUID
        });
        this.textColorPicker.placeAt(this.textColorBtn);
        this.textColorPicker.startup();

        //transparency
        this.labelTransparency = new TransparencyEditor({}, this.transparencySlider);
        this.labelTransparency.startup();

        //halo
        //halo size
        var haloSizeStore = new Memory({});
        for (i = 1, max = 10; i <= max; i += 1) {
          haloSizeStore.put({ id: i, name: i });
        }
        this.haloSizeSelect.store = haloSizeStore;
        this.haloSizeSelect.validator = lang.hitch(this, function () {
          var s = this.haloSizeSelect.getValue();
          if (s !== null && s !== "") {
            return !isNaN(s);
          }
          return false;
        });

        //halo color picker
        this.haloColorPicker = new ColorPickerPopup({
          appearance: {
            showTransparent: false,
            showColorPalette: true,
            showCoustom: true,
            showCoustomRecord: true
          }
        });
        this.haloColorPicker.placeAt(this.haloColorBtn);
        this.haloColorPicker.startup();

        //font
        this.own(on(this.fontSelect, "change", lang.hitch(this, function (value) {
          if(this.config.font.fontFamily === value){
            return;
          }
          this.onSettingChange({
            font: {
              fontFamily: value,
              bold: this.config.font.bold,
              italic: this.config.font.italic,
              underline: this.config.font.underline
            }
          });
        })));
        this._initAppearance();
        this.own(on(this.bold, "click", lang.hitch(this, function (/*value*/) {
          var isClick = !html.hasClass(this.bold, "selected");
          this.fontBtnClickd({ bold: isClick });
          this.onSettingChange({
            font: {
              fontFamily: this.config.font.fontFamily,
              bold: isClick,
              italic: this.config.font.italic,
              underline: this.config.font.underline
            }
          });
        })));
        this.own(on(this.italic, "click", lang.hitch(this, function (/*value*/) {
          var isClick = !html.hasClass(this.italic, "selected");
          this.fontBtnClickd({ italic: isClick });
          this.onSettingChange({
            font: {
              fontFamily: this.config.font.fontFamily,
              bold: this.config.font.bold,
              italic: isClick,
              underline: this.config.font.underline
            }
          });
        })));
        this.own(on(this.underline, "click", lang.hitch(this, function (/*value*/) {
          var isClick = !html.hasClass(this.underline, "selected");
          this.fontBtnClickd({ underline: isClick });
          this.onSettingChange({
            font: {
              fontFamily: this.config.font.fontFamily,
              bold: this.config.font.bold,
              italic: this.config.font.italic,
              underline: isClick
            }
          });
        })));
        //text size
        this.own(on(this.textSizeSelect, "change", lang.hitch(this, function (value) {
          if(this.config.fontSize === value || false === this.textSizeSelect.isValid()){
            return;
          }
          this.setTextSize(value);
          this.onSettingChange({
            fontSize: value
          });
        })));
        this.own(on(this.textSizeSlider, "change", lang.hitch(this, function (value) {
          if(this.config.fontSize === value){
            return;
          }
          this.setTextSize(value);
          this.onSettingChange({
            fontSize: value
          });
        })));
        //.textColor
        this.own(on(this.textColorPicker, "change", lang.hitch(this, function (color) {
          if(this.config.textColor === color){
            return;
          }
          this.onSettingChange({
            textColor: color.toHex()
          });
        })));
        //transparency slider
        this.own(this.labelTransparency.watch("transparency", lang.hitch(this, function () {
          this.onSettingChange({
            labelTransparency: this.labelTransparency.getValues().transparency
          });
        })));
        //halo size
        this.own(on(this.haloSizeSelect, "change", lang.hitch(this, function (value) {
          if(this.config.haloSize === value || false === this.haloSizeSelect.isValid()){
            return;
          }
          this.onSettingChange({
            haloSize: value
          });
        })));
        //.haloColor
        this.own(on(this.haloColorPicker, "change", lang.hitch(this, function (color) {
          if(this.config.haloColor === color){
            return;
          }
          this.onSettingChange({
            haloColor: color.toHex()
          });
        })));
        //halo toggle switch
        this.own(on(this.showHalo, "change", lang.hitch(this, function () {
          this.onSettingChange({
            haloOn: this.showHalo.checked
          });
        })));
      },
      startup: function () {
        this.inherited(arguments);
        this.setConfig(this.config);
        this.refresh();
        //add titles
        // var labels = html.query(".setting-items .label", this.domNode);
        // array.forEach(labels, lang.hitch(this, function (label) {
        //   html.setAttr(label, "title", html.getAttr(label, "innerHTML"));
        // }));
      },

      onSettingChange: function (configObj) {
        this.config = lang.mixin(this.config, configObj);
        this.onChange(this.config);
      },
      onChange: function (config) {
        this.emit("change", config);
      },
      refresh: function () {
        this.onSettingChange({});
      },
      isValid: function () {
        if (false === this.textSizeSelect.isValid()) {
          return false;
        }

        return true;
      },
      getConfig: function () {
        if (this.isValid()) {
          return this.config;
        } else {
          return false;
        }
      },

      setConfig: function (configObj) {
        if ("undefined" === configObj) {
          return;
        }

        if ("undefined" !== typeof configObj.font) {
          this.config.font = configObj.font;
          if (this.config.font.fontFamily) {
            this.fontSelect.set("value", this.config.font.fontFamily);
          }
          this.fontBtnClickd(this.config.font);
        }
        if ("undefined" !== typeof configObj.fontSize) {
          this.config.fontSize = configObj.fontSize;
          this.setTextSize(this.config.fontSize);
        }
        if ("undefined" === typeof configObj.textColor || "" === configObj.textColor) {
          configObj.textColor = this._DEFAULT_CONFIG.textColor;//"#000001";
        }
        this.config.textColor = configObj.textColor;

        if ("undefined" === typeof configObj.labelTransparency ||
          "" === configObj.labelTransparency) {
          configObj.labelTransparency = this._DEFAULT_CONFIG.labelTransparency;//"1";
        }
        this.config.labelTransparency = configObj.labelTransparency;
        this.labelTransparency.setValues({"transparency": this.config.labelTransparency});

        if ("undefined" === typeof configObj.haloSize || "" === configObj.haloSize) {
          configObj.haloSize = this._DEFAULT_CONFIG.haloSize;//"1";

        }
        this.config.haloSize = configObj.haloSize;
        this.haloSizeSelect.set("value", configObj.haloSize);

        if ("undefined" === typeof configObj.haloColor || "" === configObj.haloColor) {
          configObj.haloColor = this._DEFAULT_CONFIG.haloColor;//"#FFFFFF";
        }
        this.config.haloColor = configObj.haloColor;

        html.setStyle(this.textColorPicker.domNode, "backgroundColor", this.config.textColor);
        this.textColorPicker.picker.refreshRecords();
        this.textColorPicker.picker.setColor(this.config.textColor, false, true);

        html.setStyle(this.haloColorPicker.domNode, "backgroundColor", this.config.haloColor);
        this.haloColorPicker.picker.refreshRecords();
        this.haloColorPicker.picker.setColor(this.config.haloColor, false, true);

        if ("undefined" === typeof configObj.haloOn || "" === configObj.haloOn) {
          configObj.haloOn = this._DEFAULT_CONFIG.haloOn;//"#FFFFFF";
        }
        this.showHalo.set("checked",this.config.haloOn);
      },

      setTextSize: function (size) {
        if (size !== this.textSizeSelect.getValue()) {
          this.textSizeSelect.set("value", size);
        }

        if (size !== this.textSizeSlider.getValue()) {
          if (size > this._MAX_TEXT_SIZE) {
            size = this._MAX_TEXT_SIZE;
          } else if (size < this._MIN_TEXT_SIZE) {
            size = this._MIN_TEXT_SIZE;
          }
          this.textSizeSlider.set("value", size);
        }
      },

      fontBtnClickd: function (fontConfig) {
        if (true === fontConfig.bold) {
          html.addClass(this.bold, "selected");
        } else if (false === fontConfig.bold) {
          html.removeClass(this.bold, "selected");
        }

        if (true === fontConfig.italic) {
          html.addClass(this.italic, "selected");
        } else if (false === fontConfig.italic) {
          html.removeClass(this.italic, "selected");
        }

        if (true === fontConfig.underline) {
          html.addClass(this.underline, "selected");
        } else if (false === fontConfig.underline) {
          html.removeClass(this.underline, "selected");
        }
      },

      _initAppearance: function () {
        if (this.appearance) {
          if (false === this.appearance.bold) {
            html.addClass(this.bold, "hide");
          }
          if (false === this.appearance.italic) {
            html.addClass(this.italic, "hide");
          }
          if (false === this.appearance.underline) {
            html.addClass(this.underline, "hide");
          }
        }
      }
    });
  });