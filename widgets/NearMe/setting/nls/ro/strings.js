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
      "displayText": "Mile",
      "acronym": "mi."
    },
    "kilometers": {
      "displayText": "Kilometri",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Ft",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "Metri",
      "acronym": "m"
    }
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
    "invalidUrlTip": "Adresa URL ${URL} este nevalidă sau inaccesibilă."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Setări căutare",
    "defaultBufferDistanceLabel": "Setare distanţă buffer implicită",
    "maxResultCountLabel": "Limitare număr rezultate",
    "maxResultCountHintLabel": "Sugestie: Setaţi numărul maxim de rezultate vizibile. Valoarea 1 va returna cel mai apropiat obiect spaţial",
    "maxBufferDistanceLabel": "Setare distanţă buffer maximă",
    "bufferDistanceUnitLabel": "Unităţi distanţă buffer",
    "defaultBufferHintLabel": "Sugestie: Setaţi valoarea implicită pentru glisorul de buffer",
    "maxBufferHintLabel": "Sugestie: Setaţi valoarea maximă pentru glisorul de buffer",
    "bufferUnitLabel": "Sugestie: Definiţi unităţile pentru crearea bufferului",
    "selectGraphicLocationSymbol": "Simbol adresă sau locaţie",
    "graphicLocationSymbolHintText": "Sugestie: Simbol pentru adresa căutată sau locaţia apăsată",
    "addressLocationPolygonHintText": "Sugestie: Simbol pentru stratul tematic de poligoane căutat",
    "popupTitleForPolygon": "Selectaţi un poligon pentru locaţia adresei selectate",
    "popupTitleForPolyline": "Selectaţi o linie pentru locaţia adresei",
    "addressLocationPolylineHintText": "Sugestie: Simbol pentru stratul tematic de linii poligonale căutat",
    "fontColorLabel": "Selectare culoare font pentru rezultatele căutării",
    "fontColorHintText": "Sugestie: Culoarea fontului pentru rezultatele căutării",
    "zoomToSelectedFeature": "Transfocaţi la obiectul spaţial selectat",
    "zoomToSelectedFeatureHintText": "Sugestie: Transfocaţi la obiectul spaţial selectat în locul bufferului",
    "intersectSearchLocation": "Se returnează poligoanele intersectate",
    "intersectSearchLocationHintText": "Sugestie: Returnaţi poligoanele care conţin locaţia căutată în locul poligoanelor din buffer",
    "enableProximitySearch": "Activare căutare de proximitate",
    "enableProximitySearchHintText": "Sugestie: activați abilitatea de a căuta locații în vecinătatea unui rezultat selectat",
    "bufferVisibilityLabel": "Setare vizibilitate buffer",
    "bufferVisibilityHintText": "Sugestie: Bufferul va fi afişat pe hartă",
    "bufferColorLabel": "Setaţi simbolul bufferului",
    "bufferColorHintText": "Sugestie: Selectaţi culoarea şi transparenţa bufferului",
    "searchLayerResultLabel": "Trasaţi numai rezultatele stratului tematic selectat",
    "searchLayerResultHint": "Sugestie: Pe hartă va fi trasat numai stratul tematic selectat din rezultatele de căutare",
    "showToolToSelectLabel": "Setare buton locaţie",
    "showToolToSelectHintText": "Sugestie: Furnizează un buton pentru a seta locaţia pe hartă în loc să seteze întotdeauna locaţia atunci când se face clic pe hartă",
    "geoDesicParamLabel": "Utilizare buffer geodezic",
    "geoDesicParamHintText": "Sugestie: Utilizaţi bufferul geodezic în locul celui euclidian (planar)"
  },
  "layerSelector": {
    "selectLayerLabel": "Selectare straturi tematice",
    "layerSelectionHint": "Sugestie: Utilizaţi butonul de setare pentru selectarea straturilor tematice",
    "addLayerButton": "Setare"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Setări indicaţii de deplasare",
    "routeServiceUrl": "Serviciu de rute",
    "buttonSet": "Setare",
    "routeServiceUrlHintText": "Sugestie: Faceţi clic pe â€˜Setareâ€™ pentru a răsfoi şi selecta un serviciu de rute",
    "directionLengthUnit": "Unităţi de lungime pentru indicaţiile de direcţie",
    "unitsForRouteHintText": "Sugestie: Utilizaţi pentru afişarea unităţilor pentru rută",
    "selectRouteSymbol": "Selectare simbol pentru afişarea rutei",
    "routeSymbolHintText": "Sugestie: Utilizat pentru afişarea simbolului liniei rutei",
    "routingDisabledMsg": "Pentru a activa indicaţiile de direcţie asiguraţi-vă că rutele sunt activate în cadrul elementului din setări aplicaţie."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Setări simboluri",
    "addSymbologyBtnLabel": "Adăugare simboluri noi",
    "layerNameTitle": "Nume strat tematic",
    "fieldTitle": "Câmp",
    "valuesTitle": "Valori",
    "symbolTitle": "Simbol",
    "actionsTitle": "Acţiuni",
    "invalidConfigMsg": "Câmp dublu: ${fieldName} pentru stratul tematic: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Setări filtru",
    "addTaskTip": "Adăugaţi unul sau mai multe filtre la strat(urile) de căutare selectat(e) și configuraţi parametrii pentru fiecare dintre acestea.",
    "enableMapFilter": "Eliminaţi filtrul stratului tematic presetat din hartă.",
    "newFilter": "Filtru nou",
    "filterExpression": "Expresie de filtrare",
    "layerDefaultSymbolTip": "Utilizaţi simbolul implicit al stratului tematic",
    "uploadImage": "Încărcaţi o imagine",
    "selectLayerTip": "Selectaţi un strat tematic.",
    "setTitleTip": "Setaţi titlul.",
    "noTasksTip": "Niciul filtru configurat. Faceţi clic pe \"${newFilter}\" pentru a adăuga unul.",
    "collapseFiltersTip": "Restrângeți expresiile de filtrare (dacă există) când se deschide controlul",
    "groupFiltersTip": "Gruparea filtrelor după stratul tematic"
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
  "errorStrings": {
    "bufferErrorString": "Vă rugăm să introduceţi o valoare numerică validă.",
    "selectLayerErrorString": "Vă rugăm să selectaţi straturile tematice pentru căutare.",
    "invalidDefaultValue": "Distanţă implicită buffer nu poate fi goală. Vă rugăm să specificaţi o distanţă buffer",
    "invalidMaximumValue": "Distanţă maximă buffer nu poate fi goală. Vă rugăm să specificaţi o distanţă buffer",
    "defaultValueLessThanMax": "Vă rugăm să specificaţi distanţa implicită buffer în cadrul limitei maxime",
    "defaultBufferValueGreaterThanOne": "Distanţa implicită a bufferului nu poate fi mai mică de 0",
    "maximumBufferValueGreaterThanOne": "Vă rugăm să specificaţi distanţa maximă buffer mai mare decât 0",
    "invalidMaximumResultCountValue": "Specificaţi valoarea validă pentru numărul maxim de rezultate",
    "invalidSearchSources": "Setări nevalide sursă căutare"
  },
  "symbolPickerPreviewText": "Previzualizare:"
});