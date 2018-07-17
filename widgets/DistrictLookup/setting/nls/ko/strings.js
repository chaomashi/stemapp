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
    "miles": "Miles",
    "kilometers": "Kilometers",
    "feet": "Feet",
    "meters": "Meters"
  },
  "layerSetting": {
    "layerSettingTabTitle": "검색 설정",
    "buttonSet": "설정",
    "selectLayersLabel": "레이어 선택",
    "selectLayersHintText": "힌트: 폴리곤 레이어와 관련 포인트 레이어를 선택하는 데 사용됩니다.",
    "selectPrecinctSymbolLabel": "폴리곤을 강조 표시할 심볼 선택",
    "selectGraphicLocationSymbol": "주소 또는 위치 심볼",
    "graphicLocationSymbolHintText": "힌트: 검색한 주소 또는 클릭한 위치의 심볼",
    "precinctSymbolHintText": "힌트: 선택한 폴리곤의 심볼을 나타내는 데 사용됨",
    "selectColorForPoint": "포인트를 강조 표시할 색 선택",
    "selectColorForPointHintText": "힌트: 선택한 포인트에 강조 표시색을 표시하는 데 사용됨"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "원본 설정 검색",
    "searchSourceSettingTitle": "원본 설정 검색",
    "searchSourceSettingTitleHintText": "지오코드 서비스 또는 피처 레이어를 검색 원본으로 추가하고 구성합니다. 이러한 지정된 원본은 검색 상자 내에서 검색 가능한 항목을 확인합니다.",
    "addSearchSourceLabel": "검색 원본 추가",
    "featureLayerLabel": "피처 레이어",
    "geocoderLabel": "지오코더",
    "nameTitle": "이름",
    "generalSettingLabel": "일반 설정",
    "allPlaceholderLabel": "모두 검색하기 위한 플레이스 홀더 텍스트:",
    "allPlaceholderHintText": "힌트: 모든 레이어와 지오코더를 검색하는 동안 텍스트를 플레이스 홀더로 표시되도록 입력합니다.",
    "generalSettingCheckboxLabel": "발견한 피처 또는 위치에 대해 팝업 보기",
    "countryCode": "국가 또는 지역 코드",
    "countryCodeEg": "예: ",
    "countryCodeHint": "이 값을 비워 두면 모든 국가와 지역이 검색됩니다.",
    "questionMark": "?",
    "searchInCurrentMapExtent": "현재 맵 범위에서만 검색",
    "zoomScale": "확대/축소 축척",
    "locatorUrl": "지오코더 URL",
    "locatorName": "지오코더 이름",
    "locatorExample": "예시",
    "locatorWarning": "이 버전의 지오코딩 서비스는 지원되지 않습니다. 위젯이 지오코딩 서비스 10.0 이상을 지원합니다.",
    "locatorTips": "지오코딩 서비스에서 추천 기능을 지원하지 않기 때문에 추천을 사용할 수 없습니다.",
    "layerSource": "레이어 원본",
    "setLayerSource": "레이어 원본 설정",
    "setGeocoderURL": "지오코더 URL 설정",
    "searchLayerTips": "피처 서비스에서 페이지 매김 기능을 지원하지 않기 때문에 제안 사항을 사용할 수 없습니다.",
    "placeholder": "플레이스 홀더 텍스트",
    "searchFields": "검색 필드",
    "displayField": "디스플레이 필드",
    "exactMatch": "정확히 일치",
    "maxSuggestions": "최대 추천",
    "maxResults": "최대 결과",
    "enableLocalSearch": "로컬 검색 사용",
    "minScale": "최소 축척",
    "minScaleHint": "맵 축척이 이 축척보다 큰 경우 로컬 검색이 적용됨",
    "radius": "반경",
    "radiusHint": "위치와 가장 가까운 후보가 제일 먼저 반환되도록 지오코딩 후보의 순위를 올리는 데 사용되는 현재 맵 중심 주변 영역의 반경을 지정함",
    "meters": "미터",
    "setSearchFields": "검색 필드 설정",
    "set": "설정",
    "fieldName": "이름",
    "invalidUrlTip": "${URL} URL이 잘못되었거나 접근할 수 없습니다.",
    "invalidSearchSources": "잘못된 원본 설정 검색"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "폴리곤 레이어 선택",
    "selectPolygonLayerHintText": "힌트: 폴리곤 레이어를 선택하는 데 사용됩니다.",
    "selectRelatedPointLayerLabel": "폴리곤 레이어와 관련된 포인트 레이어 선택",
    "selectRelatedPointLayerHintText": "힌트: 폴리곤 레이어와 관련된 포인트 레이어를 선택하는 데 사용됨",
    "polygonLayerNotHavingRelatedLayer": "관련된 포인트 레이어가 있는 폴리곤 레이어를 선택하세요.",
    "errorInSelectingPolygonLayer": "관련된 포인트 레이어가 있는 폴리곤 레이어를 선택하세요.",
    "errorInSelectingRelatedLayer": "폴리곤 레이어와 관련된 포인트 레이어를 선택하세요."
  },
  "routeSetting": {
    "routeSettingTabTitle": "길찾기 설정",
    "routeServiceUrl": "경로 서비스",
    "buttonSet": "설정",
    "routeServiceUrlHintText": "힌트: 네트워크 분석 길찾기 서비스를 찾아 선택하려면 '설정'을 클릭하세요.",
    "directionLengthUnit": "길찾기 길이 단위",
    "unitsForRouteHintText": "힌트: 경로에 보고된 단위를 나타내는 데 사용됨",
    "selectRouteSymbol": "경로를 나타낼 심볼 선택",
    "routeSymbolHintText": "힌트: 경로에 대한 라인 심볼을 나타내는 데 사용됨",
    "routingDisabledMsg": "길찾기를 활성화하려면 ArcGIS Online 항목에서 경로 서비스가 활성화되어 있어야 합니다."
  },
  "networkServiceChooser": {
    "arcgislabel": "ArcGIS Online에서 추가",
    "serviceURLabel": "서비스 URL 추가",
    "routeURL": "경로 URL",
    "validateRouteURL": "유효성 검사",
    "exampleText": "예시",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "올바른 경로 서비스를 지정하세요.",
    "rateLimitExceeded": "속도 제한이 초과되었습니다. 나중에 다시 시도하세요.",
    "errorInvokingService": "사용자 이름 또는 비밀번호가 올바르지 않습니다."
  },
  "symbolPickerPreviewText": "미리 보기:",
  "showToolToSelectLabel": "위치 버튼 설정",
  "showToolToSelectHintText": "힌트: 맵을 클릭할 때 위치를 항상 설정하는 대신 맵에서 위치를 설정하는 버튼을 제공합니다."
});