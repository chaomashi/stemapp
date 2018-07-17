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
  "configText": "कॉन्फ़िगरेशन टेक्स्ट सेट करें:",
  "generalSettings": {
    "tabTitle": "सामान्य सेटिंग्स",
    "measurementUnitLabel": "मापन इकाई",
    "currencyLabel": "मापन प्रतीक",
    "roundCostLabel": "पूर्ण लागत",
    "projectOutputSettings": "प्रोजेक्ट आउटपुट सेटिंग",
    "typeOfProjectAreaLabel": "प्रोजेक्ट क्षेत्र का प्रकार",
    "bufferDistanceLabel": "बफर दूरी",
    "roundCostValues": {
      "twoDecimalPoint": "दो दशमलव अंक",
      "nearestWholeNumber": "निकटतम पूर्णांक संख्या",
      "nearestTen": "दस के निकटतम",
      "nearestHundred": "सौ के निकटतम",
      "nearestThousand": "हज़ार के निकटतम",
      "nearestTenThousands": "दस हज़ार के निकटतम"
    },
    "projectAreaType": {
      "outline": "आउटलाइन",
      "buffer": "बफर"
    },
    "errorMessages": {
      "currency": "अमान्य मुद्रा इकाई",
      "bufferDistance": "अमान्य बफ़र दूरी",
      "outOfRangebufferDistance": "मान 0 से अधिक और 100 से कम या बराबर होना चाहिए"
    }
  },
  "projectSettings": {
    "tabTitle": "प्रोजेक्ट सेटिंग",
    "costingGeometrySectionTitle": "लागत (वैकल्पिक) के लिए भूगोल को परिभाषित करें",
    "costingGeometrySectionNote": "ध्यान दें: इस लेयर को कॉन्फ़िगर करने पर उपयोगकर्ता भूगोल-शास्र के आधार पर फीचर टेम्प्लेट्स के लागत समीकरण को सेट कर सकेगा।",
    "projectTableSectionTitle": "प्रोजेक्ट सेटिंग (वैकल्पिक) सहेजने/लोड करने की क्षमता",
    "projectTableSectionNote": "ध्यान दें: सभी तालिकाओं और लेयर्स को कॉन्फ़िगर करने पर उपयोगकर्ता बाद में प्रोजेक्ट को सहेज सकेगा/लोड कर सकेगा।",
    "costingGeometryLayerLabel": "लागत ज्यामितिय लेयर",
    "fieldLabelGeography": "लेबल भूगोल हेतु फ़ील्ड",
    "projectAssetsTableLabel": "प्रोजेक्ट एसेट तालिका",
    "projectMultiplierTableLabel": "प्रोजेक्ट गुणक अतिरिक्त लागत तालिका",
    "projectLayerLabel": "प्रोजेक्ट लेयर",
    "configureFieldsLabel": "फ़ील्ड कॉन्फ़िगर करें",
    "fieldDescriptionHeaderTitle": "फ़ील्ड की जानकारी",
    "layerFieldsHeaderTitle": "लेयर फ़ील्ड",
    "selectLabel": "चुनें",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} पहले से चयनित है",
      "invalidConfiguration": "कृपया ${fieldsString} चुनें"
    },
    "costingGeometryHelp": "<p>निम्न शर्तों वाली बहुभुज लेयर दिखाई जाएगी: <br/> <li>\tलेयर में â€œक्वेरीâ€ क्षमता होनी चाहिए</li><li>\tलेयर में GlobalID फ़ील्ड होनी चाहिए</li></p>",
    "fieldToLabelGeographyHelp": "<p>चयनित â€œलागत ज्यामिति लेयरâ€ की स्ट्रिंग और संख्यात्मक फ़ील्ड ड्रॉपडाउन â€œलेबल भूगोल हेतु फ़ील्डâ€ में प्रदर्शित होंगी।</p>",
    "projectAssetsTableHelp": "<p>निम्न शर्तों वालीं तालिकाएँ दिखाई जाएँगी: <br/> <li>तालिका में â€बनाएँâ€, â€œहटाएँâ€ और â€अपडेट करेंâ€ जैसी संपादन क्षमताएं होनी चाहिए</li>    <li>तालिका में समान नाम और डेटा प्रकार वाली छह फ़ील्ड होनी चाहिए:</li><ul><li>\tAssetGUID (GUID प्रकार फ़ील्ड)</li><li>\tCostEquation (स्ट्रिंग प्रकार फ़ील्ड)</li><li>\tपरिदृश्य (स्ट्रिंग प्रकार फ़ील्ड)</li><li>\tTemplateName (स्ट्रिंग प्रकार फ़ील्ड)</li><li>    GeographyGUID (GUID प्रकार फ़ील्ड)</li><li>\tProjectGUID (GUID प्रकार फ़ील्ड)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>निम्न शर्तों वालीं तालिकाएँ दिखाई जाएँगी: <br/> <li>तालिका में â€बनाएँâ€, â€œहटाएँâ€ और â€अपडेट करेंâ€ जैसी संपादन क्षमताएं होनी चाहिए</li>    <li>तालिका में समान नाम और डेटा प्रकार वाली पाँच फ़ील्ड होनी चाहिए:</li><ul><li>\tविवरण (स्ट्रिंग प्रकार फ़ील्ड)</li><li>\tप्रकार (स्ट्रिंग प्रकार फ़ील्ड)</li><li>\tमान (फ्लोट/डबल प्रकार फ़ील्ड)</li><li>\tलागत सूचकांक (पूर्णांक प्रकार फ़ील्ड)</li><li>   \tProjectGUID (GUID प्रकार फ़ील्ड))</li></ul> </p>",
    "projectLayerHelp": "<p>निम्न शर्तों वाली बहुभुज लेयर दिखाई जाएगी: <br/> <li>लेयर में कम से कम â€œबनाएँâ€, â€œहटाएँâ€ और â€œअपडेट करेंâ€ संपादन क्षमताएँ होनी चाहिए</li>    <li>लेयर में समान नाम और डेटा प्रकार वालीं पाँच फ़ील्ड होनी चाहिए:</li><ul><li>ProjectName (स्ट्रिंग प्रकार फ़ील्ड)</li><li>विवरण (स्ट्रिंग प्रकार फ़ील्ड)</li><li>Totalassetcost (फ्लोट/डबल प्रकार फ़ील्ड)</li><li>Grossprojectcost (फ्लोट/डबल प्रकार फ़ील्ड)</li><li>GlobalID (GlobalID प्रकार फ़ील्ड)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "लेयर सेटिंग",
    "layerNameHeaderTitle": "लेयर का नाम",
    "layerNameHeaderTooltip": "मानचित्र में लेयर की सूची",
    "EditableLayerHeaderTitle": "संशोधन योग्य",
    "EditableLayerHeaderTooltip": "लागत विजेट में लेयर और उसके टेम्पलेट शामिल करें",
    "SelectableLayerHeaderTitle": "चयन योग्य",
    "SelectableLayerHeaderTooltip": "फीचर से ज्यामिति का प्रयोग एक नया लागत आइटम उत्पन्न करने के लिए किया जा सकता है",
    "fieldPickerHeaderTitle": "प्रोजेक्ट ID (वैकल्पिक)",
    "fieldPickerHeaderTooltip": "इसमें प्रोजेक्ट ID संग्रहित करने के लिए वैकल्पिक फ़ील्ड (स्ट्रिंग प्रकार का)",
    "selectLabel": "चुनें",
    "noAssetLayersAvailable": "चयनीय वेबमैप में कोई एसेट लेयर नहीं मिली",
    "disableEditableCheckboxTooltip": "इस लेयर में कोई संपादन क्षमताएँ नहीं हैं",
    "missingCapabilitiesMsg": "इस लेयर में निम्न क्षमताएँ अनुपलब्ध हैं:",
    "missingGlobalIdMsg": "इस लेयर का कोई GlobalId क्षेत्र नहीं है",
    "create": "बनाएँ",
    "update": "अपडेट करें",
    "delete": "हटाएँ"
  },
  "costingInfo": {
    "tabTitle": "लागत की जानकारी",
    "proposedMainsLabel": "प्रस्तावित मुख्य",
    "addCostingTemplateLabel": "लागत टेम्पलेट जोड़ें",
    "manageScenariosTitle": "परिदृश्य प्रबंधित करें",
    "featureTemplateTitle": "फीचर टेम्पलेट",
    "costEquationTitle": "लागत समीकरण",
    "geographyTitle": "भूगोल",
    "scenarioTitle": "सिनेरियो",
    "actionTitle": "कार्रवाइयाँ",
    "scenarioNameLabel": "परिदृश्य का नाम",
    "addBtnLabel": "जोड़ें",
    "srNoLabel": "संख्या",
    "deleteLabel": "हटाएँ",
    "duplicateScenarioName": "डुप्लिकेट परिदृश्य का नाम",
    "hintText": "<div>संकेत: निम्न कीवर्ड का प्रयोग करें</div><ul><li><b>{TOTALCOUNT}</b>: भूगोल</li><li><b>{MEASURE}</b> में समान प्रकार की एसेट की कुल संख्या का प्रयोग करता है: बहुभुज एसेट </li><li><b>{TOTALMEASURE}</b> हेतु रेखा एसेट और क्षेत्र के लिए लंबाई का प्रयोग करता है: ज्यामिति में समान प्रकार की बहुभुज एसेट के लिए रेखा एसेट और कुल क्षेत्र हेतु कुल लंबाई का प्रयोग करता है</li></ul>आप इस तरह से फंक्शन का प्रयोग कर सकते हैं:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>कृपया अपने प्रोजेक्ट की आवश्यकता के अनुसार लागत समीकरण संपादित करें।",
    "noneValue": "कोई नहीं",
    "requiredCostEquation": "${layerName} हेतु अमान्य लागत समीकरण : ${templateName}",
    "duplicateTemplateMessage": "${layerName} हेतु डुप्लिकेट टेम्पलेट प्रविष्टि मौजूद है : ${templateName}",
    "defaultEquationRequired": "${layerName} के लिए डिफ़ॉल्ट समीकरण की आवश्यकता है : ${templateName}",
    "validCostEquationMessage": "कृपया मान्य लागत समीकरण दर्ज करें",
    "costEquationHelpText": "कृपया अपने प्रोजेक्ट की लागत के आवश्यकतानुसार इसे संपादित करें",
    "scenarioHelpText": "कृपया अपने प्रोजेक्ट के आवश्यकतानुसार परिदृश्य चुनें",
    "copyRowTitle": "पंक्ति कॉपी करें",
    "noTemplateAvailable": "कृपया ${layerName} हेतु कम से कम एक टेम्पलेट चुनें",
    "manageScenarioLabel": "परिदृश्य प्रबंधित करें",
    "noLayerMessage": "कृपया ${tabName} में कम से कम एक लेयर दर्ज करें",
    "noEditableLayersAvailable": "लेयर का लेयर सेटिंग टैब में संपादन योग्य के रूप में जाँच होना आवश्यक है"
  },
  "statisticsSettings": {
    "tabTitle": "आँकड़ों की सेटिंग",
    "addStatisticsLabel": "आंकड़ा जोड़ें",
    "fieldNameTitle": "फ़ील्ड",
    "statisticsTitle": "लेबल",
    "addNewStatisticsText": "नए आंकडें जोड़ें",
    "deleteStatisticsText": "आंकडें हटाएँ",
    "moveStatisticsUpText": "आंकड़ें ऊपर ले जाएँ",
    "moveStatisticsDownText": "आंकड़ें नीचे ले जाएँ",
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
  }
});