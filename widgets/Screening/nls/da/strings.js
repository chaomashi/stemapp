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
  "_widgetLabel": "Screening",
  "geometryServicesNotFound": "Geometritjeneste er ikke tilgængelig.",
  "unableToDrawBuffer": "Kan ikke tegne buffer. Prøv igen.",
  "invalidConfiguration": "Ugyldig konfiguration.",
  "clearAOIButtonLabel": "Start forfra",
  "noGraphicsShapefile": "Den overførte shapefil indeholder ikke nogen grafik.",
  "zoomToLocationTooltipText": "Zoom til position",
  "noGraphicsToZoomMessage": "Ingen grafik fundet at zoome ind på.",
  "placenameWidget": {
    "placenameLabel": "Søg efter en position"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Vælg tegnetilstand",
    "toggleSelectability": "Klik for at skifte valgbarhed",
    "chooseLayerTitle": "Vælg et lag, der kan vælges",
    "selectAllLayersText": "Vælg alle",
    "layerSelectionWarningTooltip": "Mindst ét lag bør vælges for at oprette AOI"
  },
  "shapefileWidget": {
    "shapefileLabel": "Overfør en zip-komprimeret shapefil",
    "uploadShapefileButtonText": "Overfør",
    "unableToUploadShapefileMessage": "Kan ikke overføre shapefilen."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Definér et startpunkt",
    "addButtonTitle": "Tilføj",
    "deleteButtonTitle": "Fjern",
    "mapTooltipForStartPoint": "Klik på kortet for at definere et startpunkt",
    "mapTooltipForUpdateStartPoint": "Klik på kortet for at opdatere startpunktet",
    "locateText": "Find",
    "locateByMapClickText": "Vælg startkoordinater",
    "enterBearingAndDistanceLabel": "Angiv pejling og afstand fra startpunkt",
    "bearingTitle": "Pejling",
    "distanceTitle": "Afstand",
    "planSettingTooltip": "Planindstillinger",
    "invalidLatLongMessage": "Indtast gyldige værdier."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Bufferafstand (valgfri)",
    "bufferInputLabel": "Viser resultater inden for"
  },
  "traverseSettings": {
    "bearingLabel": "Pejling",
    "lengthLabel": "Længde",
    "addButtonTitle": "Tilføj",
    "deleteButtonTitle": "Fjern"
  },
  "planSettings": {
    "expandGridTooltipText": "Udvid gitter",
    "collapseGridTooltipText": "Skjul gitter",
    "directionUnitLabelText": "Retningsenhed",
    "distanceUnitLabelText": "Afstands- og længdeenheder",
    "planSettingsComingSoonText": "Kommer snart"
  },
  "newTraverse": {
    "invalidBearingMessage": "Ugyldig pejling.",
    "invalidLengthMessage": "Ugyldig længde.",
    "negativeLengthMessage": "Negativ længde"
  },
  "reportsTab": {
    "aoiAreaText": "AOI-område",
    "downloadButtonTooltip": "Hent",
    "printButtonTooltip": "Udskriv",
    "uploadShapefileForAnalysisText": "Overfør shapefil, der skal medtages i analyse",
    "uploadShapefileForButtonText": "Gennemse",
    "downloadLabelText": "Vælg format:",
    "downloadBtnText": "Hent",
    "noDetailsAvailableText": "Ingen resultater fundet",
    "featureCountText": "Tælling",
    "featureAreaText": "Område",
    "featureLengthText": "Længde",
    "attributeChooserTooltip": "Vælg attributter, der skal vises",
    "csv": "CSV",
    "filegdb": "Filgeodatabase",
    "shapefile": "Shapefil",
    "noFeaturesFound": "Intet resultat fundet for det valgte filformat",
    "selectReportFieldTitle": "Vælg felter",
    "noFieldsSelected": "Ingen felter valgt",
    "intersectingFeatureExceedsMsgOnCompletion": "Det maksimale antal poster er nået for et eller flere lag.",
    "unableToAnalyzeText": "Kan ikke analysere, det maksimale antal poster er nået.",
    "errorInPrintingReport": "Kan ikke udskrive rapporten. Kontrollér, om rapportindstillingerne er gyldige.",
    "aoiInformationTitle": "Oplysninger om interesseområde (AOI)",
    "summaryReportTitle": "Resumé",
    "notApplicableText": "I/T",
    "downloadReportConfirmTitle": "Bekræft download",
    "downloadReportConfirmMessage": "Er du sikker på, at du vil downloade?",
    "noDataText": "Ingen data",
    "createReplicaFailedMessage": "Downloadhandling mislykkedes for følgende lag: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Downloadhandling mislykkedes.",
    "printLayoutLabelText": "Layout",
    "printBtnText": "Udskriv",
    "printDialogHint": "Bemærk: Rapporttitel og kommentarer kan redigeres i forhåndsvisningen af rapporten.",
    "unableToDownloadFileGDBText": "Filgeodatabase kan ikke downloades for AOI, der indeholder punkt- eller linjepositioner",
    "unableToDownloadShapefileText": "Shapefil kan ikke downloades for AOI, der indeholder punkt- eller linjepositioner",
    "analysisUnitLabelText": "Vis resultater i:",
    "analysisUnitButtonTooltip": "Vælg enheder til analyse",
    "analysisCloseBtnText": "Luk",
    "feetUnit": "Fod / Kvadratfod",
    "milesUnit": "Miles / Acres",
    "metersUnit": "Meter / Kvadratmeter",
    "kilometersUnit": "Kilometer / Kvadratkilometer",
    "hectaresUnit": "Kilometer / Hektarer",
    "hectaresAbbr": "hektarer",
    "layerNotVisibleText": "Kan ikke analysere, laget er slået fra eller ligger uden for målestokkens synlighedsområde.",
    "refreshBtnTooltip": "Opdatér rapport",
    "featureCSVAreaText": "Gennemskæringsområde",
    "featureCSVLengthText": "Gennemskæringslængde",
    "errorInFetchingPrintTask": "Der opstod et problem under hentning af printopgavens oplysninger. Prøv igen."
  }
});