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
    "kilometers": "Kilometry",
    "feet": "Stopy",
    "meters": "Metry"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Ustawienia wyszukiwania",
    "buttonSet": "Ustaw",
    "selectLayersLabel": "Zaznacz warstwę",
    "selectLayersHintText": "Wskazówka: służy do wybierania warstwy poligonowej i powiązanej z nią warstwy punktowej.",
    "selectPrecinctSymbolLabel": "Wybierz symbol, aby wyróżnić poligon",
    "selectGraphicLocationSymbol": "Adres lub symbol lokalizacji",
    "graphicLocationSymbolHintText": "Wskazówka: symbol wyszukiwanego adresu lub kliknięta lokalizacja",
    "precinctSymbolHintText": "Wskazówka: służy do wyświetlania symbolu dla wybranego poligonu",
    "selectColorForPoint": "Wybierz kolor w celu wyróżnienia punktu",
    "selectColorForPointHintText": "Wskazówka: służy do wyświetlania koloru wyróżnienia dla wybranego punktu"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Ustawienia źródła wyszukiwania",
    "searchSourceSettingTitle": "Ustawienia źródła wyszukiwania",
    "searchSourceSettingTitleHintText": "Dodaj i skonfiguruj usługi geokodowania lub warstwy obiektów jako źródła wyszukiwania. Źródła te określają, co można wyszukiwać w oknie wyszukiwania.",
    "addSearchSourceLabel": "Dodaj źródło wyszukiwania",
    "featureLayerLabel": "Warstwa obiektów",
    "geocoderLabel": "Geokoder",
    "nameTitle": "Nazwa",
    "generalSettingLabel": "Ustawienia ogólne",
    "allPlaceholderLabel": "Tekst zastępczy dla wyszukiwania wszystkich:",
    "allPlaceholderHintText": "Wskazówka: wprowadź tekst zastępczy wyświetlany podczas przeszukiwania wszystkich warstw i geokodera",
    "generalSettingCheckboxLabel": "Wyświetl odrębne okno ze znalezionym elementem: obiektem lub miejscem",
    "countryCode": "Kod kraju lub regionu",
    "countryCodeEg": "np. ",
    "countryCodeHint": "Pozostawienie pustego pola uruchomi wyszukiwanie we wszystkich krajach i regionach",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Wyszukaj tylko w bieżącym zasięgu mapy",
    "zoomScale": "Skala powiększenia",
    "locatorUrl": "Adres URL geokodera",
    "locatorName": "Nazwa geokodera",
    "locatorExample": "Przykład",
    "locatorWarning": "Ta wersja usługi geokodowania nie jest obsługiwana. Widżet obsługuje usługę geokodowania w wersji 10.0 i nowszych.",
    "locatorTips": "Sugestie są niedostępne ponieważ usługa geokodowania nie obsługuje funkcji sugestii.",
    "layerSource": "Źródło warstwy",
    "setLayerSource": "Skonfiguruj źródło warstwy",
    "setGeocoderURL": "Skonfiguruj adres URL geokodera",
    "searchLayerTips": "Sugestie są niedostępne ponieważ usługa obiektowa nie obsługuje funkcji paginacji.",
    "placeholder": "Tekst zastępczy",
    "searchFields": "Pola wyszukiwania",
    "displayField": "Pole wyświetlania",
    "exactMatch": "Dokładne dopasowanie",
    "maxSuggestions": "Maksymalna liczba sugestii",
    "maxResults": "Wyniki maksymalne",
    "enableLocalSearch": "Włącz wyszukiwanie lokalne",
    "minScale": "Skala min.",
    "minScaleHint": "Kiedy skala mapy będzie większa niż ta skala, zostanie zastosowane wyszukiwanie lokalne",
    "radius": "Promień",
    "radiusHint": "Określa promień obszaru wokół bieżącego centrum mapy używanego do przyspieszenia oceny propozycji geokodowania, aby propozycje znajdujące się najbliżej lokalizacji były zwracane jako pierwsze",
    "meters": "Metry",
    "setSearchFields": "Skonfiguruj pola wyszukiwania",
    "set": "Ustaw",
    "fieldName": "Nazwa",
    "invalidUrlTip": "Adres URL ${URL} jest nieprawidłowy lub nieosiągalny.",
    "invalidSearchSources": "Nieprawidłowe ustawienia źródła wyszukiwania"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Wybierz warstwę poligonową",
    "selectPolygonLayerHintText": "Wskazówka: służy do wyboru warstwy poligonowej.",
    "selectRelatedPointLayerLabel": "Wybierz warstwę punktową powiązaną z warstwą poligonową",
    "selectRelatedPointLayerHintText": "Wskazówka: służy do wyboru warstwy punktowej powiązanej z warstwą poligonową",
    "polygonLayerNotHavingRelatedLayer": "Wybierz warstwę poligonową, która ma powiązaną warstwę punktową.",
    "errorInSelectingPolygonLayer": "Wybierz warstwę poligonową, która ma powiązaną warstwę punktową.",
    "errorInSelectingRelatedLayer": "Wybierz warstwę punktową powiązaną z warstwą poligonową"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Ustawienia wskazówek dojazdu",
    "routeServiceUrl": "Usługa wyznaczania trasy",
    "buttonSet": "Ustaw",
    "routeServiceUrlHintText": "Wskazówka: kliknij przycisk Set (Ustaw), aby wybrać usługę wyznaczania trasy dla usługi sieciowej",
    "directionLengthUnit": "Jednostki długości używane wskazówek dojazdu",
    "unitsForRouteHintText": "Wskazówka: służy do wyświetlania raportowanych jednostek używanych dla trasy",
    "selectRouteSymbol": "Wybierz symbol, aby wyświetlić trasę",
    "routeSymbolHintText": "Wskazówka: służy do wyświetlania symbolu liniowego trasy",
    "routingDisabledMsg": "Aby włączyć wskazówki dojazdu, włącz trasowanie (routing) w elemencie usługi ArcGIS Online."
  },
  "networkServiceChooser": {
    "arcgislabel": "Dodaj z usługi ArcGIS Online",
    "serviceURLabel": "Dodaj adres URL usługi",
    "routeURL": "Adres URL trasy",
    "validateRouteURL": "Sprawdź poprawność",
    "exampleText": "Przykład",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Podaj prawidłową usługę wyznaczania tras.",
    "rateLimitExceeded": "Przekroczono limit szybkości. Spróbuj ponownie później.",
    "errorInvokingService": "Nazwa użytkownika lub hasło jest nieprawidłowe."
  },
  "symbolPickerPreviewText": "Zobacz podgląd:",
  "showToolToSelectLabel": "Ustaw przycisk lokalizacji",
  "showToolToSelectHintText": "Wskazówka: umożliwia podanie przycisku umożliwiającego ustawienie lokalizacji na mapie. Dzięki niemu nie trzeba ustawiać lokalizacji po każdym kliknięciu mapy"
});