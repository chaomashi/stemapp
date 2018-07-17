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
  "dojo/_base/lang",
  'dojo/on',
  'dojo/_base/html',
  'dojo/_base/array',
  'jimu/LayerInfos/LayerInfos',
  "dojo/Deferred",
  'dojo/Evented',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./SingleNumberStatistics.html',
  'jimu/dijit/Message',
  '../../utils',
  "dijit/form/RadioButton",
  "dijit/form/Select"
],
  function (declare, lang, on, html, array, LayerInfos, Deferred,
    Evented, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, Message, igUtils) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'single-number-statistics',
      templateString: template,
      nls: null,
      _STATISTICSTYPES: null,
      _DEFAULT_CONFIG: null,

      dataSource: null,

      popupInfo: null,

      postCreate: function () {
        this.inherited(arguments);

        this._STATISTICSTYPES = [{
          value: "sum",
          label: this.nls.sumOption
        }, {
          value: "avg",
          label: this.nls.averageOption
        }, {
          value: "max",
          label: this.nls.maxOption
        },{
          value: "min",
          label: this.nls.minOption
        }];
        this._DEFAULT_CONFIG = {
          type: "",//"Features" Or "FeatureStatistics"
          fieldName: null,
          statisticsType: ""//this._STATISTICSTYPES[0].value
        };
        this.config = lang.mixin(this._DEFAULT_CONFIG, this.config);
        //featuresRadion && featureStatisticsRadion
        //init ui
        if(this.config.type === ""){
          this.config.type = "Features";
          this._setRadionBtnChecked(this.featuresRadion, true);
        }

        this.own(on(this.featuresRadion, 'change', lang.hitch(this, function (isChecked) {
          this._setRadionBtnChecked(this.featuresRadion, isChecked);
        })));
        this.own(on(this.featureStatisticsRadion, 'change', lang.hitch(this, function (isChecked) {
          this._setRadionBtnChecked(this.featureStatisticsRadion, isChecked);
        })));
        //field
        this.own(on(this.fieldSelect, 'change', lang.hitch(this, function (value) {
          if (this.config.fieldName === value) {
            return;
          }
          this.onSettingChange(
            lang.mixin(this.config, { fieldName: value })
          );
        })));
      },
      startup: function () {
        this.inherited(arguments);
        this.setConfig(this.config);
        this.refresh();
      },

      _setRadionBtnChecked: function (radionBtn, isChecked) {
        if (radionBtn && "undefined" !== typeof radionBtn.setChecked) {
          radionBtn.setChecked(isChecked);

          if (true === isChecked) {
            if (radionBtn.id === "Features") {
              html.addClass(this.countRadioBtn, "hide");
            } else if (radionBtn.id === "FeatureStatistics") {
              html.removeClass(this.countRadioBtn, "hide");
            }
            //this.config.dataSourceType = radionBtn.id;
            if (this.config.type === radionBtn.id) {
              return;
            } else {
              this.onSettingChange(
                lang.mixin(this.config, { type: radionBtn.id })
              );
            }
          }
        }
      },
      _getFieldsByType: function (/*dataSource*/) {
        var def = new Deferred();
        var fields = [];
        if (!this.dataSource || "undefined" === typeof this.dataSource.dataSourceType) {
          def.resolve(fields);
        } else if (this.dataSource.dataSourceType === 'DATA_SOURCE_FEATURE_LAYER_FROM_MAP') {
          var layerInfo = LayerInfos.getInstanceSync().getLayerInfoById(this.dataSource.layerId);
          if (layerInfo && layerInfo.getLayerObject()) {
            this.popupInfo = layerInfo.getPopupInfo();
            layerInfo.getLayerObject().then(lang.hitch(this, function (layerObject) {
              fields = layerObject.fields;
              def.resolve(this._getNumberFields(fields));
            }));
          } else {
            def.resolve(fields);
          }
        } else if (this.dataSource.dataSourceType === 'DATA_SOURCE_FROM_FRAMEWORK') {
          var dataSources = window.appConfig.dataSource.dataSources;//get form appConfig
          var ds = dataSources[this.dataSource.frameWorkDsId];
          fields = ds.dataSchema.fields;
          //remove groupby field
          if(ds.dataSchema.groupByFields && ds.dataSchema.groupByFields.length > 0){
            fields = array.filter(fields, function(f){
              return f.name !== ds.dataSchema.groupByFields[0];
            });
          }

          def.resolve(this._getNumberFields(fields));
        } else {
          def.resolve(fields);
        }
        return def;
      },

      _getNumberFields: function (fields) {
        var numberFieldTypes = [
          'esriFieldTypeSmallInteger',
          'esriFieldTypeInteger',
          'esriFieldTypeSingle',
          'esriFieldTypeDouble'
        ];
        return array.filter(fields, function (f) {
          return numberFieldTypes.indexOf(f.type) > -1;
        });
      },

      _getTypeInAppConfigByDataSourceType: function () {
        var dataSources = window.appConfig.dataSource.dataSources;
        var dataSource = dataSources[this.dataSource.frameWorkDsId];
        var type = "";
        if (dataSource.type) {
          type = dataSource.type;
        }
        return type;
      },

      onSettingChange: function (configObj) {
        this.config = lang.mixin(this.config, configObj);
        this.onChange(this.config);
      },
      onChange: function (config) {
        this.emit("change", config);
      },
      refresh: function () {
        this.onSettingChange({});
      },
      isValid: function () {
        var errorType = "";
        if ("" === this.config.type) {
          errorType = "dataFormat";
        }
        //valid in FeatureStatistics
        if (this.config.type !== "Features" && this.dataSource) {
          if ("" === this.config.fieldName || null === this.config.fieldName) {
            errorType = "field";
          } else if ("" === this.config.statisticsType) {
            errorType = "operation";
          }
        }

        if (errorType) {
          var message = new Message({
            message: this.nls.requiredFieldWarning + this.nls[errorType],
            buttons: [{
              label: this.nls.ok,
              onClick: lang.hitch(this, function () {
                message.content = null;
                message.close();
              })
            }]
          });

          return false;
        }

        return true;
      },
      getConfig: function () {
        if (this.isValid()) {
          return this.config;
        } else {
          return false;
        }
      },
      setDataSource: function (dataSourceObj) {
        if (!dataSourceObj || !this.config) {
          return;
        }

        this.dataSource = dataSourceObj;
        this._initUI();
      },
      setConfig: function (configObj) {
        if ("undefined" === typeof configObj || !this.dataSource) {
          return;
        }
        this.config = configObj;

        this._initUI();
      },

      _initUI: function () {
        if (this.config.type) {
          if (this.config.type === "Features") {
            this._setRadionBtnChecked(this.featuresRadion, true);
          } else if (this.config.type === "FeatureStatistics") {
            this._setRadionBtnChecked(this.featureStatisticsRadion, true);
          }
        }

        if (this.config.statisticsType) {
          this.operationSelect.set('value', this.config.statisticsType);
        }
        // if (this.dataSource.dataSourceType === 'DATA_SOURCE_FROM_FRAMEWORK') {
        //   if (window.appConfig.dataSource.dataSources[this.dataSource.frameWorkDsId].type === 'Features') {
        //     html.removeClass(this.operationNode, "hide");
        //   } else {
        //     html.addClass(this.operationNode, "hide");
        //   }
        // } else {
        //   html.removeClass(this.operationNode, "hide");
        // }
        //2 fields
        this._getFieldsByType().then(lang.hitch(this, function (fields) {
          this.fieldSelect.removeOption(this.fieldSelect.getOptions());

          var found = false;
          array.forEach(fields, lang.hitch(this, function (field) {
            var alias = igUtils.getFieldAliasByFieldInfo(field, this.popupInfo);
            this.fieldSelect.addOption({ value: field.name, label: alias });
            if (field.name === this.config.fieldName) {
              found = true;
            }
          }));

          var f;
          if (found) {
            f = this.config.fieldName;
          } else {
            if (fields[0] && "undefined" !== fields[0].name) {
              f = fields[0].name;
              this.config.fieldName = f;
            }
          }

          if (f) {
            this.fieldSelect.set('value', f);
          }
        }));
        //3 Operation
        this._initOperationSelect();
      },
      //statisticsType
      _initOperationSelect: function () {
        this.operationSelect.removeOption(this.operationSelect.getOptions());

        array.forEach(this._STATISTICSTYPES, lang.hitch(this, function (statisticsType) {
          this.operationSelect.addOption({ value: statisticsType.value, label: statisticsType.label });
        }));
        this.own(on(this.operationSelect, 'change', lang.hitch(this, function (value) {
          if (this.config.statisticsType === value) {
            return;
          }
          this.onSettingChange(
            lang.mixin(this.config, { statisticsType: value })
          );
        })));

        if (this.config.statisticsType === "") {
          this.operationSelect.set('value', this.operationSelect.getOptions()[0].value);
        } else {
          this.operationSelect.set('value', this.config.statisticsType);
        }
      }
    });
  });