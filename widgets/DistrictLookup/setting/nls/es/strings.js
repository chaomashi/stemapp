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
    "miles": "Millas",
    "kilometers": "Kilómetros",
    "feet": "Pies",
    "meters": "Metros"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Configuración de búsqueda",
    "buttonSet": "Definir",
    "selectLayersLabel": "Seleccionar capa",
    "selectLayersHintText": "Sugerencia: se utiliza para seleccionar la capa del polígono y su capa de puntos relacionada.",
    "selectPrecinctSymbolLabel": "Seleccionar símbolo para resaltar polígono",
    "selectGraphicLocationSymbol": "Símbolo de dirección o ubicación",
    "graphicLocationSymbolHintText": "Sugerencia: símbolo para la dirección buscada o para la ubicación en la que se ha hecho clic",
    "precinctSymbolHintText": "Sugerencia: se utiliza para visualizar el símbolo para el polígono seleccionado",
    "selectColorForPoint": "Seleccionar color para resaltar el punto",
    "selectColorForPointHintText": "Sugerencia: se utiliza para visualizar el color de resaltado para el punto seleccionado"
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
    "invalidUrlTip": "No se puede acceder a la dirección URL ${URL} o bien no es válida.",
    "invalidSearchSources": "Configuración de fuente de búsqueda no válida"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Seleccionar capa de polígono",
    "selectPolygonLayerHintText": "Sugerencia: se utiliza para seleccionar la capa del polígono.",
    "selectRelatedPointLayerLabel": "Seleccionar capa de puntos relacionada con capa de polígono",
    "selectRelatedPointLayerHintText": "Sugerencia: se utiliza para seleccionar la capa de puntos relacionada con la capa de polígono",
    "polygonLayerNotHavingRelatedLayer": "Selecciona una capa de polígono que tenga una capa de puntos relacionada.",
    "errorInSelectingPolygonLayer": "Selecciona una capa de polígono que tenga una capa de puntos relacionada.",
    "errorInSelectingRelatedLayer": "Selecciona una capa de puntos relacionada con la capa de polígono."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Configuraciones de indicaciones",
    "routeServiceUrl": "Servicio de generación de rutas",
    "buttonSet": "Definir",
    "routeServiceUrlHintText": "Sugerencia: haz clic en ‘Definir’ para examinar y seleccionar un servicio de generación de rutas para el análisis de red",
    "directionLengthUnit": "Unidades de longitud de dirección",
    "unitsForRouteHintText": "Sugerencia: se utiliza para visualizar las unidades indicadas para la ruta",
    "selectRouteSymbol": "Seleccionar símbolo para visualizar ruta",
    "routeSymbolHintText": "Sugerencia: se utiliza para visualizar el símbolo de línea de la ruta",
    "routingDisabledMsg": "Para habilitar las indicaciones, asegúrate de que la generación de rutas está habilitada en el elemento de ArcGIS Online."
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
  "symbolPickerPreviewText": "Vista previa:",
  "showToolToSelectLabel": "Seleccionar botón de ubicación",
  "showToolToSelectHintText": "Sugerencia: proporciona un botón para establecer una ubicación en el mapa en vez de establecer siempre la ubicación cuando se ha hecho clic en el mapa"
});