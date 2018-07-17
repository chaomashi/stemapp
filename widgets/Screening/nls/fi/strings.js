///////////////////////////////////////////////////////////////////////////
// Copyright © 2016 Esri. All Rights Reserved.
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
  "_widgetLabel": "Seulonta",
  "geometryServicesNotFound": "Geometriapalvelu ei ole käytettävissä.",
  "unableToDrawBuffer": "Puskuria ei voi piirtää. Yritä uudelleen.",
  "invalidConfiguration": "Virheellinen kokoonpano.",
  "clearAOIButtonLabel": "Aloita alusta",
  "noGraphicsShapefile": "Ladattu Shapefile-tiedosto ei sisällä grafiikkaa.",
  "zoomToLocationTooltipText": "Tarkenna sijaintiin",
  "noGraphicsToZoomMessage": "Grafiikkaa, johon tarkentaa, ei löytynyt.",
  "placenameWidget": {
    "placenameLabel": "Etsi sijaintia"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Valitse piirustustapa",
    "toggleSelectability": "Vaihda valittavuutta napsauttamalla",
    "chooseLayerTitle": "Valitse valittavissa oleva karttataso",
    "selectAllLayersText": "Valitse kaikki",
    "layerSelectionWarningTooltip": "AOI:n luonti edellyttää vähintään yhden karttatason valitaan"
  },
  "shapefileWidget": {
    "shapefileLabel": "Lataa pakattu Shapefile-tiedosto",
    "uploadShapefileButtonText": "Lähetä",
    "unableToUploadShapefileMessage": "Shapefile-tiedoston lataus ei onnistu."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Määritä aloituspiste",
    "addButtonTitle": "Lisää",
    "deleteButtonTitle": "Poista",
    "mapTooltipForStartPoint": "Määritä aloituspiste napsauttamalla karttaa",
    "mapTooltipForUpdateStartPoint": "Päivitä aloituspiste napsauttamalla karttaa",
    "locateText": "Paikanna",
    "locateByMapClickText": "Valitse alkukoordinaatit",
    "enterBearingAndDistanceLabel": "Määritä suuntima ja etäisyys aloituspisteestä",
    "bearingTitle": "Suuntima",
    "distanceTitle": "Etäisyys",
    "planSettingTooltip": "Suunnitelman asetukset",
    "invalidLatLongMessage": "Anna kelvolliset arvot."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Puskurin etäisyys (valinnainen)",
    "bufferInputLabel": "Näytä tulokset alueelta"
  },
  "traverseSettings": {
    "bearingLabel": "Suuntima",
    "lengthLabel": "Pituus",
    "addButtonTitle": "Lisää",
    "deleteButtonTitle": "Poista"
  },
  "planSettings": {
    "expandGridTooltipText": "Laajenna ruudukko",
    "collapseGridTooltipText": "Tiivistä ruudukko",
    "directionUnitLabelText": "Suuntayksikkö",
    "distanceUnitLabelText": "Etäisyys- ja pituusyksiköt",
    "planSettingsComingSoonText": "Tulossa pian"
  },
  "newTraverse": {
    "invalidBearingMessage": "Virheellinen suuntima.",
    "invalidLengthMessage": "Virheellinen pituus.",
    "negativeLengthMessage": "Negatiivinen pituus"
  },
  "reportsTab": {
    "aoiAreaText": "AOI-alue",
    "downloadButtonTooltip": "Lataa",
    "printButtonTooltip": "Tulosta",
    "uploadShapefileForAnalysisText": "Lataa analyysiin sisällytettävä Shapefile-tiedosto",
    "uploadShapefileForButtonText": "Selaa",
    "downloadLabelText": "Valitse muoto:",
    "downloadBtnText": "Lataa",
    "noDetailsAvailableText": "Tuloksia ei löytynyt",
    "featureCountText": "Lukumäärä",
    "featureAreaText": "Alue",
    "featureLengthText": "Pituus",
    "attributeChooserTooltip": "Valitse näytettävät ominaisuustiedot",
    "csv": "CSV",
    "filegdb": "File Geodatabase",
    "shapefile": "Shapefile",
    "noFeaturesFound": "Valitulle tiedostomuodolle ei löytynyt tuloksia",
    "selectReportFieldTitle": "Valitse kentät",
    "noFieldsSelected": "Yhtään kenttää ei ole valittu",
    "intersectingFeatureExceedsMsgOnCompletion": "Ainakin yhden karttatason tietueiden enimmäismäärä on saavutettu.",
    "unableToAnalyzeText": "Analysointi ei onnistu. Tietueiden enimmäismäärä on saavutettu.",
    "errorInPrintingReport": "Raporttia ei voi tulostaa. Tarkista, ovatko raportin asetukset kelvolliset.",
    "aoiInformationTitle": "Kiinnostusalueen (AOI) tiedot",
    "summaryReportTitle": "Yhteenveto",
    "notApplicableText": "Ei mitään",
    "downloadReportConfirmTitle": "Vahvista lataus",
    "downloadReportConfirmMessage": "Haluatko varmasti ladata?",
    "noDataText": "Ei tietoja",
    "createReplicaFailedMessage": "Lataustoiminto epäonnistui seuraavien karttatasojen osalta: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Lataustoiminto epäonnistui.",
    "printLayoutLabelText": "Asettelu",
    "printBtnText": "Tulosta",
    "printDialogHint": "Huomautus: raportin otsikkoa ja kommentteja voi muokata raportin esikatselunäkymässä.",
    "unableToDownloadFileGDBText": "File Geodatabasea ei voi ladata sellaista kiinnostusaluetta varten, joka sisältää piste- tai viivasijainteja",
    "unableToDownloadShapefileText": "Shapefile-tiedostoa ei voi ladata sellaista kiinnostusaluetta varten, joka sisältää piste- tai viivasijainteja",
    "analysisUnitLabelText": "Näytä tulokset kohteessa:",
    "analysisUnitButtonTooltip": "Valitse analyysin yksiköt",
    "analysisCloseBtnText": "Sulje",
    "feetUnit": "Jalkaa/neliöjalkaa",
    "milesUnit": "Mailia/aaria",
    "metersUnit": "Metriä/neliömetriä",
    "kilometersUnit": "Kilometriä/neliökilometriä",
    "hectaresUnit": "Kilometriä/hehtaaria",
    "hectaresAbbr": "hehtaaria",
    "layerNotVisibleText": "Analysointi ei onnistu. Karttataso on poistettu käytöstä tai se ei ole mittakaavan näkyvyysalueella.",
    "refreshBtnTooltip": "Päivitä raportti",
    "featureCSVAreaText": "Leikkaava alue",
    "featureCSVLengthText": "Leikkaava pituus",
    "errorInFetchingPrintTask": "Virhe noudettaessa tulostustehtävän tietoja. Yritä uudelleen."
  }
});