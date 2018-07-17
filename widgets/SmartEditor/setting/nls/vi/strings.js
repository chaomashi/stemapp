define({
  "layersPage": {
    "allLayers": "Tất cả các Lớp",
    "title": "Chọn một mẫu để tạo các đối tượng",
    "generalSettings": "Thiết lập Tổng quan",
    "layerSettings": "Thiết lập Lớp",
    "presetValueText": "Xác định Giá trị Đặt trước",
    "geocoderSettingsText": "Cài đặt Bộ mã hóa địa lý",
    "editDescription": "Cung cấp văn bản hiển thị cho bảng điều khiển chỉnh sửa",
    "editDescriptionTip": "Văn bản này được hiển thị bên trên trình chọn Mẫu, để trống nếu không có văn bản nào.",
    "promptOnSave": "Nhắc lưu các chỉnh sửa chưa lưu khi đóng biểu mẫu hoặc chuyển sang bản ghi tiếp theo.",
    "promptOnSaveTip": "Hiển thị lời nhắc khi người dùng nhấp vào đóng hoặc điều hướng sang bản ghi có thể chỉnh sửa tiếp theo khi đối tượng hiện tại có chỉnh sửa chưa được lưu.",
    "promptOnDelete": "Yêu cầu xác nhận khi xóa bản ghi.",
    "promptOnDeleteTip": "Hiển thị lời nhắc khi người dùng nhấp vào xóa để xác nhận tác vụ.",
    "removeOnSave": "Xóa đối tượng khỏi lựa chọn khi lưu.",
    "removeOnSaveTip": "Tùy chọn để xóa đối tượng khỏi lựa chọn đã đặt khi bản ghi được lưu. Nếu đó là bản ghi duy nhất được chọn, bảng điều khiển được chuyển trở về trang mẫu.",
    "useFilterEditor": "Sử dụng bộ lọc mẫu đối tượng",
    "useFilterEditorTip": "Tùy chọn sử dụng chức năng chọn Bộ lọc Mẫu cung cấp khả năng xem một lớp mẫu hoặc tìm kiếm mẫu theo tên.",
    "displayShapeSelector": "Hiện các tùy chọn vẽ",
    "displayShapeSelectorTip": "Tùy chọn hiển thị danh sách các tùy chọn vẽ hợp lệ dành cho biểu mẫu được chọn.",
    "displayPresetTop": "Hiển thị danh sách các giá trị được thiết lập trước trên cùng",
    "displayPresetTopTip": "Tùy chọn hiển thị danh sách giá trị được thiết lập trước trên trình chọn biểu mẫu.",
    "listenToGroupFilter": "Áp dụng các giá trị bộ lọc từ tiện ích Bộ lọc Nhóm cho các trường Thiết lập sẵn",
    "listenToGroupFilterTip": "Khi áp dụng một bộ lọc trong tiện ích Bộ lọc Nhóm, bộ lọc sẽ áp dụng giá trị cho một trường phù hợp trong danh sách giá trị đã Thiết lập sẵn.",
    "keepTemplateActive": "Giữ cho biểu mẫu được chọn hoạt động",
    "keepTemplateActiveTip": "Khi trình chọn biểu mẫu được hiển thị, nếu trước đó đã chọn một biểu mẫu, hãy bỏ chọn biểu mẫu đó.",
    "geometryEditDefault": "Bật chỉnh sửa hình học theo mặc định",
    "autoSaveEdits": "Tự động lưu chỉnh sửa",
    "enableAttributeUpdates": "Hiển thị nút cập nhật Hành động Thuộc tính khi chức năng chỉnh sửa hình học đang hiện hoạt",
    "layerSettingsTable": {
      "allowDelete": "Cho phép Xóa",
      "allowDeleteTip": "Tùy chọn để cho phép người dùng xóa đối tượng; tắt nếu lớp không hỗ trợ xóa",
      "edit": "Có thể chỉnh sửa",
      "editTip": "Tùy chọn để đưa lớp vào tiện ích",
      "label": "Lớp",
      "labelTip": "Tên của lớp như được xác định trong bản đồ",
      "update": "Tắt Chỉnh sửa Hình học",
      "updateTip": "Tùy chọn để tắt khả năng di chuyển hình học sau khi đã đặt vào vị trí hoặc di chuyển hình học trên đối tượng hiện có",
      "allowUpdateOnly": "Chỉ Cập nhật",
      "allowUpdateOnlyTip": "Tùy chọn để cho phép chỉ sửa đổi đối tượng hiện có, được chọn theo mặc định và tắt nếu lớp không hỗ trợ tạo đối tượng mới",
      "fieldsTip": "Sửa đổi các trường cần chỉnh sửa và xác định Thuộc tính Thông minh",
      "actionsTip": "Tùy chọn để chỉnh sửa trường hoặc truy cập lớp/bảng liên quan",
      "description": "Mô tả",
      "descriptionTip": "Tùy chọn nhập văn bản để hiển thị trên đầu trang thuộc tính.",
      "relationTip": "Xem các lớp và bảng liên quan"
    },
    "editFieldError": "Các sửa đổi trường và thuộc tính Thông minh không sẵn có với các lớp không thể chỉnh sửa",
    "noConfigedLayersError": "Trình biên tập Thông minh yêu cầu một hoặc nhiều lớp có thể chỉnh sửa."
  },
  "editDescriptionPage": {
    "title": "Xác định văn bản tổng quan của thuộc tính cho <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Cấu hình trường cho <b>${layername}</b>",
    "copyActionTip": "Hành động Thuộc tính",
    "description": "Sử dụng nút chỉnh sửa Hành động để kích hoạt Thuộc tính Thông minh trên một lớp. Thuộc tính Thông minh có thể yêu cầu, ẩn hoặc vô hiệu hóa một trường dựa trên các giá trị trong trường khác. Sử dụng nút sao chép Hành động để kích hoạt và xác định nguồn giá trị của trường bằng giao lộ, địa chỉ, tọa độ và thiết lập trước.",
    "fieldsNotes": "* là trường bắt buộc. Nếu bạn bỏ chọn Hiển thị cho trường này và mẫu chỉnh sửa không điền giá trị của trường đó, bạn sẽ không thể lưu bản ghi mới.",
    "smartAttachmentText": "Cấu hình hành động Tệp đính kèm thông minh",
    "smartAttachmentPopupTitle": "Cấu hình tệp đính kèm thông minh cho <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Hiển thị",
      "displayTip": "Xác định xem liệu trường có hiển thị hay không",
      "edit": "Có thể chỉnh sửa",
      "editTip": "Chọn nếu trường hiển thị trong biểu mẫu thuộc tính",
      "fieldName": "Tên",
      "fieldNameTip": "Tên của trường được xác định trong cơ sở dữ liệu",
      "fieldAlias": "Bí danh",
      "fieldAliasTip": "Tên của trường được xác định trong bản đồ",
      "canPresetValue": "Thiết lập trước",
      "canPresetValueTip": "Tùy chọn hiển thị trường trong danh sách trường đặt trước và cho phép người dùng đặt giá trị trước khi chỉnh sửa",
      "actions": "Các hành động",
      "actionsTip": "Thay đổi thứ tự của các trường hoặc thiết lập Thuộc tính Thông minh"
    },
    "smartAttSupport": "Không hỗ trợ Thuộc tính Thông minh trên các trường cơ sở dữ liệu bắt buộc"
  },
  "actionPage": {
    "title": "Cấu hình Hành động Thuộc tính cho <b>${fieldname}</b>",
    "description": "Các tác vụ luôn được tắt trừ khi bạn chỉ định tiêu chí kích hoạt tác vụ. Các tác vụ được xử lý theo thứ tự và chỉ một tác vụ được kích hoạt mỗi trường. Sử dụng nút Chỉnh sửa Tiêu chí để xác định tiêu chí.",
    "actionsSettingsTable": {
      "rule": "Hành động",
      "ruleTip": "Hành động được thực hiện khi thỏa mãn tiêu chí",
      "expression": "Biểu thức",
      "expressionTip": "Biểu thức kết quả ở định dạng SQL từ tiêu chí được xác định",
      "actions": "Tiêu chí",
      "actionsTip": "Thay đổi thứ tự của quy tắc và xác định tiêu chí về thời điểm kích hoạt tác vụ"
    },
    "copyAction": {
      "description": "Nguồn giá trị của trường được xử lý để nếu được kích hoạt cho đến khi một tiêu chí hợp lệ được kích hoạt hoặc danh sách hoàn chỉnh. Sử dụng nút Chỉnh sửa Tiêu chí để xác định tiêu chí.",
      "intersection": "Giao lộ",
      "coordinates": "Tọa độ",
      "address": "Địa chỉ",
      "preset": "Thiết lập trước",
      "actionText": "Các hành động",
      "criteriaText": "Tiêu chí",
      "enableText": "Đã bật"
    },
    "actions": {
      "hide": "Ẩn",
      "required": "Yêu cầu",
      "disabled": "Vô hiệu hóa"
    }
  },
  "filterPage": {
    "submitHidden": "Gửi dữ liệu thuộc tính cho trường này ngay cả khi bị ẩn?",
    "title": "Cấu hình biểu thức cho quy tắc ${action}",
    "filterBuilder": "Đặt tác vụ trên trường khi bản ghi trùng khớp với ${any_or_all} các biểu thức sau",
    "noFilterTip": "Sử dụng các công cụ bên dưới, xác định câu lệnh về thời điểm tác vụ được kích hoạt."
  },
  "geocoderPage": {
    "setGeocoderURL": "Thiết lập URL Trình mã hóa địa lý",
    "hintMsg": "Lưu ý: Bạn đang thay đổi dịch vụ mã hóa địa lý, hãy chắc chắn cập nhật mọi quá trình lập bản đồ trường mã hóa địa lý bạn đã cấu hình.",
    "invalidUrlTip": "URL ${URL} không hợp lệ hoặc không thể truy cập được."
  },
  "addressPage": {
    "popupTitle": "Địa chỉ",
    "checkboxLabel": "Nhận giá trị từ Bộ mã hóa địa lý",
    "selectFieldTitle": "Thuộc tính:",
    "geocoderHint": "Để thay đổi bộ mã hóa địa lý, truy cập vào nút 'Cài đặt Bộ mã hóa địa lý' trong phần cài đặt chung"
  },
  "coordinatesPage": {
    "popupTitle": "Tọa độ",
    "checkboxLabel": "Nhận tọa độ",
    "coordinatesSelectTitle": "Hệ Tọa độ:",
    "coordinatesAttributeTitle": "Thuộc tính:",
    "mapSpatialReference": "Tham chiếu Không gian Bản đồ",
    "latlong": "Vĩ độ/Kinh độ"
  },
  "presetPage": {
    "popupTitle": "Thiết lập trước",
    "checkboxLabel": "Trường sẽ được đặt trước",
    "presetValueLabel": "Giá trị đặt trước hiện tại là:",
    "changePresetValueHint": "Để thay đổi giá trị đặt trước này, truy cập vào nút “Xác định Giá trị Đặt trước” trong phần cài đặt chung"
  },
  "intersectionPage": {
    "checkboxLabel": "Nhận giá trị từ trường của lớp giao lộ",
    "layerText": "Lớp",
    "fieldText": "Trường",
    "actionsText": "Các hành động",
    "addLayerLinkText": "Thêm lớp"
  },
  "presetAll": {
    "popupTitle": "Xác định giá trị đặt trước mặc định",
    "deleteTitle": "Xóa giá trị đặt trước",
    "hintMsg": "Tên của tất cả các trường đặt trước duy nhất được liệt kê ở đây. Xóa trường đặt trước sẽ vô hiệu hóa trường tương ứng dưới dạng giá trị đặt trước từ tất cả các lớp/bảng."
  }
});