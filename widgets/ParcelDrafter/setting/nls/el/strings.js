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
  "setBtnLabel": "Ορισμός",
  "selectLabel": "Επιλογή",
  "selectLayerLabel": "Επιλογή θεματικών επιπέδων αγροτεμαχίου",
  "selectLayerHintText": "Υπόδειξη: Χρησιμοποιήστε το κουμπί για να επιλέξετε το πολύγωνο αγροτεμαχίου και το συναφές θεματικό επίπεδο γραμμής",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "Το επιλεγμένο θεματικό επίπεδο πολυγώνου δεν έχει έγκυρο συναφές θεματικό επίπεδο."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Επιλογή συναφούς θεματικού επιπέδου γραμμής",
    "layerSettingTabLabel": "Θεματικά επίπεδα αγροτεμαχίου",
    "advancedSettingTabLabel": "Ρυθμίσεις για προχωρημένους",
    "selectLayerHintText": "Υπόδειξη: Χρησιμοποιείται για την αποθήκευση τιμών COGO στο θεματικό επίπεδο γραμμής αγροτεμαχίου",
    "selectFieldLegendLabel": "Επιλογή πεδίων για αποθήκευση τιμών COGO στο θεματικό επίπεδο γραμμής αγροτεμαχίου",
    "bearingFieldLabel": "Αντιστοιχία",
    "chordLengthFieldLabel": "Μήκος χορδής",
    "distanceFieldLabel": "Απόσταση",
    "sequenceIdFieldLabel": "Αναγνωριστικό ακολουθίας",
    "radiusFieldLabel": "Ακτίνα",
    "foreignKeyFieldLabel": "Εξωτερικό κλειδί",
    "arcLengthFieldLabel": "Μήκος τόξου",
    "lineTypeFieldLabel": "Τύπος γραμμής",
    "parcelPointSymbolLabel": "Σύμβολο σημείου αγροτεμαχίου",
    "parcelPointSymbolHintText": "Υπόδειξη: Χρησιμοποιείται για την εμφάνιση του συμβόλου σημείου για την προέλευση της γραμμής.",
    "symbolPickerPreviewText": "Προεπισκόπηση",
    "selectLineLayerLabel": "Επιλογή θεματικού επιπέδου γραμμής"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Επιλογή πολυγωνικού θεματικού επιπέδου",
    "selectPolygonLayerHintText": "Υπόδειξη: Χρησιμοποιήστε το επιλεγμένο θεματικό επίπεδο πολυγώνου αγροτεμαχίου",
    "selectFieldLegendLabel": "Επιλογή πεδίων για την αποθήκευση γνωρισμάτων πολυγώνου αγροτεμαχίου",
    "parcelNameLabel": "Όνομα αγροτεμαχίου",
    "rotationLabel": "Περιστροφή",
    "planNameLabel": "Όνομα σχεδίου",
    "scalingLabel": "Κλιμάκωση",
    "documentTypeLabel": "Τύπος εγγράφου",
    "miscloseRatioLabel": "Αναλογία σφάλματος κλεισίματος",
    "statedAreaLabel": "Περιοχή δήλωσης",
    "miscloseDistanceLabel": "Απόσταση σφάλματος κλεισίματος",
    "selectPolygonLayerLabelPopUp": "Επιλογή θεματικού επιπέδου πολυγώνου"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Τύπος γραμμής",
    "valueLabel": "Τιμή",
    "symbolLabel": "Σύμβολο",
    "connectionLineLabel": "Γραμμή σύνδεσης",
    "boundaryLineLabel": "Γραμμή ορίου"
  },
  "closureSetting": {
    "snappingLayerLabel": "Θεματικά επίπεδα συγκράτησης",
    "snappingBtnLabel": "Ορισμός",
    "snappingLayerHintText": "Υπόδειξη: Επιλέξτε θεματικά επίπεδα στα οποία θα συγκρατηθούν οι γραμμές του αγροτεμαχίου.",
    "miscloseDistanceLabel": "Απόσταση σφάλματος κλεισίματος",
    "miscloseDistanceHintText": "Υπόδειξη: Καθορίστε την απόσταση σφάλματος κλεισίματος και τις μονάδες της.",
    "miscloseRatioLabel": "Αναλογία σφάλματος κλεισίματος",
    "miscloseRatioHintText": "Υπόδειξη: Καθορίστε την αναλογία σφάλματος κλεισίματος.",
    "snappingToleranceLabel": "Ανοχή συγκράτησης",
    "pixelLabel": "Pixel",
    "snappingToleranceHintText": "Υπόδειξη: Καθορίστε την ανοχή συγκράτησης.",
    "selectLayerLabel": "Επιλογή θεματικού επιπέδου"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Μη έγκυρο πεδίο αντιστοιχίας",
    "chordLengthErrMsg": "Μη έγκυρο ChordLength",
    "distanceFieldErrMsg": "Μη έγκυρη απόσταση",
    "sequenceIdFieldErrMsg": "Μη έγκυρο sequenceId",
    "radiusFieldErrMsg": "Μη έγκυρη ακτίνα",
    "foreignKeyFieldErrMsg": "Μη έγκυρο εξωτερικό κλειδί",
    "arcLengthFieldErrMsg": "Μη έγκυρο μήκος τόξου",
    "lineTypeFieldErrMsg": "Μη έγκυρος τύπος γραμμής",
    "parcelNameFieldErrMsg": "Μη έγκυρο πεδίο ονόματος αγροτεμαχίου",
    "planNameFieldErrMsg": "Μη έγκυρο πεδίο ονόματος σχεδίου",
    "scaleFieldErrMsg": "Μη έγκυρο πεδίο κλίμακας",
    "documentTypeFieldErrMsg": "Μη έγκυρο πεδίο τύπου εγγράφου",
    "miscloseRatioFieldErrMsg": "Μη έγκυρο πεδίο αναλογίας σφάλματος κλεισίματος",
    "statedAreaFieldErrMsg": "Μη έγκυρο πεδίο περιοχής δήλωσης",
    "miscloseDistanceFieldErrMsg": "Μη έγκυρο πεδίο απόστασης σφάλματος κλεισίματος",
    "globalIdFieldErrMsg": "Το επιλεγμένο θεματικό επίπεδο πολυγώνου δεν έχει έγκυρο πεδίο 'esriFieldTypeGlobalID'.",
    "invalidPolylineLayer": "Επιλέξτε έγκυρο θεματικό επίπεδο γραμμής πολλαπλών τμημάτων αγροτεμαχίου",
    "invalidPolygonLayer": "Επιλέξτε έγκυρο θεματικό επίπεδο πολυγώνου αγροτεμαχίου",
    "invalidMiscloseDistance": "Εισαγάγετε έγκυρη απόσταση σφάλματος κλεισίματος",
    "invalidSnappingTolerance": "Εισαγάγετε έγκυρη ανοχή συγκράτησης",
    "invalidMiscloseRatio": "Εισαγάγετε έγκυρη αναλογία σφάλματος κλεισίματος",
    "selectDistinctLineTypes": "Επιλέξτε διακριτή τιμή σε κάθε τύπο γραμμής",
    "invalidConnectionLineType": "Μη έγκυρη τιμή γραμμής σύνδεσης",
    "invalidBoundaryLineType": "Μη έγκυρη τιμή γραμμής ορίου",
    "selectDistinctPolylineFields": "Επιλέξτε διακριτό πεδίο για κάθε τιμή COGO.",
    "selectDistinctPolygonFields": "Επιλέξτε διακριτό πεδίο για κάθε γνώρισμα πολυγώνου αγροτεμαχίου."
  }
});