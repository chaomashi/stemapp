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
  'dojo/on',
  'dojo/dom-construct',
  'dijit/_WidgetsInTemplateMixin',
  'jimu/BaseWidgetSetting',
  'jimu/dijit/GridLayout',
  'jimu/dijit/CheckBox'
],
function(declare, lang, on, domConstruct, _WidgetsInTemplateMixin, BaseWidgetSetting, GridLayout) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-card-setting',
    layout: null,

    postCreate: function() {
      this.inherited(arguments);

      this._initLayout();

      this.own(on(this.component1Checkbox, 'change', lang.hitch(this, function() {
        this.layout.setVisible(1, this.component1Checkbox.getValue());
      })));
      this.own(on(this.component2Checkbox, 'change', lang.hitch(this, function() {
        this.layout.setVisible(2, this.component2Checkbox.getValue());
      })));
      this.own(on(this.component3Checkbox, 'change', lang.hitch(this, function() {
        this.layout.setVisible(3, this.component3Checkbox.getValue());
      })));
    },

    destroy: function() {
      this.inherited(arguments);
      this.layout.destroy();
    },

    _initLayout: function() {
      var layoutDefinition = [{
        type: "column",
        isClosable: true,
        content: [
          {
            type: "stack",
            isClosable: true,
            reorderEnabled: true,
            content: [{
              type: "component",
              isClosable: true,
              componentName: "jimu grid",
              componentState: {
                id: 1
              }
            }]
          },
          {
            type: "stack",
            isClosable: true,
            reorderEnabled: true,
            content: [{
              type: "component",
              isClosable: true,
              componentName: "jimu grid",
              componentState: {
                id: 2
              }
            }]
          },
          {
            type: "stack",
            isClosable: true,
            reorderEnabled: true,
            content: [{
              type: "component",
              isClosable: true,
              componentName: "jimu grid",
              componentState: {
                id: 3
              }
            }]
          }
        ]
      }];
      var components = [{
        id: 1,
        content: domConstruct.create('div', {innerHTML: "component 1", "class": "grid-label"})
      }, {
        id: 2,
        content: domConstruct.create('div', {innerHTML: "component 2", "class": "grid-label"})
      }, {
        id: 3,
        content: domConstruct.create('div', {innerHTML: "component 3", "class": "grid-label"})
      }];
      this.layout = new GridLayout({
        components: components,
        layoutDefinition: layoutDefinition,
        container: this.containerNode,
        editable: true
      });
      this.own(on(this.layout, 'component-resize', lang.hitch(this, function(res) {
        console.log(res);
      })));
    }
  });
});