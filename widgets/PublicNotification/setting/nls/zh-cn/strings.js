/*
 | Copyright 2017 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define({
  "searchSourceSetting": {
    "title": "搜索和缓冲区设置",
    "mainHint": "您可以启用地址和要素的文本搜索、几何数字化和缓冲。"
  },
  "addressSourceSetting": {
    "title": "地址图层",
    "mainHint": "您可以指定哪些地址标注图层可用。"
  },
  "notificationSetting": {
    "title": "通知选项",
    "mainHint": "您可以指定哪些类型的通知可用。"
  },
  "groupingLabels": {
    "addressSources": "用于选择地址图层的图层",
    "averyStickersDetails": "Avery(r) 贴纸",
    "csvDetails": "逗号分隔值 (CSV) 文件",
    "drawingTools": "用于指定区域的绘图工具",
    "featureLayerDetails": "要素图层",
    "geocoderDetails": "地理编码器",
    "labelFormats": "可用的标注格式",
    "printingOptions": "打印标注页面的选项",
    "searchSources": "搜索源",
    "stickerFormatDetails": "标注页面参数"
  },
  "hints": {
    "alignmentAids": "将标记添加到标注页面以帮助您将页面与打印机对齐",
    "csvNameList": "区分大小写字段名称的逗号分隔列表",
    "horizontalGap": "一行中两个标注之间的空格",
    "insetToLabel": "标注的一侧与文本开头之间的空格",
    "labelFormatDescription": "如何在微件格式选项列表中呈现标注样式",
    "labelFormatDescriptionHint": "在格式选项列表中补充说明的工具提示",
    "labelHeight": "页面上每个标注的高度",
    "labelWidth": "页面上每个标注的宽度",
    "localSearchRadius": "指定以当前地图中心为中心的区域半径，用于提升地理编码候选项的等级，以便先返回距离位置最近的候选项",
    "rasterResolution": "每英寸 100 像素大致匹配屏幕分辨率。分辨率越高，需要的浏览器内存越多。浏览器在正常处理大内存需求方面的能力不同。",
    "selectionListOfOptionsToDisplay": "选中的项目在微件中显示为选项；根据需要更改排序",
    "verticalGap": "一列中两个标注之间的空格"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "默认缓冲距离",
    "bufferUnits": "要在微件中提供的缓冲区单位",
    "countryRegionCodes": "国家或区域代码",
    "description": "说明",
    "descriptionHint": "说明提示",
    "displayField": "显示字段",
    "drawingToolsFreehandPolygon": "手绘面",
    "drawingToolsLine": "线",
    "drawingToolsPoint": "点",
    "drawingToolsPolygon": "面",
    "drawingToolsPolyline": "折线",
    "enableLocalSearch": "启用本地搜索",
    "exactMatch": "完全匹配",
    "fontSizeAlignmentNote": "有关打印边距的注释的字体大小",
    "gridDarkness": "格网暗度",
    "gridlineLeftInset": "左格网线插图",
    "gridlineMajorTickMarksGap": "主刻度线，每个",
    "gridlineMinorTickMarksGap": "分刻度线，每个",
    "gridlineRightInset": "右格网线插图",
    "labelBorderDarkness": "标注边框暗度",
    "labelBottomEdge": "页面上标注的底边",
    "labelFontSize": "字号",
    "labelHeight": "标注高度",
    "labelHorizontalGap": "水平间距",
    "labelInitialInset": "标注文本插图",
    "labelLeftEdge": "页面上标注的左边",
    "labelMaxLineCount": "标注中的最大行数",
    "labelPageHeight": "页面高度",
    "labelPageWidth": "页面宽度",
    "labelRightEdge": "页面上标注的右边",
    "labelsInAColumn": "一列中的标注数量",
    "labelsInARow": "一行中的标注数量",
    "labelTopEdge": "页面上标注的顶边",
    "labelVerticalGap": "垂直间距",
    "labelWidth": "标注宽度",
    "limitSearchToMapExtent": "仅在当前地图范围内搜索",
    "maximumResults": "最大结果数",
    "maximumSuggestions": "最大建议数",
    "minimumScale": "最小比例",
    "name": "名称",
    "percentBlack": "黑色百分比(%)",
    "pixels": "像素",
    "pixelsPerInch": "每英寸像素",
    "placeholderText": "占位符文本",
    "placeholderTextForAllSources": "用于搜索全部源的占位符文本",
    "radius": "半径",
    "rasterResolution": "栅格分辨率",
    "searchFields": "搜索字段",
    "showAlignmentAids": "在页面上显示对齐帮助",
    "showGridTickMarks": "显示格网刻度线",
    "showLabelOutlines": "显示标注轮廓",
    "showPopupForFoundItem": "显示已找到要素或位置的弹出窗口",
    "tool": "工具",
    "units": "单位",
    "url": "URL",
    "urlToGeometryService": "几何服务的 URL",
    "useRelatedRecords": "使用其相关记录",
    "useSecondarySearchLayer": "使用次要选择图层",
    "useSelectionDrawTools": "使用选择绘制工具",
    "useVectorFonts": "使用矢量字体(仅限拉丁字体)",
    "zoomScale": "缩放比例"
  },
  "buttons": {
    "addAddressSource": "在弹出窗口中添加包含地址标注的图层",
    "addLabelFormat": "添加标注格式",
    "addSearchSource": "添加搜索源",
    "set": "设置"
  },
  "placeholders": {
    "averyExample": "例如，Avery(r) 标注 ${averyPartNumber}",
    "countryRegionCodes": "例如，USA、CHN",
    "descriptionCSV": "逗号分隔值",
    "descriptionPDF": "PDF 标注 ${heightLabelIn} x ${widthLabelIn} 英寸；每页 ${labelsPerPage} 个"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "从 webmap 获取要素图层",
    "openCountryCodes": "单击以获取关于代码的更多信息",
    "openFieldSelector": "单击打开一个字段选择器",
    "setAndValidateURL": "设置和验证 URL"
  },
  "problems": {
    "noAddresseeLayers": "请至少指定一个收件人图层",
    "noBufferUnitsForDrawingTools": "请为绘图工具至少配置一个缓冲单位",
    "noBufferUnitsForSearchSource": "请为搜索源“${sourceName}”至少配置一个缓冲单位",
    "noGeometryServiceURL": "请将 URL 配置为几何服务",
    "noNotificationLabelFormats": "请至少指定一个通知标注格式",
    "noSearchSourceFields": "请为搜索源“${sourceName}”配置一个或多个搜索字段",
    "noSearchSourceURL": "请为搜索源“${sourceName}”配置 URL"
  }
});