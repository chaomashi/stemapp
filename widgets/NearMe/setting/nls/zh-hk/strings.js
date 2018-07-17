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
      "displayText": "英里",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "公里",
      "acronym": "km"
    },
    "feet": {
      "displayText": "英呎",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "公尺",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "搜尋來源設定",
    "searchSourceSettingTitle": "搜尋來源設定",
    "searchSourceSettingTitleHintText": "新增並配置地理編碼服務或圖徵圖層為搜尋來源。這些指定的來源決定了搜尋方塊中的可搜尋內容",
    "addSearchSourceLabel": "新增搜尋來源",
    "featureLayerLabel": "圖徵圖層",
    "geocoderLabel": "地理編碼器",
    "nameTitle": "名稱",
    "generalSettingLabel": "一般設定",
    "allPlaceholderLabel": "用於全部搜尋的占位符文字:",
    "allPlaceholderHintText": "提示: 輸入在搜尋所有圖層和地理編碼器時，要顯示成佔位符的文字",
    "generalSettingCheckboxLabel": "顯示發現的圖徵或位置的快顯視窗",
    "countryCode": "國碼或地區代碼",
    "countryCodeEg": "例如 ",
    "countryCodeHint": "留空此值會搜尋所有國家和地區",
    "questionMark": "?",
    "searchInCurrentMapExtent": "僅在目前的地圖範圍中搜尋",
    "zoomScale": "縮放比例",
    "locatorUrl": "地理編碼器 URL",
    "locatorName": "地理編碼器名稱",
    "locatorExample": "範例",
    "locatorWarning": "不支援此版本的地理編碼服務。該 widget支援 10.0 及更高版本的地理編碼服務。",
    "locatorTips": "由於地理編碼服務不支援建議功能，因此建議無法使用。",
    "layerSource": "圖層來源",
    "setLayerSource": "設定圖層來源",
    "setGeocoderURL": "設定地理編碼器 URL",
    "searchLayerTips": "由於圖徵服務不支援分頁功能，因此建議無法使用。",
    "placeholder": "佔位符文字",
    "searchFields": "搜尋欄位",
    "displayField": "顯示欄位",
    "exactMatch": "完全相符",
    "maxSuggestions": "最大建議數",
    "maxResults": "最大結果數",
    "enableLocalSearch": "啟用本機搜尋",
    "minScale": "最小比例",
    "minScaleHint": "當地圖比例大於此比例時，將套用本機搜尋",
    "radius": "半徑",
    "radiusHint": "指定目前地圖中心周圍的區域半徑，可用來提升地理編碼候選者的等級，以優先傳回離位置最近的候選者",
    "meters": "公尺",
    "setSearchFields": "設定搜尋欄位",
    "set": "設定",
    "fieldName": "名稱",
    "invalidUrlTip": "URL ${URL} 無效或不可存取。"
  },
  "searchSetting": {
    "searchSettingTabTitle": "搜尋設定",
    "defaultBufferDistanceLabel": "設定預設緩衝區距離",
    "maxResultCountLabel": "限制結果數目",
    "maxResultCountHintLabel": "提示: 設定可見結果數上限。值 1 將傳回最近的圖徵",
    "maxBufferDistanceLabel": "設定最大緩衝區距離",
    "bufferDistanceUnitLabel": "緩衝區距離單位",
    "defaultBufferHintLabel": "提示: 設定緩衝區滑桿的預設值",
    "maxBufferHintLabel": "提示: 設定緩衝區滑桿的最大值",
    "bufferUnitLabel": "提示: 定義用於建立緩衝區的單位",
    "selectGraphicLocationSymbol": "地址或位置符號",
    "graphicLocationSymbolHintText": "提示: 搜尋的地址或按一下的位置所適用的符號",
    "addressLocationPolygonHintText": "提示: 用於搜尋的多邊形圖層的符號",
    "popupTitleForPolygon": "為選擇的地址位置選擇多邊形",
    "popupTitleForPolyline": "為地址位置選擇線條",
    "addressLocationPolylineHintText": "提示: 用於搜尋的折線圖層的符號",
    "fontColorLabel": "選擇搜尋結果的字型顏色",
    "fontColorHintText": "提示: 搜尋結果的字型顏色",
    "zoomToSelectedFeature": "縮放至所選圖徵",
    "zoomToSelectedFeatureHintText": "提示: 縮放至所選圖徵而非緩衝區",
    "intersectSearchLocation": "傳回相交的多邊形",
    "intersectSearchLocationHintText": "提示: 傳回包含搜尋之位置的多邊形，而非緩衝區內的多邊形",
    "enableProximitySearch": "啟用鄰域搜尋",
    "enableProximitySearchHintText": "提示: 啟用搜尋所選結果附近之位置的能力",
    "bufferVisibilityLabel": "設定緩衝區能見度",
    "bufferVisibilityHintText": "提示: 緩衝區將顯示在地圖上",
    "bufferColorLabel": "設定緩衝區符號",
    "bufferColorHintText": "提示: 選擇緩衝區的顏色和透明度",
    "searchLayerResultLabel": "僅繪製所選圖層結果",
    "searchLayerResultHint": "提示: 只會在地圖上繪製搜尋結果中的所選圖層",
    "showToolToSelectLabel": "設定位置按鈕",
    "showToolToSelectHintText": "提示: 按一下地圖時提供按鈕以設定地圖上的位置，而非一律設定位置",
    "geoDesicParamLabel": "使用測地線緩衝區",
    "geoDesicParamHintText": "提示: 使用測地線緩衝區而非歐幾里德緩衝區 (平面)"
  },
  "layerSelector": {
    "selectLayerLabel": "選擇搜尋圖層",
    "layerSelectionHint": "提示: 使用設定按鈕以選擇圖層",
    "addLayerButton": "設定"
  },
  "routeSetting": {
    "routeSettingTabTitle": "方向設定",
    "routeServiceUrl": "路線規劃服務",
    "buttonSet": "設定",
    "routeServiceUrlHintText": "提示: 按一下「設定」以瀏覽和選擇路線規劃服務",
    "directionLengthUnit": "方向長度單位",
    "unitsForRouteHintText": "提示: 用來顯示路線的單位",
    "selectRouteSymbol": "選擇要顯示路線的符號",
    "routeSymbolHintText": "提示: 用來顯示路線的線條符號",
    "routingDisabledMsg": "若要啟用方向，請確定在應用程式設定中的項目上啟用路線規劃。"
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "符號系統設定",
    "addSymbologyBtnLabel": "新增符號",
    "layerNameTitle": "圖層名稱",
    "fieldTitle": "欄位",
    "valuesTitle": "值",
    "symbolTitle": "符號",
    "actionsTitle": "操作",
    "invalidConfigMsg": "${layerName} 圖層的 ${fieldName} 欄位重複"
  },
  "filterSetting": {
    "filterSettingTabTitle": "篩選器設定",
    "addTaskTip": "將一或多個篩選器新增至選擇的搜尋圖層，並為每個篩選器配置參數。",
    "enableMapFilter": "從地圖移除預設圖層篩選器。",
    "newFilter": "新建篩選器",
    "filterExpression": "篩選器表達式",
    "layerDefaultSymbolTip": "使用圖層的預設符號",
    "uploadImage": "上傳圖片",
    "selectLayerTip": "請選擇圖層。",
    "setTitleTip": "請設定標題。",
    "noTasksTip": "無配置的篩選器。按一下 \"${newFilter}\" 以新增一個。",
    "collapseFiltersTip": "開啟 widget 時收合篩選表達式 (若有的話)",
    "groupFiltersTip": "按圖層分組篩選器"
  },
  "networkServiceChooser": {
    "arcgislabel": "從 ArcGIS Online 新增",
    "serviceURLabel": "新增服務 URL",
    "routeURL": "路徑 URL",
    "validateRouteURL": "驗證",
    "exampleText": "範例",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "請指定有效的路線服務。",
    "rateLimitExceeded": "已超過比率限制。請稍後再試。",
    "errorInvokingService": "使用者名稱或密碼不正確。"
  },
  "errorStrings": {
    "bufferErrorString": "請輸入有效的數值。",
    "selectLayerErrorString": "請選擇要搜尋的圖層。",
    "invalidDefaultValue": "緩衝區預設距離不可空白。請指定緩衝區距離",
    "invalidMaximumValue": "緩衝區最大距離不可空白。請指定緩衝區距離",
    "defaultValueLessThanMax": "請指定位於上限內的緩衝區預設距離",
    "defaultBufferValueGreaterThanOne": "預設緩衝區距離不可小於 0",
    "maximumBufferValueGreaterThanOne": "請指定大於 0 的緩衝區最大距離",
    "invalidMaximumResultCountValue": "請指定結果計數上限的有效值",
    "invalidSearchSources": "搜尋來源設定無效"
  },
  "symbolPickerPreviewText": "預覽:"
});