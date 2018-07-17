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
    "title": "Haun ja puskurin asetukset",
    "mainHint": "Voit ottaa käyttöön osoitteiden ja kohteiden tekstihaut, geometrian digitoinnin ja puskuroinnin."
  },
  "addressSourceSetting": {
    "title": "Osoitekarttatasot",
    "mainHint": "Voit määrittää, mitkä vastaanottajan osoitetarran karttatasot ovat käytettävissä."
  },
  "notificationSetting": {
    "title": "Ilmoitusasetukset",
    "mainHint": "Voit määrittää käytettävissä olevien ilmoitusten tyypit."
  },
  "groupingLabels": {
    "addressSources": "Karttataso, jota käytetään vastaanottajakarttatasojen valintaan",
    "averyStickersDetails": "Avery(r)-tarrat",
    "csvDetails": "Pilkuin erotetut arvot (CSV) -tiedosto",
    "drawingTools": "Piirtotyökalut alueen määrittämistä varten",
    "featureLayerDetails": "Kohdekarttataso",
    "geocoderDetails": "Geokooderi",
    "labelFormats": "Käytettävissä olevat osoitetarramuodot",
    "printingOptions": "Tulostettujen osoitetarrasivujen asetukset",
    "searchSources": "Etsi lähteitä",
    "stickerFormatDetails": "Osoitetarrasivun parametrit"
  },
  "hints": {
    "alignmentAids": "Osoitetarrasivulle lisätyt merkinnät, joiden avulla sivu on helppo asemoida tulostimeen",
    "csvNameList": "Kenttänimien pilkuin eroteltu luettelo. Kenttien nimissä kirjainkoolla on merkitystä.",
    "horizontalGap": "Kahden osoitetarran väliin jäävä tila rivillä",
    "insetToLabel": "Tila, joka jää osoitetarran reunan ja tekstin väliin",
    "labelFormatDescription": "Miten osoitetarran tyyli esitetään pienoisohjelman muotoiluasetusten luettelossa",
    "labelFormatDescriptionHint": "Lisäkuvauksen työkaluvihje muotoiluasetusten luettelossa",
    "labelHeight": "Kunkin osoitetarran korkeus sivulla",
    "labelWidth": "Kunkin osoitetarran leveys sivulla",
    "localSearchRadius": "Määrittää nykyisen kartan keskikohdan ympärillä olevan alueen säteen. Säteen avulla arvioidaan geokoodausehdokkaiden sijoitusta, jotta sijaintia lähinnä olevat ehdokkaat palautetaan ensin",
    "rasterResolution": "100 pikseliä tuumaa kohti vastaa suurin piirtein näytön tarkkuutta. Mitä korkeampi tarkkuus, sitä enemmän tarvitaan selaimen muistia. Selainten kyky käsitellä tehokkaasti paljon muistia tarvitsevia toimia vaihtelee.",
    "selectionListOfOptionsToDisplay": "Valitut kohteet näytetään asetuksina pienoisohjelmassa; muuta järjestystä halutessasi",
    "verticalGap": "Kahden osoitetarran väliin jäävä tila palstassa"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Puskurin oletusetäisyys",
    "bufferUnits": "Pienoisohjelmassa määritettävät puskuriyksiköt",
    "countryRegionCodes": "Maa- tai aluekoodit",
    "description": "Kuvaus",
    "descriptionHint": "Kuvausvihje",
    "displayField": "Näyttökenttä",
    "drawingToolsFreehandPolygon": "alueen piirto vapaalla kädellä",
    "drawingToolsLine": "viiva",
    "drawingToolsPoint": "piste",
    "drawingToolsPolygon": "alue",
    "drawingToolsPolyline": "taiteviiva",
    "enableLocalSearch": "Ota käyttöön paikallinen haku",
    "exactMatch": "Tarkka vastine",
    "fontSizeAlignmentNote": "Tulostusmarginaaleja koskevan huomauksen fonttikoko",
    "gridDarkness": "Ruudukon tummuus",
    "gridlineLeftInset": "Vasemman ruudukkoviivan upotus",
    "gridlineMajorTickMarksGap": "Pääjakoviivat joka",
    "gridlineMinorTickMarksGap": "Apujakoviivat joka",
    "gridlineRightInset": "Oikean ruudukkoviivan upote",
    "labelBorderDarkness": "Osoitetarran reunan tummuus",
    "labelBottomEdge": "Sivun osoitetarrojen alareuna",
    "labelFontSize": "Fontin koko",
    "labelHeight": "Osoitetarran korkeus",
    "labelHorizontalGap": "Vaakasuuntainen väli",
    "labelInitialInset": "Osoitetarran tekstin upote",
    "labelLeftEdge": "Sivun osoitetarrojen vasen reuna",
    "labelMaxLineCount": "Rivien enimmäismäärä osoitetarrassa",
    "labelPageHeight": "Sivun korkeus",
    "labelPageWidth": "Sivun leveys",
    "labelRightEdge": "Sivun osoitetarrojen oikea reuna",
    "labelsInAColumn": "Osoitetarrojen määrä palstassa",
    "labelsInARow": "Osoitetarrojen määrä rivillä",
    "labelTopEdge": "Sivun osoitetarrojen yläreuna",
    "labelVerticalGap": "Pystysuuntainen väli",
    "labelWidth": "Osoitetarran leveys",
    "limitSearchToMapExtent": "Etsi vain nykyisestä karttalaajuudesta",
    "maximumResults": "Tulosten enimmäismäärä",
    "maximumSuggestions": "Ehdotusten enimmäismäärä",
    "minimumScale": "Vähimmäismittakaava",
    "name": "Nimi",
    "percentBlack": "% musta",
    "pixels": "pikseliä",
    "pixelsPerInch": "pikseleitä tuumaa kohti",
    "placeholderText": "Muuttujan teksti",
    "placeholderTextForAllSources": "Paikkamerkkiteksti haulle kaikista lähteistä",
    "radius": "Säde",
    "rasterResolution": "Rasteriresoluutio",
    "searchFields": "Hakukentät",
    "showAlignmentAids": "Näytä kohdistuksen apuviivat sivulla",
    "showGridTickMarks": "Näytä ruudukon apuviivat",
    "showLabelOutlines": "Näytä osoitetarrojen ääriviivat",
    "showPopupForFoundItem": "Näytä löydetyn kohteen tai sijainnin ponnahdusikkuna",
    "tool": "Työkalut",
    "units": "Yksiköt",
    "url": "URL-osoite",
    "urlToGeometryService": "Geometriapalvelun URL-osoite",
    "useRelatedRecords": "Käytä siihen liittyviä tietueita",
    "useSecondarySearchLayer": "Käytä toissijaista valintatasoa",
    "useSelectionDrawTools": "Käytä valinnan piirtotyökaluja",
    "useVectorFonts": "Käytä vektorifontteja (vain latinalaisen merkistön fontit)",
    "zoomScale": "Tarkennustaso"
  },
  "buttons": {
    "addAddressSource": "Lisää karttataso, joka sisältää osoitetarrat ponnahdusikkunassa",
    "addLabelFormat": "Lisää osoitetarran muotoilu",
    "addSearchSource": "Lisää haun lähde",
    "set": "Aseta"
  },
  "placeholders": {
    "averyExample": "esim. Avery(r)-osoitetarra ${averyPartNumber}",
    "countryRegionCodes": "esim. USA,CHN",
    "descriptionCSV": "Pilkuin erotetut arvot",
    "descriptionPDF": "PDF-osoitetarra ${heightLabelIn} x ${widthLabelIn} tuumaa; ${labelsPerPage} sivua kohti"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Hae kohdekarttataso web-kartasta",
    "openCountryCodes": "Hanki lisätietoja koodeista napsauttamalla",
    "openFieldSelector": "Avaa kenttävalitsin napsauttamalla",
    "setAndValidateURL": "Määritä ja validoi URL-osoite"
  },
  "problems": {
    "noAddresseeLayers": "Määritä vähintään yksi vastaanottajan karttataso",
    "noBufferUnitsForDrawingTools": "Määritä vähintään yksi puskuriyksikkö piirtotyökaluja varten",
    "noBufferUnitsForSearchSource": "Määritä vähintään yksi puskuriyksikkö haun lähdettä ${sourceName} varten",
    "noGeometryServiceURL": "Määritä geometriapalvelun URL-osoite",
    "noNotificationLabelFormats": "Määritä vähintään yksi ilmoituksen tunnustekstimuoto",
    "noSearchSourceFields": "Määritä vähintään yksi hakukenttä haun lähdettä ${sourceName} varten",
    "noSearchSourceURL": "Määritä URL-osoite haun lähdettä ${sourceName} varten"
  }
});