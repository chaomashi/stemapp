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
  "_widgetLabel": "Cost Analysis Beta",
  "unableToFetchInfoErrMessage": "Impossibile recuperare i dettagli servizio di geometria/layer configurato",
  "invalidCostingGeometryLayer": "Impossibile ottenere 'esriFieldTypeGlobalID' nel costing geometry layer.",
  "projectLayerNotFound": "Impossibile trovare il layer di progetto configurato nella mappa.",
  "costingGeometryLayerNotFound": "Impossibile trovare nella mappa. il costing geometry layer.",
  "projectMultiplierTableNotFound": "Impossibile trovare configurata nella mappa la tabella project multiplier additional cost",
  "projectAssetTableNotFound": "Impossibile trovare la tabella di risorse di progetto configurata nella mappa.",
  "createLoadProject": {
    "createProjectPaneTitle": "Crea progetto",
    "loadProjectPaneTitle": "Carica progetto",
    "projectNamePlaceHolder": "Nome progetto",
    "projectDescPlaceHolder": "Descrizione progetto",
    "selectProject": "Seleziona progetto",
    "viewInMapLabel": "Visualizza nella mappa",
    "loadLabel": "Carica",
    "createLabel": "Crea",
    "deleteProjectConfirmationMsg": "Eliminare il progetto?",
    "noAssetsToViewOnMap": "Il progetto selezionato non ha risorse da visualizzare sulla mappa.",
    "projectDeletedMsg": "Progetto correttamente eliminato.",
    "errorInCreatingProject": "Errore nella creazione del progetto.",
    "errorProjectNotFound": "Progetto non trovato.",
    "errorInLoadingProject": "Spuntare se è stato selezionato il progetto valido.",
    "errorProjectNotSelected": "Selezionare un progetto dall’elenco a discesa",
    "errorDuplicateProjectName": "Nome progetto già esistente."
  },
  "statisticsSettings": {
    "tabTitle": "Impostazioni statistiche",
    "addStatisticsLabel": "Aggiungi statistiche",
    "addNewStatisticsText": "Aggiungi nuove statistiche",
    "deleteStatisticsText": "Elimina statistiche",
    "moveStatisticsUpText": "Sposta statistiche in alto",
    "moveStatisticsDownText": "Sposta statistiche in basso",
    "layerNameTitle": "Layer",
    "statisticsTypeTitle": "Tipo",
    "fieldNameTitle": "Campo",
    "statisticsTitle": "Etichetta",
    "actionLabelTitle": "Azioni",
    "selectDeselectAllTitle": "Seleziona tutto"
  },
  "statisticsType": {
    "countLabel": "Conteggio",
    "averageLabel": "Media",
    "maxLabel": "Massimo",
    "minLabel": "Minimo",
    "summationLabel": "Somma",
    "areaLabel": "Area",
    "lengthLabel": "Lunghezza"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "I layer devono essere selezionati come editabili nella scheda delle impostazioni del layer"
  },
  "workBench": {
    "refresh": "Aggiorna",
    "noAssetAddedMsg": "Nessun elemento aggiunto",
    "units": "unit(s)",
    "assetDetailsTitle": "Dettagli dell'elemento",
    "costEquationTitle": "Equazione di costi",
    "newCostEquationTitle": "Nuova equazione",
    "defaultCostEquationTitle": "Equazione predefinita",
    "geographyTitle": "Geografia",
    "scenarioTitle": "Scenario",
    "costingInfoHintText": "<div>Suggerimento: utilizzare le seguenti parole chiave</div><ul><li><b>{TOTALCOUNT}</b>: utilizza il numero totale di elementi dello stesso tipo in una geografia</li> <li><b>{MEASURE}</b>: utilizza la lunghezza per gli elementi lineri e l’area per llgli elementi poligonali</li><li><b>{TOTALMEASURE}</b>: utilizza la lunghezza totale per gli elelenti lineari e l’area totale pergli elementi poligonali dello stesso tipo nella geografia</li></ul> È possibile utilizzare le funzioni come:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Modificare l'equazione di costi in base alle necessità di progetto.",
    "zoomToAsset": "Zoom sulla risorsa",
    "deleteAsset": "Elimina risorsa",
    "closeDialog": "Chiudi la finestra di dialogo",
    "objectIdColTitle": "ID oggetto",
    "costColTitle": "Costo",
    "errorInvalidCostEquation": "Equazione costi non valida.",
    "errorInSavingAssetDetails": "Impossibile salvare i dettagli risorsa."
  },
  "assetDetails": {
    "inGeography": " in ${geography} ",
    "withScenario": " con ${scenario}",
    "totalCostTitle": "Costo totale",
    "additionalCostLabel": "Descrizione",
    "additionalCostValue": "Valore",
    "additionalCostNetValue": "Valore netto"
  },
  "projectOverview": {
    "assetItemsTitle": "Asset Items",
    "assetStatisticsTitle": "Asset Statistics",
    "projectSummaryTitle": "Project Summary",
    "projectName": "Nome del Progetto: ${name}",
    "totalCostLabel": "Total Project Cost (*):",
    "grossCostLabel": "Gross Project Cost (*):",
    "roundingLabel": "* Rounding to '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Impossibile salvare il project boundary in un layer.",
    "unableToSaveProjectCost": "Impossibile salvare i costi in un layer di progetto.",
    "roundCostValues": {
      "twoDecimalPoint": "Due punti decimali",
      "nearestWholeNumber": "Numero intero più prossimo",
      "nearestTen": "Decimo più prossimo",
      "nearestHundred": "Centinaio più prossimo",
      "nearestThousand": "Migliaio più prossimo",
      "nearestTenThousands": "Decina di migliaia più prossime"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Project Attribute",
    "projectAttributeTitle": "Modifica gli attributi progetto"
  },
  "costEscalation": {
    "costEscalationLabel": "Aggiungi Additional Cost",
    "valueHeader": "Valore",
    "addCostEscalationText": "Aggiungi Additional Cost",
    "deleteCostEscalationText": "Elimina l'additional Cost selezionato",
    "moveCostEscalationUpText": "Sposta additional Cost selezionato in alto",
    "moveCostEscalationDownText": "Sposta additional Cost selezionato in basso",
    "invalidEntry": "Una o più voci non sono valide.",
    "errorInSavingCostEscalation": "Impossibile salvare dettagli di costo aggiuntivi."
  },
  "scenarioSelection": {
    "popupTitle": "Selezionare Scenario per la risorsa",
    "regionLabel": "Geografia",
    "scenarioLabel": "Scenario",
    "noneText": "None",
    "copyFeatureMsg": "Copiare le feature selezionate?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Statistiche dettagliate",
    "noDetailStatisticAvailable": "Nessun elemento della statistica aggiunto"
  }
});