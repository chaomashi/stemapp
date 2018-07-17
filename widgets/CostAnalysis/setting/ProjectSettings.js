///////////////////////////////////////////////////////////////////////////
// Copyright © 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'jimu/BaseWidget',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./ProjectSettings.html',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/_base/array',
  'dojo/Evented',
  'dojo/string',
  'esri/layers/FeatureLayer',
  'dojo/promise/all',
  'dojo/Deferred',
  'jimu/dijit/CheckBox'
], function (
  declare,
  BaseWidget,
  _WidgetsInTemplateMixin,
  template,
  lang,
  on,
  array,
  Evented,
  dojoString,
  FeatureLayer,
  all,
  Deferred
) {
  return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
    baseClass: 'jimu-widget-cost-analysis-project-settings',

    templateString: template,

    _configuredFieldsTable: null, // to store configured fields table
    _prevCostingGeometryLayerValue: "", // to store costing geometry layer previous value
    _prevProjectLayerValue: "", // to store project layer previous value
    _prevProjectAssetsTableValue: "", // to store project assets table previous value
    _prevProjectMultiplierTableValue: "", // to store project multiplier table value
    _defaultSelectOption: {}, // to store default select option
    //_configKeysArray: [], // to store config keys for configuration fields table
    _assetsTableRequiredFields: {}, // to store asset table required fields
    _multiplierTableRequiredFields: {}, // to store multiplier table required fields

    // GLOBAL METHODS
    // getConfig
    // validate

    constructor: function (options) {
      lang.mixin(this, options);
    },

    postMixInProperties: function () {
      this.nls.common = {};
      lang.mixin(this.nls.common, window.jimuNls.common);
    },

    postCreate: function () {
      this._configuredFieldsTable = null;
      this._prevCostingGeometryLayerValue = "";
      this._prevProjectLayerValue = "";
      this._prevProjectAssetsTableValue = "";
      this._prevProjectMultiplierTableValue = "";
      //this._configKeysArray = ["globalId", "name", "description", "totalCost", "grossCost"];
      //show help messages on help icon click
      this.own(on(this.costingGeometryHelp, "click", lang.hitch(this, function () {
        this.appUtils.showMessage(this.nls.projectSettings.costingGeometryHelp);
      })));
      this.own(on(this.fieldToLabelGeographyHelp, "click", lang.hitch(this, function () {
        this.appUtils.showMessage(this.nls.projectSettings.fieldToLabelGeographyHelp);
      })));
      this.own(on(this.projectAssetsTableHelp, "click", lang.hitch(this, function () {
        this.appUtils.showMessage(this.nls.projectSettings.projectAssetsTableHelp);
      })));
      this.own(on(this.projectMultiplierTableHelp, "click", lang.hitch(this, function () {
        this.appUtils.showMessage(this.nls.projectSettings.projectMultiplierTableHelp);
      })));
      this.own(on(this.projectLayerHelp, "click", lang.hitch(this, function () {
        this.appUtils.showMessage(this.nls.projectSettings.projectLayerHelp);
      })));
      // Init project asset table required fields with required data types
      this._assetsTableRequiredFields = {
        "ASSETGUID": ["esriFieldTypeGUID"],
        "COSTEQUATION": ["esriFieldTypeString"],
        "SCENARIO": ["esriFieldTypeString"],
        "TEMPLATENAME": ["esriFieldTypeString"],
        "GEOGRAPHYGUID": ["esriFieldTypeGUID"],
        "PROJECTGUID": ["esriFieldTypeGUID"]
      };
      // Init project multiplier table required fields with required data types
      this._multiplierTableRequiredFields = {
        "DESCRIPTION": ["esriFieldTypeString"],
        "TYPE": ["esriFieldTypeString"],
        "VALUE": ["esriFieldTypeDouble", "esriFieldTypeSingle"],
        "COSTINDEX": ["esriFieldTypeSmallInteger", "esriFieldTypeInteger"],
        "PROJECTGUID": ["esriFieldTypeGUID"]
      };
      this._defaultSelectOption = {
        "value": "",
        "label": this.nls.projectSettings.selectLabel
      };
      this.inherited(arguments);
      this._init();
    },

    /**
    * This function is to get project settings configuration
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    getConfig: function () {
      var config;
      config = {
        "costingGeometryLayer": this._prevCostingGeometryLayerValue,
        "geographyField": this.fieldToLabelGeography.value,
        "assetTable": this._prevProjectAssetsTableValue,
        "multiplierAdditionalCostTable": this._prevProjectMultiplierTableValue,
        "projectLayer": this._prevProjectLayerValue
      };
      return config;
    },

    /**
    * This function is to validate project settings configuration
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    validate: function () {
      var valid, errorMessage;
      valid = true;
      errorMessage = "";
      if ((this._prevProjectAssetsTableValue !== "" ||
        this._prevProjectMultiplierTableValue !== "" || this._prevProjectLayerValue !== "") &&
        (this._prevProjectAssetsTableValue === "" ||
          this._prevProjectMultiplierTableValue === "" || this._prevProjectLayerValue === "")) {
        var fieldArr = [];
        if (this._prevProjectAssetsTableValue === "") {
          fieldArr.push(this.nls.projectSettings.projectAssetsTableLabel);
        }
        if (this._prevProjectMultiplierTableValue === "") {
          fieldArr.push(this.nls.projectSettings.projectMultiplierTableLabel);
        }
        if (this._prevProjectLayerValue === "") {
          fieldArr.push(this.nls.projectSettings.projectLayerLabel);
        }
        fieldArr = fieldArr.join(" and ");
        valid = false;
        errorMessage = dojoString.substitute(
          this.nls.projectSettings.errorMessages.invalidConfiguration,
          { "fieldsString": lang.trim(fieldArr) });
      }
      return {
        "isValid": valid,
        "errorMessage": errorMessage
      };
    },

    /**
    * This function is to initialize project settings widget
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _init: function () {
      var operationalLayers, tables, deferredList;
      operationalLayers = []; tables = []; deferredList = [];
      if (this.map && this.map.itemInfo && this.map.itemInfo.itemData) {
        if (this.map.itemInfo.itemData.operationalLayers &&
          this.map.itemInfo.itemData.operationalLayers.length > 0) {
          // get operational layers from map
          operationalLayers = this.map.itemInfo.itemData.operationalLayers;
        }
        if (this.map.itemInfo.itemData.tables && this.map.itemInfo.itemData.tables.length > 0) {
          // get tables from map
          tables = this.map.itemInfo.itemData.tables;
        }
      }
      this._filterValidLayersForDropDown(operationalLayers);
      array.forEach(tables, lang.hitch(this, function (table) {
        var deferred = new Deferred();
        deferredList.push(deferred);
        var tableInfo = new FeatureLayer(table.url);
        // On table load as feature layer
        on(tableInfo, "load", lang.hitch(this, function (info) {
          array.forEach(this.map.itemInfo.itemData.tables,
            lang.hitch(this, function (currentTable) {
              if (currentTable.url === info.layer.url) {
                info.layer.id = currentTable.id;
                info.layer.title = currentTable.title;
                return true;
              }
            }));
          deferred.resolve(info.layer);
        }));
        on(tableInfo, "error", lang.hitch(this, function () {
          deferred.resolve(null);
        }));
      }));
      // When all deferred are resolved then populate tables options in dropdown
      all(deferredList).then(lang.hitch(this, function (tablesArray) {
        this._populateTablesForDropDown(tablesArray);
      }));
      // to handle geography label field change
      on(this.fieldToLabelGeography, "change", lang.hitch(this, function (value) {
        this.emit("onGeographyFieldChange", value, this.costingGeometryLayerDropDown.getValue());
      }));
      this._attachingEvents();
      this._setConfig();
    },

    /**
    * This function is to filter valid layers for dropdown
    * @param{array} contains operational layers
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _filterValidLayersForDropDown: function (layers) {
      var costingGeometryLayerOptions, projectLayerOptions, layerOptions;
      costingGeometryLayerOptions = [this._defaultSelectOption];
      projectLayerOptions = [this._defaultSelectOption];
      this._costingGeometryLayerFieldOptions = {
        "defaultSelectOption": {
          "options": [this._defaultSelectOption]
        }
      };
      // Check if map contains operational layers
      if (layers && layers.length > 0) {
        layerOptions = this._getLayerOptions(layers, costingGeometryLayerOptions,
          projectLayerOptions);
      } else {
        layerOptions = {
          "costingGeometryLayerOptions": costingGeometryLayerOptions,
          "projectLayerOptions": projectLayerOptions
        };
      }
      // Populate options in Layer Dropdowns
      this.costingGeometryLayerDropDown.set("options",
        lang.clone(layerOptions.costingGeometryLayerOptions));
      this.projectLayerDropDown.set("options", lang.clone(layerOptions.projectLayerOptions));
    },

    /**
    * This function is to filter valid layers for dropdown
    * @param{array} contains operational layers
    * @param{array} contains array with only select option
    * @param{array} contains array with only select option
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _getLayerOptions: function (layers, costingGeometryLayerOptions, projectLayerOptions) {
      var capabilities;
      array.forEach(layers, lang.hitch(this, function (layer) {
        if (layer.layerObject && layer.layerObject.capabilities) {
          capabilities = layer.layerObject.capabilities;
        } else {
          return true;
        }
        if (layer.layerObject.geometryType === "esriGeometryPolygon" &&
          capabilities.indexOf("Query") > -1 && this._hasGlobalIDField(layer)) {
          // create options for costing geometry layer
          costingGeometryLayerOptions.push({
            "value": layer.id,
            "label": layer.title
          });
          // create options for project layer
          if (layer.layerType === "ArcGISFeatureLayer" &&
            (capabilities.indexOf("Editing") > -1 || capabilities.indexOf("Update") > -1) &&
            capabilities.indexOf("Create") > -1 && capabilities.indexOf("Delete") > -1) {
            if (this._isValidProjectLayer(layer)) {
              projectLayerOptions.push({
                "value": layer.id,
                "label": layer.title
              });
            }
          }
        }
      }));
      return {
        "costingGeometryLayerOptions": costingGeometryLayerOptions,
        "projectLayerOptions": projectLayerOptions
      };
    },

    /**
    * This function is check a layer has
    * ProjectName, Description, TotalAssetCost, GrossProjectCost
    * @param {object} contains layer info
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _isValidProjectLayer: function (layer) {
      var layerFields, layerField, layerFieldName, layerFieldsArray, fieldTypesRequired, fieldType;
      fieldTypesRequired = ["esriFieldTypeDouble", "esriFieldTypeSingle"];
      layerFields = layer.layerObject.fields;
      layerFieldsArray = [];
      for (layerField in layerFields) {
        fieldType = layerFields[layerField].type;
        layerFieldName = layerFields[layerField].name.toUpperCase();
        if ((layerFieldName === "PROJECTNAME" && fieldType === "esriFieldTypeString") ||
          (layerFieldName === "DESCRIPTION" && fieldType === "esriFieldTypeString") ||
          (layerFieldName === "TOTALASSETCOST" && fieldTypesRequired.indexOf(fieldType) > -1) ||
          (layerFieldName === "GROSSPROJECTCOST" && fieldTypesRequired.indexOf(fieldType) > -1) ||
          (fieldType === "esriFieldTypeGlobalID")) {
          layerFieldsArray.push(layerFieldName);
        }
      }
      if (layerFieldsArray.length === 5) {
        return true;
      }
      return false;
    },

    /**
    * This function is check a layer has a Global Id field
    * @param {object} contains layer info
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _hasGlobalIDField: function (layer) {
      var fields, hasGlobalID;
      hasGlobalID = false;
      fields = layer.layerObject.fields || layer.fields;
      if (fields && fields.length > 0) {
        array.some(fields, lang.hitch(this, function (field) {
          if (field.type === "esriFieldTypeGlobalID") {
            hasGlobalID = true;
            return true;
          }
        }));
      }
      return hasGlobalID;
    },

    /**
    * This function is to filter tables for dropdown
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _populateTablesForDropDown: function (tables) {
      var projectAssetsOption, projectMultiplierOption;
      // Initialize table dropdown option with 'Select'
      projectAssetsOption = [this._defaultSelectOption];
      projectMultiplierOption = [this._defaultSelectOption];
      if (tables && tables.length > 0) {
        array.forEach(tables, lang.hitch(this, function (table) {
          if (table && this._isValidTable(table, "projectAssets")) {
            projectAssetsOption.push({
              "value": table.id || table.name,
              "label": table.title || table.name
            });
          }
          if (table && this._isValidTable(table, "projectMultiplier")) {
            projectMultiplierOption.push({
              "value": table.id || table.name,
              "label": table.title || table.name
            });
          }
        }));
      }
      // Populate options in Table Dropdowns
      this.projectAssetsTable.addOption(lang.clone(projectAssetsOption));
      this.projectMultiplierTable.addOption(lang.clone(projectMultiplierOption));
      this._setSelectedValuesInTables();
    },

    /**
    * This function is to filter tables for dropdown
    * @param {object} contains table info
    * @param {string} contains attribute table name
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _isValidTable: function (table, tableName) {
      var fields, isValidTable, fieldName, fieldArray = [];
      isValidTable = false;
      fields = table.fields;
      if (fields && fields.length > 0) {
        array.some(fields, lang.hitch(this, function (field) {
          fieldName = field.name.toUpperCase();
          if (tableName === "projectAssets" &&
            this._assetsTableRequiredFields[fieldName] &&
            this._assetsTableRequiredFields[fieldName].indexOf(field.type) > -1 &&
            !field.domain) {
            fieldArray.push(field.name);
            if (fieldArray.length ===
              Object.keys(this._assetsTableRequiredFields).length) {
              isValidTable = true;
              return true;
            }
          } else if (tableName === "projectMultiplier" &&
            this._multiplierTableRequiredFields[fieldName] &&
            this._multiplierTableRequiredFields[fieldName].indexOf(field.type) > -1 &&
            !field.domain) {
            fieldArray.push(field.name);
            if (fieldArray.length ===
              Object.keys(this._multiplierTableRequiredFields).length) {
              isValidTable = true;
              return true;
            }
          }
        }));
      }
      return isValidTable;
    },

    /**
    * This function is to set default values on application load for table dropdowns
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _setSelectedValuesInTables: function () {
      var prjAssetTable, prjMultiplierTable;
      // Set value for Asset Table Dropdown
      if (this.config.assetTable) {
        //if table is configured check if it exist in map
        prjAssetTable =
          this.layerInfosObj.getTableInfoById(this.config.assetTable);
        if (prjAssetTable && prjAssetTable.layerObject) {
          this.projectAssetsTable.set("value", this.config.assetTable);
          this._prevProjectAssetsTableValue = this.config.assetTable;
        } else {
          this.projectAssetsTable.set("value", "");
          this._prevProjectAssetsTableValue = "";
        }
      } else {
        this.projectAssetsTable.set("value", "");
        this._prevProjectAssetsTableValue = "";
      }
      // Set value for Multiplier Additional Cost Table Dropdown
      if (this.config.multiplierAdditionalCostTable) {
        //if table is configured check if it exist in map
        prjMultiplierTable =
          this.layerInfosObj.getTableInfoById(this.config.multiplierAdditionalCostTable);
        if (prjMultiplierTable && prjMultiplierTable.layerObject) {
          this.projectMultiplierTable.set("value", this.config.multiplierAdditionalCostTable);
          this._prevProjectMultiplierTableValue = this.config.multiplierAdditionalCostTable;
        } else {
          this.projectMultiplierTable.set("value", "");
          this._prevProjectMultiplierTableValue = "";
        }
      } else {
        this.projectMultiplierTable.set("value", "");
        this._prevProjectMultiplierTableValue = "";
      }
    },

    /**
    * This function is to set config values
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _setConfig: function () {
      var layer;
      if (this.config.costingGeometryLayer &&
        this.layerInfosObj.getLayerInfoById(this.config.costingGeometryLayer)) {
        layer = this.layerInfosObj.getLayerInfoById(this.config.costingGeometryLayer).layerObject;
      }
      // Set Costing Geometry Layer Dropdown
      if (layer) {
        this.costingGeometryLayerDropDown.set("value", this.config.costingGeometryLayer);
        this._prevCostingGeometryLayerValue = this.config.costingGeometryLayer;
        // create objects for costing geometry field option
        this._createCostingGeometryLayerFieldOptions(layer,
          this._costingGeometryLayerFieldOptions);
        this.fieldToLabelGeography.options = [];
        this.fieldToLabelGeography.options.length = 0;
        // Set Costing Geometry Fields options Dropdown
        if (this.config.geographyField) {
          this.fieldToLabelGeography.set("options",
            this._costingGeometryLayerFieldOptions[this.config.costingGeometryLayer].options);
          this.fieldToLabelGeography.set("disabled", false);
        } else {
          this.fieldToLabelGeography.set("options",
            this._costingGeometryLayerFieldOptions.defaultSelectOption.options);
          this.fieldToLabelGeography.set("disabled", true);
        }
      } else {
        this.costingGeometryLayerDropDown.set("value", "");
        this._prevCostingGeometryLayerValue = "";
        this.fieldToLabelGeography.set("options",
          this._costingGeometryLayerFieldOptions.defaultSelectOption.options);
        this.fieldToLabelGeography.set("disabled", true);
        this.fieldToLabelGeography.set("value", "");
      }
      // Set Project Layer Dropdown
      if (this.config.projectLayer &&
        this.projectLayerDropDown && this.projectLayerDropDown.options.length > 1) {
        this.projectLayerDropDown.set("value", this.config.projectLayer);
        this._prevProjectLayerValue = this.config.projectLayer;
      } else {
        this.projectLayerDropDown.set("value", "");
        this._prevProjectLayerValue = "";
      }
    },

    /**
    * This function is to attach event for Configured Fields Checkbox
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _attachingEvents: function () {
      // on change event of costing geometry layer dropdown
      this.own(on(this.costingGeometryLayerDropDown, "change", lang.hitch(this, function (value) {
        if (value !== this.costingGeometryLayerDropDown.value) {
          this.costingGeometryLayerDropDown.set("value", value);
        }
        if (value !== "" && !this._costingGeometryLayerFieldOptions[value]) {
          var layer = this.layerInfosObj.getLayerInfoById(value).layerObject;
          // create objects for costing geometry field option
          this._createCostingGeometryLayerFieldOptions(layer,
            this._costingGeometryLayerFieldOptions);
        }
        this._onDropdownChange(this.costingGeometryLayerDropDown, "costingGeometryLayer", "layer");
      })));
      // on change event of project layer dropdown
      this.own(on(this.projectLayerDropDown, "change", lang.hitch(this, function () {
        this._onDropdownChange(this.projectLayerDropDown, "projectLayer", "layer");
      })));
      // on change event of project assets table dropdown
      this.own(on(this.projectAssetsTable, "change", lang.hitch(this, function () {
        this._onDropdownChange(this.projectAssetsTable, "projectAssets", "table");
      })));
      // on change event of project assets table dropdown
      this.own(on(this.projectMultiplierTable, "change", lang.hitch(this, function () {
        this._onDropdownChange(this.projectMultiplierTable, "projectMultiplier", "table");
      })));
    },

    /**
    * This function is to handle layer change event
    * @param {select} contains dropdown element
    * @param {string} contains dropdown identifier
    * @param {string} contains dropdown type, either layer or table
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _onDropdownChange: function (dropdown, dropdownOf, dropdownType) {
      var validate;
      // Validate layer options
      if (dropdownType === "layer") {
        validate = this._validateDuplicateSelection(dropdown,
          this.projectLayerDropDown, this.costingGeometryLayerDropDown);
      } else {
        validate = this._validateDuplicateSelection(dropdown,
          this.projectAssetsTable, this.projectMultiplierTable);
      }
      // Set dropdown values
      if (validate) {
        this._setNewDropdownValue(dropdown, dropdownOf);
      } else {
        this._restorePreviousDropdownValue(dropdown, dropdownOf);
      }
    },

    /**
    * This function is to validate duplicate selection
    * @param {select} contains dropdown element
    * @param {select} contains dropdown element
    * @param {select} contains dropdown element
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _validateDuplicateSelection: function (dropdown, dropdown1, dropdown2) {
      var errorMessage;
      if (dropdown.value &&
        (dropdown1.value === dropdown2.value)) {
        errorMessage =
          dojoString.substitute(this.nls.projectSettings.errorMessages.duplicateLayerSelection,
            { "layerName": lang.trim(dropdown.tableNode.innerText) });
        this.emit("onDuplicateLayerSelect", errorMessage);
        return false;
      }
      return true;
    },

    /**
    * This function is to set new dropdown value
    * @param {select} contains dropdown element
    * @param {string} contains dropdown identifier
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _setNewDropdownValue: function (dropdown, dropdownOf) {
      switch (dropdownOf) {
        case "costingGeometryLayer":
          this._onCostingGeometryLayerDropDownChange();
          if (this._prevCostingGeometryLayerValue !== dropdown.value) {
            this.emit("onLayerSelected", {
              "lastSelectedId": this._prevCostingGeometryLayerValue,
              "currentSelectedLayerId": dropdown.value
            });
            //on layer change field is also changed so emit geography field changed event
            this.emit("onGeographyFieldChange", this.fieldToLabelGeography.get("value"),
              this.costingGeometryLayerDropDown.get("value"));
            this._prevCostingGeometryLayerValue = dropdown.value;
          }
          break;
        case "projectLayer":
          this._onProjectLayerDropDownChange();
          if (this._prevProjectLayerValue !== dropdown.value) {
            this.emit("onLayerSelected", {
              "lastSelectedId": this._prevProjectLayerValue,
              "currentSelectedLayerId": dropdown.value
            });
            this._prevProjectLayerValue = dropdown.value;
          }
          break;
        case "projectAssets":
          this._prevProjectAssetsTableValue = dropdown.value;
          break;
        case "projectMultiplier":
          this._prevProjectMultiplierTableValue = dropdown.value;
          break;
        default:
          break;
      }
    },

    /**
    * This function is to reset dropdown with previous value
    * @param {select} contains dropdown element
    * @param {string} contains dropdown identifier
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _restorePreviousDropdownValue: function (dropdown, dropdownOf) {
      switch (dropdownOf) {
        case "costingGeometryLayer":
          dropdown.set("value", this._prevCostingGeometryLayerValue);
          break;
        case "projectLayer":
          dropdown.set("value", this._prevProjectLayerValue);
          break;
        case "projectAssets":
          dropdown.set("value", this._prevProjectAssetsTableValue);
          break;
        case "projectMultiplier":
          dropdown.set("value", this._prevProjectMultiplierTableValue);
          break;
        default:
          break;
      }
    },

    /**
    * This function is to create options for Costing Geometry Layer Fields
    * @param{object} contains layer info
    * @param{object} contains layer's fields option for dropdown
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _createCostingGeometryLayerFieldOptions: function (layer, layerOptionsObject) {
      var validFieldTypes;
      validFieldTypes = ["esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeSingle",
        "esriFieldTypeDouble", "esriFieldTypeString"];
      if (layer && layer.fields && layer.fields.length > 0) {
        // Create and initialize options if it not created
        if (!layerOptionsObject[layer.id]) {
          layerOptionsObject[layer.id] = {};
          layerOptionsObject[layer.id].options = [];
        }
        // Create array of valid options to show in costing geometry layer dropdown
        array.forEach(layer.fields, lang.hitch(this, function (field) {
          if (validFieldTypes.indexOf(field.type) > -1) {
            layerOptionsObject[layer.id].options.push({
              "value": field.name,
              "label": field.alias ? field.alias : field.name
            });
          }
        }));
      } else {
        layerOptionsObject[layer.id].options.push([this._defaultSelectOption]);
      }
    },

    /**
    * This function contains on change functionality of Costing Geometry Layer DropDown
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _onCostingGeometryLayerDropDownChange: function () {
      var selectedField;
      this.fieldToLabelGeography.options = [];
      this.fieldToLabelGeography.options.length = 0;
      // get costing geometry layer
      selectedField = this.costingGeometryLayerDropDown.value;
      if (selectedField !== "") {
        // Set options for field to label geography
        this.fieldToLabelGeography.set("options",
          this._costingGeometryLayerFieldOptions[selectedField].options);
        this.fieldToLabelGeography.set("disabled", false);
      } else {
        // Set options for field to label geography
        this.fieldToLabelGeography.set("options",
          this._costingGeometryLayerFieldOptions.defaultSelectOption.options);
        this.fieldToLabelGeography.set("disabled", true);
      }
      // Set Costing Geometry Fields options Dropdown
      if (this.config.geographyField) {
        this.fieldToLabelGeography.set("value", this.config.geographyField, false);
      } else {
        this.fieldToLabelGeography.set("value", "", false);
      }
    },

    /**
    * This function is to add dropdowns for fields
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _onProjectLayerDropDownChange: function () {
      var projectLayerDropdownOptions, layer;
      // Initialize object
      projectLayerDropdownOptions = {
        "idFieldOptions": [this._defaultSelectOption],
        "stringFieldOptions": [this._defaultSelectOption],
        "costFieldOptions": [this._defaultSelectOption]
      };
      if (this.projectLayerDropDown.value) {
        layer = this.layerInfosObj.getLayerInfoById(this.projectLayerDropDown.value).layerObject;
        projectLayerDropdownOptions = this._getTableDropdownOptions(layer.fields,
          projectLayerDropdownOptions);
      }
    },

    /**
    * This function is to get dropdown options for fields
    * @param {array} contains fields of the layer
    * @param {object} contains dropdown options
    * @memberOf CostAnalysis/setting/ProjectSettings
    **/
    _getTableDropdownOptions: function (fields, projectLayerDropdownObject) {
      var idFieldTypeArray, integerFieldTypeArray, fieldOption;
      idFieldTypeArray = ["esriFieldTypeOID", "esriFieldTypeGlobalID"];
      integerFieldTypeArray = ["esriFieldTypeSmallInteger", "esriFieldTypeInteger",
        "esriFieldTypeSingle", "esriFieldTypeDouble"];
      array.forEach(fields, lang.hitch(this, function (field) {
        fieldOption = {
          "value": field.name,
          "label": field.alias ? field.alias : field.name
        };
        // filter field data type to create dropdown options
        if (idFieldTypeArray.indexOf(field.type) > -1) {
          projectLayerDropdownObject.idFieldOptions.push(fieldOption);
        } else if (integerFieldTypeArray.indexOf(field.type) > -1) {
          projectLayerDropdownObject.costFieldOptions.push(fieldOption);
        } else if (field.type === "esriFieldTypeString") {
          projectLayerDropdownObject.stringFieldOptions.push(fieldOption);
        }
      }));
      return projectLayerDropdownObject;
    }
  });
});
