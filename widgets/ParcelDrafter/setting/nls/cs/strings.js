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
  "setBtnLabel": "Nastavit",
  "selectLabel": "Vybrat",
  "selectLayerLabel": "Vybrat vrstvy parcel",
  "selectLayerHintText": "Nápověda: Pomocí tlačítka nastavení vyberte polygon parcel a jeho související liniovou vrstvu",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "Vybraná vrstva polygonu nemá platnou související vrstvu."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Vyberte související vrstvu linie",
    "layerSettingTabLabel": "Vrstvy parcely",
    "advancedSettingTabLabel": "Pokročilá nastavení",
    "selectLayerHintText": "Nápověda: Použijte k uložení hodnot COGO ve vrstvě parcelních linií",
    "selectFieldLegendLabel": "Vyberte pole k uložení hodnot COGO ve vrstvě parcelních linií",
    "bearingFieldLabel": "Azimut",
    "chordLengthFieldLabel": "Délky tětivy",
    "distanceFieldLabel": "Velikost",
    "sequenceIdFieldLabel": "ID sekvence",
    "radiusFieldLabel": "Poloměr",
    "foreignKeyFieldLabel": "Cizí klíč",
    "arcLengthFieldLabel": "Délka kruhu",
    "lineTypeFieldLabel": "Typ linie",
    "parcelPointSymbolLabel": "Symbol bodu parcely",
    "parcelPointSymbolHintText": "Nápověda: Používá se k zobrazení symbolu bodu pro počátek linie.",
    "symbolPickerPreviewText": "Náhled",
    "selectLineLayerLabel": "Vyberte liniovou vrstvu"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Vyberte polygonovou vrstvu",
    "selectPolygonLayerHintText": "Nápověda: Použijte vybranou polygonovou parcelní linii",
    "selectFieldLegendLabel": "Vyberte pole k uložení atributů polygonu parcely",
    "parcelNameLabel": "Název parcely",
    "rotationLabel": "Otočení",
    "planNameLabel": "Název plánu",
    "scalingLabel": "Změna velikosti",
    "documentTypeLabel": "Typ dokumentu",
    "miscloseRatioLabel": "Poměr závěrové chyby",
    "statedAreaLabel": "Uvedená oblast",
    "miscloseDistanceLabel": "Vzdálenost závěrové chyby",
    "selectPolygonLayerLabelPopUp": "Vyberte polygonovou vrstvu"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Typ linie",
    "valueLabel": "Hodnota",
    "symbolLabel": "Symbol",
    "connectionLineLabel": "Propojovací čára",
    "boundaryLineLabel": "Hranice parcely"
  },
  "closureSetting": {
    "snappingLayerLabel": "Vrstvy přichytávání",
    "snappingBtnLabel": "Nastavit",
    "snappingLayerHintText": "Nápověda: Vyberte vrstvy, ke kterým se přichytí parcelní linie.",
    "miscloseDistanceLabel": "Vzdálenost závěrové chyby",
    "miscloseDistanceHintText": "Nápověda: Určete vzdálenost závěrové chyby a její jednotky.",
    "miscloseRatioLabel": "Poměr závěrové chyby",
    "miscloseRatioHintText": "Nápověda: Určete poměr závěrové chyby.",
    "snappingToleranceLabel": "Tolerance přichytávání",
    "pixelLabel": "pixely",
    "snappingToleranceHintText": "Nápověda: Určete toleranci přichytávání.",
    "selectLayerLabel": "Vybrat vrstvu"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Neplatné pole směru",
    "chordLengthErrMsg": "Neplatná délka tětivy",
    "distanceFieldErrMsg": "Neplatná vzdálenost",
    "sequenceIdFieldErrMsg": "Neplatné ID sekvence",
    "radiusFieldErrMsg": "Neplatný poloměr",
    "foreignKeyFieldErrMsg": "Neplatný cizí klíč",
    "arcLengthFieldErrMsg": "Neplatná délka kruhu",
    "lineTypeFieldErrMsg": "Neplatný typ linie",
    "parcelNameFieldErrMsg": "Neplatné pole názvu parcely",
    "planNameFieldErrMsg": "Neplatné pole názvu plánu",
    "scaleFieldErrMsg": "Neplatné pole měřítka",
    "documentTypeFieldErrMsg": "Neplatné pole typu dokumentu",
    "miscloseRatioFieldErrMsg": "Neplatné pole poměru závěrové chyby",
    "statedAreaFieldErrMsg": "Neplatné pole uvedené oblasti",
    "miscloseDistanceFieldErrMsg": "Neplatné pole vzdálenosti závěrové chyby",
    "globalIdFieldErrMsg": "Vybraná vrstva polygonu nemá platné pole esriFieldTypeGlobalID",
    "invalidPolylineLayer": "Vyberte platnou vrstvu linií parcel",
    "invalidPolygonLayer": "Vyberte platnou vrstvu polygonů parcel",
    "invalidMiscloseDistance": "Zadejte platnou vzdálenost závěrové chyby",
    "invalidSnappingTolerance": "Zadejte platnou toleranci přichytávání",
    "invalidMiscloseRatio": "Zadejte platný poměr závěrové chyby",
    "selectDistinctLineTypes": "Pro každý typ linie vyberte odlišnou hodnotu",
    "invalidConnectionLineType": "Neplatná hodnota propojovací čáry",
    "invalidBoundaryLineType": "Neplatná hodnota hraniční čáry",
    "selectDistinctPolylineFields": "Pro každou hodnotu COGO vyberte jedinečné pole.",
    "selectDistinctPolygonFields": "Pro každý atribut polygonu parcely vyberte jedinečné pole."
  }
});