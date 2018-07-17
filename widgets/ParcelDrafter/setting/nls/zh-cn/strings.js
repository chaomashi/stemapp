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
  "setBtnLabel": "设置",
  "selectLabel": "选择",
  "selectLayerLabel": "选择宗地图层",
  "selectLayerHintText": "提示：使用设置按钮可选择宗地面及其相关线图层",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "所选面图层没有有效的相关图层。"
  },
  "parcelLineLayer": {
    "selectLayerLabel": "选择相关线图层",
    "layerSettingTabLabel": "宗地图层",
    "advancedSettingTabLabel": "高级设置",
    "selectLayerHintText": "提示：用于存储宗地线图层中的 COGO 值",
    "selectFieldLegendLabel": "选择字段以存储宗地线图层中的 COGO 值",
    "bearingFieldLabel": "方位角",
    "chordLengthFieldLabel": "弦长",
    "distanceFieldLabel": "距离",
    "sequenceIdFieldLabel": "顺序 ID",
    "radiusFieldLabel": "半径",
    "foreignKeyFieldLabel": "外键",
    "arcLengthFieldLabel": "弧长",
    "lineTypeFieldLabel": "线类型",
    "parcelPointSymbolLabel": "宗地点符号",
    "parcelPointSymbolHintText": "提示：用于显示线原点的点符号。",
    "symbolPickerPreviewText": "预览",
    "selectLineLayerLabel": "选择线图层"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "选择面图层",
    "selectPolygonLayerHintText": "提示：使用可选择宗地面图层",
    "selectFieldLegendLabel": "选择字段以存储宗地面属性",
    "parcelNameLabel": "宗地名称",
    "rotationLabel": "旋转",
    "planNameLabel": "测量图名称",
    "scalingLabel": "缩放",
    "documentTypeLabel": "文档类型",
    "miscloseRatioLabel": "未闭合比率",
    "statedAreaLabel": "指定面积",
    "miscloseDistanceLabel": "未闭合距离",
    "selectPolygonLayerLabelPopUp": "选择面图层"
  },
  "lineTypesTable": {
    "lineTypeLabel": "线类型",
    "valueLabel": "值",
    "symbolLabel": "符号",
    "connectionLineLabel": "连接线",
    "boundaryLineLabel": "边界线"
  },
  "closureSetting": {
    "snappingLayerLabel": "正在捕捉图层",
    "snappingBtnLabel": "设置",
    "snappingLayerHintText": "提示：选择宗地线将捕捉的图层。",
    "miscloseDistanceLabel": "未闭合距离",
    "miscloseDistanceHintText": "提示：指定未闭合距离及其单位。",
    "miscloseRatioLabel": "未闭合比率",
    "miscloseRatioHintText": "提示：指定未闭合比率。",
    "snappingToleranceLabel": "捕捉容差",
    "pixelLabel": "像素",
    "snappingToleranceHintText": "提示：指定捕捉容差。",
    "selectLayerLabel": "选择图层"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "方位角字段无效",
    "chordLengthErrMsg": "弦长无效",
    "distanceFieldErrMsg": "距离无效",
    "sequenceIdFieldErrMsg": "顺序 Id 无效",
    "radiusFieldErrMsg": "半径无效",
    "foreignKeyFieldErrMsg": "外键无效",
    "arcLengthFieldErrMsg": "弧长无效",
    "lineTypeFieldErrMsg": "线类型无效",
    "parcelNameFieldErrMsg": "宗地名称字段无效",
    "planNameFieldErrMsg": "测量图名称字段无效",
    "scaleFieldErrMsg": "比例字段无效",
    "documentTypeFieldErrMsg": "文件类型字段无效",
    "miscloseRatioFieldErrMsg": "未闭合比率字段无效",
    "statedAreaFieldErrMsg": "指定面积字段无效",
    "miscloseDistanceFieldErrMsg": "未闭合距离字段无效",
    "globalIdFieldErrMsg": "所选面图层没有有效的 'esriFieldTypeGlobalID' 字段。",
    "invalidPolylineLayer": "请选择有效的宗地折线图层",
    "invalidPolygonLayer": "请选择有效的宗地面图层",
    "invalidMiscloseDistance": "请输入有效的未闭合距离",
    "invalidSnappingTolerance": "请输入有效的捕捉容差",
    "invalidMiscloseRatio": "请输入有效的未闭合比率",
    "selectDistinctLineTypes": "请选择各线类型中的不同值",
    "invalidConnectionLineType": "连接线值无效",
    "invalidBoundaryLineType": "边界线值无效",
    "selectDistinctPolylineFields": "请为各 COGO 值选择不同的字段。",
    "selectDistinctPolygonFields": "请为各宗地面属性选择不同的字段。"
  }
});