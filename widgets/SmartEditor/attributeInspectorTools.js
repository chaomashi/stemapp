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

// jscs:disable validateIndentation
define([
  "dojo/_base/declare",
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/query',
  'dojo/on',
  'dojo/dom-class',
  'dojo/topic',
  'dijit/registry',
  'jimu/BaseWidgetSetting'
], function (
  declare,
  lang,
  array,
  query,
  on,
  domClass,
  topic,
  registry,
  BaseWidgetSetting
  ) {
  return declare([BaseWidgetSetting], {
    _attrInspector: null,
    _feature: null,
    _fieldInfo: null,
    _guidFields: null,
    _guidFieldNames: null,
    _intFieldNames: null,
    _dblFieldNames: null,
    _dateFieldNames: null,
    _stringFields: null,
    _requiredNonDomainIntFields: null,
    _requiredNonDomainDecFields: null,
    _fieldNameToAlias: null,
    _attTable: null,
    _mapLayer: null,
    constructor: function () {
      this.inherited(arguments);
      lang.mixin(this, arguments[0]);
      this._mapLayer = this._feature.getLayer();
      this._processLayer();
      //Added to handle issue with attribute inspector when no field are included, it adds the edit tracking fields to the field collection
      this._fieldInfo = array.filter(this._fieldInfo, function (field) {
        if (field.label) {
          return true;
        } else {
          return false;
        }
      });
      this._attTable = query("td.atiLabel", this._attrInspector.domNode);
      if (this._attTable === undefined || this._attTable === null) {
        return;
      }
      this._addValidation();
    },
    _checkFeatureData: function (attributes) {
      array.forEach(this._fieldInfo, function (finfo) {
        if (attributes.hasOwnProperty(finfo.fieldName)) {
          switch (finfo.type) {
            case "esriFieldTypeString":
              if (finfo.length > 0 && attributes[finfo.fieldName] !== null) {

                if (attributes[finfo.fieldName].length > finfo.length) {
                  attributes[finfo.fieldName] =
                    attributes[finfo.fieldName].substring(0, finfo.length);
                }
              }
              break;
            case "esriFieldTypeGUID":
              if (this._isGuid(attributes[finfo.fieldName], false)) {
                if (attributes[finfo.fieldName][0] !== "{") {
                  attributes[finfo.fieldName] = "{" + attributes[finfo.fieldName];
                }
                if (attributes[finfo.fieldName][attributes[finfo.fieldName].length - 1] !== "}") {
                  attributes[finfo.fieldName] = attributes[finfo.fieldName] + "}";
                }
              }
              break;
            case "esriFieldTypeSingle":
            case "esriFieldTypeDouble":
              if (this.isNumeric(attributes[finfo.fieldName])) {
                attributes[finfo.fieldName] = parseFloat(attributes[finfo.fieldName]);
              }
              break;
            case "esriFieldTypeDate":
              if (this.isNumeric(attributes[finfo.fieldName])) {
                attributes[finfo.fieldName] = parseInt(attributes[finfo.fieldName], 10);
              }
              break;
            case "esriFieldTypeSmallInteger":
            case "esriFieldTypeInteger":
              if (this.isNumeric(attributes[finfo.fieldName])) {
                attributes[finfo.fieldName] = parseInt(attributes[finfo.fieldName], 10);
              }
              break;
          }
        }
      }, this);
      return attributes;
    },
    _processLayer: function () {
      this._guidFields = [];
      this._guidFieldNames = [];
      this._dateFieldNames = [];
      this._intFieldNames = [];
      this._dblFieldNames = [];
      this._stringFields = [];
      this._requiredNonDomainIntFields = [];
      this._requiredNonDomainDecFields = [];
      array.forEach(this._fieldInfo, function (finfo) {
        if (finfo.hasOwnProperty('label') && finfo.hasOwnProperty('type')) {
          var fieldLabel = finfo.label;
          if (fieldLabel.indexOf('<a class="asteriskIndicator"> *</a>') >= 0) {
            fieldLabel = fieldLabel.replace('<a class="asteriskIndicator"> *</a>', '');
          }
          switch (finfo.type) {
            case "esriFieldTypeString":
              this._stringFields.push(finfo.fieldName);
              break;
            case "esriFieldTypeGUID":
              this._guidFields.push(fieldLabel);
              this._guidFieldNames.push(finfo.fieldName);
              break;
            case "esriFieldTypeSingle":
            case "esriFieldTypeDouble":
              if (finfo.nullable === false && (finfo.domain === undefined ||
               finfo.domain === null)) {
                this._requiredNonDomainDecFields.push(fieldLabel);
              }
              this._dblFieldNames.push(finfo.fieldName);
              break;
            case "esriFieldTypeDate":
              this._dateFieldNames.push(finfo.fieldName);
              break;
            case "esriFieldTypeSmallInteger":
            case "esriFieldTypeInteger":
              if (finfo.nullable === false && (finfo.domain === undefined ||
                finfo.domain === null)) {
                this._requiredNonDomainIntFields.push(fieldLabel);
              }
              this._intFieldNames.push(finfo.fieldName);
              break;
          }
        }
      }, this);
    },
    formValid: function () {
      var valid = true;
      if (this._attTable === undefined || this._attTable === null) {
        return valid;
      }

      if (this._attTable.length > 0) {

        array.some(this._attTable, function (row) {
          var rowInfo = this._getRowInfo(row);
          if (rowInfo) {
            if (rowInfo[0] === undefined || rowInfo[0] === null) {
              return false;
            } else if (lang.isFunction(rowInfo[0].isValid)) {
              valid = rowInfo[0].isValid();
              return !valid;

            }
            else {
              valid = !domClass.contains(rowInfo[2], "dijitError");
              return !valid;
            }
          } else {
            return true;
          }
          //  if (rowInfo[0].isValid && rowInfo[0].isValid())
          //  return hasError = rowInfo[0].isValid && rowInfo[0].isValid() ? rowInfo[0].isValid() : false;
          //}
        }, this);
      }
      return valid;
    },
    triggerFormValidation: function () {

      if (this._attTable === undefined || this._attTable === null) {
        return;
      }

      if (this._attTable.length > 0) {
        var firstNode = null;
        array.forEach(this._attTable, function (row) {
          var rowInfo = this._getRowInfo(row);
          if (rowInfo) {
            if (rowInfo[0] !== undefined && rowInfo[0] !== null) {
              if (firstNode === null) {
                firstNode = rowInfo[0];
              }
              var isValid = true;
              if (lang.isFunction(rowInfo[0].isValid)) {
                isValid = rowInfo[0].isValid();
              } else {
                on.emit(rowInfo[0], "change", {
                  bubbles: true,
                  cancelable: true
                });
              }
              if (isValid === false) {
                rowInfo[0].set("state", "Error");
              }
            }
          }
        }, this);
      }
    },

    _addValidation: function () {
      if (this._attTable === undefined || this._attTable === null) {
        return;
      }
      if (this._guidFields.length === 0 &&
        this._requiredNonDomainIntFields.length === 0 &&
        this._requiredNonDomainDecFields.length === 0) {
        return;
      }
      if (this._attTable.length > 0) {
        array.forEach(this._attTable, function (row) {
          var rowInfo = this._getRowInfo(row);
          if (rowInfo) {
            if (this._guidFields.indexOf(rowInfo[1]) !== -1) {
              if (rowInfo[0].declaredClass === 'dijit.form.ValidationTextBox') {
                rowInfo[0].validator = lang.hitch(this, this._validateGUID);
              }
              else if (rowInfo[0].declaredClass === 'dijit.form.TextBox') {
                rowInfo[0].isValid = lang.hitch(this, this._validateGUID_IsValid(rowInfo[0]));
                on(rowInfo[0], "change", lang.hitch(this, function () {
                  if (this._isGuid(rowInfo[0].get("value"), true) === false) {
                    domClass.add(rowInfo[2], ["dijitTextBoxError", "dijitValidationTextBox",
                         "dijitValidationTextBoxError", "dijitError"]);
                  }
                  else {
                    if (domClass.contains(rowInfo[2], "dijitTextBoxError")) {
                      domClass.remove(rowInfo[2], "dijitTextBoxError");
                    }
                    if (domClass.contains(rowInfo[2], "dijitValidationTextBox")) {
                      domClass.remove(rowInfo[2], "dijitValidationTextBox");
                    }
                    if (domClass.contains(rowInfo[2], "dijitValidationTextBoxError")) {
                      domClass.remove(rowInfo[2], "dijitValidationTextBoxError");
                    }
                    if (domClass.contains(rowInfo[2], "dijitError")) {
                      domClass.remove(rowInfo[2], "dijitError");
                    }
                  }
                  topic.publish("smartEditor/validate", null);
                }));
                rowInfo[0].validator = lang.hitch(this, this._validateGUID);
              }
            } else if (this._requiredNonDomainIntFields.indexOf(rowInfo[1]) !== -1) {
              if (rowInfo[0].declaredClass === 'dijit.form.ValidationTextBox') {
                //rowInfo[0].validator = lang.hitch(this, this._validateInt);
              }
              else if (rowInfo[0].declaredClass === 'dijit.form.NumberTextBox') {
                // rowInfo[0].validator = lang.hitch(this, this._validateInt);
              }
              else if (rowInfo[0].declaredClass === 'dijit.form.TextBox') {
                // rowInfo[0].validator = lang.hitch(this, this._validateInt);
              }
            } else if (this._requiredNonDomainDecFields.indexOf(rowInfo[1]) !== -1) {
              if (rowInfo[0].declaredClass === 'dijit.form.ValidationTextBox') {
                //rowInfo[0].validator = lang.hitch(this, this._validateDec);
              }
              else if (rowInfo[0].declaredClass === 'dijit.form.NumberTextBox') {
                //rowInfo[0].validator = lang.hitch(this, this._validateDec);
              }
              else if (rowInfo[0].declaredClass === 'dijit.form.TextBox') {
                //rowInfo[0].validator = lang.hitch(this, this._validateDec);
              }
            }
          }
        }, this);
      }

    },
    _isGuid: function (value, allowBlank) {
      if (allowBlank === true && (value === "" || value === null)) {
        return true;
      }
      if (value === "" || value === null) {
        return false;
      }
      //if (value[0] !== "{") {
      //  return false;
      //}
      //if (value[value.length - 1] !== "}") {
      //  return false;
      //}
      if (value[0] === "{") {
        value = value.substring(1, value.length - 1);
      }
      var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
      return regexGuid.test(value);
    },
    _validateGUID_IsValid: function (widget) {
      return function () {
        return this._isGuid(widget.get("value"), true);
      };
    },
    _validateGUID: function (value, constraints) {
      constraints = constraints;
      return this._isGuid(value, false);
    },
    isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    isInt: function (value) {
      /*jslint bitwise: true*/
      return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value));
      /*jslint bitwise: false*/
    },
    _validateInt: function (value, constraints) {
      //if (constraints.hasOwnProperty()
      constraints = constraints;
      return this.isInt(value);
    },
    _validateDec: function (value, constraints) {
      constraints = constraints;
      return this.isNumeric(value);
    },
    _getRowInfo: function (row) {
      try {
        if (row) {
          if (row.parentNode) {
            var valueCell = row.parentNode.childNodes[1].childNodes[0];
            var widget = registry.getEnclosingWidget(valueCell);
            //var label = row.innerHTML;
            var label = row.childNodes[0].data;
            return [widget, label, valueCell];
          }
        }
        return null;
      }
      catch (err) {
        console.log(err);
        return null;
      }
    }

  });
});