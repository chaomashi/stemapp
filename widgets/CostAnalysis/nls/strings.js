///////////////////////////////////////////////////////////////////////////
// Copyright © 2017 Esri. All Rights Reserved.
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

define({
  root: ({
    _widgetLabel: "Cost Analysis Beta",
    unableToFetchInfoErrMessage: "Unable to fetch geometry service/configured layer details",
    invalidCostingGeometryLayer: "Unable to get 'esriFieldTypeGlobalID' in costing geometry layer.",
    projectLayerNotFound: "Unable to find the configured project layer in map.",
    costingGeometryLayerNotFound: "Unable to find the configured costing geometry layer in map.",
    projectMultiplierTableNotFound: "Unable to find the configured project multiplier additional cost table in map.",
    projectAssetTableNotFound: "Unable to find the configured project asset table in map.",
    createLoadProject: {
      createProjectPaneTitle: "Create Project",
      loadProjectPaneTitle: "Load Project",
      projectNamePlaceHolder: "Project Name",
      projectDescPlaceHolder: "Project Description",
      selectProject: "Select Project",
      viewInMapLabel: "View In Map",
      loadLabel: "Load",
      createLabel: "Create",
      deleteProjectConfirmationMsg: "Are you sure you want to delete the project?",
      noAssetsToViewOnMap: "Selected project don't have any assets to view on map.",
      projectDeletedMsg: "Project deleted successfully.",
      errorInCreatingProject: "Error in creating project.",
      errorProjectNotFound: "Project not found.",
      errorInLoadingProject: "Please check if valid project is selected.",
      errorProjectNotSelected: "Select a project from the dropdown",
      errorDuplicateProjectName: "Project name already exist."
    },
    statisticsSettings: {
      tabTitle: "Statistics settings",
      addStatisticsLabel: "Add Statistics",
      addNewStatisticsText: "Add New Statistics",
      deleteStatisticsText: "Delete Statistics",
      moveStatisticsUpText: "Move Statistics Up",
      moveStatisticsDownText: "Move Statistics Down",
      layerNameTitle: "Layer",
      statisticsTypeTitle: "Type",
      fieldNameTitle: "Field",
      statisticsTitle: "Label",
      actionLabelTitle: "Actions",
      selectDeselectAllTitle: "Select All"
    },
    statisticsType: {
      countLabel: "Count",
      averageLabel: "Average",
      maxLabel: "Maximum",
      minLabel: "Minimum",
      summationLabel: "Summation",
      areaLabel: "Area",
      lengthLabel: "Length"
    },
    costingInfo: {
      noEditableLayersAvailable: "Layer(s) needs to be checked as editable in layer settings tab"
    },
    workBench: {
      refresh: "Refresh",
      noAssetAddedMsg: "No assets added",
      units: "unit(s)",
      assetDetailsTitle: "Asset Item Details",
      costEquationTitle: "Cost Equation",
      newCostEquationTitle: "New Equation",
      defaultCostEquationTitle: "Default Equation",
      geographyTitle: "Geography",
      scenarioTitle: "Scenario",
      costingInfoHintText: "<div>Hint: Use the following keywords</div><ul><li><b>{TOTALCOUNT}</b>: Uses the total number of same type asset in a region</li><li><b>{MEASURE}</b>: Uses the length for line asset and area for polygon asset</li><li><b>{TOTALMEASURE}</b>: Uses the total length for line asset and total area for polygon asset of same type in a region</li></ul>",
      zoomToAsset: "Zoom To Asset",
      deleteAsset: "Delete Asset",
      closeDialog: "Close dialog",
      objectIdColTitle: "Object Id",
      costColTitle: "Cost",
      errorInvalidCostEquation: "Invalid Cost Equation.",
      errorInSavingAssetDetails: "Unable to save asset details.",
      costingInfoHintText: "<div>Hint: Use the following keywords</div><ul><li><b>{TOTALCOUNT}</b>: Uses the total number of same type asset in a geography</li> <li><b>{MEASURE}</b>: Uses the length for line asset and area for polygon asset</li><li><b>{TOTALMEASURE}</b>: Uses the total length for line asset and total area for polygon asset of same type in a geography</li></ul> You can use functions such as:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Please edit cost equation as per your project need."
    },
    assetDetails: {
      "inGeography": " in ${geography} ",
      "withScenario": " with ${scenario}",
      "totalCostTitle": "Total Cost",
      "additionalCostLabel": "Description",
      "additionalCostValue": "Value",
      "additionalCostNetValue": "Net Value"
    },
    projectOverview: {
      assetItemsTitle: "Asset Items",
      assetStatisticsTitle: "Asset Statistics",
      projectSummaryTitle: "Project Summary",
      projectName: "Project Name: ${name}",
      totalCostLabel: "Total Project Cost (*):",
      grossCostLabel: "Gross Project Cost (*):",
      roundingLabel: "* Rounding to '${selectedRoundingOption}'",
      unableToSaveProjectBoundary: "Unable to save project boundary in project layer.",
      unableToSaveProjectCost: "Unable to save cost(s) in project layer.",
      roundCostValues: {
				twoDecimalPoint: "Two Decimal Points",
				nearestWholeNumber: "Nearest Whole Number",
				nearestTen: "Nearest Ten",
				nearestHundred: "Nearest Hundred",
				nearestThousand: "Nearest Thousands",
				nearestTenThousands: "Nearest Ten Thousands"
			}
    },
    projectAttribute: {
      projectAttributeText: "Project Attribute",
      projectAttributeTitle: "Edit Project Attributes"
    },
    costEscalation: {
      costEscalationLabel: "Add Additional Cost",
      valueHeader: "Value",
      addCostEscalationText: "Add additional cost",
      deleteCostEscalationText: "Delete selected additional Cost",
      moveCostEscalationUpText: "Move selected additional cost up",
      moveCostEscalationDownText: "Move selected additional cost down",
      invalidEntry: "One or more entries are invalid.",
      errorInSavingCostEscalation: "Unable to save additional cost details."
    },
    scenarioSelection: {
      popupTitle: "Select Scenario for the Asset",
      regionLabel: "Geography",
      scenarioLabel: "Scenario",
      noneText: "None",
      copyFeatureMsg: "Do you want to copy selected features?"
    },
    detailStatistics: {
      detailStatisticsLabel: "Detail Statistics",
      noDetailStatisticAvailable: "No asset statistics added"
    }
  }),
  "ar": 1,
  "bs": 1,
  "cs": 1,
  "da": 1,
  "de": 1,
  "el": 1,
  "es": 1,
  "et": 1,
  "fi": 1,
  "fr": 1,
  "he": 1,
  "hi": 1,
  "hr": 1,
  "it": 1,
  "id": 1,
  "ja": 1,
  "ko": 1,
  "lt": 1,
  "lv": 1,
  "nb": 1,
  "nl": 1,
  "pl": 1,
  "pt-br": 1,
  "pt-pt": 1,
  "ro": 1,
  "ru": 1,
  "sl": 1,
  "sr": 1,
  "sv": 1,
  "th": 1,
  "tr": 1,
  "vi": 1,
  "zh-cn": 1,
  "zh-hk": 1,
  "zh-tw": 1
});