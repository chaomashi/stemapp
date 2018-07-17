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
  "_widgetLabel": "Kostenanalyse (Betaversion)",
  "unableToFetchInfoErrMessage": "Details zum Geometrieservice/konfigurierten Layer können nicht abgerufen werden.",
  "invalidCostingGeometryLayer": "'esriFieldTypeGlobalID' kann im Geometrie-Layer für Kostenberechnung nicht abgerufen werden.",
  "projectLayerNotFound": "Der konfigurierte Projekt-Layer kann in der Karte nicht gefunden werden.",
  "costingGeometryLayerNotFound": "Der Geometrie-Layer für Kostenberechnung kann in der Karte nicht gefunden werden.",
  "projectMultiplierTableNotFound": "Die Tabelle für zusätzliche Kosten des Projektmultiplikators kann in der Karte nicht gefunden werden.",
  "projectAssetTableNotFound": "Die konfigurierte Tabelle für Projekt-Assets kann in der Karte nicht gefunden werden.",
  "createLoadProject": {
    "createProjectPaneTitle": "Projekt erstellen",
    "loadProjectPaneTitle": "Projekt laden",
    "projectNamePlaceHolder": "Projektname",
    "projectDescPlaceHolder": "Projektbeschreibung",
    "selectProject": "Projekt auswählen",
    "viewInMapLabel": "In Karte anzeigen",
    "loadLabel": "Laden",
    "createLabel": "Erstellen",
    "deleteProjectConfirmationMsg": "Möchten Sie das Projekt wirklich löschen?",
    "noAssetsToViewOnMap": "Das ausgewählte Projekt verfügt über keine in der Karte anzuzeigenden Assets.",
    "projectDeletedMsg": "Das Projekt wurde erfolgreich gelöscht.",
    "errorInCreatingProject": "Fehler beim Erstellen des Projekts.",
    "errorProjectNotFound": "Projekt nicht gefunden.",
    "errorInLoadingProject": "Überprüfen Sie, ob ein gültiges Projekt ausgewählt wurde.",
    "errorProjectNotSelected": "Wählen Sie ein Projekt aus der Dropdown-Liste aus.",
    "errorDuplicateProjectName": "Der Projektname ist bereits vorhanden."
  },
  "statisticsSettings": {
    "tabTitle": "Statistikeinstellungen",
    "addStatisticsLabel": "Statistiken hinzufügen",
    "addNewStatisticsText": "Neue Statistiken hinzufügen",
    "deleteStatisticsText": "Statistiken löschen",
    "moveStatisticsUpText": "Statistiken nach oben verschieben",
    "moveStatisticsDownText": "Statistiken nach unten verschieben",
    "layerNameTitle": "Layer",
    "statisticsTypeTitle": "Typ",
    "fieldNameTitle": "Feld",
    "statisticsTitle": "Etikett",
    "actionLabelTitle": "Aktionen",
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
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Der/die Layer muss/müssen auf der Registerkarte für Layer-Einstellungen als editierbar aktiviert werden."
  },
  "workBench": {
    "refresh": "Aktualisieren",
    "noAssetAddedMsg": "Keine Assets hinzugefügt",
    "units": "Einheit(en)",
    "assetDetailsTitle": "Asset-Elementdetails",
    "costEquationTitle": "Kostengleichung",
    "newCostEquationTitle": "Neue Gleichung",
    "defaultCostEquationTitle": "Standardgleichung",
    "geographyTitle": "Geographie",
    "scenarioTitle": "Szenario",
    "costingInfoHintText": "<div>Hinweis: Verwenden Sie die folgenden Schlüsselwörter</div><ul><li><b>{TOTALCOUNT}</b>: Verwendet die Gesamtzahl der Assets desselben Typs in einer Geographie</li> <li><b>{MEASURE}</b>: Verwendet die Länge für Linien-Assets und die Fläche für Polygon-Assets</li><li><b>{TOTALMEASURE}</b>: Verwendet die Gesamtlänge für Linien-Assets und die Gesamtfläche für Polygon-Assets desselben Typs in einer Geographie</li></ul> Sie können beispielsweise die folgenden Funktionen verwenden:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Bearbeiten Sie die Kostengleichung je nach Projektanforderungen.",
    "zoomToAsset": "Auf Asset zoomen",
    "deleteAsset": "Asset löschen",
    "closeDialog": "Dialogfeld schließen",
    "objectIdColTitle": "Objekt-ID",
    "costColTitle": "Kosten",
    "errorInvalidCostEquation": "Ungültige Kostengleichung",
    "errorInSavingAssetDetails": "Die Asset-Details können nicht gespeichert werden."
  },
  "assetDetails": {
    "inGeography": " in ${geography} ",
    "withScenario": " mit ${scenario}",
    "totalCostTitle": "Gesamtkosten",
    "additionalCostLabel": "Beschreibung",
    "additionalCostValue": "Wert",
    "additionalCostNetValue": "Nettobetrag"
  },
  "projectOverview": {
    "assetItemsTitle": "Asset-Elemente",
    "assetStatisticsTitle": "Asset-Statistiken",
    "projectSummaryTitle": "Projektzusammenfassung",
    "projectName": "Projektname: ${name}",
    "totalCostLabel": "Gesamtkosten des Projekts (*):",
    "grossCostLabel": "Bruttokosten des Projekts (*):",
    "roundingLabel": "* Wird auf '${selectedRoundingOption}' gerundet",
    "unableToSaveProjectBoundary": "Die Projektgrenze im Projekt-Layer kann nicht gespeichert werden.",
    "unableToSaveProjectCost": "Die Kosten im Projekt-Layer können nicht gespeichert werden.",
    "roundCostValues": {
      "twoDecimalPoint": "Zwei Dezimaltrennzeichen",
      "nearestWholeNumber": "Nächste ganze Zahl",
      "nearestTen": "Nächste Zehnerstelle",
      "nearestHundred": "Nächste Hunderterstelle",
      "nearestThousand": "Nächste Tausenderstelle",
      "nearestTenThousands": "Nächste Zehntausenderstelle"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Projektattribut",
    "projectAttributeTitle": "Projektattribute bearbeiten"
  },
  "costEscalation": {
    "costEscalationLabel": "Zusätzliche Kosten hinzufügen",
    "valueHeader": "Wert",
    "addCostEscalationText": "Zusätzliche Kosten hinzufügen",
    "deleteCostEscalationText": "Ausgewählte zusätzliche Kosten löschen",
    "moveCostEscalationUpText": "Ausgewählte zusätzliche Kosten nach oben verschieben",
    "moveCostEscalationDownText": "Ausgewählte zusätzliche Kosten nach unten verschieben",
    "invalidEntry": "Mindestens ein Eintrag ist ungültig.",
    "errorInSavingCostEscalation": "Die Details zu den zusätzlichen Kosten können nicht gespeichert werden."
  },
  "scenarioSelection": {
    "popupTitle": "Szenario für das Asset auswählen",
    "regionLabel": "Geographie",
    "scenarioLabel": "Szenario",
    "noneText": "Kein(e)",
    "copyFeatureMsg": "Möchten Sie die ausgewählten Features kopieren?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Detailstatistiken",
    "noDetailStatisticAvailable": "Keine Asset-Statistiken hinzugefügt"
  }
});