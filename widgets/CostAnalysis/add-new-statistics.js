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
  'dojo/text!./add-new-statistics.html',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/dom-construct',
  './setting/StatisticsSettings',
  'dojo/_base/array',
  'dojo/query'
], function (
  declare,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  lang,
  on,
  domConstruct,
  StatisticsSettings,
  array,
  query
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    baseClass: 'jimu-widget-cost-analysis-add-new-statistics',
    _projectOverview: null,
    _lastConfiguredStatistics: null,
    addNewStatisticsObj: null,

    postCreate: function () {
      this.inherited(arguments);
      this._projectOverview = null;
      this._lastConfiguredStatistics = null;
      this.addNewStatisticsObj = null;
    },

    startup: function () {
      this.inherited(arguments);

      this._lastConfiguredStatistics = lang.clone(this.config);
      this._lastConfiguredStatistics.statisticsSettings = [];

      this._initAddNewStatistics();
      this.own(on(this.okButtonNode, "click", lang.hitch(this, function () {
        this._lastConfiguredStatistics.statisticsSettings = this.addNewStatisticsObj.getConfig();
        this.emit("updateStatisticsDetail", this._getUpdatedStatistics());
        this.emit("showWorkBenchPanel");
      })));
      this.own(on(this.cancelButtonNode, "click", lang.hitch(this, function () {
        this.emit("showWorkBenchPanel");
      })));
    },

    /**
     * Reset last configured statistics
     */
    reset: function () {
      this._lastConfiguredStatistics = lang.clone(this.config);
      this._lastConfiguredStatistics.statisticsSettings = [];
      this._initAddNewStatistics();
      this.emit("updateStatisticsDetail", []);
    },

    /**
     * Initialize Add New statistics
     * @memberOf widgets/CostAnalysis/Widget
     */
    _initAddNewStatistics: function () {
      if (this.addNewStatisticsObj) {
        this.addNewStatisticsObj.destroy();
      }
      this.addNewStatisticsObj = new StatisticsSettings({
        nls: this.nls,
        map: this.map,
        config: this._lastConfiguredStatistics,
        layerInfosObj: this.layerInfosObj,
        showActionButtonsInColumn: false,
        showActionButtonsInRow: true
      }, domConstruct.create("div", {}, this.addNewStatisticsNode));
      this.addNewStatisticsObj.startup();
      this.addNewStatisticsObj.resetAddNewStatisticsDropdown();
    },

    /**
     * Get difference of statistics data configured and updated
     * @memberOf widgets/CostAnalysis/Widget
     */
    _getUpdatedStatistics: function () {
      var statisticsData, rowObj, addStatisticsRows;
      statisticsData = [];
      addStatisticsRows = query('.simple-table-row', this.assetsListNode);
      //code to read statistics detail data
      array.forEach(addStatisticsRows, lang.hitch(this, function (rowEntry) {
        if (rowEntry.layerNameDropDown &&
          rowEntry.statisticsTypeDropdown && rowEntry.layerFieldDropdown &&
          rowEntry.statisticsLabelTextBox) {
          rowObj = {};
          rowObj.id = rowEntry.layerNameDropDown.get('value');
          rowObj.type = rowEntry.statisticsTypeDropdown.get('value');
          rowObj.field = rowEntry.layerFieldDropdown.get('value');
          rowObj.label = rowEntry.statisticsLabelTextBox.get('value');
          statisticsData.push(rowObj);
        }
      }));
      return statisticsData;
    }
  });
});
