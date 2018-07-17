define({
  "configText": "Defina os Seus Grupos de Filtros Abaixo",
  "labels": {
    "groupName": "Nome do Conjunto de Filtros:",
    "groupNameTip": "Nome do filtro a partir do qual o utilizador irá selecionar.",
    "groupDesc": "Descrição:",
    "groupDescTip": "Descrição do conjunto de filtros.",
    "groupOperator": "Operado de Predefinição:",
    "groupOperatorTip": "Opção para predefinir o operador do filtro.  Caso não esteja selecionado qualquer Operador de Predefinição, o filtro utilizará a predefinição Igual.",
    "groupDefault": "Valor de Predefinição:",
    "groupDefaultTip": "Opção para selecionar um valor de uma camada existente.",
    "sameLayerAppend": "Quando uma camada é listada mais do que uma vez:",
    "sameLayerConjunc": "Anexar Utilizando:",
    "caseSearch": "Efetuar uma busca com distinção entre letras maiúsculas e minúsculas: "
  },
  "buttons": {
    "addNewGroup": "Adicione um Novo Grupo",
    "addNewGroupTip": "Adicione um novo conjunto de filtros.",
    "addLayer": "Adicionar Camada",
    "addLayerTip": "Adicione uma camada ao conjunto de filtros."
  },
  "inputs": {
    "groupName": "Dê um Nome ao Seu Grupo",
    "groupDesc": "Descrição do Seu Grupo",
    "groupDefault": "Introduza um Valor Predefinido",
    "sameLayerAny": "Corresponder a qualquer expressão",
    "sameLayerAll": "Corresponder a todas as expressões",
    "simpleMode": "Iniciar em Visualização Simples",
    "simpleModeTip": "Opção para simplificar o interface do widget configurado. Quando estão marcados, os botões de lista pendente de operador e adicionar critérios são removidos do interface.",
    "webmapAppendModeAny": "Anexar quaisquer expressões a um filtro de mapa existente",
    "webmapAppendModeAll": "Anexar todas as expressões a um filtro de mapa existente",
    "webmapAppendModeTip": "Opção para anexar o conjunto de filtros a um filtro de mapas web existente.",
    "persistOnClose": "Persistir Após Encerramento do Widget",
    "optionsMode": "Ocultar Opções de Widget",
    "optionsModeTip": "Opção para expor definições de widgets adicionais. Caso estejam selecionados, guardar e carregar filtros definidos e persistir o filtro após o widget ser encerrado são removidos do interface.",
    "optionOR": "OU",
    "optionAND": "E",
    "optionEQUAL": "IGUAL",
    "optionNOTEQUAL": "NÃO IGUAL",
    "optionGREATERTHAN": "MAIOR DO QUE",
    "optionGREATERTHANEQUAL": "MAIOR DO QUE OU IGUAL",
    "optionLESSTHAN": "MENOR DO QUE",
    "optionLESSTHANEQUAL": "MENOR QUE OU IGUAL",
    "optionSTART": "COMEÇA COM",
    "optionEND": "TERMINA COM",
    "optionLIKE": "CONTÉM",
    "optionNOTLIKE": "NÃO CONTÉM",
    "optionONORBEFORE": "ESTÁ EM OU ANTES",
    "optionONORAFTER": "ESTÁ EM OU APÓS",
    "optionNONE": "NENHUM"
  },
  "tables": {
    "layer": "Camadas",
    "layerTip": "Nome da camada tal como definido no mapa.",
    "field": "Campos",
    "fieldTip": "Campo no qual a camada será filtrada.",
    "value": "Eliminar",
    "valueTip": "Opção para utilizar os valores da lista pendente a partir da camada. Caso nenhuma camada utilize este parâmetro, uma caixa de texto simples será apresentada ao utilizador.",
    "zoom": "Zoom",
    "zoomTip": "Opção para aplicar zoom à extensão do dos elementos após o filtro ser aplicado. Apenas uma camada pode ser selecionada para aplicar zoom.",
    "action": "Excluir",
    "actionTip": "Remover camada do conjunto de filtros."
  },
  "popup": {
    "label": "Escolher um valor"
  },
  "errors": {
    "noGroups": "Necessita pelo menos de um grupo.",
    "noGroupName": "Um ou mais nomes de grupos encontram-se em falta.",
    "noDuplicates": "Um ou mais nomes de grupos encontram-se duplicados.",
    "noRows": "Precisa de uma linha na tabela, pelo menos.",
    "noLayers": "Não existem camadas no seu mapa."
  },
  "picker": {
    "description": "Utilize este formulário para encontrar um valor predefinido para este grupo.",
    "layer": "Selecionar uma Camada",
    "layerTip": "Nome da camada tal como definido no mapa web.",
    "field": "Selecionar um Campo",
    "fieldTip": "Campo a partir do qual o valor predefinido será definido.",
    "value": "Selecionar um Valor",
    "valueTip": "Valor que será o padrão do widget."
  }
});