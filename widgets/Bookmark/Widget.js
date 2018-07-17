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
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/_base/html',
  'jimu/BaseWidget',
  "dojo/query",
  'dojo/on',
  'dojo/Deferred',
  //'esri/SpatialReference',
  //'./ItemNode',
  "./HeadBar",
  "./WebmapBookmarks",
  "./CustomBookmarks",
  //'jimu/utils',
  './utils',
  'libs/storejs/store'
],
  function (declare, lang, array, html, BaseWidget, query, on, Deferred,
    /*SpatialReference, ItemNode, */HeadBar, WebmapBookmarks, CustomBookmarks,
    /*jimuUtils, */utils, store) {
    return declare([BaseWidget], {
      //these two properties is defined in the BaseWidget
      baseClass: 'jimu-widget-bookmark dojoDndSource dojoDndTarget dojoDndContainer',
      name: 'Bookmark',
      //bookmarks: Object[]
      //    all of the bookmarks, the format is the same as the config.json
      bookmarks: [],
      //_init_editing: false,
      jimuNls: null,

      postMixInProperties: function () {
        this.jimuNls = window.jimuNls;
      },

      startup: function () {
        this.inherited(arguments);

        //TODO ======================= for test only ===============================
        //this.config = utils._testUpdateOldConfig();
        //this.bookmarks = this.config.bookmarks2D;
        //this._saveAllToLocalCache();
        //TODO ======================= for test only ===============================

        //check wheather update config
        if (utils.isConfigBefore5_3(this.config)) {
          utils.setDefaultConfigForUpdate(this.config);//set default config
          //but no completeUpdateConfig() in widget.js, beacuse widget can't save config
        }

        //HeadBar
        this.headBar = new HeadBar({
          map: this.map,
          nls: this.nls,
          bookmarksContainer: this.bookmarksContainer,
          editMenuContainer: this.editMenuContainer,
          editable: this.config.editable,
          layout: this.config.layout
        }, this.headBarContainer);
        this.headBar.startup();
        this.own(on(this.headBar, 'add', lang.hitch(this, function () {
          this.customBookmarks.add();
        })));
        this.own(on(this.headBar, 'filter-change', lang.hitch(this, function (value) {
          this.webmapBookmarks.filter(value);
          this.customBookmarks.filter(value);
        })));
        // this.own(on(this.headBar, 'layout-cards', lang.hitch(this, function () {
        //   this.bookmarks.forEach(lang.hitch(this, function (bookmark) {
        //     ItemNode.removeFloatLeading(bookmark);
        //   }));
        // })));
        // this.own(on(this.headBar, 'layout-list', lang.hitch(this, function () {
        //   this.bookmarks.forEach(lang.hitch(this, function (bookmark) {
        //     ItemNode.addFloatLeading(bookmark);
        //   }));
        // })));

        //webmap area
        this.webmapBookmarks = new WebmapBookmarks({
          nls: this.nls,
          map: this.map,
          folderUrl: this.folderUrl,
          config: this.config
        }, this.webmapBookmarksContainer);
        this.webmapBookmarks.startup();

        //custom area
        this.customBookmarks = new CustomBookmarks({
          nls: this.nls,
          map: this.map,
          folderUrl: this.folderUrl,
          widgetId: this.id,
          config: this.config
        }, this.customBookmarksContainer);
        this.customBookmarks.startup();
        this.own(on(this.customBookmarks, 'sort', lang.hitch(this, '_onSort')));
        this.own(on(this.customBookmarks, 'change-img', lang.hitch(this, '_onChangeImg')));
        this.own(on(this.customBookmarks, 'delete', lang.hitch(this, '_onDelete')));
        this.own(on(this.customBookmarks, 'label-blur', lang.hitch(this, '_onLabelBlur')));
        this.own(on(this.customBookmarks, 'added', lang.hitch(this, '_onAdded')));

        this.resize();
      },

      _onLabelBlur: function (bookmarks) {
        this.onBookmarksChange(bookmarks);
      },
      _onSort: function (bookmarks) {
        this.onBookmarksChange(bookmarks);
      },
      _onChangeImg: function (bookmarks) {
        this.onBookmarksChange(bookmarks);
      },
      _onDelete: function (bookmarks) {
        this.onBookmarksChange(bookmarks);
      },
      _onAdded: function (bookmarks) {
        this.onBookmarksChange(bookmarks);
      },
      onBookmarksChange: function (bookmarks) {
        this._saveAllToLocalCache(bookmarks);
        this.resize();
      },

      onOpen: function () {
        //1 webmap
        this.webmapBookmarks.refresh();//refresh when opened
        //2 custom
        var bookmarksInCache = this._getLocalCache();
        this.customBookmarks.refresh(bookmarksInCache);

        this.resize();
      },

      destroy: function () {
        if (this.headBar) {
          this.headBar.destroy();
          this.headBar = null;
        }
        if (this.webmapBookmarks) {
          this.webmapBookmarks.destroy();
          this.webmapBookmarks = null;
        }
        if (this.customBookmarks) {
          this.customBookmarks.destroy();
          this.customBookmarks = null;
        }

        this.inherited(arguments);
      },

      onMinimize: function () {
        this.resize();
      },
      onMaximize: function () {
        this.resize();
      },

      //********************  responsive  ************************/
      resize: function () {
        if (window.appInfo.isRunInMobile) {
          html.addClass(this.domNode, "mobile");
        } else {
          html.removeClass(this.domNode, "mobile");
        }
        //this.headBar.toogleMobileDisplay(window.appInfo.isRunInMobile);
        this.customBookmarks.toggleMobile(window.appInfo.isRunInMobile);

        var parentNode = this.domNode.parentElement || this.domNode.parentNode;
        //put scroller aside
        if (parentNode) {
          if (window.isRTL) {
            html.setStyle(parentNode, "padding-left", "0");
          } else {
            html.setStyle(parentNode, "padding-right", "0");
          }
        }

        this._getParentSize(parentNode).then(lang.hitch(this, function (parentSize) {
          //var itemSize = this.getItemSize();
          //this.setContainerWidth(parentSize, itemSize);
          // this.items.forEach(lang.hitch(this, function(item) {
          //   this.setItemPosition(item, itemSize);
          // }));
          var dartThemeRuler = 280 - 1;
          var foldableThemeRuler = 330;
          var container = this.domNode;
          var thumbnailWidth = 100;

          if (parentSize.w >= dartThemeRuler && parentSize.w < foldableThemeRuler - 1) {
            this._setNodeWidths(container, 130, thumbnailWidth);
          } else if (Math.abs(parentSize.w - foldableThemeRuler) <= 1) {
            this._setNodeWidths(container, thumbnailWidth, thumbnailWidth);
          } else {
            var box = html.getMarginBox(container);
            var width = box.w - 20;
            var column = parseInt(width / thumbnailWidth, 10);
            if (column > 0) {
              var margin = width % thumbnailWidth;
              var addWidth = parseInt(margin / column, 10);
              this._setNodeWidths(container, thumbnailWidth + addWidth, thumbnailWidth);
            }
          }

          this.setContainerHeight(parentSize, parentNode);
        }));
      },
      _setNodeWidths: function (container, width, thumbnailWidth) {
        var minWidth = thumbnailWidth + 4;
        if (width < minWidth) {
          width = minWidth;
        }
        query('.jimu-img-node', container).forEach(function (node) {
          html.setStyle(node, 'width', width + 'px');
        });
      },

      getItemSize: function () {
        var size = {};
        size.width = this.itemSize.width;
        size.height = this.itemSize.height;
        return size;
      },

      setContainerWidth: function (parentSize, itemSize) {
        var scrollerWidth = 20;

        var colsNum = Math.floor((parentSize.w) / (itemSize.width + 2 * this.hmargin));
        var totalWidth = (itemSize.width + 2 * this.hmargin) * colsNum + scrollerWidth;
        html.setStyle(this.domNode, {
          width: totalWidth + "px",
          margin: "0px auto"//move to center
        });
      },
      setContainerHeight: function (parentSize, parentNode) {
        var headerH = this._getDomHeight(".header", parentNode);
        //var errorH = this._getDomHeight(".error", parentNode);
        //var footerH = this._getDomHeight(".footer", parentNode);
        var usedH = headerH;// + errorH + footerH;

        html.setStyle(this.bookmarksContainer, {
          height: parentSize.h - usedH + "px"
        });
      },

      setItemPosition: function (item, itemSize) {
        var itemStyle = {
          position: 'relative',
          margin: this.vmargin + "px " + this.hmargin + "px"
        };
        if (itemSize.width >= 0) {
          itemStyle.width = itemSize.width + 'px';
        }
        if (itemSize.height >= 0) {
          itemStyle.height = itemSize.height + 'px';
        }
        html.setStyle(item.domNode, itemStyle);
        html.addClass(item.domNode, "jimu-float-leading");
      },

      _getDomHeight: function (className, sope) {
        var h = 0;
        var dom = query(className, sope)[0];
        if (dom) {
          var domSize = html.getMarginBox(dom);
          if (domSize && domSize.h) {
            h = domSize.h;
          }
        }
        return h;
      },
      //delay get height
      _getParentSize: function (parentNode) {
        var def = new Deferred();
        setTimeout(lang.hitch(this, function () {
          var parentSize = html.getMarginBox(parentNode);
          var padding = html.getPadExtents(parentNode);
          parentSize.h = parentSize.h - padding.h;

          def.resolve(parentSize);
        }), 10);
        return def;
      },

      //********************  LocalCache  ************************/
      _saveAllToLocalCache: function (bookmarks) {
        var keys = [];
        //clean
        array.forEach(store.get(utils.getKey(this.id)), function (bName) {
          store.remove(bName);
        }, this);
        //set
        array.forEach(bookmarks, function (bookmark) {
          var key = utils.getKey(this.id) + '.' + bookmark.displayName;
          keys.push(key);

          var bookmarkData = lang.mixin({}, bookmark);
          if (bookmarkData.itemNode) {
            delete bookmarkData.itemNode;
          }
          if (bookmarkData._uID) {
            delete bookmarkData._uID;
          }

          try {
            store.set(key, bookmarkData);
          } catch (error) {
            alert("localcache store error");//TODO
          }
        }, this);
        //set indexs
        store.set(utils.getKey(this.id), keys);
      },
      _getLocalCache: function () {
        var oldCacheBefore5_3 = this._getCacheByKeys(this._getOldKey());
        //oldCacheBefore5_3 = utils._testSetOldCacheBookmark();//TODO test only
        var cache = this._getCacheByKeys(utils.getKey(this.id));
        var updatedKey = this._getCacheUpdatedKey();
        //need to update old cache, keep them(do not delete) after updated
        if (0 === cache.length && oldCacheBefore5_3.length > 0 && true !== store.get(updatedKey)) {
          //only old cache, and have not updated(independent of config update)
          cache = utils.filterBookmarkFromTarget(oldCacheBefore5_3, this.config.bookmarks2D);//filter old cache
          this._saveAllToLocalCache(cache);//update immediately, so cache.length will >0 next time
          store.set(updatedKey, true);//flag, for delete all new cache
        }

        return cache;
      },
      _getCacheUpdatedKey: function () {
        return utils.getKey(this.id) + ".BookmarkCacheUpdated";
      },

      //keys = oldKey OR newKey
      _getCacheByKeys: function (keys) {
        var cache = [];
        if (!store.get(keys)) {
          //no cache
        } else {
          array.forEach(store.get(keys), function (bName) {
            if (bName.startWith(keys)) {
              var bookmark = store.get(bName);
              cache.push(bookmark);
            }
          }, this);
        }

        return cache;
      },
      // //new keys after 5.3
      // _getKey: function () {
      //   var prefix = "Bookmark.2D";
      //   // if (this.appConfig.map['3D']) {
      //   //   prefix = this.name + '.3D';
      //   // } else {
      //   //   prefix = this.name + '.2D';
      //   // }
      //   var appId = encodeURIComponent(jimuUtils.getAppIdFromUrl());
      //   var widgetId = this.id;
      //   //like: Bookmark.2D.appId.widgetId
      //   return prefix + "." + appId + "." + widgetId;
      // },
      //Deprecated(old keys befor 5.3, just for update)
      _getOldKey: function () {
        if (this.appConfig.map['3D']) {
          return this.name + '.3D';
        } else {
          return this.name + '.2D';
        }
      }
      /*
      _cleanLocalCache: function () {
        var key = this._getKeysKey();
        for (var p in store.getAll()) {
          if (p.startWith(key)) {
            store.remove(p);
          }
        }
      }*/
    });
  });