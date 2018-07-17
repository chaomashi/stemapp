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
  'dojo/Evented',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./create-load-project.html',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/on',
  'dojo/dom-construct',
  './item-list',
  'dijit/form/ValidationTextBox',
  'dijit/form/Select',
  'esri/tasks/query',
  'esri/graphic',
  'esri/tasks/QueryTask',
  'esri/graphicsUtils',
  'dojo/Deferred',
  'esri/layers/FeatureLayer',
  'dojo/promise/all',
  'jimu/dijit/Message'
], function (
  declare,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  lang,
  array,
  on,
  domConstruct,
  ItemList,
  ValidationTextBox,
  Select,
  Query,
  Graphic,
  QueryTask,
  graphicsUtils,
  Deferred,
  FeatureLayer,
  all,
  Message
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    baseClass: 'jimu-widget-cost-analysis-create-load-project',
    //Properties
    highlighterColor: "#000",
    projectLayer: null,
    // pane list
    paneListData: [],
    _numberFieldTypes: ['esriFieldTypeSmallInteger', 'esriFieldTypeInteger',
      'esriFieldTypeSingle', 'esriFieldTypeDouble'],
    projectNameOptions: [],
    projectNameField: null,
    projectDescField: null,
    postCreate: function () {
      this.inherited(arguments);
      //Initialize array's and object
      // pane list
      //get the project name and descriptions field
      this.projectNameField = this.config.projectLayerFields.PROJECTNAME;
      this.projectDescField = this.config.projectLayerFields.DESCRIPTION;
      this.paneListData = [];
      this.projectLayer =
        this.layerInfosObj.getLayerInfoById(this.config.projectSettings.projectLayer).layerObject;
      this.projectNameOptions = [{ label: this.nls.createLoadProject.selectProject, value: "" }];
      this._createProjectUI();
      this._loadProjectUI();
    },

    startup: function () {
      this.inherited(arguments);
      // pane list data
      this.paneListData = [{
        "title": this.nls.createLoadProject.createProjectPaneTitle,
        "content": this.createProjectContainer,
        "isOpen": true
      }, {
        "title": this.nls.createLoadProject.loadProjectPaneTitle,
        "content": this.loadProjectContainer,
        "isOpen": false
      }];
      this._createAndLoadProjectPanes();
      this._getProjectNamesOptions();
    },

    /**
     * Create and show alert message.
     */
    _showMessage: function (msg) {
      var alertMessage = new Message({
        message: msg
      });
      alertMessage.message = msg;
    },

    /**
    * This function is used to create project UI
    * @memberOf widgets/CostAnalysis/create-load-project
    */
    _createProjectUI: function () {
      var createProjectWrapper, projectName, projectNameTextBox, projectDesc,
        projectDescTextBox,
        createBtn, createProjectButtonWrap, fieldInfo;
      createProjectWrapper = domConstruct.create("div", { "class": "esriCTCreateProjectWrapper" },
        this.createProjectContainer);
      projectName = domConstruct.create("div", {
        "class": "esriCTFullwidth esriCTCreateProjectContent"
      }, createProjectWrapper);
      projectNameTextBox = new ValidationTextBox({
        required: true,
        trim: true,
        placeHolder: this.nls.createLoadProject.projectNamePlaceHolder,
        title: this.nls.createLoadProject.projectNamePlaceHolder,
        maxLength: this._getFieldInfo(this.projectNameField).fieldLength,
        autofocus: true,
        "class": "esriCTFullwidth esriCTCreateProjectContent esriCTEllipsis"
      }, projectName);
      //Validator for validating project name
      projectNameTextBox.validator = lang.hitch(this, function (value) {
        //Validate for empty project name
        if (value === "") {
          return false;
        }
        //validate for duplicate project name
        if (!this._validateProjectNameLocally(value)) {
          projectNameTextBox.set("state", "Error");
          projectNameTextBox.set("invalidMessage",
            this.nls.createLoadProject.errorDuplicateProjectName);
          return false;
        }
        return true;
      });
      fieldInfo = this._getFieldInfo(this.projectDescField);
      projectDesc = domConstruct.create("div",
        { "class": "esriCTFullwidth esriCTCreateProjectContent" }, createProjectWrapper);
      projectDescTextBox = new ValidationTextBox({
        required: fieldInfo.nullable,
        trim: true,
        placeHolder: this.nls.createLoadProject.projectDescPlaceHolder,
        "class": "esriCTFullwidth esriCTCreateProjectContent esriCTEllipsis",
        "title": this.nls.createLoadProject.projectDescPlaceHolder,
        maxLength: fieldInfo.fieldLength
      }, projectDesc);
      createProjectButtonWrap = domConstruct.create("div",
        { "class": "esriCTFullwidth esriCTCreateLoadButtonWrap" },
        createProjectWrapper);
      createBtn = this._createButton(this.nls.createLoadProject.createLabel,
        createProjectButtonWrap);
      this.own(on(createBtn, "click", lang.hitch(this, function () {
        //Show error msg if invalid description
        if (!projectDescTextBox.isValid()) {
          projectDescTextBox.set("state", "Error");
          projectDescTextBox.set("message", projectDescTextBox.getErrorMessage());
        }
        if (projectNameTextBox.isValid() && projectDescTextBox.isValid()) {
          this.loadingIndicator.show();
          //on button click validate for duplicate project name in layer
          this._validateForDuplicateProjectName(projectNameTextBox.get('value')).then(
            lang.hitch(this, function (duplicateProjectName) {
            //If project name is not duplicate proceed with create project workflow
            // else show error as duplicate project name
            if (!duplicateProjectName) {
              this._addProjectToLayer(projectNameTextBox.get('value'),
                projectDescTextBox.get('value')).then(lang.hitch(this, function (result) {
                  var newlyAddedOption;
                  this.loadingIndicator.hide();
                  //get project id field's value
                  if (result && result.success && result.globalId) {
                    //Make sure the newly added project is present in drop down
                    newlyAddedOption = {
                      label: projectNameTextBox.get('value'),
                      value: result.globalId,
                      descValue: projectDescTextBox.get('value'),
                      globalIdValue: result.globalId,
                      objectIdValue: result.objectId
                    };
                    this.projectNameSelect.addOption(newlyAddedOption);
                    //emit event as project is created
                    this.emit("createProject", {
                      "name": projectNameTextBox.get('value'),
                      "desc": projectDescTextBox.get('value'),
                      "projectId": result.globalId,
                      "objectId": result.objectId
                    });
                    //Remove values of project name and description
                    projectNameTextBox.set('value', " ");
                    projectDescTextBox.set('value', "");
                  } else {
                    this._showMessage(this.nls.createLoadProject.errorInCreatingProject);
                  }
                }), lang.hitch(this, function () {
                  this.loadingIndicator.hide();
                  this._showMessage(this.nls.createLoadProject.errorInCreatingProject);
                }));
            } else {
              this.loadingIndicator.hide();
              projectNameTextBox.set("state", "Error");
              this._showMessage(this.nls.createLoadProject.errorDuplicateProjectName);
            }
          }), lang.hitch(this, function () {
            this.loadingIndicator.hide();
            this._showMessage(this.nls.createLoadProject.errorInCreatingProject);
          }));
        }
      })));
      return this.createProjectContainer;
    },

    /**
     * This function is used to get the max length of field
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _getFieldInfo: function (fieldName) {
      var fieldLength, nullable, fieldInfo;
      if (this.projectLayer && this.projectLayer.getField(fieldName)) {
        fieldInfo = this.projectLayer.getField(fieldName);
        fieldLength = fieldInfo.length;
        nullable = !fieldInfo.nullable;
      }
      return { fieldLength: fieldLength, nullable: nullable };
    },

    /**
     * This function is used to create buttons
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _createButton: function (label, buttonParent) {
      var buttonNode;
      buttonNode = domConstruct.create("div", {
        "class": "jimu-btn esriCTEllipsis",
        innerHTML: label,
        title: label
      }, buttonParent);
      return buttonNode;
    },

    /**
     * This function is used to load project UI
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _loadProjectUI: function () {
      var loadProjectWrapper, loadProjectName, loadProjectButtonWrap,
        viewInMapBtn, deleteBtn, loadBtn;
      loadProjectWrapper = domConstruct.create("div", { "class": "esriCTLoadProjectWrapper" },
        this.loadProjectContainer);
      loadProjectName = domConstruct.create("div",
        { "class": "esriCTFullwidth esriCTCreateProjectContent" },
        loadProjectWrapper);
      loadProjectButtonWrap = domConstruct.create("div",
        { "class": "esriCTFullwidth esriCTCreateLoadButtonWrap" },
        loadProjectWrapper);
      this.projectNameSelect = new Select({
        "class": "esriCTFullwidth",
        options: this.projectNameOptions
      }, domConstruct.create("div", {}, loadProjectName));
      this.projectNameSelect.startup();
      // View in map button
      viewInMapBtn = this._createButton(
        this.nls.createLoadProject.viewInMapLabel, loadProjectButtonWrap);
      this.own(on(viewInMapBtn, "click", lang.hitch(this, function () {
        this.getProjectAssets("ViewProject");
      })));
      // delete button
      deleteBtn = this._createButton(this.nls.common.deleteText, loadProjectButtonWrap);
      this.own(on(deleteBtn, "click", lang.hitch(this, this._deleteBtnClicked)));
      // load button
      loadBtn = this._createButton(this.nls.createLoadProject.loadLabel, loadProjectButtonWrap);
      this.own(on(loadBtn, "click", lang.hitch(this, function () {
        this.getProjectAssets("LoadProject");
      })));
      return this.loadProjectContainer;
    },

    /**
     * Confirms deleting of the project by asking user the confirmation
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _deleteBtnClicked: function () {
      var deleteConfirmDialog, selectedProject;
      //get selected project
      selectedProject = this.projectNameSelect._getSelectedOptionsAttr();
      //show error if invalid project is selected
      if (!selectedProject || !selectedProject.value) {
        this._showMessage(this.nls.createLoadProject.errorProjectNotSelected);
        return;
      }
      deleteConfirmDialog = new Message({
        message: this.nls.createLoadProject.deleteProjectConfirmationMsg,
        type: "question",
        maxWidth: 375,
        buttons: [{
          "label": this.nls.common.yes, "onClick": lang.hitch(this, function () {
            deleteConfirmDialog.close();
            this.getProjectAssets("DeleteProject");
          })
        }, {
          "label": this.nls.common.no, "onClick": lang.hitch(this, function () {
            deleteConfirmDialog.close();
          })
        }]
      });
    },

    /**
     *  This function is used to query map layer to check if project exist or not
     * @memberOf widgets/CostAnalysis/create-load-project
     * */
    _checkIfProjectExist: function (projectId) {
      var query, queryTask, def;
      def = new Deferred();
      queryTask = new QueryTask(this.projectLayer.url);
      query = new Query();
      query.outFields = [this.projectLayer.objectIdField, this.projectLayer.globalIdField];
      query.returnGeometry = false;
      query.where = this.projectLayer.globalIdField + " = '" + projectId + "'";
      queryTask.execute(query, lang.hitch(this, function (response) {
        if (response && response.features && response.features.length > 0) {
          def.resolve(true);
        } else {
          def.resolve(false);
        }
      }), lang.hitch(this, function () {
        def.resolve(false);
      }));
      return def.promise;
    },

    /**
     * Based on view/load/delete gets the project assets
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    getProjectAssets: function (action) {
      var query, queryTask, assetTable, projectAssetTable, selectedProject;
      //get selected project
      selectedProject = this.projectNameSelect._getSelectedOptionsAttr();
      //show error if invalid project is selected
      if (!selectedProject || !selectedProject.value) {
        this._showMessage(this.nls.createLoadProject.errorProjectNotSelected);
        return;
      }
      this.loadingIndicator.show();
      this._checkIfProjectExist(selectedProject.globalIdValue).then(
        lang.hitch(this, function (projectExist) {
          if (projectExist) {
            assetTable =
              this.layerInfosObj.getTableInfoById(this.config.projectSettings.assetTable).layerObject;
            projectAssetTable = new FeatureLayer(assetTable.url);
            queryTask = new QueryTask(projectAssetTable.url);
            query = new Query();
            query.outFields = ["*"];
            query.returnGeometry = false;
            query.where = this.config.assetTableFields.PROJECTGUID + " = '" +
              selectedProject.globalIdValue + "'";
            queryTask.execute(query, lang.hitch(this, function (response) {
              this.loadingIndicator.hide();
              //if action if viewProject show project on map else load the project
              if (action === "ViewProject") {
                this._showProjectOnMap(selectedProject, response.features);
              } else if (action === "DeleteProject") {
                this._deleteProject(selectedProject, response.features);
              } else {
                this._createAssetTemplateInfo(selectedProject, response.features);
              }
            }), lang.hitch(this, function () {
              this._showMessage(this.nls.createLoadProject.errorInLoadingProject);
              this.loadingIndicator.hide();
            }));
          } else {
            //as project does not exist remove the option from drop-down
            this.projectNameSelect.removeOption(selectedProject.globalIdValue);
            this._showMessage(this.nls.createLoadProject.errorProjectNotFound);
            //emit msg so that in case of reload project panel will be shown
            this.emit("showCreateLoadPrjPanel");
            this.loadingIndicator.hide();
          }
        }), lang.hitch(this, function () {
          this._showMessage(this.nls.createLoadProject.errorInLoadingProject);
          this.emit("showCreateLoadPrjPanel");
          this.loadingIndicator.hide();
        }));
    },

    /**
     * Create asset template info for each assets in project and then loads the project.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _createAssetTemplateInfo: function (selectedProject, assets) {
      var geographyIdArr = [];
      this.loadingIndicator.show();
      //get GUID's of all the regions
      array.forEach(assets, lang.hitch(this, function (currentFeature) {
        var geographyId = currentFeature.attributes[this.config.assetTableFields.GEOGRAPHYGUID];
        if (geographyId) {
          geographyIdArr.push(geographyId);
        }
      }));
      this._getRegionName(geographyIdArr).then(lang.hitch(this, function (regionNameDetails) {
        this.loadingIndicator.hide();
        var assetIds, assetTemplateInfo;
        assetIds = [];
        assetTemplateInfo = {};
        array.forEach(assets, lang.hitch(this, function (currentFeature) {
          var assetGUID, templateInfo = {}, geographyId;
          assetGUID = currentFeature.attributes[this.config.assetTableFields.ASSETGUID];
          geographyId = currentFeature.attributes[this.config.assetTableFields.GEOGRAPHYGUID];
          assetIds.push(assetGUID);
          templateInfo.COSTEQUATION =
            currentFeature.attributes[this.config.assetTableFields.COSTEQUATION];
          templateInfo.SCENARIO =
            currentFeature.attributes[this.config.assetTableFields.SCENARIO];
          templateInfo.TEMPLATENAME =
            currentFeature.attributes[this.config.assetTableFields.TEMPLATENAME];
          templateInfo.GEOGRAPHYGUID = geographyId;
          if (geographyId) {
            templateInfo.GEOGRAPHY = regionNameDetails[geographyId];
          } else {
            templateInfo.GEOGRAPHY = null;
          }
          templateInfo.OBJECTID = currentFeature.attributes[this.config.assetTableFields.OBJECTID];
          assetTemplateInfo[assetGUID] = templateInfo;
        }));
        this._loadProject(selectedProject, assetIds, assetTemplateInfo);
      }), lang.hitch(this, function () {
        this.loadingIndicator.hide();
      }));
    },

    /**
     * Returns deferred with assets of each layer.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _getAssetRequestToLayer: function (globalIds, layerInfo) {
      var queryTask, query, deferred, layer, layerId;
      layerId = layerInfo.layerObject.id;
      layer = layerInfo.layerObject;
      layer.clearSelection();
      deferred = new Deferred();
      queryTask = new QueryTask(layer.url);
      query = new Query();
      query.outFields = ["*"];
      query.returnGeometry = true;
      query.outSpatialReference = this.map.spatialReference;
      query.where = layer.globalIdField + " in ('" + globalIds.join("','") + "')";
      queryTask.execute(query, lang.hitch(this, function (orgAssets) {
        if (orgAssets && orgAssets.features && orgAssets.features.length > 0) {
          deferred.resolve({ "layerId": layerId, "features": orgAssets.features });
        } else {
          deferred.resolve({ "layerId": layerId, "features": [] });
        }
      }), lang.hitch(this, function () {
        deferred.resolve({ "layerId": layerId, "features": [] });
      }));
      return deferred.promise;
    },

    /**
    * This function is used to query map layer to fetch project names
    * @memberOf widgets/CostAnalysis/create-load-project
    */
    _getProjectAdditionalCost: function (projectId) {
      var deferred, query, queryTask, additionalCostTableId, url;
      deferred = new Deferred();
      additionalCostTableId = this.config.projectSettings.multiplierAdditionalCostTable;
      if (additionalCostTableId) {
        url = this.layerInfosObj.getTableInfoById(additionalCostTableId).layerObject.url;
        queryTask = new QueryTask(url);
        query = new Query();
        query.outFields = ["*"];
        query.returnGeometry = false;
        query.where = this.config.projectMultiplierFields.PROJECTGUID + " = '" + projectId + "'";
        queryTask.execute(query, lang.hitch(this, function (response) {
          var features = [];
          if (response && response.features) {
            features = response.features;
          }
          deferred.resolve(features);
        }), lang.hitch(this, function () {
          deferred.resolve([]);
        }));
      } else {
        deferred.resolve([]);
      }
      return deferred.promise;
    },

    /**
     * Gets the region name from the GUID for that region.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _getRegionName: function (geographyGuidArr) {
      var deferred, query, queryTask, costingGeographyLayerObject;
      deferred = new Deferred();
      //check if costing geometry layer is configured and geographyGuidArr length is grater then 0
      if (this.config.projectSettings.costingGeometryLayer &&
        this.config.projectSettings.geographyField && geographyGuidArr.length > 0) {
        costingGeographyLayerObject =
          this.layerInfosObj.getLayerInfoById(this.config.projectSettings.costingGeometryLayer).
            layerObject;
        queryTask = new QueryTask(costingGeographyLayerObject.url);
        query = new Query();
        query.outFields =
          [this.config.projectSettings.geographyField, costingGeographyLayerObject.globalIdField];
        query.returnDistinctValues = true;
        query.returnGeometry = false;
        query.where = costingGeographyLayerObject.globalIdField + " in ('" +
          geographyGuidArr.join("','") + "')";
        queryTask.execute(query, lang.hitch(this, function (response) {
          var features = {};
          if (response && response.features) {
            array.forEach(response.features, lang.hitch(this, function (feature) {
              var id, name;
              id = feature.attributes[costingGeographyLayerObject.globalIdField];
              name = feature.attributes[this.config.projectSettings.geographyField];
              features[id] = name;
            }));
          }
          deferred.resolve(features);
        }), lang.hitch(this, function () {
          deferred.resolve([]);
        }));
      } else {
        deferred.resolve([]);
      }
      return deferred.promise;
    },

    /**
     * Selects the features(assets) on map to highlight
     * @memberOf widgets/CostAnalysis/create-load-project
     */

    _selectFeaturesOnMap: function (globalIds, layerId) {
      var query, deferred, layer;
      //get layer instance by id
      layer = this.layerInfosObj.getLayerInfoById(layerId).layerObject;
      deferred = new Deferred();
      query = new Query();
      query.where = layer.globalIdField + " in ('" + globalIds.join("','") + "')";
      layer.selectFeatures(query, FeatureLayer.SELECTION_NEW, lang.hitch(this, function (features) {
        if (features && features.length > 0) {
          deferred.resolve(features);
        } else {
          deferred.resolve([]);
        }
      }), lang.hitch(this, function () {
        deferred.resolve([]);
      }));
      return deferred.promise;
    },

    /**
     * Initiates the workflow for showing project on map.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _showProjectOnMap: function (selectedProject, assets) {
      var assetIds = [], deferredList = [];
      //create all assetIds array
      array.forEach(assets, lang.hitch(this, function (currentFeature) {
        var assetGUID;
        assetGUID = currentFeature.attributes[this.config.assetTableFields.ASSETGUID];
        assetIds.push(assetGUID);
      }));
      //If no assets to display on map show error
      if (assetIds.length === 0) {
        this._showMessage(this.nls.createLoadProject.noAssetsToViewOnMap);
        return;
      }
      this.loadingIndicator.show();
      //First select project boundary on map
      this._selectFeaturesOnMap([selectedProject.globalIdValue],
        this.config.projectSettings.projectLayer).then(lang.hitch(this, function (projectBoundary) {
          var extentNavigated = false;
          //if valid project boundary set extent to project boundary
          if (projectBoundary.length > 0 && projectBoundary[0].geometry) {
            extentNavigated = true;
            this.map.setExtent(graphicsUtils.graphicsExtent(projectBoundary).expand(1.5));
          }
          //Select assets on map
          array.forEach(this.config.layerSettings, lang.hitch(this, function (assetLayer) {
            if (assetLayer.editable) {
              deferredList.push(this._selectFeaturesOnMap(assetIds, assetLayer.id));
            }
          }));
          //once all assets are selected set extent if project boundary extent is not set on map
          all(deferredList).then(lang.hitch(this, function (entireAssets) {
            var allFeatures = [];
            this.loadingIndicator.hide();
            if (!extentNavigated) {
              array.forEach(entireAssets, lang.hitch(this, function (features) {
                allFeatures = allFeatures.concat(features);
              }));
              if (allFeatures.length > 0) {
                this.map.setExtent(graphicsUtils.graphicsExtent(allFeatures).expand(1.5));
              } else {
                this._showMessage(this.nls.createLoadProject.noAssetsToViewOnMap);
              }
            }
          }));
        }), lang.hitch(this, function () {
          this.loadingIndicator.hide();
          this._showMessage(this.nls.createLoadProject.errorInLoadingProject);
        }));
    },

    /**
     * Deletes records form the table for selected project id.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _deleteFromTable: function (tableID, projectIdField, projectId) {
      var table, queryString, deferred, returnValue;
      table = this.layerInfosObj.getTableInfoById(tableID);
      if (table) {
        table = table.layerObject;
      }
      queryString = projectIdField + " = '" + projectId + "'";
      //If project asset table is configured, delete selected feature
      if (table) {
        returnValue = this.appUtils.deleteFeatures(table.url, queryString);
      } else {
        deferred = new Deferred();
        deferred.resolve(false);
        returnValue = deferred.promise;
      }
      return returnValue;
    },

    /**
     * Initiate the workflow of delete project.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _deleteProject: function (selectedProject, assets) {
      var assetIds = [], projectId, deferredList = [], queryString;
      projectId = selectedProject.globalIdValue;
      this.loadingIndicator.show();
      //create all assetIds array
      array.forEach(assets, lang.hitch(this, function (currentFeature) {
        var assetGUID;
        assetGUID = currentFeature.attributes[this.config.assetTableFields.ASSETGUID];
        assetIds.push(assetGUID);
      }));
      //Delete assets from layer
      if (assetIds.length > 0) {
        array.forEach(this.config.layerSettings, lang.hitch(this, function (assetLayer) {
          var layer, queryString;
          if (assetLayer.editable) {
            layer = this.layerInfosObj.getLayerInfoById(assetLayer.id).layerObject;
            queryString = layer.globalIdField + " in ('" + assetIds.join("','") + "')";
            deferredList.push(this.appUtils.deleteFeatures(layer.url, queryString));
          }
        }));
      }
      //Delete Assets from project asset table
      deferredList.push(
        this._deleteFromTable(this.config.projectSettings.assetTable,
          this.config.assetTableFields.PROJECTGUID, projectId));
      //Delete Additional cost from multiplier additional cost table
      deferredList.push(
        this._deleteFromTable(this.config.projectSettings.multiplierAdditionalCostTable,
          this.config.projectMultiplierFields.PROJECTGUID, projectId));
      //Delete project from project infrastructure layer (project boundary)
      queryString = this.projectLayer.globalIdField + " = '" + selectedProject.globalIdValue + "'";
      deferredList.push(this.appUtils.deleteFeatures(this.projectLayer.url, queryString));
      all(deferredList).then(lang.hitch(this, function () {
        this.loadingIndicator.hide();
        //Make sure the deleted project is removed from drop down
        this.projectNameSelect.removeOption(projectId);
        this._showMessage(this.nls.createLoadProject.projectDeletedMsg);
        //Refresh ProjectInfrastructure Layer so that deleted project should be removed from map
        this.projectLayer.clearSelection();
        this.projectLayer.refresh();
        //Refresh all asset layers so that deleted assets should be removed from map
        array.forEach(this.config.layerSettings, lang.hitch(this, function (assetLayer) {
          var layer;
          if (assetLayer.editable) {
            layer = this.layerInfosObj.getLayerInfoById(assetLayer.id).layerObject;
            layer.clearSelection();
            layer.refresh();
          }
        }));
      }));
    },

    /**
     * Initiate the workflow of load project.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _loadProject: function (selectedProject, assetIds, assetTemplateInfo) {
      var deferredList = [];
      this.loadingIndicator.show();
      //Get all assets if has assetIds
      if (assetIds.length > 0) {
        array.forEach(this.config.layerSettings, lang.hitch(this, function (assetLayer) {
          var layerInfo = this.layerInfosObj.getLayerInfoById(assetLayer.id);
          if (layerInfo && layerInfo.layerObject && assetLayer.editable) {
            deferredList.push(this._getAssetRequestToLayer(assetIds, layerInfo));
          }
        }));
      } else {
        var tempDeferred = new Deferred();
        deferredList.push(tempDeferred.promise);
        tempDeferred.resolve(null);
      }
      all(deferredList).then(lang.hitch(this, function (entireAssets) {
        var assetInfo = {}, projectInfo;
        projectInfo = {
          "name": selectedProject.label,
          "desc": selectedProject.descValue,
          "projectId": selectedProject.globalIdValue,
          "objectId": selectedProject.objectIdValue
        };
        array.forEach(entireAssets, lang.hitch(this, function (assetDetail) {
          if (assetDetail) {
            assetInfo[assetDetail.layerId] = assetDetail.features;
          }
        }));
        this._getProjectAdditionalCost(selectedProject.globalIdValue).then(
          lang.hitch(this, function (additionalCostFeatures) {
            this.loadingIndicator.hide();
            this.emit("loadProject", {
              "assetTemplateInfo": assetTemplateInfo,
              "assetInfo": assetInfo,
              "projectInfo": projectInfo,
              "additionalCostInfo": additionalCostFeatures
            });
          }), lang.hitch(this, function () {
            this.loadingIndicator.hide();
          }));
      }), lang.hitch(this, function () {
        this.loadingIndicator.hide();
      }));
    },

    /**
     * This function is used to create pane UI
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _createAndLoadProjectPanes: function () {
      // data to see the create-load project widget
      if (this.paneListData && this.paneListData.length > 0) {
        this._createOrLoadPrj = new ItemList({
          "itemList": this.paneListData,
          openMultiple: false,
          highlighterColor: this.config.selectedThemeColor
        }, domConstruct.create("div", {}, this.createLoadProjectContainer));
        this._createOrLoadPrj.startup();
      }
    },

    /**
     * This function is used to query map layer to fetch project names
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _getProjectNamesOptions: function () {
      var query, queryTask;
      this.loadingIndicator.show();
      queryTask = new QueryTask(this.projectLayer.url);
      query = new Query();
      query.outFields = [this.projectNameField, this.projectDescField,
      this.projectLayer.objectIdField, this.projectLayer.globalIdField];
      query.returnGeometry = false;
      query.where = "1=1";
      queryTask.execute(query, lang.hitch(this, function (response) {
        var features = [];
        if (response && response.features) {
          features = response.features;
        }
        this._populateProjectNameOptions(features);
      }), lang.hitch(this, function () {
        this.loadingIndicator.hide();
      }));
    },

    /**
     * This function is used to set project name drop-down options
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _populateProjectNameOptions: function (features) {
      //create options from each project and populate as options in a drop-down
      this.projectNameOptions = [{
        label: this.nls.createLoadProject.selectProject,
        value: ""
      }];
      array.forEach(features, lang.hitch(this, function (currentFeature) {
        if (this.projectNameField) {
          if (currentFeature.attributes[this.projectNameField] &&
            lang.trim(currentFeature.attributes[this.projectNameField]) !== "") {
            this.projectNameOptions.push({
              label: currentFeature.attributes[this.projectNameField],
              value: currentFeature.attributes[this.projectLayer.globalIdField],
              descValue: currentFeature.attributes[this.projectDescField],
              globalIdValue: currentFeature.attributes[this.projectLayer.globalIdField],
              objectIdValue: currentFeature.attributes[this.projectLayer.objectIdField]
            });
          }
        }
      }));
      this.projectNameSelect.set("options", lang.clone(this.projectNameOptions));
      this.loadingIndicator.hide();
    },


    /**
     * This function validates if the project name is already used,
     * by searching in the options created for load project.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _validateProjectNameLocally: function (projectName) {
      //loop all the options of load/view/delete project & check if project name already used
      var filteredArr = array.filter(this.projectNameOptions, function (item) {
        //do case insensitive search
        return item.label.toUpperCase() === projectName.toUpperCase();
      });
      if (filteredArr.length > 0) {
        return false;
      }
      return true;
    },

    /**
     * This function validates if entered project name is found in project layer
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _validateForDuplicateProjectName: function (projectName) {
      var query, queryTask, def;
      def = new Deferred();
      queryTask = new QueryTask(this.projectLayer.url);
      query = new Query();
      query.outFields = [this.projectLayer.objectIdField, this.projectLayer.globalIdField];
      query.returnGeometry = false;
      //do case insensitive search for project name in the layer
      query.where = "UPPER(" + this.projectNameField + ") = '" + projectName.toUpperCase() + "'";
      queryTask.execute(query, lang.hitch(this, function (response) {
        if (response && response.features && response.features.length > 0) {
          def.resolve(true);
        } else {
          def.resolve(false);
        }
      }), lang.hitch(this, function () {
        def.resolve(false);
      }));
      return def.promise;
    },

    /**
     * This function adds entry in project layer for entered project name and desc
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _addProjectToLayer: function (projectName, projectDesc) {
      var def, featureData;
      def = new Deferred();
      featureData = new Graphic();
      featureData.attributes = (this.projectLayer.templates.length > 0) ?
        this.projectLayer.templates[0].prototype.attributes :
        this.projectLayer.types[0].templates[0].prototype.attributes;
      featureData.attributes[this.projectNameField] = projectName;
      featureData.attributes[this.projectDescField] = projectDesc;
      this.projectLayer.applyEdits([featureData], null, null, lang.hitch(this,
        function (addResults) {
          def.resolve(addResults[0]);
        }),
        function (err) {
          def.reject(err);
        });
      return def.promise;
    }
  });
});