define({
  "configText": "定义以下过滤群组",
  "labels": {
    "groupName": "过滤设置名称:",
    "groupNameTip": "用户将从中选择的过滤器名称。",
    "groupDesc": "描述:",
    "groupDescTip": "过滤器集说明。",
    "groupOperator": "预设运算符:",
    "groupOperatorTip": "用于预定义过滤器运算符的选项。如果未选择预设运算符，过滤器将使用等于运算符。",
    "groupDefault": "预设值:",
    "groupDefaultTip": "用于从现有图层选择值的选项。",
    "sameLayerAppend": "当多次列出图层时：",
    "sameLayerConjunc": "使用以下内容进行追加：",
    "caseSearch": "执行区分大小写的搜索： "
  },
  "buttons": {
    "addNewGroup": "添加新群组",
    "addNewGroupTip": "添加新过滤器集。",
    "addLayer": "添加图层",
    "addLayerTip": "向过滤器集添加图层。"
  },
  "inputs": {
    "groupName": "为您的群组命名",
    "groupDesc": "您的群组的描述",
    "groupDefault": "输入预定义值",
    "sameLayerAny": "匹配任意表达式",
    "sameLayerAll": "匹配所有表达式",
    "simpleMode": "在 Simple View 中开始",
    "simpleModeTip": "用于简化已配置微件界面的选项。选中后，运算符下拉列表和添加条件按钮会从界面中移除。",
    "webmapAppendModeAny": "向现有地图过滤器追加任意表达式",
    "webmapAppendModeAll": "向现有地图过滤器追加所有表达式",
    "webmapAppendModeTip": "可以选择向现有 web 地图过滤器追加过滤器集。",
    "persistOnClose": "关闭微件后保留",
    "optionsMode": "隐藏微件选项",
    "optionsModeTip": "用于显示其他微件设置的选项。选中后，保存和加载预定义过滤器和微件关闭后继续使用过滤器将从界面中移除。",
    "optionOR": "或",
    "optionAND": "且",
    "optionEQUAL": "等于",
    "optionNOTEQUAL": "不等于",
    "optionGREATERTHAN": "大于",
    "optionGREATERTHANEQUAL": "大于或等于",
    "optionLESSTHAN": "小于",
    "optionLESSTHANEQUAL": "小于或等于",
    "optionSTART": "开头是",
    "optionEND": "结尾是",
    "optionLIKE": "包含",
    "optionNOTLIKE": "不包含",
    "optionONORBEFORE": "在上面或前面",
    "optionONORAFTER": "在上面或后面",
    "optionNONE": "无"
  },
  "tables": {
    "layer": "图层",
    "layerTip": "地图中定义的图层名称。",
    "field": "字段",
    "fieldTip": "过滤图层所依据的字段。",
    "value": "使用值",
    "valueTip": "使用图层中下拉列表值的选项。如果没有图层使用此参数，则将向用户显示纯文本框。",
    "zoom": "缩放",
    "zoomTip": "用于在应用过滤器后缩放至要素范围的选项。只能选择一个缩放至的图层。",
    "action": "删除",
    "actionTip": "从过滤器集中移除图层。"
  },
  "popup": {
    "label": "选择值"
  },
  "errors": {
    "noGroups": "您至少需要一个群组。",
    "noGroupName": "一个或多个群组名称缺失。",
    "noDuplicates": "一个或多个群组名称重复。",
    "noRows": "您至少需要表中的一行。",
    "noLayers": "您的地图中没有图层。"
  },
  "picker": {
    "description": "使用此表单来查找该群组的预设值。",
    "layer": "选择图层",
    "layerTip": "Web 地图中定义的图层名称。",
    "field": "选择字段",
    "fieldTip": "设置预设值所依据的字段。",
    "value": "选择值",
    "valueTip": "将成为微件默认值的值。"
  }
});