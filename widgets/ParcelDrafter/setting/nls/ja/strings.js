///////////////////////////////////////////////////////////////////////////
// Copyright © 2016 Esri. All Rights Reserved.
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
  "setBtnLabel": "設定",
  "selectLabel": "選択",
  "selectLayerLabel": "パーセル レイヤーの選択",
  "selectLayerHintText": "ヒント: 設定ボタンを使用して、パーセル ポリゴンとその関連ライン レイヤーを選択します",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "選択したポリゴン レイヤーには、有効な関連レイヤーがありません。"
  },
  "parcelLineLayer": {
    "selectLayerLabel": "関連ライン レイヤーの選択",
    "layerSettingTabLabel": "パーセル レイヤー",
    "advancedSettingTabLabel": "高度な設定",
    "selectLayerHintText": "ヒント: パーセル ライン レイヤーの COGO 値を格納するために使用します",
    "selectFieldLegendLabel": "パーセル ライン レイヤーの COGO 値を格納するフィールドを選択します",
    "bearingFieldLabel": "方位",
    "chordLengthFieldLabel": "弦の長さ",
    "distanceFieldLabel": "距離",
    "sequenceIdFieldLabel": "シーケンス ID",
    "radiusFieldLabel": "半径",
    "foreignKeyFieldLabel": "外部キー",
    "arcLengthFieldLabel": "円弧長",
    "lineTypeFieldLabel": "ライン タイプ",
    "parcelPointSymbolLabel": "パーセル ポイント シンボル",
    "parcelPointSymbolHintText": "ヒント: ラインの原点のポイント シンボルを表示するために使用されます。",
    "symbolPickerPreviewText": "プレビュー",
    "selectLineLayerLabel": "ライン レイヤーの選択"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "ポリゴン レイヤーの選択",
    "selectPolygonLayerHintText": "ヒント: パーセル ポリゴン レイヤーを選択するために使用します",
    "selectFieldLegendLabel": "パーセル ポリゴンの属性を格納するフィールドを選択します",
    "parcelNameLabel": "パーセル名",
    "rotationLabel": "回転",
    "planNameLabel": "プランの名前",
    "scalingLabel": "スケーリング",
    "documentTypeLabel": "ドキュメント タイプ",
    "miscloseRatioLabel": "Misclose Ratio",
    "statedAreaLabel": "記載面積",
    "miscloseDistanceLabel": "Misclose Distance",
    "selectPolygonLayerLabelPopUp": "ポリゴン レイヤーの選択"
  },
  "lineTypesTable": {
    "lineTypeLabel": "ライン タイプ",
    "valueLabel": "値",
    "symbolLabel": "シンボル",
    "connectionLineLabel": "接続線",
    "boundaryLineLabel": "境界線"
  },
  "closureSetting": {
    "snappingLayerLabel": "スナップ ライン",
    "snappingBtnLabel": "設定",
    "snappingLayerHintText": "ヒント: パーセル ラインがスナップするレイヤーを選択します。",
    "miscloseDistanceLabel": "Misclose Distance",
    "miscloseDistanceHintText": "ヒント: 閉合差の距離とその単位を指定します。",
    "miscloseRatioLabel": "Misclose Ratio",
    "miscloseRatioHintText": "ヒント: 閉合差の比率を指定します。",
    "snappingToleranceLabel": "スナップ許容値",
    "pixelLabel": "ピクセル",
    "snappingToleranceHintText": "ヒント: スナップ許容値を指定します。",
    "selectLayerLabel": "レイヤーの選択"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "無効な方位角フィールド",
    "chordLengthErrMsg": "無効な弦の長さ",
    "distanceFieldErrMsg": "無効な距離",
    "sequenceIdFieldErrMsg": "無効なシーケンス ID",
    "radiusFieldErrMsg": "無効な半径",
    "foreignKeyFieldErrMsg": "無効な外部キー",
    "arcLengthFieldErrMsg": "無効な円弧長",
    "lineTypeFieldErrMsg": "無効なライン タイプ",
    "parcelNameFieldErrMsg": "無効なパーセル名フィールド",
    "planNameFieldErrMsg": "無効なプラン名フィールド",
    "scaleFieldErrMsg": "無効な縮尺フィールド",
    "documentTypeFieldErrMsg": "無効なドキュメント タイプ フィールド",
    "miscloseRatioFieldErrMsg": "無効な閉合差の比率フィールド",
    "statedAreaFieldErrMsg": "無効な記載面積フィールド",
    "miscloseDistanceFieldErrMsg": "無効な閉合差の距離フィールド",
    "globalIdFieldErrMsg": "選択したポリゴン レイヤーには、有効な 'esriFieldTypeGlobalID' フィールドがありません。",
    "invalidPolylineLayer": "有効なパーセル ポリライン レイヤーを選択してください",
    "invalidPolygonLayer": "有効なパーセル ポリゴン レイヤーを選択してください",
    "invalidMiscloseDistance": "有効な閉合差の距離を入力してください",
    "invalidSnappingTolerance": "有効なスナップ許容値を入力してください",
    "invalidMiscloseRatio": "有効な閉合差の比率を入力してください",
    "selectDistinctLineTypes": "各ライン タイプの個別値を入力してください",
    "invalidConnectionLineType": "無効な接続線の値",
    "invalidBoundaryLineType": "無効な境界線の値",
    "selectDistinctPolylineFields": "各 COGO 値に個別のフィールドを選択してください。",
    "selectDistinctPolygonFields": "各パーセル ポリゴン属性に個別のフィールドを選択してください。"
  }
});