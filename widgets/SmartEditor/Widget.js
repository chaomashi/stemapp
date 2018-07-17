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

// jscs:disable validateIndentation
/* jshint proto: true */

define([
  "dojo/Stateful",
  'dojo',
  'dijit',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/_base/html',
  'dojo/query',
  'dojo/aspect',
  'dojo/i18n!esri/nls/jsapi',
  'dojo/dom',
  'dojo/dom-construct',
  'dojo/dom-class',
  'dojo/dom-style',
  'dojo/on',
  'dojo/json',
  'dojo/topic',
  'dijit/_WidgetsInTemplateMixin',
  'jimu/BaseWidget',
  'jimu/LayerInfos/LayerInfos',
  'jimu/dijit/Message',
  "esri/request",
  "esri/dijit/editing/TemplatePicker",
  "esri/dijit/AttributeInspector",
  "esri/toolbars/draw",
  "esri/toolbars/edit",
  "esri/tasks/query",
  "esri/graphic",
  "esri/layers/FeatureLayer",
  "dojo/promise/all",
  "dojo/Deferred",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/Color",
  "esri/geometry/jsonUtils",
  "esri/geometry/Polyline",
  "esri/tasks/RelationshipQuery",
  "dijit/registry",
  "./PresetAllFields",
  "./utils",
  "./presetUtils",
  "./smartAttributes",
  "./attributeInspectorTools",
  "./relatedTables",
  "dijit/form/CheckBox",
  "dijit/form/Button",
  "dijit/form/DropDownButton",
  'dijit/DropDownMenu',
  "dijit/MenuItem",
  'dijit/form/DateTextBox',
  'dijit/form/NumberSpinner',
  'dijit/form/NumberTextBox',
  'dijit/form/FilteringSelect',
  'dijit/form/TextBox',
  'dijit/form/ValidationTextBox',
  'dijit/form/TimeTextBox',
  "dijit/Editor",
  "dijit/form/SimpleTextarea",
  'dojo/store/Memory',
  'dojo/date/stamp',
  "dojo/dom-attr",
  "jimu/dijit/Popup",
  "./AttachmentUploader",
  "esri/lang",
  "esri/renderers/jsonUtils",
  "dojox/html/entities",
  'jimu/utils',
  'jimu/portalUrlUtils',
  'jimu/SelectionManager',
  './SEFilterEditor',
  './SEDrawingOptions',
  './PrivilegeUtil',
  'jimu/dijit/LoadingIndicator',
  'esri/tasks/GeometryService',
  "./coordinateUtils",
  "./addressUtils",
  "./Intersection"


],
  function (
    Stateful,
    dojo,
    dijit,
    declare,
    lang,
    array,
    html,
    query,
    aspect,
    esriBundle,
    dom,
    domConstruct,
    domClass,
    domStyle,
    on,
    JSON,
    topic,
    _WidgetsInTemplateMixin,
    BaseWidget,
    LayerInfos,
    Message,
    esriRequest,
    TemplatePicker,
    AttributeInspector,
    Draw,
    Edit,
    Query,
    Graphic,
    FeatureLayer,
    all,
    Deferred,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
    Color,
    geometryJsonUtil,
    Polyline,
    RelationshipQuery,
    registry,
    PresetAllFields,
    editUtils,
    presetUtils,
    smartAttributes,
    attributeInspectorTools,
    relatedTables,
    CheckBox,
    Button,
    DropDownButton,
    DropDownMenu,
    MenuItem,
    DateTextBox,
    NumberSpinner,
    NumberTextBox,
    FilteringSelect,
    TextBox,
    ValidationTextBox,
    TimeTextBox,
    Editor,
    SimpleTextarea,
    Memory,
    dojoStamp,
    domAttr,
    Popup,
    AttachmentUploader,
    esriLang,
    rendererJsonUtils,
    entities,
    utils,
    portalUrlUtils,
    SelectionManager,
    SEFilterEditor,
    SEDrawingOptions,
    PrivilegeUtil,
    LoadingIndicator,
    GeometryService,
    coordinateUtils,
    AddressUtils,
    Intersection) {
    return declare([BaseWidget, _WidgetsInTemplateMixin], {
      name: 'SmartEditor',
      baseClass: 'jimu-widget-smartEditor',
      _defaultStartStr: "",
      _defaultAddPointStr: "",
      _jimuLayerInfos: null,
      _mapClick: null,
      settings: null,
      templatePicker: null,
      attrInspector: null,
      editToolbar: null,
      _isDirty: false,
      updateFeatures: [],
      currentFeature: null,
      currentLayerInfo: null,
      _attrInspIsCurrentlyDisplayed: false,
      _ignoreEditGeometryToggle: false,
      _editingEnabled: false,
      _usePresetValues: false,
      _creationDisabledOnAll: false,
      _editGeomSwitch: null,
      _autoSaveRuntime: false,
      _userHasPrivilege: false,
      _eventHandler: null,
      _createOverDef: null,
      featureReductionEnabledLayers: [],
      rendererDifferentLayers: [],
      clusterState: true,
      _relatedTablesInfo: {},
      _traversal: [],
      _nodesCollection: [],
      _attributeInspectorCollection: [],
      contentWrapper: null,
      viewedFeatureDetails: [],
      viewedLayerDetails: [],
      currentAction: null,
      _isPresetTableCreated: false,
      _layerClearSelectionHandles: [],
      _layerChangedOutside: false,
      //widget_loaded: declare([Stateful], {
      //  loaded: null,
      //  _loadedGetter: function () {
      //    return this.loaded;
      //  },
      //  _loadedSetter: function (value) {
      //    this.loaded = value;
      //  }
      //}),
      postMixInProperties: function () {
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
      },

      postCreate: function () {
        this.inherited(arguments);
        this._relatedTablesInfo = {};
        this._traversal = [];
        this._nodesCollection = [];
        this._attributeInspectorCollection = [];
        this.viewedFeatureDetails = [];
        this.viewedLayerDetails = [];
        this._isPresetTableCreated = false;
        this._layerClearSelectionHandles = [];
        this._layerChangedOutside = false;
        //wire up the button events
        this.own(on(this.cancelButton, "click", lang.hitch(this, function () {
          //check if needs to display prompt fro unsaved edits
          if (this.config.editor.displayPromptOnSave && this._validateFeatureChanged()) {
            var isFirstPage = this._traversal.length > 1 ? false : true;
            this._promptToResolvePendingEdit(isFirstPage, null, true).then(
              lang.hitch(this, function (clickedButton) {
                //if adding new related record the task of back button(_onCancelButtonClicked)
                //should be processed after adding related record and showing list related records
                //So process _onCancelButtonClicked only when action is 'no' & not adding related record
                //if adding related record and clicked button is 'yes' then raise the flag of back button
                //so that once related record is added after that _onCancelButtonClicked will be called
                if (!this._addingNewRelatedRecord || clickedButton === "no") {
                  this._onCancelButtonClicked();
                } else {
                  this._processBackButtonInNewRelatedRecord = true;
                }
              }), function () {
              });
          } else {
            this._onCancelButtonClicked();
          }
        })));
      },

      _onCancelButtonClicked: function () {
        //clear previous selections of layer
        if (this.attrInspector) {
          //as now prev attribute inspector could have multiple features of multiple layer
          //clear selections of all layers in layer infos
          if (this.attrInspector.layerInfos) {
            array.forEach(this.attrInspector.layerInfos, function (layerInfo) {
              var layer = layerInfo.featureLayer;
              layer.clearSelection();
              layer.refresh();
            });
          }
          this.attrInspector.destroy();
        }
        domConstruct.destroy(this.contentWrapper);
        //get prev Attribute inspector if going back from related layer/tables
        if (this._attributeInspectorCollection && this._attributeInspectorCollection.length > 0) {
          var prevAttrInspector = this._attributeInspectorCollection.pop();
          if (prevAttrInspector) {
            this.attrInspector = prevAttrInspector;
          }
        }
        if (this._traversal && this._traversal.length > 0) {
          this._traversal.pop();
        }
        //get prev ContentWrapper if going back from related layer/tables
        if (this._nodesCollection && this._nodesCollection.length > 0) {
          var prevContentWrapper = this._nodesCollection.pop();
          if (prevContentWrapper) {
            domClass.remove(prevContentWrapper, "hidden");
            //when AI's dom is set to hidden all its node get hidden so show then
            domStyle.set(this.attrInspector.attributeTable, "display", "block");
            domStyle.set(this.attrInspector.editButtons, "display", "block");
            if (this.attrInspector._attachmentEditor !== undefined &&
              this.attrInspector._attachmentEditor !== null) {
              domStyle.set(this.attrInspector._attachmentEditor.domNode, "display", "block");
            }
            //Hide Attribute inspector's delete button text shown when we block editButtons
            domStyle.set(this.attrInspector.deleteBtn.domNode, "display", "none");
            //set the prev selected feature index which is stored before navigating to shoe related records
            this.attrInspector._featureIdx = this.attrInspector.ctStoredFeatureIndex;
            //refresh the AI this will update the UI also
            this.attrInspector.refresh();
            //after time out
            // 1. Show/hide navButtons as per number of features selected
            // 2. Show number of features in nav buttons control
            setTimeout(lang.hitch(this, function () {
              //Show/hide navButtons as per number of features selected
              domStyle.set(this.attrInspector.navButtons, "display",
                (!this.attrInspector._hideNavButtons && (this.attrInspector._numFeatures > 1) ? "" : "none"));
              //Show number of features in nav buttons control
              this.attrInspector.navMessage.innerHTML = esriLang.substitute({
                idx: this.attrInspector._featureIdx + 1,
                of: this.attrInspector.NLS_of,
                numFeatures: this.attrInspector._numFeatures
              }, this.attrInspector._navMessage);
              this._toggleAttrInspectorNavButtons();
              //also update the current feature
              this.currentFeature = this.attrInspector._numFeatures ?
                this.attrInspector._selection[this.attrInspector._featureIdx] : null;
              this.currentFeature.preEditAttrs = JSON.parse(JSON.stringify(this.currentFeature.attributes));
              this.currentLayerInfo = this._getLayerInfoByID(this.currentFeature._layer.id);
              this._toggleEditGeoSwitch(this.currentLayerInfo.disableGeometryUpdate ||
                !this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate);
              if (this.config.editor.hasOwnProperty("editGeometryDefault") &&
                this.config.editor.editGeometryDefault === true) {
                //perform any edit geom switch functionality
                //only when working with main layers feature and not on related features
                if (this._traversal.length < 2 && this._editGeomSwitch.domNode) {
                  this._editGeomSwitch.set('checked', true);
                }
              }
              //Disable attachments editor for the layers which are not editable
              //add timeout as it is taking some time to load editor
              this.loading.show();
              setTimeout(lang.hitch(this, function () {
                if (this.attrInspector._attachmentEditor && (!this.currentLayerInfo.isEditable ||
                  !this.currentLayerInfo._editFlag)) {
                  this._disableAttachments(this.attrInspector._attachmentEditor, true, false);
                }
                this.loading.hide();
              }), 1000);
            }), 200);
            this.contentWrapper = prevContentWrapper;
            return;
          }
        }
        if (this._attrInspIsCurrentlyDisplayed && this._attrInspIsCurrentlyDisplayed === true) {
          if (this.attrInspector) {
            if (this.attrInspector._numFeatures === 0) {
              this._showTemplate(true);

            }
          }
        }
        if (this.map.infoWindow.isShowing) {
          this.map.infoWindow.hide();
        }
        this._removeLayerVisibleHandler();
      },

      _toggleAttrInspectorNavButtons: function () {
        var currentNavigationNode;
        if (query(".esriAttrPaginationDiv") && this._traversal) {
          currentNavigationNode = query(".esriAttrPaginationDiv")[this._traversal.length - 1];
        }
        if (currentNavigationNode && this.attrInspector && this.attrInspector._selection.length > 1) {
          domStyle.set(currentNavigationNode, "display", "block");
        } else {
          domStyle.set(currentNavigationNode, "display", "none");
          if (currentNavigationNode.nextElementSibling) {
            domStyle.set(currentNavigationNode.nextElementSibling, "height", "calc(100% - 10px)");
          }
        }
      },
      startup: function () {
        this.inherited(arguments);
        //create instance of geometryService
        if (this.appConfig.geometryService) {
          this.geometryService = new GeometryService(this.appConfig.geometryService);
        } else {
          Message({
            message: this.nls.geometryServiceURLNotFoundMSG
          });
          return;
        }
        if (this.appConfig.theme.name === "TabTheme") {
          //override the panel styles
          domClass.add(this.domNode.parentElement, "esriCTOverridePanelStyle");
        }
        this._createOverDef = new Deferred();
        //get selected theme color
        this._getSelectedThemeColor();
        //this.loaded_state = new this.widget_loaded({
        //  loaded: false
        //});
        if (this.config.editor.hasOwnProperty("displayPresetTop")) {
          if (this.config.editor.displayPresetTop === true) {
            dojo.place('presetFieldsTableDiv', 'templatePickerDiv', 'before');
          }
        }
        topic.subscribe("smartEditor/validate", lang.hitch(this, this._validateEventHandler));
        this._progressDiv = domConstruct.create("div", { "class": "processing-indicator-panel" });
        var parentDom = this.getParent().domNode.parentNode;
        parentDom.insertBefore(this._progressDiv, parentDom.firstChild);

        this.widgetActiveIndicator = domConstruct.create("div", { "class": "widgetActive widgetIndicator" });
        parentDom.insertBefore(this.widgetActiveIndicator, parentDom.firstChild);
        if (this.config.editor.editDescription === undefined || this.config.editor.editDescription === null) {
          this.config.editor.editDescription = '';
          this.templateTitle.innerHTML = this.config.editor.editDescription;
        }
        else {
          this.templateTitle.innerHTML = entities.decode(this.config.editor.editDescription);
        }

        this._orignls = esriBundle.widgets.attachmentEditor.NLS_attachments;
        //this.nls = lang.mixin(this.nls, window.jimuNls.common);
        this.loading = new LoadingIndicator({
          hidden: true
        });
        this.loading.placeAt(this.domNode);

        this.editToolbar = new Edit(this.map);
        this.drawToolbar = new Draw(this.map);

        this._createDrawingToolbar();

        // edit events
        this.own(on(this.editToolbar,
          "graphic-move-stop, rotate-stop, scale-stop, vertex-move-stop, vertex-click",
          lang.hitch(this, function () {
            this._updateRefreshButtonState();
            this.geometryChanged = true;
            this._enableAttrInspectorSaveButton(this._validateAttributes());
          })));

        // draw event
        //updated to draw-complete as draw-end is depricated
        this.own(on(this.drawToolbar, "draw-complete", lang.hitch(this, function (evt) {
          this.drawToolbar.deactivate();
          this._addGraphicToLocalLayer(evt);
        })));


        this.privilegeUtil = PrivilegeUtil.getInstance();
        //<div class="processing-indicator-panel"></div>
        this._setTheme();
        this.shelter.show();
        LayerInfos.getInstance(this.map, this.map.itemInfo)
          .then(lang.hitch(this, function (operLayerInfos) {

            var timeoutValue;
            if (this.appConfig.theme.name === "BoxTheme") {
              timeoutValue = 1050;

            } else {
              timeoutValue = 1;
            }
            setTimeout(lang.hitch(this, function () {
              //Function below was to load level 1 user and disable the widget, but since level 1 should be able to edit
              //public services, all paths initialize the control
              this.privilegeUtil.loadPrivileges(this._getPortalUrl()).then(lang.hitch(this, function (status) {
                var valid = true;
                this._user = null;
                if (!status) {
                  valid = this._initControl(operLayerInfos);
                } else {
                  var userInfo = this.privilegeUtil.getUser();
                  if (userInfo) {
                    this._user = userInfo.username;
                  }

                  if (this.privilegeUtil.userRole.canEditFeatures() === true) {
                    valid = this._initControl(operLayerInfos);

                  }
                  else if (this.privilegeUtil.userRole.canEditFeaturesFullControl === true) {
                    valid = this._initControl(operLayerInfos);

                  }
                  else {
                    valid = this._initControl(operLayerInfos);
                    //this._noPrivilegeHandler(window.jimuNls.noEditPrivileges);//this.nls.noEditPrivileges);
                  }
                }
                if (valid === false) {
                  this._noPrivilegeHandler(window.jimuNls.invalidConfiguration);//this.nls.invalidConfiguration);
                }

                this.shelter.hide();

              }), lang.hitch(this, function () {
                this._initControl(operLayerInfos);
                //this._noPrivilegeHandler(window.jimuNls.noEditPrivileges);//this.nls.noEditPrivileges);
              }));
              this.shelter.hide();
              this._workBeforeCreate();

            }), timeoutValue);
          }));
      },

      _noPrivilegeHandler: function (message) {
        this.templateTitle.innerHTML = message;
        if (this.templatePicker) {
          dojo.style(this.templatePicker.domNode, "display", "none");
          if (this.drawingTool) {
            dojo.style(this.drawingTool.domNode, "display", "none");
          }
          if (this._mapClick) {

            this._mapClick.remove();
            this._mapClick = null;
          }
        }
        this.map.setInfoWindowOnClick(true);
        this.shelter.hide();
      },
      _getPortalUrl: function (url) {
        if (url) {
          return portalUrlUtils.getStandardPortalUrl(url);
        } else {
          return portalUrlUtils.getStandardPortalUrl(this.appConfig.portalUrl);
        }
      },
      feature_action_select: function (features, featureLayer) {
        // features probably is empty.
        if (!featureLayer) {
          return;
        }
        if (!features) {
          return;
        }
        if (features.length === 0) {
          return;
        }
        if (this.state !== 'active') {
          this.widgetManager.activateWidget(this);
        }
        var firstFeature = features[0];
        if (this._validateFeatureChanged() && this.currentFeature) {
          // do not show templatePicker after saving
          if (this.config.editor.displayPromptOnSave && this.config.editor.displayPromptOnSave === true) {
            this._promptToResolvePendingEdit(false, { featureLayer: featureLayer, feature: firstFeature }, false, true);
          } else {
            this.load_from_featureaction(featureLayer, firstFeature);
          }
        } else {
          this.load_from_featureaction(featureLayer, firstFeature);
        }
      },
      load_from_featureaction: function (featureLayer, firstFeature) {
        //CT- Commented as now we need to clear multiple layer from multiple AI
        /* if (this.updateFeatures) {
           var layersRefresh = [];
           array.forEach(this.updateFeatures, lang.hitch(this, function (feature) {
             var layer = feature.getLayer();
             if (layersRefresh && layersRefresh.indexOf(layer.id) === -1) {
               layersRefresh.push(layer.id);
               layer.clearSelection();
               layer.refresh();
             }
           }));
         }*/
        this._clearLayerSelection();
        if (this.contentWrapper && this.contentWrapper.parentNode &&
          !domClass.contains(this.contentWrapper, "hidden")) {
          this.contentWrapper.parentNode.removeChild(this.contentWrapper);
        }
        //reset array
        this._traversal = [];
        this._nodesCollection = [];
        this._attributeInspectorCollection = [];
        this._relatedTablesInfo = {};
        this.currentFeature = null;
        this.geometryChanged = false;
        this.currentLayerInfo = null;

        this.map.infoWindow.hide();
        if (this.viewedLayerDetails.length > 0) {
          this.loading.show();
          featureLayer = this._getLayerInfoByID(this.viewedLayerDetails.shift());
          firstFeature = this.viewedFeatureDetails.shift();
          this._traverseToSelectedFeature(featureLayer, firstFeature[0]);
        }
      },

      _clearLayerSelection: function () {
        if (this._attributeInspectorCollection && this._attributeInspectorCollection.length > 0) {
          array.forEach(this._attributeInspectorCollection, function (attrInspector) {
            //clear previous selections of layer
            if (attrInspector) {
              //as now prev attribute inspector could have multiple features of multiple layer
              //clear selections of all layers in layer infos
              if (attrInspector.layerInfos) {
                array.forEach(attrInspector.layerInfos, function (layerInfo) {
                  var layer = layerInfo.featureLayer;
                  layer.clearSelection();
                  layer.refresh();
                });
              }
              attrInspector.destroy();
            }
          });
        }
        //clear previous selections of layer
        if (this.attrInspector) {
          //as now prev attribute inspector could have multiple features of multiple layer
          //clear selections of all layers in layer infos
          if (this.attrInspector.layerInfos) {
            array.forEach(this.attrInspector.layerInfos, function (layerInfo) {
              var layer = layerInfo.featureLayer;
              layer.clearSelection();
              layer.refresh();
            });
          }
          this.attrInspector.destroy();
        }
      },
      _traverseToSelectedFeature: function (featureLayer, feature) {
        var def = new Deferred();
        var tempFeature;
        if (this.viewedFeatureDetails.length > 0) {
          tempFeature = this.viewedFeatureDetails[0];
          if (this.viewedLayerDetails[0] === this.viewedLayerDetails[1]) {
            tempFeature = this.viewedFeatureDetails[1];
          }
        }

        this._createAttributeInspector([featureLayer], false, null, def, tempFeature);
        if (feature) {
          SelectionManager.getInstance().setSelection(featureLayer.featureLayer, [feature]).then(
            lang.hitch(this, function () {
              var selectedFeatures = featureLayer.featureLayer.getSelectedFeatures();
              this.updateFeatures = selectedFeatures;
              if (this.updateFeatures.length > 0) {
                this._showTemplate(false);
              }
            }));
        }
        def.then(lang.hitch(this, function () {
          if (this.viewedLayerDetails.length > 0) {
            var relatedFeatureLayerId = this.viewedLayerDetails.shift();
            this.viewedFeatureDetails.shift();
            if (this.viewedLayerDetails.length > 0 && this.viewedLayerDetails[0] === relatedFeatureLayerId) {
              this.viewedLayerDetails.shift();
              this.viewedFeatureDetails.shift();
            }
            var tableTitle = query("[layerid='" + relatedFeatureLayerId + "']", this.contentWrapper)[0];
            tableTitle.click();
          }
          if (this.viewedLayerDetails.length === 0) {
            this.loading.hide();
          }
        }));
      },

      _getFeatureIndexToSelect: function (relatedFeature) {
        var featureOID, featureIndex = -1;
        featureOID = relatedFeature.attributes[relatedFeature._layer.objectIdField];
        array.some(this.attrInspector._selection, lang.hitch(this, function (feature, index) {
          if (feature.attributes[feature._layer.objectIdField] === featureOID) {
            featureIndex = index;
            return true;
          }
        }));
        return featureIndex;
      },
      //Function from the feature action
      beginEditingByFeatures: function (features, featureLayer, viewedLayerDetails, viewedFeatureDetails) {
        //clear the temporary graphics if present
        if (this.cacheLayer) {
          this.cacheLayer.clear();
        }
        this.viewedLayerDetails = viewedLayerDetails;
        this.viewedFeatureDetails = viewedFeatureDetails;
        if (!featureLayer) {
          return;
        }
        if (!features) {
          return;
        }
        if (features.length === 0) {
          return;
        }
        this._createOverDef.then(lang.hitch(this, function () {
          this.feature_action_select(features, featureLayer);

        }));
        //if (this.loaded_state.get('loaded') === true) {
        //  this.feature_action_select(features, featureLayer);
        //}
        //else {
        //  this.loaded_state.watch("loaded", lang.hitch(this,function(name, oldValue, value){
        //    if (name === 'loaded' && value === true && oldValue === false) {
        //      this.feature_action_select(features, featureLayer);
        //    }
        //  }));
        //}

      },



      onReceiveData: function (name, widgetId, data, historyData) {
        if (this.config.editor) {
          historyData = historyData;
          widgetId = widgetId;
          if (this.config.editor.hasOwnProperty("listenToGF")) {
            if (this.config.editor.listenToGF !== true) {
              return;
            }
          } else {
            return;
          }
          if (name !== 'GroupFilter') {
            return;
          }

          if (data.message.hasOwnProperty("fields") &&
            data.message.hasOwnProperty("values")) {
            array.forEach(data.message.fields, function (field) {
              this._setPresetValueValue(field, data.message.values[0]);
            }, this);
          }
        }
      },
      /*jshint unused:true */
      _setTheme: function () {
        //if (this.appConfig.theme.name === "BoxTheme" ||
        //    this.appConfig.theme.name === "DartTheme" ||
        //    this.appConfig.theme.name === "LaunchpadTheme") {
        var styleLink;
        if (this.appConfig.theme.name === "DartTheme") {
          utils.loadStyleLink('dartOverrideCSS', this.folderUrl + "/css/dartTheme.css", null);
        }
        else {
          styleLink = document.getElementById("dartOverrideCSS");
          if (styleLink) {
            styleLink.disabled = true;
          }
        }
        if (this.appConfig.theme.name === "LaunchpadTheme") {
          utils.loadStyleLink('launchpadOverrideCSS', this.folderUrl + "/css/launchpadTheme.css", null);
        }
        else {
          styleLink = document.getElementById("launchpadOverrideCSS");
          if (styleLink) {
            styleLink.disabled = true;
          }
        }
        if (this.appConfig.theme.name === "DashboardTheme") {
          utils.loadStyleLink('dashboardOverrideCSS', this.folderUrl + "/css/dashboardTheme.css", null);
        }
        else {
          styleLink = document.getElementById("dashboardOverrideCSS");
          if (styleLink) {
            styleLink.disabled = true;
          }
        }
      },
      _mapClickHandler: function (create) {
        if (create === true && this._attrInspIsCurrentlyDisplayed === false) {
          this.map.setInfoWindowOnClick(false);
          if (this._mapClick === undefined || this._mapClick === null) {
            this._mapClick = on(this.map, "click", lang.hitch(this, this._onMapClick));
          }
          //this._activateTemplateToolbar();
        }
        else if (create === true && this._attrInspIsCurrentlyDisplayed === true) {
          if (this._mapClick) {
            this._mapClick.remove();
            this._mapClick = null;
          }
          this.map.setInfoWindowOnClick(true);
          //this._validateAttributes();
        }
        else {
          if (this._mapClick) {

            this._mapClick.remove();
            this._mapClick = null;
          }
          this.map.setInfoWindowOnClick(true);
          if (this.drawToolbar) {
            //this._lastDrawnShape = lang.clone(this.drawToolbar._points);
            this.drawToolbar.deactivate();
          }
        }
      },
      destroy: function () {
        this.inherited(arguments);

        if (this.attrInspector) {
          this.attrInspector.destroy();
        }
        this.attrInspector = null;

        if (this.templatePicker) {
          this.templatePicker.destroy();
        }
        this.templatePicker = null;
        if (this.currentDrawType) {
          this.currentDrawType = null;
        }
        if (this._menus !== null && this._menus !== undefined) {
          for (var property in SEDrawingOptions) {
            if (this._menus.hasOwnProperty(property)) {
              if (this._menus[property] !== null && this._menus[property] !== undefined) {
                this._menus[property].destroyRecursive(false);
              }
            }
          }
          this._menus = {};
        }
        if (this.drawingTool !== null && this.drawingTool !== undefined) {
          this.drawingTool.destroyRecursive(false);
          this.drawingTool = null;
        }
        this._enableFeatureReduction();
        this.inherited(arguments);
      },
      onActive: function () {
        if (this._userHasPrivilege === true) {
          if (domClass.contains(this.widgetActiveIndicator, "widgetNotActive")) {
            domClass.remove(this.widgetActiveIndicator, "widgetNotActive");
          }
          domClass.add(this.widgetActiveIndicator, "widgetActive");
          if (this.map) {
            this._disableFeatureReduction();
            if (this.templatePicker) {
              this.templatePicker.update();
            }
            this._mapClickHandler(true);
            //Remove selection clear handlers for all the layers so that,
            //it will work only for layer selection clear from outside the widget
            this._disconnectLayerSelectionClearedOutside();

            if (this._attrInspIsCurrentlyDisplayed === false) {
              var override = null;
              if (this.drawingTool && this.currentDrawType) {
                override = this.currentDrawType;
              }
              this._activateTemplateToolbar(override);
            }
          }
        }
      },
      _enableFeatureReduction: function () {
        if (this.clusterState === false) {
          array.forEach(this.featureReductionEnabledLayers, function (layer) {
            if (layer._layerRenderer) {
              layer.setRenderer(layer._layerRenderer);
            }
            layer.enableFeatureReduction();
            //layer.redraw();
          });
          array.forEach(this.rendererDifferentLayers, function (layer) {
            if (layer._layerRenderer) {
              layer.setRenderer(layer._layerRenderer);
            }
            layer.redraw();
          });
          this.clusterState = true;
        }
      },
      _disableFeatureReduction: function () {
        if (this.clusterState === true) {
          array.forEach(this.featureReductionEnabledLayers, function (layer) {
            if (layer.isFeatureReductionActive()) {
              if (layer._serviceRendererJson) {
                layer.setRenderer(rendererJsonUtils.fromJson(layer._serviceRendererJson));
              }
              layer.disableFeatureReduction();
              //layer.redraw();
            }
          });
          array.forEach(this.rendererDifferentLayers, function (layer) {
            //Hack way to handle template picker issue not showing layers for certain maps.
            //TODO: Change to better solution.
            var layerRender_proto = null;
            var serviceRender_proto = null;
            if (layer.renderer) {
              layerRender_proto = Object.getPrototypeOf(layer.renderer);
              if (layerRender_proto === null && typeof (layer.renderer.proto) !== 'undefined') {
                layerRender_proto = layer.renderer.proto;
              }
              if (typeof (layer._serviceRendererJson) !== 'undefined') {
                serviceRender_proto = Object.getPrototypeOf(rendererJsonUtils.fromJson(layer._serviceRendererJson));
              } else { }
              if (layerRender_proto !== null && serviceRender_proto !== null) {
                if (layerRender_proto.declaredClass !== serviceRender_proto.declaredClass) {
                  if (layer._serviceRendererJson) {
                    layer.setRenderer(rendererJsonUtils.fromJson(layer._serviceRendererJson));
                    layer.redraw();
                  }
                }
              }
            }
          });
          this.clusterState = false;
        }
      },

      _handleLayerSelectionClear: function (attrInspector) {
        if (attrInspector && attrInspector.layerInfos) {
          array.forEach(attrInspector.layerInfos, lang.hitch(this, function (layerInfo) {
            if (layerInfo.featureLayer) {
              var layerHandle = on(layerInfo.featureLayer, 'selection-clear',
                lang.hitch(this, this._onLayerSelectionCleared));
              this.own(layerHandle);
              this._layerClearSelectionHandles.push(layerHandle);
            }
          }));
        }
      },

      //Added this function  mulitple layers cleard from out side the widget
      //should not fire the _layerChangeOutside multiple times
      _onLayerSelectionCleared: function () {
        if (this._LayerSelectionClearedTimer) {
          clearTimeout(this._LayerSelectionClearedTimer);
        }
        this._LayerSelectionClearedTimer = setTimeout(lang.hitch(this, function () {
          if (!this._layerChangedOutside) {
            this._layerChangedOutside = true;
            //show template picker and clear current AI
            this._navigateToMain();
          }
        }), 100);
      },

      _navigateToMain: function () {
        this._attrInspIsCurrentlyDisplayed = false;
        //this._mapClickHandler(true);
        this._showTemplatePicker();
        //reset array
        this._traversal = [];
        this._nodesCollection = [];
        this._attributeInspectorCollection = [];
        this._relatedTablesInfo = {};
        this.currentFeature = null;
        this.geometryChanged = false;
        this.currentLayerInfo = null;
      },

      _connectLayerSelectionClearedOutside: function () {
        this._layerChangedOutside = false;
        this._disconnectLayerSelectionClearedOutside();
        if (this._attrInspIsCurrentlyDisplayed) {
          //handle layer selection clear for all the layers of all the atribute inspector else
          //only for the current attribute inspector
          if (this._attributeInspectorCollection && this._attributeInspectorCollection.length > 0) {
            array.forEach(this._attributeInspectorCollection, lang.hitch(this, function (attrInspector) {
              if (attrInspector) {
                this._handleLayerSelectionClear(attrInspector);
              }
            }));
          }
          if (this.attrInspector) {
            this._handleLayerSelectionClear(this.attrInspector);
          }
        }
      },

      _disconnectLayerSelectionClearedOutside: function () {
        if (this._layerClearSelectionHandles && this._layerClearSelectionHandles.length > 0) {
          array.forEach(this._layerClearSelectionHandles, lang.hitch(this, function (layerHandle) {
            layerHandle.remove();
          }));
        }
        this._layerClearSelectionHandles = [];
      },

      onDeActive: function () {
        if (domClass.contains(this.widgetActiveIndicator, "widgetActive")) {
          domClass.remove(this.widgetActiveIndicator, "widgetActive");
        }
        domClass.add(this.widgetActiveIndicator, "widgetNotActive");
        if (this.map) {
          this._mapClickHandler(false);
        }
        this._enableFeatureReduction();
        //Connect layers selection clear event for all the layer of all attributeInspectors
        this._connectLayerSelectionClearedOutside();
      },

      onOpen: function () {
        if (this._userHasPrivilege === true) {
          //this.fetchDataByName('GroupFilter');
          this._workBeforeCreate();
          this.widgetManager.activateWidget(this);
        }
        if (this.templatePicker) {
          this.templatePicker.update();
        }
      },

      _getTableInfos: function () {
        var defs = [];
        var tableInfoArray = this._jimuLayerInfos.getTableInfoArray();
        array.forEach(tableInfoArray, function (jimuTableInfo) {
          defs.push(jimuTableInfo.getLayerObject());
        }, this);
        return all(defs);
      },

      _initControl: function (operLayerInfos) {
        this._userHasPrivilege = true;
        this._jimuLayerInfos = operLayerInfos;
        //Get table infos so that all the tables layer objects are loaded
        //This will help in getting the capabilities and other layer infos
        this._getTableInfos();
        //create address utils and intersectionUtils object to copy values
        this.addressUtils = new AddressUtils({
          "config": this.config
        });
        this._intersectionUtils = new Intersection({
          _jimuLayerInfos: this._jimuLayerInfos,
          map: this.map
        });
        var onlyConfiged = false;
        if (this.config.editor && this.config.editor.layerInfos) {
          onlyConfiged = this.config.editor.layerInfos.length > 0;
        }
        this.config.editor.configInfos = editUtils.getConfigInfos(this._jimuLayerInfos,
          this.config.editor.layerInfos, false, onlyConfiged);
        if (onlyConfiged === false) {
          array.forEach(this.config.editor.configInfos, function (configInfo) {
            configInfo._editFlag = true;
          });
        }
        if (this.config.editor.configInfos === undefined || this.config.editor.configInfos === null) {
          return false;
        }
        else if (this.config.editor.configInfos.length === 0) {
          return false;
        }
        this._processConfig();
        array.forEach(this.config.editor.configInfos, function (configInfo) {
          configInfo.featureLayer.name = configInfo.layerInfo.title;
          var layer = configInfo.featureLayer;
          var layerRenderer = layer.renderer;
          var layerRendererJson = layerRenderer.toJson();
          var serviceDefJson = JSON.parse(layer._json);
          var serviceRendererJson = serviceDefJson.drawingInfo.renderer;
          layer._layerRenderer = layerRenderer;
          layer._serviceRendererJson = serviceRendererJson;
          if (layer.isFeatureReductionEnabled && layer.isFeatureReductionEnabled() &&
            layer.isFeatureReductionActive && layer.isFeatureReductionActive()) {
            this.featureReductionEnabledLayers.push(layer);
          } else if (layerRendererJson.hasOwnProperty('type') && layerRendererJson.type == "heatmap") {
            this.rendererDifferentLayers.push(layer);
          }
          //Commented out to revert changing a symbols layer, this should be expose as an option to allow the user to opt into it
          //} else if (!utils.isEqual(layerRendererJson, serviceRendererJson)) {
          //  this.rendererDifferentLayers.push(layer);
          //}
        }, this);
        this._disableFeatureReduction();
        if (this.config.editor.hasOwnProperty("autoSaveEdits")) {
          if (this.config.editor.autoSaveEdits) {
            this._autoSaveRuntime = this.config.editor.autoSaveEdits;
            if (this._autoSaveRuntime) {
              registry.byId("autoSaveSwitch").set('checked', true);
            } else {
              registry.byId("autoSaveSwitch").set('checked', false);
            }
          }
        }
        else {
          this.config.editor.autoSaveEdits = false;
        }
        //array.forEach(this.featureReductionEnabledLayers, function (layer) {
        //  layer.disableFeatureReduction();
        //});
        this._createEditor();
        this.fetchDataByName('GroupFilter');
        this.widgetManager.activateWidget(this);
        this._createOverDef.resolve();
        //this.loaded_state.set("loaded", true);
        return true;
      },
      _addFilterEditor: function (layers) {
        if (this.config.editor.useFilterEditor === true && this.templatePicker) {
          if (this._filterEditor) {
            this._filterEditor.setTemplatePicker(this.templatePicker, layers);
          }
          else {
            this._filterEditorNode = domConstruct.create("div", {});
            this.templatePickerDiv.insertBefore(this._filterEditorNode,
              this.templatePicker.domNode);
            this._filterEditor = new SEFilterEditor({
              _templatePicker: this.templatePicker,
              _layers: layers,
              map: this.map,
              nls: this.nls
            }, this._filterEditorNode);
          }
        }
      },
      _activateEditToolbar: function (feature) {
        var layer = feature.getLayer();
        if (this.editToolbar.getCurrentState().tool !== 0) {
          this.editToolbar.deactivate();
        }
        switch (layer.geometryType) {
          case "esriGeometryPoint":
            this.editToolbar.activate(Edit.MOVE, feature);
            break;
          case "esriGeometryPolyline":
          case "esriGeometryPolygon":
            /*jslint bitwise: true*/
            this.editToolbar.activate(Edit.EDIT_VERTICES |
              Edit.MOVE |
              Edit.ROTATE |
              Edit.SCALE, feature);
            /*jslint bitwise: false*/
            break;
        }
      },
      _polygonToPolyline: function (polygon) {
        var polyline = new Polyline();
        array.forEach(polygon.rings, function (ring) {
          polyline.addPath(ring);
          //array.forEach(ring, function (part) {
          //  polyline.addPath(part);
          //});
        });
        polyline.spatialReference = polygon.spatialReference;
        return polyline;
      },
      _addRelatedFeatureToLocalLayer: function (graphic, fKeyField) {
        var newTempLayerInfos;
        var localLayerInfo = null;
        if (this.attrInspector &&
          this.attrInspector._attachmentUploader && this.attrInspector._attachmentUploader !== null) {
          this.attrInspector._attachmentUploader.clear();
        }
        this._removeLocalLayers();
        this.cacheLayer = this._cloneLayer(graphic.featureLayer.layerObject);
        var cacheLayerHandler = on(this.cacheLayer, "load", lang.hitch(this, function () {
          cacheLayerHandler.remove();
          /* TODO: CT - Not required as we will not be allowing to add geometry for related features
          if (this.cacheLayer.geometryType) {
            this.cacheLayer.setSelectionSymbol(this._getSelectionSymbol(this.cacheLayer.geometryType, true));
          }
          */
          localLayerInfo = this._getLayerInfoForLocalLayer(this.cacheLayer);
          newTempLayerInfos = [localLayerInfo];//this._converConfiguredLayerInfos([localLayerInfo]);
          this._createAttributeInspector([localLayerInfo], true, graphic.featureLayer.layerObject,
            null, null, fKeyField);
          var newAttributes = lang.clone(graphic.attributes);
          if (this._usePresetValues) {
            this._modifyAttributesWithPresetValues(newAttributes, newTempLayerInfos[0]);
          }
          var newGraphic = new Graphic(null, null, newAttributes);
          newGraphic.preEditAttrs = JSON.parse(JSON.stringify(newGraphic.attributes));
          this.cacheLayer.applyEdits([newGraphic], null, null, lang.hitch(this, function (e) {
            var queryTask = new Query();
            queryTask.objectIds = [e[0].objectId];
            this.cacheLayer.selectFeatures(queryTask, FeatureLayer.SELECTION_NEW, lang.hitch(this, function () {
              this.currentFeature = this.updateFeatures[0] = newGraphic;
              this.getConfigDefaults();
              this.geometryChanged = false;
              if (this._attributeInspectorTools) {
                this._attributeInspectorTools.triggerFormValidation();
              }
              var graphicOrigLyr = (this.currentFeature).getLayer();
              this.currentLayerInfo = this._getLayerInfoByID(graphicOrigLyr.id);
              this.currentLayerInfo.isCache = true;
              this._toggleDeleteButton(false);
              this._enableAttrInspectorSaveButton(this._validateAttributes(), true);
              this._toggleAttrInspectorNavButtons();
            }));
          }));
          this._showTemplate(false, false);
          if (this.config.editor.hasOwnProperty("autoSaveEdits") && this._autoSaveRuntime === true) {
            setTimeout(lang.hitch(this, function () {
              var saveBtn = query(".saveButton", this.attrInspector.domNode)[0];
              if (!saveBtn) {
              } else {
                on.emit(saveBtn, 'click', { cancelable: true, bubbles: true });
              }
            }), 100);
          }
        }));
      },

      _getCopyAttributes: function (layerInfo, geometry) {
        var defList = [], copyAttributesInfo = {}, coordinatesDef, resultDef;
        resultDef = new Deferred();
        coordinatesDef = new Deferred();
        //Get data required for intersection
        defList.push(this._intersectionUtils.getDistinctLayers(layerInfo, geometry));
        //Get coordinates info and on completing coordinates info get address info
        defList.push(coordinatesDef);
        coordinateUtils.getCoordinatesData(geometry, this.geometryService).then(
          lang.hitch(this, function (coordinatesInfo) {
            copyAttributesInfo.Coordinates = coordinatesInfo;
            this.addressUtils.locateAddress(coordinatesInfo.MapSpatialReference).then(
              function (addressInfo) {
                //once both coordinate and address infos are available resolve coordinatesDef
                copyAttributesInfo.Address = addressInfo;
                coordinatesDef.resolve(copyAttributesInfo);
              });
          }));
        //Once all info for Intersection, Coordinates and Address are available
        //resolve main result def with copyAttributesInfo object
        all(defList).then(lang.hitch(this, function (allResult) {
          copyAttributesInfo.Intersection = allResult[0];
          resultDef.resolve(copyAttributesInfo);
        }));
        return resultDef.promise;
      },

      // this function also create a new attribute inspector for the local layer
      _addGraphicToLocalLayer: function (evt) {
        if (this.templatePicker === undefined ||
          this.templatePicker === null) { return; }
        if (!this.templatePicker.getSelected()) { return; }
        var selectedTemp = this.templatePicker.getSelected();
        var newTempLayerInfos;
        var localLayerInfo = null;

        if (this.attrInspector) {
          if (this.attrInspector._attachmentUploader && this.attrInspector._attachmentUploader !== null) {
            this.attrInspector._attachmentUploader.clear();
          }
          this.attrInspector.destroy();
          this.attrInspector = null;
        }

        this._removeLocalLayers();
        // preparation for a new attributeInspector for the local layer

        this.cacheLayer = this._cloneLayer(this.templatePicker.getSelected().featureLayer);
        var cacheLayerHandler = on(this.cacheLayer, "load", lang.hitch(this, function () {
          cacheLayerHandler.remove();

          this.cacheLayer.setSelectionSymbol(this._getSelectionSymbol(this.cacheLayer.geometryType, true));

          localLayerInfo = this._getLayerInfoForLocalLayer(this.cacheLayer);
          newTempLayerInfos = [localLayerInfo];//this._converConfiguredLayerInfos([localLayerInfo]);

          this._createAttributeInspector([localLayerInfo], true, this.templatePicker.getSelected().featureLayer);

          if (this.config.editor.hasOwnProperty("editGeometryDefault") &&
            this.config.editor.editGeometryDefault === true) {
            //perform any edit geom switch functionality
            //only when working with main layers feature and not on related features
            setTimeout(lang.hitch(this, function () {
              if (this._traversal.length < 2) {
                this._editGeomSwitch.set('checked', true);
              }
            }), 100);
          }

          var newAttributes = lang.clone(selectedTemp.template.prototype.attributes);

          if (this.cacheLayer.geometryType === "esriGeometryPolyline" && evt.geometry.type === 'polygon') {
            evt.geometry = this._polygonToPolyline(evt.geometry);
          }
          this.loading.show();
          //load all the info required to copy attributes
          this._getCopyAttributes(localLayerInfo, evt.geometry).then(lang.hitch(this, function (copyAttributesInfo) {
            this._modifyAttributesWithPresetValues(newAttributes, newTempLayerInfos[0], copyAttributesInfo);
            this.loading.hide();
            //perform feature creation
            var newGraphic = new Graphic(evt.geometry, null, newAttributes);
            // store original attrs for later use
            newGraphic.preEditAttrs = JSON.parse(JSON.stringify(newGraphic.attributes));
            this.cacheLayer.applyEdits([newGraphic], null, null, lang.hitch(this, function (e) {
              var queryTask = new Query();
              queryTask.objectIds = [e[0].objectId];
              this.cacheLayer.selectFeatures(queryTask, FeatureLayer.SELECTION_NEW, lang.hitch(this, function () {
                this.currentFeature = this.updateFeatures[0] = newGraphic;
                this.getConfigDefaults();
                this.geometryChanged = false;
                //this._editGeomSwitch.set('checked', true);
                if (this._attributeInspectorTools) {
                  this._attributeInspectorTools.triggerFormValidation();
                }
                //this._attachLayerHandler();
                var graphicOrigLyr = (this.currentFeature).getLayer();
                this.currentLayerInfo = this._getLayerInfoByID(graphicOrigLyr.id);
                this.currentLayerInfo.isCache = true;
                //this._attachLayerHandler();
                this._toggleDeleteButton(false);
                //this._toggleEditGeoSwitch(false);

                //this._createSmartAttributes();
                //
                this._enableAttrInspectorSaveButton(this._validateAttributes());
                var paginationNode = query(".esriAttrPaginationDiv", this.domNode);
                //Hide attribute inspector's navigation button
                if (paginationNode && paginationNode[0]) {
                  domStyle.set(paginationNode[0], "display", "none");
                }
              }));
            }));


            this._showTemplate(false, false);

            if (this.config.editor.hasOwnProperty("autoSaveEdits") && this._autoSaveRuntime === true) {
              setTimeout(lang.hitch(this, function () {
                var saveBtn = query(".saveButton", this.attrInspector.domNode)[0];
                if (!saveBtn) {
                  //do nothing
                } else {
                  on.emit(saveBtn, 'click', { cancelable: true, bubbles: true });
                }
              }), 100);
            }
          }));
        }));
      },

      // cancel editing of the current feature
      _cancelEditingFeature: function (showTemplatePicker) {
        if (!this.currentFeature) { return; }

        if (showTemplatePicker) {

          this._showTemplate(true, false);
        } else { // show attr inspector

          // restore attributes & geometry
          if (this.currentFeature.preEditAttrs) {
            this.currentFeature.attributes = JSON.parse(JSON.stringify(this.currentFeature.preEditAttrs));
          }
          if (this.currentFeature.origGeom) {
            this.currentFeature.geometry = geometryJsonUtil.fromJson(this.currentFeature.origGeom);
          }
          this.currentFeature.getLayer().refresh();
          this.attrInspector.refresh();

          //reset
          this._resetEditingVariables();

        }
      },

      _addDateFormat: function (fieldInfo) {
        if (fieldInfo && fieldInfo.format && fieldInfo.format !==
          null) {
          if (fieldInfo.format.dateFormat && fieldInfo.format.dateFormat !==
            null) {
            if (fieldInfo.format.dateFormat.toString().toUpperCase().indexOf("TIME") >= 0) {
              fieldInfo.format.time = true;
            }
            //if (fieldInfo.format.dateFormat ===
            //  "shortDateShortTime" ||
            //  fieldInfo.format.dateFormat ===
            //  "shortDateLongTime" ||
            //  fieldInfo.format.dateFormat ===
            //  "shortDateShortTime24" ||
            //  fieldInfo.format.dateFormat ===
            //  "shortDateLEShortTime" ||
            //  fieldInfo.format.dateFormat ===
            //  "shortDateLEShortTime24" ||
            //  fieldInfo.format.dateFormat ===
            //  "shortDateLELongTime" ||
            //  fieldInfo.format.dateFormat ===
            //  "shortDateLELongTime24") {
            //  fieldInfo.format.time = true;
            //}
          }
        }
      },

      _processLayerFields: function (fields) {
        //Function required to add the Range details to a range domain so the layer can be cloned

        array.forEach(fields, function (field) {
          if (field.domain !== undefined && field.domain !== null) {
            if (field.domain.type !== undefined && field.domain.type !== null) {
              if (field.domain.type === 'range') {
                if (field.domain.hasOwnProperty('range') === false) {
                  field.domain.range = [field.domain.minValue, field.domain.maxValue];
                }
              }
            }

          }
        });

        return fields;
      },
      _iterateCollection: function (collection) {
        return function (f) {
          for (var i = 0; collection[i]; i++) {
            f(collection[i], i);
          }
        };
      },
      _cloneLayer: function (layer) {
        var cloneFeaturelayer;
        var fieldsproc = this._processLayerFields(layer.fields);
        var featureCollection = {
          layerDefinition: {
            "id": 0,
            "name": layer.name + this.nls.editorCache,
            "type": "Feature Layer",
            "displayField": layer.displayField,
            "description": "",
            "copyrightText": "",
            "relationships": [],
            "geometryType": layer.geometryType,
            "minScale": 0,
            "maxScale": 0,
            "extent": layer.fullExtent,
            "drawingInfo": {
              "renderer": layer.renderer,
              "transparency": 0,
              "labelingInfo": null
            },
            "hasAttachments": layer.hasAttachments,
            "htmlPopupType": "esriServerHTMLPopupTypeAsHTMLText",
            "objectIdField": layer.objectIdField,
            "globalIdField": layer.globalIdField,
            "typeIdField": layer.typeIdField,
            "fields": fieldsproc,
            "types": layer.types,
            "templates": layer.templates,
            "capabilities": "Create,Delete,Query,Update,Uploads,Editing",
            "editFieldsInfo": layer.editFieldsInfo === undefined ? null : layer.editFieldsInfo
          }
        };
        var outFields = layer.fields.map(function (f) {
          return f.name;
        });
        // only keep one local layer
        //var existingLayer = this.map.getLayer(layer.id + "_lfl");
        //if (existingLayer) {
        //  this.map.removeLayer(existingLayer);
        //}

        this._eventHandler = this.own(on(layer, "visibility-change", lang.hitch(this, function () {
          /*
          setTimeout(lang.hitch(this, function () {
            var cancelBtn = query(".cancelButton")[0];
            if (!cancelBtn) {
              //do nothing
            } else {
              on.emit(cancelBtn, 'click', { cancelable: true, bubbles: true });
            }
          }), 100);
          */
        })));

        cloneFeaturelayer = new FeatureLayer(featureCollection, {
          id: layer.id + "_lfl",
          outFields: outFields
        });
        cloneFeaturelayer.visible = true;
        cloneFeaturelayer.renderer = layer.renderer;
        cloneFeaturelayer.originalLayerId = layer.id;
        cloneFeaturelayer._wabProperties = { isTemporaryLayer: true };
        this.map.addLayer(cloneFeaturelayer);
        return cloneFeaturelayer;
      },
      _endsWith: function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
      },
      _validateEventHandler: function () {
        this._enableAttrInspectorSaveButton(this._validateAttributes());
      },
      _validateAttributes: function () {
        var attachmentValidationResult = [];
        var attachmentResult = true;
        var rowsWithGDBRequiredFieldErrors = this._validateRequiredFields();
        var featureHasEdits = this._validateFeatureChanged();

        var rowsWithSmartErrors = [];
        var formValid = true;
        if (this._smartAttributes !== undefined) {
          if (this._smartAttributes !== null) {
            rowsWithSmartErrors = this._smartAttributes.toggleFields();
          }
        }
        if (this._attributeInspectorTools !== undefined) {
          if (this._attributeInspectorTools !== null) {
            formValid = this._attributeInspectorTools.formValid();
          }
        }
        if (featureHasEdits && this.currentLayerInfo && this.currentLayerInfo.attachmentValidations) {
          array.forEach(this.currentLayerInfo.attachmentValidations.Actions,
            lang.hitch(this, function (action) {
              var attachmentObj = {};
              if (action.filter && this._smartAttributes) {
                attachmentObj.actionType = action.actionName;
                attachmentObj.result = this._smartAttributes.processFilter(action.filter);
                attachmentValidationResult.push(attachmentObj);
              }
            }));
          //Perform action based on feature is being created or updated
          if (this.attrInspector._attachmentUploader) {
            attachmentResult =
              this.performAction(this.attrInspector._attachmentUploader, attachmentValidationResult, true);
          } else if (this.attrInspector._attachmentEditor) {
            attachmentResult =
              this.performAction(this.attrInspector._attachmentEditor, attachmentValidationResult, false);
          }
        }
        return (editUtils.isObjectEmpty(rowsWithGDBRequiredFieldErrors) &&
          rowsWithSmartErrors.length === 0 && formValid && featureHasEdits && attachmentResult);
      },

      performAction: function (node, actions, isUploader) {
        var enableSaveButton = true;
        //Remove message which could be a result of previous required action
        domStyle.set(this.attrInspector.attachmentsRequiredMsg, "display", "none");
        array.some(actions, lang.hitch(this, function (action) {
          switch (action.actionType) {
            case 'Hide':
              if (action.result) {
                //Current Action
                this.currentAction = action.actionType;
                node.currentAction = action.actionType;
                domStyle.set(node.domNode, "display", "none");
                return true;
              }
              domStyle.set(node.domNode, "display", "block");
              break;
            case 'Disabled':
              if (action.result) {
                //Current Action
                this.currentAction = action.actionType;
                node.currentAction = action.actionType;
                if (!isUploader) {
                  this._disableAttachments(node, true, isUploader);
                } else {
                  domStyle.set(node.domNode, "display", "none");
                }
                return true;
              }
              this._disableAttachments(node, false, isUploader);
              domStyle.set(node.domNode, "display", "block");
              break;
            case 'Required':
              if (action.result) {
                //Current Action
                this.currentAction = action.actionType;
                node.currentAction = action.actionType;
                domStyle.set(node.domNode, "display", "block");
                if (!this._hasAddedAnyAttachments(node, isUploader)) {
                  enableSaveButton = false;
                  domStyle.set(this.attrInspector.attachmentsRequiredMsg, "display", "block");
                } else {
                  enableSaveButton = true;
                  domStyle.set(this.attrInspector.attachmentsRequiredMsg, "display", "none");
                }
                return true;
              } else {
                //Clear the current action variable for further processing
                this.currentAction = null;
                node.currentAction = null;
              }
              break;
          }
        }));
        return enableSaveButton;
      },

      _disableAttachments: function (node, isDisable, isUploader) {
        var display, warningNode;
        //set the sate of div
        display = isDisable ? "none" : "block";
        if (!isUploader) {
          //get warning node
          warningNode = this.attrInspector._attachmentEditor.domNode;
          if (query(".attwarning", warningNode)[0]) {
            domStyle.set(query(".attwarning", warningNode)[0], "display", display);
          }
          //set the display style
          domStyle.set(node._uploadForm, "display", display);
          //Loop through all the delete button nodes and set the display property as per the state
          array.forEach(node._attachmentList.childNodes, lang.hitch(this, function (childNode) {
            if (childNode.nodeName !== "#text") {
              var deleteButton = query(".deleteAttachment", childNode)[0];
              if (deleteButton) {
                domStyle.set(deleteButton, "display", display);
              }
            }
          }));
        }
      },

      _hasAddedAnyAttachments: function (node, isUploader) {
        var hasAttachments = false;
        //Check for attachments length and return the flag value
        if (!isUploader) {
          if (node._attachmentList.childNodes.length > 0 &&
            node._attachmentList.childNodes[0].nodeName !== "#text") {
            return true;
          }
          return false;
        }
        for (var i = 0; i < node._attachmentList.childNodes.length; i++) {
          if (node._attachmentList.childNodes[i].childNodes &&
            node._attachmentList.childNodes[i].childNodes.length > 0 &&
            node._attachmentList.childNodes[i].childNodes[1].value) {
            if (node._attachmentList.childNodes[i].childNodes[1].value.length > 0) {
              hasAttachments = true;
              break;
            }
          }
        }
        return hasAttachments;
      },

      _toggleEditGeoSwitch: function (disable) {
        //return if _editGeomSwitch is not available or
        //traversal length is greater than one i.e. showing attribute inspector of related records
        if (this._editGeomSwitch === undefined || this._editGeomSwitch === null ||
          this._traversal.length > 1) {
          return;
        }
        if (disable === false) {
          if (this.currentLayerInfo && this.currentLayerInfo._editFlag) {
            dojo.style(this._editGeomSwitch.domNode.parentNode, "display", "block");
          } else {
            dojo.style(this._editGeomSwitch.domNode.parentNode, "display", "none");
          }
        }
        else {
          dojo.style(this._editGeomSwitch.domNode.parentNode, "display", "none");
        }
        this._turnEditGeometryToggleOff();

      },
      _recordLoadeAttInspector: function () {
        this.getConfigDefaults();
      },
      editGeoCheckChange: function () {
        return function () {
          this._editGeometry(this._editGeomSwitch.checked);
        };
      },

      _attributeInspectorChangeRecord: function (evt) {
        //this._turnEditGeometryToggleOff();
        //CT - commented the code in if block as we are displaying Prompt On Save on next button click
        if (this._validateFeatureChanged() && this.currentFeature) {
          // do not show templatePicker after saving
          //   if (this.config.editor.displayPromptOnSave && this.config.editor.displayPromptOnSave === true) {
          //     this._promptToResolvePendingEdit(false, evt, false, true);
          //   }
        } else {
          this._postFeatureSave(evt);
        }
        this._recordLoadeAttInspector();
      },
      _addWarning: function () {
        if (query(".attwarning", this.attrInspector.domNode).length === 0) {
          var txt = domConstruct.create("div", { 'class': 'attwarning' });
          txt.innerHTML = this.nls.attachmentSaveDeleteWarning;
          if (this.attrInspector._attachmentEditor !== undefined &&
            this.attrInspector._attachmentEditor !== null) {
            this.attrInspector._attachmentEditor.domNode.appendChild(txt);
          }

        }
      },

      _hasAnyEditableLayerInRelation: function (layerInfos) {
        var showLayer = false;
        array.forEach(layerInfos, lang.hitch(this, function (layer) {
          if (showLayer) {
            return true;
          }
          if (layer._editFlag === true) {
            showLayer = true;
          } else if (layer.relationshipInfos && layer.relationshipInfos.length > 0) {
            showLayer = this._hasAnyEditableLayerInRelation(layer.relationshipInfos);
          }
        }));
        return showLayer;
      },

      _processRelationAndShowAttrInspector: function (processRelations, evt, layer, def, relatedFeat, isTempFeature) {
        var layerNode;
        if (this.contentWrapper && this.contentWrapper.parentNode &&
          !domClass.contains(this.contentWrapper, "hidden")) {
          this.contentWrapper.parentNode.removeChild(this.contentWrapper);
        }
        //dom for item list and navigation content
        this.contentWrapper = domConstruct.create("div", {
          "class": "detailsContainer"
        }, this.mainContainer);
        // dom for navigation buttons
        var navButtonsDiv = domConstruct.create("div", {
          "class": "esriAttributeInspector esriAttrPaginationDiv"
        }, this.contentWrapper);
        domConstruct.place(this.attrInspector.navButtons, navButtonsDiv, "first");
        // dom for item list
        var itemListContainer = domConstruct.create("div", {
          "class": "esriCTItemListContainer"
        }, this.contentWrapper);
        if (evt && evt.feature) {
          layer = evt.feature._layer;
          //update symbol of prev selected feature
          if (this.currentFeature && layer.id === this.currentFeature._layer.id) {
            this.currentFeature.setSymbol(this._getSelectionSymbol(
              this.currentFeature.getLayer().geometryType, false));
          }
          //update currentFeature
          this.currentFeature = evt.feature;
          this.currentFeature.preEditAttrs = JSON.parse(JSON.stringify(this.currentFeature.attributes));
          this.currentLayerInfo = this._getLayerInfoByID(layer.id);
          //Set highlight symbol to current selected feature
          this.currentFeature.setSymbol(this._getSelectionSymbol(
            this.currentFeature.getLayer().geometryType, true));
          //toggle delete button as per current feature
          this._toggleDeleteButton(this.attrInspector._currentLInfo.allowDelete);
          //Disable attachments editor for the layers which are not editable
          //add timeout as it is taking some time to load editor
          this.loading.show();
          setTimeout(lang.hitch(this, function () {
            if (this.attrInspector._attachmentEditor && (!this.currentLayerInfo.isEditable ||
              !this.currentLayerInfo._editFlag)) {
              this._disableAttachments(this.attrInspector._attachmentEditor, true, false);
            }
            this.loading.hide();
          }), 2000);
        }
        if (layer) {
          layerNode = this.addItem(layer.name, true, itemListContainer, layer.id, isTempFeature);
        }
        if (processRelations && evt.feature) {
          if (this._traversal.length > 0) {
            this._traversal[this._traversal.length - 1] = evt.feature._layer.id;
          } else {
            this._traversal.push(evt.feature._layer.id);
          }
          //check for the relationship of selected features layer
          var relatedTableInfos = this._getRelationshipInfo(evt.feature);
          var feature = {
            "attributes": lang.clone(evt.feature.attributes),
            "_layer": evt.feature._layer
          };
          var relatedOBJID;
          if (relatedFeat) {
            relatedOBJID = [];
            array.forEach(relatedFeat, function (feat) {
              relatedOBJID.push(feat.attributes[feat._layer.objectIdField]);
            });
          }
          if (relatedTableInfos && relatedTableInfos.length > 0) {
            var filterdRelatedInfos = [];
            array.forEach(relatedTableInfos, lang.hitch(this, function (relationship) {
              var showRelatedLayer = relationship._editFlag;
              if (!relationship._editFlag &&
                relationship.relationshipInfos && relationship.relationshipInfos.length > 0) {
                showRelatedLayer =
                  this._hasAnyEditableLayerInRelation(relationship.relationshipInfos);
              }
              if (showRelatedLayer &&
                relationship.featureLayer && relationship.hasOwnProperty('relationshipId')) {
                filterdRelatedInfos.push(relationship);
              }
            }));
            if (filterdRelatedInfos.length > 0) {
              var contentPanel = query(".esriCTItemContent", itemListContainer);
              if (contentPanel && contentPanel[0]) {
                domClass.remove(contentPanel[0], "esriCTRelatedItemContent");
              }
              this._relatedTablesInfo[evt.feature._layer.id] = {};
              this._relatedTablesInfo[evt.feature._layer.id] = new relatedTables({
                relationshipInfo: filterdRelatedInfos,
                layerInfosObj: this._jimuLayerInfos,
                parentFeature: feature,
                parentFeatureIndexInAI: this.attrInspector._featureIdx,
                parentFieldInfos: this.currentLayerInfo.fieldInfos,
                config: this.config,
                nls: this.nls
              }, domConstruct.create('div'));
              this.own(on(this._relatedTablesInfo[evt.feature._layer.id], "addRelatedRecord",
                lang.hitch(this,
                  function (relatedNewFeature, relatedDomNode, layerId, parentFeatureIndexInAI, fKeyField) {
                    //hide parent features content
                    domClass.add(this.contentWrapper, "hidden");
                    //Store the parent features index in AI object
                    this.attrInspector.ctStoredFeatureIndex = parentFeatureIndexInAI;
                    //push the AI, ContentWrapper and Parent layerID in an array
                    this._attributeInspectorCollection.push(this.attrInspector);
                    this._nodesCollection.push(this.contentWrapper);
                    this._traversal.push(layerId);
                    //store related layer/tables dom which will be used to click once feature is saved
                    this.currentRelatedDom = relatedDomNode;
                    //finally add the feature to local layer
                    this._addRelatedFeatureToLocalLayer(relatedNewFeature, fKeyField);
                    this._addingNewRelatedRecord = true;
                  })));
              this.own(on(this._relatedTablesInfo[evt.feature._layer.id], "titleClicked",
                lang.hitch(this, function (layerId, relationshipId, isNewFeature,
                  parentFeatureIndexInAI, parentOID, fKeyField) {
                  if (this.addNewRelatedRecord) {
                    isNewFeature = true;
                    this.addNewRelatedRecord = false;
                  }
                  this._editGeomSwitch.set("checked", false);
                  if (!isNewFeature && this.currentFeature &&
                    this.config.editor.displayPromptOnSave && this._validateFeatureChanged()) {
                    this._promptToResolvePendingEdit(false, null, true).then(lang.hitch(this, function () {
                      this._fetchRelatedRecords(isNewFeature, evt.feature._layer,
                        relationshipId, layerId, parentOID, parentFeatureIndexInAI, relatedOBJID, fKeyField);
                    }), function () {
                    });
                  } else {
                    this._fetchRelatedRecords(isNewFeature, evt.feature._layer,
                      relationshipId, layerId, parentOID, parentFeatureIndexInAI, relatedOBJID, fKeyField);
                  }
                })));
              this.addItem(this.nls.relatedItemTitle, false, itemListContainer, null, false);
            } else {
              this._disableToggling(layerNode);
            }
          } else {
            this._disableToggling(layerNode);
          }
          if (def) {
            def.resolve();
          }
        } else {
          if (def) {
            def.resolve();
          }
        }
      },

      _fetchRelatedRecords: function (isNewFeature, layer,
        relationshipId, layerId, parentOID, parentFeatureIndexInAI, relatedOBJID, fKeyField) {
        //get related records for the selected layer/table
        this._getRelatedRecordsByRelatedQuery(
          layer, relationshipId, layerId, parentOID).then(lang.hitch(this, function (oIds) {
            if (oIds && oIds.length === 0) {
              if (isNewFeature) {
                domClass.remove(this.contentWrapper, "hidden");
                this.attrInspector.refresh();
                setTimeout(lang.hitch(this, function () {
                  domStyle.set(this.attrInspector.navButtons, "display",
                    (!this.attrInspector._hideNavButtons && (this.attrInspector._numFeatures > 1) ? "" : "none"));
                  this.attrInspector.navMessage.innerHTML = esriLang.substitute({
                    idx: this.attrInspector._featureIdx + 1,
                    of: this.attrInspector.NLS_of,
                    numFeatures: this.attrInspector._numFeatures
                  }, this.attrInspector._navMessage);
                  this.currentFeature = this.attrInspector._numFeatures ?
                    this.attrInspector._selection[this.attrInspector._featureIdx] : null;
                  this.currentFeature.preEditAttrs = JSON.parse(JSON.stringify(this.currentFeature.attributes));
                }), 200);
              }
              Message({
                message: this.nls.noRelatedFeatureFoundMsg
              });
              return;
            }
            domClass.add(this.contentWrapper, "hidden");
            //store AI's _featureIdx which will be used when coming back to parent feature
            this.attrInspector.ctStoredFeatureIndex = parentFeatureIndexInAI;
            this._attributeInspectorCollection.push(this.attrInspector);
            this._nodesCollection.push(this.contentWrapper);
            //push selected layer's id
            this._traversal.push(layerId);
            if (relatedOBJID) {
              oIds = [];
              oIds = relatedOBJID;
              relatedOBJID = null;
            }
            if (oIds && oIds.length > 0) {
              var newDef, queryObj = new Query();
              queryObj.objectIds = oIds;
              if (this.viewedLayerDetails.length > 0) {
                newDef = new Deferred();
                var tempFeature = this.viewedFeatureDetails[0];
                if (this.viewedLayerDetails[0] === this.viewedLayerDetails[1]) {
                  tempFeature = this.viewedFeatureDetails[1];
                }
                this._createAttributeInspector([this._getLayerInfoByID(layerId)], false, null,
                  newDef, tempFeature, fKeyField);
              } else {
                this._createAttributeInspector([this._getLayerInfoByID(layerId)], false, null,
                  null, null, fKeyField);
              }
              var relatedLayer = this._jimuLayerInfos.getLayerOrTableInfoById(layerId).layerObject;
              this.loading.show();
              relatedLayer.selectFeatures(queryObj, FeatureLayer.SELECTION_NEW,
                lang.hitch(this, function (selectedFeatures) {
                  //if adding new related record or while adding new related record back button is clicked
                  //then empty the current feature as it will enter in next callback of ATI when we the last record is selected
                  if ((this._addingNewRelatedRecord && this._processBackButtonInNewRelatedRecord) || isNewFeature) {
                    this.currentFeature = null;
                  }
                  //update the features
                  this.updateFeatures = selectedFeatures;
                  //If new feature is created go to the last feature of attribute inspector
                  if (isNewFeature) {
                    this.attrInspector.last();
                  } else {
                    this.attrInspector.first();
                  }
                  //update current feature
                  this.currentFeature = this.attrInspector._numFeatures ?
                    this.attrInspector._selection[this.attrInspector._featureIdx] : null;
                  this.currentFeature.preEditAttrs = JSON.parse(JSON.stringify(this.currentFeature.attributes));
                  if (this.updateFeatures.length > 0) {
                    this._showTemplate(false);
                  }
                  if (this._addingNewRelatedRecord && this._processBackButtonInNewRelatedRecord) {
                    this._addingNewRelatedRecord = false;
                    this._processBackButtonInNewRelatedRecord = false;
                    this._onCancelButtonClicked();
                  }
                  this.loading.hide();
                }),
                lang.hitch(this, function () {
                  this.loading.hide();
                }));
              if (newDef) {
                newDef.then(lang.hitch(this, function () {
                  if (this.viewedLayerDetails.length > 0) {
                    var relatedFeatureLayerId = this.viewedLayerDetails.shift();
                    var relatedFeatures = this.viewedFeatureDetails.shift();
                    if (this.viewedLayerDetails.length > 0 && this.viewedLayerDetails[0] === relatedFeatureLayerId) {
                      this.viewedLayerDetails.shift();
                      relatedFeatures = this.viewedFeatureDetails.shift();
                    }
                    var tableTitle = query("[layerid='" + relatedFeatureLayerId + "']", this.contentWrapper)[0];
                    tableTitle.click();
                  }
                  if (this.viewedLayerDetails.length === 0) {
                    this.loading.hide();
                  }
                }));
              }
            }
          }));
      },

      _createAttributeInspector: function (layerInfos, featureCreated, layer, def, feature, fKeyField) {
        var attachmentRefNode;
        //perform any edit geom switch functionality
        //only when working with main layers feature and not on related features
        //destroy the edit geom switch
        if (this._traversal.length < 2) {
          if (this._editGeomSwitch) {
            this._editGeomSwitch.destroy();
            this._editGeomSwitch = null;
          }

          if (this.editSwitchDiv) {
            while (this.editSwitchDiv.firstChild) {
              this.editSwitchDiv.removeChild(this.editSwitchDiv.firstChild);
            }
          }
        }

        if (this.attrInspector) {
          //  this.attrInspector.destroy();
          //  this.attrInspector = null;

        }
        //if related feature is selected, disable the foreign key field in attribute inspector
        if (fKeyField) {
          array.forEach(layerInfos[0].fieldInfos, lang.hitch(this, function (field) {
            if (field.name === fKeyField) {
              field.isEditable = false;
            }
          }));
        }
        this.attrInspector = editUtils.ATI({//new AttributeInspector({
          layerInfos: layerInfos
        }, html.create("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }));
        this.attrInspector.startup();
        domConstruct.place(this.attrInspector.navMessage, this.attrInspector.nextFeatureButton.domNode, "before");
        //perform any edit geom switch functionality
        //only when working with main layers feature and not on related features
        if (this._traversal.length < 2) {
          this.editSwitchDiv = domConstruct.create("div");
          this.editSwitchDiv.appendChild(domConstruct.create("div", { "class": "spacer" }));
          // edit geometry toggle button
          this._editGeomSwitch = new CheckBox({
            id: "editGeometrySwitch_" + this.attrInspector.id,
            checked: false,
            value: this.nls.editGeometry
          }, null);

          this.editSwitchDiv.appendChild(this._editGeomSwitch.domNode);

          domConstruct.place(lang.replace(
            "<label for='editGeometrySwitch_'" + this.attrInspector.id + ">{replace}</label></br></br>",
            { replace: this.nls.editGeometry }), this._editGeomSwitch.domNode, "after");

          domConstruct.place(this.editSwitchDiv, this.attrInspector.deleteBtn.domNode, "before");

          this.own(on(this._editGeomSwitch, 'Change', lang.hitch(this,
            this.editGeoCheckChange())));

          // Button to refresh attributes on geometry change
          this._refreshButton = domConstruct.create("div", {
            "class": "refreshAttributes hidden"
          }, this.attrInspector.deleteBtn.domNode, "after");
          this.own(on(this._refreshButton, 'click', lang.hitch(this, this._refreshAttributes)));
        }
        // save button
        var saveButton = domConstruct.create("div", {
          innerHTML: this.nls.save,
          "class": "saveButton jimu-btn jimu-state-disabled"
        }, this.attrInspector.deleteBtn.domNode, "after");

        //Hide Attribute inspector's delete button
        domStyle.set(this.attrInspector.deleteBtn.domNode, "display", "none");

        //add another process indicator
        //domConstruct.create("div", {
        //  "class": "processing-indicator"
        //}, saveButton, "before");
        if (query(".deleteButton", this.attrInspector.domNode).length < 1) {
          var deleteButton = domConstruct.create("div", {
            innerHTML: this.nls.deleteText,
            "class": "deleteButton jimu-btn jimu-btn-vacation"
          }, saveButton, "after");
          // query(".jimu-widget-smartEditor .topButtonsRowDiv")[0], "first");

          on(deleteButton, "click", lang.hitch(this, function () {
            //if (this.currentFeature) {
            if (this.map.infoWindow.isShowing) {
              this.map.infoWindow.hide();
            }

            if (this.config.editor.displayPromptOnDelete) {
              this._promptToDelete();

            } else {
              this._deleteFeature();
            }
            //}
          }));
        }

        this.own(on(saveButton, "click", lang.hitch(this, function () {
          if (!this._validateFeatureChanged()) {
            this._resetEditingVariables();
            return;
          }

          if (this.map.infoWindow.isShowing) {
            this.map.infoWindow.hide();
          }
          this._saveEdit(this.currentFeature);
        })));
        //Code to support selection updated from select widget
        //Listen for onLayerSelectionChange
        aspect.after(this.attrInspector, "onLayerSelectionChange",
          lang.hitch(this, function () {
            if (this.state !== 'active') {
              if (this._LayerSelectionChangedTimer) {
                clearTimeout(this._LayerSelectionChangedTimer);
              }
              this._LayerSelectionChangedTimer = setTimeout(lang.hitch(this, function () {
                if (this.attrInspector) {
                  this.attrInspector.first();
                }
              }), 500);
            }
          }));
        //Listen for all the necessary events
        if (this.attrInspector._attachmentEditor) {
          //Listen for delete attachments event
          aspect.after(this.attrInspector._attachmentEditor, "_onDeleteAttachmentComplete",
            lang.hitch(this, function () {
              //If "Required" action is performed and at no attachment is present
              //show the required message
              if (!this._hasAddedAnyAttachments(this.attrInspector._attachmentEditor, false) &&
                this.currentAction === "Required") {
                domStyle.set(this.attrInspector.attachmentsRequiredMsg, "display", "block");
              }
              this._enableAttrInspectorSaveButton(this._validateAttributes());
            }));
          //Listen for attachments complete event
          aspect.after(this.attrInspector._attachmentEditor, "_onAddAttachmentComplete",
            lang.hitch(this, function () {
              if (domStyle.get(this.attrInspector.attachmentsRequiredMsg, "display") === "block") {
                domStyle.set(this.attrInspector.attachmentsRequiredMsg, "display", "none");
              }
              this._enableAttrInspectorSaveButton(this._validateAttributes());
            }));
          //Listen for all the attachments complete event
          aspect.after(this.attrInspector._attachmentEditor, "_getAttachments",
            lang.hitch(this, function () {
              this.loading.show();
              setTimeout(lang.hitch(this, function () {
                if (this.currentLayerInfo && this.currentLayerInfo.attachmentValidations) {
                  if (this.currentLayerInfo.attachmentValidations) {
                    var attachmentValidationResult = [];
                    array.forEach(this.currentLayerInfo.attachmentValidations.Actions,
                      lang.hitch(this, function (action) {
                        var attachmentObj = {};
                        if (action.filter && this._smartAttributes) {
                          attachmentObj.actionType = action.actionName;
                          attachmentObj.result = this._smartAttributes.processFilter(action.filter);
                          attachmentValidationResult.push(attachmentObj);
                        }
                      }));
                    if (this.attrInspector._attachmentUploader) {
                      this.performAction(this.attrInspector._attachmentUploader, attachmentValidationResult, true);
                    } else {
                      this.performAction(this.attrInspector._attachmentEditor, attachmentValidationResult, false);
                    }
                  }
                }
                this.loading.hide();
              }), 1500);
            }));
        }
        // edit geometry checkbox event

        // attribute inspector events
        this.own(on(this.attrInspector, "attribute-change", lang.hitch(this, function (evt) {
          if (this.currentFeature) {
            this.currentFeature.attributes[evt.fieldName] = evt.fieldValue;
            this._enableAttrInspectorSaveButton(this._validateAttributes());
          }
        })));

        this.own(on(this.attrInspector, "next", lang.hitch(this, function (evt) {
          if (this.currentFeature && this.config.editor.displayPromptOnSave && this._validateFeatureChanged()) {
            this._promptToResolvePendingEdit(false, null, false).then(
              lang.hitch(this, function () {
                this._processNextButtonClicked(true, evt, null, def, feature);
              }), function () {
              });
          } else {
            this._processNextButtonClicked(true, evt, null, def, feature);
          }
        })));

        this.attrInspector.attachmentsRequiredMsg = domConstruct.create("div", {
          "innerHTML": this.nls.attachmentsRequiredMsg,
          "style": "display:none;color:red;margin-top:5px"
        });
        if (layerInfos.length === 1) {
          if (layerInfos[0].featureLayer.hasOwnProperty('originalLayerId')) {
            var result = this._getLayerInfoByID(layerInfos[0].featureLayer.originalLayerId);
            if (result.featureLayer.hasAttachments === true) {
              var attachNode = domConstruct.create("div");
              domConstruct.place(attachNode, this.attrInspector.attributeTable, "after");
              this.attrInspector._attachmentUploader = new AttachmentUploader(
                {
                  'class': 'atiAttachmentEditor',
                  attachmentsRequiredMsg: this.attrInspector.attachmentsRequiredMsg,
                  currentAction: this.currentAction
                },
                attachNode);
              this.attrInspector._attachmentUploader.startup();
              on(this.attrInspector._attachmentUploader, "attachmentAdded",
                lang.hitch(this, function () {
                  this._enableAttrInspectorSaveButton(this._validateAttributes());
                }));
              on(this.attrInspector._attachmentUploader, "attachmentDeleted",
                lang.hitch(this, function () {
                  this._enableAttrInspectorSaveButton(this._validateAttributes());
                }));
            }
          }
        }

        //Place the attachments warning as per create/edit mode
        if (this.attrInspector._attachmentUploader) {
          attachmentRefNode = this.attrInspector._attachmentUploader.domNode;
        } else if (this.attrInspector._attachmentEditor) {
          attachmentRefNode = this.attrInspector._attachmentEditor.domNode;
        }
        //If node exist, create message and add it to node
        if (attachmentRefNode) {
          domConstruct.place(this.attrInspector.attachmentsRequiredMsg, attachmentRefNode, "before");
        }
        if (featureCreated) {
          this._processRelationAndShowAttrInspector(false, null, layer, null, null, true);
        }
      },

      _processNextButtonClicked: function (processRelations, evt, layer, def, feature) {
        this._processRelationAndShowAttrInspector(processRelations, evt, layer, def, feature, false);
        this._attributeInspectorChangeRecord(evt);
        this._addWarning();
        this._toggleAttrInspectorNavButtons();
      },

      _toggleDeleteButton: function (show) {
        var deleteButton;
        deleteButton = query(".deleteButton", this.attrInspector.domNode);
        if (deleteButton.length > 0) {
          deleteButton = deleteButton[0];
          if (show === true) {
            deleteButton.style.display = "block";
          } else {
            deleteButton.style.display = "none";
          }
        }
      },

      _activateTemplateToolbar: function (override) {

        var draw_type = override || null;
        var shape_type = null;
        if (this.templatePicker) {
          var selectedTemplate = this.templatePicker.getSelected();
          if (selectedTemplate && selectedTemplate !== null) {
            shape_type = selectedTemplate.featureLayer.geometryType;
            if (selectedTemplate.template !== undefined && selectedTemplate.template !== null &&
              selectedTemplate.template.drawingTool !== undefined && selectedTemplate.template.drawingTool !== null) {
              switch (selectedTemplate.template.drawingTool) {
                case "esriFeatureEditToolNone":
                  switch (selectedTemplate.featureLayer.geometryType) {
                    case "esriGeometryPoint":
                      draw_type = draw_type !== null ? draw_type : Draw.POINT;
                      break;
                    case "esriGeometryPolyline":
                      draw_type = draw_type !== null ? draw_type : Draw.POLYLINE;
                      break;
                    case "esriGeometryPolygon":
                      draw_type = draw_type !== null ? draw_type : Draw.POLYGON;
                      break;
                  }
                  break;
                case "esriFeatureEditToolPoint":
                  draw_type = draw_type !== null ? draw_type : Draw.POINT;
                  break;
                case "esriFeatureEditToolLine":
                  draw_type = draw_type !== null ? draw_type : Draw.POLYLINE;
                  break;
                case "esriFeatureEditToolAutoCompletePolygon":
                case "esriFeatureEditToolPolygon":
                  draw_type = draw_type !== null ? draw_type : Draw.POLYGON;
                  break;
                case "esriFeatureEditToolCircle":
                  draw_type = draw_type !== null ? draw_type : Draw.CIRCLE;
                  break;
                case "esriFeatureEditToolEllipse":
                  draw_type = draw_type !== null ? draw_type : Draw.ELLIPSE;
                  break;
                case "esriFeatureEditToolRectangle":
                  draw_type = draw_type !== null ? draw_type : Draw.RECTANGLE;
                  break;
                case "esriFeatureEditToolFreehand":
                  switch (selectedTemplate.featureLayer.geometryType) {
                    case "esriGeometryPoint":
                      draw_type = draw_type !== null ? draw_type : Draw.POINT;
                      break;
                    case "esriGeometryPolyline":
                      draw_type = draw_type !== null ? draw_type : Draw.FREEHAND_POLYLINE;
                      break;
                    case "esriGeometryPolygon":
                      draw_type = draw_type !== null ? draw_type : Draw.FREEHAND_POLYGON;
                      break;
                  }
                  break;
                default:
                  switch (selectedTemplate.featureLayer.geometryType) {
                    case "esriGeometryPoint":
                      draw_type = draw_type !== null ? draw_type : Draw.POINT;
                      break;
                    case "esriGeometryPolyline":
                      draw_type = draw_type !== null ? draw_type : Draw.POLYLINE;
                      break;
                    case "esriGeometryPolygon":
                      draw_type = draw_type !== null ? draw_type : Draw.POLYGON;
                      break;
                  }
                  break;
              }
            }
            else {
              switch (selectedTemplate.featureLayer.geometryType) {
                case "esriGeometryPoint":
                  draw_type = draw_type !== null ? draw_type : Draw.POINT;
                  break;
                case "esriGeometryPolyline":
                  draw_type = draw_type !== null ? draw_type : Draw.POLYLINE;
                  break;
                case "esriGeometryPolygon":
                  draw_type = draw_type !== null ? draw_type : Draw.POLYGON;
                  break;
              }
            }
            this.drawToolbar.activate(draw_type);
            this._setDrawingToolbar(shape_type, draw_type);

          }

          else if (this.drawToolbar) {
            this._setDrawingToolbar("select", null);
            this.drawToolbar.deactivate();
            // this._lastDrawnShape = null;
          }
        }
        else if (this.drawToolbar) {
          this._setDrawingToolbar("select", null);
          this.drawToolbar.deactivate();
          //this._lastDrawnShape = null;
        }
      },
      _templatePickerNeedsToBeCreated: function () {
        //if (this.templatePicker === undefined || this.templatePicker === null) {
        //  return true;
        //}
        return true;
        //var recreate = array.some(layers, function (layer) {
        //  var layerMatches = array.some(this.templatePicker.featureLayers, function (tpLayer) {
        //    return tpLayer.id === layer.id;
        //  });
        //  if (layerMatches === false) {
        //    return true;
        //  }
        //  return false;
        //}, this);
        //return recreate;
      },

      /* CT - Commented the code as it was clearing parent features selection when moving to related feature
      _layerChangeOutside: function () {
        if (this._attrInspIsCurrentlyDisplayed && this._attrInspIsCurrentlyDisplayed === true) {
          if (this.attrInspector) {
            if (this.attrInspector._numFeatures === 0) {
              this._showTemplate(true);

            }
          }
        }
      },
      */

      _drawingToolClick: function (shapeType, options) {
        return function () {
          if (shapeType !== "select") {
            this.drawingTool.set('label', options.label);
            this.drawingTool.set('iconClass', options.iconClass);
            this.drawToolbar.activate(options._drawType);
            this.currentDrawType = options._drawType;
            this.currentShapeType = shapeType;
          }
        };
      },
      _menus: {},
      drawingTool: null,
      _setDrawingToolbar: function (shapeType, drawType) {
        if (this.drawingTool === null || this.drawingTool === undefined) {
          return;
        }
        if (this.currentShapeType === null ||
          this.currentShapeType === undefined ||
          this.currentShapeType !== shapeType) {
          this.drawingTool.set('dropDown', this._menus[shapeType]);
        }

        this.currentShapeType = shapeType;

        this.currentDrawType = null;

        array.some(SEDrawingOptions[shapeType], function (options) {
          if (options._drawType === drawType || drawType === null) {
            this.drawingTool.set('label', options.label);
            this.drawingTool.set('iconClass', options.iconClass);
            this.currentDrawType = options._drawType;
            return true;
          }
          else {
            return false;
          }
        }, this);

        //if the proper type was not found, set to first
        if (this.currentDrawType === null || this.currentDrawType === undefined) {
          this.drawingTool.set('label', SEDrawingOptions[shapeType][0].label);
          this.drawingTool.set('iconClass', SEDrawingOptions[shapeType][0].iconClass);
          this.currentDrawType = SEDrawingOptions[shapeType][0]._drawType;
        }
      },
      _createDrawingToolbar: function () {

        if (this.config.editor.hasOwnProperty("displayShapeSelector")) {
          if (this.config.editor.displayShapeSelector === true) {
            this._menus = this._createDrawingMenus();
            this.drawingTool = new DropDownButton({
              label: "",
              name: "drawingTool",
              id: "drawingTool"
            }, this.drawingOptionsDiv);
            this.drawingTool.startup();
            this._setDrawingToolbar("select", null);

          }
        }
        else {
          this.config.editor.displayShapeSelector = false;
        }

      },
      _createMenu: function (drawingOption) {
        var menu = new DropDownMenu({ style: "display: none;" });
        array.forEach(drawingOption, function (options) {

          options = lang.mixin(options,
            {
              onClick: lang.hitch(this, this._drawingToolClick(drawingOption, options))
            }
          );
          var menuItem = new MenuItem(options);

          menu.addChild(menuItem);
        }, this);
        menu.startup();
        return menu;
      },
      _createDrawingMenus: function () {
        var menus = {};
        for (var property in SEDrawingOptions) {
          menus[property] = this._createMenu(SEDrawingOptions[property]);
        }
        return menus;
      },
      _createEditor: function () {
        var selectedTemplate = null;

        if (this.config.editor === undefined || this.config.editor === null) {
          return;
        }
        var layers = this._getEditableLayers(this.config.editor.configInfos, false);
        //CT: Commented the code as it was clearing parent features selection when moving to related feature
        //this._layerChangeOutside();
        if (layers.length < 1) {
          this._creationDisabledOnAll = true;
        }
        else if (this._templatePickerNeedsToBeCreated()) {
          if (this._attrInspIsCurrentlyDisplayed && this._attrInspIsCurrentlyDisplayed === true) {
            this._recreateOnNextShow = true;
            return;
          }
          if (this.templatePicker &&
            this.templatePicker !== null) {
            //Get the current selected drawing tool to reset on template
            var curSelectedDrawOption = this.currentDrawType;
            selectedTemplate = this.templatePicker.getSelected();
            if (selectedTemplate === null) {
              if (this.drawToolbar) {

                this.drawToolbar.deactivate();
              }
            }
            this._select_change_event.remove();
            this.templatePicker.destroy();
            this._resetEditingVariables();
            if (this.drawToolbar) {
              this.drawToolbar.deactivate();
            }
            if (this.drawingTool) {
              this._setDrawingToolbar("select", null);
            }
          }
          else {
            this._createAutoSaveSwitch(this.config.editor.autoSaveEdits);
          }
          //create template picker
          this.templatePickerNode = domConstruct.create("div",
            { 'class': "eeTemplatePicker" }
          );
          //if (this.state === "active") {
          //  this.widgetActiveIndicator = domConstruct.create("div",
          //   { 'class': "widgetActive" }
          //   );
          //}
          //else {
          //  this.widgetActiveIndicator = domConstruct.create("div",
          //  { 'class': "widgetNotActive" }
          //  );
          //}
          this.templatePickerDiv.appendChild(this.templatePickerNode);
          this.templatePicker = new TemplatePicker({
            featureLayers: layers,
            'class': 'esriTemplatePicker',
            grouping: true,
            maxLabelLength: "25",
            showTooltip: false
          }, this.templatePickerNode);
          this.templatePicker.startup();

          //this.templatePicker.domNode.appendChild(this.widgetActiveIndicator);
          //this.templatePickerNode.appendChild(this.templatePicker.domNode);
          this._addFilterEditor(layers);
          // wire up events

          if (selectedTemplate !== null && this.templatePicker) {
            var keysArr = Object.getOwnPropertyNames(this.templatePicker._itemWidgets);
            var templateItems = [];
            array.forEach(this.templatePicker._flItems, function (flItems) {
              array.forEach(flItems, function (flItem) {
                templateItems.push(flItem);
              });
            });
            if (templateItems.length === keysArr.length) {
              var itemFnd = array.some(templateItems, function (item, index) {
                if (selectedTemplate.featureLayer.id === item.layer.id &&
                  item.template.name === selectedTemplate.template.name &&
                  item.template.drawingTool === selectedTemplate.template.drawingTool &&
                  item.template.description === selectedTemplate.template.description &&
                  item.type === selectedTemplate.type) {
                  var dom = dojo.byId(keysArr[index]);
                  on.emit(dom, "click", {
                    bubbles: true,
                    cancelable: true
                  });
                  this._activateTemplateToolbar(curSelectedDrawOption);
                  return true;
                }
              }, this);

              if (itemFnd === false) {
                if (this.drawToolbar) {
                  this.drawToolbar.deactivate();
                }
                if (this.drawingTool) {
                  this._setDrawingToolbar("select", null);
                }
              }
            }
            else {
              if (this.drawToolbar) {
                this.drawToolbar.deactivate();
              }
              if (this.drawingTool) {
                this._setDrawingToolbar("select", null);
              }
            }
          }
          else {
            if (this.drawToolbar) {
              this.drawToolbar.deactivate();
            }
            if (this.drawingTool) {
              this._setDrawingToolbar("select", null);
            }
          }
          this._select_change_event = on(this.templatePicker, "selection-change",
            lang.hitch(this, this._template_change));
          this.own(this._select_change_event);
        }
        if (layers.length < 1) {
          this._creationDisabledOnAll = true;
        }
        else {
          this._creationDisabledOnAll = false;
        }
        if (this._creationDisabledOnAll) {
          if (this.drawToolbar) {
            this.drawToolbar.deactivate();
          }
          if (this.drawingTool) {
            this._setDrawingToolbar("select", null);
          }
          if (this.templatePicker) {
            dojo.style(this.templatePicker.domNode, "display", "none");
            if (this.config.editor.autoSaveEdits) {
              this._createAutoSaveSwitch(false);
            }
            //Clear the selected template and activate the map click
            this._mapClickHandler(true);
            this.templatePicker.clearSelection();

          }
          if (this.drawingTool) {
            dojo.style(this.drawingTool.domNode, "display", "none");
          }
          if (this._filterEditor) {
            dojo.style(this._filterEditor.domNode, "display", "none");
          }
        } else {
          if (this.templatePicker) {
            dojo.style(this.templatePicker.domNode, "display", "block");
          }
          if (this.config.editor.autoSaveEdits) {
            this._createAutoSaveSwitch(true);
          }
          if (this.drawingTool) {
            dojo.style(this.drawingTool.domNode, "display", "block");
          }
          if (this._filterEditor) {
            dojo.style(this._filterEditor.domNode, "display", "block");
          }
        }
        //if valid config infos create preset table
        if (this.config.editor.configInfos && !this._isPresetTableCreated) {
          //change the value of the variable. This will make sure table is created only once
          this._isPresetTableCreated = true;
          this._createPresetTable(this.config.editor.configInfos);
        }
      },
      isGuid: function (value) {
        if (value[0] === "{") {
          value = value.substring(1, value.length - 1);
        }
        var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
        return regexGuid.test(value);
      },
      _template_change: function () {

        this.currentDrawType = null;
        this.currentShapeType = null;
        this._activateTemplateToolbar();
      },
      validateGUID: function (value, constraints) {
        constraints = constraints;
        return this.isGuid(value);
      },
      _createPresetTable: function (layerInfos) {
        var isAnyFieldShownInPresetTable = false;
        //to support backward compatibility
        //if canPresetValue flag is present and it is set to true update the layer infos accordingly
        this._processConfigForBackwardPresetInfos(layerInfos);
        // set preset values table
        if (this.config.editor.hasOwnProperty("presetInfos") &&
          Object.keys(this.config.editor.presetInfos).length > 0) {
          this._initPresetFieldsTable();
          isAnyFieldShownInPresetTable = this._fillPresetValueTable(layerInfos);
          if (isAnyFieldShownInPresetTable) {
            query(".presetFieldsTableDiv")[0].style.display = "block";
          } else {
            query(".presetFieldsTableDiv")[0].style.display = "none";
          }
        } else {
          query(".presetFieldsTableDiv")[0].style.display = "none";
        }
      },

      _processConfigForBackwardPresetInfos: function (layerInfos) {
        var configuredPresetInfos = [];
        //if preset infos is not available in config means use the preset info for canPresetValue
        //flag stored in filed infos
        if (!this.config.editor.hasOwnProperty("presetInfos") && layerInfos) {
          array.forEach(layerInfos, lang.hitch(this, function (configInfo) {
            configInfo.fieldValues = {};
            array.forEach(configInfo.fieldInfos, lang.hitch(this, function (fieldInfo) {
              var actionObj;
              //Check for "canPresetValue" key and handle it for backward compatibility
              if (fieldInfo.hasOwnProperty("canPresetValue") && fieldInfo.canPresetValue) {
                actionObj = [{
                  "actionName": "Intersection",
                  "enabled": false
                }, {
                  "actionName": "Address",
                  "enabled": false
                }, {
                  "actionName": "Coordinates",
                  "enabled": false
                }, {
                  "actionName": "Preset",
                  "enabled": true
                }];
                configInfo.fieldValues[fieldInfo.fieldName] = lang.clone(actionObj);
                configuredPresetInfos[fieldInfo.fieldName] = [];
              }
            }));
          }));
          this.config.editor.presetInfos = configuredPresetInfos;
        }
      },

      _presetChange: function () {
        this._toggleUsePresetValues(true);
      },
      _createAutoSaveSwitch: function (defaultState) {
        if (defaultState) {
          query(".autoSaveOptionDiv")[0].style.display = "block";
        } else {
          query(".autoSaveOptionDiv")[0].style.display = "none";
        }
      },
      _toggleRunTimeAutoSave: function () {
        if (this._autoSaveRuntime === false) {
          this._autoSaveRuntime = true;
        } else {
          this._autoSaveRuntime = false;
        }
        this._createAutoSaveSwitch(this.config.editor.autoSaveEdits);
      },
      _deleteFeature: function () {
        if (!this.currentFeature) { return; }

        this._resetEditingVariables();

        var layer = this.currentFeature.getLayer();
        if (layer.url === null) {
          layer.clear();
          this._showTemplate(true);

        } else {
          var processIndicators = query(".processing-indicator");
          var processIndicatorsPanel = query(".processing-indicator-panel");
          var saveBtn = query(".saveButton", this.attrInspector.domNode)[0];
          array.forEach(processIndicators, function (processIndicator) {
            if (!domClass.contains(processIndicator, "busy")) {
              domClass.add(processIndicator, "busy");
            }
          });
          array.forEach(processIndicatorsPanel, function (processIndicator) {
            if (!domClass.contains(processIndicator, "busy")) {
              domClass.add(processIndicator, "busy");
            }
          });
          if (!domClass.contains(saveBtn, "hide")) {
            domClass.add(saveBtn, "hide");
          }

          layer.applyEdits(null, null, [this.currentFeature],
            lang.hitch(this, function (adds, updates, deletes) {
              adds = adds;
              updates = updates;
              if (deletes && deletes.length > 0 && deletes[0].hasOwnProperty("error")) {
                Message({
                  message: deletes[0].error.toString()
                });

              }
              else {
                this.updateFeatures.splice(this.updateFeatures.indexOf(this.currentFeature), 1);
                //after delete if features length is greater than 0
                //then refresh attribute inspector & show next feature else
                //if showing features of related layer and
                if (this.updateFeatures && this.updateFeatures.length > 0) {
                  //In case of deleting features from table the selection does not updates,
                  //although we removed it from updateFeatures Array.
                  //So again select records with remaining oIds
                  if (layer.type === "Table") {
                    var oIds = [];
                    this.loading.show();
                    array.forEach(this.updateFeatures, function (feature) {
                      oIds.push(feature.attributes[layer.objectIdField]);
                    });
                    var query = new Query();
                    query.objectIds = oIds;
                    layer.selectFeatures(query, FeatureLayer.SELECTION_NEW,
                      lang.hitch(this, function (selectedFeatures) {
                        this.updateFeatures = selectedFeatures;
                        this.attrInspector.refresh();
                        this.attrInspector.first();
                        this.loading.hide();
                      }), lang.hitch(this, function () {
                        this.loading.hide();
                      }));
                  } else {
                    this.attrInspector.refresh();
                    this.attrInspector.first();
                  }

                } else {
                  //show template picker if showing details of layer
                  //& when showing related tables/layers details go back to parent features details
                  if (this._traversal.length < 2) {
                    this._showTemplate(true);
                  } else {
                    on.emit(this.cancelButton, 'click', { cancelable: true, bubbles: true });
                  }
                }
              }
              array.forEach(processIndicators, function (processIndicator) {
                if (domClass.contains(processIndicator, "busy")) {
                  domClass.remove(processIndicator, "busy");
                }
              });
              array.forEach(processIndicatorsPanel, function (processIndicator) {
                if (domClass.contains(processIndicator, "busy")) {
                  domClass.remove(processIndicator, "busy");
                }
              });
              if (domClass.contains(saveBtn, "hide")) {
                domClass.remove(saveBtn, "hide");
              }
            }), lang.hitch(this, function (err) {
              Message({
                message: err.message.toString() + "\n" + err.details
              });
              array.forEach(processIndicators, function (processIndicator) {
                if (domClass.contains(processIndicator, "busy")) {
                  domClass.remove(processIndicator, "busy");
                }
              });
              array.forEach(processIndicatorsPanel, function (processIndicator) {
                if (domClass.contains(processIndicator, "busy")) {
                  domClass.remove(processIndicator, "busy");
                }
              });
              if (domClass.contains(saveBtn, "hide")) {
                domClass.remove(saveBtn, "hide");
              }
            }));
        }
      },

      _editGeometry: function (checked) {
        //if current layerInfo dont have editFlag return
        if (checked &&
          (this._ignoreEditGeometryToggle ||
            (this.currentLayerInfo && !this.currentLayerInfo._editFlag))) {
          return;
        }

        if (checked === true) {
          if (this.currentLayerInfo &&
            this.currentLayerInfo.disableGeometryUpdate && !this.currentLayerInfo.isCache) {
            return;
          }
          this.map.setInfoWindowOnClick(false);

          if (this.map.infoWindow.isShowing) {
            this.map.infoWindow.hide();
          }
          //enable editing only if it is disabled & current feature is valid have geometry
          if (this._editingEnabled === false && this.currentFeature && this.currentFeature.geometry) {
            this._editingEnabled = true;
            // store the original geometry for later use
            this.currentFeature.origGeom = this.currentFeature.geometry.toJson();
            this._activateEditToolbar(this.currentFeature);
          } else {
            if (this.editToolbar.getCurrentState().tool !== 0) {
              this.editToolbar.deactivate();
            }
            this._editingEnabled = false;
          }
        } else {
          this.map.setInfoWindowOnClick(true);
          //I am not sure what this is doing, but it causes issue
          //if (this.editToolbar.getCurrentState().tool !== 0) {
          this.editToolbar.deactivate();
          //}
          this._editingEnabled = false;
        }
      },

      _enableAttrInspectorSaveButton: function (enable, isNewRelatedFeature) {
        var saveBtn = query(".saveButton", this.attrInspector.domNode)[0];
        var isSaveButtonEnable = false;
        if (!saveBtn) { return; }

        if (enable) {
          if (domClass.contains(saveBtn, "jimu-state-disabled")) {
            domClass.remove(saveBtn, "jimu-state-disabled");
          }
          isSaveButtonEnable = true;
        } else {
          if (!domClass.contains(saveBtn, "jimu-state-disabled")) {
            domClass.add(saveBtn, "jimu-state-disabled");
          }
        }
        //Update the save buttons state in its respective related table info
        if (!isNewRelatedFeature && this.currentFeature &&
          this._relatedTablesInfo[this.currentFeature._layer.id]) {
          this._relatedTablesInfo[this.currentFeature._layer.id].isSaveEnable = isSaveButtonEnable;
        }
      },

      _setConfiguredFieldInfos: function (layerFieldInfo, configuredFieldInfo) {
        var fieldInfos = [];
        array.forEach(configuredFieldInfo, function (field) {
          var fieldInfoFromLayer = presetUtils.getFieldInfoByFieldName(layerFieldInfo, field.fieldName);
          var fInfo = lang.mixin(lang.clone(fieldInfoFromLayer), field);
          fieldInfos.push(fInfo);
        });
        return fieldInfos;
      },

      _getLayerInfoByID: function (id) {
        if (id.indexOf("_lfl") > 0) {
          id = id.replace("_lfl", "");
        }
        //if user is seeing related tables details get it from relationShip info
        //else  get the details from layerInfos directly
        if (this._traversal && this._traversal.length > 0) {
          var currentConfig;
          currentConfig = this.config.editor.configInfos;
          //Loop through all configured layers and
          //traverse to the selected layer / table by using traversal lineage & returns layerInfo
          array.some(this._traversal, function (layerId, layerIndex) {
            array.some(currentConfig, function (info) {
              if (info.featureLayer.id === layerId) {
                currentConfig = info;
                return true;
              }
            });
            //if current table is not of all-layers and the index is not last then consider the next relations
            if (this._traversal.length > 1 && layerIndex + 1 < this._traversal.length) {
              currentConfig = currentConfig.relationshipInfos;
            }

          }, this);
          //layer info will not be available for related layer infos so add it
          if (!currentConfig.layerInfo) {
            currentConfig.layerInfo = this._jimuLayerInfos.getLayerOrTableInfoById(currentConfig.featureLayer.id);
            //get layers configFeatureLayer info
            var layerConfig = editUtils.getConfigInfo(currentConfig.layerInfo, {});
            var layerObject = currentConfig.layerInfo.layerObject;
            // modify templates with space in string fields
            this._removeSpacesInLayerTemplates(layerObject);
            //set configured field with the detailed field info from layers fieldInfos
            currentConfig.fieldInfos = this._setConfiguredFieldInfos(layerConfig.fieldInfos, currentConfig.fieldInfos);
            this.processConfigForRuntime(currentConfig);
            currentConfig.configFeatureLayer = layerConfig.featureLayer;
            currentConfig.featureLayer = layerObject;
            currentConfig.showDeleteButton = false;
          }
          return currentConfig;
        } else {
          var result = null;
          this.config.editor.configInfos.some(function (configInfo) {
            return configInfo.featureLayer.id === id ? ((result = configInfo), true) : false;
          });
          return result;
        }
      },

      _fillPresetValueTable: function (editLayerInfos) {
        var addedAnyField = false;
        var presetAllFields = new PresetAllFields({
          nls: this.nls,
          configInfos: editLayerInfos,
          _jimuLayerInfos: this._jimuLayerInfos,
          _configuredPresetInfos: this.config.editor.presetInfos,
          showingInWidget: true
        });

        this._presetFieldInfos = presetAllFields.presetFieldInfos;

        var presetValueTable = query("#eePresetValueBody")[0];
        // fill the table
        for (var fieldName in this._presetFieldInfos) {
          var presetFieldInfo = this._presetFieldInfos[fieldName];
          if (presetFieldInfo.hasOwnProperty('type') &&
            presetFieldInfo.type !== "esriFieldTypeGeometry" &&
            presetFieldInfo.type !== "esriFieldTypeOID" &&
            presetFieldInfo.type !== "esriFieldTypeBlob" &&
            presetFieldInfo.type !== "esriFieldTypeGlobalID" &&
            presetFieldInfo.type !== "esriFieldTypeRaster" &&
            presetFieldInfo.type !== "esriFieldTypeXML") {

            var row = domConstruct.create("tr");
            var label = domConstruct.create("td", { "class": "ee-atiLabel" });
            label.innerHTML = lang.replace('{fieldAlias}',
              {
                fieldAlias: presetFieldInfo.label
              });

            domConstruct.place(label, row);

            var valueColumnNode = domConstruct.create("td",
              { "class": "preset-value-editable" }, row);

            var presetValueNodes = presetUtils.createPresetFieldContentNode(presetFieldInfo);
            var dateWidget = null;
            var timeWidget = null;
            for (var index = 0; index < presetValueNodes.length; index++) {
              var presetValueNode = presetValueNodes[index];
              var fieldValues;
              this.own(on(presetValueNode, 'change', lang.hitch(this, this._presetChange)));
              if (presetValueNode.declaredClass === "dijit.form.DateTextBox") {
                dateWidget = presetValueNode;
              }
              if (presetValueNode.declaredClass === "dijit.form.TimeTextBox") {
                timeWidget = presetValueNode;
              }
              domConstruct.place(presetValueNode.domNode, valueColumnNode, "last");
              //get configured field values and set them to dijits
              if (this.config.editor.presetInfos && this.config.editor.presetInfos[fieldName]) {
                fieldValues = this.config.editor.presetInfos[fieldName];
              }

              if (fieldValues && fieldValues.length > 0) {
                /**
                * After updating the preset approach and removed configure values from preset popup,
                * we will now always store only one value.
                * so in case of dates with multiple nodes for date and time use 0th index value only.
                */
                var value = fieldValues[0];
                if (presetValueNode.declaredClass === "dijit.form.DateTextBox" ||
                  presetValueNode.declaredClass === "dijit.form.TimeTextBox") {
                  value = (value === "" || value === null) ? null : new Date(value);
                }
                presetValueNode.set('value', value);
              }
            }
            if (dateWidget !== null) {
              this.own(on(label, 'click', lang.hitch(this, this._dateClick(dateWidget, timeWidget))));
            }
            presetValueTable.appendChild(row);
            addedAnyField = true;
          }
        }
        return addedAnyField;
      },

      _dateClick: function (dateWidget, timeWidget) {
        return function () {
          if (dateWidget !== undefined && dateWidget !== null) {
            dateWidget.set('value', new Date());
          }
          if (timeWidget !== undefined && timeWidget !== null) {
            timeWidget.set('value', new Date());
          }
        };

      },
      _getEditableLayers: function (layerInfos, allLayers) {
        var layers = [];
        array.forEach(layerInfos, function (layerInfo) {
          if (layerInfo._editFlag) {
            if (!layerInfo.allowUpdateOnly || allLayers) { //
              var layerObject = this.map.getLayer(layerInfo.featureLayer.id);
              if (layerObject &&
                layerObject.visible &&
                layerObject.isVisibleAtScale(this.map.getScale()) &&
                layerObject.isEditable &&
                layerObject.isEditable()) {
                layers.push(layerObject);
              }
            }
          }
        }, this);

        return layers;
      },
      _getEditableLayersInfos: function (layerInfos, allLayers) {
        var layers = [];
        array.forEach(layerInfos, function (layerInfo) {
          if (layerInfo._editFlag) {
            if (!layerInfo.allowUpdateOnly || allLayers) { //
              var layerObject = this.map.getLayer(layerInfo.featureLayer.id);
              if (layerObject &&
                layerObject.visible &&
                layerObject.isVisibleAtScale(this.map.getScale()) &&
                layerObject.isEditable &&
                layerObject.isEditable()) {
                layers.push(layerInfo);
              }
            }
          }
        }, this);

        return layers;
      },
      _getClonedRelationInfo: function (relations) {
        var newRelations = [];
        for (var i = 0; i < relations.length; i++) {
          var relatedInfo = {};
          for (var key in relations[i]) {
            if (relations[i].hasOwnProperty(key) && key !== 'featureLayer' && key !== 'layerInfo') {
              //Get recursive relationship info's
              if (key === "relationshipInfos") {
                relatedInfo[key] = this._getClonedRelationInfo(relations[i][key]);
              } else {
                relatedInfo[key] = lang.clone(relations[i][key]);
              }
            }
          }
          newRelations.push(relatedInfo);
        }
        return newRelations;
      },
      _getLayerInfoForLocalLayer: function (localLayer) {

        var result = this._getLayerInfoByID(localLayer.originalLayerId);
        var layerInfo;

        if (result !== null) {//(layerObject.type === "Feature Layer" && layerObject.url) {
          // get the fieldInfos
          layerInfo = {};
          for (var k in result) {
            if (result.hasOwnProperty(k) && k !== 'featureLayer' && k !== 'layerInfo') {
              if (k === "relationshipInfos") {
                layerInfo[k] = this._getClonedRelationInfo(result[k]);
              } else {
                layerInfo[k] = lang.clone(result[k]);
              }
            }
          }

          layerInfo.featureLayer = localLayer;

        }
        return layerInfo;
      },
      _getSelectionSymbol: function (geometryType, highlight) {
        if (!geometryType || geometryType === "") { return null; }

        var selectionSymbol;
        switch (geometryType) {
          case "esriGeometryPoint":
            if (highlight === true) {
              selectionSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,
                20,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                  new Color([0, 230, 169, 1]), 2),
                new Color([0, 230, 169, 0.65]));
            } else {
              selectionSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,
                20,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                  new Color([92, 92, 92, 1]), 2),
                new Color([255, 255, 0, 0.65]));
            }
            break;
          case "esriGeometryPolyline":
            if (highlight === true) {
              selectionSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([0, 255, 255, 0.65]), 2);
            } else {
              selectionSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([255, 255, 0, 0.65]), 2);
            }
            break;
          case "esriGeometryPolygon":
            var line;
            if (highlight === true) {
              selectionSymbol = new SimpleFillSymbol().setColor(new Color([0, 230, 169, 0.65]));
              line = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([192, 192, 192, 1]), 2);
            } else { // yellow with black outline
              selectionSymbol = new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.65]));
              line = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([192, 192, 192, 1]), 2);
            }
            selectionSymbol.setOutline(line);
            break;
        }
        return selectionSymbol;
      },
      _hasPresetValueFields: function (layerInfos) {
        return layerInfos.some(function (layerInfo) {
          if (layerInfo.allowUpdateOnly === false) {
            if (layerInfo.fieldInfos) {
              return layerInfo.fieldInfos.some(function (fi) {
                return fi.canPresetValue === true;
              });
            }
            else {
              return false;
            }
          }
          else {
            return false;
          }
        }, this);

      },

      _initPresetFieldsTable: function () {
        var presetValueTableNode = domConstruct.create("div", { "class": "ee-presetValueTableDiv templatePicker" },
          this.presetFieldsTableNode);

        var bodyDiv = domConstruct.create("div", { "class": "bodyDiv" }, presetValueTableNode);
        var bodyTable = domConstruct.create("table",
          { "class": "ee-presetValueBodyTable" }, bodyDiv);

        domConstruct.create("tbody", { "class": "ee-presetValueBody", "id": "eePresetValueBody" },
          bodyTable, "first");
      },

      _setPresetValueValue: function (fieldName, value) {
        var presetValueTable = query("#eePresetValueBody")[0];
        if (presetValueTable) {
          var inputElements = query(".preset-value-editable .ee-inputField");
          array.forEach(inputElements, lang.hitch(this, function (ele) {

            if (!domClass.contains(ele, "dijitTimeTextBox")) {
              var elem = dijit.byNode(ele);
              if (elem !== undefined && elem !== null) {
                if (elem.get("name") === fieldName) {
                  elem.set("value", value);
                }

              }
              //else {
              //  var element = query("input[type='hidden']", ele);
              //  if (!element || element.length === 0) {
              //    element = query("input", ele);
              //  }
              //  if (element[0].name === fieldName) {
              //    element[0].value = value;
              //  }
              //}
            }
          }));
        }
      },
      _modifyAttributesWithPresetValues: function (attributes, newTempLayerInfos, copyAttrInfo) {
        var presetValueTable = query("#eePresetValueBody")[0];
        var presetFieldInfos = [], presetFields = [];
        //if fieldValues exist means copy actions are applied
        if (newTempLayerInfos.fieldValues) {
          //loop through all copy actions and get the values as per priority for individual actions
          for (var fieldName in newTempLayerInfos.fieldValues) {
            for (var i = 0; i < newTempLayerInfos.fieldValues[fieldName].length; i++) {
              var copyAction = newTempLayerInfos.fieldValues[fieldName][i];
              var foundInIntersection = false;
              //get value form intersection if it is enabled
              if (copyAttrInfo && copyAction.actionName === "Intersection" && copyAction.enabled) {
                for (var j = 0; j < copyAction.fields.length; j++) {
                  var fieldInfo = copyAction.fields[j];
                  if (copyAttrInfo.Intersection.hasOwnProperty(fieldInfo.layerId) &&
                    copyAttrInfo.Intersection[fieldInfo.layerId].hasOwnProperty(fieldInfo.field)) {
                    attributes[fieldName] = copyAttrInfo.Intersection[fieldInfo.layerId][fieldInfo.field];
                    foundInIntersection = true;
                    break;
                  }
                }
                if (foundInIntersection) {
                  break;
                }
              }
              //get value from address if it is enabled
              if (copyAttrInfo && copyAction.actionName === "Address" && copyAction.enabled &&
                copyAttrInfo.Address.hasOwnProperty(copyAction.field)) {
                attributes[fieldName] = copyAttrInfo.Address[copyAction.field];
                break;
              }
              //get value from coordinates if it is enabled
              if (copyAttrInfo && copyAction.actionName === "Coordinates" && copyAction.enabled) {
                attributes[fieldName] = copyAttrInfo.Coordinates[copyAction.coordinatesSystem][copyAction.field] + "";
                break;
              }
              //get value from preset if it is enabled
              if (copyAction.actionName === "Preset" && copyAction.enabled && this._usePresetValues) {
                presetFields.push(fieldName);
                break;
              }
            }
          }
          //get fieldsInfos of only those fields which are configured for preset
          presetFieldInfos = array.filter(newTempLayerInfos.fieldInfos, function (fieldInfo) {
            return (presetFields.indexOf(fieldInfo.name) > -1);
          });
        }
        //if valid presetValueTable and preset is configured for some fields
        //then modify Attributes with preset values entered in the preset form
        if (presetValueTable && presetFields.length > 0) {
          var inputElements = query(".preset-value-editable .ee-inputField");
          array.forEach(inputElements, lang.hitch(this, function (ele) {

            var elem = dijit.byNode(ele);
            var dateVal = null;
            if (elem.declaredClass !== "dijit.form.TimeTextBox") {
              var valToSet = elem.get("value");
              if (valToSet !== undefined && valToSet !== null && valToSet !== "") {

                if (elem.declaredClass === "dijit.form.DateTextBox") {
                  var timeElement = query(".dijitTimeTextBox", ele.parentNode)[0];
                  // retrieve the value
                  dateVal = new Date(valToSet);
                  if (dateVal.toString() !== "Invalid Date") {
                    if (timeElement !== undefined && timeElement !== null) {
                      var timVal = new Date(dijit.byNode(timeElement).get("value"));
                      if (timVal.toString() !== "Invalid Date") {
                        dateVal.setHours(timVal.getHours());
                        dateVal.setMinutes(timVal.getMinutes());
                        dateVal.setSeconds(timVal.getSeconds());
                        valToSet = dateVal.getTime();
                      }
                    } else {
                      valToSet = dateVal.getTime();
                    }
                  }
                }
                // set the attribute value
                if (valToSet !== undefined && valToSet !== null && valToSet !== "") {
                  for (var attribute in attributes) {
                    if (attributes.hasOwnProperty(attribute) &&
                      attribute === elem.get("name") &&
                      presetFields.indexOf(elem.get("name")) >= 0) {
                      attributes[attribute] = valToSet;
                      break;
                    }
                  }
                }

              }
            }
          }));
        }
      },

      // to add (*) to the label of required fields
      // also add field type and domain to use in the preset values
      processConfigForRuntime: function (configInfo) {

        if (!configInfo) {
          return;
        }
        //if layer is not editable set editable flag to false
        //so that attribute inspector will open in disabled mode
        if (!configInfo._editFlag) {
          configInfo.isEditable = false;
        }
        configInfo.fieldInfos = array.filter(configInfo.fieldInfos, function (fieldInfo) {
          if (fieldInfo.type === "esriFieldTypeBlob" ||
            fieldInfo.type === "esriFieldTypeGlobalID" ||
            fieldInfo.type === "esriFieldTypeRaster" ||
            fieldInfo.type === "esriFieldTypeXML") {//fieldInfo.type === "esriFieldTypeGeometry" || fieldInfo.type === "esriFieldTypeOID" ||
            return false;
          }
          if (fieldInfo.nullable === false && fieldInfo.editable === true) {
            //Removed for JS api 3.20 as this is part of the Attribute Inspector
            //if (fieldInfo.label.indexOf('<a class="asteriskIndicator">') < 0) {
            //  fieldInfo.label = fieldInfo.label +
            //    '<a class="asteriskIndicator"> *</a>';
            //}
          }
          if (fieldInfo.isEditable === true) {
            return true;
          }
          else {
            return fieldInfo.visible;
          }
        });
      },

      _newAttrInspectorNeeded: function () {
        var yes = false;

        if (!this.attrInspector || this.attrInspector.layerInfos.length > 1) {
          yes = true;
        } else { //this.attrInspector.layerInfos.length == 1

          var lflId = this.attrInspector.layerInfos[0].featureLayer.id;
          if (lflId.indexOf("_lfl") > 0) { // attrInspector associated with a local feature
            yes = lflId.indexOf(this.templatePicker.getSelected().featureLayer.id) < 0;
          } else {

            yes = true;
          }
        }

        if (yes && this.attrInspector) {
          this.attrInspector.destroy();
          this.attrInspector = null;
        }
        else {
          if (this._attachmentUploader && this._attachmentUploader !== null) {
            this._attachmentUploader.clear();
          }
        }
        return yes;
      },

      _onMapClick: function (evt) {
        if (this._byPass && this._byPass === true) {
          this._byPass = false;
          return;
        }
        var hasTemplate = false;
        if (this.templatePicker) {
          hasTemplate = this.templatePicker.getSelected() ? true : false;
        }
        if (!this._attrInspIsCurrentlyDisplayed &&
          evt.mapPoint &&
          hasTemplate === false) {
          this._processOnMapClick(evt);
        }
      },
      _attachmentsComplete: function (featureLayer, oid, deferred) {
        return function (results) {
          var errorMsg = "";
          array.forEach(results, function (result) {
            if (result) {
              if (result.state === "rejected") {
                if (result.error && esriLang.isDefined(result.error.code)) {
                  if (result.error.code === 400) {
                    // 400 is returned for unsupported attachment file types
                    errorMsg = errorMsg +
                      esriBundle.widgets.attachmentEditor.NLS_fileNotSupported + "<br/>";
                  } else {
                    errorMsg = errorMsg + result.error.message ||
                      (result.error.details &&
                        result.error.details.length &&
                        result.error.details[0]) + "<br/>";
                  }

                }
              }
            }
          }, this);
          if (errorMsg !== "") {
            var dialog = new Popup({
              titleLabel: this.nls.attachmentLoadingError,
              width: 400,
              maxHeight: 200,
              autoHeight: true,
              content: errorMsg,
              buttons: [{
                label: this.nls.back,
                classNames: ['jimu-btn'],
                onClick: lang.hitch(this, function () {
                  dialog.close();
                })
              }],
              onClose: lang.hitch(this, function () {

              })
            });
          }
          return this._completePost(featureLayer, oid, deferred);
        };

      },
      _selectComplete: function (featureLayer, deferred) {
        return function () {
          this._removeLocalLayers();
          this.currentFeature = null;
          this._showTemplate(false);
          deferred.resolve("success");
        };
      },
      _completePost: function (featureLayer, oid, deferred) {
        this._createAttributeInspector([this.currentLayerInfo]);
        var query = new Query();
        query.objectIds = [oid];
        featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW,
          lang.hitch(this, this._selectComplete(featureLayer, deferred)),
          lang.hitch(this, function () {
            deferred.resolve("failed");
          })
        );
      },
      // posts the currentFeature's changes
      _postChanges: function (feature) {

        var deferred = new Deferred();

        var result = this._changed_feature(feature, false);
        var returnFeature = result[0];
        var layerId = result[1];
        var type = result[2];
        var layer = null;
        var postDef = null;
        if (returnFeature === null) {
          deferred.resolve("success");
        }
        else if (type === "Add") {
          if (this._traversal.length > 1) {
            this.addNewRelatedRecord = true;
          }
          //Get layer or table info as now user can update related records/features
          layer = this._jimuLayerInfos.getLayerOrTableInfoById(layerId).layerObject;
          postDef = layer.applyEdits([returnFeature], null, null);
          this.addDeferred(postDef, returnFeature, layer, deferred);
        }
        else {
          //Get layer or table info as now user can update related records/features
          layer = this._jimuLayerInfos.getLayerOrTableInfoById(layerId).layerObject;
          if (Object.keys(returnFeature.attributes).length === 0 &&
            returnFeature.geometry === null) {
            deferred.resolve("success");
          }
          else if (Object.keys(returnFeature.attributes).length === 1 &&
            returnFeature.attributes.hasOwnProperty(layer.objectIdField) &&
            returnFeature.geometry === null) {
            //check to see if the only field is the OID, if so, skip saving
            deferred.resolve("success");
          }
          else {
            postDef = layer.applyEdits(null, [returnFeature], null);
            this.addDeferred(postDef, returnFeature, layer, deferred);
          }
        }
        return deferred.promise;
      },
      _changed_feature: function (feature, removeOIDField) {
        var returnFeature = null;
        var type = null;
        var featureLayer = null;
        var featureLayerId = null;
        removeOIDField = removeOIDField || false;
        var ruleInfo;
        var k = null;
        if (feature) {
          returnFeature = new Graphic(null, null, JSON.parse(JSON.stringify(feature.attributes)));

          if (this._smartAttributes !== undefined && this._smartAttributes !== null) {
            for (k in returnFeature.attributes) {
              if (returnFeature.attributes.hasOwnProperty(k) === true) {
                ruleInfo = this._smartAttributes.validateField(k);
                if (ruleInfo[1] === 'Hide' && ruleInfo[3] !== true) {
                  delete returnFeature.attributes[k];
                }
              }
            }
          }
          for (k in returnFeature.attributes) {
            if (returnFeature.attributes.hasOwnProperty(k) === true) {
              if (returnFeature.attributes[k] === "") {
                returnFeature.attributes[k] = null;
              }
            }
          }
          if (this._attributeInspectorTools) {
            returnFeature.attributes = this._attributeInspectorTools._checkFeatureData(returnFeature.attributes);
            if (feature.preEditAttrs) {
              returnFeature.preEditAttrs =
                this._attributeInspectorTools._checkFeatureData(JSON.parse(JSON.stringify(feature.preEditAttrs)));
            }
          }
          else {
            if (feature.preEditAttrs) {
              returnFeature.preEditAttrs = JSON.parse(JSON.stringify(feature.preEditAttrs));//lang.clone(feature.preEditAttrs);
            }
          }
          if (feature.getLayer().originalLayerId) {
            // added feature
            //featureLayer = this.map.getLayer(feature.getLayer().originalLayerId);
            //Get layer or table info as now user can update related records/features
            featureLayer = this._jimuLayerInfos.getLayerOrTableInfoById(feature.getLayer().originalLayerId).layerObject;
            if (featureLayer) {
              returnFeature.geometry = feature.geometry;
              returnFeature.symbol = null;
              type = "Add";
              removeOIDField = true;

            } // if featureLayer not null
          } else {
            // update existing feature
            // only get the updated attributes

            if (this.geometryChanged !== undefined &&
              this.geometryChanged !== null &&
              this.geometryChanged === true) {
              returnFeature.geometry = feature.geometry;
            }

            featureLayer = feature.getLayer();

            var newAttrs = editUtils.filterOnlyUpdatedAttributes(
              returnFeature.attributes, returnFeature.preEditAttrs, featureLayer);

            if (newAttrs && !editUtils.isObjectEmpty(newAttrs)) {
              // there are changes in attributes
              returnFeature.attributes = newAttrs;
            } else {
              returnFeature.attributes = [];
            }
            returnFeature.symbol = null;
            type = "Update";
          }
          featureLayerId = featureLayer.id;
          if (returnFeature && removeOIDField) {
            if (returnFeature.attributes.hasOwnProperty(featureLayer.objectIdField)) {
              delete returnFeature.attributes[featureLayer.objectIdField];
            }
          }

          if (featureLayer.globalIdField && returnFeature.attributes.hasOwnProperty(featureLayer.globalIdField)) {
            delete returnFeature.attributes[featureLayer.globalIdField];
          }
          if (featureLayer.editFieldsInfo) {
            for (k in featureLayer.editFieldsInfo) {
              if (featureLayer.editFieldsInfo.hasOwnProperty(k)) {
                if (returnFeature.attributes.hasOwnProperty(featureLayer.editFieldsInfo[k])) {
                  delete returnFeature.attributes[featureLayer.editFieldsInfo[k]];
                }
              }
            }
          }

        }

        return [returnFeature, featureLayerId, type];
      },

      addDeferred: function (postDef, feature, featureLayer, deferred) {
        postDef.then(lang.hitch(this, function (added, updated) {
          // sometimes a successfully update returns an empty array
          if (updated && updated.length > 0 && updated[0].hasOwnProperty("error")) {
            Message({
              message: updated[0].error.toString()
            });
            deferred.resolve("failed");
          }
          else if (updated && updated.length > 0) {
            feature.preEditAttrs = JSON.parse(JSON.stringify(feature.attributes));
            featureLayer.refresh();
            this.geometryChanged = false;
            deferred.resolve("success");
          }
          else if (added && added.length > 0 && added[0].hasOwnProperty("error")) {

            Message({
              message: added[0].error.toString()
            });
            deferred.resolve("failed");
          }
          else if (added && added.length > 0) {
            feature.preEditAttrs = JSON.parse(JSON.stringify(feature.attributes));
            var defs = null;
            if (this.attrInspector._attachmentUploader) {
              defs = this.attrInspector._attachmentUploader.postAttachments(featureLayer, added[0].objectId);
            }
            if (defs === undefined || defs === null || defs.length === 0) {
              if (this.addNewRelatedRecord) {
                deferred.resolve("success");
              } else {
                this._completePost(featureLayer, added[0].objectId, deferred);
              }
            }
            else {
              all(defs).then(lang.hitch(this,
                this._attachmentsComplete(featureLayer, added[0].objectId, deferred)));
            }
          }
        }), lang.hitch(this, function (err) {
          Message({
            message: err.message.toString() + "\n" + err.details
          });
          deferred.resolve("failed");
        }));
      },

      _processOnMapClick: function (evt) {
        // viewing/editing existing features
        // The logic of adding new feature to local layer is handled
        // in the draw end event of the draw tool

        this.map.infoWindow.hide();
        //Destroy all prev attributeInspectors
        array.forEach(this._attributeInspectorCollection, function (attributeInspector) {
          attributeInspector.destroy();
        });
        //reset array
        this._traversal = [];
        this._nodesCollection = [];
        this._attributeInspectorCollection = [];
        this._relatedTablesInfo = {};

        // recreate the attr inspector if needed
        this._createAttributeInspector(this.config.editor.configInfos);

        var layers = this.map.getLayersVisibleAtScale().filter(lang.hitch(this, function (lyr) {
          if (lyr.type && lyr.type === "Feature Layer" && lyr.url) {
            return array.some(this.config.editor.configInfos, lang.hitch(this, function (configInfo) {
              if (configInfo.layerId === lyr.id &&
                configInfo.configFeatureLayer.layerAllowsUpdate === true &&
                this._hasAnyEditableLayerInRelation([configInfo])) {
                return true;
              }
              else {
                return false;
              }
            }));
          }
          else {
            return false;
          }
        }));
        //remove no visible layers, for some reason the function above returns true
        layers = layers.filter(lang.hitch(this, function (lyr) {
          try {
            return this.map.getLayer(lyr.id).visible;
          }
          catch (ex) {
            console.log(ex + " Check for visible failed");
            return true;
          }
        }));
        var updateFeatures = [];
        var deferreds = [];
        this.currentFeature = null;
        this.geometryChanged = false;
        this.currentLayerInfo = null;
        array.forEach(layers, lang.hitch(this, function (layer) {
          // set selection symbol
          layer.setSelectionSymbol(this._getSelectionSymbol(layer.geometryType, false));
          var selectQuery = new Query();
          selectQuery.geometry = editUtils.pointToExtent(this.map, evt.mapPoint, 20);
          var deferred = layer.selectFeatures(selectQuery,
            FeatureLayer.SELECTION_NEW,
            lang.hitch(this, function (features) {
              var OIDsToRemove = [];
              var validFeatures = [];
              array.forEach(features, function (feature) {
                var featureValid = true;
                feature.allowDelete = true;
                //if (layer.hasOwnProperty("ownershipBasedAccessControlForFeatures") &&
                //  layer.ownershipBasedAccessControlForFeatures) {
                //  if (layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowOthersToUpdate")) {
                //    if (layer.ownershipBasedAccessControlForFeatures.allowOthersToUpdate === false && this._user) {
                //      if (feature.attributes[layer.editFieldsInfo.creatorField] !== this._user) {
                //        OIDsToRemove.push(feature.attributes[layer.objectIdField]);
                //        featureValid = false;
                //      }
                //    }
                //  }
                //  if (layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowOthersToUpdate") &&
                //    layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowAnonymousToUpdate")) {
                //    if (layer.ownershipBasedAccessControlForFeatures.allowOthersToUpdate === false &&
                //      layer.ownershipBasedAccessControlForFeatures.allowAnonymousToUpdate === true &&
                //      this._user === null) {
                //      if (feature.attributes[layer.editFieldsInfo.creatorField] !== null &&
                //         feature.attributes[layer.editFieldsInfo.creatorField] !== "") {
                //        OIDsToRemove.push(feature.attributes[layer.objectIdField]);
                //        featureValid = false;
                //      }
                //    }
                //  }
                //  else if (layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowAnonymousToUpdate")) {
                //    if (layer.ownershipBasedAccessControlForFeatures.allowAnonymousToUpdate === false &&
                //      this._user === null) {
                //      OIDsToRemove.push(feature.attributes[layer.objectIdField]);
                //      featureValid = false;
                //    }
                //  }
                //  if (layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowOthersToDelete")) {
                //    if (layer.ownershipBasedAccessControlForFeatures.allowOthersToDelete === false &&
                //      this._user) {
                //      if (feature.attributes[layer.editFieldsInfo.creatorField] !== this._user) {
                //        feature.allowDelete = false;
                //      }
                //    }
                //  }
                //  if (layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowOthersToDelete") &&
                //  layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowAnonymousToDelete")) {
                //    if (layer.ownershipBasedAccessControlForFeatures.allowOthersToDelete === false &&
                //      layer.ownershipBasedAccessControlForFeatures.allowAnonymousToDelete === true &&
                //      this._user === null) {
                //      if (feature.attributes[layer.editFieldsInfo.creatorField] !== null &&
                //          feature.attributes[layer.editFieldsInfo.creatorField] !== "") {
                //        OIDsToRemove.push(feature.attributes[layer.objectIdField]);
                //        featureValid = false;
                //      }
                //    }
                //  }
                //  else if (layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowAnonymousToDelete")) {
                //    if (layer.ownershipBasedAccessControlForFeatures.allowAnonymousToDelete === false &&
                //      this._user === null) {
                //      feature.allowDelete = false;
                //    }
                //  }
                //}

                //The below is the preferred way, but this fails on public services and the user is logged in

                if (!layer.getEditCapabilities({ feature: feature }).canUpdate) {
                  //feature.allowDelete = false;
                  OIDsToRemove.push(feature.attributes[layer.objectIdField]);
                  featureValid = false;
                }
                else if (!layer.getEditCapabilities({ feature: feature }).canDelete) {
                  feature.allowDelete = false;
                }
                if (featureValid === true) {
                  feature.preEditAttrs = JSON.parse(JSON.stringify(feature.attributes));
                  validFeatures.push(feature);
                }
              }, this);
              if (OIDsToRemove.length > 0) {
                var subQuery = new Query();
                subQuery.objectIds = OIDsToRemove;
                var subDef = layer.selectFeatures(subQuery, FeatureLayer.SELECTION_SUBTRACT,
                  lang.hitch(this, function (features) {
                    console.log(features.length);
                  }));
                deferreds.push(subDef);
              }
              updateFeatures = updateFeatures.concat(validFeatures);

            }));
          deferreds.push(deferred);
        }));
        if (deferreds.length === 0) {
          this._byPass = true;
          this.map.popupManager._showPopup(evt);
          this._byPass = false;
        }
        else {
          all(deferreds).then(lang.hitch(this, function () {
            this.updateFeatures = updateFeatures;
            if (this.updateFeatures.length > 0) {
              this._showTemplate(false);
            }
            else {
              this._byPass = true;
              this.map.popupManager._showPopup(evt);
              this._byPass = false;
            }
          }));
        }

      },
      _attachLayerHandler: function () {
        /*
        //CT - Commented the code as it was clearing parent features selection when moving to related feature
        if (this.layerHandle) {
          this.layerHandle.remove();
        }
        this.layerHandle = on(this.currentFeature._layer, 'selection-clear',
          lang.hitch(this, this._layerChangeOutside));
        this.own(this.layerHandle);
        */

        this._eventHandler = this.own(on(this.currentFeature._layer, "visibility-change", lang.hitch(this, function () {
          /*
          setTimeout(lang.hitch(this, function () {
            var cancelBtn = query(".cancelButton")[0];
            if (!cancelBtn) {
              //do nothing
            } else {
              on.emit(cancelBtn, 'click', { cancelable: true, bubbles: true });
            }
          }), 100);
          */
        })));
      },

      _removeLayerVisibleHandler: function () {
        if (this._eventHandler !== null) {
          array.forEach(this._eventHandler, lang.hitch(this, function (evt) {
            if (typeof evt.remove === "function") {
              evt.remove();
            }
          }));
          this._eventHandler = null;
        }
      },

      _postFeatureSave: function (evt) {
        if (this.updateFeatures && this.updateFeatures.length > 1) {
          array.forEach(this.updateFeatures, lang.hitch(this, function (feature) {
            feature.setSymbol(this._getSelectionSymbol(feature.getLayer().geometryType, false));
          }));
        }
        if (evt && evt.feature) {
          this.geometryChanged = false;
          this.currentFeature = evt.feature;
          this.currentFeature.preEditAttrs = JSON.parse(JSON.stringify(this.currentFeature.attributes));
          this._attachLayerHandler();
          this.currentLayerInfo = this._getLayerInfoByID(this.currentFeature._layer.id);
          this.currentLayerInfo.isCache = false;
          this._createSmartAttributes();
          this._createAttributeInspectorTools();
          this._attributeInspectorTools.triggerFormValidation();
          this._validateAttributes();
          this._enableAttrInspectorSaveButton(false);
          if (this.currentFeature.hasOwnProperty("allowDelete")) {
            this._toggleDeleteButton(this.currentFeature.allowDelete && this.currentLayerInfo.allowDelete);
          }
          else {
            this._toggleDeleteButton(this.currentLayerInfo.allowDelete);
          }
          this._toggleEditGeoSwitch(this.currentLayerInfo.disableGeometryUpdate ||
            !this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate);
          //|| this.currentLayerInfo.featureLayer.hasZ || this.currentLayerInfo.featureLayer.hasM
          this.currentFeature.setSymbol(
            this._getSelectionSymbol(evt.feature.getLayer().geometryType, true));
          //this.getConfigDefaults();
        }

      },

      _promptToDelete: function () {

        var dialog = new Popup({
          titleLabel: this.nls.deletePromptTitle,
          width: 400,
          maxHeight: 200,
          autoHeight: true,
          content: this.nls.deletePrompt,
          buttons: [{
            label: this.nls.yes,
            classNames: ['jimu-btn'],
            onClick: lang.hitch(this, function () {
              this._deleteFeature();
              dialog.close();

            })
          }, {
            label: this.nls.no,
            classNames: ['jimu-btn'],

            onClick: lang.hitch(this, function () {

              dialog.close();

            })
          }

          ],
          onClose: lang.hitch(this, function () {

          })
        });
      },
      _promptToResolvePendingEdit: function (switchToTemplate, evt, showClose, skipPostEvent) {
        skipPostEvent = skipPostEvent || false;
        var disable = !this._validateAttributes();
        var pendingEditsDef = new Deferred();
        var buttons = [{
          label: this.nls.yes,
          classNames: ['jimu-btn'],
          disable: disable,
          onClick: lang.hitch(this, function () {
            this._saveEdit(this.currentFeature, switchToTemplate, true).then(lang.hitch(this, function () {
              if (evt !== null && evt !== undefined) {
                if (evt.hasOwnProperty('featureLayer') && evt.hasOwnProperty('feature')) {
                  this.load_from_featureaction(evt.featureLayer, evt.feature);
                }
                else {
                  this._postFeatureSave(evt);
                }
              }
              pendingEditsDef.resolve("yes");
            }));
            dialog.close();
          })
        }, {
          label: this.nls.no,
          classNames: ['jimu-btn'],

          onClick: lang.hitch(this, function () {
            this._cancelEditingFeature(switchToTemplate);
            if (evt !== null && evt !== undefined) {
              if (evt.hasOwnProperty('featureLayer') && evt.hasOwnProperty('feature')) {
                this.load_from_featureaction(evt.featureLayer, evt.feature);
              }
              else {
                this._postFeatureSave(evt);
              }
            }
            dialog.close();
            pendingEditsDef.resolve("no");
          })
        }];
        if (showClose && showClose === true) {
          buttons.push({
            label: this.nls.back,
            classNames: ['jimu-btn'],
            onClick: lang.hitch(this, function () {
              pendingEditsDef.reject();
              dialog.close();
            })
          });
        }

        var dialog = new Popup({
          titleLabel: this.nls.savePromptTitle,
          width: 400,
          maxHeight: 200,
          autoHeight: true,
          content: this.nls.savePrompt,
          buttons: buttons,
          onClose: lang.hitch(this, function () {

          })
        });
        return pendingEditsDef.promise;
      },

      _removeLocalLayers: function () {
        if (this.cacheLayer && this.cacheLayer !== null) {
          this.cacheLayer.clearSelection();
          this.cacheLayer.clear();
          this.map.removeLayer(this.cacheLayer);
          this.cacheLayer = null;
        }
        this.updateFeatures = [];
        //var mymap = this.map;
        //if (mymap) {
        //  var filteredID = mymap.graphicsLayerIds.filter(function (e) {
        //    return e.lastIndexOf("_lfl") > 0;
        //  });
        //  var mappedArr = array.map(filteredID, function (e) {
        //    return mymap.getLayer(e);
        //  });
        //  array.forEach(mappedArr, function (e) {
        //    mymap.removeLayer(e);
        //  });

        //  this.updateFeatures = [];
        //}
      },

      _removeSpacesInLayerTemplates: function (layer) {
        if (!layer) { return; }

        var filteredFields = array.filter(layer.fields, lang.hitch(this, function (field) {
          return field.nullable === false && field.editable === true;
        }));
        array.forEach(filteredFields, lang.hitch(this, function (f) {
          // trim of space in the field value
          array.forEach(layer.templates, function (t) {
            if (t.prototype.attributes[f.name] === " ") {
              t.prototype.attributes[f.name] = t.prototype.attributes[f.name].trim();
            }
          });
        }));
      },

      _resetEditingVariables: function () {
        this._editingEnabled = false;
        if (this.editToolbar) {
          if (this.editToolbar.getCurrentState().tool !== 0) {
            this.editToolbar.deactivate();
          }
        }
        //this._turnEditGeometryToggleOff();
      },
      _feature_removed: function (feature, curidx) {
        return function () {
          if (this.attrInspector._featureIdx >= curidx && curidx !== 0) {
            //Clear the current feature as it is saved and has been removed.  This prevents the double save dialog.
            this.currentFeature = null;
            this.attrInspector.previous();
          }
          this.updateFeatures.splice(this.updateFeatures.indexOf(feature), 1);
          //bypass moving to the next record if the user click next and was prompted to save

        };
      },
      // perform validation then post the changes or formatting the UI if errors
      // no confirm dialog involved
      _saveEdit: function (feature, switchToTemplate, attInspectRecordOptions) {
        attInspectRecordOptions = attInspectRecordOptions || 'next';
        var deferred = new Deferred();
        // disable the save button even if the saving is done
        this._enableAttrInspectorSaveButton(false);
        this._turnEditGeometryToggleOff();
        if (this._validateAttributes()) {
          var processIndicators = query(".processing-indicator");
          var processIndicatorsPanel = query(".processing-indicator-panel");
          var saveBtn = query(".saveButton", this.attrInspector.domNode)[0];
          array.forEach(processIndicators, function (processIndicator) {
            if (!domClass.contains(processIndicator, "busy")) {
              domClass.add(processIndicator, "busy");
            }
          });
          array.forEach(processIndicatorsPanel, function (processIndicator) {
            if (!domClass.contains(processIndicator, "busy")) {
              domClass.add(processIndicator, "busy");
            }
          });
          if (saveBtn && !domClass.contains(saveBtn, "hide")) {
            domClass.add(saveBtn, "hide");
          }
          // call applyEdit
          this._postChanges(feature).then(lang.hitch(this, function (e) {
            var addingRelatedRecord = false;
            if (e === "failed") {
              deferred.resolve("failed");
              this.addNewRelatedRecord = false;
            }
            else {
              if (this.addNewRelatedRecord) {
                addingRelatedRecord = true;
                this.attrInspector.destroy();
                domConstruct.destroy(this.contentWrapper);
                this.attrInspector = this._attributeInspectorCollection.pop();
                domStyle.set(this.attrInspector.attributeTable, "display", "block");
                domStyle.set(this.attrInspector.editButtons, "display", "block");
                domStyle.set(this.attrInspector.deleteBtn.domNode, "display", "none");
                this.attrInspector._featureIdx = this.attrInspector.ctStoredFeatureIndex;
                this.attrInspector.refresh();
                setTimeout(lang.hitch(this, function () {
                  domStyle.set(this.attrInspector.navButtons, "display",
                    (!this.attrInspector._hideNavButtons && (this.attrInspector._numFeatures > 1) ? "" : "none"));
                  this.attrInspector.navMessage.innerHTML = esriLang.substitute({
                    idx: this.attrInspector._featureIdx + 1,
                    of: this.attrInspector.NLS_of,
                    numFeatures: this.attrInspector._numFeatures
                  }, this.attrInspector._navMessage);
                  this.currentFeature = this.attrInspector._numFeatures ?
                    this.attrInspector._selection[this.attrInspector._featureIdx] : null;
                  if (this.currentFeature && this.currentFeature.attributes) {
                    this.currentFeature.preEditAttrs = JSON.parse(JSON.stringify(this.currentFeature.attributes));
                  }
                }), 200);
                this.contentWrapper = this._nodesCollection.pop();
                this._traversal.pop();
                this.currentRelatedDom.click();
              }
              if (this.currentFeature && this.currentFeature.attributes) {
                this.currentFeature.preEditAttrs = JSON.parse(JSON.stringify(this.currentFeature.attributes));
              }
              if (this._relatedTablesInfo[feature._layer.id]) {
                this._relatedTablesInfo[feature._layer.id].updateFeatureInstance(feature.attributes);
              }
              // if currently only one selected feature
              //also this is not related feature
              if (this.config.editor.removeOnSave && this.updateFeatures.length <= 1 &&
                this._traversal.length <= 1 && !addingRelatedRecord) {
                switchToTemplate = true;
              }
              if (switchToTemplate && switchToTemplate === true) {
                this._showTemplate(true);
              } else if (this.config.editor.removeOnSave && this.updateFeatures.length <= 1 &&
                this._traversal.length > 1) {
                //when saving related tables/layers details and only one record and remove on save is true
                //go back to parent features details after save
                on.emit(this.cancelButton, 'click', { cancelable: true, bubbles: true });
              } else {
                this._resetEditingVariables();
                this.map.setInfoWindowOnClick(true);
                if (this.config.editor.removeOnSave === true) {
                  var layer = feature.getLayer();
                  // perform a new query
                  var query = new Query();
                  query.objectIds = [feature.attributes[layer.objectIdField]];
                  var curidx = this.attrInspector._selection.indexOf(feature);
                  layer.selectFeatures(query, FeatureLayer.SELECTION_SUBTRACT,
                    lang.hitch(this, this._feature_removed(feature, curidx)));
                } else {
                  // reselect the feature
                  if (this.currentFeature && this.currentFeature.hasOwnProperty("allowDelete")) {
                    this._toggleDeleteButton(this.currentFeature.allowDelete &&
                      this.currentLayerInfo.allowDelete);
                  }
                  else {
                    this._toggleDeleteButton(this.currentLayerInfo.allowDelete &&
                      this.currentLayerInfo.configFeatureLayer.layerAllowsDelete);
                  }
                  this._toggleEditGeoSwitch(this.currentLayerInfo.disableGeometryUpdate ||
                    !this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate);
                  //|| this.currentLayerInfo.featureLayer.hasZ || this.currentLayerInfo.featureLayer.hasM

                  feature.setSymbol(this._getSelectionSymbol(
                    feature.getLayer().geometryType, true));
                }
              }
              deferred.resolve("success");
            }
            array.forEach(processIndicators, function (processIndicator) {
              if (domClass.contains(processIndicator, "busy")) {
                domClass.remove(processIndicator, "busy");
              }
            });
            array.forEach(processIndicatorsPanel, function (processIndicator) {
              if (domClass.contains(processIndicator, "busy")) {
                domClass.remove(processIndicator, "busy");
              }
            });
            if (domClass.contains(saveBtn, "hide")) {
              domClass.remove(saveBtn, "hide");
            }
          }), lang.hitch(this, function () {
            array.forEach(processIndicators, function (processIndicator) {
              if (domClass.contains(processIndicator, "busy")) {
                domClass.remove(processIndicator, "busy");
              }
            });
            array.forEach(processIndicatorsPanel, function (processIndicator) {
              if (domClass.contains(processIndicator, "busy")) {
                domClass.remove(processIndicator, "busy");
              }
            });
            if (domClass.contains(saveBtn, "hide")) {
              domClass.remove(saveBtn, "hide");
            }
            //deferred.resolve("failed");
          }));
        }
        //else
        //{
        //  this._formatErrorFields(errorObj);

        //  deferred.resolve("failed");
        //}
        return deferred.promise;
      },

      _showTemplate: function (showTemplate) {
        this._attrInspIsCurrentlyDisplayed = !showTemplate;
        if (showTemplate) {
          this._mapClickHandler(true);
          this._showTemplatePicker();
          //reset array
          this._traversal = [];
          this._nodesCollection = [];
          this._attributeInspectorCollection = [];
          this._relatedTablesInfo = {};
          this.currentFeature = null;
          this.geometryChanged = false;
          this.currentLayerInfo = null;

          // esriBundle.widgets.attachmentEditor.NLS_attachments = this._orignls;
        } else {
          //esriBundle.widgets.attachmentEditor.NLS_attachments = this._orignls + " " + this.nls.attachmentSaveDeleteWarning;
          this._mapClickHandler(false);
          //show attribute inspector
          query(".jimu-widget-smartEditor .templatePickerMainDiv")[0].style.display = "none";
          query(".jimu-widget-smartEditor .attributeInspectorMainDiv")[0].style.display = "block";

          if (this.attrInspector) {

            if (!this.currentFeature && this.attrInspector && this.attrInspector._numFeatures > 0) {
              this.attrInspector.first();
            }
            this._createSmartAttributes();
            this._createAttributeInspectorTools();
            this.attrInspector.refresh();
            this._attributeInspectorTools.triggerFormValidation();
            //this._sytleFields(this.attrInspector);
            if (this.currentFeature && this.currentFeature.getLayer().originalLayerId) {
              this._enableAttrInspectorSaveButton(this._validateAttributes());
            } else {
              this._enableAttrInspectorSaveButton(false);
            }
            if (this.currentLayerInfo.isCache && this.currentLayerInfo.isCache === true) {
              this._toggleEditGeoSwitch(false);
            }
            else {
              this._toggleEditGeoSwitch(this.currentLayerInfo.disableGeometryUpdate ||
                !this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate);
              //|| this.currentLayerInfo.featureLayer.hasZ || this.currentLayerInfo.featureLayer.hasM

            }
            this._addWarning();
          }
          this._recordLoadeAttInspector();
        }


      },
      _createAttributeInspectorTools: function () {
        if (this.currentFeature === undefined || this.currentFeature === null) {
          return;
        }
        var attTable = query("td.atiLabel", this.attrInspector.domNode);
        if (attTable === undefined || attTable === null) {
          return;
        }
        var attributeInspectorToolsParams = {
          _attrInspector: this.attrInspector,
          _feature: this.currentFeature,
          _fieldInfo: this.currentLayerInfo.fieldInfos
        };
        this._attributeInspectorTools = new attributeInspectorTools(attributeInspectorToolsParams);

      },
      _createSmartAttributes: function () {
        if (this.currentFeature === undefined || this.currentFeature === null) {
          return;
        }
        var attTable = query("td.atiLabel", this.attrInspector.domNode);
        if (attTable === undefined || attTable === null) {
          return;
        }
        var fieldValidation = null;
        if (this.currentLayerInfo !== undefined && this.currentLayerInfo !== null) {
          if (this.currentLayerInfo.fieldValidations !== undefined &&
            this.currentLayerInfo.fieldValidations !== null) {
            fieldValidation = this.currentLayerInfo.fieldValidations;
          }
        }
        if (fieldValidation === null) {
          return;
        }

        var smartAttParams = {
          _attrInspector: this.attrInspector,
          _fieldValidation: fieldValidation,
          _feature: this.currentFeature,
          _fieldInfo: this.currentLayerInfo.fieldInfos
        };
        this._smartAttributes = new smartAttributes(smartAttParams);

      },
      _showTemplatePicker: function () {

        // hide the attr inspector and show the main template picker div
        query(".jimu-widget-smartEditor .attributeInspectorMainDiv")[0].style.display = "none";
        query(".jimu-widget-smartEditor .templatePickerMainDiv")[0].style.display = "block";


        if (this.templatePicker) {
          if (this.config.editor.hasOwnProperty("keepTemplateSelected")) {
            if (this.config.editor.keepTemplateSelected !== true) {
              this.templatePicker.clearSelection();
            }
          } else {
            this.templatePicker.clearSelection();
          }
          if (this.templatePicker) {
            var override = null;
            if (this.drawingTool && this.currentDrawType) {
              override = this.currentDrawType;
            }
            this._activateTemplateToolbar(override);
            this.templatePicker.update();
          }
        }
        this._resetEditingVariables();

        var layersRefresh = [];
        if (this.updateFeatures) {
          array.forEach(this.updateFeatures, lang.hitch(this, function (feature) {
            var layer = feature.getLayer();
            if (layersRefresh && layersRefresh.indexOf(layer.id) === -1) {
              layersRefresh.push(layer.id);
              layer.clearSelection();
              layer.refresh();
            }

          }));
        }
        this._clearLayerSelection();
        this.currentFeature = null;
        this.geometryChanged = false;
        this.currentLayerInfo = null;
        this._removeLocalLayers();
        if (this._recreateOnNextShow === true) {
          this._recreateOnNextShow = false;
          this._createEditor();
        }
        if (this._creationDisabledOnAll) {
          if (this.templatePicker) {
            dojo.style(this.templatePicker.domNode, "display", "none");
          }
          if (this.drawingTool) {
            dojo.style(this.drawingTool.domNode, "display", "none");
          }
        } else {
          if (this.templatePicker) {
            dojo.style(this.templatePicker.domNode, "display", "block");
          }
          if (this.drawingTool) {
            dojo.style(this.drawingTool.domNode, "display", "block");
          }
        }
      },
      _setPresetValue: function () {
        var sw = registry.byId("savePresetValueSwitch");
        this._usePresetValues = sw.checked;
      },
      _toggleUsePresetValues: function (checked) {
        var sw = registry.byId("savePresetValueSwitch");
        sw.set('checked', checked === null ? !sw.checked : checked);
        this._usePresetValues = sw.checked;
      },
      _turnEditGeometryToggleOff: function () {
        //perform any edit geom switch functionality
        //only when working with main layers feature and not on related features
        if (this._traversal.length > 1) {
          return;
        }
        if (this._editGeomSwitch && this._editGeomSwitch.checked) {
          if (this.editToolbar) {
            if (this.editToolbar.getCurrentState().tool !== 0) {
              this.editToolbar.deactivate();
            }
          }
          this._editingEnabled = false;
          this._ignoreEditGeometryToggle = true;
          this._editGeomSwitch.set("checked", false);
          this.map.setInfoWindowOnClick(true);
          setTimeout(lang.hitch(this, function () {
            this._ignoreEditGeometryToggle = false;
          }), 2);

        }
      },
      _validateFeatureChanged: function () {

        if (this.currentFeature) {

          if (this.geometryChanged !== undefined &&
            this.geometryChanged !== null &&
            this.geometryChanged === true) {
            return true;
          }
          var result = this._changed_feature(this.currentFeature, true);
          var feature = result[0];
          var type = result[2];
          if (feature !== null) {
            if (Object.keys(feature.attributes).length === 0 &&
              type !== "Add") {
              return false;
            }
          }
        }
        return true;
      },
      // todo: modify to feature as input parameter?
      _validateRequiredFields: function () {
        var errorObj = {};

        if (!this.currentFeature) { return errorObj; }

        var layer = this.currentFeature.getLayer();

        var filteredFields = array.filter(layer.fields, lang.hitch(this, function (field) {
          return field.nullable === false && field.editable === true;
        }));

        array.forEach(filteredFields, lang.hitch(this, function (f) {
          if (this.currentFeature.attributes[f.name] === "undefined") {
            errorObj[f.alias] = "undefined";
          }
          else if (this.currentFeature.attributes[f.name] === null) {
            errorObj[f.alias] = "null";
          }
          else {
            switch (f.type) {
              case "esriFieldTypeString":
                if (this.currentFeature.attributes[f.name] === "" ||
                  (this.currentFeature.attributes[f.name] &&
                    this.currentFeature.attributes[f.name].trim() === "")) {
                  errorObj[f.alias] = "Empty string";
                }
                break;
              default:
                break;
            }
          }
        }));
        return errorObj;
      },

      _worksAfterClose: function () {
        // restore the default string of mouse tooltip
        esriBundle.toolbars.draw.start = this._defaultStartStr;
        esriBundle.toolbars.draw.addPoint = this._defaultAddPointStr;

        // show lable layer.
        //var labelLayer = this.map.getLayer("labels");
        //if (labelLayer) {
        //  labelLayer.show();
        //}
      },

      _workBeforeCreate: function () {

        // change string of mouse tooltip
        var additionStr = "<br/>" + "(" + this.nls.pressStr + "<b>" +
          this.nls.ctrlStr + "</b> " + this.nls.snapStr + ")";
        this._defaultStartStr = esriBundle.toolbars.draw.start;
        this._defaultAddPointStr = esriBundle.toolbars.draw.addPoint;
        esriBundle.toolbars.draw.start =
          esriBundle.toolbars.draw.start + additionStr;
        esriBundle.toolbars.draw.addPoint =
          esriBundle.toolbars.draw.addPoint + additionStr;

        // hide label layer.
        //var labelLayer = this.map.getLayer("labels");
        //if (labelLayer) {
        //  labelLayer.hide();
        //}

      },

      _getDefaultFieldInfos: function (layerObject) {
        // summary:
        //  filter webmap fieldInfos.
        // description:
        //   return null if fieldInfos has not been configured in webmap.
        //layerObject = this.map.getLayer(layerInfo.featureLayer.id);
        var fieldInfos = editUtils.getFieldInfosFromWebmap(layerObject.id, this._jimuLayerInfos);//
        if (fieldInfos === undefined || fieldInfos === null) {
          fieldInfos = editUtils.getFieldInfosLayer(layerObject.id, this._jimuLayerInfos);
        }
        if (fieldInfos) {
          fieldInfos = array.filter(fieldInfos, function (fieldInfo) {
            return fieldInfo.visible || fieldInfo.isEditable;
          });
        }
        return fieldInfos;
      },

      _getDefaultLayerInfos: function () {
        var defaultLayerInfos = [];
        var fieldInfos;
        for (var i = this.map.graphicsLayerIds.length - 1; i >= 0; i--) {
          var layerObject = this.map.getLayer(this.map.graphicsLayerIds[i]);
          if (layerObject.type === "Feature Layer" && layerObject.url) {
            var layerInfo = {
              featureLayer: {}
            };
            layerInfo.featureLayer.id = layerObject.id;
            layerInfo.disableGeometryUpdate = false;
            layerInfo.allowUpdateOnly = false; //
            fieldInfos = this._getDefaultFieldInfos(layerObject);
            if (fieldInfos && fieldInfos.length > 0) {
              layerInfo.fieldInfos = fieldInfos;
            }
            defaultLayerInfos.push(layerInfo);
          }
        }
        return defaultLayerInfos;
      },

      _converConfiguredLayerInfos: function (layerInfos) {
        array.forEach(layerInfos, function (layerInfo) {
          // convert layerInfos to compatible with old version
          var layerObject;
          if (!layerInfo.featureLayer.id && layerInfo.featureLayer.url) {
            layerObject = this.getLayerObjectFromMapByUrl(this.map, layerInfo.featureLayer.url);
            if (layerObject) {
              layerInfo.featureLayer.id = layerObject.id;

            }
          }
          else {
            layerObject = this.map.getLayer(layerInfo.featureLayer.id);

          }
          var layID = layerInfo.featureLayer.id;
          if (layerInfo.featureLayer.hasOwnProperty("originalLayerId")) {
            layID = layerInfo.featureLayer.originalLayerId;
          }
          if (layerObject) {
            // convert fieldInfos
            var newFieldInfos = [];
            var webmapFieldInfos =
              editUtils.getFieldInfosFromWebmap(layID, this._jimuLayerInfos);
            if (webmapFieldInfos === undefined || webmapFieldInfos === null) {
              webmapFieldInfos = editUtils.getFieldInfosLayer(layID, this._jimuLayerInfos);
            }
            array.forEach(webmapFieldInfos, function (webmapFieldInfo) {
              if (webmapFieldInfo.fieldName !== layerObject.globalIdField &&
                webmapFieldInfo.fieldName !== layerObject.objectIdField &&
                webmapFieldInfo.type !== "esriFieldTypeGeometry" &&
                webmapFieldInfo.type !== "esriFieldTypeOID" &&
                webmapFieldInfo.type !== "esriFieldTypeBlob" &&
                webmapFieldInfo.type !== "esriFieldTypeGlobalID" &&
                webmapFieldInfo.type !== "esriFieldTypeRaster" &&
                webmapFieldInfo.type !== "esriFieldTypeXML") {
                //var found = array.some(layerInfo.fieldInfos, function (fieldInfo) {
                //  return (webmapFieldInfo.fieldName === fieldInfo.fieldName);
                //});
                //if (found === true) {
                var webmapFieldInfoNew = this.getFieldInfoFromWebmapFieldInfos(webmapFieldInfo, layerInfo.fieldInfos);

                if (webmapFieldInfoNew.visible === true) {
                  newFieldInfos.push(webmapFieldInfoNew);
                }

              }

            }, this);

            if (newFieldInfos.length !== 0) {
              layerInfo.fieldInfos = newFieldInfos;
            }
            //layerInfo = this._modifyFieldInfosForEE(layerInfo);
            //layerInfo.fieldInfo = this._processFieldInfos(layerInfo.fieldInfo);
          }
        }, this);
        return layerInfos;

      },
      getLayerObjectFromMapByUrl: function (map, layerUrl) {
        var resultLayerObject = null;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
          var layerObject = map.getLayer(map.graphicsLayerIds[i]);
          if (layerObject.url.toLowerCase() === layerUrl.toLowerCase()) {
            resultLayerObject = layerObject;
            break;
          }
        }
        return resultLayerObject;
      },

      getFieldInfoFromWebmapFieldInfos: function (webmapFieldInfo, fieldInfos) {
        var foundInfo = {};
        var foundInfos = array.filter(fieldInfos, function (fieldInfo) {
          return (webmapFieldInfo.fieldName === fieldInfo.fieldName);
        });
        if (foundInfos) {
          if (foundInfos.length >= 1) {
            foundInfo = foundInfos[0];
          } else {
            foundInfo = webmapFieldInfo;
          }

        }
        foundInfo.label = foundInfo.label === undefined ?
          webmapFieldInfo.label : foundInfo.label;

        foundInfo.visible = foundInfo.visible === undefined ?
          webmapFieldInfo.visible : foundInfo.visible;

        foundInfo.isEditableSettingInWebmap = webmapFieldInfo.isEditable === undefined ?
          true : webmapFieldInfo.isEditable;

        foundInfo.isEditable = foundInfo.isEditable === undefined ?
          webmapFieldInfo.isEditable : foundInfo.isEditable;

        foundInfo.canPresetValue = foundInfo.canPresetValue === undefined ?
          false : foundInfo.canPresetValue;

        foundInfo.format = webmapFieldInfo.format === undefined ?
          null : webmapFieldInfo.format;

        for (var k in webmapFieldInfo) {
          if (webmapFieldInfo.hasOwnProperty(k)) {
            if (foundInfo.hasOwnProperty(k) === false) {
              foundInfo[k] = webmapFieldInfo[k];
            }
          }
        }
        return foundInfo;
      },
      getConfigDefaults: function () {
        if (this.config.editor.hasOwnProperty("editGeometryDefault") &&
          this.config.editor.editGeometryDefault === true) {
          setTimeout(lang.hitch(this, function () {
            //perform any edit geom switch functionality
            //only when working with main layers feature and not on related features
            if (this._traversal.length < 2 && this._editGeomSwitch.domNode) {
              this._editGeomSwitch.set('checked', true);
            }
          }), 100);
        } else {
          this._turnEditGeometryToggleOff();
        }
      },

      _processConfig: function () {
        /*CT- commented as we need to show non editable layers also
        this.config.editor.configInfos = array.filter(this.config.editor.configInfos, function (configInfo) {
             if (configInfo._editFlag && configInfo._editFlag === true) {
               return true;
             } else {
               return false;
             }
           });*/
        array.forEach(this.config.editor.configInfos, function (configInfo) {
          //To support backward compatibility if _editFlag is not available add it
          if (!configInfo.hasOwnProperty('_editFlag')) {
            configInfo._editFlag = true;
          }
          var layerObject = configInfo.layerInfo.layerObject;
          if (layerObject) {
            if (configInfo.allowUpdateOnly === false) {
              this.own(on(layerObject, "visibility-change, scale-visibility-change", lang.hitch(this, function () {
                //console.log("layer change" + state);
                this._createEditor();
              }
              )));
            }
            // modify templates with space in string fields
            this._removeSpacesInLayerTemplates(layerObject);
            this.processConfigForRuntime(configInfo);
            configInfo.configFeatureLayer = configInfo.featureLayer;
            configInfo.featureLayer = layerObject;
            configInfo.showDeleteButton = false;
          }
        }, this);
      },
      onClose: function () {
        this._worksAfterClose();

        //if (this.config.editor.clearSelectionOnClose) {
        //  if (this._isDirty) {
        //    this._promptToResolvePendingEdit(true).then(lang.hitch(this, function () {
        //      // set this variable for controlling the onMapClick (#494)
        //      this.map.setInfoWindowOnClick(true);
        //      this._attrInspIsCurrentlyDisplayed = true;
        //      this.templatePicker.clearSelection();
        //    }))

        //  } else {
        //    this._cancelEditingFeature(true);

        //    // set this variable for controlling the onMapClick
        //    this.map.setInfoWindowOnClick(true);
        //    this._attrInspIsCurrentlyDisplayed = true;
        //    this.templatePicker.clearSelection();
        //  }
        //} else
        //{
        this._mapClickHandler(false);
        this._removeLayerVisibleHandler();
        //}
        // close method will call onDeActive automaticlly
        // so do not need to call onDeActive();
      },
      _update: function () {
        //if (this.templatePicker) {
        //comments out, this results in teh scroll bar disappearing, unsure why


        //var widgetBox = html.getMarginBox(this.domNode);
        //var height = widgetBox.h;
        //var width = widgetBox.w;


        //var cols = Math.floor(width / 60);
        //this.templatePicker.attr('columns', cols);
        //this.templatePicker.update(true);


        // }
      },

      resize: function () {
        this._update();
      },
      onNormalize: function () {
        setTimeout(lang.hitch(this, this._update), 100);
      },

      onMinimize: function () {
        console.log("min");
      },

      onMaximize: function () {
        setTimeout(lang.hitch(this, this._update), 100);
      },

      /**
      * The function will add new item to item list as per the data
      */
      addItem: function (title, isOpen, itemListContainer, layerId, isTempFeature) {
        var itemContainer;
        itemContainer = domConstruct.create("div", {
          "class": "esriCTItem"
        }, null);
        //domAttr.set(itemContainer, "index", index);
        this._createItemTitle(title, itemContainer, isOpen, isTempFeature);
        this._createItemContent(itemContainer, isOpen, layerId);
        if (isTempFeature) {
          domClass.add(itemContainer, "esriCTDisableToggling");
        }
        itemListContainer.appendChild(itemContainer);
        return itemContainer;
      },

      /**
      * Create item title node
      */
      _createItemTitle: function (title, itemContainer, isOpen, isTempFeature) {
        var itemTitleContainer, itemTitle, arrowIcon, itemHighlighter;
        itemTitleContainer = domConstruct.create("div", {
          "class": "esriCTItemTitleContainer"
        }, itemContainer);
        //Item highlighter
        itemHighlighter = domConstruct.create("div", {
          "class": "esriCTItemHighlighter"
        }, itemTitleContainer);
        //create esriCTItemTitle
        itemTitle = domConstruct.create("div", {
          "class": "esriCTItemTitle esriCTFloatLeft",
          "innerHTML": title,
          "title": title
        }, itemTitleContainer);
        //create arrow icon div
        arrowIcon = domConstruct.create("div", {
          "class": "itemTitleArrowIcon"
        }, itemTitleContainer);
        if (isOpen) {
          domClass.add(arrowIcon, "itemTitleUpArrow");
        } else {
          domClass.add(arrowIcon, "itemTitleDownArrow");
        }
        this.own(on(itemTitleContainer, "click", lang.hitch(this, function (evt) {
          if (!domClass.contains(evt.currentTarget.parentElement, "esriCTDisableToggling") && !isTempFeature) {
            this._togglePanel(itemContainer);
          }
        })));
      },

      /**
      * Create content for each title row
      */
      _createItemContent: function (itemContainer, isOpen, layerId) {
        var itemContent, editDescription, configuredLayerDesc;
        //create node for adding item content
        itemContent = domConstruct.create("div", {
          "class": "esriCTItemContent esriCTRelatedItemContent"
        }, itemContainer);
        if (isOpen) {
          configuredLayerDesc = this._fetchLayerDescription(layerId);
          if (configuredLayerDesc) {
            //show configured description
            editDescription = domConstruct.create("div", {
              "class": "editDescription",
              "innerHTML": configuredLayerDesc
            }, itemContent);
          }
          domConstruct.place(this.attrInspector.domNode, itemContent, "last");
          this._togglePanel(itemContainer);

        } else {
          domConstruct.place(this._relatedTablesInfo[this.attrInspector._currentFeature._layer.id].domNode,
            itemContent, "last");
        }
      },

      /**
      * Create item list based on the data passed
      */
      _togglePanel: function (node) {
        var title, panel, arrowIcon, itemHighlighter;
        title = query(".esriCTItemTitle", node)[0];
        arrowIcon = query(".itemTitleArrowIcon", node)[0];
        panel = query(".esriCTItemContent", node)[0];
        itemHighlighter = query(".esriCTItemHighlighter", node)[0];
        if (title && panel && !domClass.contains(node, "esriCTDisableToggling")) {
          if (!domClass.contains(panel, "esriCTItemContentActive")) {
            //set the item highlighter
            domStyle.set(itemHighlighter, "backgroundColor", this.config.selectedThemeColor);
            //toggle arrow icon class
            domClass.replace(arrowIcon, "itemTitleUpArrow", "itemTitleDownArrow");
          } else {
            //set the item highlighter
            domStyle.set(itemHighlighter, "backgroundColor", "transparent");
            //toggle arrow icon class
            domClass.replace(arrowIcon, "itemTitleDownArrow", "itemTitleUpArrow");
          }
          domClass.toggle(panel, "esriCTItemContentActive");
        }
      },

      /**
      * Disable expand/collapse of layer panel
      */
      _disableToggling: function (layerNode) {
        //var arrowNode;
        //remove layers expand/collapse arrow as it doesn't have any relation
        if (layerNode) {
          domClass.add(layerNode, "esriCTDisableToggling");
        }
      },

      _fetchLayerDescription: function (selectedLayerId) {
        var configuredDesc;
        var currentConfig;
        currentConfig = this.config.editor.layerInfos;
        //get the config info of the selected breadcrumb and display its table
        if (this._traversal && this._traversal.length > 0) {
          array.some(this._traversal, function (layerId, layerIndex) {
            array.some(currentConfig, function (info) {
              if (info.featureLayer.id === layerId) {
                currentConfig = info;
                return true;
              }
            });
            //if current table is not of all-layers and the index is not last then consider the next relations
            if (this._traversal.length > 1 && layerIndex + 1 < this._traversal.length) {
              currentConfig = currentConfig.relationshipInfos;
            }

          }, this);
        } else {
          array.some(currentConfig, function (info) {
            if (info.featureLayer.id === selectedLayerId) {
              currentConfig = info;
              return true;
            }
          });
        }
        if (currentConfig.editDescription) {
          configuredDesc = currentConfig.editDescription;
        }
        return configuredDesc;
      },

      _getRelationshipInfo: function (feature) {
        var id = feature._layer.id;
        if (this._traversal && this._traversal.length > 0) {
          var currentConfig;
          currentConfig = this.config.editor.configInfos;
          array.some(this._traversal, function (layerId, layerIndex) {
            array.some(currentConfig, function (info) {
              if (info.featureLayer.id === layerId) {
                currentConfig = info;
                return true;
              }
            });
            //if current table is not of all-layers and the index is not last then consider the next relations
            if (this._traversal.length > 1 && layerIndex + 1 < this._traversal.length) {
              currentConfig = currentConfig.relationshipInfos;
            }

          }, this);
          return currentConfig.relationshipInfos;
        } else {
          var result = null;
          this.config.editor.configInfos.some(function (configInfo) {
            return configInfo.featureLayer.id === id ? ((result = configInfo.relationshipInfos), true) : false;
          });
          return result;
        }
      },

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

      _getRelatedRecordsByRelatedQuery: function (layerObject, relationshipId, relatedLayersId, parentOID) {
        var def = new Deferred();
        var relatedQuery = new RelationshipQuery();
        var objectId = parentOID; //this.attrInspector._currentFeature.attributes[layerObject.objectIdField];
        var relatedLayer = this._jimuLayerInfos.getLayerOrTableInfoById(relatedLayersId).layerObject;
        var relatedObjectId = relatedLayer.objectIdField;

        relatedQuery.returnGeometry = false;
        relatedQuery.outSpatialReference = this.map.spatialReference;
        relatedQuery.relationshipId = relationshipId;
        relatedQuery.objectIds = [objectId];
        relatedQuery.outFields = [relatedObjectId]; //get only related tables OID so that it will be used for selection
        this.loading.show();
        layerObject.queryRelatedFeatures(
          relatedQuery,
          lang.hitch(this, function (relatedRecords) {
            var features = relatedRecords[objectId] && relatedRecords[objectId].features;
            var relatedObjectIds = [];
            array.forEach(features, function (feature) {
              relatedObjectIds.push(feature.attributes[relatedObjectId]);
            });
            this.loading.hide();
            if (features) {
              def.resolve(relatedObjectIds);
            } else {
              def.resolve(relatedObjectIds);
            }
          }), lang.hitch(this, function () {
            this.loading.hide();
            def.resolve([]);
          })
        );
        return def;
      },

      /* Refresh attributes on geometry change */
      _getCurrentFieldDijit: function (fieldName) {
        var fieldDijit;
        array.some(this.attrInspector._currentLInfo.fieldInfos,
          lang.hitch(this, function (fInfo) {
            if (fInfo.name === fieldName) {
              fieldDijit = fInfo.dijit;
              return true;
            }
          }));
        return fieldDijit;
      },

      _updateRefreshButtonState: function () {
        var hasGeometryDependency;
        if (this._refreshButton && this.config.editor.enableAttributeUpdates) {
          if (domAttr.has(this._refreshButton, "hasGeometryDependency")) {
            hasGeometryDependency = domAttr.get(this._refreshButton, "hasGeometryDependency");
            if (hasGeometryDependency) {
              domClass.remove(this._refreshButton, "hidden");
            }
          } else {
            if (this.currentLayerInfo.fieldValues) {
              hasGeometryDependency = false;
              //loop through all copy actions and get the values as per priority for individual actions
              for (var fieldName in this.currentLayerInfo.fieldValues) {
                for (var i = 0; i < this.currentLayerInfo.fieldValues[fieldName].length; i++) {
                  var copyAction = this.currentLayerInfo.fieldValues[fieldName][i];
                  //get value form intersection if it is enabled
                  if (copyAction.actionName === "Intersection" && copyAction.enabled) {
                    hasGeometryDependency = true;
                    break;
                  }
                  //get value from address if it is enabled
                  if (copyAction.actionName === "Address" && copyAction.enabled) {
                    hasGeometryDependency = true;
                    break;
                  }
                  //get value from coordinates if it is enabled
                  if (copyAction.actionName === "Coordinates" && copyAction.enabled) {
                    hasGeometryDependency = true;
                    break;
                  }
                }
                if (hasGeometryDependency) {
                  break;
                }
              }
              domAttr.set(this._refreshButton, "hasGeometryDependency", hasGeometryDependency);
              if (hasGeometryDependency) {
                domClass.remove(this._refreshButton, "hidden");
              }
            }
          }
        }
      },

      _refreshAttributes: function () {
        this.loading.show();
        //load all the info required to copy attributes
        this._getCopyAttributes(this.currentLayerInfo, this.currentFeature.geometry).then(
          lang.hitch(this, function (copyAttrInfo) {
            //if fieldValues exist means copy actions are applied
            if (this.currentLayerInfo.fieldValues) {
              //loop through all copy actions and get the values as per priority for individual actions
              for (var fieldName in this.currentLayerInfo.fieldValues) {
                //  array.some(this.currentLayerInfo.fieldValues[fieldName], lang.hitch(this, function (copyAction) {
                for (var i = 0; i < this.currentLayerInfo.fieldValues[fieldName].length; i++) {
                  var copyAction = this.currentLayerInfo.fieldValues[fieldName][i];
                  var foundInIntersection = false;
                  var dijit, value;
                  //get value form intersection if it is enabled
                  if (copyAttrInfo && copyAction.actionName === "Intersection" && copyAction.enabled) {
                    for (var j = 0; j < copyAction.fields.length; j++) {
                      var fieldInfo = copyAction.fields[j];
                      if (copyAttrInfo.Intersection.hasOwnProperty(fieldInfo.layerId) &&
                        copyAttrInfo.Intersection[fieldInfo.layerId].hasOwnProperty(fieldInfo.field)) {
                        dijit = this._getCurrentFieldDijit(fieldName);
                        value = copyAttrInfo.Intersection[fieldInfo.layerId][fieldInfo.field];
                        if (dijit && dijit.set) {
                          dijit.set("value", value, true);
                        }
                        foundInIntersection = true;
                        break;
                      }
                    }
                    if (foundInIntersection) {
                      break;
                    }
                  }
                  //get value from address if it is enabled
                  if (copyAttrInfo && copyAction.actionName === "Address" && copyAction.enabled &&
                    copyAttrInfo.Address.hasOwnProperty(copyAction.field)) {
                    dijit = this._getCurrentFieldDijit(fieldName);
                    value = copyAttrInfo.Address[copyAction.field];
                    if (dijit && dijit.set) {
                      dijit.set("value", value, true);
                    }
                    break;
                  }
                  //get value from coordinates if it is enabled
                  if (copyAttrInfo && copyAction.actionName === "Coordinates" && copyAction.enabled) {
                    dijit = this._getCurrentFieldDijit(fieldName);
                    value = copyAttrInfo.Coordinates[copyAction.coordinatesSystem][copyAction.field];
                    value = value + "";
                    if (dijit && dijit.set) {
                      dijit.set("value", value, true);
                    }
                    break;
                  }
                  //get value from preset if it is enabled
                  if (copyAction.actionName === "Preset" && copyAction.enabled && this._usePresetValues) {
                    break;
                  }
                }
              }
            }
            this.loading.hide();
          }));
      }
      /* End Refresh attributes on geometry change */
    });
  });