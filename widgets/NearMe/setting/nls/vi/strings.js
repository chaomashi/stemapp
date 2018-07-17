/*global define*/
///////////////////////////////////////////////////////////////////////////
// Copyright © 2015 Esri. All Rights Reserved.
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
  "units": {
    "miles": {
      "displayText": "Dặm",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Kilômét",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Bộ",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "Mét",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Thiết lập Nguồn Tìm kiếm",
    "searchSourceSettingTitle": "Thiết lập Nguồn Tìm kiếm",
    "searchSourceSettingTitleHintText": "Thêm và cấu hình dịch vụ mã hóa địa lý hoặc lớp đối tượng làm nguồn tìm kiếm. Các nguồn đặc thù này xác định yếu tố nào có thể tìm kiếm được trong hộp tìm kiếm",
    "addSearchSourceLabel": "Thêm Nguồn Tìm kiếm",
    "featureLayerLabel": "Lớp đối tượng",
    "geocoderLabel": "Trình mã hóa địa lý",
    "nameTitle": "Tên",
    "generalSettingLabel": "Thiết lập Tổng quan",
    "allPlaceholderLabel": "Văn bản gợi ý để tìm kiếm tất cả:",
    "allPlaceholderHintText": "Mẹo: Nhập nội dung cần hiển thị làm văn bản gợi ý khi tìm kiếm tất cả các lớp và trình mã hóa địa lý",
    "generalSettingCheckboxLabel": "Hiển thị cửa sổ pop-up cho vị trí hoặc đối tượng được tìm thấy",
    "countryCode": "Mã Quốc gia hoặc Khu vực",
    "countryCodeEg": "ví dụ ",
    "countryCodeHint": "Để trống giá trị này sẽ tìm kiếm tất cả các quốc gia và khu vực",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Chỉ tìm kiếm trong kích thước bản đồ hiện tại",
    "zoomScale": "Tỷ lệ Thu phóng",
    "locatorUrl": "URL Bộ mã địa lý",
    "locatorName": "Tên Bộ mã địa lý",
    "locatorExample": "Ví dụ",
    "locatorWarning": "Phiên bản dịch vụ mã hóa địa lý này không được hỗ trợ. Tiện ích này hỗ trợ dịch vụ mã hóa địa lý 10.0 trở lên.",
    "locatorTips": "Các gợi ý không khả dụng do dịch vụ mã hóa địa lý không hỗ trợ khả năng gợi ý.",
    "layerSource": "Nguồn Lớp",
    "setLayerSource": "Thiết lập Nguồn Lớp",
    "setGeocoderURL": "Thiết lập URL Trình mã hóa địa lý",
    "searchLayerTips": "Các gợi ý không khả dụng do dịch vụ mã hóa địa lý không hỗ trợ khả năng phân trang.",
    "placeholder": "Văn bản trình giữ chỗ",
    "searchFields": "Trường Tìm kiếm",
    "displayField": "Hiển thị Trường",
    "exactMatch": "Kết quả khớp Chính xác",
    "maxSuggestions": "Đề xuất Tối đa",
    "maxResults": "Kết quả Tối đa",
    "enableLocalSearch": "Bật tính năng tìm kiếm nội bộ",
    "minScale": "Tỷ lệ Tối thiểu",
    "minScaleHint": "Khi tỷ lệ bản đồ lớn hơn tỷ lệ này, tìm kiếm cục bộ sẽ được áp dụng",
    "radius": "Bán kính",
    "radiusHint": "Xác định bán kính của một khu vực xung quanh trung tâm bản đồ hiện tại sẽ làm tăng thứ hạng của các đối tượng mã hóa địa lý, giúp các đối tượng ở gần nhất với vị trí được trả về đầu tiên nhất",
    "meters": "Mét",
    "setSearchFields": "Thiết lập Trường Tìm kiếm",
    "set": "Thiết lập",
    "fieldName": "Tên",
    "invalidUrlTip": "URL ${URL} không hợp lệ hoặc không thể truy cập được."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Thiết lập Tìm kiếm",
    "defaultBufferDistanceLabel": "Đặt khoảng cách vùng đệm mặc định",
    "maxResultCountLabel": "Giới hạn số kết quả",
    "maxResultCountHintLabel": "Mẹo: Thiết lập số lượng kết quả hiển thị tối đa. Giá trị 1 sẽ trả về đối tượng gần nhất",
    "maxBufferDistanceLabel": "Đặt khoảng cách vùng đệm tối đa",
    "bufferDistanceUnitLabel": "Đơn vị khoảng cách đệm",
    "defaultBufferHintLabel": "Mẹo: Đặt giá trị mặc định cho thanh trượt vùng đệm",
    "maxBufferHintLabel": "Mẹo: Đặt giá trị tối đa cho thanh trượt vùng đệm",
    "bufferUnitLabel": "Mẹo: Xác định đơn vị để tạo bộ đệm",
    "selectGraphicLocationSymbol": "Ký hiệu địa chỉ hoặc vị trí",
    "graphicLocationSymbolHintText": "Mẹo: Ký hiệu dành cho địa chỉ được tìm kiếm hoặc vị trí được bấm",
    "addressLocationPolygonHintText": "Gợi ý: ký hiệu cho lớp vùng được tìm kiếm",
    "popupTitleForPolygon": "Chọn vùng cho vị trí địa chỉ đã chọn",
    "popupTitleForPolyline": "Chọn đường thẳng cho vị trí địa chỉ",
    "addressLocationPolylineHintText": "Gợi ý: ký hiệu cho lớp dạng đường được tìm kiếm",
    "fontColorLabel": "Chọn màu phông chữ cho kết quả tìm kiếm",
    "fontColorHintText": "Mẹo: Màu phông chữ của kết quả tìm kiếm",
    "zoomToSelectedFeature": "Phóng tới đối tượng được chọn",
    "zoomToSelectedFeatureHintText": "Mẹo: Phóng tới đối tượng được chọn thay vì vùng đệm",
    "intersectSearchLocation": "Trả về (các) đa giác giao nhau",
    "intersectSearchLocationHintText": "Mẹo: Trả về (các) đa giác chứa vị trí được tìm kiếm chứ không phải các đa giác trong vùng đệm",
    "enableProximitySearch": "Bật tính năng tìm kiếm lân cận",
    "enableProximitySearchHintText": "Gợi ý: Bật tính năng tìm kiếm các vị trí gần với kết quả được chọn",
    "bufferVisibilityLabel": "Đặt khả năng hiển thị vùng đệm",
    "bufferVisibilityHintText": "Mẹo: Vùng đệm sẽ được hiển thị trên bản đồ",
    "bufferColorLabel": "Đặt ký hiệu vùng đệm",
    "bufferColorHintText": "Mẹo: Chọn màu và độ trong suốt của vùng đệm",
    "searchLayerResultLabel": "Chỉ vẽ kết quả của lớp được chọn",
    "searchLayerResultHint": "Mẹo: Chỉ lớp được chọn trong kết quả tìm kiếm sẽ vẽ trên bản đồ",
    "showToolToSelectLabel": "Nút Thiết lập vị trí",
    "showToolToSelectHintText": "Mẹo: Cung cấp nút để thiết lập vị trí trên bản đồ thay vì luôn phải thiết lập vị trí khi nhấp vào bản đồ",
    "geoDesicParamLabel": "Sử dụng vùng đệm trắc địa",
    "geoDesicParamHintText": "Mẹo: Sử dụng vùng đệm trắc địa thay vì vùng đệm Euclidean (phẳng)"
  },
  "layerSelector": {
    "selectLayerLabel": "Chọn (các) lớp tìm kiếm",
    "layerSelectionHint": "Mẹo: Sử dụng nút thiết lập để chọn (nhiều) lớp",
    "addLayerButton": "Thiết lập"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Cài đặt Chỉ đường",
    "routeServiceUrl": "Dịch vụ Định tuyến",
    "buttonSet": "Thiết lập",
    "routeServiceUrlHintText": "Mẹo: Nhấp vào â€˜Đặtâ€™ để duyệt và chọn dịch vụ định tuyến",
    "directionLengthUnit": "Đơn vị độ dài thông tin hướng",
    "unitsForRouteHintText": "Mẹo: Được sử dụng để hiển thị các đơn vị cho tuyến đường",
    "selectRouteSymbol": "Chọn ký hiệu để hiển thị tuyến đường",
    "routeSymbolHintText": "Mẹo: Được sử dụng để hiển thị ký hiệu đường của tuyến đường",
    "routingDisabledMsg": "Để bật chỉ đường, hãy bảo đảm rằng chức năng định tuyến được bật trong mục tại thiết lập ứng dụng."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Thiết lập Ký hiệu",
    "addSymbologyBtnLabel": "Thêm ký hiệu mới",
    "layerNameTitle": "Tên lớp",
    "fieldTitle": "Trường",
    "valuesTitle": "Giá trị",
    "symbolTitle": "Ký hiệu",
    "actionsTitle": "Các hành động",
    "invalidConfigMsg": "Trường giống nhau: ${fieldName} cho lớp : ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Thiết lập Bộ lọc",
    "addTaskTip": "Thêm một hoặc nhiều bộ lọc vào (các) lớp đã chọn và cấu hình tham số cho từng bộ lọc.",
    "enableMapFilter": "Gỡ bỏ bộ lọc lớp được thiết lập sẵn ra khỏi bản đồ.",
    "newFilter": "Bộ lọc mới",
    "filterExpression": "Biểu thức bộ lọc",
    "layerDefaultSymbolTip": "Sử dụng ký hiệu mặc định của lớp",
    "uploadImage": "Tải ảnh lên",
    "selectLayerTip": "Vui lòng chọn một lớp.",
    "setTitleTip": "Vui lòng đặt tiêu đề.",
    "noTasksTip": "Không có bộ lọc nào được cấu hình. Nhấp vào \"${newFilter}\" để thêm một bộ lọc mới.",
    "collapseFiltersTip": "Thu gọn các biểu thức bộ lọc (nếu có) khi tiện ích được mở",
    "groupFiltersTip": "Lọc nhóm theo lớp"
  },
  "networkServiceChooser": {
    "arcgislabel": "Thêm từ ArcGIS Online",
    "serviceURLabel": "Thêm URL Dịch vụ",
    "routeURL": "URL tuyến đường",
    "validateRouteURL": "Xác minh",
    "exampleText": "Ví dụ",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Vui lòng xác định dịch vụ Định tuyến hợp lệ.",
    "rateLimitExceeded": "Đã vượt quá giới hạn tần suất. Vui lòng thử lại sau.",
    "errorInvokingService": "Tên đăng nhập hoặc mật khẩu không chính xác."
  },
  "errorStrings": {
    "bufferErrorString": "Vui lòng nhập giá trị số hợp lệ.",
    "selectLayerErrorString": "Vui lòng chọn (các) lớp để tìm kiếm.",
    "invalidDefaultValue": "Khoảng cách đệm mặc định không được để trống. Vui lòng xác định khoảng cách đệm",
    "invalidMaximumValue": "Khoảng cách đệm tối đa không được để trống. Vui lòng xác định khoảng cách đệm",
    "defaultValueLessThanMax": "Vui lòng xác định khoảng cách đệm mặc định trong giới hạn tối đa",
    "defaultBufferValueGreaterThanOne": "Khoảng cách vùng đệm mặc định không thể dưới 0",
    "maximumBufferValueGreaterThanOne": "Vui lòng xác định khoảng cách đệm tối đa lớn hơn 0",
    "invalidMaximumResultCountValue": "Vui lòng xác định giá trị hợp lệ cho số lượng kết quả tối đa",
    "invalidSearchSources": "Thiết lập nguồn tìm kiếm không hợp lệ"
  },
  "symbolPickerPreviewText": "Xem trước:"
});