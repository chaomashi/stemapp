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
  'dojo/Evented',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./cost-equation-editor.html',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/on',
  'dojo/dom-attr',
  'dojo/dom-class',
  'dijit/form/Textarea',
  'dijit/form/TextBox',
  'dijit/form/Select'
], function (
  declare,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  lang,
  array,
  on,
  domAttr,
  domClass
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    baseClass: 'jimu-widget-cost-analysis-equation-editor',
    _groupInfo: null,

    postCreate: function () {
      this.inherited(arguments);
      domAttr.set(this.costEquationHint, "innerHTML", this.nls.workBench.costingInfoHintText);
    },

    startup: function () {
      this.inherited(arguments);
      //Handle ok button click
      this.own(on(this.okButton, "click", lang.hitch(this, this._onOkButtonClicked)));
      //Handle cancel button click
      this.own(on(this.cancelButton, "click", lang.hitch(this, function () {
        this.emit("onCancelButtonClicked");
      })));
      //Handle new cost equation change event
      this.own(on(this.newCostEquationValue, "change", lang.hitch(this, this._onEquationChange)));
      //Handle scenario change event
      this.own(on(this.scenarioValue, "change", lang.hitch(this, this._onScenarioChange)));
    },

    /**
     * If scenario or equation is changed emit events to updated it.
     * @memberOf widgets/CostAnalysis/cost-equation-editor
     */
    _onOkButtonClicked: function () {
      var selectedScenario, updatedGroupInfo = {};
      //show error if newly entered equation is not valid
      if (domClass.contains(this.newCostEquationParent, "esriCTInvalidEquation")) {
        this.appUtils.showMessage(this.nls.workBench.errorInvalidCostEquation);
        return;
      }
      //get selected scenario
      selectedScenario = this.scenarioValue._getSelectedOptionsAttr();
      //if scenario/equation is updated then only raise the ok button clicked event
      if (this._groupInfo.scenario !== selectedScenario.scenario ||
        this._groupInfo.equation.toUpperCase() !==
        this.newCostEquationValue.get('value').toUpperCase()) {
        updatedGroupInfo = {
          "templateInfo": {
            "COSTEQUATION": this.newCostEquationValue.get('value'),
            "SCENARIO": selectedScenario.scenario
          },
          "groupInfo": this._groupInfo
        };
        this.emit("onOkButtonClicked", updatedGroupInfo);
      } else {
        this.emit("onCancelButtonClicked");
      }
    },

    /**
     * Validates entered equation and show error if required
     * @memberOf widgets/CostAnalysis/cost-equation-editor
     */
    _onEquationChange: function () {
      var isValid = false, value;
      value = this.newCostEquationValue.get('value');
      isValid = this.appUtils.validateEquation(value);
      if (!isValid) {
        domClass.add(this.newCostEquationParent, "esriCTInvalidEquation");
      } else {
        this.newCostEquationValue.set("value", value);
        domClass.remove(this.newCostEquationParent, "esriCTInvalidEquation");
      }
    },

    /**
     * On Scenario change update the new equation and the default equation
     * @memberOf widgets/CostAnalysis/cost-equation-editor
     */
    _onScenarioChange: function () {
      var selectedOption, newEquation;
      selectedOption = this.scenarioValue._getSelectedOptionsAttr();
      //if current scenario is the selected scenario show previous equation as a new equation
      //else default equation will be the new equation
      if (this._groupInfo.scenario === selectedOption.scenario) {
        newEquation = this._groupInfo.equation;
      } else {
        newEquation = selectedOption.costEquation;
      }
      this.newCostEquationValue.set("value", newEquation);
      this.defaultCostEquationValue.set("value", selectedOption.defaultEquation);
    },

    /**
     * Sets the selected group info in the cost-editor panel
     * @memberOf widgets/CostAnalysis/cost-equation-editor
     */
    setGroupInfo: function (groupInfo) {
      var regionName, scenarioName, scenarioOptions;
      regionName = groupInfo.region;
      scenarioName = groupInfo.scenario;
      //show geography as none if it is null
      if (regionName === "null") {
        regionName = this.nls.scenarioSelection.noneText;
      }
      //set the group info in global object
      this._groupInfo = groupInfo;
      this.geographyValue.set("value", regionName);
      //create options for scenario drop-down
      scenarioOptions = this._getConfiguredCostEquations(
        groupInfo.layerId, groupInfo.templateName, groupInfo.region, scenarioName);
      //removes previous options
      this.scenarioValue.set("options", []);
      //adds new scenario options for the selected group
      this.scenarioValue.addOption(scenarioOptions);
    },

    /**
    * This function is used to get the configured cost equations.
    * @memberOf widgets/CostAnalysis/cost-equation-editor
    */
    _getConfiguredCostEquations: function (layerId, templateName, regionName, selectedScenario) {
      var configuredCostingInfoArray, configuredCostEquations, defaultEquation;
      configuredCostingInfoArray = [];
      configuredCostEquations = [];
      //get configured options for the layer
      if (this.config.costingInfoSettings.hasOwnProperty(layerId)) {
        configuredCostingInfoArray = this.config.costingInfoSettings[layerId];
      }
      if (regionName === "null") {
        regionName = "";
      }
      array.forEach(configuredCostingInfoArray, lang.hitch(this, function (costingInfo) {
        if (costingInfo.geography === regionName && costingInfo.featureTemplate === templateName) {
          var scenarioValue, scenarioName, option;
          scenarioName = costingInfo.scenario;
          scenarioValue = costingInfo.scenario;
          //show scenario as none if it is null
          if (!scenarioName) {
            scenarioName = this.nls.scenarioSelection.noneText;
            scenarioValue = "null";
          }
          //create option object
          option = {
            label: scenarioName,
            value: costingInfo.costEquation,
            costEquation: costingInfo.costEquation,
            defaultEquation: costingInfo.costEquation,
            scenario: scenarioValue,
            selected: false
          };
          //if this is current scenario show as selected in drop-down
          if (selectedScenario === scenarioValue) {
            option.selected = true;
            this.newCostEquationValue.set("value", this._groupInfo.equation);
            this.defaultCostEquationValue.set("value", costingInfo.costEquation);
          }
          configuredCostEquations.push(option);
        }
        //Get the default cost equation for none region and none scenario
        if (costingInfo.geography === "" && costingInfo.scenario === "" &&
          costingInfo.featureTemplate === templateName) {
          defaultEquation = costingInfo.costEquation;
        }
      }));
      //if no configured equation for the region & scenario group,
      //add scenario as none with the existing group equation
      if (configuredCostEquations.length === 0) {
        configuredCostEquations.push(
          {
            label: this.nls.scenarioSelection.noneText,
            value: this._groupInfo.equation,
            costEquation: this._groupInfo.equation,
            defaultEquation: defaultEquation,
            scenario: "null",
            selected: true
          }
        );
        this.newCostEquationValue.set("value", this._groupInfo.equation);
        this.defaultCostEquationValue.set("value", defaultEquation);
      }
      return configuredCostEquations;
    }
  });
});