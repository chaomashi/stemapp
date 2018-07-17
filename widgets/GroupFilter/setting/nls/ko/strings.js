define({
  "configText": "아래의 필터 그룹 정의",
  "labels": {
    "groupName": "필터 설정 이름:",
    "groupNameTip": "사용자가 선택할 필터의 이름입니다.",
    "groupDesc": "설명:",
    "groupDescTip": "필터 설정의 설명입니다.",
    "groupOperator": "프리셋 연산자:",
    "groupOperatorTip": "필터의 연산자를 미리 정의하는 옵션입니다. 프리셋 연산자가 선택되지 않으면 필터가 동일한 연산자를 사용하게 됩니다.",
    "groupDefault": "프리셋 값:",
    "groupDefaultTip": "기존 레이어에서 값을 선택하는 옵션입니다.",
    "sameLayerAppend": "레이어가 두 번 이상 나열된 경우:",
    "sameLayerConjunc": "다음을 사용하여 추가:",
    "caseSearch": "대소문자 구분 검색 수행: "
  },
  "buttons": {
    "addNewGroup": "새 그룹 추가",
    "addNewGroupTip": "새 필터 설정을 추가합니다.",
    "addLayer": "레이어 추가",
    "addLayerTip": "레이어를 필터 설정에 추가합니다."
  },
  "inputs": {
    "groupName": "그룹에 이름 지정",
    "groupDesc": "그룹 설명",
    "groupDefault": "사전 정의된 값 입력",
    "sameLayerAny": "임의 일치 식",
    "sameLayerAll": "모두 일치 식",
    "simpleMode": "간단한 뷰에서 시작",
    "simpleModeTip": "구성된 위젯 인터페이스를 단순화하는 옵션입니다. 옵션을 선택한 경우 연산자 드롭다운 목록과 기준 추가 버튼이 인터페이스에서 제거됩니다.",
    "webmapAppendModeAny": "기존 맵 필터에 임의 식 추가",
    "webmapAppendModeAll": "기존 맵 필터에 모든 식 추가",
    "webmapAppendModeTip": "기존 웹 맵 필터에 필터 집합을 추가하는 옵션입니다.",
    "persistOnClose": "위젯이 닫힌 후 유지",
    "optionsMode": "위젯 옵션 숨기기",
    "optionsModeTip": "추가 위젯 설정을 표시하는 옵션입니다. 옵션을 선택한 경우 정의된 필터를 저장 및 불러오고 위젯이 닫힌 후에 필터를 유지하는 기능이 인터페이스에서 제거됩니다.",
    "optionOR": "OR",
    "optionAND": "AND",
    "optionEQUAL": "EQUALS",
    "optionNOTEQUAL": "NOT EQUAL",
    "optionGREATERTHAN": "GREATER THAN",
    "optionGREATERTHANEQUAL": "GREATER THAN OR EQUAL",
    "optionLESSTHAN": "LESS THAN",
    "optionLESSTHANEQUAL": "LESS THAN OR EQUAL",
    "optionSTART": "BEGINS WITH",
    "optionEND": "ENDS WITH",
    "optionLIKE": "CONTAINS",
    "optionNOTLIKE": "DOES NOT CONTAIN",
    "optionONORBEFORE": "다음 시간 또는 그 이전",
    "optionONORAFTER": "다음 시간 또는 그 이후",
    "optionNONE": "NONE"
  },
  "tables": {
    "layer": "레이어",
    "layerTip": "맵에 정의된 레이어 이름입니다.",
    "field": "필드",
    "fieldTip": "레이어가 필터링될 필드입니다.",
    "value": "값 사용",
    "valueTip": "레이어에서 드롭다운 목록 값을 사용하는 옵션입니다. 레이어를 이 매개변수에 사용하지 않는 경우 기본 텍스트 상자가 사용자에게 표시됩니다.",
    "zoom": "확대",
    "zoomTip": "필터가 적용된 후에 피처의 범위를 확대하는 옵션입니다. 하나의 레이어만 확대하는 데 선택할 수 있습니다.",
    "action": "삭제",
    "actionTip": "필터 설정에서 레이어를 제거합니다."
  },
  "popup": {
    "label": "값 선택"
  },
  "errors": {
    "noGroups": "최소 하나 이상의 그룹이 필요합니다.",
    "noGroupName": "하나 이상의 그룹 이름이 없습니다.",
    "noDuplicates": "하나 이상의 그룹 이름이 중복되었습니다.",
    "noRows": "테이블에 최소 하나의 행이 필요합니다.",
    "noLayers": "맵에 레이어가 없습니다."
  },
  "picker": {
    "description": "이 그룹에 대한 프리셋 값을 찾으려면 이 양식을 사용합니다.",
    "layer": "레이어 선택",
    "layerTip": "웹 맵에 정의된 레이어 이름입니다.",
    "field": "필드 선택",
    "fieldTip": "프리셋 값이 설정될 필드입니다.",
    "value": "값 선택",
    "valueTip": "위젯의 기본값이 될 값입니다."
  }
});