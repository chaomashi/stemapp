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
  "_widgetLabel": "Beta analiza troškova",
  "unableToFetchInfoErrMessage": "Nije moguće pribavljanje servisa geometrije/detalja konfigurisanog sloja",
  "invalidCostingGeometryLayer": "Pribavljanje 'esriFieldTypeGlobalID' u sloju troškova geometrije nije moguće.",
  "projectLayerNotFound": "Pronalaženje sloja konfigurisanog projekta u mapi nije moguće.",
  "costingGeometryLayerNotFound": "Pronalaženje sloja konfigurisane geometrije troškova u mapi nije moguće.",
  "projectMultiplierTableNotFound": "Pronalaženje konfigurisane tabele dodatnih troškova multiplikatora projekta u mapi nije moguće.",
  "projectAssetTableNotFound": "Pronalaženje konfigurisane tabele resursa projekta u mapi nije moguće.",
  "createLoadProject": {
    "createProjectPaneTitle": "Kreiraj projekat",
    "loadProjectPaneTitle": "Učitaj projekat",
    "projectNamePlaceHolder": "Naziv projekta",
    "projectDescPlaceHolder": "Opis projekta",
    "selectProject": "Izaberi projekat",
    "viewInMapLabel": "Prikaži na mapi",
    "loadLabel": "Učitaj",
    "createLabel": "Kreiraj",
    "deleteProjectConfirmationMsg": "Želite li zaista da obrišete projekat?",
    "noAssetsToViewOnMap": "Izabrani projekat nema nijedan resurs za prikaz na mapi.",
    "projectDeletedMsg": "Projekat je uspešno obrisan.",
    "errorInCreatingProject": "Greška u kreiranju projekta.",
    "errorProjectNotFound": "Projekat nije pronađen.",
    "errorInLoadingProject": "Proverite da li je važeći projekat izabran.",
    "errorProjectNotSelected": "Izaberite projekat sa padajuće liste",
    "errorDuplicateProjectName": "Naziv projekta već postoji."
  },
  "statisticsSettings": {
    "tabTitle": "Postavke statistike",
    "addStatisticsLabel": "Dodaj statistiku",
    "addNewStatisticsText": "Dodaj novu statistiku",
    "deleteStatisticsText": "Obriši statistiku",
    "moveStatisticsUpText": "Pomeri statistiku na gore",
    "moveStatisticsDownText": "Pomeri statistiku na dole",
    "layerNameTitle": "Sloj",
    "statisticsTypeTitle": "Tip",
    "fieldNameTitle": "Polje",
    "statisticsTitle": "Oznaka",
    "actionLabelTitle": "Radnje",
    "selectDeselectAllTitle": "Selektuj sve"
  },
  "statisticsType": {
    "countLabel": "Brojač",
    "averageLabel": "Prosečno",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Zbir",
    "areaLabel": "Površina",
    "lengthLabel": "Dužina"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Sloj(evi) treba da bude(-u) označen(i) kao urediv(i) u kartici postavki sloja"
  },
  "workBench": {
    "refresh": "Osveži",
    "noAssetAddedMsg": "Nema dodatih resursa",
    "units": "jedinica(e)",
    "assetDetailsTitle": "Detalji resursa stavke",
    "costEquationTitle": "Jednačina troškova",
    "newCostEquationTitle": "Nova jednačina",
    "defaultCostEquationTitle": "Podrazumevana jednačina",
    "geographyTitle": "Geografija",
    "scenarioTitle": "Scenario",
    "costingInfoHintText": "<div>Savet: koristite sledeće ključne reči</div><ul><li><b>{TOTALCOUNT}</b>: koristi ukupan broj istog tipa resursa u geografiji</li> <li><b>{MEASURE}</b>: Koristi dužinu za resurs linije i oblast za resurs poligona</li><li><b>{TOTALMEASURE}</b>: Koristi ukupnu dužinu za resurs linije i ukupnu oblast za resurs poligona za isti tip u geografiji</li></ul> Možete da koristite funkcije kao što su:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Izmenite jednačinu troškova prema zahtevima vašeg projekta.",
    "zoomToAsset": "Zumiraj na resurs",
    "deleteAsset": "Obriši resurs",
    "closeDialog": "Zatvori dijalog",
    "objectIdColTitle": "ID objekta",
    "costColTitle": "Trošak",
    "errorInvalidCostEquation": "Nevažeća jednačina troška.",
    "errorInSavingAssetDetails": "Čuvanje detalja resursa nije moguće."
  },
  "assetDetails": {
    "inGeography": " u${geography} ",
    "withScenario": " sa ${scenario}",
    "totalCostTitle": "Ukupan trošak",
    "additionalCostLabel": "Opis",
    "additionalCostValue": "Vrednost",
    "additionalCostNetValue": "Neto vrednost"
  },
  "projectOverview": {
    "assetItemsTitle": "Stavke resursa",
    "assetStatisticsTitle": "Statistika resursa",
    "projectSummaryTitle": "Rezime projekta",
    "projectName": "Naziv projekta: ${name}",
    "totalCostLabel": "Ukupan trošak projekta (*):",
    "grossCostLabel": "Bruto trošak projekta (*):",
    "roundingLabel": "* Zaokruživanje na '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Čuvanje granica projekta u sloju projekta nije moguće.",
    "unableToSaveProjectCost": "Čuvanje trošk(ov)a projekta u sloju projekta nije moguće.",
    "roundCostValues": {
      "twoDecimalPoint": "Dve decimale",
      "nearestWholeNumber": "Najbliži ceo broj",
      "nearestTen": "Najbliža desetica",
      "nearestHundred": "Najbliža stotina",
      "nearestThousand": "Najbliža hiljada",
      "nearestTenThousands": "Najbliža desetina hiljada"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Atribut projekta",
    "projectAttributeTitle": "Izmeni atribute projekta"
  },
  "costEscalation": {
    "costEscalationLabel": "Dodaj dodatne troškove",
    "valueHeader": "Vrednost",
    "addCostEscalationText": "Dodaj dodatni trošak",
    "deleteCostEscalationText": "Obriši selektovani dodatni trošak",
    "moveCostEscalationUpText": "Pomeri selektovani dodatni trošak na gore",
    "moveCostEscalationDownText": "Pomeri selektovani dodatni trošak na dole",
    "invalidEntry": "Jedan ili više unosa je nevažeće.",
    "errorInSavingCostEscalation": "Čuvanje detalja dodatnog troška nije moguće."
  },
  "scenarioSelection": {
    "popupTitle": "Izaberite scenario za resurs",
    "regionLabel": "Geografija",
    "scenarioLabel": "Scenario",
    "noneText": "Ništa",
    "copyFeatureMsg": "Želite li da kopirate izabrane geoobjekte?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Statistika detalja",
    "noDetailStatisticAvailable": "Nema dodate statistike resursa"
  }
});