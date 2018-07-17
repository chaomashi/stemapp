/*
 | Copyright 2017 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define({
  "searchSourceSetting": {
    "title": "搜尋和緩衝區設定",
    "mainHint": "您可以啟用位址和圖徵的文字搜尋、幾何數位化和緩衝。"
  },
  "addressSourceSetting": {
    "title": "位址圖層",
    "mainHint": "您可以指定可用的收件人標籤圖層。"
  },
  "notificationSetting": {
    "title": "通知選項",
    "mainHint": "您可以指定可用的通知類型。"
  },
  "groupingLabels": {
    "addressSources": "用來選擇收件人圖層的圖層",
    "averyStickersDetails": "Avery(r) 貼紙",
    "csvDetails": "逗號分隔值 (CSV) 檔案",
    "drawingTools": "用於指定區域的繪製工具",
    "featureLayerDetails": "圖徵圖層",
    "geocoderDetails": "地理編碼器",
    "labelFormats": "可用的標籤格式",
    "printingOptions": "適用於列印之標籤頁面的選項",
    "searchSources": "搜尋來源",
    "stickerFormatDetails": "標籤頁面參數"
  },
  "hints": {
    "alignmentAids": "在標籤頁面加入標記，協助您對齊頁面與印表機",
    "csvNameList": "區分大小寫欄位名稱的逗號分隔清單",
    "horizontalGap": "列中兩個標籤之間的空格",
    "insetToLabel": "標籤側邊與文字開頭之間的空格",
    "labelFormatDescription": "標籤樣式在 widget 格式選項清單中的呈現方式",
    "labelFormatDescriptionHint": "格式選項清單中補充說明的工具提示",
    "labelHeight": "頁面上每個標籤的高度",
    "labelWidth": "頁面上每個標籤的寬度",
    "localSearchRadius": "指定目前地圖中心周圍的區域半徑，可用來提升地理編碼候選者的等級，以優先傳回離位置最近的候選者",
    "rasterResolution": "每英吋 100 像素大約符合螢幕解析度。解析度越高，就需要更多的瀏覽器記憶體。瀏覽器在適當處理大量記憶體需求的能力各有不同。",
    "selectionListOfOptionsToDisplay": "檢查的項目在 widget 中會顯示成選項，請視需要變更順序",
    "verticalGap": "欄中兩個標籤之間的空格"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "預設緩衝區距離",
    "bufferUnits": "在 widget 中提供的緩衝區單位",
    "countryRegionCodes": "國碼或地區代碼",
    "description": "說明",
    "descriptionHint": "說明提示",
    "displayField": "顯示欄位",
    "drawingToolsFreehandPolygon": "手繪多邊形",
    "drawingToolsLine": "線條",
    "drawingToolsPoint": "點",
    "drawingToolsPolygon": "多邊形",
    "drawingToolsPolyline": "折線",
    "enableLocalSearch": "啟用本機搜尋",
    "exactMatch": "完全符合",
    "fontSizeAlignmentNote": "列印邊界的相關備註的字型大小",
    "gridDarkness": "方格暗度",
    "gridlineLeftInset": "左格線插入",
    "gridlineMajorTickMarksGap": "每個主要刻度標記",
    "gridlineMinorTickMarksGap": "每個次要刻度標記",
    "gridlineRightInset": "右格線插入",
    "labelBorderDarkness": "標籤邊界暗度",
    "labelBottomEdge": "頁面上標籤的底部邊緣",
    "labelFontSize": "字型大小",
    "labelHeight": "標籤高度",
    "labelHorizontalGap": "水平間隙",
    "labelInitialInset": "插入到標籤文字",
    "labelLeftEdge": "頁面上標籤的左側邊緣",
    "labelMaxLineCount": "標籤中的行數上限",
    "labelPageHeight": "頁面高度",
    "labelPageWidth": "頁面寬度",
    "labelRightEdge": "頁面上標籤的右側邊緣",
    "labelsInAColumn": "欄中的標籤數目",
    "labelsInARow": "列中的標籤數目",
    "labelTopEdge": "頁面上標籤的頂端邊緣",
    "labelVerticalGap": "垂直間隙",
    "labelWidth": "標籤寬度",
    "limitSearchToMapExtent": "僅在目前的地圖範圍中搜尋",
    "maximumResults": "最大結果數",
    "maximumSuggestions": "最大建議數",
    "minimumScale": "最小比例",
    "name": "名稱",
    "percentBlack": "黑色%",
    "pixels": "像素",
    "pixelsPerInch": "每英吋像素數",
    "placeholderText": "佔位符文字",
    "placeholderTextForAllSources": "用於搜尋所有來源的占位符文字",
    "radius": "半徑",
    "rasterResolution": "點陣解析度",
    "searchFields": "搜尋欄位",
    "showAlignmentAids": "顯示頁面上的對齊協助",
    "showGridTickMarks": "顯示方格刻度標記",
    "showLabelOutlines": "顯示標籤輪廓",
    "showPopupForFoundItem": "顯示發現的圖徵或位置的快顯視窗",
    "tool": "工具",
    "units": "單位",
    "url": "URL",
    "urlToGeometryService": "幾何服務的 URL",
    "useRelatedRecords": "使用其相關記錄",
    "useSecondarySearchLayer": "使用次要選擇圖層",
    "useSelectionDrawTools": "使用選擇繪製工具",
    "useVectorFonts": "使用向量字型 (僅限 Latin 字型)",
    "zoomScale": "縮放比例"
  },
  "buttons": {
    "addAddressSource": "在其快顯視窗中新增包含地址標籤的圖層",
    "addLabelFormat": "新增標籤格式",
    "addSearchSource": "新增搜尋來源",
    "set": "設定"
  },
  "placeholders": {
    "averyExample": "例如，Avery(r) 標籤 ${averyPartNumber}",
    "countryRegionCodes": "例如，USA,CHN",
    "descriptionCSV": "逗號分隔值",
    "descriptionPDF": "PDF 標籤 ${heightLabelIn} x ${widthLabelIn} 英吋; 每頁 ${labelsPerPage}"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "從 Web 地圖取得圖徵圖層",
    "openCountryCodes": "按一下以取得代碼的更多相關資訊",
    "openFieldSelector": "按一下以開啟欄位選擇器",
    "setAndValidateURL": "設定和驗證 URL"
  },
  "problems": {
    "noAddresseeLayers": "請至少指定一個地址圖層",
    "noBufferUnitsForDrawingTools": "請為繪製工具至少配置一個緩衝區單位",
    "noBufferUnitsForSearchSource": "請為搜尋來源 \"${sourceName}” 至少配置一個緩衝區單位",
    "noGeometryServiceURL": "請將 URL 配置到幾何服務",
    "noNotificationLabelFormats": "請至少指定一種通知標籤格式",
    "noSearchSourceFields": "請為搜尋來源 \"${sourceName}” 配置一或多個搜尋欄位",
    "noSearchSourceURL": "請配置搜尋來源 \"${sourceName}” 的 URL"
  }
});