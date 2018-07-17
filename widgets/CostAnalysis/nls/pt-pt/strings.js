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
  "_widgetLabel": "Análise de Custos (Beta)",
  "unableToFetchInfoErrMessage": "Não é possível obter serviço de geometria/detalhes de camada configurada",
  "invalidCostingGeometryLayer": "Não é possível obter 'esriFieldTypeGlobalID' em camada de geometria de orçamento.",
  "projectLayerNotFound": "Não é possível encontrar a camada de projeto configurado no mapa.",
  "costingGeometryLayerNotFound": "Não é possível encontrar a camada de geometria de orçamento configurada no mapa.",
  "projectMultiplierTableNotFound": "Não é possível encontrar tabela de custo adicional multiplicadora do projeto configurada no mapa.",
  "projectAssetTableNotFound": "Não é possível encontrar a tabela de ativos de projeto configurada no mapa.",
  "createLoadProject": {
    "createProjectPaneTitle": "Criar Projeto",
    "loadProjectPaneTitle": "Carregar Projeto",
    "projectNamePlaceHolder": "Nome do Projeto",
    "projectDescPlaceHolder": "Descrição do Projeto",
    "selectProject": "Selecionar Projeto",
    "viewInMapLabel": "Visualizar no Mapa",
    "loadLabel": "Carregar",
    "createLabel": "Criar",
    "deleteProjectConfirmationMsg": "Tem a certeza que pretende eliminar o projeto?",
    "noAssetsToViewOnMap": "O projeto selecionado não possui quaisquer ativos para visualizar no mapa.",
    "projectDeletedMsg": "Projeto eliminado com sucesso.",
    "errorInCreatingProject": "Erro ao criar projeto.",
    "errorProjectNotFound": "Projeto não Encontrado",
    "errorInLoadingProject": "Por favor, verifique se se encontra selecionado um projeto válido.",
    "errorProjectNotSelected": "Seleccione um projeto a partir da lista pendente.",
    "errorDuplicateProjectName": "O nome do projeto já existe."
  },
  "statisticsSettings": {
    "tabTitle": "Definições de estatísticas",
    "addStatisticsLabel": "Adicionar Estatística",
    "addNewStatisticsText": "Adicionar Nova Estatística",
    "deleteStatisticsText": "Eliminar Estatística",
    "moveStatisticsUpText": "Mover Estatísticas Para Cima",
    "moveStatisticsDownText": "Mover Estatísticas Para Baixo",
    "layerNameTitle": "Camada",
    "statisticsTypeTitle": "Tipo",
    "fieldNameTitle": "Campo",
    "statisticsTitle": "Rótulo",
    "actionLabelTitle": "Ações",
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
  },
  "costingInfo": {
    "noEditableLayersAvailable": "As camada(s) necessitam de ser definidas como editáveis no separador de definições de camada"
  },
  "workBench": {
    "refresh": "Atualizar",
    "noAssetAddedMsg": "Sem ativos adicionados",
    "units": "unidade(s)",
    "assetDetailsTitle": "Detalhes do Item de Ativo",
    "costEquationTitle": "Equação de Custo",
    "newCostEquationTitle": "Nova Equação",
    "defaultCostEquationTitle": "Equação Predefinida",
    "geographyTitle": "Geografia",
    "scenarioTitle": "Cenário",
    "costingInfoHintText": "<div>Pista: Utilize as seguintes palavras-chave</div><ul><li><b>{TOTALCOUNT}</b>: Utiliza o número total de ativos do mesmo tipo numa geografia</li> <li><b>{MEASURE}</b>: Utiliza o comprimento para ativo de linha e a área para ativo de polígono</li><li><b>{TOTALMEASURE}</b>: Utiliza o comprimento total para ativo de linha e a área total para ativo de polígono do mesmo tipo numa geografia</li></ul> Pode utilizar funções como:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Por favor, edite a equação de custo à medida das necessidades do seu projeto.",
    "zoomToAsset": "Efectuar Zoom para o Ativo",
    "deleteAsset": "Eliminar Ativo",
    "closeDialog": "Fechar Diálogo",
    "objectIdColTitle": "Id de Objecto",
    "costColTitle": "Custo",
    "errorInvalidCostEquation": "Equação de Custo Inválida.",
    "errorInSavingAssetDetails": "Não é possível guardar os detalhes do ativo."
  },
  "assetDetails": {
    "inGeography": " em ${geography} ",
    "withScenario": " com ${scenario}",
    "totalCostTitle": "Custo Total",
    "additionalCostLabel": "Descrição",
    "additionalCostValue": "Valor",
    "additionalCostNetValue": "Valor Líquido"
  },
  "projectOverview": {
    "assetItemsTitle": "Itens de Ativos",
    "assetStatisticsTitle": "Estatísticas de Ativos",
    "projectSummaryTitle": "Resumo do Projeto",
    "projectName": "Nome do Projeto: ${name}",
    "totalCostLabel": "Custo Total do Projeto (*):",
    "grossCostLabel": "Custo Bruto do projeto (*):",
    "roundingLabel": "* A arredondar a '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Não é possível guardar o limite do projeto na camada do projeto.",
    "unableToSaveProjectCost": "Não é possível custo(s) na camada do projeto.",
    "roundCostValues": {
      "twoDecimalPoint": "Duas Casas Decimais",
      "nearestWholeNumber": "Número Inteiro Mais Próximo",
      "nearestTen": "Dezena Mais Próxima",
      "nearestHundred": "Centena Mais Próxima",
      "nearestThousand": "Milhares Mais Próximos",
      "nearestTenThousands": "Dezenas de Milhar Mais Próximas"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Atributo do projeto",
    "projectAttributeTitle": "Editar Atributos do Projeto"
  },
  "costEscalation": {
    "costEscalationLabel": "Adicionar Valor Adicional",
    "valueHeader": "Valor",
    "addCostEscalationText": "Adicionar valor adicional",
    "deleteCostEscalationText": "Eliminar Custo adicional selecionado",
    "moveCostEscalationUpText": "Mover Custo adicional selecionado para cima",
    "moveCostEscalationDownText": "Mover Custo adicional selecionado para baixo",
    "invalidEntry": "Uma ou mais entrada(s) não são válidas.",
    "errorInSavingCostEscalation": "Não é possível guardar os detalhes de custos adicionais."
  },
  "scenarioSelection": {
    "popupTitle": "Selecionar Cenário para o Ativo",
    "regionLabel": "Geografia",
    "scenarioLabel": "Cenário",
    "noneText": "Nenhum",
    "copyFeatureMsg": "Pretende copiar os elementos selecionados?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Estatísticas Detalhadas",
    "noDetailStatisticAvailable": "Não foram adicionadas estatísticas de ativos"
  }
});