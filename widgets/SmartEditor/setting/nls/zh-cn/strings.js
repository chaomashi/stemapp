define({
  "layersPage": {
    "allLayers": "所有图层",
    "title": "选择模板以创建要素",
    "generalSettings": "常规设置",
    "layerSettings": "图层设置",
    "presetValueText": "定义预设值",
    "geocoderSettingsText": "地理编码器设置",
    "editDescription": "为编辑面板提供显示文本",
    "editDescriptionTip": "此文本将显示在模板选取器上方，如果无文本请留空。",
    "promptOnSave": "关闭表单或切换到下一记录时，将提示保存未保存的编辑内容。",
    "promptOnSaveTip": "如果当前要素有未保存的编辑内容，当用户单击关闭或导航至下一可编辑记录时，将显示提示。",
    "promptOnDelete": "删除记录时需要确认。",
    "promptOnDeleteTip": "当用户单击删除以确认操作时，将显示提示。",
    "removeOnSave": "保存时从选择中移除要素。",
    "removeOnSaveTip": "保存记录时，可选择从选择集中移除要素。如果是唯一选定记录，面板将切换回模板页面。",
    "useFilterEditor": "使用要素模板过滤器",
    "useFilterEditorTip": "过滤模板选取器可用于查看一个图层模板或按名称搜索模板，可选择使用过滤模板选取器。",
    "displayShapeSelector": "显示绘制选项",
    "displayShapeSelectorTip": "该选项用于显示一系列所选模板的有效绘制选项。",
    "displayPresetTop": "在顶部显示预设值列表",
    "displayPresetTopTip": "该选项用于将预设值列表显示在模板选取器上方。",
    "listenToGroupFilter": "将群组过滤器中的过滤值应用到预设字段",
    "listenToGroupFilterTip": "在群组过滤器微件中应用过滤器后，在预设值列表中向匹配的字段应用值。",
    "keepTemplateActive": "保持所选模板处于活动状态",
    "keepTemplateActiveTip": "显示模板选取器后，如果之前选择了某一模板，则重新选择该模板。",
    "geometryEditDefault": "默认启用几何编辑",
    "autoSaveEdits": "自动保存编辑内容",
    "enableAttributeUpdates": "在编辑几何操作处于活动状态时显示属性操作更新按钮",
    "layerSettingsTable": {
      "allowDelete": "允许删除",
      "allowDeleteTip": "可选择允许用户删除要素；如果图层不支持删除，则将禁用",
      "edit": "可编辑",
      "editTip": "可选择在微件中包含图层",
      "label": "图层",
      "labelTip": "在地图中定义的图层的名称",
      "update": "禁用几何编辑",
      "updateTip": "在现有要素上放置或移动几何时，可选择禁用移动几何的功能",
      "allowUpdateOnly": "仅更新版",
      "allowUpdateOnlyTip": "可以选择仅允许修改现有要素，该选项默认处于选中状态；如果图层不支持创建新要素，则禁用该选项",
      "fieldsTip": "修改要进行编辑的字段并定义智能属性",
      "actionsTip": "可以选择编辑字段或访问相关图层/表",
      "description": "描述",
      "descriptionTip": "输入文本的选项，以显示在属性页面顶部。",
      "relationTip": "查看相关图层和表"
    },
    "editFieldError": "对于不可编辑的图层，字段修改和智能属性不可用",
    "noConfigedLayersError": "智能编辑器需要一个或多个可编辑图层"
  },
  "editDescriptionPage": {
    "title": "为 <b>${layername}</b> 定义属性概览文本 "
  },
  "fieldsPage": {
    "title": "为 <b>${layername}</b> 配置字段",
    "copyActionTip": "属性操作",
    "description": "使用“操作”编辑按钮激活图层上的智能属性。智能属性可以根据其他字段中的值来请求、隐藏或禁用字段。使用“操作”复制按钮并通过交叉口、地址、坐标和预设激活和定义字段值源。",
    "fieldsNotes": "* 是必选字段。如果取消选中显示该字段，并且编辑模板不填充该字段值，您将无法保存新记录。",
    "smartAttachmentText": "配置智能附件操作",
    "smartAttachmentPopupTitle": "将智能附件配置为 <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "显示",
      "displayTip": "确定字段是否可见",
      "edit": "可编辑",
      "editTip": "如果字段显示在属性表单中，则选中该选项",
      "fieldName": "名称",
      "fieldNameTip": "在数据库中定义的字段的名称",
      "fieldAlias": "别名",
      "fieldAliasTip": "在地图中定义的字段的名称",
      "canPresetValue": "预设",
      "canPresetValueTip": "可选择在预设字段列表中显示字段，并且允许用户在编辑前对值进行设置",
      "actions": "操作",
      "actionsTip": "更改字段的顺序或设置智能属性"
    },
    "smartAttSupport": "必选数据库字段不支持智能属性"
  },
  "actionPage": {
    "title": "将属性操作配置为 <b>${fieldname}</b>",
    "description": "指定触发操作的条件之前，这些操作始终处于关闭状态。将按顺序处理操作，并且每个字段仅触发一个操作。可使用“条件编辑”按钮来定义条件。",
    "actionsSettingsTable": {
      "rule": "操作",
      "ruleTip": "如果满足条件，将执行操作",
      "expression": "表达式",
      "expressionTip": "从定义的条件生成 SQL 格式的表达式",
      "actions": "条件",
      "actionsTip": "触发后，可更改规则的顺序并定义条件"
    },
    "copyAction": {
      "description": "如果已激活字段值源，则会按顺序处理，直到触发有效条件或列表完成为止。使用“标准编辑”按钮定义标准。",
      "intersection": "交叉口",
      "coordinates": "坐标",
      "address": "地址",
      "preset": "预设",
      "actionText": "操作",
      "criteriaText": "条件",
      "enableText": "启用"
    },
    "actions": {
      "hide": "隐藏",
      "required": "必填",
      "disabled": "已禁用"
    }
  },
  "filterPage": {
    "submitHidden": "即使隐藏，仍提交该字段的属性数据?",
    "title": "为 ${action} 规则配置表达式",
    "filterBuilder": "当记录与以下 ${any_or_all} 表达式相匹配时，设置字段的操作",
    "noFilterTip": "激活操作后，可使用以下工具来定义语句。"
  },
  "geocoderPage": {
    "setGeocoderURL": "设置地理编码器 URL",
    "hintMsg": "请注意：您正在更改地理编码器服务，请务必更新您配置的任何地理编码器字段映射。",
    "invalidUrlTip": "URL ${URL} 无效或不可访问。"
  },
  "addressPage": {
    "popupTitle": "地址",
    "checkboxLabel": "从地理编码器获取值",
    "selectFieldTitle": "属性：",
    "geocoderHint": "要更改地理编码器，请转至常规设置中的“地理编码器设置”按钮"
  },
  "coordinatesPage": {
    "popupTitle": "坐标",
    "checkboxLabel": "获取坐标",
    "coordinatesSelectTitle": "坐标系：",
    "coordinatesAttributeTitle": "属性：",
    "mapSpatialReference": "地图空间参考",
    "latlong": "纬度/经度"
  },
  "presetPage": {
    "popupTitle": "预设",
    "checkboxLabel": "字段将被预先设置",
    "presetValueLabel": "当前预设值为：",
    "changePresetValueHint": "要更改此预设值，请转至常规设置中的“定义预设值”按钮"
  },
  "intersectionPage": {
    "checkboxLabel": "从相交图层的字段获取值",
    "layerText": "图层",
    "fieldText": "字段",
    "actionsText": "操作",
    "addLayerLinkText": "添加图层"
  },
  "presetAll": {
    "popupTitle": "定义默认预设值",
    "deleteTitle": "删除预设值。",
    "hintMsg": "此处列出了所有唯一的预设字段名称。删除预设字段将在所有图层/表中将相应字段作为预设禁用。"
  }
});