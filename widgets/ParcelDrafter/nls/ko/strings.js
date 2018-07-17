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
  "_widgetLabel": "필지 드래프터",
  "newTraverseButtonLabel": "새 트래버스 시작",
  "invalidConfigMsg": "잘못된 구성",
  "geometryServiceURLNotFoundMSG": "지오메트리 서비스 URL을 가져올 수 없음",
  "editTraverseButtonLabel": "트래버스 편집",
  "mapTooltipForStartNewTraverse": "시작하려면 맵의 포인트를 선택하거나 아래에 입력하세요.",
  "mapTooltipForEditNewTraverse": "편집할 필지를 선택하세요.",
  "mapTooltipForUpdateStartPoint": "시작 포인트를 업데이트하려면 클릭",
  "mapTooltipForScreenDigitization": "필지 포인트를 추가하려면 클릭",
  "mapTooltipForRotate": "드래그하여 회전",
  "mapTooltipForScale": "드래그하여 크기 조정",
  "backButtonTooltip": "뒤로",
  "newTraverseTitle": "새 트래버스",
  "editTraverseTitle": "트래버스 편집",
  "clearingDataConfirmationMessage": "변경 사항이 취소됩니다. 계속하시겠습니까?",
  "unableToFetchParcelMessage": "필지를 가져올 수 없습니다.",
  "unableToFetchParcelLinesMessage": "필지 라인을 가져올 수 없습니다.",
  "planSettings": {
    "planSettingsTitle": "설정",
    "directionOrAngleTypeLabel": "길찾기 또는 각도 유형",
    "directionOrAngleUnitsLabel": "길찾기 또는 각도 단위",
    "distanceAndLengthUnitsLabel": "거리 및 길이 단위",
    "areaUnitsLabel": "면적 단위",
    "circularCurveParameters": "원형 곡선 매개변수",
    "northAzimuth": "북 방위",
    "southAzimuth": "남 방위",
    "quadrantBearing": "사분면 방위각",
    "radiusAndChordLength": "반경 및 현 길이",
    "radiusAndArcLength": "반경 및 호 길이",
    "expandGridTooltipText": "그리드 확장",
    "collapseGridTooltipText": "그리드 축소",
    "zoomToLocationTooltipText": "위치로 확대",
    "onScreenDigitizationTooltipText": "디지털화"
  },
  "traverseSettings": {
    "bearingLabel": "방위각",
    "lengthLabel": "길이",
    "radiusLabel": "반경",
    "noMiscloseCalculated": "폐합이 계산되지 않음",
    "traverseMiscloseBearing": "폐합 방위각",
    "traverseAccuracy": "정확도",
    "accuracyHigh": "높음",
    "traverseDistance": "폐합 거리",
    "traverseMiscloseRatio": "폐합 비율",
    "traverseStatedArea": "지정된 면적",
    "traverseCalculatedArea": "계산된 면적",
    "addButtonTitle": "추가",
    "deleteButtonTitle": "제거"
  },
  "parcelTools": {
    "rotationToolLabel": "각도",
    "scaleToolLabel": "축척"
  },
  "newTraverse": {
    "invalidBearingMessage": "방위각이 잘못되었습니다.",
    "invalidLengthMessage": "길이가 잘못되었습니다.",
    "invalidRadiusMessage": "반경이 잘못되었습니다.",
    "negativeLengthMessage": "곡선에만 유효함",
    "enterValidValuesMessage": "유효한 값을 입력하세요.",
    "enterValidParcelInfoMessage": "저장하려는 유효한 필지 정보를 입력하세요.",
    "unableToDrawLineMessage": "라인을 그릴 수 없습니다.",
    "invalidEndPointMessage": "끝점이 잘못되어 라인을 그릴 수 없습니다."
  },
  "planInfo": {
    "requiredText": "(필수)",
    "optionalText": "(선택)",
    "parcelNamePlaceholderText": "필지 이름",
    "parcelDocumentTypeText": "문서 유형",
    "planNamePlaceholderText": "계획 이름",
    "cancelButtonLabel": "취소",
    "saveButtonLabel": "저장",
    "saveNonClosedParcelConfirmationMessage": "입력한 필지가 닫혀있지 않습니다. 계속하여 필지 라인만 저장하시겠습니까?",
    "unableToCreatePolygonParcel": "필지 폴리곤을 생성할 수 없습니다.",
    "unableToSavePolygonParcel": "필지 폴리곤을 저장할 수 없습니다.",
    "unableToSaveParcelLines": "필지 라인을 저장할 수 없습니다.",
    "unableToUpdateParcelLines": "필지 라인을 업데이트할 수 없습니다.",
    "parcelSavedSuccessMessage": "필지가 저장되었습니다.",
    "enterValidParcelNameMessage": "유효한 필지 이름을 입력하세요.",
    "enterValidPlanNameMessage": "유효한 계획 이름을 입력하세요.",
    "enterValidDocumentTypeMessage": "문서 유형이 잘못되었습니다.",
    "enterValidStatedAreaNameMessage": "유효한 지정 면적을 입력하세요."
  },
  "xyInput": {
    "explanation": "필지 레이어의 공간 참조 내"
  }
});