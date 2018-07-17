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
    "miles": {
      "displayText": "マイル",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "キロメートル",
      "acronym": "km"
    },
    "feet": {
      "displayText": "フィート",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "メートル",
      "acronym": "m"
    }
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
    "invalidUrlTip": "URL ${URL} は無効であるか、アクセスできません。"
  },
  "searchSetting": {
    "searchSettingTabTitle": "検索設定",
    "defaultBufferDistanceLabel": "デフォルトのバッファー距離の設定",
    "maxResultCountLabel": "結果数の制限",
    "maxResultCountHintLabel": "ヒント: 表示される結果の最大数を設定します。値が 1 の場合は、最近接フィーチャが返されます。",
    "maxBufferDistanceLabel": "最大バッファー距離の設定",
    "bufferDistanceUnitLabel": "バッファーの距離単位",
    "defaultBufferHintLabel": "ヒント: バッファー スライダーのデフォルト値を設定します",
    "maxBufferHintLabel": "ヒント: バッファー スライダーの最大値を設定します",
    "bufferUnitLabel": "ヒント: バッファーを作成するための単位を定義します",
    "selectGraphicLocationSymbol": "住所または位置のシンボル",
    "graphicLocationSymbolHintText": "ヒント: 検索した住所またはクリックした位置のシンボル",
    "addressLocationPolygonHintText": "ヒント: 検索したポリゴン レイヤーのシンボル",
    "popupTitleForPolygon": "選択した住所位置のポリゴンを選択",
    "popupTitleForPolyline": "住所位置のラインを選択",
    "addressLocationPolylineHintText": "ヒント: 検索したポリライン レイヤーのシンボル",
    "fontColorLabel": "検索結果のフォントの色の選択",
    "fontColorHintText": "ヒント: 検索結果のフォントの色",
    "zoomToSelectedFeature": "選択フィーチャにズーム",
    "zoomToSelectedFeatureHintText": "ヒント: バッファーではなく選択フィーチャにズームします",
    "intersectSearchLocation": "交差するポリゴンを返す",
    "intersectSearchLocationHintText": "ヒント: バッファー内のポリゴンではなく、検索された位置を含むポリゴンを返します",
    "enableProximitySearch": "近接検索の有効化",
    "enableProximitySearchHintText": "ヒント: 選択した結果の近くの位置を検索する機能を有効化します",
    "bufferVisibilityLabel": "バッファーの表示設定",
    "bufferVisibilityHintText": "ヒント: バッファーがマップに表示されます",
    "bufferColorLabel": "バッファー シンボルの設定",
    "bufferColorHintText": "ヒント: バッファーの色と透過表示を選択します",
    "searchLayerResultLabel": "選択したレイヤーの結果のみを描画",
    "searchLayerResultHint": "ヒント: 検索結果内で選択したレイヤーのみがマップに描画されます",
    "showToolToSelectLabel": "[場所の設定] ボタン",
    "showToolToSelectHintText": "ヒント: 常にマップをクリックして場所を設定する代わりに、場所を設定するボタンをマップ上に提供します",
    "geoDesicParamLabel": "測地線バッファーの使用",
    "geoDesicParamHintText": "ヒント: ユークリッド バッファー (平面) の代わりに、測地線バッファーを使用します"
  },
  "layerSelector": {
    "selectLayerLabel": "検索レイヤーの選択",
    "layerSelectionHint": "ヒント: 設定ボタンを使用してレイヤーを選択します",
    "addLayerButton": "設定"
  },
  "routeSetting": {
    "routeSettingTabTitle": "ルート案内設定",
    "routeServiceUrl": "ルート サービス",
    "buttonSet": "設定",
    "routeServiceUrlHintText": "ヒント: [設定] をクリックし、ルート サービスを参照して選択します",
    "directionLengthUnit": "ルート案内の長さの単位",
    "unitsForRouteHintText": "ヒント: ルートの単位の表示に使用されます",
    "selectRouteSymbol": "ルートを表示するシンボルの選択",
    "routeSymbolHintText": "ヒント: ルートのライン シンボルの表示に使用されます",
    "routingDisabledMsg": "ルート案内を有効にするには、必ずアプリケーション設定でアイテムのルート検索を有効にします。"
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "シンボルの設定",
    "addSymbologyBtnLabel": "新しいシンボルの追加",
    "layerNameTitle": "レイヤー名",
    "fieldTitle": "フィールド",
    "valuesTitle": "値",
    "symbolTitle": "シンボル",
    "actionsTitle": "アクション",
    "invalidConfigMsg": "重複したフィールド: レイヤーの ${fieldName}: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "フィルター設定",
    "addTaskTip": "選択した検索レイヤーに 1 つ以上のフィルターを追加して、各フィルターのパラメーターを構成します。",
    "enableMapFilter": "Web マップに設定済みのフィルターを無効にします。",
    "newFilter": "新しいフィルター",
    "filterExpression": "フィルターの条件式",
    "layerDefaultSymbolTip": "レイヤーのデフォルト シンボルの使用",
    "uploadImage": "画像のアップロード",
    "selectLayerTip": "レイヤーを選択してください。",
    "setTitleTip": "タイトルを設定してください。",
    "noTasksTip": "フィルターが構成されていません。\"${newFilter}\" をクリックして新しいフィルターを追加してください。",
    "collapseFiltersTip": "ウィジェットを開くときに、フィルター条件式 (存在する場合) を折りたたむ",
    "groupFiltersTip": "レイヤーでフィルターをグループ化"
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
  "errorStrings": {
    "bufferErrorString": "有効な数値を入力してください。",
    "selectLayerErrorString": "検索するレイヤーを選択してください。",
    "invalidDefaultValue": "デフォルトのバッファー距離を空にすることはできません。バッファー距離を指定してください。",
    "invalidMaximumValue": "最大バッファー距離を空にすることはできません。バッファー距離を指定してください。",
    "defaultValueLessThanMax": "最大制限内のデフォルトのバッファー距離を指定してください",
    "defaultBufferValueGreaterThanOne": "デフォルトのバッファー距離は 0 未満にできません。",
    "maximumBufferValueGreaterThanOne": "0 より大きい最大バッファー距離を指定してください",
    "invalidMaximumResultCountValue": "最大結果数に有効な値を指定してください",
    "invalidSearchSources": "検索ソースの設定が無効です"
  },
  "symbolPickerPreviewText": "プレビュー:"
});