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
    "invalidUrlTip": "URL adresa ${URL} nije validna ili nije dostupna."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Postavke pretrage",
    "defaultBufferDistanceLabel": "Postavi podrazumevano rastojanje zone bliskosti",
    "maxResultCountLabel": "Ograniči broj rezultata",
    "maxResultCountHintLabel": "Savet: Postavite maksimalni broj vidljivih rezultata. Vrednost 1 će vratiti najbliži geoobjekat",
    "maxBufferDistanceLabel": "Postavi maksimalno rastojanje zone bliskosti",
    "bufferDistanceUnitLabel": "Jedinice rastojanja zone bliskosti",
    "defaultBufferHintLabel": "Napomena: postavite podrazumevanu vrednost za klizač zone bliskosti",
    "maxBufferHintLabel": "Napomena: postavite maksimalnu vrednost za klizač zone bliskosti",
    "bufferUnitLabel": "Napomena: definišite jedinicu za kreiranje zone bliskosti",
    "selectGraphicLocationSymbol": "Simbol adresa ili lokacije",
    "graphicLocationSymbolHintText": "Napomena: Simbol za traženu adresu ili lokaciju na koju je kliknuto",
    "addressLocationPolygonHintText": "Savet: simbol za traženi sloj poligona",
    "popupTitleForPolygon": "Izaberite poligon za izabranu lokaciju adrese",
    "popupTitleForPolyline": "Izaberite liniju za lokaciju adrese",
    "addressLocationPolylineHintText": "Savet: simbol za traženi sloj polilinije",
    "fontColorLabel": "Izaberite boju fonta za rezultate pretrage",
    "fontColorHintText": "Napomena: boja fonta za rezultate pretrage",
    "zoomToSelectedFeature": "Zumiraj do izabranog geooobjekta",
    "zoomToSelectedFeatureHintText": "Napomena: zumirajte do izabranog geoobjekta umesto zone bliskosti",
    "intersectSearchLocation": "Vrati poligon(e) koji se seku",
    "intersectSearchLocationHintText": "Napomena: vratite poligon(e) koji sadrži(e) traženu lokaciju, pre poligona u okviru zone bliskosti",
    "enableProximitySearch": "Omogući pretragu bliskosti",
    "enableProximitySearchHintText": "Napomena: omogućite mogućnost pretrage lokacija u blizini izabranog rezultata",
    "bufferVisibilityLabel": "Podesi vidljivost zone bliskosti",
    "bufferVisibilityHintText": "Napomena: zona bliskosti će biti prikazana na mapi",
    "bufferColorLabel": "Podesi simbol zone bliskosti",
    "bufferColorHintText": "Napomena: izaberite boju i prozirnost zone bliskosti",
    "searchLayerResultLabel": "Nacrtaj samo rezultate izabranog sloja",
    "searchLayerResultHint": "Napomena: samo izabrani sloj u rezultatima pretrage će se iscrtati na mapi",
    "showToolToSelectLabel": "Dugme za podešavanje lokacije",
    "showToolToSelectHintText": "Savet: Pruža dugme za postavljanje lokacije na mapi umesto postavljanja lokacije klikom na mapu",
    "geoDesicParamLabel": "Koristi geodetsku zonu bliskosti",
    "geoDesicParamHintText": "Savet: Koristite geodetsku zonu bliskosti umesto euklidove zone bliskosti (planarna)"
  },
  "layerSelector": {
    "selectLayerLabel": "Izaberite sloj(eve) pretrage",
    "layerSelectionHint": "Napomena: koristite dugme postavke da biste izabrali sloj(eve)",
    "addLayerButton": "Postavi"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Postavke smernica",
    "routeServiceUrl": "Servis za rutiranje",
    "buttonSet": "Postavi",
    "routeServiceUrlHintText": "Napomena: kliknite na â€˜Postaviâ€™ da biste potražili i izabrali servis za rutiranje",
    "directionLengthUnit": "Jedinice dužine pravca",
    "unitsForRouteHintText": "Napomena: koristi se za prikazivanje jedinica za rutiranje",
    "selectRouteSymbol": "Izaberite simbol za prikaz rute",
    "routeSymbolHintText": "Napomena: koristi se za prikaz simbola linije rute",
    "routingDisabledMsg": "Da biste omogućili uputstva za navigaciju postarajte se da je rutiranje omogućeno u stavci u postavkama aplikacije."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Postavke simbologije",
    "addSymbologyBtnLabel": "Dodaj novi simbol",
    "layerNameTitle": "Ime sloja",
    "fieldTitle": "Polje",
    "valuesTitle": "Vrednosti",
    "symbolTitle": "Simbol",
    "actionsTitle": "Radnje",
    "invalidConfigMsg": "Dupliraj polje: ${fieldName} za sloj: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Postavke filtera",
    "addTaskTip": "Dodaj jedan ili više filtera u odabrani(-e) sloj(eve) i konfiguriši parametre za svaki od njih.",
    "enableMapFilter": "Uklonite unapred podešeni filter slojeva sa mape.",
    "newFilter": "Novi filter",
    "filterExpression": "Izraz filtera",
    "layerDefaultSymbolTip": "Koristi podrazumevani simbol sloja",
    "uploadImage": "Otpremi snimak",
    "selectLayerTip": "Izaberite sloj.",
    "setTitleTip": "Postavite naslov.",
    "noTasksTip": "Nema konfigurisanih filtera. Kliknite na \"${newFilter}\" da biste dodali novi.",
    "collapseFiltersTip": "Skupi izraze filtera (ako postoje) kada je vidžet otvoren",
    "groupFiltersTip": "Grupiši filtere prema sloju"
  },
  "networkServiceChooser": {
    "arcgislabel": "Dodaj iz ArcGIS Online",
    "serviceURLabel": "Dodaj URL adresu servisa",
    "routeURL": "URL adresa rutiranja",
    "validateRouteURL": "Proveri valjanost",
    "exampleText": "Primer",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Navedite važeći servis za rutiranje.",
    "rateLimitExceeded": "Prekoračeno je ograničenje stope. Pokušajte ponovo kasnije.",
    "errorInvokingService": "Korisničko ime ili lozinka su nevažeći."
  },
  "errorStrings": {
    "bufferErrorString": "Unesite važeću numeričku vrednost.",
    "selectLayerErrorString": "Izaberite sloj(eve) za pretragu.",
    "invalidDefaultValue": "Podrazumevano rastojanje zone bliskosti ne može da bude prazno. Navedite rastojanje zone bliskosti",
    "invalidMaximumValue": "Maksimalno rstojanje zone bliskosti ne može da bude prazno. Navedite rastojanje zone bliskosti",
    "defaultValueLessThanMax": "Navedite podrazumevano rastojanje zone bliskosti unutar maksimalnog ograničenja",
    "defaultBufferValueGreaterThanOne": "Podrazumevano rastojanje zone bliskosti ne može da bude manje od 0",
    "maximumBufferValueGreaterThanOne": "Navedite maksimalno rastojanje zone bliskosti veće od 0",
    "invalidMaximumResultCountValue": "Navedite važeću vrednost za maksimalni broj rezultata",
    "invalidSearchSources": "Nevažeće postavke za pretragu izvora"
  },
  "symbolPickerPreviewText": "Pregledaj:"
});