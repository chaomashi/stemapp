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
  "_widgetLabel": "Διαλογή",
  "geometryServicesNotFound": "Το Geometry service δεν είναι διαθέσιμο.",
  "unableToDrawBuffer": "Δεν είναι δυνατή η σχεδίαση ζώνης. Προσπαθήστε ξανά.",
  "invalidConfiguration": "Μη έγκυρη διαμόρφωση.",
  "clearAOIButtonLabel": "Επανέναρξη",
  "noGraphicsShapefile": "Το shapefile που απεστάλη δεν περιέχει γραφικά.",
  "zoomToLocationTooltipText": "Εστίαση στην τοποθεσία",
  "noGraphicsToZoomMessage": "Δεν βρέθηκαν γραφικά για μεγέθυνση.",
  "placenameWidget": {
    "placenameLabel": "Αναζήτηση για τοποθεσία"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Επιλογή λειτουργίας σχεδίασης",
    "toggleSelectability": "Κάντε κλικ για εναλλαγή της επιλογής",
    "chooseLayerTitle": "Επιλέξτε θεματικό επίπεδο με δυνατότητα επιλογή",
    "selectAllLayersText": "Επιλογή όλων",
    "layerSelectionWarningTooltip": "Θα πρέπει να επιλεγεί τουλάχιστον ένα θεματικό επίπεδο για δημιουργία AOI"
  },
  "shapefileWidget": {
    "shapefileLabel": "Αποστολή συμπιεσμένου shapefile",
    "uploadShapefileButtonText": "Μεταφόρτωση",
    "unableToUploadShapefileMessage": "Δεν είναι δυνατή η αποστολή του Shapefile."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Προσδιορισμός σημείου έναρξης",
    "addButtonTitle": "Προσθήκη",
    "deleteButtonTitle": "Κατάργηση",
    "mapTooltipForStartPoint": "Κάντε κλικ στο χάρτη για να ορίσετε σημείο έναρξης",
    "mapTooltipForUpdateStartPoint": "Κάντε κλικ στο χάρτη για να ενημερώσετε το σημείο έναρξης",
    "locateText": "Εντοπισμός",
    "locateByMapClickText": "Επιλογή αρχικών συντεταγμένων",
    "enterBearingAndDistanceLabel": "Εισαγωγή αντιστοιχίας και απόστασης από το σημείο έναρξης",
    "bearingTitle": "Αντιστοιχία",
    "distanceTitle": "Απόσταση",
    "planSettingTooltip": "Ρυθμίσεις σχεδίου",
    "invalidLatLongMessage": "Εισαγάγετε έγκυρες τιμές."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Απόσταση ζώνης (προαιρετικό)",
    "bufferInputLabel": "Εμφάνιση αποτελεσμάτων σε"
  },
  "traverseSettings": {
    "bearingLabel": "Αντιστοιχία",
    "lengthLabel": "Μήκος",
    "addButtonTitle": "Προσθήκη",
    "deleteButtonTitle": "Κατάργηση"
  },
  "planSettings": {
    "expandGridTooltipText": "Ανάπτυξη πλέγματος",
    "collapseGridTooltipText": "Σύμπτυξη πλέγματος",
    "directionUnitLabelText": "Μονάδα κατεύθυνσης",
    "distanceUnitLabelText": "Μονάδες απόστασης και μήκους",
    "planSettingsComingSoonText": "Σύντομα κοντά σας"
  },
  "newTraverse": {
    "invalidBearingMessage": "Μη έγκυρη αντιστοιχία.",
    "invalidLengthMessage": "Μη έγκυρο μήκος.",
    "negativeLengthMessage": "Αρνητικό μήκος"
  },
  "reportsTab": {
    "aoiAreaText": "Περιοχή AOI",
    "downloadButtonTooltip": "Λήψη",
    "printButtonTooltip": "Εκτύπωση",
    "uploadShapefileForAnalysisText": "Αποστολή Shapefile για συμπερίληψη στην ανάλυση",
    "uploadShapefileForButtonText": "Αναζήτηση",
    "downloadLabelText": "Επιλογή μορφής:",
    "downloadBtnText": "Λήψη",
    "noDetailsAvailableText": "Δεν βρέθηκαν αποτελέσματα",
    "featureCountText": "Πλήθος",
    "featureAreaText": "Εμβαδόν",
    "featureLengthText": "Μήκος",
    "attributeChooserTooltip": "Επιλογή γνωρισμάτων προς εμφάνιση",
    "csv": "CSV",
    "filegdb": "File Geodatabase",
    "shapefile": "Shapefile",
    "noFeaturesFound": "Δεν βρέθηκαν αποτελέσματα για την επιλεγμένη μορφή αρχείου",
    "selectReportFieldTitle": "Επιλογή πεδίων",
    "noFieldsSelected": "Δεν επιλέχθηκαν πεδία",
    "intersectingFeatureExceedsMsgOnCompletion": "Έχει συμπληρωθεί το μέγιστο πλήθος εγγραφών για ένα ή περισσότερα θεματικά επίπεδα.",
    "unableToAnalyzeText": "Δεν είναι δυνατή η ανάλυση, έχει συμπληρωθεί το μέγιστο πλήθος εγγραφών.",
    "errorInPrintingReport": "Δεν είναι δυνατή η εκτύπωση της αναφοράς. Ελέγξτε αν είναι έγκυρες οι ρυθμίσεις της αναφοράς.",
    "aoiInformationTitle": "Πληροφορίες περιοχής ενδιαφέροντος (Area of Interest - AOI)",
    "summaryReportTitle": "Σύνοψη",
    "notApplicableText": "Δ/Υ",
    "downloadReportConfirmTitle": "Επιβεβαίωση λήψης",
    "downloadReportConfirmMessage": "Είστε βέβαιοι ότι θέλετε να γίνει λήψη;",
    "noDataText": "Δεν υπάρχουν δεδομένα",
    "createReplicaFailedMessage": "Η λειτουργία λήψης απέτυχε για τα εξής θεματικά επίπεδα: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Η λειτουργία λήψης απέτυχε.",
    "printLayoutLabelText": "Διάταξη",
    "printBtnText": "Εκτύπωση",
    "printDialogHint": "Σημείωση: Μπορείτε να επεξεργαστείτε τον τίτλο και τα σχόλια της αναφοράς στην προεπισκόπηση αναφοράς.",
    "unableToDownloadFileGDBText": "Δεν είναι δυνατή η λήψη File Geodatabase για την AOI που περιέχει τοποθεσίες σημείου ή γραμμής",
    "unableToDownloadShapefileText": "Δεν είναι δυνατή η λήψη Shapefile για την AOI που περιέχει τοποθεσίες σημείου ή γραμμής",
    "analysisUnitLabelText": "Εμφάνιση αποτελεσμάτων σε:",
    "analysisUnitButtonTooltip": "Επιλέξτε μονάδες για ανάλυση",
    "analysisCloseBtnText": "Κλείσιμο",
    "feetUnit": "Πόδια / Τετραγωνικά πόδια",
    "milesUnit": "Μίλια / Έικρ",
    "metersUnit": "Μέτρα / Τετραγωνικά μέτρα",
    "kilometersUnit": "Χιλιόμετρα / Τετραγωνικά χιλιόμετρα",
    "hectaresUnit": "Χιλιόμετρα / Εκτάρια",
    "hectaresAbbr": "εκτάρια",
    "layerNotVisibleText": "Δεν είναι δυνατή ανάλυση, το θεματικό επίπεδο είναι απενεργοποιημένο ή εκτός εύρους ορατότητας κλίμακας.",
    "refreshBtnTooltip": "Ανανέωση αναφοράς",
    "featureCSVAreaText": "Τεμνόμενη περιοχή",
    "featureCSVLengthText": "Τεμνόμενο μήκος",
    "errorInFetchingPrintTask": "Σφάλμα κατά τη λήψη πληροφοριών εργασίας εκτύπωσης. Προσπαθήστε ξανά."
  }
});