define({
  "layersPage": {
    "allLayers": "すべてのレイヤー",
    "title": "作成するフィーチャのテンプレートを選択",
    "generalSettings": "一般設定",
    "layerSettings": "レイヤー設定",
    "presetValueText": "プリセット値の定義",
    "geocoderSettingsText": "ジオコーダーの設定",
    "editDescription": "編集パネル用の表示テキストを入力",
    "editDescriptionTip": "このテキストは、[テンプレート] ピッカーの上に表示されます。テキストがない場合は、空白のままにしてください。",
    "promptOnSave": "フォームが閉じられたか、次のレコードに切り替えられた場合に、保存されていない編集内容を保存するよう促す",
    "promptOnSaveTip": "保存されていない編集内容が現在のフィーチャにある場合、ユーザーが [閉じる] をクリックするか、次の編集可能レコードに移動したときに、プロンプトを表示します。",
    "promptOnDelete": "レコードを削除する場合に確認を要求",
    "promptOnDeleteTip": "ユーザーが [削除] をクリックしたときに、操作の確認を求めるプロンプトを表示します。",
    "removeOnSave": "保存時に、選択セットからフィーチャを削除",
    "removeOnSaveTip": "レコードを保存するときにフィーチャを選択セットから削除するオプション。そのレコードが、選択されている唯一のレコードである場合、パネルはテンプレート ページに切り替わります。",
    "useFilterEditor": "フィーチャ テンプレート フィルターの使用",
    "useFilterEditorTip": "1 つのレイヤー テンプレートを表示したり、テンプレートを名前で検索するための機能を提供する [フィルター テンプレート] ピッカーを使用するオプション。",
    "displayShapeSelector": "描画オプションの表示",
    "displayShapeSelectorTip": "選択したテンプレートに関する有効な描画オプションのリストを表示するためのオプション。",
    "displayPresetTop": "設定済みの値のリストを上部に表示",
    "displayPresetTopTip": "設定済みの値のリストをテンプレート ピッカーの上に表示するためのオプション。",
    "listenToGroupFilter": "グループ フィルター ウィジェットのフィルター値を設定済みのフィールドに適用",
    "listenToGroupFilterTip": "グループ フィルター ウィジェットでフィルターが適用される場合は、設定済みの値のリスト内で一致するフィールドにその値を適用します。",
    "keepTemplateActive": "選択したテンプレートをアクティブのままにする",
    "keepTemplateActiveTip": "テンプレート ピッカーが表示されたときに、テンプレートが前回選択されている場合は、そのテンプレートを再選択します。",
    "geometryEditDefault": "デフォルトでジオメトリの編集を有効化",
    "autoSaveEdits": "編集内容を自動的に保存",
    "enableAttributeUpdates": "[ジオメトリの編集] がアクティブな場合に、属性アクションの更新ボタンを表示します。",
    "layerSettingsTable": {
      "allowDelete": "削除の許可",
      "allowDeleteTip": "ユーザーがフィーチャを削除することを許可するオプション。レイヤーが削除をサポートしていない場合は無効化されます。",
      "edit": "編集可能",
      "editTip": "レイヤーをウィジェットに含めるオプション",
      "label": "レイヤー",
      "labelTip": "マップで定義されているレイヤーの名前",
      "update": "ジオメトリの編集の無効化",
      "updateTip": "配置済みのジオメトリを移動したり、既存のフィーチャ上のジオメトリを移動するための機能を無効にするオプション",
      "allowUpdateOnly": "Update のみ",
      "allowUpdateOnlyTip": "既存のフィーチャの変更のみを許可するオプション。デフォルトでオンになっており、レイヤーがフィーチャの新規作成をサポートしていない場合は無効化されます。",
      "fieldsTip": "編集対象のフィールドを変更し、スマート属性を定義します",
      "actionsTip": "フィールドを編集するか、関連レイヤー/テーブルにアクセスするオプション",
      "description": "説明",
      "descriptionTip": "属性ページの上部に表示するテキストを入力するオプションです。",
      "relationTip": "関連レイヤーとテーブルを表示します。"
    },
    "editFieldError": "フィールドの変更およびスマート属性は、編集不可のレイヤーでは使用できません",
    "noConfigedLayersError": "スマート エディターでは、編集可能なレイヤーが 1 つ以上必要です。"
  },
  "editDescriptionPage": {
    "title": "<b>${layername}</b> の属性概要テキストの定義 "
  },
  "fieldsPage": {
    "title": "<b>${layername}</b> のフィールドの構成",
    "copyActionTip": "属性アクション",
    "description": "[アクション] 編集ボタンを使用して、レイヤー上のスマート属性を有効にします。スマート属性は、他のフィールドの値に基づいて、フィールドを要求したり、非表示にしたり、無効化することができます。[アクション] コピー ボタンを使用して、交点、アドレス、座標、プリセットによってフィールド値のソースを有効化して定義します。",
    "fieldsNotes": "* は必須フィールドです。このフィールドの [表示] をオフにし、フィールドの値が編集テンプレートから読み込まれていない場合、新しいレコードを保存できません。",
    "smartAttachmentText": "スマート アタッチメント アクションの構成",
    "smartAttachmentPopupTitle": "<b>${layername}</b> のスマート アタッチメントの構成",
    "fieldsSettingsTable": {
      "display": "表示",
      "displayTip": "フィールドが非表示かどうかを決定します",
      "edit": "編集可能",
      "editTip": "フィールドが属性フォーム内に存在する場合、オンにします",
      "fieldName": "名前",
      "fieldNameTip": "データベースで定義されたフィールド名",
      "fieldAlias": "エイリアス",
      "fieldAliasTip": "マップで定義されたフィールド名",
      "canPresetValue": "プリセット",
      "canPresetValueTip": "フィールドをプリセット フィールド リストに表示し、ユーザーが値を編集する前に設定することを許可するオプション",
      "actions": "アクション",
      "actionsTip": "フィールドの順序を変更し、スマート属性を設定します"
    },
    "smartAttSupport": "スマート属性は、必須データベース フィールドではサポートされていません"
  },
  "actionPage": {
    "title": "<b>${fieldname}</b> の属性アクションの構成",
    "description": "アクションを始動する条件を指定しない限り、アクションは常にオフになります。アクションは順番に処理され、1 つのフィールドにつき 1 つのアクションのみが始動します。条件を定義するには、[条件編集] ボタンを使用します。",
    "actionsSettingsTable": {
      "rule": "アクション",
      "ruleTip": "条件が満たされた場合に実行されるアクション",
      "expression": "条件式",
      "expressionTip": "定義した条件から SQL 形式で生成される条件式",
      "actions": "基準",
      "actionsTip": "ルールの順序を変更し、ルールが始動する場合の条件を定義します"
    },
    "copyAction": {
      "description": "アクティブになっている場合、フィールド値のソースは、有効な条件を始動するかリストが完了するまで、順番に処理されます。条件を定義するには、[条件編集] ボタンを使用します。",
      "intersection": "交点",
      "coordinates": "座標",
      "address": "住所",
      "preset": "プリセット",
      "actionText": "操作",
      "criteriaText": "基準",
      "enableText": "有効"
    },
    "actions": {
      "hide": "非表示",
      "required": "必須",
      "disabled": "無効"
    }
  },
  "filterPage": {
    "submitHidden": "このフィールドの属性データを、非表示の場合でも送信しますか?",
    "title": "${action} ルールの条件式の構成",
    "filterBuilder": "レコードが次の条件式の ${any_or_all} に一致する場合のフィールドに対するアクションを設定します",
    "noFilterTip": "下のツールを使用して、アクションが有効になった場合のステートメントを定義します。"
  },
  "geocoderPage": {
    "setGeocoderURL": "ジオコーダーの URL の設定",
    "hintMsg": "注意: ジオコーダー サービスを変更することになるので、これまでに構成したジオコーダー フィールド マッピングを必ず更新してください。",
    "invalidUrlTip": "URL ${URL} は無効であるか、アクセスできません。"
  },
  "addressPage": {
    "popupTitle": "住所",
    "checkboxLabel": "ジオコーダーから値を取得",
    "selectFieldTitle": "属性:",
    "geocoderHint": "ジオコーダーを変更するには、一般設定の [ジオコーダーの設定] ボタンに移動します。"
  },
  "coordinatesPage": {
    "popupTitle": "座標",
    "checkboxLabel": "座標の取得",
    "coordinatesSelectTitle": "座標系:",
    "coordinatesAttributeTitle": "属性:",
    "mapSpatialReference": "マップの空間参照",
    "latlong": "緯度/経度"
  },
  "presetPage": {
    "popupTitle": "プリセット",
    "checkboxLabel": "フィールドはプリセットされます。",
    "presetValueLabel": "現在のプリセット値:",
    "changePresetValueHint": "このプリセット値を変更するには、一般設定の [プリセット値の定義] ボタンに移動します。"
  },
  "intersectionPage": {
    "checkboxLabel": "交差レイヤーのフィールドから値を取得",
    "layerText": "レイヤー",
    "fieldText": "フィールド",
    "actionsText": "操作",
    "addLayerLinkText": "レイヤーの追加"
  },
  "presetAll": {
    "popupTitle": "デフォルトのプリセット値を定義します。",
    "deleteTitle": "プリセット値を削除します。",
    "hintMsg": "ここには、すべての一意のプリセット値フィールドの名前が表示されます。プリセット フィールドを削除すると、すべてのレイヤー/テーブルから、プリセットとして使用される各フィールドは無効になります。"
  }
});