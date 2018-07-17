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
  'dojo/text!./PlanInfo.html',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/Evented',
  'dojo/dom-class',
  'dijit/form/ValidationTextBox',
  'dojo/store/Memory',
  'dijit/form/ComboBox',
  'dojo/on',
  'esri/geometry/Polyline',
  'esri/graphic',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'jimu/dijit/Message',
  './geometryUtils'
],
  function (
    declare,
    BaseWidget,
    _WidgetsInTemplateMixin,
    PlanInfoTemplate,
    lang,
    array,
    Evented,
    domClass,
    ValidationTextBox,
    Memory,
    ComboBox,
    on,
    Polyline,
    Graphic,
    Query,
    QueryTask,
    Message,
    geometryUtils
  ) {
    return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'jimu-widget-ParcelDrafter-PlanInfo',
      templateString: PlanInfoTemplate,
      _itemList: null, // to store parcel lines
      _polygonLayer: null, // to store parcel polygon layer
      parcelNameTextBox: null, // to store parcel name textbox
      planNameTextBox: null, // to store plan name textbox
      documentTypeControl: null, // to store document type dropdown
      planSettings: null, // to store plan settings
      _savedPolygonObjectId: null, //to store object id of the saved polygon

      constructor: function (options) {
        lang.mixin(this, options);
      },

      postCreate: function () {
        this.inherited(arguments);
        domClass.add(this.domNode, "esriCTFullWidth");
        //if valid documentType field is configured then only create node for it
        if (this.config.polygonLayer.documentType.hasOwnProperty('name')) {
          //remove the class so that it will be visible now
          domClass.remove(this.documentTypeRow, "esriCTHidden");
          this._createDocumentTypeControl();
        }
        if (this.config.polygonLayer.parcelName.hasOwnProperty('name')) {
          domClass.remove(this.parcelNameRow, "esriCTHidden");
          this.parcelNameTextBox = this._createFieldInputs(
            this.config.polygonLayer.parcelName,
            this.parcelName,
            this.nls.planInfo.parcelNamePlaceholderText,
            !this.config.polygonLayer.parcelName.nullable);
        }
        if (this.config.polygonLayer.planName.hasOwnProperty('name')) {
          domClass.remove(this.planNameRow, "esriCTHidden");
          this.planNameTextBox = this._createFieldInputs(
            this.config.polygonLayer.planName,
            this.planName,
            this.nls.planInfo.planNamePlaceholderText,
            !this.config.polygonLayer.planName.nullable);
        }
        //Handle click event of cancel button
        this.own(on(this.planInfoCancelButton, "click",
          lang.hitch(this, function () {
            this.emit("cancelTraversedParcel");
          })));
        // Handle click event of save button
        this.own(on(this.planInfoSaveButton, "click",
          lang.hitch(this, function () {
            this.emit("saveTraversedParcel");
          })));
      },

      /**
      * Reset the values in ParcelName, PlanName & DocumentType control
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      resetValues: function () {
        // reset parcel name
        if (this.parcelNameTextBox) {
          this.parcelNameTextBox.set("value", "");
        }
        // reset plan name
        if (this.planNameTextBox) {
          this.planNameTextBox.set("value", "");
        }
        // reset document type
        if (this.documentTypeControl) {
          //if it has domain reset combobox else empty text in textbox
          if (this.config.polygonLayer.documentType.domain) {
            this.documentTypeControl.set("item", null);
          } else {
            this.documentTypeControl.set('value', "");
          }
        }
      },

      /**
      * Emit the showMessage event
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _showMessage: function (msg) {
        this.emit("showMessage", msg);
      },

      /**
      * Creates Combobox/Textbox based on if field has domain
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _createDocumentTypeControl: function () {
        //if it has domain show combobox else create textbox
        if (this.config.polygonLayer.documentType.domain) {
          this.documentTypeControl = this._createFieldSelect(
            this.documentType,
            this.nls.planInfo.parcelDocumentTypeText,
            !this.config.polygonLayer.documentType.nullable);
          // to validate whether value searched by user in document type dropdown is valid or not.
          this.own(on(this.documentTypeControl, "change",
            lang.hitch(this, function (newValue) {
              if (newValue !== "" && newValue !== null && newValue !== undefined) {
                var foundValue;
                foundValue = this.documentTypeControl.store.data.some(function (dataObject) {
                  return dataObject.name === newValue;
                });
                if (!foundValue) {
                  this.documentTypeControl.set("item", null);
                  this._showMessage(this.nls.planInfo.enterValidDocumentTypeMessage);
                }
              }
            })));
        } else {
          this.documentTypeControl = this._createFieldInputs(
            this.config.polygonLayer.documentType,
            this.documentType,
            this.nls.planInfo.parcelDocumentTypeText,
            !this.config.polygonLayer.documentType.nullable);
        }
      },
      /**
      * Creates input fields
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _createFieldInputs: function (field, nodeContainer, placeHolderText, isRequired) {
        if (isRequired) {
          placeHolderText = placeHolderText + " " + this.nls.planInfo.requiredText;
        } else {
          placeHolderText = placeHolderText + " " + this.nls.planInfo.optionalText;
        }
        var inputTextBox = new ValidationTextBox({
          placeHolder: placeHolderText,
          "class": "esriCTFullWidth",
          required: isRequired
        });
        //if selected field is numeric set the validator to accept numbers only
        if (this.numberFieldTypes.indexOf(field.type) >= 0) {
          inputTextBox.validator = lang.hitch(this, function (value) {
            if (value !== "" &&
              !this.validateNumericField(value, field.type)) {
              return false;
            }
            return true;
          });
        }
        inputTextBox.placeAt(nodeContainer);
        return inputTextBox;
      },

      /**
      * Creates combobox fields for document type
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _createFieldSelect: function (nodeContainer, placeHolderText, isRequired) {
        var docTypeDataArr, documentTypeStore;
        docTypeDataArr = this._createDocTypeDataArr();
        documentTypeStore = new Memory({ data: docTypeDataArr });
        if (isRequired) {
          placeHolderText = placeHolderText + " " + this.nls.planInfo.requiredText;
        } else {
          placeHolderText = placeHolderText + " " + this.nls.planInfo.optionalText;
        }
        this.selectBox = new ComboBox({
          placeHolder: placeHolderText,
          "class": "esriCTFullWidth",
          required: isRequired,
          store: documentTypeStore
        }, nodeContainer);
        return this.selectBox;
      },

      /**
      * create data-array for combobox
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _createDocTypeDataArr: function () {
        var options = [];
        if (this.config.polygonLayer.documentType.domain.codedValues) {
          array.forEach(this.config.polygonLayer.documentType.domain.codedValues,
            lang.hitch(this, function (domainValue) {
              options.push({ name: domainValue.name, id: domainValue.code });
            }));
        }
        return options;
      },

      /**
      * This function is used to save parcel polygon, polyline.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      saveData: function (dataObj) {
        //check if parcel is closed or not,
        //if it is not closed confirm if still user wants to save the parcel.
        if (dataObj.miscloseDetails &&
          (dataObj.miscloseDetails.LengthConversions.meters === 0 || dataObj.appliedCompassRule)) {
          this._saveParcel(dataObj);
        } else {
          var confirmationBox;
          confirmationBox = new Message({
            message: this.nls.planInfo.saveNonClosedParcelConfirmationMessage,
            type: "question",
            buttons: [{
              "label": this.nls.common.yes,
              "onClick": lang.hitch(this, function () {
                confirmationBox.close();
                this._saveParcel(dataObj);
              })
            }, { "label": this.nls.common.no }]
          });
        }
      },

      /**
      * This function is used to save polygon parcel.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _saveParcel: function (dataObj) {
        this._itemList = dataObj.itemList;
        this.planSettings = dataObj.planSettings;
        //if parcel is closed then save the polygon and poly-lines
        //else only save poly-lines
        if (dataObj.miscloseDetails &&
          (dataObj.miscloseDetails.LengthConversions.meters === 0 || dataObj.appliedCompassRule)) {
          if (dataObj.polygonDeleteArr.length === 0) {
            this._createPolygonData(dataObj);
          } else {
            this._deletePolygonBeforeSaving(dataObj);
          }
        } else {
          // Suppose, If user has edited closed parcel & then modified it to open parcel & then
          // tried to save it. In this, first delete that closed parcel & then just save the lines
          // of open parcel.
          if (dataObj.polygonDeleteArr.length > 0) {
            this._deletePolygonBeforeSaving(dataObj);
          } else {
            this._createPolylineData(null);
          }
        }
      },

      /**
      * This function is used to create polygon geometry according to boundary lines.
      * it will also save graphic on graphicLayer and return the graphic geometry.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _createParcelPolygon: function () {
        var i, j, boundaryLinesArray, lineFeatures, parcelPolygon, polygonGraphic;
        boundaryLinesArray = [];
        lineFeatures = this.parcelLinesGraphicsLayer.graphics;
        //loop through all the line features and only consider boundary lines for creating polygon
        for (i = 0; i < lineFeatures.length; i++) {
          //Add if it is boundary lines in array
          if (this._itemList[i].LineSymbol.type === this.config.BoundaryLineType) {
            for (j = 0; j < lineFeatures[i].geometry.paths.length; j++) {
              boundaryLinesArray.push(lineFeatures[i].geometry.paths[j]);
            }
          }
        }
        //create polygon geometry and add it to the graphic layer
        if (boundaryLinesArray.length > 0) {
          //create the parcel polygon with the lines spatialReference
          parcelPolygon = geometryUtils.getPolygonFromPolyLines(
            boundaryLinesArray, false, true, lineFeatures[0].geometry.spatialReference);
          if (parcelPolygon) {
            this.parcelPolygonGraphicsLayer.clear();
            polygonGraphic = new Graphic(parcelPolygon);
            this.parcelPolygonGraphicsLayer.add(polygonGraphic);
            parcelPolygon = this.parcelPolygonGraphicsLayer.graphics[0].geometry;
          }
        }
        return parcelPolygon;
      },

      /**
      * This function is used to create polygon & modify its data before saving.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _createPolygonData: function (dataObj) {
        var addsFeatureArr, attributes, polygon, selectedDocumentType, polygonGraphic, units;
        if (dataObj.miscloseDetails &&
          (dataObj.miscloseDetails.LengthConversions.meters === 0 || dataObj.appliedCompassRule)) {
          this.loading.show();
          addsFeatureArr = [];
          attributes = {};
          units = this.polygonLayerUnit;
          //get selected document type from dropdown
          selectedDocumentType = null;
          if (this.documentTypeControl) {
            if (this.config.polygonLayer.documentType.domain) {
              if (this.documentTypeControl.hasOwnProperty("item") &&
                this.documentTypeControl.item &&
                this.documentTypeControl.item.hasOwnProperty("id")) {
                selectedDocumentType = this.documentTypeControl.item.id;
              }
            } else if (this.documentTypeControl.get('value') !== "") {
              selectedDocumentType = this.documentTypeControl.get('value');
            }
          }
          //get the parcel polygon from boundary lines
          polygon = this._createParcelPolygon();
          if (polygon) {
            //add required parameters of the polygon
            attributes[this.config.polygonLayer.rotation.name] = dataObj.rotation;
            attributes[this.config.polygonLayer.scale.name] = dataObj.scale;
            attributes[this.config.polygonLayer.miscloseRatio.name] =
              dataObj.miscloseDetails.miscloseValue;
            attributes[this.config.polygonLayer.miscloseDistance.name] =
              this._getValueAccToFeatureLayerUnit(
                units, dataObj.miscloseDetails, "LengthConversions");
            //Add optional parameters of polygon if they are configured
            if (this.config.polygonLayer.statedArea.hasOwnProperty('name')) {
              attributes[this.config.polygonLayer.statedArea.name] = dataObj.statedArea;
            }
            if (this.parcelNameTextBox) {
              attributes[this.config.polygonLayer.parcelName.name] =
                this.parcelNameTextBox.get("value");
            }
            if (this.planNameTextBox) {
              attributes[this.config.polygonLayer.planName.name] =
                this.planNameTextBox.get("value");
            }
            if (this.documentTypeControl) {
              attributes[this.config.polygonLayer.documentType.name] = selectedDocumentType;
            }
            //create polygon graphic and save parcel polygon
            polygonGraphic = new Graphic(polygon, null, attributes);
            addsFeatureArr.push(polygonGraphic);
            this._saveParcelPolygon(addsFeatureArr);
          } else {
            this._showMessage(this.nls.planInfo.unableToCreatePolygonParcel);
          }
        } else {
          this._createPolylineData(null);
        }
      },

      /**
      * This function is used to set parcel information like
      * ParcelName, PlanName, DocumentType while editing traverse.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      setParcelInformation: function (polygon) {
        var documentTypeValue;
        if (this.parcelNameTextBox) {
          this.parcelNameTextBox.set("value",
            polygon[0].attributes[this.config.polygonLayer.parcelName.name]);
        }
        if (this.planNameTextBox) {
          this.planNameTextBox.set("value",
            polygon[0].attributes[this.config.polygonLayer.planName.name]);
        }
        if (this.documentTypeControl) {
          documentTypeValue = polygon[0].attributes[this.config.polygonLayer.documentType.name];
          if (documentTypeValue !== null &&
            documentTypeValue !== "" && documentTypeValue !== undefined) {
            if (this.config.polygonLayer.documentType.domain) {
              this.documentTypeControl.set("item",
                this.documentTypeControl.store.get(documentTypeValue));
            } else {
              this.documentTypeControl.set('value', documentTypeValue);
            }
          }
        }
      },

      /**
      * Deletes saved polygon from the layer
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _rollbackSavedPolygon: function () {
        var polygonLayer, deletePolygon;
        deletePolygon = { "attributes": {} };
        polygonLayer = this.map.getLayer(this.config.polygonLayer.id);
        if (polygonLayer && this._savedPolygonObjectId !== null) {
          deletePolygon.attributes[polygonLayer.objectIdField] = this._savedPolygonObjectId;
          polygonLayer.applyEdits(null, null, [deletePolygon]);
        }
      },

      /**
      * Deletes saved polyline form the layer
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _rollbackSavedPolyLines: function (savedFeatures) {
        var polyLineLayer, deletePolyLineArray, deletePolyLine;
        deletePolyLineArray = [];
        polyLineLayer = this.map.getLayer(this.config.polylineLayer.id);
        array.forEach(savedFeatures, lang.hitch(this, function (feature) {
          deletePolyLine = { "attributes": {} };
          deletePolyLine.attributes[polyLineLayer.objectIdField] = feature.objectId;
          deletePolyLineArray.push(deletePolyLine);
        }));
        if (polyLineLayer && deletePolyLineArray.length > 0) {
          polyLineLayer.applyEdits(null, null, deletePolyLineArray);
        }
      },

      /**
      * This function is used to delete polygon before saving
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _deletePolygonBeforeSaving: function (dataObj) {
        this._polygonLayer = this.map.getLayer(this.config.polygonLayer.id);
        if (this._polygonLayer) {
          this._polygonLayer.applyEdits(null, null, dataObj.polygonDeleteArr,
            lang.hitch(this, function () {
              this._deleteLinesBeforeSaving(dataObj);
            }), lang.hitch(this, function () {
              this._showMessage(this.nls.planInfo.unableToSavePolygonParcel);
            }));
        } else {
          this._showMessage(this.nls.planInfo.unableToSavePolygonParcel);
        }
      },

      /**
      * This function is used to delete lines before saving
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _deleteLinesBeforeSaving: function (dataObj) {
        var polylineLayer;
        polylineLayer = this.map.getLayer(this.config.polylineLayer.id);
        if (polylineLayer) {
          polylineLayer.applyEdits(null, null, dataObj.polylineDeleteArr,
            lang.hitch(this, function () {
              this._createPolygonData(dataObj);
            }), lang.hitch(this, function () {
              this._showMessage(this.nls.planInfo.unableToUpdateParcelLines);
            }));
        } else {
          this._showMessage(this.nls.planInfo.unableToUpdateParcelLines);
        }
      },

      /**
      * This function is used to save parcel polygon.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _saveParcelPolygon: function (addsFeatureArr) {
        this._polygonLayer = this.map.getLayer(this.config.polygonLayer.id);
        if (this._polygonLayer) {
          //clear previously saved polygon objectId
          this._savedPolygonObjectId = null;
          this._polygonLayer.applyEdits(addsFeatureArr, null, null,
            lang.hitch(this, function (adds) {
              var query;
              if (adds && adds.length > 0 && adds[0].success) {
                //store the saved polygon id, it will be used for rollback
                this._savedPolygonObjectId = adds[0].objectId;
                this._polygonLayer.refresh();
                query = new Query();
                query.objectIds = [this._savedPolygonObjectId];
                query.returnGeometry = false;
                query.outFields = [this.config.polygonLayer.relatedGUID.name];
                //query to get GlobalID of saved polygon
                var queryTask = new QueryTask(this._polygonLayer.url);
                queryTask.execute(query, lang.hitch(this, function (result) {
                  this.loading.hide();
                  this._createPolylineData(
                    result.features[0].attributes[this.config.polygonLayer.relatedGUID.name]);
                }), lang.hitch(this, function () {
                  this.loading.hide();
                  this._showMessage(this.nls.planInfo.unableToSaveParcelLines);
                }));
              } else {
                this.loading.hide();
                this._showMessage(this.nls.planInfo.unableToSavePolygonParcel);
              }
            }), lang.hitch(this, function () {
              this.loading.hide();
              this._showMessage(this.nls.planInfo.unableToSavePolygonParcel);
            }));
        } else {
          this.loading.hide();
          this._showMessage(this.nls.planInfo.unableToSavePolygonParcel);
        }
      },

      /**
      * This function is used to get value of distance, length accordingly to feature layer unit
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _getValueAccToFeatureLayerUnit: function (units, values, valueAttribute) {
        if (values.hasOwnProperty(valueAttribute) && values[valueAttribute]) {
          switch (units) {
            case "meters":
            case "degrees":
              return values[valueAttribute].meters;
            case "feet":
              return values[valueAttribute].feet;
            case "uSSurveyFeet":
              return values[valueAttribute].uSSurveyFeet;
            default:
              return null;
          }
        } else {
          return null;
        }
      },

      /**
      * This function is used to create polyline & modify its data before saving.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _createPolylineData: function (guid) {
        var attributes, values, units, addsFeatureArr, polyline, polylineGraphic,
          polylineJSON, features, itemList, chordLengthValue;
        this.loading.show();
        features = this.parcelLinesGraphicsLayer.graphics;
        units = this.polylineLayerUnit;
        itemList = this._itemList;
        addsFeatureArr = [];
        for (var i = 0; i < features.length; i++) {
          attributes = {};
          values = itemList[i];
          // save bearing in decimal degree
          attributes[this.config.polylineLayer.bearing.name] = values.BearingConversions.naDD;
          // store distance in layers unit
          attributes[this.config.polylineLayer.distance.name] =
            this._getValueAccToFeatureLayerUnit(units, values, "LengthConversions");
          // save the lineType as drawn by user
          attributes[this.config.polylineLayer.lineType.name] =
            values.LineSymbol.type;
          // store radius in layers unit
          attributes[this.config.polylineLayer.radius.name] =
            this._getValueAccToFeatureLayerUnit(units, values, "RadiusConversions");
          // store arcLength & chordLength
          if (attributes[this.config.polylineLayer.radius.name] !== null &&
            attributes[this.config.polylineLayer.radius.name] !== "" &&
            attributes[this.config.polylineLayer.radius.name] !== undefined) {
            // store arc length in layers unit
            attributes[this.config.polylineLayer.arcLength.name] =
              this._getValueAccToFeatureLayerUnit(units, values, "ArcLengthConversions");
            // store chord length according to layers unit in both the distance & chordLength field
            chordLengthValue = this._getValueAccToFeatureLayerUnit(units, values,
              "ChordLengthConversions");
            attributes[this.config.polylineLayer.chordLength.name] = chordLengthValue;
            attributes[this.config.polylineLayer.distance.name] = chordLengthValue;
          } else {
            attributes[this.config.polylineLayer.arcLength.name] = null;
            attributes[this.config.polylineLayer.chordLength.name] = null;
          }
          attributes[this.config.polylineLayer.relatedGUID.name] = guid;
          // sequence of line
          attributes[this.config.polylineLayer.sequenceId.name] = i;
          // create polyline
          polylineJSON = features[i].geometry.toJson();
          polyline = new Polyline(polylineJSON);
          polylineGraphic = new Graphic(polyline, null, attributes, null);
          addsFeatureArr.push(polylineGraphic);
        }
        this._saveParcelLines(addsFeatureArr);
      },

      /**
      * This function is used to save parcel lines,
      * also if some the lines failed to save rollback the saved polygon.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _saveParcelLines: function (addsFeatureArr) {
        var polylineLayer;
        polylineLayer = this.map.getLayer(this.config.polylineLayer.id);
        if (polylineLayer) {
          polylineLayer.applyEdits(addsFeatureArr, null, null,
            lang.hitch(this, function (addResult) {
              var failedFeatures = [], savedFeatures = [];
              //create the array of saved and failed polyLines
              array.forEach(addResult, function (result) {
                if (result.success) {
                  savedFeatures.push(result);
                } else {
                  failedFeatures.push(result);
                }
              });
              //if failed to save one or more polyline features delete the saved polygon
              if (failedFeatures.length > 0) {
                this._rollbackSavedPolygon();
                //if some of the polyLines are saved delete the saved polyLines
                if (savedFeatures.length > 0 && failedFeatures.length !== addsFeatureArr.length) {
                  this._rollbackSavedPolyLines(savedFeatures);
                }
                this._showMessage(this.nls.planInfo.unableToSaveParcelLines);
              } else {
                this._showMessage(this.nls.planInfo.parcelSavedSuccessMessage);
                this._savedPolygonObjectId = null;
                this.emit("displayMainPageAfterSave");
              }
              this.loading.hide();
            }), lang.hitch(this, function () {
              this._rollbackSavedPolygon();
              this.loading.hide();
              this._showMessage(this.nls.planInfo.unableToSaveParcelLines);
            }));
        } else {
          this._rollbackSavedPolygon();
          this.loading.hide();
          this._showMessage(this.nls.planInfo.unableToSaveParcelLines);
        }
      },

      /**
      * This function is used to validate parcel details before saving
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      validateParcelDetails: function (statedArea) {
        var dataObj = {};
        if (this.parcelNameTextBox && !this.parcelNameTextBox.isValid()) {
          dataObj.status = false;
          dataObj.message = this.nls.planInfo.enterValidParcelNameMessage;
          return dataObj;
        }
        if (this.planNameTextBox && !this.planNameTextBox.isValid()) {
          dataObj.status = false;
          dataObj.message = this.nls.planInfo.enterValidPlanNameMessage;
          return dataObj;
        }
        if (this.documentTypeControl && !this.documentTypeControl.isValid()) {
          dataObj.status = false;
          dataObj.message = this.nls.planInfo.enterValidDocumentTypeMessage;
          return dataObj;
        }
        //if stated area field is configured
        if (this.config.polygonLayer.statedArea &&
          this.config.polygonLayer.statedArea.hasOwnProperty('name')) {
          //if stated area field is not nullable it should not have null or empty value
          if (!this.config.polygonLayer.statedArea.nullable) {
            if (statedArea === null || statedArea === "") {
              dataObj.status = false;
              dataObj.message = this.nls.planInfo.enterValidStatedAreaNameMessage;
              return dataObj;
            }
          }
          //if statedArea is entered and configured field is numeric then,
          // it should have only numeric value
          if (statedArea !== null && statedArea !== "") {
            if (this.numberFieldTypes.indexOf(this.config.polygonLayer.statedArea.type) > -1) {
              if (!this.validateNumericField(statedArea,
                this.config.polygonLayer.statedArea.type)) {
                dataObj.status = false;
                dataObj.message = this.nls.planInfo.enterValidStatedAreaNameMessage;
                return dataObj;
              }
            }
          }
        }
        dataObj.status = true;
        return dataObj;
      }
    });
  });