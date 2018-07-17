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
  'jimu/dijit/SimpleTable',
  'dojo/on',
  'dojo/_base/array',
  'dojo/query',
  'dojo/dom-construct',
  'dijit/form/Select',
  'dijit/form/ValidationTextBox',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./StatisticsSettings.html',
  'dojo/_base/lang',
  'dojo/store/Memory',
  'dojo/dom-class',
  'dijit/registry',
  'dojo/_base/html',
  'dojo/dom-style'
], function (
  declare,
  BaseWidget,
  SimpleTable,
  on,
  array,
  query,
  domConstruct,
  Select,
  ValidationTextBox,
  _WidgetsInTemplateMixin,
  template,
  lang,
  Memory,
  domClass,
  registry,
  html,
  domStyle
) {
  return declare([BaseWidget, _WidgetsInTemplateMixin], {
    templateString: template,

    baseClass: 'jimu-widget-cost-analysis-statistics-settings',

    _layerNameStore: null, // layer name store
    _commonStatisticsStoreOption: null, // common statistics type store options
    _polygonStatisticsStoreOption: null, // polygon statistics type store options
    _polylineStatisticsStoreOption: null, // polyline statistics type store options
    _pointLayerStatisticsStore: null, // point statistics store
    _polygonLayerStatisticsStore: null, // polygon statistics store
    _polylineLayerStatisticsStore: null, // polyline statistics store
    _layerFieldStore: {}, // layer field store
    _shapeFields: ["shape_length", "shape_area", "shape__length",
      "shape__area", "shape.len", "shape.area"], // filter out shape fields

    constructor: function (options) {
      lang.mixin(this, options);
    },

    postMixInProperties: function () {
      this.nls.common = {};
      lang.mixin(this.nls.common, window.jimuNls.common);
    },

    postCreate: function () {
      this._layerNameStore = null;
      this._commonStatisticsStoreOption = null;
      this._polygonStatisticsStoreOption = null;
      this._polylineStatisticsStoreOption = null;
      this._pointLayerStatisticsStore = null;
      this._polygonLayerStatisticsStore = null;
      this._polylineLayerStatisticsStore = null;
      this._layerFieldStore = {};
      this.inherited(arguments);
      this._init();
      this._handleClickEvent();
    },

    /**
     * This function is used handle all click events
     * @memberOf setting/StatisticsSettings
     */
    _handleClickEvent: function () {
      this._addButtonClick();
      this._crossButtonClick();
      this._upButtonClick();
      this._downButtonClick();
    },

    /**
     * This function is used to initialize the process of statistics tab
     * @memberOf setting/StatisticsSettings
     */
    _init: function () {
      this._createStatisticsStoreOptions();
      this._createStatisticsTable();
      //Create store on app load and keep updating it when setting changes from other tabs
      if (!this._layerNameStore) {
        this._createLayerNameStore();
      }
      this._attachNodeEvents();
      this._setConfig();
      this._displayAddStatisticsButtonOrLabel();
      this._handleActionButtonVisibility();
    },

    /**
     * This function is used to display add statistics label or button
     * @memberOf setting/StatisticsSettings
     */
    _displayAddStatisticsButtonOrLabel: function () {
      if (this.showActionButtonsInColumn) {
        domClass.remove(this.btnAddStatisticsNodeWrapper, "esriCTHidden");
      } else {
        domClass.add(this.btnAddStatisticsNodeWrapper, "esriCTHidden");
      }
    },

    /**
     * This function is used to set the config
     * @memberOf setting/StatisticsSettings
     */
    _setConfig: function () {
      if (this.config &&
        this.config.statisticsSettings && this.config.statisticsSettings.length > 0) {
        array.forEach(this.config.statisticsSettings, lang.hitch(this, function (statistics) {
          this._addLayerRow(statistics);
        }));
      }
    },

    /**
     * This function is used to get the config
     * @memberOf setting/StatisticsSettings
     */
    getConfig: function () {
      var tableRows, statisticsConfiguredFieldObj, configuredStatisticsArr;
      tableRows = this._statisticsLayerTable.getRows();
      configuredStatisticsArr = [];
      array.forEach(tableRows, lang.hitch(this, function (tableRow) {
        configuredStatisticsArr.push(
          statisticsConfiguredFieldObj = {
            "id": tableRow.layerNameDropDown.getValue(),
            "type": tableRow.statisticsTypeDropdown.getValue(),
            "field": tableRow.layerFieldDropdown.getValue(),
            "label": tableRow.statisticsLabelTextBox.getValue()
          });
      }));
      return configuredStatisticsArr;
    },

    /**
     * This function is used to create statistics store options for different type of geometry
     * @memberOf setting/StatisticsSettings
     */
    _createStatisticsStoreOptions: function () {
      // common store options
      this._commonStatisticsStoreOption = [{
        name: this.nls.statisticsType.averageLabel, value: "avg"
      }, {
        name: this.nls.statisticsType.countLabel, value: "count"
      }, {
        name: this.nls.statisticsType.maxLabel, value: "max"
      }, {
        name: this.nls.statisticsType.minLabel, value: "min"
      }, {
        name: this.nls.statisticsType.summationLabel, value: "sum"
      }];
      // polygon store option
      this._polygonStatisticsStoreOption = [{
        name: this.nls.statisticsType.areaLabel, value: "area"
      }];
      // polyline store option
      this._polylineStatisticsStoreOption = [{
        name: this.nls.statisticsType.lengthLabel, value: "length"
      }];
    },

    /**
     * This function is used to attach events to different html elements
     * @memberOf setting/StatisticsSettings
     */
    _attachNodeEvents: function () {
      if (this._layerNameStore.data.length === 0) {
        domClass.remove(this.noEditableLayersAvailable,
          "esriCTHidden");
        domClass.add(this.btnAddStatisticsNodeWrapper, "esriCTHidden");
        domClass.add(this.statisticsLayerTableNode, "esriCTHidden");
      }
      else {
        domClass.add(this.noEditableLayersAvailable,
          "esriCTHidden");
        domClass.remove(this.btnAddStatisticsNodeWrapper, "esriCTHidden");
        domClass.remove(this.statisticsLayerTableNode, "esriCTHidden");
      }
      this.own(on(this.btnAddStatisticsNode, 'click',
        lang.hitch(this, function () {
          //If layer exist, then only add the row in statistics table
          if (this._layerNameStore.data.length) {
            this._addStatisticsBtnClicked();
            this.resetAddNewStatisticsDropdown();
          }
        })));
    },

    /**
     * This function is used to create table for adding new statistics
     * @memberOf setting/StatisticsSettings
     */
    _createStatisticsTable: function () {
      var args, fields, tableCheckboxheaderLabel;
      fields = [{
        name: 'editable',
        title: this.nls.statisticsSettings.selectDeselectAllTitle,
        type: 'checkbox',
        editable: false,
        width: (this.showActionButtonsInRow) ? '16px' : '0%',
        hidden: !this.showActionButtonsInRow
      }, {
        name: 'field',
        title: this.nls.common.layer,
        type: 'empty',
        editable: false,
        width: '30%'
      }, {
        name: 'field',
        title: this.nls.common.type,
        type: 'empty',
        editable: true,
        width: (this.showActionButtonsInRow) ? '19%' : '18%'
      }, {
        name: 'field',
        title: this.nls.statisticsSettings.fieldNameTitle,
        type: 'empty',
        editable: false,
        width: '22%'
      }, {
        name: 'field',
        title: this.nls.statisticsSettings.statisticsTitle,
        type: 'empty',
        editable: false,
        width: (this.showActionButtonsInRow) ? '55px' : '20%'
      }, {
        name: 'actions',
        title: this.nls.common.actions,
        width: '10%',
        type: 'actions',
        actions: ['up', 'down', 'delete'],
        hidden: !this.showActionButtonsInColumn
      }];
      args = {
        fields: fields,
        selectable: false
      };
      this._statisticsLayerTable = new SimpleTable(args);
      this._statisticsLayerTable.placeAt(this.statisticsLayerTableNode);
      this._statisticsLayerTable.startup();
      tableCheckboxheaderLabel = query('.esriCTAddLayerTableNode th .label')[0];
      if (tableCheckboxheaderLabel) {
        domClass.add(tableCheckboxheaderLabel, "esriCTHidden");
      }
    },


    /**
   * This function is used to create table for adding new statistics
   * @memberOf setting/StatisticsSettings
   */
    _addButtonClick: function () {
      if (this.showActionButtonsInRow === true) {
        domClass.remove(this.btnAddNode, "esriCTHidden");
        this.own(on(this.btnAddNode, 'click', lang.hitch(this, function () {
          //If layer exist, then only add the row in statistics table
          if (this._layerNameStore.data.length) {
            this._addStatisticsBtnClicked();
            this._handleActionButtonVisibility();
            this.resetAddNewStatisticsDropdown();
          }
        })));
      } else {
        domClass.add(this.btnAddNode, "esriCTHidden");
      }
    },

    /**
   * This function is used to create table for adding new statistics
   * @memberOf setting/StatisticsSettings
   */
    _crossButtonClick: function () {
      domClass.remove(this.btnCrossNode, "esriCTHidden");
      this.own(on(this.btnCrossNode, 'click', lang.hitch(this, this._deleteLayerRow)));
    },

    /**
     * This function is used to move up selected row
     * @memberOf setting/StatisticsSettings
     */
    _upButtonClick: function () {
      domClass.remove(this.btnUpNode, "esriCTHidden");
      this.own(on(this.btnUpNode, 'click', lang.hitch(this, function () {
        var tr, trs;
        trs = this._statisticsLayerTable.getRows();
        var tableRowsData = this._statisticsLayerTable.getData();
        array.forEach(tableRowsData, lang.hitch(this, function (tableRowData, index) {
          if (tableRowData.editable) {
            tr = trs[index];
          }
        }));
        if (!this._statisticsLayerTable.onBeforeRowUp(tr)) {
          return;
        }
        var index = array.indexOf(trs, tr);
        if (index > 0) {
          var newIndex = index - 1;
          var trRef = trs[newIndex];
          if (trRef) {
            html.place(tr, trRef, 'before');
            this._statisticsLayerTable.updateUI();
            this._statisticsLayerTable.emit('row-up', tr);
          }
        }
      })));
    },

    /**
     * This function is used to move down selected row
     * @memberOf setting/StatisticsSettings
     */
    _downButtonClick: function () {
      domClass.remove(this.btnDownNode, "esriCTHidden");
      this.own(on(this.btnDownNode, 'click', lang.hitch(this, function () {
        var tr, trs;
        trs = this._statisticsLayerTable.getRows();
        var tableRowsData = this._statisticsLayerTable.getData();
        array.forEach(tableRowsData, lang.hitch(this, function (tableRowData, index) {
          if (tableRowData.editable) {
            tr = trs[index];
          }
        }));
        if (!this._statisticsLayerTable.onBeforeRowDown(tr)) {
          return;
        }
        var index = array.indexOf(trs, tr);
        if (index < trs.length - 1) {
          var newIndex = index + 1;
          var trRef = trs[newIndex];
          if (trRef) {
            html.place(tr, trRef, 'after');
            this._statisticsLayerTable.updateUI();
            this._statisticsLayerTable.emit('row-down', tr);
          }
        }
      })));
    },

    /**
     * This function is used to delete layer row
     * @memberOf setting/StatisticsSettings
    */
    _deleteLayerRow: function () {
      var tableRows = this._statisticsLayerTable.getRows();
      var tableRowsData = this._statisticsLayerTable.getData();
      var checkBoxNode;
      array.forEach(tableRowsData, lang.hitch(this, function (tableRowData, index) {
        if (tableRowData.editable) {
          this._statisticsLayerTable.deleteRow(tableRows[index]);
        }
      }));
      if (this._statisticsLayerTable.getRows().length === 0) {
        checkBoxNode = query("th .checkbox")[0];
        if (domClass.contains(checkBoxNode, "checked")) {
          domClass.remove(checkBoxNode, "checked");
        }
      }
      this._handleActionButtonVisibility();
    },

    /**
     * This function is used to check the edit capability of a layer
     * @memberOf setting/StatisticsSettings
     */
    _checkEditCapabilities: function (featureLayer) {
      var layerCapabilities;
      layerCapabilities = featureLayer && featureLayer.capabilities ?
        featureLayer.capabilities : null;
      //Check if layer is editable and it has valid global id field
      if (layerCapabilities && layerCapabilities.indexOf("Delete") !== -1 &&
        layerCapabilities.indexOf("Create") !== -1 &&
        layerCapabilities.indexOf("Update") !== -1 && featureLayer.globalIdField) {
        return true;
      }
      else {
        return false;
      }
    },

    /**
     * This function is used to add a row on click of add statistics button
     * @memberOf setting/StatisticsSettings
     */
    _addStatisticsBtnClicked: function () {
      var parentCheckBox;
      this._addLayerRow();
      parentCheckBox = query(".simple-table-title .jimu-checkbox", this.domNode)[0];
      on(registry.byNode(parentCheckBox), "change", lang.hitch(this, function () {
        setTimeout(lang.hitch(this, function () {
          this._handleActionButtonVisibility();
        }), 0);
      }));
    },

    /**
     * This function is used to handle the state of add, delete, up and down buttons
     * @memberOf widgets/CostAnalysis/StatisticsSettings
     */
    _handleActionButtonVisibility: function () {
      var tableRows, editableRowCheckbox, editableRowCount = 0, editableHeaderCheckbox, editableHeaderCheckboxNode;
      tableRows = this._statisticsLayerTable.getRows();
      editableHeaderCheckbox = query(".simple-table-title .jimu-checkbox", this.domNode)[0];
      editableHeaderCheckboxNode = registry.byNode(editableHeaderCheckbox);
      array.some(this._statisticsLayerTable.getRows(), lang.hitch(this, function (row) {
        //Fetch checkbox in each row and check wether it is selected or not
        editableRowCheckbox = query(".jimu-checkbox", row)[0];
        if (registry.byNode(editableRowCheckbox).checked) {
          editableRowCount++;
        }
      }));
      //Enable delete button if at least one row is selected
      if (editableRowCount === 0) {
        domClass.replace(this.btnCrossNode, "esriCTDeleteStatisticsIconDisable",
          "esriCTDeleteStatisticsIcon");
      } else {
        domClass.replace(this.btnCrossNode, "esriCTDeleteStatisticsIcon",
          "esriCTDeleteStatisticsIconDisable");
      }
      //Enable up and down buttons when only one valid rows or is selected
      if (tableRows && editableRowCount === 1) {
        domClass.replace(this.btnUpNode, "esriCTStatisticsUpIcon", "esriCTStatisticsUpIconDisable");
        domClass.replace(this.btnDownNode, "esriCTStatisticsDownIcon",
          "esriCTStatisticsDownIconDisable");
      } else {
        domClass.replace(this.btnUpNode, "esriCTStatisticsUpIconDisable", "esriCTStatisticsUpIcon");
        domClass.replace(this.btnDownNode, "esriCTStatisticsDownIconDisable",
          "esriCTStatisticsDownIcon");
      }
      //If all the rows are deleted then un-check and disable the header checkbox
      if (tableRows.length === 0) {
        editableHeaderCheckboxNode.set('status', false);
        domClass.add(editableHeaderCheckboxNode.domNode, "jimu-state-disabled");
      } else {
        editableHeaderCheckboxNode.set('status', true);
        domClass.remove(editableHeaderCheckboxNode.domNode, "jimu-state-disabled");
      }
    },

    /**
     * This function is used to add a row on selection of editable layer in layer settings tab
     * @memberOf setting/StatisticsSettings
     */
    _addLayerRow: function (statistics) {
      var editableLayerRow, fieldsColumn, editableCheckBox;
      editableLayerRow = this._statisticsLayerTable.addRow({});
      fieldsColumn = query('.simple-table-cell', editableLayerRow.tr);
      editableCheckBox = query(".simple-table-cell .jimu-checkbox", editableLayerRow.tr)[0];
      if (fieldsColumn) {
        if (editableCheckBox) {
          on(registry.byNode(editableCheckBox), "change", lang.hitch(this, function () {
            this._handleActionButtonVisibility();
          }));
        }
        editableLayerRow = editableLayerRow.tr;
        this._addLayerNameDropdown(fieldsColumn[1], editableLayerRow, statistics);
        this._addStatisticsDropdown(fieldsColumn[2], editableLayerRow, statistics);
        this._addLayerFieldDropdown(fieldsColumn[3], editableLayerRow, statistics);
        this._addStatisticsLabelTextBox(fieldsColumn[4], editableLayerRow, statistics);
      }
    },

    /**
     * This function is used change statistics type & field dropdown on change of layer name
     * @memberOf setting/StatisticsSettings
     */
    _onLayerNameChange: function (evt, editableLayerRow, statistics) {
      var selectedLayerGeometry, statisticsTypeStore, selectedLayerID, selectedStatisticsType;
      if (this._layerNameStore.data.length) {
        selectedLayerGeometry =
          this._layerNameStore.data[this._layerNameStore.index[evt]].geometryType;
        statisticsTypeStore = this._getStatisticsTypeStore(selectedLayerGeometry);
        editableLayerRow.statisticsTypeDropdown.setStore(statisticsTypeStore);
        if (statistics && statistics.type) {
          editableLayerRow.statisticsTypeDropdown.set('value', statistics.type);
        }
        selectedStatisticsType = editableLayerRow.statisticsTypeDropdown.getValue();
        selectedLayerID = this._layerNameStore.data[this._layerNameStore.index[evt]].value;
        if (!this._layerFieldStore[selectedLayerID]) {
          this._createFieldStore(selectedLayerID);
        }
        editableLayerRow.layerFieldDropdown.setStore(this._layerFieldStore[selectedLayerID]);
        editableLayerRow.layerFieldDropdown.reset();
        this._onStatisticsTypeChange(selectedStatisticsType, editableLayerRow);
      }
    },

    /**
     * This function is used enable/disable layer field dropdown on change of statistics type
     * @memberOf setting/StatisticsSettings
     */
    _onStatisticsTypeChange: function (evt, editableLayerRow, statistics) {
      if (evt === "count" || evt === "length" || evt === "area") {
        domClass.add(editableLayerRow.layerFieldDropdown.domNode, "esriCTHidden");
      } else {
        domClass.remove(editableLayerRow.layerFieldDropdown.domNode, "esriCTHidden");
        if (statistics && statistics.field) {
          editableLayerRow.layerFieldDropdown.set('value', statistics.field);
        }
      }
      this._resetStatisticsTypeWidth(editableLayerRow);
    },

    /**
     * This function is used to add layer name dropdown
     * @memberOf setting/StatisticsSettings
     */
    _addLayerNameDropdown: function (fieldsColumn, editableLayerRow, statistics) {
      var dropDownContainer;
      dropDownContainer = domConstruct.create("div", {
        "class": "esriCTDropDownContainer"
      }, fieldsColumn);
      editableLayerRow.layerNameDropDown = new Select({
        name: "layerSelect",
        store: this._layerNameStore,
        labelAttr: "name",
        "class": "esriCTLayerNameDropdown"
      }, dropDownContainer);
      if (statistics && statistics.id) {
        editableLayerRow.layerNameDropDown.set('value', statistics.id);
      }
      // This function is used to reset the width of layer name dropdown on
      // click of its arrow button
      this.own(on(editableLayerRow.layerNameDropDown, "click",
        lang.hitch(this, function () {
          this._resetLayerNameWidth(editableLayerRow);
        })));
      this.own(on(editableLayerRow.layerNameDropDown, "change",
        lang.hitch(this, function (evt) {
          // This function is used to reset the width of layer name dropdown
          // after selecting its option
          this._resetLayerNameWidth(editableLayerRow);
          this._onLayerNameChange(evt, editableLayerRow, statistics);
        })));
      editableLayerRow.layerNameDropDown.startup();
    },

    /**
     * This function is used to store layerName
     * @memberOf setting/StatisticsSettings
     */
    _createLayerNameStore: function () {
      var featureLayersArr, featureLayers, layersAdded = [];
      featureLayersArr = [];
      layersAdded = [
        this.config.projectSettings.costingGeometryLayer || "",
        this.config.projectSettings.projectLayer || ""
      ];
      if (this.config.layerSettings.length) {
        featureLayers = this.config.layerSettings;
        array.forEach(featureLayers, lang.hitch(this, function (featureLayer) {
          var geometryType = this._getFeatureLayerGeometryType(featureLayer.id);
          if (featureLayer.editable && geometryType) {
            layersAdded.push(featureLayer.id);
            featureLayersArr.push({
              name: featureLayer.title,
              value: featureLayer.id,
              geometryType: geometryType
            });
          }
        }));
      }
      featureLayers = this.map.webMapResponse.itemInfo.itemData.operationalLayers;
      array.forEach(featureLayers, lang.hitch(this, function (featureLayer) {
        if (featureLayer.layerType === "ArcGISFeatureLayer" &&
          this._checkEditCapabilities(featureLayer.layerObject) &&
          layersAdded.indexOf(featureLayer.id) === -1) {
          featureLayersArr.push({
            name: featureLayer.title,
            value: featureLayer.id,
            geometryType: featureLayer.resourceInfo.geometryType
          });
        }
      }));
      this._layerNameStore = new Memory({ idProperty: "value", data: featureLayersArr });
      this._updateLayerNameOptions();
    },

    /**
    * This function is used to update layer name options
    * @memberOf setting/StatisticsSettings
    */
    _updateLayerNameOptions: function () {
      var layerNameDropdowns, prevLayerNameValue;
      layerNameDropdowns = query('.esriCTLayerNameDropdown', this.domNode);
      array.forEach(layerNameDropdowns, lang.hitch(this,
        function (layerNameDropdown) {
          //functionality to update each layer name dropdown options
          prevLayerNameValue = registry.byNode(layerNameDropdown).get('value');
          registry.byNode(layerNameDropdown).set('store', this._layerNameStore);
          registry.byNode(layerNameDropdown).set('value', prevLayerNameValue);
        }));
      if (this._layerNameStore.data.length === 0) {
        domClass.remove(this.noEditableLayersAvailable,
          "esriCTHidden");
        domClass.add(this.btnAddStatisticsNodeWrapper, "esriCTHidden");
        domClass.add(this.statisticsLayerTableNode, "esriCTHidden");
      }
      else {
        domClass.add(this.noEditableLayersAvailable,
          "esriCTHidden");
        domClass.remove(this.btnAddStatisticsNodeWrapper, "esriCTHidden");
        domClass.remove(this.statisticsLayerTableNode, "esriCTHidden");
      }
    },

    /**
     * This function is used to get geometryType of updated layer
     * @memberOf setting/StatisticsSettings
     */
    _getFeatureLayerGeometryType: function (featureLayerId) {
      var featureLayers;
      featureLayers = this.map.webMapResponse.itemInfo.itemData.operationalLayers;
      var filteredLayer = array.filter(featureLayers, lang.hitch(this, function (featureLayer) {
        return featureLayerId === featureLayer.id;
      }));
      if (filteredLayer.length && filteredLayer[0].layerObject) {
        return filteredLayer[0].layerObject.geometryType;
      }
      return null;
    },

    /**
     * This function is used to create statistics type store
     * @memberOf setting/StatisticsSettings
     */
    _createStatisticsTypeStore: function () {
      if (!this._pointLayerStatisticsStore &&
        !this._polygonLayerStatisticsStore && !this._polylineLayerStatisticsStore) {
        this._createPointGeometryStatisticsStore();
        this._createPolygonGeometryStatisticsStore();
        this._createPolylineGeometryStatisticsStore();
      }
    },

    /**
     * This function is used to get the statistics type store
     * @memberOf setting/StatisticsSettings
     */
    _getStatisticsTypeStore: function (selectedLayerGeometry) {
      switch (selectedLayerGeometry) {
        case "esriGeometryPolygon":
          return this._polygonLayerStatisticsStore;
        case "esriGeometryPolyline":
          return this._polylineLayerStatisticsStore;
        case "esriGeometryPoint":
          return this._pointLayerStatisticsStore;
      }
    },

    /**
     * This function is used to add dropdown for second column
     * @memberOf setting/StatisticsSettings
     */
    _addStatisticsDropdown: function (fieldsColumn, editableLayerRow, statistics) {
      var dropDownContainer, statisticsTypeStore, selectedLayer, selectedLayerGeometry;
      dropDownContainer = domConstruct.create("div", {
        "class": "esriCTDropDownContainer"
      }, fieldsColumn);
      this._createStatisticsTypeStore();
      selectedLayer = editableLayerRow.layerNameDropDown._getSelectedOptionsAttr();
      selectedLayerGeometry = selectedLayer.item.geometryType;
      statisticsTypeStore = this._getStatisticsTypeStore(selectedLayerGeometry);
      editableLayerRow.statisticsTypeDropdown = new Select({
        name: "statisticsTypeSelect",
        store: statisticsTypeStore,
        labelAttr: "name",
        "class": "esriCTStatisticsTypeDropdown"
      }, dropDownContainer);
      // This function is used to reset the width of statistics type dropdown
      // on click of its arrow button
      this.own(on(editableLayerRow.statisticsTypeDropdown, 'click',
        lang.hitch(this, function () {
          this._resetStatisticsTypeWidth(editableLayerRow);
        })));
      this.own(on(editableLayerRow.statisticsTypeDropdown, 'change',
        lang.hitch(this, function (evt) {
          // This function is used to reset the width of statistics type dropdown
          // after selecting its option
          this._resetStatisticsTypeWidth(editableLayerRow);
          this._onStatisticsTypeChange(evt, editableLayerRow, statistics);
        })));
      editableLayerRow.statisticsTypeDropdown.startup();
    },

    /**
     * This function is used to store statistics for point geometry
     * @memberOf setting/StatisticsSettings
     */
    _createPointGeometryStatisticsStore: function () {
      this._pointLayerStatisticsStore = new Memory({
        idProperty: "value",
        data: this._commonStatisticsStoreOption
      });
    },

    /**
     * This function is used to store statistics for polygon geometry
     * @memberOf setting/StatisticsSettings
     */
    _createPolygonGeometryStatisticsStore: function () {
      this._polygonLayerStatisticsStore = new Memory({
        idProperty: "value",
        data: this._commonStatisticsStoreOption.concat(this._polygonStatisticsStoreOption)
      });
    },

    /**
     * This function is used to store statistics for polyline geometry
     * @memberOf setting/StatisticsSettings
     */
    _createPolylineGeometryStatisticsStore: function () {
      this._polylineLayerStatisticsStore = new Memory({
        idProperty: "value",
        data: this._commonStatisticsStoreOption.concat(this._polylineStatisticsStoreOption)
      });
    },

    /**
     * This function is used to create field store
     * @memberOf setting/StatisticsSettings
     */
    _createFieldStore: function (selectedLayerID) {
      var fieldOptionsArr, validFieldDataTypeArr;
      fieldOptionsArr = [];
      validFieldDataTypeArr = ["esriFieldTypeDouble", "esriFieldTypeInteger",
        "esriFieldTypeSmallInteger", "esriFieldTypeSmallFloat"];
      if (!this._layerFieldStore[selectedLayerID]) {
        array.forEach(this.map._layers[selectedLayerID].fields,
          lang.hitch(this, function (field) {
            if (validFieldDataTypeArr.indexOf(field.type) > -1 &&
              this._shapeFields.indexOf(field.name.toLowerCase()) === -1) {
              fieldOptionsArr.push({
                "name": field.alias || field.name,
                "value": field.name
              });
            }
          }));
        if (fieldOptionsArr.length === 0) {
          fieldOptionsArr.push({
            "name": "&nbsp",
            "value": null
          });
        }
        this._layerFieldStore[selectedLayerID] = new Memory({
          idProperty: "value", data: fieldOptionsArr
        });
      }
    },

    /**
     * This function is used to add field dropdown
     * @memberOf setting/StatisticsSettings
     */
    _addLayerFieldDropdown: function (fieldsColumn, editableLayerRow) {
      var dropDownContainer, selectedLayer, selectedLayerID, selectedStatisticsType;
      dropDownContainer = domConstruct.create("div", {
        "class": "esriCTDropDownContainer"
      }, fieldsColumn);
      selectedLayer = editableLayerRow.layerNameDropDown._getSelectedOptionsAttr();
      selectedLayerID = selectedLayer.value;
      this._createFieldStore(selectedLayerID);
      editableLayerRow.layerFieldDropdown = new Select({
        name: "layerFieldDropdown",
        store: this._layerFieldStore[selectedLayerID],
        labelAttr: "name",
        "class": "esriCTStatisticsFieldDropdown"
      }, dropDownContainer);
      // This function is used to reset the width of layer field dropdown
      // on click of its arrow button
      this.own(on(editableLayerRow.layerFieldDropdown, "click",
        lang.hitch(this, function () {
          this._resetLayerFieldWidth(editableLayerRow);
        })));
      // This function is used to reset the width of layer field dropdown after selecting its option
      this.own(on(editableLayerRow.layerFieldDropdown, "change",
        lang.hitch(this, function () {
          this._resetLayerFieldWidth(editableLayerRow);
        })));
      editableLayerRow.layerFieldDropdown.startup();
      selectedStatisticsType = editableLayerRow.statisticsTypeDropdown.getValue();
      this._onStatisticsTypeChange(selectedStatisticsType, editableLayerRow);
    },

    /**
     * This function is used to add statistics label textbox
     * @memberOf setting/StatisticsSettings
     */
    _addStatisticsLabelTextBox: function (fieldsColumn, editableLayerRow, statistics) {
      var textBoxContainer;
      textBoxContainer = domConstruct.create("div", {
        "class": "esriCTTextBoxContainer"
      }, fieldsColumn);
      editableLayerRow.statisticsLabelTextBox = new ValidationTextBox({
        "class": "esriCTLayerLabelTextBox"
      }, textBoxContainer);
      if (statistics && statistics.label) {
        editableLayerRow.statisticsLabelTextBox.set('value', statistics.label);
      }
      editableLayerRow.statisticsLabelTextBox.startup();
    },

    /**
    * This function is used to update costing info tab data
    * @memberOf setting/CostingInfo
    */
    _updateStatisticsTable: function (updatedRowDetails) {
      var layerInfo, tableRows, layerIdToBeAdded, layerIdToBeRemoved;
      //If layer setting is changed
      if (updatedRowDetails.layerId) {
        if (updatedRowDetails.editable) {
          layerIdToBeAdded = updatedRowDetails.layerId;
        } else {
          layerIdToBeRemoved = updatedRowDetails.layerId;
        }
      }
      else {
        //If project settings is changed
        layerIdToBeAdded = updatedRowDetails.lastSelectedId;
        layerIdToBeRemoved = updatedRowDetails.currentSelectedLayerId;
      }
      //If row needs to be removed, remove it from table and update store
      if (layerIdToBeRemoved) {
        tableRows = this._statisticsLayerTable.getRows();
        array.forEach(tableRows, lang.hitch(this, function (tableRow) {
          if (tableRow.layerNameDropDown &&
            (tableRow.layerNameDropDown.get('value') === layerIdToBeRemoved)) {
            this._statisticsLayerTable.deleteRow(tableRow);
          }

        }));
        //Remove element from store with layer id
        this._layerNameStore.remove(layerIdToBeRemoved);
      }
      //If row needs to be added, add it and update store
      if (layerIdToBeAdded && layerIdToBeRemoved !== "") {
        layerInfo = this.layerInfosObj.getLayerInfoById(layerIdToBeAdded).layerObject;
        //Add new element in store
        this._layerNameStore.put({
          name: layerInfo.name,
          value: layerIdToBeAdded,
          geometryType: layerInfo.geometryType
        });
      }
      //Update all drop down's
      this._updateLayerNameOptions();
    },

    /**
     * This function is used to reset the width of layer name, type and field dropdown(span element)
     * on initial load and resize of a widget.
     * @memberOf setting/StatisticsSettings
     */
    resetAddNewStatisticsDropdown: function () {
      var headers, layerHeader, typeHeader, fieldHeader, layerNameDrpDwnArr, typeHeaderDrpDwnArr,
        fieldHeaderDrpDwnArr, extraWhiteSpace;
      headers =
        query('.simple-table-field.field', this._statisticsLayerTable.domNode);
      if (headers) {
        if (headers[0]) {
          layerHeader = domStyle.getComputedStyle(headers[0]);
        }
        if (headers[1]) {
          typeHeader = domStyle.getComputedStyle(headers[1]);
        }
        if (headers[2]) {
          fieldHeader = domStyle.getComputedStyle(headers[2]);
        }
      }
      layerNameDrpDwnArr =
        query('.esriCTLayerNameDropdown', this._statisticsLayerTable.domNode);
      array.forEach(layerNameDrpDwnArr, lang.hitch(this, function (layerNameDrpDwn) {
        var layerNameDrpDwnSpan;
        layerNameDrpDwnSpan =
          query('.dijitReset.dijitInline.dijitSelectLabel.dijitValidationTextBoxLabel',
            layerNameDrpDwn);
        if (layerNameDrpDwnSpan && layerNameDrpDwnSpan[0]) {
          if (this.showActionButtonsInColumn) {
            extraWhiteSpace = 59; // for configuration
          } else {
            extraWhiteSpace = 30; // for widget
          }
          layerNameDrpDwnSpan[0].style.width =
            (parseInt(layerHeader.width, 10) - extraWhiteSpace) + "px";
        }
      }));
      typeHeaderDrpDwnArr =
        query('.esriCTStatisticsTypeDropdown', this._statisticsLayerTable.domNode);
      array.forEach(typeHeaderDrpDwnArr, lang.hitch(this, function (typeHeaderDrpDwn) {
        var typeHeaderDrpDwnSpan;
        typeHeaderDrpDwnSpan =
          query('.dijitReset.dijitInline.dijitSelectLabel.dijitValidationTextBoxLabel',
            typeHeaderDrpDwn);
        if (typeHeaderDrpDwnSpan && typeHeaderDrpDwnSpan[0]) {
          if (this.showActionButtonsInColumn) {
            extraWhiteSpace = 59; // for configuration
          } else {
            extraWhiteSpace = 30; // for widget
          }
          typeHeaderDrpDwnSpan[0].style.width =
            (parseInt(typeHeader.width, 10) - extraWhiteSpace) + "px";
        }
      }));
      fieldHeaderDrpDwnArr =
        query('.esriCTStatisticsFieldDropdown', this._statisticsLayerTable.domNode);
      array.forEach(fieldHeaderDrpDwnArr, lang.hitch(this, function (fieldHeaderDrpDwn) {
        var fieldHeaderDrpDwnSpan;
        fieldHeaderDrpDwnSpan =
          query('.dijitReset.dijitInline.dijitSelectLabel.dijitValidationTextBoxLabel',
            fieldHeaderDrpDwn);
        if (fieldHeaderDrpDwnSpan && fieldHeaderDrpDwnSpan[0]) {
          if (this.showActionButtonsInColumn) {
            extraWhiteSpace = 59; // for configuration
          } else {
            extraWhiteSpace = 30; // for widget
          }
          fieldHeaderDrpDwnSpan[0].style.width =
            (parseInt(fieldHeader.width, 10) - extraWhiteSpace) + "px";
        }
      }));
    },

    /**
     * This function is used to reset the width of layer name dropdown(span element)
     * when new option is selected.
     * @memberOf setting/StatisticsSettings
     */
    _resetLayerNameWidth: function (editableLayerRow) {
      var headers, layerHeader, layerNameDrpDwnSpan, extraWhiteSpace;
      headers =
        query('.simple-table-field.field', this._statisticsLayerTable.domNode);
      if (headers && headers[0]) {
        layerHeader = domStyle.getComputedStyle(headers[0]);
      }
      layerNameDrpDwnSpan =
        query('.dijitReset.dijitInline.dijitSelectLabel.dijitValidationTextBoxLabel',
          editableLayerRow.layerNameDropDown.domNode);
      if (this.showActionButtonsInColumn) {
        extraWhiteSpace = 59; // for configuration
      } else {
        extraWhiteSpace = 30; // for widget
      }
      if (layerNameDrpDwnSpan && layerNameDrpDwnSpan[0]) {
        layerNameDrpDwnSpan[0].style.width =
          (parseInt(layerHeader.width, 10) - extraWhiteSpace) + "px";
      }
    },

    /**
     * This function is used to reset the width of statistics type dropdown(span element)
     * when new option is selected.
     * @memberOf setting/StatisticsSettings
     */
    _resetStatisticsTypeWidth: function (editableLayerRow) {
      var typeHeader, headers, typeHeaderDrpDwnSpan, extraWhiteSpace;
      headers =
        query('.simple-table-field.field', this._statisticsLayerTable.domNode);
      if (headers && headers[1]) {
        typeHeader = domStyle.getComputedStyle(headers[1]);
      }
      typeHeaderDrpDwnSpan =
        query('.dijitReset.dijitInline.dijitSelectLabel.dijitValidationTextBoxLabel',
          editableLayerRow.statisticsTypeDropdown.domNode);
      if (this.showActionButtonsInColumn) {
        extraWhiteSpace = 59; // for configuration
      } else {
        extraWhiteSpace = 30; // for widget
      }
      if (typeHeaderDrpDwnSpan && typeHeaderDrpDwnSpan[0]) {
        typeHeaderDrpDwnSpan[0].style.width =
          (parseInt(typeHeader.width, 10) - extraWhiteSpace) + "px";
      }
    },

    /**
     * This function is used to reset the width of layer field dropdown(span element)
     * when new option is selected.
     * @memberOf setting/StatisticsSettings
     */
    _resetLayerFieldWidth: function (editableLayerRow) {
      var headers, fieldHeader, fieldHeaderDrpDwnSpan, extraWhiteSpace;
      headers =
        query('.simple-table-field.field', this._statisticsLayerTable.domNode);
      if (headers && headers[2]) {
        fieldHeader = domStyle.getComputedStyle(headers[2]);
      }
      fieldHeaderDrpDwnSpan =
        query('.dijitReset.dijitInline.dijitSelectLabel.dijitValidationTextBoxLabel',
          editableLayerRow.layerFieldDropdown.domNode);
      if (this.showActionButtonsInColumn) {
        extraWhiteSpace = 59; // for configuration
      } else {
        extraWhiteSpace = 30; // for widget
      }
      if (fieldHeaderDrpDwnSpan && fieldHeaderDrpDwnSpan[0]) {
        fieldHeaderDrpDwnSpan[0].style.width =
          (parseInt(fieldHeader.width, 10) - extraWhiteSpace) + "px";
      }
    }
  });
});