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
  "_widgetLabel": "การฉาย",
  "geometryServicesNotFound": "บริการด้าน Geometry ไม่สามารถใช้งานได้",
  "unableToDrawBuffer": "ไม่สามารถวาดบัฟเฟอร์ได้ โปรดลองอีกครั้ง",
  "invalidConfiguration": "การตั้งค่าไม่ถูกต้อง",
  "clearAOIButtonLabel": "เริ่มต้นใหม่",
  "noGraphicsShapefile": "shapefile ที่อัปโหลดไม่มีกราฟิก",
  "zoomToLocationTooltipText": "ขยายไปยังตำแหน่ง",
  "noGraphicsToZoomMessage": "ไม่มีกราฟิกที่พบเพื่อซูมเข้า",
  "placenameWidget": {
    "placenameLabel": "ค้นหาตำแหน่ง"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "เลือกโหมดการวาด",
    "toggleSelectability": "คลิกเพื่อสลับการเลือก",
    "chooseLayerTitle": "เลือกเลเยอร์ที่เลือกได้",
    "selectAllLayersText": "เลือกทั้งหมด",
    "layerSelectionWarningTooltip": "ควรเลือกเลเยอร์สำหรับสร้าง AOI อย่างน้อยหนึ่งเลเยอร์"
  },
  "shapefileWidget": {
    "shapefileLabel": "อัปโหลดไฟล์ซิปที่ซิป",
    "uploadShapefileButtonText": "อัพโหลด",
    "unableToUploadShapefileMessage": "ไม่สามารถอัปโหลด Shapefile"
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "กำหนดจุดเริ่มต้น",
    "addButtonTitle": "เพิ่ม",
    "deleteButtonTitle": "ลบออก",
    "mapTooltipForStartPoint": "คลิกที่แผนที่เพื่อกำหนดจุดเริ่มต้น",
    "mapTooltipForUpdateStartPoint": "คลิกที่แผนที่เพื่ออัพเดตจุดเริ่มต้น",
    "locateText": "ระบุตำแหน่ง",
    "locateByMapClickText": "เลือกพิกัดเริ่มต้น",
    "enterBearingAndDistanceLabel": "ป้อนแบริ่งและระยะทางจากจุดเริ่มต้น",
    "bearingTitle": "แบริ่ง",
    "distanceTitle": "ระยะทาง",
    "planSettingTooltip": "การตั้งค่าแผน",
    "invalidLatLongMessage": "โปรดป้อนค่าที่ถูกต้อง"
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "ระยะบัฟเฟอร์ (ตัวเลือก)",
    "bufferInputLabel": "แสดงผลภายใน"
  },
  "traverseSettings": {
    "bearingLabel": "แบริ่ง",
    "lengthLabel": "ความยาว",
    "addButtonTitle": "เพิ่ม",
    "deleteButtonTitle": "ลบออก"
  },
  "planSettings": {
    "expandGridTooltipText": "สำรวจตารางกริด",
    "collapseGridTooltipText": "ยุบตารางกริด",
    "directionUnitLabelText": "หน่วยเส้นทาง",
    "distanceUnitLabelText": "ระยะทางหรือหน่วยความยาว",
    "planSettingsComingSoonText": "เร็วๆ นี้"
  },
  "newTraverse": {
    "invalidBearingMessage": "แบริ่งไม่ถูกต้อง",
    "invalidLengthMessage": "ความยาวไม่ถูกต้อง",
    "negativeLengthMessage": "ความยาวเชิงลบ"
  },
  "reportsTab": {
    "aoiAreaText": "พื้นที่ AOI",
    "downloadButtonTooltip": "ดาวน์โหลด",
    "printButtonTooltip": "พิมพ์",
    "uploadShapefileForAnalysisText": "อัปโหลดรูปแบบรวมที่จะรวมไว้ในการวิเคราะห์",
    "uploadShapefileForButtonText": "ค้นหา",
    "downloadLabelText": "เลือกรูปแบบ:",
    "downloadBtnText": "ดาวน์โหลด",
    "noDetailsAvailableText": "ไม่พบผลลัพธ์",
    "featureCountText": "นับ",
    "featureAreaText": "พื้นที่",
    "featureLengthText": "ความยาว",
    "attributeChooserTooltip": "เลือกแอตทริบิวต์ที่จะแสดง",
    "csv": "CSV",
    "filegdb": "ไฟล์ฐานข้อมูลภูมิศาสตร์",
    "shapefile": "Shapefile",
    "noFeaturesFound": "ไม่พบผลลัพธ์สำหรับรูปแบบไฟล์ที่เลือก",
    "selectReportFieldTitle": "เลือกช่อง",
    "noFieldsSelected": "ไม่ได้เลือกเขตข้อมูล",
    "intersectingFeatureExceedsMsgOnCompletion": "มีการนับระเบียนสูงสุดสำหรับเลเยอร์ตั้งแต่หนึ่งเลเยอร์ขึ้นไป",
    "unableToAnalyzeText": "ไม่สามารถวิเคราะห์จำนวนการบันทึกสูงสุดได้ถึงแล้ว",
    "errorInPrintingReport": "ไม่สามารถพิมพ์รายงานได้ โปรดตรวจสอบว่าการตั้งค่ารายงานถูกต้องหรือไม่",
    "aoiInformationTitle": "ข้อมูลสถานที่น่าสนใจ (AOI)",
    "summaryReportTitle": "สรุป",
    "notApplicableText": "ไม่ระบุ",
    "downloadReportConfirmTitle": "ยืนยันการดาวน์โหลด",
    "downloadReportConfirmMessage": "คุณแน่ใจหรือไม่ว่าต้องการดาวน์โหลด",
    "noDataText": "ไม่มีข้อมูล",
    "createReplicaFailedMessage": "การดำเนินการดาวน์โหลดล้มเหลวสำหรับเลเยอร์ต่อไปนี้: <br/> $ {layerNames}",
    "extractDataTaskFailedMessage": "การดำเนินการดาวน์โหลดล้มเหลว",
    "printLayoutLabelText": "หน้ากระดาษ",
    "printBtnText": "พิมพ์",
    "printDialogHint": "หมายเหตุ: ชื่อเรื่องรายงานและความคิดเห็นสามารถแก้ไขได้ในหน้าตัวอย่างรายงาน",
    "unableToDownloadFileGDBText": "ไฟล์ Geodatabase ไม่สามารถดาวน์โหลดได้สำหรับจุดบรรจุหรือตำแหน่งของ AOI",
    "unableToDownloadShapefileText": "ไม่สามารถดาวน์โหลด Shapefile สำหรับตำแหน่งจุดหรือบรรทัดของ AOI ได้",
    "analysisUnitLabelText": "แสดงผลลัพธ์ใน:",
    "analysisUnitButtonTooltip": "เลือกหน่วยสำหรับการวิเคราะห์",
    "analysisCloseBtnText": "ปิด",
    "feetUnit": "ฟุต/ตารางฟุต",
    "milesUnit": "ไมล์/เอเคอร์",
    "metersUnit": "เมตร/ตารางเมตร",
    "kilometersUnit": "กิโลเมตร/ตารางกิโลเมตร",
    "hectaresUnit": "กิโลเมตร/เฮกตาร์",
    "hectaresAbbr": "เฮคเตอร์",
    "layerNotVisibleText": "ไม่สามารถวิเคราะห์ ชั้นข้อมูลปิดอยู่หรืออยู่นอกขอบเขตการแสดงผลของสเกล",
    "refreshBtnTooltip": "รีเฟรชรายงาน",
    "featureCSVAreaText": "พื้นที่ตัดกัน",
    "featureCSVLengthText": "ความยาวที่ตัดกัน",
    "errorInFetchingPrintTask": "เกิดข้อผิดพลาดขณะดึงข้อมูลงานพิมพ์ โปรดลองอีกครั้ง"
  }
});