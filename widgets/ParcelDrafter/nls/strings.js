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
    _widgetLabel: "Parcel Drafter", // Label of widget
    "newTraverseButtonLabel": "Start New Traverse", // Shown as label to Start New Traverse button onLoad
    "invalidConfigMsg": "Invalid Configuration", // Shown as error msg in widget panel if configuration is not valid
    "geometryServiceURLNotFoundMSG": "Unable to get Geometry Service URL", // Shown as error msg in widget panel if geometry service url is not found in WAB app config
    "editTraverseButtonLabel": "Edit Traverse", // Shown as label to Edit Traverse button onLoad
    "mapTooltipForStartNewTraverse": "Please select a point on map, or type below, to begin", // Shown as tooltip when mouse move over the map once start new traverse is selected
    "mapTooltipForEditNewTraverse": "Please select a parcel to edit", // Shown as tooltip when mouse move over the map once edit new traverse is selected
    "mapTooltipForUpdateStartPoint": "Click to update start point", // Shown as tooltip when mouse move over the map once traverse grid page is shown
    "mapTooltipForScreenDigitization": "Click to add parcel point", // Shown as tooltip when mouse move over the map once screen digitization tool is activated
    "mapTooltipForRotate": "Drag to rotate", // Shown as tooltip when mouse drag over the map once rotation tool is activated
    "mapTooltipForScale": "Drag to scale", // Shown as tooltip when mouse drag over the map once scaling tool is activated
    "backButtonTooltip": "Back", // Shown as tooltip on back buttons
    "newTraverseTitle": "New Traverse", // Shown as title for new traverse page
    "editTraverseTitle": "Edit Traverse", // Shown as title for new traverse page
    "clearingDataConfirmationMessage": "Changes will be discarded, do you want to proceed?", // Shown as warning message when user wants to clear all the parcel data
    "unableToFetchParcelMessage": "Unable to fetch parcel.", // Shown when error occurs while  fetching parcel polyline for editing it
    "unableToFetchParcelLinesMessage": "Unable to fetch parcel lines.", // Shown when error occurs while  fetching parcel polyline for editing it

    "planSettings": {
      "planSettingsTitle": "Settings", // Shown as Title for Plan Settings page
      "directionOrAngleTypeLabel": "Direction or Angle Type", // Shown as label to set Direction or Angle Type
      "directionOrAngleUnitsLabel": "Direction or Angle Units",  // Shown as label to set Direction or Angle Units
      "distanceAndLengthUnitsLabel": "Distance and Length Units", // Shown as label to set Distance and Length Units
      "areaUnitsLabel": "Area Units", // Shown as label to set Area Units
      "circularCurveParameters": "Circular Curve Parameters", // Shown as label to set Circular Curve Parameters
      "northAzimuth": "North Azimuth", // Shown as label for north azimuth in direction or angle type dropdown
      "southAzimuth": "South Azimuth", // Shown as label for south azimuth in direction or angle type dropdown
      "quadrantBearing": "Quadrant Bearing", // Shown as label for Quadrant Bearing in direction or angle type dropdown
      "radiusAndChordLength": "Radius and Chord Length", // Shown as label for Radius And Chord Length in circular curve parameters dropdown
      "radiusAndArcLength": "Radius and Arc Length", // Shown as label for Radius And Arc Length in circular curve parameters dropdown
      "expandGridTooltipText": "Expand grid", // Show on hover of the expand grid button
      "collapseGridTooltipText": "Collapse grid", // Show on hover of the collapse grid button
      "zoomToLocationTooltipText": "Zoom to location", // Show on hover of the zoomToLocation button
      "onScreenDigitizationTooltipText": "Digitize" // Show on hover of the Digitization button
    },

    "traverseSettings": {
      "bearingLabel": "Bearing", // Shown as label for bearing column in traverse grid
      "lengthLabel": "Length", // Shown as label for length column in traverse grid
      "radiusLabel": "Radius", // Shown as label for radius column in traverse grid
      "noMiscloseCalculated": "Misclose not calculated", // Shown when misclose is not calculated
      "traverseMiscloseBearing": "Misclose Bearing",  // Shown as label for misclose bearing
      "traverseAccuracy": "Accuracy",  // Shown as label for accuracy
      "accuracyHigh": "High",  // Shown as label for high accuracy
      "traverseDistance": "Misclose Distance",  // Shown as label for misclose distance
      "traverseMiscloseRatio": "Misclose Ratio",  // Shown as label for misclose ratio
      "traverseStatedArea": "Stated Area", // Shown as label for stated area
      "traverseCalculatedArea": "Calculated Area", // Shown as label for calculated area
      "addButtonTitle": "Add", // Shown as title on add button
      "deleteButtonTitle": "Remove" // Shown as title on delete button
    },

    "parcelTools": {
      "rotationToolLabel": "Angle", // Shown as label to Rotate of selected parcel
      "scaleToolLabel": "Scale" // Shown as label to scale of selected parcel
    },

    "newTraverse": {
      "invalidBearingMessage": "Invalid Bearing.", // Shown when invalid bearing is entered
      "invalidLengthMessage": "Invalid Length.", // Shown when invalid length is entered
      "invalidRadiusMessage": "Invalid Radius.", // Shown when invalid radius is entered
      "negativeLengthMessage": "Valid only for curves", // Shown when negative value is entered in length
      "enterValidValuesMessage": "Please enter valid values.", // Shown when invalid value is there in bearing grid column & user tries to add a new bearing row
      "enterValidParcelInfoMessage": "Please enter some valid parcel info to save.", // Shown when invalid parcel info is there and user tries to save parcel
      "unableToDrawLineMessage": "Unable to draw line.", // Shown when parcel lines unable to render
      "invalidEndPointMessage": "Invalid End-Point, unable to draw line." // Shown when user tries to draw line at invalid end point
    },

    "planInfo": {
      "requiredText": "(required)",
      "optionalText": "(optional)",
      "parcelNamePlaceholderText": "Parcel name", // Shown as Place Holder for Parcel name
      "parcelDocumentTypeText": "Document type", // Shown as Place Holder for Document type
      "planNamePlaceholderText": "Plan name",  // Shown as Place Holder for Plan name
      "cancelButtonLabel": "Cancel", // Shown as label of cancel button
      "saveButtonLabel": "Save", // Shown as label of Save button
      "saveNonClosedParcelConfirmationMessage": "The entered parcel is not closed, do you still want to proceed and save only parcel lines?", // Shown when user tries to save unclosed polygon
      "unableToCreatePolygonParcel": "Unable to create parcel polygon.", // Shown when error occurs while creating data of polygon for saving it
      "unableToSavePolygonParcel": "Unable to save parcel polygon.", // Shown when error occurs while saving parcel polygon
      "unableToSaveParcelLines": "Unable to save parcel lines.", // Shown when error occurs while saving parcel lines
      "unableToUpdateParcelLines": "Unable to update parcel lines.", // Shown when error occurs while updating parcel lines
      "parcelSavedSuccessMessage": "Parcel saved successfully.", // Shown when parcel is saved successfully
      "enterValidParcelNameMessage": "Please enter valid parcel name.", // Shown as error message when parcel name is invalid
      "enterValidPlanNameMessage": "Please enter valid plan name.", // Shown as error message when parcel name is invalid
      "enterValidDocumentTypeMessage": "Invalid document type.", // Shown as error message when document type is invalid
      "enterValidStatedAreaNameMessage": "Please enter valid stated area." // Shown as error message when stated area is invalid
    },

    "xyInput": {
      "explanation": "In the spatial reference of your parcels layer"  // Shown as tooltip over type-in boxes for X and Y coordinates
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
