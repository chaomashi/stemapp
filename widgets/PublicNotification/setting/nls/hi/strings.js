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
    "title": "खोज और बफ़र सेटिंग",
    "mainHint": "आप पते और सुविधाओं, ज्यामिति डिजिटाइज़िंग, और बफरिंग की टेक्स्ट खोज सक्षम कर सकते हैं।"
  },
  "addressSourceSetting": {
    "title": "पता लेयर",
    "mainHint": "आप निर्दिष्ट कर सकते हैं कि कौन-सी पता लेबल लेयर उपलब्ध है।"
  },
  "notificationSetting": {
    "title": "सूचना विकल्प",
    "mainHint": "आप निर्दिष्ट कर सकते हैं कि किस प्रकार की सूचना उपलब्ध है।"
  },
  "groupingLabels": {
    "addressSources": "एड्रेसी लेयर चुनने के लिए प्रयोग होने वाली लेयर",
    "averyStickersDetails": "Avery(r) स्टीकर",
    "csvDetails": "अल्पविराम चिन्ह द्वारा विभाजित मान (CSV) फ़ाइल",
    "drawingTools": "क्षेत्र निर्दिष्ट करने के लिए ड्राइंग टूल्स",
    "featureLayerDetails": "फ़ीचर लेयर",
    "geocoderDetails": "Geocoding",
    "labelFormats": "उपलब्ध लेबल स्वरूप",
    "printingOptions": "मुद्रित लेबल पृष्ठों के लिए विकल्प",
    "searchSources": "स्रोत खोजें",
    "stickerFormatDetails": "लेबल पेज पैरामीटर"
  },
  "hints": {
    "alignmentAids": "लेबल पेज पर चिन्ह जोड़ें गए हैं ताकि आपको अपने प्रिंटर के साथ पेज संरेखित करने में सहायता मिले",
    "csvNameList": "केस-संवेदी फ़ील्ड नाम की अल्पविराम द्वारा विभाजित सूची",
    "horizontalGap": "पंक्ति में दो लेबल के बीच जगह",
    "insetToLabel": "लेबल की साइड और टेक्स्ट के शुरुआत के बीच की जगह",
    "labelFormatDescription": "विजेट स्वरूप विकल्प सूची में लेबल स्टाइल को कैसे प्रस्तुत किया है",
    "labelFormatDescriptionHint": "स्वरूप विकल्प सूची में विवरण जोड़ने के लिए टूलटिप",
    "labelHeight": "पेज पर प्रत्येक लेबल की ऊँचाई",
    "labelWidth": "पेज पर प्रत्येक लेबल की चौड़ाई",
    "localSearchRadius": "मौजूदा मानचित्र केंद्र के चारों ओर एक क्षेत्रफल की त्रिज्या निर्दिष्ट करता है, जिसे जियोकोडिंग उम्मीदवारों की रैंक को बढ़ावा देने के लिए प्रयोग किया जाता है ताकि उस स्थान के निकट के उम्मीदवार सबसे पहले लौटें",
    "rasterResolution": "प्रति इंच 100 पिक्सेल स्क्रीन रिज़ॉल्यूशन से मेल खाता है। रिज़ॉल्यूशन जितना अधिक होगा, ब्राउज़र मेमोरी की की आवश्यकता उतनी अधिक होगी। मेमोरी की ज्यादा मांग को योग्य रूप से संभालने के लिए ब्राउज़र की क्षमताएं अलग-अलग होती हैं।",
    "selectionListOfOptionsToDisplay": "जाँचें गए आइटम विजेट में विकल्प के रूप में दिखाए जाते हैं; इच्छित रूप में अनुक्रम बदलें",
    "verticalGap": "स्तंभ में दो लेबल के बीच जगह"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "डिफ़ॉल्ट बफर दूरी",
    "bufferUnits": "विजेट में देने के लिए बफर इकाई",
    "countryRegionCodes": "देश या क्षेत्र कोड",
    "description": "विवरण",
    "descriptionHint": "विवरण संकेत",
    "displayField": "डिस्प्ले फील्ड्स",
    "drawingToolsFreehandPolygon": "मुक्तहस्त बहुभुज",
    "drawingToolsLine": "रेखा",
    "drawingToolsPoint": "बिंदु",
    "drawingToolsPolygon": "बहुभुज",
    "drawingToolsPolyline": "बहुरेखा",
    "enableLocalSearch": "स्थानीय खोज को सक्षम करें",
    "exactMatch": "सटीक मिलान",
    "fontSizeAlignmentNote": "प्रिंट मार्जिन के बारे में नोट हेतु फॉन्ट का आकार",
    "gridDarkness": "ग्रिड की गहराई",
    "gridlineLeftInset": "बायाँ ग्रिडलाइन इनसेट",
    "gridlineMajorTickMarksGap": "मेजर टिक मार्क प्रत्येक",
    "gridlineMinorTickMarksGap": "माइनर टिक मार्क प्रत्येक",
    "gridlineRightInset": "दायाँ ग्रिडलाइन इनसेट",
    "labelBorderDarkness": "लेबल बॉर्डर गहरापन",
    "labelBottomEdge": "पेज पर लेबल का निचला किनारा",
    "labelFontSize": "फ़ॉन्ट का आकर",
    "labelHeight": "लेबल की ऊँचाई",
    "labelHorizontalGap": "क्षैतिज रिक्ति",
    "labelInitialInset": "लेबल टेक्स्ट के लिए इनसेट",
    "labelLeftEdge": "पेज पर लेबल का बायाँ किनारा",
    "labelMaxLineCount": "लेबल में रेखाओं की अधिकतम संख्या",
    "labelPageHeight": "पेज की ऊँचाई",
    "labelPageWidth": "पेज की चौड़ाई",
    "labelRightEdge": "पेज पर लेबल का दायाँ किनारा",
    "labelsInAColumn": "स्तंभ में लेबल की संख्या",
    "labelsInARow": "पंक्ति में लेबल की संख्या",
    "labelTopEdge": "पेज पर लेबल का शीर्ष किनारा",
    "labelVerticalGap": "अनुलंब रिक्ति",
    "labelWidth": "लेबल की चौड़ाई",
    "limitSearchToMapExtent": "केवल वर्तमान मानचित्र सीमा में खोज करता है",
    "maximumResults": "अधिकतम परिणाम",
    "maximumSuggestions": "अधिकतम सुझाव",
    "minimumScale": "न्यूनतम स्केल",
    "name": "नाम",
    "percentBlack": "% काला",
    "pixels": "पिक्सेल्स",
    "pixelsPerInch": "प्रति इंच पिक्सेल",
    "placeholderText": "प्लेसहोल्डर टेक्स्ट",
    "placeholderTextForAllSources": "सभी स्रोतों की खोज के लिए प्लेसहोल्डर टेक्स्ट",
    "radius": "त्रिज्या",
    "rasterResolution": "रैस्टर रिज़ॉल्यूशन",
    "searchFields": "फ़ील्ड खोजें",
    "showAlignmentAids": "पेज पर संरेखन सहायक दिखाएँ",
    "showGridTickMarks": "ग्रिड टिक मार्क दिखाएँ",
    "showLabelOutlines": "लेबल आउटलाइन दिखाएँ",
    "showPopupForFoundItem": "पाई गई फीचर या स्थान के लिए पॉप-अप दिखाएं",
    "tool": "टूल्स",
    "units": "इकाइयां",
    "url": "URL",
    "urlToGeometryService": "ज्यामिति सेवा के लिए URL",
    "useRelatedRecords": "इसके संबंधित रिकॉर्ड का प्रयोग करें",
    "useSecondarySearchLayer": "द्वितीयक चयन लेयर का प्रयोग करें",
    "useSelectionDrawTools": "सेलेक्शन ड्रॉइंग टूल का उपयोग करें",
    "useVectorFonts": "वेक्टर फॉन्ट का प्रयोग करें (केवल लैटिन फॉन्ट)",
    "zoomScale": "स्केल को ज़ूम करें"
  },
  "buttons": {
    "addAddressSource": "अपने पॉपअप में पता शामिल करने वाली लेयर जोड़ें",
    "addLabelFormat": "लेबल स्वरूप जोड़े",
    "addSearchSource": "खोज स्रोत जोड़ें",
    "set": "सेट करें"
  },
  "placeholders": {
    "averyExample": "उदा., Avery(r) लेबल ${averyPartNumber}",
    "countryRegionCodes": "उदा., USA,CHN",
    "descriptionCSV": "अल्पविराम द्वारा विभाजित मान",
    "descriptionPDF": "PDF लेबल ${heightLabelIn} x ${widthLabelIn} इंच; ${labelsPerPage} प्रति पृष्ठ"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "वेबमैप से फीचर लेयर प्राप्त करें",
    "openCountryCodes": "कोड्स के बारे में अधिक जानकारी के लिए क्लिक करें",
    "openFieldSelector": "फ़ील्ड चयनकर्ता खोलने हेतु क्लिक करें",
    "setAndValidateURL": "URL सेट और मान्य करें"
  },
  "problems": {
    "noAddresseeLayers": "कृपया कम से कम एक प्रेषिती लेयर निर्दिष्ट करें",
    "noBufferUnitsForDrawingTools": "आरेखण के टूल के लिए कृपया कम से कम एक बफ़र इकाई कॉन्फ़िगर करें",
    "noBufferUnitsForSearchSource": "खोज के स्रोत \"${sourceName}\" के लिए, कृपया कम से कम एक बफ़र इकाई कॉन्फ़िगर करें",
    "noGeometryServiceURL": "कृपया ज्यामिती सेवा के लिए URL कॉन्फ़िगर करें",
    "noNotificationLabelFormats": "कृपया कम से कम अधिसूचना लेबल फ़ॉर्मेट निर्दिष्ट करें",
    "noSearchSourceFields": "खोज के स्रोत \"${sourceName}\" के लिए, कृपया एक या अधिक खोज क्षेत्र कॉन्फ़िगर करें",
    "noSearchSourceURL": "खोज के स्रोत \"${sourceName}\" के लिए, कृपया URL कॉन्फ़िगर करें"
  }
});