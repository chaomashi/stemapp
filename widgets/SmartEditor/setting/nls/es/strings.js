define({
  "layersPage": {
    "allLayers": "Todas las capas",
    "title": "Seleccionar una plantilla para crear entidades",
    "generalSettings": "Configuración general",
    "layerSettings": "Configuraciones de la capa",
    "presetValueText": "Definir valores predefinidos",
    "geocoderSettingsText": "Ajustes de geocodificador",
    "editDescription": "Proporcione texto de visualización para el panel de edición",
    "editDescriptionTip": "Este texto se muestra sobre el selector de plantillas. Déjelo en blanco si no desea usar ningún texto.",
    "promptOnSave": "Solicitud para guardar las ediciones no guardadas cuando se cierra el formulario o se cambia al siguiente registro.",
    "promptOnSaveTip": "Muestra una solicitud cuando el usuario hace clic en Cerrar o va al siguiente registro editable si la entidad actual tiene ediciones sin guardar.",
    "promptOnDelete": "Requerir confirmación al eliminar un registro",
    "promptOnDeleteTip": "Muestra una solicitud cuando el usuario hace clic en Eliminar para confirmar la acción.",
    "removeOnSave": "Eliminar entidad de la selección al guardar",
    "removeOnSaveTip": "Opción para eliminar la entidad del conjunto de selección al guardar el registro. Si es el único registro seleccionado, el panel vuelve a cambiar a la página de plantilla.",
    "useFilterEditor": "Usar filtro de plantilla de entidad",
    "useFilterEditorTip": "Opción para usar el selector de plantillas de filtro que permite ver la plantilla de una capa o buscar plantillas por nombre.",
    "displayShapeSelector": "Mostrar opciones de dibujo",
    "displayShapeSelectorTip": "Una opción para mostrar una lista de opciones de dibujo válidas para la plantilla seleccionada.",
    "displayPresetTop": "Visualizar lista de valores predefinidos encima",
    "displayPresetTopTip": "Una opción para mostrar la lista de valores predefinidos por encima del selector de plantillas.",
    "listenToGroupFilter": "Aplicar valores de filtro del widget Filtro de grupo a los campos predefinidos",
    "listenToGroupFilterTip": "Cuando se aplica un filtro en el widget Filtro de grupo, aplica el valor a un campo coincidente de la lista de valores predefinidos.",
    "keepTemplateActive": "Mantener plantilla seleccionada activa",
    "keepTemplateActiveTip": "Cuando se muestra el selector de plantillas, si se seleccionó una plantilla previamente, vuelve a seleccionarla.",
    "geometryEditDefault": "Habilitar edición de geometría de forma predeterminada",
    "autoSaveEdits": "Guarda la edición automáticamente",
    "enableAttributeUpdates": "Mostrar el botón de actualización de Acciones de atributo si Editar geometría está activo",
    "layerSettingsTable": {
      "allowDelete": "Permitir eliminación",
      "allowDeleteTip": "Opción que permite al usuario eliminar una entidad; estará deshabilitada si la capa no admite eliminaciones.",
      "edit": "Editable",
      "editTip": "Opción para incluir la capa en el widget.",
      "label": "Capa",
      "labelTip": "Nombre de la capa definido en el mapa",
      "update": "Deshabilitar edición de geometría",
      "updateTip": "Opción para deshabilitar la capacidad de mover la geometría una vez insertada o de mover la geometría a una entidad ya existente.",
      "allowUpdateOnly": "Sólo actualizar",
      "allowUpdateOnlyTip": "Opción para permitir únicamente la modificación de entidades ya existentes. Está activada de manera predeterminada y se deshabilita si la capa no admite la creación de nuevas entidades",
      "fieldsTip": "Modifique los campos que se van a editar y defina atributos inteligentes",
      "actionsTip": "Opción para editar campos o acceder a capas/tablas relacionadas",
      "description": "Descripción",
      "descriptionTip": "Opción que permite introducir texto para que se muestre en la parte superior de la página de atributos.",
      "relationTip": "Ver capas y tablas relacionadas"
    },
    "editFieldError": "Las modificaciones de campos y los atributos inteligentes no están disponibles para las capas que no son editables",
    "noConfigedLayersError": "El Editor inteligente requiere una o varias capas editables"
  },
  "editDescriptionPage": {
    "title": "Definir texto de descripción general de atributo para <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Configurar campos para <b>${layername}</b>",
    "copyActionTip": "Acciones de atributos",
    "description": "Use el botón de edición de acciones para activar los atributos inteligentes en una capa. Los atributos inteligentes pueden requerir, ocultar o deshabilitar un campo en función de los valores de otros campos. Use el botón de copia de acciones para activar y definir fuentes de valores de campos por intersección, dirección, coordenadas y valor predefinido.",
    "fieldsNotes": "* es un campo obligatorio. Si desactiva Vista para este campo y la plantilla de edición no rellena ese valor de campo, no podrá guardar un nuevo registro.",
    "smartAttachmentText": "Configurar la acción de adjuntos inteligentes",
    "smartAttachmentPopupTitle": "Configurar adjuntos inteligentes para <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Vista",
      "displayTip": "Determina si el campo no está visible",
      "edit": "Editable",
      "editTip": "Active esta opción si el campo está presente en el formulario de atributos",
      "fieldName": "Nombre",
      "fieldNameTip": "Nombre del campo definido en la base de datos",
      "fieldAlias": "Alias",
      "fieldAliasTip": "Nombre del campo definido en el mapa",
      "canPresetValue": "Predefinido",
      "canPresetValueTip": "Opción para mostrar el campo en la lista de campos predefinidos y permitir que el usuario defina el valor antes de editar.",
      "actions": "Acciones",
      "actionsTip": "Cambie el orden de los campos o configure atributos inteligentes"
    },
    "smartAttSupport": "Los atributos inteligentes no se admiten en los campos de base de datos obligatorios"
  },
  "actionPage": {
    "title": "Configurar las acciones de atributos para <b>${fieldname}</b>",
    "description": "Las acciones están siempre desactivadas a menos que se especifiquen los criterios que harán que se activen. Las acciones se procesan en orden y solo se activará una acción por campo. Use el botón de edición de criterios para definir los criterios.",
    "actionsSettingsTable": {
      "rule": "Acción",
      "ruleTip": "Acción realizada cuando se cumplen los criterios",
      "expression": "Expresión",
      "expressionTip": "Expresión resultante del criterio definido en formato SQL",
      "actions": "Criterios",
      "actionsTip": "Cambie el orden de la regla y defina los criterios cuando se active"
    },
    "copyAction": {
      "description": "Si se activa, los orígenes de valores de campo se procesan en orden hasta que se dispara un criterio válido o hasta que se completa la lista. Use el botón de edición de criterios para definir los criterios.",
      "intersection": "Intersección",
      "coordinates": "Coordenadas",
      "address": "Dirección",
      "preset": "Predefinido",
      "actionText": "Acciones",
      "criteriaText": "Criterios",
      "enableText": "Habilitado"
    },
    "actions": {
      "hide": "Ocultar",
      "required": "Obligatorio",
      "disabled": "Deshabilitado"
    }
  },
  "filterPage": {
    "submitHidden": "¿Enviar datos de atributos para este campo aunque esté oculto?",
    "title": "Configurar expresión para la regla ${action}",
    "filterBuilder": "Definir acción en el campo cuando el registro coincida con ${any_or_all} de las expresiones siguientes",
    "noFilterTip": "Con las herramientas siguientes, defina la declaración para los casos en los que la acción esté activa."
  },
  "geocoderPage": {
    "setGeocoderURL": "Establecer dirección URL de geocodificador",
    "hintMsg": "Nota: Está cambiando el servicio de geocodificador. Asegúrese de actualizar las asignaciones de campos de geocodificador que tenga configuradas.",
    "invalidUrlTip": "No se puede acceder a la dirección URL ${URL} o bien no es válida."
  },
  "addressPage": {
    "popupTitle": "Dirección",
    "checkboxLabel": "Obtener valor del geocodificador",
    "selectFieldTitle": "Atributo:",
    "geocoderHint": "para cambiar el geocodificador, vaya al botón 'Ajustes de geocodificador' en los ajustes generales"
  },
  "coordinatesPage": {
    "popupTitle": "Coordenadas",
    "checkboxLabel": "Obtener coordenadas",
    "coordinatesSelectTitle": "Sistema de coordenadas:",
    "coordinatesAttributeTitle": "Atributo:",
    "mapSpatialReference": "Asignar referencia espacial",
    "latlong": "Latitud/longitud"
  },
  "presetPage": {
    "popupTitle": "Predefinido",
    "checkboxLabel": "El campo se predefinirá",
    "presetValueLabel": "El valor predefinido actual es:",
    "changePresetValueHint": "Para cambiar este valor predefinido, vaya al botón 'Definir valores predefinidos' en los ajustes generales"
  },
  "intersectionPage": {
    "checkboxLabel": "Obtener valor del campo de la capa de intersección",
    "layerText": "Capas",
    "fieldText": "Campos",
    "actionsText": "Acciones",
    "addLayerLinkText": "Agregar una capa"
  },
  "presetAll": {
    "popupTitle": "Definir los valores predefinidos predeterminados",
    "deleteTitle": "Eliminar valor predefinido",
    "hintMsg": "Aquí se enumeran todos los nombres de campos predefinidos únicos. Al eliminar un campo predefinido, se desactiva el campo correspondiente como predefinido de todas las capas/tablas."
  }
});