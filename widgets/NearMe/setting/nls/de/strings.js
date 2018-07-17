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
      "displayText": "Meilen",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Kilometer",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Fuß",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "Meter",
      "acronym": "m"
    }
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
    "invalidUrlTip": "Die URL ${URL} ist ungültig oder es kann nicht darauf zugegriffen werden."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Sucheinstellungen",
    "defaultBufferDistanceLabel": "Standardpufferabstand festlegen",
    "maxResultCountLabel": "Anzahl der Ergebnisse beschränken",
    "maxResultCountHintLabel": "Hinweis: Legen Sie die maximale Anzahl der angezeigten Ergebnisse fest. Mit dem Wert 1 wird das nächstgelegene Feature zurückgegeben.",
    "maxBufferDistanceLabel": "Maximalen Pufferabstand festlegen",
    "bufferDistanceUnitLabel": "Pufferabstandseinheiten",
    "defaultBufferHintLabel": "Hinweis: Standardwert für den Pufferschieberegler festlegen",
    "maxBufferHintLabel": "Hinweis: Maximalwert für den Pufferschieberegler festlegen",
    "bufferUnitLabel": "Hinweis: Definiert die Einheit für die Erstellung des Puffers",
    "selectGraphicLocationSymbol": "Symbol für Adresse oder Position",
    "graphicLocationSymbolHintText": "Hinweis: Symbol für gesuchte Adresse oder aktivierte Position",
    "addressLocationPolygonHintText": "Hinweis: Symbol für gesuchten Polygon-Layer",
    "popupTitleForPolygon": "Polygon für ausgewählte Adressposition auswählen",
    "popupTitleForPolyline": "Linie für ausgewählte Adressposition auswählen",
    "addressLocationPolylineHintText": "Hinweis: Symbol für durchsuchten Polylinien-Layer",
    "fontColorLabel": "Schriftfarbe für Suchergebnisse auswählen",
    "fontColorHintText": "Hinweis: Schriftfarbe für Suchergebnisse",
    "zoomToSelectedFeature": "Auf das ausgewählte Feature zoomen",
    "zoomToSelectedFeatureHintText": "Hinweis: Es wird auf das ausgewählte Feature statt auf den Puffer gezoomt.",
    "intersectSearchLocation": "Sich schneidende(s) Polygon(e) zurückgeben",
    "intersectSearchLocationHintText": "Hinweis: Es werden  Polygone zurückgegeben, die die gesuchte Position enthalten, anstatt Polygone innerhalb des Puffers.",
    "enableProximitySearch": "Umkreissuche aktivieren",
    "enableProximitySearchHintText": "Hinweis: Ermöglichen Sie die Suche nach Positionen in der Nähe eines ausgewählten Ergebnisses.",
    "bufferVisibilityLabel": "Puffersichtbarkeit festlegen",
    "bufferVisibilityHintText": "Hinweis: Der Puffer wird auf der Karte angezeigt.",
    "bufferColorLabel": "Puffersymbol festlegen",
    "bufferColorHintText": "Hinweis: Wählen Sie die Farbe und die Transparenz des Puffers aus.",
    "searchLayerResultLabel": "Nur ausgewählte Layer-Ergebnisse darstellen",
    "searchLayerResultHint": "Hinweis: Nur der ausgewählte Layer in den Suchergebnissen wird auf der Karte dargestellt.",
    "showToolToSelectLabel": "Schaltfläche \"Position festlegen\"",
    "showToolToSelectHintText": "Hinweis: Stellt eine Schaltfläche zum Festlegen der Position auf der Karte bereit, statt die Position bei jedem Klicken auf die Karte festzulegen.",
    "geoDesicParamLabel": "Geodätischen Puffer verwenden",
    "geoDesicParamHintText": "Hinweis: Verwenden Sie den geodätischen Puffer statt des euklidischen Puffers (planar)."
  },
  "layerSelector": {
    "selectLayerLabel": "Such-Layer festlegen",
    "layerSelectionHint": "Hinweis: Verwenden Sie die Schaltfläche \"Festlegen\", um Layer auszuwählen.",
    "addLayerButton": "Festlegen"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Wegbeschreibungseinstellungen",
    "routeServiceUrl": "Routing-Service",
    "buttonSet": "Festlegen",
    "routeServiceUrlHintText": "Hinweis: Klicken Sie auf \"Festlegen\", um einen Routing-Service zu durchsuchen und auszuwählen.",
    "directionLengthUnit": "Längeneinheiten für Wegbeschreibung",
    "unitsForRouteHintText": "Hinweis: Wird zum Anzeigen von Einheiten für die Route verwendet",
    "selectRouteSymbol": "Symbol zum Anzeigen der Route auswählen",
    "routeSymbolHintText": "Hinweis: Wird zum Anzeigen des Liniensymbols der Route verwendet",
    "routingDisabledMsg": "Um Wegbeschreibungen zu aktivieren, müssen Sie sicherstellen, dass Routen in den Anwendungseinstellungen für das Element aktiviert sind."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Symbolisierungseinstellungen",
    "addSymbologyBtnLabel": "Neue Symbole hinzufügen",
    "layerNameTitle": "Layer-Name",
    "fieldTitle": "Feld",
    "valuesTitle": "Werte",
    "symbolTitle": "Symbol",
    "actionsTitle": "Aktionen",
    "invalidConfigMsg": "Doppeltes Feld: ${fieldName} für Layer: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Filtereinstellungen",
    "addTaskTip": "Fügen Sie dem/den ausgewählten Such-Layer(n) mindestens einen Filter hinzu, und konfigurieren Sie Parameter für jeden von ihnen.",
    "enableMapFilter": "Voreingestellten Layer-Filter aus der Karte entfernen",
    "newFilter": "Neuer Filter",
    "filterExpression": "Filterausdruck",
    "layerDefaultSymbolTip": "Standardsymbol des Layers verwenden",
    "uploadImage": "Ein Bild hochladen",
    "selectLayerTip": "Wählen Sie einen Layer aus.",
    "setTitleTip": "Legen Sie einen Titel fest.",
    "noTasksTip": "Keine Filter konfiguriert. Klicken Sie auf \"${newFilter}\", um einen neuen Filter hinzuzufügen.",
    "collapseFiltersTip": "Filterausdrücke (falls vorhanden) ausblenden, wenn das Widget geöffnet wird",
    "groupFiltersTip": "Filter nach Layer gruppieren"
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
  "errorStrings": {
    "bufferErrorString": "Geben Sie einen gültigen numerischen Wert ein.",
    "selectLayerErrorString": "Wählen Sie den/die zu durchsuchenden Layer aus.",
    "invalidDefaultValue": "Der Standardpufferabstand darf nicht leer sein. Geben Sie den Pufferabstand an.",
    "invalidMaximumValue": "Der maximale Pufferabstand darf nicht leer sein. Geben Sie den Pufferabstand an.",
    "defaultValueLessThanMax": "Geben Sie den Standardpufferabstand innerhalb der maximalen Grenzwerte an.",
    "defaultBufferValueGreaterThanOne": "Standardpufferabstand kann nicht weniger als 0 sein.",
    "maximumBufferValueGreaterThanOne": "Geben Sie für den maximalen Pufferabstand einen Wert größer als 0 an.",
    "invalidMaximumResultCountValue": "Geben Sie einen gültigen Wert für maximale Ergebnisanzahl an.",
    "invalidSearchSources": "Ungültige Suchquelleneinstellungen"
  },
  "symbolPickerPreviewText": "Vorschau:"
});