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
  'dojo/_base/html',
  'jimu/BaseWidget',
  'dojo/Evented',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./asset-details.html',
  'dojo/_base/lang',
  'dojo/dom-construct',
  'dojo/_base/array',
  'dojo/dom-class',
  'dojo/dom-attr',
  'dojo/string',
  'dojo/on',
  'dojo/query',
  'dijit/TooltipDialog',
  'dijit/popup',
  'esri/graphicsUtils',
  './advance-item-list',
  './cost-equation-editor'
], function (
  declare,
  html,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  lang,
  domConstruct,
  array,
  domClass,
  domAttr,
  string,
  on,
  query,
  TooltipDialog,
  popup,
  graphicsUtils,
  AdvanceItemList,
  CostEquationEditor
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    baseClass: 'jimu-widget-cost-analysis-asset-details',
    _layerDetailsNode: {},
    _layerIndexes: [],
    _openGroups: {},

    postCreate: function () {
      this.inherited(arguments);
      this._layerDetailsNode = {};
      this._openGroups = {};
      this.listData = [];
      this._layerIndexes = [];
      array.forEach(this.config.layerSettings, lang.hitch(this, function (currentLayer) {
        if (currentLayer.editable && this.map.getLayer(currentLayer.id)) {
          var itemInfo;
          //create array of layers of open groups
          this._openGroups[currentLayer.id] = [];
          this._layerDetailsNode[currentLayer.id] = domConstruct.create("div");
          itemInfo = {
            "title": this.map.getLayer(currentLayer.id).name,
            "content": this._layerDetailsNode[currentLayer.id],
            "icon": "",
            "actionIcon": "",
            "isOpen": false,
            "isHidden": true
          };
          this.listData.push(itemInfo);
          this._layerIndexes.push(currentLayer.id);
        }
      }));
    },

    startup: function () {
      this.inherited(arguments);
      //Init list to show asset details
      this._initItemList();
      //Init group cost equation editor
      this._initCostEquationEditor();
      //Hide tooltip dialog clicked anywhere in the body
      this.own(on(document.body, 'click', lang.hitch(this, function (
        event) {
        var target = event.target || event.srcElement;
        if (!this.isPartOfPopup(target)) {
          this._closePopupDialog();
        }
      })));
      //Handle on button click
      this.own(on(this.okButton, "click", lang.hitch(this, function () {
        this.emit("onOkButtonClicked");
      })));
      //Show additional cost escalation panel on total cost button clicked
      this.own(on(this.additionalCostBtn, "click", lang.hitch(this, function () {
        this.emit("showAdditionalCost");
      })));
    },

    /**
     * Reset the open groups
     * @memberOf widgets/CostAnalysis/asset-details
     */
    reset: function () {
      var layerId;
      for (layerId in this._openGroups) {
        this._openGroups[layerId] = [];
      }
    },

    /**
    * Create item list based on configuration
    * @memberOf widgets/CostAnalysis/asset-details
    */
    _initItemList: function () {
      var dialogNode;
      this.itemList = new AdvanceItemList({
        "itemList": this.listData,
        "showArrow": true,
        "togglePanels": true,
        "openMultiple": true,
        "setAutoHeight": true,
        "highlighter": true,
        "highlighterColor": this.config.selectedThemeColor
      }, domConstruct.create("div", {}, this.listNode));
      this.own(on(this.itemList, "onActionButtonClicked",
        lang.hitch(this, function (selectedIndex) {
          this.emit("actionClicked", selectedIndex);
        })));
      this.own(on(this.itemList, "onTitleClicked",
        lang.hitch(this, function (selectedIndex) {
          this.emit("titleClicked", selectedIndex);
        })));
      this.own(on(this.itemList, "onLoad", lang.hitch(this, function () {
        this.emit("onLoad");
      })));
      this.itemList.startup();
      dialogNode = this._createTooltipDialogContent();
      //Create instance of tooltip dialog
      this.assetDetailsDialog = new TooltipDialog({
        "class": this.baseClass,
        content: dialogNode,
        "style": "width : 180px"
      });
    },

    /**
     * Creates tooltip content to zoo/delete the asset
     * @memberOf widgets/CostAnalysis/asset-details
     */
    _createTooltipDialogContent: function () {
      //create content to be shown for tooltip dialog
      var dialogNode, closeBtn, closeDialogContainer, zoomToAssetContainer, deleteAssetContainer;
      dialogNode = domConstruct.create("div", {}, null);
      closeDialogContainer = domConstruct.create("div", {
        "style": "height : 20px; margin: 0px"
      }, dialogNode);
      closeBtn = domConstruct.create("div", {
        "class": "esriCTDialogIcon esriCTClose",
        "title": this.nls.workBench.closeDialog
      }, closeDialogContainer);
      this.own(on(closeBtn, "click", lang.hitch(this, this._closePopupDialog)));
      zoomToAssetContainer = domConstruct.create("div", {
        "class": "esriCTRowContainer",
        "title": this.nls.workBench.zoomToAsset
      }, dialogNode);
      deleteAssetContainer = domConstruct.create("div", {
        "class": "esriCTRowContainer",
        "title": this.nls.workBench.deleteAsset
      }, dialogNode);
      domConstruct.create("div", {
        "class": "esriCTDialogIcon esriCTZoom"
      }, zoomToAssetContainer);
      domConstruct.create("div", {
        "class": "esriCTTooltipDialogLabel esriCTEllipsis",
        "innerHTML": this.nls.workBench.zoomToAsset
      }, zoomToAssetContainer);
      this.own(on(zoomToAssetContainer, "click", lang.hitch(this, this._zoomToAsset)));
      domConstruct.create("div", { "class": "esriCTDialogIcon esriCTDelete" },
        deleteAssetContainer);
      domConstruct.create("div", {
        "class": "esriCTTooltipDialogLabel",
        "innerHTML": this.nls.workBench.deleteAsset
      }, deleteAssetContainer);
      this.own(on(deleteAssetContainer, "click", lang.hitch(this, this._deleteAsset)));
      return dialogNode;
    },

    /**
    * Zoom to selected asset
    * @memberOf widgets/CostAnalysis/asset-details
    */
    _zoomToAsset: function () {
      var features, layerObjectID;
      if (this.selectedRowInfo) {
        features = this.assetDetails[this.selectedRowInfo.layerId]
        [this.selectedRowInfo.templateName][this.selectedRowInfo.region]
        [this.selectedRowInfo.scenario];
        //get layers object id field
        layerObjectID = this.layerInfosObj.getLayerInfoById(this.selectedRowInfo.layerId).
          layerObject.objectIdField;
        if (features) {
          array.some(features, lang.hitch(this, function (feature) {
            if (feature.attributes[layerObjectID].toString() === this.selectedRowInfo.objectId) {
              this.map.setExtent(graphicsUtils.graphicsExtent([feature]).expand(1.5));
              return true;
            }
          }));
        }
      }
    },

    /**
     * Deletes the selected asset
     * @memberOf widgets/CostAnalysis/asset-details
     */
    _deleteAsset: function () {
      if (this.selectedRowInfo) {
        var layerInstance, features;
        layerInstance = this.map.getLayer(this.selectedRowInfo.layerId);
        features = this.assetDetails[this.selectedRowInfo.layerId]
        [this.selectedRowInfo.templateName][this.selectedRowInfo.region]
        [this.selectedRowInfo.scenario];
        if (features) {
          array.some(features, lang.hitch(this, function (feature) {
            if (feature.attributes[layerInstance.objectIdField].toString() ===
              this.selectedRowInfo.objectId) {
              feature._layer = layerInstance;
              layerInstance.applyEdits(null, null, [feature]);
              return true;
            }
          }));
        }
        this._closePopupDialog();
      }
    },

    /**
     * On each assets row click opens dialog to zoom to the asset and delete the asset
     * @memberOf widgets/CostAnalysis/asset-details
     */
    _rowClick: function (evt) {
      // Stop event from propagation
      evt.stopPropagation();
      evt.preventDefault();
      //remove prev row selection
      query(".esriCTRowSelected", this.assetDetailsNode).removeClass("esriCTRowSelected");
      //add row selection class to current clicked row
      domClass.add(evt.currentTarget, "esriCTRowSelected");
      //get info from the current selected row
      this.selectedRowInfo = {};
      this.selectedRowInfo.templateName = domAttr.get(evt.currentTarget, "templateName");
      this.selectedRowInfo.region = domAttr.get(evt.currentTarget, "region");
      this.selectedRowInfo.scenario = domAttr.get(evt.currentTarget, "scenario");
      this.selectedRowInfo.layerId = domAttr.get(evt.currentTarget, "layerId");
      this.selectedRowInfo.objectId = domAttr.get(evt.currentTarget, "objectId");
      //open dialog to zoom/delete the asset
      this._openPopupDialog(this.assetDetailsDialog, evt);
    },

    /**
     * Creates expand collapse button to show/hide the assets list of each group
     * @memberOf widgets/CostAnalysis/asset-details
     */
    _createExpandCollapseButton: function (parentNode, groupId, layerId) {
      var expandCollapseBtn = domConstruct.create("div", {
        "class": "esriCTToggleIcon"
      }, parentNode);
      if (this._openGroups[layerId].indexOf(groupId) === -1) {
        domClass.add(expandCollapseBtn, "esriCTExpandIcon");
      } else {
        domClass.add(expandCollapseBtn, "esriCTCollapseIcon");
      }
      domAttr.set(expandCollapseBtn, "groupId", groupId);
      domAttr.set(expandCollapseBtn, "layerId", layerId);
      this.own(on(expandCollapseBtn, "click", lang.hitch(this, function (evt) {
        var groupId, layerId, tableNode;
        groupId = domAttr.get(evt.currentTarget, "groupId");
        layerId = domAttr.get(evt.currentTarget, "layerId");
        tableNode = query("[tableGroupId = " + groupId.replace(/"/g, '\\"') + "]",
          this.assetDetailsNode)[0];
        if (domClass.contains(evt.currentTarget, "esriCTCollapseIcon")) {
          domClass.replace(evt.currentTarget, "esriCTExpandIcon", "esriCTCollapseIcon");
          domClass.add(tableNode, "esriCTHidden");
          //Remove group id of closed table
          this._openGroups[layerId].splice(this._openGroups[layerId].indexOf(groupId), 1);
        } else {
          domClass.replace(evt.currentTarget, "esriCTCollapseIcon", "esriCTExpandIcon");
          domClass.remove(tableNode, "esriCTHidden");
          //Add group id of open table
          this._openGroups[layerId].push(groupId);
        }
      })));
      return expandCollapseBtn;
    },

    /**
     * Creates edit equation button to edit equation of each group
     * @memberOf widgets/CostAnalysis/asset-details
     */
    _createEditEquationButton: function (parentNode, groupInfo) {
      var editEquationBtn = domConstruct.create("div", {
        "class": "esriCTEditEquationIcon"
      }, parentNode);
      domAttr.set(editEquationBtn, "templateName", groupInfo.templateName);
      domAttr.set(editEquationBtn, "region", groupInfo.regionName);
      domAttr.set(editEquationBtn, "scenario", groupInfo.scenario);
      domAttr.set(editEquationBtn, "layerId", groupInfo.layerId);
      domAttr.set(editEquationBtn, "equation", groupInfo.equation);

      this.own(on(editEquationBtn, "click", lang.hitch(this, function (evt) {
        var selectedGroupInfo = {};
        selectedGroupInfo.templateName = domAttr.get(evt.currentTarget, "templateName");
        selectedGroupInfo.region = domAttr.get(evt.currentTarget, "region");
        selectedGroupInfo.scenario = domAttr.get(evt.currentTarget, "scenario");
        selectedGroupInfo.layerId = domAttr.get(evt.currentTarget, "layerId");
        selectedGroupInfo.equation = domAttr.get(evt.currentTarget, "equation");
        domClass.add(this.assetDetailsParent, "esriCTHidden");
        domClass.remove(this.costEquationEditorParent, "esriCTHidden");
        if (this._costEquationEditor) {
          this._costEquationEditor.setGroupInfo(selectedGroupInfo);
        }
      })));
      return editEquationBtn;
    },

    /**
     * Creates assets list table and groups total info table
     * @memberOf widgets/CostAnalysis/asset-details
     */
    _createAssetDetailsTable: function (detailsDiv, groupId, features, groupInfo) {
      var detailsTable, detailsTableBody, tableHeaderRow, unitsAbbr, totalTable, totalHeaderRow,
        totalCost = 0, totalFeatureDimensions = 0, layerObjectID, lengthColTitle;
      //get layers object id field
      layerObjectID = this.layerInfosObj.getLayerInfoById(groupInfo.layerId).
        layerObject.objectIdField;
      //Create table to hold each assets info
      detailsTable = domConstruct.create("table", {
        "style": { "width": "100%" },
        "class": "esriCTTable"
      }, detailsDiv);
      //Check if group id exist in open groups array and accordingly hide/show it
      if (this._openGroups[groupInfo.layerId].indexOf(groupId) === -1) {
        domClass.add(detailsTable, "esriCTHidden");
      }
      domAttr.set(detailsTable, "tableGroupId", groupId);
      detailsTableBody = domConstruct.create("tbody", {}, detailsTable);
      //Based on features geometry type and configured measurement unit,
      //get the units abbr and length col title
      if (features[0].geometry.type !== "point") {
        unitsAbbr = this.appUtils.getUnitsAbbreviation(features[0].geometry.type,
          this.config.generalSettings.measurementUnit);
        if (features[0].geometry.type === "polygon") {
          lengthColTitle = this.nls.statisticsType.areaLabel;
        } else {
          lengthColTitle = this.nls.statisticsType.lengthLabel;
        }
      } else {
        //in case of point show abbr from nls as unit(s)
        unitsAbbr = this.nls.workBench.units;
        lengthColTitle = this.nls.statisticsType.countLabel;
      }
      //Create header row to show col titles (objectId, length, cost)
      tableHeaderRow = domConstruct.create("tr", {}, detailsTableBody);
      //Create col titles
      domConstruct.create("td", {
        "innerHTML": this.nls.workBench.objectIdColTitle
      }, tableHeaderRow);
      domConstruct.create("td", {
        "innerHTML": lengthColTitle
      }, tableHeaderRow);
      domConstruct.create("td", {
        "innerHTML": this.nls.workBench.costColTitle
      }, tableHeaderRow);
      //loop through each feature and create row for individual asset
      array.forEach(features, lang.hitch(this, function (feature) {
        var cost, unitsValue, tableRow;
        tableRow = domConstruct.create("tr", {
          "class": "esriCTSelectableRow"
        }, detailsTableBody);
        unitsValue = feature.featureDimension;
        domAttr.set(tableRow, "templateName", groupInfo.templateName);
        domAttr.set(tableRow, "region", groupInfo.regionName);
        domAttr.set(tableRow, "scenario", groupInfo.scenario);
        domAttr.set(tableRow, "layerId", groupInfo.layerId);
        domAttr.set(tableRow, "objectId", feature.attributes[layerObjectID]);
        this.own(on(tableRow, "click", lang.hitch(this, this._rowClick)));
        //show polygon and polyline units with 2 decimals only, dont apply rounding for points
        if (features[0].geometry.type !== "point") {
          unitsValue = this.appUtils.applyRounding(unitsValue);
        }
        domConstruct.create("td", { "innerHTML": feature.attributes[layerObjectID] }, tableRow);
        domConstruct.create("td", { "innerHTML": unitsValue + " " + unitsAbbr }, tableRow);
        cost = this.config.generalSettings.currency + " " +
          this.appUtils.applyRounding(feature.individualCost);
        domConstruct.create("td", {
          "innerHTML": cost,
          "class": "esriCTAssetItemDetailsCostingValue"
        }, tableRow);
        totalCost += feature.individualCost;
        totalFeatureDimensions += feature.featureDimension;
      }));
      //if geometry is not point apply rounding to totalFeatureDimensions
      if (features[0].geometry.type !== "point") {
        totalFeatureDimensions = this.appUtils.applyRounding(totalFeatureDimensions);
      }
      //create table for showing total length and total cost
      totalTable = domConstruct.create("table", {
        "style": { "width": "100%" },
        "class": "esriCTTable"
      }, detailsDiv);
      totalHeaderRow = domConstruct.create("tr", {}, domConstruct.create("tbody", {}, totalTable));
      domConstruct.create("td", {
        "class": "esriCTGroupSummaryTotalTitle",
        "innerHTML": "Total:"
      }, totalHeaderRow);
      domConstruct.create("td", {
        "innerHTML": totalFeatureDimensions + " " + unitsAbbr
      }, totalHeaderRow);
      //show total cost along with currency
      totalCost = this.config.generalSettings.currency + " " +
        this.appUtils.applyRounding(totalCost);
      domConstruct.create("td", {
        "innerHTML": totalCost,
        "class": "esriCTGroupSummaryTotalCost"
      }, totalHeaderRow);
    },

    /**
    * Update the contents asset details
    * @memberOf widgets/CostAnalysis/asset-details
    */
    showAssetDetails: function (assetDetails) {
      var index, hasAnyDetails = false;
      this.assetDetails = assetDetails;
      //loop through all the layers and set their details
      for (var layerId in this._layerDetailsNode) {
        index = this._layerIndexes.indexOf(layerId);
        //Empty contents of the layer details div
        domConstruct.empty(this._layerDetailsNode[layerId]);
        //Hide the item of this layer in itemList
        this.itemList.hide(index);
        //check if current assetDetails has info for this layer id
        if (assetDetails.hasOwnProperty(layerId)) {
          //For each group create asset details table
          for (var templateName in assetDetails[layerId]) {
            for (var regionName in assetDetails[layerId][templateName]) {
              for (var scenario in assetDetails[layerId][templateName][regionName]) {
                var groupId, features, groupInfo, detailsDiv, titleParent,
                  rName = regionName, sName = scenario, displayTitle;
                displayTitle = templateName + " ";
                //Get all the features of this group
                features = assetDetails[layerId][templateName][regionName][scenario];
                //Create asset details only when features available
                if (features.length > 0) {
                  //Create group info object
                  //Note: Assuming all the features in group have same cost equation
                  groupInfo = {
                    "templateName": templateName,
                    "regionName": regionName,
                    "scenario": scenario,
                    "layerId": layerId,
                    "equation": features[0].templateInfo.COSTEQUATION
                  };
                  //Show none text when keys is null
                  if (rName === "null") {
                    rName = this.nls.scenarioSelection.noneText;
                  } else {
                    displayTitle += string.substitute(this.nls.assetDetails.inGeography,
                      { "geography": rName });
                  }
                  if (sName === "null") {
                    sName = this.nls.scenarioSelection.noneText;
                  } else {
                    displayTitle += string.substitute(this.nls.assetDetails.withScenario,
                      { "scenario": sName });
                  }
                  //Create group id concating all the values
                  groupId = layerId + " - " + templateName + " - " + rName + " - " + sName;
                  //Remove space. If string has leading/trailing spaces query by attribute fails
                  groupId = lang.trim(groupId);
                  detailsDiv = domConstruct.create("div", {
                    "class": "esriCTGroupSummary"
                  }, this._layerDetailsNode[layerId]);
                  titleParent = domConstruct.create("div", {
                    "class": "esriCTGroupTitleParent"
                  }, detailsDiv);
                  //Create expand collapse button to show/hide individual asset table
                  this._createExpandCollapseButton(titleParent, groupId, layerId);
                  //Create div to show group title
                  domConstruct.create("div", {
                    "class": "esriCTGroupTitle",
                    "innerHTML": displayTitle
                  }, titleParent);
                  //Create button to edit equation of the group
                  this._createEditEquationButton(titleParent, groupInfo);
                  //Create asset detains table for eah group
                  this._createAssetDetailsTable(detailsDiv, groupId, features, groupInfo);
                  //Once we have some data for the layer show its item in item list
                  this.itemList.show(index);
                  //As we have some data to show raise the flag so that error msg will not be shown
                  hasAnyDetails = true;
                }
              }
            }
          }
        }
      }
      //Based on if we have some data, show/hide error and details panel
      if (hasAnyDetails) {
        domClass.add(this.noAssetDetails, "esriCTHidden");
      } else {
        domClass.remove(this.noAssetDetails, "esriCTHidden");
      }
    },

    /**
    * Open tooltip dialog
    * @memberOf widgets/CostAnalysis/asset-details
    */
    _openPopupDialog: function (dialog, evt) {
      popup.open({
        popup: dialog,
        x: evt.pageX,
        y: evt.pageY
      });
    },

    /**
     * Close tooltip dialog
     * @memberOf widgets/CostAnalysis/asset-details
     * */
    _closePopupDialog: function () {
      popup.close(this.assetDetailsDialog);
      query(".esriCTRowSelected", this.assetDetailsNode).removeClass("esriCTRowSelected");
    },

    /**
    * Initialize Cost Equation Editor
    * @memberOf widgets/CostAnalysis/asset-details
    */
    _initCostEquationEditor: function () {
      if (!this._costEquationEditor) {
        this._costEquationEditor = new CostEquationEditor({
          nls: this.nls,
          map: this.map,
          config: this.config,
          appUtils: this.appUtils
        }, domConstruct.create("div", {}, this.costEquationEditorParent));
        this.own(on(this._costEquationEditor, "onOkButtonClicked",
          lang.hitch(this, function (updatedGroupInfo) {
            this.emit("groupCostEquationUpdated", updatedGroupInfo);
            domClass.add(this.costEquationEditorParent, "esriCTHidden");
            domClass.remove(this.assetDetailsParent, "esriCTHidden");
          })));
        this.own(on(this._costEquationEditor, "onCancelButtonClicked",
          lang.hitch(this, function () {
            domClass.add(this.costEquationEditorParent, "esriCTHidden");
            domClass.remove(this.assetDetailsParent, "esriCTHidden");
          })));
        this._costEquationEditor.startup();
      }
    },

    /**
    * Check whether target node is part of the popup or not
    * @memberOf widgets/CostAnalysis/asset-details
    */
    isPartOfPopup: function (target) {
      var node, isInternal;
      node = this.assetDetailsDialog.domNode;
      isInternal = target === node || html.isDescendant(target,
        node);
      return isInternal;
    },

    /**
     * Shows calculated gross cost in table and updates additional cost info table
     * @memberOf widgets/CostAnalysis/asset-details
     */
    grossCostUpdated: function (totalCost, grossCost, additionalCostInfo) {
      var roundedGrossCost =
        this.appUtils.roundProjectCostValue(this.config.generalSettings.roundCostType, grossCost);
      roundedGrossCost = this.config.generalSettings.currency + " " + roundedGrossCost;
      //Show calculated gross cost in table
      domAttr.set(this.grossCost, "innerHTML", roundedGrossCost);
      //Update additional cost info table
      this._updateAdditionalCostTable(totalCost, additionalCostInfo);
    },

    /**
     * Shows calculated total cost in table
     * @memberOf widgets/CostAnalysis/asset-details
     */
    totalCostUpdated: function (totalCost) {
      var totalRoundedCost;
      //show rounded total cost in widget panel
      totalRoundedCost = this.appUtils.roundProjectCostValue(
        this.config.generalSettings.roundCostType, totalCost);
      totalRoundedCost = this.config.generalSettings.currency + " " + totalRoundedCost;
      domAttr.set(this.totalCost, "innerHTML", totalRoundedCost);
    },

    /**
     * Updates the additional cost details in table
     * @memberOf widgets/CostAnalysis/asset-details
     */
    _updateAdditionalCostTable: function (totalCost, additionalCostInfo) {
      var netValue, i, tr1;
      //First empty prev additional cost info
      domConstruct.empty(this.additionalCostTable);
      //If additional cost exist then only create rows to show details
      if (additionalCostInfo.length > 0) {
        //Create header row and show headers in it
        tr1 = domConstruct.create('tr');
        tr1.appendChild(domConstruct.create('td', {
          "innerHTML": this.nls.assetDetails.additionalCostLabel
        }));
        tr1.appendChild(domConstruct.create('td', {
          "innerHTML": this.nls.assetDetails.additionalCostValue
        }));
        tr1.appendChild(domConstruct.create('td', {
          "innerHTML": this.nls.assetDetails.additionalCostNetValue
        }));
        this.additionalCostTable.appendChild(tr1);
        netValue = totalCost;
        //Loop through all the additional cost info and add rows in table
        for (i = 0; i < additionalCostInfo.length; i++) {
          var costInfo, tr, displayValue;
          //Create row to show each additional cost info
          tr = domConstruct.create('tr');
          costInfo = additionalCostInfo[i];
          //Based in on type perform the operation
          switch (costInfo.type) {
            case '+':
              netValue += costInfo.value;
              displayValue = netValue;
              break;
            case '_':
              netValue -= costInfo.value;
              displayValue = netValue;
              break;
            case '*':
              netValue *= costInfo.value;
              displayValue = netValue;
              break;
          }
          //Round of the display value
          displayValue = this.appUtils.roundProjectCostValue(
            this.config.generalSettings.roundCostType, displayValue);
          displayValue = this.config.generalSettings.currency + " " + displayValue;
          tr.appendChild(domConstruct.create('td', { "innerHTML": costInfo.label }));
          tr.appendChild(domConstruct.create('td', { "innerHTML": costInfo.value }));
          tr.appendChild(domConstruct.create('td', {
            "innerHTML": displayValue,
            "class": "esriCTAssetItemDetailsNetValue"
          }));
          this.additionalCostTable.appendChild(tr);
        }
      }
    }
  });
});