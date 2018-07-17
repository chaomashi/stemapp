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
  "_widgetLabel": "Cost Analysis bêta",
  "unableToFetchInfoErrMessage": "Impossible de récupérer les détails de service de géométrie/couche configurée",
  "invalidCostingGeometryLayer": "Impossible d’obtenir « esriFieldTypeGlobalID » dans la couche de géométrie de coût.",
  "projectLayerNotFound": "Couche de projet configurée introuvable sur la carte.",
  "costingGeometryLayerNotFound": "Couche de géométrie de coût configurée introuvable sur la carte.",
  "projectMultiplierTableNotFound": "Table de coûts supplémentaire de multiplicateur de projet configurée introuvable sur la carte.",
  "projectAssetTableNotFound": "Table de ressources de projet configurée introuvable sur la carte.",
  "createLoadProject": {
    "createProjectPaneTitle": "Créer un projet",
    "loadProjectPaneTitle": "Charger le projet",
    "projectNamePlaceHolder": "Nom du projet",
    "projectDescPlaceHolder": "Description du projet",
    "selectProject": "Sélectionner un projet",
    "viewInMapLabel": "Afficher sur la carte",
    "loadLabel": "Charger",
    "createLabel": "Créer",
    "deleteProjectConfirmationMsg": "Voulez-vous vraiment supprimer le projet ?",
    "noAssetsToViewOnMap": "Le projet sélectionné ne comporte aucune ressource à afficher sur la carte.",
    "projectDeletedMsg": "Projet supprimé avec succès",
    "errorInCreatingProject": "Erreur lors de la création du projet.",
    "errorProjectNotFound": "Projet introuvable.",
    "errorInLoadingProject": "Vérifiez qu’un projet valide est sélectionné.",
    "errorProjectNotSelected": "Sélectionnez un projet dans la liste déroulante.",
    "errorDuplicateProjectName": "Le nom de projet existe déjà."
  },
  "statisticsSettings": {
    "tabTitle": "Paramètres de statistiques",
    "addStatisticsLabel": "Ajouter des statistiques",
    "addNewStatisticsText": "Ajouter de nouvelles statistiques",
    "deleteStatisticsText": "Supprimer les statistiques",
    "moveStatisticsUpText": "Déplacer les statistiques vers le haut",
    "moveStatisticsDownText": "Déplacer les statistiques vers le bas",
    "layerNameTitle": "Couche",
    "statisticsTypeTitle": "Type",
    "fieldNameTitle": "Terrain",
    "statisticsTitle": "Etiquette",
    "actionLabelTitle": "Actions",
    "selectDeselectAllTitle": "Sélectionner tout"
  },
  "statisticsType": {
    "countLabel": "Total",
    "averageLabel": "Moyenne",
    "maxLabel": "Maximum",
    "minLabel": "Minimal",
    "summationLabel": "Addition",
    "areaLabel": "Surface",
    "lengthLabel": "Longueur"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "La ou les couches doivent être sélectionnées comme modifiables dans l’onglet des paramètres de couche"
  },
  "workBench": {
    "refresh": "Actualiser",
    "noAssetAddedMsg": "Aucune ressource ajoutée",
    "units": "unité(s)",
    "assetDetailsTitle": "Détails d’éléments de ressources",
    "costEquationTitle": "Équation de coût",
    "newCostEquationTitle": "Nouvelle équation",
    "defaultCostEquationTitle": "Équation par défaut",
    "geographyTitle": "Géographie",
    "scenarioTitle": "Scénario",
    "costingInfoHintText": "<div>Conseil : Utilisez les mots-clés suivants</div><ul><li><b>{TOTALCOUNT}</b> : Utilise le nombre total de ressources du même type dans une géographie</li> <li><b>{MEASURE}</b> : Utilise la longueur de surface et de ressource de ligne pour la ressource de polygone</li><li><b>{TOTALMEASURE}</b> : Utilise la longueur totale de ressource de ligne et de surface totale pour la ressource de polygone du même type dans une géographie</li></ul> Vous pouvez utiliser des fonctions telles que :<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Modifiez l’équation de coût selon les besoins de votre projet.",
    "zoomToAsset": "Zoom sur la ressource",
    "deleteAsset": "Supprimer la ressource",
    "closeDialog": "Fermer la boîte de dialogue",
    "objectIdColTitle": "Identifiant d’objet",
    "costColTitle": "Coût",
    "errorInvalidCostEquation": "Équation de coût non valide.",
    "errorInSavingAssetDetails": "Impossible d’enregistrer les détails de ressources."
  },
  "assetDetails": {
    "inGeography": " dans ${geography} ",
    "withScenario": " avec ${scenario}",
    "totalCostTitle": "Coût total",
    "additionalCostLabel": "Description",
    "additionalCostValue": "Valeur",
    "additionalCostNetValue": "Valeur nette"
  },
  "projectOverview": {
    "assetItemsTitle": "Éléments de ressources",
    "assetStatisticsTitle": "Statistiques de ressources",
    "projectSummaryTitle": "Résumé du projet",
    "projectName": "Nom du projet : ${name}",
    "totalCostLabel": "Coût total du projet (*) :",
    "grossCostLabel": "Coût brut du projet (*) :",
    "roundingLabel": "* Arrondissement à « ${selectedRoundingOption} »",
    "unableToSaveProjectBoundary": "Impossible d’enregistrer la limite de projet dans la couche de projet.",
    "unableToSaveProjectCost": "Impossible d’enregistrer le ou les coûts dans la couche de projet.",
    "roundCostValues": {
      "twoDecimalPoint": "Deux points décimaux",
      "nearestWholeNumber": "Nombre entier le plus proche",
      "nearestTen": "Dizaine la plus proche",
      "nearestHundred": "Centaine la plus proche",
      "nearestThousand": "Milliers les plus proches",
      "nearestTenThousands": "Dix mille les plus proches"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Attribut de projet",
    "projectAttributeTitle": "Modifier les attributs de projet"
  },
  "costEscalation": {
    "costEscalationLabel": "Ajouter un coût supplémentaire",
    "valueHeader": "Valeur",
    "addCostEscalationText": "Ajouter un coût supplémentaire",
    "deleteCostEscalationText": "Supprimer le coût supplémentaire sélectionné",
    "moveCostEscalationUpText": "Déplacer le coût supplémentaire sélectionné vers le haut",
    "moveCostEscalationDownText": "Déplacer le coût supplémentaire sélectionné vers le bas",
    "invalidEntry": "Une ou plusieurs entrées ne sont pas valides",
    "errorInSavingCostEscalation": "Impossible d’enregistrer les détails de coûts supplémentaires."
  },
  "scenarioSelection": {
    "popupTitle": "Sélectionner le scénario de la ressource",
    "regionLabel": "Géographie",
    "scenarioLabel": "Scénario",
    "noneText": "Aucun",
    "copyFeatureMsg": "Souhaitez-vous copier les entités sélectionnées ?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Statistiques de détails",
    "noDetailStatisticAvailable": "Aucune statistique de ressource ajoutée"
  }
});