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
  "_widgetLabel": "Išlaidų analizės beta versija",
  "unableToFetchInfoErrMessage": "Nepavyko gauti geometrijos paslaugos / sukonfigūruoto sluoksnio išsamios informacijos",
  "invalidCostingGeometryLayer": "Nepavyko gauti  esriFieldTypeGlobalID', esančio išlaidų geometrijos sluoksnyje.",
  "projectLayerNotFound": "Žemėlapyje nepavyko rasti sukonfigūruoto projekto sluoksnio.",
  "costingGeometryLayerNotFound": "Žemėlapyje nepavyko rasti sukonfigūruoto projekto išlaidų geometrijos sluoksnio.",
  "projectMultiplierTableNotFound": "Žemėlapyje nepavyko rasti sukonfigūruotos projekto daugiklio papildomų išlaidų lentelės.",
  "projectAssetTableNotFound": "Žemėlapyje nepavyko rasti sukonfigūruotos projekto išteklių lentelės.",
  "createLoadProject": {
    "createProjectPaneTitle": "Kurti projektą",
    "loadProjectPaneTitle": "Įkelti projektą",
    "projectNamePlaceHolder": "Projekto pavadinimas",
    "projectDescPlaceHolder": "Projekto aprašas",
    "selectProject": "Pasirinkti projektą",
    "viewInMapLabel": "Peržiūrėti žemėlapyje",
    "loadLabel": "Įkelti",
    "createLabel": "Kurti",
    "deleteProjectConfirmationMsg": "Ar tikrai norite panaikinti projektą?",
    "noAssetsToViewOnMap": "Pasirinktas projektas neturi jokių žemėlapyje peržiūrimų išteklių.",
    "projectDeletedMsg": "Projektas sėkmingai panaikintas.",
    "errorInCreatingProject": "Klaida kuriant projektą.",
    "errorProjectNotFound": "Projektas nerastas.",
    "errorInLoadingProject": "Patikrinkite, ar pasirinktas tinkamas projektas.",
    "errorProjectNotSelected": "Pasirinkite projektą išskleidžiamame meniu",
    "errorDuplicateProjectName": "Projekto pavadinimas jau yra."
  },
  "statisticsSettings": {
    "tabTitle": "Statistikos parametrai",
    "addStatisticsLabel": "Pridėti statistinius rodiklius",
    "addNewStatisticsText": "Pridėti naują statistinį rodiklį",
    "deleteStatisticsText": "Naikinti statistinius rodiklius",
    "moveStatisticsUpText": "Perkelti statistinius rodiklius aukštyn",
    "moveStatisticsDownText": "Perkelti statistinius rodiklius žemyn",
    "layerNameTitle": "Sluoksnis",
    "statisticsTypeTitle": "Tipas",
    "fieldNameTitle": "Darbui lauke",
    "statisticsTitle": "Žymė",
    "actionLabelTitle": "Veiksmai",
    "selectDeselectAllTitle": "Žymėti viską"
  },
  "statisticsType": {
    "countLabel": "Skaičiuoti",
    "averageLabel": "Vidurkis",
    "maxLabel": "Maksimumas",
    "minLabel": "Minimumas",
    "summationLabel": "Suma",
    "areaLabel": "Plotas",
    "lengthLabel": "Ilgis"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Sluoksnis (-iai), kurį reikia patikrinti kaip redaguotiną sluoksnio parametrų skirtuke"
  },
  "workBench": {
    "refresh": "Atnaujinti",
    "noAssetAddedMsg": "Jokių išteklių neįtraukta",
    "units": "vnt.",
    "assetDetailsTitle": "Išteklių elemento išsami informacija",
    "costEquationTitle": "Išlaidų lygtis",
    "newCostEquationTitle": "Nauja lygtis",
    "defaultCostEquationTitle": "Numatytoji lygtis",
    "geographyTitle": "Geografinis",
    "scenarioTitle": "Scenarijus",
    "costingInfoHintText": "<div>Pastaba: naudokite šiuos raktinius žodžius</div><ul><li><b>{TOTALCOUNT}</b>: naudoja bendrą to paties tipo išteklių kiekį regione</li> <li><b>{MEASURE}</b>: naudoja linijos ištekliaus ilgį ir poligonų ištekliaus teritoriją</li><li><b>{TOTALMEASURE}</b>: naudoja bendrą linijos ištekliaus ilgį ir bendrą poligono to paties tipo ištekliaus teritoriją geografiniame regione</li></ul> Galite naudoti funkcijas, pvz.:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Redaguokite išlaidų lygtį pagal savo projekto poreikius.",
    "zoomToAsset": "Priartinti išteklių",
    "deleteAsset": "Naikinti išteklių",
    "closeDialog": "Uždaryti dialogo langą",
    "objectIdColTitle": "Objekto ID",
    "costColTitle": "Kaina",
    "errorInvalidCostEquation": "Neleistina išteklių lygtis.",
    "errorInSavingAssetDetails": "Nepavyksta įrašyti išsamios ištekliaus informacijos."
  },
  "assetDetails": {
    "inGeography": " ${geography} ",
    "withScenario": " su ${scenario}",
    "totalCostTitle": "Bendrosios išlaidos",
    "additionalCostLabel": "Aprašymas",
    "additionalCostValue": "Reikšmė",
    "additionalCostNetValue": "Grynoji vertė"
  },
  "projectOverview": {
    "assetItemsTitle": "Išteklių elementai",
    "assetStatisticsTitle": "Išteklių statistika",
    "projectSummaryTitle": "Projekto suvestinė",
    "projectName": "Projekto pavadinimas: ${name}",
    "totalCostLabel": "Bendrosios projekto išlaidos (*):",
    "grossCostLabel": "Bruto projekto išlaidos (*):",
    "roundingLabel": "* Apvalinama iki ${selectedRoundingOption}",
    "unableToSaveProjectBoundary": "Nepavyko įrašyti projekto ribų projekto sluoksnyje.",
    "unableToSaveProjectCost": "Nepavyko įrašyti išlaidų projekto sluoksnyje.",
    "roundCostValues": {
      "twoDecimalPoint": "Du skaitmenys po kablelio",
      "nearestWholeNumber": "Artimiausias sveikasis skaičius",
      "nearestTen": "Artimiausia dešimtis",
      "nearestHundred": "Artimiausias šimtas",
      "nearestThousand": "Artimiausias tūkstantis",
      "nearestTenThousands": "Artimiausia dešimtis tūkstančių"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Projekto atributas",
    "projectAttributeTitle": "Redaguoti projekto atributus"
  },
  "costEscalation": {
    "costEscalationLabel": "Įtraukti papildomas išlaidas",
    "valueHeader": "Reikšmė",
    "addCostEscalationText": "Įtraukti papildomas išlaidas",
    "deleteCostEscalationText": "Naikinti pažymėtas papildomas išlaidas",
    "moveCostEscalationUpText": "Perkelti pažymėtas papildomas išlaidas aukštyn",
    "moveCostEscalationDownText": "Perkelti pažymėtas papildomas išlaidas žemyn",
    "invalidEntry": "Vienas ar daugiau įrašų yra netinkami.",
    "errorInSavingCostEscalation": "Nepavyksta įrašyti išsamios papildomų išlaidų informacijos."
  },
  "scenarioSelection": {
    "popupTitle": "Pasirinkti ištekliaus scenarijų",
    "regionLabel": "Geografinis",
    "scenarioLabel": "Scenarijus",
    "noneText": "Nėra",
    "copyFeatureMsg": "Ar norite kopijuoti pasirinktus elementus?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Išsami statistikos informacija",
    "noDetailStatisticAvailable": "Ištekliaus statistika neįtraukta"
  }
});