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
  "setBtnLabel": "Установить",
  "selectLabel": "Выбрать",
  "selectLayerLabel": "Выбрать слои участков",
  "selectLayerHintText": "Подсказка: используйте кнопку установки для выбора полигона участка и связанного с ним линейного слоя.",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "Выбранный полигональный слой не имеет корректного связанного слоя."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Выберите связанный линейный слой",
    "layerSettingTabLabel": "Слои участков",
    "advancedSettingTabLabel": "Дополнительные настройки",
    "selectLayerHintText": "Подсказка: используются для хранения значений COGO в линейном слое участков",
    "selectFieldLegendLabel": "Выбранные поля для хранения значений COGO в линейном слое участков",
    "bearingFieldLabel": "Дирекционный угол",
    "chordLengthFieldLabel": "Длина хорды",
    "distanceFieldLabel": "Расстояние",
    "sequenceIdFieldLabel": "ID Последовательности",
    "radiusFieldLabel": "Радиус",
    "foreignKeyFieldLabel": "Внешний ключ",
    "arcLengthFieldLabel": "Длина дуги",
    "lineTypeFieldLabel": "Тип линии",
    "parcelPointSymbolLabel": "Точечный символ участка",
    "parcelPointSymbolHintText": "Подсказка: используется для отображения точечного символа для исходной точки линии.",
    "symbolPickerPreviewText": "Предварительный просмотр",
    "selectLineLayerLabel": "Выбрать линейный слой"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Выбрать полигональный слой",
    "selectPolygonLayerHintText": "Подсказка: используется для выбора полигонального слоя участка",
    "selectFieldLegendLabel": "Выберите поля для хранения атрибутов полигона участка",
    "parcelNameLabel": "Имя участка",
    "rotationLabel": "Поворот",
    "planNameLabel": "Имя плана",
    "scalingLabel": "Масштабирование",
    "documentTypeLabel": "Тип документа",
    "miscloseRatioLabel": "Отношение линейной невязки к периметру участка",
    "statedAreaLabel": "Указанная площадь",
    "miscloseDistanceLabel": "Линейная невязка",
    "selectPolygonLayerLabelPopUp": "Выбрать полигональный слой"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Тип линии",
    "valueLabel": "Значение",
    "symbolLabel": "Символ",
    "connectionLineLabel": "Соединительная линия",
    "boundaryLineLabel": "Линия границы"
  },
  "closureSetting": {
    "snappingLayerLabel": "Слои замыкания",
    "snappingBtnLabel": "Установить",
    "snappingLayerHintText": "Подсказка: выберите слои, в которых осуществляется замыкание для линий участков.",
    "miscloseDistanceLabel": "Линейная невязка",
    "miscloseDistanceHintText": "Подсказка: укажите расстояние и единицы невязки.",
    "miscloseRatioLabel": "Отношение линейной невязки к периметру участка",
    "miscloseRatioHintText": "Подсказка: указывается отношение невязки.",
    "snappingToleranceLabel": "Допуск замыкания",
    "pixelLabel": "Пикселы",
    "snappingToleranceHintText": "Подсказка: указывается допуск замыкания.",
    "selectLayerLabel": "Выбрать слой"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Недопустимое поле направления",
    "chordLengthErrMsg": "Недопустимая длина хорды",
    "distanceFieldErrMsg": "Недопустимое значение расстояния",
    "sequenceIdFieldErrMsg": "Недопустимое Id последовательности",
    "radiusFieldErrMsg": "Недопустимый радиус",
    "foreignKeyFieldErrMsg": "Недопустимый внешний ключ",
    "arcLengthFieldErrMsg": "Недопустимая длина дуги",
    "lineTypeFieldErrMsg": "Недопустимый тип линии",
    "parcelNameFieldErrMsg": "Недопустимое поле для имени участка",
    "planNameFieldErrMsg": "Недопустимое поле для имени плана",
    "scaleFieldErrMsg": "Недопустимое поле масштаба",
    "documentTypeFieldErrMsg": "Недопустимое поле для типа документа",
    "miscloseRatioFieldErrMsg": "Недопустимое поле для отношения невязки",
    "statedAreaFieldErrMsg": "Недопустимое поле для начальной области",
    "miscloseDistanceFieldErrMsg": "Недопустимое поле для расстояния невязки",
    "globalIdFieldErrMsg": "Выбранный полигональный слой не имеет корректного поля 'esriFieldTypeGlobalID'.",
    "invalidPolylineLayer": "Выберите допустимый линейный слой участка",
    "invalidPolygonLayer": "Выберите допустимый полигональный слой участка",
    "invalidMiscloseDistance": "Введите допустимое расстояние невязки",
    "invalidSnappingTolerance": "Введите допустимый допуск замыкания",
    "invalidMiscloseRatio": "Введите допустимое отношение невязки",
    "selectDistinctLineTypes": "Выберите точное значение в каждом типе линии",
    "invalidConnectionLineType": "Недопустимое значение линии соединения",
    "invalidBoundaryLineType": "Недопустимое значение линии границы",
    "selectDistinctPolylineFields": "Выберите точное поле для каждого значения COGO.",
    "selectDistinctPolygonFields": "Выберите точное поле для каждого атрибута полигона участка."
  }
});