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
  "_widgetLabel": "宗地起草器",
  "newTraverseButtonLabel": "启动新导线",
  "invalidConfigMsg": "无效的配置",
  "geometryServiceURLNotFoundMSG": "无法获取几何服务 URL",
  "editTraverseButtonLabel": "编辑导线",
  "mapTooltipForStartNewTraverse": "请选择地图上的一个点或键入以下内容来开始",
  "mapTooltipForEditNewTraverse": "请选择要编辑的宗地",
  "mapTooltipForUpdateStartPoint": "单击以更新起点",
  "mapTooltipForScreenDigitization": "单击以添加宗地点",
  "mapTooltipForRotate": "拖动以旋转",
  "mapTooltipForScale": "拖动以缩放",
  "backButtonTooltip": "返回",
  "newTraverseTitle": "新建导线",
  "editTraverseTitle": "编辑导线",
  "clearingDataConfirmationMessage": "将放弃更改，是否继续?",
  "unableToFetchParcelMessage": "无法获取宗地。",
  "unableToFetchParcelLinesMessage": "无法获取宗地线。",
  "planSettings": {
    "planSettingsTitle": "设置",
    "directionOrAngleTypeLabel": "方向或角度类型",
    "directionOrAngleUnitsLabel": "方向或角度单位",
    "distanceAndLengthUnitsLabel": "距离和长度单位",
    "areaUnitsLabel": "面积单位",
    "circularCurveParameters": "圆曲线参数",
    "northAzimuth": "北方位角",
    "southAzimuth": "南方位角",
    "quadrantBearing": "象限方位角",
    "radiusAndChordLength": "半径和弦长",
    "radiusAndArcLength": "半径和弧长",
    "expandGridTooltipText": "展开格网",
    "collapseGridTooltipText": "折叠格网",
    "zoomToLocationTooltipText": "缩放至位置",
    "onScreenDigitizationTooltipText": "数字化"
  },
  "traverseSettings": {
    "bearingLabel": "方位角",
    "lengthLabel": "长度",
    "radiusLabel": "半径",
    "noMiscloseCalculated": "未计算未闭合",
    "traverseMiscloseBearing": "未闭合方位角",
    "traverseAccuracy": "精度",
    "accuracyHigh": "高",
    "traverseDistance": "未闭合距离",
    "traverseMiscloseRatio": "未闭合比率",
    "traverseStatedArea": "指定面积",
    "traverseCalculatedArea": "计算的面积",
    "addButtonTitle": "添加",
    "deleteButtonTitle": "移除"
  },
  "parcelTools": {
    "rotationToolLabel": "角度",
    "scaleToolLabel": "比例"
  },
  "newTraverse": {
    "invalidBearingMessage": "方位角无效。",
    "invalidLengthMessage": "长度无效。",
    "invalidRadiusMessage": "半径无效。",
    "negativeLengthMessage": "仅对曲线有效",
    "enterValidValuesMessage": "请输入有效值。",
    "enterValidParcelInfoMessage": "请输入有效的宗地信息以进行保存。",
    "unableToDrawLineMessage": "无法绘制线。",
    "invalidEndPointMessage": "端点无效，无法绘制线。"
  },
  "planInfo": {
    "requiredText": "(必填)",
    "optionalText": "(可选)",
    "parcelNamePlaceholderText": "宗地名称",
    "parcelDocumentTypeText": "文档类型",
    "planNamePlaceholderText": "测量图名称",
    "cancelButtonLabel": "取消",
    "saveButtonLabel": "保存",
    "saveNonClosedParcelConfirmationMessage": "输入的宗地未闭合，是否仍要继续，仅保存宗地线?",
    "unableToCreatePolygonParcel": "无法创建宗地面。",
    "unableToSavePolygonParcel": "无法保存宗地面。",
    "unableToSaveParcelLines": "无法保存宗地线。",
    "unableToUpdateParcelLines": "无法更新宗地线。",
    "parcelSavedSuccessMessage": "宗地保存成功。",
    "enterValidParcelNameMessage": "请输入有效的宗地名称。",
    "enterValidPlanNameMessage": "请输入有效的测量图名称。",
    "enterValidDocumentTypeMessage": "文档类型无效。",
    "enterValidStatedAreaNameMessage": "请输入有效的指定面积。"
  },
  "xyInput": {
    "explanation": "在宗地图层的空间参考中"
  }
});