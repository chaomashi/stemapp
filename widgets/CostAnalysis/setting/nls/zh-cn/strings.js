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
  "configText": "设置配置文本：",
  "generalSettings": {
    "tabTitle": "常规设置",
    "measurementUnitLabel": "测量单位",
    "currencyLabel": "测量符号",
    "roundCostLabel": "舍入成本",
    "projectOutputSettings": "工程输出设置",
    "typeOfProjectAreaLabel": "工程区域的类型",
    "bufferDistanceLabel": "缓冲距离",
    "roundCostValues": {
      "twoDecimalPoint": "两个小数点",
      "nearestWholeNumber": "最近似的整数",
      "nearestTen": "最近似的十位",
      "nearestHundred": "最近似的百位",
      "nearestThousand": "最近似的千位",
      "nearestTenThousands": "最近似的万位"
    },
    "projectAreaType": {
      "outline": "轮廓",
      "buffer": "缓冲"
    },
    "errorMessages": {
      "currency": "货币单位无效",
      "bufferDistance": "缓冲距离无效",
      "outOfRangebufferDistance": "该值应大于 0 且小于或等于 100"
    }
  },
  "projectSettings": {
    "tabTitle": "工程设置",
    "costingGeometrySectionTitle": "定义成本计算的地理信息(可选)",
    "costingGeometrySectionNote": "注意：配置此图层将允许用户根据地理信息设置要素模板的成本方程。",
    "projectTableSectionTitle": "保存/加载工程设置的功能(可选)",
    "projectTableSectionNote": "注意：配置所有的表和图层将允许用户保存/加载工程以备日后使用。",
    "costingGeometryLayerLabel": "成本计算几何图层",
    "fieldLabelGeography": "标注地理的字段",
    "projectAssetsTableLabel": "工程资产表",
    "projectMultiplierTableLabel": "工程乘数附加成本表",
    "projectLayerLabel": "工程图层",
    "configureFieldsLabel": "配置字段",
    "fieldDescriptionHeaderTitle": "字段描述",
    "layerFieldsHeaderTitle": "图层字段",
    "selectLabel": "选择",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} 已被选中",
      "invalidConfiguration": "请选择 ${fieldsString}"
    },
    "costingGeometryHelp": "<p>将显示具有以下条件的面图层：<br/> <li>\t图层必须具有查询功能</li><li>\t图层必须具有一个 GlobalID 字段</li></p>",
    "fieldToLabelGeographyHelp": "<p>选中的成本计算几何图层的字符串和数值字段将显示在标注地理的字段下拉列表中。</p>",
    "projectAssetsTableHelp": "<p>将显示具有下列条件的表格：<br/> <li>表格必须具有编辑功能，即创建、删除和更新功能</li>    <li>表格必须包含六个具有确切名称和数据类型的字段：</li><ul><li>\tAssetGUID (GUID 类型字段)</li><li>\tCostEquation (字符串型字段)</li><li>\tScenario (字符串型字段)</li><li>\tTemplateName (字符串型字段)</li><li>\tGeographyGUID (GUID 型字段)</li><li> ProjectGUID (GUID 型字段)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>将显示具有下列条件的表格：<br/> <li>表格必须具有编辑功能，即创建、删除和更新功能</li>    <li>表格必须包含五个具有确切名称和数据类型的字段：</li><ul><li>\tDescription (字符串型字段)</li><li>\tType (字符串型字段)</li><li>\tValue (浮点型/双精度型字段)</li><li>\tCostindex (整型字段)</li><li>   \tProjectGUID (GUID 型字段)</li></ul> </p>",
    "projectLayerHelp": "<p>将显示具有下列条件的面图层：<br/> <li>图层必须具有编辑功能，即创建、删除和更新功能</li>    <li>图层必须包含五个具有确切名称和数据类型的字段：</li><ul><li>ProjectName (字符串型字段)</li><li>Description (字符串型字段)</li><li>Totalassetcost (浮点型/双精度型字段)</li><li>Grossprojectcost (浮点型/双精度型字段)</li><li>GlobalID (GlobalID 型字段)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "图层设置",
    "layerNameHeaderTitle": "图层名称",
    "layerNameHeaderTooltip": "地图中的图层列表",
    "EditableLayerHeaderTitle": "可编辑",
    "EditableLayerHeaderTooltip": "在成本计算微件中包含图层及其模板",
    "SelectableLayerHeaderTitle": "可选",
    "SelectableLayerHeaderTooltip": "要素中的几何可用于生成新的成本项目",
    "fieldPickerHeaderTitle": "工程 ID (可选)",
    "fieldPickerHeaderTooltip": "用于存储工程 ID 的可选字段(字符串型)",
    "selectLabel": "选择",
    "noAssetLayersAvailable": "在所选 webmap 中未找到资产图层",
    "disableEditableCheckboxTooltip": "该图层没有编辑功能",
    "missingCapabilitiesMsg": "此图层缺少以下功能：",
    "missingGlobalIdMsg": "此图层没有全局 ID 字段",
    "create": "创建",
    "update": "更新",
    "delete": "删除"
  },
  "costingInfo": {
    "tabTitle": "成本计算信息",
    "proposedMainsLabel": "建议的主线",
    "addCostingTemplateLabel": "添加成本计算模板",
    "manageScenariosTitle": "管理方案",
    "featureTemplateTitle": "要素模板",
    "costEquationTitle": "成本方程",
    "geographyTitle": "地理",
    "scenarioTitle": "方案",
    "actionTitle": "操作",
    "scenarioNameLabel": "方案名称",
    "addBtnLabel": "添加",
    "srNoLabel": "否。",
    "deleteLabel": "删除",
    "duplicateScenarioName": "重复的方案名称",
    "hintText": "<div>提示：使用以下关键字</div><ul><li><b>{TOTALCOUNT}</b>：在地理中使用同一类型资产的总数</li><li><b>{MEASURE}</b>：使用线资产的长度和面资产的面积</li><li><b>{TOTALMEASURE}</b>：在地理中使用同一类型的线资产的总长度和面资产的总面积</li></ul>您可以使用如下功能：<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>请根据您的工程需要编辑成本方程。",
    "noneValue": "无",
    "requiredCostEquation": "${layerName} 的成本公式无效：${templateName}",
    "duplicateTemplateMessage": "存在针对 ${layerName} 的重复模板条目：${templateName}",
    "defaultEquationRequired": "${layerName} 需要默认方程：${templateName}",
    "validCostEquationMessage": "请输入有效的成本方程",
    "costEquationHelpText": "请根据您的工程需要编辑成本方程",
    "scenarioHelpText": "请根据您的工程需要选择方案",
    "copyRowTitle": "复制行",
    "noTemplateAvailable": "请为 ${layerName} 至少添加一个模板",
    "manageScenarioLabel": "管理方案",
    "noLayerMessage": "请在 ${tabName} 中至少输入一个图层",
    "noEditableLayersAvailable": "需要在图层设置选项卡中将图层选中为可编辑"
  },
  "statisticsSettings": {
    "tabTitle": "统计数据设置",
    "addStatisticsLabel": "添加统计数据",
    "fieldNameTitle": "字段",
    "statisticsTitle": "标注",
    "addNewStatisticsText": "添加新统计数据",
    "deleteStatisticsText": "删除统计数据",
    "moveStatisticsUpText": "上移统计数据",
    "moveStatisticsDownText": "下移统计数据",
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
  }
});