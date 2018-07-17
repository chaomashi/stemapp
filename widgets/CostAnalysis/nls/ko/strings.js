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
  "_widgetLabel": "비용 분석 베타",
  "unableToFetchInfoErrMessage": "지오메트리 서비스/구성된 레이어 세부정보를 가져올 수 없습니다.",
  "invalidCostingGeometryLayer": "비용 산출 지오메트리 레이어의 'esriFieldTypeGlobalID'를 가져올 수 없습니다.",
  "projectLayerNotFound": "맵에서 구성된 프로젝트 레이어를 찾을 수 없습니다.",
  "costingGeometryLayerNotFound": "맵에서 구성된 비용 산출 지오메트리 레이어를 찾을 수 없습니다.",
  "projectMultiplierTableNotFound": "맵에 구성된 프로젝트 승수 추가 비용 테이블을 찾을 수 없습니다.",
  "projectAssetTableNotFound": "맵에 구성된 프로젝트 자산 테이블을 찾을 수 없습니다.",
  "createLoadProject": {
    "createProjectPaneTitle": "프로젝트 생성",
    "loadProjectPaneTitle": "프로젝트 불러오기",
    "projectNamePlaceHolder": "프로젝트 이름",
    "projectDescPlaceHolder": "프로젝트 설명",
    "selectProject": "프로젝트 선택",
    "viewInMapLabel": "맵에서 보기",
    "loadLabel": "불러오기",
    "createLabel": "생성",
    "deleteProjectConfirmationMsg": "프로젝트를 삭제하시겠습니까?",
    "noAssetsToViewOnMap": "선택한 프로젝트에는 맵에 표시할 자산이 없습니다.",
    "projectDeletedMsg": "프로젝트가 삭제되었습니다.",
    "errorInCreatingProject": "프로젝트 생성 중 오류가 발생했습니다.",
    "errorProjectNotFound": "프로젝트가 없습니다.",
    "errorInLoadingProject": "올바른 프로젝트를 선택했는지 확인하세요.",
    "errorProjectNotSelected": "드롭다운에서 프로젝트 선택",
    "errorDuplicateProjectName": "프로젝트 이름이 이미 있습니다."
  },
  "statisticsSettings": {
    "tabTitle": "통계 설정",
    "addStatisticsLabel": "통계 추가",
    "addNewStatisticsText": "새 통계 추가",
    "deleteStatisticsText": "통계 삭제",
    "moveStatisticsUpText": "통계 위로 이동",
    "moveStatisticsDownText": "통계 아래로 이동",
    "layerNameTitle": "레이어(Layer)",
    "statisticsTypeTitle": "유형",
    "fieldNameTitle": "필드(Field)",
    "statisticsTitle": "레이블",
    "actionLabelTitle": "동작",
    "selectDeselectAllTitle": "모두 선택"
  },
  "statisticsType": {
    "countLabel": "개수",
    "averageLabel": "평균 값",
    "maxLabel": "최대값",
    "minLabel": "최소값",
    "summationLabel": "요약",
    "areaLabel": "영역",
    "lengthLabel": "길이"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "레이어 설정 탭에서 레이어가 편집 가능으로 선택되어 있어야 함"
  },
  "workBench": {
    "refresh": "새로 고침",
    "noAssetAddedMsg": "추가된 자산이 없음",
    "units": "단위",
    "assetDetailsTitle": "자산 항목 세부정보",
    "costEquationTitle": "비용 방정식",
    "newCostEquationTitle": "새 방정식",
    "defaultCostEquationTitle": "기본 방정식",
    "geographyTitle": "지리",
    "scenarioTitle": "시나리오",
    "costingInfoHintText": "<div>힌트: 다음 키워드를 사용함</div><ul><li><b>{TOTALCOUNT}</b>: 지리 내 동일 유형 자산의 총 개수를 사용함</li> <li><b>{MEASURE}</b>: 라인 자산에는 길이를 사용하고 폴리곤 자산에는 면적을 사용함</li><li><b>{TOTALMEASURE}</b>: 지리 내 동일 유형의 라인 자산에는 총 길이를 사용하고 폴리곤 자산에는 총 면적을 사용함</li></ul> 사용할 수 있는 함수:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>프로젝트의 필요에 따라 비용 방정식을 편집하세요.",
    "zoomToAsset": "자산 확대",
    "deleteAsset": "자산 삭제",
    "closeDialog": "대화 상자 닫기",
    "objectIdColTitle": "Object ID",
    "costColTitle": "비용",
    "errorInvalidCostEquation": "잘못된 비용 방정식입니다.",
    "errorInSavingAssetDetails": "자산 세부정보를 저장할 수 없습니다."
  },
  "assetDetails": {
    "inGeography": " ${geography} 내 ",
    "withScenario": " ${scenario} 사용",
    "totalCostTitle": "전체 비용",
    "additionalCostLabel": "설명",
    "additionalCostValue": "값",
    "additionalCostNetValue": "순 가격"
  },
  "projectOverview": {
    "assetItemsTitle": "자산 항목",
    "assetStatisticsTitle": "자산 통계",
    "projectSummaryTitle": "프로젝트 요약",
    "projectName": "프로젝트 이름: ${name}",
    "totalCostLabel": "프로젝트 전체 비용(*):",
    "grossCostLabel": "프로젝트 총비용(*):",
    "roundingLabel": "* '${selectedRoundingOption}'(으)로 반올림됨",
    "unableToSaveProjectBoundary": "프로젝트 경계를 프로젝트 레이어에 저장할 수 없음",
    "unableToSaveProjectCost": "비용을 프로젝트 레이어에 저장할 수 없습니다.",
    "roundCostValues": {
      "twoDecimalPoint": "소수점 두 자리",
      "nearestWholeNumber": "최근접 정수",
      "nearestTen": "최근접 십의 자리",
      "nearestHundred": "최근접 백의 자리",
      "nearestThousand": "최근접 천의 자리",
      "nearestTenThousands": "최근접 만의 자리"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "프로젝트 속성",
    "projectAttributeTitle": "프로젝트 속성 편집"
  },
  "costEscalation": {
    "costEscalationLabel": "추가 비용 추가",
    "valueHeader": "값",
    "addCostEscalationText": "추가 비용 추가",
    "deleteCostEscalationText": "선택한 추가 비용 삭제",
    "moveCostEscalationUpText": "선택한 추가 비용 위로 이동",
    "moveCostEscalationDownText": "선택한 추가 비용 아래로 이동",
    "invalidEntry": "한 개 이상의 항목이 잘못되었습니다.",
    "errorInSavingCostEscalation": "추가 비용 세부정보를 저장할 수 없습니다."
  },
  "scenarioSelection": {
    "popupTitle": "자산 시나리오 선택",
    "regionLabel": "지리",
    "scenarioLabel": "시나리오",
    "noneText": "없음",
    "copyFeatureMsg": "선택한 피처를 복사하시겠습니까?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "세부 통계",
    "noDetailStatisticAvailable": "추가된 자산 통계가 없음"
  }
});