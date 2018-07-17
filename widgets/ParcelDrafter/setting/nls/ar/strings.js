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
  "setBtnLabel": "تعيين",
  "selectLabel": "تحديد",
  "selectLayerLabel": "تحديد طبقات قطعة الأرض",
  "selectLayerHintText": "لمحة: استخدم زر تعيين لتحديد مضلع قطعة الأرض وطبقة الخط ذات الصلة",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "لا تحتوي طبقة المضلع المحددة على طبقة صحيحة ذات صلة."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "حدد طبقة الخط ذات الصلة",
    "layerSettingTabLabel": "طبقات قطعة الأرض",
    "advancedSettingTabLabel": "إعدادات متقدمة",
    "selectLayerHintText": "لمحة: تستخدم لتخزين قيم COGO في طبقة خط قطعة الأرض",
    "selectFieldLegendLabel": "حدد الحقول لتخزين قيم COGO في طبقة خط قطعة الأرض",
    "bearingFieldLabel": "زاوية بعد",
    "chordLengthFieldLabel": "طول كورد",
    "distanceFieldLabel": "المسافة",
    "sequenceIdFieldLabel": "الرقم التعريفي التسلسلي",
    "radiusFieldLabel": "نصف القطر",
    "foreignKeyFieldLabel": "المفتاح الخارجي",
    "arcLengthFieldLabel": "طول القوس",
    "lineTypeFieldLabel": "نوع الخط",
    "parcelPointSymbolLabel": "رمز نقطة قطعة الأرض",
    "parcelPointSymbolHintText": "لمحة: يستخدم لعرض رمز النقطة لأصل الخط.",
    "symbolPickerPreviewText": "معاينة",
    "selectLineLayerLabel": "حدد طبقة الخط"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "حدد طبقة مضلع",
    "selectPolygonLayerHintText": "لمحة: استخدام تحديد طبقة المضلع الخاصة بقطعة الأرض",
    "selectFieldLegendLabel": "حدد الحقول لتخزين البيانات الجدولية الخاصة بمضلع قطعة الأرض",
    "parcelNameLabel": "اسم القطعة",
    "rotationLabel": "الاستدارة",
    "planNameLabel": "اسم الخريطة",
    "scalingLabel": "تحجيم",
    "documentTypeLabel": "نوع الوثيقة",
    "miscloseRatioLabel": "معدل Misclose",
    "statedAreaLabel": "منطقة محددة",
    "miscloseDistanceLabel": "مسافة Misclose",
    "selectPolygonLayerLabelPopUp": "حدد طبقة مضلع"
  },
  "lineTypesTable": {
    "lineTypeLabel": "نوع الخط",
    "valueLabel": "قيمة",
    "symbolLabel": "رمز",
    "connectionLineLabel": "خط الاتصال",
    "boundaryLineLabel": "خط الحد"
  },
  "closureSetting": {
    "snappingLayerLabel": "انطباق الطبقات",
    "snappingBtnLabel": "تعيين",
    "snappingLayerHintText": "لمحة: حدد الطبقات التي سيتم انطباق خطوط قطعة الأرض.",
    "miscloseDistanceLabel": "مسافة Misclose",
    "miscloseDistanceHintText": "لمحة: حدد مسافة خلل الإغلاق ووحداتها.",
    "miscloseRatioLabel": "معدل Misclose",
    "miscloseRatioHintText": "لمحة: حدد نسبة خلل الإغلاق.",
    "snappingToleranceLabel": "سماحية الالتقاط",
    "pixelLabel": "بكسل",
    "snappingToleranceHintText": "لمحة: حدد سماحية الانطباق.",
    "selectLayerLabel": "حدد الطبقة"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "حقل التحميل غير صحيح",
    "chordLengthErrMsg": "ChordLength غير صحيح",
    "distanceFieldErrMsg": "مسافة غير صحيحة",
    "sequenceIdFieldErrMsg": "sequenceId غير صحيح",
    "radiusFieldErrMsg": "نصف القطر غير صحيح",
    "foreignKeyFieldErrMsg": "المفتاح الخارجي غير صحيح",
    "arcLengthFieldErrMsg": "طول القوس غير صحيح",
    "lineTypeFieldErrMsg": "نوع الخط غير صحيح",
    "parcelNameFieldErrMsg": "حقل اسم قطعة الأرض غير صحيح",
    "planNameFieldErrMsg": "حقل اسم الخطة غير صحيح",
    "scaleFieldErrMsg": "حقل المقياس غير صحيح",
    "documentTypeFieldErrMsg": "حقل نوع المستند غير صحيح",
    "miscloseRatioFieldErrMsg": "حقل نسبة خلل الإغلاق غير صحيح",
    "statedAreaFieldErrMsg": "حقل المنطقة المحددة غير صحيح",
    "miscloseDistanceFieldErrMsg": "حقل مسافة خلل الإغلاق غير صحيح",
    "globalIdFieldErrMsg": "لا تحتوي طبقة المضلع المحددة على حقل 'esriFieldTypeGlobalID' صحيح.",
    "invalidPolylineLayer": "يرجى تحديد طبقة متعددة الخطوط لقطعة أرض صحيحة",
    "invalidPolygonLayer": "يرجى تحديد طبقة مضلع قطعة أرض صحيحة",
    "invalidMiscloseDistance": "الرجاء إدخال مسافة صحيحة لخلل الإغلاق",
    "invalidSnappingTolerance": "الرجاء إدخال سماحية إنطباق صحيحة",
    "invalidMiscloseRatio": "الرجاء إدخال نسبة خلل الإغلاق صحيحة",
    "selectDistinctLineTypes": "الرجاء إدخال قيمة مميزة في نوع الخط",
    "invalidConnectionLineType": "قيمة خط الاتصال غير صحيحة",
    "invalidBoundaryLineType": "قيمة خط الحدود غير صحيحة",
    "selectDistinctPolylineFields": "الرجاء تحديد الحقل المميز لكل قيمة COGO.",
    "selectDistinctPolygonFields": "الرجاء تحديد الحقل المميز لكل بيانات مضلع قطعة الأرض الجدولية."
  }
});