define(
  ["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    'dojo/on',
    'dojo/query',
    'dojo/json',
    "dojox/html/entities",
    "dojo/text!./FieldValidation.html",
    'dijit/_TemplatedMixin',
    'jimu/BaseWidgetSetting',
    'jimu/dijit/SimpleTable',
    "jimu/dijit/Popup",
    "./FilterPage"
  ],
  function (
    declare,
    lang,
    array,
    on,
    query,
    JSON,
    entities,
    template,
    _TemplatedMixin,
    BaseWidgetSetting,
    Table,
    Popup,
    FilterPage
    ) {
    return declare([BaseWidgetSetting, _TemplatedMixin], {
      baseClass: "jimu-widget-smartEditor-rule-table",
      templateString: template,
      _resourceInfo: null,
      _url: null,
      _fieldName: null,
      _fieldValidations: null,
      _layerId: null,

      postCreate: function () {
        this.inherited(arguments);
        this._initActionsTable();

        this._setActionsTable();

      },
      getSettings: function () {
        return this._fieldValidations;
      },
      _getConfigActionOrder: function () {
        var result = [];
        if (this._fieldValidations !== undefined &&
        this._fieldValidations !== null) {
          if (this._fieldValidations.hasOwnProperty(this._fieldName)) {
            array.forEach(this._fieldValidations[this._fieldName], function (action) {
              result.push(action.actionName);
            });
            if (result === null || result.length === 0) {
              return ['Hide', 'Required', 'Disabled'];
            } else {
              return result;
            }
          }
        }
        return ['Hide', 'Required', 'Disabled'];
      },
      _getConfigAction: function (actionName) {
        var result = null;
        if (this._fieldValidations !== undefined &&
          this._fieldValidations !== null) {
          if (this._fieldValidations.hasOwnProperty(this._fieldName)) {
            array.some(this._fieldValidations[this._fieldName], function (action) {
              return action.actionName === actionName ? (result = action, true) : false;
            });
            return result;
          }
        }
        return result;
      },

      _nlsActionToConfig: function (label) {
        switch (label) {
          case this.nls.actionPage.actions.hide:
            return "Hide";
          case this.nls.actionPage.actions.disabled:
            return "Disabled";
          case this.nls.actionPage.actions.required:
            return "Required";
          default:
            return label;
        }
      },
      popupActionsPage: function () {

        var fieldsPopup = new Popup({
          titleLabel: this.popupTitle,
          width: 920,
          maxHeight: 600,
          autoHeight: true,
          content: this,
          buttons: [{
            label: this.nls.ok,
            onClick: lang.hitch(this, function () {
              var rows = this._validationTable.getRows();
              if (this._fieldValidations === undefined ||
                this._fieldValidations === null) {
                this._fieldValidations = {};
              }

              //this._fieldActions[this._fieldName] = [];
              this._fieldValidations[this._fieldName] = [];
              array.forEach(rows, function (row) {
                var rowData = this._validationTable.getRowData(row);

                var newAction = {};

                newAction.actionName = this._nlsActionToConfig(rowData.label);
                newAction.submitWhenHidden = rowData.submitWhenHidden;
                if (rowData.expression !== undefined && rowData.expression !== null &&
                  rowData.expression !== '') {
                  if (rowData.filter !== '') {
                    var filter = JSON.parse(entities.decode(rowData.filter));
                    newAction.expression = filter.expr;
                    newAction.filter = filter;
                  }
                }
                this._fieldValidations[this._fieldName].push(newAction);
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
          name: 'label',
          title: this.nls.actionPage.actionsSettingsTable.rule,
          type: 'text',
          'class': 'rule'
        }, {
          name: 'expression',
          title: this.nls.actionPage.actionsSettingsTable.expression,
          type: 'text',
          'class': 'expression'
        },
        {
          name: 'submitWhenHidden',
          title: 'submitWhenHidden',
          type: 'checkbox',
          hidden: true
        },
         {
           name: 'filter',
           title: 'filter',
           type: 'text',
           hidden: true
         },
        {
          name: 'actions',
          title: this.nls.actionPage.actionsSettingsTable.actions,
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
        this._validationTable = new Table(args2);
        this._validationTable.placeAt(this.validationTable);
        this._validationTable.startup();
        var nl = query("th.simple-table-field", this._validationTable.domNode);
        nl.forEach(function (node) {
          var scrubText = (node.innerText === undefined || node.innerText === "") ?
            "" : node.innerText.replace(/(\r\n|\n|\r)/gm, "");
          switch (scrubText) {
            case this.nls.actionPage.actionsSettingsTable.rule:
              node.title = this.nls.actionPage.actionsSettingsTable.ruleTip;
              break;
            case this.nls.actionPage.actionsSettingsTable.expression:
              node.title = this.nls.actionPage.actionsSettingsTable.expressionTip;
              break;

            case this.nls.actionPage.actionsSettingsTable.actions:
              node.title = this.nls.actionPage.actionsSettingsTable.actionsTip;
              break;


          }

        }, this);
        this.own(on(this._validationTable,
          'actions-edit',
          lang.hitch(this, this._onEditFieldInfoClick)));
        this.own(on(this._validationTable,
         'actions-delete',
         lang.hitch(this, this._onDeleteFieldInfoClick)));
      },

      _onDeleteFieldInfoClick: function (tr) {

        this._removeFilter(tr);

      },
      _onEditFieldInfoClick: function (tr) {

        this._showFilter(tr);

      },

      _setActionsTable: function () {
        var actions = this._getConfigActionOrder();
        array.forEach(actions, function (action) {
          var configAction = this._getConfigAction(action);
          var actionLbl = action;
          switch (action){
            case "Hide":
              if (this.nls.actionPage.hasOwnProperty("actions")){
                if (this.nls.actionPage.actions.hasOwnProperty("hide")){
                  actionLbl = this.nls.actionPage.actions.hide;
                }
              }
              break;
            case "Required":
              if (this.nls.actionPage.hasOwnProperty("actions")) {
                if (this.nls.actionPage.actions.hasOwnProperty("required")) {
                  actionLbl = this.nls.actionPage.actions.required;
                }
              }
              break;
            case "Disabled":
              if (this.nls.actionPage.hasOwnProperty("actions")) {
                if (this.nls.actionPage.actions.hasOwnProperty("disabled")) {
                  actionLbl = this.nls.actionPage.actions.disabled;
                }
              }
              break;
            default:
              actionLbl = action;
              break;
          }
          var settings = {
            label: actionLbl,
            expression: null
          };
          if (configAction !== undefined && configAction !== null) {
            if (configAction.hasOwnProperty("filter")) {
              if (configAction.filter !== undefined &&
                configAction.filter !== null) {
                settings.filter = JSON.stringify(configAction.filter);
                settings.expression = configAction.filter.expr;
              }
            }
            if (configAction.hasOwnProperty("expression")) {
              settings.expression = configAction.expression;
            }
            if (configAction.hasOwnProperty("submitWhenHidden")) {
              settings.submitWhenHidden = configAction.submitWhenHidden;
            }
          }
          //  if (configAction.expression !== undefined &&
          //    configAction.expression !== null && configAction.expression !== '') {

          //    settings.expression = configAction.expression;
          //    settings.submitWhenHidden = configAction.submitWhenHidden;
          //    settings.filter = JSON.stringify(configAction.filter);
          //  }
          //}
          this._validationTable.addRow(settings);


        }, this);
      },
      _removeFilter: function (tr) {
        this._validationTable.editRow(tr,
                    {
                      'expression': '',
                      'filter': null,
                      'submitWhenHidden': false
                    });
      },
      _showFilter: function (tr) {
        if (this._filterPage) {
          this._filterPage.destroy();
        }

        this._filterPage = new FilterPage({
          nls: this.nls,
          _resourceInfo: this._resourceInfo,
          _url: this._url,
          _layerId: this._layerId,
          _validationTable: this._validationTable
        });
        this._filterPage.popup(tr);
      }

    });
  });