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
    "feet": "Fot",
    "meters": "Meter"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Søkeinnstillinger",
    "buttonSet": "Angi",
    "selectLayersLabel": "Velg lag",
    "selectLayersHintText": "Hint: Brukes til å velge polygonlag og tilknyttet punktlag.",
    "selectPrecinctSymbolLabel": "Velg symbol for å utheve polygon",
    "selectGraphicLocationSymbol": "Adresse- eller lokasjonssymbol",
    "graphicLocationSymbolHintText": "Hint: Symbol for adresse det er søkt etter, eller lokasjon det er klikket på.",
    "precinctSymbolHintText": "Hint: Brukes til å vise enheter for valgt polygon",
    "selectColorForPoint": "Velg farge for utheving av punkt",
    "selectColorForPointHintText": "Hint: Brukes til å vise uthevingsfarge for valgt punkt"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Søkekildeinnstillinger",
    "searchSourceSettingTitle": "Søkekildeinnstillinger",
    "searchSourceSettingTitleHintText": "Legg til og konfigurer geokodingstjenester eller geoobjektslag som søkekilder. Disse angitte kildene avgjør hva som er søkbart i søkeboksen.",
    "addSearchSourceLabel": "Legg til søkekilde",
    "featureLayerLabel": "Geoobjektlag",
    "geocoderLabel": "Geokoder",
    "nameTitle": "Navn",
    "generalSettingLabel": "Generell innstilling",
    "allPlaceholderLabel": "Plassholdertekst for søk i alt:",
    "allPlaceholderHintText": "Hint: Skriv inn teksten som skal vises som plassholder når du søker i alle lag og geokoder.",
    "generalSettingCheckboxLabel": "Vis popuptekst for funnet geoobjekt eller lokasjon",
    "countryCode": "Lands- eller regionskode(r)",
    "countryCodeEg": "f.eks. ",
    "countryCodeHint": "Hvis du lar dette feltet stå tomt, søkes det i alle land og regioner",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Søk kun i gjeldende kartutstrekning",
    "zoomScale": "Zoomskala",
    "locatorUrl": "Geokoder-URL",
    "locatorName": "Geokodernavn",
    "locatorExample": "Eksempel",
    "locatorWarning": "Denne versjonen av geokodingstjenesten støttes ikke. Widgeten støtter versjon 10.0 og nyere av geokodingstjenesten.",
    "locatorTips": "Forslag er ikke tilgjengelige, fordi geokodingstjenesten har ikke støtte for forslag.",
    "layerSource": "Lagkilde",
    "setLayerSource": "Angi lagkilde",
    "setGeocoderURL": "Angi geokoder-URL",
    "searchLayerTips": "Forslag er ikke tilgjengelige, fordi featuretjenesten ikke har støtte for paginering.",
    "placeholder": "Plassholdertekst",
    "searchFields": "Søkefelter",
    "displayField": "Visningsfelt",
    "exactMatch": "Nøyaktig treff",
    "maxSuggestions": "Maks. antall forslag",
    "maxResults": "Maks. antall resultater",
    "enableLocalSearch": "Aktiver lokalt søk",
    "minScale": "Minste målestokk",
    "minScaleHint": "Når kartmålestokken er større enn denne målestokken, brukes lokalt søk",
    "radius": "Radius",
    "radiusHint": "Angir radiusen for et område rundt det gjeldende midtpunktet i kartet som brukes til å styrke rangeringen til geokodingskandidater, slik at kandidater nærmest lokasjonen returneres først",
    "meters": "Meter",
    "setSearchFields": "Angi søkefelter",
    "set": "Angi",
    "fieldName": "Navn",
    "invalidUrlTip": "URL-en ${URL} er ugyldig eller ikke tilgjengelig.",
    "invalidSearchSources": "Ugyldige søkekildeinnstillinger"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Velg polygonlag",
    "selectPolygonLayerHintText": "Hint: Brukes til å velge polygonlag.",
    "selectRelatedPointLayerLabel": "Velg punktlag knyttet til polygonlag",
    "selectRelatedPointLayerHintText": "Hint: Brukes til å velge punktlaget som er tilknyttet polygonlaget",
    "polygonLayerNotHavingRelatedLayer": "Velg et polygonlag som har et tilknyttet punktlag.",
    "errorInSelectingPolygonLayer": "Velg et polygonlag som har et tilknyttet punktlag.",
    "errorInSelectingRelatedLayer": "Velg punktlag knyttet til polygonlag."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Innstillinger for veibeskrivelser",
    "routeServiceUrl": "Rutetjeneste",
    "buttonSet": "Angi",
    "routeServiceUrlHintText": "Hint: Klikk på Angi for å bla gjennom og velge en rutetjeneste for nettverksanalyse",
    "directionLengthUnit": "Lengdeenheter for rutebeskrivelse",
    "unitsForRouteHintText": "Hint: Brukes til å vise rapporterte enheter for rute",
    "selectRouteSymbol": "Velg symbol for rutevisning",
    "routeSymbolHintText": "Hint: Brukes til å vise linjesymbol for ruten",
    "routingDisabledMsg": "Kontroller at ruteberegning er aktivert i ArcGIS Online-elementet hvis du vil aktivere rutebeskrivelser."
  },
  "networkServiceChooser": {
    "arcgislabel": "Legg til fra ArcGIS Online",
    "serviceURLabel": "Legg til tjeneste-URL",
    "routeURL": "Rute-URL",
    "validateRouteURL": "Valider",
    "exampleText": "Eksempel",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Angi en gyldig rutetjeneste",
    "rateLimitExceeded": "Hastighetsbegrensningen er overskredet. Prøv på nytt senere.",
    "errorInvokingService": "Brukernavnet eller passordet er feil."
  },
  "symbolPickerPreviewText": "Forhåndsvisning:",
  "showToolToSelectLabel": "Angi lokasjon-knapp",
  "showToolToSelectHintText": "Hint: Viser en knapp for å angi en lokasjon på kartet i stedet for at lokasjonen alltid angis ved å klikke på kartet."
});