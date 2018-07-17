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
  "configText": "Ange konfigurationstext:",
  "generalSettings": {
    "tabTitle": "Allmänna inställningar",
    "measurementUnitLabel": "Mätenhet",
    "currencyLabel": "Mätsymbol",
    "roundCostLabel": "Avrundad kostnad",
    "projectOutputSettings": "Inställningar för projektutdata",
    "typeOfProjectAreaLabel": "Typ av projektområde",
    "bufferDistanceLabel": "Buffertavstånd",
    "roundCostValues": {
      "twoDecimalPoint": "Två decimaler",
      "nearestWholeNumber": "Närmaste heltal",
      "nearestTen": "Närmaste tiotal",
      "nearestHundred": "Närmaste hundratal",
      "nearestThousand": "Närmaste tusental",
      "nearestTenThousands": "Närmaste tiotusental"
    },
    "projectAreaType": {
      "outline": "Kontur",
      "buffer": "Buffert"
    },
    "errorMessages": {
      "currency": "Ogiltig valutaenhet",
      "bufferDistance": "Ogiltigt buffertavstånd",
      "outOfRangebufferDistance": "Värdet ska vara större än 0 och mindre än eller lika med 100."
    }
  },
  "projectSettings": {
    "tabTitle": "Projektinställningar",
    "costingGeometrySectionTitle": "Definiera geografi för kostnadsberäkning (valfritt)",
    "costingGeometrySectionNote": "Obs! Genom att konfigurera det här lagret kan användaren ställa in kostnadsekvationer för geoobjektmallar baserat på geografier.",
    "projectTableSectionTitle": "Möjlighet att spara/ladda projektinställningar (valfritt)",
    "projectTableSectionNote": "Obs! Genom att konfigurera alla tabeller och lager kan användaren spara/ladda projektet för senare användning.",
    "costingGeometryLayerLabel": "Geometrilager för kostnadsberäkning",
    "fieldLabelGeography": "Fält för att namnge geografi",
    "projectAssetsTableLabel": "Projektresurstabell",
    "projectMultiplierTableLabel": "Tabell för ytterligare kostnader för projektmultiplikator",
    "projectLayerLabel": "Projektlager",
    "configureFieldsLabel": "Konfigurera fält",
    "fieldDescriptionHeaderTitle": "Fältbeskrivning",
    "layerFieldsHeaderTitle": "Lagerfält",
    "selectLabel": "Välj",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} har redan valts",
      "invalidConfiguration": "Välj ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Polygonlager med följande villkor visas: <br/> <li>\tLagret måste ha â€œfrågekapacitetâ€</li><li>\tLagret måste ha ett GlobalID-fält</li></p>",
    "fieldToLabelGeographyHelp": "<p>Strängfält och numeriska fält i det valda â€œgeometrilagret för kostnadsberäkningâ€ visas i listmenyn â€œFält för att namnge geografiâ€.</p>",
    "projectAssetsTableHelp": "<p>Tabell(er) med följande villkor visas: <br/> <li>Tabellen måste vara redigerbar i form av â€œSkapaâ€, â€œTa bortâ€ och â€œUppdateraâ€</li>    <li>Tabellen måste ha sex fält med exakt namn och datatyp:</li><ul><li>\tAssetGUID (fält av GUID-typ)</li><li>\tCostEquation (fält av strängtyp)</li><li>\tScenario (fält av strängtyp)</li><li>\tTemplateName (fält av strängtyp)</li><li>    GeographyGUID (fält av GUID-typ)</li><li>\tProjectGUID (fält av GUID-typ)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Tabell(er) med följande villkor visas: <br/> <li>Tabellen måste vara redigerbar i form av â€œSkapaâ€, â€œTa bortâ€ och â€œUppdateraâ€</li>    <li>Tabellen måste ha fem fält med exakt namn och datatyp:</li><ul><li>\tDescription (fält av strängtyp)</li><li>\tType (fält av strängtyp)</li><li>\tValue (fält av float/double-typ)</li><li>\tCostindex (fält av heltalstyp)</li><li>   \tProjectGUID (fält av GUID-typ)</li></ul> </p>",
    "projectLayerHelp": "<p>Polygonlager med följande villkor visas: <br/> <li>Lagret måste vara redigerbart i form av â€œSkapaâ€, â€œTa bortâ€ och â€œUppdateraâ€</li>    <li>Lagret måste ha fem fält med exakt namn och datatyp:</li><ul><li>\tProjectName (fält av strängtyp)</li><li>\tDescription (fält av strängtyp)</li><li>Totalassetcost (fält av float/double-typ)</li><li>Grossprojectcost (fält av float/double-typ)</li><li>GlobalID (fält av GlobalID-typ)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Lagerinställningar",
    "layerNameHeaderTitle": "Lagernamn",
    "layerNameHeaderTooltip": "Lista med lager i kartan",
    "EditableLayerHeaderTitle": "Redigerbar",
    "EditableLayerHeaderTooltip": "Inkludera lager och dess mallar i widgeten för kostnadsberäkning",
    "SelectableLayerHeaderTitle": "Valbar",
    "SelectableLayerHeaderTooltip": "Geometri från geoobjekt kan användas till att skapa en ny kostnadspost",
    "fieldPickerHeaderTitle": "Projekt-ID (valfritt)",
    "fieldPickerHeaderTooltip": "Valfritt fält (av typen sträng) som Projekt-ID lagras i",
    "selectLabel": "Välj",
    "noAssetLayersAvailable": "Inget resurslager hittades i den valda webbkartan",
    "disableEditableCheckboxTooltip": "Det här lagret har ingen redigeringskapacitet",
    "missingCapabilitiesMsg": "Lagret saknar följande funktioner:",
    "missingGlobalIdMsg": "Lagret har inget GlobalId-fält",
    "create": "Skapa",
    "update": "Uppdatera",
    "delete": "Ta bort"
  },
  "costingInfo": {
    "tabTitle": "Information om kostnadsberäkning",
    "proposedMainsLabel": "Föreslagna huvudobjekt",
    "addCostingTemplateLabel": "Lägg till mall för kostnadsberäkning",
    "manageScenariosTitle": "Hantera scenarion",
    "featureTemplateTitle": "Geoobjektmall",
    "costEquationTitle": "Kostnadsekvation",
    "geographyTitle": "Geografi",
    "scenarioTitle": "Scenario",
    "actionTitle": "Åtgärder",
    "scenarioNameLabel": "Scenarionamn",
    "addBtnLabel": "Lägg till",
    "srNoLabel": "Nej.",
    "deleteLabel": "Ta bort",
    "duplicateScenarioName": "Dubblerat scenarionamn",
    "hintText": "<div>Tips: Använd följande nyckelord</div><ul><li><b>{TOTALCOUNT}</b>: Använder det totala antalet av samma typ av resurs i en geografi</li><li><b>{MEASURE}</b>: Använder längden för linjeresurs och yta för polygonresurs</li><li><b>{TOTALMEASURE}</b>: Använder den totala längden för linjeresurser och den totala ytan för polygonresurser av samma typ i en geografi</li></ul>Du kan använda funktioner som:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Redigera kostnadsekvationen efter projektets behov.",
    "noneValue": "Inga",
    "requiredCostEquation": "Ogiltig kostnadsekvation för ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Dubblerad mallpost finns för ${layerName} : ${templateName}",
    "defaultEquationRequired": "Standardekvation krävs för ${layerName} : ${templateName}",
    "validCostEquationMessage": "Ange en giltig kostnadsekvation",
    "costEquationHelpText": "Redigera kostnadsekvationen efter projektets behov",
    "scenarioHelpText": "Välj scenario efter projektets behov",
    "copyRowTitle": "Kopiera rad",
    "noTemplateAvailable": "Lägg till minst en mall för ${layerName}",
    "manageScenarioLabel": "Hantera scenario",
    "noLayerMessage": "Ange minst ett lager i ${tabName}",
    "noEditableLayersAvailable": "Lager måste markeras som redigerbara på fliken lagerinställningar"
  },
  "statisticsSettings": {
    "tabTitle": "Inställningar för statistik",
    "addStatisticsLabel": "Lägg till statistik",
    "fieldNameTitle": "Fält",
    "statisticsTitle": "Etikett",
    "addNewStatisticsText": "Lägg till ny statistik",
    "deleteStatisticsText": "Ta bort statistik",
    "moveStatisticsUpText": "Flytta statistik uppåt",
    "moveStatisticsDownText": "Flytta statistik nedåt",
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
  }
});