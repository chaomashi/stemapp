/*global define*/
///////////////////////////////////////////////////////////////////////////
// Copyright © 2015 Esri. All Rights Reserved.
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
  "units": {
    "miles": {
      "displayText": "Μίλια",
      "acronym": "μίλ."
    },
    "kilometers": {
      "displayText": "Χιλιόμετρα",
      "acronym": "χλμ."
    },
    "feet": {
      "displayText": "Πόδια",
      "acronym": "πόδ."
    },
    "meters": {
      "displayText": "Μέτρα",
      "acronym": "μ."
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Ρυθμίσεις αναζήτησης πηγής",
    "searchSourceSettingTitle": "Ρυθμίσεις αναζήτησης πηγής",
    "searchSourceSettingTitleHintText": "Προσθέστε και διαμορφώστε geocode service ή feature layer ως πηγές αναζήτησης. Αυτές οι καθορισμένες πηγές προσδιορίζουν τι μπορείτε να αναζητήσετε στο πλαίσιο αναζήτησης",
    "addSearchSourceLabel": "Προσθήκη πηγής αναζήτησης",
    "featureLayerLabel": "Feature Layer",
    "geocoderLabel": "Γεωκωδικοποίηση",
    "nameTitle": "Όνομα",
    "generalSettingLabel": "Γενική ρύθμιση",
    "allPlaceholderLabel": "Κείμενο υπόδειξης για αναζήτηση όλων:",
    "allPlaceholderHintText": "Υπόδειξη: Εισαγάγετε κείμενο που θα εμφανίζεται ως θέση περιγραφής κατά την αναζήτηση σε όλα τα επίπεδα και το εργαλείο γεωκωδικοποίησης",
    "generalSettingCheckboxLabel": "Εμφάνιση αναδυόμενου παράθυρου για το στοιχείο ή την τοποθεσία που βρέθηκε",
    "countryCode": "Κωδικοί χώρας ή περιοχής",
    "countryCodeEg": "π.χ. ",
    "countryCodeHint": "Εάν αφήσετε κενή αυτήν την τιμή, θα γίνει αναζήτηση σε όλες τις χώρες και περιοχές",
    "questionMark": ";",
    "searchInCurrentMapExtent": "Αναζήτηση μόνο στην τρέχουσα έκταση χάρτη",
    "zoomScale": "Εστίαση κλίμακας",
    "locatorUrl": "URL Εργαλείου Γεωκωδικοποίησης",
    "locatorName": "Όνομα Εργαλείου Γεωκωδικοποίησης",
    "locatorExample": "Παράδειγμα",
    "locatorWarning": "Αυτή η έκδοση του geocoding service δεν υποστηρίζεται. Το widget υποστηρίζει geocoding service έκδοσης 10.0 και νεότερες.",
    "locatorTips": "Δεν διατίθενται προτάσεις επειδή το geocoding service δεν υποστηρίζει δυνατότητα προτάσεων.",
    "layerSource": "Πηγή θεματικού επιπέδου",
    "setLayerSource": "Ορισμός πηγής θεματικού επιπέδου",
    "setGeocoderURL": "Ορισμός URL Εργαλείου γεωκωδικοποίησης",
    "searchLayerTips": "Δεν διατίθενται προτάσεις επειδή το feature service δεν υποστηρίζει δυνατότητα σελιδοποίησης.",
    "placeholder": "Κείμενο υπόδειξης",
    "searchFields": "Πεδία αναζήτησης",
    "displayField": "Πεδίο εμφάνισης",
    "exactMatch": "Ακριβής αντιστοιχία",
    "maxSuggestions": "Μέγιστος αριθμός προτάσεων",
    "maxResults": "Μέγιστος αριθμός αποτελέσματα",
    "enableLocalSearch": "Ενεργοποίηση τοπικής αναζήτησης",
    "minScale": "Ελάχιστη κλίμακα",
    "minScaleHint": "Όταν η κλίμακα του χάρτη είναι μεγαλύτερη από αυτήν την κλίμακα, εφαρμόζεται τοπική αναζήτηση",
    "radius": "Ακτίνα",
    "radiusHint": "Προσδιορίζει την ακτίνα μιας περιοχής γύρω από το κέντρο του τρέχοντα χάρτη που χρησιμοποιείται για να ενισχύσει την κατάταξη των υποψηφίων γεωκωδικοποίησης, ώστε να εμφανίζονται πρώτα οι υποψήφιοι που βρίσκονται πιο κοντά στην τοποθεσία",
    "meters": "Μέτρα",
    "setSearchFields": "Ορισμός πεδίων αναζήτησης",
    "set": "Ορισμός",
    "fieldName": "Όνομα",
    "invalidUrlTip": "Η URL διεύθυνση ${URL} είναι μη έγκυρη ή χωρίς δυνατότητα πρόσβασης."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Ρυθμίσεις αναζήτησης",
    "defaultBufferDistanceLabel": "Ορίστε την προκαθορισμένη απόσταση ζώνης",
    "maxResultCountLabel": "Περιορισμός αριθμού αποτελεσμάτων",
    "maxResultCountHintLabel": "Υπόδειξη: Ορίστε τον μέγιστο αριθμό ορατών αποτελεσμάτων. Η τιμή του 1 θα επιστρέψει το πλησιέστερο στοιχείο",
    "maxBufferDistanceLabel": "Ορίστε τη μέγιστη απόσταση ζώνης",
    "bufferDistanceUnitLabel": "Μονάδες ακτίνας ζώνης",
    "defaultBufferHintLabel": "Υπόδειξη: Ορίστε την προκαθορισμένη τιμή για την μπάρα ρύθμισης ζώνης",
    "maxBufferHintLabel": "Υπόδειξη: Ορίστε τη μέγιστη τιμή για την μπάρα ρύθμισης ζώνης",
    "bufferUnitLabel": "Υπόδειξη: Καθορίστε μονάδα για τη δημιουργία ζώνης",
    "selectGraphicLocationSymbol": "Σύμβολο διεύθυνσης ή τοποθεσίας",
    "graphicLocationSymbolHintText": "Υπόδειξη: Σύμβολο διεύθυνσης που αναζητήθηκε ή τοποθεσίας που επιλέχθηκε",
    "addressLocationPolygonHintText": "Υπόδειξη: Σύμβολο για το θεματικό επίπεδο πολυγώνου που έχει αναζητηθεί",
    "popupTitleForPolygon": "Επιλογή πολυγώνου για την τοποθεσία της επιλεγμένης διεύθυνσης",
    "popupTitleForPolyline": "Επιλογή γραμμής για την τοποθεσία της διεύθυνσης",
    "addressLocationPolylineHintText": "Υπόδειξη: Σύμβολο για τη γραμμή πολλαπλών τμημάτων που έχει αναζητηθεί",
    "fontColorLabel": "Επιλογή χρώματος γραμματοσειράς για αποτελέσματα αναζήτησης",
    "fontColorHintText": "Υπόδειξη: Χρώμα γραμματοσειράς των αποτελεσμάτων αναζήτησης",
    "zoomToSelectedFeature": "Εστίαση στο επιλεγμένο στοιχείο",
    "zoomToSelectedFeatureHintText": "Υπόδειξη: Εστιάστε στο επιλεγμένο στοιχείο αντί της ζώνης",
    "intersectSearchLocation": "Επιστροφή τεμνόμενων πολυγώνων",
    "intersectSearchLocationHintText": "Υπόδειξη: Επιστρέφει τα πολύγωνα που περιέχουν την τοποθεσία που αναζητήθηκε αντί για τα πολύγωνα εντός της ζώνης",
    "enableProximitySearch": "Ενεργοποίηση αναζήτησης εγγύτητας",
    "enableProximitySearchHintText": "Υπόδειξη: Ενεργοποιήστε τη δυνατότητα ώστε να γίνεται αναζήτηση για τοποθεσίες κοντά σε κάποιο επιλεγμένο αποτέλεσμα.",
    "bufferVisibilityLabel": "Ορισμός ορατότητας ζώνης",
    "bufferVisibilityHintText": "Υπόδειξη: Η ζώνη θα εμφανίζεται στο χάρτη",
    "bufferColorLabel": "Ορισμός συμβόλου ζώνης",
    "bufferColorHintText": "Υπόδειξη: Επιλέξτε χρώμα και διαφάνεια για τη ζώνη",
    "searchLayerResultLabel": "Σχεδίαση μόνο των αποτελεσμάτων του επιλεγμένου θεματικού πεδίου",
    "searchLayerResultHint": "Υπόδειξη: Θα σχεδιαστεί στο χάρτη μόνο το επιλεγμένο επίπεδο στα αποτελέσματα αναζήτησης",
    "showToolToSelectLabel": "Ορισμός κουμπιού τοποθεσίας",
    "showToolToSelectHintText": "Υπόδειξη: Παρέχει ένα κουμπί για τον ορισμό τοποθεσίας στο χάρτη, αντί να ορίζεται πάντα η τοποθεσία, όταν γίνεται κλικ στο χάρτη",
    "geoDesicParamLabel": "Χρήση γαιωδαιτικής ζώνης",
    "geoDesicParamHintText": "Υπόδειξη: Χρησιμοποιήστε γαιωδαιτική ζώνη αντί για ευκλείδεια ζώνη (επίπεδη)"
  },
  "layerSelector": {
    "selectLayerLabel": "Επιλογή θεματικού(ών) επιπέδου(ων) αναζήτησης",
    "layerSelectionHint": "Υπόδειξη: Χρησιμοποιήστε το κουμπί \"Ορισμός\" για να επιλέξετε θεματικό(ά) επίπεδο(α)",
    "addLayerButton": "Ορισμός"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Ρυθμίσεις κατεύθυνσης",
    "routeServiceUrl": "Υπηρεσία δρομολόγησης",
    "buttonSet": "Ορισμός",
    "routeServiceUrlHintText": "Υπόδειξη: Πατήστε \"Ορισμός\" για αναζήτηση και επιλογή μιας υπηρεσίας δρομολόγησης",
    "directionLengthUnit": "Μονάδες μήκους κατεύθυνσης",
    "unitsForRouteHintText": "Υπόδειξη: Χρησιμοποιείται για την εμφάνιση μονάδων για το δρομολόγιο",
    "selectRouteSymbol": "Επιλογή συμβόλου για εμφάνιση δρομολογίου",
    "routeSymbolHintText": "Υπόδειξη: Χρησιμοποιείται για την εμφάνιση του συμβόλου γραμμής της διαδρομής",
    "routingDisabledMsg": "Για να ενεργοποιήσετε τις κατευθύνσεις, βεβαιωθείτε ότι η δρομολόγηση είναι ενεργοποιημένη στο αντικείμενο στις ρυθμίσεις εφαρμογής."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Ρυθμίσεις συμβολολογίας",
    "addSymbologyBtnLabel": "Προσθήκη νέων συμβόλων",
    "layerNameTitle": "Όνομα θεματικού επιπέδου",
    "fieldTitle": "Πεδίο",
    "valuesTitle": "Τιμές",
    "symbolTitle": "Σύμβολο",
    "actionsTitle": "Ενέργειες",
    "invalidConfigMsg": "Διπλότυπο πεδίο : ${fieldName} για θεματικό επίπεδο : ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Ρυθμίσεις φίλτρου",
    "addTaskTip": "Προσθέστε ένα ή περισσότερα φίλτρα στο(α) επιλεγμένο(α) θεματικό(ά) επίπεδο(α) αναζήτησης και διαμορφώστε παραμέτρους για κάθε ένα ξεχωριστά.",
    "enableMapFilter": "Καταργήστε το προκαθορισμένο φίλτρο θεματικού επιπέδου από το χάρτη.",
    "newFilter": "Νέο φίλτρο",
    "filterExpression": "Έκφραση φίλτρου",
    "layerDefaultSymbolTip": "Χρήση του προκαθορισμένου συμβόλου του θεματικού επιπέδου",
    "uploadImage": "Μεταφορτώστε μια εικόνα",
    "selectLayerTip": "Επιλέξτε ένα θεματικό επίπεδο.",
    "setTitleTip": "Επιλέξτε τίτλο.",
    "noTasksTip": "Δεν διαμορφώθηκαν φίλτρα. Κάντε κλικ στην επιλογή \"${newFilter}\" για να προσθέσετε νέο.",
    "collapseFiltersTip": "Σύμπτυξη των εκφράσεων των φίλτρων (αν υπάρχουν) κατά το άνοιγμα του widget",
    "groupFiltersTip": "Φίλτρα ομάδων κατά θεματικό επίπεδο"
  },
  "networkServiceChooser": {
    "arcgislabel": "Προσθήκη από το ArcGIS Online",
    "serviceURLabel": "Προσθήκη URL υπηρεσίας",
    "routeURL": "URL δρομολόγησης",
    "validateRouteURL": "Επικύρωση",
    "exampleText": "Παράδειγμα",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Καθορίστε ένα έγκυρο Route service.",
    "rateLimitExceeded": "Έγινε υπέρβαση του ορίου ρυθμού μετάδοσης. Προσπαθήστε ξανά αργότερα.",
    "errorInvokingService": "Εσφαλμένο όνομα χρήστη ή κωδικός πρόσβασης."
  },
  "errorStrings": {
    "bufferErrorString": "Εισαγάγετε μια έγκυρη αριθμητική τιμή.",
    "selectLayerErrorString": "Επιλέξτε θεματικό(ά) επίπεδο(α) προς αναζήτηση.",
    "invalidDefaultValue": "Η προεπιλεγμένη ακτίνα ζώνης δεν μπορεί να είναι κενή. Καθορίστε την ακτίνα ζώνης",
    "invalidMaximumValue": "Η μέγιστη προεπιλεγμένη ακτίνα ζώνης δεν μπορεί να είναι κενή. Καθορίστε την ακτίνα ζώνης",
    "defaultValueLessThanMax": "Καθορίστε την προεπιλεγμένη ακτίνα ζώνης εντός του ανώτατου ορίου",
    "defaultBufferValueGreaterThanOne": "Η προεπιλεγμένη απόσταση ζώνης δεν μπορεί να είναι μικρότερη του 0",
    "maximumBufferValueGreaterThanOne": "Καθορίστε τη μέγιστη ακτίνα ζώνης με τιμή μεγαλύτερη του 0",
    "invalidMaximumResultCountValue": "Καθορίστε μια έγκυρη τιμή για το μέγιστο πλήθος αποτελεσμάτων",
    "invalidSearchSources": "Μη έγκυρες ρυθμίσεις πηγής αναζήτησης"
  },
  "symbolPickerPreviewText": "Προεπισκόπηση:"
});