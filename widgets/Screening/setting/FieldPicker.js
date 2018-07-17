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
  'dijit/form/Select',
  'dijit/form/ValidationTextBox',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/_base/html',
  'dojo/on',
  'jimu/BaseWidget',
  'dojo/text!./FieldPicker.html',
  'dojo/Evented',
  'jimu/dijit/SimpleTable',
  'dojo/query',
  'dojo/dom-class',
  'jimu/utils'
], function (
  declare,
  _WidgetsInTemplateMixin,
  Select,
  ValidationTextBox,
  array,
  lang,
  html,
  on,
  BaseWidget,
  template,
  Evented,
  SimpleTable,
  query,
  domClass,
  jimuUtils
) {
  return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
    templateString: template,
    baseClass: 'jimu-widget-screening-setting',

    _fieldsTable: null, // to store the instance of fields table
    _entireFieldsArr: [], // to store names of all the fields
    _selectedFieldsArr: [], // to store the names of selected fields
    _entireFieldObj: {}, // to store the object all fields with label
    _configuredField: null, // to store the name of configured field
    _configuredLabel: null, // to store the label of configured field

    constructor: function (options) {
      this._fieldsTable = null;
      this._entireFieldsArr = [];
      this._selectedFieldsArr = [];
      this._entireFieldObj = {};
      this._configuredField = null;
      this._configuredLabel = null;
      lang.mixin(this, options);
    },

    postMixInProperties: function () {
      this.nls.common = {};
      lang.mixin(this.nls.common, window.jimuNls.common);
    },

    postCreate: function () {
      this.inherited(arguments);
      this._init();
    },

    _init: function () {
      this._clearData();
      this._addValidFields();
      this._createFieldsTable();
      this._attachEventsToElement();
      this._displayPreviousConfiguredFields();
    },

    /**
     * This function is used to clear the array of entire field & selected field
     * @memberOf Screening/setting/FieldPicker
     */
    _clearData: function () {
      this._entireFieldsArr = [];
      this._selectedFieldsArr = [];
    },

    /**
     * This function is used to display the previously configured field
     * @memberOf Screening/setting/FieldPicker
     */
    _displayPreviousConfiguredFields: function () {
      var field;
      if (this.selectedFields) {
        for (field in this.selectedFields) {
          this._configuredField = field;
          this._configuredLabel = this.selectedFields[field].label;
          this.btnAddField.click();
        }
      }
    },

    /**
     * This function is used to filter the valid fields from all fields
     * @memberOf Screening/setting/FieldPicker
     */
    _addValidFields: function () {
      var validFieldTypes;
      validFieldTypes = [
        'esriFieldTypeInteger',
        'esriFieldTypeSingle',
        'esriFieldTypeSmallInteger',
        'esriFieldTypeDouble',
        'esriFieldTypeString',
        'esriFieldTypeDate'
      ];
      array.forEach(this.featureLayer.fields, lang.hitch(this, function (field) {
        this._entireFieldObj[field.name] = field;
        if (validFieldTypes.indexOf(field.type) > -1) {
          this._entireFieldsArr.push(field.name);
          this._entireFieldObj[field.name] = lang.clone(field);
          if (this.selectedFields &&
            this.selectedFields[field.name]) {
            this._entireFieldObj[field.name].label =
              this.selectedFields[field.name].label;
          }
        }
      }));
      if (this._entireFieldsArr.length === 0) {
        this._disableAddFieldButton();
      }
    },

    /**
     * This function is used to create a simple table for field chooser
     * @memberOf Screening/setting/FieldPicker
     */
    _createFieldsTable: function () {
      var fields, fieldTableParameters;
      fields = [{
        name: 'layer',
        title: this.nls.analysisTab.addFieldsNameTitle,
        "class": 'label',
        type: 'empty',
        width: '40%'
      }, {
        name: 'field',
        title: this.nls.common.label,
        type: 'empty',
        editable: 'true',
        width: '40%'
      }, {
        name: 'actions',
        title: this.nls.common.actions,
        "class": 'actions',
        type: 'actions',
        actions: ['up', 'down', 'delete'],
        width: '20%'
      }];
      fieldTableParameters = {
        fields: fields
      };
      this._fieldsTable = new SimpleTable(fieldTableParameters);
      this._fieldsTable.placeAt(this.fieldTable);
      html.setStyle(this._fieldsTable.domNode, { 'height': '100%' });
      this._fieldsTable.startup();
    },

    /**
     * This function is used to attach different types of event to html elements
     * @memberOf Screening/setting/FieldPicker
     */
    _attachEventsToElement: function () {
      this.own(on(this.btnAddField, 'click', lang.hitch(this, function () {
        var distinctFieldArr;
        if (!(domClass.contains(this.btnAddField, "esriCTDisabled"))) {
          distinctFieldArr =
            this._getDistinctFields(this._entireFieldsArr, this._selectedFieldsArr);
          this._addFieldsRow(distinctFieldArr);
        }
      })));
      this.own(on(this._fieldsTable, 'row-delete', lang.hitch(this, function (deletedRow) {
        this._deleteFieldRow(deletedRow);
      })));
    },

    /**
     * This function is used to add a new row
     * @memberOf Screening/setting/FieldPicker
     */
    _addFieldsRow: function (distinctFieldArr) {
      var fieldRow, fieldDropdownCell, labelCell, rowCell;
      fieldRow = this._fieldsTable.addRow({});
      if (fieldRow.success && fieldRow.tr) {
        fieldRow = fieldRow.tr;
        rowCell = query('.simple-table-cell', fieldRow);
        fieldDropdownCell = rowCell[0];
        labelCell = rowCell[1];
        this._addFieldDropdown(distinctFieldArr, fieldDropdownCell, fieldRow);
        this._addLabelTextbox(labelCell, fieldRow);
      }
    },

    /**
     * This function is used to delete a row
     * @memberOf Screening/setting/FieldPicker
     */
    _deleteFieldRow: function (deletedRow) {
      var deletedOption, index;
      domClass.remove(this.btnAddField, "esriCTDisabled");
      deletedOption = deletedRow.fieldDropdownInstance.value;
      index = this._selectedFieldsArr.indexOf(deletedOption);
      if (index > -1) {
        this._selectedFieldsArr.splice(index, 1);
      }
      this._addSelectedFieldInOtherDropdown(deletedRow.fieldDropdownInstance.value, null);
    },

    /**
     * This function is used to add a field chooser dropdown in a new row
     * @memberOf Screening/setting/FieldPicker
     */
    _addFieldDropdown: function (distinctFieldArr, fieldDropdownCell, fieldRow) {
      var fieldDropdown, distinctFieldOptions;
      distinctFieldOptions = this._getDistinctFieldsOptionsObj(distinctFieldArr);
      fieldDropdown = new Select({
        "class": "esriCTFieldChooserDropdown",
        options: distinctFieldOptions
      });
      fieldDropdown.placeAt(fieldDropdownCell);
      fieldDropdown.startup();
      if (this._configuredField) {
        fieldDropdown.set("value", this._configuredField);
        this._configuredField = null;
      }
      fieldRow.fieldDropdownInstance = fieldDropdown;
      this.own(on(fieldDropdown, "change", lang.hitch(this, function (evt) {
        var lastSelectedFieldOption;
        lastSelectedFieldOption = this._selectedFieldsArr[fieldRow.rowIndex];
        this._selectedFieldsArr[fieldRow.rowIndex] = evt;
        this._addSelectedFieldInOtherDropdown(lastSelectedFieldOption, evt);
        this._removeSelectedFieldFromOtherDropdown(evt);
      })));
      this._selectedFieldsArr.push(fieldDropdown.value);
      this._removeSelectedFieldFromOtherDropdown(fieldDropdown.value);
      this._disableAddFieldButton();
    },

    /**
     * This function is used to disable the add new field button
     * @memberOf Screening/setting/FieldPicker
     */
    _disableAddFieldButton: function () {
      if (this._selectedFieldsArr.length === this._entireFieldsArr.length) {
        domClass.add(this.btnAddField, "esriCTDisabled");
      }
    },

    /**
     * This function is used to add the text input for adding field labels
     * @memberOf Screening/setting/FieldPicker
     */
    _addLabelTextbox: function (labelCell, fieldRow) {
      var labelTextBox;
      labelTextBox = new ValidationTextBox({
        "class": "esriCTFieldValidationTextBox"
      });
      labelTextBox.placeAt(labelCell);
      labelTextBox.startup();
      if (this._configuredLabel) {
        labelTextBox.set("value", this._configuredLabel);
        this._configuredLabel = null;
      }
      fieldRow.fieldLabelInstance = labelTextBox;
    },

    /**
     * This function is used to create the options for adding in field dropdown
     * @memberOf Screening/setting/FieldPicker
     */
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
     * This function is used to remove the newly selected option from other dropdown
     * @memberOf Screening/setting/FieldPicker
     */
    _removeSelectedFieldFromOtherDropdown: function (selectedFieldOption) {
      var tableRows;
      tableRows = this._fieldsTable.getRows();
      array.forEach(tableRows, lang.hitch(this, function (tableRow) {
        if (selectedFieldOption !== tableRow.fieldDropdownInstance.value) {
          tableRow.fieldDropdownInstance.removeOption(selectedFieldOption);
        }
      }));
    },

    /**
     * This function is used to add the previously selected option in other dropdown
     * @memberOf Screening/setting/FieldPicker
     */
    _addSelectedFieldInOtherDropdown: function (lastSelectedFieldOption, selectedFieldOption) {
      var tableRows;
      tableRows = this._fieldsTable.getRows();
      array.forEach(tableRows, lang.hitch(this, function (tableRow) {
        if (selectedFieldOption !== tableRow.fieldDropdownInstance.value) {
          tableRow.fieldDropdownInstance.addOption({
            "label": this._entireFieldObj[lastSelectedFieldOption].alias,
            "value": lastSelectedFieldOption
          });
        }
      }));
    },

    /**
     * This function is used to create a configured field object that is passed to widget
     * @memberOf Screening/setting/FieldPicker
     */
    okButtonClicked: function () {
      var tableRows, configuredFieldObj;
      configuredFieldObj = {};
      tableRows = this._fieldsTable.getRows();
      if (tableRows.length === 0) {
        this.selectedFields = null;
      } else {
        array.forEach(tableRows, lang.hitch(this, function (tableRow) {
          this._entireFieldObj[tableRow.fieldDropdownInstance.value].label =
            jimuUtils.stripHTML(lang.trim(tableRow.fieldLabelInstance.value));
          configuredFieldObj[tableRow.fieldDropdownInstance.value] =
            this._entireFieldObj[tableRow.fieldDropdownInstance.value];
        }));
        this.selectedFields = configuredFieldObj;
      }
      return this.selectedFields;
    },

    /**
     * This function is used to get the difference between 2 arrays
     * @memberOf Screening/setting/FieldPicker
     */
    _getDistinctFields: function (entireFieldArr, selectedFieldsArr) {
      var distinctFieldArr;
      distinctFieldArr = entireFieldArr.filter(function (x) {
        return selectedFieldsArr.indexOf(x) < 0;
      });
      return distinctFieldArr;
    }
  });
});