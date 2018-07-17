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
  "_widgetLabel": "Đang kiểm tra",
  "geometryServicesNotFound": "Dịch vụ hình học không khả dụng.",
  "unableToDrawBuffer": "Không thể vẽ vùng đệm. Vui lòng thử lại.",
  "invalidConfiguration": "Cấu hình không hợp lệ.",
  "clearAOIButtonLabel": "Bắt đầu",
  "noGraphicsShapefile": "Shapefile được tải lên không có hình đồ họa.",
  "zoomToLocationTooltipText": "Phóng to đến vị trí",
  "noGraphicsToZoomMessage": "Không tìm thấy hình đồ họa để phóng lớn",
  "placenameWidget": {
    "placenameLabel": "Tìm kiếm một vị trí"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Chọn chế độ vẽ",
    "toggleSelectability": "Nhấp để chuyển đổi khả năng chọn",
    "chooseLayerTitle": "Chọn lớp có thể chọn",
    "selectAllLayersText": "Chọn Tất cả",
    "layerSelectionWarningTooltip": "Nên chọn ít nhất một lớp để tạo AOI"
  },
  "shapefileWidget": {
    "shapefileLabel": "Tải lên shapefile được nén",
    "uploadShapefileButtonText": "Tải lên",
    "unableToUploadShapefileMessage": "Không thể tải lên Shapefile."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Xác định điểm bắt đầu",
    "addButtonTitle": "Thêm",
    "deleteButtonTitle": "Gỡ bỏ",
    "mapTooltipForStartPoint": "Nhấp vào bản đồ để xác định điểm bắt đầu",
    "mapTooltipForUpdateStartPoint": "Nhấp vào bản đồ để cập nhật điểm bắt đầu",
    "locateText": "Định vị",
    "locateByMapClickText": "Chọn tọa độ ban đầu",
    "enterBearingAndDistanceLabel": "Chọn hướng và khoảng cách từ điểm bắt đầu",
    "bearingTitle": "Hướng",
    "distanceTitle": "Khoảng cách",
    "planSettingTooltip": "Thiết lập kế hoạch",
    "invalidLatLongMessage": "Vui lòng nhập giá trị hợp lệ."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Khoảng cách vùng đệm (tùy chọn)",
    "bufferInputLabel": "Hiển thị kết quả trong"
  },
  "traverseSettings": {
    "bearingLabel": "Hướng",
    "lengthLabel": "Độ dài",
    "addButtonTitle": "Thêm",
    "deleteButtonTitle": "Gỡ bỏ"
  },
  "planSettings": {
    "expandGridTooltipText": "Mở rộng lưới",
    "collapseGridTooltipText": "Thu hẹp lưới",
    "directionUnitLabelText": "Đơn vị hướng",
    "distanceUnitLabelText": "Đơn vị khoảng cách và độ dài",
    "planSettingsComingSoonText": "Sắp ra mắt"
  },
  "newTraverse": {
    "invalidBearingMessage": "Hướng không hợp lệ.",
    "invalidLengthMessage": "Độ dài không hợp lệ.",
    "negativeLengthMessage": "Độ dài âm"
  },
  "reportsTab": {
    "aoiAreaText": "Vùng AOI",
    "downloadButtonTooltip": "Tải xuống",
    "printButtonTooltip": "In",
    "uploadShapefileForAnalysisText": "Tải lên Shapefile để bao gồm trong phân tích",
    "uploadShapefileForButtonText": "Duyệt",
    "downloadLabelText": "Chọn định dạng:",
    "downloadBtnText": "Tải xuống",
    "noDetailsAvailableText": "Không tìm thấy kết quả",
    "featureCountText": "Số lượng",
    "featureAreaText": "Khu vực",
    "featureLengthText": "Độ dài",
    "attributeChooserTooltip": "Chọn các thuộc tính để hiển thị",
    "csv": "CSV",
    "filegdb": "File Geodatabase",
    "shapefile": "Shapefile",
    "noFeaturesFound": "Không tìm thấy kết quả cho định dạng tệp tin đã chọn",
    "selectReportFieldTitle": "Chọn trường",
    "noFieldsSelected": "Không có trường nào được chọn",
    "intersectingFeatureExceedsMsgOnCompletion": "Số đếm bản ghi tối đa đã đạt đến cho một hoặc nhiều lớp.",
    "unableToAnalyzeText": "Không thể phân tích, số đếm tối đa bản ghi đã đạt đến.",
    "errorInPrintingReport": "Không thể in báo cáo. Vui lòng kiểm tra cài đặt báo cáo có hợp lệ không.",
    "aoiInformationTitle": "Thông tin Vùng quan tâm (AOI)",
    "summaryReportTitle": "Thông tin tóm tắt",
    "notApplicableText": "Không có",
    "downloadReportConfirmTitle": "Xác nhận tải về",
    "downloadReportConfirmMessage": "Bạn có chắc là muốn tải về không?",
    "noDataText": "Không có Dữ liệu",
    "createReplicaFailedMessage": "Hoạt động tải về thất bại cho (các) lớp sau đây: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Hoạt động tải xuống thất bại.",
    "printLayoutLabelText": "Bố cục",
    "printBtnText": "In",
    "printDialogHint": "Lưu ý: Tiêu đề báo cáo và ý kiến có thể được chỉnh sửa trong trường xem trước báo cáo.",
    "unableToDownloadFileGDBText": "Không thể tải về Cơ sở dữ liệu địa lý tệp tin cho AOI chứa vị trí điểm hoặc đường thẳng",
    "unableToDownloadShapefileText": "Không thể tải về Shapefile cho AOI chứa vị trí điểm hoặc đường thẳng",
    "analysisUnitLabelText": "Hiển thị kết quả trong:",
    "analysisUnitButtonTooltip": "Chọn đơn vị cho phân tích",
    "analysisCloseBtnText": "Đóng",
    "feetUnit": "Foot / Foot Vuông",
    "milesUnit": "Dặm / Mẫu Anh",
    "metersUnit": "Mét / Mét Vuông",
    "kilometersUnit": "Kilômét / Kilômét Vuông",
    "hectaresUnit": "Kilômét / Hecta",
    "hectaresAbbr": "hecta",
    "layerNotVisibleText": "Không thể phân tích, lớp bị tắt hoặc nằm ngoài phạm vi hiển thị theo tỷ lệ.",
    "refreshBtnTooltip": "Làm mới báo cáo",
    "featureCSVAreaText": "Khu vực giao nhau",
    "featureCSVLengthText": "Chiều dài giao nhau",
    "errorInFetchingPrintTask": "Lỗi xảy ra khi tìm nạp thông tin tác vụ in. Vui lòng thử lại."
  }
});