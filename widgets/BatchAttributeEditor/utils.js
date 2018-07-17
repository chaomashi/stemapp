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
], function (lang, array, jimuUtils) {

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
      if (popupInfo && popupInfo.fieldInfos) {
        fieldInfos = lang.clone(popupInfo.fieldInfos);
        if (jimuLayerInfo.layerObject) {
          array.forEach(fieldInfos, function (fieldInfo) {
            array.some(jimuLayerInfo.layerObject.fields, function (field) {
              if (fieldInfo.fieldName === field.name) {
                fieldInfo.type = field.type;
                return true;
              }
            });
          });
        }
      } else {
        fieldInfos = [];
        if (jimuLayerInfo && jimuLayerInfo.layerObject) {
          array.forEach(jimuLayerInfo.layerObject.fields, function (field) {
            var fieldInfo = jimuUtils.getDefaultPortalFieldInfo(field);
            fieldInfo.type = field.type;
            fieldInfo.visible = true;
            fieldInfo.isEditable = true;

            fieldInfos.push(fieldInfo);
          });
        }
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

  return mo;
});
