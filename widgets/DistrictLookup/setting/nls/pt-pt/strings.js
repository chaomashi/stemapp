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
    "miles": "Milhas",
    "kilometers": "Quilómetros",
    "feet": "Pés",
    "meters": "Metros"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Configurações da Pesquisa",
    "buttonSet": "Definir",
    "selectLayersLabel": "Seleccionar Camada",
    "selectLayersHintText": "Sugestão: Use a camada de polígono seleccionada e a sua camada de ponto associada.",
    "selectPrecinctSymbolLabel": "Seleccionar símbolo para realçar polígono",
    "selectGraphicLocationSymbol": "Símbolo de endereço ou localização",
    "graphicLocationSymbolHintText": "Sugestão: Símbolo para endereço pesquisado ou localização clicada",
    "precinctSymbolHintText": "Sugestão: Usado para exbir símbolo para polígono seleccionado",
    "selectColorForPoint": "Selecionar cor para destacar ponto",
    "selectColorForPointHintText": "Dica: Utilizado para exibir cor de destaque para ponto selecionado"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Definições de Fonte de Pesquisa",
    "searchSourceSettingTitle": "Definições de Fonte de Pesquisa",
    "searchSourceSettingTitleHintText": "Adicione e configure serviços de geocodificação ou camadas de elementos como fontes de pesquisa. Estas fontes determinam aquilo que é possível pesquisar na caixa de pesquisa.",
    "addSearchSourceLabel": "Adicionar Fonte de Pesquisa",
    "featureLayerLabel": "Camada de Elementos",
    "geocoderLabel": "Geocodificador",
    "nameTitle": "Nome",
    "generalSettingLabel": "Configuração Geral",
    "allPlaceholderLabel": "Texto de placeholder para pesquisar todos:",
    "allPlaceholderHintText": "Dica: Introduzir o texto a exibir como espaço reservado ao pesquisar todas as camadas e o geocodificador",
    "generalSettingCheckboxLabel": "Exibir janela pop-up para o elemento ou local encontrado.",
    "countryCode": "Código(s) de País ou Região",
    "countryCodeEg": "e.g ",
    "countryCodeHint": "Ao deixar este valor em branco irá pesquisar em todos os países e regiões",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Procurar apenas na extensão de mapa actual.",
    "zoomScale": "Escala de Zoom",
    "locatorUrl": "URL do Geocodificador",
    "locatorName": "Nome do Geocodificador",
    "locatorExample": "Exemplo",
    "locatorWarning": "Esta versão do serviço de geocodificação não é suportada. O widget suporta serviço de geocodificação 10.0 e posterior.",
    "locatorTips": "Sugestões não estão disponíveis porque o serviço de geocodificação não suporta a capacidade sugerida.",
    "layerSource": "Camada Fonte",
    "setLayerSource": "Definir Fonte de Camada",
    "setGeocoderURL": "Definir URL Geocodificador",
    "searchLayerTips": "Sugestões não estão disponíveis porque o serviço de elemento não suporta capacidades de paginação.",
    "placeholder": "Local de introdução de texto",
    "searchFields": "Campos de Pesquisa",
    "displayField": "Exibir Campo",
    "exactMatch": "Correspondência Exacta",
    "maxSuggestions": "Sugestões Máximas",
    "maxResults": "Resultados Máximos",
    "enableLocalSearch": "Ativar pesquisa local",
    "minScale": "Escala Mínima",
    "minScaleHint": "Quando a escala do mapa é superior a esta escala, será aplicada a pesquisa local",
    "radius": "Raio",
    "radiusHint": "Especifica o raio de uma área em torno do atual centro do mapa, que é utilizada para impulsionar a classificação de candidatos a geocodificação para que os candidatos que se encontram mais perto do local sejam apresentados nas primeiras posições.",
    "meters": "Metros",
    "setSearchFields": "Definir Campos de Pesquisa",
    "set": "Definir",
    "fieldName": "Nome",
    "invalidUrlTip": "O URL ${URL} é inválido ou inacessível.",
    "invalidSearchSources": "Definições inválidas de origem de pesquisa."
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Seleccionar camada de polígono",
    "selectPolygonLayerHintText": "Sugestão: Usado para seleccionar camada de polígono.",
    "selectRelatedPointLayerLabel": "Seleccionar camada de ponto relacionado para camada de polígono",
    "selectRelatedPointLayerHintText": "Sugestão:  Usado para seleccionar camada de ponto relacionada para camada de polígono",
    "polygonLayerNotHavingRelatedLayer": "Por favor seleccione uma camada de polígono que tenha uma camada de ponto relacionada.",
    "errorInSelectingPolygonLayer": "Por favor seleccione uma camada de polígono que tenha uma camada de ponto relacionada.",
    "errorInSelectingRelatedLayer": "Por favor seleccione uma camada de ponto relacionada para camada de polígono."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Definições de Direção",
    "routeServiceUrl": "Serviço de roteamento",
    "buttonSet": "Definir",
    "routeServiceUrlHintText": "Sugestão: Clique 'Definir' para navegar e seleccionar um serviço de roteamento de análise de rede",
    "directionLengthUnit": "Unidades de comprimento de direcção",
    "unitsForRouteHintText": "Sugestão: Usado para exibir unidades reportadas para rota",
    "selectRouteSymbol": "Seleccionar símbolo para exibir rota",
    "routeSymbolHintText": "Sugestão: Usado para exibir símbolo linha da rota",
    "routingDisabledMsg": "Para permitir direcções certifique-se que o roteamento está activo no item ArcGIS Online."
  },
  "networkServiceChooser": {
    "arcgislabel": "Adicionar de ArcGIS Online",
    "serviceURLabel": "Adicionar URL de Serviço",
    "routeURL": "URL de rota",
    "validateRouteURL": "Validar",
    "exampleText": "Exemplo",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Por favor especifique o serviço de Roteamento válido.",
    "rateLimitExceeded": "Limite de classificação ultrapassado. Por favor tente mais tarde.",
    "errorInvokingService": "Nome de utilizador ou palavra-passe incorreto."
  },
  "symbolPickerPreviewText": "Visualizar:",
  "showToolToSelectLabel": "Botão Definir Localização",
  "showToolToSelectHintText": "Dica: Introduz um botão para definir a localização no mapa, ao invés de definir a localização sempre que se clica no mapa."
});