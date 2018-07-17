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
		configText: "Set config text:",
		generalSettings: {
			tabTitle: "General settings",
			measurementUnitLabel: "Measurement Unit",
			currencyLabel: "Measurement Symbol",
			roundCostLabel: "Round Cost",
			projectOutputSettings: "Project Output Settings",
			typeOfProjectAreaLabel: "Type Of Project Area",
			bufferDistanceLabel: "Buffer Distance",
			roundCostValues: {
				twoDecimalPoint: "Two Decimal Points",
				nearestWholeNumber: "Nearest Whole Number",
				nearestTen: "Nearest Ten",
				nearestHundred: "Nearest Hundred",
				nearestThousand: "Nearest Thousands",
				nearestTenThousands: "Nearest Ten Thousands"
			},
			projectAreaType: {
				outline: "Outline",
				buffer: "Buffer"
			},
			errorMessages: {
				currency: "Invalid currency unit",
				bufferDistance: "Invalid buffer distance",
				outOfRangebufferDistance: "The value should be greater than 0 and less than or equal to 100"
			}
		},
		projectSettings: {
			tabTitle: "Project settings",
			costingGeometrySectionTitle: "Define geography for costing (optional)",
			costingGeometrySectionNote: "Note: Configuring this layer will allow user to set cost equations of feature templates based on geographies.",
			projectTableSectionTitle: "Ability to Save/Load project settings (optional)",
			projectTableSectionNote: "Note: Configuring all the tables and layers will allow user to save/load project for later use.",
			costingGeometryLayerLabel: "Costing Geometry Layer",
			fieldLabelGeography: "Field to Label Geography",
			projectAssetsTableLabel: "Project Assets Table",
			projectMultiplierTableLabel: "Project Multiplier Additional Cost Table",
			projectLayerLabel: "Project Layer",
			configureFieldsLabel: "Configure Fields",
			fieldDescriptionHeaderTitle: "Field Description",
			layerFieldsHeaderTitle: "Layer Field",
			selectLabel: "Select",
			//fieldDescriptionLabels: ["ID", "Project Name", "Description", "Total Cost", "Gross Cost"],
			errorMessages: {
				duplicateLayerSelection: "${layerName} is already been selected",
				invalidConfiguration: "Please select ${fieldsString}"
			},
			costingGeometryHelp: "<p>Polygon layer(s) with following conditions will be shown: <br/> <li>	Layer must have “Query” capability</li><li>	Layer must have a GlobalID field</li></p>",
			fieldToLabelGeographyHelp: "<p>String and numeric fields of the selected “Costing Geometry Layer” will be displayed in the “Field to Label Geography” dropdown.</p>",
			projectAssetsTableHelp: "<p>Table(s) with following conditions will be shown: <br/> <li>Table must have editing capabilities namely “Create”, “Delete” and “Update”</li>    <li>Table must have six fields with exact name and data type:</li><ul><li>	AssetGUID (GUID type field)</li><li>	CostEquation (String type field)</li><li>	Scenario (String type field)</li><li>	TemplateName (String type field)</li><li>    GeographyGUID (GUID type field)</li><li>	ProjectGUID (GUID type field)</li></ul> </p>",
			projectMultiplierTableHelp: "<p>Table(s) with following conditions will be shown: <br/> <li>Table must have editing capabilities namely “Create”, “Delete” and “Update”</li>    <li>Table must have five fields with exact name and data type:</li><ul><li>	Description (String type field)</li><li>	Type (String type field)</li><li>	Value (Float/Double type field)</li><li>	Costindex (Integer type field)</li><li>   	ProjectGUID (GUID type field))</li></ul> </p>",
			projectLayerHelp: "<p>Polygon layer(s) with following conditions will be shown: <br/> <li>Layer must have editing capabilities namely “Create”, “Delete” and “Update”</li>    <li>Layer must have five fields with exact name and data type:</li><ul><li>ProjectName (String type field)</li><li>Description (String type field)</li><li>Totalassetcost (Float/Double type field)</li><li>Grossprojectcost (Float/Double type field)</li><li>GlobalID (GlobalID type field)</li></ul> </p>"
		},
		layerSettings: {
			tabTitle: "Layer settings",
			layerNameHeaderTitle: "Layer name",
			layerNameHeaderTooltip: "List of layers in the map",
			EditableLayerHeaderTitle: "Editable",
			EditableLayerHeaderTooltip: "Include layer and its templates in the costing widget",
			SelectableLayerHeaderTitle: "Selectable",
			SelectableLayerHeaderTooltip: "Geometry from feature can be used to generate a new cost item",
			fieldPickerHeaderTitle: "Project ID (optional)",
			fieldPickerHeaderTooltip: "Optional field (of type string) to store the Project ID in",
			selectLabel: "Select",
			noAssetLayersAvailable: "No asset layer found in the selected webmap", // shown as label in config UI if no asset layers found in the selected webmap.
			disableEditableCheckboxTooltip: "This layer has no editing capabilities",
			missingCapabilitiesMsg: "This layer is missing following capabilities:",
			missingGlobalIdMsg: "This layer does not have GlobalId field",
			create: "Create",
			update: "Update",
			delete: "Delete"
		},
		costingInfo: {
			tabTitle: "Costing Info",
			proposedMainsLabel: "Proposed Mains",
			addCostingTemplateLabel: "Add Costing Template",
			manageScenariosTitle: "Manage Scenarios",
			featureTemplateTitle: "Feature Template",
			costEquationTitle: "Cost Equation",
			geographyTitle: "Geography",
			scenarioTitle: "Scenario",
			actionTitle: "Actions",
			scenarioNameLabel: "Scenario Name",
			addBtnLabel: "Add",
			srNoLabel: "No.",
			deleteLabel: "Delete",
			duplicateScenarioName: "Duplicate scenario name",
			hintText: "<div>Hint: Use the following keywords</div><ul><li><b>{TOTALCOUNT}</b>: Uses the total number of same type asset in a geography</li><li><b>{MEASURE}</b>: Uses the length for line asset and area for polygon asset</li><li><b>{TOTALMEASURE}</b>: Uses the total length for line asset and total area for polygon asset of same type in a geography</li></ul>You can use functions such as:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Please edit cost equation as per your project need.",
			noneValue: "None",
			requiredCostEquation: "Invalid cost equation for ${layerName} : ${templateName}",
			duplicateTemplateMessage: "Duplicate template entry exists for ${layerName} : ${templateName}",
			defaultEquationRequired: "Default equation is required for ${layerName} : ${templateName}",
			validCostEquationMessage: "Please enter valid cost equation",
			costEquationHelpText: "Please edit cost equation as per your project need",
			scenarioHelpText: "Please select scenario as per your project need",
			copyRowTitle: "Copy Row",
			noTemplateAvailable: "Please add atleast one template for ${layerName}",
			manageScenarioLabel: "Manage scenario",
			noLayerMessage: "Please enter atleast one layer in ${tabName}",
			noEditableLayersAvailable: "Layer(s) needs to be checked as editable in layer settings tab"
		},
		statisticsSettings: {
			tabTitle: "Statistics settings",
			addStatisticsLabel: "Add Statistics",
			fieldNameTitle: "Field",
			statisticsTitle: "Label",
			addNewStatisticsText: "Add New Statistics",
			deleteStatisticsText: "Delete Statistics",
			moveStatisticsUpText: "Move Statistics Up",
			moveStatisticsDownText: "Move Statistics Down",
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
