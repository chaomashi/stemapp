///////////////////////////////////////////////////////////////////////////
// Copyright © 2016 Esri. All Rights Reserved.
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
  "_widgetLabel": "Klasyfikowanie",
  "geometryServicesNotFound": "Usługa geometrii jest niedostępna.",
  "unableToDrawBuffer": "Nie można wyświetlić bufora. Spróbuj ponownie.",
  "invalidConfiguration": "Nieprawidłowa konfiguracja",
  "clearAOIButtonLabel": "Rozpocznij od nowa",
  "noGraphicsShapefile": "Przesłany plik shape nie zawiera grafik.",
  "zoomToLocationTooltipText": "Powiększ do lokalizacji",
  "noGraphicsToZoomMessage": "Nie znaleziono grafik do powiększenia.",
  "placenameWidget": {
    "placenameLabel": "Wyszukaj lokalizację"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Wybierz tryb rysowania",
    "toggleSelectability": "Kliknij, aby przełączyć możliwość wybierania",
    "chooseLayerTitle": "Wybierz warstwę możliwą do zaznaczenia",
    "selectAllLayersText": "Zaznacz wszystkie",
    "layerSelectionWarningTooltip": "Aby utworzyć obszar zainteresowania, należy zaznaczyć co najmniej jedną warstwę"
  },
  "shapefileWidget": {
    "shapefileLabel": "Prześlij spakowany plik shape",
    "uploadShapefileButtonText": "Prześlij",
    "unableToUploadShapefileMessage": "Nie można przesłać pliku shape."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Zdefiniuj punkt początkowy",
    "addButtonTitle": "Dodaj",
    "deleteButtonTitle": "Usuń",
    "mapTooltipForStartPoint": "Kliknij mapę, aby zdefiniować punkt początkowy",
    "mapTooltipForUpdateStartPoint": "Kliknij mapę, aby zaktualizować punkt początkowy",
    "locateText": "Lokalizuj",
    "locateByMapClickText": "Wybierze współrzędne początkowe",
    "enterBearingAndDistanceLabel": "Wprowadź kąt kierunkowy i odległość od punktu początkowego",
    "bearingTitle": "Kąt kierunkowy",
    "distanceTitle": "Odległość",
    "planSettingTooltip": "Ustawienia planu",
    "invalidLatLongMessage": "Wprowadź prawidłowe wartości."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Odległość wyszukiwania (opcjonalnie)",
    "bufferInputLabel": "Wyświetl wyniki w obrębie"
  },
  "traverseSettings": {
    "bearingLabel": "Kąt kierunkowy",
    "lengthLabel": "długość",
    "addButtonTitle": "Dodaj",
    "deleteButtonTitle": "Usuń"
  },
  "planSettings": {
    "expandGridTooltipText": "Rozwiń siatkę",
    "collapseGridTooltipText": "Zwiń siatkę",
    "directionUnitLabelText": "Jednostka kierunku",
    "distanceUnitLabelText": "Jednostki odległości i długości",
    "planSettingsComingSoonText": "Już wkrótce"
  },
  "newTraverse": {
    "invalidBearingMessage": "Nieprawidłowy kąt kierunkowy.",
    "invalidLengthMessage": "Nieprawidłowa długość.",
    "negativeLengthMessage": "Ujemna długość"
  },
  "reportsTab": {
    "aoiAreaText": "Powierzchnia obszaru zainteresowania",
    "downloadButtonTooltip": "Pobierz",
    "printButtonTooltip": "Drukuj",
    "uploadShapefileForAnalysisText": "Przekaż plik shape do uwzględnienia w analizie",
    "uploadShapefileForButtonText": "Przeglądaj",
    "downloadLabelText": "Wybierz format:",
    "downloadBtnText": "Pobierz",
    "noDetailsAvailableText": "Nie odnaleziono wyników",
    "featureCountText": "Liczba",
    "featureAreaText": "obszar",
    "featureLengthText": "długość",
    "attributeChooserTooltip": "Wybierz atrybuty do wyświetlenia",
    "csv": "CSV",
    "filegdb": "Geobaza plikowa",
    "shapefile": "Plik shape",
    "noFeaturesFound": "Nie znaleziono wyników dla wybranego formatu pliku",
    "selectReportFieldTitle": "Wybierz pola",
    "noFieldsSelected": "Nie wybrano pól",
    "intersectingFeatureExceedsMsgOnCompletion": "Osiągnięto maksymalną liczbę rekordów dla co najmniej jednej warstwy.",
    "unableToAnalyzeText": "Nie można przeprowadzić analizy. Osiągnięto maksymalną liczbę rekordów.",
    "errorInPrintingReport": "Nie można wydrukować raportu. Sprawdź, czy ustawienia raportu są prawidłowe.",
    "aoiInformationTitle": "Informacje o obszarze zainteresowania",
    "summaryReportTitle": "Podsumowanie",
    "notApplicableText": "Nie dotyczy",
    "downloadReportConfirmTitle": "Potwierdź pobieranie",
    "downloadReportConfirmMessage": "Czy na pewno chcesz pobrać plik?",
    "noDataText": "Brak danych",
    "createReplicaFailedMessage": "Operacja pobierania nie powiodła się dla następujących warstw: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Operacja pobierania nie powiodła się.",
    "printLayoutLabelText": "Kompozycja",
    "printBtnText": "Drukuj",
    "printDialogHint": "Uwaga: Tytuł raportu i komentarze można edytować w podglądzie raportu.",
    "unableToDownloadFileGDBText": "Nie można pobrać geobazy plikowej w przypadku obszaru zainteresowania zawierającego lokalizacje punktów lub linii",
    "unableToDownloadShapefileText": "Nie można pobrać pliku shape w przypadku obszaru zainteresowania zawierającego lokalizacje punktów lub linii",
    "analysisUnitLabelText": "Pokaż wyniki w:",
    "analysisUnitButtonTooltip": "Wybierz jednostki do analizy",
    "analysisCloseBtnText": "Zamknij",
    "feetUnit": "Stopy / Stopy kwadratowe",
    "milesUnit": "Mile / Akry",
    "metersUnit": "Metry / Metry kwadratowe",
    "kilometersUnit": "Kilometry / Kilometry kwadratowe",
    "hectaresUnit": "Kilometry / Hektary",
    "hectaresAbbr": "hektary",
    "layerNotVisibleText": "Nie można przeprowadzić analizy, warstwa jest wyłączona lub jest poza zakresem skali widoczności.",
    "refreshBtnTooltip": "Odśwież raport",
    "featureCSVAreaText": "Obszar przecinania",
    "featureCSVLengthText": "Długość przecinania",
    "errorInFetchingPrintTask": "Wystąpił błąd podczas pobierania informacji o zadaniu drukowania. Spróbuj ponownie."
  }
});