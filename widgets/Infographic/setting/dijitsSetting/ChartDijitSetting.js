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
  'dojo/_base/lang',
  'dojo/_base/html',
  'dojo/_base/array',
  'dojo/_base/declare',
  'dojo/Evented',
  './BaseDijitSetting',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./ChartDijitSetting.html',
  'jimu/dijit/TabContainer3',
  './_dijits/ChartDijitSettingUtils',
  './_dijits/ChartSort',
  './_dijits/TogglePocket',
  './_dijits/VisibleSliderBar',
  './_dijits/SeriesStyle/SeriesStyle',
  'dojo/text!../templates.json',
  '../utils',
  './_dijits/ChartColorSetting',
  'jimu/dijit/_DataFields',
  'dijit/form/Select',
  'dijit/form/NumberSpinner'
], function(on, query, lang, html, array, declare, Evented, BaseDijitSetting, _WidgetsInTemplateMixin,
  templateString, TabContainer3, ChartDijitSettingUtils, ChartSort, TogglePocket,
  VisibleSliderBar, SeriesStyle, templates, igUtils) {
  var clazz = declare([BaseDijitSetting, _WidgetsInTemplateMixin, Evented], {
    templateString: templateString,
    type: 'chart',
    baseClass: 'infographic-chart-dijit-setting',
    colors: ['#68D2E0', '#087E92', '#47BCF5', '#FBE66A', '#F29157', '#C8501D', '#2DB7C6', '#C4EEF6'],
    ignoreChangeEvents: false,
    //dataSourceType: '', //CLIENT_FEATURES, FRAMEWORK_FEATURES, FRAMEWORK_STATISTICS
    tabContainer: null,

    postMixInProperties: function() {
      lang.mixin(this.nls, window.jimuNls.statisticsChart);
    },

    /* Init default option */
    constructor: function(option) {
      this.inherited(arguments);

      if (option.nls) {
        this.nls = option.nls;
      }

      this.appConfig = option.appConfig;
      //Init chart dijit setting utils
      this.chartDijitSettingUtils = new ChartDijitSettingUtils({
        map: option.map,
        appConfig: this.appConfig,
        colors: this.colors,
        templates: templates,
        templateName: option.templateName,
        nls: this.nls
      });

      this.config = option.config;

      //init PRE_MODLE
      this.PRE_MODLE = {
        config: {},
        computed: {}
      };

      //keep the chart dijit setting utils always has the newest PRE_MODLE
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      //get the initialization modle
      this.modle = this.chartDijitSettingUtils.getInitializationModle(this.config);
    },

    postCreate: function() {
      this.inherited(arguments);
      //Ignore all change event when init dom
      this.ignoreChangeEvents = true;
      this._initDom();
    },

    //features for calculate custom color
    setFeatures: function(features) {
      if (this.chartDijitSettingUtils) {
        this.chartDijitSettingUtils.setFeatures(features);
      }
    },

    /* `Program entry`, start rendering when there is a data source */
    setDataSource: function(dataSource) {
      this.inherited(arguments);
      //If the data source does not change, do not do the operation
      if (this.chartDijitSettingUtils.isDSEqual(this.modle.dataSource, dataSource)) {
        return;
      }
      this.ignoreChangeEvents = true;
      //If you have a data source, now set up a new data source,
      //Reset UI based on initial template data
      if (this.modle.dataSource) {
        this.clearPreDataSource(this.modle.dataSource);
      }
      this.modle.dataSource = null;
      this.modle.dataSource = dataSource;

      this._setLayerDefinitionToModle(this.modle).then(function(modle) {
        this.ignoreChangeEvents = false;
        //When set new data source, put the selected field to the top for value fields list
        this._moveValueFieldToFirst = true;
        //render UI by new data source and config
        this.render(modle);
        this._moveValueFieldToFirst = false;
      }.bind(this));
    },

    //Updating modle.definition(layerDefinition) based on data source
    _setLayerDefinitionToModle: function(modle) {
      return this.chartDijitSettingUtils.getLayerDefinitionByDataSource(modle).then(function(definition) {
        modle.computed.definition = definition;
        return modle;
      }.bind(this), function(error) {
        console.error(error.message || error);
      }.bind(this));
    },

    render: function(modle) {
      this.ignoreChangeEvents = true;
      //Update the computing properties of Modle
      this._updateModleComputed(modle);
      //Dynamically update the config of Modle
      this.chartDijitSettingUtils.dynamicUpdateModleConfig(modle);
      this._render(modle);
      setTimeout(lang.hitch(this, function() {
        this.ignoreChangeEvents = false;
        if (!this.domNode) {
          return;
        }
        this.onChange();
      }.bind(this)), 200);
    },

    isValid: function() {
      if (!this.modle.computed.definition) {
        return false;
      }
      return this.maxLabels.isValid() && this.hollowSizeControl.isValid() &&
        this.legendTextSizeControl.isValid() && this.verticalAxisTextSizeControl.isValid() &&
        this.horizontalAxisTextSizeControl.isValid() && this.dataLabelSizeControl.isValid();
    },

    getConfig: function(check) {

      if (!this.isValid(check)) {
        return false;
      }

      var modleConfig = this.modle.config;
      var cleanConfig = igUtils.getCleanChartConfig(modleConfig);
      if (!cleanConfig) {
        this.dijit.clearChart();
        return;
      }
      return cleanConfig;
    },

    onChange: function() {
      if (this.ignoreChangeEvents) {
        return;
      }
      var config = this.getConfig();
      if (config) {
        this.dijit.setConfig(config);
      }
    },

    _render: function(modle) {
      this._renderByModleComputed(modle);
      this._renderByModleConfig(modle);
    },

    _renderByModleComputed: function(modle) {
      var computed = modle.computed;
      var preComputed = this.PRE_MODLE.computed;
      if (igUtils.isEqual(computed, preComputed)) {
        return;
      }
      if (!computed) {
        return;
      }
      //1.categoryFieldOptions
      if (!igUtils.isEqual(computed.categoryFieldOptions, preComputed.categoryFieldOptions)) {
        if (computed.categoryFieldOptions && this.categoryFieldSelect) {
          igUtils.updateOptions(this.categoryFieldSelect, computed.categoryFieldOptions);
        }
      }
      //2.labelFieldsOptions
      if (!igUtils.isEqual(computed.labelFieldsOptions, preComputed.labelFieldsOptions)) {
        if (computed.labelFieldsOptions && this.labelFieldSelect) {
          igUtils.updateOptions(this.labelFieldSelect, computed.labelFieldsOptions);
        }
      }
      //3.valueFields
      if (!igUtils.isEqual(computed.valueFields, preComputed.valueFields)) {
        if (computed.valueFields) {
          this.valueFields.setFields(computed.valueFields);
        }
      }

      //5.modes
      if (!igUtils.isEqual(computed.modes, preComputed.modes)) {
        if (computed.modes && computed.modes.length > 0) {
          this._initChartMode(computed.modes);
        } else {
          this._initChartMode(["feature", "category", "count", "field"]);
        }
      }

      //6.showDateOption
      if (!igUtils.isEqual(computed.showDateOption, preComputed.showDateOption)) {
        if (computed.showDateOption) {
          this._showDataOption(this.modle.config.type);
        } else {
          this._hideDataOption();
          modle.config.dateConfig = null;
        }
      }

      //8.sort fields
      if (!igUtils.isEqual(computed.sortComputed, preComputed.sortComputed)) {
        if (computed.sortComputed) {
          this.chartSortDijit.updateComputeds(computed.sortComputed);
        }
      }

      //9.valueFieldsAsMultipleMode
      if (!igUtils.isEqual(computed.valueFieldsAsMultipleMode, preComputed.valueFieldsAsMultipleMode)) {
        if (computed.valueFieldsAsMultipleMode) {
          this.valueFields.setMultipleMode();
        } else {
          this.valueFields.setSingleMode();
        }
      }
      // 10.series style option seriesStyleComputed
      if (!igUtils.isEqual(computed.seriesStyleComputed, preComputed.seriesStyleComputed)) {
        this.seriesStyleDijit.updateComputed(computed.seriesStyleComputed);
      }

      //11.legend display
      if (!igUtils.isEqual(computed.legendDisplay, preComputed.legendDisplay)) {
        if (computed.legendDisplay) {
          this._showLegend();
        } else {
          this._hideLegend();
        }
      }

    },

    _renderByModleConfig: function(modle) {
      var config = modle.config;
      var preConfig = this.PRE_MODLE.config;
      if (!config) {
        return;
      }
      //1.mode
      if (!igUtils.isEqual(config.mode, preConfig.mode)) {
        if (config.mode) {
          this.chartModeSelect.set('value', config.mode);
          //value fields checks
          // if (this.valueFields) {
          //   this.valueFields.unSelectedAll();
          //   config.valueFields = [];
          // }
          this._updateElementDisplayByChartMode(modle);
        }
      }
      //2.labelField
      if (!igUtils.isEqual(config.labelField, preConfig.labelField) && config.labelField) {
        this.labelFieldSelect.set('value', config.labelField);
      }
      //3.categoryField
      if (!igUtils.isEqual(config.categoryField, preConfig.categoryField) && config.categoryField) {
        this.categoryFieldSelect.set('value', config.categoryField);
      }
      //4.valueFields
      if (!igUtils.isEqual(config.valueFields, preConfig.valueFields) && config.valueFields) {
        this.valueFields.selectFields(config.valueFields, !this._moveValueFieldToFirst);
      }
      //5.operation
      if (!igUtils.isEqual(config.operation, preConfig.operation)) {
        if (config.operation) {
          this.operationSelect.set('value', config.operation);
        } else {
          this.operationSelect.set('value', 'sum');
        }
      }

      //6.date config
      if (!igUtils.isEqual(config.dateConfig, preConfig.dateConfig)) {
        if (config.dateConfig) {
          var dateConfig = config.dateConfig;
          //Minimum period
          this.periodSelect.set('value', dateConfig.minPeriod);
          //Periods without records
          this.showRadioBtn.setChecked(dateConfig.isNeedFilled);
          this.hideRadioBtn.setChecked(!dateConfig.isNeedFilled);
        } else {
          this.periodSelect.set('value', 'automatic');
          this.showRadioBtn.setChecked(true);
          this.hideRadioBtn.setChecked(false);
        }
      }

      //7. sort order
      if (!igUtils.isEqual(config.sortOrder, preConfig.sortOrder) && config.sortOrder) {
        this.chartSortDijit.setConfig(config.sortOrder);
      }
      //8.max categories(labels)
      if (!igUtils.isEqual(config.maxLabels, preConfig.maxLabels)) {
        if (typeof config.maxLabels !== 'undefined') {
          this.maxLabels.set('value', config.maxLabels);
        } else {
          this.maxLabels.set('value', '');
        }
      }

      //9.null value
      if (!igUtils.isEqual(config.nullValue, preConfig.nullValue)) {
        if (typeof config.nullValue !== 'undefined') {
          this.zeroRadioBtn.setChecked(config.nullValue);
          this.ignoreRadioBtn.setChecked(!config.nullValue);
        } else {
          this.zeroRadioBtn.setChecked(true);
          this.ignoreRadioBtn.setChecked(false);
        }
      }

      //series style
      if (!igUtils.isEqual(config.seriesStyle, preConfig.seriesStyle)) {
        this.seriesStyleDijit.setConfig(config.seriesStyle);
      }

      if (!igUtils.isEqual(config.innerRadius, preConfig.innerRadius)) {
        if (typeof config.innerRadius !== 'undefined') {
          this.hollowSizeControl.setValue(config.innerRadius);
        }
      }

      //display section, except use layer's symbol
      if (!igUtils.isEqual(config.backgroundColor, preConfig.backgroundColor)) {
        this.bgColor.setSingleColor(config.backgroundColor);
      }

      if (!igUtils.isEqual(config.legendTextColor, preConfig.legendTextColor)) {
        this.legendTextColor.setSingleColor(config.legendTextColor);
      }

      if (!igUtils.isEqual(config.horizontalAxisTextColor, preConfig.horizontalAxisTextColor)) {
        this.horTextColor.setSingleColor(config.horizontalAxisTextColor);
      }
      if (!igUtils.isEqual(config.verticalAxisTextColor, preConfig.verticalAxisTextColor)) {
        this.verTextColor.setSingleColor(config.verticalAxisTextColor);
      }
      if (!igUtils.isEqual(config.dataLabelColor, preConfig.dataLabelColor)) {
        this.dataLabelTextColor.setSingleColor(config.dataLabelColor);
      }
      if (!igUtils.isEqual(config.showLegend, preConfig.showLegend)) {
        this.legendTogglePocket.setState(!!config.showLegend);
      }
      if (!igUtils.isEqual(config.showHorizontalAxis, preConfig.showHorizontalAxis)) {
        this.horTogglePocket.setState(!!config.showHorizontalAxis);
      }
      if (!igUtils.isEqual(config.showVerticalAxis, preConfig.showVerticalAxis)) {
        this.verTogglePocket.setState(!!config.showVerticalAxis);
      }
      if (!igUtils.isEqual(config.showDataLabel, preConfig.showDataLabel)) {
        this.dataLabelTogglePocket.setState(!!config.showDataLabel);
      }

    },

    _updateModleComputed: function(modle) {
      this.chartDijitSettingUtils.updateModleComputedWithDefinition(modle);
      this.chartDijitSettingUtils.updateModleComputedOnlyByConfig(modle);
    },

    _initDom: function() {
      var tabs = [{
        title: this.nls.data,
        content: this.dataSection
      }, {
        title: this.nls.display,
        content: this.displaySection
      }];

      this.tabContainer = new TabContainer3({
        average: true,
        tabs: tabs
      });

      //series style
      this.seriesStyleDijit = new SeriesStyle({
        nls: this.nls
      });
      this.seriesStyleDijit.placeAt(this.chartColorContainer);
      this.seriesStyleDijit.startup();
      this.own(on(this.seriesStyleDijit, 'change', lang.hitch(this, this._onSeriesStyleDijitChanged)));
      this.own(on(this.seriesStyleDijit, 'update-colors', lang.hitch(this, function(colors) {
        this.chartDijitSettingUtils.setCustomColor(colors);
        this._onCustomColorsChanged();
      })));
      //chart mode
      this._initChartMode(["feature", "category", "count", "field"]);
      //hollow size
      this.hollowSizeControl = new VisibleSliderBar({
        min: 0,
        max: 60,
        step: 1,
        value: this.config.innerRadius || 0
      });
      this.own(on(this.hollowSizeControl, 'change', lang.hitch(this, this._onHollowSizeControlChanged)));
      this.hollowSizeControl.placeAt(this.hollowSize);

      //legend text size
      this.legendTextSizeControl = new VisibleSliderBar({
        min: 6,
        max: 40,
        step: 1,
        value: this.config.legendTextSize || 12
      });
      this.own(on(this.legendTextSizeControl, 'change', lang.hitch(this, this._onLegendTextSizeChanged)));
      this.legendTextSizeControl.placeAt(this.legendTextSize);

      //Vertical axis text size
      this.verticalAxisTextSizeControl = new VisibleSliderBar({
        min: 6,
        max: 40,
        step: 1,
        value: this.config.verticalAxisTextSize || 12
      });
      this.own(on(this.verticalAxisTextSizeControl, 'change', lang.hitch(this, this._onVerticalAxisTextSizeChanged)));
      this.verticalAxisTextSizeControl.placeAt(this.verTextSize);

      //Horizontal axis text size
      this.horizontalAxisTextSizeControl = new VisibleSliderBar({
        min: 6,
        max: 40,
        step: 1,
        value: this.config.horizontalAxisTextSize || 12
      });
      this.own(on(this.horizontalAxisTextSizeControl, 'change',
        lang.hitch(this, this._onHorizontalAxisTextSizeChanged)));

      this.horizontalAxisTextSizeControl.placeAt(this.horTextSize);

      //data Label text size
      this.dataLabelSizeControl = new VisibleSliderBar({
        min: 6,
        max: 40,
        step: 1,
        value: this.config.dataLabelSize || 12
      });
      this.own(on(this.dataLabelSizeControl, 'change', lang.hitch(this, this._onDataLabelSizeChanged)));
      this.dataLabelSizeControl.placeAt(this.dataLabelTextSize);

      //legend for column, bar, line and pie
      this.legendTogglePocket = new TogglePocket({
        titleLabel: this.nls.legend,
        content: this.legendTogglePocketContent,
        className: 'section-item column-type bar-type line-type pie-type'
      });
      this.own(on(this.legendTogglePocket, 'change', lang.hitch(this, this._onLegendTogglePocketChanged)));
      this.legendTogglePocket.placeAt(this.displaySection);

      //horizontal axis for column, bar and line
      this.horTogglePocket = new TogglePocket({
        titleLabel: this.nls.horizontalAxis,
        content: this.horTogglePocketContent,
        className: 'section-item column-type bar-type line-type'
      });
      this.own(on(this.horTogglePocket, 'change', lang.hitch(this, this._onHorTogglePocketChanged)));
      this.horTogglePocket.placeAt(this.displaySection);

      //vertical axis for column, bar and line
      this.verTogglePocket = new TogglePocket({
        titleLabel: this.nls.verticalAxis,
        content: this.verTogglePocketContent,
        className: 'section-item column-type bar-type line-type'
      });
      this.own(on(this.verTogglePocket, 'change', lang.hitch(this, this._onVerTogglePocketChanged)));
      this.verTogglePocket.placeAt(this.displaySection);

      //data labels for pie
      this.dataLabelTogglePocket = new TogglePocket({
        titleLabel: this.nls.dataLabels,
        content: this.dataLabelTogglePocketContent,
        className: 'section-item pie-type'
      });
      this.own(on(this.dataLabelTogglePocket, 'change', lang.hitch(this, this._onDataLabelsTogglePocketChanged)));
      this.dataLabelTogglePocket.placeAt(this.displaySection);

      // init chart sort
      this.chartSortDijit = new ChartSort({
        nls: this.nls
      });
      this.own(on(this.chartSortDijit, 'change', lang.hitch(this, this._onChartSortDijitChanged)));
      this.chartSortDijit.placeAt(this.chartSort);

      this.tabContainer.placeAt(this.domNode);
      //max categories
      if (this.modle.config.type === 'pie') {

        this.maxLabels.constraints = {
          min: 1,
          max: 100
        };
        this.maxLabels.set('value', 100);
        this.maxLabels.required = true;

      } else {
        this.maxLabels.constraints = {
          min: 1,
          max: 3000
        };
        this.maxLabels.required = false;
      }
      this._reset(this.modle);
    },

    // -------------- tool method ------------
    _clearPreModle: function() {
      this.PRE_MODLE.dataSource = null;
      this.PRE_MODLE.computed = null;
      this.PRE_MODLE.computed = {};
      this.PRE_MODLE.config = null;
      this.PRE_MODLE.config = {};
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
    },

    _reset: function(modle) {
      var config = modle.config;
      //INIT UI by chart type and mode
      this._updateElementDisplayByChartType(config.type);
      this._updateElementDisplayByChartMode(this.modle);

      //INIT COLORS UI
      //0.series style
      if (config.seriesStyle) {
        this.seriesStyleDijit.setConfig(config.seriesStyle);
      }
      //1.background color
      if (config.backgroundColor) {
        this.bgColor.setColorsAutomatically([config.backgroundColor]);
      }
      //2.legend text color
      if (config.legendTextColor) {
        this.legendTextColor.setColorsAutomatically([config.legendTextColor]);
      }
      //3.horizontal axis text color
      if (config.horizontalAxisTextColor) {
        this.horTextColor.setColorsAutomatically([config.horizontalAxisTextColor]);
      }
      //4.vertical axis text color
      if (config.verticalAxisTextColor) {
        this.verTextColor.setColorsAutomatically([config.verticalAxisTextColor]);
      }
      //5.data label text color
      if (config.dataLabelColor) {
        this.dataLabelTextColor.setColorsAutomatically([config.dataLabelColor]);
      }
    },

    _clear: function() {
      var tempConfig = this.chartDijitSettingUtils.getTempConfigByTempName();
      this.modle = this.chartDijitSettingUtils.getInitializationModle(tempConfig);
      this._reset(this.modle);
      this._showChartNoData(tempConfig);
    },

    clearPreDataSource: function(preDataSource) {
      this._clearPreModle();
      this.PRE_MODLE.dataSource = preDataSource;
      this._clear();
    },

    _updateUIByMode: function() {
      this.ignoreChangeEvents = true;
      this.chartModeSelect.set('value', this.modle.config.mode);
      this._updateElementDisplayByChartMode(this.modle);
      this._updateElementDisplayByChartType(this.modle.config.type);
      setTimeout(lang.hitch(this, function() {
        this.ignoreChangeEvents = false;
      }), 200);
    },

    _showDataOption: function(type) {
      if (type !== 'pie') {
        this._showPeriodsRecordsDiv();
      }
      this._showPeridoDiv();
    },

    _hideDataOption: function() {
      this._hidePeridoDiv();
      this._hidePeriodsRecordsDiv();
    },

    _showPeridoDiv: function() {
      html.setStyle(this.periodDiv, 'display', '');
    },

    _hidePeridoDiv: function() {
      html.setStyle(this.periodDiv, 'display', 'none');
    },

    _showPeriodsRecordsDiv: function() {
      html.setStyle(this.periodsRecordsDiv, 'display', '');
    },

    _hidePeriodsRecordsDiv: function() {
      html.setStyle(this.periodsRecordsDiv, 'display', 'none');
    },

    _hideLegend: function() {
      if (this.legendTogglePocket) {
        this.legendTogglePocket.hide();
      }
    },

    _showLegend: function() {
      if (this.legendTogglePocket) {
        this.legendTogglePocket.show();
      }
    },

    _initChartMode: function(modes) {
      //remove all mode
      this.chartModeSelect.removeOption(this.chartModeSelect.getOptions());
      modes.forEach(function(mode) {
        if (mode === 'feature') {
          this.chartModeSelect.addOption({
            value: 'feature',
            label: this.nls.featureOption
          });
        } else if (mode === 'category') {
          this.chartModeSelect.addOption({
            value: 'category',
            label: this.nls.categoryOption
          });
        } else if (mode === 'count') {
          this.chartModeSelect.addOption({
            value: 'count',
            label: this.nls.countOption
          });
        } else if (mode === 'field') {
          this.chartModeSelect.addOption({
            value: 'field',
            label: this.nls.fieldOption
          });
        }
      }.bind(this));
    },

    _updateElementDisplayByChartMode: function(modle) {
      var mode = modle.config.mode;
      var className = mode + '-mode';
      var dataSectionItems = query('.section-item', this.dataSection);

      array.forEach(dataSectionItems, lang.hitch(this, function(sectionItem) {
        if (html.hasClass(sectionItem, className)) {
          this._showSectionItem(sectionItem);
        } else {
          this._hideSectionItem(sectionItem);
        }
      }));
    },

    _updateElementDisplayByChartType: function(type) {
      //update visibility
      var chartTypeClassName = type + "-type";
      var displayItems = query('.section-item', this.displaySection);

      array.forEach(displayItems, lang.hitch(this, function(sectionItem) {
        if (html.hasClass(sectionItem, chartTypeClassName)) {
          this._showSectionItem(sectionItem);
        } else {
          this._hideSectionItem(sectionItem);
        }
      }));
    },

    _showSectionItem: function(itemDom) {
      html.removeClass(itemDom, 'hide');
    },

    _hideSectionItem: function(itemDom) {
      html.addClass(itemDom, 'hide');
    },

    _showChartNoData: function(tempConfig) {
      setTimeout(function() {
        if (tempConfig) {
          this.dijit.setConfig(tempConfig);
        }
        this.dijit.showNoData();
      }.bind(this), 200);
    },

    // -------------- change event ------------
    //-- Data section --
    _onChartModeChanged: function(mode) {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.mode = mode;
      this.render(this.modle);
      this.emit('chartSettingChanged', this.modle.config);
    },

    _onLabelFieldChanged: function(labelField) {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.labelField = labelField;
      this.render(this.modle);
    },

    _onCategoryFieldChanged: function(categoryField) {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.categoryField = categoryField;
      this.render(this.modle);
      this.emit('chartSettingChanged', this.modle.config);
    },

    _onMinPeriodChanged: function(minPeriod) {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.dateConfig.minPeriod = minPeriod;
      this.render(this.modle);
    },

    _onPeriodsWithOutRecords: function(show) {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.dateConfig.isNeedFilled = show;
      this.render(this.modle);
    },

    _onOperationSelectChanged: function(operation) {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.operation = operation;
      this.render(this.modle);
    },

    _onNullValueAsZeroChange: function(nullValue) {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.nullValue = nullValue;
      this.render(this.modle);
    },

    _onValueFieldsChanged: function() {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      var valueFields = this.valueFields.getSelectedFieldNames();
      this.modle.config.valueFields = valueFields;
      this.render(this.modle);
    },

    _onChartSortDijitChanged: function(sortOrder) {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.sortOrder = sortOrder;
      this.render(this.modle);
    },

    _onMaxLabelsChanged: function() {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      var maxLabels = this.maxLabels.get('value');
      this.modle.config.maxLabels = maxLabels;
      this.render(this.modle);
    },

    // -- Display section --/
    //background color
    _onBgColorChanged: function() {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.backgroundColor = this.bgColor.getSingleColor();
      this.render(this.modle);
    },

    //legend
    _onLegendTogglePocketChanged: function() {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.showLegend = this.legendTogglePocket.getState();
      this.render(this.modle);
    },

    _onLegendTextColorChanged: function() {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.legendTextColor = this.legendTextColor.getSingleColor();
      this.render(this.modle);
    },

    //horizontal axis
    _onHorTogglePocketChanged: function() {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.showHorizontalAxis = this.horTogglePocket.getState();
      this.render(this.modle);
    },

    _onHorColorChanged: function() {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.horizontalAxisTextColor = this.horTextColor.getSingleColor();
      this.render(this.modle);
    },

    //vertical axis
    _onVerTogglePocketChanged: function() {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.showVerticalAxis = this.verTogglePocket.getState();
      this.render(this.modle);
    },

    _onVerColorChanged: function() {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.verticalAxisTextColor = this.verTextColor.getSingleColor();
      this.render(this.modle);
    },

    //data labels
    _onDataLabelsTogglePocketChanged: function() {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.showDataLabel = this.dataLabelTogglePocket.getState();
      this.render(this.modle);
    },

    _onDataLabelColorChanged: function() {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.dataLabelColor = this.dataLabelTextColor.getSingleColor();
      this.render(this.modle);
    },

    _onHollowSizeControlChanged: function(value) {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.innerRadius = value;
      this.render(this.modle);
    },

    _onLegendTextSizeChanged: function(value) {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.legendTextSize = value;
      this.render(this.modle);
    },

    _onVerticalAxisTextSizeChanged: function(value) {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.verticalAxisTextSize = value;
      this.render(this.modle);
    },

    _onHorizontalAxisTextSizeChanged: function(value) {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.horizontalAxisTextSize = value;
      this.render(this.modle);
    },

    _onDataLabelSizeChanged: function(value) {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.dataLabelSize = value;
      this.render(this.modle);
    },

    _onSeriesStyleDijitChanged: function(seriesStyle) {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      this.modle.config.seriesStyle = seriesStyle;
      this.render(this.modle);
    },

    _onCustomColorsChanged: function() {
      if (this.ignoreChangeEvents) {
        return;
      }
      this.PRE_MODLE = lang.clone(this.modle);
      this.chartDijitSettingUtils.setPreModle(this.PRE_MODLE);
      var seriesStyle = this.modle.config.seriesStyle;
      if (seriesStyle && seriesStyle.customColor) {
        var customColor = seriesStyle.customColor;
        var categories = customColor.categories;
        if (categories && categories.length) {
          categories.forEach(function(cc) {
            if (cc) {
              cc.color = this.chartDijitSettingUtils.getRandomCustomColor();
            }
          }.bind(this));
          this.render(this.modle);
        }
      }

    }

  });

  return clazz;
});