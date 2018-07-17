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
  "_widgetLabel": "Prüfung",
  "geometryServicesNotFound": "Geometrieservice ist nicht verfügbar.",
  "unableToDrawBuffer": "Puffer kann nicht dargestellt werden. Versuchen Sie es erneut.",
  "invalidConfiguration": "Ungültige Konfiguration.",
  "clearAOIButtonLabel": "Erneut starten",
  "noGraphicsShapefile": "Das hochgeladene Shapefile enthält keine Grafiken.",
  "zoomToLocationTooltipText": "Auf Position zoomen",
  "noGraphicsToZoomMessage": "Keine Grafiken zum Vergrößern gefunden.",
  "placenameWidget": {
    "placenameLabel": "Nach einer Position suchen"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Zeichenmodus auswählen",
    "toggleSelectability": "Zum Umschalten der Auswählbarkeit klicken",
    "chooseLayerTitle": "Auswählbaren Layer festlegen",
    "selectAllLayersText": "Alles auswählen",
    "layerSelectionWarningTooltip": "Es sollte mindestens ein Layer zur Erstellung des Interessenbereichs ausgewählt werden."
  },
  "shapefileWidget": {
    "shapefileLabel": "Gezipptes Shapefile hochladen",
    "uploadShapefileButtonText": "Hochladen",
    "unableToUploadShapefileMessage": "Shapefile kann nicht hochgeladen werden"
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Startpunkt definieren",
    "addButtonTitle": "Hinzufügen",
    "deleteButtonTitle": "Entfernen",
    "mapTooltipForStartPoint": "Zum Festlegen eines Startpunktes auf die Karte klicken",
    "mapTooltipForUpdateStartPoint": "Zum Aktualisieren des Startpunktes auf die Karte klicken",
    "locateText": "Suchen",
    "locateByMapClickText": "Anfangskoordinaten festlegen",
    "enterBearingAndDistanceLabel": "Geben Sie die Peilung und die Distanz vom Startpunkt ein.",
    "bearingTitle": "Peilung",
    "distanceTitle": "Abstand",
    "planSettingTooltip": "Planeinstellungen",
    "invalidLatLongMessage": "Geben Sie gültige Werte ein."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Pufferabstand (optional)",
    "bufferInputLabel": "Ergebnisse anzeigen in"
  },
  "traverseSettings": {
    "bearingLabel": "Peilung",
    "lengthLabel": "Länge",
    "addButtonTitle": "Hinzufügen",
    "deleteButtonTitle": "Entfernen"
  },
  "planSettings": {
    "expandGridTooltipText": "Gitternetz erweitern",
    "collapseGridTooltipText": "Gitternetz reduzieren",
    "directionUnitLabelText": "Einheit für Richtungen",
    "distanceUnitLabelText": "Strecken- und Längeneinheiten",
    "planSettingsComingSoonText": "In Kürze verfügbar"
  },
  "newTraverse": {
    "invalidBearingMessage": "Ungültige Peilung.",
    "invalidLengthMessage": "Ungültige Länge.",
    "negativeLengthMessage": "Negativer Wert für Länge"
  },
  "reportsTab": {
    "aoiAreaText": "AOI-Bereich",
    "downloadButtonTooltip": "Herunterladen",
    "printButtonTooltip": "Drucken",
    "uploadShapefileForAnalysisText": "Shapefile für das Einbeziehen in die Analyse hochladen",
    "uploadShapefileForButtonText": "Durchsuchen",
    "downloadLabelText": "Format auswählen:",
    "downloadBtnText": "Herunterladen",
    "noDetailsAvailableText": "Keine Ergebnisse gefunden",
    "featureCountText": "Anzahl",
    "featureAreaText": "Fläche",
    "featureLengthText": "Länge",
    "attributeChooserTooltip": "Anzuzeigende Attribute festlegen",
    "csv": "CSV",
    "filegdb": "File-Geodatabase",
    "shapefile": "Shapefile",
    "noFeaturesFound": "Kein Ergebnis für das ausgewählte Dateiformat gefunden",
    "selectReportFieldTitle": "Felder auswählen",
    "noFieldsSelected": "Keine Felder ausgewählt",
    "intersectingFeatureExceedsMsgOnCompletion": "Bei mindestens einem Layer wurde die Höchstanzahl der Datensätze erreicht.",
    "unableToAnalyzeText": "Analyse kann nicht ausgeführt werden: Höchstanzahl der Datensätze wurde erreicht.",
    "errorInPrintingReport": "Bericht kann nicht gedruckt werden. Prüfen Sie, ob die Einstellungen für den Bericht gültig sind.",
    "aoiInformationTitle": "Informationen zum Interessenbereich (AOI)",
    "summaryReportTitle": "Zusammenfassung",
    "notApplicableText": "n. z.",
    "downloadReportConfirmTitle": "Download bestätigen",
    "downloadReportConfirmMessage": "Möchten Sie wirklich herunterladen?",
    "noDataText": "Keine Daten",
    "createReplicaFailedMessage": "Fehler beim Herunterladen des/der folgenden Layer: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Fehler beim Herunterladen",
    "printLayoutLabelText": "Layout",
    "printBtnText": "Drucken",
    "printDialogHint": "Hinweis : Der Titel des Berichts und die Kommentare können in der Berichtsansicht bearbeitet werden.",
    "unableToDownloadFileGDBText": "File-Geodatabase kann für Interessenbereich, der Punkt- oder Linienpositionen enthält, nicht heruntergeladen werden.",
    "unableToDownloadShapefileText": "Shapefile kann für Interessenbereich, der Punkt- oder Linienpositionen enthält, nicht heruntergeladen werden.",
    "analysisUnitLabelText": "Ergebnisse anzeigen in:",
    "analysisUnitButtonTooltip": "Einheiten für Analyse auswählen",
    "analysisCloseBtnText": "Schließen",
    "feetUnit": "Fuß / Quadratfuß",
    "milesUnit": "Meilen / Acres",
    "metersUnit": "Meter / Quadratmeter",
    "kilometersUnit": "Kilometer / Quadratkilometer",
    "hectaresUnit": "Kilometer / Hektar",
    "hectaresAbbr": "Hektar",
    "layerNotVisibleText": "Analyse kann nicht durchgeführt werden; Layer ist deaktiviert oder außerhalb des Sichtbarkeitsbereichs für den Maßstab.",
    "refreshBtnTooltip": "Bericht aktualisieren",
    "featureCSVAreaText": "Sich überschneidende Fläche",
    "featureCSVLengthText": "Sich überschneidende Länge",
    "errorInFetchingPrintTask": "Fehler beim Abrufen der Druckauftragsinformationen. Versuchen Sie es erneut."
  }
});