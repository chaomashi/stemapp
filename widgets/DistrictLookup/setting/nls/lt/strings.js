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
    "miles": "Mylios",
    "kilometers": "Kilometrai",
    "feet": "Pėdos",
    "meters": "Metrai"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Paieškos nuostatos",
    "buttonSet": "Nustatyti",
    "selectLayersLabel": "Pasirinkite sluoksnį",
    "selectLayersHintText": "Pastaba: naudojama plotų sluoksniui ir jo susijusių taškų sluoksniui pasirinkti.",
    "selectPrecinctSymbolLabel": "Pasirinkti poligono paryškinimo simbolį",
    "selectGraphicLocationSymbol": "Adreso arba vietos simbolis",
    "graphicLocationSymbolHintText": "Patarimas: ieškoto adreso arba spustelėtos vietos simbolis",
    "precinctSymbolHintText": "Patarimas: naudojama pasirinkto poligono simboliui rodyti",
    "selectColorForPoint": "Pasirinkti spalvą taškui paryškinti",
    "selectColorForPointHintText": "Užuomina: naudojama norint paryškinti pasirinkto taško spalvą"
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
    "invalidUrlTip": "URL ${URL} yra neteisingas arba nepasiekiamas.",
    "invalidSearchSources": "Netinkami paieškos šaltinio parametrai"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Pasirinkti poligono sluoksnį",
    "selectPolygonLayerHintText": "Patarimas: naudojama poligono sluoksniui pasirinkti.",
    "selectRelatedPointLayerLabel": "Pasirinkti su poligono sluoksniu susijusį taškų sluoksnį",
    "selectRelatedPointLayerHintText": "Pastaba: naudojama su poligono sluoksniu susijusiam taškų sluoksniui pasirinkti",
    "polygonLayerNotHavingRelatedLayer": "Pasirinkite poligono sluoksnį, kuriame yra susijusių taškų sluoksnis.",
    "errorInSelectingPolygonLayer": "Pasirinkite poligono sluoksnį, kuriame yra susijusių taškų sluoksnis.",
    "errorInSelectingRelatedLayer": "Pasirinkite su poligono sluoksniu susijusį taškų sluoksnį"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Krypčių nustatymai",
    "routeServiceUrl": "Maršruto paslauga",
    "buttonSet": "Nustatyti",
    "routeServiceUrlHintText": "Patarimas: spustelėkite „Nustatyti“, jei norite naršyti ir pasirinkti tinklo analizės maršruto paslaugą",
    "directionLengthUnit": "Krypties ilgio vienetai",
    "unitsForRouteHintText": "Patarimas: naudojama maršruto nurodytiems vienetams rodyti",
    "selectRouteSymbol": "Pasirinkti maršruto rodymo simbolį",
    "routeSymbolHintText": "Patarimas: naudojamas maršruto linijos simboliui rodyti",
    "routingDisabledMsg": "Jei norite įjungti nuorodas, įsitikinkite, kad maršrutas įjungtas ArcGIS Online elemente."
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
  "symbolPickerPreviewText": "Peržiūra:",
  "showToolToSelectLabel": "Vietos nustatymo mygtukas",
  "showToolToSelectHintText": "Užuomina: pateikiamas mygtukas, skirtas vietai žemėlapyje nustatyti, bet ne visada spustelėjus žemėlapį nustatoma vieta"
});