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
  "dojo/dom-class",
  "dojo/dom-style",
  "dojo/string",
  "dojo/Evented",
  "dojo/fx",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dijit/_Container",
  "./containerUtils",
  "dojo/text!./templates/RemapRangeEditor.html",
  "dojo/text!./templates/WeightedOverlayLayerEditor.html",
  "dijit/form/HorizontalSlider",
  "dijit/form/NumberTextBox"],
function(declare, lang, array, on, domClass, domStyle, string, Evented, coreFx,
  _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container,
  containerUtils, remapRangeEditorTemplate, template, HorizontalSlider) {

  var getRangeMinMaxString = function(remapRange) {
    var rangeString;
    if (remapRange.inputMin === remapRange.inputMax) {
      rangeString = remapRange.inputMin + "";
    } else {
      rangeString = remapRange.inputMin + " - " + remapRange.inputMax;
    }
    return rangeString;
  };

  // private widget for editing an individual range
  var lst = [_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin,Evented];
  var RemapRangeEditor =  declare(lst, {

    // properties
    i18n: null,
    templateString: remapRangeEditorTemplate,
    baseClass: "reclass-range-editor",

    // custom setters
    _setRemapRangeAttr: function(remapRange) {
      var inputMinMax =  " (" + getRangeMinMaxString(remapRange) + ")";
      this.labelNode.innerHTML = remapRange.label.substr(0,14) +
      (remapRange.label.length > 15?'&hellip;':'') + inputMinMax;
      this.labelNode.title = remapRange.label + inputMinMax;
      this.outputValueNode.set("value", remapRange.outputValue);
    },

    // init number text box and slider and wire up events
    postCreate: function() {
      var self = this;
      this.inherited(arguments);
      this.outputValueNode.set("constraints", {round:0});
      this.sliderObject = new HorizontalSlider({
        "class": "slider-primary",
        "name": "slider",
        "value": this.outputValueNode.value,
        // TODO: get these defaults from properties and/or config
        "minimum": 0,
        "maximum": 9,
        "intermediateChanges": true,
        "discreteValues": 10,
        "showButtons": false
      }, this.slider);
      this.sliderObject.startup();
      this.own(on(this.sliderObject, "Change", function(value) {
        self.outputValueNode.set("value", value);
      }));
      this.own(on(this.outputValueNode, "Change", function(value) {
        if (!(self.outputValueNode && self.outputValueNode.isValid())) {
          return;
        }
        self.remapRange.outputValue = value;
        self.sliderObject.set("value", value);
      }));
    },

    // set the valid range for output values
    setOutputRange: function(min, max) {
      var numTextBox = this.outputValueNode;
      var rangeMessage = string.substitute(this.i18n.wro.validation.rangeMessage, [min, max]);
      numTextBox.set("constraints", {min: min, max: max});
      numTextBox.set("rangeMessage", rangeMessage);
      this.sliderObject.set({minimum: min, maximum: max});
    }
  });

  // private container widget for editing a set of ranges
  var _ts = '<div><table class="${baseClass}-table">';
  _ts += '<tbody data-dojo-attach-point="containerNode"></tbody>';
  _ts += '</table></div>';
  var RemapRangesEditor = declare([_WidgetBase, _TemplatedMixin, _Container, Evented], {

    // properties
    i18n: null,
    templateString: _ts,
    minOutputValue: 0,
    maxOutputValue: 0,
    baseClass: "remap-ranges-editor",

    // custom setters
    // refresh child editor nodes based on ranges
    _setRemapRangesAttr: function(newRemapRanges) {

      //console.log(newRemapRanges); // this is executed twice everytime one fires up a modeller
      var sorting = [];
      for (var Range in newRemapRanges) {
        sorting.push([newRemapRanges[Range], newRemapRanges[Range].inputMin]);
      }
      sorting.sort(function(a, b) {return a[1] - b[1];});
      newRemapRanges = [];
      for (var sortedRange in sorting) {
        newRemapRanges.push(sorting[sortedRange][0]);
      }

      var self = this;
      var editor;
      containerUtils.removeChildren(this);
      array.forEach(newRemapRanges, function(remapRange) {
        // set label to "min - max" if not alerady set
        // TODO: should this be set in model?
        if (!remapRange.label) {
          remapRange.label = remapRange.inputMin + " - " + remapRange.inputMax;
        }
        editor = new RemapRangeEditor({i18n: self.i18n, remapRange: remapRange});
        // TODO: pass as properties to constructor once refactored
        editor.setOutputRange(self.minOutputValue, self.maxOutputValue);
        self.addChild(editor);
      });
    },

    // get remap ranges from editor nodes
    getRemapRanges: function() {
      var remapRanges = [];
      array.forEach(this.getChildren(), function(editorWidget) {
        remapRanges.push(editorWidget.getRemapRange());
      });
      return remapRanges;
    }
  });

  var lst2 = [_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin,_Container,Evented];
  var LayerEditor = declare(lst2, {

    // properties
    i18n: null,
    templateString: template,
    baseClass: "weighted-overlay-layer-editor",

    // custom setters
    _setOverlayLayerAttr: function(newOverlayLayer) {
      var self = this;
      this.weightNode.set("value", newOverlayLayer.weight);
      this.labelNode.innerHTML = newOverlayLayer.title;
      this.remapRangesEditor = new RemapRangesEditor({
        // TODO: get min/max from colormap or config
        i18n: this.i18n,
        minOutputValue: 0,
        maxOutputValue: 9,
        remapRanges: newOverlayLayer.remapRanges
      }, self.remapRangesEditorContainer);

    },

    postCreate: function() {
      this.inherited(arguments);
      this.attachWeightingToggle();
      this.weightNode.rangeMessage = this.i18n.wro.validation.rangeMessage100;
    },

    // drop down to show remap ranges
    attachWeightingToggle: function() {
      domStyle.set(this.remapRangesEditorWrapper, "display", "none");
      var i = 0;
      this.own(on(this.layerNode, "click", lang.hitch(this, function () {
        if (i === 0) {
          domClass.add(this.domNode, "is-open");
          coreFx.wipeIn({
            node: this.remapRangesEditorWrapper
          }).play();
          i = 1;
        } else {
          domClass.remove(this.domNode, "is-open");
          coreFx.wipeOut ({
            node: this.remapRangesEditorWrapper
          }).play();
          i = 0;
        }
      })));
    },

    // are the layer parameters valid
    isValid: function() {
      // TODO: what about remap ranges being valid
      return this.weightNode.isValid();
    },

    // attach events

    _onWeightChange: function() {
      var value = parseInt(this.weightNode.valueNode.value, 10);
      value = (isNaN(value)) ? 0 : value;
      // TODO: make sure it's valid befor setting layer weight?
      this.overlayLayer.weight = value;
      this.emit("WeightChange", value);
    },

    _onFocus: function() {
      this.weightNode.focusNode.select();
    },

    _onBlur: function() {
      var value = parseInt(this.weightNode.valueNode.value, 10);
      if (isNaN(value)) {
        this.weightNode.value = 0;
        this.emit("WeightChange", value);
      }
    }

  });

  return LayerEditor;
});
