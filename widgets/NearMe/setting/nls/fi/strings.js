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
      "displayText": "Mailia",
      "acronym": "mailia"
    },
    "kilometers": {
      "displayText": "Kilometriä",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Jalkaa",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "Metriä",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Hakulähteen asetukset",
    "searchSourceSettingTitle": "Hakulähteen asetukset",
    "searchSourceSettingTitleHintText": "Lisää ja määritä geokoodauspalveluja tai kohdekarttatasoja haun lähteiksi. Nämä määritetyt lähteet määrittävät, mitä hakuruudussa voi hakea",
    "addSearchSourceLabel": "Lisää haun lähde",
    "featureLayerLabel": "Kohdekarttataso",
    "geocoderLabel": "Geokooderi",
    "nameTitle": "Nimi",
    "generalSettingLabel": "Yleinen asetus",
    "allPlaceholderLabel": "Paikkamerkkiteksti haulle kaikkialta:",
    "allPlaceholderHintText": "Vinkki: Anna teksti, joka näytetään paikkamerkkinä kaikista karttatasoista ja geokooderista haettaessa",
    "generalSettingCheckboxLabel": "Näytä löydetyn kohteen tai sijainnin ponnahdusikkuna",
    "countryCode": "Maa- tai aluekoodit",
    "countryCodeEg": "esim. ",
    "countryCodeHint": "Jos jätät tämän arvon tyhjäksi, ohjelma etsii kaikista maista ja kaikilta alueilta",
    "questionMark": "tulisi käyttää?",
    "searchInCurrentMapExtent": "Etsi vain nykyisestä karttalaajuudesta",
    "zoomScale": "Tarkennustaso",
    "locatorUrl": "Geokooderin URL-osoite",
    "locatorName": "Geokooderin nimi",
    "locatorExample": "Esimerkki",
    "locatorWarning": "Tätä geokoodauspalvelun versiota ei tueta. Pienoisohjelma tukee geokoodauspalvelua 10.0 ja sitä uudempia versioita.",
    "locatorTips": "Ehdotukset eivät ole käytettävissä, koska geokoodauspalvelu ei tue ehdotustoimintoa.",
    "layerSource": "Karttatason lähde",
    "setLayerSource": "Määritä karttatason lähde",
    "setGeocoderURL": "Määritä geokooderin URL-osoite",
    "searchLayerTips": "Ehdotukset eivät ole käytettävissä, koska kohdepalvelu ei tue sivutustoimintoa.",
    "placeholder": "Muuttujan teksti",
    "searchFields": "Hakukentät",
    "displayField": "Näyttökenttä",
    "exactMatch": "Tarkka vastine",
    "maxSuggestions": "Ehdotusten enimmäismäärä",
    "maxResults": "Tulosten enimmäismäärä",
    "enableLocalSearch": "Ota käyttöön paikallinen haku",
    "minScale": "Vähimmäismittakaava",
    "minScaleHint": "Kun kartan mittakaava on suurempi kuin tämä mittakaava, käytetään paikallista hakua",
    "radius": "Säde",
    "radiusHint": "Määrittää nykyisen kartan keskikohdan ympärillä olevan alueen säteen. Säteen avulla arvioidaan geokoodausehdokkaiden sijoitusta, jotta sijaintia lähinnä olevat ehdokkaat palautetaan ensin",
    "meters": "Metriä",
    "setSearchFields": "Määritä hakukentät",
    "set": "Aseta",
    "fieldName": "Nimi",
    "invalidUrlTip": "Syötetty URL-osoite ${URL} on virheellinen, tai se ei ole käytettävissä."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Hakuasetukset",
    "defaultBufferDistanceLabel": "Määritä puskurin oletusetäisyys",
    "maxResultCountLabel": "Rajoita tulosten määrää",
    "maxResultCountHintLabel": "Vinkki: Määritä näytettävien tulosten enimmäismäärä. Arvo 1 palauttaa lähimmän kohteen",
    "maxBufferDistanceLabel": "Määritä puskurin enimmäisetäisyys",
    "bufferDistanceUnitLabel": "Puskurin etäisyysyksiköt",
    "defaultBufferHintLabel": "Vihje: määritä oletusarvo puskurin liukusäätimelle",
    "maxBufferHintLabel": "Vihje: määritä enimmäisarvo puskurin liukusäätimelle",
    "bufferUnitLabel": "Vihje: määrittää puskurin luonnin yksikön",
    "selectGraphicLocationSymbol": "Osoitteen tai sijainnin symboli",
    "graphicLocationSymbolHintText": "Vihje: haetun osoitteen tai napsautetun sijainnin symboli",
    "addressLocationPolygonHintText": "Vihje: haetun aluekarttatason symboli",
    "popupTitleForPolygon": "Valitse alue valittua osoitesijaintia varten",
    "popupTitleForPolyline": "Valitse viiva osoitesijaintia varten",
    "addressLocationPolylineHintText": "Vihje: haetun taiteviivakarttatason symboli",
    "fontColorLabel": "Valitse hakutulosten fontin väri",
    "fontColorHintText": "Vihje: hakutulosten fontin väri",
    "zoomToSelectedFeature": "Tarkenna valittuun kohteeseen",
    "zoomToSelectedFeatureHintText": "Vihje: zoomaa valittuun kohteeseen puskurin sijaan",
    "intersectSearchLocation": "Palauta leikkaavat aluekohteet",
    "intersectSearchLocationHintText": "Vihje: palauta aluekohteet, jotka sisältävät haetun sijainnin puskurissa olevien aluekohteiden sijaan",
    "enableProximitySearch": "Ota käyttöön läheisyyshaku",
    "enableProximitySearchHintText": "Vihje: ota käyttöön mahdollisuus hakea valittua tulosta lähellä olevia sijainteja",
    "bufferVisibilityLabel": "Määritä puskurin näkyvyys",
    "bufferVisibilityHintText": "Vihje: puskuri näytetään kartalla",
    "bufferColorLabel": "Määritä puskurin symboli",
    "bufferColorHintText": "Vihje: valitse puskurin väri ja läpinäkyvyys",
    "searchLayerResultLabel": "Piirrä vain valitut karttatason tulokset",
    "searchLayerResultHint": "Vihje: kartalle piirretään vain valittu hakutulosten karttataso",
    "showToolToSelectLabel": "Määritä sijainti -painike",
    "showToolToSelectHintText": "Vinkki: Ota käyttöön painike sijainnin määrittämiseksi kartalla sen sijaan, että sijainti määritetään aina karttaa napsautettaessa",
    "geoDesicParamLabel": "Käytä geodeettistä puskuria",
    "geoDesicParamHintText": "Vinkki: Käytä geodeettistä puskuria euklidisen puskurin (planaarinen) sijasta"
  },
  "layerSelector": {
    "selectLayerLabel": "Valitse hakukarttataso(t)",
    "layerSelectionHint": "Vihje: käytä Määritä-painiketta karttatasojen valintaan",
    "addLayerButton": "Aseta"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Suuntien asetukset",
    "routeServiceUrl": "Reitityspalvelu",
    "buttonSet": "Aseta",
    "routeServiceUrlHintText": "Vihje: selaa valitsemalla â€˜Asetaâ€™ ja valitse reitityspalvelu",
    "directionLengthUnit": "Ajo-ohjeiden pituusyksiköt",
    "unitsForRouteHintText": "Vihje: käytetään reitin yksiköiden näyttämiseen",
    "selectRouteSymbol": "Valitse reitin näyttämiseen käytettävä symboli",
    "routeSymbolHintText": "Vihje: käytetään viivasymbolin näyttämiseen reitissä",
    "routingDisabledMsg": "Jos haluat ottaa reittiohjeet käyttöön, varmista sovelluksen asetuksissa, että reititys on käytössä kohteessa."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Symboliasetukset",
    "addSymbologyBtnLabel": "Lisää uusia symboleja",
    "layerNameTitle": "Karttatason nimi",
    "fieldTitle": "Kenttä",
    "valuesTitle": "Arvot",
    "symbolTitle": "Symboli",
    "actionsTitle": "Toiminnot",
    "invalidConfigMsg": "Kentän kaksoiskappale: ${fieldName} karttatasolle: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Suodatusasetukset",
    "addTaskTip": "Lisää vähintään yksi suodatin valittuihin hakutasoihin ja määritä kullekin parametrit.",
    "enableMapFilter": "Poista esiasetettu karttatason suodatin kartasta.",
    "newFilter": "Uusi suodatin",
    "filterExpression": "Suodatinlauseke",
    "layerDefaultSymbolTip": "Käytä karttatason oletussymbolia",
    "uploadImage": "Lataa kuva",
    "selectLayerTip": "Valitse karttataso.",
    "setTitleTip": "Määritä otsikko.",
    "noTasksTip": "Suodattimia ei ole määritetty. Lisää uusi suodatin valitsemalla ${newFilter}.",
    "collapseFiltersTip": "Tiivistä mahdolliset suodatinlausekkeet, kun pienoisohjelma avataan",
    "groupFiltersTip": "Ryhmittele suodattimet karttatason perusteella"
  },
  "networkServiceChooser": {
    "arcgislabel": "Lisää ArcGIS Online -palvelusta",
    "serviceURLabel": "Lisää palvelun URL-osoite",
    "routeURL": "Reitin URL-osoite",
    "validateRouteURL": "Vahvista",
    "exampleText": "Esimerkki",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Määritä kelvollinen reittipalvelu.",
    "rateLimitExceeded": "Nopeusrajoitus ylittyi. Yritä myöhemmin uudelleen.",
    "errorInvokingService": "Käyttäjänimi tai salasana on virheellinen."
  },
  "errorStrings": {
    "bufferErrorString": "Anna kelvollinen numeroarvo.",
    "selectLayerErrorString": "Valitse haettavat karttatasot.",
    "invalidDefaultValue": "Puskurin oletusetäisyys ei voi olla tyhjä. Määritä puskurin etäisyys",
    "invalidMaximumValue": "Puskurin enimmäisetäisyys ei voi olla tyhjä. Määritä puskurin etäisyys",
    "defaultValueLessThanMax": "Määritä puskurin oletusetäisyys enimmäismäärän rajoissa",
    "defaultBufferValueGreaterThanOne": "Puskurin oletusetäisyys ei voi olla pienempi kuin 0",
    "maximumBufferValueGreaterThanOne": "Määritä nollaa suurempi puskurin enimmäisetäisyys",
    "invalidMaximumResultCountValue": "Määritä kelvollinen tulosten enimmäismäärän arvo",
    "invalidSearchSources": "Virheelliset hakulähteen asetukset"
  },
  "symbolPickerPreviewText": "Esikatselu:"
});