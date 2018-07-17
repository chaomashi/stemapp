define(
  ["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/text!./EditFields.html",
    'dijit/_TemplatedMixin',
    'jimu/BaseWidgetSetting',
    'jimu/dijit/SimpleTable',
    "jimu/dijit/Popup"
  ],
  function(
    declare,
    lang,
    array,
    template,
    _TemplatedMixin,
    BaseWidgetSetting,
    Table,
    Popup) {
    return declare([BaseWidgetSetting, _TemplatedMixin], {
      baseClass: "jimu-widget-edit-setting-fields",
      templateString: template,
      _layerInfo: null,

      postCreate: function() {
        this.inherited(arguments);
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
        this._initFieldsTable();
        this._setFiedsTabele(this._layerInfo.fieldInfos);
      },

      popupEditPage: function() {
        var fieldsPopup = new Popup({
          titleLabel: this.nls.configureFields,
          width: 700,
          maxHeight: 600,
          autoHeight: true,
          content: this,
          buttons: [{
            label: this.nls.ok,
            onClick: lang.hitch(this, function() {
              this._resetFieldInfos();
              fieldsPopup.close();
            })
          }, {
            label: this.nls.cancel,
            classNames: ['jimu-btn-vacation'],
            onClick: lang.hitch(this, function() {
              fieldsPopup.close();
            })
          }],
          onClose: lang.hitch(this, function() {
          })
        });
      },

      _initFieldsTable: function() {
        var fields2 = [{
          name: 'visible',
          title: this.nls.display,
          type: 'checkbox',
          'class': 'display',
          width: '25%'
        }, {
          name: 'isEditable',
          title: this.nls.edit,
          type: 'checkbox',
          'class': 'editable',
          width: '25%'
        }, {
          name: 'fieldName',
          title: this.nls.editpageName,
          type: 'text',
          width: '14%'
        }, {
          name: 'label',
          title: this.nls.editpageAlias,
          type: 'text',
          editable: true,
          width: '18%'
        }, {
          name: 'actions',
          title: this.nls.actions,
          type: 'actions',
          actions: ['up', 'down'],
          'class': 'actions',
          width: '18%'
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
      },

      _setFiedsTabele: function(fieldInfos) {
        array.forEach(fieldInfos, function(fieldInfo) {
          this._fieldsTable.addRow({
            fieldName: fieldInfo.fieldName,
            isEditable: fieldInfo.isEditable,
            label: fieldInfo.label,
            visible: fieldInfo.visible
          });

        }, this);

        // Bind 'onChange' events for visble and isEditable.
        setTimeout(lang.hitch(this, function() {
          array.forEach(this._fieldsTable.fields, function(field) {
            if(field.name === 'visible') {
              field.onChange = lang.hitch(this, this._onDisplayFieldChanged);
            } else if(field.name === 'isEditable') {
              field.onChange = lang.hitch(this, this._onIsEditableFieldChanged);
            }
          }, this);
        }), 300);
      },

      _onDisplayFieldChanged: function(tr) {
        var rowData = this._fieldsTable.getRowData(tr);
        var display = rowData.visible;
        if(!display && rowData.isEditable) {
          rowData.isEditable = false;
          this._fieldsTable.editRow(tr, rowData);
        }
      },

      _onIsEditableFieldChanged: function(tr) {
        var rowData = this._fieldsTable.getRowData(tr);
        var isEditable  = rowData.isEditable;
        if(isEditable && !rowData.visible) {
          rowData.visible = true;
          this._fieldsTable.editRow(tr, rowData);
        }
      },

      _resetFieldInfos: function() {
        var newFieldInfos = [];
        var fieldsTableData =  this._fieldsTable.getData();
        array.forEach(fieldsTableData, function(fieldData) {
          newFieldInfos.push({
            "fieldName": fieldData.fieldName,
            "label": fieldData.label,
            "isEditable": fieldData.isEditable,
            "visible": fieldData.visible
          });
        });

        this._layerInfo.fieldInfos = newFieldInfos;
      }

    });
  });
