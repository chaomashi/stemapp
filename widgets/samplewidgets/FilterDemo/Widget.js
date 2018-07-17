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
  'dojo/_base/html',
  'jimu/BaseWidget',
  'jimu/dijit/Filter',
  'jimu/dijit/FilterParameters'
],
  function (declare, html, BaseWidget, Filter, FilterParameters) {

    return declare([BaseWidget], {
      name: 'FilterDemo',
      baseClass: 'jimu-widget-filter-demo',

      postCreate: function () {
        this.inherited(arguments);
        this.url = 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/SampleWorldCities/MapServer/0';
        this.layerDefinition = {
          "currentVersion": 10.41,
          "name": "Cities",
          "fields": [
            {
              "name": "OBJECTID",
              "type": "esriFieldTypeOID",
              "alias": "OBJECTID",
              "domain": null
            },
            {
              "name": "Shape",
              "type": "esriFieldTypeGeometry",
              "alias": "Shape",
              "domain": null
            },
            {
              "name": "CITY_NAME",
              "type": "esriFieldTypeString",
              "alias": "CITY_NAME",
              "length": 30,
              "domain": null
            },
            {
              "name": "POP",
              "type": "esriFieldTypeInteger",
              "alias": "POP",
              "domain": null
            },
            {
              "name": "POP_RANK",
              "type": "esriFieldTypeInteger",
              "alias": "POP_RANK",
              "domain": null
            },
            {
              "name": "POP_CLASS",
              "type": "esriFieldTypeString",
              "alias": "POP_CLASS",
              "length": 25,
              "domain": null
            },
            {
              "name": "LABEL_FLAG",
              "type": "esriFieldTypeInteger",
              "alias": "LABEL_FLAG",
              "domain": null
            }
          ]
        };
        this.filterParameters = new FilterParameters();
        this.filterParameters.placeAt(this.domNode);
        this.filterParameters.build(this.url, this.layerDefinition, this.config);

        this.filter = new Filter({
          enableAskForValues: false
        });
        this.filter.placeAt(this.domNode);
        this.filter.build({
          url: this.url,
          layerDefinition: this.layerDefinition,
          partsObj: this.config
        });
        html.addClass(this.filter.domNode, 'hidden');
      },

      startup: function () {
        this.inherited(arguments);
        this.filter.startup();
      },

      resize: function () {
        this.filter.autoUpdateMode();
      },

      _onBtnUpateFilterClicked: function () {
        html.addClass(this.filterParameters.domNode, 'hidden');
        html.removeClass(this.filter.domNode, 'hidden');
      }

    });
  });