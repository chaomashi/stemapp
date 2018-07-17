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
  "_widgetLabel": "Анализ стоимости Бета",
  "unableToFetchInfoErrMessage": "Невозможно вызвать информацию слоя сервиса геометрии/настроенного",
  "invalidCostingGeometryLayer": "Невозможно получить 'esriFieldTypeGlobalID' в слое геометрии расчета стоимости.",
  "projectLayerNotFound": "Невозможно найти настроенный слой проекта на карте.",
  "costingGeometryLayerNotFound": "Невозможно найти настроенный слой геометрии расчета стоимости на карте.",
  "projectMultiplierTableNotFound": "Невозможно найти настроенную таблицу множителя добавочной стоимости проекта на карте.",
  "projectAssetTableNotFound": "Невозможно найти настроенную таблицу объектов проекта на карте.",
  "createLoadProject": {
    "createProjectPaneTitle": "Создать проект",
    "loadProjectPaneTitle": "Загрузить проект",
    "projectNamePlaceHolder": "Название проекта",
    "projectDescPlaceHolder": "Описание проекта",
    "selectProject": "Выбрать проект",
    "viewInMapLabel": "Просмотреть на карте",
    "loadLabel": "Загрузить",
    "createLabel": "Создать",
    "deleteProjectConfirmationMsg": "Вы уверены, что хотите удалить проект?",
    "noAssetsToViewOnMap": "В выбранном проекте нет объектов для показа на карте.",
    "projectDeletedMsg": "Проект успешно удален.",
    "errorInCreatingProject": "Ошибка создания проекта.",
    "errorProjectNotFound": "Проект не найден.",
    "errorInLoadingProject": "Проверьте, что выбран корректный проект.",
    "errorProjectNotSelected": "Выбрать проект в ниспадающем списке",
    "errorDuplicateProjectName": "Имя проекта уже существует."
  },
  "statisticsSettings": {
    "tabTitle": "Настройки статистики",
    "addStatisticsLabel": "Добавить статистику",
    "addNewStatisticsText": "Добавить новую статистику",
    "deleteStatisticsText": "Удалить статистику",
    "moveStatisticsUpText": "Переместить статистику вверх",
    "moveStatisticsDownText": "Переместить статистику вниз",
    "layerNameTitle": "Слой",
    "statisticsTypeTitle": "Тип",
    "fieldNameTitle": "Поле",
    "statisticsTitle": "Подпись",
    "actionLabelTitle": "Действия",
    "selectDeselectAllTitle": "Выбрать все"
  },
  "statisticsType": {
    "countLabel": "Количество",
    "averageLabel": "Среднее арифметическое",
    "maxLabel": "Максимум",
    "minLabel": "Минимум",
    "summationLabel": "Суммирование",
    "areaLabel": "Площадь",
    "lengthLabel": "Длина"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Слои, которые должны быть отмечена как редактируемые на вкладке настроек слоя"
  },
  "workBench": {
    "refresh": "Обновить",
    "noAssetAddedMsg": "Нет добавленный объектов",
    "units": "единицы измерения",
    "assetDetailsTitle": "Информация об элементе объекта",
    "costEquationTitle": "Уравнение стоимости",
    "newCostEquationTitle": "Новое уравнение",
    "defaultCostEquationTitle": "Уравнение по умолчанию",
    "geographyTitle": "География",
    "scenarioTitle": "Сценарий",
    "costingInfoHintText": "<div>Подсказка: Используйте следующие ключевые слова</div><ul><li><b>{TOTALCOUNT}</b>: Использует общее число объектов одного типа в географии</li> <li><b>{MEASURE}</b>: Использует длину для линейных объектов и площадь для полигональных</li><li><b>{TOTALMEASURE}</b>: Использует общую длину для линейных объектов и общую площадь для полигональных объектов одинакового типа в географии</li></ul> Можно использовать функции, например:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Отредактируйте уравнение стоимости, как необходимо для проекта.",
    "zoomToAsset": "Приблизить к объекту",
    "deleteAsset": "Удалить объект",
    "closeDialog": "Закрыть диалог",
    "objectIdColTitle": "Object Id",
    "costColTitle": "Стоимость",
    "errorInvalidCostEquation": "Недопустимое уравнение стоимости.",
    "errorInSavingAssetDetails": "Невозможно сохранить информацию об объекте."
  },
  "assetDetails": {
    "inGeography": " в ${geography} ",
    "withScenario": " в ${scenario}",
    "totalCostTitle": "Общая стоимость",
    "additionalCostLabel": "Описание",
    "additionalCostValue": "Значение",
    "additionalCostNetValue": "Общее значение"
  },
  "projectOverview": {
    "assetItemsTitle": "Элементы объекта",
    "assetStatisticsTitle": "Статистика объекта",
    "projectSummaryTitle": "Краткая информация проекта",
    "projectName": "Имя проекта: ${name}",
    "totalCostLabel": "Общая стоимость проекта (*):",
    "grossCostLabel": "Валовая стоимость проекта (*):",
    "roundingLabel": "* Округление до '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Невозможно сохранить границы проекта в слое проекта.",
    "unableToSaveProjectCost": "Невозможно сохранить стоимости в слое проекта.",
    "roundCostValues": {
      "twoDecimalPoint": "Два десятичных знака",
      "nearestWholeNumber": "Ближайшее целое число",
      "nearestTen": "Ближайшие десять",
      "nearestHundred": "Ближайшие сто",
      "nearestThousand": "Ближайшие тысяча",
      "nearestTenThousands": "Ближайшие десять тысяч"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Атрибут проекта",
    "projectAttributeTitle": "Редактировать атрибуты проекта"
  },
  "costEscalation": {
    "costEscalationLabel": "Добавить добавочную стоимость",
    "valueHeader": "Значение",
    "addCostEscalationText": "Добавить добавочную стоимость",
    "deleteCostEscalationText": "Удалить выбранную добавочную стоимость",
    "moveCostEscalationUpText": "Переместить вверх выбранную добавочную стоимость",
    "moveCostEscalationDownText": "Переместить вниз выбранную добавочную стоимость",
    "invalidEntry": "Одна или несколько записей некорректны.",
    "errorInSavingCostEscalation": "Невозможно сохранить информацию о добавочной стоимости."
  },
  "scenarioSelection": {
    "popupTitle": "Выбрать сценарий для объекта",
    "regionLabel": "География",
    "scenarioLabel": "Сценарий",
    "noneText": "Нет",
    "copyFeatureMsg": "Хотите копировать выбранные объекты?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Подробности статистики",
    "noDetailStatisticAvailable": "Статистика объекта не добавлена"
  }
});