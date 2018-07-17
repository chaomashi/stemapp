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
  'dojo/Evented',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./item-list.html',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/dom-attr',
  'dojo/dom-class',
  'dojo/dom-style',
  'dojo/on',
  'dojo/query',
  'dojo/dom-construct'
], function (
  declare,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  array,
  lang,
  domAttr,
  domClass,
  domStyle,
  on,
  query,
  domConstruct
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    baseClass: 'jimu-widget-cost-analysis-item-list',

    //Properties
    highlighterColor: "#000",
    currentActivePanel: null, //Current open panel
    postCreate: function () {
      this.inherited(arguments);
      //Initialize array's and object
    },

    startup: function () {
      this.inherited(arguments);
      if (this.itemList && this.itemList.length > 0) {
        setTimeout(lang.hitch(this, function () {
          this._loadItemList();
        }), 0);
      }
    },

    /**
    * Create item list based on the data
    * @memberOf widgets/CostAnalysis/item-list
    */
    _loadItemList: function () {
      array.forEach(this.itemList, lang.hitch(this, function (item) {
        this.addItem(item);
      }));
    },

    /**
    * The function will add new item to item list as per the data
    * @memberOf widgets/CostAnalysis/item-list
    */
    addItem: function (item) {
      var itemHighlighter, itemTitle, itemContent, itemTitleContainer,
        itemContainer;
      item.content = item.content || "";
      itemContainer = domConstruct.create("div", {}, null);
      itemTitleContainer = domConstruct.create("div", {
        "class": "esriCTItemTitleContainer"
      }, itemContainer);
      //Item highlighter
      itemHighlighter = domConstruct.create("div", {
        "class": "esriCTItemHighlighter"
      }, itemTitleContainer);
      //create esriCTItemTitle
      itemTitle = domConstruct.create("div", {
        "class": "esriCTItemTitle esriCTEllipsis",
        "innerHTML": item.title,
        "title": item.title
      }, itemTitleContainer);
      //create node for adding item content
      itemContent = domConstruct.create("div", {
        "class": "esriCTItemContent"
      }, itemContainer);
      //add content based on content type ("string" or "object")
      if (typeof (item.content) === "string") {
        domAttr.set(itemContent, "innerHTML", item.content);
      } else {
        domConstruct.place(item.content, itemContent);
      }
      this.itemListContainer.appendChild(itemContainer);
      this.own(on(itemTitleContainer, "click", lang.hitch(this, function (evt) {
        this._togglePanel(evt.currentTarget.parentElement);
      })));
      //If item needs to be opened on load check for isOpen property
      if (item.isOpen) {
        this._togglePanel(itemContainer, true);
      }
    },

    /**
    * Create item list based on the data passed
    * @memberOf widgets/CostAnalysis/item-list
    */
    _togglePanel: function (node, isManual) {
      var title, panel, bufferHeight = 0, itemHighlighter;
      if (!isManual) {
        bufferHeight = 30;
      }
      title = query(".esriCTItemTitle", node)[0];
      panel = query(".esriCTItemContent", node)[0];
      itemHighlighter = query(".esriCTItemHighlighter", node)[0];
      domClass.toggle(title, "esriCTItemTitleActive");
      domClass.toggle(panel, "esriCTItemContentActive");
      if (domClass.contains(panel, "esriCTItemContentActive")) {
        panel.style.height = panel.scrollHeight + bufferHeight + "px";
        if (this.currentActivePanel && !this.openMultiple) {
          this._togglePanel(this.currentActivePanel, true);
        }
        this.currentActivePanel = node;
        domStyle.set(itemHighlighter, "backgroundColor", this.highlighterColor);
      } else {
        panel.style.height = 0;
        domStyle.set(itemHighlighter, "backgroundColor", "transparent");
        if (domAttr.get(this.currentActivePanel, "index") === domAttr.get(node, "index")) {
          this.currentActivePanel = null;
        }
      }
    }
  });
});