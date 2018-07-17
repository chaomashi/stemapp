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
    "miles": "マイル",
    "kilometers": "キロメートル",
    "feet": "フィート",
    "meters": "メートル"
  },
  "layerSetting": {
    "layerSettingTabTitle": "検索設定",
    "buttonSet": "設定",
    "selectLayersLabel": "レイヤーの選択",
    "selectLayersHintText": "ヒント: ポリゴン レイヤーおよびそれに関連するポイント レイヤーの選択に使用されます。",
    "selectPrecinctSymbolLabel": "シンボルを選択してポリゴンをハイライト",
    "selectGraphicLocationSymbol": "住所または位置のシンボル",
    "graphicLocationSymbolHintText": "ヒント: 検索した住所またはクリックした位置のシンボル",
    "precinctSymbolHintText": "ヒント: 選択したポリゴンのシンボルの表示に使用されます",
    "selectColorForPoint": "ポイントをハイライト表示する色を選択",
    "selectColorForPointHintText": "ヒント: 選択したポイントのハイライト色の表示に使用されます"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "検索ソースの設定",
    "searchSourceSettingTitle": "検索ソースの設定",
    "searchSourceSettingTitleHintText": "ジオコード サービスまたはフィーチャ レイヤーを検索ソースとして追加および構成します。指定されたこれらのソースは、検索ボックス内で検索可能な対象を決定します。",
    "addSearchSourceLabel": "検索ソースの追加",
    "featureLayerLabel": "フィーチャ レイヤー",
    "geocoderLabel": "ジオコーダー",
    "nameTitle": "名前",
    "generalSettingLabel": "一般設定",
    "allPlaceholderLabel": "標準のプレースホルダー テキスト:",
    "allPlaceholderHintText": "ヒント: すべてのレイヤーとジオコーダーを検索するときに、プレースホルダーとして表示されるテキストを入力します",
    "generalSettingCheckboxLabel": "検出されたフィーチャまたは位置のポップアップを表示",
    "countryCode": "国コードまたは地域コード",
    "countryCodeEg": "例: ",
    "countryCodeHint": "この値を空白のままにすると、すべての国および地域を検索します",
    "questionMark": "？",
    "searchInCurrentMapExtent": "現在のマップ範囲内のみを検索",
    "zoomScale": "ズーム縮尺",
    "locatorUrl": "ジオコーダーの URL",
    "locatorName": "ジオコーダー名",
    "locatorExample": "例",
    "locatorWarning": "このジオコーディング サービスのバージョンはサポートされていません。ウィジェットは、10.0 以上のジオコーディング サービスをサポートしています。",
    "locatorTips": "ジオコーディング サービスがヒント機能をサポートしていないため、ヒントは使用できません。",
    "layerSource": "レイヤー ソース",
    "setLayerSource": "レイヤー ソースの設定",
    "setGeocoderURL": "ジオコーダーの URL の設定",
    "searchLayerTips": "フィーチャ サービスがページネーション機能をサポートしていないため、ヒントは使用できません。",
    "placeholder": "プレースホルダー テキスト",
    "searchFields": "検索フィールド",
    "displayField": "表示フィールド",
    "exactMatch": "完全一致",
    "maxSuggestions": "最大候補数",
    "maxResults": "結果の最大数",
    "enableLocalSearch": "ローカル検索の有効化",
    "minScale": "最小縮尺",
    "minScaleHint": "マップ縮尺がこの縮尺より大きい場合は、ローカル検索が適用されます。",
    "radius": "半径",
    "radiusHint": "現在のマップの中心を起点としたエリアの半径を指定します。この半径は、検索位置に最も近い候補が最初に返されるようにジオコーディング候補のランクを高めるために使用されます。",
    "meters": "メートル",
    "setSearchFields": "検索フィールドの設定",
    "set": "設定",
    "fieldName": "名前",
    "invalidUrlTip": "URL ${URL} は無効であるか、アクセスできません。",
    "invalidSearchSources": "検索ソースの設定が無効です"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "ポリゴン レイヤーの選択",
    "selectPolygonLayerHintText": "ヒント: ポリゴン レイヤーの選択に使用されます。",
    "selectRelatedPointLayerLabel": "ポリゴン レイヤーに関連するポイント レイヤーの選択",
    "selectRelatedPointLayerHintText": "ヒント: ポリゴン レイヤーに関連するポイント レイヤーの選択に使用されます",
    "polygonLayerNotHavingRelatedLayer": "関連するポイント レイヤーがあるポリゴン レイヤーを選択してください。",
    "errorInSelectingPolygonLayer": "関連するポイント レイヤーがあるポリゴン レイヤーを選択してください。",
    "errorInSelectingRelatedLayer": "ポリゴン レイヤーに関連するポイント レイヤーを選択してください。"
  },
  "routeSetting": {
    "routeSettingTabTitle": "ルート案内設定",
    "routeServiceUrl": "ルート サービス",
    "buttonSet": "設定",
    "routeServiceUrlHintText": "ヒント: [設定] をクリックし、ネットワーク解析ルート サービスを参照して選択します",
    "directionLengthUnit": "ルート案内の長さの単位",
    "unitsForRouteHintText": "ヒント: レポートされるルートの単位の表示に使用されます",
    "selectRouteSymbol": "ルートを表示するシンボルの選択",
    "routeSymbolHintText": "ヒント: ルートのライン シンボルの表示に使用されます",
    "routingDisabledMsg": "ルート案内を有効にするには、必ず ArcGIS Online アイテムでルート検索を有効にします。"
  },
  "networkServiceChooser": {
    "arcgislabel": "ArcGIS Online から追加",
    "serviceURLabel": "サービス URL の追加",
    "routeURL": "ルート URL",
    "validateRouteURL": "整合チェック",
    "exampleText": "例",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "有効なルート サービスを指定してください。",
    "rateLimitExceeded": "評価制限を超えました。後でもう一度やり直してください。",
    "errorInvokingService": "ユーザー名またはパスワードが正しくありません。"
  },
  "symbolPickerPreviewText": "プレビュー:",
  "showToolToSelectLabel": "[場所の設定] ボタン",
  "showToolToSelectHintText": "ヒント: 常にマップをクリックして場所を設定する代わりに、場所を設定するボタンをマップ上に提供します"
});