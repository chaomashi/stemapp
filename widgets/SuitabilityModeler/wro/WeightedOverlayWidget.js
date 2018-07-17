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
  'dojo/text!./templates/WeightedOverlayWidget.html',
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/dom-class',
  'dojo/dom-attr',
  'dojo/Deferred',
  'dojo/aspect',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  "./config",
  './WeightedOverlayService',
  './WeightedOverlayLayersSelector',
  './WeightedOverlayModelDesigner'],
function( template, declare, array, domClass, domAttr, Deferred, aspect,
  _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
  config, WeightedOverlayService, WeightedOverlayLayersSelector,
  WeightedOverlayModelDesigner) {

  // private helper methods
  var setButtonDisabledAttr = function(btn, isDisabled) {
    if(btn) {
      if(isDisabled) {
        btn.setAttribute('disabled', 'disabled');
        domClass.add(btn, 'jimu-state-disabled');
      } else {
        btn.removeAttribute('disabled');
        domClass.remove(btn, 'jimu-state-disabled');
      }
    }
  };

  var oThisClass = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    // description:
    //    A widget for performing weighted overlay using image service raster functions

    chart: null,
    context: null,
    i18n: null,
    templateString: template,
    baseClass: 'weighted-overlay-widget',
    widgetsInTemplate: true,
    isRTL: false,

    _tabsContainer: null,
    _layersTab: null,
    _modelTab: null,
    _chartTab: null,

    postCreate: function() {
      this.inherited(arguments);
      var self = this,
          options = config.getOptions(this.i18n);

      this.isRTL = document.dir === "ltr" ? false : true;
      this.weightedOverlayService = new WeightedOverlayService(null,options);
      this.weightedOverlayService.context = this.context;
      this.weightedOverlayService.i18n = this.i18n;
      this.selectLayersView = new WeightedOverlayLayersSelector({
        context: this.context,
        i18n: this.i18n,
        parent: this
      }, this.selectLayersView);
      this.designModelView = new WeightedOverlayModelDesigner({
        context: this.context,
        i18n: this.i18n,
        parent: this
      }, this.designModelView);
      this.own(
        this.selectLayersView.on('selection-changed', function() {
          self._updateDesignModelButton(self.weightedOverlayModel);
        }),
        this.designModelView.on('model-validated', function(isValid) {
          if(isValid) {
            setButtonDisabledAttr(self.runModelButton, false);
            setButtonDisabledAttr(self.saveAsButton, false);
          } else {
            setButtonDisabledAttr(self.runModelButton, true);
            setButtonDisabledAttr(self.saveAsButton, true);
          }
        })
      );

      if (!this.context.allowSaveAs) {
        this.saveAsButton.style.display = "none";
      }
      this.setupConnections();
    },

    initializeTabs: function(TabContainer3) {
      var self = this;
      var layersTab = this._layersTab = {
        title: this.i18n.tabs.layers,
        content: this.selectLayersViewNode
      };
      var modelTab = this._modelTab = {
        title: this.i18n.tabs.model,
        content: this.designModelViewNode
      };
      var chartTab = this._chartTab = {
        title: this.i18n.tabs.chart,
        content: this.chartViewNode
      };
      this._tabsContainer = new TabContainer3({
        tabs: [layersTab,modelTab,chartTab]
      },this.tabsNode);
      this._tabsContainer.startup();
      this.own(aspect.after(this._tabsContainer,"selectTab",function(title){
        if (title === layersTab.title) {
          self._activeTab = "layers";
          self.showSelectOverlayLayersView();
        } else if (title === modelTab.title) {
          self._activeTab = "model";
          self.showDesignModelView();
        } else if (title === chartTab.title) {
          self._activeTab = "chart";
          self.showChartView();
        }
      },true));
    },

    onClose: function() {
      if (this.selectLayersView) {
        this.selectLayersView.hidePreviewLayer();
      }
      if (this.chart) {
        this.chart.deactivate();
      }
    },

    onOpen: function() {
      if (this.chart && this._activeTab === "chart") {
        this.chart.activate();
      }
    },

    // change which image service this is pointing to
    // get the available raster layers for the image service
    _setImageServiceLayerAttr: function(newImageServiceLayer) {
      var self = this;
      this.imageServiceLayer = newImageServiceLayer;
      this.weightedOverlayService.imageServiceLayer = this.imageServiceLayer;
      this._initModel();
      if (this.imageServiceLayer && this.imageServiceLayer.url) {
        // TODO: check to make sure this is a diff image service
        // before updating the raster layers???
        this.weightedOverlayService.initRasterLayers().then(function(/*rasterLayers*/) {
          self._rasterLayersInitialized();
        });
      }
    },

    // set default title/labels for layer/remap ranges
    // update sub widget refs to service and model
    // show either select layers or design view
    _rasterLayersInitialized: function() {
      array.forEach(this.weightedOverlayModel.overlayLayers, function(overlayLayer) {
        var rasterLayer = this.weightedOverlayService.getRasterLayer(overlayLayer.id);
        this.weightedOverlayService.setOverlayLayerDefaults(overlayLayer, rasterLayer);
      }, this);
      this.selectLayersView.set('model', this.weightedOverlayModel);
      this.selectLayersView.set('weightedOverlayService', this.weightedOverlayService);
      this.selectLayersView.startup();
      this.designModelView.set('weightedOverlayService', this.weightedOverlayService);
      this.designModelView.set('model', this.weightedOverlayModel);
      this.designModelView.startup();
      if (this.weightedOverlayModel.overlayLayers &&
          this.weightedOverlayModel.overlayLayers.length > 0) {
        this._onShowModelClicked();
      } else {
        this._onShowLayersClicked();
      }
    },

    // try to parse the model from the image rendering rule
    // otherwise create a new model
    _initModel: function() {
      var model;
      if (this.imageServiceLayer && this.imageServiceLayer.renderingRule) {
        model = this.weightedOverlayService.imageServiceLayerToModel({
          renderingRule: this.imageServiceLayer.renderingRule.toJson()
        });
      } else {
        model = this.weightedOverlayService.createNewModel();
      }
      this.weightedOverlayModel = model;
    },

    setupConnections: function() {
      var self = this;
      // summary:
      //    wire events, and such
      //
      // when a model is cleared
      //   update selected layers
      //   notify the rest of the app
      this.own(this.designModelView.on('model-clear', function(model) {
        self.set('weightedOverlayModel', model);
        self.selectLayersView.set('model', model);
      }));
      // when a model is validated dis/enable run button
      this.own(this.designModelView.on('model-validated', function(isValid) {
        if (isValid) {
          domAttr.remove(self.runModelButton, 'disabled');
          domAttr.remove(self.saveAsButton, 'disabled');
        } else {
          domAttr.set(self.runModelButton, 'disabled', 'disabled');
          domAttr.set(self.saveAsButton, 'disabled', 'disabled');
        }
      }));
    },

    //toggle visibility of the transparency slider
    showHideTransparencySlider: function () {
      if (this.selectLayersView && this.selectLayersView.previewSlider) {
        var iconNode = this.transparentSliderToggle.getElementsByTagName('SPAN')[0];
        if (!iconNode) {
          return;
        }
        if (this.isTransparencySliderShow) {
          domClass.remove(this.selectLayersViewNode, 'transparency-slider-show');
          domClass.replace(iconNode, 'esri-icon-down', 'esri-icon-up');
        }
        else {
          domClass.add(this.selectLayersViewNode, 'transparency-slider-show');
          domClass.replace(iconNode, 'esri-icon-up', 'esri-icon-down');
        }
        this.isTransparencySliderShow = !this.isTransparencySliderShow;
      }
    },

    // hide model design view and
    // show select layers view
    showSelectOverlayLayersView: function (e) {
      if (e) {
        e.preventDefault();
      }
      if (this.chart) {
        this.chart.deactivate();
      }
      var animateDirection = this.isRTL ? "right" : "left";
      // TODO: replace w/ this.selectLayersView.refresh()
      this.selectLayersView.set('model', this.weightedOverlayModel);
      // domUtils.hide(this.designModelViewNode);
      // domUtils.show(this.selectLayersViewNode);
      this.designModelViewNode.style[animateDirection] = '100%';
      this.selectLayersViewNode.style[animateDirection] = '0%';
      this._updateDesignModelButton(this.weightedOverlayModel);
    },

    // hide model design view and
    // show select layers view
    showDesignModelView: function() {
      // update design view's model
      // TODO: replace w/ this.designModelView.refresh()
      var animateDirection = this.isRTL ? "right" : "left";
      this.selectLayersView.hidePreviewLayer();
      if (this.chart) {
        this.chart.deactivate();
      }
      this.designModelView.set('model', this.weightedOverlayModel);
      // domUtils.hide(this.selectLayersViewNode);
      // domUtils.show(this.designModelViewNode);
      this.designModelViewNode.style[animateDirection] = '0%';
      this.selectLayersViewNode.style[animateDirection] = '-100%';
    },

    showChartView: function() {
      this.selectLayersView.hidePreviewLayer();
      if (this.chart) {
        this.chart.activate();
      }
    },

    showSavePanel: function() {
      var savePanel = this.savePanelNode;
      savePanel.style.display = "block";
      domClass.add(savePanel, 'show-panel-animated');
      setTimeout(function() {
        domClass.remove(savePanel, 'show-panel-animated');
      }, 400);
    },

    hideSavePanel: function() {
      var savePanel = this.savePanelNode,
          deferred = new Deferred();
      setTimeout(function() {
        savePanel.style.display = "none";
        domClass.remove(savePanel, 'hide-panel-animated');
        deferred.resolve(true);
      }, 400);
      domClass.add(savePanel, 'hide-panel-animated');
      return deferred;
    },

    _onClearClick: function (evt) {
      this.clear();
      this._onShowLayersClicked(evt);
    },

    _onRunClick: function () {
      if (this.imageServiceLayer && this.imageServiceLayer.xtnModeler) {
        this.imageServiceLayer.xtnModeler.forSaveAs = false;
      }
      if (this.designModelView) {
        this.designModelView.runModel();
      }
    },

    _onSaveAsClick: function () {
      if (this.imageServiceLayer && this.imageServiceLayer.xtnModeler) {
        this.imageServiceLayer.xtnModeler.forSaveAs = true;
      }
      if (this.designModelView) {
        this.designModelView.runModel({saveAs:true});
      }
    },

    _onShowLayersClicked: function() {
      if (this._tabsContainer && this._layersTab) {
        this._tabsContainer.selectTab(this._layersTab.title);
      } else {
        this.showSelectOverlayLayersView();
      }
    },

    _onShowModelClicked: function() {
      if (this._tabsContainer && this._modelTab) {
        this._tabsContainer.selectTab(this._modelTab.title);
      } else {
        this.showDesignModelView();
      }
    },

    clear: function() {
      if (this.designModelView && this.designModelView.weightedOverlayService) {
        this._resetRemapRangeValues();
        this.designModelView.clearModel();
      }
    },

    // *** Urban - reset the remap range values (for Clear Model)
    _resetRemapRangeValues: function() {
      if (!this.weightedOverlayService) {
        return;
      }
      array.forEach(this.weightedOverlayService.rasterLayers,function(rasterLayer) {
        array.forEach(rasterLayer.remapRanges,function(rmRange) {
          var t, v;
          try {
            v = rmRange.originalOutputValue;
            t = typeof(v);
            if ((t !== 'undefined') && (v !== null) && (t === 'number')) {
              if (!isNaN(v) && isFinite(v)) {
                rmRange.outputValue = v;
              }
            }
          } catch(ex) {}
        });
      },this);
    },

    _updateDesignModelButton: function(model) {
      if(model && model.overlayLayers && model.overlayLayers.length) {
        setButtonDisabledAttr(this.designModelButton, false);
      } else {
        setButtonDisabledAttr(this.designModelButton, true);
      }
    }

  });

  return oThisClass;
});
