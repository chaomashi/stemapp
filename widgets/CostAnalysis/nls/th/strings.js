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
  "_widgetLabel": "การวิเคราะห์ต้นทุนรุ่นเบต้า",
  "unableToFetchInfoErrMessage": "ไม่สามารถเรียกข้อมูลบริการเรขาคณิต/รายละเอียดชั้นข้อมูลที่กำหนดค่า",
  "invalidCostingGeometryLayer": "ไม่สามารถรับ 'esriFieldTypeGlobalID' ในชั้นข้อมูลเรขาคณิตของต้นทุน",
  "projectLayerNotFound": "ไม่สามารถค้นหาชั้นข้อมูลโครงการที่กำหนดค่าในแผนที่",
  "costingGeometryLayerNotFound": "ไม่สามารถค้นหาชั้นข้อมูลเรขาคณิตของต้นทุนที่กำหนดค่าในแผนที่",
  "projectMultiplierTableNotFound": "ไม่สามารถค้นหาตารางต้นทุนเพิ่มเติมของตัวคูณโครงการที่กำหนดค่าในแผนที่",
  "projectAssetTableNotFound": "ไม่สามารถค้นหาตารางสินทรัพย์ของโครงการที่กำหนดค่าในแผนที่",
  "createLoadProject": {
    "createProjectPaneTitle": "สร้างโปรเจค",
    "loadProjectPaneTitle": "โหลดโครงการ",
    "projectNamePlaceHolder": "ชื่อโครงการ",
    "projectDescPlaceHolder": "รายละเอียดโครงการ",
    "selectProject": "เลือกโครงการ",
    "viewInMapLabel": "ดูในแผนที่",
    "loadLabel": "โหลด",
    "createLabel": "สร้าง",
    "deleteProjectConfirmationMsg": "คุณแน่ใจหรือว่าต้องการลบโครงการ",
    "noAssetsToViewOnMap": "โครงการที่เลือกไม่มีสินทรัพย์ใด ๆ เพื่อดูบนแผนที่",
    "projectDeletedMsg": "ลบโครงการเรียบร้อยแล้ว",
    "errorInCreatingProject": "เกิดข้อผิดพลาดในการสร้างโครงการ",
    "errorProjectNotFound": "ไม่พบโครงการ",
    "errorInLoadingProject": "โปรดตรวจสอบว่าเลือกโครงการที่ถูกต้องหรือไม่",
    "errorProjectNotSelected": "เลือกโครงการจากเมนูแบบเลื่อนลง",
    "errorDuplicateProjectName": "มีชื่อโครงการอยู่แล้ว"
  },
  "statisticsSettings": {
    "tabTitle": "การตั้งค่าสถิติ",
    "addStatisticsLabel": "เพิ่มข้อมูลสถิติ",
    "addNewStatisticsText": "เพิ่มข้อมูลสถิติใหม่",
    "deleteStatisticsText": "ลบข้อมูลสถิติ",
    "moveStatisticsUpText": "ย้ายข้อมูลสถิติขึ้น",
    "moveStatisticsDownText": "ย้ายข้อมูลสถิติลง",
    "layerNameTitle": "ชั้นข้อมูล",
    "statisticsTypeTitle": "ชนิด",
    "fieldNameTitle": "ฟิลด์",
    "statisticsTitle": "ป้ายชื่อ",
    "actionLabelTitle": "การดำเนินการ",
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
  },
  "costingInfo": {
    "noEditableLayersAvailable": "ต้องทำเครื่องหมายชั้นข้อมูลเป็นแก้ไขได้ในแท็บการตั้งค่าชั้นข้อมูล"
  },
  "workBench": {
    "refresh": "รีเฟรช",
    "noAssetAddedMsg": "ไม่มีการเพิ่มสินทรัพย์",
    "units": "หน่วย",
    "assetDetailsTitle": "แสดงรายการสินทรัพย์",
    "costEquationTitle": "สมการต้นทุน",
    "newCostEquationTitle": "สมการใหม่",
    "defaultCostEquationTitle": "สมการเริ่มต้น",
    "geographyTitle": "ภูมิศาสตร์",
    "scenarioTitle": "สถานการณ์",
    "costingInfoHintText": "<div>คำแนะนำ: ใช้คำหลักต่อไปนี้</div><ul><li><b>{TOTALCOUNT}</b>: ใช้จำนวนรวมของสินทรัพย์ประเภทเดียวกันในภูมิศาสตร์</li> <li><b>{MEASURE}</b>: ใช้ความยาวสำหรับสินทรัพย์ของสายงานและพื้นที่สำหรับสินทรัพย์ของพื้นที่</li><li><b>{TOTALMEASURE}</b>: ใช้ความยาวรวมสำหรับสินทรัพย์ของสายงานและพื้นที่รวมสำหรับสินทรัพย์ของพื้นที่ของประเภทเดียวกันในภูมิศาสตร์</li></ul> คุณสามารถใช้ฟังก์ชัน เช่น:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>โปรดแก้ไขสมการต้นทุนตามความต้องการของโครงการของคุณ",
    "zoomToAsset": "ซูมที่สินทรัพย์",
    "deleteAsset": "ลบสินทรัพย์",
    "closeDialog": "ปิดหน้าต่าง",
    "objectIdColTitle": "ID ออบเจ็กต์",
    "costColTitle": "ต้นทุน",
    "errorInvalidCostEquation": "สมการต้นทุนไม่ถูกต้อง",
    "errorInSavingAssetDetails": "ไม่สามารถบันทึกรายละเอียดสินทรัพย์ได้"
  },
  "assetDetails": {
    "inGeography": " ใน ${geography} ",
    "withScenario": " มี ${scenario}",
    "totalCostTitle": "ต้นทุนทั้งหมด",
    "additionalCostLabel": "คำอธิบาย",
    "additionalCostValue": "มูลค่า",
    "additionalCostNetValue": "ค่าสุทธิ"
  },
  "projectOverview": {
    "assetItemsTitle": "รายการสินทรํพย์",
    "assetStatisticsTitle": "ข้อมูลสถิติสินทรัพย์",
    "projectSummaryTitle": "สรุปโครงการ",
    "projectName": "ชื่อโครงการ: ${name}",
    "totalCostLabel": "ต้นทุนโครงการทั้งหมด (*):",
    "grossCostLabel": "ต้นทุนโครงการรวม (*):",
    "roundingLabel": "* ปัดเศษเป็น '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "ไม่สามารถบันทึกขอบเขตโครงการในชั้นข้อมูลโครงการ",
    "unableToSaveProjectCost": "ไม่สามารถบันทึกต้นทุนในชั้นข้อมูลโครงการได้",
    "roundCostValues": {
      "twoDecimalPoint": "จุดทศนิยมสองจุด",
      "nearestWholeNumber": "จำนวนเต็มที่ใกล้เคียงที่สุด",
      "nearestTen": "ใกล้เคียงหลักสิบที่สุด",
      "nearestHundred": "ใกล้เคียงหลักร้อยที่สุด",
      "nearestThousand": "ใกล้เคียงหลักพันที่สุด",
      "nearestTenThousands": "ใกล้เคียงหลักหมื่นที่สุด"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "ลักษณะของโครงการ",
    "projectAttributeTitle": "แก้ไขลักษณะของโครงการ"
  },
  "costEscalation": {
    "costEscalationLabel": "เพิ่มต้นทุนเพิ่มเติม",
    "valueHeader": "มูลค่า",
    "addCostEscalationText": "เพิ่มต้นทุนเพิ่มเติม",
    "deleteCostEscalationText": "ลบต้นทุนเพิ่มเติมที่เลือก",
    "moveCostEscalationUpText": "ย้ายต้นทุนเพิ่มเติมที่เลือกขึ้น",
    "moveCostEscalationDownText": "ย้ายต้นทุนเพิ่มเติมที่เลือกลง",
    "invalidEntry": "มีอย่างน้อยหนึ่งรายการไม่ถูกต้อง",
    "errorInSavingCostEscalation": "ไม่สามารถบันทึกรายละเอียดต้นทุนเพิ่มเติม"
  },
  "scenarioSelection": {
    "popupTitle": "เลือกสถานการณ์สำหรับสินทรัพย์",
    "regionLabel": "ภูมิศาสตร์",
    "scenarioLabel": "สถานการณ์",
    "noneText": "ไม่มีเลย",
    "copyFeatureMsg": "คุณต้องการคัดลอกฟีเจอร์ที่เลือกหรือไม่"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "ข้อมูลสถิติรายละเอียด",
    "noDetailStatisticAvailable": "ไม่มีการเพิ่มข้อมูลสถิติของสินทรัพย์"
  }
});