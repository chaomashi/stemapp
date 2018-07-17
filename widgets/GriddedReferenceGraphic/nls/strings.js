define({
  root: ({
    _widgetLabel: "Gridded Reference Graphic", // Label of widget

    //main page
    "newGRGFromAreaButtonLabel": "Define a Grid from an Area", // Shown as label to start new GRG from Area button on main page
    "newGRGFromPointButtonLabel": "Define a Grid from a Point", // Shown as label to new GRG from point button on main page

    //GRG from Area and Point Menus
    "newGRGFromAreaTitle": "Define a Grid from an Area", // Shown as Title on Area Menu
    "newGRGFromPointTitle": "Define a Grid from a Point", // Shown as Title on Area Menu
    "newGRGBySizeButtonLabel": "By Dimension", // Shown as label to start new GRG by size button on Area Menu or Point Menu
    "newGRGFromRefSystemButtonLabel": "By Reference System", // Shown as label to start new from reference system button on Area Menu or Point Menu
    "newGRGByTimeLabel": "By Time and Speed", // Shown as label to start new GRG from Time and Rate
    "newGRGFromNonStandardButtonLabel": "Define Non-Standard Grid", // Shown as label to start new GRG from non standard button on Area Menu or Point Menu

    //Area GRG By Size Panel
    "newGRGAreaBySizeTitle": "GRG from an Area by Dimension", // Shown as title for new GRG from area panel
    "newGRGAreaBySizeDefineAreaLabel": "GRG Area", // Shown as text for new GRG from area toolbar
    "addGRGAreaPolygonToolTip": "Draw GRG Area using polygon", // Shown as tooltip on draw rectangle icon
    "addGRGAreaExtentToolTip": "Draw GRG Area using extent", // Shown as tooltip on draw extent icon
    "rotation": "Grid Rotation", // Shown as label above rotation input box
    "numberRowsColumnsLabel": "Define number of rows and columns", // Shown as label next to the define rows and columns toggle

    //Area GRG By Reference System Panel
    "newGRGAreaByRefSystemTitle": "GRG from an Area by Reference System", // Shown as title for new GRG from reference system panel
    "gridSize": "Grid Size", // Shown as title for new GRG from reference system panel
    "UTMZoneandBand": "Grid Zone", // Shown as label for UTM Zone and Band in gridSize dropdown
    "100000m": "100000 meter", // Shown as label for 100000 meter in gridSize dropdown
    "10000m": "10000 meter", // Shown as label for 10000 meter in gridSize dropdown
    "1000m": "1000 meter", // Shown as label for 10000 meter in gridSize dropdown
    "100m": "100 meter", // Shown as label for 100 meter in gridSize dropdown
    "10m": "10 meter", // Shown as label for 10 meter in gridSize dropdown
    "clipGrid": "Clip Grid to GRG Area", // Shown as label for clip grid toggle switch

    //Area GRG from non standard grid Panel
    "newGRGAreaFromNonStandardTitle": "New NRG", // Shown as title for new GRG from non standard grid Panel

    //Point GRG By Size Panel
    "newGRGPointBySizeTitle": "GRG from Point by Dimension", // Shown as title for new GRG from point panel

    //Point GRG By Reference System Panel
    "newGRGPointByRefSystemTitle": "GRG from Point by Reference System", // Shown as title for new GRG from reference system panel

    //Point GRG By Time and Speed Panel
    "newGRGPointByTimeTitle": "GRG from Point using Time and Speed", // Shown as title for new GRG from reference system panel
    "time": "Time", // Shown as label for Time input
    "rate": "Speed", // Shown as label for Rate input
    "hours": "Hours", // Shown as label for hours in time units dropdown
    "minutes": "Minutes", // Shown as label for minutes in time units dropdown
    "seconds": "Seconds", // Shown as label for seconds in time units dropdown
    "ftPerSec": "Feet / second", // Shown as label for ftPerSec in rate units dropdown
    "ftPerHour": "Feet / hour", // Shown as label for ftPerHour in rate units dropdown
    "kmPerSec": "Kilometers / second", // Shown as label for kmPerSec in rate units dropdown
    "kmPerHour": "Kilometers / hour", // Shown as label for kmPerHour in rate units dropdown
    "mPerSec": "Meters / second", // Shown as label for mPerSec in rate units dropdown
    "mPerHour": "Meters / hour", // Shown as label for mPerHour in rate units dropdown
    "miPerSec": "Miles / second", // Shown as label for miPerSec in rate units dropdown
    "miPerHour": "Miles / hour", // Shown as label for miPerHour in rate units dropdown
    "nMPerSec": "Nautical Miles / second", // Shown as label for nMPerSec in rate units dropdown
    "nMPerHour": "Nautical Miles / hour", // Shown as label for nMPerHour in rate units dropdown

    //Settings Panel
    "settingsTitle": "Settings", // Shown as Title for Grid Settings page and label on settings buttons
    "labelSettingsLabel": "Label Settings", // Shown as Title for Label Settings dropdown
    "labelSettingsButtonLabel": "Configure Label Settings", // Shown as tooltip for Label Settings dropdown
    "gridSettingsLabel": "Grid Settings", // Shown as Title for Label Settings dropdown
    "gridSettingsButtonLabel": "Configure Grid Settings", // Shown as tooltip for Label Settings dropdown
    "transparency": "Transparency", // Shown as label on transparency sliders
    "labelStyle": "Label Style", // Shown as label on label settings
    "font": "Font", // Shown as label for font type
    "textSize": "Text Size", // Shown as label for font size
    "textColor": "Text Color", // Shown as label for font colour
    "halo": "Halo", // Shown as label for halo settings
    "show": "Show", // Shown as label for halo settings
    "lockSettings": "Settings have been locked by the application owner", // Shown as tooltip on settings button if locked

    "gridSettings": {
      "cellShape": "Cell Shape", // Shown as label to set Cell Shape Type
      "cellUnits": "Cell Units", // Shown as label to set Cell Units
      "cellOutline": "Cell Outline Settings", // Shown as label to set cell Outline Settings
      "cellFill": "Cell Fill Settings", // Shown as label to set cell fill Settings
      "gridReferenceSystem": "Reference System", // Shown as label to set Reference System
      "gridDatum": "Datum: WGS84", // Shown as label for datum
      "labelStartPosition": "Label Origin",  // Shown as label to set label start position
      "labelType": "Label Type", // Shown as label to set label type
      "labelDirection": "Label Direction", // Shown as label to set label direction
      "gridOrigin": "Grid Origin", // Shown as label to set grid origin

      "default": "Rectangle", // Shown as label for default in cell shape dropdown
      "hexagon": "Hexagon", // Shown as label for hexagon in cell shape  dropdown

      "miles": "Miles", // Shown as label for miles in cell units dropdown
      "kilometers": "Kilometers", // Shown as label for kilometers in cell units dropdown
      "feet": "Feet", // Shown as label for feet in cell units dropdown
      "meters": "Meters", // Shown as label for meters in cell units dropdown
      "yards": "Yards", // Shown as label for yards in cell units dropdown
      "nautical-miles": "Nautical Miles", // Shown as label for nauticalMiles in cell units dropdown

      "lowerLeft": "Lower-Left", // Shown as label for lower left in label start position and grid origin dropdowns
      "lowerRight": "Lower-Right", // Shown as label for lower right in label start position and grid origin dropdowns
      "upperLeft": "Upper-Left", // Shown as label for upper left in label start position and grid origin dropdowns
      "upperRight": "Upper-Right", // Shown as label for upper right in label start position and grid origin dropdowns
      "center": "Center", // Shown as label for center in grid origin dropdown

      "alphaNumeric": "Alpha-Numeric", // Shown as label for Alpha-Numeric in label type dropdown
      "alphaAlpha": "Alpha-Alpha", // Shown as label for Alpha-Alpha in label type dropdown
      "numeric": "Numeric", // Shown as label for Numeric in label type dropdown

      "horizontal": "Horizontal", // Shown as label for Horizontal in label direction dropdown
      "vertical": "Vertical", // Shown as label for Vertical in label direction dropdown

      "MGRS": "MGRS", // Shown as label for MGRS in reference system dropdown
      "USNG": "USNG", // Shown as label for USNG in reference system dropdown

      "showLabels": "Show Labels", // Shown as label for show labels toggle switch
    },

    //Publish Panel
    "publishTitle": "Publish GRG to Portal", // Shown as Title for Grid Settings page and label on settings buttons
    "publishGRGBtn": "Publish", // Shown as label on publish GRG button
    "GRGLayerName": "Published GRG Layer Name", // Shown as label for layer name box
    "invalidGRGLayerName": "Layer name must only contain alpha-numeric characters and underscores", //Shown as validation error on published layer name
    "missingGRGLayerName": "You must enter a name for the GRG", //Shown as validation error on empty published layer name

    //publishing error messages
    "publishingFailedLayerExists": "Publishing Failed: You already have a feature service named {0}. Please choose another name.", //Shown as error for layer name already used when publishing {0} will be replaced with the layer name in the code so do not remove
    "checkService": "Check Service: {0}", //{0} will be replaced in the code so do not remove
    "createService": "Create Service: {0}", //{0} will be replaced in the code so do not remove
    "unableToCreate": "Unable to create: {0}", //{0} will be replaced in the code so do not remove
    "addToDefinition": "Add to definition: {0}", //{0} will be replaced in the code so do not remove
    "successfullyPublished": "Successfully published web layer{0}Manage the web layer", //{0} will be replaced in the code so do not remove
    "userRole": "Unable to create service because user does not have permissions", //displayed as warning when publishing service

    //common
    "createGRGBtn": "Create GRG", // Shown as label on create button
    "clearGRGBtn": "Clear", // Shown as label on clear button
    "labelFormat": "Label Format", // Shown as label above label format input box
    "helpIconTooltip": "Z: Grid Zone Designator (GZD)\nS: 100,000-meter Grid Square Identification (GSID)\nX: Easting (X Coordinate)\nY: Northing (Y Coordinate)\n\nExamples:\nZSXY is 15SWC8081751205\nZS X,Y is 15SWC 80817,51205", // Shown as label above label format input box
    "addPointToolTip": "Add GRG Origin", // Show as tooltip help on the draw point icon
    "cellWidth": "Cell Width (x)", // Shown as label above cell width input
    "cellHeight": "Cell Height (y)", // Shown as label above cell height input
    "invalidNumberMessage": "The value entered is not valid", //Shown as validation error on invalid entries
    "invalidRangeMessage": "Value must be greater than 0", //Shown as validation error on invalid entries
    "gridAngleInvalidRangeMessage": "Value must be between -89.9 and 89.9", //Shown as validation error for the angle input
    "formatIconTooltip": "Format Input", // Shown as tooltip on the format input coordinate button
    "coordInputLabel": "GRG Origin (DD)", // Shown as label for coordinate input box (DD) denotes that decimal degrees is set as the default
    "setCoordFormat": "Set Coordinate Format String", // Shown as label for set format string
    "prefixNumbers": "Add '+/-' prefix to positive and negative numbers", // Shown as text next to the add prefix check box
    "cancelBtn": "Cancel", // Shown as label on cancel button
    "applyBtn": "Apply", // Shown as label on apply button
    "comfirmInputNotation": "Confirm Input Notation",  //Shown as panel title when more than one notation match
    "notationsMatch": "notations match your input please confirm which you would like to use:", // Shown as message when more than one notation match
    "numberOfCellsHorizontal": "# Horizontal Cells", // Shown as label for number of Horizontal cells
    "numberOfCellsVertical": "# Vertical Cells", // Shown as label for number of Vertical cells
    "gridAngle": "Grid Rotation", // Shown as label for grid angle
    "tooManyCellsErrorMessage": "You are attempting to create a grid comprising of more than 2000 cells. It is advisable to reduce the number of cells being created by changing the grid size or grid area.",
    "missingParametersMessage": "<p>The GRG creation form has missing or invalid parameters, Please ensure:</p><ul><li>A GRG area has been drawn.</li><li>The cell width and height contain valid values.</li></ul>",
    "missingOriginParametersMessage": "<p>The GRG creation form has missing or invalid parameters, Please ensure:</p><ul><li>A GRG origin has been set.</li><li>The time, speed and angle inputs contain valid values.</li></ul>",
    "invalidWidthHeightParametersMessage": "<p>The GRG creation form has missing or invalid parameters. Please ensure the cell width and height inputs contain valid values.</p>",
    "invalidHorizontalVerticalParametersMessage": "<p>The GRG creation form has missing or invalid parameters. Please ensure the number of cells horizontal and vertical inputs contain valid values.</p>",
    "drawPointToolTip": "Click to add GRG origin point", // Shown as tooltip help on the cursor when using the draw point tool
    "missingLayerNameMessage": "You must enter a valid layer name before you can publish", //shown as error message for invalid layer name
    "parseCoordinatesError": "Unable to parse coordinates. Please check your input.", //Shown as error message for unknown coordinates
    "grgPolarRegionError": "The GRG extent is within a polar region. Cells that fall within the polar region will not be created.", //Shown as warning message for GRG overlapping polar region
    "grgPolarOriginError": "The GRG origin point cannot be within a polar region when creating a GRG by Reference System.", //Shown as warning message for GRG origin in polar region

    // notation strings
    "DD": "DD", // Shown as DD label in coordinate type dropdown within format input settings
    "DDM": "DDM", // Shown as DDM label in coordinate type dropdown within format input settings
    "DMS": "DMS", // Shown as DMS label in coordinate type dropdown within format input settings
    "DDRev": "DDRev", // Shown as DDRev label in coordinate type dropdown within format input settings
    "DDMRev": "DDMRev", // Shown as DDMRev label in coordinate type dropdown within format input settings
    "DMSRev": "DMSRev", // Shown as DMSRev label in coordinate type dropdown within format input settings
    "USNG": "USNG", // Shown as USNG label in coordinate type dropdown within format input settings
    "MGRS": "MGRS", // Shown as MGRS label in coordinate type dropdown within format input settings
    "UTM_H": "UTM (H)", // Shown as UTM (H) label in coordinate type dropdown within format input settings
    "UTM": "UTM", // Shown as UTM label in coordinate type dropdown within format input settings
    "GARS": "GARS", // Shown as GARS label in coordinate type dropdown within format input settings
    "GEOREF": "GEOREF", // Shown as GEOREF label in coordinate type dropdown within format input settings
    "DDLatLongNotation": "Decimal Degrees - Latitude/Longitude", // Shown as Decimal Degrees - Latitude/Longitude label in confirm coordinate type dropdown
    "DDLongLatNotation": "Decimal Degrees  - Longitude/Latitude", // Shown as Decimal Degrees  - Longitude/Latitude label in confirm coordinate type dropdown
    "DDMLatLongNotation": "Degrees Decimal Minutes - Latitude/Longitude", // Shown as Degrees Decimal Minutes - Latitude/Longitude label in confirm coordinate type dropdown
    "DDMLongLatNotation": "Degrees Decimal Minutes - Longitude/Latitude", // Shown as Degrees Decimal Minutes - Longitude/Latitude label in confirm coordinate type dropdown
    "DMSLatLongNotation": "Degrees Minutes Seconds - Latitude/Longitude", // Shown as Degrees Minutes Seconds - Latitude/Longitude label in confirm coordinate type dropdown
    "DMSLongLatNotation": "Degrees Minutes Seconds - Longitude/Latitude", // Shown as Degrees Minutes Seconds - Longitude/Latitude label in confirm coordinate type dropdown
    "GARSNotation": "GARS", // Shown as GARS label in confirm coordinate type dropdown
    "GEOREFNotation": "GEOREF", // Shown as GEOREF label in confirm coordinate type dropdown
    "MGRSNotation": "MGRS", // Shown as MGRS label in confirm coordinate type dropdown
    "USNGNotation": "USNG", // Shown as USNG label in confirm coordinate type dropdown
    "UTMBandNotation": "UTM - Band Letter", // Shown as UTM - Band Letter label in confirm coordinate type dropdown
    "UTMHemNotation": "UTM - Hemisphere (N/S)" // Shown as UTM - Hemisphere (N/S)de label in confirm coordinate type dropdown
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
