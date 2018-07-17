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
    "title": "Nastavitve iskanja in obrisov",
    "mainHint": "Omogočite lahko iskanje naslovov in geoobjektov, digitaliziranje geometrije in obrisovanje."
  },
  "addressSourceSetting": {
    "title": "Sloji naslovov",
    "mainHint": "Navedete lahko, kateri napisi slojev naslovnika so na voljo."
  },
  "notificationSetting": {
    "title": "Možnosti obvestila",
    "mainHint": "Navedete lahko, kateri tipi obvestila so na voljo."
  },
  "groupingLabels": {
    "addressSources": "Sloj za uporabo pri izbiri slojev naslovnikov",
    "averyStickersDetails": "Nalepke Avery(r)",
    "csvDetails": "Datoteka vrednosti, ločenih z vejico (CSV)",
    "drawingTools": "Orodja za risanje za določanje območja",
    "featureLayerDetails": "Geoobjektni sloj",
    "geocoderDetails": "Geokodirnik",
    "labelFormats": "Razpoložljivi formati napisov",
    "printingOptions": "Možnosti za natisnjene napise strani",
    "searchSources": "Iskanje virov",
    "stickerFormatDetails": "Parametri napisov strani"
  },
  "hints": {
    "alignmentAids": "Oznake, dodane k napisom strani, vam pomagajo poravnati stran s tiskalnikom",
    "csvNameList": "Seznam imen polj z razlikovanjem med velikimi in malimi črkami, ločen z vejicami",
    "horizontalGap": "Presledek med dvema napisoma v vrstici",
    "insetToLabel": "Presledek med napisom in začetkom besedila",
    "labelFormatDescription": "Kako je slog napisa predstavljen na seznamu možnosti formata pripomočka",
    "labelFormatDescriptionHint": "Zaslonski namig, ki nadomesti opis na seznamu možnosti formata",
    "labelHeight": "Višina posameznega napisa na strani",
    "labelWidth": "Širina posameznega napisa na strani",
    "localSearchRadius": "Določa polmer območja okrog trenutnega središča karte, ki je uporabljeno za povečanje števila kandidatov za geokodiranje tako, da so najprej vrnjeni kandidati, ki so najbližji lokaciji",
    "rasterResolution": "100 pikslov na palec približno ustreza ločljivosti zaslona. Večja je resolucija, več spomina zahteva brskalnik. Brskalniki se razlikujejo glede sposobnosti elegantne obravnave velikih zahtev po spominu.",
    "selectionListOfOptionsToDisplay": "Obkljukani elementi so v pripomočku prikazani kot možnosti; po želji spremenite vrstni red",
    "verticalGap": "Presledek med dvema napisoma v stolpcu"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Privzeta razdalja obrisa",
    "bufferUnits": "Enote obrisa v pripomočku",
    "countryRegionCodes": "Šifre države ali regije",
    "description": "Opis",
    "descriptionHint": "Namig z opisom",
    "displayField": "Prikaži polje",
    "drawingToolsFreehandPolygon": "prostoročni poligon",
    "drawingToolsLine": "linija",
    "drawingToolsPoint": "točka",
    "drawingToolsPolygon": "poligon",
    "drawingToolsPolyline": "polilinija",
    "enableLocalSearch": "Omogoči lokalno iskanje",
    "exactMatch": "Natančno ujemanje",
    "fontSizeAlignmentNote": "Velikost pisave za obvestilo o robovih tiskanja",
    "gridDarkness": "Temnost mreže",
    "gridlineLeftInset": "Vstavljanje leve mrežne črte",
    "gridlineMajorTickMarksGap": "Glavne črtice vsakih",
    "gridlineMinorTickMarksGap": "Pomožne črtice vsakih",
    "gridlineRightInset": "Vstavljanje desne mrežne črte",
    "labelBorderDarkness": "Temnost obrobe napisa",
    "labelBottomEdge": "Spodnji rob napisov na strani",
    "labelFontSize": "Velikost pisave",
    "labelHeight": "Višina napisa",
    "labelHorizontalGap": "Vodoravni razmik",
    "labelInitialInset": "Vstavljanja besedila napisa",
    "labelLeftEdge": "Levi rob napisov na strani",
    "labelMaxLineCount": "Maksimalno število vrstic na napisa",
    "labelPageHeight": "Višina strani",
    "labelPageWidth": "Širina strani",
    "labelRightEdge": "Desni rob napisov strani",
    "labelsInAColumn": "Število napisov v stolpcu",
    "labelsInARow": "Število napisov v vrstici",
    "labelTopEdge": "Zgornji rob napisov na strani",
    "labelVerticalGap": "Navpični razmik",
    "labelWidth": "Širina napisa",
    "limitSearchToMapExtent": "Išči samo v trenutnem obsegu karte",
    "maximumResults": "Maksimalno število rezultatov",
    "maximumSuggestions": "Maksimalno število predlogov",
    "minimumScale": "Minimalno merilo",
    "name": "Ime",
    "percentBlack": "% črne",
    "pixels": "piksli",
    "pixelsPerInch": "pikslov na palec",
    "placeholderText": "Nadomestno besedilo",
    "placeholderTextForAllSources": "Nadomestno besedilo za iskanje po vseh virih",
    "radius": "Polmer",
    "rasterResolution": "Ločljivost rastra",
    "searchFields": "Iskalna polja",
    "showAlignmentAids": "Pokaži pomoč za poravnavo na strani",
    "showGridTickMarks": "Pokaži mrežo črtic",
    "showLabelOutlines": "Pokaži obrobo napisa",
    "showPopupForFoundItem": "Pokaži pojavno okno za najdeni geoobjekt ali lokacijo",
    "tool": "Orodja",
    "units": "Enote",
    "url": "URL",
    "urlToGeometryService": "URL do geometrijske storitve",
    "useRelatedRecords": "Uporabi relacijske zapise",
    "useSecondarySearchLayer": "Uporabi sekundarni sloj izbire",
    "useSelectionDrawTools": "Uporabite izbirna orodja za risanje",
    "useVectorFonts": "Uporabi vektorske pisave (samo latinične)",
    "zoomScale": "Povečava merila"
  },
  "buttons": {
    "addAddressSource": "Dodaj sloj, ki vsebuje napise naslovov v pojavnem oknu",
    "addLabelFormat": "Dodaj format napisa",
    "addSearchSource": "Dodajte vir iskanja",
    "set": "Nastavi"
  },
  "placeholders": {
    "averyExample": "npr., napis Avery(r) ${averyPartNumber}",
    "countryRegionCodes": "npr., USA, CHN",
    "descriptionCSV": "Vrednosti, ločene z vejico",
    "descriptionPDF": "Napis PDF ${heightLabelIn} x ${widthLabelIn} palcev; ${labelsPerPage} na stran"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "S spletne karte pridobi geoobjektni sloj",
    "openCountryCodes": "Kliknite za več informacij o kodah",
    "openFieldSelector": "Kliknite za odpiranje izbirnika polja",
    "setAndValidateURL": "Nastavite in potrdite URL"
  },
  "problems": {
    "noAddresseeLayers": "Navedite vsaj en sloj naslovnikov",
    "noBufferUnitsForDrawingTools": "Konfigurirajte vsaj eno enoto obrisa za orodja za risanje",
    "noBufferUnitsForSearchSource": "Konfigurirajte vsaj eno enoto obrisa za vir iskanja »${sourceName}«",
    "noGeometryServiceURL": "Konfigurirajte URL za geometrijsko storitev",
    "noNotificationLabelFormats": "Navedite vsaj en format napisa za obvestila",
    "noSearchSourceFields": "Konfigurirajte eno ali več iskalnih polj za vir iskanja »${sourceName}«",
    "noSearchSourceURL": "Konfigurirajte URL za vir iskanja »${sourceName}«"
  }
});