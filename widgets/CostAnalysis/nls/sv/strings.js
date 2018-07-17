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
  "_widgetLabel": "Cost Analysis Beta",
  "unableToFetchInfoErrMessage": "Det gick inte att hämta information om geometritjänst/konfigurerat lager",
  "invalidCostingGeometryLayer": "Det gick inte att hämta esriFieldTypeGlobalID i geometrilager för kostnadsberäkning.",
  "projectLayerNotFound": "Det gick inte att hitta det konfigurerade projektlagret i kartan.",
  "costingGeometryLayerNotFound": "Det gick inte att hitta det konfigurerade geometrilagret för kostnadsberäkning i kartan.",
  "projectMultiplierTableNotFound": "Det gick inte att hitta tabellen för ytterligare kostnader för konfigurerad projektmultiplikator i kartan.",
  "projectAssetTableNotFound": "Det gick inte att hitta tabellen för konfigurerad projektresurs i kartan.",
  "createLoadProject": {
    "createProjectPaneTitle": "Skapa projekt",
    "loadProjectPaneTitle": "Ladda projekt",
    "projectNamePlaceHolder": "Projektnamn",
    "projectDescPlaceHolder": "Projektbeskrivning",
    "selectProject": "Välj projekt",
    "viewInMapLabel": "Visa i karta",
    "loadLabel": "Ladda",
    "createLabel": "Skapa",
    "deleteProjectConfirmationMsg": "Är du säker på att du vill ta bort projektet?",
    "noAssetsToViewOnMap": "Det markerade projektet har inga resurser att visa i kartan.",
    "projectDeletedMsg": "Projektet har tagits bort.",
    "errorInCreatingProject": "Ett fel uppstod när projektet skapades.",
    "errorProjectNotFound": "Det gick inte att hitta projektet.",
    "errorInLoadingProject": "Kontrollera om ett giltigt projekt är markerat.",
    "errorProjectNotSelected": "Välj ett projekt i listmenyn.",
    "errorDuplicateProjectName": "Projektnamnet finns redan."
  },
  "statisticsSettings": {
    "tabTitle": "Inställningar för statistik",
    "addStatisticsLabel": "Lägg till statistik",
    "addNewStatisticsText": "Lägg till ny statistik",
    "deleteStatisticsText": "Ta bort statistik",
    "moveStatisticsUpText": "Flytta statistik uppåt",
    "moveStatisticsDownText": "Flytta statistik nedåt",
    "layerNameTitle": "Lager",
    "statisticsTypeTitle": "Mappen innehåller inte ett giltigt app-projekt",
    "fieldNameTitle": "Fält",
    "statisticsTitle": "Etikett",
    "actionLabelTitle": "Åtgärder",
    "selectDeselectAllTitle": "Markera alla"
  },
  "statisticsType": {
    "countLabel": "Antal",
    "averageLabel": "Genomsnitt",
    "maxLabel": "Maximalt",
    "minLabel": "Minimum",
    "summationLabel": "Sammanfattning",
    "areaLabel": "Område",
    "lengthLabel": "Längd"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Lager måste markeras som redigerbara på fliken lagerinställningar"
  },
  "workBench": {
    "refresh": "Uppdatera",
    "noAssetAddedMsg": "Inga resurser har lagts till",
    "units": "enhet(er)",
    "assetDetailsTitle": "Information om resursobjekt",
    "costEquationTitle": "Kostnadsekvation",
    "newCostEquationTitle": "Ny ekvation",
    "defaultCostEquationTitle": "Standardekvation",
    "geographyTitle": "Geografi",
    "scenarioTitle": "Scenario",
    "costingInfoHintText": "<div>Tips: Använd följande nyckelord</div><ul><li><b>{TOTALCOUNT}</b>: Använder det totala antalet av samma typ av resurs i en geografi</li><li><b>{MEASURE}</b>: Använder längden för linjeresurs och yta för polygonresurs</li><li><b>{TOTALMEASURE}</b>: Använder den totala längden för linjeresurser och den totala ytan för polygonresurser av samma typ i en geografi</li></ul> Du kan använda funktioner som:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Redigera kostnadsekvationen efter projektets behov.",
    "zoomToAsset": "Zooma till resurs",
    "deleteAsset": "Ta bort resurs",
    "closeDialog": "Stäng dialogruta",
    "objectIdColTitle": "Objekt-ID",
    "costColTitle": "Kostnad",
    "errorInvalidCostEquation": "Ogiltig kostnadsekvation.",
    "errorInSavingAssetDetails": "Det gick inte att spara resursinformation."
  },
  "assetDetails": {
    "inGeography": " i ${geography} ",
    "withScenario": " med ${scenario}",
    "totalCostTitle": "Total kostnad",
    "additionalCostLabel": "Beskrivning",
    "additionalCostValue": "Värde",
    "additionalCostNetValue": "Nettovärde"
  },
  "projectOverview": {
    "assetItemsTitle": "Resursobjekt",
    "assetStatisticsTitle": "Resursstatistik",
    "projectSummaryTitle": "Projektsammanfattning",
    "projectName": "Projektnamn: ${name}",
    "totalCostLabel": "Total projektkostnad (*):",
    "grossCostLabel": "Projektkostnad brutto (*):",
    "roundingLabel": "* Avrundning till '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Det gick inte att spara projektgräns i projektlager.",
    "unableToSaveProjectCost": "Det gick inte att spara kostnad(er) i projektlager.",
    "roundCostValues": {
      "twoDecimalPoint": "Två decimaler",
      "nearestWholeNumber": "Närmaste heltal",
      "nearestTen": "Närmaste tiotal",
      "nearestHundred": "Närmaste hundratal",
      "nearestThousand": "Närmaste tusental",
      "nearestTenThousands": "Närmaste tiotusental"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Projektattribut",
    "projectAttributeTitle": "Redigera projektattribut"
  },
  "costEscalation": {
    "costEscalationLabel": "Lägg till ytterligare kostnad",
    "valueHeader": "Värde",
    "addCostEscalationText": "Lägg till ytterligare kostnad",
    "deleteCostEscalationText": "Ta bort markerad ytterligare kostnad",
    "moveCostEscalationUpText": "Flytta markerad ytterligare kostnad uppåt",
    "moveCostEscalationDownText": "Flytta markerad ytterligare kostnad nedåt",
    "invalidEntry": "En eller flera poster är ogiltiga.",
    "errorInSavingCostEscalation": "Det gick inte att spara information om ytterligare kostnad."
  },
  "scenarioSelection": {
    "popupTitle": "Välj scenario för resursen",
    "regionLabel": "Geografi",
    "scenarioLabel": "Scenario",
    "noneText": "Inga",
    "copyFeatureMsg": "Vill du kopiera de markerade geoobjekten?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Detaljerad statistik",
    "noDetailStatisticAvailable": "Ingen resursstatistik har lagts till"
  }
});