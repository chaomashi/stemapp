define({
  "layersPage": {
    "allLayers": "Toutes les couches",
    "title": "Sélectionnez un modèle pour créer des entités",
    "generalSettings": "Paramètres généraux",
    "layerSettings": "Paramètres de la couche",
    "presetValueText": "Définir des valeurs prédéfinies",
    "geocoderSettingsText": "Paramètres du géocodeur",
    "editDescription": "Fournir le texte à afficher pour la fenêtre de mise à jour",
    "editDescriptionTip": "Ce texte apparaît au-dessus du sélecteur de modèles. Vous pouvez également n'indiquer aucun texte.",
    "promptOnSave": "Demandez à enregistrer les modifications non enregistrées lors de la fermeture du formulaire ou de l'accès au prochain enregistrement.",
    "promptOnSaveTip": "Affichez une invite lorsque l'utilisateur clique sur Fermer ou accède au prochain enregistrement modifiable alors que l'entité actuelle comporte des modifications non enregistrées.",
    "promptOnDelete": "Demandez confirmation lors de la suppression d'un enregistrement.",
    "promptOnDeleteTip": "Afficher une invite lorsque l’utilisateur clique sur Supprimer pour confirmer l’action.",
    "removeOnSave": "Supprimez l'entité de la sélection lors de l'enregistrement.",
    "removeOnSaveTip": "Option permettant de supprimer l'entité du jeu de sélection lors de la sauvegarde de l'enregistrement. S'il s'agit du seul enregistrement sélectionné, la fenêtre revient sur la page du modèle.",
    "useFilterEditor": "Utiliser le filtre des modèles d'entités",
    "useFilterEditorTip": "Option permettant d’utiliser le sélecteur Filtrer les modèles visant à afficher un modèle de couche ou à rechercher des modèles en fonction de leur nom.",
    "displayShapeSelector": "Afficher les options de dessin",
    "displayShapeSelectorTip": "Option permettant d’afficher une liste des options de dessin valides pour le modèle sélectionné.",
    "displayPresetTop": "Afficher la liste de valeurs prédéfinies au-dessus",
    "displayPresetTopTip": "Option permettant d’afficher la liste de valeurs prédéfinies au-dessus du sélecteur de modèles.",
    "listenToGroupFilter": "Appliquer des valeurs de filtre du widget Filtrer les groupes aux champs prédéfinis",
    "listenToGroupFilterTip": "Lorsqu'un filtre est appliqué dans le widget Filtrer les groupes, appliquez la valeur à un champ d'appariement dans la liste des valeurs prédéfinies.",
    "keepTemplateActive": "Conserver le modèle sélectionné actif",
    "keepTemplateActiveTip": "Lorsque le sélecteur de modèles est affiché, si un modèle a été précédemment sélectionné, resélectionnez-le.",
    "geometryEditDefault": "Autoriser la modification de géométrie par défaut",
    "autoSaveEdits": "Enregistre automatiquement la modification",
    "enableAttributeUpdates": "Afficher le bouton de mise à jour Actions des attributs lorsque le mode de mise à jour de la géométrie est actif",
    "layerSettingsTable": {
      "allowDelete": "Autoriser la suppression",
      "allowDeleteTip": "Option qui permet à l'utilisateur de supprimer une entité. Désactivée si la couche ne prend pas en charge la suppression",
      "edit": "Modifiable",
      "editTip": "Option permettant d'inclure la couche dans le widget",
      "label": "Couche",
      "labelTip": "Nom de la couche selon la définition de la carte",
      "update": "Désactiver la mise à jour de la géométrie",
      "updateTip": "Option permettant de désactiver la possibilité de déplacement de la géométrie une fois positionnée ou de déplacement de la géométrie sur une entité existante.",
      "allowUpdateOnly": "Mettre à jour uniquement",
      "allowUpdateOnlyTip": "Option autorisant uniquement la modification des entités existantes. Sélectionnée par défaut et désélectionnée si la couche ne prend pas en charge la création de nouvelles entités.",
      "fieldsTip": "Modifier les champs à mettre à jour et définir les attributs intelligents",
      "actionsTip": "Option permettant de mettre à jour des champs ou d’accéder aux couches/tables associées",
      "description": "Description",
      "descriptionTip": "Option permettant de saisir le texte à afficher au-dessus de la page des attributs.",
      "relationTip": "Afficher les couches et tables associées"
    },
    "editFieldError": "Les modifications de champ et les attributs intelligents ne sont pas disponibles dans les couches non modifiables",
    "noConfigedLayersError": "Le widget Editeur intelligent requiert une ou plusieurs couches modifiables"
  },
  "editDescriptionPage": {
    "title": "Définir le texte de vue d'ensemble des attributs de <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Configurer les champs de <b>${layername}</b>",
    "copyActionTip": "Actions des attributs",
    "description": "Utilisez le bouton de mise à jour Actions pour activer les attributs intelligents sur une couche. Les attributs intelligents peuvent exiger, masquer ou désactiver un champ en fonction des valeurs d’autres champs. Utilisez le bouton de copie Actions pour activer et définir la source des valeurs de champs par intersection, adresse, coordonnées et valeur prédéfinie.",
    "fieldsNotes": "* est un champ obligatoire. Si vous désactivez Affichage pour ce champ, et que le modèle de mise à jour ne renseigne pas cette valeur de champ, vous ne pourrez pas enregistrer de nouvel enregistrement.",
    "smartAttachmentText": "Configurer l’action des pièces jointes intelligentes",
    "smartAttachmentPopupTitle": "Configurer les pièces jointes intelligentes de <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Affichage",
      "displayTip": "Déterminer si le champ n'est pas visible",
      "edit": "Modifiable",
      "editTip": "Activer si le champ est présent dans le formulaire d'attribut",
      "fieldName": "Nom",
      "fieldNameTip": "Nom du champ défini dans la base de données",
      "fieldAlias": "Alias",
      "fieldAliasTip": "Nom du champ défini dans la carte",
      "canPresetValue": "Prédéfini",
      "canPresetValueTip": "Option permettant d'afficher le champ dans la liste des champs prédéfinis et d'autoriser l'utilisateur à définir la valeur avant la mise à jour",
      "actions": "Actions",
      "actionsTip": "Modifier l'ordre des champs ou configurer les attributs intelligents"
    },
    "smartAttSupport": "Les attributs intelligents ne sont pas pris en charge dans les champs de base de données requis"
  },
  "actionPage": {
    "title": "Configurer les actions des attributs de <b>${fieldname}</b>",
    "description": "Les actions sont toujours désactivées sauf si vous spécifiez leurs critères de déclenchement. Les actions sont traitées par ordre et une seule action est déclenchée par champ. Utilisez le bouton de mise à jour des critères pour définir ces derniers.",
    "actionsSettingsTable": {
      "rule": "Opération",
      "ruleTip": "Action effectuée une fois le critère rempli",
      "expression": "Expression",
      "expressionTip": "L'expression obtenue au format SQL à partir des critères définis",
      "actions": "Critère",
      "actionsTip": "Modifier l'ordre de la règle et définir les critères lors de son déclenchement"
    },
    "copyAction": {
      "description": "Les sources des valeurs de champs sont traitées dans l’ordre si elles sont activées, jusqu’au déclenchement d’un critère valide ou jusqu’à la fin de la liste. Utiliser le bouton de mise à jour des critères pour définir le critère.",
      "intersection": "Intersection",
      "coordinates": "Coordonnées",
      "address": "Adresse",
      "preset": "Prédéfini",
      "actionText": "Actions",
      "criteriaText": "Critère",
      "enableText": "Activé"
    },
    "actions": {
      "hide": "Masquer",
      "required": "Obligatoire",
      "disabled": "Désactivé"
    }
  },
  "filterPage": {
    "submitHidden": "Soumettre les données attributaires de ce champ même s'il est masqué ?",
    "title": "Configurer l'expression de la règle ${action}",
    "filterBuilder": "Définir l'action sur le champ lorsque l'enregistrement correspond à ${any_or_all} des expressions suivantes",
    "noFilterTip": "A l'aide des outils ci-dessous, définissez l'instruction indiquant la période d'activité de l'action."
  },
  "geocoderPage": {
    "setGeocoderURL": "Définir l'URL du géocodeur",
    "hintMsg": "Remarque : vous modifiez le service de géocodeur. Veillez à mettre à jour les appariements de champs du géocodeur que vous avez configurés.",
    "invalidUrlTip": "L’URL ${URL} est incorrecte ou inaccessible."
  },
  "addressPage": {
    "popupTitle": "Adresse",
    "checkboxLabel": "Obtenir la valeur du géocodeur",
    "selectFieldTitle": "Attribut :",
    "geocoderHint": "Pour modifier le géocodeur, utiliser le bouton 'Paramètres du géocodeur' dans les paramètres généraux"
  },
  "coordinatesPage": {
    "popupTitle": "Coordonnées",
    "checkboxLabel": "Obtenir les coordonnées",
    "coordinatesSelectTitle": "Système de coordonnées :",
    "coordinatesAttributeTitle": "Attribut :",
    "mapSpatialReference": "Référence spatiale de la carte",
    "latlong": "Latitude/Longitude"
  },
  "presetPage": {
    "popupTitle": "Prédéfini",
    "checkboxLabel": "Le champ sera prédéfini",
    "presetValueLabel": "La valeur prédéfinie actuelle est :",
    "changePresetValueHint": "Pour modifier cette valeur prédéfinie, utiliser le bouton 'Définir des valeurs prédéfinies' dans les paramètres généraux"
  },
  "intersectionPage": {
    "checkboxLabel": "Obtenir la valeur du champ de la couche d’intersection",
    "layerText": "Couches",
    "fieldText": "Champs",
    "actionsText": "Actions",
    "addLayerLinkText": "Ajouter une couche"
  },
  "presetAll": {
    "popupTitle": "Définir les valeurs prédéfinies par défaut",
    "deleteTitle": "Supprimer la valeur prédéfinie.",
    "hintMsg": "Les noms uniques de tous les champs prédéfinis sont répertoriés ici. Si vous supprimez un champ prédéfini, le champ respectif est désactivé comme prédéfini pour toutes les couches/tables."
  }
});