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
  'dojo/Evented',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./SymbologySettings.html',
  'jimu/dijit/SimpleTable',
  'dojo/on',
  'dojo/dom-construct',
  'dojo/_base/lang',
  'dojo/string',
  'dojo/_base/array',
  'dojo/query',
  'dijit/form/Select',
  'dijit/form/ValidationTextBox',
  'dijit/form/NumberTextBox',
  'dojo/store/Memory',
  './SymbolChooserPopup',
  'jimu/symbolUtils',
  'esri/symbols/jsonUtils',
  "jimu/dijit/Message",
  "jimu/LayerInfos/LayerInfos",
  "dojo/promise/all",
  "jimu/dijit/LoadingIndicator"
], function (
  declare,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  SimpleTable,
  on,
  domConstruct,
  lang,
  string,
  array,
  query,
  Select,
  ValidationTextBox,
  NumberTextBox,
  Memory,
  SymbolChooserPopup,
  symbolUtils,
  jsonUtils,
  Message,
  LayerInfos,
  all,
  LoadingIndicator
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    baseClass: 'jimu-widget-nearme-setting-symbology',

    _layerNameStore: null, // layer name store
    _layerFieldStore: {}, // layer field store
    _layerValuedStore: null, // layer value store
    _layerDetails: {},
    _layerInfosObj: null,

    constructor: function (options) {
      lang.mixin(this, options);
    },

    postMixInProperties: function () {
      this.nls.common = {};
      lang.mixin(this.nls.common, window.jimuNls.common);
    },

    postCreate: function () {
      this._layerNameStore = null; // layer name store
      this._layerFieldStore = {}; // layer field store
      this._layerValuedStore = null; // layer value store
      this._layerDetails = {};
      this.inherited(arguments);
      this._initLoading();// create loading indicator
      this._createSymbologyTable();
      this.own(on(this.btnAddSymbolsNode, 'click', lang.hitch(this, this._addSymbolBtnClicked)));
      //load layer infos object
      LayerInfos.getInstance(this.map, this.map.webMapResponse.itemInfo).then(
        lang.hitch(this, function (layerInfosObj) {
          this._layerInfosObj = layerInfosObj;
          this._loading.show();
          //loads info for all layers and sub layers as we need fields from layer info
          var layerInfos = [], layerDefs = [];
          layerInfos = layerInfosObj.getLayerInfoArray();
          layerInfos = layerInfos.concat(layerInfosObj.getTableInfoArray());
          array.forEach(layerInfos, lang.hitch(this, function (layerInfo) {
            layerDefs.push(layerInfo.getLayerObject());
            var subLayerInfos = [];
            subLayerInfos = layerInfo.getSubLayers();
            if (subLayerInfos && subLayerInfos.length > 0) {
              array.forEach(subLayerInfos, lang.hitch(this, function (subLayerInfo) {
                layerDefs.push(subLayerInfo.getLayerObject());
              }));
            }
          }));
          //once all layers info is available load UI according to config
          all(layerDefs).then(lang.hitch(this, function () {
            //load configured symbols
            if (this.config.attributeSymbology &&
              Object.keys(this.config.attributeSymbology).length > 0) {
              for (var layerId in this.config.attributeSymbology) {
                this._populateTableRows(this.config.attributeSymbology[layerId], layerId);
              }
            } else if (!this._layerNameStore) {
              this._createLayerNameStore();
            }
            this._loading.hide();
          }), lang.hitch(this, function () {
            this._loading.hide();
          }));
        }));
    },

    /**
     * This function create error alert.
     * @param {string} err - Error message to be shown
     * @memberOf widgets/NearMe/setting/symbologySetting
     **/
    _errorMessage: function (err) {
      var errorMessage = new Message({
        message: err
      });
      errorMessage.message = err;
    },

    /**
    * This function used for loading indicator
    * @memberOf widgets/NearMe/setting/symbologySetting
    */
    _initLoading: function () {
      var popupContainer;
      this._loading = new LoadingIndicator({
        hidden: true
      });
      popupContainer = query(".widget-setting-popup")[0];
      this._loading.placeAt(popupContainer);
      this._loading.startup();
    },

    /**
     * This function is used to populate symbols for each configured layer
     * @memberOf widgets/NearMe/setting/SymbologySettings
     */
    _populateTableRows: function (currentRowValues, layerId) {
      array.forEach(currentRowValues, lang.hitch(this, function (currentRow) {
        currentRow.layerId = layerId;
        this._addLayerRow(currentRow);
      }));
    },

    /**
     * This function is used to create table for adding new symbology
     * @memberOf widgets/NearMe/setting/SymbologySettings
     */
    _createSymbologyTable: function () {
      var args, fields;
      fields = [{
        name: 'field',
        title: this.nls.symbologySetting.layerNameTitle,
        type: 'empty',
        editable: false,
        width: '30%'
      }, {
        name: 'field1',
        title: this.nls.symbologySetting.fieldTitle,
        type: 'empty',
        editable: true,
        width: '25%'
      }, {
        name: 'field2',
        title: this.nls.symbologySetting.valuesTitle,
        type: 'empty',
        editable: false,
        width: '20%'
      }, {
        name: 'field3',
        title: this.nls.symbologySetting.symbolTitle,
        type: 'empty',
        editable: false,
        width: '15%'
      }, {
        name: 'actions',
        title: this.nls.symbologySetting.actionsTitle,
        width: '10%',
        type: 'actions',
        actions: ['delete']
      }];
      args = {
        fields: fields,
        selectable: false,
        autoHeight: true
      };
      this._symbologyTable = new SimpleTable(args);
      this._symbologyTable.placeAt(this.symbologyTableAttachNode);
      this._symbologyTable.startup();
    },

    /**
    * This function is used to click on add symbol button
    * @memberOf widgets/NearMe/setting/SymbologySettings
    */
    _addSymbolBtnClicked: function () {
      if (!this._layerNameStore ||
        (this._layerNameStore && this._layerNameStore.data.length <= 0)) {
        this._errorMessage(this.nls.errorStrings.selectLayerErrorString);
        return;
      } else {
        this._addLayerRow();
      }
    },

    /**
   * This function is used to add a row on  in symbology settings tab
   * @memberOf widgets/NearMe/setting/SymbologySettings
   */
    _addLayerRow: function (currentRowValues) {
      var editableLayerRow, fieldsColumn;
      editableLayerRow = this._symbologyTable.addRow({});
      fieldsColumn = query('.simple-table-cell', editableLayerRow.tr);
      if (fieldsColumn) {
        editableLayerRow = editableLayerRow.tr;
        this._addLayerNameDropdown(fieldsColumn[0], editableLayerRow, currentRowValues);
        this._addLayerFieldDropdown(fieldsColumn[1], editableLayerRow, currentRowValues);
        this._addLayerValueDropdown(fieldsColumn[2], editableLayerRow, currentRowValues);
        this._addSymbolPicker(fieldsColumn[3], editableLayerRow, currentRowValues);
      }
    },

    /**
     * This function is used to create table for adding new symbology
     * @memberOf widgets/NearMe/setting/SymbologySettings
     */
    _addSymbolPicker: function (col, tr, currentRowValues) {
      //create params to initialize 'symbolchooserPopup' widget
      var objSymbol = {};
      //add default symbol in config
      var symbolType = "graphicLocationSymbol";
      if (tr.symbol) {
        objSymbol.symbol = jsonUtils.fromJson(tr.symbol);
      } else if (currentRowValues && currentRowValues.symbol) {
        objSymbol.symbol = jsonUtils.fromJson(currentRowValues.symbol);
      }
      else {
        //objSymbol.type = utils.getSymbolTypeByGeometryType("point");
        // if symbols parameter available in input parameters then take symbol details
        if (this.config && this.config.symbols) {
          // check whether symbolType info is available in config
          if (this.config.symbols.hasOwnProperty(symbolType)) {
            // fetch selected symbol from config
            objSymbol.symbol = jsonUtils.fromJson(this.config.symbols[symbolType]);
          }
        }
      }
      var params = {
        symbolChooserTitle: this._getFieldAlias(tr),
        symbolParams: objSymbol,
        nls: this.nls,
        symbolType: symbolType
      };
      //create content div for symbol chooser node
      var symbolChooserNode = domConstruct.create("div", { "style": "height: 27px;" }, col);
      //display configured symbol in symbol chooser node
      this._showSelectedSymbol(symbolChooserNode, objSymbol.symbol, tr);
      //attach 'click' event on node to display symbol chooser popup
      this.own(on(symbolChooserNode, 'click', lang.hitch(this, function () {
        params.symbolChooserTitle = this._getFieldAlias(tr);
        //set recently selected symbol in symbol chooser popup
        params.symbolParams.symbol = jsonUtils.fromJson(tr.symbol);
        this._initSymbolChooserPopup(params, symbolChooserNode, tr);
      })));
    },

    /**
     * This function is used to get field alias for field
     * @memberOf widgets/NearMe/setting/SymbologySettings
     **/
    _getFieldAlias: function (tr) {
      var layerId, layerField, fieldAlias;
      layerId = tr.layerNameDropDown.getValue();
      layerField = tr.layerFieldDropDown.getValue();
      fieldAlias = "";
      if (this._layerDetails[layerId] && this._layerDetails[layerId].fields &&
        this._layerDetails[layerId].fields[layerField] &&
        this._layerDetails[layerId].fields[layerField].fieldAlias) {
        fieldAlias = this._layerDetails[layerId].fields[layerField].fieldAlias;
      }
      return fieldAlias;
    },

    /**
    * Initialize symbol chooser popup widget
    * @param {object} params: contains params to initialize widget
    * @param {object} symbolChooserNode: contains node to display selected graphic symbol
    * @memberOf widgets/NearMe/setting/SymbologySettings
    **/
    _initSymbolChooserPopup: function (params, symbolChooserNode, tr) {
      var symbolChooserObj = new SymbolChooserPopup(params);
      //handler for poopup 'OK' button 'click' event
      symbolChooserObj.onOkClick = lang.hitch(this, function () {
        //get selected symbol
        var symbolJson = symbolChooserObj.symbolChooser.getSymbol();
        this._showSelectedSymbol(symbolChooserNode, symbolJson, tr);
        symbolChooserObj.popup.close();
      });
    },
    /**
    * show selected graphic symbol in symbol chooser node
    * @param {object} symbolChooserNode: contains a symbol chooser node
    * @param {object} symbolJson: contains a json structure for symbol
    * @param {object} tr: table row in which symbol is created
    * @member of widgets/NearMe/setting/SymbologySettings
    **/
    _showSelectedSymbol: function (symbolChooserNode, symbolJson, tr) {
      domConstruct.empty(symbolChooserNode);
      var orgHeight, orgWidth, orgSize;
      if (symbolJson) {
        if (symbolJson.height > 26) {
          orgHeight = lang.clone(symbolJson.height);
          symbolJson.height = 26;
        }
        if (symbolJson.width > 26) {
          orgWidth = lang.clone(symbolJson.width);
          symbolJson.width = 26;
        }
        if (symbolJson.size > 20) {
          orgSize = lang.clone(symbolJson.size);
          symbolJson.size = 20;
        }
        var symbolNode = symbolUtils.createSymbolNode(symbolJson);
        // if symbol node is not created
        if (!symbolNode) {
          symbolNode = domConstruct.create('div');
        }
        domConstruct.place(symbolNode, symbolChooserNode);
        if (orgHeight) {
          symbolJson.height = orgHeight;
        }
        if (orgWidth) {
          symbolJson.width = orgWidth;
        }
        if (orgSize) {
          symbolJson.size = orgSize;
        }
        //store selected symbol in tr object
        tr.symbol = symbolJson.toJson();
      }
    },

    /**
     * This function is used to add layer name dropdown
     * @memberOf setting/SymbologySettings
     */
    _addLayerNameDropdown: function (fieldsColumn, editableLayerRow, currentRowValues) {
      var dropDownContainer;
      dropDownContainer = domConstruct.create("div", {
        "class": "esriCTDropDownContainer"
      }, fieldsColumn);
      if (!this._layerNameStore) {
        this._createLayerNameStore();
      }
      editableLayerRow.layerNameDropDown = new Select({
        name: "layerSelect",
        store: this._layerNameStore,
        labelAttr: "name",
        "class": "esriCTLayerNameDropdown"
      }, dropDownContainer);
      editableLayerRow.layerNameDropDown.startup();
      if (currentRowValues) {
        editableLayerRow.layerNameDropDown.set('value', currentRowValues.layerId, false);
      }
      //On layer change, reset layer field and field value controls
      on(editableLayerRow.layerNameDropDown, "change", lang.hitch(this, function () {
        this._createLayerFieldsStore(editableLayerRow);
        editableLayerRow.layerFieldDropDown.setStore(this._layerFieldStore);
        //Based on field, change value column into dropdown/text box
        this._addLayerValueDropdown(editableLayerRow.cells[2], editableLayerRow, null);
      }));
      editableLayerRow.layerNameDropDown.startup();
    },

    /**
     * This function is used to store layerName
     * @memberOf setting/SymbologySettings
     */
    _createLayerNameStore: function (layers) {
      var featureLayersArr, featureLayers;
      featureLayersArr = [];
      featureLayers = layers || this.config.searchLayers;
      array.forEach(featureLayers, lang.hitch(this, function (featureLayer) {
        featureLayersArr.push({
          name: featureLayer.title,
          value: featureLayer.id
        });
      }));
      this._layerNameStore = new Memory({ idProperty: "value", data: featureLayersArr });
    },

    /**
     * This function is used to add layer field dropdown
     * @memberOf setting/SymbologySettings
     */
    _addLayerFieldDropdown: function (fieldsColumn, editableLayerRow, currentRowValues) {
      var dropDownContainer;
      domConstruct.empty(fieldsColumn);
      dropDownContainer = domConstruct.create("div", {
        "class": "esriCTDropDownContainer"
      }, fieldsColumn);
      this._createLayerFieldsStore(editableLayerRow);
      editableLayerRow.layerFieldDropDown = new Select({
        name: "fieldSelect",
        labelAttr: "name",
        store: this._layerFieldStore,
        "class": "esriCTLayerFieldDropDown"
      }, dropDownContainer);
      //On layer field change, reset layer value control
      on(editableLayerRow.layerFieldDropDown, "change", lang.hitch(this, function () {
        //Based on field, change value column into dropdown/text box
        this._addLayerValueDropdown(editableLayerRow.cells[2], editableLayerRow, null);
      }));
      if (currentRowValues) {
        editableLayerRow.layerFieldDropDown.set('value', currentRowValues.fieldName, false);
      }
      editableLayerRow.layerFieldDropDown.startup();
    },

    /**
     * This function creates store of layer fields
     * @memberOf setting/SymbologySettings
     */
    _createLayerFieldsStore: function (editableLayerRow) {
      var fieldOptionsArr, selectedLayerID, selectedLayerObj;
      fieldOptionsArr = [];

      selectedLayerID = editableLayerRow.layerNameDropDown.getValue();
      selectedLayerObj = this._layerInfosObj.getLayerInfoById(selectedLayerID).layerObject;
      if (!this._layerDetails[selectedLayerID]) {
        this._layerDetails[selectedLayerID] = { "fields": {} };
      }

      array.forEach(selectedLayerObj.fields, lang.hitch(this, function (field) {
        var fieldName, featureLayersArr, codedDomainObj, fieldsToSkipArr;
        featureLayersArr = [];
        fieldsToSkipArr = ["esriFieldTypeDate", "esriFieldTypeOID", "esriFieldTypeGeometry",
          "esriFieldTypeBlob", "esriFieldTypeRaster", "esriFieldTypeGUID", "esriFieldTypeXML"];
        if (fieldsToSkipArr.indexOf(field.type) === -1) {
          fieldName = field.name;
          if (!this._layerDetails[selectedLayerID].fields[fieldName]) {
            this._layerDetails[selectedLayerID].fields[fieldName] = {};
            this._layerDetails[selectedLayerID].fields[fieldName].fieldAlias = field.alias;
            codedDomainObj = selectedLayerObj.getDomain(fieldName);
            if (codedDomainObj) {
              this._layerDetails[selectedLayerID].fields[fieldName].codedDomainStore =
                this._getCodedDomainStore(codedDomainObj);
              this._layerDetails[selectedLayerID].fields[fieldName].type = codedDomainObj.type;
            } else {
              this._layerDetails[selectedLayerID].fields[fieldName].codedDomainStore = null;
            }
          }
          fieldOptionsArr.push({
            "name": field.alias || field.name,
            "value": field.name
          });
        }
      }));
      this._layerFieldStore = new Memory({
        idProperty: "value", data: fieldOptionsArr
      });
    },

    /**
     * This function creates store of coded domain values for field
     * @memberOf setting/SymbologySettings
     */
    _getCodedDomainStore: function (codedDomainObj) {
      var codedDomainArr;
      codedDomainArr = [];
      array.forEach(codedDomainObj.codedValues, lang.hitch(this, function (codedValue) {
        codedDomainArr.push({
          name: codedValue.name,
          value: codedValue.code
        });
      }));
      return new Memory({ idProperty: "value", data: codedDomainArr });
    },

    /**
   * This function is used to add layer value dropdown
   * @memberOf setting/SymbologySettings
   */
    _addLayerValueDropdown: function (fieldsColumn, editableLayerRow, currentRowValues) {
      var fieldOptionsArr, dropDownContainer, selectedLayerID, selectedLayerField, selectedLayer,
        selectedFieldDomain, valueTextBoxContainer, codedDomainStore, layerField;

      fieldOptionsArr = [];
      domConstruct.empty(fieldsColumn);
      selectedLayerID = editableLayerRow.layerNameDropDown.getValue();
      selectedLayerField = editableLayerRow.layerFieldDropDown.getValue();

      dropDownContainer = domConstruct.create("div", {
        "class": "esriCTDropDownContainer esriCTLayerFieldDropDown"
      }, fieldsColumn);

      valueTextBoxContainer = domConstruct.create("div", {
        "class": "esriCTDropDownContainer esriCTLayerFieldDropDown"
      }, fieldsColumn);

      codedDomainStore =
        this._layerDetails[selectedLayerID].fields[selectedLayerField].codedDomainStore;
      layerField = this._layerDetails[selectedLayerID].fields[selectedLayerField];
      if (codedDomainStore && layerField.type === "codedValue") {
        editableLayerRow.layerValueDropDown = new Select({
          name: "valuesSelect",
          labelAttr: "name",
          store: codedDomainStore,
          "class": "esriCTLayerValuedDropDown"
        }, dropDownContainer);
        editableLayerRow.layerValueDropDown.startup();
        if (currentRowValues) {
          editableLayerRow.layerValueDropDown.set('value', currentRowValues.fieldValue);
        }
      } else if (codedDomainStore && layerField.type === "range") {
        selectedLayer = this._layerInfosObj.getLayerInfoById(selectedLayerID).layerObject;
        selectedFieldDomain = selectedLayer.getDomain(selectedLayerField);
        editableLayerRow.valueTextBox = new NumberTextBox({
          "class": "esriCTLayerValuedDropDown",
          "constraints": {
            min: selectedFieldDomain.minValue,
            max: selectedFieldDomain.maxValue
          }
        }, valueTextBoxContainer);
        editableLayerRow.valueTextBox.startup();
      }
      else {
        editableLayerRow.valueTextBox = new ValidationTextBox({
          "class": "esriCTLayerValuedDropDown"
        }, valueTextBoxContainer);
        editableLayerRow.valueTextBox.startup();
        if (currentRowValues) {
          editableLayerRow.valueTextBox.set('value', currentRowValues.fieldValue);
        }
      }
    },

    /**
     * This function is used to update the layer options
     * @memberOf setting/SymbologySettings
     */
    updateLayerOptions: function (layers) {
      var previousValue;
      this._createLayerNameStore(layers);
      array.forEach(this._symbologyTable.getRows(), lang.hitch(this, function (currentRow) {
        //Update the table with newly created store
        if (currentRow.layerNameDropDown &&
          this._layerNameStore.query({
            value: currentRow.layerNameDropDown.getValue()
          }).length > 0) {
          //Take out the previous value
          previousValue = currentRow.layerNameDropDown.getValue();
          //Set new store to update the dropdown
          currentRow.layerNameDropDown.setStore(this._layerNameStore);
          currentRow.layerNameDropDown.set('value', previousValue, false);
          //If previous value is not same as new value then we need to change field and its value columns
          if (previousValue !== currentRow.layerNameDropDown.getValue()) {
            if (currentRow.layerFieldDropDown) {
              this._createLayerFieldsStore(currentRow);
              currentRow.layerFieldDropDown.setStore(this._layerFieldStore);
            }
            //Based on field, change value column into dropdown/text box
            this._addLayerValueDropdown(currentRow.cells[2], currentRow, null);
          }
        } else {
          //Delete row if newly created store doesn't valid entry for that row
          this._symbologyTable.deleteRow(currentRow);
        }
      }));
    },

    getConfig: function () {
      var symbolConfig = {}, symbologyAttributes, selectedLayer, layerId,
        isValid = true, errMessage;
      array.forEach(this._symbologyTable.getRows(), lang.hitch(this, function (currentRow) {
        if (currentRow.layerNameDropDown) {
          //Fetch layer based on layerId
          layerId = currentRow.layerNameDropDown.getValue();
          selectedLayer = this._layerInfosObj.getLayerInfoById(layerId).layerObject;
          symbologyAttributes = {};
          symbologyAttributes.fieldName = currentRow.layerFieldDropDown.getValue();
          //Check for field value based on wether it is domain field or not
          if (selectedLayer.getDomain(symbologyAttributes.fieldName)) {
            symbologyAttributes.fieldValue = currentRow.layerValueDropDown.getValue();
          } else {
            symbologyAttributes.fieldValue = currentRow.valueTextBox.getValue();
          }
          //Fetch configured symbol
          if (currentRow.symbol) {
            symbologyAttributes.symbol = currentRow.symbol;
          }
          //If layer id doesn't exist, creat new array with layer id
          if (!symbolConfig.hasOwnProperty(layerId)) {
            symbolConfig[layerId] = [];
          }
          array.forEach(symbolConfig[layerId], lang.hitch(this, function (currentObj) {
            if (currentObj.fieldName === symbologyAttributes.fieldName &&
              currentObj.fieldValue === symbologyAttributes.fieldValue) {
              isValid = false;
              return true;
            }
          }));
          symbolConfig[layerId].push(symbologyAttributes);
        }
      }));
      //If configuration is valid, send the updated config
      if (isValid) {
        return { isValid: isValid, symbolConfig: symbolConfig };
      } else {
        // Incase of invalid configuration pass an error message string
        errMessage = string.substitute(this.nls.symbologySetting.invalidConfigMsg,
          { fieldName: symbologyAttributes.fieldName, layerName: selectedLayer.name });
        return { isValid: isValid, message: errMessage };
      }
    }
  });
});