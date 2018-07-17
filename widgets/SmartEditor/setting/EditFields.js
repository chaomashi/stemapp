define(
  ["dojo/_base/declare",
    "dojo/Evented",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/dom-style",
    'dojo/dom-construct',
    'dojo/on',
    'dojo/query',
    "dojo/text!./EditFields.html",
    "./FieldValidation",
    "./CopyAttributes",
    'dijit/_TemplatedMixin',
    'jimu/BaseWidgetSetting',
    'jimu/dijit/SimpleTable',
    "jimu/dijit/Popup",
    'esri/lang'
  ],
  function (
    declare,
    Evented,
    lang,
    array,
    domStyle,
    domConstruct,
    on,
    query,
    template,
    FieldValidation,
    CopyAttributes,
    _TemplatedMixin,
    BaseWidgetSetting,
    Table,
    Popup,
    esriLang
  ) {
    return declare([BaseWidgetSetting, Evented, _TemplatedMixin], {
      baseClass: "jimu-widget-smartEditor-setting-fields",
      templateString: template,
      _configInfo: null,
      _fieldValid: null,
      _fieldValidations: null,
      _fieldValues: null,
      _attachmentValidations: null,
      __layerName: null,
      postCreate: function () {
        this.inherited(arguments);
        this._initFieldsTable();
        this._setFiedsTable(this._configInfo.fieldInfos);
        this._fieldValidations = this._configInfo.fieldValidations === undefined ?
          {} : lang.clone(this._configInfo.fieldValidations);
        this._fieldValues = this._configInfo.fieldValues === undefined ?
          {} : lang.clone(this._configInfo.fieldValues);
        this._attachmentValidations = this._configInfo.attachmentValidations === undefined ?
          {} : lang.clone(this._configInfo.attachmentValidations);
        //Listen for smart attachment click event
        this.own(on(this.attachmentsValidation, "click", lang.hitch(this, function () {
          this._onAttachmentsValidationClicked();
        })));
        //Show/hide smart attachments link based on layers attachment property
        if (!this._configInfo.layerInfo.layerObject.hasAttachments) {
          domStyle.set(this.attachmentsValidation, "display", "none");
        } else {
          domStyle.set(this.attachmentsValidation, "display", "block");
        }
      },

      popupEditPage: function () {
        var fieldsPopup = new Popup({
          titleLabel: esriLang.substitute(
            { layername: this._layerName },
            this.nls.fieldsPage.title),
          width: 972,
          maxHeight: 700,
          autoHeight: true,
          content: this,
          buttons: [{
            label: this.nls.ok,
            onClick: lang.hitch(this, function () {
              if (this._validateTable()) {
                this._resetFieldInfos();
                this._configInfo.fieldValidations = this._fieldValidations;
                this._configInfo.fieldValues = this._fieldValues;
                this._configInfo.attachmentValidations = this._attachmentValidations;
                fieldsPopup.close();
              }
            })
          }, {
            label: this.nls.cancel,
            classNames: ['jimu-btn-vacation'],
            onClick: lang.hitch(this, function () {
              fieldsPopup.close();
            })
          }],
          onClose: lang.hitch(this, function () {
          })
        });
      },

      _initFieldsTable: function () {
        var fields2 = [
          {
            name: 'required',
            title: "",
            type: 'text',
            'class': 'required'
          }, {
            name: 'visible',
            title: this.nls.fieldsPage.fieldsSettingsTable.display,
            type: 'checkbox',
            'class': 'visible',
            "width": "15%"
          }, {
            name: 'isEditable',
            title: this.nls.fieldsPage.fieldsSettingsTable.edit,
            type: 'checkbox',
            'class': 'editable',
            "width": "15%"
          }, {
            name: 'fieldName',
            title: this.nls.fieldsPage.fieldsSettingsTable.fieldName,
            type: 'text',
            'class': 'fieldName',
            "width": "30%"
          }, {
            name: 'label',
            title: this.nls.fieldsPage.fieldsSettingsTable.fieldAlias,
            type: 'text',
            editable: false,
            'class': 'fieldLabel',
            "width": "30%"
          }, {
            name: 'actions',
            title: this.nls.fieldsPage.fieldsSettingsTable.actions,
            type: 'actions',
            actions: ['up', 'down', 'edit', 'copy'],
            'class': 'actions',
            "width": "10%"
          }];

        var args2 = {
          fields: fields2,
          selectable: false,
          style: {
            'height': '300px',
            'maxHeight': '300px'
          }
        };
        this._fieldsTable = new Table(args2);
        this._fieldsTable.placeAt(this.fieldsTable);
        this._fieldsTable.startup();
        var nl = query("th.simple-table-field", this._fieldsTable.domNode);
        nl.forEach(function (node) {
          var scrubText = (node.innerText === undefined || node.innerText === "") ?
            "" : node.innerText.replace(/(\r\n|\n|\r)/gm, "");
          switch (scrubText) {
            case this.nls.fieldsPage.fieldsSettingsTable.display:
              node.title = this.nls.fieldsPage.fieldsSettingsTable.displayTip;
              break;
            case this.nls.fieldsPage.fieldsSettingsTable.edit:
              node.title = this.nls.fieldsPage.fieldsSettingsTable.editTip;
              break;
            case this.nls.fieldsPage.fieldsSettingsTable.fieldName:
              node.title = this.nls.fieldsPage.fieldsSettingsTable.fieldNameTip;
              break;
            case this.nls.fieldsPage.fieldsSettingsTable.fieldAlias:
              node.title = this.nls.fieldsPage.fieldsSettingsTable.fieldAliasTip;
              break;
            case this.nls.fieldsPage.fieldsSettingsTable.actions:
              node.title = this.nls.fieldsPage.fieldsSettingsTable.actionsTip;
              break;
          }

        }, this);
        this.own(on(this._fieldsTable,
          'actions-edit',
          lang.hitch(this, this._onEditFieldInfoClick)));
      },
      _validateTable: function () {
        var rows = this._fieldsTable.getRows();

        if (rows.length === 0) { return false; }

        return array.some(rows, function (row) {
          var rowData = this._fieldsTable.getRowData(row);
          return rowData.isEditable;
        }, this);

      },
      _onEditFieldInfoClick: function (tr) {
        var rowData = this._fieldsTable.getRowData(tr);
        var popupTitle = esriLang.substitute(
          { fieldname: rowData.fieldName },
          this.nls.actionPage.title);

        //below code disables smart action on GDB required fields

        //if (rowData && rowData.isEditable !== null) {
        ////move code below here if wish to disable smart actions on gDB fields
        //}
        //else {
        //'jimu/dijit/Message'Message
        //  new Message({
        //    message: this.nls.fieldsPage.smartAttSupport
        //  });
        //}
        var layerDefinition = {
          //As per discussion with Esri, commented code to get version
          //as we are unable to get this in case of related tables
          //currentVersion: this._configInfo.layerInfo.originOperLayer.resourceInfo.currentVersion,
          fields: lang.clone(this._configInfo.layerInfo.layerObject.fields)
        };
        //below code removes the field from the smart action
        //layerDefinition.fields = array.filter(this._configInfo.mapLayer.resourceInfo.fields, function (field) {
        //  return (field.name !== rowData.fieldName);
        //});

        this._fieldValid = new FieldValidation({
          nls: this.nls,
          _layerDefinition: layerDefinition,
          _layerId: this._configInfo.layerInfo.layerObject.id,
          _url: this._configInfo.layerInfo.layerObject.url,
          _fieldValidations: this._fieldValidations,
          _fieldName: rowData.fieldName,
          _fieldAlias: rowData.label,
          popupTitle: popupTitle

        });
        this._fieldValid.popupActionsPage();
      },
      _onCopyAttrButtonClick: function (tr) {
        var rowData = this._fieldsTable.getRowData(tr);
        //if (rowData && rowData.isEditable !== null) {
        ////move code below here if wish to disable smart actions on gDB fields
        //'jimu/dijit/Message'Message
        var layerDefinition = {
          fields: lang.clone(this._configInfo.layerInfo.layerObject.fields)
        };
        this._copyAttr = new CopyAttributes({
          nls: this.nls,
          _layerDefinition: layerDefinition,
          _fieldInfos: this._configInfo.fieldInfos,
          _layerId: this._configInfo.layerInfo.layerObject.id,
          _url: this._configInfo.layerInfo.layerObject.url,
          _fieldName: rowData.fieldName,
          _fieldAlias: rowData.label,
          _fieldValues: this._fieldValues,
          _geocoderSettings: this._geocoderSettings,
          _configuredPresetInfos: this._configuredPresetInfos,
          layerInfos: this.layerInfos,
          isRelatedLayer: this.isRelatedLayer,
          map: this.map
        });
        this._copyAttr.popupActionsPage();
        this.own(on(this._copyAttr, "SetGeocoder", lang.hitch(this, function () {
          this.emit("SetGeocoder");
        })));
      },
      _onAttachmentsValidationClicked: function () {
        //configure popup title
        var popupTitle = esriLang.substitute(
          { layername: this._layerName },
          this.nls.fieldsPage.smartAttachmentPopupTitle);
        var layerDefinition = {
          fields: lang.clone(this._configInfo.layerInfo.layerObject.fields)
        };
        //Create validation dijit's instance for smart actions
        this._attachmentFieldValidation = new FieldValidation({
          nls: this.nls,
          _layerDefinition: layerDefinition,
          _layerId: this._configInfo.layerInfo.layerObject.id,
          _url: this._configInfo.layerInfo.layerObject.url,
          _fieldValidations: this._attachmentValidations,
          _fieldName: "Actions",
          _fieldAlias: "",
          popupTitle: popupTitle
        });
        this._attachmentFieldValidation.popupActionsPage();
      },
      _setFiedsTable: function (fieldInfos) {
        var addedRow, actionsColumn;
        array.forEach(fieldInfos, function (fieldInfo) {
          var displayEditFlag = fieldInfo.visible;
          if (fieldInfo.type !== "esriFieldTypeGeometry" &&
            fieldInfo.type !== "esriFieldTypeOID" &&
            fieldInfo.type !== "esriFieldTypeBlob" &&
            fieldInfo.type !== "esriFieldTypeGlobalID" &&
            fieldInfo.type !== "esriFieldTypeRaster" &&
            fieldInfo.type !== "esriFieldTypeXML") {
            if (fieldInfo.visible === false && fieldInfo.isEditable === true) {
              displayEditFlag = true; //if field is editable, force display
            }
            var newRow = {
              fieldName: fieldInfo.fieldName,
              isEditable: fieldInfo.isEditable,
              label: fieldInfo.label,
              visible: displayEditFlag
            };
            if (fieldInfo.hasOwnProperty('nullable') && fieldInfo.nullable === false) {
              newRow.required = "*";
            }
            else {
              newRow.required = "";
            }
            addedRow = this._fieldsTable.addRow(newRow).tr;
            actionsColumn = addedRow.children[addedRow.children.length - 1];
            this._addNewAction(actionsColumn.children[0], addedRow);
          }

          //var addRowResult =
          //if (fieldInfo.hasOwnProperty('nullable') && fieldInfo.nullable === false) {
          //  var nl = query(".editable", addRowResult.tr);
          //  nl.forEach(function (node) {

          //    var widget = registry.getEnclosingWidget(node.childNodes[0]);
          //    widget.setStatus(false);

          //  });
          //}
        }, this);
        setTimeout(lang.hitch(this, function () {
          array.forEach(this._fieldsTable.fields, function (field) {
            if (field.name === 'visible') {
              field.onChange = lang.hitch(this, this._onDisplayFieldChanged);
            } else if (field.name === 'isEditable') {
              field.onChange = lang.hitch(this, this._onIsEditableFieldChanged);
            }
          }, this);
        }), 300);
      },
      _addNewAction: function (fieldColumn, tr) {
        var action;
        action = domConstruct.create("div", {
          "class": "esriCTCopyAction",
          "title": this.nls.fieldsPage.copyActionTip
        });
        on(action, "click", lang.hitch(this, this._onCopyAttrButtonClick, tr));
        domConstruct.place(action, fieldColumn, "last");
      },
      _onDisplayFieldChanged: function (tr) {
        var rowData = this._fieldsTable.getRowData(tr);
        var display = rowData.visible;
        if (!display && rowData.isEditable) {
          rowData.isEditable = false;
          this._fieldsTable.editRow(tr, rowData);
        }
      },

      _onIsEditableFieldChanged: function (tr) {
        var rowData = this._fieldsTable.getRowData(tr);
        var isEditable = rowData.isEditable;
        if (isEditable && !rowData.visible) {
          rowData.visible = true;
          this._fieldsTable.editRow(tr, rowData);
        }
      },
      _resetFieldInfos: function () {
        //CT - updated code so that all the fields info properties will be available after resetting
        var newFieldInfos = [];
        var fieldsTableData = this._fieldsTable.getData();
        array.forEach(fieldsTableData, lang.hitch(this, function (fieldData) {
          var fieldInfo, updatedValues = {
            "isEditable": fieldData.isEditable === null ? true : fieldData.isEditable,
            "visible": fieldData.visible === null ? true : fieldData.visible
          };
          fieldInfo = this._getFieldInfoByFieldName(this._configInfo.fieldInfos, fieldData.fieldName);
          lang.mixin(fieldInfo, updatedValues);
          newFieldInfos.push(fieldInfo);
        }));
        this._configInfo.fieldInfos = newFieldInfos;
      },

      _getFieldInfoByFieldName: function (fieldInfos, fieldName) {
        var fieldInfo;
        array.some(fieldInfos, function (field) {
          if (field.name === fieldName) {
            fieldInfo = field;
            return true;
          }
        });
        return fieldInfo;
      },

      geocoderConfigured : function () {
        this._copyAttr.geocoderConfigured();
      }

    });
  });