define([
    'dojo/_base/declare',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/text!./_SeriesStyleItem.html',
    '../ChartColorSetting',
    'dojo/Evented',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    "dijit/form/HorizontalSlider",
    'dijit/form/RadioButton'
  ],
  function(declare, on, lang, html, templateString, ChartColorSetting, Evented,
    _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, HorizontalSlider) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'infographic-series-style-item',
      templateString: templateString,

      //public methods
      //getConfig
      //setConfig
      //updateByOption

      //event
      //change return {color:[],opacity:number}

      //option:{
      //  showText:boolean,
      //  showOpacity:boolean,
      //  colorSingleMode:boolean,
      //  opacity:{
      //    min:number
      //    max:number
      //    step:number
      //  }
      //}

      //config
      //{
      //   name: '',
      //   style: {
      //     color: '',
      //     opacity: 1
      //   }
      // }

      postCreate: function() {
        this.inherited(arguments);
        this._completionOption();
        this._initDom();
        this._initEvents();
        this.updateByOption(this.option);
      },

      _completionOption: function() {
        if (!this.option) {
          this.option = {};
        }
        //showText
        if (typeof this.option.showText === 'undefined') {
          this.option.showText = true;
        }
        //showOpacity
        if (typeof this.option.showOpacity === 'undefined') {
          this.option.showOpacity = true;
        }
        //colorSingleMode
        if (typeof this.option.colorSingleMode === 'undefined') {
          this.option.colorSingleMode = true;
        }
        //option.opacity
        if (!this.option.opacity) {
          this.option.opacity = {};
        }
        if (typeof this.option.opacity.min === 'undefined') {
          this.option.opacity.min = 0;
        }
        if (typeof this.option.opacity.max === 'undefined') {
          this.option.opacity.max = 10;
        }
        if (typeof this.option.opacity.step === 'undefined') {
          this.option.opacity.step = 1;
        }
      },

      updateByOption: function(option) {
        if (!option) {
          return;
        }
        this.option = option;

        this._completionOption();
        this._setOpacityDisplay();
        this._setColorMode();
        this._setTextDisplay();

        if (this.option.config) {
          this.setConfig(this.option.config);
        }
      },

      setColorMode: function(colorSingleMode) {
        this.option.colorSingleMode = colorSingleMode;
        this._setColorMode();
      },

      setOpacityDisplay: function(showOpacity) {
        this.option.showOpacity = showOpacity;
        this._setOpacityDisplay();
      },

      setTextDisplay: function(showText) {
        this.option.showText = showText;
        this._setTextDisplay();
      },

      setConfig: function(config) {
        if (!config) {
          return;
        }

        var label = config.label || '';
        var name = config.name || '';
        this.textDiv.innerHTML = label;
        this.textDiv.title = label;
        this.fieldName = name;
        var style = config.style;
        if (!style) {
          return;
        }
        this._setColor(style.color);
        if (typeof style.opacity !== 'undefined') {
          this._setOpacity(style.opacity);
        }
      },

      getConfig: function() {
        var config = {
          style: {}
        };
        config.name = this.fieldName || this.textDiv.innerHTML;
        if (this.option.showOpacity) {
          var opacity = this._getOpacity();
          config.style.opacity = opacity;
        }
        var color = this._getColor();
        config.style.color = color;
        return config;
      },

      _initDom: function() {
        this.colorPicker = new ChartColorSetting();
        this.colorPicker.placeAt(this.colorDiv);

        this.opacitySlider = new HorizontalSlider({
          name: "slider",
          value: this.option.opacity.min,
          minimum: this.option.opacity.min,
          maximum: this.option.opacity.max,
          discreteValues: this.option.opacity.max / this.option.opacity.step,
          intermediateChanges: false,
          showButtons: false,
          style: "width: 71%;margin: auto -3px auto 5px;"
        });
        this.opacitySlider.placeAt(this.opacityDiv);
      },

      _onChange: function() {
        var config = this.getConfig();
        this.emit('change', config);
      },

      _initEvents: function() {
        this.own(on(this.colorPicker, 'change', lang.hitch(this, function() {
          this._onChange();
        })));

        this.own(on(this.opacitySlider, 'change', lang.hitch(this, function() {
          this._onChange();
        })));
      },

      _getOpacity: function() {
        var opacity = this.opacitySlider.get('value');
        opacity = parseInt(opacity, 10);
        if (opacity) {
          return opacity;
        } else {
          return 0;
        }
      },

      _getColor: function() {
        return this.colorPicker.getColors();
      },

      _setTextDisplay: function() {
        if (this.option.showText) {
          this._showText();
        } else {
          this._hideText();
        }
      },

      _showText: function() {
        html.addClass(this.rightPanel, 'flex-lr-balance');
        html.removeClass(this.rightPanel, 'flex-fill');
        html.setStyle(this.textContainer, 'display', '');
      },

      _hideText: function() {
        html.removeClass(this.rightPanel, 'flex-lr-balance');
        html.addClass(this.rightPanel, 'flex-fill');
        html.setStyle(this.textContainer, 'display', 'none');
      },

      _setOpacityDisplay: function() {
        if (this.option.showOpacity) {
          this._showOpacity();
        } else {
          this._hideOpacity();
        }
      },

      _setColorMode: function() {
        if (this.option.colorSingleMode) {
          this.colorPicker.setMode(true);
        } else {
          this.colorPicker.setMode(false);
        }
      },

      _setOpacity: function(opacity) {
        opacity = parseInt(opacity, 10);
        if (!opacity || opacity < this.min) {
          opacity = this.min;
        }
        if (opacity > this.max) {
          opacity = this.max;
        }
        this.opacitySlider.set('value', opacity);
      },

      _setColor: function(color) {
        this.colorPicker.setColorsAutomatically(color);
      },

      _showOpacity: function() {
        html.setStyle(this.opacityDiv, 'display', 'flex');
      },

      _hideOpacity: function() {
        html.setStyle(this.opacityDiv, 'display', 'none');
      }
    });
  });