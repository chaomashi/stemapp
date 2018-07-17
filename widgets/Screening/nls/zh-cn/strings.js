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
  "_widgetLabel": "筛查",
  "geometryServicesNotFound": "几何服务不可用。",
  "unableToDrawBuffer": "无法绘制缓冲区。请重试。",
  "invalidConfiguration": "无效的配置。",
  "clearAOIButtonLabel": "重新开始",
  "noGraphicsShapefile": "上传的 shapefile 不含图形。",
  "zoomToLocationTooltipText": "缩放至位置",
  "noGraphicsToZoomMessage": "找不到图形可进行缩放。",
  "placenameWidget": {
    "placenameLabel": "搜索位置"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "选择绘制模式",
    "toggleSelectability": "单击以切换可选择性",
    "chooseLayerTitle": "选择可选的图层",
    "selectAllLayersText": "全选",
    "layerSelectionWarningTooltip": "创建感兴趣区域至少应选择一个图层"
  },
  "shapefileWidget": {
    "shapefileLabel": "上传压缩的 shapefile",
    "uploadShapefileButtonText": "上传",
    "unableToUploadShapefileMessage": "无法上传 Shapefile。"
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "定义起点",
    "addButtonTitle": "添加",
    "deleteButtonTitle": "移除",
    "mapTooltipForStartPoint": "单击地图以定义起点",
    "mapTooltipForUpdateStartPoint": "单击地图以更新起点",
    "locateText": "定位",
    "locateByMapClickText": "选择初始坐标",
    "enterBearingAndDistanceLabel": "输入距离起点的方位角和距离",
    "bearingTitle": "方位角",
    "distanceTitle": "距离",
    "planSettingTooltip": "测量图设置",
    "invalidLatLongMessage": "请输入有效值。"
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "缓冲距离(可选)",
    "bufferInputLabel": "显示以下范围内的结果"
  },
  "traverseSettings": {
    "bearingLabel": "方位角",
    "lengthLabel": "长度",
    "addButtonTitle": "添加",
    "deleteButtonTitle": "移除"
  },
  "planSettings": {
    "expandGridTooltipText": "展开格网",
    "collapseGridTooltipText": "折叠格网",
    "directionUnitLabelText": "方向单位",
    "distanceUnitLabelText": "距离和长度单位",
    "planSettingsComingSoonText": "即将推出"
  },
  "newTraverse": {
    "invalidBearingMessage": "方位角无效。",
    "invalidLengthMessage": "长度无效。",
    "negativeLengthMessage": "负值长度"
  },
  "reportsTab": {
    "aoiAreaText": "感兴趣区域",
    "downloadButtonTooltip": "下载",
    "printButtonTooltip": "打印",
    "uploadShapefileForAnalysisText": "上传 Shapefile 以包括在分析中",
    "uploadShapefileForButtonText": "浏览",
    "downloadLabelText": "选择格式：",
    "downloadBtnText": "下载",
    "noDetailsAvailableText": "未找到任何结果",
    "featureCountText": "计数",
    "featureAreaText": "区域",
    "featureLengthText": "长度",
    "attributeChooserTooltip": "选择要显示的属性",
    "csv": "CSV",
    "filegdb": "文件地理数据库",
    "shapefile": "Shapefile",
    "noFeaturesFound": "未找到所选文件格式的结果",
    "selectReportFieldTitle": "选择文件",
    "noFieldsSelected": "未选择字段",
    "intersectingFeatureExceedsMsgOnCompletion": "一个或多个图层超过最大记录计数。",
    "unableToAnalyzeText": "无法分析，已超过最大记录计数。",
    "errorInPrintingReport": "无法打印报表。请检查报表设置是否有效。",
    "aoiInformationTitle": "感兴趣区域(AOI)信息",
    "summaryReportTitle": "汇总",
    "notApplicableText": "N/A",
    "downloadReportConfirmTitle": "确认下载",
    "downloadReportConfirmMessage": "是否确认下载?",
    "noDataText": "无数据",
    "createReplicaFailedMessage": "以下图层的下载操作失败：<br/> ${layerNames}",
    "extractDataTaskFailedMessage": "下载操作失败。",
    "printLayoutLabelText": "布局",
    "printBtnText": "打印",
    "printDialogHint": "注意：可在报表预览中编辑报表标题和评论。",
    "unableToDownloadFileGDBText": "无法为包含点或线位置的感兴趣区域下载文件地理数据库。",
    "unableToDownloadShapefileText": "无法为包含点或线位置的感兴趣区域下载 Shapefile。",
    "analysisUnitLabelText": "以下列单位显示结果：",
    "analysisUnitButtonTooltip": "选择要分析的单位",
    "analysisCloseBtnText": "关闭",
    "feetUnit": "英尺/平方英尺",
    "milesUnit": "英里/英亩",
    "metersUnit": "米/平方米",
    "kilometersUnit": "千米/平方千米",
    "hectaresUnit": "千米/公顷",
    "hectaresAbbr": "公顷",
    "layerNotVisibleText": "无法分析，图层关闭或超出比例可见范围。",
    "refreshBtnTooltip": "刷新报表",
    "featureCSVAreaText": "与区域相交",
    "featureCSVLengthText": "与长度相交",
    "errorInFetchingPrintTask": "获取打印任务信息时出错。请再试一次。"
  }
});