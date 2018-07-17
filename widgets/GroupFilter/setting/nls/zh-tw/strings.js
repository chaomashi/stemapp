define({
  "configText": "在底下定義您的篩選群組",
  "labels": {
    "groupName": "篩選集名稱:",
    "groupNameTip": "使用者將從中選擇的篩選器名稱。",
    "groupDesc": "描述:",
    "groupDescTip": "篩選器集的描述。",
    "groupOperator": "預設運算子:",
    "groupOperatorTip": "可用來預先定義篩選器之運算子的選項。若未選擇「預設運算子」，篩選器將使用「等於」運算子。",
    "groupDefault": "預設值:",
    "groupDefaultTip": "可從現有圖層中選擇值的選項。",
    "sameLayerAppend": "多次列出某個圖層時:",
    "sameLayerConjunc": "使用下列項目新增:",
    "caseSearch": "執行區分大小寫搜尋: "
  },
  "buttons": {
    "addNewGroup": "新增群組",
    "addNewGroupTip": "新增篩選集。",
    "addLayer": "增加圖層",
    "addLayerTip": "將圖層新增至篩選集。"
  },
  "inputs": {
    "groupName": "命名您的群組",
    "groupDesc": "您群組的描述",
    "groupDefault": "輸入預定義的值",
    "sameLayerAny": "符合任何表達式",
    "sameLayerAll": "符合所有表達式",
    "simpleMode": "在簡單視圖中啟動",
    "simpleModeTip": "可用來簡化配置之 widget 介面的選項。勾選後，會從介面中移除運算子下拉式清單和新增條件按鈕。",
    "webmapAppendModeAny": "將任何表達式附加到現有的地圖篩選器",
    "webmapAppendModeAll": "將所有表達式附加到現有的地圖篩選器",
    "webmapAppendModeTip": "可將篩選集附加至現有 Web 地圖篩選器的選項。",
    "persistOnClose": "關閉 Widget 後持續存在",
    "optionsMode": "隱藏 Widget 選項",
    "optionsModeTip": "用來公開其他 widget 設定的選項。如果已勾選，請在關閉 widget 並從介面中移除後，儲存和載入定義的篩選器並保留篩選器。",
    "optionOR": "OR",
    "optionAND": "AND",
    "optionEQUAL": "EQUALS",
    "optionNOTEQUAL": "NOT EQUAL",
    "optionGREATERTHAN": "GREATER THAN",
    "optionGREATERTHANEQUAL": "GREATER THAN OR EQUAL",
    "optionLESSTHAN": "LESS THAN",
    "optionLESSTHANEQUAL": "LESS THAN OR EQUAL",
    "optionSTART": "BEGINS WITH",
    "optionEND": "ENDS WITH",
    "optionLIKE": "CONTAINS",
    "optionNOTLIKE": "DOES NOT CONTAIN",
    "optionONORBEFORE": "IS ON OR BEFORE",
    "optionONORAFTER": "IS ON OR AFTER",
    "optionNONE": "NONE"
  },
  "tables": {
    "layer": "圖層",
    "layerTip": "地圖中定義之圖層的名稱。",
    "field": "欄位",
    "fieldTip": "將用來篩選圖層的欄位。",
    "value": "使用值",
    "valueTip": "可從圖層中使用下拉式清單值的選項。如果沒有圖層使用此參數，則會向使用者出示純文字方塊。",
    "zoom": "縮放",
    "zoomTip": "套用篩選器後，用於縮放至圖徵範圍的選項。只能選擇縮放至一個圖層。",
    "action": "刪除",
    "actionTip": "從篩選集中移除圖層。"
  },
  "popup": {
    "label": "選擇值"
  },
  "errors": {
    "noGroups": "您至少需要一個群組。",
    "noGroupName": "缺少一或多個群組名稱。",
    "noDuplicates": "一或多個群組名稱重複。",
    "noRows": "您的表格中至少需要一列。",
    "noLayers": "您的地圖中沒有圖層。"
  },
  "picker": {
    "description": "使用此表單來尋找此群組的預設值。",
    "layer": "選擇圖層",
    "layerTip": "Web 地圖中定義之圖層的名稱。",
    "field": "選擇欄位",
    "fieldTip": "將從中設定預設值的欄位。",
    "value": "選擇值",
    "valueTip": "將成為 widget 之預設值的值。"
  }
});