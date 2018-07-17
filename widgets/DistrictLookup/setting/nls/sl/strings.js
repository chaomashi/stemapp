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
    "feet": "Čevlji",
    "meters": "Metri"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Nastavitve iskanja",
    "buttonSet": "Nastavi",
    "selectLayersLabel": "Izberi sloj",
    "selectLayersHintText": "Namig: Uporablja se za izbiro poligonskega sloja in relacijskega točkovnega sloja.",
    "selectPrecinctSymbolLabel": "Izberite simbol, da osvetlite poligon",
    "selectGraphicLocationSymbol": "Simbol naslova ali lokacije",
    "graphicLocationSymbolHintText": "Namig: Simbol za iskane naslove ali lokacije klika",
    "precinctSymbolHintText": "Namig: Uporablja se za prikaz simbola izbranega poligona",
    "selectColorForPoint": "Izberite barvo za osvetlitev točke",
    "selectColorForPointHintText": "Namig: Uporablja se za prikaz osvetljene barve za izbrano točko"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Nastavitve vira iskanja",
    "searchSourceSettingTitle": "Nastavitve vira iskanja",
    "searchSourceSettingTitleHintText": "Dodaj in konfiguriraj geokodirne storitve ali geoobjektne sloje kot vire iskanja. Ti viri določajo, kaj je mogoče iskati znotraj iskalnega polja",
    "addSearchSourceLabel": "Dodajte vir iskanja",
    "featureLayerLabel": "Geoobjektni sloj",
    "geocoderLabel": "Geokodirnik",
    "nameTitle": "Ime",
    "generalSettingLabel": "Splošna nastavitev",
    "allPlaceholderLabel": "Nadomestno besedilo za iskanje:",
    "allPlaceholderHintText": "Namig: Vnesite besedilo, ki bo prikazano kot nadomestno besedilo med iskanjem po vseh slojih in geokodirniku",
    "generalSettingCheckboxLabel": "Pokaži pojavno okno za najdeni geoobjekt ali lokacijo",
    "countryCode": "Šifre države ali regije",
    "countryCodeEg": "npr. ",
    "countryCodeHint": "Če to vrednost pustite prazno, bo iskanje potekalo po vseh državah in regijah",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Išči samo v trenutnem obsegu karte",
    "zoomScale": "Povečava merila",
    "locatorUrl": "URL geokodirnika",
    "locatorName": "Ime geokodirnika",
    "locatorExample": "Primer",
    "locatorWarning": "Ta različica geokodirnih storitev ni podprta. Pripomoček podpira različico geokodirne storitve 10.0 in novejšo.",
    "locatorTips": "Predlogi niso na voljo, ker geokodirna storitev ne podpira predlagane zmožnosti.",
    "layerSource": "Vir sloja",
    "setLayerSource": "Nastavi vir sloja",
    "setGeocoderURL": "Nastavi URL geokodirnika",
    "searchLayerTips": "Predlogi niso na voljo, ker geoobjektna storitev ne podpira možnosti številčenja strani.",
    "placeholder": "Nadomestno besedilo",
    "searchFields": "Iskalna polja",
    "displayField": "Prikaži polje",
    "exactMatch": "Natančno ujemanje",
    "maxSuggestions": "Maksimalno predlogov",
    "maxResults": "Maksimalno rezultatov",
    "enableLocalSearch": "Omogoči lokalno iskanje",
    "minScale": "Minimalno merilo",
    "minScaleHint": "Ko je merilo karte večje od tega merila, bo uporabljeno lokalno iskanje",
    "radius": "Polmer",
    "radiusHint": "Določa polmer območja okrog trenutnega središča karte, ki je uporabljeno za povečanje števila kandidatov za geokodiranje. Tako so najprej prikazani kandidati, ki so najbližje lokaciji",
    "meters": "Metri",
    "setSearchFields": "Nastavi iskalna polja",
    "set": "Nastavi",
    "fieldName": "Ime",
    "invalidUrlTip": "URL ${URL} ni veljaven ali dostopen.",
    "invalidSearchSources": "Neveljavne nastavitve iskanja vira"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Izberite poligonski sloj",
    "selectPolygonLayerHintText": "Namig: Uporablja se za izbiro poligonskega sloja.",
    "selectRelatedPointLayerLabel": "Izberite točkovni sloj v relaciji s poligonskim slojem",
    "selectRelatedPointLayerHintText": "Namig: Uporablja se za izbiro točkovnega sloja, ki je v relaciji s poligonskim slojem",
    "polygonLayerNotHavingRelatedLayer": "Izberite poligonski sloj v relaciji s točkovnim slojem.",
    "errorInSelectingPolygonLayer": "Izberite poligonski sloj v relaciji s točkovnim slojem.",
    "errorInSelectingRelatedLayer": "Izberite točkovni sloj v relaciji s poligonskim slojem."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Nastavitve navodil za pot",
    "routeServiceUrl": "Usmerjevalna storitev",
    "buttonSet": "Nastavi",
    "routeServiceUrlHintText": "Namig: Kliknite »Nastavi« za brskanje in izbiro usmerjevalne storitve mrežne analize",
    "directionLengthUnit": "Enote dolžine v navodilih za pot",
    "unitsForRouteHintText": "Namig: Uporablja se za prikaz sporočenih enot poti",
    "selectRouteSymbol": "Izberite simbol za prikaz poti",
    "routeSymbolHintText": "Namig: Uporablja se za prikaz simbola linije poti",
    "routingDisabledMsg": "Da omogočite navodila za pot, se prepričajte, da je v elementu ArcGIS Online omogočeno usmerjanje."
  },
  "networkServiceChooser": {
    "arcgislabel": "Dodaj iz ArcGIS Online",
    "serviceURLabel": "Dodaj URL storitve",
    "routeURL": "URL poti",
    "validateRouteURL": "Potrdi",
    "exampleText": "Primer",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Navedite veljavno usmerjevalno storitev.",
    "rateLimitExceeded": "Omejitev stopnje presežena. Poskusite znova pozneje.",
    "errorInvokingService": "Uporabniško ime ali geslo ni pravilno."
  },
  "symbolPickerPreviewText": "Predogled:",
  "showToolToSelectLabel": "Nastavite gumb lokacije",
  "showToolToSelectHintText": "Namig: Ponudi gumb za nastavitev lokacije na karti v izogib vsakokratnem klikanju in nastavljanju lokacije na karti"
});