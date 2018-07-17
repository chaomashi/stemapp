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
  "configText": "Nustatyti konfigūravimo tekstą:",
  "generalSettings": {
    "tabTitle": "Bendrieji parametrai",
    "measurementUnitLabel": "Matavimo vienetai",
    "currencyLabel": "Matavimo simbolis",
    "roundCostLabel": "Apvalinti išlaidas",
    "projectOutputSettings": "Projekto išvesties parametrai",
    "typeOfProjectAreaLabel": "Projekto teritorijos tipas",
    "bufferDistanceLabel": "Buferio atstumas",
    "roundCostValues": {
      "twoDecimalPoint": "Du skaitmenys po kablelio",
      "nearestWholeNumber": "Artimiausias sveikasis skaičius",
      "nearestTen": "Artimiausia dešimtis",
      "nearestHundred": "Artimiausias šimtas",
      "nearestThousand": "Artimiausias tūkstantis",
      "nearestTenThousands": "Artimiausia dešimtis tūkstančių"
    },
    "projectAreaType": {
      "outline": "Kontūras",
      "buffer": "Buferis"
    },
    "errorMessages": {
      "currency": "Netinkamas valiutos vienetas",
      "bufferDistance": "Netinkamas buferio atstumas",
      "outOfRangebufferDistance": "Reikšmė turi būti didesnė nei 0 ir mažesnė nei 100 arba lygi"
    }
  },
  "projectSettings": {
    "tabTitle": "Projekto parametrai",
    "costingGeometrySectionTitle": "Apibrėžti išlaidų geografiją (pasirinktinai)",
    "costingGeometrySectionNote": "Pastaba: sukonfigūravus šį sluoksnį, vartotojas galės nustatyti elementų šablonų išlaidų lygtis pagal geografinius duomenis.",
    "projectTableSectionTitle": "Galimybė įrašyti / įkelti projekto parametrus (pasirinktinai)",
    "projectTableSectionNote": "Pastaba: sukonfigūravus visas lenteles ir sluoksnius, vartotojai galės įrašyti  / įkelti projektą, kad galėtų naudoti vėliau.",
    "costingGeometryLayerLabel": "Išlaidų geometrijos sluoksnis",
    "fieldLabelGeography": "Laukas į žymių geografinius duomenis",
    "projectAssetsTableLabel": "Projekto išteklių lentelė",
    "projectMultiplierTableLabel": "Projekto daugiklio papildomų išlaidų lentelė",
    "projectLayerLabel": "Projekto sluoksnis",
    "configureFieldsLabel": "Konfigūruoti laukus",
    "fieldDescriptionHeaderTitle": "Lauko aprašas",
    "layerFieldsHeaderTitle": "Sluoksnio laukas",
    "selectLabel": "Pasirinkti",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} jau pažymėtas",
      "invalidConfiguration": "Pasirinkite ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Bus rodomas (-i) poligono sluoksnis (-iai) su šiomis sąlygomis: <br/> <li>\tSluoksnis privalo turėti â€œUžklausosâ€ galimybę</li><li>\tSluoksnis privalo turėti GlobalID lauką</li></p>",
    "fieldToLabelGeographyHelp": "<p>Pažymėto â€œIšlaidų geometrijos sluoksnioâ€ eilutė ir skaitiniai laukai bus rodomi iškrentančiame meniu â€œLaukas į žymių geografinius duomenisâ€.</p>",
    "projectAssetsTableHelp": "<p>Bus rodoma (-os) lentelė (-ės) su šiomis sąlygomis: <br/> <li>Lentelėje turi būti redagavimo galimybės, tai yra â€œKurtiâ€, â€œNaikintiâ€ ir â€œAtnaujintiâ€</li>    <li>Lentelėje turi būti šeši laukai su tiksliu pavadinimo ir duomenų tipu:</li><ul><li>\tAssetGUID (GUID lauko tipas)</li><li>\tCostEquation (tekstinis lauko tipas)</li><li>\tScenario (tekstinis lauko tipas)</li><li>\tTemplateName (tekstinis lauko tipas)</li><li>    GeographyGUID (GUID lauko tipas)</li><li>\tProjectGUID (GUID lauko tipas)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Bus rodoma (-os) lentelė (-ės) su šiomis sąlygomis: <br/> <li>Lentelėje turi būti redagavimo galimybės, tai yra â€œKurtiâ€, â€œNaikintiâ€ ir â€œAtnaujintiâ€</li>    <li>Lentelėje turi būti penki laukai su tiksliu pavadinimo ir duomenų tipu:</li><ul><li>\tDescription (tekstinis lauko tipas)</li><li>\tType (tekstinis lauko tipas)</li><li>\tValue (kintamo / dvigubo tikslumo lauko tipas)</li><li>\tCostindex (sveikojo skaičiaus lauko tipas)</li><li>   \tProjectGUID (GUID lauko tipas))</li></ul> </p>",
    "projectLayerHelp": "<p>Bus rodomas (-i) poligono sluoksnis (-iai) su šiomis sąlygomis: <br/> <li>Sluoksnyje turi būti redagavimo galimybės, tai yra â€œKurtiâ€, â€œNaikintiâ€ ir â€œAtnaujintiâ€</li>    <li>Sluoknyje turi būti penki laukai su tiksliu pavadinimo ir duomenų tipu:</li><ul><li>ProjectName (tekstinis lauko tipas)</li><li>Description (tekstinis lauko tipas)</li><li>Totalassetcost (kintamo / dvigubo tikslumo lauko tipas)</li><li>Grossprojectcost (kintamo / dvigubo tikslumo lauko tipas)</li><li>GlobalID (GlobalID lauko tipas)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Sluoksnio parametrai",
    "layerNameHeaderTitle": "Sluoksnio pavadinimas",
    "layerNameHeaderTooltip": "Sluoksnių sąrašas žemėlapyje",
    "EditableLayerHeaderTitle": "Redaguojama",
    "EditableLayerHeaderTooltip": "Įtraukti sluoksnį ir jo šablonus į išlaidų valdiklį",
    "SelectableLayerHeaderTitle": "Pažymimas",
    "SelectableLayerHeaderTooltip": "Geometriją iš elemento galima naudoti generuojant naują išlaidų elementą",
    "fieldPickerHeaderTitle": "Projekto ID (pasirinktinis)",
    "fieldPickerHeaderTooltip": "Pasirinktinis laukas (tekstinio tipo) projekto ID saugoti",
    "selectLabel": "Pasirinkti",
    "noAssetLayersAvailable": "Pasirinktame internetiniame žemėlapyje išteklių sluoksnis nerastas",
    "disableEditableCheckboxTooltip": "Šiame sluoksnyje nėra redagavimo galimybių",
    "missingCapabilitiesMsg": "Šiam sluoksniui trūksta šių galimybių:",
    "missingGlobalIdMsg": "Šis sluoksnis neturi lauko GlobalId",
    "create": "Kurti",
    "update": "Atnaujinti",
    "delete": "Ištrinti"
  },
  "costingInfo": {
    "tabTitle": "Išlaidų informacija",
    "proposedMainsLabel": "Siūlomos trasos",
    "addCostingTemplateLabel": "Įtraukti išlaidų šabloną",
    "manageScenariosTitle": "Tvarkyti scenarijus",
    "featureTemplateTitle": "Elementų šablonas",
    "costEquationTitle": "Išlaidų lygtis",
    "geographyTitle": "Geografiniai duomenys",
    "scenarioTitle": "Scenarijus",
    "actionTitle": "Veiksmai",
    "scenarioNameLabel": "Scenarijaus pavadinimas",
    "addBtnLabel": "Pridėti",
    "srNoLabel": "Nr.",
    "deleteLabel": "Ištrinti",
    "duplicateScenarioName": "Pasikartojantis scenarijaus pavadinimas",
    "hintText": "<div>Pastaba: naudokite šiuos raktažodžius</div><ul><li><b>{TOTALCOUNT}</b>: naudoja bendrą to paties tipo išteklių kiekį regione</li><li><b>{MEASURE}</b>: naudoja linijos ištekliaus ilgį ir poligonų ištekliaus teritoriją</li><li><b>{TOTALMEASURE}</b>: naudoja bendrą linijos ištekliaus ilgį ir bendrą poligono to paties tipo ištekliaus teritoriją geografiniame regione </li></ul>Galite naudoti funkcijas, pvz.:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Redaguokite išlaidų lygtį pagal savo projekto poreikius.",
    "noneValue": "Nėra",
    "requiredCostEquation": "Neleistina išlaidų lygtis, skirta ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Pasikartojantis šablono įrašas, skirtas ${layerName} : ${templateName}",
    "defaultEquationRequired": "Numatytosios lygties reikia sluoksniui ${layerName} : ${templateName}",
    "validCostEquationMessage": "Įveskite tinkamą išlaidų lygtį",
    "costEquationHelpText": "Redaguokite išlaidų lygtį pagal projekto poreikius",
    "scenarioHelpText": "Pasirinkite scenarijų pagal projekto poreikius",
    "copyRowTitle": "Kopijuoti eilutę",
    "noTemplateAvailable": "Įtraukite bent vieną šabloną sluoksniui ${layerName}",
    "manageScenarioLabel": "Tvarkyti scenarijų",
    "noLayerMessage": "${tabName} įveskite bent vieną sluoksnį",
    "noEditableLayersAvailable": "Sluoksnis (-iai), kurį (-iuos) reikia patikrinti kaip redaguotiną (-us) sluoksnio parametrų skirtuke"
  },
  "statisticsSettings": {
    "tabTitle": "Statistikos parametrai",
    "addStatisticsLabel": "Pridėti statistinius rodiklius",
    "fieldNameTitle": "Darbui lauke",
    "statisticsTitle": "Užrašas",
    "addNewStatisticsText": "Pridėti naują statistinį rodiklį",
    "deleteStatisticsText": "Naikinti statistinius rodiklius",
    "moveStatisticsUpText": "Perkelti statistinius rodiklius aukštyn",
    "moveStatisticsDownText": "Perkelti statistinius rodiklius žemyn",
    "selectDeselectAllTitle": "Žymėti viską"
  },
  "statisticsType": {
    "countLabel": "Skaičius",
    "averageLabel": "Vidurkis",
    "maxLabel": "Maksimumas",
    "minLabel": "Minimumas",
    "summationLabel": "Suma",
    "areaLabel": "Plotas",
    "lengthLabel": "Ilgis"
  }
});