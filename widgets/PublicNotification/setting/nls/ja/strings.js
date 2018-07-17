/*
 | Copyright 2017 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define({
  "searchSourceSetting": {
    "title": "検索およびバッファー設定",
    "mainHint": "住所とフィーチャのテキスト検索、ジオメトリのデジタイズ、およびバッファー処理を有効化できます。"
  },
  "addressSourceSetting": {
    "title": "住所レイヤー",
    "mainHint": "使用できる宛先ラベル レイヤーを指定できます。"
  },
  "notificationSetting": {
    "title": "通知オプション",
    "mainHint": "使用できる通知のタイプを指定できます。"
  },
  "groupingLabels": {
    "addressSources": "宛先レイヤーの選択に使用するレイヤー",
    "averyStickersDetails": "Avery(r) ステッカー",
    "csvDetails": "カンマ区切り値 (CSV) ファイル",
    "drawingTools": "エリアを指定するための描画ツール",
    "featureLayerDetails": "フィーチャ レイヤー",
    "geocoderDetails": "ジオコーダー",
    "labelFormats": "利用可能なラベル形式",
    "printingOptions": "印刷されたラベル ページのオプション",
    "searchSources": "検索ソース",
    "stickerFormatDetails": "ラベル ページ パラメーター"
  },
  "hints": {
    "alignmentAids": "プリンターでページの位置合わせに役立つ、ラベル ページに追加されるマーク",
    "csvNameList": "大文字/小文字を区別するフィールド名のカンマ区切りリスト",
    "horizontalGap": "行内の 2 つのラベル間のスペース",
    "insetToLabel": "ラベルの横とテキストの開始間のスペース",
    "labelFormatDescription": "ウィジェット形式オプション リストでのラベル スタイルの表示方法",
    "labelFormatDescriptionHint": "形式オプション リスト内で説明を補足するツールチップ",
    "labelHeight": "ページ上の各ラベルの高さ",
    "labelWidth": "ページ上の各ラベルの幅",
    "localSearchRadius": "現在のマップの中心を起点としたエリアの半径を指定します。この半径は、検索位置に最も近い候補が最初に返されるようにジオコーディング候補のランクを高めるために使用されます。",
    "rasterResolution": "100 PPI が画面解像度とほぼ一致します。解像度が高いほど、ブラウザーに多くのメモリが必要です。大きなメモリ要求に問題なく対処する能力はブラウザーによって異なります。",
    "selectionListOfOptionsToDisplay": "オンになっているアイテムは、ウィジェットでオプションとして表示されます。必要に応じて順序を変更します",
    "verticalGap": "列内の 2 つのラベル間のスペース"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "デフォルトのバッファー距離",
    "bufferUnits": "ウィジェットで指定するバッファー単位",
    "countryRegionCodes": "国コードまたは地域コード",
    "description": "説明",
    "descriptionHint": "説明のヒント",
    "displayField": "表示フィールド",
    "drawingToolsFreehandPolygon": "フリーハンド ポリゴン",
    "drawingToolsLine": "ライン",
    "drawingToolsPoint": "point",
    "drawingToolsPolygon": "ポリゴン",
    "drawingToolsPolyline": "ポリライン",
    "enableLocalSearch": "ローカル検索の有効化",
    "exactMatch": "完全一致",
    "fontSizeAlignmentNote": "印刷の余白に関する注意のフォント サイズ",
    "gridDarkness": "グリッドの暗さ",
    "gridlineLeftInset": "左格子線インセット",
    "gridlineMajorTickMarksGap": "主目盛間隔",
    "gridlineMinorTickMarksGap": "補助目盛間隔",
    "gridlineRightInset": "右格子線インセット",
    "labelBorderDarkness": "ラベル境界線の暗さ",
    "labelBottomEdge": "ページ上のラベルの下端",
    "labelFontSize": "フォント サイズ",
    "labelHeight": "ラベルの高さ",
    "labelHorizontalGap": "水平方向のギャップ",
    "labelInitialInset": "ラベル テキストへの差し込み",
    "labelLeftEdge": "ページ上のラベルの左端",
    "labelMaxLineCount": "ラベル内の最大行数",
    "labelPageHeight": "ページの高さ",
    "labelPageWidth": "ページの幅",
    "labelRightEdge": "ページ上のラベルの右端",
    "labelsInAColumn": "列内のラベル数",
    "labelsInARow": "行内のラベル数",
    "labelTopEdge": "ページ上のラベルの上端",
    "labelVerticalGap": "鉛直方向のギャップ",
    "labelWidth": "ラベルの幅",
    "limitSearchToMapExtent": "現在のマップ範囲内のみを検索",
    "maximumResults": "結果の最大数",
    "maximumSuggestions": "最大候補数",
    "minimumScale": "最小縮尺",
    "name": "名前順",
    "percentBlack": "% 黒",
    "pixels": "ピクセル",
    "pixelsPerInch": "PPI",
    "placeholderText": "プレースホルダー テキスト",
    "placeholderTextForAllSources": "すべてのソースを検索するためのプレースホルダー テキスト",
    "radius": "半径",
    "rasterResolution": "ラスター解像度",
    "searchFields": "検索フィールド",
    "showAlignmentAids": "ページ上に配置補助線を表示",
    "showGridTickMarks": "グリッドの目盛マークを表示",
    "showLabelOutlines": "ラベルのアウトラインを表示",
    "showPopupForFoundItem": "検出されたフィーチャまたは位置のポップアップを表示",
    "tool": "Tools",
    "units": "単位",
    "url": "URL",
    "urlToGeometryService": "ジオメトリ サービスの URL",
    "useRelatedRecords": "関連レコードの使用",
    "useSecondarySearchLayer": "セカンダリ選択レイヤーの使用",
    "useSelectionDrawTools": "選択描画ツールの使用",
    "useVectorFonts": "ベクター フォントの使用 (ラテン フォントのみ)",
    "zoomScale": "ズーム縮尺"
  },
  "buttons": {
    "addAddressSource": "ポップアップに住所ラベルを含むレイヤーの追加",
    "addLabelFormat": "ラベル形式の追加",
    "addSearchSource": "検索ソースの追加",
    "set": "設定"
  },
  "placeholders": {
    "averyExample": "例: Avery(r) ラベル ${averyPartNumber}",
    "countryRegionCodes": "例: USA、CHN",
    "descriptionCSV": "カンマ区切り値",
    "descriptionPDF": "PDF ラベル ${heightLabelIn} x ${widthLabelIn} インチ、${labelsPerPage}/ページ"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Web マップからフィーチャ レイヤーを取得",
    "openCountryCodes": "クリックしてコードの詳細を取得",
    "openFieldSelector": "クリックしてフィールド セレクターを開く",
    "setAndValidateURL": "URL の設定と整合チェック"
  },
  "problems": {
    "noAddresseeLayers": "宛先レイヤーを少なくとも 1 つ指定してください。",
    "noBufferUnitsForDrawingTools": "描画ツールのバッファー単位を少なくとも 1 つ構成してください。",
    "noBufferUnitsForSearchSource": "検索ソース \"${sourceName}\" のバッファー単位を少なくとも 1 つ構成してください。",
    "noGeometryServiceURL": "ジオメトリ サービスの URL を構成してください。",
    "noNotificationLabelFormats": "通知ラベルの形式を少なくとも 1 つ指定してください。",
    "noSearchSourceFields": "検索ソース \"${sourceName}\" の検索フィールドを 1 つ以上構成してください。",
    "noSearchSourceURL": "検索ソース \"${sourceName}\" の URL を構成してください。"
  }
});