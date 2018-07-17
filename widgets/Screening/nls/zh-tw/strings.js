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
  "_widgetLabel": "篩檢",
  "geometryServicesNotFound": "幾何服務不可用。",
  "unableToDrawBuffer": "無法繪製緩衝區。請重試。",
  "invalidConfiguration": "無效的設定。",
  "clearAOIButtonLabel": "重新開始",
  "noGraphicsShapefile": "上傳的 shapefile 不含圖形。",
  "zoomToLocationTooltipText": "縮放至位置",
  "noGraphicsToZoomMessage": "找不到要放大的圖形。",
  "placenameWidget": {
    "placenameLabel": "搜尋位置"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "選擇繪製模式",
    "toggleSelectability": "按一下以切換選擇能力",
    "chooseLayerTitle": "選擇可選擇的圖層",
    "selectAllLayersText": "全選",
    "layerSelectionWarningTooltip": "必須至少選擇一個圖層才能建立 AOI"
  },
  "shapefileWidget": {
    "shapefileLabel": "上傳壓縮的 shapefile",
    "uploadShapefileButtonText": "上傳",
    "unableToUploadShapefileMessage": "無法上傳 Shapefile。"
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "定義起點",
    "addButtonTitle": "新增",
    "deleteButtonTitle": "移除",
    "mapTooltipForStartPoint": "按一下地圖以定義起點",
    "mapTooltipForUpdateStartPoint": "按一下地圖以更新起點",
    "locateText": "定位",
    "locateByMapClickText": "選擇初始座標",
    "enterBearingAndDistanceLabel": "輸入起點的方位和距離",
    "bearingTitle": "方位",
    "distanceTitle": "距離",
    "planSettingTooltip": "計畫設定",
    "invalidLatLongMessage": "請輸入有效值。"
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "緩衝區距離 (選用)",
    "bufferInputLabel": "顯示以下範圍內的結果"
  },
  "traverseSettings": {
    "bearingLabel": "方位",
    "lengthLabel": "長度",
    "addButtonTitle": "新增",
    "deleteButtonTitle": "移除"
  },
  "planSettings": {
    "expandGridTooltipText": "展開方格",
    "collapseGridTooltipText": "收合方格",
    "directionUnitLabelText": "方向單位",
    "distanceUnitLabelText": "距離和長度單位",
    "planSettingsComingSoonText": "即將推出"
  },
  "newTraverse": {
    "invalidBearingMessage": "方位無效。",
    "invalidLengthMessage": "長度無效。",
    "negativeLengthMessage": "負長度"
  },
  "reportsTab": {
    "aoiAreaText": "AOI 區域",
    "downloadButtonTooltip": "下載",
    "printButtonTooltip": "列印",
    "uploadShapefileForAnalysisText": "上傳 Shapefile 以加入分析中",
    "uploadShapefileForButtonText": "瀏覽",
    "downloadLabelText": "選擇格式:",
    "downloadBtnText": "下載",
    "noDetailsAvailableText": "找不到任何結果",
    "featureCountText": "計數",
    "featureAreaText": "面積",
    "featureLengthText": "長度",
    "attributeChooserTooltip": "選擇要顯示的屬性",
    "csv": "CSV",
    "filegdb": "檔案地理資料庫",
    "shapefile": "Shapefile",
    "noFeaturesFound": "找不到所選檔案格式的結果",
    "selectReportFieldTitle": "選擇欄位",
    "noFieldsSelected": "未選擇欄位",
    "intersectingFeatureExceedsMsgOnCompletion": "已達到一或多個圖層的記錄計數上限。",
    "unableToAnalyzeText": "無法分析，已達到記錄計數上限。",
    "errorInPrintingReport": "無法列印報告。請檢查報告設定是否有效。",
    "aoiInformationTitle": "感興趣區域 (AOI) 資訊",
    "summaryReportTitle": "摘要",
    "notApplicableText": "N/A",
    "downloadReportConfirmTitle": "確認下載",
    "downloadReportConfirmMessage": "是否確定要下載?",
    "noDataText": "無資料",
    "createReplicaFailedMessage": "下列圖層的下載操作失敗: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "下載操作失敗。",
    "printLayoutLabelText": "版面配置",
    "printBtnText": "列印",
    "printDialogHint": "備註: 可在報告預覽中編輯報告標題和評論。",
    "unableToDownloadFileGDBText": "無法為包含點或線條位置的 AOI 下載檔案地理資料庫",
    "unableToDownloadShapefileText": "無法為包含點或線條位置的 AOI 下載 Shapefile",
    "analysisUnitLabelText": "顯示下列結果:",
    "analysisUnitButtonTooltip": "選擇分析的單位",
    "analysisCloseBtnText": "關閉",
    "feetUnit": "英呎 / 平方英呎",
    "milesUnit": "英哩 / 英畝",
    "metersUnit": "公尺 / 平方公尺",
    "kilometersUnit": "公里 / 平方公里",
    "hectaresUnit": "公里 / 公頃",
    "hectaresAbbr": "公頃",
    "layerNotVisibleText": "無法分析、圖層已關閉或超出比例範圍。",
    "refreshBtnTooltip": "重新整理報告",
    "featureCSVAreaText": "相交區域",
    "featureCSVLengthText": "相交長度",
    "errorInFetchingPrintTask": "擷取列印任務資訊時出錯。請再試一次。"
  }
});