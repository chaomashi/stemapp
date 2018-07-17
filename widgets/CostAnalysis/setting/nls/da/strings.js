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
  "configText": "Angiv konfigurationstekst:",
  "generalSettings": {
    "tabTitle": "Generelle indstillinger",
    "measurementUnitLabel": "Måleenhed",
    "currencyLabel": "Målesymbol",
    "roundCostLabel": "Afrundet omkostning",
    "projectOutputSettings": "Projekt-outputindstillinger",
    "typeOfProjectAreaLabel": "Projektområdetype",
    "bufferDistanceLabel": "Bufferafstand",
    "roundCostValues": {
      "twoDecimalPoint": "To decimaler",
      "nearestWholeNumber": "Nærmeste hele tal",
      "nearestTen": "Nærmeste tier",
      "nearestHundred": "Nærmeste hundrede",
      "nearestThousand": "Nærmeste tusinde",
      "nearestTenThousands": "Nærmeste titusinde"
    },
    "projectAreaType": {
      "outline": "Kontur",
      "buffer": "Buffer"
    },
    "errorMessages": {
      "currency": "Ugyldig valutaenhed",
      "bufferDistance": "Ugyldig bufferafstand",
      "outOfRangebufferDistance": "Værdien skulle være større end 0 og mindre end eller lig med 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Projektindstillinger",
    "costingGeometrySectionTitle": "Definer geografi vedrørende omkostning (valgfrit)",
    "costingGeometrySectionNote": "Bemærk: Konfiguration af dette lag vil gøre det muligt for brugeren at angive omkostningsligninger for objektskabeloner baseret på geografi.",
    "projectTableSectionTitle": "Mulighed for at gemme/indlæse projektindstillinger (valgfrit)",
    "projectTableSectionNote": "Bemærk: Konfiguration af alle tabeller og lag vil gøre det muligt for brugeren at gemme/indlæse projekter til senere brug.",
    "costingGeometryLayerLabel": "Omkostningsgeometrilag",
    "fieldLabelGeography": "Feltetiket-geografi",
    "projectAssetsTableLabel": "Tabel over projektaktiver",
    "projectMultiplierTableLabel": "Tabel over multiplikator for yderligere projektomkostninger",
    "projectLayerLabel": "Projektlag",
    "configureFieldsLabel": "Konfigurér felter",
    "fieldDescriptionHeaderTitle": "Feltbeskrivelse",
    "layerFieldsHeaderTitle": "Lagfelt",
    "selectLabel": "Vælg",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} er allerede blevet valgt",
      "invalidConfiguration": "Vælg ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Polygonlag med følgende betingelser vil blive vist: <br/> <li>\tLaget skal have en forespørgselsfunktion</li><li>\tLaget skal have et Globalt ID-felt</li></p>",
    "fieldToLabelGeographyHelp": "<p>Strengen og de numeriske felter for det valgte omkostningsgeometrilag vil blive vist i rullemenuen Felt til etiketgeografi.</p>",
    "projectAssetsTableHelp": "<p>Tabel(ler) med følgende betingelser vil blive vist: <br/> <li>Tabellen skal have redigeringsfunktioner, nemlig Opret, Slet og Opdatér</li>    <li>Tabellen skal have seks felter med præcist navn og datatype:</li><ul><li>\tAssetGUID (GUID-typefelt)</li><li>\tCostEquation (Strengtypefelt)</li><li>\tScenario (Strengtypefelt)</li><li>\tTemplateName (Strengtypefelt)</li><li>    GeographyGUID (GUID-typefelt)</li><li>\tProjectGUID (GUID-typefelt)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Tabel(ler) med følgende betingelser vil blive vist: <br/> <li>Tabellen skal have redigeringsfunktioner, nemlig Opret, Slet og Opdatér</li>    <li>Tabellen skal have fem felter med præcist navn og datatype:</li><ul><li>\tBeskrivelse (Strengtypefelt)</li><li>\tType (Strengtypefelt)</li><li>\tVærdi (Float/Double-typefelt)</li><li>\tCostindex (Heltalstypefelt)</li><li>   \tProjectGUID (GUID-typefelt))</li></ul> </p>",
    "projectLayerHelp": "<p>Polygonlag med følgende betingelser vil blive vist: <br/> <li>Laget skal have redigeringsfunktioner, nemlig Opret, Slet og Opdatér</li>    <li>Laget skal have fem felter med præcist navn og datatype:</li><ul><li>ProjectName (Strengtypefelt)</li><li>Beskrivelse (Strengtypefelt)</li><li>Totalassetcost (Float/Double-typefelt)</li><li>Grossprojectcost (Float/Double-typefelt)</li><li>GlobalID (GlobalID-typefelt)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Lagindstillinger",
    "layerNameHeaderTitle": "Navn på lag",
    "layerNameHeaderTooltip": "Liste over lag i kortet",
    "EditableLayerHeaderTitle": "Redigérbar",
    "EditableLayerHeaderTooltip": "Medtag laget og dets skabeloner i omkostnings-widget'en",
    "SelectableLayerHeaderTitle": "Kan vælges",
    "SelectableLayerHeaderTooltip": "Geometrien fra objektet kan bruges til at genere et nyt omkostningselement",
    "fieldPickerHeaderTitle": "Projekt-ID (valgfrit)",
    "fieldPickerHeaderTooltip": "Valgfrit felt (af strengtypen) til lagring af Projekt-ID",
    "selectLabel": "Vælg",
    "noAssetLayersAvailable": "Intet aktivlag fundet i det valgte webkort",
    "disableEditableCheckboxTooltip": "Dette lag har ikke nogen redigeringsfunktioner",
    "missingCapabilitiesMsg": "Dette lag mangler følgende funktioner:",
    "missingGlobalIdMsg": "Dette lag har ikke noget GlobalId-felt",
    "create": "Opret",
    "update": "Opdatering",
    "delete": "Slet"
  },
  "costingInfo": {
    "tabTitle": "Omkostningsoplysninger",
    "proposedMainsLabel": "Foreslået hoved",
    "addCostingTemplateLabel": "Tilføj omkostningsskabelon",
    "manageScenariosTitle": "Administrér scenarier",
    "featureTemplateTitle": "Objektskabelon",
    "costEquationTitle": "Omkostningsligning",
    "geographyTitle": "Geografi",
    "scenarioTitle": "Scenarie",
    "actionTitle": "Handlinger",
    "scenarioNameLabel": "Scenarienavn",
    "addBtnLabel": "Tilføj",
    "srNoLabel": "Nej.",
    "deleteLabel": "Slet",
    "duplicateScenarioName": "Dobbelt forekomst af scenarienavn",
    "hintText": "<div>Tip: Brug følgende nøgleord</div><ul><li><b>{TOTALCOUNT}</b>: Bruger det samlede antal af den samme type aktiv i en geografi</li><li><b>{MEASURE}</b>: Bruger længde for linjeaktivet og område for polygonaktiv</li><li><b>{TOTALMEASURE}</b>: Bruger den samlede længde for linjeaktivet og det samlede område for polygonaktivet af samme type i en geografi</li></ul>Du kan bruge funktioner, såsom:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Redigér omkostningsligningen ud fra dine projektbehov.",
    "noneValue": "Ingen",
    "requiredCostEquation": "Ugyldig omkostningsligning for ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Dobbelt forekommende skabelonpost findes for ${layerName} : ${templateName}",
    "defaultEquationRequired": "Standardligning kræves for ${layerName} : ${templateName}",
    "validCostEquationMessage": "Angiv en gyldig omkostningsligning",
    "costEquationHelpText": "Redigér omkostningsligningen ud fra dine projektbehov",
    "scenarioHelpText": "Vælg scenarie ud fra dine projektbehov",
    "copyRowTitle": "Kopiér række",
    "noTemplateAvailable": "Tilføj mindst én skabelon for ${layerName}",
    "manageScenarioLabel": "Administrér scenarie",
    "noLayerMessage": "Angiv mindst ét lag i ${tabName}",
    "noEditableLayersAvailable": "Lag(ene) skal markeres som redigérbare på fanen med lagindstillinger"
  },
  "statisticsSettings": {
    "tabTitle": "Statistik-indstillinger",
    "addStatisticsLabel": "Tilføj statistik",
    "fieldNameTitle": "Felt",
    "statisticsTitle": "Mærke",
    "addNewStatisticsText": "Tilføj ny statistik",
    "deleteStatisticsText": "Slet statistik",
    "moveStatisticsUpText": "Flyt statistik op",
    "moveStatisticsDownText": "Flyt statistik ned",
    "selectDeselectAllTitle": "Vælg alle"
  },
  "statisticsType": {
    "countLabel": "Tælling",
    "averageLabel": "Gennemsnit",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Summering",
    "areaLabel": "Område",
    "lengthLabel": "Længde"
  }
});