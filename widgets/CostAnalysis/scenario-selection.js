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
  'dojo/text!./scenario-selection.html',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/store/Memory',
  'dojo/dom-class'
], function (
  declare,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  array,
  lang,
  Memory,
  domClass
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,

    baseClass: 'jimu-widget-cost-analysis-scenario-selection',

    postCreate: function () {
      this.inherited(arguments);
    },

    startup: function () {
      this.inherited(arguments);
      this._init();
    },

    _init: function () {
      this.regionNameTextBox.set('value', this.regionName);
      this._setScenarioOptions();
    },

    _setScenarioOptions: function () {
      var scenarioArr, scenarioStore;
      scenarioArr = [];
      array.forEach(this.scenarioOptions, lang.hitch(this, function (scenarioOption) {
        scenarioArr.push({
          name: scenarioOption.scenario,
          value: scenarioOption.scenario,
          featureTemplate: this.templateName,
          geographyGlobalID: this.geographyGlobalID,
          costEquation: scenarioOption.costEquation
        });
      }));
      scenarioStore = new Memory({ idProperty: "value", data: scenarioArr });
      this.scenarioDropDown.set('labelAttr', "name");
      this.scenarioDropDown.set('store', scenarioStore);
      this.scenarioDropDown.set('value', this.nls.scenarioSelection.noneText);
      if (this.costingGeometryLayer) {
        domClass.remove(this.regionDetailsParentContainer, "esriCTHidden");
      } else {
        domClass.add(this.regionDetailsParentContainer, "esriCTHidden");
      }
    }
  });
});