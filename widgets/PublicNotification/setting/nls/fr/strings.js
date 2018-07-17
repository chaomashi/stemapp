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
    "title": "Paramètres de recherche et de zone tampon",
    "mainHint": "Vous pouvez activer les recherches textuelles de destinataires et d’entités, la numérisation de géométrie et la mise en zone tampon."
  },
  "addressSourceSetting": {
    "title": "Couches de destinataires",
    "mainHint": "Vous pouvez spécifier quelle ou quelles couches d’étiquettes de destinataires sont disponibles."
  },
  "notificationSetting": {
    "title": "Options de notification",
    "mainHint": "Vous pouvez spécifier quels types de notification sont disponibles."
  },
  "groupingLabels": {
    "addressSources": "Couche à utiliser pour sélectionner les couches de destinataires",
    "averyStickersDetails": "Autocollants Avery(r)",
    "csvDetails": "Fichier de valeurs séparées par des virgules (CSV)",
    "drawingTools": "Outils de dessin pour spécifier une zone",
    "featureLayerDetails": "Couche d'entités",
    "geocoderDetails": "Géocodeur",
    "labelFormats": "Formats d’étiquettes disponibles",
    "printingOptions": "Options des pages d’étiquettes imprimées",
    "searchSources": "Sources de recherche",
    "stickerFormatDetails": "Paramètres de pages d’étiquettes"
  },
  "hints": {
    "alignmentAids": "Marques ajoutées à la page d’étiquettes pour vous aider à aligner la page avec votre imprimante",
    "csvNameList": "Liste de noms de champs sensibles à la casse séparés par des virgules",
    "horizontalGap": "Espace entre deux étiquettes sur une ligne",
    "insetToLabel": "Espace entre le côté de l’étiquette et le début du texte",
    "labelFormatDescription": "Comment le style d’étiquette est présenté dans la liste des options de formats",
    "labelFormatDescriptionHint": "Info-bulle complétant la description dans la liste des options de formats",
    "labelHeight": "Hauteur de chaque étiquette sur la page",
    "labelWidth": "Largeur de chaque étiquette sur la page",
    "localSearchRadius": "Indique le rayon d’une surface autour du centre de la carte qui permet d’optimiser le classement des candidats de géocodage, afin que les plus proches de l’emplacement soient renvoyés en premier",
    "rasterResolution": "100 pixels par pouce correspond approximativement à la résolution d’écran. Plus la résolution est élevée, plus il faut de mémoire de navigateur. Les navigateurs n’ont pas tous la même capacité à traiter harmonieusement les fortes demandes en mémoire.",
    "selectionListOfOptionsToDisplay": "Les éléments cochés sont affichés en tant qu’options dans le widget ; changez l’ordre comme vous le souhaitez",
    "verticalGap": "Espace entre deux étiquettes dans une colonne"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Distance de la zone tampon par défaut",
    "bufferUnits": "Unités de zone tampon à fournir dans le widget",
    "countryRegionCodes": "Codes de pays ou de régions",
    "description": "Description",
    "descriptionHint": "Conseil de description",
    "displayField": "Champ d’affichage",
    "drawingToolsFreehandPolygon": "polygone à main levée",
    "drawingToolsLine": "ligne",
    "drawingToolsPoint": "point",
    "drawingToolsPolygon": "polygone",
    "drawingToolsPolyline": "polyligne",
    "enableLocalSearch": "Activer la recherche locale",
    "exactMatch": "Correspondance parfaite",
    "fontSizeAlignmentNote": "Taille de police pour la note sur les marges d’impression",
    "gridDarkness": "Obscurité de grille",
    "gridlineLeftInset": "Encart de quadrillage gauche",
    "gridlineMajorTickMarksGap": "Graduation majeure chaque",
    "gridlineMinorTickMarksGap": "Graduation mineure chaque",
    "gridlineRightInset": "Encart de quadrillage droit",
    "labelBorderDarkness": "Obscurité de bordure d’étiquette",
    "labelBottomEdge": "Bord inférieur des étiquettes sur la page",
    "labelFontSize": "Taille de police",
    "labelHeight": "Hauteur d’étiquette",
    "labelHorizontalGap": "Distance horizontale",
    "labelInitialInset": "Encart vers le texte d’étiquette",
    "labelLeftEdge": "Bord gauche des étiquettes sur la page",
    "labelMaxLineCount": "Nombre maximal de lignes sur l’étiquette",
    "labelPageHeight": "Hauteur de page",
    "labelPageWidth": "Largeur de page",
    "labelRightEdge": "Bord droit des étiquettes sur la page",
    "labelsInAColumn": "Nombre d’étiquettes dans une colonne",
    "labelsInARow": "Nombre d’étiquettes sur une ligne",
    "labelTopEdge": "Bord supérieur des étiquettes sur la page",
    "labelVerticalGap": "Distance verticale",
    "labelWidth": "Largeur d’étiquette",
    "limitSearchToMapExtent": "Rechercher uniquement dans l'étendue de la carte actuelle",
    "maximumResults": "Nombre maximal de résultats",
    "maximumSuggestions": "Nombre maximal de suggestions",
    "minimumScale": "Échelle minimale",
    "name": "Nom",
    "percentBlack": "% noir",
    "pixels": "pixels",
    "pixelsPerInch": "pixels par pouce",
    "placeholderText": "Texte de l'espace réservé",
    "placeholderTextForAllSources": "Texte d’espace réservé pour parcourir toutes les sources",
    "radius": "Rayon",
    "rasterResolution": "Résolution du raster",
    "searchFields": "Champs de recherche",
    "showAlignmentAids": "Afficher les aides d’alignement sur la page",
    "showGridTickMarks": "Afficher les graduations de grille",
    "showLabelOutlines": "Afficher les contours d’étiquettes",
    "showPopupForFoundItem": "Afficher la fenêtre contextuelle de l'entité ou de l'emplacement trouvé",
    "tool": "Outils",
    "units": "Unités",
    "url": "URL",
    "urlToGeometryService": "URL du service de géométrie",
    "useRelatedRecords": "Utiliser ses enregistrements associés",
    "useSecondarySearchLayer": "Utiliser la couche de sélection secondaire",
    "useSelectionDrawTools": "Utiliser les outils de dessin de sélection",
    "useVectorFonts": "Utiliser les polices vectorielles (polices latines uniquement)",
    "zoomScale": "Echelle de zoom"
  },
  "buttons": {
    "addAddressSource": "Ajouter une couche contenant des étiquettes d’adresses dans sa fenêtre contextuelle",
    "addLabelFormat": "Ajouter un format d’étiquette",
    "addSearchSource": "Ajouter une source de recherche",
    "set": "Définir"
  },
  "placeholders": {
    "averyExample": "ex., étiquette Avery(r) ${averyPartNumber}",
    "countryRegionCodes": "ex., USA,CHN",
    "descriptionCSV": "Valeurs séparées par des virgules",
    "descriptionPDF": "Étiquette PDF ${heightLabelIn} x ${widthLabelIn} pouces ; ${labelsPerPage} par page"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Obtenir la couche d’entités à partir de la carte web",
    "openCountryCodes": "Cliquez pour obtenir plus d’informations sur les codes",
    "openFieldSelector": "Cliquez pour ouvrir un sélecteur de champ",
    "setAndValidateURL": "Définir et valider l’URL"
  },
  "problems": {
    "noAddresseeLayers": "Spécifier au moins une couche de destinataires",
    "noBufferUnitsForDrawingTools": "Configurer au moins une unité de zone tampon pour les outils de dessin",
    "noBufferUnitsForSearchSource": "Configurer au moins une unité de zone tampon pour la source de recherche \"${sourceName}\"",
    "noGeometryServiceURL": "Configurer l’URL du service de géométrie",
    "noNotificationLabelFormats": "Spécifier au moins un format d’étiquette de notification",
    "noSearchSourceFields": "Configurer un ou plusieurs champs de recherche pour la source de recherche \"${sourceName}\"",
    "noSearchSourceURL": "Configurer l’URL de la source de recherche \"${sourceName}\""
  }
});