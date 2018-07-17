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
  'dojo/Evented',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./CostingInfo.html',
  'dojo/on',
  'dojo/dom-construct',
  'dojo/_base/lang',
  'dojo/_base/array',
  './ManageScenarios',
  './CostingTemplate',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'dojo/Deferred',
  'dojo/string',
  'dojo/dom-class'
], function (
  declare,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  on,
  domConstruct,
  lang,
  array,
  ManageScenarios,
  CostingTemplate,
  Query,
  QueryTask,
  Deferred,
  String,
  domClass
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    _manageScenario: null,
    totalScenariosCollection: [],
    costingTemplate: {},
    _scenarioOptions: [],
    _geographyOptions: [],
    costingInfoData: {},
    baseClass: 'jimu-widget-cost-analysis-costing-info',

    constructor: function (options) {
      lang.mixin(this, options);
    },

    postMixInProperties: function () {
      this.nls.common = {};
      lang.mixin(this.nls.common, window.jimuNls.common);
    },

    postCreate: function () {
      this.costingTemplate = {};
      this._manageScenario = null;
      this.totalScenariosCollection = [];
      this._scenarioOptions = [];
      this._geographyOptions = [];
      this.costingInfoData = {};
      this.inherited(arguments);
      this._init();
      this.own(on(this.btnManageScenarios, 'click',
        lang.hitch(this, this._manageScenariosBtnClicked)));
    },

    /**
   * This function is used to validate costing info
   * @memberOf setting/CostingInfo
   */
    validate: function () {
      var isValidResult = this._validateCostingInfoTabData();
      if (isValidResult.isValid) {
        return {
          "isValid": true
        };
      }
      else {
        return {
          "isValid": false,
          "errorMessage": isValidResult.errorMessage
        };
      }

    },

    /**
    * This function is used to get costing tab user entered data
    * @memberOf setting/CostingInfo
    */
    getConfig: function () {

      return {
        "costingInfoData": this.costingInfoData,
        "scenarios": this.totalScenariosCollection
      };
    },

    _init: function () {
      this._geographyOptions = [{ "label": this.nls.costingInfo.noneValue, "value": "" }];
      // function to get geography values from project settings
      if (this.config.projectSettings &&
        this.config.projectSettings.costingGeometryLayer !== "" &&
        this.config.projectSettings.costingGeometryLayer !== undefined) {
        // handle deferred response
        this.getGeographyOptions().then(lang.hitch(this, function () {
          this._createCostingTemplate();
        }));
      } else {
        this._createCostingTemplate();
      }
    },

    /**
     * This function is used to create costing template
     * @memberOf CostAnalysis/setting/CostingInfo
     */
    _createCostingTemplate: function () {
      var operationalLayersArray, layerId, layersAdded = [];
      layersAdded = [
        this.config.projectSettings.costingGeometryLayer || "",
        this.config.projectSettings.projectLayer || ""
      ];
      //get scenario options
      this._getScenarioOptions(this.config.scenarios);
      operationalLayersArray = this.map.itemInfo.itemData.operationalLayers;
      this._showHideNoLayerMessage(operationalLayersArray.length);
      // to show operational editable layers only
      if (Object.keys(this.config.costingInfoSettings).length > 0) {
        for (layerId in this.config.costingInfoSettings) {
          var layerObj = this._getOperationalLayer(operationalLayersArray, layerId);
          if (layerObj && (!layerObj.errors || layerObj.errors.length <= 0)) {
            layersAdded.push(layerId);
            this._createCostingTemplateObj(layerObj);
          }
        }
      }
      array.forEach(operationalLayersArray,
        lang.hitch(this, function (currentLayer) {
          // condition to check if layer is editable and has assets in it
          if ((!currentLayer.errors || currentLayer.errors.length <= 0) &&
            this._checkEditCapabilities(currentLayer.layerObject) &&
            layersAdded.indexOf(currentLayer.id) === -1) {

            if (currentLayer.layerObject.templates.length) {
              this._createCostingTemplateObj(currentLayer);
            }
            else if (currentLayer.layerObject.types.length) {
              this._createCostingTemplateObj(currentLayer);
            }
          }
        }));
    },

    /**
    * This function is used to create costing template instances
    * @memberOf CostAnalysis/setting/CostingInfo
    */
    _createCostingTemplateObj: function (currentLayer) {
      this.costingTemplate[currentLayer.id] = new CostingTemplate({
        nls: this.nls,
        map: this.map,
        config: this.config,
        layer: currentLayer,
        scenarios: this._scenarioOptions,
        geographies: this._geographyOptions
      }, domConstruct.create("div", {}, this.costingTemplateContainer));
    },

    /**
     * This function is used to create costing template instances
     * @memberOf CostAnalysis/setting/CostingInfo
     */
    _getOperationalLayer: function (operationalLayersArray, layerId) {
      var layerObj;
      array.some(operationalLayersArray, lang.hitch(this, function (layer) {
        if (layer.id === layerId) {
          layerObj = layer;
          return true;
        }
      }));
      return layerObj;
    },

    /**
     * This function is used to handle click event of ManageScenario
     * @memberOf CostAnalysis/setting/CostingInfo
     */
    _manageScenariosBtnClicked: function () {
      this._manageScenario = new ManageScenarios({
        nls: this.nls,
        map: this.map,
        config: this.config,
        existingScenarios: this.totalScenariosCollection
      });
      on(this._manageScenario, "okButtonClicked", lang.hitch(this,
        function (manageScenariosOptions) {
          this._manageScenario.destroy();
          this._getScenarioOptions(manageScenariosOptions);
        }));
    },

    /**
    * This function is used to checks layer's edit capabilities if layer is not editable
    * @param {object} currentLayer: current layer object
    * @memberOf setting/CostingInfo
    */
    _checkEditCapabilities: function (currentLayer) {
      //Check if layer is editable and it has valid global id field
      if (currentLayer && currentLayer.capabilities && currentLayer.capabilities.indexOf("Delete") !== -1 &&
        currentLayer.capabilities.indexOf("Create") !== -1 &&
        currentLayer.capabilities.indexOf("Update") !== -1 && currentLayer.globalIdField) {
        return true;
      }
      else {
        return false;
      }
    },

    /**
    * This function is used to format scenario drop-down options
    * @memberOf setting/CostingInfo
    */
    _getScenarioOptions: function (scenarios) {
      var fieldName, costingLayerTemplate;
      //empty scenario options array
      this._scenarioOptions = [{ "label": this.nls.costingInfo.noneValue, "value": "" }];
      this.totalScenariosCollection = [];
      array.forEach(scenarios, lang.hitch(this, function (scenario) {
        if (typeof scenario === "object") {
          fieldName = scenario.field;
        } else {
          fieldName = scenario;
        }
        //to add scenario options
        this._scenarioOptions.push({ "label": fieldName, value: fieldName });
        this.totalScenariosCollection.push(fieldName);
      }));
      for (costingLayerTemplate in this.costingTemplate) {
        this.costingTemplate[costingLayerTemplate].updateScenarioOptions(this._scenarioOptions);
      }
    },

    /**
   * This function is used to fetch values of geography
   * @memberOf setting/CostingInfo
   */
    getGeographyOptions: function (geographyField, costingGeometryLayer) {
      var costingGeographyLayer,
        geographyDef,
        queryTask,
        query;
      geographyDef = new Deferred();
      if (!costingGeometryLayer) {
        geographyField = this.config.projectSettings.geographyField;
        costingGeometryLayer = this.config.projectSettings.costingGeometryLayer;
      }
      //If no layer is selected or configured layer not found in map, then remove all the options and show "Select"
      if (costingGeometryLayer === "" ||
        !this.layerInfosObj.getLayerInfoById(costingGeometryLayer)) {
        this._geographyOptions = [];
        this._geographyOptions.push({ "label": this.nls.costingInfo.noneValue, "value": "" });
        geographyDef.resolve(this._geographyOptions);
      } else {
        //If layer is selected then query for geography field
        costingGeographyLayer = this.map._layers[costingGeometryLayer];
        queryTask = new QueryTask(costingGeographyLayer.url);
        query = new Query();
        query.outFields = [geographyField];
        query.returnDistinctValues = true;
        query.returnGeometry = false;
        query.where = "1=1";
        // query execution with Deferred
        queryTask.execute(query, lang.hitch(this, function (response) {
          this._geographyQueryTaskComplete(response, geographyField);
          geographyDef.resolve(this._geographyOptions);
        }), lang.hitch(this, function () {
          this._geographyOptions = [];
          this._geographyOptions.push({ "label": this.nls.costingInfo.noneValue, "value": "" });
          geographyDef.resolve(this._geographyOptions);
        }));
      }
      return geographyDef.promise;
    },

    /**
   * This function is used to handle geography query success
   * @memberOf setting/CostingInfo
   */
    _geographyQueryTaskComplete: function (response, geographyField) {
      this._geographyOptions = [{ "label": this.nls.costingInfo.noneValue, "value": "" }];
      array.forEach(response.features,
        lang.hitch(this, function (currentFeature) {
          if (currentFeature.attributes[geographyField] !== "" &&
            currentFeature.attributes[geographyField] !== null) {
            this._geographyOptions.push({
              label: isNaN(currentFeature.attributes[geographyField]) ?
                currentFeature.attributes[geographyField] :
                currentFeature.attributes[geographyField].toString(),
              value: currentFeature.attributes[geographyField]
            });
          }
        }));
    },

    /**
    * This function is used to validate costing info tab data
    * @memberOf setting/CostingInfo
    */
    _validateCostingInfoTabData: function () {
      var layer, costingInfoLayer, layerWidget, layerWidgetLen,
        nextWidgetIndex, layerAssetEntry, defaultTemplatesArray, uniqueTemplateNamesArray;
      this.costingInfoData = {};
      // to traverse costing template for specific layer
      for (layer in this.costingTemplate) {
        defaultTemplatesArray = []; uniqueTemplateNamesArray = [];
        if (this.costingTemplate[layer]) {
          this.costingInfoData[layer] = this.costingTemplate[layer].getUpdatedCostingInfo();
          layerWidgetLen = this.costingInfoData[layer].length;
          // to traverse costing template array of specific layer
          for (costingInfoLayer in this.costingInfoData[layer]) {
            layerAssetEntry = this.costingInfoData[layer][costingInfoLayer];
            if (uniqueTemplateNamesArray.indexOf(layerAssetEntry.featureTemplate) === -1) {
              uniqueTemplateNamesArray.push(layerAssetEntry.featureTemplate);
            }
            // to check default cost equation exists or not
            if ((layerAssetEntry.scenario === "") &&
              (layerAssetEntry.geography === "")) {
              if (defaultTemplatesArray.indexOf(layerAssetEntry.featureTemplate) === -1) {
                defaultTemplatesArray.push(layerAssetEntry.featureTemplate);
              }
            }
            // condition to check if valid cost equation is configured
            if (!this.costingTemplate[layer].validateCostEquation(layerAssetEntry.costEquation)) {
              return {
                isValid: false,
                errorMessage: String.substitute(this.nls.costingInfo.requiredCostEquation,
                  {
                    templateName: layerAssetEntry.featureTemplate,
                    layerName: this.costingTemplate[layer].layer.title
                  })
              };
            }
            // loop to check duplicate template entries
            if (layerWidgetLen > 1) {
              nextWidgetIndex = (parseInt(costingInfoLayer, 0) + 1);
              for (layerWidget = nextWidgetIndex; layerWidget < layerWidgetLen;
                layerWidget++) {
                var currentWidget;
                currentWidget = this.costingInfoData[layer][layerWidget];
                if ((layerAssetEntry.featureTemplate === currentWidget.featureTemplate) &&
                  (layerAssetEntry.scenario === currentWidget.scenario) &&
                  (layerAssetEntry.geography === currentWidget.geography)) {
                  return {
                    isValid: false,
                    errorMessage: String.substitute(
                      this.nls.costingInfo.duplicateTemplateMessage,
                      {
                        layerName: this.costingTemplate[layer].layer.title,
                        templateName: layerAssetEntry.featureTemplate
                      })
                  };
                }
              }
            }// end of loop to traverse duplicates
          }
          // validation for no default equation
          var featureTemplate = 0, uniqueTemplateNamesArrayLen;
          uniqueTemplateNamesArrayLen = uniqueTemplateNamesArray.length;
          for (featureTemplate; featureTemplate < uniqueTemplateNamesArrayLen; featureTemplate++) {
            if (defaultTemplatesArray.indexOf(uniqueTemplateNamesArray[featureTemplate]) === -1) {
              return {
                isValid: false,
                errorMessage: String.substitute(this.nls.costingInfo.defaultEquationRequired,
                  {
                    templateName: uniqueTemplateNamesArray[featureTemplate],
                    layerName: this.costingTemplate[layer].layer.title
                  })
              };
            }
          }
          // validation not to allow empty layer
          if (this.costingInfoData[layer].length === 0) {
            return {
              isValid: false,
              errorMessage: String.substitute(this.nls.costingInfo.noTemplateAvailable,
                { layerName: this.costingTemplate[layer].layer.title })
            };
          }
        }
      }
      if (!Object.keys(this.costingInfoData).length) {
        return {
          isValid: false,
          errorMessage: String.substitute(this.nls.costingInfo.noLayerMessage,
            { tabName: this.nls.costingInfo.tabTitle })
        };
      }
      return { isValid: true };
    },

    /**
    * This function is used to update costing info tab data
    * @memberOf setting/CostingInfo
    */
    _updateCostingInfoTable: function (updatedRowDetails) {
      var layerId, newLayerId;
      if (updatedRowDetails.layerId) {
        layerId = updatedRowDetails.layerId;
      }
      else {
        newLayerId = updatedRowDetails.lastSelectedId;
        layerId = updatedRowDetails.currentSelectedLayerId;
      }
      if (Object.keys(updatedRowDetails).length) {
        if (newLayerId) {
          // to delete current selected row
          if (this.costingTemplate[layerId]) {
            this._deleteCostingInfoLayer(layerId);
          }
          // to add new last selected row
          if (newLayerId) {
            this._addCostingInfoLayer(newLayerId);
          }
        }
        else {
          if (!updatedRowDetails.editable) {
            // to destroy non editable layer widget from costing info tab and delete from config
            if (this.costingTemplate[layerId]) {
              this._deleteCostingInfoLayer(layerId);
            }
          }
          else {
            this._addCostingInfoLayer(layerId);
          }
        }
      }
      this._showHideNoLayerMessage(Object.keys(this.costingTemplate).length);
    },

    /**
    * This function is used to show and hide no layer message
    * @memberOf setting/CostingInfo
    */
    _showHideNoLayerMessage: function (length) {
      if (length === 0) {
        domClass.remove(this.noEditableLayersAvailable,
          "esriCTHidden");
      }
      else {
        domClass.add(this.noEditableLayersAvailable,
          "esriCTHidden");
      }
    },

    /**
    * This function is used to delete current selected Project setting
    * Costing Geometry Layer
    * @memberOf setting/CostingInfo
    */
    _deleteCostingInfoLayer: function (layerId) {
      this.costingTemplate[layerId].destroyRecursive();
      delete this.costingTemplate[layerId];
      delete this.config.costingInfoSettings[layerId];
    },

    /**
    * This function is used to add last selected Project setting
    * Costing Geometry Layer
    * @memberOf setting/CostingInfo
    */
    _addCostingInfoLayer: function (newLayerId) {
      // to add new editable layer widget
      var operationalLayersSet;
      operationalLayersSet = this.map.itemInfo.itemData.operationalLayers;
      // code for updating (add editable) layer settings layer in costing tab
      array.some(operationalLayersSet, lang.hitch(this, function (operationalLayerItem) {
        if (newLayerId === operationalLayerItem.id &&
          this._checkEditCapabilities(operationalLayerItem.layerObject)) {
          this._createCostingTemplateObj(operationalLayerItem);
          return true;
        }
      }));
    },

    /**
    * This function is used to call update geography drop-down on change of
    * project setting geography field
    * @memberOf setting/CostingInfo
    */
    onGeographyFieldUpdate: function (geographyOptions) {
      var costingLayerTemplate;
      for (costingLayerTemplate in this.costingTemplate) {
        this.costingTemplate[costingLayerTemplate].
          updateGeographyOptions(geographyOptions);
      }
    }
  });
});