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
  "dojo/_base/declare",
  "jimu/BaseWidget",
  "dojo/on",
  "dojo/dom-construct",
  "dojo/dom-class",
  "dojo/query",
  "dojo/_base/lang",
  "dojo/_base/array",
  "./utils",
  "./search",
  "./item-list",
  "./filter-list",
  "jimu/portalUtils",
  "esri/layers/GraphicsLayer",
  "esri/graphic",
  "esri/tasks/GeometryService",
  "esri/tasks/BufferParameters",
  "dijit/form/HorizontalSlider",
  "dojo/dom-attr",
  "dojo/string",
  "dojo/dom-geometry",
  "dojo/dom-style",
  "esri/symbols/jsonUtils",
  "esri/tasks/locator",
  "esri/geometry/webMercatorUtils",
  "esri/InfoTemplate",
  "jimu/dijit/Message",
  "jimu/dijit/LoadingIndicator",
  "dijit/registry",
  "dojo/Deferred",
  "dojo/promise/all",
  "esri/tasks/query",
  "esri/tasks/QueryTask",
  "esri/request",
  "esri/geometry/scaleUtils",
  "esri/geometry/Extent"
], function (
  declare,
  BaseWidget,
  on,
  domConstruct,
  domClass,
  query,
  lang,
  array,
  appUtils,
  SearchInstance,
  ItemList,
  FilterList,
  portalUtils,
  GraphicsLayer,
  Graphic,
  GeometryService,
  BufferParameters,
  HorizontalSlider,
  domAttr,
  string,
  domGeom,
  domStyle,
  symbolJsonUtils,
  Locator,
  webMercatorUtils,
  InfoTemplate,
  Message,
  LoadingIndicator,
  registry,
  Deferred,
  all,
  Query,
  QueryTask,
  esriRequest,
  scaleUtils,
  Extent
) {
  return declare([BaseWidget], {
    baseClass: 'jimu-widget-nearme', // Set the widget base class name.
    _highlightGraphicsLayer: null, // Layer to add highlight symbols
    _loading: null, // Loading indicator object
    _windowResizeTimer: null, // Timer to control widget component resize on window resize
    _sliderChangeTimer: null, // Timer to control buffer creation on slider change
    _mapTooltip: null, // MapTooltip Container
    _searchContainerNodeElement: null, // Search container
    _locatorInstance: null, // Locator instance to reverse geocode the address
    _searchedLocation: null, // Contain searched location
    _slider: null, // Horizontal slider instance
    _bufferParams: null, // To store Buffer parameters
    _mapClickHandler: null, // Map click handler
    _mapMoveHandler: null, // Map move handler
    _itemListObject: null, // Item-list widget instance
    _isValidConfig: null, //Flag to check whether config has valid data for the widget
    appUtils: null,
    _hasMulitpleSourcesInSearch: true, //Set this flag if their are multiple sources in search
    _searchInstance: null, //To store search instance
    _attributeSearchLayers: [],//To store ids of layer on which attribute search can be performed
    _doAttributeSearchOn: [], //Layers on which attribute search needs to be performed
    selectedThemeColor: "#000", //to store selected theme's color

    postCreate: function () {
      this._bufferParams = null;  //To store Buffer parameters
      this.selectedThemeColor = "#000";
      this._getSelectedThemeColor();
      this._attributeSearchLayers = [];
      this._doAttributeSearchOn = [];
    },

    startup: function () {
      domClass.add(this.domNode.parentElement, "esriCTNearMeContentPanel");
      //check whether portal url is available
      if (this.appConfig.portalUrl && lang.trim(this.appConfig.portalUrl) !== "") {
        //get portal info to fetch geometry service Url
        portalUtils.getPortalSelfInfo(this.appConfig.portalUrl).then(lang.hitch(
          this,
          function (portalInfo) {
            // get helper-services from portal object
            this.config.helperServices = portalInfo && portalInfo.helperServices;
            if (this.config.helperServices && this.config.helperServices.geometry) {
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
                //load the widget
                this._initWidgetComponents();
                //connect map click handler if not connected
                if (this.config.showLocationTool) {
                  domClass.remove(this.selectLocation, "esriCTHidden");
                } else {
                  if (!this._mapClickHandler) {
                    this._connectMapEventHandler();
                  }
                }
                this._onWindowResize();
              } else {
                //Hide main node
                domClass.add(this.widgetMainNode, "esriCTHidden");
                //Show Error node
                domClass.remove(this.widgetErrorNode, "esriCTHidden");
              }
            } else {
              //display error message if geometry service is not found
              this._displayWidgetError(this.nls.geometryServicesNotFound);
            }
          }), lang.hitch(this, function () {
            //display error message if any error occured while fetching portal info for geometry service
            this._displayWidgetError(this.nls.geometryServicesNotFound);
          }));
      } else {
        //display error message if portal url is not available
        this._displayWidgetError(this.nls.geometryServicesNotFound);
      }
    },

    /**
    * Display error message in error node
    * @memberOf widgets/NearMe/Widget
    */
    _displayWidgetError: function (msg) {
      if (this.widgetErrorNode) {
        domAttr.set(this.widgetErrorNode, "innerHTML", msg);
      }
      this._showMessage(msg);
    },

    /**
    * Resize the widget components and connect map click on widget open
    * @memberOf widgets/NearMe/Widget
    */
    onOpen: function () {
      if (this._isValidConfig) {
        this._onWindowResize();
        if (!this.config.showLocationTool) {
          this._connectMapEventHandler();
        }
        if (this._slider) {
          this._slider.set("value", this.config.defaultBufferDistance);
        }
      }
    },

    /**
    * Resize the widget components on widget resize
    * @memberOf widgets/NearMe/Widget
    */
    resize: function () {
      this._onWindowResize();
    },

    /**
    * This function clears results when widget is destroyed
    * @memberOf widgets/NearMe/Widget
    */
    destroy: function () {
      //destroy widget data
      this._destroyWidgetData();
      this.inherited(arguments);
    },

    /**
    * disconnect map click on widget close
    * @memberOf widgets/NearMe/Widget.js
    */
    onClose: function () {
      if (this._isValidConfig) {
        this._disconnectMapEventHandler();
        //Clear the previous text in search textbox
        if (this._searchInstance) {
          this._searchInstance.clearSearchText();
        }
        if (this._searchedLocation && this._itemListObject) {
          this._itemListObject.resetAllFilters();
          this._clearResults();
        }
        //set layers visibility according to widget load
        if (this._itemListObject) {
          this._itemListObject.showAllLayers(true);
        }
      }
    },

    /**
    * disconnect map click on widget close
    * @memberOf widgets/NearMe/Widget.js
    */
    onDeActive: function () {
      if (this._isValidConfig && this.config.showLocationTool) {
        this._disconnectMapEventHandler();
      }
    },

    /**
    * This function destroys itemList widget and clears the search result
    * @memberOf widgets/NearMe/Widget
    */
    _destroyWidgetData: function () {
      if (this._itemListObject) {
        this._itemListObject.removeGraphicsLayer();
        this._itemListObject.showAllLayers(true);
        this._itemListObject.resetAllFilters();
        this._itemListObject.destroy();
        this._itemListObject = null;
      }
      this._clearResults();
    },

    /**
    * This function validates the configured data
    * @memberOf widgets/NearMe/Widget
    */
    _validateConfig: function () {
      if (!(this.config.searchLayers && this.config.searchLayers.length)) {
        this._displayWidgetError(this.nls.invalidSearchLayerMsg);
        return false;
      }
      //check if newly added config parameters are available in config or not
      if (!this.config.symbols.polygonSymbol) {
        this.config.symbols.polygonSymbol = {
          "color": [255, 189, 1, 0],
          "outline": {
            "color": [255, 189, 1, 255],
            "width": 2.25,
            "type": "esriSLS",
            "style": "esriSLSSolid"
          },
          "type": "esriSFS",
          "style": "esriSFSSolid"
        };
      }
      if (!this.config.symbols.polylineSymbol) {
        this.config.symbols.polylineSymbol = {
          "color": [21, 99, 184, 255],
          "width": 3.75,
          "type": "esriSLS",
          "style": "esriSLSSolid"
        };
      }
      return true;
    },

    /**
    * This function updates the layer-details for the configured layers from selected webmap
    * @memberOf widgets/NearMe/Widget
    **/
    _updateConfig: function () {
      var i;
      for (i = 0; i < this.config.searchLayers.length; i++) {
        lang.mixin(this.config.searchLayers[i], this.appUtils.getLayerDetailsFromMap(
          this.config.searchLayers[i].baseURL, this.config.searchLayers[i]
            .layerId, this.config.searchLayers[i].id));
      }
    },

    /**
    * Create and show alert message.
    * @param {string} msg
    * @memberOf widgets/NearMe/Widget
    **/
    _showMessage: function (msg) {
      var alertMessage = new Message({
        message: msg
      });
      alertMessage.message = msg;
    },

    /**
    * Initialize all widget components
    * @memberOf widgets/NearMe/Widget
    */
    _initWidgetComponents: function () {
      //create graphic layer to add buffer
      this._bufferGraphicLayer = new GraphicsLayer();
      this.map.addLayer(this._bufferGraphicLayer);
      //create graphic layer to add search location graphic
      this._highlightGraphicsLayer = new GraphicsLayer();
      this.map.addLayer(this._highlightGraphicsLayer);
      //Create search widget
      this._createSearchInstance();
      //initialize buffer distance slider
      this._createSlider();
      //initialize loading indicator
      this._initLoading();
      //initialize layer list widget
      this._initLayerList();
      // show bufferslider widget if configured layers
      // are not polygon type and intersect polygon flag is disabled
      this._setBufferSliderVisiblity();
      //connect set location tool button handler if tool is configured
      if (this.config.showLocationTool) {
        this._connectSelectLocationHandler();
      }
      //create tool-tip to be shown on map move
      this._mapTooltip = domConstruct.create("div", {
        "class": "esriCTMapTooltip",
        "innerHTML": this.nls.selectLocationToolTip
      }, this.map.container);
      domStyle.set(this._mapTooltip, "position", "fixed");
      domStyle.set(this._mapTooltip, "display", "none");
      //reset the widget's components on window resize and on widget open
      this.own(on(window, 'resize', lang.hitch(this, this._onWindowResize)));
      //Create filter list
      this._createFilterList();
      //handle back click on filter page and navigate to main page
      this.own(on(this.filterBackButton, "click", lang.hitch(this, function () {
        domClass.add(this.widgetFilterNode, "esriCTHidden");
        domClass.remove(this.domNode.parentElement, "esriCTContentPanelNoPadding");
        domClass.remove(this.widgetMainNode, "esriCTHidden");
        //if location exist & filters are updated then init workflow around the searched location
        if (this._searchedLocation && this._filterList.filtersUpdated &&
          this._prevFeature) {
          this._initWorkflow(this._prevFeature, this._prevAttributeSearchResult);
        }
      })));
    },

    /**
     * Creates filter list based on the configured filter settings
     */
    _createFilterList: function () {
      //create filter list only if filter settings are configured
      if (this.config.filterSettings && this.config.filterSettings.filters &&
        this.config.filterSettings.filters.length > 0) {
        this._filterList = new FilterList({
          map: this.map,
          config: this.config.filterSettings,
          nls: this.nls,
          folderUrl: this.folderUrl,
          clearAllButton: this.clearAllFilterButton
        }, domConstruct.create("div", {}, this.filterListNode));
        this._filterList.startup();
      }
    },

    /**
     * Creates set of layers configured for both proximity and searchSources
     * which can be used to do attribute search.
     */
    _setLayersForAttributeSearch: function (searchSources) {
      var searchLayers = [];
      this._attributeSearchLayers = [];
      if (searchSources && searchSources.length > 0) {
        //get all layers configured for proximity search
        array.forEach(this.config.searchLayers, lang.hitch(this, function (layer) {
          searchLayers.push(layer.id);
        }));
        //loop through search sources and select layers which are configured for both
        //searchSources and proximity search
        array.forEach(searchSources, lang.hitch(this, function (source) {
          if (source._featureLayerId &&
            searchLayers.indexOf(source._featureLayerId) > -1) {
            this._attributeSearchLayers.push(source);
          }
        }));
      }
    },

    /**
     * Performs attribute search on the selected sources and return the deferred.
     * On complete it will return all the ids satisfying search criteria for all sources.
     * @memberOf widgets/NearMe/Widget
     */
    _performAttributeSearch: function (sources) {
      var deferred, deferredList = {};
      deferred = new Deferred();
      array.forEach(sources, lang.hitch(this, function (source) {
        var searchText, where;
        searchText = this._searchInstance.getSearchText();
        //get where clause using internal method of search dijit
        where = this._searchInstance.search._whereClause(searchText, source.featureLayer,
          source.searchFields, source.exactMatch);
        //If the definition expression exist on layer add it to the where clause
        if (source.featureLayer.getDefinitionExpression()) {
          where = source.featureLayer.getDefinitionExpression() + " and " + where;
        }
        //get id's of the features satisfying search criteria
        deferredList[source._featureLayerId] = this._queryForIds(source.featureLayer, where);
      }));
      //on getting all the ids resolve the deferred
      all(deferredList).then(lang.hitch(this, function (idsList) {
        deferred.resolve(idsList);
      }));
      return deferred.promise;
    },

    /**
     * Gets all the ids for the selected layer satisfying the whereClause
     * @memberOf widgets/NearMe/Widget
     */
    _queryForIds: function (layer, where) {
      var queryTask, queryParameters, deferred;
      deferred = new Deferred();
      queryTask = new QueryTask(layer.url);
      queryParameters = new Query();
      queryParameters.returnGeometry = false;
      queryParameters.where = where ? where : "1=1";
      queryTask.executeForIds(queryParameters).then(lang.hitch(this, function (ids) {
        if (ids && ids.length > 0) {
          //If more features are found than the maxRecordCount, honor maxRecordCount of the layer
          if (ids.length > layer.maxRecordCount) {
            ids = ids.slice(0, layer.maxRecordCount);
          }
          deferred.resolve(ids);
        } else {
          deferred.resolve([]);
        }
      }), lang.hitch(this, function () {
        deferred.resolve([]);
      }));
      return deferred.promise;
    },

    /**
    * This function initialize the search widget
    * @memberOf widgets/NearMe/Widget
    */
    _createSearchInstance: function () {
      var searchOptions;
      // get webmap response
      this.config.response = this.map.webMapResponse;
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
      this.own(this._searchInstance.on("init-attribute-search",
        lang.hitch(this, function () {
          var activeSource, filteredArr = [];
          this._doAttributeSearchOn = [];
          //if valid attribute search layers available then only check for active source
          if (this._attributeSearchLayers.length > 0) {
            activeSource = this._searchInstance.getActiveSource();
            /**
             * -If activeSource is valid layer and it is available in attributeSearch layer then
             * only do attribute search on activeSource
             * -If activeSource is geocoder don't perform attributeSearch
             * -If activeSource is 'All'(null) then perform search on all layers in _attributeSearchLayers
             */
            if (activeSource) {
              if (activeSource._featureLayerId) {
                filteredArr = array.filter(this._attributeSearchLayers,
                  lang.hitch(this, function (item) {
                    return item._featureLayerId === activeSource._featureLayerId;
                  }));
                if (filteredArr.length > 0) {
                  this._doAttributeSearchOn.push(activeSource);
                }
              }
            } else {
              this._doAttributeSearchOn = this._attributeSearchLayers;
            }
          }
        })));

      this.own(this._searchInstance.on("select-result", lang.hitch(this, function (evt) {
        evt.isFeatureFromMapClick = false;
        /**
         * 1.0-If init-attribute-search is invoked & have valid layers to do attribute search then,
         *     perform attribute search on all layers in '_doAttributeSearchOn' array
         * 2.1-Else if init-attribute-search is not invoked & selectedFeature is from attributeSearchLayers
         *     then show selectedFeature details directly
         * 2.2-Else perform the workflow on the selected result from search dijit
         */
        if (this._doAttributeSearchOn.length > 0) {
          this._performAttributeSearch(this._doAttributeSearchOn).then(
            lang.hitch(this, function (idsList) {
              var initWorkFlowOnSelectedResult = true;
              if (idsList) {
                //loop through all the ids of all layers matching search criteria & initWorkFlow
                for (var layerID in idsList) {
                  var ids = idsList[layerID];
                  //if any of the layers has results then don't init workFlow with selectedResult
                  //else if don't have results remove the layer from list
                  if (ids.length > 0) {
                    initWorkFlowOnSelectedResult = false;
                  } else {
                    delete idsList[layerID];
                  }
                }
              }
              //if none of the layers has results for selected search term
              //then initWorkFlow with the feature returned in the select-result event
              if (initWorkFlowOnSelectedResult) {
                this._initWorkflow(evt);
              } else {
                this._initWorkflow(null, idsList);
              }
            }));
        } else {
          var idsList, filteredArr, objectIdField, initWorkFlowOnSelectedResult = true;
          //if selected feature is from attributeSearch layers show selectedFeature details
          if (evt && evt.source && evt.source._featureLayerId && evt.source.featureLayer) {
            filteredArr = array.filter(this._attributeSearchLayers,
              lang.hitch(this, function (item) {
                return item._featureLayerId === evt.source._featureLayerId;
              }));
            if (filteredArr.length > 0 && evt.source.featureLayer.objectIdField &&
              evt.result.feature.attributes) {
              initWorkFlowOnSelectedResult = false;
              objectIdField = evt.source.featureLayer.objectIdField;
              idsList = {};
              idsList[evt.source._featureLayerId] = [evt.result.feature.attributes[objectIdField]];
            }
          }
          if (initWorkFlowOnSelectedResult) {
            this._initWorkflow(evt);
          } else {
            this._initWorkflow(null, idsList);
          }
        }
      })));
      this.own(this._searchInstance.on("clear-search", lang.hitch(this, function () {
        //clears the applied filters by widget and display the layers
        if (this._itemListObject) {
          this._itemListObject.showAllLayers(true);
          this._itemListObject.resetAllFilters();
        }
        //clears result
        this._clearResults();
      })));
      this.own(this._searchInstance.on("search-results", lang.hitch(this, function () {
        this._clearResults(true);
      })));
      this.own(this._searchInstance.on("search-loaded", lang.hitch(this, function () {
        setTimeout(lang.hitch(this, function () {
          //initialize reverse geocoder
          this._initReverseGeocoder();
          //get search container node to resize the search control
          this._searchContainerNodeElement = query(
            ".arcgisSearch .searchGroup .searchInput", this.domNode
          )[0];
          //set _hasMulitpleSourcesInSearch to false if multiple sources are not present
          if (this._searchInstance.search.sources.length < 2) {
            this._hasMulitpleSourcesInSearch = false;
          }
          //Set layers for attributeSearch from the search sources which are configured for proximity also.
          this._setLayersForAttributeSearch(this._searchInstance.search.sources);
          this._onWindowResize();
        }), 1000);
      })));
      // once widget is created call its startup method
      this._searchInstance.startup();
    },

    /**
    * This function initialize the Locator widget for reverse geocoding
    * @memberOf widgets/NearMe/Widget
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
    * Callback handler called once location is reverse geocoded
    * @memberOf widgets/NearMe/Widget
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
        screenPoint = this.map.toScreen(this._searchedLocation.geometry);
        this.map.infoWindow.show(screenPoint, this.map.getInfoWindowAnchor(
          screenPoint));
        this.map.infoWindow.isShowing = true;
      }
    },

    /**
    * This function handles different event required for widget
    * @memberOf widgets/NearMe/Widget
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
    },
    /**
    * This function initialize the search widget
    * @memberOf widgets/NearMe/Widget
    */
    _initWorkflow: function (evt, attribteSearchResult) {
      var selectedFeature, horzontalSliderNode;
      //clear previous results
      //If showing results of attributeSearch pass false to hide infowindow else pass true
      this._clearResults(!attribteSearchResult);
      this._doAttributeSearchOn = [];
      //get selected feature
      selectedFeature = this._getSelectedFeatureFromResult(evt);
      //store the current params which can be used if filters are applied later on
      this._prevAttributeSearchResult = lang.clone(attribteSearchResult);
      this._prevFeature = {
        "feature": selectedFeature,
        "isFeatureFromMapClick": selectedFeature ? evt.isFeatureFromMapClick : false
      };
      this._searchedLocation = selectedFeature;
      if (evt && evt.source && evt.source.zoomScale) {
        this._prevFeature.zoomScale = evt.source.zoomScale;
      }
      //if feature is form map click show the reverse geocoded address
      if (evt && this._locatorInstance && evt.isFeatureFromMapClick && this._searchedLocation &&
        this._searchedLocation.geometry) {
        this._locatorInstance.locationToAddress(
          webMercatorUtils.webMercatorToGeographic(this._searchedLocation.geometry), 100);
      }
      //If selected feature is valid then init workflow to search
      //else if have valid attributeSearchList then display layers list accordingly
      if (selectedFeature && selectedFeature.geometry) {
        //show error message if no popup's are configured for any layers
        if (this._itemListObject.hasValidLayers()) {
          //show selected location on map
          this._highlightSelectedLocation(selectedFeature);
          //Check if horizontal slider is visible or not and display buffer only if slider is visible
          horzontalSliderNode = query(".esriCTSliderDiv", this.widgetMainNode);
          if (horzontalSliderNode && domClass.contains(horzontalSliderNode[0], "esriCTHidden")) {
            this.zoomToFeature();
            this._itemListObject.displayLayerList(this._searchedLocation, null);
          }
          else {
            // create buffer based on specified geometry
            this._createBuffer(selectedFeature.geometry);
          }
        }
        else {
          this._showMessage(this.nls.allPopupsDisabledMsg);
        }
      } else if (attribteSearchResult) {
        //show error message if no popup's are configured for any layers
        if (this._itemListObject.hasValidLayers()) {
          this._itemListObject.displayLayerList(null, null, attribteSearchResult);
        }
        else {
          this._showMessage(this.nls.allPopupsDisabledMsg);
        }
      }
    },

    /**
    * This function will clear results
    * @memberOf widgets/NearMe/Widget
    **/
    _clearResults: function (showInfoWindow) {
      if (this._highlightGraphicsLayer) {
        this._highlightGraphicsLayer.clear();
      }
      this._searchedLocation = null;
      if (this._itemListObject) {
        this._itemListObject.clearResultPanel();
      }
      if (this._bufferGraphicLayer) {
        this._bufferGraphicLayer.clear();
      }
      if (!showInfoWindow) {
        this.map.infoWindow.hide();
      }
    },

    /**
    * This function will connects the map event
    * @memberOf widgets/NearMe/Widget
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
    * to show in infowindow at the selected location.
    * @memberOf widgets/NearMe/Widget
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
    * to show in infowindow at the selected location.
    * @memberOf widgets/NearMe/Widget
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
    * @memberOf widgets/NearMe/Widget
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
    },

    /**
    * This function will enable the web map popup.
    * @memberOf widgets/NearMe/Widget
    **/
    _enableWebMapPopup: function () {
      if (this.map) {
        this.map.setInfoWindowOnClick(true);
      }
    },

    /**
    * This function will disable the web map popup.
    * @memberOf widgets/NearMe/Widget
    **/
    _disableWebMapPopup: function () {
      if (this.map) {
        this.map.setInfoWindowOnClick(false);
      }
    },

    /**
    * This function create horizontal slider and set minimum maximum value of slider
    * @memberOf widgets/NearMe/Widget
    **/
    _createSlider: function () {
      // initialize and set the parameter of slider
      this._slider = new HorizontalSlider({
        name: "slider",
        discreteValues: this.config.maxBufferDistance,
        minimum: 0,
        maximum: this.config.maxBufferDistance,
        value: this.config.defaultBufferDistance,
        intermediateChanges: true,
        "class": "esriCTHorizantalSlider"
      }, this.horizantalSliderContainer);
      this._bufferParams = {
        BufferDistance: this._slider.value.toString(),
        BufferUnit: this.nls.units[this.config.bufferDistanceUnit.value].displayText
      };
      // set slider content
      domAttr.set(this.silderText, "innerHTML", string.substitute(
        this.nls.bufferSliderText, this._bufferParams));
      // on change event of slider
      this.own(this._slider.on("change", lang.hitch(this, this._sliderChange)));
      // set maximum and minimum value of horizontal slider
      this.sliderMinValue.innerHTML = this._slider.minimum.toString();
      this.sliderMaxValue.innerHTML = this._slider.maximum.toString();
    },

    /**
    * Call back for slider change event
    * @memberOf widgets/NearMe/Widget
    **/
    _sliderChange: function (value) {
      this._bufferParams.BufferDistance = Math.round(value);
      domAttr.set(this.silderText, "innerHTML", string.substitute(
        this.nls.bufferSliderText, this._bufferParams));
      if (this._sliderChangeTimer) {
        clearTimeout(this._sliderChangeTimer);
      }
      // if geometry exists
      if (this._searchedLocation) {
        this._loading.show();
        this._sliderChangeTimer = setTimeout(lang.hitch(this, this._createBuffer), 700);
      }
    },

    /**
    * Create buffer based on specified geometry
    * @memberOf widgets/NearMe/Widget
    **/
    _createBuffer: function () {
      var params, geometryService, screenPoint;
      geometryService = new GeometryService(this.config.helperServices.geometry.url);
      if (this._bufferParams.BufferDistance > 0) {
        this._loading.show();
        //set the buffer parameters
        params = new BufferParameters();
        params.distances = [this._bufferParams.BufferDistance];
        params.unit = GeometryService[this.config.bufferDistanceUnit.bufferUnit];
        params.bufferSpatialReference = this.map.spatialReference;
        params.outSpatialReference = this.map.spatialReference;
        params.geometries = [this._searchedLocation.geometry];
        //draw geodesic buffers if configured on map spatial ref is 4326
        if (this.config.isGeodesic || this.map.spatialReference.wkid === 4326) {
          this.config.isGeodesic = true;
          params.geodesic = true;
        }
        geometryService.buffer(params, lang.hitch(this, function (
          geometries) {
          this._showBuffer(geometries);
          this.map.setExtent(geometries[0].getExtent().expand(1.5)).then(lang.hitch(this,
            function () {
              if (this.map.infoWindow && this.map.infoWindow.isShowing) {
                screenPoint = this.map.toScreen(this._searchedLocation.geometry);
                this.map.infoWindow.show(screenPoint, this.map.getInfoWindowAnchor(
                  screenPoint));
              }
            }));
          this._loading.hide();
          this._itemListObject.displayLayerList(this._searchedLocation,
            geometries[0]);
        }), lang.hitch(this, function () {
          this._showMessage(this.nls.unableToCreateBuffer);
          this._loading.hide();
        }));
      } else {
        this._bufferGraphicLayer.clear();
        if (!this._prevFeature.isFeatureFromMapClick) {
          this.zoomToFeature();
        }
        this._itemListObject.displayLayerList(this._searchedLocation, null);
        this._loading.hide();
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
        this.map.setExtent(extent);
      }
    },

    /**
     * Returns extent for a point based in tolerance in pixel & maps extent
     * @memberOf widgets/NearMe/Widget
     */
    pointToExtent: function (map, point, toleranceInPixel) {
      //calculate map coords represented per pixel
      var pixelWidth = map.extent.getWidth() / map.width;
      //calculate map coords for tolerance in pixel
      var toleranceInMapCoords = toleranceInPixel * pixelWidth;
      //calculate & return computed extent
      return new Extent(point.x - toleranceInMapCoords,
        point.y - toleranceInMapCoords,
        point.x + toleranceInMapCoords,
        point.y + toleranceInMapCoords,
        map.spatialReference);
    },
    //show buffer on map if buffer visibility is set to true in config
    _showBuffer: function (bufferedGeometries) {
      if (this.config.bufferInfo && this.config.bufferInfo.isVisible) {
        this._bufferGraphicLayer.clear();
        if (this.config && this.config.symbols && this.config.symbols.bufferSymbol) {
          var symbol = symbolJsonUtils.fromJson(this.config.symbols.bufferSymbol);
          array.forEach(bufferedGeometries, lang.hitch(this, function (geometry) {
            var graphic = new Graphic(geometry, symbol);
            this._bufferGraphicLayer.add(graphic);
          }));
        }
      }
    },
    /**
    * Set the selected feature from results
    * @memberOf widgets/NearMe/Widget
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
    * Function to highlight features on map
    * @memberOf widgets/NearMe/Widget
    **/
    _highlightSelectedLocation: function (selectedFeature) {
      var symbol;
      if (selectedFeature) {
        this._highlightGraphicsLayer.clear();
        // set the graphic symbol for selected geometry based on type and highlight on map
        if (selectedFeature.geometry.type === "polygon") {
          symbol = symbolJsonUtils.fromJson(this.config.symbols.polygonSymbol);
        } else if (selectedFeature.geometry.type === "polyline") {
          symbol = symbolJsonUtils.fromJson(this.config.symbols.polylineSymbol);
        } else {
          symbol = symbolJsonUtils.fromJson(this.config.symbols.graphicLocationSymbol);
        }
        this._highlightGraphicsLayer.add(new Graphic(selectedFeature.geometry, symbol));
      }
    },

    /**
    * Window resize handler
    * @memberOf widgets/NearMe/Widget
    **/
    _onWindowResize: function () {
      if (this._windowResizeTimer) {
        clearTimeout(this._windowResizeTimer);
      }
      this._windowResizeTimer = setTimeout(lang.hitch(this, this._resetComponents),
        500);
    },

    /**
    * Resets the components of the widgets according to updated size
    * @memberOf widgets/NearMe/Widget
    **/
    _resetComponents: function () {
      var containerGeom, calculatedWidth, searchGroup, componentsWithScrollingTouch = [];
      //get search group to override max width overridden by some themes
      searchGroup = query(
        ".arcgisSearch .searchGroup", this.domNode
      )[0];
      if (!this._searchContainerNodeElement) {
        this._searchContainerNodeElement = query(
          ".arcgisSearch .searchGroup .searchInput", this.domNode
        )[0];
      }
      //get information and direction tab parent
      componentsWithScrollingTouch = query(
        ".dijitContentPane", this.domNode
      );
      //get main widgets parent
      componentsWithScrollingTouch.push(this.domNode);
      //remove webkit-overflow-scrolling touch
      array.forEach(componentsWithScrollingTouch, lang.hitch(this, function (node) {
        domStyle.set(node, "-webkit-overflow-scrolling", "auto");
      }));
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
            //As some of the themes have overridden width of search widget and have applied important priority to it,
            //we need to use style.setProperty method instead of dojo domStyle.
            if (this.config.showLocationTool) {
              calculatedWidth = calculatedWidth - 45;
            }
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
    },

    /**
    * Initialize item-list widget to display summary of results
    * @memberOf widgets/NearMe/Widget
    **/
    _initLayerList: function () {
      this._itemListObject = new ItemList({
        map: this.map,
        config: this.config,
        nls: this.nls,
        loading: this._loading,
        parentDivId: this.id,
        folderUrl: this.folderUrl,
        outerContainer: this.layerListOuterDiv,
        selectedThemeColor: this.selectedThemeColor
      });
      //on init-proximity call initWorkflow method,
      //to initiate proximity search around selected feature
      this.own(on(this._itemListObject, "init-proximity",
        lang.hitch(this, function (selectedFeature) {
          var evt = {};
          evt.isFeatureFromMapClick = false;
          evt.feature = selectedFeature;
          this._initWorkflow(evt);
        })));
      //show filter list page  and hide main page
      this.own(on(this._itemListObject, "show-filter", lang.hitch(this, function () {
        domClass.add(this.widgetMainNode, "esriCTHidden");
        domClass.add(this.domNode.parentElement, "esriCTContentPanelNoPadding");
        domClass.remove(this.widgetFilterNode, "esriCTHidden");
        //set filter list shown
        this._filterList.filterListShown();
      })));
      if (this.id && registry.byId(this.id) && registry.byId(this.id).resize) {
        registry.byId(this.id).resize();
      }
    },

    /**
    * This function used for loading indicator
    * @memberOf widgets/NearMe/Widget
    */
    _initLoading: function () {
      this._loading = new LoadingIndicator({
        hidden: true
      });
      this._loading.placeAt(this.domNode);
      this._loading.startup();
    },

    /**
    * This function checks if all configured layers are
    * not polygon and intersectSearchedLocation flag
    * is disabled then it shows horizontal slider widget
    * @memberOf widgets/NearMe/Widget
    */
    _setBufferSliderVisiblity: function () {
      var hideHorizontalSliderFlag = true, itemListMainContainer, horzontalSliderNode;
      // if layers are configured in configuration
      if (this.config.searchLayers && this.config.searchLayers.length > 0) {
        // looping through the configured layers
        array.some(this.config.searchLayers, lang.hitch(this, function (layer) {
          // if geometryType is other than esriGeometryPolygon
          // sets flag to false
          if (layer.geometryType !== "esriGeometryPolygon") {
            hideHorizontalSliderFlag = false;
            return false;
          }
        }));
        // if horizontal slider && intersectSearchedLocation flag is true
        // then resize item list container else show horizontal slider widget
        if (this.config.intersectSearchedLocation && hideHorizontalSliderFlag) {
          itemListMainContainer = query(".esriCTItemListMainContainer", this.domNode);
          if (itemListMainContainer) {
            domClass.add(itemListMainContainer[0], "esriCTItemListOverrideMainContainer");
          }
        } else {
          horzontalSliderNode = query(".esriCTSliderDiv", this.widgetMainNode);
          domClass.remove(horzontalSliderNode[0], "esriCTHidden");
        }
      }
    },

    /***
     * Function gets the selected theme Color from app config and theme properties
     * In case of errors it will use "#000000" color
     */
    _getSelectedThemeColor: function (selectedThemeName, changeData) {
      var requestArgs, styleName, selectedTheme;
      //Get selected theme Name
      selectedTheme = this.appConfig.theme.name;
      if (changeData) {
        selectedTheme = selectedThemeName;
      }
      //get selected theme's style
      if (this.appConfig && this.appConfig.theme && this.appConfig.theme.styles) {
        styleName = this.appConfig.theme.styles[0];
      } else {
        styleName = "default";
      }
      if (changeData) {
        styleName = changeData;
      }
      //if custom styles are selected then use the selected color directly
      if (this.appConfig && this.appConfig.theme && this.appConfig.theme.customStyles &&
        this.appConfig.theme.customStyles.mainBackgroundColor && (!changeData)) {
        this.selectedThemeColor = this.appConfig.theme.customStyles.mainBackgroundColor;
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
              this.selectedThemeColor = styleObj.styleColor;
              break;
            }
          }
        }
        //if selectedThemeColor is not set then by default use black
        if (!this.selectedThemeColor) {
          this.selectedThemeColor = "#000000";
        }
        if (changeData) {
          this._itemListObject.selectedThemeColor = this.selectedThemeColor;
          this._itemListObject.resetIconColors();
        }
      }), lang.hitch(this, function () {
        this.selectedThemeColor = "#000000";
      }));
    },
    /**
    * This function is used to detect style change of WAB in editor mode.
    * Once it is detected, theme is reset.
    * For e.g. changing dashboard theme style from light to dark
    * @memberOf NearMe/Widget
    */
    onAppConfigChanged: function (appConfig, reason, changedData) {
      var selectedThemeName;
      if (reason === "styleChange") {
        if (appConfig && appConfig.theme && appConfig.theme.customStyles &&
            appConfig.theme.customStyles.mainBackgroundColor) {
          this._itemListObject.selectedThemeColor = appConfig.theme.customStyles.mainBackgroundColor;
          this._itemListObject.resetIconColors();
        } else {
          selectedThemeName = appConfig.theme.name;
          this._getSelectedThemeColor(selectedThemeName, changedData);
        }
      }
    }
  });
});