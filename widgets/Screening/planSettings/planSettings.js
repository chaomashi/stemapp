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
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/_base/html',
  'dojo/on',
  'dijit/TooltipDialog',
  'dijit/form/Select',
  'dojo/dom-construct',
  'dijit/popup',
  'jimu/BaseWidget',
  'dojo/Evented',
  'dojo/dom-class'
], function (
  declare,
  lang,
  array,
  html,
  on,
  TooltipDialog,
  Select,
  domConstruct,
  dijitPopup,
  BaseWidget,
  Evented,
  domClass
) {
  return declare([BaseWidget, Evented], {
    // Set base class for custom placename widget
    baseClass: 'jimu-widget-screening',

    //Object that holds all the options and their keys for plan settings
    planSettingsOptions: {
      "directionOrAngleUnits": ["decimalDegree", "degreeMinuteSeconds"],
      "distanceAndLengthUnits": ["uSSurveyFeet", "meters"]
    },
    isTooltipDialogOpened: false,

    constructor: function (options) {
      this.planSettingsOptions = {
        "directionOrAngleUnits": ["decimalDegree", "degreeMinuteSeconds"],
        "distanceAndLengthUnits": ["uSSurveyFeet", "meters"]
      };
      this.isTooltipDialogOpened = false;
      lang.mixin(this, options);
    },

    startup: function () {
      this._popupDialog = new TooltipDialog({
        "class": "esriCTPlanSettingsDialog " + this.baseClass,
        "style": { "width": "250px" }
      });
      this._popupDialog.startup();
      // Dart theme change added
      if (this.appConfig.theme.name === "DartTheme") {
        domClass.add(this._popupDialog.domNode, "dart-panel");
      }
      // Hide tooltip dialog clicked anywhere in the body
      this.own(on(document.body, 'click', lang.hitch(this, function (
        event) {
        var target = event.target || event.srcElement;
        if (!this.isPartOfPopup(target)) {
          this.closePopup();
        }
      })));
      // Hide tooltip dialog on window resize
      this.own(on(window, 'resize', lang.hitch(this, function () {
        this.closePopup();
      })));
      this.createPlanSettingsUI();
    },

    /**
     * Create UI for plan settings and shoe it in tooltip dialog
     * @memberOf planSettings/planSettings
     */
    createPlanSettingsUI: function () {
      var planSettingsContainer, directionUnitsLabel, distanceUnitLabel, applySettingsBtn;
      //Create container for  plan settings
      planSettingsContainer =
        domConstruct.create("div", { "class": "esriCTPlanSettingsContainer" }, null);
      //Direction settings dropdown
      directionUnitsLabel =
        domConstruct.create("div", {
          "class": "esriCTEllipsis esriCTPlanSettingLabel",
          innerHTML: this.nls.planSettings.directionUnitLabelText
        }, planSettingsContainer);
      this.directionUnitSelect = new Select();
      //Load the options
      this._loadOptionsForDropDown(this.directionUnitSelect,
        this.planSettingsOptions.directionOrAngleUnits,
        this.config.traverseDirectionUnit);
      this.directionUnitSelect.placeAt(planSettingsContainer);

      //Distance settings dropdown
      distanceUnitLabel =
        domConstruct.create("div", {
          "class": "esriCTEllipsis esriCTPlanSettingLabel",
          innerHTML: this.nls.planSettings.distanceUnitLabelText
        }, planSettingsContainer);
      this.distanceUnitSelect = new Select();
      //Load the options
      this._loadOptionsForDropDown(this.distanceUnitSelect,
        this.planSettingsOptions.distanceAndLengthUnits, this.config.traverseUnit);
      this.distanceUnitSelect.placeAt(planSettingsContainer);
      this._popupDialog.setContent(planSettingsContainer);

      //Create button to apply the settings
      applySettingsBtn =
        domConstruct.create("button", {
          "innerHTML": this.nls.common.apply,
          "class": "esriCTEllipsis jimu-btn esriCTPlanSettingsBtn"
        },
          domConstruct.create("div", {
            "class": "esriCTPlanSettingsBtnContainer"
          }, planSettingsContainer));
      //Bind click event
      this.own(on(applySettingsBtn, "click", lang.hitch(this, function () {
        this._savePlanSettings();
      })));

      //Open tooltip dialog once all the contents are added
      this.openPopup();
    },

    /**
     * Save new plan settings
     * @memberOf planSettings/planSettings
     */
    _savePlanSettings: function () {
      this.emit("planSettingsChanged", this.directionUnitSelect.get('value'),
        this.distanceUnitSelect.get('value'));
      this.closePopup();
    },

    /**
     * Add options to passed dropdown
     * @memberOf planSettings/planSettings
     */
    _loadOptionsForDropDown: function (dropDown, dropDownOptions, currentValue) {
      var options = [], option;
      //Add options for selected dropdown
      array.forEach(dropDownOptions, lang.hitch(this, function (type) {
        if (this.nls.units[type]) {
          option = { value: type, label: this.nls.units[type] };
        }
        options.push(option);
        if (currentValue === option.value) {
          option.selected = true;
        }
      }));
      dropDown.addOption(options);
    },

    /**
     * open popup to allow parcel editing from map
     * @memberOf planSettings/planSettings
     */
    openPopup: function () {
      dijitPopup.open({
        popup: this._popupDialog,
        x: this.position.pageX + 11,
        y: this.position.pageY
      });
      this.isTooltipDialogOpened = true;
    },

    /**
     * get extent from the point geometry
     * Hide popup dialog
     * @memberOf planSettings/planSettings
     */
    closePopup: function () {
      if (this._popupDialog) {
        dijitPopup.close(this._popupDialog);
        this.isTooltipDialogOpened = false;
        this._restoreDialog();
      }
    },

    /**
     * Check whether target node is part of the popup or not
     * @param{object} target : target node
     * @memberOf planSettings/planSettings
     */
    isPartOfPopup: function (target) {
      var node, isInternal;
      node = this._popupDialog.domNode;
      isInternal = target === node || html.isDescendant(target,
        node);
      return isInternal;
    },

    /**
     * Restore select to previous values
     * @memberOf planSettings/planSettings
     */
    _restoreDialog: function () {
      this.directionUnitSelect.set('value', this.config.traverseDirectionUnit);
      this.distanceUnitSelect.set('value', this.config.traverseUnit);
    }
  });
});