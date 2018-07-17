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
  "_widgetLabel": "Stroškovna analiza (beta)",
  "unableToFetchInfoErrMessage": "Geometrijske storitve/konfiguriranih podrobnosti sloja ni mogoče pridobiti",
  "invalidCostingGeometryLayer": "V stroškovnem geometrijskem sloju ni mogoče pridobiti 'esriFieldTypeGlobalID'.",
  "projectLayerNotFound": "Na karti ni mogoče najti konfiguriranega projektnega sloja.",
  "costingGeometryLayerNotFound": "Na karti ni mogoče najti stroškovne geometrije.",
  "projectMultiplierTableNotFound": "Na karti ni mogoče najti konfiguriranega projektnega množitelja tabele dodatnih stroškov.",
  "projectAssetTableNotFound": "Na karti ni mogoče najti tabele sredstev konfiguriranega projekta.",
  "createLoadProject": {
    "createProjectPaneTitle": "Ustvari projekt",
    "loadProjectPaneTitle": "Naloži projekt",
    "projectNamePlaceHolder": "Ime projekta",
    "projectDescPlaceHolder": "Opis projekta",
    "selectProject": "Izberi projekt",
    "viewInMapLabel": "Poglej na karti",
    "loadLabel": "Naloži",
    "createLabel": "Ustvari",
    "deleteProjectConfirmationMsg": "Ste prepričani, da želite izbrisati projekt?",
    "noAssetsToViewOnMap": "Izbrani projekt nima nobenih sredstev za ogled na karti.",
    "projectDeletedMsg": "Projekt je uspešno izbrisan.",
    "errorInCreatingProject": "Napaka pri ustvarjanju projekta.",
    "errorProjectNotFound": "Projekt ni najden.",
    "errorInLoadingProject": "Preverite, če je izbran veljaven projekt.",
    "errorProjectNotSelected": "Izberite projekt iz spustnega menija",
    "errorDuplicateProjectName": "Ime projekta že obstaja."
  },
  "statisticsSettings": {
    "tabTitle": "Nastavitve statistike",
    "addStatisticsLabel": "Dodaj statistiko",
    "addNewStatisticsText": "Dodaj novo statistiko",
    "deleteStatisticsText": "Izbriši statistiko",
    "moveStatisticsUpText": "Premakni statistiko navzgor",
    "moveStatisticsDownText": "Premakni statistiko navzdol",
    "layerNameTitle": "Sloj",
    "statisticsTypeTitle": "Tip",
    "fieldNameTitle": "Polje",
    "statisticsTitle": "Napis",
    "actionLabelTitle": "Dejanja",
    "selectDeselectAllTitle": "Izberi vse"
  },
  "statisticsType": {
    "countLabel": "Štetje",
    "averageLabel": "Povprečje",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Vsota",
    "areaLabel": "Površina",
    "lengthLabel": "Dolžina"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Sloji morajo biti označeni kot uredljivi v zavihku nastavitev sloja"
  },
  "workBench": {
    "refresh": "Osveži",
    "noAssetAddedMsg": "Ni dodanih sredstev",
    "units": "enote",
    "assetDetailsTitle": "Podrobnosti elementa sredstev",
    "costEquationTitle": "Stroškovna enačba",
    "newCostEquationTitle": "Nova enačba",
    "defaultCostEquationTitle": "Privzeta enačba",
    "geographyTitle": "Lokacija",
    "scenarioTitle": "Scenarij",
    "costingInfoHintText": "<div>Namig: Uporabite naslednje ključne besede</div><ul><li><b>{TOTALCOUNT}</b>: Uporabi skupno število sredstev istega tipa na lokaciji</li> <li><b>{MEASURE}</b>: Uporabi dolžino za linijska sredstva in površino za poligonska sredstva</li><li><b>{TOTALMEASURE}</b>: Uporabi skupno dolžino za linijska sredstva in skupno površino za poligonska sredstva istega tipa na lokaciji</li></ul> Uporabite lahko funkcije, kot so:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Uredite stroškovno enačbo glede na potrebe vašega projekta.",
    "zoomToAsset": "Približaj na sredstva",
    "deleteAsset": "Izbriši sredstvo",
    "closeDialog": "Zapri pogovorno okno",
    "objectIdColTitle": "Id objekta",
    "costColTitle": "Strošek",
    "errorInvalidCostEquation": "Neveljavna stroškovna enačba.",
    "errorInSavingAssetDetails": "Podrobnosti o sredstvih ni mogoče shraniti."
  },
  "assetDetails": {
    "inGeography": " v/na ${geography} ",
    "withScenario": " s/z ${scenario}",
    "totalCostTitle": "Skupen strošek",
    "additionalCostLabel": "Opis",
    "additionalCostValue": "Vrednost",
    "additionalCostNetValue": "Neto vrednost"
  },
  "projectOverview": {
    "assetItemsTitle": "Elementi sredstva",
    "assetStatisticsTitle": "Statistika sredstva",
    "projectSummaryTitle": "Povzetek projekta",
    "projectName": "Ime projekta: ${name}",
    "totalCostLabel": "Celotni stroški projekta (*):",
    "grossCostLabel": "Bruto stroški projekta (*):",
    "roundingLabel": "* Zaokroži na '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Meje projekta ni mogoče shraniti v projektni sloj.",
    "unableToSaveProjectCost": "Stroškov ni mogoče shraniti v projektni sloj.",
    "roundCostValues": {
      "twoDecimalPoint": "Dve decimalni vejici",
      "nearestWholeNumber": "Najbližje celo število",
      "nearestTen": "Najbližja desetica",
      "nearestHundred": "Najbližja stotica",
      "nearestThousand": "Najbližje tisočice",
      "nearestTenThousands": "Najbližje desettisočice"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Atributi projekta",
    "projectAttributeTitle": "Uredi atribute projekta"
  },
  "costEscalation": {
    "costEscalationLabel": "Dodaj dodatne stroške",
    "valueHeader": "Vrednost",
    "addCostEscalationText": "Dodaj dodatne stroške",
    "deleteCostEscalationText": "Izbriši izbrane dodatne stroške",
    "moveCostEscalationUpText": "Premakni izbrane dodatne stroške navzgor",
    "moveCostEscalationDownText": "Premakni izbrane dodatne stroške navzdol",
    "invalidEntry": "En ali več vnosov je neveljavnih.",
    "errorInSavingCostEscalation": "Dodatnih podrobnosti o stroških ni mogoče shraniti."
  },
  "scenarioSelection": {
    "popupTitle": "Izberite scenarij za sredstvo",
    "regionLabel": "Lokacija",
    "scenarioLabel": "Scenarij",
    "noneText": "Brez",
    "copyFeatureMsg": "Želite kopirati izbrane geoobjekte?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Podrobna statistika",
    "noDetailStatisticAvailable": "Statistika sredstev ni bila dodana"
  }
});