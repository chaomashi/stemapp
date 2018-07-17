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
      "displayText": "Mijl",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Kilometer",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Voet",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "Meter",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Broninstellingen zoeken",
    "searchSourceSettingTitle": "Broninstellingen zoeken",
    "searchSourceSettingTitleHintText": "Geocodeerservices of objectlagen toevoegen en configureren als zoekbronnen. Deze bepaalde bronnen bepalen wat doorzoekbaar is in het zoekvak.",
    "addSearchSourceLabel": "Zoekbron toevoegen",
    "featureLayerLabel": "Objectlaag",
    "geocoderLabel": "Geocoder",
    "nameTitle": "Naam",
    "generalSettingLabel": "Algemene instelling",
    "allPlaceholderLabel": "Plaatshoudertekst om alles te zoeken:",
    "allPlaceholderHintText": "Hint: Voer tekst in die moet worden getoond als plaatshouder tijdens het zoeken door alle lagen en geocoder",
    "generalSettingCheckboxLabel": "Pop-up weergeven voor gevonden object of locatie",
    "countryCode": "Land- of regiocode(s)",
    "countryCodeEg": "bijv. ",
    "countryCodeHint": "Laat deze waarde leeg en alle landen en regio's worden gezocht",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Alleen zoeken in huidige kaartextent",
    "zoomScale": "Schaal voor in-/uitzoomen",
    "locatorUrl": "Geocoder-URL",
    "locatorName": "Naam van geocoder",
    "locatorExample": "Voorbeeld",
    "locatorWarning": "Deze versie van geocodeerservice wordt niet ondersteund. De widget ondersteunt geocodeerservice 10.0 en hoger.",
    "locatorTips": "Suggesties zijn niet beschikbaar omdat de geocodeerservice geen suggesties ondersteunt.",
    "layerSource": "Laagbron",
    "setLayerSource": "Laagbron instellen",
    "setGeocoderURL": "Geocoder-URL instellen",
    "searchLayerTips": "Suggesties zijn niet beschikbaar omdat de feautureservice geen pagination ondersteunt.",
    "placeholder": "Tekst van tijdelijke aanduiding",
    "searchFields": "Zoekvelden",
    "displayField": "Weergaveveld:",
    "exactMatch": "Exacte overeenkomst",
    "maxSuggestions": "Maximale suggesties",
    "maxResults": "Maximale resultaten",
    "enableLocalSearch": "Lokaal zoeken inschakelen",
    "minScale": "Min.schaal",
    "minScaleHint": "Als de kaartschaal groter is dan deze schaal, dan zal lokaal zoeken toegepast worden",
    "radius": "Straal",
    "radiusHint": "Bepaalt de straal van een gebied rond het midden van de huidige kaart, die gebruikt wordt om de rangorde van geocoding-kandidaten te versterken zodat kandidaten die het dichtst in de buurt zijn eerst weergegeven worden",
    "meters": "Meter",
    "setSearchFields": "Zoekvelden instellen",
    "set": "Instellen",
    "fieldName": "Naam",
    "invalidUrlTip": "De URL ${URL} is ongeldig of ontoegankelijk."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Zoekinstellingen",
    "defaultBufferDistanceLabel": "Stel de standaard bufferafstand in",
    "maxResultCountLabel": "Aantal resultaten beperken",
    "maxResultCountHintLabel": "Hint: Stel het maximum aantal zichtbare resultaten in. De waarde van 1 zal het dichtstbijzijnde object retourneren",
    "maxBufferDistanceLabel": "Stel de maximale bufferafstand in",
    "bufferDistanceUnitLabel": "Bufferafstandseenheden",
    "defaultBufferHintLabel": "Tip: stel de standaardwaarde voor de bufferschuif in",
    "maxBufferHintLabel": "Tip: stel de maximale waarde voor de bufferschuif in",
    "bufferUnitLabel": "Tip: eenheid definiëren voor het creëren van een buffer",
    "selectGraphicLocationSymbol": "Adres of locatiesymbool",
    "graphicLocationSymbolHintText": "Tip: symbool voor gezocht adres of aangeklikte locatie",
    "addressLocationPolygonHintText": "Hint: Symbool voor gezochte polygoonlaag",
    "popupTitleForPolygon": "Selecteer polygoon voor geselecteerde adreslocatie",
    "popupTitleForPolyline": "Selecteer lijn voor adreslocatie",
    "addressLocationPolylineHintText": "Hint: Symbool voor gezochte polylijnlaag",
    "fontColorLabel": "Selecteer fontkleur voor zoekresultaten",
    "fontColorHintText": "Tip: fontkleur van zoekresultaten",
    "zoomToSelectedFeature": "Zoomen naar het geselecteerde object",
    "zoomToSelectedFeatureHintText": "Tip: zoomen naar het geselecteerde object in plaats van de buffer",
    "intersectSearchLocation": "Kruisende polygo(o)n(en) retourneren",
    "intersectSearchLocationHintText": "Tip: Retourneer polygo(o)n(en) die de gezochte locatie bevatten in plaats van polygonen binnen de buffer",
    "enableProximitySearch": "In de buurt zoeken inschakelen",
    "enableProximitySearchHintText": "Hint: Activeer de mogelijkheid om te zoeken naar locaties in de buurt van een geselecteerd resultaat",
    "bufferVisibilityLabel": "Stel de zichtbaarheid van de buffer in",
    "bufferVisibilityHintText": "Tip: De buffer wordt weergegeven op de kaart",
    "bufferColorLabel": "Stel het symbool van de buffer in",
    "bufferColorHintText": "Tip: Selecteer de kleur en transparantie van de buffer",
    "searchLayerResultLabel": "Teken alleen geselecteerde laagresultaten",
    "searchLayerResultHint": "Tip: Alleen de geselecteerde laag in de zoekresultaten wordt op de kaart getekend",
    "showToolToSelectLabel": "Knop locatie instellen",
    "showToolToSelectHintText": "Opmerking: Biedt een knop om de locatie op de kaart in te stellen in plaats van altijd de locatie in te stellen wanneer op de kaart wordt geklikt",
    "geoDesicParamLabel": "Geodetische buffer gebruiken",
    "geoDesicParamHintText": "Hint: Gebruik geodetische buffer in plaats van Euclidische buffer (vlak)"
  },
  "layerSelector": {
    "selectLayerLabel": "Zoekla(a)g(en) selecteren",
    "layerSelectionHint": "Tip: gebruik de instelknop om la(a)g(en) te selecteren",
    "addLayerButton": "Instellen"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Instellingen routebeschrijving",
    "routeServiceUrl": "Routingservice",
    "buttonSet": "Instellen",
    "routeServiceUrlHintText": "Tip: Klik op â€˜Setâ€™ om te bladeren en selecteer een routingservice",
    "directionLengthUnit": "Lengte-eenheden richting",
    "unitsForRouteHintText": "Tip: gebruikt voor de weergave van eenheden voor route",
    "selectRouteSymbol": "Selecteer symbool om de route weer te geven",
    "routeSymbolHintText": "Tip: gebruikt voor de weergave van lijnsymbool van de route",
    "routingDisabledMsg": "Als u routebeschrijving wilt inschakelen, zorgt u ervoor dat routing is ingeschakeld op het item in de applicatie-instellingen."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Symbology-instellingen",
    "addSymbologyBtnLabel": "Nieuwe symbolen toevoegen",
    "layerNameTitle": "Laagnaam",
    "fieldTitle": "Veld",
    "valuesTitle": "Waarden",
    "symbolTitle": "Symbool",
    "actionsTitle": "Acties",
    "invalidConfigMsg": "Dupliceer veld : ${fieldName} voor laag: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Filterinstellingen",
    "addTaskTip": "Voeg een of meer filters toe aan de geselecteerde zoeklaag (-lagen) en configureer parameters voor elk van deze filters.",
    "enableMapFilter": "De vooraf ingestelde laagfilter uit de kaart verwijderen.",
    "newFilter": "Nieuw filter",
    "filterExpression": "Filterexpressie",
    "layerDefaultSymbolTip": "Gebruik het standaardsymbool van de laag",
    "uploadImage": "Een afbeelding uploaden",
    "selectLayerTip": "Selecteer een laag.",
    "setTitleTip": "Stel de titel in.",
    "noTasksTip": "Geen filters geconfigureerd. Klik op \"${newFilter}\" om een nieuwe toe te voegen.",
    "collapseFiltersTip": "Vouw de filterexpressies (indien van toepassing) samen als de widget wordt geopend",
    "groupFiltersTip": "Groepeer filters per laag"
  },
  "networkServiceChooser": {
    "arcgislabel": "Toevoegen vanuit ArcGIS Online",
    "serviceURLabel": "Service-URL toevoegen",
    "routeURL": "Route-URL",
    "validateRouteURL": "Valideren",
    "exampleText": "Voorbeeld",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Geef een geldige routeservice op.",
    "rateLimitExceeded": "Tarieflimiet overschreden. Probeer het later nogmaals.",
    "errorInvokingService": "Gebruikersnaam of wachtwoord is onjuist."
  },
  "errorStrings": {
    "bufferErrorString": "Voer een geldige numerieke waarde in.",
    "selectLayerErrorString": "Selecteer la(a)g(en) om te zoeken.",
    "invalidDefaultValue": "Standaard bufferafstand mag niet leeg zijn. Geef de bufferafstand op",
    "invalidMaximumValue": "Maximale bufferafstand mag niet leeg zijn. Geef de bufferafstand op",
    "defaultValueLessThanMax": "Geef de standaardbufferafstand op binnen de bovengrens",
    "defaultBufferValueGreaterThanOne": "Standaard bufferafstand kan niet lager zijn dan 0",
    "maximumBufferValueGreaterThanOne": "Geef de maximale bufferafstand groter dan 0 op",
    "invalidMaximumResultCountValue": "Geef aub een geldige waarde op voor de maximale resultaattelling",
    "invalidSearchSources": "Ongeldige instellingen zoekbron"
  },
  "symbolPickerPreviewText": "Voorbeeld:"
});