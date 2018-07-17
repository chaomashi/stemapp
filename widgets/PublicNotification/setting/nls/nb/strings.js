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
    "title": "Søke- og bufferinnstillinger",
    "mainHint": "Du kan aktivere tekstsøk etter adresser og geoobjekter, geometridigitalisering og buffere."
  },
  "addressSourceSetting": {
    "title": "Adresselag",
    "mainHint": "Du kan angi hvilke adressatetikettlag som er tilgjengelige."
  },
  "notificationSetting": {
    "title": "Varselalternativer",
    "mainHint": "Du kan angi hvilke typer varsler som er tilgjengelige."
  },
  "groupingLabels": {
    "addressSources": "Lag som skal brukes til å velge adressatlag",
    "averyStickersDetails": "Avery(r)-etiketter",
    "csvDetails": "Kommadelt verdifil (CSV)",
    "drawingTools": "Tegneverktøy for angivelse av område",
    "featureLayerDetails": "Geoobjektslag",
    "geocoderDetails": "Geokoder",
    "labelFormats": "Tilgjengelige etikettformater",
    "printingOptions": "Alternativer for utskrevne etikettsider",
    "searchSources": "Søk i kilder",
    "stickerFormatDetails": "Sideparametere for etiketter"
  },
  "hints": {
    "alignmentAids": "Merker er lagt til i etikettsiden for å hjelpe deg med å justere siden til skriveren din",
    "csvNameList": "En kommadelt liste over feltnavn der det skilles mellom små og store bokstaver",
    "horizontalGap": "Mellomrom mellom to etiketter i en rad",
    "insetToLabel": "Mellomrom mellom siden av etiketten og begynnelsen av teksten",
    "labelFormatDescription": "Hvordan etikettstilen vises i listen med widgetformatalternativer",
    "labelFormatDescriptionHint": "Verktøytips som supplerer beskrivelsen i listen med formatalternativer",
    "labelHeight": "Høyde for hver etikett på siden",
    "labelWidth": "Bredde for hver etikett på siden",
    "localSearchRadius": "Angir radiusen for et område rundt det gjeldende midtpunktet i kartet som brukes til å styrke rangeringen til geokodingskandidater, slik at kandidater nærmest lokasjonen returneres først",
    "rasterResolution": "100 piksler per tomme passer omtrent for skjermoppløsningen. Jo høyere oppløsning, jo større nettleserminne kreves. Nettlesere har forskjellig evne til å håndtere store krav til minne.",
    "selectionListOfOptionsToDisplay": "Merkede elementer vises som alternativer i widgeten, endre rekkefølge etter behov",
    "verticalGap": "Mellomrom mellom to etiketter i en kolonne"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Standard bufferavstand",
    "bufferUnits": "Bufferenheter som skal angis i widgeten",
    "countryRegionCodes": "Lands- eller regionskoder",
    "description": "Beskrivelse",
    "descriptionHint": "Beskrivelsestips",
    "displayField": "Visningsfelt",
    "drawingToolsFreehandPolygon": "frihåndspolygon",
    "drawingToolsLine": "linje",
    "drawingToolsPoint": "punkt",
    "drawingToolsPolygon": "polygon",
    "drawingToolsPolyline": "polylinje",
    "enableLocalSearch": "Aktiver lokalt søk",
    "exactMatch": "Nøyaktig samsvar",
    "fontSizeAlignmentNote": "Skriftstørrelse for merknad om utskriftsmarger",
    "gridDarkness": "Mørkhet for rutenett",
    "gridlineLeftInset": "Innsetting av venstre støttelinje",
    "gridlineMajorTickMarksGap": "Store aksemerker for hver",
    "gridlineMinorTickMarksGap": "Små aksemerker for hver",
    "gridlineRightInset": "Innsetting av høyre støttelinje",
    "labelBorderDarkness": "Mørkhet for etikettkantlinje",
    "labelBottomEdge": "Nedre kant av etiketter på side",
    "labelFontSize": "Skriftstørrelse",
    "labelHeight": "Etiketthøyde",
    "labelHorizontalGap": "Vannrett mellomrom",
    "labelInitialInset": "Sett inn i etikettekst",
    "labelLeftEdge": "Venstre kant av etiketter på side",
    "labelMaxLineCount": "Maksimalt antall linjer i etikett",
    "labelPageHeight": "Sidehøyde",
    "labelPageWidth": "Sidebredde",
    "labelRightEdge": "Høyre kant av etiketter på side",
    "labelsInAColumn": "Antall etiketter i en kolonne",
    "labelsInARow": "Antall etiketter i en rad",
    "labelTopEdge": "Øvre kant av etiketter på side",
    "labelVerticalGap": "Loddrett mellomrom",
    "labelWidth": "Etikettbredde",
    "limitSearchToMapExtent": "Søk kun i gjeldende kartutstrekning",
    "maximumResults": "Maksimum antall resultater",
    "maximumSuggestions": "Maksimum antall forslag",
    "minimumScale": "Minste målestokk",
    "name": "Navn",
    "percentBlack": "% svart",
    "pixels": "piksler",
    "pixelsPerInch": "piksler per tomme",
    "placeholderText": "Plassholdertekst",
    "placeholderTextForAllSources": "Plassholdertekst for søk i alle kilder",
    "radius": "Radius",
    "rasterResolution": "Rasteroppløsning",
    "searchFields": "Søkefelter",
    "showAlignmentAids": "Vis justeringshjelpemidler på side",
    "showGridTickMarks": "Vis aksemerker",
    "showLabelOutlines": "Vis etikettomriss",
    "showPopupForFoundItem": "Vis popuptekst for funnet geoobjekt eller lokasjon",
    "tool": "Verktøy",
    "units": "Enheter",
    "url": "URL",
    "urlToGeometryService": "URL til geometritjeneste",
    "useRelatedRecords": "Bruk relaterte poster",
    "useSecondarySearchLayer": "Bruk sekundært utvalgslag",
    "useSelectionDrawTools": "Bruk tegneverktøy for utvalg",
    "useVectorFonts": "Bruk vektorskrifter (bare latinske skrifter)",
    "zoomScale": "Zoomeskala"
  },
  "buttons": {
    "addAddressSource": "Legg til lag som inneholder adresseetiketter i popupen",
    "addLabelFormat": "Legg til etikettformat",
    "addSearchSource": "Legg til søkekilde",
    "set": "Angi"
  },
  "placeholders": {
    "averyExample": "f.eks. Avery(r)-etikett ${averyPartNumber}",
    "countryRegionCodes": "f.eks. USA,CHN",
    "descriptionCSV": "Kommadelte verdier",
    "descriptionPDF": "PDF-etikett ${heightLabelIn} x ${widthLabelIn} tommer; ${labelsPerPage} per side"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Hent geoobjektlaget fra webkartet",
    "openCountryCodes": "Klikk for å få mer informasjon om koder",
    "openFieldSelector": "Klikk for å åpne en feltvelger",
    "setAndValidateURL": "Angi og valider URL-en"
  },
  "problems": {
    "noAddresseeLayers": "Angi minst ett adressatlag",
    "noBufferUnitsForDrawingTools": "Konfigurer minst én bufferenhet for tegneverktøyene",
    "noBufferUnitsForSearchSource": "Konfigurer minst én bufferenhet for søkekilden \"${sourceName}\"",
    "noGeometryServiceURL": "Konfigurer URL-en til geometritjenesten",
    "noNotificationLabelFormats": "Angi mist ett etikettformat for varsler",
    "noSearchSourceFields": "Konfigurer ett eller flere felt for søkekilden \"${sourceName}\"",
    "noSearchSourceURL": "Konfigurer URL-en for søkekilden \"${sourceName}\""
  }
});