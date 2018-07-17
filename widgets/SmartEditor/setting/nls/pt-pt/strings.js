define({
  "layersPage": {
    "allLayers": "Todas as Camadas",
    "title": "Escolha um template para criar elementos",
    "generalSettings": "Configurações Gerais",
    "layerSettings": "Configurações de Camada",
    "presetValueText": "Definir Valores Predefinidos",
    "geocoderSettingsText": "Definições de Geocodificador",
    "editDescription": "Fornecer texto de exibição para o painel editar",
    "editDescriptionTip": "Este texto é exibido acima do seletor Modelo, deixe em branco caso prefira que não haja texto.",
    "promptOnSave": "Solicitação para guardar edições por guardar quando o formulário é encerrado ou alterado para o registo seguinte.",
    "promptOnSaveTip": "Exibir uma solicitação quando o utilizador clica em encerrar ou navega para o registo editável seguinte, quando o elemento atual tem edições por guardar.",
    "promptOnDelete": "Requerer confirmação ao eliminar um registo.",
    "promptOnDeleteTip": "Exibir uma solicitação quando o utilizador clica em eliminar para confirmar a acção.",
    "removeOnSave": "Remover elemento de seleção ao guardar.",
    "removeOnSaveTip": "Opção para remover o elemento do conjunto de seleção quando o registo é guardado.  Casos e trate do único registo selecionado, o painel regressa à página do modelo.",
    "useFilterEditor": "Utilizar filtro de modelo de elemento",
    "useFilterEditorTip": "Opção para utilizar o seletor Modelo de Filtro, que oferece a possibilidade de visualizar o modelo de uma camada ou pesquisar modelos por nome.",
    "displayShapeSelector": "Exibir opções de desenho",
    "displayShapeSelectorTip": "Opção para exibir uma lista de opções de desenho válidas para o modelo selecionado.",
    "displayPresetTop": "Exibir lista de valores predefinidos no topo",
    "displayPresetTopTip": "Opção para exibir a lista de valores predefinidos acima do seletor de modelos.",
    "listenToGroupFilter": "Aplicar valores de filtros do widget Agrupar Filtros para Predefinir campos",
    "listenToGroupFilterTip": "Quando um filtro é aplicado no widget Agrupar Filtros, aplique o valor a um campo correspondente na lista de valor Predefinido.",
    "keepTemplateActive": "Manter modelo selecionado ativo",
    "keepTemplateActiveTip": "Quando o seletor de modelos é exibido, caso um modelo tenha sido selecionado anteriormente, volte a selecioná-lo.",
    "geometryEditDefault": "Ativar edição de geometria por defeito",
    "autoSaveEdits": "Guarda a edição automaticamente",
    "enableAttributeUpdates": "Exibir botão de atualização Ações de Atributos quando editar geometria se encontra ativo",
    "layerSettingsTable": {
      "allowDelete": "Permitir Eliminação",
      "allowDeleteTip": "Opção para permitir ao utilizador eliminar um elemento; é desativada caso a camada não suporte eliminação",
      "edit": "Editável",
      "editTip": "Opção para incluir a camada no widget",
      "label": "Camada",
      "labelTip": "Nome da camada tal como definido no mapa",
      "update": "Desativar Edição de Geometria",
      "updateTip": "Opção para desativar a capacidade de mover a geometria após colocada, ou mover a geometria num elemento existente",
      "allowUpdateOnly": "Atualizar Apenas",
      "allowUpdateOnlyTip": "Opção para permitir apenas a modificação de elementos existentes, selecionados por defeito e desativados caso a camada não suporte a criação de novos elementos",
      "fieldsTip": "Modificar os campos para serem editados e definir Atributos Inteligentes",
      "actionsTip": "Opção para editar campos ou aceder a camadas/tabelas relacionadas",
      "description": "Descrição",
      "descriptionTip": "Opção para introduzir texto a exibir no topo da página de atributos.",
      "relationTip": "Visualizar camadas e tabelas relacionadas"
    },
    "editFieldError": "Modificações de campos e atributos Inteligentes não se encontram disponíveis para camadas que não são editáveis",
    "noConfigedLayersError": "O Smart Editor requer uma ou mais camadas editáveis."
  },
  "editDescriptionPage": {
    "title": "Defina o texto de vista geral de atributos para <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Configure campos para <b>${layername}</b>",
    "copyActionTip": "Ações de Atributos",
    "description": "Utilize o botão de edição Ações para ativar Atributos Inteligentes numa camada. Os Atributos Inteligentes podem requerer, ocultar ou desativar um campo com base em valores de outros campos. Utilize o botão de cópia Ações para ativar e definir origem de valor de campo por interseção, endereço, coordenadas e predefinição.",
    "fieldsNotes": "* é um campo exigido.  Caso desmarque Exibir para este campo, e o modelo de edição não preencha esse valor de campo, não lhe será possível  guardar um novo registo.",
    "smartAttachmentText": "Configurar a ação Anexos inteligentes",
    "smartAttachmentPopupTitle": "Configurar anexos inteligentes para <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Exibir",
      "displayTip": "Determinar se o campo não é visível",
      "edit": "Editável",
      "editTip": "Marcar se o campo estiver presente no formulário de atributos",
      "fieldName": "Nome",
      "fieldNameTip": "Nome do campo tal como definido na base de dados",
      "fieldAlias": "Nome Alternativo",
      "fieldAliasTip": "Nome do campo definido no mapa",
      "canPresetValue": "Pré-definido",
      "canPresetValueTip": "Opção para exibir o campo na lista de campos de predefinição, e permitir ao utilizador definir o valor antes de editar",
      "actions": "Acções",
      "actionsTip": "Alterar a ordem dos campos ou configurar Atributos Inteligentes"
    },
    "smartAttSupport": "Os Atributos Inteligentes não são suportados nos campos obrigatórios da base de dados"
  },
  "actionPage": {
    "title": "Configurar as Acções de Atributos para <b>${fieldname}</b>",
    "description": "As ações estão sempre desativadas, a não ser que especifique os critérios através dos quais são desencadeadas.   As ações são processadas por ordem e apenas uma ação por campo será desencadeada.  Utilize o botão Edição de Critérios para definir os critérios.",
    "actionsSettingsTable": {
      "rule": "Ação",
      "ruleTip": "Ação executada quando os critérios são correspondidos",
      "expression": "Expressão",
      "expressionTip": "A expressão resultante em formato SQL a partir dos critérios definidos",
      "actions": "Critérios",
      "actionsTip": "Alterar a ordem da regra e definir os critérios quando esta é desencadeada"
    },
    "copyAction": {
      "description": "A fonte de dados dos valores de um campo é processada por ordem se estiver activa até que um critério válido seja despoletado ou a lista esteja completa.",
      "intersection": "Intersecção",
      "coordinates": "Coordenadas",
      "address": "Endereço",
      "preset": "Pré-definido",
      "actionText": "Ações",
      "criteriaText": "Critérios",
      "enableText": "Ativado"
    },
    "actions": {
      "hide": "Esconder",
      "required": "Exigido",
      "disabled": "Desativado"
    }
  },
  "filterPage": {
    "submitHidden": "Submeter dados de atributos para este campo, mesmo quando se encontra oculto?",
    "title": "Configurar expressão para a regra ${action}",
    "filterBuilder": "Definir ação para campo quando o registo corresponde a ${any_or_all} das expressões seguintes",
    "noFilterTip": "Utilizando as expressões apresentadas acima, defina a declaração apresentada quando a ação se encontra ativa."
  },
  "geocoderPage": {
    "setGeocoderURL": "Definir URL Geocodificador",
    "hintMsg": "Nota: Está a modificar o serviço de geocodificador, por favor, atualize quaisquer cartografias de campo de geocodificador que tenha configurado.",
    "invalidUrlTip": "O URL ${URL} é inválido ou inacessível."
  },
  "addressPage": {
    "popupTitle": "Endereço",
    "checkboxLabel": "Obter valor do Geocodificador",
    "selectFieldTitle": "Atributo:",
    "geocoderHint": "Para mudar de geocodificador, utilize o botão 'Definições de Geocodificador' nas definições gerais"
  },
  "coordinatesPage": {
    "popupTitle": "Coordenadas",
    "checkboxLabel": "Obter coordenadas",
    "coordinatesSelectTitle": "Sistema de Coordenadas:",
    "coordinatesAttributeTitle": "Atributo:",
    "mapSpatialReference": "Referência Espacial do Mapa",
    "latlong": "Latitude/Longitude"
  },
  "presetPage": {
    "popupTitle": "Pré-definido",
    "checkboxLabel": "O campo será predefinido",
    "presetValueLabel": "O atual valor de predefinição é:",
    "changePresetValueHint": "Para alterar este valor de predefinição, utilize o botão 'Definir Valores de Predefinição' nas definições gerais"
  },
  "intersectionPage": {
    "checkboxLabel": "Obter valor a prtir do campo da camada de interseção",
    "layerText": "Camadas",
    "fieldText": "Campos",
    "actionsText": "Ações",
    "addLayerLinkText": "Adicionar uma Camada"
  },
  "presetAll": {
    "popupTitle": "Definir os valores de predefinição padrão",
    "deleteTitle": "Eliminar valor de predefinição",
    "hintMsg": "Todos os campos únicos de predefinição encontram-se listados aqui. A remoção de campo de predefinição irá desativar o respetivo campo enquanto campo predefinido de todas as camadas/tabelas."
  }
});