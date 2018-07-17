///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
    'jimu/BaseWidgetSetting',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dijit/_WidgetsInTemplateMixin',
    './SymbolChooserPopup',
    'jimu/symbolUtils',
    'jimu/utils',
    'dojo/text!./GeneralSetting.html',
    'esri/symbols/jsonUtils',
    'jimu/dijit/Message',
    'dojo/dom-construct'
  ],
  function (BaseWidgetSetting, declare, lang, on,
    _WidgetsInTemplateMixin, SymbolChooserPopup, symbolUtils, utils, template,
    jsonUtils, Message,
    domConstruct) {

    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {

      baseClass: 'jimu-widget-RelatedTableCharts-setting',
      templateString: template,
      nls: this.nls,
      config: this.config,
      graphicLocatoionSymbolJSON: null, //to store selected symbol json
      postMixInProperties: function () {
        //mixin default nls with widget nls
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
      },

      postCreate: function () {
        this._createSymbolPickerNode();
        this._setRefreshIntervalTxtBxValue();
        this._setLocationChkBxValue();
      },

      /**
      * Create symbol picker node in configuration UI
      * @param {boolean} showError: contains node to display selected graphic symbol
      * @memberOf widgets/RelatedTableCharts/setting/GeneralSetting
      **/
      _createSymbolPickerNode: function () {
        var objSymbol = {}, geometryType = "esriGeometryPoint", symbolChooserNode, params;
        objSymbol.type = utils.getSymbolTypeByGeometryType(geometryType);
        // if symbols parameter available in input parameters then take symbol details
        if (this.config && this.config.symbol && this.config.symbol.graphicLocationSymbol) {
          // fetch selected symbol from config
          objSymbol.symbol = jsonUtils.fromJson(this.config.symbol.graphicLocationSymbol);
        }
        symbolChooserNode = this._createPreviewContainer(this.locationSymbolIconNode);
        //create params to initialize 'symbolchooserPopup' widget
        params = {
          symbolChooserTitle: this.nls.locationSymbolLabel,
          symbolParams: objSymbol,
          nls: this.nls
        };
        //display configured symbol in symbol chooser node
        this._showSelectedSymbol(symbolChooserNode, objSymbol.symbol);
        //attach 'click' event on node to display symbol chooser popup
        this.own(on(symbolChooserNode, 'click', lang.hitch(this, function () {
          //set recently selected symbol in symbol chooser popup
          objSymbol.symbol = jsonUtils.fromJson(this.graphicLocatoionSymbolJSON);
          this._initSymbolChooserPopup(params, symbolChooserNode);
        })));
      },

      /**
      * Create preview container to display selected symbol
      * @param {object} symbolNode: contains node to display selected graphic symbol
      * @memberOf widgets/RelatedTableCharts/setting/GeneralSetting
      **/
      _createPreviewContainer: function (symbolNode) {
        var tablePreviwText, trPreviewText, tdPreviewText, tdSymbolNode,
        divPreviewText, symbolChooserNode;
        tablePreviwText = domConstruct.create("table", { "cellspacing": "0",
          "cellpadding": "0" }, symbolNode);
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
      * @param {object} contains params to initialize widget
      * @param {object} symbolChooserNode: contains node ro display selected graphic symbol
      * @memberOf widgets/RelatedTableCharts/setting/GeneralSetting
      **/
      _initSymbolChooserPopup: function (params, symbolChooserNode) {
        var symbolChooserObj = new SymbolChooserPopup(params);
        //handler for poopup 'OK' button 'click' event
        symbolChooserObj.onOkClick = lang.hitch(this, function () {
          //get selected symbol
          var symbolJson = symbolChooserObj.symbolChooser.getSymbol();
          this._showSelectedSymbol(symbolChooserNode, symbolJson);
          symbolChooserObj.popup.close();
        });
      },

      /**
      * show selected graphic symbol in symbol chooser node
      * @param {object} symbolChooserNode: contains a symbol chooser node
      * @param {object} symbolJson: contains a json structure for symbol
      * @param {string} symbolType: contains symbol type
      * @member of widgets/RelatedTableCharts/setting/GeneralSetting
      **/
      _showSelectedSymbol: function (symbolChooserNode, symbolJson) {
        domConstruct.empty(symbolChooserNode);
        if (symbolJson) {
          var symbolNode = symbolUtils.createSymbolNode(symbolJson);
          // if symbol node is not created
          if (!symbolNode) {
            symbolNode = domConstruct.create('div');
          }
          domConstruct.place(symbolNode, symbolChooserNode);
          //store selected symbol in 'symbolParams' object
          this.graphicLocatoionSymbolJSON = symbolJson.toJson();
        }
      },

      getConfig: function () {
        var config = {
          "symbol": {
            "graphicLocationSymbol": this.graphicLocatoionSymbolJSON
          },
          "refreshInterval": this.refreshIntervalTxtBx.value,
          "showLocationTool": this.setLocationCheckBoxNode.getValue()
        };

        if (!this.refreshIntervalTxtBx.isValid()) {
          this._errorMessage(this.nls.errMsgRefreshInterval);
          return false;
        } else {
          return config;
        }
      },

      /** This function will set the configured value of Refresh Interval Text Box
      * @member of setting/setting/GeneralSetting
      **/
      _setRefreshIntervalTxtBxValue: function () {
        if (this.config && this.config.refreshInterval) {
          this.refreshIntervalTxtBx.set("value", this.config.refreshInterval);
        }
      },

      /** This function will set the configured value of show loaction button
      * @member of setting/setting/GeneralSetting
      **/
      _setLocationChkBxValue: function () {
        // check if user wants select location on
        if (this.config.showLocationTool) {
          this.setLocationCheckBoxNode.setValue(this.config.showLocationTool);
        }
      },

      /**
      * This function executes on refresh interval textbox's changed .
      *@member of setting/setting/GeneralSetting
      **/
      _onRefreshIntervalChanged: function () {
        if (isNaN(this.refreshIntervalTxtBx.get("value"))) {
          this.refreshIntervalTxtBx.set("value", 0);
        }

      },

      /**
      * This function create error alert.
      * @param {string} err
      *@member of setting/setting/GeneralSetting
      **/
      _errorMessage: function (err) {
        var errorMessage = new Message({
          message: err
        });
        errorMessage.message = err;
      }
    });
  });