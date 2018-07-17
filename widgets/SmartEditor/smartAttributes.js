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
// jscs:disable validateIndentation
define([
  "dojo",
  "dojo/_base/declare",
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/dom-class',
  'dojo/on',
  'dojo/query',
  'dijit/registry',
  'jimu/filterUtils',
  'jimu/BaseWidgetSetting'
], function (
  dojo,
  declare,
  lang,
  array,
  domClass,
  on,
  query,
  registry,
  filterUtils,
  BaseWidgetSetting
  ) {
  return declare([BaseWidgetSetting], {
    _attrInspector: null,
    _fieldValidation: null,
    _feature: null,
    _fieldInfo: null,
    _gdbRequiredFields: null,
    _notEditableFields: null,
    _fieldNameToAlias: null,
    _fieldsWithRules: null,
    _attTable: null,
    _filterUtils: null,
    _mapLayer: null,
    OPERATORS: null,
    constructor: function () {
      this.inherited(arguments);
      lang.mixin(this, arguments[0]);
      this.useFieldName = false;
      this._mapLayer = this._feature.getLayer();
      this._attTable = query("td.atiLabel", this._attrInspector.domNode);
      if (this._attTable.length > 0) {
        var row = this._attTable[0];
        if (row && row.hasAttribute("data-fieldname")) {
          this.useFieldName = true;
        }
      }
      this._processLayer();
      this._filterUtils = new filterUtils();
      this.OPERATORS = lang.clone(this._filterUtils.OPERATORS);

      if (this._attTable === undefined || this._attTable === null) {
        return;
      }
      this._bindEvents();
    },
    _processLayer: function () {
      this._gdbRequiredFields = [];
      this._notEditableFields = [];
      //this._fieldNameToAlias = {};
      this._fieldsWithRules = [];

      //array.forEach(this._mapLayer.fields, function (field) {
      //  if (field.nullable === false && field.editable === true) {
      //    this._gdbRequiredFields.push(field.alias);
      //  }
      //}, this);

      array.forEach(this._fieldInfo, function (finfo) {
        var fieldLabel;
        if (this.useFieldName === true) {
          fieldLabel = finfo.fieldName;
        }
        else {
          fieldLabel = finfo.label;
          if (fieldLabel.indexOf('<a class="asteriskIndicator"> *</a>') >= 0) {
            fieldLabel = fieldLabel.replace('<a class="asteriskIndicator"> *</a>', '');
          }
        }

        if (finfo.nullable === false && finfo.isEditable === true) {
          this._gdbRequiredFields.push(fieldLabel);
        }
        if (finfo.isEditable === false || finfo.isEditableSettingInWebmap === false) {
          this._notEditableFields.push(fieldLabel);
        }
        if (this._fieldValidation) {
          if (this._fieldValidation.hasOwnProperty(finfo.fieldName)) {
            this._fieldsWithRules.push(fieldLabel);
          }

        }
      }, this);
    },
    toggleFields: function () {
      if (this._attTable === undefined || this._attTable === null) {
        return;
      }

      if (this._fieldValidation === undefined || this._fieldValidation === null) {
        return;
      }

      if (this._feature === undefined || this._feature === null) {
        return;
      }

      var actionType = null;
      var fields = this._fieldInfo;

      var rowsWithError = [];
      var results;
      array.forEach(fields, lang.hitch(this, function (field) {
        var fieldLabel;
        if (this.useFieldName === true) {
          fieldLabel = field.fieldName;
        }
        else {
          fieldLabel = field.label;
          if (fieldLabel.indexOf('<a class="asteriskIndicator"> *</a>') >= 0) {
            fieldLabel = fieldLabel.replace('<a class="asteriskIndicator"> *</a>', '');
          }
        }
        actionType = null;
        // hasRule, actionType, fieldValid
        results = this.validateField(field.fieldName);
        actionType = results[1];
        if (results[2] === false) {
          rowsWithError.push({ 'fieldName': field.fieldName });
        }

        if (results[0] === true) {

          this.toggleFieldOnAttributeInspector(fieldLabel, actionType, results[2]);
        }
      }));
      return rowsWithError;
    },
    validateField: function (fieldName) {
      // hasRule, actionType, fieldValid (only for required field action)

      var filter = null;
      if (this._fieldValidation.hasOwnProperty(fieldName)) {

        if (this._fieldValidation[fieldName].length === 0) {
          return [false, null, true];
        }
        else {
          var result = [false, null, null];
          array.some(this._fieldValidation[fieldName], function (actionDetails) {
            if (actionDetails.filter !== undefined && actionDetails.filter !== null) {
              filter = actionDetails.filter;
              result = [true, null, null];
              if (this.processFilter(filter, this._feature)) {
                //if (fieldValidation[fieldName][actionDetails].action === 'Required') {
                if (actionDetails.actionName === 'Required') {

                  if (this._feature.attributes.hasOwnProperty(fieldName) === false) {
                    return (result = [true, actionDetails.actionName, false], true);

                  }
                  else if (this._feature.attributes[fieldName] === null ||
                    this._feature.attributes[fieldName] === '') {
                    return (result = [true, actionDetails.actionName, false], true);
                  }
                  else if (this.myIsNaN(this._feature.attributes[fieldName])) {
                    return (result = [true, actionDetails.actionName, false], true);
                  }
                  else {
                    return (result = [true, actionDetails.actionName, true], true);
                  }
                }
                else {
                  return (result = [true, actionDetails.actionName, null, actionDetails.submitWhenHidden], true);
                }


              }
            }
          }, this);

          return result;
        }
      }
      else {
        return [false, null, null];
      }

    },

    _bindEvents: function () {

      if (this._attTable === undefined || this._attTable === null) {
        return;
      }

      if (this._attTable.length > 0) {
        array.forEach(this._attTable, function (row) {
          var rowInfo = this._getRowInfo(row);
          if (this._fieldsWithRules.indexOf(rowInfo[3]) !== -1) {
            if (rowInfo[2].declaredClass === 'dijit.form.FilteringSelect') {
              on(rowInfo[2], 'change', lang.hitch(this, this._smartComboValidate()));
            }
          }
        }, this);
      }

    },
    processFilter: function (filter) {
      var partResults = [];
      array.forEach(filter.parts, function (part) {
        if (part.hasOwnProperty('parts')) {
          partResults.push(this.processFilter(part, this._feature));
        }
        else {
          var value1 = null;
          var value2 = null;

          if (part.valueObj.hasOwnProperty('value')) {
            value1 = part.valueObj.value;
          }
          if (part.valueObj.hasOwnProperty('value1')) {
            value1 = part.valueObj.value1;
          }
          if (part.valueObj.hasOwnProperty('value2')) {
            value2 = part.valueObj.value2;
          }

          switch (part.valueObj.type) {
            case 'value':
              partResults.push(this.validatePart(part.operator,
                               this._feature.attributes[part.fieldObj.name],
                               value1,
                               value2,
                               part.caseSensitive));
              break;
            case 'unique':
              partResults.push(this.validatePart(part.operator,
                               this._feature.attributes[part.fieldObj.name],
                               value1,
                               value2,
                               part.caseSensitive));
              break;
            case 'field':
              //Translate the field to a value
              if (this._feature.attributes.hasOwnProperty(value1)) {
                value1 = this._feature.attributes[value1];
              }
              partResults.push(this.validatePart(part.operator,
                                                 this._feature.attributes[part.fieldObj.name],
                                                 value1,
                                                 value2,
                                                 part.caseSensitive));
              break;
            default:
              break;
          }
        }
      }, this);

      return this.ruleValid(partResults, filter.logicalOperator);
    },
    ruleValid: function (partResults, logOp) {
      var performAction = false;

      if (logOp === undefined || logOp === null) {
        logOp = 'OR';
      }
      array.some(partResults, function (result) {

        if (logOp === 'OR') {
          if (result === true) {
            performAction = true;
            return true;
          }
          else {
            performAction = false;
          }
        } else {
          if (result === false) {
            performAction = false;
            return true;
          } else {
            performAction = true;
          }
        }
      });
      return performAction;

    },
    myIsNaN: function (o) {
      return o !== o;
    },
    _isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    validatePart: function (operator, field, value1, value2, caseSensitive) {
      var d = null;
      if (operator === undefined || operator === null) {
        return false;
      }
      if (operator.lastIndexOf('string', 0) === 0) {
        if (caseSensitive === false) {
          if (field !== undefined && field !== null) {
            field = String(field).toUpperCase();
          }
          if (value1 !== undefined && value1 !== null) {
            value1 = String(value1).toUpperCase();
          }
          if (value2 !== undefined && value2 !== null) {
            value2 = String(value2).toUpperCase();
          }

        }
      }
      else if (operator.lastIndexOf('date', 0) === 0) {
        if (value1 !== undefined && value1 !== null) {
          value1 = new Date(value1);
        }
        if (value2 !== undefined && value2 !== null) {
          value2 = new Date(value2);
        }
      }

      switch (operator) {
        case this.OPERATORS.stringOperatorIs:

          if (field === value1) {
            return true;
          }
          break;
        case this.OPERATORS.stringOperatorIsNot:
          if (field !== value1) {
            return true;
          }
          break;
        case this.OPERATORS.stringOperatorStartsWith:
          if (field === null && value1 === null) {
            return true;
          }
          if (field === null && value1 !== null) {
            return false;
          }
          if (field !== null && value1 === null) {
            return false;
          }
          if (field.lastIndexOf(value1, 0) === 0) {
            return true;
          }

          break;
        case this.OPERATORS.stringOperatorEndsWith:
          if (field === null && value1 === null) {
            return true;
          }
          if (field === null && value1 !== null) {
            return false;
          }
          if (field !== null && value1 === null) {
            return false;
          }
          return this._endsWith(field, value1);
        case this.OPERATORS.stringOperatorContains:
          if (field === null && value1 === null) {
            return true;
          }
          if (field === null && value1 !== null) {
            return false;
          }
          if (field !== null && value1 === null) {
            return false;
          }
          if (String(field).toUpperCase().indexOf(value1.toUpperCase()) >= 0) {
            return true;
          }
          break;
        case this.OPERATORS.stringOperatorDoesNotContain:
          if (field === null && value1 === null) {
            return false;
          }
          if (field === null && value1 !== null) {
            return true;
          }
          if (field !== null && value1 === null) {
            return true;
          }
          if (String(field).toUpperCase().indexOf(value1.toUpperCase()) >= 0) {
            return false;
          } else {
            return true;
          }
          break;
        case this.OPERATORS.stringOperatorIsBlank:
          return (field === undefined || field === null || field === "");
        case this.OPERATORS.stringOperatorIsNotBlank:
          return (field !== undefined && field !== null && field !== "");
        case this.OPERATORS.numberOperatorIs:
          if (this._isNumeric(field)) {
            return String(field) === String(value1);
          }
          return false;
        case this.OPERATORS.numberOperatorIsNot:
          if (this._isNumeric(field)) {
            return (String(field) !== String(value1));
          }
          return false;
        case this.OPERATORS.numberOperatorIsAtLeast:
          if (this._isNumeric(field) && this._isNumeric(value1)) {
            return Number(field) >= Number(value1);
          }
          return false;
        case this.OPERATORS.numberOperatorIsLessThan:
          if (this._isNumeric(field) && this._isNumeric(value1)) {
            return Number(field) < Number(value1);
          }
          return false;
        case this.OPERATORS.numberOperatorIsAtMost:
          if (this._isNumeric(field) && this._isNumeric(value1)) {
            return Number(field) <= Number(value1);
          }
          return false;
        case this.OPERATORS.numberOperatorIsGreaterThan:
          if (this._isNumeric(field) && this._isNumeric(value1)) {
            return Number(field) > Number(value1);
          }
          return false;
        case this.OPERATORS.numberOperatorIsBetween:
          if (this._isNumeric(field) && this._isNumeric(value1) && this._isNumeric(value2)) {
            return Number(field) > Number(value1) && Number(field) < Number(value2);
          }
          return false;
        case this.OPERATORS.numberOperatorIsNotBetween:
          if (this._isNumeric(field) && this._isNumeric(value1) && this._isNumeric(value2)) {
            return Number(field) <= Number(value1) || Number(field) >= Number(value2);
          }
          return false;
        case this.OPERATORS.numberOperatorIsBlank:
          if (field === null || field === undefined ||
            this._isNumeric(field) === false) {
            return true;
          }
          return false;
        case this.OPERATORS.numberOperatorIsNotBlank:
          if (field !== null && field !== undefined &&
             this._isNumeric(field) === true) {
            return true;
          }
          return false;
        case this.OPERATORS.dateOperatorIsOn:
          if (field === undefined || field === null) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }

          d = new Date(field);
          //d.setUTCSeconds(field);
          return value1.toDateString() === d.toDateString();
        case this.OPERATORS.dateOperatorIsNotOn:
          if (field === undefined || field === null) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }

          d = new Date(field);
          //d.setUTCSeconds(field);
          var res = (value1.toDateString() === d.toDateString());
          return (!res);
        case this.OPERATORS.dateOperatorIsBefore:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          return field < (value1.getTime());
        case this.OPERATORS.dateOperatorIsAfter:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          return field > (value1.getTime());
        case this.OPERATORS.dateOperatorIsOnOrBefore:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          return field < (value1.getTime());
        case this.OPERATORS.dateOperatorIsOnOrAfter:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          return field > (value1.getTime());
        case this.OPERATORS.dateOperatorInTheLast:
          return false;
        case this.OPERATORS.dateOperatorNotInTheLast:
          return false;
        case this.OPERATORS.dateOperatorIsBetween:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          if (value2 === undefined || value2 === null) {
            return false;
          }
          return field > (value1.getTime()) && field < (value2.getTime());
        case this.OPERATORS.dateOperatorIsNotBetween:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          if (value2 === undefined || value2 === null) {
            return false;
          }
          return field <= (value1.getTime()) || field >= (value2.getTime());
        case this.OPERATORS.dateOperatorIsBlank:
          if (field === null || field === undefined) {
            return true;
          }
          return false;
        case this.OPERATORS.dateOperatorIsNotBlank:
          if (field !== null && field !== undefined) {
            return true;
          }
          return false;
        case this.OPERATORS.dateOperatorMinutes:
          //Not exposed in control, not implemented in app
          if (field === null || field === undefined) {
            //return true;
          }
          return false;
        case this.OPERATORS.dateOperatorHours:
          //Not exposed in control, not implemented in app
          if (field === null || field === undefined) {
            //return true;
          }
          return false;
        case this.OPERATORS.dateOperatorDays:
          //Not exposed in control, not implemented in app
          if (field === null || field === undefined) {
            //return true;
          }
          return false;
        case this.OPERATORS.dateOperatorWeeks:
          //Not exposed in control, not implemented in app
          if (field === null || field === undefined) {
            //return true;
          }
          return false;
        case this.OPERATORS.dateOperatorMonths:
          //Not exposed in control, not implemented in app
          if (field === null || field === undefined) {
            //return true;
          }
          return false;
        case this.OPERATORS.dateOperatorYears:
          //Not exposed in control, not implemented in app
          if (field === null || field === undefined) {
            //return true;
          }
          return false;
        case this.OPERATORS.dateOperatorInTheLast:
          //Not exposed in control, not implemented in app
          if (field === null || field === undefined) {
            //return true;
          }
          return false;
        case this.OPERATORS.dateOperatorNotInTheLast:
          //Not exposed in control, not implemented in app
          if (field === null || field === undefined) {
            //return true;
          }
          return false;
        default:
          return false;
      }
      return false;
    },
    _processChildNodes: function (element, state) {
      element.disabled = state;
      if (state === true) {
        if (element.style) {
          element.style.pointerEvents = 'none';
        }
      }
      else {
        if (element.style) {
          element.style.pointerEvents = 'auto';
        }
      }
      array.forEach(element.childNodes, function (node) {
        node.disabled = state;
        if (state === true) {
          if (node.style) {
            node.style.pointerEvents = 'none';
          }
        }
        else {
          if (node.style) {
            node.style.pointerEvents = 'auto';
          }
        }

        if (node.childNodes.length > 0) {
          this._processChildNodes(node, state);
        }
      }, this);
    },
    _smartComboValidate: function () {
      this.toggleFields();

    },
    _getRowInfo: function (row) {
      var valueCell = row.parentNode.childNodes[1].childNodes[0];
      var valueCell2 = null;
      if (row.parentNode.childNodes[1].childNodes.length > 1) {
        valueCell2 = row.parentNode.childNodes[1].childNodes[1];
      }
      var label;
      if (this.useFieldName === true) {
        if (row.hasAttribute("data-fieldname")) {
          label = row.getAttribute("data-fieldname");
        }
        else {
          label = row.childNodes[0].data;
        }
      }
      else {
        label = row.childNodes[0].data;
      }

      var parent = row.parentNode;
      var widget = registry.getEnclosingWidget(valueCell);

      return [valueCell, parent, widget, label, valueCell2];
    },
    _removeRequireFieldMarkings: function (valueCell, parent, widget) {
      var nl = null;
      //if (this._gdbRequiredFields.indexOf(fieldName) === -1) {
      if (widget === undefined || widget === null) {

        if (domClass.contains(valueCell, "dijitComboBoxError")) {
          domClass.remove(valueCell, "dijitComboBoxError");
        }
        if (domClass.contains(valueCell, "dijitTextBoxError")) {
          domClass.remove(valueCell, "dijitTextBoxError");
        }
        if (domClass.contains(valueCell, "dijitValidationTextBox")) {
          domClass.remove(valueCell, "dijitValidationTextBox");
        }
        if (domClass.contains(valueCell, "dijitValidationTextBoxError")) {
          domClass.remove(valueCell, "dijitValidationTextBoxError");
        }
        if (domClass.contains(valueCell, "dijitError")) {
          domClass.remove(valueCell, "dijitError");
        }
        nl = query(".dijitValidationContainer", parent);
        array.forEach(nl, function (node) {
          node.parentNode.removeChild(node);
        });
      }
      else {
        var valid = lang.isFunction(widget.isValid) ? widget.isValid() : true;

        if (widget.declaredClass === 'dijit.form.TextBox' && valid === true) {
          if (domClass.contains(valueCell, "dijitTextBoxError")) {
            domClass.remove(valueCell, "dijitTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBox")) {
            domClass.remove(valueCell, "dijitValidationTextBox");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBoxError")) {
            domClass.remove(valueCell, "dijitValidationTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitError")) {
            domClass.remove(valueCell, "dijitError");
          }
          nl = query(".dijitValidationContainer", parent);
          array.forEach(nl, function (node) {
            node.parentNode.removeChild(node);
          });
        }
        else if (widget.declaredClass === 'dijit.form.ValidationTextBox' && valid === true) {
          if (domClass.contains(valueCell, "dijitTextBoxError")) {
            domClass.remove(valueCell, "dijitTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitTextBoxDisabled")) {
            domClass.remove(valueCell, "dijitTextBoxDisabled");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBoxError")) {
            domClass.remove(valueCell, "dijitValidationTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitError")) {
            domClass.remove(valueCell, "dijitError");
          }
        }
        else if (widget.declaredClass === 'dijit.form.DateTextBox' && valid === true) {
          if (domClass.contains(valueCell, "dijitTextBoxError")) {
            domClass.remove(valueCell, "dijitTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBox")) {
            domClass.remove(valueCell, "dijitValidationTextBox");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBoxError")) {
            domClass.remove(valueCell, "dijitValidationTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitError")) {
            domClass.remove(valueCell, "dijitError");
          }
          nl = query(".dijitValidationContainer", parent);
          array.forEach(nl, function (node) {
            node.parentNode.removeChild(node);
          });
        }
        else if (widget.declaredClass === 'dijit.form.TimeTextBox' && valid === true) {
          if (domClass.contains(valueCell, "dijitTextBoxError")) {
            domClass.remove(valueCell, "dijitTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBox")) {
            domClass.remove(valueCell, "dijitValidationTextBox");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBoxError")) {
            domClass.remove(valueCell, "dijitValidationTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitError")) {
            domClass.remove(valueCell, "dijitError");
          }
          nl = query(".dijitValidationContainer", parent);
          array.forEach(nl, function (node) {
            node.parentNode.removeChild(node);
          });
        }
        else if (widget.declaredClass === 'dijit.form.FilteringSelect' && valid === true) {

          if (domClass.contains(valueCell, "dijitTextBoxError")) {
            domClass.remove(valueCell, "dijitTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitComboBoxError")) {
            domClass.remove(valueCell, "dijitComboBoxError");
          }
          if (domClass.contains(valueCell, "dijitError")) {
            domClass.remove(valueCell, "dijitError");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBoxError")) {
            domClass.remove(valueCell, "dijitValidationTextBoxError");
          }
        } else if (valid === true) {
          if (domClass.contains(valueCell, "dijitComboBoxError")) {
            domClass.remove(valueCell, "dijitComboBoxError");
          }
          if (domClass.contains(valueCell, "dijitTextBoxError")) {
            domClass.remove(valueCell, "dijitTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBox")) {
            domClass.remove(valueCell, "dijitValidationTextBox");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBoxError")) {
            domClass.remove(valueCell, "dijitValidationTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitError")) {
            domClass.remove(valueCell, "dijitError");
          }
          nl = query(".dijitValidationContainer", parent);
          array.forEach(nl, function (node) {
            node.parentNode.removeChild(node);
          });

        }
      }
      //}

    },
    _removeRedAst: function (row, fieldName) {
      if (this._gdbRequiredFields.indexOf(fieldName) === -1) {

        var astNode = query("a.asteriskIndicator", row);

        if (astNode.length > 0) {
          array.forEach(astNode, function (node) {
            node.parentNode.removeChild(node);
          });
        }
      }
    },
    _removeHideRule: function (parent) {
      if (domClass.contains(parent, "hideField")) {
        domClass.remove(parent, "hideField");
      }
    },
    _removeDisableRule: function (fieldName, valueCell) {
      if (this._notEditableFields.indexOf(fieldName) === -1) {
        if (domClass.contains(valueCell, "dijitTextBoxDisabled")) {
          domClass.remove(valueCell, "dijitTextBoxDisabled");
        }
        if (domClass.contains(valueCell, "dijitComboBoxDisabled")) {
          domClass.remove(valueCell, "dijitComboBoxDisabled");
        }
        if (domClass.contains(valueCell, "dijitValidationTextBoxDisabled")) {
          domClass.remove(valueCell, "dijitValidationTextBoxDisabled");
        }
        if (domClass.contains(valueCell, "dijitDisabled")) {
          domClass.remove(valueCell, "dijitDisabled");
        }
      }
      this._processChildNodes(valueCell, false);
    },
    _remove: function (row, fieldName, valueCell, parent, widget) {
      this._removeRequireFieldMarkings(valueCell, parent, widget);
      this._removeRedAst(row[0], fieldName);
      this._removeDisableRule(fieldName, valueCell);
      this._removeHideRule(parent);
    },
    toggleFieldOnAttributeInspector: function (fieldName, actionType, fieldHasValidValue) {
      if (this._gdbRequiredFields === undefined || this._gdbRequiredFields === null) {
        this._gdbRequiredFields = [];
      }
      if (this._notEditableFields === undefined || this._notEditableFields === null) {
        this._notEditableFields = [];
      }
      if (this._attTable === undefined || this._attTable === null) {
        return;
      }

      if (this._attTable.length > 0) {
        var row = dojo.filter(this._attTable, lang.hitch(this, function (row) {
          if (row.childNodes) {
            if (row.childNodes.length > 0) {
              if (this.useFieldName === true) {
                if (row.hasAttribute("data-fieldname")) {
                  return row.getAttribute("data-fieldname") === fieldName;
                }
                else {
                  return row.childNodes[0].data === fieldName;
                }
              }
              else {
                return row.childNodes[0].data === fieldName;
              }
            }
          }
          return false;
        }));
        var nl = null;
        if (row !== null) {
          if (row.length > 0) {
            var rowInfo = this._getRowInfo(row[0]);

            var valueCell = rowInfo[0];
            var valueCell2 = rowInfo[4];
            var parent = rowInfo[1];
            var widget = rowInfo[2];
            //var fieldName2 = rowInfo[3];
            if (widget !== undefined && widget !== null) {
              switch (actionType) {
                case 'Hide':
                  this._removeRequireFieldMarkings(valueCell, parent, widget);
                  this._removeRedAst(row[0], fieldName);
                  this._removeDisableRule(fieldName, valueCell);
                  domClass.add(parent, "hideField");
                  break;
                case 'Disabled':
                  this._removeRedAst(row[0], fieldName);
                  this._removeHideRule(parent);
                  this._removeRequireFieldMarkings(valueCell, parent, widget);
                  domClass.add(valueCell, ["dijitValidationTextBox", "dijitTextBoxDisabled",
                    "dijitComboBoxDisabled", "dijitValidationTextBoxDisabled", "dijitDisabled"]);
                  this._processChildNodes(valueCell, true);

                  if (valueCell2 !== null) {
                    this._removeRequireFieldMarkings(valueCell2, parent, widget);
                    domClass.add(valueCell2, ["dijitValidationTextBox", "dijitTextBoxDisabled",
                   "dijitComboBoxDisabled", "dijitValidationTextBoxDisabled", "dijitDisabled"]);

                    this._processChildNodes(valueCell2, true);
                  }
                  break;
                case 'Required':
                  this._removeDisableRule(fieldName, valueCell);
                  this._removeHideRule(parent);
                  if (fieldHasValidValue === true) {
                    this._removeRequireFieldMarkings(valueCell, parent, widget);
                  } else {
                    if (widget.declaredClass === 'dijit.form.TextBox') {

                      nl = query(".dijitValidationContainer", parent);
                      if (nl.length === 0) {

                        var newDiv = document.createElement('div');
                        newDiv.setAttribute('class', "dijitReset dijitValidationContainer");
                        var newIn = document.createElement('input');
                        newIn.setAttribute('class', "dijitReset dijitInputField dijitValidationIcon " +
                          "dijitValidationInner");
                        newIn.setAttribute('value', "x");
                        newIn.setAttribute('type', 'text');
                        newIn.setAttribute('tabindex', '-1');
                        newIn.setAttribute('readonly', 'readonly');
                        newIn.setAttribute('role', 'presentation');
                        newDiv.appendChild(newIn);
                        valueCell.insertBefore(newDiv, valueCell.childNodes[0]);
                      }

                      domClass.add(valueCell, ["dijitTextBoxError", "dijitValidationTextBox",
                        "dijitValidationTextBoxError", "dijitError"]);
                    } else if (widget.declaredClass === 'dijit.form.ValidationTextBox') {
                      nl = query(".dijitValidationContainer", parent);
                      domClass.add(valueCell, ["dijitTextBoxError", "dijitValidationTextBox",
                        "dijitValidationTextBoxError", "dijitError"]);
                    } else if (widget.declaredClass === 'dijit.form.FilteringSelect') {
                      domClass.add(valueCell, ["dijitTextBoxError", "dijitComboBoxError",
                        "dijitError", "dijitValidationTextBoxError"]);
                    }
                    else {
                      domClass.add(valueCell, ["dijitTextBoxError", "dijitError"]);
                    }
                  }

                  var astNode = query("a.asteriskIndicator", row[0]);
                  var isMarkRequired = query("span.atiRequiredField", row[0]);
                  if (this._gdbRequiredFields.indexOf(fieldName) === -1) {

                    if (astNode.length === 0 && isMarkRequired.length === 0) {
                      var newA = document.createElement('a');
                      newA.setAttribute('class', "asteriskIndicator");
                      newA.innerHTML = " *";
                      row[0].appendChild(newA);
                    }
                  }
                  break;
                case 'Value':
                  break;
                default:
                  this._remove(row, fieldName, valueCell, parent, widget);
              }
            }
          }
        }

      }
    }

  });
});
