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
  'dojo/_base/array',
  'dojo/query',
  'jimu/BaseWidgetSetting',
  'jimu/utils',
  'esri/layers/FeatureLayer'
],
function(declare, html, array, query, BaseWidgetSetting, jimuUtils, FeatureLayer) {

  return declare([BaseWidgetSetting], {
    baseClass: 'jimu-widget-dsp-setting',

    cityService: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/SampleWorldCities/MapServer/0',

    postCreate: function(){
      //the config object is passed in
      this.setConfig(this.config);
      this.layer = new FeatureLayer(this.cityService);
    },

    setConfig: function(config){
      this._createFilterNodes(config.filters);
    },

    getConfig: function(){
      var filters = array.map(query('.filter input.f', this.domNode), function(input){
        return input.value;
      }, this);

      return {filters: filters};
    },

    getDataSources: function(){
      var filters = this.getConfig().filters;
      var layerDefinition = this.layer.toJson().layerDefinition;

      return array.map(filters, function(f){
        return {
          id: 'filter-' + f,
          type: 'Features',
          label: 'City name start with ' + f,
          dataSchema: jimuUtils.getDataSchemaFromLayerDefinition(layerDefinition)
        };
      }, this);
    },

    _createFilterNodes: function(filters){
      array.forEach(filters, function(f){
        this._createFilterNode(f);
      }, this);
    },

    _createFilterNode: function(filter){
      html.create('div', {
        'class': 'filter',
        innerHTML: '<span>City name start with:</span><input class="f" value="' + filter +
          '"><input type="button" data-dojo-attach-event="onclick:_onDeleteFilter">'
      }, this.filterListNode);
    },

    _onAddNewClick: function(){
      this._createFilterNode('');
    },

    _onDeleteFilter: function(evt){
      html.destroy(evt.target.parentNode);
    }
  });
});