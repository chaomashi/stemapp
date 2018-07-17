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
  "_widgetLabel": "Pārbaude",
  "geometryServicesNotFound": "Ģeometrijas pakalpojums nav pieejams.",
  "unableToDrawBuffer": "Nevar uzzīmēt buferzonu. Mēģiniet vēlreiz.",
  "invalidConfiguration": "Nederīga konfigurācija.",
  "clearAOIButtonLabel": "Sākt vēlreiz",
  "noGraphicsShapefile": "Augšupielādētais Shape fails nesatur grafiku.",
  "zoomToLocationTooltipText": "Pietuvināt atrašanās vietai",
  "noGraphicsToZoomMessage": "Nav atrasta grafika, kurai pietuvināt.",
  "placenameWidget": {
    "placenameLabel": "Meklēt izvietojumu"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Atlasiet zīmēšanas režīmu",
    "toggleSelectability": "Noklikšķināt, lai pārslēgtu izvēles iespējas",
    "chooseLayerTitle": "Izvēlēties atlasāmu slāni",
    "selectAllLayersText": "Izvēlieties visu",
    "layerSelectionWarningTooltip": "Lai izveidotu interesējošu teritoriju, jāizvēlas vismaz viens slānis"
  },
  "shapefileWidget": {
    "shapefileLabel": "Augšupielādēt tilpsaspiestu Shape failu",
    "uploadShapefileButtonText": "Augšupielādēt",
    "unableToUploadShapefileMessage": "Nevar augšupielādēt Shape failu."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Definēt sākumpunktu",
    "addButtonTitle": "Pievienot",
    "deleteButtonTitle": "Noņemt",
    "mapTooltipForStartPoint": "Noklikšķiniet kartē, lai definētu sākumpunktu",
    "mapTooltipForUpdateStartPoint": "Noklikšķiniet kartē, lai atjauninātu sākumpunktu",
    "locateText": "Izvietot",
    "locateByMapClickText": "Izvēlēties sākotnējās koordinātas",
    "enterBearingAndDistanceLabel": "Ievadiet peilējumu un attālumu no sākumpunkta",
    "bearingTitle": "Peilējums",
    "distanceTitle": "Attālums",
    "planSettingTooltip": "Plāna iestatījumi",
    "invalidLatLongMessage": "Lūdzu, ievadiet derīgas vērtības."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Buferzonas attālums (neobligāts)",
    "bufferInputLabel": "Parādīt rezultātus, kas atbilst"
  },
  "traverseSettings": {
    "bearingLabel": "Peilējums",
    "lengthLabel": "Garums",
    "addButtonTitle": "Pievienot",
    "deleteButtonTitle": "Izņemt"
  },
  "planSettings": {
    "expandGridTooltipText": "Izvērst režģi",
    "collapseGridTooltipText": "Sakļaut režģi",
    "directionUnitLabelText": "Virziena mērvienība",
    "distanceUnitLabelText": "Attāluma un leņķa mērvienības",
    "planSettingsComingSoonText": "Drīzumā"
  },
  "newTraverse": {
    "invalidBearingMessage": "Nederīgs peilējums.",
    "invalidLengthMessage": "Nederīgs garums.",
    "negativeLengthMessage": "Negatīvs garums"
  },
  "reportsTab": {
    "aoiAreaText": "Interesējošās teritorijas vieta",
    "downloadButtonTooltip": "Lejupielādēt",
    "printButtonTooltip": "Drukāt",
    "uploadShapefileForAnalysisText": "Augšupielādēt Shape failu, kas jāiekļauj analīzē",
    "uploadShapefileForButtonText": "Pārlūkot",
    "downloadLabelText": "Izvēlēties formātu:",
    "downloadBtnText": "Lejupielādēt",
    "noDetailsAvailableText": "Rezultāti nav atrasti",
    "featureCountText": "Skaits",
    "featureAreaText": "Teritorija",
    "featureLengthText": "Garums",
    "attributeChooserTooltip": "Izvēlēties rādāmos atribūtus",
    "csv": "CSV",
    "filegdb": "Faila ģeodatubāze",
    "shapefile": "Shape fails",
    "noFeaturesFound": "Izvēlētajam faila formātam nav atrasti rezultāti",
    "selectReportFieldTitle": "Izvēlēties laukus",
    "noFieldsSelected": "Nav izvēlēts neviens lauks",
    "intersectingFeatureExceedsMsgOnCompletion": "Vienam vai vairākiem slāņiem ir sasniegts maksimālais ierakstu skaits.",
    "unableToAnalyzeText": "Nevar analizēt. Ir sasniegts maksimālais ierakstu skaits.",
    "errorInPrintingReport": "Nevar izdrukāt pārskatu. Pārbaudiet, vai ir pareizi pārskata iestatījumi.",
    "aoiInformationTitle": "Informācija par interesējošo teritoriju",
    "summaryReportTitle": "Kopsavilkums",
    "notApplicableText": "N/P",
    "downloadReportConfirmTitle": "Apstiprināt lejupielādi",
    "downloadReportConfirmMessage": "Vai tiešām vēlaties lejupielādēt?",
    "noDataText": "Nav datu",
    "createReplicaFailedMessage": "Lejupielādes darbība neizdevās vienam vai vairākiem slāņiem: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Lejupielādes darbība neizdevās.",
    "printLayoutLabelText": "Izkārtojums",
    "printBtnText": "Drukāt",
    "printDialogHint": "Piezīme. Pārskata virsrakstu un komentārus var rediģēt pārskata priekšskatījumā.",
    "unableToDownloadFileGDBText": "Faila ģeodatubāzi nevar lejupielādēt interesējošai teritorijai, kura satur punktu vai līniju atrašanās vietas",
    "unableToDownloadShapefileText": "Shape failu nevar lejupielādēt interesējošai teritorijai, kura satur punktu vai līniju atrašanās vietas",
    "analysisUnitLabelText": "Parādīt rezultātus šajā objektā:",
    "analysisUnitButtonTooltip": "Izvēlieties analīzes mērvienības",
    "analysisCloseBtnText": "Aizvērt",
    "feetUnit": "Pēdas/kvadrātpēdas",
    "milesUnit": "Jūdzes/akri",
    "metersUnit": "Metri/kvadrātmetri",
    "kilometersUnit": "Kilometri/kvadrātkilometri",
    "hectaresUnit": "Kilometri/hektāri",
    "hectaresAbbr": "hektāri",
    "layerNotVisibleText": "Nevar analizēt — slānis ir izslēgts vai atrodas ārpus mēroga redzamības diapazona.",
    "refreshBtnTooltip": "Atjaunot pārskatu",
    "featureCSVAreaText": "Šķērsojoša platība",
    "featureCSVLengthText": "Šķērsojošs garums",
    "errorInFetchingPrintTask": "Ienesot drukas uzdevuma informāciju, radās kļūda. Lūdzu, mēģiniet vēlreiz."
  }
});