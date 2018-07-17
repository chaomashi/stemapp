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
  "_widgetLabel": "Kostenanalyse bèta",
  "unableToFetchInfoErrMessage": "Kan geometrieservice/geconfigureerde laaggegevens niet ophalen",
  "invalidCostingGeometryLayer": "Kan 'esriFieldTypeGlobalID' niet ophalen in kostengeometrielaag.",
  "projectLayerNotFound": "Kan de geconfigureerde projectlaag niet op de kaart vinden.",
  "costingGeometryLayerNotFound": "Kan de geconfigureerde kostengeometrielaag niet op de kaart vinden.",
  "projectMultiplierTableNotFound": "Kon de geconfigureerde project multiplicator bijkomende kosttabel niet op de kaart vinden.",
  "projectAssetTableNotFound": "Kan de geconfigureerde projectassettabel niet op de kaart vinden.",
  "createLoadProject": {
    "createProjectPaneTitle": "Project maken",
    "loadProjectPaneTitle": "Project laden",
    "projectNamePlaceHolder": "Projectnaam",
    "projectDescPlaceHolder": "Projectbeschrijving",
    "selectProject": "Project selecteren",
    "viewInMapLabel": "Bekijk in kaart",
    "loadLabel": "Laden",
    "createLabel": "Maken",
    "deleteProjectConfirmationMsg": "Weet u zeker dat u het project wilt verwijderen?",
    "noAssetsToViewOnMap": "Geselecteerd project heeft geen assets om op de kaart te bekijken.",
    "projectDeletedMsg": "Project succesvol verwijderd.",
    "errorInCreatingProject": "Fout bij het maken van een project.",
    "errorProjectNotFound": "Project niet gevonden.",
    "errorInLoadingProject": "Controleer of een geldig project is geselecteerd.",
    "errorProjectNotSelected": "Selecteer een project in de keuzelijst",
    "errorDuplicateProjectName": "Projectnaam bestaat al."
  },
  "statisticsSettings": {
    "tabTitle": "Statistiekinstellingen",
    "addStatisticsLabel": "Voeg statistieken toe",
    "addNewStatisticsText": "Voeg nieuwe statistieken toe",
    "deleteStatisticsText": "Verwijder statistieken",
    "moveStatisticsUpText": "Verplaats statistieken omhoog",
    "moveStatisticsDownText": "Verplaats statistieken naar beneden",
    "layerNameTitle": "Kaartlaag",
    "statisticsTypeTitle": "Type",
    "fieldNameTitle": "Veld",
    "statisticsTitle": "Label",
    "actionLabelTitle": "Acties",
    "selectDeselectAllTitle": "Alles selecteren"
  },
  "statisticsType": {
    "countLabel": "Aantal",
    "averageLabel": "Gemiddelde",
    "maxLabel": "Maximum",
    "minLabel": "Minimum",
    "summationLabel": "Sommering",
    "areaLabel": "Gebied",
    "lengthLabel": "Lengte"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Laag (lagen) moeten worden gecontroleerd als bewerkbaar op het tabblad Laaginstellingen"
  },
  "workBench": {
    "refresh": "Vernieuwen",
    "noAssetAddedMsg": "Geen assets toegevoegd",
    "units": "Eenheid (eenheden)",
    "assetDetailsTitle": "Assetitemgegevens",
    "costEquationTitle": "Kostenvergelijking",
    "newCostEquationTitle": "Nieuwe vergelijking",
    "defaultCostEquationTitle": "Standaard vergelijking",
    "geographyTitle": "Geografie",
    "scenarioTitle": "Scenario",
    "costingInfoHintText": "<div>Tip: Gebruik de volgende trefwoorden</div><ul><li><b>{TOTALCOUNT}</b>: gebruikt het totale aantal van hetzelfde type asset in een geografie</li> <li><b>{MEASURE}</b>: gebruikt de lengte voor het regelasset en het gebied voor het vlakasset</li><li><b>{TOTALMEASURE}</b>: gebruikt de totale lengte voor het regelasset en het totale gebied voor vlakasset van hetzelfde type in een geografie</li></ul> U kunt functies gebruiken als:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Bewerk de kostenvergelijking volgens uw projectbehoefte.",
    "zoomToAsset": "Zoom in op asset",
    "deleteAsset": "Verwijder asset",
    "closeDialog": "Dialoogvenster sluiten",
    "objectIdColTitle": "Object-Id",
    "costColTitle": "Kosten",
    "errorInvalidCostEquation": "Ongeldige kostenvergelijking",
    "errorInSavingAssetDetails": "Kan assetdetails niet opslaan."
  },
  "assetDetails": {
    "inGeography": " in ${geography} ",
    "withScenario": " met ${scenario}",
    "totalCostTitle": "Totale kosten",
    "additionalCostLabel": "Beschrijving",
    "additionalCostValue": "Waarde",
    "additionalCostNetValue": "Net waarde"
  },
  "projectOverview": {
    "assetItemsTitle": "Assetelementen",
    "assetStatisticsTitle": "Assetstatistieken",
    "projectSummaryTitle": "Projectsamenvatting",
    "projectName": "Projectnaam: ${name}",
    "totalCostLabel": "Totale projectkosten (*):",
    "grossCostLabel": "Bruto projectkosten (*):",
    "roundingLabel": "* Wordt afgerond naar '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Kan projectgrens niet opslaan in projectlaag.",
    "unableToSaveProjectCost": "Kan kosten niet opslaan in projectlaag.",
    "roundCostValues": {
      "twoDecimalPoint": "Twee decimale punten",
      "nearestWholeNumber": "Dichtstbijzijnde hele nummer",
      "nearestTen": "Dichtstbijzijnde tien",
      "nearestHundred": "Dichtstbijzijnde honderd",
      "nearestThousand": "Dichtstbijzijnde duizenden",
      "nearestTenThousands": "Dichtstbijzijnde tien duizenden"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Projectattribuut",
    "projectAttributeTitle": "Projectattribuut bewerken"
  },
  "costEscalation": {
    "costEscalationLabel": "Bijkomende kosten toevoegen",
    "valueHeader": "Waarde",
    "addCostEscalationText": "Bijkomende kosten toevoegen",
    "deleteCostEscalationText": "Geselecteerde bijkomende kosten verwijderen",
    "moveCostEscalationUpText": "Verplaats geselecteerde bijkomende kosten naar boven",
    "moveCostEscalationDownText": "Verplaats geselecteerde bijkomende kosten naar onderen",
    "invalidEntry": "Een of meer ingaves zijn ongeldig.",
    "errorInSavingCostEscalation": "Kan geen extra kostengegevens opslaan."
  },
  "scenarioSelection": {
    "popupTitle": "Selecteer scenario voor de asset",
    "regionLabel": "Geografie",
    "scenarioLabel": "Scenario",
    "noneText": "Geen",
    "copyFeatureMsg": "Wilt u geselecteerde objecten kopiëren?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Detail statistieken",
    "noDetailStatisticAvailable": "Geen assetstatistieken toegevoegd"
  }
});