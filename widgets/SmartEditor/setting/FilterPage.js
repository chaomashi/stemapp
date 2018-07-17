// jscs:disable validateIndentation
define(
  ["dojo/_base/declare",
    "dojo/_base/lang",
    'dojo/json',
    "dojo/text!./FilterPage.html",
    'dijit/_TemplatedMixin',
    'jimu/BaseWidgetSetting',
    "jimu/dijit/Popup",
    'jimu/dijit/Filter',
    'esri/lang',
    // "dojox/html/entities",
    "dijit/form/CheckBox",
    'dojo/dom-construct'
  ],
  function (
    declare,
    lang,
    JSON,
    template,
    _TemplatedMixin,
    BaseWidgetSetting,
    Popup,
    Filter,
    esriLang,
    // entities,
    CheckBox,
    domConstruct
    ) {
    return declare([BaseWidgetSetting, _TemplatedMixin], {
      baseClass: "jimu-widget-smartEditor-filter-page",
      templateString: template,
      _filter: null,
      _url: null,
      _layerId: null,
      _layerDefinition: null,
      _validationTable: null,

      postCreate: function () {
        this.inherited(arguments);
        this._init();
      },
      _init: function () {
        this._origNLS = window.jimuNls.filterBuilder.matchMsg;

        window.jimuNls.filterBuilder.matchMsg = this.nls.filterPage.filterBuilder;

      },
      destroy: function () {
        window.jimuNls.filterBuilder.matchMsg = this._origNLS;
        if (this._filter) {
          this._filter.destroyRecursive();
          this._filter = null;
          delete this._filter;
        }
        if (this._submitHidden) {
          this._submitHidden.destroyRecursive();
          this._submitHidden = null;
          delete this._submitHidden;
        }
      },
      popup: function (tr) {

        var rowData = this._validationTable.getRowData(tr);
        if (rowData) {
          if (rowData.label === this.nls.actionPage.actions.hide) {
            this.submitWhenHidden.style.display = "block";
            this._submitHidden = new CheckBox({
              id: "submitHidden",
              checked: rowData.submitWhenHidden === undefined ? false : rowData.submitWhenHidden,
              value: this.nls.filterPage.submitHidden
            }, null);
            this.submitWhenHidden.appendChild(this._submitHidden.domNode);
            var labelDiv = lang.replace("<label class='submithide' for='submitWhenHidden'>{replace}</label></br></br>",
                            {
                              replace: this.nls.filterPage.submitHidden
                            });
            domConstruct.place(labelDiv, this._submitHidden.domNode, "after");

          } else {
            this.submitWhenHidden.style.display = "none";

          }
          this._filter = new Filter({
            style: "width:100%;margin-top:22px;",
            noFilterTip: this.nls.filterPage.noFilterTip
          });
          this._filter.placeAt(this.filterControl);
          var filterPopup = new Popup({

            titleLabel: esriLang.substitute(
              {
                action: rowData.label
              },
              this.nls.filterPage.title),
            width: 850,
            height: 485,
            content: this,
            rowData: rowData,
            buttons: [{
              label: this.nls.ok,
              onClick: lang.hitch(this, function () {
                var partsObj = this._filter.toJson();
                var submitWhenHidden = false;
                if (this._submitHidden && this._submitHidden.checked) {
                  submitWhenHidden = this._submitHidden.checked;
                }
                if (partsObj && partsObj.expr) {
                  if (partsObj.expr === '1=1') {
                    this._validationTable.editRow(tr,
                     {
                       'expression': '',
                       'filter': null,
                       'submitWhenHidden': submitWhenHidden
                     });
                  } else {
                    this._validationTable.editRow(tr,
                      {
                        'expression': partsObj.expr,
                        'filter': JSON.stringify(partsObj),
                        'submitWhenHidden': submitWhenHidden
                      });
                  }

                  filterPopup.close();

                }
              })
            }, {
              label: this.nls.cancel,
              classNames: ['jimu-btn jimu-btn-vacation'],
              onClick: function () {
                filterPopup.close();

              }
            }]
          });

          if (rowData.filter === undefined ||
              rowData.filter === null ||
            rowData.filter === '') {
            // this._filter.buildByExpr(this._url, null, this._layerDefinition);
            this._filter.build({
              url: this._url,
              expr: null,
              layerDefinition: this._layerDefinition,
              featureLayerId: this._layerId
            });
          }
          else {

            // this._filter.buildByExpr(this._url, entities.decode(rowData.expression),
            //   this._layerDefinition);
            this._filter.build({
              url: this._url,
              // expr: entities.decode(rowData.expression),
              partsObj: JSON.parse(rowData.filter), //use partsObj instead of expr, for issue #12804
              layerDefinition: this._layerDefinition,
              featureLayerId: this._layerId
            });

          }


        }
      }

    });
  });