///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
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
  'jimu/FilterManager',
  'dojo/Evented',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./work-bench.html',
  'dojo/_base/lang',
  'dojo/dom-attr',
  'dojo/_base/array',
  'dojo/dom-class',
  'dojo/on',
  'esri/graphic',
  'dojo/dom-construct',
  'dojo/Deferred',
  'dojo/promise/all',
  'esri/layers/FeatureLayer',
  'esri/tasks/GeometryService',
  'esri/graphicsUtils',
  './template-picker',
  './project-overview',
  './project-summary',
  './asset-details'
], function (
  declare,
  BaseWidget,
  FilterManager,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  lang,
  domAttr,
  array,
  domClass,
  on,
  Graphic,
  domConstruct,
  Deferred,
  all,
  FeatureLayer,
  GeometryService,
  graphicsUtils,
  TemplatePicker,
  ProjectOverview,
  ProjectSummary,
  AssetDetails
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    baseClass: 'jimu-widget-cost-analysis-work-bench',
    _projectOverview: null,
    _projectSummary: null,
    _assetItemSummary: {},
    _assetGroupSummary: {},
    _assetTableIds: {},
    _recentlyOperatedLayerIds: [],
    _projectAssetTable: null,
    _additionalCostTable: null,
    _assetInfoForReset: {},
    filterManager: null,

    postCreate: function () {
      this.inherited(arguments);
      //Initialize array's and object
      this._assetItemSummary = {};
      this._assetGroupSummary = {};
      this._assetTableIds = {};
      this._recentlyOperatedLayerIds = [];
      this._assetInfoForReset = {};
      this.filterManager = FilterManager.getInstance();
    },

    /**
     * Called once widget is activated
     * @memberOf widgets/CostAnalysis/work-bench
     */
    onWidgetActive: function () {
      if (this._templatePicker) {
        this._templatePicker.bindLayerEvents();
      }
    },

    /**
     * Called once widget is deactivated
     * @memberOf widgets/CostAnalysis/work-bench
     */
    onWidgetDeActive: function () {
      //deactivate drawing/editing options once widget is deactivated
      if (this._templatePicker && this._templatePicker._editor &&
        this._templatePicker._editor.editToolbar) {
        this._templatePicker._editor.templatePicker.clearSelection();
        this._templatePicker._editor.editToolbar.deactivate();
        this._templatePicker.removeLayerEvents();
      }
    },

    /**
     * Called whenever user is navigated to workbench panel
     * @memberOf widgets/CostAnalysis/work-bench
     */
    onShow: function () {
      this.refreshTemplatePicker();
    },

    /**
     * Called once widget is open
     * @memberOf widgets/CostAnalysis/work-bench
     */
    onWidgetOpen: function () {
      this.refreshTemplatePicker();
      //If minimal configuration filter asset layers to show only newly added assets
      if (!this.config.projectSettings.projectLayer) {
        this._recentlyOperatedLayerIds = [];
        this._filterAssets();
      }
    },

    /**
     * Called once widget is closed
     * @memberOf widgets/CostAnalysis/work-bench
     */
    onWidgetClose: function () {
      //On widget close clear applied filters in case of minimal configuration.
      //so that user can see all the features on map
      if (!this.config.projectSettings.projectLayer) {
        this._clearAppliedFilters();
      }
    },

    /**
     * Resizes template picker to show in available widget panel
     * @memberOf widgets/CostAnalysis/work-bench
     */
    refreshTemplatePicker: function () {
      if (this._templatePicker) {
        this._templatePicker.onWindowResize();
      }
    },

    startup: function () {
      this.inherited(arguments);
      if (!this.config.projectSettings.projectLayer) {
        domAttr.set(this.refreshButton, "innerHTML", this.nls.common.reset);
        domClass.add(this.backButton, "esriCTHidden");
      } else {
        this.own(on(this.backButton, "click", lang.hitch(this, function () {
          if (!domClass.contains(this.backButton, "jimu-state-disabled")) {
            //clears applied filters on asset and project layer
            this._clearAppliedFilters();
            //disable editor and template picker
            this._templatePicker.destroy();
            this._templatePicker = null;
            //enable infoWindow
            this._enableWebMapPopup();
            this.emit("showProjectPanel");
          }
        })));
      }

      this.own(on(this.refreshButton, "click", lang.hitch(this, function () {
        //clears applied filters on asset and project layer
        this._clearAppliedFilters();
        //disable editor and template picker
        this._templatePicker.destroy();
        this._templatePicker = null;
        //if project layer is configured reload else reset(minimal configuration)
        if (this.projectInfo.projectId && this.config.projectSettings.projectLayer) {
          this.emit("reloadProject", this.projectInfo.projectId);
        } else {
          this._resetProject();
        }
      })));
      this.onProjectCreateOrLoad(this.projectInfo, this.assetInfo);
    },

    /**
     * In minimal configuration reset project will first delete all the user added assets
     * and then clear all the details in widget panel.
     * @memberOf widgets/CostAnalysis/work-bench
     */
    _resetProject: function () {
      var deferredList = [], layerId;
      this.loadingIndicator.show();
      //Delete assets from layer
      if (this._assetInfoForReset && Object.keys(this._assetInfoForReset).length > 0) {
        for (layerId in this._assetInfoForReset) {
          var layer, queryString;
          layer = this.layerInfosObj.getLayerInfoById(layerId).layerObject;
          queryString = layer.globalIdField +
            " in ('" + this._assetInfoForReset[layerId].join("','") + "')";
          deferredList.push(this.appUtils.deleteFeatures(layer.url, queryString));
        }
      }
      all(deferredList).then(lang.hitch(this, function () {
        this.loadingIndicator.hide();
        this._assetInfoForReset = {};
        this.onProjectCreateOrLoad(this.projectInfo, this.assetInfo);
        this.emit("resetProject");
      }), lang.hitch(this, function () {
        this.loadingIndicator.hide();
      }));
    },
    /**
     * Function clears filters applied on project layer and asset layers
     */
    _clearAppliedFilters: function () {
      //clear filters on project layer if it is configured
      if (this.config.projectSettings.projectLayer) {
        this.filterManager.applyWidgetFilter(this.config.projectSettings.projectLayer,
          this.widgetId, "", true, true);
      }
      //clear filters on asset layers
      this._recentlyOperatedLayerIds = []; //empty this array to filter all the asset layers
      //Refresh all asset layers so that deleted assets should be removed from map
      array.forEach(this.config.layerSettings, lang.hitch(this, function (assetLayer) {
        var layer;
        layer = this.layerInfosObj.getLayerInfoById(assetLayer.id);
        if (assetLayer.editable && layer && layer.layerObject) {
          layer.layerObject.clearSelection();
        }
      }));
      this._filterAssets(true);
    },

    /**
     * This function creates feature layer instance for project asset table
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _loadProjectAssetTable: function () {
      var def = new Deferred();
      //If instance of asset table if configured
      if (this.config.projectSettings.assetTable && !this._projectAssetTable) {
        var assetTable;
        assetTable =
          this.layerInfosObj.getTableInfoById(this.config.projectSettings.assetTable).layerObject;
        this._projectAssetTable = new FeatureLayer(assetTable.url);
        this.own(on(this._projectAssetTable, "load", function () {
          def.resolve();
        }));
      } else {
        def.resolve();
      }
      return def.promise;
    },

    /**
     * This function creates feature layer instance for additional cost table
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _loadAdditionalCostTable: function () {
      var additionalCostTableId, url, def;
      def = new Deferred();
      additionalCostTableId = this.config.projectSettings.multiplierAdditionalCostTable;
      if (additionalCostTableId && !this._additionalCostTable) {
        url = this.layerInfosObj.getTableInfoById(additionalCostTableId).layerObject.url;
        this._additionalCostTable = new FeatureLayer(url);
        this.own(on(this._additionalCostTable, "load", function () {
          def.resolve();
        }));
      } else {
        def.resolve();
      }
      return def.promise;
    },

    /**
     * Callback called once project is created or loaded.
     * This function will init all workbench components.
     * @memberOf widgets/CostAnalysis/work-bench
     */
    onProjectCreateOrLoad: function (projectInfo, assetInfo) {
      var layersDeferredList = [];
      layersDeferredList.push(this._loadProjectAssetTable());
      layersDeferredList.push(this._loadAdditionalCostTable());
      //after loading all the required tables and layers
      all(layersDeferredList).then(lang.hitch(this, function () {
        var exp, projectLayer, projectLayerId;
        this.projectInfo = projectInfo;
        this._recentlyOperatedLayerIds = [];
        this._assetTableIds = {};
        this._assetItemSummary = {};
        this._assetGroupSummary = {};
        //disable webmap popup
        this._disableWebMapPopup();
        //init workbench components like templatePicker, projectOverview etc.
        this.initWorkBenchComponents().then(lang.hitch(this, function () {
          //filter project layer to show only selected layers boundary on map
          projectLayerId = this.config.projectSettings.projectLayer;
          if (this.projectInfo.projectId && projectLayerId) {
            projectLayer = this.layerInfosObj.getLayerInfoById(projectLayerId).layerObject;
            exp = projectLayer.globalIdField + "= '" + this.projectInfo.projectId + "'";
            this.filterManager.applyWidgetFilter(projectLayerId, this.widgetId, exp, true, true);
          }
          //empty project asset summary
          if (this._projectOverview) {
            this._projectOverview.showAssetItemSummary(this._assetItemSummary, false);
          }
          //reset asset details panel info
          if (this._assetDetails) {
            this._assetDetails.reset();
          }
          //if has assetInfo means widget is in load project mode,
          //else filter asset layers
          if (assetInfo) {
            this.loadProject(assetInfo);
          } else {
            //filter asset layer to show assets of only current project
            this._filterAssets();
          }
        }));
      }));
    },

    /**
     * Loads project info in and sets the widgets environment to show loaded projects details.
     * @memberOf widgets/CostAnalysis/work-bench
     */
    loadProject: function (assetInfo) {
      var allFeatures = [];
      //first raise the flag saying widget is in loading mode
      this._projectSummary.loadingProject = true;
      //load additional cost info
      this._projectSummary.loadAdditionalCost(assetInfo.additionalCostInfo);
      //load each asset
      for (var layerId in assetInfo.assetInfo) {
        var features = assetInfo.assetInfo[layerId];
        var layer = this.layerInfosObj.getLayerInfoById(layerId).layerObject;
        allFeatures = allFeatures.concat(features);
        this._loadAsset(layer, features, assetInfo, layerId);
      }
      this._setExtentToProjectAssets(allFeatures);
      //Empty the recently operated layer array
      //So that after loading all the asset appropriate filters will be applied on all asset layers.
      this._recentlyOperatedLayerIds = [];
      this._onAssetInfoUpdate();
      this._projectSummary.loadingProject = false;
      this._projectSummary.calculateGrossCost(this._projectSummary.totalCost, false);
    },

    /**
     * Loads each individual asset on map in load project workflow
     * @memberOf widgets/CostAnalysis/work-bench
     */
    _loadAsset: function (layer, features, assetInfo, layerId) {
      array.forEach(features, lang.hitch(this, function (feature) {
        var assetGUID = feature.attributes[layer.globalIdField];
        var templateInfo = assetInfo.assetTemplateInfo[assetGUID];
        feature.templateInfo = templateInfo;
        feature.templateName = templateInfo.TEMPLATENAME;
        this._templatePicker.loadCostingInfo(layerId, templateInfo);
        this._assetTableIds[assetGUID] = templateInfo.OBJECTID;
        this._onFeaturesAdded([feature], layer, [templateInfo], false);
      }));
    },

    /**
     * This function will set the map's extent to the graphics of the current project
     */
    _setExtentToProjectAssets: function (features) {
      //If mergedGraphics array has feature then set extent
      if (features.length > 0) {
        this.map.setExtent(
          graphicsUtils.graphicsExtent(features).expand(1.5));
      }
    },

    /**
    * Initialize work bench panel components
    * @memberOf widgets/CostAnalysis/work-bench
    */
    initWorkBenchComponents: function () {
      var def = new Deferred();
      this._initTemplatePicker();
      this._initProjectSummary();
      this._initProjectOverview();
      this._initAssetDetails(def);
      return def.promise;
    },

    /**
    * Initialize template picker
    * @memberOf widgets/CostAnalysis/work-bench
    */
    _initTemplatePicker: function () {
      var templatePickerNode = domConstruct.create("div", {}, this.templatePickerContainer);
      this._templatePicker = new TemplatePicker({
        config: this.config,
        nls: this.nls,
        layerInfosObj: this.layerInfosObj,
        loadingIndicator: this.loadingIndicator,
        projectInfo: this.projectInfo,
        map: this.map
      }, templatePickerNode);
      on(this._templatePicker, "assetAdded",
        lang.hitch(this, function (features, layer, templateInfoArray) {
          if (features.length > 0 && templateInfoArray.length > 0) {
            this._hideWebMapPopup();
            this._onFeaturesAdded(features, layer, templateInfoArray, true);
            this._onAssetInfoUpdate();
          }
        }));
      on(this._templatePicker, "assetDeleted", lang.hitch(this, function (features, layer) {
        var recentlyDeletedFeatures, queryString;
        this._hideWebMapPopup();
        recentlyDeletedFeatures = this._getGlobalIds(layer.globalIdField, features);
        this._onFeaturesUpdated(features);
        this._onAssetInfoUpdate();
        //remove the deleted assets guid from assetTableIds array
        array.forEach(recentlyDeletedFeatures, lang.hitch(this, function (assetGUID) {
          if (this._assetTableIds.hasOwnProperty(assetGUID)) {
            delete this._assetTableIds[assetGUID];
          }
          //remove deleted asset GUID from array _assetInfoForReset
          if (this._assetInfoForReset && this._assetInfoForReset[layer.id]) {
            var assetInDeleteArray = this._assetInfoForReset[layer.id].indexOf(assetGUID);
            if (assetInDeleteArray > -1) {
              this._assetInfoForReset[layer.id].splice(assetInDeleteArray, 1);
            }
          }
        }));
        //If project asset table is configured, delete selected feature
        if (this._projectAssetTable) {
          queryString = this.config.assetTableFields.ASSETGUID +
            " in ('" + recentlyDeletedFeatures.join("','") + "')";
          this.appUtils.deleteFeatures(this._projectAssetTable.url, queryString);
        }
      }));
      on(this._templatePicker, "assetUpdated", lang.hitch(this, function (features) {
        this._hideWebMapPopup();
        this._onFeaturesUpdated(features, true);
        this._onAssetInfoUpdate();
      }));
      this._templatePicker.startup();
    },

    /**
    * Initialize Project summary
    * @memberOf widgets/CostAnalysis/Widget
    */
    _initProjectSummary: function () {
      if (!this._projectSummary) {
        this._projectSummary = new ProjectSummary({
          nls: this.nls,
          map: this.map,
          config: this.config,
          appUtils: this.appUtils,
          layerInfosObj: this.layerInfosObj,
          projectInfo: this.projectInfo,
          additionalCostTable: this._additionalCostTable
        }, domConstruct.create("div", {}, this.projectSummaryDiv));
        this.own(on(this._projectSummary, "grossCostUpdated",
          lang.hitch(this, function (totalCost, grossCost, additionalCostInfo) {
            //Update the calculated gross cost in layer
            this._projectOverview.grossCostUpdated(grossCost);
            //Update the calculated gross details in asset details panel
            this._assetDetails.grossCostUpdated(totalCost, grossCost, additionalCostInfo);
          })));
        this.own(on(this._projectSummary, "onOkButtonClicked", lang.hitch(this, function () {
          this.emit("showAssetDetails");
        })));
        this.own(on(this._projectSummary, "onCancelButtonClicked", lang.hitch(this, function () {
          this.emit("showAssetDetails");
        })));
        this._projectSummary.startup();
      } else {
        this._projectSummary.reset(this.projectInfo);
      }
    },

    /**
    * Initialize project overview
    * @memberOf widgets/CostAnalysis/work-bench
    */
    _initProjectOverview: function () {
      if (!this._projectOverview) {
        this._projectOverview = new ProjectOverview({
          config: this.config,
          appUtils: this.appUtils,
          nls: this.nls,
          map: this.map,
          layerInfosObj: this.layerInfosObj,
          geometryService: new GeometryService(this.config.helperServices.geometry.url),
          projectInfo: this.projectInfo
        }, domConstruct.create("div", {}, this.projectOverview));
        this.own(on(this._projectOverview, "actionClicked", lang.hitch(this,
          function (selectedIndex) {
            this.emit("actionClicked", selectedIndex);
          })));
        this.own(on(this._projectOverview, "titleClicked", lang.hitch(this,
          function (selectedIndex) {
            this.emit("titleClicked", selectedIndex);
          })));
        this.own(on(this._projectOverview, "totalCostCalculated", lang.hitch(this,
          function (totalCost) {
            //Update calculated total cost in asset details and add cost escalation panel
            this._assetDetails.totalCostUpdated(totalCost);
            //Based on the calculated total cost calculate the gross cost
            this._projectSummary.calculateGrossCost(totalCost, true);
          })));
        this._projectOverview.startup();
      } else {
        this._projectOverview.updateProjectInfo(this.projectInfo);
      }
    },

    /**
     * Initialize Asset Details
     * @memberOf widgets/CostAnalysis/work-bench
     */
    _initAssetDetails: function (def) {
      if (!this._assetDetails) {
        this._assetDetails = new AssetDetails({
          nls: this.nls,
          map: this.map,
          config: this.config,
          appUtils: this.appUtils,
          layerInfosObj: this.layerInfosObj
        }, domConstruct.create("div", {}, this.assetDetailsDiv));
        this.own(on(this._assetDetails, "showAdditionalCost", lang.hitch(this, function () {
          //On opening the additional cost panel clone table data so that table will be filled
          if (this._projectSummary) {
            this._projectSummary.cloneTableData();
          }
          this.emit("showAdditionalCost");
        })));
        this.own(on(this._assetDetails, "onOkButtonClicked", lang.hitch(this, function () {
          this.emit("showWorkBenchPanel");
        })));
        this.own(on(this._assetDetails, "onCancelButtonClicked", lang.hitch(this, function () {
          this.emit("showWorkBenchPanel");
        })));
        this.own(on(this._assetDetails, "onLoad", lang.hitch(this, function () {
          def.resolve();
        })));
        this.own(on(this._assetDetails, "groupCostEquationUpdated",
          lang.hitch(this, this._updateGroupCostEquation)));
        this._assetDetails.startup();
      } else {
        this._assetDetails.showAssetDetails({});
        def.resolve();
      }
    },

    /**
     * Once asset info is updated after add/edit/delete,
     * this method will update it on screen and map.
     */
    _onAssetInfoUpdate: function () {
      //update the info in asset summary section
      this._projectOverview.showAssetItemSummary(this._assetItemSummary, true);
      this._assetDetails.showAssetDetails(this._assetGroupSummary);
      //filter asset layer to show only current layers features
      this._filterAssets();
      this.emit("assetInfoUpdated", this._assetItemSummary);
    },

    /**
     * Adds asset group summary once features are added.
     */
    _addAssetGroupSummary: function (features, layer, templateInfoArray) {
      var templateName = templateInfoArray[0].TEMPLATENAME;
      //Create object for layer if layer id do not exist in group summary object
      if (!this._assetGroupSummary.hasOwnProperty(layer.id)) {
        this._assetGroupSummary[layer.id] = {};
        this._assetGroupSummary[layer.id][templateName] = {};
      } else {
        //Create object for templateName
        //if templateName do not exist in group summary object for this layer id
        if (!this._assetGroupSummary[layer.id].hasOwnProperty(templateName)) {
          this._assetGroupSummary[layer.id][templateName] = {};
        }
      }
      //For each feature add it in appropriate group (LayerId-Template-Region-Scenario)
      array.forEach(features, lang.hitch(this, function (feature, index) {
        var templateInfo = templateInfoArray[index];
        if (templateInfo.SCENARIO === this.nls.scenarioSelection.noneText) {
          templateInfo.SCENARIO = "null";
        }
        if (templateInfo.GEOGRAPHY === this.nls.scenarioSelection.noneText) {
          templateInfo.GEOGRAPHY = "null";
        }
        //Create object for region if region name do not exist in group summary object
        if (!this._assetGroupSummary[layer.id][templateName].
          hasOwnProperty(templateInfo.GEOGRAPHY)) {
          this._assetGroupSummary[layer.id][templateName][templateInfo.GEOGRAPHY] = {};
          this._assetGroupSummary[layer.id][templateName]
          [templateInfo.GEOGRAPHY][templateInfo.SCENARIO] = [];
        } else {
          //Create object for scenario if scenario do not exist in group summary object
          if (!this._assetGroupSummary[layer.id][templateName][templateInfo.GEOGRAPHY].
            hasOwnProperty(templateInfo.SCENARIO)) {
            this._assetGroupSummary[layer.id][templateName]
            [templateInfo.GEOGRAPHY][templateInfo.SCENARIO] = [];
          }
        }
        //store the feature in its group
        this._assetGroupSummary[layer.id][templateName][templateInfo.GEOGRAPHY]
        [templateInfo.SCENARIO].push(feature);
      }));
    },

    /**
     * Updates asset group summary once feature is edited/deleted.
     */
    _updateAssetGroupSummary: function (layer, updatedFeature, isEditing) {
      var objectId, features, templateName, regionName, scenarioName;
      //get the template info from the updated feature
      templateName = updatedFeature.templateInfo.TEMPLATENAME;
      regionName = updatedFeature.templateInfo.GEOGRAPHY;
      scenarioName = updatedFeature.templateInfo.SCENARIO;
      objectId = updatedFeature.attributes[layer.objectIdField];
      if (regionName === this.nls.scenarioSelection.noneText) {
        regionName = "null";
      }
      if (scenarioName === this.nls.scenarioSelection.noneText) {
        scenarioName = "null";
      }
      features = this._assetGroupSummary[layer.id][templateName][regionName][scenarioName];
      array.some(features, lang.hitch(this, function (feature, index) {
        if (feature.attributes[layer.objectIdField] === objectId) {
          //if feature is deleted remove it form the asset group summary info
          //else update its feature dimensions
          if (!isEditing) {
            this._assetGroupSummary[layer.id][templateName]
            [regionName][scenarioName].splice(index, 1);
          } else {
            this._assetGroupSummary[layer.id][templateName][regionName]
            [scenarioName][index].featureDimension = updatedFeature.featureDimension;
          }
          return true;
        }
      }));
    },

    /**
     * Add features to asset summary object
     * Assumption: features and templateInfo matches by index
     * @memberOf widgets/CostAnalysis/work-bench
     */
    _onFeaturesAdded: function (features, layer, templateInfoArray, updateProjectAssetTable) {
      var templateName, recentlyAddedFeatures = [];
      templateName = templateInfoArray[0].TEMPLATENAME;
      recentlyAddedFeatures = this._getGlobalIds(layer.globalIdField, features);
      //set asset group summary
      this._addAssetGroupSummary(features, layer, templateInfoArray);
      //set asset itm summary
      if (!this._assetItemSummary.hasOwnProperty(layer.id)) {
        this._assetItemSummary[layer.id] = {
          "layerName": layer.name,
          "templates": {},
          "geometryType": layer.geometryType
        };
        this._assetItemSummary[layer.id].templates[templateName] = {
          "units": features.length,
          "features": features,
          "cost": null
        };
      } else {
        if (!this._assetItemSummary[layer.id].templates.hasOwnProperty(templateName)) {
          this._assetItemSummary[layer.id].templates[templateName] = {
            "units": features.length,
            "features": features,
            "cost": null
          };
        } else {
          features =
            this._assetItemSummary[layer.id].templates[templateName].features.concat(features);
          this._assetItemSummary[layer.id].templates[templateName].units = features.length;
        }
      }
      //set recently operated layers
      this._recentlyOperatedLayerIds = [layer.id];
      //update units info after adding new features
      this._setFeaturesAndUnits(features, layer, templateName);
      //update total cost
      this._assetItemSummary[layer.id].templates[templateName].cost =
        this._getTotalCost(layer, templateName);
      //If widget is not in loading mode & project asset table is configured,
      //update the table with necessary fields
      //else for minimal configuration maintain the array of recently added features
      //so that it can be used for deleteing features on reset
      if (updateProjectAssetTable && this._projectAssetTable) {
        //Add data to project asset table
        this._addAssetsToProjectAssetTable(templateInfoArray, recentlyAddedFeatures);
      } else {
        //create _assetInfoForReset if not exist
        if (!this._assetInfoForReset) {
          this._assetInfoForReset = {};
        }
        //add recently added feature GUID for that particular layer
        if (!this._assetInfoForReset[layer.id]) {
          this._assetInfoForReset[layer.id] = lang.clone(recentlyAddedFeatures);
        } else {
          this._assetInfoForReset[layer.id] =
            this._assetInfoForReset[layer.id].concat(recentlyAddedFeatures);
        }
      }
    },

    /* Function /updates the template name, & featureDimension in the features
    * @memberOf widgets/CostAnalysis/work-bench
    */
    _updateFeaturesInfo: function (features) {
      var eachTemplate;
      array.forEach(features, lang.hitch(this, function (newFeature) {
        var layer;
        layer = newFeature._layer;
        for (eachTemplate in this._assetItemSummary[layer.id].templates) {
          this._setUpdatedTemplateFeatures(newFeature, layer, eachTemplate);
        }
      }));
      return features;
    },

    /* updates the template name, & featureDimension in the features
    * @memberOf widgets/CostAnalysis/work-bench
    */
    _setUpdatedTemplateFeatures: function (newFeature, layer, eachTemplate) {
      array.some(this._assetItemSummary[layer.id].templates[eachTemplate].features,
        lang.hitch(this, function (currentFeature) {
          if (currentFeature.attributes[layer.objectIdField] ===
            newFeature.attributes[layer.objectIdField]) {
            newFeature.featureDimension = currentFeature.featureDimension;
            newFeature.templateName = eachTemplate;
            newFeature.templateInfo = currentFeature.templateInfo;
            return true;
          }
        }));
    },

    /* Function updates the stored var and project summary info on features edited/deleted
    * @memberOf widgets/CostAnalysis/work-bench
    */
    _onFeaturesUpdated: function (features, isEditing) {
      //updates the template name, attributes in the features
      features = this._updateFeaturesInfo(features);
      //set recently operated layers
      this._recentlyOperatedLayerIds = [];
      array.forEach(features, lang.hitch(this, function (currentFeature) {
        var layer, templateName;
        templateName = currentFeature.templateName;
        layer = currentFeature._layer;
        //set recently operated layers
        this._recentlyOperatedLayerIds.push(layer.id);
        //Delete/Update the feature from stored var
        array.some(this._assetItemSummary[layer.id].templates[templateName].features,
          lang.hitch(this, function (feature, index) {
            var updatedUnits;
            if (feature.attributes[layer.objectIdField] ===
              currentFeature.attributes[layer.objectIdField]) {
              if (this._assetItemSummary.hasOwnProperty(layer.id) &&
                this._assetItemSummary[layer.id].templates[templateName]) {
                //In case of editing update the feature in stored var by current updated  feature
                if (isEditing) {
                  this._assetItemSummary[layer.id].templates[templateName].features[index] =
                    currentFeature;
                  //update units info after updating the feature
                  this._setFeaturesAndUnits(
                    this._assetItemSummary[layer.id].templates[templateName].features,
                    layer, templateName, isEditing);
                } else {
                  //In case of delete decrement the units of the template
                  //by current features dimensions
                  updatedUnits = this._assetItemSummary[layer.id].templates[templateName].units;
                  updatedUnits -= currentFeature.featureDimension;
                  //also use updated units so that it will be reflected in the summary table
                  this._assetItemSummary[layer.id].templates[templateName].units =
                    this.appUtils.removeNegativeExponents(updatedUnits);
                }
                //once feature is edited/deleted update the group summary
                this._updateAssetGroupSummary(layer, currentFeature, isEditing);
              }
              //If operation is not editing, means it is delete operation
              if (!isEditing) {
                //remove the feature form stored var in case of delete
                this._assetItemSummary[layer.id].templates[templateName].features.splice(index, 1);
              }
              return true;
            }
          }));
        //After the edit/delete operation if features are zero then delete the template object
        //else update the templates cost
        if (this._assetItemSummary[layer.id].templates[templateName].features.length === 0) {
          delete this._assetItemSummary[layer.id].templates[templateName];
        } else {
          this._assetItemSummary[layer.id].templates[templateName].cost =
            this._getTotalCost(layer, templateName);
        }
        //Check if this was the last template in layer
        if (Object.keys(this._assetItemSummary[layer.id].templates).length === 0) {
          delete this._assetItemSummary[layer.id];
        }
      }));
    },

    /**
    * Get features area based on the geometry
    * @memberOf widgets/CostAnalysis/work-bench
    */
    _setFeaturesAndUnits: function (features, layer, templateName, isEditing) {
      var configuredUnit, totalUnits = 0;
      configuredUnit = this.config.generalSettings.measurementUnit;
      array.forEach(features, lang.hitch(this, function (feature) {
        if (!feature.hasOwnProperty("featureDimension") || isEditing) {
          //get featuresDimensions as an area for polygon, length for line and use 1 for point
          if (layer.geometryType === "esriGeometryPolygon") {
            feature.featureDimension = this.appUtils.getAreaOfGeometry(feature.geometry,
              this.appUtils.units[configuredUnit].areaUnit);
          } else if (layer.geometryType === "esriGeometryPolyline") {
            feature.featureDimension = this.appUtils.getLengthOfGeometry(feature.geometry,
              this.appUtils.units[configuredUnit].lengthUnit);
          } else {
            feature.featureDimension = 1;
          }
          if (!isEditing) {
            feature.templateName = templateName;
          }
        }
        totalUnits += feature.featureDimension;
      }));
      //update the features list as we have updated some attributes
      this._assetItemSummary[layer.id].templates[templateName].features = features;
      this._assetItemSummary[layer.id].templates[templateName].units = totalUnits;
      return totalUnits;
    },

    /**
     * Returns group(layerId-templateName-region-scenario) total measures
     */
    _getGroupTotalMeasure: function (layerId, templateInfo) {
      var totalMeasure, features, templateName, regionName, scenarioName;
      totalMeasure = 0;
      templateName = templateInfo.TEMPLATENAME;
      regionName = templateInfo.GEOGRAPHY;
      scenarioName = templateInfo.SCENARIO;
      try {
        features = this._assetGroupSummary[layerId][templateName][regionName][scenarioName];
        array.forEach(features, lang.hitch(this, function (feature) {
          totalMeasure += feature.featureDimension;
        }));
      } catch (err) {
        totalMeasure = 0;
      }
      return totalMeasure;
    },

    /**
     * Returns group(layerId-templateName-region-scenario) total count
     */
    _getGroupTotalCount: function (layerId, templateInfo) {
      var totalCount, features, templateName, regionName, scenarioName;
      totalCount = 0;
      templateName = templateInfo.TEMPLATENAME;
      regionName = templateInfo.GEOGRAPHY;
      scenarioName = templateInfo.SCENARIO;
      try {
        features = this._assetGroupSummary[layerId][templateName][regionName][scenarioName];
        if (features && features.length > 0) {
          totalCount = features.length;
        }
      } catch (err) {
        totalCount = 0;
      }
      return totalCount;
    },

    /**
    * Get total cost of a features added for a template of the layer
    * @memberOf widgets/CostAnalysis/work-bench
    */
    _getTotalCost: function (layer, templateName) {
      var totalCostForTemplate = 0;
      var featuresArray = this._assetItemSummary[layer.id].templates[templateName].features;
      //Loop through each feature of the layers template
      array.forEach(featuresArray, lang.hitch(this, function (feature) {
        var individualCost, costEquation, totalMeasure, totalCount, groupSummaryFeatures;
        //get group(layerId-templateName-region-scenario) total measure and total cost
        totalMeasure = this._getGroupTotalMeasure(layer.id, feature.templateInfo);
        totalCount = this._getGroupTotalCount(layer.id, feature.templateInfo);
        try {
          costEquation = feature.templateInfo.COSTEQUATION;
          //use calculated feature dimensions for {MEASURE}
          costEquation = costEquation.replace(/{MEASURE}/ig, feature.featureDimension);
          //use total group measures for {TOTALMEASURE}
          costEquation = costEquation.replace(/{TOTALMEASURE}/ig, totalMeasure);
          //use total group count for {TOTALCOUNT}
          costEquation = costEquation.replace(/{TOTALCOUNT}/ig, totalCount);
          individualCost = this.appUtils.evaluate(costEquation);
        }
        catch (err) {
          individualCost = 0;
        }
        //update individual cost in group summary object
        groupSummaryFeatures = this._assetGroupSummary[layer.id][templateName]
        [feature.templateInfo.GEOGRAPHY][feature.templateInfo.SCENARIO];
        array.some(groupSummaryFeatures, lang.hitch(this, function (grFeature) {
          if (grFeature.attributes[layer.objectIdField] ===
            feature.attributes[layer.objectIdField]) {
            grFeature.individualCost = individualCost;
            return true;
          }
        }));
        feature.individualCost = individualCost;
        //add individual cost in total template cost
        totalCostForTemplate += individualCost;
      }));
      return Number(totalCostForTemplate);
    },

    /**
     * Returns global ids of the features
     */
    _getGlobalIds: function (globalIdField, features) {
      var globalIds = [];
      array.forEach(features,
        lang.hitch(this, function (currentFeature) {
          globalIds.push(currentFeature.attributes[globalIdField]);
        }));
      return globalIds;
    },

    /**
     * Returns expression to filter asset layer using globalIds of each added feature
     */
    _getExpressionToFilterAssets: function (layerId) {
      var eachTemplate, globalIds = [], layer, layerInfo;
      //get layer instance by id
      layerInfo = this.layerInfosObj.getLayerInfoById(layerId);
      //if any features added to the layer
      if (layerInfo && layerInfo.layerObject && this._assetItemSummary[layerId]) {
        layer = layerInfo.layerObject;
        //loop through each template and get global ids of each feature
        for (eachTemplate in this._assetItemSummary[layerId].templates) {
          globalIds = globalIds.concat(this._getGlobalIds(layer.globalIdField,
            this._assetItemSummary[layerId].templates[eachTemplate].features));
        }
      }
      //if found any globalIds for the layer join them else dont show anything from that layer
      if (globalIds.length > 0) {
        return layer.globalIdField + " in ('" + globalIds.join("','") + "')";
      } else {
        return "1=2";
      }
    },

    /**
     * Functions filters asset layers to show features of current project only
     */
    _filterAssets: function (clearFilter) {
      //if no recently operated layers then filter all the layers from configured layerSettings
      if (!this._recentlyOperatedLayerIds || this._recentlyOperatedLayerIds.length === 0) {
        this._recentlyOperatedLayerIds = [];
        array.forEach(this.config.layerSettings, lang.hitch(this, function (layerSettings) {
          if (layerSettings.editable) {
            this._recentlyOperatedLayerIds.push(layerSettings.id);
          }
        }));
      }
      //filter all the recently operated layers by getting expressions for each layer
      array.forEach(this._recentlyOperatedLayerIds, lang.hitch(this, function (layerId) {
        var expression = "";
        if (!clearFilter) {
          expression = this._getExpressionToFilterAssets(layerId);
        }
        this.filterManager.applyWidgetFilter(layerId, this.widgetId, expression, true, true);
      }));
    },

    /**
     * Adds the asset info in asset table
     * @memberOf widgets/CostAnalysis/work-bench
     */
    _addAssetsToProjectAssetTable: function (templateInfoArray, recentlyAddedFeatures) {
      var featuresArray = [], assetsTableRequiredFields = [
        "COSTEQUATION",
        "SCENARIO",
        "TEMPLATENAME",
        "GEOGRAPHYGUID"
      ];
      this.loadingIndicator.show();
      //create graphic for each newly added asset to be stored in project asset table
      array.forEach(recentlyAddedFeatures, lang.hitch(this, function (id, index) {
        var featureAttributes = {};
        array.forEach(this._projectAssetTable.fields, lang.hitch(this, function (field) {
          var fieldValue = "";
          if (assetsTableRequiredFields.indexOf(field.name.toUpperCase()) > -1) {
            fieldValue = templateInfoArray[index][field.name.toUpperCase()];
            //if field is scenario/geographyid and value is "null" store null in tables
            if ((field.name.toUpperCase() === "SCENARIO" ||
              field.name.toUpperCase() === "GEOGRAPHYGUID") &&
              (fieldValue === "null")) {
              fieldValue = null;
            }
            featureAttributes[field.name] = fieldValue;
          } else if (field.name.toUpperCase() === "ASSETGUID") {
            featureAttributes[field.name] = id;
          } else if (field.name.toUpperCase() === "PROJECTGUID" && this.projectInfo.projectId) {
            featureAttributes[field.name] = this.projectInfo.projectId;
          }
        }));
        featuresArray.push(new Graphic(null, null, featureAttributes));
      }));
      this._projectAssetTable.applyEdits(featuresArray, null, null, lang.hitch(this,
        function (adds) {
          var isFailed = false;
          array.forEach(adds, lang.hitch(this, function (feature, index) {
            if (feature.success) {
              this._assetTableIds[recentlyAddedFeatures[index]] = feature.objectId;
            } else {
              isFailed = true;
            }
          }));
          if (isFailed) {
            this.appUtils.showMessage(this.nls.workBench.errorInSavingAssetDetails);
          }
          this.loadingIndicator.hide();
        }),
        lang.hitch(this, function () {
          this.loadingIndicator.hide();
          this.appUtils.showMessage(this.nls.workBench.errorInSavingAssetDetails);
        }));
    },

    /**
     * This function updated the new cost equation and scenario in all the required places
     * also updates the asset table.
     */
    _updateGroupCostEquation: function (info) {
      var featuresArray = [], groupInfo, features, layer;
      groupInfo = info.groupInfo;
      //get all features from group
      features = this._assetGroupSummary[groupInfo.layerId][groupInfo.templateName]
      [groupInfo.region][groupInfo.scenario];
      layer = this.layerInfosObj.getLayerInfoById(groupInfo.layerId).layerObject;
      //create graphic for each newly added asset to be stored in project asset table
      array.forEach(features, lang.hitch(this, function (feature) {
        var featureAttr = {}, assetGUID, assetObjectId;
        assetGUID = feature.attributes[layer.globalIdField];
        assetObjectId = feature.attributes[layer.objectIdField];
        //Update costEquation & scenario of the features in assetItemSummary object
        array.some(
          this._assetItemSummary[groupInfo.layerId].templates[groupInfo.templateName].features,
          lang.hitch(this, function (currentFeature) {
            if (currentFeature.attributes[layer.objectIdField] === assetObjectId) {
              currentFeature.templateInfo.COSTEQUATION = info.templateInfo.COSTEQUATION;
              currentFeature.templateInfo.SCENARIO = info.templateInfo.SCENARIO;
              return true;
            }
          }));
        //Update costEquation & scenario of the features in assetGroupSummary object
        feature.templateInfo.COSTEQUATION = info.templateInfo.COSTEQUATION;
        feature.templateInfo.SCENARIO = info.templateInfo.SCENARIO;
        //Create graphics to update the costEquation & scenario of the assets in asset table
        if (this._projectAssetTable && this._assetTableIds[assetGUID]) {
          featureAttr[this.config.assetTableFields.COSTEQUATION] = info.templateInfo.COSTEQUATION;
          featureAttr[this.config.assetTableFields.SCENARIO] = info.templateInfo.SCENARIO;
          featureAttr[this.config.assetTableFields.OBJECTID] = this._assetTableIds[assetGUID];
          featuresArray.push(new Graphic(null, null, featureAttr));
        }
      }));
      //When scenario changes we have to rename the scenario key from the object
      delete this._assetGroupSummary[groupInfo.layerId][groupInfo.templateName]
      [groupInfo.region][groupInfo.scenario];
      this._assetGroupSummary[groupInfo.layerId][groupInfo.templateName]
      [groupInfo.region][info.templateInfo.SCENARIO] = features;
      //Update template picker so that going forward
      //if any asset is added in this group the updated costEquation and scenario should be used
      this._templatePicker.loadCostingInfo(layer.id, features[0].templateInfo);
      //Update total cost for this template as cost equation is changed
      this._assetItemSummary[layer.id].templates[groupInfo.templateName].cost =
        this._getTotalCost(layer, groupInfo.templateName);
      //Update itemSummary and details section
      this._projectOverview.showAssetItemSummary(this._assetItemSummary, false);
      this._assetDetails.showAssetDetails(this._assetGroupSummary);
      //Update asset table if it is configured
      if (this._projectAssetTable) {
        this.loadingIndicator.show();
        this._projectAssetTable.applyEdits(null, featuresArray, null, lang.hitch(this,
          function () {
            this.loadingIndicator.hide();
          }),
          lang.hitch(this, function () {
            this.loadingIndicator.hide();
          }));
      }
    },

    /**
    * This function will enable the web map popup.
    * @memberOf widgets/CostAnalysis/work-bench
    **/
    _enableWebMapPopup: function () {
      if (this.map) {
        this.map.setInfoWindowOnClick(true);
      }
    },

    /**
    * This function will disable the web map popup.
    * @memberOf widgets/CostAnalysis/work-bench
    **/
    _disableWebMapPopup: function () {
      if (this.map) {
        this.map.setInfoWindowOnClick(false);
      }
      this._hideWebMapPopup();
    },

    /**
    * This function will hide the infoWindow if it is open.
    * @memberOf widgets/CostAnalysis/work-bench
    **/
    _hideWebMapPopup: function () {
      if (this.map.infoWindow.isShowing) {
        this.map.infoWindow.hide();
      }
    }
  });
});