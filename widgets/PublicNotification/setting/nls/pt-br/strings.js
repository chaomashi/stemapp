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
    "title": "Configurações de Buffer e Pesquisa",
    "mainHint": "Você pode habilitar pesquisas de texto em endereços e feições, digitalização de geometria e criação de buffer."
  },
  "addressSourceSetting": {
    "title": "Camadas de Endereço",
    "mainHint": "Você pode especificar quais camadas do rótulo de destinatário estão disponíveis."
  },
  "notificationSetting": {
    "title": "Opções de Notificação",
    "mainHint": "Você pode especificar quais tipos de notificação estão disponíveis."
  },
  "groupingLabels": {
    "addressSources": "Camada para utilizar para selecionar as camadas de destinatário",
    "averyStickersDetails": "Todos os rótulos",
    "csvDetails": "Arquivo (CSV) de valores separados por vírgula",
    "drawingTools": "Ferramentas de desenho para especificar área",
    "featureLayerDetails": "Camada de feição",
    "geocoderDetails": "Geocodificador",
    "labelFormats": "Formatos de rótulo disponíveis",
    "printingOptions": "Opções para páginas de rótulo impressas",
    "searchSources": "Fontes de pesquisa",
    "stickerFormatDetails": "Parâmetros da página de rótulo"
  },
  "hints": {
    "alignmentAids": "Marcas adicionadas na página de rótulo para ajudá-lo a alinhar a página com sua impressora",
    "csvNameList": "Uma lista de nomes de campo com letra maiúscula e minúscula separados por vírgula",
    "horizontalGap": "Espaço entre dois rótulos em uma linha",
    "insetToLabel": "Espaço entre o lado do rótulo e o início do texto",
    "labelFormatDescription": "Como o estilo do rótulo é apresentado na lista de opções do formato de widget",
    "labelFormatDescriptionHint": "Dica da ferramenta para complementar a descrição na lista de opções do formato",
    "labelHeight": "Altura de cada rótulo na página",
    "labelWidth": "Largura de cada rótulo na página",
    "localSearchRadius": "Especifica o raio de uma área ao redor do centro do mapa atual que é utilizado para impulsionar o grau de candidatos de geocodificação de forma que os candidatos mais próximos ao local sejam retornados primeiro",
    "rasterResolution": "100 pixels por polegada correspondem aproximadamente à resolução da tela. Quanto maior a resolução, mais memória do navegador será necessária. Os navegadores diferem em sua capacidade de lidar graciosamente com grandes demandas de memória.",
    "selectionListOfOptionsToDisplay": "Os itens verificados são exibidos como opções no widget; altere a ordem conforme desejado",
    "verticalGap": "Espaço entre dois rótulos em uma coluna"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Distância de buffer padrão",
    "bufferUnits": "Unidades de buffer para fornecer no widget",
    "countryRegionCodes": "Códigos de região ou país",
    "description": "Descrição",
    "descriptionHint": "Sugestão de descrição",
    "displayField": "Campo de visualização",
    "drawingToolsFreehandPolygon": "polígono à mão livre",
    "drawingToolsLine": "linha",
    "drawingToolsPoint": "ponto",
    "drawingToolsPolygon": "polígono",
    "drawingToolsPolyline": "polilinha",
    "enableLocalSearch": "Habilitar pesquisa de local",
    "exactMatch": "Combinação exata",
    "fontSizeAlignmentNote": "Tamanho da fonte para nota sobre as margens de impressão",
    "gridDarkness": "Grade escura",
    "gridlineLeftInset": "Inserir linha de grade esquerda",
    "gridlineMajorTickMarksGap": "Marcas de ponto maior a cada",
    "gridlineMinorTickMarksGap": "Marcas de ponto menor a cada",
    "gridlineRightInset": "Inserir linha de grade direita",
    "labelBorderDarkness": "Borda escura do rótulo",
    "labelBottomEdge": "Borda inferior dos rótulos na página",
    "labelFontSize": "Tamanho da fonte",
    "labelHeight": "Altura do rótulo",
    "labelHorizontalGap": "Intervalo horizontal",
    "labelInitialInset": "Inserir mo texto do rótulo",
    "labelLeftEdge": "Borda esquerda dos rótulos na página",
    "labelMaxLineCount": "Número máximo de linhas no rótulo",
    "labelPageHeight": "Altura da página",
    "labelPageWidth": "Largura da página",
    "labelRightEdge": "Borda direita dos rótulos na página",
    "labelsInAColumn": "Número de rótulos em uma coluna",
    "labelsInARow": "Número de rótulos em uma linha",
    "labelTopEdge": "Borda superior dos rótulos na página",
    "labelVerticalGap": "Intervalo vertical",
    "labelWidth": "Largura do rótulo",
    "limitSearchToMapExtent": "Somente pesquisar na extensão de mapa atual",
    "maximumResults": "Máximo de resultados",
    "maximumSuggestions": "Máximo de sugestões",
    "minimumScale": "Escala mínima",
    "name": "Nome",
    "percentBlack": "% preto",
    "pixels": "pixels",
    "pixelsPerInch": "pixels por polegada",
    "placeholderText": "Texto de local reservado",
    "placeholderTextForAllSources": "Texto de local reservado para pesquisar todas as fontes",
    "radius": "Raio",
    "rasterResolution": "Resolução do raster",
    "searchFields": "Campos de pesquisa",
    "showAlignmentAids": "Mostrar alinhamento na página",
    "showGridTickMarks": "Mostrar marcas de ponto da grade",
    "showLabelOutlines": "Mostrar contornos do rótulo",
    "showPopupForFoundItem": "Mostrar pop-up do local ou feição localizada",
    "tool": "Ferramentas",
    "units": "Unidades",
    "url": "URL",
    "urlToGeometryService": "URL para serviço de geometria",
    "useRelatedRecords": "Utilize seus registros relacionados",
    "useSecondarySearchLayer": "Utilizar camada de seleção secundária",
    "useSelectionDrawTools": "Utilizar ferramentas de desenho de seleção",
    "useVectorFonts": "Utilizar fontes vetoriais (Fonte em latin somente)",
    "zoomScale": "Escala de zoom"
  },
  "buttons": {
    "addAddressSource": "Adicionar camada contendo rótulos de endereço em seu pop-up",
    "addLabelFormat": "Adicionar um formato de rótulo",
    "addSearchSource": "Adicionar uma fonte de pesquisa",
    "set": "Configurar"
  },
  "placeholders": {
    "averyExample": "Ex: Todos os rótulos ${averyPartNumber}",
    "countryRegionCodes": "ex: USA,CHN",
    "descriptionCSV": "Valores separados por vírgula",
    "descriptionPDF": "Rótulo do PDF ${heightLabelIn} x ${widthLabelIn} polegadas; ${labelsPerPage} por página"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Obtenha a camada de feição do mapa da web",
    "openCountryCodes": "Clique para obter mais informações sobre códigos",
    "openFieldSelector": "Clique para abrir um seletor de campo",
    "setAndValidateURL": "Definir e validar a URL"
  },
  "problems": {
    "noAddresseeLayers": "Especifique pelo menos uma camada de destinatário",
    "noBufferUnitsForDrawingTools": "Configure pelo menos uma unidade de buffer para as ferramentas de desenho",
    "noBufferUnitsForSearchSource": "Configure pelo menos uma unidade de buffer para a fonte de pesquisa \"${sourceName}\"",
    "noGeometryServiceURL": "Configure a URL para o serviço de geometria",
    "noNotificationLabelFormats": "Especifique pelo menos um formato do rótulo de notificação",
    "noSearchSourceFields": "Configure um ou mais campos de pesquisa para a fonte de pesquisa \"${sourceName}\"",
    "noSearchSourceURL": "Configure a URL da fonte de pesquisa \"${sourceName}\""
  }
});