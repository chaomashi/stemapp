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
  "configText": "Đặt văn bản cấu hình:",
  "generalSettings": {
    "tabTitle": "Thiết lập tổng quan",
    "measurementUnitLabel": "Đơn vị Đo lường",
    "currencyLabel": "Ký hiệu Đo lường",
    "roundCostLabel": "Làm tròn Chi phí",
    "projectOutputSettings": "Thiết lập Đầu ra Dự án",
    "typeOfProjectAreaLabel": "Loại Khu vực Dự án",
    "bufferDistanceLabel": "Khoảng cách Vùng đệm",
    "roundCostValues": {
      "twoDecimalPoint": "Hai số ở Phần thập phân",
      "nearestWholeNumber": "Số Nguyên Gần nhất",
      "nearestTen": "Bội số Gần nhất của 10",
      "nearestHundred": "Bội số Gần nhất của 100",
      "nearestThousand": "Bội số Gần nhất của 1000",
      "nearestTenThousands": "Bội số Gần nhất của 10000"
    },
    "projectAreaType": {
      "outline": "Viền",
      "buffer": "Vùng đệm"
    },
    "errorMessages": {
      "currency": "Đơn vị tiền tệ không hợp lệ",
      "bufferDistance": "Khoảng cách vùng đệm không hợp lệ",
      "outOfRangebufferDistance": "Giá trị phải lớn hơn 0 và nhỏ hơn hoặc bằng 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Thiết lập dự án",
    "costingGeometrySectionTitle": "Xác định vùng địa lý để dự toán (tùy chọn)",
    "costingGeometrySectionNote": "Lưu ý: Cấu hình lớp này sẽ cho phép người dùng đặt phương trình chi phí cho các mẫu đối tượng dựa trên vùng địa lý.",
    "projectTableSectionTitle": "Khả năng Lưu/Tải thiết lập dự án (tùy chọn)",
    "projectTableSectionNote": "Lưu ý: Cấu hình tất cả các bảng và lớp sẽ cho phép người dùng lưu/tải dự án để dùng sau.",
    "costingGeometryLayerLabel": "Lớp Hình học Dự toán",
    "fieldLabelGeography": "Trường sẽ Gắn nhãn Vùng địa lý",
    "projectAssetsTableLabel": "Bảng Tài sản Dự án",
    "projectMultiplierTableLabel": "Bảng Chi phí Bổ sung theo Bội số Dự án",
    "projectLayerLabel": "Lớp Dự án",
    "configureFieldsLabel": "Cấu hình Trường",
    "fieldDescriptionHeaderTitle": "Mô tả Trường",
    "layerFieldsHeaderTitle": "Trường Lớp",
    "selectLabel": "Chọn",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} đã được chọn",
      "invalidConfiguration": "Vui lòng chọn ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Lớp đa giác có các điều kiện sau sẽ được hiển thị: <br/> <li>\tLớp phải có khả năng â€œTruy vấnâ€ capability</li><li>\tLớp phải có trường GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Các trường chuỗi và số của â€œLớp Hình học Dự toánâ€ đã chọn sẽ được hiển thị trong hộp thả xuống â€œTrường sẽ Gắn nhãn Vùng địa lýâ€.</p>",
    "projectAssetsTableHelp": "<p>Bảng có các điều kiện sau đây sẽ được hiển thị: <br/> <li>Bảng phải có các chức năng chỉnh sửa, tức là â€œTạoâ€, â€œXóaâ€ và â€œCập nhậtâ€</li>    <li>Bảng phải chứa sáu trường có đúng tên và loại dữ liệu như sau:</li><ul><li>\tAssetGUID (trường loại GUID)</li><li>\tCostEquation (trường loại Chuỗi)</li><li>\tScenario (trường loại Chuỗi)</li><li>\tTemplateName (trường loại Chuỗi)</li><li>    GeographyGUID (trường loại GUID)</li><li>\tProjectGUID (trường loại GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Bảng có các điều kiện sau đây sẽ được hiển thị: <br/> <li>Bảng phải có các chức năng chỉnh sửa, tức là â€œTạoâ€, â€œXóaâ€ và â€œCập nhậtâ€</li>    <li>Bảng phải chứa sáu trường có đúng tên và loại dữ liệu như sau:</li><ul><li>\tDescription (trường loại Chuỗi)</li><li>\tType (trường loại Chuỗi)</li><li>\tValue (trường loại Nổi/Kép)</li><li>\tCostindex (trường loại Số nguyên)</li><li>   \tProjectGUID (trường loại GUID))</li></ul> </p>",
    "projectLayerHelp": "<p>Lớp đa giác có các điều kiện sau đây sẽ được hiển thị: <br/> <li>Lớp phải có các chức năng chỉnh sửa, tức là â€œTạoâ€, â€œXóaâ€ và â€œCập nhậtâ€</li>    <li>Lớp phải chứa năm trường có đúng tên và loại dữ liệu như sau:</li><ul><li>ProjectName (trường loại Chuỗi)</li><li>Description (trường loại Chuỗi)</li><li>Totalassetcost (trường loại Nổi/Kép)</li><li>Grossprojectcost (trường loại Nổi/Kép)</li><li>GlobalID (trường loại GlobalID)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Thiết lập lớp",
    "layerNameHeaderTitle": "Tên lớp",
    "layerNameHeaderTooltip": "Danh sách các lớp trong bản đồ",
    "EditableLayerHeaderTitle": "Có thể chỉnh sửa",
    "EditableLayerHeaderTooltip": "Tính cả lớp và mẫu tương ứng trong tiện ích dự toán",
    "SelectableLayerHeaderTitle": "Có thể chọn",
    "SelectableLayerHeaderTooltip": "Có thể sử dụng hình học từ đối tượng để tạo mục chi phí mới",
    "fieldPickerHeaderTitle": "ID Dự án (tùy chọn)",
    "fieldPickerHeaderTooltip": "Trường tùy chọn (thuộc loại chuỗi) để lưu ID Dự án trong",
    "selectLabel": "Chọn",
    "noAssetLayersAvailable": "Không tìm thấy lớp tài sản nào cho bản đồ web đã chọn",
    "disableEditableCheckboxTooltip": "Lớp này không có các chức năng chỉnh sửa",
    "missingCapabilitiesMsg": "Lớp này thiếu những tính năng sau:",
    "missingGlobalIdMsg": "Lớp này không có trường GlobalId",
    "create": "Tạo",
    "update": "Cập nhật",
    "delete": "Xóa"
  },
  "costingInfo": {
    "tabTitle": "Thông tin Dự toán",
    "proposedMainsLabel": "Yếu tố chính được Đề xuất",
    "addCostingTemplateLabel": "Thêm Mẫu Dự toán",
    "manageScenariosTitle": "Quản lý Kịch bản",
    "featureTemplateTitle": "Mẫu Đối tượng",
    "costEquationTitle": "Phương trình Chi phí",
    "geographyTitle": "Địa lý",
    "scenarioTitle": "Kịch bản",
    "actionTitle": "Các hành động",
    "scenarioNameLabel": "Tên Kịch bản",
    "addBtnLabel": "Thêm",
    "srNoLabel": "Không",
    "deleteLabel": "Xóa",
    "duplicateScenarioName": "Tên kịch bản trùng",
    "hintText": "<div>Gợi ý: Sử dụng các từ khóa sau</div><ul><li><b>{TOTALCOUNT}</b>: Sử dụng tổng số lượng tài sản cùng loại trong một vùng địa lý</li> <li><b>{MEASURE}</b>: Sử dụng chiều dài cho tài sản đường thẳng và diện tích cho tài sản đa giác</li><li><b>{TOTALMEASURE}</b>: Sử dụng tổng chiều dài cho tài sản đường thẳng và tổng diện tích cho tài sản đa giác cùng loại trong một vùng địa lý</li></ul>Bạn có thể sử dụng các hàm như:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Vui lòng chỉnh sửa phương trình chi phí theo nhu cầu trong dự án của bạn.",
    "noneValue": "Không có",
    "requiredCostEquation": "Phương trình chi phí không hợp lệ cho ${layerName}: ${templateName}",
    "duplicateTemplateMessage": "Tồn tại mục nhập mẫu trùng cho ${layerName}: ${templateName}",
    "defaultEquationRequired": "Yêu cầu có phương trình mặc định cho ${layerName}: ${templateName}",
    "validCostEquationMessage": "Vui lòng nhập phương trình chi phí hợp lệ",
    "costEquationHelpText": "Vui lòng chỉnh sửa phương trình chi phí theo nhu cầu trong dự án của bạn",
    "scenarioHelpText": "Vui lòng chọn kịch bản theo nhu cầu trong dự án của bạn",
    "copyRowTitle": "Sao chép Hàng",
    "noTemplateAvailable": "Vui lòng thêm ít nhất một mẫu cho ${layerName}",
    "manageScenarioLabel": "Quản lý kịch bản",
    "noLayerMessage": "Vui lòng nhập ít nhất một lớp trong ${tabName}",
    "noEditableLayersAvailable": "Lớp cần được đánh dấu là có thể chỉnh sửa trong tab thiết lập lớp"
  },
  "statisticsSettings": {
    "tabTitle": "Thiết lập số liệu thống kê",
    "addStatisticsLabel": "Thêm số liệu thống kê",
    "fieldNameTitle": "Trường",
    "statisticsTitle": "Nhãn",
    "addNewStatisticsText": "Thêm số liệu thống kê mới",
    "deleteStatisticsText": "Xóa số liệu thống kê",
    "moveStatisticsUpText": "Di chuyển số liệu thống kê lên trên",
    "moveStatisticsDownText": "Di chuyển số liệu thống kê xuống dưới",
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
  }
});