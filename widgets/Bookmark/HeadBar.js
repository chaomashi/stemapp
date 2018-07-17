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
  'dojo/Evented',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/html',
  'dojo/on',
  //'esri/SpatialReference',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!./HeadBar.html"
  //'./utils'
],
  function (Evented, declare, lang, html, on,/* SpatialReference,*/
    _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template/*, utils*/) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'dojoDndSource dojoDndTarget dojoDndContainer',
      templateString: template,
      nls: null,
      map: null,
      bookmarksContainer: null,
      //editable: false,
      layout: null,

      //isAddingBookmark: false,//adding and haven't cancel
      //isEnableRename: false,
      editingName: false,//is typing the name
      //isEnableDelete: false,

      initMapState: null,

      postMixInProperties: function () {
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
      },
      startup: function () {
        this.inherited(arguments);

        this.refreshUI();

        //events
        this.own(on(this.addBtn, 'click', lang.hitch(this, function () {
          this.addingBookmark();
        })));
        //this.own(on(this.filterInput, 'change', lang.hitch(this, this.onFilterChange)));
        this.own(on(this.filterInput, 'blur', lang.hitch(this, this.onFilterChange)));
        this.own(on(this.filterInput, 'keyUp', lang.hitch(this, this.onFilterChange)));
        //this.own(on(this.filterBtn, 'click', lang.hitch(this, this.onFilterChange)));
        this.own(on(this.cardsBtn, 'click', lang.hitch(this, function () {
          this._toggleLayoutBtnDisplay("cards");
        })));
        this.own(on(this.listBtn, 'click', lang.hitch(this, function () {
          this._toggleLayoutBtnDisplay("list");
        })));
        //TODO ==>keep start ==>
        // this.own(on(this.backToInitBtn, 'click', lang.hitch(this, function () {
        //   require(['esri/geometry/Extent'], lang.hitch(this, function (Extent) {
        //     var layerOptions = this.initMapState.layers;

        //     utils.layerInfosRestoreState(isUse, layerOptions);
        //     if (this.initMapState.extent) {
        //       this.map.setExtent(new Extent(this.initMapState.extent));
        //     }
        //   }));
        //   //html.removeClass(this.backToInitBtn, "marked");
        //   //this._listenExtentChangeOnce();
        //   this.emit("goto-init-extent");
        // })));
        //this._listenExtentChangeOnce();
        //TODO ==>keep end ==>
      },

      refreshUI: function () {
        if (this.editable) {
          html.addClass(this.domNode, "editable");
          html.removeClass(this.addBtn, "hide");
        } else {
          html.removeClass(this.domNode, "editable");
          html.addClass(this.addBtn, "hide");
        }

        //runtime layout mode recorder
        // var lastLayout = utils.getLastLayout();
        // if ("undefined" === typeof lastLayout) {
        //   //no record in cache, so use defaultMode
        //   this._toggleLayoutBtnDisplay(this.layout.defaultMode);
        // } else {
        //   if (true === this.layout[lastLayout]) {
        //     //use runtime cache first
        //     this._toggleLayoutBtnDisplay(lastLayout);
        //   } else {
        //     //config has changed, use new config
        //     if (true === this.layout.cards) {
        //       this._toggleLayoutBtnDisplay("cards");
        //     } else {
        //       this._toggleLayoutBtnDisplay("list");
        //     }
        //   }
        // }
        this._toggleLayoutBtnDisplay(this.layout.defaultMode);//use default layout in config, only

        if (false === this.editable &&
          !(true === this.layout.list && true === this.layout.cards)) {
          html.addClass(this.domNode, "hide");
        } else {
          html.removeClass(this.domNode, "hide");
        }
      },
      _toggleLayoutBtnDisplay: function (mode) {
        html.addClass(this.listBtn, "hide");
        html.addClass(this.cardsBtn, "hide");

        if ("list" === mode) {
          this.listMode();
        } else {
          this.cardsMode();
        }

        //icons ui
        if (true === this.layout.list && true === this.layout.cards) {
          if ("list" === mode) {
            html.removeClass(this.cardsBtn, "hide");
          } else {
            html.removeClass(this.listBtn, "hide");
          }

          html.addClass(this.displayMode, "two-modes");
        } else {
          html.removeClass(this.displayMode, "two-modes");
        }
      },
      cardsMode: function () {
        html.removeClass(this.bookmarksContainer, "list");
        html.addClass(this.bookmarksContainer, "cards");

        html.addClass(this.domNode, "list");
        html.removeClass(this.domNode, "cards");

        this.emit("layout-cards");
      },
      listMode: function () {
        html.removeClass(this.bookmarksContainer, "cards");
        html.addClass(this.bookmarksContainer, "list");

        html.addClass(this.domNode, "cards");
        html.removeClass(this.domNode, "list");

        this.emit("layout-list");
      },
      // toogleMobileDisplay: function (isMobile) {
      //   if (isMobile) {
      //     html.addClass(this.displayMode, "hide");
      //   } else {
      //     html.removeClass(this.displayMode, "hide");
      //   }
      // },

      //add
      addingBookmark: function () {
        //this.isAddingBookmark = true;
        //html.addClass(this.domNode, "adding");
        this.emit("add");
      },
      // cancelAddingBookmark: function () {
      //   this.isAddingBookmark = false;
      //   //html.removeClass(this.domNode, "adding");
      // },
      onFilterChange: function () {
        var val = this.filterInput.getValue();
        this.emit("filter-change", val);
      },
      onFilterBlur: function () {
        var val = this.filterInput.getValue();
        this.emit("filter-blur", val);
      }
      // updateInitMapState: function () {
      //   this.initMapState = {
      //     extent: this.map.extent.toJson(),
      //     layers: {}
      //   };

      //   this.initMapState.layers = utils.getlayerInfos();
      // },
      // _listenExtentChangeOnce: function () {
      //   this.own(on.once(this.map, 'extent-change', lang.hitch(this, function () {
      //     html.addClass(this.backToInitBtn, "marked");
      //   })));
      // }
    });
  });