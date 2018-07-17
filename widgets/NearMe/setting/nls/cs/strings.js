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
      "displayText": "Míle",
      "acronym": "míle"
    },
    "kilometers": {
      "displayText": "Kilometry",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Stopy",
      "acronym": "stop"
    },
    "meters": {
      "displayText": "Metry",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Nastavení zdroje vyhledávání",
    "searchSourceSettingTitle": "Nastavení zdroje vyhledávání",
    "searchSourceSettingTitleHintText": "Přidejte služby geokódování nebo vrstvy prvků a nakonfigurujte je jako zdroje vyhledávání. Tyto zadané zdroje budou určovat, co je možné vyhledávat v rámci pole pro hledání.",
    "addSearchSourceLabel": "Přidat zdroj vyhledávání",
    "featureLayerLabel": "Vrstva prvků",
    "geocoderLabel": "Geokodér",
    "nameTitle": "Název",
    "generalSettingLabel": "Obecné nastavení",
    "allPlaceholderLabel": "Zástupný text pro vyhledávání všech výsledků:",
    "allPlaceholderHintText": "Nápověda: Zadejte text, který se má zobrazit jako zástupný při prohledávání všech vrstev a geokodéru.",
    "generalSettingCheckboxLabel": "Zobrazit vyskakovací okno pro nalezený prvek nebo umístění",
    "countryCode": "Kódy země nebo oblasti",
    "countryCodeEg": "např. ",
    "countryCodeHint": "Pokud toto pole ponecháte prázdné, prohledají se všechny země a oblasti",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Vyhledávat pouze v aktuálním rozsahu mapy",
    "zoomScale": "Měřítko přiblížení",
    "locatorUrl": "URL geokodéru",
    "locatorName": "Název geokodéru",
    "locatorExample": "Příklad",
    "locatorWarning": "Tato verze služby geokódování není podporována. Tento widget podporuje službu geokódování verze 10.0 a novější.",
    "locatorTips": "Návrhy nejsou k dispozici, protože služba geokódování nepodporuje funkcionalitu návrhů.",
    "layerSource": "Zdroj vrstvy",
    "setLayerSource": "Nastavit zdroj vrstvy",
    "setGeocoderURL": "Nastavit adresu URL geokodéru",
    "searchLayerTips": "Návrhy nejsou k dispozici, protože služba Feature Service nepodporuje funkcionalitu stránkování.",
    "placeholder": "Zástupný text",
    "searchFields": "Prohledávané pole",
    "displayField": "Zobrazované pole",
    "exactMatch": "Přesná shoda",
    "maxSuggestions": "Maximální počet návrhů",
    "maxResults": "Maximální počet výsledků",
    "enableLocalSearch": "Povolit lokální vyhledávání",
    "minScale": "Min. měřítko",
    "minScaleHint": "Když je měřítko mapy větší než toto měřítko, použije se lokální vyhledávání.",
    "radius": "Poloměr",
    "radiusHint": "Stanoví poloměr oblasti okolo centra aktuální mapy, který se použije ke zvýšení hodnoty kandidátů geokódování, aby byli kandidáti nejblíže umístění vráceni jako první.",
    "meters": "Metry",
    "setSearchFields": "Nastavit prohledávané pole",
    "set": "Nastavit",
    "fieldName": "Název",
    "invalidUrlTip": "Adresa URL ${URL} je neplatná nebo nepřístupná."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Prohledat nastavení",
    "defaultBufferDistanceLabel": "Nastavte výchozí šířku obalové zóny",
    "maxResultCountLabel": "Omezit počet výsledků",
    "maxResultCountHintLabel": "Nápověda: Nastavuje maximální počet viditelných výsledků. Hodnota 1 vrátí nejbližší prvek.",
    "maxBufferDistanceLabel": "Nastavte maximální šířku obalové zóny",
    "bufferDistanceUnitLabel": "Jednotky šířky obalové zóny.",
    "defaultBufferHintLabel": "Rada: Umožňuje nastavit výchozí hodnotu posuvníku šířky obalové zóny.",
    "maxBufferHintLabel": "Rada: Umožňuje nastavit maximální hodnotu posuvníku šířky obalové zóny.",
    "bufferUnitLabel": "Rada: Definujte jednotku pro vytvoření obalové zóny.",
    "selectGraphicLocationSymbol": "Symbol adresy nebo umístění",
    "graphicLocationSymbolHintText": "Rada: Symbol vyhledávané adresy nebo umístění určeného kliknutím.",
    "addressLocationPolygonHintText": "Nápověda: symbol pro hledanou polygonovou vrstvu",
    "popupTitleForPolygon": "Vyberte polygon pro vybrané umístění adresy",
    "popupTitleForPolyline": "Vyberte polygon pro umístění adresy",
    "addressLocationPolylineHintText": "Nápověda: symbol pro hledanou polyliniovou vrstvu",
    "fontColorLabel": "Vyberte barvu písma pro výsledky vyhledávání.",
    "fontColorHintText": "Rada: Barva písma výsledků vyhledávání.",
    "zoomToSelectedFeature": "Přiblížit zobrazení na vybraný prvek",
    "zoomToSelectedFeatureHintText": "Rada: Umožňuje přiblížit na zvolený prvek namísto obalové zóny.",
    "intersectSearchLocation": "Vrátit protínající se polygony",
    "intersectSearchLocationHintText": "Rada: Slouží k vrácení polygonů, které obsahují vyhledávané umístění, namísto polygonů v obalové zóně.",
    "enableProximitySearch": "Povolit vyhledávání blízkých umístění",
    "enableProximitySearchHintText": "Nápověda: Povolí možnost hledat umístění blízko zvoleného výsledku",
    "bufferVisibilityLabel": "Nastavit viditelnost obalové zóny",
    "bufferVisibilityHintText": "Rada: Obalová zóna se zobrazí na mapě.",
    "bufferColorLabel": "Nastavit symbol obalové zóny",
    "bufferColorHintText": "Rada: Vyberte barvu a průhlednost obalové zóny.",
    "searchLayerResultLabel": "Vykreslovat pouze výsledky vybrané vrstvy",
    "searchLayerResultHint": "Rada: V mapě se vykreslí pouze vrstva vybraná ve výsledcích vyhledávání.",
    "showToolToSelectLabel": "Nastavit tlačítko polohy",
    "showToolToSelectHintText": "Nápověda: Umožňuje nastavit umístění na mapě pomocí tlačítka namísto nastavení umístění při každém kliknutí na mapu.",
    "geoDesicParamLabel": "Použít geodetickou obalovou zónu",
    "geoDesicParamHintText": "Nápověda: Použije geodetickou obalovou zónu namísto Euklidovské (planární) obalové zóny."
  },
  "layerSelector": {
    "selectLayerLabel": "Vyberte vrstvy pro vyhledávání",
    "layerSelectionHint": "Rada: Použijte tlačítko výběru ke zvolení vrstev.",
    "addLayerButton": "Nastavit"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Nastavení trasování",
    "routeServiceUrl": "Služba trasování",
    "buttonSet": "Nastavit",
    "routeServiceUrlHintText": "Rada: Klikněte na tlačítko Nastavit a zvolte službu trasování.",
    "directionLengthUnit": "Jednotky délky směru",
    "unitsForRouteHintText": "Rada: Slouží k zobrazení jednotek trasy.",
    "selectRouteSymbol": "Vyberte symbol k zobrazení trasy.",
    "routeSymbolHintText": "Rada: Slouží k zobrazení liniového symbolu trasy.",
    "routingDisabledMsg": "Aby bylo možné používat navigaci, ujistěte se, že je v položce v nastavení aplikace povoleno trasování."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Nastavení symboliky",
    "addSymbologyBtnLabel": "Přidat nové symboly",
    "layerNameTitle": "Jméno vrstvy",
    "fieldTitle": "Pole",
    "valuesTitle": "Hodnoty",
    "symbolTitle": "Symbol",
    "actionsTitle": "Akce",
    "invalidConfigMsg": "Duplicitní pole: ${fieldName} pro vrstvu: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Nastavení filtru",
    "addTaskTip": "Přidejte do vybraných vrstev pro vyhledávání jeden nebo více filtrů a konfigurujte parametry těchto dotazů.",
    "enableMapFilter": "Odebere přednastavený filtr vrstvy z mapy.",
    "newFilter": "Nový filtr",
    "filterExpression": "Výraz filtru",
    "layerDefaultSymbolTip": "Použít výchozí symbol vrstvy",
    "uploadImage": "Nahrát obrázek",
    "selectLayerTip": "Vyberte vrstvu.",
    "setTitleTip": "Nastavte název.",
    "noTasksTip": "Nejsou nakonfigurovány žádné filtry. Přidejte nový filtr kliknutím na tlačítko \"${newFilter}\".",
    "collapseFiltersTip": "Při otevření widgetu sbalit výrazy filtru (pokud jsou zadány)",
    "groupFiltersTip": "Seskupit filtry dle vrstvy"
  },
  "networkServiceChooser": {
    "arcgislabel": "Přidat z ArcGIS Online",
    "serviceURLabel": "Přidat URL služby",
    "routeURL": "URL trasy",
    "validateRouteURL": "Ověřit",
    "exampleText": "Příklad",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Zadejte platnou službu způsobu trasování.",
    "rateLimitExceeded": "Byl překročen limit přenosové rychlosti. Zkuste to prosím znovu.",
    "errorInvokingService": "Uživatelské jméno nebo heslo je nesprávné."
  },
  "errorStrings": {
    "bufferErrorString": "Zadejte platnou číselnou hodnotu.",
    "selectLayerErrorString": "Vyberte vrstvy pro vyhledávání.",
    "invalidDefaultValue": "Výchozí šířka obalové zóny nemůže být prázdná. Zadejte šířku obalové zóny.",
    "invalidMaximumValue": "Maximální šířka obalové zóny nemůže být prázdná. Zadejte šířku obalové zóny.",
    "defaultValueLessThanMax": "Zadejte výchozí šířku obalové zóny v rámci maximálního omezení.",
    "defaultBufferValueGreaterThanOne": "Výchozí šířka obalové zóny nemůže být menší než 0.",
    "maximumBufferValueGreaterThanOne": "Zadejte maximální šířku obalové zóny větší než 0.",
    "invalidMaximumResultCountValue": "Zadejte prosím hodnotu maximálního počtu výsledků.",
    "invalidSearchSources": "Neplatné nastavení zdroje vyhledávání"
  },
  "symbolPickerPreviewText": "Náhled:"
});