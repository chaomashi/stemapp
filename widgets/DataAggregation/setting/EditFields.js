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
define(['dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/Evented',
    'dojo/dom-construct',
    'dojo/query',
    'dijit/form/TextBox',
    'dijit/_TemplatedMixin',
    'dijit/registry',
    'jimu/BaseWidgetSetting',
    'jimu/dijit/SimpleTable',
    'jimu/dijit/Popup',
    './LookupList'
  ],
  function (declare,
    lang,
    array,
    on,
    Evented,
    domConstruct,
    query,
    TextBox,
    _TemplatedMixin,
    registry,
    BaseWidgetSetting,
    SimpleTable,
    Popup,
    LookupList) {
    return declare([BaseWidgetSetting, _TemplatedMixin, Evented], {
      baseClass: "jimu-widget-setting-fields-critical-facilities",
      templateString: '<div><div data-dojo-attach-point="fieldsTable"></div></div>',
      _layerInfo: null,
      isRecognizedValues: null,
      type: "",
      addressFields: null,

      postCreate: function() {
        this.inherited(arguments);
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
        this._initFieldsTable();

        //Accepts data from a layers fieldInfos, the locators field definitions
        if (this.type === 'fieldInfos') {
          this.popupTitle = this.nls.configureFields;
          this._setFieldsTable(this._layerInfo.fieldInfos);
        } else {
          this._setAddressFieldsTable(this.addressFields);
        }
      },

      popupEditPage: function () {
        var fieldsPopup = new Popup({
          titleLabel: this.popupTitle,
          width: this.disableDuplicateOption ? 640 : 800,
          maxHeight: 600,
          autoHeight: true,
          content: this,
          buttons: [{
            label: this.nls.ok,
            onClick: lang.hitch(this, function() {
              this._resetFieldInfos();
              fieldsPopup.close();
              this.emit('edit-fields-popup-ok');
            })
          }, {
            label: this.nls.cancel,
            classNames: ['jimu-btn-vacation'],
            onClick: lang.hitch(this, function() {
              fieldsPopup.close();
              this.emit('edit-fields-popup-cancel');
            })
          }],
          onClose: lang.hitch(this, function () {
            this.emit('edit-fields-popup-close');
          })
        });
      },

      _initFieldsTable: function() {
        var fields = [{
          name: 'visible',
          title: this.nls.display,
          type: 'checkbox',
          'class': 'display',
          width: "100px",
          hidden: typeof (this.disableDisplayOption) === 'undefined' ? false : this.disableDisplayOption,
          onChange: lang.hitch(this, this._visibleChange)
        }, {
          name: 'fieldName',
          title: this.nls.name,
          type: 'text',
          width: '190px'
        }, {
          name: 'label',
          title: this.nls.editpageAlias,
          type: 'extension',
          hidden: false,
          width: '190px',
          create: lang.hitch(this, this._createTextBox),
          setValue: lang.hitch(this, this._setTextValue),
          getValue: lang.hitch(this, this._getTextValue)
        }, {
          name: 'actions',
          title: this.nls.actions,
          type: 'actions',
          actions: ['up', 'down', 'edit'],
          'class': 'actions',
          width: '90px'
        }, {
          name: 'duplicate',
          title: this.nls.duplicate,
          type: 'checkbox',
          'class': 'display',
          width: '170px',
          hidden: typeof (this.disableDuplicateOption) === 'undefined' ? false : this.disableDuplicateOption
        }, {
          name: 'type',
          title: '',
          type: 'text',
          editable: true,
          hidden: true
        }, {
          name: 'isRecognizedValues',
          title: '',
          type: 'extension',
          hidden: true,
          create: lang.hitch(this, this._create),
          setValue: lang.hitch(this, this._setValue),
          getValue: lang.hitch(this, this._getValue)
        }];
        this._fieldsTable = new SimpleTable({
          fields: fields,
          selectable: false,
          autoHeight: true,
          style: {
            'height': '300px',
            'maxHeight': '300px'
          }
        });
        this._fieldsTable.placeAt(this.fieldsTable);
        this._fieldsTable.startup();

        this.own(on(this._fieldsTable, 'actions-edit',
          lang.hitch(this, this._onEditFieldsClick)));
      },

      _visibleChange: function (tr, cb) {
        //set duplicate cb disabled or enabled
        var duplicateCB = this._getCheckboxByClassName('.duplicate', tr);
        if (duplicateCB) {
          duplicateCB.setStatus(cb.getValue());
        }
      },

      _createTextBox: function (td) {
        //will default to field.name if blank
        var labelBox = new TextBox({
          style: {
            'height': '85%',
            'width': '100%'
          }
        });
        td.labelBox = labelBox;
        domConstruct.place(labelBox.domNode, td);
      },

      _setTextValue: function (td, value) {
        td.labelBox.set('value', value);
      },

      _getTextValue: function (td) {
        return td.labelBox.get('value');
      },

      // _create: function (td) {
      //   console.log(td);
      // },

      _setValue: function (td, fieldData) {
        td._isRecognizedValues = fieldData;
      },

      _getValue: function (td) {
        return td._isRecognizedValues;
      },

      _setFieldsTable: function(fieldInfos) {
        var skipFields = ['esriFieldTypeOID', 'esriFieldTypeGlobalID'];
        array.forEach(fieldInfos, function (fieldInfo) {
          if (fieldInfo.type && skipFields.indexOf(fieldInfo.type) === -1) {
            var defaultIsRecognizedValues = [fieldInfo.fieldName];
            if (fieldInfo.fieldName !== fieldInfo.label) {
              defaultIsRecognizedValues.push(fieldInfo.label);
            }
            var rowResults = this._fieldsTable.addRow({
              fieldName: fieldInfo.fieldName,
              label: fieldInfo.label,
              visible: fieldInfo.visible,
              type: fieldInfo.type,
              duplicate: fieldInfo.duplicate,
              isRecognizedValues: fieldInfo.isRecognizedValues || defaultIsRecognizedValues
            });
            if (rowResults && rowResults.tr) {
              var visibleCB = this._getCheckboxByClassName('.visible', rowResults.tr);
              if (visibleCB) {
                this._visibleChange(rowResults.tr, visibleCB);
              }
            }
          }
        }, this);
      },

      _getCheckboxByClassName: function(className, tr){
        var d = query(className, tr);
        if(d && d.hasOwnProperty('length') && d.length > 0){
          return registry.byNode(query('.jimu-checkbox', d[0])[0]);
        }
      },

      _setAddressFieldsTable: function (fields) {
        array.forEach(fields, function (field) {
          var l = navigator.language.toLowerCase();
          var rowResults;
          if (field.hasOwnProperty('fieldName') && field.hasOwnProperty('isRecognizedValues')) {
            rowResults = this._fieldsTable.addRow(field);
          } else {
            var locNames = field.localizedNames && field.hasOwnProperty(l);
            rowResults = this._fieldsTable.addRow({
              fieldName: locNames ? field.localizedNames[l] : field.name,
              label: locNames ? field.localizedNames[l] : field.alias,
              visible: field.hasOwnProperty('visible') ? field.visible : false,
              type: "STRING",
              duplicate: field.hasOwnProperty('duplicate') ? field.duplicate : true,
              isRecognizedValues: this._getIsRecognizedValues(field)
            });
          }
          if (rowResults && rowResults.tr) {
            var visibleCB = this._getCheckboxByClassName('.visible', rowResults.tr);
            if (visibleCB) {
              this._visibleChange(rowResults.tr, visibleCB);
            }
          }
        }, this);
      },

      _getIsRecognizedValues: function (field) {
        var l = navigator.language.toLowerCase();
        //var locNames = field.localizedNames && field.hasOwnProperty(l);
        var recNames = field.recognizedNames && field.recognizedNames.hasOwnProperty(l);
        var recVals = field.isRecognizedValues;
        return recVals ? recVals : recNames ? field.recognizedNames[l] : [field.name];
      },

      _onIsRecognizedListChanged: function (tr) {
        var rowData = this._fieldsTable.getRowData(tr);
        rowData.isRecognizedValues = this.isRecognizedValues;
        this._fieldsTable.editRow(tr, rowData);
      },

      _resetFieldInfos: function() {
        var newFieldInfos = [];
        var fieldsTableData =  this._fieldsTable.getData();
        array.forEach(fieldsTableData, function(fieldData) {
          newFieldInfos.push({
            "fieldName": fieldData.fieldName,
            "label": fieldData.label !== "" ? fieldData.label : fieldData.fieldName,
            "visible": fieldData.visible,
            "type": fieldData.type,
            "duplicate": fieldData.duplicate,
            "isRecognizedValues": fieldData.isRecognizedValues
          });
        });
        if (this.type === 'fieldInfos') {
          this._layerInfo.fieldInfos = newFieldInfos;
        } else {
          this.fieldInfos = newFieldInfos;
        }
      },

      _onEditFieldsClick: function (tr) {
        var rowData = this._fieldsTable.getRowData(tr);
        var sourceDijit = new LookupList({
          nls: this.nls,
          row: tr,
          rowData: rowData
        });

        var popup = new Popup({
          width: 400,
          autoHeight: true,
          content: sourceDijit,
          titleLabel: this.nls.lookupList + " (" + rowData.fieldName + ")",
          buttons: [{
            label: this.nls.ok,
            onClick: lang.hitch(this, function () {
              var data = popup.content.sourceList.getData();
              this.isRecognizedValues = [];
              array.forEach(data, lang.hitch(this, function (v) {
                if (this.isRecognizedValues.indexOf(v.name) === -1 && v.name !== this.nls.newNamePlaceholder) {
                  this.isRecognizedValues.push(v.name);
                }
              }));
              this._onIsRecognizedListChanged(popup.content.row);
              popup.close();
            })
          }, {
            label: this.nls.cancel,
            classNames: ['jimu-btn-vacation'],
            onClick: lang.hitch(this, function () {
              popup.close();
            })
          }],
          onClose: lang.hitch(this, function () {
          })
        });
      }
    });
  });
