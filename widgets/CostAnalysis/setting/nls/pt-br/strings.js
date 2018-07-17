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
  "configText": "Definir texto de configuração:",
  "generalSettings": {
    "tabTitle": "Configurações gerais",
    "measurementUnitLabel": "Unidades de Medição",
    "currencyLabel": "Símbolo de Medição",
    "roundCostLabel": "Arredondar Custo",
    "projectOutputSettings": "Configurações da Saída do Projeto",
    "typeOfProjectAreaLabel": "Tipo de Área do Projeto",
    "bufferDistanceLabel": "Distância do Buffer",
    "roundCostValues": {
      "twoDecimalPoint": "Dois Pontos Decimais",
      "nearestWholeNumber": "Número Inteiro Mais Próximo",
      "nearestTen": "Dez mais próximo",
      "nearestHundred": "Cem mais próximo",
      "nearestThousand": "Milhares mais próximos",
      "nearestTenThousands": "Dez Milhares mais próximos"
    },
    "projectAreaType": {
      "outline": "Contorno",
      "buffer": "Buffer"
    },
    "errorMessages": {
      "currency": "Unidade de moeda corrente inválida",
      "bufferDistance": "Distância de buffer inválida",
      "outOfRangebufferDistance": "O valor deve ser maior que 0 e menor ou igual a 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Configurações do projeto",
    "costingGeometrySectionTitle": "Definir geografia para custo (opcional)",
    "costingGeometrySectionNote": "Nota: Configurar esta camada permitirá ao usuário configurar equações de custo dos modelos de feição baseado em geografias.",
    "projectTableSectionTitle": "Habilidade de Salvar/Carregar configurações do projeto (opcional)",
    "projectTableSectionNote": "Nota:Configurar todas as tabelas e camadas permitirá ao usuário salvar/carregar o projeto para uso posterior.",
    "costingGeometryLayerLabel": "Camada da Geometria de Custo",
    "fieldLabelGeography": "Campo para Geografia de Rótulo",
    "projectAssetsTableLabel": "Tabela de Recursos do Projeto",
    "projectMultiplierTableLabel": "Tabela do Custo de Multiplicador Adicional do Projeto",
    "projectLayerLabel": "Camada de Projeto",
    "configureFieldsLabel": "Configurar Campos",
    "fieldDescriptionHeaderTitle": "Descrição do Campo",
    "layerFieldsHeaderTitle": "Campo de Camada",
    "selectLabel": "Selecionar",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} já foi selecionado",
      "invalidConfiguration": "Selecione ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Camadas de polígono com as seguintes condições serão mostradas: <br/> <li> A camada deve ter o recurso â€œConsultarâ€</li><li> A camada deve ter um campo GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Campos de string e numéricos de â€œCamada da Geometria de Custoâ€ selecionada serão exibidos na lista suspensa â€œCampo para Geografia do Rótuloâ€ .</p>",
    "projectAssetsTableHelp": "<p>Tabelas com as seguintes condições serão mostradas: <br/> <li>A tabela deve ter recursos de edição, isto é â€œCriarâ€, â€œExcluirâ€ e â€œAtualizarâ€</li>    <li>A tabela deve ter seis campos com nome e tipo de dados exato:</li><ul><li>\tAssetGUID (campo de tipo GUID)</li><li>\tCostEquation (campo de tipo String)</li><li>\tCenário (campo de tipo String )</li><li>\tTemplateName (campo de tipo String)</li><li>    GeographyGUID (campo de tipo GUID)</li><li>\tProjectGUID (campo de tipo GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Tabelas com as seguintes condições serão mostradas: <br/> <li>A tabela deve ter recursos de edição, isto é â€œCriarâ€, â€œExcluirâ€ e â€œAtualizarâ€</li>    <li>A tabela deve ter seis campos com nome e tipo de dados exato:</li><ul><li>\tDescrição (campo de tipo String)</li><li>\tTipo (campo de tipo String)</li><li>\tValor (campo de tipo Flutuante/Duplo)</li><li>\tCostindex (campo de tipo Inteiro)</li><li>   \tProjectGUID (campo de tipo GUID))</li></ul> </p>",
    "projectLayerHelp": "<p>Camadas de polígonos com as seguintes condições serão mostradas: <br/> <li>A camada deve ter recursos de edição, isto é, â€œCriarâ€, â€œExcluirâ€ e â€œAtualizarâ€</li>    <li>A camada deve ter cinco campos com nome e tipo de dados exatos:</li><ul><li>ProjectName (campo de tipo String)</li><li>Descrição (campo de tipo String)</li><li>Totalassetcost (campo de tipo Flutuante/Duplo)</li><li>Grossprojectcost (campo de tipo Flutuante/Duplo)</li><li>GlobalID (campo de tipo GlobalID)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Configurações da camada",
    "layerNameHeaderTitle": "Nome da Camada",
    "layerNameHeaderTooltip": "Lista de camadas no mapa",
    "EditableLayerHeaderTitle": "Editável",
    "EditableLayerHeaderTooltip": "Incluir camada e seus modelos no widget de custo",
    "SelectableLayerHeaderTitle": "Selecionável",
    "SelectableLayerHeaderTooltip": "A geometria da feição pode ser utilizada para gerar um novo item de custo",
    "fieldPickerHeaderTitle": "ID de Projeto (opcional)",
    "fieldPickerHeaderTooltip": "Campo opcional (de tipo string) para armazenar o ID de Projeto em",
    "selectLabel": "Selecionar",
    "noAssetLayersAvailable": "Nenhuma camada de recurso localizada no mapa da web selecionado",
    "disableEditableCheckboxTooltip": "Esta camada não tem nenhum recurso de edição",
    "missingCapabilitiesMsg": "Esta camada está sem os seguintes recursos:",
    "missingGlobalIdMsg": "Esta camada não tem o campo de GlobalId",
    "create": "Criar",
    "update": "Atualizar",
    "delete": "Excluir"
  },
  "costingInfo": {
    "tabTitle": "Info de Custo",
    "proposedMainsLabel": "Principais Propostos",
    "addCostingTemplateLabel": "Adicionar Modelo de Custo",
    "manageScenariosTitle": "Gerenciar Cenários",
    "featureTemplateTitle": "Modelo de Feição",
    "costEquationTitle": "Equação de Custo",
    "geographyTitle": "Geografia",
    "scenarioTitle": "Cenário",
    "actionTitle": "Ações",
    "scenarioNameLabel": "Nome de Cenário",
    "addBtnLabel": "Adicionar",
    "srNoLabel": "Não.",
    "deleteLabel": "Excluir",
    "duplicateScenarioName": "Nome de cenário duplicado",
    "hintText": "<div>Sugestão: Utilize as palavras-chaves seguintes</div><ul><li><b>{TOTALCOUNT}</b>: Utilize o número total do mesmo tipo de recurso em uma geografia</li> <li><b>{MEASURE}</b> Utilize o comprimento do recurso de linha e área do recurso de polígono</li><li><b>{TOTALMEASURE}</b>: Utilize o comprimento total do recurso de linha e área do recurso de polígono do mesmo tipo em uma geografia</li></ul> Você pode utilizar funções como:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Edite a equação de custo pela necessidade do seu projeto.",
    "noneValue": "Nenhum",
    "requiredCostEquation": "Equação de custo inválida para ${layerName}: ${templateName}",
    "duplicateTemplateMessage": "A entrada de modelo duplicada existe para ${layerName}: ${templateName}",
    "defaultEquationRequired": "A equação padrão é exigida ${layerName}: ${templateName}",
    "validCostEquationMessage": "Insira equação de custo válida",
    "costEquationHelpText": "Edite a equação de custo pela necessidade do seu projeto",
    "scenarioHelpText": "Selecione o cenário pela necessidade do seu projeto",
    "copyRowTitle": "Copiar Linha",
    "noTemplateAvailable": "Adicione pelo menos um modelo para ${layerName}",
    "manageScenarioLabel": "Gerenciar cenário",
    "noLayerMessage": "Insira pelo menos uma camada em ${tabName}",
    "noEditableLayersAvailable": "As camadas precisam para ser marcadas como editáveis em guia de configurações da camada"
  },
  "statisticsSettings": {
    "tabTitle": "Configurações de estatística",
    "addStatisticsLabel": "Adicionar Estatísticas",
    "fieldNameTitle": "Campo",
    "statisticsTitle": "Rótulo",
    "addNewStatisticsText": "Adicionar Novas Estatísticas",
    "deleteStatisticsText": "Excluir Estatísticas",
    "moveStatisticsUpText": "Mover Estatísticas Para Cima",
    "moveStatisticsDownText": "Mover Estatísticas Para Baixo",
    "selectDeselectAllTitle": "Selecionar Tudo"
  },
  "statisticsType": {
    "countLabel": "Contagem",
    "averageLabel": "Média",
    "maxLabel": "Máximo",
    "minLabel": "Mínimo",
    "summationLabel": "Adição",
    "areaLabel": "Área",
    "lengthLabel": "Comprimento"
  }
});