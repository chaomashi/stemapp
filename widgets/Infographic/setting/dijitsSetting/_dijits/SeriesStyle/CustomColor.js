define([
    'dojo/_base/declare',
    'dojo/text!./CustomColor.html',
    'dojo/Evented',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/DataSourceManager',
    'jimu/LayerInfos/LayerInfos',
    'jimu/dijit/_chartDijitOption',
    '../ChartColorSetting',
    'jimu/dijit/ColorPickerPopup',
    './CustomColorList',
    '../../../utils',
    'dojo/on',
    'dojo/_base/Color',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/store/Memory',
    './CustomCombox',
    'jimu/dijit/LoadingShelter'
  ],
  function(declare, templateString, Evented, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
    DataSourceManager, LayerInfos, ChartDijitOption, ChartColorSetting, ColorPickerPopup,
    CustomColorList, igUtils, on, Color, lang, html, Memory, CustomCombox) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'infographic-custom-color',
      templateString: templateString,

      constructor: function() {
        this.inherited(arguments);
        this.layerInfosObj = LayerInfos.getInstanceSync();
        this.dataSourceManager = DataSourceManager.getInstance();
        this.chartDijitOption = new ChartDijitOption({});

        this._existCategories = [];
        this._customColorSelectOption = [];
      },

      postCreate: function() {
        this.inherited(arguments);
        this._initDom();
        this._initEvents();
        this._updateColorArray();
      },

      setConfig: function(config) {
        if (!config || !config.categories || !Array.isArray(config.categories)) {
          return;
        }
        this.customColorList.setConfig(config);
      },

      getConfig: function() {
        if (this.customColorList) {
          return this.customColorList.getConfig();
        } else {
          return false;
        }
      },

      _onChange: function() {
        var config = this.getConfig();
        if (config) {
          this.emit('change', config);
        }
      },

      _getComboxStoreIdByName: function(combox, name) {
        var id;
        if (combox && combox.store && combox.store.data && combox.store.data.length) {
          var data = combox.store.data;
          var matchDataItem = data.filter(function(item) {
            return item.name === name;
          })[0];
          if (matchDataItem && typeof matchDataItem.id !== 'undefined') {
            id = matchDataItem.id;
          }
        }
        return id;
      },

      _onDoAddClick: function(event) {
        event.stopPropagation();
        var name = this.selectInput.get('value');
        var id = this._getComboxStoreIdByName(this.selectInput, name);
        if (!id) {
          id = name;
        }
        var color = this.singleColorPicker.getColor();
        if (this._existCategories.indexOf(id) > -1) {
          return;
        }
        if (!id) {
          return;
        }

        this._showAddCategoryDisptch();
        var newColorItem = {
          id: id,
          text: name,
          label: name,
          color: color
        };
        this.customColorList.addNewColorItem(newColorItem, true);

      },

      _onCancelClick: function(event) {
        event.stopPropagation();
        this._showAddCategoryDisptch();
      },

      _getRandomColor: function() {
        var color;
        var colorIndex = 0;
        if (this._lastColor) {
          var lastIndex = this._colors.indexOf(this._lastColor);
          if (lastIndex > -1) {
            colorIndex = lastIndex + 1;
            if (colorIndex > this._colors.length - 1) {
              colorIndex = 0;
            }
          }
        }
        color = this._colors[colorIndex];
        this._lastColor = color;
        return color;
      },

      _initDom: function() {
        //CUSTOM COMBOX
        this.selectInput = new CustomCombox({
          placeHolder: this.nls.comboxHint,
          style: {
            width: '150px'
          }
        });
        this.selectInput.placeAt(this.addActionDiv, 'first');
        this.selectInput.disableInput();
        //vaild display message
        this.selectInput.invalidMessage = this.nls.categoryExists;

        this.colorsPicker = new ChartColorSetting();
        this.colorsPicker.placeAt(this.colorsPickerDiv);
        this.colorsPicker.setMode(false);

        this.customColorList = new CustomColorList({
          nls: this.nls
        });
        this.customColorList.placeAt(this.content);

        this.singleColorPicker = new ColorPickerPopup({
          appearance: {
            showTransparent: false,
            showColorPalette: true,
            showCoustom: true,
            showCoustomRecord: true
          }
        });
        this.singleColorPicker.placeAt(this.colorDiv);
        this.singleColorPicker.startup();
      },

      _initEvents: function() {
        this.own(on(this.customColorList, 'change', lang.hitch(this, function() {
          this._onChange();
        })));
        this.own(on(this.colorsPicker, 'change', lang.hitch(this, function() {
          this._updateColorArray();
        })));
        this.own(on(this.customColorList, 'color-list-change', lang.hitch(this, function(categories) {
          this._updateExistCategories(categories);
        })));
      },

      _updateExistCategories: function(existCategories) {
        this._existCategories = existCategories;
        this._setCategoriesToSelect();
        this._updateSelectInputValidator();
      },

      _updateSelectInputValidator: function() {
        this.selectInput.set('validator', function(value) {
          return this._existCategories.indexOf(value) < 0;
        }.bind(this));
      },

      setCustomColorSelectOption: function(selectOption) {
        if (!selectOption) {
          return;
        }
        this._customColorSelectOption = lang.clone(selectOption);
        this._setCategoriesToSelect();
      },

      setCategoryType: function(categoryTypes) {
        this._isCodedValueType = categoryTypes && categoryTypes.isCodedValueType;
        this._updateSeelectInputState();
        if (this.customColorList) {
          this.customColorList.setCategoryType(categoryTypes);
        }
      },

      _updateSeelectInputState: function() {
        if (this._isCodedValueType) {
          this.selectInput.disableInput();
          this.selectInput.set('placeHolder', this.nls.comboxDisableInputHint);
        } else {
          this.selectInput.enableInput();
          this.selectInput.set('placeHolder', this.nls.comboxHint);
        }
      },

      _setCategoriesToSelect: function() {
        this._updateSeelectInputState();
        var categories = lang.clone(this._customColorSelectOption);
        categories = categories.filter(function(cg) {
          var value = cg.value + "";
          return this._existCategories.indexOf(value) < 0;
        }.bind(this));
        var data = categories.map(function(cg) {
          return {
            id: cg.value,
            name: cg.label
          };
        });
        var stateStore = new Memory({
          data: data
        });
        this.selectInput.store = stateStore;
        this.selectInput.setValue('');
      },

      _onAddCategoryClick: function(event) {
        event.stopPropagation();
        var color = this._getRandomColor();
        this.singleColorPicker.setColor(new Color(color));
        this._showAddCategoryAction();
      },

      _showAddCategoryDisptch: function() {
        html.removeClass(this.dispatchAdd, 'hide');
        html.addClass(this.actionAdd, 'hide');
        this.selectInput.setValue('');
      },

      _showAddCategoryAction: function() {
        html.addClass(this.dispatchAdd, 'hide');
        html.removeClass(this.actionAdd, 'hide');
      },

      _updateColorArray: function() {
        var colors = this.colorsPicker.getColors();
        if (colors.length === 2) {
          colors = igUtils.separationGradientColors(colors, 6);
        }
        this._colors = colors;
        this.emit('update-colors', colors);
      }

    });
  });