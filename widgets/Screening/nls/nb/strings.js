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
  "_widgetLabel": "Undersøkelse",
  "geometryServicesNotFound": "Geometritjenesten er ikke tilgjengelig.",
  "unableToDrawBuffer": "Kan ikke tegne buffer. Prøv på nytt.",
  "invalidConfiguration": "Ugyldig konfigurasjon.",
  "clearAOIButtonLabel": "Start på nytt",
  "noGraphicsShapefile": "Opplastet shapefil inneholder ikke grafikk.",
  "zoomToLocationTooltipText": "Zoom til lokasjon",
  "noGraphicsToZoomMessage": "Finner ingen grafikk å zoome inn på.",
  "placenameWidget": {
    "placenameLabel": "Søk etter en lokasjon"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Velg tegnemodus",
    "toggleSelectability": "Klikk for å veksle valgbarhet",
    "chooseLayerTitle": "Velg et valgbart lag",
    "selectAllLayersText": "Merk alle",
    "layerSelectionWarningTooltip": "Du må velge minst ett lag for å opprette interesseområde"
  },
  "shapefileWidget": {
    "shapefileLabel": "Last opp en komprimert shapefil",
    "uploadShapefileButtonText": "Opplasting",
    "unableToUploadShapefileMessage": "Kan ikke laste opp shapefil."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Definer et startpunkt",
    "addButtonTitle": "Legg til",
    "deleteButtonTitle": "Fjern",
    "mapTooltipForStartPoint": "Klikk på kartet for å definere et startpunkt",
    "mapTooltipForUpdateStartPoint": "Klikk på kartet for å oppdatere startpunktet",
    "locateText": "Finn",
    "locateByMapClickText": "Velg innledende koordinater",
    "enterBearingAndDistanceLabel": "Angi peiling og avstand fra startpunkt",
    "bearingTitle": "Peiling",
    "distanceTitle": "Avstand",
    "planSettingTooltip": "Planinnstillinger",
    "invalidLatLongMessage": "Angi gyldige verdier."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Bufferavstand (valgfritt)",
    "bufferInputLabel": "Vis resultater i"
  },
  "traverseSettings": {
    "bearingLabel": "Peiling",
    "lengthLabel": "Lengde",
    "addButtonTitle": "Legg til",
    "deleteButtonTitle": "Fjern"
  },
  "planSettings": {
    "expandGridTooltipText": "Vis rutenett",
    "collapseGridTooltipText": "Skjul rutenett",
    "directionUnitLabelText": "Retningsenhet",
    "distanceUnitLabelText": "Avstands- eller lengdeenheter",
    "planSettingsComingSoonText": "Kommer snart"
  },
  "newTraverse": {
    "invalidBearingMessage": "Ugyldig peiling.",
    "invalidLengthMessage": "Ugyldig lengde.",
    "negativeLengthMessage": "Negativ lengde"
  },
  "reportsTab": {
    "aoiAreaText": "Interesseområde",
    "downloadButtonTooltip": "Last ned",
    "printButtonTooltip": "Skriv ut",
    "uploadShapefileForAnalysisText": "Last opp shapefil som skal inkluderes i analyse",
    "uploadShapefileForButtonText": "Bla gjennom",
    "downloadLabelText": "Velg format:",
    "downloadBtnText": "Last ned",
    "noDetailsAvailableText": "Fant ingen resultater",
    "featureCountText": "Antall",
    "featureAreaText": "Areal",
    "featureLengthText": "Lengde",
    "attributeChooserTooltip": "Velg attributter som skal vises",
    "csv": "CSV",
    "filegdb": "Filgeodatabase",
    "shapefile": "Shapefil",
    "noFeaturesFound": "Finner ingen resultater for valgt filformat",
    "selectReportFieldTitle": "Velg felt",
    "noFieldsSelected": "Ingen felt er valgt",
    "intersectingFeatureExceedsMsgOnCompletion": "Maksimalt antall poster er nådd for ett eller flere lag.",
    "unableToAnalyzeText": "Kan ikke analysere fordi maksimalt antall poster er nådd.",
    "errorInPrintingReport": "Kan ikke skrive ut rapporten. Kontroller om rapportinnstillingene er gyldige.",
    "aoiInformationTitle": "Informasjon om interesseområde (AOI, area of interest)",
    "summaryReportTitle": "Sammendrag",
    "notApplicableText": "Ikke tilgjengelig",
    "downloadReportConfirmTitle": "Bekreft nedlasting",
    "downloadReportConfirmMessage": "Er du sikker på at du vil laste ned?",
    "noDataText": "Ingen data",
    "createReplicaFailedMessage": "Nedlastingen mislyktes for følgende felt(er): <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Nedlastingen mislyktes.",
    "printLayoutLabelText": "Oppsett",
    "printBtnText": "Skriv ut",
    "printDialogHint": "Merk: Rapporttittelen og kommentarene kan redigeres i forhåndsvisningen av rapporten.",
    "unableToDownloadFileGDBText": "Filgeodatabase kan ikke lastes ned for interesseområde som inneholder punkt- eller linjelokasjoner",
    "unableToDownloadShapefileText": "Shapefil kan ikke lastes ned for interesseområde som inneholder punkt- eller linjelokasjoner",
    "analysisUnitLabelText": "Vis resultater i:",
    "analysisUnitButtonTooltip": "Velg enheter for analyse",
    "analysisCloseBtnText": "Lukk",
    "feetUnit": "Fot / Kvadratfot",
    "milesUnit": "Miles / Acres",
    "metersUnit": "Meter / Kvadratmeter",
    "kilometersUnit": "Kilometer / Kvadratkilometer",
    "hectaresUnit": "Kilometer / Hektar",
    "hectaresAbbr": "hektar",
    "layerNotVisibleText": "Kan ikke analysere, laget er slått av eller er utenfor synlighetsområdet for målestokken.",
    "refreshBtnTooltip": "Oppdater rapport",
    "featureCSVAreaText": "Krysningsområde",
    "featureCSVLengthText": "Krysningslengde",
    "errorInFetchingPrintTask": "Feil under henting av informasjon for utskriftsoppgave. Prøv på nytt."
  }
});