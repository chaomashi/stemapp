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
  "configText": "Définir le texte de configuration :",
  "generalSettings": {
    "tabTitle": "paramètres généraux",
    "measurementUnitLabel": "Unité de mesure",
    "currencyLabel": "Symbole de mesure",
    "roundCostLabel": "Coût arrondi",
    "projectOutputSettings": "Paramètres de sortie de projet",
    "typeOfProjectAreaLabel": "Type de zone de projet",
    "bufferDistanceLabel": "Distance de la zone tampon",
    "roundCostValues": {
      "twoDecimalPoint": "Deux points décimaux",
      "nearestWholeNumber": "Nombre entier le plus proche",
      "nearestTen": "Dizaine la plus proche",
      "nearestHundred": "Centaine la plus proche",
      "nearestThousand": "Milliers les plus proches",
      "nearestTenThousands": "Dix mille les plus proches"
    },
    "projectAreaType": {
      "outline": "Contour",
      "buffer": "Zone tampon"
    },
    "errorMessages": {
      "currency": "Unité de devise non valide",
      "bufferDistance": "Distance de zone tampon non valide",
      "outOfRangebufferDistance": "La valeur doit être supérieure à 0 et inférieure ou égale à 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Paramètres du projet",
    "costingGeometrySectionTitle": "Définir la géographie pour les coûts (facultatif)",
    "costingGeometrySectionNote": "Remarque : Configurer cette couche permettra à l’utilisateur de définir des équations de coûts de modèles d’entités en fonction des géographies.",
    "projectTableSectionTitle": "Possibilité d’enregistrer/de charger les paramètres de projet (facultatif)",
    "projectTableSectionNote": "Remarque : Configurer toutes les tables et couches permettra à l’utilisateur d’enregistrer/de charger le projet pour une utilisation ultérieure.",
    "costingGeometryLayerLabel": "Couche de géométrie de coûts",
    "fieldLabelGeography": "Champ de la géographie d’étiquette",
    "projectAssetsTableLabel": "Table de ressources de projets",
    "projectMultiplierTableLabel": "Table de coûts supplémentaire de multiplicateur de projet",
    "projectLayerLabel": "Couche de projet",
    "configureFieldsLabel": "Configurer les champs",
    "fieldDescriptionHeaderTitle": "Description du champ",
    "layerFieldsHeaderTitle": "Champ de couche",
    "selectLabel": "Sélectionner",
    "errorMessages": {
      "duplicateLayerSelection": "La couche ${layerName} est déjà sélectionnée",
      "invalidConfiguration": "Sélectionnez ${fieldsString}"
    },
    "costingGeometryHelp": "<p>La ou les couches de polygones ayant les conditions suivantes seront affichées : <br/> <li>\tLa couche doit avoir la fonctionnalité â€œQueryâ€</li><li>\tLa couche doit comporter un champ GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Les champs de chaîne et numériques de la â€œcouche de géométrie de coûtâ€ sélectionnée seront affichés dans le menu déroulant â€œChamp de la géographie d’étiquetteâ€.</p>",
    "projectAssetsTableHelp": "<p>La ou les tables ayant les conditions suivantes seront affichées : <br/> <li>La table doit comporter des fonctionnalités de modification, à savoir â€œCréerâ€, â€œSupprimerâ€ et â€œMettre à jourâ€</li>    <li>La table doit comporter six champs avec un nom et un type de données exacts :</li><ul><li>\tAssetGUID (champ de type GUID)</li><li>\tCostEquation (champ de type chaîne)</li><li>\tScénario (champ de type chaîne)</li><li>\tTemplateName (champ de type chaîne)</li><li>    GeographyGUID (champ de type GUID)</li><li>\tProjectGUID (champ de type GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>La ou les tables ayant les conditions suivantes seront affichées : <br/> <li>La table doit comporter des fonctionnalités de modification, à savoir â€œCréerâ€, â€œSupprimerâ€ et â€œMettre à jourâ€</li>    <li>La table doit comporter cinq champs avec un nom et un type de données exacts :</li><ul><li>\tDescription (champ de type chaîne)</li><li>\tType (champ de type chaîne)</li><li>\tValeur (champ de type flottant/double)</li><li>\tCostindex (champ de type entier)</li><li>   \tProjectGUID (champ de type GUID)</li></ul> </p>",
    "projectLayerHelp": "<p>La ou les couches de polygones ayant les conditions suivantes seront affichées : <br/> <li>La couche doit comporter des fonctionnalités de modification, à savoir â€œCréerâ€, â€œSupprimerâ€ et â€œMettre à jourâ€</li>    <li>La couche doit comporter cinq champs avec un nom et un type de données exacts :</li><ul><li>ProjectName (champ de type chaîne)</li><li>Description (champ de type chaîne)</li><li>Totalassetcost (champ de type flottant/double)</li><li>Grossprojectcost (champ de type flottant/double)</li><li>GlobalID (champ de type GlobalID)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Paramètres de la couche",
    "layerNameHeaderTitle": "Nom de la couche",
    "layerNameHeaderTooltip": "Liste des couches sur la carte",
    "EditableLayerHeaderTitle": "Modifiable",
    "EditableLayerHeaderTooltip": "Inclure la couche et ses modèles dans le widget de coût",
    "SelectableLayerHeaderTitle": "Sélectionnable",
    "SelectableLayerHeaderTooltip": "La géométrie de l’entité peut être utilisée pour générer un nouvel élément de coût",
    "fieldPickerHeaderTitle": "ID de projet (facultatif)",
    "fieldPickerHeaderTooltip": "Champ facultatif (de type chaîne) pour stocker l’ID de projet dans",
    "selectLabel": "Sélectionner",
    "noAssetLayersAvailable": "Aucune couche valide trouvée sur la carte web",
    "disableEditableCheckboxTooltip": "Cette couche ne comporte aucune fonctionnalité de modification",
    "missingCapabilitiesMsg": "Les fonctionnalités suivantes sont absentes de cette couche :",
    "missingGlobalIdMsg": "Cette couche ne comporte pas le champ ID global",
    "create": "Créer",
    "update": "Mettre à jour",
    "delete": "Effacer"
  },
  "costingInfo": {
    "tabTitle": "Infos de coûts",
    "proposedMainsLabel": "Principaux proposés",
    "addCostingTemplateLabel": "Ajouter un modèle de coûts",
    "manageScenariosTitle": "Gérer les scénarios",
    "featureTemplateTitle": "Modèle d’entités",
    "costEquationTitle": "Équation de coût",
    "geographyTitle": "Géographie",
    "scenarioTitle": "Scénario",
    "actionTitle": "Actions",
    "scenarioNameLabel": "Nom du scénario",
    "addBtnLabel": "Ajouter",
    "srNoLabel": "Non.",
    "deleteLabel": "Effacer",
    "duplicateScenarioName": "Nom de scénario dupliqué",
    "hintText": "<div>Conseil : Utilisez les mots-clés suivants</div><ul><li><b>{TOTALCOUNT}</b> : Utilise le nombre total de ressources du même type dans une géographie</li><li><b>{MEASURE}</b> : Utilise la longueur de surface et de ressource de ligne pour la ressource de polygone</li><li><b>{TOTALMEASURE}</b> : Utilise la longueur totale de ressource de ligne et de surface totale pour la ressource de polygone du même type dans une géographie</li></ul> Vous pouvez utiliser des fonctions telles que :<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Modifiez l’équation de coût selon les besoins de votre projet.",
    "noneValue": "Aucun",
    "requiredCostEquation": "Équation de coût non valide pour ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Une entrée de modèle dupliquée existe pour ${layerName} : ${templateName}",
    "defaultEquationRequired": "L’équation par défaut est requise pour ${layerName} : ${templateName}",
    "validCostEquationMessage": "Entrez une équation de coût valide",
    "costEquationHelpText": "Modifiez l’équation de coût en fonction des besoins de votre projet",
    "scenarioHelpText": "Sélectionnez un scénario en fonction des besoins de votre projet",
    "copyRowTitle": "Copier la ligne",
    "noTemplateAvailable": "Ajoutez au moins un modèle pour ${layerName}",
    "manageScenarioLabel": "Gérer le scénario",
    "noLayerMessage": "Entrez au moins une couche dans ${tabName}",
    "noEditableLayersAvailable": "La ou les couches doivent être sélectionnées comme modifiables dans l’onglet des paramètres de couche"
  },
  "statisticsSettings": {
    "tabTitle": "Paramètres de statistiques",
    "addStatisticsLabel": "Ajouter des statistiques",
    "fieldNameTitle": "Terrain",
    "statisticsTitle": "Etiquette",
    "addNewStatisticsText": "Ajouter de nouvelles statistiques",
    "deleteStatisticsText": "Supprimer les statistiques",
    "moveStatisticsUpText": "Déplacer les statistiques vers le haut",
    "moveStatisticsDownText": "Déplacer les statistiques vers le bas",
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
  }
});