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
  "_widgetLabel": "Analýza nákladů Beta",
  "unableToFetchInfoErrMessage": "Nelze získat podrobnosti o geometrické službě / nakonfigurované vrstvě",
  "invalidCostingGeometryLayer": "Nelze získat 'esriFieldTypeGlobalID' v geometrické vrstvě výpočtu nákladů.",
  "projectLayerNotFound": "V mapě nelze nalézt nakonfigurovanou vrstvu projektu.",
  "costingGeometryLayerNotFound": "V mapě nelze nalézt nakonfigurovanou geometrickou vrstvu výpočtu nákladů.",
  "projectMultiplierTableNotFound": "V mapě nelze nalézt nakonfigurovanou multiplikační tabulku dodatečných nákladů projektu.",
  "projectAssetTableNotFound": "V mapě nelze nalézt nakonfigurovanou tabulku prostředků projektu.",
  "createLoadProject": {
    "createProjectPaneTitle": "Vytvořit projekt",
    "loadProjectPaneTitle": "Načíst projekt",
    "projectNamePlaceHolder": "Název projektu",
    "projectDescPlaceHolder": "Popis projektu",
    "selectProject": "Vybrat projekt",
    "viewInMapLabel": "Zobrazit na mapě",
    "loadLabel": "Načíst",
    "createLabel": "Vytvořit",
    "deleteProjectConfirmationMsg": "Určitě chcete tento projekt odstranit?",
    "noAssetsToViewOnMap": "U vybraného projektu nejsou žádné prostředky pro zobrazení na mapě.",
    "projectDeletedMsg": "Projekt byl úspěšně odstraněn.",
    "errorInCreatingProject": "Při vytváření projektu došlo k chybě.",
    "errorProjectNotFound": "Projekt nenalezen.",
    "errorInLoadingProject": "Zkontrolujte prosím, zda je vybrán platný projekt.",
    "errorProjectNotSelected": "Vyberte projekt z rozbalovacího seznamu",
    "errorDuplicateProjectName": "Název projektu již existuje."
  },
  "statisticsSettings": {
    "tabTitle": "Nastavení statistik",
    "addStatisticsLabel": "Přidat statistiky",
    "addNewStatisticsText": "Přidat nové statistiky",
    "deleteStatisticsText": "Smazat statistiky",
    "moveStatisticsUpText": "Přesunout statistiky nahoru",
    "moveStatisticsDownText": "Přesunout statistiky dolů",
    "layerNameTitle": "Vrstva",
    "statisticsTypeTitle": "Typ",
    "fieldNameTitle": "Pole",
    "statisticsTitle": "Popisek",
    "actionLabelTitle": "Akce",
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
  },
  "costingInfo": {
    "noEditableLayersAvailable": "U vrstev je nutné v kartě nastavení vrstvy zaškrtnout možnost úprav"
  },
  "workBench": {
    "refresh": "Obnovit",
    "noAssetAddedMsg": "Nebyly přidány žádné prostředky",
    "units": "jednotky",
    "assetDetailsTitle": "Podrobnosti položky prostředku",
    "costEquationTitle": "Nákladová rovnice",
    "newCostEquationTitle": "Nová rovnice",
    "defaultCostEquationTitle": "Výchozí rovnice",
    "geographyTitle": "Geografie",
    "scenarioTitle": "Scénář",
    "costingInfoHintText": "<div>Nápověda: Použijte následující klíčová slova</div><ul><li><b>{TOTALCOUNT}</b>: Použije celkový počet stejného typu prostředků v geografii</li><li><b>{MEASURE}</b>: Pro liniový prostředek použije délku a pro polygonový prostředek plochu</li><li><b>{TOTALMEASURE}</b>: Pro liniový prostředek použije celkovou délku a pro polygonový prostředek stejného typu v geografii použije celkovou plochu</li></ul>Můžete použít funkce jako:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Upravte prosím nákladovou rovnici podle potřeb vašeho projektu.",
    "zoomToAsset": "Přiblížit na prostředek",
    "deleteAsset": "Smazat prostředek",
    "closeDialog": "Zavřít dialogové okno",
    "objectIdColTitle": "ID objektu",
    "costColTitle": "Náklady",
    "errorInvalidCostEquation": "Neplatná nákladová rovnice.",
    "errorInSavingAssetDetails": "Podrobnosti prostředku nelze uložit."
  },
  "assetDetails": {
    "inGeography": " v geografii ${geography} ",
    "withScenario": " se scénářem ${scenario}",
    "totalCostTitle": "Celková cena",
    "additionalCostLabel": "Popis",
    "additionalCostValue": "Hodnota",
    "additionalCostNetValue": "Čistá hodnota"
  },
  "projectOverview": {
    "assetItemsTitle": "Položky prostředků",
    "assetStatisticsTitle": "Statistika prostředků",
    "projectSummaryTitle": "Shrnutí projektu",
    "projectName": "Název projektu: ${name}",
    "totalCostLabel": "Celkové náklady projektu (*):",
    "grossCostLabel": "Hrubé náklady projektu (*):",
    "roundingLabel": "* Zaokrouhlení na '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Hranice projektu se nepodařilo do vrstvy projektu uložit.",
    "unableToSaveProjectCost": "Náklady se nepodařilo do vrstvy projektu uložit.",
    "roundCostValues": {
      "twoDecimalPoint": "Dvě desetinná místa",
      "nearestWholeNumber": "Nejbližší celé číslo",
      "nearestTen": "Nejbližší desítka",
      "nearestHundred": "Nejbližší stovka",
      "nearestThousand": "Nejbližší tisíc",
      "nearestTenThousands": "Nejbližší desetitisíc"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Atribut projektu",
    "projectAttributeTitle": "Upravit atributy projektu"
  },
  "costEscalation": {
    "costEscalationLabel": "Přidat dodatečný náklad",
    "valueHeader": "Hodnota",
    "addCostEscalationText": "Přidat dodatečný náklad",
    "deleteCostEscalationText": "Smazat vybraný dodatečný náklad",
    "moveCostEscalationUpText": "Posunout vybraný dodatečný náklad nahoru",
    "moveCostEscalationDownText": "Posunout vybraný dodatečný náklad dolů",
    "invalidEntry": "Jeden nebo více záznamů je neplatných.",
    "errorInSavingCostEscalation": "Podrobnosti o dodatečném nákladu nelze uložit."
  },
  "scenarioSelection": {
    "popupTitle": "Pro prostředek vyberte scénář",
    "regionLabel": "Geografie",
    "scenarioLabel": "Scénář",
    "noneText": "Žádná",
    "copyFeatureMsg": "Chcete zkopírovat vybrané prvky?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Podrobná statistika",
    "noDetailStatisticAvailable": "Statistika prostředků nebyla přidána"
  }
});