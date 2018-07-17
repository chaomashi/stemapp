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
  'dojo/on',
  'dojo/_base/lang',
  'dojo/dom-class',
  'dojo/query',
  'dojo/dom-style',
  'dojo/dom-construct',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/Deferred',
  'dojo/promise/all',
  'dojo/keys',
  'dijit/focus',
  'dojo/dom-attr',
  'dojo/_base/fx',
  'jimu/BaseWidget',
  'jimu/dijit/LoadingIndicator',
  'jimu/portalUtils',
  'jimu/dijit/Message',
  'esri/layers/GraphicsLayer',
  'esri/geometry/geometryEngine',
  'esri/graphic',
  'esri/tasks/BufferParameters',
  'esri/tasks/GeometryService',
  'esri/symbols/jsonUtils',
  'esri/graphicsUtils',
  'jimu/LayerInfos/LayerInfos',
  './layerUtil',
  './placename/placename',
  './drawTool/drawTool',
  './shapefile/shapefile',
  './coordinates/coordinates',
  './impactSummaryReport/impactSummaryReport',
  './download/download',
  'dojo/_base/array',
  './conversionUtils',
  './geometryUtils',
  'jimu/dijit/Report',
  'jimu/dijit/PageUtils',
  'dojo/number',
  'dijit/popup',
  'dojo/colors',
  'esri/tasks/PrintTemplate',
  'esri/tasks/LegendLayer',
  'jimu/portalUrlUtils',
  'jimu/utils',
  'dojo/date/locale',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'esri/request',
  'dojo/DeferredList',
  'dijit/form/NumberTextBox',
  'dijit/form/DropDownButton'
], function (
  declare,
  on,
  lang,
  domClass,
  query,
  domStyle,
  domConstruct,
  _WidgetsInTemplateMixin,
  Deferred,
  all,
  keys,
  focusUtil,
  domAttr,
  fx,
  BaseWidget,
  LoadingIndicator,
  portalUtils,
  Message,
  GraphicsLayer,
  GeometryEngine,
  Graphic,
  BufferParameters,
  GeometryService,
  jsonUtils,
  graphicsUtils,
  LayerInfos,
  layerUtil,
  Placename,
  DrawTool,
  Shapefile,
  Coordinates,
  ImpactSummaryReport,
  DownloadReport,
  array,
  conversionUtils,
  geometryUtils,
  reportDijit,
  PageUtils,
  dojoNumber,
  dijitPopup,
  Colors,
  PrintTemplate,
  LegendLayer,
  portalUrlUtils,
  jimuUtils,
  locale,
  Query,
  QueryTask,
  esriRequest,
  DeferredList
) {
  // To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-screening',

    _bufferValue: null, // To store buffer value
    _currentActiveTool: null, // To hold which aoi Widget is open
    _geometryService: null, // To store geometry service's instance
    _loadingIndicator: null, // To store loading indicator's instance
    _aoiGraphicsLayer: null, // To store AOI graphics layer
    _drawnOrSelectedGraphicsLayer: null, // To store drawn or selected graphics layer
    _uploadedShapefileGraphicsLayer: null, // To store uploaded shapefile graphics
    _toleranceGraphicsLayer: null, // To store tolerance graphics for point and polyline
    _placenameTool: null, //To hold placenameTool instance
    _drawTool: null, //To hold drawTool instance
    _coordinatesTool: null, //To hold coordinateTool instance
    _layerInfoArray: null,
    _currentPanel: null, // To store current visible panel
    _newShapeFileAnalysisArr: null, // hols the information about uploaded shape file
    _downloadFeatureDetailsObj: {}, // to store intersect feature details needed for download
    _printData: {}, //To store data for print of each layer
    _panels: {}, // To store the panel nodes
    _isReportGenerated: false, // Boolean value which indicates wether the report is generated
    _isExceedingMaxRecordCount: false, // track whether feature count exceeds max record count
    _currentPanelName: "", // To store current visible panel name
    printOptions: [],
    _defaultOptions: { // to store the object containing page size like A0, A1, A2...
      //Considered portrait sizes
      "A3 Portrait": { "Orientation": "Portrait", "SizeName": "A3" },
      "A3 Landscape": { "Orientation": "Landscape", "SizeName": "A3" },
      "A4 Portrait": { "Orientation": "Portrait", "SizeName": "A4" },
      "A4 Landscape": { "Orientation": "Landscape", "SizeName": "A4" },
      "Letter ANSI A Portrait": { "Orientation": "Portrait", "SizeName": "Letter_ANSI_A" },
      "Letter ANSI A Landscape": { "Orientation": "Landscape", "SizeName": "Letter_ANSI_A" },
      "Tabloid ANSI B Portrait": { "Orientation": "Portrait", "SizeName": "Tabloid_ANSI_B" },
      "Tabloid ANSI B Landscape": { "Orientation": "Landscape", "SizeName": "Tabloid_ANSI_B" }
    },
    _printServiceChoiceList: [],
    _isMapOnlyOptionAvailable: false,

    constructor: function (options) {
      this._bufferValue = null;
      this._currentActiveTool = null;
      this._geometryService = null;
      this._loadingIndicator = null;
      this._aoiGraphicsLayer = null;
      this._drawnOrSelectedGraphicsLayer = null;
      this._uploadedShapefileGraphicsLayer = null;
      this._toleranceGraphicsLayer = null;
      this._placenameTool = null;
      this._drawTool = null;
      this._coordinatesTool = null;
      this._layerInfoArray = null;
      this._currentPanel = null;
      this._newShapeFileAnalysisArr = null;
      this._downloadFeatureDetailsObj = {};
      this._printData = {};
      this._panels = {};
      this._isReportGenerated = false;
      this._isExceedingMaxRecordCount = false;
      this._currentPanelName = "";
      this.printOptions = [];
      this._printServiceChoiceList = [];
      this._isMapOnlyOptionAvailable = false;
      lang.mixin(this, options);
    },

    postMixInProperties: function () {
      //mixin default nls with widget nls
      this.nls.common = {};
      this.nls.units = {};
      lang.mixin(this.nls.common, window.jimuNls.common);
      //mixin the units form jimu nls
      lang.mixin(this.nls.units, window.jimuNls.units);
    },

    /**
     * This function is used to get the url needed to execute generate operation for uploading
     * shapefile.
     * @memberOf Screening/Widget
     */
    getGenerateOperationUrl: function () {
      var p, sharingUrl;
      p = portalUtils.getPortal(this.appConfig.portalUrl);
      sharingUrl = portalUrlUtils.getSharingUrl(p.portalUrl);
      return sharingUrl + "/content/features/generate";
    },

    /**
     * This function is used to check the value of area unit for handling backward compatibility.
     * If it is standard or metric then convert it to feet which is by default 1st unit displayed in area unit dropdown
     * @memberOf Screening/Widget
     */
    _validateAreaUnit: function () {
      if (this.config.areaUnits === "Standard") {
        this.config.areaUnits = "Miles";
      } else if (this.config.areaUnits === "Metric") {
        this.config.areaUnits = "Kilometers";
      } else if (this.config.areaUnits !== "Feet" && this.config.areaUnits !== "Miles" &&
        this.config.areaUnits !== "Meters" && this.config.areaUnits !== "Kilometers" &&
        this.config.areaUnits !== "Hectares") {
        this.config.areaUnits = "Feet";
      }
    },

    startup: function () {
      var isValidConfig;
      this.inherited(arguments);
      this._validateAreaUnit();
      this._setTheme();
      this.own(on(document.body, 'click', lang.hitch(this, function () {
        this._validateBufferDistance(this.bufferDistanceTextBox.value);
      })));
      //override the panel styles
      domClass.add(this.domNode.parentElement, "esriCTOverridePanelStyle");
      if (this.appConfig.portalUrl &&
        lang.trim(this.appConfig.portalUrl) !== "") {
        //get portal info to fetch geometry service Url
        portalUtils.getPortalSelfInfo(this.appConfig.portalUrl).then(
          lang.hitch(this, function (portalInfo) {
            this.config.generateFeatureCollectionURL = this.getGenerateOperationUrl();
            // get helper-services from portal object
            this.config.helperServices = portalInfo && portalInfo
              .helperServices;
            if (this.config.helperServices && this.config.helperServices
              .geometry) {
              // Initializing geometry service
              this._geometryService =
                new GeometryService(this.config.helperServices.geometry.url);
              // validate if layers are configured then only load the widget
              isValidConfig = this._validateConfiguration();
              if (isValidConfig) {
                this._initLoadingIndicator();
                this._filterLayersFromMap();
                domClass.remove(this.backButtonDiv, "esriCTHidden");
              } else {
                this._displayErrorMessageInWidget();
              }
            } else {
              // Display error message if geometry service is not found
              this._showMessage(this.nls.geometryServicesNotFound);
            }
          }), lang.hitch(this, function () {
            // Display error message if any error occurred while
            // fetching portal info for geometry service
            this._showMessage(this.nls.geometryServicesNotFound);
          }));
      } else {
        // Display error message if portal url is not available
        this._showMessage(this.nls.geometryServicesNotFound);
      }
    },

    /**
     * Add styles for theme overrides
     * @memberOf Screening/Widget
     */
    _setTheme: function (changedTheme) {
      var styleLink;
      if (this.appConfig.theme.name === "DashboardTheme") {
        jimuUtils.loadStyleLink(this.baseClass + 'dashboardOverrideCSS',
          this.folderUrl + "/css/dashboardTheme.css", null);
        if (this.appConfig.theme.styles && this.appConfig.theme.styles.length > 0) {
          if (this.appConfig.theme.styles[0] === "light" || changedTheme === "light") {
            if (changedTheme && changedTheme !== "light") {
              styleLink = document.getElementById(this.baseClass + 'dashboardOverrideLightCSS');
              if (styleLink) {
                styleLink.disabled = true;
              }
            } else {
              jimuUtils.loadStyleLink(this.baseClass + 'dashboardOverrideLightCSS',
                this.folderUrl + "/css/dashboardThemeLight.css", null);
            }
          } else {
            styleLink = document.getElementById(this.baseClass + 'dashboardOverrideLightCSS');
            if (styleLink) {
              styleLink.disabled = true;
            }
          }
        }
      } else {
        styleLink = document.getElementById(this.baseClass + 'dashboardOverrideCSS');
        if (styleLink) {
          styleLink.disabled = true;
        }
        styleLink = document.getElementById(this.baseClass + 'dashboardOverrideLightCSS');
        if (styleLink) {
          styleLink.disabled = true;
        }
      }
    },

    /**
     * Display error message if configuration is not valid
     * @memberOf Screening/Widget
     */
    _displayErrorMessageInWidget: function () {
      domClass.add(this.widgetMainContainer, "esriCTHidden");
      domClass.remove(this.errorMessageMainContainer, "esriCTHidden");
    },

    /**
     * Show AOI and drawn or other selected graphics from map on open, if available
     * @memberOf Screening/Widget
     */
    onOpen: function () {
      if (this._drawnOrSelectedGraphicsLayer && this._drawnOrSelectedGraphicsLayer
        .graphics) {
        this._drawnOrSelectedGraphicsLayer.show();
      }
      if (this._aoiGraphicsLayer && this._aoiGraphicsLayer.graphics) {
        this._aoiGraphicsLayer.show();
      }
      if (this._highlightGraphicsLayer) {
        this._highlightGraphicsLayer.show();
      }
    },

    /**
     * Hide AOI and drawn or other selected graphics from map on close, if available
     * @memberOf Screening/Widget
     */
    onClose: function () {
      if (this._drawnOrSelectedGraphicsLayer &&
        this._drawnOrSelectedGraphicsLayer.graphics) {
        this._drawnOrSelectedGraphicsLayer.hide();
      }
      if (this._aoiGraphicsLayer && this._aoiGraphicsLayer.graphics) {
        this._aoiGraphicsLayer.hide();
      }
      if (this._drawTool) {
        this._drawTool.deactivateTools();
      }
      if (this._coordinatesTool) {
        this._coordinatesTool.deactivateLocateIcon();
      }
      if (this._highlightGraphicsLayer) {
        this._highlightGraphicsLayer.hide();
      }
    },

    /**
     * This function is used to de-activate the draw tool
     * @memberOf Screening/Widget
     */
    onDeActive: function () {
      if (this._drawTool) {
        this._drawTool.deactivateTools();
      }
    },

    /**
     * This function is responsible for initializing widget components
     * @memberOf Screening/Widget
     */
    _initWidgetComponents: function () {
      var canDownloadReport;
      this._initTabControl();
      this._attachAllEvents();
      this._setUpPrintDialogPopup();
      this._setAnalysisUnitDialogPopup(); // to create analysis unit dialog
      this._disableShowReportsButton();
      this._createAndAddGraphicsLayer();
      this._displayConfiguredWidgetAOIButton();
      this._setBufferInputs();
      canDownloadReport = this._canDownload();
      //Check if user can download reports in specified format
      if (canDownloadReport) {
        //Create download instance on load
        this._initDownloadWidget();
      } else {
        domClass.add(this.downloadReportBtn, "esriCTHidden");
      }
      //init upload shapeFile for analysis if it is configured
      if (this.config.allowShapefilesUpload) {
        this._initShapeFileForAnalysis();
      }
      //show configured units for AOI
      this._displayConfiguredAOIArea();
      //initialize report dijit for printing
      this._initReportDijit();
      // Hide loading indicator
      this._loadingIndicator.hide();
    },

    /**
     * This function decides wether to show/hide download button
     * based on configuration
     * @memberOf Screening/widget
     */
    _canDownload: function () {
      var canDownloadReport = false;
      //If app is running in iOS device, hide download button
      if (this.isIOS()) {
        canDownloadReport = false;
        return;
      }
      if (this.config.downloadSettings) {
        if (this.config.downloadSettings.type === "cannotDownload") {
          canDownloadReport = false;
        } else if (this.config.downloadSettings.type === "extractDataTask") {
          canDownloadReport = true;
        } else if (this.config.downloadSettings.type === "syncEnable") {
          array.some(this.config.downloadSettings.layers, lang.hitch(this, function (currentLayer) {
            if (currentLayer.allowDownload) {
              canDownloadReport = true;
              return true;
            }
          }));
        }
      } else {
        canDownloadReport = false;
      }
      return canDownloadReport;
    },

    /**
     * Callback function called on receiving searched data from placeName/coordinate widget
     * @param{object} contains selected search data
     * @memberOf Screening/Widget
     */
    onReceiveSearchData: function (data) { // jshint ignore:line
      var selectedGraphics, queryObj, queryTask;
      // Show loading indicator
      this._loadingIndicator.show();
      if (data && data.source && data.source.locator) {
        // Check if placename tab is selected else coordinates tab is selected
        if (domClass.contains(this.placenameButton, "esriCTAOIButtonSelected")) {
          // Search will return only one feature, so add this to graphics in array
          selectedGraphics = [data.result.feature];
          // Initiate to create AOI buffer
          this._initToCreateAOIBuffer(selectedGraphics);
        } else if ((domClass.contains(this.coordinatesButton, "esriCTAOIButtonSelected")) &&
          (data.result.feature.geometry.type === "point")) {
          this._coordinatesTool.onStartPointSelected(data.result.feature.geometry);
        }
      } else {
        queryObj = new Query();
        queryObj.outFields = ["*"];
        queryObj.returnGeometry = true;
        queryObj.objectIds = [data.result.feature.attributes[data.result.feature._layer.objectIdField]];
        queryObj.outSpatialReference = this.map.spatialReference;
        queryTask = new QueryTask(data.result.feature._layer.url);
        queryTask.execute(queryObj, lang.hitch(this, function (featureSet) {
          if (featureSet.features) {
            // Check if placename tab is selected else coordinates tab is selected
            if (domClass.contains(this.placenameButton, "esriCTAOIButtonSelected")) {
              // Search will return only one feature, so add this to graphics in array
              selectedGraphics = [featureSet.features[0]];
              // Initiate to create AOI buffer
              this._initToCreateAOIBuffer(selectedGraphics);
            } else if ((domClass.contains(this.coordinatesButton, "esriCTAOIButtonSelected")) &&
              (featureSet.features[0].geometry.type === "point")) {
              this._coordinatesTool.onStartPointSelected(featureSet.features[0].geometry);
            }
          } else {
            this._loadingIndicator.hide();
          }
        }), lang.hitch(this, function () {
          this._loadingIndicator.hide();
        }));
      }
    },

    /**
     * This function used for initializing the loading indicator
     * @memberOf Screening/Widget
     */
    _initLoadingIndicator: function () {
      this._loadingIndicator = new LoadingIndicator({
        hidden: true
      });
      this._loadingIndicator.placeAt(this.domNode.parentNode);
      this._loadingIndicator.startup();
    },

    /**
     * This function is used to validate widget configuration.
     * It checks whether all configured layers are valid/invalid
     */
    _validateConfiguration: function () {
      if (!this.config.layers || this.config.layers.length === 0) {
        return false;
      }
      //Validate if any aoi widget is configured or not
      if (this.config.layers.length === 0 &&
        this.config.showPlacenameWidget === false &&
        this.config.showDrawToolsWidget === false &&
        this.config.showShapefileWidget === false &&
        this.config.showCoordinatesWidget === false) {
        return false;
      }
      return true;
    },

    /**
     * This function is used to create & initialize AOI & Report tab
     * @memberOf Screening/Widget
     */
    _initTabControl: function () {
      domAttr.set(this.aoiLabelContainer, "innerHTML", this.config.aoiTabText);
      domAttr.set(this.reportLabelContainer, "innerHTML", this.config.reportTabText);
      this._panels.aoiTabParentContainer = this.aoiTabParentContainer;
      this._panels.reportTabParentContainer = this.reportTabParentContainer;
      this._currentPanel = this.aoiTabParentContainer;
      this._currentPanelName = "aoiTabParentContainer";
      domStyle.set(this._currentPanel, 'display', 'block');
      domStyle.set(this._currentPanel, 'left', '0px');
    },

    /**
     * This function is to attach events of different dom and callback
     * @memberOf Screening/Widget
     */
    _attachAllEvents: function () {
      var contentPane;
      //Handle click events of AOI buttons
      this.own(on(this.placenameButton, "click", lang.hitch(this, function () {
        this._onPlacenameButtonClick();
      })));
      this.own(on(this.drawToolsButton, "click", lang.hitch(this, function () {
        this._onDrawToolsButtonClick();
      })));
      this.own(on(this.shapefileButton, "click", lang.hitch(this, function () {
        this._onShapefileButtonClick();
      })));
      this.own(on(this.coordinatesButton, "click", lang.hitch(this, function () {
        this._onCoordinatesButtonClick();
      })));

      this.own(on(this.clearAOIButton, "click", lang.hitch(this, function () {
        this._clearAOI();
      })));
      //attach reports button click
      this.own(on(this.showReportsButton, "click", lang.hitch(this, function () {
        if (!domClass.contains(this.showReportsButton, "jimu-state-disabled")) {
          domClass.add(this.aoiLabelContainer, "esriCTHidden");
          domClass.remove(this.reportLabelContainer, "esriCTHidden");
          this._showPanel("reportTabParentContainer");
          this._onReportTabClick();
        }
      })));
      //attach back button click
      this.own(on(this.backButtonDiv, "click", lang.hitch(this, function () {
        domClass.remove(this.aoiLabelContainer, "esriCTHidden");
        domClass.add(this.reportLabelContainer, "esriCTHidden");
        this._showPanel("aoiTabParentContainer", true);
      })));

      this.own(on(this.zoomToNode, "click", lang.hitch(this, function () {
        if (this._aoiGraphicsLayer.graphics.length > 0 ||
          this._drawnOrSelectedGraphicsLayer.graphics.length > 0) {
          // zoom to AOI
          this._setExtentToGraphicsLayer(this._aoiGraphicsLayer,
            this._drawnOrSelectedGraphicsLayer);
        }
      })));
      //Handle click events of report tab buttons
      this.own(on(this.downloadReportBtn, "click", lang.hitch(this, this._onDownloadClick)));
      this.own(on(this.refreshReportBtn, "click", lang.hitch(this, this._refreshReportPanel)));
      contentPane = query(".contentPane", this.map.infoWindow.domNode);
      if (contentPane && contentPane.length > 0) {
        contentPane = contentPane[0];
        this.own(on(contentPane, "click", lang.hitch(this, function (evt) {
          if (domClass.contains(this.aoiLabelContainer, "esriCTHidden")) {
            if (evt.target.hasAttribute("data-index") && evt.target.hasAttribute("data-source-index")) {
              this.backButtonDiv.click();
            }
          }
        })));
      }
    },

    /**
     * This function is to refresh the report panel
     * @memberOf Screening/Widget
     */
    _refreshReportPanel: function () {
      this._isReportGenerated = false;
      this._onReportTabClick();
    },

    /**
     * This function is to set maximum height of the AOI tools content containers
     * @memberOf Screening/Widget
     */
    _setMaxHeightOfAOIWidgetContainer: function () {
      var jimuPanelContent, jimuPanelContentInfo, jimuPanelHeight,
        jimuTabHeight, aoiButtonHeight, widgetAndBufferSeparatorHeight,
        aoiBufferChangeParentContainerHeight,
        maxHeightOfAOIWidgetContainer, aoiClearButtonContainerHeight,
        bufferDistanceAndClearAOISeparatorLine;
      // jimu panel content
      jimuPanelContent = this.domNode.parentElement;
      if (!jimuPanelContent) {
        return;
      }
      jimuPanelContentInfo = domStyle.getComputedStyle(
        jimuPanelContent);
      jimuPanelHeight = jimuPanelContentInfo.height;
      jimuPanelHeight = parseInt(jimuPanelHeight, 10);

      jimuTabHeight = 30;
      aoiButtonHeight = 32;
      widgetAndBufferSeparatorHeight = 22;
      aoiBufferChangeParentContainerHeight = 60;
      bufferDistanceAndClearAOISeparatorLine = 22;
      aoiClearButtonContainerHeight = 60;

      // Max height of widget container
      maxHeightOfAOIWidgetContainer = (jimuPanelHeight - (
        jimuTabHeight + aoiButtonHeight +
        widgetAndBufferSeparatorHeight +
        aoiBufferChangeParentContainerHeight +
        bufferDistanceAndClearAOISeparatorLine +
        aoiClearButtonContainerHeight + 25));
      maxHeightOfAOIWidgetContainer = maxHeightOfAOIWidgetContainer +
        "px";
      domStyle.set(this.placenameWidgetContainer, "max-height",
        maxHeightOfAOIWidgetContainer);
      domStyle.set(this.drawToolWidgetContainer, "max-height",
        maxHeightOfAOIWidgetContainer);
      domStyle.set(this.shapefileWidgetContainer, "max-height",
        maxHeightOfAOIWidgetContainer);
      domStyle.set(this.coordinateWidgetContainer, "max-height",
        maxHeightOfAOIWidgetContainer);
    },

    /**
     * This function is to set the max height of impact summary report
     * @memberOf Screening/Widget
     */
    _setMaxHeightOfImpactSummaryReportContainer: function () {
      var jimuPanelContent, jimuPanelContentInfo, jimuPanelHeight, shapeFileContent = 0,
        componentHeight;
      // jimu panel height
      jimuPanelContent = this.domNode.parentElement;
      if (!jimuPanelContent) {
        return;
      }
      jimuPanelContentInfo = domStyle.getComputedStyle(jimuPanelContent);
      jimuPanelHeight = jimuPanelContentInfo.height;
      jimuPanelHeight = parseInt(jimuPanelHeight, 10);
      if (this.config.allowShapefilesUpload) {
        shapeFileContent = this.uploadShapefileAnalysisTableContainer.clientHeight;
      }
      //aoi/report tab + back button parent + print/download icon + shapeFile container + Extra
      componentHeight = 30 + 20 + 35 + shapeFileContent + 20;
      domStyle.set(this.impactSummaryReportContainer, "height",
        jimuPanelHeight - componentHeight + "px");
    },

    /**
     * This function is to show placename tab selected and show its content
     * @memberOf Screening/Widget
     */
    _onPlacenameButtonClick: function () {
      if (domClass.contains(this.placenameWidgetContainer,
        "esriCTHidden")) {
        // Show placename panel
        this._showActiveToolPanel("placename");
      }
      if (this._drawTool) {
        this._drawTool.deactivateTools();
      }
      if (this._coordinatesTool) {
        this._coordinatesTool.deactivateLocateIcon();
      }
    },

    /**
     * This function is to show draw tool tab selected and show its content
     * @memberOf Screening/Widget
     */
    _onDrawToolsButtonClick: function () {
      if (domClass.contains(this.drawToolWidgetContainer,
        "esriCTHidden")) {
        // Show draw tool panel
        this._showActiveToolPanel("drawTool");
        if (this._coordinatesTool) {
          this._coordinatesTool.deactivateLocateIcon();
        }
      }
    },

    /**
     * This function is to show shapefile tab selected and show its content
     * @memberOf Screening/Widget
     */
    _onShapefileButtonClick: function () {
      if (domClass.contains(this.shapefileWidgetContainer,
        "esriCTHidden")) {
        // Show shapefile panel
        this._showActiveToolPanel("shapefile");
      }
      if (this._drawTool) {
        this._drawTool.deactivateTools();
      }
      if (this._coordinatesTool) {
        this._coordinatesTool.deactivateLocateIcon();
      }
    },

    /**
     * This function is to show coordinates tab selected and show its content
     * @memberOf Screening/Widget
     */
    _onCoordinatesButtonClick: function () {
      if (domClass.contains(this.coordinateWidgetContainer,
        "esriCTHidden")) {
        // Show coordinates panel
        this._showActiveToolPanel("coordinates");
      }
      if (this._drawTool) {
        this._drawTool.deactivateTools();
      }
    },

    /**
     * This function is to show active panel
     * @param{string} contains name of the active AOI tool
     * @memberOf Screening/Widget
     */
    _showActiveToolPanel: function (toolName) {
      //first hide/deselect the prev tool and panel
      this._deSelectPreviousAOIButton();
      this._hideAllWidgetContainers();
      //show current tool and its panel
      this._currentActiveTool = toolName;
      switch (toolName) {
        case "placename": // If toolName is placename
          domClass.add(this.placenameButton, "esriCTAOIButtonSelected");
          domClass.replace(this.placenameWidgetContainer, "esriCTVisible", "esriCTHidden");
          break;
        case "drawTool": // If toolName is drawTool
          domClass.add(this.drawToolsButton, "esriCTAOIButtonSelected");
          domClass.replace(this.drawToolWidgetContainer, "esriCTVisible", "esriCTHidden");
          break;
        case "shapefile": // If toolName is shapefile
          domClass.add(this.shapefileButton, "esriCTAOIButtonSelected");
          domClass.replace(this.shapefileWidgetContainer, "esriCTVisible", "esriCTHidden");
          break;
        case "coordinates": // If toolName is coordinates
          domClass.add(this.coordinatesButton, "esriCTAOIButtonSelected");
          domClass.replace(this.coordinateWidgetContainer, "esriCTVisible", "esriCTHidden");
          break;
        default:
          break;
      }
    },

    /**
     * This function is to deselect the last tab selected
     * @memberOf Screening/Widget
     */
    _deSelectPreviousAOIButton: function () {
      var selectedAOIButton;
      selectedAOIButton = query(".esriCTAOIButtonSelected", this.aoiButtonParentContainer);
      if (selectedAOIButton && selectedAOIButton[0]) {
        domClass.remove(selectedAOIButton[0],
          "esriCTAOIButtonSelected");
      }
    },

    /**
     * This function is to hide all widget containers
     * @memberOf Screening/Widget
     */
    _hideAllWidgetContainers: function () {
      var aoiWidgetsContainerArr, i;
      aoiWidgetsContainerArr = this.aoiWidgetParentContainer.children;
      for (i = 0; i < aoiWidgetsContainerArr.length; i++) {
        if (domClass.contains(aoiWidgetsContainerArr[i],
          "esriCTVisible")) {
          domClass.replace(aoiWidgetsContainerArr[i], "esriCTHidden",
            "esriCTVisible");
        }
      }
    },

    /**
     * This is callback function for report tab click event
     * @memberOf Screening/Widget
     */
    _onReportTabClick: function () {
      var aoiArea, typeOfGraphics, filteredGraphics;
      //Deactivate draw and select tool on click of reports tab
      if (this._drawTool) {
        this._drawTool.deactivateTools();
      }
      //get geodesic Area of AOI geometry and display according to selected unit
      typeOfGraphics = this._getAOIGeometriesInfo();
      if (typeOfGraphics === "AllPolygons" || typeOfGraphics === "AOIGraphics") {
        aoiArea =
          geometryUtils.getAreaOfGeometry(this._getUnionGeometry(this._aoiGraphicsLayer.graphics));
        this._calculateSelectedUnitAOIArea(aoiArea.squareFeet, "polygon",
          this.aoiFeetUnitAreaContainer, "Feet");
        this._calculateSelectedUnitAOIArea(aoiArea.acres, "polygon",
          this.aoiMilesUnitAreaContainer, "Miles");
        this._calculateSelectedUnitAOIArea(aoiArea.squareMeters, "polygon",
          this.aoiMetersUnitAreaContainer, "Meters");
        this._calculateSelectedUnitAOIArea(aoiArea.squareKilometer, "polygon",
          this.aoiKilometersUnitAreaContainer, "Kilometers");
        this._calculateSelectedUnitAOIArea(aoiArea.hectares, "polygon",
          this.aoiHectaresUnitAreaContainer, "Hectares");
      } else if (typeOfGraphics === "AllLines") {
        if (this._currentActiveTool === "coordinates") {
          filteredGraphics = this._getFilteredLineGraphics();
        } else {
          filteredGraphics = this._drawnOrSelectedGraphicsLayer.graphics;
        }
        aoiArea = geometryUtils.getLengthOfGeometry(
          this._getUnionGeometry(filteredGraphics));
        this._calculateSelectedUnitAOIArea(aoiArea.feet, "line",
          this.aoiFeetUnitAreaContainer, "Feet");
        this._calculateSelectedUnitAOIArea(aoiArea.miles, "line",
          this.aoiMilesUnitAreaContainer, "Miles");
        this._calculateSelectedUnitAOIArea(aoiArea.meters, "line",
          this.aoiMetersUnitAreaContainer, "Meters");
        this._calculateSelectedUnitAOIArea(aoiArea.kilometers, "line",
          this.aoiKilometersUnitAreaContainer, "Kilometers");
        this._calculateSelectedUnitAOIArea(aoiArea.kilometers, "line",
          this.aoiHectaresUnitAreaContainer, "Hectares");
      } else {
        domAttr.set(this.aoiFeetUnitAreaContainer, "innerHTML", "");
        domAttr.set(this.aoiMilesUnitAreaContainer, "innerHTML", "");
        domAttr.set(this.aoiMetersUnitAreaContainer, "innerHTML", "");
        domAttr.set(this.aoiKilometersUnitAreaContainer, "innerHTML", "");
        domAttr.set(this.aoiHectaresUnitAreaContainer, "innerHTML", "");
      }
      //Check if new report is generated and accordingly process report tab
      if (!this._isReportGenerated) {
        if (this._drawTool) {
          this._drawTool.clearAllSelections();
        }
        this._toggleReportTabButtons(false);
        this._highlightGraphicsLayer.clear();
        this._uploadedShapefileGraphicsLayer.clear();
        this._initializeImpactSummaryReportWidget();
      }
      this._setMaxHeightOfImpactSummaryReportContainer();
    },

    /**
     * This function is used to get line geometry from mixed geometry
     * @memberOf Screening/Widget
     */
    _getFilteredLineGraphics: function () {
      var lineGraphicsArr;
      lineGraphicsArr = [];
      array.forEach(this._drawnOrSelectedGraphicsLayer.graphics,
        lang.hitch(this, function (graphics) {
          if (graphics.geometry.type === "polyline") {
            lineGraphicsArr.push(graphics);
          }
        }));
      return lineGraphicsArr;
    },

    /**
     * handle click event for download buttons
     * @memberOf Screening/Widget
     */
    _onDownloadClick: function (evt) {
      if (!domClass.contains(this.downloadReportBtn, "esriCTDownloadBtnDisabled")) {
        // Stop event from propagation
        evt.stopPropagation();
        evt.preventDefault();
        this._initDownloadWidget(evt);
      }
    },

    /**
     * This function is used to get index of array
     * @memberOf Screening/Widget
     */
    _getArrayIndex: function (arrayOfRows, arrayToBeSearched) {
      var i, j, current, matchedIndex = [];
      for (i = 0; i < arrayOfRows.length; ++i) {
        if (arrayToBeSearched.length === arrayOfRows[i].length) {
          current = arrayOfRows[i];
          j = 0;
          while (j < arrayToBeSearched.length && arrayToBeSearched[j] === current[j]) {
            ++j;
          }
          if (j === arrayToBeSearched.length) {
            matchedIndex.push(i);
          }
        }
      }
      return matchedIndex;
    },

    /**
     * This function is used to perform the aggregation of rows which contains same data
     * @memberOf Screening/Widget
     */
    getSum: function (arrayOfValues, arrayOfIndex) {
      var sum, filteredArr;
      //filter selected index
      if (arrayOfIndex && arrayOfIndex.length > 0) {
        filteredArr = array.filter(arrayOfValues, function (item, index) { // jshint unused: true
          return arrayOfIndex.indexOf(index) > -1;
        });
      } else {
        filteredArr = arrayOfValues;
      }
      //add values of filteredArr
      sum = filteredArr.reduce(function (prevValue, currentValue) {
        return prevValue + currentValue;
      }, 0);
      if (sum > 0.01) {
        return conversionUtils.honourPopupRounding(2, sum);
      } else {
        return sum;
      }
    },

    /**
     * This function is used to get the column title
     * @memberOf Screening/Widget
     */
    _getAggregatedColTitle: function (geometryType) {
      var colTitle;
      switch (geometryType) {
        case "esriGeometryPoint":
          colTitle = this.nls.reportsTab.featureCountText;
          break;
        case "esriGeometryPolyline":
          if (!domClass.contains(this.aoiFeetUnitAreaContainer, "esriCTHidden")) {
            colTitle = this.nls.reportsTab.featureLengthText +
              "(" + this._getAOIUnitForGeometry("Feet", geometryType) + ")";
          } else if (!domClass.contains(this.aoiMilesUnitAreaContainer, "esriCTHidden")) {
            colTitle = this.nls.reportsTab.featureLengthText +
              "(" + this._getAOIUnitForGeometry("Miles", geometryType) + ")";
          } else if (!domClass.contains(this.aoiMetersUnitAreaContainer, "esriCTHidden")) {
            colTitle = this.nls.reportsTab.featureLengthText +
              "(" + this._getAOIUnitForGeometry("Meters", geometryType) + ")";
          } else if (!domClass.contains(this.aoiKilometersUnitAreaContainer, "esriCTHidden")) {
            colTitle = this.nls.reportsTab.featureLengthText +
              "(" + this._getAOIUnitForGeometry("Kilometers", geometryType) + ")";
          } else if (!domClass.contains(this.aoiHectaresUnitAreaContainer, "esriCTHidden")) {
            colTitle = this.nls.reportsTab.featureLengthText +
              "(" + this._getAOIUnitForGeometry("Hectares", geometryType) + ")";
          }
          break;
        case "esriGeometryPolygon":
          if (!domClass.contains(this.aoiFeetUnitAreaContainer, "esriCTHidden")) {
            colTitle = this.nls.reportsTab.featureAreaText +
              "(" + this._getAOIUnitForGeometry("Feet", geometryType) + ")";
          } else if (!domClass.contains(this.aoiMilesUnitAreaContainer, "esriCTHidden")) {
            colTitle = this.nls.reportsTab.featureAreaText +
              "(" + this._getAOIUnitForGeometry("Miles", geometryType) + ")";
          } else if (!domClass.contains(this.aoiMetersUnitAreaContainer, "esriCTHidden")) {
            colTitle = this.nls.reportsTab.featureAreaText +
              "(" + this._getAOIUnitForGeometry("Meters", geometryType) + ")";
          } else if (!domClass.contains(this.aoiKilometersUnitAreaContainer, "esriCTHidden")) {
            colTitle = this.nls.reportsTab.featureAreaText +
              "(" + this._getAOIUnitForGeometry("Kilometers", geometryType) + ")";
          } else if (!domClass.contains(this.aoiHectaresUnitAreaContainer, "esriCTHidden")) {
            colTitle = this.nls.reportsTab.featureAreaText +
              "(" + this._getAOIUnitForGeometry("Hectares", geometryType) + ")";
          }
          break;
      }
      return colTitle;
    },

    /**
     * function returns print template by filtering aoi & buffer graphicsLayers form legendLayers
     * @memberOf Screening/Widget
     */
    _getPrintTemplate: function () {
      var printTemplate, legendLayers = [];
      //Create print template
      printTemplate = new PrintTemplate();
      //Set legendAll property of print task so that it will fill allLayerslegend array
      this.reportDijit._printService.legendAll = true;
      //After calling this function allLayerslegend is filled by print task
      this.reportDijit._printService._getPrintDefinition(this.map, printTemplate);
      //Iterate through all legends layer and skip aoi, buffer & highlight graphics layer
      array.forEach(this.reportDijit._printService.allLayerslegend,
        lang.hitch(this, function (legendLayer) {
          var newLayer;
          if (legendLayer.id !== this._aoiGraphicsLayer.id &&
            legendLayer.id !== this._drawnOrSelectedGraphicsLayer.id &&
            legendLayer.id !== this._highlightGraphicsLayer.id) {
            newLayer = new LegendLayer();
            newLayer.layerId = legendLayer.id;
            if (legendLayer.subLayerIds) {
              newLayer.subLayerIds = legendLayer.subLayerIds;
            }
            legendLayers.push(newLayer);
          }
        }));
      //Reset it to false
      this.reportDijit._printService.legendAll = false;
      //set legend layers in layout option
      printTemplate.layoutOptions = {
        legendLayers: legendLayers,
        customTextElements: [{
          Date: ""
        }]
      };

      //set map layout according using report dijit method
      printTemplate = this.reportDijit.setMapLayout(printTemplate);
      if (this._isMapOnlyOptionAvailable) {
        printTemplate.layout = "MAP_ONLY";
      }
      printTemplate.preserveScale = false;
      printTemplate.showAttribution = true;
      printTemplate.format = "jpg";
      return printTemplate;
    },

    /**
     * Sorts the data based on last col values
     */
    _sortFeatureArray: function (a, b) {
      var lastIndex = a.length - 1;
      if (a[lastIndex] < b[lastIndex]) { return 1; }
      if (a[lastIndex] > b[lastIndex]) { return -1; }
      return 0;
    },

    /**
     * Sets N/A in last col if length/area is 0
     */
    _setNotApplicableRows: function (row) {
      var lastIndex = row.length - 1;
      if (row[lastIndex] < 0.01 && row[lastIndex] !== 0) {
        row[lastIndex] = " < " + dojoNumber.format(0.01) + " ";
      } else if (row[lastIndex] === 0) {
        row[lastIndex] = this.nls.reportsTab.notApplicableText;
      }
      return row;
    },

    /**
     * This function is used to get the date in the format that needs to be printed on report
     * @memberOf Screening/Widget
     */
    _getDate: function () {
      var dateValue;
      dateValue = locale.format(new Date(), {
        selector: "date",
        formatLength: "short",
        datePattern: "MMM d yyyy H:m:s z"
      });
      return dateValue;
    },

    /**
     * This function is used to add comma in area & length column after sorting.
     * @memberOf Screening/Widget
     */
    _addCommaToAreaAndLengthColumn: function (aggregatedData, geometryType) {
      array.forEach(aggregatedData.rows, lang.hitch(this, function (row, index) {
        var lastIndex;
        lastIndex = row.length - 1;
        if (!isNaN(aggregatedData.rows[index][lastIndex])) {
          if (geometryType === "esriGeometryPoint") {
            aggregatedData.rows[index][lastIndex] = dojoNumber.format(row[lastIndex]);
          } else {
            aggregatedData.rows[index][lastIndex] = dojoNumber.format(row[lastIndex], { places: 2 });
          }
        }
      }));
      return aggregatedData;
    },

    /**
     * This function is used to get the data needed for printing the report
     * @memberOf Screening/Widget
     */
    _getProcessedPrintData: function () {

      var dataForReport, areaOfInterestText, areaOfInterestValue, aoiTextTemplate,
        aoiText, printMap, id, unableToAnalyzeText, showUnableToAnalyzeText,
        summaryTableMeasurement;

      dataForReport = [];
      areaOfInterestText = this.nls.reportsTab.aoiInformationTitle;

      if (!domClass.contains(this.aoiFeetUnitAreaContainer, "esriCTHidden")) {
        areaOfInterestValue = this.aoiFeetUnitAreaContainer.innerHTML;
      } else if (!domClass.contains(this.aoiMilesUnitAreaContainer, "esriCTHidden")) {
        areaOfInterestValue = this.aoiMilesUnitAreaContainer.innerHTML;
      } else if (!domClass.contains(this.aoiMetersUnitAreaContainer, "esriCTHidden")) {
        areaOfInterestValue = this.aoiMetersUnitAreaContainer.innerHTML;
      } else if (!domClass.contains(this.aoiKilometersUnitAreaContainer, "esriCTHidden")) {
        areaOfInterestValue = this.aoiKilometersUnitAreaContainer.innerHTML;
      } else if (!domClass.contains(this.aoiHectaresUnitAreaContainer, "esriCTHidden")) {
        areaOfInterestValue = this.aoiHectaresUnitAreaContainer.innerHTML;
      }

      // Add AOI text on top of the report
      if (this.reportDijit.Date) {
        aoiTextTemplate =
          "<div class='esrCTAOIInfoDiv'>" +
          "<div class='esriAOITitle'>" + areaOfInterestText + "</div>" +
          "<div class='esriCTAOIArea'>" + areaOfInterestValue + "</div>" +
          "<div class='esriCTPrintLocaleDateDiv'>" +
          "<input type='text' class='esriCTLocaleDateInputTitle' value='" +
          this._getDate() + "'></div></div>";
      }
      else {
        aoiTextTemplate =
          "<div class='esrCTAOIInfoDiv'>" +
          "<div class='esriAOITitle'>" + areaOfInterestText + "</div>" +
          "<div class='esriCTAOIArea'>" + areaOfInterestValue + "</div></div>";
      }

      aoiText = {
        title: "",
        type: "html",
        data: aoiTextTemplate
      };
      dataForReport.push(aoiText);

      //add Map at the top in the report
      printMap = {
        addPageBreak: true,
        type: "map",
        map: this.map,
        printTemplate: this._getPrintTemplate()
      };
      dataForReport.push(printMap);
      dataForReport.push({
        "type": "note",
        "addPageBreak": false
      });

      //Impact summary table
      var impactSummaryTable = {
        title: this.nls.reportsTab.summaryReportTitle,
        addPageBreak: false,
        type: "table",
        data: {
          "showRowIndex": false,
          "maxNoOfCols": 4,
          "rows": [],
          "cols": [this.nls.common.name,
          this._getAggregatedColTitle("esriGeometryPoint"),
          this._getAggregatedColTitle("esriGeometryPolygon"),
          this._getAggregatedColTitle("esriGeometryPolyline")]
        }
      };

      for (id in this._printData) {
        var data, reportTable, matchedIndex, temp, aggregatedObj, aggregatedId, impactArray,
          impactSummaryAggregatedValue, selectedUnitValue;
        data = this._printData[id].info;
        impactArray = [];
        // no results found
        if (data.rows && data.rows.length > 0) {
          // fields off
          // configure check && layer invisible
          if (data.cols && data.cols.length > 0) {
            impactArray = [data.title];
            matchedIndex = [];
            aggregatedObj = {};
            for (var i = 0; i < data.rows.length; i++) {
              //if current index is not found in matched index then search array of that index
              if (matchedIndex.indexOf(i) < 0) {
                temp = this._getArrayIndex(data.rows, data.rows[i]);
                aggregatedObj[i] = temp;
                matchedIndex = matchedIndex.concat(temp);
              }
              //if all index are matched break loop
              if (matchedIndex.length === data.rows.length) {
                break;
              }
            }
            var aggregatedData = {
              "showRowIndex": true,
              "rows": [],
              "cols": lang.clone(data.cols)
            };
            //based on selected unit add col
            aggregatedData.cols.push(this._getAggregatedColTitle(this._printData[id].geometryType));

            for (aggregatedId in aggregatedObj) {
              var newRowInaggregatedData = lang.clone(data.rows[parseInt(aggregatedId, 10)]);
              selectedUnitValue = this.analysisUnitSelect.get('value');

              switch (selectedUnitValue) {
                case "Feet":
                  newRowInaggregatedData.push(
                    this.getSum(this._printData[id].feetUnitInfo,
                      aggregatedObj[parseInt(aggregatedId, 10)]));
                  break;
                case "Miles":
                  newRowInaggregatedData.push(
                    this.getSum(this._printData[id].milesUnitInfo,
                      aggregatedObj[parseInt(aggregatedId, 10)]));
                  break;
                case "Meters":
                  newRowInaggregatedData.push(
                    this.getSum(this._printData[id].metersUnitInfo,
                      aggregatedObj[parseInt(aggregatedId, 10)]));
                  break;
                case "Kilometers":
                  newRowInaggregatedData.push(
                    this.getSum(this._printData[id].kilometersUnitInfo,
                      aggregatedObj[parseInt(aggregatedId, 10)]));
                  break;
                case "Hectares":
                  newRowInaggregatedData.push(
                    this.getSum(this._printData[id].hectaresUnitInfo,
                      aggregatedObj[parseInt(aggregatedId, 10)]));
                  break;
              }
              aggregatedData.rows.push(newRowInaggregatedData);
            }

            if (aggregatedData.rows && aggregatedData.rows.length > 0) {
              /*sort data in descending order so that rows for which measurement are not to be shown
              will be shifted to bottom*/
              aggregatedData.rows = aggregatedData.rows.sort(this._sortFeatureArray);
              //if last col in row have value 0 show N/A
              aggregatedData.rows = array.map(aggregatedData.rows,
                lang.hitch(this, this._setNotApplicableRows));

              aggregatedData = this._addCommaToAreaAndLengthColumn(aggregatedData, this._printData[id].geometryType);

              reportTable = {
                title: data.title,
                addPageBreak: false,
                type: "table",
                data: aggregatedData
              };
              dataForReport.push(reportTable);

              switch (selectedUnitValue) {
                case "Feet":
                  if (this._printData[id].geometryType !== "esriGeometryPoint") {
                    impactSummaryAggregatedValue =
                      dojoNumber.format(this.getSum(this._printData[id].feetUnitInfo), { places: 2 });
                  } else {
                    impactSummaryAggregatedValue =
                      dojoNumber.format(this.getSum(this._printData[id].feetUnitInfo));
                  }
                  break;
                case "Miles":
                  if (this._printData[id].geometryType !== "esriGeometryPoint") {
                    impactSummaryAggregatedValue =
                      dojoNumber.format(this.getSum(this._printData[id].milesUnitInfo), { places: 2 });
                  } else {
                    impactSummaryAggregatedValue =
                      dojoNumber.format(this.getSum(this._printData[id].milesUnitInfo));
                  }
                  break;
                case "Meters":
                  if (this._printData[id].geometryType !== "esriGeometryPoint") {
                    impactSummaryAggregatedValue =
                      dojoNumber.format(this.getSum(this._printData[id].metersUnitInfo), { places: 2 });
                  } else {
                    impactSummaryAggregatedValue =
                      dojoNumber.format(this.getSum(this._printData[id].metersUnitInfo));
                  }
                  break;
                case "Kilometers":
                  if (this._printData[id].geometryType !== "esriGeometryPoint") {
                    impactSummaryAggregatedValue =
                      dojoNumber.format(this.getSum(this._printData[id].kilometersUnitInfo), { places: 2 });
                  } else {
                    impactSummaryAggregatedValue =
                      dojoNumber.format(this.getSum(this._printData[id].kilometersUnitInfo));
                  }
                  break;
                case "Hectares":
                  if (this._printData[id].geometryType !== "esriGeometryPoint") {
                    impactSummaryAggregatedValue =
                      dojoNumber.format(this.getSum(this._printData[id].hectaresUnitInfo), { places: 2 });
                  } else {
                    impactSummaryAggregatedValue =
                      dojoNumber.format(this.getSum(this._printData[id].hectaresUnitInfo));
                  }
                  break;
              }

              //if only point/line aoi then show N/A in area/length col
              if (this._aoiGraphicsLayer.graphics.length === 0) {
                summaryTableMeasurement = this.nls.reportsTab.notApplicableText;
              } else {
                if (impactSummaryAggregatedValue < 0.01 && impactSummaryAggregatedValue !== 0) {
                  summaryTableMeasurement = " < " + dojoNumber.format(0.01) + " ";
                } else {
                  summaryTableMeasurement = impactSummaryAggregatedValue;
                }
              }
              switch (this._printData[id].geometryType) {
                case "esriGeometryPoint":
                  impactArray = impactArray.concat(
                    impactSummaryAggregatedValue, this.nls.reportsTab.notApplicableText,
                    this.nls.reportsTab.notApplicableText);
                  break;
                case "esriGeometryPolygon":
                  impactArray = impactArray.concat(
                    this._printData[id].featureCount, summaryTableMeasurement,
                    this.nls.reportsTab.notApplicableText);
                  break;
                case "esriGeometryPolyline":
                  impactArray = impactArray.concat(
                    this._printData[id].featureCount, this.nls.reportsTab.notApplicableText,
                    summaryTableMeasurement);
                  break;
              }
            }
          }
        } else {
          impactArray = [data.title];
          //check if layer is not analyzed
          if (this._printData[id].isExceedingMaxRecordCount) {
            showUnableToAnalyzeText = true;
            //show * in layer title if exceeding max records
            impactArray[0] += " *";
            //in case of unable to analyze show blank in area/length col
            impactSummaryAggregatedValue = "";
          } else {
            //if only point/line aoi then show N/A in area/length col
            if (this._aoiGraphicsLayer.graphics.length === 0) {
              impactSummaryAggregatedValue = this.nls.reportsTab.notApplicableText;
            } else {
              impactSummaryAggregatedValue = 0;
            }
          }
          switch (this._printData[id].geometryType) {
            case "esriGeometryPoint":
              impactArray = impactArray.concat(this._printData[id].featureCount,
                this.nls.reportsTab.notApplicableText, this.nls.reportsTab.notApplicableText);
              break;
            case "esriGeometryPolygon":
              impactArray = impactArray.concat(this._printData[id].featureCount,
                impactSummaryAggregatedValue, this.nls.reportsTab.notApplicableText);
              break;
            case "esriGeometryPolyline":
              impactArray = impactArray.concat(this._printData[id].featureCount,
                this.nls.reportsTab.notApplicableText, impactSummaryAggregatedValue);
              break;
          }
        }
        if (impactArray && impactArray.length > 0) {
          impactSummaryTable.data.rows.push(impactArray);
        }
      }
      //add impact summary table after map in report
      if (showUnableToAnalyzeText) {
        // Add unable to analyze text in report only if layer(s) not analyzed
        unableToAnalyzeText = {
          title: "",
          type: "html",
          data: "<div class='esriCTUnableToAnalyzeText'> * " +
            this.nls.reportsTab.unableToAnalyzeText + "</div>"
        };
        dataForReport.splice(3, 0, impactSummaryTable, unableToAnalyzeText);
      } else {
        dataForReport.splice(3, 0, impactSummaryTable);
      }
      return dataForReport;
    },

    /**
     * This function is used to initialize the report dijit
     * @memberOf Screening/Widget
     */
    _initReportDijit: function () {
      var logo, reportStylesheet;
      if (this.config.reportSettings && this.config.reportSettings.printTaskURL) {
        if (this.config.reportSettings.logo) {
          logo =
            jimuUtils.processUrlInWidgetConfig(this.config.reportSettings.logo, this.folderUrl);
        } else {
          logo = this.folderUrl + "/images/default-logo.png";
        }
        //set override style for report dijit
        reportStylesheet = this.folderUrl + "/css/reportDijitOverrides.css";
        //Create reportDijit
        this.reportDijit = new reportDijit({
          reportLogo: logo,
          appConfig: this.appConfig,
          footNotes: this.config.reportSettings.footnote,
          printTaskUrl: this.config.reportSettings.printTaskURL,
          reportLayout: {
            "pageSize": PageUtils.PageSizes.Letter,
            "orientation": PageUtils.Orientation.Portrait
          },
          styleSheets: [reportStylesheet],
          styleText: this._getStyleTextForReport(),
          "maxNoOfCols": 5,
          Date: true
        });
        this.own(on(this.reportDijit, "reportError", lang.hitch(this, function () {
          this._showMessage(this.nls.reportsTab.errorInPrintingReport);
        })));
      }
    },

    /**
     * This function is used to get the style text for reports
     * @memberOf Screening/Widget
     */
    _getStyleTextForReport: function () {
      var styleText;
      styleText = ".esriCTTable th { background-color: " +
        this.config.reportSettings.columnTitleColor +
        "; color:" + this.getTextColor(this.config.reportSettings.columnTitleColor) + ";}";

      //Don't show any background to notes title
      styleText += " .esriCTNotesTitle { background-color: transparent;}";
      return styleText;
    },

    /**
     * This function counts the perceptive luminance and returns color as black/white
     * @memberOf Screening/Widget
     */
    getTextColor: function (configuredColor) {
      var configuredColorObject, rgbColor, a;
      configuredColorObject = new Colors(configuredColor);
      rgbColor = configuredColorObject.toRgb();
      //Count the perceptive luminance and based on that return text color as black or white
      a = 1 - (0.299 * rgbColor[0] + 0.587 * rgbColor[1] + 0.114 * rgbColor[2]) / 255;
      return (a < 0.5) ? '#000' : '#fff';
    },

    /**
     * This function is used to add graphics layer on map in which only AOI will be added
     * @memberOf Screening/Widget
     */
    _createAndAddGraphicsLayer: function () {
      this._aoiGraphicsLayer = this._createNewGraphicsLayer("aoiGraphicsLayer");
      this._drawnOrSelectedGraphicsLayer =
        this._createNewGraphicsLayer("drawnOrSelectedGraphicsLayer");
      this._toleranceGraphicsLayer =
        this._createNewGraphicsLayer("toleranceGraphicsLayer");
      this._uploadedShapefileGraphicsLayer =
        this._createNewGraphicsLayer("uploadedShapefileGraphicsLayer");
      this._highlightGraphicsLayer =
        this._createNewGraphicsLayer("highlightGraphicsLayer");
    },

    /**
     * This function is used to add graphics layer on map in.
     * It also removes the layer which already exist on map.
     * @memberOf Screening/Widget
     */
    _createNewGraphicsLayer: function (layerId) {
      var newGraphicsLayer, layerProperties = {};
      if (layerId) {
        //if layer exist on map remove it
        if (this.map._layers[layerId]) {
          this.map.removeLayer(this.map._layers[layerId]);
        }
        //set id in layerProperties
        layerProperties = { id: layerId + this.id };
      }
      newGraphicsLayer = new GraphicsLayer(layerProperties);
      this.map.addLayer(newGraphicsLayer);
      return newGraphicsLayer;
    },

    /**
     * This function is to display configured AOI tool tab
     * @memberOf Screening/Widget
     */
    _displayConfiguredWidgetAOIButton: function () {
      var showPanel, aoiButtonCount;
      aoiButtonCount = 0;
      if (this.config.showPlacenameWidget) {
        domClass.replace(this.placenameButton, "esriCTDisplayTableCell", "esriCTHidden");
        showPanel = "placename";
        aoiButtonCount++;
        this._initializePlacenameWidget();
      }
      if (this.config.showDrawToolsWidget) {
        domClass.replace(this.drawToolsButton, "esriCTDisplayTableCell", "esriCTHidden");
        if (!showPanel) {
          showPanel = "drawTool";
        }
        aoiButtonCount++;
        this._initializeDrawToolsWidget();
      }
      if (this.config.showShapefileWidget) {
        domClass.replace(this.shapefileButton, "esriCTDisplayTableCell", "esriCTHidden");
        if (!showPanel) {
          showPanel = "shapefile";
        }
        aoiButtonCount++;
        this._initializeShapefileWidget();
      }
      if (this.config.showCoordinatesWidget) {
        domClass.replace(this.coordinatesButton, "esriCTDisplayTableCell", "esriCTHidden");
        if (!showPanel) {
          showPanel = "coordinates";
        }
        aoiButtonCount++;
        this._initializeCoordinatesWidget();
      }
      //if only one aoi tool is available then don't show the tool buttons
      if (aoiButtonCount === 1) {
        domClass.add(this.aoiButtonParentContainer, "esriCTHidden");
      }
      //show selected tool and its panel
      this._showActiveToolPanel(showPanel);
    },

    /**
     * This function will initialize placename custom widget
     * @memberOf Screening/Widget
     */
    _initializePlacenameWidget: function () {
      // Initializing 'placename' AOI tool widget
      this._placenameTool = new Placename({
        nls: this.nls,
        config: this.config,
        map: this.map,
        appConfig: this.appConfig,
        widgetMainContainer: this.widgetMainContainer,
        aoiTabParentContainer: this.aoiTabParentContainer
      }, domConstruct.create("div", {}, this.placenameWidgetContainer));
      this.own(on(this._placenameTool, "onSearchComplete",
        lang.hitch(this, this.onReceiveSearchData)));
      this._placenameTool.onWindowResize();
    },

    /**
     * This function will initialize draw tool custom widget
     * @memberOf Screening/Widget
     */
    _initializeDrawToolsWidget: function () {
      // Initializing 'shapefile' AOI tool widget
      this._drawTool = new DrawTool({
        nls: this.nls,
        config: this.config,
        map: this.map,
        loadingIndicator: this._loadingIndicator,
        pointSymbol: jsonUtils.fromJson(this.config.drawToolSymbology.point),
        polylineSymbol: jsonUtils.fromJson(this.config.drawToolSymbology.polyline),
        polygonSymbol: jsonUtils.fromJson(this.config.drawToolSymbology.polygon),
        _drawnOrSelectedGraphicsLayer: this._drawnOrSelectedGraphicsLayer,
        filteredLayerObj: this._filteredLayerObj,
        layerInfoArray: this._layerInfoArray
      }, domConstruct.create("div", {}, this.drawToolWidgetContainer));
      this.own(on(this._drawTool, "onDrawComplete", lang.hitch(this, function (graphics) {
        this._initToCreateAOIBuffer(graphics);
      })));
      this.own(on(this._drawTool, "onSelectionComplete", lang.hitch(this, function (graphics) {
        var polygonFeatureArr, filteredGraphicsArr;
        polygonFeatureArr = graphics.filter(function (item) {
          return item.geometry.type === "polygon";
        });
        if (polygonFeatureArr.length > 0) {
          filteredGraphicsArr = graphics.filter(function (item) {
            return item.geometry.type !== "polygon";
          });
          if (!filteredGraphicsArr) {
            filteredGraphicsArr = [];
          }
          var deferredArr;
          deferredArr = [];
          array.forEach(polygonFeatureArr, lang.hitch(this, function (polygonFeature) {
            var queryObj, queryTask;
            queryObj = new Query();
            queryObj.outFields = ["*"];
            queryObj.returnGeometry = true;
            queryObj.objectIds =
              [polygonFeature.attributes[polygonFeature.getLayer().objectIdField]];
            queryObj.outSpatialReference = this.map.spatialReference;
            queryTask = new QueryTask(polygonFeature.getLayer().url);
            deferredArr.push(queryTask.execute(queryObj));
          }));
          var defList = new DeferredList(deferredArr);
          defList.then(lang.hitch(this, function (defResults) {
            array.forEach(defResults, lang.hitch(this, function (defResult) {
              filteredGraphicsArr.push(defResult[1].features[0]);
            }));
            this._initToCreateAOIBuffer(filteredGraphicsArr);
          }), lang.hitch(this, function () {
            this.loadingIndicator.hide();
          }));
        } else {
          this._initToCreateAOIBuffer(graphics);
        }
      })));
      this.own(on(this._drawTool, "clearExistingSelection", lang.hitch(this, function () {
        this._clearAOI();
      })));
    },

    /**
     * This function will initialize shapefile custom widget
     * @memberOf Screening/Widget
     */
    _initializeShapefileWidget: function () {
      // Initializing 'shapefile' AOI tool widget
      var shapefile = new Shapefile({
        nls: this.nls,
        config: this.config,
        map: this.map,
        label: this.nls.shapefileWidget.shapefileLabel,
        loadingIndicator: this._loadingIndicator
      }, domConstruct.create("div", {}, this.shapefileWidgetContainer));
      this.own(on(shapefile, "onShapefileUpload", lang.hitch(this,
        function (layer) {
          if (layer.graphics && layer.graphics.length > 0) {
            this._initToCreateAOIBuffer(layer.graphics);
          } else {
            this._showMessage(this.nls.noGraphicsShapefile);
          }
        })));
    },

    /**
     * This function is used to get the formatted field obj
     * @memberOf Screening/Widget
     */
    _getFormattedFieldObj: function (fieldsArr) {
      var formattedFieldObj;
      formattedFieldObj = {};
      array.forEach(fieldsArr, lang.hitch(this, function (field) {
        formattedFieldObj[field.name] = field;
      }));
      return formattedFieldObj;
    },

    /**
     * This function is used to initialize the shapefile widget needed for
     * on-the-fly shapefile analysis
     * @memberOf Screening/Widget
     */
    _initShapeFileForAnalysis: function () {
      //first show the container
      domClass.remove(this.uploadShapefileAnalysisTableContainer, "esriCTHidden");
      var shapefile = new Shapefile({
        nls: this.nls,
        config: this.config,
        map: this.map,
        label: this.nls.reportsTab.uploadShapefileForAnalysisText,
        loadingIndicator: this._loadingIndicator
      }, domConstruct.create("div", {}, this.uploadShapefileAnalysisTableContainer));
      this.own(on(shapefile, "onShapefileUpload",
        lang.hitch(this, function (layer) {
          var completeAOIGeometry, completeToleranceGeometry, allPointGeometries;
          if (layer.graphics && layer.graphics.length > 0) {
            this._addUploadedShapefileGraphicsOnMap(layer.graphics);
            this.map.setExtent(layer.fullExtent);
            allPointGeometries = this._getUnionGeometry(this._getOnlyPointGraphics());
            completeToleranceGeometry =
              this._getUnionGeometry(this._toleranceGraphicsLayer.graphics);
            completeAOIGeometry = this._getUnionGeometry(this._aoiGraphicsLayer.graphics);
            //set id to the layer as it will be required to access print obj
            layer.id = "ShapeFile_" + Date.now();
            var impactSummaryReportObj = new ImpactSummaryReport({
              id: layer.id,
              nls: this.nls,
              isFeatureCollectionLayer: true,
              config: this.config,
              appConfig: this.appConfig,
              map: this.map,
              featureLayer: layer,
              aoiGraphicsLayer: this._aoiGraphicsLayer,
              configuredField: this._getFormattedFieldObj(layer.fields),
              configuredLayerLabel: layer.name,
              maxFeaturesForAnalysis: this.config.maxFeaturesForAnalysis,
              layerInfosObj: this.layerInfosObj,
              highlightGraphicsLayer: this._highlightGraphicsLayer
            });
            //place uploaded shapeFile layer at top in the list
            domConstruct.place(impactSummaryReportObj.domNode,
              this.impactSummaryReportContainer, 0);
            this.own(on(impactSummaryReportObj, "printDataUpdated",
              lang.hitch(this, function (details) {
                this._printData[details.id].info = details.printData;
              })));
            impactSummaryReportObj.generateReport(
              completeAOIGeometry, completeToleranceGeometry, allPointGeometries).then(
                lang.hitch(this, function (layerDetails) {
                  var newPrintDataObject = {};
                  //to add newly added shapeFile layer at top mixin and reassign in the _printData
                  newPrintDataObject[layerDetails.id] = lang.hitch(layerDetails.printInfo);
                  this._printData = lang.mixin(newPrintDataObject, this._printData);
                  //set download features details
                  this._downloadFeatureDetailsObj[layerDetails.id] = layerDetails.features;
                  //Create array and append newly added shape file details
                  if (!this._newShapeFileAnalysisArr) {
                    this._newShapeFileAnalysisArr = [];
                  }
                  this._newShapeFileAnalysisArr.push({
                    allowDownload: true,
                    downloadingFileOption: ["csv"],
                    id: layer.id,
                    layerName: layer.name,
                    url: null,
                    isShapeFile: true,
                    layer: layer
                  });
                  //if print icon is disabled enable if features
                  //are intersecting in uploaded shapefile
                  if (domClass.contains(this.printButton, "esriCTPrintBtnDisabled") &&
                    layerDetails.features.length > 0) {
                    domClass.remove(this.printButton, "esriCTPrintBtnDisabled");
                    this.printIconButton.set('disabled', false);
                  }
                }));
          } else {
            this._showMessage(this.nls.noGraphicsShapefile);
          }
        })));
    },

    /**
     * This function will initialize coordinate custom widget
     * @memberOf Screening/Widget
     */
    _initializeCoordinatesWidget: function () {
      // Initializing 'coordinates' AOI tool widget
      this._coordinatesTool = new Coordinates({
        nls: this.nls,
        config: this.config,
        map: this.map,
        appConfig: this.appConfig,
        loadingIndicator: this._loadingIndicator,
        widgetMainContainer: this.widgetMainContainer,
        isSearchWidgetConfigured: this._isSearchWidgetConfigured,
        drawnOrSelectedGraphicsLayer: this._drawnOrSelectedGraphicsLayer,
        geometryService: this._geometryService,
        aoiGraphicsLayer: this._aoiGraphicsLayer,
        uploadedShapefileGraphicsLayer: this._uploadedShapefileGraphicsLayer
      }, domConstruct.create("div", {}, this.coordinateWidgetContainer));
      this.own(on(this._coordinatesTool, "onSearchComplete",
        lang.hitch(this, this.onReceiveSearchData)));
      this.own(on(this._coordinatesTool, "redrawAOI", lang.hitch(this, this._validateAndAddAOI)));
      this.own(on(this._coordinatesTool, "enableClearAOIButton",
        lang.hitch(this, this._enableClearAOIButton)));
      this.own(on(this._coordinatesTool, "enableZoomIcon",
        lang.hitch(this, this._enableZoomIcon)));
    },

    /**
     * This function will initiate the process to create AOI buffer
     * param{object} contains keys as listed below,,
     * 1. 'drawnOrSelectedGraphics an array of AOI features
     * @memberOf Screening/Widget
     */
    _initToCreateAOIBuffer: function (graphics) {
      // Clear previously drawn graphics from the graphics layers
      // Clear AOI graphics
      this._aoiGraphicsLayer.clear();
      this._drawnOrSelectedGraphicsLayer.clear();
      this._toleranceGraphicsLayer.clear();
      this._uploadedShapefileGraphicsLayer.clear();
      this._highlightGraphicsLayer.clear();
      // Clear layer selections
      if (this._drawTool && !(this._drawTool.selectTool.isActive())) {
        this._drawTool.clearAllSelections();
      }
      // Reset start point
      if (this._coordinatesTool && this._currentActiveTool !== "coordinates") {
        this._coordinatesTool.resetCoordinatesWidgetValue();
      }
      // Function to add reference geometry graphics for AOI
      this._addDrawnOrSelectedGraphicsOnMap(graphics);
      if (!this._validateAndAddAOI()) {
        //as AOI is invalid we will not have AOI/Buffer geometry, we will only have drawn/selected
        //graphics so set the extent to drawn or selected graphics layer
        this._setExtentToGraphicsLayer(this._drawnOrSelectedGraphicsLayer);
      }
    },

    /**
     * This function will return only drawn point geometries if tolerance is set to zero
     * @memberOf Screening/Widget
     */
    _getOnlyPointGraphics: function () {
      var pointGraphics = [];
      if (!this.config.searchTolerance) {
        pointGraphics = [];
        array.forEach(this._toleranceGraphicsLayer.graphics, lang.hitch(this, function (graphic) {
          if (graphic.geometry && graphic.geometry.type === "point") {
            pointGraphics.push(graphic);
          }
        }));
      }
      return pointGraphics;
    },

    /**
     * This function will create and add tolerance graphics for point and line geometries
     * @memberOf Screening/Widget
     */
    _createToleranceGraphic: function (pointLineGeometries) {
      var bufferParameters;
      this._toleranceGraphicsLayer.clear();
      //if search tolerance is not valid add point/lines to graphics layer
      if (!this.config.searchTolerance) {
        array.forEach(pointLineGeometries, lang.hitch(this, function (geometry) {
          if (geometry) {
            this._toleranceGraphicsLayer.add(new Graphic(geometry));
          }
        }));
        return;
      }
      // Initialize tolerance buffer parameter
      bufferParameters = new BufferParameters();
      bufferParameters.distances = [this.config.searchTolerance];
      bufferParameters.outSpatialReference = this.map.spatialReference;
      bufferParameters.unit = this._getBufferParameterUnit();
      bufferParameters.geometries = pointLineGeometries;
      // Show loading indicator
      this._loadingIndicator.show();
      // added timeout to show the loading indicator as on
      // buffering dense geometries UIThread was not getting updated
      setTimeout(lang.hitch(this, function () {
        // Get buffer geometry as per map's spatial reference
        this._doBufferGeometry(bufferParameters).then(lang.hitch(this,
          function (bufferGeometries) {
            if (bufferGeometries) {
              array.forEach(bufferGeometries, lang.hitch(this, function (geometry) {
                if (geometry) {
                  this._toleranceGraphicsLayer.add(new Graphic(geometry));
                }
              }));
            }
            // Hide loading indicator
            this._loadingIndicator.hide();
          }));
      }), 50);
    },

    /**
     * This function will return buffer parameter unit according to currently selected
     * search tolerance unit in config
     * @memberOf Screening/Widget
     */
    _getBufferParameterUnit: function () {
      if (this.config.areaUnits === "Feet" || this.config.areaUnits === "Miles") {
        return GeometryService.UNIT_FOOT;
      }
      else {
        return GeometryService.UNIT_METER;
      }
    },

    /**
     * This function will add and highlight drawn or selected graphics on map
     * param{object} contains keys as listed below,
     * 1. 'symbology' for the selected tab
     * @memberOf Screening/Widget
     */
    _addDrawnOrSelectedGraphicsOnMap: function (graphics) {
      // Loop through each graphic
      array.forEach(graphics, lang.hitch(this, function (graphic) {
        var newGraphic, symbol;
        if (graphic && graphic.geometry && graphic.geometry.type) {
          // Get symbol for current geometry type
          symbol = this._getSymbol(graphic.geometry.type);
          newGraphic = new Graphic(graphic.geometry, symbol);
          // Add graphic to which buffer will be drawn
          if (newGraphic && symbol) {
            this._drawnOrSelectedGraphicsLayer.add(newGraphic);
            this._enableClearAOIButton();
          }
          this._enableZoomIcon();
        }
      }));
    },

    /**
     * This function is used to add the uploaded shapefile graphics on map
     * @memberOf Screening/Widget
     */
    _addUploadedShapefileGraphicsOnMap: function (graphics) {
      array.forEach(graphics, lang.hitch(this, function (graphic) {
        var newGraphic, symbol;
        if (graphic && graphic.geometry && graphic.geometry.type) {
          symbol = this._getSymbol(graphic.geometry.type);
          newGraphic = new Graphic(graphic.geometry, symbol);
          if (newGraphic && symbol) {
            this._uploadedShapefileGraphicsLayer.add(newGraphic);
          }
        }
      }));
    },

    /**
     * This function will return symbol according to the geometry type
     * 1. 'geometryType' geometry type of the graphic
     * @memberOf Screening/Widget
     */
    _getSymbol: function (geometryType) {
      var symbol, symbology;
      // Fetch symbology for the selected tab
      // Symbology, either for placename OR draw tools OR shapefile OR coordinates
      symbology = this.config[this._currentActiveTool + "Symbology"];
      //in case of extents show polygon symbol and in case of multipoint show points
      if (geometryType === 'extent') {
        geometryType = "polygon";
      } else if (geometryType === 'multipoint') {
        geometryType = "point";
      }
      symbol = jsonUtils.fromJson(symbology[geometryType]);
      // Return symbol
      return symbol;
    },

    /**
     * This function will return buffered polygon geometry on the basis of map's spatial Reference
     * param{object} contains keys as listed below,
     * 1. 'bufferParameters' set of required parameters to get buffer geometry
     * @memberOf Screening/Widget
     */
    _doBufferGeometry: function (bufferParameters) {
      var bufferGeometry, deferred;
      deferred = new Deferred();
      if (this.map.spatialReference.isWebMercator() || this.map.spatialReference
        .wkid === 4326) {
        try {
          // If spatial reference is web mercator, do GEODESIC BUFFER
          bufferGeometry = GeometryEngine.geodesicBuffer(bufferParameters
            .geometries, bufferParameters.distances,
            bufferParameters.unit, true);
          deferred.resolve(bufferGeometry);
        }
        catch (err) {
          deferred.resolve(null);
        }
      } else {
        // If spatial reference is NON web mercator, do BUFFER
        this._geometryService.buffer(bufferParameters,
          // Callback for geodesic buffer
          lang.hitch(this, function (bufferGeometry) {
            deferred.resolve(bufferGeometry);
          }),
          // Error while buffer
          lang.hitch(this, function () {
            deferred.resolve(null);
          }));
      }
      // Return resolved deferred
      return deferred.promise;
    },

    /**
     * This function will set the default values for buffer inputs and handle the events
     * @memberOf Screening/Widget
     */
    _setBufferInputs: function () {
      this.bufferDistanceTextBox.set("trim", true);
      // Set constraint as min and max for buffer distance as per unit
      this.bufferDistanceTextBox.set("constraints", {
        "min": 0
      });
      //Set default value of the buffer distance
      this.bufferDistanceTextBox.set("value", this.config.defaultBufferDistance);
      this._bufferValue = this.bufferDistanceTextBox.value;
      //Set the default configured buffer unit
      this.bufferDistanceUnit.set("value", this.config.defaultBufferUnit);
      //Attach key press event and focus out on enter press
      this._attachBufferDistanceTextboxKeypressEvent();
      //Attach buffer distance/unit change event and update buffers
      this.own(on(this.bufferDistanceTextBox, "change",
        lang.hitch(this, this._validateBufferDistance)));
      this.own(on(this.bufferDistanceTextBox, "blur", lang.hitch(this, function () {
        this._validateBufferDistance(this.bufferDistanceTextBox.value);
        this._validateAndAddAOI();
      })));
      this.own(on(this.bufferDistanceUnit, "change", lang.hitch(this, this._validateAndAddAOI)));
    },

    /**
     * This function is used to reset buffer distance text-box to zero,
     * if its value is blank and mouse is clicked elsewhere.
     * @memberOf Screening/Widget
     */
    _validateBufferDistance: function (value) {
      if (isNaN(value) || (!this.bufferDistanceTextBox.isValid())) {
        this.bufferDistanceTextBox.set("value", 0);
      }
    },

    /**
     * This function initialize the download widget and creates tooltip
     * @memberOf Screening/Widget
     */
    _initDownloadWidget: function (evt) {
      var aoiGeometry, aoiGeometryArr, aoiGraphic, isPointOrLineAOI;
      isPointOrLineAOI = false;
      if (this._aoiGraphicsLayer.graphics.length === 0 &&
        this._toleranceGraphicsLayer.graphics.length > 0) {
        isPointOrLineAOI = true;
      }
      if (this._aoiGraphicsLayer.graphics.length > 0 &&
        this._toleranceGraphicsLayer.graphics.length > 0) {
        if (this.bufferDistanceTextBox.get('value') === 0) {
          isPointOrLineAOI = true;
        }
      }
      aoiGeometryArr = this._aoiGraphicsLayer.graphics;
      aoiGeometryArr = aoiGeometryArr.concat(this._toleranceGraphicsLayer.graphics);
      aoiGeometry = this._getUnionGeometry(aoiGeometryArr);
      aoiGraphic = new Graphic(aoiGeometry);
      if (!this.downloadWidgetInstance) {
        this.downloadWidgetInstance = new DownloadReport({
          config: this.config,
          position: evt,
          nls: this.nls,
          map: this.map,
          aoi: aoiGraphic,
          loadingIndicator: this._loadingIndicator,
          downloadFeatureDetailsObj: this._downloadFeatureDetailsObj,
          filterLayerObj: this._filteredLayerObj,
          iframeNode: this.iframeContainer,
          isAndroidDevice: this.isAndroid(),
          shapeFileLayerDetails: this._newShapeFileAnalysisArr,
          isPointOrLineAOI: isPointOrLineAOI,
          appConfig: this.appConfig,
          areaUnits: this.config.areaUnits
        });
        this.own(on(this.downloadWidgetInstance, "showMessage",
          lang.hitch(this, function (msg) {
            this._showMessage(msg);
          })));
        this.own(on(this.downloadWidgetInstance, "toggleReportTabButtons",
          lang.hitch(this, function (msg) {
            this._showMessage(msg);
          })));
        this.downloadWidgetInstance.startup();
      } else {
        //Just pass the updated evt coordinates
        this.downloadWidgetInstance.position = evt;
        this.downloadWidgetInstance.downloadFeatureDetailsObj =
          this._downloadFeatureDetailsObj;
        this.downloadWidgetInstance.checkFileForDownload();
        this.downloadWidgetInstance.aoi = aoiGraphic;
        if (this.downloadWidgetInstance.isTooltipDialogOpened) {
          this.downloadWidgetInstance.closePopup();
        } else {
          this.downloadWidgetInstance.openPopup();
        }
        //Update shapefile details in download widget
        this.downloadWidgetInstance.shapeFileLayerDetails = this._newShapeFileAnalysisArr;
        this.downloadWidgetInstance.isPointOrLineAOI = isPointOrLineAOI;
        //Update printData
        this.downloadWidgetInstance.printData = this._printData;
        //Update areaUnits
        this.downloadWidgetInstance.areaUnits = this.config.areaUnits;
      }
    },

    /**
     * This function will attach buffer distance text-box keypress event
     * @memberOf Screening/Widget
     */
    _attachBufferDistanceTextboxKeypressEvent: function () {
      var charOrCode;
      this.own(on(this.bufferDistanceTextBox, "keypress", lang.hitch(this,
        function (event) {
          charOrCode = event.charCode || event.keyCode;
          // Check for ENTER key
          if (charOrCode === keys.ENTER) {
            focusUtil.curNode.blur();
          }
        })));
    },

    /**
     * This function is to process adding valid AOI on map
     * param{object} contains keys as listed below,,
     * 1. 'drawnOrSelectedGraphics' array of reference graphics for creating AOI
     * @memberOf Screening/Widget
     */
    _validateAndAddAOI: function () {
      var i, graphics, isAOIValid, bufferedGeometryArray, pointLineGeometries;
      isAOIValid = true;
      bufferedGeometryArray = [];
      pointLineGeometries = [];
      // Clear layer selections
      if (this._drawTool && !(this._drawTool.selectTool.isActive())) {
        this._drawTool.clearAllSelections();
      }
      //if has valid drawn or selected graphics and valid buffer value
      if (this._drawnOrSelectedGraphicsLayer &&
        this._drawnOrSelectedGraphicsLayer.graphics &&
        this._drawnOrSelectedGraphicsLayer.graphics.length > 0) {
        graphics = this._drawnOrSelectedGraphicsLayer.graphics;
        // Show loading indicator
        this._loadingIndicator.show();
        // Loop through each feature
        for (i = 0; i < graphics.length; i++) {
          //if geometry is of type point/line add it in pointLineGeometries array
          if (graphics[i].geometry.type === "point" || graphics[i].geometry.type === "polyline") {
            pointLineGeometries.push(graphics[i].geometry);
          }
          // Simplify geometry if it is of type polygon
          if (graphics[i].geometry.type === "polygon") {
            graphics[i].geometry = GeometryEngine.simplify(
              graphics[i].geometry);
          }
          bufferedGeometryArray.push(graphics[i].geometry);
        }
        // If valid then draw the aoi/buffer based on buffer value not equal to 0
        if (isAOIValid) {
          //if has point/line geometries create tolerance graphics for them
          if (pointLineGeometries.length > 0) {
            this._createToleranceGraphic(pointLineGeometries);
          }
          if (!this.bufferDistanceTextBox.isValid() ||
            Number(this.bufferDistanceTextBox.value) === 0) {
            //As selected graphic is valid aoi(polygon) but the buffer value is zero,
            //add the graphics on aoi layer but don't set the AOI buffer symbology to it.
            this._drawAOIOnMap(bufferedGeometryArray, false);
          } else {
            this._drawAOIBuffer(bufferedGeometryArray);
          }
        } else {
          // Hide loading indicator
          this._loadingIndicator.hide();
        }
        return isAOIValid;
      } else {
        // Clear AOI graphics
        this._aoiGraphicsLayer.clear();
        // If buffer distance is 0 then clear AOI graphics and disable reports tab
        this._disableShowReportsButton();
      }
      return false;
    },

    /**
     * This function will draw AOI on map
     * 1. 'aoiGeometries' array of geometries to be buffered
     * @memberOf Screening/Widget
     */
    _drawAOIBuffer: function (aoiGeometries) {
      var bufferParameters;
      // Initialize buffer parameter
      bufferParameters = new BufferParameters();
      bufferParameters.distances = [this.bufferDistanceTextBox.value];
      bufferParameters.outSpatialReference = this.map.spatialReference;
      bufferParameters.unit = GeometryService[this.bufferDistanceUnit.value];
      bufferParameters.geometries = aoiGeometries;
      // Show loading indicator
      this._loadingIndicator.show();
      // added timeout to show the loading indicator as on
      // buffering dense geometries UIThread was not getting updated
      setTimeout(lang.hitch(this, function () {
        // Get buffer geometry as per map's spatial reference
        this._doBufferGeometry(bufferParameters).then(lang.hitch(this,
          function (bufferGeometry) {
            if (bufferGeometry) {
              // Function to draw AOI
              this._drawAOIOnMap(bufferGeometry, true);
            } else {
              // If unable to draw buffer
              this._showMessage(this.nls.unableToDrawBuffer);
            }
            // Hide loading indicator
            this._loadingIndicator.hide();
          }), lang.hitch(this, function () {
            this._loadingIndicator.hide();
            this._showMessage(this.nls.unableToDrawBuffer);
          }));
      }), 50);
    },

    /**
     * This function will clear AOI graphics from map
     * @memberOf Screening/Widget
     */
    _clearAOI: function () {
      if (!domClass.contains(this.clearAOIButton, "jimu-state-disabled")) {
        this._aoiGraphicsLayer.clear();
        this._drawnOrSelectedGraphicsLayer.clear();
        this._toleranceGraphicsLayer.clear();
        this._uploadedShapefileGraphicsLayer.clear();
        this._highlightGraphicsLayer.clear();
        this._disableClearAOIButton();
        this._disableShowReportsButton();
        this._disableZoomIcon();
        this._newShapeFileAnalysisArr = null;
        // Clear layer selections
        if (this._drawTool) {
          this._drawTool.clearAllSelections();
        }
        if (this._coordinatesTool) {
          this._coordinatesTool.resetCoordinatesWidgetValue();
        }
      }
    },

    /**
     * This function will draw AOI on Map
     * 1. 'aoiGeometry' contains polygon geometry to draw AOI
     * 2. 'addAOISymbology' Boolean indicates if to add symbology to graphics while adding on map
     * @memberOf Screening/Widget
     */
    _drawAOIOnMap: function (aoiGeometries, addAOISymbology) {
      // Show loading indicator
      this._loadingIndicator.show();
      this._aoiGraphicsLayer.clear();
      array.forEach(aoiGeometries, lang.hitch(this, function (geometry) {
        var newGraphic;
        //only add polygon/buffers dont add point/line on AOI graphics layer
        if (geometry.type !== "point" && geometry.type !== "polyline") {
          newGraphic = new Graphic(geometry);
          if (addAOISymbology) {
            newGraphic.setSymbol(jsonUtils.fromJson(this.config.aoiSymbol));
          }
          // Add aoi graphic on map
          this._aoiGraphicsLayer.add(newGraphic);
        }
      }));
      this._isReportGenerated = false;
      //if any geometry is selected enable the report button
      if (this._aoiGraphicsLayer.graphics.length > 0 ||
        this._drawnOrSelectedGraphicsLayer.graphics.length > 0) {
        this._setExtentToGraphicsLayer(this._aoiGraphicsLayer,
          this._drawnOrSelectedGraphicsLayer);
        // Enable reports tab
        // Now reports tab is available to generate reports
        this._enableShowReportsButton();
      } else {
        this._disableShowReportsButton();
      }
      // Hide loading indicator
      this._loadingIndicator.hide();
    },

    /**
     * This function will resize content of the widget
     * @memberOf Screening/Widget
     */
    resize: function () {
      this._setMaxHeightOfImpactSummaryReportContainer();
      //resize search boxes in placename & coordinateTools
      if (this._placenameTool) {
        this._placenameTool.onWindowResize();
      }
      if (this._coordinatesTool) {
        this._coordinatesTool.onWindowResize();
      }
    },

    /**
     * Create and show alert message.
     * @param {string} contains message
     * @memberOf Screening/Widget
     **/
    _showMessage: function (msg) {
      var alertMessage = new Message({
        message: msg
      });
      alertMessage.message = msg;
    },

    /**
     * This function will set the map's extent to the graphics of the selected graphics layer
     * @param {Object} GraphicsLayer object
     * @memberOf Screening/Widget
     **/
    _setExtentToGraphicsLayer: function (graphicsLayer, graphicsLayer1) {
      var mergedGraphics = [];
      if (graphicsLayer.graphics.length > 0 && graphicsLayer.graphics[0].geometry) {
        mergedGraphics = graphicsLayer.graphics;
      }
      if (graphicsLayer1 && graphicsLayer1.graphics.length > 0 &&
        graphicsLayer1.graphics[0].geometry) {
        mergedGraphics = mergedGraphics.concat(graphicsLayer1.graphics);
      }
      // If mergedGraphics array has feature then set extent
      if (mergedGraphics.length > 0) {
        // Check if coordinates tool is selected
        if (this._currentActiveTool === "coordinates") {
          if (this.bufferDistanceTextBox.get('value') === 0) {
            // In coordinates tab if buffer value is greater than 0, do not auto zoom the map.
            this.map.setExtent(
              graphicsUtils.graphicsExtent(mergedGraphics).expand(1.5));
          }
        } else {
          this.map.setExtent(
            graphicsUtils.graphicsExtent(mergedGraphics).expand(1.5));
        }
      }
    },

    /**
     * This function is used to disable clear button
     * @memberOf Screening/Widget
     */
    _disableClearAOIButton: function () {
      domClass.add(this.clearAOIButton, "jimu-state-disabled");
    },

    /**
     * This function is used to enable clear button
     * @memberOf Screening/Widget
     */
    _enableClearAOIButton: function () {
      domClass.remove(this.clearAOIButton, "jimu-state-disabled");
    },

    /**
     * This function is used to disable show reports button
     * @memberOf Screening/Widget
     */
    _disableShowReportsButton: function () {
      domClass.add(this.showReportsButton, "jimu-state-disabled");
    },

    /**
     * This function is used to enable show reports button
     * @memberOf Screening/Widget
     */
    _enableShowReportsButton: function () {
      domClass.remove(this.showReportsButton, "jimu-state-disabled");
    },

    /**
     * This function is used to enable zoom icon
     * @memberOf Screening/Widget
     */
    _enableZoomIcon: function () {
      if (domClass.contains(this.zoomToNode, "esriCTZoomToDisableIcon")) {
        domClass.replace(this.zoomToNode, "esriCTZoomToIcon", "esriCTZoomToDisableIcon");
        domClass.add(this.zoomToNode, "esriCTCursorPointer");
      }
    },

    /**
     * This function is used to disable zoom icon
     * @memberOf Screening/Widget
     */
    _disableZoomIcon: function () {
      if (domClass.contains(this.zoomToNode, "esriCTZoomToIcon")) {
        domClass.replace(this.zoomToNode, "esriCTZoomToDisableIcon", "esriCTZoomToIcon");
        domClass.remove(this.zoomToNode, "esriCTCursorPointer");
      }
    },

    /**
    * This function is used to display the area/length of AOI in selected unit
    * @memberOf Screening/Widget
    */
    _calculateSelectedUnitAOIArea: function (aoiArea, geometryType, unitDomNode, unitLabel) {
      var aoiAreaText;
      if (aoiArea < 0.01 && aoiArea !== 0) {
        aoiArea = " < " + dojoNumber.format(0.01) + " ";
      } else {
        aoiArea = conversionUtils.honourPopupRounding(2, aoiArea);
        aoiArea = dojoNumber.format(aoiArea);
      }
      if (geometryType === "polygon") {
        aoiAreaText = this.nls.reportsTab.featureAreaText + " : " +
          aoiArea + " " + this._getAOIUnitForGeometry(unitLabel, geometryType);
      } else {
        aoiAreaText = this.nls.reportsTab.featureLengthText + " : " +
          aoiArea + " " + this._getAOIUnitForGeometry(unitLabel, geometryType);
      }
      domAttr.set(unitDomNode, "innerHTML", aoiAreaText);
    },

    /**
     * Based on AOI config analysis unit value return unit for Length and area
     * @memberOf Screening/Widget
     */
    _getAOIUnitForGeometry: function (analysisUnit, geometryType) {
      var aoiResultUnit, supText;
      supText = '2';
      switch (analysisUnit) {
        case "Feet":
          aoiResultUnit = (geometryType === "polygon" || geometryType === "esriGeometryPolygon") ?
            this.nls.units.feetAbbr + supText.sup() : this.nls.units.feetAbbr;
          break;
        case "Miles":
          aoiResultUnit = (geometryType === "polygon" || geometryType === "esriGeometryPolygon") ?
            this.nls.units.acresAbbr : this.nls.units.milesAbbr;
          break;
        case "Meters":
          aoiResultUnit = (geometryType === "polygon" || geometryType === "esriGeometryPolygon") ?
            this.nls.units.metersAbbr + supText.sup() : this.nls.units.metersAbbr;
          break;
        case "Kilometers":
          aoiResultUnit = (geometryType === "polygon" || geometryType === "esriGeometryPolygon") ?
            this.nls.units.kilometersAbbr + supText.sup() : this.nls.units.kilometersAbbr;
          break;
        case "Hectares":
          aoiResultUnit = (geometryType === "polygon" || geometryType === "esriGeometryPolygon") ?
            this.nls.reportsTab.hectaresAbbr : this.nls.units.kilometersAbbr;
          break;
      }
      return aoiResultUnit;
    },

    /**
     * This function is used to display configured area units in reports tab
     * @memberOf Screening/Widget
     */
    _displayConfiguredAOIArea: function () {
      if (!domClass.contains(this.aoiFeetUnitAreaContainer, "esriCTHidden")) {
        domClass.add(this.aoiFeetUnitAreaContainer, "esriCTHidden");
      }
      if (!domClass.contains(this.aoiMilesUnitAreaContainer, "esriCTHidden")) {
        domClass.add(this.aoiMilesUnitAreaContainer, "esriCTHidden");
      }
      if (!domClass.contains(this.aoiMetersUnitAreaContainer, "esriCTHidden")) {
        domClass.add(this.aoiMetersUnitAreaContainer, "esriCTHidden");
      }
      if (!domClass.contains(this.aoiKilometersUnitAreaContainer, "esriCTHidden")) {
        domClass.add(this.aoiKilometersUnitAreaContainer, "esriCTHidden");
      }
      if (!domClass.contains(this.aoiHectaresUnitAreaContainer, "esriCTHidden")) {
        domClass.add(this.aoiHectaresUnitAreaContainer, "esriCTHidden");
      }
      switch (this.config.areaUnits) {
        case "Feet":
          domClass.remove(this.aoiFeetUnitAreaContainer, "esriCTHidden");
          break;
        case "Miles":
          domClass.remove(this.aoiMilesUnitAreaContainer, "esriCTHidden");
          break;
        case "Meters":
          domClass.remove(this.aoiMetersUnitAreaContainer, "esriCTHidden");
          break;
        case "Kilometers":
          domClass.remove(this.aoiKilometersUnitAreaContainer, "esriCTHidden");
          break;
        case "Hectares":
          domClass.remove(this.aoiHectaresUnitAreaContainer, "esriCTHidden");
          break;
      }
    },

    /**
     * This function is used to enable/disable the download & print button
     * @memberOf Screening/Widget
     */
    _toggleReportTabButtons: function (isEnable, isPrintEnable) {
      if (isEnable) {
        domClass.remove(this.downloadReportBtn, "esriCTDownloadBtnDisabled");
        if (this.printOptions.length > 0) {
          domClass.remove(this.printButton, "esriCTPrintBtnDisabled");
          this.printIconButton.set('disabled', false);
        } else {
          domClass.add(this.printButton, "esriCTPrintBtnDisabled");
          this.printIconButton.set('disabled', true);
        }
      } else {
        domClass.add(this.downloadReportBtn, "esriCTDownloadBtnDisabled");
        domClass.add(this.printButton, "esriCTPrintBtnDisabled");
        this.printIconButton.set('disabled', true);
      }
      //If report generation is completed and isPrintEnable flag is true then enable print button
      if (!isEnable && isPrintEnable) {
        domClass.remove(this.printButton, "esriCTPrintBtnDisabled");
        this.printIconButton.set('disabled', false);
      }
    },

    /**
     * This function is used to get the union of aoi/buffer geometries
     * @memberOf Screening/Widget
     */
    _getUnionGeometry: function (graphics) {
      var geometryArray = [];
      if (graphics.length > 0) {
        array.forEach(graphics, lang.hitch(this, function (graphic) {
          geometryArray.push(graphic.geometry);
        }));
        return GeometryEngine.union(geometryArray);
      }
      return null;
    },

    /**
     * This function is used to get information about types of geometries added on map
     * @memberOf Screening/Widget
     */
    _getAOIGeometriesInfo: function () {
      var allDrawnOrSelectedGraphicLength, pointGraphics, lineGraphics, polygonGraphics;
      allDrawnOrSelectedGraphicLength = this._drawnOrSelectedGraphicsLayer.graphics.length;
      pointGraphics = lineGraphics = polygonGraphics = 0;
      if (this.bufferDistanceTextBox.get('value') > 0) {
        return "AOIGraphics";
      }
      array.forEach(this._drawnOrSelectedGraphicsLayer.graphics,
        lang.hitch(this, function (graphic) {
          if (graphic.geometry.type === "point") {
            pointGraphics++;
          } else if (graphic.geometry.type === "polyline") {
            lineGraphics++;
          } else {
            polygonGraphics++;
          }
        }));
      if (pointGraphics > 0 && lineGraphics > 0 && this._currentActiveTool === "coordinates") {
        return "AllLines";
      } else if (pointGraphics === allDrawnOrSelectedGraphicLength) {
        return "AllPoints";
      } else if (lineGraphics === allDrawnOrSelectedGraphicLength) {
        return "AllLines";
      } else if (polygonGraphics === allDrawnOrSelectedGraphicLength) {
        return "AllPolygons";
      } else {
        return "Mixed";
      }
    },

    /**
     * This function is used to initialize ImpactSummaryReport widget
     * for each layer and add in the list
     * @memberOf Screening/Widget
     */
    _initializeImpactSummaryReportWidget: function () {
      var i, impactSummaryReportObj, featureLayerObj, promiseList, completeAOIGeometry,
        completeToleranceGeometry, allPointGeometries;
      promiseList = [];
      this._isExceedingMaxRecordCount = false;
      domConstruct.empty(this.impactSummaryReportContainer);
      this._downloadFeatureDetailsObj = {};
      this._printData = {};
      allPointGeometries = this._getUnionGeometry(this._getOnlyPointGraphics());
      completeToleranceGeometry = this._getUnionGeometry(this._toleranceGraphicsLayer.graphics);
      completeAOIGeometry = this._getUnionGeometry(this._aoiGraphicsLayer.graphics);
      for (i = 0; i < this.config.layers.length; i++) {
        featureLayerObj = this._filteredLayerObj[this.config.layers[i].id];
        if (featureLayerObj) {
          impactSummaryReportObj = new ImpactSummaryReport({
            id: featureLayerObj.id + "_" + i + Date.now(),
            nls: this.nls,
            config: this.config,
            appConfig: this.appConfig,
            map: this.map,
            featureLayer: featureLayerObj,
            aoiGraphicsLayer: this._aoiGraphicsLayer,
            configuredField: this.config.layers[i].selectedFields,
            configuredLayerLabel: this.config.layers[i].label,
            maxFeaturesForAnalysis: this.config.maxFeaturesForAnalysis,
            layerInfosObj: this.layerInfosObj,
            highlightGraphicsLayer: this._highlightGraphicsLayer
          }, domConstruct.create("div", {}, this.impactSummaryReportContainer));
          this.own(on(impactSummaryReportObj, "printDataUpdated",
            lang.hitch(this, function (details) {
              this._printData[details.id].info = details.printData;
            })));
          this.own(on(impactSummaryReportObj, "showMessage", lang.hitch(this, function (msg) {
            this._showMessage(msg);
          })));
          this.own(on(impactSummaryReportObj, "exceedingMaxRecordCount",
            lang.hitch(this, this._displayExceedingFeatureCountError)));
          promiseList.push(impactSummaryReportObj.generateReport(
            completeAOIGeometry, completeToleranceGeometry, allPointGeometries));
        }
      }
      //on report generation complete for all the layers
      all(promiseList).then(lang.hitch(this, function (reportLayerDetails) {
        var isIntersectingFeature = false;
        array.forEach(reportLayerDetails, lang.hitch(this, function (layerDetails) {
          if (layerDetails) {
            //set download features details
            this._downloadFeatureDetailsObj[layerDetails.featureLayerId] = layerDetails.features;
            //set print info
            this._printData[layerDetails.id] = lang.hitch(layerDetails.printInfo);
            //if any of the layers count is greater than 0 enable download & print buttons
            if (layerDetails.features.length > 0 && !isIntersectingFeature) {
              isIntersectingFeature = true;
            }
            //After successful execution, change report generated flags value to true
            this._isReportGenerated = true;
          }
        }));
        //Enable/disable download & print buttons
        this._toggleReportTabButtons(isIntersectingFeature, true);
      }));
    },

    /**
     * This function to display error message if feature count is more than max record count
     * @memberOf Screening/Widget
     */
    _displayExceedingFeatureCountError: function () {
      //if any of the layers count is exceeding Max record count show error on completion
      if (!this._isExceedingMaxRecordCount) {
        this._isExceedingMaxRecordCount = true;
        this._showMessage(this.nls.reportsTab.intersectingFeatureExceedsMsgOnCompletion);
      }
    },

    /**
     * This function detects if app is running in android
     * @memberOf Screening/Widget
     */
    isAndroid: function () {
      var ua = navigator.userAgent.toLowerCase();
      return ua.indexOf("android") > -1;
    },

    /**
     * This function detects if app is running in iOS
     * @memberOf Screening/Widget
     */
    isIOS: function () {
      return !!navigator.platform.match(/iPhone|iPod|iPad/);
    },

    /* Section to filter layers from the map */

    /**
     * This function to set feature layers for select tool
     * @memberOf Screening/Widget
     */
    _filterLayersFromMap: function () {
      this._filteredLayerObj = {};
      // Start showing loading indicator
      this._loadingIndicator.show();
      //get the instance of layer infos
      LayerInfos.getInstance(this.map, this.map.itemInfo)
        .then(lang.hitch(this, function (layerInfosObj) {
          this.layerInfosObj = layerInfosObj;
          // Get layers with information
          layerUtil.getLayerInfoArray(layerInfosObj).then(lang.hitch(this,
            function (layerInfoArray) {
              this._layerInfoArray = layerInfoArray;
              this._getLayerObjects(layerInfoArray).then(lang.hitch(this, function (layerObjects) {
                var defList = [];
                array.forEach(layerObjects, function (layerObject) {
                  defList.push(this._filterLayer(layerObject));
                }, this);
                all(defList).then(lang.hitch(this, function () {
                  //load the widget
                  this._initWidgetComponents();
                }));
              }));
            }));
        }));
    },

    /**
     * This function to get layer object from web map
     * @param{array} contains layers and its information
     * @memberOf Screening/Widget
     */
    _getLayerObjects: function (layerInfoArray) {
      var retDef = new Deferred();
      var defs = array.map(layerInfoArray, function (layerInfo) {
        return layerInfo.getLayerObject();
      });
      all(defs).then(function (layerObjects) {
        retDef.resolve(layerObjects);
      });
      return retDef;
    },

    /**
     * This function to filter visible layers of the map
     * @param{object} contains information of the layer
     * @memberOf Screening/Widget
     */
    _filterLayer: function (layerObject) {
      var pattern, result, mapServerURL, i, mapServerLayerID, j, operationalLayers, visibleLayers,
        layerDef, isLayerAvailable;
      layerDef = new Deferred();
      pattern = /(^.*?MapServer)/gi;
      result = pattern.exec(layerObject.url);
      isLayerAvailable = false;
      // If it is a map server url
      if (result) {
        mapServerURL = result[1];
      }
      operationalLayers = this.map.webMapResponse.itemInfo.itemData.operationalLayers;
      mapServerLayerID = layerObject.layerId;
      // Check for map server or feature server layers
      for (i = 0; i < operationalLayers.length; i++) {
        if ((operationalLayers[i].layerType === "ArcGISMapServiceLayer") &&
          (mapServerURL === operationalLayers[i].url) && (result)) {
          visibleLayers = operationalLayers[i].layerObject.layerInfos;
          for (j = 0; j < visibleLayers.length; j++) {
            if (mapServerLayerID === visibleLayers[j].id) {
              this._filteredLayerObj[layerObject.id] = layerObject;
              isLayerAvailable = true;
              layerDef.resolve();
              break;
            }
          }
        } else if (operationalLayers[i].layerType === "ArcGISFeatureLayer") {
          this._filteredLayerObj[layerObject.id] = layerObject;
          isLayerAvailable = true;
          layerDef.resolve();
          break;
        }
      }
      if (!isLayerAvailable) {
        layerDef.resolve();
      }
      return layerDef.promise;
    },

    /* End of filter layer section */

    /**
    * Show selected panel
    * @param{string} name
    * @param{boolean} isLeft
    * @memberOf Screening/Widget
    **/
    _showPanel: function (name, isLeft) {

      domStyle.set(this._panels[name], {
        display: 'block',
        left: '-100%'
      });
      if (isLeft) {
        this._slide(this._panels[name], -100, 0);
        this._slide(this._currentPanel, 0, 100);
      } else {
        this._slide(this._currentPanel, 0, -100);
        this._slide(this._panels[name], 100, 0);
      }
      this._currentPanelName = name;
      this._currentPanel = this._panels[name];
    },

    /**
    * animate panels
    * @param{object} dom
    * @param{int} startLeft
    * @param{int} endLeft
    * @memberOf Screening/Widget
    **/
    _slide: function (dom, startLeft, endLeft) {
      domStyle.set(dom, 'left', endLeft);
      if (endLeft === 0) {
        domStyle.set(dom, 'display', 'block');
      } else {
        domStyle.set(dom, 'display', 'none');
      }
      domStyle.set(dom, 'left', startLeft + "%");
      fx.animateProperty({
        node: dom,
        properties: {
          left: {
            start: startLeft,
            end: endLeft,
            units: '%'
          }
        },
        duration: 300
      }).play();
    },
    /* -----------  Section for print dialog ---------------- */
    /**
     * This function is used to create print dialog
     * @memberOf Screening/Widget
     */
    _setUpPrintDialogPopup: function () {
      //get the print icon button
      this.printButton = query(".esriCTPrintContainer", this.downloadAndPrintTableContainer)[0];
      //by default set print icon disabled
      this.printIconButton.set('disabled', true);
      //add class to print dialog
      domClass.add(this.printDialog.domNode, "esriCTPrintSettingsDialog " + this.baseClass);
      // add additional class for dart theme to match the dart theme in popup
      if (this.appConfig.theme.name === "DartTheme") {
        domClass.add(this.printDialog.domNode, "dart-panel");
      }
      //Load the options in layout
      this._loadLayoutOptions(this.printLayoutSelect);
      //handle the click event of print button in popup
      this.own(on(this.printActionButton, "click", lang.hitch(this, function () {
        var data;
        if (this.reportDijit) {
          var selectedLayoutDetails;
          selectedLayoutDetails = lang.clone(this.printOptions[this.printLayoutSelect.get('value')]);
          if (selectedLayoutDetails.hasOwnProperty("orientation") &&
            selectedLayoutDetails.orientation.Type === "Portrait") {
            this.reportDijit.maxNoOfCols = 5;
          } else {
            this.reportDijit.maxNoOfCols = 8;
          }
          if (selectedLayoutDetails.hasOwnProperty("SizeName") &&
            selectedLayoutDetails.hasOwnProperty("PageUnits") &&
            selectedLayoutDetails.hasOwnProperty("pageSize")) {
            switch (selectedLayoutDetails.PageUnits) {
              case "POINT":
                selectedLayoutDetails.pageSize.Height =
                  conversionUtils.honourPopupRounding(2,
                    (parseFloat(selectedLayoutDetails.pageSize.Height) * 0.0138889));
                selectedLayoutDetails.pageSize.Width =
                  conversionUtils.honourPopupRounding(2,
                    (parseFloat(selectedLayoutDetails.pageSize.Width) * 0.0138889));
                break;
              case "CENTIMETER":
                selectedLayoutDetails.pageSize.Height =
                  conversionUtils.honourPopupRounding(2,
                    (parseFloat(selectedLayoutDetails.pageSize.Height) * 0.393701));
                selectedLayoutDetails.pageSize.Width =
                  conversionUtils.honourPopupRounding(2,
                    (parseFloat(selectedLayoutDetails.pageSize.Width) * 0.393701));
                break;
              case "MILLIMETER":
                selectedLayoutDetails.pageSize.Height =
                  conversionUtils.honourPopupRounding(2,
                    (parseFloat(selectedLayoutDetails.pageSize.Height) * 0.0393701));
                selectedLayoutDetails.pageSize.Width =
                  conversionUtils.honourPopupRounding(2,
                    (parseFloat(selectedLayoutDetails.pageSize.Width) * 0.0393701));
                break;
            }
          }
          //set report layout first according to selected page size
          this.reportDijit.setReportLayout(selectedLayoutDetails);
          //get processed data for report and call print method
          data = this._getProcessedPrintData();

          this.reportDijit.print(this.config.reportSettings.reportTitle, data);
        } else {
          this._showMessage(this.nls.reportsTab.errorInPrintingReport);
        }
        this.closePrintDialog();
      })));
    },

    /**
     * Hide popup dialog
     * @memberOf Screening/Widget
     */
    closePrintDialog: function () {
      if (this.printDialog) {
        dijitPopup.close(this.printDialog);
      }
    },

    /**
     * Populate and add layout option in drop down
     * @memberOf Screening/Widget
     */
    _loadLayoutOptions: function (dropDown) {
      if (this.config.reportSettings.hasOwnProperty("customOptions") &&
        this.config.reportSettings.hasOwnProperty("defaultPrintOption")) {
        esriRequest({
          url: this.config.reportSettings.printTaskURL,
          content: {
            f: "json"
          },
          handleAs: "json",
          callbackParamName: "callback"
        }).then(lang.hitch(this, function (response) {
          this._fetchChoiceList(response, dropDown);
        }), lang.hitch(this, function () {
          this._showMessage(this.nls.reportsTab.errorInFetchingPrintTask);
          this.loadingIndicator.hide();
        }));
      } else {
        var pageSize, options = [], index = 0;
        for (pageSize in PageUtils.PageSizes) {
          if (PageUtils.PageSizes[pageSize].MapLayout !== "MAP_ONLY" && pageSize !== "Custom") {
            options.push({
              "label": PageUtils.PageSizes[pageSize].SizeName + " " +
                PageUtils.Orientation.Portrait.Text,
              "value": index++
            });
            //Select "Letter Portrait" as a default value
            if (pageSize === "Letter_ANSI_A") {
              options[index - 1].selected = true;
            }
            this.printOptions.push({
              "pageSize": PageUtils.PageSizes[pageSize],
              "orientation": PageUtils.Orientation.Portrait
            });
            options.push({
              "label": PageUtils.PageSizes[pageSize].SizeName + " " +
                PageUtils.Orientation.Landscape.Text,
              "value": index++
            });
            this.printOptions.push({
              "pageSize": PageUtils.PageSizes[pageSize],
              "orientation": PageUtils.Orientation.Landscape
            });
          }
        }
        dropDown.addOption(options);
      }
    },

    _fetchChoiceList: function (response, dropDown) {
      array.forEach(response.parameters, lang.hitch(this, function (parameter) {
        if (parameter.name === "Layout_Template" && parameter.displayName === "Layout Template") {
          this._printServiceChoiceList = parameter.choiceList;
          this._addDefaultOptionsInWidgetDropdown(dropDown);
        }
      }));
    },

    _addDefaultOptionsInWidgetDropdown: function (dropDown) {
      var options, printOption, index, pageSize, selected, isCustomOptionAdded, isDefaultOptionAdded;
      options = [];
      index = 0;
      selected = false;
      isCustomOptionAdded = false;
      isDefaultOptionAdded = false;
      // default option
      array.forEach(this._printServiceChoiceList, lang.hitch(this, function (printServiceChoiceListDetails) {
        var printServiceChoiceList = lang.clone(printServiceChoiceListDetails);
        if (printServiceChoiceList !== "MAP_ONLY") {
          if (this._defaultOptions[printServiceChoiceList]) {
            isDefaultOptionAdded = true;
            printOption = this._defaultOptions[printServiceChoiceList];
            if (printServiceChoiceListDetails === this.config.reportSettings.defaultPrintOption) {
              selected = true;
            }
            options.push({
              "label": PageUtils.PageSizes[printOption.SizeName].SizeName + " " +
                PageUtils.Orientation[printOption.Orientation].Text,
              "value": index++,
              "selected": selected
            });
            pageSize = lang.clone(PageUtils.PageSizes[printOption.SizeName]);
            if (printOption.Orientation === PageUtils.Orientation.Landscape.Type) {
              var tempObj = lang.clone(pageSize);
              pageSize.Height = tempObj.Width;
              pageSize.Width = tempObj.Height;
            }
            this.printOptions.push({
              "pageSize": pageSize,
              "orientation": PageUtils.Orientation[printOption.Orientation]
            });
          }
        }
      }));
      // custom option
      array.forEach(this.config.reportSettings.customOptions, lang.hitch(this, function (customOptionDetails) {
        isCustomOptionAdded = true;
        if (customOptionDetails.SizeName === this.config.reportSettings.defaultPrintOption) {
          selected = true;
        }
        options.push({
          "label": customOptionDetails.SizeName,
          "value": index++,
          "selected": selected
        });
        this.printOptions.push({
          "SizeName": customOptionDetails.SizeName,
          'pageSize': {
            'Height': customOptionDetails.Height,
            'Width': customOptionDetails.Width,
            "MapLayout": customOptionDetails.SizeName
          },
          "MapLayout": customOptionDetails.SizeName,
          "PageUnits": customOptionDetails.PageUnits
        });
      }));
      // no default & no custom
      if (!isDefaultOptionAdded) {
        if (options.length > 0) {
          dropDown.addOption(options);
          return;
        }
        this._isMapOnlyOptionAvailable = true;
        for (var defaultOption in this._defaultOptions) {
          if (this._defaultOptions.hasOwnProperty(defaultOption)) {
            pageSize = lang.clone(PageUtils.PageSizes[this._defaultOptions[defaultOption].SizeName]);
            if (pageSize) {
              if (defaultOption === this.config.reportSettings.defaultPrintOption) {
                selected = true;
              }
              options.push({
                "label": defaultOption,
                "value": index++,
                "selected": selected
              });
              if (this._defaultOptions[defaultOption].Orientation === PageUtils.Orientation.Landscape.Type) {
                var tempObj = lang.clone(pageSize);
                pageSize.Height = tempObj.Width;
                pageSize.Width = tempObj.Height;
              }
              this.printOptions.push({
                "pageSize": pageSize,
                "orientation": PageUtils.Orientation[this._defaultOptions[defaultOption].Orientation]
              });
            }
          }
        }
        dropDown.addOption(options);
      } else {
        dropDown.addOption(options);
      }
    },

    /* ---------------- End of section for print dialog ------------------------ */

    /* -----------  Section for analysis unit dialog ---------------- */
    /**
     * This function is used to create analysis unit setting dialog
     * @memberOf Screening/Widget
     */
    _setAnalysisUnitDialogPopup: function () {
      //add class to analysis unit dialog
      domClass.add(this.analysisUnitDialog.domNode,
        "esriCTReportAnalysisUnitSettingsDialog " + this.baseClass);

      if (this.appConfig.theme.name === "LaunchpadTheme") {
        if (this.analysisUnitDialog && this.analysisUnitDialog.domNode &&
          this.analysisUnitDialog.domNode.children && this.analysisUnitDialog.domNode.children[0]) {
          domClass.add(this.analysisUnitDialog.domNode.children[0],
            "esriCTReportAnalysisUnitSettingsDialogLaunchpadTheme");
        }
      }
      // add additional class for dart theme to match the dart theme in popup
      if (this.appConfig.theme.name === "DartTheme") {
        domClass.add(this.analysisUnitDialog.domNode, "dart-panel");
      }
      // to set config area unit as default value
      this.analysisUnitSelect.set('value', this.config.areaUnits);
      //handle the click event of unit analysis button in popup
      this.own(on(this.analysisUnitActionButton, "click", lang.hitch(this, function () {
        var selectedUnitValue;
        selectedUnitValue = this.analysisUnitSelect.get('value');
        if (this.config.areaUnits !== selectedUnitValue) {
          this.config.areaUnits = selectedUnitValue;
          this.showSelectedUnitReportData(selectedUnitValue);
        }
        this._closeUnitSettingDialog();
      })));
    },

    /**
    * close unit setting popup dialog
    * @memberOf Screening/Widget
    */
    _closeUnitSettingDialog: function () {
      if (this.analysisUnitDialog) {
        dijitPopup.close(this.analysisUnitDialog);
      }
    },

    /**
     * Analysis report length/area units changed
     * @memberOf Screening/Widget
     */
    showSelectedUnitReportData: function (selectedUnitValue) {
      var measurementInfoDataNodes;
      measurementInfoDataNodes = query(".esriCTInfoDataMeasurement", this.domNode);
      array.forEach(measurementInfoDataNodes, function (measurementInfoDataNode) {
        if (!domClass.contains(measurementInfoDataNode, "esriCTHidden")) {
          domClass.add(measurementInfoDataNode, "esriCTHidden");
        }
        if (domClass.contains(measurementInfoDataNode, "esriCTFieldDistinct" +
          selectedUnitValue + "UnitData")) {
          domClass.remove(measurementInfoDataNode, "esriCTHidden");
        }
      });
      this._displayConfiguredAOIArea();
    },

    /**
     * This function is used to detect style change of WAB in editor mode.
     * Once it is detected, theme is reset.
     * For e.g. changing dashboard theme style from light to dark
     * @memberOf Screening/Widget
     */
    onAppConfigChanged: function (appConfig, reason, changedData) { // jshint ignore:line
      if (reason === "styleChange") {
        this._setTheme(changedData);
      }
    }
  });
});