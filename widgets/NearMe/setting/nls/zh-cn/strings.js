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
    "miles": {
      "displayText": "英里",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "千米",
      "acronym": "km"
    },
    "feet": {
      "displayText": "英尺",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "米",
      "acronym": "m"
    }
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
    "invalidUrlTip": "URL ${URL} 无效或不可访问。"
  },
  "searchSetting": {
    "searchSettingTabTitle": "搜索设置",
    "defaultBufferDistanceLabel": "设置默认缓冲距离",
    "maxResultCountLabel": "限制结果数量",
    "maxResultCountHintLabel": "提示：设置最大可见结果的数量。将值设置为 1 将返回最近的要素",
    "maxBufferDistanceLabel": "设置最大缓冲距离",
    "bufferDistanceUnitLabel": "缓冲距离单位",
    "defaultBufferHintLabel": "提示: 设置缓冲滑块的默认值",
    "maxBufferHintLabel": "提示: 设置缓冲滑块的最大值",
    "bufferUnitLabel": "提示: 为创建缓冲定义单位",
    "selectGraphicLocationSymbol": "地址或位置符号",
    "graphicLocationSymbolHintText": "提示: 所搜索地址或所单击位置的符号",
    "addressLocationPolygonHintText": "提示：搜索面图层的符号",
    "popupTitleForPolygon": "选择所选地址位置的面",
    "popupTitleForPolyline": "选择地址位置的线",
    "addressLocationPolylineHintText": "提示：搜索折线图层的符号",
    "fontColorLabel": "选择搜索结果的字体颜色",
    "fontColorHintText": "提示: 搜索结果的字体颜色",
    "zoomToSelectedFeature": "缩放至所选要素",
    "zoomToSelectedFeatureHintText": "提示: 缩放至所选要素，而非缓冲",
    "intersectSearchLocation": "返回相交面",
    "intersectSearchLocationHintText": "提示: 返回包含搜索位置的面，而非缓冲内的面",
    "enableProximitySearch": "启用邻域搜索",
    "enableProximitySearchHintText": "提示：启用该功能可搜索所选结果附近的位置",
    "bufferVisibilityLabel": "设置缓冲可见性",
    "bufferVisibilityHintText": "提示: 缓冲将显示在地图上",
    "bufferColorLabel": "设置缓冲符号",
    "bufferColorHintText": "提示: 选择缓冲的颜色和透明度",
    "searchLayerResultLabel": "仅绘制所选图层结果",
    "searchLayerResultHint": "提示: 地图上将仅绘制搜索结果中的所选图层",
    "showToolToSelectLabel": "设置位置按钮",
    "showToolToSelectHintText": "提示：请提供要在地图上设置地点的按钮，而不是始终在点击地图时设置地点",
    "geoDesicParamLabel": "使用测地线缓冲",
    "geoDesicParamHintText": "提示：请使用测地线缓冲而不是欧氏缓冲(平面)"
  },
  "layerSelector": {
    "selectLayerLabel": "选择搜索图层",
    "layerSelectionHint": "提示: 使用设置按钮选择图层",
    "addLayerButton": "设置"
  },
  "routeSetting": {
    "routeSettingTabTitle": "方向设置",
    "routeServiceUrl": "路径服务",
    "buttonSet": "设置",
    "routeServiceUrlHintText": "提示: 单击“设置”以浏览和选择路径服务",
    "directionLengthUnit": "方向长度单位",
    "unitsForRouteHintText": "提示: 用于显示路径单位",
    "selectRouteSymbol": "选择用于显示路径的符号",
    "routeSymbolHintText": "提示: 用于显示路径的线符号",
    "routingDisabledMsg": "要启用方向，请确保已在项目的应用程序设置中启用路径。"
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "符号系统设置",
    "addSymbologyBtnLabel": "添加新符号",
    "layerNameTitle": "图层名称",
    "fieldTitle": "字段",
    "valuesTitle": "值",
    "symbolTitle": "符号",
    "actionsTitle": "操作",
    "invalidConfigMsg": "重复的字段：图层 ${layerName} 的字段 ${fieldName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "过滤器设置",
    "addTaskTip": "向选定的搜索图层添加一个或多个过滤器，并为每个过滤器配置参数。",
    "enableMapFilter": "从地图中移除预设图层过滤器。",
    "newFilter": "新建过滤器",
    "filterExpression": "过滤器表达式",
    "layerDefaultSymbolTip": "使用图层的默认符号",
    "uploadImage": "上传图像",
    "selectLayerTip": "请选择图层。",
    "setTitleTip": "请设置标题。",
    "noTasksTip": "未配置任何过滤器。请单击“${newFilter}”添加新过滤器。",
    "collapseFiltersTip": "打开微件时折叠过滤器表达式(如有)",
    "groupFiltersTip": "按图层对过滤器进行分组"
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
  "errorStrings": {
    "bufferErrorString": "请输入有效的数值。",
    "selectLayerErrorString": "请选择要搜索的图层。",
    "invalidDefaultValue": "默认缓冲距离不能为空。请指定缓冲距离",
    "invalidMaximumValue": "最大缓冲距离不能为空。请指定缓冲距离",
    "defaultValueLessThanMax": "请在最大限制范围内指定默认缓冲距离",
    "defaultBufferValueGreaterThanOne": "默认缓冲距离不得小于 0",
    "maximumBufferValueGreaterThanOne": "请指定大于 0 的最大缓冲距离",
    "invalidMaximumResultCountValue": "请指定有效的最大结果数值",
    "invalidSearchSources": "搜索源设置无效"
  },
  "symbolPickerPreviewText": "预览:"
});