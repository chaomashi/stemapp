define({
  "layersPage": {
    "allLayers": "Alle Layer",
    "title": "Vorlage zur Feature-Erstellung auswählen",
    "generalSettings": "Allgemeine Einstellungen",
    "layerSettings": "Layer-Einstellungen",
    "presetValueText": "Voreingestellte Werte definieren",
    "geocoderSettingsText": "Geocoder-Einstellungen",
    "editDescription": "Anzeigetext für den Bearbeitungsbereich bereitstellen",
    "editDescriptionTip": "Dieser Text wird über der Vorlagenauswahl angezeigt; lassen Sie ihn leer.",
    "promptOnSave": "Zum Speichern nicht gespeicherter Änderungen auffordern, wenn das Formular geschlossen oder zum nächsten Datensatz gewechselt wird",
    "promptOnSaveTip": "Es wird eine Eingabeaufforderung angezeigt, wenn der Benutzer auf \"Schließen\" klickt oder zum nächsten editierbaren Datensatz navigiert, wenn das aktuelle Feature nicht gespeicherte Änderungen enthält.",
    "promptOnDelete": "Beim Löschen eines Datensatzes eine Bestätigung anfordern",
    "promptOnDeleteTip": "Wenn der Benutzer auf \"Löschen\" klickt, wird eine Eingabeaufforderung angezeigt, um die Aktion zu bestätigen.",
    "removeOnSave": "Das Feature beim Speichern aus der Auswahl entfernen",
    "removeOnSaveTip": "Option zum Entfernen des Features aus dem Auswahlsatz, wenn der Datensatz gespeichert wird.  Wenn dies der einzige ausgewählte Datensatz ist, wechselt der Bereich zurück zur Vorlagenseite.",
    "useFilterEditor": "Feature-Vorlagenfilter verwenden",
    "useFilterEditorTip": "Option zum Verwenden der Filtervorlagenauswahl, die es ermöglicht, die Vorlage eines Layers anzuzeigen oder Vorlagen nach Name zu suchen.",
    "displayShapeSelector": "Darstellungsoptionen anzeigen",
    "displayShapeSelectorTip": "Option zum Anzeigen einer Liste von Darstellungsoptionen für die ausgewählte Vorlage.",
    "displayPresetTop": "Liste der voreingestellten Werte im Vordergrund anzeigen",
    "displayPresetTopTip": "Option zum Anzeigen der Liste der voreingestellten Werte über der Vorlagenauswahl.",
    "listenToGroupFilter": "Filterwerte aus dem Widget \"Gruppenfilter\" auf voreingestellte Felder anwenden",
    "listenToGroupFilterTip": "Wenn ein Filter im Widget \"Gruppenfilter\" angewendet wird, wird der Wert auf ein übereinstimmendes Feld in der Liste der voreingestellten Werte angewendet.",
    "keepTemplateActive": "Ausgewählte Vorlage aktiviert lassen",
    "keepTemplateActiveTip": "Wenn die Vorlagenauswahl angezeigt wird, wird die zuvor ausgewählte Vorlage erneut ausgewählt.",
    "geometryEditDefault": "Geometriebearbeitung standardmäßig aktivieren",
    "autoSaveEdits": "Änderung automatisch speichern",
    "enableAttributeUpdates": "Schaltfläche zum Aktualisieren von Attributaktionen bei aktiver Geometriebearbeitung anzeigen",
    "layerSettingsTable": {
      "allowDelete": "Löschen zulassen",
      "allowDeleteTip": "Option, die Benutzern das Löschen eines Features ermöglicht; sie ist deaktiviert, wenn der Layer die Löschfunktion nicht unterstützt.",
      "edit": "Editierbar",
      "editTip": "Option zum Einbeziehen des Layers in das Widget",
      "label": "Layer",
      "labelTip": "Name des Layers gemäß der Definition in der Karte",
      "update": "Geometriebearbeitung deaktivieren",
      "updateTip": "Option zum Deaktivieren der Bearbeitung der Geometrie, nachdem sie platziert wurde, bzw. für ein vorhandenes Feature",
      "allowUpdateOnly": "Nur Update",
      "allowUpdateOnlyTip": "Option, um lediglich die Änderung der vorhandenen Features zuzulassen. Sie ist standardmäßig aktiviert, wird jedoch deaktiviert, wenn der Layer die Erstellung neuer Features nicht zulässt",
      "fieldsTip": "Die zu bearbeitenden Felder ändern und intelligente Attribute definieren",
      "actionsTip": "Option zum Bearbeiten von Feldern oder Zugreifen auf zugehörige Layer/Tabellen",
      "description": "Beschreibung",
      "descriptionTip": "Option zum Eingeben von Text, der im oberen Bereich der Attributseite angezeigt werden soll",
      "relationTip": "Zugehörige Layer und Tabellen anzeigen"
    },
    "editFieldError": "Feldänderungen und intelligente Attribute sind für nicht editierbare Layer nicht verfügbar.",
    "noConfigedLayersError": "Smart Editor erfordert mindestens einen editierbaren Layer"
  },
  "editDescriptionPage": {
    "title": "Übersichtstext für <b>${layername}</b> definieren "
  },
  "fieldsPage": {
    "title": "Felder für <b>${layername}</b> konfigurieren",
    "copyActionTip": "Attributaktionen",
    "description": "Verwenden Sie die Schaltfläche \"Bearbeiten\" für \"Aktionen\", um intelligente Attribute für einen Layer zu aktivieren. Mit intelligenten Attributen können Felder basierend auf den Werten anderer Felder ausgeblendet, angefordert oder deaktiviert werden. Verwenden Sie die Schaltfläche \"Kopieren\" für \"Aktionen\", um die Feldwertquelle nach Kreuzung, Adresse, Koordinaten und Voreinstellung zu aktivieren und zu definieren.",
    "fieldsNotes": "* Erforderliches Feld. Wenn \"Anzeigen\" für dieses Feld deaktiviert wird und die Bearbeitungsvorlage diesen Feldwert nicht füllt, können Sie keinen neuen Datensatz speichern.",
    "smartAttachmentText": "Die Aktion \"Intelligente Anlagen\" konfigurieren",
    "smartAttachmentPopupTitle": "Intelligente Anlagen für <b>${layername}</b> konfigurieren",
    "fieldsSettingsTable": {
      "display": "Anzeigen",
      "displayTip": "Festlegen, ob das Feld unsichtbar sein soll",
      "edit": "Editierbar",
      "editTip": "Aktivieren, wenn das Feld im Attributformular vorhanden sein soll",
      "fieldName": "Name",
      "fieldNameTip": "Name des in der Datenbank definierten Feldes",
      "fieldAlias": "Alias",
      "fieldAliasTip": "Name des in der Karte definierten Feldes",
      "canPresetValue": "Voreinstellung",
      "canPresetValueTip": "Option, mit der das Feld in der Liste der voreingestellten Felder angezeigt wird und die es dem Benutzer ermöglicht, den Wert vor der Bearbeitung festzulegen",
      "actions": "Aktionen",
      "actionsTip": "Die Reihenfolge der Felder ändern oder intelligente Attribute einrichten"
    },
    "smartAttSupport": "Intelligente Attribute werden für erforderliche Datenbankfelder nicht unterstützt."
  },
  "actionPage": {
    "title": "Attributaktionen für <b>${fieldname}</b> konfigurieren",
    "description": "Die Aktionen sind immer deaktiviert, es sei denn, Sie legen die Kriterien für deren Auslösung fest.  Die Aktionen werden der Reihenfolge nach verarbeitet und pro Feld wird nur eine Aktion ausgelöst.  Verwenden Sie zum Festlegen der Kriterien die Schaltfläche \"Kriterien bearbeiten\".",
    "actionsSettingsTable": {
      "rule": "Aktion",
      "ruleTip": "Aktion, die bei Erfüllung der Kriterien durchgeführt wird",
      "expression": "Ausdruck",
      "expressionTip": "Der resultierende Ausdruck im SQL-Format aus den definierten Kriterien",
      "actions": "Kriterien",
      "actionsTip": "Die Reihenfolge der Regel ändern und die Kriterien für deren Auslösung definieren"
    },
    "copyAction": {
      "description": "Feldwertquellen werden je nach Aktivierung der Reihenfolge nach verarbeitet, bis ein gültiges Kriterium ausgelöst wird oder die Liste abgeschlossen ist. Verwenden Sie zum Festlegen der Kriterien die Schaltfläche \"Kriterien bearbeiten\".",
      "intersection": "Kreuzung",
      "coordinates": "Koordinaten",
      "address": "Adresse",
      "preset": "Voreinstellung",
      "actionText": "Aktionen",
      "criteriaText": "Kriterien",
      "enableText": "Aktiviert"
    },
    "actions": {
      "hide": "Ausblenden",
      "required": "Erforderlich",
      "disabled": "Deaktiviert"
    }
  },
  "filterPage": {
    "submitHidden": "Attributdaten für dieses Feld auch dann senden, wenn es ausgeblendet ist?",
    "title": "Ausdruck für die ${action}-Regel konfigurieren",
    "filterBuilder": "Aktion für das Feld festlegen, wenn der Datensatz mit ${any_or_all} der folgenden Ausdrücke übereinstimmt",
    "noFilterTip": "Definieren Sie mit den folgenden Werkzeugen die Anweisung für den Zeitraum, in dem die Aktion aktiv ist."
  },
  "geocoderPage": {
    "setGeocoderURL": "Geocoder-URL festlegen",
    "hintMsg": "Hinweis: Sie ändern den Geokodierungsservice. Stellen Sie sicher, dass alle von Ihnen konfigurierten Geocoder-Feldzuordnungen aktualisiert sind.",
    "invalidUrlTip": "Die URL ${URL} ist ungültig oder es kann nicht darauf zugegriffen werden."
  },
  "addressPage": {
    "popupTitle": "Adresse",
    "checkboxLabel": "Wert aus Geocoder abrufen",
    "selectFieldTitle": "Attribut:",
    "geocoderHint": "Wechseln Sie zum Ändern des Geocoders unter 'Allgemeine Einstellungen' zur Schaltfläche 'Geocoder-Einstellungen'."
  },
  "coordinatesPage": {
    "popupTitle": "Koordinaten",
    "checkboxLabel": "Koordinaten abrufen",
    "coordinatesSelectTitle": "Koordinatensystem:",
    "coordinatesAttributeTitle": "Attribut:",
    "mapSpatialReference": "Raumbezug der Karte",
    "latlong": "Breitengrad/Längengrad"
  },
  "presetPage": {
    "popupTitle": "Voreinstellung",
    "checkboxLabel": "Feld wird voreingestellt",
    "presetValueLabel": "Der aktuell voreingestellte Wert ist:",
    "changePresetValueHint": "Wechseln Sie zum Ändern dieses voreingestellten Wertes unter 'Allgemeine Einstellungen' zur Schaltfläche 'Voreingestellte Werte definieren'."
  },
  "intersectionPage": {
    "checkboxLabel": "Wert aus dem Feld \"Kreuzung\" des Layers abrufen",
    "layerText": "Layer",
    "fieldText": "Felder",
    "actionsText": "Aktionen",
    "addLayerLinkText": "Einen Layer hinzufügen"
  },
  "presetAll": {
    "popupTitle": "Die standardmäßig voreingestellten Werte definieren",
    "deleteTitle": "Voreingestellten Wert löschen",
    "hintMsg": "Hier sind alle eindeutigen Namen voreingestellter Felder aufgeführt. Wenn ein voreingestelltes Feld entfernt wird, wird das entsprechende Feld als Voreinstellung in allen Layern/Tabellen deaktiviert."
  }
});