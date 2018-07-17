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
    "miles": "Mile",
    "kilometers": "Kilometri",
    "feet": "Ft",
    "meters": "Metri"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Setări căutare",
    "buttonSet": "Setare",
    "selectLayersLabel": "Selectare strat tematic",
    "selectLayersHintText": "Sugestie: Utilizat pentru a selecta un strat tematic de poligoane şi stratul tematic de puncte corelat cu acesta.",
    "selectPrecinctSymbolLabel": "Selectare simbol pentru evidenţierea poligonului",
    "selectGraphicLocationSymbol": "Simbol adresă sau locaţie",
    "graphicLocationSymbolHintText": "Sugestie: Simbol pentru adresa căutată sau locaţia apăsată",
    "precinctSymbolHintText": "Sugestie: Utilizat pentru afişarea simbolului pentru poligonul selectat",
    "selectColorForPoint": "Selectare culoare pentru evidenţierea punctului",
    "selectColorForPointHintText": "Sugestie: Se utilizează pentru afişarea culorii de evidenţiere pentru punctul selectat"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Setări sursă căutare",
    "searchSourceSettingTitle": "Setări sursă căutare",
    "searchSourceSettingTitleHintText": "Adăugaţi şi configuraţi servicii de geocodificare sau straturi tematice de obiecte spaţiale ca surse de căutare. Aceste surse specificate stabilesc ce este căutabil în cadrul casetei de căutare",
    "addSearchSourceLabel": "Adăugare sursă căutare",
    "featureLayerLabel": "Strat tematic de obiecte spațiale",
    "geocoderLabel": "Geocodificator",
    "nameTitle": "Nume",
    "generalSettingLabel": "Setare generală",
    "allPlaceholderLabel": "Text substituent pentru căutarea tuturor:",
    "allPlaceholderHintText": "Sugestie: Introduceţi textul care va fi afişat ca substituent în timp ce căutaţi în toate straturile tematice şi în geocodificator",
    "generalSettingCheckboxLabel": "Afişaţi fereastra pop-up pentru obiectul spaţial sau locul găsit",
    "countryCode": "Cod(uri) ţară sau regiune",
    "countryCodeEg": "de ex. ",
    "countryCodeHint": "Dacă lăsaţi această valoare necompletată, vor fi căutate toate ţările şi regiunile",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Căutaţi doar în extinderea de hartă curentă",
    "zoomScale": "Scară de transfocare",
    "locatorUrl": "URL geocodificator",
    "locatorName": "Nume geocodificator",
    "locatorExample": "Exemplu",
    "locatorWarning": "Această versiune de serviciu de geocodificare nu este acceptată. Widgetul acceptă serviciul de geocodificare versiunea 10.0 sau ulterioară.",
    "locatorTips": "Sugestiile nu sunt disponibile, deoarece serviciul de geocodificare nu acceptă capacitatea de sugestie.",
    "layerSource": "Sursă straturi tematice",
    "setLayerSource": "Setare sursă straturi tematice",
    "setGeocoderURL": "Setare URL geocodificator",
    "searchLayerTips": "Sugestiile nu sunt disponibile, deoarece serviciul de obiecte spaţiale nu acceptă capacitatea de paginare.",
    "placeholder": "Text substituent",
    "searchFields": "Câmpuri de căutare",
    "displayField": "Câmp de afişare",
    "exactMatch": "Potrivire exactă",
    "maxSuggestions": "Sugestii de maxime",
    "maxResults": "Număr maxim de rezultate",
    "enableLocalSearch": "Activare căutare locală",
    "minScale": "Scară minimă",
    "minScaleHint": "Dacă scara hărţii este mai mare decât această scară, va fi aplicată căutarea locală",
    "radius": "Rază",
    "radiusHint": "Specifică raza unei suprafeţe din jurul centrului actual al hărţii, utilizată pentru a creşte clasificarea candidaţilor de geocodificare, astfel încât candidaţii cei mai apropiaţi de locaţie să fie returnaţi primii",
    "meters": "Metri",
    "setSearchFields": "Setare câmpuri de căutare",
    "set": "Setare",
    "fieldName": "Nume",
    "invalidUrlTip": "Adresa URL ${URL} este nevalidă sau inaccesibilă.",
    "invalidSearchSources": "Setări nevalide sursă căutare"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Selectarea stratului tematic de poligoane",
    "selectPolygonLayerHintText": "Sugestie: Utilizat pentru selectarea stratului tematic de poligoane.",
    "selectRelatedPointLayerLabel": "Selectare strat tematic de puncte corelat cu stratul tematic de poligoane",
    "selectRelatedPointLayerHintText": "Sugestie: Utilizat pentru a selecta un strat tematic de puncte corelat ce stratul tematic de poligoane",
    "polygonLayerNotHavingRelatedLayer": "Vă rugăm să selectaţi un strat tematic de poligoane care are un strat tematic de puncte corelat.",
    "errorInSelectingPolygonLayer": "Vă rugăm să selectaţi un strat tematic de poligoane care are un strat tematic de puncte corelat.",
    "errorInSelectingRelatedLayer": "Vă rugăm să selectaţi un strat tematic de puncte corelat cu stratul tematic de poligoane."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Setări indicaţii de deplasare",
    "routeServiceUrl": "Serviciu de rute",
    "buttonSet": "Setare",
    "routeServiceUrlHintText": "Sugestie: Apăsaţi „Setare” pentru a răsfoi un serviciu de rute de analiză de reţea",
    "directionLengthUnit": "Unităţi de lungime pentru indicaţiile de direcţie",
    "unitsForRouteHintText": "Sugestie: Utilizaţi pentru afişarea unităţilor raportate pentru rută",
    "selectRouteSymbol": "Selectare simbol pentru afişarea rutei",
    "routeSymbolHintText": "Sugestie: Utilizat pentru afişarea simbolului liniei rutei",
    "routingDisabledMsg": "Pentru a activa indicaţiile de direcţie asiguraţi-vă că rutele sunt activate în elementul ArcGIS Online."
  },
  "networkServiceChooser": {
    "arcgislabel": "Adăugare din ArcGIS Online",
    "serviceURLabel": "Adăugare URL serviciu",
    "routeURL": "URL rută",
    "validateRouteURL": "Validare",
    "exampleText": "Exemplu",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Vă rugăm să specificaţi un serviciu de rute valid.",
    "rateLimitExceeded": "Limita de rată a fost depăşită. Încercaţi din nou mai târziu.",
    "errorInvokingService": "Nume de utilizator sau parolă incorectă."
  },
  "symbolPickerPreviewText": "Previzualizare:",
  "showToolToSelectLabel": "Setare buton locaţie",
  "showToolToSelectHintText": "Sugestie: Furnizează un buton pentru a seta locaţia pe hartă în loc să seteze întotdeauna locaţia atunci când se face clic pe hartă"
});