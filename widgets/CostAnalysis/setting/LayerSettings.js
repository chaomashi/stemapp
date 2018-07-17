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
  'jimu/BaseWidget',
  'dojo/Evented',
  'jimu/dijit/Message',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./LayerSettings.html',
  'dojo/_base/lang',
  'jimu/dijit/SimpleTable',
  'dojo/_base/array',
  'dojo/query',
  'dijit/registry',
  'dojo/dom-class',
  'dijit/form/Select',
  'dojo/dom-construct',
  'dojo/_base/html',
  'dojo/on',
  'dojo/dom-attr'
], function (
  declare,
  BaseWidget,
  Evented,
  Message,
  _WidgetsInTemplateMixin,
  template,
  lang,
  SimpleTable,
  array,
  query,
  registry,
  domClass,
  Select,
  domConstruct,
  html,
  on,
  domAttr
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,

    baseClass: 'jimu-widget-cost-analysis-layer-settings',

    _layerSettingsTable: null,//to store layer settings grid object

    constructor: function (options) {
      lang.mixin(this, options);
    },

    postMixInProperties: function () {
      this.nls.common = {};
      lang.mixin(this.nls.common, window.jimuNls.common);
    },

    postCreate: function () {
      this.inherited(arguments);
      this._layerSettingsTable = null;//to store layer settings grid object
    },

    /**
     * This function is used to set config values to layer settings table
     * @memberOf setting/LayerSettings
     */
    setConfig: function () {
      this._filterLayers();
    },

    /**
     * This function is used to gets and return values changed in layer settings table
     * @memberOf setting/LayerSettings
     */
    getConfig: function () {
      var updatedConfig;
      updatedConfig = this._getUpdateLayerSettings();
      return updatedConfig;
    },

    /**
     * This function is used to get updated layer settings
     * @memberOf setting/LayerSettings
     */
    _getUpdateLayerSettings: function () {
      var tableData, config;
      if (this._layerSettingsTable) {
        tableData = this._layerSettingsTable.getData();
        config = this._getSelectedFields(tableData);
        return config;
      }
    },

    /**
     * This function is used to create layer settings table
     * @memberOf setting/LayerSettings
     */
    _createlayerSettingsGrid: function () {
      //Temporary hiding selectable col so adding its width to other cols
      //when showing selectable cols width should be 38%, 30%, 16%, 16%
      var args, fields = [{
        name: 'title',
        title: this.nls.layerSettings.layerNameHeaderTitle,
        type: 'text',
        editable: false,
        width: '44%'
      }, {
        name: 'fieldPicker',
        title: this.nls.layerSettings.fieldPickerHeaderTitle,
        type: 'empty',
        editable: false,
        width: '40%'
      }, {
        name: 'editable',
        title: this.nls.layerSettings.EditableLayerHeaderTitle,
        type: 'checkbox',
        editable: false,
        width: '16%'
      }, {
        name: 'selectable',
        title: this.nls.layerSettings.SelectableLayerHeaderTitle,
        type: 'checkbox',
        editable: false,
        hidden: true, //As edit toolbar is removed in widget, temp hide this column.
        width: '16%'
      }, {
        name: 'id',
        title: "id",
        type: 'text',
        editable: false,
        hidden: true,
        width: '0%'
      }, {
        name: 'url',
        title: "url",
        type: 'text',
        editable: false,
        hidden: true,
        width: '0%'
      }];
      args = {
        fields: fields,
        selectable: true
      };
      this._layerSettingsTable = new SimpleTable(args);
      this._layerSettingsTable.placeAt(this.layerSettingsTableNode);
      html.setStyle(this._layerSettingsTable.domNode, { 'height': '100%' });
      this._layerSettingsTable.startup();
    },

    /**
     * Extract all editable layers
     * @memberOf setting/LayerSettings
     */
    onLayerSettingChange: function (tr) {
      var selectedRowDetails = {}, selectedRowData;
      selectedRowData = this._layerSettingsTable.getRowData(tr);
      if (selectedRowData) {
        selectedRowDetails.layerId = selectedRowData.id;
        selectedRowDetails.editable = selectedRowData.editable === null ? false :
          selectedRowData.editable;
      }
      this.emit("onLayerSettingUpdate", selectedRowDetails);
    },

    /**
     * This function is used to validate and filters layers to display in layer name column
     * @memberOf setting/LayerSettings
     */
    _filterLayers: function () {
      var opLayers, configLayerObject, layersAdded = [];
      opLayers = this.map.itemInfo.itemData.operationalLayers;
      if (opLayers.length === 0) {
        domClass.remove(this.noAssetLayersAvailable,
          "esriCTHidden");
      }
      else {
        domClass.add(this.noAssetLayersAvailable,
          "esriCTDisabled");
        this._createlayerSettingsGrid();
        this._setTableHeadTooltip();
        layersAdded = [
          this.config.projectSettings.costingGeometryLayer || "",
          this.config.projectSettings.projectLayer || ""
        ];
        if (this.config && this.config.layerSettings.length > 0) {
          array.forEach(this.config.layerSettings, lang.hitch(this,
            function (currentLayerSettings) {
              configLayerObject = this.map.getLayer(currentLayerSettings.id);
              if (configLayerObject && (!configLayerObject.errors || configLayerObject.errors.length <= 0)) {
                layersAdded.push(currentLayerSettings.id);
                configLayerObject.editable = this._checkEditCapabilities(configLayerObject);
                this._createFieldsRows(currentLayerSettings, configLayerObject.editable);
              }
            }));
        }
        array.forEach(opLayers,
          lang.hitch(this, function (currentLayer) {
            //if layer is feature layer & is not added then only create row for a layer
            if ((!currentLayer.errors || currentLayer.errors.length <= 0) &&
              currentLayer.layerType === "ArcGISFeatureLayer" &&
              layersAdded.indexOf(currentLayer.id) === -1) {
              currentLayer.selectable = true;
              currentLayer.editable = this._checkEditCapabilities(currentLayer.layerObject);
              this._createFieldsRows(currentLayer, currentLayer.editable);
            }
          }));
      }
    },

    /**
     * This function is used to checks layer's edit capabilities and
     * disables checkbox if layer is not editable
     * @param {object} currentLayer: current layer object
     * @memberOf setting/LayerSettings
     */
    _checkEditCapabilities: function (currentLayer) {
      //Check if layer is editable and it has valid global id field
      if (currentLayer && currentLayer.capabilities && currentLayer.capabilities.indexOf("Delete") !== -1 &&
        currentLayer.capabilities.indexOf("Create") !== -1 &&
        currentLayer.capabilities.indexOf("Update") !== -1 && currentLayer.globalIdField) {
        return true;
      }
      return false;
    },

    /**
     * Returns message why layer is disabled and not editable
     * @param {string} currentLayer: current layer object
     * @memberOf setting/LayerSettings
     */
    _getInvalidLayersMsg: function (layerId) {
      var currentLayer, message, missingCapabilities = [];
      message = "";
      //get layer instance from map
      currentLayer = this.layerInfosObj.getLayerInfoById(layerId).layerObject;
      //check for missing capabilities
      if (currentLayer.capabilities) {
        if (currentLayer.capabilities.indexOf("Create") === -1) {
          missingCapabilities.push("Create");
        }
        if (currentLayer.capabilities.indexOf("Update") === -1) {
          missingCapabilities.push("Update");
        }
        if (currentLayer.capabilities.indexOf("Delete") === -1) {
          missingCapabilities.push("Delete");
        }
      } else {
        missingCapabilities = ["Create", "Update", "Delete"];
      }
      //update message for missing capabilities
      if (missingCapabilities.length > 0) {
        message = this.nls.layerSettings.missingCapabilitiesMsg;
        message += "<br/>";
        array.forEach(missingCapabilities, lang.hitch(this, function (capability) {
          message += "<li>" + this.nls.layerSettings[capability.toLowerCase()] + "</li>";
        }));
      }
      //update message for missing GlobalId field
      if (!currentLayer.globalIdField) {
        message += "<br/>";
        message += this.nls.layerSettings.missingGlobalIdMsg;
      }
      return message;
    },

    /**
     * This function is used to enable or disable editable checkbox on
     * checking edit capabilities of layer
     * @param {object} tableRow: table row object
     * @param {object} isLayerEditable: flag to check if layer is editable
     * @memberOf setting/LayerSettings
     */
    _enableDisableEditableCheckbox: function (tableRow, layerRow, isLayerEditable) {
      var editableColumn, checkboxNode;
      editableColumn = query('.simple-table-cell ', tableRow)[2];
      if (editableColumn.children[0]) {
        checkboxNode = registry.byNode(editableColumn.children[0]);
      }
      if (!isLayerEditable) {
        domAttr.set(checkboxNode.domNode, 'title',
          this.nls.layerSettings.disableEditableCheckboxTooltip);
        checkboxNode.setValue(false);
        checkboxNode.setStatus(false);
        domClass.add(checkboxNode.domNode, "jimu-float-leading");
        //If layer is not editable, disable fields drop down
        if (tableRow.selectFields) {
          tableRow.selectFields.set('disabled', true);
        }
        if (!tableRow.errorDiv) {
          var errorMessage = this._getInvalidLayersMsg(layerRow.id);
          tableRow.errorDiv = domConstruct.create("div", {
            'class': "esriCTFieldError"
          }, editableColumn);
          domAttr.set(tableRow.errorDiv, "errorMessage", errorMessage);
          tableRow.errorSpan = domConstruct.create("span", {
            'class': "jimu-icon jimu-icon-error"
          }, tableRow.errorDiv);
          this.own(on(tableRow.errorDiv, "click", lang.hitch(this, function (evt) {
            var errorDiv = evt.currentTarget;
            var msg = domAttr.get(errorDiv, "errorMessage");
            Message({
              message: msg
            });
          })));
        }
      }
      else {
        checkboxNode.setStatus(true);
        if (tableRow.selectFields) {
          tableRow.selectFields.set('disabled', false);
        }
      }
    },

    /**
     * This function used to create rows for fields in table
     * @param {object} layerRow: table row object
     * @param {object} editable: flag to check if layer is editable or not
     * @memberOf setting/LayerSettings
     */
    _createFieldsRows: function (layerRow, editable) {
      var row, editableCheckBox, selectableCheckbox;
      if (layerRow.editable) {
        layerRow.selectable = layerRow.editable;
      }
      row = this._layerSettingsTable.addRow({
        title: layerRow.title ? layerRow.title : layerRow.name,
        editable: layerRow.editable,
        selectable: layerRow.selectable,
        id: layerRow.id,
        url: layerRow.url
      });
      editableCheckBox = query(".jimu-checkbox", row.tr.children[2]);
      selectableCheckbox = query(".jimu-checkbox", row.tr.children[3]);
      if (layerRow.editable) {
        //Set selectable check box state
        this._setCheckBoxState(editableCheckBox[0], selectableCheckbox[0]);
      }
      setTimeout(lang.hitch(this, function () {
        this._setHeaderCheckBoxState();
      }), 200);
      this.own(on(registry.byNode(editableCheckBox[0]), 'change',
        lang.hitch(this, function () {
          //Set selectable check box state
          this._setCheckBoxState(editableCheckBox[0], selectableCheckbox[0]);
          this._setHeaderCheckBoxState();
          this.onLayerSettingChange(editableCheckBox[0].parentElement.parentElement);
        })));
      this._addFieldsDropDown(row.tr, layerRow);
      this._enableDisableEditableCheckbox(row.tr, layerRow, editable);
    },

    /**
     * This function used to handle click event of edit checkbox
     * @param {object} editCheckbox: editable checkbox node
     * @param {object} selectCheckbox: selectable checkbox node
     * @memberOf setting/LayerSettings
     */
    _setCheckBoxState: function (editCheckbox, selectCheckbox) {
      var editCheckboxNode, selectCheckboxNode;
      editCheckboxNode = registry.byNode(editCheckbox);
      selectCheckboxNode = registry.byNode(selectCheckbox);
      if (editCheckboxNode.checked) {
        selectCheckboxNode.set("checked", true);
        selectCheckboxNode.set('status', false);
        selectCheckboxNode.set('disable', true);
        domClass.add(selectCheckboxNode.domNode, "jimu-state-disabled");
        domClass.add(selectCheckboxNode.domNode.children[0], "checked");
      } else {
        selectCheckboxNode.set("checked", true);
        selectCheckboxNode.set('status', true);
        selectCheckboxNode.set('disable', false);
        domClass.remove(selectCheckboxNode.domNode, "jimu-state-disabled");
        domClass.add(selectCheckboxNode.domNode.children[0], "checked");
      }
    },

    /**
     * This function used to set selectable parent checkbox state
     * @memberOf setting/LayerSettings
     */
    _setHeaderCheckBoxState: function () {
      var selectableParentCheckbox, selectCheckbox, isAllChecked = true,
        selectableParentCheckboxNode;
      selectableParentCheckbox = query(".simple-table-title .checkbox", this.domNode)[1];
      selectableParentCheckboxNode = query(".simple-table-title .jimu-checkbox", this.domNode)[1];
      array.some(this._layerSettingsTable.getRows(), lang.hitch(this, function (row) {
        selectCheckbox = query("td.selectable .checked", row);
        if (selectCheckbox.length === 0) {
          isAllChecked = false;
          return true;
        }
      }));
      //If all selectable checkbox are checked, check parent checkbox
      if (isAllChecked) {
        domClass.add(selectableParentCheckbox, "checked");
        registry.byNode(selectableParentCheckboxNode).set("checked", true);
      } else {
        domClass.remove(selectableParentCheckbox, "checked");
        registry.byNode(selectableParentCheckboxNode).set("checked", false);
      }
    },

    /**
     * This function is used to update table when
     * layer changes triggered in project settings tab
     * @param {object} currentLayer: layer object
     * @memberOf setting/LayerSettings
     */
    updateLayerSettingsTable: function (currentLayer) {
      var tableData = this._layerSettingsTable.getData(), newLayer;
      //Add last selected layer in layer settings table
      if (currentLayer.lastSelectedId) {
        newLayer = this.layerInfosObj.getLayerInfoById(currentLayer.lastSelectedId).layerObject;
        newLayer.editable = this._checkEditCapabilities(newLayer);
        newLayer.selectable = true;
        this._createFieldsRows(newLayer, newLayer.editable);
      }
      if (currentLayer.currentSelectedLayerId) {
        array.some(tableData, lang.hitch(this, function (tableRow, index) {
          //If selected layer is found, delete it from layer settings table
          if (tableRow.id === currentLayer.currentSelectedLayerId) {
            this._layerSettingsTable.deleteRow(this._layerSettingsTable.tbody.rows[index]);
            return true;
          }
        }));
      }
    },

    /**
     * This function creates fields dropdown
     * @param {object} tableRow: table row object
     * @param {object} currentLayer: layer object
     * @memberOf setting/LayerSettings
     */
    _addFieldsDropDown: function (tableRow, currentLayer) {
      var fieldsColumn, dropDownContainer, layerObject;
      if (!currentLayer.layerObject) {
        layerObject = this.map._layers[currentLayer.id];
      }
      else {
        layerObject = currentLayer.layerObject;
      }
      fieldsColumn = query('.simple-table-cell', tableRow)[1];
      if (fieldsColumn) {
        dropDownContainer = domConstruct.create("div", {
          "class": "esriCTDropDownContainer"
        }, fieldsColumn);
        tableRow.selectFields = new Select({
          options: this._getFieldsOptionsObj(layerObject),
          "class": "esriCTLayerSettingsFieldsDropdown"

        });
        tableRow.selectFields.placeAt(dropDownContainer);
        tableRow.selectFields.startup();
        if (currentLayer.selectedField) {
          tableRow.selectFields.set("value", currentLayer.selectedField);
        }
      }
    },

    /**
     * This function is used to
     * filter the valid fields from all fields
     * @param {object} layerObject: layer object
     * @memberOf setting/LayerSettings
     */
    _getFieldsOptionsObj: function (layerObject) {
      var fieldOptions = [], validFieldTypes, fieldArray;
      fieldArray = layerObject.fields;
      validFieldTypes = [
        'esriFieldTypeString'
      ];
      fieldOptions.push({
        "label": this.nls.layerSettings.selectLabel,
        "value": ""
      });
      array.forEach(fieldArray, lang.hitch(this, function (field) {
        if (field.editable && //field should be editable to store project id in it
          !field.domain && //field should not have domain
          validFieldTypes.indexOf(field.type) > -1 && //only string fields are valid as of now
          field.length > 37 &&  //field length should be greater than 37, as globalId needs 38 char
          field.name !== layerObject.typeIdField) { //field should not be typeId field as adding project id in typeId field corrupts the template
          fieldOptions.push(
            {
              "label": field.alias || field.name,
              "value": field.name
            });
        }
      }));
      return fieldOptions;
    },

    /**
     * This function is used to gets selected fields
     * @param {object} tableData: table data object
     * @memberOf setting/LayerSettings
     */
    _getSelectedFields: function (tableData) {
      var tableRows;
      tableRows = this._layerSettingsTable.getRows();
      //get selected items from chooser
      array.forEach(tableRows, lang.hitch(this, function (tableRow, index) {
        if (tableRow.selectFields) {
          tableData[index].selectedField = tableRow.selectFields.getValue();
          if (tableData[index].editable === null) {
            tableData[index].editable = false;
          }
          //remove unwanted fields from config options
          delete tableData[index].fieldPicker;
        }
      }));
      return tableData;
    },

    /**
     * This function is used to add customize tooltip for table heading
     * @memberOf setting/LayerSettings
     */
    _setTableHeadTooltip: function () {
      var tableHeadArray;
      tableHeadArray = query(".simple-table-thead th", this.domNode);
      if (tableHeadArray.length) {
        domAttr.set(tableHeadArray[0], 'title', this.nls.layerSettings.layerNameHeaderTooltip);
        domAttr.set(tableHeadArray[1], 'title', this.nls.layerSettings.fieldPickerHeaderTooltip);
        domAttr.set(tableHeadArray[2], 'title',
          this.nls.layerSettings.EditableLayerHeaderTooltip);
        domAttr.set(tableHeadArray[3], 'title',
          this.nls.layerSettings.SelectableLayerHeaderTooltip);
      }
    }
  });
});