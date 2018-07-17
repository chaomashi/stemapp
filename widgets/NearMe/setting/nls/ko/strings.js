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
      "displayText": "Miles",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Kilometers",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Feet",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "Meters",
      "acronym": "m"
    }
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
    "invalidUrlTip": "${URL} URL이 잘못되었거나 접근할 수 없습니다."
  },
  "searchSetting": {
    "searchSettingTabTitle": "검색 설정",
    "defaultBufferDistanceLabel": "기본 버퍼 거리 설정",
    "maxResultCountLabel": "결과 수 제한",
    "maxResultCountHintLabel": "힌트: 보이는 결과 수를 최대로 설정합니다. 1의 값이 가장 가까운 피처로 반환됩니다.",
    "maxBufferDistanceLabel": "최대 버퍼 거리 설정",
    "bufferDistanceUnitLabel": "버퍼 거리 단위",
    "defaultBufferHintLabel": "힌트: 버퍼 슬라이더에 대한 기본값 설정",
    "maxBufferHintLabel": "힌트: 버퍼 슬라이더에 대한 최대값 설정",
    "bufferUnitLabel": "힌트: 버퍼 생성을 위한 단위 정의",
    "selectGraphicLocationSymbol": "주소 또는 위치 심볼",
    "graphicLocationSymbolHintText": "힌트: 검색한 주소 또는 클릭한 위치의 심볼",
    "addressLocationPolygonHintText": "힌트: 검색한 폴리곤 레이어의 심볼입니다.",
    "popupTitleForPolygon": "선택한 주소 위치에 대해 폴리곤을 선택합니다.",
    "popupTitleForPolyline": "주소 위치에 대해 라인을 선택합니다.",
    "addressLocationPolylineHintText": "힌트: 검색한 폴리라인 레이어의 심볼입니다.",
    "fontColorLabel": "검색 결과의 글꼴 색상 선택",
    "fontColorHintText": "힌트: 검색 결과의 글꼴 색상",
    "zoomToSelectedFeature": "선택한 피처로 확대/축소",
    "zoomToSelectedFeatureHintText": "힌트: 버퍼 대신 선택한 피처로 확대/축소",
    "intersectSearchLocation": "교차 폴리곤 반환",
    "intersectSearchLocationHintText": "힌트: 버퍼 내 폴리곤이 아닌 검색된 위치를 포함하는 폴리곤 반환",
    "enableProximitySearch": "인접도 검색 활성화",
    "enableProximitySearchHintText": "힌트: 선택한 결과 근처의 위치를 검색하는 기능을 활성화함",
    "bufferVisibilityLabel": "버퍼 가시성 설정",
    "bufferVisibilityHintText": "힌트: 버퍼가 맵에 표시됨",
    "bufferColorLabel": "버퍼 심볼 설정",
    "bufferColorHintText": "힌트: 버퍼의 색상 및 투명도 선택",
    "searchLayerResultLabel": "선택한 레이어 결과만 그리기",
    "searchLayerResultHint": "힌트: 검색 결과에서 선택한 레이어만 맵에 그려짐",
    "showToolToSelectLabel": "위치 버튼 설정",
    "showToolToSelectHintText": "힌트: 맵을 클릭할 때 위치를 항상 설정하는 대신 맵에서 위치를 설정하는 버튼을 제공합니다.",
    "geoDesicParamLabel": "측지선(Geodesic) 버퍼 사용",
    "geoDesicParamHintText": "힌트: 유클리드 버퍼(평면) 대신 측지선(Geodesic) 버퍼를 사용합니다."
  },
  "layerSelector": {
    "selectLayerLabel": "검색 레이어 선택",
    "layerSelectionHint": "힌트: 설정 버튼을 사용하여 레이어 선택",
    "addLayerButton": "설정"
  },
  "routeSetting": {
    "routeSettingTabTitle": "길찾기 설정",
    "routeServiceUrl": "경로 서비스",
    "buttonSet": "설정",
    "routeServiceUrlHintText": "힌트: 경로 지정 서비스를 검색하고 선택하려면 â€˜Setâ€™ 클릭",
    "directionLengthUnit": "길찾기 길이 단위",
    "unitsForRouteHintText": "힌트: 경로의 단위를 나타내는 데 사용됨",
    "selectRouteSymbol": "경로를 나타낼 심볼 선택",
    "routeSymbolHintText": "힌트: 경로에 대한 라인 심볼을 나타내는 데 사용됨",
    "routingDisabledMsg": "길찾기를 활성화하려면 응용프로그램 설정 항목에서 경로 서비스가 활성화되어 있어야 합니다."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "심볼 설정",
    "addSymbologyBtnLabel": "새 심볼 추가",
    "layerNameTitle": "레이어 이름",
    "fieldTitle": "필드",
    "valuesTitle": "값",
    "symbolTitle": "심볼",
    "actionsTitle": "작업",
    "invalidConfigMsg": "중복 필드: 레이어의 ${fieldName}: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "필터 설정",
    "addTaskTip": "선택한 검색 레이어에 하나 이상의 필터를 추가하고 각각에 대한 매개변수를 구성합니다.",
    "enableMapFilter": "프리셋 레이어 필터를 맵에서 제거합니다.",
    "newFilter": "새 필터",
    "filterExpression": "필터 식",
    "layerDefaultSymbolTip": "레이어의 기본 심볼 사용",
    "uploadImage": "이미지 업로드",
    "selectLayerTip": "레이어를 선택하세요.",
    "setTitleTip": "제목을 설정하세요.",
    "noTasksTip": "구성된 필터가 없습니다. 새 필터를 추가하려면 \"${newFilter}”를 클릭하세요.",
    "collapseFiltersTip": "위젯이 열리면 필터 식(있을 경우)을 축소함",
    "groupFiltersTip": "레이어별로 필터 그룹화"
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
  "errorStrings": {
    "bufferErrorString": "올바른 숫자 값을 입력하세요.",
    "selectLayerErrorString": "검색할 레이어를 선택하세요.",
    "invalidDefaultValue": "기본 버퍼 거리는 비워 둘 수 없습니다. 버퍼 거리를 지정하세요.",
    "invalidMaximumValue": "최대 버퍼 거리는 비워 둘 수 없습니다. 버퍼 거리를 지정하세요.",
    "defaultValueLessThanMax": "기본 버퍼 거리를 최대 한도 내로 지정하세요.",
    "defaultBufferValueGreaterThanOne": "기본 버퍼 거리는 0 미만일 수 없음",
    "maximumBufferValueGreaterThanOne": "최대 버퍼 거리를 0보다 크게 지정하세요.",
    "invalidMaximumResultCountValue": "최대 결과 수에 올바른 값을 지정하세요.",
    "invalidSearchSources": "잘못된 원본 설정 검색"
  },
  "symbolPickerPreviewText": "미리 보기:"
});