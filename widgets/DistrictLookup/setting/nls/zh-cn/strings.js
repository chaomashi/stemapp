/*global define*/
///////////////////////////////////////////////////////////////////////////
// Copyright © 2015 Esri. All Rights Reserved.
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
  "units": {
    "miles": "英里",
    "kilometers": "千米",
    "feet": "英尺",
    "meters": "米"
  },
  "layerSetting": {
    "layerSettingTabTitle": "搜索设置",
    "buttonSet": "设置",
    "selectLayersLabel": "选择图层",
    "selectLayersHintText": "提示: 用于选择面图层及其相关点图层。",
    "selectPrecinctSymbolLabel": "选择用于高亮显示面的符号",
    "selectGraphicLocationSymbol": "地址或位置符号",
    "graphicLocationSymbolHintText": "提示: 所搜索地址或所单击位置的符号",
    "precinctSymbolHintText": "提示: 用于显示所选面的符号",
    "selectColorForPoint": "选择用于高亮显示点的颜色",
    "selectColorForPointHintText": "提示: 用于显示所选点的高亮颜色"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "搜索源设置",
    "searchSourceSettingTitle": "搜索源设置",
    "searchSourceSettingTitleHintText": "添加并配置地理编码服务或要素图层为搜索源。这些指定的源决定了搜索框中的可搜索内容",
    "addSearchSourceLabel": "添加搜索源",
    "featureLayerLabel": "要素图层",
    "geocoderLabel": "地理编码器",
    "nameTitle": "名称",
    "generalSettingLabel": "常规设置",
    "allPlaceholderLabel": "用于搜索全部内容的占位符文本：",
    "allPlaceholderHintText": "提示：搜索所有图层和 geocoder 时请输入要显示为占位符的文本",
    "generalSettingCheckboxLabel": "显示已找到要素或位置的弹出窗口",
    "countryCode": "国家或区域代码",
    "countryCodeEg": "例如 ",
    "countryCodeHint": "将此值留空可搜索所有国家和地区",
    "questionMark": "?",
    "searchInCurrentMapExtent": "仅在当前地图范围内搜索",
    "zoomScale": "缩放比例",
    "locatorUrl": "地理编码器 URL",
    "locatorName": "地理编码器名称",
    "locatorExample": "示例",
    "locatorWarning": "不支持此版本的地理编码服务。该微件支持 10.0 及更高版本的地理编码服务。",
    "locatorTips": "由于地理编码服务不支持建议功能，因此建议不可用。",
    "layerSource": "图层源",
    "setLayerSource": "设置图层源",
    "setGeocoderURL": "设置地理编码器 URL",
    "searchLayerTips": "由于要素服务不支持分页功能，因此建议不可用。",
    "placeholder": "占位符文本",
    "searchFields": "搜索字段",
    "displayField": "显示字段",
    "exactMatch": "完全匹配",
    "maxSuggestions": "最大建议数",
    "maxResults": "最大结果数",
    "enableLocalSearch": "启用本地搜索",
    "minScale": "最小比例",
    "minScaleHint": "如果地图比例大于此比例，将使用本地搜索",
    "radius": "半径",
    "radiusHint": "指定以当前地图中心为中心的区域半径，用于提升地理编码候选项的等级，以便先返回距离位置最近的候选项",
    "meters": "米",
    "setSearchFields": "设置搜索字段",
    "set": "设置",
    "fieldName": "名称",
    "invalidUrlTip": "URL ${URL} 无效或不可访问。",
    "invalidSearchSources": "搜索源设置无效"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "选择面图层",
    "selectPolygonLayerHintText": "提示: 用于选择面图层。",
    "selectRelatedPointLayerLabel": "选择与面图层相关的点图层",
    "selectRelatedPointLayerHintText": "提示: 用于选择与面图层相关的点图层",
    "polygonLayerNotHavingRelatedLayer": "请选择具有相关点图层的面图层。",
    "errorInSelectingPolygonLayer": "请选择具有相关点图层的面图层。",
    "errorInSelectingRelatedLayer": "请选择与面图层相关的点图层。"
  },
  "routeSetting": {
    "routeSettingTabTitle": "方向设置",
    "routeServiceUrl": "路径服务",
    "buttonSet": "设置",
    "routeServiceUrlHintText": "提示: 单击“设置”以浏览和选择网络分析路径服务",
    "directionLengthUnit": "方向长度单位",
    "unitsForRouteHintText": "提示: 用于显示报告的路径单位",
    "selectRouteSymbol": "选择用于显示路径的符号",
    "routeSymbolHintText": "提示: 用于显示路径的线符号",
    "routingDisabledMsg": "要启用方向，请确保已在 ArcGIS Online 项目中启用路径。"
  },
  "networkServiceChooser": {
    "arcgislabel": "从 ArcGIS Online 添加",
    "serviceURLabel": "添加服务 URL",
    "routeURL": "路径 URL",
    "validateRouteURL": "验证",
    "exampleText": "示例",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "请指定有效的路径服务。",
    "rateLimitExceeded": "超过速率限制。请稍后再试。",
    "errorInvokingService": "用户名或密码错误。"
  },
  "symbolPickerPreviewText": "预览：",
  "showToolToSelectLabel": "设置位置按钮",
  "showToolToSelectHintText": "提示：请提供要在地图上设置地点的按钮，而不是始终在点击地图时设置地点"
});