/*
 | Copyright 2017 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define({
  "searchSourceSetting": {
    "title": "Ustawienia wyszukiwania i buforowania",
    "mainHint": "Można włączyć wyszukiwanie tekstowe adresów i obiektów, digitalizację geometrii oraz buforowanie."
  },
  "addressSourceSetting": {
    "title": "Warstwy adresów",
    "mainHint": "Można podać, które warstwy etykiet adresów są dostępne."
  },
  "notificationSetting": {
    "title": "Opcje powiadomień",
    "mainHint": "Można podać, które typy powiadomień są dostępne."
  },
  "groupingLabels": {
    "addressSources": "Warstwa, która ma być używana do wyboru warstw adresów",
    "averyStickersDetails": "Naklejki Avery(r)",
    "csvDetails": "Plik z wartościami rozdzielanymi przecinkami (CSV)",
    "drawingTools": "Narzędzia rysowania do określania obszaru",
    "featureLayerDetails": "Warstwa obiektowa",
    "geocoderDetails": "Geokoder",
    "labelFormats": "Dostępne formaty etykiet",
    "printingOptions": "Opcje drukowanych stron etykiet",
    "searchSources": "Źródła wyszukiwania",
    "stickerFormatDetails": "Parametry strony etykiet"
  },
  "hints": {
    "alignmentAids": "Znaczniki dodawane do strony etykiet, które są pomocne przy dostosowywaniu strony do używanej drukarki",
    "csvNameList": "Lista rozdzielanych przecinkami nazw pól, w których rozróżniana jest wielkość liter",
    "horizontalGap": "Spacja między dwiema etykietami w wierszu",
    "insetToLabel": "Spacja między krawędzią etykiety a początkiem tekstu",
    "labelFormatDescription": "Sposób przedstawiania stylu etykiety na liście opcji formatowania widżetu",
    "labelFormatDescriptionHint": "Etykieta narzędzia uzupełniająca opis na liście opcji formatowania",
    "labelHeight": "Wysokość poszczególnych etykiet na stronie",
    "labelWidth": "Szerokość poszczególnych etykiet na stronie",
    "localSearchRadius": "Określa promień obszaru wokół centrum bieżącej mapy używanego do przyspieszenia oceny propozycji geokodowania, aby propozycje znajdujące się najbliżej lokalizacji były zwracane jako pierwsze",
    "rasterResolution": "100 pikseli na cal w przybliżeniu pasuje do rozdzielczości ekranu. Im wyższa rozdzielczość, tym więcej potrzeba pamięci przeglądarki. Różne przeglądarki mają różne możliwości odpowiedniej obsługi dużego zapotrzebowania na pamięć.",
    "selectionListOfOptionsToDisplay": "Zaznaczone elementy są wyświetlane jako opcje w widżecie, kolejność można zmienić według potrzeb",
    "verticalGap": "Spacja między dwiema etykietami w kolumnie"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Domyślna odległość buforowania",
    "bufferUnits": "Jednostki buforowania do podania w widżecie",
    "countryRegionCodes": "Kody kraju lub regionu",
    "description": "Opis",
    "descriptionHint": "Wskazówka dotycząca opisu",
    "displayField": "Pole wyświetlania",
    "drawingToolsFreehandPolygon": "poligon odręczny",
    "drawingToolsLine": "linia",
    "drawingToolsPoint": "punkt",
    "drawingToolsPolygon": "polygon",
    "drawingToolsPolyline": "polyline",
    "enableLocalSearch": "Włącz wyszukiwanie lokalne",
    "exactMatch": "Dokładne dopasowanie",
    "fontSizeAlignmentNote": "Rozmiar czcionki dla notatek na marginesach wydruku",
    "gridDarkness": "Zaciemnienie siatki",
    "gridlineLeftInset": "Ramka linii siatki z lewej strony",
    "gridlineMajorTickMarksGap": "Znacznik główny zaznacza wszystko",
    "gridlineMinorTickMarksGap": "Znacznik pomocniczy zaznacza wszystko",
    "gridlineRightInset": "Ramka linii siatki z prawej strony",
    "labelBorderDarkness": "Zaciemnienie ramki etykiety",
    "labelBottomEdge": "Dolna krawędź etykiet na stronie",
    "labelFontSize": "Rozmiar czcionki",
    "labelHeight": "Wysokość etykiety",
    "labelHorizontalGap": "Odstęp w poziomie",
    "labelInitialInset": "Ramka tekstu etykiety",
    "labelLeftEdge": "Lewa krawędź etykiet na stronie",
    "labelMaxLineCount": "Maksymalna liczba wierszy na etykiecie",
    "labelPageHeight": "Wysokość strony",
    "labelPageWidth": "Szerokość strony",
    "labelRightEdge": "Prawa krawędź etykiet na stronie",
    "labelsInAColumn": "Liczba etykiet w kolumnie",
    "labelsInARow": "Liczba etykiet w wierszu",
    "labelTopEdge": "Górna krawędź etykiet na stronie",
    "labelVerticalGap": "Odstęp w pionie",
    "labelWidth": "Szerokość etykiety",
    "limitSearchToMapExtent": "Wyszukaj tylko w bieżącym zasięgu mapy",
    "maximumResults": "Maksymalna liczba wyników",
    "maximumSuggestions": "Maksymalna liczba sugestii",
    "minimumScale": "Skala minimalna",
    "name": "Nazwa",
    "percentBlack": "% czarnego",
    "pixels": "piksele",
    "pixelsPerInch": "piksele na cal",
    "placeholderText": "Tekst zastępczy",
    "placeholderTextForAllSources": "Tekst zastępczy przeszukiwania wszystkich źródeł",
    "radius": "Promień",
    "rasterResolution": "Rozdzielczość rastra",
    "searchFields": "Pola wyszukiwania",
    "showAlignmentAids": "Pokaż na stronie elementy wspomagające wyrównywanie",
    "showGridTickMarks": "Pokaż znaczniki siatki",
    "showLabelOutlines": "Pokaż obrysy etykiety",
    "showPopupForFoundItem": "Wyświetl odrębne okno ze znalezionym elementem: obiektem lub miejscem",
    "tool": "Narzędzia",
    "units": "Jednostki",
    "url": "Adres URL",
    "urlToGeometryService": "Adres URL do usługi geometrii",
    "useRelatedRecords": "Użyj jego powiązanych rekordów",
    "useSecondarySearchLayer": "Użyj warstwy dodatkowego wyboru",
    "useSelectionDrawTools": "Użyj narzędzi rysowania zaznaczenia",
    "useVectorFonts": "Użyj czcionek wektorowych (tylko czcionki łacińskie)",
    "zoomScale": "Skala powiększenia"
  },
  "buttons": {
    "addAddressSource": "Dodaj warstwę zawierającą etykiety adresowe w jej oknie podręcznym",
    "addLabelFormat": "Dodaj format etykiety",
    "addSearchSource": "Dodaj źródło wyszukiwania",
    "set": "Ustaw"
  },
  "placeholders": {
    "averyExample": "np. Etykieta Avery(r) ${averyPartNumber}",
    "countryRegionCodes": "np. USA,CHN",
    "descriptionCSV": "Wartości rozdzielane przecinkami",
    "descriptionPDF": "Etykieta pliku PDF ${heightLabelIn} x ${widthLabelIn} cale(i); ${labelsPerPage} na stronę"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Pobierz warstwę obiektową z mapy internetowej",
    "openCountryCodes": "Kliknij, aby pobrać więcej informacji o kodach",
    "openFieldSelector": "Kliknij, aby otworzyć selektor pól",
    "setAndValidateURL": "Ustaw adres URL i sprawdź jego poprawność"
  },
  "problems": {
    "noAddresseeLayers": "Określ co najmniej jedną warstwę adresów",
    "noBufferUnitsForDrawingTools": "Skonfiguruj co najmniej jedną jednostkę buforowania dla narzędzi rysowania",
    "noBufferUnitsForSearchSource": "Skonfiguruj co najmniej jedną jednostkę buforowania dla źródła wyszukiwania \"${sourceName}\"",
    "noGeometryServiceURL": "Skonfiguruj adres URL usługi geometrii",
    "noNotificationLabelFormats": "Określ co najmniej jeden format etykiety powiadomienia",
    "noSearchSourceFields": "Skonfiguruj jedno lub większą liczbę pól wyszukiwania dla źródła wyszukiwania \"${sourceName}\"",
    "noSearchSourceURL": "Skonfiguruj adres URL dla źródła wyszukiwania \"${sourceName}\""
  }
});