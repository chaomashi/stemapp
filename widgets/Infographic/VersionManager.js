define(['jimu/shared/BaseVersionManager'],
  function(BaseVersionManager) {

    function VersionManager() {
      this.versions = [{
        version: '1.0',
        upgrader: function(oldConfig) {
          return oldConfig;
        }
      }, {
        version: '1.1',
        upgrader: function(oldConfig) {
          return oldConfig;
        }
      }, {
        version: '1.2',
        upgrader: function(oldConfig) {
          return oldConfig;
        }
      }, {
        version: '1.3',
        upgrader: function(oldConfig) {
          return oldConfig;
        }
      }, {
        version: '1.4',
        upgrader: function(oldConfig) {
          return oldConfig;
        }
      }, {
        version: '2.0Beta',
        upgrader: function(oldConfig) {
          return oldConfig;
        }
      }, {
        version: '2.0',
        upgrader: function(oldConfig) {
          return oldConfig;
        }
      }, {
        version: '2.0.1',
        upgrader: function(oldConfig) {
          return oldConfig;
        }
      }, {
        version: '2.1',
        upgrader: function(oldConfig) {
          return oldConfig;
        }
      }, {
        version: '2.2',
        upgrader: function(oldConfig) {
          return oldConfig;
        }
      }, {
        version: '2.3',
        upgrader: function(oldConfig) {
          return oldConfig;
        }
      }, {
        version: '2.4',
        upgrader: function(oldConfig) {
          return oldConfig;
        }
      }, {
        version: '2.5',
        upgrader: function(oldConfig) {
          return oldConfig;
        }
      }, {
        version: '2.6',
        upgrader: function(oldConfig) {
          var newConfig = oldConfig;
          var dijits = newConfig.dijits;
          var sortOrder;
          for (var i = 0; i < dijits.length; i++) {
            if (dijits[i].type === 'chart') {
              //sortOrder
              sortOrder = dijits[i].config.sortOrder;
              dijits[i].config.sortOrder = {
                isLabelAxis: true,
                isAsc: sortOrder ? sortOrder === 'asc' : true
              };
              if (dijits[i].config.mode === 'feature') {
                dijits[i].config.sortOrder.field = dijits[i].config.labelField;
              }
              //maxLabel
              dijits[i].config.maxLabels = undefined;
              //nullValue
              if (dijits[i].config.mode === 'feature' || dijits[i].mode === 'count') {
                dijits[i].config.nullValue = undefined;
              } else {
                dijits[i].config.nullValue = true;
              }
              //dateConfig
              dijits[i].config.dateConfig = undefined;
              //useLayerSymbology
              dijits[i].config.useLayerSymbology = undefined;
            }
          }
          return newConfig;
        }
      }, {
        version: '2.7',
        upgrader: function(oldConfig) {
          var newConfig = oldConfig;
          var dijits = newConfig.dijits;
          var chartConfig;
          for (var i = 0; i < dijits.length; i++) {
            if (dijits[i].type === 'chart') {
              chartConfig = dijits[i].config;
              break;
            }
          }
          if (!chartConfig || !chartConfig.mode) {
            return newConfig;
          }
          var mode = chartConfig.mode;
          var type = chartConfig.type;

          var valueFields = chartConfig.valueFields;
          /* color and useLayerSymbology upgrade to seriesStyle */
          var colors = chartConfig.colors;
          if (!colors) {
            colors = ['#5d9cd3', '#eb7b3a', '#a5a5a5', '#febf29', '#4673c2', '#72ad4c'];
          }
          var seriesStyle = {};
          //useLayerSymbology
          if (typeof chartConfig.useLayerSymbology !== 'undefined') {
            if (type === 'line') {
              delete chartConfig.useLayerSymbology;
            }
          }
          if (typeof chartConfig.useLayerSymbology !== 'undefined') {
            seriesStyle.useLayerSymbology = chartConfig.useLayerSymbology;
          }

          var notAddedFields = [];
          if (valueFields && valueFields.length > 0) {
            notAddedFields = valueFields;
          }

          var colorAsArray = false;
          if (type === 'column' || type === 'bar' || type === 'line') {
            if (type === 'line' && mode === 'field') {
              notAddedFields = ['line~field'];
            } else {
              if (mode === 'count') {
                notAddedFields = ['count~count'];
              }
            }
          } else if (type === 'pie') {
            if (mode !== 'field') {
              colorAsArray = true;
              notAddedFields = ['pie~not-field'];
            }
          }

          var newStyles = notAddedFields.map(function(item, i) {
            return createSeriesStyle(item, i, colorAsArray, colors);
          }.bind(this));
          seriesStyle.styles = {};
          if (newStyles) {
            seriesStyle.styles = newStyles;
          }
          chartConfig.seriesStyle = seriesStyle;

          if (typeof chartConfig.colors !== 'undefined') {
            delete chartConfig.colors;
          }

          function createSeriesStyle(valueField, index, colorAsArray, colors) {
            var style = {
              name: valueField,
              style: {
                color: getRandomColor(colors, index)
              }
            };

            if (colorAsArray) {
              style.style.color = colors;
            }
            return style;
          }

          function getRandomColor(colors, i) {
            var length = colors.length;
            i = i % length;
            return colors[i];
          }

          /* disable show legend for count and field mode(expect pie)*/
          if (type !== 'pie') {
            if (mode === 'count' || mode === 'field') {
              chartConfig.showLegend = false;
            }
          }
          /* force dateConfig.isNeedFilled is false for pie chart */
          if (type === 'pie') {
            if (chartConfig.dateConfig) {
              chartConfig.dateConfig.isNeedFilled = false;
            }
          }
          return newConfig;
        }
      }, {
        version: '2.8',
        upgrader: function(oldConfig) {
          var newConfig = oldConfig;
          //get chart dijit config
          var dijits = newConfig.dijits;
          var chartDijit = dijits.filter(function(d) {
            return d.type === 'chart';
          })[0];

          if (!chartDijit) {
            return newConfig;
          }

          var chartConfig = chartDijit && chartDijit.config;

          if (!chartConfig || !chartConfig.mode) {
            return newConfig;
          }
          var seriesStyle = chartConfig.seriesStyle;
          if (!seriesStyle) {
            return newConfig;
          }
          //upgrade seriesStyle.useLayerSymbology to seriesStyle.type
          seriesStyle.type = seriesStyle.useLayerSymbology ? 'layerSymbol' : 'series';
          if (typeof seriesStyle.useLayerSymbology !== 'undefined') {
            delete seriesStyle.useLayerSymbology;
          }
          chartDijit.config = getCleanChartConfig(chartConfig);

          function getCleanChartConfig(config) {
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

            baseChartProperties.forEach(function(chartProperty) {
              cleanConfig[chartProperty] = config[chartProperty];
            });

            baseDisplayProperties.forEach(function(displayProperty) {
              cleanConfig[displayProperty] = config[displayProperty];
            });

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
            return cleanConfig;
          }

          return newConfig;
        }
      }];
    }

    VersionManager.prototype = new BaseVersionManager();
    VersionManager.prototype.constructor = VersionManager;
    return VersionManager;
  });