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
    "miles": "Мили",
    "kilometers": "Километры",
    "feet": "Футы",
    "meters": "Метры"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Параметры поиска",
    "buttonSet": "Установить",
    "selectLayersLabel": "Выбрать слой",
    "selectLayersHintText": "Подсказка: Используется для выборки полигонального слоя и связанного с ним точечного слоя.",
    "selectPrecinctSymbolLabel": "Выбрать символ для выделения полигона",
    "selectGraphicLocationSymbol": "Символ адреса или местоположения",
    "graphicLocationSymbolHintText": "Подсказка: Символ для найденных адресов или местоположений, по которым щелкнули",
    "precinctSymbolHintText": "Подсказка: Используется для отображения символа выбранных полигонов",
    "selectColorForPoint": "Выберите цвет для выделения точки",
    "selectColorForPointHintText": "Подсказка: Используется для отображения цвета подсветки выбранной точки"
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
    "invalidUrlTip": "URL ${URL} является недопустимым или недостижимым.",
    "invalidSearchSources": "Некорректные параметры поиска источника"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Выбрать полигональный слой",
    "selectPolygonLayerHintText": "Подсказка: Используется для выбора полигонального слоя.",
    "selectRelatedPointLayerLabel": "Выбрать точечный слой, связанный с полигональным слоем",
    "selectRelatedPointLayerHintText": "Подсказка: Используется для выборки точечного слоя, связанного с полигональным слоем",
    "polygonLayerNotHavingRelatedLayer": "Выбрать полигональный слой, у которого есть связанный точечный слой.",
    "errorInSelectingPolygonLayer": "Выбрать полигональный слой, у которого есть связанный точечный слой.",
    "errorInSelectingRelatedLayer": "Выберите точечный слой, связанный с полигональным слоем."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Параметры путевых листов",
    "routeServiceUrl": "Сервис маршрутизации",
    "buttonSet": "Установить",
    "routeServiceUrlHintText": "Подсказка: Щелкните \"Установить\", чтобы перейти к выбору сервиса маршрутов сетевого анализа",
    "directionLengthUnit": "Единицы длины маршрутов",
    "unitsForRouteHintText": "Подсказка: Используется для отображения единиц измерения маршрутов",
    "selectRouteSymbol": "Выбрать символ отображения маршрута",
    "routeSymbolHintText": "Подсказка: Используется для отображения линейного символа маршрута",
    "routingDisabledMsg": "Для включения возможности построения путевых листов убедитесь, что построение маршрутов включено в элементе ArcGIS Online."
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
    "rateLimitExceeded": "Превышен предел скорости. Попробуйте позже.",
    "errorInvokingService": "Неверное имя пользователя или пароль."
  },
  "symbolPickerPreviewText": "Просмотр:",
  "showToolToSelectLabel": "Кнопка Установить местоположение",
  "showToolToSelectHintText": "Подсказка: Предоставьте кнопки установки местоположения на карте вместо того, чтобы устанавливать местоположение щелчком на карте"
});