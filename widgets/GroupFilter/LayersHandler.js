///////////////////////////////////////////////////////////////////////////
// Copyright © 2015 Esri. All Rights Reserved.
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
define(['dojo/Evented',
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/_base/array',
        'dojo/Deferred',
        'dojo/promise/all',
        'esri/request'],
function(Evented,
          declare,
          lang,
          array,
          Deferred,
          all,
          esriRequest) {
  return declare([Evented], {
    declaredClass : 'LayersHandler',
    layers : null,
    layerStore : [],
    fieldName : null,
    childList : null,
    validFieldTypes : ['esriFieldTypeInteger', 'esriFieldTypeSmallInteger',
    'esriFieldTypeDouble', 'esriFieldTypeSingle', 'esriFieldTypeString',
    'esriFieldTypeDate', 'esriFieldTypeGeometry', 'esriFieldTypeOID',
    'esriFieldTypeBlob', 'esriFieldTypeGlobalID', 'esriFieldTypeRaster',
    'esriFieldTypeGUID', 'esriFieldTypeXML'],
    layersOnly : false,
    //Takes in the map object
    constructor : function(/*Object*/args) {
      declare.safeMixin(this, args);
    },

    //This gets all the operational layers and gets the info and places it in a custom data object.
    //This will also process sublayers not directly added to the map.
    //The layers are also passed to the getLayerInfo function to get geometry type and field info.
    //This function is a deferred meaning that you will get a promise and an then once everything is done
    getAllMapLayers: function() {
      var promises = [];
      var deferred = new Deferred();
      var dataItem;
      this.layerStore = [];
      array.forEach(this.layers, lang.hitch(this, function(layer) {
        if(!layer.featureCollection) {
          if ((typeof (layer.originOperLayer) !== 'undefined') &&
            layer.originOperLayer.layerType && (layer.originOperLayer.layerType === 'ArcGISFeatureLayer' ||
            layer.originOperLayer.layerType === 'ArcGISImageServiceLayer')) {
            if(typeof(layer.originOperLayer.featureCollection) === 'undefined' ) {
              dataItem = {
                label : layer.title,
                id : layer.id,
                url : layer.url,
                fieldName : this.fieldName,
                type : 'Feature Layer',
                checked : false,
                children : [],
                layer: layer.layerObject
              };
              promises.push(this._getLayerInfo(dataItem));
              this.layerStore.push(dataItem);
            }
          } else if (layer.newSubLayers.length > 0) {
            this.childList = [];
            if((typeof (layer.originOperLayer.layerType) !== 'undefined') &&
              ((layer.originOperLayer.layerType === "ArcGISTiledMapServiceLayer") ||
              (layer.originOperLayer.layerType === "VectorTileLayer"))) {
               // Do nothing, no looking up against tiles.
            } else {
              array.forEach(layer.layerObject.layerInfos, lang.hitch(this, function(subLyr) {
                var subDataItem = {
                  label : subLyr.name,
                  id : layer.id + '.' + subLyr.id,
                  url : layer.originOperLayer.url + '/' + subLyr.id,
                  type : 'Layer',
                  fieldName : this.fieldName,
                  checked : false,
                  children : [],
                  layer: layer.layerObject
                };
                this.childList.push(subDataItem);
                promises.push(this._getLayerInfo(subDataItem));
              }));
              dataItem = {
                label : layer.title,
                id : layer.id,
                url : layer.originOperLayer.url,
                type : 'Service',
                checked : false,
                children : this.childList,
                layer: layer.layerObject
              };
              this.layerStore.push(dataItem);
            }
          } else if((typeof (layer.originOperLayer.layerType) !== 'undefined') &&
              ((layer.originOperLayer.layerType === "ArcGISTiledMapServiceLayer") ||
              (layer.originOperLayer.layerType === "VectorTileLayer"))) {
              // Do nothing, no looking up against tiles.
          } else if (layer.originOperLayer.layerType === 'ArcGISMapServiceLayer') {
            this.childList = [];
            array.forEach(layer.layerObject.layerInfos, lang.hitch(this, function(subLyr) {
              var subDataItem = {
                label : subLyr.name,
                id : layer.id + '.' + subLyr.id,
                url : layer.originOperLayer.url + '/' + subLyr.id,
                type : 'Layer',
                fieldName : this.fieldName,
                checked : false,
                children : [],
                layer: layer.layerObject
              };
              this.childList.push(subDataItem);
              promises.push(this._getLayerInfo(subDataItem));
            }));
            dataItem = {
              label : layer.title,
              id : layer.id,
              url : layer.originOperLayer.url,
              type : 'MapService',
              checked : false,
              children : this.childList,
              layer: layer.layerObject
            };
            this.layerStore.push(dataItem);
          }
        }
      }));
      //Once all the layers and requst are setup, wrap them in ALL to make sure all completes
      //before proceeding on.
      all(promises).then(lang.hitch(this, function() {
        var node = this._controlComplete();
        this.emit('complete', node);
        deferred.resolve(node);

      }), lang.hitch(this, function() {
        deferred.resolve(null);
      }));

      return deferred.promise;

    },

    //For certain layers, have to make a request to them to get more details
    //such as fields and geomeotry type.
    _getLayerInfo : function(dataitem) {
      var deferred = new Deferred();
      if (!dataitem.url) {
        deferred.resolve();
      } else if (dataitem.url.length === 0) {
        deferred.resolve();
      } else {

        esriRequest({
          'url' : dataitem.url,
          'content' : {
            'f' : 'json'
          },
          'callbackParamName' : 'callback'
        }).then(lang.hitch(this, function(response) {
          //show field names and aliases
          if (response.hasOwnProperty('fields') && this.layersOnly === false) {

            var fieldInfo = array.map(response.fields, lang.hitch(this, function(f) {

              return {
                label : f.alias,
                id : dataitem.id + '.' + f.name,
                name : f.name,
                type : 'Field',
                fieldType : f.type,
                checked : false
              };

            }));
            //Update code to find fields that are in list .
            var filteredArr = array.filter(fieldInfo, lang.hitch(this, function(fieldItem) {
              return array.indexOf(this.validFieldTypes, fieldItem.fieldType) >= 0;
            }));

            dataitem.children = filteredArr;

          }
          dataitem.geometryType = response.geometryType;
          dataitem.visible = true;
          if (this.geometryTypes) {
            if (!array.some(this.geometryTypes, function(gtype) {
              if (gtype === dataitem.geometryType) {

                return true;
              }
            })) {
              dataitem.visible = false;

            }
          }

          deferred.resolve(response);

        }), function() {
          //error callback
          deferred.resolve(null);
        });
      }

      return deferred.promise;
    },

    //Once all the layers are processed, this function wraps it up into a parent data structure
    _controlComplete : function() {

      array.forEach(this.layerStore, function(layer) {
        if (layer.children && layer.children.length > 0) {
          var filteredChildren = array.filter(layer.children, function(child) {
            if (child.hasOwnProperty('visible')) {
              return child.visible;
            } else {
              return true;
            }

          });
          layer.children = filteredChildren;
          if (layer.children.length === 0) {
            layer.visible = false;
          }
        }
      });
      var filteredLayers = array.filter(this.layerStore, function(layer) {
        if (layer.hasOwnProperty('visible')) {
          return layer.visible;
        } else {
          return true;
        }
      });
      this.store = {
        data : {
          identifier : 'id',
          label : 'label',
          items : filteredLayers
        }
      };

      return this.store;

    }
  });

});
