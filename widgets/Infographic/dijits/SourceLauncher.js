///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2017 Esri. All Rights Reserved.
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
  'dojo/_base/lang',
  'dojo/Evented',
  'dojo/on',
  'dojo/Deferred',
  'dijit/_WidgetBase',
  './utils',
  'jimu/utils',
  'jimu/LayerInfos/LayerInfos',
  'jimu/DataSourceManager',
  'esri/geometry/geometryEngine',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'esri/tasks/StatisticDefinition',
  'esri/layers/FeatureLayer'
], function(declare, lang, Evented, on, Deferred, _WidgetBase, utils, jimuUtils, LayerInfos, DataSourceManager,
  geometryEngine, Query, QueryTask, StatisticDefinition, FeatureLayer) {

  return declare([_WidgetBase, Evented], {
    oidFieldType: 'esriFieldTypeOID',
    // -- option --

    // map,
    // appConfig
    // useSelection,
    // filterByExtent
    // dijit
    // dataSource

    // layerObject
    // config

    // -- public methods --

    // start
    // awake
    // sleep
    // setAppConfigDSFeatures

    // -- events --

    // data-update
    // fetching
    // success
    // faild

    constructor: function(options) {
      this.map = options.map;
      this.appConfig = options.appConfig;
      this.useSelection = options.useSelection;
      this.filterByExtent = options.filterByExtent;
      this.dijit = options.dijit;
      this.dataSource = options.dataSource;

      this.layerInfosObj = LayerInfos.getInstanceSync();
      this.dataSourceManager = DataSourceManager.getInstance();

      this.layerObject = null;
      this._layerUrl = null;

      if (this.dijit) {
        this.config = this.dijit.config;
        if (this.config) {
          this.isDateType = !!this.config.dateConfig;
        }
      }
      if (this.dataSource.dataSourceType === "DATA_SOURCE_FROM_FRAMEWORK") {
        this.frameWorkDsId = this.dataSource.frameWorkDsId;
      }
      this._queryParameter = null;
      this._oldQueryParameter = null;
      // this.handles
      this.exchetChangeHandle = null;
      this.selectionHandle = null;
      this.refreshIntervalHandle = null;
      this.updateEndHandle = null;
      this.filterChangedHandle = null;
      this.timeIntervalHandle = null;
      this.exdsBeginUpdateHandle = null;
    },

    start: function() {
      this._tryGetLayerObject().then(function() {
        this._onFetchSuccess();
        this.awake();
        this._listenEventsContinuousAccessFeatures();
      }.bind(this), function(error) {
        this._onFetchField(error);
      }.bind(this));
    },

    awake: function() {
      this.sleeping = false;
      this._getFeaturesForFirst();
    },

    sleep: function() {
      this.sleeping = true;
    },

    destroy: function() {
      this._removeHandles();
      this.inherited(arguments);
    },
    // -- Try to get features (selected features or client featrues or server stat features) --

    //For extral ds and widget's output features, call this method when ds is changed
    setAppConfigDSFeatures: function(features) {
      if (this.sleeping) {
        return;
      }
      if (this.dataSource.dataSourceType === "DATA_SOURCE_FROM_FRAMEWORK") {
        this._onFetchSuccess();
        this._onDataUpdate(features);
      }
    },

    _getFeaturesForFirst: function() {
      if (this.dataSource.dataSourceType === "DATA_SOURCE_FROM_FRAMEWORK") {
        //first init data
        var data = this.dataSourceManager.getData(this.dataSource.frameWorkDsId);
        if (data) {
          this._onDataUpdate(data.features);
          //Continuous access to features: @setAppConfigDSFeatures
        }
      } else if (this.dataSource.dataSourceType === "DATA_SOURCE_FEATURE_LAYER_FROM_MAP") {
        this._trigerCallback();
      }
    },

    _listenEventsContinuousAccessFeatures: function() {

      if (this.dataSource.dataSourceType === "DATA_SOURCE_FROM_FRAMEWORK") {
        this._resetExdsBeginUpdateHandle();
        this.exdsBeginUpdateHandle = on(this.dataSourceManager, 'begin-update',
          lang.hitch(this, function(dsid) {
            if (dsid === this.frameWorkDsId) {
              this._onFetch();
            }
          }));
        return;
      }

      if (!this.layerObject || !this.layerInfo) {
        return;
      }
      var accessClientFeatures = this._shouldAccessClientFeatures();

      //selection event
      if (this.useSelection) {
        this._resetSelectionHandle();
        this.selectionHandle = on(this.layerObject, 'selection-complete,selection-clear',
          lang.hitch(this, function() {
            this._trigerCallback();
          }));
      }

      //filter change event, only for server stat
      //for client features, this event will be handled by update-end event
      if (!accessClientFeatures) {
        this._resetFilterChangedHandle();
        this.filterChangedHandle = on(this.layerInfo, 'filterChanged', lang.hitch(this, function() {
          this._trigerCallback();
        }));
      }
      if (accessClientFeatures) { //Only listen layer update-end event for client features
        this._resetUpdateEndHandle();
        this.updateEndHandle = on(this.layerObject, 'update-end', lang.hitch(this, function() {
          this._trigerCallback();
        }));
      }
      // listen map filter by extent event
      if (this.filterByExtent && this.map) {
        this._resetExtentChangeHandle();
        this.exchetChangeHandle = on(this.map, 'extent-change', lang.hitch(this, function() {
          this._trigerCallback(true);
        }));
      }

      //only set refresh interval for server statistics
      if (!accessClientFeatures) {
        //set refresh interval
        this._setTimeListener();
        //listen layer refresh-interval-change event
        this._resetRefreshIntervalHandle();
        this.refreshIntervalHandle = on(this.layerObject, 'refresh-interval-change',
          lang.hitch(this, this._setTimeListener));
      }
    },

    _setTimeListener: function() {
      var refreshInterval = this._getLayerRefreshInterval();
      if (!refreshInterval) {
        //if layer is static, clear interval
        this._resetTimeIntervalHandle();
        return;
      }
      //If the refresh interval is set in the layer, periodical request server-side statistics
      this._resetTimeIntervalHandle();
      this.timeIntervalHandle = setInterval(lang.hitch(this, function() {
        this._trigerCallback();
      }), refreshInterval * 1000 * 60);
    },

    _trigerCallback: function(isExtentChange) {
      var code = this.computingTheWayToGetFeatures();
      //If entent-change event triggered this method to get features on the client side,
      //We only continue to execute the method for the layer who is not on-demand mode,
      //For on-demand mode layer, this method will be triggered at update-end event later
      if (isExtentChange && code === 2 && this._isLayerOnDemandMode()) {
        return;
      }
      switch (code) {
        case 0:
          break;
        case 1:
          this._getFeaturesFromSelection(this.map, this.layerObject, this.filterByExtent,
            lang.hitch(this, this._onDataUpdate));
          break;
        case 2:
          this._getClientFeaturesFromMap(this.map, this.layerObject, this.filterByExtent,
            lang.hitch(this, this._onDataUpdate));
          break;
        case 3:
          this._getStatisticsFeaturesForServer(lang.hitch(this, this._onDataUpdate));
          break;
        default:
          break;
      }
    },

    //0 -- invaild
    //1 -- client selected features
    //2 -- client features
    //3 -- server statistics features
    computingTheWayToGetFeatures: function() {
      var code = 0;
      if (this.sleeping || !this.layerObject) {
        return code;
      }
      if (!this._isMapLayer()) {
        code = 0;
      } else {
        if (this._shouldAccessFeaturesBySelection()) {
          code = 1;
        } else if (this._shouldAccessClientFeatures()) {
          code = 2;
        } else {
          code = 3;
        }
      }
      return code;
    },

    _getClientFeaturesFromMap: function(map, featureLayer, filterByExtent, callback) {
      var features = featureLayer.graphics;

      if (filterByExtent) {
        features = this._filterFeaturesByExtent(map.extent, features);
      }

      features = this._sortClientFeaturesByObjID(features, featureLayer);
      callback(features);
    },

    _getFeaturesFromSelection: function(map, featureLayer, filterByExtent, callback) {
      var features = [];
      var isSelectedFeatures = false;

      features = featureLayer.getSelectedFeatures();
      isSelectedFeatures = true;
      if (filterByExtent) {
        features = this._filterFeaturesByExtent(map.extent, features);
      }
      features.isSelectedFeatures = isSelectedFeatures;
      features = this._sortClientFeaturesByObjID(features, featureLayer);
      callback(features);
    },

    _getStatisticsFeaturesForServer: function(callback) {
      this._updateLayerInfoFilter();
      this._tryGenerateQueryParameter();
      if (!this._shouldLaunchQuery()) {
        return;
      }
      this._onFetch();
      this.queryDeferred = this._doQuery();
      this.queryDeferred.then(lang.hitch(this, function(featureSet) {
        this.queryDeferred = null;
        this._onFetchSuccess();
        var features = featureSet.features || [];
        features = this._calculateAverageWithNullValueAsZero(features);
        callback(features, true);
      }), lang.hitch(this, function(error) {
        this.queryDeferred = null;
        this._onFetchField(error);
      }));
    },

    _updateLayerInfoFilter: function() {
      if (!this.dataSource || typeof this.dataSource.layerId === 'undefined') {
        return;
      }
      var layerInfo = this.layerInfosObj.getLayerInfoById(this.dataSource.layerId);
      if (layerInfo) {
        this._layerFilter = layerInfo.getFilter();
      }
    },

    _onFetch: function() {
      this.emit('fetching');
    },

    _onFetchSuccess: function() {
      this.emit('success');
    },

    _onFetchField: function(error) {
      this.emit('faild', error);
    },

    // ------------------------- Processing the acquired features -------------------------------
    _onDataUpdate: function(features, hasStatisticsed) {
      var value = null;
      //For number and gauge, return a number
      if (this.dijit.type === 'number' || this.dijit.type === 'gauge') {
        value = this._getValueForNumberOrGauge(features);
      } else if (this.dijit.type === 'chart') {
        //For chart, return features(has statisticsed or not)
        value = {
          features: features,
          hasStatisticsed: !!hasStatisticsed
        };
      }
      this.emit('data-update', value);
    },

    _getValueForNumberOrGauge: function(features) {
      if (this.dijit.type !== 'number' && this.dijit.type !== 'gauge') {
        return features;
      }

      var value = features;

      if (this._isNeededCalculateForClient()) {
        value = utils.getSingleValueFromFeatures(this.config.statistic, this.dataSource, features);
      } else { //Get the first attribute value from the feature returned from the server statistics
        if (features && features.length) {
          var attributes = features[0].attributes;
          if (attributes) {
            var key = Object.keys(attributes)[0];
            if (key) {
              value = attributes[key];
            }
          }
        } else {
          if (Array.isArray(features)) {
            value = 0;
          }
        }
        value = Number(value);
      }

      return value;
    },

    // -------------------------------- Tool methods -------------------------------------------

    _isMapLayer: function() {
      return this.dataSource.dataSourceType === "DATA_SOURCE_FEATURE_LAYER_FROM_MAP";
    },

    _isLayerOnDemandMode: function() {
      return this.layerObject &&
        this.layerObject.currentMode === FeatureLayer.MODE_ONDEMAND;
    },

    _shouldAccessFeaturesBySelection: function() {
      return this.useSelection && this.layerObject && this.layerObject.getSelectedFeatures().length;
    },

    _shouldAccessClientFeatures: function() {
      var a = this.config && this.config.mode === 'feature'; //chart feature mode
      var b = this.isDateType; //Date type category
      var c = this._isSupportServerStatByExtent(); //Not support server statistics by extent
      return a || b || !c;
    },

    _isSupportServerStatByExtent: function() {
      //layer version >= 10.1 sp1(10.11)
      var versionThanSP1 = this.layerObject && this.layerObject.version && Number(this.layerObject.version) >= 10.11;
      var supportsStatistics = this._isLayerSupportStatistics(); //support statistics
      return versionThanSP1 && supportsStatistics;
    },

    _isLayerSupportStatistics: function() {
      if (!this.layerObject) {
        return;
      }
      var isSupport = false;
      if (this.layerObject.advancedQueryCapabilities) {
        isSupport = !!this.layerObject.advancedQueryCapabilities.supportsStatistics;
      } else {
        isSupport = !!this.layerObject.supportsStatistics;
      }
      return isSupport;
    },

    _getLayerRefreshInterval: function() {
      if (!this.layerObject || !this.layerObject.refreshInterval) {
        return;
      }
      return this.layerObject.refreshInterval;
    },

    _sortClientFeaturesByObjID: function(features, featureLayer) {
      if (features.length > 0) {
        var objectIdField = jimuUtils.getObjectIdField(featureLayer);

        if (objectIdField) {
          var firstFeature = features[0];
          if (firstFeature && firstFeature.attributes && firstFeature.attributes.hasOwnProperty(objectIdField)) {
            features.sort(function(a, b) {
              if (!a.attributes) {
                a.attributes = {};
              }
              if (!b.attributes) {
                b.attributes = {};
              }
              var objectId1 = a.attributes[objectIdField];
              var objectId2 = b.attributes[objectIdField];
              if (objectId1 < objectId2) {
                return -1;
              } else if (objectId1 > objectId2) {
                return 1;
              } else {
                return 0;
              }
            });
          }
        }
      }
      return features;
    },

    _filterFeaturesByExtent: function(extent, features) {
      var extents = extent.normalize();

      features = features.filter(lang.hitch(this, function(feature) {
        try {
          if (feature.geometry) {
            var isPoint = feature.geometry.type === 'point' || feature.geometry === 'multipoint';

            return extents.some(lang.hitch(this, function(extent) {
              if (isPoint) {
                return extent.contains(feature.geometry);
              } else {
                return geometryEngine.intersects(extent, feature.geometry);
              }
            }));
          }
        } catch (e) {
          console.error(e);
        }
        return false;
      }));

      return features;
    },

    //The server-side statistics do not support the null value as 0 to calculate the average,
    //so we do this by (server statistics sum) / (server statistics count)
    _calculateAverageWithNullValueAsZero: function(features) {
      if (!this._shouldCalcAvgForNullValue()) {
        return features;
      }
      if (!features || !features.length) {
        return features;
      }
      var valueFields = this.config.valueFields;

      if (!valueFields || !valueFields.length) {
        return features;
      }
      var valueFieldsSum = valueFields.map(function(vf) {
        return vf + '_sum';
      });
      features.forEach(function(feature) {
        var attributes = feature.attributes;
        if (!attributes) {
          return;
        }
        //get count
        var count = attributes.STAT_COUNT;
        if (typeof count === 'undefined') {
          count = attributes.stat_count;
          delete attributes.stat_count;
        } else {
          delete attributes.STAT_COUNT;
        }
        var sumValue, avgValue, vf;

        valueFieldsSum.forEach(function(vfs) {
          vf = vfs.replace(/_SUM$/gi, '');
          var upperVfs = jimuUtils.upperCaseString(vfs);
          var lowerVfs = jimuUtils.lowerCaseString(vfs);
          var upperVfa = jimuUtils.upperCaseString(vf + "_AVG");
          // var lowerVfa = jimuUtils.lowerCaseString(upperVfa);
          //get sum
          sumValue = attributes[upperVfs];
          if (typeof sumValue === 'undefined') {
            sumValue = attributes[lowerVfs];
            delete attributes[lowerVfs];
          } else {
            delete attributes[upperVfs];
          }

          //calculate avg
          if ((!sumValue && typeof sumValue !== 'number') || !count) {
            attributes[upperVfa] = null;
            return;
          }

          avgValue = sumValue / count;

          attributes[upperVfa] = avgValue;

        });
      });

      return features;
    },

    _shouldCalcAvgForNullValue: function() {
      var mode = this.config && this.config.mode;
      return mode && (mode === 'category' || mode === 'field') && this.config.nullValue &&
        this.config.operation === 'average';
    },

    _shouldLaunchQuery: function() {
      var shouldLaunch = true;
      var queryNotFinish = Boolean(this.queryDeferred && (!this.queryDeferred.isResolved() &&
        !this.queryDeferred.isRejected()));
      var isSameQueryParameter = jimuUtils.isEqual(this._queryParameter, this._oldQueryParameter);
      if (queryNotFinish && isSameQueryParameter) {
        shouldLaunch = false;
      }
      this._oldQueryParameter = lang.clone(this._queryParameter);
      return shouldLaunch;
    },

    _getOutStatistics: function(mode, valueFields, operation) {
      var statisticType = operation;
      if (statisticType === 'average') {
        statisticType = 'avg';
      }
      var nullValue = this.config.nullValue;
      if (nullValue && statisticType === 'avg') {
        statisticType = 'sum';
      }
      var outStatistics = null;
      //outStatistics
      if (mode === 'category' || mode === 'field') {
        if (valueFields && valueFields.length) {
          outStatistics = valueFields.map(function(valueField) {
            var upperStatName = jimuUtils.upperCaseString(valueField + '_' + statisticType);
            var statisticDefinition = new StatisticDefinition();
            statisticDefinition.statisticType = statisticType;
            statisticDefinition.onStatisticField = valueField;
            statisticDefinition.outStatisticFieldName = upperStatName;
            return statisticDefinition;
          }.bind(this));
          var countStatDefinition = null;
          if (nullValue && operation === 'average') {
            countStatDefinition = new StatisticDefinition();
            countStatDefinition.statisticType = 'count';
            countStatDefinition.onStatisticField = '*';
            countStatDefinition.outStatisticFieldName = 'STAT_COUNT';
            outStatistics.push(countStatDefinition);
          }
        }
      } else if (mode === 'count') {
        var countStatisticDefinition = new StatisticDefinition();
        countStatisticDefinition.statisticType = 'count';
        countStatisticDefinition.onStatisticField = this._getCountTypeOnStatisticsField();
        countStatisticDefinition.outStatisticFieldName = 'STAT_COUNT';
        outStatistics = [countStatisticDefinition];
      }
      return outStatistics;
    },

    _tryGenerateQueryParameter: function() {
      this._queryParameter = {};
      if (this._layerUrl) {
        this._queryParameter.url = this._layerUrl;
      }
      if (this._layerFilter) {
        this._queryParameter.where = this._layerFilter;
      }
      if (this.dijit) {
        var statisticType;

        if (this.dijit.type === 'number' || this.dijit.type === 'gauge') {
          if (this.config && this.config.statistic) {
            var statistic = this.config.statistic;
            statisticType = statistic.statisticsType;
            var statisticField = statistic.fieldName;

            var outStatisticFieldName = jimuUtils.upperCaseString(statisticField + '_' + statisticType);
            if (statistic.type === 'Features') {
              statisticField = this._getCountTypeOnStatisticsField();
              statisticType = 'count';
              outStatisticFieldName = 'STAT_COUNT';
            }
            if (statisticType === 'average') {
              statisticType = 'avg';
            }
            var statisticDefinition = new StatisticDefinition();
            statisticDefinition.statisticType = statisticType;
            statisticDefinition.onStatisticField = statisticField;
            statisticDefinition.outStatisticFieldName = outStatisticFieldName;
            this._queryParameter.outStatistics = [statisticDefinition];
          }
        } else if (this.dijit.type === 'chart') {
          if (!this.config) {
            return;
          }
          this.statisticsByServer = true;
          var mode = this.config.mode;
          var valueFields = this.config.valueFields;
          var operation = this.config.operation;

          this._queryParameter.outStatistics = this._getOutStatistics(mode, valueFields, operation);

          var categoryField = this.config.categoryField;
          //groupByFields and srderByFields
          if (mode === 'category' || mode === 'count') {
            //groupByFields
            var groupByFields = [categoryField];
            this._queryParameter.groupByFieldsForStatistics = groupByFields;
          }
        }
      }
    },

    _getCountTypeOnStatisticsField: function() {
      var objectIdField = null;
      if (this.layerObject) {
        var fields = this.layerObject.fields;
        var fieldInfo = fields && fields.filter(function(e) {
          return e.type === this.oidFieldType;
        }.bind(this))[0];
        objectIdField = fieldInfo && fieldInfo.name;
      }
      return objectIdField || '*';
    },

    _doQuery: function() {
      var deferred = new Deferred();

      if (!this._queryParameter) {
        deferred.reject('Empty query parameter.');
        return deferred;
      }
      if (!this._queryParameter.url) {
        deferred.reject('Empty layer url.');
        return deferred;
      }
      var queryTask = new QueryTask(this._queryParameter.url);
      var query = new Query();
      query.where = this._queryParameter.where || '1=1';
      query.returnGeometry = false;
      if (this.dataSource.filterByExtent && this.map) {
        query.geometry = this.map.extent;
      }

      if (this._queryParameter.groupByFieldsForStatistics) {
        query.groupByFieldsForStatistics = this._queryParameter.groupByFieldsForStatistics;
      }

      if (!this._hasVaildOutStatistics(this._queryParameter.outStatistics)) {
        deferred.reject('Invaild outStatistics of query params.');
        return deferred;
      } else {
        query.outStatistics = this._queryParameter.outStatistics;
      }

      if (this._queryParameter.orderByFields) {
        query.orderByFields = this._queryParameter.orderByFields;
      }
      return queryTask.execute(query);
    },

    _hasVaildOutStatistics: function(outStatistics) {
      if (!outStatistics || !outStatistics.length) {
        return false;
      }
      return outStatistics.every(function(os) {
        return this._isTrueOrZero(os.onStatisticField) &&
          this._isTrueOrZero(os.outStatisticFieldName) &&
          !!os.statisticType;
      }.bind(this));

    },

    _isTrueOrZero: function(value) {
      return !!value || value === 0;
    },

    _tryGetLayerObject: function() {
      var deferred = new Deferred();
      var isLayerFromMap = this.dataSource.dataSourceType === "DATA_SOURCE_FEATURE_LAYER_FROM_MAP";
      if (!isLayerFromMap) {
        deferred.resolve();
        return deferred;
      }
      this._onFetch();
      var layerInfo = this.layerInfosObj.getLayerInfoById(this.dataSource.layerId);
      if (layerInfo) {
        this.layerInfo = layerInfo;
        return layerInfo.getLayerObject().then(lang.hitch(this, function(layerObject) {
          this.layerObject = layerObject;
          this._layerUrl = this.layerObject.url;
          return;
        }));
      } else {
        deferred.reject('invaild data source');
        return deferred;
      }
    },

    _isNeededCalculateForClient: function() {
      var hasSelectedFeatures = this.layerObject && this.useSelection &&
        this.layerObject.getSelectedFeatures().length > 0;
      var isExtralData = this.dataSource.dataSourceType === "DATA_SOURCE_FROM_FRAMEWORK";
      var supportsStatistics = this._isSupportServerStatByExtent();
      return hasSelectedFeatures || isExtralData || !supportsStatistics;
    },

    _resetExtentChangeHandle: function() {
      if (this.exchetChangeHandle && this.exchetChangeHandle.remove) {
        this.exchetChangeHandle.remove();
        this.exchetChangeHandle = null;
      }
    },

    _resetUpdateEndHandle: function() {
      if (this.updateEndHandle && this.updateEndHandle.remove) {
        this.updateEndHandle.remove();
        this.updateEndHandle = null;
      }
    },

    _resetFilterChangedHandle: function() {
      if (this.filterChangedHandle && this.filterChangedHandle.remove) {
        this.filterChangedHandle.remove();
        this.filterChangedHandle = null;
      }

    },

    _resetSelectionHandle: function() {
      if (this.selectionHandle && this.selectionHandle.remove) {
        this.selectionHandle.remove();
        this.selectionHandle = null;
      }
    },

    _resetRefreshIntervalHandle: function() {
      if (this.refreshIntervalHandle && this.refreshIntervalHandle.remove) {
        this.refreshIntervalHandle.remove();
        this.refreshIntervalHandle = null;
      }
    },

    _resetTimeIntervalHandle: function() {
      if (this.timeIntervalHandle) {
        clearInterval(this.timeIntervalHandle);
        this.timeIntervalHandle = null;
      }
    },

    _resetExdsBeginUpdateHandle: function() {
      if (this.exdsBeginUpdateHandle && this.exdsBeginUpdateHandle.remove) {
        this.exdsBeginUpdateHandle.remove();
        this.exdsBeginUpdateHandle = null;
      }
    },

    _removeHandles: function() {
      this._resetExtentChangeHandle();
      this._resetUpdateEndHandle();
      this._resetFilterChangedHandle();
      this._resetSelectionHandle();
      this._resetRefreshIntervalHandle();
      this._resetTimeIntervalHandle();
      this._resetSelectionHandle();
    }

  });
});