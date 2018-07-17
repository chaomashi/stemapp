///////////////////////////////////////////////////////////////////////////
// Copyright © 2016 Esri. All Rights Reserved.
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
    _widgetLabel: "Screening", // Shown as label of widget
    geometryServicesNotFound: "Geometry service not available.", // Shown as error message if geometry service is not found
    unableToDrawBuffer: "Unable to draw buffer. Please try again.", // Shown as alert message if unable to draw buffer
    invalidConfiguration: "Invalid configuration.", // Shown as alert message if configuration settings failed on widget load
    clearAOIButtonLabel: "Start Over", // Shown as label for Clear AOI Button
    noGraphicsShapefile: "The uploaded shapefile contains no graphics.", // When no graphics is present in the layer
    zoomToLocationTooltipText: "Zoom to location", // Show on hover of the zoomToLocation button
    noGraphicsToZoomMessage: "No Graphics found to zoom in.", // Show when no graphics found to zoom in on zoom button click
    placenameWidget: {
      placenameLabel: "Search for a location"
    }, // Shown as label to guide user to enter value in search box
    // Draw Tool widget
    drawToolWidget: {
      useDrawToolForAOILabel: "Select draw mode", // Shown as label to guide user to use draw tools to define AOI
      toggleSelectability: "Click to toggle selectability",
      chooseLayerTitle: "Choose selectable layer", // Shown as a title for list of layers
      selectAllLayersText: "Select All",
      layerSelectionWarningTooltip: "At least one layer should be selected for creating AOI"
    },
    // Shapefile widget
    shapefileWidget: {
      shapefileLabel: "Upload a zipped shapefile", // Shown as label to guide user to upload a shapefile to define AOI
      uploadShapefileButtonText: "Upload", // Shown as text for upload a shapefile Button
      unableToUploadShapefileMessage: "Unable to upload Shapefile." // Shown as alert message if upload to shapefile fails
    },
    // Coordinates widget
    coordinatesWidget: {
      selectStartPointFromSearchText: "Define a starting point", // Shown as label to guide user to define a start point by entering address in search box
      addButtonTitle: "Add", // Shown as title for add button
      deleteButtonTitle: "Remove", // Shown as title for remove button
      mapTooltipForStartPoint: "Click on map to define a start point", // Shown as label to guide user to click on map to select start point
      mapTooltipForUpdateStartPoint: "Click on map to update the start point", // Shown as label to guide user to click on map to update start point
      locateText: "Locate", // Shown as label text locate
      locateByMapClickText: "Select initial coordinates", // Shown as label to select initial coordinates
      enterBearingAndDistanceLabel: "Enter bearing and distance from start point", // Shown as label to guide user to enter bearing and distance from start point
      bearingTitle: "Bearing", // Shown as label text Bearing
      distanceTitle: "Distance", // Shown as label text Distance
      planSettingTooltip: "Plan Settings", // Shown as label  text Plan Settings
      invalidLatLongMessage: "Please enter valid values." // Displayed when locate is clicked & lat, long is invalid
    },
    // Buffer Distance and Unit
    bufferDistanceAndUnit: { // Shown as buffer units
      bufferInputTitle: "Buffer distance (optional)",
      bufferInputLabel: "Show results within"
    },
    // Traverse grid
    traverseSettings: {
      bearingLabel: "Bearing", // Shown as label for bearing column in traverse grid
      lengthLabel: "Length", // Shown as label for length column in traverse grid
      addButtonTitle: "Add", // Shown as title on add button
      deleteButtonTitle: "Remove" // Shown as title on delete button
    },
    // Plan settings
    planSettings: {
      expandGridTooltipText: "Expand grid", // Show on hover of the expand grid button
      collapseGridTooltipText: "Collapse grid", // Show on hover of the collapse grid button
      directionUnitLabelText: "Directions Unit",
      distanceUnitLabelText: "Distance and Length Units",
      planSettingsComingSoonText: "Coming Soon" // Message displayed on click of plan settings icon
    },
    // New traverse lines
    newTraverse: {
      invalidBearingMessage: "Invalid Bearing.", // Shown when invalid bearing is entered
      invalidLengthMessage: "Invalid Length.", // Shown when invalid length is entered
      negativeLengthMessage: "Negative Length" // Shown when negative length is entered
    },
    // Reports tab
    reportsTab: {
      aoiAreaText: "AOI area", // Shown while displaying the aoi area
      downloadButtonTooltip: "Download", // Shown as a tooltip for download button
      printButtonTooltip: "Print", // Shown as a tooltip for print button
      uploadShapefileForAnalysisText: "Upload Shapefile to include in analysis", // Shown as a message to upload shapefile to include in analysis
      uploadShapefileForButtonText: "Browse", // Shown as a label on upload shapefile button
      downloadLabelText: "Select Format :", // Shown as a helper text to select download format
      downloadBtnText: "Download",
      noDetailsAvailableText: "No results found", // Shown when no features are intersected in AOI
      featureCountText: "Count", // Shown as a prefix text to display count
      featureAreaText: "Area", // Shown as a prefix text to display area
      featureLengthText: "Length", // Shown as a prefix text to display length
      attributeChooserTooltip: "Choose attributes to display", // Shown as a tooltip on field chooser button
      csv: "CSV", // Shown as a download option
      filegdb: "File Geodatabase", // Shown as a download option
      shapefile: "Shapefile", // Shown as a download option
      noFeaturesFound: "No result found for selected file format",
      selectReportFieldTitle: "Select fields", // Shown as a title on field chooser dialog box
      noFieldsSelected: "No fields selected", // Shown when all the fields are de-selected
      intersectingFeatureExceedsMsgOnCompletion: "The maximum record count has been reached for one or more layers.", // Shown when number of features that intersects aoi exceeds its max record count
      unableToAnalyzeText: "Unable to analyze, maximum record count has been reached.", // Shown as a message on click of info button when number of features that intersects aoi exceeds its max record count
      errorInPrintingReport: "Unable to print the report. Please check if report settings are valid.", // Shown when report settings are invalid for print
      aoiInformationTitle: "Area of Interest (AOI) Information", // Shown as a title for aoi on print preview page
      summaryReportTitle: "Summary", // Shown as section title for summary report
      notApplicableText: "N/A", // Shown as text for not applicable
      downloadReportConfirmTitle: "Confirm download", // Shown as download popup title
      downloadReportConfirmMessage: "Are you sure you want to download ?", // Shown as download popup content
      noDataText: "No Data", // Shown when field data is empty in reports tab
      createReplicaFailedMessage: "Download operation failed for following layer(s) : <br/> ${layerNames}", // Shown when create replica operation fails for particular feature/map server
      extractDataTaskFailedMessage: "Download operation failed.", // Shown when extract data task operation fails for particular feature/map server
      printLayoutLabelText: "Layout", //Shown in the print dialog popup
      printBtnText: "Print", //Shown as button text in print dialog popup
      printDialogHint: "Note : The report title and comments can be edited in the report preview.", //Shown as hint text in print dialog popup
      unableToDownloadFileGDBText: "File Geodatabase cannot be downloaded for AOI containing point or line locations", // Shown when user tries to download filegdb for point/line AOI
      unableToDownloadShapefileText: "Shapefile cannot be downloaded for AOI containing point or line locations", // Shown when user tries to download shapefile for point/line AOI
      analysisUnitLabelText: "Show results in :",
      analysisUnitButtonTooltip: "Choose units for analysis", // Analysis unit button tootip text
      analysisCloseBtnText: "Close", // analysis unit setting dialog button
      feetUnit: "Feet / Square Feet", // option label for feet analysis report unit
      milesUnit: "Miles / Acres", // option label for mile analysis report unit
      metersUnit: "Meters / Square Meters", // option label for meter analysis report unit
      kilometersUnit: "Kilometers / Square Kilometers", // option label for km analysis report unit
      hectaresUnit: "Kilometers / Hectares", // option label for km/Hectares analysis report unit
      hectaresAbbr: "hectares", // hectare unit abbrevation
      layerNotVisibleText: "Unable to analyze, layer is turned off or is out of scale visibility range.", // Shown in the report panel when layer is not visible
      refreshBtnTooltip:"Refresh report",
      featureCSVAreaText: "Intersecting Area", // Shown as text to display area in csv column
      featureCSVLengthText: "Intersecting Length", // Shown as text to display length in csv column
      errorInFetchingPrintTask: "Error while fetching print task information. Please try again." // shown as error message in fetching print task information 
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