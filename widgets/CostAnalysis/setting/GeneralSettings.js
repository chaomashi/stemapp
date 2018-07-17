///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'jimu/BaseWidget',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./GeneralSettings.html',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/dom-attr',
  'dojo/dom-class'
], function (
  declare,
  BaseWidget,
  _WidgetsInTemplateMixin,
  template,
  lang,
  on,
  domAttr,
  domClass
) {
  return declare([BaseWidget, _WidgetsInTemplateMixin], {
    templateString: template,

    baseClass: 'jimu-widget-cost-analysis-general-settings',

    constructor: function (options) {
      lang.mixin(this, options);
    },

    postMixInProperties: function () {
      this.nls.common = {};
      lang.mixin(this.nls.common, window.jimuNls.common);
    },

    postCreate: function () {
      this.inherited(arguments);
      this._init();
    },

    _init: function () {
      this._setConfig();
      this._attachNodeEvents();
      this.currencyInputNode.validator = lang.hitch(this, this._currencyValidator);
      this.bufferDistanceInputNode.validator = lang.hitch(this, this._bufferDistanceValidator);
    },

    /**
    * This function is used to set user selected config values for general setting
    * @memberOf setting/GeneralSettings
    */
    _setConfig: function () {
      this.measurementUnitInputNode.set('value', this.config.generalSettings.measurementUnit);
      this.currencyInputNode.set('value', this.config.generalSettings.currency);
      this.roundCostInputNode.set('value', this.config.generalSettings.roundCostType);
      this.projectAreaTypeInputNode.set('value', this.config.generalSettings.projectAreaType);
      this.bufferDistanceInputNode.set('value', this.config.generalSettings.bufferDistance);
    },

    /**
     * This function is used to validate currency unit and buffer distance
     * @memberOf setting/GeneralSettings
     */
    validate: function () {
      var projectAreaType;
      projectAreaType = this.projectAreaTypeInputNode.get('value');
      //condition to validate currency regex.
      if (!this.currencyInputNode.validate()) {
        return {
          "isValid": false,
          "errorMessage": this.nls.generalSettings.errorMessages.currency
        };
      }
      // condition to bufferDistance if project area buffer selected.
      if (projectAreaType === "buffer" && !this.bufferDistanceInputNode.validate()) {
        return {
          "isValid": false,
          "errorMessage": this.nls.generalSettings.errorMessages.bufferDistance
        };
      }
      return { isValid: true };
    },

    /**
     * This function is used to fetch config values set by user from general settings
     * @memberOf setting/GeneralSettings
     */
    getConfig: function () {
      return {
        "measurementUnit": this.measurementUnitInputNode.get('value'),
        "currency": this.currencyInputNode.get('value'),
        "roundCostType": this.roundCostInputNode.get('value'),
        "projectAreaType": this.projectAreaTypeInputNode.get('value'),
        "bufferDistance": this.bufferDistanceInputNode.get('value')
      };
    },

    /**
    * This function is used to bind events on change of buffer distance and project area type
    * @memberOf setting/GeneralSettings
    */
    _attachNodeEvents: function () {
      this.own(on(this.measurementUnitInputNode, "change", lang.hitch(this, function (evt) {
        domAttr.set(this.bufferDistanceUnit, "innerHTML", this.nls.units[evt].label);
      })));
      this.own(on(this.projectAreaTypeInputNode, "change", lang.hitch(this, function (value) {
        if (value === "outline") {
          this.bufferDistanceInputNode.textbox.value = "5";
          this.bufferDistanceInputNode.set("disabled", true);
          domClass.add(this.projectSettingsOutputRightContainerNode, "esriCTHidden");
        }
        else {
          this.bufferDistanceInputNode.set("disabled", false);
          domClass.remove(this.projectSettingsOutputRightContainerNode, "esriCTHidden");
        }
      })));
    },

    /**
     * This function is used to validate currency
     * @memberOf setting/GeneralSettings
     */
    _currencyValidator: function (value) {
      var currencyRegex,
        regexRes;
      currencyRegex = /^([^0-9]+)$/;
      regexRes = value.match(currencyRegex);
      //to check valid currency
      if (!regexRes) {
        this.currencyInputNode.invalidMessage = this.nls.generalSettings.errorMessages.currency;
        return false;
      }
      return true;
    },

    /**
    * This function is used to validate buffer distance
    * @memberOf setting/GeneralSettings
    */
    _bufferDistanceValidator: function (value) {
      //constraints:{max:100}, regExp:'^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$', invalidMessage:'${nls.generalSettings.errorMessages.bufferDistance}'
      var bufferDistanceRegex,
        regexRes;
      if (value < 0 || value > 100) {
        this.bufferDistanceInputNode.invalidMessage =
          this.nls.generalSettings.errorMessages.outOfRangebufferDistance;
        return false;
      }
      bufferDistanceRegex = /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/;
      regexRes = value.match(bufferDistanceRegex);
      //to check valid currency
      if (!regexRes) {
        this.bufferDistanceInputNode.invalidMessage =
          this.nls.generalSettings.errorMessages.bufferDistance;
        return false;
      }
      return true;
    }
  });
});