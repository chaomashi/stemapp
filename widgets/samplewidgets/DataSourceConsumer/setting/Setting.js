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
  'dojo/_base/html',
  'dojo/_base/array',
  'dojo/on',
  'dojo/query',
  'jimu/BaseWidgetSetting'
],
function(declare, lang, html, array, on, query, BaseWidgetSetting) {

  return declare([BaseWidgetSetting], {
    baseClass: 'jimu-widget-dsc-setting',

    postCreate: function(){
      this.setConfig(this.config);
    },

    _createDataSourceNodes: function(){
      var dss = this.appConfig.dataSource.dataSources;
      array.forEach(Object.keys(dss), function(dsId){
        var node = html.create('div', {
          'class': 'ds ' + (dsId === this.config.dataSourceId? 'selected': ''),
          'data-ds-id': dsId,
          innerHTML: dss[dsId].label
        }, this.dataSourceListNode);

        this.own(on(node, 'click', lang.hitch(this, this._onDataSourceClick, dsId)));
      }, this);
    },

    _onDataSourceClick: function(dsId, evt){
      query('.ds', this.domNode).removeClass('selected');
      html.addClass(evt.target, 'selected');

      html.empty(this.fieldListNode);
      var ds = this.appConfig.dataSource.dataSources[dsId];
      var numberFieldTypes = [
        'esriFieldTypeSmallInteger',
        'esriFieldTypeInteger',
        'esriFieldTypeSingle',
        'esriFieldTypeDouble'
      ];

      array.filter(ds.dataSchema.fields, function(field){
        if(numberFieldTypes.indexOf(field.type) > -1){
          var node = html.create('div', {
            'class': 'field ' + (field.name === this.config.summaryField? 'selected': ''),
            'data-field-name': field.name,
            innerHTML: field.alias
          }, this.fieldListNode);

          this.own(on(node, 'click', lang.hitch(this, function(evt){
            query('.field', this.domNode).removeClass('selected');
            html.addClass(evt.target, 'selected');
          })));
        }
      }, this);
    },

    setConfig: function(){
      this._createDataSourceNodes();
    },

    getConfig: function(){
      if(query('.ds.selected').length === 0 || query('.field.selected').length === 0){
        alert('Please select.');
        return;
      }
      return {
        dataSourceId: html.attr(query('.ds.selected')[0], 'data-ds-id'),
        summaryField: html.attr(query('.field.selected')[0], 'data-field-name')
      };
    }
  });
});