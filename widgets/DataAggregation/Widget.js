define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'jimu/BaseWidget',
  "dojo/_base/xhr",
  'dojo/Deferred',
  'jimu/LayerStructure',
  'jimu/portalUtils',
  'jimu/dijit/Message',
  'esri/lang',
  './js/UI/PageContainer',
  './js/UI/Home',
  './js/UI/StartPage',
  './js/UI/LocationType'],
  function (declare,
    lang,
    array,
    BaseWidget,
    xhr,
    Deferred,
    LayerStructure,
    portalUtils,
    Message,
    esriLang,
    PageContainer,
    Home,
    StartPage,
    LocationType) {
    return declare([BaseWidget], {
      baseClass: 'jimu-widget-critical-facilities-ui',

      _configLayerInfo: null,
      _url: '',
      _geocodeSources: null,
      _fsFields: null,
      _singleFields: null,
      _multiFields: null,
      editLayer: null,
      _pageContainer: null,
      _userCanEdit: true,

      _locationMappingComplete: false,
      _fieldMappingComplete: false,
      _tempResultsAdded: false,

      postCreate: function () {
        this.inherited(arguments);
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
        this.validateEditPrivileges().then(lang.hitch(this, function (userCanEdit) {
          this._userCanEdit = userCanEdit;
          this._setThemeAndColors();
          this._initConfigInfo();
          this._initBaseArgs();
          if(!this._userCanEdit){
            this.showEditMessage();
          }
        }));
      },

      _initBaseArgs: function () {
        this._baseArgs = {
          nls: this.nls,
          map: this.map,
          parent: this,
          config: this.config,
          appConfig: this.appConfig,
          theme: this.theme,
          isDarkTheme: this.isDarkTheme,
          styleColor: this.styleColor,
          singleEnabled: this.singleEnabled,
          multiEnabled: this.multiEnabled,
          xyEnabled: this.xyEnabled
        };
      },

      /*jshint unused:false*/
      onAppConfigChanged: function (appConfig, reason, changedData) {
        switch (reason) {
          case 'themeChange':
            break;
          case 'layoutChange':
            break;
          case 'styleChange':
            break;
          case 'widgetChange':
            this._clearResults();
            break;
          case 'mapChange':
            break;
        }
      },

      _setThemeAndColors: function () {
        this.theme = this.appConfig.theme.name;
        this.styleColor = this._getStyleColor();
      },

      _getStyleColor: function (styleName) {
        var s = this.appConfig.theme.styles[0];
        if (styleName) {
          s = styleName;
        }
        var url = "./themes/" + this.theme + "/manifest.json";
        xhr.get({
          url: url,
          handleAs: "json",
          load: lang.hitch(this, function (data) {
            var styles = data.styles;
            for (var i = 0; i < styles.length; i++) {
              var st = styles[i];
              if (st.name === s) {
                this.styleColor = st.styleColor;
                this._initPageContainer();
              }
            }
          })
        });
      },

      _initConfigInfo: function () {
        if (this.config.layerSettings && this.config.layerSettings.layerInfo) {
          this._valid = true;
          this._configLayerInfo = this.config.layerSettings.layerInfo;
          this._url = this._configLayerInfo.featureLayer.url;
          this._geocodeSources = this.config.sources;
          this._symbol = this.config.layerSettings.symbol;
          this.xyEnabled = this.config.xyEnabled;
          this.multiEnabled = false;
          this.singleEnabled = false;
          this._fsFields = [];

          if (this._configLayerInfo) {
            array.forEach(this._configLayerInfo.fieldInfos, lang.hitch(this, function (field) {
              if (field && field.visible) {
                this._fsFields.push({
                  name: field.fieldName,
                  label: field.label,
                  value: field.type,
                  isRecognizedValues: field.isRecognizedValues,
                  duplicate: field.duplicate
                });
              }
            }));

            var updateRecognizedValues = function (f1, f2) {
              array.forEach(f1.isRecognizedValues, function (v) {
                if (f2.isRecognizedValues.indexOf(v) === -1) {
                  f2.isRecognizedValues.push(v);
                }
              });
            };

            this._singleFields = [];
            this._multiFields = [];
            var multiFieldLabels = [];
            var multiFieldNames = [];
            var singleFieldLabels = [];
            var singleFieldNames = [];
            if (this._geocodeSources) {
              array.forEach(this._geocodeSources, lang.hitch(this, function (source) {
                this.singleEnabled = !this.singleEnabled ? source.singleEnabled : this.singleEnabled;
                this.multiEnabled = !this.multiEnabled ? source.multiEnabled : this.multiEnabled;

                if (source.singleEnabled) {
                  var singleAddressField = source.singleAddressFields[0];
                  var singleFieldLabel = singleAddressField.label || singleAddressField.alias;
                  var singleLabelIndex = singleFieldLabels.indexOf(singleFieldLabel);
                  var singleFieldName = singleAddressField.fieldName || singleAddressField.name;
                  var singleNameIndex = singleFieldNames.indexOf(singleFieldName);
                  if (singleLabelIndex > -1 || singleNameIndex > -1) {
                    var i = singleLabelIndex > -1 ? singleLabelIndex : singleNameIndex;
                    updateRecognizedValues(singleAddressField, this._singleFields[i]);
                  } else {
                    singleFieldLabels.push(singleFieldLabel);
                    singleFieldNames.push(singleFieldName);
                    this._singleFields.push({
                      label: singleFieldLabel,
                      value: singleFieldName,
                      type: "STRING",
                      isRecognizedValues: singleAddressField.isRecognizedValues
                    });
                  }
                }

                if (source.multiEnabled) {
                  array.forEach(source.addressFields, lang.hitch(this, function (field) {
                    if ((field && field.visible)) {
                      var label = field.label || field.alias;
                      var labelIndex = multiFieldLabels.indexOf(label);
                      var name = field.fieldName || field.name;
                      var nameIndex = multiFieldNames.indexOf(name);
                      if (labelIndex > -1 || nameIndex > -1) {
                        updateRecognizedValues(field, this._multiFields[labelIndex > -1 ? labelIndex : nameIndex]);
                      } else {
                        multiFieldLabels.push(label);
                        multiFieldNames.push(name);
                        this._multiFields.push({
                          label: label,
                          value: name,
                          type: "STRING",
                          isRecognizedValues: field.isRecognizedValues
                        });
                      }
                    }
                  }));
                }
              }));
            }

            this.layerStructure = LayerStructure.getInstance();
            this.editLayerNode = this.layerStructure.getNodeById(this._configLayerInfo.featureLayer.id);
            this.editLayerNode.getLayerObject().then(lang.hitch(this, function (layer) {
              this.infoTemplate = this.editLayerNode.getInfoTemplate();
              this.editLayer = layer;
              this._updateFsFields(this.editLayer, this.infoTemplate);
            }));
          }
        }
      },

      _updateFsFields: function (lyr, infoTemplate) {
        var typeIdField = lyr.typeIdField;
        var ints = ["esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeSingle"];
        var dbls = ["esriFieldTypeDouble"];
        var date = "esriFieldTypeDate";
        var len = function (v) {
          return v.toString().length;
        };
        var getInfoTemplateField = function (name) {
          if (infoTemplate && infoTemplate.info && infoTemplate.info.fieldInfos) {
            var fieldInfos = infoTemplate.info.fieldInfos;
            field_info_loop:
            for (var index = 0; index < fieldInfos.length; index++) {
              var fi = fieldInfos[index];
              if (fi.fieldName === name) {
                return fi;
              }
            }
          }
        };
        array.forEach(this._fsFields, function (fsField) {
          field_loop:
          for (var i = 0; i < lyr.fields.length; i++) {
            var lyrField = lyr.fields[i];
            if (lyrField.name === fsField.name) {
              fsField.domain = lyrField.domain;
              fsField.length = lyrField.length;
              fsField.isTypeIdField = fsField.name === typeIdField;
              fsField.subtypes = lyr.subtypes;

              //set the type
              var supportsInt = true;
              var domain = fsField.domain;
              if (fsField.domain && fsField.domain.codedValues) {
                coded_value_loop:
                for (var ii = 0; ii < fsField.domain.codedValues.length; ii++) {
                  var v = fsField.domain.codedValues[ii];
                  supportsInt = ((!isNaN(parseInt(v, 10))) && len(parseInt(v, 10)) === len(v));
                  if (!supportsInt) {
                    break coded_value_loop;
                  }
                }
              }
              var type = lyrField.type;
              fsField.type = ints.indexOf(type) > -1 ? "int" : dbls.indexOf(type) > -1 ? "float" :
                date === type ? "date" : domain && supportsInt ? "domainInt" : domain ? "domain" : "other";
              fsField.esriFieldType = type;
              if (fsField.type === 'date') {
                var infoTemplateField = getInfoTemplateField(fsField.name);
                fsField.fieldInfo = infoTemplateField;
              }
              fsField.nullable = lyrField.nullable;
              break field_loop;
            }
          }
        });
      },

      _initPageContainer: function () {
        //get base views that are not dependant on the user data
        var homeView = this._initHomeView();
        var startPageView = this._initStartPageView();
        var views = [homeView, startPageView];

        //when both coordinate and address input are supported create a view
        // that will allow the user to choose the type they will use
        if (this.xyEnabled && (this.multiEnabled || this.singleEnabled)) {
          var locationTypeView = this._initLocationTypeView();
          views.push(locationTypeView);
        }

        if (this._pageContainer) {
          this._locationMappingComplete = false;
          this._fieldMappingComplete = false;
          this._tempResultsAdded = false;
          this._pageContainer.reset();
          this._pageContainer.displayControllerOnStart = false;
          this._pageContainer.toggleController(true);
          this._pageContainer.views = views;
        } else {
          this._pageContainer = new PageContainer({
            views: views,
            nls: this.nls,
            appConfig: this.appConfig,
            displayControllerOnStart: false,
            parent: this,
            styleColor: this.styleColor
          }, this.pageNavigation);
        }
        this._pageContainer.startup();
      },

      _initHomeView: function () {
        return new Home(lang.mixin({
          _geocodeSources: this._geocodeSources,
          _fsFields: this._fsFields,
          _singleFields: this._singleFields,
          _multiFields: this._multiFields,
          userName: this.userName,
          disabled: !this._userCanEdit
        }, this._baseArgs));
      },

      _initStartPageView: function () {
        return new StartPage(this._baseArgs);
      },

      _initLocationTypeView: function () {
        return new LocationType(this._baseArgs);
      },

      _clearResults: function () {
        if (this._pageContainer) {
          var homeView = this._pageContainer.getViewByTitle('Home');
          if (homeView) {
            homeView._clearStore();
            homeView._clearMapping();
          }
        }
      },

      validateEditPrivileges: function () {
        var def = new Deferred();
        var portal = portalUtils.getPortal(this.appConfig.portalUrl);
        portal.getUser().then(lang.hitch(this, function (user) {
          this.userName = user.username;
          def.resolve(user.privileges.indexOf('features:user:edit') > -1 ||
            user.privileges.indexOf('features:user:fullEdit') > -1 ? true : false);
        }), lang.hitch(this, function (err) {
          console.log(err);
          def.resolve(false);
        }));
        return def;
      },

      showEditMessage: function(){
        new Message({
          message: esriLang.substitute({ user: this.userName }, this.nls.startPage.userPrivilege)
        });
      }
    });
  });