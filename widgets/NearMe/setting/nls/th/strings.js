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
      "displayText": "ไมล์",
      "acronym": "ไมล์"
    },
    "kilometers": {
      "displayText": "กิโลเมตร",
      "acronym": "กม."
    },
    "feet": {
      "displayText": "ฟุต",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "เมตร",
      "acronym": "ม."
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "ตั้งค่าการค้นหาแหล่งที่มา",
    "searchSourceSettingTitle": "ตั้งค่าการค้นหาแหล่งที่มา",
    "searchSourceSettingTitleHintText": "เพิ่ม และกำหนดค่าบริการค้นหาตำแหน่งจีโอโค้ดเซอร์วิส หรือชั้นข้อมูลเป็นข้อมูลในการค้นหา ข้อมูลที่ระบุนี้จะใช้ในการค้นหาภายในช่องค้นหา",
    "addSearchSourceLabel": "เพิ่มช่องค้นหาแหล่งที่มา",
    "featureLayerLabel": "ชั้นข้อมูลฟีเจอร์",
    "geocoderLabel": "Geocoder",
    "nameTitle": "ชื่อ",
    "generalSettingLabel": "การตั้งค่าทั่วไป",
    "allPlaceholderLabel": "ใส่ข้อความสำหรับการค้นหาทั้งหมด",
    "allPlaceholderHintText": "คำแนะนำ: ป้อนข้อความที่จะแสดงคำเริ่มต้น ในขณะที่ทำการค้นหาชั้นข้อมูลทั้งหมด และจีโอโค้ด",
    "generalSettingCheckboxLabel": "แสดงป๊อปอัพสำหรับคุณลักษณะ หรือสถานที่",
    "countryCode": "ประเทศหรือรหัสภูมิภาค(s)",
    "countryCodeEg": "ตัวอย่าง ",
    "countryCodeHint": "ปล่อยให้เป็นค่าว่างจะค้นหาทุกประเทศและภูมิภาค",
    "questionMark": "?",
    "searchInCurrentMapExtent": "ค้นหาเฉพาะในขอบเขตแผนที่ปัจจุบัน",
    "zoomScale": "ขยายมาตราส่วน",
    "locatorUrl": "URL เครื่องระบุตำแหน่ง",
    "locatorName": "ชื่อเครื่องมือระบุตำแหน่ง",
    "locatorExample": "ตัวอย่าง",
    "locatorWarning": "รุ่นของบริการรหัสเชิงพื้นที่นี้ไม่ได้รับการสนับสนุน เครื่องมือสนับสนุนบริการรหัสเชิงพื้นที่ 10.0 และสูงกว่า",
    "locatorTips": "ข้อเสนอแนะจะไม่สามารถใช้ได้เนื่องจากบริการเชิงพื้นที่ ไม่สนับสนุนความสามารถในการแนะนำ",
    "layerSource": "ชั้นข้อมูลแหล่งที่มา",
    "setLayerSource": "ตั้งชั้นข้อมูลแหล่งที่มา",
    "setGeocoderURL": "ตั้งรหัสเชิงพื้นที่ URL",
    "searchLayerTips": "ข้อเสนอแนะจะไม่สามารถใช้ได้เนื่องจากบริการคุณลักษณะไม่สนับสนุนความสามารถในการแบ่งหน้า",
    "placeholder": "ตัวอักษรที่จองที่ไว้สำหรับคำที่ใช้งานจริง",
    "searchFields": "ค้นหาฟิลด์",
    "displayField": "ฟิลด์ที่แสดง",
    "exactMatch": "สอดคล้องอย่างยิ่ง",
    "maxSuggestions": "คำแนะนำมากสุด",
    "maxResults": "ผลลัพธ์สูงสุด",
    "enableLocalSearch": "เปิดใช้งานการค้นหาในโปรแกรม",
    "minScale": "มาตราส่วน",
    "minScaleHint": "เมื่อมาตราส่วนของแผนที่มากกว่ามาตราส่วนนี้ จะสามารถใช้งานการค้นหาในโปรแกรมได้",
    "radius": "รัศมี",
    "radiusHint": "ระบุรัศมีของบริเวณโดยรอบศูนย์กลางของแผนที่ปัจจุบัน เพื่อใช้ในการเพิ่มอันดับของผลลัพธ์จากตัวเลือกในการระบุพิกัดทางภูมิศาสตร์ โดยตัวเลือกที่อยู่ใกล้ที่สุดจะถูกส่งกลับมาก่อน",
    "meters": "เมตร",
    "setSearchFields": "ตั้งการค้นหาฟิลด์",
    "set": "ตั้ง",
    "fieldName": "ชื่อ",
    "invalidUrlTip": "URL ${URL} ไม่ถูกต้อง หรือไม่สามารถเข้าถึงได้"
  },
  "searchSetting": {
    "searchSettingTabTitle": "ค้นหาการตั้งค่า",
    "defaultBufferDistanceLabel": "ตั้งระยะทางบัฟเฟอร์เริ่มต้น",
    "maxResultCountLabel": "จำกัด จำนวนของผลลัพธ์",
    "maxResultCountHintLabel": "คำแนะนำ: กำหนดจำนวนสูงสุดของผลลัพธ์ที่มองเห็นได้ ถ้าค่าเป็น 1 จะให้ข้อมูลที่ใกล้ที่สุด",
    "maxBufferDistanceLabel": "ตั้งระยะทางบัฟเฟอร์สูงสุด",
    "bufferDistanceUnitLabel": "หน่วยของระยะบัฟเฟอร์",
    "defaultBufferHintLabel": "คำแนะนำ: การตั้งค่าเริ่มต้น สำหรับแถบเลื่อนกำนหนดระยะบัฟเฟอร์",
    "maxBufferHintLabel": "คำแนะนำ: ตั้งค่าสูงสุด สำหรับแถบเลื่อนกำนหนดระยะบัฟเฟอร์",
    "bufferUnitLabel": "คำแนะนำ : ระบุหน่วยในการสร้างบัฟเฟอร์",
    "selectGraphicLocationSymbol": "สัญลักษณ์ของที่อยู่หรือตำแหน่ง",
    "graphicLocationSymbolHintText": "คำแนะนำ : สัญลักษณ์เพื่อการค้นหาที่อยู่หรือคลิกที่ตำแหน่ง",
    "addressLocationPolygonHintText": "คำแนะนำ : สัญลักษณ์สำหรับค้นหาเลเยอร์พื้นที่",
    "popupTitleForPolygon": "เลือกพื้นที่สำหรับเลือกตำแหน่งที่อยู่",
    "popupTitleForPolyline": "เลือกเส้นสำหรับตำแหน่งที่อยู่",
    "addressLocationPolylineHintText": "คำแนะนำ : สัญลักษณ์สำหรับเลือกเลเยอร์เส้น",
    "fontColorLabel": "เลือกสีข้อความสำหรับผลลัพท์การค้นหา",
    "fontColorHintText": "คำแนะนำ : สีข้อความของผลลัพท์การค้นหา",
    "zoomToSelectedFeature": "ซูมไปที่เลือก",
    "zoomToSelectedFeatureHintText": "คำแนะนำ: ซูมไปยังสถานที่ที่เลือกแทนของบัฟเฟอร์",
    "intersectSearchLocation": "ให้ผลลัพธ์จากพื้นที่ที่ตัดกัน",
    "intersectSearchLocationHintText": "คำแนะนำ: ให้ผลลัพธ์เป็นพื้นที่ที่อยู่ในตำแหน่งที่เลือกแทนที่พื้นที่ในระยะบัฟเฟอร์",
    "enableProximitySearch": "เปิดใช้การค้นหาด้านความใกล้เคียง",
    "enableProximitySearchHintText": "คำแนะนำ: เปิดใช้ความสามารถในการค้นหาตำแหน่งใกล้กับผลลัพธ์ที่เลือก",
    "bufferVisibilityLabel": "ตั้งค่าให้แสดงบัฟเฟอร์",
    "bufferVisibilityHintText": "คำแนะนำ: พื้นที่บัฟเฟอร์จะแสดงบนแผนที่",
    "bufferColorLabel": "กำหนดสัญลักษณ์ของบัฟเฟอร์",
    "bufferColorHintText": "คำแนะนำ: เลือกสีและความโปร่งใสของบัฟเฟอร์",
    "searchLayerResultLabel": "วาดเพียงผลการเลือกชั้นข้อมูล",
    "searchLayerResultHint": "คำแนะนำ: วาดเฉพาะชั้นข้อมูลที่เลือกได้บนแผนที่",
    "showToolToSelectLabel": "ตั้งค่าปุ่มกำหนดตำแหน่ง",
    "showToolToSelectHintText": "คำแนะนำ: ให้ปุ่มกำหนดตำแหน่งบนแผนที่ แทนการกำหนดตำแหน่งโดยการกดที่แผนที่ เพื่อตั้งค่าทุกครั้ง",
    "geoDesicParamLabel": "ใช้การบัฟเฟอร์บนพื้นผิวของโลก",
    "geoDesicParamHintText": "คำแนะนำ: ใช้การบัฟเฟอร์บนพื้นผิวของโลก แทนการบัฟเฟอร์แบบยูคลิเดียน (แนวระนาบ)"
  },
  "layerSelector": {
    "selectLayerLabel": "เลือก การค้นหาชั้นข้อมูล",
    "layerSelectionHint": "คำแนะนำ : ใช้ชุดปุ่มการทำงานเพื่อเลือกชั้นข้อมูล",
    "addLayerButton": "ตั้ง"
  },
  "routeSetting": {
    "routeSettingTabTitle": "การตั้งค่าทิศทาง",
    "routeServiceUrl": "การบริการเส้นทาง",
    "buttonSet": "ตั้ง",
    "routeServiceUrlHintText": "คำแนะนำ: คลิก â€~Setâ€™ เพื่อเรียกดูและเลือกเซอร์วิสเส้นทาง",
    "directionLengthUnit": "หน่วยความยาวของทิศทาง",
    "unitsForRouteHintText": "คำแนะนำ : ใช้เพื่อแสดงผลหน่วยของเส้นทาง",
    "selectRouteSymbol": "เลือกสัญลักษณ์เพื่อแสดงผลเส้นทาง",
    "routeSymbolHintText": "คำแนะนำ : ใช้เพื่อแสดงสัญลักษณ์เส้นให้กับข้อมูลเส้นทาง",
    "routingDisabledMsg": "เมื่อต้องการเปิดใช้งานเส้นทาง ตรวจสอบให้แน่ใจว่ามีการเปิดใช้งานเส้นทางในรายการในการตั้งค่าแอปพลิเคชัน"
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "การตั้งค่าสัญลักษณ์",
    "addSymbologyBtnLabel": "เพิ่มสัญลักษณ์ใหม่",
    "layerNameTitle": "ชื่อชั้นข้อมูล",
    "fieldTitle": "ฟิลด์",
    "valuesTitle": "ค่า",
    "symbolTitle": "สัญลักษณ์",
    "actionsTitle": "การดำเนินการ",
    "invalidConfigMsg": "ฟิลด์ซ้ำกัน : ${fieldName} สำหรับเลเยอร์ : ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "การตั้งค่าตัวกรอง",
    "addTaskTip": "เพิ่มตัวกรองอย่างน้อยหนึ่งรายการในชั้นการค้นหาที่เลือกและกำหนดค่าพารามิเตอร์สำหรับแต่ละชั้น",
    "enableMapFilter": "ลบการกรองชั้นข้อมูลที่ตั้งไว้ออกจากแผนที่",
    "newFilter": "ตัวกรองใหม่",
    "filterExpression": "สมการของตัวกรอง",
    "layerDefaultSymbolTip": "ใช้สัญลักษณ์ตั้งต้นของชั้นข้อมูล",
    "uploadImage": "อัปโหลดภาพ",
    "selectLayerTip": "กรุณาเลือกชั้นข้อมูล",
    "setTitleTip": "กรุณาตั้งชื่อ",
    "noTasksTip": "ไม่มีการกำหนดค่าฟิลเตอร์ คลิก \"${newFilter}\"เพื่อเพิ่มใหม่",
    "collapseFiltersTip": "ยุบสูตรตัวกรอง (ถ้ามี) เมื่อเปิดวิดเจ็ต",
    "groupFiltersTip": "กรองกลุ่มตามชั้นข้อมูล"
  },
  "networkServiceChooser": {
    "arcgislabel": "เพิ่มจาก ArcGIS Online",
    "serviceURLabel": "เพิ่ม Service URL",
    "routeURL": "เส้นทาง URL",
    "validateRouteURL": "การตรวจสอบ",
    "exampleText": "ตัวอย่าง",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "ระบุค่าที่ถูกต้องให้กับบริการเส้นทาง",
    "rateLimitExceeded": "เกินขีดจำกัดทีทำได้ กรุณาลองใหม่อีกครั้ง",
    "errorInvokingService": "ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง"
  },
  "errorStrings": {
    "bufferErrorString": "ระบุค่าตัวเลขที่ถูกต้อง",
    "selectLayerErrorString": "เลือกชั้นข้อมูลเพื่อค้นหา",
    "invalidDefaultValue": "ค่าเริ่มต้นระยะการบัฟเฟอร์ไม่สามารถเว้นว่างได้ กรุณาระบุค่าระยะบัฟเฟอร์",
    "invalidMaximumValue": "ค่าสูงสุดของระยะบัฟเฟอร์ไม่สามารถเว้นว่างได้ กรุณาระบุค่าระยะบัฟเฟอร์",
    "defaultValueLessThanMax": "กรุณาระบุค่าเริ่มต้นบัฟเฟอร์ในระยะที่กำหนดไว้",
    "defaultBufferValueGreaterThanOne": "ค่าเริ่มต้นระยะบัฟเฟอร์ไม่สามารถน้อยกว่า 0",
    "maximumBufferValueGreaterThanOne": "กรุณาระบุค่าบัฟเฟอร์สูงสุดด้วยระยะที่มากกว่า 0",
    "invalidMaximumResultCountValue": "โปรดระบุค่าที่ถูกต้องสำหรับจำนรวนผลลัพธ์สูงสุด",
    "invalidSearchSources": "การตั้งค่าแหล่งข้อมูลสำหรับค้นหาไม่ถูกต้อง"
  },
  "symbolPickerPreviewText": "ดูตัวอย่าง:"
});