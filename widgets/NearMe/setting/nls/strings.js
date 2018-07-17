/*global define*/
///////////////////////////////////////////////////////////////////////////
// Copyright © 2015 Esri. All Rights Reserved.
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
    units: { // label shown in config UI dialog box(options for dropdown) and also shown as label for slider text(slider unit) and acronym in feature list
      miles: {
        displayText: "Miles",
        acronym: "mi"
      },
      kilometers: {
        displayText: "Kilometers",
        acronym: "km"
      },
      feet: {
        displayText: "Feet",
        acronym: "ft"
      },
      meters: {
        displayText: "Meters",
        acronym: "m"
      }
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
    },
    searchSetting: {
      searchSettingTabTitle: "Search Settings", // shown as a label in config UI dialog box for search setting
      defaultBufferDistanceLabel: "Set default buffer distance", // shown as a label in config UI dialog box for selecting default buffer distance;
      maxResultCountLabel: "Limit number of results", // shown as a label in config UI dialog box for selecting maximum record count to return
      maxResultCountHintLabel: "Hint: Set the maximum number of visible results. The value of 1 will return the nearest feature", // shown as a label in config UI dialog box to set for selecting maximum record count to return
      maxBufferDistanceLabel: "Set maximum buffer distance", // shown as a label in config UI dialog box for selecting maximum buffer distance value
      bufferDistanceUnitLabel: "Buffer distance units", // shown as a label(options) of select(dropdown) in config UI dialog box
      defaultBufferHintLabel: "Hint: Set default value for the buffer slider", // shown as a label in config UI dialog box to set default value for a buffer
      maxBufferHintLabel: "Hint: Set maximum value for the buffer slider", // shown as a label in config UI dialog box to set maximum value for a buffer
      bufferUnitLabel: "Hint: Define unit for creating buffer", // shown as a label in config UI dialog box to set unit of buffer
      selectGraphicLocationSymbol: "Address or location symbol", // shown as label in config UI dialog box for graphic symbol in search setting
      graphicLocationSymbolHintText: "Hint: Symbol for searched address or clicked location", // shown as hint label in config UI dialog box for selecting graphic symbol
      addressLocationPolygonHintText: "Hint: Symbol for searched polygon layer", // shown as a label in config UI for polygon layer
      popupTitleForPolygon: "Select polygon for selected address location", // shown as a popup title in polygon chooser
      popupTitleForPolyline: "Select line for address location", // shown as a popup title in polyline chooser
      addressLocationPolylineHintText: "Hint: Symbol for searched polyline layer", // shown as a label in cofig UI for polyline
      fontColorLabel: "Select font color for search results", //Show as label in config UI to set the font color in widget panel.
      fontColorHintText: "Hint: Font color of search results", //Show as label in config UI to set the font color in widget panel.
      zoomToSelectedFeature: "Zoom to the selected feature", //Sets flag value for Zoom to selected feature.
      zoomToSelectedFeatureHintText: "Hint: Zoom to the selected feature instead of the buffer", //Show as label in config UI to enable Zoom to selected feature flag
      intersectSearchLocation: "Return intersecting polygon(s)", //Sets flag value for intersect the search location.
      intersectSearchLocationHintText: "Hint: Return polygon(s) containing the searched location rather than polygons within the buffer", //Show as label in config UI to enable intersect the search location flag
      enableProximitySearch: "Enable proximity search",  //Sets flag to for option to do a secondary proximity search from a selected value
      enableProximitySearchHintText: "Hint: Enable ability to search for locations near a selected result", //Show as label in config UI for secondary proximity search
      bufferVisibilityLabel: "Set buffer visibility", //Show as label in config UI to set buffer visibility
      bufferVisibilityHintText: "Hint: The buffer will be displayed on the map", //Show as hint label in config UI to set buffer visibility
      bufferColorLabel: "Set buffer symbol", //Shown as label in config UI to set the color and opacity of the buffer.
      bufferColorHintText: "Hint: Select color and transparency of buffer", //Show as hint label in config UI to select color for buffer
      searchLayerResultLabel: "Only draw selected layer results", //Show as label in config UI to search layer result
      searchLayerResultHint: "Hint: Only the selected layer in the search results will draw on map", //Show as hint label in config UI to search layer result
      showToolToSelectLabel: "Set location button", // Shown as a label to select location on map tool
      showToolToSelectHintText: "Hint: Provides a button to set location on map instead of always setting the location when the map is clicked", // Shown as a hint to select location on map tool
      geoDesicParamLabel: "Use geodesic buffer", // Shown as a label of geodesic parameters
      geoDesicParamHintText: "Hint: Use geodesic buffer instead of Euclidean buffer (planar)" // Shown as a hint text for geodesic
    },
    layerSelector: {
      selectLayerLabel: "Select search layer(s)", // shown as a label in config UI dialog box for selecting layer on map
      layerSelectionHint: "Hint: Use the set button to select layer(s)", // shown as a label in config UI dialog box to select multiple layers
      addLayerButton: "Set" //Shown as a button text to add the layer for search
    },
    routeSetting: {
      routeSettingTabTitle: "Directions Settings", // shown as a label in config UI dialog box for route setting
      routeServiceUrl: "Routing Service", // shown as a label in config UI dialog box for setting the route url
      buttonSet: "Set", // shown as a button text for route setting to set route url in config UI dialog box
      routeServiceUrlHintText: "Hint: Click ‘Set’ to browse and select a routing service", // shown as a hint label in config UI dialog box to select a route url
      directionLengthUnit: "Direction length units", // shown as a label(options) of select(dropdown) in config UI dialog box in routing section
      unitsForRouteHintText: "Hint: Used to display units for route", // shown as hint label in config UI dialog box to display routing unit
      selectRouteSymbol: "Select symbol to display route", // shown as label in config UI dialog box for selecting symbol for routing
      routeSymbolHintText: "Hint: Used to display line symbol of the route", //shown as hint to select route symbol
      routingDisabledMsg: "To enable directions ensure that routing is enabled on the item in the application settings." // shown as message in routeSettings tab when routing is disabled in webmap
    },
    symbologySetting: {
      symbologySettingTabTitle: "Symbology Settings", // shown as a label in config UI dialog box for symbology setting
      addSymbologyBtnLabel: "Add New Symbols", // shown as label in cofig UI for symbology tab
      layerNameTitle: "Layer Name", // shown as first column header in symbology table
      fieldTitle: "Field", // shown as second column header in symbology table
      valuesTitle: "Values", // shown as third column header in symbology table
      symbolTitle: "Symbol", // shown as fourth column header in symbology table
      actionsTitle: "Actions", // shown as fifth column header in symbology table
      invalidConfigMsg: "Duplicate field : ${fieldName} for layer : ${layerName}" // Shown as an error when more than one field names are configured
    },
    filterSetting: {
      filterSettingTabTitle: "Filter Settings", // shown as a label in config UI dialog box for filter setting
      addTaskTip: "Add one or more filters to the selected search layer(s) and configure parameters for each of them.", // shown as a label in config UI in filter setting tab at the top
      enableMapFilter: "Remove the preset layer filter from the map.", // Shown as label in config UI for filter setting for checkbox label
      newFilter: "New filter", // Shown as a label on button of new filter in which user can add new filter
      filterExpression: "Filter expression", // Shown as label of config UI in filter settings tab
      layerDefaultSymbolTip: "Use layer's default symbol", // Shown as a hint sor dafault symbol
      uploadImage: "Upload an image",
      selectLayerTip: "Please select a layer.", // Shown as error msg in filter settings tab when no layer is selected in dropdown and user clicks on ok button
      setTitleTip: "Please set title.", // Shown as error msg in filter settings tab when no layer is added in textbox and user clicks on ok button
      noTasksTip: "No filters configured. Click \"${newFilter}\" to add a new one.", // Shown as error msg in fiter settings tab when not a single filter is added in cofig
      collapseFiltersTip: "Collapse the filter expressions (if any) when the widget is opened", // Shown as label in filter settings tab for checkbox to collapse expression for widget
      groupFiltersTip: "Group filters by layer" // Shown as label in filter settings tab for checkbox to group filters by layer
    },
    networkServiceChooser: {
      arcgislabel: "Add from ArcGIS Online", // shown as a label in route service configuration panel to select route url from portal
      serviceURLabel: "Add Service URL", // shown as a label in route service configuration panel to add service url
      routeURL: "Route URL", // shown as a label in route service configuration panel
      validateRouteURL: "Validate", // shown as a button text in route service configuration panel to validate url
      exampleText: "Example", // shown as a label in route service configuration panel to consider example of route services
      hintRouteURL1: "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/", // shown as a label hint in route service configuration panel
      hintRouteURL2: "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World", // shown as a label hint in route service configuration panel
      invalidRouteServiceURL: "Please specify a valid Route service.", // Shown as an error in alert box invalid route service url is configured.
      rateLimitExceeded: "Rate limit exceeded. Please try again later.", // Shown as an error in alert box if rate limit is exceeded.
      errorInvokingService: "Username or password is incorrect." // Shown as an error in alert box if service is inaccessible.
    },
    errorStrings: {
      bufferErrorString: "Please enter valid numeric value.", // shown as an error label in text box for buffer
      selectLayerErrorString: "Please select layer(s) to search.", // shown as an error label in alert box for selecting layer from map to search
      invalidDefaultValue: "Default  buffer distance cannot be blank. Please specify the buffer distance", // shown as an error label in alert box for blank or empty text box
      invalidMaximumValue: "Maximum buffer distance cannot be blank. Please specify the buffer distance", // shown as an error label in alert box for blank or empty text box
      defaultValueLessThanMax: "Please specify the default buffer distance within the maximum limit", // shown as an error label in alert box when default value is greater than maximum value of slider
      defaultBufferValueGreaterThanOne: "Default buffer distance cannot be less than 0", // shown as an error label in alert box when we configure default value of slider is one
      maximumBufferValueGreaterThanOne: "Please specify the maximum buffer distance greater than 0", // shown as an error label in alert box when we configure maximum value of slider is less than or equals to 1
      invalidMaximumResultCountValue: "Please specify valid value for the maximum result count", // shown as an error label in alert box when we configure maximum value of slider is less than or equals to 1
      invalidSearchSources: "Invalid search source settings" // Show as error msg if search source settings are invalid
    },
    symbolPickerPreviewText: "Preview:"
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
