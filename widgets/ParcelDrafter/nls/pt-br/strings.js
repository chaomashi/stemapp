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
  "_widgetLabel": "Drafter de Lotes",
  "newTraverseButtonLabel": "Iniciar Nova Transversal",
  "invalidConfigMsg": "Configuração Inválida",
  "geometryServiceURLNotFoundMSG": "Não é possível obter URL de Serviço de Geometria",
  "editTraverseButtonLabel": "Editar Transversal",
  "mapTooltipForStartNewTraverse": "Selecione um ponto no mapa, ou digite abaixo, para iniciar",
  "mapTooltipForEditNewTraverse": "Selecione um lote para editar",
  "mapTooltipForUpdateStartPoint": "Clique para atualizar ponto inicial",
  "mapTooltipForScreenDigitization": "Clique para adicionar ponto de lotes",
  "mapTooltipForRotate": "Arraste para rotacionar",
  "mapTooltipForScale": "Arraste para dimensionar",
  "backButtonTooltip": "Voltar",
  "newTraverseTitle": "Nova Transversal",
  "editTraverseTitle": "Editar Transversal",
  "clearingDataConfirmationMessage": "As alterações serão descartadas, deseja prosseguir?",
  "unableToFetchParcelMessage": "Não é possível buscar lotes.",
  "unableToFetchParcelLinesMessage": "Não é possível buscar linhas de lotes.",
  "planSettings": {
    "planSettingsTitle": "Configurações",
    "directionOrAngleTypeLabel": "Tipo de Ângulo ou Direção",
    "directionOrAngleUnitsLabel": "Unidades de Ângulo ou Direção",
    "distanceAndLengthUnitsLabel": "Unidades de Comprimento e Distância",
    "areaUnitsLabel": "Unidades de Área",
    "circularCurveParameters": "Parâmetros da Curva Circulares",
    "northAzimuth": "Azimute Norte",
    "southAzimuth": "Azimute Sul",
    "quadrantBearing": "Posição do Quadrante",
    "radiusAndChordLength": "Raio e Comprimento da Corda",
    "radiusAndArcLength": "Raio e Comprimento do Arco",
    "expandGridTooltipText": "Expandir grade",
    "collapseGridTooltipText": "Recolher grade",
    "zoomToLocationTooltipText": "Zoom na localização",
    "onScreenDigitizationTooltipText": "Digitalizar"
  },
  "traverseSettings": {
    "bearingLabel": "Direção",
    "lengthLabel": "Comprimento",
    "radiusLabel": "Raio",
    "noMiscloseCalculated": "Fechamento não calculado",
    "traverseMiscloseBearing": "Direção de Fechamento",
    "traverseAccuracy": "Precisão",
    "accuracyHigh": "Alto",
    "traverseDistance": "Distância de Fechamento",
    "traverseMiscloseRatio": "Taxa de Fechamento",
    "traverseStatedArea": "StatedArea",
    "traverseCalculatedArea": "Área Calculada",
    "addButtonTitle": "Adicionar",
    "deleteButtonTitle": "Remover"
  },
  "parcelTools": {
    "rotationToolLabel": "Ângulo",
    "scaleToolLabel": "Escala"
  },
  "newTraverse": {
    "invalidBearingMessage": "Direção inválida.",
    "invalidLengthMessage": "Comprimento Inválido.",
    "invalidRadiusMessage": "Raio Inválido.",
    "negativeLengthMessage": "Válido somente para curvas",
    "enterValidValuesMessage": "Insira valores válidos.",
    "enterValidParcelInfoMessage": "Insira algumas informações de lotes válidos para salvar.",
    "unableToDrawLineMessage": "Não é possível desenhar linha.",
    "invalidEndPointMessage": "Ponto Final inválido, não é possível desenhar linha."
  },
  "planInfo": {
    "requiredText": "(exigido)",
    "optionalText": "(opcional)",
    "parcelNamePlaceholderText": "Nome do lote",
    "parcelDocumentTypeText": "Tipo do documento",
    "planNamePlaceholderText": "Nome do Plano",
    "cancelButtonLabel": "Cancelar",
    "saveButtonLabel": "Salvar",
    "saveNonClosedParcelConfirmationMessage": "O lote inserido não está fechado, ainda deseja prosseguir e salvar somente as linhas de lotes?",
    "unableToCreatePolygonParcel": "Não é possível criar polígono de lotes.",
    "unableToSavePolygonParcel": "Não é possível salvar polígono de lotes.",
    "unableToSaveParcelLines": "Não é possível salvar linhas de lotes.",
    "unableToUpdateParcelLines": "Não é possível atualizar linhas de lotes.",
    "parcelSavedSuccessMessage": "Lotes salvos com sucesso.",
    "enterValidParcelNameMessage": "Insira nome de lote válido.",
    "enterValidPlanNameMessage": "Insira nome de plano válido.",
    "enterValidDocumentTypeMessage": "Tipo de documento inválido.",
    "enterValidStatedAreaNameMessage": "Insira área declarada válida."
  },
  "xyInput": {
    "explanation": "Na referência espacial da sua camada de lotes"
  }
});