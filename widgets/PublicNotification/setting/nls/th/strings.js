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
    "title": "การตั้งค่าการค้นหาและบัฟเฟอร์",
    "mainHint": "คุณสามารถเปิดใช้งานการค้นหาที่อยู่และฟีเจอร์แบบข้อความ การแปลงเรขาคณิตเป็นดิจิทัลและการกำหนดบัฟเฟอร์"
  },
  "addressSourceSetting": {
    "title": "ชั้นข้อมูลที่อยู่",
    "mainHint": "คุณสามารถระบุชั้นข้อมูลที่อยู่ที่สามารถใช้งานได้"
  },
  "notificationSetting": {
    "title": "ตัวเลือกการแจ้งเตือน",
    "mainHint": "คุณสามารถระบุประเภทของการแจ้งเตือนที่สามารถใช้งานได้"
  },
  "groupingLabels": {
    "addressSources": "ชั้นข้อมูลที่จะใช้เพื่อเลือกชั้นข้อมูลที่อยู่",
    "averyStickersDetails": "สติกเกอร์ Avery(r)",
    "csvDetails": "ไฟล์ค่าที่คั่นด้วยจุลภาค (CSV)",
    "drawingTools": "เครื่องมือวาดภาพสำหรับการระบุพื้นที่",
    "featureLayerDetails": "ชั้นข้อมูล",
    "geocoderDetails": "Geocoder",
    "labelFormats": "รูปแบบป้ายที่ใช้งานได้",
    "printingOptions": "ตัวเลือกสำหรับหน้าป้ายที่พิมพ์",
    "searchSources": "ค้นหาแหล่งที่มา",
    "stickerFormatDetails": "พารามิเตอร์ของหน้าป้าย"
  },
  "hints": {
    "alignmentAids": "เครื่องหมายที่เพิ่มลงในหน้าป้ายจะช่วยให้คุณจัดตำแหน่งหน้ากับเครื่องพิมพ์ของคุณ",
    "csvNameList": "รายการชื่อฟิลด์ที่แยกแยะตัวพิมพ์ใหญ่เล็กที่คั่นด้วยจุลภาค",
    "horizontalGap": "ช่องว่างระหว่างสองป้ายในหนึ่งแถว",
    "insetToLabel": "ช่องว่างระหว่างด้านข้างของป้ายและจุดเริ่มต้นของข้อความ",
    "labelFormatDescription": "ลักษณะการแสดงรูปแบบป้ายในรายการตัวเลือกรูปแบบวิดเจ็ต",
    "labelFormatDescriptionHint": "คำแนะนำเครื่องมือเพื่อเสริมคำอธิบายในรายการตัวเลือกรูปแบบ",
    "labelHeight": "ความสูงของแต่ละป้ายในหน้า",
    "labelWidth": "ความกว้างของแต่ละป้ายในหน้า",
    "localSearchRadius": "ระบุรัศมีของบริเวณโดยรอบศูนย์กลางของแผนที่ปัจจุบัน เพื่อใช้ในการเพิ่มอันดับของผลลัพธ์จากตัวเลือกในการระบุพิกัดทางภูมิศาสตร์ โดยตัวเลือกที่อยู่ใกล้ที่สุดจะถูกส่งกลับมาก่อน",
    "rasterResolution": "100 พิกเซลต่อนิ้วโดยประมาณตรงกับความละเอียดหน้าจอ ความละเอียดยิ่งสูง หน่วยความจำเบราว์เซอร์ที่ใช้ยิ่งมากขึ้น ความสามารถในการรองรับหน่วยความจำขนาดใหญ่ของเบราว์เซอร์จะแตกต่างกัน",
    "selectionListOfOptionsToDisplay": "รายการที่เลือกจะแสดงเป็นตัวเลือกในวิดเจ็ต เปลี่ยนลำดับตามต้องการ",
    "verticalGap": "ช่องว่างระหว่างสองป้ายในหนึ่งคอลัมน์"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "ระยะทางบัฟเฟอร์เริ่มต้น",
    "bufferUnits": "หน่วยบัฟเฟอร์เพื่อระบุในวิดเจ็ต",
    "countryRegionCodes": "รหัสประเทศหรือภูมิภาค",
    "description": "คำอธิบาย",
    "descriptionHint": "คำแนะนำสำหรับคำอธิบาย",
    "displayField": "แสดงผลฟิลด์",
    "drawingToolsFreehandPolygon": "รูปหลายเหลี่ยมที่วาดด้วยมือ",
    "drawingToolsLine": "เส้น",
    "drawingToolsPoint": "จุด",
    "drawingToolsPolygon": "พื้นที่",
    "drawingToolsPolyline": "เส้นหลายรูปแบบ",
    "enableLocalSearch": "เปิดใช้งานการค้นหาในโปรแกรม",
    "exactMatch": "การจับคู่ที่เหมาะสม",
    "fontSizeAlignmentNote": "ขนาดตัวอักษรสำหรับบันทึกย่อเกี่ยวกับระยะขอบการพิมพ์",
    "gridDarkness": "ความมืดของตาราง",
    "gridlineLeftInset": "ส่วนแทรกเส้นแบ่งช่องด้านซ้าย",
    "gridlineMajorTickMarksGap": "เส้นขีดแบ่งสเกลหลักทุก",
    "gridlineMinorTickMarksGap": "เส้นขีดแบ่งสเกลย่อยทุก",
    "gridlineRightInset": "ส่วนแทรกเส้นแบ่งช่องด้านขวา",
    "labelBorderDarkness": "ความมืดของขอบป้าย",
    "labelBottomEdge": "ขอบล่างของป้ายในหน้า",
    "labelFontSize": "ขนาดตัวอักษร",
    "labelHeight": "ความสูงของป้าย",
    "labelHorizontalGap": "ช่องว่างในแนวนอน",
    "labelInitialInset": "แทรกในข้อความป้าย",
    "labelLeftEdge": "ขอบด้านซ้ายของป้ายในหน้า",
    "labelMaxLineCount": "จำนวนบรรทัดสูงสุดในป้าย",
    "labelPageHeight": "ความสูงของหน้า",
    "labelPageWidth": "ความกว้างของหน้า",
    "labelRightEdge": "ขอบด้านขวาของป้ายในหน้า",
    "labelsInAColumn": "จำนวนป้ายในหนึ่งคอลัมน์",
    "labelsInARow": "จำนวนป้ายในหนึ่งแถว",
    "labelTopEdge": "ขอบด้านบนของป้ายในหน้า",
    "labelVerticalGap": "ช่องว่างในแนวตั้ง",
    "labelWidth": "ความกว้างของป้าย",
    "limitSearchToMapExtent": "ค้นหาเฉพาะในขอบเขตแผนที่ปัจจุบัน",
    "maximumResults": "ผลลัพธ์สูงสุด",
    "maximumSuggestions": "ข้อเสนอแนะสูงสุด",
    "minimumScale": "สเกลต่ำสุด",
    "name": "ชื่อ",
    "percentBlack": "% ดำ",
    "pixels": "พิกเซล",
    "pixelsPerInch": "พิกเซลต่อนิ้ว",
    "placeholderText": "ตัวยึดตำแหน่ง",
    "placeholderTextForAllSources": "ตัวยึดตำแหน่งข้อความสำหรับการค้นหาแหล่งที่มาทั้งหมด",
    "radius": "รัศมี",
    "rasterResolution": "ความละเอียดราสเตอร์",
    "searchFields": "ค้นหาฟิลด์",
    "showAlignmentAids": "แสดงเครื่องมือช่วยในการจัดตำแหน่งในหน้า",
    "showGridTickMarks": "แสดงเส้นขีดแบ่งสเกลของตาราง",
    "showLabelOutlines": "แสดงเส้นขอบของป้าย",
    "showPopupForFoundItem": "แสดงป๊อปอัพสำหรับคุณลักษณะ หรือสถานที่",
    "tool": "เครื่องมือ",
    "units": "หน่วย",
    "url": "URL",
    "urlToGeometryService": "URL ไปยังบริการเรขาคณิต",
    "useRelatedRecords": "ใช้บันทึกที่เกี่ยวข้อง",
    "useSecondarySearchLayer": "ใช้ชั้นข้อมูลการเลือกสำรอง",
    "useSelectionDrawTools": "ใช้ตัวเลือกเครื่องมือวาดภาพ",
    "useVectorFonts": "ใช้แบบอักษรเวกเตอร์ (แบบอักษรละตินเท่านั้น)",
    "zoomScale": "การย่อ / ขยาย มาตราส่วน"
  },
  "buttons": {
    "addAddressSource": "เพิ่มชั้นข้อมูลที่มีป้ายที่อยู่ในป๊อปอัป",
    "addLabelFormat": "เพิ่มรูปแบบป้าย",
    "addSearchSource": "เพิ่มแหล่งการค้นหา",
    "set": "ตั้ง"
  },
  "placeholders": {
    "averyExample": "เช่น ป้าย Avery(r) ${averyPartNumber}",
    "countryRegionCodes": "เช่น USA, CHN",
    "descriptionCSV": "ค่าที่คั่นด้วยจุลภาค",
    "descriptionPDF": "ป้าย PDF ${heightLabelIn} x ${widthLabelIn} นิ้ว; ${labelsPerPage} ต่อหน้า"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "รับชั้นข้อมูลฟีเจอร์จากเว็บแมพ",
    "openCountryCodes": "คลิกเพื่อดูข้อมูลเพิ่มเติมเกี่ยวกับรหัส",
    "openFieldSelector": "คลิกเพื่อเปิดตัวเลือกฟิลด์",
    "setAndValidateURL": "ตั้งค่าและตรวจสอบ URL"
  },
  "problems": {
    "noAddresseeLayers": "โปรดระบุชั้นข้อมูลผู้ติดต่ออย่างน้อยหนึ่งรายการ",
    "noBufferUnitsForDrawingTools": "โปรดกำหนดค่าหน่วยบัฟเฟอร์อย่างน้อยหนึ่งรายการสำหรับเครื่องมือวาดภาพ",
    "noBufferUnitsForSearchSource": "โปรดกำหนดค่าหน่วยบัฟเฟอร์อย่างน้อยหนึ่งรายการสำหรับแหล่งการค้นหา \"${sourceName}\"",
    "noGeometryServiceURL": "โปรดกำหนดค่า URL ให้กับบริการทางเรขาคณิต",
    "noNotificationLabelFormats": "โปรดระบุรูปแบบป้ายการแจ้งเตือนอย่างน้อยหนึ่งรูปรายการ",
    "noSearchSourceFields": "โปรดกำหนดค่าฟิลด์การค้นหาอย่างน้อยหนึ่งช่องสำหรับแหล่งที่มาของการค้นหา \"${sourceName}\"",
    "noSearchSourceURL": "โปรดกำหนดค่า URL สำหรับแหล่งที่มาของการค้นหา \"${sourceName}\""
  }
});