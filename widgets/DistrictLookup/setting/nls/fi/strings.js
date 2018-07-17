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
    "miles": "Mailia",
    "kilometers": "Kilometriä",
    "feet": "Jalkaa",
    "meters": "Metriä"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Hakuasetukset",
    "buttonSet": "Aseta",
    "selectLayersLabel": "Valitse karttataso",
    "selectLayersHintText": "Vihje: käytetään aluekarttatason ja siihen liittyvän pistekarttatason valintaan.",
    "selectPrecinctSymbolLabel": "Korosta alue valitsemalla symboli",
    "selectGraphicLocationSymbol": "Osoitteen tai sijainnin symboli",
    "graphicLocationSymbolHintText": "Vihje: haetun osoitteen tai napsautetun sijainnin symboli",
    "precinctSymbolHintText": "Vihje: käytetään valitun alueen symbolin esittämiseen",
    "selectColorForPoint": "Valitse väri pisteen korostamiseksi",
    "selectColorForPointHintText": "Vihje: käytetään valitun pisteen korostusvärin esittämiseen"
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
    "invalidUrlTip": "Syötetty URL-osoite ${URL} on virheellinen, tai se ei ole käytettävissä.",
    "invalidSearchSources": "Virheelliset hakulähteen asetukset"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Valitse aluekarttataso",
    "selectPolygonLayerHintText": "Vihje: käytetään aluekarttatason valintaan.",
    "selectRelatedPointLayerLabel": "Valitse aluekarttatasoon liittyvä pistekarttataso",
    "selectRelatedPointLayerHintText": "Vihje: käytetään aluekarttatasoon liittyvän pistekarttatason valintaan",
    "polygonLayerNotHavingRelatedLayer": "Valitse aluekarttataso, jossa on siihen liittyvä pistekarttataso.",
    "errorInSelectingPolygonLayer": "Valitse aluekarttataso, jossa on siihen liittyvä pistekarttataso.",
    "errorInSelectingRelatedLayer": "Valitse aluekarttatasoon liittyvä pistekarttataso."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Suuntien asetukset",
    "routeServiceUrl": "Reitityspalvelu",
    "buttonSet": "Aseta",
    "routeServiceUrlHintText": "Vihje: selaa ja valitse verkostoanalyysin reitityspalvelu napsauttamalla Määritä",
    "directionLengthUnit": "Ajo-ohjeiden pituusyksiköt",
    "unitsForRouteHintText": "Vihje: käytetään reitin raportoitujen yksiköiden näyttämiseen",
    "selectRouteSymbol": "Valitse reitin näyttämiseen käytettävä symboli",
    "routeSymbolHintText": "Vihje: käytetään viivasymbolin näyttämiseen reitissä",
    "routingDisabledMsg": "Jos haluat ottaa ajo-ohjeet käyttöön, varmista, että reititys on käytössä ArcGIS Online -kohteessa."
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
  "symbolPickerPreviewText": "Esikatselu:",
  "showToolToSelectLabel": "Määritä sijainti -painike",
  "showToolToSelectHintText": "Vinkki: Ota käyttöön painike sijainnin määrittämiseksi kartalla sen sijaan, että sijainti määritetään aina karttaa napsautettaessa"
});