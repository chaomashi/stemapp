/*
 | Copyright 2017 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define({
  "searchSourceSetting": {
    "title": "Such- und Puffereinstellungen",
    "mainHint": "Sie können die Textsuche von Adressen und Features, die Digitalisierung von Geometrie und die Pufferung aktivieren."
  },
  "addressSourceSetting": {
    "title": "Adressen-Layer",
    "mainHint": "Sie können festlegen, welche Layer für Adressaten-Etiketten verfügbar sind."
  },
  "notificationSetting": {
    "title": "Benachrichtigungsoptionen",
    "mainHint": "Sie können festlegen, welche Benachrichtigungstypen verfügbar sind."
  },
  "groupingLabels": {
    "addressSources": "Für die Auswahl von Adressaten-Layern zu verwendender Layer",
    "averyStickersDetails": "Avery(r)-Sticker",
    "csvDetails": "Datei (CSV) mit kommagetrennten Werten",
    "drawingTools": "Zeichenwerkzeuge zum Festlegen von Flächen",
    "featureLayerDetails": "Feature-Layer",
    "geocoderDetails": "Geocoder",
    "labelFormats": "Verfügbare Etikettenformate",
    "printingOptions": "Optionen für gedruckte Etikettenseiten",
    "searchSources": "Suchquelle",
    "stickerFormatDetails": "Parameter der Etikettenseite"
  },
  "hints": {
    "alignmentAids": "Der Etikettenseite hinzugefügte Markierungen zum Ausrichten der Seite auf Ihren Drucker",
    "csvNameList": "Eine durch Kommas getrennte Liste der Attributfeldnamen, bei denen die Groß- und Kleinschreibung beachtet wird",
    "horizontalGap": "Zwischenraum zwischen zwei Etiketten in einer Zeile",
    "insetToLabel": "Zwischenraum zwischen Etikettenseite und Textanfang",
    "labelFormatDescription": "Darstellung des Etiketten-Styles in der Liste der Formatoptionen des Widgets",
    "labelFormatDescriptionHint": "QuickInfo zur Ergänzung der Beschreibung in der Liste der Formatoptionen",
    "labelHeight": "Höhe der einzelnen Etiketten auf der Seite",
    "labelWidth": "Breite der einzelnen Etiketten auf der Seite",
    "localSearchRadius": "Ermöglicht die Festlegung des Radius einer Fläche um den aktuellen Kartenmittelpunkt, der dazu dient, die Rangfolge von Geokodierungskandidaten zu optimieren. Die Kandidaten, die der Position am nächsten liegen, werden auf diese Weise zuerst ausgegeben.",
    "rasterResolution": "100 Pixel pro Zoll entspricht in etwa der Bildschirmauflösung. Je höher die Auflösung ist, desto mehr Browser-Speicher wird benötigt. Browser unterscheiden sich in ihrer Fähigkeit, große Speicheranforderungen ordnungsgemäß zu verarbeiten.",
    "selectionListOfOptionsToDisplay": "Aktivierte Elemente werden im Widget als Optionen angezeigt. Ändern Sie die Reihenfolge wie gewünscht.",
    "verticalGap": "Zwischenraum zwischen zwei Etiketten in einer Spalte"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Standardpufferabstand",
    "bufferUnits": "Im Widget bereitzustellende Puffereinheiten",
    "countryRegionCodes": "Länder- oder Regionscodes",
    "description": "Beschreibung",
    "descriptionHint": "Hinweis zur Beschreibung",
    "displayField": "Feld anzeigen",
    "drawingToolsFreehandPolygon": "Freihand-Polygon",
    "drawingToolsLine": "Linie",
    "drawingToolsPoint": "Punkt",
    "drawingToolsPolygon": "Polygon",
    "drawingToolsPolyline": "Polylinie",
    "enableLocalSearch": "Lokale Suche aktivieren",
    "exactMatch": "Exakte Übereinstimmung",
    "fontSizeAlignmentNote": "Schriftgröße für Hinweis zu Druckrändern",
    "gridDarkness": "Dunkelheit des Rasters",
    "gridlineLeftInset": "Linke Raster-Linien-Einfügung",
    "gridlineMajorTickMarksGap": "Haupt-Tick-Marken alle",
    "gridlineMinorTickMarksGap": "Neben-Tick-Marken alle",
    "gridlineRightInset": "Rechte Raster-Linien-Einfügung",
    "labelBorderDarkness": "Dunkelheit der Etikettengrenze",
    "labelBottomEdge": "Untere Kante von Etiketten auf der Seite",
    "labelFontSize": "Schriftgröße",
    "labelHeight": "Etikettenhöhe",
    "labelHorizontalGap": "Horizontale Lücke",
    "labelInitialInset": "Einfügung in Etikettentext",
    "labelLeftEdge": "Linke Kante von Etiketten auf der Seite",
    "labelMaxLineCount": "Maximale Anzahl der Linien im Etikett",
    "labelPageHeight": "Seitenhöhe",
    "labelPageWidth": "Seitenbreite",
    "labelRightEdge": "Rechte Kante von Etiketten auf der Seite",
    "labelsInAColumn": "Anzahl der Etiketten in einer Spalte",
    "labelsInARow": "Anzahl der Etiketten in einer Zeile",
    "labelTopEdge": "Obere Kante von Etiketten auf der Seite",
    "labelVerticalGap": "Vertikale Lücke",
    "labelWidth": "Etikettenbreite",
    "limitSearchToMapExtent": "Nur in der aktuellen Kartenausdehnung suchen",
    "maximumResults": "Maximale Anzahl von Ergebnissen",
    "maximumSuggestions": "Maximale Anzahl von Vorschlägen",
    "minimumScale": "Minimaler Maßstab",
    "name": "Name",
    "percentBlack": "% schwarz",
    "pixels": "Pixel",
    "pixelsPerInch": "Pixel pro Zoll",
    "placeholderText": "Platzhaltertext",
    "placeholderTextForAllSources": "Platzhaltertext für die Suche in allen Quellen",
    "radius": "Radius",
    "rasterResolution": "Raster-Auflösung",
    "searchFields": "Suchfelder",
    "showAlignmentAids": "Ausrichtungshilfen auf der Seite anzeigen",
    "showGridTickMarks": "Tick-Marken von Rastern anzeigen",
    "showLabelOutlines": "Umrisslinien von Etiketten anzeigen",
    "showPopupForFoundItem": "Pop-up für das gefundene Feature oder die gefundene Position anzeigen",
    "tool": "Werkzeuge",
    "units": "Einheiten",
    "url": "URL",
    "urlToGeometryService": "URL zum Geometrieservice",
    "useRelatedRecords": "Zugehörige Datensätze verwenden",
    "useSecondarySearchLayer": "Sekundären Auswahl-Layer verwenden",
    "useSelectionDrawTools": "Auswahl-Zeichenwerkzeuge verwenden",
    "useVectorFonts": "Vektorschriftarten verwenden (nur westliche Schriftarten)",
    "zoomScale": "Zoom-Maßstab"
  },
  "buttons": {
    "addAddressSource": "Layer hinzufügen, dessen Pop-up Adressenetiketten enthält",
    "addLabelFormat": "Etikettenformat hinzufügen",
    "addSearchSource": "Suchquelle hinzufügen",
    "set": "Festlegen"
  },
  "placeholders": {
    "averyExample": "z. B. Avery(r)-Etikett ${averyPartNumber}",
    "countryRegionCodes": "z. B. USA,CHN",
    "descriptionCSV": "Durch Trennzeichen getrennte Werte",
    "descriptionPDF": "PDF-Etikett ${heightLabelIn} x ${widthLabelIn} Zoll; ${labelsPerPage} pro Seite"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Feature-Layer aus der Webkarte abrufen",
    "openCountryCodes": "Klicken Sie hier, um weitere Informationen zu Codes zu erhalten.",
    "openFieldSelector": "Klicken Sie hier, um eine Feldauswahl zu öffnen.",
    "setAndValidateURL": "URL festlegen und überprüfen"
  },
  "problems": {
    "noAddresseeLayers": "Legen Sie mindestens einen Adressaten-Layer fest.",
    "noBufferUnitsForDrawingTools": "Konfigurieren Sie mindestens eine Puffereinheit für die Zeichenwerkzeuge.",
    "noBufferUnitsForSearchSource": "Konfigurieren Sie mindestens eine Puffereinheit für die Suchquelle \"${sourceName}\".",
    "noGeometryServiceURL": "Konfigurieren Sie die URL zum Geometrieservice.",
    "noNotificationLabelFormats": "Legen Sie mindestens ein Format für Benachrichtigungsbeschriftungen fest.",
    "noSearchSourceFields": "Konfigurieren Sie mindestens ein Suchfeld für die Suchquelle \"${sourceName}\".",
    "noSearchSourceURL": "Konfigurieren Sie die URL für die Suchquelle \"${sourceName}\"."
  }
});