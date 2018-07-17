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
    units: {
      miles: "Miles", // label shown in config UI dialog box(options for dropdown) and also shown as label for slider text(slider unit)
      kilometers: "Kilometers", // label shown in config UI dialog box(options for dropdown) and also shown as label for slider text(slider unit)
      feet: "Feet", // label shown in config UI dialog box(options for dropdown)and also shown as label for slider text(slider unit)
      meters: "Meters" // label shown in config UI dialog box(options for dropdown)and also shown as label for slider text(slider unit)
    },
    layerSetting: {
      layerSettingTabTitle: "Search Settings", // shown as a label in config UI dialog box for layer setting
      buttonSet: "Set", // shown as a button text to set layers
      selectLayersLabel: "Select layer",  // shown as a label in config UI dialog box for selecting polygon and its related layer from map
      selectLayersHintText: "Hint: Used to select polygon layer and its related point layer.", // shown as a hint text in config UI dialog box for selecting polygon and its related layer from map
      selectPrecinctSymbolLabel: "Select symbol to highlight polygon", // shown as hint label in config UI dialog box for selecting precinct symbol
      selectGraphicLocationSymbol: "Address or location symbol", // shown as label in config UI dialog box for graphic symbol in routing
      graphicLocationSymbolHintText: "Hint: Symbol for searched address or clicked location", // shown as hint label in config UI dialog box for selecting graphic symbol
      precinctSymbolHintText: "Hint: Used to display symbol for selected polygon", // shown as hint label in config UI dialog box for selecting graphic symbol for precinct
      selectColorForPoint: "Select color to highlight point",
      selectColorForPointHintText: "Hint: Used to display highlight color for selected point"
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
      invalidUrlTip: "The URL ${URL} is invalid or inaccessible.", // Shown as error message if URL is invalid
      invalidSearchSources: "Invalid search source settings" // Show as error msg if search source settings are invalid
    },
    layerSelector: {
      selectPolygonLayerLabel: "Select polygon layer", // shown as a label in config UI dialog box for selecting polygon (precinct) layer on map
      selectPolygonLayerHintText: "Hint: Used to select polygon layer.", // shown as hint label in config UI dialog box for selecting polygon (precinct) layer on map
      selectRelatedPointLayerLabel: "Select point layer related to polygon layer", // shown as a label in config UI dialog box for selecting polling place layer on map
      selectRelatedPointLayerHintText: "Hint:  Used to select point layer related to polygon layer", // shown as hint label in config UI dialog box for selecting polling place layer on map
      polygonLayerNotHavingRelatedLayer: "Please select a polygon layer which has a related point layer.", //// shown as an error in alert box if selected precinct layers in not having valid related layers
      errorInSelectingPolygonLayer: "Please select a polygon layer which has a related point layer.", // shown as an error label in alert box for selecting precinct layer from map
      errorInSelectingRelatedLayer: "Please select point layer related to polygon layer." // shown as an error label in alert box for selecting polling place layer from map
    },
    routeSetting: {
      routeSettingTabTitle: "Directions Settings", // shown as a label in config UI dialog box for route setting
      routeServiceUrl: "Routing service", // shown as a label in config UI dialog box for setting the route url
      buttonSet: "Set", // shown as a button text for route setting to set route url in config UI dialog box
      routeServiceUrlHintText: "Hint: Click ‘Set’ to browse and select a network analysis routing service", // shown as a hint label in config UI dialog box to select a route url
      directionLengthUnit: "Direction length units", // shown as a label(options) of select(dropdown) in config UI dialog box in routing section
      unitsForRouteHintText: "Hint: Used to display reported units for route", // shown as hint label in config UI dialog box to display routing unit
      selectRouteSymbol: "Select symbol to display route", // shown as label in config UI dialog box for selcting symbol for routing
      routeSymbolHintText: "Hint: Used to display line symbol of the route", //shown as hint to select route symbol
      routingDisabledMsg: "To enable directions ensure that routing is enabled in the ArcGIS Online item." // shown as message in routeSettings tab when routing is disabled in webmap
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
      errorInvokingService: "Username or password is incorrect." // Shown as an error in alert box if error found while generating token for service.
    },
    symbolPickerPreviewText: "Preview:",
    showToolToSelectLabel: "Set location button", // Shown as a label to select location on map tool
    showToolToSelectHintText: "Hint: Provides a button to set location on map instead of always setting the location when the map is clicked" // Shown as a hint to select location on map tool
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
