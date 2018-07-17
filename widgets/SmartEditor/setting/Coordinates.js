define(
  ["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    'dojo/dom-construct',
    'dojo/on',
    "dojo/text!./Coordinates.html",
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
    on,
    template,
    _TemplatedMixin,
    BaseWidgetSetting,
    Popup,
    CheckBox,
    Select
  ) {
    return declare([BaseWidgetSetting, _TemplatedMixin], {
      baseClass: "jimu-widget-smartEditor-setting-coordinates",
      templateString: template,
      postCreate: function () {
        this.inherited(arguments);
        this.showDialog();
      },

      showDialog: function () {
        var isEnabled, coordinatesSystem, field, coordinateSystemSelector,
          fieldSelector, fieldsPopup;
        isEnabled = false;
        //Check for saved values and fetch them
        if (this._fieldValues && this._fieldValues.Coordinates) {
          if (this._fieldValues.Coordinates.hasOwnProperty("enabled")) {
            isEnabled = this._fieldValues.Coordinates.enabled;
            coordinatesSystem = this._fieldValues.Coordinates.coordinatesSystem;
            field = this._fieldValues.Coordinates.field;
          }
        }
        //Create coordinates systems drop down
        coordinateSystemSelector = new Select({
          style: { width: "340px" },
          options: this._createCoordinatesOptions()
        }, domConstruct.create("div", {}, this.selectCoordinateNode));
        //Listen for change event
        this.own(on(coordinateSystemSelector, "change", lang.hitch(this, function (value) {
          fieldSelector.set('options', this._getFieldsOptionsObj(value));
          //Select the first option based on selected coordinates system
          fieldSelector.set('value', "x");
        })));
        //Check for saved value
        if (coordinatesSystem) {
          coordinateSystemSelector.set('value', coordinatesSystem, false);
        }
        //create options according to coordinates system
        fieldSelector = new Select({
          style: { width: "340px" },
          options: this._getFieldsOptionsObj(coordinateSystemSelector.getValue())
        }, domConstruct.create("div", {}, this.selectAttributeNode));
        //Check for saved value
        if (field) {
          fieldSelector.set('value', field);
        }
        fieldsPopup = new Popup({
          titleLabel: this.nls.coordinatesPage.popupTitle,
          width: 400,
          maxHeight: 300,
          autoHeight: true,
          content: this,
          buttons: [{
            label: this.nls.ok,
            onClick: lang.hitch(this, function () {
              var data = {};
              data.enabled = isEnabled;
              data.coordinatesSystem = coordinateSystemSelector.get("value");
              data.field = fieldSelector.get("value");
              if (!this._fieldValues.Coordinates) {
                this._fieldValues.Coordinates = {
                  "actionName": "Coordinates"
                };
              }
              lang.mixin(this._fieldValues.Coordinates, data);
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
      * fetch all coordinates system values
      * @memberOf setting/Coordinates
      */
      _createCoordinatesOptions: function () {
        var options = [];
        options.push(
          {
            "label": this.nls.coordinatesPage.mapSpatialReference,
            "value": "MapSpatialReference"
          }, {
            "label": this.nls.coordinatesPage.latlong,
            "value": "LatLong"
          });
        return options;
      },

      /**
      * This function is used to
      * filter the valid fields from all fields
      * @param {array} fieldArray: array of fields
      * @memberOf setting/Coordinates
      */
      _getFieldsOptionsObj: function (coordinatesSystem) {
        var fieldOptions = [], fieldArray = [];
        if (coordinatesSystem === "LatLong") {
          fieldArray = [{ "name": "y", "alias": "Latitude" }, { "name": "x", "alias": "Longitude" }];
        } else {
          fieldArray = [{ "name": "x", "alias": "X" }, { "name": "y", "alias": "Y" }];
        }
        array.forEach(fieldArray, lang.hitch(this, function (field) {
          fieldOptions.push(
            {
              "label": field.alias || field.name,
              "value": field.name
            });
        }));
        return fieldOptions;
      }
    });
  });