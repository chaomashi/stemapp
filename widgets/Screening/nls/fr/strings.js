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
  "_widgetLabel": "Filtrage",
  "geometryServicesNotFound": "Service de géométrie non disponible.",
  "unableToDrawBuffer": "Impossible de tracer la zone tampon. Réessayez.",
  "invalidConfiguration": "Configuration non valide.",
  "clearAOIButtonLabel": "Recommencer à zéro",
  "noGraphicsShapefile": "Le fichier de formes chargé ne contient aucun graphique.",
  "zoomToLocationTooltipText": "Zoom sur l'emplacement",
  "noGraphicsToZoomMessage": "Graphiques à agrandir introuvables.",
  "placenameWidget": {
    "placenameLabel": "Rechercher un emplacement"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Sélectionner le mode de dessin",
    "toggleSelectability": "Cliquez pour activer/désactiver le caractère sélectionnable",
    "chooseLayerTitle": "Choisir une couche sélectionnable",
    "selectAllLayersText": "Sélectionner tout",
    "layerSelectionWarningTooltip": "Au moins une couche doit être sélectionnée pour la création AOI"
  },
  "shapefileWidget": {
    "shapefileLabel": "Charger un fichier de formes compressé",
    "uploadShapefileButtonText": "Charger",
    "unableToUploadShapefileMessage": "Impossible de charger le fichier de formes."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Définir un point de départ",
    "addButtonTitle": "Ajouter",
    "deleteButtonTitle": "Supprimer",
    "mapTooltipForStartPoint": "Cliquez sur la carte pour définir un point de départ",
    "mapTooltipForUpdateStartPoint": "Cliquez sur la carte pour mettre à jour le point de départ",
    "locateText": "Localiser",
    "locateByMapClickText": "Sélectionner les coordonnées initiales",
    "enterBearingAndDistanceLabel": "Entrer l'orientation et la distance à partir du point de départ",
    "bearingTitle": "Orientation",
    "distanceTitle": "Distance",
    "planSettingTooltip": "Paramètres du plan",
    "invalidLatLongMessage": "Entrez des valeurs valides."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Distance de zone tampon (facultative)",
    "bufferInputLabel": "Afficher les résultats dans"
  },
  "traverseSettings": {
    "bearingLabel": "Orientation",
    "lengthLabel": "Longueur",
    "addButtonTitle": "Ajouter",
    "deleteButtonTitle": "Supprimer"
  },
  "planSettings": {
    "expandGridTooltipText": "Développer la grille",
    "collapseGridTooltipText": "Réduire la grille",
    "directionUnitLabelText": "Unité de feuille de route",
    "distanceUnitLabelText": "Unités de distance et de longueur",
    "planSettingsComingSoonText": "Prochainement"
  },
  "newTraverse": {
    "invalidBearingMessage": "Orientation non valide.",
    "invalidLengthMessage": "Longueur non valide.",
    "negativeLengthMessage": "Longueur négative"
  },
  "reportsTab": {
    "aoiAreaText": "Zone AOI",
    "downloadButtonTooltip": "Télécharger",
    "printButtonTooltip": "Imprimer",
    "uploadShapefileForAnalysisText": "Charger le fichier de formes à inclure dans l'analyse",
    "uploadShapefileForButtonText": "Parcourir",
    "downloadLabelText": "Sélectionner le format :",
    "downloadBtnText": "Télécharger",
    "noDetailsAvailableText": "Aucun résultat trouvé",
    "featureCountText": "Nombre",
    "featureAreaText": "Surface",
    "featureLengthText": "Longueur",
    "attributeChooserTooltip": "Choisir les attributs à afficher",
    "csv": "CSV",
    "filegdb": "Géodatabase fichier",
    "shapefile": "Fichier de formes",
    "noFeaturesFound": "Résultats introuvables pour le format de fichier sélectionné",
    "selectReportFieldTitle": "Sélectionner des champs",
    "noFieldsSelected": "Aucun champ sélectionné",
    "intersectingFeatureExceedsMsgOnCompletion": "Le nombre maximal d'enregistrements a été atteint pour une ou plusieurs couches.",
    "unableToAnalyzeText": "Analyse impossible. Le nombre maximal d'enregistrements a été atteint.",
    "errorInPrintingReport": "Impossible d'imprimer le rapport. Vérifiez si ses paramètres sont valides.",
    "aoiInformationTitle": "Informations AOI",
    "summaryReportTitle": "Résumé",
    "notApplicableText": "N/D",
    "downloadReportConfirmTitle": "Confirmer le téléchargement",
    "downloadReportConfirmMessage": "Voulez-vous vraiment procéder au téléchargement ?",
    "noDataText": "Aucune donnée",
    "createReplicaFailedMessage": "Echec du téléchargement pour les couches suivantes : <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Echec du téléchargement.",
    "printLayoutLabelText": "Mise en page",
    "printBtnText": "Imprimer",
    "printDialogHint": "Remarque : le titre du rapport et les commentaires peuvent être modifiés dans l'aperçu du rapport.",
    "unableToDownloadFileGDBText": "Géodatabase fichier ne peut pas être téléchargé pour la zone AOI contenant des emplacements de lignes ou de points",
    "unableToDownloadShapefileText": "Le fichier de formes ne peut pas être téléchargé pour la zone AOI contenant des emplacements de lignes ou de points",
    "analysisUnitLabelText": "Afficher les résultats dans :",
    "analysisUnitButtonTooltip": "Choisir les unités pour l’analyse",
    "analysisCloseBtnText": "Fermer",
    "feetUnit": "Pieds/Pieds carrés",
    "milesUnit": "Miles/Acres",
    "metersUnit": "Mètres/Mètres carrés",
    "kilometersUnit": "Kilomètres/Kilomètres carrés",
    "hectaresUnit": "Kilomètres/Hectares",
    "hectaresAbbr": "hectares",
    "layerNotVisibleText": "Impossible d’analyser, la couche est désactivée ou se trouve en dehors de la plage de visibilité d’échelle.",
    "refreshBtnTooltip": "Actualiser le rapport",
    "featureCSVAreaText": "Zone d’intersection",
    "featureCSVLengthText": "Longueur d’intersection",
    "errorInFetchingPrintTask": "Erreur de récupération des informations de la tâche d’impression. Réessayez."
  }
});