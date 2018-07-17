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
  "_widgetLabel": "Phân tích chi phí bản Beta",
  "unableToFetchInfoErrMessage": "Không thể tìm nạp thông tin chi tiết về lớp được cấu hình/dịch vụ hình học",
  "invalidCostingGeometryLayer": "Không thể lấy \"esriFieldTypeGlobalID\" trong lớp hình học dự toán.",
  "projectLayerNotFound": "Không thể tìm thấy lớp dự án được cấu hình trong bản đồ.",
  "costingGeometryLayerNotFound": "Không thể tìm thấy lớp hình học dự toán được cấu hình trong bản đồ.",
  "projectMultiplierTableNotFound": "Không thể tìm thấy bảng chi phí bổ sung theo bội số dự án được cấu hình trong bản đồ.",
  "projectAssetTableNotFound": "Không thể tìm thấy bảng tài sản dự án được cấu hình trong bản đồ.",
  "createLoadProject": {
    "createProjectPaneTitle": "Tạo Dự án",
    "loadProjectPaneTitle": "Tải dự án",
    "projectNamePlaceHolder": "Tên dự án",
    "projectDescPlaceHolder": "Mô tả dự án",
    "selectProject": "Chọn dự án",
    "viewInMapLabel": "Xem trên bản đồ",
    "loadLabel": "Tải",
    "createLabel": "Tạo",
    "deleteProjectConfirmationMsg": "Bạn có chắc chắn muốn xóa dự án không?",
    "noAssetsToViewOnMap": "Dự án đã chọn không có tài sản nào để xem trên bản đồ.",
    "projectDeletedMsg": "Đã xóa thành công dự án.",
    "errorInCreatingProject": "Có lỗi khi tạo dự án.",
    "errorProjectNotFound": "Không tìm thấy dự án",
    "errorInLoadingProject": "Vui lòng kiểm tra xem dự án đã chọn có hợp lệ không.",
    "errorProjectNotSelected": "Chọn một dự án từ hộp thả xuống",
    "errorDuplicateProjectName": "Tên dự án đã tồn tại."
  },
  "statisticsSettings": {
    "tabTitle": "Thiết lập số liệu thống kê",
    "addStatisticsLabel": "Thêm số liệu thống kê",
    "addNewStatisticsText": "Thêm số liệu thống kê mới",
    "deleteStatisticsText": "Xóa số liệu thống kê",
    "moveStatisticsUpText": "Di chuyển số liệu thống kê lên trên",
    "moveStatisticsDownText": "Di chuyển số liệu thống kê xuống dưới",
    "layerNameTitle": "Lớp",
    "statisticsTypeTitle": "Loại",
    "fieldNameTitle": "Trường",
    "statisticsTitle": "Nhãn",
    "actionLabelTitle": "Các hành động",
    "selectDeselectAllTitle": "Chọn Tất cả"
  },
  "statisticsType": {
    "countLabel": "Số lượng",
    "averageLabel": "Trung bình",
    "maxLabel": "Tối đa",
    "minLabel": "Tối thiểu",
    "summationLabel": "Lấy tổng",
    "areaLabel": "Khu vực",
    "lengthLabel": "Độ dài"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Lớp cần được đánh dấu là có thể chỉnh sửa trong tab thiết lập lớp"
  },
  "workBench": {
    "refresh": "Làm mới",
    "noAssetAddedMsg": "Không có tài sản nào được thêm",
    "units": "đơn vị",
    "assetDetailsTitle": "Chi tiết Mục Tài sản",
    "costEquationTitle": "Phương trình Chi phí",
    "newCostEquationTitle": "Phương trình Mới",
    "defaultCostEquationTitle": "Phương trình Mặc định",
    "geographyTitle": "Địa lý",
    "scenarioTitle": "Kịch bản",
    "costingInfoHintText": "<div>Gợi ý: Sử dụng các từ khóa sau</div><ul><li><b>{TOTALCOUNT}</b>: Sử dụng tổng số lượng tài sản cùng loại trong một vùng địa lý</li> <li><b>{MEASURE}</b>: Sử dụng chiều dài cho tài sản đường thẳng và diện tích cho tài sản đa giác</li><li><b>{TOTALMEASURE}</b>: Sử dụng tổng chiều dài cho tài sản đường thẳng và tổng diện tích cho tài sản đa giác cùng loại trong một vùng địa lý</li></ul> Bạn có thể sử dụng các hàm như:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Vui lòng chỉnh sửa phương trình chi phí theo nhu cầu trong dự án của bạn.",
    "zoomToAsset": "Thu phóng đến Tài sản",
    "deleteAsset": "Xóa Tài sản",
    "closeDialog": "Đóng hộp thoại",
    "objectIdColTitle": "Id Đối tượng",
    "costColTitle": "Chi phí",
    "errorInvalidCostEquation": "Phương trình Chi phí Không hợp lệ.",
    "errorInSavingAssetDetails": "Không thể lưu thông tin chi tiết về tài sản."
  },
  "assetDetails": {
    "inGeography": " trong ${geography} ",
    "withScenario": " với ${scenario}",
    "totalCostTitle": "Tổng Chi phí",
    "additionalCostLabel": "Mô tả",
    "additionalCostValue": "Giá trị",
    "additionalCostNetValue": "Giá trị Ròng"
  },
  "projectOverview": {
    "assetItemsTitle": "Mục Tài sản",
    "assetStatisticsTitle": "Thống kê Tài sản",
    "projectSummaryTitle": "Tóm tắt Dự án",
    "projectName": "Tên Dự án: ${name}",
    "totalCostLabel": "Tổng Chi phí của Dự án (*):",
    "grossCostLabel": "Chi phí Gộp của Dự án (*):",
    "roundingLabel": "* Làm tròn đến \"${selectedRoundingOption}\"",
    "unableToSaveProjectBoundary": "Không thể lưu ranh giới dự án trong lớp dự án.",
    "unableToSaveProjectCost": "Không thể lưu chi phí trong lớp dự án.",
    "roundCostValues": {
      "twoDecimalPoint": "Hai số ở Phần thập phân",
      "nearestWholeNumber": "Số Nguyên Gần nhất",
      "nearestTen": "Bội số Gần nhất của 10",
      "nearestHundred": "Bội số Gần nhất của 100",
      "nearestThousand": "Bội số Gần nhất của 1000",
      "nearestTenThousands": "Bội số Gần nhất của 10000"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Thuộc tính Dự án",
    "projectAttributeTitle": "Chỉnh sửa Thuộc tính Dự án"
  },
  "costEscalation": {
    "costEscalationLabel": "Thêm Chi phí Bổ sung",
    "valueHeader": "Giá trị",
    "addCostEscalationText": "Thêm chi phí bổ sung",
    "deleteCostEscalationText": "Xóa Chi phí bổ sung đã chọn",
    "moveCostEscalationUpText": "Di chuyển chi phí bổ sung đã chọn lên trên",
    "moveCostEscalationDownText": "Di chuyển chi phí bổ sung đã chọn xuống dưới",
    "invalidEntry": "Một hoặc nhiều mục nhập không hợp lệ.",
    "errorInSavingCostEscalation": "Không thể lưu thông tin chi tiết về chi phí bổ sung."
  },
  "scenarioSelection": {
    "popupTitle": "Chọn Kịch bản cho Tài sản",
    "regionLabel": "Địa lý",
    "scenarioLabel": "Kịch bản",
    "noneText": "Không có",
    "copyFeatureMsg": "Bạn có muốn xóa các đối tượng đã chọn không?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Số liệu thống kê Chi tiết",
    "noDetailStatisticAvailable": "Không có số liệu thống kê tài sản nào được thêm"
  }
});