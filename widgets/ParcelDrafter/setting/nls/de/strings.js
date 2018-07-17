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
  "setBtnLabel": "Festlegen",
  "selectLabel": "Auswählen",
  "selectLayerLabel": "Flurstück-Layer auswählen",
  "selectLayerHintText": "Hinweis: Verwenden Sie die Schaltfläche \"Festlegen\", um das Flurstückpolygon und dessen zugehörigen Linien-Layer auszuwählen.",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "Der ausgewählte Polygon-Layer weist keinen gültigen zugehörigen Layer auf."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Zugehörigen Linien-Layer auswählen",
    "layerSettingTabLabel": "Flurstück-Layer",
    "advancedSettingTabLabel": "Erweiterte Einstellungen",
    "selectLayerHintText": "Hinweis: Verwenden Sie diese Einstellungen, um COGO-Werte im Flurstücklinien-Layer zu speichern.",
    "selectFieldLegendLabel": "Wählen Sie Felder aus, um COGO-Werte im Flurstücklinien-Layer zu speichern.",
    "bearingFieldLabel": "Peilung",
    "chordLengthFieldLabel": "Sehnenlänge",
    "distanceFieldLabel": "Abstand",
    "sequenceIdFieldLabel": "Sequenz-ID",
    "radiusFieldLabel": "Radius",
    "foreignKeyFieldLabel": "Fremdschlüssel",
    "arcLengthFieldLabel": "Bogenlänge",
    "lineTypeFieldLabel": "Linientyp",
    "parcelPointSymbolLabel": "Flurstück-Punktsymbol",
    "parcelPointSymbolHintText": "Hinweis: Wird verwendet, um Punktsymbole für den Linienursprung anzuzeigen.",
    "symbolPickerPreviewText": "Vorschau",
    "selectLineLayerLabel": "Linien-Layer auswählen"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Polygon-Layer auswählen",
    "selectPolygonLayerHintText": "Hinweis: Verwenden Sie den ausgewählten Flurstück-Polygonlayer.",
    "selectFieldLegendLabel": "Wählen Sie Felder aus, um Flurstück-Polygonattribute zu speichern.",
    "parcelNameLabel": "Flurstücksname",
    "rotationLabel": "Drehung",
    "planNameLabel": "Planname",
    "scalingLabel": "Skalierung",
    "documentTypeLabel": "Dokumenttyp",
    "miscloseRatioLabel": "Abschlussfehler-Verhältnis",
    "statedAreaLabel": "Angegebene Fläche",
    "miscloseDistanceLabel": "Abschlussfehler-Entfernung",
    "selectPolygonLayerLabelPopUp": "Polygon-Layer auswählen"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Linientyp",
    "valueLabel": "Wert",
    "symbolLabel": "Symbol",
    "connectionLineLabel": "Verbindungslinien",
    "boundaryLineLabel": "Grenzlinie"
  },
  "closureSetting": {
    "snappingLayerLabel": "Fang-Layer",
    "snappingBtnLabel": "Festlegen",
    "snappingLayerHintText": "Hinweis: Wählen Sie Layer aus, an denen Flurstückslinien gefangen werden.",
    "miscloseDistanceLabel": "Abschlussfehler-Entfernung",
    "miscloseDistanceHintText": "Hinweis: Legen Sie die Abschlussfehler-Entfernung und ihre Einheiten fest.",
    "miscloseRatioLabel": "Abschlussfehler-Verhältnis",
    "miscloseRatioHintText": "Hinweis: Legen Sie das Abschlussfehler-Verhältnis fest.",
    "snappingToleranceLabel": "Fangtoleranz",
    "pixelLabel": "Pixel",
    "snappingToleranceHintText": "Hinweis: Legen Sie die Fangtoleranz fest.",
    "selectLayerLabel": "Layer auswählen"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Ungültiges Peilungsfeld",
    "chordLengthErrMsg": "Ungültige Sehnenlänge",
    "distanceFieldErrMsg": "Ungültige Entfernung",
    "sequenceIdFieldErrMsg": "Ungültige Sequenz-ID",
    "radiusFieldErrMsg": "Ungültiger Radius",
    "foreignKeyFieldErrMsg": "Ungültiger Fremdschlüssel",
    "arcLengthFieldErrMsg": "Ungültige Bogenlänge",
    "lineTypeFieldErrMsg": "Ungültiger Linientyp",
    "parcelNameFieldErrMsg": "Ungültiges Flurstücksnamensfeld",
    "planNameFieldErrMsg": "Ungültiges Plannamensfeld",
    "scaleFieldErrMsg": "Ungültiges Maßstabsfeld",
    "documentTypeFieldErrMsg": "Ungültiges Feld für Dokumenttyp",
    "miscloseRatioFieldErrMsg": "Ungültiges Feld für Abschlussfehler-Verhältnis",
    "statedAreaFieldErrMsg": "Ungültiges Feld für angegebene Fläche",
    "miscloseDistanceFieldErrMsg": "Ungültiges Feld für Abschlussfehler-Entfernung",
    "globalIdFieldErrMsg": "Der ausgewählte Polygon-Layer weist kein gültiges 'esriFieldTypeGlobalID‘-Feld auf.",
    "invalidPolylineLayer": "Wählen Sie einen gültigen Flurstückspolylinien-Layer aus.",
    "invalidPolygonLayer": "Wählen Sie einen gültigen Flurstückspolygon-Layer aus.",
    "invalidMiscloseDistance": "Geben Sie eine gültige Abschlussfehler-Entfernung ein.",
    "invalidSnappingTolerance": "Geben Sie eine gültige Fangtoleranz ein.",
    "invalidMiscloseRatio": "Geben Sie ein gültiges Abschlussfehler-Verhältnis ein.",
    "selectDistinctLineTypes": "Wählen Sie bei jedem Linientyp einen individuellen Wert aus.",
    "invalidConnectionLineType": "Ungültiger Verbindungslinienwert",
    "invalidBoundaryLineType": "Ungültiger Grenzlinienwert",
    "selectDistinctPolylineFields": "Wählen Sie für jeden COGO-Wert ein individuelles Feld aus.",
    "selectDistinctPolygonFields": "Wählen Sie für jedes Flurstückspolygon-Attribut ein individuelles Feld aus."
  }
});