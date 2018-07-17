///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/lang',
  'dojo/_base/array'
], function(lang, array) {
  var mo = {};

  mo.isValid = function(layerObjects, toolConfig, privilegeUtil){
    var isValid = false;
    if(toolConfig.dijitID.indexOf('MergeLayers') !== -1){
      isValid = this.mergeAvailable(layerObjects);
    }else if(toolConfig.dijitID.indexOf('ExtractData') !== -1){
      isValid = this.extractAvailable(layerObjects, privilegeUtil);
    }else{
      var requiredParam = null;
      if('requiredParam' in toolConfig){
        requiredParam = toolConfig.requiredParam;
      }
      isValid = this.paramAvailable(layerObjects, toolConfig.analysisLayer, requiredParam);
    }
    return isValid;
  };

  mo.mergeAvailable = function(layerObjects){
    //check if there are two layers with the same geometry type
    return array.some(layerObjects, function(layerA){
      return array.some(layerObjects, function(layerB){
        return (layerB !== layerA && layerB.geometryType === layerA.geometryType);
      });
    });
  };

  mo.extractAvailable = function(layerObjects, privilegeUtil){
    //check if there is a layer having Extract capability
    //capabilities is a string, like "Create, Delete, Query, Extract"
    var user = privilegeUtil.getUser();
    var isPortal = privilegeUtil.isPortal();

    array.forEach(layerObjects, function(layerObject){
      var isGeoRSS = (layerObject.declaredClass === 'esri.layers.GeoRSSLayer');
      var isCSV = (layerObject.declaredClass === 'esri.layers.CSVLayer');
      var isFeatureLayer = layerObject.declaredClass === 'esri.layers.FeatureLayer';
      var isWFSLayer = layerObject.declaredClass === 'esri.layers.WFSLayer';
      var isFeatCol = isFeatureLayer && !layerObject.url;

      if(isFeatCol || isGeoRSS || isCSV || isWFSLayer){
        this._addExtractCapability(layerObject);
      }else if(isFeatureLayer) {
        if(privilegeUtil.isAdmin() && ((isPortal && layerObject.itemInfo &&
          layerObject.itemInfo.itemControl && layerObject.itemInfo.itemControl === 'admin') ||
          (!isPortal && layerObject.url && layerObject.url.indexOf('/' + user.orgId + '/') > -1))) {
          this._addExtractCapability(layerObject);
        }else if(user && layerObject.itemInfo && layerObject.itemInfo.owner &&
          layerObject.itemInfo.owner === user.username &&
          ((!isPortal && layerObject.url && layerObject.url.indexOf('/' + user.orgId + '/') > -1) ||
          isPortal)) {
          this._addExtractCapability(layerObject);
        }
      }
    }, this);

    return array.some(layerObjects, function(layerObject) {
      return layerObject.capabilities && layerObject.capabilities.indexOf('Extract') >= 0;
    });
  };

  mo._addExtractCapability = function(layerObject){
    if(layerObject.capabilities) {
      if(layerObject.capabilities.indexOf('Extract') === -1) {
        layerObject.capabilities = layerObject.capabilities + ',Extract';
      }
    }else {
      layerObject.capabilities = 'Extract';
    }
    return true;
  };

  mo.paramAvailable = function(layerObjects, analysisLayer, requiredParam){
    var firstGroup, geomTypes, result = false;
    //check analysis layer parameter
    geomTypes = analysisLayer.geomTypes;
    firstGroup = this.findMatchedFeatureLayers(layerObjects, geomTypes);
    if(firstGroup.length > 0) {
      if(requiredParam){
        //check required layer parameters
        geomTypes = requiredParam.geomTypes;
        var secondGroup = this.findMatchedFeatureLayers(layerObjects, geomTypes);

        if(secondGroup.length > 0) {
          // check whether firstGroup and secondGroup can pick up two different layers
          if(firstGroup.length !== secondGroup.length) {
            result = true;
          } else if(firstGroup.length > 1) {
            // length of two groups are equal
            result = true;
          } else if(firstGroup[0] !== secondGroup[0]) {
            // length of two groups equal to 1
            result = true;
          }
        }
      } else {
        result = true;
      }
    }

    return result;
  };

  mo.findMatchedFeatureLayers = function(layerObjects, geomTypes){
    var matchedLayerId = [];
    array.forEach(layerObjects, lang.hitch(this, function(layerObject){
      if(layerObject){
        if(geomTypes.length === 1){
          if(geomTypes[0] === '*' || geomTypes[0] === layerObject.geometryType){
            matchedLayerId.push(layerObject.id);
          }
        }else if(geomTypes.indexOf(layerObject.geometryType) > -1){
          matchedLayerId.push(layerObject.id);
        }
      }
    }));
    return matchedLayerId;
  };
  //----------------------end--------------------------//
  return mo;
});
