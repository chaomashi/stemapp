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
      "displayText": "Fot",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "Meter",
      "acronym": "m"
    }
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
    "invalidUrlTip": "URL-en ${URL} er ugyldig eller ikke tilgjengelig."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Søkeinnstillinger",
    "defaultBufferDistanceLabel": "Angi standard bufferavstand",
    "maxResultCountLabel": "Begrens antall resultater",
    "maxResultCountHintLabel": "Hint: Angi maksimum antall resultater som skal vises. Verdien 1 returnerer nærmeste geoobjekt.",
    "maxBufferDistanceLabel": "Angi maksimal bufferavstand",
    "bufferDistanceUnitLabel": "Enheter for bufferavstand",
    "defaultBufferHintLabel": "Hint: Angi standardverdi for bufferglidebryteren",
    "maxBufferHintLabel": "Hint: Angi maksimumsverdi for bufferglidebryteren",
    "bufferUnitLabel": "Hint: Angi enhet for oppretting av buffer",
    "selectGraphicLocationSymbol": "Adresse- eller lokasjonssymbol",
    "graphicLocationSymbolHintText": "Hint: Symbol for adresse det er søkt etter, eller lokasjon det er klikket på.",
    "addressLocationPolygonHintText": "Tips: Symbol for gjennomsøkt polygonlag",
    "popupTitleForPolygon": "Velg polygon for valgt adresselokasjon",
    "popupTitleForPolyline": "Velg linje for adresselokasjon",
    "addressLocationPolylineHintText": "Tips: Symbol for gjennomsøkt polygonlag",
    "fontColorLabel": "Velg skriftfarge for søkeresultater",
    "fontColorHintText": "Hint: Skriftfarge for søkeresultater",
    "zoomToSelectedFeature": "Zoom til det valgte geoobjektet",
    "zoomToSelectedFeatureHintText": "Hint: Zoom til det valgte geoobjektet i stedet for bufferen",
    "intersectSearchLocation": "Returner kryssende polygon(er)",
    "intersectSearchLocationHintText": "Hint: Returner  polygon(er) som inneholder lokasjonen det er søkt etter, i stedet for polygoner i bufferen",
    "enableProximitySearch": "Aktiver nærhetssøk",
    "enableProximitySearchHintText": "Tips: Aktiver muligheten til å søke etter lokasjoner nær et valgt resultat",
    "bufferVisibilityLabel": "Angi buffersynlighet",
    "bufferVisibilityHintText": "Hint: Bufferen vises i kartet",
    "bufferColorLabel": "Angi buffersymbol",
    "bufferColorHintText": "Hint: Velg farge og gjennomsiktighet for buffer",
    "searchLayerResultLabel": "Tegn kun resultater for valgt lag",
    "searchLayerResultHint": "Hint: Kun laget som er valgt i søkeresultatene tegnes på kartet",
    "showToolToSelectLabel": "Angi lokasjon-knapp",
    "showToolToSelectHintText": "Hint: Viser en knapp for å angi en lokasjon på kartet i stedet for at lokasjonen alltid angis ved å klikke på kartet.",
    "geoDesicParamLabel": "Bruk geodetisk buffer",
    "geoDesicParamHintText": "Hint: Bruk geodetisk buffer i stedet for euklidisk buffer (planar)."
  },
  "layerSelector": {
    "selectLayerLabel": "Velg et eller flere søkelag",
    "layerSelectionHint": "Hint: Bruk Angi-knappen til å velge et eller flere lag",
    "addLayerButton": "Angi"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Innstillinger for veibeskrivelser",
    "routeServiceUrl": "Rutetjeneste",
    "buttonSet": "Angi",
    "routeServiceUrlHintText": "Hint: Klikk på Angi for å bla gjennom og velge en rutetjeneste",
    "directionLengthUnit": "Lengdeenheter for rutebeskrivelse",
    "unitsForRouteHintText": "Hint: Brukes til å vise enheter for rute",
    "selectRouteSymbol": "Velg symbol for rutevisning",
    "routeSymbolHintText": "Hint: Brukes til å vise linjesymbol for ruten",
    "routingDisabledMsg": "Kontroller at rutetjenesten er aktivert for elementet i applikasjonsinnstillingene."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Symbolinnstillinger",
    "addSymbologyBtnLabel": "Legg til nye symboler",
    "layerNameTitle": "Lagnavn",
    "fieldTitle": "Felt",
    "valuesTitle": "Verdier",
    "symbolTitle": "Symbol",
    "actionsTitle": "Handlinger",
    "invalidConfigMsg": "Dupliser felt : ${fieldName} for lag : ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Filterinnstillinger",
    "addTaskTip": "Legg til ett eller flere filtre i det/de valgte søkelaget/søkelagene, og konfigurer parametere for hvert av dem.",
    "enableMapFilter": "Fjern det forhåndsvalgte lagfilteret fra kartet.",
    "newFilter": "Nytt filter",
    "filterExpression": "Filteruttrykk",
    "layerDefaultSymbolTip": "Bruk lagets standardsymbol",
    "uploadImage": "Last opp et bilde",
    "selectLayerTip": "Du må velge et lag.",
    "setTitleTip": "Du må angi en tittel.",
    "noTasksTip": "Ingen filter er konfigurert. Klikk på ${newFilter} for å legge til et nytt.",
    "collapseFiltersTip": "Skjul eventuelle filteruttrykk når widgeten åpnes",
    "groupFiltersTip": "Grupper filtre etter lag"
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
  "errorStrings": {
    "bufferErrorString": "Angi en gyldig numerisk verdi.",
    "selectLayerErrorString": "Velg laget eller lagene det skal søkes i.",
    "invalidDefaultValue": "Standard bufferavstand kan ikke være tom. Angi bufferavstanden.",
    "invalidMaximumValue": "Maksimum bufferavstand kan ikke være tom. Angi bufferavstanden.",
    "defaultValueLessThanMax": "Angi standard bufferavstand med maksimumsgrensen",
    "defaultBufferValueGreaterThanOne": "Standard bufferavstand kan ikke være mindre enn 0",
    "maximumBufferValueGreaterThanOne": "Du må angi en maksimum bufferavstand som er høyere enn 0",
    "invalidMaximumResultCountValue": "Angi en gyldig verdi for maksimum antall resultater",
    "invalidSearchSources": "Ugyldige søkekildeinnstillinger"
  },
  "symbolPickerPreviewText": "Forhåndsvisning:"
});