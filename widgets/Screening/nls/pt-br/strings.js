///////////////////////////////////////////////////////////////////////////
// Copyright © 2016 Esri. All Rights Reserved.
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
  "_widgetLabel": "Exibição",
  "geometryServicesNotFound": "Serviço de geometria não disponível.",
  "unableToDrawBuffer": "Não foi possível desenhar o buffer. Tente novamente.",
  "invalidConfiguration": "Configuração inválida.",
  "clearAOIButtonLabel": "Começar Novamente",
  "noGraphicsShapefile": "O shapefile transferido não contém nenhum gráfico.",
  "zoomToLocationTooltipText": "Zoom na localização",
  "noGraphicsToZoomMessage": "Nenhum Gráfico localizado para ampliar.",
  "placenameWidget": {
    "placenameLabel": "Procurar um local"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Selecionar modo de desenho",
    "toggleSelectability": "Clique para alternar a opção de seleção",
    "chooseLayerTitle": "Escolha a camada selecionável",
    "selectAllLayersText": "Selecionar Tudo",
    "layerSelectionWarningTooltip": "Pelo menos uma camada deve ser selecionada para criar AOI"
  },
  "shapefileWidget": {
    "shapefileLabel": "Transfira um shapefile compactado",
    "uploadShapefileButtonText": "Carregar",
    "unableToUploadShapefileMessage": "Não é possível transferir o Shapefile."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Defina um ponto inicial",
    "addButtonTitle": "Adicionar",
    "deleteButtonTitle": "Remover",
    "mapTooltipForStartPoint": "Clique no mapa para definir um ponto inicial",
    "mapTooltipForUpdateStartPoint": "Clique no mapa para atualizar o ponto inicial",
    "locateText": "Localizar",
    "locateByMapClickText": "Selecione as coordenadas inicial",
    "enterBearingAndDistanceLabel": "Insira os valores de direção e distância do ponto inicial",
    "bearingTitle": "Direção",
    "distanceTitle": "Distância",
    "planSettingTooltip": "Configurações de Plano",
    "invalidLatLongMessage": "Insira valores válidos."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Distância de buffer (opcional)",
    "bufferInputLabel": "Mostrar os resultados dentro de"
  },
  "traverseSettings": {
    "bearingLabel": "Direção",
    "lengthLabel": "Comprimento",
    "addButtonTitle": "Adicionar",
    "deleteButtonTitle": "Remover"
  },
  "planSettings": {
    "expandGridTooltipText": "Expandir grade",
    "collapseGridTooltipText": "Recolher grade",
    "directionUnitLabelText": "Unidade de Direções",
    "distanceUnitLabelText": "Unidades de Comprimento e Distância",
    "planSettingsComingSoonText": "Em Breve"
  },
  "newTraverse": {
    "invalidBearingMessage": "Direção inválida.",
    "invalidLengthMessage": "Comprimento Inválido.",
    "negativeLengthMessage": "Comprimento Negativo"
  },
  "reportsTab": {
    "aoiAreaText": "Área AOI",
    "downloadButtonTooltip": "Download",
    "printButtonTooltip": "Imprimir",
    "uploadShapefileForAnalysisText": "Transferir Shapefile para incluir na análise",
    "uploadShapefileForButtonText": "Procurar",
    "downloadLabelText": "Selecionar Formato :",
    "downloadBtnText": "Download",
    "noDetailsAvailableText": "Nenhum resultado encontrado",
    "featureCountText": "Contagem",
    "featureAreaText": "Área",
    "featureLengthText": "Comprimento",
    "attributeChooserTooltip": "Escolher atributos para exibir",
    "csv": "CSV",
    "filegdb": "Arquivo Geodatabase",
    "shapefile": "Shapefile",
    "noFeaturesFound": "Nenhum resultado localizado para formato de arquivo selecionado",
    "selectReportFieldTitle": "Selecionar campos",
    "noFieldsSelected": "Nenhum campo selecionado",
    "intersectingFeatureExceedsMsgOnCompletion": "A contagem de registro máxima alcançou uma ou mais camadas.",
    "unableToAnalyzeText": "Não é possível analisar, a contagem de registro máxima foi alcançada.",
    "errorInPrintingReport": "Não é possível imprimir o relatório. Verifique se as configurações de relatório são válidas.",
    "aoiInformationTitle": "Informações de Área de Interesse (AOI)",
    "summaryReportTitle": "Resumo",
    "notApplicableText": "Não Aplicável",
    "downloadReportConfirmTitle": "Confirmar download",
    "downloadReportConfirmMessage": "Tem certeza que deseja baixar?",
    "noDataText": "Sem Dados",
    "createReplicaFailedMessage": "Falha na operação de download das camadas seguintes: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Falha na operação de download.",
    "printLayoutLabelText": "Layout",
    "printBtnText": "Imprimir",
    "printDialogHint": "Anotação: O título de relatório e comentários podem ser editados na visualização do relatório.",
    "unableToDownloadFileGDBText": "Arquivo Geodatabase não pode ser baixado para AOI contendo locais de ponto ou de linha",
    "unableToDownloadShapefileText": "Shapefile não pode ser baixado para AOI contendo locais de ponto ou de linha",
    "analysisUnitLabelText": "Mostrar resultados em:",
    "analysisUnitButtonTooltip": "Escolher unidades para análise",
    "analysisCloseBtnText": "Fechar",
    "feetUnit": "Pés / Pés Quadrados",
    "milesUnit": "Milhas / Acres",
    "metersUnit": "Metros / Metros Quadrados",
    "kilometersUnit": "Quilômetros / Quilômetros Quadrados",
    "hectaresUnit": "Quilômetros / Hectares",
    "hectaresAbbr": "hectares",
    "layerNotVisibleText": "Não foi possível analisar, a camada está desativada ou fora de escala do intervalo de visibilidade.",
    "refreshBtnTooltip": "Atualizar relatório",
    "featureCSVAreaText": "Área de Intersecção",
    "featureCSVLengthText": "Comprimento de Intersecção",
    "errorInFetchingPrintTask": "Erro ao procura informações da tarefa de impressão. Tente novamente."
  }
});