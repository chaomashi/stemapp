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
    "title": "Zoek- en bufferinstellingen",
    "mainHint": "U kunt het doorzoeken van tekst van adressen en objecten, digitalisering van geometrie en buffering inschakelen."
  },
  "addressSourceSetting": {
    "title": "Adreslagen",
    "mainHint": "U kunt opgeven welke labellaag (-lagen) voor geadresseerde beschikbaar is."
  },
  "notificationSetting": {
    "title": "Meldingsopties",
    "mainHint": "U kunt opgeven welke soorten meldingen beschikbaar zijn."
  },
  "groupingLabels": {
    "addressSources": "Te gebruiken laag om geadresseerde lagen te selecteren",
    "averyStickersDetails": "Avery(r)-stickers",
    "csvDetails": "Bestand met door komma's gescheiden waarden (CSV)",
    "drawingTools": "Tekentools voor het specificeren van gebied",
    "featureLayerDetails": "Objectlaag",
    "geocoderDetails": "Geocoder",
    "labelFormats": "Beschikbare labelformats",
    "printingOptions": "Opties voor afgedrukte labelpagina's",
    "searchSources": "Zoek bronnen",
    "stickerFormatDetails": "Labelpaginaparameters"
  },
  "hints": {
    "alignmentAids": "Markeringen toegevoegd aan de labelpagina om u te helpen de pagina uit te lijnen met uw printer",
    "csvNameList": "Een door komma's gescheiden lijst van hoofdlettergevoelige veldnamen",
    "horizontalGap": "Ruimte tussen twee labels in een rij",
    "insetToLabel": "Ruimte tussen de zijkant van het label en het begin van de tekst",
    "labelFormatDescription": "Hoe labelstijl wordt gepresenteerd in lijst met widgetindelingsopties",
    "labelFormatDescriptionHint": "Tooltip om de beschrijving in de lijst met widgetindelingsopties aan te vullen",
    "labelHeight": "Hoogte van elk label op de pagina",
    "labelWidth": "Breedte van elk label op de pagina",
    "localSearchRadius": "Specificeert de straal van een gebied rond het huidige kaartcentrum dat wordt gebruikt om de positie van geocoderingskandidaten te verhogen, zodat kandidaten die zich het dichtst bij de locatie bevinden eerst worden geretourneerd",
    "rasterResolution": "100 pixels per inch komt ongeveer overeen met de schermresolutie. Hoe hoger de resolutie, hoe meer browsergeheugen nodig is. Browsers verschillen in hun vermogen om op een elegante manier om te gaan met grote geheugenbehoeften.",
    "selectionListOfOptionsToDisplay": "Gecontroleerde elementen worden weergegeven als opties in de widget; verander de orde zoals gewenst",
    "verticalGap": "Ruimte tussen twee labels in een kolom"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Standaard bufferafstand",
    "bufferUnits": "Buffereenheden om in widget te voorzien",
    "countryRegionCodes": "Land- of regiocodes",
    "description": "Beschrijving",
    "descriptionHint": "Beschrijvingshint",
    "displayField": "Weergaveveld",
    "drawingToolsFreehandPolygon": "Vrije hand vlak",
    "drawingToolsLine": "lijn",
    "drawingToolsPoint": "punt",
    "drawingToolsPolygon": "vlak",
    "drawingToolsPolyline": "polylijn",
    "enableLocalSearch": "Lokaal zoeken inschakelen",
    "exactMatch": "Exacte match",
    "fontSizeAlignmentNote": "Tekengrootte voor opmerking over afdrukmarges",
    "gridDarkness": "Raster duisternis",
    "gridlineLeftInset": "Linker gridlijn inzet",
    "gridlineMajorTickMarksGap": "Grote vinkjes iedere",
    "gridlineMinorTickMarksGap": "Kleine vinkjes iedere",
    "gridlineRightInset": "Inzet in de rechterrasterlijn",
    "labelBorderDarkness": "Labelgrens duisternis",
    "labelBottomEdge": "Onderrand van labels op pagina",
    "labelFontSize": "Tekengrootte",
    "labelHeight": "Labelhoogte",
    "labelHorizontalGap": "Horizontale opening",
    "labelInitialInset": "Inzet om tekst te labelen",
    "labelLeftEdge": "Linkerkant van labels op pagina",
    "labelMaxLineCount": "Maximum aantal regels in label",
    "labelPageHeight": "Paginahoogte",
    "labelPageWidth": "Paginabreedte",
    "labelRightEdge": "Rechterrand van labels op pagina",
    "labelsInAColumn": "Aantal labels in een kolom",
    "labelsInARow": "Aantal labels in een rij",
    "labelTopEdge": "Bovenste rand van labels op pagina",
    "labelVerticalGap": "Verticale opening",
    "labelWidth": "Labelbreedte",
    "limitSearchToMapExtent": "Alleen zoeken in huidige kaartextent",
    "maximumResults": "Maximum aantal resultaten",
    "maximumSuggestions": "Maximale suggesties",
    "minimumScale": "Minimumschaal",
    "name": "Naam",
    "percentBlack": "% zwart",
    "pixels": "pixels",
    "pixelsPerInch": "pixels per inch",
    "placeholderText": "Tekst van tijdelijke aanduiding",
    "placeholderTextForAllSources": "Tekst van tijdelijke aanduiding voor het doorzoeken van alle bronnen",
    "radius": "Straal",
    "rasterResolution": "Straalresolutie",
    "searchFields": "Zoekvelden",
    "showAlignmentAids": "Toon uitlijntools op pagina",
    "showGridTickMarks": "Rastervinkjes weergeven",
    "showLabelOutlines": "Toon labelomtrekken",
    "showPopupForFoundItem": "Pop-up weergeven voor gevonden object of locatie",
    "tool": "Tools",
    "units": "Eenheden",
    "url": "URL",
    "urlToGeometryService": "URL naar geometrieservice",
    "useRelatedRecords": "Bijbehorende records gebruiken",
    "useSecondarySearchLayer": "Secundaire selectielaag gebruiken",
    "useSelectionDrawTools": "Gebruik selectietekengereedschap",
    "useVectorFonts": "Gebruik vectorlettertypen (alleen Latijnse lettertypen)",
    "zoomScale": "Schaal voor voor in-/uitzoomen"
  },
  "buttons": {
    "addAddressSource": "Laag met adreslabels toevoegen in de pop-up",
    "addLabelFormat": "Labelopmaak toevoegen",
    "addSearchSource": "Zoekbron toevoegen",
    "set": "Instellen"
  },
  "placeholders": {
    "averyExample": "bvb., Avery(r) label ${averyPartNumber}",
    "countryRegionCodes": "bvb., USA,CHN",
    "descriptionCSV": "Door komma's gescheiden waarden",
    "descriptionPDF": "PDF-label ${heightLabelIn} x ${widthLabelIn} inches; ${labelsPerPage} per pagina"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Haal de objectlaag uit de webmap",
    "openCountryCodes": "Klik om meer informatie over codes te krijgen",
    "openFieldSelector": "Klik om een ​​veldselector te openen",
    "setAndValidateURL": "Stel de URL in en valideer deze"
  },
  "problems": {
    "noAddresseeLayers": "Specificeer ten minste één geadresseerde laag",
    "noBufferUnitsForDrawingTools": "Configureer ten minste één bufferunit voor het tekengereedschap",
    "noBufferUnitsForSearchSource": "Configureer ten minste één bufferunit voor zoekbron \"${sourceName}\"",
    "noGeometryServiceURL": "Configureer de URL naar de geometrieservice",
    "noNotificationLabelFormats": "Specificeer ten minste één notificatie label formaat",
    "noSearchSourceFields": "Configureer één of meer zoekvelden voor zoekbron \"${sourceName}\"",
    "noSearchSourceURL": "Configureer de URL voor zoekbron \"${sourceName}\""
  }
});