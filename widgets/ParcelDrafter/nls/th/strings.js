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
  "_widgetLabel": "พัสดุไปรษณีย์",
  "newTraverseButtonLabel": "เริ่มต้นการสำรวจใหม่",
  "invalidConfigMsg": "การกำหนดค่าไม่ถูกต้อง",
  "geometryServiceURLNotFoundMSG": "ไม่สามารถรับ URL เซอร์วิสเรขาคณิต",
  "editTraverseButtonLabel": "แก้ไขการสำรวจ",
  "mapTooltipForStartNewTraverse": "โปรดเลือกจุดบนแผนที่หรือพิมพ์ด้านล่างเพื่อเริ่มต้น",
  "mapTooltipForEditNewTraverse": "โปรดเลือกข้อมูลที่ต้องการแก้ไข",
  "mapTooltipForUpdateStartPoint": "คลิกเพื่ออัพเดทจุดเริ่มต้น",
  "mapTooltipForScreenDigitization": "คลิกเพื่อเพิ่มจุดข้อมูล",
  "mapTooltipForRotate": "ลากเพื่อหมุน",
  "mapTooltipForScale": "ลากเพื่อปรับขนาด",
  "backButtonTooltip": "กลับ",
  "newTraverseTitle": "เส้นขวางใหม่",
  "editTraverseTitle": "แก้ไขการสำรวจ",
  "clearingDataConfirmationMessage": "การเปลี่ยนแปลงจะถูกยกเลิก คุณต้องการดำเนินการต่อหรือไม่?",
  "unableToFetchParcelMessage": "ไม่สามารถดึงข้อมูลได้",
  "unableToFetchParcelLinesMessage": "ไม่สามารถดึงข้อมูลเส้นได้",
  "planSettings": {
    "planSettingsTitle": "การตั้งค่า",
    "directionOrAngleTypeLabel": "ทิศทางหรือประเภทมุม",
    "directionOrAngleUnitsLabel": "ทิศทางหรือหน่วยมุม",
    "distanceAndLengthUnitsLabel": "ระยะทางหรือหน่วยความยาว",
    "areaUnitsLabel": "หน่วยพื้นที่",
    "circularCurveParameters": "พารามิเตอร์เส้นโค้งวงกลม",
    "northAzimuth": "เหนืออะซิมุท",
    "southAzimuth": "ใต้อะซิมุท",
    "quadrantBearing": "ค่าควอแดรนท์แบริ่ง",
    "radiusAndChordLength": "รัศมีและความยาวของคอร์ด",
    "radiusAndArcLength": "รัศมีและความยาว Arc",
    "expandGridTooltipText": "สำรวจตารางกริด",
    "collapseGridTooltipText": "ยุบตารางกริด",
    "zoomToLocationTooltipText": "ขยายไปยังตำแหน่ง",
    "onScreenDigitizationTooltipText": "วาด"
  },
  "traverseSettings": {
    "bearingLabel": "แบริ่ง",
    "lengthLabel": "ความยาว",
    "radiusLabel": "รัศมี",
    "noMiscloseCalculated": "ไม่ได้คำนวณผิดพลาด",
    "traverseMiscloseBearing": "แบริ่งผิดพลาด",
    "traverseAccuracy": "ความถูกต้อง",
    "accuracyHigh": "สูง",
    "traverseDistance": "ระยะห่างที่ไม่ถูกต้อง",
    "traverseMiscloseRatio": "อัตราส่วนที่ไม่ถูกต้อง",
    "traverseStatedArea": "ระบุพื้นที่",
    "traverseCalculatedArea": "คำนวณพื้นที่",
    "addButtonTitle": "เพิ่ม",
    "deleteButtonTitle": "ลบออก"
  },
  "parcelTools": {
    "rotationToolLabel": "มุม",
    "scaleToolLabel": "มาตราส่วน"
  },
  "newTraverse": {
    "invalidBearingMessage": "แบริ่งไม่ถูกต้อง",
    "invalidLengthMessage": "ความยาวไม่ถูกต้อง",
    "invalidRadiusMessage": "รัศมีไม่ถูกต้อง",
    "negativeLengthMessage": "ใช้ได้กับเส้นโค้งเท่านั้น",
    "enterValidValuesMessage": "โปรดป้อนค่าที่ถูกต้อง",
    "enterValidParcelInfoMessage": "โปรดป้อนข้อมูลแปลงที่ดินที่ถูกต้องเพื่อบันทึก",
    "unableToDrawLineMessage": "ไม่สามารถวาดเส้น",
    "invalidEndPointMessage": "จุดสิ้นสุดไม่ถูกต้องไม่สามารถวาดเส้น"
  },
  "planInfo": {
    "requiredText": "(จำเป็นต้องใช้)",
    "optionalText": "(เงื่อนไข)",
    "parcelNamePlaceholderText": "ชื่อแปลงที่ดิน",
    "parcelDocumentTypeText": "ประเภทเอกสาร",
    "planNamePlaceholderText": "ชื่อแผน",
    "cancelButtonLabel": "ยกเลิก",
    "saveButtonLabel": "บันทึก",
    "saveNonClosedParcelConfirmationMessage": "ขอบเขตแปลงที่ดินที่ป้อนไม่ได้ปิด คุณยังต้องการดำเนินการต่อ และบันทึกเส้นรอบแปลงหรือไม่?",
    "unableToCreatePolygonParcel": "ไม่สามารถสร้างรูปพื้นที่แปลงที่ดิน",
    "unableToSavePolygonParcel": "ไม่สามารถบันทึกรูปพื้นที่แปลงที่ดิน",
    "unableToSaveParcelLines": "ไม่สามารถบันทึกเส้นรอบแปลงที่ดิน",
    "unableToUpdateParcelLines": "ไม่สามารถอัปเดตเส้นรอบแปลงที่ดิน",
    "parcelSavedSuccessMessage": "บันทึกแปลงที่ดินไว้เรียบร้อยแล้ว",
    "enterValidParcelNameMessage": "กรุณาใส่ชื่อแปลงที่ดินที่ถูกต้อง",
    "enterValidPlanNameMessage": "โปรดป้อนชื่อแผนที่ถูกต้อง",
    "enterValidDocumentTypeMessage": "ประเภทเอกสารไม่ถูกต้อง",
    "enterValidStatedAreaNameMessage": "โปรดระบุพื้นที่ที่ถูกต้อง"
  },
  "xyInput": {
    "explanation": "ในการอ้างอิงเชิงพื้นที่ของชั้นแปลงที่ดินของคุณ"
  }
});