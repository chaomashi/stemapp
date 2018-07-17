///////////////////////////////////////////////////////////////////////////
// Copyright © 2017 Esri. All Rights Reserved.
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
  "configText": "構成テキストの設定:",
  "generalSettings": {
    "tabTitle": "一般設定",
    "measurementUnitLabel": "計測単位",
    "currencyLabel": "計測シンボル",
    "roundCostLabel": "コストを丸める",
    "projectOutputSettings": "プロジェクト出力設定",
    "typeOfProjectAreaLabel": "プロジェクト エリアのタイプ",
    "bufferDistanceLabel": "バッファー距離",
    "roundCostValues": {
      "twoDecimalPoint": "小数点以下 2 桁",
      "nearestWholeNumber": "最も近い整数",
      "nearestTen": "10 の位までの概数",
      "nearestHundred": "100 の位までの概数",
      "nearestThousand": "1,000 の位までの概数",
      "nearestTenThousands": "10,000 の位までの概数"
    },
    "projectAreaType": {
      "outline": "アウトライン",
      "buffer": "バッファー"
    },
    "errorMessages": {
      "currency": "無効な通貨単位",
      "bufferDistance": "無効なバッファー距離",
      "outOfRangebufferDistance": "0 より大きく 100 以下の値でなければなりません"
    }
  },
  "projectSettings": {
    "tabTitle": "プロジェクトの設定",
    "costingGeometrySectionTitle": "コスト解析のジオグラフィの定義 (オプション)",
    "costingGeometrySectionNote": "注意: このレイヤーを構成すると、ジオグラフィに基づいてフィーチャ テンプレートのコスト方程式を設定できます。",
    "projectTableSectionTitle": "プロジェクトの保存/読み込み設定機能 (オプション)",
    "projectTableSectionNote": "注意: すべてのテーブルとレイヤーを構成すると、後で使用できるようにプロジェクトを保存/読み込むことができます。",
    "costingGeometryLayerLabel": "コスト解析ジオメトリ レイヤー",
    "fieldLabelGeography": "ジオグラフィにラベル付けするフィールド",
    "projectAssetsTableLabel": "プロジェクト アセット テーブル",
    "projectMultiplierTableLabel": "プロジェクト乗算追加コスト テーブル",
    "projectLayerLabel": "プロジェクト レイヤー",
    "configureFieldsLabel": "フィールドの構成",
    "fieldDescriptionHeaderTitle": "説明フィールド",
    "layerFieldsHeaderTitle": "レイヤー フィールド",
    "selectLabel": "選択",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} はすでに選択されています",
      "invalidConfiguration": "${fieldsString} を選択してください"
    },
    "costingGeometryHelp": "<p>次の条件を満たすポリゴン レイヤーが表示されます: <br/> <li>\tレイヤーは「クエリ」機能を持つ必要があります</li><li>\tレイヤーは GlobalID フィールドを持つ必要があります</li></p>",
    "fieldToLabelGeographyHelp": "<p>選択した「コスト解析ジオメトリ レイヤー」の文字列および数値フィールドは、[ジオグラフィにラベル付けするフィールド] ドロップダウンに表示されます。</p>",
    "projectAssetsTableHelp": "<p>次の条件を満たすテーブルが表示されます: <br/> <li>テーブルは編集機能 (つまり、作成、削除、更新) を持つ必要があります</li>    <li>テーブルは、次の名前およびデータ タイプの 6 つのフィールドを持つ必要があります:</li><ul><li>\tAssetGUID (GUID タイプ フィールド)</li><li>\tCostEquation (文字列タイプ フィールド)</li><li>\tScenario (文字列タイプ フィールド)</li><li>\tTemplateName (文字列タイプ フィールド)</li><li>    GeographyGUID (GUID タイプ フィールド)</li><li>\tProjectGUID (GUID タイプ フィールド)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>次の条件を満たすテーブルが表示されます: <br/> <li>テーブルは編集機能 (つまり、作成、削除、更新) を持つ必要があります</li>    <li>テーブルは、次の名前およびデータ タイプの 5 つのフィールドを持つ必要があります:</li><ul><li>\tDescription (文字列タイプ フィールド)</li><li>\tType (文字列タイプ フィールド)</li><li>\tValue (Float/Double タイプ フィールド)</li><li>\tCostindex (整数タイプ フィールド)</li><li>   \tProjectGUID (GUID タイプ フィールド))</li></ul> </p>",
    "projectLayerHelp": "<p>次の条件を満たすポリゴン レイヤーが表示されます: <br/> <li>レイヤーは編集機能 (つまり、作成、削除、更新) を持つ必要があります:</li>    <li>レイヤーは、次の名前およびデータ タイプの 5 つのフィールドを持つ必要があります:</li><ul><li>ProjectName (文字列タイプ フィールド)</li><li>Description (文字列タイプ フィールド)</li><li>Totalassetcost (Float/Double タイプ フィールド)</li><li>Grossprojectcost (Float/Double タイプ フィールド)</li><li>GlobalID (GlobalID タイプ フィールド)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "レイヤー設定",
    "layerNameHeaderTitle": "レイヤー名(L)",
    "layerNameHeaderTooltip": "マップ内のレイヤーのリスト",
    "EditableLayerHeaderTitle": "編集可能",
    "EditableLayerHeaderTooltip": "レイヤーとそのテンプレートをコスト解析ウィジェットに含める",
    "SelectableLayerHeaderTitle": "選択可能",
    "SelectableLayerHeaderTooltip": "フィーチャからのジオメトリを使用して新しいコスト アイテムを作成できます",
    "fieldPickerHeaderTitle": "プロジェクト ID (オプション)",
    "fieldPickerHeaderTooltip": "プロジェクト ID を格納する (文字列タイプの) オプション フィールド",
    "selectLabel": "選択",
    "noAssetLayersAvailable": "選択した Web マップにアセット レイヤーが見つかりませんでした",
    "disableEditableCheckboxTooltip": "このレイヤーには編集機能がありません",
    "missingCapabilitiesMsg": "このレイヤーには次の機能が備わっていません:",
    "missingGlobalIdMsg": "このレイヤーには GlobalId フィールドがありません。",
    "create": "作成",
    "update": "アップデート",
    "delete": "削除"
  },
  "costingInfo": {
    "tabTitle": "コスト解析情報",
    "proposedMainsLabel": "提案済みメイン",
    "addCostingTemplateLabel": "コスト解析テンプレートの追加",
    "manageScenariosTitle": "シナリオの管理",
    "featureTemplateTitle": "フィーチャ テンプレート",
    "costEquationTitle": "コスト方程式",
    "geographyTitle": "ジオグラフィ",
    "scenarioTitle": "シナリオ",
    "actionTitle": "操作",
    "scenarioNameLabel": "シナリオ名",
    "addBtnLabel": "追加",
    "srNoLabel": "いいえ。",
    "deleteLabel": "削除",
    "duplicateScenarioName": "シナリオ名の複製",
    "hintText": "<div>ヒント: 次のキーワードを使用します</div><ul><li><b>{TOTALCOUNT}</b>: ジオグラフィで同じタイプのアセットの合計数を使用します</li><li><b>{MEASURE}</b>: ライン アセットの長さとポリゴン アセットの面積を使用します</li><li><b>{TOTALMEASURE}</b>: ジオグラフィで同じタイプのライン アセットの全長とポリゴン アセットの合計面積を使用します</li></ul> 次のような関数を使用できます:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>プロジェクトのニーズに応じてコスト方程式を編集してください。",
    "noneValue": "なし",
    "requiredCostEquation": "${layerName} の無効なコスト方程式: ${templateName}",
    "duplicateTemplateMessage": "重複するテンプレート エントリが ${layerName} に対して存在します: ${templateName}",
    "defaultEquationRequired": "${layerName} のデフォルトの方程式が必要です: ${templateName}",
    "validCostEquationMessage": "有効なコスト方程式を入力してください",
    "costEquationHelpText": "プロジェクトのニーズに応じてコスト方程式を編集してください",
    "scenarioHelpText": "プロジェクトのニーズに応じてシナリオを選択してください",
    "copyRowTitle": "行のコピー",
    "noTemplateAvailable": "${layerName} のテンプレートを少なくとも 1 つ追加してください",
    "manageScenarioLabel": "シナリオの管理",
    "noLayerMessage": "${tabName} で少なくとも 1 つのレイヤーを入力してください",
    "noEditableLayersAvailable": "レイヤー設定タブでレイヤーが編集可能であることを確認する必要があります"
  },
  "statisticsSettings": {
    "tabTitle": "統計情報の設定",
    "addStatisticsLabel": "統計情報の追加",
    "fieldNameTitle": "フィールド",
    "statisticsTitle": "ラベル",
    "addNewStatisticsText": "新しい統計情報の追加",
    "deleteStatisticsText": "統計情報の削除",
    "moveStatisticsUpText": "統計情報を上に移動",
    "moveStatisticsDownText": "統計情報を下に移動",
    "selectDeselectAllTitle": "すべて選択"
  },
  "statisticsType": {
    "countLabel": "数",
    "averageLabel": "平均値",
    "maxLabel": "最大",
    "minLabel": "最小",
    "summationLabel": "集約",
    "areaLabel": "ポリゴン",
    "lengthLabel": "ライン"
  }
});