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
  "setBtnLabel": "Imposta",
  "selectLabel": "Seleziona",
  "selectLayerLabel": "Seleziona il layer parcella",
  "selectLayerHintText": "Suggerimento: impiegare il pulsante Imposta per selezionare il poligono della parcella e il layer linea correlato",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "Il layer poligono selezionato non contiene un layer correlato valido."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Selezionare layer linea correlato",
    "layerSettingTabLabel": "Seleziona i layer parcella",
    "advancedSettingTabLabel": "Impostazioni avanzate",
    "selectLayerHintText": "Suggerimento: impiegarle per salvare i valori COGO nel layer linea della parcella",
    "selectFieldLegendLabel": "Selezionare i campi per salvare i valori COGO nel layer linea della parcella",
    "bearingFieldLabel": "Comportamento",
    "chordLengthFieldLabel": "Lunghezza corda",
    "distanceFieldLabel": "Distanza",
    "sequenceIdFieldLabel": "ID sequenza",
    "radiusFieldLabel": "Raggio",
    "foreignKeyFieldLabel": "Chiave esterna",
    "arcLengthFieldLabel": "Lunghezza arco",
    "lineTypeFieldLabel": "Tipo linea",
    "parcelPointSymbolLabel": "Simbolo di punto parcella",
    "parcelPointSymbolHintText": "Suggerimento: impiegarlo per mostrare il simbolo di punto per l'origine della linea.",
    "symbolPickerPreviewText": "Anteprima",
    "selectLineLayerLabel": "Seleziona layer linea"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Seleziona layer poligono",
    "selectPolygonLayerHintText": "Suggerimento: impiegare il layer poligono parcella selezionato",
    "selectFieldLegendLabel": "Selezionare i campi per salvare gli attributi del poligono parcella",
    "parcelNameLabel": "Nome particella",
    "rotationLabel": "Rotazione",
    "planNameLabel": "Nome piano",
    "scalingLabel": "Scala",
    "documentTypeLabel": "Tipo di documento",
    "miscloseRatioLabel": "Rapporto errore di chiusura",
    "statedAreaLabel": "Superficie indicata",
    "miscloseDistanceLabel": "Distanza errore di chiusura",
    "selectPolygonLayerLabelPopUp": "Seleziona un layer poligono"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Tipo linea",
    "valueLabel": "Valore",
    "symbolLabel": "Simbolo",
    "connectionLineLabel": "Linee di connessione",
    "boundaryLineLabel": "Linea di confine"
  },
  "closureSetting": {
    "snappingLayerLabel": "Snap dei layer",
    "snappingBtnLabel": "Imposta",
    "snappingLayerHintText": "Suggerimento: selezionare i layer ai quali sarà eseguito lo snap delle linee parcella.",
    "miscloseDistanceLabel": "Distanza errore di chiusura",
    "miscloseDistanceHintText": "Suggerimento: specificare la distanza errore di chiusura e le relative unità.",
    "miscloseRatioLabel": "Rapporto errore di chiusura",
    "miscloseRatioHintText": "Suggerimento: specificare il rapporto di errore di chiusura.",
    "snappingToleranceLabel": "Tolleranza snap",
    "pixelLabel": "Pixel",
    "snappingToleranceHintText": "Suggerimento: specificare la tolleranza snap.",
    "selectLayerLabel": "Seleziona layer"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Campo rilevamento non valido",
    "chordLengthErrMsg": "Lungh. corda non valida",
    "distanceFieldErrMsg": "Distanza non valida",
    "sequenceIdFieldErrMsg": "ID sequenza non valido",
    "radiusFieldErrMsg": "Raggio non valido",
    "foreignKeyFieldErrMsg": "Chiave esterna non valida",
    "arcLengthFieldErrMsg": "Lunghezza arco non valida",
    "lineTypeFieldErrMsg": "Tipo di linea non valido",
    "parcelNameFieldErrMsg": "Campo nome parcella non valido",
    "planNameFieldErrMsg": "Campo nome piano non valido",
    "scaleFieldErrMsg": "Campo scala non valido",
    "documentTypeFieldErrMsg": "Campo tipo di documento non valido",
    "miscloseRatioFieldErrMsg": "Campo rapporto errore di chiusura non valido",
    "statedAreaFieldErrMsg": "Campo superficie indicata non valido",
    "miscloseDistanceFieldErrMsg": "Campo distanza errore di chiusura non valido",
    "globalIdFieldErrMsg": "Il layer poligono selezionato non contiene un campo 'esriFieldTypeGlobalID' valido.",
    "invalidPolylineLayer": "Selezionare un layer polilinea parcella valido",
    "invalidPolygonLayer": "Selezionare un layer poligono parcella valido",
    "invalidMiscloseDistance": "Immettere una distanza errore di chiusura valida",
    "invalidSnappingTolerance": "Immettere una tolleranza di snap valida",
    "invalidMiscloseRatio": "Immettere un rapporto errore di chiusura valido",
    "selectDistinctLineTypes": "Selezionare un valore diverso per ciascun tipo di linea",
    "invalidConnectionLineType": "Valore errato per linea di collegamento",
    "invalidBoundaryLineType": "Valore errato per linea di confine",
    "selectDistinctPolylineFields": "Selezionare un campo diverso per ciascun valore COGO.",
    "selectDistinctPolygonFields": "Selezionare un campo diverso per ciascun attributo poligono parcella."
  }
});