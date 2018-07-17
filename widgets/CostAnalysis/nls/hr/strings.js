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
  "_widgetLabel": "Beta verzija za analizu troškova",
  "unableToFetchInfoErrMessage": "Nije moguće dohvatiti uslugu geometrije / pojedinosti o konfiguriranom sloju",
  "invalidCostingGeometryLayer": "Nije moguće dobiti 'esriFieldTypeGlobalID’ geometrijskom sloju troškova.",
  "projectLayerNotFound": "Nije moguće pronaći konfigurirani sloj projekta na karti.",
  "costingGeometryLayerNotFound": "Nije moguće pronaći konfigurirani geometrijski sloj troškova na karti.",
  "projectMultiplierTableNotFound": "Nije moguće pronaći konfiguriranu tablicu dodatnih troškova množitelja projekta na karti.",
  "projectAssetTableNotFound": "Nije moguće pronaći konfiguriranu tablicu sredstava projekta na karti.",
  "createLoadProject": {
    "createProjectPaneTitle": "Stvori projekt",
    "loadProjectPaneTitle": "Učitavanje projekta",
    "projectNamePlaceHolder": "Naziv projekta",
    "projectDescPlaceHolder": "Opis projekta",
    "selectProject": "Odabir projekta",
    "viewInMapLabel": "Prikaz na karti",
    "loadLabel": "Učitaj",
    "createLabel": "Stvori",
    "deleteProjectConfirmationMsg": "Jeste li sigurni da želite izbrisati projekt?",
    "noAssetsToViewOnMap": "Odabrani projekt nema sredstva za prikaz na karti.",
    "projectDeletedMsg": "Projekt je uspješno izbrisan.",
    "errorInCreatingProject": "Pogreška pri stvaranju projekta.",
    "errorProjectNotFound": "Nema projekta.",
    "errorInLoadingProject": "Provjerite je li odabran valjan projekt.",
    "errorProjectNotSelected": "Odaberite projekt na padajućem izborniku",
    "errorDuplicateProjectName": "Naziv projekta već postoji."
  },
  "statisticsSettings": {
    "tabTitle": "Postavke statistika",
    "addStatisticsLabel": "Dodavanje statistike",
    "addNewStatisticsText": "Dodavanje novih statistika",
    "deleteStatisticsText": "Brisanje statistika",
    "moveStatisticsUpText": "Pomicanje statistika prema gore",
    "moveStatisticsDownText": "Pomicanje statistika prema dolje",
    "layerNameTitle": "Sloj",
    "statisticsTypeTitle": "Vrsta",
    "fieldNameTitle": "Polje",
    "statisticsTitle": "Oznaka",
    "actionLabelTitle": "Radnje",
    "selectDeselectAllTitle": "Odaberi sve"
  },
  "statisticsType": {
    "countLabel": "Broj",
    "averageLabel": "Prosječno",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Sažetak",
    "areaLabel": "Poligon",
    "lengthLabel": "Duljina"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Slojevi moraju biti označeni da se mogu uređivati u kartici s postavkama sloja"
  },
  "workBench": {
    "refresh": "Osvježi",
    "noAssetAddedMsg": "Nema dodanih sredstava",
    "units": "jedinice",
    "assetDetailsTitle": "Pojedinosti o stavci sredstva",
    "costEquationTitle": "Jednadžba troška",
    "newCostEquationTitle": "Nova jednadžba",
    "defaultCostEquationTitle": "Zadana jednadžba",
    "geographyTitle": "Geografija",
    "scenarioTitle": "Scenarij",
    "costingInfoHintText": "<div>Podsjetnik: upotrijebite sljedeće ključne riječi</div><ul><li><b>{TOTALCOUNT}</b>: upotrebljava ukupni broj sredstava iste vrste u geografiji</li> <li><b>{MEASURE}</b>: upotrebljava duljinu za sredstvo linije i područje za sredstvo poligona</li><li><b>{TOTALMEASURE}</b>: upotrebljava ukupnu duljinu za sredstvo linije i ukupno područje za sredstvo poligona iste vrste u geografiji</li></ul> Možete upotrijebiti funkcije kao što su:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Uredite jednadžbu za troškove prema potrebama vašeg projekta.",
    "zoomToAsset": "Uvećavanje na sredstvo",
    "deleteAsset": "Brisanje sredstva",
    "closeDialog": "Zatvori dijaloški okvir",
    "objectIdColTitle": "ID objekta",
    "costColTitle": "Trošak",
    "errorInvalidCostEquation": "Nevažeća jednadžba troškova.",
    "errorInSavingAssetDetails": "Nije moguće spremiti pojedinosti o sredstvu."
  },
  "assetDetails": {
    "inGeography": " u ${geography} ",
    "withScenario": " s ${scenario}",
    "totalCostTitle": "Ukupni troškovi",
    "additionalCostLabel": "Opis",
    "additionalCostValue": "Vrijednost",
    "additionalCostNetValue": "Neto vrijednost"
  },
  "projectOverview": {
    "assetItemsTitle": "Stavke sredstva",
    "assetStatisticsTitle": "Statistike o sredstvima",
    "projectSummaryTitle": "Sažetak projekta",
    "projectName": "Naziv projekta: ${name}",
    "totalCostLabel": "Ukupni trošak projekta (*):",
    "grossCostLabel": "Bruto trošak projekta (*):",
    "roundingLabel": "* Zaokruživanje na '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Nije moguće spremiti granicu projekta u sloju projekta.",
    "unableToSaveProjectCost": "Nije moguće spremiti troškove u sloju projekta.",
    "roundCostValues": {
      "twoDecimalPoint": "Dva decimalna zareza",
      "nearestWholeNumber": "Najbliži cijeli broj",
      "nearestTen": "Najbliža desetica",
      "nearestHundred": "Najbliža stotica",
      "nearestThousand": "Najbliža tisućica",
      "nearestTenThousands": "Najbližih deset tisuća"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Atribut projekta",
    "projectAttributeTitle": "Uređivanje atributa projekta"
  },
  "costEscalation": {
    "costEscalationLabel": "Dodavanje dodatnog troška",
    "valueHeader": "Vrijednost",
    "addCostEscalationText": "Dodaj dodatni trošak",
    "deleteCostEscalationText": "Izbriši odabrani dodatni trošak",
    "moveCostEscalationUpText": "Premjesti odabrani dodatni trošak prema gore",
    "moveCostEscalationDownText": "Premjesti odabrani dodatni trošak prema dolje",
    "invalidEntry": "Jedan ili više unosa nisu valjani.",
    "errorInSavingCostEscalation": "Nije moguće spremiti pojedinosti o dodatnom trošku."
  },
  "scenarioSelection": {
    "popupTitle": "Odabir scenarija za sredstvo",
    "regionLabel": "Geografija",
    "scenarioLabel": "Scenarij",
    "noneText": "Nema",
    "copyFeatureMsg": "Želite li kopirati odabrane geoobjekte?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Detaljne statistike",
    "noDetailStatisticAvailable": "Nisu dodane statistike o sredstvima"
  }
});