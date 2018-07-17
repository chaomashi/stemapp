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
  "_widgetLabel": "成本分析测试版",
  "unableToFetchInfoErrMessage": "无法获取几何服务/配置图层的详细信息",
  "invalidCostingGeometryLayer": "无法在成本计算几何图层中获得 'esriFieldTypeGlobalID'。",
  "projectLayerNotFound": "无法在地图中找到配置的工程图层。",
  "costingGeometryLayerNotFound": "无法在地图中找到配置的成本计算几何图层。",
  "projectMultiplierTableNotFound": "无法在地图中找到配置的工程乘数附加成本表。",
  "projectAssetTableNotFound": "无法在地图中找到配置的工程资产表。",
  "createLoadProject": {
    "createProjectPaneTitle": "创建工程",
    "loadProjectPaneTitle": "加载工程",
    "projectNamePlaceHolder": "工程名称",
    "projectDescPlaceHolder": "工程描述",
    "selectProject": "选择工程",
    "viewInMapLabel": "在地图中查看",
    "loadLabel": "加载",
    "createLabel": "创建",
    "deleteProjectConfirmationMsg": "确定要删除工程?",
    "noAssetsToViewOnMap": "选定的工程没有任何可以在地图上查看的资产。",
    "projectDeletedMsg": "工程已成功删除。",
    "errorInCreatingProject": "创建工程时出错。",
    "errorProjectNotFound": "找不到工程。",
    "errorInLoadingProject": "请检查是否选择了有效的工程。",
    "errorProjectNotSelected": "从下拉列表中选择一个工程",
    "errorDuplicateProjectName": "工程名称已存在。"
  },
  "statisticsSettings": {
    "tabTitle": "统计数据设置",
    "addStatisticsLabel": "添加统计数据",
    "addNewStatisticsText": "添加新统计数据",
    "deleteStatisticsText": "删除统计数据",
    "moveStatisticsUpText": "上移统计数据",
    "moveStatisticsDownText": "下移统计数据",
    "layerNameTitle": "图层",
    "statisticsTypeTitle": "类型",
    "fieldNameTitle": "字段",
    "statisticsTitle": "标注",
    "actionLabelTitle": "操作",
    "selectDeselectAllTitle": "全选"
  },
  "statisticsType": {
    "countLabel": "计数",
    "averageLabel": "平均值",
    "maxLabel": "最大值",
    "minLabel": "最小值",
    "summationLabel": "总和",
    "areaLabel": "面积",
    "lengthLabel": "长度"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "需要在图层设置选项卡中将图层选中为可编辑"
  },
  "workBench": {
    "refresh": "刷新",
    "noAssetAddedMsg": "未添加资产",
    "units": "单位",
    "assetDetailsTitle": "资产项目详细信息",
    "costEquationTitle": "成本方程",
    "newCostEquationTitle": "新方程",
    "defaultCostEquationTitle": "默认方程",
    "geographyTitle": "地理",
    "scenarioTitle": "方案",
    "costingInfoHintText": "<div>提示：使用以下关键字</div><ul><li><b>{TOTALCOUNT}</b>：在地理中使用同一类型资产的总数</li><li><b>{MEASURE}</b>：使用线资产的长度和面资产的面积</li><li><b>{TOTALMEASURE}</b>：在地理中使用同一类型的线资产的总长度和面资产的总面积</li></ul>您可以使用如下功能：<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>请根据您的工程需要编辑成本方程。",
    "zoomToAsset": "缩放至资产",
    "deleteAsset": "删除资产",
    "closeDialog": "关闭对话框",
    "objectIdColTitle": "对象 ID",
    "costColTitle": "成本",
    "errorInvalidCostEquation": "无效的成本方程。",
    "errorInSavingAssetDetails": "无法保存资产详细信息。"
  },
  "assetDetails": {
    "inGeography": " 在 ${geography} 中 ",
    "withScenario": " 使用 ${scenario}",
    "totalCostTitle": "总成本",
    "additionalCostLabel": "说明",
    "additionalCostValue": "值",
    "additionalCostNetValue": "净值"
  },
  "projectOverview": {
    "assetItemsTitle": "资产项目",
    "assetStatisticsTitle": "资产统计数据",
    "projectSummaryTitle": "工程摘要",
    "projectName": "工程名称：${name}",
    "totalCostLabel": "工程总成本(*)：",
    "grossCostLabel": "总工程成本(*)：",
    "roundingLabel": "* 四舍五入到 '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "无法在工程图层中保存工程边界。",
    "unableToSaveProjectCost": "无法在工程图层中保存成本。",
    "roundCostValues": {
      "twoDecimalPoint": "两个小数点",
      "nearestWholeNumber": "最近似的整数",
      "nearestTen": "最近似的十位",
      "nearestHundred": "最近似的百位",
      "nearestThousand": "最近似的千位",
      "nearestTenThousands": "最近似的万位"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "工程属性",
    "projectAttributeTitle": "编辑工程属性"
  },
  "costEscalation": {
    "costEscalationLabel": "添加附加成本",
    "valueHeader": "值",
    "addCostEscalationText": "添加附加成本",
    "deleteCostEscalationText": "删除选定的附加成本",
    "moveCostEscalationUpText": "上移选定的附加成本",
    "moveCostEscalationDownText": "下移选定的附加成本",
    "invalidEntry": "一个或多个条目无效。",
    "errorInSavingCostEscalation": "无法保存附加成本详细信息。"
  },
  "scenarioSelection": {
    "popupTitle": "为资产选择方案",
    "regionLabel": "地理",
    "scenarioLabel": "方案",
    "noneText": "无",
    "copyFeatureMsg": "是否复制所选要素?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "详细统计数据",
    "noDetailStatisticAvailable": "未添加资产统计数据"
  }
});