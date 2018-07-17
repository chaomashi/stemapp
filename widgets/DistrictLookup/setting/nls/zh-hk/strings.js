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
    "miles": "英里",
    "kilometers": "公里",
    "feet": "英呎",
    "meters": "公尺"
  },
  "layerSetting": {
    "layerSettingTabTitle": "搜尋設定",
    "buttonSet": "設定",
    "selectLayersLabel": "選擇圖層",
    "selectLayersHintText": "提示: 用來選擇多邊形圖層及其相關點圖層。",
    "selectPrecinctSymbolLabel": "選擇符號以突顯多邊形",
    "selectGraphicLocationSymbol": "地址或位置符號",
    "graphicLocationSymbolHintText": "提示: 搜尋的地址或按一下的位置所適用的符號",
    "precinctSymbolHintText": "提示: 用來顯示所選多邊形的符號",
    "selectColorForPoint": "選擇顏色以突顯點",
    "selectColorForPointHintText": "提示: 用來顯示所選點的強調顏色"
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
    "invalidUrlTip": "URL ${URL} 無效或不可存取。",
    "invalidSearchSources": "搜尋來源設定無效"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "選擇多邊形圖層",
    "selectPolygonLayerHintText": "提示: 用來選擇多邊形圖層。",
    "selectRelatedPointLayerLabel": "選擇多邊形圖層相關的點圖層",
    "selectRelatedPointLayerHintText": "提示: 用來選擇多邊形圖層相關的點圖層",
    "polygonLayerNotHavingRelatedLayer": "請選擇具有相關點圖層的多邊形圖層。",
    "errorInSelectingPolygonLayer": "請選擇具有相關點圖層的多邊形圖層。",
    "errorInSelectingRelatedLayer": "請選擇多邊形圖層相關的點圖層。"
  },
  "routeSetting": {
    "routeSettingTabTitle": "方向設定",
    "routeServiceUrl": "路線規劃服務",
    "buttonSet": "設定",
    "routeServiceUrlHintText": "提示: 按一下「設定」以瀏覽和選擇網路分析路線規劃服務",
    "directionLengthUnit": "方向長度單位",
    "unitsForRouteHintText": "提示: 用來顯示路線的報告單位",
    "selectRouteSymbol": "選擇要顯示路線的符號",
    "routeSymbolHintText": "提示: 用來顯示路線的線條符號",
    "routingDisabledMsg": "若要啟用方向，請確定在 ArcGIS Online 項目中啟用路線規劃。"
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
  "symbolPickerPreviewText": "預覽:",
  "showToolToSelectLabel": "設定位置按鈕",
  "showToolToSelectHintText": "提示: 按一下地圖時提供按鈕以設定地圖上的位置，而非一律設定位置"
});