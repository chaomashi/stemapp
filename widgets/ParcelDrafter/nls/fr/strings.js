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
  "_widgetLabel": "Dessinateur de parcelles",
  "newTraverseButtonLabel": "Démarrer un nouveau parcours",
  "invalidConfigMsg": "Configuration non valide",
  "geometryServiceURLNotFoundMSG": "Impossible d'obtenir l'URL du service de géométrie",
  "editTraverseButtonLabel": "Modifier le parcours",
  "mapTooltipForStartNewTraverse": "Sélectionnez un point sur la carte ou tapez ci-dessous pour commencer",
  "mapTooltipForEditNewTraverse": "Sélectionnez une parcelle à modifier",
  "mapTooltipForUpdateStartPoint": "Cliquez pour mettre à jour le point de départ",
  "mapTooltipForScreenDigitization": "Cliquez pour ajouter un point de parcelle",
  "mapTooltipForRotate": "Faites glisser pour faire pivoter",
  "mapTooltipForScale": "Faire glisser pour mettre à l'échelle",
  "backButtonTooltip": "Précédent",
  "newTraverseTitle": "Nouveau parcours",
  "editTraverseTitle": "Modifier le parcours",
  "clearingDataConfirmationMessage": "Les modifications seront ignorées. Voulez-vous continuer ?",
  "unableToFetchParcelMessage": "Impossible d'extraire la parcelle.",
  "unableToFetchParcelLinesMessage": "Impossible d'extraire les lignes de parcelle.",
  "planSettings": {
    "planSettingsTitle": "Paramètres",
    "directionOrAngleTypeLabel": "Type de direction ou d'angle",
    "directionOrAngleUnitsLabel": "Unités de direction ou d'angle",
    "distanceAndLengthUnitsLabel": "Unités de distance et de longueur",
    "areaUnitsLabel": "Unités de surface",
    "circularCurveParameters": "Paramètres de courbe circulaire",
    "northAzimuth": "Nord azimutal",
    "southAzimuth": "Sud azimutal",
    "quadrantBearing": "Orientation au quadrant",
    "radiusAndChordLength": "Rayon et longueur de corde",
    "radiusAndArcLength": "Rayon et longueur d'arc",
    "expandGridTooltipText": "Développer la grille",
    "collapseGridTooltipText": "Réduire la grille",
    "zoomToLocationTooltipText": "Zoom sur l'emplacement",
    "onScreenDigitizationTooltipText": "Numériser"
  },
  "traverseSettings": {
    "bearingLabel": "Orientation",
    "lengthLabel": "Longueur",
    "radiusLabel": "Rayon",
    "noMiscloseCalculated": "Ecart de fermeture non calculé",
    "traverseMiscloseBearing": "Misclose Bearing",
    "traverseAccuracy": "Précision",
    "accuracyHigh": "Elevée",
    "traverseDistance": "Distance d'écart de fermeture",
    "traverseMiscloseRatio": "Taux d'écart de fermeture",
    "traverseStatedArea": "Zone indiquée",
    "traverseCalculatedArea": "Zone calculée",
    "addButtonTitle": "Ajouter",
    "deleteButtonTitle": "Supprimer"
  },
  "parcelTools": {
    "rotationToolLabel": "Angle",
    "scaleToolLabel": "Echelle"
  },
  "newTraverse": {
    "invalidBearingMessage": "Orientation non valide.",
    "invalidLengthMessage": "Longueur non valide.",
    "invalidRadiusMessage": "Rayon non valide.",
    "negativeLengthMessage": "Valide uniquement pour les courbes",
    "enterValidValuesMessage": "Entrez des valeurs valides.",
    "enterValidParcelInfoMessage": "Entrez des informations de parcelle valides à enregistrer.",
    "unableToDrawLineMessage": "Impossible de tracer une ligne.",
    "invalidEndPointMessage": "Point de fin non valide. Impossible de tracer la ligne."
  },
  "planInfo": {
    "requiredText": "(obligatoire)",
    "optionalText": "(facultatif)",
    "parcelNamePlaceholderText": "Nom de parcelle",
    "parcelDocumentTypeText": "Type de document",
    "planNamePlaceholderText": "Nom du plan",
    "cancelButtonLabel": "Annuler",
    "saveButtonLabel": "Enregistrer",
    "saveNonClosedParcelConfirmationMessage": "La parcelle entrée n'est pas fermée. Voulez-vous cependant continuer et enregistrer uniquement les lignes de la parcelle ?",
    "unableToCreatePolygonParcel": "Impossible de créer le polygone de parcelle.",
    "unableToSavePolygonParcel": "Impossible d'enregistrer le polygone de parcelle.",
    "unableToSaveParcelLines": "Impossible d'enregistrer les lignes de parcelle.",
    "unableToUpdateParcelLines": "Impossible de mettre à jour les lignes de parcelle.",
    "parcelSavedSuccessMessage": "Parcelle enregistrée avec succès.",
    "enterValidParcelNameMessage": "Entrez un nom de parcelle valide.",
    "enterValidPlanNameMessage": "Entrez un nom de plan valide.",
    "enterValidDocumentTypeMessage": "Type de document non valide",
    "enterValidStatedAreaNameMessage": "Entrez une zone indiquée valide."
  },
  "xyInput": {
    "explanation": "Dans la référence spatiale de votre couche de parcelles"
  }
});