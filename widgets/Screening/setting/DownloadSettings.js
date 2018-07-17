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
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./DownloadSettings.html',
  'dojo/dom-class',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/query',
  'dojo/dom-attr',
  'dojo/_base/html',
  'dojo/dom-construct',
  'dojo/string',
  "dojo/_base/Color",
  'jimu/BaseWidgetSetting',
  'jimu/dijit/CheckBox',
  'jimu/dijit/SimpleTable',
  'jimu/dijit/GpSource',
  'jimu/dijit/Popup',
  'jimu/dijit/Message',
  'jimu/dijit/ImageChooser',
  'jimu/portalUtils',
  "jimu/dijit/ColorPicker",
  'esri/request',
  'dojo/query',
  'dijit/form/Select',
  'dijit/form/ValidationTextBox',
  'dojo/_base/array',
  'jimu/dijit/PageUtils',
  'jimu/utils',
  'jimu/dijit/RadioBtn'
], function (
  declare,
  _WidgetsInTemplateMixin,
  template,
  domClass,
  lang,
  on,
  dojoQuery,
  domAttr,
  html,
  domConstruct,
  string,
  Color,
  BaseWidgetSetting,
  CheckBox,
  SimpleTable,
  GpSource,
  Popup,
  Message,
  ImageChooser,
  portalUtils,
  ColorPicker,
  esriRequest,
  query,
  Select,
  ValidationTextBox,
  array,
  PageUtils,
  jimuUtils
) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {

    templateString: template,
    baseClass: 'jimu-widget-screening-download-settings',

    map: null,
    loadingIndicator: null,
    downloadOptions: null,

    _layerIndex: 0,
    _layers: [],
    _extractDataTaskDownloadOptions: [],
    _extractDataTaskURL: "",
    _printTaskURL: "",
    _logo: "",
    _tableHeaderColor: null,
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
    _pageSize: [],
    _customLayoutTable: null,
    _buddyTaskChoiceList: {},
    _customDropdownOption: [],
    _defaultPrintTemplateDropdownOption: [],
    _printServiceChoiceList: [],
    _defaultPrintTemplateDropdownOptionObj: null,
    _clonedConfigurationCustomOptions: null,
    _buddyTaskEndPoint: ["Get Layout Templates Info", "Get Layout Templates Info Task"],
    _lastSelectedCustomDropdownRow: null,
    _isCustomOptionNoDefault: false,

    /* Public methods list */
    // checkLayerForDownloadOptions
    // getLayers
    // deleteRow
    // rowUp
    // rowDown
    // getExtractDataTaskURL
    // getDownloadingFileOptions
    // getPrintReportGPServiceURL
    // getFootnoteForReport
    // getLogo

    constructor: function (options) {
      this.map = null;
      this.loadingIndicator = null;
      this.downloadOptions = null;
      this._layerIndex = 0;
      this._layers = [];
      this._extractDataTaskDownloadOptions = [];
      this._extractDataTaskURL = "";
      this._printTaskURL = "";
      this._logo = "";
      this._tableHeaderColor = null;
      this._customLayoutTable = null;
      this._buddyTaskChoiceList = {};
      this._customDropdownOption = [];
      this._defaultPrintTemplateDropdownOption = [];
      this._printServiceChoiceList = [];
      this._defaultPrintTemplateDropdownOptionObj = null;
      this._clonedConfigurationCustomOptions = null;
      this._lastSelectedCustomDropdownRow = null;
      lang.mixin(this, options);
    },

    postCreate: function () {
      this._pageSize = [
        { "value": null, "label": null },
        { "value": "MILLIMETER", "label": this.nls.downloadTab.pageSizeUnits.millimeters },
        { "value": "INCH", "label": this.nls.units.inches },
        { "value": "POINT", "label": this.nls.downloadTab.pageSizeUnits.points },
        { "value": "CENTIMETER", "label": this.nls.units.centimeters }
      ];
      var args, extractDataTaskGPSource, printReportGPSource, popup, helperServices;
      // Initialize sync enable downloadable options table
      this._initSyncEnableOptionTable();
      if (this._syncEnableOptionTable) {
        // Clear table rows, if any
        this._layers = [];
        this._syncEnableOptionTable.clear();
      }
      // To retain state of config UI, set downloadable file options
      if (this.downloadOptions && this.downloadOptions.layers) {
        this._layers = this.downloadOptions.layers;
        array.forEach(this.downloadOptions.layers, lang.hitch(
          this,
          function (layer) {
            this._setFileOptionDataInTable(layer);
          }));
      }
      // Choose the last option selected to download data,
      // 'Sync-enable' option will be selected by default
      if (this.downloadOptions && this.downloadOptions.type) {
        this._chooseDownloadOption(this.downloadOptions.type, true);
      } else {
        this.syncEnableRadioButton.set("checked", true);
      }
      // Attach download option radio button click event
      this._attachDownloadOptionEvent();
      // Set print report gp service url
      if (this.reportSettings && this.reportSettings.printTaskURL &&
        this.reportSettings.printTaskURL !== "") {
        this.printGPServiceTextBox.set("value", this.reportSettings.printTaskURL);
        this._printTaskURL = this.reportSettings.printTaskURL;
      } else {
        //get helper services form portal object and discover print task url form org info
        helperServices = portalUtils.getPortal(this.appConfig.portalUrl).helperServices;
        if (helperServices && helperServices.printTask.url) {
          this.printGPServiceTextBox.set("value", helperServices.printTask.url);
          this._printTaskURL = helperServices.printTask.url;
        }
      }
      // Set print report footnote
      if (this.reportSettings && this.reportSettings.footnote &&
        this.reportSettings.footnote !== "") {
        this.footnoteTextArea.value = this.reportSettings.footnote;
      }
      args = {
        portalUrl: this.appConfig.portalUrl
      };
      // Attach Extract data task set button event
      this.own(on(this.extractDataTaskSetButton, "click", lang.hitch(this, function () {
        extractDataTaskGPSource = new GpSource(args);
        popup = this._onSetButtonClick(extractDataTaskGPSource);
        this._attachExtractDataTaskGPSourceEvents(extractDataTaskGPSource, popup);
      })));
      // Attach Report GP Service set button event
      this.own(on(this.printGPServiceSetButton, "click", lang.hitch(this, function () {
        printReportGPSource = new GpSource(args);
        popup = this._onSetButtonClick(printReportGPSource);
        this._attachPrintReportGPSourceEvents(printReportGPSource, popup);
      })));
      // Initialize jimu dijit image chooser
      this._initImageChooser();
      // Initialize color picker for Table Header
      this._tableHeaderColor =
        this._createColorPicker(this.reportSettings.columnTitleColor,
          this.columnTitleColorPickerNode);
      // set report title to config value
      this.reportTitleTextBox.set('value', this.reportSettings.reportTitle);
      this.own(on(this.addCustomOptionButton, "click", lang.hitch(this, function () {
        if (!domClass.contains(this.addCustomOptionButton, "esriCTCustomOptionButtonDisable")) {
          if (this._isCustomOptionNoDefault) {
            this._emptyDefaultDropDown();
          }
          this._addCustomOptionsInTable();
        }
      })));
      this._clonedConfigurationCustomOptions = lang.clone(this.reportSettings);
      this._destroyLayouts();
      this.loadingIndicator.show();
      this._fetchChoiceList();
    },

    /**
    * This function is to attach extract data task gp source events
    * @param{object} contains gp source
    * @param{node} contains popup
    * @memberOf Screening/setting/Download
    **/
    _attachExtractDataTaskGPSourceEvents: function (gpSource, popup) {
      this.own(on(gpSource, "ok", lang.hitch(this, function (tasks) {
        if (tasks && tasks.length > 0 && tasks[0].url) {
          this._requestExtractDataTaskURLInfo(tasks[0].url, popup);
        }
      })));
      this.own(on(gpSource, "cancel", lang.hitch(this, function () {
        popup.close();
      })));
    },

    /**
    * Function to get extract data task url
    * @memberOf Screening/setting/Download
    **/
    getExtractDataTaskURL: function () {
      return this._extractDataTaskURL ? this._extractDataTaskURL : "";
    },

    /**
    * This function is to attach print report gp source events
    * @param{object} contains gp source
    * @param{node} contains popup
    * @memberOf Screening/setting/Download
    **/
    _attachPrintReportGPSourceEvents: function (gpSource, popup) {
      this.own(on(gpSource, "ok", lang.hitch(this, function (tasks) {
        if (tasks && tasks.length > 0 && tasks[0].url) {
          this.printGPServiceTextBox.set("value", tasks[0].url);
          this._printTaskURL = tasks[0].url;
          this._clonedConfigurationCustomOptions = null;
          this._destroyLayouts();
          this.loadingIndicator.show();
          this._fetchChoiceList();
        } else {
          this.printGPServiceTextBox.set("value", "");
          this._printTaskURL = "";
        }
        popup.close();
      })));
      this.own(on(gpSource, "cancel", lang.hitch(this, function () {
        popup.close();
      })));
    },

    _destroyLayouts: function () {
      domConstruct.empty(this.defaultLayoutTable);
      domConstruct.empty(this.customLayoutTable);
      domConstruct.empty(this.defaultPrintTemplateDropdown);
      this._customLayoutTable = null;
      this._buddyTaskChoiceList = {};
      this._customDropdownOption = [];
      this._printServiceChoiceList = [];
      this._defaultPrintTemplateDropdownOption = [];
      if (this._customLayoutTable) {
        domConstruct.destroy(this._customLayoutTable);
      }
      if (this._defaultPrintTemplateDropdownOptionObj) {
        domConstruct.destroy(this._defaultPrintTemplateDropdownOptionObj.domNode);
      }
      this._isCustomOptionNoDefault = false;
    },

    /**
    * This function is to initialize jimu simple table for sync enable download option
    * @memberOf Screening/setting/Download
    **/
    _initSyncEnableOptionTable: function () {
      var fields, args;
      // Set required fields needed to display in the table
      fields = [{
        "name": this.nls.downloadTab.syncEnableTableHeaderTitle.layerNameLabel,
        "title": this.nls.downloadTab.syncEnableTableHeaderTitle.layerNameLabel,
        "type": "empty",
        "width": "40%"
      }, {
        "name": this.nls.downloadTab.syncEnableTableHeaderTitle.csvFileFormatLabel,
        "title": this.nls.downloadTab.syncEnableTableHeaderTitle.csvFileFormatLabel,
        "class": "esriCTTableHeader",
        "type": "empty",
        "width": "15%"
      }, {
        "name": this.nls.downloadTab.syncEnableTableHeaderTitle.fileGDBFormatLabel,
        "title": this.nls.downloadTab.syncEnableTableHeaderTitle.fileGDBFormatLabel,
        "class": "esriCTTableHeader",
        "type": "empty",
        "width": "15%"
      }, {
        "name": this.nls.downloadTab.syncEnableTableHeaderTitle.ShapefileFormatLabel,
        "title": this.nls.downloadTab.syncEnableTableHeaderTitle.ShapefileFormatLabel,
        "type": "empty",
        "class": "esriCTTableHeader",
        "width": "15%"
      }, {
        "name": this.nls.downloadTab.syncEnableTableHeaderTitle.allowDownloadLabel,
        "title": this.nls.downloadTab.syncEnableTableHeaderTitle.allowDownloadLabel,
        "class": "esriCTTableHeader",
        "type": "empty",
        "width": "15%"
      }];
      args = {
        fields: fields,
        selectable: false
      };
      // Initialize Sync enable option table
      this._syncEnableOptionTable = new SimpleTable(args);
      this._syncEnableOptionTable.placeAt(this.downloadOptionTable);
      this._syncEnableOptionTable.startup();
    },

    /**
    * This function will populate data in sync enable options table
    * @param{object} contains layer information
    * @memberOf Screening/setting/Download
    **/
    _setFileOptionDataInTable: function (layer) {
      var tuple, downloadingFileOptions;
      tuple = this._syncEnableOptionTable.addRow({});
      if (!tuple.success || !tuple.tr) {
        return;
      }
      // Add layer name
      this._addLayerTitle(tuple.tr, layer.layerName);
      // Show 'CSV' file option as downloadable
      this._addFileOption(tuple.tr, 1);
      downloadingFileOptions = layer.downloadingFileOption.join();
      if (downloadingFileOptions.split("filegdb").length > 1) {
        // Show 'FileGDB' file option as downloadable
        this._addFileOption(tuple.tr, 2);
      }
      if (downloadingFileOptions.split("shapefile").length > 1) {
        // Show 'Shapefile' file option as downloadable
        this._addFileOption(tuple.tr, 3);
      }
      // Add allow download option check box for the layer
      this._addAllowDownloadCheckbox(tuple.tr, layer);
    },

    /**
    * This function is to set downloadable file info in the table
    * @param{object} contains layer information
    * @param{integer} contains row index
    * @memberOf Screening/setting/Download
    **/
    checkLayerForDownloadOptions: function (layer, index) {
      var layerInformation, tuple;
      tuple = this._getTableRow(index);
      if (!tuple.success || !tuple.tr) {
        return;
      }
      layerInformation = {
        "url": layer.url,
        "layerName": layer.layerName,
        "id": layer.id,
        "allowDownload": true
      };
      this._addLayerTitle(tuple.tr, layer.layerName);
      // Show 'CSV' file option
      this._addFileOption(tuple.tr, 1);
      layerInformation.downloadingFileOption = [];
      layerInformation.downloadingFileOption.push("csv");
      // Show 'FileGDB' file option, if the layer has 'Sync' capability
      if (layer.capabilities.split("Sync").length > 1 && layer.layerVersion >= 10.4) {
        this._addFileOption(tuple.tr, 2);
        layerInformation.downloadingFileOption.push("filegdb");
        this.loadingIndicator.show();
        // Check wether the layer is AGOL hosted or not
        var isHostedLayer = jimuUtils.isHostedService(layer.url);
        if (isHostedLayer) {
          this._addFileOption(tuple.tr, 3);
          layerInformation.downloadingFileOption.push("shapefile");
        }
        this.loadingIndicator.hide();
      }
      // Add allow download option check box for the layer
      this._addAllowDownloadCheckbox(tuple.tr, layerInformation);
      this._setLayerDownloadInfo(layerInformation, index);
    },

    /**
    * This function is to get the particular row of the table
    * @param{integer} contains row index
    * @memberOf Screening/setting/Download
    **/
    _getTableRow: function (index) {
      var tuple;
      // Check if it is an existing row
      if ((index > -1) && this._syncEnableOptionTable.tbody.rows[
        index]) {
        tuple = {
          "tr": this._syncEnableOptionTable.tbody.rows[index],
          "success": true
        };
        this._removeFileOptions(tuple.tr);
      } else {
        tuple = this._syncEnableOptionTable.addRow({});
      }
      return tuple;
    },

    /**
    * This function is to set the layer information
    * @param{object} contains layer information
    * @param{integer} contains row index
    * @memberOf Screening/setting/Download
    **/
    _setLayerDownloadInfo: function (layerInformation, index) {
      // Check if existing row is modified or a new row is added
      if (index > -1) {
        this._layers.splice(index, 1, layerInformation);
      } else {
        this._layers.push(layerInformation);
      }
    },

    /**
    * This function is to set layer name in the table row
    * @param{object} contains table row
    * @param{string} contains layer name
    * @memberOf Screening/setting/Download
    **/
    _addLayerTitle: function (row, layerName) {
      var td;
      // Set layer label
      td = dojoQuery('.simple-table-cell', row)[0];
      if (td) {
        td.innerHTML = layerName;
      }
    },

    /**
    * This function is to remove all the file options, if any
    * @param{integer} contains row index
    * @memberOf Screening/setting/Download
    **/
    _removeFileOptions: function (row) {
      var cells, i;
      // Remove all available download file options, if any
      cells = dojoQuery('.simple-table-cell', row);
      for (i = 1; i < 4; i++) {
        domClass.remove(cells[i], "esriCTAvailableDownloadOption");
      }
    },

    /**
    * This function is to set downloadable file tick
    * @param{object} contains table row
    * @param{integer} contains row index
    * @memberOf Screening/setting/Download
    **/
    _addFileOption: function (row, index) {
      var td;
      // Show the file option available
      td = dojoQuery('.simple-table-cell', row)[index];
      if (td) {
        domClass.add(td, "esriCTAvailableDownloadOption");
      }
    },

    /**
    * This function is to set downloadable file tick
    * @param{object} contains table row
    * @param{integer} contains row index
    * @memberOf Screening/setting/Download
    **/
    _addAllowDownloadCheckbox: function (row, layerInformation) {
      var td, checkbox;
      td = dojoQuery('.simple-table-cell', row)[4];
      if (td) {
        // Empty the node for the allow download checkbox
        domConstruct.empty(td);
        // Initialize allow download checkbox
        checkbox = new CheckBox({
          "checked": layerInformation.allowDownload,
          "class": "esriCTAllowDownloadCheckbox"
        });
        checkbox.placeAt(td);
        // Add allow download checkbox change event
        this.own(on(checkbox, "change", lang.hitch(this, function () {
          layerInformation.allowDownload = domAttr.get(
            checkbox, "checked");
        })));
      }
    },

    /**
    * This function is to attach click events of radio buttons to show there respective contents
    * @memberOf Screening/setting/Download
    **/
    _attachDownloadOptionEvent: function () {
      var radioButtons, lastSelectedOption;
      lastSelectedOption = dojoQuery('input[type=radio]:checked', this.downloadOptionForm)[
        0].value;
      radioButtons = dojoQuery('input', this.downloadOptionForm);
      // Attach all radio buttons 'click' event
      array.forEach(radioButtons, lang.hitch(this, function (
        option) {
        this.own(on(option, "click", lang.hitch(this, function (
          evt) {
          if (option.value !== lastSelectedOption) {
            this._chooseDownloadOption(evt.currentTarget
              .value, false);
            lastSelectedOption = evt.currentTarget.value;
          }
        })));
      }));
    },

    /**
    * This function is to set downloadable file tick
    * @param{string} contains file option, like
    * 'syncEnable', 'extractDataTask' or 'cannotDownload'
    * @param{boolean} contains true when function calls on load
    * @memberOf Screening/setting/Download
    **/
    _chooseDownloadOption: function (option, onLoad) {
      switch (option) {
        case "syncEnable":
          this.syncEnableRadioButton.set("checked", true);
          domClass.remove(this.downloadOptionTable, "esriCTHidden");
          domClass.add(this.extractDataTaskInputContainer, "esriCTHidden");
          // Reset extract data task url textbox
          if (onLoad) {
            this._resetExtractDataTaskOption(true);
          }
          break;
        case "extractDataTask":
          this.gpServiceRadioButton.set("checked", true);
          domClass.add(this.downloadOptionTable, "esriCTHidden");
          domClass.remove(this.extractDataTaskInputContainer, "esriCTHidden");
          // Set extract data task url textbox
          if (onLoad && this.downloadOptions && this.downloadOptions.extractDataTaskURL) {
            this._resetExtractDataTaskOption(false);
          }
          break;
        case "cannotDownload":
          this.cannotDownloadRadioButton.set("checked", true);
          domClass.add(this.downloadOptionTable, "esriCTHidden");
          domClass.add(this.extractDataTaskInputContainer, "esriCTHidden");
          // Reset extract data task url textbox
          if (onLoad) {
            this._resetExtractDataTaskOption(true);
          }
          break;
        default:
          break;
      }
    },

    /**
    * This function is to get downloadable layers array
    * @memberOf Screening/setting/Download
    **/
    getLayers: function () {
      return this._layers;
    },

    /**
    * This function is to delete table row
    * @param{integer} contains row index
    * @memberOf Screening/setting/Download
    **/
    deleteRow: function (rowIndex) {
      var tr = this._syncEnableOptionTable.tbody.rows[rowIndex];
      this._syncEnableOptionTable.deleteRow(tr);
      this._layers.splice(rowIndex, 1);
    },

    /**
    * This function is to move table row one position up
    * @param{integer} contains row index
    * @memberOf Screening/setting/Download
    **/
    rowUp: function (rowIndex) {
      var layerInfo, refLayerInfo;
      if (rowIndex > -1 && this._syncEnableOptionTable.tbody.rows[
        rowIndex + 1]) {
        // Swap table rows
        html.place(this._syncEnableOptionTable.tbody.rows[rowIndex],
          this._syncEnableOptionTable.tbody.rows[rowIndex + 1],
          'after');
        this._syncEnableOptionTable.updateUI();
        // Update layer info array
        layerInfo = this._layers[rowIndex];
        refLayerInfo = this._layers[rowIndex + 1];
        this._layers.splice(rowIndex, 2, refLayerInfo, layerInfo);
      }
    },

    /**
    * This function is to move table row one position down
    * @param{integer} contains row index
    * @memberOf Screening/setting/Download
    **/
    rowDown: function (rowIndex) {
      var layerInfo, refLayerInfo;
      if (rowIndex < this._syncEnableOptionTable.tbody.rows.length &&
        this._syncEnableOptionTable.tbody.rows[rowIndex - 1]) {
        // Swap table rows
        html.place(this._syncEnableOptionTable.tbody.rows[rowIndex],
          this._syncEnableOptionTable.tbody.rows[rowIndex - 1],
          'before');
        this._syncEnableOptionTable.updateUI();
        // Update layer info array
        layerInfo = this._layers[rowIndex];
        refLayerInfo = this._layers[rowIndex - 1];
        this._layers.splice((rowIndex - 1), 2, layerInfo,
          refLayerInfo);
      }
    },

    /**
    * This function is to attach set button click event functionality
    * @param{object} contains gp source
    * @memberOf Screening/setting/Download
    **/
    _onSetButtonClick: function (gpSource) {
      var popup;
      popup = new Popup({
        "titleLabel": this.nls.downloadTab.setGPTaskTitle,
        "width": 830,
        "height": 560,
        "content": gpSource
      });
      return popup;
    },

    /**
    * This function is to request info in json format from url
    * @param{string} contains extract data task url
    * @param{dom node} contains popup
    * @memberOf Screening/setting/Download
    **/
    _requestExtractDataTaskURLInfo: function (url, popup) {
      var isExtractDataTaskURLValid;
      isExtractDataTaskURLValid = false;
      this.loadingIndicator.show();
      esriRequest({ "url": url + "?f=pjson" }).then(
        lang.hitch(this, function (results) {
          isExtractDataTaskURLValid = this._validateExtractDataTask(results);
          if (!isExtractDataTaskURLValid) {
            this._showMessage(this.nls.downloadTab.errorMessages.invalidGPTaskURL);
            this.extractDataTaskTextBox.set("value", "");
            this._extractDataTaskURL = "";
          } else {
            this.extractDataTaskTextBox.set("value", url);
            this._extractDataTaskURL = url;
          }
          popup.close();
          this.loadingIndicator.hide();
        }), lang.hitch(this, function () { // on Error
          this._showMessage(this.nls.downloadTab.errorMessages.invalidGPTaskURL);
          this.extractDataTaskTextBox.set("value", "");
          this._extractDataTaskURL = "";
          this.loadingIndicator.hide();
          popup.close();
        }));
    },

    /**
    * This function is to attach set button click event functionality
    * @param{object} information of extract data task
    * @memberOf Screening/setting/Download
    **/
    _validateExtractDataTask: function (results) {
      var validAOIParam, validFeatureFormatParam, validOutputParam;
      validAOIParam = validFeatureFormatParam = validOutputParam = false;
      if (results && results.executionType === "esriExecutionTypeAsynchronous") {
        array.forEach(results.parameters, lang.hitch(this, function (paramDetail) {
          switch (paramDetail.name) {
            case "Area_of_Interest":
              validAOIParam = this._checkAOIParam(paramDetail);
              break;
            case "Feature_Format":
              validFeatureFormatParam = this._checkFeatureFormatParam(paramDetail);
              break;
            case "Output_Zip_File":
              validOutputParam = this._checkOutputParam(paramDetail);
              break;
            default:
              break;
          }
        }));
        if (validAOIParam && validFeatureFormatParam && validOutputParam) {
          return true;
        }
      }
      return false;
    },

    /**
    * This function is to check required AOI param
    * @param{object} information of extract data task AOI param
    * @memberOf Screening/setting/Download
    **/
    _checkAOIParam: function (paramDetail) {
      if (paramDetail.dataType === "GPFeatureRecordSetLayer") {
        if (paramDetail.defaultValue &&
          paramDetail.defaultValue.geometryType !== "esriGeometryPolygon") {
          return false;
        }
        return true;
      }
      return false;
    },

    /**
    * This function is to check required feature format param
    * @param{object} information of extract data task feature format param
    * @memberOf Screening/setting/Download
    **/
    _checkFeatureFormatParam: function (paramDetail) {
      var fileOption, isAvail;
      isAvail = false;
      fileOption = {
        fileGDB: "File Geodatabase - GDB - .gdb",
        shapefile: "Shapefile - SHP - .shp"
      };
      this._extractDataTaskDownloadOptions = [];
      if (paramDetail.dataType === "GPString" && paramDetail.choiceList &&
        paramDetail.choiceList.length > 0) {
        this._extractDataTaskDownloadOptions.push("csv");
        if (paramDetail.choiceList.indexOf(fileOption.fileGDB) > -1) {
          this._extractDataTaskDownloadOptions.push("filegdb");
          isAvail = true;
        }
        if (paramDetail.choiceList.indexOf(fileOption.shapefile) > -1) {
          this._extractDataTaskDownloadOptions.push("shapefile");
          isAvail = true;
        }
        return isAvail;
      }
      return false;
    },

    /**
    * This function is to check required output zip file param
    * @param{object} information of extract data task output zip file param
    * @memberOf Screening/setting/Download
    **/
    _checkOutputParam: function (paramDetail) {
      if (paramDetail.dataType === "GPDataFile") {
        return true;
      }
      return false;
    },

    /**
    * Create and show alert message.
    * @param {string} contains message
    * @memberOf Screening/setting/Download
    **/
    _showMessage: function (msg) {
      var alertMessage = new Message({
        message: msg
      });
      alertMessage.message = msg;
    },

    /**
    * Function to get downloading options
    * @memberOf Screening/setting/Download
    **/
    getDownloadingFileOptions: function () {
      var type, options;
      options = [];
      type = dojoQuery('input[type=radio]:checked', this.downloadOptionForm)[0].value;
      if (type === "syncEnable") {
        options = this._getSyncEnableDownloadingOptions(this._layers);
      } else if (type === "extractDataTask") {
        options = this._extractDataTaskDownloadOptions;
      }
      return options;
    },

    /**
    * Function to get downloading options for sync-enable
    * @param {object} contains layers infos
    * @memberOf Screening/setting/Download
    **/
    _getSyncEnableDownloadingOptions: function (layers) {
      var downloadingOptions;
      downloadingOptions = [];
      array.some(layers, lang.hitch(this, function (currentLayer) {
        //Check layer is available for download
        if (currentLayer.allowDownload) {
          //Loop through array of download options
          array.some(currentLayer.downloadingFileOption, lang.hitch(this, function (option) {
            //Check if option is already added to array
            if (downloadingOptions.indexOf(option) === -1) {
              downloadingOptions.push(option);
              return;
            }
          }));
        }
      }));
      return downloadingOptions;
    },

    /**
    * Function to get print report gp service url
    * @memberOf Screening/setting/Download
    **/
    getPrintReportGPServiceURL: function () {
      return this._printTaskURL ? this._printTaskURL : "";
    },

    /**
    * Function to get report title text
    * @memberOf Screening/setting/Download
    **/
    getReportTitle: function () {
      return this.reportTitleTextBox.value;
    },

    /**
    * Function to get report table header color
    * @memberOf Screening/setting/Download
    **/
    getTableHeaderColor: function () {
      var tableHeaderSelectedColor = this._tableHeaderColor.color.toHex();
      return tableHeaderSelectedColor ? tableHeaderSelectedColor : "";
    },

    /**
    * Function to get footnote for report
    * @memberOf Screening/setting/Download
    **/
    getFootnoteForReport: function () {
      return this.footnoteTextArea.value ? this.footnoteTextArea.value : "";
    },

    /**
    * Function to get initialize image chooser for reports
    * @memberOf Screening/setting/Download
    **/
    _initImageChooser: function () {
      this.logoChooser = new ImageChooser({
        cropImage: false,
        showSelfImg: false,
        goldenWidth: 50,
        goldenHeight: 50,
        displayImg: this.imageChooserPreview,
        format: [ImageChooser.GIF, ImageChooser.PNG, ImageChooser.JPEG]
      });
      // Placing image chooser
      this.logoChooser.placeAt(this.logoChooserNode);
      this._createLogoPreview();
      domClass.add(this.logoChooser.domNode, "esriCTImageChooserContent");
    },

    /**
    * Function to set default logo in config
    * @param {object} contains image info
    * @memberOf Screening/setting/Download
    **/
    _createLogoPreview: function () {
      var baseURL, imageInfo, imageSrc;
      //by default
      imageSrc = this.folderUrl + "/images/default-logo.png";
      //logo is configured use it else show default logo
      if (this.reportSettings && this.reportSettings.logo) {
        imageInfo = this.reportSettings.logo;
        //if "${appPath}" string found in imageInfo
        if (imageInfo.indexOf("${appPath}") > -1) {
          baseURL = this.folderUrl.slice(0, this.folderUrl.lastIndexOf("widgets"));
          imageSrc = string.substitute(imageInfo, { appPath: baseURL });
        } else {
          imageSrc = imageInfo;
        }
      }
      domAttr.set(this.imageChooserPreview, 'src', imageSrc);
    },

    /**
    * Function to get logo information
    * @memberOf Screening/setting/Download
    **/
    getLogo: function () {
      // return imageData if available else return default image path
      if (this.logoChooser && this.logoChooser.imageData) {
        return this.logoChooser.getImageData();
      } else if (this.reportSettings && this.reportSettings.logo) {
        return this.reportSettings.logo;
      } else {
        return "${appPath}/widgets/Screening/images/default-logo.png";
      }
    },

    /**
    * Function to reset extract data task url textbox
    * @param {boolean} contains true or false
    * @memberOf Screening/setting/Download
    **/
    _resetExtractDataTaskOption: function (reset) {
      // If true then reset extract data task url textbox
      if (reset) {
        this.extractDataTaskTextBox.set("value", "");
        this._extractDataTaskURL = "";
        this._extractDataTaskDownloadOptions = [];
      } else {
        this.extractDataTaskTextBox.set("value", this.downloadOptions.extractDataTaskURL);
        this._extractDataTaskURL = this.downloadOptions.extractDataTaskURL;
        this._extractDataTaskDownloadOptions = this.downloadOptions.downloadingFileOptions;
      }
    },

    /**
    * This function creates color picker instance to select table header and name row color
    * @memberOf Screening/setting/Download
    **/
    _createColorPicker: function (defaultColor, node) {
      var tablePreviewText, trPreviewText, tdPreviewText, tdSymbolNode, colorPickerDivNode,
        colorPicker;
      tablePreviewText = domConstruct.create("table", {
        "cellspacing": "0",
        "cellpadding": "0"
      }, node);
      trPreviewText = domConstruct.create("tr", { "style": "height:30px" }, tablePreviewText);
      tdPreviewText = domConstruct.create("td", {}, trPreviewText);
      tdSymbolNode = domConstruct.create("td", {}, trPreviewText);
      //create content div for color picker node
      colorPickerDivNode = domConstruct.create("div", {
        "class": "esriCTColorChooserNode"
      }, tdSymbolNode);
      colorPicker = new ColorPicker(null, domConstruct.create("div", {},
        colorPickerDivNode));
      colorPicker.setColor(new Color(defaultColor));
      return colorPicker;
    },

    /**
    * Function to remove custom option from default dropdown
    * @param {customOption} contains custom Option
    * @param {isConfigurationRecord} contains flag to check weather it is configuration record
    * @memberOf Screening/setting/Download
    **/
    _addFieldsRow: function (customOption, isConfigurationRecord) {
      var fieldRow, rowCell, width, height, layoutCell, widthCell, heightCell, pageUnitsCell, pageUnits;
      fieldRow = this._customLayoutTable.addRow({});
      if (fieldRow.success && fieldRow.tr) {
        fieldRow = fieldRow.tr;
        rowCell = query('.simple-table-cell', fieldRow);

        layoutCell = rowCell[0];
        widthCell = rowCell[1];
        heightCell = rowCell[2];
        pageUnitsCell = rowCell[3];

        width = customOption.Width;
        height = customOption.Height;

        if ((width === null || width === "" || width === undefined) &&
          (height === null || height === "" || height === undefined)) {
          pageUnits = null;
        } else if (customOption.PageUnits) {
          pageUnits = customOption.PageUnits;
        } else {
          pageUnits = null;
        }

        this._displayLayout(layoutCell, fieldRow, customOption.SizeName);
        this._displayWidth(widthCell, fieldRow, width, isConfigurationRecord);
        this._displayHeight(heightCell, fieldRow, height, isConfigurationRecord);
        this._displayPageUnits(pageUnitsCell, pageUnits, fieldRow);
      }
    },

    /**
     * This function is to remove all the default options from the default dropdown
     * @memberOf Screening/setting/Download
     */
    _emptyDefaultDropDown: function () {
      for (var defaultOption in this._defaultOptions) {
        if (this._defaultOptions.hasOwnProperty(defaultOption)) {
          if (PageUtils.PageSizes[this._defaultOptions[defaultOption].SizeName]) {
            this._defaultPrintTemplateDropdownOptionObj.removeOption({
              "label": defaultOption,
              "value": defaultOption
            });
          }
        }
      }
    },

    /**
     * This function is to add all the default options in the default dropdown
     * @memberOf Screening/setting/Download
     */
    _addOptionsInDefaultDropdown: function () {
      for (var defaultOption in this._defaultOptions) {
        if (this._defaultOptions.hasOwnProperty(defaultOption)) {
          if (PageUtils.PageSizes[this._defaultOptions[defaultOption].SizeName]) {
            this._defaultPrintTemplateDropdownOptionObj.addOption({
              "label": defaultOption,
              "value": defaultOption
            });
          }
        }
      }
      this._defaultPrintTemplateDropdownOptionObj.set("value", "Letter ANSI A Portrait");
    },

    /**
    * Function to remove custom option from default dropdown
    * @memberOf Screening/setting/Download
    **/
    _removeCustomOptionFromDefaultDropdown: function () {
      array.forEach(this._customDropdownOption, lang.hitch(this, function (customDropDownOption) {
        this._defaultPrintTemplateDropdownOptionObj.removeOption({
          "label": customDropDownOption.value,
          "value": customDropDownOption.value
        });
      }));

      this._defaultPrintTemplateDropdownOption = [];
      array.forEach(this._defaultPrintTemplateDropdownOptionObj.options,
        lang.hitch(this, function (customDropDownOption) {
          this._defaultPrintTemplateDropdownOption.push({
            "label": customDropDownOption.value,
            "value": customDropDownOption.value
          });
        }));
    },

    /**
    * Function to add configured custom option in default dropdown
    * @memberOf Screening/setting/Download
    **/
    _addConfiguredCustomOptionInDefaultDropdown: function () {
      var tableRows;
      if (this._customLayoutTable) {
        tableRows = this._customLayoutTable.getRows();
        array.forEach(tableRows, lang.hitch(this, function (tableRow) {
          var defaultOptionFromDefaultPrintTemplateExists = false;
          if (jimuUtils.has('ie') || jimuUtils.has('edge')) {
            array.forEach(this._defaultPrintTemplateDropdownOptionObj.options,
              lang.hitch(this, function (defaultOption) {
                if (defaultOption.value === tableRow.customOptionLayoutDropdownObj.value) {
                  defaultOptionFromDefaultPrintTemplateExists = true;
                }
              }));
          } else {
            defaultOptionFromDefaultPrintTemplateExists =
              this._defaultPrintTemplateDropdownOptionObj.options.find(function (defaultOption) {
                return defaultOption.value === tableRow.customOptionLayoutDropdownObj.value;
              });
          }
          if (!defaultOptionFromDefaultPrintTemplateExists) {
            this._defaultPrintTemplateDropdownOptionObj.addOption({
              "label": tableRow.customOptionLayoutDropdownObj.value,
              "value": tableRow.customOptionLayoutDropdownObj.value
            });
          }
        }));
      }
    },

    /**
    * Function to display layout
    * @param {layoutCell} contains DOM Node for layout cell
    * @param {fieldRow} contains fieldRow
    * @param {value} contains value
    * @memberOf Screening/setting/Download
    **/
    _displayLayout: function (layoutCell, fieldRow, value) {
      var customOptionDropdown;
      customOptionDropdown = new Select({
        "class": "esriCTFieldChooserDropdown",
        options: lang.clone(this._customDropdownOption),
        "value": value
      });
      customOptionDropdown.placeAt(layoutCell);
      this.own(on(customOptionDropdown, "MouseEnter", lang.hitch(this, function (evt) {
        this._lastSelectedCustomDropdownRow = evt.currentTarget.parentNode.parentNode;
      })));
      this.own(on(customOptionDropdown, "click", lang.hitch(this, function (evt) {
        this._lastSelectedCustomDropdownRow = evt.currentTarget.parentNode.parentNode;
      })));
      this.own(on(customOptionDropdown, "change", lang.hitch(this, function (evt) {
        if (this._buddyTaskChoiceList[evt]) {
          if (this._lastSelectedCustomDropdownRow) {
            this._lastSelectedCustomDropdownRow.customOptionHeightTextbox.set("value",
              this._buddyTaskChoiceList[evt].pageSize[1]);
            this._lastSelectedCustomDropdownRow.customOptionWidthTextbox.set("value",
              this._buddyTaskChoiceList[evt].pageSize[0]);
            if (this._buddyTaskChoiceList[evt].pageUnits) {
              this._lastSelectedCustomDropdownRow.customOptionPageUnitsDropdownObj.set("value",
                this._buddyTaskChoiceList[evt].pageUnits);
            } else {
              this._lastSelectedCustomDropdownRow.customOptionPageUnitsDropdownObj.set("value", "");
            }
          }
        } else {
          this._lastSelectedCustomDropdownRow.customOptionHeightTextbox.set("value", "");
          this._lastSelectedCustomDropdownRow.customOptionWidthTextbox.set("value", "");
          this._lastSelectedCustomDropdownRow.customOptionPageUnitsDropdownObj.set("value", "");
        }
        this._removeCustomOptionFromDefaultDropdown();
        this._addConfiguredCustomOptionInDefaultDropdown();
      })));
      customOptionDropdown.startup();
      fieldRow.customOptionLayoutDropdownObj = customOptionDropdown;
    },

    /**
    * Function to display width
    * @param {widthCell} contains DOM Node for width cell
    * @param {fieldRow} contains fieldRow
    * @param {value} contains value
    * @param {isConfigurationRecord} contains flag to check weather it is configuration record
    * @memberOf Screening/setting/Download
    **/
    _displayWidth: function (widthCell, fieldRow, value, isConfigurationRecord) {
      var widthTextBox;
      if (!isConfigurationRecord) {
        if (!isNaN(parseFloat(value))) {
          value = parseFloat(value);
        }
      }
      widthTextBox = new ValidationTextBox({
        "class": "esriCTFieldValidationTextBox",
        "regExp": '^\\d+(\\.\\d+)?$',
        "invalidMessage": this.nls.downloadTab.errorMessages.invalidWidth,
        "value": value,
        "required": true
      });
      widthTextBox.placeAt(widthCell);
      widthTextBox.startup();
      fieldRow.customOptionWidthTextbox = widthTextBox;
    },

    /**
    * Function to display height
    * @param {heightCell} contains DOM Node for height cell
    * @param {fieldRow} contains fieldRow
    * @param {value} contains value
    * @param {isConfigurationRecord} contains flag to check weather it is configuration record
    * @memberOf Screening/setting/Download
    **/
    _displayHeight: function (heightCell, fieldRow, value, isConfigurationRecord) {
      var heightTextBox;
      if (!isConfigurationRecord) {
        if (!isNaN(parseFloat(value))) {
          value = parseFloat(value);
        }
      }
      heightTextBox = new ValidationTextBox({
        "class": "esriCTFieldValidationTextBox",
        "regExp": '^\\d+(\\.\\d+)?$',
        "invalidMessage": this.nls.downloadTab.errorMessages.invalidHeight,
        "value": value,
        "required": true
      });
      heightTextBox.placeAt(heightCell);
      heightTextBox.startup();
      fieldRow.customOptionHeightTextbox = heightTextBox;
    },

    /**
    * Function to display page units
    * @param {pageUnitsCell} contains page unit cell
    * @param {value} contains value
    * @param {fieldRow} contains fieldRow
    * @memberOf Screening/setting/Download
    **/
    _displayPageUnits: function (pageUnitsCell, value, fieldRow) {
      var pageUnitsDropdown;
      pageUnitsDropdown = new Select({
        "class": "esriCTFieldChooserDropdown",
        options: lang.clone(this._pageSize),
        "required": true,
        "value": value
      });
      pageUnitsDropdown.placeAt(pageUnitsCell);
      pageUnitsDropdown.startup();
      fieldRow.customOptionPageUnitsDropdownObj = pageUnitsDropdown;
    },

    /**
    * Function to get distinct fields options object
    * @param {distinctFieldArr} contains distinct field array
    * @memberOf Screening/setting/Download
    **/
    _getDistinctFieldsOptionsObj: function (distinctFieldArr) {
      var distinctFieldOptions = [];
      array.forEach(distinctFieldArr, lang.hitch(this, function (field) {
        distinctFieldOptions.push(
          {
            "label": this._entireFieldObj[field].alias || this._entireFieldObj[field].name,
            "value": field
          }
        );
      }));
      return distinctFieldOptions;
    },

    /**
    * Function to add default print template options
    * @memberOf Screening/setting/Download
    **/
    _addDefaultPrintTemplateOptions: function () {
      this._defaultPrintTemplateDropdownOptionObj = new Select({
        "class": "esriCTFieldChooserDropdown",
        options: this._defaultPrintTemplateDropdownOption
      });
      this._defaultPrintTemplateDropdownOptionObj.placeAt(this.defaultPrintTemplateDropdown);
      this._defaultPrintTemplateDropdownOptionObj.startup();
      if (this._clonedConfigurationCustomOptions &&
        this._clonedConfigurationCustomOptions.defaultPrintOption !== "" &&
        this._clonedConfigurationCustomOptions.defaultPrintOption !== null &&
        this._clonedConfigurationCustomOptions.defaultPrintOption !== undefined) {
        this._defaultPrintTemplateDropdownOptionObj.set("value",
          this._clonedConfigurationCustomOptions.defaultPrintOption);
      }
      else {
        this._defaultPrintTemplateDropdownOptionObj.set("value", "Letter ANSI A Portrait");
      }
    },

    /**
    * Function to disble add custom layout button
    * @memberOf Screening/setting/Download
    **/
    _disableAddCustomLayoutButton: function () {
      domClass.add(this.addCustomOptionButton, "esriCTCustomOptionButtonDisable");
      domClass.add(this.addCustomOptionButtonIcon, "esriCTCustomOptionBtnAddIconDisable");
    },

    /**
    * Function to enable add custom layout button
    * @memberOf Screening/setting/Download
    **/
    _enableAddCustomLayoutButton: function () {
      domClass.remove(this.addCustomOptionButton, "esriCTCustomOptionButtonDisable");
      domClass.remove(this.addCustomOptionButtonIcon, "esriCTCustomOptionBtnAddIconDisable");
    },

    /**
    * Function to fetch choice list
    * @memberOf Screening/setting/Download
    **/
    _fetchChoiceList: function () { // 1
      this.loadingIndicator.show();
      esriRequest({
        url: this._printTaskURL,
        content: {
          f: "json"
        },
        handleAs: "json",
        callbackParamName: "callback"
      }).then(lang.hitch(this, function (response) {
        this._extractChoiceList(response);
        this._createCustomOptionDropdownList();
        if (this._customDropdownOption.length > 0) {
          this._checkBuddyTask(response);
        } else {
          this._disableAddCustomLayoutButton();
          this._addDefaultPrintTemplateOptions();
          this.loadingIndicator.hide();
        }
      }), lang.hitch(this, function () {
        this._showMessage(this.nls.downloadTab.errorMessages.failtofetchChoiceList);
        this.loadingIndicator.hide();
      }));
    },

    /**
    * Function to extract choice list
    * @param {response} contains response of choice list
    * @memberOf Screening/setting/Download
    **/
    _extractChoiceList: function (response) { // 2
      array.forEach(response.parameters, lang.hitch(this, function (parameter) {
        if (parameter.name === "Layout_Template" && parameter.displayName === "Layout Template") {
          this._printServiceChoiceList = parameter.choiceList;
        }
      }));
    },

    /**
    * Function to check buddy task
    * @memberOf Screening/setting/Download
    **/
    _checkBuddyTask: function () { // 3
      esriRequest({
        url: this._printTaskURL.slice(0, this._printTaskURL.lastIndexOf('/')),
        content: {
          f: "json"
        },
        handleAs: "json",
        callbackParamName: "callback"
      }).then(lang.hitch(this, function (gpserverResponse) {
        if (gpserverResponse.tasks.length > 1) {
          var buddyTaskEndPoint;
          for (var i = 0; i < gpserverResponse.tasks.length; i++) {
            if (this._buddyTaskEndPoint.indexOf(gpserverResponse.tasks[i]) !== -1) {
              buddyTaskEndPoint = gpserverResponse.tasks[i];
              break;
            }
          }
          if (buddyTaskEndPoint) {
            this._executeBuddyTaskSync(buddyTaskEndPoint);
          } else if (this._customDropdownOption.length > 0) {
            this._enableAddCustomLayoutButton();
            this._displayChoiceList();
            this.loadingIndicator.hide();
          } else {
            this._disableAddCustomLayoutButton();
            this.loadingIndicator.hide();
          }
        } else if (this._customDropdownOption.length > 0) {
          this._enableAddCustomLayoutButton();
          this._displayChoiceList();
          this.loadingIndicator.hide();
        } else {
          this._disableAddCustomLayoutButton();
          this._addDefaultPrintTemplateOptions();
          this.loadingIndicator.hide();
        }
      }), lang.hitch(this, function () {
        this._showMessage(this.nls.downloadTab.errorMessages.failtofetchbuddyTaskName);
        this.loadingIndicator.hide();
      }));
    },

    /**
    * Function to execute buddy task sync to display choice list or
    * disable add custom layout button depending upon response
    * @param {buddyTaskEndPoint} contains buddy task end point
    * @memberOf Screening/setting/Download
    **/
    _executeBuddyTaskSync: function (buddyTaskEndPoint) { // 4
      esriRequest({
        url: this._printTaskURL.slice(0, this._printTaskURL.lastIndexOf('/')) + "/" +
          buddyTaskEndPoint + "/" + "execute",
        content: {
          f: "json",
          outSR: 102100
        },
        handleAs: "json",
        callbackParamName: "callback"
      }).then(lang.hitch(this, function (buddyTaskResponse) {
        if (buddyTaskResponse.results[0].value.length > 0) {
          this._enableAddCustomLayoutButton();
          array.forEach(buddyTaskResponse.results[0].value, lang.hitch(this, function (value) {
            this._buddyTaskChoiceList[value.layoutTemplate] = value;
          }));
          this._displayChoiceList();
          this.loadingIndicator.hide();
        } else {
          this._disableAddCustomLayoutButton();
          this.loadingIndicator.hide();
        }
      }), lang.hitch(this, function () {
        this._showMessage(this.nls.downloadTab.errorMessages.failtofetchbuddyTaskDimension);
        this.loadingIndicator.hide();
      }));
    },

    /**
    * Function to display choice list
    * @memberOf Screening/setting/Download
    **/
    _displayChoiceList: function () { // 5
      this._createCustomLayoutTable();
      if (this._clonedConfigurationCustomOptions && this._clonedConfigurationCustomOptions.customOptions &&
        this._clonedConfigurationCustomOptions.customOptions.length > 0) {
        this._addConfiguredCustomOptionsInTable();
      }
      this._addDefaultPrintTemplateOptions();
    },

    /**
    * Function to create custom layout options table
    * @memberOf Screening/setting/Download
    **/
    _createCustomLayoutTable: function () { // 6
      var fields, fieldTableParameters;
      fields = [{
        name: 'field',
        title: 'Layout',
        type: 'empty',
        editable: 'false',
        width: '40%'
      }, {
        name: 'field',
        title: 'Width',
        type: 'empty',
        editable: 'true',
        width: '15%'
      }, {
        name: 'field',
        title: 'Height',
        type: 'empty',
        editable: 'true',
        width: '15%'
      }, {
        name: 'field',
        title: 'Page Units',
        type: 'empty',
        editable: 'false',
        width: '20%'
      }, {
        name: 'actions',
        title: this.nls.common.actions,
        "class": 'actions',
        type: 'actions',
        actions: ['up', 'down', 'delete'],
        width: '10%'
      }];
      fieldTableParameters = {
        fields: fields
      };
      this._customLayoutTable = new SimpleTable(fieldTableParameters);
      this._customLayoutTable.placeAt(this.customLayoutTable);
      html.setStyle(this._customLayoutTable.domNode, { 'height': '100%' });
      this._customLayoutTable.startup();
      this.own(on(this._customLayoutTable, 'row-delete', lang.hitch(this, function () {
        this._removeCustomOptionFromDefaultDropdown();
        if (this._customLayoutTable.getRows().length === 0 && this._isCustomOptionNoDefault) {
          this._addOptionsInDefaultDropdown();
        }
        this._addConfiguredCustomOptionInDefaultDropdown();
      })));
    },

    /**
    * Function to add configured custom options in table
    * @memberOf Screening/setting/Download
    **/
    _addConfiguredCustomOptionsInTable: function () { // 7
      array.forEach(this._clonedConfigurationCustomOptions.customOptions,
        lang.hitch(this, function (configuredCustomOption) {
          this._addFieldsRow(configuredCustomOption, true);
        }));
    },

    /**
    * Function to add custom options in table
    * @memberOf Screening/setting/Download
    **/
    _addCustomOptionsInTable: function () { // 7
      var choiceListOption = this._customDropdownOption[0].value, choiceListExists;
      var height, width, pageUnitsValue;
      height = null;
      width = null;
      pageUnitsValue = this._pageSize[0].value;
      if (this._buddyTaskChoiceList[choiceListOption]) {
        height = this._buddyTaskChoiceList[choiceListOption].pageSize[1];
        width = this._buddyTaskChoiceList[choiceListOption].pageSize[0];
        if (this._buddyTaskChoiceList[choiceListOption] && this._buddyTaskChoiceList[choiceListOption].pageUnits) {
          pageUnitsValue = this._buddyTaskChoiceList[choiceListOption].pageUnits;
        }
      }
      var customOption = {};
      customOption[choiceListOption] = {
        "Height": height,
        "Width": width,
        "SizeName": choiceListOption,
        "MapLayout": choiceListOption,
        "PageUnits": pageUnitsValue
      };
      this._addFieldsRow(customOption[choiceListOption], false);

      if (jimuUtils.has('ie') || jimuUtils.has('edge')) {
        array.forEach(this._defaultPrintTemplateDropdownOptionObj.options,
          lang.hitch(this, function (defaultPrintTemplateOption) {
            if (defaultPrintTemplateOption.value === choiceListOption) {
              choiceListExists = defaultPrintTemplateOption;
            }
          }));
      }
      else {
        choiceListExists = this._defaultPrintTemplateDropdownOptionObj.options.find(function (option) {
          return option.value === choiceListOption;
        });
      }

      if (!choiceListExists) {
        this._defaultPrintTemplateDropdownOptionObj.addOption({
          "label": choiceListOption,
          "value": choiceListOption,
          "selected": false
        });
      }
    },

    /**
    * Function to create custom options dropdown list
    * @memberOf Screening/setting/Download
    **/
    _createCustomOptionDropdownList: function () {
      var isDefaultOptionAdded;
      isDefaultOptionAdded = false;

      array.forEach(this._printServiceChoiceList, lang.hitch(this, function (choiceListOptionDetails) {
        var choiceListOption = lang.clone(choiceListOptionDetails);
        if (choiceListOption !== "MAP_ONLY") {
          // default options
          if (this._defaultOptions[choiceListOption]) {
            isDefaultOptionAdded = true;
            var printOption = this._defaultOptions[choiceListOption];
            this._defaultPrintTemplateDropdownOption.push({
              "label": PageUtils.PageSizes[printOption.SizeName].SizeName + " " +
                PageUtils.Orientation[printOption.Orientation].Text,
              "value": choiceListOptionDetails
            });
          }
          // custom options
          if (!(this._defaultOptions[choiceListOption])) {
            this._customDropdownOption.push({
              "value": choiceListOption,
              "label": choiceListOption
            });
          }
        }
      }));
      // configured custom option in default dropdown
      if (this._clonedConfigurationCustomOptions) {
        array.forEach(this._clonedConfigurationCustomOptions.customOptions,
          lang.hitch(this, function (choiceListOption) {
            this._defaultPrintTemplateDropdownOption.push({
              "label": choiceListOption.SizeName,
              "value": choiceListOption.SizeName
            });
          }));
      }
      if (!isDefaultOptionAdded) {
        if (this._customDropdownOption.length > 0) {
          this._isCustomOptionNoDefault = true;
        }
        if (this._clonedConfigurationCustomOptions &&
          this._clonedConfigurationCustomOptions.customOptions &&
          this._clonedConfigurationCustomOptions.customOptions.length > 0) {
          return;
        }
        for (var defaultOption in this._defaultOptions) {
          if (this._defaultOptions.hasOwnProperty(defaultOption)) {
            if (PageUtils.PageSizes[this._defaultOptions[defaultOption].SizeName]) {
              this._defaultPrintTemplateDropdownOption.push({
                "label": defaultOption,
                "value": defaultOption
              });
            }
          }
        }
      }
    },

    /**
    * Function to get values of all custom options entered
    * @memberOf Screening/setting/Download
    **/
    getCustomOptions: function () {
      var customOptionArr;
      customOptionArr = [];
      if (this._customLayoutTable) {
        var tableRows = this._customLayoutTable.getRows();
        array.forEach(tableRows, lang.hitch(this, function (tableRow) {
          customOptionArr.push({
            "SizeName": tableRow.customOptionLayoutDropdownObj.value,
            "Width": tableRow.customOptionWidthTextbox.getValue(),
            "Height": tableRow.customOptionHeightTextbox.getValue(),
            "MapLayout": tableRow.customOptionLayoutDropdownObj.value,
            "PageUnits": tableRow.customOptionPageUnitsDropdownObj.value
          });
        }));
      }
      return customOptionArr;
    },

    /**
    * Function to validate custom layout options for valid width and height
    * and also check for duplicate entries
    * @memberOf Screening/setting/Download
    **/
    validateCustomOptions: function () {
      var customOptionArr, tableRows;
      customOptionArr = [];
      if (this._customLayoutTable) {
        tableRows = this._customLayoutTable.getRows();
        array.forEach(tableRows, lang.hitch(this, function (tableRow) {
          if (!tableRow.customOptionWidthTextbox.isValid()) {
            customOptionArr.push(string.substitute(
              this.nls.downloadTab.errorMessages.invalidLayoutWidth, {
                "customLayoutOptionValue": tableRow.customOptionLayoutDropdownObj.value
              }));
          }
          if (!tableRow.customOptionHeightTextbox.isValid()) {
            customOptionArr.push(string.substitute(
              this.nls.downloadTab.errorMessages.invalidLayoutHeight, {
                "customLayoutOptionValue": tableRow.customOptionLayoutDropdownObj.value
              }));
          }
          if (!tableRow.customOptionPageUnitsDropdownObj.isValid()) {
            customOptionArr.push(string.substitute(
              this.nls.downloadTab.errorMessages.invalidLayoutPageUnits, {
                "customLayoutOptionValue": tableRow.customOptionLayoutDropdownObj.value
              }));
          }
        }));
      }
      if (customOptionArr.length > 0) {
        return customOptionArr;
      }
      array.forEach(tableRows, lang.hitch(this, function (tableRow) {
        customOptionArr.push({
          "SizeName": tableRow.customOptionLayoutDropdownObj.value
        });
      }));
      var duplicateValue = this._getDuplicateValue(customOptionArr);
      if (duplicateValue && duplicateValue.length > 0) {
        customOptionArr = [];
        customOptionArr.push(string.substitute(
          this.nls.downloadTab.errorMessages.duplicateCustomOption, {
            "duplicateValueSizeName": duplicateValue[0].SizeName
          }));
      } else {
        customOptionArr = [];
      }
      return customOptionArr;
    },

    /**
    * Function to get duplicate entries of layout
    * @param {ArrayToTraverse} contains array of layout options object
    * @memberOf Screening/setting/Download
    **/
    _getDuplicateValue: function (arrayToTraverse) {
      var index = 0, results, currentEle, arrayToTraverseLen = arrayToTraverse.length;
      for (index; index < arrayToTraverseLen; index++) {
        currentEle = arrayToTraverse[index];
        var refArrayToTraverse;
        if (jimuUtils.has('ie') || jimuUtils.has('edge')) {
          refArrayToTraverse = Object.create(arrayToTraverse);
        }
        else {
          refArrayToTraverse = Object.assign([], arrayToTraverse);
        }
        refArrayToTraverse.splice(index, 1);
        results = this._filterArray(refArrayToTraverse, currentEle);
        if (results.length > 0) {
          break;
        }
      }
      return results;
    },

    /**
    * Function to filter array of layouts to get duplicate entries of layout
    * @param {refArrayToTraverse} contains array of layout options object except current element
    * @param {currentEle} contains current object of layout to ckeck with other array elements
    * @memberOf Screening/setting/Download
    **/
    _filterArray: function (refArrayToTraverse, currentEle) {
      var results;
      results = refArrayToTraverse.filter(function (entry) {
        return Object.keys(currentEle).every(function (key) {
          return entry[key] === currentEle[key];
        });
      });
      return results;
    },

    /**
    * Function to return default print option
    * @memberOf Screening/setting/Download
    **/
    getDefaultPrintOption: function () {
      return this._defaultPrintTemplateDropdownOptionObj.value;
    },

    /**
   * Function to close all dropdowns under download tab
   * @memberOf Screening/setting/Download
   **/
    closeDownloadTabDropdowns: function () {
      // to close default print layout dropdown
      if (this._defaultPrintTemplateDropdownOptionObj) {
        this._defaultPrintTemplateDropdownOptionObj.closeDropDown();
      }
      var tableRows;
      if (this._customLayoutTable) {
        // to close all custom layout dropdown
        tableRows = this._customLayoutTable.getRows();
        array.forEach(tableRows, lang.hitch(this, function (tableRow) {
          tableRow.customOptionLayoutDropdownObj.closeDropDown();
          tableRow.customOptionPageUnitsDropdownObj.closeDropDown();
        }));
      }
    }
  });
});