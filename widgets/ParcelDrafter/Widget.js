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
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/dom-class',
  'dojo/dom-attr',
  'dojo/dom-construct',
  'dojo/dom-style',
  'dojo/on',
  './PlanSettings',
  './XYInput',
  './NewTraverse',
  './MapTooltipHandler',
  './layerUtils',
  'esri/tasks/GeometryService',
  'jimu/dijit/Message',
  'jimu/dijit/LoadingIndicator',
  'esri/tasks/query',
  'esri/request'
],
  function (
    declare,
    BaseWidget,
    array,
    lang,
    domClass,
    domAttr,
    domConstruct,
    domStyle,
    on,
    PlanSettings,
    XYInput,
    NewTraverse,
    MapTooltipHandler,
    layerUtils,
    GeometryService,
    Message,
    LoadingIndicator,
    Query,
    esriRequest
  ) {
    return declare([BaseWidget], {
      baseClass: 'jimu-widget-ParcelDrafter',
      _prevOpenPanel: "mainPage", //Flag to hold last open panel, default will be main page
      _newTraverseInstance: null, //Object to hold traverse instance
      _planSettingsInstance: null, //Object to hold Plan Settings instance
      _mapTooltipHandler: null, //Object to hold MapTooltipHandler instance
      _startPoint: null, //Holds the selected start point
      geometryService: null, //Holds an instance of geometryService
      _lineLayerSpatialReference: null, //Store spatial reference of line layer
      _polygonLayerSpatialReference: null, //Store spatial reference of polygon layer
      _isUpdateStartPoint: null, //Flag to indicate if updated startPoint feature is on
      _featureReductionEnabledLayers: [],

      postMixInProperties: function () {
        //mixin default nls with widget nls
        this.nls.common = {};
        lang.mixin(this.nls.common, window.jimuNls.common);
      },

      postCreate: function () {
        this.inherited(arguments);
        //create instance of geometryService
        if (this.appConfig.geometryService) {
          this.geometryService = new GeometryService(this.appConfig.geometryService);
        } else {
          this._showErrorInWidgetPanel(this.nls.geometryServiceURLNotFoundMSG);
          return;
        }
        //validate configs
        if (!this._isValidConfig()) {
          this._showErrorInWidgetPanel(this.nls.invalidConfigMsg);
          return false;
        }
        //initialize the layerUtils object which will help in getting layer details from map
        this._layerUtils = new layerUtils({
          "map": this.map, getPopupInfo: true, getRenderer: false
        });
        //update the layer details from web-map properties to support popup info
        lang.mixin(this.config.polylineLayer, this._layerUtils.getLayerDetailsFromMap(
          this.config.polylineLayer.baseURL,
          this.config.polylineLayer.layerId, this.config.polylineLayer.id));
        lang.mixin(this.config.polygonLayer, this._layerUtils.getLayerDetailsFromMap(
          this.config.polygonLayer.baseURL,
          this.config.polygonLayer.layerId, this.config.polygonLayer.id));
        //Initialize loading widget
        this._initLoading();
        //get spatialReference of the layers to store the data in layer units
        this._getSpatialReferenceOfParcelLayers();
      },

      startup: function () {
        this.inherited(arguments);
        //override the panel styles
        domClass.add(this.domNode.parentElement, "esriCTOverridePanelStyle");

        // Disable feature reduction for layers
        this._featureReductionEnabledLayers = [];
        array.forEach(this.config.snappingLayers, function (layerSummary) {
          var layer = this.map.getLayer(layerSummary.id);
          if (layer.isFeatureReductionEnabled && layer.isFeatureReductionEnabled()) {
            this._featureReductionEnabledLayers.push(layer);
          }
        }, this);
      },

      /**
      * Performs activities like resizing widget components, connect map click etc on widget open
      * @memberOf widgets/ParcelDrafter/Widget
      */
      onOpen: function () {
        //if current open panel is not mainPage  connect tooltip to update start point
        if (this._mapTooltipHandler && this._prevOpenPanel !== "mainPage") {
          this._isUpdateStartPoint = true;
          this._mapTooltipHandler.connectEventHandler(this.nls.mapTooltipForUpdateStartPoint);
          this._toggleSnapping(true);
        }
      },

      onActive: function () {
        // Disable feature reduction for layers
        array.forEach(this._featureReductionEnabledLayers, function (layer) {
          layer.disableFeatureReduction();
        });
      },

      onDeActive: function () {
        // Re-enable feature reduction for layers
        array.forEach(this._featureReductionEnabledLayers, function (layer) {
          layer.enableFeatureReduction();
        });
      },

      /**
      * Performs activities like disconnect map handlers, close popup etc on widget close
      * @memberOf widgets/ParcelDrafter/Widget
      */
      onClose: function () {
        //disconnect map click handler if active and deactivate all tools
        if (this._mapTooltipHandler) {
          this._toggleSnapping(false);
          this._mapTooltipHandler.disconnectEventHandler();
          domClass.replace(this.newTraverseButton, "esriCTNewTraverseButton",
            "esriCTNewTraverseActive");
          domClass.replace(this.editTraverseButton, "esriCTEditTraverseButton",
            "esriCTEditTraverseActive");
          this.newTraverseSelectMessageNode.innerHTML = "";
          domClass.add(this.newTraverseSelectMessageNodeWrapper, "esriCTHidden");

          this._newTraverseInstance.deActivateDigitizationTool();
          this._newTraverseInstance.deactivateParcelTools();
          //hide popup to edit values
          this._newTraverseInstance.closePopup();
        }
      },

      destroy: function () {
        // Re-enable feature reduction for layers that were disabled at startup.
        array.forEach(this._featureReductionEnabledLayers, function (layer) {
          layer.enableFeatureReduction();
        });

        this.inherited(arguments);
      },

      /**
      * This function initialize the widget workFlow
      * @memberOf widgets/ParcelDrafter/Widget
      */
      _initWidgetWorkFlow: function () {
        //Handle click events for different controls
        this._handleClickEvents();
        //Create mapToolTip handler
        this._createMapTooltipHandler();
        //Create New Traverse instance
        this._createNewTraverse();
        //Create Plan settings instance
        this._createPlanSettings();
        //Create XYInput widget:
        this._createXYInput();
      },

      /**
      * This function validates the configuration
      * @memberOf widgets/ParcelDrafter/Widget
      */
      _isValidConfig: function () {
        var isValid;
        isValid = true;
        if (this.config) {
          if (!this.config.polygonLayer || !this.map.getLayer(this.config.polygonLayer.id)) {
            isValid = false;
          }
          if (!this.config.polylineLayer || !this.map.getLayer(this.config.polylineLayer.id)) {
            isValid = false;
          }
        } else {
          isValid = false;
        }
        return isValid;
      },

      /**
      * This function used for loading indicator
      * @memberOf widgets/ParcelDrafter/Widget
      */
      _initLoading: function () {
        this.loading = new LoadingIndicator({
          hidden: true
        });
        this.loading.placeAt(this.domNode);
        this.loading.startup();
      },

      /**
      * This function is used to get spatial reference of parcel layers(line & polygon)
      * @memberOf widgets/ParcelDrafter/Widget
      */
      _getSpatialReferenceOfParcelLayers: function () {
        var lineLayerRequest, polygonLayerRequest;
        this.loading.show();
        lineLayerRequest = esriRequest({
          url: this.config.polylineLayer.url,
          content: { f: "json" },
          handleAs: "json",
          callbackParamName: "callback"
        });
        lineLayerRequest.then(lang.hitch(this, function (response) {
          this._lineLayerSpatialReference = response.extent.spatialReference;
          polygonLayerRequest = esriRequest({
            url: this.config.polygonLayer.url,
            content: { f: "json" },
            handleAs: "json",
            callbackParamName: "callback"
          });
          polygonLayerRequest.then(lang.hitch(this, function (response) {
            this.loading.hide();
            this._polygonLayerSpatialReference = response.extent.spatialReference;
            this._initWidgetWorkFlow();
          }));
        }));
      },

      /**
      * Handle click events for different controls
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _handleClickEvents: function () {
        //handle plan Settings button click
        this.own(on(this.planSettingsButton, "click", lang.hitch(this, function () {
          this._showPanel("planSettingsPage");
        })));
        //handle start traverse button click
        this.own(on(this.newTraverseButton, "click", lang.hitch(this, function () {
          this._mapTooltipHandler.disconnectEventHandler();
          this._newTraverseInstance.clearAll();
          //check if button is active or not
          if (domClass.contains(this.newTraverseButton, "esriCTNewTraverseActive")) {
            this._toggleSnapping(false);
            domClass.replace(this.newTraverseButton, "esriCTNewTraverseButton",
              "esriCTNewTraverseActive");
            this.newTraverseSelectMessageNode.innerHTML = "";
            domClass.add(this.newTraverseSelectMessageNodeWrapper, "esriCTHidden");
          } else {
            domClass.replace(this.editTraverseButton, "esriCTEditTraverseButton",
              "esriCTEditTraverseActive");
            domClass.replace(this.newTraverseButton, "esriCTNewTraverseActive",
              "esriCTNewTraverseButton");
            this._mapTooltipHandler.connectEventHandler(this.nls.mapTooltipForStartNewTraverse);
            this._isUpdateStartPoint = true;
            this._toggleSnapping(true);
            this.newTraverseSelectMessageNode.innerHTML = this.nls.mapTooltipForStartNewTraverse;
            domClass.remove(this.newTraverseSelectMessageNodeWrapper, "esriCTHidden");
          }
        })));
        //handle edit traverse button click
        this.own(on(this.editTraverseButton, "click", lang.hitch(this, function () {
          this._mapTooltipHandler.disconnectEventHandler();
          this._newTraverseInstance.clearAll();
          //check if button is active or not
          if (domClass.contains(this.editTraverseButton, "esriCTEditTraverseActive")) {
            domClass.replace(this.editTraverseButton, "esriCTEditTraverseButton",
              "esriCTEditTraverseActive");
            this.newTraverseSelectMessageNode.innerHTML = "";
            domClass.add(this.newTraverseSelectMessageNodeWrapper, "esriCTHidden");
          } else {
            domClass.replace(this.newTraverseButton, "esriCTNewTraverseButton",
              "esriCTNewTraverseActive");
            domClass.replace(this.editTraverseButton, "esriCTEditTraverseActive",
              "esriCTEditTraverseButton");
            this._mapTooltipHandler.connectEventHandler(this.nls.mapTooltipForEditNewTraverse);
            this.newTraverseSelectMessageNode.innerHTML = this.nls.mapTooltipForEditNewTraverse;
          }
        })));
        //Handle click event of plan settings back button
        this.own(on(this.planSettingsPanelBackButton, "click", lang.hitch(this, function () {
          this._planSettingsInstance.onClose();
          this._showPanel("traversePage");
        })));
        //Handle click event of plan settings back button
        this.own(on(this.traversePanelBackButton, "click", lang.hitch(this,
          this._confirmCancelTraverse)));
      },

      /**
      * Set snapping layers
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _setSnappingLayers: function () {
        var layerInfos = [], snappingLayer, i;
        //allow snapping with configured layers
        if (this.config.snappingLayers && this.config.snappingLayers.length) {
          for (i = 0; i < this.config.snappingLayers.length; i++) {
            snappingLayer = this.map.getLayer(this.config.snappingLayers[i].id);
            if (snappingLayer) {
              layerInfos.push({ layer: snappingLayer });
            }
          }
        }
        if (!this._isUpdateStartPoint) {
          //allow snapping with point graphics layer
          if (this._newTraverseInstance.parcelPointsGraphicsLayer) {
            layerInfos.push({ layer: this._newTraverseInstance.parcelPointsGraphicsLayer });
          }
        }
        if (this.map.snappingManager) {
          this.map.snappingManager.setLayerInfos(layerInfos);
        }
      },

      /**
      * Toggle snapping on map
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _toggleSnapping: function (isEnable) {
        if (this.map.snappingManager) {
          this.map.snappingManager._deactivateSnapping();
          this.map.disableSnapping();
        }
        if (isEnable && !this.map.snappingManager) {
          this.map.enableSnapping({
            tolerance: this.config.snappingTolerance,
            snapToEdge: true,
            snapToPoint: true,
            snapToVertex: true,
            alwaysSnap: true
          });
          this._setSnappingLayers();
          this.map.snappingManager._setUpSnapping();
        }
      },

      /**
      * Confirm if user wants to cancel the traverse, and if yes reset to main page.
      * before cancelling traversed parcel
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _confirmCancelTraverse: function () {
        var confirmationBox;
        //hide popup to edit values
        this._newTraverseInstance.closePopup();
        confirmationBox = new Message({
          message: this.nls.clearingDataConfirmationMessage,
          type: "question",
          buttons: [{
            "label": this.nls.common.yes,
            "onClick": lang.hitch(this, function () {
              confirmationBox.close();
              this._resetOnBackToMainPage();
            })
          }, { "label": this.nls.common.no }]
        });
      },

      /**
      * This function resets everting on navigating back to main page
      * @memberOf widgets/ParcelDrafter/Widget
      */
      _resetOnBackToMainPage: function () {
        this._startPoint = null;
        //reset the tools
        domClass.replace(this.newTraverseButton, "esriCTNewTraverseButton",
          "esriCTNewTraverseActive");
        domClass.replace(this.editTraverseButton, "esriCTEditTraverseButton",
          "esriCTEditTraverseActive");
        this.newTraverseSelectMessageNode.innerHTML = "";
        domClass.add(this.newTraverseSelectMessageNodeWrapper, "esriCTHidden");
        this._toggleSnapping(false);
        //disconnect the map handlers
        this._mapTooltipHandler.disconnectEventHandler();
        this._newTraverseInstance.clearAll();
        //navigate to main page
        this._showPanel("mainPage");
      },

      /**
      * This function initialize the MapTooltipHandler
      * @memberOf widgets/ParcelDrafter/Widget
      */
      _createMapTooltipHandler: function () {
        // create an instance of MapTooltipHandler
        this._mapTooltipHandler = new MapTooltipHandler({
          toolTipText: this.nls.mapTooltipForStartNewTraverse,
          map: this.map
        });
        //set default map click action to update start point
        this._isUpdateStartPoint = true;
        //handle clicked event
        this.own(this._mapTooltipHandler.on("clicked", lang.hitch(this, function (evt) {
          var deferred;
          //if snapping manager is available use snapping otherwise used clicked mapPoint
          if (this.map && this.map.snappingManager) {
            //call the getSnappingPoint method to get snapped point, & in deferred callback check
            //if snapPoint is valid use it otherwise used clicked mapPoint
            deferred = this.map.snappingManager.getSnappingPoint(evt.screenPoint);
            deferred.then(lang.hitch(this, function (snappingPoint) {
              var mapPoint;
              if (snappingPoint) {
                mapPoint = snappingPoint;
              } else {
                mapPoint = evt.mapPoint;
              }
              this._onMapPointSelected(mapPoint);
            }));
          } else {
            this._onMapPointSelected(evt.mapPoint);
          }
        })));
        this.own(this._mapTooltipHandler.on("dragging", lang.hitch(this, function (evt) {
          if (this._startPoint) {
            if (this._mapTooltipHandler.toolTipText === this.nls.mapTooltipForRotate) {
              //set rotation angle for selected parcel
              this._newTraverseInstance.setRotation(evt.mapPoint);
            } else if (this._mapTooltipHandler.toolTipText === this.nls.mapTooltipForScale) {
              this._newTraverseInstance.setScaling(evt.mapPoint);
            }
          }
        })));
        this.own(this._mapTooltipHandler.on("moving", lang.hitch(this, function (evt) {
          //Do not allow parcel editing if rotation or scaling feature is activated
          if (this._mapTooltipHandler.toolTipText === this.nls.mapTooltipForUpdateStartPoint) {
            if (this._startPoint) {
              this._newTraverseInstance._showParcelPopup(evt).then(
                lang.hitch(this, function (isPopup) {
                  if (isPopup) {
                    //hide map tooltip if parcel edit popup is opened
                    domStyle.set(this._mapTooltipHandler._mapTooltip, "display", "none");
                  }
                }));
            }
          }
        })));
        // once widget is created call its startup method
        this._mapTooltipHandler.startup();
      },

      /**
      * This function execute the  appropriate action after mapPoint is selected
      * @memberOf widgets/ParcelDrafter/Widget
      */
      _onMapPointSelected: function (mapPoint) {
        // if map tooltip handler text is set to screen digitization widget
        // add parcel points on map else start point is selected/updated
        if (this._mapTooltipHandler.toolTipText === this.nls.mapTooltipForScreenDigitization) {
          this._newTraverseInstance.pointAddedFromDigitization(mapPoint);
        } else {
          if (!this._startPoint) {
            if (this._mapTooltipHandler.toolTipText === this.nls.mapTooltipForEditNewTraverse) {
              this._startPoint = mapPoint;
              // get polygon that needs to be edited
              this._getPolygonForEdits(mapPoint);
            } else {
              //set traverse page title
              domAttr.set(this.traverseTitleNode, "innerHTML", this.nls.newTraverseTitle);
              domAttr.set(this.traverseTitleNode, "title", this.nls.newTraverseTitle);
              //after selecting start point for first time show new traverse page
              this._showPanel("traversePage");
              this._mapTooltipHandler.updateTooltip(this.nls.mapTooltipForUpdateStartPoint);
            }
          }
          this._startPoint = mapPoint;
          this._newTraverseInstance.setStartPoint(this._startPoint);
        }
      },

      /**
      * This function is used to get polygons that needs to be edited
      * @memberOf widgets/ParcelDrafter/Widget
      */
      _getPolygonForEdits: function (mapPoint) {
        var featureQuery, polygonLayer, currentDateTime;
        this.loading.show();
        currentDateTime = new Date().getTime();
        featureQuery = new Query();
        featureQuery.geometry = mapPoint;
        featureQuery.outSpatialReference = this.map.spatialReference;
        featureQuery.returnGeometry = false;
        featureQuery.outFields = ["*"];
        featureQuery.where = currentDateTime + "=" + currentDateTime;
        polygonLayer = this.map.getLayer(this.config.polygonLayer.id);
        if (polygonLayer) {
          polygonLayer.queryFeatures(featureQuery, lang.hitch(this, function (featureSet) {
            var i;
            this.loading.hide();
            //if no parcel found at the selected location display error
            //else proceed to get the lines and negative to traverse page
            if (featureSet && featureSet.features.length > 0) {
              this._newTraverseInstance.polygonDeleteArr = featureSet.features;
              for (i = 0; i < featureSet.features.length; i++) {
                this._getLinesForEdits(featureSet.features[i]);
                break;
              }
            } else {
              this._startPoint = null;
              this._showMessage(this.nls.unableToFetchParcelMessage);
            }
          }), lang.hitch(this, function () {
            this.loading.hide();
            this._startPoint = null;
            this._showMessage(this.nls.unableToFetchParcelMessage);
          }));
        } else {
          this.loading.hide();
          this._startPoint = null;
          this._showMessage(this.nls.unableToFetchParcelMessage);
        }
      },

      /**
      * This function is used to sort feature accordingly to sequence ID of feature
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _sortFeatureAccToSequenceID: function (features) {
        var sequenceID;
        sequenceID = this.config.polylineLayer.sequenceId.name;
        features.sort(function (a, b) {
          return a.attributes[sequenceID] - b.attributes[sequenceID];
        });
        return features;
      },

      /**
      * This function is used to get lines that needs to be edited
      * @memberOf widgets/ParcelDrafter/Widget
      */
      _getLinesForEdits: function (polygon) {
        var featureQuery, lineLayer, guid;
        this.loading.show();
        guid = polygon.attributes[this.config.polygonLayer.relatedGUID.name];
        featureQuery = new Query();
        featureQuery.outSpatialReference = this.map.spatialReference;
        featureQuery.returnGeometry = true;
        featureQuery.outFields = ["*"];
        featureQuery.where = this.config.polylineLayer.relatedGUID.name + "='" + guid + "'";
        lineLayer = this.map.getLayer(this.config.polylineLayer.id);
        if (lineLayer) {
          lineLayer.queryFeatures(featureQuery, lang.hitch(this, function (featureSet) {
            this.loading.hide();
            if (featureSet && featureSet.features.length > 0) {
              //first sort the features according to sequenceID so that the order will be maintained
              featureSet.features = this._sortFeatureAccToSequenceID(featureSet.features);
              this._newTraverseInstance.polylineDeleteArr = featureSet.features;
              //set the start point as the first point of polyline
              this._startPoint = featureSet.features[0].geometry.getPoint(0, 0);
              //set traverse page title
              domAttr.set(this.traverseTitleNode, "innerHTML", this.nls.editTraverseTitle);
              domAttr.set(this.traverseTitleNode, "title", this.nls.editTraverseTitle);
              this._newTraverseInstance.initEditing(this._startPoint, featureSet,
                this._lineLayerSpatialReference);
              this._toggleSnapping(true);
              //after fetching all the lines for editing show traverse page
              this._showPanel("traversePage");
              this._mapTooltipHandler.updateTooltip(this.nls.mapTooltipForUpdateStartPoint);
            } else {
              this._startPoint = null;
              this._showMessage(this.nls.unableToFetchParcelLinesMessage);
            }
          }), lang.hitch(this, function () {
            this.loading.hide();
            this._startPoint = null;
            this._showMessage(this.nls.unableToFetchParcelLinesMessage);
          }));
        } else {
          this.loading.hide();
          this._startPoint = null;
          this._showMessage(this.nls.unableToFetchParcelLinesMessage);
        }
      },

      /**
      * Creates New Traverse
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _createNewTraverse: function () {
        this._newTraverseInstance = new NewTraverse({
          nls: this.nls,
          config: this.config,
          map: this.map,
          loading: this.loading,
          geometryService: this.geometryService,
          appConfig: this.appConfig,
          lineLayerSpatialReference: this._lineLayerSpatialReference,
          polygonLayerSpatialReference: this._polygonLayerSpatialReference
        }, this.traverseNode);
        this.own(this._newTraverseInstance.on("showMessage", lang.hitch(this, this._showMessage)));
        this.own(this._newTraverseInstance.on("activateDigitizationTool",
          lang.hitch(this, function () {
            this._onActivateDigitization();
          })));
        this.own(this._newTraverseInstance.on("deActivateDigitizationTool",
          lang.hitch(this, function () {
            this._onDeactivateDigitization();
          })));
        //Handle click event of parcelInfo cancel button
        this.own(this._newTraverseInstance.on("cancelTraverse", lang.hitch(this, function () {
          this._confirmCancelTraverse();
        })));
        // to display main page once parcel is saved
        this.own(this._newTraverseInstance.on("displayMainPageAfterSave",
          lang.hitch(this, function () {
            this._resetOnBackToMainPage();
          })));
        this.own(this._newTraverseInstance.on("toggleRotating",
          lang.hitch(this, function (isEnable) {
            this._toggleRotating(isEnable);
          })));
        this.own(this._newTraverseInstance.on("toggleScaling",
          lang.hitch(this, function (isEnable) {
            this._toggleScaling(isEnable);
          })));
      },

      /**
      * toggle rotating functionality
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _toggleRotating: function (isEnable) {
        if (isEnable) {
          this._mapTooltipHandler.connectMouseDragHandler(this.nls.mapTooltipForRotate);
          this._newTraverseInstance.deActivateDigitizationTool();
        } else {
          this._isUpdateStartPoint = true;
          this._mapTooltipHandler.disconnectEventHandler();
          this._mapTooltipHandler.connectEventHandler(this.nls.mapTooltipForUpdateStartPoint);
        }
        this._toggleSnapping(!isEnable);
      },

      /**
      * toggle scaling functionality
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _toggleScaling: function (isEnable) {
        if (isEnable) {
          this._mapTooltipHandler.connectMouseDragHandler(this.nls.mapTooltipForScale);
          this._newTraverseInstance.deActivateDigitizationTool();
        } else {
          this._newTraverseInstance.distance = null;
          this._isUpdateStartPoint = true;
          this._mapTooltipHandler.disconnectEventHandler();
          this._mapTooltipHandler.connectEventHandler(this.nls.mapTooltipForUpdateStartPoint);
        }
        this._toggleSnapping(!isEnable);
      },

      /**
      * on activating digitization enable map click to add new line
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _onActivateDigitization: function () {
        this._mapTooltipHandler.disconnectEventHandler();
        this._mapTooltipHandler.connectEventHandler(this.nls.mapTooltipForScreenDigitization);
        this._newTraverseInstance.deactivateParcelTools();
        this._isUpdateStartPoint = false;
        this._toggleSnapping(true);
      },

      /**
      * onDeactivating digitization enable map click to update parcel location on map
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _onDeactivateDigitization: function () {
        this._mapTooltipHandler.updateTooltip(this.nls.mapTooltipForUpdateStartPoint);
        this._isUpdateStartPoint = true;
        this._toggleSnapping(true);
      },

      /**
      * Creates plan settings
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _createPlanSettings: function () {
        //Create PlanSettings Instance
        this._planSettingsInstance = new PlanSettings({
          nls: this.nls,
          config: this.config,
          appConfig: this.appConfig
        }, domConstruct.create("div", {}, this.planSettingsNode));
        this.own(this._planSettingsInstance.on("planSettingsChanged",
          lang.hitch(this, function (updatedSettings) {
            this._newTraverseInstance.updateAccordingToPlanSettings(
              updatedSettings);
          })));
        this._planSettingsInstance.startup();
      },

      /**
      * Creates x/y input form
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _createXYInput: function () {
        //Create PlanSettings Instance
        this._xyInputInstance = new XYInput({
          nls: this.nls,
          config: this.config,
          appConfig: this.appConfig,
          map: this.map
        }).placeAt(this.newTraverseSelectMessageNodeWrapper, "last");
        this.own(this._xyInputInstance.on("newPoint",
          lang.hitch(this, function (point) {
            this._onMapPointSelected(point);
          })));
        this._xyInputInstance.startup();
      },

      /**
      * Displays selected panel
      * @param {string} panel name
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _showPanel: function (currentPanel) {
        var prevNode, currentNode;
        //check if previous panel exist and hide it
        if (this._prevOpenPanel) {
          prevNode = this._getNodeByName(this._prevOpenPanel);
          domClass.add(prevNode, "esriCTHidden");
        }
        //get current panel to be displayed and show it
        currentNode = this._getNodeByName(currentPanel);
        domClass.remove(currentNode, "esriCTHidden");
        //set the current panel as previous panel
        this._prevOpenPanel = currentPanel;
      },

      /**
      * This function creates and show alert message.
      * @param {string} msg
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _showMessage: function (msg) {
        var alertMessage = new Message({
          message: msg,
          buttons: [{
            "label": this.nls.common.ok
          }]
        });
        alertMessage.message = msg;
      },

      /**
      * This function shows the msg in widget panel and hide the widgets other nodes
      * @param {string} msg
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _showErrorInWidgetPanel: function (msg) {
        domAttr.set(this.widgetErrorNode, "innerHTML", msg);
        domClass.add(this.widgetMainNode, "esriCTHidden");
        domClass.remove(this.widgetErrorNode, "esriCTHidden");
      },

      /**
      * Get panel node from panel name
      * @param {string} panel name
      * @memberOf widgets/ParcelDrafter/Widget
      **/
      _getNodeByName: function (panelName) {
        var node;
        switch (panelName) {
        case "mainPage":
          node = this.mainPageNode;
          break;
        case "traversePage":
          node = this.traversePageNode;
          break;
        case "planSettingsPage":
          node = this.planSettingsPageNode;
          break;
        }
        return node;
      }
    });
  });
