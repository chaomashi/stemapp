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
  "setBtnLabel": "Ange",
  "selectLabel": "Välj",
  "selectLayerLabel": "Välj byggnadslager",
  "selectLayerHintText": "Tips: Använd knappen Ange för att välja byggnadspolygon och dess relaterade linjelager",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "Det valda polygonlagret har inget giltigt relaterat lager."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Välj relaterat linjelager",
    "layerSettingTabLabel": "Byggnadslager",
    "advancedSettingTabLabel": "Avancerade inställningar",
    "selectLayerHintText": "Tips: Används för att lagra COGO värden i byggnadslinjelagret",
    "selectFieldLegendLabel": "Välj fält för att lagra COGO värden i byggnadslinjelagret",
    "bearingFieldLabel": "Bäring",
    "chordLengthFieldLabel": "Kordans längd",
    "distanceFieldLabel": "Avstånd",
    "sequenceIdFieldLabel": "Sekvens-ID",
    "radiusFieldLabel": "Radie",
    "foreignKeyFieldLabel": "Sekundärnyckel",
    "arcLengthFieldLabel": "Båglängd",
    "lineTypeFieldLabel": "Linjetyp",
    "parcelPointSymbolLabel": "Byggnadspunktsymbol",
    "parcelPointSymbolHintText": "Tips: Används för att visa punktsymbolen för linjens startpunkt.",
    "symbolPickerPreviewText": "Förhandsgranska",
    "selectLineLayerLabel": "Välj linjelager"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Välj polygonlager",
    "selectPolygonLayerHintText": "Tips: Använd Välj byggnadspolygonlager",
    "selectFieldLegendLabel": "Välj fält att lagra byggnadspolygonattribut",
    "parcelNameLabel": "Byggnadsnamn",
    "rotationLabel": "Rotation",
    "planNameLabel": "Plannamn",
    "scalingLabel": "Skalning",
    "documentTypeLabel": "Dokumenttyp",
    "miscloseRatioLabel": "Misclose-förhållande",
    "statedAreaLabel": "Angivet område",
    "miscloseDistanceLabel": "Misclose-avstånd",
    "selectPolygonLayerLabelPopUp": "Välj ett polygonlager"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Linjetyp",
    "valueLabel": "Värde",
    "symbolLabel": "Symbol",
    "connectionLineLabel": "Anslutningslinje",
    "boundaryLineLabel": "Gränslinje"
  },
  "closureSetting": {
    "snappingLayerLabel": "Snappningslager",
    "snappingBtnLabel": "Ange",
    "snappingLayerHintText": "Tips: Välj lager som byggnadslinjerna ska snappa till.",
    "miscloseDistanceLabel": "Misclose-avstånd",
    "miscloseDistanceHintText": "Tips: Ange misclose-avståndet och dess enheter.",
    "miscloseRatioLabel": "Misclose-förhållande",
    "miscloseRatioHintText": "Tips: Ange misclose-förhållande.",
    "snappingToleranceLabel": "Snappningstolerans",
    "pixelLabel": "Pixlar",
    "snappingToleranceHintText": "Tips: Ange snappningstolerans.",
    "selectLayerLabel": "Välj lager"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Ogiltigt bäringsfält",
    "chordLengthErrMsg": "Ogiltig ChordLength",
    "distanceFieldErrMsg": "Ogiltigt avstånd",
    "sequenceIdFieldErrMsg": "Ogiltig sequenceId",
    "radiusFieldErrMsg": "Ogiltig radie",
    "foreignKeyFieldErrMsg": "Ogiltig sekundärnyckel",
    "arcLengthFieldErrMsg": "Ogiltig båglängd",
    "lineTypeFieldErrMsg": "Ogiltig linjetyp",
    "parcelNameFieldErrMsg": "Ogiltigt byggnadsnamnsfält",
    "planNameFieldErrMsg": "Ogiltigt plannamnsfält",
    "scaleFieldErrMsg": "Ogiltigt skalfält",
    "documentTypeFieldErrMsg": "Ogiltigt dokumenttypsfält",
    "miscloseRatioFieldErrMsg": "Ogiltigt fält för misclose-förhållande",
    "statedAreaFieldErrMsg": "Ogiltigt angivet områdesfält",
    "miscloseDistanceFieldErrMsg": "Ogiltigt fält för misclose-avstånd",
    "globalIdFieldErrMsg": "Det valda polygonlagret har inget giltigt fält för esriFieldTypeGlobalID.",
    "invalidPolylineLayer": "Välj ett giltigt byggnadspolylinjelager",
    "invalidPolygonLayer": "Välj ett giltigt byggnadspolygonlager",
    "invalidMiscloseDistance": "Ange ett giltigt misclose-avstånd",
    "invalidSnappingTolerance": "Ange en giltig snappningstolerans",
    "invalidMiscloseRatio": "Ange ett giltigt misclose-förhållande",
    "selectDistinctLineTypes": "Välj ett distinkt värde i varje linjetyp",
    "invalidConnectionLineType": "Ogiltig värde för anslutningslinje",
    "invalidBoundaryLineType": "Ogiltig värde för gränslinje",
    "selectDistinctPolylineFields": "Välj ett distinkt fält för varje COGO-värde.",
    "selectDistinctPolygonFields": "Välj ett distinkt fält för varje byggnadspolygonattribut."
  }
});