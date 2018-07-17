///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'jimu/dijit/Popup',
  'jimu/dijit/SimpleTable',
  'jimu/BaseWidget',
  'dojo/Evented',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./ManageScenarios.html',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/query',
  'dojo/dom-attr'
], function (
  declare,
  Popup,
  SimpleTable,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  array,
  lang,
  on,
  query,
  domAttr
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    popup: null,
    _addScenarioTable: null,// for scenario table
    baseClass: 'jimu-widget-cost-analysis-manage-scenarios',

    constructor: function (options) {
      lang.mixin(this, options);
    },

    postMixInProperties: function () {
      this.nls.common = {};
      lang.mixin(this.nls.common, window.jimuNls.common);
    },

    postCreate: function () {
      this.popup = null;
      this._addScenarioTable = null;// for scenario table
      this.inherited(arguments);
      this._init();
    },

    /**
   * Initializing the widget
   * @memberOf CostAnalysis/setting/ManageScenarios
   */
    _init: function () {
      this._createManageScenarioTable();
      this._createManageScenarioPopup();
      this.own(on(this.addBtnNode, "click", lang.hitch(this, function () {
        //Trim the values before checking duplicate entries
        this.scenarioNameNode.set('value', this.scenarioNameNode.get('value').trim());
        if (this.scenarioNameNode.validate()) {
          this._addNewScenario(this._addScenarioTable.getRows().length + 1,
            this.scenarioNameNode.get('value'));
          this.scenarioNameNode.set('value', " ");
        } else {
          this.scenarioNameNode.focus();
        }
      })));
      this.scenarioNameNode.validator = lang.hitch(this, this._scenarioNameValidator);
      this.scenarioNameNode.focus();
    },

    /**
   * Create manage scenario popup dialog
   * @memberOf CostAnalysis/setting/ManageScenarios
   */
    _createManageScenarioPopup: function () {
      //initializing popup with default configuration
      this.popup = new Popup({
        titleLabel: this.nls.costingInfo.manageScenarioLabel,
        content: this.domNode,
        width: 500,
        height: 400,
        autoHeight: true,
        "class": this.baseClass,
        buttons: [{
          label: this.nls.common.ok,
          onClick: lang.hitch(this, 'onOkButtonClicked')
        }]
      });
    },

    /**
   * Emit the event
   * @memberOf CostAnalysis/setting/ManageScenarios
   */
    onOkButtonClicked: function () {
      this.emit("okButtonClicked", this._addScenarioTable.getData());
      this.popup.close();
    },

    /**
     * This function is used to create table for add Layer section
     * @memberOf CostAnalysis/setting/ManageScenarios
     */
    _createManageScenarioTable: function () {
      var args, fields = [{
        name: 'id',
        title: this.nls.costingInfo.srNoLabel,
        type: 'text',
        editable: false,
        width: '100px'
      }, {
          name: 'field',
          title: this.nls.costingInfo.scenarioNameLabel,
          type: 'text',
          editable: false,
          width: '200px'
        }, {
          name: 'actions',
          title: this.nls.costingInfo.deleteLabel,
          width: '100px',
          type: 'actions',
          actions: ['delete']
        }];
      args = {
        fields: fields,
        selectable: false
      };
      this._addScenarioTable = new SimpleTable(args);
      this._addScenarioTable.placeAt(this.addScenarioNameTableNode);
      this._addScenarioTable.startup();
      // to read scenario data from config
      this._populateExistingScenarios();

      this._addScenarioTable.onBeforeRowDelete = lang.hitch(this, function (tr) {
        var rowsArray, td, indexDiv;
        //delete row
        this._addScenarioTable.deleteRow(tr);
        // code to change indexing of scenario table rows
        rowsArray = this._addScenarioTable.getRows();
        array.forEach(rowsArray, function (tr, index) {
          td = tr.cells[0];
          indexDiv = query('div', td)[0];
          domAttr.set(indexDiv, "innerHTML", index + 1);
          domAttr.set(indexDiv, "title", index + 1);
        });
      });
    },

    /**
     * read scenarios from config
     * @memberOf CostAnalysis/setting/ManageScenarios
     */
    _populateExistingScenarios: function () {
      array.forEach(this.existingScenarios,
        lang.hitch(this, function (scenarioName, index) {
          // condition to check if layer is editable and has assets in it
          this._addNewScenario(index + 1, scenarioName);
        }));
    },
    /**
     * Add new scenario in table
     * @memberOf CostAnalysis/setting/ManageScenarios
     */
    _addNewScenario: function (id, scenarioName) {
      this._createRow(id, scenarioName);
    },

    /**
     * Create new row
     * @memberOf CostAnalysis/setting/ManageScenarios
     */
    _createRow: function (id, scenarioName) {
      this._addScenarioTable.addRow({
        id: id,
        field: scenarioName
      });
    },

    /**
     * Validate duplicate scenario name
     * @memberOf CostAnalysis/setting/ManageScenarios
     */
    _scenarioNameValidator: function (value) {
      //Check if value is empty
      if (value === "") {
        return false;
      }
      //Check for duplicate actions label
      if (this._addScenarioTable.getRowDataArrayByFieldValue("field", value).length > 0) {
        this.scenarioNameNode.invalidMessage = this.nls.costingInfo.duplicateScenarioName;
        return false;
      }
      return true;
    },

    /**
     * get updated manage scenarios
     * @memberOf CostAnalysis/setting/ManageScenarios
     */
    getUpdatedManageScenarios: function () {
      var tableRows, templateData, queryMangeScenarioRows;
      templateData = [];
      tableRows = this._addScenarioTable.getRows();
      // get selected items from chooser

      queryMangeScenarioRows = query('.simple-table-row', this._addScenarioTable);
      return templateData;
    }
  });
});