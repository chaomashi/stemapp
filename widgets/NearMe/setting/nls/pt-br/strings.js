/*global define*/
///////////////////////////////////////////////////////////////////////////
// Copyright © 2015 Esri. All Rights Reserved.
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
  "units": {
    "miles": {
      "displayText": "Milhas",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Quilômetros",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Pés",
      "acronym": "pés"
    },
    "meters": {
      "displayText": "Metros",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Configurações da Fonte de Pesquisa",
    "searchSourceSettingTitle": "Configurações da Fonte de Pesquisa",
    "searchSourceSettingTitleHintText": "Adicione e configure serviços de geocódigo ou camadas de feição como fontes de pesquisa. Estas fontes especificadas determinam o que é pesquisável dentro da caixa de pesquisa.",
    "addSearchSourceLabel": "Adicionar Fonte de Pesquisa",
    "featureLayerLabel": "Camada de Feição",
    "geocoderLabel": "Geocodificador",
    "nameTitle": "Nome",
    "generalSettingLabel": "Configurações Gerais",
    "allPlaceholderLabel": "Texto de local reservado para pesquisar todos:",
    "allPlaceholderHintText": "Sugestão: Insira o texto a ser mostrado como reservado ao pesquisar todas as camadas e geocodificador",
    "generalSettingCheckboxLabel": "Mostrar pop-up do local ou feição localizada",
    "countryCode": "Códigos de Região e País",
    "countryCodeEg": "por exemplo ",
    "countryCodeHint": "Deixar este valor em branco pesquisará todos os países e regiões",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Somente pesquisar na extensão de mapa atual",
    "zoomScale": "Escala de Zoom",
    "locatorUrl": "URL do Geocodificador",
    "locatorName": "Nome do Geocodificador",
    "locatorExample": "Exemplo",
    "locatorWarning": "Esta versão do serviço de geocodificação não é suportado. O widget suporta serviço de geocodificação 10.0 e superior.",
    "locatorTips": "As sugestões não estão disponíveis, pois o serviço de geocodificação não suporta o recursos de sugestão.",
    "layerSource": "Origem da Camada",
    "setLayerSource": "Configurar Origem da Camada",
    "setGeocoderURL": "Configurar URL do Geocodificador",
    "searchLayerTips": "As sugestões não estão disponíveis, pois o serviço da feição não suporta o recursos de paginação.",
    "placeholder": "Texto do Placeholder",
    "searchFields": "Pesquisar Campos",
    "displayField": "Campo de Visualização",
    "exactMatch": "Combinação Exata",
    "maxSuggestions": "Máximo de Sugestões",
    "maxResults": "Máximo de Resultados",
    "enableLocalSearch": "Habilitar pesquisa de local",
    "minScale": "Escala Mín",
    "minScaleHint": "Quando a escala do mapa for maior que esta escala, a pesquisa de local será aplicada",
    "radius": "Raio",
    "radiusHint": "Especifica o raio de uma área ao redor do centro do mapa atual que é utilizado para impulsionar o grau de candidatos de geocodificação de forma que os candidatos mais próximos ao local sejam retornados primeiro",
    "meters": "Metros",
    "setSearchFields": "Configurar Campos de Pesquisa",
    "set": "Configurar",
    "fieldName": "Nome",
    "invalidUrlTip": "A URL ${URL} é inválida ou inacessível."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Configurações da Pesquisa",
    "defaultBufferDistanceLabel": "Configurar distância de buffer padrão",
    "maxResultCountLabel": "Número limite de resultados",
    "maxResultCountHintLabel": "Sugestão: Configurar o número máximo de resultados visíveis. O valor de 1 retornará a feição mais próxima",
    "maxBufferDistanceLabel": "Configurar distância máxima de buffer",
    "bufferDistanceUnitLabel": "Unidades de distância do buffer",
    "defaultBufferHintLabel": "Sugestão: Configurar valor padrão para controle deslizante de buffer",
    "maxBufferHintLabel": "Sugestão: Configurar valor máximo para controle deslizante de buffer",
    "bufferUnitLabel": "Sugestão: Defina a unidade para criar buffer",
    "selectGraphicLocationSymbol": "Símbolo de local ou endereço",
    "graphicLocationSymbolHintText": "Sugestão: Símbolo para endereço pesquisado ou local clicado",
    "addressLocationPolygonHintText": "Sugestão: Símbolo para camada de polígono pesquisada",
    "popupTitleForPolygon": "Selecionar polígono para localização de endereço selecionado",
    "popupTitleForPolyline": "Selecionar linha para localização de endereço",
    "addressLocationPolylineHintText": "Sugestão: Símbolo para camada de polilinha pesquisada",
    "fontColorLabel": "Selecionar cor da fonte para resultados da pesquisa",
    "fontColorHintText": "Sugestão: Cor da fonte de resultados da pesquisa",
    "zoomToSelectedFeature": "Zoom para feição selecionada",
    "zoomToSelectedFeatureHintText": "Sugestão: Ampliar na feição selecionada, ao invés do buffer",
    "intersectSearchLocation": "Retornar polígonos de intersecção",
    "intersectSearchLocationHintText": "Sugestão: Retorne polígonos contendo o local pesquisado, ao invés de polígonos dentro do buffer",
    "enableProximitySearch": "Habilitar pesquisa de proximidade",
    "enableProximitySearchHintText": "Dica: Habilite o recurso de pesquisa para locais próximos de um resultado selecionado",
    "bufferVisibilityLabel": "Configurar visibilidade do buffer",
    "bufferVisibilityHintText": "Sugestão: O buffer será exibido no mapa",
    "bufferColorLabel": "Configurar símbolo do buffer",
    "bufferColorHintText": "Sugestão: Selecione cor e transparência do buffer",
    "searchLayerResultLabel": "Desenhar somente resultados da camada selecionada",
    "searchLayerResultHint": "Sugestão: Somente a camada selecionada nos resultados da pesquisa desenhará no mapa",
    "showToolToSelectLabel": "Configurar botão de localização",
    "showToolToSelectHintText": "Sugestão: Forneça um botão para configurar a localização no mapa em vez de sempre configurar a localização quando o mapa for clicado",
    "geoDesicParamLabel": "Utilizar buffer geodésico",
    "geoDesicParamHintText": "Sugestão: Utilize buffer geodésico em vez de buffer Euclideano (plana)"
  },
  "layerSelector": {
    "selectLayerLabel": "Selecionar camadas de pesquisa",
    "layerSelectionHint": "Sugestão: Utilize o botão configurar para selecionar camadas",
    "addLayerButton": "Configurar"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Configurações de Direções",
    "routeServiceUrl": "Serviço de Rota",
    "buttonSet": "Configurar",
    "routeServiceUrlHintText": "Sugestão: Clique em â€˜Setâ€™ para procurar e selecionar um serviço de rota",
    "directionLengthUnit": "Unidades do comprimento de direção",
    "unitsForRouteHintText": "Sugestão: Utilizado para exibir unidades para rota",
    "selectRouteSymbol": "Selecionar símbolo para exibir rota",
    "routeSymbolHintText": "Sugestão: Utilizado para exibir símbolo de linha da rota",
    "routingDisabledMsg": "Para habilitar direções, garanta que a rota esteja habilitada no item das configurações do aplicativo."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Configurações da simbologia",
    "addSymbologyBtnLabel": "Adicionar Novos Símbolos",
    "layerNameTitle": "Nome da Camada",
    "fieldTitle": "Campo",
    "valuesTitle": "Valores",
    "symbolTitle": "Símbolo",
    "actionsTitle": "Ações",
    "invalidConfigMsg": "Duplicar campo : ${fieldName} para camada : ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Configurações de Filtro",
    "addTaskTip": "Adicione um ou mais filtros na camada de pesquisa selecionada e configure os parâmetros para cada uma delas.",
    "enableMapFilter": "Remove o filtro de camada pré-configurado do mapa.",
    "newFilter": "Novo filtro",
    "filterExpression": "Expressão de filtro",
    "layerDefaultSymbolTip": "Utilizar símbolo padrão da camada",
    "uploadImage": "Carregar uma imagem",
    "selectLayerTip": "Selecione uma camada.",
    "setTitleTip": "Configure um título.",
    "noTasksTip": "Nenhum filtro configurado. Clique em \"${newFilter}\" para adicionar uma nova.",
    "collapseFiltersTip": "Recolha as expressões de filtro (se houver alguma) quando o widget for aberto",
    "groupFiltersTip": "Agrupar filtros por camada"
  },
  "networkServiceChooser": {
    "arcgislabel": "Adicionar do ArcGIS Online",
    "serviceURLabel": "Adicionar URL de Serviço",
    "routeURL": "URL da Rota",
    "validateRouteURL": "Validar",
    "exampleText": "Exemplo",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Especifique um serviço de Rota válido.",
    "rateLimitExceeded": "Limite de taxa excedido. Tente novamente mais tarde.",
    "errorInvokingService": "O nome de usuário ou senha está incorreta."
  },
  "errorStrings": {
    "bufferErrorString": "Inisra um valor numérico válido.",
    "selectLayerErrorString": "Selecione as camadas para pesquisar.",
    "invalidDefaultValue": "A distância de buffer padrão não pode estar em branco. Especifique a distância de buffer",
    "invalidMaximumValue": "A distância de buffer máxima não pode estar em branco. Especifique a distância de buffer",
    "defaultValueLessThanMax": "Especifique a distância de buffer padrão dentro do limite máximo",
    "defaultBufferValueGreaterThanOne": "A distância de buffer padrão não pode ser menos que 0",
    "maximumBufferValueGreaterThanOne": "Especifique a distância de buffer máxima maior que 0",
    "invalidMaximumResultCountValue": "Especifique o valor válido para a contagem de resultado máximo",
    "invalidSearchSources": "Configurações de fonte de pesquisa inválida"
  },
  "symbolPickerPreviewText": "Visualizar:"
});