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
    "miles": "Miglia",
    "kilometers": "Chilometri",
    "feet": "Piedi",
    "meters": "Metri"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Impostazione di ricerca",
    "buttonSet": "Imposta",
    "selectLayersLabel": "Seleziona layer",
    "selectLayersHintText": "Suggerimento: utilizzato per selezionare il layer poligono e il layer punto correlato.",
    "selectPrecinctSymbolLabel": "Seleziona simbolo per evidenziare poligono",
    "selectGraphicLocationSymbol": "Simbolo indirizzo o posizione",
    "graphicLocationSymbolHintText": "Suggerimento: simbolo per l'indirizzo ricercato o la posizione selezionata",
    "precinctSymbolHintText": "Suggerimento: utilizzato per visualizzare il simbolo per il poligono selezionato",
    "selectColorForPoint": "Seleziona colore per evidenziare punto",
    "selectColorForPointHintText": "Suggerimento: utilizzato per visualizzare il colore evidenziazione per il punto selezionato"
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
    "invalidUrlTip": "URL ${URL} non valido o non accessibile.",
    "invalidSearchSources": "Impostazioni fonte di ricerca non valide"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Seleziona layer poligono",
    "selectPolygonLayerHintText": "Suggerimento: utilizzato per selezionare layer poligono.",
    "selectRelatedPointLayerLabel": "Selezionare layer punto correlato al layer poligono",
    "selectRelatedPointLayerHintText": "Suggerimento: utilizzato per selezionare layer punto correlato a layer poligono",
    "polygonLayerNotHavingRelatedLayer": "Selezionare un layer poligono con un layer punto correlato.",
    "errorInSelectingPolygonLayer": "Selezionare un layer poligono con un layer punto correlato.",
    "errorInSelectingRelatedLayer": "Selezionare layer punto correlato al layer poligono."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Impostazioni direzioni",
    "routeServiceUrl": "Servizio itinerario",
    "buttonSet": "Imposta",
    "routeServiceUrlHintText": "Suggerimento: fare clic su ‘Imposta’ per individuare e selezionare un servizio itinerario di analisi di rete",
    "directionLengthUnit": "Unità di lunghezza direzione",
    "unitsForRouteHintText": "Suggerimento: utilizzato per visualizzare unità per percorso segnalate",
    "selectRouteSymbol": "Seleziona simbolo per visualizzare percorso",
    "routeSymbolHintText": "Suggerimento: utilizzato per visualizzare simbolo linea del percorso",
    "routingDisabledMsg": "Per abilitare le direzioni accertarsi che gli itinerari siano abilitati nell'elemento di ArcGIS Online."
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
  "symbolPickerPreviewText": "Anteprima:",
  "showToolToSelectLabel": "Pulsante Imposta posizione",
  "showToolToSelectHintText": "Suggerimento: fornisce un pulsante per impostare la posizione sulla mappa anziché impostare sempre la posizione quando si fa clic sulla mappa"
});