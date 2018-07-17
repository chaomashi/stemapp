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
  "setBtnLabel": "설정",
  "selectLabel": "선택",
  "selectLayerLabel": "필지 레이어 선택",
  "selectLayerHintText": "힌트: 설정 버튼을 사용하여 필지 폴리곤 및 해당 릴레이트된 라인 레이어를 선택합니다.",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "선택한 폴리곤 레이어에 유효한 릴레이트된 레이어가 없습니다."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "릴레이트된 라인 레이어 선택",
    "layerSettingTabLabel": "필지 레이어",
    "advancedSettingTabLabel": "고급 설정",
    "selectLayerHintText": "힌트: 필지 라인 레이어의 COGO 값을 저장하는 데 사용합니다.",
    "selectFieldLegendLabel": "필지 라인 레이어의 COGO 값을 저장할 필드를 선택합니다.",
    "bearingFieldLabel": "방위각",
    "chordLengthFieldLabel": "현 길이",
    "distanceFieldLabel": "거리",
    "sequenceIdFieldLabel": "순서 ID",
    "radiusFieldLabel": "반경",
    "foreignKeyFieldLabel": "외부 키",
    "arcLengthFieldLabel": "호 길이",
    "lineTypeFieldLabel": "라인 유형",
    "parcelPointSymbolLabel": "필지 포인트 심볼",
    "parcelPointSymbolHintText": "힌트: 라인 원점의 포인트 심볼을 표시하는 데 사용됩니다.",
    "symbolPickerPreviewText": "미리 보기",
    "selectLineLayerLabel": "라인 레이어 선택"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "폴리곤 레이어 선택",
    "selectPolygonLayerHintText": "힌트: 필지 폴리곤 레이어 선택을 사용합니다.",
    "selectFieldLegendLabel": "필지 폴리곤 속성을 저장할 필드를 선택합니다.",
    "parcelNameLabel": "필지 이름",
    "rotationLabel": "회전",
    "planNameLabel": "계획 이름",
    "scalingLabel": "크기 조정",
    "documentTypeLabel": "문서 유형",
    "miscloseRatioLabel": "폐합 비율",
    "statedAreaLabel": "지정된 면적",
    "miscloseDistanceLabel": "폐합 거리",
    "selectPolygonLayerLabelPopUp": "폴리곤 레이어 선택"
  },
  "lineTypesTable": {
    "lineTypeLabel": "라인 유형",
    "valueLabel": "값",
    "symbolLabel": "심볼",
    "connectionLineLabel": "연결 라인",
    "boundaryLineLabel": "경계선"
  },
  "closureSetting": {
    "snappingLayerLabel": "레이어 스내핑",
    "snappingBtnLabel": "설정",
    "snappingLayerHintText": "힌트: 필지 라인을 스냅할 레이어를 선택합니다.",
    "miscloseDistanceLabel": "폐합 거리",
    "miscloseDistanceHintText": "힌트: 폐합 거리와 해당 단위를 지정합니다.",
    "miscloseRatioLabel": "폐합 비율",
    "miscloseRatioHintText": "힌트: 폐합 비율을 지정합니다.",
    "snappingToleranceLabel": "스내핑 톨러런스",
    "pixelLabel": "픽셀",
    "snappingToleranceHintText": "힌트: 스내핑 톨러런스를 지정합니다.",
    "selectLayerLabel": "레이어 선택"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "잘못된 방위각 필드",
    "chordLengthErrMsg": "잘못된 현 길이",
    "distanceFieldErrMsg": "잘못된 거리",
    "sequenceIdFieldErrMsg": "잘못된 순서 ID",
    "radiusFieldErrMsg": "잘못된 반경",
    "foreignKeyFieldErrMsg": "잘못된 외부 키",
    "arcLengthFieldErrMsg": "잘못된 호 길이",
    "lineTypeFieldErrMsg": "잘못된 라인 유형",
    "parcelNameFieldErrMsg": "잘못된 필지 이름 필드",
    "planNameFieldErrMsg": "잘못된 계획 이름 필드",
    "scaleFieldErrMsg": "잘못된 축척 필드",
    "documentTypeFieldErrMsg": "잘못된 문서 유형 필드",
    "miscloseRatioFieldErrMsg": "잘못된 폐합 비율 필드",
    "statedAreaFieldErrMsg": "잘못된 지정 면적 필드",
    "miscloseDistanceFieldErrMsg": "잘못된 폐합 거리 필드",
    "globalIdFieldErrMsg": "선택한 폴리곤 레이어에 유효한 'esriFieldTypeGlobalID' 필드가 없습니다.",
    "invalidPolylineLayer": "유효한 필지 폴리라인 레이어를 선택하세요.",
    "invalidPolygonLayer": "유효한 필지 폴리곤 레이어를 선택하세요.",
    "invalidMiscloseDistance": "유효한 폐합 거리를 입력하세요.",
    "invalidSnappingTolerance": "유효한 스내핑 톨러런스를 입력하세요.",
    "invalidMiscloseRatio": "유효한 폐합 비율을 입력하세요.",
    "selectDistinctLineTypes": "각 라인 유형에서 고유 값을 선택하세요.",
    "invalidConnectionLineType": "잘못된 연결 라인 값",
    "invalidBoundaryLineType": "잘못된 경계 라인 값",
    "selectDistinctPolylineFields": "각 COGO 값에 대해 고유 필드를 선택하세요.",
    "selectDistinctPolygonFields": "각 필지 폴리곤 속성에 대해 고유 필드를 선택하세요."
  }
});