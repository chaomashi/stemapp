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
  "configText": "Změnit text konfigurace:",
  "generalSettings": {
    "tabTitle": "Obecná nastavení",
    "measurementUnitLabel": "Jednotky měření",
    "currencyLabel": "Symbol měření",
    "roundCostLabel": "Zaokrouhlit náklady",
    "projectOutputSettings": "Nastavení výstupu projektu",
    "typeOfProjectAreaLabel": "Typ oblasti projektu",
    "bufferDistanceLabel": "Velikost obalové zóny",
    "roundCostValues": {
      "twoDecimalPoint": "Dvě desetinná místa",
      "nearestWholeNumber": "Nejbližší celé číslo",
      "nearestTen": "Nejbližší desítka",
      "nearestHundred": "Nejbližší stovka",
      "nearestThousand": "Nejbližší tisíc",
      "nearestTenThousands": "Nejbližší desetitisíc"
    },
    "projectAreaType": {
      "outline": "Obrys",
      "buffer": "Obalová zóna"
    },
    "errorMessages": {
      "currency": "Neplatná jednotka měny",
      "bufferDistance": "Neplatná šířka obalové zóny",
      "outOfRangebufferDistance": "Hodnota by měla být větší než 0 a menší nebo rovná 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Nastavení projektu",
    "costingGeometrySectionTitle": "Definujte geografii pro výpočet nákladů (volitelné)",
    "costingGeometrySectionNote": "Poznámka: Konfigurace této vrstvy umožní uživateli nastavit nákladové rovnice šablon prvků na základě geografií.",
    "projectTableSectionTitle": "Možnost ukládat a načítat nastavení projektu (volitelné)",
    "projectTableSectionNote": "Poznámka: Nakonfigurování všech tabulek a vrstev umožní uživateli uložit nebo načíst projekt pro další použití.",
    "costingGeometryLayerLabel": "Geometrická vrstva výpočtu nákladů",
    "fieldLabelGeography": "Pole pro označení geografie",
    "projectAssetsTableLabel": "Tabulka prostředků projektu",
    "projectMultiplierTableLabel": "Multiplikační tabulka dodatečných nákladů projektu",
    "projectLayerLabel": "Vrstva projektu",
    "configureFieldsLabel": "Konfigurovat pole",
    "fieldDescriptionHeaderTitle": "Pole popisu kódů",
    "layerFieldsHeaderTitle": "Pole vrstvy",
    "selectLabel": "Výběr",
    "errorMessages": {
      "duplicateLayerSelection": "Vrstva ${layerName} je již vybrána",
      "invalidConfiguration": "Prosím vyberte ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Budou zobrazeny polygonové vrstvy splňující následující podmínky: <br/> <li>\tVrstva musí mít možnost dotazování</li><li>\tVrstva musí mít pole GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Řetězcová a numerická pole vybrané vrstvy výpočtu nákladů budou zobrazena v rozbalovacím seznamu Pole pro označení geografie.</p>",
    "projectAssetsTableHelp": "<p>Budou zobrazeny tabulky splňující následující podmínky: <br/> <li>Tabulka musí mít možnost úprav, zejména vytvořit, smazat a aktualizovat</li>    <li>Tabulka musí mít šest polí s přesným názvem a typem dat:</li><ul><li>\tAssetGUID (pole typu GUID)</li><li>\tCostEquation (řetězcové pole)</li><li>\tScenario (řetězcové pole)</li><li>\tTemplateName (řetězcové pole)</li><li>    GeographyGUID (pole typu GUID)</li><li>\tProjectGUID (pole typu GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Budou zobrazeny tabulky splňující následující podmínky: <br/> <li>Tabulka musí mít možnost úprav, zejména vytvořit, smazat a aktualizovat</li>    <li>Tabulka musí mít pět polí s přesným názvem a typem dat:</li><ul><li>\tDescription (řetězcové pole)</li><li>\tType (řetězcové pole)</li><li>\tValue (pole typu desetinné číslo s jednoduchou/dvojitou přesností)</li><li>\tCostindex (celočíselné pole)</li><li>   \tProjectGUID (pole typu GUID)</li></ul> </p>",
    "projectLayerHelp": "<p>Budou zobrazeny polygonové vrstvy splňující následující podmínky: <br/> <li>Vrstva musí mít možnost úprav, zejména vytvořit, smazat a aktualizovat</li>    <li>Vrstva musí mít pět polí s přesným názvem a typem dat:</li><ul><li>ProjectName (řetězcové pole)</li><li>Description (řetězcové pole)</li><li>Totalassetcost (pole typu desetinné číslo s jednoduchou/dvojitou přesností)</li><li>Grossprojectcost (pole typu desetinné číslo s jednoduchou/dvojitou přesností)</li><li>GlobalID (pole typu GlobalID)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Nastavení vrstvy",
    "layerNameHeaderTitle": "Název vrstvy",
    "layerNameHeaderTooltip": "Seznam vrstev v mapě",
    "EditableLayerHeaderTitle": "Editovatelné",
    "EditableLayerHeaderTooltip": "Zahrnout vrstvu a její šablonu do widgetu pro výpočet nákladů",
    "SelectableLayerHeaderTitle": "Vybratelné",
    "SelectableLayerHeaderTooltip": "Geometrii z prvku je možné použít pro vygenerování nové položky nákladů",
    "fieldPickerHeaderTitle": "ID projektu (volitelné)",
    "fieldPickerHeaderTooltip": "Volitelné pole (řetězcového typu) pro uložení ID projektu",
    "selectLabel": "Výběr",
    "noAssetLayersAvailable": "Ve vybrané webové mapě nebyla nalezena žádná vrstva prostředků",
    "disableEditableCheckboxTooltip": "Tato vrstva nemá žádné možnosti úprav",
    "missingCapabilitiesMsg": "V této vrstvě chybí následující vlastnosti:",
    "missingGlobalIdMsg": "V této vrstvě chybí pole GlobalId",
    "create": "Vytvořit",
    "update": "Aktualizovat (Update)",
    "delete": "Smazat"
  },
  "costingInfo": {
    "tabTitle": "Informace o výpočtu nákladů",
    "proposedMainsLabel": "Navrhované přípojky",
    "addCostingTemplateLabel": "Přidat šablonu výpočtu nákladů",
    "manageScenariosTitle": "Spravovat scénáře",
    "featureTemplateTitle": "Budoucí šablona",
    "costEquationTitle": "Nákladová rovnice",
    "geographyTitle": "Geografie",
    "scenarioTitle": "Scénář",
    "actionTitle": "Akce",
    "scenarioNameLabel": "Název scénáře",
    "addBtnLabel": "Přidat",
    "srNoLabel": "Ne.",
    "deleteLabel": "Smazat",
    "duplicateScenarioName": "Duplicitní název scénáře",
    "hintText": "<div>Nápověda: Použijte následující klíčová slova</div><ul><li><b>{TOTALCOUNT}</b>: Použije celkový počet stejného typu prostředků v geografii</li><li><b>{MEASURE}</b>: Pro liniový prostředek použije délku a pro polygonový prostředek plochu</li><li><b>{TOTALMEASURE}</b>: Pro liniový prostředek použije celkovou délku a pro polygonový prostředek stejného typu v geografii použije celkovou plochu</li></ul>Můžete použít funkce jako:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Upravte prosím nákladovou rovnici podle potřeb vašeho projektu.",
    "noneValue": "Žádná",
    "requiredCostEquation": "Neplatná nákladová rovnice pro ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Pro ${layerName} : ${templateName} existuje duplicitní záznam v šabloně",
    "defaultEquationRequired": "Pro ${layerName} : ${templateName} je potřeba výchozí rovnice",
    "validCostEquationMessage": "Zadejte prosím platnou nákladovou rovnici",
    "costEquationHelpText": "Upravte prosím nákladovou rovnici podle potřeb vašeho projektu",
    "scenarioHelpText": "Vyberte prosím scénář podle potřeb vašeho projektu",
    "copyRowTitle": "Kopírovat řádky",
    "noTemplateAvailable": "Přidejte prosím alespoň jednu šablonu pro ${layerName}",
    "manageScenarioLabel": "Spravovat scénář",
    "noLayerMessage": "Zadejte prosím alespoň jednu vrstvu do ${tabName}",
    "noEditableLayersAvailable": "U vrstev je nutné v kartě nastavení vrstvy zaškrtnout možnost úprav"
  },
  "statisticsSettings": {
    "tabTitle": "Nastavení statistik",
    "addStatisticsLabel": "Přidat statistiky",
    "fieldNameTitle": "Pole",
    "statisticsTitle": "Popisek",
    "addNewStatisticsText": "Přidat nové statistiky",
    "deleteStatisticsText": "Smazat statistiky",
    "moveStatisticsUpText": "Přesunout statistiky nahoru",
    "moveStatisticsDownText": "Přesunout statistiky dolů",
    "selectDeselectAllTitle": "Vybrat vše"
  },
  "statisticsType": {
    "countLabel": "Počet",
    "averageLabel": "Průměr",
    "maxLabel": "Maximum",
    "minLabel": "Minimum",
    "summationLabel": "Součet",
    "areaLabel": "Plocha",
    "lengthLabel": "Délka"
  }
});