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
    "miles": "Μίλια",
    "kilometers": "Χιλιόμετρα",
    "feet": "Πόδια",
    "meters": "Μέτρα"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Ρυθμίσεις αναζήτησης",
    "buttonSet": "Ορισμός",
    "selectLayersLabel": "Επιλογή θεματικού επιπέδου",
    "selectLayersHintText": "Υπόδειξη: Χρησιμοποιείται για την επιλογή του πολυγωνικού θεματικού επιπέδου και του σχετικού με αυτό σημειακού θεματικού επιπέδου.",
    "selectPrecinctSymbolLabel": "Επιλογή συμβόλου για επισήμανση πολυγώνου",
    "selectGraphicLocationSymbol": "Σύμβολο διεύθυνσης ή τοποθεσίας",
    "graphicLocationSymbolHintText": "Υπόδειξη: Σύμβολο διεύθυνσης που αναζητήθηκε ή τοποθεσίας που επιλέχθηκε",
    "precinctSymbolHintText": "Υπόδειξη: Χρησιμοποιείται για την εμφάνιση του συμβόλου για το επιλεγμένο πολύγωνο",
    "selectColorForPoint": "Επιλέξτε χρώμα για να επισημάνετε ένα σημείο",
    "selectColorForPointHintText": "Υπόδειξη: Χρησιμοποιείται για την εμφάνιση του χρώματος επισήμανσης του επιλεγμένου σημείου"
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
    "invalidUrlTip": "Η URL διεύθυνση ${URL} είναι μη έγκυρη ή χωρίς δυνατότητα πρόσβασης.",
    "invalidSearchSources": "Μη έγκυρες ρυθμίσεις πηγής αναζήτησης"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Επιλογή πολυγωνικού θεματικού επιπέδου",
    "selectPolygonLayerHintText": "Υπόδειξη: Χρησιμοποιείται για την επιλογή πολυγωνικού θεματικού επιπέδου.",
    "selectRelatedPointLayerLabel": "Επιλογή σημειακού θεματικού επιπέδου σχετικού με το πολυγωνικό θεματικό επίπεδο",
    "selectRelatedPointLayerHintText": "Υπόδειξη: Χρησιμοποιείται για την επιλογή του σημειακού θεματικού επιπέδου που σχετίζεται με το πολυγωνικό θεματικό επίπεδο",
    "polygonLayerNotHavingRelatedLayer": "Επιλέξτε ένα πολυγωνικό θεματικό επίπεδο που να διαθέτει σημειακό θεματικό επίπεδο.",
    "errorInSelectingPolygonLayer": "Επιλέξτε ένα πολυγωνικό θεματικό επίπεδο που να διαθέτει σημειακό θεματικό επίπεδο.",
    "errorInSelectingRelatedLayer": "Επιλέξτε το σημειακό θεματικό επίπεδο που σχετίζεται με το πολυγωνικό θεματικό επίπεδο."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Ρυθμίσεις κατεύθυνσης",
    "routeServiceUrl": "Υπηρεσία δρομολόγησης",
    "buttonSet": "Ορισμός",
    "routeServiceUrlHintText": "Υπόδειξη: Κάντε κλικ στην επιλογή \"Ορισμός\" για αναζήτηση και επιλογή ενός network analysis routing service",
    "directionLengthUnit": "Μονάδες μήκους κατεύθυνσης",
    "unitsForRouteHintText": "Υπόδειξη: Χρησιμοποιείται για την εμφάνιση αναφερόμενων μονάδων για το δρομολόγιο",
    "selectRouteSymbol": "Επιλογή συμβόλου για εμφάνιση δρομολογίου",
    "routeSymbolHintText": "Υπόδειξη: Χρησιμοποιείται για την εμφάνιση του συμβόλου γραμμής της διαδρομής",
    "routingDisabledMsg": "Για να ενεργοποιήσετε τις κατευθύνσεις, βεβαιωθείτε ότι η δρομολόγηση είναι ενεργοποιημένη στο ArcGIS Online αντικείμενο."
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
  "symbolPickerPreviewText": "Προεπισκόπηση:",
  "showToolToSelectLabel": "Ορισμός κουμπιού τοποθεσίας",
  "showToolToSelectHintText": "Υπόδειξη: Παρέχει ένα κουμπί για τον ορισμό τοποθεσίας στο χάρτη, αντί να ορίζεται πάντα η τοποθεσία, όταν γίνεται κλικ στο χάρτη"
});