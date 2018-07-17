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
    units: { // labels shown in config UI for "Show analysis results in" dropdwn options
      feetUnit: "Feet / Square Feet",
      milesUnit: "Miles / Acres",
      metersUnit: "Meters / Square Meters",
      kilometersUnit: "Kilometers / Square Kilometers",
      hectaresUnit: "Kilometers / Hectares"
    },
    analysisTab: {
      analysisTabLabel: "Analysis", // shown as label in config UI for first tab.
      selectAnalysisLayerLabel: "Select analysis layers", // shown as main label in config UI for Add Layer section.
      addLayerLabel: "Add Layers", // shown as label in config UI for button add layer for Add Layer section.
      noValidLayersForAnalysis: "No valid layers found in the selected webmap.", // shown as label in config UI if no valid layers found in the selected webmap.
      noValidFieldsForAnalysis: "No valid fields found in the selected webmap. Please remove the selected layer.", // shown as label in config UI if no valid fields found in the selected webmap.
      addLayersHintText: "Hint: Select layers and fields to analyze and display in report", // shown as hint text in config UI for Add layers section.
      addLayerNameTitle: "Layer Name", // shown as title in config UI for add layer Name in Add Layer section.
      addFieldsLabel: "Add Field", // shown as label in config UI for button add field for Add Fields section.
      addFieldsPopupTitle: "Select Fields", // shown as title in config UI for add Fields Popup title in Add Fields section.
      addFieldsNameTitle: "Field Names", // shown as title in config UI for add Fields Name in Add Fields section.
      aoiToolsLegendLabel: "AOI Tools", // shown as legend for fieldset in config UI for AOI Tools.
      aoiToolsDescriptionLabel: "Enable tools to create areas of interest and specify their labels", // shown as label in config UI for AOI tools description label in AOI Tools
      placenameLabel: "Placename", // shown as label in config UI for placename in AOI Tools section
      drawToolsLabel: "Draw Tools", // shown as label in config UI for drawTools in AOI Tools section
      uploadShapeFileLabel: "Upload a Shapefile", // shown as label in config UI for uploadShapeFile in AOI Tools section
      coordinatesLabel: "Co-ordinates", // shown as label in config UI for coordinates in AOI Tools section
      coordinatesDrpDwnHintText: "Hint: Select unit to display entered traverses", // Shown as hint text in config UI for coordinates DropDown hint text.
      coordinatesBearingDrpDwnHintText: "Hint: Select bearing to display entered traverses", // Shown as hint text in config UI for coordinates DropDown hint text.
      allowShapefilesUploadLabel: "Allow uploading shapefiles to analysis", // shown as main label in config UI for allow uploading shapefiles section.
      allowShapefilesUploadLabelHintText: "Hint: Display 'Upload shapefile in Analysis' in Report Tab", // Shown as hint text in config UI for area units DropDown hint text.
      allowVisibleLayerAnalysisLabel: "Do not analyze or report results for layers that are not visible", // shown as main label in config UI for allow invisble layer analysis option section.
      allowVisibleLayerAnalysisHintText: "Hint: Layers that have been turned off or are not visible due to scale visibility settings will not be analyzed or included in printed or downloaded results.", // Shown as hint text in config UI for allow invisble layer analysis option section.
      areaUnitsLabel: "Show analysis results in", // shown as main label in config UI for area units dropdown section.
      maxFeatureForAnalysisLabel: "Max features for analysis", // Shown as the label for max features for analysis
      maxFeatureForAnalysisHintText: "Hint: Set the maximum number of features for analysis", // Shown as the hint text for max features for analysis
      searchToleranceLabelText: "Search tolerance", // Shown as label in config UI for search tolerance
      searchToleranceHint: "Hint : The search tolerance is only used when analyzing point and line inputs", // Shown as the hint text for search tolerance
      placenameButtonText: "Placename",
      drawToolsButtonText: "Draw",
      shapefileButtonText: "Shapefile",
      coordinatesButtonText: "Coordinates",
      invalidLayerErrorMsg: "Please configure the fields for"
    },
    downloadTab: {
      downloadLegend: "Download Settings", // Shown as fieldset legend for download settings
      reportLegend: "Report Settings", // Shown as fieldset legend for report settings
      downloadTabLabel: "Download", // Shown as the label of the tab
      syncEnableOptionLabel: "Feature Layers", // Shown as the label for sync enable download option
      syncEnableOptionHint: "Hint: Used to download feature information for features intersecting the area of interest in the indicated formats.", // Shown as the hint text for sync enable download option
      syncEnableOptionNote: "Note: Sync enabled feature services are required for File Geodatabase and Shapefile options. Shapefile format is only supported with ArcGIS Online hosted feature layers.", // Shown as the special note in the hint text for sync enable download option
      extractDataTaskOptionLabel: "Extract Data Task geoprocessing service", // Shown as the label for extract data task download option
      extractDataTaskOptionHint: "Hint: Use a published Extract Data Task geoprocessing service to download features that intersect the area of interest in File Geodatabase or Shapefile formats.", // Shown as the hint for extract data task download option
      cannotDownloadOptionLabel: "Disable download", // Shown as the label for disabling download option in widget
      syncEnableTableHeaderTitle: {
        layerNameLabel: "Layer name", // Shown as the table header for layer name
        csvFileFormatLabel: "CSV", // Shown as the table header for CSV file format
        fileGDBFormatLabel: "File Geodatabase", // Shown as the table header for File Geodatabase file format
        ShapefileFormatLabel: "Shapefile", // Shown as the table header for Shapefile file format
        allowDownloadLabel: "Allow Download" // Shown as the table header for allowing download option checkboxes for the respective layers
      },
      setButtonLabel: "Set", // Shown as the Set button label for selecting gp service for both Extract data task and Print task service
      GPTaskLabel: "Specify url to geoprocessing service", // Shown as the label for selecting print task gp service
      printGPServiceLabel: "Print Service URL", // Shown as the label to specify print service url
      setGPTaskTitle: "Specify required Geoprocessing Service URL", // Shown as the title of the popup for selecting geoprocessing url
      logoLabel: "Logo", // Shown as the label for selecting logo
      logoChooserHint: "Hint: Click on image icon to change the image", // Shown as the hint for logo chooser
      footnoteLabel: "Footnote", // Shown as the label for footnote textarea
      columnTitleColorPickerLabel: "Color for column titles", // Shown as the label for table header color picker
      reportTitleLabel: "Report Title", // Shown as the label for report title
      errorMessages: {
        invalidGPTaskURL: "Invalid geoprocessing service. Please select geoprocessing service containing Extract Data Task.", // Shown as the error message on selecting invalid geoprocessing service
        noExtractDataTaskURL: "Please select any geoprocessing service containing Extract Data Task.", // Shown as the error message when no geoprocessing service is selected on setting the configuration
        duplicateCustomOption: "Duplicate entry for  \${duplicateValueSizeName}\ exists.", // Shown as the error message when duplicate entry for layout option found
        invalidLayoutWidth: "Invalid width entered for \${customLayoutOptionValue}\.", // Shown as the error message when invalid width entry for layout option found
        invalidLayoutHeight: "Invalid height entered for \${customLayoutOptionValue}\.", // Shown as the error message when invalid height entry for layout option found
        invalidLayoutPageUnits: "Invalid page unit selected for \${customLayoutOptionValue}\.", // Shown as the error message when invalid page unit is selected for layout option
        failtofetchbuddyTaskDimension: "Error while fetching buddy task dimension information. Please try again.", // shown as error message on failure of fetching buddy task dimension
        failtofetchbuddyTaskName: "Error while fetching buddy task name. Please try again.", //shown as the error message on failure of fetching buddy task name. 
        failtofetchChoiceList: "Error while fetching choice list from print service. Please try again.", // Shown as the error message on failure of fetching choice list from print service
        invalidWidth: "Invalid Width.", // shown as error message when invalid width entered in width validation textbox 
        invalidHeight: "Invalid Height." // shown as error message when invalid height entered in height validation textbox 
      },
      addCustomLayoutTitle: "Add Custom Layout", // shown as the label for add custom layout
      customLayoutOptionHint: "Hint: Add custom layout option from your print service to the print options.", // shown as the hint for add custom layout
      reportDefaultOptionLabel: "Default Layout", // shown as the label for default option label
      pageSizeUnits: {
        millimeters: "Millimeters",
        points: "Points"
      }
    },
    generalTab: {
      generalTabLabel: "General", // shown as label in config UI for third tab
      tabLabelsLegend: "Panel Labels", // shown as label in config UI for Tab Labels Fieldset legend
      tabLabelsHint: "Hint: Specify Labels", // shown as hint in config UI for Tab Labels Fieldset
      AOITabLabel: "Area of Interest Panel", // shown as label in config UI for Tab Labels Fieldset AOI Tab Option
      ReportTabLabel: "Report Panel", // shown as label in config UI for Tab Labels Fieldset Report Tab Option
      bufferSettingsLegend: "Buffer Settings", // shown as label in config UI for Buffer Settings Fieldset legend
      defaultBufferDistanceLabel: "Default Buffer Distance", // shown as label in config UI for Buffer Settings Fieldset Default Buffer Distance Option
      defaultBufferUnitsLabel: "Buffer Units", // shown as label in config UI for Buffer Settings Fieldset Default Buffer Units Option
      generalBufferSymbologyHint: "Hint: Set symbology to be used for displaying buffers around defined areas of interest", // shown as hint in config UI for Buffer Settings Fieldset for Buffer Symbology Option
      aoiGraphicsSymbologyLegend: "AOI Graphics Symbology", // shown as label in config UI for AOI Graphics Symbology Fieldset legend
      aoiGraphicsSymbologyHint: "Hint: Set symbology to be used while defining point, line and polygon areas of interest", // shown as hint in config UI for AOI Graphics Symbology Fieldset
      pointSymbologyLabel: "Point", // shown as label in config UI for AOI Graphics Symbology Fieldset point Symbology
      previewLabel: "Preview", // shown as label in config UI for AOI Graphics Symbology Fieldset preview
      lineSymbologyLabel: "Line", // shown as label in config UI for AOI Graphics Symbology Fieldset line Symbology
      polygonSymbologyLabel: "Polygon", // shown as label in config UI for AOI Graphics Symbology Fieldset polygon Symbology
      aoiBufferSymbologyLabel: "Buffer Symbology", // shown as label in config UI for AOI Graphics Symbology Fieldset AOI Symbology
      pointSymbolChooserPopupTitle: "Address or location symbol", // shown as title in config UI for Symbol chooser popup for point symbology
      polygonSymbolChooserPopupTitle: "Select symbol to highlight polygon", // shown as title in config UI for Symbol chooser popup for polygon symbology
      lineSymbolChooserPopupTitle: "Select symbol to highlight line", // shown as title in config UI for Symbol chooser popup for line symbology
      aoiSymbolChooserPopupTitle: "Set buffer symbol", // shown as title in config UI for Symbol chooser popup for aoi symbology
      aoiTabText: "AOI",
      reportTabText: "Report",
      invalidSymbolValue: "Invalid symbol value."
    },
    searchSourceSetting: {
      searchSourceSettingTabTitle: "Search Source Settings", // shown as a label in config UI dialog box for search source setting
      searchSourceSettingTitle: "Search Source Settings", // shown as a label in config UI dialog box for search source setting
      searchSourceSettingTitleHintText: "Add and configure geocode services or feature layers as search sources. These specified sources determine what is searchable within the search box", // shown as a hint text in config UI dialog box for search source setting
      addSearchSourceLabel: "Add Search Source", // Shown as a label in config UI for button
      featureLayerLabel: "Feature Layer", // Shown as a label in config UI for dropDown menu
      geocoderLabel: "Geocoder", // Shown as a label in config UI for dropDown menu
      generalSettingLabel: "General Setting", // Shown as a label in config UI
      allPlaceholderLabel: "Placeholder text for searching all:", // Shown as a label in config UI
      allPlaceholderHintText: "Hint: Enter text to be shown as placeholder while searching all layers and geocoder", // shown as a hint text in config UI
      generalSettingCheckboxLabel: "Show pop-up for the found feature or location", // Shown as a label of checkbox
      countryCode: "Country or Region Code(s)", // Shown as a label in config UI
      countryCodeEg: "e.g. ", // Shown as a placeholder in config UI
      countryCodeHint: "Leaving this value blank will search all countries and regions", // Shown as a hint text in config UI for country code textbox
      questionMark: "?", //Shown as a question mark in config UI for help
      searchInCurrentMapExtent: "Only search in current map extent", // Shown as a label in config UI for checkbox
      zoomScale: "Zoom Scale", // Shown as a label in config UI
      locatorUrl: "Geocoder URL", // Shown as a label in config UI for layer chooser
      locatorName: "Geocoder Name", // Shown as a label in config UI
      locatorExample: "Example", // Shown as a label in config UI
      locatorWarning: "This version of geocoding service is not supported. The widget supports geocoding service 10.0 and above.",
      locatorTips: "Suggestions are not available because the geocoding service doesn't support suggest capability.",
      layerSource: "Layer Source", // Shown as a label in config UI
      setLayerSource: "Set Layer Source", // Shown as a popup title while selecting layers
      setGeocoderURL: "Set Geocoder URL", // Shown as a popup title while selecting geocoder URL
      searchLayerTips: "Suggestions are not available because the feature service doesn't support pagination capability.", // Show as msg if suggestions would not be available
      placeholder: "Placeholder Text", // Shown as a placeholder in config UI
      searchFields: "Search Fields", // Shown as a label in config UI
      displayField: "Display Field", // Shown as a label in config UI
      exactMatch: "Exact Match", // Shown as a label in config UI for checkbox
      maxSuggestions: "Maximum Suggestions", // Shown as a label in config UI
      maxResults: "Maximum Results", // Shown as a label in config UI
      enableLocalSearch: "Enable local search", // Shown as a label in config UI for checkbox
      minScale: "Min Scale", // Shown as a label in config UI
      minScaleHint: "When the map scale is larger than this scale, local search will be applied",
      radius: "Radius", // Shown as a label in config UI
      radiusHint: "Specifies the radius of an area around current map center that is used to boost the rank of geocoding candidates so that candidates closest to the location are returned first", // Shown as a hint for radius
      setSearchFields: "Set Search Fields", // Shown as a title for selecting search fields
      set: "Set", // Shown as a label in config UI for button
      invalidUrlTip: "The URL ${URL} is invalid or inaccessible.", // Shown as error message if URL is invalid
      invalidSearchSources: "Invalid search source settings" // Show as error msg if search source settings are invalid
    },
    errorMsg: {
      textboxFieldsEmptyErrorMsg: "Please fill the required fields", // Shown as error message if textbox fields are empty.
      bufferDistanceFieldsErrorMsg: "Please enter valid values", // Shown as error message if number textbox fields has invalid values.
      invalidSearchToleranceErrorMsg: "Please enter a valid value for search tolerance", // Shown as error message if search tolerance textbox has invalid values.
      atLeastOneCheckboxCheckedErrorMsg: "Invalid configuration: At least one AOI Tool is required.", // Shown as error message if no checkbox field checked in AOI Tools section.
      noLayerAvailableErrorMsg: "No layers available", // Shown as error message if no valid layer available.
      layerNotSupportedErrorMsg: "Not Supported ", // Shown as error message if layer type is not supported.
      noFieldSelected: "Please use the edit action to select fields for analysis.", // Shown as error message if no field selected for add layers section
      duplicateFieldsLabels: "Duplicate label \"${labelText}\" added for : \"${itemNames}\"", // Shown as error message if duplicate labels selected for layers/ fields in add layers section
      noLayerSelected: "Please select at least one layer for analysis", // Shown as error message if no layer selected for add layers section
      errorInSelectingLayer: "Unable to complete the operation of selecting layer. Please try again.", // Shown as error message when error in selecting layer in dropdown
      errorInMaxFeatureCount: "Please enter valid max features count for analysis." // Shown as an error message if max count is less then 1 or invalid
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