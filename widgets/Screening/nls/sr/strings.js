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
  "_widgetLabel": "Proveravanje",
  "geometryServicesNotFound": "Servis geometrije nije dostupan.",
  "unableToDrawBuffer": "Crtanje zone bliskosti nije moguće. Pokušajte ponovo.",
  "invalidConfiguration": "Nevažeća konfiguracija.",
  "clearAOIButtonLabel": "Počni iz početka",
  "noGraphicsShapefile": "Otpremljena shapefile datoteka ne sadrži grafiku.",
  "zoomToLocationTooltipText": "Zumiraj na lokaciju",
  "noGraphicsToZoomMessage": "Nisu pronađene grafike za zumiranje.",
  "placenameWidget": {
    "placenameLabel": "Pretražite lokaciju"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Izaberi režim crtanja",
    "toggleSelectability": "Kliknite da biste uključili ili isključili mogućnost selekcije",
    "chooseLayerTitle": "Odaberite selektivan sloj",
    "selectAllLayersText": "Selektuj sve",
    "layerSelectionWarningTooltip": "Makar jedan sloj mora da bude odabran za kreiranje AOI"
  },
  "shapefileWidget": {
    "shapefileLabel": "Otpremi zipovanu shapefile datoteku",
    "uploadShapefileButtonText": "Otpremi",
    "unableToUploadShapefileMessage": "Otpremanje shapefile datoteke nije moguće."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Definišite početnu tačku",
    "addButtonTitle": "Dodaj",
    "deleteButtonTitle": "Ukloni",
    "mapTooltipForStartPoint": "Kliknite na mapu kako biste definisali početnu tačku",
    "mapTooltipForUpdateStartPoint": "Kliknite na mapu kako biste ažurirali početnu tačku",
    "locateText": "Lociraj",
    "locateByMapClickText": "Odaberite početne koordinate",
    "enterBearingAndDistanceLabel": "Unesite direkcioni ugao i rastojanje od početne tačke",
    "bearingTitle": "Direkcioni ugao",
    "distanceTitle": "Rastojanje",
    "planSettingTooltip": "Postavke plana",
    "invalidLatLongMessage": "Unesite validne vrednosti."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Rastojanje zone bliskosti (opciono)",
    "bufferInputLabel": "Prikaži rezultate unutar"
  },
  "traverseSettings": {
    "bearingLabel": "Direkcioni ugao",
    "lengthLabel": "Dužina",
    "addButtonTitle": "Dodaj",
    "deleteButtonTitle": "Ukloni"
  },
  "planSettings": {
    "expandGridTooltipText": "Proširi mrežu",
    "collapseGridTooltipText": "Skupi mrežu",
    "directionUnitLabelText": "Jedinice uputstava",
    "distanceUnitLabelText": "Udaljenost i jedinice dužine",
    "planSettingsComingSoonText": "Stiže uskoro"
  },
  "newTraverse": {
    "invalidBearingMessage": "Nevažeći direkcioni ugao.",
    "invalidLengthMessage": "Nevažeća dužina.",
    "negativeLengthMessage": "Negativna dužina"
  },
  "reportsTab": {
    "aoiAreaText": "AOI oblast",
    "downloadButtonTooltip": "Preuzmi",
    "printButtonTooltip": "Odštampaj",
    "uploadShapefileForAnalysisText": "Otpremite shapefile datoteku za uključivanje u analizu",
    "uploadShapefileForButtonText": "Pregledaj",
    "downloadLabelText": "Izaberi format:",
    "downloadBtnText": "Preuzmi",
    "noDetailsAvailableText": "Nema pronađenih rezultata",
    "featureCountText": "Brojač",
    "featureAreaText": "Površina",
    "featureLengthText": "Dužina",
    "attributeChooserTooltip": "Odaberite atribute za prikaz",
    "csv": "CSV",
    "filegdb": "Fajl geobaza",
    "shapefile": "Shapefile datoteka",
    "noFeaturesFound": "Nema pronađenih rezultata za izabrani format datoteke",
    "selectReportFieldTitle": "Izaberite polja",
    "noFieldsSelected": "Nema izabranih polja",
    "intersectingFeatureExceedsMsgOnCompletion": "Maksimalan broj zapisa je dostignut za jedan ili više slojeva.",
    "unableToAnalyzeText": "Analiza nije moguća, maksimalan broj zapisa je dostignut.",
    "errorInPrintingReport": "Štampanje izveštaja nije moguće. Proverite da li su postavke izveštaja važeće.",
    "aoiInformationTitle": "Informacije o oblasti interesovanja (AOI)",
    "summaryReportTitle": "Rezime",
    "notApplicableText": "Nije dostupno",
    "downloadReportConfirmTitle": "Potvrdi preuzimanje",
    "downloadReportConfirmMessage": "Želite li zaista da preuzmete?",
    "noDataText": "Nema podataka",
    "createReplicaFailedMessage": "Operacija preuzimanje nije uspela za sledeće slojeve: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Operacija preuzimanja nije uspela.",
    "printLayoutLabelText": "Raspored",
    "printBtnText": "Odštampaj",
    "printDialogHint": "Napomena: naslov izveštaja i komentari mogu da se uređuju u pregledu izveštaja.",
    "unableToDownloadFileGDBText": "Datoteka geobaze podataka ne može da bude preuzeta za AOI koja sadrži tačkaste ili linijske lokacije",
    "unableToDownloadShapefileText": "Shapefile datoteke ne može da bude preuzeta za AOI koja sadrži tačkaste ili linijske lokacije",
    "analysisUnitLabelText": "Prikaži rezultate u:",
    "analysisUnitButtonTooltip": "Odaberite jedinice za analizu",
    "analysisCloseBtnText": "Zatvori",
    "feetUnit": "Stope / kvadratne stope",
    "milesUnit": "Milje / akri",
    "metersUnit": "Metri / kvadratni metri",
    "kilometersUnit": "Kilometri / kvadratni kolometri",
    "hectaresUnit": "Kilometri / hektari",
    "hectaresAbbr": "hektari",
    "layerNotVisibleText": "Analiza nije moguća, sloj je isključen ili je van obuhvata skale vidljivosti.",
    "refreshBtnTooltip": "Osveži izveštaj",
    "featureCSVAreaText": "Površina preseka",
    "featureCSVLengthText": "Dužina preseka",
    "errorInFetchingPrintTask": "Greška prilikom dobavljanja informacija o zadatku za štampanje. Pokušajte ponovo."
  }
});