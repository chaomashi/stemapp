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
    'dojo/_base/Color',
    'dojo/on',
    'dojo/query',
    'dojo/Stateful',
    'dojo/_base/html',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./TransparencyEditor.html',
    'dijit/form/HorizontalSlider',
    "dijit/form/NumberSpinner"
  ],
  function(declare, lang, Color, on, query, dojoStateful, html,
           _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template,
           HorizontalSlider) {
    return declare([dojoStateful, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
      templateString: template,
      transparency: 1,

      postCreate: function() {
        this.slider = new HorizontalSlider({
          name: "slider",
          value: 0,
          minimum: 0,
          maximum: 100,
          discreteValues: 101,
          intermediateChanges: true,
          showButtons: false,
          style: "width:140px;display: inline-block;"
        }, this.sliderBar);
        this.slider.startup();
        this.inherited(arguments);
      },
      startup: function() {
        this.own(on(this.slider, 'change', lang.hitch(this, function(val) {
          if (false === this._isSameVal()) {
            this.spinner.setValue(val);
            this._set("transparency", val/100);
          }
        })));

        this.own(on(this.spinner, 'change', lang.hitch(this, function(val) {
          if (false === this._isSameVal()) {
            this.slider.setValue(val);
            this._set("transparency", val/100);
          }
        })));

        this._stylePolyfill();
        this.inherited(arguments);
      },
      _isSameVal: function() {
        return this.slider.getValue() === this.spinner.getValue();
      },
      getValues: function() {
        var a = null;
        a = this.spinner.getValue() / 100;
        return {
          transparency: a
        };
      },
      setValues: function(obj) {
        if (typeof obj === "object" || typeof obj === "string") {
          if (typeof obj.transparency === "undefined") {
            obj.transparency = 0;
          } else {
            obj.transparency = obj.transparency * 100;
          }
          this.slider.setValue(obj.transparency);
          this.spinner.setValue(obj.transparency);
        }
      },
      _stylePolyfill: function() {
        var leftBumper = query('.dijitSliderLeftBumper', this.domNode)[0];
        if (leftBumper && leftBumper.parentNode) {
          html.setStyle(leftBumper.parentNode, 'background-color', "#24b5cc");
        }
      }
    });
  });