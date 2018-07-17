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
    "miles": "Dặm",
    "kilometers": "Kilômét",
    "feet": "Bộ",
    "meters": "Mét"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Thiết lập Tìm kiếm",
    "buttonSet": "Thiết lập",
    "selectLayersLabel": "Chọn lớp",
    "selectLayersHintText": "Mẹo: Được sử dụng để chọn lớp đa giác và lớp điểm liên quan của lớp đa giác đó.",
    "selectPrecinctSymbolLabel": "Chọn ký hiệu để làm nổi bật đa giác",
    "selectGraphicLocationSymbol": "Ký hiệu địa chỉ hoặc vị trí",
    "graphicLocationSymbolHintText": "Mẹo: Ký hiệu dành cho địa chỉ được tìm kiếm hoặc vị trí được bấm",
    "precinctSymbolHintText": "Mẹo: Được sử dụng để hiển thị ký hiệu cho đa giác được chọn",
    "selectColorForPoint": "Chọn màu để đánh dấu điểm",
    "selectColorForPointHintText": "Mẹo: Được sử dụng để hiển thị màu đánh dấu cho điểm được chọn"
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
    "allPlaceholderLabel": "Văn bản giữ chỗ để tìm kiếm tất cả:",
    "allPlaceholderHintText": "Mẹo: Nhập nội dung cần hiển thị làm văn bản giữ chỗ khi tìm kiếm tất cả các lớp và trình mã hóa địa lý",
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
    "invalidUrlTip": "URL ${URL} không hợp lệ hoặc không thể truy cập được.",
    "invalidSearchSources": "Thiết lập nguồn tìm kiếm không hợp lệ"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Chọn lớp đa giác",
    "selectPolygonLayerHintText": "Mẹo: Được sử dụng để chọn lớp đa giác.",
    "selectRelatedPointLayerLabel": "Chọn lớp điểm liên quan đến lớp đa giác",
    "selectRelatedPointLayerHintText": "Mẹo: Được sử dụng để chọn lớp điểm liên quan đến lớp đa giác",
    "polygonLayerNotHavingRelatedLayer": "Vui lòng chọn lớp đa giác có lớp điểm liên quan.",
    "errorInSelectingPolygonLayer": "Vui lòng chọn lớp đa giác có lớp điểm liên quan.",
    "errorInSelectingRelatedLayer": "Vui lòng chọn lớp điểm liên quan đến lớp đa giác."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Cài đặt Chỉ đường",
    "routeServiceUrl": "Dịch vụ định tuyến",
    "buttonSet": "Thiết lập",
    "routeServiceUrlHintText": "Mẹo: Bấm vào ‘Thiết lập’ để duyệt và chọn dịch vụ định tuyến phân tích mạng",
    "directionLengthUnit": "Đơn vị độ dài thông tin hướng",
    "unitsForRouteHintText": "Mẹo: Được sử dụng để hiển thị các đơn vị được báo cáo cho tuyến đường",
    "selectRouteSymbol": "Chọn ký hiệu để hiển thị tuyến đường",
    "routeSymbolHintText": "Mẹo: Được sử dụng để hiển thị ký hiệu đường của tuyến đường",
    "routingDisabledMsg": "Để bật hướng, hãy bảo đảm rằng định tuyến được bật trong mục ArcGIS Online."
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
  "symbolPickerPreviewText": "Xem trước:",
  "showToolToSelectLabel": "Nút Thiết lập vị trí",
  "showToolToSelectHintText": "Mẹo: Cung cấp nút để thiết lập vị trí trên bản đồ thay vì luôn phải thiết lập vị trí khi nhấp vào bản đồ"
});