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
      "displayText": "מיילים",
      "acronym": "מיילים"
    },
    "kilometers": {
      "displayText": "קילומטרים",
      "acronym": "ק\"מ"
    },
    "feet": {
      "displayText": "רגל",
      "acronym": "רגל"
    },
    "meters": {
      "displayText": "מטרים",
      "acronym": "מ'"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "חפש הגדרות מקור",
    "searchSourceSettingTitle": "חפש הגדרות מקור",
    "searchSourceSettingTitleHintText": "הוסף והגדר שירותי עיגון כתובות או שכבות ישויות כמקורות חיפוש. מקורות אלה שמצוינים קובעים מה ניתן לחיפוש בתוך תיבת החיפוש",
    "addSearchSourceLabel": "הוסף מקור חיפוש",
    "featureLayerLabel": "שכבת ישות",
    "geocoderLabel": "מעגן כתובות",
    "nameTitle": "שם",
    "generalSettingLabel": "הגדרה כללית",
    "allPlaceholderLabel": "טקסט Placeholder לחיפוש מלא:",
    "allPlaceholderHintText": "רמז: הקלד טקסט שיוצג כממלא מקום בעת חיפוש בכל השכבות ומעגן הכתובות",
    "generalSettingCheckboxLabel": "הצג חלון קופץ עבור הישות או המיקום שנמצאו",
    "countryCode": "קוד/ים של ארצות או אזורים",
    "countryCodeEg": "לדוגמה ",
    "countryCodeHint": "השארת הערך הזה ריק תפעיל חיפוש בכל הארצות והאזורים",
    "questionMark": "?",
    "searchInCurrentMapExtent": "חפש רק בתיחום המפה הנוכחי",
    "zoomScale": "קנה מידה להתמקדות",
    "locatorUrl": "URL של מעגן הכתובות",
    "locatorName": "שם מעגן הכתובות",
    "locatorExample": "דוגמה",
    "locatorWarning": "גרסה זו של שירות עיגון הכתובות אינה נתמכת. הווידג'ט תומך בשירות עיגון הכתובות בגרסה 10.0 ואילך.",
    "locatorTips": "אין הצעות זמינות מפני ששירות עיגון הכתובות אינו תומך ביכולת הצעה.",
    "layerSource": "מקור שכבה",
    "setLayerSource": "הגדר מקור שכבה",
    "setGeocoderURL": "הגדר URL של מעגן הכתובות",
    "searchLayerTips": "אין הצעות זמינות מפני ששירות התמיכה אינו תומך ביכולת עימוד.",
    "placeholder": "טקסט מציין מיקום (Placeholder)",
    "searchFields": "שדות חיפוש",
    "displayField": "שדה תצוגה",
    "exactMatch": "התאמה מדויקת",
    "maxSuggestions": "מקסימום הצעות",
    "maxResults": "מקסימום תוצאות",
    "enableLocalSearch": "הפעל חיפוש מקומי",
    "minScale": "קנ\"מ מינימלי",
    "minScaleHint": "כאשר קנה המידה גדול יותר מקנה מידה זה, החיפוש המקומי יבוצע",
    "radius": "רדיוס",
    "radiusHint": "מציין את רדיוס האזור מסביב למרכז המפה הנוכחית שמשמש להגדלת הדירוג של מועמדים לעיגון כתובות, כך שהמועמדים הקרובים ביותר למיקום יוחזרו ראשונים.",
    "meters": "מטרים",
    "setSearchFields": "הגדר שדות חיפוש",
    "set": "הגדר",
    "fieldName": "שם",
    "invalidUrlTip": "ה-URL ‏${URL} שגוי או אינו נגיש."
  },
  "searchSetting": {
    "searchSettingTabTitle": "הגדרות חיפוש",
    "defaultBufferDistanceLabel": "הגדר ברירת מחדל של מרחק חיץ",
    "maxResultCountLabel": "הגבל את מספר התוצאות",
    "maxResultCountHintLabel": "רמז: קבע את המספר המרבי של תוצאות נראות. הערך של 1 יחזיר את הישות הקרובה ביותר",
    "maxBufferDistanceLabel": "הגדר מרחק חיץ מקסימלי",
    "bufferDistanceUnitLabel": "יחידות מרחק חיץ",
    "defaultBufferHintLabel": "רמז: הגדר ערך ברירת מחדל עבור מחוון החיץ",
    "maxBufferHintLabel": "רמז: הגדר ערך מקסימום עבור מחוון החיץ",
    "bufferUnitLabel": "רמז: הגדר יחידה ליצירת אזור חיץ",
    "selectGraphicLocationSymbol": "סמל כתובת או מיקום",
    "graphicLocationSymbolHintText": "רמז: סמל עבור כתובת שחיפשת או מיקום שלחצת עליו",
    "addressLocationPolygonHintText": "רמז: סמל עבור שכבת פוליגון שנערך בה חיפוש",
    "popupTitleForPolygon": "בחר פוליגון עבור מיקום כתובת שנבחר",
    "popupTitleForPolyline": "בחר קו עבור מיקום כתובת",
    "addressLocationPolylineHintText": "רמז: סמל עבור שכבת קו שנערך בה חיפוש",
    "fontColorLabel": "בחר צבע גופן עבור תוצאות החיפוש",
    "fontColorHintText": "רמז: צבע גופן של תוצאות החיפוש",
    "zoomToSelectedFeature": "התמקד לישות שנבחרה",
    "zoomToSelectedFeatureHintText": "רמז: התמקד לישות שנבחרה במקום לחיץ",
    "intersectSearchLocation": "החזר פוליגונים מצטלבים",
    "intersectSearchLocationHintText": "רמז: החזר פוליגונים שמכילים את המיקום שבו נערך החיפוש במקום פוליגונים בתוך החיץ",
    "enableProximitySearch": "הפעל חיפוש באזור הסמוך",
    "enableProximitySearchHintText": "רמז: הפעל את היכולת לחפש מיקומים שנמצאים באזור הסמוך לתוצאה שבחרת",
    "bufferVisibilityLabel": "הגדר ניראות של חיץ",
    "bufferVisibilityHintText": "רמז: החיץ יוצג על המפה",
    "bufferColorLabel": "הגדר סמל חיץ",
    "bufferColorHintText": "רמז: בחר צבע ושקיפות עבור החיץ",
    "searchLayerResultLabel": "צייר רק את תוצאות השכבה שנבחרה",
    "searchLayerResultHint": "רמז: רק השכבה שנבחרה בתוצאות החיפוש תצויר על המפה",
    "showToolToSelectLabel": "הגדר לחצן מיקום",
    "showToolToSelectHintText": "רמז: מספק לחצן כדי להגדיר מיקום במפה במקום להגדיר תמיד את המיקום כאשר מתבצעת לחיצה על המפה",
    "geoDesicParamLabel": "השתמש בחיץ גיאודזי",
    "geoDesicParamHintText": "רמז: השתמש בחיץ גיאודזי במקום בחיץ אקלידיאני (מישורי)"
  },
  "layerSelector": {
    "selectLayerLabel": "בחר שכבות חיפוש",
    "layerSelectionHint": "רמז: השתמש בלחצן ההגדרה לבחירת שכבות",
    "addLayerButton": "הגדר"
  },
  "routeSetting": {
    "routeSettingTabTitle": "הגדרות הוראות נסיעה",
    "routeServiceUrl": "שירות מסלול",
    "buttonSet": "הגדר",
    "routeServiceUrlHintText": "רמז: לחץ על 'הגדר' כדי לנווט לשירות מסלול ולבחור אותו",
    "directionLengthUnit": "יחידות אורך של הוראות נסיעה",
    "unitsForRouteHintText": "רמז: משמש להצגת יחידות עבור מסלול",
    "selectRouteSymbol": "בחר סמל להצגת מסלול",
    "routeSymbolHintText": "רמז: משמש להצגת סמל קווי של המסלול",
    "routingDisabledMsg": "כדי לאפשר הוראות נסיעה, ודא שניתוב מופעל בפריט בהגדרות האפליקציה."
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "הגדרות סימבולוגיה",
    "addSymbologyBtnLabel": "הוסף סמלים חדשים",
    "layerNameTitle": "שם שכבה",
    "fieldTitle": "שדה",
    "valuesTitle": "ערכים",
    "symbolTitle": "סמל",
    "actionsTitle": "פעולות",
    "invalidConfigMsg": "שדה כפול : ${fieldName} עבור שכבה : ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "הגדרות סינון",
    "addTaskTip": "הוסף מסנן אחד או יותר לשכבות החיפוש שנבחרו והגדר פרמטרים לכל מסנן.",
    "enableMapFilter": "הסר מהמפה את פילטר השכבות שהוגדר מראש.",
    "newFilter": "סינון חדש",
    "filterExpression": "ביטוי סינון",
    "layerDefaultSymbolTip": "השתמש בסימול ברירת המחדל של השכבה",
    "uploadImage": "טען תמונה",
    "selectLayerTip": "בחר שכבה.",
    "setTitleTip": "הגדר כותרת.",
    "noTasksTip": "לא הוגדרו מסננים. לחץ על \"${newFilter}\" להוספת מסנן חדש.",
    "collapseFiltersTip": "כווץ את ביטויי המסנן (אם קיימים) כאשר הווידג'ט פתוח",
    "groupFiltersTip": "קבץ מסננים לפי שכבה"
  },
  "networkServiceChooser": {
    "arcgislabel": "הוסף מ-ArcGIS Online",
    "serviceURLabel": "הוסף כתובת URL של שירות",
    "routeURL": "URL של המסלול",
    "validateRouteURL": "אמת",
    "exampleText": "דוגמה",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "ציין שירות מסלול חוקי.",
    "rateLimitExceeded": "עברת את מגבלת השיעור. נסה שוב מאוחר יותר.",
    "errorInvokingService": "שם משתמש או סיסמה שגויים."
  },
  "errorStrings": {
    "bufferErrorString": "הזן ערך מספרי חוקי.",
    "selectLayerErrorString": "בחר שכבה/ות לחיפוש.",
    "invalidDefaultValue": "מרחק החיץ המוגדר כברירת מחדל לא יכול להיות ריק. ציין את מרחק החיץ",
    "invalidMaximumValue": "מרחק החיץ המקסימלי לא יכול להיות ריק. ציין את מרחק החיץ",
    "defaultValueLessThanMax": "ציין את מרחק החיץ המוגדר כברירת מחדל בטווח האפשרי עד לגבול המקסימלי",
    "defaultBufferValueGreaterThanOne": "מרחק חיץ ברירת מחדל לא יכול להיות פחות מ-0",
    "maximumBufferValueGreaterThanOne": "ציין את מרחק החיץ המקסימלי כשהוא גדול מ-0",
    "invalidMaximumResultCountValue": "ציין ערך חוקי ספציפי עבור ספירת התוצאה המקסימלית",
    "invalidSearchSources": "הגדרות חיפוש מקור לא חוקיות"
  },
  "symbolPickerPreviewText": "תצוגה מקדימה:"
});