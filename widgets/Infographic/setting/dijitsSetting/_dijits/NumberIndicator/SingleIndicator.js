define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dojo/Evented',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./SingleIndicator.html',
    'dojo/_base/Color',
    'dojo/on',
    'dojo/query',
    'dojo/_base/html',
    'dojo/_base/lang',
    'jimu/utils',
    'jimu/dijit/ColorPickerPopup',
    './IconChooserPopup',
    'dojo/dom-style',
    "dijit/form/Select",
    "jimu/dijit/CheckBox"
  ],
  function(declare, _WidgetBase, Evented, _TemplatedMixin, _WidgetsInTemplateMixin, template, Color,
    on, query, html, lang, jimuUtils, ColorPickerPopup, IconChooserPopup, domStyle) {
    return declare([_WidgetBase, Evented, _TemplatedMixin, _WidgetsInTemplateMixin], {
      baseClass: 'infographic-setting-single-indicator',
      templateString: template,
      _valueEnable: true,
      _gaugeEnable: true,
      _iconEnable: true,
      nls: null,
      type: '', //gauge,number
      //config:
      //  operator: //is greater than
      //  value:[],
      //  isRatio:boolean,
      //  valueColor:'#fff',
      //  gaugeColor:'#fff',
      //  iconInfo:{
      //    color:'',
      //    icon:'',
      //    placement:'',//left,replace,right
      //  }

      constructor: function(option) {
        this.cacheColor = {};
        this.config = option.config;
        this.type = option.type;
        this.folderUrl = option.folderUrl;
      },

      postCreate: function() {
        this.inherited(arguments);
        this._initUI();
        this.own(on(this.indicatorOption, 'click', lang.hitch(this, this._onIndicatorComponentClick)));
        this.setConfig(this.config);
        this._hasLoaded = true;
      },

      startup: function() {
        this.inherited(arguments);

        if (this.config) {
          if (typeof this.config.uniqueID !== 'undefined') {
            this.uniqueID = this.config.uniqueID;
          } else {
            this.uniqueID = jimuUtils.getRandomString();
          }
        } else {
          this.uniqueID = jimuUtils.getRandomString();
        }
        html.setAttr(this.domNode, "data-id", this.uniqueID);
      },

      updateBottomLineDisplay: function(index, lastIndex) {
        if (index === lastIndex) {
          html.setStyle(this.indicatorTottomLine, 'display', 'none');

        } else {
          html.setStyle(this.indicatorTottomLine, 'display', 'block');
        }
      },

      _onUpdate: function() {
        if (this._hasLoaded) {
          this.emit('change');
        }
      },

      _initUI: function() {
        //init event of operator changed
        this.own(on(this.operator, 'change', lang.hitch(this, this._onCompareChange)));
        //init diff display of gauge and number indicator
        if (this.type === 'gauge') {
          domStyle.set(this.ratioBtnDiv, 'display', 'block');
          domStyle.set(this.gaugeColorSetting, 'display', 'flex');
          domStyle.set(this.indicatorIconSetting, 'display', 'none');
        } else if (this.type === 'number') {
          domStyle.set(this.ratioBtnDiv, 'display', 'none');
          domStyle.set(this.gaugeColorSetting, 'display', 'none');
          domStyle.set(this.indicatorIconSetting, 'display', 'flex');
        }
        //1.value color
        this.valueColorPicker = new ColorPickerPopup({
          appearance: {
            showTransparent: false,
            showColorPalette: true,
            showCoustom: true,
            showCoustomRecord: true
          }
        });
        this.valueColorPicker.placeAt(this.valueColorSettingBtn);
        this.valueColorPicker.startup();
        this.valueColorPicker.setColor(new Color('#808080'));
        this.own(on(this.valueColorPicker, 'change', lang.hitch(this, function() {
          this._onUpdate();
        })));
        if (this.type === 'gauge') {
          //2.gauge color
          this.gaugeColorPicker = new ColorPickerPopup({
            appearance: {
              showTransparent: false,
              showColorPalette: true,
              showCoustom: true,
              showCoustomRecord: true
            }

          });
          this.gaugeColorPicker.placeAt(this.gaugeColorSettingBtn);
          this.gaugeColorPicker.startup();
          this.gaugeColorPicker.setColor(new Color('#808080'));
          this.own(on(this.gaugeColorPicker, 'change', lang.hitch(this, function() {
            this._onUpdate();
          })));
        } else if (this.type === 'number') { //3.icon-chooser
          this.iconChooser = new IconChooserPopup({
            nls: this.nls,
            folderUrl: this.folderUrl
          });
          this.iconChooser.placeAt(this.indicatorIconSettingBtn);
          this.iconChooser.startup();
          this.own(on(this.iconChooser, 'change', lang.hitch(this, function() {
            this._onUpdate();
          })));
        }
      },

      setConfig: function(config) {
        this.config = config;
        if (!this.config) {
          return;
        }
        //1. set operator
        this.operator.set('value', this.config.operator);
        //2. set ratio button
        if (this.config.isRatio) {
          this.ratioBtn.check();
        } else {
          this.ratioBtn.uncheck();
        }
        //3. set value color
        if (this.config.valueColor) {
          this.valueColorPicker.setColor(new Color(this.config.valueColor));
        } else {
          this._updateOptionDisplay(this.valueState);
        }
        //4. set gauge color
        if (this.type === 'gauge') {
          if (this.config.gaugeColor) {
            this.gaugeColorPicker.setColor(new Color(this.config.gaugeColor));
          } else {
            this._updateOptionDisplay(this.gaugeState);
          }
        }
        //5. set icon chooser
        if (this.type === 'number') {
          if (this.config.iconInfo) {
            this.iconChooser.setConfig(this.config.iconInfo);
          } else {
            this._updateOptionDisplay(this.iconState);
          }
        }
        //6. set value
        var value = this.config.value;
        if (jimuUtils.isNotEmptyObject(value, true)) {
          setTimeout(lang.hitch(this, function() {
            if (this.config.operator !== 'between') {
              this.compareValue.setValue(value[0]);
            } else {
              this.compareValue1.setValue(value[0]);
              this.compareValue2.setValue(value[1]);
            }
          }), 200);
        }
      },

      isValid: function() {
        var operator = this.operator.getValue();
        var value = this._getValue();
        if (operator === 'between') {
          if (!this.compareValue1.isValid() || !this.compareValue2.isValid()) {
            return false;
          }
          if (!value || !value.between || !value.between.length ||
            typeof value.between[0] === 'undefined' || typeof value.between[1] === 'undefined') {
            return false;
          }
        } else {
          if (!this.compareValue.isValid()) {
            return false;
          }
          if (!value || typeof value.normal === 'undefined') {
            return false;
          }
        }
        return true;
      },

      _switchValueInputMode: function(valueMode) {
        switch (valueMode) {
          case 'normal':
            //normal
            this.compareValue.set('validator', function(value) {
              return !!value && /^\d+(\.\d+)?$/.test(value);
            });
            // between
            this.compareValue1.set('validator', function() {
              return true;
            });
            this.compareValue2.set('validator', function() {
              return true;
            });
            break;
          case 'between':
            //normal
            this.compareValue.set('validator', function() {
              return true;
            });
            // between
            this.compareValue1.set('validator', function(value) {
              return !!value && /^\d+(\.\d+)?$/.test(value);
            });
            this.compareValue2.set('validator', function(value) {
              return !!value && /^\d+(\.\d+)?$/.test(value);
            });
            break;
          default:
            break;
        }
      },

      getConfig: function() {
        if (!this.isValid()) {
          return false;
        }
        var config = {};
        var values = [];
        var value = this._getValue();
        if (typeof value.between !== 'undefined') {
          values = lang.clone(value.between);
        } else if (typeof value.normal !== 'undefined') {
          values = [value.normal];
        }
        if (!values.length) {
          return false;
        }
        //1. get value
        config.value = values;
        //2. get operator
        var operator = this.operator.getValue();
        config.operator = operator;
        //3. get is ratio
        if (this.type === 'gauge') {
          var isRatio = this.ratioBtn.checked;
          config.isRatio = isRatio;
        }
        //4. get value color
        if (this.valueColorPicker && this._valueEnable) {
          var valueColor = this.valueColorPicker.getColor();
          if (valueColor) {
            config.valueColor = valueColor.toHex();
          }
        }
        //5. get gauge color
        if (this.gaugeColorPicker && this._gaugeEnable) {
          var gaugeColor = this.gaugeColorPicker.getColor();
          if (gaugeColor) {
            config.gaugeColor = gaugeColor.toHex();
          }
        }
        //6. get icon chooser config
        if (this.type === 'number') {
          if (this.iconChooser && this._iconEnable) {
            var iconInfo = this.iconChooser.getConfig();
            config.iconInfo = iconInfo;
          }
        }
        config.uniqueID = this.uniqueID;
        return config;
      },

      _onCompareChange: function(comparison) {
        this.compareValue.setValue("");
        this.compareValue1.setValue("");
        this.compareValue2.setValue("");
        if (comparison === 'between') {
          domStyle.set(this.oneValueDiv, 'display', 'none');
          domStyle.set(this.twoValueDiv, 'display', '');
          this._switchValueInputMode('between');
        } else {
          domStyle.set(this.oneValueDiv, 'display', '');
          domStyle.set(this.twoValueDiv, 'display', 'none');
          this._switchValueInputMode('normal');
        }
      },

      _getValue: function() {
        var value = {};
        var operator = this.operator.getValue();
        if (operator !== 'between') {
          var compareValue = this.compareValue.getValue();
          if (this.compareValue.isValid() && compareValue !== '') {
            value.normal = Number(compareValue);
          }
        } else {
          value.between = [];
          var compareValue1 = this.compareValue1.getValue();
          var compareValue2 = this.compareValue2.getValue();
          if (this.compareValue1.isValid() && compareValue1 !== '' &&
            this.compareValue2.isValid() && compareValue2 !== '') {
            value.between[0] = Number(compareValue1);
            value.between[1] = Number(compareValue2);
          }
        }
        return value;
      },

      _removeIndicator: function() {
        this.emit('remove', this.uniqueID);
        this._onUpdate();
      },

      _updateOptionDisplay: function(target) {
        if (!html.hasClass(target, 'activated') && !html.hasClass(target, 'deactivated')) {
          return;
        }
        var textDom, colorPocker, iconChooser, colorSign;
        if (html.hasClass(target, 'value-state')) {
          this._valueEnable = !this._valueEnable;
          textDom = query('.color-tip', this.valueColorSetting)[0];
          colorSign = 'value';
          colorPocker = this.valueColorPicker;
          iconChooser = null;
        } else if (html.hasClass(target, 'gauge-state')) {
          this._gaugeEnable = !this._gaugeEnable;
          textDom = query('.color-tip', this.gaugeColorSetting)[0];
          colorSign = 'gauge';
          colorPocker = this.gaugeColorPicker;
          iconChooser = null;
        } else if (html.hasClass(target, 'icon-state')) {
          this._iconEnable = !this._iconEnable;
          textDom = query('.color-tip', this.indicatorIconSetting)[0];
          colorSign = 'icon';
          colorPocker = null;
          iconChooser = this.iconChooser;
        }

        if (html.hasClass(textDom, 'disable')) {
          html.removeClass(textDom, 'disable');
          //reset color from cache color
          if (colorPocker) {
            if (this.cacheColor[colorSign]) {
              colorPocker.setColor(new Color(this.cacheColor[colorSign]));
            }
          }
          if (iconChooser) {
            if (this.cacheColor[colorSign]) {
              iconChooser.setIconColor(this.cacheColor[colorSign]);
            }
          }
          html.addClass(target, 'activated');
          html.removeClass(target, 'deactivated');
          this._onUpdate();
        } else {
          html.addClass(textDom, 'disable');
          //cache color
          if (colorPocker) {
            this.cacheColor[colorSign] = colorPocker.getColor().toHex();
            colorPocker.setColor(new Color('#BCBCBC'));
          }
          if (iconChooser) {
            if (iconChooser.getIconColor()) {
              this.cacheColor[colorSign] = iconChooser.getIconColor();
            }
            iconChooser.setIconColor('#BCBCBC');
          }
          html.removeClass(target, 'activated');
          html.addClass(target, 'deactivated');
          this._onUpdate();
        }
      },

      _onIndicatorComponentClick: function(event) {
        // event.stopPropagation();
        var target = event.target || event.srcElement;
        this._updateOptionDisplay(target);
      },

      destroy: function() {
        if (this.valueColorPicker) {
          this.valueColorPicker.destroy();
          this.valueColorPicker = null;
        }
        if (this.valueColorPicker) {
          this.gaugeColorPicker.destroy();
          this.gaugeColorPicker = null;
        }
        if (this.iconChooser) {
          this.iconChooser.destroy();
          this.iconChooser = null;
        }
        this.inherited(arguments);
      }
    });
  });