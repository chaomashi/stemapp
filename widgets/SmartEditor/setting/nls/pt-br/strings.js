define({
  "layersPage": {
    "allLayers": "Todas as Camadas",
    "title": "Selecione um modelo para criar feições",
    "generalSettings": "Configurações Gerais",
    "layerSettings": "Configurações da Camada",
    "presetValueText": "Definir Valores Pré-Definidos",
    "geocoderSettingsText": "Configurações do Geocodificador",
    "editDescription": "Fornecer texto de visualização para o painel de editção",
    "editDescriptionTip": "Este texto é exibido sobre o seletor de Modelos, mantenha em branco para nenhum texto.",
    "promptOnSave": "Solicite para salvar edições não salvas quando o formulário estiver fechado ou alternado para o próximo registro.",
    "promptOnSaveTip": "Exibe um lembrete quando o usuário clica em fechar ou navega para o próximo registro editável quando a feição atual tiver edições não salvas.",
    "promptOnDelete": "Exige confirmação ao excluir um registro.",
    "promptOnDeleteTip": "Exibe um lembrete quando o usuário clica em excluir para confirmar a ação.",
    "removeOnSave": "Remove a feição da seleção ao salvar.",
    "removeOnSaveTip": "Opção para remover a feição do conjunto de seleção quando o registro for salvo.  Se ele for o único registro selecionado, o painel é trocado de volta para a página do modelo.",
    "useFilterEditor": "Utilizar filtro do modelo de feição",
    "useFilterEditorTip": "Opção para utilizar o seletor do Modelo de Filtro que fornece o recurso de visualizar o modelo de uma camada ou procurar modelos pelo nome.",
    "displayShapeSelector": "Mostrar opções de desenho",
    "displayShapeSelectorTip": "Opção para mostrar uma lista de opções de desenho válidas para o modelo selecionado.",
    "displayPresetTop": "Exibir lista de valores pré-definidos no topo",
    "displayPresetTopTip": "Opção para mostrar a lista de valores pré-definidos acima do seletor de modelos.",
    "listenToGroupFilter": "Aplica valores de filtro a partir do widget Filtrar Grupo para os campos Preset",
    "listenToGroupFilterTip": "Quando um filtro for aplicado no widget Filtrar Grupo, aplique o valor para um campo correspondente na lista de valor do Preset.",
    "keepTemplateActive": "Mantenha o modelo selecionado ativo",
    "keepTemplateActiveTip": "Quando o seletor de modelo for exibido, se um modelo foi selecionado anteriormente, selecione-o novamente.",
    "geometryEditDefault": "Habilitar edição de geometria por padrão",
    "autoSaveEdits": "Salva a edição automaticamente",
    "enableAttributeUpdates": "Botão de atualização de Mostrar Ações do Atributo quando a geometria de edição está ativa",
    "layerSettingsTable": {
      "allowDelete": "Permitir Exclusão",
      "allowDeleteTip": "Opção para permitir que o usuário exclua uma feição; desabilitado se a camada não suportar exclusão",
      "edit": "Editável",
      "editTip": "Opção para incluir a camada no widget",
      "label": "Camada",
      "labelTip": "Nome da camada como definido no mapa",
      "update": "Desabilitar Edição de Geometria",
      "updateTip": "Opção para desabilitar o recurso de mover a geometria uma vez posicionada ou mover a geometria em uma feição existente",
      "allowUpdateOnly": "Atualizar Somente",
      "allowUpdateOnlyTip": "Opção para permitir somente a modificação de feições existentes, verificada por padrão e desativada se a camada não suportar a criação de novas feições",
      "fieldsTip": "Modificar os campos a serem editados e definir Atributos Inteligentes",
      "actionsTip": "Opção para editar campos ou acessar camadas/tabelas relacionadas",
      "description": "Descrição",
      "descriptionTip": "Opção para inserir texto para exibir na parte superior da página de atributos.",
      "relationTip": "Visualizar tabelas e camadas relacionadas"
    },
    "editFieldError": "As modificações de campo e atributos Inteligentes não estão disponíveis para camadas que não são editáveis",
    "noConfigedLayersError": "O Editor Inteligente exige um ou mais camadas editáveis"
  },
  "editDescriptionPage": {
    "title": "Defina o texto de visão geral dos atributos para <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Configure campos para <b>${layername}</b>",
    "copyActionTip": "Ações do Atributo",
    "description": "Utilize o botão de edição de Ações para ativar Atributos Inteligentes em uma camada. Os Atributos Inteligentes podem exigir, ocultar ou desativar um campo com base em valores em outros campos. Utilize o botão de cópia de Ações para ativar e definir a fonte do valor de campo por intersecção, endereço, coordenadas e pré-definição.",
    "fieldsNotes": "* é um campo exigido.  Se você desmarcar Exibir para este campo e a edição do modelo não preencher este valor de campo, você não poderá salvar um novo registro.",
    "smartAttachmentText": "Configurar a ação Anexos inteligentes",
    "smartAttachmentPopupTitle": "Configurar anexos inteligentes para <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Exibir",
      "displayTip": "Determinar se o campo não é visível",
      "edit": "Editável",
      "editTip": "Verifique se o campo está presente no formulário de atributo",
      "fieldName": "Nome",
      "fieldNameTip": "Nome do campo definido no banco de dados",
      "fieldAlias": "Nome Alternativo",
      "fieldAliasTip": "Nome do campo definido no mapa",
      "canPresetValue": "Ajustar",
      "canPresetValueTip": "Opção para mostrar o campo na lista do campo pré-configurado e permitir ao usuário configurar o valor antes da edição",
      "actions": "Ações",
      "actionsTip": "Alterar a ordem dos campos ou configurar os Atributos Inteligentes"
    },
    "smartAttSupport": "Atributos Inteligentes não são suportados em campos do banco de dados exigidos"
  },
  "actionPage": {
    "title": "Configurar as Ações do Atributo para <b>${fieldname}</b>",
    "description": "As ações estão sempre desativadas a menos que você especifique os critérios nos quais elas serão ativadas.  As ações são processadas em ordem e somente uma ação será ativada por campo.  Utilize o botão Editar Critérios para definir os critérios.",
    "actionsSettingsTable": {
      "rule": "Ação",
      "ruleTip": "Ação executada quando o critério é satisfatório",
      "expression": "Expressão",
      "expressionTip": "A expressão resultante no formato SQL a partir dos critérios definidos",
      "actions": "Critérios",
      "actionsTip": "Alterar a ordem da regra e definir os critérios quando ela for ativada"
    },
    "copyAction": {
      "description": "A fonte do valor de campo é processada para que se ativada até que um critério válido seja ativado ou a lista seja completada. Utilize o botão Editar Critérios para definir os critérios.",
      "intersection": "Intersecção",
      "coordinates": "Coordenadas",
      "address": "Endereço",
      "preset": "Ajustar",
      "actionText": "Ações",
      "criteriaText": "Critérios",
      "enableText": "Habilitado"
    },
    "actions": {
      "hide": "Ocultar",
      "required": "Exigido",
      "disabled": "Desabilitado"
    }
  },
  "filterPage": {
    "submitHidden": "Enviar dados de atributos para este campo até quando estiver oculto?",
    "title": "Configure a expressão para a regra ${action}",
    "filterBuilder": "Configure a ação no campo quando o registro corresponder ${any_or_all} das seguintes expressões",
    "noFilterTip": "Utilizando as ferramentas abaixo, defina a declaração para quando a ação estiver ativa."
  },
  "geocoderPage": {
    "setGeocoderURL": "Configurar URL do Geocodificador",
    "hintMsg": "Nota: Você está alterando o serviço do geocodificador, certifique-se de atualizar todos os mapeamentos de campo do geocodificador que você configurou.",
    "invalidUrlTip": "A URL ${URL} é inválida ou inacessível."
  },
  "addressPage": {
    "popupTitle": "Endereço",
    "checkboxLabel": "Obter valor do Geocodificador",
    "selectFieldTitle": "Atributo:",
    "geocoderHint": "Para alterar o geocodificador, vá até o botão 'Configurações do Geocodificador' em configurações gerais"
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
    "popupTitle": "Ajustar",
    "checkboxLabel": "Os campos serão pré-configurados",
    "presetValueLabel": "O valor pré-definido é:",
    "changePresetValueHint": "Para alterar este valor pré-definido, vá até o botão \"Definir valores pré-definidos\" em configurações gerais"
  },
  "intersectionPage": {
    "checkboxLabel": "Obter valor de campo a partir da camada de intersecção",
    "layerText": "Camadas",
    "fieldText": "Campos",
    "actionsText": "Ações",
    "addLayerLinkText": "Adicionar uma Camada"
  },
  "presetAll": {
    "popupTitle": "Definir os valores pré-definidos padrão",
    "deleteTitle": "Excluir valor pré-definido",
    "hintMsg": "Todos os nomes de campo pré-configurados exclusivos estão listados aqui. A remoção do campo pré-configurado desativará o respectivo campo como pré-configurado de todas as camadas/tabelas."
  }
});