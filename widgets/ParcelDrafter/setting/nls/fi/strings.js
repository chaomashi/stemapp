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
  "setBtnLabel": "Aseta",
  "selectLabel": "Valitse",
  "selectLayerLabel": "Valitse kiinteistökarttatasot",
  "selectLayerHintText": "Vihje: valitse kiinteistön alue ja siihen liittyvä viivakarttataso Määritä-painikkeen avulla",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "Valitussa aluekarttatasossa ei ole kelvollista liittyvää karttatasoa."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Valitse liittyvä viivakarttataso",
    "layerSettingTabLabel": "Kiinteistökarttatasot",
    "advancedSettingTabLabel": "Lisäasetukset",
    "selectLayerHintText": "Vihje: käytä COGO-arvojen tallentamiseen kiinteistön viivakarttatasoon",
    "selectFieldLegendLabel": "Valitse kentät, joihin COGO-arvot tallennetaan kiinteistön viivakarttatasossa",
    "bearingFieldLabel": "Suuntima",
    "chordLengthFieldLabel": "Puoliympyrän pituus",
    "distanceFieldLabel": "Etäisyys",
    "sequenceIdFieldLabel": "Järjestyksen tunnus",
    "radiusFieldLabel": "Säde",
    "foreignKeyFieldLabel": "Viiteavain",
    "arcLengthFieldLabel": "Kaaren pituus",
    "lineTypeFieldLabel": "Viivatyyppi",
    "parcelPointSymbolLabel": "Kiinteistön pistesymboli",
    "parcelPointSymbolHintText": "Vihje: käytetään viivan lähtöpisteen pistesymbolin näyttämiseen.",
    "symbolPickerPreviewText": "Esikatselu",
    "selectLineLayerLabel": "Valitse viivakarttataso"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Valitse aluekarttataso",
    "selectPolygonLayerHintText": "Vihje: käytä kiinteistön aluekarttatason valintaa",
    "selectFieldLegendLabel": "Valitse kentät, joihin kiinteistön alueen ominaisuustiedot tallennetaan",
    "parcelNameLabel": "Kiinteistön nimi",
    "rotationLabel": "Kierto",
    "planNameLabel": "Suunnitelman nimi",
    "scalingLabel": "Skaalaus",
    "documentTypeLabel": "Dokumenttityyppi",
    "miscloseRatioLabel": "Epäsulkusuhde",
    "statedAreaLabel": "Ilmoitettu alue",
    "miscloseDistanceLabel": "Epäsulkuetäisyys",
    "selectPolygonLayerLabelPopUp": "Valitse aluekarttataso"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Viivatyyppi",
    "valueLabel": "Arvo",
    "symbolLabel": "Symboli",
    "connectionLineLabel": "Yhteysviiva",
    "boundaryLineLabel": "Rajaviiva"
  },
  "closureSetting": {
    "snappingLayerLabel": "Kohdistuskarttatasot",
    "snappingBtnLabel": "Aseta",
    "snappingLayerHintText": "Vihje: valitse karttatasot, joihin kiinteistön viivat tarttuvat.",
    "miscloseDistanceLabel": "Epäsulkuetäisyys",
    "miscloseDistanceHintText": "Vihje: määritä epäsulkuetäisyys ja sen yksiköt.",
    "miscloseRatioLabel": "Epäsulkusuhde",
    "miscloseRatioHintText": "Vihje: määritä epäsulkusuhde.",
    "snappingToleranceLabel": "Tartuntatoleranssi",
    "pixelLabel": "Pikseliä",
    "snappingToleranceHintText": "Vihje: määritä tartuntatoleranssi.",
    "selectLayerLabel": "Valitse karttataso"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Virheellinen suuntimakenttä",
    "chordLengthErrMsg": "Virheellinen jänteen pituus",
    "distanceFieldErrMsg": "Virheellinen etäisyys",
    "sequenceIdFieldErrMsg": "Virheellinen järjestyksen tunnus",
    "radiusFieldErrMsg": "Virheellinen säde",
    "foreignKeyFieldErrMsg": "Virheellinen viiteavain",
    "arcLengthFieldErrMsg": "Virheellinen kaaren pituus",
    "lineTypeFieldErrMsg": "Virheellinen viivatyyppi",
    "parcelNameFieldErrMsg": "Virheellinen kiinteistön nimikenttä",
    "planNameFieldErrMsg": "Virheellinen suunnitelman nimikenttä",
    "scaleFieldErrMsg": "Virheellinen mittakaavakenttä",
    "documentTypeFieldErrMsg": "Virheellinen dokumenttityypin kenttä",
    "miscloseRatioFieldErrMsg": "Virheellinen epäsulkusuhteen kenttä",
    "statedAreaFieldErrMsg": "Virheellinen sovitun alueen kenttä",
    "miscloseDistanceFieldErrMsg": "Virheellinen epäsulkuetäisyyden kenttä",
    "globalIdFieldErrMsg": "Valitussa aluekarttatasossa ei ole kelvollista esriFieldTypeGlobalID-kenttää.",
    "invalidPolylineLayer": "Valitse kelvollinen kiinteistön taiteviivakarttataso",
    "invalidPolygonLayer": "Valitse kelvollinen kiinteistön aluekarttataso",
    "invalidMiscloseDistance": "Anna kelvollinen epäsulkuetäisyys",
    "invalidSnappingTolerance": "Anna kelvollinen tartuntatoleranssi",
    "invalidMiscloseRatio": "Anna kelvollinen epäsulkusuhde",
    "selectDistinctLineTypes": "Valitse erillinen arvo kussakin viivatyypissä",
    "invalidConnectionLineType": "Virheellinen yhdysviivan arvo",
    "invalidBoundaryLineType": "Virheellinen rajaviivan arvo",
    "selectDistinctPolylineFields": "Valitse erillinen kenttä kullekin COGO-arvolle.",
    "selectDistinctPolygonFields": "Valitse erillinen kenttä kullekin kiinteistön alueen ominaisuustiedolle."
  }
});