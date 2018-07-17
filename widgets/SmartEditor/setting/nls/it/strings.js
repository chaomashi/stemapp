define({
  "layersPage": {
    "allLayers": "Tutti i layer",
    "title": "Selezionare un modello per creare le feature",
    "generalSettings": "Impostazioni generali",
    "layerSettings": "Impostazioni layer",
    "presetValueText": "Definire i valori preimpostati",
    "geocoderSettingsText": "Impostazioni geocoder",
    "editDescription": "Fornire testo di visualizzazione per il pannello di modifica",
    "editDescriptionTip": "Questo testo viene visualizzato sopra il selettore dei modelli, lasciare vuoto in assenza di testo.",
    "promptOnSave": "Richiedere di salvare modifiche non salvate quando il modulo viene chiuso o passato al record successivo.",
    "promptOnSaveTip": "Visualizzare un prompt quando l'utente fa clic su Chiudi o passare al successivo record modificabile quando la feature corrente contiene modifiche non salvate.",
    "promptOnDelete": "Richiedere la conferma durante la cancellazione di un record.",
    "promptOnDeleteTip": "Visualizza un prompt quando l'utente fa clic su Cancella per confermare l'azione.",
    "removeOnSave": "Rimuove la feature dalla selezione al salvataggio.",
    "removeOnSaveTip": "Opzione per rimuovere la feature dalla selezione impostata quando il record viene salvato. Se è il solo record selezionato, il pannello viene riportato alla pagina del modello.",
    "useFilterEditor": "Utilizza filtro modello di feature",
    "useFilterEditorTip": "Opzione per utilizzare il selettore Filtra Template, che consente di visualizzare il template di un layer o di cercare template in base al nome.",
    "displayShapeSelector": "Mostra opzioni del disegno",
    "displayShapeSelectorTip": "Opzione per mostrare un elenco di opzioni valide per il disegno per il modello selezionato.",
    "displayPresetTop": "Mostra in alto l'elenco dei valori preimpostati",
    "displayPresetTopTip": "Opzione per mostrare l’elenco dei valori preimpostati nella selezione di modelli.",
    "listenToGroupFilter": "Applica valori ai filtri dal widget Filtro gruppo ai campi preimpostati",
    "listenToGroupFilterTip": "Quando un filtro viene applicato nel widget Filtro gruppo, applicare il valore a un campo corrispondente nell'elenco dei valori preimpostati.",
    "keepTemplateActive": "Mantieni attivo il modello selezionato",
    "keepTemplateActiveTip": "Quando viene visualizzato il selettore dei modelli, se un modello è stato selezionato in precedenza, selezionarlo nuovamente.",
    "geometryEditDefault": "Abilita la modifica della geometria per impostazione predefinita",
    "autoSaveEdits": "Salva automaticamente la modifica",
    "enableAttributeUpdates": "Mostra il pulsante di aggiornamento delle azioni attributo quando la modifica della geometria è attiva",
    "layerSettingsTable": {
      "allowDelete": "Consenti cancellazione",
      "allowDeleteTip": "Opzione per consentire all'utente di cancellare una feature; disabilitata se il layer non supporta la cancellazione",
      "edit": "Modificabile",
      "editTip": "Opzione per includere il layer nel widget",
      "label": "Layer",
      "labelTip": "Nome del layer come definito nella mappa",
      "update": "Disabilita modifica geometria",
      "updateTip": "Opzione per disabilitare la possibilità di spostare la geometria dopo che è stata posizionata o spostare la geometria su una feature esistente",
      "allowUpdateOnly": "Solo aggiornamento",
      "allowUpdateOnlyTip": "Opzione per consentire solo la modifica delle feature esistenti, selezionata per impostazione predefinita e disabilitata se il layer non supporta la creazione di nuove feature",
      "fieldsTip": "Modificare i campi da modificare e definire attributi Smart",
      "actionsTip": "Opzione per modificare i campi o accedere ai layer/tabelle correlati",
      "description": "Descrizione",
      "descriptionTip": "Opzione per immettere testo da visualizzare sopra la pagina dell'attributo.",
      "relationTip": "Visualizza layer e tabelle correlati"
    },
    "editFieldError": "Modifiche campo e attributi Smart non sono disponibili per layer non modificabili",
    "noConfigedLayersError": "Smart Editor richiede uno o più layer modificabili"
  },
  "editDescriptionPage": {
    "title": "Definire il testo panoramica attributo per <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Configurare i campi per <b>${layername}</b>",
    "copyActionTip": "Azioni attributo",
    "description": "Usare il pulsante di modifica delle azioni per attivare gli attributi Smart in un layer. Gli attributi Smart possono richiedere, nascondere o disabilitare un campo in base ai valori di altri campi. Usare il pulsante di copia delle azioni per attivare e definire l’origine del valore del campo per intersezione, indirizzo, coordinate o valore preimpostato.",
    "fieldsNotes": "* è un campo obbligatorio. Se si deseleziona Visualizza per questo campo, e il modello di modifica non compila il valore del campo, non sarà possibile salvare un nuovo record.",
    "smartAttachmentText": "Configurare l’azione degli allegati Smart",
    "smartAttachmentPopupTitle": "Configura allegati Smart per <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Visualizza",
      "displayTip": "Determinare se il campo è non visibile",
      "edit": "Modificabile",
      "editTip": "Verificar se il campo è presente nel modulo attributo",
      "fieldName": "Nome",
      "fieldNameTip": "Nome del campo definito nel database",
      "fieldAlias": "Alias",
      "fieldAliasTip": "Nome del campo definito nella mappa",
      "canPresetValue": "Preimpostato",
      "canPresetValueTip": "Opzione per visualizzare il campo nell'elenco dei campi preimpostati e consentire all'utente di impostare il valore prima della modifica",
      "actions": "Azioni",
      "actionsTip": "Modificare l'ordine dei campi o impostare attributi Smart"
    },
    "smartAttSupport": "Gli attributi Smart non sono supportati su campi di database obbligatori"
  },
  "actionPage": {
    "title": "Configura le azioni attributo per <b>${fieldname}</b>",
    "description": "Le azioni sono sempre disattivate a meno che non venga specificato il criterio in base al quale vengono attivate. Le azioni vengono elaborate in ordine e verrà attivata una sola azione per campo. Utilizzare il pulsante Modifica criterio per definire il criterio.",
    "actionsSettingsTable": {
      "rule": "Azione",
      "ruleTip": "Azione eseguita quando il criterio è soddisfatto",
      "expression": "Espressione",
      "expressionTip": "L'espressione risultante in formato SQL dei criteri definiti",
      "actions": "Criteri",
      "actionsTip": "Modificare l'ordine della regola e definire i criteri quando viene attivata"
    },
    "copyAction": {
      "description": "L'origine del valore del campo viene elaborata in ordine se attivata finché non si attiva un criterio valido o non viene completato l’elenco. Utilizzare il pulsante di modifica dei criteri per definire i criteri.",
      "intersection": "Intersezione",
      "coordinates": "Coordinate",
      "address": "Indirizzo",
      "preset": "Preimpostato",
      "actionText": "Azioni",
      "criteriaText": "Criteri",
      "enableText": "Abilitata"
    },
    "actions": {
      "hide": "Nascondi",
      "required": "Richiesto",
      "disabled": "Disabilitato"
    }
  },
  "filterPage": {
    "submitHidden": "Inviare dati attributo per questo campo anche quando è nascosto?",
    "title": "Configura espressione per la regola ${action}",
    "filterBuilder": "Impostare azione su campo quando il record corrisponde a ${any_or_all} delle seguenti espressioni",
    "noFilterTip": "Utilizzando gli strumenti sottostanti, definire l'istruzione per quando l'azione è attiva."
  },
  "geocoderPage": {
    "setGeocoderURL": "Imposta URL geocodificatore",
    "hintMsg": "Nota: si sta modificando il servizio di geocodifica, assicurarsi di aggiornare il mapping dei campi del geocoder che sono stati configurati.",
    "invalidUrlTip": "URL ${URL} non valida o non accessibile."
  },
  "addressPage": {
    "popupTitle": "Indirizzo",
    "checkboxLabel": "Ottieni valore dal Geocoder",
    "selectFieldTitle": "Attributo:",
    "geocoderHint": "Per modificare la configurazione del Geocoder, usare il pulsante “Impostazioni Geocoder” nelle impostazioni generali"
  },
  "coordinatesPage": {
    "popupTitle": "Coordinate",
    "checkboxLabel": "Ottieni coordinate",
    "coordinatesSelectTitle": "Sistema di coordinate:",
    "coordinatesAttributeTitle": "Attributo:",
    "mapSpatialReference": "Riferimento spaziale della mappa",
    "latlong": "Latitudine/Longitudine"
  },
  "presetPage": {
    "popupTitle": "Preimpostato",
    "checkboxLabel": "Il campo sarà impostato con un valore preimpostato",
    "presetValueLabel": "Il valore preimpostato attuale è:",
    "changePresetValueHint": "Per modificare il valore preimpostato, fare clic sul pulsante “Definisci valori preimpostati” nelle impostazioni generali"
  },
  "intersectionPage": {
    "checkboxLabel": "Ottieni valore dal campo di intersezione del layer",
    "layerText": "Layer",
    "fieldText": "Campi",
    "actionsText": "Azioni",
    "addLayerLinkText": "Aggiungi un layer"
  },
  "presetAll": {
    "popupTitle": "Definisci valori preimpostati predefiniti",
    "deleteTitle": "Cancella valore preimpostato",
    "hintMsg": "Tutti i nomi univoci dei campi preimpostati sono elencati qui. L’eliminazione di un campo preimpostato disabiliterà il relativo campo preimpostato da tutti i layer/tabelle."
  }
});