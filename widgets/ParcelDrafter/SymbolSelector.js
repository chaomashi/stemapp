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
  'dojo/_base/declare',
  'jimu/BaseWidget',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/dom-construct',
  'dojo/_base/array',
  'jimu/symbolUtils',
  'esri/symbols/jsonUtils',
  'dijit/popup',
  'dijit/TooltipDialog',
  'dojo/_base/html'
],
  function (
    declare,
    BaseWidget,
    lang,
    on,
    domConstruct,
    array,
    symbolUtils,
    jsonUtils,
    dojoPopup,
    TooltipDialog,
    html
  ) {
    return declare([BaseWidget], {
      _tooltipDialog: null, // To contain tooltip node
      selectedSymbol: null, //Holds the selected symbol from list
      symbolData: [], //Holds the symbol data

      constructor: function (options) {
        lang.mixin(this, options);
      },

      postCreate: function () {
        //initialize widget variable
        if (!this.symbolData) {
          this.symbolData = [];
        }
        //create selected symbol node
        this._createSelectedSymbolNode();
        // Initially hide tooltip dialog
        this._hideTooltipDialog();
        // Check if symbol array is defined and have at least one symbol
        if (this.symbolData && this.symbolData.length > 0) {
          // Create symbol list to be shown in selector
          this._createTooltipDialog();
          this.selectSymbol(this.symbolData[0]);
        }
        // Hide tooltip dialog clicked anywhere in the body
        this.own(on(document.body, 'click', lang.hitch(this, function (
          event) {
          var target = event.target || event.srcElement;
          if (!this.isPartOfPopup(target)) {
            this._hideTooltipDialog();
          }
        })));
      },

      /**
      * Set's default symbol
      * @memberOf widgets/ParcelDrafter/SymbolSelector
      **/
      setDefault: function () {
        // Show default symbol in the preview node
        this.selectSymbol(this.symbolData[0]);
      },

      /**
      * Creates node to show selected symbol
      * @memberOf widgets/ParcelDrafter/SymbolSelector
      **/
      _createSelectedSymbolNode: function () {
        var outerNode = domConstruct.create("div", {}, this.domNode);
        this.selectedSymbolNode = domConstruct.create("div", {
          "class": "esriCTSelectedSymbol"
        }, outerNode);
      },

      /**
      * Create tooltip dialog with the content
      * @memberOf widgets/ParcelDrafter/SymbolSelector
      **/
      _createTooltipDialog: function () {
        // Get symbol list and set it as the dialog content
        var popupContent = this._createSymbolListMenu();
        this._tooltipDialog = new TooltipDialog({
          content: popupContent,
          "class": "esriCTSymbolPopup"
        });
        // Attach 'click' event on domeNode to show tooltip dialog on clicking of it
        this.own(on(this.domNode, 'click', lang.hitch(this, function (
          event) {
          // Stop event from propagation
          event.stopPropagation();
          event.preventDefault();
          // Based on the dialog state show/hide the tooltip dialog
          if (this._isTooltipDialogOpened) {
            this._hideTooltipDialog();
          } else {
            this._showTooltipDialog();
          }
        })));
        // Hide tooltip dialog clicked anywhere in the body
        this.own(on(document.body, 'click', lang.hitch(this, function (
          event) {
          var target = event.target || event.srcElement;
          if (!this.isPartOfPopup(target)) {
            this._hideTooltipDialog();
          }
        })));
      },

      /**
      * Create menu list to show available symbols
      * @memberOf widgets/ParcelDrafter/SymbolSelector
      **/
      _createSymbolListMenu: function () {
        var symbolList, symbolListContent;
        // Create parent container to hold symbol list
        symbolList = domConstruct.create("div", {
          "class": "esriCTSymbolListContainer"
        }, null);

        symbolListContent = domConstruct.create("div", {
          "class": "esriCTSymbolListContent"
        }, symbolList);
        // Create symbol list item with the configured symbols
        array.forEach(this.symbolData, lang.hitch(this, function (
          symbolJson) {
          var symbolListItemNode, symbolOuterNode, symbolInnerNode;
          symbolListItemNode = domConstruct.create("div", {
            "class": "esriCTSymbolOption",
            "title": symbolJson.label
          }, symbolListContent);
          // Attach click on node to select symbol
          this._attachRowClick(symbolListItemNode, symbolJson);
          symbolOuterNode = domConstruct.create("div", {
            "class": "esriCTSymbolIcon"
          }, symbolListItemNode);
          // Create node to display symbol name
          domConstruct.create("div", {
            "class": "esriCTSymbolName",
            "innerHTML": symbolJson.label
          }, symbolListItemNode);
          // Create node to display symbol icon
          symbolInnerNode = domConstruct.create("div", {}, symbolOuterNode);
          this._createSymbol(symbolJson, symbolInnerNode);
        }));
        return symbolList;
      },

      /**
      * Attach 'click' event on menu item
      * @param{object} symbolListItemNode: symbol container
      * @param{object} symbolJson : contains symbol json data
      * @memberOf widgets/ParcelDrafter/SymbolSelector
      **/
      _attachRowClick: function (symbolListItemNode, symbolJson) {
        // Attach 'click' event to show the selected symbol
        this.own(on(symbolListItemNode, "click", lang.hitch(this, function () {
          this.selectSymbol(symbolJson);
          if (this.hideOnSelect) {
            this._hideTooltipDialog();
          }
        })));
      },

      /**
      * Create symbol node from the json data
      * @param{object} symbolJson : contains symbol json data
      * @param{object} symbolInnerNode : symbol container
      * @memberOf widgets/ParcelDrafter/SymbolSelector
      **/
      _createSymbol: function (symbolJson, symbolInnerNode) {
        var symbolObject, symbolNode;
        if (symbolJson) {
          symbolObject = jsonUtils.fromJson(symbolJson.symbol);
          symbolNode = symbolUtils.createSymbolNode(symbolObject);
          // If symbol node is not created
          if (!symbolNode) {
            symbolNode = domConstruct.create('div');
          }
          domConstruct.place(symbolNode, symbolInnerNode);
        }
      },

      /**
      * Select symbol from the symbol list
      * @param{object} selectedSymbol : select symbol's json data
      * @memberOf widgets/ParcelDrafter/SymbolSelector
      **/
      selectSymbol: function (selectedSymbol) {
        // Clear preview symbol node
        domConstruct.empty(this.selectedSymbolNode);
        // Set newly selected symbol
        this.selectedSymbol = {
          "label": selectedSymbol.label || selectedSymbol.type,
          "type": selectedSymbol.type,
          "symbol": selectedSymbol.symbol
        };
        this._createSymbol(this.selectedSymbol, this.selectedSymbolNode);
        // Handler on selecting symbol
        this.onSelect(selectedSymbol);
      },

      /**
      * destroy tooltip dialog on destroying widget
      * @memberOf widgets/ParcelDrafter/SymbolSelector
      **/
      destroy: function () {
        dojoPopup.close(this._tooltipDialog);
        this._tooltipDialog.destroy();
        this.inherited(arguments);
      },

      /**
      * Check whether target node is part of the popup or not
      * @param{object} target : target node
      * @memberOf widgets/ParcelDrafter/SymbolSelector
      **/
      isPartOfPopup: function (target) {
        var node, isInternal;
        node = this._tooltipDialog.domNode;
        isInternal = target === node || html.isDescendant(target,
          node);
        return isInternal;
      },

      /**
      * Handler to know when a symbol gets selected from the list
      * @param{object} selectedSymbol
      * @memberOf widgets/ParcelDrafter/SymbolSelector
      **/
      onSelect: function (selectedSymbol) {
        return selectedSymbol;
      },

      /**
      * Show tooltip dialog with the symbol list
      * @memberOf widgets/ParcelDrafter/SymbolSelector
      **/
      _showTooltipDialog: function () {
        dojoPopup.open({
          parent: this.getParent(),
          popup: this._tooltipDialog,
          around: this.domNode,
          "class": "esriCTSymbolPopup"
        });
        this._isTooltipDialogOpened = true;
      },

      /**
      * Hide tooltip dialog
      * @memberOf widgets/ParcelDrafter/SymbolSelector
      **/
      _hideTooltipDialog: function () {
        dojoPopup.close(this._tooltipDialog);
        this._isTooltipDialogOpened = false;
      }
    });
  });