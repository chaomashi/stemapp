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
      "displayText": "أميال",
      "acronym": "أميال"
    },
    "kilometers": {
      "displayText": "كيلومترات",
      "acronym": "كيلومتر"
    },
    "feet": {
      "displayText": "قدم",
      "acronym": "قدم"
    },
    "meters": {
      "displayText": "أمتار",
      "acronym": "متر"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "البحث في إعدادات المصدر",
    "searchSourceSettingTitle": "البحث في إعدادات المصدر",
    "searchSourceSettingTitleHintText": "أضف خدمات التكويد الجغرافي أو طبقات المعالم وقم بتكوينها كمصادر للبحث، وتُحدد هذه المصادر المحددة ما يمكن البحث عنه في مربع البحث.",
    "addSearchSourceLabel": "إضافة مصدر البحث",
    "featureLayerLabel": "طبقة المعلم",
    "geocoderLabel": "المُكود الجغرافي",
    "nameTitle": "الاسم",
    "generalSettingLabel": "إعدادات عامة",
    "allPlaceholderLabel": "نص العنصر النائب للبحث في كل:",
    "allPlaceholderHintText": "تلميح: أدخل نص لإظهاره في صورة عنصر نائب في حين البحث عن جميع الطبقات والمكود الجغرافي",
    "generalSettingCheckboxLabel": "عرض عناصر منبثقة للمعلم أو الموقع الذي يتم العثور عليه",
    "countryCode": "كود الدولة أو المنطقة",
    "countryCodeEg": "مثال ",
    "countryCodeHint": "سيؤدي ترك هذه القيمة فارغة إلى البحث في كل الدول والمناطق",
    "questionMark": "؟",
    "searchInCurrentMapExtent": "البحث في مدى الخريطة الحالي فقط",
    "zoomScale": "مقياس التكبير/التصغير",
    "locatorUrl": "عنوان URL للمكود الجغرافي",
    "locatorName": "اسم المكود الجغرافي",
    "locatorExample": "مثال",
    "locatorWarning": "هذا الإصدار من خدمة التكويد الجغرافي غير مدعوم، فيما يدعم عنصر واجهة الاستخدام الإصدار 10.0 فأحدث من خدمة التكويد الجغرافي.",
    "locatorTips": "لا توجد اقتراحات بسبب عدم دعم خدمة التكويد الجغرافي لإمكانية الاقتراح.",
    "layerSource": "مصدر الطبقة",
    "setLayerSource": "تحديد مصدر الطبقة",
    "setGeocoderURL": "تحديد عنوان URL للمكود الجغرافي",
    "searchLayerTips": "لا توجد اقتراحات بسبب عدم دعم خدمة المعالم لإمكانية الحدود الفاصلة للصفحات.",
    "placeholder": "نص العنصر النائب",
    "searchFields": "حقول البحث:",
    "displayField": "عرض الحقل",
    "exactMatch": "تطابق تام",
    "maxSuggestions": "الاقتراحات القصوى",
    "maxResults": "النتائج القصوى",
    "enableLocalSearch": "تمكين البحث المحلي",
    "minScale": "أدنى مقياس الرسم",
    "minScaleHint": "عندما يكون مقياس الخريطة أكبر من هذا المقياس، سيتم تطبيق البحث المحلي",
    "radius": "نصف القطر",
    "radiusHint": "يُحدد مُحيط المنطقة حول مركز الخريطة الحالية المستخدمة لتحسين رتبة مرشحي التكويد الجغرافي؛ حتى يتم إرجاع المرشحين الأقرب للموقع أولاً",
    "meters": "أمتار",
    "setSearchFields": "تحديد حقول البحث",
    "set": "تعيين",
    "fieldName": "الاسم",
    "invalidUrlTip": "عنوان URL لـ ${URL} غير صحيح أو لا يمكن الوصول إليه."
  },
  "searchSetting": {
    "searchSettingTabTitle": "إعدادات البحث",
    "defaultBufferDistanceLabel": "قم بتعيين مسافة المخزن المؤقت الافتراضية",
    "maxResultCountLabel": "عدد محدود من النتائج",
    "maxResultCountHintLabel": "تلميح: تعيين الحد الأقصى من عدد النتائج المرئية. سوف تعود القيمة 1 بالمعلم الأقرب",
    "maxBufferDistanceLabel": "قم بتعيين المسافة القصوى للمخزن المؤقت",
    "bufferDistanceUnitLabel": "وحدات مسافة النطاق",
    "defaultBufferHintLabel": "تلميح: قم بتعيين قيمة شريط تمرير المخزن المؤقت",
    "maxBufferHintLabel": "تلميح: قم بتعيين القيمة القصوى لشريط تمرير المخزن المؤقت",
    "bufferUnitLabel": "تلميح: عرّف وحدة لإنشاء النطاق",
    "selectGraphicLocationSymbol": "رمز العنوان أو الموقع",
    "graphicLocationSymbolHintText": "تلميح: رمز العنوان الذي تم البحث عنه أو الموقع الذي تم النقر عليه",
    "addressLocationPolygonHintText": "تلميح: رمز طبقة المضلع التي تم البحث عنها",
    "popupTitleForPolygon": "حدد المضلع لموقع العنوان المحدد",
    "popupTitleForPolyline": "حدد خطًا لموقع العنوان",
    "addressLocationPolylineHintText": "تلميح: رمز طبقة الخطوط المتصلة التي تم البحث عنها",
    "fontColorLabel": "حدد لون خط نتائج البحث",
    "fontColorHintText": "تلميح: لون خط نتائج البحث",
    "zoomToSelectedFeature": "قم بتكبير/تصغير المعلم المحدد",
    "zoomToSelectedFeatureHintText": "تلميح: قم بتكبير/تصغير المعلم المحدد بدلاً من المخزن المؤقت",
    "intersectSearchLocation": "إرجاع مضلعات متقاطعة",
    "intersectSearchLocationHintText": "تلميح: إرجاع مضلعات تحتوي على الموقع الذي يتم البحث عنه بدلاً من المضلعات التي تقع ضمن المخزن المؤقت",
    "enableProximitySearch": "تمكين بحث التقارُب",
    "enableProximitySearchHintText": "نصيحة: قم بتمكين إمكانية البحث عن المواقع بجوار النتيجة المحددة",
    "bufferVisibilityLabel": "قم بتعيين رؤية المخزن المؤقت",
    "bufferVisibilityHintText": "تلميح: سيتم عرض المخزن المؤقت على الخريطة",
    "bufferColorLabel": "قم بتعيين رمز المخزن المؤقت",
    "bufferColorHintText": "تلميح: حدد لون وشفافية المخزن المؤقت",
    "searchLayerResultLabel": "اسم نتائج الطبقة المحدد فقط",
    "searchLayerResultHint": "تلميح: سيتم رسم الطبقة المحددة في نتائج البحث فقط على الخريطة",
    "showToolToSelectLabel": "تعيين زر الموقع",
    "showToolToSelectHintText": "تلميح: توفير زر لتعيين موقع على الخريطة بدلاً من إعداد الموقع دائمًا عند النقر فوق الخريطة",
    "geoDesicParamLabel": "استخدام نطاق جيوديسي",
    "geoDesicParamHintText": "تلميح: استخدام نطاق جيوديسي بدلاً من النطاق الإقليديسي (مسطح)"
  },
  "layerSelector": {
    "selectLayerLabel": "حدد طبقات البحث",
    "layerSelectionHint": "تلميح: استخدمه لتعيين زر تحديد الطبقات",
    "addLayerButton": "تعيين"
  },
  "routeSetting": {
    "routeSettingTabTitle": "إعدادات الاتجاهات",
    "routeServiceUrl": "خدمة التوجيه",
    "buttonSet": "تعيين",
    "routeServiceUrlHintText": "تلميح: انقر على â€˜تعيينâ€™ لاستعراض خدمة التوجيه وتحديدها",
    "directionLengthUnit": "وحدات طول الاتجاه",
    "unitsForRouteHintText": "تلميح: تُستخدم لعرض وحدات المسار",
    "selectRouteSymbol": "حدد رمزًا لعرض المسار",
    "routeSymbolHintText": "تلميح: يُستخدم لعرض الرموز الخطية للمسار",
    "routingDisabledMsg": "لتمكين الاتجاهات، تأكد من تمكين التوجيه في العنصر في إعدادات التطبيق."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "إعدادات الترميز",
    "addSymbologyBtnLabel": "إضافة رموز جديدة",
    "layerNameTitle": "اسم الطبقة",
    "fieldTitle": "حقل",
    "valuesTitle": "قيم",
    "symbolTitle": "رمز",
    "actionsTitle": "إجراءات",
    "invalidConfigMsg": "تكرار الحقل: ${fieldName} لطبقة: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "إعدادات عامل التصفية",
    "addTaskTip": "أضف عامل تصفية واحد أو أكثر إلى طبقات البحث المحددة، وقم بتكوين معلمات كل منها.",
    "enableMapFilter": "إزالة عامل تصفية الطبقة المُعد مُسبقًا من الخريطة.",
    "newFilter": "عامل تصفية جديد",
    "filterExpression": "تعبير عامل التنقية",
    "layerDefaultSymbolTip": "استخدم رمز افتراضي للطبقة",
    "uploadImage": "قم بتحميل صورة",
    "selectLayerTip": "يرجى تحديد طبقة.",
    "setTitleTip": "يرجى تعيين عنوان.",
    "noTasksTip": "لم يتم تكوين أي عمليات تصفية. انقر فوق \"${newFilter}\" لإضافة استعلام جديد.",
    "collapseFiltersTip": "طي تعبيرات عامل التصفية (إن وجدت) عند فتح عنصر واجهة المستخدم",
    "groupFiltersTip": "تجميع عوامل التصفية بواسطة الطبقة"
  },
  "networkServiceChooser": {
    "arcgislabel": "إضافة من ArcGIS Online",
    "serviceURLabel": "إضافة عنوان URL للخدمة",
    "routeURL": "عنوان URL للمسار",
    "validateRouteURL": "تدقيق",
    "exampleText": "مثال",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "يرجى تحديد خدمة وضع سفر صحيحة.",
    "rateLimitExceeded": "تم تجاوز حد المُعدل. يرجى إعادة المحاولة لاحقًا.",
    "errorInvokingService": "اسم المستخدم أو كلمة المرور غير صحيحين."
  },
  "errorStrings": {
    "bufferErrorString": "يرجى إدخال قيمة رقمية صحيحة.",
    "selectLayerErrorString": "يرجى تحديد طبقات للبحث عنها.",
    "invalidDefaultValue": "لا يجوز أن تكون مسافة النطاق الافتراضية فارغة، يرجى تحديد مسافة النطاق.",
    "invalidMaximumValue": "لا يجوز أن تكون مسافة النطاق القصوى فارغة، يرجى تحديد مسافة النطاق.",
    "defaultValueLessThanMax": "يرجى تحديد مسافة النطاق الافتراضية ضمن أقصى حد",
    "defaultBufferValueGreaterThanOne": "لا يمكن أن تكون مسافة النطاق الافتراضية أقل من 0",
    "maximumBufferValueGreaterThanOne": "يرجى تحديد مسافة النطاق القصوى التي تزيد عن 0",
    "invalidMaximumResultCountValue": "الرجاء تحديد قيمة صحيحة للحد الأقصى لعدد النتائج",
    "invalidSearchSources": "بحث غير صحيح في إعدادات المصدر"
  },
  "symbolPickerPreviewText": "معاينة:"
});