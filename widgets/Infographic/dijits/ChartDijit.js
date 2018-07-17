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
  'dojo/_base/lang',
  'dojo/_base/html',
  'dojo/_base/array',
  'dojo/_base/declare',
  'dojo/Deferred',
  './BaseDijit',
  'moment/moment',
  'jimu/dijit/_chartDijitOption',
  'jimu/dijit/Chart',
  'jimu/DataSourceManager',
  'jimu/LayerInfos/LayerInfos',
  '../utils'
], function(lang, html, array, declare, Deferred, BaseDijit, moment, ChartDijitOption,
  Chart, DataSourceManager, LayerInfos, igUtils) {
  window.makeTwix(moment);
  var clazz = declare([BaseDijit], {
    templateString: '<div><div data-dojo-attach-point="noDataDiv" class="no-data-tip">${nls.noData}</div>' +
      '<div class="chart-dom" data-dojo-attach-point="chartDomNode"></div>< /div>',
    type: 'chart',
    baseClass: 'infographic-chart-dijit',
    layerInfosObj: null,
    dataSourceManager: null,
    featuresCountForPreview: 50,
    highLightColor: '#00ffff',
    dataSource: null, //{dataSourceType,filterByExtent,layerId,name,useSelection}
    config: null,
    map: null,

    maxTimeIntervals: 10000,
    maxLabels: 10000,
    dataSourceType: '', //CLIENT_FEATURES, FRAMEWORK_FEATURES, FRAMEWORK_STATISTICS
    featureLayer: null, //for CLIENT_FEATURES

    constructor: function(options) {
      this.config = options.config;
      this.layerInfosObj = LayerInfos.getInstanceSync();
      this.dataSourceManager = DataSourceManager.getInstance();
    },

    postCreate: function() {
      this.inherited(arguments);
      this.DEFAULT_CONFIG = {
        type: this.config.type || 'column',
        theme: this._getChartTheme(),
        labels: [],
        series: [{
          data: []
        }]
      };
      this.domNode.style.width = '100%';
      this.domNode.style.height = '100%';
      this.chartDomNode.style.width = '100%';
      this.chartDomNode.style.height = '100%';
      //init chartDijitOption
      var args = {
        map: null
      };
      if (!this.inSettingPage) {
        args.map = this.map;
      }
      this.chartDijitOption = new ChartDijitOption(args);
      //init jimu chart
      this._initChart();

      this._updateBackgroundColor();
    },

    _getChartTheme: function() {
      if (this.isDarkTheme()) {
        return "dark";
      } else {
        return "light";
      }
    },

    clearChart: function() {
      //don't call _clear in this method
      this._showNodata();
    },

    startup: function() {
      this.inherited(arguments);
      setTimeout(lang.hitch(this, function() {
        this.chart.resize();
        if (this.inSettingPage) {
          this._tryRenderChart();
        } else {
          if (this.dataSource) {
            this.setDataSource(this.dataSource);
          }
        }
      }), 200);
    },

    destroy: function() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = null;
      this.inherited(arguments);
    },

    resize: function() {
      if (this.chart) {
        this.chart.resize();
      }
    },

    setDataSource: function(dataSource) {
      this.dataSourceType = '';

      //clear CLIENT_FEATURES
      this.featureLayer = null;

      this.inherited(arguments);

      if (!dataSource) {
        return;
      }

      if (dataSource.layerId) {
        this._setDataSourceForLayerId(dataSource);
      } else if (dataSource.frameWorkDsId) {
        var frameWorkDsId = dataSource.frameWorkDsId;
        //{from: 'map', layerId}
        //{from: 'widget', widgetId}
        //{from: 'external'}
        var dsInfo = this._getDsTypeInfoAndDsMeta(frameWorkDsId);
        var dsTypeInfo = dsInfo.dsTypeInfo;
        this._getPopupInfoForExtralDS(dsTypeInfo);
        var dsMeta = dsInfo.dsMeta;
        if (dsTypeInfo && dsMeta) {
          if (dsMeta.type === 'Features') {
            this._setDataSourceForFrameworkFeatures(dataSource, dsTypeInfo, dsMeta);
          } else if (dsMeta.type === 'FeatureStatistics') {
            this._setDataSourceForFeatureStatistics(dataSource, dsTypeInfo, dsMeta);
          }
        }
      }
    },

    _getPopupInfoForExtralDS: function(dsTypeInfo) {
      if (dsTypeInfo && dsTypeInfo.from === 'map') {
        if (typeof dsTypeInfo.layerId !== 'undefined') {
          var layerInfo = this.layerInfosObj.getLayerInfoById(dsTypeInfo.layerId);
          if (layerInfo) {
            this.popupFieldInfos = layerInfo.getPopupInfo();
          }
        }
      }
    },

    _getDsTypeInfoAndDsMeta: function(frameWorkDsId) {
      var result = {
        dsTypeInfo: null,
        dsMeta: null
      };
      result.dsTypeInfo = this.dataSourceManager.parseDataSourceId(frameWorkDsId);
      var dataSources = this.appConfig.dataSource && this.appConfig.dataSource.dataSources;
      if (dataSources) {
        result.dsMeta = dataSources[frameWorkDsId];
      }
      return result;
    },

    _updateBackgroundColor: function() {
      if (this.config && this.config.backgroundColor) {
        this.setBackgroundColor(this.config.backgroundColor);
      }
    },

    setBackgroundColor: function(bg) {
      this.domNode.style.backgroundColor = bg;
    },

    //chart dijit related config, not widget config
    setConfig: function(config) {
      this.config = config;
      this._updateBackgroundColor();
      this._tryRenderChart();
    },

    onDataSourceDataUpdate: function(data) {
      if (data && typeof data.features !== 'undefined') {
        this.data = data;
        this._hasStatisticsed = !!data.hasStatisticsed;
        this._tryRenderChart();
      }
    },

    _renderChartForStastistics: function(options) {
      var dataSchema = options.dataSchema;
      var chartConfig = options.config;
      var statisticsFeatures = options.statisticsFeatures;
      this.chartDijitOption.getLoadedLayerForSTD(dataSchema, chartConfig).then(function(featureLayer) {
        var chartDijitOptions = {
          featureLayer: featureLayer,
          features: statisticsFeatures,
          chartConfig: chartConfig,
          popupFieldInfos: options.popupFieldInfos,
          featureLayerForChartSymbologyChart: options.featureLayerForChartSymbologyChart
        };
        var chartOptions = this.chartDijitOption.getChartOption(chartDijitOptions, this.chart, true);
        if (!this._checkIsTooManyLabels(chartOptions)) {
          this.chart.updateConfig(chartOptions);
        }
      }.bind(this));

    },

    _renderChart: function(options) {
      var featureLayer = options.featureLayer;
      this.chartDijitOption.getLoadedLayer(featureLayer).then(function(featureLayer) {
        var chartDijitOptions = {
          featureLayer: featureLayer,
          features: options.features,
          filterByExtent: options.filterByExtent,
          chartConfig: options.config,
          popupFieldInfos: options.popupFieldInfos,
          featureLayerForChartSymbologyChart: options.featureLayerForChartSymbologyChart
        };
        var chartOptions = this.chartDijitOption.getChartOption(chartDijitOptions, this.chart, false,
          this._hasStatisticsed);
        if (!this._checkIsTooManyLabels(chartOptions)) {
          this.chart.updateConfig(chartOptions);
        }
      }.bind(this));
    },

    _initChart: function() {
      this.chart = new Chart({
        chartDom: this.chartDomNode,
        config: this.DEFAULT_CONFIG
      });
      this.chart.placeAt(this.chartDomNode);
      setTimeout(lang.hitch(this, function() {
        this.chart.resize();
      }), 300);
    },

    _tryRenderChart: function() {
      this._hideNodata();
      var chartConfig = this._getChartConfigFromConfig();
      if (!chartConfig) {
        this._showNodata();
        return;
      }

      if (!this.domNode.parentNode) {
        this._showNodata();
        return;
      }

      if (this.data) {
        if (!this.data.features) {
          this.data.features = [];
        }
        if (this.dataSourceType === 'CLIENT_FEATURES') {
          this._tryRenderChartForClientFeatures(chartConfig);
        } else if (this.dataSourceType === 'FRAMEWORK_FEATURES') {
          this._tryRenderChartForFrameworkFeatures(chartConfig);
        } else if (this.dataSourceType === 'FRAMEWORK_STATISTICS') {
          this._tryRenderChartForFrameworkStatistics(chartConfig);
        }
      } else {
        this._showNodata();
      }
    },

    _getNodataTextColor: function() {
      var color = '';
      if (this.config) {
        if (this.config.type === 'pie') {
          color = this.config.dataLabelColor;
        } else {
          color = this.config.horizontalAxisTextColor || this.config.verticalAxisTextColor;
        }
      }
      if (!color) {
        color = '#666';
      }
      return color;
    },

    _getChartConfigFromConfig: function() {
      var chartConfig = null,
        config = null;
      if (this.config && this.config.mode && this.config.type) {
        config = lang.clone(this.config);
        config.highLightColor = this.highLightColor;

        chartConfig = igUtils.getCleanChartConfig(config);
      }
      this._specialSortOrder(chartConfig);
      return chartConfig;
    },

    _specialSortOrder: function(chartConfig) {
      if (!chartConfig) {
        return;
      }
      var mode = chartConfig.mode;
      var sortOrder = chartConfig.sortOrder;
      if (mode === 'feature' && sortOrder && sortOrder.field === chartConfig.labelField) {
        sortOrder.isLabelAxis = true;
      }
    },

    _hasFeatures: function() {
      return this.data && this.data.features && this.data.features.length >= 0;
    },

    showNoData: function() {
      this._showNodata();
    },

    _showNodata: function(type) { //type:timeInterval,maxLabels
      html.addClass(this.domNode, 'no-data');
      if (type === 'timeInterval') {
        this.noDataDiv.innerHTML = this.nls.parsingperiodTip;
      } else if (type === 'maxLabels') {
        this.noDataDiv.innerHTML = this.nls.manyCategoryTip;
      }
      this.chart.clear();
    },

    _hideNodata: function() {
      html.removeClass(this.domNode, 'no-data');
    },

    _showMockData: function(chartConfig) {
      chartConfig = lang.clone(chartConfig);
      var fieldNames = [];
      if (chartConfig.labelField) {
        fieldNames.push(chartConfig.labelField);
      }
      if (chartConfig.categoryField) {
        fieldNames.push(chartConfig.categoryField);
      }
      if (chartConfig.valueFields) {
        fieldNames = fieldNames.concat(chartConfig.valueFields);
      }
      var mockDefinition = {
        fields: []
      };
      var mockFeature = {
        attributes: {}
      };
      mockDefinition.fields = array.map(fieldNames, lang.hitch(this, function(fieldName) {
        mockFeature.attributes[fieldName] = 0;
        return {
          name: fieldName,
          type: 'esriFieldTypeInteger',
          alias: fieldName
        };
      }));

      this.chart.resize();
      if (this._checkIsTooManyTimeInterval([mockFeature], chartConfig)) {
        return this._showNodata('timeInterval');
      }

      var options = {
        featureLayer: mockDefinition,
        features: [mockFeature],
        config: chartConfig,
        popupFieldInfos: this.popupFieldInfos
      };
      this._renderChart(options);
    },

    //--------------------------------------CLIENT_FEATURES-------------------------------------------

    _setDataSourceForLayerId: function(dataSource) {
      this.dataSourceType = 'CLIENT_FEATURES';
      this._getFeatureLayerAndPopupInfoForMapLayer(dataSource.layerId).then(function(layerObject) {
        this.featureLayer = layerObject;
        this._tryRenderChart();
      }.bind(this), function() {
        console.warn('invaild data source');
      });
    },

    _getFeatureLayerAndPopupInfoForMapLayer: function(layerId) {
      var deferred = new Deferred();
      var layerInfo = this.layerInfosObj.getLayerInfoById(layerId);
      if (!layerInfo) {
        deferred.reject();
        return deferred;
      }
      this.popupFieldInfos = layerInfo.getPopupInfo();
      return layerInfo.getLayerObject();
    },

    _tryRenderChartForClientFeatures: function(chartConfig) {

      if (!this.featureLayer) {
        this._showNodata();
        return;
      }

      var features = this.data.features;
      if (features && this.inSettingPage) {
        features = features.slice(0, this.featuresCountForPreview);
      }

      this.chart.resize();
      if (this._checkIsTooManyTimeInterval(features, chartConfig)) {
        return this._showNodata('timeInterval');
      }
      var featureLayerForChartSymbologyChart = this._getFeatureLayerForSymbolRenderChart();

      var options = {
        featureLayer: this.featureLayer,
        features: features,
        config: chartConfig,
        popupFieldInfos: this.popupFieldInfos,
        featureLayerForChartSymbologyChart: featureLayerForChartSymbologyChart,
        filterByExtent: this.dataSource.filterByExtent
      };
      this._renderChart(options);
    },

    //--------------------------------------FRAMEWORK_FEATURES----------------------------------------------

    _setDataSourceForFrameworkFeatures: function() {
      this.dataSourceType = 'FRAMEWORK_FEATURES';
      this._tryRenderChart();
    },

    _getFeatureLayerForSymbolRenderChart: function(layerId) {
      var featureLayerForChartSymbologyChart = null;
      if (this.map && typeof layerId !== 'undefined') {
        featureLayerForChartSymbologyChart = this.map.getLayer(layerId);
      } else if (this.featureLayer) {
        featureLayerForChartSymbologyChart = this.featureLayer;
      }
      return featureLayerForChartSymbologyChart;
    },

    _tryRenderChartForFrameworkFeatures: function(chartConfig) {
      var dsInfo = this._getDsTypeInfoAndDsMeta(this.dataSource.frameWorkDsId);
      var dsMeta = dsInfo.dsMeta;
      if (!dsMeta) {
        this._showNodata();
        return;
      }

      var features = this.data.features;
      if (features && this.inSettingPage) {
        features = features.slice(0, this.featuresCountForPreview);
      }

      this.chart.resize();
      if (this._checkIsTooManyTimeInterval(features, chartConfig)) {
        return this._showNodata('timeInterval');
      }
      var featureLayerForChartSymbologyChart = null;
      if (chartConfig.seriesStyle && chartConfig.seriesStyle.type === 'layerSymbol') {
        var dsTypeInfo = this.dataSourceManager.parseDataSourceId(dsMeta.id);
        if (typeof dsTypeInfo.layerId !== 'undefined') {
          var layerId = dsTypeInfo.layerId;
          featureLayerForChartSymbologyChart = this._getFeatureLayerForSymbolRenderChart(layerId);
        }
      }

      var options = {
        featureLayer: dsMeta.dataSchema,
        features: features,
        config: chartConfig,
        popupFieldInfos: this.popupFieldInfos,
        featureLayerForChartSymbologyChart: featureLayerForChartSymbologyChart
      };
      this._renderChart(options);
    },

    //--------------------------------------FRAMEWORK_STATISTICS----------------------------------------------

    _setDataSourceForFeatureStatistics: function() {
      this.dataSourceType = 'FRAMEWORK_STATISTICS';
      this._tryRenderChart();
    },

    _tryRenderChartForFrameworkStatistics: function(chartConfig) {
      var dsInfo = this._getDsTypeInfoAndDsMeta(this.dataSource.frameWorkDsId);
      var dsMeta = dsInfo.dsMeta;
      if (!dsMeta) {
        this._showNodata();
        return;
      }

      var featureLayerForChartSymbologyChart = null;
      if (chartConfig.seriesStyle && chartConfig.seriesStyle.type === 'layerSymbol') {
        var dsTypeInfo = this.dataSourceManager.parseDataSourceId(dsMeta.id);
        if (typeof dsTypeInfo.layerId !== 'undefined') {
          var layerId = dsTypeInfo.layerId;
          featureLayerForChartSymbologyChart = this._getFeatureLayerForSymbolRenderChart(layerId);
        }
      }

      this.chart.resize();
      if (this._checkIsTooManyTimeInterval(this.data.features, chartConfig)) {
        return this._showNodata('timeInterval');
      }

      var options = {
        dataSchema: dsMeta.dataSchema,
        statisticsFeatures: this.data.features,
        config: chartConfig,
        popupFieldInfos: this.popupFieldInfos,
        featureLayerForChartSymbologyChart: featureLayerForChartSymbologyChart
      };
      this._renderChartForStastistics(options);
    },

    _checkIsTooManyLabels: function(chartOptions) {
      var labels = chartOptions.labels;
      if (labels && labels.length > this.maxLabels) {
        this._showNodata('maxLabels');
        return true;
      }
      return false;
    },

    _checkIsTooManyTimeInterval: function(features, chartConfig) {
      var dateConfig = chartConfig.dateConfig;
      if (!dateConfig || dateConfig.minPeriod === 'automatic') {
        return false;
      }
      var fieldName = chartConfig.categoryField;

      var times = features.map(lang.hitch(this, function(feature) {
        var attributes = feature.attributes;
        return attributes[fieldName];
      }));
      times = times.filter(function(e) {
        return !!e;
      });

      var minTime = Math.min.apply(Math, times);
      var maxTime = Math.max.apply(Math, times);

      var start = moment(minTime).subtract(1, 'seconds').local();
      var end = moment(maxTime).add(1, 'seconds').local();
      var numbers = Math.round(end.diff(start, dateConfig.minPeriod, true));
      return numbers >= this.maxTimeIntervals;
    }

  });

  return clazz;
});