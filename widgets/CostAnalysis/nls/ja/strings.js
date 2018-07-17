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
  "_widgetLabel": "コスト解析 (ベータ版)",
  "unableToFetchInfoErrMessage": "ジオメトリ サービス/構成済みレイヤーの詳細を取得できません",
  "invalidCostingGeometryLayer": "コスト解析ジオメトリ レイヤーの 'esriFieldTypeGlobalID' を取得できません。",
  "projectLayerNotFound": "マップ内に構成済みのプロジェクト レイヤーが見つかりません。",
  "costingGeometryLayerNotFound": "マップ内に構成済みのコスト解析ジオメトリ レイヤーが見つかりません。",
  "projectMultiplierTableNotFound": "マップ内に構成済みのプロジェクト乗数追加コスト テーブルが見つかりません。",
  "projectAssetTableNotFound": "マップ内に構成済みプロジェクト アセット テーブルが見つかりません。",
  "createLoadProject": {
    "createProjectPaneTitle": "プロジェクトの作成",
    "loadProjectPaneTitle": "プロジェクトの読み込み",
    "projectNamePlaceHolder": "プロジェクト名",
    "projectDescPlaceHolder": "プロジェクトの説明",
    "selectProject": "プロジェクトの選択",
    "viewInMapLabel": "マップに表示",
    "loadLabel": "読み込み",
    "createLabel": "作成",
    "deleteProjectConfirmationMsg": "プロジェクトを削除しますか？",
    "noAssetsToViewOnMap": "選択したプロジェクトには、マップ上に表示するアセットがありません。",
    "projectDeletedMsg": "プロジェクトが正常に削除されました。",
    "errorInCreatingProject": "プロジェクトの作成中にエラーが発生しました。",
    "errorProjectNotFound": "プロジェクトが見つかりません。",
    "errorInLoadingProject": "有効な選択されているかどうかを確認してください。",
    "errorProjectNotSelected": "ドロップダウンからプロジェクトを選択",
    "errorDuplicateProjectName": "プロジェクト名はすでに存在します。"
  },
  "statisticsSettings": {
    "tabTitle": "統計情報の設定",
    "addStatisticsLabel": "統計情報の追加",
    "addNewStatisticsText": "新しい統計情報の追加",
    "deleteStatisticsText": "統計情報の削除",
    "moveStatisticsUpText": "統計情報を上に移動",
    "moveStatisticsDownText": "統計情報を下に移動",
    "layerNameTitle": "レイヤー",
    "statisticsTypeTitle": "種類",
    "fieldNameTitle": "フィールド",
    "statisticsTitle": "ラベル",
    "actionLabelTitle": "操作",
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
  },
  "costingInfo": {
    "noEditableLayersAvailable": "レイヤー設定タブでレイヤーが編集可能であることを確認する必要があります"
  },
  "workBench": {
    "refresh": "更新",
    "noAssetAddedMsg": "アセットは追加されていません",
    "units": "単位",
    "assetDetailsTitle": "アセットのアイテム詳細",
    "costEquationTitle": "コスト方程式",
    "newCostEquationTitle": "新しい方程式",
    "defaultCostEquationTitle": "デフォルトの方程式",
    "geographyTitle": "ジオグラフィ",
    "scenarioTitle": "シナリオ",
    "costingInfoHintText": "<div>ヒント: 次のキーワードを使用します</div><ul><li><b>{TOTALCOUNT}</b>: ジオグラフィで同じタイプのアセットの合計数を使用します</li> <li><b>{MEASURE}</b>: ライン アセットの長さとポリゴン アセットの面積を使用します</li><li><b>{TOTALMEASURE}</b>: ジオグラフィで同じタイプのライン アセットの全長とポリゴン アセットの合計面積を使用します</li></ul> 次のような関数を使用できます:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>プロジェクトのニーズに応じてコスト方程式を編集してください。",
    "zoomToAsset": "アセットにズーム",
    "deleteAsset": "アセットの削除",
    "closeDialog": "ダイアログを閉じる",
    "objectIdColTitle": "Object ID",
    "costColTitle": "コスト",
    "errorInvalidCostEquation": "コスト方程式が無効です。",
    "errorInSavingAssetDetails": "アセットの詳細を保存できません。"
  },
  "assetDetails": {
    "inGeography": " ${geography} 内 ",
    "withScenario": " ${scenario} を使用",
    "totalCostTitle": "総コスト",
    "additionalCostLabel": "説明",
    "additionalCostValue": "値",
    "additionalCostNetValue": "正味価値"
  },
  "projectOverview": {
    "assetItemsTitle": "アセットのアイテム",
    "assetStatisticsTitle": "アセットの統計情報",
    "projectSummaryTitle": "プロジェクト サマリー",
    "projectName": "プロジェクト名: ${name}",
    "totalCostLabel": "プロジェクトの総コスト (*):",
    "grossCostLabel": "プロジェクトの総コスト (*):",
    "roundingLabel": "* '${selectedRoundingOption}' に丸めます",
    "unableToSaveProjectBoundary": "プロジェクト レイヤーにプロジェクトの境界を保存できません。",
    "unableToSaveProjectCost": "プロジェクト レイヤーにコストを保存できません。",
    "roundCostValues": {
      "twoDecimalPoint": "小数点以下 2 桁",
      "nearestWholeNumber": "最も近い整数",
      "nearestTen": "10 の位までの概数",
      "nearestHundred": "100 の位までの概数",
      "nearestThousand": "1,000 の位までの概数",
      "nearestTenThousands": "10,000 の位までの概数"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "プロジェクト属性",
    "projectAttributeTitle": "プロジェクト属性の編集"
  },
  "costEscalation": {
    "costEscalationLabel": "追加コストの追加",
    "valueHeader": "値",
    "addCostEscalationText": "追加コストの追加",
    "deleteCostEscalationText": "選択した追加コストの削除",
    "moveCostEscalationUpText": "選択した追加コストを上に移動",
    "moveCostEscalationDownText": "選択した追加コストを下に移動",
    "invalidEntry": "1 つ以上のエントリが無効です。",
    "errorInSavingCostEscalation": "追加コストの詳細を保存できません。"
  },
  "scenarioSelection": {
    "popupTitle": "アセットのシナリオの選択",
    "regionLabel": "ジオグラフィ",
    "scenarioLabel": "シナリオ",
    "noneText": "なし",
    "copyFeatureMsg": "選択したフィーチャをコピーしますか？"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "詳細の統計情報",
    "noDetailStatisticAvailable": "アセットの統計情報が追加されていません"
  }
});