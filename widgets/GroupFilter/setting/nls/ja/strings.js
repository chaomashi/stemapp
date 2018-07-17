define({
  "configText": "以下のフィルター グループを定義",
  "labels": {
    "groupName": "設定するフィルターの名前:",
    "groupNameTip": "ユーザーが選択するフィルターの名前です。",
    "groupDesc": "説明:",
    "groupDescTip": "フィルター セットの説明です。",
    "groupOperator": "設定済みの演算子:",
    "groupOperatorTip": "フィルターの演算子を事前に定義するオプションです。[設定済みの演算子] が選択されていない場合、フィルターでは「等しい」演算子が使用されます。",
    "groupDefault": "設定済みの値:",
    "groupDefaultTip": "既存のレイヤーから値を選択するオプションです。",
    "sameLayerAppend": "レイヤーが複数回リストに表示されている場合:",
    "sameLayerConjunc": "追加に使用する演算子:",
    "caseSearch": "大文字/小文字を区別して検索を実行: "
  },
  "buttons": {
    "addNewGroup": "新規グループの追加",
    "addNewGroupTip": "新しいフィルター セットを追加します。",
    "addLayer": "レイヤーの追加",
    "addLayerTip": "レイヤーをフィルター セットに追加します。"
  },
  "inputs": {
    "groupName": "グループの名前を入力",
    "groupDesc": "グループの説明",
    "groupDefault": "定義済みの値を入力",
    "sameLayerAny": "条件式のいずれかに一致",
    "sameLayerAll": "すべての条件式に一致",
    "simpleMode": "シンプルなビューで開始",
    "simpleModeTip": "構成済みのウィジェット インターフェイスを単純化するオプションです。オンに設定されていると、演算子ドロップダウン リストと条件の追加ボタンがインターフェイスから削除されます。",
    "webmapAppendModeAny": "既存のマップ フィルターに条件式のいずれかを追加",
    "webmapAppendModeAll": "既存のマップ フィルターにすべての条件式を追加",
    "webmapAppendModeTip": "既存の Web マップ フィルターにフィルター セットを追加するオプション。",
    "persistOnClose": "ウィジェットを閉じた後に維持",
    "optionsMode": "ウィジェット オプションを非表示",
    "optionsModeTip": "追加のウィジェット設定を表示するオプションです。オンに設定されていると、定義済みフィルターの保存および読み込みを行う設定とウィジェットを閉じた後にフィルターを維持する設定がインターフェイスから削除されます。",
    "optionOR": "または",
    "optionAND": "および",
    "optionEQUAL": "等しい",
    "optionNOTEQUAL": "等しくない",
    "optionGREATERTHAN": "より大きい",
    "optionGREATERTHANEQUAL": "以上",
    "optionLESSTHAN": "より小さい",
    "optionLESSTHANEQUAL": "以下",
    "optionSTART": "で始まる",
    "optionEND": "で終わる",
    "optionLIKE": "を含む",
    "optionNOTLIKE": "を含まない",
    "optionONORBEFORE": "以前",
    "optionONORAFTER": "以後",
    "optionNONE": "なし"
  },
  "tables": {
    "layer": "レイヤー",
    "layerTip": "マップで定義されているレイヤーの名前です。",
    "field": "フィールド",
    "fieldTip": "レイヤーのフィルター処理に使用されるフィールドです。",
    "value": "値の使用",
    "valueTip": "レイヤーのドロップダウン リストの値を使用するオプションです。レイヤーでこのパラメーターが使用されていない場合は、空のテキスト ボックスがユーザーに表示されます。",
    "zoom": "ズーム",
    "zoomTip": "フィルターの適用後にフィーチャの範囲にズームするオプションです。ズームの対象に選択できるレイヤーは 1 つだけです。",
    "action": "削除",
    "actionTip": "フィルター セットからレイヤーを削除します。"
  },
  "popup": {
    "label": "値の選択"
  },
  "errors": {
    "noGroups": "少なくとも 1 つのグループが必要です。",
    "noGroupName": "1 つまたは複数のグループ名が見つかりません。",
    "noDuplicates": "1 つまたは複数のグループ名が重複しています。",
    "noRows": "テーブルには少なくとも 1 つの行が必要です。",
    "noLayers": "マップにレイヤーがありません。"
  },
  "picker": {
    "description": "このフォームを使用して、このグループの設定済みの値を検索します。",
    "layer": "レイヤーの選択",
    "layerTip": "Web マップで定義されているレイヤーの名前です。",
    "field": "フィールドの選択",
    "fieldTip": "設定済みの値の設定に使用されるフィールドです。",
    "value": "値の選択",
    "valueTip": "ウィジェットのデフォルトになる値です。"
  }
});