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
      "displayText": "Mylios",
      "acronym": "myl."
    },
    "kilometers": {
      "displayText": "Kilometrai",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Pėdos",
      "acronym": "pėdos"
    },
    "meters": {
      "displayText": "Metrai",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Ieškoti šaltinio parametrų",
    "searchSourceSettingTitle": "Ieškoti šaltinio parametrų",
    "searchSourceSettingTitleHintText": "Pridėti ir sukonfigūruoti geokodavimo paslaugas arba elementų sluoksnius kaip paieškos šaltinius. Šie nurodyti šaltiniai nustato, ko galima ieškoti paieškos lauke",
    "addSearchSourceLabel": "Pridėti paieškos šaltinį",
    "featureLayerLabel": "Elementų sluoksnis",
    "geocoderLabel": "Geokoderis",
    "nameTitle": "Pavadinimas",
    "generalSettingLabel": "Bendrieji parametrai",
    "allPlaceholderLabel": "Vietos rezervavimo tekstas visų elementų paieškai:",
    "allPlaceholderHintText": "Užuomina: įveskite tekstą, kuris bus rodomas kaip vietos rezervavimo ženklas ieškant visų sluoksnių ir geokoderio",
    "generalSettingCheckboxLabel": "Rodyti kontekstinį langą, skirtą rastam elementui arba vietai",
    "countryCode": "Šalies arba regiono kodas (-ai)",
    "countryCodeEg": "pvz., ",
    "countryCodeHint": "Jei ši reikšmė nebus nurodyta, bus ieškomos visos šalys ir regionai",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Ieškoti tik esamo žemėlapio aprėptyje",
    "zoomScale": "Mastelis",
    "locatorUrl": "Geokoderio URL",
    "locatorName": "Geokoderio pavadinimas",
    "locatorExample": "Pavyzdys",
    "locatorWarning": "Ši geokodavimo paslaugos versija nepalaikoma. Valdiklis palaiko 10.0 arba vėlesnę geokodavimo paslaugą.",
    "locatorTips": "Pasiūlymų nėra, nes geokodavimo paslauga nepalaiko pasiūlymų galimybės.",
    "layerSource": "Sluoksnio šaltinis",
    "setLayerSource": "Nustatyti sluoksnio šaltinį",
    "setGeocoderURL": "Nustatyti geokoderio URL",
    "searchLayerTips": "Pasiūlymų nėra, nes elementų paslauga nepalaiko puslapių numeravimo galimybės.",
    "placeholder": "Vartotojui rodomas tekstas",
    "searchFields": "Paieškos laukai",
    "displayField": "Rodyti lauką",
    "exactMatch": "Tikslus atitikmuo",
    "maxSuggestions": "Maksimalūs pasiūlymai",
    "maxResults": "Maksimalus rezultatų skaičius",
    "enableLocalSearch": "Įgalinti vietinę paiešką",
    "minScale": "Minimalus mastelis",
    "minScaleHint": "Vietinė paieška bus taikoma, kai žemėlapio mastelis bus didesnis nei šis",
    "radius": "Spindulys",
    "radiusHint": "Nurodo ploto aplink dabartinį žemėlapio centrą spindulį, naudojamą geokodavimo objektams išdėstyti taip, kad arčiausiai vietos esantys objektai būtų pateikiami pirmiausia.",
    "meters": "Metrai",
    "setSearchFields": "Nustatyti paieškos laukus",
    "set": "Nustatyti",
    "fieldName": "Pavadinimas",
    "invalidUrlTip": "URL ${URL} yra neteisingas arba nepasiekiamas."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Paieškos nuostatos",
    "defaultBufferDistanceLabel": "Nustatyti numatytąją buferio atstumo reikšmę",
    "maxResultCountLabel": "Riboti rezultatų skaičių",
    "maxResultCountHintLabel": "Užuomina: nustatykite maksimalų matomų rezultatų skaičių. Vertė 1 pateiks artimiausią elementą",
    "maxBufferDistanceLabel": "Nustatyti maksimalią buferio atstumo reikšmę",
    "bufferDistanceUnitLabel": "Buferio atstumo vienetai",
    "defaultBufferHintLabel": "Užuomina: nustatykite buferio slankiklio numatytąją reikšmę",
    "maxBufferHintLabel": "Užuomina: nustatykite buferio slankiklio maksimalią reikšmę",
    "bufferUnitLabel": "Patarimas: nustatykite buferio kūrimo vienetą",
    "selectGraphicLocationSymbol": "Adreso arba vietos simbolis",
    "graphicLocationSymbolHintText": "Patarimas: ieškoto adreso arba spustelėtos vietos simbolis",
    "addressLocationPolygonHintText": "Pastaba: ieškomo poligonų sluoksnio simbolis",
    "popupTitleForPolygon": "Pasirinkite pasirinktos adreso vietos poligoną",
    "popupTitleForPolyline": "Pasirinkite adreso vietos liniją",
    "addressLocationPolylineHintText": "Pastaba: ieškomo linijų sluoksnio simbolis",
    "fontColorLabel": "Pasirinkti paieškos rezultatų šrifto spalvą",
    "fontColorHintText": "Patarimas: paieškos rezultatų šrifto spalva",
    "zoomToSelectedFeature": "Priartinti pasirinktą elementą",
    "zoomToSelectedFeatureHintText": "Užuomina: priartinkite prie pasirinkto elemento, o ne buferio",
    "intersectSearchLocation": "Grąžinti susikertančius plotus",
    "intersectSearchLocationHintText": "Užuomina: grąžina plotus, kuriuose yra ieškoma vieta, o ne plotus, esančius buferyje",
    "enableProximitySearch": "Įgalinti artumo paiešką",
    "enableProximitySearchHintText": "Pastaba: įgalinkite galimybę ieškoti vietų, esančių netoli jūsų pasirinkto rezultato",
    "bufferVisibilityLabel": "Nustayti buferio matomumą",
    "bufferVisibilityHintText": "Užuomina: buferis bus rodomas žemėlapyje",
    "bufferColorLabel": "Nustatyti buferio simbolį",
    "bufferColorHintText": "Užuomina: pasirinkite buferio spalvą ir skaidrumą",
    "searchLayerResultLabel": "Nubrėžti tik pasirinkto sluoksnio rezultatus",
    "searchLayerResultHint": "Užuomina: žemėlapyje bus vaizduojami tik pasirinkto sluoksnio paieškos rezultatai",
    "showToolToSelectLabel": "Vietos nustatymo mygtukas",
    "showToolToSelectHintText": "Užuomina: pateikiamas mygtukas, skirtas vietai žemėlapyje nustatyti, bet ne visada spustelėjus žemėlapį nustatoma vieta",
    "geoDesicParamLabel": "Naudoti geodezinį buferį",
    "geoDesicParamHintText": "Užuomina: naudokite geodezinį, o ne Euklido (plokščiąjį) buferį"
  },
  "layerSelector": {
    "selectLayerLabel": "Pasirinkti paieškos sluoksnį (-ius)",
    "layerSelectionHint": "Patarimas: sluoksniui (-iams) pasirinkti naudokite nustatymo mygtuką",
    "addLayerButton": "Nustatyti"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Krypčių nustatymai",
    "routeServiceUrl": "Maršruto paslauga",
    "buttonSet": "Nustatyti",
    "routeServiceUrlHintText": "Užuomina: norėdami rasti ir pasirinkti maršrutų paslaugą, spustelėkite Nustatyti",
    "directionLengthUnit": "Krypties ilgio vienetai",
    "unitsForRouteHintText": "Patarimas: naudojama maršruto vienetams rodyti",
    "selectRouteSymbol": "Pasirinkti maršruto rodymo simbolį",
    "routeSymbolHintText": "Patarimas: naudojamas maršruto linijos simboliui rodyti",
    "routingDisabledMsg": "Jei norite įjungti nuorodas, įsitikinkite, kad maršrutas įjungtas aplikacijos parametrų elemente."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Simbolizacijos parametrai",
    "addSymbologyBtnLabel": "Pridėti naujų simbolių",
    "layerNameTitle": "Sluoksnio pavadinimas",
    "fieldTitle": "Laukas",
    "valuesTitle": "Reikšmės",
    "symbolTitle": "Simbolis",
    "actionsTitle": "Veiksmai",
    "invalidConfigMsg": "Pasikartojantis laukas: sluoksnio ${fieldName}: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Filtro parametrai",
    "addTaskTip": "Pridėti vieną arba daugiau filtrų į pasirinktą paieškos sluoksnį (-ius) ir konfigūruoti kiekvieno iš jų parametrus.",
    "enableMapFilter": "Pašalinti iš anksto nustatytą sluoksnio filtrą iš žemėlapio.",
    "newFilter": "Naujas filtras",
    "filterExpression": "Filtravimo išraiška",
    "layerDefaultSymbolTip": "Naudoti sluoksnio numatytąjį simbolį",
    "uploadImage": "Įkelti paveikslėlį",
    "selectLayerTip": "Pasirinkite sluoksnį.",
    "setTitleTip": "Nurodykite pavadinimą.",
    "noTasksTip": "Nesukonfigūruota jokių filtrų. Norėdami pridėti naują, spustelėkite \"${newFilter}\".",
    "collapseFiltersTip": "Suglausti filtro išraiškas (jei tokių yra), kai atidaromas valdiklis",
    "groupFiltersTip": "Grupuoti filtrus pagal sluoksnį"
  },
  "networkServiceChooser": {
    "arcgislabel": "Pridėti iš ArcGIS Online",
    "serviceURLabel": "Pridėti paslaugos URL",
    "routeURL": "Maršruto URL",
    "validateRouteURL": "Tikrinti",
    "exampleText": "Pavyzdys",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Nurodykite galiojančią maršruto paslaugą.",
    "rateLimitExceeded": "Viršytas apribojimo limitas. Pabandykite dar kartą vėliau.",
    "errorInvokingService": "Vartotojo vardas arba slaptažodis neteisingas."
  },
  "errorStrings": {
    "bufferErrorString": "Įveskite leistiną skaitinę reikšmę.",
    "selectLayerErrorString": "Pasirinkite ieškos sluoksnį (-ius)",
    "invalidDefaultValue": "Numatytasis buferio atstumas negali būti tuščias. Nurodykite buferio atstumą",
    "invalidMaximumValue": "Maksimalus buferio atstumas negali būti tuščias. Nurodykite buferio atstumą",
    "defaultValueLessThanMax": "Nurodykite numatytąjį buferio atstumą maksimaliose ribose",
    "defaultBufferValueGreaterThanOne": "Numatytasis buferio atstumas negali būti mažesnis nei 0",
    "maximumBufferValueGreaterThanOne": "Nurodykite maksimalų buferio atstumą didesnį už 0",
    "invalidMaximumResultCountValue": "Nurodykite tinkamą maksimalaus rezultatų skaičiaus reikšmę",
    "invalidSearchSources": "Netinkami paieškos šaltinio parametrai"
  },
  "symbolPickerPreviewText": "Peržiūra:"
});