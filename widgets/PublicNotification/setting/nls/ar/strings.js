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
    "title": "إعدادت البحث والنطاق المؤقت",
    "mainHint": "يمكنك تمكين عمليات البحث النصية للعناوين والمعالم وتحويل الشكل الهندسي رقميًا والتحميل."
  },
  "addressSourceSetting": {
    "title": "طبقات العنوان",
    "mainHint": "يمكنك تحديد طبقات التسمية المُرسَل إليه المتاحة."
  },
  "notificationSetting": {
    "title": "خيارات الإشعار",
    "mainHint": "يمكنك تحديد أنواع الإشعار المتاحة."
  },
  "groupingLabels": {
    "addressSources": "الطبقات المطلوب استخدامها لتحديد طبقات المرسل إليه",
    "averyStickersDetails": "ملصقات Avery(r)",
    "csvDetails": "ملف القيم المفصولة بفاصلة (CSV)",
    "drawingTools": "أدوات رسم لتحديد منطقة",
    "featureLayerDetails": "طبقة المعالم",
    "geocoderDetails": "المُكود الجغرافي",
    "labelFormats": "تنسيقات التسمية المتاحة",
    "printingOptions": "خيارات صفحات التسمية المطبوعة",
    "searchSources": "مصادر البحث",
    "stickerFormatDetails": "معلمات صفحة التسمية"
  },
  "hints": {
    "alignmentAids": "تمت إضافة علامات إلى صفحة التسمية لمساعدتك في محاذاة الصفحة مع الطباعة",
    "csvNameList": "قائمة مفصولة بفاصلة لأسماء حقول حساسة لحالة الأحرف",
    "horizontalGap": "مسافة بين جدولين متتالييين",
    "insetToLabel": "مسافة بين جانب تسمية وبداية النص",
    "labelFormatDescription": "كيف يتم تمثيل نمط التسمية في قائمة خيارات تنسيق عنصر واجهة المستخدم",
    "labelFormatDescriptionHint": "تلميح أداة لتوفير وصف في قائمة خيارات التنسيق",
    "labelHeight": "ارتفاع كل تسمية في الصفحة",
    "labelWidth": "عرض كل تسمية في الصفحة",
    "localSearchRadius": "يُحدد مُحيط المنطقة حول مركز الخريطة الحالية المستخدمة لتحسين رتبة مرشحي التكويد الجغرافي؛ حتى يتم إرجاع المرشحين الأقرب للموقع أولاً",
    "rasterResolution": "تُطابق 100 بكسل لكل بوصة تقريبًا دقة الشاشة، فكلما زادت الدقة، زادت الحاجة إلى مزيد من ذاكرة المستعرض، وتختلف المستعرضات في قدرتها على معالجة طلبات الذاكرة الكبيرة بشكل جيد.",
    "selectionListOfOptionsToDisplay": "يتم عرض العناصر التي تم فحصها كخيارات في عنصر واجهة المستخدم، ويمكنك تغيير الترتيب كما يلزم",
    "verticalGap": "المسافة بين تسميتين في عمود"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "مسافة النطاق المؤقت الافتراضي",
    "bufferUnits": "تحميل الوحدات المطلوب توفيرها في عنصر واجهة المستخدم",
    "countryRegionCodes": "كود البلد أو المنطقة",
    "description": "الوصف",
    "descriptionHint": "تلميح الوصف",
    "displayField": "عرض الحقل",
    "drawingToolsFreehandPolygon": "مضلع بخط اليد",
    "drawingToolsLine": "خط",
    "drawingToolsPoint": "نقطة",
    "drawingToolsPolygon": "مضلع",
    "drawingToolsPolyline": "متعدد الخطوط",
    "enableLocalSearch": "تمكين البحث المحلي",
    "exactMatch": "تطابق تام",
    "fontSizeAlignmentNote": "حجم خط الملاحظة بشأن هوامش الطباعة",
    "gridDarkness": "عتمة الشبكة",
    "gridlineLeftInset": "إدراج خطوط الشبكة اليسرى",
    "gridlineMajorTickMarksGap": "يقوم كل علامة صغيرة بتحديد كل",
    "gridlineMinorTickMarksGap": "يقوم كل علامة كبيرة بتحديد كل",
    "gridlineRightInset": "إدراج خطوط الشبكة اليمنى",
    "labelBorderDarkness": "عتمة حد التسمية",
    "labelBottomEdge": "الحافة السفلية للتسميات في الصفحة",
    "labelFontSize": "حجم الخط",
    "labelHeight": "ارتفاع التسمية",
    "labelHorizontalGap": "فجوة أفقية",
    "labelInitialInset": "إدراج إلى نص التسمية",
    "labelLeftEdge": "الحافة اليسرى للتسميات في الصفحة",
    "labelMaxLineCount": "الحد الأقصى لعدد الخطوط في التسمية",
    "labelPageHeight": "ارتفاع الصفحة",
    "labelPageWidth": "عرض الصفحة",
    "labelRightEdge": "الحافة اليمنى للتسميات في الصفحة",
    "labelsInAColumn": "عدد التسميات في العمود",
    "labelsInARow": "عدد التسميات في الصف",
    "labelTopEdge": "الحافة العلوية للتسميات في الصفحة",
    "labelVerticalGap": "فجوة رأسية",
    "labelWidth": "عرض التسمية",
    "limitSearchToMapExtent": "البحث في مدى الخريطة الحالي فقط",
    "maximumResults": "الحد الأقصى للنتائج",
    "maximumSuggestions": "الحد الأقصى من المقترحات",
    "minimumScale": "أدنى مقياس",
    "name": "الاسم",
    "percentBlack": "% أسود",
    "pixels": "بكسل",
    "pixelsPerInch": "بكسل لكل بوصة",
    "placeholderText": "النص النائب",
    "placeholderTextForAllSources": "نص العنصر النائب للبحث في كل المصادر",
    "radius": "نصف القطر",
    "rasterResolution": "دقة البيانات النقطية",
    "searchFields": "حقول البحث",
    "showAlignmentAids": "عرض مساعدات المحاذاة في الصفحة",
    "showGridTickMarks": "عرض علامات تحديد الشبكة",
    "showLabelOutlines": "عرض حدود التسمية",
    "showPopupForFoundItem": "عرض عناصر منبثقة للمعلم أو الموقع الذي يتم العثور عليه",
    "tool": "أدوات",
    "units": "وحدات",
    "url": "عنوان URL",
    "urlToGeometryService": "عنوان URL لخدمة الشكل الهندسي",
    "useRelatedRecords": "استخدام سجلاته المرتبطة",
    "useSecondarySearchLayer": "استخدام طبقة تحديد ثانوية",
    "useSelectionDrawTools": "استخدام أدوات رسم التحديد",
    "useVectorFonts": "استخدام خطوط البيانات الاتجاهية (خطوط لاتينية فقط)",
    "zoomScale": "تدرج التكبير/التصغير"
  },
  "buttons": {
    "addAddressSource": "إضافة طبقة تحتوي على تسميات عنوان في عنصرها المنبثق",
    "addLabelFormat": "إضافة تنسيق تسمية",
    "addSearchSource": "إضافة مصدر بحث",
    "set": "تعيين"
  },
  "placeholders": {
    "averyExample": "مثال، تسمية Avery(r) ${averyPartNumber}",
    "countryRegionCodes": "مثال، الولايات المتحدة، الصين",
    "descriptionCSV": "قيم مفصولة بفاصلة",
    "descriptionPDF": "تسمية PDF ${heightLabelIn} x ${widthLabelIn} بوصة، ${labelsPerPage} لكل صفحة"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "تلحصول على طبقة معالم من خريطة الويب",
    "openCountryCodes": "انقر للحصول على مزيد من المعلومات بشأن الأكواد",
    "openFieldSelector": "انقر لفتح أداة تحديد الحقل",
    "setAndValidateURL": "تعيين والتحقق من صحة عنوان URL"
  },
  "problems": {
    "noAddresseeLayers": "يرجى تحديد طبقة مُرسَل إليها واحدة على الأقل",
    "noBufferUnitsForDrawingTools": "يرجى تكوين وحدة نطاق واحدة على الأقل لأدوات الرسم",
    "noBufferUnitsForSearchSource": "يرجى تكوين وحدة نطاق واحدة على الأقل لمصدر البحث \"${sourceName}\"",
    "noGeometryServiceURL": "يرجى تكوين عنوان URL لخدمة الشكل الهندسي",
    "noNotificationLabelFormats": "يرجى تحديد تنسيق تسمية إشعار واحد على الأقل.",
    "noSearchSourceFields": "يرجى تكوين حقل بحث واحد أو أكثر لمصدر البحث \"${sourceName}\"",
    "noSearchSourceURL": "يرجى تكوين عنوان URL لمصدر البحث \"${sourceName}\""
  }
});