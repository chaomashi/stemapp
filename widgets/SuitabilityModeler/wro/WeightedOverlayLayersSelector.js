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
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/on",
  "dojo/Evented",
  "dojo/dom-class",
  "dojo/string",
  "dijit/registry",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dijit/_Container",
  "dijit/TooltipDialog",
  "dijit/popup",
  "esri/IdentityManager",
  "esri/request",
  "esri/layers/ArcGISImageServiceLayer",
  "./containerUtils",
  "dojo/text!./templates/WeightedOverlayLayerSelector.html",
  "dijit/form/HorizontalSlider",
  "dijit/form/CheckBox"],
function(declare, lang, array, on, Evented, domClass, string, registry,
  _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container, TooltipDialog,
  popup, esriId, esriRequest, ArcGISImageServiceLayer, containerUtils, template,
  HorizontalSlider) {

  // private helper methods
  var setUrl = function(map, url, options) {
    var layer = map.getLayer(options.id);
    if (layer){
      if (layer.url === url) {
        return layer;
      }
      map.removeLayer(layer);
    }
    var imageServiceLayer = new ArcGISImageServiceLayer(url, options);
    return map.addLayer(imageServiceLayer);
  };

  var getItemInfo = function(serviceUrl) {
    var url = serviceUrl + "/info/iteminfo";
    return esriRequest({
      url: url,
      content: { f: "json" },
      handleAs: "json",
      callbackParamName: "callback"
    });
  };

  // private child layer selector widget
  var lst = [_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin,Evented];
  var WeightedOverlayLayerSelector = declare(lst, {

    context: null,
    i18n: null,
    templateString: template,
    baseClass: "weighted-overlay-layer-selector",
    _parentWgt: null,

    // update controls to work w/ new layer
    _setRasterLayerAttr: function(newRasterLayer) {
      this.chkModelLayer.set("value", newRasterLayer.id.toString());
      this.chkModelLayer.set("title", newRasterLayer.title);
      this.txtLabel.innerHTML = newRasterLayer.title;
    },

    _setTooltipDialogAttr: function(newTooltipDialog) {
      var self = this;
      this.tooltipDialog = newTooltipDialog;
      this.own(on(newTooltipDialog,"MouseLeave", function() {
        popup.close(self.tooltipDialog);
      }));
    },

    // wire up:
    //   label to checkbox
    //   tooltip to button
    //   all events
    postCreate: function() {
      var self = this;
      var checkbox = this.chkModelLayer;
      var btnInfo = this.btnInfo;

      // get unique id for checkbox and label
      this.txtLabel.setAttribute("for", checkbox.id);

      // Preview
      if (this.showPreview && this.rasterLayer.url) {
        this.own(on(this.btnPreview, "click", function(/*e*/) {
          self.emit("PreviewClick", self.rasterLayer.url,self.btnPreview);
        }));
      } else {
        if (!this.btnPreview.style) {
          this.btnPreview.style = {};
        }
        this.btnPreview.style.display = 'none';
      }

      // Info
      //If metadata field has a url, use it
      if ((this.showInfo && this.rasterLayer.url) || (this.showInfo && this.rasterLayer.metadata)) {
        this.own(on(btnInfo, "click", function(/*e*/) {
          self.showInfoTooltip();
        }));
      } else {
        this.btnInfo.style.display = 'none';
      }

      this.own(on(checkbox, "change", function(/*e*/) {
        self._parentWgt._onContainerNodeChange({
          target: checkbox.focusNode
        });
      }));

    },

    showInfoTooltip: function () {
      var metadata = this.rasterLayer.metadata;
      if (metadata) {
        var b = (metadata.indexOf("https") >= 0) || (metadata.indexOf("http") >= 0);
        if (!b) {
          metadata = null;
        }
      }
      var self = this;
      if (metadata) {
        self._showInfoTooltip(self.rasterLayer.title, self.rasterLayer.metadata);
      } else {
        if (this.rasterLayer.url) {
          getItemInfo(this.rasterLayer.url).then(function (response) {
            self.rasterLayer.infoText = response.snippet || response.summary ||
              response.description;
            self._showInfoTooltip(self.rasterLayer.infoText, self.rasterLayer.url);
          });
        } else {
          this.context.showMessage(this.i18n.wro.caption,this.i18n.wro.validation.invalidLink);
          return;
        }
      }
    },

    _showInfoTooltip: function(content, url) {
      var credential;
      if (this.tooltipDialog) {
        popup.close(this.tooltipDialog);

        // adding url here as cannot access the REST URL within the getItemInfo in above function
        // check for token and append if any
        //url = this.rasterLayer.url;
        credential = esriId.findCredential(url);
        if (credential && credential.token) {
          url += (url.indexOf("?") > -1 ? "&" : "?") + "token=" + credential.token;
        }
        content += " <a href=" + url + " target='_blank'>" + this.i18n.wro.readMore + "</a>";

        this.tooltipDialog.set("content", content);
        popup.open({
          popup: this.tooltipDialog,
          around: this.btnInfo,
          orient: ["before-centered", "before"] //["after-centered","after"]
        });
      }
    },

    setSelected: function(selected) {
      this.chkModelLayer.set("checked", selected);
    }
  });

  // public container widget to manage multiple
  // layer selector widgets
  var LayersSelector = declare([_WidgetBase, _Container, Evented], {

    // properties
    context: null,
    i18n: null,
    showPreview: true,
    showInfo: true,

    // property setters
    _setWeightedOverlayServiceAttr: function(newWeightedOverlayService) {
      this.setWeightedOverlayService(newWeightedOverlayService);
    },

    _setModelAttr: function(newModel) {
      this.setModel(newModel);
    },

    // add a slider for preview layer transparency
    // add a tooltip dialog for overlay layer info
    buildRendering: function() {
      this.inherited(arguments);
      var previewSliderNode = document.createElement("div");
      previewSliderNode.className = "transparency-container";
      //var labelNode = document.createElement("label");
      //labelNode.innerHTML = "Transparency:";
      //previewSliderNode.appendChild(labelNode);
      var sliderTargetNode = this.domNode;
      if(this.parent && this.parent.selectLayersViewHeader) {
        sliderTargetNode = this.parent.selectLayersViewHeader;
      }
      sliderTargetNode.appendChild(previewSliderNode);
      this.previewSlider = new HorizontalSlider({
        "minimum": 0,
        "maximum":1,
        "value": 0.2,
        "intermediateChanges":true,
        "showButtons":false,
        "class": "modeler-transparency-slider slider-primary"
      });
      this.previewSlider.placeAt(previewSliderNode, "last");
      // create discrete container node for child widgets
      // (otherwise it will be the domNode)
      this.containerNode = document.createElement("div");
      this.containerNode.setAttribute("class", "modeler-scroll-panel");
      this.domNode.appendChild(this.containerNode);
      this.tooltipDialog = new TooltipDialog({
        style: "width: 300px;"
      });
    },

    // wire up events
    postCreate: function() {
      var self = this;
      this.own(on(this.previewSlider, "change", function (/*e*/){
        self.updatePreviewOpacity();
      }));
    },

    // add/remove layers from model on check toggle
    _onContainerNodeChange: function(e) {
      var target = e.target;
      var id, overlayLayer;
      // TODO: test for name instead?
      if (target.type === "checkbox") {
        id = this._getLayerIdFromCheckbox(target);
        if (target.checked) {
          overlayLayer = this.getOverlayLayer(id);
          try {
            this.addOverlayLayer(overlayLayer || {
              id: id,
              weight: 0
            });
          } catch(ex) {
            // show error and uncheck the checkbox
            var wgt = registry.byId(e.target.id);
            if (wgt) {
              wgt.set("checked", false);
            }
            this._showError(ex);
          }
        } else {
          this.removeOverlayLayer(id);
        }
        this.emit("selection-changed");
      }
    },

    // parse layer id from checkbox value
    _getLayerIdFromCheckbox: function(checkbox) {
      var id;
      try {
        id = parseInt(checkbox.value, 10);
      } catch(ex) {
        id = checkbox.value;
      }
      return id;
    },

    // show error message
    _showError: function(error) {
      this.context.showError(this.i18n.wro.caption,error);
    },

    // remove existing layer nodes
    // add new nodes for each raster in the service
    // select the ones that are in the model
    setWeightedOverlayService: function(newWeightedOverlayService) {
      this.weightedOverlayService = newWeightedOverlayService;
      this._initLayerSelectors(this.weightedOverlayService.rasterLayers);
    },

    _initLayerSelectors: function(rasterLayers) {
      var self = this;
      containerUtils.removeChildren(this);
      array.forEach(rasterLayers, function(rasterLayer) {
        // get overlay from model
        var overlayLayer = this.getOverlayLayer(rasterLayer.id);
        var widget = new WeightedOverlayLayerSelector({
          context: self.context,
          i18n: self.i18n,
          rasterLayer: rasterLayer,
          tooltipDialog: this.tooltipDialog,
          showPreview: this.showPreview,
          showInfo: this.showInfo,
          _parentWgt: self
        });
        widget.setSelected(overlayLayer ? true : false);
        widget.startup();
        // TODO: use event delegation and move to postCreate
        this.own(
          on(widget, "PreviewClick", function(url,btnPreview) {
            self._OnPreviewClick(url, btnPreview);
          })
          // ,
          // on(widget, "")
        );
        this.addChild(widget);
      }, this);
    },

    // clear previously selected layers
    // select layers in this model
    setModel: function(newModel) {
      this.model = newModel;
      var checkboxes = this.containerNode.querySelectorAll('input[name="wro-selected-layers"]');
      array.forEach(checkboxes, function(checkbox) {
        var id = this._getLayerIdFromCheckbox(checkbox);
        var checkboxWidget = registry.byId(checkbox.id);
        var isChecked = array.some(this.model.overlayLayers, function(overlayLayer) {
          return overlayLayer.id === id;
        });
        checkboxWidget.set("checked", isChecked);
      }, this);
    },

    _OnPreviewClick: function(url, btnPreview) {
      if (url) {
        if (this._selectedPreviewNode && this._previewLayer && (this._previewLayer.url === url)) {
          // same button being toggled
          this.hidePreviewLayer();
        } else {
          // some other button was clicked
          // update and show the preview layer
          this.hidePreviewLayer();
          this._setPreviewLayer(url);
          // deselct previously selected button (if any)
          if (this._selectedPreviewNode) {
            domClass.remove(this._selectedPreviewNode, "checked");
          }
          // select this button
          this._selectedPreviewNode = btnPreview;
          domClass.add(this._selectedPreviewNode, "checked");
        }
      }
    },

    // hide the preview layer and update selected button
    hidePreviewLayer: function() {
      if (this._previewLayer) {
        if (this._previewLayer._map) {
          try {
            this._previewLayer._map.removeLayer(this._previewLayer);
            this._previewLayer = null;
          } catch(err) {
            console.warn("Error removing wro preview layer");
            console.error(err);
          }
        } else {
          this._previewLayer.hide();
        }
      }
      if (this._selectedPreviewNode) {
        domClass.remove(this._selectedPreviewNode, "checked");
        this._selectedPreviewNode = null;
      }
    },

    // set preview layer url,
    // update opacity based on slide
    // and show the layer
    _setPreviewLayer: function(url) {
      var opts = lang.mixin({
        id: this.context.generateRandomId()
      }, this.previewLayerOptions);
      var map = this.map || this.context.getMap() ||
        this.weightedOverlayService.imageServiceLayer.getMap();
      if (!map) {
        return;
      }
      this._previewLayer = setUrl(map, url, opts);
      this.updatePreviewOpacity();
      this._previewLayer.show();
      //console.warn("_setPreviewLayer.map",map);
    },

    // set opacity of preview layer based on slider
    updatePreviewOpacity: function() {
      if (this._previewLayer) {
        this._previewLayer.setOpacity(1 - this.previewSlider.value);
      }
    },

    // show the preview layer
    showPreviewLayer: function() {
      if (this._previewLayer) {
        this._previewLayer.show();
      }
    },

    // verify that model is not at max number of layers
    // verify that layer exists in serivce and
    // get layer raster id/url from service
    // remove layer if aleardy in model
    // add updated layer to model
    addOverlayLayer: function(layer) {
      var maxLayers, rasterLayer;
      if (this.weightedOverlayService) {
        maxLayers = this.weightedOverlayService.rastersInFunction;
        if (this.model.overlayLayers.length < maxLayers || !maxLayers) {
          rasterLayer = this.weightedOverlayService.getRasterLayer(layer.id);
          if (rasterLayer) {
            layer.name = rasterLayer.name;
            layer.url = rasterLayer.url;
            layer.title = rasterLayer.title;
            if(!layer.remapRanges) {
              layer.remapRanges = rasterLayer.remapRanges;
            }
            this.removeOverlayLayer(layer.id);
            this.model.overlayLayers.push(layer);
          } else {
            throw string.substitute(this.i18n.wro.validation.notFound, [layer.id]);
          }
        } else {
          throw string.substitute(this.i18n.wro.validation.maxLayers, [maxLayers]);
        }
      } else {
        throw this.i18n.wro.validation.wroServiceNotDefined;
      }
    },

    // get an overlay layer from the model by id
    getOverlayLayer: function(id) {
      var overlayLayer;
      if (this.model && this.model.overlayLayers) {
        array.some(this.model.overlayLayers, function(layer) {
          if (layer.id === id) {
            overlayLayer = layer;
            return false;
          }
        });
      }
      return overlayLayer;
    },

    // remove an overlay layer (if exists) from the model by id
    removeOverlayLayer: function(id) {
      var overlayLayers = this.model.overlayLayers;
      var len = overlayLayers.length;
      for (var i = 0; i < len ; i++) {
        if (overlayLayers[i].id === id) {
          overlayLayers.splice(i, 1);
          break;
        }
      }
    }

  });

  return LayersSelector;
});
