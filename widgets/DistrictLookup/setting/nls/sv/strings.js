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
    "miles": "Mile",
    "kilometers": "Kilometer",
    "feet": "Fot",
    "meters": "Meter"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Sökinställningar",
    "buttonSet": "Ange",
    "selectLayersLabel": "Välj lager",
    "selectLayersHintText": "Tips: Används för att markera polygonlager och tillhörande punktlager.",
    "selectPrecinctSymbolLabel": "Välj symbol för att markera polygon",
    "selectGraphicLocationSymbol": "Adress- eller platssymbol",
    "graphicLocationSymbolHintText": "Tips: Symbol för adresser som användarna sökt efter eller platser som de klickat på",
    "precinctSymbolHintText": "Tips: Används för att visa symbolen för en markerad polygon",
    "selectColorForPoint": "Välj färg för att markera punkt",
    "selectColorForPointHintText": "Tips: Används för att visa markeringsfärg för en vald punkt"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Sök källinställningar",
    "searchSourceSettingTitle": "Sök källinställningar",
    "searchSourceSettingTitleHintText": "Lägg till och konfigurera geokodningstjänster eller geoobjektslager som sökkällor. Dessa angivna källor avgör vad som går att söka i sökrutan",
    "addSearchSourceLabel": "Lägg till sökkälla",
    "featureLayerLabel": "geoobjektslager",
    "geocoderLabel": "Geokodare",
    "nameTitle": "Namn",
    "generalSettingLabel": "Allmän inställning",
    "allPlaceholderLabel": "Platshållartext för sökning i alla:",
    "allPlaceholderHintText": "Tips: Ange text som ska visas som platshållare när du söker i alla lager och geokodare",
    "generalSettingCheckboxLabel": "Visa popup för det hittade geoobjekt eller den hittade platsen",
    "countryCode": "Lands- eller regionkoder",
    "countryCodeEg": "till exempel ",
    "countryCodeHint": "Om du lämnar det här värdet tomt sker sökningen i alla länder och regioner",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Sök bara i den aktuella kartutbredningen",
    "zoomScale": "Zoomningsskala",
    "locatorUrl": "Geokodarens URL",
    "locatorName": "Geokodarens namn",
    "locatorExample": "Exempel",
    "locatorWarning": "Den här versionen av geokodningstjänsten stöds inte. Widgeten har stöd för geokodningstjänsten 10.0 och högre.",
    "locatorTips": "Förslag finns inte tillgängliga eftersom geokodningstjänsten inte har stöd för förslagsfunktionen.",
    "layerSource": "Lagerkälla",
    "setLayerSource": "Ange lagerkälla",
    "setGeocoderURL": "Ange URL till geokodare",
    "searchLayerTips": "Förslag finns inte tillgängliga eftersom geoobjektstjänsten inte har stöd för pagineringsfunktionen.",
    "placeholder": "Platshållartext",
    "searchFields": "Sökfält",
    "displayField": "Visa fält",
    "exactMatch": "Exakt matchning",
    "maxSuggestions": "Maximalt antal förslag",
    "maxResults": "Maximala resultat",
    "enableLocalSearch": "Aktivera lokal sökning",
    "minScale": "Minimiskala",
    "minScaleHint": "När kartans skala är större än denna skala används lokal sökning",
    "radius": "Radie",
    "radiusHint": "Anger radien för ett område kring den aktuella kartans mitt som ska användas för att höja rangordningen för geokodningskandidater så att de kandidater som är närmast platsen returneras först",
    "meters": "Meter",
    "setSearchFields": "Ange sökfält",
    "set": "Ange",
    "fieldName": "Namn",
    "invalidUrlTip": "URL:en ${URL} är ogiltig eller går inte att öppna.",
    "invalidSearchSources": "Ogiltiga sökkällinställningar"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Välj polygonlager",
    "selectPolygonLayerHintText": "Tips: Används för att markera polygonlager.",
    "selectRelatedPointLayerLabel": "Markera punktlager som är kopplade till polygonlager",
    "selectRelatedPointLayerHintText": "Tips: Används för att markera punktlager som är kopplade till polygonlager",
    "polygonLayerNotHavingRelatedLayer": "Välj ett polygonlager som har ett tillhörande punktlager.",
    "errorInSelectingPolygonLayer": "Välj ett polygonlager som har ett tillhörande punktlager.",
    "errorInSelectingRelatedLayer": "Markera punktlager som är kopplade till polygonlager."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Riktningsinställningar",
    "routeServiceUrl": "Ruttjänst",
    "buttonSet": "Ange",
    "routeServiceUrlHintText": "Tips: Klicka på Ange för att leta efter och markera en ruttjänst för nätverksanalys",
    "directionLengthUnit": "Längdenheter för riktning",
    "unitsForRouteHintText": "Tips: Används för att visa rapporterade enheter för rutter",
    "selectRouteSymbol": "Välj symbol för visning av rutten",
    "routeSymbolHintText": "Tips: Visade tidigare en linjesymbol för rutten",
    "routingDisabledMsg": "Om du vill använda rutter och vägbeskrivningar måste du kontrollera att det har aktiverats i objektet ArcGIS Online."
  },
  "networkServiceChooser": {
    "arcgislabel": "Lägg till från ArcGIS Online",
    "serviceURLabel": "Lägg till tjänst-URL",
    "routeURL": "Rutt-URL",
    "validateRouteURL": "Validera",
    "exampleText": "Exempel",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Ange en giltig ruttjänst.",
    "rateLimitExceeded": "Hastighetsbegränsningen överskreds. Försök igen senare.",
    "errorInvokingService": "Användarnamn eller lösenord är felaktigt."
  },
  "symbolPickerPreviewText": "Förhandsgranska:",
  "showToolToSelectLabel": "Ange plats-knapp",
  "showToolToSelectHintText": "Tips: Tillhandahåller en knapp för att ange platsen på kartan, i stället för att alltid ange plats när kartan klickas"
});