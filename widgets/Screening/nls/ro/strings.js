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
  "geometryServicesNotFound": "Serviciul de geometrie nu este disponibil.",
  "unableToDrawBuffer": "Nu s-a putut delimita zona tampon. Vă rugăm să încercaţi din nou.",
  "invalidConfiguration": "Configuraţie nevalidă.",
  "clearAOIButtonLabel": "Pornire de la început",
  "noGraphicsShapefile": "Fişierul shapefile încărcat nu conţine grafice.",
  "zoomToLocationTooltipText": "Zoom la locaţie",
  "noGraphicsToZoomMessage": "Nu a fost găsit niciun grafic prin mărire.",
  "placenameWidget": {
    "placenameLabel": "Căutare locaţie"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Selectaţi modul de trasare",
    "toggleSelectability": "Faceţi clic pentru a comuta posibilitatea de selectare",
    "chooseLayerTitle": "Alegeţi un strat tematic selectabil",
    "selectAllLayersText": "Selectare toate",
    "layerSelectionWarningTooltip": "Trebuie selectat cel puţin un strat tematic pentru crearea AOI"
  },
  "shapefileWidget": {
    "shapefileLabel": "Încărcare fişier shapefile arhivat",
    "uploadShapefileButtonText": "Încărcare",
    "unableToUploadShapefileMessage": "Imposibil de încărcat un fişier shapefile."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Definiţi un punct de început",
    "addButtonTitle": "Adăugare",
    "deleteButtonTitle": "Eliminare",
    "mapTooltipForStartPoint": "Faceţi clic pe hartă pentru a defini un punct de început",
    "mapTooltipForUpdateStartPoint": "Faceţi clic pe hartă pentru a actualiza punctul de început",
    "locateText": "Localizare",
    "locateByMapClickText": "Selectaţi coordonatele iniţiale",
    "enterBearingAndDistanceLabel": "Introduceţi azimutul şi distanţa de la punctul de început",
    "bearingTitle": "Azimut",
    "distanceTitle": "Distanţă",
    "planSettingTooltip": "Setări plan",
    "invalidLatLongMessage": "Introduceţi valori valide."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Distanţă buffer (opţional)",
    "bufferInputLabel": "Afişare rezultate din"
  },
  "traverseSettings": {
    "bearingLabel": "Azimut",
    "lengthLabel": "Lungime",
    "addButtonTitle": "Adăugare",
    "deleteButtonTitle": "Eliminare"
  },
  "planSettings": {
    "expandGridTooltipText": "Extindere grilă",
    "collapseGridTooltipText": "Restrângere grilă",
    "directionUnitLabelText": "Unitate direcţii",
    "distanceUnitLabelText": "Unităţi distanţă şi lungime",
    "planSettingsComingSoonText": "În curând"
  },
  "newTraverse": {
    "invalidBearingMessage": "Azimut nevalid.",
    "invalidLengthMessage": "Lungime nevalidă.",
    "negativeLengthMessage": "Lungime negativă"
  },
  "reportsTab": {
    "aoiAreaText": "Suprafaţă AOI",
    "downloadButtonTooltip": "Descărcare",
    "printButtonTooltip": "Imprimare",
    "uploadShapefileForAnalysisText": "Încărcare fişier shapefile de inclus în analiză",
    "uploadShapefileForButtonText": "Răsfoire",
    "downloadLabelText": "Selectare format:",
    "downloadBtnText": "Descărcare",
    "noDetailsAvailableText": "Nu a fost găsit niciun rezultat",
    "featureCountText": "Cont",
    "featureAreaText": "Suprafaţă",
    "featureLengthText": "Lungime",
    "attributeChooserTooltip": "Alegeţi atributele de afişat",
    "csv": "CSV",
    "filegdb": "FGDB",
    "shapefile": "Shapefile",
    "noFeaturesFound": "Nu a fost găsit niciun rezultat pentru formatul de fişier selectat",
    "selectReportFieldTitle": "Selectare câmpuri",
    "noFieldsSelected": "Niciun câmp selectat",
    "intersectingFeatureExceedsMsgOnCompletion": "Numărul maxim de înregistrări a fost atins pentru unul sau mai multe straturi tematice.",
    "unableToAnalyzeText": "Imposibil de analizat, a fost atins numărul maxim de înregistrări.",
    "errorInPrintingReport": "Imposibil de imprimat raportul. Verificaţi dacă setările pentru raport sunt valide.",
    "aoiInformationTitle": "Informaţii despre Zona de interes (AOI)",
    "summaryReportTitle": "Rezumat",
    "notApplicableText": "N/A",
    "downloadReportConfirmTitle": "Confirmare descărcare",
    "downloadReportConfirmMessage": "Sigur doriţi să descărcaţi?",
    "noDataText": "Nicio dată",
    "createReplicaFailedMessage": "Operaţia de descărcare a eşuat pentru următoarele straturi tematice: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Operaţia de descărcare a eşuat.",
    "printLayoutLabelText": "Configuraţie",
    "printBtnText": "Imprimare",
    "printDialogHint": "Notă: Titlul raportului şi comentariile pot fi editate în examinarea raportului.",
    "unableToDownloadFileGDBText": "Baza de date geografică cu fişiere nu poate fi descărcată pentru AOI ce conţine locaţii cu puncte sau linii",
    "unableToDownloadShapefileText": "Fişierul shapefile nu poate fi descărcat pentru AOI ce conţine locaţii cu puncte sau linii",
    "analysisUnitLabelText": "Afişare rezultatele în:",
    "analysisUnitButtonTooltip": "Alegeţi unităţile pentru analiză",
    "analysisCloseBtnText": "Închidere",
    "feetUnit": "Picioare / Picioare pătrate",
    "milesUnit": "Mile / Acri",
    "metersUnit": "Metri / Metri pătraţi",
    "kilometersUnit": "Kilometri / Kilometri pătraţi",
    "hectaresUnit": "Kilometri / Hectare",
    "hectaresAbbr": "hectare",
    "layerNotVisibleText": "Imposibil de analizat, stratul tematic este dezactivat sau este în afara intervalului de scalei de vizibilitate.",
    "refreshBtnTooltip": "Reîmprospătare raport",
    "featureCSVAreaText": "Zonă de intersectare",
    "featureCSVLengthText": "Lungime de intersectare",
    "errorInFetchingPrintTask": "Eroare la preluarea informațiilor despre sarcina de imprimare. Încercați din nou."
  }
});