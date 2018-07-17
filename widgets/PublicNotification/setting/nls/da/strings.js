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
    "title": "Søgnings- og bufferindstillinger",
    "mainHint": "Du kan aktivere tekstsøgninger efter adresser og objekter, geometri-digitalisering og buffere."
  },
  "addressSourceSetting": {
    "title": "Adresselag",
    "mainHint": "Du kan angive, hvilke adressat-etiketlag, der er tilgængelige."
  },
  "notificationSetting": {
    "title": "Meddelelsesindstillinger",
    "mainHint": "Du kan angive, hvilke typer meddelelser der er tilgængelige."
  },
  "groupingLabels": {
    "addressSources": "Lag til brug til valg af adressat-lag",
    "averyStickersDetails": "Avery(r)-etiketter",
    "csvDetails": "Kommasepareret værdifil (CSV)",
    "drawingTools": "Tegneværktøjer til angivelse af område",
    "featureLayerDetails": "Vektorlag",
    "geocoderDetails": "Geokoder",
    "labelFormats": "Tilgængelig etiketformater",
    "printingOptions": "Indstillinger for udskrevne etiketsider",
    "searchSources": "Søg i kilder",
    "stickerFormatDetails": "Sideparametre for etiketter"
  },
  "hints": {
    "alignmentAids": "Der er tilføjet mærker til etiketsiden for at hjælpe dig med at justere siden til din printer",
    "csvNameList": "En kommasepareret liste over feltnavne, hvor der skelnes mellem store og små bogstaver",
    "horizontalGap": "Mellemrum mellem to etiketter i en række",
    "insetToLabel": "Mellemrum mellem siden af etiketten og starten på teksten",
    "labelFormatDescription": "Hvordan etikettypografien vises i listen med widget-formatindstillinger",
    "labelFormatDescriptionHint": "Værktøjstip, der supplerer beskrivelsen i listen med formatindstillinger",
    "labelHeight": "Højde for hver etiket på siden",
    "labelWidth": "Højde for hver etiket på siden",
    "localSearchRadius": "Angiver radius for et område omkring det aktuelle kortcentrum, der benyttes til at booste rangordningen af geokodningsforslag, så de forslag, der ligger tættest på placeringen, returneres først",
    "rasterResolution": "100 pixels pr. tomme marcher omtrent skærmopløsningen. Jo højere opløsning, jo mere browserhukommelse kræves der. Browsere er forskellige med hensyn til deres evne til at håndtere store hukommelseskrav.",
    "selectionListOfOptionsToDisplay": "Markerede elementer vises som indstillinger i widget'en; skift rækkefølge efter behov",
    "verticalGap": "Mellemrum mellem to etiketter i en kolonne"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Standardbufferafstand",
    "bufferUnits": "Bufferenheder, der skal angives i widget'en",
    "countryRegionCodes": "Lande- eller regionskoder",
    "description": "Beskrivelse",
    "descriptionHint": "Beskrivelsestip",
    "displayField": "Visningsfelt",
    "drawingToolsFreehandPolygon": "frihåndspolygon",
    "drawingToolsLine": "linje",
    "drawingToolsPoint": "0.",
    "drawingToolsPolygon": "polygon",
    "drawingToolsPolyline": "polylinje",
    "enableLocalSearch": "Aktivér lokal søgning",
    "exactMatch": "Nøjagtigt match",
    "fontSizeAlignmentNote": "Skrifttypestørrelse for note om udskrivning af marginer",
    "gridDarkness": "Gittermørkhed",
    "gridlineLeftInset": "Venstre gitterlinje-indsætning",
    "gridlineMajorTickMarksGap": "Store mærker for hver",
    "gridlineMinorTickMarksGap": "Små mærker for hver",
    "gridlineRightInset": "Højre gitterlinje-indsætning",
    "labelBorderDarkness": "Etiketrammemørkhed",
    "labelBottomEdge": "Nederste kant af etiketter på side",
    "labelFontSize": "Skriftstørrelse",
    "labelHeight": "Etikethøjde",
    "labelHorizontalGap": "Vandret mellemrum",
    "labelInitialInset": "Indsæt i etikettekst",
    "labelLeftEdge": "Venstre kant af etiketter på side",
    "labelMaxLineCount": "Maksimalt antal linjer i etiket",
    "labelPageHeight": "Sidehøjde",
    "labelPageWidth": "Sidebredde",
    "labelRightEdge": "Højre kant af etiketter på side",
    "labelsInAColumn": "Antal etiketter i en kolonne",
    "labelsInARow": "Antal etiketter i en række",
    "labelTopEdge": "Øverste kant af etiketter på side",
    "labelVerticalGap": "Lodret mellemrum",
    "labelWidth": "Etiketbredde",
    "limitSearchToMapExtent": "Søg kun inden for den aktuelle kortudstrækning",
    "maximumResults": "Maksimalt antal resultater",
    "maximumSuggestions": "Maksimalt antal forslag",
    "minimumScale": "Minimalt målestoksforhold",
    "name": "Navn",
    "percentBlack": "% sort",
    "pixels": "pixler",
    "pixelsPerInch": "pixels pr. tomme",
    "placeholderText": "Pladsholdertekst",
    "placeholderTextForAllSources": "Pladsholdertekst for søgning efter alle kilder",
    "radius": "Radius",
    "rasterResolution": "Rasteropløsning",
    "searchFields": "Søgefelter",
    "showAlignmentAids": "Vis justeringsmærker på side",
    "showGridTickMarks": "Vis gittermærker",
    "showLabelOutlines": "Vis etiketkonturer",
    "showPopupForFoundItem": "Vis pop-up for det fundne objekt eller den fundne position",
    "tool": "Værktøjer",
    "units": "Enheder",
    "url": "URL",
    "urlToGeometryService": "URL til geometritjeneste",
    "useRelatedRecords": "Brug relaterede poster",
    "useSecondarySearchLayer": "Brug sekundært markeringslag",
    "useSelectionDrawTools": "Brug markeringstegneværktøjer",
    "useVectorFonts": "Brug vektorbaserede skrifttyper (kun latinske skrifttyper)",
    "zoomScale": "Zoom-skala"
  },
  "buttons": {
    "addAddressSource": "Tilføj lag, der indeholder adresse-etiketter i popup'en",
    "addLabelFormat": "Tilføj et etiketformat",
    "addSearchSource": "Tilføj en søgekilde",
    "set": "Indstil"
  },
  "placeholders": {
    "averyExample": "f.eks. Avery(r)-etiket ${averyPartNumber}",
    "countryRegionCodes": "f.eks. USA,CHN",
    "descriptionCSV": "Kommaseparerede værdier",
    "descriptionPDF": "PDF-etiket ${heightLabelIn} x ${widthLabelIn} tommer; ${labelsPerPage} pr. side"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Hent vektorlag fra webkortet",
    "openCountryCodes": "Klik for at få yderligere oplysninger om koder",
    "openFieldSelector": "Klik for at åbne en feltvælger",
    "setAndValidateURL": "Angiv og validér URL'en"
  },
  "problems": {
    "noAddresseeLayers": "Angiv mindst et adressat-lag",
    "noBufferUnitsForDrawingTools": "Konfigurér mindst en bufferenhed til tegneværktøjer",
    "noBufferUnitsForSearchSource": "Konfigurér mindst en bufferenhed til søgekilde \"${sourceName}”",
    "noGeometryServiceURL": "Konfigurér URL’en til geometritjenesten",
    "noNotificationLabelFormats": "Angiv mindst et etiketformat til meddelelser",
    "noSearchSourceFields": "Konfigurér et eller flere søgefelter til søgekilde \"${sourceName}”",
    "noSearchSourceURL": "Konfigurér URL’en til søgekilde \"${sourceName}”"
  }
});