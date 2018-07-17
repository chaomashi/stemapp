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
  "_widgetLabel": "लागत विश्लेषण बीटा",
  "unableToFetchInfoErrMessage": "ज्यामिति सेवा/कॉन्फ़िगर किए गए लेयर विवरण प्राप्त करने में असमर्थ",
  "invalidCostingGeometryLayer": "लागत ज्यामिति लेयर में 'esriFieldTypeGlobalID' प्राप्त करने में असमर्थ।",
  "projectLayerNotFound": "मानचित्र में कॉन्फ़िगर की गई प्रोजेक्ट लेयर खोजने में असमर्थ।",
  "costingGeometryLayerNotFound": "मानचित्र में कॉन्फ़िगर की गई लागत ज्यामिति लेयर खोजने में असमर्थ।",
  "projectMultiplierTableNotFound": "मानचित्र में कॉन्फ़िगर की गई प्रोजेक्ट गुणक अतिरिक्त लागत तालिका खोजने में असमर्थ।",
  "projectAssetTableNotFound": "मानचित्र में कॉन्फ़िगर की गई प्रोजेक्ट एसेट तालिका खोजने में असमर्थ।",
  "createLoadProject": {
    "createProjectPaneTitle": "परियोजना बनाएँ",
    "loadProjectPaneTitle": "प्रोजेक्ट लोड करें",
    "projectNamePlaceHolder": "प्रोजेक्ट का नाम",
    "projectDescPlaceHolder": "प्रोजेक्ट की जानकारी",
    "selectProject": "प्रोजेक्ट चुनें",
    "viewInMapLabel": "मानचित्र में देखें",
    "loadLabel": "लोड करें",
    "createLabel": "बनाएँ",
    "deleteProjectConfirmationMsg": "क्या आप वाकई प्रोजेक्ट हटाना चाहते हैं?",
    "noAssetsToViewOnMap": "चयनित प्रोजेक्ट में मानचित्र पर देखने के लिए कोई एसेट नहीं है।",
    "projectDeletedMsg": "प्रोजेक्ट सफलतापूर्वक हटाया गया।",
    "errorInCreatingProject": "प्रोजेक्ट बनाने में त्रुटि हुई।",
    "errorProjectNotFound": "प्रोजेक्ट नहीं मिला।",
    "errorInLoadingProject": "कृपया देखें कि क्या मान्य प्रोजेक्ट का चयन किया गया है।",
    "errorProjectNotSelected": "ड्रॉपडाउन में से प्रोजेक्ट चुनें",
    "errorDuplicateProjectName": "प्रोजेक्ट का नाम पहले से मौजूद है।"
  },
  "statisticsSettings": {
    "tabTitle": "आँकड़ों की सेटिंग",
    "addStatisticsLabel": "आंकड़ा जोड़ें",
    "addNewStatisticsText": "नए आंकडें जोड़ें",
    "deleteStatisticsText": "आंकडें हटाएँ",
    "moveStatisticsUpText": "आंकड़ें ऊपर ले जाएँ",
    "moveStatisticsDownText": "आंकड़ें नीचे ले जाएँ",
    "layerNameTitle": "लेयर",
    "statisticsTypeTitle": "टाइप करें",
    "fieldNameTitle": "फ़ील्ड",
    "statisticsTitle": "लेबल",
    "actionLabelTitle": "कार्रवाइयाँ",
    "selectDeselectAllTitle": "सभी का चयन करें"
  },
  "statisticsType": {
    "countLabel": "गणना करें",
    "averageLabel": "औसत",
    "maxLabel": "अधिकतम",
    "minLabel": "न्यूनतम",
    "summationLabel": "योग",
    "areaLabel": "क्षेत्र",
    "lengthLabel": "लंबाई"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "लेयर का लेयर सेटिंग टैब में संपादन योग्य के रूप में जाँच होना आवश्यक है"
  },
  "workBench": {
    "refresh": "ताज़ा करें",
    "noAssetAddedMsg": "कोई एसेट नहीं जोड़ा गया",
    "units": "इकाई (इकाइयां)",
    "assetDetailsTitle": "एसेट आइटम विवरण",
    "costEquationTitle": "लागत समीकरण",
    "newCostEquationTitle": "नया समीकरण",
    "defaultCostEquationTitle": "डिफ़ॉल्ट समीकरण",
    "geographyTitle": "भूगोल",
    "scenarioTitle": "सिनेरियो",
    "costingInfoHintText": "<div>संकेत: निम्न कीवर्ड का प्रयोग करें</div><ul><li><b>{TOTALCOUNT}</b>: भूगोल</li> <li><b>{MEASURE}</b> में समान प्रकार की एसेट की कुल संख्या का प्रयोग करता है: बहुभुज गुण</li><li><b>{TOTALMEASURE}</b> हेतु रेखा गुण और क्षेत्र के लिए लंबाई का प्रयोग करता है: ज्यामिति में समान प्रकार की बहुभुज एसेट के लिए रेखा एसेट और कुल क्षेत्र हेतु कुल लंबाई का प्रयोग करता है</li></ul> आप इस तरह से फंक्शन का प्रयोग कर सकते हैं:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>कृपया अपने प्रोजेक्ट की लागत के आवश्यकतानुसार इसे संपादित करें।",
    "zoomToAsset": "एसेट ज़ूम करें",
    "deleteAsset": "एसेट हटाएँ",
    "closeDialog": "संवाद बंद करें",
    "objectIdColTitle": "ऑब्जेक्ट Id",
    "costColTitle": "लागत",
    "errorInvalidCostEquation": "अमान्य लागत समीकरण।",
    "errorInSavingAssetDetails": "एसेट की जानकारी सहेजने में असमर्थ।"
  },
  "assetDetails": {
    "inGeography": " ${geography} में ",
    "withScenario": " ${scenario} के साथ",
    "totalCostTitle": "कुल लागत",
    "additionalCostLabel": "विवरण",
    "additionalCostValue": "मान",
    "additionalCostNetValue": "कुल मान"
  },
  "projectOverview": {
    "assetItemsTitle": "एसेट आइटम",
    "assetStatisticsTitle": "एसेट सांख्यिकीय",
    "projectSummaryTitle": "प्रोजेक्ट का सारांश",
    "projectName": "प्रोजेक्ट का नाम: ${name}",
    "totalCostLabel": "प्रोजेक्ट की कुल लागत (*):",
    "grossCostLabel": "सकल प्रोजेक्ट लागत (*):",
    "roundingLabel": "* '${selectedRoundingOption}' से पूर्णन",
    "unableToSaveProjectBoundary": "प्रोजेक्ट लेयर में प्रोजेक्ट बाउंड्री सहेजने में असमर्थ।",
    "unableToSaveProjectCost": "प्रोजेक्ट लेयर में लागत सहेजने में असमर्थ।",
    "roundCostValues": {
      "twoDecimalPoint": "दो दशमलव अंक",
      "nearestWholeNumber": "निकटतम पूर्णांक संख्या",
      "nearestTen": "दस के निकटतम",
      "nearestHundred": "सौ के निकटतम",
      "nearestThousand": "हज़ार के निकटतम",
      "nearestTenThousands": "दस हज़ार के निकटतम"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "प्रोजेक्ट विशेषता",
    "projectAttributeTitle": "प्रोजेक्ट विशेषता संपादित करें"
  },
  "costEscalation": {
    "costEscalationLabel": "अतिरिक्त लागत जोड़ें",
    "valueHeader": "मान",
    "addCostEscalationText": "अतिरिक्त लागत जोड़ें",
    "deleteCostEscalationText": "चयनित अतिरिक्त लागत हटाएँ",
    "moveCostEscalationUpText": "चयनित अतिरिक्त लागत ऊपर ले जाएँ",
    "moveCostEscalationDownText": "चयनित अतिरिक्त लागत नीचे ले जाएँ",
    "invalidEntry": "एक या एकाधिक प्रविष्टियाँ अमान्य हैं।",
    "errorInSavingCostEscalation": "अतिरिक्त लागत विवरण सहेजने में असमर्थ।"
  },
  "scenarioSelection": {
    "popupTitle": "एसेट के लिए परिदृश्य चुनें",
    "regionLabel": "भूगोल",
    "scenarioLabel": "सिनेरियो",
    "noneText": "कोई नहीं",
    "copyFeatureMsg": "क्या आप चयनित फीचर को कॉपी करना चाहते हैं?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "विस्तृत आँकड़े",
    "noDetailStatisticAvailable": "कोई एसेट आँकड़ा नहीं जोड़ा गया"
  }
});