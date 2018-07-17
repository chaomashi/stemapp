define([
  'dojo/_base/declare',
  'jimu/BaseWidget',
  "dojo/on",
  "dojo/dom-construct",
  "dojo/dom-class",
  "dojo/query",
  "dojo/_base/Color",
  "dojo/_base/lang",
  "./search",
  "jimu/portalUtils",
  "esri/layers/GraphicsLayer",
  "esri/dijit/Directions",
  "esri/units",
  "esri/layers/FeatureLayer",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/geometry/Point",
  "esri/SpatialReference",
  "esri/graphic",
  "dojo/dom-attr",
  "dojo/dom-geometry",
  "dojo/dom-style",
  "esri/symbols/jsonUtils",
  "esri/tasks/locator",
  "esri/geometry/webMercatorUtils",
  "esri/InfoTemplate",
  "esri/dijit/PopupTemplate",
  "esri/tasks/query",
  "esri/tasks/RelationshipQuery",
  "jimu/dijit/Message",
  "jimu/dijit/TabContainer",
  "dijit/layout/ContentPane",
  "jimu/dijit/LoadingIndicator",
  "dojo/_base/array",
  "dijit/registry",
  "jimu/LayerInfos/LayerInfos",
  "./utils",
  "esri/renderers/jsonUtils"
], function (
  declare,
  BaseWidget,
  on,
  domConstruct,
  domClass,
  query,
  Color,
  lang,
  SearchInstance,
  portalUtils,
  GraphicsLayer,
  Directions,
  esriUnits,
  FeatureLayer,
  SimpleMarkerSymbol,
  SimpleLineSymbol,
  Point,
  SpatialReference,
  Graphic,
  domAttr,
  domGeom,
  domStyle,
  symbolJsonUtils,
  Locator,
  webMercatorUtils,
  InfoTemplate,
  PopupTemplate,
  esriQuery,
  RelationshipQuery,
  Message,
  JimuTabContainer,
  ContentPane,
  LoadingIndicator,
  array,
  registry,
  LayerInfos,
  appUtils,
  rendererJsonUtils
) {
  return declare([BaseWidget], {

    baseClass: 'jimu-widget-districtlookup', // Set the widget base class name.

    _highlightGraphicsLayer: null, // GraphicLayer to add highlight symbols
    _loading: null, // Loading indicator object
    _precinctLayer: null, // Feature layer object for precinct
    _pollingPlaceLayer: null, // Feature layer object for polling place
    _selectedPollingPlace: null, // Hold Selected polling place for searched address
    _selectedLocation: null, // Hold searched location
    _precinctInfoContent: null, //ContentPane  object for precinct info(Polygon Feature)
    _pollingPlaceInfoContent: null, // ContentPane  object for polling place info(Related point feature)
    _precinctInfoContentDiv: null, // Precinct content Info div
    _pollingPlaceInfoContentDiv: null, // Polling place content Info div
    _locatorInstance: null, // Locator instance to reverse geocode the address
    _mapClickHandler: null, // Map click handler
    _mapMoveHandler: null, // Map move handler
    _mapTooltip: null, // MapTooltip Container
    _searchContainerNodeElement: null, // Search container
    _directionPanel: null, //Direction panel div
    _directionsWidget: null, // Direction widget object
    _isValidConfig: null, //Flag to check whether config has valid data for the widget
    _hasMulitpleSourcesInSearch: true, //Set this flag if their are multiple sources in search
    _tables: [],//Related table instances for configured layers
    appUtils: null,
    _precintRelatedRecordsPanel: null,//To display related table records for precint feature
    _pollingRelatedRecordsPanel: null,//To display related table records for polling place
    _searchInstance: null, //To store search instance

    postMixInProperties: function () {
      //mixin default nls with widget nls
      this.nls.common = {};
      lang.mixin(this.nls.common, window.jimuNls.common);
    },

    postCreate: function () {
      this._tables = []; //Related table instances for configured layers
    },

    startup: function () {
      domClass.add(this.domNode.parentElement,
        "esriCTPollingPlaceContentPanel");
      domClass.add(this.domNode.parentElement, this.baseClass);
      //check whether portal url is available
      if (this.appConfig.portalUrl && lang.trim(this.appConfig.portalUrl) !== "") {
        //get portal info to fetch geometry service Url
        portalUtils.getPortalSelfInfo(this.appConfig.portalUrl).then(lang.hitch(
          this,
          function (portalInfo) {
            // get helper-services from portal
            this.config.helperServices = portalInfo.helperServices;
            // validate if layers are configured then only load the widget
            this._isValidConfig = this._validateConfig();
            if (this._isValidConfig) {
              //initialize utils widget
              this.appUtils = new appUtils({ map: this.map });
              //update config for current webmap properties
              this._updateConfig();
              //Show main node
              domClass.remove(this.widgetMainNode, "esriCTHidden");
              //Hide Error node
              domClass.add(this.widgetErrorNode, "esriCTHidden");
              //init loading indicator
              this._initLoading();
              //load the widget Components
              this._initWidgetComponents();
            } else {
              //Hide main node
              domClass.add(this.widgetMainNode, "esriCTHidden");
              //Show Error node
              domClass.remove(this.widgetErrorNode, "esriCTHidden");
            }
          }));
      } else {
        domAttr.set(this.widgetErrorNode, "innerHTML", this.nls.invalidPortalUrlMsg);
        this._showMessage(this.nls.invalidPortalUrlMsg);
        //Hide main node
        domClass.add(this.widgetMainNode, "esriCTHidden");
        //Show Error node
        domClass.remove(this.widgetErrorNode, "esriCTHidden");
      }
    },

    /**
    * This function used for initializing the loading indicator
    * @memberOf widgets/districtlookup
    */
    _initLoading: function () {
      this._loading = new LoadingIndicator({
        hidden: true
      });
      this._loading.placeAt(this.widgetMainNode);
      this._loading.startup();
    },

    /**
    * This function creates and show alert message.
    * @param {string} msg
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _showMessage: function (msg) {
      var alertMessage = new Message({
        message: msg
      });
      alertMessage.message = msg;
    },

    /**
    * Resize the widget components and connect map click on widget open
    * @memberOf widgets/DistrictLookup/Widget
    */
    onOpen: function () {
      if (this._isValidConfig) {
        this._onWindowResize();
        if (!this.config.showLocationTool) {
          this._connectMapEventHandler();
        }
      }
      this._updateLayerFilters();
    },

    /**
    * update layer filters
    */
    _updateLayerFilters: function () {
      //get map layer infos
      LayerInfos.getInstance(this.map, this.map.webMapResponse.itemInfo).then(
        lang.hitch(this, function (layerInfosObj) {
          var precintLayer, pollingPlaceLayer, filter;
          //updated definition expression for precint layer
          precintLayer = layerInfosObj.getLayerInfoById(this.config.precinctLayerInfo
            .id);
          if (precintLayer) {
            filter = precintLayer.getFilter();
            if (filter !== this.config.precinctLayerInfo.definitionExpression) {
              this.config.precinctLayerInfo.definitionExpression = filter;
              if (this._precinctLayer) {
                this._precinctLayer.setDefinitionExpression(this.config.precinctLayerInfo
                  .definitionExpression);
              }
            }
          }
          //updated definition expression for polling-place layer
          pollingPlaceLayer = layerInfosObj.getLayerInfoById(this.config.pollingPlaceLayerInfo
            .id);
          if (pollingPlaceLayer) {
            filter = pollingPlaceLayer.getFilter();
            if (filter !== this.config.precinctLayerInfo.definitionExpression) {
              this.config.pollingPlaceLayerInfo.definitionExpression = filter;
              if (this._pollingPlaceLayer) {
                this._pollingPlaceLayer.setDefinitionExpression(this.config
                  .pollingPlaceLayerInfo.definitionExpression);
              }
            }
          }
        }));
    },

    /**
    * Resize the widget components on widget resize
    */
    resize: function () {
      this._onWindowResize();
    },

    /**
    * This function clears search results when widget is destroyed
    */
    destroy: function () {
      this._clearResults();
      this.inherited(arguments);
    },

    /**
    * disconnect map click on widget close
    * @memberOf widgets/DistrictLookup/Widget.js
    */
    onClose: function () {
      if (this._isValidConfig) {
        this._disconnectMapEventHandler();
        this._clearResults();
        //Clearing searchBox text value
        if (this._searchInstance) {
          this._searchInstance.clearSearchText();
        }
      }
    },

    /**
    * disconnect map click on widget close
    * @memberOf widgets/DistrictLookup/Widget.js
    */
    onDeActive: function () {
      if (this._isValidConfig && this.config.showLocationTool) {
        this._disconnectMapEventHandler();
      }
    },

    /**
    * This function validates the configured data
    */
    _validateConfig: function () {
      // check if valid polygon layer is configured
      if (!this.config.precinctLayerInfo || !this.config.precinctLayerInfo
        .url) {
        domAttr.set(this.widgetErrorNode, "innerHTML", this.nls.invalidPolygonLayerMsg);
        this._showMessage(this.nls.invalidPolygonLayerMsg);
        return false;
      }
      // check if valid related point layer is configured
      if (!this.config.pollingPlaceLayerInfo || !this.config.pollingPlaceLayerInfo
        .url) {
        domAttr.set(this.widgetErrorNode, "innerHTML", this.nls.invalidRelatedPointLayerMsg);
        this._showMessage(this.nls.invalidRelatedPointLayerMsg);
        return false;
      }
      return true;
    },

    /**
    * This function updates the layer-details of the configured layers from current webmap properties
    * properties such as layerName, layerDefinations, popupInfo get updated.
    * @memberOf widgets/DistrictLookup
    **/
    _updateConfig: function () {
      //update layer-details for polygon(precinct) layer
      lang.mixin(this.config.precinctLayerInfo,
        this.appUtils.getLayerDetailsFromMap(
          this.config.precinctLayerInfo.baseURL, this.config.precinctLayerInfo
            .layerId, this.config.precinctLayerInfo.id));
      //update layer-details for related point(polling place) layer
      lang.mixin(this.config.pollingPlaceLayerInfo,
        this.appUtils.getLayerDetailsFromMap(
          this.config.pollingPlaceLayerInfo.baseURL, this.config.pollingPlaceLayerInfo
            .layerId, this.config.pollingPlaceLayerInfo.id));
      //to ensure backward compatibility check if newly added kesy are present in config, if not add default values for it.
      if (!this.config.highlightColor) {
        this.config.highlightColor = "#00FFFF";
      }
    },

    /**
    * This function initialize the widget components
    * @memberOf widgets/DistrictLookup/Widget
    */
    _initWidgetComponents: function () {
      // get webmap response
      this.config.response = this.map.webMapResponse;
      //Create tab containers to show the information and directions, create content-panes etc.
      this._createWidgetUI();
      //init search instance
      this._createSearchInstance();
      //init reverse geocoder
      this._initReverseGeocoder();
      //set all the required layers for widget
      this._setLayers();
      //create tool-tip to be shown on map move
      this._mapTooltip = domConstruct.create("div", {
        "class": "esriCTMapTooltip",
        "innerHTML": this.nls.mouseOverTooltip
      }, this.map.container);
      domStyle.set(this._mapTooltip, "position", "fixed");
      domStyle.set(this._mapTooltip, "display", "none");
      if (this.config.showLocationTool) {
        this._connectSelectLocationHandler();
        domClass.remove(this.selectLocation, "esriCTHidden");
      } else {
        this._connectMapEventHandler();
      }
      this._onWindowResize();
    },

    /**
    * This function handles select location
    * @memberOf widgets/DistrictLookup/Widget
    */
    _connectSelectLocationHandler: function () {
      //handle select location button click event
      on(this.selectLocation, "click", lang.hitch(this, function () {
        if (domClass.contains(this.selectLocation,
          "esriCTSelectLocationActive")) {
          this._disconnectMapEventHandler();
        } else {
          domClass.replace(this.selectLocation,
            "esriCTSelectLocationActive", "esriCTSelectLocation");
          this._connectMapEventHandler();
        }
      }));
    },

    /**
    * This function is used to create UI of widget
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _createWidgetUI: function () {
      var informationPanel;
      //create information panel
      informationPanel = domConstruct.create("div");

      //create nodes to show infowindow contents
      this._pollingPlaceInfoContentDiv = domConstruct.create("div", {
        "class": "esriCTInfoContent esriCTHidden esriCTFisrtInfoContentDiv"
      }, informationPanel);
      this._precinctInfoContentDiv = domConstruct.create("div", {
        "class": "esriCTInfoContent  esriCTHidden"
      }, informationPanel);

      // create contentpane to show infowindow contents for precinct layer
      this._precinctInfoContent = new ContentPane({}, domConstruct.create(
        "div", {}, this._precinctInfoContentDiv));
      this._precinctInfoContent.startup();
      // create contentpane to show infowindow contents for polling-place layer
      this._pollingPlaceInfoContent = new ContentPane({},
        domConstruct
          .create("div", {}, this._pollingPlaceInfoContentDiv));
      this._pollingPlaceInfoContent.startup();

      //Check if routing is enabled in webmap,
      //then only show directions tab otherwise show only infowindow contents
      if (this.map.webMapResponse.itemInfo.itemData.applicationProperties &&
        this.map.webMapResponse.itemInfo.itemData.applicationProperties
          .viewing.routing.enabled) {
        //Create direction panel div
        this._directionPanel = domConstruct.create("div", {
          "class": "esriCTDirectionPanel"
        });
        this.tabContainer = new JimuTabContainer({
          tabs: [{
            title: this.nls.informationTabTitle,
            content: informationPanel
          }, {
            title: this.nls.directionTabTitle,
            content: this._directionPanel
          }]
        }, this.tabContainerPanel);

        this.own(this.tabContainer.on("tabChanged", lang.hitch(this, function (
          tabTitle) {
          if (tabTitle === this.nls.directionTabTitle && !this._routeCalculated) {
            //Create's and display route between selected location and polling place
            this._routeSelectedLocations();
          }
          if (this.id && registry.byId(this.id)) {
            registry.byId(this.id).resize();
          }
        })));
        this.tabContainer.startup();
      } else {
        domClass.add(informationPanel, "esriCTTopBorder");
        domConstruct.place(informationPanel, this.resultsPanel,
          "second");
      }
      //handle back button click
      this.own(on(this.backButtonNode, "click", lang.hitch(this, function () {
        domClass.add(this.resultsPanel, "esriCTHidden");
        domClass.remove(this.featuresListNode, "esriCTHidden");
        this._clearGrahics();
        domClass.add(this._precinctInfoContentDiv,
          "esriCTHidden");
        domClass.add(this._pollingPlaceInfoContentDiv,
          "esriCTHidden");
        //clear Directions
        if (this._directionsWidget) {
          this._directionsWidget.clearDirections();
          // reset the routeCalculated flag to false as directions are cleared now
          this._routeCalculated = false;
        }
        //reselect the information tab
        if (this.tabContainer) {
          this.tabContainer.selectTab(this.nls.informationTabTitle);
        }
      })));
      //create container for polling feature's related records
      this._pollingRelatedRecordsPanel = domConstruct.create("div", {
        "class": "esriCTRelatedRecordPanel"
      }, informationPanel);
      //create container for precint feature's related records
      this._precintRelatedRecordsPanel = domConstruct.create("div", {
        "class": "esriCTRelatedRecordPanel"
      }, informationPanel);
    },

    /**
    * Function to show result panel
    * @memberOf widgets/DistrictLookup/Widget
    */
    _showResultPanel: function () {
      domClass.remove(this.resultsPanel, "esriCTHidden");
      //refresh widget container as the tabs were not getting rendered properly
      if (this.id && registry.byId(this.id)) {
        registry.byId(this.id).resize();
      }
      //reset components after showing result
      this._resetComponents();
    },

    /**
    *  Function used to hide result panel
    *  @memberOf widgets/DistrictLookup/Widget
    */
    _hideResultPanel: function () {
      if (this.resultsPanel) {
        domClass.add(this.resultsPanel, "esriCTHidden");
      }
    },

    /**
    * This function initialize the search widget
    * @memberOf widgets/DistrictLookup/Widget
    */
    _createSearchInstance: function () {
      var searchOptions;
      //set search options
      searchOptions = {
        addLayersFromMap: false,
        autoNavigate: false,
        autoComplete: true,
        minCharacters: 0,
        maxLocations: 5,
        searchDelay: 100,
        enableHighlight: false
      };
      // create an instance of search widget
      this._searchInstance = new SearchInstance({
        searchOptions: searchOptions,
        config: this.config,
        appConfig: this.appConfig,
        nls: this.nls,
        map: this.map
      }, domConstruct.create("div", {}, this.search));
      //handle search widget events
      this.own(this._searchInstance.on("select-result", lang.hitch(this, function (evt) {
        evt.isFeatureFromMapClick = false;
        //now init the workflow
        this._initWorkflow(evt);
      })));
      this.own(this._searchInstance.on("clear-search", lang.hitch(this, this._clearResults)));
      this.own(this._searchInstance.on("search-results", lang.hitch(this, function () {
        this._clearResults(true);
      })));
      this.own(this._searchInstance.on("search-loaded", lang.hitch(this, function () {
        setTimeout(lang.hitch(this, function () {
          //get search container node to resize the search control
          this._searchContainerNodeElement = query(
            ".arcgisSearch .searchGroup .searchInput", this.domNode
          )[0];
          //set _hasMulitpleSourcesInSearch to false if multiple sources are not present
          if (this._searchInstance.search.sources.length < 2) {
            this._hasMulitpleSourcesInSearch = false;
          }
          this._onWindowResize();
        }), 1000);
      })));
      // once widget is created call its startup method
      this._searchInstance.startup();
    },

    /**
    * This function initialize the Locator widget for reverse geocoding
    * @memberOf widgets/DistrictLookup/Widget
    */
    _initReverseGeocoder: function () {
      var geocoderUrl;
      if (this.config.searchSourceSettings && this.config.searchSourceSettings.sources) {
        array.some(this.config.searchSourceSettings.sources, lang.hitch(this, function (source) {
          //if selected source is geocoder create geocoder source else feature layer
          if (source && source.url && source.type === 'locator') {
            geocoderUrl = source.url;
            return true;
          }
        }));
        if (geocoderUrl) {
          this._locatorInstance = new Locator(geocoderUrl);
          this.own(this._locatorInstance.on("location-to-address-complete", lang.hitch(
            this, this._onLocationToAddressComplete)));
        }
      }
    },

    /**
    * Callback handler called once location is reverse goecoded
    * @params{object} result
    * @memberOf widgets/DistrictLookup/Widget
    */
    _onLocationToAddressComplete: function (result) {
      var screenPoint, infoTemplate, addressString;
      //check if address available
      if (result.address && result.address.address) {
        if (result.address.address.Match_addr) {
          addressString = result.address.address.Match_addr;
        } else {
          addressString = "";
          for (var key in result.address.address) {
            if (key !== "Loc_name" && result.address.address[key]) {
              addressString += result.address.address[key] + " ";
            }
          }
          addressString = lang.trim(addressString);
        }
        //set the matched address in search textbox
        if (this._searchInstance) {
          this._searchInstance.setSearchText(addressString);
        }
        //create info-template
        infoTemplate = new InfoTemplate();
        infoTemplate.setContent("${Match_addr}");
        infoTemplate.setTitle(this.nls.searchLocationTitle);
        //clears previous features of the infowindow
        this.map.infoWindow.clearFeatures();
        //set title and content to infowindow
        this.map.infoWindow.setTitle(this.nls.searchLocationTitle);
        this.map.infoWindow.setContent(addressString);
        //show infowindow on selected location
        screenPoint = this.map.toScreen(this._selectedLocation.geometry);
        this.map.infoWindow.show(screenPoint, this.map.getInfoWindowAnchor(
          screenPoint));
      }
    },

    /**
    * This function set's the configured layer
    * @memberOf widgets/DistrictLookup/Widget
    */
    _setLayers: function () {
      //get table data from webmap
      this._tables = this.map.webMapResponse.itemInfo.itemData.tables;
      //Create and  add graphics-layer for highlighting features
      this._highlightGraphicsLayer = new GraphicsLayer();
      this.map.addLayer(this._highlightGraphicsLayer);
      //create new feature layer for precinct
      this._precinctLayer = new FeatureLayer(this.config.precinctLayerInfo
        .url);
      //Set layer definition
      if (this.config.precinctLayerInfo.definitionExpression) {
        this._precinctLayer.setDefinitionExpression(this.config.precinctLayerInfo
          .definitionExpression);
      }
      //Set layer id
      if (this.config.precinctLayerInfo.id) {
        this._precinctLayer.id = this.config.precinctLayerInfo.id;
      }
      //Set layer renderer
      if (this.config.precinctLayerInfo.renderer) {
        this._precinctLayer.setRenderer(rendererJsonUtils.fromJson(
          this.config.precinctLayerInfo.renderer));
      }
      //if popup info available then set the infotemplate
      if (this.config.precinctLayerInfo.popupInfo) {
        this._precinctLayer.setInfoTemplate(new PopupTemplate(
          this.config.precinctLayerInfo.popupInfo));
      }
      //get related table information
      if (this._precinctLayer.loaded) {
        this._precinctLayer.tableInfos = this._getRelatedTableInfo(this._precinctLayer,
          this.config.precinctLayerInfo);
      } else {
        this.own(this._precinctLayer.on("load", lang.hitch(this, function () {
          this._precinctLayer.tableInfos = this._getRelatedTableInfo(
            this._precinctLayer, this.config.precinctLayerInfo);
        })));
      }
      //create new feature layer for polling-place
      this._pollingPlaceLayer = new FeatureLayer(this.config.pollingPlaceLayerInfo
        .url);
      //set layer definition
      if (this.config.pollingPlaceLayerInfo.definitionExpression) {
        this._pollingPlaceLayer.setDefinitionExpression(this.config.pollingPlaceLayerInfo
          .definitionExpression);
      }
      //Set layer id
      if (this.config.pollingPlaceLayerInfo.id) {
        this._pollingPlaceLayer.id = this.config.pollingPlaceLayerInfo.id;
      }
      //Set layer renderer
      if (this.config.pollingPlaceLayerInfo.renderer) {
        this._pollingPlaceLayer.setRenderer(rendererJsonUtils.fromJson(
          this.config.pollingPlaceLayerInfo.renderer));
      }
      //if popup info available then only set the infotemplate
      if (this.config.pollingPlaceLayerInfo.popupInfo) {
        this._pollingPlaceLayer.setInfoTemplate(new PopupTemplate(
          this.config.pollingPlaceLayerInfo.popupInfo));
      }
      //get related table information
      if (this._pollingPlaceLayer.loaded) {
        this._pollingPlaceLayer.tableInfos = this._getRelatedTableInfo(this._pollingPlaceLayer,
          this.config.pollingPlaceLayerInfo);
      } else {
        this.own(this._pollingPlaceLayer.on("load", lang.hitch(this, function () {
          this._pollingPlaceLayer.tableInfos = this._getRelatedTableInfo(
            this._pollingPlaceLayer, this.config.pollingPlaceLayerInfo
          );
        })));
      }
      //get updated filters from layer
      this._updateLayerFilters();
    },

    /**
    * This function initialize the workFlow of searching polling place
    * @memberOf widgets/DistrictLookup/Widget
    */
    _initWorkflow: function (evt) {
      var selectedFeature;
      //clear previous results
      this._clearResults(true);
      //get updated filters from layer
      this._updateLayerFilters();
      //get selected feature
      selectedFeature = this._getSelectedFeatureFromResult(evt);
      this._selectedLocation = selectedFeature;
      //if feature is form map click show the reverse geocoded address
      if (this._locatorInstance && evt.isFeatureFromMapClick &&
        this._selectedLocation && this._selectedLocation.geometry) {
        this._locatorInstance.locationToAddress(webMercatorUtils
          .webMercatorToGeographic(this._selectedLocation.geometry), 100);
      }
      //If selected feature is point only then initialize work-flow to search
      //else only show the selected polygon or polyline on map and show info-window, and set extent of map to selected geometry
      if (selectedFeature && selectedFeature.geometry &&
        selectedFeature.geometry.type === "point") {
        //Show error message if both of the layers don't have popup's enabled
        //else proceed with workflow to get precint polygon
        if (!this._pollingPlaceLayer.infoTemplate && !this._precinctLayer.infoTemplate) {
          this._showMessage(this.nls.allPopupsDisabledMsg);
        }
        else {
          this._getPrecinctPolygon(selectedFeature);
        }
      } else {
        this.map.setExtent(selectedFeature.geometry.getExtent().expand(
          1.5));
      }
    },

    /**
    * This function returns the selected feature from results
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _getSelectedFeatureFromResult: function (evt) {
      var selectedFeature;
      if (evt) {
        if (evt.feature) {
          selectedFeature = evt.feature;
        } else if (evt.result && evt.result.feature) {
          selectedFeature = evt.result.feature;
        }
      }
      return selectedFeature;
    },

    /**
    * This function used to clear results from graphicsLayer, result panel and directions
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _clearResults: function (showInfoWindow) {
      if (this._highlightGraphicsLayer) {
        this._highlightGraphicsLayer.clear();
      }
      //Setting visibility of FeatureListNode to hidden
      if (this.featuresListNode && !domClass.contains(this.featuresListNode,
        "esriCTHidden")) {
        domClass.add(this.featuresListNode, "esriCTHidden");
      }
      //Setting visibility of resultsPanel to hidden
      if (this.resultsPanel && !domClass.contains(this.resultsPanel,
        "esriCTHidden")) {
        domClass.remove(this.resultsPanel, "esriCTHidden");
      }
      //clear Directions
      if (this._directionsWidget) {
        this._directionsWidget.clearDirections();
        // reset the routeCalculated flag to false as directions are cleared now
        this._routeCalculated = false;
      }
      //reselect the information tab
      if (this.tabContainer) {
        this.tabContainer.selectTab(this.nls.informationTabTitle);
      }
      //hide the result panel
      this._hideResultPanel();
      domClass.add(this._precinctInfoContentDiv,
        "esriCTHidden");
      domClass.add(this._pollingPlaceInfoContentDiv,
        "esriCTHidden");
      //clear the selected/searched location and selected pollingPlace
      this._selectedLocation = null;
      this._selectedPollingPlace = null;
      //It clears the list of result
      this._clearFeatureList();
      if (!showInfoWindow) {
        this.map.infoWindow.hide();
      }
      //empty related popup container
      if (this._pollingRelatedRecordsPanel) {
        domConstruct.empty(this._pollingRelatedRecordsPanel);
      }
      if (this._precintRelatedRecordsPanel) {
        domConstruct.empty(this._precintRelatedRecordsPanel);
      }
    },

    /**
    * This function will connects the map event
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _connectMapEventHandler: function () {
      if (!this._mapClickHandler) {
        this._disableWebMapPopup();
        //handle map click
        this._mapClickHandler = this.own(this.map.on("click", lang.hitch(this,
          this._onMapClick)))[0];
        //handle mouse move on map to show tooltip only on non-touch devices
        if ("ontouchstart" in document.documentElement) {
          domStyle.set(this._mapTooltip, "display", "none");
        } else {
          this._mapMoveHandler = this.own(this.map.on("mouse-move", lang.hitch(
            this, this._onMapMouseMove)))[0];
          this.own(this.map.on("mouse-out", lang.hitch(this, function () {
            domStyle.set(this._mapTooltip, "display", "none");
          })));
        }
      }
    },

    /**
    * On map click init the workflow, and reverse geocode the address
    * to show in infowindow at the selected loaction.
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _onMapClick: function (evt) {
      if (this.config.showLocationTool) {
        this._disconnectMapEventHandler();
      }
      this.map.infoWindow.hide();
      //on map click clear the previous text in search textbox
      if (this._searchInstance) {
        this._searchInstance.clearSearchText();
      }
      this._initWorkflow({
        "feature": new Graphic(evt.mapPoint),
        "isFeatureFromMapClick": true
      });
    },

    /**
    * On map mouse move update the toolTip position
    * to show in infowindow at the selected loaction.
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _onMapMouseMove: function (evt) {
      // update the tooltip as the mouse moves over the map
      var px, py;
      if (evt.clientX || evt.pageY) {
        px = evt.clientX;
        py = evt.clientY;
      } else {
        px = evt.clientX + document.body.scrollLeft -
          document.body.clientLeft;
        py = evt.clientY + document.body.scrollTop - document
          .body.clientTop;
      }
      domStyle.set(this._mapTooltip, "display", "none");
      domStyle.set(this._mapTooltip, {
        left: (px + 15) + "px",
        top: (py) + "px"
      });
      domStyle.set(this._mapTooltip, "display", "");
    },

    /**
    * This function will disconnects the map events
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _disconnectMapEventHandler: function () {
      this._enableWebMapPopup();
      if (this.config.showLocationTool) {
        domClass.replace(this.selectLocation,
          "esriCTSelectLocation", "esriCTSelectLocationActive");
      }
      if (this._mapClickHandler) {
        this._mapClickHandler.remove();
        this._mapClickHandler = null;
      }
      if (this._mapMoveHandler) {
        this._mapMoveHandler.remove();
        this._mapMoveHandler = null;
        this._mapTooltip.style.display = "none";
      }
    },

    /**
    * This function will enable the web map popup.
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _enableWebMapPopup: function () {
      if (this.map) {
        this.map.setInfoWindowOnClick(true);
      }
    },

    /**
    * This function will disable the web map popup
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _disableWebMapPopup: function () {
      if (this.map) {
        this.map.setInfoWindowOnClick(false);
      }
    },

    /**
    * This function will get the precinct polygon for the selected/searched location.
    * @params{object} selectedLocation
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _getPrecinctPolygon: function (selectedLocation) {
      var intersectingPolygonQuery;
      //check if valid location is selected, then only perform query
      if (selectedLocation && selectedLocation.geometry) {
        this._loading.show();
        //initialize query
        intersectingPolygonQuery = new esriQuery();
        intersectingPolygonQuery.outFields = ["*"];
        intersectingPolygonQuery.returnGeometry = true;
        intersectingPolygonQuery.geometry = selectedLocation.geometry;
        this._precinctLayer.queryFeatures(intersectingPolygonQuery,
          lang.hitch(this, function (result) {
            var i, rowItem, row;
            //proceed only if precinct polygon is found otherwise show error
            if (result && result.features && result.features.length >
              0) {
              if (result.features.length > 1) {
                this._clearFeatureList();
                this._clearGrahics();
                domClass.remove(this.featuresListNode, "esriCTHidden");
                domClass.remove(this.backButtonNode, "esriCTHidden");
                domClass.add(this.resultsPanel, "esriCTResultsPanelOverrideHeight");
                this.stackedPolygons = result.features;
                for (i = 0; i < result.features.length; i++) {
                  row = domConstruct.create("div", {
                    "class": "esriCTMiddleBorder"
                  }, this.featuresListNode);

                  rowItem = domConstruct.create("div", {
                    "innerHTML": result.features[i].getTitle(),
                    "title": result.features[i].getTitle(),
                    "class": "esriCTlistOfResultPanel"
                  }, row);

                  domConstruct.create("div", {
                    "class": "esriCTItemRighttArrow"
                  }, row);

                  domAttr.set(row, "index", i);
                  this.own(on(row, "click", lang.hitch(this, this.rowClicked)));
                  this._loading.hide();
                }

              }
              else {
                domClass.add(this.backButtonNode, "esriCTHidden");
                domClass.remove(this.resultsPanel, "esriCTResultsPanelOverrideHeight");
                this._showSelectedFeature(result.features[0]);
              }
            } else {
              this._showMessage(this.nls.noPrecinctFoundMsg);
              this._loading.hide();
            }
            //show searched/selected location on map
            this._highlightSelectedLocation(this._selectedLocation);
          }), lang.hitch(this, function () {
            this._loading.hide();
          }));
      } else {
        this._showMessage(this.nls.noPrecinctFoundMsg);
        this._loading.hide();
      }
    },

    /**
    * This function will used at row clicked.
    * @params{object} evt
    * @memberOf widgets/DistrictLookup/Widget
    **/
    rowClicked: function (evt) {
      var rowIndex;
      rowIndex = parseInt(domAttr.get(evt.currentTarget, "index"), 10);
      this._showSelectedFeature(this.stackedPolygons[rowIndex]);
    },

    /**
    * This function will show selected feature in result panel.
    * @params{object} selectedFeature
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _showSelectedFeature: function (selectedFeature) {
      var precinctAttachmentsDiv;
      domClass.add(this.featuresListNode, "esriCTHidden");
      domClass.remove(this.resultsPanel, "esriCTHidden");
      //Highlight Precinct on map
      this._highlightPrecinctPolygon(selectedFeature);
      //Zoom to precinct polygon
      this.map.setExtent(selectedFeature.geometry.getExtent()
        .expand(1.5));
      //Show info content of selected precinct
      if (this._precinctLayer.infoTemplate) {
        domClass.remove(this._precinctInfoContentDiv,
          "esriCTHidden");
        this._precinctInfoContent.set("content", selectedFeature.getContent());
        if (this.id && registry.byId(this.id)) {
          registry.byId(this.id).resize();
        }
        //show attachments if layer has attachments and it is enabled from webmap
        if (this._precinctLayer.hasAttachments && this.config
          .precinctLayerInfo.popupInfo.showAttachments) {
          //Get attachments node from popup (code to remove attachemnts links from popoup)
          precinctAttachmentsDiv = query(
            ".attachmentsSection", this._precinctInfoContentDiv
          );
          if (precinctAttachmentsDiv.length > 0) {
            precinctAttachmentsDiv =
              precinctAttachmentsDiv[0];
            domClass.remove(precinctAttachmentsDiv,
              "hidden");
          }
          //fetch and show thumbnails of the attachments in precinctAttachmentsDiv
          this._showAttachments(selectedFeature,
            precinctAttachmentsDiv, this._precinctLayer
          );
        }
      }
      //get polling place
      this._getRelatedPollingPlaces(selectedFeature);
      this._getRelatedRecords(selectedFeature, false);
    },

    /**
    * Get related table info
    * @param{int} layer index in array
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _getRelatedTableInfo: function (layer, config) {
      var tableInfos = [];
      if (layer) {
        array.forEach(layer.relationships, lang.hitch(this, function (table) {
          array.forEach(this._tables, lang.hitch(this, function (tableData, index) {
            if (tableData.url.replace(/.*?:\/\//g, "") === (config.baseURL + table.relatedTableId).replace(/.*?:\/\//g, "")) {
              if (tableData.popupInfo) {
                //if popup is configure for related table
                if (!tableData.relationshipIds) {
                  tableData.relationshipIds = {};
                }
                tableData.relationshipIds[layer.id] = table.id;
                tableInfos.push(index);
              }
            }
          }));
        }));
      }
      return tableInfos;
    },

    /**
    * Get related record from the layers's respective tables
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _getRelatedRecords: function (selectedFeature, isPollingPlace) {
      var tableInfos, layer, panel, featureId;
      if (selectedFeature) {
        if (isPollingPlace) {
          tableInfos = this._pollingPlaceLayer.tableInfos;
          layer = this._pollingPlaceLayer;
          panel = this._pollingRelatedRecordsPanel;
        } else {
          tableInfos = this._precinctLayer.tableInfos;
          layer = this._precinctLayer;
          panel = this._precintRelatedRecordsPanel;
        }
        if (panel) {
          domConstruct.empty(panel);
        }
        //get related records from polling-place layer
        array.forEach(tableInfos, lang.hitch(this, function (tableIndex) {
          featureId = selectedFeature.attributes[layer.objectIdField];
          this._queryRelatedRecords(layer, this._tables[tableIndex], featureId, panel);
        }));
      }
    },

    /**
    * Query for related records
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _queryRelatedRecords: function (layer, tableInfo, featureId, panel) {
      if (tableInfo && layer) {
        var queryParams = new RelationshipQuery();
        queryParams.objectIds = [parseInt(featureId, 10)];
        queryParams.outFields = ["*"];
        queryParams.relationshipId = tableInfo.relationshipIds[layer.id];
        //if filter is configured in webmap for related table
        if (tableInfo.layerDefinition && tableInfo.layerDefinition.definitionExpression) {
          queryParams.where = tableInfo.layerDefinition.definitionExpression;
        }
        layer.queryRelatedFeatures(queryParams, lang.hitch(this, function (results) {
          var fset, features;
          fset = results[featureId];
          features = fset ? fset.features : [];
          array.forEach(features, lang.hitch(this, function (feature) {
            feature.setInfoTemplate(new PopupTemplate(tableInfo.popupInfo));
            this._showPopupInfo(feature, panel);
          }));
        }));
      }
    },


    /**
    * Show related popup info in information panel
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _showPopupInfo: function (feature, panel) {
      var contentPaneDiv, contentPanePanel, contentPane;
      if (feature) {
        contentPanePanel = domConstruct.create("div", {}, panel);
        contentPane = new ContentPane({ "class": "esriCTPopupInfo" }, contentPaneDiv);
        contentPane.startup();
        contentPane.set("content", feature.getContent());
      }
    },

    /**
    * This function will clear list of feauture's from result panel.
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _clearFeatureList: function () {
      if (this.featuresListNode) {
        this.stackedPolygons = [];
        domConstruct.empty(this.featuresListNode);
      }
    },

    /**
    * clear graphics from map
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _clearGrahics: function () {
      if (this._highlightGraphicsLayer) {
        this._highlightGraphicsLayer.clear();
      }
    },

    /**
    * This function will get the related polling places for the precinct polygon.
    * @params{object} precintPolygon
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _getRelatedPollingPlaces: function (precintPolygon) {
      var relQuery = new RelationshipQuery();
      //set out filed as objectId of the pollingPlace layer
      relQuery.outFields = [this._pollingPlaceLayer.objectIdField];
      relQuery.returnGeometry = true;
      relQuery.relationshipId = this.config.pollingPlaceLayerInfo
        .relationShipId;
      relQuery.definitionExpression = this.config.pollingPlaceLayerInfo
        .definitionExpression;
      //set selected precinct polygon's objectId to get its related polling place
      relQuery.objectIds = [precintPolygon.attributes[this._precinctLayer
        .objectIdField]];
      this._precinctLayer.queryRelatedFeatures(relQuery, lang
        .hitch(this, function (relRecords) {
          var fset, features, selectedPollingPlaceId;
          fset = relRecords[precintPolygon.attributes[this._precinctLayer
            .objectIdField]];
          features = fset ? fset.features : [];
          //considering only first feature as each precinct may have only on polling place.
          if (features.length > 0) {
            selectedPollingPlaceId = features[0].attributes[this._pollingPlaceLayer
              .objectIdField];
            //get the geometry of the selected polling place
            this._getPollingPlacePoint(selectedPollingPlaceId);
          } else {
            this._showMessage(this.nls.noPollingPlaceFoundMsg);
            //as no polling place hide its infoContent and set selectedPollingPlace to null
            domClass.add(this._pollingPlaceInfoContentDiv, "esriCTHidden");
            this._selectedPollingPlace = null;
            this._loading.hide();
          }
        }), lang.hitch(this, function () {
          this._loading.hide();
        }));
    },

    /**
    * This function will get the pollingPlace point for the selected pollingPlace id.
    * @params{object} selectedPollingPlaceId
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _getPollingPlacePoint: function (selectedPollingPlaceId) {
      var pointQuery = new esriQuery();
      pointQuery.outFields = ["*"];
      pointQuery.returnGeometry = true;
      pointQuery.outSpatialReference = this.map.spatialReference;
      pointQuery.objectIds = [selectedPollingPlaceId];
      this._pollingPlaceLayer.queryFeatures(pointQuery, lang
        .hitch(this, function (result) {
          var pollingPlaceAttachmentsDiv;
          if (result && result.features && result.features.length >
            0) {
            //Highlight polling place on map
            this._highlightPollingPlacePoint(result.features[0]);
            //set selected polling place
            this._selectedPollingPlace = result.features[0];
            // set polling-place popup-template
            if (this._pollingPlaceLayer.infoTemplate) {
              domClass.remove(this._pollingPlaceInfoContentDiv,
                "esriCTHidden");
              result.features[0].setInfoTemplate(this._pollingPlaceLayer
                .infoTemplate);
              this._pollingPlaceInfoContent.set("content", result.features[0].getContent());
              //show attachments if layer has attachments and it is enabled from webmap
              if (this._pollingPlaceLayer.hasAttachments && this.config
                .pollingPlaceLayerInfo.popupInfo.showAttachments) {
                pollingPlaceAttachmentsDiv = query(
                  ".attachmentsSection", this._pollingPlaceInfoContentDiv
                )[0];
                domClass.remove(pollingPlaceAttachmentsDiv,
                  "hidden");
                this._showAttachments(result.features[0],
                  pollingPlaceAttachmentsDiv, this._pollingPlaceLayer
                );
              }
              this._getRelatedRecords(result.features[0], true);
            }
            //if any of the layer is having infotempate then show the result panel
            if (this._pollingPlaceLayer.infoTemplate || this._precinctLayer.infoTemplate) {
              this._showResultPanel();
            }
          } else {
            this._showMessage(this.nls.noPollingPlaceFoundMsg);
            //as no polling place hide its infoContent and set selectedPollingPlace to null
            domClass.add(this._pollingPlaceInfoContentDiv, "esriCTHidden");
            this._selectedPollingPlace = null;
            this._loading.hide();
          }
          this._loading.hide();
        }), lang.hitch(this, function () {
          this._loading.hide();
        }));
    },

    /**
    * Function to highlight selected/searched location on map
    * @params{object} selectedFeature
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _highlightSelectedLocation: function (selectedFeature) {
      var symbol;
      if (selectedFeature) {
        // set the graphic symbol for selected point and highlight on map
        symbol = symbolJsonUtils.fromJson(this.config.symbols.graphicLocationSymbol);
        this._selectedLocation = new Graphic(selectedFeature.geometry,
          symbol);
        this._highlightGraphicsLayer.add(this._selectedLocation);
      }
    },

    /**
    * Function to highlight selected precinct polygon on map
    * @params{object} selectedPrecinct
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _highlightPrecinctPolygon: function (selectedPrecinct) {
      //Add precinct graphic on graphicLayer
      var sfs = symbolJsonUtils.fromJson(this.config.symbols.precinctSymbol);
      this._highlightGraphicsLayer.add(new Graphic(selectedPrecinct.geometry,
        sfs));
    },

    /**
    * Function to highlight selected pollingPlace point on map
    * @params{object} selectedPollingPlace
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _highlightPollingPlacePoint: function (selectedPollingPlace) {
      //Add pollingPlace graphic on graphicLayer
      var highlightGraphic = this._getPointSymbol(
        selectedPollingPlace, this._pollingPlaceLayer);
      this._highlightGraphicsLayer.add(highlightGraphic);
    },

    /**
    * This function is used to get symbol for point geometry
    * @param{object} selected feature which needs to be highlighted
    * @param{object} details of selected layer
    * @memberOf widgets/DistrictLookup/Widget
    */
    _getPointSymbol: function (graphic, layer) {
      var symbol, isSymbolFound, graphics, point, graphicInfoValue,
        layerInfoValue, i;
      isSymbolFound = false;
      symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE,
        null, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
          new Color(this.config.highlightColor), 3));
      symbol.setColor(null);
      symbol.size = 30; //set default Symbol size which will be used in case symbol not found.
      //check if layer is valid and have valid renderer object then only check for other symbol properties
      if (layer && layer.renderer) {
        if (layer.renderer.symbol) {
          isSymbolFound = true;
          symbol = this._updatePointSymbolProperties(symbol, layer.renderer.symbol);
        } else if (layer.renderer.infos && (layer.renderer.infos.length > 0)) {
          for (i = 0; i < layer.renderer.infos.length; i++) {
            if (layer.typeIdField) {
              graphicInfoValue = graphic.attributes[layer.typeIdField];
            } else if (layer.renderer.attributeField) {
              graphicInfoValue = graphic.attributes[layer.renderer.attributeField];
            }
            layerInfoValue = layer.renderer.infos[i].value;
            // To get properties of symbol when infos contains other than class break renderer.
            if (graphicInfoValue !== undefined && graphicInfoValue !==
              null && graphicInfoValue !== "" && layerInfoValue !==
              undefined && layerInfoValue !== null && layerInfoValue !==
              "") {
              if (graphicInfoValue.toString() === layerInfoValue.toString()) {
                isSymbolFound = true;
                symbol = this._updatePointSymbolProperties(symbol,
                  layer.renderer.infos[i].symbol);
              }
            }
          }
          if (!isSymbolFound) {
            if (layer.renderer.defaultSymbol) {
              isSymbolFound = true;
              symbol = this._updatePointSymbolProperties(symbol,
                layer.renderer.defaultSymbol);
            }
          }
        }
      }
      point = new Point(graphic.geometry.x, graphic.geometry.y, new SpatialReference({
        wkid: graphic.geometry.spatialReference.wkid
      }));
      graphics = new Graphic(point, symbol, graphic.attributes);
      return graphics;
    },

    /**
    * This function is used to get different data of symbol from infos properties of renderer object.
    * @param{object} symbol that needs to be assigned to selected/activated feature
    * @param{object} renderer layer Symbol
    */
    _updatePointSymbolProperties: function (symbol, layerSymbol) {
      var height, width, size;
      if (layerSymbol.hasOwnProperty("height") && layerSymbol.hasOwnProperty("width")) {
        height = layerSymbol.height;
        width = layerSymbol.width;
        // To display cross hair properly around feature its size needs to be calculated
        size = (height > width) ? height : width;
        size = size + 10;
        symbol.size = size;
      }
      if (layerSymbol.hasOwnProperty("size")) {
        if (!size || size < layerSymbol.size) {
          symbol.size = layerSymbol.size + 10;
        }
      }
      if (layerSymbol.hasOwnProperty("xoffset")) {
        symbol.xoffset = layerSymbol.xoffset;
      }
      if (layerSymbol.hasOwnProperty("yoffset")) {
        symbol.yoffset = layerSymbol.yoffset;
      }
      return symbol;
    },

    /* End of functions to highlight features on map */

    /**
    * Function is used to Attachment attachments
    * @param{object} graphic
    * @param{object} attachmentContainer
    * @param{object} layer
    * @memberOf widgets/DistrictLookup/Widget
    */
    _showAttachments: function (graphic, attachmentContainer, layer) {
      var objectID, fieldContent, imageDiv, imageContent, imagePath,
        i;
      objectID = graphic.attributes[layer.objectIdField];
      domConstruct.empty(attachmentContainer);
      layer.queryAttachmentInfos(objectID,
        lang.hitch(this, function (infos) {
          // if attachments found
          if (infos && infos.length > 0) {
            //Create attachment header text
            domConstruct.create("div", {
              "innerHTML": this.nls.attachmentHeader,
              "class": "esriCTAttachmentHeader"
            }, attachmentContainer);
            fieldContent = domConstruct.create("div", {
              "class": "esriCTThumbnailContainer"
            }, attachmentContainer);
            // display all attached images in thumbnails
            for (i = 0; i < infos.length; i++) {
              imagePath = this.folderUrl +
                "/images/no-attachment.png";
              if (infos[i].contentType.indexOf("image") > -1) {
                imagePath = infos[i].url;
              }
              imageContent = domConstruct.create("span", {
                "class": "esriCTAttachmentHolder col"
              }, fieldContent);
              domClass.add(imageContent, "esriCTImageLoader");
              imageDiv = domConstruct.create("img", {
                "alt": infos[i].url,
                "class": "esriCTAttachmentImg esriCTAutoHeight",
                "src": imagePath
              }, imageContent);
              // Hide loader Image after image loaded
              this.own(on(imageDiv, "load", lang.hitch(this, this._onImageLoad)));
              // Show image in new tab on click of the image thumbnail
              this.own(on(imageDiv, "click", lang.hitch(this, this._displayImageAttachments)));
            }
          }
          registry.byId(this.domNode.parentElement.id).resize();
        }));
    },

    /**
    * This function is used to set the images dimensions so that the complete image will be shown in thumbnail
    * @param{object} imgModule
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _setImageDimensions: function (imgModule) {
      var aspectRatio, newWidth, newHeight, imgHeight, imgContainer =
        imgModule.parentElement;
      if (imgModule && imgModule.offsetHeight > 0) {
        //set original dimensions of image as it max dimensions.
        domAttr.set(imgModule, "originalHeight", imgModule.offsetHeight);
        domStyle.set(imgModule, "maxHeight", imgModule.offsetHeight +
          'px');
        domStyle.set(imgModule, "maxWidth", imgModule.offsetWidth +
          'px');
      }
      imgHeight = parseFloat(domAttr.get(imgModule, "originalHeight"));
      if ((imgContainer.offsetHeight > 0) && (imgContainer.offsetHeight <
        imgModule.offsetHeight || imgHeight > imgContainer.offsetHeight
      )) {
        //change dimensions of image if it is larger/smaller than its parent container.
        //calculate aspect ratio of image.
        aspectRatio = imgModule.offsetWidth / imgModule.offsetHeight;
        //calculate new dimensions according to aspect ratio of image.
        newHeight = imgContainer.offsetHeight - 2;
        newWidth = Math.floor(newHeight * aspectRatio);
        domClass.remove(imgModule, "esriCTAutoHeight");
        //set new dimensions to image.
        domStyle.set(imgModule, "width", newWidth + 'px');
        domStyle.set(imgModule, "height", newHeight + 'px');
      }
    },

    /**
    * This function is used to show attachments in new window when user clicks on the attachment thumbnail
    * @param{object} evt
    * @memberOf widgets/DistrictLookup/Widget
    **/
    _displayImageAttachments: function (evt) {
      window.open(evt.target.alt);
    },

    /**
    * This function is used to notify that image is loaded
    * Hide the image loader once the image is loaded, and set the image dimensions so that complete image will be shown in thumbnail.
    * @param{object} evt
    * @memberOf widgets/DistrictLookup/Widget
    */
    _onImageLoad: function (evt) {
      domClass.remove(evt.target.parentNode, "esriCTImageLoader");
      this._setImageDimensions(evt.target, true);
    },

    /**
    * This function will create the route between selected location and polling place
    * @memberOf widgets/DistrictLookup/Widget
    */
    _routeSelectedLocations: function () {
      var selectedLocations = [], directionParams = {};
      //create the instance of directions widget if not created
      if (!this._directionsWidget) {
        directionParams = {
          map: this.map,
          directionsLengthUnits: esriUnits[this.config.directionLengthUnit.value],
          showTrafficOption: false,
          dragging: false,
          routeSymbol: symbolJsonUtils.fromJson(this.config.symbols
            .routeSymbol),
          routeTaskUrl: this.config.routeService
        };
        //create instance of the direction widget with the configured properties
        this._directionsWidget = new Directions(directionParams, domConstruct.create(
          "div", {}, this._directionPanel));

        this._directionsWidget.startup();
      }
      //handle directions-finish event to resize the widget and hide the loading indicator
      this.own(this._directionsWidget.on("directions-finish", lang.hitch(this,
        function () {
          if (this.id && registry.byId(this.id)) {
            registry.byId(this.id).resize();
          }
          this._loading.hide();
        })));
      //clears previous directions
      this._directionsWidget.clearDirections();
      //check if valid selected/searched location and pollingPlace features
      if (this._selectedLocation && this._selectedPollingPlace) {
        //show loading indicator before creating route
        this._loading.show();
        selectedLocations.push(this._selectedLocation);
        selectedLocations.push(this._selectedPollingPlace);
        // Calling update stops function for showing points on map and calculating direction.
        this._directionsWidget.updateStops(selectedLocations).then(
          lang.hitch(this, function () {
            //Call get directions function ones stops are updated
            this._directionsWidget.getDirections();
            /*Update _routeCalculated flag to 'true' if route gets calculated, so that if user
            * toggles between the information and direction tab,
            * directions for same address should not be calculated again.
            */
            this._routeCalculated = true;
          }), lang.hitch(this, function () {
            this._showMessage(this.nls.failedToGenerateRouteMsg);
            this._loading.hide();
          }));
      }
    },

    /**
    * Window resize handler
    * @memberOf widgets/DistrictLookup/Widget
    */
    _onWindowResize: function () {
      if (this._windowResizeTimer) {
        clearTimeout(this._windowResizeTimer);
      }
      this._windowResizeTimer = setTimeout(lang.hitch(this, this._resetComponents),
        500);
    },

    /**
    * Resets the components of the widgets according to updated size
    * @memberOf widgets/DistrictLookup/Widget
    */
    _resetComponents: function () {
      var containerGeom, calculatedWidth, searchGroup, componentsWithScrollingTouch;
      componentsWithScrollingTouch = [];
      //get search group to override max width overridden by some themes
      searchGroup = query(
        ".arcgisSearch .searchGroup", this.domNode
      )[0];
      //get information and direction tab parent
      componentsWithScrollingTouch = query(
        ".jimu-tab > .jimu-viewstack", this.domNode
      );
      //get main widgets parent
      componentsWithScrollingTouch.push(this.domNode);
      //remove webkit-overflow-scrolling touch
      array.forEach(componentsWithScrollingTouch, lang.hitch(this, function (node) {
        domStyle.set(node, "-webkit-overflow-scrolling", "auto");
      }));
      if (!this._searchContainerNodeElement) {
        this._searchContainerNodeElement = query(
          ".arcgisSearch .searchGroup .searchInput", this.domNode
        )[0];
      }
      //reset the width of search control to fit in available panel width
      if (this.widgetMainNode && this._searchContainerNodeElement) {
        containerGeom = domGeom.position(this.widgetMainNode);
        if (containerGeom && containerGeom.w) {
          calculatedWidth = (containerGeom.w - 144);
          //if search is not having multiple sources it will not display arrow
          if (!this._hasMulitpleSourcesInSearch) {
            calculatedWidth += 32;
          }
          if (calculatedWidth > 0) {
            if (this.config.showLocationTool) {
              calculatedWidth = calculatedWidth - 45;
            }
            //As some of the themes have overridden width of search widget and have applied important priority to it,
            //we need to use style.setProperty method instead of dojo domStyle.
            this._searchContainerNodeElement.style.setProperty('width',
              calculatedWidth + "px", 'important');
            if (searchGroup) {
              searchGroup.style.setProperty('max-width', "100%", 'important');
            }
          }
        }
      }
      //Add webkit-overflow-scrolling touch
      if (componentsWithScrollingTouch.length > 0) {
        setTimeout(lang.hitch(this, function () {
          array.forEach(componentsWithScrollingTouch, lang.hitch(this, function (node) {
            domStyle.set(node, "-webkit-overflow-scrolling", "touch");
          }));
        }), 500);
      }
    }
  });
});
