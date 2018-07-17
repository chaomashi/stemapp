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
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/on',
    'dojo/query',
    'dojo/dom-construct',
    'dijit/form/Select',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/focus',
    'jimu/utils',
    'jimu/BaseWidgetSetting',
    './symbologySettings',
  ],
  function(
    declare, array, lang, html, on, query, domConstruct, Select, _WidgetsInTemplateMixin,
    focusUtil, utils, BaseWidgetSetting, symbologySettings) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-ERG-setting',
      _SettingsInstance: null, //Object to hold Settings instance
      _currentSettings: null, //Object to hold the current settings

      postMixInProperties: function() {
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
      },

      postCreate: function() {
        this.inherited(arguments);
      },

      startup: function() {
        this.inherited(arguments);
        if (!this.config.erg) {
          this.config.erg = {};
        }
        this._createSettings();
      },

      setConfig: function(config) {
        this.config = config;
      },

      getConfig: function() {
        this._SettingsInstance.onSettingsChanged();
        for (var key in this._currentSettings) {
            this.config.erg.symbology[key] = this._currentSettings[key];
        }
        return this.config;
      },

      destroy: function(){
        this.inherited(arguments);
      },

      /**
      * Creates settings
      **/
      _createSettings: function () {
        //Create Settings Instance
        this._SettingsInstance = new symbologySettings({
          nls: this.nls,
          config: this.config,
          appConfig: this.appConfig
        }, domConstruct.create("div", {}, this.SettingsNode));

        //add a listener for a change in settings
        this.own(this._SettingsInstance.on("settingsChanged",
          lang.hitch(this, function (updatedSettings) {
            this._currentSettings = updatedSettings;
          })
        ));
        this._SettingsInstance.startup();
      }
    });
  });