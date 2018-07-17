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
  "_widgetLabel": "Sõelumine",
  "geometryServicesNotFound": "Geomeetriateenus pole saadaval.",
  "unableToDrawBuffer": "Puhvrit ei saa tõmmata. Proovige uuesti.",
  "invalidConfiguration": "Sobimatu konfiguratsioon",
  "clearAOIButtonLabel": "Alusta uuesti",
  "noGraphicsShapefile": "Üleslaetud Shape-failis pole graafikat.",
  "zoomToLocationTooltipText": "Suumi asukohta",
  "noGraphicsToZoomMessage": "Sissesuumimiseks ei leitud graafikat.",
  "placenameWidget": {
    "placenameLabel": "Asukoha otsimine"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Valige joonistusrežiim",
    "toggleSelectability": "Klõpsake valitavuse sisse-ja väljalülitamiseks",
    "chooseLayerTitle": "Vali valitav kiht",
    "selectAllLayersText": "Vali kõik",
    "layerSelectionWarningTooltip": "AOI loomiseks peab olema valitud vähemalt üks kiht"
  },
  "shapefileWidget": {
    "shapefileLabel": "Laadi üles pakitud Shape-fail",
    "uploadShapefileButtonText": "Laadi üles",
    "unableToUploadShapefileMessage": "Shape-faili ei saa üles laadida."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Määrake alguspunkt",
    "addButtonTitle": "Lisa",
    "deleteButtonTitle": "Eemalda",
    "mapTooltipForStartPoint": "Alguspunkti määramiseks klõpsake kaardil",
    "mapTooltipForUpdateStartPoint": "Alguspunkti värskendamiseks klõpsake kaardil",
    "locateText": "Paiguta",
    "locateByMapClickText": "Valige algkoordinaadid",
    "enterBearingAndDistanceLabel": "Sisestage kurss ja vahemaa alguspunktist",
    "bearingTitle": "Kurss",
    "distanceTitle": "Vahemaa",
    "planSettingTooltip": "Plaani seaded",
    "invalidLatLongMessage": "Sisestage kehtivad väärtused."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Puhvri ulatus (valikuline)",
    "bufferInputLabel": "Kuva tulemused järgmise kohta"
  },
  "traverseSettings": {
    "bearingLabel": "Kurss",
    "lengthLabel": "Pikkus",
    "addButtonTitle": "Lisa",
    "deleteButtonTitle": "Eemalda"
  },
  "planSettings": {
    "expandGridTooltipText": "Laienda ruudustik",
    "collapseGridTooltipText": "Ahenda ruudustik",
    "directionUnitLabelText": "Juhiste ühik",
    "distanceUnitLabelText": "Vahemaa ja pikkuse ühikud",
    "planSettingsComingSoonText": "Varsti kättesaadav"
  },
  "newTraverse": {
    "invalidBearingMessage": "Vigane kurss.",
    "invalidLengthMessage": "Vigane pikkus.",
    "negativeLengthMessage": "Negatiivne pikkus"
  },
  "reportsTab": {
    "aoiAreaText": "AOI pindala",
    "downloadButtonTooltip": "Allalaadimine",
    "printButtonTooltip": "Prindi",
    "uploadShapefileForAnalysisText": "Laadi üles Shape-fail analüüsis kaasamiseks",
    "uploadShapefileForButtonText": "Sirvi",
    "downloadLabelText": "Vali formaat:",
    "downloadBtnText": "Allalaadimine",
    "noDetailsAvailableText": "Tulemusi ei leitud",
    "featureCountText": "Koguarv",
    "featureAreaText": "Pindala",
    "featureLengthText": "Pikkus",
    "attributeChooserTooltip": "Valige kuvatavad atribuudid",
    "csv": "CSV",
    "filegdb": "Faili geoandmebaas",
    "shapefile": "Shape-fail",
    "noFeaturesFound": "Valitud failiformaadi jaoks pole tulemusi",
    "selectReportFieldTitle": "Vali väljad",
    "noFieldsSelected": "Ühtegi välja pole valitud",
    "intersectingFeatureExceedsMsgOnCompletion": "Ühe või enama kihi puhul on ületatud maksimaalne kirjete arv.",
    "unableToAnalyzeText": "Ei saa analüüsida, maksimaalne kirjete arv on ületatud.",
    "errorInPrintingReport": "Aruannet ei saa printida. Kontrollige, kas aruande seaded on õiged.",
    "aoiInformationTitle": "Huviala (AOI) info",
    "summaryReportTitle": "Kokkuvõte",
    "notApplicableText": "P/S",
    "downloadReportConfirmTitle": "Kinnitage allalaadimine",
    "downloadReportConfirmMessage": "Kas soovite kindlasti alla laadida?",
    "noDataText": "Andmed puuduvad",
    "createReplicaFailedMessage": "Järgmiste kihtide allalaadimine nurjus : <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Allalaadimine nurjus.",
    "printLayoutLabelText": "Paigutus",
    "printBtnText": "Prindi",
    "printDialogHint": "Märkus: aruande pealkirja ja kommentaare saab redigeerida aruande eelvaates.",
    "unableToDownloadFileGDBText": "Faili geoandmebaasi ei saa punkt- või joonasukohti sisaldava AOI jaoks alla laadida",
    "unableToDownloadShapefileText": "Shape-faili ei saa punkt- või joonasukohti sisaldava AOI jaoks alla laadida",
    "analysisUnitLabelText": "Kuva tulemid:",
    "analysisUnitButtonTooltip": "Valige ühikud analüüsiks",
    "analysisCloseBtnText": "Sulge",
    "feetUnit": "Jalad / ruutjalad",
    "milesUnit": "Miilid / aakrid",
    "metersUnit": "Meetrid / ruutmeetrid",
    "kilometersUnit": "Kilomeetrid / ruutkilomeetrid",
    "hectaresUnit": "Kilomeetrid / hektarid",
    "hectaresAbbr": "hektarit",
    "layerNotVisibleText": "Ei saa analüüsida, sest kiht on välja lülitatud või asub väljaspool mõõtkava nähtavuse ulatust.",
    "refreshBtnTooltip": "Värskenda raportit",
    "featureCSVAreaText": "Lõikuv ala",
    "featureCSVLengthText": "Lõikuv pikkus",
    "errorInFetchingPrintTask": "Printimisel ilmnes tõrge. Proovige uuesti."
  }
});