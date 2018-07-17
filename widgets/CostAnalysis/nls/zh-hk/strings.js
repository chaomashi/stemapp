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
  "_widgetLabel": "成本分析 Beta",
  "unableToFetchInfoErrMessage": "無法擷取幾何服務/配置的圖層詳細資訊",
  "invalidCostingGeometryLayer": "無法在成本幾何圖層中取得 'esriFieldTypeGlobalID’。",
  "projectLayerNotFound": "在地圖中找不到配置的專案圖層。",
  "costingGeometryLayerNotFound": "在地圖中找不到配置的成本幾何圖層。",
  "projectMultiplierTableNotFound": "在地圖中找不到配置的專案乘數附加成本表。",
  "projectAssetTableNotFound": "在地圖中找不到配置的專案資產表。",
  "createLoadProject": {
    "createProjectPaneTitle": "建立專案",
    "loadProjectPaneTitle": "載入專案",
    "projectNamePlaceHolder": "專案名稱",
    "projectDescPlaceHolder": "專案描述",
    "selectProject": "選擇專案",
    "viewInMapLabel": "在地圖中檢視",
    "loadLabel": "載入",
    "createLabel": "建立",
    "deleteProjectConfirmationMsg": "是否確定刪除專案?",
    "noAssetsToViewOnMap": "選擇的專案在地圖上沒有要檢視的任何資產。",
    "projectDeletedMsg": "已成功刪除專案。",
    "errorInCreatingProject": "建立專案時出錯。",
    "errorProjectNotFound": "找不到專案。",
    "errorInLoadingProject": "請檢查是否已選擇有效的專案。",
    "errorProjectNotSelected": "從下拉式清單選擇專案",
    "errorDuplicateProjectName": "專案名稱已存在。"
  },
  "statisticsSettings": {
    "tabTitle": "統計資料設定",
    "addStatisticsLabel": "新增統計資料",
    "addNewStatisticsText": "新增統計資料",
    "deleteStatisticsText": "刪除統計資料",
    "moveStatisticsUpText": "向上移動統計資料",
    "moveStatisticsDownText": "向下移動統計資料",
    "layerNameTitle": "圖層",
    "statisticsTypeTitle": "類型",
    "fieldNameTitle": "欄位",
    "statisticsTitle": "標籤",
    "actionLabelTitle": "操作",
    "selectDeselectAllTitle": "全選"
  },
  "statisticsType": {
    "countLabel": "計數",
    "averageLabel": "平均值",
    "maxLabel": "最大值",
    "minLabel": "最小值",
    "summationLabel": "總和",
    "areaLabel": "面積",
    "lengthLabel": "長度"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "需要在圖層設定頁籤中將圖層勾選為可編輯"
  },
  "workBench": {
    "refresh": "重新整理",
    "noAssetAddedMsg": "未新增資產",
    "units": "單位",
    "assetDetailsTitle": "資產項目詳細資訊",
    "costEquationTitle": "成本方程式",
    "newCostEquationTitle": "新建方程式",
    "defaultCostEquationTitle": "預設方程式",
    "geographyTitle": "地理",
    "scenarioTitle": "案例",
    "costingInfoHintText": "<div>提示: 使用下列關鍵字</div><ul><li><b>{TOTALCOUNT}</b>: 在地理中使用相同類型資產的總數</li><li><b>{MEASURE}</b>: 為線資產使用長度，並為多邊形資產使用面積</li><li><b>{TOTALMEASURE}</b>: 為線資產使用總長度，並為地理中相同類型的多邊形資產使用總面積</li></ul> 您可以使用函數，例如:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>請依據專案需求編輯成本方程式。",
    "zoomToAsset": "縮放至資產",
    "deleteAsset": "刪除資產",
    "closeDialog": "關閉對話方塊",
    "objectIdColTitle": "物件 Id",
    "costColTitle": "成本",
    "errorInvalidCostEquation": "成本方程式無效。",
    "errorInSavingAssetDetails": "無法儲存資產詳細資訊。"
  },
  "assetDetails": {
    "inGeography": " 在 ${geography} 中 ",
    "withScenario": " 使用 ${scenario}",
    "totalCostTitle": "總成本",
    "additionalCostLabel": "說明",
    "additionalCostValue": "值",
    "additionalCostNetValue": "淨值"
  },
  "projectOverview": {
    "assetItemsTitle": "資產項目",
    "assetStatisticsTitle": "資產統計資料",
    "projectSummaryTitle": "專案摘要",
    "projectName": "專案名稱: ${name}",
    "totalCostLabel": "專案總成本 (*):",
    "grossCostLabel": "專案總成本 (*):",
    "roundingLabel": "* 捨去至 '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "無法在專案圖層中儲存專案邊界。",
    "unableToSaveProjectCost": "無法在專案圖層中儲存成本。",
    "roundCostValues": {
      "twoDecimalPoint": "兩位小數點",
      "nearestWholeNumber": "最接近的整數",
      "nearestTen": "最接近的十",
      "nearestHundred": "最接近的百",
      "nearestThousand": "最接近的千",
      "nearestTenThousands": "最接近的數萬"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "專案屬性",
    "projectAttributeTitle": "編輯專案屬性"
  },
  "costEscalation": {
    "costEscalationLabel": "新增其他成本",
    "valueHeader": "值",
    "addCostEscalationText": "新增其他成本",
    "deleteCostEscalationText": "刪除選擇的其他成本",
    "moveCostEscalationUpText": "將選擇的其他成本向上移動",
    "moveCostEscalationDownText": "將選擇的其他成本向下移動",
    "invalidEntry": "一個或多個項目無效。",
    "errorInSavingCostEscalation": "無法儲存其他成本詳細資訊。"
  },
  "scenarioSelection": {
    "popupTitle": "選擇資產的案例",
    "regionLabel": "地理",
    "scenarioLabel": "案例",
    "noneText": "無",
    "copyFeatureMsg": "是否要複製選擇的圖徵?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "詳細統計資料",
    "noDetailStatisticAvailable": "未新增資產統計資料"
  }
});