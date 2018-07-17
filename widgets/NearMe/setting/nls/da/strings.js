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
      "displayText": "Miles",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Kilometer",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Fod",
      "acronym": "fod"
    },
    "meters": {
      "displayText": "Meter",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Søgekildeindstillinger",
    "searchSourceSettingTitle": "Søgekildeindstillinger",
    "searchSourceSettingTitleHintText": "Tilføj og konfigurér geokodningstjenester eller vektorlag som søgekilder. Disse specificerede kilder bestemmer, hvad der kan søges efter i søgeboksen.",
    "addSearchSourceLabel": "Tilføj søgekilde",
    "featureLayerLabel": "Vektorlag",
    "geocoderLabel": "Geokoder",
    "nameTitle": "Navn",
    "generalSettingLabel": "Generel indstilling",
    "allPlaceholderLabel": "Pladsholdertekst for søgning efter alle:",
    "allPlaceholderHintText": "Tip: Indtast den tekst, der skal vises som pladsholder, mens der søges i alle lag og geokoder",
    "generalSettingCheckboxLabel": "Vis pop-up for det fundne objekt eller den fundne position",
    "countryCode": "Lande- eller regionskode(r)",
    "countryCodeEg": "f.eks. ",
    "countryCodeHint": "Hvis denne værdi er tom, bliver der søgt efter alle lande og regioner",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Søg kun inden for den aktuelle kortudstrækning",
    "zoomScale": "Zoom-skala",
    "locatorUrl": "Geokodnings-URL",
    "locatorName": "Navn på geokodningsfunktion",
    "locatorExample": "Eksempel",
    "locatorWarning": "Denne version af geokodningstjenesten understøttes ikke. Widget'en understøtter Geokodningstjeneste version 10.0 og nyere.",
    "locatorTips": "Forslag er ikke tilgængelige, fordi geokodningstjenesten ikke understøtter forslagsfunktionen.",
    "layerSource": "Lagkilde",
    "setLayerSource": "Angiv lagkilde",
    "setGeocoderURL": "Angiv geokodnings-URL",
    "searchLayerTips": "Forslag er ikke tilgængelige, fordi featuretjenesten ikke understøtter forslagsfunktionen.",
    "placeholder": "Pladsholdertekst",
    "searchFields": "Søgefelter",
    "displayField": "Visningsfelt:",
    "exactMatch": "Nøjagtigt match",
    "maxSuggestions": "Maksimalt antal forslag",
    "maxResults": "Maksimalt antal resultater",
    "enableLocalSearch": "Aktivér lokal søgning",
    "minScale": "Min. målestok",
    "minScaleHint": "Når kortmålestokken er større end denne målstok, anvendes lokal søgning",
    "radius": "Radius",
    "radiusHint": "Angiver radius for et område omkring det aktuelle kortcentrum, der benyttes til at booste rangordningen af geokodningsforslag, så de forslag, der ligger tættest på placeringen, returneres først",
    "meters": "Meter",
    "setSearchFields": "Indstil søgefelter",
    "set": "Angiv",
    "fieldName": "Navn",
    "invalidUrlTip": "URL’en ${URL} er ugyldig eller utilgængelig."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Søgeindstillinger",
    "defaultBufferDistanceLabel": "Angiv standardbufferafstand",
    "maxResultCountLabel": "Begræns antallet af resultater",
    "maxResultCountHintLabel": "Tip: Angiv det maksimale antal synlige resultater. Værdien 1 vil returnere det nærmeste objekt",
    "maxBufferDistanceLabel": "Angiv maksimal bufferafstand",
    "bufferDistanceUnitLabel": "Bufferafstandsenheder",
    "defaultBufferHintLabel": "Tip: Angiv standardværdi for bufferskyder",
    "maxBufferHintLabel": "Tip: Angiv maksimal værdi for bufferskyder",
    "bufferUnitLabel": "Tip: Definér enhed for oprettelse af en buffer",
    "selectGraphicLocationSymbol": "Adresse- eller positionssymbol",
    "graphicLocationSymbolHintText": "Tip: Symbol for søgt adresse eller klikket position",
    "addressLocationPolygonHintText": "Tip: Symbol for det søgte polygonlag",
    "popupTitleForPolygon": "Vælg polygon for den valgte adresseposition",
    "popupTitleForPolyline": "Vælg linje for den valgte adresseposition",
    "addressLocationPolylineHintText": "Tip: Symbol for det søgte polylinjelag",
    "fontColorLabel": "Vælg skrifttypefarve for søgeresultater",
    "fontColorHintText": "Tip: Skrifttypefarve for søgeresultater",
    "zoomToSelectedFeature": "Zoom til det valgte objekt",
    "zoomToSelectedFeatureHintText": "Tip: Zoom til det valgte objekt i stedet for til bufferen",
    "intersectSearchLocation": "Returnér polygon(er), der gennemskærer hinanden",
    "intersectSearchLocationHintText": "Tip: Returnér polygon(er), der indeholder den søgte position frem for polygoner inden for bufferen",
    "enableProximitySearch": "Aktivér lokal i søgning",
    "enableProximitySearchHintText": "Tip: Aktivér muligheden for at søge efter steder i nærheden af et valgt resultat",
    "bufferVisibilityLabel": "Indstil buffersynlighed",
    "bufferVisibilityHintText": "Tip: Bufferen vil blive vist på kortet",
    "bufferColorLabel": "Indstil buffersymbol",
    "bufferColorHintText": "Tip: Vælg bufferens farve og gennemsigtighed",
    "searchLayerResultLabel": "Tegn kun resultater fra valgte lag",
    "searchLayerResultHint": "Tip: Kun de valgte lag i søgeresultaterne vil blive tegnet på kortet",
    "showToolToSelectLabel": "Knap til angivelse af placering",
    "showToolToSelectHintText": "Tip: Opretter en knap til angivelse af placering på kortet i stedet for altid at skulle angive placeringen, når der klikkes på kortet",
    "geoDesicParamLabel": "Brug geodætisk buffer",
    "geoDesicParamHintText": "Tip: Brug geodætisk buffer i stedet for euklidisk buffer (planar)"
  },
  "layerSelector": {
    "selectLayerLabel": "Vælg søgelag",
    "layerSelectionHint": "Tip: Brug indstillingsknappen til at vælge lag(ene)",
    "addLayerButton": "Indstil"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Indstillinger for kørselsvejledninger",
    "routeServiceUrl": "Rutetjeneste",
    "buttonSet": "Indstil",
    "routeServiceUrlHintText": "Tip: Klik på Indstil for at gå til og vælge en rutetjeneste",
    "directionLengthUnit": "Længdeenheder for kørselsvejledning",
    "unitsForRouteHintText": "Tip: Bruges til at vise enheder for ruten",
    "selectRouteSymbol": "Vælg symbol for visning af rute",
    "routeSymbolHintText": "Tip: Brug visningslinjesymbolet for ruten",
    "routingDisabledMsg": "For at aktivere kørselsvejledninger skal du sørge for, at ruteplanlægning er aktiveret for elementet i applikationsindstillingerne."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Symbologi-indstillinger",
    "addSymbologyBtnLabel": "Tilføj nye symboler",
    "layerNameTitle": "Navn på lag",
    "fieldTitle": "Felt",
    "valuesTitle": "Værdier",
    "symbolTitle": "Symbol",
    "actionsTitle": "Handlinger",
    "invalidConfigMsg": "Dobbelt forekomst af feltet: ${fieldName} i laget: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Filterindstillinger",
    "addTaskTip": "Føj et eller flere filtre til de(t) valgte søgelag, og konfigurér parametre for hvert af dem.",
    "enableMapFilter": "Fjern det forudindstillede lagfilter fra kortet.",
    "newFilter": "Nyt filter",
    "filterExpression": "Filterudtryk",
    "layerDefaultSymbolTip": "Brug lagets standardsymbol",
    "uploadImage": "Overfør et billede",
    "selectLayerTip": "Vælg et lag.",
    "setTitleTip": "Angiv en titel.",
    "noTasksTip": "Ingen filtre konfigureret. Klik på \"${newFilter}\" for at tilføje et nyt filter.",
    "collapseFiltersTip": "Skjul filterudtryk (hvis der er nogen), når widget'en åbnes",
    "groupFiltersTip": "Gruppér filtre efter lag"
  },
  "networkServiceChooser": {
    "arcgislabel": "Tilføj fra ArcGIS Online",
    "serviceURLabel": "Tilføj tjeneste-URL",
    "routeURL": "Rute-URL",
    "validateRouteURL": "Bekræft",
    "exampleText": "Eksempel",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Angiv en gyldig rutetjeneste.",
    "rateLimitExceeded": "Begrænsning overskredet. Prøv igen senere.",
    "errorInvokingService": "Brugernavn eller adgangskode er forkert."
  },
  "errorStrings": {
    "bufferErrorString": "Angiv en gyldig numerisk værdi.",
    "selectLayerErrorString": "Vælg de lag, der skal søges i.",
    "invalidDefaultValue": "Standardbufferafstand kan ikke være tom. Angiv bufferafstanden",
    "invalidMaximumValue": "Maksimumbufferafstand kan ikke være tom. Angiv bufferafstanden",
    "defaultValueLessThanMax": "Angiv standardbufferafstand inden for maksimumgrænsen",
    "defaultBufferValueGreaterThanOne": "Standardbufferafstanden kan ikke være mindre end 0",
    "maximumBufferValueGreaterThanOne": "Angiv en maksimumbufferafstand, der er større end 0",
    "invalidMaximumResultCountValue": "Angiv en gyldig værdi for det maksimale antal resultater",
    "invalidSearchSources": "Ugyldige søgekildeindstillinger"
  },
  "symbolPickerPreviewText": "Forhåndsvisning:"
});