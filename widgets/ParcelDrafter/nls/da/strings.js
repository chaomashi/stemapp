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
  "_widgetLabel": "Parcel Drafter",
  "newTraverseButtonLabel": "Start ny travers",
  "invalidConfigMsg": "Ugyldig konfiguration",
  "geometryServiceURLNotFoundMSG": "Kan ikke hente geometritjeneste-URL",
  "editTraverseButtonLabel": "Redigér travers",
  "mapTooltipForStartNewTraverse": "Vælg et punkt på kortet, eller skriv nedenfor for at starte",
  "mapTooltipForEditNewTraverse": "Vælg en parcel, der skal redigeres",
  "mapTooltipForUpdateStartPoint": "Klik for at opdatere startpunkt",
  "mapTooltipForScreenDigitization": "Klik for at tilføje parcelpunkt",
  "mapTooltipForRotate": "Træk for at rotere",
  "mapTooltipForScale": "Træk for at skalere",
  "backButtonTooltip": "Tilbage",
  "newTraverseTitle": "Ny travers",
  "editTraverseTitle": "Redigér travers",
  "clearingDataConfirmationMessage": "Ændringerne vil blive slettet, vil du fortsætte?",
  "unableToFetchParcelMessage": "Kan ikke hente parcel.",
  "unableToFetchParcelLinesMessage": "Kan ikke hente parcellinjer.",
  "planSettings": {
    "planSettingsTitle": "Indstillinger",
    "directionOrAngleTypeLabel": "Retning eller vinkeltype",
    "directionOrAngleUnitsLabel": "Retning eller vinkelenheder",
    "distanceAndLengthUnitsLabel": "Afstands- og længdeenheder",
    "areaUnitsLabel": "Områdeenheder",
    "circularCurveParameters": "Cirkulære kurveparametre",
    "northAzimuth": "Azimut - nord",
    "southAzimuth": "Azimut - syd",
    "quadrantBearing": "Kvadrantpejling",
    "radiusAndChordLength": "Radius og akkordlængde",
    "radiusAndArcLength": "Radius og buelængde",
    "expandGridTooltipText": "Udvid gitter",
    "collapseGridTooltipText": "Skjul gitter",
    "zoomToLocationTooltipText": "Zoom til position",
    "onScreenDigitizationTooltipText": "Digitalisér"
  },
  "traverseSettings": {
    "bearingLabel": "Pejling",
    "lengthLabel": "Længde",
    "radiusLabel": "Radius",
    "noMiscloseCalculated": "Misclose ikke beregnet",
    "traverseMiscloseBearing": "Misclose af pejling",
    "traverseAccuracy": "Præcision",
    "accuracyHigh": "Høj",
    "traverseDistance": "Misclose-afstand",
    "traverseMiscloseRatio": "Misclose-forhold",
    "traverseStatedArea": "Angivet område",
    "traverseCalculatedArea": "Beregnet område",
    "addButtonTitle": "Tilføj",
    "deleteButtonTitle": "Fjern"
  },
  "parcelTools": {
    "rotationToolLabel": "Vinkel",
    "scaleToolLabel": "Målestok"
  },
  "newTraverse": {
    "invalidBearingMessage": "Ugyldig pejling.",
    "invalidLengthMessage": "Ugyldig længde.",
    "invalidRadiusMessage": "Ugyldig radius.",
    "negativeLengthMessage": "Kun gyldig for kurver",
    "enterValidValuesMessage": "Indtast gyldige værdier.",
    "enterValidParcelInfoMessage": "Angiv nogle gyldige parceloplysninger, der skal gemmes.",
    "unableToDrawLineMessage": "Kan ikke tegne linje.",
    "invalidEndPointMessage": "Ugyldigt End-Point, kan ikke tegne linje."
  },
  "planInfo": {
    "requiredText": "(obligatorisk)",
    "optionalText": "(valgfri)",
    "parcelNamePlaceholderText": "Parcelnavn",
    "parcelDocumentTypeText": "Dokumenttype",
    "planNamePlaceholderText": "Plannavn",
    "cancelButtonLabel": "Annullér",
    "saveButtonLabel": "Gem",
    "saveNonClosedParcelConfirmationMessage": "Den angivne parcel er ikke lukket, vil du stadig fortsætte og kun gemme parcellinjer?",
    "unableToCreatePolygonParcel": "Kan ikke oprette parcelpolygon.",
    "unableToSavePolygonParcel": "Kan ikke gemme parcelpolygon.",
    "unableToSaveParcelLines": "Kan ikke gemme parcellinjer.",
    "unableToUpdateParcelLines": "Kan ikke opdatere parcellinjer.",
    "parcelSavedSuccessMessage": "Parcel er gemt med succes.",
    "enterValidParcelNameMessage": "Angiv et gyldigt parcelnavn.",
    "enterValidPlanNameMessage": "Angiv et gyldigt plannavn.",
    "enterValidDocumentTypeMessage": "Ugyldig dokumenttype.",
    "enterValidStatedAreaNameMessage": "Angiv et gyldigt angivet område."
  },
  "xyInput": {
    "explanation": "I den spatiale reference for dit parcellag"
  }
});