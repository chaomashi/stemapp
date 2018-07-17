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
      "displayText": "Mile",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Kilometer",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Fot",
      "acronym": "fot"
    },
    "meters": {
      "displayText": "Meter",
      "acronym": "m"
    }
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
    "invalidUrlTip": "URL:en ${URL} är ogiltig eller går inte att öppna."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Sökinställningar",
    "defaultBufferDistanceLabel": "Ange ett standardvärde för buffertavstånd",
    "maxResultCountLabel": "Begränsa antalet resultat",
    "maxResultCountHintLabel": "Tips: Ange det maximala antalet synliga resultat. Värdet 1 returnerar det närmaste geoobjektet",
    "maxBufferDistanceLabel": "Ange maximalt buffertavstånd",
    "bufferDistanceUnitLabel": "Enheter för buffertavstånd",
    "defaultBufferHintLabel": "Tips: Ange standardvärde för buffertreglaget",
    "maxBufferHintLabel": "Tips: Ange maxvärde för buffertreglaget",
    "bufferUnitLabel": "Tips: Ange vilken enhet som ska användas när man skapar buffertar",
    "selectGraphicLocationSymbol": "Adress- eller platssymbol",
    "graphicLocationSymbolHintText": "Tips: Symbol för adresser som användarna sökt efter eller platser som de klickat på",
    "addressLocationPolygonHintText": "Tips: Symbol för genomsökt polygonlager",
    "popupTitleForPolygon": "Välj polygon för vald adress",
    "popupTitleForPolyline": "Välj linje för vald adress",
    "addressLocationPolylineHintText": "Tips: Symbol för genomsökt polylinjelager",
    "fontColorLabel": "Välj teckensnittsfärg i sökresultaten",
    "fontColorHintText": "Tips: Teckensnittsfärg i sökresultaten",
    "zoomToSelectedFeature": "Zooma till det valda geoobjektet",
    "zoomToSelectedFeatureHintText": "Tips: Zooma till det valda geoobjektet i stället för till bufferten",
    "intersectSearchLocation": "Returnera korsande polygoner",
    "intersectSearchLocationHintText": "Tips: Returnera polygoner som innehåller den eftersökta platsen snarare än polygoner i bufferten",
    "enableProximitySearch": "Aktivera sökning i närheten",
    "enableProximitySearchHintText": "Tips: Aktivera förmågan att söka efter platser i närheten av ett valt resultat",
    "bufferVisibilityLabel": "Ange buffertens synlighet",
    "bufferVisibilityHintText": "Tips: Bufferten kommer att visas på kartan",
    "bufferColorLabel": "Ange buffertsymbol",
    "bufferColorHintText": "Tips: Välj färg och transparens för bufferten",
    "searchLayerResultLabel": "Rita bara resultat i det valda lagret",
    "searchLayerResultHint": "Tips: Bara det valda lagret i sökresultaten ritas upp på kartan",
    "showToolToSelectLabel": "Ange plats-knapp",
    "showToolToSelectHintText": "Tips: Tillhandahåller en knapp för att ange platsen på kartan, i stället för att alltid ange plats när kartan klickas",
    "geoDesicParamLabel": "Använd geodetisk buffert",
    "geoDesicParamHintText": "Tips: Använd geodetisk buffert i stället för euklidisk buffert (plan)"
  },
  "layerSelector": {
    "selectLayerLabel": "Välj söklager",
    "layerSelectionHint": "Tips: Ange knappen Ange för att välja lager",
    "addLayerButton": "Ange"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Riktningsinställningar",
    "routeServiceUrl": "Ruttjänst",
    "buttonSet": "Ange",
    "routeServiceUrlHintText": "Tips: Klicka på â€˜Angeâ€™ för att leta efter och välja en ruttjänst",
    "directionLengthUnit": "Längdenheter för riktning",
    "unitsForRouteHintText": "Tips: Används för att visa enheter för rutter",
    "selectRouteSymbol": "Välj symbol för visning av rutten",
    "routeSymbolHintText": "Tips: Visade tidigare en linjesymbol för rutten",
    "routingDisabledMsg": "Om du vill använda rutter och vägbeskrivningar måste du kontrollera att det har aktiverats för objektet i applikationsinställningarna."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Symbologiinställningar",
    "addSymbologyBtnLabel": "Lägg till nya symboler",
    "layerNameTitle": "Lagernamn",
    "fieldTitle": "Fält",
    "valuesTitle": "Värden",
    "symbolTitle": "Symbol",
    "actionsTitle": "Åtgärder",
    "invalidConfigMsg": "Dubblettfält: ${fieldName} för lagret: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Filterinställningar",
    "addTaskTip": "Lägg till ett eller flera filter i det markerade söklagret/de markerade söklagren och ställ in parametrar för vart och ett.",
    "enableMapFilter": "Ta bort det förinställda lagerfiltret från kartan.",
    "newFilter": "Nytt filter",
    "filterExpression": "Filteruttryck",
    "layerDefaultSymbolTip": "Använd standardsymbolen för lagret",
    "uploadImage": "Överför en bild",
    "selectLayerTip": "Välj ett lager.",
    "setTitleTip": "Ange en titel.",
    "noTasksTip": "Inga filter har konfigurerats. Klicka på ${newFilter} om du vill lägga till ett nytt.",
    "collapseFiltersTip": "Dölj filteruttryck (om det finns några) när widgeten öppnas",
    "groupFiltersTip": "Gruppera filter efter lager"
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
  "errorStrings": {
    "bufferErrorString": "Ange ett giltigt numeriskt värde.",
    "selectLayerErrorString": "Välj vilka lager du vill söka i.",
    "invalidDefaultValue": "Standardvärdet för buffertavstånd måste vara ifyllt. Ange buffertavståndet",
    "invalidMaximumValue": "Maxvärdet för buffertavstånd måste vara ifyllt. Ange buffertavståndet",
    "defaultValueLessThanMax": "Ange standardvärdet för buffertavstånd, och tänk på att det inte får överskrida maxgränsen",
    "defaultBufferValueGreaterThanOne": "Standardvärdet för buffertavstånd får inte vara mindre än 0",
    "maximumBufferValueGreaterThanOne": "Ange ett maxvärde för buffertavståndet som är större än noll",
    "invalidMaximumResultCountValue": "Ange ett giltigt värde för det maximala antalet resultat",
    "invalidSearchSources": "Ogiltiga sökkällinställningar"
  },
  "symbolPickerPreviewText": "Förhandsgranska:"
});