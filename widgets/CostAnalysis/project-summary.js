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
  'dojo/text!./project-summary.html',
  'dojo/_base/lang',
  'dojo/dom-attr',
  'dojo/on',
  'jimu/dijit/SimpleTable',
  'jimu/dijit/LoadingIndicator',
  'dojo/query',
  'dojo/dom-class',
  'dijit/form/ValidationTextBox',
  'dojo/dom-construct',
  'dijit/form/Select',
  'dijit/registry',
  'dojo/_base/array',
  'dojo/store/Memory',
  'dojo/_base/html',
  'dijit/focus',
  'esri/graphic'
], function (
  declare,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  lang,
  domAttr,
  on,
  SimpleTable,
  LoadingIndicator,
  query,
  domClass,
  ValidationTextBox,
  domConstruct,
  Select,
  registry,
  array,
  Memory,
  html,
  focusUtil,
  Graphic
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    baseClass: 'jimu-widget-cost-analysis-project-summary',
    _costFieldStore: null,
    totalCost: 0,
    projectInfo: null,
    previouslyAddedEscalations: [],
    loadingProject: false,

    postCreate: function () {
      this.inherited(arguments);
      this.totalCost = 0;
      this.previouslyAddedEscalations = [];
      this._handleClickEvents();
      this._initLoadingIndicator();
    },

    /**
     * This function used for initializing the loading indicator
     * @memberOf widgets/CostAnalysis/project-summary
     * */
    _initLoadingIndicator: function () {
      this._loadingIndicator = new LoadingIndicator({
        hidden: true
      });
      this._loadingIndicator.placeAt(this.domNode.parentNode.parentNode.parentNode);
      this._loadingIndicator.startup();
    },

    /**
     * This function is used handle all click events of project summary
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _handleClickEvents: function () {
      this.own(on(this.btnAddNode, 'click', lang.hitch(this, function () {
        if (!domClass.contains(this.btnAddNode, "esriCTAddStatisticsIconDisable")) {
          this._addCostEscalationBtnClicked();
          this._handleActionButtonVisibility();
        }
      })));
      this.own(on(this.btnCrossNode, 'click', lang.hitch(this, function () {
        if (!domClass.contains(this.btnCrossNode, "esriCTDeleteStatisticsIconDisable")) {
          this._deleteLayerRow();
        }
      })));
      //Handle Up/Down button click events
      this.own(on(this.btnUpNode, 'click', lang.hitch(this, this._upArrowClicked)));
      this.own(on(this.btnDownNode, 'click', lang.hitch(this, this._downArrowClicked)));
      //Handle OK button click event
      this.own(on(this.okButton, "click", lang.hitch(this, function () {
        var hasValidData, tableRows;
        hasValidData = true;
        // costEscalationArr = this._getCostEscalationArray();
        tableRows = this._costEscalationTable.getRows();
        //validate if all entires in the table are valid if not show error
        array.forEach(tableRows, lang.hitch(this, function (editableLayerRow) {
          if (!editableLayerRow.costLabelTextBox.isValid()) {
            hasValidData = false;
            focusUtil.focus(editableLayerRow.costLabelTextBox);
          }
          if (!editableLayerRow.costValueLabelTextBox.isValid()) {
            hasValidData = false;
            focusUtil.focus(editableLayerRow.costValueLabelTextBox);
          }
        }));
        if (hasValidData) {
          this.calculateGrossCost(this.totalCost, true);
          this.emit("onOkButtonClicked");
        } else {
          this.appUtils.showMessage(this.nls.costEscalation.invalidEntry);
        }
      })));
      //Handle Cancel button click event
      this.own(on(this.cancelButton, "click", lang.hitch(this, function () {
        this.emit("onCancelButtonClicked");
        this._loadingIndicator.show();
        //clear all edited escalation entries
        this._costEscalationTable.clear();
        //use previously stored entries and create table
        array.forEach(this.tableData, lang.hitch(this, function (data) {
          this._addCostEscalationLayerRow(data);
        }));
        this._updateGrossCost();
        this._loadingIndicator.hide();
      })));
    },

    /**
     * This function is used move up when particular row is selected
     * with the help of checkbox(i.e checked)
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _upArrowClicked: function () {
      if (!domClass.contains(this.btnUpNode, "esriCTStatisticsUpIconDisable")) {
        var tr, trs;
        trs = this._costEscalationTable.getRows();
        var tableRowsData = this._costEscalationTable.getData();
        array.forEach(tableRowsData, lang.hitch(this, function (tableRowData, index) {
          if (tableRowData.editable) {
            tr = trs[index];
          }
        }));
        if (!this._costEscalationTable.onBeforeRowUp(tr)) {
          return;
        }
        var index = array.indexOf(trs, tr);
        if (index > 0) {
          var newIndex = index - 1;
          var trRef = trs[newIndex];
          if (trRef) {
            html.place(tr, trRef, 'before');
            this._costEscalationTable.updateUI();
            this._costEscalationTable.emit('row-up', tr);
            this._updateGrossCost();
          }
        }
      }
    },

    /**
     * This function is used move down when particular row is selected
     * with the help of checkbox(i.e checked)
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _downArrowClicked: function () {
      if (!domClass.contains(this.btnDownNode, "esriCTStatisticsDownIconDisable")) {
        var tr, trs;
        trs = this._costEscalationTable.getRows();
        var tableRowsData = this._costEscalationTable.getData();
        array.forEach(tableRowsData, lang.hitch(this, function (tableRowData, index) {
          if (tableRowData.editable) {
            tr = trs[index];
          }
        }));
        if (!this._costEscalationTable.onBeforeRowDown(tr)) {
          return;
        }
        var index = array.indexOf(trs, tr);
        if (index < trs.length - 1) {
          var newIndex = index + 1;
          var trRef = trs[newIndex];
          if (trRef) {
            html.place(tr, trRef, 'after');
            this._costEscalationTable.updateUI();
            this._costEscalationTable.emit('row-down', tr);
            this._updateGrossCost();
          }
        }
      }
    },

    startup: function () {
      this.inherited(arguments);
      this._init();
    },

    /**
    * This function is used to rest the escalation table and gross cost
    * @memberOf widgets/CostAnalysis/project-summary
    */
    reset: function (projectInfo) {
      this.projectInfo = projectInfo;
      //clear all the previous escalation entries
      this._costEscalationTable.clear();
      this.totalCost = 0;
      this.previouslyAddedEscalations = [];
      this.tableData = [];
    },

    /**
    * This function is used to initialize the process of project summary tab
    * @memberOf widgets/CostAnalysis/project-summary
    */
    _init: function () {
      this._createCostEscalationFieldTable();
      this._createCostTypeFieldStore();
    },

    /**
    * This function is used to store the current table data
    * @memberOf widgets/CostAnalysis/project-summary
    */
    cloneTableData: function () {
      this.tableData = [];
      var tableData = [], tableRow = {};
      if (this._costEscalationTable && this._costEscalationTable.getRows().length) {
        array.forEach(this._costEscalationTable.getRows(), lang.hitch(this, function (row) {
          tableRow = {};
          if (row.costLabelTextBox) {
            tableRow.label = row.costLabelTextBox.getValue();
          }
          if (row.costTypeLabelDropdown) {
            tableRow.type = row.costTypeLabelDropdown.getValue();
          }
          if (row.costValueLabelTextBox) {
            tableRow.costValue = row.costValueLabelTextBox.getValue();
          }
          tableData.push(tableRow);
        }));
        this.tableData = lang.clone(tableData);
      }
      this._handleActionButtonVisibility();
    },

    /**
     * Load rows for each additional cost in table
     * @memberOf widgets/CostAnalysis/project-summary
     */
    loadAdditionalCost: function (features) {
      var tableRow = {};
      //Sort additional cost features by costIndex attribute
      features.sort(lang.hitch(this, this._sortFeatureArray));
      array.forEach(features, lang.hitch(this, function (feature) {
        tableRow = {};
        tableRow.label = feature.attributes[this.config.projectMultiplierFields.DESCRIPTION];
        tableRow.type = feature.attributes[this.config.projectMultiplierFields.TYPE];
        tableRow.costValue = feature.attributes[this.config.projectMultiplierFields.VALUE];
        //check if valid type (+/*/-)
        if (tableRow.type === "+" || tableRow.type === "*" || tableRow.type === "_") {
          if (this.additionalCostTable) {
            this._storeAsPreviouslyAdded(
              feature.attributes[this.additionalCostTable.objectIdField]);
          }
          this._addCostEscalationLayerRow(tableRow);
        }
      }));
    },

    /**
     * Sorts features according to cost index attribute
     */
    _sortFeatureArray: function (a, b) {
      var constIndexField = this.config.projectMultiplierFields.COSTINDEX;
      return a.attributes[constIndexField] - b.attributes[constIndexField];
    },

    /**
    * This function is used to create table for adding new cost escalation field
    * @memberOf widgets/CostAnalysis/project-summary
    */
    _createCostEscalationFieldTable: function () {
      var args, fields;
      fields = [{
        name: 'editable',
        title: this.nls.common.label,
        type: 'checkbox',
        editable: false,
        width: '40%'
      }, {
        name: 'field',
        title: this.nls.common.type,
        type: 'empty',
        editable: false,
        width: '30%'
      }, {
        name: 'field',
        title: this.nls.costEscalation.valueHeader,
        type: 'empty',
        editable: true,
        width: '40%'
      }];
      args = {
        fields: fields,
        selectable: false,
        autoHeight: true
      };
      this._costEscalationTable = new SimpleTable(args);
      this._costEscalationTable.placeAt(this.costEscalationTableNode);
      this._costEscalationTable.startup();
    },

    /**
     * This function is used to handle the checked/change event of parent and row checkbox
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _handleCheckBoxClick: function (row) {
      var editableHeaderCheckbox, editableRowCheckbox;
      editableHeaderCheckbox = query(".simple-table-title .jimu-checkbox", this.domNode)[0];
      editableRowCheckbox = query(".jimu-checkbox", row)[0];

      on(registry.byNode(editableHeaderCheckbox), "change", lang.hitch(this, function () {
        this._handleActionButtonVisibility();
      }));
      on(registry.byNode(editableRowCheckbox), "change", lang.hitch(this, function () {
        this._handleActionButtonVisibility();
      }));
    },

    /**
     * This function is used to handle the state of add, delete, up and down buttons
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _handleActionButtonVisibility: function () {
      var tableRows, isValidRow = true, editableRowCount = 0, editableHeaderCheckbox, editableHeaderCheckboxNode;
      tableRows = this._costEscalationTable.getRows();
      editableHeaderCheckbox = query(".simple-table-title .jimu-checkbox", this.domNode)[0];
      editableHeaderCheckboxNode = registry.byNode(editableHeaderCheckbox);
      array.forEach(tableRows, lang.hitch(this, function (row) {
        var editableRowCheckbox;
        //Check if label has value
        if (lang.trim(row.costLabelTextBox.value) === "") {
          isValidRow = false;
        }
        //Check if row value is number and not empty
        if (isNaN(row.costValueLabelTextBox.value) ||
          lang.trim(row.costValueLabelTextBox.value + "") === "" ||
          row.costValueLabelTextBox.value === "0" || row.costValueLabelTextBox.value === 0) {
          isValidRow = false;
        }
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
      //If table has valid rows, enable add button
      if (isValidRow || tableRows.length === 0) {
        domClass.replace(this.btnAddNode, "esriCTAddStatisticsIcon",
          "esriCTAddStatisticsIconDisable");
      } else {
        domClass.replace(this.btnAddNode, "esriCTAddStatisticsIconDisable",
          "esriCTAddStatisticsIcon");
      }
      //Enable up and down buttons when only one valid rows or is selected
      if (isValidRow && (editableRowCount === 1) && (tableRows.length > 1)) {
        domClass.replace(this.btnUpNode, "esriCTStatisticsUpIcon", "esriCTStatisticsUpIconDisable");
        domClass.replace(this.btnDownNode, "esriCTStatisticsDownIcon",
          "esriCTStatisticsDownIconDisable");
      } else {
        domClass.replace(this.btnUpNode, "esriCTStatisticsUpIconDisable", "esriCTStatisticsUpIcon");
        domClass.replace(this.btnDownNode, "esriCTStatisticsDownIconDisable",
          "esriCTStatisticsDownIcon");
      }
      //If all the rows are deleted then uncheck and disable the header checkbox
      if (tableRows.length === 0) {
        editableHeaderCheckboxNode.set('status', false);
        domClass.add(editableHeaderCheckboxNode.domNode, "jimu-state-disabled");
      } else {
        editableHeaderCheckboxNode.set('status', true);
        domClass.remove(editableHeaderCheckboxNode.domNode, "jimu-state-disabled");
      }
    },

    /**
   * This function is used to add a row on click of add cost field button
   * @memberOf widgets/CostAnalysis/project-summary
   */
    _addCostEscalationBtnClicked: function () {
      this._addCostEscalationLayerRow();
    },

    /**
     * This function is used to add a row on selection of editable layer in layer settings tab
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _addCostEscalationLayerRow: function (data) {
      var editableLayerRow, fieldsColumn;
      editableLayerRow = this._costEscalationTable.addRow({});
      fieldsColumn = query('.simple-table-cell', editableLayerRow.tr);
      this._handleCheckBoxClick(editableLayerRow.tr);
      if (fieldsColumn) {
        editableLayerRow = editableLayerRow.tr;
        this._addCostLabelTextBox(fieldsColumn[0], editableLayerRow, data);
        this._addCostTypeLabelDropdown(fieldsColumn[1], editableLayerRow, data);
        this._addCostValueLabelTextBox(fieldsColumn[2], editableLayerRow, data);
      }
    },

    /**
     * This function is used to add textbox in table
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _addCostLabelTextBox: function (fieldsColumn, editableLayerRow, data) {
      var textBoxContainer;
      textBoxContainer = domConstruct.create("div", {
        "class": "esriCTTextBoxContainer"
      }, fieldsColumn);
      editableLayerRow.costLabelTextBox = new ValidationTextBox({
        "class": "esriCTCostLabelTextbox esriCTAddLayerTableNode"
      }, textBoxContainer);
      editableLayerRow.costLabelTextBox.startup();
      if (data && data.label) {
        editableLayerRow.costLabelTextBox.set("value", data.label);
      }
      editableLayerRow.costLabelTextBox.validator =
        lang.hitch(this, this._validateCostEscalationLabelFields);
      this.own(on(editableLayerRow.costLabelTextBox, "change", lang.hitch(this, function () {
        this._handleActionButtonVisibility();
      })));
    },

    /**
     * This function is used validate label
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _validateCostEscalationLabelFields: function (value) {
      if (lang.trim(value) === "") {
        return false;
      }
      return true;
    },

    /**
     * This function is used to add  dropdown of type in table
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _addCostTypeLabelDropdown: function (fieldsColumn, editableLayerRow, data) {
      var dropDownContainer, item;
      dropDownContainer = domConstruct.create("div", {
        "class": "esriCTCostTypeDropDownContainer esriCTAddLayerTableNode"
      }, fieldsColumn);
      editableLayerRow.costTypeLabelDropdown = new Select({
        name: "layerSelect",
        store: this._costFieldStore,
        labelAttr: "name",
        "class": "esriCTCostTypeDropdown"
      }, dropDownContainer);
      if (data && data.type) {
        item = editableLayerRow.costTypeLabelDropdown.store.get(data.type);
        editableLayerRow.costTypeLabelDropdown.setValue(item.value);
      }

      this.own(on(editableLayerRow.costTypeLabelDropdown, "change",
        lang.hitch(this, this._updateGrossCost)));
      editableLayerRow.costTypeLabelDropdown.startup();
    },

    /**
     * This function is used to add textbox in table for value
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _addCostValueLabelTextBox: function (fieldsColumn, editableLayerRow, data) {
      var textBoxContainer;
      textBoxContainer = domConstruct.create("div", {
        "class": "esriCTTextBoxContainer esriCTAddLayerTableNode"
      }, fieldsColumn);
      editableLayerRow.costValueLabelTextBox = new ValidationTextBox({
        "class": "esriCTCostLabelTextbox",
        "trim": true
      }, textBoxContainer);
      editableLayerRow.costValueLabelTextBox.startup();
      if (data && data.costValue) {
        editableLayerRow.costValueLabelTextBox.set("value", data.costValue);
      }
      editableLayerRow.costValueLabelTextBox.validator =
        lang.hitch(this, this._validateCostEscalationValueFields);
      this.own(on(editableLayerRow.costValueLabelTextBox, "change",
        lang.hitch(this, function () {
          this._updateGrossCost();
          this._handleActionButtonVisibility();
        })));
    },

    /**
     * This function is used validate value
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _validateCostEscalationValueFields: function (value) {
      if (value === "" || isNaN(value) || value === "0" || value === 0) {
        return false;
      }
      return true;
    },

    /**
     * This function is used to update values
     *  @memberOf widgets/CostAnalysis/project-summary
     */
    _getCostEscalationArray: function () {
      var tableRows, costEscalationFieldObj, costEscalationArr;
      tableRows = this._costEscalationTable.getRows();
      costEscalationArr = [];
      array.forEach(tableRows, lang.hitch(this, function (tableRow) {
        costEscalationArr.push(
          costEscalationFieldObj = {
            "label": tableRow.costLabelTextBox.getValue(),
            "type": tableRow.costTypeLabelDropdown.getValue(),
            "value": tableRow.costValueLabelTextBox.getValue()
          });
      }));
      return costEscalationArr;
    },


    /**
     * This function is used to delete layer row
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _deleteLayerRow: function () {
      var tableRows = this._costEscalationTable.getRows();
      var tableRowsData = this._costEscalationTable.getData();
      var checkBoxNode;
      array.forEach(tableRowsData, lang.hitch(this, function (tableRowData, index) {
        if (tableRowData.editable) {
          this._costEscalationTable.deleteRow(tableRows[index]);
          this._updateGrossCost();
        }
      }));
      if (this._costEscalationTable.getRows().length === 0) {
        checkBoxNode = query("th .checkbox", this.costEscalationTableNode)[0];
        if (domClass.contains(checkBoxNode, "checked")) {
          domClass.remove(checkBoxNode, "checked");
        }
      }
      this._handleActionButtonVisibility();
    },

    /**
     * This function is used to store cost type
     * @memberOf widgets/CostAnalysis/project-summary
     */
    _createCostTypeFieldStore: function () {
      var costTypeFieldArr;
      costTypeFieldArr = [];
      costTypeFieldArr.push({
        name: '+',
        value: '+'
      });
      costTypeFieldArr.push({
        name: '*',
        value: '*'
      });
      costTypeFieldArr.push({
        name: '-',
        value: '_'
      });
      this._costFieldStore = new Memory({ idProperty: "value", data: costTypeFieldArr });
    },

    /**
     * This function is used to update gross cost and return additional cost info
     * @memberOf setting/StatisticsSettings
     */
    _updateGrossCost: function () {
      var totalRoundedCost, roundedGrossCost;
      if (this.loadingProject) {
        return;
      }
      var costEscalationArr = this._getCostEscalationArray();
      var grossCost = this.totalCost;
      var featuresArray = [], additionalCostArray = [];
      array.forEach(costEscalationArr, lang.hitch(this, function (costInfo, index) {
        var value = parseFloat(costInfo.value);
        var attributes = {};
        if (value) {
          if (this.projectInfo && this.projectInfo.projectId &&
            this.config.projectMultiplierFields) {
            //create attributes
            attributes[this.config.projectMultiplierFields.DESCRIPTION] = costInfo.label;
            attributes[this.config.projectMultiplierFields.TYPE] = costInfo.type;
            attributes[this.config.projectMultiplierFields.VALUE] = value;
            attributes[this.config.projectMultiplierFields.COSTINDEX] = index + 1;
            attributes[this.config.projectMultiplierFields.PROJECTGUID] =
              this.projectInfo.projectId;
            featuresArray.push(new Graphic(null, null, attributes));
          }
          switch (costInfo.type) {
            case '+':
              grossCost += value;
              break;
            case '_':
              grossCost -= value;
              break;
            case '*':
              grossCost *= value;
              break;
          }
          additionalCostArray.push(
            {
              "label": costInfo.label,
              "type": costInfo.type,
              "value": value
            }
          );
        }
      }));

      totalRoundedCost = this.appUtils.roundProjectCostValue(
        this.config.generalSettings.roundCostType, this.totalCost);
      totalRoundedCost = this.config.generalSettings.currency + " " + totalRoundedCost;
      //Set project total cost
      domAttr.set(this.totalCostDiv, "innerHTML", totalRoundedCost);

      roundedGrossCost = this.appUtils.roundProjectCostValue(
        this.config.generalSettings.roundCostType, grossCost);
      roundedGrossCost = this.config.generalSettings.currency + " " + roundedGrossCost;
      //Calculate and set project gross cost
      domAttr.set(this.grossCostDiv, "innerHTML",roundedGrossCost);
      return { grossCost: grossCost, features: featuresArray, additionalCostInfo:additionalCostArray };
    },

    /**
     * This function is used to calculate gross cost
     * @memberOf setting/StatisticsSettings
     */
    calculateGrossCost: function (totalCost, updateTable) {
      var grossCostDetails;
      this.totalCost = totalCost;
      if (this.loadingProject) {
        return;
      }
      grossCostDetails = this._updateGrossCost();
      this.emit("grossCostUpdated",
        this.totalCost, grossCostDetails.grossCost, grossCostDetails.additionalCostInfo);
      if (updateTable) {
        this._updateCostEscalationTable(grossCostDetails.features);
      }
    },

    /**
     * This function is used save updated cost escalation's in escalation table
     * @memberOf setting/StatisticsSettings
     */
    _updateCostEscalationTable: function (features) {
      if (this.additionalCostTable &&
        (features.length > 0 || this.previouslyAddedEscalations.length > 0)) {
        this._loadingIndicator.show();
        this.additionalCostTable.applyEdits(features, null, this.previouslyAddedEscalations,
          lang.hitch(this, function (adds) {
            var isFailed = false;
            this.previouslyAddedEscalations = [];
            //Loop through all successfully added features
            if (adds && adds.length > 0) {
              array.forEach(adds, lang.hitch(this, function (result) {
                if (result.success) {
                  this._storeAsPreviouslyAdded(result.objectId);
                } else {
                  isFailed = true;
                }
              }));
              if (isFailed) {
                this.appUtils.showMessage(this.nls.workBench.errorInSavingCostEscalation);
              }
            }
            this._loadingIndicator.hide();
          }), lang.hitch(this, function () {
            this._loadingIndicator.hide();
            this.appUtils.showMessage(this.nls.workBench.errorInSavingCostEscalation);
          }));
      }
    },

    /**
     * This function is used keep track previously added graphics
     * @memberOf setting/StatisticsSettings
     */
    _storeAsPreviouslyAdded: function (objectId) {
      var graphics, attributes = {};
      attributes[this.additionalCostTable.objectIdField] = objectId;
      graphics = new Graphic(null, null, attributes);
      this.previouslyAddedEscalations.push(graphics);
    }
  });
});