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

define(['dojo/_base/declare',
    'jimu/BaseWidget',
    'dojo/dom-construct',
    'jimu/dijit/GridLayout'
  ],
  function(declare, BaseWidget, domConstruct, GridLayout) {
    var clazz = declare([BaseWidget], {
      baseClass: 'jimu-widget-card',

      _hasContent: null,

      postCreate: function() {
        this.inherited(arguments);
        this._initLayout();
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
          container: this.domNode,
          editable: false
        });
      },

      resize: function() {
        this.layout.resize();
        var size1 = this.layout.getComponentSize(1);
        var size2 = this.layout.getSize();
        console.log('component 1 size: w=' + size1.w + ', h=' + size1.h);
        console.log('layout size:: w=' + size2.w + ', h=' + size2.h);
      }
    });
    return clazz;
  });