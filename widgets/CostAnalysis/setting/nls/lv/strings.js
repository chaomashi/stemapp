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
  "configText": "Iestatiet konfigurācijas tekstu:",
  "generalSettings": {
    "tabTitle": "Vispārīgi iestatījumi",
    "measurementUnitLabel": "Mērvienība",
    "currencyLabel": "Mērvienības simbols",
    "roundCostLabel": "Noapaļotas izmaksas",
    "projectOutputSettings": "Projekta izvades iestatījumi",
    "typeOfProjectAreaLabel": "Projekta teritorijas tips",
    "bufferDistanceLabel": "Buferzonas attālums",
    "roundCostValues": {
      "twoDecimalPoint": "Divi komati",
      "nearestWholeNumber": "Tuvākais veselais skaitlis",
      "nearestTen": "Tuvākais desmitu skaitlis",
      "nearestHundred": "Tuvākais simtu skaitlis",
      "nearestThousand": "Tuvākais tūkstošu skaitlis",
      "nearestTenThousands": "Tuvākais desmitu tūkstošu skaitlis"
    },
    "projectAreaType": {
      "outline": "Kontūra",
      "buffer": "Buferzona"
    },
    "errorMessages": {
      "currency": "Nederīga valūtas mērvienība",
      "bufferDistance": "Nederīgs buferzonas attālums",
      "outOfRangebufferDistance": "Vērtībai jābūt lielākai par 0 un mazākai vai vienādai ar 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Projekta iestatījumi",
    "costingGeometrySectionTitle": "Definēt ģeogrāfiju izmaksām (pēc izvēles)",
    "costingGeometrySectionNote": "Piezīme: ja šis slānis būs konfigurēts, lietotājs varēs iestatīt elementu sagatavju izmaksu vienādojumus atkarībā balstoties uz ģeogrāfiju.",
    "projectTableSectionTitle": "Iespēja saglabāt/ielādēt projekta iestatījumus (pēc izvēles)",
    "projectTableSectionNote": "Piezīme: ja konfigurēsiet visas tabulas un slāņus, lietotājs varēs saglabāt/ielādēt projektu vēlākai lietošanai.",
    "costingGeometryLayerLabel": "Slāņa ģeometrija izmaksas",
    "fieldLabelGeography": "Lauks ģeogrāfijas nosaukumam",
    "projectAssetsTableLabel": "Projekta vērtību tabula",
    "projectMultiplierTableLabel": "Projekta reizinātāja papildu izmaksu tabula",
    "projectLayerLabel": "Projekta slānis",
    "configureFieldsLabel": "Konfigurēt laukus",
    "fieldDescriptionHeaderTitle": "Lauka apraksts",
    "layerFieldsHeaderTitle": "Slāņu lauks",
    "selectLabel": "Izvēlēties",
    "errorMessages": {
      "duplicateLayerSelection": "Slānis ${layerName} jau ir izvēlēts",
      "invalidConfiguration": "Izvēlieties ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Tiks parādīts(-i) laukuma slānis(-ņi), kas atbilst tālāk norādītajiem nosacījumiem. <br/> <li>\tSlānī jābūt ietvertai â€œvaicājumaâ€ iespējai</li><li>\tSlānī jābūt ietvertam laukam GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "s<p>Izvēlētā â€œizmaksu ģeometrijas slāņaâ€ teksts un ciparu lauki tiks parādīti â€nosaukums laukam ģeogrāfijaâ€ nolaižamajā izvēlnē.</p>",
    "projectAssetsTableHelp": "<p>Tiks parādīta(-s) tabula(-s), kas atbilst tālāk norādītajiem nosacījumiem. <br/> <li>Tabulā jābūt šādām rediģēšanas iespējām: â€œIzveidotâ€, â€œDzēstâ€ un â€œAtjaunotâ€</li>    <li>Tabulā jābūt sešiem laukiem ar precīzu nosaukumu un datu tipu:</li><ul><li>\tAssetGUID (GUID tipa lauks)</li><li>\tCostEquation (teksta tipa lauks)</li><li>\tScenario (teksta tipa lauks)</li><li>\tTemplateName (teksta tipa lauks)</li><li>    GeographyGUID (GUID tipa lauks)</li><li>\tProjectGUID (GUID tipa lauks)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Tiks parādīta(-s) tabula(-s), kas atbilst tālāk norādītajiem nosacījumiem. <br/> <li>Tabulā jābūt šādām rediģēšanas iespējām: â€œIzveidotâ€, â€œDzēstâ€ un â€œAtjaunotâ€</li>    <li>Tabulā jābūt sešiem laukiem ar precīzu nosaukumu un datu tipu:</li><ul><li>\tDescription (teksta tipa lauks)</li><li>\tType (teksta tipa lauks)</li><li>\tValue (daļskaitļa/dubultās precizitātes daļskaitļa tipa lauks)</li><li>\tCostindex (vesela skaitļa tipa lauks)</li><li>   \tProjectGUID (GUID tipa lauks))</li></ul> </p>",
    "projectLayerHelp": "<p>Tiks parādīts(-i) laukumu slānis(-ņi), kas atbilst tālāk norādītajiem nosacījumiem <br/> <li>Slānim jābūt šādām rediģēšanas iespējām: â€œIzveidotâ€, â€œDzēstâ€ un â€œAtjaunotâ€</li>    <li>Slānī jābūt pieciem laukiem ar precīzu nosaukumu un datu tipu:</li><ul><li>ProjectName (teksta tipa lauks)</li><li>Description (teksta tipa lauks)</li><li>Totalassetcost (daļskaitļa/dubultās precizitātes daļskaitļa tipa lauks)</li><li>Grossprojectcost (daļskaitļa/dubultās precizitātes daļskaitļa tipa lauks)</li><li>GlobalID (GlobalID tipa lauks)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Slāņu iestatījumi",
    "layerNameHeaderTitle": "Slāņa nosaukums",
    "layerNameHeaderTooltip": "Kartes slāņu saraksts",
    "EditableLayerHeaderTitle": "Rediģējams",
    "EditableLayerHeaderTooltip": "Izmaksu logrīkā iekļaut slāni un tā sagataves",
    "SelectableLayerHeaderTitle": "Izvēlēti",
    "SelectableLayerHeaderTooltip": "Varat izmantot elementa ģeometriju, lai ģenerētu jaunu izmaksu vienību",
    "fieldPickerHeaderTitle": "Projekta ID (pēc izvēles)",
    "fieldPickerHeaderTooltip": "Pēc izvēles pievienojams lauks (teksta tips), kurā glabāt projekta ID",
    "selectLabel": "Izvēlēties",
    "noAssetLayersAvailable": "Izvēlētajā tīmekļa kartē nav atrasts vērtību slānis",
    "disableEditableCheckboxTooltip": "Šim slānim nav rediģēšanas iespēju",
    "missingCapabilitiesMsg": "Šim slānim trūkst šādu iespēju:",
    "missingGlobalIdMsg": "Šim slānim nav lauka GlobalId",
    "create": "Izveidot",
    "update": "Atjauninājums",
    "delete": "Izdzēst"
  },
  "costingInfo": {
    "tabTitle": "Izmaksu informācija",
    "proposedMainsLabel": "Ieteicamā sistēma",
    "addCostingTemplateLabel": "Pievienot izmaksu sagatavi",
    "manageScenariosTitle": "Pārvaldīt scenārijus",
    "featureTemplateTitle": "Elementu sagatave",
    "costEquationTitle": "Izmaksu vienādojums",
    "geographyTitle": "Ģeogrāfija",
    "scenarioTitle": "Scenārijs",
    "actionTitle": "Darbības",
    "scenarioNameLabel": "Scenārija nosaukums",
    "addBtnLabel": "Pievienot",
    "srNoLabel": "Nē.",
    "deleteLabel": "Izdzēst",
    "duplicateScenarioName": "Dublēt scenārija nosaukumu",
    "hintText": "<div>Uzvedne: izmantojiet tālāk norādītos atslēgas vārdus</div><ul><li><b>{TOTALCOUNT}</b>: izmanto vienāda tipa vērtības ģeogrāfijā</li><li><b>{MEASURE}</b>: izmanto garumu līnijas vērtībām un platību laukuma vērtībām</li><li><b>{TOTALMEASURE}</b>: izmanto kopējo garumu līniju vērtībām un platību laukuma vērtībām ģeogrāfijā </li></ul> Varat izmantot dažādas funkcijas, piemēram:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Labojiet izmaksu vienādojumu atbilstoši projekta vajadzībām.",
    "noneValue": "Neviens",
    "requiredCostEquation": "Nederīgs izmaksu vienādojums slānim ${layerName}: ${templateName}",
    "duplicateTemplateMessage": "Slānim ${layerName} eksistē sagataves dublikāts: ${templateName}",
    "defaultEquationRequired": "Slānim ${layerName} ir nepieciešams noklusējuma vienādojums: ${templateName}",
    "validCostEquationMessage": "Ievadiet derīgu izmaksu vienādojumu",
    "costEquationHelpText": "Labojiet izmaksu vienādojumu atbilstoši sava projekta vajadzībām",
    "scenarioHelpText": "Izvēlieties scenāriju atbilstoši sava projekta vajadzībām",
    "copyRowTitle": "Kopēt rindu",
    "noTemplateAvailable": "Pievienojiet vismaz vienu sagatavi slānim ${layerName}",
    "manageScenarioLabel": "Pārvaldīt scenāriju",
    "noLayerMessage": "Ievadiet vismaz vienu slāni cilnē ${tabName}",
    "noEditableLayersAvailable": "Slānis(-ņi) ir jāatzīmē kā rediģējami slāņu iestatījumu cilnē"
  },
  "statisticsSettings": {
    "tabTitle": "Statistikas iestatījumi",
    "addStatisticsLabel": "Pievienot statistiku",
    "fieldNameTitle": "Lauks",
    "statisticsTitle": "Virsraksts",
    "addNewStatisticsText": "Pievienot jaunu statistiku",
    "deleteStatisticsText": "Dzēst statistiku",
    "moveStatisticsUpText": "Pārvietot statistiku augšup",
    "moveStatisticsDownText": "Pārvietot statistiku lejup",
    "selectDeselectAllTitle": "Izvēlēties visas"
  },
  "statisticsType": {
    "countLabel": "Skaits",
    "averageLabel": "Vidējais",
    "maxLabel": "Maksimums",
    "minLabel": "Minimums",
    "summationLabel": "Summēšana",
    "areaLabel": "Platība",
    "lengthLabel": "Garums"
  }
});