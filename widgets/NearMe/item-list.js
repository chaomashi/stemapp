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
  "require",
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dojo/dom-construct",
  "dojo/query",
  "dojo/_base/array",
  "dojo/_base/lang",
  "dijit/layout/ContentPane",
  "dojo/dom-attr",
  "dojo/dom-style",
  "dojo/dom-class",
  "dojo/on",
  "dojo/Deferred",
  "dojo/Evented",
  "dojo/promise/all",
  "jimu/dijit/Message",
  "jimu/dijit/TabContainer",
  "dojo/text!./item-list.html",
  "esri/Color",
  "esri/dijit/Directions",
  "esri/dijit/PopupTemplate",
  "esri/graphic",
  "esri/geometry/Point",
  "esri/geometry/Polyline",
  "esri/geometry/Polygon",
  "esri/SpatialReference",
  "esri/geometry/geometryEngine",
  "esri/layers/FeatureLayer",
  "esri/layers/GraphicsLayer",
  "esri/symbols/jsonUtils",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/tasks/query",
  "esri/tasks/RelationshipQuery",
  "esri/units",
  "dojo/_base/fx",
  "dojo/number",
  "jimu/LayerInfos/LayerInfos",
  "jimu/FilterManager",
  "esri/geometry/webMercatorUtils",
  "dijit/registry",
  "esri/renderers/jsonUtils",
  "jimu/symbolUtils",
  "esri/geometry/Multipoint",
  "dojo/keys",
  "dijit/focus",
  "dojo/string",
  "./libs/swiper",
  "dojo/text!./swiperLayout.html"
], function (
  require,
  declare,
  _WidgetBase,
  domConstruct,
  query,
  array,
  lang,
  ContentPane,
  domAttr,
  domStyle,
  domClass,
  on,
  Deferred,
  Evented,
  All,
  Message,
  TabContainer,
  itemListTemplate,
  Color,
  Directions,
  PopupTemplate,
  Graphic,
  Point,
  Polyline,
  Polygon,
  SpatialReference,
  GeometryEngine,
  FeatureLayer,
  GraphicsLayer,
  SymbolJsonUtils,
  SimpleFillSymbol,
  SimpleLineSymbol,
  SimpleMarkerSymbol,
  Query,
  RelationshipQuery,
  units,
  fx,
  number,
  LayerInfos,
  FilterManager,
  webMercatorUtils,
  registry,
  rendererJsonUtils,
  symbolUtils,
  Multipoint,
  keys,
  focusUtil,
  string,
  Swiper,
  SwiperLayoutTemplate
) {
  // to create a widget, derive it from BaseWidget.
  return declare([_WidgetBase, Evented], {
    _itemListTemplate: itemListTemplate,
    _serviceArea: null, //object to store the search buffer area geometry
    _operationalLayers: null, //object to store configured search layers
    _selectedPoint: null, //object to store searched location
    _panels: {}, //object to store the panels
    _currentPanel: null, //object to store currently opened panel
    map: null, //to store map instance
    config: null, //to store widget configuration
    folderUrl: null, //to store widget path
    loading: null, //to store loading indicator instance
    nls: null, //to store nls strings
    parentDiv: null, //to store widget parent container
    outerContainer: null, //div to contain domNode of the widget
    _featureListContent: null, //div to store feature list panel
    _featureInfoPanel: null, //div to contain feature's popup content
    _directionInfoPanel: null, //div to contain direction widget
    _tabContainer: null, //tab container dijit
    _isNoFeature: null, //flag to identify if no feature found for all the layers
    _isSlide: true, //flag to check if animation is in progress
    _loadAttachmentTimer: null, //timer to load the attachments when info panel gets opened
    _failedLayers: [], //array to store the title of the layers, which is failed to fetch the features
    _routeCalculated: false, //flag to check whether direction data is calculated or not
    _selectedLayer: null, //to store selected layer
    _selectedItem: null, //to store selected layer div
    _selectedFeature: null, //to store selected feature
    _selectedFeatureItem: null, //to store selected feature div
    _featureGraphicsLayer: null, //to store graphic layer instance to highlight selected feature on map
    _directionsWidget: null, //to store direction widget instance
    _layerCount: null, //to store total layer count to show content Panel accordingly
    _tables: [],//to contains related tables for map layers
    _searchedFeatures: {},//to hold all the searched features, will be used for creating list
    _attributeSearchList: null,//to hold results of attribute search for each layer
    _filterIcon: null,//to hold selected theme color for filter icon
    _proximityIcon: null,//to hold selected theme color for proximity icon

    postCreate: function () {
      this._filterIcon = null; //to store selected theme color for filter icon
      this._proximityIcon = null; //to store selected theme color for proximity icon
      this._tables = []; //to contains related tables for map layers
      this._panels = {}; //object to store the panels
      this._failedLayers = [];//array to store the title of the layers, which is failed to fetch the features
      this._operationalLayers = null; //object to store configured search layers
      this._searchedFeatures = {}; //to hold all the searched features, will be used for creating list
      this._attributeSearchList = null; //to hold results of attribute search for each layer
      this._tablesLayer = {}; //to store the related layer/table feature layer instances to get attachments
      this.domNode = domConstruct.create("div", {
        "class": "esriCTItemListMainContainer"
      }, this.outerContainer);
      //get filter manager instance
      this.filterManager = FilterManager.getInstance();
      //get updated filters on the layer
      this._getUpdatedLayerFilters();
      //create panels to display data
      this._createPanels();
      //create feature layers
      this._loadFeatureLayers();
      //create graphics layer to add graphic to highlight selected feature
      this._featureGraphicsLayer = new GraphicsLayer();
      this.map.addLayer(this._featureGraphicsLayer);
    },

    /**
     * Creates filter button to apply configured filters
     * @memberOf widgets/NearMe/item-list
     */
    _createFilterButton: function (parentNode) {
      var filterOptions, filterParent, filterButton;
      //Create placeholder for proximity icon
      filterOptions = {};
      if (!this.config.filterSettings || !this.config.filterSettings.filters ||
        this.config.filterSettings.filters.length <= 0) {
        filterOptions.style = "display: none";
      }
      filterParent = domConstruct.create("div", filterOptions, parentNode);
      //Create proximity search icon in details panel
      filterButton = domConstruct.create("div", {
        "class": "esriCTFilterIconContainer",
        "title": this.nls.filterTitle
      }, filterParent);
      this._filterIcon = domConstruct.create("div", {
        "class": "esriCTFilterIcon",
        "style": { "background-color": this.selectedThemeColor }
      }, filterButton);
      //handle click event and emit event on click to init proximity around selected feature
      this.own(on(filterButton, "click", lang.hitch(this, function () {
        this.emit("show-filter");
      })));
      return filterParent;
    },

    /**
    * Create panels to display results
    * @memberOf widgets/NearMe/item-list
    **/
    _createPanels: function () {
      var templateDiv, proximityButton, proximityParent, proximityOptions;
      //create container for layer list
      this._panels.layerListPanel = domConstruct.create("div", {
        "class": "esriCTLayerList"
      }, this.domNode);
      //create container for feature list
      this._panels.featureListPanel = domConstruct.create("div", {
        "class": "esriCTFeatureList"
      }, this.domNode);
      templateDiv = domConstruct.toDom(this._itemListTemplate).childNodes[0];
      domAttr.set(templateDiv, "tabindex", 0);
      domClass.add(templateDiv, "esriCTPanelHeader");
      this._panels.featureListPanel.appendChild(templateDiv);
      this._featureListContent = domConstruct.create("div", {
        "class": "esriCTFeatureListContent"
      }, null);
      //set configured text color for feature list
      domStyle.set(this._featureListContent, "color", this.config.fontColor);
      this._panels.featureListPanel.appendChild(this._featureListContent);
      //attach click event on left to navigate to previous panel
      this._attachEventOnBackButton(this._panels.featureListPanel);
      this._panels.infoPanel = domConstruct.create("div", {
        "class": "esriCTDirectionInfoPanel"
      }, this.domNode);
      templateDiv = domConstruct.toDom(this._itemListTemplate).childNodes[0];
      domAttr.set(templateDiv, "tabindex", 0);
      domClass.add(templateDiv, "esriCTPanelHeader");
      this._panels.infoPanel.appendChild(templateDiv);
      this._attachEventOnBackButton(this._panels.infoPanel);
      //create filter button
      this._filterButton = this._createFilterButton(this.domNode);
      //create container to display feature popup info
      this._featureInfoPanel = new ContentPane({}, null);
      this._featureInfoPanel.startup();
      //check if routing is enabled in webmap
      if (this.map.webMapResponse.itemInfo.itemData.applicationProperties &&
        this.map.webMapResponse.itemInfo.itemData.applicationProperties
          .viewing.routing.enabled) {
        //create tab container to display directions from searched location to selected feature
        this._directionInfoPanel = new ContentPane({}, null);
        this._directionInfoPanel.startup();
        //create tab container to display selected feature popup info and directions
        this._tabContainer = new TabContainer({
          tabs: [{
            title: this.nls.informationTabTitle,
            content: this._featureInfoPanel
          }, {
            title: this.nls.directionTabTitle,
            content: this._directionInfoPanel
          }]
        }, domConstruct.create("div", {
          "class": "esriCTTabContainer"
        }, this._panels.infoPanel));
        this._tabContainer.startup();
        //Create placeholder for proximity icon
        proximityOptions = { "class": "esriCTProximityParent" };
        if (this.config.enableProximitySearch !== undefined && !this.config.enableProximitySearch) {
          proximityOptions.style = "display: none";
        }
        proximityParent = domConstruct.create("div",
          proximityOptions, this._panels.infoPanel);
        this.own(this._tabContainer.on("tabChanged", lang.hitch(this, function (selectedTab) {
          this.emit("tab-change", selectedTab);
          if (selectedTab === this.nls.directionTabTitle && !this._routeCalculated) {
            //get directions
            this._initializeDirectionWidget();
          }
          if (this.parentDivId && registry.byId(this.parentDivId) &&
            registry.byId(this.parentDivId).resize) {
            registry.byId(this.parentDivId).resize();
          }
        })));
      } else {
        //if routing is not enabled on webmap then, panel to display feature info will be created
        this._panels.infoPanel.appendChild(this._featureInfoPanel.domNode);
        domClass.add(this._featureInfoPanel.domNode, "esriCTFeatureInfo");
        var jimuTabNode =
          query(".esriCTItemListMainContainer .esriCTDirectionInfoPanel .esriCTPanelHeader");
        if (jimuTabNode) {
          domClass.add(jimuTabNode[0], "esriCTBorderBottom");
        }
        //Create placeholder for proximity icon
        proximityOptions = {
          "class": "esriCTProximityParent",
          "style": "bottom: 0px"
        };
        if (this.config.enableProximitySearch !== undefined && !this.config.enableProximitySearch) {
          proximityOptions.style = "display: none";
        }
        proximityParent = domConstruct.create("div", proximityOptions, this._panels.infoPanel);
      }
      //Create proximity search icon in details panel
      proximityButton = domConstruct.create("div", {
        "class": "esriCTProximityIconContainer",
        "title": this.nls.proximityButtonTooltip
      }, proximityParent);
      this._proximityIcon =  domConstruct.create("div", {
        "class": "esriCTProximityIcon",
        "style": { "background-color": this.selectedThemeColor }
      }, proximityButton);
      //handle click event and emit event on click to init proximity around selected feature
      this.own(on(proximityButton, "click", lang.hitch(this, function () {
        if (this._selectedFeature && this._selectedFeature.geometry) {
          this.emit("init-proximity", new Graphic(this._selectedFeature.geometry));
        }
      })));
      if (this.parentDivId && registry.byId(this.parentDivId) &&
        registry.byId(this.parentDivId).resize) {
        registry.byId(this.parentDivId).resize();
      }
    },

    /**
    * attach 'click' event on back button to navigate to previous panel
    * @param{object} panel
    * @memberOf widgets/NearMe/item-list
    **/
    _attachEventOnBackButton: function (panel) {
      var divItemTitle, divBackButton;
      divItemTitle = query(".esriCTItemlList", panel)[0];
      divBackButton = query(".esriCTBackButton", panel)[0];
      if (divItemTitle && divBackButton) {
        //handle both click & key press event to show info
        this.own(on(divItemTitle, "click, keypress", lang.hitch(this, function (event) {
          var charOrCode;
          //if event is key press, perform operation only if key is ENTER
          if (event.type === "keypress") {
            charOrCode = event.charCode || event.keyCode;
            if (charOrCode !== keys.ENTER) {
              return;
            }
          }
          event.stopPropagation();
          if (domStyle.get(divBackButton, "display") !== "none") {
            if (this._isSlide) {
              this._isSlide = false;
              this._selectedItem = null;
              this._clearGrahics();
              //clear directions if navigate to feature list
              this._clearDirections();
              //check if back button is clicked to navigate to feature list panel or layer list panel
              if (!this._isFeatureList) {
                this.loading.hide();
                this._clearContent(this._featureListContent);
                //show all layers
                this.showAllLayers();
                this._selectedLayer = null;
                this._isFeatureList = false;
                this._showPanel("layerListPanel", true);
                //on moving back to layers list focus to first layer
                focusUtil.focus(query(".esriCTItemlList[tabindex='0']", this._panels.layerListPanel)[0]);
              } else {
                this._isFeatureList = false;
                this._showPanel("featureListPanel", true);
                //on moving back to features list focus to first feature
                focusUtil.focus(query(".esriCTItemlList[tabindex='0']", this._featureListContent)[0]);
              }
            }
          }
        })));
      }
    },

    /**
    * load configured layers as feature layers
    * @memberOf widgets/NearMe/item-list
    **/
    _loadFeatureLayers: function () {
      var featureLayer, i;
      this._operationalLayers = [];
      this._tables = this.map.webMapResponse.itemInfo.itemData.tables;
      //filter layers which dont has popup info
      for (i = 0; i < this.config.searchLayers.length; i++) {
        if (!this.config.searchLayers[i].popupInfo) {
          this.config.searchLayers.splice(i, 1);
        }
      }
      for (i = 0; i < this.config.searchLayers.length; i++) {
        //filter layers which has popup info
        if (this.config.searchLayers[i].popupInfo) {
          //initialize feature layer with the popup template configured in webmap
          featureLayer = new FeatureLayer(this.config.searchLayers[i].url, {
            infoTemplate: new PopupTemplate(this.config.searchLayers[i].popupInfo)
          });
          //check whether id is available
          if (this.config.searchLayers[i].id) {
            featureLayer.id = this.config.searchLayers[i].id;
          } else { //add custom unique id by appending index to access the layer afterwards
            featureLayer.id = "FL_" + this.config.searchLayers[i].title + i;
          }
          featureLayer.title = this.config.searchLayers[i].title;
          //set definition expression configured in webmap
          if (this.config.searchLayers[i].definitionExpression) {
            featureLayer.setDefinitionExpression(this.config.searchLayers[i].definitionExpression);
          }
          //set renderer configured in webmap
          if (this.config.searchLayers[i].renderer) {
            featureLayer.setRenderer(rendererJsonUtils.fromJson(
              this.config.searchLayers[i].renderer));
          }
          featureLayer.index = i;
          featureLayer.layerIndex = this._operationalLayers.length;
          featureLayer.isMapServer = this.config.searchLayers[i].isMapServer;
          featureLayer.baseURL = this.config.searchLayers[i].baseURL;
          //set attachment visibility in layer as configured in webmap
          featureLayer.showAttachments = this.config.searchLayers[i].popupInfo.showAttachments;
          this._operationalLayers.push(featureLayer);
          this._onLayerLoad(featureLayer);
        }
      }
    },

    /**
    * Check whether layer is loaded if not then wait until it gets loaded
    * @param{object} layer object
    * @memberOf widgets/NearMe/item-list
    **/
    _onLayerLoad: function (featureLayer) {
      //get related table information
      if (featureLayer.loaded) {
        featureLayer.tableInfos = this._getRelatedTableInfo(featureLayer.index);
      } else {
        this.own(featureLayer.on("load", lang.hitch(this, function () {
          featureLayer.tableInfos = this._getRelatedTableInfo(featureLayer.index);
        })));
      }
    },

    /**
    * Get related table info
    * @param{int} layer index in array
    * @memberOf widgets/NearMe/item-list
    **/
    _getRelatedTableInfo: function (layerIndex) {
      var layer, tableInfos = [];
      layer = this._operationalLayers[layerIndex];
      if (layer) {
        array.forEach(layer.relationships, lang.hitch(this, function (table) {
          array.forEach(this._tables, lang.hitch(this, function (tableData,
            index) {
            if (tableData.url.replace(/.*?:\/\//g, "") === (layer.baseURL + table.relatedTableId).replace(/.*?:\/\//g, "")) {
              if (tableData.popupInfo) {
                //if popup is enabled for related table
                if (!tableData.relationshipIds) {
                  tableData.relationshipIds = {};
                }
                tableData.relationshipIds[layer.id] = table.id;
                tableInfos.push(index);
                //store layers object to get attachments
                //Set showAttachments to true as it was not available after creating new layer
                this._tablesLayer[tableData.id] = new FeatureLayer(tableData.url);
                this._tablesLayer[tableData.id].showAttachments = true;
              }
            }
          }));
        }));
      }
      return tableInfos;
    },

    /**
    * Returns true if their are layers to be searched.
    * layers may be configured but not having popup enabled
    * will be not be considered for search
    * @memberOf widgets/NearMe/item-list
    **/
    hasValidLayers: function () {
      if (this._operationalLayers && this._operationalLayers.length > 0) {
        return true;
      }
      return false;
    },

    /**
    * clear content of the div
    * @param{object} div
    * @memberOf widgets/NearMe/item-list
    **/
    _clearContent: function (resultPanel) {
      if (resultPanel) {
        domConstruct.empty(resultPanel);
      }
    },

    /**
    * create layer list with the feature count for selected buffer area
    * @param{object} searchedLocation
    * @param{object} serviceArea
    * @memberOf widgets/NearMe/item-list
    **/
    displayLayerList: function (searchedLocation, serviceArea, attributeSearchList) {
      var featureDeferArr = [];
      this.loading.hide();
      this._layerCount = 0;
      this._isNoFeature = true;
      this._isSlide = true;
      this._attributeSearchList = null;
      //if attribute search result is available set in the variable
      //else show the tabs and remove the top border of info panel added in case of attributeSearch
      if (attributeSearchList) {
        this._attributeSearchList = attributeSearchList;
        //in case of attribute search hide the tabs, and show top border to info panle
        if (this._tabContainer && this._tabContainer.controlNode) {
          domStyle.set(this._tabContainer.controlNode, "display", "none");
          domClass.add(this._tabContainer.containerNode, "esriCTTopBorder");
        }
      } else if (this._tabContainer && this._tabContainer.controlNode) {
        domStyle.set(this._tabContainer.controlNode, "display", "block");
        domClass.remove(this._tabContainer.containerNode, "esriCTTopBorder");
      }
      this.clearResultPanel();
      //get updated filters on the layer
      this._getUpdatedLayerFilters();
      this._searchedFeatures = {};
      //show all layers
      this.showAllLayers();
      this._setSearchedLocation(searchedLocation);
      this._setServiceArea(serviceArea);
      //clear failed layer list
      this._failedLayers = [];
      //check whether only one layer is available
      this._filterConfiguredLayer(featureDeferArr);
      All(featureDeferArr).then(lang.hitch(this, function () {
        //show filter button as the filter button could be hidden
        //if user was previously on info panel
        domClass.remove(this._filterButton, "esriCTHidden");
        this._onFeatureCountComplete();
      }));
    },

    /**
      * Using jimu LayerInfos returns the updated the layer filters on each search layer
      * @memberOf widgets/NearMe/item-list
      */
    _getUpdatedLayerFilters: function () {
      LayerInfos.getInstance(this.map, this.map.webMapResponse.itemInfo).then(
        lang.hitch(this, function (layerInfosObj) {
          array.forEach(this.config.searchLayers, lang.hitch(this,
            function (currentLayer) {
              var mapLayer = layerInfosObj.getLayerInfoById(
                currentLayer.id);
              if (mapLayer) {
                currentLayer.definitionExpression = mapLayer.getFilter();
              }
            }));
        }));
    },

    /**
    * function checks wheather count of layer configured is more than 1 and creates layer list or displays features accordingly
    * @param{array} featureDeferArr
    * @memberOf widgets/NearMe/item-list
    **/
    _filterConfiguredLayer: function (featureDeferArr) {
      //check whether only one layer is available
      if (this._operationalLayers.length > 1) {
        this._currentPanel = this._panels.layerListPanel;
        domStyle.set(this._currentPanel, 'display', 'block');
        domStyle.set(this._currentPanel, 'left', '0px');
        //create layers list
        for (var i = 0; i < this._operationalLayers.length; i++) {
          //query to display feature count
          this._resetFilter(this._operationalLayers[i].layerIndex);
          this._createItemTemplate(this._operationalLayers[i], featureDeferArr);
        }
      } else {
        //display feature list Panel
        this._layerCount = 1;
        this._resetFilter(this._operationalLayers[0].layerIndex);
        this._onSingleLayerFound(featureDeferArr, this._operationalLayers[0]);
      }
    },

    /**
    * display feature list panel if single layer is configured
    * @param{array} featureDeferArr
    * @param{object} opLayer
    * @memberOf widgets/NearMe/item-list
    **/
    _onSingleLayerFound: function (featureDeferArr, opLayer) {
      var divBackButton, defer;
      if (featureDeferArr) {
        defer = new Deferred();
        featureDeferArr.push(defer);
      }
      divBackButton = query(".esriCTBackButton", this._panels.featureListPanel)[0];
      if (divBackButton) {
        domStyle.set(divBackButton, 'display', 'none');
      }
      this._currentPanel = this._panels.featureListPanel;
      domStyle.set(this._currentPanel, 'display', 'block');
      domStyle.set(this._currentPanel, 'left', '0px');
      if (opLayer) {
        this._displayFeatureList(opLayer, defer);
      }
    },

    /**
    * function displays feature Info Panel if only 1 feature found
    * @param{object} feature
    * @memberOf widgets/NearMe/item-list
    **/
    _onSingleFeatureFound: function (feature) {
      var featureId, infoPanelBackBtn;
      featureId = feature.attributes[this._selectedLayer.objectIdField];
      this._displayFilteredFeatures(featureId);
      this._showFeatureDetails(null, feature);
      //hide featureListPanel and Back Button on infoPanel
      infoPanelBackBtn = query(".esriCTBackButton", this._panels.infoPanel)[0];
      if (infoPanelBackBtn) {
        domStyle.set(infoPanelBackBtn, 'display', 'block');
        if (this._layerCount === 1) {
          domStyle.set(infoPanelBackBtn, "display", "none");
          domStyle.set(this._panels.featureListPanel, "display", "none");
        }
      }
    },

    /**
    * create template for layer list
    * @param{object} operationalLayer
    * @param{array} featureDeferArr
    * @memberOf widgets/NearMe/item-list
    **/
    _createItemTemplate: function (operationalLayer, featureDeferArr) {
      var templateDiv;
      templateDiv = domConstruct.toDom(this._itemListTemplate).childNodes[0];
      domClass.add(templateDiv, "esriCTDisabled");
      //set configured text color for template
      domStyle.set(templateDiv, "color", this.config.fontColor);
      this._currentPanel.appendChild(templateDiv);
      //set layer title as a name field in template
      this._setItemName(templateDiv, operationalLayer.title);
      //query to display feature count
      this._queryForCountOnly(templateDiv, operationalLayer, featureDeferArr);
      //attach click event on left arrow
      this._attachClickEvent(templateDiv, operationalLayer, true);
    },

    /**
    * set itemName field in template
    * @param{object} template div
    * @param{string} value to be displayed
    * @memberOf widgets/NearMe/item-list
    **/
    _setItemName: function (templateDiv, value) {
      var divItemName = query(".esriCTItemName", templateDiv)[0];
      if (divItemName) {
        domAttr.set(divItemName, "innerHTML", value);
        domAttr.set(divItemName, "title", value);
      }
    },

    /**
    * attach click event on layer template div
    * @param{object} templateDiv
    * @param{string} item
    * @memberOf widgets/NearMe/item-list
    **/
    _attachClickEvent: function (templateDiv, item) {
      //handle both click & key press event to show info
      this.own(on(templateDiv, "click, keypress", lang.hitch(this, function (event) {
        var charOrCode;
        //if event is key press, perform operation only if key is ENTER
        if (event.type === "keypress") {
          charOrCode = event.charCode || event.keyCode;
          if (charOrCode !== keys.ENTER) {
            return;
          }
        }
        if (!domClass.contains(templateDiv, "esriCTDisabled") && this._isSlide) {
          var featureListPanelBackBtn;
          event.stopPropagation();
          this._isSlide = false;
          this._selectedItem = templateDiv;
          featureListPanelBackBtn = query(".esriCTBackButton", this._panels.featureListPanel)[0];
          if (featureListPanelBackBtn) {
            domStyle.set(featureListPanelBackBtn, "display", "block");
          }
          this._displayFeatureList(item, null);
        }
      })));
    },

    /**
    * display feature list
    * @param{object} item
    * @param{object} defer
    * @memberOf widgets/NearMe/item-list
    **/
    _displayFeatureList: function (item, defer) {
      this._clearContent(this._featureListContent);
      this._selectedLayer = item;
      //check if routing is enabled in webmap
      if (this.map.webMapResponse.itemInfo.itemData.applicationProperties &&
        this.map.webMapResponse.itemInfo.itemData.applicationProperties
          .viewing.routing.enabled) {
        var jimuTab, tabNode, jimuTabNode;
        jimuTab = query(".jimu-tab", this._panels.infoPanel);
        tabNode = query(".jimu-tab .control", this._panels.infoPanel);
        jimuTabNode = query(
          ".esriCTItemListMainContainer .esriCTDirectionInfoPanel .esriCTPanelHeader"
        );
        // layer geometry type is polygon && Only return polygons that intersect
        // the search location flag is enabled
        if (tabNode && tabNode[0] && jimuTab && jimuTab[0] && jimuTabNode &&
          jimuTabNode[0]) {
          if (item.geometryType === "esriGeometryPolygon" &&
            this.config.intersectSearchedLocation) {
            domClass.add(jimuTab[0], "esriCTOverrideHeight");
            domClass.add(tabNode[0], "esriCTHidden");
            domClass.add(jimuTabNode[0], "esriCTBorderBottom");
          } else {
            domClass.remove(jimuTab[0], "esriCTOverrideHeight");
            domClass.remove(tabNode[0], "esriCTHidden");
            domClass.remove(jimuTabNode[0], "esriCTBorderBottom");
          }
        }
      }
      this._setItemName(this._panels.featureListPanel, this._selectedLayer.title);
      this._queryForFeatureList(defer);
    },

    /**
    * create query parameters
    * @memberOf widgets/NearMe/item-list
    **/
    _getQueryParams: function (opLayer) {
      var queryParams = new Query();
      queryParams.spatialRelationship = "esriSpatialRelIntersects";
      queryParams.outSpatialReference = this.map.spatialReference;
      queryParams.outFields = ["*"];
      if (this._attributeSearchList) {
        if (this._attributeSearchList[opLayer.id] &&
          this._attributeSearchList[opLayer.id].length > 0) {
          queryParams.objectIds = this._attributeSearchList[opLayer.id];
        } else {
          queryParams.where = "1=2";
        }
      } else if (this._serviceArea || this._selectedPoint) {
        //if valid buffer use it else use selected geometry
        queryParams.geometry = this._serviceArea || this._selectedPoint.geometry;
      }
      return queryParams;
    },

    /**
    * query layer to get number of features present in current buffer area
    * @param{object} template div
    * @param{object} opLayer
    * @param{array} featureDeferArr
    * @memberOf widgets/NearMe/item-list
    **/
    _queryForCountOnly: function (templateDiv, opLayer, featureDeferArr) {
      var defer, queryParams;
      queryParams = this._getQueryParams(opLayer);
      // if intersectSearchedLocation option is set to true in widget configuration and layer is polygon layer then, query for feature
      // which are intersecting searched location instead of buffer area
      if (this.config.intersectSearchedLocation && opLayer.geometryType === "esriGeometryPolygon" &&
        this._selectedPoint) {
        queryParams.geometry = this._selectedPoint.geometry;
      }
      defer = new Deferred();
      if (queryParams.where && queryParams.where === "1=2") {
        domStyle.set(templateDiv, 'display', 'none');
        //if layer is failed set tab index to -1, so that it will not be focused using tab
        //and set focus to first loaded layer with features
        domAttr.set(templateDiv, 'tabindex', '-1');
        focusUtil.focus(query(".esriCTItemlList[tabindex='0']", templateDiv.parentElement)[0]);
        if (this.config.selectedSearchLayerOnly) {
          this._showHideOperationalLayer(opLayer.url, opLayer.id, false);
        }
        defer.resolve();
      } else {
        opLayer.queryFeatures(queryParams, lang.hitch(this, function (featureSet) {
          if (featureSet.features.length > 0) {
            this._selectedLayer = opLayer;
            this._layerCount++;
            this._searchedFeatures[opLayer.id] = featureSet.features;
            this._setItemCount(templateDiv, featureSet.features.length, true);
            this._showFilteredFeaturesOnLoad(featureSet.features, opLayer.id);
          } else {
            domStyle.set(templateDiv, 'display', 'none');
            //if layer is failed set tab index to -1, so that it will not be focused using tab
            //and set focus to first loaded layer with features
            domAttr.set(templateDiv, 'tabindex', '-1');
            focusUtil.focus(query(".esriCTItemlList[tabindex='0']", templateDiv.parentElement)[0]);
            if (this.config.selectedSearchLayerOnly) {
              this._showHideOperationalLayer(opLayer.url, opLayer.id, false);
            }
          }
          defer.resolve();
        }), lang.hitch(this, function () {
          if (templateDiv) {
            domStyle.set(templateDiv, 'display', 'none');
            //if layer is failed set tab index to -1, so that it will not be focused using tab
            //and set focus to first loaded layer with features
            domAttr.set(templateDiv, 'tabindex', '-1');
            focusUtil.focus(query(".esriCTItemlList[tabindex='0']", templateDiv.parentElement)[0]);
            this._showHideOperationalLayer(opLayer.url, opLayer.id, false);
          }
          this._failedLayers.push(opLayer.title);
          defer.resolve();
        }));
      }
      featureDeferArr.push(defer);
    },

    /**
    * Returns feature layer details form stored operationalLayer array
    * @param{string} id
    * @memberOf widgets/NearMe/item-list
    **/
    _getFeatureLayerDetailsFormArray: function (id) {
      var i, layerCount;
      if (this._operationalLayers && this._operationalLayers.length > 0) {
        layerCount = this._operationalLayers.length;
        for (i = 0; i < layerCount; i++) {
          if (this._operationalLayers[i].id === id) {
            return this._operationalLayers[i];
          }
        }
      }
      return null;
    },

    /**
    * Shows only selected features on map if selectedSearchLayerOnly flag is set
    * @param{array} features
    * @param{string} layerID
    * @memberOf widgets/NearMe/item-list
    **/
    _showFilteredFeaturesOnLoad: function (features, layerID) {
      var i, featureIds = '', maxFeatureLength, filter, opLayer;
      opLayer = this._getFeatureLayerDetailsFormArray(layerID);
      if (this.config.selectedSearchLayerOnly) {
        //sort features according to distance.
        if (features.length > 1) {
          features = this._getSortedFeatureList(features);
        }
        maxFeatureLength = this._getMaxResultCountValue(features.length, opLayer.maxRecordCount);
        //Directly display feature Info Pane if only 1 feature found
        if (maxFeatureLength) {
          for (i = 0; i < maxFeatureLength; i++) {
            if (featureIds) {
              featureIds += ',';
            }
            featureIds += features[i].attributes[this._selectedLayer.objectIdField];
          }
          filter = this._selectedLayer.objectIdField + ' in (' + featureIds + ')';
          //set filter on map layer
          this._setFilterOnMapLayer(filter, opLayer.id, opLayer.url, opLayer.isMapServer);
        }
      }
    },

    /**
    * check if any of layer has feature in currently selected buffer area
    * @memberOf widgets/NearMe/item-list
    **/
    _onFeatureCountComplete: function () {
      //display message if no feature for current buffer area
      if (this._isNoFeature) {
        this.clearResultPanel();
        domStyle.set(this._panels.layerListPanel, 'display', 'block');
        domStyle.set(this._panels.layerListPanel, 'left', '0px');
        domConstruct.create("div", {
          "class": "esriCTNoFeatureFound",
          "innerHTML": this.nls.noFeatureFoundText
        }, this._panels.layerListPanel);
      } else if (this._layerCount === 1 && this._operationalLayers.length !== 1) {
        //display features List Panel directly if configured layer count is more than 1 and features are only available in single layer
        domStyle.set(this._panels.layerListPanel, 'display', 'none');
        this._onSingleLayerFound(null, this._selectedLayer);
      }
      if (this._failedLayers.length) {
        var unableToFetchResultsMsg = this.nls.unableToFetchResults +
          "\n</t><ul><li>" + this._failedLayers.join("\n </li><li>") +
          "</li></ul>";
        this._showMessage(unableToFetchResultsMsg);
      }
      this.loading.hide();
      if (this.parentDivId && registry.byId(this.parentDivId) &&
        registry.byId(this.parentDivId).resize) {
        registry.byId(this.parentDivId).resize();
      }
    },

    /**
    * query feature layer to get features present in the current buffer area
    * @memberOf widgets/NearMe/item-list
    **/
    _queryForFeatureList: function (defer) {
      var queryParams;
      this.loading.show();
      //If features for selected layer are available then use them else query for those features
      if (this._searchedFeatures[this._selectedLayer.id]) {
        this._hideAllLayers();
        if (this._searchedFeatures[this._selectedLayer.id].length > 0) {
          this._creatFeatureList(this._searchedFeatures[this._selectedLayer.id]);
        }
        this.loading.hide();
        if (defer) {
          defer.resolve();
        }
      } else {
        queryParams = this._getQueryParams(this._selectedLayer);
        // if intersectSearchedLocation option is 'ON' and layer is polygon layer then,
        // query for features which are intersecting searched location instead of buffer area
        if (this.config.intersectSearchedLocation && this._selectedLayer &&
          this._selectedLayer.geometryType === "esriGeometryPolygon" && this._selectedPoint) {
          queryParams.geometry = this._selectedPoint.geometry;
        }
        this._selectedLayer.queryFeatures(queryParams, lang.hitch(this,
          function (featureSet) {
            this._hideAllLayers();
            //check if any feature is found
            if (featureSet.features.length > 0) {
              this._showFilteredFeaturesOnLoad(featureSet.features, this._selectedLayer.id);
              //creates feature list
              this._creatFeatureList(featureSet.features);
            }
            this.loading.hide();
            if (defer) {
              defer.resolve();
            }
          }), lang.hitch(this, function () {
            this.loading.hide();
            //add layer to the failed layer list if it fails to fetch the results
            this._failedLayers.push(this._selectedLayer.title);
            if (defer) {
              defer.resolve();
            }
          }));
      }
    },
    /**
    *reset filters on all map layers
    **/
    resetAllFilters: function () {
      for (var i = 0; i < this._operationalLayers.length; i++) {
        this._resetFilter(this._operationalLayers[i].layerIndex);
      }
    },

    /**
    * set count field layer/feature template div
    * @param{object} templateDiv
    * @param{int} value
    * @param{boolean} isFeatureCount
    * @param{boolean} isError
    * @memberOf widgets/NearMe/item-list
    **/
    _setItemCount: function (templateDiv, value, isFeatureCount) {
      var divFeatureCount, divItemName, formattedValue;
      divFeatureCount = query(".esriCTItemCount", templateDiv)[0];
      divItemName = query(".esriCTItemName", templateDiv)[0];
      if (divFeatureCount) {
        domClass.remove(divFeatureCount, "esriCTLoadingIcon");
        //check whether feature count or distance from selected location has to be displayed in count field
        if (isFeatureCount) {
          value = this._getMaxResultCountValue(value, this._selectedLayer.maxRecordCount);
          //show feature count in selected buffer
          domAttr.set(divFeatureCount, "innerHTML", "(" + number.format(value) + ")");
          if (value) {
            this._isNoFeature = false;
            //do not enable node if respective layer has no feature
            domClass.remove(templateDiv, "esriCTDisabled");
            //once feature cont is shown it means layer is ready for accessing it features
            //so set the tabindex to allow it access by keys
            domAttr.set(templateDiv, "tabindex", "0");
            //set focus to first loaded layer in the layerList
            focusUtil.focus(query(".esriCTItemlList[tabindex='0']", templateDiv.parentElement)[0]);
          }
        } else {
          formattedValue = (number.format(value.toFixed(2)) + " " +
            this.nls.units[this.config.bufferDistanceUnit.value].acronym);
          //show distance from selected location to the feature
          domAttr.set(divFeatureCount, "innerHTML", formattedValue);
          //Also add distance info to the tooltip of item title
          if (divItemName) {
            domAttr.set(divItemName, "title",
              domAttr.get(divItemName, "title") + " " + formattedValue);
          }
        }
      }
    },

    /**
    * set max result count value to display for features retrieved
    * @param{int} featureCount
    * @param{int} layerMaxRecordCount
    * @memberOf widgets/NearMe/item-list
    **/
    _getMaxResultCountValue: function (featureCount, layerMaxRecordCount) {
      var maxResultCount;
      //if in any case layer max record cont is not valid set it to 1000
      if (!layerMaxRecordCount) {
        layerMaxRecordCount = 1000;
      }
      //In case of attribute search dont honor configured maxResultCount only honor layers max record count
      //check if configured maximum result count exists and is not greater than layer's maxRecordCount
      if (!this._attributeSearchList && this.config.maxResultCount &&
        this.config.maxResultCount <= layerMaxRecordCount) {
        // check if retrieved feature count is less than configured maxResultCount and
        // if true then set the maxResultCount as featureCount
        if (featureCount < this.config.maxResultCount) {
          maxResultCount = featureCount;
        }
        //else set configured maxResultCount as maxResultCount
        else {
          maxResultCount = this.config.maxResultCount;
        }
      }
      else {
        // check if retrieved feature count is less than layer's maxRecordCount
        // and if true then set the maxResultCount as featureCount
        if (featureCount < layerMaxRecordCount) {
          maxResultCount = featureCount;
        }
        //else set configured maxResultCount as layer's maxRecordCount
        else {
          maxResultCount = layerMaxRecordCount;
        }
      }
      return maxResultCount;
    },

    /**
    * create feature list UI
    * @param{object} features
    * @memberOf widgets/NearMe/item-list
    **/
    _creatFeatureList: function (features) {
      var i, featureDiv, featureIds = '', divFeatureCount, maxFeatureLength;
      //as features are found set off the flag
      this._isNoFeature = false;
      //sort features according to distance.
      if (features.length > 0) {
        features = this._getSortedFeatureList(features);
      }
      maxFeatureLength = this._getMaxResultCountValue(features.length,
        this._selectedLayer.maxRecordCount);
      //Directly display feature Info Pane if only 1 feature found
      if (maxFeatureLength === 1) {
        this._onSingleFeatureFound(features[0]);
      }
      else {
        //create template for each feature
        for (i = 0; i < maxFeatureLength; i++) {
          if (featureIds) {
            featureIds += ',';
          }
          featureIds += features[i].attributes[this._selectedLayer.objectIdField];
          featureDiv = domConstruct.toDom(this._itemListTemplate).childNodes[0];
          domClass.add(featureDiv, "esriCTFeatureListItem");
          //set tabindex 0 so that rows can be accessed by keys
          domAttr.set(featureDiv, "tabindex", "0");
          this._featureListContent.appendChild(featureDiv);
          this._setItemName(featureDiv, features[i].getTitle());
          /**
           * -If showing attribute search result Or
           * -If geometry type is polygon & Only return polygons that intersect the search location
           *  flag is enabled then dont show distances and hide loading indicators
           * -Else is feature has distanceToLocation property set it
           */
          if (this._attributeSearchList ||
            (features[i].geometry.type === "polygon" && this.config.intersectSearchedLocation)) {
            divFeatureCount = query(".esriCTItemCount", featureDiv)[0];
            // if distance to location domNode created and then hide loading icon
            if (divFeatureCount) {
              domClass.remove(divFeatureCount, "esriCTLoadingIcon");
            }
          } else if (features[i].hasOwnProperty('distanceToLocation')) {
            this._setItemCount(featureDiv, features[i].distanceToLocation, false);
          }
          this._attachEventOnFeatureDiv(featureDiv, features[i]);
        }
        if (this.parentDivId && registry.byId(this.parentDivId) &&
          registry.byId(this.parentDivId).resize) {
          registry.byId(this.parentDivId).resize();
        }
        this._displayFilteredFeatures(featureIds);
        this._showPanel("featureListPanel");
        //focus to first feature in the row
        focusUtil.focus(query(".esriCTItemlList[tabindex='0']", this._featureListContent)[0]);
        this.loading.hide();
      }
    },

    /**
    * Display searched features only if 'selectedSearchlayerOnly' is set to true
    * @param{string} featureIds: object ids for searched features
    * @memberOf widgets/NearMe/item-list
    **/
    _displayFilteredFeatures: function (featureIds) {
      if (this.config.selectedSearchLayerOnly) {
        var filter;
        //display selected layer only
        this._showHideOperationalLayer(this._selectedLayer.url, this._selectedLayer
          .id, true);
        filter = this._selectedLayer.objectIdField + ' in (' + featureIds + ')';
        //set filter on query layer
        this._selectedLayer.setDefinitionExpression(filter);
      }
    },

    /**
    * apply filter on map layer
    * @param{object} filter to be applied on map layer
    * @param{string} id:layer id on map
    * @param{string} layerURL
    * @memberOf widgets/NearMe/item-list
    **/
    _setFilterOnMapLayer: function (filter, id, layerURL, isMapServer) {
      var seletedMapLayer, layerDef = [], layerId, layerIdOnMap;
      //check whether id is available
      if (id) {
        if (!isMapServer) {
          seletedMapLayer = this.map.getLayer(id);
          if (seletedMapLayer) {
            this.filterManager.applyWidgetFilter(id, this.id, filter);
          }
        } else {
          //fetch id of map server layer
          layerIdOnMap = id.substring(0, id.lastIndexOf('_'));
          seletedMapLayer = this.map.getLayer(layerIdOnMap);
          if (seletedMapLayer) {
            layerDef = [];
            layerId = layerURL[layerURL.length - 1];
            layerDef[layerId] = filter;
            //set layer definition for map service layer
            this.filterManager.applyWidgetFilter(layerIdOnMap, this.id, filter);
          }
        }
      }
    },

    /**
    * reset applied filter on layers and display webmap configured filter only
    * @param{object} featureLayer
    * @param{int} index
    * @memberOf widgets/NearMe/item-list
    **/
    _resetFilter: function (layerIndex) {
      var layerIdOnMap, widgetFilter;
      if (this._operationalLayers[layerIndex].isMapServer) {
        layerIdOnMap = this._operationalLayers[layerIndex].id.substring(0,
          this._operationalLayers[layerIndex].id.lastIndexOf('_'));
      } else {
        layerIdOnMap = this._operationalLayers[layerIndex].id;
      }
      widgetFilter = this.filterManager.getWidgetFilter(layerIdOnMap, this.id);
      if (widgetFilter) {
        //reset widget filter on map layer by applying empty filter
        this._setFilterOnMapLayer("", this._operationalLayers[layerIndex].id,
          this._operationalLayers[layerIndex].url,
          this._operationalLayers[layerIndex].isMapServer);
        //once widget filter gets cleared, get updated filter on layer using layerInfos
        LayerInfos.getInstance(this.map, this.map.webMapResponse.itemInfo).then(
          lang.hitch(this, function (layerInfosObj) {
            var filter, mapLayer;
            mapLayer = layerInfosObj.getLayerInfoById(layerIdOnMap);
            if (mapLayer) {
              filter = mapLayer.getFilter();
              //in case if map services try to get filter from the individual layer layer id
              if (!filter && this._operationalLayers[layerIndex].isMapServer) {
                mapLayer = layerInfosObj.getLayerInfoById(this._operationalLayers[layerIndex].id);
                if (mapLayer) {
                  filter = mapLayer.getFilter();
                }
              }
              this.config.searchLayers[layerIndex].definitionExpression = filter;
              //set updated definition expression on the layer instances used by widget
              this._operationalLayers[layerIndex].setDefinitionExpression(filter);
            }
          }));
      } else {
        //set updated definition expression on the layer instances used by widget
        if (this._operationalLayers[layerIndex] && this.config.searchLayers[layerIndex]) {
          this._operationalLayers[layerIndex].setDefinitionExpression(
            this.config.searchLayers[layerIndex].definitionExpression);
        }
      }
    },

    /**
     * If showing results of attribute search sort the features list by title else
     * Sort the features list according to the distance from the selected location
     * @param{object} features
     * @memberOf widgets/NearMe/item-list
     */
    _getSortedFeatureList: function (features) {
      var i, getGeodesicDistances;
      getGeodesicDistances = this._canGetGeodesicDistance();
      for (i = 0; i < features.length; i++) {
        //if showing results of attribute search sort list by title
        //else sort by distance from the selected location
        if (this._attributeSearchList) {
          features[i].distanceToLocation = features[i].getTitle().toLowerCase();
        } else {
          if (getGeodesicDistances) {
            features[i].distanceToLocation = this._getGeodesicDistances(features[i].geometry);
          } else {
            if (this._selectedPoint) {
              features[i].distanceToLocation = GeometryEngine.distance(this._selectedPoint.geometry,
                features[i].geometry, this.config.bufferDistanceUnit.distanceUnit);
            } else {
              features[i].distanceToLocation = 0;
            }
          }
        }
      }
      //apply sorting on the features array.
      features.sort(function (a, b) {
        if (a.distanceToLocation < b.distanceToLocation) {
          return -1;
        }
        if (a.distanceToLocation > b.distanceToLocation) {
          return 1;
        }
        return 0;
      });
      return features;
    },

    /**
    * This function returns if geodesic calculation is done or not
    * @memberOf widgets/NearMe/item-list
    **/
    _canGetGeodesicDistance: function () {
      var outSR;
      outSR = new SpatialReference(4326);
      if (this.config.isGeodesic && this._selectedPoint &&
        webMercatorUtils.canProject(this._selectedPoint.geometry, outSR)) {
        return true;
      }
      return false;
    },

    /**
    * sort feature list according to the distance from the selected location
    * @param{object} features
    * @memberOf widgets/NearMe/item-list
    **/
    _getGeodesicDistances: function (featureGeometry) {
      var selectedPoint, polyline, distance, outSR, nearestResult;
      if (!this._selectedPoint) {
        return 0;
      }
      if (this._selectedPoint.geometry.type === "point") {
        selectedPoint = this._selectedPoint.geometry;
      } else {
        selectedPoint = this._selectedPoint.geometry.getPoint(0, 0);
      }
      //if selected geometry is not point then get the nearest cooordinate of the geometry
      if (featureGeometry.type !== "point") {
        nearestResult = GeometryEngine.nearestCoordinate(
          featureGeometry, selectedPoint);
        if (nearestResult && !nearestResult.isEmpty) {
          featureGeometry = nearestResult.coordinate;
        } else {
          return 0;
        }
      }
      polyline = new Polyline([
        [selectedPoint.x, selectedPoint.y],
        [featureGeometry.x, featureGeometry.y]]);
      polyline.setSpatialReference(selectedPoint.spatialReference);
      outSR = new SpatialReference(4326);
      if (webMercatorUtils.canProject(featureGeometry, outSR)) {
        polyline = webMercatorUtils.project(polyline, outSR);
        distance = GeometryEngine.geodesicLength(polyline,
          this.config.bufferDistanceUnit.distanceUnit);
        if (isNaN(distance)) {
          distance = 0;
        }
      }
      return distance;
    },

    /**
    * attach 'click' event on right arrow to display next panel
    * @param{object} featureDiv
    * @param{object} selectedFeature
    * @memberOf widgets/NearMe/item-list
    **/
    _attachEventOnFeatureDiv: function (featureDiv, selectedFeature) {
      //handle both click & key press event to show info
      this.own(on(featureDiv, "click, keypress", lang.hitch(this, function (event) {
        var charOrCode;
        //if event is key press, perform operation only if key is ENTER
        if (event.type === "keypress") {
          charOrCode = event.charCode || event.keyCode;
          if (charOrCode !== keys.ENTER) {
            return;
          }
        }
        this._isFeatureList = true;
        var infoPanelBackBtn = query(".esriCTBackButton", this._panels.infoPanel)[0];
        if (infoPanelBackBtn) {
          domStyle.set(infoPanelBackBtn, 'display', 'block');
        }
        this._showFeatureDetails(featureDiv, selectedFeature);
      })));
    },

    /**
    * displays selected feature info in infoPanel
    * @param{object} featureDiv
    * @param{object} selectedFeature
    * @memberOf widgets/NearMe/item-list
    **/
    _showFeatureDetails: function (featureDiv, selectedFeature) {
      //display layer title as header text
      this._setItemName(this._panels.infoPanel, this._selectedLayer.title);
      this._showPanel("infoPanel");
      //open information tab
      if (this._tabContainer) {
        this._tabContainer.selectTab(this.nls.informationTabTitle);
      }
      this._selectedFeatureItem = featureDiv;
      this._selectedFeature = selectedFeature;
      this._clearDirections();
      this._highlightFeatureOnMap();
      //display popup info for selected feature
      this._displayFeatureInfo(selectedFeature);
      if (this.parentDivId && registry.byId(this.parentDivId) &&
        registry.byId(this.parentDivId).resize) {
        registry.byId(this.parentDivId).resize();
      }
    },

    /**
    * set popup info content in information container
    * @param{object} selectedFeature
    * @memberOf widgets/NearMe/item-list
    **/
    _displayFeatureInfo: function (selectedFeature) {
      var selectedFeaturePoint, selectedPoint, polyline, polylineJson;
      if (this._loadAttachmentTimer) {
        clearTimeout(this._loadAttachmentTimer);
      }
      if (this._featureInfoPanel) {
        this._featureInfoPanel.set("content", "");
        //show distance from selected location to the feature in details panel
        //When showing results of attribute search we dont have distance to location so skip it
        //Also geometry type is polygon & Only return polygons that intersect the search location
        //flag is enabled then dont show approximate distances
        if (!this._attributeSearchList &&
          !(selectedFeature.geometry.type === "polygon" && this.config.intersectSearchedLocation)) {
          this._addDistanceToLocationInDetailsPanel(selectedFeature);
        }
        this._showPopupInfo(selectedFeature, selectedFeature._layer);
        // Check if attribute symbology is configured for selected layer
        if (this.config.attributeSymbology &&
          this.config.attributeSymbology.hasOwnProperty(this._selectedLayer.id)) {
          this._checkAttributeSymbology(selectedFeature);
        }
      }
      //check if 'zoomTofeature' is set to true in config
      if (this.config.zoomToFeature) {
        //zoom to the selected feature
        if (selectedFeature.geometry.type === "point") {
          selectedFeaturePoint = selectedFeature.geometry;
          //If valid starting point, then shows extent of both the selectedFeature & selectedPoint
          //else zoom to the point feature
          if (this._selectedPoint) {
            selectedPoint = this._getPointFromGeometry(this._selectedPoint.geometry);
            polylineJson = {
              "paths": [[[selectedFeaturePoint.x, selectedFeaturePoint.y],
              [selectedPoint.x, selectedPoint.y]]],
              "spatialReference": this.map.spatialReference
            };
            polyline = new Polyline(polylineJson);
            this.map.setExtent(polyline.getExtent().expand(1.5));
          } else {
            this.map.centerAndZoom(selectedFeature.geometry, this.map.getMaxZoom() - 1);
          }
        } else {
          this.map.setExtent(selectedFeature.geometry.getExtent().expand(1.5));
        }
      }
      this._getRelatedRecords(selectedFeature);
    },

    /**
     * Adds distance to start location in details panel if it is available
     * @param{object} selectedFeature
     *  @memberOf widgets/NearMe/item-list
     */
    _addDistanceToLocationInDetailsPanel: function (selectedFeature) {
      var formatedDistance, distanceToLocationDiv, contentPane;
      if (selectedFeature.hasOwnProperty("distanceToLocation")) {
        //format the distance to show only 2 decimal place and add selected units acronym
        formatedDistance = number.format(selectedFeature.distanceToLocation.toFixed(2)) +
          " " + this.nls.units[this.config.bufferDistanceUnit.value].acronym;
        //create div to show distance
        distanceToLocationDiv = domConstruct.create("div", {
          "innerHTML": string.substitute(this.nls.approximateDistanceTitle,
            { DistanceToLocation: formatedDistance }),
          "class": "esriCTDistanceToLocation"
        });
        //create Content pane to add distance in it
        contentPane = new ContentPane({ "style": { "padding": "0px" } });
        //set and add content pane in feature info panel
        contentPane.set("content", distanceToLocationDiv);
        this._featureInfoPanel.addChild(contentPane);
      }
    },

    /**
    * Get related record from the selected layers's respective tables
    * @memberOf widgets/NearMe/item-list
    **/
    _getRelatedRecords: function (selectedFeature) {
      array.forEach(this._selectedLayer.tableInfos, lang.hitch(this, function (tableIndex) {
        var featureId = selectedFeature.attributes[this._selectedLayer.objectIdField];
        this._queryRelatedRecords(this._tables[tableIndex], featureId);
      }));
    },

    /**
    * Query for related records
    * @memberOf widgets/NearMe/item-list
    **/
    _queryRelatedRecords: function (tableInfo, featureId) {
      if (this._selectedLayer && tableInfo) {
        var queryParams = new RelationshipQuery();
        queryParams.objectIds = [parseInt(featureId, 10)];
        queryParams.outFields = ["*"];
        queryParams.relationshipId = tableInfo.relationshipIds[this._selectedLayer.id];
        //apply filter for related records if configured in webmap
        if (tableInfo.layerDefinition && tableInfo.layerDefinition.definitionExpression) {
          queryParams.definitionExpression = tableInfo.layerDefinition.definitionExpression;
        }
        this._selectedLayer.queryRelatedFeatures(queryParams, lang.hitch(this, function (results) {
          var fset, features;
          fset = results[featureId];
          features = fset ? fset.features : [];
          array.forEach(features, lang.hitch(this, function (feature) {
            //set webmap configured popup info for related feature
            feature.setInfoTemplate(new PopupTemplate(tableInfo.popupInfo));
            this._showPopupInfo(feature, this._tablesLayer[tableInfo.id]);
          }));
          if (this.parentDivId && registry.byId(this.parentDivId) &&
            registry.byId(this.parentDivId).resize) {
            registry.byId(this.parentDivId).resize();
          }
        }));
      }
    },

    /**
    * Show related popup info in information panel
    * @memberOf widgets/NearMe/item-list
    **/
    _showPopupInfo: function (feature, layer) {
      var infoContent, popupRenderer, contentPane;
      if (this._featureInfoPanel && feature) {
        //create content pane to show info details
        contentPane = new ContentPane({ "class": "esriCTPopupInfo" });
        infoContent = feature.getContent(); //get content using API method
        popupRenderer = registry.byId(infoContent.id); //get its popupRenderer
        //set and add content pane in feature info panel
        contentPane.set("content", infoContent);
        this._featureInfoPanel.addChild(contentPane);
        //now check for attachments
        this._checkAttachments(popupRenderer, feature, layer);
      }
    },

    /**
    * check whether attachments are available in layer and enabled in webmap
    * @memberOf widgets/NearMe/item-list
    **/
    _checkAttachments: function (popupRenderer, feature, layer) {
      var attachmentsDiv;
      //hide the media section created by API
      domClass.add(query(".mediaSection", popupRenderer.domNode)[0], "esriCTHidden");
      //get attachments section created by API
      attachmentsDiv = query(".attachmentsSection", popupRenderer.domNode)[0];
      //empty it's content created by API so that we can add our own custom gallery
      domConstruct.empty(attachmentsDiv);
      domClass.remove(attachmentsDiv, "hidden");
      //if layer has attachments and showAttachments is true get attachments
      if (layer.hasAttachments && layer.showAttachments) {
        this.loading.show();//show loading indicator while getting attachments
        this._loadAttachmentTimer = setTimeout(lang.hitch(this, function () {
          this._showAttachments(feature, attachmentsDiv, layer, popupRenderer);
        }), 500);
      } else {
        this._createGallery(layer, attachmentsDiv, [], popupRenderer);
      }
    },

    /**
    * query layer to get attachments
    * @param{object} contains selected feature
    * @param{object} contains attachmentContainer
    * @param{object} contains selected layer
    * @memberOf widgets/NearMe/item-list
    **/
    _showAttachments: function (feature, attachmentContainer, layer, popupRenderer) {
      var objectID;
      objectID = feature.attributes[layer.objectIdField];
      domConstruct.empty(attachmentContainer);
      layer.queryAttachmentInfos(objectID, lang.hitch(this, function (infos) {
        this.loading.hide();//hide loading indicator shown while getting attachments
        //check if attachments found and create gallery
        this._createGallery(layer, attachmentContainer, infos, popupRenderer);
        if (this.parentDivId && registry.byId(this.parentDivId) &&
          registry.byId(this.parentDivId).resize) {
          registry.byId(this.parentDivId).resize();
        }
      }));
    },

    /**
    * query layer to create swiper gallery
    * @param{object} contains layer info
    * @param{object} contains attachmentContainer
    * @param{object} contains infos
    * @memberOf widgets/NearMe/item-list
    **/
    _createGallery: function (layer, attachmentContainer, infos, popupRenderer) {
      var slide, slideContent, imagePath, i, hasSlides, swiperContainer, fieldContent,
        swiperWrapper, nonImageAttachmentContainer, imageFormatDiv, gallerySwiper;
      //check hyperlinks from feature infos
      infos = this._checkForHyperlinks(infos, this._selectedFeature);
      var totalSlides = infos.length;
      if (infos && infos.length > 0 ||
        (layer && layer.infoTemplate && layer.infoTemplate.info &&
          layer.infoTemplate.info.mediaInfos && layer.infoTemplate.info.mediaInfos.length > 0)) {
        totalSlides += layer.infoTemplate.info.mediaInfos.length;
        this.loading.show();//show loading indicator while creating gallery
        fieldContent = domConstruct.create("div", {
          "class": "esriCTThumbnailContainer"
        }, attachmentContainer);
        domConstruct.create("div", {
          "style": {
            "clear": "both"
          }
        }, fieldContent);
        swiperContainer = domConstruct.toDom(SwiperLayoutTemplate);
        swiperWrapper = query(".swiper-wrapper", swiperContainer)[0];
        hasSlides = false;
        if (infos && infos.length > 0) {
          // display all attached images in thumbnails
          for (i = 0; i < infos.length; i++) {
            // check if a attachment is of tiff image, then convert it into a non-image document
            if (infos[i].contentType.indexOf("image") !== -1 &&
              infos[i].contentType.match(/(\/tiff)/)) {
              infos[i].contentType = "application/tiff";
            }
            // add to carousel only if it is an image type
            if (infos[i].contentType &&
              infos[i].contentType.indexOf("image") > -1) {
              slide = domConstruct.create("div", { 'class': 'swiper-slide' }, swiperWrapper);
              slideContent = domConstruct.create("img", {
                "alt": infos[i].url,
                "class": "esriCTAttachmentImg",
                'src': infos[i].url
              }, slide);
              this._attachEventOnImage(slideContent);
              hasSlides = true;
            } else if (infos[i].contentType &&
              infos[i].contentType.toLowerCase().indexOf("video/mp4") > -1) {
              slide = domConstruct.create("div", { 'class': 'swiper-slide' }, swiperWrapper);
              // add to carousel only if it is an mp4 attachment
              slideContent = domConstruct.toDom(
                '<video class="esriCTVideoElement" src="' + infos[i].url +
                '" height="auto" width="100%" controls><source src="' + infos[i].url +
                '" type="' + infos[i].contentType + '" poster="' + infos[i].url +
                '"></video>');
              domConstruct.place(slideContent, slide);
              hasSlides = true;
            } else {
              nonImageAttachmentContainer = domConstruct.create("div", {
                "class": "esriCTNonImageAttachmentContainer"
              }, attachmentContainer);
              //set default image path if attachment has no image URL
              imagePath = this.folderUrl + "images/no-attachment.png";
              slideContent = domConstruct.create("img", {
                "alt": infos[i].url,
                "class": "esriCTNonImageAttachmentImg esriCTAutoHeight",
                "src": imagePath
              }, nonImageAttachmentContainer);
              imageFormatDiv = domConstruct.create("div", {
                "alt": infos[i].url,
                "class": "esriCTImageFormatDiv"
              }, nonImageAttachmentContainer);
              this._fetchDocumentContentType(infos[i], imageFormatDiv);
              this._attachEventOnImage(nonImageAttachmentContainer);
            }
          }
        }
        // Check for media infos
        this._charts = [];
        this._checkMediaInfos(swiperWrapper, popupRenderer).then(
          lang.hitch(this, function (hasMediaInfos) {
            // if hasSlides/hasMediaInfos then create swiper carousel
            if (hasSlides || hasMediaInfos) {
              domConstruct.place(swiperContainer, attachmentContainer);
              gallerySwiper = new Swiper(swiperContainer, {
                height: "250px",
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                slidesPerView: 1,
                paginationClickable: true,
                spaceBetween: 30,
                loop: true
              });
              //on slider change pause videos in the gallery
              this.own(on(gallerySwiper, "onSlideChangeStart", lang.hitch(this, function () {
                array.forEach(query(".esriCTVideoElement", swiperWrapper), lang.hitch(this,
                  function (video) {
                    video.pause();
                  }));
              })));
              //resize all the charts
              array.forEach(this._charts, lang.hitch(this, function (chart) {
                chart.resize(200, 200);
              }));
              //Hide Next/Prev icons and disable the swipe event when only one image is available
              if (totalSlides === 1) {
                //Hide next button
                if (gallerySwiper.nextButton && gallerySwiper.nextButton.length > 0) {
                  domClass.add(gallerySwiper.nextButton[0], "esriCTHidden");
                }
                //Hide prev button
                if (gallerySwiper.prevButton && gallerySwiper.prevButton.length > 0) {
                  domClass.add(gallerySwiper.prevButton[0], "esriCTHidden");
                }
                //Disables swipe
                gallerySwiper.lockSwipes();
              }
            }
            this.loading.hide();//hide loading indicator shown while creating gallery
          }));
      }
    },

    /**
    * This function is used to get images or videos from hyperlinks
    * @param{object} contains attachments information
    * @memberOf widgets/NearMe/item-list
    */
    _checkForHyperlinks: function (infos, feature) {
      var attributes, name, imgObject, videoObject;
      attributes = [];
      attributes = feature.attributes;
      // loop through each attributes of the feature to get images or videos from hyperlinks
      for (name in attributes) {
        if (attributes.hasOwnProperty(name) && attributes[name] &&
          String(attributes[name]).match(/^(http(s?):)/)) {
          // check for supporting image extension and create the object accordingly
          // else, check for mp4 video extension
          if (String(attributes[name]).match(/\.(png|jpg|jpeg|gif|bmp)(\/|$)/i)) {
            imgObject = {};
            imgObject.contentType = "image/" +
              String(attributes[name]).match(/\.(png|jpg|jpeg|gif|bmp)(\/|$)/i)[1];
            imgObject.url = attributes[name];
            infos.push(imgObject);
          } else if (String(attributes[name]).match(/\.(mp4)(\/?)/i)) {
            videoObject = {};
            videoObject.contentType = "video/mp4";
            videoObject.url = attributes[name];
            infos.push(videoObject);
          }
        }
      }
      return infos;
    },

    /**
    * This function is used to check media infos
    * @param{node} contains swiper wrapper
    * @param{PopupRenderer} PopupRenderer object created once feature.getContent() is called
    * @memberOf widgets/NearMe/item-list
    */
    _checkMediaInfos: function (swiperWrapper, popupRenderer) {
      var slide, slideContent, deferred, deferredList, mediaInfos;
      deferred = new Deferred();
      deferredList = [];
      //if some charts are not valid they will be filtered so use the popupRenderer media info
      //else use it from the template
      if (popupRenderer._mediaInfos && popupRenderer._mediaInfos.length > 0) {
        mediaInfos = popupRenderer._mediaInfos;
      } else if (popupRenderer && popupRenderer.template.info &&
        popupRenderer.template.info.mediaInfos &&
        popupRenderer.template.info.mediaInfos.length > 0) {
        mediaInfos = popupRenderer.template.info.mediaInfos;
      }
      // if selected layer has media infos
      if (mediaInfos && popupRenderer._mediaInfos && popupRenderer._mediaInfos.length > 0) {
        setTimeout(lang.hitch(this, function () {
          // loop through each node of media info and place it in swiper wrapper node
          for (var i = 0; i < mediaInfos.length; i++) {
            var mediaInfo = mediaInfos[i];
            //if media is of type image
            //or if it is chart then it should have valid fields to render chart
            if (mediaInfo.type === "image" ||
              (mediaInfo.type !== "image" &&
                mediaInfo.value.fields && mediaInfo.value.fields.length > 0)) {
              //create slide and contents container to hold image/charts
              slide = domConstruct.create("div", { 'class': 'swiper-slide' }, swiperWrapper);
              //if media is image handle its click event to open image in new window
              if (mediaInfo.type === "image") {
                slideContent = domConstruct.create("img", {
                  "alt": mediaInfo.value.sourceURL,
                  "class": "esriCTAttachmentImg",
                  'src': mediaInfo.value.sourceURL
                }, slide);
                this._attachEventOnImage(slideContent);
              } else {
                //load media chart
                deferredList.push(this._loadMediaCharts(popupRenderer, mediaInfo, slide));
              }
            }
          }
          if (deferredList.length > 0) {
            All(deferredList).then(lang.hitch(this, function () {
              deferred.resolve(true);
            }));
          } else {
            deferred.resolve(true);
          }
        }), 1000);
      } else {
        deferred.resolve(false);
      }
      return deferred.promise;
    },

    /**
     * Function loads chart modules required for rendering chart and calls create chart method
     * @param{popupRenderer} popupRenderer object created once feature.getContent() is called
     * @param{mediaInfo} mediaInfo for creating chart
     * @param{node} domNode in which chart needs to be created
     * @memberOf widgets/NearMe/item-list
     */
    _loadMediaCharts: function (popupRenderer, mediaInfo, node) {
      var deferred = new Deferred(),
        l = this,
        d = ["dojox/charting/Chart2D", "dojox/charting/action2d/Tooltip"],
        e = mediaInfo.value.theme || popupRenderer.chartTheme;
      if (lang.isString(e)) {
        e = e.replace(/\./gi, "/");
        if (e.indexOf("/") === -1) {
          e = "dojox/charting/themes/" + e;
        }
      }
      if (!e) {
        e = "esri/dijit/Rainbow";
      }
      d.push(e);
      //load required classes for rendering charts
      try {
        require(d, function (b, c, d) {
          l._createChart(node, mediaInfo, b, c, d).then(lang.hitch(this, function () {
            deferred.resolve();
          }));
        });
      } catch (k) {
        deferred.resolve();
      }
      return deferred.promise;
    },

    /**
     * Function creates chart in the gallery node
     * @param{node} domNode in which chart needs to be created
     * @param{mediaInfo} mediaInfo for creating chart
     * @param{e} dojox/charting/Chart2D
     * @param{f} dojox/charting/action2d/Tooltip
     * @param{g} Selected chart theme
     * @memberOf widgets/NearMe/item-list
     */
    _createChart: function (node, mediaInfo, e, f, g) {
      var deferred, chartType, c;
      chartType = mediaInfo.type;
      c = mediaInfo.value;
      deferred = new Deferred();
      e = new e(domConstruct.create("div", {
        "class": "chart"
      }, node));
      if (g) {
        e.setTheme(g);
      }
      switch (chartType) {
        case "piechart":
          e.addPlot("default", {
            type: "Pie",
            labels: !1
          });
          e.addSeries("Series A", c.fields);
          break;
        case "linechart":
          e.addPlot("default", {
            type: "Markers"
          });
          e.addAxis("x", {
            min: 0,
            majorTicks: !1, minorTicks: !1,
            majorLabels: !1, minorLabels: !1
          });
          e.addAxis("y", {
            includeZero: !0,
            vertical: !0,
            fixUpper: "minor"
          });
          array.forEach(c.fields,
            function (a, b) {
              a.x = b + 1;
            });
          e.addSeries("Series A", c.fields);
          break;
        case "columnchart":
          e.addPlot("default", {
            type: "Columns",
            gap: 3
          });
          e.addAxis("y", {
            includeZero: !0,
            vertical: !0,
            fixUpper: "minor"
          });
          e.addSeries("Series A", c.fields);
          break;
        case "barchart":
          e.addPlot("default", {
            type: "Bars",
            gap: 3
          });
          e.addAxis("x", {
            includeZero: !0,
            fixUpper: "minor",
            minorLabels: !1
          });
          e.addAxis("y", {
            vertical: !0,
            majorTicks: !1, minorTicks: !1,
            majorLabels: !1, minorLabels: !1
          });
          e.addSeries("Series A", c.fields);
      }
      new f(e);
      e.render();
      this._charts.push(e);
      deferred.resolve();
      return deferred.promise;
    },

    /**
    * Function to fetch document content type
    * @param{object} attachment object
    * @param{node} file format node
    * @memberOf widgets/NearMe/item-list
    **/
    _fetchDocumentContentType: function (attachmentData, fileTypeContainer) {
      var typeText, fileExtensionRegEx, fileExtension;
      fileExtensionRegEx = /(?:\.([^.]+))?$/; //ignore jslint
      fileExtension = fileExtensionRegEx.exec(attachmentData.name);
      if (fileExtension && fileExtension[1]) {
        typeText = "." + fileExtension[1].toUpperCase();
      } else {
        typeText = this.nls.unknownAttachmentExt;
      }
      domAttr.set(fileTypeContainer, "innerHTML", typeText);
    },

    /**
    * attach event on attachment image
    * @param{object} imageDiv
    * @param{object} defer
    * @memberOf widgets/NearMe/item-list
    **/
    _attachEventOnImage: function (imageDiv) {
      // Show image in new tab on click of the image thumbnail
      this.own(on(imageDiv, "click", lang.hitch(this, this._displayImageAttachments)));
    },

    /**
    * This function is used to show attachments in new window when user clicks on the attachment thumbnail
    * @param{object} evt
    * @memberOf widgets/NearMe/item-list
    **/
    _displayImageAttachments: function (evt) {
      window.open(domAttr.get(evt.target, "alt"));
    },

    /**
    * This function is used to notify that image is loaded
    * Hide the image loader once the image is loaded, and set the image dimensions so that complete image will be shown in thumbnail.
    * @param{object} evt
    * @memberOf widgets/NearMe/item-list
    **/
    _onImageLoad: function (evt) {
      domClass.remove(evt.target.parentNode, "esriCTImageLoader");
      this._setImageDimensions(evt.target);
    },

    /**
    * This function is used to set the images dimensions so that the complete image will be shown in thumbnail
    * @param{object} imgModule
    * @memberOf widgets/NearMe/item-list
    **/
    _setImageDimensions: function (imgModule) {
      var aspectRatio, newWidth, newHeight, imgHeight, imgContainer = imgModule.parentElement;
      if (imgModule && imgModule.offsetHeight > 0) {
        //set original dimensions of image as it max dimensions.
        domAttr.set(imgModule, "originalHeight", imgModule.offsetHeight);
        domStyle.set(imgModule, "maxHeight", imgModule.offsetHeight + 'px');
        domStyle.set(imgModule, "maxWidth", imgModule.offsetWidth + 'px');

        imgHeight = parseFloat(domAttr.get(imgModule, "originalHeight"));
        if (imgContainer.offsetHeight < imgModule.offsetHeight || imgHeight >
          imgContainer.offsetHeight) {
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
      }
    },

    /**
    * hide image loader if image gets failed to load
    * @memberOf widgets/NearMe/item-list
    **/
    _onError: function (evt) {
      domClass.remove(evt.target.parentNode, "esriCTImageLoader");
    },

    /**
    * set searched location
    * @memberOf widgets/NearMe/item-list
    **/
    _setSearchedLocation: function (location) {
      this._selectedPoint = location;
    },

    /**
    * set service area
    * @memberOf widgets/NearMe/item-list
    **/
    _setServiceArea: function (serviceArea) {
      this._serviceArea = serviceArea;
    },

    /**
    * clear results panels
    * @memberOf widgets/NearMe/item-list
    **/
    clearResultPanel: function () {
      this._isFeatureList = false;
      this._clearContent(this._panels.layerListPanel);
      domStyle.set(this._panels.layerListPanel, "display", "none");
      domStyle.set(this._panels.featureListPanel, "display", "none");
      domStyle.set(this._panels.infoPanel, "display", "none");
      this._clearContent(this._featureListContent);
      this._clearDirections();
      this._clearGrahics();
    },

    /**
    * remove graphics layer from map
    * @memberOf widgets/NearMe/item-list
    **/
    removeGraphicsLayer: function () {
      if (this._featureGraphicsLayer) {
        this.map.removeLayer(this._featureGraphicsLayer);
        this._featureGraphicsLayer = null;
      }
    },

    /**
    * clear graphics from map
    * @memberOf widgets/NearMe/item-list
    **/
    _clearGrahics: function () {
      if (this._featureGraphicsLayer) {
        this._featureGraphicsLayer.clear();
      }
    },
    /**
    * Show selected panel
    * @param{string} name
    * @param{boolean} isLeft
    * @memberOf widgets/NearMe/item-list
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
      if (this.parentDivId && registry.byId(this.parentDivId) &&
        registry.byId(this.parentDivId).resize) {
        registry.byId(this.parentDivId).resize();
      }
      //Hide filter button in info panel and show on layer/feature list panel
      //Added timeout to fix issue in Edge
      //where filter button was not rendering properly due to animation
      domClass.add(this._filterButton, "esriCTHidden");
      setTimeout(lang.hitch(this, function () {
        if (this._currentPanelName !== "infoPanel") {
          domClass.remove(this._filterButton, "esriCTHidden");
        } else {
          domClass.add(this._filterButton, "esriCTHidden");
        }
      }), 400);

    },

    /**
    * animate panels
    * @param{object} dom
    * @param{int} startLeft
    * @param{int} endLeft
    * @memberOf widgets/NearMe/item-list
    **/
    _slide: function (dom, startLeft, endLeft) {
      domStyle.set(dom, 'display', 'block');
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
        duration: 300,
        onEnd: lang.hitch(this, function () {
          domStyle.set(dom, 'left', endLeft);
          if (endLeft === 0) {
            domStyle.set(dom, 'display', 'block');
          } else {
            domStyle.set(dom, 'display', 'none');
          }
          this._isSlide = true;
        })
      }).play();
    },

    /**
    * create and show alert message.
    * @param {string} msg
    * @memberOf widgets/NearMe/item-list
    **/
    _showMessage: function (msg) {
      var alertMessage = new Message({
        message: msg
      });
      alertMessage.message = msg;
    },

    /**
    * initialize direction dijit
    * @memberOf widgets/NearMe/item-list
    **/
    _initializeDirectionWidget: function () {
      var directionParams;
      //create direction widget instance if not created
      if (!this._directionsWidget) {
        if (registry.byId("directionDijit")) {
          registry.byId("directionDijit").destroy();
        }
        //configure direction parameters
        directionParams = {
          id: "directionDijit",
          map: this.map,
          directionsLengthUnits: units[this.config.directionLengthUnit.routeUnit],
          showTrafficOption: false,
          dragging: false,
          routeTaskUrl: this.config.routeService,
          routeSymbol: new SimpleLineSymbol(this.config.symbols.routeSymbol)
        };
        this._directionsWidget = new Directions(directionParams, domConstruct.create(
          "div", {}, null));
        this._directionsWidget.startup();
        //on completing directions resize widget panel and zoom to the generated route
        this.own(this._directionsWidget.on("directions-finish", lang.hitch(this, function () {
          this._directionsWidget.zoomToFullRoute();
          if (this.parentDivId && registry.byId(this.parentDivId) &&
            registry.byId(this.parentDivId).resize) {
            registry.byId(this.parentDivId).resize();
          }
          this.loading.hide();
        })));
        //place direction node into direction tab container
        this._directionInfoPanel.set('content', this._directionsWidget.domNode);
      }
      this._routeSelectedLocations();
    },

    /**
    * clear direction results from the map and direction container
    * @memberOf widgets/NearMe/item-list
    **/
    _clearDirections: function () {
      if (this._directionsWidget && this._routeCalculated) {
        this._directionsWidget.clearDirections();
      }
      this._routeCalculated = false;
    },

    /**
    * Returns point for any type of geometries
    * @memberOf widgets/NearMe/item-list
    **/
    _getPointFromGeometry: function (featureGeometry) {
      var point;
      switch (featureGeometry.type) {
        case "extent":
          point = featureGeometry.getCenter();
          break;
        case "multipoint":
          point = featureGeometry.getPoint(0);
          break;
        case "point":
          point = featureGeometry;
          break;
        case "polygon":
          point = featureGeometry.getCentroid();
          break;
        case "polyline":
          point = featureGeometry.getPoint(0, 0);
      }
      return point;
    },

    /**
    * generate route between searched location to selected feature
    * @memberOf widgets/NearMe/item-list
    **/
    _routeSelectedLocations: function () {
      var selectedLocations = [];
      //clear previous directions
      this._clearDirections();
      if (this._selectedPoint && this._selectedFeature) {
        //display loading indicator until direction gets calculated
        this.loading.show();
        //add starting location geometry point and selected feature geometry point in array
        selectedLocations.push(this._getPointFromGeometry(this._selectedPoint.geometry));
        selectedLocations.push(this._getPointFromGeometry(this._selectedFeature.geometry));

        // Calling update stops function for showing points on map and calculating direction.
        this._directionsWidget.updateStops(selectedLocations).then(lang.hitch(this, function () {
          this._directionsWidget.getDirections();
          //update _routeCalculated flag to 'true' if route gets calculated.
          this._routeCalculated = true;
        }), lang.hitch(this, function () {
          this.loading.hide();
          //display alert message if direction widget fails to generate route
          this._showMessage(this.nls.failedToGenerateRouteMsg);
        }));
      }
    },

    /**
    * highlight selected feature on map
    * @memberOf widgets/NearMe/item-list
    **/
    _highlightFeatureOnMap: function () {
      var graphics;
      this._clearGrahics();
      graphics = this._getHighLightSymbol(this._selectedFeature, this._selectedLayer);
      if (graphics && graphics.geometry) {
        this._featureGraphicsLayer.add(graphics);
      }
    },

    /**
    * Get symbol used for highlighting feature
    * @param{object} selected feature which needs to be highlighted
    * @param{object} details of selected layer
    */
    _getHighLightSymbol: function (graphic, layer) {
      // If feature geometry is of type point, add a cross-hair symbol
      // If feature geometry is of type polyline, highlight the line
      // If feature geometry is of type polygon, highlight the boundary of the polygon
      switch (graphic.geometry.type) {
        case "point":
        case "multipoint":
          return this._getPointSymbol(graphic, layer);
        case "polyline":
          return this._getPolyLineSymbol(graphic, layer);
        case "polygon":
          return this._getPolygonSymbol(graphic);
      }
    },

    /**
    * This function is used to get symbol for point geometry
    * @param{object} selected feature which needs to be highlighted
    * @param{object} details of selected layer
    * @memberOf widgets/NearMe/item-list
    */
    _getPointSymbol: function (graphic, layer) {
      var symbol, isSymbolFound, graphics, point, graphicInfoValue,
        layerInfoValue, i;
      isSymbolFound = false;
      symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE,
        null, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
          new Color([0, 255, 255, 1]), 3));
      symbol.setColor(null);
      symbol.size = 30; //set default Symbol size which will be used in case symbol not found.
      //check if layer is valid and have valid renderer object then only check for other symbol properties
      if (layer && layer.renderer) {
        if (layer.renderer.symbol) {
          isSymbolFound = true;
          symbol = this._updatePointSymbolProperties(symbol, layer.renderer
            .symbol);
        } else if (layer.renderer.infos && (layer.renderer.infos.length >
          0)) {
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
      if (graphic.geometry && graphic.geometry.type === "point") {
        point = new Point(graphic.geometry.x, graphic.geometry.y, new SpatialReference({
          wkid: graphic.geometry.spatialReference.wkid
        }));
      } else if (graphic.geometry && graphic.geometry.type === "multipoint") {
        point = new Multipoint(new SpatialReference({
          wkid: graphic.geometry.spatialReference.wkid
        }));
        if (graphic.geometry.points) {
          array.forEach(graphic.geometry.points, function (pt) {
            point.addPoint(pt);
          });
        }
      }
      graphics = new Graphic(point, symbol, graphic.attributes);
      return graphics;
    },

    /**
    * This function is used to get different data of symbol from infos properties of renderer object.
    * @param{object} symbol that needs to be assigned to selected/activated feature
    * @param{object} renderer layer Symbol
    * @memberOf widgets/NearMe/item-list
    */
    _updatePointSymbolProperties: function (symbol, layerSymbol) {
      var height, width, size;
      if (layerSymbol.hasOwnProperty("height") && layerSymbol.hasOwnProperty(
        "width")) {
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

    /**
    * This function is used to get symbol for polyline geometry
    * @param{object} selected feature which needs to be highlighted
    * @param{object} details of selected layer
    * @memberOf widgets/NearMe/item-list
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
        } else if ((layer.renderer.infos) && (layer.renderer.infos.length > 0)) {
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
      symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([
        0, 255, 255, 1
      ]), symbolWidth);
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
    * This function is used to get symbol for polygon geometry
    * @param{object} selected feature which needs to be highlighted
    * @memberOf widgets/NearMe/item-list
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
    * Hide all layers from map
    * @memberOf widgets/NearMe/item-list
    **/
    _hideAllLayers: function () {
      if (this.config.selectedSearchLayerOnly) {
        var i;
        for (i = 0; i < this.config.searchLayers.length; i++) {
          this._showHideOperationalLayer(this.config.searchLayers[i].url, this.config
            .searchLayers[i].id, false);
        }
      }
    },

    /**
    * Show all layers on map
    * @memberOf widgets/NearMe/item-list
    **/
    showAllLayers: function (honorLayersVisibility) {
      var i, showLayer;
      for (i = 0; i < this.config.searchLayers.length; i++) {
        //honour layers visibility captured on widget load
        if (honorLayersVisibility) {
          showLayer = this.config.searchLayers[i].visibility;
        } else {
          showLayer = true;
        }
        if (this.config.selectedSearchLayerOnly &&
          this._searchedFeatures[this.config.searchLayers[i].id] &&
          this._searchedFeatures[this.config.searchLayers[i].id].length < 1) {
          showLayer = false;
        }
        this._showHideOperationalLayer(this.config.searchLayers[i].url, this.config
          .searchLayers[i].id, showLayer);
      }
    },

    /**
    * Show/hide selected layer on map
    * @params{string} layerUrl
    * @params{string} id
    * @params{boolean} visibility
    * @memberOf widgets/NearMe/item-list
    **/
    _showHideOperationalLayer: function (layerUrl, id, visibility) {
      var layer, lastChar, mapLayerUrl, layerUrlIndex, visibleLayers, visibleLayerIndex;
      layerUrlIndex = layerUrl.split('/');
      layerUrlIndex = layerUrlIndex[layerUrlIndex.length - 1];
      for (layer in this.map._layers) {
        if (this.map._layers.hasOwnProperty(layer)) {
          //check if layer is visible on map
          if (id && this.map._layers[layer].url === layerUrl && this.map._layers[layer].id === id) {
            //show or hide selected layer on map
            this.map._layers[layer].setVisibility(visibility);
          } else if (this.map._layers[layer].visibleLayers) {
            //fetch id of map server layer to match with map layer
            if (id && this.map._layers[layer].id === id.substring(0, id.lastIndexOf('_'))) {
              //check for map server layer
              lastChar = this.map._layers[layer].url[this.map._layers[layer].url.length - 1];
              //create url for map server layer
              if (lastChar === "/") {
                mapLayerUrl = this.map._layers[layer].url + layerUrlIndex;
              } else {
                mapLayerUrl = this.map._layers[layer].url + "/" + layerUrlIndex;
              }
              //match layer urls
              if (mapLayerUrl === layerUrl) {
                //check whether layer is available in mp server's visible layer array
                visibleLayers = this.map._layers[layer].visibleLayers;
                visibleLayerIndex = array.indexOf(visibleLayers, parseInt(layerUrlIndex, 10));
                if (visibility) {
                  //show layer on map if it is not visible
                  if (visibleLayerIndex === -1) {
                    visibleLayers.push(parseInt(layerUrlIndex, 10));
                  }
                } else {
                  //hide layer on map if it is visible
                  if (visibleLayerIndex !== -1) {
                    visibleLayers.splice(visibleLayerIndex, 1);
                  }
                }
                //call setVisibleLayers method if available
                if (this.map._layers[layer].setVisibleLayers) {
                  this.map._layers[layer].setVisibleLayers(visibleLayers);
                } else {
                  //In case of tiled map setVisibleLayers method will not be available
                  //so directly set its visibility
                  this.map._layers[layer].visibleLayers = visibleLayers;
                  //show or hide selected layer on map
                  if (visibility && visibleLayers.length > 0) {
                    this.map._layers[layer].setVisibility(visibility);
                  } else {
                    this.map._layers[layer].setVisibility(visibility);
                  }
                }
              }
            }
          }
        }
      }
    },
    /**
    * Check attribute symbology configuration and create symbol based on attribute value
    * @params{object} selectedFeature
    * @memberOf widgets/NearMe/item-list
    **/
    _checkAttributeSymbology: function (selectedFeature) {
      var attributeSymbologyDiv, attachmentsDiv;
      attachmentsDiv = query(".attachmentsSection", this._featureInfoPanel.domNode)[0];
      //Search for attachment's div and append new dom for showing attribute symbols
      if (attachmentsDiv) {
        attributeSymbologyDiv = domConstruct.create("div", {
          "class": "esriCTAttributeSymbolWrapper"
        }, null);
        domConstruct.place(attributeSymbologyDiv, attachmentsDiv, "before");
      }
      //Loop through configured attribute symbols for a layer
      array.forEach(this.config.attributeSymbology[this._selectedLayer.id],
        lang.hitch(this, function (currentSymbology) {
          if (selectedFeature.attributes.hasOwnProperty(currentSymbology.fieldName) &&
            selectedFeature.attributes[currentSymbology.fieldName] ===
            currentSymbology.fieldValue) {
            //If attribute value matches configured value, create symbol based on configuration
            this._createAttributeSymbol(currentSymbology, attributeSymbologyDiv);
          }
        }));
    },
    /**
    * Create symbol based on attribute value
    * @params{object} currentSymbology
    * @params{object} parentN ode
    * @memberOf widgets/NearMe/item-list
    **/
    _createAttributeSymbol: function (currentSymbology, parentNode) {
      var symbolNode, symbolContainer, symbolJson, layerField;
      symbolJson = SymbolJsonUtils.fromJson(currentSymbology.symbol);
      layerField = this._selectedLayer.getField(currentSymbology.fieldName);
      symbolContainer = domConstruct.create('div', {
        "class": "esriCTAttributeSymbolContainer",
        "title": layerField && layerField.alias ? layerField.alias : ""
      }, parentNode);
      symbolNode = symbolUtils.createSymbolNode(symbolJson);
      domConstruct.place(symbolNode, symbolContainer);
    },
    /**
    * Set proximity icon color to selected theme color
    * @memberOf widgets/NearMe/item-list
    **/
    resetIconColors: function () {
      if (this._filterIcon) {
        domStyle.set(this._filterIcon, "background-color", this.selectedThemeColor);
      }
      if (this._proximityIcon) {
        domStyle.set(this._proximityIcon, "background-color", this.selectedThemeColor);
      }
    }
  });
});