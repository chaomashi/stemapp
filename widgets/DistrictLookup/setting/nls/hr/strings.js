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
    "miles": "Milje",
    "kilometers": "Kilometri",
    "feet": "Stope",
    "meters": "Metri"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Postavke pretraživanja",
    "buttonSet": "Postavi",
    "selectLayersLabel": "Odaberi sloj",
    "selectLayersHintText": "Posjetnik: upotrebljava se kako bi se odabrao sloj poligona i njegovi povezani točkasti sloj.",
    "selectPrecinctSymbolLabel": "Odaberi simbol za isticanje poligona",
    "selectGraphicLocationSymbol": "Simbol adrese ili lokacije",
    "graphicLocationSymbolHintText": "Podsjetnik: simbol za pretraženu adresu ili odabranu lokaciju",
    "precinctSymbolHintText": "Posjetnik: upotrebljava se za prikaz simbola za odabrani poligon",
    "selectColorForPoint": "Odaberi boju za isticanje točke",
    "selectColorForPointHintText": "Posjetnik: upotrebljava se za prikaz boje za isticanje za odabranu točku"
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
    "invalidUrlTip": "URL ${URL} nije valjan ili dostupan.",
    "invalidSearchSources": "Nevažeće postavke pretraživanja izvora"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Odaberi poligonalni sloj",
    "selectPolygonLayerHintText": "Posjetnik: upotrebljava se kako bi se odabrao poligonalni sloj i njegovi povezani točkasti sloj.",
    "selectRelatedPointLayerLabel": "Odaberi točkasti sloj povezan s poligonalnim slojem",
    "selectRelatedPointLayerHintText": "Podsjetnik: upotrebljava se za odabir točkastog sloja povezanog s poligonalnim slojem",
    "polygonLayerNotHavingRelatedLayer": "Odredite sloj poligona koji ima povezani točkasti sloj.",
    "errorInSelectingPolygonLayer": "Odredite sloj poligona koji ima povezani točkasti sloj.",
    "errorInSelectingRelatedLayer": "Odaberite točkasti sloj povezan s poligonalnim slojem."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Postavke uputa za vožnju",
    "routeServiceUrl": "Usluga rutiranja",
    "buttonSet": "Postavi",
    "routeServiceUrlHintText": "Podsjetnik: kliknite na „Postavi” za pregled i odabir usluge rutiranja za analizu mreže",
    "directionLengthUnit": "Jedinice udaljenosti u uputama za vožnju",
    "unitsForRouteHintText": "Posjetnik: upotrebljava se za prikaz jedinica u izvještaju rute",
    "selectRouteSymbol": "Odaberi simbol za prikaz rute",
    "routeSymbolHintText": "Podsjetnik: upotrebljava se za prikaz linije rute",
    "routingDisabledMsg": "Da biste omogućili upute za vožnju, provjerite je li rutiranje omogućeno u ArcGIS Onlineu."
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
  "symbolPickerPreviewText": "Pretpregled:",
  "showToolToSelectLabel": "Postavi gumb lokacije",
  "showToolToSelectHintText": "Savjet: pruža gumb za postavljanje lokacije na karti umjesto postavljanja lokacije kad se klikne na kartu"
});