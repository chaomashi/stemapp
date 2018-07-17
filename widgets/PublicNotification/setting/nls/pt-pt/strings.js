/*
 | Copyright 2017 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define({
  "searchSourceSetting": {
    "title": "Definições de Pesquisa e de Buffer",
    "mainHint": "Pode ativar pesquisas de texto de endereços e elementos, digitalização de geometria e buffering."
  },
  "addressSourceSetting": {
    "title": "Camadas de Endereços",
    "mainHint": "Pode especificar a(s) camada(s) de rótulo de destinatário disponível(eis)."
  },
  "notificationSetting": {
    "title": "Opções de Notificações",
    "mainHint": "Pode especificar os tipos de notificação disponíveis."
  },
  "groupingLabels": {
    "addressSources": "Camada a utilizar para selecionar camadas de destinatários",
    "averyStickersDetails": "Eqtiquetas Avery(r)",
    "csvDetails": "Valores separados por vírgulas (CSV)",
    "drawingTools": "Ferramentas de desenho para especificar área",
    "featureLayerDetails": "Camada de elementos",
    "geocoderDetails": "Geocodificador",
    "labelFormats": "Formatos de rótulos disponíveis",
    "printingOptions": "Opções para páginas de rótulos impressos",
    "searchSources": "Fontes de pesquisa",
    "stickerFormatDetails": "Parâmetros de página de rótulo"
  },
  "hints": {
    "alignmentAids": "Marcas adicionadas à página de rótulo para o ajudar a alinhar a página com a sua impressora",
    "csvNameList": "Uma lista de nomes de campos separada por vírgulas de nomes de campos que diferencia letras maiúsculas de minúsculas",
    "horizontalGap": "Espaço entre dois rótulos numa linha",
    "insetToLabel": "Espaço entre a parte lateral do rótulo e o início do texto",
    "labelFormatDescription": "Como o estilo de rótulo é apresentado em lista de opções de formato de widget",
    "labelFormatDescriptionHint": "Conselho de utilização para complementar a descrição em lista de opções de formato",
    "labelHeight": "Altura de cada rótulo na página",
    "labelWidth": "Largura de cada rótulo na página",
    "localSearchRadius": "Especifica o raio de uma área em torno do atual centro do mapa, que é utilizada para impulsionar a classificação de candidatos a geocodificação para que os candidatos que se encontram mais perto do local sejam apresentados nas primeiras posições.",
    "rasterResolution": "100 pixeis por polegada corresponde aproximadamente à resolução de ecrã. Quanto mais elevada for a resolução, maior quantidade de memória será necessária. Os navegadores diferem na respetiva capacidade de gerir, de modo suave, as necessidades de memória de grande dimensão.",
    "selectionListOfOptionsToDisplay": "Os itens selecionados são exibidos como opções no widget; altere a ordem na medida do pretendido",
    "verticalGap": "Espaço entre dois rótulos numa coluna"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Distância predefinida do buffer",
    "bufferUnits": "Unidades de buffer a apresentar no widget",
    "countryRegionCodes": "Códigos de país ou região",
    "description": "Descrição",
    "descriptionHint": "Pista de descrição",
    "displayField": "Campo de visualização",
    "drawingToolsFreehandPolygon": "polígono à mão livre",
    "drawingToolsLine": "linha",
    "drawingToolsPoint": "ponto",
    "drawingToolsPolygon": "polígono",
    "drawingToolsPolyline": "polilinha",
    "enableLocalSearch": "Ativar pesquisa local",
    "exactMatch": "Correspondência exata",
    "fontSizeAlignmentNote": "Tamanho de letra para nota sobre margens de impressão",
    "gridDarkness": "Obscuridade de grelha",
    "gridlineLeftInset": "Inserção da linha de grelha esquerda",
    "gridlineMajorTickMarksGap": "Marcas de verificação grandes a cada",
    "gridlineMinorTickMarksGap": "Marcas de verificação pequenas a cada",
    "gridlineRightInset": "Inserção da linha de grelha direita",
    "labelBorderDarkness": "Obscuridade da margem do rótulo",
    "labelBottomEdge": "Limite inferior de rótulos na página",
    "labelFontSize": "Tamanho de letra",
    "labelHeight": "Altura do rótulo",
    "labelHorizontalGap": "Lacuna horizontal",
    "labelInitialInset": "Inserir para texto de linha",
    "labelLeftEdge": "Limite esquerdo de rótulos na página",
    "labelMaxLineCount": "Número máximo de linhas no rótulo",
    "labelPageHeight": "Altura da Página",
    "labelPageWidth": "Largura da Página",
    "labelRightEdge": "Limite direito de rótulos na página",
    "labelsInAColumn": "Número de rótulos numa coluna",
    "labelsInARow": "Número de rótulos numa linha",
    "labelTopEdge": "Limite superior de rótulos na página",
    "labelVerticalGap": "Lacuna vertical",
    "labelWidth": "Largura do rótulo",
    "limitSearchToMapExtent": "Procurar apenas na extensão de mapa actual.",
    "maximumResults": "Máximo de resultados",
    "maximumSuggestions": "Máximo de sugestões",
    "minimumScale": "Escala mínima",
    "name": "Nome",
    "percentBlack": "% preto",
    "pixels": "pixeis",
    "pixelsPerInch": "Pixeis por polegadas",
    "placeholderText": "Espaço reservado a texto",
    "placeholderTextForAllSources": "Texto de espaço reservado para pesquisar todas as fontes:",
    "radius": "Raio",
    "rasterResolution": "Resolução de raster",
    "searchFields": "Campos de pesquisa",
    "showAlignmentAids": "Exibir ajudas de alinhamento na página",
    "showGridTickMarks": "Exibir marcas de seleção da grelha",
    "showLabelOutlines": "Exibir contornos de rótulos",
    "showPopupForFoundItem": "Exibir janela pop-up para o elemento ou local encontrado.",
    "tool": "Ferramentas",
    "units": "Unidades",
    "url": "URL",
    "urlToGeometryService": "URL para serviço de geometria",
    "useRelatedRecords": "Utilizar os respetivos registos relacionados",
    "useSecondarySearchLayer": "Utilizar a camada de seleção secundária",
    "useSelectionDrawTools": "Utilizar ferramentas de desenho de seleção",
    "useVectorFonts": "Utilizar tipos de letra vetoriais (Fontes latinas apenas)",
    "zoomScale": "Escala de zoom"
  },
  "buttons": {
    "addAddressSource": "Adicionar camada que contém rótulos de endereços na respetiva janela pop-up",
    "addLabelFormat": "Adicionar um formato de rótulo",
    "addSearchSource": "Adicionar uma origem de pesquisa",
    "set": "Definir"
  },
  "placeholders": {
    "averyExample": "Ex. Rótulo Avery(r) ${averyPartNumber}",
    "countryRegionCodes": "EX: USA,CHN",
    "descriptionCSV": "Valores separados por vírgulas",
    "descriptionPDF": "Rótulo PDF ${heightLabelIn} x ${widthLabelIn} polegadas; ${labelsPerPage} por páginas"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Obter a camada de elementos do mapa web",
    "openCountryCodes": "Clicar para obter mais informações sobre códigos",
    "openFieldSelector": "Clicar para abrir um seletor de campos",
    "setAndValidateURL": "Definir e validar o URL"
  },
  "problems": {
    "noAddresseeLayers": "Por favor, especifique pelo menos uma camada de destinatário",
    "noBufferUnitsForDrawingTools": "Por favor, configure pelo menos uma unidade de buffer para as ferramentas de desenho",
    "noBufferUnitsForSearchSource": "Por favor, configure pelo menos uma unidade de buffer para a fonte de pesquisa \"${sourceName}\"",
    "noGeometryServiceURL": "Por favor, configure o URL para o serviço de geometria",
    "noNotificationLabelFormats": "Por favor, especifique pelo menos um formato de rótulo de notificação",
    "noSearchSourceFields": "Por favor, configure um ou mais campos de pesquisa para a fonte de pesquisa \"${sourceName}\"",
    "noSearchSourceURL": "Por favor, configure o URL para a fonte de pesquisa \"${sourceName}\""
  }
});