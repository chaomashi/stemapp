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
      "displayText": "Miles",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Kilomètres",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Pieds",
      "acronym": "pi"
    },
    "meters": {
      "displayText": "Mètres",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Paramètres de la source de recherche",
    "searchSourceSettingTitle": "Paramètres de la source de recherche",
    "searchSourceSettingTitleHintText": "Ajoutez et configurez des services de géocodage ou des couches d’entités en tant que sources de recherche. Ces sources déterminent les éléments pouvant faire l’objet d’une recherche dans la zone de recherche",
    "addSearchSourceLabel": "Ajouter une source de recherche",
    "featureLayerLabel": "Couche d'entités",
    "geocoderLabel": "Géocodeur",
    "nameTitle": "Nom",
    "generalSettingLabel": "Paramètre général",
    "allPlaceholderLabel": "Texte d'espace réservé pour tout parcourir :",
    "allPlaceholderHintText": "Conseil : saisissez le texte à afficher en tant qu'espace réservé pendant la recherche dans toutes les couches et le géocodeur.",
    "generalSettingCheckboxLabel": "Afficher la fenêtre contextuelle de l'entité ou de l'emplacement trouvé",
    "countryCode": "Codes de pays ou de régions",
    "countryCodeEg": "par ex. ",
    "countryCodeHint": "Si cette valeur n'est pas renseignée, la recherche s'effectue dans tous les pays et toutes les régions",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Rechercher uniquement dans l'étendue de la carte actuelle",
    "zoomScale": "Echelle de zoom",
    "locatorUrl": "URL du géocodeur",
    "locatorName": "Nom du géocodeur",
    "locatorExample": "Exemple",
    "locatorWarning": "Cette version du service de géocodage n’est pas prise en charge. Le widget prend en charge le service de géocodage version 10.0 et ultérieures.",
    "locatorTips": "Les suggestions ne sont pas disponibles, car le service de géocodage ne prend pas en charge la fonction de suggestion.",
    "layerSource": "Source de la couche",
    "setLayerSource": "Définir la source de la couche",
    "setGeocoderURL": "Définir l'URL du géocodeur",
    "searchLayerTips": "Les suggestions ne sont pas disponibles, car le service d'entités ne prend pas en charge la fonction de pagination.",
    "placeholder": "Texte de l’espace réservé",
    "searchFields": "Champs de recherche",
    "displayField": "Champ d'affichage",
    "exactMatch": "Correspondance parfaite",
    "maxSuggestions": "Nombre maximal de suggestions",
    "maxResults": "Nombre maximum de résultats",
    "enableLocalSearch": "Activer la recherche locale",
    "minScale": "Echelle. min.",
    "minScaleHint": "Lorsque l'échelle de la carte est supérieure à cette échelle, la recherche locale est appliquée",
    "radius": "Rayon",
    "radiusHint": "Indique le rayon d'une surface autour du centre de la carte qui permet d'optimiser le classement des candidats de géocodage, afin que les plus proches de l'emplacement soient renvoyés en premier",
    "meters": "Mètres",
    "setSearchFields": "Définir les champs de recherche",
    "set": "Définir",
    "fieldName": "Nom",
    "invalidUrlTip": "L’URL ${URL} est incorrecte ou inaccessible."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Paramètres de recherche",
    "defaultBufferDistanceLabel": "Définir la distance par défaut de la zone tampon",
    "maxResultCountLabel": "Limiter le nombre de résultats",
    "maxResultCountHintLabel": "Conseil : définissez le nombre maximal de résultats visibles. La valeur de 1 renvoie l'entité la plus proche",
    "maxBufferDistanceLabel": "Définir la distance maximum de la zone tampon",
    "bufferDistanceUnitLabel": "Unités de distance de la zone tampon",
    "defaultBufferHintLabel": "Astuce : définissez la valeur par défaut du curseur de la zone tampon",
    "maxBufferHintLabel": "Astuce : définissez la valeur maximum du curseur de la zone tampon",
    "bufferUnitLabel": "Astuce : définissez l’unité pour créer la zone tampon",
    "selectGraphicLocationSymbol": "Symbole d’adresse ou d’emplacement",
    "graphicLocationSymbolHintText": "Astuce : symbole d’une adresse recherchée ou d’un emplacement sélectionné",
    "addressLocationPolygonHintText": "Astuce : symbole de la couche de polygones faisant l'objet d'une recherche",
    "popupTitleForPolygon": "Sélectionnez un polygone pour l'emplacement de l'adresse sélectionnée",
    "popupTitleForPolyline": "Sélectionnez une ligne pour l'emplacement de l'adresse",
    "addressLocationPolylineHintText": "Astuce : symbole de la couche de polylignes faisant l'objet d'une recherche",
    "fontColorLabel": "Sélectionner la couleur de police pour les résultats de la recherche",
    "fontColorHintText": "Astuce : couleur de police des résultats de la recherche",
    "zoomToSelectedFeature": "Zoom sur l'entité sélectionnée",
    "zoomToSelectedFeatureHintText": "Astuce : zoomez sur l'entité sélectionnée au lieu de la zone tampon",
    "intersectSearchLocation": "Revenir aux polygones d'intersection",
    "intersectSearchLocationHintText": "Astuce : renvoyez les polygones contenant l'emplacement recherché au lieu des polygones au sein de la zone tampon",
    "enableProximitySearch": "Activer la recherche de proximité",
    "enableProximitySearchHintText": "Astuce : Activez la fonction de recherche des emplacements à proximité d’un résultat recherché",
    "bufferVisibilityLabel": "Définir la visibilité de la zone tampon",
    "bufferVisibilityHintText": "Astuce : la zone tampon s'affichera sur la carte",
    "bufferColorLabel": "Définir le symbole de la zone tampon",
    "bufferColorHintText": "Astuce : sélectionnez la couleur et la transparence de la zone tampon",
    "searchLayerResultLabel": "Dessiner uniquement les résultats de la couche sélectionnée",
    "searchLayerResultHint": "Astuce : seule la couche sélectionnée dans les résultats de recherche s'affichera sur la carte.",
    "showToolToSelectLabel": "Bouton Définir l'emplacement",
    "showToolToSelectHintText": "Conseil : fournit un bouton permettant de définir un emplacement sur la carte au lieu de toujours configurer l'emplacement lorsque l'utilisateur clique sur la carte",
    "geoDesicParamLabel": "Bouton Zone tampon géodésique",
    "geoDesicParamHintText": "Conseil : utilisez une zone tampon géodésique plutôt qu'une zone tampon euclidienne (plane)"
  },
  "layerSelector": {
    "selectLayerLabel": "Sélectionner des couches de recherche",
    "layerSelectionHint": "Astuce : utilisez le bouton Définir pour sélectionner les couches",
    "addLayerButton": "Définir"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Attributs de direction",
    "routeServiceUrl": "Service de calcul d'itinéraire",
    "buttonSet": "Définir",
    "routeServiceUrlHintText": "Astuce : cliquez sur Définir pour rechercher et sélectionner un service de calcul d'itinéraire",
    "directionLengthUnit": "Unités de longueur de la direction",
    "unitsForRouteHintText": "Astuce : utilisé pour afficher les unités de l’itinéraire",
    "selectRouteSymbol": "Sélectionner le symbole pour afficher l’itinéraire",
    "routeSymbolHintText": "Astuce : utilisé pour afficher le symbole linéaire de l’itinéraire",
    "routingDisabledMsg": "Pour activer les directions, assurez-vous que le calcul d’itinéraire est activé dans l’élément dans les paramètres d’application."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Paramètres de symbologie",
    "addSymbologyBtnLabel": "Ajouter de nouveaux symboles",
    "layerNameTitle": "Nom de la couche",
    "fieldTitle": "Champ",
    "valuesTitle": "Valeurs",
    "symbolTitle": "Symbole",
    "actionsTitle": "Actions",
    "invalidConfigMsg": "Champ en double : ${fieldName} pour la couche : ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Paramètres de filtre",
    "addTaskTip": "Ajoutez un ou plusieurs filtres à la ou aux couches de recherche sélectionnées et configurez les paramètres de chacun d’entre eux.",
    "enableMapFilter": "Supprimez le filtre prédéfini de la couche de la carte.",
    "newFilter": "Nouveau filtre",
    "filterExpression": "Expression de filtre",
    "layerDefaultSymbolTip": "Utiliser le symbole par défaut de la couche",
    "uploadImage": "Charger une image",
    "selectLayerTip": "Sélectionnez une couche.",
    "setTitleTip": "Définissez le titre.",
    "noTasksTip": "Aucun filtre configuré. Cliquez sur « ${newFilter} » pour en ajouter une nouvelle.",
    "collapseFiltersTip": "Réduire les expressions de filtre (le cas échéant) à l’ouverture du widget",
    "groupFiltersTip": "Grouper les filtres par couche"
  },
  "networkServiceChooser": {
    "arcgislabel": "Ajouter depuis ArcGIS Online",
    "serviceURLabel": "Ajouter une URL de service",
    "routeURL": "URL de l’itinéraire",
    "validateRouteURL": "Valider",
    "exampleText": "Exemple",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Spécifiez un service d’itinéraire valide.",
    "rateLimitExceeded": "Limite de débit atteinte. Réessayez ultérieurement.",
    "errorInvokingService": "Le nom d'utilisateur ou le mot de passe est incorrect."
  },
  "errorStrings": {
    "bufferErrorString": "Saisissez une valeur numérique valide.",
    "selectLayerErrorString": "Sélectionnez les couches à rechercher.",
    "invalidDefaultValue": "La distance de la zone tampon par défaut ne peut pas être vide. Veuillez spécifier la distance de la zone tampon.",
    "invalidMaximumValue": "La distance de la zone tampon maximale ne peut pas être vide. Veuillez spécifier la distance de la zone tampon.",
    "defaultValueLessThanMax": "Spécifiez la distance de la zone tampon par défaut au sein de la limite maximale",
    "defaultBufferValueGreaterThanOne": "La distance de la zone tampon par défaut ne peut pas être inférieure à 0",
    "maximumBufferValueGreaterThanOne": "Spécifiez une distance de la zone tampon maximale supérieure à 0",
    "invalidMaximumResultCountValue": "Spécifiez une valeur valide pour le nombre maximal de résultats",
    "invalidSearchSources": "Paramètres de source de recherche non valides"
  },
  "symbolPickerPreviewText": "Aperçu :"
});