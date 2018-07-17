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
  "setBtnLabel": "सेट करें",
  "selectLabel": "चुनें",
  "selectLayerLabel": "कृपया पार्सल लेयरें चुनें",
  "selectLayerHintText": "संकेत: पार्सल बहुभुज और उसकी संबंधित रेखा लेयरों को चुनने के लिए सेट बटन का इस्तेमाल करें",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "चयनित बहुभुज लेयर में कोई जुड़ा वैध लेयर नहीं है।"
  },
  "parcelLineLayer": {
    "selectLayerLabel": "संबंधित रेखा लेयर चुनें",
    "layerSettingTabLabel": "पार्सल लेयरें",
    "advancedSettingTabLabel": "विकसित सेटिंग्स",
    "selectLayerHintText": "संकेत: पार्सल रेखा की लेयर में COGO मूल्यों को इकठ्ठा करने के लिए इस्तेमाल करें",
    "selectFieldLegendLabel": "पार्सल रेखा की लेयर में COGO मूल्यों को इकठ्ठा करने के लिए क्षेत्र चुनें",
    "bearingFieldLabel": "बियरिंग",
    "chordLengthFieldLabel": "तार की लंबाई",
    "distanceFieldLabel": "दूरी",
    "sequenceIdFieldLabel": "अनुक्रम ID",
    "radiusFieldLabel": "त्रिज्या",
    "foreignKeyFieldLabel": "विदेशी समाधान",
    "arcLengthFieldLabel": "वृत्त-चाप की लंबाई",
    "lineTypeFieldLabel": "रेखा प्रकार",
    "parcelPointSymbolLabel": "पार्सल बिंदु चिन्ह",
    "parcelPointSymbolHintText": "संकेत: रेखा के आरंभ को प्रदर्शित करने के लिए बिंदु चिन्ह का इस्तेमाल जाता है।",
    "symbolPickerPreviewText": "पूर्वावलोकन करें",
    "selectLineLayerLabel": "रेखाओं की लेयरों का चयन करें"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "बहुभुज लेयर का चयन करें",
    "selectPolygonLayerHintText": "संकेत: चयनित पार्सल बहुभुज लेयर का इस्तेमाल करें",
    "selectFieldLegendLabel": "पार्सल बहुभुज गुणों को इकठ्ठा करने के लिए क्षेत्र चुनें",
    "parcelNameLabel": "पार्सल का नाम",
    "rotationLabel": "रोटेशन",
    "planNameLabel": "योजना का नाम",
    "scalingLabel": "अनुमाप परिवर्तन",
    "documentTypeLabel": "दस्तावेज का प्रकार",
    "miscloseRatioLabel": "गलत अनुपात",
    "statedAreaLabel": "बताया गया क्षेत्र",
    "miscloseDistanceLabel": "गलत दूरी",
    "selectPolygonLayerLabelPopUp": "बहुभुज लेयर को चुनें"
  },
  "lineTypesTable": {
    "lineTypeLabel": "रेखा प्रकार",
    "valueLabel": "मान",
    "symbolLabel": "चिह्न",
    "connectionLineLabel": "संपर्क रेखा",
    "boundaryLineLabel": "सीमा रेखा"
  },
  "closureSetting": {
    "snappingLayerLabel": "तड़कनेवाली लेयरें",
    "snappingBtnLabel": "सेट करें",
    "snappingLayerHintText": "संकेत: लेयरें चुनें जिन पर पार्सल रेखाएं तड़केंगी।",
    "miscloseDistanceLabel": "गलत दूरी",
    "miscloseDistanceHintText": "संकेत: दूरी और उसकी इकाइयां स्पष्ट तौर पर अनावृत करें।",
    "miscloseRatioLabel": "गलत अनुपात",
    "miscloseRatioHintText": "संकेत: अनावृत अनुपात स्पष्ट करें।",
    "snappingToleranceLabel": "धैर्य को तोड़ना",
    "pixelLabel": "पिक्सेल",
    "snappingToleranceHintText": "संकेत: धैर्य को तोड़ना स्पष्ट करें।",
    "selectLayerLabel": "लेयर का चयन करें"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "अवैध वहन क्षेत्र",
    "chordLengthErrMsg": "अवैध ChordLength",
    "distanceFieldErrMsg": "अवैध दूरी",
    "sequenceIdFieldErrMsg": "अवैध sequenceId",
    "radiusFieldErrMsg": "अवैध अर्धव्यास",
    "foreignKeyFieldErrMsg": "अवैध विदेशी समाधान",
    "arcLengthFieldErrMsg": "अवैध वृत्त-चाप लंबाई",
    "lineTypeFieldErrMsg": "अवैध रेखा प्रकार",
    "parcelNameFieldErrMsg": "अवैध पार्सल नाम क्षेत्र",
    "planNameFieldErrMsg": "अवैध योजना नाम क्षेत्र",
    "scaleFieldErrMsg": "अवैध पैमाना क्षेत्र",
    "documentTypeFieldErrMsg": "अवैध दस्तावेज प्रकार क्षेत्र",
    "miscloseRatioFieldErrMsg": "अवैध अनावृत अनुपात क्षेत्र",
    "statedAreaFieldErrMsg": "अवैध घोषित स्थान क्षेत्र",
    "miscloseDistanceFieldErrMsg": "अवैध अनावृत दूरी क्षेत्र",
    "globalIdFieldErrMsg": "चयनित बहुभुज लेयर में वैध 'esriFieldTypeGlobalID' क्षेत्र नहीं है।",
    "invalidPolylineLayer": "कृपया वैध पार्सल पॉलीलाइन लेयर चुनें",
    "invalidPolygonLayer": "कृपया वैध पार्सल बहुभुज लेयर चुनें",
    "invalidMiscloseDistance": "कृपया वैध अनावृत दूरी दर्ज करें",
    "invalidSnappingTolerance": "कृपया वैध धैर्य को तोड़नेवाला दर्ज करें",
    "invalidMiscloseRatio": "कृपया वैध अनावृत अनपात दर्ज करें",
    "selectDistinctLineTypes": "कृपया प्रत्येक क्रम प्रकार में अलग मूल्य चुनें",
    "invalidConnectionLineType": "अवैध संपर्क रेखा मूल्य",
    "invalidBoundaryLineType": "अवैध सीमा रेखा मूल्य",
    "selectDistinctPolylineFields": "कृपया प्रत्येक COGO मूल्य के लिए अलग क्षेत्र चुनें।",
    "selectDistinctPolygonFields": "कृपया प्रत्येक पार्सल बहुभुज गुणों के लिए अलग क्षेत्र चुनें।"
  }
});