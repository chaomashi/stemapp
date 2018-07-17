/*
 | Copyright 2017 Esri
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
define({
  root: ({
    searchSourceSetting: {
      title: "Search and Buffer Settings", // tab label for choosing the sources for searches and for configuring buffering
      mainHint: "You can enable text searches of addresses and features, geometry digitizing, and buffering."
    },
    addressSourceSetting: {
      title: "Address Layers", // tab label for choosing the feature layers that contain address labels in their popups
      mainHint: "You can specify which addressee label layer(s) are available."
    },
    notificationSetting: {
      title: "Notification Options", // tab label for choosing label formats and printing options
      mainHint: "You can specify which types of notification are available."
    },
    groupingLabels: {  // Labels for boxes containing a group of configuration items
      addressSources: "Layer to use to select addressee layers",
      averyStickersDetails: "Avery(r) stickers",
      csvDetails: "Comma-separated values (CSV) file",
      drawingTools: "Drawing tools for specifying area",
      featureLayerDetails: "Feature layer",
      geocoderDetails: "Geocoder",
      labelFormats: "Available label formats",
      printingOptions: "Options for printed label pages",
      searchSources: "Search sources",
      stickerFormatDetails: "Label page parameters"
    },
    hints: {  // Explanations of configuration items
      alignmentAids: "Marks added to label page to help you to align the page with your printer",
      csvNameList: "A comma-separated list of case-sensitive field names",
      horizontalGap: "Space between two labels in a row",
      insetToLabel: "Space between side of label and start of text",
      labelFormatDescription: "How label style is presented in widget format options list",
      labelFormatDescriptionHint: "Tooltip to supplement description in format options list",
      labelHeight: "Height of each label on the page",
      labelWidth: "Width of each label on the page",
      localSearchRadius: "Specifies the radius of an area around the current map center that is used to boost the rank of geocoding candidates so that candidates closest to the location are returned first",
      rasterResolution: "100 pixels per inch approximately matches screen resolution. The higher the resolution, the more browser memory is needed. Browsers differ in their ability to gracefully handle large memory demands.",
      selectionListOfOptionsToDisplay: "Checked items are displayed as options in the widget; change ordering as desired",
      verticalGap: "Space between two labels in a column"
    },
    propertyLabels: {  // Labels for individual property items
      bufferDefaultDistance: "Default buffer distance",
      bufferUnits: "Buffer units to provide in widget",
      countryRegionCodes: "Country or region codes",
      description: "Description",
      descriptionHint: "Description hint",
      displayField: "Display field",
      drawingToolsFreehandPolygon: "freehand polygon",
      drawingToolsLine: "line",
      drawingToolsPoint: "point",
      drawingToolsPolygon: "polygon",
      drawingToolsPolyline: "polyline",
      enableLocalSearch: "Enable local search",
      exactMatch: "Exact match",
      fontSizeAlignmentNote: "Font size for note about print margins",
      gridDarkness: "Grid darkness",
      gridlineLeftInset: "Left gridline inset",
      gridlineMajorTickMarksGap: "Major tick marks every",
      gridlineMinorTickMarksGap: "Minor tick marks every",
      gridlineRightInset: "Right gridline inset",
      labelBorderDarkness: "Label border darkness",
      labelBottomEdge: "Bottom edge of labels on page",
      labelFontSize: "Font size",
      labelHeight: "Label height",
      labelHorizontalGap: "Horizontal gap",
      labelInitialInset: "Inset to label text",
      labelLeftEdge: "Left edge of labels on page",
      labelMaxLineCount: "Maximum number of lines in label",
      labelPageHeight: "Page height",
      labelPageWidth: "Page width",
      labelRightEdge: "Right edge of labels on page",
      labelsInAColumn: "Number of labels in a column",
      labelsInARow: "Number of labels in a row",
      labelTopEdge: "Top edge of labels on page",
      labelVerticalGap: "Vertical gap",
      labelWidth: "Label width",
      limitSearchToMapExtent: "Only search in current map extent",
      maximumResults: "Maximum results",
      maximumSuggestions: "Maximum suggestions",
      minimumScale: "Minimum scale",
      name: "Name",
      percentBlack: "% black",
      pixels: "pixels",
      pixelsPerInch: "pixels per inch",
      placeholderText: "Placeholder text",
      placeholderTextForAllSources: "Placeholder text for searching all sources",
      radius: "Radius",
      rasterResolution: "Raster resolution",
      searchFields: "Search fields",
      showAlignmentAids: "Show alignment aids on page",
      showGridTickMarks: "Show grid tick marks",
      showLabelOutlines: "Show label outlines",
      showPopupForFoundItem: "Show pop-up for the found feature or location",
      tool: "Tools",
      units: "Units",
      url: "URL",
      urlToGeometryService: "URL to geometry service",
      useRelatedRecords: "Use its related records",
      useSecondarySearchLayer: "Use secondary selection layer",
      useSelectionDrawTools: "Use selection drawing tools",
      useVectorFonts: "Use vector fonts (Latin fonts only)",
      zoomScale: "Zoom scale"
    },
    buttons: {
      addAddressSource: "Add layer containing address labels in its popup",
      addLabelFormat: "Add a label format",
      addSearchSource: "Add a search source",
      set: "Set"
    },
    placeholders: {  // Text shown in individual property items to provide an example of content
      averyExample: "e.g., Avery(r) label ${averyPartNumber}",
      countryRegionCodes: "e.g., USA,CHN",
      descriptionCSV: "Comma-separated values",
      descriptionPDF: "PDF label ${heightLabelIn} x ${widthLabelIn} inches; ${labelsPerPage} per page"
    },
    tooltips: {
      getWebmapFeatureLayer: "Get the feature layer from the webmap",
      openCountryCodes: "Click to get more information about codes",
      openFieldSelector: "Click to open a field selector",
      setAndValidateURL: "Set and validate the URL"
    },
    problems: {
      noAddresseeLayers: "Please specify at least one addressee layer",
      noBufferUnitsForDrawingTools: "Please configure at least one buffer unit for the drawing tools",
      noBufferUnitsForSearchSource: "Please configure at least one buffer unit for search source \"${sourceName}\"",
      noGeometryServiceURL: "Please configure the URL to the geometry service",
      noNotificationLabelFormats: "Please specify at least one notification label format",
      noSearchSourceFields: "Please configure one or more search fields for search source \"${sourceName}\"",
      noSearchSourceURL: "Please configure the URL for search source \"${sourceName}\""
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
