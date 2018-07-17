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
    "miles": "ไมล์",
    "kilometers": "กิโลเมตร",
    "feet": "ฟุต",
    "meters": "เมตร"
  },
  "layerSetting": {
    "layerSettingTabTitle": "ค้นหาการตั้งค่า",
    "buttonSet": "ตั้ง",
    "selectLayersLabel": "เลือกชั้นข้อมูล",
    "selectLayersHintText": "คำแนะนำ : ใช้เพื่อเลือกพื้นที่ที่มีความเกี่ยวข้องกับข้อมูลจุด",
    "selectPrecinctSymbolLabel": "เลือกสัญลักษณ์เพื่อไฮไลท์พื้นที่",
    "selectGraphicLocationSymbol": "สัญลักษณ์ที่อยู่หรือตำแหน่ง",
    "graphicLocationSymbolHintText": "คำแนะนำ : สัญลักษณ์เพื่อค้นหาที่อยู่หรือคลิกตำแหน่ง",
    "precinctSymbolHintText": "คำแนะนำ : ใช้เพื่อแสดงผลสัญลักษณ์ในการเลือกพื้นที่",
    "selectColorForPoint": "เลือกสีที่จะเน้นจุด",
    "selectColorForPointHintText": "คำแนะนำ: ใช้เพื่อแสดงสีไฮไลท์สำหรับจุดที่เลือก"
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
    "invalidUrlTip": "URL ${URL} ไม่ถูกต้อง หรือไม่สามารถเข้าถึงได้",
    "invalidSearchSources": "การตั้งค่าแหล่งข้อมูลสำหรับค้นหาไม่ถูกต้อง"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "เลือกชั้นข้อมูลพื้นที่",
    "selectPolygonLayerHintText": "คำแนะนำ : ใช้เพื่อเลือกชั้นข้อมูลพื้นที่",
    "selectRelatedPointLayerLabel": "เลือกชั้นข้อมูลจุด ที่เกี่ยวข้องกับข้อมูลพื้นที่",
    "selectRelatedPointLayerHintText": "คำแนะนำ : เลือกข้อมูลจุด ที่เกี่ยวข้องกับข้อมูลพื้นที่",
    "polygonLayerNotHavingRelatedLayer": "กรุณาเลือกชั้นข้อมูลพื้นที่ ที่เกี่ยวข้องกับข้อมูลจุด",
    "errorInSelectingPolygonLayer": "กรุณาเลือกชั้นข้อมูลพื้นที่ ที่เกี่ยวข้องกับข้อมูลจุด",
    "errorInSelectingRelatedLayer": "เลือกข้อมูลจุด ที่เกี่ยวข้องกับข้อมูลพื้นที่"
  },
  "routeSetting": {
    "routeSettingTabTitle": "การตั้งค่าทิศทาง",
    "routeServiceUrl": "บริการการกำหนดเส้นทาง",
    "buttonSet": "ตั้ง",
    "routeServiceUrlHintText": "คำแนะนำ : คลิก “เซต” เพื่อเบราวซ์และเลือกโครงข่ายในการวิเคราะห์บริการการกำหนดเส้นทาง",
    "directionLengthUnit": "หน่วยความยาวของทิศทาง",
    "unitsForRouteHintText": "คำแนะนำ : ใช้เพื่อแสดงผล หน่วยรายงานของเส้นทาง",
    "selectRouteSymbol": "เลือกสัญลักษณ์เพื่อแสดงเส้นทาง",
    "routeSymbolHintText": "คำแนะนำ : ใช้เพื่อแสดงผลสัญลักษณ์ข้อมูลเส้นสำหรับเส้นทาง",
    "routingDisabledMsg": "เพื่อเปิดการแสดงเส้นทาง ให้แน่ใจว่า ได้ตั้งค่า เส้นทาง ให้กับ ArcGIS Online เรียบร้อยแล้ว"
  },
  "networkServiceChooser": {
    "arcgislabel": "เพิ่มจาก ArcGIS Online",
    "serviceURLabel": "เพิ่ม Service URL",
    "routeURL": "เส้นทาง URL",
    "validateRouteURL": "การตรวจสอบ",
    "exampleText": "ตัวอย่าง",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "ระบุค่าที่ถูกต้องสำหรับการบริการเส้นทาง",
    "rateLimitExceeded": "เกินขีดจำกัดทีทำได้ กรุณาลองใหม่อีกครั้ง",
    "errorInvokingService": "ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง"
  },
  "symbolPickerPreviewText": "ดูตัวอย่าง:",
  "showToolToSelectLabel": "ตั้งค่าปุ่มกำหนดตำแหน่ง",
  "showToolToSelectHintText": "คำแนะนำ: ให้ปุ่มกำหนดตำแหน่งบนแผนที่ แทนการกำหนดตำแหน่งโดยการกดที่แผนที่ เพื่อตั้งค่าทุกครั้ง"
});