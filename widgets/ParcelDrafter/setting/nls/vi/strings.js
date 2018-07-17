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
  "setBtnLabel": "Thiết lập",
  "selectLabel": "Chọn",
  "selectLayerLabel": "Chọn lớp lô đất",
  "selectLayerHintText": "Gợi ý: Sử dụng nút thiết lập để chọn vùng lô đất và lớp đường thẳng có liên quan",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "Lớp vùng được chọn không có lớp liên quan hợp lệ."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Chọn lớp đường thẳng liên quan",
    "layerSettingTabLabel": "Lớp lô đất",
    "advancedSettingTabLabel": "Thiết lập nâng cao",
    "selectLayerHintText": "Gợi ý: Sử dụng để lưu các giá trị COGO trong lớp đường thẳng lô đất",
    "selectFieldLegendLabel": "Gợi ý: các trường để lưu các giá trị COGO trong lớp đường thẳng lô đất",
    "bearingFieldLabel": "Hướng",
    "chordLengthFieldLabel": "Độ dài dây cung",
    "distanceFieldLabel": "Khoảng cách",
    "sequenceIdFieldLabel": "ID chuỗi",
    "radiusFieldLabel": "Bán kính",
    "foreignKeyFieldLabel": "Khóa ngoại lai",
    "arcLengthFieldLabel": "Độ dài hình cung",
    "lineTypeFieldLabel": "Loại Đường",
    "parcelPointSymbolLabel": "Ký hiệu điểm lô đất",
    "parcelPointSymbolHintText": "Gợi ý: Được sử dụng để hiển thị ký hiệu điểm cho điểm đầu của đường thẳng.",
    "symbolPickerPreviewText": "Xem trước",
    "selectLineLayerLabel": "Chọn lớp đường thẳng"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Chọn lớp đa giác",
    "selectPolygonLayerHintText": "Gợi ý: Sử dụng lớp vùng lô đất chọn lựa",
    "selectFieldLegendLabel": "Chọn các trường để lưu các thuộc tính của vùng lô đất",
    "parcelNameLabel": "Tên của lô đất",
    "rotationLabel": "Xoay",
    "planNameLabel": "Tên của kế hoạch",
    "scalingLabel": "Chỉnh sửa tỷ lệ",
    "documentTypeLabel": "Loại hồ sơ",
    "miscloseRatioLabel": "Tỷ lệ sai số khép",
    "statedAreaLabel": "Khu vực được nêu",
    "miscloseDistanceLabel": "Khoảng cách sai số khép",
    "selectPolygonLayerLabelPopUp": "Chọn lớp vùng"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Loại Đường",
    "valueLabel": "Giá trị",
    "symbolLabel": "Ký hiệu",
    "connectionLineLabel": "Đường thẳng kết nối",
    "boundaryLineLabel": "Đường ranh giới"
  },
  "closureSetting": {
    "snappingLayerLabel": "Các lớp chụp ảnh nhanh",
    "snappingBtnLabel": "Thiết lập",
    "snappingLayerHintText": "Gợi ý: Chọn các lớp mà đường thẳng lô đất sẽ chụp ảnh nhanh.",
    "miscloseDistanceLabel": "Khoảng cách sai số khép",
    "miscloseDistanceHintText": "Gợi ý: Xác định khoảng cách sai số khép và đơn vị của nó.",
    "miscloseRatioLabel": "Tỷ lệ sai số khép",
    "miscloseRatioHintText": "Gợi ý: Xác định tỷ lệ sai số khép.",
    "snappingToleranceLabel": "Sai số chụp ảnh nhanh",
    "pixelLabel": "Pixel",
    "snappingToleranceHintText": "Gợi ý: Xác định sai số chụp ảnh nhanh.",
    "selectLayerLabel": "Chọn lớp"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Trường hướng không hợp lệ",
    "chordLengthErrMsg": "Độ dài hình cung không hợp lệ",
    "distanceFieldErrMsg": "Khoảng cách Không hợp lệ",
    "sequenceIdFieldErrMsg": "Id chuỗi không hợp lệ",
    "radiusFieldErrMsg": "Bán kính không hợp lệ",
    "foreignKeyFieldErrMsg": "Khóa ngoại lai không hợp lệ",
    "arcLengthFieldErrMsg": "Độ dài hình cung không hợp lệ",
    "lineTypeFieldErrMsg": "Loại đường thẳng không hợp lệ",
    "parcelNameFieldErrMsg": "Trường tên của lô đất không hợp lệ",
    "planNameFieldErrMsg": "Trường tên của kế hoạch không hợp lệ",
    "scaleFieldErrMsg": "Trường tỷ lệ không hợp lệ",
    "documentTypeFieldErrMsg": "Trường Loại hồ sơ không hợp lệ",
    "miscloseRatioFieldErrMsg": "Trường Tỷ lệ sai số khép không hợp lệ",
    "statedAreaFieldErrMsg": "Trường Khu vực được nêu không hợp lệ",
    "miscloseDistanceFieldErrMsg": "Trường Khoảng cách sai số khép không hợp lệ",
    "globalIdFieldErrMsg": "Lớp vùng được chọn không có trường 'esriFieldTypeGlobalID' hợp lệ.",
    "invalidPolylineLayer": "Vui lòng chọn lớp dạng đường lô đất hợp lệ",
    "invalidPolygonLayer": "Vui lòng chọn lớp vùng lô đất hợp lệ",
    "invalidMiscloseDistance": "Vui lòng nhập khoảng cách sai số khép hợp lệ",
    "invalidSnappingTolerance": "Vui lòng nhập sai số chụp ảnh nhanh hợp lệ",
    "invalidMiscloseRatio": "Vui lòng nhập tỷ lệ sai số khép hợp lệ",
    "selectDistinctLineTypes": "Vui lòng chọn giá trị riêng biệt cho từng loại đường thẳng",
    "invalidConnectionLineType": "Giá trị đường thẳng kết nối không hợp lệ",
    "invalidBoundaryLineType": "Giá trị đường thẳng ranh giới không hợp lệ",
    "selectDistinctPolylineFields": "Vui lòng chọn trường riêng biệt cho từng giá trị COGO.",
    "selectDistinctPolygonFields": "Vui lòng chọn trường riêng biệt cho từng thuộc tính vùng lô đất."
  }
});