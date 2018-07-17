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
    "miles": "Miles",
    "kilometers": "Kilometer",
    "feet": "Fod",
    "meters": "Meter"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Søgeindstillinger",
    "buttonSet": "Indstil",
    "selectLayersLabel": "Vælg lag",
    "selectLayersHintText": "Tip: Bruges til at vælge polygonlaget og dets tilknyttede punktlag.",
    "selectPrecinctSymbolLabel": "Vælg symbol for at fremhæve polygon",
    "selectGraphicLocationSymbol": "Adresse- eller positionssymbol",
    "graphicLocationSymbolHintText": "Tip: Symbol for søgt adresse eller klikket position",
    "precinctSymbolHintText": "Tip: Bruges til at vise symbol for den valgte polygon",
    "selectColorForPoint": "Vælg farve for at fremhæve punkt",
    "selectColorForPointHintText": "Tip: Bruges til at vise fremhævningsfarve for det valgte punkt"
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
    "invalidUrlTip": "URL’en ${URL} er ugyldig eller utilgængelig.",
    "invalidSearchSources": "Ugyldige søgekildeindstillinger"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Vælg polygonlag",
    "selectPolygonLayerHintText": "Tip: Bruges til at vælge polygonlag.",
    "selectRelatedPointLayerLabel": "Vælg det punktlag, der er knyttet til polygonlaget",
    "selectRelatedPointLayerHintText": "Tip: Bruges til at vælge det punktlag, der er knyttet til polygonlaget",
    "polygonLayerNotHavingRelatedLayer": "Vælg et polygonlag med et tilknyttet punktlag.",
    "errorInSelectingPolygonLayer": "Vælg et polygonlag med et tilknyttet punktlag.",
    "errorInSelectingRelatedLayer": "Vælg det punktlag, der er knyttet til polygonlaget."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Indstillinger for kørselsvejledninger",
    "routeServiceUrl": "Rutetjeneste",
    "buttonSet": "Indstil",
    "routeServiceUrlHintText": "Tip: Klik på ‘Indstil’ for at gå til og vælge en netværksanalysetjeneste for ruter",
    "directionLengthUnit": "Længdeenheder for kørselsvejledning",
    "unitsForRouteHintText": "Tip: Bruges til at vise rapporterede enheder for ruten",
    "selectRouteSymbol": "Vælg symbol for visning af rute",
    "routeSymbolHintText": "Tip: Brug visningslinjesymbolet for ruten",
    "routingDisabledMsg": "For at aktivere kørselsvejledninger skal du sørge for, at ruteplanlægning er aktiveret i ArcGIS Online-elementet."
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
  "symbolPickerPreviewText": "Forhåndsvisning:",
  "showToolToSelectLabel": "Knap til angivelse af placering",
  "showToolToSelectHintText": "Tip: Opretter en knap til angivelse af placering på kortet i stedet for altid at skulle angive placeringen, når der klikkes på kortet"
});