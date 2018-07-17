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
  'dojo/_base/lang',
  //'dojo/on',
  //'dojo/Deferred',
  'dojo/_base/array',
  'dojo/_base/html',
  //'dojo/keys',
  'jimu/utils',
  './ItemNode',
  'libs/storejs/store',
  'jimu/LayerInfos/LayerInfos'
  //'jimu/dijit/Popup',
  //"jimu/dijit/CheckBox"
],
  function (lang, /*on,Deferred, */array, html, /*keys, */jimuUtils, ItemNode,
    store, LayerInfos/*, Popup, CheckBox*/) {

    var mo = {
      _uID: 0 //increased ID
    };

    mo.getUID = function () {
      return mo._uID++;
    };

    mo.findBookMark = function (bookmark, bookmarks) {
      var idx = -1,
        bm = null;
      array.some(bookmarks, function (b, i) {
        if (parseInt(b._uID, 10) === parseInt(bookmark._uID, 10)) {
          idx = i;
          bm = b;
          return true;
        }
      }, this);

      if (-1 !== idx) {
        return {
          bookmark: bm,
          idx: idx
        };
      } else {
        return null;
      }
    };
    mo.findBookMarkByUID = function (id, bookmarks) {
      var idx = -1, bm = null;
      array.some(bookmarks, function (b, i) {
        if (parseInt(b._uID, 10) === parseInt(id, 10)) {
          idx = i;
          bm = b;
          return true;
        }
      }, this);

      if (-1 !== idx) {
        return {
          bookmark: bm,
          idx: idx
        };
      } else {
        return null;
      }
    };
    // mo.findBookMarkByName = function (bookmark, bookmarks) {
    //   var idx = -1, bm = null;

    //   array.some(bookmarks, function (b, i) {
    //     if (b.name === bookmark.name) {

    //       idx = i;
    //       bm = b;
    //       return true;
    //     }
    //   }, this);

    //   if (-1 !== idx) {
    //     return {
    //       bookmark: bm,
    //       idx: idx
    //     };
    //   } else {
    //     return null;
    //   }
    // };
    mo.findBookMarkByNameAndExtent = function (bookmark, bookmarks) {
      var idx = -1, bm = null;

      array.some(bookmarks, function (b, i) {
        if (b.name === bookmark.name) {
          if (b.extent && bookmark.extent &&
            b.extent.xmax === bookmark.extent.xmax &&
            b.extent.xmin === bookmark.extent.xmin &&
            b.extent.ymax === bookmark.extent.ymax &&
            b.extent.ymin === bookmark.extent.ymin) {

            idx = i;
            bm = b;
            return true;
          }
        }
      }, this);

      if (-1 !== idx) {
        return {
          bookmark: bm,
          idx: idx
        };
      } else {
        return null;
      }
    };
    mo.isBookmarksDataEmpty = function(bookmarks) {
      if(Array.isArray(bookmarks) && 0 === bookmarks.length){
        return true;
      } else {
        return false;
      }
    };

    mo.empty = function (bookmarks, container) {
      var tmp = bookmarks;
      array.forEach(bookmarks, function (bookmark) {
        if (bookmark && bookmark.itemNode) {
          bookmark.itemNode.destroy();
        }
      }, this);
      bookmarks = [];

      bookmarks = tmp;

      if (container) {
        html.empty(container);
      }
    };
    mo.createBookMarkNode = function (bookmark, nls, folderUrl, display) {
      var thumbnail, node;

      if (bookmark.thumbnail ||
        ("undefined" !== typeof bookmark.thumbnail && "" !== bookmark.thumbnail)) {
        thumbnail = jimuUtils.processUrlInWidgetConfig(bookmark.thumbnail, folderUrl);
      } else {
        thumbnail = jimuUtils.processUrlInWidgetConfig('images/thumbnail_default.png', folderUrl);
      }

      var _uID = mo.getUID();
      bookmark._uID = _uID;

      node = new ItemNode({
        dataId: _uID,
        //extent: null,
        img: thumbnail,
        label: bookmark.displayName || bookmark.name,
        display: display,
        nls: nls
      });

      return node;
    };

    mo.cloneBookmarksDataWithOutDom = function (bookmarks) {
      //itemNode
      var bookmarksDatas = [];
      if ("undefined" === typeof bookmarks) {
        return bookmarksDatas;
      }

      bookmarks.forEach(lang.hitch(this, function (bookmark) {
        if (bookmark.itemNode && bookmark.itemNode.domNode) {
          var clonedBookmark = lang.clone(bookmark);
          delete clonedBookmark.itemNode;
          bookmarksDatas.push(clonedBookmark);
        }
      }));

      return bookmarksDatas;
    };

    mo.readBookmarksInWebmap = function (map) {
      var bookmarksInWebmap = [];

      if (!map.itemInfo || !map.itemInfo.itemData ||
        !map.itemInfo.itemData.bookmarks) {
        return bookmarksInWebmap;
      }
      array.forEach(map.itemInfo.itemData.bookmarks, function (bookmark) {
        var copyedBookmark = lang.mixin({}, bookmark);
        copyedBookmark.isInWebmap = true;
        bookmarksInWebmap.push(copyedBookmark);
      }, this);

      return bookmarksInWebmap;
    };

    // mo.webmapBookmarkFilter = function (bms, map) {
    //   var bookmarks = [],
    //     bookmarksInWebmap = [];

    //   bookmarksInWebmap = mo.readBookmarksInWebmap(map);
    //   for (var i = 0, len = bms.length; i < len; i++) {
    //     var bm = bms[i];

    //     var res = mo.findBookMarkByName(bm, bookmarksInWebmap);
    //     if (res) {

    //     } else {
    //       bookmarks.push(bm);//diff from bookmarksInWebmap
    //     }
    //   }

    //   return bookmarks;
    // };
    mo.filterBookmarkFromTarget = function (updateBms, targetBms) {
      var bookmarks = [];
      //  bookmarksInWebmap = [];
      //bookmarksInWebmap = mo.readBookmarksInWebmap(map);
      for (var i = 0, len = updateBms.length; i < len; i++) {
        var bm = updateBms[i];

        var res = mo.findBookmarkByNameOrExtent(bm, targetBms);
        if (res) {
          //repeat
        } else {
          bookmarks.push(bm);//diff from targetBms
        }
      }

      return bookmarks;
    };
    mo.findBookmarkByNameOrExtent = function (bookmark, bookmarks) {
      var idx = -1, bm = null;

      array.some(bookmarks, function (b, i) {
        var bName = b.displayName || b.name,
        bookmarkName = bookmark.displayName || bookmark.name;

        if (bName === bookmarkName ||
            (b.extent && bookmark.extent &&
            b.extent.xmax === bookmark.extent.xmax &&
            b.extent.xmin === bookmark.extent.xmin &&
            b.extent.ymax === bookmark.extent.ymax &&
            b.extent.ymin === bookmark.extent.ymin)) {

          idx = i;
          bm = b;
          return true;
        }

      }, this);

      if (-1 !== idx) {
        return {
          bookmark: bm,
          idx: idx
        };
      } else {
        return null;
      }
    };
    //filter
    mo.filter = function (str, bookmarks) {
      bookmarks.forEach(function (bookmark) {
        if ("undefined" !== typeof str && "" !== str) {
          var name = bookmark.displayName || bookmark.name;

          if (-1 !== name.indexOf(str)) {
            ItemNode.show(bookmark);
          } else {
            ItemNode.hide(bookmark);
          }
        } else {
          ItemNode.show(bookmark);
        }
      });
    };

    mo.getKeysKey = function () {
      // summary:
      // we use className plus 2D/3D as the local store key
      if (this.appConfig.map['3D']) {
        return this.name + '.3D';
      } else {
        return this.name + '.2D';
      }
    };

    mo.getAutoRenameBeforeAdd = function (newBookmarkName, bookmarks, isStrict) {
      var sumNum = 0;
      var patrn = new RegExp(/\((\d+)\){1}$/g);//number in (), at the end of name

      array.forEach(bookmarks, function (bookmark) {
        if (!bookmark || "undefined" === typeof bookmark.name) {
          return;
        }

        if (-1 !== bookmark.name.indexOf(newBookmarkName)) {//is include
          if ("undefined" === typeof isStrict ||
            (true === isStrict && newBookmarkName.length === bookmark.name.length)) {//is same(in setting need strict-same)

            //get (num) by RegExp
            var res = patrn.exec(bookmark.displayName);
            if (null === res && sumNum === 0) {
              sumNum = 1;//only one
            } else if (res && "undefined" !== typeof res[1]) {
              if (res[1] >= sumNum) {
                sumNum = parseInt(res[1], 10) + 1;//max num +1
              }
            }
          }
        }
      });

      if (0 === sumNum) {
        return newBookmarkName;
      } else {
        return newBookmarkName + "(" + sumNum + ")";
      }
    };

    mo.processDuplicateName = function (bookmarks) {
      var bookmarkArray = [];
      var nameHash = {};
      //array.forEach(bookmarks, function (bookmark) {
      for (var i = (bookmarks.length - 1); i >= 0; i--) {
        var bookmark = bookmarks[i];
        if (!bookmark || "undefined" === typeof bookmark.name) {
          return;
        }

        var nameStr = bookmark.name;

        if (nameStr in nameHash) {
          nameHash[nameStr]++;
        } else {
          nameHash[nameStr] = 0;
        }

        if (nameHash[nameStr] > 0) {
          //suffix name(num) first
          var tmpDisplayName = nameStr + "(" + nameHash[nameStr] + ")";//like name(1)
          if (tmpDisplayName in nameHash) {
            nameHash[tmpDisplayName]++;
            nameHash[nameStr]++;
          } else {
            nameHash[tmpDisplayName] = 0;
          }

          if (nameHash[tmpDisplayName] > 0) {
            //type-in like "name(1)", turn to "name(2)"
            bookmark.displayName = nameStr + "(" + nameHash[nameStr] + ")";
            //bookmark.name = bookmark.displayName;
            bookmark._autoRename = true;
          } else {
            //type-in like "name", turn to "name(num)"
            bookmark.displayName = tmpDisplayName;
            //bookmark.name = bookmark.displayName;
            bookmark._autoRename = true;
          }
        } else {
          //no duplicateName
          bookmark.displayName = nameStr;
          //bookmark.name = bookmark.displayName;
        }

        bookmarkArray.push(bookmark);
      }
      //}, this);

      bookmarks = bookmarkArray;
    };

    //mo.LocalCache

    //checkbox
    mo.toogleCheckboxChecked = function (dijit) {
      if (dijit && dijit.setValue) {
        dijit.setValue(!dijit.checked);
      }
    };
    mo.setCheckboxWithoutEvent = function (dijit, isSelect) {
      if (dijit && dijit.check && dijit.uncheck) {
        if (true === isSelect) {
          dijit.check(true);
        } else {
          dijit.uncheck(true);
        }
      }
    };

    //LayerInfos visibility
    mo.layerInfosRestoreState = function (isEnableLayersVisibility, layerOptions) {
      var layerInfosObj = LayerInfos.getInstanceSync();

      var layers = {};
      if (layerOptions && isEnableLayersVisibility) {
        for (var key in layerOptions) {
          if (layerOptions.hasOwnProperty(key)) {
            var layer = layerOptions[key];
            var visible = false;
            if ("undefined" === typeof layer.visible) {
              visible = layer.selected;//turn .selected to .visible
            } else {
              visible = layer.visible;//keep: layers[key].visible
            }

            layers[key] = {
              visible: visible
            };
          }
        }

        layerInfosObj.restoreState({
          layerOptions: layers
        });
      } else {
        //keep current visibility
      }
    };
    mo.getlayerInfos = function () {
      var layers = {};
      var layerInfosObj = LayerInfos.getInstanceSync();
      if (layerInfosObj && layerInfosObj.traversal) {
        layerInfosObj.traversal(lang.hitch(this, function (layerInfo) {
          layers[layerInfo.id] = {
            visible: layerInfo.isVisible()
          };
        }));
      }

      return layers;
    };
    mo.isWithLayerInfos = function (bookmark) {
      if (!bookmark.layerOptions) {
        return false;
      }

      if(false === bookmark.isSaveLayers){
        return false;
      }

      return true;
    };

    //stringify & parse
    mo.stringifyBookmarks = function (bookmarks) {
      var bookmarkDatas = [];
      //config without domRef
      array.forEach(bookmarks, function (bk) {
        var copyedBookmark = lang.mixin({}, bk);

        if (copyedBookmark.itemNode) {
          delete copyedBookmark.itemNode;
        }
        bookmarkDatas.push(copyedBookmark);
      }, this);

      return bookmarkDatas;
    };
    mo.parseBookmarks = function (bookmarks) {
      return lang.clone(bookmarks);
    };

    //update old version config
    //new keys after 5.3
    mo.getKey = function (id) {
      var prefix = "Bookmark.2D";
      var appId = encodeURIComponent(jimuUtils.getAppIdFromUrl());
      var widgetId = id;
      //like: Bookmark.2D.appId.widgetId
      return prefix + "." + appId + "." + widgetId;
    };
    //use this both in setting/runtime
    mo.isConfigBefore5_3 = function (config) {
      if ("undefined" === typeof config.syncMode || true === config.needToUpdateFlag) {
        //config.isConfigBefore5_3 = true;
        return true;
      } else {
        return false;
      }
    };
    //flag to update cache
    mo.getUpdateCacheKey = function (id) {
      return 'bookmark_cache_updated_' + encodeURIComponent(mo.getKey(id));//TODO widget id
    };
    mo.setUpdateCacheKey = function (id) {
      store.set(mo.getUpdateCacheKey(id), true);
    };
    mo.isCacheKeyUpdatedy = function (id) {
      return store.get(mo.getUpdateCacheKey(id));
    };

    mo.setDefaultConfigForUpdate = function (config) {
      config.needToUpdateFlag = true;
      //default setting
      config.layout = {
        cards: true,
        list: false,
        defaultMode: "cards"
      };
      config.editable = true;
      // config.syncMode = {
      //   webmap: true,
      //   custom: true
      // };
      if (Array.isArray(config.bookmarks2D) && config.bookmarks2D.length > 0) {
        config.syncMode = {
          webmap: false,
          custom: true//just display custom bookmark, if oldConfig with old custom bookmark(avoid repetition)
        };
      } else {
        config.syncMode = {
          webmap: true,
          custom: true
        };
      }
    };
    //delet need to update flag
    mo.completeUpdateConfig = function (config) {
      if (config.needToUpdateFlag) {
        delete config.needToUpdateFlag;
      }
    };

    //update old version bookmarks
    mo.updateBookmarks = function (bookmarks) {
      //delete "undefined" bookmarks
      for (var i = 0; i < bookmarks.length; i++) {
        if ("undefined" === typeof bookmarks[i]) {
          bookmarks.splice(i, 1);
          i--;
        }
      }

      var endsWithReg = new RegExp("/widgets/Bookmark/images/thumbnail_default.png$");
      array.forEach(bookmarks, function (bookmark) {
        if ("undefined" === typeof bookmark.isSaveExtent) {
          bookmark.isSaveExtent = true;
        }
        // if ("undefined" === typeof bookmark.isSaveLayers) {
        //   bookmark.isSaveLayers = false;
        // }
        // if ("undefined" === typeof bookmark.layerOptions) {
        //   bookmark.layerOptions = null;
        // }
        if (bookmark.thumbnail && endsWithReg.test(bookmark.thumbnail)) {
          delete bookmark.thumbnail;//for old version update bug
        }
      }, this);
    };

    //NoticePopup
    // mo.getNoticePopupRecordKey = function (mode) {
    //   if ("change" === mode || "sync" === mode) {
    //     return 'isNeedBookMark_' + mode + '_NoticePopup_' + encodeURIComponent(jimuUtils.getAppIdFromUrl());//TODO widget_id
    //   }
    // };
    // mo.setNoticePopupRecord = function (mode) {
    //   if ("change" === mode || "sync" === mode) {
    //     store.set(mo.getNoticePopupRecordKey(mode), false);
    //   }
    // };
    // mo.cleanNoticePopupRecord = function (mode) {
    //   if ("change" === mode || "sync" === mode) {
    //     store.remove(mo.getNoticePopupRecordKey(mode));
    //   }
    // };
    // mo.isNeedNoticePopup = function (mode) {
    //   var res;
    //   if ("change" === mode || "sync" === mode) {
    //     res = typeof (store.get(mo.getNoticePopupRecordKey(mode)));
    //   }

    //   if ("undefined" === res) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // };
    // mo._getPopContent = function(mode, nls){
    //   if (mo.chkBox && mo.chkBox.destroy) {
    //     mo.chkBox.destroy();
    //   }

    //   var tips = "";
    //   if(mode === "change"){
    //     tips = nls.changeNoticeTips;
    //   } else {
    //     tips = nls.syncNoticeTips;
    //   }

    //   var _content = html.create('div', {
    //     "class": "bookmark-notice-popup"
    //   });
    //   html.create('div', {
    //     "class": "tips",
    //     innerHTML: tips
    //   }, _content);
    //   var cb = html.create('div', {
    //     "class": "check-box"
    //   }, _content);
    //   mo.chkBox = new CheckBox({
    //     checked: false,
    //     title: nls.dontShowAgain,
    //     label: nls.dontShowAgain
    //   });
    //   mo.chkBox.placeAt(cb);

    //   return _content;
    // };
    // mo.showChangeNoticePopup = function (nls) {
    //   var def = new Deferred();
    //   //destruct
    //   if (mo.changeNoticePopup && mo.changeNoticePopup.destroy) {
    //     mo.changeNoticePopup.destroy();
    //   }

    //   if (false === mo.isNeedNoticePopup("change")) {
    //     def.resolve();//do not popup
    //   } else {
    //     //new Popup
    //     mo.changeNoticePopup = new Popup({
    //       titleLabel: nls.notice,
    //       autoHeight: true,
    //       content: mo._getPopContent("change", nls),
    //       container: 'main-page',
    //       width: 400,
    //       buttons: [{
    //         label: nls.ok,
    //         key: keys.ENTER,
    //         onClick: lang.hitch(this, function () {
    //           if (true === mo.chkBox.getValue()) {
    //             mo.setNoticePopupRecord("change");//set cookie, while checked
    //           }
    //           def.resolve("ok");
    //           this.changeNoticePopup.close();
    //         })
    //       }],
    //       onClose: lang.hitch(this, function () {
    //         def.resolve("close");
    //       })
    //     });
    //   }

    //   return def;
    // };
    // mo.showSyncNoticePopup = function (nls) {
    //   var def = new Deferred();
    //   //destruct
    //   if (mo.syncNoticePopup && mo.syncNoticePopup.destroy) {
    //     mo.syncNoticePopup.destroy();
    //   }

    //   if (false === mo.isNeedNoticePopup("sync")) {
    //     def.resolve();//do not popup
    //   } else {
    //     //new Popup
    //     mo.syncNoticePopup = new Popup({
    //       titleLabel: nls.notice,
    //       autoHeight: true,
    //       content: mo._getPopContent("sync", nls),
    //       container: 'main-page',
    //       width: 400,
    //       buttons: [{
    //         label: nls.ok,
    //         key: keys.ENTER,
    //         onClick: lang.hitch(this, function () {
    //           if (true === mo.chkBox.getValue()) {
    //             mo.setNoticePopupRecord("sync");//set cookie, while checked
    //           }
    //           def.resolve("ok");
    //           this.syncNoticePopup.close();
    //         })
    //       }],
    //       onClose: lang.hitch(this, function () {
    //         def.resolve("close");
    //       })
    //     });
    //   }

    //   return def;
    // };

    //layout recorder
    mo.getLayoutRecorderKey = function () {
      return 'bookMarkLayout_' + encodeURIComponent(jimuUtils.getAppIdFromUrl());//TODO widget id
    };
    mo.cleanLayoutRecorder = function (mode) {
      store.remove(mo.getLayoutRecorderKey(mode));
    };
    mo.setLastLayout = function (mdoe) {
      store.set(mo.getLayoutRecorderKey(), mdoe);
    };
    mo.getLastLayout = function () {
      return store.get(mo.getLayoutRecorderKey());
    };

    //test update
    /* jscs:disable */
    mo.oldBookmarksBackup =
      '[{"displayName":"Greater Manchester or Greater Lincolnshire HAHAHAHA","name":"Greater Manchester or Greater Lincolnshire HAHAHAHA","extent":{"type":"extent","xmin":8997982.70263581,"ymin":2110475.6293307655,"xmax":14672667.682525788,"ymax":6024051.4775307495,"spatialReference":{"wkid":102100}},"thumbnail":"","isInWebmap":false},{"displayName":"Peterborough and Cambridgeshire HEHEHEHEHEH","name":"Peterborough and Cambridgeshire HEHEHEHEHEH","extent":{"type":"extent","xmin":9055621.33977054,"ymin":445965.34674161975,"xmax":14730306.319660518,"ymax":4359541.194941604,"spatialReference":{"wkid":102100}},"thumbnail":"","isInWebmap":false},{"displayName":"mentougou biejing china","name":"mentougou biejing china","extent":{"type":"extent","xmin":9502343.119353313,"ymin":3151483.465165457,"xmax":15177028.09924329,"ymax":7065059.313365442,"spatialReference":{"wkid":102100}},"thumbnail":"","isInWebmap":false},{"displayName":"凤凰置地三元桥北京中国世界太阳系宇宙","name":"凤凰置地三元桥北京中国世界太阳系宇宙","extent":{"type":"extent","xmin":-22698739.91955998,"ymin":-13654303.392799985,"xmax":22698739.91955998,"ymax":17654303.39279999,"spatialReference":{"wkid":102100}},"thumbnail":"","isInWebmap":false},{"displayName":"短中文","name":"短中文","extent":{"type":"extent","xmin":-22698739.91955998,"ymin":-13654303.392799985,"xmax":22698739.91955998,"ymax":17654303.39279999,"spatialReference":{"wkid":102100}},"thumbnail":"","isInWebmap":false},{"displayName":"short","name":"short","extent":{"type":"extent","xmin":-22698739.91955998,"ymin":-13654303.392799985,"xmax":22698739.91955998,"ymax":17654303.39279999,"spatialReference":{"wkid":102100}},"thumbnail":"","isInWebmap":false},{"displayName":"中文 English","name":"中文 English","extent":{"type":"extent","xmin":-22698739.91955998,"ymin":-13654303.392799985,"xmax":22698739.91955998,"ymax":17654303.39279999,"spatialReference":{"wkid":102100}},"thumbnail":"","isInWebmap":false},{"displayName":"Underneath the icons","name":"Underneath the icons","extent":{"type":"extent","xmin":-22698739.91955998,"ymin":-13654303.392799985,"xmax":22698739.91955998,"ymax":17654303.39279999,"spatialReference":{"wkid":102100}},"thumbnail":"","isInWebmap":false},{"displayName":"中文中文 呵呵","name":"中文中文 呵呵","extent":{"type":"extent","xmin":-22698739.91955998,"ymin":-13654303.392799985,"xmax":22698739.91955998,"ymax":17654303.39279999,"spatialReference":{"wkid":102100}},"thumbnail":"","isInWebmap":false},{"displayName":"eee RTL","name":"eee RTL","extent":{"type":"extent","xmin":-22698739.91955998,"ymin":-13654303.392799985,"xmax":22698739.91955998,"ymax":17654303.39279999,"spatialReference":{"wkid":102100}},"thumbnail":"","isInWebmap":false}]';
    /* jscs:enable */
    // mo._testUpdate = function () {
    //   mo.__testUpdateOldConfig();
    //   mo.cleanLocalCacheTo5_3();
    //   mo.__testUpdateOldLocalCache();
    // };
    mo._testUpdateOldConfig = function () {
      var oldVersionConfig = {
        "bookmarks2D": [{
          "extent": {
            "spatialReference": {
              "wkid": 102100
            },
            "xmax": -1656069.6628128502,
            "xmin": -10861390.956860503,
            "ymax": 15102583.15961978,
            "ymin": -1119447.7364922247
          },
          "name": "bm1",
          "isInWebmap": true,
          "displayName": "bm1"
        }, {
          "extent": {
            "spatialReference": {
              "wkid": 102100
            },
            "xmax": -1656069.6628128502,
            "xmin": -10861390.956860503,
            "ymax": 15102583.15961978,
            "ymin": -1119447.7364922247
          },
          "name": "bm1",
          "isInWebmap": true,
          "displayName": "bm1(1)"
        }, {
          "extent": {
            "spatialReference": {
              "wkid": 102100
            },
            "xmax": -3197863.7584074493,
            "xmin": -13112899.816301128,
            "ymax": 11466459.916526379,
            "ymin": -4859686.568575533
          },
          "name": "bm2",
          "isInWebmap": true,
          "displayName": "bm2"
        }, {
          "extent": {
            "spatialReference": {
              "wkid": 102100
            },
            "xmax": -3767577.3201611056,
            "xmin": -14304298.96767071,
            "ymax": 15120033.300894285,
            "ymin": -4622246.062418217
          },
          "name": "Untitled",
          "isInWebmap": true,
          "displayName": "Untitled"
        }, {
          "extent": {
            "spatialReference": {
              "wkid": 102100
            },
            "xmax": -4334684.982862408,
            "xmin": -16556089.386187213,
            "ymax": 16750523.655935397,
            "ymin": -5666212.383958025
          },
          "name": "Untitled",
          "isInWebmap": true,
          "displayName": "Untitled(1)"
        }
        ],
        "bookmarks3D": [],
        "flyTime": 3000
      };
      return oldVersionConfig;
    };
    mo._testSetOldCache = function (bookmarks) {
      var keys = [];
      //clear
      // array.forEach(store.get("Bookmark.2D"), function (bName) {
      //   store.remove(bName);
      // }, this);
      array.forEach(bookmarks, function (bookmark) {
        var key = "Bookmark.2D" + '.' + bookmark.displayName;
        keys.push(key);
        var bookmarkData = lang.mixin({}, bookmark);
        if (bookmarkData.itemNode) {
          delete bookmarkData.itemNode;
        }
        if (bookmarkData._uID) {
          delete bookmarkData._uID;
        }
        // if (bookmarkData.displayName) {
        //   delete bookmarkData.displayName;
        // }
        try {
          store.set(key, bookmarkData);
        } catch (error) {
          alert("store error==>");//TODO
        }
      }, this);

      store.set("Bookmark.2D", keys);//indexs
    };
    /* jscs:disable */
    mo._testSetOldCacheBookmark = function () {
      return JSON.parse('[{"extent":{"spatialReference":{"wkid":102100,"latestWkid":3857},"xmax":-8273877.24778316,"xmin":-14295892.084200885,"ymax":6466269.8495007465,"ymin":2983187.344602761},"name":"bm1","isInWebmap":true,"displayName":"bm1"},{"extent":{"spatialReference":{"wkid":102100,"latestWkid":3857},"xmax":-8004818.908219411,"xmin":-11015826.326428276,"ymax":5527011.645932751,"ymin":3785470.393483758},"name":"bm1","isInWebmap":true,"displayName":"bm1(1)"},{"extent":{"spatialReference":{"wkid":102100,"latestWkid":3857},"xmax":-12874774.854323175,"xmin":-13627526.708875552,"ymax":4655629.523482032,"ymin":4220244.210369689},"name":"bm2","isInWebmap":true,"displayName":"bm2"},{"extent":{"spatialReference":{"wkid":102100,"latestWkid":3857},"xmax":-11618761.605541585,"xmin":-14629769.023750449,"ymax":6691911.956998556,"ymin":4950370.704549563},"name":"bm3","isInWebmap":true,"displayName":"bm3"},{"extent":{"spatialReference":{"wkid":102100,"latestWkid":3857},"xmax":-4317189.3003047705,"xmin":-16361218.973140221,"ymax":10449906.504800193,"ymin":3483741.495004222},"name":"bm4","isInWebmap":true,"displayName":"bm4"},{"name":"add-inRT-1","displayName":"add-inRT-1","extent":{"xmin":-14714155.502977258,"ymin":2694561.125798012,"xmax":-7855613.8290067855,"ymax":6754896.068305495,"spatialReference":{"wkid":102100,"latestWkid":3857}}},{"name":"add-inRT-2","displayName":"add-inRT-2","extent":{"xmin":-14714155.502977258,"ymin":2694561.125798012,"xmax":-7855613.8290067855,"ymax":6754896.068305495,"spatialReference":{"wkid":102100,"latestWkid":3857}}}]');
    };
    /* jscs:enable */
    return mo;
  });