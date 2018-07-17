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
    "miles": "أميال",
    "kilometers": "كيلومترات",
    "feet": "قدم",
    "meters": "أمتار"
  },
  "layerSetting": {
    "layerSettingTabTitle": "إعدادات البحث",
    "buttonSet": "تعيين",
    "selectLayersLabel": "حدد الطبقة",
    "selectLayersHintText": "تلميح: تُستخدم لتحديد طبقة المضلع وطبقته النقطية.",
    "selectPrecinctSymbolLabel": "حدد رمزًا لتمييز المضلع",
    "selectGraphicLocationSymbol": "رمز العنوان أو الموقع",
    "graphicLocationSymbolHintText": "تلميح: رمز العنوان الذي تم البحث عنه أو الموقع الذي تم النقر عليه",
    "precinctSymbolHintText": "تلميح: يُستخدم لعرض رمز المضلع المحدد",
    "selectColorForPoint": "حدد اللون لتمييز النقطة",
    "selectColorForPointHintText": "تلميح: يُستخدَم لعرض لون التمييز للنقطة المحددة"
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
    "invalidUrlTip": "عنوان URL لـ ${URL} غير صحيح أو لا يمكن الوصول إليه.",
    "invalidSearchSources": "بحث غير صحيح في إعدادات المصدر"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "حدد طبقة مضلع",
    "selectPolygonLayerHintText": "تلميح: تُستخدم لتحديد طبقة مضلع.",
    "selectRelatedPointLayerLabel": "حدد طبقة نقطية متصلة بطبقة المضلع",
    "selectRelatedPointLayerHintText": "تلميح: تُستخدم لتحديد طبقة نقطية متصلة بطبقة المضلع",
    "polygonLayerNotHavingRelatedLayer": "يرجى تحديد طبقة مضلع ذات طبقة نقطية ذات صلة.",
    "errorInSelectingPolygonLayer": "يرجى تحديد طبقة مضلع ذات طبقة نقطية ذات صلة.",
    "errorInSelectingRelatedLayer": "يرجى تحديد طبقة نقطية متصلة بطبقة مضلع."
  },
  "routeSetting": {
    "routeSettingTabTitle": "إعدادات الاتجاهات",
    "routeServiceUrl": "خدمة التوجيه",
    "buttonSet": "تعيين",
    "routeServiceUrlHintText": "تلميح: انقر على 'تعيين' لاستعراض خدمة توجيه تحليل الشبكة وتحديدها",
    "directionLengthUnit": "وحدات طول الاتجاه",
    "unitsForRouteHintText": "تلميح: تُستخدم لعرض وحدات المسار التي تم الإبلاغ عنها",
    "selectRouteSymbol": "حدد رمزًا لعرض المسار",
    "routeSymbolHintText": "تلميح: يُستخدم لعرض الرموز الخطية للمسار",
    "routingDisabledMsg": "لتمكين الاتجاهات، تأكد من تمكين التوجيه في عنصر ArcGIS Online."
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
  "symbolPickerPreviewText": "معاينة:",
  "showToolToSelectLabel": "تعيين زر الموقع",
  "showToolToSelectHintText": "تلميح: توفير زر لتعيين موقع على الخريطة بدلاً من إعداد الموقع دائمًا عند النقر فوق الخريطة"
});