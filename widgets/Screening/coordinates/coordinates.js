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
  'dojo/text!./coordinates.html',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/dom-class',
  'dojo/Evented',
  'jimu/BaseWidget',
  'esri/graphic',
  'esri/symbols/jsonUtils',
  'esri/SpatialReference',
  'esri/geometry/Point',
  'esri/graphicsUtils',
  '../search',
  '../geometryUtils',
  '../MapTooltipHandler',
  'dijit/focus',
  '../conversionUtils',
  'dojo/dom-construct',
  'dijit/form/ValidationTextBox',
  'dojo/dom-attr',
  'dojo/keys',
  'dojo/dnd/Source',
  'dojo/_base/array',
  'dojo/query',
  'jimu/dijit/Message',
  '../planSettings/planSettings',
  'dojo/dom-geometry',
  'dijit/form/NumberTextBox'
], function (
  declare,
  template,
  _WidgetsInTemplateMixin,
  lang,
  on,
  domClass,
  Evented,
  BaseWidget,
  Graphic,
  jsonUtils,
  SpatialReference,
  Point,
  graphicsUtils,
  SearchInstance,
  geometryUtils,
  MapTooltipHandler,
  focusUtil,
  utils,
  domConstruct,
  ValidationTextBox,
  domAttr,
  keys,
  Source,
  array,
  query,
  Message,
  planSettings,
  domGeom
) {
  return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {

    // Set base class for custom coordinates widget
    baseClass: 'jimu-widget-screening-coordinates',

    // Set base template to templateString parameter
    templateString: template,

    _itemList: [], // To store bearing and distance objects
    _nodes: [], // To store traverse row grid nodes
    _mapTooltipHandler: null, // To store instance of map tooltip handler
    _dndContainer: null, //To hold dojo dnd container
    _latLongValue: { // To store latitude and longitude
      "latitude": "",
      "longitude": ""
    },
    _windowResizeTimer: null, // To store timeout object called on window resize
    startPoint: null, // To store start point of the traverse
    startPointForNextLine: null, // To store the start point for next line
    planSettingsWidget: null, // To store an instance of plan setting widget

    constructor: function (options) {
      this._itemList = [];
      this._nodes = [];
      this._mapTooltipHandler = null;
      this._dndContainer = null;
      this._latLongValue = {
        "latitude": "",
        "longitude": ""
      };
      this._windowResizeTimer = null;
      this.startPoint = null;
      this.startPointForNextLine = null;
      this.planSettingsWidget = null;
      lang.mixin(this, options);
    },

    postCreate: function () {
      this._initializeCoordinatesWidget();
      this._createSearchInstance();
    },

    /**
     * This function initialize the search widget
     * @memberOf Screening/coordinates/coordinates
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
      }, domConstruct.create("div", {}, this.searchWidgetContainerCoordinatesTab));
      //handle search widget events
      this.own(this._searchInstance.on("select-result", lang.hitch(this, function (evt) {
        this.emit("onSearchComplete", evt);
      })));
      this.own(this._searchInstance.on("clear-search", lang.hitch(this, this._clearResults)));
      this.own(this._searchInstance.on("search-loaded", lang.hitch(this, function () {
        setTimeout(lang.hitch(this, function () {
          //get search container node to resize the search control
          this._searchContainerNodeElement = query(
            ".arcgisSearch .searchGroup .searchInput", this.domNode
          )[0];
          //set _hasMultipleSourcesInSearch to false if multiple sources are not present
          if (this._searchInstance.search.sources.length < 2) {
            this._hasMultipleSourcesInSearch = false;
          }
          this.onWindowResize();
        }), 1000);
      })));
      // once widget is created call its startup method
      this._searchInstance.startup();
    },

    /**
     * This function used to clear results from graphicsLayer, result panel and directions
     * @param{boolean} contains true or false
     * @memberOf Screening/coordinates/coordinates
     */
    _clearResults: function (showInfoWindow) {
      if (!showInfoWindow) {
        this.map.infoWindow.hide();
      }
    },

    /**
     * Clear search box text
     * @memberOf Screening/coordinates/coordinates
     */
    clearSearchText: function () {
      if (this._searchInstance && this._searchInstance.search) {
        this._searchInstance.search.clear();
      }
    },

    /**
     * Window resize handler
     * @memberOf Screening/coordinates/coordinates
     */
    onWindowResize: function () {
      if (this._windowResizeTimer) {
        clearTimeout(this._windowResizeTimer);
      }
      this._windowResizeTimer = setTimeout(lang.hitch(this, this._resetComponents), 500);
    },

    /**
     * Resets the components of the widgets according to updated size
     * @memberOf Screening/coordinates/coordinates
     */
    _resetComponents: function () {
      var containerGeom, calculatedWidth, searchGroup;
      //get search group to override max width overridden by some themes
      searchGroup = query(
        ".arcgisSearch .searchGroup", this.domNode
      )[0];
      if (!this._searchContainerNodeElement) {
        this._searchContainerNodeElement = query(
          ".arcgisSearch .searchGroup .searchInput", this.domNode
        )[0];
      }
      //reset the width of search control to fit in available panel width
      if (this.widgetMainContainer && this._searchContainerNodeElement) {
        containerGeom = domGeom.position(this.widgetMainContainer);
        if (containerGeom && containerGeom.w) {
          calculatedWidth = (containerGeom.w - 175);
          //if search is not having multiple sources it will not display arrow
          if (!this._hasMultipleSourcesInSearch) {
            calculatedWidth += 32;
          }
          if (calculatedWidth > 0) {
            calculatedWidth -= 45; // Locate icon width
            //As some of the themes have overridden width of search widget,
            //and have applied important priority to it,
            //we need to use style.setProperty method instead of dojo domStyle.
            this._searchContainerNodeElement.style.setProperty('width',
              calculatedWidth + "px", 'important');
            if (searchGroup) {
              searchGroup.style.setProperty('max-width', "100%", 'important');
            }
          }
        }
      }
    },

    /**
     * This function is used to initialize coordinates widget
     * @memberOf Screening/coordinates/coordinates
     */
    _initializeCoordinatesWidget: function () {
      this._nodes = [];
      this._itemList = [];
      // Initialize map tooltip handler
      this._initializeMapTooltipHandler();
      // Set lat long input text box constraints
      this._setLatLongInputTextBoxesConstraints();
      // Create Plan settings object
      this._createPlanSettings();
      this.updateAccordingToPlanSettings(this._planSettings);
      this._attachLatLongTextBoxEvents();
      // Attach coordinates tool event
      this._attachLocateStartPointEvents();
      this._attachPlanSettingsIconClickEvent();
      //Set validator and invalid message for textbox in initial row
      this._setValidatorForInitialRow();
      this._handleEventsOnInitialRow();
      this._attachTraverseGridEvents();
      // Create New Traverse instance
      this._createTraverseGrid();
      this._enableOrDisableTraverseGrid(false);
    },

    /**
     * Creates plan settings
     * @memberOf Screening/coordinates/coordinates
     */
    _createPlanSettings: function () {
      this._planSettings = {};
      this._planSettings.directionOrAngleType = "northAzimuth";
      this._planSettings.directionOrAngleUnits = this.config.traverseDirectionUnit;
      this._planSettings.distanceAndLengthUnits = this.config.traverseUnit;
    },

    /**
     * Regenerates the traverse grid misclose info according to updated plan settings
     * @param{object} contains updated bearing and distance units
     * @memberOf Screening/coordinates/coordinates
     */
    updateAccordingToPlanSettings: function (updatedSettings) {
      this.bearingNode.set("placeHolder",
        this.nls.units[updatedSettings.directionOrAngleUnits + "Abbr"]);
      this.lengthNode.set("placeHolder",
        this.nls.units[updatedSettings.distanceAndLengthUnits + "Abbr"]);
    },

    /**
     * This function is used to initialize map tooltip handler
     * @memberOf Screening/coordinates/coordinates
     */
    _initializeMapTooltipHandler: function () {
      // Initialize map tooltip handler
      this._mapTooltipHandler = new MapTooltipHandler({
        map: this.map
      });
      this._mapTooltipHandler.startup();
      // Attach map tooltip handlers map clicked event
      this.own(on(this._mapTooltipHandler, "clicked", lang.hitch(this, function (event) {
        if (domClass.contains(this.locateStartPointIcon, "esriCTLocateIconSelected")) {
          this.onStartPointSelected(event.mapPoint);
          this.deactivateLocateIcon();
        }
      })));
    },

    /**
     * This function is used to set the constraint of latitude & longitude
     * @memberOf Screening/coordinates/coordinates
     */
    _setLatLongInputTextBoxesConstraints: function () {
      // Setting min max values, considering coordinates are not normalized
      // For normalized coordinates, min: 0, max: 359.99999
      // For regular coordinates, min: -179.99999, max: 180.00000
      this.latitudeTextBox.set("constraints", {
        "min": -90.00000,
        "max": 90.00000,
        "places": 8
      });
      this.latitudeTextBox.set("trim", true);
      this.longitudeTextBox.set("constraints", {
        "min": -180.00000,
        "max": 180.00000,
        "places": 8
      });
      this.longitudeTextBox.set("trim", true);
    },

    /**
     * This function is used to project the start point and set the lat, long out of it.
     * @param{object} contains geometry
     * @memberOf Screening/coordinates/coordinates
     */
    onStartPointSelected: function (geometry) {
      var outSR;
      this.drawnOrSelectedGraphicsLayer.clear();
      this.uploadedShapefileGraphicsLayer.clear();
      outSR = new SpatialReference(4326);
      // For getting projected geometry in outSR
      geometryUtils.getProjectedGeometry(geometry, outSR, this.geometryService).then(
        lang.hitch(this, function (projectedGeometry) {
          this.setStartPoint(geometry);
          this._enableOrDisableTraverseGrid(true);
          this.setLatLongTextBoxValue(projectedGeometry.x, projectedGeometry.y);
        }));
    },

    /**
     * This function is used to activate locate icon
     * @memberOf Screening/coordinates/coordinates
     */
    _activateLocateIcon: function () {
      // Activate locate start point tool
      if (!this.startPointForNextLine) {
        this._mapTooltipHandler.connectEventHandler
          (this.nls.coordinatesWidget.mapTooltipForStartPoint);
      } else {
        this._mapTooltipHandler.connectEventHandler
          (this.nls.coordinatesWidget.mapTooltipForUpdateStartPoint);
      }
      domClass.add(this.locateStartPointIcon, "esriCTLocateIconSelected");
    },

    /**
     * This function is used to de-active locate icon
     * @memberOf Screening/coordinates/coordinates
     */
    deactivateLocateIcon: function () {
      // Deactivate locate start point tool
      if (domClass.contains(this.locateStartPointIcon, "esriCTLocateIconSelected")) {
        domClass.remove(this.locateStartPointIcon, "esriCTLocateIconSelected");
        this._mapTooltipHandler.disconnectEventHandler();
      }
    },

    /**
     * This function is used to set the lat, long values in its input box
     * @param{string} contains latitude
     * @param{string} contains longitude
     * @memberOf Screening/coordinates/coordinates
     */
    setLatLongTextBoxValue: function (longitude, latitude) {
      this._latLongValue.latitude = latitude;
      this._latLongValue.longitude = longitude;
      this.latitudeTextBox.set("value", latitude);
      this.longitudeTextBox.set("value", longitude);
    },

    /**
     * This function is used to attach click events to button
     * that locates start point
     * @memberOf Screening/coordinates/coordinates
     */
    _attachLocateStartPointEvents: function () {
      // Attach locate start point icon click event
      this.own(on(this.locateStartPointIcon, "click", lang.hitch(this, function () {
        if (domClass.contains(this.locateStartPointIcon, "esriCTLocateIconSelected")) {
          this.deactivateLocateIcon();
        } else {
          this._activateLocateIcon();
        }
      })));
      // Attach locate text click event to get start point
      this.own(on(this.locateLatAndLong, "click", lang.hitch(this, function () {
        if ((!this.latitudeTextBox.isValid()) || (!this.longitudeTextBox.isValid())) {
          this._showMessage(this.nls.coordinatesWidget.invalidLatLongMessage);
        } else {
          this._onLocateLatLongClicked();
        }
      })));
    },

    /**
     * This function is used locate latitude and longitude
     * @memberOf Screening/coordinates/coordinates
     */
    _onLocateLatLongClicked: function () {
      var pointGeometry, pointSR;
      // Check that lang long values are valid
      if ((!this.latitudeTextBox.isValid()) || (!this.longitudeTextBox.isValid())) {
        return;
      } else {
        this._latLongValue.latitude = this.latitudeTextBox.getValue();
        this._latLongValue.longitude = this.longitudeTextBox.getValue();
        pointSR = new SpatialReference(4326);
        // Create point geometry instance
        pointGeometry = new Point(this._latLongValue.longitude,
          this._latLongValue.latitude, pointSR);
        // For getting projected geometry in outSR
        geometryUtils.getProjectedGeometry(pointGeometry,
          this.map.spatialReference,
          this.geometryService).then(lang.hitch(this, function (projectedGeometry) {
            this.setStartPoint(projectedGeometry);
            this._enableOrDisableTraverseGrid(true);
            this._locateStartPoint(projectedGeometry);
          }));
      }
    },

    /**
     * This function is used to center map to start point
     * @param{object} contains geometry
     * @memberOf Screening/coordinates/coordinates
     */
    _locateStartPoint: function (geometry) {
      this.map.centerAt(geometry);
    },

    /**
     * This function is used to show or hide the traverse grid main container
     * @param{boolean} contains true or false
     * @memberOf Screening/coordinates/coordinates
     */
    _enableOrDisableTraverseGrid: function (gridEnabledFlag) {
      if (gridEnabledFlag) {
        this.bearingNode.set("disabled", false);
        this.lengthNode.set("disabled", false);
        domClass.replace(this.addButton, "esriCTAddIcon", "esriCTAddDisabledIcon");
      } else {
        this.bearingNode.set("disabled", true);
        this.lengthNode.set("disabled", true);
        domClass.replace(this.addButton, "esriCTAddDisabledIcon", "esriCTAddIcon");
      }
    },

    /**
     * This function is attach click events to add button, expand collapse node
     * @memberOf Screening/coordinates/coordinates
     */
    _attachTraverseGridEvents: function () {
      this.own(on(this.addButton, "click", lang.hitch(this, function () {
        if (domClass.contains(this.addButton, "esriCTAddIcon")) {
          this._addNewItem();
        }
      })));
      this.own(on(this.expandCollapseNode, "click",
        lang.hitch(this, this._onExpandCollapseClicked)));
    },

    /**
     * Add new row to the grid
     * @memberOf Screening/coordinates/coordinates
     */
    _addNewItem: function () {
      var values;
      values = this._getValidatedValues();
      if (values) {
        this._itemList.push(values);
        this._createRow(values, this._itemList.length - 1);
        this._resetEntryRow();
        //draw new line and set the extent to line layer
        this._drawStraightLine(values, true);
        // show traverse tools expandCollapse
        this._showHideTraverseTools();
      } else {
        if (!this.bearingNode.isValid()) {
          focusUtil.focus(this.bearingNode);
          this.bearingNode.validate(false);
        } else if (this.lengthNode.get('value') === "" || !this.lengthNode.isValid()) {
          focusUtil.focus(this.lengthNode);
          this.lengthNode.validate(false);
        }
      }
    },

    /**
     * This function is used to validate bearing
     * @param{string} contains bearing value
     * @memberOf Screening/coordinates/coordinates
     */
    _validateBearing: function (bearingValue) {
      var bearingData;
      bearingData = utils.categorizeBearingFormat(bearingValue, this._planSettings);
      if (!bearingData) {
        return null;
      } else {
        return bearingData;
      }
    },

    /**
     * This function is used to validate all the fields,
     * and return the values object if all the values are valid else it will return null.
     * @param{object} contains bearing values
     * @param{string} contains bearing column
     * @memberOf Screening/coordinates/coordinates
     */
    _getValidatedValues: function (updatedValues, updatedCol) {
      var values = {}, bearingConversions, lengthConversions;
      if (updatedValues) {
        values = updatedValues;
        //Update Bearing/Length except the updated column according to plan settings
        if (updatedCol) {
          if (updatedCol !== "Bearing" && values.BearingConversions) {
            values.Bearing = this._getBearingAccordingToPlanSettings(values.BearingConversions);
          }
          if (updatedCol !== "Length" && values.LengthConversions) {
            values.Length = values.LengthConversions[this._planSettings.distanceAndLengthUnits];
          }
        }
      } else {
        values.Bearing = this.bearingNode.get("value");
        values.Length = this.lengthNode.get("value");
      }
      //if bearing/length values are empty return null
      if (lang.trim(values.Bearing.toString()) === "" ||
        lang.trim(values.Length.toString()) === "") {
        return null;
      } else {
        bearingConversions = this._validateBearing(values.Bearing);
        //if valid bearing then check if length is set
        if (bearingConversions) {
          values.BearingConversions = bearingConversions;
          //if bearing is entered but both the length is not entered return null
          if (lang.trim(values.Length.toString()) === "") {
            return null;
          }
          //if length is entered validate it
          if (lang.trim(values.Length.toString()) !== "") {
            lengthConversions = this._validateLength(values.Length);
            if (lengthConversions && lengthConversions.meters !== 0) {
              // length cannot be negative
              if (parseInt(lengthConversions.meters, 10) < 0) {
                return null;
              }
              values.LengthConversions = lengthConversions;
            } else {
              return null;
            }
          }
        } else {
          return null;
        }
      }
      return values;
    },

    /**
     * This function is used to validate length
     * @param{string} contains length
     * @param{string} contains units
     * @memberOf Screening/coordinates/coordinates
     */
    _validateLength: function (length, units) {
      var lengthData;
      switch (units) {
        case "feets":
          lengthData = utils.categorizeLengthFormatForFeet(length);
          break;
        case "meters":
          lengthData = utils.categorizeLengthFormat(length, "meters");
          break;
        case "uSSurveyFeet":
          lengthData = utils.categorizeLengthFormat(length, "uSSurveyFeet");
          break;
        default:
          lengthData = utils.categorizeLengthFormat(length,
            this._planSettings.distanceAndLengthUnits);
      }
      if (!lengthData) {
        return null;
      } else {
        return lengthData;
      }
    },

    /**
     * Create new row with fields in grid
     * @param{string} contains values
     * @param{number} contains index
     * @memberOf Screening/coordinates/coordinates
     */
    _createRow: function (values, i) {
      var row, node, length, bearingValue;
      row = domConstruct.create("div", { "class": "dojoDndItem esriCTRow", "rowIndex": i });
      node = domConstruct.create("div", { "rowIndex": i }, row);
      bearingValue = this._getBearingAccordingToPlanSettings(values.BearingConversions);
      this._createFieldInputs(row, bearingValue, "esriCTBearingRow");
      length = this._getRoundedValue(values.LengthConversions, "Length");
      this._createFieldInputs(row, length, "esriCTLengthRow");
      this._createDeleteButton(row, i);
      this._nodes.push(row);
      this._dndContainer.clearItems();
      this._dndContainer.insertNodes(false, this._nodes);
    },

    /**
     * Returns the bearing info object according to plan settings
     * @param{object} contains bearingData
     * @param{object} contains returnCompleteValue
     * @memberOf Screening/coordinates/coordinates
     */
    _getBearingAccordingToPlanSettings: function (bearingData, returnCompleteValue) {
      if (this._planSettings.directionOrAngleType === "northAzimuth" &&
        this._planSettings.directionOrAngleUnits === "decimalDegree") {
        return returnCompleteValue ? bearingData.naDD : bearingData.naDDRound;
      } else if (this._planSettings.directionOrAngleType === "northAzimuth" &&
        this._planSettings.directionOrAngleUnits === "degreeMinuteSeconds") {
        return bearingData.naDMS;
      } else if (this._planSettings.directionOrAngleType === "southAzimuth" &&
        this._planSettings.directionOrAngleUnits === "decimalDegree") {
        return returnCompleteValue ? bearingData.saDD : bearingData.saDDRound;
      } else if (this._planSettings.directionOrAngleType === "southAzimuth" &&
        this._planSettings.directionOrAngleUnits === "degreeMinuteSeconds") {
        return bearingData.saDMS;
      } else if (this._planSettings.directionOrAngleType === "quadrantBearing" &&
        this._planSettings.directionOrAngleUnits === "decimalDegree") {
        return returnCompleteValue ? bearingData.qb3DD : bearingData.qb3DDRound;
      } else if (this._planSettings.directionOrAngleType === "quadrantBearing" &&
        this._planSettings.directionOrAngleUnits === "degreeMinuteSeconds") {
        return bearingData.qb3DMS;
      }
    },

    /**
     * Creates input fields for grid
     * @memberOf Screening/coordinates/coordinates
     */
    _createFieldInputs: function (nodeContainer, value, className, isPopup) {
      var inputTextBox = new ValidationTextBox({
        "value": value,
        "class": className ? className : ""
      });
      inputTextBox.placeAt(nodeContainer);
      //set validator functions & invalid message
      if (className === "esriCTBearingRow") {
        inputTextBox.validator = lang.hitch(this, function (value) {
          return this._bearingValidator(value, []);
        });
        inputTextBox.invalidMessage = this.nls.newTraverse.invalidBearingMessage;
      } else if (className === "esriCTLengthRow") {
        inputTextBox.validator = lang.hitch(this, this._lengthValidator);
        inputTextBox.invalidMessage = this.nls.newTraverse.invalidLengthMessage;
      }
      this.own(on(inputTextBox, "blur", lang.hitch(this, function () {
        var index = parseInt(domAttr.get(nodeContainer, "rowIndex"), 10);
        this._updateParcelValues(inputTextBox, index, isPopup);
      })));

      this.own(on(inputTextBox, "keypress", lang.hitch(this, function (evt) {
        var charOrCode, index;
        charOrCode = evt.charCode || evt.keyCode;
        //Check for ENTER key
        if (charOrCode === keys.ENTER) {
          index = parseInt(domAttr.get(nodeContainer, "rowIndex"), 10);
          this._updateParcelValues(inputTextBox, index, isPopup);
        }
        //call the validate method on key press to show the error while typing
        setTimeout(lang.hitch(this, function () {
          inputTextBox.validate(false);
        }), 100);
      })));
    },

    /**
     * Returns the rounded value according to plan settings and places configured
     * @memberOf Screening/coordinates/coordinates
     */
    _getRoundedValue: function (conversionObj, valueFor) {
      var places, value;
      value = conversionObj[this._planSettings.distanceAndLengthUnits];
      switch (valueFor) {
        case "Length":
          places = this.lengthFieldPlaces;
          break;
      }
      return utils.honourPopupRounding(places, value);
    },

    /**
     * Attach 'click' event on delete button to delete row from grid
     * @memberOf Screening/coordinates/coordinates
     */
    _createDeleteButton: function (row, index) {
      var deleteIcon, deleteButton;
      deleteButton = domConstruct.create("div", { "class": "esriCTDeleteRow" }, row);
      deleteIcon = domConstruct.create("div",
        {
          "class": "esriCTDeleteIcon",
          "rowIndex": index,
          "title": this.nls.traverseSettings.deleteButtonTitle
        }, deleteButton);
      this.own(on(deleteIcon, "click", lang.hitch(this, function (evt) {
        var rowIndex = parseInt(domAttr.get(evt.currentTarget, "rowIndex"), 10);
        this._deleteRow(row, rowIndex);
      })));
    },

    /**
     * Creates rows for traverse grid
     * @memberOf Screening/coordinates/coordinates
     */
    _createTraverseGrid: function () {
      var i;
      this._nodes = [];
      //empty traverse grid node
      domConstruct.empty(this.traverseGrid);
      this._dndContainer = new Source(this.traverseGrid, {
        skipForm: true, //set the flag so clicking in txtBoxes will not enable dragging
        singular: true //set this to true so that only single row can be DND
      });
      //override the copy state so that copying will not execute
      this._dndContainer.copyState = function () {
        return false;
      };
      for (i = 0; i < this._itemList.length; i++) {
        this._createRow(this._itemList[i], i);
      }
      this.own(this._dndContainer.on('DndDrop', lang.hitch(this, this._onDndDrop)));
      this._dndContainer.insertNodes(false, this._nodes);
    },

    /**
     * Reset filed value in grid
     * @memberOf Screening/coordinates/coordinates
     */
    _resetEntryRow: function (resettingAfterDigitization) {
      var bearingValue;
      this.bearingNode.set("value", "");
      this.lengthNode.set("value", "");
      this.bearingNode.reset();
      this.lengthNode.reset();
      //if grid has any values show the last bearing in initial bearing node and select it
      if (this._itemList.length > 0) {
        //if resetting after digitization show bearing according to current plan settings,
        //as in digitization bering are entered in quadrant bearing format
        if (resettingAfterDigitization) {
          bearingValue = this._getBearingAccordingToPlanSettings(
            this._itemList[this._itemList.length - 1].BearingConversions);
        } else {
          bearingValue = this._itemList[this._itemList.length - 1].Bearing;
        }
        this.bearingNode.set("value", bearingValue);
        this.bearingNode.textbox.setSelectionRange(0, bearingValue.length);
      }
    },

    /**
     * Draws straight line for the specified values and set the extent of map to layer if asked.
     * @memberOf Screening/coordinates/coordinates
     */
    _drawStraightLine: function (values, setExtentToLayer) {
      var endpoint, bearing, distance;
      // always consider bearing from north and in dd
      bearing = values.BearingConversions.naDD;
      // set the distance in meters
      distance = values.LengthConversions.meters;
      // get end point
      endpoint = geometryUtils.getDestinationPoint(this.startPointForNextLine, bearing, distance);
      // draw line and end point on layer
      this._drawLineAndEndPoint(endpoint,
        [this.startPointForNextLine, endpoint], setExtentToLayer);
    },

    /**
     * Draws Endpoint and line(straight/arc) for the specified values and,
     * set the extent of map to layer if asked.
     * @memberOf Screening/coordinates/coordinates
     */
    _drawLineAndEndPoint: function (endpoint, linesPathArray, setExtentToLayer) {
      var polyLine, graphic, drawPoint;
      drawPoint = true;
      //check if valid end point then create line
      if (endpoint) {
        polyLine = geometryUtils.getLineBetweenPoints(linesPathArray);
        if (polyLine) {
          graphic = new Graphic(polyLine,
            jsonUtils.fromJson(this.config.coordinatesSymbology.polyline));
          //draw line
          this._addProjectedGraphic(this.drawnOrSelectedGraphicsLayer, graphic, setExtentToLayer);
          //set current endPoint as previous point
          this.startPointForNextLine = lang.clone(endpoint);
          //draw endPoint on map
          if (drawPoint) {
            this._drawPoint(endpoint);
          }
        } else {
          this._showMessage(this.nls.newTraverse.unableToDrawLineMessage);
        }
      } else {
        this._showMessage(this.nls.newTraverse.invalidEndPointMessage);
      }
    },

    /**
     * Add the  graphic on layer in maps spatial ref, if required it will project the geometry
     * @memberOf Screening/coordinates/coordinates
     */
    _addProjectedGraphic: function (layer, graphic, setExtentToLayer) {
      var newGraphic, attributes = {};
      attributes.rowIndex = layer.graphics.length;
      graphic.attributes = attributes;
      if (this.map.spatialReference.wkid !== 4326) {
        geometryUtils.getProjectedGeometry(graphic.geometry, this.map.spatialReference,
          this.geometryService).then(lang.hitch(this, function (projectedGeometry) {
            if (projectedGeometry) {
              //create new graphic with the projected geometry
              newGraphic = new Graphic(projectedGeometry);
              newGraphic.setAttributes(attributes);
              newGraphic.setSymbol(graphic.symbol);
              layer.add(newGraphic);
              this.emit("enableClearAOIButton");
              this.emit("enableZoomIcon");
              //set map extent to lines graphic layer
              if (setExtentToLayer) {
                this._setExtentToLayer(layer);
                this.emit("redrawAOI");
              }
            }
          }));
      } else {
        layer.add(graphic);
        //set map extent to lines graphic layer
        if (setExtentToLayer) {
          this._setExtentToLayer(layer);
        }
      }
    },

    /**
     * Draws point on layer with the configured symbol and in maps spatial ref.
     * @memberOf Screening/coordinates/coordinates
     */
    _drawPoint: function (point) {
      var graphic = new Graphic(point,
        jsonUtils.fromJson(this.config.coordinatesSymbology.point));
      this._addProjectedGraphic(this.drawnOrSelectedGraphicsLayer, graphic, false, false);
    },

    /**
     * Function to show/hide traverse tools
     * If any parcel points are entered then only, expand/collapse grid button
     * @memberOf Screening/coordinates/coordinates
     */
    _showHideTraverseTools: function () {
      if (this._itemList && this._itemList.length > 0) {
        // show traverse tools expandCollapse
        domClass.remove(this.expandCollapseNode, "esriCTHidden");
      } else {
        domClass.add(this.expandCollapseNode, "esriCTHidden");
      }
    },

    /**
     * For hide/show traverse grid and expand/collapse button
     * @memberOf Screening/coordinates/coordinates
     */
    _onExpandCollapseClicked: function () {
      domClass.toggle(this.traverseGrid, "esriCTHidden");
      if (domClass.contains(this.expandCollapseNode, "esriCTExpand")) {
        domAttr.set(this.expandCollapseNode, "title",
          this.nls.planSettings.collapseGridTooltipText);
        domClass.replace(this.expandCollapseNode, "esriCTCollapse", "esriCTExpand");
      } else {
        domAttr.set(this.expandCollapseNode, "title",
          this.nls.planSettings.expandGridTooltipText);
        domClass.replace(this.expandCollapseNode, "esriCTExpand", "esriCTCollapse");
      }
    },

    /**
     * Sets the map extent to the graphic layer
     * @memberOf Screening/coordinates/coordinates
     */
    _setExtentToLayer: function (graphicsLayer) {
      var newExtent;
      if (graphicsLayer.graphics.length > 0) {
        newExtent = graphicsUtils.graphicsExtent(graphicsLayer.graphics);
        //set the new extent only if it is out of current map extent
        if (!this.map.extent.contains(newExtent)) {
          this.map.setExtent(newExtent.expand(1.5));
        }
      }
    },

    /**
     * Delete row from grid
     * @memberOf Screening/coordinates/coordinates
     */
    _deleteRow: function (row, index) {
      if (this._itemList.length) {
        this._dndContainer.delItem(row.id);
        domConstruct.destroy(row);
        this._nodes.splice(index, 1);
        this._itemList.splice(index, 1);
        this._dndContainer.sync();
        this._updateRowIndexes();
        //as we have removed item, the next item will be at deleted index,
        //as we have removed the point now redraw everything
        this.setStartPoint(this.startPoint);
        this._showHideTraverseTools();
      }
    },

    /**
     * Update row index in attributes of the dom elements.
     * @memberOf Screening/coordinates/coordinates
     */
    _updateRowIndexes: function () {
      var allRows;
      allRows = query(".esriCTRow", this.traverseGrid);
      array.forEach(allRows, lang.hitch(this, function (row, index) {
        var deleteBtn, symbolNode;
        domAttr.set(row, "rowIndex", index);
        // Update delete button index
        deleteBtn = query(".esriCTDeleteIcon", row)[0];
        if (deleteBtn) {
          domAttr.set(deleteBtn, "rowIndex", index);
        }
        //Update symbol selector node index
        symbolNode = query(".esriCTSymbolContainer", row)[0];
        if (symbolNode) {
          domAttr.set(symbolNode, "rowIndex", index);
        }
      }));
    },

    /**
     * Sets start-point and if additional parcel points are added,
     * it will redraw the parcel considering update in start point.
     * Note: It will always set the start point in 4326 as.
     * @memberOf Screening/coordinates/coordinates
     */
    setStartPoint: function (startPoint) {
      var defaultStartPointSpatialRef = new SpatialReference(4326);
      geometryUtils.getProjectedGeometry(startPoint, defaultStartPointSpatialRef,
        this.geometryService).then(
        lang.hitch(this, function (projectedGeometry) {
          //set new start point
          this.startPoint = projectedGeometry;
          //as start point is changed this will be the start-point for next line
          this.startPointForNextLine = lang.clone(projectedGeometry);
          this._orgStartPointForNextLine = lang.clone(projectedGeometry);
          //if already some point are added redraw the parcel
          if (this._itemList.length > 0) {
            this._reDrawParcel();
          } else {
            //before drawing the start point clear layers
            this.drawnOrSelectedGraphicsLayer.clear();
            this.uploadedShapefileGraphicsLayer.clear();
            //reset the boundary lines array
            this._arrayOfAllBoundaryLines = [];
            //draw new start point
            this._drawPoint(startPoint);
            //set map extent to lines graphic layer
            this._setExtentToLayer(this.drawnOrSelectedGraphicsLayer);
            this.emit("redrawAOI");
          }
        }));
    },

    /**
     * Redraws the parcel points and line with the already entered values
     * @memberOf Screening/coordinates/coordinates
     */
    _reDrawParcel: function () {
      this.drawnOrSelectedGraphicsLayer.clear();
      this.uploadedShapefileGraphicsLayer.clear();
      //reset the boundary lines array
      this._arrayOfAllBoundaryLines = [];
      //draw start point as we cleared graphics layer
      this._drawPoint(this.startPoint);
      array.forEach(this._itemList, lang.hitch(this, function (value) {
        this._drawStraightLine(value, false);
      }));
      this.emit("redrawAOI");
      //set map extent to lines graphic layer
      this._setExtentToLayer(this.drawnOrSelectedGraphicsLayer);
    },

    /**
     * Function to handle events for the textbox in initial row.
     * @memberOf Screening/coordinates/coordinates
     */
    _handleEventsOnInitialRow: function () {
      // to validate bearing on tab/enter key pressed in bearing node
      this.own(on(this.bearingNode, "keypress", lang.hitch(this, this._bearingValueEntered)));
      // to validate distance on tab/enter key pressed in length node
      this.own(on(this.lengthNode, "keypress", lang.hitch(this, this._lengthValueEntered)));
    },

    /**
     * Validates bearing on tab/enter key pressed in bearing node
     * @memberOf Screening/coordinates/coordinates
     */
    _bearingValueEntered: function (evt) {
      var charOrCode, bearingValue;
      charOrCode = evt.charCode || evt.keyCode;
      //Check for ENTER key
      if (charOrCode === keys.ENTER || charOrCode === keys.TAB) {
        bearingValue = this.bearingNode.get("value");
        if (charOrCode === keys.ENTER && this.bearingNode.isValid()) {
          focusUtil.focus(this.lengthNode);
        } else {
          this.bearingNode.validate(false);
        }
      }
      else {
        //call the validate method on key press to show the error while typing
        setTimeout(lang.hitch(this, function () {
          this.bearingNode.validate(false);
        }), 100);
      }
    },

    /**
     * Set validator and invalid message for each row.
     * @memberOf Screening/coordinates/coordinates
     */
    _setValidatorForInitialRow: function () {
      this.bearingNode.validator = lang.hitch(this, function (value) {
        return this._bearingValidator(value, []);
      });
      this.bearingNode.invalidMessage = this.nls.newTraverse.invalidBearingMessage;
      this.lengthNode.validator = lang.hitch(this, function (value) {
        //if negative value is entered in length when radius is empty show error
        if (parseFloat(value) < 0) {
          this.lengthNode.invalidMessage = this.nls.newTraverse.negativeLengthMessage;
          return false;
        } else {
          this.lengthNode.invalidMessage = this.nls.newTraverse.invalidLengthMessage;
        }
        return this._lengthValidator(value);
      });
      this.lengthNode.invalidMessage = this.nls.newTraverse.invalidLengthMessage;
    },

    /**
     * Validator function for Length.
     * @memberOf Screening/coordinates/coordinates
     */
    _bearingValidator: function (value, constraints) {
      if ((constraints.indexOf(value) !== -1) && this._itemList && this._itemList.length > 0) {
        return true;
      } else {
        return this._validateBearing(value, constraints);
      }
    },

    /**
     * Validator function for Length.
     * @memberOf Screening/coordinates/coordinates
     */
    _lengthValidator: function (value, constraints) {
      if (value === "" || value === "0" || value === 0) {
        return false;
      } else {
        return this._validateLength(value, constraints);
      }
    },

    /**
     * Validates length on tab/enter key pressed in length node
     * @memberOf Screening/coordinates/coordinates
     */
    _lengthValueEntered: function (evt) {
      var charOrCode, lengthValue;
      charOrCode = evt.charCode || evt.keyCode;
      //Check for ENTER key
      if (charOrCode === keys.ENTER || charOrCode === keys.TAB) {
        lengthValue = this.lengthNode.get("value");
        if (this.lengthNode.isValid()) {
          if (!this.bearingNode.isValid()) {
            this.bearingNode.validate(false);
            focusUtil.focus(this.bearingNode);
          } else if (!this.lengthNode.isValid()) {
            this.lengthNode.validate(false);
            focusUtil.focus(this.lengthNode);
          } else {
            this._addNewItem();
            focusUtil.focus(this.bearingNode);
          }
        } else {
          this.lengthNode.validate(false);
        }
      } else {
        //call the validate method on key press to show the error while typing
        setTimeout(lang.hitch(this, function () {
          this.lengthNode.validate(false);
        }), 100);
      }
    },

    /**
     * This function is used to attach click event to plan settings icon
     * @memberOf Screening/coordinates/coordinates
     */
    _attachPlanSettingsIconClickEvent: function () {
      this.own(on(this.planSettingIcon, "click",
        lang.hitch(this, this._openPlanSettingsDialogBox)));
    },

    /**
     * This function is used create and open plan settings on click of its icon
     * @memberOf Screening/coordinates/coordinates
     */
    _openPlanSettingsDialogBox: function (evt) {
      // Stop event from propagation
      evt.stopPropagation();
      evt.preventDefault();
      //If widget instance exist do not create new widget instead open the tooltip dialog
      if (!this.planSettingsWidget) {
        this.planSettingsWidget = new planSettings({
          config: this.config,
          appConfig: this.appConfig,
          position: evt,
          nls: this.nls
        });
        this.planSettingsWidget.startup();
      } else {
        //Just pass the updated evt coordinates
        this.planSettingsWidget.position = evt;
        if (this.planSettingsWidget.isTooltipDialogOpened) {
          this.planSettingsWidget.closePopup();
        } else {
          this.planSettingsWidget.openPopup();
        }
      }
      this.own(on(this.planSettingsWidget, "planSettingsChanged",
        lang.hitch(this, function (directionUnit, distanceUnit) {
          this._planSettings.directionOrAngleUnits = this.config.traverseDirectionUnit =
            directionUnit;
          this._planSettings.distanceAndLengthUnits = this.config.traverseUnit =
            distanceUnit;
          this.updateAccordingToPlanSettings(this._planSettings);
          // Regenerate traverse grid, it will honour the updated plan settings.
          this._reGenerateTraverseGrid();
        })));
    },

    /**
     * Create and show alert message.
     * @param {string} contains message
     * @memberOf Screening/coordinates/coordinates
     */
    _showMessage: function (msg) {
      var alertMessage = new Message({
        message: msg
      });
      alertMessage.message = msg;
    },

    /**
     * This function is used to validate lat, long on keyup
     * @memberOf Screening/coordinates/coordinates
     */
    _attachLatLongTextBoxEvents: function () {
      this.own(on(this.latitudeTextBox, "keyup", lang.hitch(this, function (evt) {
        var charOrCode;
        charOrCode = evt.charCode || evt.keyCode;
        //Check for ENTER key
        if (charOrCode === keys.ENTER || charOrCode === keys.TAB) {
          this.latitudeTextBox.setValue(
            utils.honourPopupRounding(8, this.latitudeTextBox.getValue()));
          if (this.latitudeTextBox.isValid() && this.longitudeTextBox.isValid()) {
            focusUtil.focus(this.longitudeTextBox);
            this._onLocateLatLongClicked();
          } else if (this.latitudeTextBox.isValid() && (!this.longitudeTextBox.isValid())) {
            focusUtil.focus(this.longitudeTextBox);
          } else {
            focusUtil.focus(this.longitudeTextBox);
          }
        }
      })));
      this.own(on(this.latitudeTextBox, "blur", lang.hitch(this, function () {
        if (!this.latitudeTextBox.isValid() && !!this._latLongValue.latitude) {
          this.latitudeTextBox.setValue(this._latLongValue.latitude);
        }
      })));

      this.own(on(this.longitudeTextBox, "keyup", lang.hitch(this, function (evt) {
        var charOrCode;
        charOrCode = evt.charCode || evt.keyCode;
        //Check for ENTER key
        if (charOrCode === keys.ENTER || charOrCode === keys.TAB) {
          this.longitudeTextBox.setValue(
            utils.honourPopupRounding(8, this.longitudeTextBox.getValue()));
          if (this.latitudeTextBox.isValid() && this.longitudeTextBox.isValid()) {
            this._onLocateLatLongClicked();
          } else if (this.longitudeTextBox.isValid() && (!this.latitudeTextBox.isValid())) {
            focusUtil.focus(this.latitudeTextBox);
          } else {
            if (focusUtil.curNode) {
              focusUtil.curNode.blur();
            }
          }
        }
      })));
      this.own(on(this.longitudeTextBox, "blur", lang.hitch(this, function () {
        if (!this.longitudeTextBox.isValid() && !!this._latLongValue.longitude) {
          this.longitudeTextBox.setValue(this._latLongValue.longitude);
        }
      })));
    },

    /**
     * Update values for respective row
     * @memberOf Screening/coordinates/coordinates
     */
    _updateParcelValues: function (inputTextBox, index) {
      var values, updatedCol, updatedValue, updatedValueAsPerPlanSettings,
        validatedValues, isUpdated = false, prevValue;
      //get values for selected row
      values = this._itemList[index];
      if (values) {
        //get updated value
        updatedValue = inputTextBox.get("value");
        //trim the value if it exist
        if (updatedValue) {
          updatedValue = lang.trim(updatedValue.toString());
        } else {
          updatedValue = "";
        }
        //check which attribute value is changed
        if (domClass.contains(inputTextBox.domNode, "esriCTBearingRow") &&
          String(this._getBearingAccordingToPlanSettings(values.BearingConversions)) !==
          updatedValue) {
          updatedCol = "Bearing";
          //capture previous value before updating the new entered one
          prevValue = values.Bearing;
          //if bearing value is changed
          values.Bearing = updatedValue;
          isUpdated = true;
        } else if (domClass.contains(inputTextBox.domNode, "esriCTLengthRow") &&
          String(this._getRoundedValue(values.LengthConversions, "Length")) !==
          updatedValue) {
          updatedCol = "Length";
          //capture previous value before updating the new entered one
          prevValue = values.Length;
          //if length value is changed
          values.Length = updatedValue;
          isUpdated = true;
        }
        //if value is updated then only redraw the parcel
        if (isUpdated) {
          //validate updated values to draw parcel
          validatedValues = this._getValidatedValues(values, updatedCol, index);
          if (validatedValues) {
            if (updatedCol === "Bearing") {
              //get updated value according planSettings in rounded format
              updatedValueAsPerPlanSettings =
                this._getBearingAccordingToPlanSettings(validatedValues.BearingConversions);
              //update the value in itemList it should be complete value
              values.Bearing =
                this._getBearingAccordingToPlanSettings(validatedValues.BearingConversions, true);
              //show the entered value in textbox according to planSettings
              inputTextBox.set('value', updatedValueAsPerPlanSettings);
            } else if (updatedCol === "Length") {
              updatedValueAsPerPlanSettings = this._getRoundedValue(values.LengthConversions,
                "Length");
              //update the value in itemList
              values.Length = values.LengthConversions[this._planSettings.distanceAndLengthUnits];
              //show the entered value in textbox according to planSettings
              inputTextBox.set('value', updatedValueAsPerPlanSettings);
            }
            //Finally set start point it will redraw everything
            this.setStartPoint(this.startPoint);
          } else {
            this._updateValues(values, updatedCol, inputTextBox);
          }
        }
      }
    },

    /**
     * Reset the entered value in textbox and values object according to updated col.
     * @memberOf Screening/coordinates/coordinates
     */
    _updateValues: function (values, updatedCol, inputTextBox) {
      var updatedValue;
      //if entered value is not valid resetting the value to prev value.
      if (updatedCol === "Bearing") {
        values.Bearing = this._getBearingAccordingToPlanSettings(values.BearingConversions, true);
        updatedValue = this._getBearingAccordingToPlanSettings(values.BearingConversions);
      } else if (updatedCol === "Length") {
        values.Length = values.LengthConversions[this._planSettings.distanceAndLengthUnits];
        updatedValue = this._getRoundedValue(values.LengthConversions, "Length");
      }
      //also  show the value in textbox
      inputTextBox.set('value', updatedValue);
    },

    /**
     * This function is used to reset the values of coordinates tool
     * @memberOf Screening/coordinates/coordinates
     */
    resetCoordinatesWidgetValue: function () {
      this.startPoint = null;
      this.startPointForNextLine = null;
      this.deactivateLocateIcon();
      this.setLatLongTextBoxValue("", "");
      this.latitudeTextBox.reset();
      this.longitudeTextBox.reset();
      this._enableOrDisableTraverseGrid(false);
      this._nodes = [];
      this._itemList = [];
      domConstruct.empty(this.traverseGrid);
      this.bearingNode.set("value", "");
      this.lengthNode.set("value", "");
      this.bearingNode.reset();
      this.lengthNode.reset();
      this._showHideTraverseTools();
    },

    /**
     * Callback handler called on node dragged and dropped
     * @memberOf Screening/coordinates/coordinates
     */
    _onDndDrop: function () {
      var allNodes, updateItemList = [];
      this._dndContainer.sync();
      allNodes = this._dndContainer.getAllNodes();
      allNodes.forEach(lang.hitch(this, function (currentNode) {
        var item, rowIndex;
        rowIndex = parseInt(domAttr.get(currentNode, "rowIndex"), 10);
        item = this._itemList[rowIndex];
        //push items in updated sequence
        updateItemList.push(item);
      }));
      this._nodes = allNodes;
      this._itemList = [];
      //update item list with updated item sequence
      this._itemList = updateItemList;
      this._updateRowIndexes();
      //as rows are moved need to update the drawing as well
      this.setStartPoint(this.startPoint);
    },

    /**
     * Regenerate traverse grid
     * @memberOf Screening/coordinates/coordinates
     */
    _reGenerateTraverseGrid: function () {
      if (this._dndContainer) {
        this._dndContainer.destroy();
        this._dndContainer = null;
      }
      domConstruct.empty(this.traverseGrid);
      this._createTraverseGrid();
    }
  });
});