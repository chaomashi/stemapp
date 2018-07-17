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

define(['dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/keys',
  "jimu/BaseWidgetSetting",
  "dijit/_WidgetsInTemplateMixin",
  'dojo/on',
  'dojo/_base/html',
  'jimu/dijit/Popup',
  'jimu/dijit/Message',
  //'../ItemNode',
  './Edit',
  './Import',
  "dojo/text!./Sync.html",
  //'jimu/utils',
  '../utils',
  'jimu/dijit/CheckBox'
],
  function (declare, lang, array, keys, BaseWidgetSetting, _WidgetsInTemplateMixin,
    on, html, Popup, Message,/* ItemNode,*/Edit, ImportWidget,
    template, /*jimuUtils,*/utils, CheckBox) {
    var Sortable = window.Sortable;
    var clazz = declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      templateString: template,
      map: null,
      edit: null,
      popup: null,
      popupState: "", // ADD or EDIT
      editIndex: null,

      startup: function () {
        this.webMapBookmarksNodes = Sortable.create(this.webMapBookMarkerContainer, {
          sort: false,
          disabled: true,//can't edit
          animation: 100
        });

        this.sortableBookMarkerNodes = Sortable.create(this.custombookMarkerContainer, {
          handle: ".drag-masker",
          sort: true,
          disabled: false,//enable dnd in edit mode
          animation: 100,
          onSort: lang.hitch(this, function (/*evt*/) {
            this.saveBookMarkersBySortable(/*true*/);
          })
        });

        this.isSyncWebmapCheckBox = new CheckBox({
          label: this.nls.alwaysSync,
          checked: false
        }, this.isSyncWebmapNode);
        this.isSyncWebmapCheckBox.startup();
        this.isSyncCustomCheckBox = new CheckBox({
          label: this.nls.configCustom,
          checked: false
        }, this.isSyncCustomNode);
        this.isSyncCustomCheckBox.startup();

        this.own(on(this.isSyncWebmapCheckBox, 'change', lang.hitch(this, function () {
          if (true === this.isSyncWebmapCheckBox.getValue()) {
            this.showWebmapBookmarks();
          } else {
            this.hideWebmapBookmarks();//just hide
          }
        })));
        this.own(on(this.isSyncCustomCheckBox, 'change', lang.hitch(this, function () {
          if (true === this.isSyncCustomCheckBox.getValue()) {
            this.showCustomBookmarks();
          } else {
            this.hideCustomBookmarks();
          }
        })));
        // this.own(on(this.importBtn, 'click', lang.hitch(this, function () {//add bookmark
        //   this.onImport();
        // })));
        this.own(on(this.createNewBtn, 'click', lang.hitch(this, function () {
          this.onAddBookmarkClick();
        })));

        this.hideWebmapBookmarks();
        this.hideCustomBookmarks();

        this.inherited(arguments);
      },

      //Webmap
      showWebmapBookmarks: function () {
        html.removeClass(this.webMapBookMarkerContainer, "hide");
        utils.empty(this._bookmarksInWebmap);//clean dom before readBookmarksInWebmap
        this._bookmarksInWebmap = utils.readBookmarksInWebmap(this.map);
        this._bookmarksInWebmap = this.displayBookmarks({
          bookmarks: this._bookmarksInWebmap,
          syncMode: "webmap",
          //initDuplicateName: false,
          bookmarksContainerNode: this.webMapBookMarkerContainer
        });
      },
      hideWebmapBookmarks: function () {
        html.addClass(this.webMapBookMarkerContainer, "hide");
      },
      //Custom
      showCustomBookmarks: function () {
        html.removeClass(this.customBtns, "hide");
        html.removeClass(this.custombookMarkerContainer, "hide");

        if("undefined" === typeof this._customBookmarks){
          utils.empty(this._customBookmarks);
          //var bookmarksInConfig = this.config.bookmarks2D;
          //this._customBookmarks = utils.webmapBookmarkFilter(bookmarksInConfig, this.map);
          this._customBookmarks = this.config.bookmarks2D;//DO NOT filter bookmark, allow repeat
          this._customBookmarks = this.displayBookmarks({
            bookmarks: this._customBookmarks,
            syncMode: "custom",
            //initDuplicateName: true,
            bookmarksContainerNode: this.custombookMarkerContainer
          });
        }
      },
      hideCustomBookmarks: function () {
        html.addClass(this.customBtns, "hide");
        html.addClass(this.custombookMarkerContainer, "hide");
      },
      destroy: function () {
        if (this.webMapBookmarksNodes && this.webMapBookmarksNodes.destroy){
          this.webMapBookmarksNodes.destroy();
          this.webMapBookmarksNodes = null;
        }
        if (this.sortableBookMarkerNodes) {
          this.sortableBookMarkerNodes.destroy();
          this.sortableBookMarkerNodes = null;
        }

        array.forEach(this._bookmarksInWebmap, function (bookmark) {
          if (bookmark.itemNode) {
            bookmark.itemNode.destroy();
          }
        }, this);
        this._bookmarksInWebmap = [];
        array.forEach(this._customBookmarks, function (bookmark) {
          if (bookmark.itemNode) {
            bookmark.itemNode.destroy();
          }
        }, this);
        this._customBookmarks = [];

        this.inherited(arguments);
      },

      setConfig: function (config) {
        this.config = config;

        if (true === this.config.syncMode.webmap) {
          this.isSyncWebmapCheckBox.setValue(true);
        }
        if (true === this.config.syncMode.custom) {
          this.isSyncCustomCheckBox.setValue(true);
        }
      },
      getConfig: function () {
        if (true === this.isSyncWebmapCheckBox.getValue()) {
          this.config.syncMode.webmap = true;
        } else {
          this.config.syncMode.webmap = false;
        }
        if (true === this.isSyncCustomCheckBox.getValue()) {
          this.config.syncMode.custom = true;
        } else {
          this.config.syncMode.custom = false;
        }

        var bookmarks = [];//just save custom-bookmarks, because read webmap-bookmarks every time when open
        bookmarks = bookmarks.concat(this._customBookmarks);

        return {
          syncMode: this.config.syncMode,
          bookmarks: bookmarks//,
          //updating: this._NEED_TO_UPDATE || false
        };
      },

      //options{bookmarks:, syncMode:, bookmarksContainerNode:}
      displayBookmarks: function (options) {
        var bookmarks = options.bookmarks,
          syncMode = options.syncMode,
          //initDuplicateName = options.initDuplicateName,
          bookmarksContainerNode = options.bookmarksContainerNode || this.custombookMarkerContainer;
        //default oper custom bookmarke;

        utils.empty(bookmarks);

        // if (true === initDuplicateName) {
        //   utils.processDuplicateName(bookmarks);//processDuplicateName only init bookmarks
        // }

        var display = {};
        if (syncMode === "webmap") {
          display = {
            editBtn: false,
            selectedBtn: false,
            deleteBtn: false,
            renameBtn: false
          };
        } else { //"custom"
          display = {
            editBtn: true,
            selectedBtn: false,
            deleteBtn: true,
            renameBtn: false
          };
        }

        array.forEach(bookmarks, function (bookmark) {
          if (!bookmark) {
            return;
          }

          display.layerInfosIcon = utils.isWithLayerInfos(bookmark);//layerInfosIcon

          var bookMarkNode = utils.createBookMarkNode(bookmark, this.nls, this.folderUrl, display);
          bookmark.itemNode = bookMarkNode;

          this.own(on(bookMarkNode, 'thumbnail-click', lang.hitch(
            this, lang.partial(this._onBookmarkClick, bookmark))));
          //this.own(on(node, 'selected', lang.hitch(this, lang.partial(this._onBookmarkSelected, bookmark))));
          //this.own(on(node, 'unselected', lang.hitch(this, lang.partial(this._onBookmarkUnSelected, bookmark))));
          this.own(on(bookMarkNode, 'delete', lang.hitch(this, lang.partial(
            this._onBookmarkDeleteImmediately, bookmark))));
          //this.own(on(node, 'labelBlur', lang.hitch(this, lang.partial(this._onBookmarkLabelChange, bookmark))));
          this.own(on(bookMarkNode, 'edit', lang.hitch(this, lang.partial(this._onBookmarkEdit, bookmark))));
        }, this);

        bookmarks.forEach(lang.hitch(this, function (bookmark) {
          if (!bookmark) {
            return;
          }

          if (bookmark.itemNode && bookmark.itemNode.domNode) {
            //DOMs have the same order to Json
            html.place(bookmark.itemNode.domNode, bookmarksContainerNode, "last");
          }
        }));

        return bookmarks;
      },
      saveBookMarkersBySortable: function (/*isKeepEditing*/) {
        //get new order
        var orders = this.sortableBookMarkerNodes.toArray();
        var newOrderBookMarkers = [];
        for (var i = 0, len = orders.length; i < len; i++) {
          var id = orders[i];

          var res = utils.findBookMarkByUID(id, this._customBookmarks);
          if (res) {
            var b = res.bookmark;
            newOrderBookMarkers.push(b);
          }
        }
        //save
        this._customBookmarks = newOrderBookMarkers;
        this.displayBookmarks({
          bookmarks: this._customBookmarks,
          syncMode: "custom"//,
          //initDuplicateName: true
        });
        //keep editing after save
        // if (isKeepEditing) {
        //   this._customBookmarks.forEach(lang.hitch(this, function (bookmark) {
        //     ItemNode.toggleEditable(bookmark);
        //   }));
        //   this.sortableBookMarkerNodes.option("disabled", !this.headBar.isEditing());
        // }
      },
      getBookmarkByName: function (name) {
        var len = this._customBookmarks.length;
        for (var i = 0; i < len; i++) {
          if (this._customBookmarks[i].displayName === name) {
            this.editIndex = i;
            return this._customBookmarks[i];
          }
        }
      },

      /////////////////////////////////////////////////////////////////////////////////////////
      onAddBookmarkClick: function () {
        this.popupState = "ADD";
        this._openEdit(this.nls.addBookmark, {
          name: '',
          thumbnail: '',
          extent: this.map.extent.toJson()
        });
      },
      _onBookmarkEdit: function (bookmark) {
        this.popupState = "EDIT";
        this._openEdit(this.nls.edit, bookmark);
      },
      _onBookmarkDeleteImmediately: function (bookmark) {
        var bm = utils.findBookMark(bookmark, this._customBookmarks);
        if (bm && bm.bookmark) {
          if (bm.bookmark.itemNode) {
            bm.bookmark.itemNode.destroy();
          }

          this._customBookmarks.splice(bm.idx, 1);
        }
      },

      // _onEditClick: function(name){
      //     this.getBookmarkByName(name);
      //     var bookmark = this._customBookmarks[this.editIndex];
      //     this.popupState = "EDIT";
      //     this._openEdit(this.nls.edit, bookmark);
      //   },
      _openEdit: function (title, bookmark) {
        this.edit = new Edit({
          nls: this.nls,
          folderUrl: this.folderUrl,
          portalUrl: this.appConfig.map.portalUrl,
          itemId: this.appConfig.map.itemId,
          mapOptions: this.appConfig.map.mapOptions
        });
        this.edit.setConfig(bookmark || {});
        this.popup = new Popup({
          titleLabel: title,
          autoHeight: true,
          content: this.edit,
          container: 'main-page',
          width: 600,
          buttons: [{
            label: this.nls.ok,
            key: keys.ENTER,
            disable: true,
            onClick: lang.hitch(this, '_onEditOk', bookmark)
          }, {
            label: this.nls.cancel,
            classNames: ['jimu-btn-vacation'],
            key: keys.ESCAPE
          }
          ],
          onClose: lang.hitch(this, '_onEditClose')
        });
        html.addClass(this.popup.domNode, 'widget-setting-popup');
        this.edit.startup();
      },

      _onEditOk: function (bookmarkRef) {
        var bookmark = this.edit.getConfig();
        var editResult = null;
        if (!bookmark.name || !bookmark.extent) {
          new Message({
            message: this.nls.warning
          });
          return;
        }

        if(this.popupState === "EDIT"){
          bookmarkRef = lang.mixin(bookmarkRef, bookmark);//edit need mix infomation first
        }
        //autoRename
        var rawNewName = bookmark.name;
        var name = utils.getAutoRenameBeforeAdd(rawNewName, this._customBookmarks, true);
        bookmark.name = rawNewName;//"bookmark"
        bookmark.displayName = name;//"bookmark(n)"

        if (this.popupState === "ADD") {
          this.addBookmark(bookmark);
          editResult = true;
        } else if (this.popupState === "EDIT") {
          //this._customBookmarks.splice(this.editIndex, 1, bookmark);
          //this.displayBookmarks();
          // bookmarkRef.name = bookmark.name;
          // bookmarkRef.displayName = bookmark.displayName;
          // bookmarkRef.extent = bookmark.extent;
          this.saveBookMarkersBySortable();
          editResult = true;
        }

        if (editResult) {
          this.popup.close();
          this.popupState = "";
          this.editIndex = null;
          editResult = false;
        } else {
          var repeatnames = array.mark(editResult.repeatFields, lang.hitch(this, function (field) {
            return field && field.name;
          }));
          new Message({
            message: this.nls[editResult.errorCode] + repeatnames.toString()
          });
        }
      },
      _onEditClose: function () {
        this.edit = null;
        this.popup = null;
      },

      addBookmark: function (bookmark) {
        //var name = utils.getAutoRenameBeforeAdd(rawNewName, this._customBookmarks);
        //var bookMarkNode = this._createBookMarkNode(bookmark);
        var display = {
          editBtn: true,
          changeImgBtn: false
        };
        var bookMarkNode = utils.createBookMarkNode(bookmark, this.nls, this.folderUrl, display);
        bookmark.itemNode = bookMarkNode;

        this._customBookmarks.unshift(bookmark);

        if (bookmark.itemNode && bookmark.itemNode.domNode) {
          html.place(bookmark.itemNode.domNode, this.custombookMarkerContainer, "last");
        }

        this.saveBookMarkersBySortable();
      },

      //ImportWidget
      onImport: function () {
        this.importWidget = new ImportWidget({
          nls: this.nls,
          map: this.map,
          folderUrl: this.folderUrl//,
          //bookmarksInSetting: this._customBookmarks
        });
        //this.importWidget.setConfig(bookmark || {});
        this.popup = new Popup({
          titleLabel: this.nls.importTitle,
          autoHeight: true,
          content: this.importWidget,
          container: 'main-page',
          width: 640,
          buttons: [{
            label: this.nls.ok,
            key: keys.ENTER,
            disable: true,
            onClick: lang.hitch(this, '_onImportOk')
          }, {
            label: this.nls.cancel,
            classNames: ['jimu-btn-vacation'],
            key: keys.ESCAPE
          }
          ],
          onClose: lang.hitch(this, '_onImportClose')
        });
        html.addClass(this.popup.domNode, 'widget-setting-popup');
        this.importWidget.startup();
      },
      _onImportOk: function () {
        var bookmarks = this.importWidget.getConfig();
        //TODO when already have bookmarks, delete them?
        array.forEach(bookmarks, function (bookmark) {
          this.addBookmark(bookmark);
        }, this);
        this.popup.close();
      },
      _onImportClose: function () {
        this.importWidget.destroy();
      }
      // _onmarkItemEditClick: function (bookmarkName) {
      //   this._onEditClick(bookmarkName);
      // },
      // _onmarkItemDeleteClick: function (bookmarkName) {
      //   this.getBookmarkByName(bookmarkName);
      //   if (this.editIndex !== null) {
      //     this._customBookmarks.splice(this.editIndex, 1);
      //   }
      //   this.displayBookmarks({
      //     bookmarks: this._customBookmarks,
      //     syncMode: "custom"
      //   });
      // }
    });
    return clazz;
  });