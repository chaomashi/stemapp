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
    "miles": "Miles",
    "kilometers": "Kilomètres",
    "feet": "Pieds",
    "meters": "Mètres"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Paramètres de recherche",
    "buttonSet": "Définir",
    "selectLayersLabel": "Sélectionner une couche",
    "selectLayersHintText": "Astuce : utilisé pour sélectionner la couche de polygones et la couche de points associée.",
    "selectPrecinctSymbolLabel": "Sélectionner le symbole pour mettre le polygone en surbrillance",
    "selectGraphicLocationSymbol": "Symbole d’adresse ou d’emplacement",
    "graphicLocationSymbolHintText": "Astuce : symbole d’une adresse recherchée ou d’un emplacement sélectionné",
    "precinctSymbolHintText": "Astuce : utilisé pour afficher le symbole du polygone sélectionné",
    "selectColorForPoint": "Sélectionner une couleur pour mettre en surbrillance le point",
    "selectColorForPointHintText": "Astuce : permet d'afficher la couleur de surbrillance du point sélectionné"
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
    "invalidUrlTip": "L’URL ${URL} est incorrecte ou inaccessible.",
    "invalidSearchSources": "Paramètres de source de recherche non valides"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Sélectionner la couche de polygones",
    "selectPolygonLayerHintText": "Astuce : utilisé pour sélectionner la couche de polygones.",
    "selectRelatedPointLayerLabel": "Sélectionner la couche de points associée à la couche de polygones",
    "selectRelatedPointLayerHintText": "Astuce : utilisé pour sélectionner la couche de points associée à la couche de polygones",
    "polygonLayerNotHavingRelatedLayer": "Sélectionnez une couche de polygones possédant une couche de points associée.",
    "errorInSelectingPolygonLayer": "Sélectionnez une couche de polygones possédant une couche de points associée.",
    "errorInSelectingRelatedLayer": "Sélectionnez la couche de points associée à la couche de polygones."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Attributs de direction",
    "routeServiceUrl": "Service de calcul d'itinéraire",
    "buttonSet": "Définir",
    "routeServiceUrlHintText": "Astuce : cliquez sur ‘Définir’ pour rechercher et sélectionner un service de calcul d’itinéraire d’analyse du réseau",
    "directionLengthUnit": "Unités de longueur de la direction",
    "unitsForRouteHintText": "Astuce : utilisé pour afficher les unités signalées pour l’itinéraire",
    "selectRouteSymbol": "Sélectionner le symbole pour afficher l’itinéraire",
    "routeSymbolHintText": "Astuce : utilisé pour afficher le symbole linéaire de l’itinéraire",
    "routingDisabledMsg": "Pour activer les directions, assurez-vous que le calcul d’itinéraire est activé dans l’élément ArcGIS Online."
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
  "symbolPickerPreviewText": "Aperçu :",
  "showToolToSelectLabel": "Bouton Définir l'emplacement",
  "showToolToSelectHintText": "Conseil : fournit un bouton permettant de définir un emplacement sur la carte au lieu de toujours configurer l'emplacement lorsque l'utilisateur clique sur la carte"
});