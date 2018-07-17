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
    "title": "Sök- och buffertinställningar",
    "mainHint": "Du kan aktivera textsökningar av adresser och funktioner, geometridigitalisering och buffring."
  },
  "addressSourceSetting": {
    "title": "Adresslager",
    "mainHint": "Du kan ange vilket/vilka mottagaretikettlager som är tillgängliga."
  },
  "notificationSetting": {
    "title": "Meddelandealternativ",
    "mainHint": "Du kan ange vilka typer av meddelanden som ska vara tillgängliga."
  },
  "groupingLabels": {
    "addressSources": "Lager som ska användas för att välja mottagarlager",
    "averyStickersDetails": "Klistermärken från Avery(r)",
    "csvDetails": "Fil med kommaavgränsade värden (CSV-fil)",
    "drawingTools": "Ritverktyg för att ange område",
    "featureLayerDetails": "geoobjektlager",
    "geocoderDetails": "Geokodare",
    "labelFormats": "Tillgängliga etikettformat",
    "printingOptions": "Alternativ för utskrivna etikettsidor",
    "searchSources": "Sökkällor",
    "stickerFormatDetails": "Parametrar för etikettsida"
  },
  "hints": {
    "alignmentAids": "Märken som läggs till på etikettsidan hjälper dig att rikta in sidan i skrivaren",
    "csvNameList": "En kommaavgränsad lista med skiftlägeskänsliga fältnamn",
    "horizontalGap": "Utrymme mellan två etiketter på en rad",
    "insetToLabel": "Utrymme mellan sidan av etiketten och inledningen på texten",
    "labelFormatDescription": "Hur etikettstil presenteras i widgetens lista med formatalternativ",
    "labelFormatDescriptionHint": "Tipsruta som kompletterar beskrivningen i listan med formatalternativ",
    "labelHeight": "Höjden på varje etikett på sidan",
    "labelWidth": "Bredden på varje etikett på sidan",
    "localSearchRadius": "Anger radien för ett område kring den aktuella kartans mitt som ska användas för att höja rangordningen för geokodningskandidater så att de kandidater som är närmast platsen returneras först",
    "rasterResolution": "100 bildpunkter per tum matchar ungefär skärmens upplösning. Ju högre upplösning desto mer webbläsarminne krävs. Olika webbläsare har olika kapacitet att smidigt hantera minneskrävande funktioner.",
    "selectionListOfOptionsToDisplay": "Markerade objekt visas som alternativ i widgeten, ändra ordning som du önskar",
    "verticalGap": "Utrymme mellan två etiketter i en kolumn"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Standardbuffertavstånd",
    "bufferUnits": "Buffertenheter som tillhandahålls i widgeten",
    "countryRegionCodes": "Lands- eller regionkoder",
    "description": "Beskrivning",
    "descriptionHint": "Beskrivningstips",
    "displayField": "Visningsfält",
    "drawingToolsFreehandPolygon": "Frihandspolygon",
    "drawingToolsLine": "linje",
    "drawingToolsPoint": "punkt",
    "drawingToolsPolygon": "polygon",
    "drawingToolsPolyline": "Polylinje",
    "enableLocalSearch": "Aktivera lokal sökning",
    "exactMatch": "Exakt matchning",
    "fontSizeAlignmentNote": "Teckenstorlek för anteckning om utskriftsmarginaler",
    "gridDarkness": "Dunkelhet för rutnät",
    "gridlineLeftInset": "Infällning vänster stödlinje",
    "gridlineMajorTickMarksGap": "Huvudintervallstreck varje",
    "gridlineMinorTickMarksGap": "Delintervallstreck varje",
    "gridlineRightInset": "Infällning höger stödlinje",
    "labelBorderDarkness": "Dunkelhet för etikettgräns",
    "labelBottomEdge": "Nederkant för etiketter på sidan",
    "labelFontSize": "Teckenstorlek",
    "labelHeight": "Etiketthöjd",
    "labelHorizontalGap": "Horisontellt mellanrum",
    "labelInitialInset": "Infällning till etikettext",
    "labelLeftEdge": "Vänsterkant för etiketter på sidan",
    "labelMaxLineCount": "Maximalt antal rader på etiketten",
    "labelPageHeight": "Sidhöjd",
    "labelPageWidth": "Sidbredd",
    "labelRightEdge": "Högerkant för etiketter på sidan",
    "labelsInAColumn": "Antal etiketter i en kolumn",
    "labelsInARow": "Antal etiketter i en rad",
    "labelTopEdge": "Överkant för etiketter på sidan",
    "labelVerticalGap": "Vertikalt mellanrum",
    "labelWidth": "Etikettbredd",
    "limitSearchToMapExtent": "Sök bara i den aktuella kartutbredningen",
    "maximumResults": "Maximalt antal resultat",
    "maximumSuggestions": "Maximalt antal förslag",
    "minimumScale": "Minimal skala",
    "name": "Namn",
    "percentBlack": "% svart",
    "pixels": "pixlar",
    "pixelsPerInch": "pixlar per tum",
    "placeholderText": "Platshållartext",
    "placeholderTextForAllSources": "Platshållartext för sökning i alla källor",
    "radius": "Radie",
    "rasterResolution": "Rasterupplösning",
    "searchFields": "Sökfält",
    "showAlignmentAids": "Visa justeringshjälpmedel på sidan",
    "showGridTickMarks": "Visa rutnätsintervallstreck",
    "showLabelOutlines": "Visa etikettsilhuetter",
    "showPopupForFoundItem": "Visa popup för det hittade geoobjekt eller den hittade platsen",
    "tool": "Verktyg",
    "units": "Enheter",
    "url": "URL",
    "urlToGeometryService": "URL till geometritjänst",
    "useRelatedRecords": "Använd dess relaterade poster",
    "useSecondarySearchLayer": "Använd sekundärt urvalslager",
    "useSelectionDrawTools": "Använd ritverktyg för markering",
    "useVectorFonts": "Använd vektortypsnitt (endast latinska typsnitt)",
    "zoomScale": "Zoomningsskala"
  },
  "buttons": {
    "addAddressSource": "Lägg till lager med adressetiketter i dess popupfönster",
    "addLabelFormat": "Lägg till ett etikettformat",
    "addSearchSource": "Lägg till en sökkälla",
    "set": "Ange"
  },
  "placeholders": {
    "averyExample": "t.ex. Avery(r) etikett ${averyPartNumber}",
    "countryRegionCodes": "t.ex. USA,CHN",
    "descriptionCSV": "Kommaavgränsade värden",
    "descriptionPDF": "PDF-etikett ${heightLabelIn} x ${widthLabelIn} tum; ${labelsPerPage} per sida"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Hämta geoobjektlagret från webbkartan",
    "openCountryCodes": "Klicka om du vill ha mer information om koder",
    "openFieldSelector": "Klicka om du vill öppna en fältväljare",
    "setAndValidateURL": "Ange och validera URL:en"
  },
  "problems": {
    "noAddresseeLayers": "Ange minst ett mottagarlager",
    "noBufferUnitsForDrawingTools": "Konfigurera minst en buffertenhet för ritverktygen",
    "noBufferUnitsForSearchSource": "Konfigurera minst en buffertenhet för sökkällan \"${sourceName}”",
    "noGeometryServiceURL": "Konfigurera URL till geometritjänst",
    "noNotificationLabelFormats": "Ange minst ett format för meddelandeetikett",
    "noSearchSourceFields": "Konfigurera minst ett eller flera sökfält för sökkällan \"${sourceName}”",
    "noSearchSourceURL": "Konfigurera URL för sökkällan \"${sourceName}”"
  }
});