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
  "configText": "טקסט הגדרת תצורה:",
  "generalSettings": {
    "tabTitle": "הגדרות כלליות",
    "measurementUnitLabel": "יחידת מדידה",
    "currencyLabel": "סמל מדידה",
    "roundCostLabel": "עיגול עלות",
    "projectOutputSettings": "הגדרות פלט בפרויקט",
    "typeOfProjectAreaLabel": "סוג אזור פרויקט",
    "bufferDistanceLabel": "מרחק חיץ",
    "roundCostValues": {
      "twoDecimalPoint": "שתי נקודות עשרוניות",
      "nearestWholeNumber": "המספר השלם הקרוב ביותר",
      "nearestTen": "כפולה קרובה ביותר של עשר",
      "nearestHundred": "כפולה קרובה ביותר של מאה",
      "nearestThousand": "כפולה קרובה ביותר של אלף",
      "nearestTenThousands": "כפולה קרובה ביותר של עשרת אלפים"
    },
    "projectAreaType": {
      "outline": "קו מתאר",
      "buffer": "חיץ"
    },
    "errorMessages": {
      "currency": "יחידת מטבע לא חוקית",
      "bufferDistance": "מרחק חיץ לא חוקי",
      "outOfRangebufferDistance": "הערך צריך להיות גדול מ-0 וקטן או שווה ל-100"
    }
  },
  "projectSettings": {
    "tabTitle": "הגדרות פרויקט",
    "costingGeometrySectionTitle": "הגדר גיאוגרפיה לתמחור (אופציונלי)",
    "costingGeometrySectionNote": "הערה: הגדרת שכבה זו תאפשר למשתמש להגדיר משוואות עלות של תבניות ישות על סמך גיאוגרפיות.",
    "projectTableSectionTitle": "יכולת לשמור/לטעון הגדרות פרויקט (אופציונלי)",
    "projectTableSectionNote": "הערה: הגדרת כל הטבלאות והשכבות תאפשר למשתמש לשמור/לטעון את הפרויקט לשימוש עתידי.",
    "costingGeometryLayerLabel": "שכבה של גיאומטריית תמחור",
    "fieldLabelGeography": "שדה להגדרת תווית גיאוגרפיה",
    "projectAssetsTableLabel": "טבלת נכסי פרויקט",
    "projectMultiplierTableLabel": "טבלת עלויות נוספות של מכפיל בפרויקט",
    "projectLayerLabel": "שכבת פרויקט",
    "configureFieldsLabel": "הגדר שדות",
    "fieldDescriptionHeaderTitle": "תיאור שדה",
    "layerFieldsHeaderTitle": "שדה שכבה",
    "selectLabel": "בחר",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName}‎ כבר נבחר",
      "invalidConfiguration": "בחר ${fieldsString}‎"
    },
    "costingGeometryHelp": "<p>יוצגו שכבות פוליגון העומדות בתנאים הבאים: <br/> <li>\tהשכבה חייבת לכלול יכולת לבצע â€œשאילתותâ€</li><li>\tלשכבה חייב להיות שדה GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>המחרוזת והשדות המספריים של â€œשכבת גיאומטריית התמחורâ€ שנבחרה יוצגו בתפריט הנפתח â€œשדה להגדרת תווית גיאוגרפיהâ€.</p>",
    "projectAssetsTableHelp": "<p>יוצגו טבלאות העומדות בתנאים הבאים: <br/> <li>הטבלה חייבת להכיל יכולות עריכה, כלומר â€œיצירהâ€, â€œמחיקהâ€ וâ€œעדכוןâ€</li>    <li>הטבלה חייבת להכיל שישה שדות עם השמות וסוגי הנתונים הבאים:</li><ul><li>\tAssetGUID (שדה מסוג GUID)</li><li>\tCostEquation (שדה מסוג מחרוזת)</li><li>\tתרחיש (שדה מסוג מחרוזת)</li><li>\tTemplateName (שדה מסוג מחרוזת)</li><li>    GeographyGUID (שדה מסוג GUID)</li><li>\tProjectGUID (שדה מסוג GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>יוצגו טבלאות העומדות בתנאים הבאים: <br/> <li>הטבלה חייבת להכיל יכולות עריכה, כלומר â€œיצירהâ€, â€œמחיקהâ€ וâ€œעדכוןâ€</li>    <li>הטבלה חייבת להכיל שישה שדות עם השמות וסוגי הנתונים הבאים:</li><ul><li>\tתיאור (שדה מסוג מחרוזת)</li><li>\tסוג (שדה מסוג מחרוזת)</li><li>\tערך (שדה מסוג צף/כפול)</li><li>\tCostindex (שדה מסוג מספר שלם)</li><li>   \tProjectGUID (שדה מסוג GUID)</li></ul> </p>",
    "projectLayerHelp": "<p>יוצגו שכבות פוליגון העומדות בתנאים הבאים: <br/> <li>השכבה חייבת להכיל יכולות עריכה, כלומר â€œיצירהâ€, â€œמחיקהâ€ וâ€œעדכוןâ€</li>    <li>השכבה חייבת להכיל שישה שדות עם השמות וסוגי הנתונים הבאים:</li><ul><li>\tProjectName (שדה מסוג מחרוזת)</li><li>תיאור (שדה מסוג מחרוזת)</li><li>Totalassetcost (שדה מסוג צף/כפול)</li><li>Grossprojectcost (שדה מסוג צף/כפול)</li><li>GlobalID (שדה מסוג GlobalID)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "הגדרות שכבה",
    "layerNameHeaderTitle": "שם שכבה",
    "layerNameHeaderTooltip": "רשימת השכבות במפה",
    "EditableLayerHeaderTitle": "ניתן לעריכה",
    "EditableLayerHeaderTooltip": "כלול שכבה ואת התבניות שלה בווידג'ט התמחור",
    "SelectableLayerHeaderTitle": "ניתן לבחור",
    "SelectableLayerHeaderTooltip": "ניתן להשתמש בגיאומטריה מהישות ליצירת פריט עלות חדש",
    "fieldPickerHeaderTitle": "מזהה פרויקט (אופציונלי)",
    "fieldPickerHeaderTooltip": "שדה אופציונלי (מסוג מחרוזת) לאחסון מזהה הפרויקט",
    "selectLabel": "בחר",
    "noAssetLayersAvailable": "לא נמצאו שכבות נכסים ב-Webmap שנבחר",
    "disableEditableCheckboxTooltip": "שכבה זו לא מכילה יכולות עריכה",
    "missingCapabilitiesMsg": "בשכבה זו חסרות היכולות הבאות:",
    "missingGlobalIdMsg": "שכבה זו לא מכילה שדה GlobalId",
    "create": "צור",
    "update": "עדכון",
    "delete": "מחיקה"
  },
  "costingInfo": {
    "tabTitle": "פרטי תמחור",
    "proposedMainsLabel": "ראשיים מוצעים",
    "addCostingTemplateLabel": "הוסף תבנית תמחור",
    "manageScenariosTitle": "ניהול תרחישים",
    "featureTemplateTitle": "תבניות ישויות",
    "costEquationTitle": "משוואת עלות",
    "geographyTitle": "גיאוגרפיה",
    "scenarioTitle": "תרחיש",
    "actionTitle": "פעולות",
    "scenarioNameLabel": "שם תרחיש",
    "addBtnLabel": "הוספה",
    "srNoLabel": "מס'",
    "deleteLabel": "מחיקה",
    "duplicateScenarioName": "שם תרחיש כפול",
    "hintText": "<div>רמז: השתמש במילות המפתח הבאות</div><ul><li><b>{TOTALCOUNT}</b>: שימוש במספר הכולל של נכסים מאותו סוג בגיאוגרפיה</li><li><b>{MEASURE}</b>: שימוש באורך עבור נכס הקו ובשטח עבור נכס הפוליגון</li><li><b>{TOTALMEASURE}</b>: שימוש באורך הכולל עבור נכס הקו ובשטח הכולל עבור נכס הפוליגון מאותו סוג בגיאוגרפיה</li></ul>ניתן להשתמש בפונקציות כגון:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>ערוך את משוואת העלות בהתאם לצורכי הפרויקט שלך.",
    "noneValue": "ללא",
    "requiredCostEquation": "משוואת עלות לא חוקית עבור ‎${layerName} : ${templateName}",
    "duplicateTemplateMessage": "קיים ערך תבנית כפול עבור ‎${layerName} : ${templateName}",
    "defaultEquationRequired": "נדרשת משוואת ברירת מחדל עבור ‎${layerName} : ${templateName}",
    "validCostEquationMessage": "הזן משוואת עלות חוקית",
    "costEquationHelpText": "ערוך את משוואת העלות בהתאם לצורכי הפרויקט שלך",
    "scenarioHelpText": "בחר תרחיש בהתאם לצורכי הפרויקט שלך",
    "copyRowTitle": "העתק שורה",
    "noTemplateAvailable": "הוסף תבנית אחת לפחות עבור ‎${layerName}‎",
    "manageScenarioLabel": "ניהול תרחיש",
    "noLayerMessage": "הזן שכבה אחת לפחות ב-‎${tabName}‎",
    "noEditableLayersAvailable": "יש לסמן את השכבות כניתנות לעריכה בכרטיסיית הגדרות השכבות"
  },
  "statisticsSettings": {
    "tabTitle": "הגדרות סטטיסטיקה",
    "addStatisticsLabel": "הוסף נתונים סטטיסטיים",
    "fieldNameTitle": "שדה",
    "statisticsTitle": "תווית",
    "addNewStatisticsText": "הוסף נתונים סטטיסטיים חדשים",
    "deleteStatisticsText": "מחק נתונים סטטיסטיים",
    "moveStatisticsUpText": "העבר נתונים סטטיסטיים למעלה",
    "moveStatisticsDownText": "העבר נתונים סטטיסטיים למטה",
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
  }
});