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
  "_widgetLabel": "Πρόγραμμα σχεδίασης αγροτεμαχίων",
  "newTraverseButtonLabel": "Έναρξη νέας διατομής",
  "invalidConfigMsg": "Μη έγκυρη διαμόρφωση",
  "geometryServiceURLNotFoundMSG": "Αδύνατη η λήψη Geometry Service URL",
  "editTraverseButtonLabel": "Επεξεργασία διατομής",
  "mapTooltipForStartNewTraverse": "Επιλέξτε σημείο στο χάρτη ή τύπο παρακάτω για να ξεκινήσετε",
  "mapTooltipForEditNewTraverse": "Επιλέξτε αγροτεμάχιο για επεξεργασία",
  "mapTooltipForUpdateStartPoint": "Κάντε κλικ για ενημέρωση του σημείου έναρξης",
  "mapTooltipForScreenDigitization": "Κάντε κλικ για προσθήκη σημείου αγροτεμαχίου",
  "mapTooltipForRotate": "Σύρετε για περιστροφή",
  "mapTooltipForScale": "Σύρετε για κλιμάκωση",
  "backButtonTooltip": "Πίσω",
  "newTraverseTitle": "Νέα διατομή",
  "editTraverseTitle": "Επεξεργασία διατομής",
  "clearingDataConfirmationMessage": "Οι αλλαγές θα απορριφθούν, θέλετε να συνεχίσετε;",
  "unableToFetchParcelMessage": "Δεν είναι δυνατή η λήψη του αγροτεμαχίου.",
  "unableToFetchParcelLinesMessage": "Δεν είναι δυνατή η λήψη γραμμών αγροτεμαχίου.",
  "planSettings": {
    "planSettingsTitle": "Ρυθμίσεις",
    "directionOrAngleTypeLabel": "Τύπος κατεύθυνσης ή γωνίας",
    "directionOrAngleUnitsLabel": "Μονάδες κατεύθυνσης ή γωνίας",
    "distanceAndLengthUnitsLabel": "Μονάδες απόστασης και μήκους",
    "areaUnitsLabel": "Μονάδες εμβαδού",
    "circularCurveParameters": "Παράμετροι κυκλικής καμπύλης",
    "northAzimuth": "Βόρειο αζιμούθιο",
    "southAzimuth": "Νότιο αζιμούθιο",
    "quadrantBearing": "Αντιστοιχία τεταρτημόριου",
    "radiusAndChordLength": "Μήκος ακτίνας και χορδής",
    "radiusAndArcLength": "Μήκος ακτίνας και τόξου",
    "expandGridTooltipText": "Ανάπτυξη πλέγματος",
    "collapseGridTooltipText": "Σύμπτυξη πλέγματος",
    "zoomToLocationTooltipText": "Εστίαση στην τοποθεσία",
    "onScreenDigitizationTooltipText": "Ψηφιοποίηση"
  },
  "traverseSettings": {
    "bearingLabel": "Αντιστοιχία",
    "lengthLabel": "Μήκος",
    "radiusLabel": "Ακτίνα",
    "noMiscloseCalculated": "Δεν έχει υπολογιστεί σφάλμα κλεισίματος",
    "traverseMiscloseBearing": "Αντιστοιχία σφάλματος κλεισίματος",
    "traverseAccuracy": "Ακρίβεια",
    "accuracyHigh": "Υψηλή",
    "traverseDistance": "Απόσταση σφάλματος κλεισίματος",
    "traverseMiscloseRatio": "Αναλογία σφάλματος κλεισίματος",
    "traverseStatedArea": "Περιοχή δήλωσης",
    "traverseCalculatedArea": "Περιοχή υπολογισμού",
    "addButtonTitle": "Προσθήκη",
    "deleteButtonTitle": "Κατάργηση"
  },
  "parcelTools": {
    "rotationToolLabel": "Γωνία",
    "scaleToolLabel": "Κλίμακα"
  },
  "newTraverse": {
    "invalidBearingMessage": "Μη έγκυρη αντιστοιχία.",
    "invalidLengthMessage": "Μη έγκυρο μήκος.",
    "invalidRadiusMessage": "Μη έγκυρη ακτίνα.",
    "negativeLengthMessage": "Έγκυρο μόνο για καμπύλες",
    "enterValidValuesMessage": "Εισαγάγετε έγκυρες τιμές.",
    "enterValidParcelInfoMessage": "Εισαγάγετε κάποιες έγκυρες πληροφορίες αγροτεμαχίου για να γίνει αποθήκευση.",
    "unableToDrawLineMessage": "Δεν είναι δυνατή η σχεδίαση γραμμής.",
    "invalidEndPointMessage": "Μη έγκυρο τελικό σημείο, δεν είναι δυνατή η σχεδίαση γραμμής."
  },
  "planInfo": {
    "requiredText": "(απαιτούμενο)",
    "optionalText": "(προαιρετικό)",
    "parcelNamePlaceholderText": "Όνομα αγροτεμαχίου",
    "parcelDocumentTypeText": "Τύπος εγγράφου",
    "planNamePlaceholderText": "Όνομα σχεδίου",
    "cancelButtonLabel": "Ακύρωση",
    "saveButtonLabel": "Αποθήκευση",
    "saveNonClosedParcelConfirmationMessage": "Το αγροτεμάχιο που έχει εισαχθεί δεν έχει κλείσει, θέλετε να συνεχίσετε και να αποθηκευτούν μόνο οι γραμμές του αγροτεμαχίου;",
    "unableToCreatePolygonParcel": "Δεν είναι δυνατή η δημιουργία πολυγώνου αγροτεμαχίου.",
    "unableToSavePolygonParcel": "Δεν είναι δυνατή η αποθήκευση πολυγώνου αγροτεμαχίου.",
    "unableToSaveParcelLines": "Δεν είναι δυνατή η αποθήκευση γραμμών αγροτεμαχίου.",
    "unableToUpdateParcelLines": "Δεν είναι δυνατή η ενημέρωση γραμμών αγροτεμαχίου.",
    "parcelSavedSuccessMessage": "Το αγροτεμάχιο αποθηκεύτηκε με επιτυχία.",
    "enterValidParcelNameMessage": "Εισαγάγετε έγκυρο όνομα αγροτεμαχίου.",
    "enterValidPlanNameMessage": "Εισαγάγετε έγκυρο όνομα σχεδίου.",
    "enterValidDocumentTypeMessage": "Μη έγκυρος τύπος εγγράφου.",
    "enterValidStatedAreaNameMessage": "Εισαγάγετε έγκυρη περιοχή δήλωσης."
  },
  "xyInput": {
    "explanation": "Στη χωρική αναφορά του θεματικού επιπέδου των γεωτεμαχίων σας"
  }
});