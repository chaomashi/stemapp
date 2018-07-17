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
  'dojo/_base/array',
  'dojo/on',
  'esri/SpatialReference',
  'jimu/BaseWidget',
  'dijit/_TemplatedMixin',
  './utils'
],
  function (Evented, declare, lang, html, array, on, SpatialReference,
    BaseWidget, _TemplatedMixin, utils) {
    var Sortable = window.Sortable;
    return declare([BaseWidget, _TemplatedMixin, Evented], {
      baseClass: 'dojoDndSource dojoDndTarget dojoDndContainer bookmarker-nodes',
      templateString: "<div></div>",
      nls: null,

      postCreate: function () {
        this.inherited(arguments);
        this.drawerHandle = html.create('div', {
          'class': "drawer-handle"
        }, this.domNode);
        this.bookMarkerContainer = html.create('div', {
          'class': "webmap"
        }, this.domNode);
      },

      startup: function () {
        this.inherited(arguments);

        if (this.config.syncMode) {
          //neither webmap nor custom displayed, so hide all this dom
          if (false === this.config.syncMode.webmap && false === this.config.syncMode.custom) {
            html.addClass(this.domNode, "hide");
          } else {
            html.removeClass(this.domNode, "hide");
          }
        }
        //this._initDrawerHandle();
        this.sortableBookMarkerNodes = Sortable.create(this.bookMarkerContainer, {
          sort: false,
          disabled: true,
          animation: 100
        });
      },

      refresh: function () {
        utils.empty(this.bookmarks);
        this.bookmarks = [];

        //part 1, read from webmap
        if (this.config.syncMode && true === this.config.syncMode.webmap) {
          this.bookmarks = utils.readBookmarksInWebmap(this.map);
        }

        var bookmarks = lang.clone(this.config.bookmarks2D);
        //part 2, append custom config
        array.forEach(bookmarks, function (bookmark) {
          if (!bookmark) {
            return;
          }

          if (true === this.config.syncMode.custom/*&& false === bookmark.isInWebmap*/) {
            this.bookmarks.push(bookmark);//custom
          }
        }, this);

        utils.updateBookmarks(this.bookmarks);//update old configs

        this.displayBookmarks(this.bookmarks/*, false*/);//DO NOT auto rename
      },
      _onBookmarkClick: function (bookmark) {
        require(['esri/geometry/Extent'], lang.hitch(this, function (Extent) {
          if (false !== bookmark.isSaveExtent) {
            var ext = bookmark.extent, sr;
            if (ext.spatialReference) {
              sr = new SpatialReference(ext.spatialReference);
            } else {
              sr = new SpatialReference({ wkid: 4326 });
            }
            this.map.setExtent(new Extent(ext));
          }

          //layers
          utils.layerInfosRestoreState(bookmark.isSaveLayers, bookmark.layerOptions);
        }));
      },

      filter: function (value) {
        utils.filter(value, this.bookmarks);
      },
      displayBookmarks: function (bookmarks/*, initDuplicateName*/) {
        utils.empty(bookmarks, this.bookMarkerContainer);

        // if (true === initDuplicateName) {
        //   utils.processDuplicateName(bookmarks);//processDuplicateName only init bookmarks
        // }

        array.forEach(bookmarks, function (bookmark) {
          if (!bookmark) {
            return;
          }
          var display = {
            editBtn: false,
            changeImgBtn: true,
            layerInfosIcon: utils.isWithLayerInfos(bookmark)
          };

          var bookMarkNode = utils.createBookMarkNode(bookmark, this.nls, this.folderUrl, display);
          bookmark.itemNode = bookMarkNode;

          this.own(on(bookMarkNode, 'thumbnail-click', lang.hitch(
            this, lang.partial(this._onBookmarkClick, bookmark))));
        }, this);

        bookmarks.forEach(lang.hitch(this, function (bookmark) {
          if (!bookmark) {
            return;
          }

          if (bookmark.itemNode && bookmark.itemNode.domNode) {
            html.place(bookmark.itemNode.domNode, this.bookMarkerContainer, "last");//DOMs have the same order to Json
          }
        }));
      }

      /*_initDrawerHandle: function () {
        html.create('div', {
          'class': "label",
          innerHTML: this.nls.bookmarksFromConfig
        }, this.drawerHandle);
        this.dropDown = html.create('div', {
          'class': "drop-down open"
        }, this.drawerHandle);

        this.own(on(this.drawerHandle, 'click', lang.hitch(this, function () {
          this.toggleDrawer();
        })));
      },
      toggleDrawer: function () {
        var style = "hide";
        if (html.hasClass(this.bookMarkerContainer, style)) {
          html.addClass(this.dropDown, "open");
        } else {
          html.removeClass(this.dropDown, "open");
        }
        html.toggleClass(this.bookMarkerContainer, style);
      }*/
    });
  });