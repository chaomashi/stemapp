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
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/Deferred',
    'jimu/utils',
    'esri/tasks/query',
    'esri/tasks/QueryTask',
    'esri/layers/FeatureLayer'
  ],
  function(declare, lang, array, Deferred, jimuUtils, EsriQuery, QueryTask, FeatureLayer) {

    function getCleanCurrentAttrsTemplate(){
      //important!
      //if change template's structure, we should update method _getCleanClonedCurrentAttrs of TaskSetting
      var template = {
        queryTr: null,//{taskIndex,singleConfig}
        config: null,//add popupInfo attribute
        layerInfo: null, // {relationships:[{id,name,relatedTableId,fields}]}
        relationshipLayerInfos: null,//{layerId:layerInfo,...}
        relationshipPopupTemplates: null,//{layerId: PopupTempalte,...}
        //serviceInfo: null,
        queryType: -1,
        query: {
          maxRecordCount: 1000,
          resultLayer: null, //FeatureLayer
          where: '',
          geometry: null,
          relationship: null,
          nextIndex: 0,
          allCount: 0,
          objectIds: [] //optional
        }
      };
      return template;
    }

    var SingleTaskClass = declare(null, {
      tempResultLayer: null,

      //options:
      map: null,
      currentAttrs: null,

      //public methods:
      //resetCurrentAttrs
      //getCurrentAttrs
      //getOutputFields
      //executeQueryForFirstTime
      //executeQueryWhenScrollToBottom
      //doQuery_SupportOrderByAndPagination: queryType 1
      //doQuery_SupportObjectIds: queryType 2
      //doQuery_NotSupportObjectIds: queryType 3
      //onResultsScroll_SupportOrderByAndPagination: queryType 1
      //onResultsScroll_SupportObjectIds: queryType 2

      constructor: function(map, currentAttrs){
        this.map = map;
        this.currentAttrs = currentAttrs;
        if(this.currentAttrs.layerInfo.maxRecordCount > 0){
          this.currentAttrs.query.maxRecordCount = this.currentAttrs.layerInfo.maxRecordCount;
        }
      },

      resetCurrentAttrs: function(){
        this.currentAttrs = getCleanCurrentAttrsTemplate();
      },

      getCurrentAttrs: function(){
        return this.currentAttrs;
      },

      //return a deferred which resolves:
      //features//, relatedResults, relatedTableIds
      executeQueryForFirstTime: function(){
        var def = null;
        var where = this.currentAttrs.query.where;
        var geometry = this.currentAttrs.query.geometry;
        if(this.currentAttrs.queryType === 1){
          def = this.doQuery_SupportOrderByAndPagination(where, geometry);
        }else if(this.currentAttrs.queryType === 2){
          def = this.doQuery_SupportObjectIds(where, geometry);
        }else{
          def = this.doQuery_NotSupportObjectIds(where, geometry);
        }
        return def;
      },

      //return a deferred which resolves
      //features//, relatedResults, relatedTableIds
      executeQueryWhenScrollToBottom: function(){
        var def = null;
        if(this.currentAttrs.queryType === 1){
          def = this.onResultsScroll_SupportOrderByAndPagination();
        }else if(this.currentAttrs.queryType === 2){
          def = this.onResultsScroll_SupportObjectIds();
        }
        return def;
      },

      _isServiceSupportsOrderBy: function(layerInfo){
        var isSupport = false;
        if(layerInfo.advancedQueryCapabilities){
          if(layerInfo.advancedQueryCapabilities.supportsOrderBy){
            isSupport = true;
          }
        }
        return isSupport;
      },

      _isServiceSupportsPagination: function(layerInfo){
        var isSupport = false;
        if(layerInfo.advancedQueryCapabilities){
          if(layerInfo.advancedQueryCapabilities.supportsPagination){
            isSupport = true;
          }
        }
        return isSupport;
      },

      _tryLocaleNumber: function(value){
        var result = jimuUtils.localizeNumber(value);
        if(result === null || result === undefined){
          result = value;
        }
        return result;
      },

      _tryLocaleDate: function(date){
        var result = jimuUtils.localizeDate(date);
        if(!result){
          result = date.toLocaleDateString();
        }
        return result;
      },

      _getLayerIndexByLayerUrl: function(layerUrl){
        var lastIndex = layerUrl.lastIndexOf("/");
        var a = layerUrl.slice(lastIndex + 1, layerUrl.length);
        return parseInt(a, 10);
      },

      _getServiceUrlByLayerUrl: function(layerUrl){
        var lastIndex = layerUrl.lastIndexOf("/");
        var serviceUrl = layerUrl.slice(0, lastIndex);
        return serviceUrl;
      },

      _isSupportObjectIds: function(layerInfo){
        //http://resources.arcgis.com/en/help/arcgis-rest-api/#/Layer_Table/02r3000000zr000000/
        //currentVersion is added from 10.0 SP1
        //typeIdField is added from 10.0
        var currentVersion = 0;
        if(layerInfo.currentVersion){
          currentVersion = parseFloat(layerInfo.currentVersion);
        }
        return currentVersion >= 10.0 || layerInfo.hasOwnProperty('typeIdField');
      },

      _isImageServiceLayer: function(url) {
        return (url.indexOf('/ImageServer') > -1);
      },

      _isTable: function(layerDefinition){
        return layerDefinition.type === "Table";
      },

      _getBestQueryName: function(queryName){
        if(queryName){
          queryName += " _" + this.nls.queryResult;
        }
        else{
          queryName += this.nls.queryResult;
        }
        var finalName = queryName;
        var allNames = array.map(this.map.graphicsLayerIds, lang.hitch(this, function(glId){
          var layer = this.map.getLayer(glId);
          return layer.name;
        }));
        var flag = 2;
        while(array.indexOf(allNames, finalName) >= 0){
          finalName = queryName + '_' + flag;
          flag++;
        }
        return finalName;
      },

      getObjectIdsForAllRelatedRecordsAction: function(){
        var def = new Deferred();
        if(this.currentAttrs.query.objectIds && this.currentAttrs.query.objectIds.length > 0){
          def.resolve(this.currentAttrs.query.objectIds);
        }else if(this.currentAttrs.queryType === 1){
          def = this._queryIds(this.currentAttrs.query.where,
                               this.currentAttrs.query.geometry,
                               this.currentAttrs.query.relationship);
        }else if(this.currentAttrs.queryType === 3){
          var objectIdField = this.currentAttrs.config.objectIdField;
          var features = this.currentAttrs.query.resultLayer.graphics;
          var objectIds = array.map(features, lang.hitch(this, function(feature){
            return parseInt(feature.attributes[objectIdField], 10);
          }));
          def.resolve(objectIds);
        }
        return def;
      },

      /*--------------------query support OrderBy and Pagination--------------------*/
      //resolve features
      doQuery_SupportOrderByAndPagination: function(where, geometry){
        var resultDef = new Deferred();

        var onErrorHandler = lang.hitch(this, function(err) {
          console.error(err);
          resultDef.reject(err);
        });

        var relationship  = this.currentAttrs.query.relationship;
        var defCount = this._queryCount(where, geometry, relationship);
        defCount.then(lang.hitch(this, function(allCount){

          this.currentAttrs.query.allCount = allCount;

          if(allCount === 0){
            resultDef.resolve([]);
            return;
          }

          this.currentAttrs.query.nextIndex = 0;//reset nextIndex

          var resultOffset = 0;
          var recordCount = this.currentAttrs.query.maxRecordCount;

          var def = this._queryWithPaginationAndOrder(where, geometry, resultOffset, recordCount, relationship);
          def.then(lang.hitch(this, function(response){
            var features = response.features;
            this.currentAttrs.query.nextIndex += features.length;
            resultDef.resolve(features);
          }), onErrorHandler);
        }), onErrorHandler);

        return resultDef;
      },

      //resolve features
      onResultsScroll_SupportOrderByAndPagination: function(){
        var resultDef = new Deferred();
        var resultOffset = this.currentAttrs.query.nextIndex;
        var allCount = this.currentAttrs.query.allCount;

        if(resultOffset >= allCount){
          resultDef.resolve([]);
          return resultDef;
        }

        var onErrorHandler = lang.hitch(this, function(err){
          console.error(err);
          resultDef.reject(err);
        });

        var recordCount = this.currentAttrs.query.maxRecordCount;
        var where = this.currentAttrs.query.where;
        var geometry = this.currentAttrs.query.geometry;
        var relationship  = this.currentAttrs.query.relationship;

        var def = this._queryWithPaginationAndOrder(where, geometry, resultOffset, recordCount, relationship);
        def.then(lang.hitch(this, function(response) {
          var features = response.features;
          this.currentAttrs.query.nextIndex += features.length;
          resultDef.resolve(features);
        }), onErrorHandler);

        return resultDef;
      },

      /*--------------------query support objectIds------------------------*/
      //resolve features
      doQuery_SupportObjectIds: function(where, geometry){
        var resultDef = new Deferred();

        var onErrorHandler = lang.hitch(this, function(err) {
          console.error(err);
          resultDef.reject(err);
        });
        var relationship  = this.currentAttrs.query.relationship;
        var defIDs = this._queryIds(where, geometry, relationship);
        defIDs.then(lang.hitch(this, function(objectIds){
          //objectIds maybe null

          var hasResults = objectIds && objectIds.length > 0;

          if(!hasResults){
            this.currentAttrs.query.allCount = 0;
            resultDef.resolve([]);
            return;
          }

          this.currentAttrs.query.allCount = objectIds.length;

          var allCount = objectIds.length;
          this.currentAttrs.query.objectIds = objectIds;
          this.currentAttrs.query.nextIndex = 0;//reset nextIndex
          var maxRecordCount = this.currentAttrs.query.maxRecordCount;

          var partialIds = [];

          if (allCount > maxRecordCount) {
            partialIds = objectIds.slice(0, maxRecordCount);
          } else {
            partialIds = objectIds;
          }

          var def = this._queryByObjectIds(partialIds, true, relationship);
          def.then(lang.hitch(this, function(response){
            var features = response.features;
            this.currentAttrs.query.nextIndex += features.length;
            resultDef.resolve(features);
          }), lang.hitch(this, function(err){
            onErrorHandler(err);
          }));
        }), onErrorHandler);

        return resultDef;
      },

      //resolve features
      onResultsScroll_SupportObjectIds: function(){
        var resultDef = new Deferred();
        var allObjectIds = this.currentAttrs.query.objectIds;
        var allCount = this.currentAttrs.query.allCount;
        var nextIndex = this.currentAttrs.query.nextIndex;

        if(nextIndex >= allCount){
          resultDef.resolve([]);
          return;
        }

        var maxRecordCount = this.currentAttrs.query.maxRecordCount;

        var countLeft = allObjectIds.length - nextIndex;
        var queryNum = Math.min(countLeft, maxRecordCount);
        var partialIds = allObjectIds.slice(nextIndex, nextIndex + queryNum);
        if(partialIds.length === 0){
          resultDef.resolve([]);
          return;
        }

        var relationship = this.currentAttrs.query.relationship;

        //do query by objectIds
        this._queryByObjectIds(partialIds, true, relationship).then(lang.hitch(this, function(response){
          var features = response.features;
          this.currentAttrs.query.nextIndex += features.length;
          resultDef.resolve(features);
        }), lang.hitch(this, function(err){
          resultDef.reject(err);
        }));

        return resultDef;
      },

      /*--------------------query doesn't support objectIds-------------------------*/
      //resolve features
      doQuery_NotSupportObjectIds: function(where, geometry){
        var resultDef = new Deferred();
        var relationship  = this.currentAttrs.query.relationship;
        this._query(where, geometry, true, relationship).then(lang.hitch(this, function(response){
          var features = response.features;
          this.currentAttrs.query.allCount = features.length;
          resultDef.resolve(features);
        }), lang.hitch(this, function(err){
          console.error(err);
          resultDef.reject(err);
        }));

        return resultDef;
      },


      /*-------------------------getOutputFields----------------------------------*/

      //include necessaryfields: renderer related fields, popupInfo fields
      getOutputFields: function(){
        /*var result = [];
        var outFields = [];
        //objectIdField
        var objectIdField = this.currentAttrs.config.objectIdField;
        if(objectIdField){
          outFields.push(objectIdField);
        }
        //renderer related fields
        var rendererFields = this._getRequiredFieldNames();
        outFields = outFields.concat(rendererFields);
        //popupInfo fields
        var popupInfoFields = this._getPopupInfoFieldNames();
        outFields = outFields.concat(popupInfoFields);
        //remove duplicate fields
        array.forEach(outFields, lang.hitch(this, function(fieldName){
          if(result.indexOf(fieldName) < 0){
            result.push(fieldName);
          }
        }));
        if(result.indexOf("*") >= 0){
          //sometimes the query will fail if outFields includes '*' and other fields.
          result = [];
          array.forEach(this.currentAttrs.layerInfo.fields, lang.hitch(this, function(fieldInfo){
            if(fieldInfo && fieldInfo.name && fieldInfo.type !== 'esriFieldTypeGeometry'){
              result.push(fieldInfo.name);
            }
          }));
        }
        return result;*/

        var result = [];
        array.forEach(this.currentAttrs.layerInfo.fields, lang.hitch(this, function(fieldInfo) {
          if (fieldInfo && fieldInfo.name && fieldInfo.type !== 'esriFieldTypeGeometry') {
            result.push(fieldInfo.name);
          }
        }));
        return result;
      },

      _getObjectIdField: function(){
        return this.currentAttrs.config.objectIdField;
      },

      //include objectIdField,typeIdField,startTimeField,endTimeField,trackIdField,rendererFields
      _getRequiredFieldNames: function(){
        var layerInfo = lang.clone(this.currentAttrs.layerInfo);
        var featureLayer = new FeatureLayer({
          layerDefinition: layerInfo,
          featureSet: null
        });
        var fieldNames = featureLayer.getOutFields();
        return fieldNames;
      },

      _getPopupInfoFieldNames: function(){
        var result = [];
        var outFields = [];
        var allServiceFieldInfos = this.currentAttrs.layerInfo.fields;
        var serviceFieldInfos = array.filter(allServiceFieldInfos, lang.hitch(this, function(serviceFieldInfo){
          return serviceFieldInfo.type !== 'esriFieldTypeGeometry';
        }));
        var popupInfo = this.currentAttrs.config.popupInfo;

        //title
        outFields = outFields.concat(this._getPlaceholderFieldNames(serviceFieldInfos, popupInfo.title));

        if(popupInfo.description){
          //description
          outFields = outFields.concat(this._getPlaceholderFieldNames(serviceFieldInfos, popupInfo.description));
        }else{
          //fieldInfos
          if(popupInfo.fieldInfos && popupInfo.fieldInfos.length > 0){
            array.forEach(popupInfo.fieldInfos, lang.hitch(this, function(portalFieldInfo){
              if(portalFieldInfo.visible){
                outFields.push(portalFieldInfo.fieldName);
              }
            }));
          }
        }

        //mediaInfos
        if(popupInfo.mediaInfos && popupInfo.mediaInfos.length > 0){
          array.forEach(popupInfo.mediaInfos, lang.hitch(this, function(mediaInfo){
            outFields = outFields.concat(this._getPlaceholderFieldNames(serviceFieldInfos, mediaInfo.title));
            outFields = outFields.concat(this._getPlaceholderFieldNames(serviceFieldInfos, mediaInfo.caption));
            var value = mediaInfo.value;
            if(value){
              var valueFields = value.fields;
              if(valueFields && valueFields.length > 0){
                array.forEach(valueFields, lang.hitch(this, function(valueField){
                  outFields.push(valueField);
                }));
              }
              if(value.normalizeField){
                outFields.push(value.normalizeField);
              }
              if(value.tooltipField){
                outFields.push(value.tooltipField);
              }
              if(value.sourceURL){
                outFields = outFields.concat(this._getPlaceholderFieldNames(serviceFieldInfos, value.sourceURL));
              }
              if(value.linkURL){
                outFields = outFields.concat(this._getPlaceholderFieldNames(serviceFieldInfos, value.linkURL));
              }
            }
          }));
        }

        //remove duplicate fields
        array.forEach(outFields, lang.hitch(this, function(fieldName){
          if(result.indexOf(fieldName) < 0){
            result.push(fieldName);
          }
        }));

        return result;
      },

      _getPlaceholderFieldNames: function(serviceFieldInfos, str){
        var result = [];
        if(str){
          var outFields = [];
          array.forEach(serviceFieldInfos, lang.hitch(this, function(serviceFieldInfo){
            var fieldName = serviceFieldInfo.name;
            var placeholder = "{" + fieldName + "}";
            if(str.indexOf(placeholder) >= 0){
              outFields.push(fieldName);
            }
          }));
          array.forEach(outFields, lang.hitch(this, function(fieldName){
            if(result.indexOf(fieldName) < 0){
              result.push(fieldName);
            }
          }));
        }
        return result;
      },

      /*----------------------------query-------------------------------*/

      _query: function(where, geometry, returnGeometry, relationship){
        var queryParams = new EsriQuery();
        queryParams.where = where;
        if(geometry){
          queryParams.geometry = geometry;
        }
        queryParams.outSpatialReference = this.map.spatialReference;
        queryParams.returnGeometry = !!returnGeometry;
        queryParams.spatialRelationship = relationship;
        queryParams.outFields = this.getOutputFields();
        //queryParams.maxRecordCount = this.currentAttrs.query.maxRecordCount;
        var queryTask = new QueryTask(this.currentAttrs.config.url);
        return queryTask.execute(queryParams);
      },

      _queryIds: function(where, geometry, relationship){
        var queryParams = new EsriQuery();
        queryParams.where = where;
        if(geometry){
          queryParams.geometry = geometry;
        }
        queryParams.returnGeometry = false;
        queryParams.spatialRelationship = relationship;
        queryParams.outSpatialReference = this.map.spatialReference;
        var queryTask = new QueryTask(this.currentAttrs.config.url);
        return queryTask.executeForIds(queryParams);
      },

      _queryByObjectIds: function(objectIds, returnGeometry, relationship){
        var def = new Deferred();
        var queryParams = new EsriQuery();
        queryParams.returnGeometry = !!returnGeometry;
        queryParams.outSpatialReference = this.map.spatialReference;
        queryParams.outFields = this.getOutputFields();
        queryParams.objectIds = objectIds;
        queryParams.spatialRelationship = relationship;
        var queryTask = new QueryTask(this.currentAttrs.config.url);
        queryTask.execute(queryParams).then(lang.hitch(this, function(response){
          def.resolve(response);
        }), lang.hitch(this, function(err){
          if(err.code === 400){
            //the query fails maybe becasuse the layer is a joined layer
            //joined layer:
            //http://csc-wade7d:6080/arcgis/rest/services/Cases/ParcelWithJoin/MapServer/0
            //joined layer doesn't support query by objectIds direcly, so if the layer is joined,
            //it will go into errorCallback of queryTask.
            //the alternative is using where to re-query.
            var objectIdField = this._getObjectIdField();
            var where = "";
            var count = objectIds.length;
            array.forEach(objectIds, lang.hitch(this, function(objectId, i){
              where += objectIdField + " = " + objectId;
              if(i !== count - 1){
                where += " OR ";
              }
            }));
            this._query(where, null, returnGeometry, relationship).then(lang.hitch(this, function(response){
              def.resolve(response);
            }), lang.hitch(this, function(err){
              def.reject(err);
            }));
          }else{
            def.reject(err);
          }
        }));
        return def;
      },

      _queryCount: function(where, geometry, relationship){
        var queryParams = new EsriQuery();
        queryParams.where = where;
        if(geometry){
          queryParams.geometry = geometry;
        }
        queryParams.returnGeometry = false;
        queryParams.outSpatialReference = this.map.spatialReference;
        queryParams.spatialRelationship = relationship;
        var queryTask = new QueryTask(this.currentAttrs.config.url);
        return queryTask.executeForCount(queryParams);
      },

      _queryWithPaginationAndOrder: function(where, geometry, resultOffset, resultRecordCount, relationship){
        var queryParams = new EsriQuery();
        queryParams.where = where;
        if(geometry){
          queryParams.geometry = geometry;
        }
        queryParams.outSpatialReference = this.map.spatialReference;
        queryParams.returnGeometry = true;
        queryParams.spatialRelationship = relationship;
        queryParams.outFields = this.getOutputFields();
        //set pagination info
        queryParams.start = resultOffset;
        queryParams.num = resultRecordCount;

        //set sorting info
        var orderByFields = this.currentAttrs.config.orderByFields;

        if(orderByFields && orderByFields.length > 0){
          queryParams.orderByFields = orderByFields;

          var orderFieldNames = array.map(orderByFields, lang.hitch(this, function(orderByField){
            var splits = orderByField.split(' ');
            return splits[0];
          }));

          //make sure orderFieldNames exist in outFields, otherwise the query will fail
          array.forEach(orderFieldNames, lang.hitch(this, function(orderFieldName){
            if(queryParams.outFields.indexOf(orderFieldName) < 0){
              queryParams.outFields.push(orderFieldName);
            }
          }));
        }

        var queryTask = new QueryTask(this.currentAttrs.config.url);
        return queryTask.execute(queryParams);
      }

    });

    SingleTaskClass.getCleanCurrentAttrsTemplate = getCleanCurrentAttrsTemplate;

    return SingleTaskClass;
  });