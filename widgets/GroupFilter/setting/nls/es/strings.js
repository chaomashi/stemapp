define({
  "configText": "Defina a continuación los grupos de filtros",
  "labels": {
    "groupName": "Nombre del conjunto de filtros:",
    "groupNameTip": "Nombre del filtro del que el usuario seleccionará.",
    "groupDesc": "Descripción:",
    "groupDescTip": "Descripción del conjunto de filtros.",
    "groupOperator": "Operador predefinido:",
    "groupOperatorTip": "Opción que permite predefinir el operador del filtro. Si no se seleccione ningún operador predefinido, el filtro utilizará el operador Igual.",
    "groupDefault": "Valor predefinido:",
    "groupDefaultTip": "Opción que permite elegir un valor de una capa existente.",
    "sameLayerAppend": "Si una capa aparece más de una vez:",
    "sameLayerConjunc": "Incorporar utilizando:",
    "caseSearch": "Realizar una búsqueda con distinción entre mayúsculas y minúsculas: "
  },
  "buttons": {
    "addNewGroup": "Agregar un grupo nuevo",
    "addNewGroupTip": "Agregar un nuevo conjunto de filtros.",
    "addLayer": "Añadir capa",
    "addLayerTip": "Agregar una capa al conjunto de filtros."
  },
  "inputs": {
    "groupName": "Asigne un nombre al grupo",
    "groupDesc": "Descripción del grupo",
    "groupDefault": "Introduzca un valor predefinido",
    "sameLayerAny": "Coincidencia con cualquier expresión",
    "sameLayerAll": "Coincidencia con todas las expresiones",
    "simpleMode": "Iniciar en vista simple",
    "simpleModeTip": "Opción que permite simplificar la interfaz del widget configurada. Si está activada, se eliminan de la interfaz la lista desplegable de operadores y los botones de agregar criterios.",
    "webmapAppendModeAny": "Incorporar cualquier expresión al filtro de mapa existente",
    "webmapAppendModeAll": "Incorporar todas las expresiones al filtro de mapa existente",
    "webmapAppendModeTip": "Opción que permite incorporar el conjunto de filtros al filtro de un mapa web existente.",
    "persistOnClose": "Conservar al cerrar el widget",
    "optionsMode": "Ocultar opciones del widget",
    "optionsModeTip": "Opción que permite exponer configuraciones de widget adicionales. Si está activada, se elimina de la interfaz la opción de guardar y cargar filtros definidos y la de mantener el filtro después de cerrar el widget.",
    "optionOR": "O",
    "optionAND": "ANDY",
    "optionEQUAL": "ES IGUAL A",
    "optionNOTEQUAL": "NO ES IGUAL A",
    "optionGREATERTHAN": "MAYOR QUE",
    "optionGREATERTHANEQUAL": "MAYOR O IGUAL QUE",
    "optionLESSTHAN": "MENOR QUE",
    "optionLESSTHANEQUAL": "MENOR O IGUAL QUE",
    "optionSTART": "EMPIEZA POR",
    "optionEND": "TERMINA POR",
    "optionLIKE": "CONTIENE",
    "optionNOTLIKE": "NO CONTIENE",
    "optionONORBEFORE": "ES EL O ANTES",
    "optionONORAFTER": "ES EL O DESPUÉS",
    "optionNONE": "NINGUNO"
  },
  "tables": {
    "layer": "Capas",
    "layerTip": "Nombre de la capa tal y como está definida en el mapa.",
    "field": "Campos",
    "fieldTip": "Campo sobre el que se filtrará la capa.",
    "value": "Usar valor",
    "valueTip": "Opción que permite utilizar los valores de la lista desplegable de la capa. Si ninguna capa utiliza este parámetro, al usuario se le presentará un cuadro de texto plano.",
    "zoom": "Zoom",
    "zoomTip": "Opción que permite acercar la extensión de las entidades una vez aplicado el filtro. Solo se puede seleccionar una capa para acercar.",
    "action": "Eliminar",
    "actionTip": "Eliminar la capa del conjunto de filtros."
  },
  "popup": {
    "label": "Elegir un valor"
  },
  "errors": {
    "noGroups": "Necesita al menos un grupo.",
    "noGroupName": "Faltan uno o varios nombres de grupos.",
    "noDuplicates": "Uno o varios nombres de grupos están duplicados.",
    "noRows": "Necesita al menos una fila en la tabla.",
    "noLayers": "No hay capas en el mapa."
  },
  "picker": {
    "description": "Use este formulario para buscar un valor predefinido para este grupo.",
    "layer": "Seleccione una capa",
    "layerTip": "Nombre de la capa tal y como está definida en el mapa web.",
    "field": "Seleccione un campo",
    "fieldTip": "Campo a partir del cual se definirá el valor predefinido.",
    "value": "Seleccione un valor",
    "valueTip": "Valor que será el predeterminado del widget."
  }
});