/*
// Copyright © 2014 - 2018 Esri. All rights reserved.

TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
Unpublished material - all rights reserved under the
Copyright Laws of the United States and applicable international
laws, treaties, and conventions.

For additional information, contact:
Attn: Contracts and Legal Department
Environmental Systems Research Institute, Inc.
380 New York Street
Redlands, California, 92373
USA

email: contracts@esri.com
*/

define([
  'dojo/_base/lang',
  'dojo/_base/array',
  'jimu/utils'
], function(lang, array, jimuUtils) {

  var mo = {};

  mo.getFieldInfosFromWebmap = function(layerId, jimuLayerInfos) {
    // summary:
    //   get fieldInfos from web map.
    // description:
    //   return null if fieldInfos has not been configured.
    var fieldInfos = null;
    var jimuLayerInfo = jimuLayerInfos.getLayerInfoByTopLayerId(layerId);
    if(jimuLayerInfo) {
      var popupInfo = jimuLayerInfo.getPopupInfo();
      if(popupInfo && popupInfo.fieldInfos) {
        fieldInfos = lang.clone(popupInfo.fieldInfos);
      }
    }

    if(fieldInfos) {
      array.forEach(fieldInfos, function(fieldInfo) {
        if(fieldInfo.format &&
          fieldInfo.format.dateFormat &&
          fieldInfo.format.dateFormat.toLowerCase() &&
          fieldInfo.format.dateFormat.toLowerCase().indexOf('time') >= 0
          ) {
          fieldInfo.format.time = true;
        }
      });
    }

    return fieldInfos;
  };

  mo.getLocaleDateTime = function(dateString) {
    var dateObj = new Date(dateString);
    return jimuUtils.localizeDate(dateObj, {
      fullYear: true,
      //selector: 'date',
      formatLength: 'medium'
    });
  };

  mo.getAttrByFieldKey = function(feature, fieldKey) {
    return _ignoreCaseToGetOrUpdateAttrByFieldKey(feature, fieldKey);
  };

  mo.setAttrByFieldKey = function(feature, fieldKey, fieldValue) {
    return _ignoreCaseToGetOrUpdateAttrByFieldKey(feature, fieldKey, fieldValue);
  };

  mo.ignoreCaseToGetFieldKey = function(layerObject, fieldKey) {
    var result = null;
    var fieldObject = _ignoreCaseToGetFieldObject(layerObject, fieldKey);
    if(fieldObject) {
      result = fieldObject.name;
    }
    return result;
  };

  mo.ignoreCaseToGetFieldObject = function(layerObject, fieldKey) {
    return _ignoreCaseToGetFieldObject(layerObject, fieldKey);
  };

  function _ignoreCaseToGetFieldObject(layerObject, fieldKey) {
    var result = null;
    /*
    for (child in feature.attributes) {
      if(feature.attributes.hasOwnProperty(child) &&
         (typeof feature.attributes[child] !== 'function')) {
        if(child.toLowerCase() === fieldKey.toLowerCase()) {
          result = child;
          break;
        }
      }
    }
    */
    if(layerObject && layerObject.fields) {
      array.some(layerObject.fields, function(field) {
        if(field.name.toLowerCase() === fieldKey.toLowerCase()) {
          result = field;
          return true;
        }
      });
    }
    return result;
  }

  function _ignoreCaseToGetOrUpdateAttrByFieldKey(feature, fieldKey, fieldValue) {
    var result = null;
    if(feature && feature.attributes) {
      for (var child in feature.attributes) {
        if(feature.attributes.hasOwnProperty(child) &&
           (typeof feature.attributes[child] !== 'function')) {
          if(child.toLowerCase() === fieldKey.toLowerCase()) {
            if(fieldValue) {
              // set attr
              feature.attributes[child] = fieldValue;
              result = fieldValue;
              break;
            } else {
              // get attr
              result = feature.attributes[child];
              break;
            }
          }
        }
      }
    }
    return result;
  }

  return mo;
});
