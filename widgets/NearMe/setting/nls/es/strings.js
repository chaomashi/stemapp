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
      "displayText": "Millas",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Kilómetros",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Pies",
      "acronym": "pie"
    },
    "meters": {
      "displayText": "Metros",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Configuración de fuente de búsqueda",
    "searchSourceSettingTitle": "Configuración de fuente de búsqueda",
    "searchSourceSettingTitleHintText": "Agrega y configura servicios de geocodificación o capas de entidades como fuentes de búsqueda. Estas fuentes especificadas determinan qué se puede buscar en el cuadro de búsqueda",
    "addSearchSourceLabel": "Agregar origen de búsqueda",
    "featureLayerLabel": "Capa de entidades",
    "geocoderLabel": "Geocodificador",
    "nameTitle": "Nombre",
    "generalSettingLabel": "Configuración general",
    "allPlaceholderLabel": "Texto del marcador de posición para buscar en todo:",
    "allPlaceholderHintText": "Sugerencia: escriba el texto que se va a mostrar como marcador de posición mientras busca todas las capas y el geocodificador",
    "generalSettingCheckboxLabel": "Mostrar ventana emergente de la entidad o la ubicación encontrada",
    "countryCode": "Código(s) de país o región",
    "countryCodeEg": "p. ej., ",
    "countryCodeHint": "Si se deja este valor en blanco, se buscará en todos los países y regiones",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Buscar solo en la extensión de mapa actual",
    "zoomScale": "Aplicar zoom a escala",
    "locatorUrl": "Dirección URL del geocodificador",
    "locatorName": "Nombre del geocodificador",
    "locatorExample": "Ejemplo",
    "locatorWarning": "No se admite esta versión del servicio de geocodificación. El widget admite servicios de geocodificación 10.0 y superiores.",
    "locatorTips": "No hay sugerencias disponibles porque el servicio de geocodificación no admite la opción de sugerencias.",
    "layerSource": "Origen de capa",
    "setLayerSource": "Establecer origen de capa",
    "setGeocoderURL": "Establecer dirección URL de geocodificador",
    "searchLayerTips": "No hay sugerencias disponibles porque el servicio de entidades no admite la opción de paginación.",
    "placeholder": "Texto del marcador de posición",
    "searchFields": "Campos de búsqueda",
    "displayField": "Mostrar campo",
    "exactMatch": "Coincidencia exacta",
    "maxSuggestions": "Máximo de sugerencias",
    "maxResults": "Resultados máximos",
    "enableLocalSearch": "Habilitar búsqueda local",
    "minScale": "Escala Mínima",
    "minScaleHint": "Si la escala del mapa es mayor que esta escala, se aplicará la búsqueda local",
    "radius": "Radio",
    "radiusHint": "Permite especificar el radio de un área alrededor del centro del mapa actual que se utilizará para mejorar la clasificación de los candidatos de geocodificación a fin de que se devuelvan primero aquellos más cercanos a la ubicación",
    "meters": "Metros",
    "setSearchFields": "Establecer campos de búsqueda",
    "set": "Definir",
    "fieldName": "Nombre",
    "invalidUrlTip": "No se puede acceder a la dirección URL ${URL} o bien no es válida."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Configuración de búsqueda",
    "defaultBufferDistanceLabel": "Definir distancia de zona de influencia predeterminada",
    "maxResultCountLabel": "Número límite de resultados",
    "maxResultCountHintLabel": "Sugerencia: establezca el número máximo de resultados visibles. el valor de 1 devolverá la entidad más cercana.",
    "maxBufferDistanceLabel": "Definir distancia de zona de influencia máxima",
    "bufferDistanceUnitLabel": "Unidades de distancia del área de influencia",
    "defaultBufferHintLabel": "Sugerencia: defina el valor predeterminado para el control deslizante de zona de influencia",
    "maxBufferHintLabel": "Sugerencia: defina el valor máximo para el control deslizante de zona de influencia",
    "bufferUnitLabel": "Sugerencia: define una unidad para crear la zona de influencia",
    "selectGraphicLocationSymbol": "Símbolo de dirección o ubicación",
    "graphicLocationSymbolHintText": "Sugerencia: símbolo para la dirección buscada o para la ubicación en la que se ha hecho clic",
    "addressLocationPolygonHintText": "Sugerencia: símbolo de la capa de polígonos de búsqueda",
    "popupTitleForPolygon": "Seleccionar polígono para la ubicación de dirección seleccionada",
    "popupTitleForPolyline": "Seleccionar línea para la ubicación de dirección",
    "addressLocationPolylineHintText": "Sugerencia: símbolo de la capa de polilíneas de búsqueda",
    "fontColorLabel": "Seleccionar color de fuente para resultados de búsqueda",
    "fontColorHintText": "Sugerencia: color de fuente de los resultados de la búsqueda",
    "zoomToSelectedFeature": "Aplicar zoom a la entidad seleccionada",
    "zoomToSelectedFeatureHintText": "Sugerencia: aplique el zoom a la entidad seleccionada en lugar de la zona de influencia",
    "intersectSearchLocation": "Devolver polígonos que se intersecan",
    "intersectSearchLocationHintText": "Sugerencia: devuelva los polígonos que contienen la ubicación buscada en lugar de los polígonos contenidos en la zona de influencia",
    "enableProximitySearch": "Habilitar búsqueda por proximidad",
    "enableProximitySearchHintText": "Sugerencia: Habilite la función para buscar ubicaciones cercanas a un resultado seleccionado",
    "bufferVisibilityLabel": "Definir visibilidad de zona de influencia",
    "bufferVisibilityHintText": "Sugerencia: la zona de influencia se mostrará en el mapa",
    "bufferColorLabel": "Definir símbolo de zona de influencia",
    "bufferColorHintText": "Sugerencia: seleccione el color y la transparencia de la zona de influencia",
    "searchLayerResultLabel": "Dibujar solo resultados de la capa seleccionada",
    "searchLayerResultHint": "Sugerencia: solo la capa seleccionada en los resultados de búsqueda se dibujará en el mapa",
    "showToolToSelectLabel": "Seleccionar botón de ubicación",
    "showToolToSelectHintText": "Sugerencia: proporciona un botón para establecer una ubicación en el mapa en vez de establecer siempre la ubicación cuando se ha hecho clic en el mapa",
    "geoDesicParamLabel": "Utilizar zona de influencia geodésica",
    "geoDesicParamHintText": "Sugerencia: utilice una zona de influencia geodésica en vez de una zona de influencia euclidiana (planar)"
  },
  "layerSelector": {
    "selectLayerLabel": "Seleccionar capas de búsqueda",
    "layerSelectionHint": "Sugerencia: usa el botón de definir para seleccionar capas",
    "addLayerButton": "Definir"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Configuraciones de indicaciones",
    "routeServiceUrl": "Servicio de generación de rutas",
    "buttonSet": "Definir",
    "routeServiceUrlHintText": "Sugerencia: haga clic en \"Definir\" para examinar y seleccionar un servicio de generación de rutas",
    "directionLengthUnit": "Unidades de longitud de dirección",
    "unitsForRouteHintText": "Sugerencia: se utiliza para visualizar las unidades para la ruta",
    "selectRouteSymbol": "Seleccionar símbolo para visualizar ruta",
    "routeSymbolHintText": "Sugerencia: se utiliza para visualizar el símbolo de línea de la ruta",
    "routingDisabledMsg": "Para habilitar las indicaciones, asegúrese de que la generación de rutas está habilitada en el elemento, en la configuración de la aplicación."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Configuración de simbología",
    "addSymbologyBtnLabel": "Agregar nuevos símbolos",
    "layerNameTitle": "Nombre de capa",
    "fieldTitle": "Campo",
    "valuesTitle": "Valores",
    "symbolTitle": "Símbolo",
    "actionsTitle": "Acciones",
    "invalidConfigMsg": "Campo duplicado: ${fieldName} para la capa: ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Configuración de filtro",
    "addTaskTip": "Agregue uno o varios filtros a las capas de búsqueda seleccionadas y configure parámetros para cada una de ellas.",
    "enableMapFilter": "Elimine el filtro predefinido de la capa desde el mapa.",
    "newFilter": "Nuevo filtro",
    "filterExpression": "Expresión de filtro",
    "layerDefaultSymbolTip": "Usar símbolo predeterminado de capa",
    "uploadImage": "Cargar una imagen",
    "selectLayerTip": "Seleccione una capa.",
    "setTitleTip": "Defina un título.",
    "noTasksTip": "No hay filtros configurados. Haga clic en \"${newFilter}\" para agregar uno nuevo.",
    "collapseFiltersTip": "Contraer las expresiones de filtro (si las hay) al abrir el widget",
    "groupFiltersTip": "Agrupar filtros por capa"
  },
  "networkServiceChooser": {
    "arcgislabel": "Agregar desde ArcGIS Online",
    "serviceURLabel": "Agregar URL de servicio",
    "routeURL": "URL de ruta",
    "validateRouteURL": "Validar",
    "exampleText": "Ejemplo",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Especifica un servicio de rutas válido.",
    "rateLimitExceeded": "Se ha superado el límite de velocidad. Vuelva a intentarlo más tarde.",
    "errorInvokingService": "El nombre de usuario o la contraseña son incorrectos."
  },
  "errorStrings": {
    "bufferErrorString": "Introduce un valor numérico válido.",
    "selectLayerErrorString": "Selecciona las capas para buscar.",
    "invalidDefaultValue": "La distancia de zona de influencia predeterminada no puede estar en blanco. Especifica la distancia de zona de influencia.",
    "invalidMaximumValue": "La distancia de zona de influencia máxima no puede estar en blanco. Especifica la distancia de zona de influencia.",
    "defaultValueLessThanMax": "Especifica la distancia de zona de influencia predeterminada dentro del límite máximo",
    "defaultBufferValueGreaterThanOne": "La distancia de zona de influencia predeterminada no puede ser menor que 0",
    "maximumBufferValueGreaterThanOne": "Especifica una distancia de zona de influencia máxima mayor que 0",
    "invalidMaximumResultCountValue": "Especifique un valor válido para el recuento de resultados máximo",
    "invalidSearchSources": "Configuración de fuente de búsqueda no válida"
  },
  "symbolPickerPreviewText": "Vista previa:"
});