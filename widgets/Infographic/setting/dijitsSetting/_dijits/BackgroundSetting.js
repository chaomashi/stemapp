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
  "dojo/_base/lang",
  'dojo/on',
  'dojo/_base/html',
  'dojo/Evented',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./BackgroundSetting.html',
  'jimu/dijit/ColorPickerPopup',
  'jimu/dijit/Message',
  "dijit/form/ComboBox",
  'jimu/dijit/CheckBox',
  'jimu/dijit/ImageChooser'
],
  function (declare, lang, on, html,
    Evented, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template,
    ColorPickerPopup, Message) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      templateString: template,
      nls: null,
      _FONTS: null,
      _DEFAULT_CONFIG: null,
      // {
      //   text: "Example Text",
      //   backgroundColor: "#FFF",
      //   alignment: {
      //     horizontal: "center",//left,center,right
      //     vertical: "middle"//top,middle,bottom
      //   },
      //   link: ""
      // },

      postCreate: function () {
        this.inherited(arguments);
        this._FONTS = "Arial;Comic Sans MS;Courier New;Garamond;Tahoma;Times New Roman;Verdana".split(";");
        this._DEFAULT_CONFIG = {
          backgroundColor: "#FFF",
          alignment: {
            horizontal: "center",//left,center,right
            vertical: "middle"//top,middle,bottom
          },
          link: ""
        };
        this.config = lang.mixin(this._DEFAULT_CONFIG, this.config);

        //1.backgroundColor
        this.backgroundColorPicker = new ColorPickerPopup({
          appearance: {
            showTransparent: false,
            showColorPalette: true,
            showCoustom: true,
            showCoustomRecord: true
          },
          recordUID: this.recordUID
        });
        this.backgroundColorPicker.placeAt(this.backgroundBtn);
        this.backgroundColorPicker.startup();
        this.own(on(this.backgroundColorPicker, 'change', lang.hitch(this, function (color) {
          if(this.config.backgroundColor === color){
            return;
          }
          this.onSettingChange({
            backgroundColor: color.toHex()
          });
        })));
        //2.align
        this.own(on(this.alignLeft, 'click', lang.hitch(this, function () {
          this.alignmentBtnClickd("left");
          this.onSettingChange({
            alignment: {
              horizontal: "left",
              vertical: this.config.alignment.vertical
            }
          });
        })));
        this.own(on(this.alignCenter, 'click', lang.hitch(this, function () {
          this.alignmentBtnClickd("center");
          this.onSettingChange({
            alignment: {
              horizontal: "center",
              vertical: this.config.alignment.vertical
            }
          });
        })));
        this.own(on(this.alignRight, 'click', lang.hitch(this, function () {
          this.alignmentBtnClickd("right");
          this.onSettingChange({
            alignment: {
              horizontal: "right",
              vertical: this.config.alignment.vertical
            }
          });
        })));
        this.own(on(this.alignTop, 'click', lang.hitch(this, function () {
          this.alignmentBtnClickd(null, "top");
          this.onSettingChange({
            alignment: {
              horizontal: this.config.alignment.horizontal,
              vertical: "top"
            }
          });
        })));
        this.own(on(this.alignMiddle, 'click', lang.hitch(this, function () {
          this.alignmentBtnClickd(null, "middle");
          this.onSettingChange({
            alignment: {
              horizontal: this.config.alignment.horizontal,
              vertical: "middle"
            }
          });
        })));
        this.own(on(this.alignBottom, 'click', lang.hitch(this, function () {
          this.alignmentBtnClickd(null, "bottom");
          this.onSettingChange({
            alignment: {
              horizontal: this.config.alignment.horizontal,
              vertical: "bottom"
            }
          });
        })));
        //link
        this.own(on(this.linkText, 'change', lang.hitch(this, function () {
          if (this.config.link === this.linkText.getValue() ||
            "" === this.linkText.getValue() || false === this.linkText.isValid()) {
            return;
          }
          this.onSettingChange({
            link: this._formatLinkValue(this.linkText.getValue())
          });
        })));
        this.own(on(this.linkText, 'blur', lang.hitch(this, function () {
          if (this.config.link === this.linkText.getValue() ||
            "" === this.linkText.getValue() || false === this.linkText.isValid()) {
            return;
          }
          var text = this._formatLinkValue(this.linkText.getValue());
          this.onSettingChange({
            link: text
          });
        })));
      },
      startup: function () {
        this.inherited(arguments);
        this.setConfig(this.config);
        this.refresh();
      },

      //config
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
        if (false === this.linkText.isValid()) {
          var message = new Message({
            message: window.jimuNls.urlInput.invalidUrl,
            buttons: [{
              label: this.nls.ok,
              onClick: lang.hitch(this, function () {
                message.content = null;
                message.close();
              })
            }]
          });

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
        if ("undefined" === typeof configObj) {
          return;
        }

        if ("undefined" === typeof configObj.backgroundColor || "" === configObj.backgroundColor) {
          configObj.backgroundColor = "#FFF";
        }
        this.config.backgroundColor = configObj.backgroundColor;
        html.setStyle(this.backgroundColorPicker.domNode, 'backgroundColor', this.config.backgroundColor);
        this.backgroundColorPicker.picker.refreshRecords();
        this.backgroundColorPicker.picker.setColor(this.config.backgroundColor, false, true);

        if ("undefined" !== typeof configObj.alignment) {
          this.config.alignment = configObj.alignment;
          this.alignmentBtnClickd(this.config.alignment.horizontal, this.config.alignment.vertical);
        }
        if ("undefined" !== typeof configObj.link) {
          this.config.link = configObj.link;
          this.linkText.setValue(this.config.link);
        }
      },
      alignmentBtnClickd: function (h, v) {
        if (h) {
          html.removeClass(this.alignLeft, "selected");
          html.removeClass(this.alignCenter, "selected");
          html.removeClass(this.alignRight, "selected");

          switch (h) {
            case "left": {
              html.addClass(this.alignLeft, "selected"); break;
            } case "center": {
              html.addClass(this.alignCenter, "selected"); break;
            } case "right": {
              html.addClass(this.alignRight, "selected"); break;
            } default: {

            }
          }
        }
        if (v) {
          html.removeClass(this.alignTop, "selected");
          html.removeClass(this.alignMiddle, "selected");
          html.removeClass(this.alignBottom, "selected");

          switch (v) {
            case "top": {
              html.addClass(this.alignTop, "selected"); break;
            } case "middle": {
              html.addClass(this.alignMiddle, "selected"); break;
            } case "bottom": {
              html.addClass(this.alignBottom, "selected"); break;
            } default: {

            }
          }
        }
      },
      //add http prefix
      _formatLinkValue: function(link) {
        var _link = '';
        if (!/^http(s?):\/\//.test(link)) {
          if (/^\/\//.test(link)) {
            _link = 'http:' + link;
          } else {
            _link = 'http://' + link;
          }
        } else {
          _link = link;
        }
        return _link;
      }
    });
  });