/*
// Copyright © 2014 - 2018 Esri. All rights reserved.

TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
Unpublished material - all rights reserved under the
Copyright Laws of the United States and applicable international
laws, treaties, and conventions.

For additional information, contact:
Attn: Contracts and Legal Department
Environmental Systems Research Institute, Inc.
380 New York Street
Redlands, California, 92373
USA

email: contracts@esri.com
*/

define([
  "dojo/_base/lang",
  "dojo/_base/array",
  'dojo/dom-construct',
  'dijit/form/DateTextBox',
  'dijit/form/NumberSpinner',
  'dijit/form/NumberTextBox',
  'dijit/form/FilteringSelect',
  'dijit/form/TextBox',
  'dijit/form/ValidationTextBox',
  'dijit/form/TimeTextBox',
  "dijit/Editor",
  "dijit/form/SimpleTextarea",
  'dojo/store/Memory'
],
  function (
    lang,
    array,
    domConstruct,
    DateTextBox,
    NumberSpinner,
    NumberTextBox,
    FilteringSelect,
    TextBox,
    ValidationTextBox,
    TimeTextBox,
    Editor,
    SimpleTextarea,
    Memory
  ) {

    var mo = {};

    mo.integerFields = [
      "esriFieldTypeSmallInteger",
      "esriFieldTypeInteger",
      "esriFieldTypeSingle",
      "esriFieldTypeDouble"];

    mo.getFieldInfoByFieldName = function (fieldInfos, fieldName) {
      var fieldInfo = {};
      array.some(fieldInfos, function (field) {
        if (field.name === fieldName) {
          lang.mixin(fieldInfo, field);
          return true;
        }
      });
      return fieldInfo;
    };

    mo.getDateFieldValue = function (field, dijit) {
      var newFieldVal;
      // Convert to epoch time if fieldType is date/time
      if (field.type === "esriFieldTypeDate") {
        if (dijit instanceof Array) {
          var dateObj, timeObj;
          // Get individual date & time values for sync
          if (dijit.length > 0 && dijit[0]) {
            dateObj = dijit[0].getValue();
          }
          if (dijit.length > 1 && dijit[1]) {
            timeObj = dijit[1].getValue();
          }
          if (dateObj && timeObj) {
            newFieldVal = new Date(
              dateObj.getFullYear(),
              dateObj.getMonth(),
              dateObj.getDate(),
              timeObj.getHours(),
              timeObj.getMinutes(),
              timeObj.getSeconds(),
              timeObj.getMilliseconds()
            );
          }
          else {
            newFieldVal = dateObj || timeObj || null;
          }
        }
        else {
          newFieldVal = dijit.getValue();
          if (field.domain) {
            newFieldVal = Number(newFieldVal);
          }
        }
        newFieldVal = (newFieldVal && newFieldVal.getTime) ?
          newFieldVal.getTime()
          : (newFieldVal && newFieldVal.toGregorian ? newFieldVal.toGregorian().getTime() : newFieldVal);
      }
      return newFieldVal;
    };

    mo.isGuid = function (value) {
      if (value[0] === "{") {
        value = value.substring(1, value.length - 1);
      }
      var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
      return regexGuid.test(value);
    };

    mo.validateGUID = function (value, constraints) {
      constraints = constraints;
      return this.isGuid(value);
    };

    mo.isValidPresetValue = function (nodes) {
      var isValid = true;
      array.some(nodes, function (node) {
        if (node.isValid && !node.isValid()) {
          isValid = false;
          return true;
        }
      });
      return isValid;
    };

    mo.createPresetFieldContentNode = function (fieldInfo) {
      var nodes = [];
      var node;

      if (fieldInfo.domain) {
        // domain.type = codedValue
        if (fieldInfo.domain.type === "codedValue") {
          var domainValues = fieldInfo.domain.codedValues;

          var options = [];
          array.forEach(domainValues, function (dv) {
            options.push({ name: dv.name, id: dv.code });
          });

          node = new FilteringSelect({
            "class": "ee-inputField",
            name: fieldInfo.fieldName,
            store: new Memory({ data: options }),
            searchAttr: "name"
          }, domConstruct.create("div"));

        } else { //domain.type = range
          var cons = null;
          switch (fieldInfo.type) {
            case "esriFieldTypeSmallInteger":
            case "esriFieldTypeInteger":
              cons = {
                min: fieldInfo.domain.minValue,
                max: fieldInfo.domain.maxValue,
                places: 0
              };
              break;

            case "esriFieldTypeSingle":
            case "esriFieldTypeDouble":
              cons = {
                min: fieldInfo.domain.minValue,
                max: fieldInfo.domain.maxValue
              };
              break;

          }
          node = new NumberSpinner({
            "class": "ee-inputField",
            name: fieldInfo.fieldName,
            smallDelta: 1,
            constraints: cons
          }, domConstruct.create("div"));

        }

        nodes.push(node);

      } else {
        switch (fieldInfo.type) {
          case "esriFieldTypeGUID":
            node = new ValidationTextBox({
              "class": "ee-inputField",
              name: fieldInfo.fieldName
            }, domConstruct.create("div"));
            node.validator = lang.hitch(this, this.validateGUID);
            nodes.push(node);
            break;
          case "esriFieldTypeDate":
            node = new DateTextBox({
              "class": "ee-inputField",

              name: fieldInfo.fieldName
            }, domConstruct.create("div"));
            //value: new Date(),
            nodes.push(node);

            if (fieldInfo.format) {
              if (fieldInfo.format.time && fieldInfo.format.time === true) {
                var timeNode = new TimeTextBox({
                  "class": "ee-inputField",
                  "style": "margin-top:2px;"

                }, domConstruct.create("div"));
                nodes.push(timeNode);
                //value: new Date()
              }
            }

            break;
          case "esriFieldTypeString":
            var maxlength = null;
            if (fieldInfo.length &&
              Number(fieldInfo.length) &&
              Number(fieldInfo.length) > 0) {
              maxlength = fieldInfo.length;
            }
            if (fieldInfo.hasOwnProperty("stringFieldOption")) {
              if (fieldInfo.stringFieldOption === "richtext") {
                var params = {
                  'class': 'ee-inputField ee-inputFieldRichText',
                  trim: true,
                  maxLength: maxlength
                };
                params['class'] += ' atiRichTextField';
                params.height = '100%';
                params.width = '100%';
                params.name = fieldInfo.fieldName;
                params.plugins = ['bold', 'italic', 'underline', 'foreColor', 'hiliteColor', '|', 'justifyLeft',
                  'justifyCenter', 'justifyRight', 'justifyFull', '|', 'insertOrderedList', 'insertUnorderedList',
                  'indent', 'outdent', '|', 'createLink'];
                node = new Editor(params, domConstruct.create("div"));
                node.startup();
              }
              else if (fieldInfo.stringFieldOption === "textarea") {
                node = new SimpleTextarea({
                  "class": "ee-inputField ee-inputFieldTextArea",
                  name: fieldInfo.fieldName,
                  maxlength: maxlength
                }, domConstruct.create("div"));
              }
              else {
                node = new TextBox({
                  "class": "ee-inputField",
                  name: fieldInfo.fieldName,
                  maxlength: maxlength
                }, domConstruct.create("div"));
              }
            }
            else {
              node = new TextBox({
                "class": "ee-inputField",
                name: fieldInfo.fieldName,
                maxlength: maxlength
              }, domConstruct.create("div"));

            }
            nodes.push(node);
            break;
          // todo: check for more types
          case "esriFieldTypeSmallInteger":
          case "esriFieldTypeInteger":
            node = new NumberTextBox({
              "class": "ee-inputField",
              name: fieldInfo.fieldName,
              constraints: { places: 0 }
            }, domConstruct.create("div"));

            nodes.push(node);

            break;
          case "esriFieldTypeSingle":
          case "esriFieldTypeDouble":
            node = new NumberTextBox({
              "class": "ee-inputField",
              name: fieldInfo.fieldName
            }, domConstruct.create("div"));

            nodes.push(node);

            break;
          default:
            node = new TextBox({
              "class": "ee-unsupportField",
              name: fieldInfo.fieldName,
              value: "N/A",
              readOnly: true
            }, domConstruct.create("div"));
            nodes.push(node);
            break;
        }
      }
      return nodes;
    };

    mo.changeFieldToMostRestrictive = function (existingField, newField) {
      if (!existingField.hasOwnProperty('type') && newField.hasOwnProperty('type')) {
        return newField;
      }
      if (newField.length && Number(newField.length) && Number(newField.length) > 0) {
        if (existingField.length && Number(existingField.length)) {
          if (newField.length < existingField.length) {
            existingField.length = newField.length;
          }
        }
        else {
          existingField.length = newField.length;
        }
      }
      if (existingField.type === newField.type) {
        switch (newField.type) {
          case "esriFieldTypeString":
            if (existingField.hasOwnProperty("stringFieldOption") && newField.hasOwnProperty("stringFieldOption")) {
              if (existingField.stringFieldOption === "richtext" && newField.stringFieldOption !== "richtext") {
                existingField.stringFieldOption = newField.stringFieldOption;
              }
              else if (existingField.stringFieldOption === "textarea" && newField.stringFieldOption === "textbox") {
                existingField.stringFieldOption = newField.stringFieldOption;
              }
            }
            break;
        }
      }
      return existingField;
    };

    return mo;
  });