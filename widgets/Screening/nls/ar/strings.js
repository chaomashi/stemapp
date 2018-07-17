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
  "_widgetLabel": "تصفية الصورة",
  "geometryServicesNotFound": "خدمة الشكل الهندسي غير متاحة.",
  "unableToDrawBuffer": "يتعذر رسم النطاق المؤقت. يرجى إعادة المحاولة.",
  "invalidConfiguration": "تكوين غير صحيح.",
  "clearAOIButtonLabel": "البدء من جديد",
  "noGraphicsShapefile": "لا يحتوي ملف الأشكال الذي تم تحميله على رسومات.",
  "zoomToLocationTooltipText": "تكبير/ تصغير الموقع",
  "noGraphicsToZoomMessage": "لم يتم العثور على رسومات لتكبيرها.",
  "placenameWidget": {
    "placenameLabel": "البحث عن موقع"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "تحديد وضع الرسم",
    "toggleSelectability": "انقر لتبديل إمكانية التحديد",
    "chooseLayerTitle": "اختر طبقة قابلة للتحديد",
    "selectAllLayersText": "تحديد الكل",
    "layerSelectionWarningTooltip": "ينبغي تحديد طبقة واحدة على الأقل لإنشاء AOI"
  },
  "shapefileWidget": {
    "shapefileLabel": "تحميل ملف الأشكال المضغوط",
    "uploadShapefileButtonText": "تحميل",
    "unableToUploadShapefileMessage": "يتعذر تحميل ملف الأشكال."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "تحديد نقطة البداية",
    "addButtonTitle": "إضافة",
    "deleteButtonTitle": "إزالة",
    "mapTooltipForStartPoint": "انقر على الخريطة لتحديد نقطة بداية",
    "mapTooltipForUpdateStartPoint": "انقر على الخريطة لتحديث نقطة بداية",
    "locateText": "تحديد موقع",
    "locateByMapClickText": "حدد الإحداثيات الأولية",
    "enterBearingAndDistanceLabel": "أدخل المحمل والمسافة من نقطة البداية",
    "bearingTitle": "زاوية بعد",
    "distanceTitle": "المسافة",
    "planSettingTooltip": "إعدادات الخطة",
    "invalidLatLongMessage": "يرجى إدخال قيم صحيحة."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "مسافة النطاق (اختياري)",
    "bufferInputLabel": "إظهار النتائج ضمن"
  },
  "traverseSettings": {
    "bearingLabel": "زاوية بعد",
    "lengthLabel": "الطول",
    "addButtonTitle": "إضافة",
    "deleteButtonTitle": "إزالة"
  },
  "planSettings": {
    "expandGridTooltipText": "توسيع الشبكة",
    "collapseGridTooltipText": "طي الشبكة",
    "directionUnitLabelText": "وحدة الاتجاهات",
    "distanceUnitLabelText": "وحدات المسافة والطول",
    "planSettingsComingSoonText": "قريبًا"
  },
  "newTraverse": {
    "invalidBearingMessage": "محمل غير صحيح.",
    "invalidLengthMessage": "طول غير صحيح.",
    "negativeLengthMessage": "الطول السلبي"
  },
  "reportsTab": {
    "aoiAreaText": "منطقة AOI",
    "downloadButtonTooltip": "تحميل",
    "printButtonTooltip": "طباعة",
    "uploadShapefileForAnalysisText": "تحميل ملف الأشكال لتضمينه في التحليل",
    "uploadShapefileForButtonText": "استعراض",
    "downloadLabelText": "تحديد التنسيق:",
    "downloadBtnText": "تحميل",
    "noDetailsAvailableText": "لم يتم العثور على نتائج",
    "featureCountText": "عدد",
    "featureAreaText": "المنطقة",
    "featureLengthText": "الطول",
    "attributeChooserTooltip": "اختر البيانات الجدولية المراد عرضها",
    "csv": "CSV",
    "filegdb": "قاعدة البيانات الجغرافية الملفية",
    "shapefile": "ملف شكل",
    "noFeaturesFound": "لم يتم العثور على نتائج لتنسيق الملف المحدد",
    "selectReportFieldTitle": "تحديد حقول",
    "noFieldsSelected": "لم يتم تحديد حقول",
    "intersectingFeatureExceedsMsgOnCompletion": "لقد تم الوصول إلى أقص عدد للسجلات لطبقة واحدة أو أكثر.",
    "unableToAnalyzeText": "يتعذر التحليل، تم الوصول إلى أقصى عدد للسجلات.",
    "errorInPrintingReport": "يتعذر طباعة التقرير. الرجاء التحقق مما إذا كانت إعدادات التقرير صحيحة.",
    "aoiInformationTitle": "معلومات منطقة الاهتمام (AOI)",
    "summaryReportTitle": "ملخص",
    "notApplicableText": "غير متوفر",
    "downloadReportConfirmTitle": "تأكيد التنزيل",
    "downloadReportConfirmMessage": "هل تريد بالتأكيد التنزيل؟",
    "noDataText": "لا توجد بيانات",
    "createReplicaFailedMessage": "فشل عملية التنزيل للطبقات التالية : <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "فشل عملية التنزيل.",
    "printLayoutLabelText": "تخطيط",
    "printBtnText": "طباعة",
    "printDialogHint": "ملحوظة: يمكن تحرير عنوان التقرير والمكونات في معاينة التقرير.",
    "unableToDownloadFileGDBText": "يتعذر تنزيل قاعدة البيانات الجغرافية الملفية لمنطقة الاهتمام (AOI) التي تتضمن مواقع النقطة أو الخط",
    "unableToDownloadShapefileText": "يتعذر تنزيل ملف الأشكال لمنطقة الاهتمام (AOI) التي تتضمن مواقع النقطة أو الخط",
    "analysisUnitLabelText": "عرض النتائج في:",
    "analysisUnitButtonTooltip": "اختر وحدات التحليل",
    "analysisCloseBtnText": "إغلاق",
    "feetUnit": "قدم / قدم مربع",
    "milesUnit": "ميل / أكر",
    "metersUnit": "متر / متر مربع",
    "kilometersUnit": "كيلومتر/ كيلومتر مربع",
    "hectaresUnit": "كيلومتر / هكتار",
    "hectaresAbbr": "هيكتار",
    "layerNotVisibleText": "يتعذر التحليل بسبب إيقاف تشغيل الطبقة أو أنها خارج مقياس نطاق الرؤية.",
    "refreshBtnTooltip": "تحديث التقرير",
    "featureCSVAreaText": "المنطقة المتقاطعة",
    "featureCSVLengthText": "الطول المتقاطع",
    "errorInFetchingPrintTask": "حَدَثَ خطأ أثناء إحضار معلومات مهمة الطباعة. يرجى إعادة المحاولة."
  }
});