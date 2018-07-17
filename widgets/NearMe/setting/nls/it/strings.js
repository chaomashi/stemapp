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
      "displayText": "Miglia",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Chilometri",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Piedi",
      "acronym": "piedi"
    },
    "meters": {
      "displayText": "Metri",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Cerca impostazioni origine",
    "searchSourceSettingTitle": "Cerca impostazioni origine",
    "searchSourceSettingTitleHintText": "Aggiungere e configurare servizi di geocodifica o feature layer come fonti di ricerca. Queste fonti specificate determinano ciò che è possibile cercare nella casella di ricerca",
    "addSearchSourceLabel": "Aggiungi fonte di ricerca",
    "featureLayerLabel": "Feature layer",
    "geocoderLabel": "Geocodificatore",
    "nameTitle": "Nome",
    "generalSettingLabel": "Impostazioni generali",
    "allPlaceholderLabel": "Testo segnaposto per la ricerca in tutti:",
    "allPlaceholderHintText": "Suggerimento: immettere il testo da visualizzare come segnaposto durante la ricerca di tutti i layer e geocodificatore",
    "generalSettingCheckboxLabel": "Mostra popup per la feature o la posizione trovata",
    "countryCode": "Codici paesi o regioni",
    "countryCodeEg": "es. ",
    "countryCodeHint": "Se si lascia vuoto questo campo, la ricerca verrà effettuata in tutti i paesi e le regioni",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Esegui la ricerca nell'estensione mappa corrente",
    "zoomScale": "Scala zoom",
    "locatorUrl": "URL geocodificatore",
    "locatorName": "Nome geocodificatore",
    "locatorExample": "Esempio",
    "locatorWarning": "Questa versione del servizio di geocodifica non è supportata. Il widget supporta il servizio di geocodifica 10.0 e versioni successive.",
    "locatorTips": "I suggerimenti non sono disponibili perché il servizio di geocodifica non supporta tale funzionalità.",
    "layerSource": "Origine del layer",
    "setLayerSource": "Imposta layer di origine",
    "setGeocoderURL": "Imposta URL geocodificatore",
    "searchLayerTips": "I suggerimenti non sono disponibili perché il feature service non supporta la funzionalità di paginazione.",
    "placeholder": "Testo segnaposto",
    "searchFields": "Campi di ricerca",
    "displayField": "Campo visualizzazione",
    "exactMatch": "Corrispondenza esatta",
    "maxSuggestions": "Suggerimenti massimi",
    "maxResults": "Risultati massimi",
    "enableLocalSearch": "Abilita ricerca locale",
    "minScale": "Scala Minima",
    "minScaleHint": "Quando la scala della mappa è più grande di questa scala, verrà applicata la ricerca locale",
    "radius": "Raggio",
    "radiusHint": "Specifica il raggio di un'area intorno al centro della mappa corrente che viene utilizzato per assegnare la priorità alla classificazione dei candidati di geocodifica in modo che i canditati più vicini alla posizione vengano restituiti per primi",
    "meters": "Metri",
    "setSearchFields": "Imposta campi di ricerca",
    "set": "Imposta",
    "fieldName": "Nome",
    "invalidUrlTip": "URL ${URL} non valido o non accessibile."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Impostazione di ricerca",
    "defaultBufferDistanceLabel": "Imposta distanza di buffer predefinita",
    "maxResultCountLabel": "Limita numero di risultati",
    "maxResultCountHintLabel": "Suggerimento: impostare il numero massimo di risultati visibili. Il valore 1 restituisce la feature più vicina",
    "maxBufferDistanceLabel": "Imposta distanza di buffer massima",
    "bufferDistanceUnitLabel": "Unità distanza di buffer",
    "defaultBufferHintLabel": "Suggerimento: impostare il valore predefinito per il cursore buffer",
    "maxBufferHintLabel": "Suggerimento: impostare il valore massimo per il cursore buffer",
    "bufferUnitLabel": "Suggerimento: definire unità di creazione buffer",
    "selectGraphicLocationSymbol": "Simbolo indirizzo o posizione",
    "graphicLocationSymbolHintText": "Suggerimento: simbolo per l'indirizzo ricercato o la posizione selezionata",
    "addressLocationPolygonHintText": "Suggerimento: simbolo per il layer poligono ricercato",
    "popupTitleForPolygon": "Selezionare il poligono per la posizione dell'indirizzo selezionato",
    "popupTitleForPolyline": "Selezionare la linea per la posizione dell'indirizzo",
    "addressLocationPolylineHintText": "Suggerimento: simbolo per il layer polilinea ricercato",
    "fontColorLabel": "Seleziona colore font per risultati della ricerca",
    "fontColorHintText": "Suggerimento: colore font dei risultati della ricerca",
    "zoomToSelectedFeature": "Zoom alla feature selezionata",
    "zoomToSelectedFeatureHintText": "Suggerimento: esegue lo zoom alla feature selezionata anziché al buffer",
    "intersectSearchLocation": "Restituisci poligono o poligoni di intersezione",
    "intersectSearchLocationHintText": "Suggerimento: restituisce il poligono o i poligoni contenenti la posizione ricercata anziché i poligoni all'interno del buffer",
    "enableProximitySearch": "Attiva ricerca di prossimità",
    "enableProximitySearchHintText": "Suggerimento: attiva la funzione di ricerca per località vicino al risultato selezionato",
    "bufferVisibilityLabel": "Imposta visibilità buffer",
    "bufferVisibilityHintText": "Suggerimento: il buffer verrà visualizzato sulla mappa",
    "bufferColorLabel": "Imposta simbolo buffer",
    "bufferColorHintText": "Suggerimento: selezionare colore e trasparenza del buffer",
    "searchLayerResultLabel": "Disegna solo risultati del layer selezionato",
    "searchLayerResultHint": "Suggerimento: solo il layer selezionato nei risultati della ricerca verrà disegnato sulla mappa",
    "showToolToSelectLabel": "Pulsante Imposta posizione",
    "showToolToSelectHintText": "Suggerimento: fornisce un pulsante per impostare la posizione sulla mappa anziché impostare sempre la posizione quando si fa clic sulla mappa",
    "geoDesicParamLabel": "Usa buffer geodesico",
    "geoDesicParamHintText": "Suggerimento: utilizzare buffer geodesico anziché buffer euclideo (planare)"
  },
  "layerSelector": {
    "selectLayerLabel": "Seleziona layer di ricerca",
    "layerSelectionHint": "Suggerimento: utilizzare il pulsante di impostazione per selezionare layer",
    "addLayerButton": "Imposta"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Impostazioni direzioni",
    "routeServiceUrl": "Servizio itinerario",
    "buttonSet": "Imposta",
    "routeServiceUrlHintText": "Suggerimento: fare clic su â€˜Impostaâ€™ per individuare e selezionare un servizio itinerario",
    "directionLengthUnit": "Unità di lunghezza direzione",
    "unitsForRouteHintText": "Suggerimento: utilizzato per visualizzare unità per percorso",
    "selectRouteSymbol": "Seleziona simbolo per visualizzare percorso",
    "routeSymbolHintText": "Suggerimento: utilizzato per visualizzare simbolo linea del percorso",
    "routingDisabledMsg": "Per abilitare le direzioni assicurarsi che sull'elemento sia attivato il routing nelle impostazioni dell'applicazione."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Impostazioni simbologia",
    "addSymbologyBtnLabel": "Aggiungi nuovi simboli",
    "layerNameTitle": "Nome layer",
    "fieldTitle": "Campo",
    "valuesTitle": "Valori",
    "symbolTitle": "Simbolo",
    "actionsTitle": "Azioni",
    "invalidConfigMsg": "Duplica campo: ${fieldName} per layer: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Impostazioni filtro",
    "addTaskTip": "Aggiungere uno o più filtri ai layer di ricerca selezionati e configurare i parametri per ciascuno di essi.",
    "enableMapFilter": "Rimuovi il filtro del layer preimpostato dalla mappa.",
    "newFilter": "Nuovo filtro",
    "filterExpression": "Espressione di filtro",
    "layerDefaultSymbolTip": "Utilizza simbolo di default del layer",
    "uploadImage": "Carica un'immagine",
    "selectLayerTip": "Selezionare un layer.",
    "setTitleTip": "Impostare il titolo.",
    "noTasksTip": "Nessun filtro configurato. Fare clic su \"${newFilter}\" per aggiungerne uno nuovo.",
    "collapseFiltersTip": "Comprimere le espressioni dei filtri (se presenti) quando si apre il widget",
    "groupFiltersTip": "Raggruppa filtri per layer"
  },
  "networkServiceChooser": {
    "arcgislabel": "Aggiungi da ArcGIS Online",
    "serviceURLabel": "Aggiungi URL del servizio",
    "routeURL": "URL itinerario",
    "validateRouteURL": "Convalida",
    "exampleText": "Esempio",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Specificare un servizio Itinerari valido.",
    "rateLimitExceeded": "Superato limite velocità. Riprovare più tardi.",
    "errorInvokingService": "Nome utente o password errati."
  },
  "errorStrings": {
    "bufferErrorString": "Immettere valore numerico valido.",
    "selectLayerErrorString": "Selezionare i layer da cercare.",
    "invalidDefaultValue": "La distanza di buffer predefinita non può essere vuota. Specificare la distanza di buffer",
    "invalidMaximumValue": "La distanza di buffer massima non può essere vuota. Specificare la distanza di buffer",
    "defaultValueLessThanMax": "Specificare la distanza di buffer predefinita all'interno del limite massimo",
    "defaultBufferValueGreaterThanOne": "La distanza buffer predefinita non può essere minore di 0",
    "maximumBufferValueGreaterThanOne": "Specificare la distanza di buffer massima maggiore di 0",
    "invalidMaximumResultCountValue": "Specificare un valore valido per il conteggio risultati massimo.",
    "invalidSearchSources": "Impostazioni fonte di ricerca non valide"
  },
  "symbolPickerPreviewText": "Anteprima:"
});