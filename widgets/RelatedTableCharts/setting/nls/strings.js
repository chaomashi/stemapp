define({
  root: ({

    chartSettingLabel: "Chart settings",  // shown as a label in config UI tab.    
    addNewLabel: "Add new", // shown as a button text to add layers.
    generalSettingLabel: "General settings", // shown as a label in config UI tab.
    searchSourceSettingLabel: "Search Source settings",  // shown as a label in config UI tab.
    layerChooser: {
      title: "Select layer to chart", // shown as title on layer chooser popup.
      selectPolygonLayerLabel: "Select layer", // shown as a label in config UI dialog box for layer chooser.
      selectPolygonLayerHintText: "Hint: If configuring multiple charts, then layers have to be of the same geometry type", // shown as a hint text in config UI dialog box for selecting layer from map.
      selectRelatedTableLayerLabel: "Select table related to layer", // shown as a label in config UI dialog box for layer chooser.
      selectRelatedTableLayerHintText: "Hint: Only tables with numeric fields are displayed", // shown as a hint text in config UI dialog box for selecting table related to layer.
      errorInSelectingPolygonLayer: "Please select a layer which has a related point layer.", // shown as an error label in alert box for selecting layer from map.
      errorInSelectingRelatedLayer: "Please select a valid related table/layer to  layer.", // shown as an error in alert box if error in selecting related table layer.
      polygonLayerNotHavingRelationships: "Selected layer don't have any related table/layer." // shown as an error in alert box if Selected layer don't have any related table/layer.
    },
    ChartSetting: {
      sectionTitle: "Section title", // shown as a label in config UI dialog box.
      sectionTitleHintText: "Hint: Displayed in section header title", // shown as a hint text in config UI dialog box for section title.
      chartTitle: "Chart title", // shown as a label in config UI dialog box.
      chartTitleHintText: "Hint: Displayed centered on top of chart", // shown as a hint text in config UI dialog box for section title.
      chartDescription: "Description", // shown as a label in cofig UI.
      chartDescriptionHintText: "Hint: Displayed below chart", // shown as a hint text in config UI dialog box.
      chartType: "Chart type", // shown as a label which shows type of chart.
      barChart: "Bar chart", // shown as a label for bar chart radio button.
      pieChart: "Pie chart", // shown as a label for pie chart radio button.
      polarChart: "Polar chart", // shown as a label for polar chart radio button
      dataSeriesField: "Data series field", // shown as a label for selecting data series set.
      labelField: "Label field", // shown as a label for selecting label field set.
      chartColor: "Chart color", // shown as a label which shows color for chart.
      singleColor: "Single color", // shown as a label for single color radio button.
      colorByTheme: "Color by theme", // shown as a label for color by theme radio button.
      colorByFieldValue: "Color by field value", // shown as a label for color by field value radio button.
      xAxisTitle: "X-axis title", // shown as a label to enter title in bottom left corner.
      xAxisHintText: "Hint: X-axis title", // shown as a hint text which shows position of label in config UI dialog box.
      yAxisTitle: "Y-axis title", // shown as a label to enter title in bottom left corner.
      yAxisHintText: "Hint: Y-axis title", // shown as a hint text which shows position of label in config UI dialog box.
      fieldColorLabel: "Label", // shown as a header in table.
      fieldColorColor: "Color", // shown as a header in table.
      defaultFieldSelectLabel: "Select", // shown as a label in config UI dialog box.
      errMsgFieldValuesNotFound: "Unable to find values for the selected field", // shown as an error in alert box.
      errMsgSectionTitle: "Please enter the section title", // shown as an error in alert box if section title is empty.
      errMsgFieldByValue: "Please select field value", // shown as an error in alert box if color by field value is empty.
      settingTabTitle: "Setting", // shown as a label of tab in config UI
      layoutTabTitle: "Layout", // shown as a label of tab in config UI
      polarChartSelectFieldsHintText: "Hint: Select fields to generate polar chart", // shown as hint text to select fields for polar graph.
      visibilityText: "Visibility", //show as header in polar graph field table
      fieldNameText: "Field Name", //show as header in polar graph field table
      aliasNameText: "Alias", // show as header in polar graph field table
      errMsgPolarFieldsRequired: "Please select three or more fields to generate polar chart", // shown as an error in alert box if less than 3 fields selected.
      polarChartPolygonFillLabel: "Fill polygon", // shown as label to set visibility of polygons in polar graph
      polarChartPolygonFillHintText: "Hint: Select checkbox to show polygon fill in polar graph", // shown as hint text to select the checkbox to show the filled polygons in polar graph
      viewLayoutLabel: "Layout", // shown as label in config UI for view layout
      ThemeSelector: { // Themes Labels
        themeAdobebricks: "Adobebricks",
        themeAlgae: "Algae",
        themeBahamation: "Bahamation",
        themeBlueDusk: "BlueDusk",
        themeCubanShirts: "CubanShirts",
        themeDesert: "Desert",
        themeDistinctive: "Distinctive",
        themeDollar: "Dollar",
        themeGrasshopper: "Grasshopper",
        themeGrasslands: "Grasslands",
        themeGreySkies: "GreySkies",
        themeHarmony: "Harmony",
        themeIndigoNation: "IndigoNation",
        themeIreland: "Ireland",
        themeMiamiNice: "MiamiNice",
        themeMinty: "Minty",
        themePurpleRain: "PurpleRain",
        themeRoyalPurples: "RoyalPurples",
        themeSageToLime: "SageToLime",
        themeTufte: "Tufte",
        themeWatersEdge: "WatersEdge",
        themeWetlandText: "Wetland",
        themePlotKitblue: "PlotKit.blue",
        themePlotKitcyan: "PlotKit.cyan",
        themePlotKitgreen: "PlotKit.green",
        themePlotKitorange: "PlotKit.orange",
        themePlotKitpurple: "PlotKit.purple",
        themePlotKitred: "PlotKit.red"
      }
    },
    GeneralSetting: {
      legendGeneralSettingText: "General Settings", // shown as a label of general setting legend.
      locationSymbolLabel: "Graphic location symbol", // shown as a label for selecting graphic location symbol.
      locationSymbolHintText: "Hint: Used to display symbol for address and click location", // shown as a hint text for selecting graphic location symbol.
      refreshIntervalLabel: "Refresh interval", // shown as a label of refresh interval.
      refreshIntervalHintText: "Hint: Used to refresh charts based on this interval. Specify a value between 1 to 1440 minutes", // shown as an error for refresh interval.
      errMsgRefreshInterval: "Please specify the refresh interval between 0 to 1440 minutes",  // shown as an error message.
      symbolPickerPreviewText: "Preview:",
      showToolToSelectLabel: "Set location button", // Shown as a label to select location on map tool
      showToolToSelectHintText: "Hint: Provides a button to set location on map instead of always setting the location when the map is clicked" // Shown as a hint to select location on map tool
    },
    searchSourceSetting: {
      searchSourceSettingTabTitle: "Search Source Settings", // shown as a label in config UI dialog box for search source setting
      searchSourceSettingTitle: "Search Source Settings", // shown as a label in config UI dialog box for search source setting
      searchSourceSettingTitleHintText: "Add and configure geocode services or feature layers as search sources. These specified sources determine what is searchable within the search box", // shown as a hint text in config UI dialog box for search source setting
      addSearchSourceLabel: "Add Search Source", // Shown as a label in config UI for button
      featureLayerLabel: "Feature Layer", // Shown as a label in config UI for dropDown menu
      geocoderLabel: "Geocoder", // Shown as a label in config UI for dropDown menu
      nameTitle: "Name", // Shown as a title in table
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
      meters: "Meters", // Shown as a label in config UI for radius unit
      setSearchFields: "Set Search Fields", // Shown as a title for selecting search fields
      set: "Set", // Shown as a label in config UI for button
      fieldName: "Name", // Shown as a label in config UI
      invalidUrlTip: "The URL ${URL} is invalid or inaccessible." // Shown as error message if URL is invalid
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
