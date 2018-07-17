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
  "setBtnLabel": "ตั้ง",
  "selectLabel": "เลือก",
  "selectLayerLabel": "เลือกชั้นข้อมูลแปลงที่ดิน",
  "selectLayerHintText": "คำแนะนำ: ใช้ปุ่มตั้งค่า เพื่อเลือกรูปพื้นที่แปลงที่ดิน และชั้นข้อมูลของเส้นที่เกี่ยวข้อง",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "ชั้นข้อมูลพื้นที่ที่เลือก ไม่มีชั้นข้อมูลเกี่ยวข้องที่ถูกต้อง"
  },
  "parcelLineLayer": {
    "selectLayerLabel": "เลือกชั้นข้อมูลที่เกี่ยวข้อง",
    "layerSettingTabLabel": "ชั้นข้อมูลแปลงที่ดิน",
    "advancedSettingTabLabel": "ตั้งค่าขั้นสูง",
    "selectLayerHintText": "คำแนะนำ: ใช้เพื่อเก็บค่า COGO ในชั้นข้อมูลเส้นรอบแปลงที่ดิน",
    "selectFieldLegendLabel": "เลือกฟิลด์เพื่อจัดเก็บค่า COGO ในเชั้นข้อมูลเส้นรอบแปลงที่ดิน",
    "bearingFieldLabel": "แบริ่ง",
    "chordLengthFieldLabel": "ความยาวคอร์ด",
    "distanceFieldLabel": "ระยะทาง",
    "sequenceIdFieldLabel": "ไอดีลำดับ",
    "radiusFieldLabel": "รัศมี",
    "foreignKeyFieldLabel": "คีย์นอก",
    "arcLengthFieldLabel": "ความยาวเส้นโค้งแบบอาร์ค",
    "lineTypeFieldLabel": "ประเภทของเส้น",
    "parcelPointSymbolLabel": "สัญลักษณ์ของจุดแปลงที่ดิน",
    "parcelPointSymbolHintText": "คำแนะนำ: ใช้เพื่อแสดงสัญลักษณ์จุดเริ่มต้นของเส้น",
    "symbolPickerPreviewText": "ภาพตัวอย่าง",
    "selectLineLayerLabel": "เลือกชั้นข้อมูลเส้น"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "เลือกชั้นข้อมูลพื้นที่",
    "selectPolygonLayerHintText": "คำแนะนำ: ใช้ชั้นข้อมูลแปลงที่ดินที่เลือก",
    "selectFieldLegendLabel": "เลือกฟิลด์ เพื่อจัดเก็บแอตทริบิวต์ของพื้นที่แปลง",
    "parcelNameLabel": "ชื่อแปลง",
    "rotationLabel": "หมุน",
    "planNameLabel": "ชื่อแผน",
    "scalingLabel": "มาตราส่วน",
    "documentTypeLabel": "ประเภทเอกสาร",
    "miscloseRatioLabel": "อัตราส่วนที่ไม่ถูกต้อง",
    "statedAreaLabel": "ระบุพื้นที่",
    "miscloseDistanceLabel": "ระยะห่างที่ไม่ถูกต้อง",
    "selectPolygonLayerLabelPopUp": "เลือกชั้นข้อมูลพื้นที่"
  },
  "lineTypesTable": {
    "lineTypeLabel": "ประเภทของเส้น",
    "valueLabel": "มูลค่า",
    "symbolLabel": "สัญลักษณ์",
    "connectionLineLabel": "เส้นเชื่อม",
    "boundaryLineLabel": "เส้นขอบ"
  },
  "closureSetting": {
    "snappingLayerLabel": "ชั้นข้อมูลสแน็ป",
    "snappingBtnLabel": "ตั้ง",
    "snappingLayerHintText": "คำแนะนำ: เลือกชั้นข้อมูลที่ต้องการให้เส้นขอบแปลงสแน็ป",
    "miscloseDistanceLabel": "ระยะห่างที่ไม่ถูกต้อง",
    "miscloseDistanceHintText": "คำแนะนำ: ระบุระยะห่างที่ไม่ถูกต้องและหน่วยของมัน",
    "miscloseRatioLabel": "อัตราส่วนที่ไม่ถูกต้อง",
    "miscloseRatioHintText": "คำแนะนำ: ระบุอัตราส่วนผิด",
    "snappingToleranceLabel": "ระยะสแน็ป",
    "pixelLabel": "พิกเซล",
    "snappingToleranceHintText": "คำแนะนำ: ระบุระยะสแน็ป",
    "selectLayerLabel": "เลือกชั้นข้อมูล"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "ฟิลด์แบริ่งไม่ถูกต้อง",
    "chordLengthErrMsg": "ความยาวของคอร์ดไม่ถูกต้อง",
    "distanceFieldErrMsg": "ระยะไม่ถูกต้อง",
    "sequenceIdFieldErrMsg": "ไอดีลำดับที่ไม่ถูกต้อง",
    "radiusFieldErrMsg": "รัศมีไม่ถูกต้อง",
    "foreignKeyFieldErrMsg": "คีย์นอกไม่ถูกต้อง",
    "arcLengthFieldErrMsg": "ความยาวเส้นโค้งอาร์ค ไม่ถูกต้อง",
    "lineTypeFieldErrMsg": "ประเภทเส้นไม่ถูกต้อง",
    "parcelNameFieldErrMsg": "ฟิลด์ชื่อแปลงที่ดินไม่ถูกต้อง",
    "planNameFieldErrMsg": "ฟิลด์ชื่อแผนไม่ถูกต้อง",
    "scaleFieldErrMsg": "ฟิลด์มาตราส่วนไม่ถูกต้อง",
    "documentTypeFieldErrMsg": "ฟิลด์ประเภทเอกสารไม่ถูกต้อง",
    "miscloseRatioFieldErrMsg": "ฟิลด์อัตราส่วนไม่ถูกต้อง",
    "statedAreaFieldErrMsg": "ฟิลด์พื้นที่ที่ระบุไม่ถูกต้อง",
    "miscloseDistanceFieldErrMsg": "ฟิลด์ระยะทางที่ไม่ถูกต้อง",
    "globalIdFieldErrMsg": "ชั้นข้อมูลพื้นที่ที่เลือกไม่มีฟิลด์ 'esriFieldTypeGlobalID' ที่ถูกต้อง",
    "invalidPolylineLayer": "โปรดเลือกชั้นข้อมูลเส้นรอบแปลงที่ถูกต้อง",
    "invalidPolygonLayer": "โปรดเลือกชั้นข้อมูลพื้นที่แปลงที่ถูกต้อง",
    "invalidMiscloseDistance": "โปรดป้อนระยะทางกรณีไม่ปิดพื้นที่ที่ถูกต้อง",
    "invalidSnappingTolerance": "โปรดป้อนระยะสแน๊ปที่ถูกต้อง",
    "invalidMiscloseRatio": "โปรดป้อนอัตราส่วนกรณีไม่ปิดพื้นที่ที่ถูกต้อง",
    "selectDistinctLineTypes": "โปรดเลือกค่าที่แตกต่างกันในแต่ละประเภทของเส้น",
    "invalidConnectionLineType": "ค่าการเชื่อมต่อเส้นไม่ถูกต้อง",
    "invalidBoundaryLineType": "ค่าเส้นขอบไม่ถูกต้อง",
    "selectDistinctPolylineFields": "โปรดเลือกฟิลด์ที่แตกต่างกันสำหรับค่า COGO แต่ละค่า",
    "selectDistinctPolygonFields": "โปรดเลือกฟิลด์ที่แตกต่างกันสำหรับแอตทริบิวต์พื้นที่แปลงที่ดิน"
  }
});