define(
  ["dojo/_base/declare",
    "dojo/_base/lang",
    'dojo/_base/html',
    'dojo/_base/array',
    "dojo/on",
    "dijit/_WidgetsInTemplateMixin",
    "jimu/BaseWidgetSetting",
    'jimu/utils',
    '../utils',
    '../ItemNode',
    "dojo/text!./Import.html"
  ],
  function (
    declare, lang, html, array, on, _WidgetsInTemplateMixin, BaseWidgetSetting,
    jimuUtils, utils, ItemNode, template
  ) {
    var Sortable = window.Sortable;
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: "jimu-Bookmark-Import",
      templateString: template,
      bookmarks: [],
      _selectedBookMarksNumber: 0,

      postCreate: function () {
        this.inherited(arguments);

        this.sortableBookMarkerNodes = Sortable.create(this.bookMarkerContainer, {
          handle: ".drag-masker",
          sort: false,
          disabled: !this._init_editing,//enable dnd in edit mode
          animation: 100/*,
          onSort: lang.hitch(this, function () {
            this.saveBookMarkersBySortable(true);
          })*/
        });
        this.bookmarks = utils.readBookmarksInWebmap(this.map);

        this.displayBookmarks(this.bookmarks);

        if (this.bookmarks && 0 === this.bookmarks.length) {
          html.addClass(this.bookmarksInWebmap, "hide");
        } else {
          html.addClass(this.noBookmark, "hide");
        }

        this.own(on(this.all, 'change', lang.hitch(this, function () {
          this._selectOrUnselectAll();
        })));
      },

      startup: function () {
        if (this.bookmarksInSetting) {
          this.bookmarksInSetting.forEach(lang.hitch(this, function (bookmark) {
            var bm = utils.findBookMarkByNameAndExtent(bookmark, this.bookmarks);
            if (bm && bm.bookmark) {
              bm.bookmark.itemNode.onSelected();//mark as selected
            }
          }));
        }
      },
      // setConfig: function (/*bookmarks*/) {
      // },
      getConfig: function () {
        var selectedBookmarks = [];//results
        this.bookmarks.forEach(lang.hitch(this, function (bookmark) {
          if (bookmark.itemNode && bookmark.itemNode.domNode) {
            if (html.hasClass(bookmark.itemNode.domNode, "selected")) {
              delete bookmark.itemNode;
              var clonedBookmarks = lang.clone(bookmark);
              selectedBookmarks.push(clonedBookmarks);
            }
          }
        }));

        return selectedBookmarks;
      },

      _isSelectedAll: function () {
        return (this.bookmarks.length === this._selectedBookMarksNumber);
      },
      _selectOrUnselectAll: function () {
        if (!this._isSelectedAll()) {
          //select all
          this.bookmarks.forEach(lang.hitch(this, function (bookmark) {
            if (bookmark.itemNode && bookmark.itemNode.domNode) {
              if (false === html.hasClass(bookmark.itemNode.domNode, "selected")) {
                html.addClass(bookmark.itemNode.domNode, "selected");

                this._selectedBookMarksNumber++;
              }
            }
          }));
        } else {
          //unselect all
          this.bookmarks.forEach(lang.hitch(this, function (bookmark) {
            if (bookmark.itemNode && bookmark.itemNode.domNode) {
              if (html.hasClass(bookmark.itemNode.domNode, "selected")) {
                html.removeClass(bookmark.itemNode.domNode, "selected");
              }
            }
          }));

          this._selectedBookMarksNumber = 0;
        }
      },
      destroy: function () {
        array.forEach(this.bookmarks, function (bookmark) {
          if (bookmark.itemNode) {
            bookmark.itemNode.destroy();
          }
        }, this);
        this.bookmarks = [];
        if (this.sortableBookMarkerNodes) {
          this.sortableBookMarkerNodes.destroy();
          this.sortableBookMarkerNodes = null;
        }
        this.inherited(arguments);
      },


      displayBookmarks: function (bookmarks) {
        //this.empty();
        //inserted doms is a stack, so inverse
        bookmarks.reverse();
        //utils.processDuplicateName(this.bookmarks);
        array.forEach(bookmarks, function (bookmark, idx) {
          var bookMarkNode = this._createBookMarkNode(bookmark, idx);
          bookmark.itemNode = bookMarkNode;
        }, this);

        bookmarks.forEach(lang.hitch(this, function (bookmark) {
          if (bookmark.itemNode && bookmark.itemNode.domNode) {
            html.place(bookmark.itemNode.domNode, this.bookMarkerContainer, "first");
          }
        }));
      },

      //********************  itemNode  ************************/
      _createBookMarkNode: function (bookmark, idx) {
        var thumbnail, node;

        if (bookmark.thumbnail ||
          ("undefined" !== typeof bookmark.thumbnail && "" !== bookmark.thumbnail)) {
          thumbnail = jimuUtils.processUrlInWidgetConfig(bookmark.thumbnail, this.folderUrl);
        } else {
          thumbnail = this.folderUrl + 'images/thumbnail_default.png';
        }

        node = new ItemNode({
          dataId: idx,
          img: thumbnail,
          label: bookmark.displayName || bookmark.name,
          display: {
            selectedBtn: true,
            editBtn: false,
            deleteBtn: false
          },
          nls: this.nls
        });
        this.own(on(node, 'click', lang.hitch(this, lang.partial(this._onBookmarkClick, node))));
        this.own(on(node, 'selected', lang.hitch(this, lang.partial(this._onBookmarkSelected, node))));
        this.own(on(node, 'unselected', lang.hitch(this, lang.partial(this._onBookmarkUnSelected, node))));
        return node;
      },
      _onBookmarkClick: function (node) {
        node.onSelected();
      },
      _onBookmarkSelected: function () {
        this._selectedBookMarksNumber++;
        this._isDisableOK();
      },
      _onBookmarkUnSelected: function () {
        this._selectedBookMarksNumber--;
        this._isDisableOK();
      },
      _isDisableOK: function () {
        if (this.popup) {
          if (this._selectedBookMarksNumber > 0) {
            this.popup.enableButton(0);
          } else {
            this.popup.disableButton(0);
          }

          utils.setCheckboxWithoutEvent(this.all, this._isSelectedAll());
        }
      }
    });
  });