define({
  "layersPage": {
    "allLayers": "所有圖層",
    "title": "選擇範本以建立圖徵",
    "generalSettings": "一般設定",
    "layerSettings": "圖層設定",
    "presetValueText": "定義預設值",
    "geocoderSettingsText": "地理編碼器設定",
    "editDescription": "提供編輯面板的顯示文字",
    "editDescriptionTip": "此文字會顯示在「範本」選取器上方，留空則無文字。",
    "promptOnSave": "當表單關閉或切換至下一筆記錄時，系統會提示您儲存未儲存的編輯內容。",
    "promptOnSaveTip": "當目前的圖徵有尚未儲存的編輯內容時，若使用者按一下關閉或瀏覽到下一筆可編輯記錄，則會出現提示。",
    "promptOnDelete": "刪除記錄時需要確認。",
    "promptOnDeleteTip": "當使用者按一下刪除以確認動作時會出現提示。",
    "removeOnSave": "儲存時從選擇中移除圖徵。",
    "removeOnSaveTip": "儲存記錄時，用來從選擇集中移除圖徵的選項。如果僅選擇該記錄，面板會切換回範本頁面。",
    "useFilterEditor": "使用圖徵範本篩選器",
    "useFilterEditorTip": "用來使用「篩選樣板」選取器的選項，可讓您檢視一個圖層的樣板或按名稱搜尋樣板。",
    "displayShapeSelector": "顯示繪製選項",
    "displayShapeSelectorTip": "用來顯示所選樣板的有效繪製選項清單的選項。",
    "displayPresetTop": "在頂端顯示預設值清單",
    "displayPresetTopTip": "在樣版選取器上方用來顯示預設值清單的選項。",
    "listenToGroupFilter": "將篩選器值從「群組篩選器」widget 套用至「預設」欄位",
    "listenToGroupFilterTip": "在「群組篩選器」widget 中套用篩選器時，將值套用至「預設」值清單中的符合欄位。",
    "keepTemplateActive": "維持所選樣版使用中",
    "keepTemplateActiveTip": "顯示樣版選取器時，如果先前已選擇樣版，請重新選擇它。",
    "geometryEditDefault": "預設會啟用幾何編輯",
    "autoSaveEdits": "自動儲存編輯內容",
    "enableAttributeUpdates": "啟用編輯幾何時顯示「屬性動作」更新按鈕",
    "layerSettingsTable": {
      "allowDelete": "允許刪除",
      "allowDeleteTip": "用來允許使用者刪除圖徵的選項；如果圖層不支援刪除則停用",
      "edit": "可編輯",
      "editTip": "在 widget 中用來加入圖層的選項",
      "label": "圖層",
      "labelTip": "地圖中定義之圖層的名稱",
      "update": "停用幾何編輯",
      "updateTip": "用來停用放置後移動幾何，或移動現有圖徵上幾何的能力",
      "allowUpdateOnly": "僅更新",
      "allowUpdateOnlyTip": "用於僅允許修改現有圖徵的選項 (預設為啟用)，若圖層不支援建立新圖徵則停用",
      "fieldsTip": "修改要編輯的欄位及定義智慧屬性",
      "actionsTip": "用於編輯欄位或存取相關圖層/表格的選項",
      "description": "說明",
      "descriptionTip": "可用來輸入文字，以便在屬性頁面頂端顯示該文字的選項。",
      "relationTip": "檢視相關的圖層和表格"
    },
    "editFieldError": "欄位修改和智慧屬性不適用於無法編輯的圖層",
    "noConfigedLayersError": "「智慧型編輯器」需要一或多個可編輯圖層"
  },
  "editDescriptionPage": {
    "title": "定義 <b>${layername}</b> 的屬性概觀文字。 "
  },
  "fieldsPage": {
    "title": "配置 <b>${layername}</b> 的欄位",
    "copyActionTip": "屬性動作",
    "description": "使用「動作」編輯按鈕以啟動圖層上的「智慧屬性」。「智慧屬性」可根據其他欄位值以取得、隱藏或停用欄位。使用「動作」複製按鈕，藉由十字路口、地址、座標和預設值來啟動和定義欄位值來源。",
    "fieldsNotes": "* 是必要欄位。若為此欄位取消勾選「顯示」，且編輯範本未填入該欄位值，您就無法儲存新記錄。",
    "smartAttachmentText": "配置智慧附件動作",
    "smartAttachmentPopupTitle": "配置 <b>${layername}</b> 的智慧附件",
    "fieldsSettingsTable": {
      "display": "顯示",
      "displayTip": "決定是否隱藏欄位",
      "edit": "可編輯",
      "editTip": "檢查欄位是否出現在屬性表單中",
      "fieldName": "名稱",
      "fieldNameTip": "資料庫中定義之欄位的名稱",
      "fieldAlias": "別名",
      "fieldAliasTip": "地圖中定義之欄位的名稱",
      "canPresetValue": "預置",
      "canPresetValueTip": "用於顯示預設欄位清單中的欄位，並允許使用者先設定值再進行編輯的選項",
      "actions": "操作",
      "actionsTip": "變更欄位的順序或設定智慧屬性"
    },
    "smartAttSupport": "智慧屬性在必要的資料庫欄位上不受支援"
  },
  "actionPage": {
    "title": "配置 <b>${fieldname}</b> 的屬性動作",
    "description": "除非指定將觸發動作的準則，否則一律會關閉動作。會按順序處理動作，且只會針對一個欄位觸發一個動作。使用「準則編輯」按鈕來定義準則。",
    "actionsSettingsTable": {
      "rule": "操作",
      "ruleTip": "滿足準則時執行的動作",
      "expression": "表達式",
      "expressionTip": "從定義的準則中導出的 SQL 格式的表達式",
      "actions": "準則",
      "actionsTip": "變更規則的順序和定義觸發時的準則"
    },
    "copyAction": {
      "description": "如果已啟動欄位值來源，則會依序處理，直到觸發有效條件或完成清單。使用「條件編輯」按鈕來定義條件。",
      "intersection": "十字路口",
      "coordinates": "座標",
      "address": "地址",
      "preset": "預置",
      "actionText": "操作",
      "criteriaText": "準則",
      "enableText": "已啟用"
    },
    "actions": {
      "hide": "隱藏",
      "required": "必填資訊",
      "disabled": "已停用"
    }
  },
  "filterPage": {
    "submitHidden": "提交此欄位的屬性資料，即使在隱藏時也是如此?",
    "title": "配置 ${action} 規則的表達式",
    "filterBuilder": "在欄位上設定當記錄符合下列表達式的 ${any_or_all} 時的動作",
    "noFilterTip": "使用下列工具來定義啟用動作的陳述式。"
  },
  "geocoderPage": {
    "setGeocoderURL": "設定地理編碼器 URL",
    "hintMsg": "附註: 您正在變更地理編碼器服務，請務必更新您已配置的任何地理編碼器欄位對應。",
    "invalidUrlTip": "URL ${URL} 無效或不可存取。"
  },
  "addressPage": {
    "popupTitle": "地址",
    "checkboxLabel": "從地理編碼器取得值",
    "selectFieldTitle": "屬性:",
    "geocoderHint": "若要變更地理編碼器，請移至一般設定中的「地理編碼器設定」按鈕"
  },
  "coordinatesPage": {
    "popupTitle": "座標",
    "checkboxLabel": "取得座標",
    "coordinatesSelectTitle": "座標系統:",
    "coordinatesAttributeTitle": "屬性:",
    "mapSpatialReference": "地圖空間參考",
    "latlong": "緯度/經度"
  },
  "presetPage": {
    "popupTitle": "預置",
    "checkboxLabel": "將預設欄位",
    "presetValueLabel": "目前的設定值為:",
    "changePresetValueHint": "若要變更此預設值，請移至一般設定中的「定義預設值」按鈕"
  },
  "intersectionPage": {
    "checkboxLabel": "從十字路口圖層的欄位中取得值",
    "layerText": "圖層",
    "fieldText": "欄位",
    "actionsText": "操作",
    "addLayerLinkText": "新增圖層"
  },
  "presetAll": {
    "popupTitle": "定義預設值",
    "deleteTitle": "刪除預設值",
    "hintMsg": "這裡列出所有唯一的預設欄位名稱。移除預設欄位將停用所有圖層/表格所預設的相對欄位。"
  }
});