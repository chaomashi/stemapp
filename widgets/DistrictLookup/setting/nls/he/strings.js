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
    "miles": "מיילים",
    "kilometers": "קילומטרים",
    "feet": "רגל",
    "meters": "מטרים"
  },
  "layerSetting": {
    "layerSettingTabTitle": "הגדרות חיפוש",
    "buttonSet": "הגדר",
    "selectLayersLabel": "בחר שכבה",
    "selectLayersHintText": "רמז: משמש לבחירת שכבת פוליגונים ושכבת הנקודות המקושרת אליה.",
    "selectPrecinctSymbolLabel": "בחר סמל להדגשת פוליגון",
    "selectGraphicLocationSymbol": "סמל כתובת או מיקום",
    "graphicLocationSymbolHintText": "רמז: סמל עבור כתובת שחיפשת או מיקום שלחצת עליו",
    "precinctSymbolHintText": "רמז: משמש להצגת סמל עבור פוליגון שנבחר",
    "selectColorForPoint": "בחר צבע להדגשת נקודה",
    "selectColorForPointHintText": "רמז: משמש להצגת צבע הדגשה עבור נקודה שנבחרה"
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
    "allPlaceholderLabel": "טקסט מציין מיקום לחיפוש מלא:",
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
    "invalidUrlTip": "ה-URL ‏${URL} שגוי או אינו נגיש.",
    "invalidSearchSources": "הגדרות חיפוש מקור לא חוקיות"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "בחר שכבת פוליגונים",
    "selectPolygonLayerHintText": "רמז: משמש לבחירת שכבת פוליגונים.",
    "selectRelatedPointLayerLabel": "בחר שכבת נקודות מקושרת לשכבת הפוליגונים",
    "selectRelatedPointLayerHintText": "רמז: משמש לבחירת שכבת נקודות מקושרת לשכבת הפוליגונים",
    "polygonLayerNotHavingRelatedLayer": "בחר שכבת פוליגונים שיש לה שכבת נקודות מקושרת.",
    "errorInSelectingPolygonLayer": "בחר שכבת פוליגונים שיש לה שכבת נקודות מקושרת.",
    "errorInSelectingRelatedLayer": "בחר שכבת נקודות מקושרת לשכבת הפוליגונים."
  },
  "routeSetting": {
    "routeSettingTabTitle": "הגדרות הוראות נסיעה",
    "routeServiceUrl": "שירות מסלול",
    "buttonSet": "הגדר",
    "routeServiceUrlHintText": "רמז: לחץ על 'הגדר' כדי לנתב לשירות מסלול של ניתוח רשת ולבחור אותו",
    "directionLengthUnit": "יחידות אורך של הוראות נסיעה",
    "unitsForRouteHintText": "רמז: משמש להצגת יחידות מדווחות עבור מסלול",
    "selectRouteSymbol": "בחר סמל להצגת מסלול",
    "routeSymbolHintText": "רמז: משמש להצגת סמל קווי של המסלול",
    "routingDisabledMsg": "כדי לאפשר הוראות נסיעה, ודא שניתוב מאופשר בפריט ה- ArcGIS Online."
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
  "symbolPickerPreviewText": "תצוגה מקדימה:",
  "showToolToSelectLabel": "הגדר לחצן מיקום",
  "showToolToSelectHintText": "רמז: מספק לחצן כדי להגדיר מיקום במפה במקום להגדיר תמיד את המיקום כאשר מתבצעת לחיצה על המפה"
});