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
  "_widgetLabel": "Selección",
  "geometryServicesNotFound": "Servicio de geometría no disponible.",
  "unableToDrawBuffer": "No se pudo dibujar la zona de influencia. Inténtelo de nuevo.",
  "invalidConfiguration": "Configuración no válida.",
  "clearAOIButtonLabel": "Empezar de nuevo",
  "noGraphicsShapefile": "El shapefile cargado no contiene gráficos.",
  "zoomToLocationTooltipText": "Zoom a ubicación",
  "noGraphicsToZoomMessage": "No se han encontrado gráficos que se puedan acercar.",
  "placenameWidget": {
    "placenameLabel": "Buscar una ubicación"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Seleccionar modo de dibujo",
    "toggleSelectability": "Haga clic para alternar la capacidad de selección",
    "chooseLayerTitle": "Elegir una capa seleccionable",
    "selectAllLayersText": "Seleccionar todo",
    "layerSelectionWarningTooltip": "Se debe seleccionar al menos una capa para crear un AOI"
  },
  "shapefileWidget": {
    "shapefileLabel": "Cargar un shapefile comprimido",
    "uploadShapefileButtonText": "Cargar",
    "unableToUploadShapefileMessage": "No se puede cargar un shapefile."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Definir un punto de inicio",
    "addButtonTitle": "Agregar",
    "deleteButtonTitle": "Quitar",
    "mapTooltipForStartPoint": "Haga clic en el mapa para definir un punto de inicio",
    "mapTooltipForUpdateStartPoint": "Haga clic en el mapa para actualizar el punto de inicio",
    "locateText": "Ubicar",
    "locateByMapClickText": "Seleccionar coordenadas iniciales",
    "enterBearingAndDistanceLabel": "Introducir rumbo y distancia desde el punto de inicio",
    "bearingTitle": "Orientación",
    "distanceTitle": "Distancia",
    "planSettingTooltip": "Configuración del plano",
    "invalidLatLongMessage": "Introduzca valores válidos."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Distancia de zona de influencia (opcional)",
    "bufferInputLabel": "Mostrar resultados en"
  },
  "traverseSettings": {
    "bearingLabel": "Orientación",
    "lengthLabel": "Longitud",
    "addButtonTitle": "Agregar",
    "deleteButtonTitle": "Quitar"
  },
  "planSettings": {
    "expandGridTooltipText": "Expandir cuadrícula",
    "collapseGridTooltipText": "Contraer cuadrícula",
    "directionUnitLabelText": "Unidad de las indicaciones",
    "distanceUnitLabelText": "Unidades de distancia y longitud",
    "planSettingsComingSoonText": "Próximamente"
  },
  "newTraverse": {
    "invalidBearingMessage": "Rumbo no válido.",
    "invalidLengthMessage": "Longitud no válida.",
    "negativeLengthMessage": "Longitud negativa"
  },
  "reportsTab": {
    "aoiAreaText": "Área del AOI",
    "downloadButtonTooltip": "Descargar",
    "printButtonTooltip": "Imprimir",
    "uploadShapefileForAnalysisText": "Cargar shapefile para incluirlo en el análisis",
    "uploadShapefileForButtonText": "Examinar",
    "downloadLabelText": "Seleccionar formato:",
    "downloadBtnText": "Descargar",
    "noDetailsAvailableText": "No se encontró ningún resultado",
    "featureCountText": "Calcular",
    "featureAreaText": "Área",
    "featureLengthText": "Longitud",
    "attributeChooserTooltip": "Elegir atributos que se desea visualizar",
    "csv": "CSV",
    "filegdb": "Geodatabase de archivos",
    "shapefile": "Shapefile",
    "noFeaturesFound": "No se han encontrado resultados para el formato de archivo seleccionado",
    "selectReportFieldTitle": "Seleccionar campos",
    "noFieldsSelected": "No se ha seleccionado ningún campo",
    "intersectingFeatureExceedsMsgOnCompletion": "El número máximo de registros se ha alcanzado para una o varias capas.",
    "unableToAnalyzeText": "No se puede analizar, se ha alcanzado el número máximo de registros.",
    "errorInPrintingReport": "No se puede imprimir el informe. Compruebe si la configuración del informe es válida.",
    "aoiInformationTitle": "Información del área de interés (AOI)",
    "summaryReportTitle": "Resumen",
    "notApplicableText": "N/A",
    "downloadReportConfirmTitle": "Confirmar descarga",
    "downloadReportConfirmMessage": "¿Seguro que desea descargar?",
    "noDataText": "No hay datos",
    "createReplicaFailedMessage": "La operación de descarga ha fallado para las siguientes capas: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Error en la operación de descarga.",
    "printLayoutLabelText": "Diseño",
    "printBtnText": "Imprimir",
    "printDialogHint": "Nota: el título y los comentarios del informe se pueden editar en la vista previa del informe.",
    "unableToDownloadFileGDBText": "La geodatabase de archivos no se puede descargar para AOI que contienen ubicaciones de puntos o de líneas",
    "unableToDownloadShapefileText": "El shapefile no se puede descargar para AOI que contienen ubicaciones de puntos o de líneas",
    "analysisUnitLabelText": "Mostrar resultados en:",
    "analysisUnitButtonTooltip": "Elija las unidades para el análisis",
    "analysisCloseBtnText": "Cerrar",
    "feetUnit": "Pies / Pies cuadrados",
    "milesUnit": "Millas / Acres",
    "metersUnit": "Metros / Metros cuadrados",
    "kilometersUnit": "Kilómetros / Kilómetros cuadrados",
    "hectaresUnit": "Kilómetros / Hectáreas",
    "hectaresAbbr": "hectáreas",
    "layerNotVisibleText": "No se pudo analizar. La capa está desactivada o fuera del rango visible de la escala.",
    "refreshBtnTooltip": "Actualizar informe",
    "featureCSVAreaText": "Área de intersección",
    "featureCSVLengthText": "Longitud de intersección",
    "errorInFetchingPrintTask": "Error al obtener información de la tarea de impresión. Inténtelo de nuevo."
  }
});