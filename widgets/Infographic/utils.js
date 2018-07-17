define(['jimu/utils', 'dojo/_base/lang', 'dojo/_base/Color'], function(jimuUtils, lang, Color) {
  var mo = {
    checkDataSourceIsVaild: function(dataSource, map, appConfig) {
      var isValid = true;
      if (!dataSource) {
        isValid = false;
      } else if (dataSource.dataSourceType === 'DATA_SOURCE_FROM_FRAMEWORK') {
        if (appConfig && appConfig.dataSource && appConfig.dataSource.dataSources) {
          var dataSources = appConfig.dataSource.dataSources;
          var ds = dataSources[dataSource.frameWorkDsId];
          if (!ds) {
            isValid = false;
          }
        } else {
          isValid = false;
        }

      } else if (dataSource.dataSourceType === 'DATA_SOURCE_FEATURE_LAYER_FROM_MAP') {
        var layerId = dataSource.layerId;
        if (layerId && map) {
          var layer = map.getLayer(layerId);
          if (!layer) {
            isValid = false;
          }
        } else {
          isValid = false;
        }
      }
      return isValid;
    },

    isBaseAxisChart: function(type) {
      return type === 'column' || type === 'bar' || type === 'line';
    },

    isInteger: function(x) {
      return (typeof x === 'number') && (x % 1 === 0);
    },

    isEqual: function(v1, v2) {
      if (typeof v1 !== typeof v2) {
        return false;
      }
      if (typeof v1 !== 'object') {
        return v1 === v2;
      } else {
        return jimuUtils.isEqual(v1, v2);
      }
    },

    getCleanChartConfig: function(config) {
      var cleanConfig = {
        mode: config.mode,
        type: config.type
      };

      var type = cleanConfig.type;
      var mode = cleanConfig.mode;

      var baseChartProperties = [];

      if (mode === 'feature') {
        baseChartProperties = baseChartProperties.concat(["labelField", "valueFields", "sortOrder", "maxLabels"]);
      } else if (mode === 'category') {
        baseChartProperties = baseChartProperties.concat(["categoryField", "dateConfig",
          "valueFields", "sortOrder", "operation", "maxLabels", "nullValue"
        ]);
      } else if (mode === 'count') {
        baseChartProperties = baseChartProperties.concat(["categoryField", "dateConfig",
          "sortOrder", "maxLabels"
        ]);
      } else if (mode === 'field') {
        baseChartProperties = baseChartProperties.concat(["valueFields", "operation",
          "sortOrder", "maxLabels", "nullValue"
        ]);
      }

      var baseDisplayProperties = ["backgroundColor", "seriesStyle", "showLegend",
        "legendTextColor", "legendTextSize", "highLightColor"
      ];

      if (type === 'pie') {
        baseDisplayProperties = baseDisplayProperties.concat(["showDataLabel", "dataLabelColor",
          "dataLabelSize", "innerRadius"
        ]);
      } else {
        baseDisplayProperties = baseDisplayProperties.concat([
          "showHorizontalAxis",
          "horizontalAxisTextColor",
          "horizontalAxisTextSize",
          "showVerticalAxis",
          "verticalAxisTextColor",
          "verticalAxisTextSize",
          "stack",
          "area"
        ]);
      }

      baseChartProperties.forEach(lang.hitch(this, function(chartProperty) {
        cleanConfig[chartProperty] = config[chartProperty];
      }));

      baseDisplayProperties.forEach(lang.hitch(this, function(displayProperty) {
        cleanConfig[displayProperty] = config[displayProperty];
      }));

      if (!cleanConfig.mode) {
        return null;
      }

      if (cleanConfig.mode !== 'count' && (!cleanConfig.valueFields || !cleanConfig.valueFields.length)) {
        return null;
      }

      if (cleanConfig.type === 'pie' && cleanConfig.maxLabels === '') {
        return null;
      }
      //completed some option
      if (!cleanConfig.hasOwnProperty("showLegend")) {
        cleanConfig.showLegend = false;
      }
      if (type === 'pie') {
        if (!cleanConfig.hasOwnProperty("showDataLabel")) {
          cleanConfig.showDataLabel = true;
        }
      } else {
        if (!cleanConfig.hasOwnProperty("showHorizontalAxis")) {
          cleanConfig.showHorizontalAxis = true;
        }
        if (!cleanConfig.hasOwnProperty("showVerticalAxis")) {
          cleanConfig.showVerticalAxis = true;
        }
      }
      return lang.clone(cleanConfig);
    },

    _cloneAndFormatDS: function(DS) {
      var cloneDS = lang.clone(DS);
      var formatDS = {};
      if (cloneDS.name) {
        formatDS.name = cloneDS.name;
      }
      if (cloneDS.dataSourceType) {
        formatDS.dataSourceType = cloneDS.dataSourceType;
      }
      if (cloneDS.layerId) {
        formatDS.layerId = cloneDS.layerId;
      }
      if (cloneDS.frameWorkDsId) {
        formatDS.frameWorkDsId = cloneDS.frameWorkDsId;
      }
      cloneDS = null;
      return formatDS;
    },

    isDSEqual: function(DS1, DS2) {
      if (!DS1 || !DS2) {
        return;
      }
      var formatedDS1 = this._cloneAndFormatDS(DS1);
      var formatedDS2 = this._cloneAndFormatDS(DS2);
      return this.isEqual(formatedDS1, formatedDS2);
    },

    separationGradientColors: function(originColors, count) {
      var colors = [];

      if (originColors.length === 2) {
        //gradient colors
        colors = this._createGradientColors(originColors[0],
          originColors[originColors.length - 1],
          count);
      }

      return colors;
    },

    _createGradientColors: function(firstColor, lastColor, count) {
      var colors = [];
      var c1 = new Color(firstColor);
      var c2 = new Color(lastColor);
      var deltaR = (c2.r - c1.r) / count;
      var deltaG = (c2.g - c1.g) / count;
      var deltaB = (c2.b - c1.b) / count;
      var c = new Color();
      var r = 0;
      var g = 0;
      var b = 0;
      for (var i = 0; i < count; i++) {
        r = parseInt(c1.r + deltaR * i, 10);
        g = parseInt(c1.g + deltaG * i, 10);
        b = parseInt(c1.b + deltaB * i, 10);
        c.setColor([r, g, b]);
        colors.push(c.toHex());
      }
      return colors;
    }

  };

  return mo;
});