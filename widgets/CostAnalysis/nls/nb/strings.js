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
  "_widgetLabel": "Kostnadsanalyse (betaversjon)",
  "unableToFetchInfoErrMessage": "Kan ikke hente detaljer om geometritjeneste/konfigurert lag",
  "invalidCostingGeometryLayer": "Kan ikke hente 'esriFieldTypeGlobalID' i geometrilag for kostnadsberegning.",
  "projectLayerNotFound": "Kan ikke finne det konfigurerte prosjektlaget i kartet.",
  "costingGeometryLayerNotFound": "Kan ikke finne det konfigurerte geometrilaget for kostnadsberegning i kartet.",
  "projectMultiplierTableNotFound": "Kan ikke finne den konfigurerte tabellen over multiplikator for tilleggskostnader for prosjekt i kartet.",
  "projectAssetTableNotFound": "Kan ikke finne den konfigurerte prosjektressurstabellen i kartet.",
  "createLoadProject": {
    "createProjectPaneTitle": "Opprett prosjekt",
    "loadProjectPaneTitle": "Last inn prosjekt",
    "projectNamePlaceHolder": "Prosjektnavn",
    "projectDescPlaceHolder": "Prosjektbeskrivelse",
    "selectProject": "Velg prosjekt",
    "viewInMapLabel": "Vis i kart",
    "loadLabel": "Last inn",
    "createLabel": "Opprett",
    "deleteProjectConfirmationMsg": "Er du sikker på at du vil slette dette prosjektet?",
    "noAssetsToViewOnMap": "Det valgte prosjektet har ingen ressurser som kan vises på kartet.",
    "projectDeletedMsg": "Prosjektet er slettet.",
    "errorInCreatingProject": "Feil ved oppretting av prosjekt.",
    "errorProjectNotFound": "Finner ikke prosjektet.",
    "errorInLoadingProject": "Kontroller om et gyldig prosjekt er valgt.",
    "errorProjectNotSelected": "Velg et prosjekt fra rullegardinlisten",
    "errorDuplicateProjectName": "Prosjektnavnet finnes allerede."
  },
  "statisticsSettings": {
    "tabTitle": "Statistikkinnstillinger",
    "addStatisticsLabel": "Legg til statistikk",
    "addNewStatisticsText": "Legg til ny statistikk",
    "deleteStatisticsText": "Slett statistikk",
    "moveStatisticsUpText": "Flytt statistikk opp",
    "moveStatisticsDownText": "Flytt statistikk ned",
    "layerNameTitle": "Lag",
    "statisticsTypeTitle": "Type",
    "fieldNameTitle": "Felt",
    "statisticsTitle": "Etikett",
    "actionLabelTitle": "Handlinger",
    "selectDeselectAllTitle": "Merk alle"
  },
  "statisticsType": {
    "countLabel": "Antall",
    "averageLabel": "Gjennomsnitt",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Summering",
    "areaLabel": "Areal",
    "lengthLabel": "Lengde"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Lag(ene) skal merkes som redigerbare i fanen med laginnstillinger"
  },
  "workBench": {
    "refresh": "Oppdater",
    "noAssetAddedMsg": "Ingen ressurser er lagt til",
    "units": "enhet(er)",
    "assetDetailsTitle": "Ressurselementdetaljer",
    "costEquationTitle": "Kostnadsligning",
    "newCostEquationTitle": "Ny ligning",
    "defaultCostEquationTitle": "Standardligning",
    "geographyTitle": "Geografi",
    "scenarioTitle": "Scenario",
    "costingInfoHintText": "<div>Tips: Bruk følgende nøkkelord</div><ul><li><b>{TOTALCOUNT}</b>: Bruker det totale antallet av samme type ressurs i en geografi</li> <li><b>{MEASURE}</b>: Bruker lengde for linjeressurs og areal for polygonressurs</li><li><b>{TOTALMEASURE}</b>: Bruker den samlede lengden for linjeressursen og det samlede arealet for polygonressursen av samme type i en geografi</li></ul> Du kan bruke funksjoner som:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Rediger kostnadsligningen ut fra prosjektbehovene dine.",
    "zoomToAsset": "Zoom til ressurs",
    "deleteAsset": "Slett ressurs",
    "closeDialog": "Lukk dialogboks",
    "objectIdColTitle": "Objekt-ID",
    "costColTitle": "Kostnad",
    "errorInvalidCostEquation": "Ugyldig kostnadsligning.",
    "errorInSavingAssetDetails": "Kan ikke lagre ressursdetaljer."
  },
  "assetDetails": {
    "inGeography": " i ${geography} ",
    "withScenario": " med ${scenario}",
    "totalCostTitle": "Totalkostnad",
    "additionalCostLabel": "Beskrivelse",
    "additionalCostValue": "Verdi",
    "additionalCostNetValue": "Nettoverdi"
  },
  "projectOverview": {
    "assetItemsTitle": "Ressurselementer",
    "assetStatisticsTitle": "Ressursstatistikk",
    "projectSummaryTitle": "Prosjektsammendrag",
    "projectName": "Prosjektnavn: ${name}",
    "totalCostLabel": "Total prosjektkostnad (*):",
    "grossCostLabel": "Brutto prosjektkostnad (*):",
    "roundingLabel": "* Avrundet til '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Kan ikke lagre prosjektgrense i prosjektlaget.",
    "unableToSaveProjectCost": "Kan ikke lagre kostnad(er) i prosjektlaget.",
    "roundCostValues": {
      "twoDecimalPoint": "To desimaler",
      "nearestWholeNumber": "Nærmeste hele tall",
      "nearestTen": "Nærmeste tier",
      "nearestHundred": "Nærmeste hundrer",
      "nearestThousand": "Nærmeste tusener",
      "nearestTenThousands": "Nærmeste titusener"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Prosjektattributt",
    "projectAttributeTitle": "Rediger prosjektattributter"
  },
  "costEscalation": {
    "costEscalationLabel": "Legg til tilleggskostnad",
    "valueHeader": "Verdi",
    "addCostEscalationText": "Legg til tilleggskostnad",
    "deleteCostEscalationText": "Slett valgt tilleggskostnad",
    "moveCostEscalationUpText": "Flytt valgt tilleggskostnad opp",
    "moveCostEscalationDownText": "Flytt valgt tilleggskostnad ned",
    "invalidEntry": "Én eller flere oppføringer er ugyldige.",
    "errorInSavingCostEscalation": "Kan ikke lagre detaljer om tilleggskostnad."
  },
  "scenarioSelection": {
    "popupTitle": "Velg scenario for ressurs",
    "regionLabel": "Geografi",
    "scenarioLabel": "Scenario",
    "noneText": "Ingen",
    "copyFeatureMsg": "Vil du kopiere de valgte geoobjektene?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Detaljert statistikk",
    "noDetailStatisticAvailable": "Ingen ressursstatistikk er lagt til"
  }
});