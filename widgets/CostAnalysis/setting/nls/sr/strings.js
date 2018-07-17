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
  "configText": "Postavi tekst konfiguracije:",
  "generalSettings": {
    "tabTitle": "Opšte postavke",
    "measurementUnitLabel": "Merna jedinica",
    "currencyLabel": "Simbol merenja",
    "roundCostLabel": "Zaokruži trošak",
    "projectOutputSettings": "Postavke izlaznih rezultata projekta",
    "typeOfProjectAreaLabel": "Tip oblasti projekta",
    "bufferDistanceLabel": "Rastojanje zone bliskosti",
    "roundCostValues": {
      "twoDecimalPoint": "Dve decimale",
      "nearestWholeNumber": "Najbliži ceo broj",
      "nearestTen": "Najbliža desetica",
      "nearestHundred": "Najbliža stotina",
      "nearestThousand": "Najbliža hiljada",
      "nearestTenThousands": "Najbliža desetina hiljada"
    },
    "projectAreaType": {
      "outline": "Kontura",
      "buffer": "Zona bliskosti"
    },
    "errorMessages": {
      "currency": "Nevažeća jedinica valute",
      "bufferDistance": "Nevažeće rastojanje zone bliskosti",
      "outOfRangebufferDistance": "Vrednost treba da bude veća od 0 i manja ili jednaka sa 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Postavke projekta",
    "costingGeometrySectionTitle": "Definiši geografiju troškova (opciono)",
    "costingGeometrySectionNote": "Napomena: konfigurisanje ovog sloja će omogućiti korisniku da postavi jednačine troškova šablona geoobjekta na osnovu geografije.",
    "projectTableSectionTitle": "Mogućnost Čuvanja/Učitavanja postavki projekta (opciono)",
    "projectTableSectionNote": "Napomena: konfigurisanje svih tabela i slojeva će omogućiti korisnicima da sačuvaju/učitaju projekte za kasnije korišćenje.",
    "costingGeometryLayerLabel": "Sloj troškova geometrije",
    "fieldLabelGeography": "Polje za označavanje geografije",
    "projectAssetsTableLabel": "Tabela resursa projekta",
    "projectMultiplierTableLabel": "Tabela dodatnih troškova multiplikatora projekta",
    "projectLayerLabel": "Sloj projekta",
    "configureFieldsLabel": "Konfiguriši polja",
    "fieldDescriptionHeaderTitle": "Opis polja",
    "layerFieldsHeaderTitle": "Polje sloja",
    "selectLabel": "Izaberite",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} je već izabran",
      "invalidConfiguration": "Izaberite ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Sloj(evi) poligona sa sledećim uslovima će biti prikazan(i): <br/> <li>\tSloj mora da ima mogućnost â€œUpitaâ€</li><li>\tSloj mora da ima GlobalID polje</li></p>",
    "fieldToLabelGeographyHelp": "<p>String i numeričko polje izabranog â€œSloja troškova geometrijeâ€ će da bude prikazano u padajućem meniju â€œPolja za označavanje geografijeâ€.</p>",
    "projectAssetsTableHelp": "<p>Tabla(-e) sa sledećim uslovima će biti prikazane: <br/> <li>Tabla mora da ima mogućnost uređivanja, tačnije â€œKreirajâ€, â€œObrišiâ€ i â€œAžurirajâ€</li>    <li>Tabla mora da ima šest polja sa tačnim nazivima i tipom podataka</li><ul><li>\tGUID resursa (GUID tip polja)</li><li>\tJednačina troškova (string tip polja)</li><li>\tScenario (string tip polja)</li><li>\tNaziv šablona (string tip polja)</li><li>    GUID geografije (GUID tip polja)</li><li>\tGUID projekta (GUID tip polja)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Tabla(-e) sa sledećim uslovima će biti prikazane: <br/> <li>Tabla mora da ima mogućnost uređivanja, tačnije â€œKreirajâ€, â€œObrišiâ€ i â€œažurirajâ€</li>    <li>Tabla mora da ima pet polja sa tačnim nazivima i tipom podataka</li><ul><li>\tOpis (string tip polja)</li><li>\tTip (string tip polja)</li><li>\tVrednost (plutajući/dupli tip polja)</li><li>\tIndeks troškova (tip polja sa celim brojem)</li><li>   \tGUID projekta (GUID tip polja))</li></ul> </p>",
    "projectLayerHelp": "<p>Sloj(evi) poligona sa sledećim uslovima će biti prikazan(i): <br/> <li>Sloj mora da ima mogućnost uređivanja, naime opcije â€œKreirajâ€, â€œObrišiâ€ i â€œAžurirajâ€</li>    <li>Sloj mora da ima pet polja sa tačnim nazivom i tipom podataka:</li><ul><li>Naziv projekta (string tip polja)</li><li>Opis (string tip polja)</li><li>Ukupan trošak resursa (plutajući/dupli tip polja)</li><li>Bruto trošak projekta (plutajući/dupli tip polja)</li><li>Globalni ID (globalni ID tip polja)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Postavke sloja",
    "layerNameHeaderTitle": "Ime sloja",
    "layerNameHeaderTooltip": "Lista slojeva u mapi",
    "EditableLayerHeaderTitle": "Može da se izmeni",
    "EditableLayerHeaderTooltip": "Uključi sloj i njegove šablone u vidžet troškova",
    "SelectableLayerHeaderTitle": "Može da se selektuje",
    "SelectableLayerHeaderTooltip": "Geometrija iz geoobjekta može da se koristi za generisanje stavke novog troška",
    "fieldPickerHeaderTitle": "ID projekta (opciono)",
    "fieldPickerHeaderTooltip": "Opciono polje (string tipa) za skladištenje ID projekta u",
    "selectLabel": "Izaberite",
    "noAssetLayersAvailable": "Nema pronađenog resursa sloja u izabranoj veb mapi",
    "disableEditableCheckboxTooltip": "Ovaj sloj nema mogućnost uređivanja",
    "missingCapabilitiesMsg": "Ovom sloju nedostaju sledeće mogućnosti:",
    "missingGlobalIdMsg": "Ovaj sloj nema polje GlobalId",
    "create": "Kreiraj",
    "update": "Ažuriraj",
    "delete": "Izbriši"
  },
  "costingInfo": {
    "tabTitle": "Informacije o troškovima",
    "proposedMainsLabel": "Predložene mreže",
    "addCostingTemplateLabel": "Dodaj šablon troškova",
    "manageScenariosTitle": "Upravljaj scenarijima",
    "featureTemplateTitle": "Šablon geoobjekta",
    "costEquationTitle": "Jednačina troškova",
    "geographyTitle": "Geografija",
    "scenarioTitle": "Scenario",
    "actionTitle": "Radnje",
    "scenarioNameLabel": "Naziv scenarija",
    "addBtnLabel": "Dodaj",
    "srNoLabel": "Ne.",
    "deleteLabel": "Izbriši",
    "duplicateScenarioName": "Duplirano ime scenarija",
    "hintText": "<div>Savet: koristite sledeće ključne reči</div><ul><li><b>{TOTALCOUNT}</b>: koristi ukupan broj istog tipa resursa u geografiji</li><li><b>{MEASURE}</b>: Koristi dužinu za resurs linije i oblast za resurs poligona</li><li><b>{TOTALMEASURE}</b>: Koristi ukupnu dužinu za resurs linije i ukupnu oblast za resurs poligona za isti tip u geografiji</li></ul>Možete da koristite funkcije kao što su:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Izmenite jednačinu troškova prema zahtevima vašeg projekta.",
    "noneValue": "Ništa",
    "requiredCostEquation": "Nevažeća jednačina troška za ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Postoji duplirani unos šablona za ${layerName} : ${templateName}",
    "defaultEquationRequired": "Podrazumevana jednačina je obavezna za ${layerName} : ${templateName}",
    "validCostEquationMessage": "Unesite važeću jednačinu troška",
    "costEquationHelpText": "Izmenite jednačinu troška prema zahtevima vašeg projekta",
    "scenarioHelpText": "Izaberite scenario prema zahtevima vašeg projekta",
    "copyRowTitle": "Kopiraj red",
    "noTemplateAvailable": "Dodajte najmanje jedan šablon za ${layerName}",
    "manageScenarioLabel": "Upravljaj scenarijem",
    "noLayerMessage": "Unesite najmanje jedan sloj u ${tabName}",
    "noEditableLayersAvailable": "Sloj(evi) treba da bude(-u) označen(i) kao urediv(i) u kartici postavki sloja"
  },
  "statisticsSettings": {
    "tabTitle": "Postavke statistike",
    "addStatisticsLabel": "Dodaj statistiku",
    "fieldNameTitle": "Polje",
    "statisticsTitle": "Oznaka",
    "addNewStatisticsText": "Dodaj novu statistiku",
    "deleteStatisticsText": "Obriši statistiku",
    "moveStatisticsUpText": "Pomeri statistiku na gore",
    "moveStatisticsDownText": "Pomeri statistiku na dole",
    "selectDeselectAllTitle": "Selektuj sve"
  },
  "statisticsType": {
    "countLabel": "Brojač",
    "averageLabel": "Prosečno",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Zbir",
    "areaLabel": "Površina",
    "lengthLabel": "Dužina"
  }
});