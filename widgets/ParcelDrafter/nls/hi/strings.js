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
  "_widgetLabel": "पार्सल ड्राफ्टर",
  "newTraverseButtonLabel": "नया ट्रावर्स शुरू करें",
  "invalidConfigMsg": "अमान्य कॉन्फ़िगरेशन",
  "geometryServiceURLNotFoundMSG": "ज्यामितीय सेवा URL पाने में सक्षम नहीं",
  "editTraverseButtonLabel": "ट्रावर्स संपादित करें",
  "mapTooltipForStartNewTraverse": "शुरू करने के लिए कृपया मानचित्र पर बिंदु चुनें या नीचे टाइप करें",
  "mapTooltipForEditNewTraverse": "संपादित करने के लिए कृपया किसी पार्सल का चयन करें",
  "mapTooltipForUpdateStartPoint": "शुरुआती पॉइंट को अपडेट करने के लिए क्लिक करें",
  "mapTooltipForScreenDigitization": "पार्सल पॉइंट जोड़ने के लिए क्लिक करें",
  "mapTooltipForRotate": "घुमाने के लिए ड्रैग करें",
  "mapTooltipForScale": "स्केल करने के लिए ड्रैग करें",
  "backButtonTooltip": "पीछे जाएँ",
  "newTraverseTitle": "नया ट्रावर्स",
  "editTraverseTitle": "ट्रावर्स संपादित करें",
  "clearingDataConfirmationMessage": "बदलाव निरस्त कर दिए जाएंगे, क्या आप आगे बढ़ना चाहते हैं?",
  "unableToFetchParcelMessage": "पार्सल फैच करने में सक्षम नहीं।",
  "unableToFetchParcelLinesMessage": "पार्सल लाइनों को फैच करने में सक्षम नहीं।",
  "planSettings": {
    "planSettingsTitle": "सेटिंग्स",
    "directionOrAngleTypeLabel": "दिशा और कोण के प्रकार",
    "directionOrAngleUnitsLabel": "दिशा या कोण की इकाइयां",
    "distanceAndLengthUnitsLabel": "दूरी और लंबाई की इकाई",
    "areaUnitsLabel": "क्षेत्र इकाइयाँ",
    "circularCurveParameters": "वृत्ताकार कर्व मानदंड",
    "northAzimuth": "उत्तरी अज़ीमुथ",
    "southAzimuth": "दक्षिणी अज़ीमुथ",
    "quadrantBearing": "क्वाड्रेंट बियरिंग",
    "radiusAndChordLength": "त्रिज्या और तार की लंबाई",
    "radiusAndArcLength": "त्रिज्या और चाप की लंबाई",
    "expandGridTooltipText": "ग्रिड को विस्तारित करें",
    "collapseGridTooltipText": "ग्रिड को संकुचित करें",
    "zoomToLocationTooltipText": "स्थान को ज़ूम करें",
    "onScreenDigitizationTooltipText": "डिज़िटाइज़ करें"
  },
  "traverseSettings": {
    "bearingLabel": "बियरिंग",
    "lengthLabel": "लंबाई",
    "radiusLabel": "त्रिज्या",
    "noMiscloseCalculated": "गलत गणना न करें",
    "traverseMiscloseBearing": "गलत बियरिंग",
    "traverseAccuracy": "सटीकता",
    "accuracyHigh": "उच्च",
    "traverseDistance": "गलत दूरी",
    "traverseMiscloseRatio": "गलत अनुपात",
    "traverseStatedArea": "बताया गया क्षेत्र",
    "traverseCalculatedArea": "परिकलत किया गया क्षेत्र",
    "addButtonTitle": "जोड़ें",
    "deleteButtonTitle": "हटाएँ"
  },
  "parcelTools": {
    "rotationToolLabel": "कोण",
    "scaleToolLabel": "स्केल"
  },
  "newTraverse": {
    "invalidBearingMessage": "अमान्य बियरिंग।",
    "invalidLengthMessage": "अमान्य लंबाई।",
    "invalidRadiusMessage": "अमान्य त्रिज्या।",
    "negativeLengthMessage": "केवल घुमाव के लिए वैध",
    "enterValidValuesMessage": "कृपया वैध मूल्य दर्ज करें।",
    "enterValidParcelInfoMessage": "सुरक्षित करने के लिए कृपया वैध पार्सल जानकारी दर्ज करें।",
    "unableToDrawLineMessage": "रेखा खींचने में असमर्थ।",
    "invalidEndPointMessage": "अवैध समाप्ति बिंदु, रेखा खींचने में असमर्थ।"
  },
  "planInfo": {
    "requiredText": "(आवश्यक है)",
    "optionalText": "(वैकल्पिक)",
    "parcelNamePlaceholderText": "पार्सल का नाम",
    "parcelDocumentTypeText": "दस्तावेज का प्रकार",
    "planNamePlaceholderText": "योजना का नाम",
    "cancelButtonLabel": "रद्द करें",
    "saveButtonLabel": "सहेजें",
    "saveNonClosedParcelConfirmationMessage": "दर्ज पार्सल बंद नहीं है, क्या आप अब भी आगे बढ़ना चाहते हैं और केवल पार्सल लाइनों को सुरक्षित करना चाहते हैं?",
    "unableToCreatePolygonParcel": "पार्सल का बहुभुज बनाने में असमर्थ।",
    "unableToSavePolygonParcel": "पार्सल का बहुभुज सुरक्षित करने में असमर्थ।",
    "unableToSaveParcelLines": "पार्सल की रेखाएं सुरक्षित करने में असमर्थ।",
    "unableToUpdateParcelLines": "पार्सल की रेखाओं को सुधारने में असमर्थ।",
    "parcelSavedSuccessMessage": "पार्सल सफलतापूर्वक सुरक्षित हो गया है।",
    "enterValidParcelNameMessage": "कृपया वैध पार्सल नाम दर्ज करें।",
    "enterValidPlanNameMessage": "कृपया वैध योजना नाम दर्ज करें।",
    "enterValidDocumentTypeMessage": "दस्तावेजों का प्रकार अवैध है।",
    "enterValidStatedAreaNameMessage": "कृपया घोषित क्षेत्र का दर्ज करें।"
  },
  "xyInput": {
    "explanation": "अपनी पार्सल लेयर के स्थानिक संदर्भ में"
  }
});