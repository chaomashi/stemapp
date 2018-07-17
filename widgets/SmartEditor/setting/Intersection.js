define(
  ["dojo/_base/declare",
    "dojo/_base/lang",
    "jimu/dijit/CheckBox",
    "dijit/form/Select",
    "dojo/_base/array",
    'dojo/dom-construct',
    'dojo/on',
    'dojo/query',
    'dojo/Deferred',
    "dojo/text!./Intersection.html",
    'dijit/_TemplatedMixin',
    'jimu/dijit/LayerChooserFromMap',
    'jimu/dijit/LayerChooserFromMapWithDropbox',
    'jimu/BaseWidgetSetting',
    'jimu/dijit/SimpleTable',
    "jimu/dijit/Popup"
  ],
  function (
    declare,
    lang,
    CheckBox,
    Select,
    array,
    domConstruct,
    on,
    query,
    Deferred,
    template,
    _TemplatedMixin,
    LayerChooserFromMap,
    LayerChooserFromMapWithDropbox,
    BaseWidgetSetting,
    Table,
    Popup
  ) {
    return declare([BaseWidgetSetting, _TemplatedMixin], {
      baseClass: "jimu-widget-smartEditor-setting-intersection",
      templateString: template,
      _totalLayers: [],
      postCreate: function () {
        this.inherited(arguments);
        this._totalLayers = [];
        //create intersection content
        this._createDialogContent();
        //show the popup dialog
        this.showDialog();
        this._initLayerSelector();
        //Listen for all layer event
        this.own(on(this.addLayer, "click", lang.hitch(this, function () {
          var row = this._layerTable.addRow({}).tr;
          this._addLayersDropDown(row);
          this._addFieldsDropDown(row);
        })));
      },

      _createDialogContent: function () {
        this.isEnabled = false;
        if (this._fieldValues && this._fieldValues.Intersection) {
          if (this._fieldValues.Intersection.hasOwnProperty("enabled")) {
            this.isEnabled = this._fieldValues.Intersection.enabled;
          }
        }
        //Initialize table contents
        this._initTable();
      },
      _initTable: function () {
        var fields2, args2;
        fields2 = [{
          name: 'layerName',
          title: this.nls.intersectionPage.layerText,
          type: 'empty',
          width: '40%'
        }, {
          name: 'fieldName',
          title: this.nls.intersectionPage.fieldText,
          type: 'empty',
          width: '40%'
        },
        {
          name: 'actions',
          title: this.nls.intersectionPage.actionsText,
          type: 'actions',
          width: '20%',
          actions: ['up', 'down', 'delete'],
          'class': 'actions'
        }];
        args2 = {
          fields: fields2,
          selectable: false
        };
        this._layerTable = new Table(args2);
        this._layerTable.placeAt(this.layerTableNode);
        this._layerTable.startup();
        this.own(on(this._layerTable,
          'actions-edit',
          lang.hitch(this, this._onEditFieldInfoClick)));
        this.own(on(this._layerTable,
          'actions-delete',
          lang.hitch(this, this._onDeleteFieldInfoClick)));
        this._populateTableData();
      },
      _populateTableData: function () {
        array.forEach(this._fieldValues.Intersection.fields, lang.hitch(this, function (field) {
          var row = this._layerTable.addRow({}).tr;
          this._addLayersDropDown(row, field);
          this._addFieldsDropDown(row, field);
        }));
      },

      _addLayersDropDown: function (tr, fieldData) {
        var td, layerChooserFromMapArgs, layerSelector, layerChooserFromMap;
        if (tr.layerSelector) {
          tr.layerSelector.destroy();
        }
        //create layerChooser args
        layerChooserFromMapArgs = this._createLayerChooserMapArgs();
        layerChooserFromMap = new LayerChooserFromMap(layerChooserFromMapArgs);
        layerChooserFromMap.startup();

        td = query('.simple-table-cell', tr)[0];

        layerSelector =
          new LayerChooserFromMapWithDropbox({ layerChooser: layerChooserFromMap });
        layerSelector.placeAt(td);
        layerSelector.startup();

        tr.layerSelector = layerSelector;
        layerSelector.setSelectedLayer(this._totalLayers[0]);
        if (fieldData) {
          //setSelectedLayer in rows layerSelector
          layerSelector.setSelectedLayer(
            this.layerInfos.getLayerInfoById(fieldData.layerId).layerObject);
        }
        this.own(on(layerSelector, 'selection-change',
          lang.hitch(this, function () {
            tr.layerFields.set("options", this._addLayerFieldOptions(tr));
            tr.layerFields.set("value", tr.layerFields.options[0], false);
          })));
      },

      _createLayerChooserMapArgs: function () {
        var layerChooserFromMapArgs;
        layerChooserFromMapArgs = {
          multiple: false,
          createMapResponse: this.map.webMapResponse,
          filter: this._createFiltersForLayerSelector()
        };
        return layerChooserFromMapArgs;
      },

      _createFiltersForLayerSelector: function () {
        var types, featureLayerFilter, imageServiceLayerFilter, filters, combinedFilter;
        types = ['point', 'polyline', 'polygon'];
        featureLayerFilter = LayerChooserFromMap.createFeaturelayerFilter(types, false, false);
        imageServiceLayerFilter = LayerChooserFromMap.createImageServiceLayerFilter(true);
        filters = [featureLayerFilter, imageServiceLayerFilter];
        combinedFilter = LayerChooserFromMap.orCombineFilters(filters);
        return combinedFilter;
      },

      _initLayerSelector: function () {
        var layerChooserFromMapArgs, layerInfosArray;
        //create layerChooser and get its layerInfo so that all the filter required will be applied
        layerChooserFromMapArgs = this._createLayerChooserMapArgs();
        this._layerChooserFromMap = new LayerChooserFromMap(layerChooserFromMapArgs);
        this._layerChooserFromMap.startup();
        layerInfosArray = this._layerChooserFromMap.layerInfosObj.getLayerInfoArray();

        var defList = [];
        //Create total layers array
        this._getAllFilteredLayers(layerInfosArray, defList);
      },

      _getAllFilteredLayers: function (layerInfosArray, defList) {
        array.forEach(layerInfosArray, lang.hitch(this, function (currentLayer) {
          var layerDef;
          if (!currentLayer.isLeaf()) {
            this._getAllFilteredLayers(currentLayer.newSubLayers, defList);
          }
          else {
            layerDef = new Deferred();
            this._layerChooserFromMap.filter(currentLayer).then(
              lang.hitch(this, function (isValid) {
                if (isValid) {
                  this._totalLayers.push(currentLayer);
                }
                layerDef.resolve();
              }));
            defList.push(layerDef);
          }
        }));
      },
      _addFieldsDropDown: function (tableRow, fieldData) {
        var fieldsColumn, dropDownContainer;
        fieldsColumn = query('.simple-table-cell', tableRow)[1];
        if (fieldsColumn) {
          dropDownContainer = domConstruct.create("div", {
            "class": "esriCTDropDownContainer"
          }, fieldsColumn);
          tableRow.layerFields = new Select({
            options: this._addLayerFieldOptions(tableRow),
            "class": "esriCTSettingsFieldDropdown"
          });
          tableRow.layerFields.placeAt(dropDownContainer);
          tableRow.layerFields.startup();
          if (fieldData) {
            tableRow.layerFields.set("value", fieldData.field, false);
          }
        }
      },
      _addLayerNameOptions: function () {
        var layers, options = [];
        layers = this.layerInfos.getLayerInfoArray();
        array.forEach(layers, lang.hitch(this, function (currentLayer) {
          if (currentLayer.layerObject.capabilities.indexOf("Query") > -1) {
            options.push({
              "label": currentLayer.layerObject.name,
              "value": currentLayer.layerObject.id
            });
          }
        }));
        return options;
      },
      _addLayerFieldOptions: function (row) {
        var selectedLayer, options = [];
        selectedLayer = row.layerSelector.getSelectedItem().layerInfo.layerObject;
        array.forEach(selectedLayer.fields, lang.hitch(this, function (currentField) {
          //Filter fields based on type
          if (currentField.type !== "esriFieldTypeGeometry" &&
            currentField.type !== "esriFieldTypeBlob" &&
            currentField.type !== "esriFieldTypeRaster" &&
            currentField.type !== "esriFieldTypeXML") {
            options.push({
              "label": currentField.alias || currentField.name,
              "value": currentField.name
            });
          }
        }));
        return options;
      },
      showDialog: function () {
        var fieldsPopup = new Popup({
          titleLabel: "Intersection",
          width: 700,
          maxHeight: 400,
          autoHeight: true,
          content: this,
          'class': this.baseClass,
          buttons: [{
            label: this.nls.ok,
            onClick: lang.hitch(this, function () {
              var data = {};
              data.enabled = this.isEnabled;
              data.fields = this._getTableData();
              if (!this._fieldValues.Intersection) {
                this._fieldValues.Intersection = {
                  "actionName": "Intersection"
                };
              }
              lang.mixin(this._fieldValues.Intersection, data);
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
      _getTableData: function () {
        var fields = [], layerInfo;
        array.forEach(this._layerTable.getRows(), lang.hitch(this, function (currentRow) {
          if (currentRow.layerSelector) {
            layerInfo = {};
            layerInfo.layerId = currentRow.layerSelector.getSelectedItem().layerInfo.id;
            layerInfo.field = currentRow.layerFields.getValue();
            fields.push(layerInfo);
          }
        }));
        return fields;
      }
    });
  });