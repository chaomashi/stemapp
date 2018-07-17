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
  "configText": "구성 텍스트 설정:",
  "generalSettings": {
    "tabTitle": "일반 설정",
    "measurementUnitLabel": "측정 단위",
    "currencyLabel": "측정 심볼",
    "roundCostLabel": "비용 반올림",
    "projectOutputSettings": "프로젝트 결과 설정",
    "typeOfProjectAreaLabel": "프로젝트 영역의 유형",
    "bufferDistanceLabel": "버퍼 거리",
    "roundCostValues": {
      "twoDecimalPoint": "소수점 두 자리",
      "nearestWholeNumber": "최근접 정수",
      "nearestTen": "최근접 십의 자리",
      "nearestHundred": "최근접 백의 자리",
      "nearestThousand": "최근접 천의 자리",
      "nearestTenThousands": "최근접 만의 자리"
    },
    "projectAreaType": {
      "outline": "윤곽선",
      "buffer": "버퍼"
    },
    "errorMessages": {
      "currency": "잘못된 통화 단위",
      "bufferDistance": "잘못된 버퍼 거리",
      "outOfRangebufferDistance": "값은 0보다 크고 100보다 작거나 동일해야 함"
    }
  },
  "projectSettings": {
    "tabTitle": "프로젝트 설정",
    "costingGeometrySectionTitle": "비용 산출을 위한 지리 정의(선택 사항)",
    "costingGeometrySectionNote": "참고: 이 레이어를 구성하면 사용자가 지리를 기반으로 피처 템플릿의 비용 방정식을 설정할 수 있습니다.",
    "projectTableSectionTitle": "프로젝트 설정 저장/불러오기(선택 사항)",
    "projectTableSectionNote": "참고: 모든 테이블과 레이어를 구성하면 사용자가 추후 사용을 위해 프로젝트 저장/불러오기 할 수 있습니다.",
    "costingGeometryLayerLabel": "비용 산출 지오메트리 레이어",
    "fieldLabelGeography": "지리 레이블 지정에 사용할 필드",
    "projectAssetsTableLabel": "프로젝트 자산 테이블",
    "projectMultiplierTableLabel": "프로젝트 승수 추가 비용 테이블",
    "projectLayerLabel": "프로젝트 레이어",
    "configureFieldsLabel": "필드 구성",
    "fieldDescriptionHeaderTitle": "필드 설명",
    "layerFieldsHeaderTitle": "레이어 필드",
    "selectLabel": "선택",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName}은(는) 이미 선택되었음",
      "invalidConfiguration": "${fieldsString}을(를) 선택하세요."
    },
    "costingGeometryHelp": "<p>다음 조건의 폴리곤 레이어가 표시됨: <br/> <li>\t레이어에 â€œ쿼리â€ 기능이 있어야 함</li><li>\t레이어에 GlobalID 필드가 있어야 함</li></p>",
    "fieldToLabelGeographyHelp": "<p>선택한 â€œ비용 산출 지오메트리 레이어â€의 문자열 필드와 숫자 필드가 â€œ지리 레이블 넣기에 사용될 필드â€ 드롭다운에 표시됩니다.</p>",
    "projectAssetsTableHelp": "<p>다음 조건의 테이블이 표시됨: <br/> <li>테이블에 â€œ생성â€, â€œ삭제â€, â€œ업데이트â€라는 편집 기능이 있어야 함</li>    <li>테이블에 다음과 똑같은 이름과 데이터 유형의 6개 필드가 있어야 함:</li><ul><li>\tAssetGUID(GUID 유형 필드)</li><li>\tCostEquation(문자열 유형 필드)</li><li>\tScenario(문자열 유형 필드)</li><li>\tTemplateName(문자열 유형 필드)</li><li>    GeographyGUID(GUID 유형 필드)</li><li>\tProjectGUID(GUID 유형 필드)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>다음 조건의 테이블이 표시됨: <br/> <li>테이블에 â€œ생성â€, â€œ삭제â€, â€œ업데이트â€라는 편집 기능이 있어야 함</li>    <li>테이블에 다음과 똑같은 이름과 데이터 유형의 5개 필드가 있어야 함:</li><ul><li>\tDescription(문자열 유형 필드)</li><li>\tType(문자열 유형 필드)</li><li>\tValue(Float/Double 유형 필드)</li><li>\tCostindex(정수 유형 필드)</li><li>   \tProjectGUID(GUID 유형 필드)</li></ul> </p>",
    "projectLayerHelp": "<p>다음 조건의 폴리곤 레이어가 표시됨: <br/> <li>레이어에 â€œ생성â€, â€œ삭제â€, â€œ업데이트â€라는 편집 기능이 있어야 함</li>    <li>레이어에 다음과 똑같은 이름과 데이터 유형의 5개 필드가 있어야 함:</li><ul><li>ProjectName(문자열 유형 필드)</li><li>Description(문자열 유형 필드)</li><li>Totalassetcost(Float/Double 유형 필드)</li><li>Grossprojectcost(Float/Double 유형 필드)</li><li>GlobalID(GlobalID 유형 필드)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "레이어 설정",
    "layerNameHeaderTitle": "레이어 이름",
    "layerNameHeaderTooltip": "맵의 레이어 목록",
    "EditableLayerHeaderTitle": "편집 가능",
    "EditableLayerHeaderTooltip": "비용 산출 위젯에 레이어 및 해당 템플릿 포함",
    "SelectableLayerHeaderTitle": "선택 가능",
    "SelectableLayerHeaderTooltip": "피처의 지오메트리를 사용해 새 비용 항목을 생성할 수 있음",
    "fieldPickerHeaderTitle": "프로젝트 ID(선택 사항)",
    "fieldPickerHeaderTooltip": "프로젝트 ID가 저장될 선택적 필드(문자열 유형)",
    "selectLabel": "선택",
    "noAssetLayersAvailable": "선택한 웹 맵에 자산 레이어가 없음",
    "disableEditableCheckboxTooltip": "이 레이어에는 편집 기능이 없음",
    "missingCapabilitiesMsg": "이 레이어에 다음 기능이 누락됨:",
    "missingGlobalIdMsg": "이 레이어에는 GlobalId 필드가 없음",
    "create": "생성",
    "update": "업데이트(Update)",
    "delete": "삭제"
  },
  "costingInfo": {
    "tabTitle": "비용 산출 정보",
    "proposedMainsLabel": "제안된 본관",
    "addCostingTemplateLabel": "비용 산출 템플릿 추가",
    "manageScenariosTitle": "시나리오 관리",
    "featureTemplateTitle": "피처 템플릿",
    "costEquationTitle": "비용 방정식",
    "geographyTitle": "지리",
    "scenarioTitle": "시나리오",
    "actionTitle": "동작",
    "scenarioNameLabel": "시나리오 이름",
    "addBtnLabel": "추가",
    "srNoLabel": "아니요.",
    "deleteLabel": "삭제",
    "duplicateScenarioName": "중복된 시나리오 이름",
    "hintText": "<div>힌트: 다음 키워드를 사용함</div><ul><li><b>{TOTALCOUNT}</b>: 지리 내 동일 유형 자산의 총 개수를 사용함</li> <li><b>{MEASURE}</b>: 라인 자산에는 길이를 사용하고 폴리곤 자산에는 면적을 사용함</li><li><b>{TOTALMEASURE}</b>: 지리 내 동일 유형의 라인 자산에는 총 길이를 사용하고 폴리곤 자산에는 총 면적을 사용함</li></ul>사용할 수 있는 함수:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>프로젝트의 필요에 따라 비용 방정식을 편집하세요.",
    "noneValue": "없음",
    "requiredCostEquation": "${layerName} : ${templateName}의 잘못된 비용 방정식",
    "duplicateTemplateMessage": "${layerName} : ${templateName}의 중복 템플릿 항목이 존재합니다.",
    "defaultEquationRequired": "${layerName} : ${templateName}의 기본 방정식이 필요합니다.",
    "validCostEquationMessage": "유효한 비용 방정식을 입력하세요.",
    "costEquationHelpText": "프로젝트의 필요에 따라 비용 방정식을 편집하세요.",
    "scenarioHelpText": "프로젝트의 필요에 따라 시나리오를 선택하세요.",
    "copyRowTitle": "행 복사",
    "noTemplateAvailable": "${layerName}에 템플릿을 하나 이상 추가하세요.",
    "manageScenarioLabel": "시나리오 관리",
    "noLayerMessage": "${tabName}에 하나 이상의 레이어를 입력하세요.",
    "noEditableLayersAvailable": "레이어 설정 탭에서 레이어가 편집 가능으로 선택되어 있어야 함"
  },
  "statisticsSettings": {
    "tabTitle": "통계 설정",
    "addStatisticsLabel": "통계 추가",
    "fieldNameTitle": "필드(Field)",
    "statisticsTitle": "레이블",
    "addNewStatisticsText": "새 통계 추가",
    "deleteStatisticsText": "통계 삭제",
    "moveStatisticsUpText": "통계 위로 이동",
    "moveStatisticsDownText": "통계 아래로 이동",
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
  }
});