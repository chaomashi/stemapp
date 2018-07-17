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
  "_widgetLabel": "Разработчик участка",
  "newTraverseButtonLabel": "Начать новый теодолитный ход",
  "invalidConfigMsg": "Недопустимая конфигурация.",
  "geometryServiceURLNotFoundMSG": "Не удалось получить доступ URL сервиса геометрии",
  "editTraverseButtonLabel": "Редактировать ход",
  "mapTooltipForStartNewTraverse": "Выберите точку на карте или напечатайте ниже для начала",
  "mapTooltipForEditNewTraverse": "Выберите участок для редактирования",
  "mapTooltipForUpdateStartPoint": "Щелкните, чтобы обновить начальную точку",
  "mapTooltipForScreenDigitization": "Щелкните, чтобы добавить точку участка",
  "mapTooltipForRotate": "Перетащите, чтобы повернуть",
  "mapTooltipForScale": "Потянуть к шкале",
  "backButtonTooltip": "Назад",
  "newTraverseTitle": "Новый теодолитный ход",
  "editTraverseTitle": "Редактировать ход",
  "clearingDataConfirmationMessage": "Изменения будут проигнорированы, вы хотите продолжить?",
  "unableToFetchParcelMessage": "Не удалось получить участок.",
  "unableToFetchParcelLinesMessage": "Не удалось получить линии.",
  "planSettings": {
    "planSettingsTitle": "Настройки",
    "directionOrAngleTypeLabel": "Направление или тип угла",
    "directionOrAngleUnitsLabel": "Единицы направления и угла",
    "distanceAndLengthUnitsLabel": "Расстояние и единицы длины",
    "areaUnitsLabel": "Единицы площади",
    "circularCurveParameters": "Параметры дуги окружности",
    "northAzimuth": "Северный азимут",
    "southAzimuth": "Южный азимут",
    "quadrantBearing": "Румб (с квадрантами)",
    "radiusAndChordLength": "Радиус и длина хорды",
    "radiusAndArcLength": "Радиус и длина дуги",
    "expandGridTooltipText": "Развернуть сетку",
    "collapseGridTooltipText": "Свернуть сетку",
    "zoomToLocationTooltipText": "Приблизить к местоположению",
    "onScreenDigitizationTooltipText": "Оцифровать"
  },
  "traverseSettings": {
    "bearingLabel": "Дирекционный угол",
    "lengthLabel": "Длина",
    "radiusLabel": "Радиус",
    "noMiscloseCalculated": "Невязка не вычислена",
    "traverseMiscloseBearing": "Линейная невязка",
    "traverseAccuracy": "Точность",
    "accuracyHigh": "Высокое",
    "traverseDistance": "Линейная невязка",
    "traverseMiscloseRatio": "Отношение линейной невязки к периметру участка",
    "traverseStatedArea": "Указанная площадь",
    "traverseCalculatedArea": "Вычислить площадь",
    "addButtonTitle": "Добавить",
    "deleteButtonTitle": "Убрать"
  },
  "parcelTools": {
    "rotationToolLabel": "Угол",
    "scaleToolLabel": "Масштаб"
  },
  "newTraverse": {
    "invalidBearingMessage": "Недопустимое направление",
    "invalidLengthMessage": "Недопустимая длина.",
    "invalidRadiusMessage": "Недопустимый радиус.",
    "negativeLengthMessage": "Корректно только для кривых",
    "enterValidValuesMessage": "Введите корректные значения.",
    "enterValidParcelInfoMessage": "Введите допустимое значение информации участка для сохранения.",
    "unableToDrawLineMessage": "Невозможно нарисовать линию.",
    "invalidEndPointMessage": "недопустимая конечная точка, не удалось нарисовать линию."
  },
  "planInfo": {
    "requiredText": "(необходимо)",
    "optionalText": "(дополнительно)",
    "parcelNamePlaceholderText": "Имя участка",
    "parcelDocumentTypeText": "Тип документа",
    "planNamePlaceholderText": "Имя плана",
    "cancelButtonLabel": "Отмена",
    "saveButtonLabel": "Сохранить",
    "saveNonClosedParcelConfirmationMessage": "Введенный участок не замкнут, вы уверены что хотите продолжить и сохранить линии участка?",
    "unableToCreatePolygonParcel": "Не удалось создать полигон участка.",
    "unableToSavePolygonParcel": "Не удалось сохранить полигон участка.",
    "unableToSaveParcelLines": "Не удалось сохранить линии участка.",
    "unableToUpdateParcelLines": "Не удалось обновить линии участка.",
    "parcelSavedSuccessMessage": "Участок сохранен успешно.",
    "enterValidParcelNameMessage": "Введите допустимое имя участка.",
    "enterValidPlanNameMessage": "Введите корректное имя плана.",
    "enterValidDocumentTypeMessage": "Недопустимый тип документа.",
    "enterValidStatedAreaNameMessage": "Введите допустимую начальную область"
  },
  "xyInput": {
    "explanation": "В пространственной привязке слоя участков"
  }
});