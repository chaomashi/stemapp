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
  "_widgetLabel": "Bản thảo lô đất",
  "newTraverseButtonLabel": "Bắt đầu đường đi qua mới",
  "invalidConfigMsg": "Cấu hình không hợp lệ",
  "geometryServiceURLNotFoundMSG": "Không thể nhận URL Dịch vụ hình học",
  "editTraverseButtonLabel": "Chỉnh sửa đường đi qua",
  "mapTooltipForStartNewTraverse": "Vui lòng chọn một điểm trên bản đồ hoặc nhập thông tin bên dưới để bắt đầu",
  "mapTooltipForEditNewTraverse": "Vui lòng chọn một lô đất để chỉnh sửa",
  "mapTooltipForUpdateStartPoint": "Bấm để cập nhật điểm bắt đầu",
  "mapTooltipForScreenDigitization": "Bấm để thêm điểm lô đất",
  "mapTooltipForRotate": "Kéo để xoay",
  "mapTooltipForScale": "Kéo để đo tỷ lệ",
  "backButtonTooltip": "Quay lại",
  "newTraverseTitle": "Đường đi qua mới",
  "editTraverseTitle": "Chỉnh sửa đường đi qua",
  "clearingDataConfirmationMessage": "Những thay đổi sẽ bị loại bỏ, bạn có muốn tiếp tục không?",
  "unableToFetchParcelMessage": "Không thể nạp lô đất.",
  "unableToFetchParcelLinesMessage": "Không thể nạp đường thẳng lô đất.",
  "planSettings": {
    "planSettingsTitle": "Thiết lập",
    "directionOrAngleTypeLabel": "Loại hướng hoặc góc",
    "directionOrAngleUnitsLabel": "Đơn vị hướng hoặc góc",
    "distanceAndLengthUnitsLabel": "Đơn vị khoảng cách và độ dài",
    "areaUnitsLabel": "Đơn vị Diện tích",
    "circularCurveParameters": "Thông số đường cong tròn",
    "northAzimuth": "Góc phương vị Bắc",
    "southAzimuth": "Góc phương vị Nam",
    "quadrantBearing": "Hướng phần tư",
    "radiusAndChordLength": "Bán kính và độ dài dây cung",
    "radiusAndArcLength": "Bán kính và độ dài hình cung",
    "expandGridTooltipText": "Mở rộng lưới",
    "collapseGridTooltipText": "Thu hẹp lưới",
    "zoomToLocationTooltipText": "Phóng to đến vị trí",
    "onScreenDigitizationTooltipText": "Số hóa"
  },
  "traverseSettings": {
    "bearingLabel": "Hướng",
    "lengthLabel": "Độ dài",
    "radiusLabel": "Bán kính",
    "noMiscloseCalculated": "Sai số khép chưa được tính toán",
    "traverseMiscloseBearing": "Hướng sai số khép",
    "traverseAccuracy": "Độ chính xác",
    "accuracyHigh": "Cao",
    "traverseDistance": "Khoảng cách sai số khép",
    "traverseMiscloseRatio": "Tỷ lệ sai số khép",
    "traverseStatedArea": "Khu vực được nêu",
    "traverseCalculatedArea": "Khu vực được tính",
    "addButtonTitle": "Thêm",
    "deleteButtonTitle": "Gỡ bỏ"
  },
  "parcelTools": {
    "rotationToolLabel": "Góc",
    "scaleToolLabel": "Tỷ lệ"
  },
  "newTraverse": {
    "invalidBearingMessage": "Hướng không hợp lệ.",
    "invalidLengthMessage": "Độ dài không hợp lệ.",
    "invalidRadiusMessage": "Bán kính không hợp lệ.",
    "negativeLengthMessage": "Chỉ hợp lệ đối với đường cong",
    "enterValidValuesMessage": "Vui lòng nhập giá trị hợp lệ.",
    "enterValidParcelInfoMessage": "Vui lòng nhập một vài thông tin lô đất hợp lệ để lưu.",
    "unableToDrawLineMessage": "Không thể vẽ đường thẳng.",
    "invalidEndPointMessage": "Điểm cuối không hợp lệ, không thể vẽ đường thẳng."
  },
  "planInfo": {
    "requiredText": "(bắt buộc)",
    "optionalText": "(tùy chọn)",
    "parcelNamePlaceholderText": "Tên của lô đất",
    "parcelDocumentTypeText": "Loại hồ sơ",
    "planNamePlaceholderText": "Tên của kế hoạch",
    "cancelButtonLabel": "Hủy",
    "saveButtonLabel": "Lưu",
    "saveNonClosedParcelConfirmationMessage": "Lô đất được nhập không được đóng, bạn vẫn muốn tiếp tục và lưu chỉ những đường thẳng lô đất?",
    "unableToCreatePolygonParcel": "Không thể tạo vùng lô đất.",
    "unableToSavePolygonParcel": "Không thể lưu vùng lô đất.",
    "unableToSaveParcelLines": "Không thể lưu đường thẳng lô đất.",
    "unableToUpdateParcelLines": "Không thể cập nhật đường thẳng lô đất.",
    "parcelSavedSuccessMessage": "Đã lưu lô đất thành công.",
    "enterValidParcelNameMessage": "Vui lòng nhập tên lô đất hợp lệ.",
    "enterValidPlanNameMessage": "Vui lòng nhập tên kế hoạch hợp lệ.",
    "enterValidDocumentTypeMessage": "Loại hồ sơ không hợp lệ.",
    "enterValidStatedAreaNameMessage": "Vui lòng nhập vùng được nêu hợp lệ."
  },
  "xyInput": {
    "explanation": "Trong tham chiếu không gian tới lớp lô thửa của bạn"
  }
});