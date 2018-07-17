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
      "displayText": "Miili",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Kilomeetrit",
      "acronym": "m"
    },
    "feet": {
      "displayText": "Jalga",
      "acronym": "jl"
    },
    "meters": {
      "displayText": "Meetrit",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Otsinguallika seaded",
    "searchSourceSettingTitle": "Otsinguallika seaded",
    "searchSourceSettingTitleHintText": "Lisa ja seadista geokodeerimise teenuseid või objektikihte otsinguallikatena. Need allikad määravad, mis info on leitav otsingukasti kaudu",
    "addSearchSourceLabel": "Määra otsinguallikas",
    "featureLayerLabel": "Objektikiht",
    "geocoderLabel": "Geokodeerija",
    "nameTitle": "Nimi",
    "generalSettingLabel": "Üldseade",
    "allPlaceholderLabel": "Kohatäite tekst kõigi otsimiseks:",
    "allPlaceholderHintText": "Vihje. Kõigi kihtide ja geokodeerija otsimiseks sisestage tekst kohatäitena kuvatavana",
    "generalSettingCheckboxLabel": "Kuva leitud objekti või asukoha hüpikaken",
    "countryCode": "Riigi või piirkonna kood(id)",
    "countryCodeEg": "nt ",
    "countryCodeHint": "Kui jätate selle välja tühjaks, teostatakse otsing kõikides riikides ja piirkondades",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Otsi ainult praegusest kaardiulatusest",
    "zoomScale": "Suumiskaala",
    "locatorUrl": "Geokodeerija URL",
    "locatorName": "Geokodeerija nimi",
    "locatorExample": "Näide",
    "locatorWarning": "Seda geokodeerimisteenuse versiooni ei toetata. Vidin toetab geokodeerimisteenust alates versioonist 10.0 ja uuemates versioonides.",
    "locatorTips": "Soovitused pole saadaval, sest geokodeerimisteenus ei toeta soovituste võimalust.",
    "layerSource": "Kihi allikas",
    "setLayerSource": "Määra kihi allikas",
    "setGeocoderURL": "Määra geokodeerija URL",
    "searchLayerTips": "Soovitused pole saadaval, sest objektiteenus ei toeta leheküljelise jaotuse võimalust.",
    "placeholder": "Kohatäitja tekst",
    "searchFields": "Otsinguväljad",
    "displayField": "Kuvamisväli",
    "exactMatch": "Täpne vaste",
    "maxSuggestions": "Maksimaalsed soovitused",
    "maxResults": "Maksimaalsed tulemused",
    "enableLocalSearch": "Luba kohalik otsing",
    "minScale": "Min mõõtkava",
    "minScaleHint": "Kui kaardi mõõkava on sellest mõõtkavast suurem, rakendatakse kohalik otsing",
    "radius": "Raadius",
    "radiusHint": "Määrab praeguse kaardi keskpunkti ümber asuva ala raadiuse, mida kasutatakse geokodeerimise kandidaatide järjestuse võimendamiseks nii, et asukohale lähimad kandidaadid tagastatakse esimesena",
    "meters": "Meetrit",
    "setSearchFields": "Määra otsinguväljad",
    "set": "Määra",
    "fieldName": "Nimi",
    "invalidUrlTip": "URL ${URL} ei sobi või pole kättesaadav."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Otsingu seaded",
    "defaultBufferDistanceLabel": "Määra puhvri vaikeulatus",
    "maxResultCountLabel": "Piira tulemuste arvu",
    "maxResultCountHintLabel": "Vihje. Saate määrata nähtavate tulemuste maksimumarvu. Väärtus 1 tagastab lähima objekti",
    "maxBufferDistanceLabel": "Määra puhvri maksimumulatus",
    "bufferDistanceUnitLabel": "Puhvri ulatuse ühikud",
    "defaultBufferHintLabel": "Vihje: määrake puhvri liuguri vaikeväärtus",
    "maxBufferHintLabel": "Vihje: määrake puhvri liuguri maksimumväärtus",
    "bufferUnitLabel": "Vihje: määratlege puhvri loomise ühik",
    "selectGraphicLocationSymbol": "Aadressi või asukoha sümbol",
    "graphicLocationSymbolHintText": "Vihje: otsitud aadressi või klõpsatud asukoha sümbol",
    "addressLocationPolygonHintText": "Vihje: otsitava polügoonikihi sümbol",
    "popupTitleForPolygon": "Valige valitud aadressi asukoha jaoks polügoon",
    "popupTitleForPolyline": "Valige aadressi asukoha jaoks joon",
    "addressLocationPolylineHintText": "Vihje: otsitava murdjoonekihi sümbol",
    "fontColorLabel": "Vali otsingutulemuste fondi värv",
    "fontColorHintText": "Vihje: otsingutulemuste fondi värv",
    "zoomToSelectedFeature": "Suumi valitud objektile",
    "zoomToSelectedFeatureHintText": "Vihje: suumige puhvri asemel valitud objektile",
    "intersectSearchLocation": "Tagasta lõikuvad polügoonid",
    "intersectSearchLocationHintText": "Vihje: puhvris asuvate polügoonide asemel tagastatakse otsitud asukohta sisaldavad polügoonid",
    "enableProximitySearch": "Luba lähedusotsing",
    "enableProximitySearchHintText": "Vihje. Lubab võimaluse otsida asukohti valitud tulemuse lähedal",
    "bufferVisibilityLabel": "Määra puhvri nähtavus",
    "bufferVisibilityHintText": "Vihje: puhver kuvatakse kaardil",
    "bufferColorLabel": "Määra puhvri sümbol",
    "bufferColorHintText": "Vihje: valige puhvri värv ja läbipaistvus",
    "searchLayerResultLabel": "Joonista ainult valitud kihi tulemused",
    "searchLayerResultHint": "Vihje: kaardile joonistatakse ainult otsingutulemustes valitud kiht",
    "showToolToSelectLabel": "Nupp Määra asukoht",
    "showToolToSelectHintText": "Vihje. Nupp asukoha määramiseks kaardil, selle asemel et määrata asukoht kaardi igakordsel klõpsamisel",
    "geoDesicParamLabel": "Kasuta geodeetilist puhvrit",
    "geoDesicParamHintText": "Vihje. Saate eukleidilise puhvri (tasapinnaline) asemel kasutada geodeetilist puhvrit"
  },
  "layerSelector": {
    "selectLayerLabel": "Vali otsingukiht (-kihid)",
    "layerSelectionHint": "Vihje: kasutage kihi (kihtide) valimiseks nuppu Määra",
    "addLayerButton": "Määra"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Teejuhiste seaded",
    "routeServiceUrl": "Marsruutimisteenus",
    "buttonSet": "Määra",
    "routeServiceUrlHintText": "Vihje: klõpsake teekonnajuhiste teenuse sirvimiseks ja valimiseks käsku â€˜Määraâ€™.",
    "directionLengthUnit": "Teejuhise pikkusühikud",
    "unitsForRouteHintText": "Vihje: kasutatakse marsruudi ühikute kuvamiseks",
    "selectRouteSymbol": "Vali marsruudi kuvamiseks sümbol",
    "routeSymbolHintText": "Vihje: kasutatakse marsruudi joonsümboli kuvamiseks",
    "routingDisabledMsg": "Enne teejuhiste lubamist veenduge, et üksusel oleks rakenduse seadetes marsruutimine lubatud."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Sümboloogia seaded",
    "addSymbologyBtnLabel": "Lisa uued sümbolid",
    "layerNameTitle": "Kihi nimi",
    "fieldTitle": "Väli",
    "valuesTitle": "Väärtused",
    "symbolTitle": "Sümbol",
    "actionsTitle": "Toimingud",
    "invalidConfigMsg": "Duplikaatväli : ${fieldName} kihile : ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Filtri seaded",
    "addTaskTip": "Lisage valitud otsingukih(t)i(de)le üks või mitu filtrit ja konfigureerige neist igaühe parameetrid.",
    "enableMapFilter": "Saate eelseatud kihifiltri kaardilt eemaldada.",
    "newFilter": "Uus filter",
    "filterExpression": "Filtri avaldis",
    "layerDefaultSymbolTip": "Kasuta kihi vaikesümbolit",
    "uploadImage": "Laadi üles pilt",
    "selectLayerTip": "Valige kiht.",
    "setTitleTip": "Määrake pealkiri.",
    "noTasksTip": "Ühtki filtrit pole konfigureeritud. Klõpsake uue filtri lisamiseks \"${newFilter}\".",
    "collapseFiltersTip": "Ahenda vidina avamise korral filtriavaldised (kui on olemas)",
    "groupFiltersTip": "Rühmita filtrid kihi järgi"
  },
  "networkServiceChooser": {
    "arcgislabel": "Lisa ArcGIS Online’ist",
    "serviceURLabel": "Lisa teenuse URL",
    "routeURL": "Marsruudi URL",
    "validateRouteURL": "Valideeri",
    "exampleText": "Näide",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Määrake sobiv marsruuditeenus.",
    "rateLimitExceeded": "Liikluse piirmäär on ületatud. Proovige hiljem uuesti.",
    "errorInvokingService": "Kasutajanimi või parool on vale."
  },
  "errorStrings": {
    "bufferErrorString": "Sisestage sobiv numbriline väärtus.",
    "selectLayerErrorString": "Valige otsingukiht (-kihid).",
    "invalidDefaultValue": "Puhvri vaikeulatuse väli ei tohi olla tühi. Määrake puhvri ulatus",
    "invalidMaximumValue": "Puhvri maksimumulatuse väli ei tohi olla tühi. Määrake puhvri ulatus",
    "defaultValueLessThanMax": "Määrake puhvri vaikeulatus limiidi piires",
    "defaultBufferValueGreaterThanOne": "Puhvri vaikimisi vahemaa ei saa olla väiksem kui 0",
    "maximumBufferValueGreaterThanOne": "Määrake puhvri maksimumulatus, mis on suurem kui 0",
    "invalidMaximumResultCountValue": "Määrake sobiv väärtus tulemuste maksimaalse arvu jaoks",
    "invalidSearchSources": "Otsinguallika sobimatud seaded"
  },
  "symbolPickerPreviewText": "Eelvaade:"
});