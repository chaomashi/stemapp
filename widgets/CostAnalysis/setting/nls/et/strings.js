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
  "configText": "Seadista konfig tekst:",
  "generalSettings": {
    "tabTitle": "Üldseaded",
    "measurementUnitLabel": "Mõõtühik",
    "currencyLabel": "Mõõtühiku sümbol",
    "roundCostLabel": "Ümarda kulu",
    "projectOutputSettings": "Projekti väljundi seaded",
    "typeOfProjectAreaLabel": "Projekti ala tüüp",
    "bufferDistanceLabel": "Puhvri ulatus",
    "roundCostValues": {
      "twoDecimalPoint": "Kaks komakohta",
      "nearestWholeNumber": "Lähim täisarv",
      "nearestTen": "Lähim kümme",
      "nearestHundred": "Lähim sada",
      "nearestThousand": "Lähim tuhat",
      "nearestTenThousands": "Lähim kümme tuhat"
    },
    "projectAreaType": {
      "outline": "Äärejoon",
      "buffer": "Puhver"
    },
    "errorMessages": {
      "currency": "Sobimatu valuuta ühik",
      "bufferDistance": "Sobimatu puhvri ulatus",
      "outOfRangebufferDistance": "Väärtus peab olema suurem kui 0 ja väiksem kui või võrdne 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Projekti seaded",
    "costingGeometrySectionTitle": "Määratle kuluarvutuse geograafia (valikuline)",
    "costingGeometrySectionNote": "Märkus: selle kihi konfigureerimine võimaldab kasutajal seadistada objekti mallidele geograafiate alusel kuluvõrrandeid.",
    "projectTableSectionTitle": "Projekti seadete salvestamise laadimise võimekus (valikuline)",
    "projectTableSectionNote": "Märkus: kõikide tabelite ja kihtide konfigureerimine võimaldab kasutajal projekti edasiseks kasutamiseks salvestada/laadida.",
    "costingGeometryLayerLabel": "Kuluarvutuse geomeetria kiht",
    "fieldLabelGeography": "Sildi geograafia väli",
    "projectAssetsTableLabel": "Projekti varade tabel",
    "projectMultiplierTableLabel": "Projekti kordaja täiendava kulu tabel",
    "projectLayerLabel": "Projekti kiht",
    "configureFieldsLabel": "Konfigureeri väljad",
    "fieldDescriptionHeaderTitle": "Välja kirjeldus",
    "layerFieldsHeaderTitle": "Kihi väli",
    "selectLabel": "Vali",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} on juba valitud",
      "invalidConfiguration": "Valige ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Kuvatakse järgmiste tingimustega polügooni kiht(kihid): <br/> <li>\tKihil peab olema â€œQueryâ€ võimekus</li><li>\tKihil peab olema GlobalID väli</li></p>",
    "fieldToLabelGeographyHelp": "<p>Valitud â€œkuluarvutuse geomeetria kihiâ€ stringi ja numbrilised väljad kuvatakse ripploendis â€œSildi geograafia väliâ€.</p>",
    "projectAssetsTableHelp": "<p>Kuvatakse järgmiste tingimustega tabel(id): <br/> <li>Tabelil peavad olema redigeerimisvõimekused, nimelt funktsioonid â€œLooâ€, â€œKustutaâ€ ja â€œVärskendaâ€</li>    <li>Tabelil peab olema kuus täpselt järgmise nime- ja andmetüübiga välja:</li><ul><li>\tAssetGUID (GUID-tüüpi väli)</li><li>\tCostEquation (string-tüüpi väli)</li><li>\tScenario (string-tüüpi väli)</li><li>\tTemplateName (string-tüüpi väli)</li><li>    GeographyGUID (GUID-tüüpi väli)</li><li>\tProjectGUID (GUID-tüüpi väli)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Kuvatakse järgmiste tingimustega tabel(id): <br/> <li>Tabelil peavad olema redigeerimisvõimekused, nimelt funktsioonid â€œLooâ€, â€œKustutaâ€ ja â€œVärskendaâ€</li>    <li>Tabelil peab olema viis täpselt järgmise nime- ja andmetüübiga välja:</li><ul><li>\tDescription (string-tüüpi väli)</li><li>\tType (string-tüüpi väli)</li><li>\tValue (ujuv/topelt-tüüpi väli)</li><li>\tCostindex (integer-tüüpi väli)</li><li>   \tProjectGUID (GUID-tüüpi väli))</li></ul> </p>",
    "projectLayerHelp": "<p>Kuvatakse järgmiste tingimustega polügooni kiht(kihid): <br/> <li>Kihil peavad olema redigeerimisvõimekused, nimelt funktsioonid â€œLooâ€, â€œKustutaâ€ ja â€œVärskendaâ€</li>    <li>Kihil peab olema viis täpselt järgmise nime- ja andmetüübiga välja:</li><ul><li>ProjectName (string-tüüpi väli)</li><li>Description (string-tüüpi väli)</li><li>Totalassetcost (ujuv/topelt-tüüpi väli)</li><li>Grossprojectcost (ujuv/topelt-tüüpi väli)</li><li>GlobalID (GlobalID-tüüpi väli)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Kihi seaded",
    "layerNameHeaderTitle": "Kihi nimi",
    "layerNameHeaderTooltip": "Kaardi kihtide loend",
    "EditableLayerHeaderTitle": "Muudetav",
    "EditableLayerHeaderTooltip": "Kaasa kiht ja selle mallid kuluarvutuse vidinasse",
    "SelectableLayerHeaderTitle": "Valitav",
    "SelectableLayerHeaderTooltip": "Objekti geomeetriat saab kasutada uue kuluüksuse loomiseks",
    "fieldPickerHeaderTitle": "Projekti ID (valikuline)",
    "fieldPickerHeaderTooltip": "Valikuline väli (string-tüüpi), kuhu salvestatakse projekti ID",
    "selectLabel": "Vali",
    "noAssetLayersAvailable": "Valitud veebikaardilt ei leitud vara kihte.",
    "disableEditableCheckboxTooltip": "Sellel kihil pole redigeerimisvõimekusi",
    "missingCapabilitiesMsg": "Sellel kihil pole järgmisi funktsioone:",
    "missingGlobalIdMsg": "Sellel kihil pole välja GlobalId",
    "create": "Loo",
    "update": "Uuenda",
    "delete": "Kustuta"
  },
  "costingInfo": {
    "tabTitle": "Kuluarvutuse teave",
    "proposedMainsLabel": "Pakutud peamised",
    "addCostingTemplateLabel": "Lisa kuluarvutuse mall",
    "manageScenariosTitle": "Halda stsenaariume",
    "featureTemplateTitle": "Funktsiooni mall",
    "costEquationTitle": "Kuluvõrrand",
    "geographyTitle": "Geograafia",
    "scenarioTitle": "Stsenaarium",
    "actionTitle": "Toimingud",
    "scenarioNameLabel": "Stsenaariumi nimi",
    "addBtnLabel": "Lisa",
    "srNoLabel": "ei.",
    "deleteLabel": "Kustuta",
    "duplicateScenarioName": "Stsenaariumi duplikaatnimi",
    "hintText": "<div>Vihje: kasutage järgmisi märksõnu</div><ul><li><b>{TOTALCOUNT}</b>: kasutatakse geograafia sama tüüpi vara koguarvu</li><li><b>{MEASURE}</b>: kasutatakse rea vara pikkust ja polügooni vara ala</li><li><b>{TOTALMEASURE}</b>: kasutatakse geograafia sama tüübi rea vara kogupikkust ja polügooni vara koguala</li></ul>Saate kasutada funktsioone nagu:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Redigeerige kuluvõrrandit vastavalt oma projekti vajadustele.",
    "noneValue": "Puudub",
    "requiredCostEquation": "${layerName} : ${templateName} sobimatu kuluvõrrand",
    "duplicateTemplateMessage": "${layerName} : ${templateName} on olemas malli kande duplikaat",
    "defaultEquationRequired": "${layerName} : ${templateName} vajab vaikevõrrandit",
    "validCostEquationMessage": "Sisestage sobiv kuluvõrrand",
    "costEquationHelpText": "Redigeerige kuluvõrrandit vastavalt oma projekti vajadustele",
    "scenarioHelpText": "Valige stsenaarium vastavalt oma projekti vajadustele",
    "copyRowTitle": "Kopeeri rida",
    "noTemplateAvailable": "Lisage ${layerName} jaoks vähemalt üks mall",
    "manageScenarioLabel": "Halda stsenaariumi",
    "noLayerMessage": "Lisage ${tabName}-s vähemalt üks kiht",
    "noEditableLayersAvailable": "Kihi seadete vahekaardil tuleb kiht(kihid) märkida redigeeritavaks"
  },
  "statisticsSettings": {
    "tabTitle": "Statistika seaded",
    "addStatisticsLabel": "Lisa statistika",
    "fieldNameTitle": "Väli",
    "statisticsTitle": "Märgis",
    "addNewStatisticsText": "Lisa uus statistika",
    "deleteStatisticsText": "Kustuta statistika",
    "moveStatisticsUpText": "Liiguta statistikat üles",
    "moveStatisticsDownText": "Liiguta statistikat alla",
    "selectDeselectAllTitle": "Vali kõik"
  },
  "statisticsType": {
    "countLabel": "Koguarv",
    "averageLabel": "Keskmine",
    "maxLabel": "Maksimum",
    "minLabel": "Miinimum",
    "summationLabel": "Summeerimine",
    "areaLabel": "Ala",
    "lengthLabel": "Pikkus"
  }
});