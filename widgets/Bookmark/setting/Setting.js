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
  'jimu/BaseWidgetSetting',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/_base/lang',
  'dojo/on',
  '../utils',
  './Layout',
  './Sync',
  //'libs/storejs/store',
  'jimu/dijit/CheckBox'
],
  function (declare, BaseWidgetSetting, _WidgetsInTemplateMixin, lang, on,utils,
    Layout, Sync,/* store,*/ CheckBox) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-bookmark-setting',

      startup: function () {
        this.inherited(arguments);
        //utils.cleanNoticePopupRecord();//show NoticePopupRecord again
        //1 _initLayout();
        this.layout = new Layout({
          nls: this.nls,
          config: this.config
        }, this.layoutContainer);
        this.layout.startup();

        //2 _initEditableCheckBox();
        if ("undefined" === typeof this.config.editable) {
          this.config.editable = false;
        }
        this.isEditableCheckBox = new CheckBox({
          label: this.nls.editable
        }, this.isEditableNode);
        this.isEditableCheckBox.startup();
        this.own(on(this.isEditableCheckBox, 'change', lang.hitch(this, '_onEditableChange')));

        this.isSaveLayersCheckBox = new CheckBox({
          label: this.nls.savelayers,
          checked: false
        }, this.isSaveLayers);
        this.isSaveLayersCheckBox.startup();

        //3 _initSyncMode();
        this.sync = new Sync({
          nls: this.nls,
          folderUrl: this.folderUrl,
          appConfig: this.appConfig,
          map: this.map,
          config: this.config
        }, this.syncContainer);
        this.sync.startup();

        //this.setSortableDisable();
        //TODO ======================= for test only ===============================
        //this.config = utils._testUpdateOldConfig();
        //TODO ======================= for test only ===============================
        this.setConfig(this.config);
      },

      _onEditableChange: function (editable) {
        if (editable) {
          this.isSaveLayersCheckBox.setStatus(true);//enable
        } else {
          this.isSaveLayersCheckBox.setValue(false);
          this.isSaveLayersCheckBox.setStatus(false);//disable
        }
      },

      setConfig: function (config) {
        this.config = config;

        this.updateConfigs();

        this.layout.setConfig(this.config);
        this.isEditableCheckBox.setValue(config.editable);
        this.isSaveLayersCheckBox.setValue(config.isSaveLayerVisibility);

        this._onEditableChange(config.editable);

        this.sync.setConfig(this.config);
      },
      getConfig: function () {
        var syncObj = this.sync.getConfig();
        this.config.syncMode = syncObj.syncMode;

        this.config.layout = this.layout.getConfig();

        this.config.editable = this.isEditableCheckBox.checked;
        this.config.isSaveLayerVisibility = this.isSaveLayersCheckBox.checked;

        var bookmarks = syncObj.bookmarks;
        this.config.bookmarks2D = utils.stringifyBookmarks(bookmarks);//stringify

        this.completeUpdateConfig();

        return this.config;
      },
      destroy: function () {
        if (this.layout && this.layout.destroy) {
          this.layout.destroy();
        }
        if (this.sync && this.layout.destroy) {
          this.sync.destroy();
        }
        this.inherited(arguments);
      },

      updateConfigs: function () {
        //check wheather update config
        if (utils.isConfigBefore5_3(this.config)) {
          utils.setDefaultConfigForUpdate(this.config);//set default config
        }

        utils.updateBookmarks(this.config.bookmarks2D);//update old configs
      },
      completeUpdateConfig: function () {
        utils.completeUpdateConfig(this.config);//had complete updated
      }

      /*,
      //clean the localStore, just for the Editor(maybe for preview)
      cleanStoreForEditor: function (isOk) {
        if (isOk) {
          //clear local store
          var key = this._getKeysKey();
          for (var p in store.getAll()) {
            if (p.startWith(key)) {
              store.remove(p);
            }
          }
        }
      },
      _getKeysKey: function () {
        // summary:
        // we use className plus 2D/3D as the local store key
        if (this.appConfig.map['3D']) {
          return this.name + '.3D';
        } else {
          return this.name + '.2D';
        }
      }*/
    });
  });