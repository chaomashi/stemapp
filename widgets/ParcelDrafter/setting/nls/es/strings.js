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
  "setBtnLabel": "Establecer",
  "selectLabel": "Seleccionar",
  "selectLayerLabel": "Seleccionar capas de parcelas",
  "selectLayerHintText": "Sugerencia: use el botón Definir para seleccionar el polígono de parcela y la capa de líneas relacionada",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "La capa de polígonos seleccionada no tiene una capa relacionada válida."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Seleccionar capa de líneas relacionada",
    "layerSettingTabLabel": "Capas de parcelas",
    "advancedSettingTabLabel": "Configuración avanzada",
    "selectLayerHintText": "Sugerencia: use esta opción para almacenar valores COGO en una capa de líneas de parcelas",
    "selectFieldLegendLabel": "Seleccionar campos para almacenar valores COGO en una capa de líneas de parcelas",
    "bearingFieldLabel": "Orientación",
    "chordLengthFieldLabel": "Longitud de cuerda",
    "distanceFieldLabel": "Distancia",
    "sequenceIdFieldLabel": "Id. de secuencia",
    "radiusFieldLabel": "Radio",
    "foreignKeyFieldLabel": "Clave externa",
    "arcLengthFieldLabel": "Longitud del arco",
    "lineTypeFieldLabel": "Tipo de línea",
    "parcelPointSymbolLabel": "Símbolo de punto de parcela",
    "parcelPointSymbolHintText": "Sugerencia: se usa para visualizar el símbolo de punto para el origen de la línea.",
    "symbolPickerPreviewText": "Previsualización",
    "selectLineLayerLabel": "Seleccionar capa de líneas"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Seleccionar capa de polígono",
    "selectPolygonLayerHintText": "Sugerencia: use la capa de polígonos de parcelas seleccionada",
    "selectFieldLegendLabel": "Seleccionar campos para almacenar atributos de polígonos de parcelas",
    "parcelNameLabel": "Nombre Parcela",
    "rotationLabel": "Rotación",
    "planNameLabel": "Nombre del plano",
    "scalingLabel": "Escalado",
    "documentTypeLabel": "Tipo de documento",
    "miscloseRatioLabel": "Cierre incorrecto de radio",
    "statedAreaLabel": "Área señalada",
    "miscloseDistanceLabel": "Cierre incorrecto Distancia",
    "selectPolygonLayerLabelPopUp": "Seleccionar una capa de polígono"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Tipo de línea",
    "valueLabel": "Valor",
    "symbolLabel": "Símbolo",
    "connectionLineLabel": "Línea de conexión",
    "boundaryLineLabel": "Línea de límite"
  },
  "closureSetting": {
    "snappingLayerLabel": "Capas de alineación",
    "snappingBtnLabel": "Establecer",
    "snappingLayerHintText": "Sugerencia: seleccione las capas con las que se alinearán las líneas de parcelas.",
    "miscloseDistanceLabel": "Cierre incorrecto Distancia",
    "miscloseDistanceHintText": "Sugerencia: especifique la distancia de mala convergencia y sus unidades.",
    "miscloseRatioLabel": "Cierre incorrecto de radio",
    "miscloseRatioHintText": "Sugerencia: especifique el ratio de mala convergencia.",
    "snappingToleranceLabel": "Tolerancia de alineación",
    "pixelLabel": "Píxeles",
    "snappingToleranceHintText": "Sugerencia: especifique la tolerancia de alineación.",
    "selectLayerLabel": "Seleccionar capa"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Campo de rumbo no válido",
    "chordLengthErrMsg": "ChordLength no válido",
    "distanceFieldErrMsg": "Distancia no válida",
    "sequenceIdFieldErrMsg": "sequenceId no válido",
    "radiusFieldErrMsg": "Radio no válido",
    "foreignKeyFieldErrMsg": "Clave externa no válida",
    "arcLengthFieldErrMsg": "Longitud del arco no válida",
    "lineTypeFieldErrMsg": "Tipo de línea no válido",
    "parcelNameFieldErrMsg": "Campo de nombre de la parcela no válido",
    "planNameFieldErrMsg": "Campo de nombre del plano no válido",
    "scaleFieldErrMsg": "Campo de escala no válido",
    "documentTypeFieldErrMsg": "Campo de tipo de documento no válido",
    "miscloseRatioFieldErrMsg": "Campo de ratio de mala convergencia no válido",
    "statedAreaFieldErrMsg": "Campo de área indicada no válido",
    "miscloseDistanceFieldErrMsg": "Campo de distancia de mala convergencia no válido",
    "globalIdFieldErrMsg": "La capa de polígonos seleccionada no tiene un campo \"esriFieldTypeGlobalID\" válido.",
    "invalidPolylineLayer": "Seleccione una capa de polilíneas de parcelas válida",
    "invalidPolygonLayer": "Seleccione una capa de polígonos de parcelas válida",
    "invalidMiscloseDistance": "Introduzca una distancia de mala convergencia válida",
    "invalidSnappingTolerance": "Introduzca una tolerancia de alineación válida",
    "invalidMiscloseRatio": "Introduzca un ratio de mala convergencia válido",
    "selectDistinctLineTypes": "Seleccione un valor diferente en cada tipo de línea",
    "invalidConnectionLineType": "Valor de línea de conexión no válido",
    "invalidBoundaryLineType": "Valor de línea de límite no válido",
    "selectDistinctPolylineFields": "Seleccione un campo diferente para cada valor COGO.",
    "selectDistinctPolygonFields": "Seleccione un campo diferente para cada atributo de polígono de parcela."
  }
});