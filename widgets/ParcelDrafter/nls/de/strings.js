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
  "_widgetLabel": "Flurstückserstellung",
  "newTraverseButtonLabel": "Neuen Polygonzug beginnen",
  "invalidConfigMsg": "Ungültige Konfiguration",
  "geometryServiceURLNotFoundMSG": "URL des Geometrieservice kann nicht abgerufen werden",
  "editTraverseButtonLabel": "Polygonzug bearbeiten",
  "mapTooltipForStartNewTraverse": "Wählen Sie einen Punkt auf der Karte oder einen Typ unten aus, um zu beginnen.",
  "mapTooltipForEditNewTraverse": "Wählen Sie ein zu bearbeitendes Flurstück aus.",
  "mapTooltipForUpdateStartPoint": "Zum Aktualisieren des Startpunkts klicken",
  "mapTooltipForScreenDigitization": "Zum Hinzufügen von Flurstückspunkt klicken",
  "mapTooltipForRotate": "Zum Drehen ziehen",
  "mapTooltipForScale": "Zum Skalieren ziehen",
  "backButtonTooltip": "Zurück",
  "newTraverseTitle": "Neuer Polygonzug",
  "editTraverseTitle": "Polygonzug bearbeiten",
  "clearingDataConfirmationMessage": "Die Änderungen werden verworfen. Möchten Sie fortfahren?",
  "unableToFetchParcelMessage": "Flurstück konnte nicht abgerufen werden.",
  "unableToFetchParcelLinesMessage": "Flurstückslinien konnten nicht abgerufen werden.",
  "planSettings": {
    "planSettingsTitle": "Einstellungen",
    "directionOrAngleTypeLabel": "Richtungs- oder Winkeltyp",
    "directionOrAngleUnitsLabel": "Richtungs- oder Winkeleinheiten",
    "distanceAndLengthUnitsLabel": "Strecken- und Längeneinheiten",
    "areaUnitsLabel": "Flächeneinheiten",
    "circularCurveParameters": "Parameter der kreisförmigen Kurve",
    "northAzimuth": "Nordazimut",
    "southAzimuth": "Südazimut",
    "quadrantBearing": "Quadrantwinkel",
    "radiusAndChordLength": "Radius und Sehnenlänge",
    "radiusAndArcLength": "Radius und Kreisbogenlänge",
    "expandGridTooltipText": "Gitternetz erweitern",
    "collapseGridTooltipText": "Gitternetz reduzieren",
    "zoomToLocationTooltipText": "Auf Position zoomen",
    "onScreenDigitizationTooltipText": "Digitalisieren"
  },
  "traverseSettings": {
    "bearingLabel": "Peilung",
    "lengthLabel": "Länge",
    "radiusLabel": "Radius",
    "noMiscloseCalculated": "Abschlussfehler nicht berechnet",
    "traverseMiscloseBearing": "Abschlussfehler-Peilung",
    "traverseAccuracy": "Genauigkeit",
    "accuracyHigh": "Hoch",
    "traverseDistance": "Abschlussfehler-Entfernung",
    "traverseMiscloseRatio": "Abschlussfehler-Verhältnis",
    "traverseStatedArea": "Angegebene Fläche",
    "traverseCalculatedArea": "Berechnete Fläche",
    "addButtonTitle": "Hinzufügen",
    "deleteButtonTitle": "Entfernen"
  },
  "parcelTools": {
    "rotationToolLabel": "Winkel",
    "scaleToolLabel": "Maßstab"
  },
  "newTraverse": {
    "invalidBearingMessage": "Ungültige Peilung.",
    "invalidLengthMessage": "Ungültige Länge.",
    "invalidRadiusMessage": "Ungültiger Radius.",
    "negativeLengthMessage": "Nur für Kurven gültig",
    "enterValidValuesMessage": "Geben Sie gültige Werte ein.",
    "enterValidParcelInfoMessage": "Geben Sie zum Speichern gültige Informationen zum Flurstück ein.",
    "unableToDrawLineMessage": "Linie kann nicht gezogen werden.",
    "invalidEndPointMessage": "Ungültiger Endpunkt, Linie kann nicht gezogen werden."
  },
  "planInfo": {
    "requiredText": "(erforderlich)",
    "optionalText": "(optional)",
    "parcelNamePlaceholderText": "Flurstücksname",
    "parcelDocumentTypeText": "Dokumenttyp",
    "planNamePlaceholderText": "Planname",
    "cancelButtonLabel": "Abbrechen",
    "saveButtonLabel": "Speichern",
    "saveNonClosedParcelConfirmationMessage": "Das eingegebene Flurstück ist nicht geschlossen. Möchten Sie den Vorgang trotzdem fortsetzen und nur die Flurstückslinien speichern?",
    "unableToCreatePolygonParcel": "Flurstückspolygon kann nicht erstellt werden.",
    "unableToSavePolygonParcel": "Flurstückspolygon kann nicht gespeichert werden.",
    "unableToSaveParcelLines": "Flurstückslinien können nicht gespeichert werden.",
    "unableToUpdateParcelLines": "Flurstückslinien können nicht aktualisiert werden.",
    "parcelSavedSuccessMessage": "Flurstück erfolgreich gespeichert.",
    "enterValidParcelNameMessage": "Geben Sie einen gültigen Flurstücksnamen ein.",
    "enterValidPlanNameMessage": "Geben Sie einen gültigen Plannamen ein.",
    "enterValidDocumentTypeMessage": "Ungültiger Dokumenttyp",
    "enterValidStatedAreaNameMessage": "Geben Sie eine gültige angegebene Fläche ein."
  },
  "xyInput": {
    "explanation": "Im Raumbezug des Flurstücks-Layers"
  }
});