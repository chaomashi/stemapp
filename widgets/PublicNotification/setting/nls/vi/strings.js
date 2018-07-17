/*
 | Copyright 2017 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define({
  "searchSourceSetting": {
    "title": "Thiết lập Vùng đệm và Tìm kiếm",
    "mainHint": "Bạn có thể kích hoạt chức năng tìm kiếm văn bản cho địa chỉ và đối tượng, số hóa hình học và ghi đệm."
  },
  "addressSourceSetting": {
    "title": "Lớp Địa chỉ",
    "mainHint": "Bạn có thể chỉ định lớp nhãn người nhận nào sẽ có sẵn."
  },
  "notificationSetting": {
    "title": "Tùy chọn Thông báo",
    "mainHint": "Bạn có thể chỉ định loại thông báo nào sẽ có sẵn."
  },
  "groupingLabels": {
    "addressSources": "Lớp sẽ dùng để chọn lớp người nhận",
    "averyStickersDetails": "Nhãn dán Avery(r)",
    "csvDetails": "Tệp các giá trị được phân tách bằng dấu phẩy (CSV)",
    "drawingTools": "Công cụ vẽ dùng để chỉ định khu vực",
    "featureLayerDetails": "Lớp đối tượng",
    "geocoderDetails": "Trình mã hóa địa lý",
    "labelFormats": "Định dạng nhãn có sẵn",
    "printingOptions": "Tùy chọn cho trang nhãn được in",
    "searchSources": "Nguồn tìm kiếm",
    "stickerFormatDetails": "Tham số trang nhãn"
  },
  "hints": {
    "alignmentAids": "Dấu được thêm vào trang nhãn để giúp bạn căn chỉnh trang với máy in",
    "csvNameList": "Danh sách tên trường phân biệt chữ hoa/thường, được phân tách bằng dấu phẩy",
    "horizontalGap": "Khoảng cách giữa hai nhãn trong một hàng",
    "insetToLabel": "Khoảng cách giữa mép nhãn và phần đầu văn bản",
    "labelFormatDescription": "Cách thể hiện kiểu nhãn trong danh sách tùy chọn định dạng tiện ích",
    "labelFormatDescriptionHint": "Chú giải công cụ để bổ sung cho phần mô tả trong danh sách tùy chọn định dạng",
    "labelHeight": "Chiều cao của từng nhãn trên trang",
    "labelWidth": "Chiều rộng của từng nhãn trên trang",
    "localSearchRadius": "Xác định bán kính của một khu vực xung quanh tâm bản đồ hiện tại được dùng để tăng thứ hạng của các đối tượng mã hóa địa lý, giúp các đối tượng ở gần nhất với vị trí được trả về đầu tiên",
    "rasterResolution": "100 pixel/inch gần khớp với độ phân giải màn hình. Độ phân giải càng cao thì bộ nhớ trình duyệt cần dùng càng cao. Các trình duyệt có sự khác biệt về khả năng xử lý mượt mà nhu cầu bộ nhớ lớn.",
    "selectionListOfOptionsToDisplay": "Các mục đã chọn sẽ được hiển thị dưới dạng tùy chọn trong tiện ích, thay đổi thứ tự tùy ý",
    "verticalGap": "Khoảng cách giữa hai nhãn trong một cột"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Khoảng cách vùng đệm mặc định",
    "bufferUnits": "Đơn vị vùng đệm sẽ cung cấp trong tiện ích",
    "countryRegionCodes": "Mã quốc gia hoặc khu vực",
    "description": "Mô tả",
    "descriptionHint": "Gợi ý mô tả",
    "displayField": "Hiển thị trường",
    "drawingToolsFreehandPolygon": "đa giác vẽ tay",
    "drawingToolsLine": "đường",
    "drawingToolsPoint": "điểm",
    "drawingToolsPolygon": "đa giác",
    "drawingToolsPolyline": "đa đường",
    "enableLocalSearch": "Bật tính năng tìm kiếm nội bộ",
    "exactMatch": "Kết quả khớp chính xác",
    "fontSizeAlignmentNote": "Cỡ chữ cho ghi chú về lề in",
    "gridDarkness": "Độ đậm của lưới",
    "gridlineLeftInset": "Phần lồng ô lưới bên trái",
    "gridlineMajorTickMarksGap": "Dấu kiểm lớn đánh dấu mọi",
    "gridlineMinorTickMarksGap": "Dấu kiểm nhỏ đánh dấu mọi",
    "gridlineRightInset": "Phần lồng ô lưới bên phải",
    "labelBorderDarkness": "Độ đậm của viền nhãn",
    "labelBottomEdge": "Mép dưới của nhãn trên trang",
    "labelFontSize": "Cỡ chữ",
    "labelHeight": "Chiều cao nhãn",
    "labelHorizontalGap": "Khe hở ngang",
    "labelInitialInset": "Phần lồng vào văn bản nhãn",
    "labelLeftEdge": "Mép trái của nhãn trên trang",
    "labelMaxLineCount": "Số dòng tối đa trên nhãn",
    "labelPageHeight": "Chiều cao trang",
    "labelPageWidth": "Chiều rộng trang",
    "labelRightEdge": "Mép phải của nhãn trên trang",
    "labelsInAColumn": "Số nhãn trong một cột",
    "labelsInARow": "Số nhãn trong một hàng",
    "labelTopEdge": "Mép trên của nhãn trên trang",
    "labelVerticalGap": "Khe hở dọc",
    "labelWidth": "Chiều rộng nhãn",
    "limitSearchToMapExtent": "Chỉ tìm kiếm trong kích thước bản đồ hiện tại",
    "maximumResults": "Kết quả tối đa",
    "maximumSuggestions": "Số đề xuất tối đa",
    "minimumScale": "Tỷ lệ tối thiểu",
    "name": "Tên",
    "percentBlack": "% đen",
    "pixels": "pixel",
    "pixelsPerInch": "pixel/inch",
    "placeholderText": "Văn bản trình giữ chỗ",
    "placeholderTextForAllSources": "Văn bản trình giữ chỗ để tìm kiếm tất cả các nguồn",
    "radius": "Bán kính",
    "rasterResolution": "Độ phân giải Raster",
    "searchFields": "Tìm kiếm trường",
    "showAlignmentAids": "Hiển thị hỗ trợ căn chỉnh trên trang",
    "showGridTickMarks": "Hiển thị dấu kiểm lưới",
    "showLabelOutlines": "Hiển thị đường nét nhãn",
    "showPopupForFoundItem": "Hiển thị cửa sổ pop-up cho vị trí hoặc đối tượng được tìm thấy",
    "tool": "Công cụ",
    "units": "Đơn vị",
    "url": "URL",
    "urlToGeometryService": "URL đến dịch vụ hình học",
    "useRelatedRecords": "Sử dụng bản ghi liên quan tương ứng",
    "useSecondarySearchLayer": "Sử dụng lớp lựa chọn phụ",
    "useSelectionDrawTools": "Sử dụng lựa chọn công cụ vẽ",
    "useVectorFonts": "Sử dụng phông chữ vector (chỉ phông chữ Latin)",
    "zoomScale": "Tỷ lệ thu phóng"
  },
  "buttons": {
    "addAddressSource": "Thêm lớp chứa nhãn địa chỉ trong cửa sổ pop-up",
    "addLabelFormat": "Thêm định dạng nhãn",
    "addSearchSource": "Thêm nguồn tìm kiếm",
    "set": "Thiết lập"
  },
  "placeholders": {
    "averyExample": "ví dụ: nhãn Avery(r) ${averyPartNumber}",
    "countryRegionCodes": "ví dụ: USA,CHN",
    "descriptionCSV": "Các giá trị được phân tách bằng dấu phẩy",
    "descriptionPDF": "Nhãn PDF ${heightLabelIn} x ${widthLabelIn} inch, ${labelsPerPage} mỗi trang"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Lấy lớp đối tượng từ bản đồ web",
    "openCountryCodes": "Nhấp để lấy thêm thông tin về mã",
    "openFieldSelector": "Nhấp để mở công cụ lựa chọn trường",
    "setAndValidateURL": "Đặt và xác nhận URL"
  },
  "problems": {
    "noAddresseeLayers": "Vui lòng xác định ít nhất một lớp người nhận",
    "noBufferUnitsForDrawingTools": "Vui lòng cấu hình ít nhất một đơn vị đệm cho công cụ vẽ",
    "noBufferUnitsForSearchSource": "Vui lòng cấu hình ít nhất một đơn vị đệm cho nguồn tìm kiếm \"${sourceName}”",
    "noGeometryServiceURL": "Vui lòng cấu hình URL cho dịch vụ hình học",
    "noNotificationLabelFormats": "Vui lòng xác định ít nhất một định dạng nhãn thông báo",
    "noSearchSourceFields": "Vui lòng cấu hình một hoặc nhiều trường tìm kiếm cho nguồn tìm kiếm \"${sourceName}”",
    "noSearchSourceURL": "Vui lòng cấu hình URL cho nguồn tìm kiếm \"${sourceName}”"
  }
});