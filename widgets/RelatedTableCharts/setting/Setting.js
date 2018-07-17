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
    'jimu/dijit/Popup',
    'dojo/_base/lang',
    './LayerChooser',
    './ChartSetting',
    './GeneralSetting',
    'dojo/on',
    'dojo/dom-construct',
    'jimu/dijit/Message',
    'jimu/dijit/SimpleTable',
    "jimu/dijit/TabContainer3",
    "./SearchSourceSettings"
],
  function (declare, BaseWidgetSetting, _WidgetsInTemplateMixin,
    Popup, lang, LayerChooser, ChartSetting, GeneralSetting, on,
    domConstruct, Message, SimpleTable, TabContainer3, SearchSourceSettings) {

    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-RelatedTableCharts-setting',

      generalSettings: null,
      currentChartSettings: null,
      startup: function () {
        //create search source settings tab content
        this._createSearchSourceSettings();
        //create General settings content
        this._initGeneralSettingsTab();
      },

      postMixInProperties: function () {
        //mixin default nls with widget nls
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
      },

      postCreate: function () {
        // create table for chart list
        this._createChartListTable();
        //the config object is passed in
        this.setConfig(this.config);
        //initialize tabs
        this._initTabs();

      },

      /**
      * create table to contain chart list
      * @memberOf widgets/RelatedTableCharts/setting/Setting.js
      */
      _createChartListTable: function () {
        //create field object for table
        var tableFields = [{
          name: "name",
          title: this.nls.chartSettingLabel,
          width: "auto",
          type: "text",
          editable: false
        }, {
          name: "actions",
          title: "",
          width: "70px",
          type: "actions",
          actions: ["up", "down", "delete"]
        }];
        //initialize table widget
        this.chartList = new SimpleTable({
          fields: tableFields,
          autoHeight: false,
          selectable: true,
          style: { height: '100%', top: '0', bottom: '10px' }
        }, this.chartListPanel);
        this.chartList.startup();
        //attach event handler
        on(this.chartList, "row-select", lang.hitch(this, this._onChartItemSelected));
        on(this.chartList, "row-delete", lang.hitch(this, this._onChartItemRemoved));
      },

      setConfig: function (config) {
        var firstChartRow, i, addResult, tr;
        if (config && config !== "" && config.charts) {
          for (i = 0; i < config.charts.length; i++) {
            //add rows to chart list
            addResult = this.chartList.addRow({
              name: config.charts[i].chartConfig.sectionTitle
            });
            //if row is added successfully set layerdetails and chartConfig in row object
            if (addResult.success) {
              tr = addResult.tr;
              tr.layerDetails = lang.clone(config.charts[i].layerDetails);
              tr.chartConfig = lang.clone(config.charts[i].chartConfig);
              //get the object of first row which will be used to select first row by default
              if (i === 0) {
                firstChartRow = tr;
              }
            }
          }
          //select first chart by default
          if (firstChartRow) {
            setTimeout(lang.hitch(this, function () {
              this.chartList.selectRow(firstChartRow);
            }), 500);
          }
        }
      },

      //WAB will get config object through this method
      getConfig: function () {
        var generalSetingsConfig, config, trs, currentConfig, i, tr, eachLayerConfig, searchSources;
        //get chart settings for the current layer
        if (this.currentChartSettings) {
          currentConfig = this.currentChartSettings.getConfig(true);
          if (currentConfig) {
            this.currentChartSettings.tr.chartConfig = lang.clone(
              currentConfig);
          } else {
            return false;
          }
        }
        if (this.generalSettings) {
          generalSetingsConfig = this.generalSettings.getConfig(true);
          if (!generalSetingsConfig) {
            return false;
          }
        }
        //get configured search sources
        searchSources = this._searchSourceSettings.getConfig();
        //check if valid sources are configured
        if (!searchSources || searchSources.sources.length === 0) {
          this._errorMessage(this.nls.errorStrings.invalidSearchSources,
            this.nls.searchSourceSetting.searchSourceSettingTabTitle);
          return false;
        }
        config = {
          "charts": [],
          "generalSettings": generalSetingsConfig,
          "searchSourceSettings": searchSources
        };
        //get all the rows form chart list
        trs = this.chartList.getRows();
        //iterate through all the rows and get layerdetails and configured chart settings, and push into chart array
        for (i = 0; i < trs.length; i++) {
          tr = trs[i];
          eachLayerConfig = {};
          eachLayerConfig.layerDetails = lang.clone(tr.layerDetails);
          eachLayerConfig.chartConfig = lang.clone(tr.chartConfig);
          config.charts.push(eachLayerConfig);
        }
        //clone the config object and return
        this.config = lang.clone(config);
        return config;
      },

      /**
      * This function is used to show popup to choose layers from map
      * @memberOf widgets/RelatedTableCharts/setting/Setting.js
      */
      _onAddNewClicked: function () {
        var layerChooser, param, popup, trs, geometryType;
        // validate if section title is not empty
        if (this.currentChartSettings && this.currentChartSettings.sectionTitleTextBox
          .get('value') === "") {
          this._errorMessage(this.nls.ChartSetting.errMsgSectionTitle);
          return false;
        } else {
          //by default show layers with all geometry types
          geometryType = "*";
          trs = this.chartList.getRows();
          if (trs.length > 0 && trs[0].layerDetails && trs[0].layerDetails.polygonLayerInfo) {
            geometryType = trs[0].layerDetails.polygonLayerInfo.geometryType;
          }
          //create parameter object to initialize layer chooser widget
          param = {
            "nls": this.nls,
            "map": this.map,
            "geometryType": geometryType
          };
          //create instance for layer chooser widget
          layerChooser = new LayerChooser(param);
          //open widget in jimu popup dialog
          popup = new Popup({
            titleLabel: this.nls.layerChooser.title,
            width: 800,
            height: 250,
            content: layerChooser
          });
          //event handlers for layer chooser widget
          layerChooser.onOkClick = lang.hitch(this, function (
          selectedLayerDetails) {
            this._addLayer(selectedLayerDetails);
            popup.close();
          });
          layerChooser.onCancleClick = lang.hitch(this, function () {
            popup.close();
          });
        }
      },

      /**
      * This function creates error alert.
      * @param {string} err
      * @memberOf widgets/RelatedTableCharts/settings/Setting.js
      **/
      _errorMessage: function (err) {
        var errorMessage = new Message({
          message: err
        });
        errorMessage.message = err;
      },

      /**
      * This function is used to add layer to chart list
      * @memberOf widgets/RelatedTableCharts/setting/Setting.js
      */
      _addLayer: function (selectedLayerDetails) {
        var addResult, tr;
        addResult = this.chartList.addRow({
          name: selectedLayerDetails.polygonLayerInfo.title
        });
        if (addResult.success) {
          tr = addResult.tr;
          tr.layerDetails = selectedLayerDetails;
          this.chartList.selectRow(tr);
        }

      },

      /**
      * delete respective chart data when chart item is deleted.
      * @param {object} tr chart container row
      * @memberOf widgets/RelatedTableCharts/settings/Setting.js
      **/
      _onChartItemRemoved: function (tr) {
        var chartRows;
        if (this.currentChartSettings) {
          //Check whether selected row is deleted
          if (this.currentChartSettings.tr === tr) {
            //Destroy selected row from the chart
            this.currentChartSettings.destroy();
            this.currentChartSettings = null;
            //Get available chart rows
            chartRows = this.chartList.getRows();
            if (chartRows.length) {
              //Select first row
              this.chartList.selectRow(chartRows[0]);
            }
          }
        }
      },

      /**
      * display respective chart data when chart item is selected.
      * @param {object} tr chart container row
      * @memberOf widgets/RelatedTableCharts/settings/Setting.js
      **/
      _onChartItemSelected: function (tr) {

        if (this.currentChartSettings) {
          //check whether selected chart is updated
          if (this.currentChartSettings.tr !== tr) {
            var currentConfig = this.currentChartSettings.getConfig(
              true);
            if (currentConfig) {
              //set updated values in selected chart's configuration
              this.currentChartSettings.tr.chartConfig = currentConfig;
              this.currentChartSettings.destroy();
              this.currentChartSettings = null;
              this._createChartSettings(tr);
            } else {
              this.chartList.selectRow(this.currentChartSettings.tr);
            }
          }
        } else {
          this._createChartSettings(tr);
        }
      },

      /**
      * Initialize chart setting to generate charts
      * @param {object} tr chart container row
      * @memberOf widgets/RelatedTableCharts/settings/Setting.js
      **/
      _createChartSettings: function (tr) {
        var args = {
          map: this.map,
          nls: this.nls.ChartSetting,
          config: tr.chartConfig,
          layerDetails: tr.layerDetails,
          tr: tr,
          folderUrl: this.folderUrl,
          appConfig: this.appConfig
        };
        //create chart setting instance
        this.currentChartSettings = new ChartSetting(args, domConstruct
          .create("div", {}, this.chartSettingsContainer));

        this.own(on(this.currentChartSettings, 'sectionTitleChanged',
          lang.hitch(this, function (chartName) {
            this.chartList.editRow(tr, {
              name: chartName
            });
          })));

        this.own(on(this.currentChartSettings, 'showLoadingIndicator',
          lang.hitch(this, function () {
            this.loadingIndicator.show();
          })));

        this.own(on(this.currentChartSettings, 'hideLoadingIndicator',
          lang.hitch(this, function () {
            this.loadingIndicator.hide();
          })));

        this.currentChartSettings.startup();

        //first bind event, then setConfig
        this.currentChartSettings.setConfig(tr.chartConfig);

        return this.currentChartSettings;
      },
      /**
      * This function the initializes jimu tab for setting and layout
      * @memberOf widgets/RelatedTableCharts/setting/Setting
      **/
      _initTabs: function () {
        var chartSettingTab, searchSourceSettingTab, generalSettingsTab, tabs;
        chartSettingTab = {
          title: this.nls.chartSettingLabel,
          content: this.chartTabNode
        };
        searchSourceSettingTab = {
          title: this.nls.searchSourceSettingLabel,
          content: this.searchSourceTabNode
        };
        generalSettingsTab = {
          title: this.nls.generalSettingLabel,
          content: this.generalTabNode
        };
        tabs = [chartSettingTab, searchSourceSettingTab, generalSettingsTab];
        this.tab = new TabContainer3({
          "tabs": tabs,
          "class": "esriCTFullHeight"
        });
        // Handle tabChanged event and set the scroll position to top
        this.own(on(this.tab, "tabChanged", lang.hitch(this, function () {
          this.tab.containerNode.scrollTop = 0;
        })));
        this.tab.placeAt(this.tabDiv);
      },
      /**
      * This function the initializes general setting tab content
      * @memberOf widgets/RelatedTableCharts/setting/Setting
       */
      _initGeneralSettingsTab: function () {
        //create general settings
        this.generalSettings = new GeneralSetting({
          "nls": this.nls.GeneralSetting,
          "config": this.config.generalSettings
        });
        this.generalSettings.placeAt(this.generalSettingsContainer);
      },

      /**
      * This function the initializes search source setting tab container
      * @memberOf widgets/RelatedTableCharts/setting/Setting
      **/
      _createSearchSourceSettings: function () {
        var searchSourceConfig = {};
        //if has valid sources set that as prev config
        if (this.config && this.config.hasOwnProperty('searchSourceSettings')) {
          searchSourceConfig = this.config.searchSourceSettings;
        }
        this._searchSourceSettings = new SearchSourceSettings({
          nls: this.nls,
          map: this.map,
          appConfig: this.appConfig,
          shelter: this.loadingIndicator,
          config: searchSourceConfig
        }, domConstruct.create("div", {}, this.searchSourceTabNode));
        this.own(on(this._searchSourceSettings, "invalid-source-setting",
          lang.hitch(this, function () {
            this._errorMessage(this.nls.errorStrings.invalidSearchSources);
          })));
      }
    });
  });

