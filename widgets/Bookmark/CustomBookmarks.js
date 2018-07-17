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
  'dojo/sniff',
  'esri/SpatialReference',
  'jimu/BaseWidget',
  'dijit/_TemplatedMixin',
  './utils',
  './ItemNode',
  'jimu/dijit/ImageChooser'
],
  function (Evented, declare, lang, html, array, on, has,
    SpatialReference, BaseWidget, _TemplatedMixin, utils,
    ItemNode, ImageChooser) {
    var Sortable = window.Sortable;
    return declare([BaseWidget, _TemplatedMixin, Evented], {
      baseClass: 'dojoDndSource dojoDndTarget dojoDndContainer bookmarker-nodes',
      templateString: "<div></div>",//template,
      nls: null,
      _CHANGING_IMG_BM: null,//bookMark whick is chaning thumbnail

      postCreate: function () {
        this.inherited(arguments);
        this.drawerHandle = html.create('div', {
          'class': "drawer-handle hide",
          "innerHTML":"<div class='separate-line'></div>"
        }, this.domNode);
        this.bookMarkerContainer = html.create('div', {
          'class': "custom editing"
        }, this.domNode);
        this.imageChooserContainer = html.create('div', {
          'class': "hide"
        }, this.domNode);
      },

      startup: function () {
        this.inherited(arguments);

        var webMapBookmark = utils.readBookmarksInWebmap(this.map);
        if ((true === this.config.syncMode.webmap && webMapBookmark.length > 0) ||
          (true === this.config.syncMode.custom && this.config.bookmarks2D.length > 0)) {
          html.removeClass(this.drawerHandle, "hide");//there is pre-defined bookmark, so display the line
        }

        //this._initDrawerHandle();
        this.sortableBookMarkerNodes = Sortable.create(this.bookMarkerContainer, {
          handle: ".drag-masker",
          filter: ".disable-drag .hide",//itme can't drag, with this class
          sort: true,
          disabled: false,
          //delay: 10,
          animation: 100,
          onSort: lang.hitch(this, function (/*evt*/) {
            this.saveBookMarkersBySortable();
            this.emit("sort", this.bookmarks);
          })
        });

        //image chooser
        this.imageChooser = new ImageChooser({
          cropImage: false,
          showSelfImg: true,
          goldenWidth: 108,
          goldenHeight: 71,
          maxSize: 100,//TODO limit size
          label: this.nls.selectFile,
          format: ['image/gif', "image/png", "image/jpeg"]
        }, this.imageChooserContainer);
        this.imageChooser.startup();
        this.own(on(this.imageChooser, 'imageChange', lang.hitch(this, '_onImageChange')));
      },

      toggleMobile: function (isMobile) {
        this._IS_MOBILE = isMobile;
        if(this._IS_MOBILE){
          this.sortableBookMarkerNodes.option("disabled", true);//disable drag reorder in mobile
        } else {
          this.sortableBookMarkerNodes.option("disabled", false);
        }
      },

      refresh: function (localCache) {
        var bookmarks = localCache;

        this.bookmarks = bookmarks;
        utils.updateBookmarks(this.bookmarks);//update old configs
        this.displayBookmarks(this.bookmarks/*, true*/);

        this.toggleDrawer();
      },

      add: function () {
        //data
        var rawNewName = "bookmark";
        var name = utils.getAutoRenameBeforeAdd(rawNewName, this.bookmarks);
        var bookmark = {
          name: rawNewName,//"bookmark"
          displayName: name,//"bookmark(n)"
          extent: this.map.extent.toJson(),
          isSaveLayers: this.config.isSaveLayerVisibility
        };
        bookmark.isSaveExtent = true;
        // layer visibility
        if (true === this.config.isSaveLayerVisibility) {
          bookmark.layerOptions = utils.getlayerInfos();
        }
        if (name !== rawNewName) {
          bookmark._autoRename = true;
        }

        //show drawer, if hide
        //this.showDrawer();

        //add to html
        this._doAddBookmark(bookmark);
        this.bookmarks.unshift(bookmark);//add new bookmark to the head of stack
        if (bookmark.itemNode && bookmark.itemNode.domNode) {
          html.place(bookmark.itemNode.domNode, this.bookMarkerContainer, "first");//put new bookmark to the first place
        }

        this.displayBookmarks(this.bookmarks/*, true*/);

        this.toggleDrawer();

        //keep editing label
        this.bookmarks.forEach(lang.hitch(this, function (bookmark, forEachIdx) {
          if (0 === forEachIdx) {
            ItemNode.enableEditable(bookmark);
            ItemNode.focusLabel(bookmark);
          } else {
            ItemNode.disableEditable(bookmark);
          }
        }));

        this.emit("added", this.bookmarks);//have add callback
      },

      _doAddBookmark: function (bookmark) {
        var display = {
          enableEditLabel: true,
          editBtn: false,
          changeImgBtn: true,
          layerInfosIcon: utils.isWithLayerInfos(bookmark)
        };

        var bookMarkNode = utils.createBookMarkNode(bookmark, this.nls, this.folderUrl, display);
        bookmark.itemNode = bookMarkNode;

        this.own(on(bookMarkNode, 'thumbnail-click', lang.hitch(this, lang.partial(
          this._onNodeBoxClick, bookmark))));
        this.own(on(bookMarkNode, "label-click", lang.hitch(this, lang.partial(this._onLebelClick, bookmark))));
        this.own(on(bookMarkNode, 'label-blur', lang.hitch(this, lang.partial(this._onLabelBlur, bookmark))));

        this.own(on(bookMarkNode, "delete", lang.hitch(this, lang.partial(
          this._onBookmarkDeleteImmediately, bookmark))));
        this.own(on(bookMarkNode, "change-img", lang.hitch(this, lang.partial(this._onBookmarkChangeImg, bookmark))));
        this.own(on(bookMarkNode, "rename", lang.hitch(this, lang.partial(this._onRename, bookmark))));

        return bookMarkNode;
      },

      filter: function (value) {
        this._LAST_FILTER_STR = value;//recorder
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
          this._doAddBookmark(bookmark);
        }, this);

        bookmarks.forEach(lang.hitch(this, function (bookmark) {
          if (!bookmark) {
            return;
          }

          if (bookmark.itemNode && bookmark.itemNode.domNode) {
            //DOMs have the same order to Json
            html.place(bookmark.itemNode.domNode, this.bookMarkerContainer, "last");
          }
        }));
      },
      saveBookMarkersBySortable: function (option) {//option{isRefresh}
        //get new order
        var orders = this.sortableBookMarkerNodes.toArray();
        var newOrderBookMarkers = [];
        for (var i = 0, len = orders.length; i < len; i++) {
          var id = orders[i];

          var res = utils.findBookMarkByUID(id, this.bookmarks);
          if (res) {
            var b = res.bookmark;
            newOrderBookMarkers.push(b);
          }
        }
        //save
        this.bookmarks = newOrderBookMarkers;

        if (option) {
          if (option.isRefresh) {
            this.displayBookmarks(this.bookmarks/*, true*/);
          }
        }
      },

      _isListMode: function () {
        var res = false;
        if (this.domNode) {
          var parent = this.domNode.parentElement || this.domNode.parentNode;
          if (parent) {
            return html.hasClass(parent, "list");
          } else {
            return res;
          }
        }

        return res;
      },

      _onNodeBoxClick: function (bookmark) {
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
      _onLebelClick: function (bookmark) {
        if (this._isListMode() || true === this._IS_MOBILE) {
          this._onNodeBoxClick(bookmark);//goto extent when under list mode(rename-btn for change name)
        } else {
          //ItemNode.enableEditable(bookmark);
          ItemNode.focusLabel(bookmark);
        }
      },
      _onLabelBlur: function (bookmark) {
        //setTimeout(lang.hitch(this, function() {
        var val = bookmark.itemNode.nodeLabel.get('value');
        bookmark.displayName = val;
        bookmark.name = val;

        this.emit("label-blur", this.bookmarks);

        this.filter(this._LAST_FILTER_STR);
        //}), 500);
      },

      //delete
      _onBookmarkDeleteImmediately: function (bookmark) {
        this.removeBookMarks([bookmark]);
      },
      removeBookMarks: function (deleteBookmarks) {
        //delete from this.bookmarks
        for (var i = 0, len = deleteBookmarks.length; i < len; i++) {
          var deleteBookmark = deleteBookmarks[i];
          var bm = utils.findBookMark(deleteBookmark, this.bookmarks);
          if (bm && bm.bookmark) {
            if (bm.bookmark.itemNode) {
              bm.bookmark.itemNode.destroy();
            }

            this.bookmarks.splice(bm.idx, 1);
          }
        }
        //console.log("bookmarks len==>" + this.bookmarks.length);
        this.emit("delete", this.bookmarks);

        this.toggleDrawer();
      },

      _onBookmarkChangeImg: function (bookmark) {
        this._CHANGING_IMG_BM = bookmark;

        var mask = this.imageChooser.mask;
        if (has('safari')) {
          var click_ev = document.createEvent("MouseEvents");
          click_ev.initEvent("click", true /* bubble */, true /* cancelable */);
          mask.dispatchEvent(click_ev);
        } else {
          mask.click();
        }
      },
      _onImageChange: function (data) {
        if (this._CHANGING_IMG_BM && this._CHANGING_IMG_BM.itemNode) {
          if ("" === data) {

          } else {
            this._CHANGING_IMG_BM.itemNode.changeImg(data);
            this._CHANGING_IMG_BM.thumbnail = data;
          }
          this.emit("change-img", this.bookmarks);
        }
      },
      _onRename: function (bookmark) {
        //ItemNode.enableEditable(bookmark);
        ItemNode.focusLabel(bookmark);
      },


      /*_initDrawerHandle: function () {
        html.create('div', {
          'class': "label",
          innerHTML: this.nls.bookmarksFromCache
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
      },*/
      toggleDrawer: function () {
        if (true === utils.isBookmarksDataEmpty(this.bookmarks)) {
          html.addClass(this.domNode, "hide");
        } else {
          html.removeClass(this.domNode, "hide");
        }
      },
      hideDrawer: function () {
        html.addClass(this.bookMarkerContainer, "hide");
      },
      showDrawer: function () {
        html.removeClass(this.bookMarkerContainer, "hide");
      }
    });
  });