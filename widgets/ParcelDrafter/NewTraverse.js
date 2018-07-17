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
  'dijit/_WidgetsInTemplateMixin',
  'dojo/Evented',
  'dojo/text!./NewTraverse.html',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/dom-class',
  'dojo/dom-construct',
  'dojo/dom-style',
  'dojo/dnd/Source',
  'dojo/on',
  'dijit/form/ValidationTextBox',
  './SymbolSelector',
  './MiscloseDetails',
  './ParcelTools',
  './PlanInfo',
  './geometryUtils',
  './utils',
  'esri/graphic',
  'esri/symbols/jsonUtils',
  'esri/layers/GraphicsLayer',
  'esri/graphicsUtils',
  'dojo/dom-attr',
  'dojo/query',
  'esri/SpatialReference',
  'dojo/keys',
  'dijit/focus',
  'dijit/TooltipDialog',
  'dijit/popup',
  'dojo/Deferred',
  'esri/geometry/Extent',
  'dojo/dom-geometry'
],
  function (
    declare,
    BaseWidget,
    _WidgetsInTemplateMixin,
    Evented,
    NewTraverseTemplate,
    lang,
    array,
    domClass,
    domConstruct,
    domStyle,
    Source,
    on,
    ValidationTextBox,
    SymbolSelector,
    MiscloseDetails,
    ParcelTools,
    PlanInfo,
    geometryUtils,
    utils,
    Graphic,
    jsonUtils,
    GraphicsLayer,
    graphicsUtils,
    domAttr,
    query,
    SpatialReference,
    keys,
    focusUtil,
    TooltipDialog,
    dijitPopup,
    Deferred,
    Extent,
    domGeom
  ) {
    return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'jimu-widget-ParcelDrafter',
      templateString: NewTraverseTemplate,
      parcelLinesGraphicsLayer: null, //GraphicsLayer to show parcel lines
      parcelPointsGraphicsLayer: null, //GraphicsLayer to show parcel points
      parcelPolygonGraphicsLayer: null, //GraphicsLayer to show parcel polygon
      lineLayerSpatialReference: null, // to store spatial reference of line layer
      polygonLayerSpatialReference: null, //to store spatial reference of polygon layer
      _itemList: [], //Holds parcel info for each entry
      _nodes: [], //To store dnd nodes
      _dndContainer: null, //To hold dojo dnd container
      startPoint: null, //Holds start point geometry of the parcel
      _startPointForNextLine: null, //To store the start point for next line
      _planSettings: null, //To store updated plan settings
      _arrayOfAllBoundaryLines: [], //To store poly-lines of boundary type
      _rotationAngle: 0, //To store the rotation angle
      _scaleValue: 1, //To store the scale value
      polygonDeleteArr: [], //To store polygon that needs to be deleted before saving edited one
      polylineDeleteArr: [], //To store polyline that needs to be deleted before saving edited one
      _popupDialog: null, //Stores parcel info content
      _popupCoords: null, //Stores tooltip position for pop-up
      numberFieldTypes: ['esriFieldTypeSmallInteger',
        'esriFieldTypeInteger',
        'esriFieldTypeSingle',
        'esriFieldTypeDouble'
      ],
      lengthFieldPlaces: 2, //Number of places to be shown in length field
      radiusFieldPlaces: 2, //Number of places to be shown in radius field
      miscloseDistanceFieldPlaces: 2, //Number of places to be shown in miscloseDistance field

      postCreate: function () {
        //initialize widget array & object variables
        this.numberFieldTypes = [
          'esriFieldTypeSmallInteger', 'esriFieldTypeInteger',
          'esriFieldTypeSingle', 'esriFieldTypeDouble'];
        this.polygonDeleteArr = [];
        this.polylineDeleteArr = [];
        this._arrayOfAllBoundaryLines = [];
        this._nodes = [];
        this._itemList = [];
        //add class to main node
        domClass.add(this.domNode, "esriCTNewTraverseGrid");
        //create graphics layer for geometries
        this._addGraphicsLayer();
        //Create New Traverse instance
        this._createTraverseGrid();
        //Set validator and invalid message for textbox in initial row
        this._setValidatorForInitialRow();
        //handle events on initial row text-boxes
        this._handleEventsOnInitialRow();
        //Display symbol selector div for new row
        this._symbolSelector = this._createLineSelector(this.lineSymbolNode, null);
        this.own(on(this.screenDigitizationNode, "click", lang.hitch(this,
          this._onDigitizationButtonClicked)));
        this.own(on(this.zoomToNode, "click", lang.hitch(this, this._onZoomButtonClicked)));
        this.own(on(this.expandCollapseNode, "click", lang.hitch(this,
          this._onExpandCollapseClicked)));
        this.own(on(this.addButton, "click", lang.hitch(this, function () {
          //send flag added from screen digitization as false, as user is clicking on add button.
          this._addNewItem(false);
        })));
        //Create misclose Details instance
        this._createMiscloseDetails();
        //Initiates parcel tools
        this._createParcelTools();
        //Create Plan information instance
        this._createPlanInfo();
        //Create tooltip dialog
        this._createTooltip();
        //set bearing, length & radius field places as per popupInfo
        if (this.config.polylineLayer && this.config.polylineLayer.popupInfo &&
          this.config.polylineLayer.popupInfo.fieldInfos) {
          array.forEach(this.config.polylineLayer.popupInfo.fieldInfos, lang.hitch(this,
            function (field) {
              if (field.fieldName === this.config.polylineLayer.bearing.name && field.format) {
                utils.bearingFieldPlaces = field.format.places;
              }
              if (field.fieldName === this.config.polylineLayer.distance.name && field.format) {
                this.lengthFieldPlaces = field.format.places;
              }
              if (field.fieldName === this.config.polylineLayer.radius.name && field.format) {
                this.radiusFieldPlaces = field.format.places;
              }
            }));
        }
        //set miscloseDistance field places as per popupInfo
        if (this.config.polygonLayer && this.config.polygonLayer.popupInfo &&
          this.config.polygonLayer.popupInfo.fieldInfos) {
          array.forEach(this.config.polygonLayer.popupInfo.fieldInfos, lang.hitch(this,
            function (field) {
              if (field.fieldName === this.config.polygonLayer.miscloseDistance.name && field.format) {
                this.miscloseDistanceFieldPlaces = field.format.places;
              }
            }));
        }
      },

      /**
      * This function will add graphics layers for all the geometry types
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _addGraphicsLayer: function () {
        this.parcelPolygonGraphicsLayer = new GraphicsLayer();
        this.parcelLinesGraphicsLayer = new GraphicsLayer();
        this.parcelPointsGraphicsLayer = new GraphicsLayer();
        this.map.addLayer(this.parcelPolygonGraphicsLayer);
        this.map.addLayer(this.parcelLinesGraphicsLayer);
        this.map.addLayer(this.parcelPointsGraphicsLayer);
      },

      /**
      * Set validator and invalid message for each row.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _setValidatorForInitialRow: function () {
        this.bearingNode.validator = lang.hitch(this, function (value) {
          //from initial row user can enter */*tb
          return this._bearingValidator(value, ["*", "*tb"]);
        });
        this.bearingNode.invalidMessage = this.nls.newTraverse.invalidBearingMessage;
        this.lengthNode.validator = lang.hitch(this, function (value) {
          if (value === "*" && this._itemList && this._itemList.length > 0) {
            return true;
          }
          //if negative value is entered in length when radius is empty show error
          if (this.radiusNode.get('value') === "" && parseFloat(value) < 0) {
            this.lengthNode.invalidMessage = this.nls.newTraverse.negativeLengthMessage;
            return false;
          } else {
            this.lengthNode.invalidMessage = this.nls.newTraverse.invalidLengthMessage;
          }
          return this._lengthValidator(value);
        });
        this.lengthNode.invalidMessage = this.nls.newTraverse.invalidLengthMessage;
        this.radiusNode.validator = lang.hitch(this, function (value) {
          var radiusConversions, lengthConversions, lengthValue;
          if (value === "*" && this._itemList && this._itemList.length > 0) {
            return true;
          }
          radiusConversions = this._radiusValidator(value);
          //if user enters some value in radius check length is not more than double of radius
          if (value !== "") {
            lengthConversions = this.lengthNode.isValid();
            if (lengthConversions && radiusConversions) {
              if (!this._validateLengthRadiusProportion(radiusConversions, lengthConversions)) {
                return null;
              }
              //if valid radius is entered then needs to reset length in case it is negative,
              //as -ve values in length would have displayed error
              if (radiusConversions) {
                lengthValue = this.lengthNode.value;
                this.lengthNode.reset();
                this.lengthNode.set("value", lengthValue);
              }
            } else {
              radiusConversions = null;
            }
          }

          return radiusConversions;
        });
        this.radiusNode.invalidMessage = this.nls.newTraverse.invalidRadiusMessage;
      },

      /**
      * Validator function for Length.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _bearingValidator: function (value, constraints) {
        if ((constraints.indexOf(value) !== -1) && this._itemList && this._itemList.length > 0) {
          return true;
        } else {
          return this._validateBearing(value, constraints);
        }
      },

      /**
      * Validator function for Length.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _lengthValidator: function (value, constraints) {
        if (value === "" || value === "0" || value === 0) {
          return false;
        } else {
          return this._validateLength(value, constraints);
        }
      },

      /**
      * Validator function for radius.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _radiusValidator: function (value, constraints) {
        if (value === "") {
          return true;
        } else {
          return this._validateLength(value, constraints);
        }
      },

      /**
      * Function to handle events for the textbox in initial row.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _handleEventsOnInitialRow: function () {
        // to validate bearing on tab/enter key pressed in bearing node
        this.own(on(this.bearingNode, "keypress", lang.hitch(this, this._bearingValueEntered)));
        // to validate distance on tab/enter key pressed in length node
        this.own(on(this.lengthNode, "keypress", lang.hitch(this, this._lengthValueEntered)));
        // to validate radius on tab/enter key pressed in radius node
        this.own(on(this.radiusNode, "keypress", lang.hitch(this, this._radiusValueEntered)));
      },

      /**
      * If '*' is entered this function copy previously entered value in appropriate textbox.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _copyPrevValue: function (copyValueFor) {
        var value;
        switch (copyValueFor) {
          case "Bearing":
            value = this.bearingNode.get('value');
            if (value === "*" && this._itemList.length > 0) {
              //show the last entered value according to current planSettings
              if (this._itemList[this._itemList.length - 1].BearingConversions) {
                value = this._getBearingAccordingToPlanSettings(
                  this._itemList[this._itemList.length - 1].BearingConversions);
              } else {
                value = this._itemList[this._itemList.length - 1].Bearing;
              }
              this.bearingNode.set("value", value);
            }
            break;
          case "Length":
            value = this.lengthNode.get('value');
            if (value === "*" && this._itemList.length > 0) {
              //show the last entered value according to current planSettings
              //According to plan settings show arcLength/chordLength in length textbox
              if (this._planSettings.circularCurveParameters === "radiusAndArcLength" &&
                this._itemList[this._itemList.length - 1].ArcLengthConversions) {
                value = this._itemList[this._itemList.length - 1].ArcLengthConversions[
                  this._planSettings.distanceAndLengthUnits];
              } else {
                if (this._itemList[this._itemList.length - 1].LengthConversions) {
                  value = this._itemList[this._itemList.length - 1].LengthConversions[
                    this._planSettings.distanceAndLengthUnits];
                } else {
                  value = this._itemList[this._itemList.length - 1].Length;
                }
              }
              this.lengthNode.set("value", value);
            }
            break;
          case "Radius":
            value = this.radiusNode.get('value');
            if (value === "*" && this._itemList.length > 0) {
              //show the last entered value according to current planSettings
              if (this._itemList[this._itemList.length - 1].RadiusConversions) {
                value = this._itemList[this._itemList.length - 1].RadiusConversions[
                  this._planSettings.distanceAndLengthUnits];
              } else {
                value = this._itemList[this._itemList.length - 1].Radius;
              }
              this.radiusNode.set("value", value);
            }
            break;
        }
      },
      /**
      * Validates bearing on tab/enter key pressed in bearing node
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _bearingValueEntered: function (evt) {
        var charOrCode, bearingValue;
        charOrCode = evt.charCode || evt.keyCode;
        //Check for ENTER key
        if (charOrCode === keys.ENTER || charOrCode === keys.TAB) {
          bearingValue = this.bearingNode.get("value");
          //check if entered bearing is * then copy the value from last entry
          this._copyPrevValue("Bearing");
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
      * Validates length on tab/enter key pressed in length node
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _lengthValueEntered: function (evt) {
        var charOrCode, lengthValue;
        charOrCode = evt.charCode || evt.keyCode;
        //Check for ENTER key
        if (charOrCode === keys.ENTER || charOrCode === keys.TAB) {
          lengthValue = this.lengthNode.get("value");
          //check if entered length is * then copy the value from last entry
          this._copyPrevValue("Length");
          if (charOrCode === keys.ENTER && this.lengthNode.isValid()) {
            focusUtil.focus(this.radiusNode);
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
      * Validates radius on tab/enter key pressed in radius node
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _radiusValueEntered: function (evt) {
        var charOrCode, radiusValue;
        charOrCode = evt.charCode || evt.keyCode;
        //Check for ENTER key
        if (charOrCode === keys.ENTER || charOrCode === keys.TAB) {
          radiusValue = this.radiusNode.get("value");
          //check if entered radius is * then copy the value from last entry
          this._copyPrevValue("Radius");
          //if radius is empty or valid check if other fields are valid then add NewItem
          if (radiusValue === "" || this.radiusNode.isValid()) {
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
            this.radiusNode.validate(false);
          }
        } else {
          //call the validate method on key press to show the error while typing
          setTimeout(lang.hitch(this, function () {
            this.radiusNode.validate(false);
          }), 100);
        }
      },

      /**
      * This function is used to validate bearing
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
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
      * This function is used to validate length
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
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
      * Validates if radius and distance are in proportion according to plan settings.
      * In case of Radius & ChordLength it should not greater than '2R'
      * In case or Radius & ArcLength it should not greater than '2PiR'
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _validateLengthRadiusProportion: function (radiusConversions, lengthConversions) {
        var lengthValue, radiusValue;
        if (radiusConversions && lengthConversions) {
          radiusValue = radiusConversions[this._planSettings.distanceAndLengthUnits];
          lengthValue = lengthConversions[this._planSettings.distanceAndLengthUnits];
          if (radiusValue !== 0) {
            radiusValue = (parseFloat(Math.abs(radiusValue)) * 2);
            if (this._planSettings.circularCurveParameters === "radiusAndArcLength") {
              radiusValue = radiusValue * Math.PI;
            }
            if (radiusValue < parseFloat(Math.abs(lengthValue))) {
              return null;
            }
          }
        }
        return true;
      },

      /**
      * This function is used to validate all the fields,
      * and return the values object if all the values are valid else it will return null.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _getValidatedValues: function (updatedValues, updatedCol, index) {
        var values = {}, bearingConversions, lengthConversions, radiusConversions, previousValues;
        if (updatedValues) {
          values = updatedValues;
          //Update Bearing/Length/Radius except the updated column according to plan settings
          if (updatedCol) {
            if (updatedCol !== "Bearing" && values.BearingConversions) {
              values.Bearing = this._getBearingAccordingToPlanSettings(values.BearingConversions);
            }
            if (updatedCol !== "Length" && values.LengthConversions) {
              values.Length = values.LengthConversions[this._planSettings.distanceAndLengthUnits];
            }
            if (updatedCol !== "Radius" && values.RadiusConversions) {
              values.Radius = values.RadiusConversions[this._planSettings.distanceAndLengthUnits];
            }
            //if user enters *tb in grid and it is not the first row
            if (updatedCol === "Bearing" &&
              (values.Bearing.toString().toLowerCase() === "*tb" && this._itemList.length > 0) &&
              index !== 0) {
              values.isTB = true;
            }
          }
        } else {
          //copy the values if * is entered in any of the textbox in initial row
          this._copyPrevValue("Bearing");
          this._copyPrevValue("Length");
          this._copyPrevValue("Radius");
          values.LineSymbol = this._symbolSelector.selectedSymbol;
          values.Bearing = this.bearingNode.get("value");
          values.Length = this.lengthNode.get("value");
          values.Radius = this.radiusNode.get("value");
          //if user enters *tb in initial row set the flag
          if ((values.Bearing.toString().toLowerCase() === "*tb" && this._itemList.length > 0)) {
            values.isTB = true;
          } else {
            values.isTB = false;
          }
        }
        //if bearing/length values are empty return null
        if (lang.trim(values.Bearing.toString()) === "" ||
          lang.trim(values.Length.toString()) === "") {
          return null;
        } else {
          bearingConversions = this._validateBearing(values.Bearing);
          //if valid bearing then check if length or radius is set
          if (bearingConversions || values.isTB) {
            values.BearingConversions = bearingConversions;
            //if bearing is entered but both the length & radius is not entered return null
            if (lang.trim(values.Length.toString()) === "" &&
              lang.trim(values.Radius.toString()) === "") {
              return null;
            }
            //if length is entered validate it
            if (lang.trim(values.Length.toString()) !== "") {
              lengthConversions = this._validateLength(values.Length);
              if (lengthConversions && lengthConversions.meters !== 0) {
                //if radius is entered validate it
                if (lang.trim(values.Radius.toString()) !== "") {
                  radiusConversions = this._validateLength(values.Radius);
                  if (radiusConversions) {
                    //validate if radius and distance are in proportion only when radius is not zero
                    if (!this._validateLengthRadiusProportion(radiusConversions,
                      lengthConversions)) {
                      return null;
                    }
                    //update radius Conversions after above condition is valid
                    values.RadiusConversions = radiusConversions;
                  } else {
                    return null;
                  }
                } else {
                  //if radius is not entered then length cannot be negative
                  if (parseInt(lengthConversions.meters, 10) < 0) {
                    return null;
                  }
                  //as radius is empty set radiusConversions to null
                  values.RadiusConversions = null;
                }
                values.LengthConversions = lengthConversions;
              } else {
                return null;
              }
            }
            //if values are for arc add/update the chordLength & arcLength in values object
            if (values.RadiusConversions) {
              values = this._createValuesForArc(values);
            }
            //check if entered bearing is *tb then calculate the value from last entry
            if (values.isTB) {
              //if it values is updated in grd then pick prev values from index-1
              //else get the previous value from _itemList length -1
              if (updatedValues && !isNaN(index)) {
                previousValues = this._itemList[index - 1];
              } else {//entered from initial grid
                previousValues = this._itemList[this._itemList.length - 1];
              }
              //set tangent calculations accordingly
              values = this._setTangentBearing(values, previousValues);
            }
          } else {
            return null;
          }
        }
        return values;
      },

      /**
      * Based on previous arc/line and current values it will get the bearing and update the values
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _setTangentBearing: function (values, previousValues) {
        var bearingValue, planSettingsNADD;
        //As all our calculations are in NADD, create PlanSettings for NADD
        planSettingsNADD = lang.clone(this._planSettings);
        planSettingsNADD.directionOrAngleType = "northAzimuth";
        planSettingsNADD.directionOrAngleUnits = "decimalDegree";
        //get the previous bearing in NADD
        bearingValue = previousValues.BearingConversions.naDD;
        //if previous entry is arc then the bearing for current entry should be tangent of previous
        if (previousValues.RadiusConversions && previousValues.RadiusConversions.meters !== 0) {
          bearingValue = geometryUtils.chordBearingToTangentBearing(
            bearingValue,
            previousValues.RadiusConversions.meters,
            previousValues.ChordLengthConversions.meters);
        }
        //If drawing arcs with *tb, prev tangentBearing/bearing should be used
        //to get chordBearing for current arc.
        //Else wile drawing lines with *tb, if prev is arc then use its tangentBearing
        //otherwise use bearing of prev as it is.
        if (values.RadiusConversions && values.RadiusConversions.meters !== 0) {
          //once we have bearing of previous entry convert it to chord
          bearingValue = geometryUtils.tangentBearingToChordBearing(
            bearingValue,
            values.RadiusConversions.meters,
            values.ChordLengthConversions.meters);
          values.Bearing = bearingValue;
          //get data according to north Azimuth DD
          values.BearingConversions =
            utils.categorizeBearingFormat(values.Bearing, planSettingsNADD);
        } else {
          //if previous is arc then draw its tangent else directly use previous chord angle
          if (previousValues.RadiusConversions && previousValues.RadiusConversions.meters !== 0) {
            values.Bearing = bearingValue;
            //get data according to north Azimuth DD
            values.BearingConversions =
              utils.categorizeBearingFormat(values.Bearing, planSettingsNADD);
          } else {
            values.Bearing = previousValues.Bearing;
            values.BearingConversions = lang.clone(previousValues.BearingConversions);
          }
        }
        return values;
      },

      /**
      * When their are multiple *tb in sequence,
      * this function will update the values for all entries having *tb linked.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _updateTBFromIndex: function (index) {
        var updatedTangentBearings, j;
        updatedTangentBearings = false;
        //loop through all the items from the index and update bearings
        for (j = index; j < this._itemList.length; j++) {
          if (this._itemList[j] && this._itemList[j].isTB) {
            this._itemList[j] = this._setTangentBearing(this._itemList[j], this._itemList[j - 1]);
            updatedTangentBearings = true;
          } else {
            break;
          }
        }
        return updatedTangentBearings;
      },

      /**
      * zooms map extent to the drawn parcel
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _onZoomButtonClicked: function () {
        //set map extent to lines graphic layer
        this._setExtentToLayer(this.parcelLinesGraphicsLayer, true);
      },

      /**
      * for hide/show traverse grid and expand/collapse button
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
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
       * Set angle for selected parcel graphic
       * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      setRotation: function (endPoint) {
        var angle;
        //calculate angle value
        angle = geometryUtils.getRotationAngleBetweenPoints(this.startPoint, endPoint);
        if (this._itemList.length > 0) {
          angle -= this._itemList[0].BearingConversions.naDDRound;
        }
        //if angle is 360 consider it as 0
        if (angle === 360) {
          angle = 0;
        }
        this._parcelToolInstance.setRotation(angle);
      },

      /**
      * Set scale ratio for selected parcel graphic
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      setScaling: function (endPoint) {
        var distance, scaleRatio;
        //calculate distance value
        distance = geometryUtils.getScaleDistanceBetweenPoints(this.startPoint, endPoint);
        if (this.distance) {
          scaleRatio = distance / this.distance;
          //minimum value for the scale would be 1
          if (scaleRatio < 0.1) {
            scaleRatio = 0.1;
          }
          this._parcelToolInstance.setScale(scaleRatio);
        } else {
          this.distance = distance;
        }
      },

      /**
      * Add new row to the grid
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _addNewItem: function (isAddedFromScreenDigitization) {
        var values, radius, newBearing;
        values = this._getValidatedValues();
        if (values) {
          //subtract the rotation from actual bearing in case of screen digitization
          //and update the bearing conversions accordingly
          if (isAddedFromScreenDigitization) {
            if (this._rotationAngle) {
              newBearing = values.BearingConversions.naDD - this._rotationAngle;
              //if bearing is greater than 360 mod it
              newBearing = newBearing >= 360 ? newBearing % 360 : newBearing;
              //newBearing will be in NA DD so convert it to quadrant format
              //so that it will not get overridden in case of SA
              newBearing = this.getAngleFromDDTOQB(newBearing);
              values.Bearing = newBearing;
              values.BearingConversions = this._validateBearing(newBearing);
            }
          }
          radius = lang.trim(values.Radius.toString());
          this._itemList.push(values);
          this._createRow(values, this._itemList.length - 1);
          this._resetEntryRow(isAddedFromScreenDigitization);
          //if compass rule is applied set closure, else draw lines directly
          if (this.appliedCompassRule) {
            this.setParcelClosure();
          } else {
            //if radius is not set it means draw line else draw arc
            if (radius === "" || radius === "0" || radius === 0) {
              //draw new line and set the extent to line layer
              this._drawStraightLine(values, true);
              // show traverse tools zoom and expandCollapse
              this._showHideTraverseTools();
            } else {
              this._drawArc(values, true);
              // show traverse tools zoom and expandCollapse
              this._showHideTraverseTools();
            }
          }
        } else {
          if (!this.bearingNode.isValid()) {
            focusUtil.focus(this.bearingNode);
            this.bearingNode.validate(false);
          } else if (this.lengthNode.get('value') === "" || !this.lengthNode.isValid()) {
            focusUtil.focus(this.lengthNode);
            this.lengthNode.validate(false);
          } else if (this.radiusNode.get('value') !== "" && !this.radiusNode.isValid()) {
            focusUtil.focus(this.radiusNode);
            this.radiusNode.validate(false);
          }
        }
      },

      /**
      * Creates arcLength and chordLength data  for drawing arcs
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _createValuesForArc: function (values) {
        //If user is drawing arc create arcLength and chordLength data.
        //Get chordLength & arcLength according to current curve settings
        var radius;
        if (values.RadiusConversions) {
          radius = values.RadiusConversions.meters;
          if (this._planSettings.circularCurveParameters === "radiusAndArcLength") {
            values.ArcLength = values.LengthConversions.meters;
            values.ArcLengthConversions = lang.clone(values.LengthConversions);
            values.ChordLength = geometryUtils.getChordLengthFromArcLength(
              values.ArcLength, radius);
            values.ChordLengthConversions = this._validateLength(values.ChordLength, "meters");
          } else {
            values.ChordLength = values.LengthConversions.meters;
            values.ChordLengthConversions = lang.clone(values.LengthConversions);
            values.ArcLength = geometryUtils.getArcLengthFromChordLength(
              values.ChordLength, radius);
            values.ArcLengthConversions = this._validateLength(values.ArcLength, "meters");
          }
        } else {
          //if planSettings is for arc length and clearing radius converts the arc to straight line,
          //so in this case arc length should be used as distance of the converted straight line
          if (this._planSettings.circularCurveParameters === "radiusAndArcLength" &&
            values.ArcLengthConversions) {
            values.Length = values.ArcLength;
            values.LengthConversions = lang.clone(values.ArcLengthConversions);
          }
          values.ChordLength = 0;
          values.ChordLengthConversions = null;
          values.ArcLength = 0;
          values.ArcLengthConversions = null;
        }
        return values;
      },

      /**
      * enables on screen digitization widget
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _onDigitizationButtonClicked: function () {
        // enables/disables on screen digitization tool
        domClass.toggle(this.screenDigitizationNode, "esriCTEnableButton");
        // if screen digitization tool enabled the activates tool
        // else disables the digitization tool
        if (domClass.contains(this.screenDigitizationNode, "esriCTEnableButton")) {
          this.emit("activateDigitizationTool");
        } else {
          this.emit("deActivateDigitizationTool");
        }
      },

      /**
      * Creates Misclose Details instance
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _createMiscloseDetails: function () {
        //Create PlanSettings Instance
        this._misCloseDetailsInstance = new MiscloseDetails({
          nls: this.nls,
          config: this.config,
          appConfig: this.appConfig,
          numberFieldTypes: this.numberFieldTypes,
          validateNumericField: this.validateNumericField
        }, domConstruct.create("div", {}, this.misCloseDetailsNode));
        //on load no misclose info
        this._misCloseDetailsInstance.setMiscloseDetails(null);
      },

      /**
      * Initiates parcel tools
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _createParcelTools: function () {
        this._parcelToolInstance = new ParcelTools({
          nls: this.nls,
          config: this.config
        }, domConstruct.create("div", {}, this.parcelToolsNode));
        //handle events generated by parcel tools on rotate/scale
        this.own(this._parcelToolInstance.on("rotateGeometries",
          lang.hitch(this, function (rotationAngle) {
            if (rotationAngle !== this._rotationAngle) {
              this._rotationAngle = rotationAngle;
              if (this._itemList && this._itemList.length > 0) {
                this.setStartPoint(this.startPoint);
              }
            }
          })));
        this.own(this._parcelToolInstance.on("scaleGeometries",
          lang.hitch(this, function (scaleValue) {
            if (scaleValue !== this._scaleValue) {
              this._scaleValue = scaleValue;
              if (this._itemList && this._itemList.length > 0) {
                this.setStartPoint(this.startPoint);
              }
            }
          })));
        this.own(this._parcelToolInstance.on("toggleRotating",
          lang.hitch(this, function (isEnable) {
            this.emit("toggleRotating", isEnable);
          })));
        this.own(this._parcelToolInstance.on("toggleScaling",
          lang.hitch(this, function (isEnable) {
            this.emit("toggleScaling", isEnable);
          })));
      },

      /**
      * Creates Plan Info instance
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _createPlanInfo: function () {
        this._planInfoInstance = new PlanInfo({
          map: this.map,
          nls: this.nls,
          config: this.config,
          loading: this.loading,
          numberFieldTypes: this.numberFieldTypes,
          validateNumericField: this.validateNumericField,
          geometryService: this.geometryService,
          parcelPolygonGraphicsLayer: this.parcelPolygonGraphicsLayer,
          parcelLinesGraphicsLayer: this.parcelLinesGraphicsLayer,
          polylineLayerUnit: geometryUtils.getUnitValueForSR(this.lineLayerSpatialReference),
          polygonLayerUnit: geometryUtils.getUnitValueForSR(this.polygonLayerSpatialReference)
        }, domConstruct.create("div", {}, this.planInfoNode));
        //Handle click event of parcelInfo cancel button
        this.own(this._planInfoInstance.on("cancelTraversedParcel",
          lang.hitch(this, function () {
            this.emit("cancelTraverse");
          })));
        //Handle show message event of parcelInfo
        this.own(this._planInfoInstance.on("showMessage",
          lang.hitch(this, function (msg) {
            this._showMessage(msg);
          })));
        //Handle click event of parcelInfo save button
        this.own(this._planInfoInstance.on("saveTraversedParcel",
          lang.hitch(this, function () {
            var dataObj;
            //hide edit popup as it is blocking buttons on error msg dialogue
            this.closePopup();
            if (this._itemList && this._itemList.length > 0) {
              var parcelValidationDetails, statedAreaValue;
              statedAreaValue =
                this._misCloseDetailsInstance.traverseStatedArea.get("value").trim();
              parcelValidationDetails =
                this._planInfoInstance.validateParcelDetails(statedAreaValue);
              if (parcelValidationDetails.status) {
                if (this._misCloseDetailsInstance.traverseStatedArea.get("value") === "") {
                  statedAreaValue = null;
                }
                dataObj = {};
                dataObj.itemList = this._itemList;
                dataObj.statedArea = statedAreaValue;
                dataObj.rotation = this._rotationAngle;
                dataObj.scale = this._scaleValue;
                dataObj.appliedCompassRule = this.appliedCompassRule;
                dataObj.miscloseDetails = this._misCloseDetailsInstance.getMiscloseDetails();
                dataObj.polygonDeleteArr = this.polygonDeleteArr;
                dataObj.polylineDeleteArr = this.polylineDeleteArr;
                dataObj.planSettings = this._planSettings;
                this._planInfoInstance.saveData(dataObj);
              } else {
                this._showMessage(parcelValidationDetails.message);
              }
            } else {
              this._showMessage(this.nls.newTraverse.enterValidParcelInfoMessage);
            }
          })));
        // to display main page once parcel is saved
        this.own(this._planInfoInstance.on("displayMainPageAfterSave",
          lang.hitch(this, function () {
            this.emit("displayMainPageAfterSave");
          })));
      },

      /**
      * Creates rows for traverse grid
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
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
      * Creates input fields for grid
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _createFieldInputs: function (nodeContainer, value, className, isPopup) {
        var inputTextBox = new ValidationTextBox({
          "value": value,
          "class": className ? className : ""
        });
        inputTextBox.placeAt(nodeContainer);
        //set validator functions & invalid message
        if (className === "esriCTBearingRow") {
          inputTextBox.validator = lang.hitch(this, function (value) {
            //from grid row user can enter *tb
            //also we show * in the grid rows for tb so skip the * for validation
            if (value !== "*tb" && value.charAt(0) === '*') {
              value = value.slice(1);
            }
            return this._bearingValidator(value, ["*tb"]);
          });
          inputTextBox.invalidMessage = this.nls.newTraverse.invalidBearingMessage;
        } else if (className === "esriCTLengthRow") {
          inputTextBox.validator = lang.hitch(this, this._lengthValidator);
          inputTextBox.invalidMessage = this.nls.newTraverse.invalidLengthMessage;
        } else if (className === "esriCTRadiusRow") {
          inputTextBox.validator = lang.hitch(this, this._radiusValidator);
          inputTextBox.invalidMessage = this.nls.newTraverse.invalidRadiusMessage;
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
      * Create new row with fields in grid
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _createRow: function (values, i) {
        var row, node, radius, length, radiusConversions, bearingValue;
        row = domConstruct.create("div", { "class": "dojoDndItem esriCTRow", "rowIndex": i });
        node = domConstruct.create("div", { "rowIndex": i }, row);
        this._createLineSelector(node, values.LineSymbol, i);
        bearingValue = this._getBearingAccordingToPlanSettings(values.BearingConversions);
        //if tb is applied add * to the bearing and show in grid
        if (values.isTB) {
          bearingValue = "*" + bearingValue;
        }
        this._createFieldInputs(row, bearingValue, "esriCTBearingRow");
        //If user is drawing arcs, values will have valid radiusConversions
        radiusConversions = values.RadiusConversions;
        if (radiusConversions) {
          //get radius according to plan settings
          radius = this._getRoundedValue(values.RadiusConversions, "Radius");
          //According to plan settings show arcLength/chordLength in length textbox
          if (this._planSettings.circularCurveParameters === "radiusAndArcLength") {
            length = this._getRoundedValue(values.ArcLengthConversions, "Length");
          } else {
            length = this._getRoundedValue(values.ChordLengthConversions, "Length");
          }
        } else {
          radius = "";
          length = this._getRoundedValue(values.LengthConversions, "Length");
        }
        this._createFieldInputs(row, length, "esriCTLengthRow");
        this._createFieldInputs(row, radius, "esriCTRadiusRow");
        this._createDeleteButton(row, i);
        this._nodes.push(row);
        this._dndContainer.clearItems();
        this._dndContainer.insertNodes(false, this._nodes);
      },

      /**
      * Creates line selector field for grid
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _createLineSelector: function (node, symbol, index) {
        var symbolSelectorPopup, lineTypesData;
        lineTypesData = this.config.lineTypes;
        symbolSelectorPopup = new SymbolSelector({
          "hideOnSelect": true,
          "symbolData": lineTypesData
        }, node);
        domClass.add(symbolSelectorPopup.domNode, "esriCTSymbolContainer");
        if (symbol) {
          symbolSelectorPopup.selectSymbol(symbol);
          domAttr.set(symbolSelectorPopup.domNode, "rowIndex", index);
          symbolSelectorPopup.onSelect = lang.hitch(this, function (selectedSymbol) {
            var values, index;
            index = parseInt(domAttr.get(symbolSelectorPopup.domNode, "rowIndex"), 10);
            values = this._itemList[index];
            //update selected symbol in the item list
            values.LineSymbol = selectedSymbol;
            //on updating symbol set start point it will redraw everything
            this.setStartPoint(this.startPoint);
          });
        } else {
          symbolSelectorPopup.setDefault();
        }
        return symbolSelectorPopup;
      },

      /**
      * Attach 'click' event on delete button to delete row from grid
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
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
      * Delete row from grid
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _deleteRow: function (row, index) {
        var updatedTb;
        if (this._itemList.length) {
          this._dndContainer.delItem(row.id);
          domConstruct.destroy(row);
          this._nodes.splice(index, 1);
          this._itemList.splice(index, 1);
          this._dndContainer.sync();
          this._updateRowIndexes();
          //as we have removed item, the next item will be at deleted index,
          //if it is tb updated the values for bearing for all consecutive tb
          if (this._itemList[index] && this._itemList[index].isTB) {
            //if after delete length is 1 or the deleted item is at index 0, it cannot have tb
            if (this._itemList.length === 1 || index === 0) {
              this._itemList[0].isTB = false;
              index++;
            }
            if (this._itemList.length > 1) {
              updatedTb = this._updateTBFromIndex(index);
            }
          }
          //if compass rule is applied pass force set flag to setClosure,
          //so calculations for adjustments will executed and then it will set start-point,
          //else set start Point directly
          if (this.appliedCompassRule) {
            this.setParcelClosure(true);
          } else {
            //as we have removed the point now redraw everything
            this.setStartPoint(this.startPoint);
          }
          //if tb is updated the values in bearing will be changed so updated the grid
          if (updatedTb) {
            this._reGenerateTraverseGrid();
          }
          this._showHideTraverseTools();
        }
      },

      /**
      * Update row index in attributes of the dom elements.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
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
      * Callback handler called on node dragged and dropped
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _onDndDrop: function () {
        var allNodes, updateItemList = [], updatedTB;
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
        //update the bearing for each tb
        //also if some tb applied row is moved to first position disable its TB
        for (var j = 0; j < this._itemList.length; j++) {
          if (j === 0 && this._itemList[j].isTB) {
            this._itemList[j].isTB = false;
            updatedTB = true;
          }
          if (this._itemList[j] && this._itemList[j].isTB) {
            this._itemList[j] = this._setTangentBearing(this._itemList[j], this._itemList[j - 1]);
            updatedTB = true;
          }
        }
        //as rows are moved need to update the drawing as well
        this.setStartPoint(this.startPoint);
        //if tb values are updated regenerate traverse gri to reflect the bearings
        if (updatedTB) {
          this._reGenerateTraverseGrid();
        }
      },

      /**
      * Update values for respective row
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _updateParcelValues: function (inputTextBox, index, isPopup) {
        var values, updatedCol, updatedValue, updatedValueAsPerPlanSettings,
          validatedValues, isUpdated = false, prevValue, updatedTangentBearings;
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
            //check if updated values has don't have * then, remove its tb flag
            if (updatedValue.indexOf('*') === -1) {
              values.isTB = false;
            }
          } else if (domClass.contains(inputTextBox.domNode, "esriCTLengthRow") &&
            String(this._getRoundedValue(values.LengthConversions, "Length")) !==
            updatedValue) {
            updatedCol = "Length";
            //capture previous value before updating the new entered one
            prevValue = values.Length;
            //if length value is changed
            values.Length = updatedValue;
            isUpdated = true;
          } else if (domClass.contains(inputTextBox.domNode, "esriCTRadiusRow") &&
            String(values.Radius) !== updatedValue) {
            if (values.RadiusConversions) {
              if (String(this._getRoundedValue(values.RadiusConversions, "Radius")) !==
                updatedValue) {
                updatedCol = "Radius";
                //capture previous value before updating the new entered one
                prevValue = values.Radius;
                //if radius value is changed
                values.Radius = updatedValue;
                isUpdated = true;
              }
            } else {
              updatedCol = "Radius";
              //capture previous value before updating the new entered one
              prevValue = values.Radius;
              //if radius value is changed
              values.Radius = updatedValue;
              isUpdated = true;
            }
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
                if (values.isTB) {
                  updatedValueAsPerPlanSettings = "*" + updatedValueAsPerPlanSettings;
                }
                //show the entered value in textbox according to planSettings
                inputTextBox.set('value', updatedValueAsPerPlanSettings);
                //if bearing is updated and next values are tb then that should also be updated
                updatedTangentBearings = this._updateTBFromIndex(index + 1);
              } else if (updatedCol === "Length") {
                updatedValueAsPerPlanSettings = this._getRoundedValue(values.LengthConversions,
                  "Length");
                //update the value in itemList
                values.Length = values.LengthConversions[this._planSettings.distanceAndLengthUnits];
                //if length is updated & it is arc, update arc and chord length as well
                if (values.RadiusConversions) {
                  values = this._createValuesForArc(values);
                }
                //show the entered value in textbox according to planSettings
                inputTextBox.set('value', updatedValueAsPerPlanSettings);
                //if bearing is updated and next values are tb then that should also be updated
                updatedTangentBearings = this._updateTBFromIndex(index);
              } else if (updatedCol === "Radius") {
                //update the value in itemList and in textbox
                if (values.RadiusConversions) {
                  values.Radius =
                    values.RadiusConversions[this._planSettings.distanceAndLengthUnits];
                  updatedValueAsPerPlanSettings = this._getRoundedValue(values.RadiusConversions,
                    "Radius");
                } else {
                  values.Radius = "";
                  updatedValueAsPerPlanSettings = "";
                }
                //if radius is updated & it is arc, add/update arc and chord length as well
                values = this._createValuesForArc(values);
                //show the entered value in textbox according to planSettings
                inputTextBox.set('value', updatedValueAsPerPlanSettings);
                //if bearing is updated and next values are tb then that should also be updated
                updatedTangentBearings = this._updateTBFromIndex(index);
              }
              //if compass rule is applied pass force set flag to setClosure,
              //so calculations for adjustments will executed and then it will set start-point,
              //else set start Point directly
              if (this.appliedCompassRule) {
                this.setParcelClosure(true);
              } else {
                //Finally set start point it will redraw everything
                this.setStartPoint(this.startPoint);
              }
              if (updatedTangentBearings || isPopup) {
                this._reGenerateTraverseGrid();
                //if editing is from popup, reopen the popup
                if (isPopup && this._popupCoords) {
                  this._openPopup(this._popupCoords);
                }
              }
            } else {
              this._updateValues(values, updatedCol, inputTextBox);
            }
          }
        }
      },

      /**
      * Reset the entered value in textbox and values object according to updated col.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _updateValues: function (values, updatedCol, inputTextBox) {
        var updatedValue;
        //if entered value is not valid resetting the value to prev value.
        if (updatedCol === "Bearing") {
          values.Bearing = this._getBearingAccordingToPlanSettings(values.BearingConversions, true);
          updatedValue = this._getBearingAccordingToPlanSettings(values.BearingConversions);
        } else if (updatedCol === "Length") {
          values.Length = values.LengthConversions[this._planSettings.distanceAndLengthUnits];
          updatedValue = this._getRoundedValue(values.LengthConversions, "Length");
        } else if (updatedCol === "Radius") {
          if (values.RadiusConversions) {
            values.Radius =
              values.RadiusConversions[this._planSettings.distanceAndLengthUnits];
            updatedValue = this._getRoundedValue(values.RadiusConversions, "Radius");
          } else {
            values.Radius = "";
            updatedValue = "";
          }
        }
        //also  show the value in textbox
        inputTextBox.set('value', updatedValue);
      },

      /**
      * Function to show/hide traverse tools
      * If any parcel points are entered then only, show zoom and expand/collapse grid button
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _showHideTraverseTools: function () {
        if (this._itemList && this._itemList.length > 0) {
          // show traverse tools zoom and expandCollapse
          domClass.remove(this.expandCollapseNode, "esriCTHidden");
          domClass.remove(this.zoomToNode, "esriCTHidden");
        } else {
          domClass.add(this.expandCollapseNode, "esriCTHidden");
          domClass.add(this.zoomToNode, "esriCTHidden");
        }
      },

      /**
      * Returns the bearing info object according to plan settings
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
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
      * Returns the rounded value according to plan settings and places configured
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _getRoundedValue: function (conversionObj, valueFor) {
        var places, value;
        value = conversionObj[this._planSettings.distanceAndLengthUnits];
        switch (valueFor) {
          case "Length":
            places = this.lengthFieldPlaces;
            break;
          case "Radius":
            places = this.radiusFieldPlaces;
            break;
          case "MiscloseDistance":
            places = this.miscloseDistanceFieldPlaces;
            break;
        }
        return utils.honourPopupRounding(places, value);
      },

      /**
      * Reset filed value in grid
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _resetEntryRow: function (resettingAfterDigitization) {
        var bearingValue;
        this.bearingNode.set("value", "");
        this.lengthNode.set("value", "");
        this.radiusNode.set("value", "");
        this.bearingNode.reset();
        this.lengthNode.reset();
        this.radiusNode.reset();
        //if grid has any values show the last bearing in initial bearing node and select it
        if (this._itemList.length > 0) {
          //if last entry in the grid is tb show "*tb"
          if (this._itemList[this._itemList.length - 1].isTB) {
            bearingValue = "*tb";
          } else {
            //if resetting after digitization show bearing according to current plan settings,
            //as in digitization bering are entered in quadrant bearing format
            if (resettingAfterDigitization) {
              bearingValue = this._getBearingAccordingToPlanSettings(
                this._itemList[this._itemList.length - 1].BearingConversions);
            } else {
              bearingValue = this._itemList[this._itemList.length - 1].Bearing;
            }
          }
          this.bearingNode.set("value", bearingValue);
          this.bearingNode.textbox.setSelectionRange(0, bearingValue.length);
        }
      },

      /**
      * Regenerate traverse grid
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _reGenerateTraverseGrid: function () {
        if (this._dndContainer) {
          this._dndContainer.destroy();
          this._dndContainer = null;
        }
        domConstruct.empty(this.traverseGrid);
        this._createTraverseGrid();
      },

      /**
      * Redraws the parcel points and line with the already entered values
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _reDrawParcel: function () {
        this.parcelLinesGraphicsLayer.clear();
        this.parcelPointsGraphicsLayer.clear();
        //reset the boundary lines array
        this._arrayOfAllBoundaryLines = [];
        //draw start point as we cleared graphics layer
        this._drawPoint(this.startPoint);
        array.forEach(this._itemList, lang.hitch(this, function (value) {
          if (value.Radius === "" || value.Radius === "0" || value.Radius === 0) {
            this._drawStraightLine(value, false);
          } else {
            this._drawArc(value, false);
          }
        }));
        //set map extent to lines graphic layer
        this._setExtentToLayer(this.parcelLinesGraphicsLayer);
        //on draw complete set the parcel close status
        this.setParcelClosure();
      },

      /**
      * Sets start-point and if additional parcel points are added,
      * it will redraw the parcel considering update in start point.
      * Note: It will always set the start point in 4326 as.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      setStartPoint: function (startPoint) {
        var defaultStartPointSpatialRef = new SpatialReference(4326);
        geometryUtils.getProjectedGeometry(startPoint, defaultStartPointSpatialRef,
          this.geometryService).then(
          lang.hitch(this, function (projectedGeometry) {
            //set new start point
            this.startPoint = projectedGeometry;
            //as start point is changed this will be the start-point for next line
            this._startPointForNextLine = lang.clone(projectedGeometry);
            this._orgStartPointForNextLine = lang.clone(projectedGeometry);
            //clear applied compass rule flag
            this.appliedCompassRule = false;
            //if already some point are added redraw the parcel
            if (this._itemList.length > 0) {
              this._reDrawParcel();
            } else {
              //before drawing the start point clear layers
              this.parcelPointsGraphicsLayer.clear();
              this.parcelLinesGraphicsLayer.clear();
              //reset the boundary lines array
              this._arrayOfAllBoundaryLines = [];
              //draw new start point
              this._drawPoint(startPoint);
            }
          }));
      },

      /**
      * Add the  graphic on layer in maps spatial ref, if required it will project the geometry
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _addProjectedGraphic: function (layer, graphic, setExtentToLayer, setParcelClosure) {
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
                //set map extent to lines graphic layer
                if (setExtentToLayer) {
                  this._setExtentToLayer(layer);
                  //on draw complete set the parcel close status
                  if (setParcelClosure) {
                    this.setParcelClosure();
                  }
                }
              }
            }));
        } else {
          layer.add(graphic);
          //set map extent to lines graphic layer
          if (setExtentToLayer) {
            this._setExtentToLayer(layer);
            //on draw complete set the parcel close status
            if (setParcelClosure) {
              this.setParcelClosure();
            }
          }
        }
      },

      /**
      * Draws point on layer with the configured symbol and in maps spatial ref.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _drawPoint: function (point) {
        var graphic = new Graphic(point, jsonUtils.fromJson(this.config.pointSymbol));
        this._addProjectedGraphic(this.parcelPointsGraphicsLayer, graphic, false, false);
      },

      /**
      * Draws Endpoint and line(straight/arc) for the specified values and,
      * set the extent of map to layer if asked.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _drawLineAndEndPoint: function (endpoint, linesPathArray, values, setExtentToLayer) {
        var polyLine, graphic, drawPoint, setParcelClosure;
        drawPoint = true;
        setParcelClosure = true;
        //check if valid end point then create line
        if (endpoint) {
          polyLine = geometryUtils.getLineBetweenPoints(linesPathArray);
          if (polyLine) {
            graphic = new Graphic(polyLine, jsonUtils.fromJson(values.LineSymbol.symbol));
            //draw line
            this._addProjectedGraphic(this.parcelLinesGraphicsLayer, graphic, setExtentToLayer,
              setParcelClosure);
            //set current endPoint as previous point
            this._startPointForNextLine = lang.clone(endpoint);
            //if compass rule is applied and all the lines are drawn, don't draw the last point
            if (this.appliedCompassRule &&
              this.parcelLinesGraphicsLayer.graphics.length === this._itemList.length) {
              drawPoint = false;
            }
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
      * Set data required for calculating misclose info.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      setInfoForCalculatingMisclose: function (values, endPoint, arcGeometryPointsArray) {
        var polyline;
        values.startPoint = lang.clone(this._orgStartPointForNextLine);
        values.endpoint = lang.clone(endPoint);
        polyline = geometryUtils.getLineBetweenPoints(arcGeometryPointsArray);
        //Add if it is boundary lines in array
        if (values.LineSymbol.type === this.config.BoundaryLineType) {
          for (var i = 0; i < polyline.paths.length; i++) {
            this._arrayOfAllBoundaryLines.push(polyline.paths[i]);
          }
        }
        //set current endPoint as previous point
        this._orgStartPointForNextLine = lang.clone(endPoint);
        return values;
      },

      /**
      * Returns the data required to draw the arc.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      getArcInfo: function (chordStartPoint, initBearing, radius, distance) {
        var chordEndPoint, midDistance,
          chordMidPoint, centerAndChordDistance, arcGeometryPointsArray, param, arcParams;
        //get the end point of the chord
        chordEndPoint =
          geometryUtils.getDestinationPoint(chordStartPoint, initBearing, Math.abs(distance));
        //get mid distance
        midDistance = Math.abs(distance) / 2;
        //get the mid point of the chord
        chordMidPoint = geometryUtils.getDestinationPoint(chordStartPoint, initBearing,
          midDistance);
        //get the distance between center and chord
        centerAndChordDistance = Math.sqrt(Math.abs((radius * radius) -
          (midDistance * midDistance)));
        //create the param object for getting arc
        param = {
          "distance": distance,
          "radius": radius,
          "initBearing": initBearing,
          "chordMidPoint": chordMidPoint,
          "centerAndChordDistance": centerAndChordDistance,
          "chordEndPoint": chordEndPoint,
          "chordStartPoint": chordStartPoint
        };
        // get the required param for creating arc
        arcParams = geometryUtils.getArcParam(param);
        // set the start angle always less than the end angle
        arcParams.startAngle = arcParams.startAngle > arcParams.endAngle ?
          arcParams.startAngle - 360 : arcParams.startAngle;
        //using startAngle, endAngle, centerPoint and radius get the points array for arc
        arcGeometryPointsArray = geometryUtils.getPointsForArc(arcParams.startAngle,
          arcParams.endAngle, arcParams.centerPoint, radius);
        //if points array is empty it means user is trying to draw arc with very large radius value.
        //in such case directly draw arc between chordStartPoint and chordEndPoint
        if (arcGeometryPointsArray.length === 0) {
          arcGeometryPointsArray.push(param.chordStartPoint);
          arcGeometryPointsArray.push(param.chordEndPoint);
        }
        //if radius is negative paths are created in reverse direction,
        //so reverse array to get proper direction
        if (radius < 0) {
          arcGeometryPointsArray.reverse();
        }
        return { "endPoint": chordEndPoint, "arcGeometryPointsArray": arcGeometryPointsArray };
      },

      /**
      * Draws straight line for the specified values and set the extent of map to layer if asked.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _drawStraightLine: function (values, setExtentToLayer) {
        var endpoint, bearing, distance, endPointForMisCloseCalculation;
        //always consider bearing from north and in dd
        bearing = values.BearingConversions.naDD;
        //set the distance in meters
        distance = values.LengthConversions.meters;

        //if misclose is adjusted then adjustPoints
        if (values.adjustedValues && this.adjustPoints) {
          bearing = values.adjustedValues.adjustedBearing;
          if (values.BearingConversions.qb3DDRound.charAt(0) === "S" ||
            values.adjustedValues.lat < 0) {
            bearing = values.adjustedValues.adjustedBearingNADD;
          }
          distance = values.adjustedValues.adjustedLength;
          this.appliedCompassRule = true;
        }

        //apply rotation
        if (this._rotationAngle) {
          bearing = Number(bearing) + this._rotationAngle;
        }
        //apply scale
        if (this._scaleValue) {
          distance = distance * this._scaleValue;
        }
        endPointForMisCloseCalculation =
          geometryUtils.getDestinationPoint(this._orgStartPointForNextLine,
            values.BearingConversions.naDD, values.LengthConversions.meters);
        //get end point
        endpoint = geometryUtils.getDestinationPoint(this._startPointForNextLine,
          bearing, distance);
        //set info required for calculating misclose details
        values = this.setInfoForCalculatingMisclose(values, endPointForMisCloseCalculation,
          [this._orgStartPointForNextLine, endPointForMisCloseCalculation]);
        //draw line and end point on layer
        this._drawLineAndEndPoint(endpoint, [this._startPointForNextLine, endpoint], values,
          setExtentToLayer);
      },

      /**
      * Draws arc for the specified values and set the extent of map to layer if asked.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _drawArc: function (values, setExtentToLayer) {
        var radius, distance, initBearing, arcInfo, orgArcInfo;
        //always consider bearing from north and in dd
        initBearing = values.BearingConversions.naDD;
        //get the entered values for radius, distance, and bearing
        radius = values.RadiusConversions.meters;
        distance = values.ChordLengthConversions.meters;
        //if misclose is adjusted then adjustPoints
        if (values.adjustedValues && this.adjustPoints) {
          initBearing = values.adjustedValues.adjustedBearing;
          if (values.BearingConversions.qb3DDRound.charAt(0) === "S" ||
            values.adjustedValues.lat < 0) {
            initBearing = values.adjustedValues.adjustedBearingNADD;
          }
          distance = values.adjustedValues.adjustedLength;
          //In case if -ve chordLength was entered the adjustments will change it to +ve,
          //so multiply by -1 which will consider the distance as negative
          if (values.ChordLengthConversions.meters < 0) {
            distance = distance * -1;
          }
          this.appliedCompassRule = true;
        }
        //apply rotation
        if (this._rotationAngle) {
          initBearing = Number(initBearing) + this._rotationAngle;
        }
        //apply scale
        if (this._scaleValue) {
          distance = distance * this._scaleValue;
          radius = radius * this._scaleValue;
        }
        //get arc info according to org values in grid i.e. without applying rotation and scaling
        orgArcInfo = this.getArcInfo(this._orgStartPointForNextLine, values.BearingConversions.naDD,
          values.RadiusConversions.meters, values.ChordLengthConversions.meters);
        values = this.setInfoForCalculatingMisclose(values, orgArcInfo.endPoint,
          orgArcInfo.arcGeometryPointsArray);
        //get arcInfo to draw with honouring the rotation and scaling
        arcInfo = this.getArcInfo(this._startPointForNextLine, initBearing, radius, distance);
        //draw arcs geometry and endpoint on layer
        this._drawLineAndEndPoint(arcInfo.endPoint, arcInfo.arcGeometryPointsArray,
          values, setExtentToLayer);
      },

      /**
      * Sets the map extent to the graphic layer
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _setExtentToLayer: function (graphicsLayer, forceZoom) {
        var newExtent;
        if (graphicsLayer.graphics.length > 0) {
          newExtent = graphicsUtils.graphicsExtent(graphicsLayer.graphics);
          //set the new extent only if it is out of current map extent
          if (forceZoom || !this.map.extent.contains(newExtent)) {
            this.map.setExtent(newExtent.expand(1.5));
          }
        }
      },

      /**
      * Emits the showMessage event
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _showMessage: function (msg) {
        this.emit("showMessage", msg);
      },

      /**
      * Regenerates the traverse grid misclose info according to updated plan settings
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      updateAccordingToPlanSettings: function (updatedSettings) {
        var miscloseDetails, miscloseDetailsInfo;
        this._planSettings = updatedSettings;
        this.bearingNode.set("placeHolder",
          this._getAbbreviatedUnits(updatedSettings.directionOrAngleUnits));
        this.lengthNode.set("placeHolder",
          this._getAbbreviatedUnits(updatedSettings.distanceAndLengthUnits));
        this.radiusNode.set("placeHolder",
          this._getAbbreviatedUnits(updatedSettings.distanceAndLengthUnits));

        //regenerate traverse grid, it will honour the updated plan settings.
        this._reGenerateTraverseGrid();
        //update misclose info if available
        if (this._misCloseDetailsInstance) {
          miscloseDetails = this._misCloseDetailsInstance.getMiscloseDetails();
          if (miscloseDetails) {
            miscloseDetailsInfo = this._getMiscloseDetailsAccordingToPlanSettings(miscloseDetails);
            this._misCloseDetailsInstance.updateAccordingToPlanSettings(miscloseDetailsInfo);
          }
        }
      },

      /**
      * Disables on screen digitization widget
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      deActivateDigitizationTool: function () {
        //disables on screen digitization tool
        domClass.remove(this.screenDigitizationNode, "esriCTEnableButton");
      },

      /**
      * Draw point on map with screen digitization widget
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      pointAddedFromDigitization: function (mapPoint) {
        var angle, distance, quadrantAngle, defaultStartPointSpatialRef;
        defaultStartPointSpatialRef = new SpatialReference(4326);
        geometryUtils.getProjectedGeometry(mapPoint, defaultStartPointSpatialRef,
          this.geometryService).then(
          lang.hitch(this, function (projectedGeometry) {
            angle = geometryUtils.getAngleBetweenPoints(this._startPointForNextLine,
              projectedGeometry);
            //if angle is 360 consider it as 0
            if (angle === 360) {
              angle = 0;
            }
            distance = geometryUtils.getDistanceBetweenPoints(this._startPointForNextLine,
              projectedGeometry);
            //returned angle will always be in NA DD so convert it to quadrant format
            //so that it will not get override in case of SA
            quadrantAngle = this.getAngleFromDDTOQB(angle);
            this.bearingNode.set("value", quadrantAngle);
            //returned distance will always be in meters, based on plan settings convert if required
            if (this._planSettings.distanceAndLengthUnits === "uSSurveyFeet") {
              distance = utils.metersToUSSurveyFeet(distance);
            }
            //Divide the distance by scale value if scaling is applied and point added from screen
            if (this._scaleValue > 0) {
              distance = distance / this._scaleValue;
            }
            this.lengthNode.set("value", distance);
            //as we can only create straight lines from screen digitization always pass empty radius
            this.radiusNode.set("value", "");
            //set the added from screenDigitization flag to true
            this._addNewItem(true);
          }));
      },

      /**
      * This function calculates misclose distance based on relative coordinate system
      * where start point is origin.
      * Also this will return an object with details containing if parcel is closed or not
      * compassStartPoint - start point from where boundary lines started
      * compassEndPoint - point where boundary lines ended
      * miscloseDistance - distance between start and end point
      * miscloseBearing - angle between start and end point
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      getParcelCloseDetails: function () {
        var boundaryLinesCount, parcelCloseDetails, isValid, compassStartPoint, compassEndPoint,
        miscloseDistance, miscloseBearing, pt;
        //set default return object
        parcelCloseDetails = {
          isClosed: false,
          compassStartPoint: null,
          compassEndPoint: null
        };
        //set default values in vars
        isValid = true;
        boundaryLinesCount = 0;
        pt = { x: 0, y: 0 };
        //loop through all the entered items
        array.forEach(this._itemList, lang.hitch(this, function (item, index) {
          //update count of boundary lines and set the compass start & end point
          if (item.LineSymbol.type === this.config.BoundaryLineType) {
            if (boundaryLinesCount === 0) {
              compassStartPoint = item.startPoint;
            } else {
              compassEndPoint = item.endpoint;
            }
            boundaryLinesCount++;
            pt.x += Math.cos((item.BearingConversions.naDD / 180 * Math.PI)) *
              item.LengthConversions.meters;
            pt.y += Math.sin((item.BearingConversions.naDD / 180 * Math.PI)) *
              item.LengthConversions.meters;
          } else if (index > 0 && boundaryLinesCount !== 0) {
            isValid = false;
          }
        }));
        //If entered data has more than 1 Boundary line and,
        //boundary line is not followed by any other category of line then it is valid
        if (boundaryLinesCount > 1 && isValid) {
          //calculate misclose distance between end point and origin
          miscloseDistance = Math.sqrt((pt.x * pt.x) + (pt.y * pt.y));
          //if distance is very small we get value with negative exponent consider such values as 0
          miscloseDistance = geometryUtils.removeNegativeExponents(miscloseDistance);
          //consider only 6 decimal places after point
          compassStartPoint.x = utils.showFixedPlacesAfterDecimal(compassStartPoint.x, 6);
          compassStartPoint.y = utils.showFixedPlacesAfterDecimal(compassStartPoint.y, 6);
          compassEndPoint.x = utils.showFixedPlacesAfterDecimal(compassEndPoint.x, 6);
          compassEndPoint.y = utils.showFixedPlacesAfterDecimal(compassEndPoint.y, 6);
          //using start and end point calculate misclose angle
          miscloseBearing = geometryUtils.getAngleBetweenPoints(
            compassEndPoint,
            compassStartPoint
          );
          //set values in return object
          parcelCloseDetails.isClosed = true;
          parcelCloseDetails.compassStartPoint = compassStartPoint;
          parcelCloseDetails.compassEndPoint = compassEndPoint;
          parcelCloseDetails.miscloseDistance = miscloseDistance;
          parcelCloseDetails.miscloseBearing = miscloseBearing;
        }
        return parcelCloseDetails;
      },

      /**
      * Function to show/hide the misclose details and parcel tools if parcel is closed
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      setParcelClosure: function (forceSetStartPoint) {
        var miscloseDetails, parcelCloseDetails;
        parcelCloseDetails = this.getParcelCloseDetails();
        if (parcelCloseDetails.isClosed) {
          //calculate misclose details on parcel close details
          miscloseDetails = this.getCalculatedMiscloseDetails(parcelCloseDetails);
          //set misclose info
          this._misCloseDetailsInstance.setMiscloseDetails(miscloseDetails);
          //apply compass rule corrections and again redraw if it is saying to adjust the points
          if (miscloseDetails.adjustPoints) {
            this.adjustPoints = this._applyCompassRule(miscloseDetails);
            if ((this.adjustPoints && !this.appliedCompassRule) || forceSetStartPoint) {
              this.setStartPoint(this.startPoint);
            }
          } else {
            this.adjustPoints = false;
            if (this.appliedCompassRule || forceSetStartPoint) {
              this.setStartPoint(this.startPoint);
            }
          }
        } else {
          //clear misclose info
          this._misCloseDetailsInstance.setMiscloseDetails(null);
          //clear flag to adjustPoints and appliedCompassRule
          this.adjustPoints = false;
          if (this.appliedCompassRule || forceSetStartPoint) {
            this.appliedCompassRule = false;
            this.setStartPoint(this.startPoint);
          }
        }
      },

      /**
      * Returns the object of misclose bearing, distance, area according to plan settings.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _getMiscloseDetailsAccordingToPlanSettings: function (miscloseDetails) {
        var returnVal, calculatedArea, miscloseDistance;
        returnVal = {};
        if (miscloseDetails.BearingConversions) {
          returnVal.miscloseBearing =
            this._getBearingAccordingToPlanSettings(miscloseDetails.BearingConversions);
        }
        //get the distance according to current plan settings and add its abbreviation to it.
        miscloseDistance = this._getRoundedValue(miscloseDetails.LengthConversions,
          "MiscloseDistance");
        returnVal.miscloseDistance = miscloseDistance + " " +
          this._getAbbreviatedUnits(this._planSettings.distanceAndLengthUnits);
        //get calculated area according to planSettings
        if (miscloseDetails.AreaConversions) {
          calculatedArea = miscloseDetails.AreaConversions[this._planSettings.areaUnits];
          //fix the value to be shown
          if (!isNaN(parseFloat(calculatedArea))) {
            calculatedArea = parseFloat(calculatedArea).toFixed(3);
          }
        } else {
          calculatedArea = 0;
        }
        calculatedArea = calculatedArea + " " +
          this._getAbbreviatedUnits(this._planSettings.areaUnits);
        returnVal.calculatedArea = calculatedArea;
        return returnVal;
      },

      /**
      * This function will return an object with details containing
      * miscloseDistance, miscloseBearing, miscloseRatio, accuracy & calculatedArea
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      getCalculatedMiscloseDetails: function (parcelCloseDetails) {
        var bearingData, lengthData, miscloseDetails = {}, miscloseDistance = 0,
          miscloseBearing = 0, miscloseRatio = 0, accuracy = false, highRatio,
          miscloseRatioInfo, compassStartPoint, compassEndPoint;
        //set compass start and end point
        compassStartPoint = parcelCloseDetails.compassStartPoint;
        compassEndPoint = parcelCloseDetails.compassEndPoint;
        highRatio = 100000;
        if (compassEndPoint && compassStartPoint) {
          //get length between End and Start of the boundary lines
          miscloseDistance = parcelCloseDetails.miscloseDistance;
          //get bearing between  End and Start of the boundary lines
          miscloseBearing = parcelCloseDetails.miscloseBearing;
          //if misclose distance in 0 show misclose bearing also 0
          if (miscloseDistance === 0) {
            miscloseBearing = 0;
          }
          //returned angle will always be in NA DD so convert it to quadrant format
          //so that it will not get override in case of SA
          miscloseBearing = this.getAngleFromDDTOQB(miscloseBearing);
          // get bearingData according to all formats based on current plan settings
          bearingData = utils.categorizeBearingFormat(miscloseBearing, this._planSettings);
          if (bearingData) {
            miscloseDetails.BearingConversions = bearingData;
          }
          // get calculated areas data of the polygon
          miscloseDetails.AreaConversions = this._getCalculatedArea();
          // get misclose ratio
          miscloseRatioInfo = this._getMiscloseRatioInfo(miscloseDistance);
          miscloseRatio = miscloseRatioInfo.miscloseRatio;
          miscloseDetails.miscloseValue = miscloseRatioInfo.miscloseValue;

          //get length data according to all format from meters
          lengthData = utils.categorizeLengthFormat(miscloseDistance, "meters");
          //keep the misclose distance data
          miscloseDetails.LengthConversions = lengthData;
          //use misclose distance according to configured units
          miscloseDistance = lengthData[this.config.miscloseSnapDistanceUnit + "Round"];

          //set accuracy if miscloseRatio is greater or equal to highRatio
          if (miscloseRatio >= highRatio) {
            accuracy = true;
          }
          miscloseDetails.miscloseRatio = miscloseRatio;
          miscloseDetails.accuracy = accuracy;
          //get misclose bearing, distance, area according to planSettings
          miscloseDetails = lang.mixin(miscloseDetails,
            this._getMiscloseDetailsAccordingToPlanSettings(miscloseDetails));

          if ((miscloseDistance > 0 &&
            miscloseDistance <= this.config.miscloseSnapDistance) ||
            (isFinite(miscloseRatio) && miscloseRatio >= this.config.miscloseRatioSnap)) {
            miscloseDetails.adjustPoints = true;
            miscloseDetails.compassCompleteLength = miscloseRatioInfo.compassCompleteLength;
          }
        }
        return miscloseDetails;
      },

      /**
      * Returns calculated area
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _getCalculatedArea: function () {
        var calculatedArea, boundaryPolygon, boundaryGraphic;
        if (this._arrayOfAllBoundaryLines && this._arrayOfAllBoundaryLines.length > 0) {
          // calculate area of the polygon
          boundaryPolygon = geometryUtils.getPolygonFromPolyLines(
            this._arrayOfAllBoundaryLines, true);
          if (boundaryPolygon) {
            boundaryGraphic = new Graphic(boundaryPolygon);
            this.parcelPolygonGraphicsLayer.clear();
            this.parcelPolygonGraphicsLayer.add(boundaryGraphic);
            calculatedArea = geometryUtils.getAreaOfGeometry(boundaryPolygon);
          }
        }
        return calculatedArea;
      },

      /**
      * Returns weather to apply compass rule or not
      * Compass rule need to be applied it will also create adjusted data.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _applyCompassRule: function (miscloseDetails) {
        var length, values, i, sumOfLat, sumOfDep, objectToAdjustLatDep,
          sumOfAdjustedLat, sumOfAdjustedDep;
        sumOfLat = 0;
        sumOfDep = 0;
        objectToAdjustLatDep = {};
        //Calculate Latitudes and Departures for each entry of boundary type
        for (i = 0; i < this._itemList.length; i++) {
          values = this._itemList[i];
          if (values.LineSymbol.type === this.config.BoundaryLineType) {
            if (values.Radius === "" || values.Radius === "0" || values.Radius === 0) {
              length = values.LengthConversions.meters;
            } else if (values.ChordLengthConversions) {
              length = values.ChordLengthConversions.meters;
            }
            length = Math.abs(length);
            values.lat = length * Math.cos(values.BearingConversions.naDD * (Math.PI / 180));
            values.dep = length * Math.sin(values.BearingConversions.naDD * (Math.PI / 180));
            sumOfLat += values.lat;
            sumOfDep += values.dep;
          }
        }
        //create object to get adjusted values
        objectToAdjustLatDep.sumOfLat = sumOfLat;
        objectToAdjustLatDep.sumOfDep = sumOfDep;
        objectToAdjustLatDep.sumOfAllLinesLength = miscloseDetails.compassCompleteLength;
        //get adjusted bearing and length for each entry of boundary type
        for (i = 0; i < this._itemList.length; i++) {
          values = this._itemList[i];
          if (values.Radius === "" || values.Radius === "0" || values.Radius === 0) {
            length = values.LengthConversions.meters;
          } else if (values.ChordLengthConversions) {
            length = values.ChordLengthConversions.meters;
          }
          length = Math.abs(length);
          if (values.LineSymbol.type === this.config.BoundaryLineType) {
            //get and store the adjusted bearing and distance
            values.adjustedValues = this._adjustBearingAndDistance(
              values.lat, values.dep, length, objectToAdjustLatDep);
          }
        }
        //Check the closure condition if sum of latitudes & departures is zero or not
        sumOfAdjustedLat = 0;
        sumOfAdjustedDep = 0;
        for (i = 0; i < this._itemList.length; i++) {
          values = this._itemList[i];
          if (values.LineSymbol.type === this.config.BoundaryLineType) {
            sumOfAdjustedLat += parseFloat(values.adjustedValues.lat.toFixed(2));
            sumOfAdjustedDep += parseFloat(values.adjustedValues.dep.toFixed(2));
            sumOfAdjustedLat = parseFloat(sumOfAdjustedLat.toFixed(2));
            sumOfAdjustedDep = parseFloat(sumOfAdjustedDep.toFixed(2));
          }
        }
        if (parseInt(sumOfAdjustedLat, 10) === 0 && parseInt(sumOfAdjustedDep, 10) === 0) {
          return true;
        }
        return false;
      },

      /**
      * Returns adjusted bearing and distance using compass rule adjustment
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _adjustBearingAndDistance: function (lat, dep, lineLength, info) {
        var adjustedValues, latCorrection, depCorrection, adjustedLat, adjustedDep, adjustedLength,
          adjustedBearing, conversions;
        adjustedValues = {};
        // fix the values to only 6 digits after decimal to avoid errors in case of exponential
        lat = parseFloat(lat.toFixed(6));
        dep = parseFloat(dep.toFixed(6));
        lineLength = parseFloat(lineLength.toFixed(6));

        //Calculate Latitudes and Departures correction
        latCorrection = ((-info.sumOfLat) / info.sumOfAllLinesLength) * lineLength;
        depCorrection = ((-info.sumOfDep) / info.sumOfAllLinesLength) * lineLength;

        latCorrection = parseFloat(latCorrection.toFixed(6));
        depCorrection = parseFloat(depCorrection.toFixed(6));

        //Adjust the Latitudes and Departures
        adjustedLat = lat + latCorrection;
        adjustedDep = dep + depCorrection;

        adjustedLat = parseFloat(adjustedLat.toFixed(6));
        adjustedDep = parseFloat(adjustedDep.toFixed(6));

        //Compute adjusted lengths and directions
        adjustedLength = Math.sqrt(Math.pow(adjustedLat, 2) + Math.pow(adjustedDep, 2));
        adjustedBearing = Math.atan(adjustedDep / adjustedLat);
        //to fix an issue where adjustedBearing may have exponential value
        adjustedBearing = parseFloat(adjustedBearing.toFixed(6));
        //set adjusted values in return object
        adjustedValues.lat = adjustedLat;
        adjustedValues.dep = adjustedDep;
        adjustedValues.adjustedLength = adjustedLength;
        adjustedValues.adjustedBearing = adjustedBearing * (180 / Math.PI);
        //if bearing is value is in south azimuth then keep the north azimuth converted value
        conversions = utils.categorizeBearingFormat(adjustedValues.adjustedBearing, {
          "directionOrAngleType": "southAzimuth", "directionOrAngleUnits": "decimalDegree"
        });
        adjustedValues.adjustedBearingNADD = conversions.naDD;
        return adjustedValues;
      },

      /**
      * Returns miscloseRatio for miscloseDistance
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _getMiscloseRatioInfo: function (miscloseDistance) {
        var boundaryPolyLine, compassCompleteLength = 0, miscloseRatio = 0, lowRatio, highRatio,
          miscloseValue;
        //set the constant values for high and low Ratio
        lowRatio = 10;
        highRatio = 100000;
        miscloseValue = 0;
        // calculate misclose ratio and accuracy
        if (this._arrayOfAllBoundaryLines && this._arrayOfAllBoundaryLines.length > 0) {
          //Create polyline for all boundary lines to get its complete length.
          boundaryPolyLine = geometryUtils.getPolyLineFromPaths(this._arrayOfAllBoundaryLines);
          //get length of boundary line in meters
          compassCompleteLength = geometryUtils.getLengthOfGeometry(boundaryPolyLine);
          //based on compassCompleteLength(boundary Lines complete length) calculate ratio
          if (compassCompleteLength > 0) {
            miscloseRatio = 1 / (miscloseDistance / compassCompleteLength);
            if (miscloseRatio < lowRatio) {
              miscloseRatio = 0;
            } else if (miscloseRatio < highRatio) {
              miscloseValue = parseInt(miscloseRatio, 10);
              miscloseRatio = "1:" + parseInt(miscloseRatio, 10);
            }
          }
        }
        return {
          "miscloseRatio": miscloseRatio,
          "miscloseValue": miscloseValue,
          "compassCompleteLength": compassCompleteLength
        };
      },

      /**
      * This function is used to get quadrant bearing angle from north azimuth angle
      * @memberOf widgets/ParcelDrafter/NewTraverse
      */
      getAngleFromDDTOQB: function (bearing) {
        var returnValue, planSettingsNADD, bearingData;
        //first get data according to north Azimuth DD
        planSettingsNADD = lang.clone(this._planSettings);
        planSettingsNADD.directionOrAngleType = "northAzimuth";
        planSettingsNADD.directionOrAngleUnits = "decimalDegree";
        bearingData = utils.categorizeBearingFormat(bearing, planSettingsNADD);
        if (bearingData) {
          if (this._planSettings.directionOrAngleUnits === "degreeMinuteSeconds") {
            returnValue = bearingData.qb3DMS;
          } else {
            returnValue = bearingData.qb3DD;
          }
        }
        return returnValue;
      },

      /**
      * This function is used to create object that is needed while displaying bearing in grid.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      initEditing: function (startPoint, featureSet, lineLayerSpatialReference) {
        var i, obj, lineSymbol, editBearingDataArr, units, planSettingsNADD, scale,
          rotation, statedArea;
        this._planInfoInstance.setParcelInformation(this.polygonDeleteArr);
        //set Rotation and scale
        rotation = this.polygonDeleteArr[0].attributes[this.config.polygonLayer.rotation.name];
        scale = this.polygonDeleteArr[0].attributes[this.config.polygonLayer.scale.name];
        if (!scale) {
          scale = 1;
        }
        statedArea = this.polygonDeleteArr[0].attributes[this.config.polygonLayer.statedArea.name];
        this._parcelToolInstance.setRotation(rotation);
        this._parcelToolInstance.setScale(scale);
        if (statedArea !== null && statedArea !== undefined) {
          this._misCloseDetailsInstance.traverseStatedArea.set("value", statedArea);
        }
        editBearingDataArr = [];
        //get units according to layers
        units = geometryUtils.getUnitValueForSR(lineLayerSpatialReference);
        //create plan settings according to north Azimuth DD
        planSettingsNADD = lang.clone(this._planSettings);
        planSettingsNADD.directionOrAngleType = "northAzimuth";
        planSettingsNADD.directionOrAngleUnits = "decimalDegree";
        for (i = 0; i < featureSet.features.length; i++) {
          obj = {};
          obj.Bearing = featureSet.features[i].attributes[this.config.polylineLayer.bearing.name];
          obj.BearingConversions = utils.categorizeBearingFormat(obj.Bearing, planSettingsNADD);
          //update bearing according to planSettings
          obj.Bearing = this._getBearingAccordingToPlanSettings(obj.BearingConversions, true);
          // check for distance
          obj.Length = featureSet.features[i].attributes[this.config.polylineLayer.distance.name];
          // consider distance if there is value in it
          if (obj.Length !== null && obj.Length !== "") {
            obj.LengthConversions = this._validateLength(obj.Length, units);
            //update length according to planSettings
            obj.Length = obj.LengthConversions[this._planSettings.distanceAndLengthUnits];
          }
          lineSymbol = this.getLineSymbolForType(
            featureSet.features[i].attributes[this.config.polylineLayer.lineType.name]);
          if (lineSymbol) {
            obj.LineSymbol = lineSymbol;
          }
          obj.Radius = featureSet.features[i].attributes[this.config.polylineLayer.radius.name];
          if (obj.Radius !== null && obj.Radius !== "") {
            obj.RadiusConversions = this._validateLength(obj.Radius, units);
            //update radius according to planSettings
            obj.Radius = obj.RadiusConversions[this._planSettings.distanceAndLengthUnits];
            // check for arc length
            obj.ArcLength =
              featureSet.features[i].attributes[this.config.polylineLayer.arcLength.name];
            // consider arc length if there is value in it
            if (obj.ArcLength !== null && obj.ArcLength !== "") {
              obj.ArcLengthConversions = this._validateLength(obj.ArcLength, units);
              //update arc length according to planSettings
              obj.ArcLength = obj.ArcLengthConversions[this._planSettings.distanceAndLengthUnits];
            }
            // check for chord length
            obj.ChordLength =
              featureSet.features[i].attributes[this.config.polylineLayer.chordLength.name];
            // consider chord length if there is value in it
            if (obj.ChordLength !== null && obj.ChordLength !== "") {
              obj.ChordLengthConversions = this._validateLength(obj.ChordLength, units);
              //update chord length according to planSettings
              obj.ChordLength =
                obj.ChordLengthConversions[this._planSettings.distanceAndLengthUnits];
            }
            //keep the length values according to planSettings, so that length will be used
            //for calculating arc and chord length, while updating values from grid
            if (this._planSettings.circularCurveParameters === "radiusAndArcLength") {
              obj.Length = obj.ArcLength;
              obj.LengthConversions = lang.clone(obj.ArcLengthConversions);
            } else {
              obj.Length = obj.ChordLength;
              obj.LengthConversions = lang.clone(obj.ChordLengthConversions);
            }
            //in case of straight lines radius will not be stored so clear it
          } else {
            obj.Radius = "";
            obj.RadiusConversions = null;
          }
          editBearingDataArr.push(obj);
        }
        this._itemList = editBearingDataArr;
        //regenerate the grid with new data
        this._reGenerateTraverseGrid();
        //to show the traverse tools
        this._showHideTraverseTools();
        //draw the parcel on map with new data
        this.setStartPoint(startPoint);
        //in case of edit always show the boundary line as default symbol
        this.setBoundaryLineSymbol();
      },

      /**
      * Set boundary line symbol in initial row symbol selector
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      setBoundaryLineSymbol: function () {
        if (this._symbolSelector) {
          array.some(this.config.lineTypes, lang.hitch(this, function (lineSymbol) {
            if (this.config.BoundaryLineType === lineSymbol.type) {
              this._symbolSelector.selectSymbol(lineSymbol);
              return false;
            }
          }));
        }
      },

      /**
      * This function is used to get line symbol based on its type.
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      getLineSymbolForType: function (lineType) {
        var selectedLineSymbol;
        array.some(this.config.lineTypes, lang.hitch(this, function (lineInfo) {
          if (lineInfo.type === lineType) {
            selectedLineSymbol = lang.clone(lineInfo);
            return true;
          }
        }));
        return selectedLineSymbol;
      },

      /**
      * Deactivates onScreen rotation and scale tools
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      deactivateParcelTools: function () {
        this._parcelToolInstance.disableRotating();
        this._parcelToolInstance.disableScaling();
      },

      /**
      * Clears all the traverse information and reset the objects
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      clearAll: function () {
        //clear all te graphic layers
        this.parcelLinesGraphicsLayer.clear();
        this.parcelPointsGraphicsLayer.clear();
        this.parcelPolygonGraphicsLayer.clear();
        //Reset entry row
        this._resetEntryRow();
        //clear dnd node
        this._dndContainer.clearItems();
        //empty traverseGrid container
        domConstruct.empty(this.traverseGrid);
        //empty item list
        this._itemList = [];
        //empty dnd node list
        this._nodes = [];
        //to hide the traverse tools
        this._showHideTraverseTools();
        //clear start point
        this.startPoint = null;
        //clear start point for next line
        this._startPointForNextLine = null;
        this._orgStartPointForNextLine = null;
        //reset the rotation angle and scale
        this._rotationAngle = 0;
        this._scaleValue = 1;
        //set default symbol in symbol selector
        this._symbolSelector.setDefault();
        //deactivate digitization tool
        domClass.remove(this.screenDigitizationNode, "esriCTEnableButton");
        //reset the rotation & scale values
        this._parcelToolInstance.resetTools();
        //deactivate parcel tools
        this.deactivateParcelTools();
        //clear misclose info
        this._misCloseDetailsInstance.setMiscloseDetails(null);
        //reset boundary lines array
        this._arrayOfAllBoundaryLines = [];
        // reset edited polygon data
        this.polygonDeleteArr = [];
        // reset edited polyline data
        this.polylineDeleteArr = [];
        //reset the scroll position to top
        this.domNode.scrollTop = 0;
        // reset parcel name, plan name, document type
        this._planInfoInstance.resetValues();
        // reset stated area
        this._misCloseDetailsInstance.traverseStatedArea.set("value", null);
        //hide popup dialog
        this.closePopup();
      },

      /**
      * show parcel info in popup
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _showParcelPopup: function (evt) {
        var defer, extentGeom, filteredGraphics = [];
        defer = new Deferred();
        //clears previous features of the infoWindow
        extentGeom = this._pointToExtent(evt.mapPoint, 8);
        filteredGraphics = array.filter(this.parcelLinesGraphicsLayer.graphics,
          function (graphic) {
            return extentGeom.intersects(graphic.geometry);
          });
        if (filteredGraphics[0]) {
          this._createPopupContent(evt, filteredGraphics[0]);
          //show parcel popup on map
          defer.resolve(true);
        } else {
          //hide popup dialog
          this.closePopup();
          defer.resolve(false);
        }
        return defer;
      },

      /**
       * Gets the abbreviated variant of a unit.
       * @parameter {string} unit Unit to look up; must be one of the
       *       units in jimu.units
       * @return {string} window.jimuNls.units[units + "Abbr"]
       * @memberOf widgets/ParcelDrafter/NewTraverse
       */
      _getAbbreviatedUnits: function (units) {
        return window.jimuNls.units[units + "Abbr"];
      },

      /**
      * get extent from the point geometry
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _pointToExtent: function (point, toleranceInPixel) {
        var pixelWidth, toleranceInMapCoords;
        //calculate map coords represented per pixel
        pixelWidth = this.map.extent.getWidth() / this.map.width;
        //calculate map coords for tolerance in pixel
        toleranceInMapCoords = toleranceInPixel * pixelWidth;
        //calculate & return computed extent
        return new Extent(point.x - toleranceInMapCoords,
          point.y - toleranceInMapCoords,
          point.x + toleranceInMapCoords,
          point.y + toleranceInMapCoords,
          this.map.spatialReference);
      },

      /**
      * Create popup content for selected parcel graphic
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _createPopupContent: function (evt, graphic) {
        var parcelPopupContent, labelContainer, parcelInfoFieldRow, radius, length,
          radiusConversions, values, popupWidth;
        //get selected parcels info
        values = this._itemList[graphic.attributes.rowIndex];
        if (values) {
          parcelPopupContent = domConstruct.create("div", {
            "class": "esriCTParcelInfoPopup " + this.baseClass
          }, null);
          //create label row
          labelContainer = domConstruct.create("div", {
            "class": "esriCTLabelRows"
          }, parcelPopupContent);
          this._createFieldLabels(labelContainer, this.nls.traverseSettings.bearingLabel);
          this._createFieldLabels(labelContainer, this.nls.traverseSettings.lengthLabel);
          this._createFieldLabels(labelContainer, this.nls.traverseSettings.radiusLabel);
          //create input field rows
          parcelInfoFieldRow = domConstruct.create("div", {
            "class": "esriCTRowContainer esriCTRow",
            "rowIndex": graphic.attributes.rowIndex
          }, parcelPopupContent);

          this._createFieldInputs(parcelInfoFieldRow,
            this._getBearingAccordingToPlanSettings(values.BearingConversions),
            "esriCTBearingRow", true);
          //If user is drawing arcs, values will have valid radiusConversions
          radiusConversions = values.RadiusConversions;
          if (radiusConversions) {
            //get radius according to plan settings
            radius = this._getRoundedValue(values.RadiusConversions, "Radius");
            //According to plan settings show arcLength/chordLength in length textbox
            if (this._planSettings.circularCurveParameters === "radiusAndArcLength") {
              length = this._getRoundedValue(values.ArcLengthConversions, "Length");
            } else {
              length = this._getRoundedValue(values.ChordLengthConversions, "Length");
            }
          } else {
            radius = "";
            length = this._getRoundedValue(values.LengthConversions, "Length");
          }
          this._createFieldInputs(parcelInfoFieldRow, length, "esriCTLengthRow", true);
          this._createFieldInputs(parcelInfoFieldRow, radius, "esriCTRadiusRow", true);
          //set the width of the popup according to the width of widget panel so that,
          //textbox in popup will match their width with textBoxes in widget panel.
          if (domGeom.position(this.traverseEntryNode) &&
            domGeom.position(this.traverseEntryNode).w) {
            popupWidth = domGeom.position(this.traverseEntryNode).w - 42;
            domStyle.set(this._popupDialog.domNode, "width",
              popupWidth + "px");
          }
          this._popupDialog.setContent(parcelPopupContent);
          this._popupCoords = {
            pageX: evt.pageX,
            pageY: evt.pageY
          };
          this._openPopup(evt);
        }
      },

      /**
      * open popup to allow parcel editing from map
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _openPopup: function (evt) {
        //show content in tooltip dialog
        domStyle.set(this._popupDialog.domNode, "opacity", 0.9);
        dijitPopup.open({
          popup: this._popupDialog,
          x: evt.pageX,
          y: evt.pageY
        });
      },

      /**
      * get extent from the point geometry
      * Hide popup dialog
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      closePopup: function () {
        if (this._popupDialog) {
          dijitPopup.close(this._popupDialog);
        }
      },

      /**
      * Create field labels in parcel popup
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _createFieldLabels: function (labelContainer, title) {
        domConstruct.create("div", {
          "innerHTML": title,
          "title": title,
          "class": "esriCTParcelInfoLabels"
        }, labelContainer);
      },

      /**
      * Create tooltip dialog to edit parcel from map
      * @memberOf widgets/ParcelDrafter/NewTraverse
      **/
      _createTooltip: function () {
        this._popupDialog = new TooltipDialog({
          "class": "esriCTEditParcelDialog"
        });
        this._popupDialog.startup();
      },

      validateNumericField: function (inputValue, inputType) {
        var isValid, typeCastedInputValue, floatVal = /^[-+]?[0-9]+\.[0-9]+$/,
          decimal = /^[-+]?[0-9]+$/;
        // trim current value
        inputValue = lang.trim(inputValue);
        // Set validation on the field by their types
        switch (inputType) {
          case "esriFieldTypeSmallInteger":
            typeCastedInputValue = parseInt(inputValue, 10);
            if ((inputValue.match(decimal) && typeCastedInputValue >= -32768 &&
              typeCastedInputValue <= 32767) && inputValue.length !== 0) {
              isValid = true;
            } else {
              isValid = false;
            }
            break;
          case "esriFieldTypeInteger":
            typeCastedInputValue = parseInt(inputValue, 10);
            if ((inputValue.match(decimal) && typeCastedInputValue >= -2147483648 &&
              typeCastedInputValue <= 2147483647) && inputValue.length !== 0) {
              isValid = true;
            } else {
              isValid = false;
            }
            break;
          case "esriFieldTypeSingle":
            // zero or more occurrence of (+-) at the start of expression
            // at least one occurrence of digits between o-9
            // occurrence of .
            // at least one occurrence of digits between o-9 in the end
            typeCastedInputValue = parseFloat(inputValue);
            if (((inputValue.match(decimal) || inputValue.match(floatVal)) &&
              typeCastedInputValue >= -3.4 * Math.pow(10, 38) &&
              typeCastedInputValue <= 1.2 * Math.pow(10, 38)) && inputValue.length !== 0) {
              isValid = true;
            } else {
              isValid = false;
            }
            break;
          case "esriFieldTypeDouble":
            typeCastedInputValue = parseFloat(inputValue);
            if (((inputValue.match(decimal) || inputValue.match(floatVal)) &&
              typeCastedInputValue >= -2.2 * Math.pow(10, 308) &&
              typeCastedInputValue <= 1.8 * Math.pow(10, 38)) && inputValue.length !== 0) {
              isValid = true;
            } else {
              isValid = false;
            }
            break;
        }
        return isValid;
      }
    });
  });

