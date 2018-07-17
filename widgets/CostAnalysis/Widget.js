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
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./Widget.html',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/on',
  'dojo/dom-construct',
  'dojo/dom-class',
  'dojo/dom-attr',
  'dojo/promise/all',
  'dojo/Deferred',
  'dojo/string',
  'jimu/portalUtils',
  'jimu/dijit/LoadingIndicator',
  'jimu/LayerInfos/LayerInfos',
  'jimu/utils',
  'esri/request',
  'esri/layers/FeatureLayer',
  './create-load-project',
  './work-bench',
  './add-new-statistics',
  './project-attribute',
  './asset-statistics',
  './utils'
], function (
  declare,
  BaseWidget,
  _WidgetsInTemplateMixin,
  template,
  lang,
  array,
  on,
  domConstruct,
  domClass,
  domAttr,
  all,
  Deferred,
  string,
  portalUtils,
  LoadingIndicator,
  LayerInfos,
  jimuUtils,
  esriRequest,
  FeatureLayer,
  CreateOrLoadProject,
  WorkBench,
  addNewStatistics,
  projectAttribute,
  assetStatistics,
  appUtils
) {
  return declare([BaseWidget, _WidgetsInTemplateMixin], {
    templateString: template,
    baseClass: 'jimu-widget-cost-analysis-widget',
    _createOrLoadPrj: null,
    _panels: {},
    _currentPanel: null,
    _currentPanelName: null,
    _layerInfosObj: null,
    _loadingIndicator: null,
    _assetDetailStatisticsData: null,
    _updatedStatisticsData: [],
    postMixInProperties: function () {
      var selectedRoundingOption;
      this._layerInfosObj = null;
      //mixin default nls with widget nls
      this.nls.common = {};
      this.nls.units = {};
      lang.mixin(this.nls.common, window.jimuNls.common);
      //mixin the units form jimu nls
      lang.mixin(this.nls.units, window.jimuNls.units);
      //set the rounding label according to configured option
      selectedRoundingOption = string.substitute(this.nls.projectOverview.roundingLabel,
        {
          "selectedRoundingOption":
         this.nls.projectOverview.roundCostValues[this.config.generalSettings.roundCostType]
        });
      this.nls.projectOverview.roundingLabel = selectedRoundingOption;
    },

    postCreate: function () {
      this.inherited(arguments);
      this._setTheme();
      this._getSelectedThemeColor();
      this._getLayerInfos();
    },

    onDeActive: function () {
      if (this._workBench) {
        this._workBench.onWidgetDeActive();
      }
    },

    onActive: function () {
      if (this._workBench) {
        this._workBench.onWidgetActive();
      }
    },

    onNormalize: function () {
      if (this._workBench) {
        this._workBench.refreshTemplatePicker();
      }
    },

    resize: function () {
      if (this._workBench) {
        this._workBench.refreshTemplatePicker();
      }
      if (this._addNewStatisticsObj && this._addNewStatisticsObj.addNewStatisticsObj) {
        this._addNewStatisticsObj.addNewStatisticsObj.resetAddNewStatisticsDropdown();
      }
    },

    onMaximize: function () {
      if (this._workBench) {
        this._workBench.refreshTemplatePicker();
      }
    },

    onOpen: function () {
      if (this._workBench) {
        this._workBench.onWidgetOpen();
      }
      //if current panel is of edit project attributes we need to get the refreshed data of Project
      if (this._projectAttribute && this._currentPanelName === "projectAttribute") {
        this._projectAttribute.editProjectAttributes();
      }
    },

    onClose: function () {
      if (this._workBench) {
        this._workBench.onWidgetClose();
      }
    },

    startup: function () {
      this.inherited(arguments);
      if (this.appConfig.theme.name === "TabTheme") {
        //override the panel styles
        domClass.add(this.domNode.parentElement, "esriCTOverridePanelStyle");
      }
      var defArray = [];
      //Fetch all required fields for asset table, project layer and multiplier
      if (this.config.projectSettings.projectLayer) {
        var prjLayer =
          this._layerInfosObj.getLayerInfoById(this.config.projectSettings.projectLayer);
        if (prjLayer && prjLayer.layerObject) {
          this.config.projectLayerFields =
            appUtils.getPrjLayerFields(prjLayer.layerObject);
        } else {
          appUtils.showMessage(this.nls.projectLayerNotFound);
          //Display error message if configured layer infos are not found
          domAttr.set(this.widgetErrorNode, "innerHTML", this.nls.projectLayerNotFound);
          domClass.remove(this.widgetErrorNode, "esriCTHidden");
          return;
        }
      }
      defArray.push(this._getProjectAssetTable());
      defArray.push(this._getProjectMulTable());
      defArray.push(this._getGeometryServiceURL());
      defArray.push(this._getCostingGeometryLayerFields());
      all(defArray).then(lang.hitch(this, function (infos) {
        //If any of operation fails, report an error
        if (infos.indexOf(false) === -1) {
          this._initComponents();
        }
        else {
          //Display error message if configured layer infos are not found
          domAttr.set(this.widgetErrorNode, "innerHTML", this.nls.unableToFetchInfoErrMessage);
          domClass.remove(this.widgetErrorNode, "esriCTHidden");
        }
      }));
    },

    /**
     * Gets the project asset table details and if table not found in map shows error
     */
    _getProjectAssetTable: function () {
      var assetTblDef = new Deferred();
      if (this.config.projectSettings.assetTable) {
        var tableInstance, prjAssetTable;
        prjAssetTable =
          this._layerInfosObj.getTableInfoById(this.config.projectSettings.assetTable);
        //if table exist then get the fields else show error msg
        if (prjAssetTable && prjAssetTable.layerObject) {
          tableInstance = new FeatureLayer(prjAssetTable.layerObject.url);
          on(tableInstance, "load", lang.hitch(this, function (evt) {
            this.config.assetTableFields = appUtils.getPrjAssetTableFields(evt.layer);
            assetTblDef.resolve(true);
          }));
          on(tableInstance, "error", lang.hitch(this, function () {
            assetTblDef.resolve(false);
          }));
        } else {
          //show error msg table not found
          appUtils.showMessage(this.nls.projectAssetTableNotFound);
          assetTblDef.resolve(false);
        }
      } else {
        assetTblDef.resolve(true);
      }
      return assetTblDef.promise;
    },

    /**
     * Gets the project multiplier additional cost table details,
     * and if table not found in map shows error
     */
    _getProjectMulTable: function () {
      var prjMulTblDef = new Deferred();
      if (this.config.projectSettings.multiplierAdditionalCostTable) {
        var prjTableInstance, prjMultiplierTable;
        //get project multiplier table from map
        prjMultiplierTable =
          this._layerInfosObj.getTableInfoById
            (this.config.projectSettings.multiplierAdditionalCostTable);
        //if it exist then get the field else show error msg
        if (prjMultiplierTable && prjMultiplierTable.layerObject) {
          prjTableInstance = new FeatureLayer(prjMultiplierTable.layerObject.url);
          on(prjTableInstance, "load", lang.hitch(this, function (evt) {
            this.config.projectMultiplierFields = appUtils.getPrjMultiplierFields(evt.layer);
            prjMulTblDef.resolve(true);
          }));
          on(prjTableInstance, "error", lang.hitch(this, function () {
            prjMulTblDef.resolve(false);
          }));
        } else {
          //show error msg table not found
          appUtils.showMessage(this.nls.projectMultiplierTableNotFound);
          prjMulTblDef.resolve(false);
        }
      } else {
        prjMulTblDef.resolve(true);
      }
      return prjMulTblDef.promise;
    },

    /**
     * Function to fetch geometry service url from portal info.
     */
    _getGeometryServiceURL: function () {
      var def = new Deferred();
      if (this.appConfig.portalUrl &&
        lang.trim(this.appConfig.portalUrl) !== "") {
        //get portal info to fetch geometry service Url
        portalUtils.getPortalSelfInfo(this.appConfig.portalUrl).then(
          lang.hitch(this, function (portalInfo) {
            // get helper-services from portal object
            this.config.helperServices = portalInfo && portalInfo.helperServices;
            if (this.config.helperServices && this.config.helperServices.geometry) {
              def.resolve(true);
            } else {
              // Display error message if geometry service is not found
              def.resolve(false);
            }
          }), lang.hitch(this, function () {
            // Display error message if any error occurred while
            // fetching portal info for geometry service
            def.resolve(false);
          }));
      } else {
        // Display error message if portal url is not available
        def.resolve(false);
      }
      return def.promise;
    },

    /**
     * If global id field is not filled in layer.globalId property this function fills it
     * and if no global id field available in the layer it shows an error
     */
    _getCostingGeometryLayerFields: function () {
      var costingGeometryLayer, prjCostingGeometryDef = new Deferred();
      //if costing geometry layer is configured
      if (this.config.projectSettings.costingGeometryLayer &&
        this.config.projectSettings.geographyField) {
        costingGeometryLayer =
          this.map.getLayer(this.config.projectSettings.costingGeometryLayer);
        //if the layers property is not filled,
        //loop through all the fields of the layer and get global id field
        if (costingGeometryLayer && !costingGeometryLayer.globalIdField &&
          costingGeometryLayer.fields) {
          array.forEach(costingGeometryLayer.fields, lang.hitch(this, function (field) {
            if (field.type === "esriFieldTypeGlobalID") {
              costingGeometryLayer.globalIdField = field.name;
            }
          }));
        }
        //if filed available resolve success else failure and show msg
        if (costingGeometryLayer && costingGeometryLayer.globalIdField) {
          prjCostingGeometryDef.resolve(true);
        } else {
          //if layer not found in map show LayerNotFound message
          //else sho invalid costing geometry layer message
          if (!costingGeometryLayer) {
            appUtils.showMessage(this.nls.costingGeometryLayerNotFound);
          } else {
            appUtils.showMessage(this.nls.invalidCostingGeometryLayer);
          }
          prjCostingGeometryDef.resolve(false);
        }
      } else {
        prjCostingGeometryDef.resolve(true);
      }
      return prjCostingGeometryDef.promise;
    },

    /**
     * Initialize widget components
     * @memberOf widgets/CostAnalysis/Widget
     */
    _initComponents: function () {
      var projectInfo = {
        "name": "",
        "desc": "",
        "projectId": ""
      };
      this._initLoadingIndicator();
      //If project layer is configured then show initial page to load/create project
      //Otherwise go to work bench panel
      if (this.config.projectSettings.projectLayer) {
        this._initCreateLoadPrj();
      } else {
        this._initWorkBenchPanel(projectInfo);
      }
      this._initAddNewStatistics();
      this._initAssetDetails();
      this._initAssetStatistics();
      this._initProjectSummary();
    },

    /**
     * Initialize create or load project
     * @memberOf widgets/CostAnalysis/Widget
     */
    _initCreateLoadPrj: function () {
      this._createOrLoadPrj = new CreateOrLoadProject({
        nls: this.nls,
        map: this.map,
        config: this.config,
        layerInfosObj: this._layerInfosObj,
        loadingIndicator: this._loadingIndicator,
        appUtils: appUtils
      }, domConstruct.create("div", {}, this.createOrLoadProject));
      this.own(on(this._createOrLoadPrj, "createProject", lang.hitch(this, function (projectInfo) {
        this._initWorkBenchPanel(projectInfo);
      })));
      this.own(on(this._createOrLoadPrj, "loadProject", lang.hitch(this, function (projectDetails) {
        this._initWorkBenchPanel(projectDetails.projectInfo, projectDetails);
      })));
      this.own(on(this._createOrLoadPrj, "showCreateLoadPrjPanel", lang.hitch(this, function () {
        this._showPanel("createLoadPrjPanel");
      })));
      this._createOrLoadPrj.startup();
      this._addPanel("createLoadPrjPanel", this.createOrLoadProject);
      this._showPanel("createLoadPrjPanel");
    },

    /**
     * Initialize work bench panel
     * @memberOf widgets/CostAnalysis/Widget
     */
    _initWorkBenchPanel: function (projectInfo, assetInfo) {
      if (!this._workBench) {
        this._addPanel("workBench", this.workBenchPanel);
        this._showPanel("workBench");
        this._workBench = new WorkBench({
          nls: this.nls,
          map: this.map,
          config: this.config,
          loadingIndicator: this._loadingIndicator,
          layerInfosObj: this._layerInfosObj,
          projectInfo: projectInfo,
          appUtils: appUtils,
          projectSummaryDiv: this.projectSummary,
          assetDetailsDiv: this.assetDetails,
          assetInfo: assetInfo,
          widgetId: this.id // Widgets id
        }, domConstruct.create("div", {}, this.workBenchPanel));
        this.own(on(this._workBench, "reloadProject", lang.hitch(this, function (projectId) {
          if (this._createOrLoadPrj) {
            this._createOrLoadPrj.projectNameSelect.set("value", projectId);
            this._createOrLoadPrj.getProjectAssets("LoadProject");
          }
        })));
        this.own(on(this._workBench, "resetProject", lang.hitch(this, function () {
          //reset last added statistics on reset button clicked
          if (this._addNewStatisticsObj) {
            this._addNewStatisticsObj.reset();
          }
        })));
        this.own(on(this._workBench, "showWorkBenchPanel", lang.hitch(this, function () {
          this._showPanel("workBench");
        })));
        this.own(on(this._workBench, "showProjectPanel", lang.hitch(this, function () {
          this._showPanel("createLoadPrjPanel");
          //reset last added statistics on back button clicked
          if (this._addNewStatisticsObj) {
            this._addNewStatisticsObj.reset();
          }
        })));
        this.own(on(this._workBench, "actionClicked", lang.hitch(this, function (selectedIndex) {
          if (selectedIndex === "1") {
            this._addNewStatisticsObj._initAddNewStatistics();
            this._showPanel("statisticsPanel");
          }
        })));
        this.own(on(this._workBench, "titleClicked", lang.hitch(this, function (selectedIndex) {
          if (selectedIndex === "0") {
            this._showPanel("assetDetails");
          }
          if (selectedIndex === "1") {
            this._showPanel("assetStatistics");
          }
          if (selectedIndex === "2") {
            if (this._projectAttribute) {
              this._projectAttribute.editProjectAttributes();
              this._showPanel("projectAttribute");
            }
          }
        })));
        this.own(on(this._workBench, "showAdditionalCost", lang.hitch(this, function () {
          this._showPanel("projectSummary");
        })));
        this.own(on(this._workBench, "showAssetDetails", lang.hitch(this, function () {
          this._showPanel("assetDetails");
        })));
        this._workBench.startup();
      } else {
        this._workBench.onProjectCreateOrLoad(projectInfo, assetInfo);
        this._showPanel("workBench");
      }
      this._initProjectAttribute(projectInfo);
      this.own(on(this._workBench, "assetInfoUpdated",
        lang.hitch(this, function (assetItemSummary) {
          this._assetStatistics.assetItemSummary = assetItemSummary;
          var statsUpdatedData = [];
          statsUpdatedData = this.config.statisticsSettings.concat(this._updatedStatisticsData);
          this._assetStatistics.displayStatisticsDetail(statsUpdatedData);
        })));
    },

    /**
     * Initialize statistics
     * @memberOf widgets/CostAnalysis/Widget
     */
    _initAddNewStatistics: function () {
      this._addNewStatisticsObj = new addNewStatistics({
        nls: this.nls,
        map: this.map,
        config: this.config,
        layerInfosObj: this._layerInfosObj
      }, domConstruct.create("div", {}, this.addNewStatisticsNode));
      this._addNewStatisticsObj.startup();
      this._addPanel("statisticsPanel", this.addNewStatisticsNode);
      this.own(on(this._addNewStatisticsObj, "showWorkBenchPanel", lang.hitch(this, function () {
        this._showPanel("workBench");
      })));
      this.own(on(this._addNewStatisticsObj, "updateStatisticsDetail",
        lang.hitch(this, function (updatedStatisticsData) {
          var statsUpdatedData = [];
          this._updatedStatisticsData = updatedStatisticsData;
          statsUpdatedData = this.config.statisticsSettings.concat(updatedStatisticsData);
          this._assetStatistics.displayStatisticsDetail(statsUpdatedData);
        })));
    },

    /**
     * Initialize Project Attribute
     * @memberOf widgets/CostAnalysis/Widget
     */
    _initProjectAttribute: function (projectInfo) {
      //if project info is not valid return
      if (!projectInfo || !projectInfo.projectId) {
        return;
      }
      if (!this._projectAttribute) {
        this._projectAttribute = new projectAttribute({
          nls: this.nls,
          map: this.map,
          config: this.config,
          layerInfosObj: this._layerInfosObj,
          projectInfo: projectInfo,
          loadingIndicator: this._loadingIndicator
        }, domConstruct.create("div", {}, this.projectAttribute));
        this.own(on(this._projectAttribute, "onOkButtonClicked", lang.hitch(this, function () {
          this._showPanel("workBench");
        })));
        this.own(on(this._projectAttribute, "onCancelButtonClicked", lang.hitch(this, function () {
          this._showPanel("workBench");
        })));
        this._projectAttribute.startup();
        this._addPanel("projectAttribute", this.projectAttribute);
      } else {
        this._projectAttribute.onProjectLoad(projectInfo);
      }
    },

    /**
     * Initialize Asset Details
     * @memberOf widgets/CostAnalysis/Widget
     */
    _initAssetDetails: function () {
      this._addPanel("assetDetails", this.assetDetails);
    },

    /**
     * Initialize Asset statistics
     * @memberOf widgets/CostAnalysis/Widget
     */
    _initAssetStatistics: function () {
      this._assetStatistics = new assetStatistics({
        nls: this.nls,
        map: this.map,
        config: this.config,
        layerInfosObj: this._layerInfosObj,
        appUtils: appUtils,
        assetItemSummary: (this._workBench) ? this._workBench._assetItemSummary : {}
      }, domConstruct.create("div", {}, this.assetStatistics));
      this.own(on(this._assetStatistics, "onOkButtonClicked", lang.hitch(this, function () {
        this._showPanel("workBench");
      })));
      this.own(on(this._assetStatistics, "onCancelButtonClicked", lang.hitch(this, function () {
        this._showPanel("workBench");
      })));
      this._assetStatistics.startup();
      this._addPanel("assetStatistics", this.assetStatistics);
    },

    /**
     * Initialize Project summary
     * @memberOf widgets/CostAnalysis/Widget
     */
    _initProjectSummary: function () {
      this._addPanel("projectSummary", this.projectSummary);
    },
    /**
     * Fetch layer infos object
     * @memberOf widgets/CostAnalysis/Widget
     */
    _getLayerInfos: function () {
      LayerInfos.getInstance(this.map, this.map.webMapResponse.itemInfo).then(lang.hitch(this,
        function (layerInfosObj) {
          this._layerInfosObj = layerInfosObj;
        }));
    },

    /**
    * This function used for initializing the loading indicator
      * @memberOf widgets/CostAnalysis/Widget
    */
    _initLoadingIndicator: function () {
      this._loadingIndicator = new LoadingIndicator({
        hidden: true
      });
      this._loadingIndicator.placeAt(this.domNode.parentNode);
      this._loadingIndicator.startup();
    },

    /* Section for showing/hiding panels */

    /**
     * Show panel based on the panel name
     * @memberOf widgets/CostAnalysis/Widget
     */
    _showPanel: function (name) {
      if (this._currentPanel) {
        domClass.add(this._currentPanel, "esriCTHidden");
      }
      this._currentPanelName = name;
      this._currentPanel = this._panels[name];
      domClass.remove(this._currentPanel, "esriCTHidden");
      if (name === "workBench" && this._workBench) {
        this._workBench.onShow();
      }
    },

    /**
     * Add panel to the widget
     * @memberOf widgets/CostAnalysis/Widget
     */
    _addPanel: function (name, widget) {
      this._panels[name] = widget;
    },

    /**
     * Hide panel based on panel name
     * @memberOf widgets/CostAnalysis/Widget
     */
    _hidePanel: function () {
      domClass.add(this._currentPanel, "esriCTHidden");
    },

    /* End of Section for showing/hiding panels */

    /***
     * Function gets the selected theme Color from app config and theme properties
     * In case of errors it will use "#000000" color
     */
    _getSelectedThemeColor: function () {
      var requestArgs, styleName, selectedTheme;
      // by default set it to black
      this.config.selectedThemeColor = "#000000";
      //Get selected theme Name
      selectedTheme = this.appConfig.theme.name;
      //get selected theme's style
      if (this.appConfig && this.appConfig.theme && this.appConfig.theme.styles) {
        styleName = this.appConfig.theme.styles[0];
      } else {
        styleName = "default";
      }
      //if custom styles are selected then use the selected color directly
      if (this.appConfig && this.appConfig.theme && this.appConfig.theme.customStyles &&
        this.appConfig.theme.customStyles.mainBackgroundColor) {
        this.config.selectedThemeColor = this.appConfig.theme.customStyles.mainBackgroundColor;
        return;
      }
      //create request to get the selected theme's manifest to fetch the color
      requestArgs = {
        url: "./themes/" + selectedTheme + "/manifest.json",
        content: {
          f: "json"
        },
        handleAs: "json",
        callbackParamName: "callback"
      };
      esriRequest(requestArgs).then(lang.hitch(this, function (response) {
        var i, styleObj;
        //match the selected style name and get its color
        if (response && response.styles && response.styles.length > 0) {
          for (i = 0; i < response.styles.length; i++) {
            styleObj = response.styles[i];
            if (styleObj.name === styleName) {
              this.config.selectedThemeColor = styleObj.styleColor;
              break;
            }
          }
        }
      }));
    },

    /**
     * Add styles for theme overrides
     */
    _setTheme: function () {
      var styleLink;
      if (this.appConfig.theme.name === "DashboardTheme") {
        jimuUtils.loadStyleLink(this.baseClass + 'dashboardOverrideCSS',
          this.folderUrl + "/css/dashboardTheme.css", null);
      }
      else {
        styleLink = document.getElementById(this.baseClass + 'dashboardOverrideCSS');
        if (styleLink) {
          styleLink.disabled = true;
        }
      }
    }
  });
});