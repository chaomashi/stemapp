/*
Copyright 2013 Esri
 Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
define([
  "dojo/_base/declare",
  "dojo/_base/array",
  "dojo/on",
  "dojo/Evented",
  "dojo/dom-class",
  "dojo/dom-attr",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dijit/_Container",
  "dijit/form/DropDownButton",
  "dijit/DropDownMenu",
  "dijit/MenuItem",
  "./containerUtils",
  "./WeightedOverlayLayerEditor",
  "./Colormap",
  "dojo/text!./templates/WeightedOverlayModelDesigner.html",
  "dijit/form/HorizontalSlider"],
function( declare, array, on, Evented, domClass, domAttr, _WidgetBase, _TemplatedMixin,
  _WidgetsInTemplateMixin, _Container, DropDownButton, DropDownMenu, MenuItem,
  containerUtils, WeightedOverlayLayerEditor, Colormap, template) {

  var lst = [_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin,_Container,Evented];
  var oThisClass =  declare(lst, {

    // properties
    i18n: null,
    templateString: template,
    baseClass: "weighted-overlay-model-designer",
    _isValid: false,

    // init widgets
    buildRendering: function() {
      this.inherited(arguments);
      this.colormap = new Colormap({
        context: this.context,
        i18n: this.i18n
      });
      this.ColormapSelector = new DropDownButton({}, this.colormapSelectorNode);

      this.ColormapSelector.containerNode.appendChild(this.colormap.domNode);
    },

    // init controls for model layer visibility
    postCreate: function() {
      var self = this;
      var horizontalSlider = this.sliderNode;
      on(horizontalSlider, "change", function (/*e*/){
        if (self.weightedOverlayService && self.weightedOverlayService.imageServiceLayer) {
          self.weightedOverlayService.imageServiceLayer.setOpacity(1 - horizontalSlider.value);
        }
      });
      var chkModelVisible = this.visibleModelNode;
      on(chkModelVisible, "change", function (/*e*/) {
        if (self.weightedOverlayService && self.weightedOverlayService.imageServiceLayer) {
          self.weightedOverlayService.imageServiceLayer.setVisibility(chkModelVisible.checked);
        }
        //set slider to enable only if chkModelVisible is checked on
        horizontalSlider.disabled = !chkModelVisible.checked;
      });
      //set initial visibilty transparency
      horizontalSlider.set("value", 0);
      chkModelVisible.checked = false;
    },

    // property setters
    _setModelAttr: function(newModel) {
      this.setModel(newModel);
    },

    _setWeightedOverlayServiceAttr: function(newWeightedOverlayService) {
      this.setWeightedOverlayService(newWeightedOverlayService);
    },

    // validate model on start up
    startup: function() {
      this.inherited(arguments);
      this.validate();
    },

    // set weighted overlay service
    // and set color map selector options
    setWeightedOverlayService: function(newWeightedOverlayService) {
      var self = this;
      this.weightedOverlayService = newWeightedOverlayService;
      var menu = new DropDownMenu({style: "display: none;"});
      array.forEach(this.weightedOverlayService.colormapDefinitions,function(colormapDefinition) {
        var menuItem = new MenuItem();
        new Colormap({
          context: self.context,
          i18n: self.i18n,
          definition: colormapDefinition
        }).placeAt(menuItem.containerNode);
        self.own(on(menuItem, "Click", function() {
          if (self.colormap && self.colormap.definition !== colormapDefinition) {
            self.colormap.set("definition", colormapDefinition);
          }
          self.model.colormapDefinition = colormapDefinition;
          self.runModel();
        }));
        menuItem.containerNode.title = colormapDefinition.label;
        menu.addChild(menuItem);
      });
      this.ColormapSelector.set("dropDown", menu);

      this.own(on(menu, "open", function(){
        var selectPopup = this.domNode.parentElement;
        if(selectPopup) {
          domClass.add(selectPopup, self.baseClass + "-popup");
        }
      }));

      if (this.weightedOverlayService.imageServiceLayer) {
        this._toggleModelLayer(this.weightedOverlayService.imageServiceLayer.visible);
      }
    },

    // load a new, empty model
    // hide the model layer
    // disable the model visibility checkbox
    // clear the model from the service
    // emit an event
    clearModel: function() {
      this.setModel(this.weightedOverlayService.createNewModel());
      this.emit("model-clear", this.model);
    },

    // replace existing layer editors with
    // new ones for the each layer
    // update colormap definition
    setModel: function(newModel) {
      var self = this;
      this.model = newModel;
      containerUtils.removeChildren(this);
      if (this.model.overlayLayers && this.model.overlayLayers.length &&
          this.model.overlayLayers.length > 0) {
        array.forEach(this.model.overlayLayers, function(layer) {
          var layerEditor = new WeightedOverlayLayerEditor({
            context: self.context,
            i18n: self.i18n,
            overlayLayer: layer
          });
          self.own(on(layerEditor, "WeightChange", function() {
            self.validate();
          }));
          layerEditor.startup();
          self.addChild(layerEditor);
        });
      } else {
        // no layers
        this.hideModelLayer();
        domAttr.set(this.visibleModelNode, 'disabled', 'disabled');
        if (this.weightedOverlayService) {
          this.weightedOverlayService.clearModel();
        }
      }
      this.validate();
      if (this.model.colormapDefinition) {
        this.colormap.set("definition", this.model.colormapDefinition);
      }
    },

    // sum up raster weights and show total
    // if total is not 100% set state to invalid
    // don't let user run model
    validate: function() {
      var totalWeight = 0;
      if (this.model && this.model.overlayLayers) {
        array.forEach(this.model.overlayLayers, function(layer) {
          totalWeight += layer.weight;
        });
      }
      this.weightTotalNode.innerHTML = totalWeight;
      var targetContainer = this.weightTotalWrapper.parentNode;
      if (totalWeight === 100) {
        this._isValid = true;
        domClass.remove(targetContainer, "alert-danger");
        domClass.add(targetContainer, "alert-success");
      } else {
        this._isValid = false;
        domClass.remove(targetContainer, "alert-success");
        domClass.add(targetContainer, "alert-danger");
      }
      this.emit("model-validated", this._isValid);
    },

    // validate the form
    // run the model
    // enable the model visibility checkbox
    // show the model layer
    // emit an event
    runModel: function(options) {
      // validate the model
      this.validate();
      if (this._isValid) {
        // TODO: IMPORTANT! wrap in try catch, show model validation errors if any
        this.weightedOverlayService.runModel(this.model);

        domAttr.remove(this.visibleModelNode, 'disabled');
        this.showModelLayer();
        this.emit("model-run", {
          options: options,
          model: this.model
        });
      }
    },

    // check visible checkbox and show layer
    showModelLayer: function() {
      this._toggleModelLayer(true);
    },

    // uncheck visible checkbox and hide layer
    hideModelLayer: function() {
      this._toggleModelLayer(false);
    },

    // un/check visible checkbox and hide/show layer
    _toggleModelLayer: function(isVisible) {
      var isChecked = !!this.visibleModelNode.checked;
      if (isChecked !== isVisible) {
        this.visibleModelNode.click();
      }
    }

  });

  return oThisClass;
});
