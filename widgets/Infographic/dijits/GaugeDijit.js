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
  'dojo/_base/lang',
  'dojo/_base/html',
  './BaseDijit',
  'jimu/utils',
  'jimu/dijit/Chart',
  './utils'
], function(declare, lang, html, BaseDijit, jimuUtils, Chart, utils) {
  var clazz = declare([BaseDijit], {
    templateString: '<div style="height:100%;">' +
      '<div data-dojo-attach-point="gauge"></div></div>',
    type: 'gauge',
    config: null,

    postCreate: function() {
      this.inherited(arguments);
      this.features = [];
      this.DEFAULT_GAUGE_CONFIG = {
        type: 'gauge',
        confine: true,
        shape: 'curved', //horizontal,vertical,curved
        min: 0,
        max: 100,
        series: [{
          data: [0]
        }]
      };
      if (this.config) {
        this.DEFAULT_GAUGE_CONFIG.shape = this.config.shape;
      }
      if (this.isDarkTheme()) {
        this.DEFAULT_GAUGE_CONFIG.theme = 'dark';
      } else {
        this.DEFAULT_GAUGE_CONFIG.theme = 'light';
      }
      this._initChart();
      this.setConfig(this.config);
    },

    onDataSourceDataUpdate: function(value) {
      if (this.inSettingPage) {
        if (value && typeof value.features !== 'undefined') {
          this.features = value.features;
          this._updateStatisticsValue();
        }
      } else if (typeof value === 'number') {
        this.value = value;
        this._setValue(this.config);
      }
    },

    resize: function(width, heigth) {
      if (this.chart) {
        if (width && heigth) {
          this.chart.resize(width, heigth);
        } else {
          this.chart.resize();
        }
      }
    },
    _updateStatisticsValue: function() {
      if (!this.config.statistic || !this.dataSource) {
        return;
      }
      var value = utils.getSingleValueFromFeatures(this.config.statistic, this.dataSource, this.features);
      value = this._getVaildValue(value);
      if (typeof value !== 'number') {
        return;
      }
      this.value = value;
      this._setValue(this.config);
    },
    setConfig: function(config) {
      if (!config) {
        return;
      }
      this.config = config;
      //first, set background color
      if (this.config.display && this.config.display.backgroundColor) {
        html.setStyle(this.domNode, 'backgroundColor', this.config.display.backgroundColor);
      }
      this._updateStatisticsValue();
    },
    _setValue: function(config) {
      var gauge_config = {};
      gauge_config.series = [{
        data: [this.value]
      }];
      var showTargetValueLabel = false;
      //max min
      if (typeof config.max !== 'undefined' && typeof config.min !== 'undefined') {
        gauge_config.max = config.max;
        gauge_config.min = config.min;
      }
      var gaugeOption = {};
      //indicator color
      var indicatorInfo = this._getIndicatorInfo(config);
      //display
      if (jimuUtils.isNotEmptyObject(config.display)) {
        var display = config.display;
        //1.background color
        if (display.backgroundColor) {
          html.setStyle(this.domNode, 'backgroundColor', display.backgroundColor);
        }
        //2.gauge color
        if (display.gaugeColor) {
          gaugeOption.columnColor = display.gaugeColor;
        }
        if (display.bgColor) {
          gaugeOption.bgColor = display.bgColor;
        }
        //3.data labels
        if (jimuUtils.isNotEmptyObject(display.dataLabels) && display.dataLabels.state) {
          var dataLabels = display.dataLabels;
          //show data range or not
          gaugeOption.showDataRangeLabel = !!dataLabels.dataRange;
          //show target value or not
          gaugeOption.showTargetValueLabel = !!dataLabels.targetValue;
          showTargetValueLabel = gaugeOption.showTargetValueLabel;
          //label color
          gaugeOption.labelColor = dataLabels.textColor || '';
        }
        //4.current value
        var def_currentValue = {
          "state": true,
          "isRatio": false,
          "font": {
            "font": {
              "fontFamily": "Arial",
              "bold": false,
              "italic": false,
              "underline": false
            },
            // "fontSize": "24",
            "textColor": "#59bad8"
          },
          "dataFormat": {
            "unit": "none",
            "decimalPlaces": '',
            "prefix": "",
            "suffix": ""
          }
        };
        var currentValue;
        if (display.currentValue.state) {
          currentValue = display.currentValue;
        } else {
          currentValue = def_currentValue;
        }
        if (jimuUtils.isNotEmptyObject(currentValue)) {
          var valueStyle = {};
          //decimalPlaces in valueStyle for calculate rtl left distance
          var dataFormat = currentValue.dataFormat;
          if (dataFormat && dataFormat.decimalPlaces !== '' &&
            typeof dataFormat.decimalPlaces !== 'undefined') {
            valueStyle.decimalPlaces = Number(dataFormat.decimalPlaces);
          }
          //prefix and suffix -> formatter
          var formatter = lang.hitch(this, function(currentValue, val) {
            var value, valueText, unit = '';
            //4.1 ratio
            if (currentValue.isRatio) {
              value = val / config.max;
              value = value * 100;
              unit = '%';
            } else {
              value = val;
            }
            //4.2 dataFormat
            if (currentValue.dataFormat) {
              var dataFormat = currentValue.dataFormat;
              //4.2.1 unit
              if (!currentValue.isRatio) {
                if (dataFormat.unit === 'percentage') {
                  value = value * 100;
                  unit = '%';
                } else if (dataFormat.unit === 'thousand') {
                  unit = this.nls.thousandAbbreviation;
                  value = value / 1000;
                } else if (dataFormat.unit === 'million') {
                  unit = this.nls.millionAbbreviation;
                  value = value / 1.0e+6;
                } else if (dataFormat.unit === 'billion') {
                  unit = this.nls.billionAbbreviation;
                  value = value / 1.0e+9;
                }
              }
              //4.2.2 decimalPlaces
              if (dataFormat.decimalPlaces !== '' && typeof dataFormat.decimalPlaces !== 'undefined') {
                value = value.toFixed(Number(dataFormat.decimalPlaces));
              }
              value = value + unit;
              //4.2.3 prefix and suffix
              valueText = value;
              if (dataFormat.prefix) {
                valueText = dataFormat.prefix + ' ' + valueText;
              }
              if (dataFormat.suffix) {
                valueText += ' ' + dataFormat.suffix;
              }
            }
            return valueText;
          }, currentValue, this.value);
          valueStyle.formatter = formatter;
          //2. texyStyle
          if (currentValue.font) {
            var textStyle = {};
            if (typeof currentValue.font.fontSize !== 'undefined') {
              textStyle.fontSize = Number(currentValue.font.fontSize);
            }
            if (currentValue.font.textColor) {
              textStyle.color = currentValue.font.textColor;
            }
            if (indicatorInfo.valueColor) {
              textStyle.color = indicatorInfo.valueColor;
            }
            if (currentValue.font && currentValue.font.font) {
              var font = currentValue.font.font;
              textStyle.fontWeight = font.bold ? 'bold' : 'normal';
              if (font.fontFamily) {
                textStyle.fontFamily = font.fontFamily;
              }
              textStyle.fontStyle = font.italic ? 'italic' : 'normal';
            }
            valueStyle.textStyle = textStyle;
          }
          gaugeOption.valueStyle = valueStyle;
        }
      }
      if (indicatorInfo.targetValue) {
        gaugeOption.targetValue = showTargetValueLabel ? indicatorInfo.targetValue : [];
      }
      if (indicatorInfo.columnColor) {
        gaugeOption.columnColor = indicatorInfo.columnColor;
      }
      gauge_config.gaugeOption = gaugeOption;
      this.chart.updateConfig(gauge_config);
    },
    _getIndicatorInfo: function(config) {
      var targetValue = false,
        columnColor = false,
        valueColor = false;
      //1.target values
      var values = this._getIndicatorValues(config);
      if (jimuUtils.isNotEmptyObject(values, true)) {
        targetValue = values;
      }
      //2.value color column color
      var indicators = config.indicators;
      if (indicators) {
        var vaildIndicator = utils.getVaildIndicator(this.value, indicators, config.max);
        if (vaildIndicator && vaildIndicator.gaugeColor) {
          columnColor = vaildIndicator.gaugeColor;
        }
        if (vaildIndicator && vaildIndicator.valueColor) {
          valueColor = vaildIndicator.valueColor;
        }
      }
      return {
        targetValue: targetValue,
        columnColor: columnColor,
        valueColor: valueColor
      };
    },
    _initChart: function() {
      this.chart = new Chart({
        chartDom: this.domNode,
        config: this.DEFAULT_GAUGE_CONFIG
      });
      this.chart.placeAt(this.domNode);
      setTimeout(lang.hitch(this, function() {
        this.chart.resize();
      }), 300);
    },
    _getVaildValue: function(value) {
      if (typeof value === 'undefined') {
        return;
      }
      return Number(value);
    },
    _getIndicatorValues: function(config) {
      var values = [];
      if (config.indicators) {
        var indicators = config.indicators;
        indicators.forEach(function(item) {
          if (item.value) {
            item.value.forEach(lang.hitch(this, function(val) {
              values.push(!!item.isRatio ? config.max * (val / 100) : val);
            }));
          }
        });
        values.sort(function(value1, value2) {
          return value1 - value2;
        });
        values = jimuUtils.uniqueArray(values);
      }
      return values;
    }
  });
  return clazz;
});