///////////////////////////////////////////////////////////////////////////
// Copyright © 2018 Esri. All Rights Reserved.
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
  'jimu/dijit/SimpleTable',
  'jimu/BaseWidget',
  'dojo/Evented',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./CostingTemplate.html',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/dom-attr',
  'dojo/dom-class',
  'dojo/on',
  'dojo/query',
  'dojo/dom-construct',
  'dijit/form/Select',
  'dijit/form/ValidationTextBox',
  'dijit/registry',
  'dijit/TooltipDialog',
  'dijit/popup',
  './EditCostEquation',
  '../utils',
  'dojo/dom-style'
], function (
  declare,
  SimpleTable,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  array,
  lang,
  domAttr,
  domClass,
  on,
  query,
  domConstruct,
  Select,
  ValidationTextBox,
  registry,
  TooltipDialog,
  popup,
  EditCostEquation,
  appUtils,
  domStyle
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    popup: null,
    _addScenarioTable: null,
    _featureLayerTemplateOptions: null,
    baseClass: 'jimu-widget-cost-analysis-costing-template',
    constructor: function (options) {
      lang.mixin(this, options);
    },

    postMixInProperties: function () {
      this.nls.common = {};
      lang.mixin(this.nls.common, window.jimuNls.common);
    },

    postCreate: function () {
      this.popup = null;
      this._addScenarioTable = null;
      this._featureLayerTemplateOptions = null;
      this.inherited(arguments);
      domClass.add(this.domNode, "esriCTLayerTableWrapper");
      this._init();
      //handle click event for the button
      this.own(on(this.btnCostingTemplateNode, 'click',
        lang.hitch(this, this._addCostingTemplateBtnClicked, true)));
    },

    /**
     * Initializing the widget
     * @memberOf CostAnalysis/setting/ManageScenarios
     */
    _init: function () {
      domAttr.set(this.layerName, "innerHTML", this.layer.title);
      domAttr.set(this.layerName, "title", this.layer.title);
      this._createCostingTable();
    },

    /**
    * This function is used to create table for add Layer section
    * @memberOf CostAnalysis/setting/CostingInfo
    */
    _createCostingTable: function () {
      var args, fields = [{
        name: 'field',
        title: this.nls.costingInfo.featureTemplateTitle,
        type: 'empty',
        editable: false,
        width: '22%'
      }, {
        name: 'field',
        title: this.nls.costingInfo.costEquationTitle,
        type: 'empty',
        editable: true,
        width: '22%'
      }, {
        name: 'field',
        title: this.nls.costingInfo.geographyTitle,
        type: 'empty',
        editable: false,
        width: '22%'
      }, {
        name: 'field',
        title: this.nls.costingInfo.scenarioTitle,
        type: 'empty',
        editable: false,
        width: '22%'
      }, {
        name: 'actions',
        title: this.nls.costingInfo.actionTitle,
        width: '12%',
        type: 'actions',
        actions: ['edit', 'delete']
      }];
      args = {
        fields: fields,
        selectable: false
      };
      this._addCostingInfoLayerTable = new SimpleTable(args);
      this._addCostingInfoLayerTable.placeAt(this.addLayerTableNode);
      this._addCostingInfoLayerTable.startup();
      this._addCostingInfoLayerTable.onBeforeRowDelete = lang.hitch(this, function (tr) {
        //delete values from respective object
        if (this.config.costingInfoSettings[this.layer.id]) {
          this.config.costingInfoSettings[this.layer.id].splice(tr.rowIndex, 1);
        }
        return true;
      });
      this._addHelpIconToHeader();
      this._createHelpPopups();
      this._windowEventsPopupClose();
      this._tableOnBeforeRowEdit();
      this._populateCostingAssets();
    },

    /**
     * This function is to handle row edit of template
     * @memberOf CostAnalysis/setting/CostingTemplate
     */
    _tableOnBeforeRowEdit: function () {
      //Listen for row edit event and perform necessary actions
      this._addCostingInfoLayerTable.onBeforeRowEdit = lang.hitch(this, function (tr) {
        var currentRowValues;
        currentRowValues = {};
        currentRowValues.featureTemplateValue = tr.featureTemplateFields.get('value');
        currentRowValues.costEquationValue = tr.costEquationInput.get('value');
        currentRowValues.geographyValue = tr.geographyFields.get('value');
        currentRowValues.scenarioValue = tr.scenarioFields.get('value');
        this._editCostEquation = new EditCostEquation({
          nls: this.nls,
          map: this.map,
          config: this.config,
          layerTitle: this.layer.title,
          currentRow: tr,
          existingRowValues: currentRowValues,
          validateCostEquation: this.validateCostEquation
        });
        on(this._editCostEquation, "okButtonClicked", lang.hitch(this,
          function () {
            this._editCostEquation.destroy();
          }));
      });
    },

    /**
     * This function is create help dialog popup
     * @memberOf CostAnalysis/setting/CostingTemplate
     */
    _createHelpPopups: function () {
      var _popupClose;
      _popupClose = domConstruct.create("div", {
        "class": "esriCTCancelDialogPopup",
        onclick: function () {
          popup.close(this.costEquationHelpDialog);
          return false;
        }
      });

      this.costEquationHelpDialog = new TooltipDialog({
        "class": this.baseClass,
        content: _popupClose.outerHTML + "<div class = 'esriCTDialogText'>" +
          this.nls.costingInfo.costEquationHelpText + "</div>",
        onClick: function (evt) {
          if (!domClass.contains(evt.target, "esriCTCancelDialogPopup")) {
            evt.stopPropagation();
          }
        }
      });
      this.scenarioHelpDialog = new TooltipDialog({
        "class": this.baseClass,
        content: _popupClose.outerHTML + "<div class = 'esriCTDialogText'>" +
          this.nls.costingInfo.scenarioHelpText + "</div>",
        onClick: function (evt) {
          if (!domClass.contains(evt.target, "esriCTCancelDialogPopup")) {
            evt.stopPropagation();
          }
        }
      });
    },

    /**
     * This function is handle window click help popup close
     * @memberOf CostAnalysis/setting/CostingTemplate
     */
    _windowEventsPopupClose: function () {
      //to handle onclick of window document for hiding help dialogues
      on(window.document, 'click', lang.hitch(this, function (evt) {
        //dijitTooltipDialog jimu-widget-cost-analysis-costing-template
        if (!domClass.contains(evt.target, "esriCTHelpIcon")) {
          popup.close(this.scenarioHelpDialog);
          popup.close(this.costEquationHelpDialog);
        }
      }));
      var outerDiv = query('.container-node.jimu-viewstack')[0];
      if (outerDiv) {
        on(outerDiv, "scroll", lang.hitch(this, function () {
          popup.close(this.scenarioHelpDialog);
          popup.close(this.costEquationHelpDialog);
        }));
      }
    },

    /**
     * This function is show help dialog popup
     * @memberOf CostAnalysis/setting/CostingTemplate
     */
    _addHelpIconToHeader: function () {
      var tableColumns, costEquationHelpNode, scenarioHelpNode, equationHelp, scenarioHelp;
      tableColumns = query(".simple-table-thead tr", this.domNode)[0];
      //If table exist, find nodes for adding help icons
      if (tableColumns) {
        costEquationHelpNode = tableColumns.children[1];
        scenarioHelpNode = tableColumns.children[3];
      }
      //Create nodes for help icon
      equationHelp = domConstruct.create("div", {
        "class": "esriCTHelpIcon"
      }, costEquationHelpNode);
      scenarioHelp = domConstruct.create("div", {
        "class": "esriCTHelpIcon"
      }, scenarioHelpNode);
      //Bind events
      on(equationHelp, "click", lang.hitch(this, function () {
        this._openHelpPopupDialog(this.costEquationHelpDialog, equationHelp);
      }));
      on(scenarioHelp, "click", lang.hitch(this, function () {
        this._openHelpPopupDialog(this.scenarioHelpDialog, scenarioHelp);
      }));
    },

    /**
     * This function is used to open help popup dialog
     * @memberOf CostAnalysis/setting/CostingTemplate
     */
    _openHelpPopupDialog: function (dialog, helpContent) {
      popup.open({
        popup: dialog,
        around: helpContent,
        orient: ["above-centered"]
      });
    },

    /**
     * This function is used to click add costing template button
     * @memberOf CostAnalysis/setting/CostingTemplate
     */
    _addCostingTemplateBtnClicked: function (addRowFlag) {
      var currentSetting;
      currentSetting = this.layer.layerObject.templates[0];
      this._addLayerRow(addRowFlag, null, true);
    },

    /**
     * This function is used to add a row on load in CostingInfo tab
     * @memberOf setting/CostingTemplate
     */
    _addLayerRow: function (addRowFlag, tr, isAddBtnClicked) {
      var editableLayerRow, fieldsColumn;
      if (addRowFlag) {
        editableLayerRow = this._addCostingInfoLayerTable.addRow({});
      }
      else {
        editableLayerRow = this._addCostingInfoLayerTable.addRow({}, tr.rowIndex + 1, false);
      }
      fieldsColumn = query('.simple-table-cell', editableLayerRow.tr);
      if (fieldsColumn) {
        this._addFeatureTemplateDropdown(fieldsColumn[0], editableLayerRow.tr, isAddBtnClicked);
        this._addCostEquationTextBox(fieldsColumn[1], editableLayerRow.tr, isAddBtnClicked);
        this._addGeographyDropdown(fieldsColumn[2], editableLayerRow.tr, isAddBtnClicked);
        this._addScenarioDropdown(fieldsColumn[3], editableLayerRow.tr, isAddBtnClicked);
        this._addCopyRowActionIcon(editableLayerRow.tr);
      }
    },

    /**
     * This function is used to add drop-down for Feature Template column
     * @memberOf setting/StatisticsSettings
     */
    _addFeatureTemplateDropdown: function (fieldsColumn, editableLayerRow, isAddBtnClicked) {
      var dropDownContainer, selectedOption, configuredCost;
      if (!this._featureLayerTemplateOptions) {
        this._getFeatureTemplateOptions();
      }
      dropDownContainer = domConstruct.create("div",
        { "class": "esriCTDropDownContainer" }, fieldsColumn);
      editableLayerRow.featureTemplateFields = new Select({
        options: lang.clone(this._featureLayerTemplateOptions),
        "class": "esriCTCostingTemplateFeatureTemplate"
      });
      editableLayerRow.featureTemplateFields.placeAt(dropDownContainer);
      editableLayerRow.featureTemplateFields.startup();
      configuredCost = this.config.costingInfoSettings[this.layer.id];
      if (configuredCost && configuredCost.length > 0 &&
        configuredCost[editableLayerRow.rowIndex] && !isAddBtnClicked) {
        selectedOption = configuredCost
        [editableLayerRow.rowIndex].featureTemplate;
        editableLayerRow.featureTemplateFields.set("value", selectedOption);
      }
      else {
        selectedOption = this._featureLayerTemplateOptions
        [editableLayerRow.rowIndex];
        editableLayerRow.featureTemplateFields.set("value", selectedOption);
      }
    },

    /**
     * This function is used to add dropdown for Geography column
     * @memberOf setting/CostingTemplate
     */
    _addGeographyDropdown: function (fieldsColumn, editableLayerRow, isAddBtnClicked) {
      var dropDownContainer, selectedOption, refGeography, configuredCost;
      dropDownContainer = domConstruct.create("div",
        { "class": "esriCTDropDownContainer" }, fieldsColumn);
      editableLayerRow.geographyFields = new Select({
        options: lang.clone(this.geographies),
        "class": "esriCTCostingTemplateGeography"
      });
      editableLayerRow.geographyFields.placeAt(dropDownContainer);
      editableLayerRow.geographyFields.startup();
      configuredCost = this.config.costingInfoSettings[this.layer.id];
      if (configuredCost && configuredCost.length > 0 &&
        configuredCost[editableLayerRow.rowIndex] && !isAddBtnClicked) {
        selectedOption = configuredCost
        [editableLayerRow.rowIndex].geography;
        refGeography = (selectedOption === "") ? this.nls.costingInfo.noneValue : selectedOption;
        editableLayerRow.geographyFields.set("value", refGeography);
      } else {
        editableLayerRow.geographyFields.set("value", "");
      }
    },

    /**
     * This function is used to add dropdown for Scenario column
     * @memberOf setting/CostingTemplate
     */
    _addScenarioDropdown: function (fieldsColumn, editableLayerRow, isAddBtnClicked) {
      var dropDownContainer, selectedOption, refScenario, configuredCost;
      dropDownContainer = domConstruct.create("div", {
        "class": "esriCTDropDownContainer"
      }, fieldsColumn);
      editableLayerRow.scenarioFields = new Select({
        "options": lang.clone(this.scenarios),
        "class": "esriCTCostingInfoScenarioOptions"
      });
      editableLayerRow.scenarioFields.placeAt(dropDownContainer);
      editableLayerRow.scenarioFields.startup();
      configuredCost = this.config.costingInfoSettings[this.layer.id];
      if (configuredCost && configuredCost.length > 0 &&
        configuredCost[editableLayerRow.rowIndex] && !isAddBtnClicked) {
        selectedOption = configuredCost[editableLayerRow.rowIndex].scenario;
        refScenario = (selectedOption === "") ? this.nls.costingInfo.noneValue : selectedOption;
        editableLayerRow.scenarioFields.set("value", refScenario);
      } else {
        editableLayerRow.scenarioFields.set("value", "");
      }
    },

    /**
     * This function is used to add inline text-box for cost equation column
     * @memberOf setting/CostingTemplate
     */
    _addCostEquationTextBox: function (fieldsColumn, editableLayerRow, isAddBtnClicked) {
      var textBoxContainer, selectedOption, configuredCost;
      textBoxContainer = domConstruct.create("div",
        { "class": "esriCTTextBoxContainer" }, fieldsColumn);
      editableLayerRow.costEquationInput = new ValidationTextBox({
        "class": "esriCTLayerLabelTextBox esriCTFullWidth",
        "spellcheck": false
      });
      editableLayerRow.costEquationInput.placeAt(textBoxContainer);
      editableLayerRow.costEquationInput.startup();
      this._setCostEquation(editableLayerRow.costEquationInput);
      editableLayerRow.costEquationInput.validator = lang.hitch(this, this.validateCostEquation);
      configuredCost = this.config.costingInfoSettings[this.layer.id];
      if (configuredCost && configuredCost.length > 0 &&
        configuredCost[editableLayerRow.rowIndex] && !isAddBtnClicked) {
        selectedOption = configuredCost
        [editableLayerRow.rowIndex].costEquation;
        editableLayerRow.costEquationInput.set("value", selectedOption);
      }
    },

    /**
    * This function is used to populate assets of feature template
    * @memberOf setting/CostingTemplate
    */
    _populateCostingAssets: function () {
      if (this.config.costingInfoSettings &&
        this.config.costingInfoSettings.hasOwnProperty(this.layer.id)) {
        if (this.layer && this.layer.layerObject) {
          array.forEach(this.config.costingInfoSettings[this.layer.id], lang.hitch(this, function () {
            //functionality to add asset row
            this._addLayerRow(true);
          }));
        }
      } else {
        if (this.layer.layerObject.templates.length > 0) {
          array.forEach(this.layer.layerObject.templates, lang.hitch(this,
            function () {
              //functionality to add asset row
              this._addLayerRow(true);
            }));
        }
        else if (this.layer.layerObject.types.length > 0) {
          array.forEach(this.layer.layerObject.types, lang.hitch(this,
            function () {
              //functionality to add asset row
              this._addLayerRow(true);
            }));
        }
      }
    },

    /**
    * This function is used to fetch feature layer dropdown options
    * @memberOf setting/CostingTemplate
    */
    _getFeatureTemplateOptions: function () {
      this._featureLayerTemplateOptions = [];
      if (this.layer && this.layer.layerObject) {
        if (this.layer.layerObject.templates &&
          this.layer.layerObject.templates.length > 0) {
          array.forEach(this.layer.layerObject.templates, lang.hitch(this,
            function (currentTemplate) {
              //functionality to add feature layer dropdown options
              this._featureLayerTemplateOptions.push({
                "label": currentTemplate.name, value: currentTemplate.name
              });
            }));
        }
        else if (this.layer.layerObject.types &&
          this.layer.layerObject.types.length > 0) {
          array.forEach(this.layer.layerObject.types, lang.hitch(this,
            function (currentTemplate) {
              //functionality to add feature layer dropdown options
              this._featureLayerTemplateOptions.push({
                "label": currentTemplate.templates[0].name,
                value: currentTemplate.templates[0].name
              });
            }));
        }
      }
    },

    /**
    * This function is used to update scenario dropdown options
    * @memberOf setting/CostingTemplate
    */
    updateScenarioOptions: function (scenarioOptions) {
      var scenarioDropdowns;
      scenarioDropdowns = query('.esriCTCostingInfoScenarioOptions', this.domNode);
      array.forEach(scenarioDropdowns, lang.hitch(this,
        function (scenarioDropdown) {
          //functionality to update each scenario dropdown options
          registry.byNode(scenarioDropdown).set('options', scenarioOptions);
        }));
      // added to update scenario options for add costing template
      this.scenarios = scenarioOptions;
    },

    /**
    * This function is used to set value cost equation
    * @memberOf setting/CostingTemplate
    */
    _setCostEquation: function (textBox) {
      var geometryType;
      if (this.layer && this.layer.layerObject && this.layer.layerObject.geometryType) {
        geometryType = this.layer.layerObject.geometryType;
        if ((geometryType === "esriGeometryPolyline") || (geometryType === "esriGeometryPolygon")) {
          textBox.set("value", "{MEASURE}");
        }
        else {
          textBox.set("value", "{TOTALCOUNT}");
        }
      }
    },

    /**
     * This function is used to validate cost equation
     * @memberOf setting/CostingTemplate
     */
    validateCostEquation: function (value) {
      return appUtils.validateEquation(value);
    },

    /**
     * This function is used to read costing info each layer row values
     * @memberOf setting/CostingTemplate
     */
    getUpdatedCostingInfo: function () {
      var tableRows, layerData = [], templateData = {};
      tableRows = this._addCostingInfoLayerTable.getRows();
      //get selected items from chooser
      array.forEach(tableRows, lang.hitch(this, function (tableRow) {
        if (tableRow.featureTemplateFields && tableRow.costEquationInput &&
          tableRow.geographyFields && tableRow.scenarioFields) {
          templateData = {};
          if (tableRow.featureTemplateFields) {
            templateData.featureTemplate = tableRow.featureTemplateFields.get('value');
          }
          if (tableRow.costEquationInput) {
            templateData.costEquation = tableRow.costEquationInput.get('value');
          }
          if (tableRow.geographyFields) {
            templateData.geography = tableRow.geographyFields.get('value');
          }
          if (tableRow.scenarioFields) {
            templateData.scenario = tableRow.scenarioFields.get('value');
          }
          layerData.push(templateData);
        }
      }));
      return layerData;
    },

    /**
    * This function is used to add copy action icon in each row
    * @memberOf setting/CostingTemplate
    */
    _addCopyRowActionIcon: function (tr) {
      var copyRowtd, tdEdit;
      copyRowtd = query('.action-item-parent', tr)[0];
      tdEdit = query('.jimu-icon-edit', tr)[0];
      setTimeout(function () {
        if (query(".action-item-parent", tr)[0]) {
          domStyle.set(query(".action-item-parent", tr)[0], "width", "60px");
        }
      }, 100);
      if (copyRowtd) {
        tr.copyDiv = domConstruct.create("div", {
          'class': "action-item jimu-float-leading row-edit-div jimu-icon jimu-icon-copy",
          title: this.nls.costingInfo.copyRowTitle
        }, copyRowtd);
        domConstruct.place(tr.copyDiv, tdEdit, "after");
        this.own(on(tr.copyDiv, 'click',
          lang.hitch(this, this._copyRow, tr)));
      }
    },

    /**
    * This function is used to copy functionality
    * @memberOf setting/CostingTemplate
    */
    _copyRow: function (tr) {
      this._addLayerRow(false, tr);
      this._setCopyLayerValues(tr);
    },

    /**
    * This function is used to set values of copied rows
    * @memberOf setting/CostingTemplate
    */
    _setCopyLayerValues: function (tr) {
      var copiedRow = this._addCostingInfoLayerTable.getRows()[tr.rowIndex + 1];
      copiedRow.featureTemplateFields.set('value', tr.featureTemplateFields.get('value'));
      copiedRow.costEquationInput.set('value', tr.costEquationInput.get('value'));
      copiedRow.geographyFields.set('value', tr.geographyFields.get('value'));
      copiedRow.scenarioFields.set('value', tr.scenarioFields.get('value'));
    },

    /**
    * This function is used to update geography dropdown options
    * @memberOf setting/CostingTemplate
    */
    updateGeographyOptions: function (geographyOptions) {
      var geographyDropdowns;
      if (geographyOptions) {
        this.geographies = geographyOptions;
      }
      geographyDropdowns = query('.esriCTCostingTemplateGeography', this.domNode);
      array.forEach(geographyDropdowns, lang.hitch(this,
        function (geographyDropdown) {
          //functionality to update each geography dropdown options
          registry.byNode(geographyDropdown).set('options', lang.clone(this.geographies));
          registry.byNode(geographyDropdown).startup();
        }));
    }
  });
});