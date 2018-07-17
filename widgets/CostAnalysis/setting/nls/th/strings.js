///////////////////////////////////////////////////////////////////////////
// Copyright © 2017 Esri. All Rights Reserved.
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
  "configText": "ตั้งค่าข้อความ config:",
  "generalSettings": {
    "tabTitle": "การคั้งค่าทั่วไป",
    "measurementUnitLabel": "หน่วยการวัด",
    "currencyLabel": "สัญลักษณ์การวัด",
    "roundCostLabel": "ปัดเศษต้นทุน",
    "projectOutputSettings": "การตั้งค่าผลลัพธ์ของโครงการ",
    "typeOfProjectAreaLabel": "ประเภทพื้นที่ของโครงการ",
    "bufferDistanceLabel": "ระยะทางขยายออกไป",
    "roundCostValues": {
      "twoDecimalPoint": "จุดทศนิยมสองจุด",
      "nearestWholeNumber": "จำนวนเต็มที่ใกล้เคียงที่สุด",
      "nearestTen": "ใกล้เคียงหลักสิบที่สุด",
      "nearestHundred": "ใกล้เคียงหลักร้อยที่สุด",
      "nearestThousand": "ใกล้เคียงหลักพันที่สุด",
      "nearestTenThousands": "ใกล้เคียงหลักหมื่นที่สุด"
    },
    "projectAreaType": {
      "outline": "โครงร่าง",
      "buffer": "ระยะบัฟเฟอร์"
    },
    "errorMessages": {
      "currency": "หน่วยสกุลเงินไม่ถูกต้อง",
      "bufferDistance": "ระยะห่างบัฟเฟอร์ไม่ถูกต้อง",
      "outOfRangebufferDistance": "ค่าควรมากกว่า 0 และน้อยกว่าหรือเท่ากับ 100"
    }
  },
  "projectSettings": {
    "tabTitle": "การตั้งค่าโครงการ",
    "costingGeometrySectionTitle": "กำหนดภูมิศาสตร์สำหรับการคิดต้นทุน (ไม่บังคับ)",
    "costingGeometrySectionNote": "หมายเหตุ: การกำหนดค่าชั้นข้อมูลนี้จะทำให้ผู้ใช้สามารถกำหนดสมการต้นทุนของเทมเพลตฟีเจอร์ตามภูมิศาสตร์ได้",
    "projectTableSectionTitle": "ความสามารถในการบันทึก/โหลดการตั้งค่าโครงการ (ไม่บังคับ)",
    "projectTableSectionNote": "หมายเหตุ: การกำหนดค่าตารางและชั้นข้อมูลทั้งหมดจะช่วยให้ผู้ใช้สามารถบันทึก/โหลดโครงการเพื่อใช้ในภายหลังได้",
    "costingGeometryLayerLabel": "ชั้นข้อมูลเรขาคณิตของต้นทุน",
    "fieldLabelGeography": "ฟิลด์ภูมิศาสตร์ป้าย",
    "projectAssetsTableLabel": "ตารางสินทรัพย์ของโครงการ",
    "projectMultiplierTableLabel": "ตารางต้นทุนเพิ่มเติมสำหรับตัวคูณโครงการ",
    "projectLayerLabel": "ชั้นข้อมูลของของโครงการ",
    "configureFieldsLabel": "กำหนดค่าฟิลด์",
    "fieldDescriptionHeaderTitle": "คำอธิบายฟิลด์",
    "layerFieldsHeaderTitle": "ฟิลด์ชั้นข้อมูล",
    "selectLabel": "เลือก",
    "errorMessages": {
      "duplicateLayerSelection": "มีการเลือก ${layerName} แล้ว",
      "invalidConfiguration": "โปรดเลือก ${fieldsString}"
    },
    "costingGeometryHelp": "<p>ชั้นข้อมูลรูปหลายเหลี่ยมที่มีเงื่อนไขต่อไปนี้จะแสดงขึ้น: <br/> <li>\tชั้นข้อมูลต้องมีความสามารถ â€œQueryâ€</li><li>\tชั้นข้อมูลต้องมีฟิลด์ GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>ฟิลด์สตริงและตัวเลขของ â€œCosting Geometry Layerâ€ ที่เลือกจะแสดงขึ้นในเมนูแบบเลื่อนลง â€œField to Label Geographyâ€</p>",
    "projectAssetsTableHelp": "<p>ตารางที่มีเงื่อนไขต่อไปนี้จะแสดงขึ้น: <br/> <li>ตารางต้องมีความสามารถในการแก้ไขคือ â€œCreateâ€, â€œDeleteâ€ และ â€œUpdateâ€</li>    <li>ตารางต้องมีหกฟิลด์ที่มีชื่อและประเภทข้อมูลที่แน่นอน:</li><ul><li>\tAssetGUID (ฟิลด์ประเภทของ GUID)</li><li>\tCostEquation (ฟิลด์ประเภทสตริง)</li><li>\tสถานการณ์ (ฟิลด์ประเภทสตริง)</li><li>\tTemplateName (ฟิลด์ประเภทสตริง)</li><li>    GeographyGUID (ฟิลด์ประเภทของ GUID)</li><li>\tProjectGUID (ฟิลด์ประเภทของ GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>ตารางที่มีเงื่อนไขต่อไปนี้จะแสดงขึ้น: <br/> <li>ตารางต้องมีความสามารถในการแก้ไขคือ â€œCreateâ€, â€œDeleteâ€ และ â€œUpdateâ€</li>    <li>ตารางต้องมีห้าฟิลด์ที่มีชื่อและประเภทข้อมูลที่แน่นอน:</li><ul><li>\tคำอธิบาย (ฟิลด์ประเภทสตริง)</li><li>\tประเภท (ฟิลด์ประเภทสตริง)</li><li>\tค่า (ฟิลด์ประเภท Float/Double)</li><li>\tCostindex (ฟิลด์ประเภทจำนวนเต็ม)</li><li>   \tProjectGUID (ฟิลด์ประเภทของ GUID))</li></ul> </p>",
    "projectLayerHelp": "<p>ชั้นข้อมูลรูปหลายเหลี่ยมที่มีเงื่อนไขต่อไปนี้จะแสดงขึ้น: <br/> <li>ตารางต้องมีความสามารถในการแก้ไขคือ â€œCreateâ€, â€œDeleteâ€ และ â€œUpdateâ€</li>    <li>ชั้นข้อมูลต้องมีห้าฟิลด์ที่มีชื่อและประเภทข้อมูลที่แน่นอน:</li><ul><li>ProjectName (ฟิลด์ประเภทสตริง)</li><li>คำอธิบาย (ฟิลด์ประเภทสตริง)</li><li>Totalassetcost (ฟิลด์ประเภท Float/Double)</li><li>Grossprojectcost (ฟิลด์ประเภท Float/Double)</li><li>GlobalID (ฟิลด์ประเภท GlobalID)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "การตั้งค่าเลเยอร์",
    "layerNameHeaderTitle": "ชื่อชั้นข้อมูล",
    "layerNameHeaderTooltip": "รายการชั้นข้อมูลในแผนที่",
    "EditableLayerHeaderTitle": "ที่สามารถแก้ไขได้",
    "EditableLayerHeaderTooltip": "รวมชั้นข้อมูลและเทมเพลตในวิดเจ็ตการคิดต้นทุน",
    "SelectableLayerHeaderTitle": "ที่สามารถเลือกได้",
    "SelectableLayerHeaderTooltip": "สามารถใช้เรขาคณิตจากฟีเจอร์ในการสร้างรายการต้นทุนใหม่ได้",
    "fieldPickerHeaderTitle": "รหัสโครงการ (ไม่บังคับ)",
    "fieldPickerHeaderTooltip": "ฟิลด์ที่ไม่บังคับต้องระบุ (ของประเภทสตริง) เพื่อจัดเก็บรหัสโครงการใน",
    "selectLabel": "เลือก",
    "noAssetLayersAvailable": "ไม่พบชั้นข้อมูลสินทรัพย์ในเว็บแมพที่เลือก",
    "disableEditableCheckboxTooltip": "ชั้นข้อมูลนี้ไม่มีความสามารถในการแก้ไข",
    "missingCapabilitiesMsg": "ชั้นข้อมูลนี้ขาดความสามารถต่อไปนี้:",
    "missingGlobalIdMsg": "ชั้นข้อมูลนี้ไม่มีฟิลด์ GlobalId",
    "create": "สร้าง",
    "update": "อัพเดท",
    "delete": "ลบ"
  },
  "costingInfo": {
    "tabTitle": "ข้อมูลต้นทุน",
    "proposedMainsLabel": "ข้อมูลหลักที่เสนอ",
    "addCostingTemplateLabel": "เพิ่มเทมเพลตต้นทุน",
    "manageScenariosTitle": "จัดการสถานการณ์",
    "featureTemplateTitle": "เทมเพลตฟีเจอร์",
    "costEquationTitle": "สมการต้นทุน",
    "geographyTitle": "ภูมิศาสตร์",
    "scenarioTitle": "สถานการณ์",
    "actionTitle": "การดำเนินการ",
    "scenarioNameLabel": "ชื่อสถานการณ์",
    "addBtnLabel": "เพิ่ม",
    "srNoLabel": "ลำดับที่",
    "deleteLabel": "ลบ",
    "duplicateScenarioName": "ชื่อสถานการณ์ซ้ำกัน",
    "hintText": "<div>คำแนะนำ: ใช้คำหลักต่อไปนี้</div><ul><li><b>{TOTALCOUNT}</b>: ใช้จำนวนรวมของสินทรัพย์ประเภทเดียวกันในภูมิศาสตร์</li> <li><b>{MEASURE}</b>: ใช้ความยาวสำหรับสินทรัพย์ของสายงานและพื้นที่สำหรับสินทรัพย์ของพื้นที่</li><li><b>{TOTALMEASURE}</b>: ใช้ความยาวรวมสำหรับสินทรัพย์ของสายงานและพื้นที่รวมสำหรับสินทรัพย์ของพื้นที่ของประเภทเดียวกันในภูมิศาสตร์</li></ul> คุณสามารถใช้ฟังก์ชัน เช่น:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>โปรดแก้ไขสมการต้นทุนตามความต้องการของโครงการของคุณ",
    "noneValue": "ไม่มีเลย",
    "requiredCostEquation": "สมการต้นทุนไม่ถูกต้องสำหรับ ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "มีรายการเทมเพลตที่ซ้ำกันสำหรับ ${layerName} : ${templateName}",
    "defaultEquationRequired": "จำเป็นต้องใช้สมการเริ่มต้นสำหรับ ${layerName} : ${templateName}",
    "validCostEquationMessage": "โปรดป้อนสมการต้นทุนที่ถูกต้อง",
    "costEquationHelpText": "โปรดแก้ไขสมการต้นทุนตามความต้องการของโครงการของคุณ",
    "scenarioHelpText": "โปรดเลือกสถานการณ์ตามความต้องการของโครงการของคุณ",
    "copyRowTitle": "คัดลอกแถว",
    "noTemplateAvailable": "โปรดเพิ่มเทมเพลตอย่างน้อยหนึ่งรายการสำหรับ ${layerName}",
    "manageScenarioLabel": "จัดการสถานการณ์",
    "noLayerMessage": "โปรดใส่ชั้นข้อมูลอย่างน้อยหนึ่งรายการ ${tabName}",
    "noEditableLayersAvailable": "ต้องทำเครื่องหมายชั้นข้อมูลเป็นแก้ไขได้ในแท็บการตั้งค่าชั้นข้อมูล"
  },
  "statisticsSettings": {
    "tabTitle": "การตั้งค่าสถิติ",
    "addStatisticsLabel": "เพิ่มข้อมูลสถิติ",
    "fieldNameTitle": "ฟิลด์",
    "statisticsTitle": "ป้ายชื่อ",
    "addNewStatisticsText": "เพิ่มข้อมูลสถิติใหม่",
    "deleteStatisticsText": "ลบข้อมูลสถิติ",
    "moveStatisticsUpText": "ย้ายข้อมูลสถิติขึ้น",
    "moveStatisticsDownText": "ย้ายข้อมูลสถิติลง",
    "selectDeselectAllTitle": "เลือกทั้งหมด"
  },
  "statisticsType": {
    "countLabel": "นับ",
    "averageLabel": "เฉลี่ย",
    "maxLabel": "สูงสุด",
    "minLabel": "น้อยสุด",
    "summationLabel": "ผลรวม",
    "areaLabel": "พื้นที่",
    "lengthLabel": "ความยาว"
  }
});