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
  root: ({
    "setBtnLabel": "Set", //Shown as select layer button title
    "selectLabel": "Select", // Shown as a label for default dropBox when field is not required.
    "selectLayerLabel": "Select parcel layers", // Shown as a label in config UI for parcel layers.
    "selectLayerHintText": "Hint: Use set button to select the parcel polygon and its related line layer", // Shown as hint text in config UI for layer hint text.

    "layerSelector": {
      "selectedLayerNotHavingRelatedLayer": "Selected polygon layer doesn't have a valid related layer." // Shown as error if selected parcel polygon layer doesn't have a valid related line layer.
    },

    "parcelLineLayer": {
      "selectLayerLabel": "Select related line layer", // shown as a label in config for select layer.
      "layerSettingTabLabel": "Parcel layers", // shown as label in config UI for first tab.
      "advancedSettingTabLabel": "Advanced settings", // shown as label in config UI for second tab.
      "selectLayerHintText": "Hint: Use to store COGO values in parcel line layer",
      // Shown as a hint text in config for select layer.
      "selectFieldLegendLabel": "Select fields to store COGO values in parcel line layer",
      "bearingFieldLabel": "Bearing", // shown as a label in config for bearing.
      "chordLengthFieldLabel": "Chord Length", // shown as a label in config for chord length.
      "distanceFieldLabel": "Distance", // shown as a label in config for Distance.
      "sequenceIdFieldLabel": "Sequence ID", // shown as a label in config for  sequence ID.
      "radiusFieldLabel": "Radius", // shown as a label in config for Radius.
      "foreignKeyFieldLabel": "Foreign Key", // shown as a label in config for Foreign Key.
      "arcLengthFieldLabel": "Arc Length", // shown as a label in config for Arc Length.
      "lineTypeFieldLabel": "Line Type", // shown as a label in config for Line Type.
      "parcelPointSymbolLabel": "Parcel Point Symbol", // shown as a label in config for Parcel Point Symbol.
      "parcelPointSymbolHintText": "Hint: Used to display point symbol for the origin of the line.",
      // Shown as a hint text in config for parcel point symbol.
      "symbolPickerPreviewText": "Preview", // shown as a label in config for Preview of symbol picker.
      "selectLineLayerLabel": "Select line layer" // shown as a label in config for line layer pop up
    },

    "parcelPolygonLayer": {
      "selectPolygonLayerLabel": "Select polygon layer", // shown as a label in config for Select layer from map.
      "selectPolygonLayerHintText": "Hint: Use the select parcel polygon layer", // Shown as a hint text in config for select polygon layer.
      "selectFieldLegendLabel": "Select fields to store parcel polygon attributes", // shown as a label in config for select field legend.
      "parcelNameLabel": "Parcel Name", // shown as a label in config for parcel name.
      "rotationLabel": "Rotation", // shown as a label in config for rotation.
      "planNameLabel": "Plan Name", // shown as a label in config for plan name.
      "scalingLabel": "Scaling", // shown as a label in config for scaling.
      "documentTypeLabel": "Document Type", // shown as a label in config for document type.
      "miscloseRatioLabel": "Misclose Ratio", // shown as a label in config for misclose ratio.
      "statedAreaLabel": "Stated Area", // shown as a label in config for stated area.
      "miscloseDistanceLabel": "Misclose Distance", // shown as a label in config for misclose distance.
      "selectPolygonLayerLabelPopUp": "Select a polygon layer" // shown as a label in config for line layer pop up
    },

    "lineTypesTable": {
      "lineTypeLabel": "Line Type", // shown as a label in config for column in simple table.
      "valueLabel": "Value", // shown as a label in config for column in simple table.
      "symbolLabel": "Symbol", // shown as a label in config for column in simple table.
      "connectionLineLabel": "Connection Line",
      "boundaryLineLabel": "Boundary Line"
    },

    "closureSetting": {
      "snappingLayerLabel": "Snapping Layers", // shown as a label in config for snapping layer.
      "snappingBtnLabel": "Set", // shown as a button label in closure setting.
      "snappingLayerHintText": "Hint: Select layers to which the parcel lines will snap.", // Shown as a hint text in config for snapping layer.
      "miscloseDistanceLabel": "Misclose Distance", // shown as a label in config for misclose distance.
      "miscloseDistanceHintText": "Hint: Specify misclose distance and its units.", // Shown as a hint text in config for misclose distance.
      "miscloseRatioLabel": "Misclose Ratio", // shown as a label in config for misclose ratio.
      "miscloseRatioHintText": "Hint: Specify misclose ratio.", // Shown as a hint text in config for misclose ratio.
      "snappingToleranceLabel": "Snapping Tolerance", // shown as a label in config for snapping tolerance.
      "pixelLabel": "Pixels", // shown as a label in config for pixel of tolerance.
      "snappingToleranceHintText": "Hint: Specify snapping tolerance.", // Shown as a hint text in config for snapping tolerance.
      "selectLayerLabel": "Select layer" // shown as a label in config for line layer pop up
    },

    "errorMsg": {
      "bearingFieldErrMsg": "Invalid Bearing Field", // Shown as error message when bearing field is invalid.
      "chordLengthErrMsg": "Invalid ChordLength", // Shown as error message when chord length field is invalid.
      "distanceFieldErrMsg": "Invalid Distance", // Shown as error message when distance field is invalid.
      "sequenceIdFieldErrMsg": "Invalid sequenceId", // Shown as error message when sequence id field is invalid.
      "radiusFieldErrMsg": "Invalid Radius", // Shown as error message when radius field is invalid.
      "foreignKeyFieldErrMsg": "Invalid Foreign Key", // Shown as error message when foreign field is invalid.
      "arcLengthFieldErrMsg": "Invalid Arc Length", // Shown as error message when arc length field is invalid.
      "lineTypeFieldErrMsg": "Invalid Line Type", // Shown as error message when line type field is invalid.
      "parcelNameFieldErrMsg": "Invalid Parcel Name Field", // Shown as error message when parcel name field is invalid.
      "planNameFieldErrMsg": "Invalid Plan Name Field", // Shown as error message when plan name field is invalid.
      "scaleFieldErrMsg": "Invalid Scale Field", // Shown as error message when scale field is invalid.
      "documentTypeFieldErrMsg": "Invalid Document Type Field", // Shown as error message when document type field is invalid.
      "miscloseRatioFieldErrMsg": "Invalid Misclose Ratio Field", // Shown as error message when misclose ratio field is invalid.
      "statedAreaFieldErrMsg": "Invalid Stated Area Field", // Shown as error message when misclose ratio field is invalid.
      "miscloseDistanceFieldErrMsg": "Invalid Misclose Distance Field", // Shown as error message when misclose ratio field is invalid.
      "globalIdFieldErrMsg": "Selected polygon layer doesn't have valid 'esriFieldTypeGlobalID' field.", // Shown as error message when polygon layer don't have esriFieldTypeGlobalID.
      "invalidPolylineLayer": "Please select valid parcel polyline layer", //Shown as error message when valid polyline layer is not selected
      "invalidPolygonLayer": "Please select valid parcel polygon layer", //Shown as error message when valid polygon layer is not selected
      "invalidMiscloseDistance": "Please enter valid misclose distance",
      "invalidSnappingTolerance": "Please enter valid snapping tolerance",
      "invalidMiscloseRatio": "Please enter valid misclose ratio",
      "selectDistinctLineTypes": "Please select distinct value in each line type", // Shown as error message when same values are selected in lineTypes
      "invalidConnectionLineType" : "Invalid connection line value", // Shown as error message when invalid values in lineTypes of connection line.
      "invalidBoundaryLineType" : "Invalid boundary line value", // Shown as error message when invalid values in lineTypes of boundary line.
      "selectDistinctPolylineFields": "Please select distinct field for each COGO value.", //Shown as error if same field is configured for multiple properties of polyline layer
      "selectDistinctPolygonFields": "Please select distinct field for each parcel polygon attribute." //Shown as error if same field is configured for multiple properties of polyline layer
    }

  }),
  "ar": 1,
  "bs": 1,
  "cs": 1,
  "da": 1,
  "de": 1,
  "el": 1,
  "es": 1,
  "et": 1,
  "fi": 1,
  "fr": 1,
  "he": 1,
  "hi": 1,
  "hr": 1,
  "it": 1,
  "id": 1,
  "ja": 1,
  "ko": 1,
  "lt": 1,
  "lv": 1,
  "nb": 1,
  "nl": 1,
  "pl": 1,
  "pt-br": 1,
  "pt-pt": 1,
  "ro": 1,
  "ru": 1,
  "sl": 1,
  "sr": 1,
  "sv": 1,
  "th": 1,
  "tr": 1,
  "vi": 1,
  "zh-cn": 1,
  "zh-hk": 1,
  "zh-tw": 1
});
