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
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/_base/lang',
  'dojo/_base/array',
  'jimu/dijit/SimpleTable'
],
function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, lang, array, SimpleTable) {

  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-query-setting-relationships-selector',
    templateString: '<div><div data-dojo-attach-point="tableDiv"></div></div>',

    //options:
    nls: null,
    allRelationshipInfos: null,

    //methods:
    //setSelectedRelationshipInfos
    //getSelectedRelationships

    postCreate:function(){
      this.inherited(arguments);
      this._initTable();
    },

    //[{relationship,label}]
    setSelectedRelationshipInfos: function(_relationshipInfos){
      if(_relationshipInfos && _relationshipInfos.length >= 0){
        var relationshipInfos = lang.clone(_relationshipInfos);
        var relationships = array.map(relationshipInfos, function(item){
          return item.relationship;
        });
        var trs = this.table.getRows();
        var hash = {};//index:tr
        array.forEach(trs, lang.hitch(this, function(tr){
          var rowData = this.table.getRowData(tr);
          var index = relationships.indexOf(rowData.relationship);
          var checked = index >= 0;

          if(checked){
            var relationshipInfo = relationshipInfos[index];
            this.table.editRow(tr, {
              cbx: true,
              label: relationshipInfo.label
            });
            hash[index] = tr;
          }else{
            this.table.editRow(tr, {
              cbx: false
            });
          }
        }));
        for(var i = relationships.length - 1; i >= 0; i--){
          if(hash[i]){
            this.table.moveToTop(hash[i]);
          }
        }
      }
    },

    //[{relationship,label}]
    getSelectedRelationships: function(){
      var rowsData = this.table.getData();
      var selectedRowsData = array.filter(rowsData, lang.hitch(this, function(rowData){
        return rowData.cbx;
      }));
      var selectedItems = array.map(selectedRowsData, lang.hitch(this, function(rowData){
        return {
          relationship: rowData.relationship,
          label: rowData.label
        };
      }));
      return selectedItems;
    },

    _initTable: function(){
      var args = {
        autoHeight: false,
        style: "height:277px",
        fields: [{
          name: 'cbx',
          title: '',
          type: 'checkbox',
          width: '40px'
        }, {
          name: 'relationship',
          title: '',
          type: 'text',
          hidden: true
        }, {
          name: 'nls',
          title: this.nls.relationship,
          type: 'text'
        }, {
          name: 'label',
          title: this.nls.label,
          type: 'text',
          editable: true
        }, {
          name: 'actions',
          title: this.nls.actions,
          type: 'actions',
          actions: ['up', 'down'],
          width: '120px'
        }]
      };
      this.table = new SimpleTable(args);
      this.table.placeAt(this.tableDiv);

      var allData = array.map(this.allRelationshipInfos, lang.hitch(this, function(item){
        return {
          cbx: true,
          relationship: item.relationship,
          nls: item.nls,
          label: item.label
        };
      }));

      this.table.addRows(allData);
    }

  });
});