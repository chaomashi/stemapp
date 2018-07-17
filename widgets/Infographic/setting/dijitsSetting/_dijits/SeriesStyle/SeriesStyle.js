define([
    'dojo/_base/declare',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/text!./SeriesStyle.html',
    './_SeriesStyleItem',
    './_SeriesStyles',
    './CustomColor',
    'dojo/Evented',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    '../../../utils',
    'jimu/utils',
    'dijit/form/RadioButton'
  ],
  function(declare, on, lang, html, templateString, SeriesStyleItem, SeriesStyles, CustomColor, Evented,
    _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, igUtils, jimuUtils) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'infographic-series-style',
      templateString: templateString,
      //option
      //nls

      // public methods
      // updateComputed
      // setConfig
      // getConfig

      // modle.computed: {
      //   chartType:'pie', //column, bar, line
      //   colorDisplayMode: 'single',//multiply, none
      //   showOpacity: false,
      //   colorSingleMode: true,
      //   otherRadio: 'none',//layerSymbol, custom, all
      //   categoryField:'',
      //   customToggleIconState: 'none', //close, none,
      //   categoryTypes:{isNumberType:boolean, isCodedValueType:boolean},
      //   customColorSelects:null
      // },

      //modle.config
      // type: 'layerSymbol',// series, custom,
      // styles: [{
      //   name: '',
      //   style: {
      //     color: '',
      //     opacity: 0
      //   }
      // }],
      // customColor:{}

      //event
      //change

      constructor: function() {
        this.inherited(arguments);

        this.PRE_MODLE = {
          computed: {},
          config: {}
        };

        this.modle = {
          computed: {},
          config: {}
        };
        this._customIconIsOpen = true;
      },

      postCreate: function() {
        this.inherited(arguments);
        this._initBrowserClass();
        this._initDom();
        this._initEvent();
        this._hideFirstRadio();
        this._hideThirdRadio();
        this.render(this.modle);
      },

      updateComputed: function(computed) {
        if (!computed) {
          return;
        }
        this.PRE_MODLE = lang.clone(this.modle);
        this.modle.computed = lang.clone(computed);
        this.render(this.modle);
      },

      setConfig: function(config) {
        this.PRE_MODLE = lang.clone(this.modle);
        this.modle.config = lang.clone(config);
        this.render(this.modle);
      },

      getConfig: function() {
        return lang.clone(this.modle.config);
      },

      render: function(modle, slience) {
        if (!modle) {
          return;
        }
        this._updateComputed(modle);
        this._render(modle, slience);
      },

      _render: function(modle, slience) {
        this.ignoreChangeEvents = true;
        this._renderByComputed(modle);
        this._renderByConfig(modle);
        this.ignoreChangeEvents = false;
        if (!slience) {
          this._onChange();
        }

      },

      _updateComputed: function(modle) {
        var config = modle.config;
        var computed = modle.computed;
        //the display of color picker in set color (series color)
        if (computed.otherRadio !== 'none' && config.type !== 'series') {
          computed.colorDisplayMode = 'none';
        } else {
          if (config && config.styles && config.styles.length > 1) {
            computed.colorDisplayMode = 'multiply';
          } else {
            computed.colorDisplayMode = 'single';
          }
        }
        // customToggleIconState
        if (config.type === 'custom') {
          computed.customToggleIconState = this._customIconIsOpen ? 'open' : 'close';
        } else {
          computed.customToggleIconState = 'none';
        }
      },

      _onChange: function() {
        if (this.ignoreChangeEvents) {
          return;
        }
        var config = this.getConfig();
        if (config) {
          this.emit('change', config);
        }
      },

      _renderByComputed: function(modle) {
        var preComputed = this.PRE_MODLE.computed;
        var computed = modle.computed;
        if (igUtils.isEqual(preComputed, computed)) {
          return;
        }
        // update the input string of series radio
        if (!igUtils.isEqual(computed.chartType, preComputed.chartType)) {
          this._updateSeriesRadioString(computed.chartType);
        }
        // is number type  of custom color item
        if (!igUtils.isEqual(computed.categoryTypes, preComputed.categoryTypes)) {
          if (this.customColorDijit) {
            this.customColorDijit.setCategoryType(computed.categoryTypes);
          }
        }
        // update custom color select option
        if (!igUtils.isEqual(computed.customColorSelects, preComputed.customColorSelects)) {
          if (this.customColorDijit) {
            this.customColorDijit.setCustomColorSelectOption(computed.customColorSelects);
          }
        }
        // show radio panel
        if (!igUtils.isEqual(computed.otherRadio, preComputed.otherRadio)) {
          this._switchRadioDisplay(computed.otherRadio);
        }
        //show color list
        if (!igUtils.isEqual(computed.colorDisplayMode, preComputed.colorDisplayMode) ||
          !igUtils.isEqual(computed.otherRadio, preComputed.otherRadio)) {
          var inRadioPanel = computed.otherRadio !== 'none';
          this._hideSingleColor(true);
          this._hideSingleColor(false);
          if (computed.colorDisplayMode === 'multiply') {
            this._hideSingleColor(inRadioPanel);
            this._showFieldColors();
          } else if (computed.colorDisplayMode === 'single') {
            this._showSingleColor(inRadioPanel);
            this._hideFieldColors();
          } else if (computed.colorDisplayMode === 'none') {
            this._hideSingleColor(true);
            this._hideSingleColor(false);
            this._hideFieldColors();
          }
        }

        //show opacity
        if (!igUtils.isEqual(computed.showOpacity, preComputed.showOpacity)) {
          if (computed.showOpacity) {
            this._showOpacityPanel();
          } else {
            this._hideOpacityPanel();
          }
        }

        //color as single mode
        if (!igUtils.isEqual(computed.colorSingleMode, preComputed.colorSingleMode)) {
          if (computed.colorSingleMode) {
            this._useColorSingleMode();
          } else {
            this._useColorMultipleMode();
          }
        }

        // custom toggle icon state
        if (!igUtils.isEqual(computed.customToggleIconState, preComputed.customToggleIconState)) {
          if (computed.customToggleIconState !== 'none') {
            this._showCustomToggleIcon();
            if (computed.customToggleIconState === 'open') {
              this._openCustomColorPanel();
            } else {
              this._closeCustomColorPanel();
            }
          } else {
            this._hideCustomToggleIcon();
            this._hideCustomColors();
          }
        }
      },

      _renderByConfig: function(modle) {
        var config = modle.config;
        var computed = modle.computed;

        var preConfig = this.PRE_MODLE.config;
        if (igUtils.isEqual(config, preConfig)) {
          return;
        }

        if (!igUtils.isEqual(config.type, preConfig.type)) {
          if (config.type === 'layerSymbol') {
            this.useLayerSymbolRadio.setChecked(true);
            this.setColorRadio.setChecked(false);
            this.customColorRadio.setChecked(false);
          } else if (config.type === 'series') {
            this.useLayerSymbolRadio.setChecked(false);
            this.setColorRadio.setChecked(true);
            this.customColorRadio.setChecked(false);
          } else if (config.type === 'custom') {
            this.customColorRadio.setChecked(true);
            this.useLayerSymbolRadio.setChecked(false);
            this.setColorRadio.setChecked(false);
          }
        }
        //styles
        if (!igUtils.isEqual(config.styles, preConfig.styles)) {
          var styles = config.styles;
          if (!styles || styles.length <= 0) {
            return;
          }
          if (styles.length === 1) {
            if (computed.radioPanel) {
              this.topOneColor.setConfig(styles[0]);
              this.radioOneColor.setConfig(styles[0]);
            } else {
              this.topOneColor.setConfig(styles[0]);
              this.radioOneColor.setConfig(styles[0]);
            }
          } else if (styles.length >= 1) {
            this.fieldColorsDijit.updateConfig(styles);
          }
        }

        // customColor
        if (!igUtils.isEqual(config.customColor, preConfig.customColor)) {
          var customColor = config.customColor;
          if (!customColor || !customColor.categories || !Array.isArray(customColor.categories)) {
            return;
          }
          this.customColorDijit.setConfig(customColor);
        }
      },

      _initDom: function() {
        //top one color
        this.topOneColor = new SeriesStyleItem({
          option: {
            showText: false,
            opacity: {
              min: 0,
              max: 10,
              step: 1
            }
          }
        });
        this.topOneColor.placeAt(this.singleColorDiv);
        //top one color
        this.radioOneColor = new SeriesStyleItem({
          option: {
            showText: false,
            opacity: {
              min: 0,
              max: 10,
              step: 1
            }
          }
        });
        this.radioOneColor.placeAt(this.radioSingleColorDiv);

        this.fieldColorsDijit = new SeriesStyles({
          nls: this.nls
        });
        this.fieldColorsDijit.placeAt(this.fieldColors);
        /*custom color dijit*/

        this.customColorDijit = new CustomColor({
          nls: this.nls
        });
        this.customColorDijit.placeAt(this.customColors);

        this._hideRadioPanel();
        this._hideOpacityPanel();
        this._hideSingleColor(true);
        this._hideSingleColor(false);
        this._hideCustomToggleIcon();
        this._hideFieldColors();
      },

      _initEvent: function() {
        this.own(on(this.topOneColor, 'change', lang.hitch(this, function(colorConfig) {
          this._onTopOneColorChange(colorConfig);
        })));

        this.own(on(this.radioOneColor, 'change', lang.hitch(this, function(colorConfig) {
          this._onRadioOneColorChange(colorConfig);
        })));

        this.own(on(this.fieldColorsDijit, 'change', lang.hitch(this, function(colorConfig) {
          this._onFieldColorsDijitChange(colorConfig);
        })));

        this.own(on(this.customColorDijit, 'change', lang.hitch(this, function(customColorConfig) {
          this._onCustomColorDijitChanged(customColorConfig);
        })));
        this.own(on(this.customColorDijit, 'update-colors', lang.hitch(this, function(colors) {
          this.emit('update-colors', colors);
        })));
      },

      _initBrowserClass: function() {
        if (jimuUtils.has('ie') === 11) {
          html.addClass(this.domNode, 'ig-setting-ie11');
        } else {
          html.removeClass(this.domNode, 'ig-setting-ie11');
        }
        if (jimuUtils.has('ff')) {
          html.addClass(this.domNode, 'ig-setting-ff');
        } else {
          html.removeClass(this.domNode, 'ig-setting-ff');
        }
      },

      _switchRadioDisplay: function(otherRadio) {
        if (otherRadio !== 'none') {
          this._showRadioPanel();
          html.addClass(this.fieldColors, 'indentation');
        } else {
          this._hideRadioPanel();
          html.removeClass(this.fieldColors, 'indentation');
        }
        switch (otherRadio) {
          case 'layerSymbol':
            this._showFirstRadio();
            this._hideThirdRadio();
            break;
          case 'custom':
            this._showThirdRadio();
            this._hideFirstRadio();
            break;
          case 'all':
            this._showThirdRadio();
            this._showFirstRadio();
            break;
          default:
            break;
        }
      },

      _updateSeriesRadioString: function(type) {
        if (type === 'pie') {
          this.setColorLabel.innerHTML = this.nls.randomColor;
        } else {
          this.setColorLabel.innerHTML = this.nls.setColor;
        }
      },

      _openCustomColorPanel: function() {
        html.removeClass(this.toggleIcon, 'closed');
        this._showCustomColors();
      },

      _closeCustomColorPanel: function() {
        html.addClass(this.toggleIcon, 'closed');
        this._hideCustomColors();
      },

      _showFirstRadio: function() {
        html.removeClass(this.firstRadio, 'hide');
      },

      _hideFirstRadio: function() {
        html.addClass(this.firstRadio, 'hide');
      },

      _showCustomToggleIcon: function() {
        html.removeClass(this.toggleIconDiv, 'hide');
      },

      _hideCustomToggleIcon: function() {
        html.addClass(this.toggleIconDiv, 'hide');
      },

      _showThirdRadio: function() {
        html.removeClass(this.thirdRadio, 'hide');
      },

      _hideThirdRadio: function() {
        html.addClass(this.thirdRadio, 'hide');
        this._hideCustomColors();

      },

      _showSingleColor: function(inRadioPanel) {
        if (inRadioPanel) {
          html.removeClass(this.radioSingleColorDiv, 'hide');
        } else {
          html.removeClass(this.singleColorDiv, 'hide');
        }
      },

      _hideSingleColor: function(inRadioPanel) {
        if (inRadioPanel) {
          html.addClass(this.radioSingleColorDiv, 'hide');
        } else {
          html.addClass(this.singleColorDiv, 'hide');
        }
      },

      _showCustomColors: function() {
        html.removeClass(this.customColors, 'hide');
      },

      _hideCustomColors: function() {
        html.addClass(this.customColors, 'hide');
      },

      _showFieldColors: function() {
        html.removeClass(this.fieldColors, 'hide');
      },

      _hideFieldColors: function() {
        html.addClass(this.fieldColors, 'hide');
      },

      _useColorSingleMode: function() {
        this.topOneColor.setColorMode(true);
        this.radioOneColor.setColorMode(true);
      },

      _useColorMultipleMode: function() {
        this.topOneColor.setColorMode(false);
        this.radioOneColor.setColorMode(false);
      },

      _showRadioPanel: function() {
        html.removeClass(this.radioPanel, 'hide');
      },

      _hideRadioPanel: function() {
        html.addClass(this.radioPanel, 'hide');
        this._hideCustomColors();
      },

      _showOpacityPanel: function() {
        this.topOneColor.setOpacityDisplay(true);
        this.radioOneColor.setOpacityDisplay(true);
        this.fieldColorsDijit.setOpacityDisplay(true);
      },

      _hideOpacityPanel: function() {
        this.topOneColor.setOpacityDisplay(false);
        this.radioOneColor.setOpacityDisplay(false);
        this.fieldColorsDijit.setOpacityDisplay(false);
      },

      _onTopOneColorChange: function(colorConfig) {
        if (this.ignoreChangeEvents) {
          return;
        }
        this.PRE_MODLE = lang.clone(this.modle);
        this.modle.config.styles[0] = colorConfig;
        this._onChange();
      },

      _onRadioOneColorChange: function(colorConfig) {
        if (this.ignoreChangeEvents) {
          return;
        }
        this.PRE_MODLE = lang.clone(this.modle);
        this.modle.config.styles[0] = colorConfig;
        this._onChange();
      },

      _onFieldColorsDijitChange: function(colorConfigArray) {
        if (this.ignoreChangeEvents) {
          return;
        }
        this.PRE_MODLE = lang.clone(this.modle);
        this.modle.config.styles = colorConfigArray;
        this._onChange();
      },

      _onLayerSymbolRadioChanged: function(check) {
        if (this.ignoreChangeEvents) {
          return;
        }
        this.PRE_MODLE = lang.clone(this.modle);
        if (check) {
          this.modle.config.type = 'layerSymbol';
          this._onChange();
        }
      },

      _onSeriesColorRadioChanged: function(check) {
        if (this.ignoreChangeEvents) {
          return;
        }
        this.PRE_MODLE = lang.clone(this.modle);
        if (check) {
          this.modle.config.type = 'series';
          this._onChange();
        }
      },

      _onCustomColorRadioChange: function(check) {
        if (this.ignoreChangeEvents) {
          return;
        }
        this.PRE_MODLE = lang.clone(this.modle);
        if (check) {
          this.modle.config.type = 'custom';
          this._onChange();
        }
      },

      _onCustomToggleButtonClicked: function(e) {
        e.stopPropagation();
        if (this.ignoreChangeEvents) {
          return;
        }
        this.PRE_MODLE = lang.clone(this.modle);
        this._customIconIsOpen = !this._customIconIsOpen;
        this.render(this.modle, true);
      },

      _onCustomColorDijitChanged: function(config) {
        if (this.ignoreChangeEvents) {
          return;
        }
        this.PRE_MODLE = lang.clone(this.modle);

        this.modle.config.customColor = config;
        this._onChange();
      }

    });
  });