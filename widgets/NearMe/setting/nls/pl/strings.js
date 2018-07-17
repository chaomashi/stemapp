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
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Kilometry",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Stopy",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "Metry",
      "acronym": "m"
    }
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
    "invalidUrlTip": "Adres URL ${URL} jest nieprawidłowy lub nieosiągalny."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Ustawienia wyszukiwania",
    "defaultBufferDistanceLabel": "Ustaw domyślną odległość buforowania",
    "maxResultCountLabel": "Ogranicz liczbę wyników",
    "maxResultCountHintLabel": "Wskazówka: ustaw maksymalną liczbę widocznych wyników. Wartość 1 spowoduje zwrócenie najbliższego obiektu",
    "maxBufferDistanceLabel": "Ustaw maksymalną odległość buforowania",
    "bufferDistanceUnitLabel": "Jednostki odległości buforowania",
    "defaultBufferHintLabel": "Wskazówka: ustaw wartość domyślną dla suwaka bufora",
    "maxBufferHintLabel": "Wskazówka: ustaw wartość maksymalną dla suwaka bufora",
    "bufferUnitLabel": "Wskazówka: zdefiniuj jednostkę na potrzeby tworzenia bufora",
    "selectGraphicLocationSymbol": "Adres lub symbol lokalizacji",
    "graphicLocationSymbolHintText": "Wskazówka: symbol wyszukiwanego adresu lub kliknięta lokalizacja",
    "addressLocationPolygonHintText": "Wskazówka: Symbol szukanej warstwy poligonowej",
    "popupTitleForPolygon": "Wybierz poligon dla wybranej lokalizacji adresu",
    "popupTitleForPolyline": "Wybierz linię dla lokalizacji adresu",
    "addressLocationPolylineHintText": "Wskazówka: Symbol szukanej warstwy poliliniowej",
    "fontColorLabel": "Wybierz kolor czcionki dla wyników wyszukiwania",
    "fontColorHintText": "Wskazówka: kolor czcionki dla wyników wyszukiwania",
    "zoomToSelectedFeature": "Powiększ do wybranego obiektu",
    "zoomToSelectedFeatureHintText": "Wskazówka: powiększ do wybranego obiektu zamiast do bufora",
    "intersectSearchLocation": "Zwróć przecinające się poligony",
    "intersectSearchLocationHintText": "Wskazówka: zwraca poligony zawierające szukaną lokalizację, a nie poligony w zasięgu bufora",
    "enableProximitySearch": "Włącz wyszukiwanie w pobliżu",
    "enableProximitySearchHintText": "Wskazówka: włącz funkcję wyszukiwania lokalizacji w pobliżu wybranego wyniku",
    "bufferVisibilityLabel": "Ustaw widoczność bufora",
    "bufferVisibilityHintText": "Wskazówka: bufor zostanie wyświetlony na mapie",
    "bufferColorLabel": "Ustaw symbol bufora",
    "bufferColorHintText": "Wskazówka: wybierz kolor i przezroczystość bufora",
    "searchLayerResultLabel": "Wyświetl tylko wybraną warstwę wyników",
    "searchLayerResultHint": "Wskazówka: na mapie zostanie wyświetlona tylko warstwa wybrana w wynikach wyszukiwania",
    "showToolToSelectLabel": "Ustaw przycisk lokalizacji",
    "showToolToSelectHintText": "Wskazówka: umożliwia podanie przycisku umożliwiającego ustawienie lokalizacji na mapie. Dzięki niemu nie trzeba ustawiać lokalizacji po każdym kliknięciu mapy",
    "geoDesicParamLabel": "Użyj bufora geodezyjnego",
    "geoDesicParamHintText": "Wskazówka: użyj bufora geodezyjnego zamiast bufora euklidesowego (płaskiego)"
  },
  "layerSelector": {
    "selectLayerLabel": "Wybierz warstwy wyszukiwania",
    "layerSelectionHint": "Wskazówka: użyj przycisku ustawiania, aby wybrać warstwy",
    "addLayerButton": "Ustaw"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Ustawienia wskazówek dojazdu",
    "routeServiceUrl": "Usługa wyznaczania trasy",
    "buttonSet": "Ustaw",
    "routeServiceUrlHintText": "Wskazówka: kliknij przycisk Ustaw, aby wybrać usługę wyznaczania trasy",
    "directionLengthUnit": "Jednostki długości używane wskazówek dojazdu",
    "unitsForRouteHintText": "Wskazówka: służy do wyświetlania jednostek używanych dla wyznaczonej trasy",
    "selectRouteSymbol": "Wybierz symbol, aby wyświetlić trasę",
    "routeSymbolHintText": "Wskazówka: służy do wyświetlania symbolu liniowego trasy",
    "routingDisabledMsg": "Aby włączyć wskazówki dojazdu, włącz wyznaczanie tras dla elementu w ustawieniach aplikacji."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Ustawienia symbolizacji",
    "addSymbologyBtnLabel": "Dodaj nowe symbole",
    "layerNameTitle": "Nazwa warstwy tematycznej",
    "fieldTitle": "Pole",
    "valuesTitle": "Wartości",
    "symbolTitle": "Symbol",
    "actionsTitle": "Działania",
    "invalidConfigMsg": "Zduplikowane pole: ${fieldName} dla warstwy: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Ustawienia filtru",
    "addTaskTip": "Dodaj jeden lub większą liczbę filtrów do wybranych warstw wyszukiwania i skonfiguruj parametry dla każdego z nich.",
    "enableMapFilter": "Usuń wstępnie ustawiony filtr warstw z mapy.",
    "newFilter": "Nowy filtr",
    "filterExpression": "Wyrażenie filtrujące",
    "layerDefaultSymbolTip": "Użyj symbolu domyślnego warstwy",
    "uploadImage": "Prześlij obraz",
    "selectLayerTip": "Wybierz warstwę.",
    "setTitleTip": "Skonfiguruj tytuł.",
    "noTasksTip": "Nie skonfigurowano żadnych filtrów. Kliknij opcję \"${newFilter}\", aby dodać nowy filtr.",
    "collapseFiltersTip": "Po otwarciu widżetu zwijaj wyrażenia filtrujące (jeśli istnieją)",
    "groupFiltersTip": "Filtry grup według warstw"
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
  "errorStrings": {
    "bufferErrorString": "Wpisz prawidłową wartość numeryczną.",
    "selectLayerErrorString": "Wybierz warstwy do wyszukiwania.",
    "invalidDefaultValue": "Domyślna odległość buforowania nie może być pusta. Podaj odległość buforowania",
    "invalidMaximumValue": "Maksymalna odległość buforowania nie może być pusta. Podaj odległość buforowania",
    "defaultValueLessThanMax": "Podaj domyślną odległość buforowania w ramach limitu",
    "defaultBufferValueGreaterThanOne": "Domyślna odległość buforowania nie może być mniejsza niż 0",
    "maximumBufferValueGreaterThanOne": "Określ maksymalną odległość buforowania większą niż 0",
    "invalidMaximumResultCountValue": "Podaj prawidłową wartość maksymalnej liczby wyników",
    "invalidSearchSources": "Nieprawidłowe ustawienia źródła wyszukiwania"
  },
  "symbolPickerPreviewText": "Zobacz podgląd:"
});