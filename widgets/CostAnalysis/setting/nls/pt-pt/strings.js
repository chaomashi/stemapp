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
  "configText": "Definir texto de config:",
  "generalSettings": {
    "tabTitle": "Configurações gerais",
    "measurementUnitLabel": "Unidade de Medida",
    "currencyLabel": "Símbolo de Medida",
    "roundCostLabel": "Custo Arredondado",
    "projectOutputSettings": "Definições de Saída de Projeto",
    "typeOfProjectAreaLabel": "Tipo de Área de Projeto",
    "bufferDistanceLabel": "Distância do Buffer",
    "roundCostValues": {
      "twoDecimalPoint": "Duas Casas Decimais",
      "nearestWholeNumber": "Número Inteiro Mais Próximo",
      "nearestTen": "Dezena Mais Próxima",
      "nearestHundred": "Centena Mais Próxima",
      "nearestThousand": "Milhares Mais Próximos",
      "nearestTenThousands": "Dezenas de Milhar Mais Próximas"
    },
    "projectAreaType": {
      "outline": "Contorno",
      "buffer": "Buffer"
    },
    "errorMessages": {
      "currency": "Unidade monetária inválida",
      "bufferDistance": "Distância de buffer inválida",
      "outOfRangebufferDistance": "O valor tem de ser maior do que 0 e menor ou igual a 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Definições do projeto",
    "costingGeometrySectionTitle": "Definir geografia para orçamento (opcional)",
    "costingGeometrySectionNote": "Nota: Configurar esta camada permitirá ao utilizador definir equações de custos de modelos de elementos com base em geografias.",
    "projectTableSectionTitle": "Funcionalidade de Guardar/Carregar definições de projeto (opcional)",
    "projectTableSectionNote": "Nota: Configurar todas as tabelas e camadas permitirá ao utilizador guardar/carregar projeto para utilização posterior.",
    "costingGeometryLayerLabel": "Camada de Geometria de Orçamento",
    "fieldLabelGeography": "Campo para Rotular Geografia",
    "projectAssetsTableLabel": "Tabela de Ativos do Projeto",
    "projectMultiplierTableLabel": "Tabela de Custos Adicionais Multiplicadora do Projeto",
    "projectLayerLabel": "Camada de Projeto",
    "configureFieldsLabel": "Configurar Campos",
    "fieldDescriptionHeaderTitle": "Descrição de Campo",
    "layerFieldsHeaderTitle": "Campo de Camada",
    "selectLabel": "Seleccionar",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} já se encontra selecionada",
      "invalidConfiguration": "Por favor, selecione ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Camada(s) de poligono(s) com as seguintes condições serão exibidas: <br/> <li>\tA camada tem de ter funcionalidade de â€œConsultaâ€</li><li>\tA camada tem de ter um campo GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>As strings e os campos numéricos da â€œCamada de Geometria de Custosâ€ será exibida no menu pendente â€œCampo para Rotular Geografiaâ€.</p>",
    "projectAssetsTableHelp": "<p>Tabela(s) com as seguintes condições serão exibidas: <br/> <li>A tabela tem de ter funcionalidades de edição, nomeadamente, â€œCriarâ€, â€œEliminarâ€ e â€œAtualizarâ€</li>    <li>A tabela tem de ter seis campos com o nome e tipo de dados exatos:</li><ul><li>\tAssetGUID (tipo de campo GUID)</li><li>\tCostEquation (tipo de campo String)</li><li>\tCenário (tipo de campo String)</li><li>\tTemplateName (tipo de campo String)</li><li>    GeographyGUID (tipo de campo GUID)</li><li>\tProjectGUID (tipo de campo GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Tabela(s) com as seguintes condições serão exibidas: <br/> <li>A tabela tem de ter funcionalidades de edição, nomeadamente, â€œCriarâ€, â€œEliminarâ€ e â€œAtualizarâ€</li>    <li>A tabela tem de ter seis campos com o nome e tipo de dados exatos:</li><ul><li>\tDescrição (tipo de campo String)</li><li>\tTipo (tipo de campo String)</li><li>\tValor (tipo de campo Float/Double)</li><li>\tCostindex (tipo de campo Inteiro)</li><li>   \tProjectGUID (tipo de campo GUID))</li></ul> </p>",
    "projectLayerHelp": "<p>A(s) camada(s) de polígono com as seguintes condições serão exibidas: <br/> <li>A camada tem de ter funcionalidades de edição, nomeadamente, â€œCriarâ€, â€œEliminarâ€ e â€œAtualizarâ€</li>    <li>A camada tem de ter seis campos com o nome e tipo de dados exatos:</li><ul><li>ProjectName (tipo de campo String)</li><li>Descrição (tipo de campo String)</li><li>Totalassetcost (tipo de campo Float/Double)</li><li>Grossprojectcost (tipo de campo Float/Double)</li><li>GlobalID (tipo de campo GlobalID)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Configurações de Camada",
    "layerNameHeaderTitle": "Nome da camada",
    "layerNameHeaderTooltip": "Lista de camadas no mapa",
    "EditableLayerHeaderTitle": "Editável",
    "EditableLayerHeaderTooltip": "Incluir camada e respetivos modelos no widget de orçamento",
    "SelectableLayerHeaderTitle": "Selecionável",
    "SelectableLayerHeaderTooltip": "A geometria do elemento pode ser utilizada para gerar um novo item de custo",
    "fieldPickerHeaderTitle": "Project ID (opcional)",
    "fieldPickerHeaderTooltip": "Campo opcional (do tipo string) onde armazenar a Project ID",
    "selectLabel": "Seleccionar",
    "noAssetLayersAvailable": "Não foi encontrada quaisquer camadas de ativos no mapa web selecionado",
    "disableEditableCheckboxTooltip": "Esta camada não tem funcionalidades de edição",
    "missingCapabilitiesMsg": "Esta camada tem as seguintes funcionalidades em falta:",
    "missingGlobalIdMsg": "Esta camada não possui campo GlobalId",
    "create": "Criar",
    "update": "Atualizar",
    "delete": "Excluir"
  },
  "costingInfo": {
    "tabTitle": "Info de Orçamento",
    "proposedMainsLabel": "Circuitos Propostos",
    "addCostingTemplateLabel": "Adicionar Modelo de Orçamento",
    "manageScenariosTitle": "Gerir Cenário",
    "featureTemplateTitle": "Modelo de Elemento",
    "costEquationTitle": "Equação de Custo",
    "geographyTitle": "Geografia",
    "scenarioTitle": "Cenário",
    "actionTitle": "Ações",
    "scenarioNameLabel": "Nome do Cenário",
    "addBtnLabel": "Adicionar",
    "srNoLabel": "Não.",
    "deleteLabel": "Excluir",
    "duplicateScenarioName": "Nome de cenário duplicado",
    "hintText": "<div>Pista: Utilize as seguintes palavras-chave</div><ul><li><b>{TOTALCOUNT}</b>: Utiliza o número total de ativos do mesmo tipo numa geografia</li><li><b>{MEASURE}</b>: Utiliza o comprimento para ativo de linha e área para ativo de polígono</li><li><b>{TOTALMEASURE}</b>: Utiliza o comprimento para ativo de linha e área para ativo de polígono do mesmo tipo numa geografia</li></ul>Pode utilizar funções como:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Por favor, edite a equação de custo à medida das necessidades do seu projeto.",
    "noneValue": "Nenhum",
    "requiredCostEquation": "Equação de custo inválida para ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Existe uma entrada de modelo duplicada para ${layerName} : ${templateName}",
    "defaultEquationRequired": "É necessária uma equação predefinida para ${layerName} : ${templateName}",
    "validCostEquationMessage": "Por favor, introduza uma equação de custo válida",
    "costEquationHelpText": "Por favor, edite a equação de custo à medida das necessidades do seu projeto",
    "scenarioHelpText": "Por favor, selecione o cenário à medida das necessidades do seu projeto",
    "copyRowTitle": "Copiar Linha",
    "noTemplateAvailable": "Por favor, adicione pelo menos um modelo a ${layerName}",
    "manageScenarioLabel": "Gerir Cenário",
    "noLayerMessage": "Por favor, introduza pelo menos uma camada a ${tabName}",
    "noEditableLayersAvailable": "As camada(s) necessitam de ser definidas como editáveis no separador de definições de camada"
  },
  "statisticsSettings": {
    "tabTitle": "Definições de estatísticas",
    "addStatisticsLabel": "Adicionar Estatística",
    "fieldNameTitle": "Campo",
    "statisticsTitle": "Rótulo",
    "addNewStatisticsText": "Adicionar Nova Estatística",
    "deleteStatisticsText": "Eliminar Estatística",
    "moveStatisticsUpText": "Mover Estatísticas Para Cima",
    "moveStatisticsDownText": "Mover Estatísticas Para Baixo",
    "selectDeselectAllTitle": "Selecionar Tudo"
  },
  "statisticsType": {
    "countLabel": "Contagem",
    "averageLabel": "Média",
    "maxLabel": "Máximo",
    "minLabel": "Mínimo",
    "summationLabel": "Somatório",
    "areaLabel": "Área",
    "lengthLabel": "Comprimento"
  }
});