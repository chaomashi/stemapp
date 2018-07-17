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
    "miles": "मील",
    "kilometers": "किलोमीटर",
    "feet": "फ़ीट",
    "meters": "मीटर"
  },
  "layerSetting": {
    "layerSettingTabTitle": "सेंटिंग की खोज करें",
    "buttonSet": "सेट करें",
    "selectLayersLabel": "लेयर का चयन करें",
    "selectLayersHintText": "सुझाव: बहुभुज लेयर और इससे संबंधित बिंदु लेयर का चयन करने के लिए इस्तेमाल किया जाता है।",
    "selectPrecinctSymbolLabel": "बहुभुज को हाइलाइट करने के लिए चिन्ह का चयन करें",
    "selectGraphicLocationSymbol": "पता या स्थान का चिन्ह",
    "graphicLocationSymbolHintText": "सुझाव: खोजे गए पते या क्लिक किए स्थान के लिए चिन्ह",
    "precinctSymbolHintText": "सुझाव: चयनित बहुभुज के लिए चिन्ह को प्रदर्शित करने के लिए इस्तेमाल किया जाता है",
    "selectColorForPoint": "बिंदु को हाइलाइट करने के लिए रंग का चयन करें",
    "selectColorForPointHintText": "सुझाव: चयनित बिंदु के लिए हाइलाइट रंग प्रदर्शित करने के लिए इस्तेमाल किया जाता है"
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
    "allPlaceholderHintText": "सुझाव: सभी लेयरों और Geocoder की खोज करते समय प्लेसहोल्डर के रूप में दिखाए जाने के लिए टेक्स्ट दर्ज किया जा सकता है",
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
    "invalidUrlTip": "URL ${URL} अवैध या दुर्गम है।",
    "invalidSearchSources": "अवैध खोज स्रोत सेटिंग्स"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "बहुभुज लेयर का चयन करें",
    "selectPolygonLayerHintText": "सुझाव: बहुभुज लेयर का चयन करने के लिए इस्तेमाल किया जाता है।",
    "selectRelatedPointLayerLabel": "बहुभुज लेयर से संबंधित बिंदु लेयर का चयन करें",
    "selectRelatedPointLayerHintText": "सुझाव: बहुभुज लेयर से संबंधित बिंदु लेयर का चयन करने के लिए इस्तेमाल किया जाता है",
    "polygonLayerNotHavingRelatedLayer": "कृपया उस बहुभुज लेयर का चयन करें जिसकी संबंधित बिंदु लेयर है।",
    "errorInSelectingPolygonLayer": "कृपया उस बहुभुज लेयर का चयन करें जिसकी संबंधित बिंदु लेयर है।",
    "errorInSelectingRelatedLayer": "कृपया बहुभुज लेयर से संबंधित बिंदु लेयर का चयन करें।"
  },
  "routeSetting": {
    "routeSettingTabTitle": "दिशा-निर्देश सेटिंग",
    "routeServiceUrl": "रूटिंग सेवा",
    "buttonSet": "सेट करें",
    "routeServiceUrlHintText": "सुझाव: ब्राउज़ करने के लिए 'सेट' पर क्लिक करें और एक नेटवर्क विश्लेषण रूटिंग सेवा का चयन करें",
    "directionLengthUnit": "दिशा लंबाई इकाई",
    "unitsForRouteHintText": "सुझाव: मार्ग के लिए सूचना इकाइयों को प्रदर्शित करने के लिए इस्तेमाल किया जाता है",
    "selectRouteSymbol": "मार्ग प्रदर्शित करने के लिए चिन्ह का चयन करें",
    "routeSymbolHintText": "सुझाव: मार्ग के रेखा चिन्ह को प्रदर्शित करने के लिए इस्तेमाल किया जाता है",
    "routingDisabledMsg": "दिशाओं को सक्षम करने के लिए सुनिश्चित करें कि मार्ग ArcGIS ऑनलाइन आइटम में सक्षम है।"
  },
  "networkServiceChooser": {
    "arcgislabel": "ArcGIS ऑनलाइन से जोड़ें",
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
  "symbolPickerPreviewText": "पूर्वावलोकन करें:",
  "showToolToSelectLabel": "स्थान बटन सेट करें",
  "showToolToSelectHintText": "सुझाव: जब मानचित्र पर क्लिक किया जाता है तब हमेशा स्थान की स्थापना के बजाय मानचित्र पर स्थान निर्धारित करने के लिए एक बटन प्रदान करता है"
});