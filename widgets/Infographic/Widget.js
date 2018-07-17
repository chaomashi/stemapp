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
    'dojo/on',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/popup',
    'dijit/TooltipDialog',
    'jimu/BaseWidget',
    'jimu/dijit/GridLayout',
    'jimu/LayerInfos/LayerInfos',
    'jimu/utils',
    './DijitFactory',
    './dijits/SourceLauncher',
    './_ChartSetting'
  ],
  function(declare, lang, array, html, on, _WidgetsInTemplateMixin, dojoPopup, TooltipDialog, BaseWidget, GridLayout,
    LayerInfos, jimuUtils, DijitFactory, SourceLauncher, ChartSetting) {

    return declare([BaseWidget, _WidgetsInTemplateMixin], {
      name: 'Infographic',
      baseClass: 'jimu-widget-infographic',
      dijits: null,
      clientFeaturesHandle: null,
      layerInfosObj: null,

      postCreate: function() {
        this.inherited(arguments);
        this.dijits = [];
        this.layerInfosObj = LayerInfos.getInstanceSync();
        DijitFactory.setNls(this.nls);
        DijitFactory.setMap(this.map);
        DijitFactory.setInSettingPage(false);
        DijitFactory.setAppConfig(this.appConfig);
        DijitFactory.setContext({
          folderUrl: this.folderUrl
        });

        this.on('click', lang.hitch(this, function() {
          if (this.chartSettingDialog) {
            dojoPopup.close(this.chartSettingDialog);
          }
        }));

        this._features = [];
      },

      startup: function() {
        this.inherited(arguments);
        this._createUI();
        this._createChartSettingBtn();
      },

      _initSourceLauncher: function() {
        if (!this.config.dataSource) {
          return;
        }
        var dijit = this._getDataNeededDijit();
        if (!dijit) {
          return;
        }
        this.sourceLauncher = new SourceLauncher({
          map: this.map,
          appConfig: this.appConfig,
          useSelection: this.config.dataSource.useSelection,
          filterByExtent: this.config.dataSource.filterByExtent,
          dataSource: this.config.dataSource,
          dijit: dijit
        });
        this._listenSourceLauncherEvent();
      },

      onOpen: function() {
        if (!this.config.dataSource) {
          return;
        }
        if (!this.sourceLauncher) {
          this._initSourceLauncher();
          this.sourceLauncher.start();
        } else {
          this.sourceLauncher.awake();
        }
      },

      _listenSourceLauncherEvent: function() {
        this.own(on(this.sourceLauncher, 'data-update', lang.hitch(this, function(value) {
          this._onClientFeaturesUpdate(value);
        })));
        this.own(on(this.sourceLauncher, 'fetching', lang.hitch(this, function() {
          this._showLoading();
        })));
        this.own(on(this.sourceLauncher, 'success', lang.hitch(this, function() {
          this._hideLoading();
        })));
        this.own(on(this.sourceLauncher, 'faild', lang.hitch(this, function(error) {
          console.error(error.message || error);
          this._hideLoading();
        })));
      },

      _getDataNeededDijit: function() {
        if (!this.config || !this.config.dijits || !this.config.dijits.length) {
          return;
        }
        var dijit = null;
        var validTypes = ['number', 'gauge', 'chart'];
        dijit = this.config.dijits.filter(function(dijit) {
          return validTypes.indexOf(dijit.type) > -1;
        })[0]; //Now wo only support one data-needed dijit in a widget

        return dijit;
      },

      onClose: function() {
        if (this.sourceLauncher) {
          this.sourceLauncher.sleep();
        }
        if (this.chartSettingDialog && this.chartSettingDialog.isShow) {
          dojoPopup.close(this.chartSettingDialog);
          this.chartSettingDialog.isShow = false;
        }
      },

      destroy: function() {
        if (this.sourceLauncher) {
          this.sourceLauncher.destroy();
        }
        if (this.chartSettingDialog) {
          this.chartSettingDialog.destroy();
          this.chartSettingDialog = null;
        }
        this.inherited(arguments);
      },

      _showLoading: function() {
        html.removeClass(this.shelter, 'hide');
      },

      _hideLoading: function() {
        html.addClass(this.shelter, 'hide');
      },

      _createUI: function() {
        if (!this.config.layout) {
          return;
        }
        array.forEach(this.dijits, lang.hitch(this, function(dijit) {
          dijit.destroy();
        }));

        this.dijits = [];

        var components = array.map(this.config.dijits, function(d) {
          var dijit = DijitFactory.createDijit(d);
          dijit.setDataSource(this.config.dataSource);
          this.dijits.push(dijit);
          return {
            id: d.id,
            dijit: dijit
          };
        }, this);

        this.layout = new GridLayout({
          components: components,
          layoutDefinition: this.config.layout.definition,
          container: this.domNode,
          editable: false
        });

        this.layout.on('initialised', lang.hitch(this, function() {
          array.forEach(this.dijits, lang.hitch(this, function(dijit) {
            dijit.startup();
          }));
        }));
      },

      _createChartSettingBtn: function() {
        if (!this.config.dijits) {
          return;
        }

        if (!array.some(this.config.dijits, function(d) {
            return d.visible && d.type === 'chart';
          }, this)) {
          return;
        }

        this.chartSettingNode = html.create('div', {
          'class': 'chart-setting'
        }, this.domNode);

        this.own(on(this.chartSettingNode, 'click', lang.hitch(this, this._onChartSettingClick)));

        this.chartSettingDialog = new TooltipDialog({
          content: this._createChartSettingContent()
        });

        this.chartSettingDialog.isShow = false;
      },

      _onChartSettingClick: function(evt) {
        if (this.chartSettingDialog.isShow) {
          dojoPopup.close(this.chartSettingDialog);
          this.chartSettingDialog.isShow = false;
        } else {
          dojoPopup.open({
            popup: this.chartSettingDialog,
            around: this.chartSettingNode
          });
          this.chartSettingDialog.isShow = true;
        }
        evt.stopPropagation();
      },

      _createChartSettingContent: function() {
        var chartJson = array.filter(this.config.dijits, function(d) {
          return d.type === 'chart';
        })[0]; //we don't care more than one chart.
        if (!chartJson) {
          console.error('Unknow error');
          return '<div></div>';
        }

        if (!chartJson.config) {
          return '<div></div>';
        }

        var chartSetting = new ChartSetting({
          chartJson: chartJson,
          chartDijit: array.filter(this.dijits, function(d) {
            return d.jsonId === chartJson.id;
          })[0],
          nls: this.nls
        });
        return chartSetting.domNode;
      },

      onDataSourceDataUpdate: function(dsId, data) {
        if (!this.config.dataSource || dsId !== this.config.dataSource.frameWorkDsId) {
          return;
        }
        if (this.sourceLauncher) {
          this.sourceLauncher.setAppConfigDSFeatures(data.features);
        }
      },

      _onClientFeaturesUpdate: function(value) {
        if (!this._shouldUpdateData(value)) {
          return;
        }
        this._oldValue = value;
        this._onDataUpdate(value);
      },

      _shouldUpdateData: function(value) {
        var shouldUpdate = true;
        if (typeof value === 'number') {
          if (value === this._oldValue) {
            shouldUpdate = false;
          }
        } else {
          if (value && value.features && this._oldValue && this._oldValue.features) {
            var oldAttrs = array.map(this._oldValue.features, function(f) {
              return f.attributes;
            });
            var newAttrs = array.map(value.features, function(f) {
              return f.attributes;
            });
            if (jimuUtils.isEqual(oldAttrs, newAttrs)) {
              shouldUpdate = false;
            }
          }
        }
        return shouldUpdate;
      },

      _onDataUpdate: function(data) {
        this.dijits.forEach(lang.hitch(this, function(dijit) {
          dijit.onDataSourceDataUpdate(data);
        }));
      },

      resize: function() {
        this.inherited(arguments);
        if (this.layout) {
          this.layout.resize();
        }
      }
    });
  });