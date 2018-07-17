///////////////////////////////////////////////////////////////////////////
// Copyright © 2017 Esri. All Rights Reserved.
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
  "configText": "Konfigurationstext festlegen:",
  "generalSettings": {
    "tabTitle": "Allgemeine Einstellungen",
    "measurementUnitLabel": "Maßeinheit",
    "currencyLabel": "Maßsymbol",
    "roundCostLabel": "Kosten runden",
    "projectOutputSettings": "Einstellungen für die Projektausgabe",
    "typeOfProjectAreaLabel": "Projektbereichstyp",
    "bufferDistanceLabel": "Pufferabstand",
    "roundCostValues": {
      "twoDecimalPoint": "Zwei Dezimaltrennzeichen",
      "nearestWholeNumber": "Nächste ganze Zahl",
      "nearestTen": "Nächste Zehnerstelle",
      "nearestHundred": "Nächste Hunderterstelle",
      "nearestThousand": "Nächste Tausenderstelle",
      "nearestTenThousands": "Nächste Zehntausenderstelle"
    },
    "projectAreaType": {
      "outline": "Umrisslinie",
      "buffer": "Puffer"
    },
    "errorMessages": {
      "currency": "Ungültige Währungseinheit",
      "bufferDistance": "Ungültige Pufferentfernung",
      "outOfRangebufferDistance": "Der Wert muss größer als 0 und kleiner oder gleich 100 sein."
    }
  },
  "projectSettings": {
    "tabTitle": "Projekteinstellungen",
    "costingGeometrySectionTitle": "Geographie für Kostenberechnung definieren (optional)",
    "costingGeometrySectionNote": "Hinweis: Durch die Konfiguration dieses Layers kann der Benutzer Kostengleichungen von Feature-Vorlagen basierend auf Geographien festlegen.",
    "projectTableSectionTitle": "Die Möglichkeit, Projekteinstellungen zu speichern/laden (optional)",
    "projectTableSectionNote": "Hinweis: Durch die Konfiguration aller Tabellen und Layer kann der Benutzer Projekte zur späteren Verwendung speichern/laden.",
    "costingGeometryLayerLabel": "Geometrie-Layer für Kostenanalyse",
    "fieldLabelGeography": "Feld für Geographiebeschriftung",
    "projectAssetsTableLabel": "Tabelle für Projekt-Assets",
    "projectMultiplierTableLabel": "Tabelle für zusätzliche Kosten des Projektmultiplikators",
    "projectLayerLabel": "Projekt-Layer",
    "configureFieldsLabel": "Felder konfigurieren",
    "fieldDescriptionHeaderTitle": "Feldbeschreibung",
    "layerFieldsHeaderTitle": "Layer-Feld",
    "selectLabel": "Auswählen",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} ist bereits ausgewählt",
      "invalidConfiguration": "Wählen Sie ${fieldsString} aus."
    },
    "costingGeometryHelp": "<p>Es werden Polygon-Layer mit folgenden Bedingungen angezeigt: <br/> <li>\tDer Layer muss über â€œAbfrageâ€-Funktion verfügen</li><li>\tDer Layer muss ein GlobalID-Feld aufweisen</li></p>",
    "fieldToLabelGeographyHelp": "<p>Zeichenfolgen- und numerische Felder des ausgewählten â€œGeometrie-Layers für Kostenberechnung€werden in der Dropdown-Liste â€œFeld für Geographiebeschriftungâ€ angezeigt.</p>",
    "projectAssetsTableHelp": "<p>Es werden Tabellen mit den folgenden Bedingungen angezeigt: <br/> <li>Die Tabelle muss über Bearbeitungsfunktionen, d. h. â€œErstellenâ€, â€œLöschenâ€ und â€œAktualisierenâ€, verfügen</li>    <li>Die Tabelle muss sechs Felder aufweisen, deren Name und Datentyp genau übereinstimmen:</li><ul><li>\tAssetGUID (Feld vom Typ \"GUID\")</li><li>\tCostEquation (Feld vom Typ \"Zeichenfolge\")</li><li>\tSzenario (Feld vom Typ \"Zeichenfolge\")</li><li>\tTemplateName (Feld vom Typ \"Zeichenfolge\")</li><li>    GeographyGUID (Feld vom Typ \"GUID\")</li><li>\tProjectGUID (Feld vom Typ \"GUID\")</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Es werden Tabellen mit den folgenden Bedingungen angezeigt: <br/> <li>Die Tabelle muss über Bearbeitungsfunktionen, d. h. â€œErstellenâ€, â€œLöschenâ€ und â€œAktualisierenâ€, verfügen</li>    <li>Die Tabelle muss fünf Felder aufweisen, deren Name und Datentyp genau übereinstimmen:</li><ul><li>\tBeschreibung (Feld vom Typ \"Zeichenfolge\")</li><li>\tTyp (Feld vom Typ \"Zeichenfolge\")</li><li>\tWert (Feld vom Typ \"Float\" oder \"Double\")</li><li>\tKostenindex (Feld vom Typ \"Integer\")</li><li>   \tProjectGUID (Feld vom Typ \"GUID\"))</li></ul> </p>",
    "projectLayerHelp": "<p>Es werden Polygon-Layer mit den folgenden Bedingungen angezeigt: <br/> <li>Der Layer muss über Bearbeitungsfunktionen, d. h. â€œErstellenâ€, â€œLöschenâ€ und â€œAktualisieren€, verfügen</li>    <li>Der Layer muss fünf Felder aufweisen, deren Name und Datentyp genau übereinstimmen:</li><ul><li>ProjectName (Feld vom Typ \"Zeichenfolge\")</li><li>Beschreibung (Feld vom Typ \"Zeichenfolge\")</li><li>Totalassetcost (Feld vom Typ \"Float\" oder \"Double\")</li><li>Grossprojectcost (Feld vom Typ \"Float\" oder \"Double\")</li><li>GlobalID (Feld vom Typ \"GlobalID\")</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Layer-Einstellungen",
    "layerNameHeaderTitle": "Layer-Name",
    "layerNameHeaderTooltip": "Layer-Liste in der Karte",
    "EditableLayerHeaderTitle": "Editierbar",
    "EditableLayerHeaderTooltip": "Layer und zugehörige Vorlagen in das Widget \"Kostenanalyse\" einbeziehen",
    "SelectableLayerHeaderTitle": "Auswählbar",
    "SelectableLayerHeaderTooltip": "Anhand der Geometrie des Features kann ein neues Kostenelement erstellt werden.",
    "fieldPickerHeaderTitle": "Projekt-ID (optional)",
    "fieldPickerHeaderTooltip": "Optionales Feld (vom Typ \"Zeichenfolge\") zum Speichern der Projekt-ID in",
    "selectLabel": "Auswählen",
    "noAssetLayersAvailable": "In der ausgewählten Webkarte wurde kein Asset-Layer gefunden.",
    "disableEditableCheckboxTooltip": "Dieser Layer weist keine Bearbeitungsfunktionen auf.",
    "missingCapabilitiesMsg": "In diesem Layer fehlen die folgenden Funktionen:",
    "missingGlobalIdMsg": "Dieser Layer verfügt über kein GlobalId-Feld.",
    "create": "Erstellen",
    "update": "Aktualisieren",
    "delete": "Löschen"
  },
  "costingInfo": {
    "tabTitle": "Informationen zur Kostenberechnung",
    "proposedMainsLabel": "Vorgeschlagene Startseiten",
    "addCostingTemplateLabel": "Kostenberechnungsvorlage hinzufügen",
    "manageScenariosTitle": "Szenarien verwalten",
    "featureTemplateTitle": "Feature-Vorlage",
    "costEquationTitle": "Kostengleichung",
    "geographyTitle": "Geographie",
    "scenarioTitle": "Szenario",
    "actionTitle": "Aktionen",
    "scenarioNameLabel": "Szenarioname",
    "addBtnLabel": "Hinzufügen",
    "srNoLabel": "Anzahl",
    "deleteLabel": "Löschen",
    "duplicateScenarioName": "Doppelter Szenarioname",
    "hintText": "<div>Hinweis: Verwenden Sie die folgenden Schlüsselwörter</div><ul><li><b>{TOTALCOUNT}</b>: Verwendet die Gesamtzahl der Assets desselben Typs in einer Geographie</li><li><b>{MEASURE}</b>: Verwendet die Länge für Linien-Assets und die Fläche für Polygon-Assets</li><li><b>{TOTALMEASURE}</b>: Verwendet die Gesamtlänge für Linien-Assets und die Gesamtfläche für Polygon-Assets desselben Typs in einer Geographie</li></ul>Sie können beispielsweise die folgenden Funktionen verwenden:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Bearbeiten Sie die Kostengleichung je nach Projektanforderung.",
    "noneValue": "Kein(e)",
    "requiredCostEquation": "Ungültige Kostengleichung für ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Doppelter Vorlageneintrag für ${layerName} : ${templateName} vorhanden",
    "defaultEquationRequired": "Standardgleichung ist für ${layerName} : ${templateName} erforderlich",
    "validCostEquationMessage": "Geben Sie eine gültige Kostengleichung ein.",
    "costEquationHelpText": "Bearbeiten Sie die Kostengleichung je nach Projektanforderung.",
    "scenarioHelpText": "Wählen Sie das Szenario je nach Projektanforderung aus.",
    "copyRowTitle": "Zeile kopieren",
    "noTemplateAvailable": "Fügen Sie mindestens eine Vorlage für ${layerName} hinzu.",
    "manageScenarioLabel": "Szenario verwalten",
    "noLayerMessage": "Geben Sie mindestens einen Layer in ${tabName} ein.",
    "noEditableLayersAvailable": "Der/die Layer muss/müssen auf der Registerkarte für Layer-Einstellungen als editierbar aktiviert werden."
  },
  "statisticsSettings": {
    "tabTitle": "Statistikeinstellungen",
    "addStatisticsLabel": "Statistiken hinzufügen",
    "fieldNameTitle": "Feld",
    "statisticsTitle": "Etikett",
    "addNewStatisticsText": "Neue Statistiken hinzufügen",
    "deleteStatisticsText": "Statistiken löschen",
    "moveStatisticsUpText": "Statistiken nach oben verschieben",
    "moveStatisticsDownText": "Statistiken nach unten verschieben",
    "selectDeselectAllTitle": "Alles auswählen"
  },
  "statisticsType": {
    "countLabel": "Anzahl",
    "averageLabel": "Durchschnitt",
    "maxLabel": "Maximum",
    "minLabel": "Minimum",
    "summationLabel": "Summe",
    "areaLabel": "Fläche",
    "lengthLabel": "Länge"
  }
});