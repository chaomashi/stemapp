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
  "_widgetLabel": "הקרנה",
  "geometryServicesNotFound": "שירות הגיאומטריה לא זמין.",
  "unableToDrawBuffer": "לא ניתן לשרטט חיץ. נסה שוב.",
  "invalidConfiguration": "תצורה לא חוקית.",
  "clearAOIButtonLabel": "התחל שוב",
  "noGraphicsShapefile": "ה-shapefile שהועלה אינו כולל גרפיקה.",
  "zoomToLocationTooltipText": "התמקד במיקום",
  "noGraphicsToZoomMessage": "לא נמצאה גרפיקה להתמקד בה.",
  "placenameWidget": {
    "placenameLabel": "חפש מיקום"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "בחר מצב שרטוט",
    "toggleSelectability": "לחץ כדי לברור את אפשרות הבחירה",
    "chooseLayerTitle": "בחר שכבה ניתנת לבחירה",
    "selectAllLayersText": "בחר הכל",
    "layerSelectionWarningTooltip": "יש לבחור שכבה אחת לפחות לצורך יצירת AOI"
  },
  "shapefileWidget": {
    "shapefileLabel": "העלה ל-shapefile מכווץ",
    "uploadShapefileButtonText": "טען",
    "unableToUploadShapefileMessage": "לא ניתן להעלות Shapefile."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "הגדר נקודת התחלה",
    "addButtonTitle": "הוספה",
    "deleteButtonTitle": "הסר",
    "mapTooltipForStartPoint": "לחץ במפה כדי להגדיר נקודת התחלה",
    "mapTooltipForUpdateStartPoint": "לחץ במפה כדי לעדכן את נקודת ההתחלה",
    "locateText": "Locate",
    "locateByMapClickText": "בחר קואורדינטות ראשוניות",
    "enterBearingAndDistanceLabel": "הזן כיוון ומרחק מנקודת ההתחלה",
    "bearingTitle": "כיוון",
    "distanceTitle": "מרחק",
    "planSettingTooltip": "הגדרות תוכנית",
    "invalidLatLongMessage": "הזן ערכים חוקיים."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "מרחק חיץ (אופציונלי)",
    "bufferInputLabel": "הצג תוצאות בתוך"
  },
  "traverseSettings": {
    "bearingLabel": "כיוון",
    "lengthLabel": "אורך",
    "addButtonTitle": "הוספה",
    "deleteButtonTitle": "הסר"
  },
  "planSettings": {
    "expandGridTooltipText": "הרחב גריד",
    "collapseGridTooltipText": "כווץ גריד",
    "directionUnitLabelText": "יחידת כיוונים",
    "distanceUnitLabelText": "יחידות מרחק ואורך",
    "planSettingsComingSoonText": "מגיע בקרוב"
  },
  "newTraverse": {
    "invalidBearingMessage": "כיוון לא חוקי.",
    "invalidLengthMessage": "אורך לא חוקי.",
    "negativeLengthMessage": "אורך שלילי"
  },
  "reportsTab": {
    "aoiAreaText": "אזור AOI",
    "downloadButtonTooltip": "הורדה",
    "printButtonTooltip": "הדפס",
    "uploadShapefileForAnalysisText": "העלה Shapefile כך שייכלל בניתוח",
    "uploadShapefileForButtonText": "נתב",
    "downloadLabelText": "בחר פורמט :",
    "downloadBtnText": "הורדה",
    "noDetailsAvailableText": "לא נמצאו תוצאות",
    "featureCountText": "מונה",
    "featureAreaText": "שטח",
    "featureLengthText": "אורך",
    "attributeChooserTooltip": "בחר מאפיינים להצגה",
    "csv": "CSV",
    "filegdb": "File Geodatabase",
    "shapefile": "Shapefile",
    "noFeaturesFound": "לא נמצאה תוצאה עבור פורמט קובץ שנבחר",
    "selectReportFieldTitle": "בחר שדות",
    "noFieldsSelected": "לא נבחרו שדות",
    "intersectingFeatureExceedsMsgOnCompletion": "הגעת לספירת הרשומה המקסימלית עבור שכבה אחת או יותר.",
    "unableToAnalyzeText": "לא ניתן לנתח, הגעת לספירת רשומה מקסימלית.",
    "errorInPrintingReport": "לא ניתן להדפיס את הדוח. בדוק אם הגדרות הדוח חוקיות.",
    "aoiInformationTitle": "מידע עבור אזור עניין (AOI)",
    "summaryReportTitle": "סיכום",
    "notApplicableText": "לא זמין",
    "downloadReportConfirmTitle": "אשר הורדה",
    "downloadReportConfirmMessage": "האם אתה בטוח שברצונך להוריד?",
    "noDataText": "אין נתונים",
    "createReplicaFailedMessage": "פעולת ההורדה נכשלה עבור השכבות הבאות : <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "פעולת ההורדה נכשלה.",
    "printLayoutLabelText": "פריסת עמוד",
    "printBtnText": "הדפס",
    "printDialogHint": "הערה: ניתן לערוך את כותרת הדוח ואת ההערות בתצוגה המקדימה של הדוח.",
    "unableToDownloadFileGDBText": "לא ניתן להוריד File Geodatabase עבור AOI המכיל מיקומי נקודה או קו.",
    "unableToDownloadShapefileText": "לא ניתן להוריד Shapefile עבור AOI המכיל מיקומי נקודה או קו.",
    "analysisUnitLabelText": "הצג תוצאות ב:",
    "analysisUnitButtonTooltip": "בחר יחידות לניתוח",
    "analysisCloseBtnText": "סגור",
    "feetUnit": "רגל / רגל רבוע",
    "milesUnit": "מיילים / אקרים",
    "metersUnit": "מטרים / מטרים רבועים",
    "kilometersUnit": "קילומטרים / קילומטרים רבועים",
    "hectaresUnit": "קילומטרים / הקטרים",
    "hectaresAbbr": "הקטרים",
    "layerNotVisibleText": "לא ניתן לבצע ניתוח, השכבה כבויה או חורגת מטווח הנראות לפי קנה מידה.",
    "refreshBtnTooltip": "רענן דוח",
    "featureCSVAreaText": "אזור חיתוך",
    "featureCSVLengthText": "אורך חיתוך",
    "errorInFetchingPrintTask": "אירעה שגיאה במהלך קבלת הפרטים של משימת ההדפסה. נסה שוב."
  }
});