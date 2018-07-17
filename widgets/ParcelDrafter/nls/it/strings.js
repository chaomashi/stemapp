///////////////////////////////////////////////////////////////////////////
// Copyright © 2016 Esri. All Rights Reserved.
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
  "_widgetLabel": "Creatore bozze parcelle",
  "newTraverseButtonLabel": "Avvia nuova traversa",
  "invalidConfigMsg": "Configurazione non valida",
  "geometryServiceURLNotFoundMSG": "Impossibile ottenere l'URL del servizio geometria",
  "editTraverseButtonLabel": "Modifica traversa",
  "mapTooltipForStartNewTraverse": "Selezionare un punto sulla mappa oppure digitare in basso per iniziare",
  "mapTooltipForEditNewTraverse": "Selezionare una parcella da modificare",
  "mapTooltipForUpdateStartPoint": "Fare clic per aggiornare il punto di inizio",
  "mapTooltipForScreenDigitization": "Fare clic per aggiornare la parcella di inizio",
  "mapTooltipForRotate": "Trascina per ruotare",
  "mapTooltipForScale": "Trascina per eseguire la scala",
  "backButtonTooltip": "Indietro",
  "newTraverseTitle": "Nuova traversa",
  "editTraverseTitle": "Modifica traversa",
  "clearingDataConfirmationMessage": "Le modifiche saranno annullate, procedere?",
  "unableToFetchParcelMessage": "Impossibile recuperare la parcella.",
  "unableToFetchParcelLinesMessage": "Impossibile recuperare le linee parcella.",
  "planSettings": {
    "planSettingsTitle": "Impostazioni",
    "directionOrAngleTypeLabel": "Tipo di direzione o angolo",
    "directionOrAngleUnitsLabel": "Unità di direzione o angolo",
    "distanceAndLengthUnitsLabel": "Unità di distanza e lunghezza",
    "areaUnitsLabel": "Unità area",
    "circularCurveParameters": "Parametri curva circolare",
    "northAzimuth": "Azimut nord",
    "southAzimuth": "Azimut sud",
    "quadrantBearing": "Cuscinetto del quadrante",
    "radiusAndChordLength": "Raggio e lunghezza corda",
    "radiusAndArcLength": "Raggio e lunghezza arco",
    "expandGridTooltipText": "Espandi griglia",
    "collapseGridTooltipText": "Chiudi griglia",
    "zoomToLocationTooltipText": "Zoom su posizione",
    "onScreenDigitizationTooltipText": "Digitalizza"
  },
  "traverseSettings": {
    "bearingLabel": "Comportamento",
    "lengthLabel": "Lunghezza",
    "radiusLabel": "Raggio",
    "noMiscloseCalculated": "Errore di chiusura non calcolato",
    "traverseMiscloseBearing": "Rilevamento errore di chiusura",
    "traverseAccuracy": "Precisione",
    "accuracyHigh": "Alto",
    "traverseDistance": "Distanza errore di chiusura",
    "traverseMiscloseRatio": "Rapporto errore di chiusura",
    "traverseStatedArea": "Superficie indicata",
    "traverseCalculatedArea": "Superficie calcolata",
    "addButtonTitle": "Aggiungi",
    "deleteButtonTitle": "Rimuovi"
  },
  "parcelTools": {
    "rotationToolLabel": "Angolo",
    "scaleToolLabel": "Scala"
  },
  "newTraverse": {
    "invalidBearingMessage": "Rilevamento non valido.",
    "invalidLengthMessage": "Lunghezza non valida.",
    "invalidRadiusMessage": "Raggio non valido.",
    "negativeLengthMessage": "Valido solo per le curve",
    "enterValidValuesMessage": "Immettere dei valori validi",
    "enterValidParcelInfoMessage": "Immettere delle informazioni parcella valide da salvare.",
    "unableToDrawLineMessage": "Impossibile disegnare la linea.",
    "invalidEndPointMessage": "Punto finale non valido, impossibile disegnare la linea."
  },
  "planInfo": {
    "requiredText": "(obbligatorio)",
    "optionalText": "(opzionale)",
    "parcelNamePlaceholderText": "Nome parcella",
    "parcelDocumentTypeText": "Tipo di documento",
    "planNamePlaceholderText": "Pianificare parcella",
    "cancelButtonLabel": "Annulla",
    "saveButtonLabel": "Salva",
    "saveNonClosedParcelConfirmationMessage": "La parcella inserita non è chiusa; procedere comunque e salvare solo le linee parcella?",
    "unableToCreatePolygonParcel": "Impossibile creare il poligono parcella.",
    "unableToSavePolygonParcel": "Impossibile salvare il poligono parcella.",
    "unableToSaveParcelLines": "Impossibile salvare le linee parcella.",
    "unableToUpdateParcelLines": "Impossibile aggiornare le linee parcella.",
    "parcelSavedSuccessMessage": "Salvataggio parcella riuscito.",
    "enterValidParcelNameMessage": "Immettere un nome parcella valido.",
    "enterValidPlanNameMessage": "Immettere un nome piano valido.",
    "enterValidDocumentTypeMessage": "Tipo di documento non valido.",
    "enterValidStatedAreaNameMessage": "Immettere una superficie indicata valida."
  },
  "xyInput": {
    "explanation": "Nel riferimento spaziale del layer delle parcelle"
  }
});