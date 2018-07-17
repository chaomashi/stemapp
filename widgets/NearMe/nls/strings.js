/*global define*/
define({
  root: ({
    _widgetLabel: "Near Me", // widget label shown on the choose widget dialog and widget panel title
    searchHeaderText: "Search an address or locate on map", // Shown as a label in widget panel for search an address.
    invalidSearchLayerMsg: "Search layers are not configured properly", // Shown as a message when the configured search layer is invalid or no layer is configured
    bufferSliderText: "Show results within ${BufferDistance} ${BufferUnit}", // Shown as a label for slider to display the result in buffer area.
    bufferSliderValueString: "Please specify a distance greater than 0", // Shown as a error when Buffer slider is set to zero distance in alert box.
    unableToCreateBuffer: "Result(s) could not be found", //display error message if buffer gets failed to generate
    selectLocationToolTip: "Set location", //Shown as tooltip when select location button is clicked
    noFeatureFoundText: "No results found ", //Shown as message if no features available in current buffer area
    unableToFetchResults: "Unable to fetch results from layer(s):", //shown as message if any layer is failed to fetch the results
    informationTabTitle: "Information", //Shown as title for information tab
    directionTabTitle: "Directions", //Shown as title for direction tab
    failedToGenerateRouteMsg: "Failed to generate route.", //Shown as a message when fail to generate route
    geometryServicesNotFound: "Geometry service not available.", //Shown as a message when fail to get geometry service
    allPopupsDisabledMsg: "Popups are not configured, results cannot be displayed.", //Shown as a message when popups for all the layers are disabled
    worldGeocoderName: "Address", //Esri World Geocoder title
    searchLocationTitle: "Searched Location", //Shown as a label on popup
    unknownAttachmentExt: "FILE", // Displayed for file attachments having unknown extension
    proximityButtonTooltip: "Search nearby", //shown as tooltip for proximity button
    approximateDistanceTitle: "Approximate Distance: ${DistanceToLocation}", //Shown as text for distance
    toggleTip: "Click to show/hide filter settings", //Shown as tooltip to show/hide filter settings
    filterTitle: "Select filters to apply", //Shown as title on filters page
    units: { // label shown as label for slider text(slider unit) and acronym in feature list
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
