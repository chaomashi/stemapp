define([
  'dojo/on',
  'dojo/_base/lang',
  'dojo/_base/array',
  'jimu/utils',
  'jimu/DataSourceManager',
  'jimu/statisticsUtils'
], function(on, lang, array, jimuUtils, DataSourceManager, statisticsUtils) {
  var mo = {
    getClientFeaturesFromMap: function(map, featureLayer, useSelection, filterByExtent) {
      return jimuUtils.getClientFeaturesFromMap(map, featureLayer, useSelection, filterByExtent);
    },

    //callback: function(features){}
    listenClientFeaturesFromMap: function(map, featureLayer, useSelection, filterByExtent, callback) {
      var handles = [];
      if (useSelection) {
        handles.push(on(featureLayer, 'selection-complete', lang.hitch(this, function() {
          callback(this.getClientFeaturesFromMap(map, featureLayer, useSelection, filterByExtent));
        })));
        handles.push(on(featureLayer, 'selection-clear', lang.hitch(this, function() {
          callback(this.getClientFeaturesFromMap(map, featureLayer, useSelection, filterByExtent));
        })));
      }

      if (filterByExtent) {
        handles.push(on(map, 'extent-change', lang.hitch(this, function() {
          if(featureLayer.graphics.length > 0){
            callback(this.getClientFeaturesFromMap(map, featureLayer, useSelection, filterByExtent));
          }
        })));
      }

      handles.push(on(featureLayer, 'update-end', lang.hitch(this, function() {
        callback(this.getClientFeaturesFromMap(map, featureLayer, useSelection, filterByExtent));
      })));

      callback(this.getClientFeaturesFromMap(map, featureLayer, useSelection, filterByExtent));

      var returnHandle = {
        remove: function() {
          if (handles) {
            array.forEach(handles, lang.hitch(this, function(handle) {
              handle.remove();
            }));
          }
          handles = null;
        }
      };
      return returnHandle;
    },

    getVaildIndicator: function(value, indicators, max) {
      var vaildIndicators = [];
      indicators.map(lang.hitch(this, function(indicator) {
        var vaildIndicator = this._handleOperator(indicator, value, max);
        if (vaildIndicator) {
          vaildIndicators.push(vaildIndicator);
        }
      }));
      if (vaildIndicators.length > 0) {
        return vaildIndicators[vaildIndicators.length - 1];
      }
    },

    /**
     *
     * @param  {[type]} config
     *   {
          type: "",//"Features"" Or "FeatureStatistics"
          fieldName: null,
          statisticsType:
        }
     * @param  {[type]} ds     [description]
     * @return {[type]}        [description]
     */
    getSingleValueFromFeatures: function(config, ds, features) {
      var dsManager = DataSourceManager.getInstance();
      var count = 0;

      if (config.type === 'Features') {
        if (ds.dataSourceType === 'DATA_SOURCE_FEATURE_LAYER_FROM_MAP') {
          return features.length;
        } else {
          if (dsManager.getDataSourceConfig(ds.frameWorkDsId).type === 'Features') {
            return features.length;
          } else {
            count = 0;
            array.forEach(features, function(f) {
              var v = f.attributes.STAT_COUNT;
              if (typeof v === 'undefined') {
                v = f.attributes.stat_count;
              }
              count += v;
            });
            return count;
          }
        }
      } else {
        if (ds.dataSourceType === 'DATA_SOURCE_FEATURE_LAYER_FROM_MAP') {
          return this._getStatsFromFeatures(features, config.fieldName, config.statisticsType);
        } else {
          if (dsManager.getDataSourceConfig(ds.frameWorkDsId).type === 'Features') {
            return this._getStatsFromFeatures(features, config.fieldName, config.statisticsType);
          } else {
            var val = 0, sum = 0;
            count = 0;
            var mosaicFieldName = jimuUtils.upperCaseString(config.fieldName + '_' + config.statisticsType);
            array.forEach(features, function(f) {
              var v = f.attributes[mosaicFieldName];
              if (typeof v === 'undefined') {
                mosaicFieldName = jimuUtils.lowerCaseString(config.fieldName + '_' + config.statisticsType);
                v = f.attributes[mosaicFieldName];
              }
              switch (config.statisticsType) {
                case 'sum':
                  val += v;
                  break;
                case 'min':
                  val = Math.min(val, v);
                  break;
                case 'max':
                  val = Math.max(val, v);
                  break;
                case 'avg':
                  var sumCountValue = this._getSumCountValue(config.fieldName, f.attributes);
                  sum += sumCountValue.sum;
                  count += sumCountValue.count;
                  break;
                case 'stddev':
                  break;
              }
            }.bind(this));

            if (config.statisticsType === 'avg') {
              val = count === 0 ? 0 : sum / count;
            }
            return val;
          }
        }
      }
    },

    _getSumCountValue: function(fieldName, attributes) {
      var sum, count;
      var mosaicSumFieldName = jimuUtils.upperCaseString(fieldName + '_SUM');
      sum = attributes[mosaicSumFieldName];
      if (typeof sum === 'undefined') {
        mosaicSumFieldName = jimuUtils.lowerCaseString(fieldName + '_SUM');
        sum = attributes[mosaicSumFieldName];
      }
      var mosaicCountFieldName = 'STAT_COUNT';
      count = attributes[mosaicCountFieldName];
      if (typeof count === 'undefined') {
        mosaicCountFieldName = jimuUtils.lowerCaseString('STAT_COUNT');
        count = attributes[mosaicCountFieldName];
      }
      sum = sum || 0;
      count = count || 0;
      return {
        sum: sum,
        count: count
      };
    },

    filterFeaturesByDataSourceSetting: function(features, ds, map) {
      if (features.length === 0) {
        return [];
      }
      if (ds.useSelection) {
        var layer = features[0].getLayer();
        if (layer) {
          var layerSelectedFeatures = layer.getSelectedFeatures();
          if (layerSelectedFeatures.length > 0) {
            features = array.filter(features, function(f) {
              return layerSelectedFeatures.indexOf(f) > -1;
            });
          }
        }
      }

      if (ds.filterByExtent) {
        features = jimuUtils.filterFeaturesByExtent(map.extent, features);
      }

      return features;
    },

    _getStatsFromFeatures: function(features, fieldName, statisticsType) {
      return statisticsUtils.getStatisticsResultFromClientSync({
        featureSet: {
          features: features
        },
        fieldName: fieldName,
        statisticTypes: [statisticsType]
      })[statisticsType + 'Field'];
    },

    _handleOperator: function(indicator, value, max) {
      var vaildIndicator;

      function handleColor(indicator) {
        vaildIndicator = {};
        if (indicator.valueColor) {
          vaildIndicator.valueColor = indicator.valueColor;
        }
        if (indicator.gaugeColor) {
          vaildIndicator.gaugeColor = indicator.gaugeColor;
        }
        if (indicator.iconInfo) {
          vaildIndicator.iconInfo = indicator.iconInfo;
        }
      }
      var limitValue = indicator.value.map(lang.hitch(this, function(val) {
        return !!indicator.isRatio ? max * (val / 100) : val;
      }));
      if (indicator.operator === 'greater' && value > limitValue[0]) {
        handleColor(indicator);
      } else if (indicator.operator === 'smaller' && value < limitValue[0]) {
        handleColor(indicator);
      } else if (indicator.operator === 'between' && value > limitValue[0] &&
        value < limitValue[1]) {
        handleColor(indicator);
      } else if (indicator.operator === 'equal' && value === limitValue[0]) {
        handleColor(indicator);
      } else if (indicator.operator === 'notEqual' && value !== limitValue[0]) {
        handleColor(indicator);
      }
      return vaildIndicator;
    },

    isInteger: function(number) {
      return typeof number === 'number' && number % 1 === 0;
    }
  };

  return mo;
});