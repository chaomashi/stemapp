///////////////////////////////////////////////////////////////////////////
// Copyright © 2017 Esri. All Rights Reserved.
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
  "configText": "Ορισμός κειμένου διαμ.:",
  "generalSettings": {
    "tabTitle": "Γενικές ρυθμίσεις",
    "measurementUnitLabel": "Μονάδα μέτρησης",
    "currencyLabel": "Σύμβολο μέτρησης",
    "roundCostLabel": "Κόστος στρογγυλοποίησης",
    "projectOutputSettings": "Ρυθμίσεις εξόδου έργου",
    "typeOfProjectAreaLabel": "Τύπος περιοχής έργου",
    "bufferDistanceLabel": "Απόσταση ζώνης",
    "roundCostValues": {
      "twoDecimalPoint": "Δύο υποδιαστολές",
      "nearestWholeNumber": "Πλησιέστερος ακέραιος αριθμός",
      "nearestTen": "Πλησιέστερες δεκάδες",
      "nearestHundred": "Πλησιέστερες εκατοντάδες",
      "nearestThousand": "Πλησιέστερες χιλιάδες",
      "nearestTenThousands": "Πλησιέστερες δεκάδες χιλιάδες"
    },
    "projectAreaType": {
      "outline": "Περίγραμμα",
      "buffer": "Προσωρινή μνήμη"
    },
    "errorMessages": {
      "currency": "Μη έγκυρη νομισματική μονάδα",
      "bufferDistance": "Μη έγκυρη απόσταση ζώνης",
      "outOfRangebufferDistance": "Η τιμή πρέπει να είναι μεγαλύτερο από 0 και μικρότερη ή ίση με 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Ρυθμίσεις έργου",
    "costingGeometrySectionTitle": "Καθορισμός γεωγραφίας για κοστολόγηση (προαιρετικό)",
    "costingGeometrySectionNote": "Σημείωση: Η διαμόρφωση αυτού του θεματικού επιπέδου επιτρέπει στο χρήστη να ορίζει εξισώσεις κόστους προτύπων στοιχείων με βάση γεωγραφικές θέσεις.",
    "projectTableSectionTitle": "Δυνατότητα αποθήκευσης/φόρτωσης ρυθμίσεων έργου (προαιρετικό)",
    "projectTableSectionNote": "Σημείωση: Διαμόρφωση όλων των πινάκων και θεματικών επιπέδων επιτρέπει στο χρήστη να αποθηκεύσει/φορτώσει το έργο για μετέπειτα χρήση.",
    "costingGeometryLayerLabel": "Geometry Layer Κοστολόγησης",
    "fieldLabelGeography": "Πεδίο για γεωγραφία ετικέτας",
    "projectAssetsTableLabel": "Πίνακας στοιχείων έργου",
    "projectMultiplierTableLabel": "Πίνακας επιπρόσθετου κόστους πολλαπλασιαστή έργου",
    "projectLayerLabel": "Project Layer",
    "configureFieldsLabel": "Διαμόρφωση πεδίων",
    "fieldDescriptionHeaderTitle": "Περιγραφή πεδίου",
    "layerFieldsHeaderTitle": "Πεδίο θεματικού επιπέδου",
    "selectLabel": "Επιλογή",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} έχει ήδη επιλεγεί",
      "invalidConfiguration": "Επιλέξτε ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Θα εμφανίζεται (εμφανίζονται) θεματικό(ά) επίπεδο(α) πολύγωνου με τις εξής συνθήκες: <br/> <li>\tΤο θεματικό επίπεδο πρέπει να έχει δυνατότητα â€œQueryâ€</li><li>\tΤο θεματικό επίπεδο πρέπει να έχει ένα πεδίο GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Τα πεδία συμβολοσειράς και τα αριθμητικά πεδία του επιλεγμένου â€œGeometry layer κοστολόγησηςâ€ θα εμφανίζονται στο πτυσσόμενο παράθυρο â€œΓεωγραφία πεδίου σε ετικέταâ€.</p>",
    "projectAssetsTableHelp": "<p>Ο (Οι) πίνακας(ες) με τις εξής συνθήκες θα εμφανίζονται: <br/> <li>Ο πίνακας πρέπει να έχει δυνατότητες επεξεργασίας και συγκεκριμένα â€œΔημιουργίαâ€, â€œΔιαγραφήâ€ και â€œΕνημέρωσηâ€</li>    <li>Ο πίνακας πρέπει να έχει έξι πεδία με ακριβές όνομα και τύπο δεδομένων:</li><ul><li>\tAssetGUID (πεδίο τύπου GUID)</li><li>\tCostEquation (πεδίο τύπου συμβολοσειράς)</li><li>\tΣενάριο (πεδίο τύπου συμβολοσειράς)</li><li>\tTemplateName (πεδίο τύπου συμβολοσειράς)</li><li>    GeographyGUID (πεδίο τύπου GUID)</li><li>\tProjectGUID (πεδίο τύπου GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Ο (Οι) πίνακας(ες) με τις εξής συνθήκες θα εμφανίζονται: <br/> <li>Ο πίνακας πρέπει να έχει δυνατότητες επεξεργασίας και συγκεκριμένα â€œΔημιουργίαâ€, â€œΔιαγραφήâ€ και â€œΕνημέρωσηâ€</li>    <li>Ο πίνακας πρέπει να έχει πέντε πεδία με ακριβές όνομα και τύπο δεδομένων:</li><ul><li>\tΠεριγραφή (πεδίο τύπου συμβολοσειράς)</li><li>\tΤύπος (πεδίο τύπου συμβολοσειράς)</li><li>\tΤιμή (πεδίο τύπου κινητής θέσης/διπλού στοιχείου)</li><li>\tCostindex (πεδίο τύπου ακέραιου)</li><li>   \tProjectGUID (πεδίο τύπου GUID))</li></ul> </p>",
    "projectLayerHelp": "<p>Το (Τα) θεματικό(ά) επίπεδο(α) πολυγώνου με τις εξής συνθήκες θα εμφανίζεται(ονται): <br/> <li>Το θεματικό επίπεδο πρέπει να έχει δυνατότητες επεξεργασίας και συγκεκριμένα â€œΔημιουργίαâ€, â€œΔιαγραφήâ€ και â€œΕνημέρωσηâ€</li>    <li>Το θεματικό επίπεδο πρέπει να έχει πέντε πεδία με ακριβές όνομα και τύπο δεδομένων:</li><ul><li>ProjectName (πεδίο τύπου συμβολοσειράς)</li><li>Περιγραφή (πεδίο τύπου συμβολοσειράς)</li><li>Totalassetcost (πεδίο τύπου κινητής θέσης/διπλού στοιχείου)</li><li>Grossprojectcost (πεδίο τύπου κινητής θέσης/διπλού στοιχείου)</li><li>GlobalID (πεδίο τύπου GlobalID)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Ρυθμίσεις θεματικού επιπέδου",
    "layerNameHeaderTitle": "Όνομα θεματικού επιπέδου",
    "layerNameHeaderTooltip": "Λίστα θεματικών επιπέδων στον χάρτη",
    "EditableLayerHeaderTitle": "Επεξεργάσιμο",
    "EditableLayerHeaderTooltip": "Συμπερίληψη θεματικού επιπέδου και των προτύπων του στο widget κοστολόγησης",
    "SelectableLayerHeaderTitle": "Επιλέξιμο",
    "SelectableLayerHeaderTooltip": "Η γεωμετρία στοιχείου μπορεί να χρησιμοποιηθεί για τη δημιουργία ενός νέου στοιχείου κόστους",
    "fieldPickerHeaderTitle": "ID έργου (προαιρετικό)",
    "fieldPickerHeaderTooltip": "Προαιρετικό πεδίο (συμβολοσειράς τύπου) για την αποθήκευση του ID έργου σε",
    "selectLabel": "Επιλογή",
    "noAssetLayersAvailable": "Δεν βρέθηκε θεματικό επίπεδο στοιχείου στον επιλεγμένο webmap.",
    "disableEditableCheckboxTooltip": "Σε αυτό το θεματικό επίπεδο δεν υπάρχει δυνατότητα επεξεργασίας",
    "missingCapabilitiesMsg": "Από το θεματικό επίπεδο αυτό λείπουν οι εξής δυνατότητες:",
    "missingGlobalIdMsg": "Αυτό το θεματικό επίπεδο δεν έχει πεδίο GlobalId.",
    "create": "Δημιουργία",
    "update": "Ενημέρωση",
    "delete": "Διαγραφή"
  },
  "costingInfo": {
    "tabTitle": "Πληροφορίες κοστολόγησης",
    "proposedMainsLabel": "Προτεινόμενα βασικά",
    "addCostingTemplateLabel": "Προσθήκη προτύπου κοστολόγησης",
    "manageScenariosTitle": "Διαχείριση σεναρίων",
    "featureTemplateTitle": "Πρότυπο στοιχείου",
    "costEquationTitle": "Εξίσωση κόστους",
    "geographyTitle": "Γεωγραφική θέση",
    "scenarioTitle": "Σενάριο",
    "actionTitle": "Ενέργειες",
    "scenarioNameLabel": "Όνομα σεναρίου",
    "addBtnLabel": "Προσθήκη",
    "srNoLabel": "Αρ.",
    "deleteLabel": "Διαγραφή",
    "duplicateScenarioName": "Δημιουργία αντιγράφου ονόματος σεναρίου",
    "hintText": "<div>Υπόδειξη: Χρησιμοποιήστε τις ακόλουθες λέξεις-κλειδιά</div><ul><li><b>{TOTALCOUNT}</b>: Χρησιμοποιεί τον συνολικό αριθμό στοιχείου ίδιου τύπου σε μια γεωγραφική θέση</li><li><b>{MEASURE}</b>: Χρησιμοποιεί το μήκος για το στοιχείο γραμμής και τομέα για στοιχείο πολυγώνου</li><li><b>{TOTALMEASURE}</b>: Χρησιμοποιεί το συνολικό μήκος για στοιχείο γραμμής και συνολική περιοχή για στοιχείο πολυγώνου του ίδιου τύπου σε μια γεωγραφική θέση</li></ul>Μπορείτε να χρησιμοποιήσετε λειτουργίες όπως:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Επεξεργαστείτε την εξίσωση κόστους σύμφωνα με την ανάγκη του έργου σας.",
    "noneValue": "Κανένα",
    "requiredCostEquation": "Μη έγκυρη εξίσωση κόστους για ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Υπάρχει διπλή εγγραφή προτύπου για ${layerName} : ${templateName}",
    "defaultEquationRequired": "Απαιτείται προεπιλεγμένη εξίσωση για ${layerName} : ${templateName}",
    "validCostEquationMessage": "Εισαγάγετε μια έγκυρη εξίσωση κόστους",
    "costEquationHelpText": "Επεξεργαστείτε την εξίσωση κόστους σύμφωνα με την ανάγκη του έργου σας",
    "scenarioHelpText": "Επιλέξτε σενάριο σύμφωνα με την ανάγκη του έργου σας",
    "copyRowTitle": "Αντιγραφή σειράς",
    "noTemplateAvailable": "Προσθέστε τουλάχιστον ένα πρότυπο για ${layerName}",
    "manageScenarioLabel": "Διαχείριση σεναρίου",
    "noLayerMessage": "Εισαγάγετε τουλάχιστον ένα θεματικό επίπεδο στο ${tabName}",
    "noEditableLayersAvailable": "Το (Τα) θεματικό(ά) επίπεδο(α) πρέπει να επιλεγεί ως επεξεργάσιμο στην καρτέλα ρυθμίσεων θεματικού επιπέδου"
  },
  "statisticsSettings": {
    "tabTitle": "Ρυθμίσεις στατιστικής",
    "addStatisticsLabel": "Προσθήκη στατιστικών",
    "fieldNameTitle": "Πεδίο",
    "statisticsTitle": "Ετικέτα",
    "addNewStatisticsText": "Προσθήκη νέων στατιστικών",
    "deleteStatisticsText": "Διαγραφή στατιστικών",
    "moveStatisticsUpText": "Μετακίνηση στατιστικών επάνω",
    "moveStatisticsDownText": "Μετακίνηση στατιστικών κάτω",
    "selectDeselectAllTitle": "Επιλογή όλων"
  },
  "statisticsType": {
    "countLabel": "Πλήθος",
    "averageLabel": "Μέσος όρος",
    "maxLabel": "Μέγιστο",
    "minLabel": "Ελάχιστο",
    "summationLabel": "Άθροιση",
    "areaLabel": "Εμβαδόν",
    "lengthLabel": "Μήκος"
  }
});