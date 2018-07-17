/*global define*/
///////////////////////////////////////////////////////////////////////////
// Copyright © 2015 Esri. All Rights Reserved.
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
  "units": {
    "miles": {
      "displayText": "Milje",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Kilometri",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Stope",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "Metri",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Postavke izvora pretraživanja",
    "searchSourceSettingTitle": "Postavke izvora pretraživanja",
    "searchSourceSettingTitleHintText": "Dodajte i konfigurirajte usluge geokodiranja ili slojeve s geoobjektima kao izvorima pretraživanja. Ti određeni izvori određuju što se može pretražiti u okviru za pretraživanje",
    "addSearchSourceLabel": "Dodaj izvor pretraživanja",
    "featureLayerLabel": "Sloj geoobjekta",
    "geocoderLabel": "geokoder",
    "nameTitle": "Naziv",
    "generalSettingLabel": "Opće postavke",
    "allPlaceholderLabel": "Mjesto za unos teksta za pretraživanje svega:",
    "allPlaceholderHintText": "Savjet: unesite tekst koji će se prikazati kao mjesto za unos prilikom pretraživanja svih slojeva i geokodera",
    "generalSettingCheckboxLabel": "Prikaži skočni prozor za pronađeni geoobjekt ili lokaciju",
    "countryCode": "Pozivni broj za državu ili regiju",
    "countryCodeEg": "npr. ",
    "countryCodeHint": "Ako ostavite ovu vrijednost praznom, pretražit će se sve države i regije",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Pretraži samo trenutačni obuhvat karte",
    "zoomScale": "Mjerilo uvećanja",
    "locatorUrl": "URL geokodera",
    "locatorName": "Naziv geokodera",
    "locatorExample": "Primjer",
    "locatorWarning": "Ova verzija usluge geokodiranja nije podržana. Widget podržava verziju usluge geokodiranja 10.0 i novije verzije.",
    "locatorTips": "Prijedlozi nisu dostupni jer usluga geokodiranja ne podržava mogućnost predlaganja.",
    "layerSource": "Izvor sloja",
    "setLayerSource": "Postavi izvor sloja",
    "setGeocoderURL": "Postavi URL geokodera",
    "searchLayerTips": "Prijedlozi nisu dostupni jer usluga geoobjekata ne podržava mogućnost numeriranja stranica.",
    "placeholder": "Mjesto za unos teksta",
    "searchFields": "Polja za pretraživanje",
    "displayField": "Polje za prikaz",
    "exactMatch": "Točno podudaranje",
    "maxSuggestions": "Maksimalni prijedlozi",
    "maxResults": "Maksimalni rezultati",
    "enableLocalSearch": "Omogući lokalno pretraživanje",
    "minScale": "Min. mjerilo",
    "minScaleHint": "Kad je mjerilo karte veće od ovog mjerila, primijenit će se lokalno pretraživanje",
    "radius": "Polumjer",
    "radiusHint": "Određuje polumjer područja oko trenutačnog središta karte koje se upotrebljava za povećanje broja kandidata za geokodiranje kako bi se prvi prikazali kandidati koji su najbliži lokaciji",
    "meters": "Metri",
    "setSearchFields": "Postavi polja za pretraživanje",
    "set": "Postavi",
    "fieldName": "Naziv",
    "invalidUrlTip": "URL ${URL} nije valjan ili dostupan."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Postavke pretraživanja",
    "defaultBufferDistanceLabel": "Postavite zadanu udaljenost pojasa",
    "maxResultCountLabel": "Ograniči broj rezultata",
    "maxResultCountHintLabel": "Savjet: postavite maksimalni broj vidljivih rezultata. Vrijednost od 1 vratit će najbliži geoobjekt",
    "maxBufferDistanceLabel": "Postavi maksimalnu udaljenost pojasa",
    "bufferDistanceUnitLabel": "Jedinice veličine pojasa",
    "defaultBufferHintLabel": "Podsjetnik: postavite zadanu vrijednost za klizač pojasa",
    "maxBufferHintLabel": "Podsjetnik: postavite maksimalnu vrijednost za klizač pojasa",
    "bufferUnitLabel": "Podsjetnik: definirajte jedinicu za stvaranje pojasa",
    "selectGraphicLocationSymbol": "Simbol adrese ili lokacije",
    "graphicLocationSymbolHintText": "Podsjetnik: simbol za pretraženu adresu ili odabranu lokaciju",
    "addressLocationPolygonHintText": "Savjet: simbol za pretraženi polgonalni sloj",
    "popupTitleForPolygon": "Odaberite poligon za odabranu lokaciju adrese",
    "popupTitleForPolyline": "Odaberite liniju za lokaciju adrese",
    "addressLocationPolylineHintText": "Savjet: simbol za pretraženi polilinijski sloj",
    "fontColorLabel": "Odaberite boju fonta za rezultate pretraživanja",
    "fontColorHintText": "Podsjetnik: boja fonta za rezultate pretraživanja",
    "zoomToSelectedFeature": "Uvećaj odabrani geoobjekt",
    "zoomToSelectedFeatureHintText": "Podsjetnik: uvećaj odabrani geoobjekt umjesto pojasa",
    "intersectSearchLocation": "Vrati poligon(e) koji se sijeku",
    "intersectSearchLocationHintText": "Podsjetnik: vratite poligon(e) koji sadrže tražene lokacije umjesto poligone unutar pojasa",
    "enableProximitySearch": "Omogući pretraživanje blizine",
    "enableProximitySearchHintText": "Savjet: uključite mogućnost pretraživanja lokacija blizu odabranog rezultata",
    "bufferVisibilityLabel": "Postavi vidljivost pojasa",
    "bufferVisibilityHintText": "Podsjetnik: pojas će se prikazati na karti",
    "bufferColorLabel": "Postavi simbol pojasa",
    "bufferColorHintText": "Podsjetnik: odaberite boju i prozirnost pojasa",
    "searchLayerResultLabel": "Nacrtaj samo rezultate odabranog sloja",
    "searchLayerResultHint": "Podsjetnik: samo će se odabrani sloj u rezultatima pretraživanja nacrtati na karti",
    "showToolToSelectLabel": "Postavi gumb lokacije",
    "showToolToSelectHintText": "Savjet: pruža gumb za postavljanje lokacije na karti umjesto postavljanja lokacije kad se klikne na kartu",
    "geoDesicParamLabel": "Upotrijebite geodetski pojas",
    "geoDesicParamHintText": "Savjet: upotrijebite geodetski pojas umjesto euklidskog pojasa (planarnog)"
  },
  "layerSelector": {
    "selectLayerLabel": "Odaberite sloj(eve) koji se mogu pretraživati",
    "layerSelectionHint": "Podsjetnik: upotrijebite gumb za postavljanje sloja(eva) za odabir",
    "addLayerButton": "Postavi"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Postavke uputa za vožnju",
    "routeServiceUrl": "Usluga rutiranja",
    "buttonSet": "Postavi",
    "routeServiceUrlHintText": "Podsjetnik: kliknite na â€˜Postaviâ€™ kako biste pregledavali i odabrali uslugu rutiranja",
    "directionLengthUnit": "Jedinice udaljenosti u uputama za vožnju",
    "unitsForRouteHintText": "Posjetnik: upotrebljava se za prikaz jedinica rute",
    "selectRouteSymbol": "Odaberi simbol za prikaz rute",
    "routeSymbolHintText": "Podsjetnik: upotrebljava se za prikaz linije rute",
    "routingDisabledMsg": "Da biste omogućili upute za vožnju, provjerite je li rutiranje omogućeno u postavkama aplikacije."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Postavke simbologije",
    "addSymbologyBtnLabel": "Dodaj nove simbole",
    "layerNameTitle": "Naziv sloja",
    "fieldTitle": "Polje",
    "valuesTitle": "Vrijednosti",
    "symbolTitle": "Simbol",
    "actionsTitle": "Radnje",
    "invalidConfigMsg": "Dupliciraj polje: ${fieldName} za sloj: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Postavke filtra",
    "addTaskTip": "Dodajte jedan ili više filtara za odabrane slojeve pretraživanja i konfigurirajte parametre za svaki od njih.",
    "enableMapFilter": "Uklonite predefinirani filtar za slojeve na karti.",
    "newFilter": "Novi filtar",
    "filterExpression": "Izraz za filtriranje",
    "layerDefaultSymbolTip": "Upotrijebi zadani simbol sloja",
    "uploadImage": "Učitaj sliku",
    "selectLayerTip": "Odaberite sloj.",
    "setTitleTip": "Postavite naslov.",
    "noTasksTip": "Nema konfiguriranih filtara. Kliknite na „${newFilter}” za dodavanje novog.",
    "collapseFiltersTip": "Sažmi izraz filtra (ako postoji) kad se otvori widget",
    "groupFiltersTip": "Grupiraj filtre po sloju"
  },
  "networkServiceChooser": {
    "arcgislabel": "Dodaj iz ArcGIS Online",
    "serviceURLabel": "Dodaj URL usluge",
    "routeURL": "URL rute",
    "validateRouteURL": "Provjera",
    "exampleText": "Primjer",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Odredite važeću uslugu rutiranja.",
    "rateLimitExceeded": "Premašeno ograničenje ocjenjivanja. Pokušajte ponovno kasnije.",
    "errorInvokingService": "Korisničko ime ili lozinka nije ispravna."
  },
  "errorStrings": {
    "bufferErrorString": "Unesite valjanu brojčanu vrijednost.",
    "selectLayerErrorString": "Odaberite sloj(eve) za pretraživanje.",
    "invalidDefaultValue": "Zadana veličina pojasa ne može biti prazna. Odredite veličinu pojasa",
    "invalidMaximumValue": "Maksimalna veličina pojasa ne može biti prazna. Odredite veličinu pojasa",
    "defaultValueLessThanMax": "Odredite zadanu veličinu pojasa unutar maksimalnog ograničenja",
    "defaultBufferValueGreaterThanOne": "Zadana udaljenost pojasa ne može biti manja od 0",
    "maximumBufferValueGreaterThanOne": "Odredite maksimalnu veličinu pojasa veću od 0",
    "invalidMaximumResultCountValue": "Odredite valjanu vrijednost za maksimalni zbroj rezultata",
    "invalidSearchSources": "Nevažeće postavke pretraživanja izvora"
  },
  "symbolPickerPreviewText": "Pretpregled:"
});