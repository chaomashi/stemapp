///////////////////////////////////////////////////////////////////////////
// Copyright © 2017 Esri. All Rights Reserved.
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
  "_widgetLabel": "Kuluanalüüsid (beta)",
  "unableToFetchInfoErrMessage": "Geomeetriateenuse konfigureeritud kihi üksikasju ei saa tuua",
  "invalidCostingGeometryLayer": "„esriFieldTypeGlobalID“-d kuluarvutuse geomeetria kihis ei saa tuua.",
  "projectLayerNotFound": "Konfigureeritud projekti kihti kaardil ei leitud.",
  "costingGeometryLayerNotFound": "Konfigureeritud kuluarvutuse geomeetria kihti kaardil ei leitud.",
  "projectMultiplierTableNotFound": "Konfigureeritud projekti kordaja täiendavat kulutabelit kaardil ei leitud.",
  "projectAssetTableNotFound": "Konfigureeritud projekti vara tabelit kaardil ei leitud.",
  "createLoadProject": {
    "createProjectPaneTitle": "Loo projekt",
    "loadProjectPaneTitle": "Laadi projekt",
    "projectNamePlaceHolder": "Projekti nimi",
    "projectDescPlaceHolder": "Projekti kirjeldus",
    "selectProject": "Vali projekt",
    "viewInMapLabel": "Kuva kaardil",
    "loadLabel": "Laadi",
    "createLabel": "Loo",
    "deleteProjectConfirmationMsg": "Kas soovite selle projekti kindlasti kustutada?",
    "noAssetsToViewOnMap": "Valitud projektil pole varasid, mida kaardil kuvada.",
    "projectDeletedMsg": "Projekt on kustutatud.",
    "errorInCreatingProject": "Tõrge projekti loomisel.",
    "errorProjectNotFound": "Projekti ei leitud.",
    "errorInLoadingProject": "Kontrollige, kas valitud on kehtiv.",
    "errorProjectNotSelected": "Valige ripploendist projekt",
    "errorDuplicateProjectName": "Projekti nimi on juba olemas."
  },
  "statisticsSettings": {
    "tabTitle": "Statistika seaded",
    "addStatisticsLabel": "Lisa statistika",
    "addNewStatisticsText": "Lisa uus statistika",
    "deleteStatisticsText": "Kustuta statistika",
    "moveStatisticsUpText": "Liiguta statistikat üles",
    "moveStatisticsDownText": "Liiguta statistikat alla",
    "layerNameTitle": "Kiht",
    "statisticsTypeTitle": "Tüüp",
    "fieldNameTitle": "Väli",
    "statisticsTitle": "Märgis",
    "actionLabelTitle": "Toimingud",
    "selectDeselectAllTitle": "Vali kõik"
  },
  "statisticsType": {
    "countLabel": "Koguarv",
    "averageLabel": "Keskmine",
    "maxLabel": "Maksimum",
    "minLabel": "Miinimum",
    "summationLabel": "Summeerimine",
    "areaLabel": "Ala",
    "lengthLabel": "Pikkus"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Kihi seadete vahekaardil tuleb kiht(kihid) märkida redigeeritavaks"
  },
  "workBench": {
    "refresh": "Värskenda",
    "noAssetAddedMsg": "Varasid ei ole lisatud",
    "units": "ühik(ud)",
    "assetDetailsTitle": "Vara üksuse üksikasjad",
    "costEquationTitle": "Kuluvõrrand",
    "newCostEquationTitle": "Uus võrrand",
    "defaultCostEquationTitle": "Vaikevõrrand",
    "geographyTitle": "Geograafia",
    "scenarioTitle": "Stsenaarium",
    "costingInfoHintText": "<div>Vihje: kasutage järgmisi märksõnu</div><ul><li><b>{TOTALCOUNT}</b>: kasutatakse geograafia sama tüüpi vara koguarvu</li> <li><b>{MEASURE}</b>: kasutatakse rea vara pikkust ja polügooni vara ala</li><li><b>{TOTALMEASURE}</b>: kasutatakse geograafia sama tüübi rea vara kogupikkust ja polügooni vara koguala</li></ul> Saate kasutada funktsioone nagu:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Redigeerige kuluvõrrandit vastavalt oma projekti vajadustele.",
    "zoomToAsset": "Suumi varale",
    "deleteAsset": "Kustuta vara",
    "closeDialog": "Sule dialoogiaken",
    "objectIdColTitle": "Objekti ID",
    "costColTitle": "Maksumus",
    "errorInvalidCostEquation": "Sobimatu kuluvõrrand.",
    "errorInSavingAssetDetails": "Vara üksikasju ei saa salvestada."
  },
  "assetDetails": {
    "inGeography": " asukohas ${geography} ",
    "withScenario": " koos ${scenario}",
    "totalCostTitle": "Kogukulud",
    "additionalCostLabel": "Kirjeldus",
    "additionalCostValue": "Väärtus",
    "additionalCostNetValue": "Netoväärtus"
  },
  "projectOverview": {
    "assetItemsTitle": "Vara üksused",
    "assetStatisticsTitle": "Vara statistika",
    "projectSummaryTitle": "Projekti kokkuvõte",
    "projectName": "Projekti nimi: ${name}",
    "totalCostLabel": "Projekti kogukulu (*):",
    "grossCostLabel": "Projekti brutokulu (*):",
    "roundingLabel": "* Ümardatakse '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Projekti kihis ei saa projekti piiri salvestada.",
    "unableToSaveProjectCost": "Projekti kihis ei saa kulu(sid) salvestada.",
    "roundCostValues": {
      "twoDecimalPoint": "Kaks komakohta",
      "nearestWholeNumber": "Lähim täisarv",
      "nearestTen": "Lähim kümme",
      "nearestHundred": "Lähim sada",
      "nearestThousand": "Lähim tuhat",
      "nearestTenThousands": "Lähim kümme tuhat"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Projekti atribuut",
    "projectAttributeTitle": "Redigeeri projekti atribuute"
  },
  "costEscalation": {
    "costEscalationLabel": "Lisa täiendav kulu",
    "valueHeader": "Väärtus",
    "addCostEscalationText": "Lisa täiendav kulu",
    "deleteCostEscalationText": "Kustuta valitud täiendav kulu",
    "moveCostEscalationUpText": "Liiguta valitud täiendavat kulu üles",
    "moveCostEscalationDownText": "Liiguta valitud täiendavat kulu alla",
    "invalidEntry": "Üks või mitu kannet on sobimatud.",
    "errorInSavingCostEscalation": "Täiendava kulu üksikasju ei saa salvestada."
  },
  "scenarioSelection": {
    "popupTitle": "Vali vara stsenaarium",
    "regionLabel": "Geograafia",
    "scenarioLabel": "Stsenaarium",
    "noneText": "Puudub",
    "copyFeatureMsg": "Kas soovite valitud objektid kopeerida?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Üksikasjalik statistika",
    "noDetailStatisticAvailable": "Vara statistikat pole lisatud"
  }
});