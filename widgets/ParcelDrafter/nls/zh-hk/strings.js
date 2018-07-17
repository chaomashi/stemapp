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
  "_widgetLabel": "宗地草稿",
  "newTraverseButtonLabel": "啟動新行程",
  "invalidConfigMsg": "設定無效",
  "geometryServiceURLNotFoundMSG": "無法取得幾何服務 URL",
  "editTraverseButtonLabel": "編輯行程",
  "mapTooltipForStartNewTraverse": "請選擇地圖上的點或在下方輸入以開始執行",
  "mapTooltipForEditNewTraverse": "請選擇要編輯的宗地",
  "mapTooltipForUpdateStartPoint": "按一下以更新起點",
  "mapTooltipForScreenDigitization": "按一下以新增宗地點",
  "mapTooltipForRotate": "拖曳旋轉",
  "mapTooltipForScale": "拖曳以調整",
  "backButtonTooltip": "返回",
  "newTraverseTitle": "新增行程",
  "editTraverseTitle": "編輯行程",
  "clearingDataConfirmationMessage": "變更將捨棄，要否要繼續?",
  "unableToFetchParcelMessage": "無法擷取宗地。",
  "unableToFetchParcelLinesMessage": "無法擷取宗地線。",
  "planSettings": {
    "planSettingsTitle": "設定",
    "directionOrAngleTypeLabel": "方向或角度類型",
    "directionOrAngleUnitsLabel": "方向或角度單位",
    "distanceAndLengthUnitsLabel": "距離和長度單位",
    "areaUnitsLabel": "面積單位",
    "circularCurveParameters": "圓曲線參數",
    "northAzimuth": "北向方位角",
    "southAzimuth": "南向方位角",
    "quadrantBearing": "象限方位",
    "radiusAndChordLength": "半徑和弦長",
    "radiusAndArcLength": "半徑和弧長",
    "expandGridTooltipText": "展開方格",
    "collapseGridTooltipText": "收合方格",
    "zoomToLocationTooltipText": "縮放至位置",
    "onScreenDigitizationTooltipText": "數字化"
  },
  "traverseSettings": {
    "bearingLabel": "方位",
    "lengthLabel": "長度",
    "radiusLabel": "半徑",
    "noMiscloseCalculated": "未計算不閉合",
    "traverseMiscloseBearing": "不閉合方位",
    "traverseAccuracy": "準確性",
    "accuracyHigh": "高",
    "traverseDistance": "不閉合距離",
    "traverseMiscloseRatio": "不閉合比率",
    "traverseStatedArea": "規定的面積",
    "traverseCalculatedArea": "計算的面積",
    "addButtonTitle": "新增",
    "deleteButtonTitle": "移除"
  },
  "parcelTools": {
    "rotationToolLabel": "角度",
    "scaleToolLabel": "比例"
  },
  "newTraverse": {
    "invalidBearingMessage": "方位無效。",
    "invalidLengthMessage": "長度無效。",
    "invalidRadiusMessage": "半徑無效。",
    "negativeLengthMessage": "僅對曲線有效",
    "enterValidValuesMessage": "請輸入有效值。",
    "enterValidParcelInfoMessage": "請輸入要儲存的部分有效的宗地資訊。",
    "unableToDrawLineMessage": "無法繪製線條。",
    "invalidEndPointMessage": "端點無效，無法繪製線條。"
  },
  "planInfo": {
    "requiredText": "(必填)",
    "optionalText": "(可選)",
    "parcelNamePlaceholderText": "宗地名稱",
    "parcelDocumentTypeText": "文件類型",
    "planNamePlaceholderText": "計畫名稱",
    "cancelButtonLabel": "取消",
    "saveButtonLabel": "儲存",
    "saveNonClosedParcelConfirmationMessage": "輸入的宗地未封閉，是否仍要繼續並僅儲存宗地線?",
    "unableToCreatePolygonParcel": "無法建立宗地多邊形。",
    "unableToSavePolygonParcel": "無法儲存宗地多邊形。",
    "unableToSaveParcelLines": "無法儲存宗地線。",
    "unableToUpdateParcelLines": "無法更新宗地線。",
    "parcelSavedSuccessMessage": "已成功儲存宗地。",
    "enterValidParcelNameMessage": "請輸入有效的宗地名稱。",
    "enterValidPlanNameMessage": "請輸入有效的計畫名稱。",
    "enterValidDocumentTypeMessage": "文件類型無效。",
    "enterValidStatedAreaNameMessage": "請輸入有效的規定面積。"
  },
  "xyInput": {
    "explanation": "在宗地圖層的空間參考中"
  }
});