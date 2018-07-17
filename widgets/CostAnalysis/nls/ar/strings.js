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
  "_widgetLabel": "تحليل التكلفة بيتا",
  "unableToFetchInfoErrMessage": "يتعذر جلب تفاصيل خدمة الشكل الهندسي/الطبقة المكونة",
  "invalidCostingGeometryLayer": "يتعذر الحصول على 'esriFieldTypeGlobalID' في طبقة الشكل الهندسي للتكلفة.",
  "projectLayerNotFound": "يتعذر العثور على طبقة المشروع المكون في الخريطة.",
  "costingGeometryLayerNotFound": "يتعذر العثور على طبقة الشكل الهندسي المكون للتكلفة في الخريطة.",
  "projectMultiplierTableNotFound": "يتعذر العثور على جدول التكلفة الإضافية لمضاعف المشروع المُكوَّن في الخريطة.",
  "projectAssetTableNotFound": "يتعذر العثور على جدول أصل المشروع المكون في الخريطة.",
  "createLoadProject": {
    "createProjectPaneTitle": "إنشاء مشروع",
    "loadProjectPaneTitle": "تحميل المشروع",
    "projectNamePlaceHolder": "اسم المشروع",
    "projectDescPlaceHolder": "وصف المشروع",
    "selectProject": "تحديد مشروع",
    "viewInMapLabel": "عرض في الخرائط",
    "loadLabel": "تحميل",
    "createLabel": "إنشاء",
    "deleteProjectConfirmationMsg": "هل تريد بالتأكيد حذف المشروع؟",
    "noAssetsToViewOnMap": "لا يحتوي المشروع المحدد على أي أصول لعرضها على الخريطة.",
    "projectDeletedMsg": "تم حذف المشروع بنجاح.",
    "errorInCreatingProject": "خطأ في إنشاء المشروع.",
    "errorProjectNotFound": "لم يتم العثور على المشروع.",
    "errorInLoadingProject": "يرجى التحقق من تحديد مشروع صحيح.",
    "errorProjectNotSelected": "حدد مشروعًا من القائمة المنسدلة",
    "errorDuplicateProjectName": "اسم المشروع موجود بالفعل."
  },
  "statisticsSettings": {
    "tabTitle": "إعدادات الإحصائيات",
    "addStatisticsLabel": "إضافة الإحصائيات",
    "addNewStatisticsText": "إضافة إحصائيات جديدة",
    "deleteStatisticsText": "حذف الإحصائيات",
    "moveStatisticsUpText": "نقل الإحصائيات إلى الأعلى",
    "moveStatisticsDownText": "نقل الإحصائيات إلى الأسفل",
    "layerNameTitle": "طبقة",
    "statisticsTypeTitle": "النوع",
    "fieldNameTitle": "حقل",
    "statisticsTitle": "التسمية",
    "actionLabelTitle": "إجراءات",
    "selectDeselectAllTitle": "تحديد الكل"
  },
  "statisticsType": {
    "countLabel": "العدد",
    "averageLabel": "المتوسط",
    "maxLabel": "الحد الأقصى",
    "minLabel": "الحد الأدنى",
    "summationLabel": "الجمع",
    "areaLabel": "المنطقة",
    "lengthLabel": "الطول"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "يجب التأشير على الطبقات كطبقات قابلة للتحرير في علامة تبويب إعدادات الطبقة"
  },
  "workBench": {
    "refresh": "تحديث",
    "noAssetAddedMsg": "لم تتم إضافة أي أصول",
    "units": "الوحدات",
    "assetDetailsTitle": "تفاصيل عنصر الأصل",
    "costEquationTitle": "معادلة التكلفة",
    "newCostEquationTitle": "معادلة جديدة",
    "defaultCostEquationTitle": "المعادلة الافتراضية",
    "geographyTitle": "الجغرافيا",
    "scenarioTitle": "سيناريو",
    "costingInfoHintText": "<div>تلميح: استخدم الكلمات الأساسية التالية </div><ul><li><b>{TOTALCOUNT}</b>: يستخدم إجمالي عدد نفس أصل النوع في الجغرافيا</li><li><b>{MEASURE}</b>: يستخدم طول أصل ومنطقة الخط لأصل المضلع</li><li><b>{TOTALMEASURE}</b>: يستخدم إجمالي طول أصل الخط وإجمالي منطقة أصل المضلع لنفس النوع في الجغرافيا</li></ul> يمكنك استخدام دوال مثل:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>يرجى تحرير معادلة التكلفة بحسب احتياج المشروع.",
    "zoomToAsset": "تكبير/تصغير الأصل",
    "deleteAsset": "حذف الأصل",
    "closeDialog": "مربع حوار الإغلاق",
    "objectIdColTitle": "معرف الكائن",
    "costColTitle": "التكلفة",
    "errorInvalidCostEquation": "معادلة التكلفة غير صحيحة.",
    "errorInSavingAssetDetails": "يتعذر حفظ تفاصيل الأصل."
  },
  "assetDetails": {
    "inGeography": " في ${geography} ",
    "withScenario": " مع ${scenario}",
    "totalCostTitle": "التكلفة الإجمالية",
    "additionalCostLabel": "الوصف",
    "additionalCostValue": "قيمة",
    "additionalCostNetValue": "صافي القيمة"
  },
  "projectOverview": {
    "assetItemsTitle": "عناصر الأصل",
    "assetStatisticsTitle": "إحصائيات الأصل",
    "projectSummaryTitle": "ملخص المشروع",
    "projectName": "اسم المشروع: ${name}",
    "totalCostLabel": "إجمالي تكلفة المشروع (*):",
    "grossCostLabel": "صافي تكلفة المشروع (*):",
    "roundingLabel": "* تقريب إلى '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "يتعذر حفظ حدود المشروع في طبقة مشروع.",
    "unableToSaveProjectCost": "يتعذر حفظ التكاليف في طبقة مشروع.",
    "roundCostValues": {
      "twoDecimalPoint": "نقطتان عشريتان",
      "nearestWholeNumber": "أقرب رقم كلي",
      "nearestTen": "أقرب عشرة",
      "nearestHundred": "أقرب مئة",
      "nearestThousand": "أقرب آلاف",
      "nearestTenThousands": "أقرب عشرات آلاف"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "جدول بيانات المشروع",
    "projectAttributeTitle": "تحرير البيانات الجدولية للمشروع"
  },
  "costEscalation": {
    "costEscalationLabel": "إضافة تكلفة إضافية",
    "valueHeader": "قيمة",
    "addCostEscalationText": "إضافة تكلفة إضافية",
    "deleteCostEscalationText": "حذف التكلفة الإضافية المحددة",
    "moveCostEscalationUpText": "نقل التكلفة الإضافية المحددة إلى الأعلى",
    "moveCostEscalationDownText": "نقل التكلفة الإضافية المحددة إلى الأسفل",
    "invalidEntry": "يوجد إدخال واحد أو أكثر غير صحيح.",
    "errorInSavingCostEscalation": "يتعذر حفظ تفاصيل التكلفة الإضافية."
  },
  "scenarioSelection": {
    "popupTitle": "حدد سيناريو الأصل",
    "regionLabel": "الجغرافيا",
    "scenarioLabel": "سيناريو",
    "noneText": "لا شيء",
    "copyFeatureMsg": "هل تريد نسخ المعالم المحددة؟"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "إحصائيات مفصلة",
    "noDetailStatisticAvailable": "لم تتم إضافة إحصائيات الأصل"
  }
});