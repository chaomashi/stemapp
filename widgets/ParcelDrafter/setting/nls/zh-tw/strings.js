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
  "setBtnLabel": "設定",
  "selectLabel": "選擇",
  "selectLayerLabel": "選擇宗地圖層",
  "selectLayerHintText": "提示: 使用設定按鈕來選擇宗地多邊形及其相關的線條圖層",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "選擇的多邊形圖層沒有有效的相關圖層。"
  },
  "parcelLineLayer": {
    "selectLayerLabel": "選擇相關的線條圖層",
    "layerSettingTabLabel": "宗地圖層",
    "advancedSettingTabLabel": "進階設定",
    "selectLayerHintText": "提示: 用來儲存宗地線圖層中的 COGO 值",
    "selectFieldLegendLabel": "選擇欄位以儲存宗地線圖層中的 COGO 值",
    "bearingFieldLabel": "方位",
    "chordLengthFieldLabel": "和弦長度",
    "distanceFieldLabel": "距離",
    "sequenceIdFieldLabel": "序列 ID",
    "radiusFieldLabel": "半徑",
    "foreignKeyFieldLabel": "外部索引鍵",
    "arcLengthFieldLabel": "弧長度",
    "lineTypeFieldLabel": "線類型",
    "parcelPointSymbolLabel": "宗地點符號",
    "parcelPointSymbolHintText": "提示: 用來顯示線條原點的點符號。",
    "symbolPickerPreviewText": "預覽",
    "selectLineLayerLabel": "選擇線條圖層"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "選擇多邊形圖層",
    "selectPolygonLayerHintText": "提示: 用來選擇宗地多邊形圖層",
    "selectFieldLegendLabel": "選擇欄位以儲存宗地多邊形屬性",
    "parcelNameLabel": "宗地名稱",
    "rotationLabel": "旋轉",
    "planNameLabel": "計畫名稱",
    "scalingLabel": "調整",
    "documentTypeLabel": "文件類型",
    "miscloseRatioLabel": "不閉合比率",
    "statedAreaLabel": "規定的面積",
    "miscloseDistanceLabel": "不閉合距離",
    "selectPolygonLayerLabelPopUp": "選擇多邊形圖層"
  },
  "lineTypesTable": {
    "lineTypeLabel": "線類型",
    "valueLabel": "值",
    "symbolLabel": "符號",
    "connectionLineLabel": "連線線條",
    "boundaryLineLabel": "邊界線條"
  },
  "closureSetting": {
    "snappingLayerLabel": "貼齊圖層",
    "snappingBtnLabel": "設定",
    "snappingLayerHintText": "提示: 選擇宗地線將貼齊的圖層。",
    "miscloseDistanceLabel": "不閉合距離",
    "miscloseDistanceHintText": "提示: 指定不閉合距離及其單位。",
    "miscloseRatioLabel": "不閉合比率",
    "miscloseRatioHintText": "提示: 指定不閉合比率。",
    "snappingToleranceLabel": "貼齊容差",
    "pixelLabel": "像素",
    "snappingToleranceHintText": "提示: 指定貼齊容差。",
    "selectLayerLabel": "選擇圖層"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "方位欄位無效",
    "chordLengthErrMsg": "弦長度無效",
    "distanceFieldErrMsg": "距離無效",
    "sequenceIdFieldErrMsg": "順序 Id 無效",
    "radiusFieldErrMsg": "半徑無效",
    "foreignKeyFieldErrMsg": "外部索引鍵無效",
    "arcLengthFieldErrMsg": "弧長度無效",
    "lineTypeFieldErrMsg": "線條類型無效",
    "parcelNameFieldErrMsg": "宗地名稱欄位無效",
    "planNameFieldErrMsg": "計畫名稱欄位無效",
    "scaleFieldErrMsg": "比例欄位無效",
    "documentTypeFieldErrMsg": "文件類型欄位無效",
    "miscloseRatioFieldErrMsg": "不閉合比率欄位無效",
    "statedAreaFieldErrMsg": "規定的面積欄位無效",
    "miscloseDistanceFieldErrMsg": "不閉合距離欄位無效",
    "globalIdFieldErrMsg": "選擇的多邊形圖層沒有有效的 'esriFieldTypeGlobalID' 欄位。",
    "invalidPolylineLayer": "請選擇有效的宗地折線圖層",
    "invalidPolygonLayer": "請選擇有效的宗地多邊形圖層",
    "invalidMiscloseDistance": "請輸入有效的不閉合距離",
    "invalidSnappingTolerance": "請輸入有效的貼齊容差",
    "invalidMiscloseRatio": "請輸入有效的不閉合比率",
    "selectDistinctLineTypes": "請在每一種線條類型中選擇不同值",
    "invalidConnectionLineType": "連線線條值無效",
    "invalidBoundaryLineType": "邊界線條值無效",
    "selectDistinctPolylineFields": "請為每一個 COGO 值選擇不同欄位。",
    "selectDistinctPolygonFields": "請為每一個宗地多邊形屬性選擇不同欄位。"
  }
});