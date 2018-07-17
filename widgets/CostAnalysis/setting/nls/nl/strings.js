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
  "configText": "Configuratietekst instellen:",
  "generalSettings": {
    "tabTitle": "Algemene instellingen",
    "measurementUnitLabel": "Meeteenheid",
    "currencyLabel": "Meetsymbool",
    "roundCostLabel": "Afgeronde kosten",
    "projectOutputSettings": "Projectuitvoersinstellingen",
    "typeOfProjectAreaLabel": "Type projectgebied",
    "bufferDistanceLabel": "Bufferafstand",
    "roundCostValues": {
      "twoDecimalPoint": "Twee decimale punten",
      "nearestWholeNumber": "Dichtstbijzijnde hele nummer",
      "nearestTen": "Dichtstbijzijnde tien",
      "nearestHundred": "Dichtstbijzijnde honderd",
      "nearestThousand": "Dichtstbijzijnde duizenden",
      "nearestTenThousands": "Dichtstbijzijnde tien duizenden"
    },
    "projectAreaType": {
      "outline": "Omtreklijn",
      "buffer": "Buffer"
    },
    "errorMessages": {
      "currency": "Ongeldige valuta-eenheid",
      "bufferDistance": "Ongeldige bufferafstand",
      "outOfRangebufferDistance": "De waarde moet groter dan 0 en kleiner dan of gelijk aan 100 zijn"
    }
  },
  "projectSettings": {
    "tabTitle": "Projectinstellingen",
    "costingGeometrySectionTitle": "Definieer geografie voor kosten (optioneel)",
    "costingGeometrySectionNote": "Opmerking: als u deze laag configureert, kan de gebruiker kostenvergelijkingen van objectsjablonen instellen op basis van geografische regio's.",
    "projectTableSectionTitle": "Mogelijkheid om projectinstellingen op te slaan/te laden (optioneel)",
    "projectTableSectionNote": "Opmerking: Door alle tabellen en lagen te configureren, kan de gebruiker het project opslaan/laden voor later gebruik.",
    "costingGeometryLayerLabel": "Kosten geometrielaag",
    "fieldLabelGeography": "Geografie Veld naar laag",
    "projectAssetsTableLabel": "Tabel projectassets",
    "projectMultiplierTableLabel": "Tabel projectmultiplicator extra kosten",
    "projectLayerLabel": "Projectlaag",
    "configureFieldsLabel": "Velden configureren",
    "fieldDescriptionHeaderTitle": "Veldbeschrijving",
    "layerFieldsHeaderTitle": "Laagveld",
    "selectLabel": "Selecteren",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} is al geselecteerd",
      "invalidConfiguration": "Selecteer ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Vlaklaag (-lagen) met de volgende voorwaarden wordt getoond: <br/> <li>\tLaag moet â€œQueryâ€-capaciteit hebben</li><li>\tLaag moet een GlobalID-veld hebben</li></p>",
    "fieldToLabelGeographyHelp": "<p>String en numerieke velden van de geselecteerde â€œCosting Geometry Layerâ€ worden weergegeven in de â€œField to Label Geographyâ€-keuzelijst.</p>",
    "projectAssetsTableHelp": "<p>Tabel(len) met de volgende voorwaarden wordt getoond: <br/> <li>Tabel moet bewerkingsmogelijkheden hebben, namelijk â€œCreateâ€, â€œDeleteâ€ en â€œUpdateâ€</li>    <li>Tabel moet zes velden hebben met exacte naam en gegevenstype:</li><ul><li>\tAssetGUID (GUID-veldtype)</li><li>\tCostEquation (String-veldtype)</li><li>\tScenario (String-veldtype)</li><li>\tTemplateName (String-veldtype)</li><li>    GeographyGUID (GUID-veldtype)</li><li>\tProjectGUID (GUID-veldtype)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Tabel(len) met de volgende voorwaarden wordt getoond: <br/> <li>Tabel moet bewerkingsmogelijkheden hebben, namelijk â€œCreateâ€, â€œDeleteâ€ en â€œUpdateâ€</li>    <li>Tabel moet vijf velden hebben met exacte naam en gegevenstype:</li><ul><li>\tBeschrijving (String-veldtype)</li><li>\tType (String-veldtype)</li><li>\tWaarde (Float/Double-veldtype)</li><li>\tCostindex (Integer-veldtype)</li><li>   \tProjectGUID (GUID-veldtype))</li></ul> </p>",
    "projectLayerHelp": "<p>Vlaklaag (-lagen) met de volgende voorwaarden wordt getoond: <br/> <li>Laag moet bewerkingsmogelijkheden hebben, namelijk â€œCreateâ€, â€œDeleteâ€ en â€œUpdateâ€</li>    <li>Laag moet vijf velden hebben met exacte naam en gegevenstype:</li><ul><li>ProjectName (String-veldtype)</li><li>Beschrijving (String-veldtype)</li><li>Totalassetcost (Float/Double-veldtype)</li><li>Grossprojectcost (Float/Double-veldtype)</li><li>GlobalID (GlobalID-veldtype)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Laaginstellingen",
    "layerNameHeaderTitle": "Kaartlaagnaam",
    "layerNameHeaderTooltip": "Lijst van lagen op de kaart",
    "EditableLayerHeaderTitle": "Bewerkbaar",
    "EditableLayerHeaderTooltip": "Neem de laag en de sjablonen op in de kostenwidget",
    "SelectableLayerHeaderTitle": "Selecteerbaar",
    "SelectableLayerHeaderTooltip": "Geometrie van object kan gebruikt worden om een nieuw kostenelement te genereren",
    "fieldPickerHeaderTitle": "Project-ID (optioneel)",
    "fieldPickerHeaderTooltip": "Optioneel veld (van het type string) om de project-ID in op te slaan",
    "selectLabel": "Selecteren",
    "noAssetLayersAvailable": "Geen assetlaag gevonden in de geselecteerde webkaart",
    "disableEditableCheckboxTooltip": "Deze laag heeft geen bewerkingsmogelijkheden",
    "missingCapabilitiesMsg": "Deze laag mist de volgende mogelijkheden:",
    "missingGlobalIdMsg": "Deze laag heeft geen GlobalId veld",
    "create": "Maken",
    "update": "Actualiseren",
    "delete": "Verwijderen"
  },
  "costingInfo": {
    "tabTitle": "Kosteninformatie",
    "proposedMainsLabel": "Voorgestelde leidingen",
    "addCostingTemplateLabel": "Voeg kostensjabloon toe",
    "manageScenariosTitle": "Beheer scenario’s",
    "featureTemplateTitle": "Objectsjabloon",
    "costEquationTitle": "Kostenvergelijking",
    "geographyTitle": "Geografie",
    "scenarioTitle": "Scenario",
    "actionTitle": "Acties",
    "scenarioNameLabel": "Scenarionaam",
    "addBtnLabel": "Toevoegen",
    "srNoLabel": "Nee.",
    "deleteLabel": "Verwijderen",
    "duplicateScenarioName": "Scenarionaam dupliceren",
    "hintText": "<div>Tip: Gebruik de volgende trefwoorden</div><ul><li><b>{TOTALCOUNT}</b>: gebruikt het totale aantal van hetzelfde type asset in een geografie</li><li><b>{MEASURE}</b>: gebruikt de lengte voor het regelasset en het gebied voor het vlakasset</li><li><b>{TOTALMEASURE}</b>: gebruikt de totale lengte voor het regelasset en het totale gebied voor vlakasset van hetzelfde type in een geografie</li></ul>U kunt functies gebruiken als:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Bewerk de kostenvergelijking volgens uw projectbehoefte.",
    "noneValue": "Geen",
    "requiredCostEquation": "Ongeldige kostenvergelijking voor ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Er bestaat een dubbele sjablooninvoer voor ${layerName} : ${templateName}",
    "defaultEquationRequired": "Standaardvergelijking is vereist voor ${layerName} : ${templateName}",
    "validCostEquationMessage": "Voer geldige kostenvergelijking in",
    "costEquationHelpText": "Bewerk de kostenvergelijking volgens uw projectbehoefte",
    "scenarioHelpText": "Selecteer het scenario volgens uw projectbehoefte",
    "copyRowTitle": "Kopieer rij",
    "noTemplateAvailable": "Voeg ten minste één sjabloon toe voor ${layerName}",
    "manageScenarioLabel": "Beheer scenario",
    "noLayerMessage": "Voer ten minste één laag in ${tabName} in",
    "noEditableLayersAvailable": "La(a)g(en) moet(en) worden aangevinkt als bewerkbaar op het tabblad Laaginstellingen"
  },
  "statisticsSettings": {
    "tabTitle": "Statistiekinstellingen",
    "addStatisticsLabel": "Voeg statistieken toe",
    "fieldNameTitle": "Veld",
    "statisticsTitle": "Label",
    "addNewStatisticsText": "Voeg nieuwe statistieken toe",
    "deleteStatisticsText": "Verwijder statistieken",
    "moveStatisticsUpText": "Verplaats statistieken omhoog",
    "moveStatisticsDownText": "Verplaats statistieken naar beneden",
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
  }
});