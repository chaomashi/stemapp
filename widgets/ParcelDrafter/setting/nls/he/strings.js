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
  "setBtnLabel": "הגדר",
  "selectLabel": "בחר",
  "selectLayerLabel": "בחר שכבות חלקות",
  "selectLayerHintText": "רמז: השתמש בלחצן ההגדרה כדי לבחור פוליגון חלקות ואת שכבת הקו הקשורה אליו",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "לשכבת הפוליגון שנבחרה אין שכבה קשורה חוקית."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "בחר שכבת קו קשורה",
    "layerSettingTabLabel": "שכבות חלקות",
    "advancedSettingTabLabel": "הגדרות מתקדמות",
    "selectLayerHintText": "רמז: השתמש כדי לאחסן ערכי COGO בשכבת קו חלקות",
    "selectFieldLegendLabel": "בחר שדות כדי לאחסן ערכי COGO בשכבת קו חלקות",
    "bearingFieldLabel": "כיוון",
    "chordLengthFieldLabel": "אורך מיתר",
    "distanceFieldLabel": "מרחק",
    "sequenceIdFieldLabel": "זיהוי רצף",
    "radiusFieldLabel": "רדיוס",
    "foreignKeyFieldLabel": "מפתח זר",
    "arcLengthFieldLabel": "אורך קשת",
    "lineTypeFieldLabel": "סוג קו",
    "parcelPointSymbolLabel": "סמל של נקודת חלקות",
    "parcelPointSymbolHintText": "רמז: משמש להצגת סמל נקודה עבור מקור הקו.",
    "symbolPickerPreviewText": "תצוגה מקדימה",
    "selectLineLayerLabel": "בחר שכבת קו"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "בחר שכבת פוליגונים",
    "selectPolygonLayerHintText": "רמז: השתמש בשכבת הפוליגון של החלקות שנבחרה",
    "selectFieldLegendLabel": "בחר שדות כדי לאחסן מאפיינים של פוליגון חלקות",
    "parcelNameLabel": "שם חלקות",
    "rotationLabel": "סיבוב",
    "planNameLabel": "שם תוכנית",
    "scalingLabel": "התאמת קנה מידה",
    "documentTypeLabel": "סוג מסמך",
    "miscloseRatioLabel": "יחס אי סגירה",
    "statedAreaLabel": "אזור מצוין",
    "miscloseDistanceLabel": "מרחק אי סגירה",
    "selectPolygonLayerLabelPopUp": "בחר שכבת פוליגון"
  },
  "lineTypesTable": {
    "lineTypeLabel": "סוג קו",
    "valueLabel": "ערך",
    "symbolLabel": "סמל",
    "connectionLineLabel": "קו חיבור",
    "boundaryLineLabel": "קו גבול"
  },
  "closureSetting": {
    "snappingLayerLabel": "שכבות הצמדה",
    "snappingBtnLabel": "הגדר",
    "snappingLayerHintText": "רמז: בחר שכבות שאליהן ייצמדו קווי החלקות.",
    "miscloseDistanceLabel": "מרחק אי סגירה",
    "miscloseDistanceHintText": "רמז: ציין מרחק אי סגירה ואת היחידות שלו.",
    "miscloseRatioLabel": "יחס אי סגירה",
    "miscloseRatioHintText": "רמז: ציין יחס אי סגירה.",
    "snappingToleranceLabel": "טולרנס הצמדה",
    "pixelLabel": "פיקסלים",
    "snappingToleranceHintText": "רמז: ציין טולרנס הצמדה.",
    "selectLayerLabel": "בחר שכבה"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "שדה כיוון לא חוקי",
    "chordLengthErrMsg": "ChordLength לא חוקי",
    "distanceFieldErrMsg": "מרחק שגוי",
    "sequenceIdFieldErrMsg": "sequenceId לא חוקי",
    "radiusFieldErrMsg": "רדיוס לא חוקי",
    "foreignKeyFieldErrMsg": "מפתח זר לא חוקי",
    "arcLengthFieldErrMsg": "אורך קשת לא חוקי",
    "lineTypeFieldErrMsg": "סוג קו לא חוקי",
    "parcelNameFieldErrMsg": "שדה שם חלקות לא חוקי",
    "planNameFieldErrMsg": "שדה שם תוכנית לא חוקי",
    "scaleFieldErrMsg": "שדה קנה מידה לא חוקי",
    "documentTypeFieldErrMsg": "שדה סוג מסמך לא חוקי",
    "miscloseRatioFieldErrMsg": "שדה יחס אי סגירה לא חוקי",
    "statedAreaFieldErrMsg": "שדה אזור מצוין לא חוקי",
    "miscloseDistanceFieldErrMsg": "שדה מרחק אי סגירה לא חוקי",
    "globalIdFieldErrMsg": "לשכבת הפוליגון שנבחרה אין שדה 'esriFieldTypeGlobalID' חוקי.",
    "invalidPolylineLayer": "בחר שכבת קו חלקות חוקית",
    "invalidPolygonLayer": "בחר שכבת פוליגון חלקות חוקית",
    "invalidMiscloseDistance": "הזן מרחק אי סגירה חוקי",
    "invalidSnappingTolerance": "הזן טולרנס הצמדה חוקי",
    "invalidMiscloseRatio": "הזן יחס אי סגירה חוקי",
    "selectDistinctLineTypes": "בחר ערך ייחודי בכל סוג קו",
    "invalidConnectionLineType": "ערך קו חיבור לא חוקי",
    "invalidBoundaryLineType": "ערך קו גבול לא חוקי",
    "selectDistinctPolylineFields": "בחר שדה ייחודי עבור כל ערך COGO.",
    "selectDistinctPolygonFields": "בחר שדה ייחודי עבור כל מאפיין פוליגון חלקות."
  }
});