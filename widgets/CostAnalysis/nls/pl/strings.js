///////////////////////////////////////////////////////////////////////////
// Copyright © 2017 Esri. All Rights Reserved.
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
  "_widgetLabel": "Analiza kosztów (wersja beta)",
  "unableToFetchInfoErrMessage": "Nie można pobrać szczegółów skonfigurowanej warstwy lub usługi geometrii",
  "invalidCostingGeometryLayer": "Nie można uzyskać wartości 'esriFieldTypeGlobalID' w warstwie geometrii kalkulacji kosztów.",
  "projectLayerNotFound": "Nie można znaleźć skonfigurowanej warstwy projektu na mapie.",
  "costingGeometryLayerNotFound": "Nie można znaleźć skonfigurowanej warstwy geometrii kalkulacji kosztów na mapie.",
  "projectMultiplierTableNotFound": "Nie można znaleźć skonfigurowanej tabeli kosztów dodatkowych mnożnika projektu na mapie.",
  "projectAssetTableNotFound": "Nie można znaleźć skonfigurowanej tabeli zasobów projektu na mapie.",
  "createLoadProject": {
    "createProjectPaneTitle": "Utwórz projekt",
    "loadProjectPaneTitle": "Wczytaj projekt",
    "projectNamePlaceHolder": "Nazwa projektu",
    "projectDescPlaceHolder": "Opis projektu",
    "selectProject": "Wybierz projekt",
    "viewInMapLabel": "Wyświetl na mapie",
    "loadLabel": "Wczytaj",
    "createLabel": "Tworzenie",
    "deleteProjectConfirmationMsg": "Czy na pewno chcesz usunąć projekt?",
    "noAssetsToViewOnMap": "Wybrany projekt nie zawiera żadnych zasobów do wyświetlenia na mapie.",
    "projectDeletedMsg": "Projekt został pomyślnie usunięty.",
    "errorInCreatingProject": "Wystąpił błąd podczas tworzenia projektu.",
    "errorProjectNotFound": "Nie znaleziono projektu.",
    "errorInLoadingProject": "Sprawdź, czy wybrano prawidłowy projekt.",
    "errorProjectNotSelected": "Wybierz projekt z menu rozwijanego",
    "errorDuplicateProjectName": "Nazwa projektu już istnieje."
  },
  "statisticsSettings": {
    "tabTitle": "Ustawienia statystyki",
    "addStatisticsLabel": "Dodaj statystykę",
    "addNewStatisticsText": "Dodaj nową statystykę",
    "deleteStatisticsText": "Usuń statystykę",
    "moveStatisticsUpText": "Przesuń statystykę w górę",
    "moveStatisticsDownText": "Przesuń statystykę w dół",
    "layerNameTitle": "Warstwa",
    "statisticsTypeTitle": "Folder nie zawiera prawidłowego projektu aplikacji",
    "fieldNameTitle": "Pole",
    "statisticsTitle": "Etykieta",
    "actionLabelTitle": "Działania",
    "selectDeselectAllTitle": "Zaznacz wszystkie"
  },
  "statisticsType": {
    "countLabel": "Liczba",
    "averageLabel": "Średnia",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Zsumowanie",
    "areaLabel": "Pole powierzchni",
    "lengthLabel": "Długość"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Warstwy, które należy oznaczyć jako możliwe do edycji na karcie ustawień warstwy"
  },
  "workBench": {
    "refresh": "Odśwież",
    "noAssetAddedMsg": "Nie dodano zasobów",
    "units": "jednostki",
    "assetDetailsTitle": "Szczegóły elementu zasobu",
    "costEquationTitle": "Równanie kosztów",
    "newCostEquationTitle": "Nowe równanie",
    "defaultCostEquationTitle": "Domyślne równanie",
    "geographyTitle": "Obszar geograficzny",
    "scenarioTitle": "Scenariusz",
    "costingInfoHintText": "<div>Wskazówka: użyj następujących słów kluczowych</div><ul><li><b>{TOTALCOUNT}</b>: używa łącznej liczby zasobów tego samego typu w obszarze geograficznym</li><li><b>{MEASURE}</b>: używa długości dla zasobu liniowego i pola powierzchni dla zasobu poligonowego</li><li><b>{TOTALMEASURE}</b>: używa łącznej długości dla zasobu liniowego i łącznego pola powierzchni dla zasobu poligonowego tego samego typu w obszarze geograficznym</li></ul> Możesz użyć funkcji, takich jak:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Należy zmodyfikować równanie kosztów zgodnie z wymaganiami projektu.",
    "zoomToAsset": "Powiększ do zasobu",
    "deleteAsset": "Usuń zasób",
    "closeDialog": "Zamknij okno",
    "objectIdColTitle": "Identyfikator obiektu",
    "costColTitle": "Koszt",
    "errorInvalidCostEquation": "Nieprawidłowe równanie kosztów.",
    "errorInSavingAssetDetails": "Nie można zapisać szczegółów zasobu."
  },
  "assetDetails": {
    "inGeography": " w ${geography} ",
    "withScenario": " z ${scenario}",
    "totalCostTitle": "Koszt całkowity",
    "additionalCostLabel": "Opis",
    "additionalCostValue": "Wartość",
    "additionalCostNetValue": "Wartość netto"
  },
  "projectOverview": {
    "assetItemsTitle": "Elementy zasobów",
    "assetStatisticsTitle": "Statystyki zasobów",
    "projectSummaryTitle": "Podsumowanie projektu",
    "projectName": "Nazwa projektu: ${name}",
    "totalCostLabel": "Całkowity koszt projektu (*):",
    "grossCostLabel": "Koszt brutto projektu (*):",
    "roundingLabel": "* Po zaokrągleniu do '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Nie można zapisać granic projektu w warstwie projektu.",
    "unableToSaveProjectCost": "Nie można zapisać kosztów w warstwie projektu.",
    "roundCostValues": {
      "twoDecimalPoint": "Dwa miejsca po przecinku",
      "nearestWholeNumber": "Najbliższa liczba całkowita",
      "nearestTen": "Najbliższa dziesiątka",
      "nearestHundred": "Najbliższa setka",
      "nearestThousand": "Najbliższe tysiące",
      "nearestTenThousands": "Najbliższe dziesiątki tysięcy"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Atrybut projektu",
    "projectAttributeTitle": "Edytuj atrybuty projektu"
  },
  "costEscalation": {
    "costEscalationLabel": "Dodaj koszt dodatkowy",
    "valueHeader": "Wartość",
    "addCostEscalationText": "Dodaj koszt dodatkowy",
    "deleteCostEscalationText": "Usuń wybrany koszt dodatkowy",
    "moveCostEscalationUpText": "Przenieś wybrany koszt dodatkowy w górę",
    "moveCostEscalationDownText": "Przenieś wybrany koszt dodatkowy w dół",
    "invalidEntry": "Co najmniej jeden wpis jest nieprawidłowy.",
    "errorInSavingCostEscalation": "Nie można zapisać szczegółów kosztu dodatkowego."
  },
  "scenarioSelection": {
    "popupTitle": "Wybierz scenariusz dla zasobu",
    "regionLabel": "Obszar geograficzny",
    "scenarioLabel": "Scenariusz",
    "noneText": "Brak",
    "copyFeatureMsg": "Czy chcesz skopiować wybrane obiekty?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Szczegółowe statystyki",
    "noDetailStatisticAvailable": "Nie dodano statystyk zasobu"
  }
});