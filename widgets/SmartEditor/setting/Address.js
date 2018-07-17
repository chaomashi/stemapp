define(
  ["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    'dojo/dom-construct',
    "dojo/text!./Address.html",
    'dijit/_TemplatedMixin',
    'jimu/BaseWidgetSetting',
    "jimu/dijit/Popup",
    "jimu/dijit/CheckBox",
    "dijit/form/Select"
  ],
  function (
    declare,
    lang,
    array,
    domConstruct,
    template,
    _TemplatedMixin,
    BaseWidgetSetting,
    Popup,
    CheckBox,
    Select
  ) {
    return declare([BaseWidgetSetting, _TemplatedMixin], {
      baseClass: "jimu-widget-smartEditor-setting-address",
      templateString: template,
      postCreate: function () {
        this.inherited(arguments);
        this.showDialog();
      },

      showDialog: function () {
        var isEnabled = false, selectedField;
        isEnabled = false;
        if (this._fieldValues && this._fieldValues.Address) {
          if (this._fieldValues.Address.hasOwnProperty("enabled")) {
            isEnabled = this._fieldValues.Address.enabled;
          }
          if (this._fieldValues.Address.hasOwnProperty("field")) {
            selectedField = this._fieldValues.Address.field;
          }
        }
        var options = this._getFieldsOptionsObj(this._geocoderSettings.fields);
        var fieldSelector = new Select({
          style: { width: "340px" },
          options: options
        }, domConstruct.create("div", {}, this.selectNode));

        if (selectedField) {
          fieldSelector.set("value", selectedField);
        }
        var fieldsPopup = new Popup({
          titleLabel: this.nls.addressPage.popupTitle,
          width: 400,
          maxHeight: 300,
          autoHeight: true,
          content: this,
          buttons: [{
            label: this.nls.ok,
            onClick: lang.hitch(this, function () {
              var data = {};
              data.enabled = isEnabled;
              data.field = fieldSelector.get("value");
              if (!this._fieldValues.Address) {
                this._fieldValues.Address = {
                  "actionName": "Address"
                };
              }
              lang.mixin(this._fieldValues.Address, data);
              fieldsPopup.close();
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

      /**
      * This function is used to
      * filter the valid fields from all fields
      * @param {array} fieldArray: array of fields
      * @memberOf setting/LayerSettings
      */
      _getFieldsOptionsObj: function (fieldArray) {
        var fieldOptions = [];
        array.forEach(fieldArray, lang.hitch(this, function (field) {
          //Filter fields based on type
          if (field.type !== "esriFieldTypeGeometry" &&
            field.type !== "esriFieldTypeBlob" &&
            field.type !== "esriFieldTypeRaster" &&
            field.type !== "esriFieldTypeXML") {
            fieldOptions.push(
              {
                "label": field.alias || field.name,
                "value": field.name
              });
          }
        }));
        return fieldOptions;
      }
    });
  });