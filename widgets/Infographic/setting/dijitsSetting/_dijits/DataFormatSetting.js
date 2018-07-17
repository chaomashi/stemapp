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
  'dojo/_base/array',
  'dojo/Evented',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./DataFormatSetting.html',
  "dijit/form/ComboBox",
  'jimu/dijit/CheckBox',
  "dijit/form/NumberSpinner"
],
  function (declare, lang, on, html, array,
    Evented, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      templateString: template,
      nls: null,
      _DEFAULT_CONFIG: null,

      postCreate: function () {
        this.inherited(arguments);
        this._DEFAULT_CONFIG = {
          unit: "none",
          decimalPlaces:"0",
          prefix: "",
          suffix: ""
        };

        this._UNIT = [{
          value: "billion",
          label: this.nls.billion
        }, {
          value: "million",
          label: this.nls.million
        }, {
          value: "thousand",
          label: this.nls.thousand
        },{
          value: "none",
          label: this.nls.none
        },{
          value: "percentage",
          label: this.nls.percentage
        }];
        this.config = lang.mixin(this._DEFAULT_CONFIG, this.config);

        this._initAppearance();
        //unit
        array.forEach(this._UNIT, lang.hitch(this, function (data) {
          this.unitSelect.addOption(data);
        }));
        //Decimal Places
        //unit
        this.own(on(this.unitSelect, 'change', lang.hitch(this, function (value) {
          if(this.config.unit === value){
            return;
          }
          this.onSettingChange({
            unit: value
          });
        })));
        //Decimal Places
        this.own(on(this.decimalPlacesText, 'change', lang.hitch(this, function () {
          if(this.config.decimalPlaces === this.decimalPlacesText.getValue()){
            return;
          }
          this.onSettingChange({
            decimalPlaces: this.decimalPlacesText.getValue()
          });
        })));
        //Prefix
        this.own(on(this.prefixText, 'change', lang.hitch(this, function () {
          if(this.config.prefix === this.prefixText.getValue()){
            return;
          }
          this.onSettingChange({
            prefix: this.prefixText.getValue()
          });
        })));
        this.own(on(this.prefixText, 'blur', lang.hitch(this, function () {
          if(this.config.prefix === this.prefixText.getValue()){
            return;
          }
          var text = this.prefixText.getValue();
          this.onSettingChange({
            prefix: text
          });
        })));
        //Suffix
        this.own(on(this.suffixText, 'change', lang.hitch(this, function () {
          if(this.config.suffix === this.suffixText.getValue()){
            return;
          }
          this.onSettingChange({
            suffix: this.suffixText.getValue()
          });
        })));
        this.own(on(this.suffixText, 'blur', lang.hitch(this, function () {
          if(this.config.suffix === this.suffixText.getValue()){
            return;
          }
          var text = this.suffixText.getValue();
          this.onSettingChange({
            suffix: text
          });
        })));
      },
      startup: function () {
        this.inherited(arguments);
        this.setConfig(this.config);
        this.refresh();
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
        return this.decimalPlacesText.isValid();
      },
      getConfig: function () {
        // if (html.hasClass(this.unitWapper, "hide")) {
        //   this.config.unit = "";
        // }
        if (this.isValid()) {
          if (isNaN(this.decimalPlacesText.getValue())) {
            this.config.decimalPlaces = "";//when delete the number
          }
          return this.config;
        } else {
          return false;
        }
      },
      // _showOrHideUnitByDataFormat: function (value) {
      //   if ("number" === value) {
      //     html.removeClass(this.unitWapper, "hide");
      //   } else {
      //     html.addClass(this.unitWapper, "hide");
      //   }
      // },
      _initAppearance: function () {
        if (this.appearance) {
          if (false === this.appearance.unit) {
            html.addClass(this.unit, "hide");
          }
        }
      },
      disableItem: function (itmeName) {
        if ("unit" === itmeName) {
          this.unitSelect.set("disabled", true);
        }
      },
      enableItem: function (itmeName) {
        if ("unit" === itmeName) {
          this.unitSelect.set("disabled", false);
        }
      },
      setConfig: function (configObj) {
        if ("undefined" === typeof configObj) {
          return;
        }

        if ("undefined" !== typeof configObj.unit) {
          this.config.unit = configObj.unit;
          this.unitSelect.set('value', this.config.unit);
        }
        if ("undefined" !== typeof configObj.decimalPlaces) {
          this.config.decimalPlaces = configObj.decimalPlaces;
          this.decimalPlacesText.setValue(this.config.decimalPlaces);
        }
        if ("undefined" !== typeof configObj.prefix) {
          this.config.prefix = configObj.prefix;
          this.prefixText.setValue(this.config.prefix);
        }
        if ("undefined" !== typeof configObj.suffix) {
          this.config.suffix = configObj.suffix;
          this.suffixText.setValue(this.config.suffix);
        }
      }
    });
  });