define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'jimu/LayerInfos/LayerInfos',
    'jimu/DataSourceManager',
    'jimu/utils',
    '../../utils'
  ],
  function(declare, lang, Deferred, LayerInfos, DataSourceManager, jimuUtils, igUtils) {
    return declare(null, {
      oidFieldType: 'esriFieldTypeOID',
      stringFieldType: 'esriFieldTypeString',
      numberFieldTypes: ['esriFieldTypeSmallInteger',
        'esriFieldTypeInteger',
        'esriFieldTypeSingle',
        'esriFieldTypeDouble'
      ],
      _customColorDefaultNum: 5,
      dateFieldType: 'esriFieldTypeDate',

      //Public methods
      // setPreModle
      // setCustomColor
      // setFeatures
      // updateModleComputedWithDefinition
      // updateModleComputedOnlyByConfig
      // getInitializationModle
      // getTempConfigByTempName
      // getRandomCustomColor
      // getLayerDefinitionByDataSource
      // dynamicUpdateModleConfig
      // isDSEqual

      constructor: function(options) {
        if (options) {
          lang.mixin(this, options);
        }

        this.others = [{
          text: this.nls.nullText,
          label: this.nls.nullText,
          id: 'null',
          color: '#808080'
        }, {
          text: this.nls.others,
          label: this.nls.others,
          id: 'others',
          color: '#808080'
        }];

        //series style custom color
        if (this.colors) {
          this.customColors = lang.clone(this.colors);
        }

        this.layerInfosObj = LayerInfos.getInstanceSync();
        this.dataSourceManager = DataSourceManager.getInstance();
      },

      setPreModle: function(preModle) {
        this.PRE_MODLE = preModle;
      },

      setCustomColor: function(colors) {
        this.customColors = lang.clone(colors);
      },

      setFeatures: function(features) {
        this.features = features;
      },

      updateModleComputedWithDefinition: function(modle) {
        if (!modle.computed.definition) {
          return;
        }
        var preDataSource = this.PRE_MODLE.dataSource;
        var dataSource = modle.dataSource;
        if (!this.isDSEqual(dataSource, preDataSource)) {
          //fields
          this._updateSelectFieldOptions(modle);
          //modes
          this._updateModesByDefinition(modle);
          //complete config 2: complete mode
          this._completeLackMode(modle);
        }
        //complete config 3: complete field
        this._completeLackField(modle);
        //complete config 4: complete lack option
        //sortOrder, seriesStyle, operation, nullValue, dateConfig
        this._completedLackConfig(modle);
        //sort fields
        modle.computed.sortComputed = this._calcuteSortComputed(modle);
        //showUseLayerSymbology
        modle.computed.showUseLayerSymbology = this._shouldShowUseLayerSymbolDisplay(modle);
        //showDateOption
        modle.computed.showDateOption = this._shouldShowDateOption(modle);
      },

      updateModleComputedOnlyByConfig: function(modle) {
        var config = modle.config;
        var mode = config.mode;
        var type = config.type;
        //series style
        var seriesStyleComputed = this._calcuteSeriesStyleComputed(modle);
        modle.computed.seriesStyleComputed = seriesStyleComputed;

        //Set valueFields as multipleMode or not
        var valueFieldsAsMultipleMode = true;
        if (mode === 'feature' || mode === 'category') {
          if (config && config.type === 'pie') {
            valueFieldsAsMultipleMode = false;
          }
        }
        if (!valueFieldsAsMultipleMode) {
          if (config.valueFields && config.valueFields.length > 1) {
            config.valueFields = config.valueFields.slice(0, 1);
          }
        }
        modle.computed.valueFieldsAsMultipleMode = valueFieldsAsMultipleMode;

        //legendDisplay
        var legendDisplay;
        if (type === 'pie') {
          legendDisplay = true;
        } else {
          legendDisplay = true;
          if (mode === 'count' || mode === 'field') {
            legendDisplay = false;
          } else {
            if (config.seriesStyle) {
              legendDisplay = config.seriesStyle.type !== 'layerSymbol';
            }
          }

        }
        modle.computed.legendDisplay = legendDisplay;
      },

      getInitializationModle: function(config) {
        //complete config 1: complete text color and bg color
        config = this._completeLackColor(config);
        var computed = {
          //rely on layer definition by data source
          modes: ["feature", "category", "count", "field"],
          //fields by definition
          categoryFieldOptions: [],
          labelFieldsOptions: [],
          valueFields: [],
          sortComputed: null,
          definition: null,
          showDateOption: '',
          showUseLayerSymbology: false,
          //calcute by config
          valueFieldsAsMultipleMode: true,
          seriesStyleComputed: null,
          legendDisplay: true
        };
        var modle = {
          config: config,
          computed: computed
        };
        return lang.clone(modle);
      },

      getTempConfigByTempName: function() {

        if (!this.templates) {
          return null;
        }
        var templatesJson = window.JSON.parse(this.templates);
        var vaildTemplate = templatesJson.filter(function(item) {
          return item.name === this.templateName;
        }.bind(this))[0];
        if (!vaildTemplate) {
          return null;
        }
        var config = null;
        if (vaildTemplate.config && vaildTemplate.config.dijits &&
          vaildTemplate.config.dijits.length) {
          vaildTemplate.config.dijits.forEach(function(item) {
            if (item.type === 'chart') {
              config = item.config;
            }
          });
        }
        return lang.clone(config);
      },

      getRandomCustomColor: function() {
        var color;
        var colorIndex = 0;
        if (this._lastCustomColor) {
          var lastIndex = this.customColors.indexOf(this._lastCustomColor);
          if (lastIndex > -1) {
            colorIndex = lastIndex + 1;
            if (colorIndex > this.customColors.length - 1) {
              colorIndex = 0;
            }
          }
        }
        color = this.customColors[colorIndex];
        this._lastCustomColor = color;
        return color;
      },

      getLayerDefinitionByDataSource: function(modle) {
        var dataSource = modle.dataSource;
        var deferred = new Deferred();
        if (!dataSource) {
          deferred.reject('Invaild data source');
          return deferred;
        }
        if (dataSource.layerId) {
          var layerInfo = this.layerInfosObj.getLayerInfoById(dataSource.layerId);
          this.popupInfo = layerInfo.getPopupInfo();
          if (layerInfo) {
            this._getServiceDefinitionByLayerInfo(layerInfo).then(function(definition) {
              this._addAliasForLayerDefinition(definition);
              deferred.resolve(definition);
            }.bind(this));
          }
        } else if (dataSource.frameWorkDsId) {
          var definition = null;
          var frameWorkDsId = dataSource.frameWorkDsId;
          var dataSources = this.appConfig.dataSource && this.appConfig.dataSource.dataSources;
          var dsMeta = dataSources[frameWorkDsId];
          //dataSource, dsTypeInfo, dsMeta
          if (dsMeta.type === 'Features') {
            definition = lang.clone(dsMeta.dataSchema);
            this._addAliasForLayerDefinition(definition);
            deferred.resolve(definition);
          } else if (dsMeta.type === 'FeatureStatistics') {
            definition = {
              type: 'Table',
              fields: []
            };
            var dataSchema = lang.clone(dsMeta.dataSchema);
            definition.fields = dataSchema.fields;

            if (dataSchema.groupByFields && dataSchema.groupByFields[0]) {
              definition.groupByFields = lang.clone(dataSchema.groupByFields);
            }

            this._addAliasForLayerDefinition(definition);
            deferred.resolve(definition);
          }
        }
        return deferred;
      },

      //some config need to be updated by other config option
      //Such as config.seriesStyle need dynamic updated by config.valueFields
      dynamicUpdateModleConfig: function(modle) {
        if (modle && modle.config) {
          //update modle.config.sortOrder
          var sortOrder = this._calcuteSortConfig(modle);
          modle.config.sortOrder = sortOrder;
          //update modle.config.showLegend
          this._dynamicUpdateShowLegend(modle);
        }
        //update modle.config.seriesStyle
        this._dynamicUpdateSeriesStyle(modle);
      },

      isDSEqual: function(DS1, DS2) {
        if (!DS1 || !DS2) {
          return;
        }
        var formatedDS1 = this._cloneAndFormatDS(DS1);
        var formatedDS2 = this._cloneAndFormatDS(DS2);
        return igUtils.isEqual(formatedDS1, formatedDS2);
      },

      // ------------------------- Tool method -----------------------

      //series style related
      _calcuteSeriesStyleComputed: function(modle) {
        var config = modle.config;
        var mode = config.mode;
        var type = config.type;
        var area = config.area;
        var valueFields = config.valueFields || [];
        var categoryField = config.categoryField;
        var modleComputed = modle.computed;
        var definition = modleComputed.definition;
        var showUseLayerSymbology = modleComputed.showUseLayerSymbology;

        var computed = {};

        var colorDisplayMode = 'single'; //single multiply none
        var showOpacity = false;
        var colorSingleMode = true;
        var otherRadio = 'none';
        //showRadioPanel
        var radios = [];
        if (!!showUseLayerSymbology) {
          radios.push('layerSymbol');
        }
        if (type === 'pie' && (mode === 'category' || mode === 'count') &&
          !igUtils.isDateField(categoryField, definition)) {
          radios.push('custom');
        }
        if (radios.length === 2) {
          otherRadio = 'all';
        }
        if (radios.length === 1) {
          otherRadio = radios[0];
        }
        //colorDisplayMode
        if (valueFields.length > 1) {
          colorDisplayMode = 'multiply';
        } else {
          colorDisplayMode = 'single';
        }
        if (type === 'line' && mode === 'field') {
          colorDisplayMode = 'single';
        }
        //showOpacity
        showOpacity = !!area;

        //colorSingleMode
        if (type === 'pie') {
          colorSingleMode = mode === 'field';
        }
        //mode and category field
        var inputCategoryField = '';
        if (mode === 'category' || mode === 'count') {
          inputCategoryField = config.categoryField;
        }

        computed.colorSingleMode = colorSingleMode;
        computed.colorDisplayMode = colorDisplayMode;
        computed.showOpacity = showOpacity;
        computed.otherRadio = otherRadio;
        computed.categoryField = inputCategoryField;
        if (otherRadio === 'custom' || otherRadio === 'all') {
          var isNumberType = igUtils.isNumberType(categoryField, definition, true);
          var isCodedValueType = igUtils.isContainCodedValuesField(categoryField, definition);
          computed.categoryTypes = {
            isNumberType: isNumberType,
            isCodedValueType: isCodedValueType
          };
          computed.customColorSelects = this._getCustomColorSelects(inputCategoryField, definition);
        }
        computed.chartType = type;
        return computed;
      },

      _createSeriesStyle: function(valueField, showOpacity, colorAsArray) {
        var style = {
          name: valueField,
          style: {
            color: this._getRandomColor()
          }
        };
        if (showOpacity) {
          style.style.opacity = 6;
        }
        if (colorAsArray) {
          style.style.color = ['#68D2E0', '#087E92', '#47BCF5', '#FBE66A', '#F29157', '#C8501D'];
        }
        return style;
      },

      //update modle.config.seriesStyle by computed.showUseLayerSymbology
      //and new config.valueFields and config.mode
      _dynamicUpdateSeriesStyle: function(modle) {
        var config = modle.config;
        var mode = config.mode;
        var type = config.type;
        var area = config.area;
        var categoryField = config.categoryField;
        var valueFields = config.valueFields || [];

        var computed = modle.computed;
        var definition = computed.definition;
        var seriesStyle = lang.clone(config.seriesStyle);
        if (!seriesStyle) {
          seriesStyle = {};
        }
        var hasOpacity = false;
        if (type === 'line' && area) {
          hasOpacity = true;
        }

        var showUseLayerSymbology = computed.showUseLayerSymbology;

        //dynamic update seriesStyle.type
        if (typeof seriesStyle.type === 'undefined') {
          seriesStyle.type = 'series';
        }

        if (!showUseLayerSymbology) {
          if (seriesStyle.type === 'layerSymbol') {
            seriesStyle.type = 'series';
          }
        }

        if (mode === 'field') {
          seriesStyle.type = 'series';
        }

        if (mode === 'feature' && seriesStyle.type === 'custom') {
          seriesStyle.type = 'series';
        }

        if (categoryField && igUtils.isDateField(categoryField, definition) &&
          seriesStyle.type === 'custom') {
          seriesStyle.type = 'series';
        }

        var styles = seriesStyle.styles || [];
        var existingFields = [],
          obsoleteFields = [],
          notAddedFields = [];

        existingFields = styles.map(function(item) {
          return item.name;
        });

        obsoleteFields = existingFields.filter(function(item) {
          return valueFields.indexOf(item) < 0;
        });

        notAddedFields = valueFields.filter(function(vf) {
          return existingFields.indexOf(vf) < 0;
        });
        var colorAsArray = false;
        if (type === 'column' || type === 'bar' || type === 'line') {
          if (type === 'line' && mode === 'field') {
            if (existingFields[0] === 'line~field') {
              obsoleteFields = [];
              notAddedFields = [];
            } else {
              obsoleteFields = existingFields;
              notAddedFields = ['line~field'];
            }
          } else {
            if (mode === 'count') {
              if (existingFields[0] === 'count~count') {
                obsoleteFields = [];
                notAddedFields = [];
              } else {
                obsoleteFields = existingFields;
                notAddedFields = ['count~count'];
              }
            }
          }
        } else if (type === 'pie') {
          if (mode !== 'field') {
            if (existingFields[0] === 'pie~not-field') {
              obsoleteFields = [];
              notAddedFields = [];
            } else {
              colorAsArray = true;
              obsoleteFields = existingFields;
              notAddedFields = ['pie~not-field'];
            }
          }
        }
        styles = styles.filter(function(item) {
          return obsoleteFields.indexOf(item.name) < 0;
        });
        var newStyles = notAddedFields.map(function(item) {
          return this._createSeriesStyle(item, hasOpacity, colorAsArray);
        }.bind(this));
        styles = styles.concat(newStyles);
        seriesStyle.styles = null;
        seriesStyle.styles = styles;
        styles.forEach(function(style) {
          if (valueFields.indexOf(style.name) > -1) {
            style.label = igUtils.getFieldAlias(style.name, definition, this.popupInfo);
          } else {
            style.label = style.name;
          }
        }.bind(this));
        //dynamic updaye series style custom color
        this._dynamicUpdateSeriesStyleCustomColor(seriesStyle, modle);
      },

      _dynamicUpdateSeriesStyleCustomColor: function(seriesStyle, modle) {
        var config = modle.config;
        var dataSource = modle.dataSource;
        var computed = modle.computed;
        var definition = computed.definition;
        var categoryField = config.categoryField;
        var preConfig = this.PRE_MODLE.config;
        var updateCustomType; //remove, update, keep

        if (config.type !== 'pie' || !(config.mode === 'category' || config.mode === 'count')) {
          updateCustomType = 'remove'; //Delete seriesStyle.customColor
          //Forced reinitialization seriesStyle.customColor
        } else if (seriesStyle.customColor) {
          if (typeof this.PRE_MODLE.dataSource === 'undefined') {
            updateCustomType = 'keep';
          } else if (!this.isDSEqual(dataSource, this.PRE_MODLE.dataSource) ||
            categoryField !== preConfig.categoryField) {
            updateCustomType = 'update';
          }
        } else {
          updateCustomType = 'update';
        }
        var ccCategories = null;
        if (updateCustomType === 'remove') {
          if (typeof seriesStyle.customColor !== 'undefined') {
            delete seriesStyle.customColor;
          }
        } else if (updateCustomType === 'update') {
          if (dataSource && categoryField) {
            ccCategories = this._getCustomColorCategories(categoryField, definition);
            if (!seriesStyle.customColor) {
              seriesStyle.customColor = {};
            }
            if (ccCategories) {
              seriesStyle.customColor.categories = ccCategories; //set new custom color config tp series style
            }
            if (!seriesStyle.customColor.others || !seriesStyle.customColor.others.length) {
              seriesStyle.customColor.others = lang.clone(this.others);
            }
          }
        }
        if (modle.config) {
          modle.config.seriesStyle = seriesStyle;
        }
      },

      _dynamicUpdateShowLegend: function(modle) {
        var config = modle.config;
        var mode = config.mode;
        var type = config.type;
        if (type !== 'pie' && (mode === 'count' || mode === 'field')) {
          config.showLegend = false;
        }
      },

      _getCustomColorSelects: function(categoryField, definition) {
        var categories = this._getCategoriesByFeatures(categoryField);
        if (!categories || !categories.length) {
          return;
        }
        categories = categories.filter(function(category) {
          return !!category || category === 0;
        });
        var selects = [];
        if (igUtils.isContainCodedValuesField(categoryField, definition)) {
          selects = categories.map(function(ac) {
            var value = ac;
            ac = this._getDominDisplayValue(categoryField, ac, definition);
            return {
              label: ac,
              value: value
            };
          }.bind(this));
        } else {
          selects = categories.map(function(ac) {
            return {
              label: ac,
              value: ac
            };
          });
        }
        return selects;
      },

      _getCustomColorCategories: function(categoryField, definition) {
        var categories = this._getCategoriesByFeatures(categoryField);
        if (!categories || !categories.length) {
          return;
        }
        categories = categories.filter(function(category) {
          return !!category || category === 0;
        });
        if (categories.length > this._customColorDefaultNum) {
          categories = categories.slice(0, this._customColorDefaultNum);
        }
        var ccCategories = [];
        if (igUtils.isContainCodedValuesField(categoryField, definition)) {
          ccCategories = categories.map(function(category) {
            var id = category;
            category = this._getDominDisplayValue(categoryField, category, definition);
            return {
              id: id,
              text: category,
              label: category,
              color: this.getRandomCustomColor()
            };
          }.bind(this));

        } else {
          ccCategories = categories.map(function(category) {
            return {
              id: category,
              text: category,
              label: category,
              color: this.getRandomCustomColor()
            };
          }.bind(this));
        }
        return ccCategories;
      },

      _getCategoriesByFeatures: function(categoryField) {
        var categories = [];
        if (!this.features || !this.features.length) {
          return categories;
        }
        this.features.forEach(lang.hitch(this, function(feature) {
          var attributes = feature.attributes;
          var category = attributes[categoryField];
          if (categories.indexOf(category) < 0) {
            categories.push(category);
          }
        }));
        return this._sortOrderCategories(categories);
      },

      //sort related
      _calcuteSortConfig: function(modle) {
        var sortConfig = {};

        var preConfig = this.PRE_MODLE.config;
        var config = modle.config;

        var sortOrder = config.sortOrder;

        var fieldOption = this._getSortFields(modle);

        if (!igUtils.isEqual(config.mode, preConfig.mode) &&
          typeof preConfig.mode !== 'undefined') {
          sortConfig.isAsc = true;
          if (config.mode === 'feature') {
            if (fieldOption && fieldOption[0]) {
              sortConfig.field = fieldOption[0].value;
            }
          } else {
            sortConfig.isLabelAxis = true;
          }
        } else {
          sortConfig = lang.clone(sortOrder);
        }

        return sortConfig;
      },

      _getSortFields: function(modle) {
        if (!modle) {
          return;
        }
        var definition = modle.computed.definition;
        var config = modle.config;
        var mode = config.mode;
        if (!definition || !config) {
          return;
        }
        if (mode !== 'feature' && (!config.valueFields || !config.valueFields[0])) {
          return;
        }
        var fields = [];
        if (mode === 'feature') {
          fields = lang.clone(definition.fields);
          fields = igUtils.getNotGeometryFields(fields);
        } else if (config.valueFields) {
          fields = igUtils.getFieldInfosByFieldName(config.valueFields, modle.computed.definition);
        }
        var fieldOption = fields.map(function(field) {
          return {
            value: field.name,
            label: field.alias || field.name
          };
        });
        return fieldOption;
      },

      _getInitSortOrderConfig: function(modle) {
        var config = modle.config;
        var sortOrderConfig = null;
        if (!config && !config.mode) {
          return sortOrderConfig;
        }
        var field;
        var fieldOption = this._getSortFields(modle);
        if (fieldOption && fieldOption[0]) {
          field = fieldOption[0].value;
        }
        var mode = config.mode;
        if (mode === 'feature') {
          if (field) {
            sortOrderConfig = {
              field: field,
              isAsc: true
            };
          }
        } else {
          sortOrderConfig = {
            isLabelAxis: true,
            isAsc: true
          };
        }
        return sortOrderConfig;
      },

      _calcuteSortComputed: function(modle) {
        var computed = {};
        var preConfig = this.PRE_MODLE.config;
        var config = modle.config;
        var sortOrder = config.sortOrder;
        var mode = config.mode;
        var preMode = preConfig.mode;
        computed.mode = mode;

        var fieldOption = this._getSortFields(modle);
        computed.fieldOption = fieldOption;

        if (!igUtils.isEqual(mode, preMode) && preMode) {
          if (mode === 'feature') {
            computed.sortArrowPosition = 'down';
          } else {
            computed.sortArrowPosition = 'top';
          }
        } else {
          if (mode === 'feature') {
            computed.sortArrowPosition = 'down';
          } else {
            computed.sortArrowPosition = sortOrder.isLabelAxis ? 'top' : 'mid';
          }
        }

        return computed;
      },

      //data source related
      _addAliasForLayerDefinition: function(definition) {
        if (definition && definition.fields && definition.fields.length > 0) {
          definition.fields.forEach(lang.hitch(this, function(fieldInfo) {
            var alias = igUtils.getFieldAliasByFieldInfo(fieldInfo, this.popupInfo);
            if (alias) {
              fieldInfo.alias = alias;
            }
          }));
        }
      },

      _getServiceDefinitionByLayerInfo: function(layerInfo) {
        return layerInfo.getServiceDefinition().then(lang.hitch(this, function(definition) {
          if (definition) {
            return definition;
          } else {
            return layerInfo.getLayerObject().then(lang.hitch(this, function(layerObject) {
              if (layerObject) {
                return jimuUtils.getFeatureLayerDefinition(layerObject);
              } else {
                return null;
              }
            }));
          }
        }));
      },

      _cloneAndFormatDS: function(DS) {
        var cloneDS = lang.clone(DS);
        var formatDS = {};
        if (cloneDS.name) {
          formatDS.name = cloneDS.name;
        }
        if (cloneDS.dataSourceType) {
          formatDS.dataSourceType = cloneDS.dataSourceType;
        }
        if (cloneDS.layerId) {
          formatDS.layerId = cloneDS.layerId;
        }
        if (cloneDS.frameWorkDsId) {
          formatDS.frameWorkDsId = cloneDS.frameWorkDsId;
        }
        cloneDS = null;
        return formatDS;
      },
      _getFeatureLayer: function(layerId) {
        var featureLayer = null;
        if (this.map && typeof layerId !== 'undefined') {
          featureLayer = this.map.getLayer(layerId);
        }
        return featureLayer;
      },

      //completed lack config
      _completeLackMode: function(modle) {
        var computed = modle.computed;
        var config = modle.config;

        if (!config.mode && computed.modes && computed.modes.length) {
          config.mode = computed.modes[0];
        }
      },

      _completeLackField: function(modle) {
        var computed = modle.computed;
        var config = modle.config;
        var mode = config.mode;

        if (mode === 'feature') {
          if (!config.labelField && computed.labelFieldsOptions.length) {
            config.labelField = computed.labelFieldsOptions[0].value;
          }
        } else if (mode === 'category' || mode === 'count') {
          if (!config.categoryField && computed.categoryFieldOptions.length) {
            config.categoryField = computed.categoryFieldOptions[0].value;
          }
        }
      },

      _completedLackConfig: function(modle) {
        var computed = modle.computed;
        var config = modle.config;

        var mode = config.mode;
        var optionKeys = ['sortOrder', 'seriesStyle'];
        switch (mode) {
          case 'feature':
            optionKeys.push('valueFields');
            break;
          case 'count':
            break;
          case 'category':
          case 'field':
            optionKeys = optionKeys.concat(['operation', 'nullValue', 'valueFields']);
            break;
          default:
        }
        if ((mode === 'category' || mode === 'count') &&
          igUtils.isDateField(config.categoryField, computed.definition)) {
          optionKeys.push('dateConfig');
        }
        optionKeys.forEach(function(key) {
          switch (key) {
            case 'valueFields':
              if (config && !config.valueFields) {
                config.valueFields = [];
              }
              break;
            case 'sortOrder':
              if (config && !config.sortOrder) {
                config.sortOrder = this._getInitSortOrderConfig(modle);
              }
              break;
            case 'seriesStyle':
              if (config && !config.seriesStyle) {
                config.seriesStyle = {
                  styles: []
                };
              }
              break;
            case 'operation':
              if (config && !config.operation) {
                config.operation = 'sum';
              }
              break;
            case 'nullValue':
              if (config && typeof config.nullValue === 'undefined') {
                config.nullValue = true;
              }
              break;
            case 'dateConfig':
              if (config && !config.dateConfig) {
                var dateConfig = {
                  isNeedFilled: true,
                  minPeriod: 'automatic'
                };
                if (config.type === 'pie') {
                  dateConfig.isNeedFilled = false;
                }
                config.dateConfig = dateConfig;
              }
              break;
            default:
          }
        }.bind(this));
      },

      _completeLackColor: function(config) {
        if (!config || !config.type) {
          return false;
        }
        var colors = this._getDefaultColorOfTheme();
        var textColor = colors.textColor;
        var bgColor = colors.bgColor;

        if (!config.backgroundColor) {
          config.backgroundColor = bgColor;
        }

        var colorKeys = [];
        switch (config.type) {
          case 'column':
          case 'bar':
          case 'line':
            colorKeys = colorKeys.concat(['legendTextColor', 'horizontalAxisTextColor',
              'verticalAxisTextColor'
            ]);
            break;
          case 'pie':
            colorKeys = colorKeys.concat(['legendTextColor', 'dataLabelColor']);
            break;
          default:
        }
        colorKeys.forEach(function(key) {
          if (typeof config[key] === 'undefined' || !config[key]) {
            config[key] = textColor;
          }
        });
        return config;
      },

      _updateModesByDefinition: function(modle) {
        var handleModesForFeatureStatistics = false;
        var modes = ["feature", "category", "count", "field"];
        var definition = modle.computed.definition;
        var dataSource = modle.dataSource;
        if (dataSource.frameWorkDsId) {
          var frameWorkDsId = dataSource.frameWorkDsId;
          var dataSources = this.appConfig.dataSource && this.appConfig.dataSource.dataSources;
          var dsMeta = dataSources[frameWorkDsId];
          if (dsMeta.type === 'FeatureStatistics') {
            handleModesForFeatureStatistics = true;
            var dataSchema = lang.clone(dsMeta.dataSchema);
            var groupByFields = dataSchema.groupByFields || [];
            if (groupByFields.length > 0) {
              //available modes: category, count
              if (this._hasNumberFields(definition)) {
                modes = ["category", "count"];
              } else {
                modes = ["count"];
              }
            } else {
              modes = ["field"];
            }
          }
        }
        if (!handleModesForFeatureStatistics && !this._hasNumberFields(definition)) {
          modes = ['count'];
        }
        modle.computed.modes = modes;
      },

      _updateSelectFieldOptions: function(modle) {
        var definition = modle.computed.definition;
        var computed = modle.computed;
        var fieldInfos = lang.clone(definition.fields);
        //update have been checked  to uncheck
        //fix a bug of all field auto checked when select ds from featureStatistics
        fieldInfos.forEach(function(item) {
          item.checked = false;
        });
        //categoryFieldOptions
        var categoryFieldTypes = [this.stringFieldType, this.dateFieldType, this.oidFieldType];
        categoryFieldTypes = categoryFieldTypes.concat(lang.clone(this.numberFieldTypes));
        var availableCategoryFieldInfos = fieldInfos.filter(lang.hitch(this, function(fieldInfo) {
          return categoryFieldTypes.indexOf(fieldInfo.type) >= 0;
        }));

        computed.categoryFieldOptions = availableCategoryFieldInfos.map(lang.hitch(this, function(fieldInfo) {
          return {
            label: fieldInfo.alias || fieldInfo.name,
            value: fieldInfo.name
          };
        }));
        if (definition.groupByFields && definition.groupByFields[0]) {
          computed.categoryFieldOptions = computed.categoryFieldOptions.filter(function(item) {
            return item.value === definition.groupByFields[0];
          });
        }
        // labelFieldsOptions
        var a = this.stringFieldType;
        var b = this.oidFieldType;
        var c = this.dateFieldType;
        var featureLabelFieldTypes = [a, b, c].concat(lang.clone(this.numberFieldTypes));

        var availableLabelFieldInfos = fieldInfos.filter(lang.hitch(this, function(fieldInfo) {
          return featureLabelFieldTypes.indexOf(fieldInfo.type) >= 0;
        }));
        computed.labelFieldsOptions = availableLabelFieldInfos.map(lang.hitch(this, function(fieldInfo) {
          return {
            label: fieldInfo.alias || fieldInfo.name,
            value: fieldInfo.name
          };
        }));
        //valueFields
        computed.valueFields = fieldInfos.filter(lang.hitch(this, function(fieldInfo) {
          return this.numberFieldTypes.indexOf(fieldInfo.type) >= 0;
        }));
        if (definition.groupByFields && definition.groupByFields[0]) {
          var categoryFieldNames = computed.categoryFieldOptions.map(function(item) {
            return item.value;
          });
          computed.valueFields = computed.valueFields.filter(function(item) {
            return categoryFieldNames.indexOf(item.name) < 0;
          });
        }
      },

      _shouldShowUseLayerSymbolDisplay: function(modle) {
        var definition = modle.computed.definition;
        var show = false;
        var type = modle.config.type;
        var mode = modle.config.mode;
        if (type === 'line' || mode === 'field') {
          return show;
        }
        var layerId;
        var featureLayer = null;
        var dataSource = null;
        //get layerId
        if (modle.dataSource) {
          dataSource = modle.dataSource;
          if (dataSource.layerId) {
            layerId = dataSource.layerId;
          } else if (dataSource.frameWorkDsId) {
            var frameWorkDsId = dataSource.frameWorkDsId;
            var dsTypeInfo = this.dataSourceManager.parseDataSourceId(frameWorkDsId);
            if (dsTypeInfo && dsTypeInfo.layerId !== 'undefined') {
              layerId = dsTypeInfo.layerId;
            }
          }
        }
        //feature layer
        if (layerId) {
          featureLayer = this._getFeatureLayer(layerId);
        }

        if (!layerId) {
          return show;
        }

        if (mode === 'feature') {
          show = true;
        } else if (mode === 'category' || mode === 'count') {
          var categoryField = modle.config.categoryField;
          if (!featureLayer) {
            return show;
          }
          if (featureLayer.renderer) {
            var renderer = featureLayer.renderer;
            if (renderer.declaredClass === 'esri.renderer.ClassBreaksRenderer' ||
              renderer.declaredClass === 'esri.renderer.UniqueValueRenderer') {
              if (renderer.attributeField === categoryField && !igUtils.isDateField(categoryField, definition)) {
                show = true;
              }
            }
          }
        }
        return show;
      },

      //others
      _sortOrderCategories: function(categories) {
        if (Array.isArray(categories)) {
          categories.sort(function(a, b) {

            if (typeof s === 'string') {
              a = a.toLowerCase();
            }
            if (typeof t === 'string') {
              b = b.toLowerCase();
            }

            if (jimuUtils.isNumberOrNumberString(a)) {
              a = Number(a);
            }
            if (jimuUtils.isNumberOrNumberString(b)) {
              b = Number(b);
            }

            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
          }.bind(this));

        }
        return categories;
      },

      _getDominDisplayValue: function(fieldName, value, definition) {
        var displayValue = value;
        var fieldInfo = igUtils.getFieldInfo(fieldName, definition);
        if (fieldInfo) {
          if (fieldInfo.domain) {
            var codedValues = fieldInfo.domain.codedValues;
            if (codedValues && codedValues.length > 0) {
              codedValues.some(function(item) {
                if (item.code === value) {
                  displayValue = item.name;
                  return true;
                } else {
                  return false;
                }
              });
            }
          }
        }
        return displayValue;
      },

      _getRandomColor: function() {
        var color;
        var colorIndex = 0;
        if (this._lastColor) {
          var lastIndex = this.colors.indexOf(this._lastColor);
          if (lastIndex > -1) {
            colorIndex = lastIndex + 1;
            if (colorIndex > this.colors.length - 1) {
              colorIndex = 0;
            }
          }
        }
        color = this.colors[colorIndex];
        this._lastColor = color;
        return color;
      },

      _hasNumberFields: function(definition) {
        var result = false;
        var fieldInfos = definition.fields;
        if (fieldInfos && fieldInfos.length > 0) {
          result = fieldInfos.some(lang.hitch(this, function(fieldInfo) {
            return this.numberFieldTypes.indexOf(fieldInfo.type) >= 0;
          }));
        }
        return result;
      },

      _shouldShowDateOption: function(modle) {
        var definition = modle.computed.definition;
        var categoryField = modle.config.categoryField;
        var isDateField = igUtils.isDateField(categoryField, definition);
        var chartMode = modle.config.mode;
        return (chartMode === 'category' || chartMode === 'count') && isDateField;
      },

      _getDefaultColorOfTheme: function() {
        var colors = {
          bgColor: '#fff',
          textColor: '#000'
        };
        if (!this.appConfig) {
          return colors;
        }
        if (this.appConfig.theme.name === 'DashboardTheme' &&
          (this.appConfig.theme.styles[0] === 'default' || this.appConfig.theme.styles[0] === 'style3')) {
          colors.bgColor = '#222222';
          colors.textColor = '#fff';
        } else if (this.appConfig.theme.name === 'DartTheme') {
          colors.bgColor = '#4c4c4c';
          colors.textColor = '#fff';
        }
        return colors;
      }

    });
  });