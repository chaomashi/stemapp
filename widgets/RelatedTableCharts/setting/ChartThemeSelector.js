/*global dojo, dojox*/
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
    "jimu/BaseWidgetSetting",
    "dijit/_WidgetsInTemplateMixin",
    'dojo/text!./ChartThemeSelector.html',
    'dojo/_base/lang',
    'dojox/charting/Chart2D',
    'dojo/on',
    'dojo/dom-style',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/_base/array'
  ],
  function (declare, BaseWidgetSetting, _WidgetsInTemplateMixin,
    ThemeSelectorTemplate, lang, Chart2D, on, domStyle, domAttr, domConstruct,
    array) {

    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-RelatedTableCharts-setting',
      templateString: ThemeSelectorTemplate,
      //objet to maintain the selected theme
      selectedTheme: null,
      //predefined themes to be shown in the dropdown
      themes: [],

      postCreate: function () {
        this._setThemes();
        //chaeck if thems array is defined and have atleast one theme
        if (this.themes && this.themes.length > 0) {
          //by default show first theme from the theme array
          this.selectedTheme = lang.clone(this.themes[0]);
          //create theme list to be shown in selector
          this._createThemeList();
        }
      },

      destroy: function () {
        this.inherited(arguments);
      },

      _setThemes: function () {
        this.themes = [
        {
          "themeDisplayName": this.nls.ThemeSelector.themeAdobebricks,
          "className": "dojox/charting/themes/Adobebricks",
          "themeName": "Adobebricks"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeAlgae,
          "className": "dojox/charting/themes/Algae",
          "themeName": "Algae"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeBahamation,
          "className": "dojox/charting/themes/Bahamation",
          "themeName": "Bahamation"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeBlueDusk,
          "className": "dojox/charting/themes/BlueDusk",
          "themeName": "BlueDusk"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeCubanShirts,
          "className": "dojox/charting/themes/CubanShirts",
          "themeName": "CubanShirts"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeDesert,
          "className": "dojox/charting/themes/Desert",
          "themeName": "Desert"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeDistinctive,
          "className": "dojox/charting/themes/Distinctive",
          "themeName": "Distinctive"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeDollar,
          "className": "dojox/charting/themes/Dollar",
          "themeName": "Dollar"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeGrasshopper,
          "className": "dojox/charting/themes/Grasshopper",
          "themeName": "Grasshopper"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeGrasslands,
          "className": "dojox/charting/themes/Grasslands",
          "themeName": "Grasslands"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeGreySkies,
          "className": "dojox/charting/themes/GreySkies",
          "themeName": "GreySkies"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeHarmony,
          "className": "dojox/charting/themes/Harmony",
          "themeName": "Harmony"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeIndigoNation,
          "className": "dojox/charting/themes/IndigoNation",
          "themeName": "IndigoNation"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeIreland,
          "className": "dojox/charting/themes/Ireland",
          "themeName": "Ireland"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeMiamiNice,
          "className": "dojox/charting/themes/MiamiNice",
          "themeName": "MiamiNice"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeMinty,
          "className": "dojox/charting/themes/Minty",
          "themeName": "Minty"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themePurpleRain,
          "className": "dojox/charting/themes/PurpleRain",
          "themeName": "PurpleRain"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeRoyalPurples,
          "className": "dojox/charting/themes/RoyalPurples",
          "themeName": "RoyalPurples"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeSageToLime,
          "className": "dojox/charting/themes/SageToLime",
          "themeName": "SageToLime"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeTufte,
          "className": "dojox/charting/themes/Tufte",
          "themeName": "Tufte"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeWatersEdge,
          "className": "dojox/charting/themes/WatersEdge",
          "themeName": "WatersEdge"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themeWetlandText,
          "className": "dojox/charting/themes/Wetland",
          "themeName": "Wetland"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themePlotKitblue,
          "className": "dojox/charting/themes/PlotKit/blue",
          "themeName": "PlotKit.blue"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themePlotKitcyan,
          "className": "dojox/charting/themes/PlotKit/cyan",
          "themeName": "PlotKit.cyan"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themePlotKitgreen,
          "className": "dojox/charting/themes/PlotKit/green",
          "themeName": "PlotKit.green"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themePlotKitorange,
          "className": "dojox/charting/themes/PlotKit/orange",
          "themeName": "PlotKit.orange"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themePlotKitpurple,
          "className": "dojox/charting/themes/PlotKit/purple",
          "themeName": "PlotKit.purple"
        }, {
          "themeDisplayName": this.nls.ThemeSelector.themePlotKitred,
          "className": "dojox/charting/themes/PlotKit/red",
          "themeName": "PlotKit.red"
        }
        ];
      },

      /**
      * Function which will be invoked on clicking dropdown node
      * and Show/Hide the dropdown list
      * @memberOf widgets/RelatedTableCharts/settings/ChartThemeSelector.js
      **/
      _onDropDownClick: function () {
        if (domStyle.get(this.themeChooseNode, 'display') === 'none') {
          this.showChooseNode();
        } else {
          this.hideChooseNode();
        }
      },

      /**
      * Function to show dropdown list
      * @memberOf widgets/RelatedTableCharts/settings/ChartThemeSelector.js
      **/
      showChooseNode: function () {
        domStyle.set(this.themeChooseNode, 'display', '');
      },

      /**
      * Function to hide dropdown list
      * @memberOf widgets/RelatedTableCharts/settings/ChartThemeSelector.js
      **/
      hideChooseNode: function () {
        domStyle.set(this.themeChooseNode, 'display', 'none');
      },

      /**
      * Function to create list of themes
      * @memberOf widgets/RelatedTableCharts/settings/ChartThemeSelector.js
      **/
      _createThemeList: function () {
        var requireTheme = [];
        //create require class array to load themes
        array.forEach(this.themes, function (theme) {
          requireTheme.push(theme.className);
        });
        //load all the themes
        require(requireTheme, lang.hitch(this, function () {
          array.forEach(this.themes, lang.hitch(this, function (
            themeObj) {
            var row, rowChart, rowLabel, chart;
            row = domConstruct.create("div", {
              "class": "esriCTThemeItem",
              "title": themeObj.themeDisplayName
            }, this.themeList);
            //set the attributes for each row, which will be used to set the selected theme object
            domAttr.set(row, "themeDisplayName", themeObj.themeDisplayName);
            domAttr.set(row, "themeClass", themeObj.className);
            domAttr.set(row, "themeName", themeObj.themeName);
            //handle row click event and show the selected theme
            on(row, "click", lang.hitch(this, function () {
              var selectedTheme = {
                "themeDisplayName": domAttr.get(row, "themeDisplayName"),
                "className": domAttr.get(row, "themeClass"),
                "themeName": domAttr.get(row, "themeName")
              };
              this.selectTheme(selectedTheme);
            }));

            rowChart = dojo.create("div", {
              "class": "esriCTThemeChart"
            }, row);
            rowLabel = dojo.create("div", {
              "class": "esriCTThemeName"
            }, row);
            chart = domConstruct.create("div", {},
              rowChart);
            domConstruct.create("div", {
              className: "title",
              innerHTML: themeObj.themeDisplayName
            }, rowLabel);
            this._createChart(themeObj.themeName, chart);
          }));
          //by default show first theme from the theme array as selected
          this.selectTheme(this.selectedTheme);
        }));

      },

      /**
      * Function to create chart using theme name
      * @memberOf widgets/RelatedTableCharts/settings/ChartThemeSelector.js
      **/
      _createChart: function (theme, chartContiner) {
        var chartDiv, chart;
        chartDiv = domConstruct.create("div", {
          className: "chart"
        }, chartContiner);
        //create chart object
        chart = new Chart2D(chartDiv);
        //set the selected theme
        chart.setTheme(dojo.getObject("dojox.charting.themes." + theme));
        chart.addPlot("default", {
          type: "Pie",
          radius: 11,
          labels: false,
          radGrad: dojox.gfx.renderer === "vml" ? "fan" : "native"
        });
        //add static series to show chart
        chart.addSeries("Series A", [0.35, 0.25, 0.42, 0.53, 0.69]);
        chart.render();
      },

      /**
      * Function to show the selected theme and generate the event
      * @memberOf widgets/RelatedTableCharts/settings/ChartThemeSelector.js
      **/
      selectTheme: function (themeObj) {
        //empty selectedThemeContainer
        if (this.selectedThemeChart) {
          domConstruct.empty(this.selectedThemeChart);
        }
        //set newly selected theme
        this.selectedTheme = {
          "themeDisplayName": themeObj.themeDisplayName || themeObj.themeName,
          "className": themeObj.className,
          "themeName": themeObj.themeName
        };
        //show selected theme in selectedThemeContainer
        this._createChart(themeObj.themeName, this.selectedThemeChart);
        domAttr.set(this.selectedThemeName, "innerHTML", this.selectedTheme.themeDisplayName);
        //call this method to close drop list
        this.hideChooseNode();
        //generate event
        this.onThemeSelect(this.selectedTheme);
      },

      /**
      * Event which will be generated on selecting any theme
      * @param {object} selectedTheme : object containing selected themeName and className
      * @memberOf widgets/RelatedTableCharts/settings/FieldSelector.js
      **/
      onThemeSelect: function (selectedTheme) { /*jshint unused: false*/ }
    });
  });