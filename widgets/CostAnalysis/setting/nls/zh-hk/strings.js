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
  "configText": "設定配置文字:",
  "generalSettings": {
    "tabTitle": "一般設定",
    "measurementUnitLabel": "測量單位",
    "currencyLabel": "測量符號",
    "roundCostLabel": "回合成本",
    "projectOutputSettings": "專案輸出設定",
    "typeOfProjectAreaLabel": "專案區域的類型",
    "bufferDistanceLabel": "緩衝距離",
    "roundCostValues": {
      "twoDecimalPoint": "兩位小數點",
      "nearestWholeNumber": "最接近的整數",
      "nearestTen": "最接近的十",
      "nearestHundred": "最接近的百",
      "nearestThousand": "最接近的千",
      "nearestTenThousands": "最接近的數萬"
    },
    "projectAreaType": {
      "outline": "清單",
      "buffer": "緩衝區"
    },
    "errorMessages": {
      "currency": "貨幣單位無效",
      "bufferDistance": "緩衝區距離無效",
      "outOfRangebufferDistance": "值必須大於 0，並小於或等於 100。"
    }
  },
  "projectSettings": {
    "tabTitle": "專案設定",
    "costingGeometrySectionTitle": "定義成本的地理 (選用)",
    "costingGeometrySectionNote": "附註: 配置此圖層將允許使用者根據地理來設定圖徵樣板的成本方程式。",
    "projectTableSectionTitle": "儲存/載入專案設定的能力 (選用)",
    "projectTableSectionNote": "附註: 配置所有表格和圖層將允許使用者儲存/載入專案，供稍後使用之用。",
    "costingGeometryLayerLabel": "成本幾何圖層",
    "fieldLabelGeography": "標籤地理的欄位",
    "projectAssetsTableLabel": "專案資產表",
    "projectMultiplierTableLabel": "專案乘數附加成本表",
    "projectLayerLabel": "專案圖層",
    "configureFieldsLabel": "配置欄位",
    "fieldDescriptionHeaderTitle": "欄位描述",
    "layerFieldsHeaderTitle": "圖層欄位",
    "selectLabel": "選擇",
    "errorMessages": {
      "duplicateLayerSelection": "已選擇 ${layerName}",
      "invalidConfiguration": "請選擇 ${fieldsString}"
    },
    "costingGeometryHelp": "<p>將顯示包含下列條件的多邊形圖層: <br/> <li>\t圖層必須具有「查詢」功能</li><li>\t圖層必須具有 GlobalID 欄位</li></p>",
    "fieldToLabelGeographyHelp": "<p>選擇的「成本幾何圖層」的字串和數值欄位，將在「標籤地理的欄位」下拉式清單中顯示。</p>",
    "projectAssetsTableHelp": "<p>將顯示包含下列條件的表格: <br/> <li>表格必須具有名為「建立」、「刪除」和「更新的」的功能</li>    <li>表格必須具有包含實際名稱和資料類型的六個欄位:</li><ul><li>\tAssetGUID (GUID 類型欄位)</li><li>\tCostEquation (字串類型欄位)</li><li>\tScenario (字串類型欄位)</li><li>\tTemplateName (字串類型欄位)</li><li>    GeographyGUID (GUID 類型欄位)</li><li>\tProjectGUID (GUID 類型欄位)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>將顯示包含下列條件的表格: <br/> <li>表格必須具有名為「建立」、「刪除」和「更新的」的功能</li>    <li>表格必須具有包含實際名稱和資料類型的五個欄位:</li><ul><li>\tDescription (字串類型欄位)</li><li>\tType (字串類型欄位)</li><li>\tValue (浮點數/倍整數類型欄位)</li><li>\tCostindex (整數類型欄位)</li><li>   \tProjectGUID (GUID 類型欄位))</li></ul> </p>",
    "projectLayerHelp": "<p>將顯示包含下列條件的多邊形圖層: <br/> <li>圖層必須具有名為「建立」、「刪除」和「更新的」的功能</li>    <li>圖層必須具有包含實際名稱和資料類型的五個欄位:</li><ul><li>ProjectName (字串類型欄位)</li><li>Description (字串類型欄位)</li><li>Totalassetcost (浮點數/倍整數類型欄位)</li><li>Grossprojectcost (浮點數/倍整數類型欄位)</li><li>GlobalID (GlobalID 類型欄位)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "圖層設定",
    "layerNameHeaderTitle": "圖層名稱",
    "layerNameHeaderTooltip": "地圖中的圖層清單",
    "EditableLayerHeaderTitle": "可編輯",
    "EditableLayerHeaderTooltip": "在成本 widget 中包含圖層及其樣板",
    "SelectableLayerHeaderTitle": "可選取的",
    "SelectableLayerHeaderTooltip": "圖徵的幾何可用來產生新的成本項目",
    "fieldPickerHeaderTitle": "專案 ID (選用)",
    "fieldPickerHeaderTooltip": "用來儲存專案 ID 的選用欄位 (屬於類型字串)",
    "selectLabel": "選擇",
    "noAssetLayersAvailable": "在選擇的 Web 地圖中找不到資產圖層",
    "disableEditableCheckboxTooltip": "此圖層沒有編輯功能",
    "missingCapabilitiesMsg": "此圖層缺少下列功能:",
    "missingGlobalIdMsg": "此圖層沒有 GlobalId 欄位",
    "create": "建立",
    "update": "更新",
    "delete": "刪除"
  },
  "costingInfo": {
    "tabTitle": "成本資訊",
    "proposedMainsLabel": "提議的主管道",
    "addCostingTemplateLabel": "新增成本樣板",
    "manageScenariosTitle": "管理案例",
    "featureTemplateTitle": "圖徵樣板",
    "costEquationTitle": "成本方程式",
    "geographyTitle": "地理",
    "scenarioTitle": "案例",
    "actionTitle": "操作",
    "scenarioNameLabel": "案例名稱",
    "addBtnLabel": "新增",
    "srNoLabel": "不會。",
    "deleteLabel": "刪除",
    "duplicateScenarioName": "重複的案例名稱",
    "hintText": "<div>提示: 使用下列關鍵字</div><ul><li><b>{TOTALCOUNT}</b>: 在地理中使用相同類型資產的總數</li><li><b>{MEASURE}</b>: 為線資產使用長度，並為多邊形資產使用面積</li><li><b>{TOTALMEASURE}</b>: 為線資產使用總長度，並為地理中相同類型的多邊形資產使用總面積</li></ul> 您可以使用函數，例如:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>請依據專案需求編輯成本方程式。",
    "noneValue": "無",
    "requiredCostEquation": "${layerName} : ${templateName} 的成本方程式無效",
    "duplicateTemplateMessage": "${layerName} : ${templateName} 存在重複的樣板項目",
    "defaultEquationRequired": "${layerName} : ${templateName} 需要預設的方程式",
    "validCostEquationMessage": "請輸入有效的成本方程式",
    "costEquationHelpText": "請依據您的專案需求編輯成本方程式",
    "scenarioHelpText": "請依據您的專案需求選擇案例",
    "copyRowTitle": "複製列",
    "noTemplateAvailable": "請至少新增 ${layerName} 的一個樣板",
    "manageScenarioLabel": "管理案例",
    "noLayerMessage": "請在 ${tabName} 中至少輸入一個圖層",
    "noEditableLayersAvailable": "需要在圖層設定頁籤中將圖層勾選為可編輯"
  },
  "statisticsSettings": {
    "tabTitle": "統計資料設定",
    "addStatisticsLabel": "新增統計資料",
    "fieldNameTitle": "欄位",
    "statisticsTitle": "標籤",
    "addNewStatisticsText": "新增統計資料",
    "deleteStatisticsText": "刪除統計資料",
    "moveStatisticsUpText": "向上移動統計資料",
    "moveStatisticsDownText": "向下移動統計資料",
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
  }
});