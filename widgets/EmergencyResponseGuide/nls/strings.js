define({
  root: ({
    _widgetLabel: "Emergency Response Guide", // Label of widget
    
    //ERG Main Page Panel    
    "ergMainPageTitle": "Based on the Emergency Response Guidebook 2016", // Shown as title for new ERG from point panel
    "coordInputLabelStart": "Spill Location (DD)", // Shown as label for coordinate input box (DD) denotes that decimal degrees is set as the default
    "coordInputLabel": "Spill Location", // Shown as label for coordinate input box
    "addPointToolTip": "Add Spill Location", // Show as tooltip help on the draw point icon    
    "drawPointToolTip": "Click to add spill location", // Shown as tooltip help on the cursor when using the draw point tool
    
    "material": "Material", // Shown as title for material input 
    "materialPlaceholder": "Start typing to search for a material", // Shown as prompt text in material input field
    "table3Message": "The material you have selected requires additional information if you are dealing with a large spill.\n\nPlease ensure you have the correct values selected for wind speed and transport container.", // Shown as message box it material is table 3
    "table2Message": "The material you have selected may produces a large amount of Toxic Inhalation Hazard gases when spilled in water.\n\nYou may want to consider using the following material(s):\n\n", // Shown as message box it material is table 2
    
    "spillSize": "Spill Size", // Shown as title for spill size dropdown
    "small": "Small", // Shown as label for small in spill size dropdown
    "large": "Large", // Shown as label for large in spill size dropdown
    
    "fireLabel": "Show Fire Isolation Zone", // Shown as label for fire toggle
    
    "weatherLabel": "Current Weather at Spill Location", // Shown as title for weather container
    "weatherIntialText": "<br />Updated once a spill location has been idenitified", // Shown in the weather panel before location has been set

    "temperature": "Temperature", // Shown in the temperature label in weather panel
    "wind": "Wind", // Shown in the wind label in weather panel
    "c": "C", // Shown in the celsius (centigrade) label in weather panel
    "f": "F", // Shown in the fahrenheit label in weather panel
    "weatherErrorMessage": "Weather info not obtained. Update Wind Speed and Time of Spill values manually",
        
    "windDirection": "Wind Direction (blowing to)", // Shown as label for wind direction
    
    "timeOfSpill": "Time of Spill", // Shown as label for time of spill dropdown
    "day": "Day", // Shown as label for day in time of spill dropdown
    "night": "Night", // Shown as label for night in time of spill dropdown
    
    "windSpeed": "Wind Speed", // Shown as label for wind speed
    "low": "Low", // Shown as label for low in wind speed dropdown
    "moderate": "Moderate", // Shown as label for moderate in wind speed dropdown
    "high": "High", // Shown as label for high in wind speed dropdown
    
    "transportContainer": "Transport Container", // Shown as label for transport container dropdown
    "rail": "Rail tank car",
    "semi": "Highway tank truck or trailer",
    "mton": "Multiple ton cylinders",
    "ston": "Multiple small cylinders or single ton cylinder",
    "ag": "Agricultural nurse tank",
    "msm": "Multiple small cylinders",
    
    "bleveLabel": "Show BLEVE Isolation Zone", // Shown as label for BLEVE toggle
    
    "capacity": "Container Capacity (litres)", // Shown as label for Container Capacity dropdown
    
    "bleveMessage": "For the material you have selected an additional evacuation distance can be shown for BLEVE.\n\nTo enable this, set the Show BLEVE Isolation Zone toggle to on and select the appropiate container capacity.",
    "noPAZoneMessage": "There are no Protective Action distances for this material. Only the Initial Isolation and evacuation zones has been calculated",
    
    //Settings Panel
    "settingsTitle": "Settings", // Shown as Title for Grid Settings page and label on settings buttons
    
    "spillLocationLabel": "Spill Location", // Shown as Title for Spill Location Settings dropdown
    "spillLocationButtonLabel": "Configure Spill Location Settings", // Shown as tooltip for Spill Location Settings dropdown
    
    "IISettingsLabel": "Initial Isolation Zone", // Shown as Title for Initial Isolation Zone Settings dropdown
    "IIButtonLabel": "Configure Initial Isolation Settings", // Shown as tooltip for Initial Isolation Zone Settings dropdown
    
    "PASettingsLabel": "Protective Action Zone", // Shown as Title for Protective Action Zone Settings dropdown
    "PAButtonLabel": "Configure Protective Action Settings", // Shown as tooltip for Protective Action Zone Settings dropdown
    
    "downwindSettingsLabel": "Downwind Zone", // Shown as Title for Downwind Zone Settings dropdown
    "downwindButtonLabel": "Configure Downwind Settings", // Shown as tooltip for Down Wind Zone Settings dropdown
        
    "fireSettingsLabel": "Fire Isolation Zone", // Shown as Title for Fire Isolation Zone Settings dropdown
    "fireButtonLabel": "Configure Fire Isolation Settings", // Shown as tooltip for Fire Isolation Zone Settings dropdown
    
    "bleveSettingsLabel": "BLEVE Isolation Zone", // Shown as Title for BLEVE Isolation Zone Settings dropdown
    "bleveButtonLabel": "Configure BLEVE Settings", // Shown as tooltip for BLEVE Isolation Zone Settings dropdown
    
    "style": "Style", // Shown as Title for Style dropdown
    
    "lineStyles": {
      "esriSLSDash": "Dash", 
      "esriSLSDashDot": "Dash Dot", 
      "esriSLSDashDotDot": "Dash Dot Dot", 
      "esriSLSDot": "Dot", 
      "esriSLSLongDash": "Long Dash", 
      "esriSLSLongDashDot": "Long Dash Dot", 
      "esriSLSNull": "Null", 
      "esriSLSShortDash": "Short Dash", 
      "esriSLSShortDashDot": "Short Dash Dot", 
      "esriSLSShortDashDotDot": "Short Dash Dot Dot", 
      "esriSLSShortDot": "Short Dot", 
      "esriSLSSolid": "Solid"
    },    
    
    "fillStyles": {
      "esriSFSBackwardDiagonal": "Backward", 
      "esriSFSCross": "Cross", 
      "esriSFSDiagonalCross": "Diagonal", 
      "esriSFSForwardDiagonal": "Forward", 
      "esriSFSHorizontal": "Horizontal", 
      "esriSFSNull": "Null", 
      "esriSFSSolid": "Solid", 
      "esriSFSVertical": "Vertical"
    },     
    
    //results Panel
    "resultsTitle": "Results", // Shown as Title for Grid Settings page and label on settings buttons
    "publishERGBtn": "Publish", // Shown as label on publish ERG button   
    "ERGLayerName": "Published ERG Layer Name", // Shown as label for layer name box
    "invalidERGLayerName": "Layer name must only contain alpha-numeric characters and underscores", //Shown as validation error on published layer name
    "missingERGLayerName": "You must enter a name for the ERG", //Shown as validation error on empty published layer name
    
    //publishing error messages
    "publishingFailedLayerExists": "Publishing Failed: You already have a feature service named {0}. Please choose another name.", //Shown as error for layer name already used when publishing {0} will be replaced with the layer name in the code so do not remove
    "checkService": "Check Service: {0}", //{0} will be replaced in the code so do not remove
    "createService": "Create Service: {0}", //{0} will be replaced in the code so do not remove
    "unableToCreate": "Unable to create: {0}", //{0} will be replaced in the code so do not remove
    "addToDefinition": "Add to definition: {0}", //{0} will be replaced in the code so do not remove
    "successfullyPublished": "Successfully published web layer{0}Manage the web layer", //{0} will be replaced in the code so do not remove
    "userRole": "Unable to create service because user does not have permissions", //displayed as warning when publishing service
    
    //common
    "transparency": "Transparency", // Shown as label on transparency sliders
    "outline": "Outline", // Shown as label for outline color picker
    "fill": "Fill (Color only applies when style set to solid)", // Shown as label for outline color picker
    "createERGBtn": "Create Zones", // Shown as label on create button
    "clearERGBtn": "Clear", // Shown as label on clear button
    "labelFormat": "Label Format", // Shown as label above label format input box
    "helpIconTooltip": "The threshold between small and large spill sizes are:\nLiquids - 55 gallons (208 liters)\nSolids - 60 pounds (300 kilograms)", // Shown as help info on spill size
    "cellWidth": "Cell Width (x)", // Shown as label above cell width input
    "cellHeight": "Cell Height (y)", // Shown as label above cell height input
    "invalidNumberMessage": "The value entered is not valid", //Shown as validation error on invalid entries
    "invalidRangeMessage": "Value must be greater than 0", //Shown as validation error on invalid entries
    "gridAngleInvalidRangeMessage": "Value must be between -89.9 and 89.9", //Shown as validation error for the angle input     
    "formatIconTooltip": "Format Input", // Shown as tooltip on the format input coordinate button
    "setCoordFormat": "Set Coordinate Format String", // Shown as label for set format string
    "prefixNumbers": "Add '+/-' prefix to positive and negative numbers", // Shown as text next to the add prefix check box
    "cancelBtn": "Cancel", // Shown as label on cancel button
    "applyBtn": "Apply", // Shown as label on apply button
    "comfirmInputNotation": "Confirm Input Notation",   //Shown as panel title when more than one notation match
    "notationsMatch": "notations match your input please confirm which you would like to use:", // Shown as message when more than one notation match
    "missingLayerNameMessage": "You must enter a valid layer name before you can publish", //shown as error message for invalid layer name     
    "parseCoordinatesError": "Unable to parse coordinates. Please check your input.", //Shown as error message for unknown coordinates    
  
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
