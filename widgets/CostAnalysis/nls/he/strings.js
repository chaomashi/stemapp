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
  "_widgetLabel": "גרסת בתא של ניתוח עלויות",
  "unableToFetchInfoErrMessage": "לא ניתן לאחזר את פרטי שירות הגיאומטריה/השכבה שהוגדרה",
  "invalidCostingGeometryLayer": "לא ניתן לקבל את esriFieldTypeGlobalID בשכבה של גיאומטריית התמחור.",
  "projectLayerNotFound": "לא ניתן לאתר במפה את שכבת הפרויקט שהוגדרה.",
  "costingGeometryLayerNotFound": "לא ניתן לאתר במפה את השכבה של גיאומטריית התמחור שהוגדרה.",
  "projectMultiplierTableNotFound": "לא ניתן לאתר במפה את טבלת העלויות הנוספות של המכפיל בפרויקט שהוגדרה.",
  "projectAssetTableNotFound": "לא ניתן לאתר במפה את טבלת נכסי הפרויקט שהוגדרה.",
  "createLoadProject": {
    "createProjectPaneTitle": "צור פרויקט",
    "loadProjectPaneTitle": "טען פרויקט",
    "projectNamePlaceHolder": "שם פרויקט",
    "projectDescPlaceHolder": "תיאור פרויקט",
    "selectProject": "בחר פרויקט",
    "viewInMapLabel": "הצג במפה",
    "loadLabel": "טען",
    "createLabel": "צור",
    "deleteProjectConfirmationMsg": "האם אתה בטוח שברצונך למחוק את הפרויקט?",
    "noAssetsToViewOnMap": "הפרויקט שנבחר לא מכיל נכסים שניתן להציג המפה.",
    "projectDeletedMsg": "הפרויקט נמחק בהצלחה.",
    "errorInCreatingProject": "אירעה שגיאה בעת יצירת הפרויקט.",
    "errorProjectNotFound": "הפרויקט לא נמצא.",
    "errorInLoadingProject": "ודא שבחרת פרויקט חוקי.",
    "errorProjectNotSelected": "בחר פרויקט מהתפריט הנפתח",
    "errorDuplicateProjectName": "שם הפרויקט קיים כבר."
  },
  "statisticsSettings": {
    "tabTitle": "הגדרות סטטיסטיקה",
    "addStatisticsLabel": "הוסף נתונים סטטיסטיים",
    "addNewStatisticsText": "הוסף נתונים סטטיסטיים חדשים",
    "deleteStatisticsText": "מחק נתונים סטטיסטיים",
    "moveStatisticsUpText": "העבר נתונים סטטיסטיים למעלה",
    "moveStatisticsDownText": "העבר נתונים סטטיסטיים למטה",
    "layerNameTitle": "שכבה",
    "statisticsTypeTitle": "סוג",
    "fieldNameTitle": "שדה",
    "statisticsTitle": "תווית",
    "actionLabelTitle": "פעולות",
    "selectDeselectAllTitle": "בחר הכל"
  },
  "statisticsType": {
    "countLabel": "מונה",
    "averageLabel": "ממוצע",
    "maxLabel": "מקסימום",
    "minLabel": "מינימום",
    "summationLabel": "סיכום",
    "areaLabel": "שטח",
    "lengthLabel": "אורך"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "יש לסמן את השכבות כניתנות לעריכה בכרטיסיית הגדרות השכבות"
  },
  "workBench": {
    "refresh": "רענן",
    "noAssetAddedMsg": "לא נוספו נכסים",
    "units": "יחידות",
    "assetDetailsTitle": "פרטי פריט נכס",
    "costEquationTitle": "משוואת עלות",
    "newCostEquationTitle": "משוואה חדשה",
    "defaultCostEquationTitle": "משוואת ברירת מחדל",
    "geographyTitle": "גיאוגרפיה",
    "scenarioTitle": "תרחיש",
    "costingInfoHintText": "<div>רמז: השתמש במילות המפתח הבאות</div><ul><li><b>{TOTALCOUNT}</b>: שימוש במספר הכולל של נכסים מאותו סוג בגיאוגרפיה</li><li><b>{MEASURE}</b>: שימוש באורך עבור נכס הקו ובשטח עבור נכס הפוליגון</li><li><b>{TOTALMEASURE}</b>: שימוש באורך הכולל עבור נכס הקו ובשטח הכולל עבור נכס הפוליגון מאותו סוג בגיאוגרפיה</li></ul> ניתן להשתמש בפונקציות כגון:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>ערוך את משוואת העלות בהתאם לצורכי הפרויקט שלך.",
    "zoomToAsset": "התמקד בנכס",
    "deleteAsset": "מחק נכס",
    "closeDialog": "סגור דיאלוג",
    "objectIdColTitle": "מזהה אובייקט",
    "costColTitle": "עלות",
    "errorInvalidCostEquation": "משוואת עלות לא חוקית.",
    "errorInSavingAssetDetails": "לא ניתן לשמור את פרטי הנכס."
  },
  "assetDetails": {
    "inGeography": " ב-‎${geography}‎ ",
    "withScenario": " עם ‎${scenario}‎",
    "totalCostTitle": "Total Cost",
    "additionalCostLabel": "תאור",
    "additionalCostValue": "ערך",
    "additionalCostNetValue": "ערך נטו"
  },
  "projectOverview": {
    "assetItemsTitle": "פריטי נכס",
    "assetStatisticsTitle": "סטטיסטיקת נכסים",
    "projectSummaryTitle": "סיכום פרויקט",
    "projectName": "שם הפרויקט: ‎${name}‎",
    "totalCostLabel": "עלות כוללת של הפרויקט (*):",
    "grossCostLabel": "עלות ברוטו של הפרויקט (*):",
    "roundingLabel": "* מעגל ל-'‎${selectedRoundingOption}‎'",
    "unableToSaveProjectBoundary": "לא ניתן לשמור את גבול הפרויקט בשכבת הפרויקט.",
    "unableToSaveProjectCost": "לא ניתן לשמור את העלויות בשכבת הפרויקט.",
    "roundCostValues": {
      "twoDecimalPoint": "שתי נקודות עשרוניות",
      "nearestWholeNumber": "המספר השלם הקרוב ביותר",
      "nearestTen": "כפולה קרובה ביותר של עשר",
      "nearestHundred": "כפולה קרובה ביותר של מאה",
      "nearestThousand": "כפולה קרובה ביותר של אלף",
      "nearestTenThousands": "כפולה קרובה ביותר של עשרת אלפים"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "מאפיין פרויקט",
    "projectAttributeTitle": "ערוך מאפייני פרויקט"
  },
  "costEscalation": {
    "costEscalationLabel": "הוסף עלות נוספת",
    "valueHeader": "ערך",
    "addCostEscalationText": "הוסף עלות נוספת",
    "deleteCostEscalationText": "מחק עלות נוספת שנבחרה",
    "moveCostEscalationUpText": "העבר עלות נוספת שנבחרה למעלה",
    "moveCostEscalationDownText": "העבר עלות נוספת שנבחרה למטה",
    "invalidEntry": "ערך אחד או יותר אינו חוקי.",
    "errorInSavingCostEscalation": "לא ניתן לשמור את פרטי העלות הנוספת."
  },
  "scenarioSelection": {
    "popupTitle": "בחר תרחיש עבור הנכס",
    "regionLabel": "גיאוגרפיה",
    "scenarioLabel": "תרחיש",
    "noneText": "ללא",
    "copyFeatureMsg": "האם ברצונך להעתיק את הישויות שנבחרו?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "נתונים סטטיסטיים של פרטים",
    "noDetailStatisticAvailable": "לא נוספו נתונים סטטיסטיים של נכס"
  }
});