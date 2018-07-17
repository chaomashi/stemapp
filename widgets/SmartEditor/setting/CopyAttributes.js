define(
  ["dojo/_base/declare",
    "dojo/Evented",
    "dojo/query",
    "dojo/dom-style",
    "dojo/_base/lang",
    "dojo/_base/array",
    'dojo/on',
    "dojo/text!./CopyAttributes.html",
    'dijit/_TemplatedMixin',
    'jimu/BaseWidgetSetting',
    'jimu/dijit/SimpleTable',
    "jimu/dijit/Popup",
    'esri/lang',
    "./Intersection",
    "./Coordinates",
    "./Address"
  ],
  function (
    declare,
    Evented,
    query,
    domStyle,
    lang,
    array,
    on,
    template,
    _TemplatedMixin,
    BaseWidgetSetting,
    Table,
    Popup,
    esriLang,
    Intersection,
    Coordinate,
    Address
  ) {
    return declare([BaseWidgetSetting, Evented, _TemplatedMixin], {
      baseClass: "jimu-widget-smartEditor-rule-table",
      templateString: template,
      _resourceInfo: null,
      _url: null,
      _fieldName: null,
      _fieldValues: null,
      _configuredFieldValues: null,
      _layerId: null,

      postCreate: function () {
        this.inherited(arguments);
        this._configuredFieldValues = [];
        this._initActionsTable();
        this._setActionsTable();

      },
      getSettings: function () {
        return this._fieldValues;
      },

      _getConfigActionOrder: function () {
        var result = [], defaultResult = [];
        if (this.isRelatedLayer) {
          defaultResult = ["Preset"];
        } else {
          defaultResult = ['Intersection', 'Address', 'Coordinates', 'Preset'];
        }
        if (this._fieldValues !== undefined &&
          this._fieldValues !== null) {
          if (this._fieldValues.hasOwnProperty(this._fieldName)) {
            array.forEach(this._fieldValues[this._fieldName], function (action) {
              result.push(action.actionName);
            });
            if (result === null || result.length === 0) {
              return defaultResult;
            } else {
              return result;
            }
          }
        }
        return defaultResult;
      },

      _getConfigAction: function (actionName) {
        var result = null;
        if (this._fieldValues !== undefined &&
          this._fieldValues !== null) {
          if (this._fieldValues.hasOwnProperty(this._fieldName)) {
            array.some(this._fieldValues[this._fieldName], function (action) {
              return action.actionName === actionName ? (result = action, true) : false;
            });
            return result;
          }
        }
        return result;
      },

      _nlsActionToConfig: function (label) {
        switch (label) {
          case this.nls.actionPage.copyAction.intersection:
            return "Intersection";
          case this.nls.actionPage.copyAction.address:
            return "Address";
          case this.nls.actionPage.copyAction.coordinates:
            return "Coordinates";
          case this.nls.actionPage.copyAction.preset:
            return "Preset";
          default:
            return label;
        }
      },
      popupActionsPage: function () {

        var fieldsPopup = new Popup({
          titleLabel: esriLang.substitute(
            { fieldname: this._fieldName },
            this.nls.actionPage.title),
          width: 920,
          maxHeight: 600,
          autoHeight: true,
          content: this,
          buttons: [{
            label: this.nls.ok,
            onClick: lang.hitch(this, function () {
              var rows = this._copyAttrTable.getRows();
              if (this._fieldValues === undefined ||
                this._fieldValues === null) {
                this._fieldValues = {};
              }
              this._fieldValues[this._fieldName] = [];
              array.forEach(rows, function (row) {
                var rowData = this._copyAttrTable.getRowData(row);
                var newAction = {};
                newAction.actionName = this._nlsActionToConfig(rowData.actionName);
                //get the configured values
                if (this._configuredFieldValues[newAction.actionName]) {
                  lang.mixin(newAction, this._configuredFieldValues[newAction.actionName]);
                } else {
                  lang.mixin(newAction, { "enabled": false });
                }
                //get the action enabled value from the row's enabled checkbox
                lang.mixin(newAction, { "enabled": rowData.enabled });
                //in case of preset, add the field name in _configuredPresetInfos if not found
                if (newAction.actionName === "Preset" && this._configuredPresetInfos &&
                  !this._configuredPresetInfos.hasOwnProperty(this._fieldName)) {
                  this._configuredPresetInfos[this._fieldName] = [""];
                }
                this._fieldValues[this._fieldName].push(newAction);
              }, this);
              fieldsPopup.close();
            })
          }, {
            label: this.nls.cancel,
            classNames: ['jimu-btn jimu-btn-vacation'],
            onClick: lang.hitch(this, function () {

              fieldsPopup.close();

            })
          }],
          onClose: lang.hitch(this, function () {
          })
        });
      },

      _initActionsTable: function () {
        var fields2 = [{
          name: 'enabled',
          title: this.nls.actionPage.copyAction.enableText,
          type: 'checkbox',
          width: '15%'
        }, {
          name: 'actionName',
          title: this.nls.actionPage.copyAction.actionText,
          type: 'text'
        }, {
          name: 'actions',
          title: this.nls.actionPage.copyAction.criteriaText,
          type: 'actions',
          actions: ['up', 'down', 'edit'],
          'class': 'actions'
        }];
        var args2 = {
          fields: fields2,
          selectable: false,
          style: {
            'height': '300px',
            'maxHeight': '300px'
          }
        };
        this._copyAttrTable = new Table(args2);
        this._copyAttrTable.placeAt(this.copyAttributeTable);
        this._copyAttrTable.startup();
        this.own(on(this._copyAttrTable, 'actions-edit',
          lang.hitch(this, this._onEditFieldInfoClick)));
      },


      _onEditFieldInfoClick: function (tr) {
        var clickedAction;
        clickedAction = this._copyAttrTable.getRowData(tr).actionName;
        switch (clickedAction) {
          case this.nls.actionPage.copyAction.intersection:
            this._createIntersectionPanel();
            break;
          case this.nls.actionPage.copyAction.address:
            //check if geocoder is configured or not
            if (this._geocoderSettings && this._geocoderSettings.hasOwnProperty('url')) {
              this._createAddressPanel();
            } else {
              this.emit("SetGeocoder");
            }
            break;
          case this.nls.actionPage.copyAction.coordinates:
            this._createCoordinatesPanel();
            break;
        }
      },

      _createIntersectionPanel: function () {
        this._intersectionDijit = Intersection({
          nls: this.nls,
          _fieldValues: this._configuredFieldValues,
          layerInfos : this.layerInfos,
          map: this.map
        });
      },

      _createCoordinatesPanel: function () {
        this._coordinatesDijit = Coordinate({
          nls: this.nls,
          _fieldValues: this._configuredFieldValues
        });
      },

      _createAddressPanel: function () {
        this._addressDijit = Address({
          nls: this.nls,
          _fieldValues: this._configuredFieldValues,
          _geocoderSettings: this._geocoderSettings
        });
      },

      _setActionsTable: function () {
        var actions = this._getConfigActionOrder();
        array.forEach(actions, function (action) {
          var configAction = this._getConfigAction(action);
          var actionLbl = action;
          switch (action) {
            case "Intersection":
              if (this.nls.actionPage.hasOwnProperty("copyAction")) {
                if (this.nls.actionPage.copyAction.hasOwnProperty("intersection")) {
                  actionLbl = this.nls.actionPage.copyAction.intersection;
                }
              }
              break;
            case "Address":
              if (this.nls.actionPage.hasOwnProperty("copyAction")) {
                if (this.nls.actionPage.copyAction.hasOwnProperty("address")) {
                  actionLbl = this.nls.actionPage.copyAction.address;
                }
              }
              break;
            case "Coordinates":
              if (this.nls.actionPage.hasOwnProperty("copyAction")) {
                if (this.nls.actionPage.copyAction.hasOwnProperty("coordinates")) {
                  actionLbl = this.nls.actionPage.copyAction.coordinates;
                }
              }
              break;
            case "Preset":
              if (this.nls.actionPage.hasOwnProperty("copyAction")) {
                if (this.nls.actionPage.copyAction.hasOwnProperty("preset")) {
                  actionLbl = this.nls.actionPage.copyAction.preset;
                }
              }
              break;
            default:
              actionLbl = action;
              break;
          }
          var settings = {
            actionName: actionLbl
          };
          //set configured field Values if available
          //esle set defaults to false
          if (configAction !== undefined && configAction !== null) {
            this._configuredFieldValues[action] = configAction;
          } else {
            this._configuredFieldValues[action] = { "enabled": false };
            //when action is intersection by defalut set fields to empty
            if (action === "Intersection") {
              this._configuredFieldValues[action].fields = [];
            }
            //when action is coordinates set default option as mapspatial ref and x
            if (action === "Coordinates") {
              this._configuredFieldValues[action].coordinatesSystem = "MapSpatialReference";
              this._configuredFieldValues[action].field = "x";
            }
          }
          //sets the enabled option the table row
          settings.enabled = this._configuredFieldValues[action].enabled;
          //add new row for the action
          var newRow = this._copyAttrTable.addRow(settings);
          //if action is 'Preset' hide the edit icon from the preset row
          if (action === "Preset") {
            var editIcon = query(".jimu-icon-edit", newRow.tr);
            if (editIcon && editIcon.length > 0) {
              domStyle.set(editIcon[0], "display", "none");
            }
          }
        }, this);
      },

      geocoderConfigured : function () {
        if (this._geocoderSettings && this._geocoderSettings.hasOwnProperty('url')) {
          this._createAddressPanel();
        }
      }

    });
  });