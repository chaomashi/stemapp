/*global define */
define([
  'dojo/_base/declare',
  'jimu/BaseWidget',
  'dojo/on',
  'dojo/_base/lang',
  'dojo/_base/array',
  './Search',
  'jimu/portalUtils',
  'dojo/query',
  'dojo/dom-class',
  'dojo/dom-attr',
  'dojo/dom-style',
  'dojo/dom-construct',
  'esri/graphic',
  'esri/symbols/jsonUtils',
  'esri/layers/GraphicsLayer',
  'esri/geometry/webMercatorUtils',
  'esri/tasks/locator',
  'esri/InfoTemplate',
  'esri/tasks/query',
  'dojo/dom-geometry',
  'esri/tasks/RelationshipQuery',
  'dojo/Deferred',
  'dojo/promise/all',
  'esri/layers/FeatureLayer',
  './Accordion',
  'esri/symbols/SimpleFillSymbol',
  'esri/symbols/SimpleLineSymbol',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/geometry/Point',
  'esri/geometry/Polyline',
  'esri/geometry/Polygon',
  'esri/SpatialReference',
  'esri/Color',
  'esri/geometry/Extent',
  "esri/geometry/scaleUtils",
  'jimu/dijit/LoadingIndicator',
  'esri/request',
  'esri/renderers/jsonUtils',
  'jimu/LayerInfos/LayerInfos',
  'jimu/utils'
], function (
  declare,
  BaseWidget,
  on,
  lang,
  array,
  SearchInstance,
  portalUtils,
  query,
  domClass,
  domAttr,
  domStyle,
  domConstruct,
  Graphic,
  symbolJsonUtils,
  GraphicsLayer,
  webMercatorUtils,
  Locator,
  InfoTemplate,
  Query,
  domGeom,
  RelationshipQuery,
  Deferred,
  all,
  FeatureLayer,
  AccordionManager,
  SimpleFillSymbol,
  SimpleLineSymbol,
  SimpleMarkerSymbol,
  Point,
  Polyline,
  Polygon,
  SpatialReference,
  Color,
  GeometryExtent,
  scaleUtils,
  LoadingIndicator,
  esriRequest,
  rendererJsonUtils,
  LayerInfos,
  jimuUtils
) {
  return declare([BaseWidget], {

    baseClass: 'jimu-widget-RelatedTableCharts',

    _loading: null, //to store loading indicator instance
    _mapTooltip: null, // MapTooltip Container
    _highlightGraphicsLayer: null, // GraphicLayer to add highlight symbols
    _locatorInstance: null, // Locator instance to reverse geocode the address
    _selectedLocation: null, // Hold searched location
    _operationalLayers: [], //array of configured feature layers
    _autoRefreshInterval: null, //object to hold auto refresh interval timer
    _refreshElapsedTime: null, //date object calculate elapsed time
    _layerInfosObj: null,
    _searchInstance: null, // To store search instance
    _hasMulitpleSourcesInSearch: true, // Set this flag if their are multiple sources in search

    openPanels: [], // array to store opened chart panels

    postCreate: function () {
      this.inherited(arguments);
      this._loading = null;
      this._mapTooltip = null;
      this._highlightGraphicsLayer = null;
      this._locatorInstance = null;
      this._selectedLocation = null;
      this._operationalLayers = [];
      this._autoRefreshInterval = null;
      this._refreshElapsedTime = null;
      this._layerInfosObj = null;
      this._searchInstance = null;
      this._hasMulitpleSourcesInSearch = true;
      this.openPanels = [];
      LayerInfos.getInstance(this.map, this.map.itemInfo).then(lang.hitch(this, function (layerInfosObj) {
        this._layerInfosObj = layerInfosObj;
        //get selected theme's color
        this._getSelectedThemeColor();
        //update config for current webmap properties
        this._updateConfig();
        //create feature layers
        this._loadFeatureLayers();
        if (!this._operationalLayers.length) {
          // add class to accordion container
          domClass.add(this.accordionContainer, "esriCTHidden");
          domClass.remove(this.errorNode, "esriCTHidden");
          domAttr.set(this.errorNode, "innerHTML", this.nls.noChatsConfigured);
        }
        //load the widget Components
        this._initWidgetComponents();
      }));
    },

    startup: function () {
      this.inherited(arguments);
      domClass.add(this.domNode.parentElement, "esriCTOverridePanelStyle");
      this._removeDartThemeCss();
      //connect map click handler if not connected
      if (this.config.generalSettings.showLocationTool) {
        domClass.remove(this.selectLocation, "esriCTHidden");
      } else {
        if (!this._mapClickHandler) {
          this._connectMapEventHandler();
        }
      }
    },

    /**
    * Resize the widget components
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    onOpen: function () {
      this._onWindowResize();
      this._autoRefresh();
      if (!this.config.generalSettings.showLocationTool) {
        this._connectMapEventHandler();
      }
    },

    /**
    * Resize the widget components on widget resize
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    resize: function () {
      this._onWindowResize();
    },

    /**
    * Disconnect map click on widget deactivation
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    onDeActive: function () {
      if (this.config.generalSettings.showLocationTool) {
        this._disconnectMapEventHandler();
      }
    },

    /**
    * Disconnect map click on widget close
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    onClose: function () {
      //disconnect map click
      this._disconnectMapEventHandler();
      // Clear the previous text in search textbox
      if (this._searchInstance) {
        this._searchInstance.clearSearchText();
      }
      this._clearResults();
      if (this._autoRefreshInterval) {
        clearInterval(this._autoRefreshInterval);
      }
    },

    /**
    * This function initialize the widget components
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _initWidgetComponents: function () {
      // get webmap response
      this.config.response = this.map.webMapResponse;
      //initialize loading indicator
      this._initLoading();
      //check whether portal url is available
      if (this.appConfig.portalUrl && lang.trim(this.appConfig.portalUrl) !== "") {
        //get portal info to fetch geometry service Url
        portalUtils.getPortalSelfInfo(this.appConfig.portalUrl).then(lang.hitch(
          this,
          function (portalInfo) {
            // get helper-services from portal
            this.config.helperServices = portalInfo.helperServices;
            //Create search instance
            this._createSearchInstance();
          }), lang.hitch(this, function () {
            //create search instance
            this._createSearchInstance();
          }));
        //connect set location tool button handler if tool is configured
        if (this.config.generalSettings.showLocationTool) {
          this._connectSelectLocationHandler();
        }
      }
      //Create and  add graphics-layer for highlighting features
      this._highlightGraphicsLayer = new GraphicsLayer();
      this.map.addLayer(this._highlightGraphicsLayer);
      //create tool-tip to be shown on map move
      this._mapTooltip = domConstruct.create("div", {
        "class": "esriCTMapTooltip",
        "innerHTML": this.nls.mouseOverTooltip
      }, this.map.container);
      domStyle.set(this._mapTooltip, "position", "fixed");
      domStyle.set(this._mapTooltip, "display", "none");
      //reset the widget's components on window resize and on widget open
      on(window, 'resize', lang.hitch(this, this._onWindowResize));
    },

    /**
    * This function used for loading indicator
    */
    _initLoading: function () {
      this._loading = new LoadingIndicator({
        hidden: true
      });
      this._loading.placeAt(this.domNode);
      this._loading.startup();
    },

    /**
    * This function initialize the search widget
    * @memberOf widgets/RelatedTableCharts/Widget.js
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
        map: this.map
      }, domConstruct.create("div", {}, this.searchDiv));
      //handle search widget events
      this._searchInstance.on("select-result", lang.hitch(this, function (evt) {
        evt.isFeatureFromMapClick = false;
        //now init the workflow
        this._initWorkflow(evt);
      }));
      this._searchInstance.on("clear-search", lang.hitch(this, this._clearResults));
      this._searchInstance.on("search-results", lang.hitch(this, this._clearResults));
      this._searchInstance.on("search-loaded", lang.hitch(this, function () {
        setTimeout(lang.hitch(this, function () {
          //initialize reverse geocoder
          this._initReverseGeocoder();

          //get search container node to resize the search control
          this.searchContainerNodeElement = query(
            ".jimu-widget-RelatedTableCharts .arcgisSearch .searchGroup .searchInput"
          )[0];
          //set _hasMulitpleSourcesInSearch to false if multiple sources are not present
          if (this._searchInstance.search.sources.length < 2) {
            this._hasMulitpleSourcesInSearch = false;
          }
          //Reduce size of suggetion box only in smartphones
          if (window.appInfo.isRunInMobile && this._searchInstance.search &&
            this._searchInstance.search.suggestionsNode) {
            domStyle.set(this._searchInstance.search.suggestionsNode, "height",
              "110px");
          }
          this._onWindowResize();
          //override style according to theme
          this.setTheme();
        }), 1000);
      }));
      // once widget is created call its startup method
      this._searchInstance.startup();
    },

    /**
    * Removes the style sheet
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _removeDartThemeCss: function () {
      var styleSheet, i;
      //if selected theme is not dart theme check if we have added dartTheme css and remove it
      styleSheet = query('link[href="' + this.folderUrl + '/css/DartTheme.css"]');
      if (styleSheet && styleSheet.length > 0) {
        for (i = 0; i < styleSheet.length; i++) {
          if (domAttr.get(styleSheet[i], "StyleSheetID") === this.baseClass + "-dartThemeStyle") {
            styleSheet[i].parentNode.removeChild(styleSheet[0]);
          }
        }
      }
    },

    /**
    * This function overrides the style according to different theme
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    setTheme: function () {
      var head, link;
      if (this.appConfig.theme.name === "DartTheme") {
        //add style sheet for dart theme
        head = query("head")[0];
        link = domConstruct.create('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = this.folderUrl + "/css/DartTheme.css";
        link.media = 'all';
        domAttr.set(link, "StyleSheetID", this.baseClass + "-dartThemeStyle");
        head.appendChild(link);
      }
    },

    /**
    * This function will connects the map event
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _connectMapEventHandler: function () {
      if (!this._mapClickHandler) {
        this._disableWebMapPopup();
        //handle map click
        this._mapClickHandler = this.map.on("click", lang.hitch(this,
          this._onMapClick));
        //handle mouse move on map to show tooltip only on non-touch devices
        if ("ontouchstart" in document.documentElement) {
          domStyle.set(this._mapTooltip, "display", "none");
        } else {
          this._mapMoveHandler = this.map.on("mouse-move", lang.hitch(
            this, this._onMapMouseMove));
          this.map.on("mouse-out", lang.hitch(this, function () {
            domStyle.set(this._mapTooltip, "display", "none");
          }));
        }
        //handle extent change event to show popup near the selected location
        this._extentChangeHandler = this.map.on("extent-change", lang.hitch(
          this, this._onExtentChange));
      }
    },

    /**
    * On map click init the workflow, and reverse geocode the address
    * to show in infowindow at the selected location.
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _onMapClick: function (evt) {
      if (this.config.generalSettings.showLocationTool) {
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
    * @memberOf widgets/RelatedTableCharts/Widget.js
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
    * check whether info popup is opened and set its location on map
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _onExtentChange: function () {
      if (this._selectedLocation && this.map.infoWindow && this.map.infoWindow.isShowing) {
        var screenPoint = this.map.toScreen(this._selectedLocation.geometry);
        this.map.infoWindow.show(screenPoint, this.map.getInfoWindowAnchor(
          screenPoint));
      }
    },

    /**
    * This function will disconnects the map events
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _disconnectMapEventHandler: function () {
      this._enableWebMapPopup();
      domClass.replace(this.selectLocation, "esriCTSelectLocation",
        "esriCTSelectLocationActive");
      if (this._mapClickHandler) {
        this._mapClickHandler.remove();
        this._mapClickHandler = null;
      }
      if (this._mapMoveHandler) {
        this._mapMoveHandler.remove();
        this._mapMoveHandler = null;
        this._mapTooltip.style.display = "none";
      }
      if (this._extentChangeHandler) {
        this._extentChangeHandler.remove();
      }
    },

    /**
    * This function will enable the web map popup.
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _enableWebMapPopup: function () {
      if (this.map) {
        this.map.setInfoWindowOnClick(true);
      }
    },

    /**
    * This function will disable the web map popup
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _disableWebMapPopup: function () {
      if (this.map) {
        this.map.setInfoWindowOnClick(false);
      }
    },

    /**
    * Window resize handler
    * @memberOf widgets/RelatedTableCharts/Widget.js
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
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _resetComponents: function () {
      var containerGeom, calculatedWidth, searchGroup;
      //get search group to override max width overridden by some themes
      searchGroup = query(
        ".jimu-widget-RelatedTableCharts .arcgisSearch .searchGroup"
      )[0];
      if (!this.searchContainerNodeElement) {
        this.searchContainerNodeElement = query(
          ".jimu-widget-RelatedTableCharts .arcgisSearch .searchGroup .searchInput"
        )[0];
      }
      //reset the width of search control to fit in available panel width
      if (this.widgetMainNode && this.searchContainerNodeElement) {
        containerGeom = domGeom.position(this.widgetMainNode);
        if (containerGeom && containerGeom.w) {
          calculatedWidth = (containerGeom.w - 144);
          //if search is not having multiple sources it will not display arrow
          if (!this._hasMulitpleSourcesInSearch) {
            calculatedWidth += 32;
          }
          if (calculatedWidth > 0) {
            //As some of the themes have overridden width of search widget and have applied important priority to it,
            //we need to use style.setProperty method instead of dojo domStyle.
            if (this.config.generalSettings.showLocationTool) {
              calculatedWidth = calculatedWidth - 45;
            }
            this.searchContainerNodeElement.style.setProperty('width',
              calculatedWidth + "px", 'important');
            if (searchGroup) {
              searchGroup.style.setProperty('max-width', "100%", 'important');
            }
          }
        }
      }
      //resize contents of accordion pane
      if (this.accordionPanel) {
        this.accordionPanel.resizeContents();
      }
    },
    /* End of functions for handling events*/

    /* Functions for reverse geocoding */

    /**
    * This function initialize the Locator widget for reverse geocoding
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _initReverseGeocoder: function () {
      var geocoderUrl;
      //set the first geocoder from configured search source settings for reverse geocoding
      if (this.config.searchSourceSettings && this.config.searchSourceSettings.sources) {
        array.some(this.config.searchSourceSettings.sources, lang.hitch(this, function (source) {
          //if selected source is geocoder create geocoder source else feature layer
          if (source && source.url && source.type === 'locator') {
            geocoderUrl = source.url;
            return true;
          }
        }));
        if (geocoderUrl) {
          //create the locator instance to reverse geocode the address
          this._locatorInstance = new Locator(geocoderUrl);
          this.own(this._locatorInstance.on("location-to-address-complete", lang.hitch(
            this, this._onLocationToAddressComplete)));
        }
      }
    },

    /**
    * Callback handler called once location is reverse goecoded
    * @params{object} result
    * @memberOf widgets/RelatedTableCharts/Widget.js
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
        infoTemplate.setTitle(this.nls.addressInfowindowTitle);
        //clears previous features of the infowindow
        this.map.infoWindow.clearFeatures();
        //set title and content to infowindow
        this.map.infoWindow.setTitle(this.nls.addressInfowindowTitle);
        this.map.infoWindow.setContent(addressString);
        //show infowindow on selected location
        screenPoint = this.map.toScreen(this._selectedLocation.geometry);
        this.map.infoWindow.show(screenPoint, this.map.getInfoWindowAnchor(
          screenPoint));
        this.map.infoWindow.isShowing = true;
      }
    },
    /* End of functions for reverse geocoding */

    /**
    * This function updates the layer-details of the configured layers from current webmap properties
    * properties such as layerName, layerDefinations, popupInfo get updated.
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _updateConfig: function () {
      array.forEach(this.config.charts, lang.hitch(this, function (layerData) {
        var tableInfo;
        //update layer-details for layer
        lang.mixin(layerData.layerDetails.polygonLayerInfo,
          this._getLayerDetailsFromMap(layerData.layerDetails.polygonLayerInfo.baseURL,
            layerData.layerDetails.polygonLayerInfo.layerId));
        tableInfo = this._getTableDetailsFromMap(layerData.layerDetails.relatedLayerInfo.baseURL,
          layerData.layerDetails.relatedLayerInfo.layerId);
        if (Object.keys(tableInfo).length === 0) {
          tableInfo = this._getLayerDetailsFromMap(layerData.layerDetails.relatedLayerInfo.baseURL,
            layerData.layerDetails.relatedLayerInfo.layerId);
        }
        lang.mixin(layerData.layerDetails.relatedLayerInfo, tableInfo);
      }));
    },
    /*Functions to handle widget workflow */

    /**
    * load configured layers as feature layers
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _loadFeatureLayers: function () {
      var featureLayer, i;
      this._operationalLayers = [];
      //reset open panels array
      this.openPanels = [];
      //reset highlighted feature index
      this.config.charts.highlightedChartIndex = 0;
      for (i = 0; i < this.config.charts.length; i++) {
        if (this.config.charts[i].layerDetails.polygonLayerInfo.url) {
          //initialize feature layer
          featureLayer = new FeatureLayer(this.config.charts[i].layerDetails
            .polygonLayerInfo.url);
          featureLayer.title = this.config.charts[i].layerDetails.polygonLayerInfo
            .title;
          //set definition expression configured in webmap
          if (this.config.charts[i].layerDetails.polygonLayerInfo.definitionExpression) {
            featureLayer.setDefinitionExpression(this.config.charts[i].layerDetails
              .polygonLayerInfo.definitionExpression);
          }
          //set renderer configured in webmap
          if (this.config.charts[i].layerDetails.polygonLayerInfo.renderer) {
            featureLayer.setRenderer(rendererJsonUtils.fromJson(
              this.config.charts[i].layerDetails.polygonLayerInfo.renderer));
          }
          this._operationalLayers.push(featureLayer);
        }
      }
    },

    /**
    * This function returns the selected feature from results
    * @memberOf widgets/RelatedTableCharts/Widget.js
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
    * set current geocoder source URL
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _getSelectedGeocoder: function (evt) {
      var geocoderSourceURL;
      if (evt.source && evt.source.featureLayer) {
        geocoderSourceURL = evt.source.featureLayer.url;
      }
      return geocoderSourceURL;
    },

    destroy: function () {
      this._clearResults();
      this.inherited(arguments);
    },
    /**
    * This function initialize the workFlow of searching
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _initWorkflow: function (evt) {
      var selectedFeature, geocoderSourceURL;
      //clear previous results
      this._clearResults();
      //get geocoder source URL
      geocoderSourceURL = this._getSelectedGeocoder(evt);
      //get selected feature
      selectedFeature = this._getSelectedFeatureFromResult(evt);
      this._prevFeature = {
        "feature": selectedFeature,
        "isFeatureFromMapClick": selectedFeature ? evt.isFeatureFromMapClick : false
      };
      if (evt && evt.source && evt.source.zoomScale) {
        this._prevFeature.zoomScale = evt.source.zoomScale;
      }

      this._selectedLocation = selectedFeature;
      //if feature is form map click show the reverse geocoded address
      if (evt.isFeatureFromMapClick && this._selectedLocation &&
        this._selectedLocation.geometry) {
        if (this._locatorInstance) {
          this._locatorInstance.locationToAddress(
            webMercatorUtils.webMercatorToGeographic(this._selectedLocation.geometry),
            100);
        }
      }
      //If selected feature is point only then initialize work-flow to search
      //else only show the selected polygon or polyline on map and show info-window, and set extent of map to selected geometry
      if (selectedFeature && selectedFeature.geometry) {
        if (selectedFeature.geometry.type === "point") {
          this._highlightSelectedLocation(selectedFeature, true);
          // to handle zoom of search location
          this.zoomToFeature();
        } else {
          this.map.setExtent(selectedFeature.geometry.getExtent().expand(
            1.5));
        }
        if (geocoderSourceURL) {
          this._updateOpenPanels(geocoderSourceURL);
        }
        this._loadFeatures(this._selectedLocation);
      }
    },

    /**
    * Based of searched location zooms to the location based on geometry type
    * @memberOf widgets/NearMe/Widget
    */
    zoomToFeature: function () {
      var extent, zoomScale, featureGeometry;
      featureGeometry = this._prevFeature.feature.geometry;
      //check if selected search location is point or not
      if (featureGeometry.type === "point") {
        //get the configured zoomScale
        if (this._prevFeature.hasOwnProperty('zoomScale')) {
          zoomScale = this._prevFeature.zoomScale;
        }
        //check if current map scale is out of zoomScale
        if (zoomScale && this.map.getScale() > zoomScale) {
          extent = scaleUtils.getExtentForScale(
            this.map, this._prevFeature.zoomScale).centerAt(featureGeometry);
        } else {
          extent = this.map.extent.centerAt(featureGeometry);
          if (!extent) {
            extent = this.pointToExtent(this.map, featureGeometry, 20);
          }
        }
      } else {
        //in case of geometries other than point get the extent of geometry
        extent = featureGeometry.getExtent().expand(1.5);
      }
      //set map extent to the calculated extent
      if (extent) {
        setTimeout(lang.hitch(this, function () {
          this.map.setExtent(extent);
        }), 100);
      }
    },

    /**
     * Returns extent for a point based in tolerance in pixel & maps extent
     * @memberOf widgets/RelatedTableCharts/Widget
     */
    pointToExtent: function (map, point, toleranceInPixel) {
      //calculate map coords represented per pixel
      var pixelWidth = map.extent.getWidth() / map.width;
      //calculate map coords for tolerance in pixel
      var toleranceInMapCoords = toleranceInPixel * pixelWidth;
      //calculate & return computed extent
      return new GeometryExtent(point.x - toleranceInMapCoords,
        point.y - toleranceInMapCoords,
        point.x + toleranceInMapCoords,
        point.y + toleranceInMapCoords,
        map.spatialReference);
    },

    /**
    * check if selected geocoder source is available in operational layer list
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _updateOpenPanels: function (layerUrl) {
      var isFeatureLayer;
      //empty array of open chart panel
      this.openPanels = [];
      array.forEach(this._operationalLayers, lang.hitch(this, function (layer, index) {
        //check whether operational layer is currently selected as geocoder
        if (layerUrl === layer.url) {
          //push respective chart into openPanel list
          this.openPanels.push("Chart" + index);
          isFeatureLayer = true;
        }
      }));
      return isFeatureLayer;
    },

    /**
    * This function used to clear results from graphicsLayer, result panel and directions
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _clearResults: function () {
      if (this._highlightGraphicsLayer) {
        this._highlightGraphicsLayer.clear();
      }
      //clear the selected/searched location
      this._selectedLocation = null;
      // add class to accordion container
      if (this.accordionContainer) {
        domClass.add(this.accordionContainer, "esriCTHidden");
      }
      //clear auto refresh timers
      this._clearTimer();
    },

    /**
    * This function used to load features
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _loadFeatures: function (selectedLocation) {
      var defArray = [], isDataAvailable = false;
      //show loading
      this._loading.show();
      //Loop all configured charts (operational layers)
      array.forEach(this.config.charts, lang.hitch(this, function (
        currentChart, index) {
        var def = new Deferred();
        //get intersecting for each layer
        //on completion update the add the charData in config
        this._getIntersectingFeatures(selectedLocation, index, def).then(
          lang.hitch(this, function (chartData) {
            currentChart.chartData = chartData;
            if (!isDataAvailable && chartData) {
              isDataAvailable = true;
            }
            if (!chartData) {
              currentChart.selectedFeature = null;
            }
          }));
        defArray.push(def);
      }));

      //Initialize accordion container after creating data for all the configured charts
      all(defArray).then(lang.hitch(this, lang.hitch(this, function () {
        if (isDataAvailable) {
          domClass.add(this.errorNode, "esriCTHidden");
          domClass.remove(this.accordionContainer, "esriCTHidden");
          this._initAccordionPane();
          //reset timer as new result is shown
          this._resetTimer();
        } else {
          //if no data available then reset chat array
          if (this.accordionPanel) {
            this.accordionPanel.chartArray = [];
          }
          domClass.add(this.accordionContainer, "esriCTHidden");
          domClass.remove(this.errorNode, "esriCTHidden");
        }
        //hide loading
        this._loading.hide();
      })));
    },

    /**
    * Initialize accordion container
    * @memberOf RelatedTableCharts/Widget.js
    **/
    _initAccordionPane: function () {
      domConstruct.empty(this.accordionContainer);
      this.accordionPanel = new AccordionManager({
        nls: this.nls,
        config: this.config,
        openPanels: this.openPanels,
        node: this.accordionContainer
      });
      on(this.accordionPanel, "chartSelected", lang.hitch(this, function (
        selectedChartIndex) {
        //hide all chart layers
        this._hideAllChartLayers();
        if (this._operationalLayers[selectedChartIndex]) {
          //display respective layer on map if it is not visible
          this._showHideChartLayer(this._operationalLayers[
            selectedChartIndex].url, true);
        }
        //set extent of the map to the selected chart's feature
        if (this.config.charts[selectedChartIndex].selectedFeature) {
          if (this.config.charts[selectedChartIndex].selectedFeature.geometry
            .type === "point") {
            this.map.centerAndZoom(this.config.charts[
              selectedChartIndex].selectedFeature.geometry);
          } else {
            this.map.setExtent(this.config.charts[selectedChartIndex]
              .selectedFeature.geometry.getExtent()
              .expand(1.5));
          }
          //clear previous graphic and highlight new graphic
          this._highlightGraphicsLayer.clear();
          this._highlightSelectedLocation(this._selectedLocation,
            false);
          this._highlightSelectedChartFeature(selectedChartIndex);
        }
      }));
      this.accordionPanel.initAccordionPane();
    },

    _hideAllChartLayers: function () {
      var i;
      for (i = 0; i < this._operationalLayers.length; i++) {
        this._showHideChartLayer(this._operationalLayers[i].url, false);
      }
    },

    /**
    * This function compare 2 urls by match their protocol http/https
    **/
    _matchURLS: function (url1, url2) {
      //force both the url to have https
      if (url1 && url1.indexOf("https") !== 0) {
        url1 = url1.replace("http", "https");
      }
      if (url2 && url2.indexOf("https") !== 0) {
        url2 = url2.replace("http", "https");
      }
      return url1 === url2;
    },

    /**
    * Show chart layer on map
    * @params{string} layerUrl
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _showHideChartLayer: function (layerUrl, visibility) {
      var layer, lastChar, mapLayerUrl, layerUrlIndex, visibleLayers, visibleLayerIndex;
      layerUrlIndex = layerUrl.split('/');
      layerUrlIndex = layerUrlIndex[layerUrlIndex.length - 1];
      for (layer in this.map._layers) {
        if (this.map._layers.hasOwnProperty(layer)) {
          //check if layer is visible on map
          if (this._matchURLS(this.map._layers[layer].url, layerUrl)) {
            //show or hide chart layer on map
            this.map._layers[layer].setVisibility(visibility);
          } else if (this.map._layers[layer].visibleLayers) {
            //check for map server layer
            lastChar = this.map._layers[layer].url[this.map._layers[layer].url.length - 1];
            //create url for map server layer
            if (lastChar === "/") {
              mapLayerUrl = this.map._layers[layer].url + layerUrlIndex;
            } else {
              mapLayerUrl = this.map._layers[layer].url + "/" + layerUrlIndex;
            }
            if (this._matchURLS(mapLayerUrl, layerUrl)) {
              //check whether layer is available in mp server's visible layer array
              visibleLayers = this.map._layers[layer].visibleLayers;
              visibleLayerIndex = array.indexOf(visibleLayers, parseInt(layerUrlIndex, 10));
              if (visibility) {
                //show layer on map if it is not visible
                if (visibleLayerIndex === -1) {
                  visibleLayers.push(parseInt(layerUrlIndex, 10));
                }
              }
              else {
                //hide layer on map if it is visible
                if (visibleLayerIndex !== -1) {
                  visibleLayers.splice(visibleLayerIndex, 1);
                }
              }
              this.map._layers[layer].setVisibleLayers(visibleLayers);
            }
          }
        }
      }
    },

    /**
    * This function will get the features intersecting the selected/searched location.
    * @params{object} selectedLocation
    * @params{object} selectedIndex
    * @params{object} Deferred object
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _getIntersectingFeatures: function (selectedLocation, selectedIndex, def) {
      var featureLayer, intersectingFeaturesQuery, featureGeometry;
      featureLayer = this._operationalLayers[selectedIndex];
      // reset selected feature
      this.config.charts[selectedIndex].selectedFeature = null;
      //if selected geometry is point get its extent
      //else if geometry is polygon get its centroid
      //else directly use geometry
      if (selectedLocation.geometry.type === "point" && featureLayer.geometryType ===
        "esriGeometryPoint") {
        featureGeometry = this._extentFromPoint(selectedLocation.geometry).centerAt(
          selectedLocation.geometry);
      } else if (selectedLocation.geometry.type === "polygon") {
        featureGeometry = selectedLocation.geometry.getCentroid();
      } else {
        featureGeometry = selectedLocation.geometry;
      }
      //check if valid location is selected, then only perform query
      if (featureGeometry) {
        //initialize query
        intersectingFeaturesQuery = new Query();
        intersectingFeaturesQuery.outFields = ["*"];
        intersectingFeaturesQuery.returnGeometry = true;
        intersectingFeaturesQuery.geometry = featureGeometry;
        featureLayer.queryFeatures(intersectingFeaturesQuery,
          lang.hitch(this, function (result) {
            var selectedObjectID;
            //proceed only if feature is found otherwise resolve the deferred
            if (result && result.features && result.features.length >
              0) {
              //get selected feature objectid
              if (result.features[0].attributes) {
                //set selected feature in config
                this.config.charts[selectedIndex].selectedFeature = result.features[0];
                selectedObjectID = result.features[0].attributes[featureLayer.objectIdField];
                this._getRelatedRecords(def, selectedIndex, selectedObjectID);
              } else {
                def.resolve();
              }
            }
            else {
              def.resolve();
            }
          }), lang.hitch(this, function () {
            def.resolve();
          }));
      } else {
        def.resolve();
      }
      return def;
    },

    /**
    * get extent from mappoint
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _extentFromPoint: function (point) {
      var centerPoint, mapWidth, pixelWidth, tolerance;
      centerPoint = new Point(point.x, point.y, this.map.spatialReference);
      mapWidth = this.map.extent.getWidth();
      //Divide width in map units by width in pixels
      pixelWidth = mapWidth / this.map.width;
      //Calculate a 10 pixel envelope width (5 pixel tolerance on each side)
      tolerance = 20 * pixelWidth;
      //Build tolerance envelope and return it
      return new GeometryExtent(1, 1, tolerance, tolerance, this.map.spatialReference);
    },

    /**
    * Fetches related records of the selected feature and creates chart data based on the configuration
    * @param {object} currentObject: current chart settings object
    * @param {int} selectedFeatureID: object id of selected feature
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _getRelatedRecords: function (def, selectedIndex, selectedFeatureID) {
      var relQuery, currentObject, isLabelFieldDate = false;
      currentObject = this.config.charts[selectedIndex];
      relQuery = new RelationshipQuery();
      relQuery.outFields = ["*"];
      relQuery.objectIds = [selectedFeatureID];
      relQuery.returnGeometry = false;
      relQuery.relationshipId = currentObject.layerDetails.relatedLayerInfo
        .relationShipId;
      //set layer definition from the webmap in query
      if (this.config.charts[selectedIndex].layerDetails.relatedLayerInfo.definitionExpression) {
        relQuery.where = this.config.charts[selectedIndex].layerDetails.relatedLayerInfo
          .definitionExpression;
      }
      if (currentObject.chartConfig.labelField !== "esriCTEmptyOption") {
        isLabelFieldDate = array.some(this.config.charts[selectedIndex].layerDetails
          .relatedLayerInfo.fields, lang.hitch(this, function (field) {
            if (field.name === currentObject.chartConfig.labelField &&
              field.type === "esriFieldTypeDate") {
              return true;
            }
          }));
      }
      //query related features
      this._operationalLayers[selectedIndex].queryRelatedFeatures(relQuery,
        lang.hitch(this, function (relRecords) {
          var fset, features;
          fset = relRecords[selectedFeatureID];
          features = fset ? fset.features : [];
          //If selected feature has related records proceed and create chart data
          if (features.length > 0) {
            if (currentObject.chartConfig.chartType !== "PolarChart") {
              this._createChartData(currentObject, features, isLabelFieldDate, def);
            } else {
              this._createPolarChartData(currentObject, features, selectedIndex, def);
            }
          } else {
            def.resolve();
          }
        }),
        function () {
          def.resolve();
        });
    },

    /**
    * create chart data to generate polar graph
    * @param {object} currentObject: current chart settings object
    * @param {array} features: query response
    * @param {boolean} isLabelFieldDate: flag to check label field
    * @param {object} def: deferred object
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _createChartData: function (currentObject, features, isLabelFieldDate, def) {
      var chartData = {
        chartSeries: [],
        chartLabels: []
      }, i;
      array.forEach(features, lang.hitch(this, function (currentFeature, index) {
        var chartLabels = {}, chartSeries = {}, labelValue = "", addToChartData, tableFieldInfos, fieldDetails,
          displayTime;
        addToChartData = true;
        chartSeries.y = currentFeature.attributes[
          currentObject.chartConfig.dataSeriesField];
        //added spaces in tooltip to fix width issue
        chartSeries.tooltip = currentFeature.attributes[
          currentObject.chartConfig.dataSeriesField] +
          "&nbsp;&nbsp;&nbsp;&nbsp;";
        chartLabels = {
          "value": index + 1,
          "y": currentFeature.attributes[currentObject.chartConfig
            .dataSeriesField]
        };
        //if label field is not configured set the value as as empty else set from attributes
        if (currentObject.chartConfig.labelField === "esriCTEmptyOption") {
          labelValue = "";
        } else {
          //check if value of the configured field is zero them set 0 in label
          if (currentFeature.attributes[currentObject.chartConfig.labelField] === 0) {
            labelValue = 0;
          } else {
            //if configured field type is date then convert the epoch date to locale date else set the value for attributes
            if (isLabelFieldDate) {
              tableFieldInfos = currentObject.layerDetails.relatedLayerInfo.popupInfo.fieldInfos;
              if (jimuUtils.has('ie') || jimuUtils.has('edge')) {
                array.forEach(tableFieldInfos, lang.hitch(this, function (tableFieldInfo) {
                  if (tableFieldInfo.fieldName === currentObject.chartConfig.labelField) {
                    fieldDetails = tableFieldInfo;
                  }
                }));
              } else {
                fieldDetails = tableFieldInfos.find(function (tableFieldInfo) {
                  return tableFieldInfo.fieldName === currentObject.chartConfig.labelField;
                });
              }
              displayTime = false;
              if (fieldDetails.format.dateFormat.toLowerCase().indexOf("time") > -1) {
                displayTime = true;
              }
              labelValue = this._getLocaleFormatedDate(currentFeature.attributes[
                currentObject.chartConfig.labelField], displayTime);
            } else {
              labelValue = currentFeature.attributes[currentObject.chartConfig
                .labelField] || "";
            }
          }
          //set sort value which will be used to sort chart data
          chartLabels.sortValue = currentFeature.attributes[currentObject.chartConfig.
            labelField] || "";
          chartSeries.sortValue = currentFeature.attributes[currentObject.chartConfig.
            labelField] || "";
        }
        chartLabels.text = labelValue;
        chartSeries.text = labelValue;
        //text in charts always should be string, so add empty string to it
        chartLabels.text = chartLabels.text + "";
        if (currentObject.chartConfig.chartColor.colorType ===
          "ColorByFieldValue") {
          chartSeries.fill = this._getColorForFieldValue(
            currentFeature.attributes[currentObject.chartConfig
              .chartColor.colorInfo.layerField],
            currentObject);
        }
        //After API upgrade to 3.20 pie-chart rendering fails if mulitple values are -ve/0
        //So if the value is -ve/0 don't add the feature details in chart data
        if (currentObject.chartConfig.chartType === "PieChart" && chartSeries.y <= 0) {
          addToChartData = false;
        }
        if (addToChartData) {
          chartData.chartLabels.push(chartLabels);
          chartData.chartSeries.push(chartSeries);
        }
      }));
      if (currentObject.chartConfig.labelField !== "esriCTEmptyOption") {
        //Sort chart data according to text(labels)
        chartData.chartLabels.sort(this._sortChartData);
        chartData.chartSeries.sort(this._sortChartData);
        //as we have sorted chart data the values need to organized again
        for (i = 0; i < chartData.chartLabels.length; i++) {
          chartData.chartLabels[i].value = i + 1;
        }
      }
      //set the configured color settings for chart
      this._setChartColorSettings(def, chartData, currentObject);
    },

    /**
    * create chart data to generate polar graph
    * @param {object} currentObject: current chart settings object
    * @param {array} features: query response
    * @param {object} def: deferred object
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _createPolarChartData: function (currentObject, features, selectedIndex, def) {
      var chartData = {
        chartSeries: [],
        chartLabels: []
      }, fieldInfos, objectIdField, orderfield;

      if (currentObject.chartConfig.chartColor.colorType ===
        "ColorByFieldValue") {
        orderfield = currentObject.chartConfig.chartColor.colorInfo.layerField;
        features.sort(function (a, b) {
          if (b.attributes[orderfield] > a.attributes[orderfield]) {
            return -1;
          }
          if (b.attributes[orderfield] < a.attributes[orderfield]) {
            return 1;
          }
          return 0;
        });
      }
      fieldInfos = currentObject.chartConfig.polarChartConfig;
      objectIdField = this._operationalLayers[selectedIndex].objectIdField;
      array.forEach(features, lang.hitch(this, function (currentFeature) {
        var key = {}, dataObj = {}, chartSeries = {}, obj = {};
        for (key in fieldInfos) {
          dataObj[fieldInfos[key].alias] = currentFeature.attributes[fieldInfos[key].fieldName];
        }
        chartSeries = { "data": dataObj };
        if (currentObject.chartConfig.chartColor.colorType ===
          "ColorByFieldValue") {
          chartSeries.fill = this._getColorForFieldValue(
            currentFeature.attributes[currentObject.chartConfig
              .chartColor.colorInfo.layerField],
            currentObject);
          //get legend label from color by field value
          chartSeries.legendLabel = currentFeature.attributes[orderfield];
        }
        obj[currentFeature.attributes[objectIdField]] = chartSeries;
        chartData.chartSeries.push(obj);
      }));
      this._setChartColorSettings(def, chartData, currentObject);
    },

    /**
    * This function is used to create buffer parameters based on geometry and radius
    * @param{object} first feature
    * @param{object} second feature
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _sortChartData: function (a, b) {
      if (a.sortValue > b.sortValue) {
        return -1;
      }
      if (a.sortValue < b.sortValue) {
        return 1;
      }
      return 0;
    },

    /**
    * This function return a locale date value
    * {number} UTC date format value
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _getLocaleFormatedDate: function (dateFieldValue, displayTime) {
      var dateValue = new Date(dateFieldValue);
      if (displayTime) {
        return dateValue.toLocaleString();
      }
      return dateValue.toLocaleDateString();
    },

    /**
    * Extract color for selected field
    * @param {int} value: value of configured layer field
    * @param {object} currentObject: chart settings object
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _getColorForFieldValue: function (value, currentObject) {
      var selectedColor = "#000000"; //by default this color will be used if value not found
      if (currentObject.chartConfig.chartColor.colorInfo.layerFieldValues) {
        if (currentObject.chartConfig.chartColor.colorInfo.layerFieldValues
          .hasOwnProperty(value)) {
          selectedColor = currentObject.chartConfig.chartColor.colorInfo.layerFieldValues[
            value];
        }
      }
      return selectedColor;
    },

    /**
    * Create configuration which decides how chart will be rendered
    * @param {object} def: callback object
    * @param {object} chartData:configured data for chart
    * @param {object} currentObject:chart settings object
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _setChartColorSettings: function (def, chartData, currentObject) {
      if (currentObject.chartConfig.chartColor.colorType === "ColorByTheme") {
        this._loadSelectedTheme(def, chartData, currentObject);
      } else if (currentObject.chartConfig.chartColor.colorType === "SingleColor") {
        chartData.fill = currentObject.chartConfig.chartColor.colorInfo;
        def.resolve(chartData);
      } else if (currentObject.chartConfig.chartColor.colorType === "ColorByFieldValue") {
        def.resolve(chartData);
      }
    },

    /**
    * Load selected theme for the particular chart and the object in charData
    * @param {object} def: callback object
    * @param {object} chartData:configured data for chart
    * @param {object} currentObject:chart settings object
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _loadSelectedTheme: function (def, chartData, currentObject) {
      require([currentObject.chartConfig.chartColor.colorInfo.className],
        lang.hitch(this, function (theme) {
          chartData.selectedTheme = theme;
          def.resolve(chartData);
        }));
    },

    /*end of functions to handle widget workflow */

    /* Start of Highlight */
    /**
    * Function to highlight selected/searched location on map
    * @params{object} selectedFeature
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _highlightSelectedLocation: function (selectedFeature, updateSelectedLocation) {
      var symbol;
      if (selectedFeature) {
        // set the graphic symbol for selected point and highlight on map
        symbol = symbolJsonUtils.fromJson(this.config.generalSettings.symbol.
          graphicLocationSymbol);
        if (updateSelectedLocation) {
          this._selectedLocation = new Graphic(selectedFeature.geometry,
            symbol);
        }
        this._highlightGraphicsLayer.add(this._selectedLocation);
      }
    },

    /**
    * Function to highlight selected/searched chart feature on map
    * @params{object} selectedFeature
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _highlightSelectedChartFeature: function (selectedIndex) {
      var graphic = this.config.charts[selectedIndex].selectedFeature;
      var layer = this._operationalLayers[selectedIndex];
      var highlightFeature;
      // If feature geometry is of type point, add a square symbol
      // If feature geometry is of type polyline, highlight the line
      // If feature geometry is of type polygon, highlight the boundary of the polygon
      switch (graphic.geometry.type) {
        case "point":
          highlightFeature = this._getPointSymbol(graphic, layer);
          break;
        case "polyline":
          highlightFeature = this._getPolyLineSymbol(graphic, layer);
          break;
        case "polygon":
          highlightFeature = this._getPolygonSymbol(graphic);
          break;
      }
      this._highlightGraphicsLayer.add(highlightFeature);
    },

    /**
    * This function is used to get symbol for polygon geometry
    * @param{object} selected feature which needs to be highlighted
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _getPolygonSymbol: function (graphic) {
      var symbol, graphics, polygon;
      symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255, 1]), 4),
        new Color([0, 0, 0, 0]));
      polygon = new Polygon(new SpatialReference({
        wkid: graphic.geometry.spatialReference.wkid
      }));
      if (graphic.geometry.rings) {
        polygon.rings = lang.clone(graphic.geometry.rings);
      }
      graphics = new Graphic(polygon, symbol, graphic.attributes);
      return graphics;
    },

    /**
    * This function is used to get symbol for polyline geometry
    * @param{object} selected feature which needs to be highlighted
    * @param{object} details of selected layer
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _getPolyLineSymbol: function (graphic, layer) {
      var symbol, graphics, polyline, symbolWidth, graphicInfoValue,
        layerInfoValue, i;
      symbolWidth = 5; // default line width
      //check if layer is valid and have valid renderer object then only check for other  symbol properties
      if (layer && layer.renderer) {
        if (layer.renderer.symbol && layer.renderer.symbol.hasOwnProperty(
          "width")) {
          symbolWidth = layer.renderer.symbol.width;
        } else if ((layer.renderer.infos) && (layer.renderer.infos.length >
          0)) {
          for (i = 0; i < layer.renderer.infos.length; i++) {
            if (layer.typeIdField) {
              graphicInfoValue = graphic.attributes[layer.typeIdField];
            } else if (layer.renderer.attributeField) {
              graphicInfoValue = graphic.attributes[layer.renderer.attributeField];
            }
            layerInfoValue = layer.renderer.infos[i].value;
            // To get properties of symbol when infos contains other than class break renderer.
            if (graphicInfoValue !== undefined && graphicInfoValue !== null &&
              graphicInfoValue !== "" && layerInfoValue !== undefined &&
              layerInfoValue !== null && layerInfoValue !== "") {
              if (graphicInfoValue.toString() === layerInfoValue.toString() &&
                layer.renderer.infos[i].symbol.hasOwnProperty("width")) {
                symbolWidth = layer.renderer.infos[i].symbol.width;
              }
            }
          }
        } else if (layer.renderer.defaultSymbol && layer.renderer.defaultSymbol
          .hasOwnProperty("width")) {
          symbolWidth = layer.renderer.defaultSymbol.width;
        }
      }
      symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color(
        [0, 255, 255, 1]), symbolWidth);
      polyline = new Polyline(new SpatialReference({
        wkid: graphic.geometry.spatialReference.wkid
      }));
      if (graphic.geometry.paths && graphic.geometry.paths.length > 0) {
        polyline.addPath(graphic.geometry.paths[0]);
      }
      graphics = new Graphic(polyline, symbol, graphic.attributes);
      return graphics;
    },

    /**
    * This function is used to get symbol for point geometry
    * @param{object} selected feature which needs to be highlighted
    * @param{object} details of selected layer
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _getPointSymbol: function (graphic, layer) {
      var symbol, isSymbolFound, graphics, point, graphicInfoValue,
        layerInfoValue, i;
      isSymbolFound = false;
      symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, null,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0,
          255, 255, 1
        ]), 3));
      symbol.setColor(null);
      symbol.size = 30; //set default Symbol size which will be used in case symbol not found.
      //check if layer is valid and have valid renderer object then only check for other symbol properties
      if (layer && layer.renderer) {
        if (layer.renderer.symbol) {
          isSymbolFound = true;
          symbol = this._updatePointSymbolProperties(symbol, layer.renderer
            .symbol);
        } else if (layer.renderer.infos && (layer.renderer.infos.length > 0)) {
          for (i = 0; i < layer.renderer.infos.length; i++) {
            if (layer.typeIdField) {
              graphicInfoValue = graphic.attributes[layer.typeIdField];
            } else if (layer.renderer.attributeField) {
              graphicInfoValue = graphic.attributes[layer.renderer.attributeField];
            }
            layerInfoValue = layer.renderer.infos[i].value;
            // To get properties of symbol when infos contains other than class break renderer.
            if (graphicInfoValue !== undefined && graphicInfoValue !== null &&
              graphicInfoValue !== "" && layerInfoValue !== undefined &&
              layerInfoValue !== null && layerInfoValue !== "") {
              if (graphicInfoValue.toString() === layerInfoValue.toString()) {
                isSymbolFound = true;
                symbol = this._updatePointSymbolProperties(symbol, layer.renderer
                  .infos[i].symbol);
              }
            }
          }
          if (!isSymbolFound) {
            if (layer.renderer.defaultSymbol) {
              isSymbolFound = true;
              symbol = this._updatePointSymbolProperties(symbol, layer.renderer
                .defaultSymbol);
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
    * @memberOf widgets/RelatedTableCharts/Widget.js
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
    /* End of Highlight */

    /* Start auto refresh*/
    /**
    * This function is used to reset the auto refresh time interval
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _resetTimer: function () {
      if (this.config.generalSettings.refreshInterval > 0) {
        if (this._autoRefreshInterval) {
          clearInterval(this._autoRefreshInterval);
        }
        this._autoRefreshInterval = setInterval(lang.hitch(this, function () {
          this._autoRefresh();
        }), (this.config.generalSettings.refreshInterval * 60000));
        this._refreshElapsedTime = new Date();
      }
    },

    /**
    * This function is used to clear the auto refresh time interval
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _clearTimer: function () {
      clearInterval(this._autoRefreshInterval);
      this._refreshElapsedTime = null;
      this._autoRefreshInterval = null;
    },

    /**
    * This function gives the elapsed time from timer start
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */

    _getElapsedTimeInMinutes: function () {
      var endTime = new Date(), startTime = new Date(), timeDiff, seconds, minutes;
      if (this._refreshElapsedTime) {
        startTime = this._refreshElapsedTime;
      }
      // time difference in ms
      timeDiff = endTime - startTime;
      // strip the milliseconds
      timeDiff /= 1000;
      // get seconds
      seconds = Math.round(timeDiff % 60);
      // remove seconds from the date
      timeDiff = Math.floor(timeDiff / 60);
      // get minutes
      minutes = Math.round(timeDiff % 60);
      return minutes;
    },

    /**
    * This function is used to refresh the content and fetch the new data to update charts
    * @memberOf widgets/RelatedTableCharts/Widget.js
    */
    _autoRefresh: function () {
      //check if timer is set
      if (this._autoRefreshInterval && this._refreshElapsedTime) {
        //check if location is selected
        if (this._selectedLocation) {
          if (parseInt(this._getElapsedTimeInMinutes(), 10) >= parseInt(this.config.
            generalSettings.refreshInterval, 10)) {
            this._resetTimer();
            this._loadFeatures(this._selectedLocation);
          }
        }
      }
    },

    /**
    * This function gets selected layer details from map
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _getLayerDetailsFromMap: function (baseURL, relatedLayerId) {
      var selectedLayer = {};
      if (this.map && this.map.webMapResponse && this.map.webMapResponse
        .itemInfo && this.map.webMapResponse.itemInfo.itemData &&
        this.map.webMapResponse.itemInfo.itemData.operationalLayers) {
        array.forEach(this.map.webMapResponse.itemInfo.itemData.operationalLayers,
          lang.hitch(this, function (layer) {
            if (layer.layerObject) {
              if (layer.layerType === "ArcGISMapServiceLayer" ||
                layer.layerType === "ArcGISTiledMapServiceLayer") {
                if (baseURL.substring(0, baseURL.length - 1) ===
                  layer.url) {
                  array.forEach(layer.resourceInfo.layers, lang.hitch(
                    this,
                    function (subLayer) {
                      if (subLayer.id === parseInt(
                        relatedLayerId, 10)) {
                        selectedLayer.title = subLayer.name;
                        return;
                      }
                    }));
                  array.forEach(layer.layers, lang.hitch(this,
                    function (subLayer) {
                      if (subLayer.id === parseInt(
                        relatedLayerId, 10)) {
                        //set layer title
                        if (subLayer.name) {
                          selectedLayer.title = subLayer.name;
                        }
                        //set popup info
                        selectedLayer.popupInfo = subLayer.popupInfo;
                        //reset definitionExpression
                        selectedLayer.definitionExpression = null;
                        //set layer's definitionExpression
                        if (subLayer.layerDefinition) {
                          //set layer's definitionExpression
                          if (subLayer.layerDefinition.definitionExpression) {
                            selectedLayer.definitionExpression = subLayer.layerDefinition
                              .definitionExpression;
                          }
                          //set layer's renderer from webmap
                          if (subLayer.layerDefinition.drawingInfo && subLayer.layerDefinition
                            .drawingInfo.renderer) {
                            selectedLayer.renderer = subLayer.layerDefinition.drawingInfo
                              .renderer;
                          }
                        }
                        return;
                      }
                    }));
                }
              } else {
                if (layer.url.replace(/.*?:\/\//g, "") === (
                  baseURL + relatedLayerId).replace(/.*?:\/\//g,
                    "")) {
                  //set layer title
                  selectedLayer.title = layer.title;
                  //set popup info
                  selectedLayer.popupInfo = layer.popupInfo;
                  //reset definitionExpression
                  selectedLayer.definitionExpression = null;
                  if (layer.layerDefinition) {
                    //set layer's definitionExpression
                    if (layer.layerDefinition.definitionExpression) {
                      selectedLayer.definitionExpression = layer.layerDefinition
                        .definitionExpression;
                    }
                    //set layer's renderer from webmap
                    if (layer.layerDefinition.drawingInfo && layer.layerDefinition
                      .drawingInfo.renderer) {
                      selectedLayer.renderer = layer.layerDefinition.drawingInfo
                        .renderer;
                    }
                  }
                  return;
                }
              }
            }
          }));
      }
      return selectedLayer;
    },


    /**
    * This function gets selected table details from map
    * @memberOf widgets/RelatedTableCharts/Widget.js
    **/
    _getTableDetailsFromMap: function (baseURL, relatedLayerId) {
      var selectedLayer = {};
      if (this.map && this.map.webMapResponse && this.map.webMapResponse
        .itemInfo && this.map.webMapResponse.itemInfo.itemData &&
        this.map.webMapResponse.itemInfo.itemData.tables) {
        array.forEach(this.map.webMapResponse.itemInfo.itemData.tables,
          lang.hitch(this, function (layer) {
            if (layer.layerObject) {
              if (layer.url.replace(/.*?:\/\//g, "") === (
                baseURL + relatedLayerId).replace(/.*?:\/\//g,
                  "")) {
                //set popup info
                selectedLayer.popupInfo = layer.popupInfo;
                //reset definitionExpression
                selectedLayer.definitionExpression = null;
                if (layer.layerDefinition) {
                  //set layer's definitionExpression
                  if (layer.layerDefinition.definitionExpression) {
                    selectedLayer.definitionExpression = layer.layerDefinition
                      .definitionExpression;
                  }
                }
                return;
              }
            }
          }));
      }
      return selectedLayer;
    },

    /* End auto refresh*/

    /* Get selected Theme Color*/
    _getSelectedThemeColor: function () {
      var requestArgs, styleName, selectedTheme;
      //Get selected theme Name
      selectedTheme = this.appConfig.theme.name;

      if (this.appConfig && this.appConfig.theme && this.appConfig.theme.customStyles) {
        this.config.selectedThemeColor = this.appConfig.theme.customStyles.mainBackgroundColor;
        return;
      }
      //get selected theme's style
      if (this.appConfig && this.appConfig.theme && this.appConfig.theme.styles) {
        styleName = this.appConfig.theme.styles[0];
      } else {
        styleName = "default";
      }
      //cerate request to get the selected theme's manifest to fetch the color
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
        //if selectedThemeColor is not set then by default use black
        if (!this.config.selectedThemeColor) {
          this.config.selectedThemeColor = "#000000";
        }
      }), lang.hitch(this, function () {
        this.config.selectedThemeColor = "#000000";
      }));
    },
    /*End get selected theme color*/

    /**
    * This function handles different event required for widget
    * @memberOf widgets/RelatedTableCharts/Widget
    */
    _connectSelectLocationHandler: function () {
      //handle select location button click event
      on(this.selectLocation, "click", lang.hitch(this, function () {
        if (domClass.contains(this.selectLocation, "esriCTSelectLocationActive")) {
          this._disconnectMapEventHandler();
        } else {
          domClass.replace(this.selectLocation,
            "esriCTSelectLocationActive", "esriCTSelectLocation");
          this._connectMapEventHandler();
        }
      }));
    }
    /*End get selected theme color*/

  });
});