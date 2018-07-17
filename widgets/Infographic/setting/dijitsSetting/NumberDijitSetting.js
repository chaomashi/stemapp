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
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./NumberDijitSetting.html',
    './BaseDijitSetting',
    'dijit/_TemplatedMixin',
    './_dijits/NumberIndicator/MultipleIndicators',
    './_dijits/SingleNumberStatistics',
    "./_dijits/BackgroundSetting",
    "./_dijits/FontSetting",
    "./_dijits/DataFormatSetting",
    'dojo/_base/lang',
    'dojo/on',
    'jimu/dijit/TabContainer3',
    'jimu/dijit/Message',
    'dijit/TitlePane'
  ],
  function(declare, _WidgetsInTemplateMixin, template, BaseDijitSetting, _TemplatedMixin,
    MultipleIndicators, SingleNumberStatistics, BackgroundSetting, FontSetting, DataFormatSetting,
    lang, on, TabContainer3, Message) {
    var clazz = declare([BaseDijitSetting, _WidgetsInTemplateMixin, _TemplatedMixin], {
      templateString: template,
      baseClass: 'infographic-number-dijit-setting',
      type: 'number',
      //config:
      //  indicators:[],
      //  statistic:{},
      //  background:{},
      //  font:{},
      //  dataFormat:{},
      postMixInProperties: function() {
        lang.mixin(this.nls, window.jimuNls.common);
      },
      postCreate: function() {
        this.inherited(arguments);
        this._initUI();
        this.setConfig(this.config);
        this._hasLoaded = true;
      },
      isValid: function(check) {
        var indicators = this.indicators.getConfig(check);
        if (!indicators && check) {
          this.tab.selectTab(this.nls.indicators);
          new Message({
            message: this.nls.setCorrectyIndicatorTip
          });
          return false;
        }
        return this.backgroundSetting.isValid() && this.fontSetting.isValid() &&
          this.dataFormatSetting.isValid() && this.singleNumberStatistics.isValid();
      },
      getConfig: function(check) {
        if (!this.config) {
          this.config = {};
        }

        if (this.isValid(check)) {
          this.config.indicators = this.indicators.getConfig();
          //display
          if (this.backgroundSetting) {
            this.config.background = this.backgroundSetting.getConfig();
          }
          if (this.fontSetting) {
            this.config.font = this.fontSetting.getConfig();
          }
          if (this.dataFormatSetting) {
            this.config.dataFormat = this.dataFormatSetting.getConfig();
          }
          if (this.singleNumberStatistics) {
            this.config.statistic = this.singleNumberStatistics.getConfig();
          }

          return this.config;
        } else {
          return false; //error
        }
      },
      setConfig: function(config) {
        this.config = config;
        if (!this.config) {
          return;
        }
        this.indicators.setConfig(this.config);

        this.singleNumberStatistics.setConfig(this.config.statistic);
      },
      //Whenever you need to update dijit UI, please call this function.
      updateDijit: function() {
        this.dijit.setConfig(this.config);
      },
      _initUI: function() {
        this._initTabs();
        this._initIndicators();
        this._initSingNumberStatistics();
        this._initDisplay();
      },
      _initTabs: function() {
        //init tab3
        var tabData = {
          title: this.nls.data,
          content: this.numberStatistics
        };

        var tabDisplay = {
          title: this.nls.display,
          content: this.display
        };

        var tabIndicator = {
          title: this.nls.indicators,
          content: this.indicatorsDiv
        };

        var tabs = [tabData, tabDisplay, tabIndicator];

        this.tab = new TabContainer3({
          average: true,
          tabs: tabs
        }, this.tabNode);
      },
      _initDisplay: function() {
        //2. background
        this.backgroundSetting = new BackgroundSetting({
          config: this.config.background,
          nls: this.nls
        });
        this.backgroundSetting.placeAt(this.backgroundSettingNode);
        this.backgroundSetting.startup();
        this.own(on(this.backgroundSetting, 'change', lang.hitch(this, function( /*config*/ ) {
          this._onSettingsChange();
        })));
        //3. font
        this.fontSetting = new FontSetting({
          config: this.config.font,
          nls: this.nls
        });
        this.fontSetting.placeAt(this.fontSettingNode);
        this.fontSetting.startup();
        this.own(on(this.fontSetting, 'change', lang.hitch(this, function( /*config*/ ) {
          this._onSettingsChange();
        })));
        //4. dataFormatSettingNode
        this.dataFormatSetting = new DataFormatSetting({
          config: this.config.dataFormat,
          nls: this.nls
        });
        this.dataFormatSetting.placeAt(this.dataFormatSettingNode);
        this.dataFormatSetting.startup();
        this.own(on(this.dataFormatSetting, 'change', lang.hitch(this, function( /*config*/ ) {
          this._onSettingsChange();
        })));
      },
      _initSingNumberStatistics: function() {
        this.singleNumberStatistics = new SingleNumberStatistics({
          config: this.config.statistic,
          dataSource: this.dataSource,
          nls: this.nls
        });
        this.singleNumberStatistics.placeAt(this.numberStatistics);
        this.singleNumberStatistics.startup();
        this.own(on(this.singleNumberStatistics, 'change', lang.hitch(this, function(sn_config) {
          var dataFormatSetting = this.dataFormatSetting.getConfig();
          var decimalPlaces = dataFormatSetting.decimalPlaces;

          if (sn_config && sn_config.type === 'Features') {
            if (typeof decimalPlaces !== 'number' || decimalPlaces === 2) {
              dataFormatSetting.decimalPlaces = 0;
              this.dataFormatSetting.setConfig(dataFormatSetting);
            }
          } else if (sn_config && sn_config.type === 'FeatureStatistics') {
            if (typeof decimalPlaces !== 'number' || decimalPlaces === 0) {
              dataFormatSetting.decimalPlaces = 2;
              this.dataFormatSetting.setConfig(dataFormatSetting);
            }
          }
          this._onSettingsChange();
        })));
      },
      _initIndicators: function() {
        this.indicators = new MultipleIndicators({
          nls: this.nls,
          type: 'number',
          folderUrl: this.folderUrl
        });
        this.indicators.placeAt(this.indicatorsDiv);
        this.indicators.startup();
        this.own(on(this.indicators, 'change', lang.hitch(this, function( /*config*/ ) {
          this._onSettingsChange();
        })));
      },
      _onSettingsChange: function() {
        if (this._hasLoaded) {
          this.getConfig();
          this.updateDijit();
        }
      },
      setDataSource: function(dataSource) {
        this.inherited(arguments);
        if (this.singleNumberStatistics) {
          this.singleNumberStatistics.setDataSource(dataSource);
        }
      },
      destroy: function() {
        if (this.indicators) {
          this.indicators.destroy();
          this.indicators = null;
        }
        if (this.singleNumberStatistics) {
          this.singleNumberStatistics.destroy();
          this.singleNumberStatistics = null;
        }
        this.inherited(arguments);
      }
    });
    return clazz;
  });