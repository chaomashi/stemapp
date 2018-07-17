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
    'dojo/on',
    'dojo/query',
    'dojo/_base/declare',
    'jimu/BaseWidgetSetting',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/html',
    'dojo/_base/lang',
    'dojo/Deferred',
    'esri/layers/FeatureLayer',
    './templatePopup',
    '../DijitFactory',
    './DijitSettingFactory',
    'jimu/dijit/GridLayout',
    'jimu/dijit/DataSource',
    'jimu/dijit/_DataSourcePopup',
    'jimu/dijit/ViewStack',
    'jimu/dijit/Message',
    'jimu/dijit/Popup',
    'jimu/utils',
    'jimu/DataSourceManager',
    'jimu/LayerInfos/LayerInfos',
    '../utils',
    'libs/storejs/store',
    'jimu/dijit/CheckBox',
    'esri/tasks/query',
    'esri/tasks/QueryTask',
    'dijit/form/ValidationTextBox'
  ],
  function(on, query, declare, BaseWidgetSetting, _WidgetsInTemplateMixin, html, lang, Deferred,
    FeatureLayer, templatePopup, DijitFactory, DijitSettingFactory, GridLayout, DataSource,
    _DataSourcePopup, ViewStack, Message, Popup, jimuUtils, DataSourceManager, LayerInfos,
    igUtils, store, CheckBox, EsriQuery, QueryTask) {

    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-infographic-setting',
      dijits: null,
      dijitSettings: null,
      _dataSource: null,
      dataSourceManager: null,
      layerInfosObj: null,

      _initLayout: null,
      _initVisiblity: {},
      _chartTempConfig: null,
      postMixInProperties: function() {
        this.inherited(arguments);

        lang.mixin(this.nls, window.jimuNls.common);
        lang.mixin(this.nls, window.jimuNls.timeUnit);
        this.dataSourceManager = DataSourceManager.getInstance();
        this.layerInfosObj = LayerInfos.getInstanceSync();
      },

      postCreate: function() {
        this.inherited(arguments);

        DijitSettingFactory.setNls(this.nls);
        DijitSettingFactory.setMap(this.map);
        DijitSettingFactory.setAppConfig(this.appConfig);
        DijitSettingFactory.setContext({
          folderUrl: this.folderUrl
        });
        DijitFactory.setNls(this.nls);
        DijitFactory.setMap(this.map);
        DijitFactory.setInSettingPage(true);
        DijitFactory.setAppConfig(this.appConfig);
        DijitFactory.setContext({
          folderUrl: this.folderUrl
        });

        this._initUI();
        this._initEvents();

        if (this.config) {
          this._initLayout = this.config.layout;
          if (this.config.dijits && this.config.dijits.length) {
            this.config.dijits.forEach(lang.hitch(this, function(d) {
              this._initVisiblity[d.id] = d.visible;
            }));
          }
          this.setConfig(this.config);
        }
      },

      setConfig: function(config) {
        this.config = config;
      },

      startup: function() {
        this.inherited(arguments);
        //if has dijits, create dijit ,settings and setData source
        if (this.config && this.config.dijits && this.config.dijits.length) { //means configured
          this._createDijitsSettings();
          this._setDataSource(this.config.dataSource);
        } else {
          //if don not has config, choose a template
          this._chooseTemplate();
        }
      },

      onDataSourceDataUpdate: function(data) {
        this.dijitSettings.forEach(lang.hitch(this, function(dijitSetting) {
          if (dijitSetting && typeof dijitSetting.setFeatures === 'function') {
            dijitSetting.setFeatures(data.features);
          }
        }));

        this.dijits.forEach(lang.hitch(this, function(dijit) {
          dijit.onDataSourceDataUpdate(data);
        }));
      },

      _initUI: function() {
        this.settingsViewStack = new ViewStack({
          viewType: 'dom',
          views: []
        }, this.settingContent);
        this.settingsViewStack.addView(this.settingTip);
        //set chekbox label
        this.dataSourceUseSelection.setLabel(this.nls.useDataSourceSelection);
        this.dataSourceFilterByExtent.setLabel(this.nls.dataSourceFilterByExtent);
      },

      _initEvents: function() {
        //init preview visualControllers event
        this.own(on(this.visualContainer, 'click', lang.hitch(this, function(event) {
          var target = event.target || event.srcElement;
          var vaildDom = null;
          if (html.hasClass(target, 'visual-controller')) {
            vaildDom = target;
          } else if (html.hasClass(target.parentElement, 'visual-controller')) {
            vaildDom = target.parentElement;
          } else {
            return;
          }
          this._switchingControllerStateByDomNode(vaildDom);
        })));
      },

      _createDijitsSettings: function() {
        this._createDijits();
        this._createSettings();
        this._switchSettingsView(0);
      },

      _createDijits: function() {
        if (this.dijits && this.dijits.length > 0) {
          this.dijits.forEach(lang.hitch(this, function(dijit) {
            dijit.destroy();
          }));
          this.dijits = [];
        } else {
          this.dijits = [];
        }
        if (this.layout) {
          this.layout.destroy();
          this.layout = null;
        }

        var dijitsForLayout = this.config.dijits.map(function(d, index) {
          var dijit = DijitFactory.createDijit(d);
          this._createVisualControllerForDijit(d, index);
          this.dijits.push(dijit);
          return {
            id: d.id,
            visible: d.visible,
            dijit: dijit
          };
        }, this);

        this.layout = new GridLayout({
          components: dijitsForLayout,
          layoutDefinition: this.config.layout.definition,
          container: this.cardContent,
          editable: true
        });

        this.layout.on('mask-click', lang.hitch(this, function(id) {
          this._switchSettingsView(id);
        }));

        this.layout.on('initialised', lang.hitch(this, function() {
          this.dijits.forEach(lang.hitch(this, function(dijit) {
            dijit.startup();
          }));
        }));
      },

      _createVisualControllerForDijit: function(dijit, index) {
        if (!dijit.type || !dijit.id) {
          return;
        }
        var typeClass = "";

        if (dijit.type === 'text') {
          typeClass = 'text-controller';
        } else if (dijit.type === 'image') {
          typeClass = 'image-controller';
        } else if (dijit.type === 'number') {
          typeClass = 'number-controller';
        } else if (dijit.type === 'gauge') {
          typeClass = 'gauge-controller';
        } else if (dijit.type === 'chart') {
          typeClass = 'chart-controller';
        }

        var domStr;
        if (index === 0) {
          domStr = '<div class="visual-controller ' + typeClass + '"><div></div></div>';
        } else {
          domStr = '<div class="visual-controller marginleft10 ' + typeClass + '"><div></div></div>';
        }

        var vaildDom = html.toDom(domStr);

        html.place(vaildDom, this.visualContainer);
        vaildDom.id = dijit.id;

        if (dijit.visible) {
          this._switchingControllerStateByDomNode(vaildDom);
        }
      },

      _switchingControllerStateByDomNode: function(target) {
        if (!target || typeof target.id === 'undefined') {
          return;
        }
        var id = target.id;
        var visualControllerDiv = query('div', target)[0];
        if (html.hasClass(visualControllerDiv, 'controller-selected')) {
          if (this._getSelectedControllersCount() > 1) {
            html.removeClass(visualControllerDiv, 'controller-selected');
            html.removeClass(target, 'visual-controller-selected');
            this._switchDijitView(id, false);
          }
        } else {
          html.addClass(visualControllerDiv, 'controller-selected');
          html.addClass(target, 'visual-controller-selected');
          this._switchDijitView(id, true);
        }
      },

      _switchControllerStateByDijitId: function(visualControllers, id, select) {
        if (!id) {
          return;
        }
        if (visualControllers && visualControllers.length) {
          visualControllers.some(function(visualController) {
            var domId = html.getAttr(visualController, 'id');
            if (domId === id) {
              var visualControllerDiv = query('div', visualController)[0];
              if (select) {
                html.addClass(visualControllerDiv, 'controller-selected');
                html.addClass(visualController, 'visual-controller-selected');
                this._setVisibleToConfigDijit(id, true);
              } else {
                html.removeClass(visualControllerDiv, 'controller-selected');
                html.removeClass(visualController, 'visual-controller-selected');
                this._setVisibleToConfigDijit(id, false);
              }
              return true;
            }
            return false;
          }.bind(this));
        }
      },

      _setVisibleToConfigDijit: function(id, visible) {
        this.config.dijits.some(function(d) {
          if (d.id === id) {
            d.visible = visible;
            return true;
          }
          return false;
        });
      },

      _chooseTemplate: function() {
        var templatepopup = new templatePopup({
          titleLabel: this.nls.chooseTemplatePopupTitle,
          nls: this.nls
        });
        templatepopup.startup();

        this.own(on(templatepopup, 'ok', lang.hitch(this, function(template) {
          templatepopup.close();
          templatepopup = null;
          //clear preview visualControllers
          html.empty(this.visualContainer);
          //handle template config
          this.config = this._createConfigFromTemplate(template);
          //set template name to config, e.g. Stacked bar
          this.config.name = template.name;
          //Init UI by config
          this._createDijitsSettings();

          //choose data source
          if (!this._dataSource) {
            this._onBtnDataSourceClicked();
          } else {
            this._setDataSource(this._dataSource);
          }
        })));

        this.own(on(templatepopup, 'cancel', lang.hitch(this, function() {
          templatepopup.close();
          templatepopup = null;
        })));
      },

      _clearPreDataSourceForDijitSetting: function(dataSource) {
        this.dijitSettings.forEach(lang.hitch(this, function(dijitSetting) {
          if (typeof dijitSetting.clearPreDataSource === 'function') {
            dijitSetting.clearPreDataSource(dataSource);
          }
        }));
      },

      _setDataSource: function(dataSource) {
        var isVaild = this._checkDataSourceIsVaild(dataSource);
        if (!isVaild) {
          return;
        }
        if (!this._dataSource) {
          this._dataSource = dataSource;
        }
        this.shelter.show();
        this._tryGetLayerObject(dataSource).then(lang.hitch(this, function() {
          this.shelter.hide();
          this.urlTextBox.set('value', dataSource.name);
          this._updateFilterByExtentState(dataSource);
          this._updateUseSelectionState(dataSource);

          // Set data source to each dijit setting
          this.dijitSettings.forEach(lang.hitch(this, function(dijitSetting) {
            dijitSetting.setDataSource(dataSource);
          }));
          // Set data source to each dijit
          this.dijits.forEach(lang.hitch(this, function(dijit) {
            dijit.setDataSource(dataSource);
          }));
          //For preview purpose, we only fetch data once.
          this.getFeaturesByDataSource(dataSource).then(function(features) {
            this.onDataSourceDataUpdate({
              features: features
            });
          }.bind(this));
        }, lang.hitch(this, function(error) {
          this.shelter.hide();
          console.error(error.message || error);
        })));
      },

      _tryGetLayerObject: function(dataSource) {
        var deferred = new Deferred();
        if (dataSource.dataSourceType === "DATA_SOURCE_FEATURE_LAYER_FROM_MAP") {
          var layerInfo = this.layerInfosObj.getLayerInfoById(dataSource.layerId);
          if (!layerInfo) {
            deferred.reject('Can not get layerInfo by the layer id of this data source.');
            return deferred;
          }
          return layerInfo.getLayerObject();
        } else {
          deferred.resolve();
          return deferred;
        }
      },

      _isLayerOnDemandMode: function(dataSource) {
        if (!dataSource || typeof dataSource.layerId === 'undefined') {
          return;
        }
        var layer = this.map.getLayer(dataSource.layerId);
        return layer && layer.currentMode === FeatureLayer.MODE_ONDEMAND;
      },

      _updateExtentStateForMapLayer: function(dataSource, chartConfig) {
        var isOndemandMode = this._isLayerOnDemandMode(dataSource);

        if (!isOndemandMode) {
          return;
        }

        var dsSupportsServerStatByExtent = this._isDataSourceSupportServerStatByExtent(dataSource);

        var dijitSupportServerStat = this._isDijitSupportServerStat(chartConfig);

        if (dsSupportsServerStatByExtent && dijitSupportServerStat) {
          this.dataSourceFilterByExtent.setStatus(true);
          this.dataSourceFilterByExtent.setValue(!!dataSource.filterByExtent);
        } else {
          this.dataSourceFilterByExtent.setStatus(true);
          this.dataSourceFilterByExtent.setValue(true);
          this.dataSourceFilterByExtent.setStatus(false);
        }
      },

      _isDataSourceSupportServerStatByExtent: function(dataSource) {
        if (!dataSource || typeof dataSource.layerId === 'undefined') {
          return false;
        }
        var layerInfo = this.layerInfosObj.getLayerInfoById(dataSource.layerId);
        var layerObject = layerInfo && layerInfo.layerObject;
        if (!layerObject) {
          return false;
        }

        //layer version >= 10.1 sp1(10.11)
        var versionThanSP1 = layerObject.version && Number(layerObject.version) >= 10.11;

        var hasSupportStatCapability = false;
        if (layerObject.advancedQueryCapabilities) {
          hasSupportStatCapability = !!layerObject.advancedQueryCapabilities.supportsStatistics;
        } else {
          hasSupportStatCapability = !!layerObject.supportsStatistics;
        }
        return versionThanSP1 && hasSupportStatCapability;
      },

      _isDijitSupportServerStat: function(chartConfig) {
        //gauge and number template, return true
        if (!chartConfig) {
          return true;
        }
        return chartConfig.mode === 'feature' ? false : !chartConfig.dateConfig;
      },

      _updateFilterByExtentState: function(dataSource, chartConfig) {
        if (dataSource.dataSourceType === 'DATA_SOURCE_FEATURE_LAYER_FROM_MAP') {
          if (!chartConfig) {
            chartConfig = this._chartTempConfig;
          }
          this._updateExtentStateForMapLayer(dataSource, chartConfig);
        } else {
          this.dataSourceFilterByExtent.setStatus(true);

          var dsConfig = this.appConfig.dataSource.dataSources[dataSource.frameWorkDsId];
          if (dsConfig && dsConfig.filterByExtent) {
            this.dataSourceFilterByExtent.setValue(true);
          } else {
            this.dataSourceFilterByExtent.setValue(false);
          }
          this.dataSourceFilterByExtent.setStatus(false);
        }
      },

      _updateUseSelectionState: function(dataSource) {
        if (dataSource.dataSourceType === 'DATA_SOURCE_FEATURE_LAYER_FROM_MAP') {
          this.dataSourceUseSelection.setStatus(true);

          if (typeof dataSource.useSelection === 'undefined') {
            this.dataSourceUseSelection.setValue(true);
          }

          if (dataSource.useSelection) {
            this.dataSourceUseSelection.setValue(true);
          }
        } else {
          this.dataSourceUseSelection.setStatus(true);
          this.dataSourceUseSelection.setValue(false);
          this.dataSourceUseSelection.setStatus(false);
        }
      },

      getFeaturesByDataSource: function(dataSource) {
        this.shelter.show();
        return this._getFeaturesByDataSource(dataSource).then(function(featureSet) {
          this.shelter.hide();
          var features = featureSet && featureSet.features;
          if (!features) {
            this.features = [];
          }
          if (features && features.length > 1000) {
            features = features.slice(0, 1000);
          }
          this.features = null;
          this.features = features;
          return features;
        }.bind(this), function(error) {
          this.shelter.hide();
          console.error(error.message || error);
        }.bind(this));
      },

      _getFeaturesByDataSource: function(dataSource) {
        var deferred = new Deferred();

        //this.config.dataSource: {dataSourceType,frameWorkDsId,name,useSelection}
        if (dataSource.dataSourceType === "DATA_SOURCE_FEATURE_LAYER_FROM_MAP") {
          var layerInfo = this.layerInfosObj.getLayerInfoById(dataSource.layerId);
          if (!layerInfo) {
            deferred.reject('Can not get layerInfo by the layer id of this data source.');
            return deferred;
          }
          var url = layerInfo.getUrl();
          var filter = layerInfo.getFilter();
          if (!url) {
            deferred.reject('Invaild layer url of data source.');
            return deferred;
          }
          var queryParams = new EsriQuery();
          queryParams.outSpatialReference = this.map.spatialReference;
          queryParams.where = filter || "1=1";
          queryParams.outFields = ['*'];
          queryParams.returnGeometry = false;
          var queryTask = new QueryTask(url);
          return queryTask.execute(queryParams);

        } else if (dataSource.dataSourceType === "DATA_SOURCE_FROM_FRAMEWORK") {

          var dataSourceConfig = this.dataSourceManager.getDataSourceConfig(dataSource.frameWorkDsId);

          if (!dataSourceConfig) {
            deferred.reject('Can not get vaild data source config by the frameWorkDsId of this data source.');
            return deferred;
          }
          //remove filter by extent
          dataSourceConfig.filterByExtent = false;
          return this.dataSourceManager.doQuery(dataSourceConfig);
        }
      },

      //Gets the number of dijit to display
      _getSelectedControllersCount: function() {
        return query('.controller-selected', this.visualContainer).length;
      },

      _checkDataSourceIsVaild: function(dataSource) {
        if (!igUtils.checkDataSourceIsVaild(dataSource, this.map, this.appConfig)) {
          this._disableDataSourceOption();
          this._clearPreDataSourceForDijitSetting(dataSource);
          return false;
        } else {
          this._enableDataSourceOption();
          return true;
        }
      },

      _disableDataSourceOption: function() {
        this.dataSourceUseSelection.setStatus(false);
        this.dataSourceFilterByExtent.setStatus(false);
        this.urlTextBox.reset();
      },

      _enableDataSourceOption: function() {
        this.dataSourceUseSelection.setStatus(true);
        this.dataSourceFilterByExtent.setStatus(true);
        this.urlTextBox.reset();
      },

      //Toggle the display and hide of a dijit
      _switchDijitView: function(id, isDisplay) {
        if (this.layout) {
          this.layout.setVisible(id, isDisplay);
        }
        this._setVisibleToConfigDijit(id, isDisplay);
      },

      //Toggle the show and hide of a dijit's setting
      _switchSettingsView: function(label) {
        this.settingsViewStack.switchView(label);
      },

      _createSettings: function() {
        if (this.dijitSettings && this.dijitSettings.length) {
          this.dijitSettings.forEach(lang.hitch(this, function(dijitSetting) {
            this.settingsViewStack.removeView(dijitSetting);
            dijitSetting.destroy();
          }));
        }

        this.dijitSettings = null;
        //get chart dijit template config
        this.config.dijits.some(function(d) {
          if (d.type === 'chart') {
            this._chartTempConfig = lang.clone(d.config);
            if (!this._chartTempConfig.mode) {
              this._chartTempConfig.mode = 'feature';
            }
            return true;
          }
          return false;
        }.bind(this));
        this.dijitSettings = this.config.dijits.map(lang.hitch(this, function(d) {
          var dijitSetting = DijitSettingFactory.createDijitSetting(d, this.config.name);
          if (d.type === 'chart') {
            //bind chartSettingChanged event for chart dijit setting
            this.own(on(dijitSetting, 'chartSettingChanged', function(chartConfig) {
              this._updateExtentStateForMapLayer(this._dataSource, chartConfig);
            }.bind(this)));
          }
          dijitSetting.label = d.id;
          this.settingsViewStack.addView(dijitSetting);
          return dijitSetting;
        }));
      },

      _createConfigFromTemplate: function(template) {
        var config = this._fixDijitId(template);

        this._initLayout = template.layout;

        template.dijits.forEach(lang.hitch(this, function(d) {
          this._initVisiblity[d.id] = d.visible;
        }));

        this._setDefaultColor(config);

        if (this.config.dataSource) {
          config.dataSource = this.config.dataSource;
        }
        return config;
      },

      _fixDijitId: function(config) {
        var idPrefix = this._getWid();
        this._visitContent(config.layout.definition, function(componentState) {
          componentState.id = idPrefix + '-' + componentState.id;
        });

        config.dijits.forEach(function(dijitJson) {
          dijitJson.id = idPrefix + '-' + dijitJson.id;
        }, this);

        config.wid = idPrefix;

        return config;
      },

      _resetToInitControllersState: function() {
        if (!this._initVisiblity) {
          return;
        }

        var initVisiblity = lang.clone(this._initVisiblity);
        var ids = Object.keys(initVisiblity);
        var visualControllers = query('.visual-controller', this.visualContainer);

        if (ids && ids.length) {
          ids.forEach(function(id) {
            var visible = initVisiblity[id];
            this._switchControllerStateByDijitId(visualControllers, id, visible);
          }.bind(this));
        }
        visualControllers = null;
        initVisiblity = null;
      },

      _onResetLayoutClicked: function() {
        this._resetToInitControllersState();
        this.layout.restoreLayout();
      },

      _getWid: function() {
        //wid is like widget id, which is ued to identify widget.
        //we can't use widget id because the new added widget does not have id.
        return jimuUtils.getRandomString();
      },

      /**
       * set all dijits default background and font color to fit the theme
       */
      _setDefaultColor: function(config) {
        var bgColor, color,
          gaugeColor = '#12DDF9',
          gaugeTextColor = '#12DDF9',
          gaugeLabelColor = '#fff',
          gaugeBgColor = '#1E5F6F';

        if (this.appConfig.theme.name === 'DashboardTheme' &&
          (this.appConfig.theme.styles[0] === 'default' || this.appConfig.theme.styles[0] === 'style3')) {
          bgColor = '#222222';
          color = '#fff';
        } else if (this.appConfig.theme.name === 'DartTheme') {
          bgColor = '#4c4c4c';
          color = '#fff';
        } else {
          return;
        }

        this._setDefaultBackgroundColor(config, bgColor);
        this._setDefaultTextColor(config, color);
        this._setGaugeColor(config, gaugeColor, gaugeTextColor, gaugeLabelColor, gaugeBgColor);
      },

      _setGaugeColor: function(config, gaugeColor, gaugeTextColor, gaugeLabelColor, gaugeBgColor) {
        config.dijits.forEach(function(dijitJson) {
          var dijitConfig = dijitJson.config;
          if (!dijitConfig || dijitJson.type !== 'gauge') {
            return;
          }
          //gauge color
          if (dijitConfig.display) {
            if (!dijitConfig.display.gaugeColor) {
              dijitConfig.display.gaugeColor = gaugeColor;
            }
          } else {
            dijitConfig.display = {
              gaugeColor: gaugeColor,
              dataLabels: {
                textColor: gaugeTextColor
              }
            };
          }
          //data label text color
          if (dijitConfig.display.dataLabels) {
            if (!dijitConfig.display.dataLabels.textColor) {
              dijitConfig.display.dataLabels.textColor = gaugeLabelColor;
            } else {
              dijitConfig.display.dataLabels = {
                textColor: gaugeLabelColor
              };
            }
          }
          //current value text color
          if (dijitConfig.display.currentValue) {
            if (dijitConfig.display.currentValue.font) {
              if (!dijitConfig.display.currentValue.font.textColor) {
                dijitConfig.display.currentValue.font.textColor = gaugeTextColor;
              }
            } else {
              dijitConfig.display.currentValue.font = {
                textColor: gaugeTextColor
              };
            }
          }
          //gauge bg color
          dijitConfig.display.bgColor = gaugeBgColor;
        }, this);
      },

      _setDefaultBackgroundColor: function(config, bgColor) {
        config.dijits.forEach(function(dijitJson) {
          var dijitConfig = dijitJson.config;
          if (!dijitConfig) {
            return;
          }
          switch (dijitJson.type) {
            case 'text':
            case 'image':
            case 'number':
              if (dijitConfig.background) {
                if (!dijitConfig.background.backgroundColor) {
                  dijitConfig.background.backgroundColor = bgColor;
                }
              } else {
                dijitConfig.background = {
                  backgroundColor: bgColor
                };
              }
              break;
            case 'chart':
              if (!dijitConfig.backgroundColor) {
                dijitConfig.backgroundColor = bgColor;
              }
              break;
            case 'gauge':
              if (dijitConfig.display) {
                if (!dijitConfig.display.backgroundColor) {
                  dijitConfig.display.backgroundColor = bgColor;
                }
              } else {
                dijitConfig.display = {
                  backgroundColor: bgColor
                };
              }
              break;
          }
        }, this);
      },

      _setDefaultTextColor: function(config, color) {
        config.dijits.forEach(function(dijitJson) {
          var dijitConfig = dijitJson.config;
          if (!dijitConfig) {
            return;
          }
          switch (dijitJson.type) {
            case 'text':
            case 'number':
              if (dijitConfig.font) {
                if (!dijitConfig.font.textColor) {
                  dijitConfig.font.textColor = color;
                }
              } else {
                dijitConfig.font = {
                  textColor: color
                };
              }
              break;
            case 'chart':
              if (!dijitConfig.legendTextColor) {
                dijitConfig.legendTextColor = color;
              }
              if (dijitConfig.type === 'pie') {
                if (!dijitConfig.dataLabelColor) {
                  dijitConfig.dataLabelColor = color;
                }
              } else {
                if (!dijitConfig.horizontalAxisTextColor) {
                  dijitConfig.horizontalAxisTextColor = color;
                }
                if (!dijitConfig.verticalAxisTextColor) {
                  dijitConfig.verticalAxisTextColor = color;
                }
              }
              break;
            case 'gauge':
              break;
          }
        }, this);
      },

      _visitContent: function(content, cb) {
        content.forEach(function(item) {
          if (item.type === 'component') {
            cb(item.componentState);
          } else {
            if (item.content) {
              this._visitContent(item.content, cb);
            }
          }
        }, this);
      },

      getConfig: function() {
        if (!this._dataSource && this._hasNecessaryDijit()) {
          new Message({
            message: this.nls.dataSourceNotSet
          });
          return false;
        }

        if (this._dataSource) {
          this.config.dataSource = this._dataSource;
          this.config.dataSource.useSelection = this.dataSourceUseSelection.getValue();
          this.config.dataSource.filterByExtent = this.dataSourceFilterByExtent.getValue();
        }

        var isValid = true;

        this.config.dijits.forEach(function(d) {
          var dijitSetting = DijitSettingFactory.getDijitSetting(d);
          d.config = dijitSetting.getConfig(true);
          if (!d.config) {
            isValid = false;
          }
        }, this);

        if (!isValid) {
          return false;
        }
        this.config.layout.definition = this.layout.getLayoutDefinition();
        return this.config;
      },

      _hasNecessaryDijit: function() {
        return this.config.dijits.filter(function(d) {
          return ['chart', 'gauge', 'number'].indexOf(d.type) > -1;
        }).length > 0;
      },

      _onBtnDataSourceClicked: function() {
        var args = {
          // titleLabel: this.nls.setDataSource,
          dijitArgs: {
            types: DataSource.createInfographicTypes({
              createMapResponse: this.map.webMapResponse,
              appConfig: this.appConfig
            }),
            style: {
              height: '100%'
            }
          }
        };

        var dataSourcePopup = new _DataSourcePopup(args);
        this.own(on(dataSourcePopup, 'ok', lang.hitch(this, function(item) {
          this._dataSource = {
            dataSourceType: item.dataSourceType,
            name: item.name
          };
          if (item.dataSourceType === 'DATA_SOURCE_FEATURE_LAYER_FROM_MAP') {
            this._dataSource.layerId = item.layerInfo.id;
          } else if (item.dataSourceType === 'DATA_SOURCE_FROM_FRAMEWORK') {
            this._dataSource.frameWorkDsId = item.dsId;
          }
          this.urlTextBox.set('value', this._dataSource.name);
          this._setDataSource(this._dataSource);

          dataSourcePopup.close();
          dataSourcePopup = null;
        })));
        this.own(on(dataSourcePopup, 'cancel', lang.hitch(this, function() {
          dataSourcePopup.close();
          dataSourcePopup = null;
        })));

        dataSourcePopup.startup();
      },

      _onChooseTemplateClick: function() {
        if (store.get('widgets_Infographic_notShowTemplateWarning') &&
          store.get('widgets_Infographic_notShowTemplateWarning') === true) {
          this._chooseTemplate();
        } else {
          var content = html.create('div', {
            innerHTML: '<div>' + this.nls.changeTemplateWarning + '</div>'
          });
          var checkBox = new CheckBox({
            label: this.nls.donNotShowAgain,
            style: {
              marginTop: '90px'
            }
          });
          html.place(checkBox.domNode, content);

          this.own(on(checkBox, 'change', function(check) {
            if (check) {
              store.set('widgets_Infographic_notShowTemplateWarning', true);
            }
          }));
          var pop = new Popup({
            content: content,
            width: 380,
            height: 300,
            buttons: [{
              label: this.nls.ok,
              onClick: lang.hitch(this, function() {
                this._chooseTemplate();
                pop.close();
              })
            }, {
              label: this.nls.cancel,
              onClick: lang.hitch(this, function() {
                pop.close();
              })
            }]
          });
        }
      }
    });
  });