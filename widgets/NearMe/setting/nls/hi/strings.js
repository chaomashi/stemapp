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
      "displayText": "मील",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "किलोमीटर",
      "acronym": "km"
    },
    "feet": {
      "displayText": "फ़ीट",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "मीटर",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "स्रोत सेटिंग खोजें",
    "searchSourceSettingTitle": "स्रोत सेटिंग खोजें",
    "searchSourceSettingTitleHintText": "Geocode सेवाओं या फीचर लेयरों को खोज स्रोतों के रूप में जोड़ें और कॉन्फ़िगर करें। ये निर्दिष्ट स्रोत निर्धारित करते हैं कि खोज बॉक्स के भीतर क्या खोज योग्य है",
    "addSearchSourceLabel": "खोज स्रोत जोड़ें",
    "featureLayerLabel": "फ़ीचर लेयर",
    "geocoderLabel": "Geocoding",
    "nameTitle": "नाम",
    "generalSettingLabel": "सामान्य सेटिंग",
    "allPlaceholderLabel": "सभी खोज के लिए प्लेसहोल्डर पाठ:",
    "allPlaceholderHintText": "सुझाव: सभी लेयरों और Geocoder की खोज करते समय प्लेसहोल्डर के रूप में दिखाए जाने के लिए पाठ दर्ज किया जा सकता है",
    "generalSettingCheckboxLabel": "पाई गई फीचर या स्थान के लिए पॉप-अप दिखाएं",
    "countryCode": "देश या क्षेत्र कोड",
    "countryCodeEg": "जैसे ",
    "countryCodeHint": "इस मान को खाली छोड़ने से सभी देशों और क्षेत्रों की खोज होगी",
    "questionMark": "?",
    "searchInCurrentMapExtent": "केवल वर्तमान मानचित्र सीमा में खोज करता है",
    "zoomScale": "स्केल को ज़ूम करें",
    "locatorUrl": "जियोकोडर URL",
    "locatorName": "जियोकोडर का नाम",
    "locatorExample": "उदाहरण",
    "locatorWarning": "Geocoding सेवा का यह संस्करण समर्थित नहीं है। विजेट Geocoding सेवा 10.0 और ऊपर को समर्थन करता है।",
    "locatorTips": "सुझाव उपलब्ध नहीं हैं क्योंकि Geocoding सेवा सुझाव क्षमता का का समर्थन नहीं करता है।",
    "layerSource": "लेयर स्रोत",
    "setLayerSource": "लेयर स्रोत को सेट करें",
    "setGeocoderURL": "Geocoder का URL सेट करें",
    "searchLayerTips": "सुझाव उपलब्ध नहीं हैं क्योंकि सुविधा सेवा पृष्ठ अंकन क्षमता का समर्थन नहीं करती है।",
    "placeholder": "प्लेसहोल्डर टेक्स्ट",
    "searchFields": "फ़ील्ड खोजें",
    "displayField": "प्रदर्शन फील्ड",
    "exactMatch": "सटीक मिलान",
    "maxSuggestions": "अधिकतम सुझाव",
    "maxResults": "अधिकतम परिणाम",
    "enableLocalSearch": "स्थानीय खोज को सक्षम करें",
    "minScale": "न्यूनतम स्केल",
    "minScaleHint": "जब मानचित्र स्केल इस स्केल से बड़ा होता है, तो स्थानीय खोज को लागू किया जाएगा",
    "radius": "त्रिज्या",
    "radiusHint": "मौजूदा मानचित्र केंद्र के चारों ओर एक क्षेत्रफल की त्रिज्या निर्दिष्ट करें जिसे Geocoding उम्मीदवारों के रैंक को बढ़ावा देने के लिए प्रयोग किया जाता है ताकि स्थान के निकटतम उम्मीदवार पहले प्राप्त हों",
    "meters": "मीटर",
    "setSearchFields": "खोज फ़ील्ड को सेट करें",
    "set": "सेट करें",
    "fieldName": "नाम",
    "invalidUrlTip": "URL ${URL} अवैध या दुर्गम है।"
  },
  "searchSetting": {
    "searchSettingTabTitle": "सेंटिंग की खोज करें",
    "defaultBufferDistanceLabel": "डिफ़ॉल्ट बफर दूरी निर्धारित करें",
    "maxResultCountLabel": "परिणामों की संख्या सीमित करें",
    "maxResultCountHintLabel": "सुझाव: द्र्श्यमान परिणामों की अधिकतम संख्या निर्धारित करें। मान 1 निकटतम फीचर लौटाएगा",
    "maxBufferDistanceLabel": "अधिकतम बफर दूरी निर्धारित करें",
    "bufferDistanceUnitLabel": "बफर दूरी की इकाइयाँ",
    "defaultBufferHintLabel": "सुझाव: बफर स्लाइडर के लिए डिफ़ॉल्ट मान निर्धारित करें",
    "maxBufferHintLabel": "सुझाव: बफर स्लाइडर के लिए अधिकतम मान निर्धारित करें",
    "bufferUnitLabel": "सुझाव: बफर बनाने के लिए इकाई निर्धारित करें",
    "selectGraphicLocationSymbol": "पता या स्थान का प्रतीक",
    "graphicLocationSymbolHintText": "सुझाव: खोजे गए पते या क्लिक किए स्थान के लिए प्रतीक",
    "addressLocationPolygonHintText": "संकेत: खोजे गए पॉलीगॉन लेयर के लिए प्रतीक",
    "popupTitleForPolygon": "चयनित पता स्थान के लिए पॉलीगॉन का चयन करें",
    "popupTitleForPolyline": "पता स्थान के लिए लाइन का चयन करें",
    "addressLocationPolylineHintText": "संकेत: खोजे गए पॉलीलाइन लेयर के लिए प्रतीक",
    "fontColorLabel": "खोज परिणामों के लिए फॉण्ट के रंग का चयन करें",
    "fontColorHintText": "सुझाव: खोज परिणामों का फॉण्ट रंग",
    "zoomToSelectedFeature": "चयनित फीचर पर ज़ूम करें",
    "zoomToSelectedFeatureHintText": "सुझाव: बफर के बजाए चयनित फीचर पर ज़ूम करें",
    "intersectSearchLocation": "इंटरसेक्ट करते बहुभुज लौटाएं",
    "intersectSearchLocationHintText": "सुझाव: बफर के भीतर बहुभुज की बजाए खोजे गए स्थान युक्त बहुभुज लौटाएँ",
    "enableProximitySearch": "निकटता खोज सक्षम करें",
    "enableProximitySearchHintText": "संकेत: किसी चयनित परिणाम के पास स्थान खोजने की क्षमता सक्षम करें",
    "bufferVisibilityLabel": "बफर की दृश्यता निर्धारित करें",
    "bufferVisibilityHintText": "सुझाव: बफर मानचित्र पर प्रदर्शित होगा",
    "bufferColorLabel": "बफर का प्रतीक निर्धारित करें",
    "bufferColorHintText": "सुझाव: बफर की पारदर्शिता और रंग का चयन करें",
    "searchLayerResultLabel": "केवल चयनित लेयर परिणाम बनाएँ",
    "searchLayerResultHint": "सुझाव: केवल खोज परिणामों में चयनित लेयर ही मानचित्र पर बनाई जाएगी",
    "showToolToSelectLabel": "स्थान बटन सेट करें",
    "showToolToSelectHintText": "सुझाव: जब मानचित्र पर क्लिक किया जाता है तब हमेशा स्थान की स्थापना के बजाय मानचित्र पर स्थान निर्धारित करने के लिए एक बटन प्रदान करता है",
    "geoDesicParamLabel": "geodesic बफर का प्रयोग करें",
    "geoDesicParamHintText": "सुझाव: यूक्लिडियन बफर (प्लानर) की बजाए geodesic बफर का प्रयोग करें"
  },
  "layerSelector": {
    "selectLayerLabel": "खोजी जाने वाली लेयर का चयन करें",
    "layerSelectionHint": "सुझाव: लेयर का चयन करने के लिए सेट बटन का प्रयोग करें",
    "addLayerButton": "सेट करें"
  },
  "routeSetting": {
    "routeSettingTabTitle": "दिशा-निर्देश सेटिंग",
    "routeServiceUrl": "रूटिंग सेवा",
    "buttonSet": "सेट करें",
    "routeServiceUrlHintText": "सुझाव: रूटिंग सेवा को चुनने और ब्राउज करने के लिए सेट करें पर क्लिक करें",
    "directionLengthUnit": "दिशा लंबाई इकाई",
    "unitsForRouteHintText": "सुझाव: मार्ग के लिए इकाइयाँ प्रदर्शित करने के लिए इस्तेमाल किया जाता है",
    "selectRouteSymbol": "मार्ग प्रदर्शित करने के लिए चिन्ह का चयन करें",
    "routeSymbolHintText": "सुझाव: मार्ग के रेखा चिन्ह को प्रदर्शित करने के लिए इस्तेमाल किया जाता है",
    "routingDisabledMsg": "दिशाएँ सक्षम करने के लिए यह सुनिश्चित करें कि एप्लिकेशन सेटिंग में आइटम पर रूटिंग को सक्षम किया गया है।"
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "प्रतीकात्मक सेटिंग",
    "addSymbologyBtnLabel": "नए प्रतीक जोड़ें",
    "layerNameTitle": "लेयर का नाम",
    "fieldTitle": "फ़ील्ड",
    "valuesTitle": "मान",
    "symbolTitle": "चिह्न",
    "actionsTitle": "कार्रवाइयाँ",
    "invalidConfigMsg": "डुप्लिकेट फ़ील्ड : लेयर के लिए ${fieldName} : ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "फ़िल्टर सेटिंग",
    "addTaskTip": "चयनित खोज लेयर में एक या अधिक फिल्टर जोड़ें और उनमें से प्रत्येक के लिए पैरामीटर कॉन्फ़िगर करें।",
    "enableMapFilter": "मानचित्र से पूर्व निर्धारित लेयर फिल्टर हटाएं।",
    "newFilter": "नया फ़िल्टर",
    "filterExpression": "समीकरण फिल्टर करें",
    "layerDefaultSymbolTip": "लेयर के डिफ़ॉल्ट प्रतीक का उपयोग करें",
    "uploadImage": "एक छवि अपलोड करें",
    "selectLayerTip": "कृपया एक लेयर का चयन करें।",
    "setTitleTip": "शीर्षक निर्धारित करें।",
    "noTasksTip": "कोई फिल्टर कॉन्फ़िगर नहीं किया गया है। नए को जोड़ने के लिए “${newFilter}\" पर क्लिक करें।",
    "collapseFiltersTip": "विजेट के खुले होने पर, (यदि कोई) फिल्टर एक्स्प्रेशन हो तो उसे बंद कर दें।",
    "groupFiltersTip": "लेयर के हिसाब से फ़िल्टर समूहीकृत करें"
  },
  "networkServiceChooser": {
    "arcgislabel": "ArcGIS Online से जोड़ें",
    "serviceURLabel": "सर्विस URL जोड़ें",
    "routeURL": "मार्ग का URL",
    "validateRouteURL": "मान्य करें",
    "exampleText": "उदाहरण",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "एक वैध मार्ग सेवा निर्दिष्ट करें।",
    "rateLimitExceeded": "रेट सीमा पार हो गई है। बाद में पुन: प्रयास करें।",
    "errorInvokingService": "उपयोगकर्ता नाम या पासवर्ड गलत है।"
  },
  "errorStrings": {
    "bufferErrorString": "कृपया मान्य सांख्यिक मान दर्ज करें।",
    "selectLayerErrorString": "कृपया खोजी जाने वाली लेयर का चयन करें।",
    "invalidDefaultValue": "डिफ़ॉल्ट बफर दूरी खाली नहीं हो सकती है। कृपया बफर दूरी निर्धारित करें",
    "invalidMaximumValue": "अधिकतम बफर दूरी खाली नहीं हो सकती है। कृपया बफर दूरी निर्धारित करें",
    "defaultValueLessThanMax": "कृपया अधिकतम सीमा के भीतर डिफ़ॉल्ट बफर दूरी निर्धारित करें",
    "defaultBufferValueGreaterThanOne": "डिफ़ॉल्ट बफ़र दूरी 0 से कम नहीं हो सकती है",
    "maximumBufferValueGreaterThanOne": "कृपया 0 से अधिक अधिकतम बफ़र दूरी निर्धारित करें",
    "invalidMaximumResultCountValue": "कृपया अधिकतम परिणामों की संख्या के लिए मान्य मान निर्धारित करें",
    "invalidSearchSources": "अवैध खोज स्रोत सेटिंग्स"
  },
  "symbolPickerPreviewText": "पूर्वावलोकन करें:"
});