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
    "title": "Nastavení vyhledávání a obalové zóny",
    "mainHint": "Můžete povolit textové vyhledávání adres a prvků, digitalizaci geometrií a vytváření obalových zón."
  },
  "addressSourceSetting": {
    "title": "Vrstvy adres",
    "mainHint": "Můžete specifikovat, které vrstvy popisků adresátů jsou dostupné."
  },
  "notificationSetting": {
    "title": "Možnosti oznámení",
    "mainHint": "Můžete specifikovat, které typy oznámení jsou dostupné."
  },
  "groupingLabels": {
    "addressSources": "Vrstva, která se má použít pro výběr vrstev adresátů",
    "averyStickersDetails": "Etikety Avery(r)",
    "csvDetails": "Soubor CSV (hodnoty oddělené čárkami)",
    "drawingTools": "Nástroje kreslení pro stanovení oblasti",
    "featureLayerDetails": "Vrstva prvků",
    "geocoderDetails": "Geokodér",
    "labelFormats": "Dostupné formáty popisků",
    "printingOptions": "Možnosti pro tištěné stránky popisků",
    "searchSources": "Hledat zdroje",
    "stickerFormatDetails": "Parametry stránky popisků"
  },
  "hints": {
    "alignmentAids": "Značky přidané na stránku popisků pomáhají se zarovnáním stránky s vaší tiskárnou",
    "csvNameList": "Seznam názvů polí, u kterých se rozlišují malá a velká písmena, oddělený čárkou",
    "horizontalGap": "Mezera mezi dvěma popisky v řadě",
    "insetToLabel": "Mezera mezi stranou popisku a začátkem textu",
    "labelFormatDescription": "Způsob, jakým je prezentován styl popisků v seznamu možností formátování ve widgetu",
    "labelFormatDescriptionHint": "Plovoucí popisek, který nahrazuje popis v seznamu možností formátování",
    "labelHeight": "Výška každého popisku na stránce",
    "labelWidth": "Šířka každého popisku na stránce",
    "localSearchRadius": "Stanoví poloměr oblasti okolo centra aktuální mapy, který se použije ke zvýšení hodnoty kandidátů geokódování, aby byli kandidáti nejblíže umístění vráceni jako první.",
    "rasterResolution": "Rozlišení obrazovky odpovídá asi 100 pixelům/palec. Čím vyšší rozlišení je, tím více paměti prohlížeč potřebuje. Různé prohlížeče se s vysokými nároky na paměť dokáží vypořádat jinak.",
    "selectionListOfOptionsToDisplay": "Zaškrtnuté položky jsou ve widgetu zobrazeny jako možnosti. Jejich řazení můžete libovolně měnit.",
    "verticalGap": "Mezera mezi dvěma popisky ve sloupci"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Výchozí šířka obalové zóny",
    "bufferUnits": "Jednotky obalové zóny poskytnuté ve widgetu",
    "countryRegionCodes": "Kódy země nebo oblasti",
    "description": "Popis",
    "descriptionHint": "Nápověda popisu",
    "displayField": "Zobrazované pole",
    "drawingToolsFreehandPolygon": "polygon od ruky",
    "drawingToolsLine": "linie",
    "drawingToolsPoint": "bod",
    "drawingToolsPolygon": "polygon",
    "drawingToolsPolyline": "polylinie",
    "enableLocalSearch": "Povolit lokální vyhledávání",
    "exactMatch": "Přesná shoda",
    "fontSizeAlignmentNote": "Velikost písma poznámky o okrajích tisku",
    "gridDarkness": "Tmavost mřížky",
    "gridlineLeftInset": "Vsazení levé linky mřížky",
    "gridlineMajorTickMarksGap": "Větší značky každých",
    "gridlineMinorTickMarksGap": "Menší značky každých",
    "gridlineRightInset": "Vsazení pravé linky mřížky",
    "labelBorderDarkness": "Tmavost hranice popisku",
    "labelBottomEdge": "Spodní hrana popisků na stránce",
    "labelFontSize": "Velikost písma",
    "labelHeight": "Výška popisku",
    "labelHorizontalGap": "Horizontální mezera",
    "labelInitialInset": "Vsazení do textu popisku",
    "labelLeftEdge": "Levá hrana popisků na stránce",
    "labelMaxLineCount": "Maximální počet řádků v popisku",
    "labelPageHeight": "Výška stránky",
    "labelPageWidth": "Šířka stránky",
    "labelRightEdge": "Pravá hrana popisků na stránce",
    "labelsInAColumn": "Počet popisků ve sloupci",
    "labelsInARow": "Počet popisků v řádku",
    "labelTopEdge": "Horní hrana popisků na stránce",
    "labelVerticalGap": "Vertikální mezera",
    "labelWidth": "Šířka popisku",
    "limitSearchToMapExtent": "Vyhledávat pouze v aktuálním rozsahu mapy",
    "maximumResults": "Maximální počet výsledků",
    "maximumSuggestions": "Maximální počet návrhů",
    "minimumScale": "Minimální měřítko",
    "name": "Název",
    "percentBlack": "% černá",
    "pixels": "pixelů",
    "pixelsPerInch": "pixelů na palec",
    "placeholderText": "Zástupný text",
    "placeholderTextForAllSources": "Zástupný text pro vyhledávání všech zdrojů",
    "radius": "Poloměr",
    "rasterResolution": "Rozlišení rastru",
    "searchFields": "Prohledávaná pole",
    "showAlignmentAids": "Zobrazit na stránce pomůcky pro zarovnání",
    "showGridTickMarks": "Zobrazit značky mřížky",
    "showLabelOutlines": "Zobrazit obrysy popisků",
    "showPopupForFoundItem": "Zobrazit vyskakovací okno pro nalezený prvek nebo umístění",
    "tool": "Nástroje",
    "units": "Jednotky",
    "url": "URL",
    "urlToGeometryService": "URL na geometrickou službu",
    "useRelatedRecords": "Použít související záznamy",
    "useSecondarySearchLayer": "Použít sekundární vrstvu výběru",
    "useSelectionDrawTools": "Použijte výběr nástrojů pro kreslení",
    "useVectorFonts": "Použít vektorová písma (pouze latinková písma)",
    "zoomScale": "Měřítko přiblížení"
  },
  "buttons": {
    "addAddressSource": "Přidat do tohoto vyskakovacího okna vrstvu obsahující popisky adres",
    "addLabelFormat": "Přidat formát popisku",
    "addSearchSource": "Přidat zdroj vyhledávání",
    "set": "Nastavit"
  },
  "placeholders": {
    "averyExample": "např. popisek Avery(r) ${averyPartNumber}",
    "countryRegionCodes": "např. USA,CHN",
    "descriptionCSV": "Hodnoty oddělené čárkou",
    "descriptionPDF": "PDF popisek ${heightLabelIn} x ${widthLabelIn} palců; ${labelsPerPage} na stránku"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Získat vrstvu prvků z webové mapy",
    "openCountryCodes": "Pro více informací o kódech klikněte zde",
    "openFieldSelector": "Pro otevření nástroje pro výběr polí klikněte zde",
    "setAndValidateURL": "Nastavit a ověřit adresu URL"
  },
  "problems": {
    "noAddresseeLayers": "Určete prosím alespoň jednu vrstvu adresáta",
    "noBufferUnitsForDrawingTools": "Konfigurujte prosím alespoň jednu jednotku šířky obalové zóny pro nástroje pro kreslení",
    "noBufferUnitsForSearchSource": "Konfigurujte prosím alespoň jednu jednotku šířky obalové zóny pro zdroj vyhledávání \"${sourceName}\"",
    "noGeometryServiceURL": "Konfigurujte prosím adresu URL geometrické služby",
    "noNotificationLabelFormats": "Určete prosím alespoň jeden formát popisku upozornění",
    "noSearchSourceFields": "Konfigurujte prosím jedno nebo několik polí vyhledávání pro zdroj vyhledávání \"${sourceName}\"",
    "noSearchSourceURL": "Konfigurujte prosím dresu URL zdroje vyhledávání „${sourceName}“"
  }
});