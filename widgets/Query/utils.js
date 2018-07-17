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
    'dojo/_base/array',
    'dojo/_base/Deferred',
    'jimu/utils',
    'jimu/portalUrlUtils',
    'jimu/LayerInfos/LayerInfos',
    'esri/request',
    'esri/kernel'
  ],
  function(lang, array, Deferred, jimuUtils, portalUrlUtils, LayerInfos, esriRequest, esriNs) {
    var mo = {
      getDefaultPopupInfo: function(layerDefinition, showShapeField, showFieldInfos) {
        var popupInfo = {
          title: '',
          fieldInfos: [],
          description: null,
          showAttachments: false,
          mediaInfos: []
        };

        showFieldInfos = !!showFieldInfos;

        if (layerDefinition.displayField) {
          var displayField = this._getRealFieldName(layerDefinition.displayField, layerDefinition);
          popupInfo.title = '{' + displayField + '}';
        }else{
          var objectIdField = jimuUtils.getObjectIdField(layerDefinition);
          if(objectIdField){
            popupInfo.title = '{' + objectIdField + '}';
          }
        }

        popupInfo.showAttachments = !!layerDefinition.hasAttachments;
        var allServiceFieldInfos = layerDefinition.fields;
        var filteredServiceFieldInfos = allServiceFieldInfos;
        if(!showShapeField){
          filteredServiceFieldInfos = array.filter(allServiceFieldInfos, lang.hitch(this, function(serviceFieldInfo){
            return serviceFieldInfo.type !== 'esriFieldTypeGeometry';
          }));
        }
        var portalFieldInfos = array.map(filteredServiceFieldInfos, lang.hitch(this, function(serviceFieldInfo){
          var portalFieldInfo = jimuUtils.getDefaultPortalFieldInfo(serviceFieldInfo);
          portalFieldInfo.visible = showFieldInfos;
          return portalFieldInfo;
        }));

        popupInfo.fieldInfos = portalFieldInfos;

        return popupInfo;
      },

      _getRealFieldName: function(fieldName, layerDefinition){
        fieldName = fieldName.toUpperCase();
        if(layerDefinition.fields && layerDefinition.fields.length > 0){
          for(var i = 0; i < layerDefinition.fields.length; i++){
            if(layerDefinition.fields[i].name.toUpperCase() === fieldName){
              return layerDefinition.fields[i].name;
            }
          }
        }
        return "";
      },

      getPortalFieldInfosWithoutShape: function(layerDefinition, portalFieldInfos){
        var result = array.filter(portalFieldInfos, lang.hitch(this, function(portalFieldInfo) {
          var serviceFieldInfo = jimuUtils.getFieldInfoByFieldName(layerDefinition.fields, portalFieldInfo.fieldName);
          if (serviceFieldInfo) {
            return serviceFieldInfo.type !== 'esriFieldTypeGeometry';
          } else {
            //such as relationships/0/OBJECTID
            return true;
          }
        }));
        return result;
      },

      getPopupInfoByAttributes: function(layerDefinition, attributes){
        /*jshint -W083 */
        var popupInfo = this.getDefaultPopupInfo(layerDefinition, false);
        var attributesFieldNames = [];
        var placesObj = {};//{fieldName:places,...}
        for(var fieldName in attributes){
          attributesFieldNames.push(fieldName);
          var serviceFieldInfo = jimuUtils.getFieldInfoByFieldName(layerDefinition.fields, fieldName);
          var type = serviceFieldInfo.type;
          if(type === 'esriFieldTypeSingle' || type === 'esriFieldTypeDouble'){
            var fieldValue = attributes[fieldName];
            if(fieldValue !== null && fieldValue !== undefined){
              fieldValue = parseFloat(fieldValue);
              if(!isNaN(fieldValue)){
                var str = fieldValue.toString();
                var splits = str.split('.');
                if(splits.length === 2){
                  var split = splits[1];
                  placesObj[fieldName] = split.length;
                }
              }
            }
          }
        }

        popupInfo.fieldInfos = array.filter(popupInfo.fieldInfos, lang.hitch(this, function(portalFieldInfo) {
          var fieldName = portalFieldInfo.fieldName;
          if (placesObj.hasOwnProperty(fieldName)) {
            portalFieldInfo.format.places = placesObj[fieldName];
          }
          return attributesFieldNames.indexOf(fieldName);
        }));

        return popupInfo;
      },

      upgradePopupToPopupInfo: function(layerDefinition, oldPopup){
        var popupInfo = this.getDefaultPopupInfo(layerDefinition, false, false);
        //old popup format
        /*{
          title: "${FID}",
          fields: [{
            name: "Pic_url",
            alias: "Pic_url",
            specialType: "image"
          }]
        }*/
        popupInfo.title = oldPopup.title || "";
        popupInfo.title = popupInfo.title.replace("${", "{");
        if (oldPopup.fields) {
          var oldPopupHash = {};
          array.forEach(oldPopup.fields, lang.hitch(this, function(item) {
            oldPopupHash[item.name] = item;
          }));
          array.forEach(popupInfo.fieldInfos, lang.hitch(this, function(portalFieldInfo) {
            var fieldName = portalFieldInfo.fieldName;
            var item = oldPopupHash[fieldName];
            if (item) {
              portalFieldInfo.label = item.alias || portalFieldInfo.label;
              portalFieldInfo.visible = true;
              if (item.specialType === "image") {
                // portalFieldInfo.shouldDelete = true;
                var url = "{" + fieldName + "}";
                var imageMediaInfo = {
                  title: "",
                  type: "image",
                  caption: portalFieldInfo.label,
                  value: {
                    sourceURL: url,
                    linkURL: url
                  }
                };
                popupInfo.mediaInfos.push(imageMediaInfo);
              }
            }
          }));
        }
        return popupInfo;
      },

      isImageServiceLayer: function(layerInfo) {
        return (layerInfo.url && layerInfo.url.indexOf('/ImageServer') > -1);
      },

      isTable: function(layerInfo){
        return layerInfo.type === 'Table';
      },

      getConfigWithValidDataSource: function(config){
        var validConfig = lang.clone(config);
        var layerInfosObj = LayerInfos.getInstanceSync();
        validConfig.queries = array.filter(validConfig.queries, lang.hitch(this, function(singleConfig){
          var layerId = singleConfig.webMapLayerId;
          if(layerId){
            var layerInfo = layerInfosObj.getLayerInfoById(layerId);
            if(layerInfo){
              return true;
            }else{
              var tableInfo = layerInfosObj.getTableInfoById(layerId);
              return !!tableInfo;
            }
            return !!layerInfo;
          }else{
            return true;
          }
        }));
        return validConfig;
      },

      removePopupInfoUnsupportFields: function(layerDefinition, popupInfo){
        //we should remove unsupported field names, such as: "relationships/0/OBJECTID"
        var validFieldNames = array.map(layerDefinition.fields, lang.hitch(this, function(fieldInfo){
          return fieldInfo.name;
        }));
        if(popupInfo.fieldInfos && popupInfo.fieldInfos.length > 0){
          popupInfo.fieldInfos = array.filter(popupInfo.fieldInfos, lang.hitch(this, function(portalFieldInfo){
            return validFieldNames.indexOf(portalFieldInfo.fieldName) >= 0;
          }));
        }
      },

      overridePopupTemplateMethodGetAttachments: function(popupTtemplate, serviceUrl, objectIdField) {
        //popupTtemplate is a instance of esri.dijit.PopupTemplate
        popupTtemplate.getAttachments = function(graphic) {
          //def must be a instance of dojo/_base/Deferred
          var def = new Deferred();
          try{
            var objectId = graphic.attributes[objectIdField];
            var url = serviceUrl + "/" + objectId + "/attachments";
            var args = {
              url: url,
              content: {
                f: 'json'
              },
              callbackParamName: "callback"
            };

            var withToken = "";
            var credential = esriNs.id.findCredential(serviceUrl);

            if(credential && credential.token){
              withToken = "?token=" + credential.token;
            }

            esriRequest(args).then(function(response) {
              var infos = response.attachmentInfos;
              array.forEach(infos, function(info) {
                info.url = url + "/" + info.id + withToken;
                info.objectId = objectId;
              });
              def.resolve(infos);
            }, function(err) {
              def.reject(err);
            });
          }catch(e){
            console.error(e);
          }
          return def;
        };
      },

      isServiceSupportsOrderBy: function(layerDefinition){
        var isSupport = false;
        if(layerDefinition.advancedQueryCapabilities){
          if(layerDefinition.advancedQueryCapabilities.supportsOrderBy){
            isSupport = true;
          }
        }
        return isSupport;
      },

      isServiceSupportsPagination: function(layerDefinition){
        var isSupport = false;
        if(layerDefinition.advancedQueryCapabilities){
          if(layerDefinition.advancedQueryCapabilities.supportsPagination){
            isSupport = true;
          }
        }
        return isSupport;
      },

      isSupportObjectIds: function(layerDefinition){
        //http://resources.arcgis.com/en/help/arcgis-rest-api/#/Layer_Table/02r3000000zr000000/
        //currentVersion is added from 10.0 SP1
        //typeIdField is added from 10.0
        var currentVersion = 0;
        var objectIdField = jimuUtils.getObjectIdField(layerDefinition);
        if(layerDefinition.currentVersion){
          currentVersion = parseFloat(layerDefinition.currentVersion);
        }
        return !!objectIdField && (currentVersion >= 10.0 || layerDefinition.hasOwnProperty('typeIdField'));
      },

      getQueryType: function(layerDefinition){
        var queryType = -1;
        //query capability: 1 > 2 > 3
        if (this.isServiceSupportsOrderBy(layerDefinition) &&
          this.isServiceSupportsPagination(layerDefinition)) {
          queryType = 1;
        } else if (this.isSupportObjectIds(layerDefinition)) {
          queryType = 2;
        } else {
          queryType = 3;
        }
        return queryType;
      },

      getWebMapPopupInfoByUrl: function(webMapItemData, layerUrl){
        var popupInfo = null;
        layerUrl = layerUrl.replace(/\/*$/g, '');
        var layerUrlWithoutProtocol = portalUrlUtils.removeProtocol(layerUrl);
        var operationalLayers = webMapItemData.operationalLayers;
        array.some(operationalLayers, lang.hitch(this, function(info){
          if(info && info.url){
            var urlWithoutProtocol = portalUrlUtils.removeProtocol(info.url.replace(/\/*$/g, ''));
            if(info.popupInfo){
              if(urlWithoutProtocol === layerUrlWithoutProtocol){
                popupInfo = info.popupInfo;
                return true;
              }
            }else if(info.layers && info.layers.length > 0){
              return array.some(info.layers, lang.hitch(this, function(item){
                var fullUrl = urlWithoutProtocol + "/" + item.id;
                if(fullUrl === layerUrlWithoutProtocol){
                  popupInfo = info.popupInfo;
                  return true;
                }else{
                  return false;
                }
              }));
            }
          }
          return false;
        }));
        return popupInfo;
      },

      getPopupInfoForRelatedLayer: function(webMapItemData, layerUrl, layerDefinition){
        var popupInfo = this.getWebMapPopupInfoByUrl(webMapItemData, layerUrl);
        if(!popupInfo){
          popupInfo = this.getDefaultPopupInfo(layerDefinition, false, true);
        }

        if(!popupInfo.title){
          var objectIdField = jimuUtils.getObjectIdField(layerDefinition);
          if (objectIdField) {
            popupInfo.title = '{' + objectIdField + '}';
          }
        }

        return popupInfo;
      }

    };

    return mo;
  });