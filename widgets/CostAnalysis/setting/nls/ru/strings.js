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
  "configText": "Задать текст настройки:",
  "generalSettings": {
    "tabTitle": "Общие настройки",
    "measurementUnitLabel": "Единицы измерения",
    "currencyLabel": "Символ измерения",
    "roundCostLabel": "Округлить стоимость",
    "projectOutputSettings": "Настройки выходных данных проекта",
    "typeOfProjectAreaLabel": "Тип области проекта",
    "bufferDistanceLabel": "Буферное расстояние",
    "roundCostValues": {
      "twoDecimalPoint": "Два десятичных знака",
      "nearestWholeNumber": "Ближайшее целое число",
      "nearestTen": "Ближайшие десять",
      "nearestHundred": "Ближайшие сто",
      "nearestThousand": "Ближайшие тысяча",
      "nearestTenThousands": "Ближайшие десять тысяч"
    },
    "projectAreaType": {
      "outline": "Контур",
      "buffer": "Буфер"
    },
    "errorMessages": {
      "currency": "Некорректные единицы валюты",
      "bufferDistance": "Недопустимое буферное расстояние",
      "outOfRangebufferDistance": "Значение должно быть больше 0 и меньше или равно 100."
    }
  },
  "projectSettings": {
    "tabTitle": "Настройки проекта",
    "costingGeometrySectionTitle": "Задать географию для вычисления стоимости (дополнительно)",
    "costingGeometrySectionNote": "Примечание: Настройка этого слоя позволит пользователям задавать уравнения стоимости шаблонов объектов на основании географии.",
    "projectTableSectionTitle": "Возможность Сохранить/Загрузить настройки проекта (дополнительно)",
    "projectTableSectionNote": "Примечание: Настройка всех таблиц и слоев позволит пользователям сохранить/загрузить проект для дальнейшего использования.",
    "costingGeometryLayerLabel": "Слой геометрии вычисления стоимости",
    "fieldLabelGeography": "Поле для географии подписи",
    "projectAssetsTableLabel": "Таблица объектов проекта",
    "projectMultiplierTableLabel": "Таблица множителя добавочной стоимости проекта",
    "projectLayerLabel": "Слой проекта",
    "configureFieldsLabel": "Настроить поля",
    "fieldDescriptionHeaderTitle": "Описание поля",
    "layerFieldsHeaderTitle": "Поле слоя",
    "selectLabel": "Выбрать",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} уже выбран",
      "invalidConfiguration": "Выберите ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Будут показаны полигональные слои со следующими условиями: <br/> <li>\tУ слоя должна быть возможность â€œЗапросаâ€</li><li>\tУ слоя должно быть поле GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Строковые и числовые поля в выбранном â€œСлое геометрии стоимостиâ€ будут отображены в ниспадающем списке â€œПоле для географии подписиâ€.</p>",
    "projectAssetsTableHelp": "<p>Будут показаны таблицы со следующими условиями: <br/> <li>У таблицы должны быть возможности редактирования с названием â€œСоздатьâ€, â€œУдалитьâ€ и â€œОбновитьâ€</li>    <li>В таблице должно быть шесть полей именно с такими именами и типом данных:</li><ul><li>\tAssetGUID (поле типа GUID)</li><li>\tCostEquation (поле типа String)</li><li>\tScenario (поле типа String)</li><li>\tTemplateName (поле типа String)</li><li>    GeographyGUID (поле типа GUID)</li><li>\tProjectGUID (поле типа GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Будут показаны таблицы со следующими условиями: <br/> <li>У таблицы должны быть возможности редактирования с названием â€œСоздатьâ€, â€œУдалитьâ€ и â€œОбновитьâ€</li>    <li>В таблице должно быть пять полей именно с такими именами и типом данных:</li><ul><li>\tDescription (поле типа String)</li><li>\tType (поле типа String)</li><li>\tValue (поле типа Float/Double)</li><li>\tCostindex (поле типа Integer)</li><li>   \tProjectGUID (поле типа GUID))</li></ul> </p>",
    "projectLayerHelp": "<p>Будут показаны полигональные слои со следующими условиями: <br/> <li>У слоя должны быть возможности редактирования с названием â€œСоздатьâ€, â€œУдалитьâ€ и â€œОбновитьâ€</li>    <li>У слоя должно быть пять полей именно с такими именами и типом данных:</li><ul><li>ProjectName (поле типа String)</li><li>Description (поле типа String)</li><li>Totalassetcost (поле типа Float/Double)</li><li>Grossprojectcost (поле типа Float/Double)</li><li>GlobalID (поле типа GlobalID)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Настройки слоя",
    "layerNameHeaderTitle": "Имя слоя",
    "layerNameHeaderTooltip": "Список слоев на карте",
    "EditableLayerHeaderTitle": "Редактируемый",
    "EditableLayerHeaderTooltip": "Включить слои и их шаблоны в виджет расчета стоимости",
    "SelectableLayerHeaderTitle": "Доступно для выборки",
    "SelectableLayerHeaderTooltip": "Геометрия объекта будет использоваться для создания нового элемента стоимости",
    "fieldPickerHeaderTitle": "Project ID (дополнительно)",
    "fieldPickerHeaderTooltip": "Дополнительное поле (или строка типа)для хранения ID проекта в",
    "selectLabel": "Выбрать",
    "noAssetLayersAvailable": "На выбранной веб-карте не найден слой объектов",
    "disableEditableCheckboxTooltip": "У этого слоя нет возможностей редактирования",
    "missingCapabilitiesMsg": "У слоя нет следующих возможностей:",
    "missingGlobalIdMsg": "У слоя нет поля GlobalId",
    "create": "Создание",
    "update": "Обновление",
    "delete": "Удаление"
  },
  "costingInfo": {
    "tabTitle": "Информация вычисления стоимости",
    "proposedMainsLabel": "Предполагаемые сети",
    "addCostingTemplateLabel": "Добавить шаблон вычисления стоимости",
    "manageScenariosTitle": "Управлять сценариями",
    "featureTemplateTitle": "Шаблон объектов",
    "costEquationTitle": "Уравнение стоимости",
    "geographyTitle": "География",
    "scenarioTitle": "Сценарий",
    "actionTitle": "Действия",
    "scenarioNameLabel": "Имя сценария",
    "addBtnLabel": "Добавить",
    "srNoLabel": "Нет.",
    "deleteLabel": "Удалить",
    "duplicateScenarioName": "Дублировать имя сценария",
    "hintText": "<div>Подсказка: Используйте следующие ключевые слова</div><ul><li><b>{TOTALCOUNT}</b>: Использует общее число объектов одного типа в географии</li><li><b>{MEASURE}</b>: Использует длину для линейных объектов и площадь для полигональных</li><li><b>{TOTALMEASURE}</b>: Использует общую длину для линейных объектов и общую площадь для полигональных объектов одинакового типа в географии</li></ul>Можно использовать функции, например:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Отредактируйте уравнение стоимости, как необходимо для проекта.",
    "noneValue": "Нет",
    "requiredCostEquation": "Некорректное уравнение стоимости для ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Для ${layerName} существуют дублирующиеся записи шаблона: ${templateName}",
    "defaultEquationRequired": "Для ${layerName} требуется уравнение по умолчанию: ${templateName}",
    "validCostEquationMessage": "Введите корректное уравнение стоимости",
    "costEquationHelpText": "Отредактируйте уравнение стоимости, как необходимо для проекта",
    "scenarioHelpText": "Выберите сценарий, необходимый для вашего проекта",
    "copyRowTitle": "Копировать строку",
    "noTemplateAvailable": "Добавьте хотя бы один шаблон для ${layerName}",
    "manageScenarioLabel": "Управлять сценарием",
    "noLayerMessage": "Введите хотя бы один слой в ${tabName}",
    "noEditableLayersAvailable": "Слои, которые должны быть отмечена как редактируемые на вкладке настроек слоя"
  },
  "statisticsSettings": {
    "tabTitle": "Настройки статистики",
    "addStatisticsLabel": "Добавить статистику",
    "fieldNameTitle": "Поле",
    "statisticsTitle": "Подпись",
    "addNewStatisticsText": "Добавить новую статистику",
    "deleteStatisticsText": "Удалить статистику",
    "moveStatisticsUpText": "Переместить статистику вверх",
    "moveStatisticsDownText": "Переместить статистику вниз",
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
  }
});