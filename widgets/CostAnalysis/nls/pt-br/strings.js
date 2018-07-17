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
  "_widgetLabel": "Análise de Custo Beta",
  "unableToFetchInfoErrMessage": "Não foi possível buscar detalhes do serviço de geometria/camada configurada",
  "invalidCostingGeometryLayer": "Não foi possível obter 'esriFieldTypeGlobalID' na camada da geometria de custo.",
  "projectLayerNotFound": "Não foi possível localizar a camada de projeto configurada no mapa.",
  "costingGeometryLayerNotFound": "Não foi possível localizar a camada da geometria de custo no mapa.",
  "projectMultiplierTableNotFound": "Não foi possível localizar a tabela de custo adicional de multiplicador do projeto configurada no mapa.",
  "projectAssetTableNotFound": "Não foi possível localizar a tabela de recurso do projeto configurada no mapa.",
  "createLoadProject": {
    "createProjectPaneTitle": "Criar Projeto",
    "loadProjectPaneTitle": "Carregar Projetos",
    "projectNamePlaceHolder": "Nome de Projeto",
    "projectDescPlaceHolder": "Descrição do Projeto",
    "selectProject": "Selecionar Projeto",
    "viewInMapLabel": "Visualizar no Mapa",
    "loadLabel": "Carregar",
    "createLabel": "Criar",
    "deleteProjectConfirmationMsg": "Tem certeza que deseja excluir o projeto?",
    "noAssetsToViewOnMap": "O projeto selecionado não tem quaisquer recursos para visualizar no mapa.",
    "projectDeletedMsg": "Projeto excluído com sucesso.",
    "errorInCreatingProject": "Erro ao criar projeto.",
    "errorProjectNotFound": "Projeto não localizado.",
    "errorInLoadingProject": "Verifique se projeto válido está selecionado.",
    "errorProjectNotSelected": "Selecione um projeto a partir da lista suspensa",
    "errorDuplicateProjectName": "Nome do projeto já existe."
  },
  "statisticsSettings": {
    "tabTitle": "Configurações de estatística",
    "addStatisticsLabel": "Adicionar Estatísticas",
    "addNewStatisticsText": "Adicionar Novas Estatísticas",
    "deleteStatisticsText": "Excluir Estatísticas",
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
    "summationLabel": "Adição",
    "areaLabel": "Área",
    "lengthLabel": "Comprimento"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "As camadas precisam ser marcadas como editáveis na guia de configurações da camada"
  },
  "workBench": {
    "refresh": "Atualizar",
    "noAssetAddedMsg": "Nenhum recurso adicionado",
    "units": "unidades",
    "assetDetailsTitle": "Detalhes do Item de Recurso",
    "costEquationTitle": "Equação de Custo",
    "newCostEquationTitle": "Nova Equação",
    "defaultCostEquationTitle": "Equação Padrão",
    "geographyTitle": "Geografia",
    "scenarioTitle": "Cenário",
    "costingInfoHintText": "<div>Sugestão: Utilize as palavras-chaves seguintes</div><ul><li><b>{TOTALCOUNT}</b>: Utilize o número total do mesmo tipo de recurso em uma geografia</li> <li><b>{MEASURE}</b> Utilize o comprimento do recurso de linha e área do recurso de polígono</li><li><b>{TOTALMEASURE}</b>: Utilize o comprimento total do recurso de linha e área do recurso de polígono do mesmo tipo em uma geografia</li></ul> Você pode utilizar funções como:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Edite a equação de custo pela necessidade do seu projeto.",
    "zoomToAsset": "Zoom no Recurso",
    "deleteAsset": "Excluir Recurso",
    "closeDialog": "Fechar diálogo",
    "objectIdColTitle": "Object Id",
    "costColTitle": "Custo",
    "errorInvalidCostEquation": "Equação de Custo Inválida.",
    "errorInSavingAssetDetails": "Não foi possível salvar detalhes do recurso."
  },
  "assetDetails": {
    "inGeography": " na ${geography} ",
    "withScenario": " com ${scenario}",
    "totalCostTitle": "Custo Total",
    "additionalCostLabel": "Descrição",
    "additionalCostValue": "Valor",
    "additionalCostNetValue": "Valor Líquido"
  },
  "projectOverview": {
    "assetItemsTitle": "Itens de Recurso",
    "assetStatisticsTitle": "Estatística de Recurso",
    "projectSummaryTitle": "Resumo do Projeto",
    "projectName": "Nome do Projeto: ${name}",
    "totalCostLabel": "Custo Total do Projeto (*):",
    "grossCostLabel": "Custo Bruto do Projeto (*):",
    "roundingLabel": "* Arredondando para '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Não foi possível salvar o limite do projeto na camada de projeto.",
    "unableToSaveProjectCost": "Não foi possível salvar custos na camada de projeto.",
    "roundCostValues": {
      "twoDecimalPoint": "Dois Pontos Decimais",
      "nearestWholeNumber": "Número Inteiro Mais Próximo",
      "nearestTen": "Dez mais próximo",
      "nearestHundred": "Cem mais próximo",
      "nearestThousand": "Milhares mais próximos",
      "nearestTenThousands": "Dez Milhares mais próximos"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Atributo de Projeto",
    "projectAttributeTitle": "Editar Atributos de Projeto"
  },
  "costEscalation": {
    "costEscalationLabel": "Adicionar Custo Adicional",
    "valueHeader": "Valor",
    "addCostEscalationText": "Inserir custo adicional",
    "deleteCostEscalationText": "Excluir Custo adicional selecionado",
    "moveCostEscalationUpText": "Mover Custo adicional selecionado para cima",
    "moveCostEscalationDownText": "Mover Custo adicional selecionado para baixo",
    "invalidEntry": "Uma ou mais entradas são inválidas.",
    "errorInSavingCostEscalation": "Não foi possível salvar detalhes de custo adicional."
  },
  "scenarioSelection": {
    "popupTitle": "Selecionar Cenário do Recurso",
    "regionLabel": "Geografia",
    "scenarioLabel": "Cenário",
    "noneText": "Nenhum",
    "copyFeatureMsg": "Deseja copiar as feições selecionadas?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Estatísticas de Detalhes",
    "noDetailStatisticAvailable": "Nenhuma estatística de recurso adicionada"
  }
});