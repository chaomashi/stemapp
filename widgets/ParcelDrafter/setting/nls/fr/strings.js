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
  "setBtnLabel": "Définir",
  "selectLabel": "Sélectionner",
  "selectLayerLabel": "Sélectionner des couches de parcelles",
  "selectLayerHintText": "Astuce : utilisez le bouton Définir pour sélectionner le polygone de parcelle et sa couche de lignes associée",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "La couche de polygones sélectionnée n'est pourvue d'aucune couche associée valide."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Sélectionner une couche de lignes associée",
    "layerSettingTabLabel": "Couches de parcelles",
    "advancedSettingTabLabel": "Paramètres avancés",
    "selectLayerHintText": "Astuce : à utiliser pour stocker les valeurs COGO dans la couche de lignes de parcelle",
    "selectFieldLegendLabel": "Sélectionner des champs pour stocker les valeurs COGO dans la couche de lignes de parcelle",
    "bearingFieldLabel": "Orientation",
    "chordLengthFieldLabel": "Longueur de la corde",
    "distanceFieldLabel": "Distance",
    "sequenceIdFieldLabel": "ID de séquence",
    "radiusFieldLabel": "Rayon",
    "foreignKeyFieldLabel": "Clé étrangère",
    "arcLengthFieldLabel": "Longueur de l’arc",
    "lineTypeFieldLabel": "Type de ligne",
    "parcelPointSymbolLabel": "Symbole de point parcelle",
    "parcelPointSymbolHintText": "Astuce : utilisé pour afficher le symbole de point correspondant à l'origine de la ligne.",
    "symbolPickerPreviewText": "Aperçu",
    "selectLineLayerLabel": "Sélectionner une couche de lignes"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Sélectionner la couche de polygones",
    "selectPolygonLayerHintText": "Astuce : utilisez la couche de polygones de parcelle sélectionnée",
    "selectFieldLegendLabel": "Sélectionner des champs pour stocker les attributs de polygones de parcelle",
    "parcelNameLabel": "Nom de parcelle",
    "rotationLabel": "Rotation",
    "planNameLabel": "Nom de plan",
    "scalingLabel": "Mise à l’échelle",
    "documentTypeLabel": "Type de document",
    "miscloseRatioLabel": "Taux d'écart de fermeture",
    "statedAreaLabel": "Zone indiquée",
    "miscloseDistanceLabel": "Distance d'écart de fermeture",
    "selectPolygonLayerLabelPopUp": "Sélectionner une couche de polygones"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Type de ligne",
    "valueLabel": "Valeur",
    "symbolLabel": "Symbole",
    "connectionLineLabel": "Ligne de connexion",
    "boundaryLineLabel": "Ligne de limite"
  },
  "closureSetting": {
    "snappingLayerLabel": "Capture de couches",
    "snappingBtnLabel": "Définir",
    "snappingLayerHintText": "Astuce : sélectionnez les couches pour lesquelles les lignes de parcelle seront capturées.",
    "miscloseDistanceLabel": "Distance d'écart de fermeture",
    "miscloseDistanceHintText": "Astuce : spécifiez la distance d'écart de fermeture et ses unités.",
    "miscloseRatioLabel": "Taux d'écart de fermeture",
    "miscloseRatioHintText": "Astuce : spécifiez un taux d'écart de fermeture.",
    "snappingToleranceLabel": "Tolérance de capture",
    "pixelLabel": "Pixels",
    "snappingToleranceHintText": "Astuce : spécifiez une tolérance de capture.",
    "selectLayerLabel": "Sélectionner une couche"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Champ de relèvement non valide",
    "chordLengthErrMsg": "ChordLength non valide",
    "distanceFieldErrMsg": "Distance non valide",
    "sequenceIdFieldErrMsg": "SequenceId non valide",
    "radiusFieldErrMsg": "Rayon non valide",
    "foreignKeyFieldErrMsg": "Clé étrangère non valide",
    "arcLengthFieldErrMsg": "Longueur d'arc non valide",
    "lineTypeFieldErrMsg": "Type de ligne non valide",
    "parcelNameFieldErrMsg": "Champ Nom de parcelle non valide",
    "planNameFieldErrMsg": "Champ Nom de plan non valide",
    "scaleFieldErrMsg": "Champ Echelle non valide",
    "documentTypeFieldErrMsg": "Champ Type de document non valide",
    "miscloseRatioFieldErrMsg": "Champ Taux d'écart de fermeture non valide",
    "statedAreaFieldErrMsg": "Champ Zone indiquée non valide",
    "miscloseDistanceFieldErrMsg": "Champ Distance d'écart de fermeture non valide",
    "globalIdFieldErrMsg": "La couche de polygones sélectionnée ne possède pas de champ \"esriFieldTypeGlobalID\" valide.",
    "invalidPolylineLayer": "Sélectionnez une couche de polylignes de parcelle valide",
    "invalidPolygonLayer": "Sélectionnez une couche de polygones de parcelle valide",
    "invalidMiscloseDistance": "Entrez une distance d'écart de fermeture valide",
    "invalidSnappingTolerance": "Entrez une tolérance de capture valide",
    "invalidMiscloseRatio": "Entrez un taux d'écart de fermeture valide",
    "selectDistinctLineTypes": "Sélectionnez une valeur distincte dans chaque type de ligne",
    "invalidConnectionLineType": "Valeur de ligne de connexion non valide",
    "invalidBoundaryLineType": "Valeur de ligne de limite non valide",
    "selectDistinctPolylineFields": "Sélectionnez un champ distinct pour chaque valeur COGO.",
    "selectDistinctPolygonFields": "Sélectionnez un champ distinct pour chaque attribut de polygone de parcelle."
  }
});