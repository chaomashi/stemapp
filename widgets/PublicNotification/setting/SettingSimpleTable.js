/*
 | Copyright © 2014 - 2018 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
//====================================================================================================================//
define([
  'dojo/_base/declare',
  'dojo/_base/html',
  'jimu/dijit/SimpleTable'
], function (
  declare,
  html,
  SimpleTable
) {
  return declare(SimpleTable, {
    _onRowMoved: null,

    //================================================================================================================//

    /**
     * Constructor for class.
     * @param {string} definition Table description
     * @memberOf SettingSimpleTable#
     * @constructor
     */
    constructor: function (definition) {
      /*jshint unused : false*/
    },

    /**
     * Deletes the specified row from the table.
     * @param {object} tr Table row to delete
     * @memberOf SettingSimpleTable#
     */
    deleteRow: function (tr) {
      var rowData, formerRowIndex;
      if (tr) {
        rowData = this.getRowData(tr);
        formerRowIndex = tr.rowIndex;
        html.destroy(tr);
        this.updateUI();
        this._onDeleteRow(tr, rowData, formerRowIndex);
      }
    },

    /**
     * Emits the row-delete event with information about the deleted row.
     * @memberOf SettingSimpleTable#
     */
    _onDeleteRow: function(tr, rowData, formerRowIndex){
      this.emit('row-delete', tr, rowData, formerRowIndex);
    }

    //================================================================================================================//
  });
});
