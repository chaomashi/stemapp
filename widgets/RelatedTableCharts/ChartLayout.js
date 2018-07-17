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
   'jimu/BaseWidgetSetting',
   'jimu/utils',
   'dojo/dom-attr',
   'dojo/dom-construct',
   'dojo/dom-style',
   'dojo/_base/declare',
   'dojo/_base/lang',
   'dijit/_WidgetsInTemplateMixin',
   'dojo/text!./ChartLayout.html',
   'dojox/charting/Chart',
   'dojox/charting/plot2d/Pie',
   'dojox/charting/action2d/Tooltip',
   'dojox/charting/action2d/Highlight',
   'dojox/charting/action2d/MoveSlice',
   'dojox/charting/plot2d/Spider',
   'dojox/charting/widget/SelectableLegend',
   'dojox/charting/action2d/Magnify',
   'dojo/_base/array',
   'dojox/charting/plot2d/Bars',
   'dojox/charting/axis2d/Default'
],
function (BaseWidgetSetting, jimuUtils, domAttr, domConstruct, domStyle, declare, lang,
    _WidgetsInTemplateMixin, template, Chart, Pie, Tooltip, Highlight,
    MoveSlice, Spider, SelectableLegend, Magnify, array) {

  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-RelatedTableCharts-layout',
    templateString: template,

    postCreate: function () {
      this.inherited(arguments);
    },

    startup: function () {
      this._createChartLayout();
    },

    /**
    * create chart layout
    * @memberOf widgets/RelatedTableCharts/setting/charLayout
    **/
    _createChartLayout: function () {
      this._setNodeValue(this.layoutHeaderTitle, this.config.chartConfig.chartTitle, true);
      this._setNodeValue(this.chartDescription, this.config.chartConfig.description, false);
      this._initChart();
    },

    /**
    * Resize the chart after specified duration timeout
    * @memberOf widgets/RelatedTableCharts/setting/charLayout
    **/
    resizeChart: function (duration) {
      if (this.chart) {
        setTimeout(lang.hitch(this, function () {
          //in case of pie chart recreate the chart
          if (this.config.chartConfig.chartType !== "PieChart") {
            this.chart.resize();
          } else {
            this._initChart();
          }
          this.onChartResize();
        }), duration);
      }
    },

    /**
    * Set node value with configured fields
    * @memberOf widgets/RelatedTableCharts/setting/charLayout
    **/
    _setNodeValue: function (node, configuredValue, isSetTitle) {
      var fieldValue = configuredValue;
      if (!this.config.isPreview) {
        fieldValue = this._getFieldValues(configuredValue, this.config.selectedFeature.attributes);
      }
      if (fieldValue) {
        //get valid html input string
        fieldValue = jimuUtils.sanitizeHTML(fieldValue);
        domAttr.set(node, "innerHTML", fieldValue);
        if (isSetTitle) {
          domAttr.set(node, "title", fieldValue);
        }
      } else {
        //hide node if respective configured attribute value is null
        domStyle.set(node, "display", "none");
      }
    },

    /**
    * initialize chart based on the configuration
    * @memberOf widgets/RelatedTableCharts/setting/charLayout
    **/
    _initChart: function () {
      switch (this.config.chartConfig.chartType) {
        case "BarChart":
          this._createBarChart();
          break;
        case "PieChart":
          this._createPieChart();
          break;
        case "PolarChart":
          this._createPolarChart();
          break;
        default:
          domAttr.set(this.chartContainer, "innerHTML", this.nls.errMsgNoFeaturesFound);
      }
    },

    /**
    * calculates the height of the bar chart containers based on number of bars
    * @memberOf widgets/RelatedTableCharts/setting/charLayout
    **/
    _getBarChartContainerHeight: function () {
      var chartHeight = 30;
      if (this.config.chartData.chartSeries.length > 0) {
        chartHeight = this.config.chartData.chartSeries.length * 30;
      }
      if (this.config.isPreview) {
        if (chartHeight <= 150) {
          chartHeight += 150;
        }
      }
      else{
        if (chartHeight <= 150) {
          chartHeight += 100;
        }
      }
      chartHeight = chartHeight + "px";
      return chartHeight;
    },

    /**
    * create bar chart as per the settings
    * @memberOf widgets/RelatedTableCharts/setting/charLayout
    **/
    _createBarChart: function () {
      var chart, yAxis = {}, xAxis = {}, chartHeight = 40, fontFamily, fontSize,
        fontColor, chartSeriesProps = {};
      domConstruct.empty(this.chartContainer);
      chartHeight = this._getBarChartContainerHeight();
      chart = new Chart(domConstruct.create("div", {
        "style": "overflow:hidden; width:100%; height:" + chartHeight
      }, this.chartContainer));
      // Add the only/default plot
      chart.addPlot("default", { type: "Bars", gap: 4, minBarSize: 10, maxBarSize: 15 });
      fontFamily = domStyle.get(this.chartDescription, "fontFamily");
      fontSize = domStyle.get(this.chartDescription, "fontSize");
      fontColor = domStyle.get(this.chartDescription, "color");
      //set yAxis data
      yAxis = {
        labels: this.config.chartData.chartLabels,
        maxLabelCharCount: 30,
        trailingSymbol: "...",
        natural: true,
        majorTickStep: 1,
        minorTicks: false,
        fixUpper: true,
        includeZero: false,
        vertical: true,
        titleFontColor: fontColor,
        titleFont: "normal normal normal " + fontSize + ' ' + fontFamily,
        font: "normal normal normal 9px" + ' ' + fontFamily
      };
      if (window.isRTL) {
        yAxis.leftBottom = false;
        chart.setDir("rtl");
      }
      xAxis = {
        fixLower: "major",
        fixUpper: "major",
        minorTicks: false,
        includeZero: true,
        titleFontColor: fontColor,
        titleFont: "normal normal normal " + fontSize + ' ' + fontFamily,
        font: "normal normal normal 9px" + ' ' + fontFamily
      };
      //set chart options based on if it is for preview or not
      if (this.config.isPreview) {
        xAxis.titleGap = 5;
        yAxis.majorTick = { length: 0 };
        xAxis.majorTick = { length: 0 };
        yAxis.majorLabels = false;
        xAxis.majorLabels = false;
        yAxis.minorLabels = false;
        xAxis.minorLabels = false;
        yAxis.title = this.config.chartConfig.labelYAxis;
        xAxis.title = this.config.chartConfig.labelXAxis;
        chartSeriesProps.stroke = {
          width: 0
        };
      } else {
        new Tooltip(chart, "default");
        yAxis.title = this._getFieldValues(this.config.chartConfig.labelYAxis,
          this.config.selectedFeature.attributes);
        xAxis.title = this._getFieldValues(this.config.chartConfig.labelXAxis,
          this.config.selectedFeature.attributes);
        chartSeriesProps.stroke = {
          width: 1
        };
      }
      xAxis.titleOrientation = "away";
      //add chart axis
      chart.addAxis("y", yAxis);
      chart.addAxis("x", xAxis);
      //If theme is selected, apply the same on chart
      if (this.config.chartData.selectedTheme) {
        chart.setTheme(this.config.chartData.selectedTheme);
      }
      //set chart series Properties
      //If the fill color is specified then apply it
      if (this.config.chartData.fill) {
        chartSeriesProps.fill = this.config.chartData.fill;
      }
      //add chart series
      array.forEach(this.config.chartData.chartSeries, function (eachSeries, index) {
        eachSeries.x = index + 1;
        eachSeries.y = eachSeries.y;
        chart.addSeries(index + 1, [eachSeries], chartSeriesProps, {
          plot: "default"
        });
      }, this);
      //set chart animations and highlights
      new Highlight(chart, "default");
      //Render the chart
      chart.render();
      this.chart = chart;
      this.onChartCreated();
    },

    /**
    * create pie chart as per the settings
    * @memberOf widgets/RelatedTableCharts/setting/charLayout
    **/
    _createPieChart: function () {
      var chart, chartNodeDiv, plotObject = {};
      domConstruct.empty(this.chartContainer);
      chartNodeDiv = domConstruct.create("div", {
        "style": "width:100%; height:100%; overflow:auto"
      }, this.chartContainer);
      chart = new Chart(chartNodeDiv);
      plotObject = {
        type: Pie,
        labels: true,
        ticks: true,
        fixed: true,
        precision: 0,
        labelWiring: "#ccc",
        labelStyle: "columns",
        htmlLabels: true,
        startAngle: -10,
        maxLabelCharCount: 20,
        trailingSymbol: "..."
      };
      //if label field is not selected then don't show the labels
      if (this.config.chartConfig.labelField === "esriCTEmptyOption") {
        plotObject.labels = false;
      }
      //set chart plot
      chart.addPlot("default", plotObject);
      //if chart is not for preview then set tooltips
      if (!this.config.isPreview) {
        new Tooltip(chart, "default");
      }
      //If the fill color is specified then apply the it
      if (this.config.chartData.fill) {
        chart.addSeries(this.config.chartConfig.dataSeriesField,
        this.config.chartData.chartSeries, { fill: this.config.chartData.fill },
        { plot: "default" });
      } else {
        chart.addSeries(this.config.dataSeriesField, this.config.chartData.chartSeries,
        { plot: "default" });
      }
      //If theme is selected, apply the same on chart
      if (this.config.chartData.selectedTheme) {
        chart.setTheme(this.config.chartData.selectedTheme);
      }
      //set chart animations and highlights
      new MoveSlice(chart, "default");
      new Highlight(chart, "default");
      //Render the chart
      chart.render();
      this.chart = chart;
      this.onChartCreated();
    },

    /**
    * create polar chart as per the settings
    * @memberOf widgets/RelatedTableCharts/setting/charLayout
    **/
    _createPolarChart: function () {
      var chartNodeDiv, chart, key, fontFamily, seriesFillAlphaValue = 0.2,
        dataObj, i, showLegend = false;
      if (this.chart) {
        this.chart.destroy();
      }
      domConstruct.empty(this.chartContainer);
      domStyle.set(this.chartContainer, "direction", "inherit");
      chartNodeDiv = domConstruct.create("div", {
        "style": "width:100%; height:100%; overflow:hidden"
      }, this.chartContainer);
      fontFamily = domStyle.get(this.chartDescription, "fontFamily");
      chart = new Chart(chartNodeDiv);
      //set polygon opacity for polar chart if 'polygonFill' is set to true in config
      if (!this.config.chartConfig.showPolygonFill) {
        seriesFillAlphaValue = 0;
      }
      chart.addPlot("default", {
        type: Spider,
        labelOffset: -10,
        divisions: 5,
        seriesFillAlpha: seriesFillAlphaValue,
        markerSize: 3,
        precision: 0,
        spiderType: "polygon",
        axisFont: "normal normal normal 9px/25px" + ' ' + fontFamily
      });
      //If theme is selected, apply the same on chart
      if (this.config.chartData.selectedTheme) {
        chart.setTheme(this.config.chartData.selectedTheme);
      } else if (this.config.chartConfig.chartColor.colorInfo && this.config.chartConfig
        .chartColor.colorInfo.layerField) {
        showLegend = true;
      }
      //add series to chart
      for (i = 0; i < this.config.chartData.chartSeries.length; i++) {
        dataObj = this.config.chartData.chartSeries[i];
        for (key in dataObj) {
          if (dataObj.hasOwnProperty(key)) {
            if (this.config.chartData.fill) {
              //set chart series Properties
              //If the fill color is specified then apply it
              chart.addSeries(key, dataObj[key], {
                fill: this.config.chartData.fill
              });
            } else if (dataObj[key].fill) {
              chart.addSeries(key, dataObj[key], {
                fill: dataObj[key].fill,
                legend: dataObj[key].legendLabel
              });
            } else {
              chart.addSeries(key, dataObj[key]);
            }
          }
        }
      }
      //if chart is not for preview then set tooltips
      if (!this.config.isPreview) {
        new Tooltip(chart, "default");
      }
      new Highlight(chart, "default");
      new Magnify(chart, "default", { duration: 800, scale: 1.5 });
      chart.render();
      this.chart = chart;
      //if chart is not for preview and coloy by field value option is configured then only show
      //legend panel for polar graph
      if (!this.config.isPreview && showLegend) {
        domStyle.set(this.legendContainer, "display", "block");
        this._createChartLegend(chart);
      }
      this.onChartCreated();
    },

    /**
    * create  legend for polar chart
    * @memberOf widgets/RelatedTableCharts/setting/charLayout
    **/
    _createChartLegend: function (chart) {
      setTimeout(lang.hitch(this, function () {
        if (this.legend) {
          //destroy old legend instance
          this.legend.destroy();
          this.legend = null;
        }
        domConstruct.empty(this.legendNode);
        this.legend = new SelectableLegend({
          chart: chart,
          horizontal: true
        }, domConstruct.create("div", {}, this.legendNode));
      }), 1500);
    },

    /**
    * callback which confirms the creation of particular chart
    * @memberOf widgets/RelatedTableCharts/setting/charLayout
    **/
    onChartCreated: function () {

    },

    onChartResize: function () {

    },
    /**
    * fetch field values from the feature attributes
    * @memberOf widgets/RelatedTableCharts/setting/charLayout
    **/
    _getFieldValues: function (inputString, attributes) {
      var inputSubFieldsArr, outputString = '', inputFieldsArr, i, j;
      inputString = inputString.replace(/(\n|\r|\r\n)/g, '<br>');
      inputFieldsArr = inputString.split('{');
      for (i = 0; i < inputFieldsArr.length; i++) {
        if (i === 0) {
          outputString += inputFieldsArr[i];
        } else {
          if (inputFieldsArr[i].indexOf('}') !== -1) {
            inputSubFieldsArr = inputFieldsArr[i].split("}");
            for (j = 0; j < inputSubFieldsArr.length; j++) {
              if (j === 0) {
                if (attributes[inputSubFieldsArr[j]] || attributes[inputSubFieldsArr[j]] === 0) {
                  outputString += attributes[inputSubFieldsArr[j]];
                }
              } else if (j === 1) {
                outputString += inputSubFieldsArr[j];
              } else {
                outputString += "}" + inputSubFieldsArr[j];
              }
            }
          } else {
            outputString += "{";
          }
        }
      }
      return outputString;
    }
  });
});