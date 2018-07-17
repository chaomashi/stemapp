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
  'dojo/_base/lang',
  'dojo/_base/declare',
  'jimu/BaseWidgetSetting',
  'jimu/dijit/Filter'
],
  function (lang, declare, BaseWidgetSetting, Filter) {

    return declare([BaseWidgetSetting], {
      baseClass: 'jimu-widget-filter-demo-setting',
      singleSetting: null,
      layerChooserSelect: null,
      layerInfosObj: null,

      postCreate: function () {
        this.inherited(arguments);
        this.url = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/SampleWorldCities/MapServer/0";
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
        this.filter = new Filter({
          enableAskForValues: true
        });
        this.filter.placeAt(this.domNode);
        this.filter.build({
          url: this.url,
          layerDefinition: this.layerDefinition,
          expr: '1=1'
        });

        if(this.config){
          this.setConfig(this.config);
        }
      },

      startup: function () {
        this.inherited(arguments);
        this.filter.startup();
      },

      setConfig: function (config) {
        if (config) {
          setTimeout(lang.hitch(this, function () {
            this.filter.build({
              url: this.url,
              layerDefinition: this.layerDefinition,
              partsObj: config
            });
          }), 2000);
        }
      },

      getConfig: function () {
        var config = this.filter.toJson();
        return config;
      }

    });
  });