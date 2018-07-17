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
  'dojo/Evented',
  'jimu/dijit/TabContainer3',
  './GeneralSettings',
  './ProjectSettings',
  './LayerSettings',
  './CostingInfo',
  './StatisticsSettings',
  'dojo/_base/lang',
  'dojo/on',
  'jimu/dijit/Message',
  'jimu/LayerInfos/LayerInfos',
  '../utils'
], function (
  declare,
  BaseWidgetSetting,
  Evented,
  TabContainer3,
  GeneralSettings,
  ProjectSettings,
  LayerSettings,
  CostingInfo,
  StatisticsSettings,
  lang,
  on,
  Message,
  LayerInfos,
  AppUtils
) {
  return declare([BaseWidgetSetting, Evented], {
    baseClass: 'jimu-widget-cost-analysis-settings',

    _configurationTabParentContainer: null, // object of container that contains all tabs
    _generalSettingsTab: null, // object of general settings tab
    _projectSettingsTab: null, // object of project settings tab
    _layerSettingsTab: null, // object of layer settings tab
    _costingInfoTab: null, // object of costing info tab
    _statisticsSettingsTab: null, // object of statistics settings tab
    _layerInfosObj: null,// object for layer info for all tabs

    postMixInProperties: function () {
      this.nls.units = {
        feet: {
          label: window.jimuNls.units.feet,
          abbreviation: window.jimuNls.units.feetAbbr
        },
        meters: {
          label: window.jimuNls.units.meters,
          abbreviation: window.jimuNls.units.metersAbbr
        },
        miles: {
          label: window.jimuNls.units.miles,
          abbreviation: window.jimuNls.units.milesAbbr
        },
        yards: {
          label: window.jimuNls.units.yards,
          abbreviation: window.jimuNls.units.yardsAbbr
        },
        kilometers: {
          label: window.jimuNls.units.kilometers,
          abbreviation: window.jimuNls.units.kilometersAbbr
        }
      };
    },

    postCreate: function () {
      //load layer infos object
      LayerInfos.getInstance(this.map, this.map.webMapResponse.itemInfo).then(
        lang.hitch(this, function (layerInfosObj) {
          this._layerInfosObj = layerInfosObj;
        }));

      this._initConfiguration();
      //the config object is passed in
      this.setConfig(this.config);
    },

    setConfig: function () {
      this._layerSettingsTab.setConfig();
    },

    getConfig: function () {
      var generalSettingsInfo, projectSettingsInfo, costingInfo;
      generalSettingsInfo = this._generalSettingsTab.validate();
      // General Settings
      if (generalSettingsInfo.isValid) {
        this.config.generalSettings = this._generalSettingsTab.getConfig();
      } else {
        this._showMessage(generalSettingsInfo.errorMessage);
        AppUtils.switchToTab(this._configurationTabParentContainer,
          this.nls.generalSettings.tabTitle);
        return false;
      }
      projectSettingsInfo = this._projectSettingsTab.validate();
      if (projectSettingsInfo.isValid) {
        this.config.projectSettings = this._projectSettingsTab.getConfig();
      } else {
        this._showMessage(projectSettingsInfo.errorMessage);
        AppUtils.switchToTab(this._configurationTabParentContainer,
          this.nls.projectSettings.tabTitle);
        return false;
      }
      // Layer settings
      this.config.layerSettings = this._layerSettingsTab.getConfig();

      //Costing info
      costingInfo = this._costingInfoTab.validate();
      if (costingInfo.isValid) {
        this.config.costingInfoSettings = this._costingInfoTab.getConfig().costingInfoData;
        this.config.scenarios = this._costingInfoTab.getConfig().scenarios;
      } else {
        this._showMessage(costingInfo.errorMessage);
        AppUtils.switchToTab(this._configurationTabParentContainer,
          this.nls.costingInfo.tabTitle);
        return false;
      }


      //Statistics Settings
      this.config.statisticsSettings = this._statisticsSettingsTab.getConfig();

      return this.config;
    },

    /**
     * This function is used to initialize the configuration
     * @memberOf setting/Settings
     */
    _initConfiguration: function () {
      this._initTabs();
      this._initGeneralSettings();
      this._initProjectSettings();
      this._initLayerSettings();
      this._initCostingInfo();
      this._initStatisticsSettings();
    },

    /**
     * This function is used to initialize config tabs
     * @memberOf setting/Settings
     */
    _initTabs: function () {
      var generalSettingsTab, projectSettingsTab, layerSettingsTab, costingInfoTab,
        statisticsSettingsTab, configurationTabs;
      generalSettingsTab = {
        title: this.nls.generalSettings.tabTitle,
        content: this.generalSettingsNode
      };
      projectSettingsTab = {
        title: this.nls.projectSettings.tabTitle,
        content: this.projectSettingsNode
      };
      layerSettingsTab = {
        title: this.nls.layerSettings.tabTitle,
        content: this.layerSettingsNode
      };
      costingInfoTab = {
        title: this.nls.costingInfo.tabTitle,
        content: this.costingInfoNode
      };
      statisticsSettingsTab = {
        title: this.nls.statisticsSettings.tabTitle,
        content: this.statisticsSettingsNode
      };
      configurationTabs = [generalSettingsTab, projectSettingsTab, layerSettingsTab, costingInfoTab,
        statisticsSettingsTab];
      this._configurationTabParentContainer = new TabContainer3({
        tabs: configurationTabs
      }, this.configurationTabParentContainer);
      this.own(on(this._configurationTabParentContainer, "tabChanged", lang.hitch(this,
        function () {
          this._configurationTabParentContainer.containerNode.scrollTop = 0;
        })));
      this._configurationTabParentContainer.startup();
    },

    /**
     * This function is used to initialize general settings
     * @memberOf setting/Settings
     */
    _initGeneralSettings: function () {
      this._generalSettingsTab = new GeneralSettings({
        nls: this.nls,
        map: this.map,
        config: this.config
      });
      this._generalSettingsTab.placeAt(this.generalSettingsNode);
    },

    /**
     * This function is used to initialize project settings
     * @memberOf setting/Settings
     */
    _initProjectSettings: function () {
      this._projectSettingsTab = new ProjectSettings({
        nls: this.nls,
        map: this.map,
        config: this.config.projectSettings,
        layerInfosObj: this._layerInfosObj,
        appUtils: AppUtils
      });
      this._projectSettingsTab.placeAt(this.projectSettingsNode);
      this._projectSettingsTab.on("onLayerSelected", lang.hitch(this, function (layersInfo) {
        if (this._layerSettingsTab) {
          this._layerSettingsTab.updateLayerSettingsTable(layersInfo);
          // for updating costing Info tab
          this._costingInfoTab._updateCostingInfoTable(layersInfo);
          // for updating statistics tab
          this._statisticsSettingsTab._updateStatisticsTable(layersInfo);
        }
      }));
      this._projectSettingsTab.on("onDuplicateLayerSelect",
        lang.hitch(this, function (message) {
          this._showMessage(message);
        }));

      this._projectSettingsTab.on("onGeographyFieldChange",
        lang.hitch(this, function (value, layer) {
          if (this._costingInfoTab) {
            if (layer && layer !== "") {
              this._costingInfoTab.getGeographyOptions(value, layer).then(lang.hitch(this,
                function (geographyOptions) {
                  this._costingInfoTab.onGeographyFieldUpdate(geographyOptions);
                }));
            } else {
              this._costingInfoTab.
                onGeographyFieldUpdate([{ "label": this.nls.costingInfo.noneValue, "value": "" }]);
            }
          }
        }));
    },

    /**
     * This function is used to initialize layer settings
     * @memberOf setting/Settings
     */
    _initLayerSettings: function () {
      this._layerSettingsTab = new LayerSettings({
        nls: this.nls,
        map: this.map,
        config: this.config,
        layerInfosObj: this._layerInfosObj
      });
      this._layerSettingsTab.placeAt(this.layerSettingsNode);
      on(this._layerSettingsTab, "onLayerSettingUpdate",
        lang.hitch(this, function (checkedRowdetails) {
          // functionality implemented to handle editable layers in costing info tab
          // current selected rows id and checkbox status
          this._costingInfoTab._updateCostingInfoTable(checkedRowdetails);
          // for statistics tab
          this._statisticsSettingsTab._updateStatisticsTable(checkedRowdetails);
        }));
    },

    /**
     * This function is used to initialize costing info
     * @memberOf setting/Settings
     */
    _initCostingInfo: function () {
      this._costingInfoTab = new CostingInfo({
        nls: this.nls,
        map: this.map,
        config: this.config,
        layerInfosObj: this._layerInfosObj
      });
      this._costingInfoTab.placeAt(this.costingInfoNode);
    },

    /**
     * This function is used to initialize statistics settings
     * @memberOf setting/Settings
     */
    _initStatisticsSettings: function () {
      this._statisticsSettingsTab = new StatisticsSettings({
        nls: this.nls,
        map: this.map,
        config: this.config,
        layerInfosObj: this._layerInfosObj,
        showActionButtonsInColumn: true,
        showActionButtonsInRow: false
      });
      this._statisticsSettingsTab.placeAt(this.statisticsSettingsNode);
    },

    /**
     * This function is used to display the information/error message
     * @memberOf setting/Settings
     */
    _showMessage: function (msg) {
      var alertMessage = new Message({
        message: msg
      });
      alertMessage.message = msg;
    }
  });
});