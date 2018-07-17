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
  'dojo/text!./advance-item-list.html',
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
    baseClass: 'jimu-widget-cost-analysis-advance-item-list',

    //Properties
    activeIndex: 0,
    currentActivePanel: null, //Current open panel
    highlighterColor: "#000",
    setAutoHeight: false,

    postCreate: function () {
      this.inherited(arguments);
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
    * @memberOf widgets/CostAnalysis/advance-item-list
    */
    _loadItemList: function () {
      array.forEach(this.itemList, lang.hitch(this, function (item, index) {
        this.addItem(item, index);
      }));
      this.emit("onLoad");
    },

    /**
    * The function will add new item to item list as per the data
    * @memberOf widgets/CostAnalysis/advance-item-list
    */
    addItem: function (item, index) {
      var itemContainer;
      item.content = item.content || "";
      itemContainer = domConstruct.create("div", {
        "class": "esriCTItem"
      }, null);
      domAttr.set(itemContainer, "index", index);
      this._createItemTitle(item, itemContainer);
      if (item.content) {
        this._createItemContent(item, itemContainer);
      }
      this.itemListContainer.appendChild(itemContainer);
      if (item.isOpen) {
        this._togglePanel(itemContainer, true);
      }
      if (item.isHidden) {
        this.hide(index);
      }
    },

    /**
    * The function will be used to create all the images configured for title
    * @memberOf widgets/CostAnalysis/advance-item-list
    */
    _createImageLogo: function (item, itemContainer, type) {
      var imageContainer;
      imageContainer = domConstruct.create("div", {
        "class": "esriCTItemListImageLogo"
      }, itemContainer);
      if (type === "icon") {
        domClass.add(imageContainer, item.icon);
      } else if (type === "actionIcon") {
        domClass.add(imageContainer, item.actionIcon);
      } else {
        domClass.add(imageContainer, "esriCTArrow");
        //if panel can be toggled show up/down arrows
        if (this.togglePanels) {
          domClass.add(imageContainer, "esriCTArrowDown");
        }
      }
      return imageContainer;
    },

    /**
    * Create item title node
    * @memberOf widgets/CostAnalysis/advance-item-list
    */
    _createItemTitle: function (item, itemContainer) {
      var itemTitleContainer, itemTitle, imageContainer, itemHighlighter;
      itemTitleContainer = domConstruct.create("div", {
        "class": "esriCTItemTitleContainer"
      }, itemContainer);
      //Item highlighter
      itemHighlighter = domConstruct.create("div", {
        "class": "esriCTItemHighlighter"
      }, itemTitleContainer);
      if (!this.highlighter) {
        domClass.add(itemHighlighter, "esriCTHidden");
      }
      if (item.icon) {
        this._createImageLogo(item, itemTitleContainer, "icon");
      }
      //create esriCTItemTitle
      itemTitle = domConstruct.create("div", {
        "class": "esriCTItemTitle esriCTFloatLeft esriCTEllipsis",
        "innerHTML": item.title,
        "title": item.title
      }, itemTitleContainer);

      if (item.actionIcon) {
        imageContainer = this._createImageLogo(item, itemTitleContainer, "actionIcon");
        if (item.actionIconTitle) {
          domAttr.set(imageContainer, 'title', item.actionIconTitle);
        }
        this.own(on(imageContainer, "click", lang.hitch(this, function (evt) {
          evt.stopPropagation();
          this.emit("onActionButtonClicked", domAttr.get(itemContainer, "index"));
        })));
      }
      if (this.showArrow) {
        this._createImageLogo(item, itemTitleContainer, "arrow");
      }
      //Set item title width
      this._setItemTitleWidth(item, itemTitle);

      this.own(on(itemTitleContainer, "click", lang.hitch(this, function () {
        if (this.togglePanels) {
          this._togglePanel(itemContainer, false);
        }
        this.emit("onTitleClicked", domAttr.get(itemContainer, "index"));
      })));
    },

    /**
    * Set width of title panel based on the availability of other components
    * @memberOf widgets/CostAnalysis/advance-item-list
    */
    _setItemTitleWidth: function (item, itemTitle) {
      var totalContentWidth = 0, availableWidth;
      if (item.icon) {
        totalContentWidth += 32;
      }
      if (item.actionIcon) {
        totalContentWidth += 32;
      }
      if (this.showArrow) {
        totalContentWidth += 32;
      }
      if (this.highlighter) {
        totalContentWidth += 10;
      }
      availableWidth = "calc(100% - " + totalContentWidth + "px)";
      domStyle.set(itemTitle, "width", availableWidth);
    },

    /**
    * Create content for each title row
    * @memberOf widgets/CostAnalysis/advance-item-list
    */
    _createItemContent: function (item, itemContainer) {
      var itemContent;
      //create node for adding item content
      itemContent = domConstruct.create("div", {
        "class": "esriCTItemContent"
      }, itemContainer);
      if (!this.setAutoHeight) {
        domClass.add(itemContent, "esriCTItemAnimation");
      }
      //add content based on content type ("string" or "object")
      if (typeof (item.content) === "string") {
        domAttr.set(itemContent, "innerHTML", item.content);
      } else {
        domConstruct.place(item.content, itemContent);
      }
    },

    /**
    * Create item list based on the data passed
    * @memberOf widgets/CostAnalysis/advance-item-list
    */
    _togglePanel: function (node, isManual) {
      var title, panel, arrow, bufferHeight = 0, itemHighlighter;
      if (!isManual) {
        bufferHeight = 30;
      }
      title = query(".esriCTItemTitle", node)[0];
      panel = query(".esriCTItemContent", node)[0];
      arrow = query(".esriCTArrow", node)[0];
      itemHighlighter = query(".esriCTItemHighlighter", node)[0];
      if (title && panel) {
        if (!domClass.contains(panel, "esriCTItemContentActive")) {
          //set the heights to panel
          if (this.togglePanels && !this.setAutoHeight) {
            panel.style.height = panel.scrollHeight + bufferHeight + "px";
          } else {
            panel.style.height = "auto";
          }
          //if openMultiple panel is false hide the prev panel
          if (this.currentActivePanel && !this.openMultiple) {
            this._togglePanel(this.currentActivePanel, true);
          }
          this.currentActivePanel = node;
          //set the item highlighter
          domStyle.set(itemHighlighter, "backgroundColor", this.highlighterColor);
          //if panel is toggle-able and show arrow is true update the arrow icon
          if (this.showArrow && this.togglePanels) {
            domClass.replace(arrow, "esriCTArrowUp", "esriCTArrowDown");
          }
        } else {
          //set the heights to panel
          panel.style.height = 0;
          if (this.currentActivePanel &&
            domAttr.get(this.currentActivePanel, "index") === domAttr.get(node, "index")) {
            this.currentActivePanel = null;
          }
          //set the item highlighter
          domStyle.set(itemHighlighter, "backgroundColor", "transparent");
          //if panel is toggle-able and show arrow is true update the arrow icon
          if (this.showArrow && this.togglePanels) {
            domClass.replace(arrow, "esriCTArrowDown", "esriCTArrowUp");
          }
        }
        domClass.toggle(panel, "esriCTItemContentActive");
      }
    },

    /**
    * Fires when title row is clicked
    * @memberOf widgets/CostAnalysis/advance-item-list
    */
    onTitleClicked: function () {
      return;
    },

    /**
    * Fires when analysis button is  clicked
    * @memberOf widgets/CostAnalysis/advance-item-list
    */
    onAnalysisButtonClicked: function () {
      return;
    },

    /**
    * Show item list
    * @memberOf widgets/CostAnalysis/advance-item-list
    */
    show: function (index) {
      var item;
      item = query(".esriCTItem[index = " + index + "]", this.itemListContainer);
      if (item.length === 1) {
        domStyle.set(item[0], "display", "");
        item.isHidden = false;
      }
    },

    /**
    * Hide item list
    * @memberOf widgets/CostAnalysis/advance-item-list
    */
    hide: function (index) {
      var item;
      item = query(".esriCTItem[index = " + index + "]", this.itemListContainer);
      if (item.length === 1) {
        domStyle.set(item[0], "display", "none");
        item.isHidden = true;
      }
    }
  });
});