define({
  "configText": "Definire i gruppi di filtro sottostanti",
  "labels": {
    "groupName": "Nome set di filtri:",
    "groupNameTip": "Nome del filtro che verrà selezionato dall'utente.",
    "groupDesc": "Descrizione:",
    "groupDescTip": "Descrizione del set di filtri.",
    "groupOperator": "Operatore preimpostato:",
    "groupOperatorTip": "Opzione per predefinire l'operatore del filtro. Se nessun operatore preselezionato è impostato, il filtro utilizzerà l'operatore di uguaglianza.",
    "groupDefault": "Valore preimpostato:",
    "groupDefaultTip": "Opzione per scegliere un valore da un layer esistente.",
    "sameLayerAppend": "Quando un layer è elencato più di una volta:",
    "sameLayerConjunc": "Aggiungi utilizzando:",
    "caseSearch": "Eseguire una ricerca con distinzione maiuscole/minuscole: "
  },
  "buttons": {
    "addNewGroup": "Aggiungi un nuovo gruppo",
    "addNewGroupTip": "Aggiungi nuovo set di filtri",
    "addLayer": "Aggiungi layer",
    "addLayerTip": "Aggiungere un layer al set di filtri."
  },
  "inputs": {
    "groupName": "Assegna un nome al gruppo",
    "groupDesc": "Descrizione del gruppo",
    "groupDefault": "Immettere un valore predefinito",
    "sameLayerAny": "Corrispondenza con qualsiasi espressione",
    "sameLayerAll": "Corrispondenza con tutte le espressioni",
    "simpleMode": "Avvia in visualizzazione semplice",
    "simpleModeTip": "Opzione per semplificare l'interfaccia widget configurata. Se selezionata, l'elenco a discesa operatore e i pulsanti Aggiungi criterio vengono rimossi dall'interfaccia.",
    "webmapAppendModeAny": "Aggiungi una qualsiasi espressione al filtro della mappa esistente",
    "webmapAppendModeAll": "Aggiungi tutte le espressioni al filtro della mappa esistente",
    "webmapAppendModeTip": "Opzione per aggiungere il set di filtri al filtro di una Web Map esistente.",
    "persistOnClose": "Mantieni dopo la chiusura del widget",
    "optionsMode": "Nascondi opzioni widget",
    "optionsModeTip": "Opzione per esporre impostazioni widget aggiuntive. Se selezionata, il salvataggio e il caricamento di filtri definiti e il mantenimento del filtro anche dopo la chiusura del widget vengono rimossi dall'interfaccia.",
    "optionOR": "O",
    "optionAND": "E",
    "optionEQUAL": "UGUALE A",
    "optionNOTEQUAL": "DIVERSO DA",
    "optionGREATERTHAN": "MAGGIORE DI",
    "optionGREATERTHANEQUAL": "MAGGIORE DI O UGUALE A",
    "optionLESSTHAN": "MINORE DI",
    "optionLESSTHANEQUAL": "MINORE DI O UGUALE A",
    "optionSTART": "INIZIA CON",
    "optionEND": "TERMINA CON",
    "optionLIKE": "CONTIENE",
    "optionNOTLIKE": "NON CONTIENE",
    "optionONORBEFORE": "FINO AL GIORNO",
    "optionONORAFTER": "DAL GIORNO",
    "optionNONE": "NESSUNO"
  },
  "tables": {
    "layer": "Livelli",
    "layerTip": "Nome del layer come definito nella mappa.",
    "field": "Campi",
    "fieldTip": "Campo rispetto al quale è possibile filtrare il layer.",
    "value": "Usa valore",
    "valueTip": "Opzione per utilizzare i valori dell'elenco a discesa dal layer. Se nessun layer utilizza questi parametri, una casella testo normale verrà presentata all'utente.",
    "zoom": "Zoom",
    "zoomTip": "Opzione per eseguire lo zoom all'estensione delle feature dopo che il filtro viene applicato. È possibile selezionare un solo layer per lo zoom.",
    "action": "Può eliminare",
    "actionTip": "Rimuovere layer dal set di filtri."
  },
  "popup": {
    "label": "Seleziona un valore"
  },
  "errors": {
    "noGroups": "È necessario almeno un gruppo.",
    "noGroupName": "Uno o più nomi gruppo mancanti.",
    "noDuplicates": "Uno o più nomi gruppo sono duplicati.",
    "noRows": "È necessaria almeno una riga nella tabella.",
    "noLayers": "Nessun layer nella mappa."
  },
  "picker": {
    "description": "Utilizzare questo modulo per trovare un valore preimpostato per questo gruppo.",
    "layer": "Seleziona un layer",
    "layerTip": "Nome del layer come definito nella mappa Web.",
    "field": "Seleziona un campo",
    "fieldTip": "Campo rispetto al quale verrà impostato il valore preimpostato.",
    "value": "Seleziona un valore",
    "valueTip": "Valore che verrà usato come predefinito del widget."
  }
});