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
  'dojo/_base/array',
  'jimu/BaseWidget',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./PlanSettings.html',
  'dojo/_base/lang',
  'dojo/Evented',
  'dojo/dom-class',
  'dojo/query',
  './utils',
  'dijit/form/Select'
],
  function (
    declare,
    array,
    BaseWidget,
    _WidgetsInTemplateMixin,
    PlanSettingsTemplate,
    lang,
    Evented,
    domClass,
    query,
    utils
  ) {
    return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'jimu-widget-ParcelDrafter-PlanSettings',
      templateString: PlanSettingsTemplate,
      selectedPlanSettings: {}, //Holds selected planSettings
      planSettingsOptions: lang.clone(utils.planSettingsOptions), //Object that holds all the options and their keys

      constructor: function (options) {
        lang.mixin(this, options);
      },

      //Load all the options on startup
      startup: function () {
        //load options for all drop downs
        this._loadOptionsForDropDown(this.directionOrAngleType, this.planSettingsOptions
          .directionOrAngleType);
        this._loadOptionsForDropDown(this.directionOrAngleUnits, this.planSettingsOptions
          .directionOrAngleUnits);
        this._loadOptionsForDropDown(this.distanceAndLengthUnits, this.planSettingsOptions
          .distanceAndLengthUnits);
        this._loadOptionsForDropDown(this.areaUnits, this.planSettingsOptions.areaUnits);
        this._loadOptionsForDropDown(this.circularCurveParameters, this.planSettingsOptions
          .circularCurveParameters);
        //send by default updated parameters
        this.onPlansettingsChanged();
      },

      postCreate: function () {
        this.inherited(arguments);
        //set widget variables
        this.selectedPlanSettings = {};
        this.planSettingsOptions = lang.clone(utils.planSettingsOptions);
        //set class to main container
        domClass.add(this.domNode, "esriCTPlanSettingsContainer esriCTFullWidth");
        //TODO: try to remove the timeout
        setTimeout(lang.hitch(this, this._setBackgroundColorForDartTheme), 500);
      },

      /**
      * This function overrides dijit/select
      * background color for dart theme
      * @memberOf widgets/ParcelDrafter/PlanSettings
      **/
      _setBackgroundColorForDartTheme: function () {
        var buttonContentsDiv, i, selectBoxArrowDiv;
        // if applied theme is dart Theme
        if (this.appConfig.theme.name === "DartTheme") {
          //update the style of arrow buttons for dijit/select to match with combobox
          buttonContentsDiv = query(".dijitSelect .dijitButtonContents", this.planSettingsNode);
          selectBoxArrowDiv = query(".dijitSelect .dijitArrowButton", this.planSettingsNode);
          // loop through all dijit/select div for applying css
          for (i = 0; i < buttonContentsDiv.length && i < selectBoxArrowDiv.length; i++) {
            domClass.add(buttonContentsDiv[i], "dijitButtonContentsDartTheme");
            domClass.add(selectBoxArrowDiv[i], "dijitArrowButtonDartTheme");
          }
        }
      },

      /**
      * Add options to passed dropdown
      * @memberOf widgets/ParcelDrafter/PlanSettings
      **/
      _loadOptionsForDropDown: function (dropDown, dropDownOptions) {
        var options = [], option;
        //Add options for selected dropdown
        array.forEach(dropDownOptions, lang.hitch(this, function (type) {
          option = {
            value: type,
            label: this.nls.planSettings[type] || window.jimuNls.units[type]
          };
          options.push(option);
        }));
        dropDown.addOption(options);
      },

      /**
      * Return's flag based on plan settings are changed or not
      * @memberOf widgets/ParcelDrafter/PlanSettings
      **/
      _isSettingsChanged: function () {
        var isDataChanged = false;
        //check if directionOrAngleType is changed
        if (this.selectedPlanSettings.directionOrAngleType !==
          this.directionOrAngleType.get('value')) {
          isDataChanged = true;
        } else if (this.selectedPlanSettings.directionOrAngleUnits !==
          this.directionOrAngleUnits.get('value')) {
          //check if directionOrAngleUnits is changed
          isDataChanged = true;
        } else if (this.selectedPlanSettings.distanceAndLengthUnits !==
          this.distanceAndLengthUnits.get('value')) {
          //check if distanceAndLengthUnits is changed
          isDataChanged = true;
        } else if (this.selectedPlanSettings.areaUnits !==
          this.areaUnits.get('value')) {
          //check if areaUnits is changed
          isDataChanged = true;
        } else if (this.selectedPlanSettings.circularCurveParameters !==
          this.circularCurveParameters.get('value')) {
          //check if circularCurveParameters is changed
          isDataChanged = true;
        }
        return isDataChanged;
      },

      /**
      * Update's PlanSettings on close of the widget
      * @memberOf widgets/ParcelDrafter/PlanSettings
      **/
      onClose: function () {
        if (this._isSettingsChanged()) {
          this.onPlansettingsChanged();
        }
      },

      /**
      * Set's the selectedPlanSettings on any value change
      * @memberOf widgets/ParcelDrafter/PlanSettings
      **/
      onPlansettingsChanged: function () {
        this.selectedPlanSettings = {
          "directionOrAngleType": this.directionOrAngleType.get('value'),
          "directionOrAngleUnits": this.directionOrAngleUnits.get('value'),
          "distanceAndLengthUnits": this.distanceAndLengthUnits.get('value'),
          "areaUnits": this.areaUnits.get('value'),
          "circularCurveParameters": this.circularCurveParameters.get('value')
        };
        this.emit("planSettingsChanged", this.selectedPlanSettings);
      }
    });
  });