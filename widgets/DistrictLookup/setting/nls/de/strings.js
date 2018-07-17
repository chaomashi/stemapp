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
    "miles": "Meilen",
    "kilometers": "Kilometer",
    "feet": "Fuß",
    "meters": "Meter"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Sucheinstellungen",
    "buttonSet": "Festlegen",
    "selectLayersLabel": "Layer auswählen",
    "selectLayersHintText": "Hinweis: Wird verwendet, um Polygon-Layer und den zugehörigen Punkt-Layer auszuwählen.",
    "selectPrecinctSymbolLabel": "Symbol zum Hervorheben des Polygons auswählen",
    "selectGraphicLocationSymbol": "Symbol für Adresse oder Position",
    "graphicLocationSymbolHintText": "Hinweis: Symbol für gesuchte Adresse oder aktivierte Position",
    "precinctSymbolHintText": "Hinweis: Wird verwendet, um ein Symbol für das ausgewählte Polygon anzuzeigen",
    "selectColorForPoint": "Farbe zum Hervorheben des Punktes auswählen",
    "selectColorForPointHintText": "Hinweis: Wird zum Anzeigen der Hervorhebungsfarbe für den ausgewählten Punkt verwendet."
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Konfiguration der Suchquellen",
    "searchSourceSettingTitle": "Konfiguration der Suchquellen",
    "searchSourceSettingTitleHintText": "Fügen Sie Geokodierungsservices oder Feature-Layer als Suchquellen hinzu, und konfigurieren Sie sie. Anhand dieser angegebenen Quellen wird bestimmt, welche Elemente im Suchfeld durchsucht werden können.",
    "addSearchSourceLabel": "Suchquelle hinzufügen",
    "featureLayerLabel": "Feature-Layer",
    "geocoderLabel": "Geocoder",
    "nameTitle": "Name",
    "generalSettingLabel": "Allgemeine Einstellung",
    "allPlaceholderLabel": "Platzhaltertext für die Suche in allen Quellen:",
    "allPlaceholderHintText": "Hinweis: Geben Sie den Platzhaltertext für die Suche in allen Layern und Geocodern ein.",
    "generalSettingCheckboxLabel": "Pop-up für das gefundene Feature oder die gefundene Position anzeigen",
    "countryCode": "Länder- oder Regionscode(s)",
    "countryCodeEg": "z. B. ",
    "countryCodeHint": "Wenn dieser Wert leer gelassen wird, werden alle Länder und Regionen durchsucht.",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Nur in der aktuellen Kartenausdehnung suchen",
    "zoomScale": "Zoom-Maßstab",
    "locatorUrl": "Geocoder-URL",
    "locatorName": "Geocoder-Name",
    "locatorExample": "Beispiel",
    "locatorWarning": "Diese Version des Geokodierungsservice wird nicht unterstützt. Das Widget unterstützt Geokodierungsservices der Version 10.0 und höher.",
    "locatorTips": "Es sind keine Vorschläge verfügbar, da der Geokodierungsservice die Vorschlagsfunktion nicht unterstützt.",
    "layerSource": "Layer-Quelle",
    "setLayerSource": "Layer-Quelle festlegen",
    "setGeocoderURL": "Geocoder-URL festlegen",
    "searchLayerTips": "Es sind keine Vorschläge verfügbar, da der Feature-Service die Paginierungsfunktion nicht unterstützt.",
    "placeholder": "Platzhaltertext",
    "searchFields": "Suchfelder",
    "displayField": "Anzeigefeld",
    "exactMatch": "Exakte Übereinstimmung",
    "maxSuggestions": "Maximale Anzahl von Vorschlägen",
    "maxResults": "Maximale Anzahl von Ergebnissen",
    "enableLocalSearch": "Lokale Suche aktivieren",
    "minScale": "Min. Maßstab",
    "minScaleHint": "Wenn der Kartenmaßstab größer ist als dieser Maßstab, wird die lokale Suche angewendet.",
    "radius": "Radius",
    "radiusHint": "Ermöglicht die Festlegung des Radius einer Fläche um den aktuellen Kartenmittelpunkt, der dazu dient, die Rangfolge von Geokodierungskandidaten zu optimieren. Die Kandidaten, die der Position am nächsten liegen, werden auf diese Weise zuerst ausgegeben.",
    "meters": "Meter",
    "setSearchFields": "Suchfelder festlegen",
    "set": "Festlegen",
    "fieldName": "Name",
    "invalidUrlTip": "Die URL ${URL} ist ungültig oder es kann nicht darauf zugegriffen werden.",
    "invalidSearchSources": "Ungültige Suchquelleneinstellungen"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Polygon-Layer auswählen",
    "selectPolygonLayerHintText": "Hinweis: Wird verwendet, um Polygon-Layer auszuwählen.",
    "selectRelatedPointLayerLabel": "Mit Polygon-Layer in Beziehung stehenden Punkt-Layer auswählen",
    "selectRelatedPointLayerHintText": "Hinweis: Wird verwendet, um einen mit dem Polygon-Layer in Beziehung stehenden Punkt-Layer auszuwählen.",
    "polygonLayerNotHavingRelatedLayer": "Wählen Sie einen Polygon-Layer aus, der einen zugehörigen Punkt-Layer aufweist.",
    "errorInSelectingPolygonLayer": "Wählen Sie einen Polygon-Layer aus, der einen zugehörigen Punkt-Layer aufweist.",
    "errorInSelectingRelatedLayer": "Wählen Sie einen Punkt-Layer aus, der mit einem Polygon-Layer in Beziehung steht."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Wegbeschreibungseinstellungen",
    "routeServiceUrl": "Routing-Service",
    "buttonSet": "Festlegen",
    "routeServiceUrlHintText": "Hinweis: Klicken Sie auf \"Festlegen\", um einen Routing-Service für Netzwerkanalysen zu durchsuchen und auszuwählen",
    "directionLengthUnit": "Längeneinheiten für Wegbeschreibung",
    "unitsForRouteHintText": "Hinweis: Wird zum Anzeigen erfasster Einheiten für die Route verwendet.",
    "selectRouteSymbol": "Symbol zum Anzeigen der Route auswählen",
    "routeSymbolHintText": "Hinweis: Wird zum Anzeigen des Liniensymbols der Route verwendet.",
    "routingDisabledMsg": "Um Wegbeschreibungen zu aktivieren, müssen Sie sicherstellen, dass Routen im ArcGIS Online-Element aktiviert sind."
  },
  "networkServiceChooser": {
    "arcgislabel": "Aus ArcGIS Online hinzufügen",
    "serviceURLabel": "Service-URL hinzufügen",
    "routeURL": "Routen-URL",
    "validateRouteURL": "Überprüfen",
    "exampleText": "Beispiel",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Geben Sie einen gültigen Routen-Service an.",
    "rateLimitExceeded": "Datenübertragungsrate überschritten. Versuchen Sie es später erneut.",
    "errorInvokingService": "Falscher Benutzername oder falsches Kennwort."
  },
  "symbolPickerPreviewText": "Vorschau:",
  "showToolToSelectLabel": "Schaltfläche \"Position festlegen\"",
  "showToolToSelectHintText": "Hinweis: Stellt eine Schaltfläche zum Festlegen der Position auf der Karte bereit, statt die Position bei jedem Klicken auf die Karte festzulegen."
});