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
define([
  "dojo/_base/declare",
  "jimu/BaseWidgetSetting",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/_base/lang",
  'dojo/_base/html',
  'dojo/_base/array',
  "dojo/dom-construct",
  "dojo/query",
  "dojo/on",
  "dijit/registry",
  "./SymbolChooserPopup",
  "jimu/utils",
  "esri/symbols/jsonUtils",
  "jimu/dijit/Message",
  "jimu/dijit/Popup",
  "jimu/dijit/SimpleTable",
  "jimu/symbolUtils",
  "./EditDefaultNotation",
  "dojo/domReady!"
], function (
  declare,
  BaseWidgetSetting,
  _WidgetsInTemplateMixin,
  lang,
  html,
  array,
  domConstruct,
  query,
  on,
  registry,
  SymbolChooserPopup,
  utils,
  jsonUtils,
  Message,
  Popup,
  Table,
  symbolUtils,
  EditDefaultNotation
) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-coordinateconversion-setting',
    _symbolParams: {}, //to store symbol info

    startup: function () {
      this.inherited(arguments);
      var fields = [{
          name: 'show',
          title: this.nls.showHeaderLabel,
          width: 'auto',
          type: 'checkbox',
          'class': 'show'
        }, {
          name: 'index',
          title: this.nls.indexHeaderLabel,
          type: 'text',
          hidden: true
        }, {
          name: 'notation',
          title: this.nls.notationHeaderLabel,
          width: '30%',
          type: 'text'
        }, {
          name: 'defaultFormat',
          title: this.nls.defaultFormatHeaderLabel,
          width: '30%',
          type: 'text'
        }, {
          name: 'actions',
          title: this.nls.editFormatHeaderLabel,
          type: 'actions',
          width: '30%',
          actions: ['edit'],
          'class': 'symbol'
        }];

      var args = {
        fields: fields,
        selectable: true,
        autoHeight: false
      };
      this.displayNotationsTable = new Table(args);
      this.displayNotationsTable.placeAt(this.notationsTable);
      html.setStyle(this.displayNotationsTable.domNode, {
          'height': '100%'
        });

      this.own(on(
        this.displayNotationsTable,
        'actions-edit',
        lang.hitch(this, this.editDefaultFormatClick)
      ));

      //Set text alignment to center for scale input
      var scaleTextInput = query("input[type='text']", this.scale.domNode)[1];
      html.setStyle(scaleTextInput, {
        'text-align': 'center'
      });

      this.setConfig(this.config);
    },

    postMixInProperties: function(){
      //mixin default nls with widget nls
      this.nls.common = {};
      lang.mixin(this.nls.common, window.jimuNls.common);
    },

    postCreate: function () {
      this._symbolParams = {}; //to store symbol info
      this._createSymbolPicker(this.pointSymbolNode,
          "graphicLocationSymbol",
          "esriGeometryPoint",
          this.nls.locationSymbol);
    },

    /**
    * This function gets and create config data in config file.
    * @return {object} Object of config
    * @memberOf widgets/NearMe/setting/setting
    **/
    getConfig: function () {
      //set config with current configured options
      var data = this.displayNotationsTable.getData();
      var defaultNotations = [];

      array.forEach(data, lang.hitch(this, function(tData) {
        tData = tData; // do nothing
        var json = {};
        if (tData.show) {
          json.notation = tData.notation;
          json.defaultFormat = tData.defaultFormat;
          defaultNotations.push(json);
        }
      }));

      this.config = {
        "symbols": this._symbolParams,
        "coordinateconversion": {
          "zoomScale": parseFloat(this.scale.value)
        },
        "initialCoords": defaultNotations
      };

      var scaleNode = registry.byId(this.scale.id);
      if (scaleNode) {
        if (!scaleNode.isValid()) {
          new Message({
            message: scaleNode.message
          });
          return false;
        }
      }
      return this.config;
    },

    /**
    * This function set and update the config data in config file.
    * @return {object} Object of config
    * @memberOf widgets/NearMe/setting/setting
    **/
    setConfig: function (config) {
      this.config = config;

      var notations = [
        {notation: 'DD', format: 'YN XE'},
        {notation: 'DDM', format: 'A° B\'N X° Y\'E'},
        {notation: 'DMS', format: 'A° B\' C\"N X° Y\' Z\"E'},
        {notation: 'GARS', format: 'XYQK'},
        {notation: 'GEOREF', format: 'ABCDXY'},
        {notation: 'MGRS', format: 'ZSXY'},
        {notation: 'USNG', format: 'ZSXY'},
        {notation: 'UTM', format: 'ZB X Y'},
        {notation: 'UTM (H)', format: 'ZH X Y'}
      ];
      this._setNotationTable(notations,this.config.initialCoords);
      this.scale.set('value', this.config.coordinateconversion.zoomScale);
    },

    /**
    * This function creates symbols in config UI
    * @param {object} symbolNode: contains a symbol chooser node
    * @param {string} symbolType: contains symbol type
    * @param {string} geometryType: contains symbol geometry type
    * @param {string} symbolChooserTitle: contains a symbol chooser popup title
    * @memberOf widgets/NearMe/setting/setting
    **/
    _createSymbolPicker: function (symbolNode, symbolType, geometryType, symbolChooserTitle) {
      var objSymbol, symbolChooserNode, params;
      //if symbol geometry exist
      if (geometryType) {
        objSymbol = {};
        objSymbol.type = utils.getSymbolTypeByGeometryType(geometryType);
        // if symbols parameter available in input parameters then take symbol details
        if (this.config && this.config.symbols) {
          // check whether symbolType info is available in config
          if (this.config.symbols.hasOwnProperty(symbolType)) {
            // fetch selected symbol from config
            objSymbol.symbol = jsonUtils.fromJson(this.config.symbols[symbolType]);
          }
        }
        symbolChooserNode = this._createPreviewContainer(symbolNode);
        //create params to initialize 'symbolchooserPopup' widget
        params = {
          symbolChooserTitle: symbolChooserTitle,
          symbolParams: objSymbol,
          nls: this.nls,
          symbolType: symbolType
        };
        //display configured symbol in symbol chooser node
        this._showSelectedSymbol(symbolChooserNode, objSymbol.symbol, symbolType);
        //attach 'click' event on node to display symbol chooser popup
        this.own(on(symbolChooserNode, 'click', lang.hitch(this, function () {
          //set recently selected symbol in symbol chooser popup
          objSymbol.symbol = jsonUtils.fromJson(this._symbolParams[symbolType]);
          this._initSymbolChooserPopup(params, symbolChooserNode);
        })));
      }
    },

    /**
    * Create preview container to display selected symbol
    * @param {object} symbolNode: contains node to display selected graphic symbol
    * @memberOf widgets/NearMe/setting/Setting
    **/
    _createPreviewContainer: function (symbolNode) {
      var tablePreviwText, trPreviewText, tdPreviewText, tdSymbolNode,
        divPreviewText, symbolChooserNode;
      tablePreviwText = domConstruct.create("table", {
        "cellspacing": "0",
        "cellpadding": "0"
      }, symbolNode);
      trPreviewText = domConstruct.create("tr", { "style": "height:30px" }, tablePreviwText);
      tdPreviewText = domConstruct.create("td", {}, trPreviewText);
      divPreviewText = domConstruct.create("div", {
        "innerHTML": this.nls.symbolPickerPreviewText,
        "class": "esriCTSymbolPreviewText"
      }, tdPreviewText);
      tdSymbolNode = domConstruct.create("td", {}, trPreviewText);
      //create content div for symbol chooser node
      symbolChooserNode = domConstruct.create("div", {
        "class": "esriCTSymbolChooserNode"
      }, tdSymbolNode);
      return symbolChooserNode;
    },

    /**
    * Initialize symbol chooser popup widget
    * @param {object} params: contains params to initialize widget
    * @param {object} symbolChooserNode: contains node to display selected graphic symbol
    * @memberOf widgets/NearMe/setting/Setting
    **/
    _initSymbolChooserPopup: function (params, symbolChooserNode) {
      var symbolChooserObj = new SymbolChooserPopup(params);
      //handler for poopup 'OK' button 'click' event
      symbolChooserObj.onOkClick = lang.hitch(this, function () {
        //get selected symbol
        var symbolJson = symbolChooserObj.symbolChooser.getSymbol();
        this._showSelectedSymbol(symbolChooserNode, symbolJson, params.symbolType);
        symbolChooserObj.popup.close();
      });
    },

    /**
    * show selected graphic symbol in symbol chooser node
    * @param {object} symbolChooserNode: contains a symbol chooser node
    * @param {object} symbolJson: contains a json structure for symbol
    * @param {string} symbolType: contains symbol type
    * @member of widgets/NearMe/setting/setting
    **/
    _showSelectedSymbol: function (symbolChooserNode, symbolJson, symbolType) {
      domConstruct.empty(symbolChooserNode);
      if (symbolJson) {
        var symbolNode = symbolUtils.createSymbolNode(symbolJson);
        // if symbol node is not created
        if (!symbolNode) {
          symbolNode = domConstruct.create('div');
        }
        domConstruct.place(symbolNode, symbolChooserNode);
        //store selected symbol in 'symbolParams' object
        this._symbolParams[symbolType] = symbolJson.toJson();
      }
    },

    /*
    **
    */
    _setNotationTable:function(Notations,initialCoords){
      this.displayNotationsTable.clear();
      for (var i = 0; i < Notations.length; i++) {
        var rowData = {
          notation: Notations[i].notation,
          defaultFormat: Notations[i].format,
          index: "" + i
        };

        for (var j = 0; j < initialCoords.length; j++) {
          if (initialCoords[j].notation === Notations[i].notation) {
            rowData.show = true;
            rowData.defaultFormat = initialCoords[j].defaultFormat;
          }
        }
        this.displayNotationsTable.addRow(rowData);
      }

    },

    /*
    **
    */
    editDefaultFormatClick: function(tr) {
      var tds = query(".action-item-parent", tr);
      var data;
      if (tds && tds.length) {
        data = this.displayNotationsTable.getRowData(tr);
        if (!data.show) {
          var popup = new Message({
            message: this.nls.warning,
            buttons: [{
              label: this.nls.common.ok,
              onClick: lang.hitch(this, function() {
                popup.close();
              })
            }]
          });
        } else {
          var rowIndex = parseInt(data.index, 10);
          this.openEditDefaultFormatDialog(tr, rowIndex);
        }
      }
    },

    /*
    **
    */
    openEditDefaultFormatDialog: function(tr, idx) {
      /*jshint unused:false*/
      var rowData = this.displayNotationsTable.getRowData(tr);
      var defaultFormatPopup = new Popup({
        titleLabel: this.nls.setDefaultFormatTitlePane,
        width: 300,
        maxHeight: 200,
        autoHeight: true,
        content: new EditDefaultNotation(rowData.defaultFormat),
        buttons: [{
          label: this.nls.common.ok,
          onClick: lang.hitch(this, function() {
            rowData.defaultFormat = defaultFormatPopup.content.notationString.value;
            this.displayNotationsTable.editRow(tr, rowData);
            defaultFormatPopup.close();
            defaultFormatPopup = null;
          })
        }, {
          label: this.nls.common.cancel,
          onClick: lang.hitch(this, function() {
            defaultFormatPopup.close();
            defaultFormatPopup = null;
          })
        }],
        onClose: function() {
          defaultFormatPopup = null;
        }
      });
    }
  });
});