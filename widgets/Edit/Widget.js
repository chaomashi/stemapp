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
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/html',
    'dojo/i18n!esri/nls/jsapi',
    'dojo/on',
    'dojo/query',
    'dojo/json',
    'dojo/Deferred',
    'dojo/aspect',
    'dojo/promise/all',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidget',
    'jimu/MapManager',
    'jimu/PanelManager',
    'jimu/LayerInfos/LayerInfos',
    'jimu/dijit/LoadingShelter',
    'jimu/dijit/Popup',
    'jimu/utils',
    'jimu/portalUrlUtils',
    //'jimu/portalUtils',
    'jimu/SelectionManager',
    'jimu/Role',
    'esri/dijit/editing/Editor',
    'esri/dijit/Popup',
    "esri/dijit/editing/TemplatePicker",
    "esri/geometry/Extent",
    "esri/geometry/Point",
    "esri/renderers/jsonUtils",
    "esri/graphic",
    "esri/domUtils",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    "dijit/form/Button",
    "./utils",
    './FilterEditor',
    './RelatedRecordsEditor'
  ],
  function(declare, lang, array, html, esriBundle, on, query, Json, Deferred, aspect, all,
    _WidgetsInTemplateMixin, BaseWidget, MapManager, PanelManager, LayerInfos, LoadingShelter, JimuPopup,
    jimuUtils, portalUrlUtils, /*portalUtils,*/ SelectionManager, Role, Editor, Popup, TemplatePicker,
    Extent, Point, rendererJsonUtils, Graphic, domUtils, EsriQuery, QueryTask, Button, editUtils, FilterEditor,
    RelatedRecordsEditor) {
    var Clazz = declare([BaseWidget, _WidgetsInTemplateMixin], {
      name: 'Edit',
      baseClass: 'jimu-widget-edit',
      editor: null,
      _defaultStartStr: "",
      _defaultAddPointStr: "",
      _mapInfoStorage: null,
      _jimuLayerInfos: null,
      editPopup: null,
      _configEditor: null,
      _layerObjectsParaForTempaltePicker: null,
      _createOverDef: null,
      _releaseEventArrayAfterActive: null,
      _releaseEventArrayAfterClose: null,
      _canCreateLayersAreAllInvisibleFlag: null,
      _layerInfoParamArrayUseForRervertRenderre: null,
      layerInfosParam: null,
      tableInfosParam: null,
      layerInfosParamClone: null,
      tableInfosParamClone: null,
      _tableInfoParamDef: null,
      _hasEditPrivilege: null,
      _panelManager: null,
      _originalCloasePanel: null,
      _changedTemplatesOfTemplatePicker: null,
      _releaseEventArrayAfterEditingRelatedGraphic: null,
      _isInEditingRelatedGraphicSession: null,
      _needToRequeryFeatureArray: null,
      _isEditableLayerStore: null,
      _layerInfosInConfig: null,


      postMixInProperties: function(){
        this.nls.done = window.jimuNls.common.done;
      },

      startup: function() {
        this.inherited(arguments);
        this.editPopup = new Clazz.EditPopup(null, html.create("div",
                                                    {"class":"jimu-widget-edit-infoWindow"},
                                                    null,
                                                    this.map.root));
        this.loading = new LoadingShelter({
          hidden: true
        });
        this.loading.placeAt(this.domNode);
      },

      _init: function() {
        this._mapInfoStorage = {
          resetInfoWindow: null,
          snappingTolerance: null,
          editorATIonLayerSelectionChange: null
        };
        this._editorMapClickHandlers = [];
        this._layerObjectsParaForTempaltePicker = [];
        this._configEditor = lang.clone(this.config.editor);
        this._releaseEventArrayAfterActive = [];
        this._releaseEventArrayAfterClose = [];
        this._canCreateLayersAreAllInvisibleFlag = false;
        this._layerInfoParamArrayUseForRervertRenderre = [];
        this._createOverDef = new Deferred();
        this._tableInfoParamDef = new Deferred();
        this._hasEditPrivilege = true;
        this._panelManager = PanelManager.getInstance();
        this._changedTemplatesOfTemplatePicker = [];
        this._releaseEventArrayAfterEditingRelatedGraphic = [];
        this._isInEditingRelatedGraphicSession = false;
        this._needToRequeryFeatureArray = [];
        this._jimuLayerInfos = LayerInfos.getInstanceSync(this.map, this.map.itemInfo);
        this._isEditableLayerStore = {};
        this._layerInfosInConfig = this._getLayerInfosInConfig();
      },

      _initEditPrivilege: function(user) {
        this._hasEditPrivilege = true;
        if(user) {
          var userRole = new Role({
            id: (user.roleId) ? user.roleId : user.role,
            role: user.role
          });
          if(user.privileges) {
            userRole.setPrivileges(user.privileges);
          }

          this._hasEditPrivilege = userRole.canEditFeatures();
        }
        return this._hasEditPrivilege;
      },

      onOpen: function() {
        /*
        var userDef = new Deferred();
        var portal = portalUtils.getPortal(window.portalUrl);
        portal.getUser().then(lang.hitch(this, function(user) {
          userDef.resolve(user);
        }), lang.hitch(this, function() {
          userDef.resolve(null);
        }));

        // beginEditingByFeatures can be called from outside,
        // so _init must be called before userDef resolved.
        userDef.then(lang.hitch(this, function(user) {
          this._initEditPrivilege(user);
          if(!this._hasEditPrivilege) {
            this.editWidgetTitle.innerHTML = window.jimuNls.noEditPrivileges;
            return;
          }
        }));
        */

        /*
            var userDef = new Deferred();
            var portal = portalUtils.getPortal(window.portalUrl);
            portal.getUser().then(lang.hitch(this, function(user) {
              userDef.resolve(user);
            }), lang.hitch(this, function() {
              userDef.resolve(null);
            }));
        */

        // beginEditingByFeatures can be called from outside,
        // so _init must be called before userDef resolved.
        this._init();

        this.loading.show();
        this._asyncPrepareDataAtStart().then(lang.hitch(this, function() {
          var timeoutValue;
          if(this.appConfig.theme.name === "BoxTheme") {
            timeoutValue = 1050;
            this.loading.show();
          } else {
            timeoutValue = 1;
          }
          setTimeout(lang.hitch(this, function() {
            if(!this.loading.hidden) {
              this.loading.hide();
            }
            this.widgetManager.activateWidget(this);
            this._createEditor();
          }), timeoutValue);

          //prepare tableInfosParam data for relatedRecordsEditor
          this._getTableInfosParam().then(lang.hitch(this, function(tableInfosParam) {
            this.tableInfosParam = tableInfosParam;
            this.tableInfosParamClone = this._cloneLayerOrTableInfosParam(this.tableInfosParam);
            this._tableInfoParamDef.resolve();
          }));
          this.loading.hide();
        }), lang.hitch(this, function() {
          this.loading.hide();
        }));
      },

      /*******************************
       * Public methods
       * *****************************/

      beginEditingByFeatures: function(features, featureLayer) {
        // features probably is empty.
        if(!featureLayer) {
          return;
        }

        var firstFeaturePoint = null;
        var firstFeature = features[0];
        var firstFeatureGeometry = (firstFeature && firstFeature.geometry) ||
          (featureLayer._wabProperties &&
           featureLayer._wabProperties.popupInfo.originalFeature.geometry);
        if(firstFeatureGeometry) {
          if(firstFeatureGeometry.type === 'point') {
            firstFeaturePoint = firstFeatureGeometry;
          } else {
            firstFeaturePoint = firstFeatureGeometry.getExtent().getCenter();
          }
        }

        this._createOverDef.then(lang.hitch(this, function() {
          // active if state is deactive
          if(this.state !== 'active') {
            this.widgetManager.activateWidget(this);
          }

          // clear selection for all featureLayers.
          array.forEach(this._jimuLayerInfos.getLayerInfoArray(), function(jimuLayerInfo) {
            if(jimuLayerInfo.layerObject && jimuLayerInfo.layerObject.clearSelection) {
              SelectionManager.getInstance().clearSelection(jimuLayerInfo.layerObject);
            }
          }, this);

          if(firstFeature && firstFeature.geometry) {
            // var query = new Query();
            // query.where = prepareWhereExpression();
            // featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, lang.hitch(this, function(features) {
            // }));
            SelectionManager.getInstance().setSelection(featureLayer, features).then(lang.hitch(this, function() {
              var selectedFeatures = featureLayer.getSelectedFeatures();
              this.editor._updatePopupButtons(selectedFeatures);
              this.editor._onEditFeature(selectedFeatures, firstFeaturePoint);
            }));
          } else {
            // features without geometry
            this.editPopup.show(firstFeaturePoint);
            /*
            var popupTitle;
            var featuresCount = features.length;
            this.editor._updatePopupButtons(features);
            if(featuresCount === 1) {
              popupTitle = featureLayer.name;
            } else {
              popupTitle = "(1 of " + featuresCount + ")";
            }
            this.editPopup.setTitle(popupTitle);
            */
            var originalFeature =
              lang.getObject('_wabProperties.popupInfo.originalFeature', false, featureLayer);
            var operationDataFromPopup =
              lang.getObject('_wabProperties.popupInfo.operationDataForListRelatedRecords', false, featureLayer);
            this._createRelatedRecordsEditor(originalFeature).then(lang.hitch(this, function() {
              if(!operationDataFromPopup && firstFeature) {
                // show showInspector
                this._relatedRecordsEditor.showInspector(this._relatedRecordsEditor._createOperationData(
                  null,
                  null,
                  this._jimuLayerInfos.getTableInfoById(featureLayer.id),
                  firstFeature));
              } else {
                //show relatedRecords
                this._relatedRecordsEditor.showRelatedRecords(this._relatedRecordsEditor._createOperationData(
                  operationDataFromPopup.feature,
                  operationDataFromPopup.oriJimuLayerInfo,
                  operationDataFromPopup.destJimuLayerInfo
                  ));
              }
            }));
          }
        }));

        /*
        function prepareWhereExpression() {
          var endMark;
          var whereExpression = " ";
          array.forEach(features, function(feature, index) {
            if(index === features.length - 1) {
              endMark = " ";
            } else {
              endMark = " OR ";
            }
            whereExpression += featureLayer.objectIdField + " = " +
                               feature.attributes[featureLayer.objectIdField] +
                               endMark;
          }, this);
          return whereExpression;
        }
        */
      },



      /*******************************
       * Methods for control popup
       *******************************/
      onActive: function(){
        if(this._hasEditPrivilege) {
          this.disableWebMapPopup();
          this._bindEventAfterActive();
          // replace closePanel with confirm dialog
          if(this._configEditor.usingSaveButton) {
            //this._originalCloasePanel = lang.hitch(this._panelManager, this._panelManager.closePanel);
            this._originalCloasePanel = this._panelManager.closePanel;
            this._panelManager.closePanel = this._wrapExistFunctionWithConfirmDialog(this._panelManager,
                                                                                     this._originalCloasePanel);
          }
        }
      },

      onDeActive: function(){
        if(this._hasEditPrivilege) {
          this.enableWebMapPopup();
          this._releaseEventAfterActive();
          if(this.editor && this.editor.templatePicker) {
            this.editor.templatePicker.clearSelection();
          }
          // restore closePanel with confirm dialog
          if(this._configEditor.usingSaveButton) {
            this._panelManager.closePanel = this._originalCloasePanel;
          }
          // requery features if needed.
          array.forEach(this._needToRequeryFeatureArray, function(feature) {
            this._requeryFeature(feature);
          }, this);
          this._needToRequeryFeatureArray = [];
        }
      },

      disableWebMapPopup: function() {
        var mapManager = MapManager.getInstance();
        mapManager.disableWebMapPopup();
        // hide map's infoWindow
        this.map.infoWindow.hide();
        // instead of map's infowindow by editPopup
        this.map.setInfoWindow(this.editPopup);
        this._enableMapClickHandler();

        // instead of Mapmanager.resetInfoWindow by self resetInfoWindow
        if (this._mapInfoStorage.resetInfoWindow === null) {
          this._mapInfoStorage.resetInfoWindow = mapManager.resetInfoWindow;
          this.own(on(this.map.infoWindow, "show", lang.hitch(this, function() {
            if (window.appInfo.isRunInMobile) {
              this.map.infoWindow.maximize();
              setTimeout(lang.hitch(this, function() {
                // cannot add class 'esriPopupMaximized' while calling maximize() immediately after call show().
                html.addClass(this.editPopup.domNode, 'esriPopupMaximized');
              }), 1);
            }
          })));
        }
        mapManager.resetInfoWindow = lang.hitch(this, function() {});

        // backup map snappingTolerance and reset it.
        if(this.map.snappingManager && this._configEditor.snappingTolerance !== undefined) {
          this._mapInfoStorage.snappingTolerance = this.map.snappingManager.tolerance;
          // default value is 15 pixels, compatible with old version app.
          this.map.snappingManager.tolerance = this._configEditor.snappingTolerance;
        }
      },

      enableWebMapPopup: function() {
        var mapManager = MapManager.getInstance();
        var mapInfoWindow = mapManager.getMapInfoWindow();
        // revert restInfoWindow when close widget.
        if (this._mapInfoStorage.resetInfoWindow) {
          this.map.setInfoWindow(mapInfoWindow.bigScreen);
          mapManager.isMobileInfoWindow = false;

          mapManager.resetInfoWindow =
            lang.hitch(mapManager, this._mapInfoStorage.resetInfoWindow);
          this._mapInfoStorage.resetInfoWindow = null;
          mapManager.resetInfoWindow();
          this._disableMapClickHandler();
          // hide popup and clear selection
          this.editPopup.hide();
          // don't clear selection if current session is at editing
          if(!this._isEditingSession) {
            this.editor._clearSelection();
          }
          // recall enableWebMap
          mapManager.enableWebMapPopup();
        }
        // revert map snappingTolerance.
        if(this.map.snappingManager && this._mapInfoStorage.snappingTolerance !== null) {
          this.map.snappingManager.tolerance = this._mapInfoStorage.snappingTolerance;
        }
      },

      _enableMapClickHandler: function() {
        if (this.editor) {
          this._editorMapClickHandlers.push(this.editor._mapClickHandler);
          this.editor._enableMapClickHandler();
          this._editorMapClickHandlers.push(this.editor._mapClickHandler);
        }
      },

      _disableMapClickHandler: function() {
        if (this.editor) {
          this.editor._disableMapClickHandler();
          array.forEach(this._editorMapClickHandlers, function(editorMapClickHandler) {
            if(editorMapClickHandler && editorMapClickHandler.remove) {
              editorMapClickHandler.remove();
            }
          }, this);
          this._editorMapClickHandlers = [];
        }
      },

      /***************************************
       * Methods for data handle.
       ***************************************/

      _cloneLayerOrTableInfosParam: function(layerOrTableInfosParam) {
        var layerOrTableInfosParamClone = [];
        array.forEach(layerOrTableInfosParam, function(layerOrTableInfo) {
          var featureLayerBK = layerOrTableInfo.featureLayer;
          layerOrTableInfo.featureLayer = null;
          var newLayerOrTableInfo = lang.clone(layerOrTableInfo);
          newLayerOrTableInfo.featureLayer = featureLayerBK;
          layerOrTableInfo.featureLayer = featureLayerBK;
          layerOrTableInfosParamClone.push(newLayerOrTableInfo);
        }, this);
        return layerOrTableInfosParamClone;
      },

      _isTemporaryFeatureForAddOnlyMode: function(feature) {
        var layer = feature.getLayer();
        var layerInfo = this._jimuLayerInfos.getLayerOrTableInfoById(layer && layer.id);
        var isTemporaryFeature = false;
        //if feature service is 'add feature only', currentFeature is a local temporary graphic,
        //edit will add it to client first, so widget does not need to show related tables or re-query.
        //in this situation, the featureLayer id "map_graphics".
        if(layerInfo) {
          isTemporaryFeature = false;
        } else {
          isTemporaryFeature = true;
        }
      },

      /***************************************
       * Methods for prepare to create Editor.
       ***************************************/
      _getDefaultFieldInfos: function(layerId) {
        // summary:
        //  filter webmap fieldInfos.
        // description:
        //   return null if fieldInfos has not been configured in webmap.
        var fieldInfos = editUtils.getFieldInfosFromWebmap(layerId, this._jimuLayerInfos);
        if(fieldInfos) {
          fieldInfos = array.filter(fieldInfos, function(fieldInfo) {
            return fieldInfo.visible || fieldInfo.isEditable;
          });
        }
        return fieldInfos;
      },


      _getDefaultLayerInfoById: function(layerId) {
        var fieldInfos;
        var layerInfo = {
          featureLayer: {}
        };
        layerInfo.featureLayer.id = layerId;
        layerInfo.disableGeometryUpdate = false;
        fieldInfos = this._getDefaultFieldInfos(layerId);
        //If nothing is specified all fields, except the ObjectId and GlobalId are displayed.
        if(fieldInfos && fieldInfos.length > 0) {
          layerInfo.fieldInfos = fieldInfos;
        }
        return layerInfo;
      },

      _getDefaultTableInfos: function() {
        var defaultTableInfos = [];
        var tableInfoArray = this._jimuLayerInfos.getTableInfoArray();
        array.forEach(tableInfoArray, function(tableInfo) {
          var defaultTableInfo = this._getDefaultLayerInfoById(tableInfo.id);
          defaultTableInfos.push(defaultTableInfo);
        }, this);
        return defaultTableInfos;
      },

      _getDefaultLayerInfos: function() {
        var defaultLayerInfos = [];
        for(var i = this.map.graphicsLayerIds.length - 1; i >= 0 ; i--) {
          var layerObject = this.map.getLayer(this.map.graphicsLayerIds[i]);
          if (layerObject.type === "Feature Layer" && layerObject.url) {
            /*
            var layerInfo = {
              featureLayer: {}
            };
            layerInfo.featureLayer.id = layerObject.id;
            layerInfo.disableGeometryUpdate = false;
            fieldInfos = this._getDefaultFieldInfos(layerObject.id);
            //If nothing is specified all fields, except the ObjectId and GlobalId are displayed.
            if(fieldInfos && fieldInfos.length > 0) {
              layerInfo.fieldInfos = fieldInfos;
            }
            */
            var layerInfo = this._getDefaultLayerInfoById(layerObject.id);
            defaultLayerInfos.push(layerInfo);
          }
        }
        return defaultLayerInfos;
      },

      _asyncPrepareDataAtStart: function() {
        var isEditableDefs = [];
        array.forEach(this._layerInfosInConfig, function(layerInfoInConfig) {
          var layerId = layerInfoInConfig.featureLayer.id;
          //var layerObject = this.map.getLayer(layerId);
          var jimuLayerInfo = this._jimuLayerInfos.getLayerInfoByTopLayerId(layerId);

          if(jimuLayerInfo) {
            var isEditableDef = jimuLayerInfo.isEditable();
            isEditableDef._layerInfoInConfig = layerInfoInConfig;
            isEditableDefs.push(isEditableDef);
          }
        }, this);

        return all(isEditableDefs).then(lang.hitch(this, function(isEditables) {
          array.forEach(isEditables, function(isEditable, index) {
            var layerInfoInfoInConfig = isEditableDefs[index]._layerInfoInConfig;
            var layerId = layerInfoInfoInConfig &&
                layerInfoInfoInConfig.featureLayer &&
                layerInfoInfoInConfig.featureLayer.id;
            this._isEditableLayerStore[layerId] = isEditable;
          }, this);
          return;
        }));
      },

      _getLayerInfosInConfig: function() {
        var layerInfos;
        if(!this._configEditor.layerInfos) {
          // configured in setting page and no layers checked.
          layerInfos = [];
        } else if(this._configEditor.layerInfos.length > 0)  {
          // configured and has been checked.
          layerInfos = this._converConfiguredLayerInfos(this._configEditor.layerInfos);
        } else {
          // has not been configured.
          layerInfos = this._getDefaultLayerInfos();
        }
        return layerInfos;
      },

      _converConfiguredLayerInfos: function(layerInfos) {
        array.forEach(layerInfos, function(layerInfo) {
          // convert layerInfos to compatible with old version
          if(!layerInfo.featureLayer.id && layerInfo.featureLayer.url) {
            var layerObject = getLayerObjectFromMapByUrl(this.map, layerInfo.featureLayer.url);
            if(layerObject) {
              layerInfo.featureLayer.id = layerObject.id;
            }
          }

          // convert fieldInfos
          var newFieldInfos = [];
          var webmapFieldInfos =
            editUtils.getFieldInfosFromWebmap(layerInfo.featureLayer.id, this._jimuLayerInfos);
          array.forEach(layerInfo.fieldInfos, function(fieldInfo) {
            // compitible with old version of config,
            // to decide which field will display in the inspector.
            var webmapFieldInfo = getFieldInfoFromWebmapFieldInfos(webmapFieldInfos, fieldInfo);
            if(fieldInfo.visible === undefined) {
              // compatible with old version fieldInfo that does not defined
              // the visible attribute.
              if(webmapFieldInfo) {
                if( webmapFieldInfo.isEditable ||
                    webmapFieldInfo.isEditableSettingInWebmap ||
                    webmapFieldInfo.visible) {
                  newFieldInfos.push(webmapFieldInfo);
                }
              } else {
                newFieldInfos.push(fieldInfo);
              }
            } else {
              // the fieldInfo has defined the visble attribute(since online4.1).
              if(fieldInfo.visible || fieldInfo.isEditable) {
                //push to newFieldInfos
                if(webmapFieldInfo) {
                  newFieldInfos.push(webmapFieldInfo);
                } else {
                  newFieldInfos.push(fieldInfo);
                }
              }
            }
          }, this);

          if(newFieldInfos.length !== 0) {
            layerInfo.fieldInfos = newFieldInfos;
          }
        }, this);
        return layerInfos;

        function getFieldInfoFromWebmapFieldInfos(webmapFieldInfos, fieldInfo) {
          var resultFieldInfo = null;
          if(webmapFieldInfos) {
            for(var i = 0; i < webmapFieldInfos.length; i++) {
              if(fieldInfo.fieldName === webmapFieldInfos[i].fieldName) {
                webmapFieldInfos[i].label = fieldInfo.label;
                webmapFieldInfos[i].isEditableSettingInWebmap = webmapFieldInfos[i].isEditable;
                webmapFieldInfos[i].isEditable = fieldInfo.isEditable;
                resultFieldInfo = webmapFieldInfos[i];
                // resultFieldInfo.label = fieldInfo.label;
                // resultFieldInfo.isEditableSettingInWebmap = webmapFieldInfos[i].isEditable;
                // resultFieldInfo.isEditable = fieldInfo.isEditable;
                break;
              }
            }
          }
          return resultFieldInfo;
        }

        function getLayerObjectFromMapByUrl(map, layerUrl) {
          var resultLayerObject = null;
          for(var i = 0; i < map.graphicsLayerIds.length; i++) {
            var layerObject = map.getLayer(map.graphicsLayerIds[i]);
            if(layerObject &&
               layerObject.url &&
               (portalUrlUtils.removeProtocol(layerObject.url.toLowerCase()) ===
                portalUrlUtils.removeProtocol(layerUrl.toLowerCase()))) {
              resultLayerObject = layerObject;
              break;
            }
          }
          return resultLayerObject;
        }
      },

      _getLayerInfosParam: function() {
        var layerInfos = this._layerInfosInConfig;
        var resultLayerInfosParam = [];

        //according to conditions to filter
        array.forEach(layerInfos, function(layerInfo) {
          var layerId = layerInfo.featureLayer.id;
          var layerObject = this.map.getLayer(layerId);
          if(layerObject &&
             layerObject.visible &&
             //layerObject.isEditable &&
             //layerObject.isEditable()) {
             //jimuLayerInfo &&
             //jimuLayerInfo.isEditable(this._user)
             this._isEditableLayerStore[layerId]) {
            layerInfo.featureLayer = layerObject;
            resultLayerInfosParam.push(layerInfo);
          }

          // update this._canCreateLayersAreAllInvisibleFlag
          if(!this._canCreateLayersAreAllInvisibleFlag &&
             layerObject &&
             //layerObject.isEditable &&
             //layerObject.isEditable() &&
             //jimuLayerInfo &&
             //jimuLayerInfo.isEditable(this._user) &&
             this._isEditableLayerStore[layerId] &&
             layerObject.getEditCapabilities &&
             layerObject.getEditCapabilities().canCreate &&
             !layerObject.visible) {
            this._canCreateLayersAreAllInvisibleFlag = true;
          }
        }, this);

        this.layerInfosParam = resultLayerInfosParam;
        this.layerInfosParamClone = this._cloneLayerOrTableInfosParam(this.layerInfosParam);
        return resultLayerInfosParam;
      },

      _getTemplatePicker: function(layerInfos) {
        this._layerObjectsParaForTempaltePicker = [];

        array.forEach(layerInfos, function(layerInfo) {
          if(layerInfo.featureLayer &&
            layerInfo.featureLayer.getEditCapabilities &&
            layerInfo.featureLayer.getEditCapabilities().canCreate) {
            this._layerObjectsParaForTempaltePicker.push(layerInfo.featureLayer);
          }
        }, this);

        var bottomStyle = this._configEditor.toolbarVisible ? "" : "bottom: 0px";
        var topStyle = this._configEditor.useFilterEdit ?
                       "top: " + Clazz.TOP_WITH_TEMPLATE_FILTER :
                       "top: " + Clazz.TOP;
        var templatePicker = new TemplatePicker({
          featureLayers: this._layerObjectsParaForTempaltePicker,
          grouping: true,
          rows: "auto",
          columns: "auto",
          style: bottomStyle + ";" + topStyle
        }, html.create("div", {}, this.domNode));
        templatePicker.startup();
        return templatePicker;
      },

      _getSettingsParam: function() {
        var settings = {
          map: this.map,
          createOptions: {
            polygonDrawTools: [
              Editor.CREATE_TOOL_ARROW,
              Editor.CREATE_TOOL_AUTOCOMPLETE,
              Editor.CREATE_TOOL_CIRCLE,
              Editor.CREATE_TOOL_ELLIPSE,
              Editor.CREATE_TOOL_RECTANGLE,
              Editor.CREATE_TOOL_TRIANGLE,
              Editor.CREATE_TOOL_POLYGON,
              Editor.CREATE_TOOL_FREEHAND_POLYGON
            ],
            polylineDrawTools: [
              Editor.CREATE_TOOL_POLYLINE,
              Editor.CREATE_TOOL_FREEHAND_POLYLINE
            ]
          }
        };
        for (var attr in this._configEditor) {
          settings[attr] = this._configEditor[attr];
        }
        settings.layerInfos = this._getLayerInfosParam();
        settings.templatePicker = this._getTemplatePicker(settings.layerInfos);
        // set popup tolerance
        if(this._configEditor.popupTolerance !== undefined) {
          settings.singleSelectionTolerance = this._configEditor.popupTolerance;
        }

        return settings;
      },

      _createEditor: function() {
        var params = {
          settings: this._getSettingsParam()
        };
        this._worksBeforeCreate(params.settings);
        this.editor = new Editor(params, html.create("div", {}, this.domNode));
        this.editor.startup();
        this._worksAfterCreate(params.settings);
      },

      /***************************************
      * Methods for extra works
      ****************************************/
      _addButtonToInspector: function() {
        var closeButton = new Button({
          "label": this.nls.close,
          "class": " atiButton close-button"
        }, html.create("div"));

        html.place(closeButton.domNode,
                   this.editor.attributeInspector.deleteBtn.domNode,
                   "before");
        this.own(on(closeButton, 'click', lang.hitch(this, function() {
          this.editPopup.hide();
        })));


        // add save button to attribute inspector
        if(this._configEditor.usingSaveButton) {
          var saveButton = new Button({
            "label": window.jimuNls.common.save,
            "class": " atiButton save-button disable"
          }, html.create("div"));

          html.place(saveButton.domNode,
                     this.editor.attributeInspector.deleteBtn.domNode,
                     "after");
          var attributeInspector = this.editor.attributeInspector;

          this.own(on(saveButton, 'click', lang.hitch(this, function() {
            if(!this._isEditingSession) {
              return;
            }

            var temporaryAttributes = attributeInspector._currentFeature &&
                                      attributeInspector._currentFeature._wabSetTemporaryAttributes;
            var currentSelectedFeature = attributeInspector._currentFeature;
            var currentSelectedLayer = currentSelectedFeature && currentSelectedFeature.getLayer();
            var originalFeature = new Graphic(lang.clone(currentSelectedFeature.toJson()));
            //originalFeature.setAttributes(lang.clone(currentSelectedFeature.attributes));

            if(currentSelectedLayer) {
              for(var fieldName in temporaryAttributes) {
                if(temporaryAttributes.hasOwnProperty(fieldName) &&
                   (typeof temporaryAttributes[fieldName] !== 'function')) {
                  currentSelectedFeature.attributes[fieldName] = temporaryAttributes[fieldName];
                }
              }

              // show loading by editor dijit
              /*
              //currentSelectedLayer.applyEdits(null, [currentSelectedFeature], null, lang.hitch(this, function() {
              // Update Attributes Only
              this.editor._updateFeature(currentSelectedFeature, lang.hitch(this, function() {
              */
              //using this.editor._applyEdits to support undo/redo
              var tempFeature = new Graphic();
              tempFeature.setAttributes(currentSelectedFeature.attributes);
              //this.editor._undoRedoAdd();
              this.editor._applyEdits([{
                layer: currentSelectedLayer,
                updates: [tempFeature],
                preUpdates: [originalFeature]
              }], lang.hitch(this, function() {
                // will allow to switch edit page or close popup.
                this._stopEditingSession();
              }), true);

            }
          })));

          var that = this;
          attributeInspector.onAttributeChange = lang.hitch(attributeInspector,
                                                            function(feature, fieldName, newFieldValue) {
            /*jshint unused: false*/
            that._startEditingSession();
            attributeInspector._currentFeature._wabSetTemporaryAttributes[fieldName] = newFieldValue;

          });

          // var originalHideOfPopup = this.editPopup.hide;
          // this.editPopup.hide = this._wrapExistFunctionWithConfirmDialog(this.editPopup, originalHideOfPopup);

          this.editPopup.hideWidthConfirmDialog =
            this._wrapExistFunctionWithConfirmDialog(this.editPopup, this.editPopup.hideWidthConfirmDialog);

          var originalNextOfInspector = this.editor.attributeInspector.next;
          this.editor.attributeInspector.next =
            this._wrapExistFunctionWithConfirmDialog(this.editor.attributeInspector, originalNextOfInspector);

          var originalPreviousOfInspector = this.editor.attributeInspector.previous;
          this.editor.attributeInspector.previous =
            this._wrapExistFunctionWithConfirmDialog(this.editor.attributeInspector, originalPreviousOfInspector);

          this.own(aspect.before(this.editor, '_deleteFeature', lang.hitch(this, function() {
            if(this._configEditor.usingSaveButton) {
              this._stopEditingSession();
            }
          })));

        }

      },


      _startEditingSession: function() {
        // start the editing session;

        var attributeInspector = this.editor.attributeInspector;
        // set temporaryAttribute for attributeInspector._currentFeature,
        // it does not matter if it's called from the relatedRecordEditor
        if(attributeInspector._currentFeature && !attributeInspector._currentFeature._wabSetTemporaryAttributes) {
          attributeInspector._currentFeature._wabSetTemporaryAttributes = {};
        }

        if(!this._isEditingSession) {
          this._isEditingSession = true;

          //disable map click handler
          this._disableMapClickHandler();
          this._temporatyMapClickHandle = on(this.map, "click", lang.hitch(this, function() {
            // pass true will clear selection when hide popup
            this.editPopup.hide('clear-selection');
          }));

          //set onbeforeunload
          window.onbeforeunload = lang.hitch(this, function() {
            //this.editPopup.hide(true);
            return "";
          });
        }

        // highlight save button
        query(".atiButton.save-button", this.editPopup.domNode).removeClass("disable");
      },

      _stopEditingSession: function() {
        // stop the editing session;

        // guarantee for if widget has been closed.
        if(!this.editor) {
          return;
        }

        var attributeInspector = this.editor.attributeInspector;
        // clear temporaryAttribute for attributeInspector._currentFeature,
        // it does not matter if it's called from the relatedRecordEditor
        if(attributeInspector._currentFeature && attributeInspector._currentFeature._wabSetTemporaryAttributes) {
          attributeInspector._currentFeature._wabSetTemporaryAttributes = null;
        }

        if(this._isEditingSession) {
          this._isEditingSession = false;

          //enable map click handler
          //do not eanble map click if current is inactive.
          if(this.state === "active") {
            this._enableMapClickHandler();
          } else {
            // clear selection
            this.editor._clearSelection();
            // hide current editPopup, must after set this._isEditingSession to false
            this.editPopup.hide();
          }
          if(this._temporatyMapClickHandle) {
            this._temporatyMapClickHandle.remove();
          }

          // remove onbeforeunload
          window.onbeforeunload = null;
        }

        // gray save button
        query(".atiButton.save-button", this.editPopup.domNode).addClass("disable");
      },

      _wrapExistFunctionWithConfirmDialog: function(originalTarget, originalFunction) {
        return lang.hitch(this, function(clearSelection) {
          if(this._isEditingSession) {
            if(this.editPopup.jimuPopup) {
              return;
            }
            var thatArguments = arguments;
            this._popupConfirmDialog(lang.hitch(this, function() {
              originalFunction.apply(originalTarget, thatArguments);
              if(clearSelection === "clear-selection") {
                this.editor._clearSelection();
              }
            }), null);

          } else {
            //this._stopEditingSession();
            originalFunction.apply(originalTarget, arguments);
          }

        });
      },

      _popupConfirmDialog: function(callBack1, callBack2) {
        var resultDef = new Deferred();
        var containerDomNode = query(".esriPopupWrapper", this.editPopup.domNode)[0];
        if(this._isEditingSession && !this.editPopup.jimuPopup && containerDomNode) {
          this.editPopup.jimuPopup = new JimuPopup({
            content: window.jimuNls.popup.leaveConfirm,
            container: containerDomNode,
            //titleLabel: this.nls.toHomeTitle,
            //autoHeight: true,
            width: 400,
            height: 175,
            buttons: [{
              label: window.jimuNls.common.leave,
              onClick: lang.hitch(this, function() {
                  this.editPopup.jimuPopup.close();
                  this.editPopup.jimuPopup = null;
                  this._stopEditingSession();
                  this.editor.attributeInspector.refresh();
                  if(callBack1) {
                    callBack1();
                  }
                  resultDef.resolve(true);
                })
            }, {
              label: window.jimuNls.common.stay,
              classNames: ['jimu-btn-cancle'],
              onClick: lang.hitch(this, function() {
                this.editPopup.jimuPopup.close();
                this.editPopup.jimuPopup = null;
                if(callBack2) {
                  callBack2();
                }
                resultDef.resolve(false);
              })
            }]
          });
        } else {
          resultDef.resolve(true);
        }
        return resultDef;
      },

      _addFilterEditor: function(settings) {
        if (this._configEditor.useFilterEdit) {
          this._filterEditor = new FilterEditor({
            _settings: settings,
            _editWidget: this
          }, html.create("div", {}, this.domNode));
        }
      },

      _worksBeforeCreate: function(settings) {
        // change string of mouse tooltip
        var additionStr = "<br/>" + "(" + this.nls.pressStr + "<b>" +
          this.nls.ctrlStr + "</b> " + this.nls.snapStr + ")";
        this._defaultStartStr = esriBundle.toolbars.draw.start;
        this._defaultAddPointStr = esriBundle.toolbars.draw.addPoint;
        esriBundle.toolbars.draw.start =
          esriBundle.toolbars.draw.start + additionStr;
        esriBundle.toolbars.draw.addPoint =
          esriBundle.toolbars.draw.addPoint + additionStr;

        /*
        // hide label layer.
        var labelLayer = this.map.getLayer("labels");
        if(labelLayer) {
          labelLayer.hide();
        }
        */

        // change render to service render if renderer has been changed.
        this._changeToServiceRenderer(settings);
      },

      _worksAfterCreate: function(settings) {
        // add button to atiInspector
        this._addButtonToInspector();

        // disable delete button in the toolbar
        if(this._configEditor.toolbarVisible) {
          this._disableDeleteBtnInToolbar();
        }

        // resize editPopup
        this.editPopup.resize(500, 251);
        // update templatePicker for responsive.
        this.editor.templatePicker.update(true);
        // // reset default selectionSymbol that change by Editor dijit.
        // array.forEach(this.editor.settings.layerInfos, function(layerInfo) {
        //   layerInfo.featureLayer.setSelectionSymbol();
        // }, this);

        // add FilterEditor
        this._addFilterEditor(settings);

        // bind events after create.
        this._bindEventsAfterCreate(settings);

        // last calling of _worksAfterCreate.
        this._createOverDef.resolve();

        //this._startEditingRelatedGraphic({"key": "facname", "value": "xyz"}); //************

        // change message of templatePicker
        if(settings.layerInfos.length === 0) {
          var messageNode = query("[class~=dojoxGridMasterMessages]", this.editor.templatePicker.domNode);
          if(messageNode && messageNode[0]) {
            if(this._canCreateLayersAreAllInvisibleFlag) {
              messageNode[0].innerHTML = this.nls.noCanCreateLayerAreCurrentlyVisible;
            } else {
              messageNode[0].innerHTML = window.jimuNls.noEditableLayers;
            }
          }
        }

        // prepare attributeInspector loading shelter
        this.ATILoading = new LoadingShelter({
          hidden: true
        }).placeAt(this.editor.attributeInspector.domNode);
      },

      _worksAfterClose: function() {
        esriBundle.toolbars.draw.start = this._defaultStartStr;
        esriBundle.toolbars.draw.addPoint = this._defaultAddPointStr;

        // show lable layer.
        var labelLayer = this.map.getLayer("labels");
        if(labelLayer) {
          labelLayer.show();
        }

        // destroy filterEditor.
        if(this._filterEditor) {
          this._filterEditor.destroy();
        }

        // revert renderer to layer renderer.
        this._revertToLayerRenderer();

        // release event after close
        this._releaseEventAfterClose();
      },


      _bindEventsAfterCreate: function(settings) {
        /*
        this.own(on(this.editor.editToolbar,
              'graphic-move-start',
              lang.hitch(this, this._onGraphicMoveStart)));
        */

        this.own(on(this.editor.editToolbar,
              'graphic-move-stop',
              lang.hitch(this, this._onGraphicMoveStop)));

        // prepare for editing related records
        this.own(on(this.editor.attributeInspector,
                 'next',
                 lang.hitch(this, this._onNextOfEditorATI)));

        var handle = on(this.editPopup,
                        'show',
                        lang.hitch(this, this._onEditorPopupShow));

        this._releaseEventArrayAfterClose.push(handle);
        handle = on(this.editPopup,
                    'hide',
                    lang.hitch(this, this._onEditorPopupHide));
        this._releaseEventArrayAfterClose.push(handle);

        // listen selection change event for every layer.
        // use for control delete button.
        array.forEach(settings.layerInfos, function(layerInfo) {
          handle = on(layerInfo.featureLayer,
                      'selection-complete',
                      lang.hitch(this, this._onLayerSelectionChange));
          this._releaseEventArrayAfterClose.push(handle);
        }, this);

        // listen onRowClick for activing edit widget befor clicke graphic template.
        handle = aspect.before(this.editor.templatePicker.grid, 'onRowClick', lang.hitch(this, function() {
          if(this.state !== 'active') {
            this.widgetManager.activateWidget(this);
          }
        }));
        this._releaseEventArrayAfterClose.push(handle);
      },

      _releaseEventAfterClose: function() {
        array.forEach(this._releaseEventArrayAfterClose, function(handle) {
          handle.remove();
        }, this);
        this._releaseEventArrayAfterClose = [];
      },

      _bindEventAfterActive: function() {
        var handle = aspect.before(this.map,
              'onClick',
              lang.hitch(this, this._beforeMapClick));
        this._releaseEventArrayAfterActive.push(handle);
      },

      _releaseEventAfterActive: function() {
        array.forEach(this._releaseEventArrayAfterActive, function(handle) {
          handle.remove();
        }, this);
        this._releaseEventArrayAfterActive = [];
      },

      _changeToServiceRenderer: function(settings) {
        array.forEach(settings.layerInfos, function(layerInfo) {
          if(!layerInfo.featureLayer._json) {
            return;
          }
          var layerRenderer = layerInfo.featureLayer.renderer;
          var layerRendererJson = layerRenderer.toJson();
          var serviceDefJson = Json.parse(layerInfo.featureLayer._json);
          var serviceRendererJson = serviceDefJson.drawingInfo.renderer;
          if(!jimuUtils.isEqual(layerRendererJson, serviceRendererJson)) {
            layerInfo._layerRenderer = layerRenderer;
            this._layerInfoParamArrayUseForRervertRenderre.push(layerInfo);
            layerInfo.featureLayer.setRenderer(rendererJsonUtils.fromJson(serviceRendererJson));
            layerInfo.featureLayer.redraw();
          }
        }, this);
      },

      _revertToLayerRenderer: function() {
        array.forEach(this._layerInfoParamArrayUseForRervertRenderre, function(layerInfo) {
          if(layerInfo._layerRenderer) {
            layerInfo.featureLayer.setRenderer(layerInfo._layerRenderer);
            layerInfo.featureLayer.redraw();
          }
        }, this);
        this._layerInfoParamArrayUseForRervertRenderre = [];
      },

      /*****************************
       * Methods for extra editing
       ****************************/

      _requeryFeature: function(currentFeature, showLoading) {
        var featureLayer = currentFeature && currentFeature.getLayer && currentFeature.getLayer();
        if(featureLayer && !this._isTemporaryFeatureForAddOnlyMode(currentFeature)) {
          /*
          var query = new EsriQuery();
          var objectId = currentFeature.attributes[featureLayer.objectIdField];
          query.objectIds = [objectId];
          featureLayer.queryFeatures(query, function(featureSet) {
          });
          */
          var queryTask = new QueryTask(featureLayer.url);
          var query = new EsriQuery();
          var objectId = currentFeature.attributes[featureLayer.objectIdField];
          query.objectIds = [objectId];
          query.outSpatialReference = this.map.spatialReference;
          query.returnGeometry = false;
          query.outFields = ["*"];
          if(showLoading) {
            this.ATILoading.show();
          }
          if(!objectId) {
            return;
          }
          queryTask.execute(query).then(lang.hitch(this, function(featureSet) {
            var newFeature;
            if(featureSet && featureSet.features && featureSet.features[0]) {
              newFeature = featureSet.features[0];
              for(var fieldName in currentFeature.attributes) {
                if(currentFeature.attributes.hasOwnProperty(fieldName) &&
                   (typeof currentFeature.attributes[fieldName] !== 'function')) {
                  if(currentFeature.attributes[fieldName] !== newFeature.attributes[fieldName]) {
                    currentFeature.attributes[fieldName] = newFeature.attributes[fieldName];
                  }
                }
              }
              if(this.editor && this.editor.attributeInspector) {
                this.editor.attributeInspector.refresh();
              }
            }
            if(showLoading) {
              this.ATILoading.hide();
            }
          }), lang.hitch(this, function() {
            if(showLoading) {
              this.ATILoading.hide();
            }
          }));
        }
      },

      _pushToNeedRequeryFeatureArray: function(currentFeature) {
        var currentFeatureLayer = currentFeature && currentFeature.getLayer && currentFeature.getLayer();
        if(currentFeatureLayer) {
          var currentFeatureObjectId = currentFeature.attributes[currentFeatureLayer.objectIdField];
          if(!array.some(this._needToRequeryFeatureArray, function(feature) {
            var featureLayer = feature.getLayer();
            var featureObjectId = feature.attributes[featureLayer.objectIdField];
            if(currentFeatureLayer.id === featureLayer.id && currentFeatureObjectId === featureObjectId) {
              return true;
            }
          }, this)) {
            this._needToRequeryFeatureArray.push(currentFeature);
          }
        }
      },

      /*****************************
       * Methods for control graphic
       ****************************/
      _updateSelectedFeature: function(selectedFeature) {
        if(selectedFeature) {
          selectedFeature.getLayer().applyEdits(null, [selectedFeature]);
          this.editor._clearSelection();
        }
      },

      _autoApplyEditWhenGeometryIsModified: function(/*graphicMoveStopEvent*/) {
        var editToolbarCurrentState = this.editor.editToolbar.getCurrentState();
        var selectedFeature = editToolbarCurrentState && editToolbarCurrentState.graphic;

        //if( this._configEditor.autoApplyEditWhenGeometryIsMoved &&
        //   graphicMoveStopEvent &&
        //   graphicMoveStopEvent.target &&
        //   graphicMoveStopEvent.target._modified) {

        if(this._configEditor.autoApplyEditWhenGeometryIsMoved) {
          if(this._checkStickyMoveTolerance()) {
            this._updateSelectedFeature(selectedFeature);
          } else {
            // not sure the geometry has been changed or not except for 'point'
            if(editToolbarCurrentState.isModified && selectedFeature.geometry.type !== "point") {
              this._updateSelectedFeature(selectedFeature);
            }
          }
        }
      },

      _checkStickyMoveTolerance: function() {
        var isOut = true;
        var editToolbarCurrentState = this.editor.editToolbar.getCurrentState();
        var selectedFeature = editToolbarCurrentState && editToolbarCurrentState.graphic;
        if(selectedFeature) {
          if(!this._isOutStickyMoveToleranceCheckedByMoveTrack(selectedFeature)) {
            this._revertGraphicPosition(selectedFeature);
            isOut = false;
          }

          // delete position record after checked sticky move.
          delete selectedFeature._moveTrack;
          delete selectedFeature._originalGeometryAtMoveStart;
        }
        return isOut;
      },

      _isOutStickyMoveToleranceCheckedByOriginalGeometry: function(selectedFeature) {
        var referencePoint;
        var movedReferencePoint;
        var mapWidth;
        var tolerancePerPixel;
        var toleranceMapUnit;
        var toleranceExtent;
        var isOut = true;
        // init referencePoint and movedReferencePoint
        if(selectedFeature.geometry.type === 'point') {
          referencePoint = selectedFeature._originalGeometryAtMoveStart;
          movedReferencePoint = selectedFeature.geometry;
        } else {
          if(selectedFeature.geometry.getExtent &&
              selectedFeature._originalGeometryAtMoveStart.getExtent) {
            referencePoint = selectedFeature._originalGeometryAtMoveStart.getExtent().getCenter();
            movedReferencePoint = selectedFeature.geometry.getExtent().getCenter();
          }
        }

        if(this._configEditor.stickyMoveTolerance &&
            referencePoint &&
            movedReferencePoint) {
          mapWidth = this.map.extent.getWidth();
          tolerancePerPixel = mapWidth / this.map.width;
          toleranceMapUnit = this._configEditor.stickyMoveTolerance * tolerancePerPixel;
          toleranceExtent = new Extent(0,
                                       0,
                                       toleranceMapUnit,
                                       toleranceMapUnit,
                                       selectedFeature.spatialReference);
          toleranceExtent = toleranceExtent.centerAt(referencePoint);
          if(toleranceExtent.contains(movedReferencePoint)) {
            isOut = false;
          }
        }
        return isOut;
      },

      _isOutStickyMoveToleranceCheckedByMoveTrack: function(selectedFeature) {
        var isOut = true;
        var mapWidth;
        var tolerancePerPixel;
        var toleranceMapUnit;
        var toleranceExtent;
        var moveTrack = selectedFeature._moveTrack;
        var movedReferencePoint;

        if(moveTrack) {
          movedReferencePoint = new Point(moveTrack.x,
                                          moveTrack.y,
                                          selectedFeature.spatialReference);
        }

        if(this._configEditor.stickyMoveTolerance &&
            movedReferencePoint) {
          mapWidth = this.map.extent.getWidth();
          tolerancePerPixel = mapWidth / this.map.width;
          toleranceMapUnit = this._configEditor.stickyMoveTolerance * tolerancePerPixel;
          toleranceExtent = new Extent(-toleranceMapUnit / 2,
                                       -toleranceMapUnit / 2,
                                       toleranceMapUnit,
                                       toleranceMapUnit,
                                       selectedFeature.spatialReference);
          if(toleranceExtent.contains(movedReferencePoint)) {
            isOut = false;
          }
        }
        return isOut;
      },

      _revertGraphicPosition: function(selectedFeature) {

        // according to original geometry to revert .
        /*
        if(selectedFeature._originalGeometryAtMoveStart) {
          selectedFeature.geometry = selectedFeature._originalGeometryAtMoveStart;
          delete selectedFeature._originalGeometryAtMoveStart;
        }
        */

        var moveTrack = selectedFeature._moveTrack;
        // according to move track to revert .
        if(moveTrack) {
          switch (selectedFeature.geometry.type) {
            case 'point':
              selectedFeature.geometry.x -= moveTrack.x;
              selectedFeature.geometry.y += moveTrack.y;
              break;
            case 'polygon':
              array.forEach(selectedFeature.geometry.rings, function(ring) {
                array.forEach(ring, function(point) {
                  point[0] -= moveTrack.x;
                  point[1] += moveTrack.y;
                });
              });
              break;
            case 'polyline':
              array.forEach(selectedFeature.geometry.paths, function(path) {
                array.forEach(path, function(point) {
                  point[0] -= moveTrack.x;
                  point[1] += moveTrack.y;
                });
              });
              break;
            case 'multiPoint':
              array.forEach(selectedFeature.geometry.points, function(point) {
                point[0] -= moveTrack.x;
                point[1] += moveTrack.y;
              });
              break;
            default:
              return;
          }

          //hide editing assistance geometry when !autoApplyEditWhenGeometryIsMoved.
          if(!this._configEditor.autoApplyEditWhenGeometryIsMoved) {
            array.forEach(this.editor.editToolbar._getAffectedTools("MOVE"), function(tool) {
              tool.suspend();
            }, this);
          }

          if(selectedFeature.geometry.type === "point") {
            this.editor._clearSelection();
          }

          selectedFeature.draw();
        }
      },

      _recordsSelectedFeatureInfoWhenMoveStart: function(moveStartEvent) {
        var selectedFeature = moveStartEvent && moveStartEvent.graphic;
        if (selectedFeature && selectedFeature.geometry) {
          selectedFeature._originalGeometryAtMoveStart = lang.clone(selectedFeature.geometry);
        }
      },

      _recordsSelectedFeatureInfoWhenMoveStop: function(moveStopEvetn) {
        var selectedFeature = moveStopEvetn && moveStopEvetn.graphic;
        var transform = moveStopEvetn && moveStopEvetn.transform;
        var mapWidth = this.map.extent.getWidth();
        var lengthPerPixel = mapWidth / this.map.width;

        if (selectedFeature && transform) {
          if(!selectedFeature._moveTrack) {
            // the first move at graphic edit period.
            selectedFeature._moveTrack = {x: 0, y: 0};
          }
          selectedFeature._moveTrack.x += transform.dx * lengthPerPixel;
          selectedFeature._moveTrack.y += transform.dy * lengthPerPixel;
        }
      },

      _getSelectionFeatuers: function() {
        var selectionFeatures = [];
        array.forEach(this.layerInfosParam, function(layerInfo) {
          var selection = layerInfo.featureLayer.getSelectedFeatures();
          selectionFeatures = selectionFeatures.concat(selection);
        });
        return selectionFeatures;
      },

      _canDeleteSelectionFeatures: function() {
        // return ture if all features can be deleted,
        // else return false.
        var canDeleteFeatures = true;
        var selectionFeatures = this._getSelectionFeatuers();
        if(selectionFeatures.length === 0) {
          canDeleteFeatures = false;
        } else {
          array.some(selectionFeatures, function(feature) {
            var featureLayer = feature.getLayer && feature.getLayer();
            if(!featureLayer ||
               !featureLayer.getEditCapabilities({feature: feature}).canDelete
              ) {
              canDeleteFeatures = false;
              return true;
            }
          }, this);
        }

        return canDeleteFeatures;
      },

      /******************************************
       * Methods for prepare edit related records
       ******************************************/
      _createRelatedRecordsEditor: function(feature) {

        if(!feature || this._isTemporaryFeatureForAddOnlyMode(feature)) {
          return;
        }

        // prepare loading shelter
        var loadingDomNode = html.create('div', {style:"position: relative"});
        html.place(loadingDomNode, this.editor.attributeInspector.domNode, "after");
        var loading = new LoadingShelter({
        }).placeAt(loadingDomNode);

        // get tableInfosParam
        return this._tableInfoParamDef.then(lang.hitch(this, function() {
          try {
            if(this._relatedRecordsEditor) {
              this._relatedRecordsEditor.destroy();
              this._relatedRecordsEditor = null;
            }
            // create relatedRecordsEditor
            this._relatedRecordsEditor = new RelatedRecordsEditor({
              originalFeature: feature,
              editorATI: this.editor.attributeInspector,
              tableInfosParam: this.layerInfosParamClone.concat(this.tableInfosParamClone),
              nls: lang.mixin(lang.clone(this.nls), window.jimuNls.common),
              _editWidget: this
            });
            loading.destroy();
          } catch(err) {
            console.warn(err.message);
            loading.destroy();
            this._enableToAnswerEventForEditorATI();
          }
          return;
        }));
      },

      _disableToAnswerEventForEditorATI: function() {
        // disable to answer onSelctionChange for editor ATI.
        if(!this._mapInfoStorage.editorATIonLayerSelectionChange) {
          this._mapInfoStorage.editorATIonLayerSelectionChange =
            this.editor.attributeInspector.onLayerSelectionChange;
          this.editor.attributeInspector.onLayerSelectionChange = lang.hitch(this, function(){});
        }
      },

      _enableToAnswerEventForEditorATI: function() {
        // enable to answer onSelctionChange for editor ATI.
        if(this._mapInfoStorage.editorATIonLayerSelectionChange) {
          this.editor.attributeInspector.onLayerSelectionChange =
            lang.hitch(this.editor.attributeInspector, this._mapInfoStorage.editorATIonLayerSelectionChange);
          this._mapInfoStorage.editorATIonLayerSelectionChange = null;
        }
      },

      _getTableInfosParam: function() {
        var tableInfos;
        var defs = [];
        var resultTableInfosParam = [];

        if(!this._configEditor.tableInfos) {
          // configured in setting page and no layers checked.
          tableInfos = [];
        } else if(this._configEditor.tableInfos.length > 0)  {
          // configured and has been checked.
          tableInfos = this._converConfiguredLayerInfos(this._configEditor.tableInfos);
        } else {
          // has not been configured.
          tableInfos = this._getDefaultTableInfos();
        }

        array.forEach(tableInfos, function(tableInfo) {
          var jimuTableInfo = this._jimuLayerInfos.getTableInfoById(tableInfo.featureLayer.id);
          if(jimuTableInfo) {
            tableInfo.jimuTableInfo = jimuTableInfo;
            defs.push(jimuTableInfo.getLayerObject());
          }
        }, this);

        return all(defs).then(lang.hitch(this, function() {
          array.forEach(tableInfos, function(tableInfo) {
            if(!tableInfo.jimuTableInfo) {
              return;
            }
            var tableObject = tableInfo.jimuTableInfo.layerObject;
            var capabilities = tableInfo.jimuTableInfo.getCapabilitiesOfWebMap();
            var isEditableInWebMap;
            if(capabilities && capabilities.toLowerCase().indexOf('editing') === -1) {
              isEditableInWebMap = false;
            } else {
              isEditableInWebMap = true;
            }

            if(tableObject &&
               tableObject.visible &&//??************
               tableObject.isEditable &&
               tableObject.isEditable() &&
               isEditableInWebMap) {//todo ......
              tableInfo.featureLayer = tableInfo.jimuTableInfo.layerObject;
              delete tableInfo.jimuTableInfo;
              resultTableInfosParam.push(tableInfo);
            }
          }, this);
          return resultTableInfosParam;
        }));
      },

      _startEditingRelatedGraphic: function(operationData, integrityField) {

        this._stopEditingRelatedGraphic();

        this._isInEditingRelatedGraphicSession = true;
        var relatedLayerObject = operationData.destJimuLayerInfo.layerObject;

        this.editPopup.hide();
        this.editor._clearSelection();

        html.removeClass(this.editRelatedGraphicPart, 'disable');

        // filter templatePicker
        var top = this._configEditor.useFilterEdit ?
                  Clazz.TOP_WITH_TEMPLATE_FILTER_AND_EDIT_RG :
                  Clazz.TOP_WITH_EDIT_RG;
        html.setStyle(this.editor.templatePicker.domNode, 'top', top);
        if(this._filterEditor) {
          this._filterEditor._lastLayerFilterIndex = this._filterEditor.selectDropDown.selectedIndex;
          this._filterEditor._lastTemplateFilterValue = this._filterEditor.filterTextBox.value;
          this._filterEditor.selectLayerFilterByValue(relatedLayerObject.id);
          this._filterEditor.setTemplateFilter("");
          this._filterEditor._onLayerFilterChanged(true);
          this._filterEditor._onTempalteFilterChanged(true);
          this._filterEditor.disableLayerFilter();
        } else {
          this.editor.templatePicker.clearSelection();
          this.editor.templatePicker.attr("featureLayers", [relatedLayerObject]);
          //this.editor.templatePicker.attr("grouping", false);
          this.editor.templatePicker.update(true);
        }

        if(integrityField.hasRelationshipTable) {
          var editsCompleteHandler = on(relatedLayerObject, 'edits-complete', lang.hitch(this, function(result) {
            if(!result || !result.adds || result.adds.length !== 1) {
              return;
            }
            var newRelatedGraphicResult = result.adds[0];
            var newRelatedGraphic = null;
            array.some(relatedLayerObject.graphics, function(graphic) {
              if(graphic.attributes[relatedLayerObject.objectIdField] === newRelatedGraphicResult.objectId) {
                newRelatedGraphic = graphic;
                return true;
              }
            });

            if(newRelatedGraphic) {
              this._relatedRecordsEditor._addNewRelationshipReocrd(newRelatedGraphic, operationData);
            }

          }));
          this._releaseEventArrayAfterEditingRelatedGraphic.push(editsCompleteHandler);

        } else {
          var templatePickerSelectionChangeHandler = on(this.editor.templatePicker,
                                                          'selection-change',
                                                          lang.hitch(this, function() {
            var selected = this.editor.templatePicker.getSelected();
            var template = selected && selected.template;
            //var originalInterityFieldValue = lang.getObject('prototype.attributes.' + integrityField.key, false, template)
            if(template &&
                !lang.getObject('_wabProperties.originalInterityField', false, template) &&
                template.prototype &&
                template.prototype.attributes) {
              lang.setObject('_wabProperties.originalInterityField.key', integrityField.key, template);
              lang.setObject('_wabProperties.originalInterityField.value',
                             template.prototype.attributes[integrityField.key],
                             template);
              template.prototype.attributes[integrityField.key] = integrityField.value;
              this._changedTemplatesOfTemplatePicker.push(template);
            }
          }));
          this._releaseEventArrayAfterEditingRelatedGraphic.push(templatePickerSelectionChangeHandler);
        }

        // select default template
        var itemSymbolNodes = query(".itemSymbol", this.editor.templatePicker.domNode);
        var cellNode;
        if(itemSymbolNodes && itemSymbolNodes.length > 0) {
          var itemSymbolNode = itemSymbolNodes[0];
          cellNode = itemSymbolNode && itemSymbolNode.parentNode && itemSymbolNode.parentNode.parentNode;
        }
        if(cellNode) {
          //var rowIndex = this._filterEditor ? 0 : 1;
          this.editor.templatePicker._rowClicked({ cellNode: cellNode, rowIndex: 1, cellIndex: 0 });
        }
      },

      _stopEditingRelatedGraphic: function() {

        if(!this._isInEditingRelatedGraphicSession) {
          return;
        }

        html.addClass(this.editRelatedGraphicPart, 'disable');
        var top = this._configEditor.useFilterEdit ?
                  Clazz.TOP_WITH_TEMPLATE_FILTER:
                  Clazz.TOP;
        html.setStyle(this.editor.templatePicker.domNode, 'top', top);

        array.forEach(this._releaseEventArrayAfterEditingRelatedGraphic, function(handler) {
          if(handler && handler.remove) {
            handler.remove();
          }
        }, this);
        this._releaseEventArrayAfterEditingRelatedGraphic = [];

        array.forEach(this._changedTemplatesOfTemplatePicker, function(template) {
          if(lang.getObject('_wabProperties.originalInterityField', false, template) &&
              template.prototype &&
              template.prototype.attributes) {
            var originalInterityFieldKey = lang.getObject('_wabProperties.originalInterityField.key', false, template);
            var originalInterityFieldValue = lang.getObject('_wabProperties.originalInterityField.value',
                                                            false,
                                                            template);
            template.prototype.attributes[originalInterityFieldKey] = originalInterityFieldValue;
          }
        }, this);
        this._changedTemplatesOfTemplatePicker = [];

        // restore templatePicker
        if(this._filterEditor) {
          this._filterEditor.enableLayerFilter();
          this._filterEditor.selectDropDown.selectedIndex = this._filterEditor._lastLayerFilterIndex;
          this._filterEditor.filterTextBox.value = this._filterEditor._lastTemplateFilterValue;
          this._filterEditor._onLayerFilterChanged();
          this._filterEditor._onTempalteFilterChanged();
        } else {
          this.editor.templatePicker.clearSelection();
          this.editor.templatePicker.attr("featureLayers", this._layerObjectsParaForTempaltePicker);
          //this.editor.templatePicker.attr("grouping", true);
          this.editor.templatePicker.update(true);
        }

        this._isInEditingRelatedGraphicSession = false;
      },

      /*************************
       * Methods for change UI
       ************************/

      _updateDeleteBtnInToolbar: function() {
        if(this._canDeleteSelectionFeatures()) {
          this._enableDeleBtnInToolbar();
        } else {
          this._disableDeleteBtnInToolbar();
        }
      },

      _disableDeleteBtnInToolbar: function() {
        if(this._configEditor.toolbarVisible) {
          query("[class~=deleteFeatureIcon]", this.editor.domNode).style("display", "none");
        }
      },

      _enableDeleBtnInToolbar: function() {
        if(this._configEditor.toolbarVisible) {
          query("[class~=deleteFeatureIcon]", this.editor.domNode).style("display", "inline-block");
        }
      },

      /*************************
       * About events
       ************************/
      _update: function() {
        if(this.editor){
          this.editor.templatePicker.update(true);
        }
      },

      resize: function() {
        this._update();
      },

      onClose: function() {
        // stop edit related graphic
        this._stopEditingRelatedGraphic();

        if (this.editor) {
          this.editor.destroy();
        }
        this.editor = null;
        // close method will call onDeActive automaticlly
        // so do not need to call onDeActive();
        this._worksAfterClose();
      },

      onNormalize: function(){
        setTimeout(lang.hitch(this, this._update), 100);
      },

      onMinimize: function(){
      },

      onMaximize: function(){
        setTimeout(lang.hitch(this, this._update), 100);
      },

      reClickMap: function(clickEvt) {
        this._createOverDef.then(lang.hitch(this, function() {
          this.map.onClick(clickEvt);
        }));
      },

      _onGraphicMoveStart: function(evt) {
        this._recordsSelectedFeatureInfoWhenMoveStart(evt);
      },

      _onGraphicMoveStop: function(evt) {
        this._recordsSelectedFeatureInfoWhenMoveStop(evt);
        this._autoApplyEditWhenGeometryIsModified(evt);
      },

      _onGraphicChangeStop: function(evt) {
        this._autoApplyEditWhenGeometryIsModified(evt);
      },

      _beforeMapClick: function() {
        if(!this._configEditor.autoApplyEditWhenGeometryIsMoved) {
          this._checkStickyMoveTolerance();
        }
      },

      _onEditorPopupShow: function() {
        // disable event for editorATI
        var currentFeature = this.editor.attributeInspector._currentFeature;
        //var currentLayer = currentFeature.getLayer();
        this._disableToAnswerEventForEditorATI();
        this._createRelatedRecordsEditor(currentFeature);

        this._pushToNeedRequeryFeatureArray(currentFeature);
        this._requeryFeature(currentFeature, true);
      },

      _onEditorPopupHide: function() {
        // enable event for editorATI
        this._enableToAnswerEventForEditorATI();
      },

      _onNextOfEditorATI: function(evt) {
        this._createRelatedRecordsEditor(evt.feature);
        this._pushToNeedRequeryFeatureArray(evt.feature);
        this._requeryFeature(evt.feature, true);
      },

      _onLayerSelectionChange: function() {
        if(this._configEditor.toolbarVisible) {
          this._updateDeleteBtnInToolbar();
        }
      }

    });

    Clazz.EditPopup = declare([Popup], {

      preamble: function() {
        this.originalHide = lang.hitch(this, this.hide);
        this.hide = lang.hitch(this, function(clearSelection) {
          this.hideWidthConfirmDialog(clearSelection);
        });

        // disable setScrollable from esriUtils
        if(domUtils.setScrollable) {
          this.originalSetScrollableDomUtils = domUtils.setScrollable;
          domUtils.setScrollable = function(){return [{remove: function() {}}, {remove: function() {}}];};
        }
      },

      constructor: function() {
        // restore the setScrollable for esriUtils
        domUtils.setScrollable = this.originalSetScrollableDomUtils;
      },

      hideWidthConfirmDialog: function(clearSelection) {
        /*jshint unused: false*/
        this.originalHide();
      }

    });

    lang.mixin(Clazz, {
      TOP: "18px",
      TOP_WITH_TEMPLATE_FILTER: "115px",
      TOP_WITH_EDIT_RG: "53px",
      TOP_WITH_TEMPLATE_FILTER_AND_EDIT_RG: "155px"
    });

    return Clazz;
  });
