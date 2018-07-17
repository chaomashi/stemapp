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
  'esri/lang',
  './BaseDijit',
  'dojo/dom-style',
  'dojo/_base/html',
  'jimu/utils',
  './utils',
  "./styleUtils",
  'jimu/LayerInfos/LayerInfos',
  'jimu/DataSourceManager'
], function(declare, lang, esriLang, BaseDijit, domStyle, html, jimuUtils,
  utils, styleUtils, LayerInfos, DataSourceManager) {
  var clazz = declare([BaseDijit], {
    templateString: '<div style="height:100%;width:100%;">' +
      '<a data-dojo-attach-point="numberContent" class="number-content no-trim" target="_blank">' +
      '<div data-dojo-attach-point="leftIcon" class="icon"></div>' +
      '<div data-dojo-attach-point="number" class="number">' +
      '<div data-dojo-attach-point="prefix" class="prefix"></div>' +
      '<div class="value-content" data-dojo-attach-point="valueContent"></div>' +
      '<div data-dojo-attach-point="suffix" class="suffix"></div></div>' +
      '<div data-dojo-attach-point="rightIcon" class="icon"></div>' +
      '</a></div>',
    baseClass: 'infographic-number-dijit',
    type: 'number',
    config: null,
    // value: 2496,
    //public method
    // setConfig();
    // setValue();

    // config:
    // value
    //  indicators:[{iconInfo:{
    //    color:'',
    //    icon:'',
    //    placement:'left'
    //  }}]
    postCreate: function() {
      this.inherited(arguments);
      this.features = null;
      this.value = null;
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
        this._updateUI(this.config, this.value);
      }
    },

    setDataSource: function(dataSource) {
      this.dataSource = dataSource;
      if (!this.inSettingPage) {
        return;
      }
      if (dataSource.layerId) {
        var layerInfo = LayerInfos.getInstanceSync().getLayerInfoById(dataSource.layerId);

        if (!layerInfo) {
          return;
        }

        layerInfo.getLayerObject().then(lang.hitch(this, function(layerObject) {
          this.features =
            utils.getClientFeaturesFromMap(this.map, layerObject, dataSource.useSelection, dataSource.filterByExtent);

          this._updateStatisticsValue();
        }));
      } else if (dataSource.frameWorkDsId) {
        var data = DataSourceManager.getInstance().getData(dataSource.frameWorkDsId);
        if (data) {
          this.features = data.features;
          this._updateStatisticsValue();
        }
      }
    },

    _updateStatisticsValue: function() {

      if (!this.features || !this.config.statistic || !this.dataSource) {
        this.value = null;
      } else {
        this.value = utils.getSingleValueFromFeatures(this.config.statistic, this.dataSource, this.features);
      }

      this._updateUI(this.config, this.value);
    },

    setConfig: function(config) {
      //background color
      if (config && config.background && config.background.backgroundColor) {
        html.setStyle(this.domNode, 'backgroundColor', config.background.backgroundColor);
      } else {
        html.setStyle(this.domNode, 'backgroundColor', '#FFFFFF');
      }
      this.config = config;
      this._updateStatisticsValue();
    },

    _updateUI: function(config, value) {
      this._cleanUI();
      this.config = config;

      //init value
      this.valueContent.innerHTML = value === null ? this.nls.noData : this._tryLocaleNumber(value);
      if (!jimuUtils.isNotEmptyObject(this.config)) {
        return;
      }
      this._setValueDisplay(this.config);
    },

    _setValueDisplay: function(config) {
      if (!config) {
        return;
      }
      //1.set background
      this._setBackground(config);
      //2.set font
      this._setFont(config);
      if (typeof this.value !== 'undefined') {
        //3. set dataFormat
        this._setDataFormat(config);
        //4. set valueColor
        var indicatorInfo = this._getIndicatorColor();
        if (indicatorInfo.color) {
          this._setValueColor(indicatorInfo.color);
        }
        //5. set icon
        if (indicatorInfo.icon) {
          this._setIndicatorIcon(indicatorInfo.icon);
        }
      }
    },

    _setIndicatorIcon: function(iconInfo) {
      if (!iconInfo) {
        return;
      }
      if (iconInfo.placement === 'left' || iconInfo.placement === 'right') {
        this._setLeftRightIcon(iconInfo);
      } else if (iconInfo.placement === 'replace') {
        this._setReplaceIcon(iconInfo);
      }
    },

    _setReplaceIcon: function(iconInfo) {
      var iconDom = html.create('div', {
        'class': 'indicator-icon ' + iconInfo.icon
      });
      html.empty(this.valueContent);
      html.place(iconDom, this.valueContent);
      domStyle.set(iconDom, 'color', iconInfo.color);
      domStyle.set(iconDom, 'display', 'inline-flex');
    },

    _setLeftRightIcon: function(iconInfo) {
      var iconDom;
      if (iconInfo.placement === 'left') {
        iconDom = this.leftIcon;
      } else if (iconInfo.placement === 'right') {
        iconDom = this.rightIcon;
      }

      html.addClass(iconDom, 'indicator-icon ' + iconInfo.icon);
      domStyle.set(iconDom, 'color', iconInfo.color);
    },

    _getIndicatorColor: function() {
      var color = false;
      var icon = false;
      var indicators = this.config.indicators;
      if (indicators) {
        var vaildIndicator = utils.getVaildIndicator(this.value, indicators);
        if (vaildIndicator && vaildIndicator.valueColor) {
          color = vaildIndicator.valueColor;
        }
        if (vaildIndicator && jimuUtils.isNotEmptyObject(vaildIndicator.iconInfo)) {
          icon = vaildIndicator.iconInfo;
        }
      }
      return {
        color: color,
        icon: icon
      };
    },

    _setFont: function(config) {
      if (!config || !config.font) {
        return;
      }
      var style = {};
      styleUtils.font.setStyle(config.font, style);
      html.setStyle(this.number, style);
    },

    _setDataFormat: function(config) {
      if (!this.value || !config || !config.dataFormat) {
        return;
      }
      var value = this.value;
      var unit = '';
      var dataFormat = config.dataFormat;
      //1.Unit and decimal places
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
      if (dataFormat.decimalPlaces !== '' && typeof dataFormat.decimalPlaces !== 'undefined') {
        value = value.toFixed(Number(dataFormat.decimalPlaces));
      }
      value = this._tryLocaleNumber(value) + unit;
      this.valueContent.innerHTML = value;
      //2. prefix and suffix
      if (dataFormat.prefix) {
        this.prefix.innerHTML = dataFormat.prefix;
      }
      if (dataFormat.suffix) {
        this.suffix.innerHTML = dataFormat.suffix;
      }
    },

    _cleanUI: function() {
      html.removeClass(this.leftIcon);
      html.addClass(this.leftIcon, ['icon']);
      html.removeClass(this.rightIcon);
      html.addClass(this.rightIcon, ['icon']);
      if (this.replaceIcon) {
        html.destroy(this.replaceIcon);
        this.replaceIcon = null;
      }
      html.empty(this.valueContent);
      html.empty(this.prefix);
      html.empty(this.suffix);
      this._setValueColor('');
    },

    _getVaildValue: function(value) {
      if (typeof value === 'undefined') {
        return;
      }
      return Number(value);
    },

    _setBackground: function(config) {

      if (!config || !config.background) {
        return;
      }
      var background = config.background;
      //1.background color
      if (background.backgroundColor) {
        html.setStyle(this.domNode, 'backgroundColor', background.backgroundColor);
      }
      //2.alignment
      if (background.alignment) {
        var alignment = background.alignment;
        html.removeClass(this.domNode);
        html.addClass(this.domNode, 'infographic-number-dijit');
        if (alignment.horizontal) {
          html.addClass(this.domNode, 'horizontal-' + alignment.horizontal);
        }
        if (alignment.vertical) {
          html.addClass(this.domNode, 'vertical-' + alignment.vertical);
        }
      }
      //3.link
      if (background.link) {
        html.setAttr(this.numberContent, "href", background.link);
      } else {
        html.removeAttr(this.numberContent, "href");
      }
    },

    _setValueColor: function(color) {
      domStyle.set(this.number, "color", color);
    },

    _tryLocaleNumber: function(value) {
      var result = value;
      if (esriLang.isDefined(value) && isFinite(value)) {
        try {
          var a = jimuUtils.localizeNumber(value);

          if (typeof a === "string") {
            result = a;
          }
        } catch (e) {
          console.error(e);
        }
      }
      //make sure the retun value is string
      result += "";
      return result;
    }

  });
  return clazz;
});