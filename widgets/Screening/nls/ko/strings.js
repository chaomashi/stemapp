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
  "_widgetLabel": "스크리닝",
  "geometryServicesNotFound": "지오메트리 서비스를 사용할 수 없습니다.",
  "unableToDrawBuffer": "버퍼를 그릴 수 없습니다. 다시 시도하세요.",
  "invalidConfiguration": "잘못된 구성입니다.",
  "clearAOIButtonLabel": "시작",
  "noGraphicsShapefile": "업로드한 쉐이프파일에 그래픽이 포함되어 있지 않습니다.",
  "zoomToLocationTooltipText": "위치로 확대",
  "noGraphicsToZoomMessage": "확대할 그래픽을 찾을 수 없습니다.",
  "placenameWidget": {
    "placenameLabel": "위치 검색"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "그리기 모드 선택",
    "toggleSelectability": "선택 여부를 전환하려면 클릭",
    "chooseLayerTitle": "선택 가능한 레이어 선택",
    "selectAllLayersText": "모두 선택",
    "layerSelectionWarningTooltip": "AOI를 생성하려면 레이어를 하나 이상 선택해야 합니다."
  },
  "shapefileWidget": {
    "shapefileLabel": "압축된 쉐이프파일 업로드",
    "uploadShapefileButtonText": "업로드",
    "unableToUploadShapefileMessage": "쉐이프파일을 업로드할 수 없습니다."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "시작 포인트 정의",
    "addButtonTitle": "추가",
    "deleteButtonTitle": "제거",
    "mapTooltipForStartPoint": "시작 포인트를 정의하려면 맵 클릭",
    "mapTooltipForUpdateStartPoint": "시작 포인트를 업데이트하려면 맵 클릭",
    "locateText": "위치 찾기",
    "locateByMapClickText": "초기 좌표 선택",
    "enterBearingAndDistanceLabel": "시작 포인트로부터의 방위각 및 거리 입력",
    "bearingTitle": "방위각",
    "distanceTitle": "거리",
    "planSettingTooltip": "계획 설정",
    "invalidLatLongMessage": "유효한 값을 입력하세요."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "버퍼 거리(선택)",
    "bufferInputLabel": "결과 표시 범위"
  },
  "traverseSettings": {
    "bearingLabel": "방위각",
    "lengthLabel": "길이",
    "addButtonTitle": "추가",
    "deleteButtonTitle": "제거"
  },
  "planSettings": {
    "expandGridTooltipText": "그리드 확장",
    "collapseGridTooltipText": "그리드 축소",
    "directionUnitLabelText": "길찾기 단위",
    "distanceUnitLabelText": "거리 및 길이 단위",
    "planSettingsComingSoonText": "출시 예정"
  },
  "newTraverse": {
    "invalidBearingMessage": "방위각이 잘못되었습니다.",
    "invalidLengthMessage": "길이가 잘못되었습니다.",
    "negativeLengthMessage": "음수 길이"
  },
  "reportsTab": {
    "aoiAreaText": "AOI 면적",
    "downloadButtonTooltip": "다운로드",
    "printButtonTooltip": "인쇄",
    "uploadShapefileForAnalysisText": "분석에 포함할 쉐이프파일 업로드",
    "uploadShapefileForButtonText": "찾아보기",
    "downloadLabelText": "형식 선택:",
    "downloadBtnText": "다운로드",
    "noDetailsAvailableText": "결과를 찾을 수 없음",
    "featureCountText": "개수",
    "featureAreaText": "면적",
    "featureLengthText": "길이",
    "attributeChooserTooltip": "보려는 속성 선택",
    "csv": "CSV",
    "filegdb": "파일 지오데이터베이스",
    "shapefile": "쉐이프파일",
    "noFeaturesFound": "선택한 파일 형식에 대한 결과를 찾을 수 없음",
    "selectReportFieldTitle": "필드 선택",
    "noFieldsSelected": "선택한 필드 없음",
    "intersectingFeatureExceedsMsgOnCompletion": "하나 이상의 레이어에 대해 최대 레코드 수에 도달했습니다.",
    "unableToAnalyzeText": "분석할 수 없습니다. 최대 레코드 수에 도달했습니다.",
    "errorInPrintingReport": "보고서를 인쇄할 수 없습니다. 보고서 설정이 유효한지 확인하세요.",
    "aoiInformationTitle": "AOI(관심 영역) 정보",
    "summaryReportTitle": "요약",
    "notApplicableText": "N/A",
    "downloadReportConfirmTitle": "다운로드 확인",
    "downloadReportConfirmMessage": "다운로드하시겠습니까?",
    "noDataText": "데이터 없음",
    "createReplicaFailedMessage": "다음 레이어에 대한 다운로드 작업 실패: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "다운로드 작업이 실패했습니다.",
    "printLayoutLabelText": "레이아웃",
    "printBtnText": "인쇄",
    "printDialogHint": "참고 사항: 보고서 제목과 의견은 보고서 미리 보기에서 편집할 수 있습니다.",
    "unableToDownloadFileGDBText": "포인트 또는 라인 위치가 포함된 AOI에 대한 파일 지오데이터베이스를 다운로드할 수 없음",
    "unableToDownloadShapefileText": "포인트 또는 라인 위치가 포함된 AOI에 대한 쉐이프파일을 다운로드할 수 없음",
    "analysisUnitLabelText": "결과 표시 단위:",
    "analysisUnitButtonTooltip": "분석 단위 선택",
    "analysisCloseBtnText": "닫기",
    "feetUnit": "피트/제곱피트",
    "milesUnit": "마일/에이커",
    "metersUnit": "미터/제곱미터",
    "kilometersUnit": "킬로미터/제곱킬로미터",
    "hectaresUnit": "킬로미터/헥타르",
    "hectaresAbbr": "헥타르",
    "layerNotVisibleText": "레이어가 꺼져 있거나 축척 가시성 범위를 벗어나 분석할 수 없습니다.",
    "refreshBtnTooltip": "보고서 새로 고침",
    "featureCSVAreaText": "교차 영역",
    "featureCSVLengthText": "교차 길이",
    "errorInFetchingPrintTask": "인쇄 작업 정보를 가져오는 중 오류가 발생했습니다. 다시 시도하세요."
  }
});