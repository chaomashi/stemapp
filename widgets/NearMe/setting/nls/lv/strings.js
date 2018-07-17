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
      "displayText": "Jūdzes",
      "acronym": "jūdzes"
    },
    "kilometers": {
      "displayText": "Kilometri",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Pēdas",
      "acronym": "pēdas"
    },
    "meters": {
      "displayText": "Metri",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Meklēšanas avota iestatījumi",
    "searchSourceSettingTitle": "Meklēšanas avota iestatījumi",
    "searchSourceSettingTitleHintText": "Pievienojiet un konfigurējiet ģeokodēšanas servisus vai elementu slāņus kā meklēšanas avotus. Šie norādītie avoti nosaka, ko var meklēt meklēšanas lodziņā.",
    "addSearchSourceLabel": "Pievienot meklēšanas avotu",
    "featureLayerLabel": "Elementu slānis",
    "geocoderLabel": "Ģeokodētājs",
    "nameTitle": "Nosaukums",
    "generalSettingLabel": "Vispārīgs iestatījums",
    "allPlaceholderLabel": "Viettura teksts visu vērtību meklēšanai:",
    "allPlaceholderHintText": "Mājiens: ievadiet tekstu, kas tiks rādīts kā vietturis, kad meklēsit visus slāņus un ģeokodētāju",
    "generalSettingCheckboxLabel": "Rādīt atrastā elementa vai novietojuma uznirstošo logu",
    "countryCode": "Valsts vai reģiona kods(-i)",
    "countryCodeEg": "piem., ",
    "countryCodeHint": "Ja šī vērtība tiks atstāta tukša, tiks meklētas visas valstis un reģioni.",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Meklēt tikai pašreizējā kartes pārklājumā",
    "zoomScale": "Zoom Scale",
    "locatorUrl": "Ģeokodētāja URL",
    "locatorName": "Ģeokodētāja nosaukums",
    "locatorExample": "Piemērs",
    "locatorWarning": "Šī ģeokodēšanas pakalpojuma versija netiek atbalstīta. Šis logrīks atbalsta ģeokodēšanas pakalpojuma versiju 10.0 un jaunākas.",
    "locatorTips": "Ieteikumi nav pieejami, jo ģeokodēšanas pakalpojums neatbalsta ieteikšanas iespēju.",
    "layerSource": "Slāņa avots",
    "setLayerSource": "Iestatīt slāņa avotu",
    "setGeocoderURL": "Iestatīt ģeokodētāja vietrādi URL",
    "searchLayerTips": "Ieteikumi nav pieejami, jo elementu pakalpojums neatbalsta lappušu numerācijas iespēju.",
    "placeholder": "Viettura teksts",
    "searchFields": "Meklēšanas lauki",
    "displayField": "Rādīt lauku",
    "exactMatch": "Precīza atbilstība",
    "maxSuggestions": "Ieteikumu maksimums",
    "maxResults": "Maks. rezultātu skaits",
    "enableLocalSearch": "Iespējot lokālo meklēšanu",
    "minScale": "Minimālo vērtību mērogs",
    "minScaleHint": "Ja kartes mērogs ir lielāks par šo mērogu, tiks lietota lokālā meklēšana",
    "radius": "Rādiuss",
    "radiusHint": "Norāda tā apgabala rādiusu ap pašreizējo kartes centru, kas tiek izmantots, lai uzlabotu ģeokodēšanas kandidātu rangu, lai vispirms tiktu atgriezti izvietojumam tuvākie kandidāti",
    "meters": "Metri",
    "setSearchFields": "Iestatīt meklēšanas laukus",
    "set": "Uzstādīt",
    "fieldName": "Nosaukums",
    "invalidUrlTip": "URL ${URL} nav derīgs vai tam nevar piekļūt."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Meklēšanas iestatījumi",
    "defaultBufferDistanceLabel": "Iestatīt noklusējuma buferzonas attālumu",
    "maxResultCountLabel": "Ierobežots rezultātu skaits",
    "maxResultCountHintLabel": "Mājiens: iestatiet redzamu rezultātu maksimālo skaitu. Vērtība 1 atgriezīs tuvāko elementu",
    "maxBufferDistanceLabel": "Iestatīt maksimālo buferzonas attālumu",
    "bufferDistanceUnitLabel": "Buferzonas attāluma vienības",
    "defaultBufferHintLabel": "Padoms. Iestatiet buferzonas slīdņa noklusējuma vērtību",
    "maxBufferHintLabel": "Padoms. Iestatiet buferzonas slīdņa maksimālo vērtību",
    "bufferUnitLabel": "Padoms. Definējiet vienību buferzonas izveidei",
    "selectGraphicLocationSymbol": "Adreses vai izvietojuma simbols",
    "graphicLocationSymbolHintText": "Padoms. Meklētas adreses vai noklikšķināta izvietojuma simbols",
    "addressLocationPolygonHintText": "Padoms. Meklētā laukuma slāņa simbols",
    "popupTitleForPolygon": "Izvēlēties literāli izvēlētajai adreses vietai",
    "popupTitleForPolyline": "Izvēlēties līniju adreses vietai",
    "addressLocationPolylineHintText": "Padoms. Meklētā polilīnijas slāņa simbols",
    "fontColorLabel": "Izvēlēties meklēšanas rezultātu fonta krāsu",
    "fontColorHintText": "Padoms. Meklēšanas rezultātu fonta krāsa",
    "zoomToSelectedFeature": "Mērogmainīt līdz atlasītajam elementam",
    "zoomToSelectedFeatureHintText": "Padoms. Buferzonas vietā mērogmainiet līdz atlasītajam elementam",
    "intersectSearchLocation": "Atgriezt šķērsojošo(-s) laukumu(-s)",
    "intersectSearchLocationHintText": "Padoms. Atgrieziet laukumu(-s), kuros ietverts meklētais izvietojums, nevis laukumus ar buferzonu",
    "enableProximitySearch": "Iespējot apkārtnes analīzes meklēšanu",
    "enableProximitySearchHintText": "Uzvedne: iespējojiet iespēju meklēt novietojumus izvēlēto rezultātu tuvumā",
    "bufferVisibilityLabel": "Iestatīt buferzonas redzamību",
    "bufferVisibilityHintText": "Padoms. Buferzona tiks parādīta kartē",
    "bufferColorLabel": "Iestatīt buferzonas simbolu",
    "bufferColorHintText": "Padoms. Atlasiet krāsu un buferzonas caurspīdīgumu",
    "searchLayerResultLabel": "Zīmēt tikai atlasītā slāņa rezultātus",
    "searchLayerResultHint": "Padoms. Kartē tiks zīmēts tikai atlasītais slānis meklēšanas rezultātos",
    "showToolToSelectLabel": "Iestatīt izvietojuma pogu",
    "showToolToSelectHintText": "Padoms: nodrošina pogu novietojuma iestatīšanai kartē tā vietā, lai iestatītu novietojumu ikreiz, kad tiek noklikšķināts uz kartes",
    "geoDesicParamLabel": "Izmantot ģeodēzisko buferzonu",
    "geoDesicParamHintText": "Mājiens: izmantojiet ģeodēzisko buferzonu Eiklīda (plaknes) buferzonas vietā"
  },
  "layerSelector": {
    "selectLayerLabel": "Atlasīt meklēšanas slāni(ņus)",
    "layerSelectionHint": "Padoms. Lai izvēlētos slāni(ņus), izmantojiet iestatīšanas pogu",
    "addLayerButton": "Iestatīt"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Virzienu iestatījumi",
    "routeServiceUrl": "Maršruta pakalpojums",
    "buttonSet": "Iestatīt",
    "routeServiceUrlHintText": "Padoms: Noklikšķiniet uz Iestatīt, lai pārlūkotu un izvēlētos maršruta servisu",
    "directionLengthUnit": "Virziena garuma vienības",
    "unitsForRouteHintText": "Padoms. Izmanto maršruta vienību rādīšanai",
    "selectRouteSymbol": "Izvēlēties maršruta rādīšanas simbolu",
    "routeSymbolHintText": "Padoms. Izmanto, lai parādītu maršruta līnijas simbolu",
    "routingDisabledMsg": "Lai aktivizētu norādes, pārliecinieties, vai lietotnes iestatījumos vienībai ir iespējota maršrutēšana."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Simbolu iestatījumi",
    "addSymbologyBtnLabel": "Pievienot jaunus simbolus",
    "layerNameTitle": "Slāņa nosaukums",
    "fieldTitle": "Lauks",
    "valuesTitle": "Vērtības",
    "symbolTitle": "Simbols",
    "actionsTitle": "Darbības",
    "invalidConfigMsg": "Lauka dublikāts: ${fieldName} slānim: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Filtra iestatījumi",
    "addTaskTip": "Pievienojiet izvēlētajam(-iem) meklēšanas slānim(-ņiem) vienu vai vairākus filtrus un konfigurējiet katra filtra parametrus.",
    "enableMapFilter": "Noņemiet iepriekš iestatīto slāņu filtru no kartes,",
    "newFilter": "Jauns filtrs",
    "filterExpression": "Filtra izteiksme",
    "layerDefaultSymbolTip": "Izmantot slāņa noklusējuma simbolu",
    "uploadImage": "Augšupielādēt attēlu",
    "selectLayerTip": "Lūdzu, izvēlieties slāni.",
    "setTitleTip": "Lūdzu, iestatiet virsrakstu.",
    "noTasksTip": "Nav konfigurēts neviens filtrs. Lai pievienotu jaunu filtru, noklikšķiniet uz “${newFilter}”.",
    "collapseFiltersTip": "Samazināt filtra izteiksmes (ja tādas ir), kad logrīks tiek atvērts",
    "groupFiltersTip": "Grupēt filtrus pēc slāņa"
  },
  "networkServiceChooser": {
    "arcgislabel": "Pievienot no ArcGIS Online",
    "serviceURLabel": "Pievienot pakalpojuma vietrādi URL",
    "routeURL": "Maršruta URL",
    "validateRouteURL": "Validēt",
    "exampleText": "Piemērs",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Norādiet derīgu maršruta pakalpojumu.",
    "rateLimitExceeded": "Pārsniegts ātruma ierobežojums. Lūduz, vēlāk mēģiniet vēlreiz.",
    "errorInvokingService": "Nepareizs lietotājvārds vai parole."
  },
  "errorStrings": {
    "bufferErrorString": "Ievadiet skaitlisku vērtību.",
    "selectLayerErrorString": "Izvēlieties slāni(ņus), kur meklēt.",
    "invalidDefaultValue": "Noklusējuma buferzonas attālums nedrīkst būt tukšs. Norādiet buferzonas attālumu",
    "invalidMaximumValue": "Maksimālais buferzonas attālums nedrīkst būt tukšs. Norādiet buferzonas attālumu",
    "defaultValueLessThanMax": "Norādiet noklusējuma buferzonas attālumu, nepārsniedzot maksimālo ierobežojumu",
    "defaultBufferValueGreaterThanOne": "Noklusējuma buferzonas attālums nevar būt mazāks par 0",
    "maximumBufferValueGreaterThanOne": "Norādiet maksimālo buferzonas attālumu, kas ir lielāks par 0",
    "invalidMaximumResultCountValue": "Norādiet maksimālā rezultātu skaita derīgu vērtību",
    "invalidSearchSources": "Nederīgi meklēšanas avota iestatījumi"
  },
  "symbolPickerPreviewText": "Priekšskatījums:"
});