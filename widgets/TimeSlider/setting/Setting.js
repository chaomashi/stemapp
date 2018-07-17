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
  'dojo/on',
  'dojo/_base/lang',
  'dojo/_base/html',
  'jimu/utils',
  "jimu/dijit/CheckBox",
  "dijit/form/Select",
  "dijit/form/ValidationTextBox"
],
  function (
    declare, BaseWidgetSetting, _WidgetsInTemplateMixin,
    on, lang, html,
    utils,
    CheckBox, Select/* ,ValidationTextBox*/) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-timeslider-setting',

      postCreate: function () {
        this._timeFormatOptions = [{
          "label": this.nls.mapDefault,
          "value": "auto"
        }, {
          "label": this.nls.MMMMYYYY,
          "value": "MMMM YYYY"
        }, {
          "label": this.nls.MMMYYYY,
          "value": "MMM YYYY"
        }, {
          "label": this.nls.MMMMDYYYY,
          "value": "MMMM D,YYYY"
        }, {
          "label": this.nls.dddMMMDDYYYY,
          "value": "ddd MMM DD,YYYY"
        }, {
          "label": this.nls.MDDYYYY,
          "value": "M/DD/YYYY"
        }, {
          "label": this.nls.YYYYMDD,
          "value": "YYYY/M/DD"
        }, {
          "label": this.nls.MDDYY,
          "value": "M/DD/YY"
        }, {
          "label": this.nls.YYYY,
          "value": "YYYY"
        }, {
          "label": this.nls.MDDYYYYhmma,
          "value": "M/DD/YYYY  h:mm a"
        }, {
          "label": this.nls.dddMMMDDhmma,
          "value": "ddd MMM DD  h:mm a"
        }, {
          "label": this.nls.custom,
          "value": "Custom"
        }];

        this.inherited(arguments);
        this.showLabelsBox = new CheckBox({
          label: this.nls.showLayerLabels,
          checked: false
        }, this.showLabelsBox);
        this.showLabelsBox.startup();

        this.autoPlay = new CheckBox({
          label: this.nls.autoPlay,
          checked: false
        }, this.autoPlay);
        this.autoPlay.startup();

        this.timeFormat = new Select({
          options: this._timeFormatOptions
        }, this.timeFormat);
      },

      startup: function () {
        this.inherited(arguments);
        if (!this.config) {
          this.config = {};
        }

        this.customDateFormat.setAttribute("placeHolder", "YYYY-MM-dd h:m:s Z");

        this.own(on(this.timeFormat, "click", lang.hitch(this, function () {
          if ("undefined" === typeof this._firstChange) {
            this._firstChange = false;
          }
        })));
        this.own(on(this.timeFormat, 'change', lang.hitch(this, function (val) {
          if ("undefined" === typeof this._firstChange) {
            this._firstChange = false;
          } else {
            this._initOptionsUI(val);
          }
        })));

        this.setConfig(this.config);
      },

      _initOptionsUI: function (val, customDateFormatVal) {
        if (val !== "Custom") {
          html.addClass(this.customDateContainer, "hide");
          this.customDateFormat.set("value", "");
        } else {
          html.removeClass(this.customDateContainer, "hide");
          this.customDateFormat.set("value", customDateFormatVal || "");
        }
      },

      setConfig: function (config) {
        this.config = config;

        if (config.showLabels) {
          this.showLabelsBox.setValue(true);
        } else {
          this.showLabelsBox.setValue(false);
        }

        if (false === config.autoPlay) {
          this.autoPlay.setValue(false);
        } else {
          this.autoPlay.setValue(true);//undefined OR true
        }

        if (config.timeFormat) {
          this.timeFormat.setValue(config.timeFormat);

          var customDateFormatValue;
          if (config.customDateFormat) {
            customDateFormatValue = config.customDateFormat;
          }
          this._initOptionsUI(config.timeFormat, customDateFormatValue);
        } else {
          this.timeFormat.setValue("auto");
        }
      },

      getConfig: function () {
        if ("Custom" === this.timeFormat.getValue() && "" === this.customDateFormat.get("value")) {
          this.customDateFormat.focus();
          this.customDateFormat.set("state", "Error");
          return false;
        }

        this.config.showLabels = this.showLabelsBox.getValue();
        this.config.autoPlay = this.autoPlay.getValue();
        this.config.timeFormat = this.timeFormat.getValue();

        if (this.customDateFormat.get("value")) {
          this.config.customDateFormat = this.customDateFormat.get("value");
        } else {
          this.config.customDateFormat = "";
        }

        return this.config;
      },

      _onCustomDateFormatBlur: function () {
        this.customDateFormat.value = utils.stripHTML(this.customDateFormat.value || "");
      }
    });
  });