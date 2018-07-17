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
  "geometryServicesNotFound": "Geometrie-service niet beschikbaar.",
  "unableToDrawBuffer": "Kan buffer niet tekenen. Probeer het opnieuw.",
  "invalidConfiguration": "Ongeldige configuratie.",
  "clearAOIButtonLabel": "Opnieuw beginnen",
  "noGraphicsShapefile": "De geüploade shapefile bevat geen grafische gegevens.",
  "zoomToLocationTooltipText": "Inzoomen op locatie",
  "noGraphicsToZoomMessage": "Geen grafische gegevens gevonden om in te zoomen.",
  "placenameWidget": {
    "placenameLabel": "Zoeken naar een locatie"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Tekenmodus selecteren",
    "toggleSelectability": "Klik om selecteerbaarheid te wisselen",
    "chooseLayerTitle": "Kies selecteerbare laag",
    "selectAllLayersText": "Alles selecteren",
    "layerSelectionWarningTooltip": "Ten minste één laag moet geselecteerd worden voor het maken van AOI"
  },
  "shapefileWidget": {
    "shapefileLabel": "Een gezipte shapefile uploaden",
    "uploadShapefileButtonText": "Uploaden",
    "unableToUploadShapefileMessage": "Kan shapefile niet uploaden."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Een startpunt definiëren",
    "addButtonTitle": "Toevoegen",
    "deleteButtonTitle": "Verwijderen",
    "mapTooltipForStartPoint": "Klik op de kaart om een startpunt te definiëren",
    "mapTooltipForUpdateStartPoint": "Klik op de kaart om het startpunt te updaten",
    "locateText": "Zoom naar",
    "locateByMapClickText": "Initiële coördinaten selecteren",
    "enterBearingAndDistanceLabel": "Richting en afstand van een startpunt invoeren",
    "bearingTitle": "Richting",
    "distanceTitle": "Afstand",
    "planSettingTooltip": "Instellingen plannen",
    "invalidLatLongMessage": "Voer geldige waarden in."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Bufferafstand (optioneel)",
    "bufferInputLabel": "Resultaten weergeven binnen"
  },
  "traverseSettings": {
    "bearingLabel": "Richting",
    "lengthLabel": "Lengte",
    "addButtonTitle": "Toevoegen",
    "deleteButtonTitle": "Verwijderen"
  },
  "planSettings": {
    "expandGridTooltipText": "Raster uitvouwen",
    "collapseGridTooltipText": "Raster samenvouwen",
    "directionUnitLabelText": "Eenheid routebeschrijving",
    "distanceUnitLabelText": "Eenheden afstand en lengte",
    "planSettingsComingSoonText": "Binnenkort beschikbaar"
  },
  "newTraverse": {
    "invalidBearingMessage": "Ongeldige richting.",
    "invalidLengthMessage": "Ongeldige lengte.",
    "negativeLengthMessage": "Negatieve lengte"
  },
  "reportsTab": {
    "aoiAreaText": "AOI-gebied",
    "downloadButtonTooltip": "Downloaden",
    "printButtonTooltip": "Afdrukken",
    "uploadShapefileForAnalysisText": "Shapefile uploaden om in analyse in te sluiten",
    "uploadShapefileForButtonText": "Bladeren",
    "downloadLabelText": "Opmaak selecteren:",
    "downloadBtnText": "Downloaden",
    "noDetailsAvailableText": "Geen resultaten gevonden",
    "featureCountText": "Aantal",
    "featureAreaText": "Gebied",
    "featureLengthText": "Lengte",
    "attributeChooserTooltip": "Weer te geven attributen kiezen",
    "csv": "CSV",
    "filegdb": "File geodatabase",
    "shapefile": "Shapefile",
    "noFeaturesFound": "Geen resultaat gevonden voor geselecteerde bestandindeling",
    "selectReportFieldTitle": "Velden selecteren",
    "noFieldsSelected": "Geen velden geselecteerd",
    "intersectingFeatureExceedsMsgOnCompletion": "Voor een of meerdere lagen is het maximale aantal records bereikt.",
    "unableToAnalyzeText": "Kan niet analyseren, maximale aantal records bereikt.",
    "errorInPrintingReport": "Kan het rapport niet afdrukken. Controleer of de rapportinstellingen geldig zijn.",
    "aoiInformationTitle": "Interessegebied (AOI) informatie",
    "summaryReportTitle": "Samenvatting",
    "notApplicableText": "NVT",
    "downloadReportConfirmTitle": "Download bevestigen",
    "downloadReportConfirmMessage": "Weet u zeker dat u wilt downloaden?",
    "noDataText": "Geen gegevens",
    "createReplicaFailedMessage": "Download mislukt voor volgende la(a)g(en): <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Download mislukt.",
    "printLayoutLabelText": "Lay-out",
    "printBtnText": "Afdrukken",
    "printDialogHint": "Opmerking: De naam en commentaren in het rapport kunnen bewerkt worden in de voorbeeldweergave van het rapport.",
    "unableToDownloadFileGDBText": "File Geodatabase kan niet worden gedownload voor AOI met punt- of lijnlocaties",
    "unableToDownloadShapefileText": "Shapefile kan niet worden gedownload voor AOI met punt- of lijnlocaties",
    "analysisUnitLabelText": "Resultaten weergeven in :",
    "analysisUnitButtonTooltip": "Kies eenheden voor analyse",
    "analysisCloseBtnText": "Sluiten",
    "feetUnit": "Voet / vierkante voet",
    "milesUnit": "Mijl / acre",
    "metersUnit": "Meter / vierkante meter",
    "kilometersUnit": "Kilometer / vierkante kilometer",
    "hectaresUnit": "Kilometers / hectares",
    "hectaresAbbr": "hectare",
    "layerNotVisibleText": "Kan niet analyseren, de laag is uitgeschakeld of is buiten het zichtbereik van de schaal.",
    "refreshBtnTooltip": "Rapport vernieuwen",
    "featureCSVAreaText": "Intersectiegebied",
    "featureCSVLengthText": "Intersectielengte",
    "errorInFetchingPrintTask": "Fout bij laden van afdruktaakinformatie. Probeer opnieuw."
  }
});