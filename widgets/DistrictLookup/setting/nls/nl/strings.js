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
    "miles": "Mijl",
    "kilometers": "Kilometer",
    "feet": "Voet",
    "meters": "Meter"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Zoekinstellingen",
    "buttonSet": "Instellen",
    "selectLayersLabel": "Kaartlaag selecteren",
    "selectLayersHintText": "Tip: gebruikt voor het selecteren van polygoonlaag en de bijbehorende puntlaag.",
    "selectPrecinctSymbolLabel": "Selecteer symbool om polygoon te arceren",
    "selectGraphicLocationSymbol": "Adres of locatiesymbool",
    "graphicLocationSymbolHintText": "Tip: symbool voor gezocht adres of aangeklikte locatie",
    "precinctSymbolHintText": "Tip: gebruikt voor de weergave van het symbool voor de geselecteerde polygoon",
    "selectColorForPoint": "Selecteer kleur om het punt te benadrukken",
    "selectColorForPointHintText": "Tip: gebruikt voor de weergave van de highlightkleur voor het geselecteerde punt"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Broninstellingen zoeken",
    "searchSourceSettingTitle": "Broninstellingen zoeken",
    "searchSourceSettingTitleHintText": "Geocodeerservices of objectlagen toevoegen en configureren als zoekbronnen. Deze gespecificeerde bronnen bepalen wat doorzoekbaar is in het zoekvak.",
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
    "invalidUrlTip": "De URL ${URL} is ongeldig of ontoegankelijk.",
    "invalidSearchSources": "Ongeldige instellingen zoekbron"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Polygoonlaag selecteren",
    "selectPolygonLayerHintText": "Tip: gebruikt voor het selecteren van polygoonlaag.",
    "selectRelatedPointLayerLabel": "Selecteer puntlaag gerelateerd aan polygoonlaag",
    "selectRelatedPointLayerHintText": "Tip: gebruikt voor het selecteren van puntlaag gerelateerd aan polygoonlaag",
    "polygonLayerNotHavingRelatedLayer": "Selecteer een polygoonlaag met een bijbehorende puntlaag.",
    "errorInSelectingPolygonLayer": "Selecteer een polygoonlaag met een bijbehorende puntlaag.",
    "errorInSelectingRelatedLayer": "Selecteer puntlaag gerelateerd aan polygoonlaag."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Instellingen routebeschrijving",
    "routeServiceUrl": "Routingservice",
    "buttonSet": "Instellen",
    "routeServiceUrlHintText": "Tip: Klik op 'Instellen' om te bladeren en selecteer een netwerkanalyse routingservice",
    "directionLengthUnit": "Lengte-eenheden richting",
    "unitsForRouteHintText": "Tip: gebruikt voor de weergave van gerapporteerde eenheden voor route",
    "selectRouteSymbol": "Selecteer symbool om de route weer te geven",
    "routeSymbolHintText": "Tip: gebruikt voor de weergave van lijnsymbool van de route",
    "routingDisabledMsg": "Zorg er om routebeschrijving in te schakelen voor dat de routing is ingeschakeld in het ArcGIS Online item."
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
  "symbolPickerPreviewText": "Voorbeeld:",
  "showToolToSelectLabel": "Knop locatie instellen",
  "showToolToSelectHintText": "Opmerking: Biedt een knop om de locatie op de kaart in te stellen in plaats van altijd de locatie in te stellen wanneer op de kaart wordt geklikt"
});