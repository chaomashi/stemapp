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
    "layerSettingTabTitle": "Postavke pretrage",
    "buttonSet": "Postavi",
    "selectLayersLabel": "Izaberite sloj",
    "selectLayersHintText": "Napomena: koristi se za izbor sloja poligona i sa njim povezanih slojeva tačaka.",
    "selectPrecinctSymbolLabel": "Izaberite simbol za isticanje poligona",
    "selectGraphicLocationSymbol": "Simbol adresa ili lokacije",
    "graphicLocationSymbolHintText": "Napomena: Simbol za traženu adresu ili lokaciju na koju je kliknuto",
    "precinctSymbolHintText": "Napomena: koristi se za prikaz simbola za izabrani poligon",
    "selectColorForPoint": "Izaberi boju za isticanje tačke",
    "selectColorForPointHintText": "Napomena: koristi se za prikaz boje za isticanje za izabranu tačku"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Pretraži postavke izvora",
    "searchSourceSettingTitle": "Pretraži postavke izvora",
    "searchSourceSettingTitleHintText": "Dodajte i konfigurišite servise za geokodiranje ili slojeve geoobjekata kao izvora pretrage. Ovi navedeni izvori određuju šta može da se pretražuje unutar trake za pretragu.",
    "addSearchSourceLabel": "Dodaj izvor pretrage",
    "featureLayerLabel": "Sloj geoobjekata",
    "geocoderLabel": "Geokoder",
    "nameTitle": "Naziv",
    "generalSettingLabel": "Opšte postavke",
    "allPlaceholderLabel": "Tekst čuvara mesta za pretragu svega:",
    "allPlaceholderHintText": "Savet: Unesite tekst koji će se prikazati kao čuvar mesta tokom pretrage svih slojeva i geokodera",
    "generalSettingCheckboxLabel": "Prikaži iskačući prozor za pronađeni geoobjekat ili lokaciju",
    "countryCode": "Kôd(ovi) zemlje ili regiona",
    "countryCodeEg": "npr. ",
    "countryCodeHint": "Ako ova vrednost ostane prazna, pretražuju se sve zemlje i regioni",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Pretraži samo u trenutnom obuhvatu mape",
    "zoomScale": "Skala zumiranja",
    "locatorUrl": "URL adresa geokodera",
    "locatorName": "Ime geokodera",
    "locatorExample": "Primer",
    "locatorWarning": "Ova verzija servisa geokôdiranja nije podržana. Vidžet podržava samo servis geokôdiranja 10.0 i novije.",
    "locatorTips": "Predlozi nisu dostupni jer servis geokôdiranja ne podržava predloženu mogućnost.",
    "layerSource": "Izvor sloja",
    "setLayerSource": "Postavi izvor sloja",
    "setGeocoderURL": "Postavi URL adresu geokôdera",
    "searchLayerTips": "Predlozi nisu dostupni jer servis geoobjekata ne podržava mogućnost paginacije.",
    "placeholder": "Tekst čuvara mesta",
    "searchFields": "Polja za pretragu",
    "displayField": "Prikaži polje",
    "exactMatch": "Potpuno podudaranje",
    "maxSuggestions": "Maksimalno predloga",
    "maxResults": "Maksimalno rezultata",
    "enableLocalSearch": "Omogući lokalnu pretragu",
    "minScale": "Min. razmera",
    "minScaleHint": "Kada je razmera mape veća od ove razmere, primenjuje se lokalna pretraga",
    "radius": "Poluprečnik",
    "radiusHint": "Definiše poluprečnik oblasti oko trenutnog centra mape koja se koristi za poboljšavanje rangiranja kandidata za geokodiranje kako bi se prvo vraćali kandidati najbliži lokaciji",
    "meters": "Metri",
    "setSearchFields": "Postavi polja pretrage",
    "set": "Postavi",
    "fieldName": "Naziv",
    "invalidUrlTip": "URL adresa ${URL} nije validna ili nije dostupna.",
    "invalidSearchSources": "Nevažeće postavke za pretragu izvora"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Izaberite sloj poligona",
    "selectPolygonLayerHintText": "Napomena: koristi se za izbor sloja poligona.",
    "selectRelatedPointLayerLabel": "Izaberite sloj tačke povezan sa slojem poligona",
    "selectRelatedPointLayerHintText": "Napomena: koristi se za izbor sloja tačke povezanog sa slojem poligona",
    "polygonLayerNotHavingRelatedLayer": "Izaberite sloj poligona koji ima povezani sloj tačke.",
    "errorInSelectingPolygonLayer": "Izaberite sloj poligona koji ima povezani sloj tačke.",
    "errorInSelectingRelatedLayer": "Izaberite sloj tačke povezan sa slojem poligona."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Postavke smernica",
    "routeServiceUrl": "Servis rutiranja",
    "buttonSet": "Postavi",
    "routeServiceUrlHintText": "Napomena: kliknite na „Postavi“ da biste potražili i izabrali mrežnu analizu servisa za rutiranje",
    "directionLengthUnit": "Jedinice dužine pravca",
    "unitsForRouteHintText": "Napomena: koristi se za prikazivanje prijavljenih jedinica za rutiranje",
    "selectRouteSymbol": "Izaberite simbol za prikaz rute",
    "routeSymbolHintText": "Napomena: koristi se za prikaz simbola linije usmeravanja",
    "routingDisabledMsg": "Da biste omogućili uputstva za navigaciju postarajte se da je rutiranje omogućeno u stavci ArcGIS Online."
  },
  "networkServiceChooser": {
    "arcgislabel": "Dodaj iz ArcGIS Online",
    "serviceURLabel": "Dodaj URL adresu servisa",
    "routeURL": "URL adresa usmeravanja",
    "validateRouteURL": "Proveri valjanost",
    "exampleText": "Primer",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Navedite važeći servis za rutiranje.",
    "rateLimitExceeded": "Prekoračeno je ograničenje stope. Pokušajte ponovo kasnije.",
    "errorInvokingService": "Korisničko ime ili lozinka su nevažeći."
  },
  "symbolPickerPreviewText": "Pregledaj:",
  "showToolToSelectLabel": "Dugme za podešavanje lokacije",
  "showToolToSelectHintText": "Savet: Pruža dugme za postavljanje lokacije na mapi umesto postavljanja lokacije klikom na mapu"
});