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
      "displayText": "Мили",
      "acronym": "М"
    },
    "kilometers": {
      "displayText": "Километры",
      "acronym": "км"
    },
    "feet": {
      "displayText": "Футы",
      "acronym": "футы"
    },
    "meters": {
      "displayText": "Метры",
      "acronym": "м"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Параметры источника поиска",
    "searchSourceSettingTitle": "Параметры источника поиска",
    "searchSourceSettingTitleHintText": "Добавить и настроить сервисы геокодирования или векторные слои в качестве источников для поиска. Эти указанные источники определяют, что будет доступно для поиска в соответствующем диалоговом окне",
    "addSearchSourceLabel": "Добавить источник поиска",
    "featureLayerLabel": "Слой пространственных объектов",
    "geocoderLabel": "Геокодер",
    "nameTitle": "Название",
    "generalSettingLabel": "Общие параметры",
    "allPlaceholderLabel": "Замещающий текст для поиска всего:",
    "allPlaceholderHintText": "Подсказка: Введите текст, который будет показан как текст-заполнитель во время поиска по всем слоям и геокодерам.",
    "generalSettingCheckboxLabel": "Показать всплывающее окно для найденного объекта или местоположения",
    "countryCode": "Коды стран или регионов",
    "countryCodeEg": "напр. ",
    "countryCodeHint": "Не заполняйте, чтобы искать по всем странам и регионам",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Искать только в пределах текущего экстента карты",
    "zoomScale": "Масштаб",
    "locatorUrl": "URL-адрес геокодера",
    "locatorName": "Имя геокодера",
    "locatorExample": "Пример",
    "locatorWarning": "Эта версия сервиса геокодирования не поддерживается. Виджет поддерживает сервис геокодирования версии 10.0 и более новые.",
    "locatorTips": "Нет предположений, так как сервис геокодирования не поддерживает возможность предположений.",
    "layerSource": "Источник слоя",
    "setLayerSource": "Установить источник слоя",
    "setGeocoderURL": "Задать URL геокодера",
    "searchLayerTips": "Нет предположений, так как сервис пространственных объектов не поддерживает возможность пагинации.",
    "placeholder": "Замещающий текст",
    "searchFields": "Поля поиска",
    "displayField": "Показать поле",
    "exactMatch": "Точное совпадение",
    "maxSuggestions": "Максимум предложений",
    "maxResults": "Максимум результатов",
    "enableLocalSearch": "Включить локальный поиск",
    "minScale": "Мин. масштаб",
    "minScaleHint": "Когда масштаб карты крупнее данного масштаба, применяется локальный поиск",
    "radius": "Радиус",
    "radiusHint": "Укажите радиус области вокруг текущего центра карты. Он будет использоваться для повышения ранга кандидатов геокодирования так, чтобы первыми возвращались кандидаты, расположенные ближе всего",
    "meters": "Метры",
    "setSearchFields": "Установить поля для поиска",
    "set": "Установить",
    "fieldName": "Название",
    "invalidUrlTip": "URL ${URL} является недопустимым или недостижимым."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Параметры поиска",
    "defaultBufferDistanceLabel": "Задать буферное расстояние по умолчанию",
    "maxResultCountLabel": "Ограничить число результатов",
    "maxResultCountHintLabel": "Подсказка: Установите максимально возможное число видимых результатов. Значение 1 вернет ближайший объект.",
    "maxBufferDistanceLabel": "Задать максимальное буферное расстояние",
    "bufferDistanceUnitLabel": "Единицы буферного расстояния",
    "defaultBufferHintLabel": "Подсказка: Задайте значение по умолчанию для бегунка буфера",
    "maxBufferHintLabel": "Подсказка: Задайте максимальное значение для бегунка буфера",
    "bufferUnitLabel": "Подсказка: Укажите единицы измерения при создании буфера",
    "selectGraphicLocationSymbol": "Символ адреса или местоположения",
    "graphicLocationSymbolHintText": "Подсказка: Символ для найденных адресов или местоположений, по которым щелкнули",
    "addressLocationPolygonHintText": "Подсказка: Символ для слоя выбранных полигонов",
    "popupTitleForPolygon": "Выбрать полигон для выбранного по адресу местоположения",
    "popupTitleForPolyline": "Выбрать линию для выбранного по адресу местоположения",
    "addressLocationPolylineHintText": "Подсказка: Символ для слоя выбранных полилиний",
    "fontColorLabel": "Выбрать цвет шрифта для результатов поиска",
    "fontColorHintText": "Подсказка: Цвет шрифта результатов поиска",
    "zoomToSelectedFeature": "Приблизиться к выбранному объекту",
    "zoomToSelectedFeatureHintText": "Подсказка: Приблизиться к выбранному объекту вместо использования буфера",
    "intersectSearchLocation": "Вернуть пересекающиеся полигоны",
    "intersectSearchLocationHintText": "Подсказка: Возвращает полигоны, содержащие местоположение поиска, вместо полигонов в пределах буфера",
    "enableProximitySearch": "Включить поиск по близости",
    "enableProximitySearchHintText": "Подсказка: Включите возможность поиска для местоположений рядом с выбранным результатом",
    "bufferVisibilityLabel": "Задать видимость буфера",
    "bufferVisibilityHintText": "Подсказка: Буфер будет отображаться на карте",
    "bufferColorLabel": "Задать символ буфера",
    "bufferColorHintText": "Подсказка: Выберите цвет и прозрачность буфера",
    "searchLayerResultLabel": "Отображать результаты только выбранного слоя",
    "searchLayerResultHint": "Подсказка: На карте будут отображаться результаты поиска только для выбранного слоя",
    "showToolToSelectLabel": "Кнопка Установить местоположение",
    "showToolToSelectHintText": "Подсказка: Предоставьте кнопки установки местоположения на карте вместо того, чтобы устанавливать местоположение щелчком на карте",
    "geoDesicParamLabel": "Использовать геодезический буфер",
    "geoDesicParamHintText": "Подсказка: Используйте геодезический буфер вместо использования Евклидова буфера (по прямой)"
  },
  "layerSelector": {
    "selectLayerLabel": "Выбрать слои поиска",
    "layerSelectionHint": "Подсказка: Для выбора слоев используйте кнопку Установить",
    "addLayerButton": "Установить"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Параметры путевых листов",
    "routeServiceUrl": "Сервис маршрутов",
    "buttonSet": "Установить",
    "routeServiceUrlHintText": "Подсказка: Щелкните Задать™, чтобы перейти к выбору сервиса маршрутизации",
    "directionLengthUnit": "Единицы длины маршрутов",
    "unitsForRouteHintText": "Подсказка: Используется для отображения единиц измерения маршрутов",
    "selectRouteSymbol": "Выбрать символ отображения маршрута",
    "routeSymbolHintText": "Подсказка: Используется для отображения линейного символа маршрута",
    "routingDisabledMsg": "Для включения возможности построения путевых листов убедитесь, что в настройках приложения для элемента доступно построение маршрутов."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Настройки символов",
    "addSymbologyBtnLabel": "Добавить новые символы",
    "layerNameTitle": "Имя слоя",
    "fieldTitle": "Поле",
    "valuesTitle": "Значения",
    "symbolTitle": "Символ",
    "actionsTitle": "Действия",
    "invalidConfigMsg": "Дублировать поле : ${fieldName} для слоя : ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Настройки фильтрации",
    "addTaskTip": "Добавить один или несколько фильтров  для выбранных слоев поиска и настроить параметры каждого из них.",
    "enableMapFilter": "Удалить настроенный фильтр слоя с карты.",
    "newFilter": "Новый фильтр",
    "filterExpression": "Выражение фильтра",
    "layerDefaultSymbolTip": "Использовать символы слоя по умолчанию",
    "uploadImage": "Загрузить изображение",
    "selectLayerTip": "Выберите слой.",
    "setTitleTip": "Введите заголовок.",
    "noTasksTip": "Нет настроенных фильтров. Щелкните \"${newFilter}\", чтобы добавить новый.",
    "collapseFiltersTip": "Свернуть выражение фильтра (при наличии), когда виджет открыт",
    "groupFiltersTip": "Группировать фильтры по слоям"
  },
  "networkServiceChooser": {
    "arcgislabel": "Добавить с ArcGIS Online",
    "serviceURLabel": "Добавить URL-адрес сервиса",
    "routeURL": "URL маршрута",
    "validateRouteURL": "Проверить",
    "exampleText": "Пример",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Укажите допустимый сервис маршрутов",
    "rateLimitExceeded": "Достигнут лимит скорости. Попробуйте позже.",
    "errorInvokingService": "Неверное имя пользователя или пароль."
  },
  "errorStrings": {
    "bufferErrorString": "Введите допустимое числовое значение.",
    "selectLayerErrorString": "Выберите слои для поиска.",
    "invalidDefaultValue": "Буферное расстояние по умолчанию не может быть пустым. Укажите буферное расстояние.",
    "invalidMaximumValue": "Максимальное буферное расстояние не может быть пустым. Укажите буферное расстояние",
    "defaultValueLessThanMax": "Укажите буферное расстояние по умолчанию в пределах максимально возможного",
    "defaultBufferValueGreaterThanOne": "Буферное расстояние по умолчанию не может быть меньше 0",
    "maximumBufferValueGreaterThanOne": "Укажите максимальное буферное расстояние больше 0",
    "invalidMaximumResultCountValue": "Укажите корректное значение для максимально возможного числа результатов",
    "invalidSearchSources": "Некорректные параметры поиска источника"
  },
  "symbolPickerPreviewText": "Просмотр:"
});