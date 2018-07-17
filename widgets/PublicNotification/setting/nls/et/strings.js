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
    "title": "Otsingu ja puhvri seaded",
    "mainHint": "Saate lubada aadresside ja objektide tekstipõhist otsingut, geomeetria digitaliseerimist ja puhverdamist."
  },
  "addressSourceSetting": {
    "title": "Aadressi kihid",
    "mainHint": "Saate määrata, millised adressaadi sildi kihid on saadaval."
  },
  "notificationSetting": {
    "title": "Teavitamise valikud",
    "mainHint": "Saate määrata, millist tüüpi teavitused on saadaval."
  },
  "groupingLabels": {
    "addressSources": "Kiht, mida kasutatakse adressaadi kihtide valimisel",
    "averyStickersDetails": "Avery(r) kleepsud",
    "csvDetails": "Komaga eraldatud väärtuste (CSV) fail",
    "drawingTools": "Joonistustööriistad ala määramiseks",
    "featureLayerDetails": "Objektikiht",
    "geocoderDetails": "Geokodeerija",
    "labelFormats": "Saadaolevad kihivormingud",
    "printingOptions": "Prinditud sildi lehtede vlaikud",
    "searchSources": "Otsinguallikad",
    "stickerFormatDetails": "Sildi lehe parameetrid"
  },
  "hints": {
    "alignmentAids": "Sildi lehele lisatud tähised, mis on abiks lehe printeris joondamisel",
    "csvNameList": "Tõstutundlike väljanimede komaga eraldatud loend",
    "horizontalGap": "Ruum rea kahe märgise vahel",
    "insetToLabel": "Ruum märgise ja teksti alguse vahel",
    "labelFormatDescription": "Kuidas kujutatakse märgise laadi vidina vormingu valikute loendis",
    "labelFormatDescriptionHint": "Kohtspikker täiendava kirjelduse jaoks vormingu valikute loendis",
    "labelHeight": "Iga lehel oleva märgise kõrgus",
    "labelWidth": "Iga lehel oleva märgise laius",
    "localSearchRadius": "Määrab praeguse kaardi keskpunkti ümber asuva ala raadiuse, mida kasutatakse geokodeerimise kandidaatide järjestuse võimendamiseks nii, et asukohale lähimad kandidaadid tagastatakse esimesena",
    "rasterResolution": "100 pikslit tolli kohta vastab ligikaudu ekraani eraldusvõimele. Mida suurem on eraldusvõime, seda rohkem brauseri mälu vajatakse. Brauserite võimekus suurte mälunõudlustega sujuvalt toime tulla on erinev.",
    "selectionListOfOptionsToDisplay": "Kontrollitud elemendid kuvatakse vidina valikutena; järjestust saab vastavalt soovile muuta",
    "verticalGap": "Ruum veeru kahe märgise vahel"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Puhvri vaikeulatus",
    "bufferUnits": "Vidina puhvri ühikud",
    "countryRegionCodes": "Riigi või piirkonna koodid",
    "description": "Kirjeldus",
    "descriptionHint": "Kirjelduse vihje",
    "displayField": "Kuvamise väli",
    "drawingToolsFreehandPolygon": "vabakäeline polügoon",
    "drawingToolsLine": "joon",
    "drawingToolsPoint": "punkt",
    "drawingToolsPolygon": "polügoon",
    "drawingToolsPolyline": "murdjoon",
    "enableLocalSearch": "Luba kohalik otsing",
    "exactMatch": "Täpne vaste",
    "fontSizeAlignmentNote": "Prindiveeriste märkuse fondi suurus",
    "gridDarkness": "Ruudustiku tumedus",
    "gridlineLeftInset": "Ruudujoonte vasak ird",
    "gridlineMajorTickMarksGap": "Suured kriipsmärgised iga",
    "gridlineMinorTickMarksGap": "Väiksed kriipsmärgised iga",
    "gridlineRightInset": "Ruudujoonte parem ird",
    "labelBorderDarkness": "Märgise äärise tumedus",
    "labelBottomEdge": "Lehel olevate märgiste alumine serv",
    "labelFontSize": "Fondi suurus",
    "labelHeight": "Märgise kõrgus",
    "labelHorizontalGap": "Horisontaalne vahe",
    "labelInitialInset": "Märgise teksti ird",
    "labelLeftEdge": "Lehel olevate märgiste vasak serv",
    "labelMaxLineCount": "Märgise maksimaalne ridade arv",
    "labelPageHeight": "Lehe kõrgus",
    "labelPageWidth": "Lehe laius",
    "labelRightEdge": "Lehel olevate märgiste parem serv",
    "labelsInAColumn": "Märgiste arv veerus",
    "labelsInARow": "Märgiste arv real",
    "labelTopEdge": "Lehel olevate märgiste ülemine serv",
    "labelVerticalGap": "Vertikaalne vahe",
    "labelWidth": "Märgise laius",
    "limitSearchToMapExtent": "Otsi ainult praegusest kaardiulatusest",
    "maximumResults": "Maksimaalsed tulemused",
    "maximumSuggestions": "Maksimaalsed soovitused",
    "minimumScale": "Minimaalne mõõtkava",
    "name": "Nimi",
    "percentBlack": "% must",
    "pixels": "pikslid",
    "pixelsPerInch": "pikslit tolli kohta",
    "placeholderText": "Kohatäitja tekst",
    "placeholderTextForAllSources": "Kohatäite tekst kõigi allikate otsimiseks",
    "radius": "Raadius",
    "rasterResolution": "Rastri resolutsioon",
    "searchFields": "Otsinguväljad",
    "showAlignmentAids": "Kuva lehel joondamise abivahendid",
    "showGridTickMarks": "Kuva ruudustiku kriipsmärgised",
    "showLabelOutlines": "Kuva märgise kontuurid",
    "showPopupForFoundItem": "Kuva leitud objekti või asukoha hüpikaken",
    "tool": "Töövahendid",
    "units": "Ühikud",
    "url": "URL",
    "urlToGeometryService": "Geomeetriateenuse URL",
    "useRelatedRecords": "Kasuta selle seostatud kirjeid",
    "useSecondarySearchLayer": "Kasuta sekundaarset valikukihti",
    "useSelectionDrawTools": "Kasutage selekteerimise joonistusvahendeid",
    "useVectorFonts": "Kasuta vektorfonte (ainult ladina fondid)",
    "zoomScale": "Suumiskaala"
  },
  "buttons": {
    "addAddressSource": "Lisa selle hüpikaknasse aadressisilte sisaldav kiht",
    "addLabelFormat": "Lisa sildi vorming",
    "addSearchSource": "Lisa otsinguallikas",
    "set": "Määra"
  },
  "placeholders": {
    "averyExample": "nt Avery(r) silt ${averyPartNumber}",
    "countryRegionCodes": "nt USA,CHN",
    "descriptionCSV": "Komaga eraldatud väärtused",
    "descriptionPDF": "PDF märgis ${heightLabelIn} x ${widthLabelIn} tolli; ${labelsPerPage} lehe kohta"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Hangi veebikaardilt objektikiht",
    "openCountryCodes": "Klõpsake lisateabe saamiseks koodide kohta",
    "openFieldSelector": "Klõpsake välja valija avamiseks",
    "setAndValidateURL": "Määra ja valideeri URL"
  },
  "problems": {
    "noAddresseeLayers": "Määrake vähemalt üks adressaadi kiht",
    "noBufferUnitsForDrawingTools": "Konfigureerige joonistusriistade jaoks vähemalt üks puhvriühik",
    "noBufferUnitsForSearchSource": "Konfigureerige otsinguallika „${sourceName}“ jaoks vähemalt üks puhvriühik",
    "noGeometryServiceURL": "Konfigureerige geomeetriateenuse URL",
    "noNotificationLabelFormats": "Määrake vähemalt üks teavitussildi vorming",
    "noSearchSourceFields": "Konfigureerige otsinguallika „${sourceName}“ jaoks vähemalt üks otsinguväli",
    "noSearchSourceURL": "Konfigureerige otsinguallika „${sourceName}“ URL"
  }
});