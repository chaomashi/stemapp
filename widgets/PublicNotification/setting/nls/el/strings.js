/*
 | Copyright 2017 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define({
  "searchSourceSetting": {
    "title": "Ρυθμίσεις αναζήτησης και ζώνης",
    "mainHint": "Μπορείτε να ενεργοποιήσετε αναζητήσεις κειμένου διευθύνσεων και στοιχείων, ψηφιοποίησης γεωμετρίας και αποθήκευσης σε buffer."
  },
  "addressSourceSetting": {
    "title": "Θεματικά επίπεδα διεύθυνσης",
    "mainHint": "Μπορείτε να καθορίσετε ποιο(α) θεματικό(ά) επίπεδο(α) ετικέτας αποδέκτη είναι διαθέσιμο(α)."
  },
  "notificationSetting": {
    "title": "Επιλογές ειδοποίησης",
    "mainHint": "Μπορείτε να καθορίσετε ποιοι τύποι ειδοποίησης είναι διαθέσιμοι."
  },
  "groupingLabels": {
    "addressSources": "Θεματικό επίπεδο που θα χρησιμοποιείται για την επιλογή θεματικών επιπέδων αποδέκτη",
    "averyStickersDetails": "Αυτοκόλλητα Avery(r)",
    "csvDetails": "Αρχείο τιμών διαχωρισμένων με κόμματα (CSV)",
    "drawingTools": "Εργαλεία σχεδίου για προσδιορισμό περιοχής",
    "featureLayerDetails": "Feature layer",
    "geocoderDetails": "Εργαλείο γεωκωδικοποίησης",
    "labelFormats": "Διαθέσιμες μορφές ετικετών",
    "printingOptions": "Επιλογές για σελίδες εκτυπωμένης ετικέτας",
    "searchSources": "Πηγές αναζήτησης",
    "stickerFormatDetails": "Παράμετροι σελίδας ετικέτας"
  },
  "hints": {
    "alignmentAids": "Σημάνσεις που προστίθενται σε σελίδα ετικετών και σας βοηθάνε να ευθυγραμμίσετε τη σελίδα στον εκτυπωτή σας",
    "csvNameList": "Μια λίστα με διαχωρισμό με κόμματα ονομάτων πεδίων με διάκριση πεζών-κεφαλαίων",
    "horizontalGap": "Κενό μεταξύ δύο ετικετών σε μια σειρά",
    "insetToLabel": "Κενό μεταξύ πλαϊνού τμήματος ετικέτας και έναρξης κειμένου",
    "labelFormatDescription": "Τρόπος παρουσίασης στυλ ετικέτας σε λίστα επιλογών μορφής widget",
    "labelFormatDescriptionHint": "Συμβουλή εργαλείου για τη συμπλήρωση περιγραφής στη λίστα επιλογών μορφής",
    "labelHeight": "Ύψος κάθε ετικέτας στη σελίδα",
    "labelWidth": "Πλάτος κάθε ετικέτας στη σελίδα",
    "localSearchRadius": "Προσδιορίζει την ακτίνα μιας περιοχής γύρω από το κέντρο του τρέχοντα χάρτη που χρησιμοποιείται για να ενισχύσει την κατάταξη των υποψηφίων γεωκωδικοποίησης, ώστε να εμφανίζονται πρώτα οι υποψήφιοι που βρίσκονται πιο κοντά στην τοποθεσία",
    "rasterResolution": "100 pixel ανά ίντσα αντιστοιχούν κατά προσέγγιση στην ανάλυση οθόνης. Όσο υψηλότερη είναι η ανάλυση, τόσο μεγαλύτερη μνήμη προγράμματος περιήγησης απαιτείται. Τα προγράμματα περιήγησης διαφέρουν αναλόγως της ικανότητας τους να χειρίζονται με άνεση μεγάλες απαιτήσεις μνήμης.",
    "selectionListOfOptionsToDisplay": "Τα σημειωμένα στοιχεία εμφανίζονται ως επιλογές στο widget. Αλλάξτε τη σειρά κατόπιν επιθυμίας",
    "verticalGap": "Κενό μεταξύ δύο ετικετών σε μια στήλη"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Προεπιλεγμένη απόσταση ζώνης",
    "bufferUnits": "Μονάδες ζώνης που παρέχονται σε widget",
    "countryRegionCodes": "Κωδικοί χώρας ή περιοχής",
    "description": "Περιγραφή",
    "descriptionHint": "Υπόδειξη περιγραφής",
    "displayField": "Πεδίο εμφάνισης",
    "drawingToolsFreehandPolygon": "Πολύγωνο ελεύθερης σχεδίασης",
    "drawingToolsLine": "γραμμή",
    "drawingToolsPoint": "point",
    "drawingToolsPolygon": "polygon",
    "drawingToolsPolyline": "polyline",
    "enableLocalSearch": "Ενεργοποίηση τοπικής αναζήτησης",
    "exactMatch": "Ακριβής αντιστοιχία",
    "fontSizeAlignmentNote": "Μέγεθος γραμματοσειράς για σημείωση σχετικά με περιθώρια εκτύπωσης",
    "gridDarkness": "Σκουρότητα πλέγματος",
    "gridlineLeftInset": "Αριστερό ένθετο γραμμής πλέγματος",
    "gridlineMajorTickMarksGap": "Υποδιαίρεση σε πρωτεύοντα άξονα κάθε",
    "gridlineMinorTickMarksGap": "Υποδιαίρεση σε δευτερεύοντα άξονα κάθε",
    "gridlineRightInset": "Δεξιό ένθετο γραμμής πλέγματος",
    "labelBorderDarkness": "Σκουρότητα περιγράμματος ετικέτας",
    "labelBottomEdge": "Κάτω άκρο ετικετών στη σελίδα",
    "labelFontSize": "Μέγεθος γραμματοσειράς",
    "labelHeight": "Ύψος ετικέτας",
    "labelHorizontalGap": "Οριζόντιο κενό",
    "labelInitialInset": "Ένθετο στο κείμενο ετικέτας",
    "labelLeftEdge": "Αριστερό άκρο ετικετών στη σελίδα",
    "labelMaxLineCount": "Μέγιστος αριθμός γραμμών στην ετικέτα",
    "labelPageHeight": "Ύψος σελίδας",
    "labelPageWidth": "Πλάτος σελίδας",
    "labelRightEdge": "Δεξιό άκρο ετικετών στη σελίδα",
    "labelsInAColumn": "Αριθμός ετικετών σε μια στήλη",
    "labelsInARow": "Αριθμός ετικετών σε μια σειρά",
    "labelTopEdge": "Άνω άκρο ετικετών στη σελίδα",
    "labelVerticalGap": "Κάθετο κενό",
    "labelWidth": "Πλάτος ετικέτας",
    "limitSearchToMapExtent": "Αναζήτηση μόνο στην τρέχουσα έκταση χάρτη",
    "maximumResults": "Μέγιστος αριθμός αποτελεσμάτων",
    "maximumSuggestions": "Μέγιστος αριθμός προτάσεων",
    "minimumScale": "Ελάχιστη κλίμακα",
    "name": "Όνομα",
    "percentBlack": "% μαύρο",
    "pixels": "pixel",
    "pixelsPerInch": "pixel ανά ίντσα",
    "placeholderText": "Κείμενο υπόδειξης",
    "placeholderTextForAllSources": "Κείμενο υπόδειξης για αναζήτηση όλων των πηγών",
    "radius": "Ακτίνα",
    "rasterResolution": "Ανάλυση Raster",
    "searchFields": "Πεδία αναζήτησης",
    "showAlignmentAids": "Προβολή βοήθειας ευθυγράμμισης στη σελίδα",
    "showGridTickMarks": "Προβολή σημαδιών υποδιαίρεσης πλέγματος",
    "showLabelOutlines": "Προβολή περιγραμμάτων ετικέτας",
    "showPopupForFoundItem": "Εμφάνιση αναδυόμενου παράθυρου για το στοιχείο ή την τοποθεσία που βρέθηκε",
    "tool": "Εργαλεία",
    "units": "Μονάδες",
    "url": "URL",
    "urlToGeometryService": "URL για geometry service",
    "useRelatedRecords": "Χρήση των σχετικών του εγγραφών",
    "useSecondarySearchLayer": "Χρήση δευτερεύοντος θεματικού επιπέδου επιλογής",
    "useSelectionDrawTools": "Χρήση επιλογής εργαλείων σχεδίασης",
    "useVectorFonts": "Χρήση ανυσματικής γραμματοσειράς (μόνο για λατινική γραμματοσειρά)",
    "zoomScale": "Εστίαση κλίμακας"
  },
  "buttons": {
    "addAddressSource": "Προσθήκη θεματικού επιπέδου που περιέχει ετικέτες διεύθυνσης στο αναδυόμενο παράθυρο",
    "addLabelFormat": "Προσθήκη μιας μορφής ετικέτας",
    "addSearchSource": "Προσθήκη μιας πηγής αναζήτησης",
    "set": "Ορισμός"
  },
  "placeholders": {
    "averyExample": "π.χ., ετικέτα Avery(r) ${averyPartNumber}",
    "countryRegionCodes": "π.χ., USA,CHN",
    "descriptionCSV": "Τιμές διαχωρισμένες με κόμματα",
    "descriptionPDF": "Ετικέτα PDF ${heightLabelIn} x ${widthLabelIn} ίντσες, ${labelsPerPage} ανά σελίδα"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Λήψη του θεματικού επιπέδου στοιχείου από το webmap",
    "openCountryCodes": "Κλικ για περισσότερες πληροφορίες σχετικά με κωδικούς",
    "openFieldSelector": "Κλικ για άνοιγμα ενός επιλογέα πεδίου",
    "setAndValidateURL": "Ορισμός και επικύρωση του URL"
  },
  "problems": {
    "noAddresseeLayers": "Καθορίστε τουλάχιστον ένα θεματικό επίπεδο αποδέκτη.",
    "noBufferUnitsForDrawingTools": "Παραμετροποιήστε τουλάχιστον μία μονάδα ζώνης για τα εργαλεία σχεδίασης.",
    "noBufferUnitsForSearchSource": "Παραμετροποιήστε τουλάχιστον μία μονάδα ζώνης για την πηγή αναζήτησης \"${sourceName}\".",
    "noGeometryServiceURL": "Παραμετροποιήστε τη διεύθυνση URL για το geometry service.",
    "noNotificationLabelFormats": "Καθορίστε τουλάχιστον μία μορφή ετικέτας ειδοποιήσεων.",
    "noSearchSourceFields": "Παραμετροποιήστε ένα ή περισσότερα πεδία αναζήτησης για την πηγή αναζήτησης \"${sourceName}\".",
    "noSearchSourceURL": "Παραμετροποιήστε τη διεύθυνση URL για την πηγή αναζήτησης \"${sourceName}\"."
  }
});