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
  "_widgetLabel": "Análisis de costes beta",
  "unableToFetchInfoErrMessage": "No se pudieron obtener los detalles del servicio de geometría/las capas configuradas",
  "invalidCostingGeometryLayer": "No se pudo obtener el 'esriFieldTypeGlobalID' en la capa de geometría para cálculo de costes.",
  "projectLayerNotFound": "No se pudo encontrar la capa del proyecto configurado en el mapa.",
  "costingGeometryLayerNotFound": "No se pudo encontrar en el mapa la capa de geometría para cálculo de costes.",
  "projectMultiplierTableNotFound": "No se pudo encontrar en el mapa la tabla de costes adicionales multiplicadora del proyecto configurado.",
  "projectAssetTableNotFound": "No se pudo encontrar la tabla de activos del proyecto configurado en el mapa.",
  "createLoadProject": {
    "createProjectPaneTitle": "Crear proyecto",
    "loadProjectPaneTitle": "Cargar proyecto",
    "projectNamePlaceHolder": "Nombre del proyecto",
    "projectDescPlaceHolder": "Descripción del proyecto",
    "selectProject": "Seleccionar proyecto",
    "viewInMapLabel": "Ver en el mapa",
    "loadLabel": "Cargar",
    "createLabel": "Crear",
    "deleteProjectConfirmationMsg": "¿Desea realmente eliminar el proyecto?",
    "noAssetsToViewOnMap": "El proyecto seleccionado no tiene ningún activo que visualizar en el mapa.",
    "projectDeletedMsg": "El proyecto se ha eliminado correctamente.",
    "errorInCreatingProject": "Error al crear el proyecto.",
    "errorProjectNotFound": "Proyecto no encontrado.",
    "errorInLoadingProject": "Compruebe que se ha seleccionado un proyecto válido.",
    "errorProjectNotSelected": "Seleccionar un proyecto de la lista desplegable",
    "errorDuplicateProjectName": "El nombre del proyecto ya existe."
  },
  "statisticsSettings": {
    "tabTitle": "Configuración de estadísticas",
    "addStatisticsLabel": "Agregar estadísticas",
    "addNewStatisticsText": "Agregar estadísticas nuevas",
    "deleteStatisticsText": "Eliminar estadísticas",
    "moveStatisticsUpText": "Subir estadísticas",
    "moveStatisticsDownText": "Bajar estadísticas",
    "layerNameTitle": "Capa",
    "statisticsTypeTitle": "Tipo",
    "fieldNameTitle": "Campo",
    "statisticsTitle": "Etiqueta",
    "actionLabelTitle": "Acciones",
    "selectDeselectAllTitle": "Seleccionar todo"
  },
  "statisticsType": {
    "countLabel": "Recuento",
    "averageLabel": "Media",
    "maxLabel": "Máximo",
    "minLabel": "Mínimo",
    "summationLabel": "Suma",
    "areaLabel": "Área",
    "lengthLabel": "Longitud"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Es necesario marcar la capa como editable en la pestaña de configuración de la capa"
  },
  "workBench": {
    "refresh": "Actualizar",
    "noAssetAddedMsg": "No se ha agregado ningún activo",
    "units": "unidad(es)",
    "assetDetailsTitle": "Detalles de elementos del activo",
    "costEquationTitle": "Ecuación de costes",
    "newCostEquationTitle": "Nueva ecuación",
    "defaultCostEquationTitle": "Ecuación predeterminada",
    "geographyTitle": "Geografía",
    "scenarioTitle": "Escenario",
    "costingInfoHintText": "<div>Sugerencia: Utilice las siguientes palabras clave</div><ul><li><b>{TOTALCOUNT}</b>: Usa el número total de activos del mismo tipo dentro de una geografía</li> <li><b>{MEASURE}</b>: Usa la longitud para activos lineales y el área para activos poligonales</li><li><b>{TOTALMEASURE}</b>: Utiliza la longitud total para los activos lineales y el área total para los activos poligonales del mismo tipo dentro de una geografía</li></ul> Puede usar funciones tales como:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Edite la ecuación de costes según las necesidades de su proyecto.",
    "zoomToAsset": "Acercar a activo",
    "deleteAsset": "Eliminar activo",
    "closeDialog": "Cerrar diálogo",
    "objectIdColTitle": "ID de objeto",
    "costColTitle": "Coste",
    "errorInvalidCostEquation": "Ecuación de costes no válida.",
    "errorInSavingAssetDetails": "No se pudieron guardar los detalles del activo."
  },
  "assetDetails": {
    "inGeography": " en ${geography} ",
    "withScenario": " con ${scenario}",
    "totalCostTitle": "Coste total",
    "additionalCostLabel": "Descripción",
    "additionalCostValue": "Valor",
    "additionalCostNetValue": "Valor neto"
  },
  "projectOverview": {
    "assetItemsTitle": "Elementos de activos",
    "assetStatisticsTitle": "Estadísticas de activos",
    "projectSummaryTitle": "Resumen del proyecto",
    "projectName": "Nombre del proyecto: ${name}",
    "totalCostLabel": "Coste total del proyecto (*):",
    "grossCostLabel": "Coste bruto del proyecto (*):",
    "roundingLabel": "* Redondeado a '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "No se pudo guardar el límite del proyecto en la capa del proyecto.",
    "unableToSaveProjectCost": "No se pudieron guardar los costes en la capa del proyecto.",
    "roundCostValues": {
      "twoDecimalPoint": "Dos puntos decimales",
      "nearestWholeNumber": "Número entero más cercano",
      "nearestTen": "Decena más cercana",
      "nearestHundred": "Centena más cercana",
      "nearestThousand": "Unidad de millar más cercana",
      "nearestTenThousands": "Decena de millar más cercana"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Atributo del proyecto",
    "projectAttributeTitle": "Editar atributos del proyecto"
  },
  "costEscalation": {
    "costEscalationLabel": "Sumar coste adicional",
    "valueHeader": "Valor",
    "addCostEscalationText": "Sumar coste adicional",
    "deleteCostEscalationText": "Eliminar coste adicional seleccionado",
    "moveCostEscalationUpText": "Mover el coste adicional seleccionado hacia arriba",
    "moveCostEscalationDownText": "Mover el coste adicional seleccionado hacia abajo",
    "invalidEntry": "Una o más entradas no son válidas.",
    "errorInSavingCostEscalation": "No se pudieron guardar los detalles de costes adicionales."
  },
  "scenarioSelection": {
    "popupTitle": "Seleccionar escenario del activo",
    "regionLabel": "Geografía",
    "scenarioLabel": "Escenario",
    "noneText": "Ninguna",
    "copyFeatureMsg": "¿Desea copiar las entidades seleccionadas?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Estadísticas detalladas",
    "noDetailStatisticAvailable": "No se ha agregado ninguna estadística de activo"
  }
});