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
  "configText": "Nastavi konfiguracijsko besedilo:",
  "generalSettings": {
    "tabTitle": "Splošne nastavitve",
    "measurementUnitLabel": "Merska enota",
    "currencyLabel": "Merski simbol",
    "roundCostLabel": "Okvirni stroški",
    "projectOutputSettings": "Nastavitve rezultatov projekta",
    "typeOfProjectAreaLabel": "Tip projektnega območja",
    "bufferDistanceLabel": "Razdalja obrisa",
    "roundCostValues": {
      "twoDecimalPoint": "Dve decimalni vejici",
      "nearestWholeNumber": "Najbližje celo število",
      "nearestTen": "Najbližja desetica",
      "nearestHundred": "Najbližja stotica",
      "nearestThousand": "Najbližje tisočice",
      "nearestTenThousands": "Najbližje desettisočice"
    },
    "projectAreaType": {
      "outline": "Obroba",
      "buffer": "Obris"
    },
    "errorMessages": {
      "currency": "Neveljavna denarna enota",
      "bufferDistance": "Neveljavna razdalja obrisa",
      "outOfRangebufferDistance": "Vrednost mora biti večja od 0 in manjša ali enaka 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Nastavitve projekta",
    "costingGeometrySectionTitle": "Določi lokacijo za vrednotenje (izbirno)",
    "costingGeometrySectionNote": "Opomba: Konfiguriranje tega sloja bo uporabniku na podlagi lokacije omogočilo nastavitev stroškovnih enačb geoobjektnih predlog.",
    "projectTableSectionTitle": "Možnost shranjevanja/nalaganja nastavitev projekta (izbirno)",
    "projectTableSectionNote": "Opomba: Konfiguriranje vseh tabel in slojev bo uporabniku omogočilo shranjevanje/nalaganje projekta za poznejšo uporabo.",
    "costingGeometryLayerLabel": "Stroškovni geometrijski sloj",
    "fieldLabelGeography": "Polje za izdelovanje napisa lokacije",
    "projectAssetsTableLabel": "Tabela projektnih sredstev",
    "projectMultiplierTableLabel": "Tabela množitelja dodatnih stroškov projekta",
    "projectLayerLabel": "Projektni sloj",
    "configureFieldsLabel": "Konfiguriraj polja",
    "fieldDescriptionHeaderTitle": "Opis polja",
    "layerFieldsHeaderTitle": "Polje sloja",
    "selectLabel": "Izberi",
    "errorMessages": {
      "duplicateLayerSelection": "Ime sloja ${layerName} je že bilo izbrano",
      "invalidConfiguration": "Izberite ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Prikazani bodo poligonski sloji z naslednjimi pogoji: <br/> <li>Sloj mora imeti zmožnost poizvedbe</li><li>Sloj mora imeti polje GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Besedilna in številska polja izbranega stroškovnega geometrijskega sloja bodo prikazana v spustnem meniju Polje za izdelovanje napisa lokacije.</p>",
    "projectAssetsTableHelp": "<p>Prikazane bodo tabele z naslednjimi pogoji: <br/> <li>Tabele morajo imeti zmožnost urejanja, in sicer Ustvari, Izbriši in Posodobi.</li>    <li>Tabela mora imeti šest polj s točnimi imeni in tipi podatkov:</li><ul><li> AssetGUID (tip polja GUID)</li><li> CostEquation (tip polja z besedilom)</li><li> Scenarij (tip polja z besedilom)</li><li> TemplateName (tip polja z besedilom)</li><li>    GeographyGUID (tip polja GUID)</li><li> ProjectGUID (tip polja GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Prikazane bodo tabele z naslednjimi pogoji: <br/> <li>Tabele morajo imeti možnost urejanja, in sicer Uredi, Izbriši, Posodobi.</li>    <li>Tabela mora imeti pet polj s točnimi imeni in tipi podatkov:</li><ul><li>\tOpis (tip polja z besedilom)</li><li>\tTip (tip polja z besedilom)</li><li>\tVrednost (tip polja decimalno enojno/dvojno)</li><li>\tStroškovni indeks (tip polja celo število)</li><li>   \tProjectGUID (tip polja GUID))</li></ul> </p>",
    "projectLayerHelp": "<p>Prikazani bodo poligonski sloji z naslednjimi pogoji: <br/> <li>Sloj mora imeti zmožnosti urejanja, in sicer Ustvari, Izbriši in Posodobi.</li>    <li>Sloji morajo imeti pet polj s točnimi imeni in tipi podatkov:</li><ul><li>ProjectName (tip polja z besedilom)</li><li>Opis (tip polja z besedilom)</li><li>Totalassetcost (tip polja decimalno enojno/dvojno)</li><li>Grossprojectcost (tip polja enojno/dvojno)</li><li>GlobalID (tip polja GlobalID)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Nastavitve sloja",
    "layerNameHeaderTitle": "Ime sloja",
    "layerNameHeaderTooltip": "Seznam slojev na karti",
    "EditableLayerHeaderTitle": "Uredljiv",
    "EditableLayerHeaderTooltip": "Vključite sloj in njegove predloge v stroškovnem pripomočku",
    "SelectableLayerHeaderTitle": "Izberljiv",
    "SelectableLayerHeaderTooltip": "Geometrijo iz geoobjekta je mogoče uporabiti za ustvarjanje novega stroškovnega elementa",
    "fieldPickerHeaderTitle": "ID projekta (izbirno)",
    "fieldPickerHeaderTooltip": "Izbirno polje (tipa besedila) za shranjevanje ID projekta v",
    "selectLabel": "Izberi",
    "noAssetLayersAvailable": "Na izbrani spletni karti ni najdenega sloja sredstev",
    "disableEditableCheckboxTooltip": "Ta sloj nima zmožnosti urejanja",
    "missingCapabilitiesMsg": "Ta sloj nima naslednjih zmožnosti:",
    "missingGlobalIdMsg": "Ta sloj nima polja GlobalId",
    "create": "Ustvari",
    "update": "Posodobi",
    "delete": "Izbriši"
  },
  "costingInfo": {
    "tabTitle": "Stroškovne informacije",
    "proposedMainsLabel": "Predlagani glavni",
    "addCostingTemplateLabel": "Dodajte stroškovno predlogo",
    "manageScenariosTitle": "Upravljaj scenarije",
    "featureTemplateTitle": "Predloga geoobjekta",
    "costEquationTitle": "Stroškovna enačba",
    "geographyTitle": "Lokacija",
    "scenarioTitle": "Scenarij",
    "actionTitle": "Dejanja",
    "scenarioNameLabel": "Ime scenarija",
    "addBtnLabel": "Dodaj",
    "srNoLabel": "Št.",
    "deleteLabel": "Izbriši",
    "duplicateScenarioName": "Podvoji ime scenarija",
    "hintText": "<div>Namig: Uporabite naslednje ključne besede</div><ul><li><b>{TOTALCOUNT}</b>: Uporabi skupno število sredstev istega tipa na lokaciji</li> <li><b>{MEASURE}</b>: Uporabi dolžino za linijska sredstva in površino za poligonska sredstva</li><li><b>{TOTALMEASURE}</b>: Uporabi skupno dolžino za linijska sredstva in skupno površino za poligonska sredstva istega tipa na lokaciji</li></ul>Uporabite lahko funkcije, kot so:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Uredite stroškovno enačbo glede na potrebe vašega projekta.",
    "noneValue": "Brez",
    "requiredCostEquation": "Neveljavna stroškovna enačba za ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Za ${layerName} : ${templateName} obstaja podvojena predloga",
    "defaultEquationRequired": "Za ${layerName} : ${templateName} je zahtevana privzeta enačba",
    "validCostEquationMessage": "Vnesite veljavno stroškovno enačbo",
    "costEquationHelpText": "Uredite stroškovno enačbo glede na potrebe vašega projekta",
    "scenarioHelpText": "Izberite scenarij glede na potrebe vašega projekta",
    "copyRowTitle": "Kopiraj vrstico",
    "noTemplateAvailable": "Dodajte vsaj eno predlogo za ${layerName}",
    "manageScenarioLabel": "Upravljaj scenarij",
    "noLayerMessage": "Vnesite vsaj en sloj v ${tabName}",
    "noEditableLayersAvailable": "Sloji morajo biti označeni kot uredljivi v zavihku nastavitev sloja"
  },
  "statisticsSettings": {
    "tabTitle": "Nastavitve statistike",
    "addStatisticsLabel": "Dodaj statistiko",
    "fieldNameTitle": "Polje",
    "statisticsTitle": "Napis",
    "addNewStatisticsText": "Dodaj novo statistiko",
    "deleteStatisticsText": "Izbriši statistiko",
    "moveStatisticsUpText": "Premakni statistiko navzgor",
    "moveStatisticsDownText": "Premakni statistiko navzdol",
    "selectDeselectAllTitle": "Izberi vse"
  },
  "statisticsType": {
    "countLabel": "Štetje",
    "averageLabel": "Povprečje",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Vsota",
    "areaLabel": "Površina",
    "lengthLabel": "Dolžina"
  }
});