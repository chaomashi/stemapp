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
  "configText": "Postavi tekst za konfiguraciju:",
  "generalSettings": {
    "tabTitle": "Opće postavke",
    "measurementUnitLabel": "Mjerna jedinica",
    "currencyLabel": "Simbol mjerne jedinice",
    "roundCostLabel": "Zaokruženi trošak",
    "projectOutputSettings": "Izlazne postavke projekta",
    "typeOfProjectAreaLabel": "Vrsta područja projekta",
    "bufferDistanceLabel": "Veličina pojasa",
    "roundCostValues": {
      "twoDecimalPoint": "Dva decimalna zareza",
      "nearestWholeNumber": "Najbliži cijeli broj",
      "nearestTen": "Najbliža desetica",
      "nearestHundred": "Najbliža stotica",
      "nearestThousand": "Najbliža tisućica",
      "nearestTenThousands": "Najbližih deset tisuća"
    },
    "projectAreaType": {
      "outline": "Obris",
      "buffer": "Pojas"
    },
    "errorMessages": {
      "currency": "Nevažeća valuta jedinice",
      "bufferDistance": "Nevažeća udaljenost pojasa",
      "outOfRangebufferDistance": "Vrijednost bi trebala biti veća od 0 i manja ili jednaka 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Postavke projekta",
    "costingGeometrySectionTitle": "Definiraj geografiju za troškove (neobavezno)",
    "costingGeometrySectionNote": "Napomena: konfiguracijom ovog sloja omogućit će se korisniku postavljanje jednadžbi za troškove predložaka geoobjekata na temelju geografija.",
    "projectTableSectionTitle": "Mogućnost postavki spremanja/učitavanja projekta (neobavezno)",
    "projectTableSectionNote": "Napomena: konfiguracijom svih tablica i slojeva omogućit će se korisniku spremanje/učitavanje projekta za kasniju upotrebu.",
    "costingGeometryLayerLabel": "Sloj geometrije za troškove",
    "fieldLabelGeography": "Polje za označavanje geografije",
    "projectAssetsTableLabel": "Tablica sa sredstvima projekta",
    "projectMultiplierTableLabel": "Tablica dodatnih troškova množitelja projekta",
    "projectLayerLabel": "Sloj projekta",
    "configureFieldsLabel": "Konfiguriranje polja",
    "fieldDescriptionHeaderTitle": "Opis polja",
    "layerFieldsHeaderTitle": "Polje sloja",
    "selectLabel": "Odaberi",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} je već odabran",
      "invalidConfiguration": "Odaberite ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Prikazat će se poligonalni slojevi sa sljedećim uvjetima: <br/> <li>\tsloj mora imati mogućnost â€œUpitaâ€</li><li>\tsloj mora imati polje GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Polja niza i brojčana polja odabranog â€œSloja geometrije za troškoveâ€ prikazat će se u padajućem izborniku â€œPolje za označavanje geografijeâ€.</p>",
    "projectAssetsTableHelp": "<p>Prikazat će se tablice sa sljedećim uvjetima: <br/> <li>tablica mora imati mogućnost uređivanja, i to â€œStvoriâ€, â€œIzbrišiâ€ i â€œAžurirajâ€</li>    <li>tablica mora imati šest polja s točnom vrstom naziva i podataka:</li><ul><li>\tAssetGUID (polje GUID)</li><li>\tCostEquation (polje niza)</li><li>\tscenarij (polje niza)</li><li>\tTemplateName (polje niza)</li><li>    GeographyGUID (polje GUID)</li><li>\tProjectGUID (polje GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Prikazat će se tablice sa sljedećim uvjetima: <br/> <li>tablica mora imati mogućnost uređivanja, i to â€œStvoriâ€, â€œIzbrišiâ€ i â€œAžurirajâ€</li>    <li>tablica mora imati pet polja s točnom vrstom naziva i podataka:</li><ul><li>\topis (polje niza)</li><li>\tvrsta (polje niza)</li><li>\tvrijednost (plutajuće/dvostruko polje)</li><li>\tindeks troška (polje cijelog broja)</li><li>   \tProjectGUID (polje GUID)</li></ul> </p>",
    "projectLayerHelp": "<p>Prikazat će se poligonski sloj sa sljedećim uvjetima: <br/> <li>sloj mora imati mogućnost uređivanja, i to â€œStvoriâ€, â€œIzbrišiâ€ i â€œAžurirajâ€</li>    <li>sloj mora imati pet polja s točnom vrstom naziva i podataka:</li><ul><li>\tProjectName (polje niza)</li><li>\topis (polje niza)</li><li>\tTotalassetcost (plutajuće/dvostruko polje)</li><li>\tGrossprojectcost (plutajuće/dvostruko polje)</li><li>GlobalID (polje GlobalID)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Postavke sloja",
    "layerNameHeaderTitle": "Naziv sloja",
    "layerNameHeaderTooltip": "Popis slojeva na karti",
    "EditableLayerHeaderTitle": "Može se uređivati",
    "EditableLayerHeaderTooltip": "Uključite sloj i njegove predloške u widget za troškove",
    "SelectableLayerHeaderTitle": "Može se odabrati",
    "SelectableLayerHeaderTooltip": "Geometrija iz geoobjekta može se upotrijebiti za generiranje nove stavke troška",
    "fieldPickerHeaderTitle": "ID projekta (neobavezno)",
    "fieldPickerHeaderTooltip": "Neobavezno polje (vrste niza) za pohranjivanje ID-a projekta",
    "selectLabel": "Odaberi",
    "noAssetLayersAvailable": "Nema sloja sredstva na odabranoj web-karti",
    "disableEditableCheckboxTooltip": "Ovaj sloj nema mogućnosti za uređivanje",
    "missingCapabilitiesMsg": "Ovom sloju nedostaju sljedeće mogućnosti:",
    "missingGlobalIdMsg": "Ovaj sloj nema polje GlobalId",
    "create": "Stvori",
    "update": "Ažuriraj",
    "delete": "Izbriši"
  },
  "costingInfo": {
    "tabTitle": "Informacije o troškovima",
    "proposedMainsLabel": "Predložene glavne vrijednosti",
    "addCostingTemplateLabel": "Dodavanje predloška troškova",
    "manageScenariosTitle": "Upravljanje scenarijima",
    "featureTemplateTitle": "Predložak geoobjekta",
    "costEquationTitle": "Jednadžba troška",
    "geographyTitle": "Geografija",
    "scenarioTitle": "Scenarij",
    "actionTitle": "Radnje",
    "scenarioNameLabel": "Naziv scenarija",
    "addBtnLabel": "Dodaj",
    "srNoLabel": "Br.",
    "deleteLabel": "Izbriši",
    "duplicateScenarioName": "Duplicirani naziv scenarija",
    "hintText": "<div>Podsjetnik: upotrijebite sljedeće ključne riječi</div><ul><li><b>{TOTALCOUNT}</b>: upotrebljava ukupni broj sredstava iste vrste u geografiji</li> <li><b>{MEASURE}</b>: upotrebljava duljinu za sredstvo linije i područje za sredstvo poligona</li><li><b>{TOTALMEASURE}</b>: upotrebljava ukupnu duljinu za sredstvo linije i ukupno područje za sredstvo poligona iste vrste u geografiji</li></ul>Možete upotrijebiti funkcije kao što su:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Uredite jednadžbu za troškove prema potrebama vašeg projekta.",
    "noneValue": "Nema",
    "requiredCostEquation": "Nevažeća jednadžba za troškove za ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Postoji duplicirani unos predloška za ${layerName} : ${templateName}",
    "defaultEquationRequired": "Potrebna je zadana jednadžba za ${layerName} : ${templateName}",
    "validCostEquationMessage": "Unesite valjanu jednadžbu za troškove",
    "costEquationHelpText": "Uredite jednadžbu za troškove prema potrebama vašeg projekta",
    "scenarioHelpText": "Odaberite scenarij prema potrebama vašeg projekta",
    "copyRowTitle": "Kopiranje reda",
    "noTemplateAvailable": "Dodajte barem jedan predložak za ${layerName}",
    "manageScenarioLabel": "Upravljaj scenarijem",
    "noLayerMessage": "Unesite barem jedan sloj u ${tabName}",
    "noEditableLayersAvailable": "Slojevi moraju biti označeni da se mogu uređivati u kartici s postavkama sloja"
  },
  "statisticsSettings": {
    "tabTitle": "Postavke statistika",
    "addStatisticsLabel": "Dodavanje statistike",
    "fieldNameTitle": "Polje",
    "statisticsTitle": "Oznaka",
    "addNewStatisticsText": "Dodavanje novih statistika",
    "deleteStatisticsText": "Brisanje statistika",
    "moveStatisticsUpText": "Pomicanje statistika prema gore",
    "moveStatisticsDownText": "Pomicanje statistika prema dolje",
    "selectDeselectAllTitle": "Odaberi sve"
  },
  "statisticsType": {
    "countLabel": "Broj",
    "averageLabel": "Prosječno",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Sažetak",
    "areaLabel": "Poligon",
    "lengthLabel": "Duljina"
  }
});