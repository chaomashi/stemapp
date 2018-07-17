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
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Evented',
    'dojo/text!./TaskSetting.html',
    'dojo/on',
    'dojo/Deferred',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/_base/array',
    'dojo/promise/all',
    'jimu/filterUtils',
    'jimu/dijit/FilterParameters',
    './utils',
    'jimu/utils',
    './SingleQueryLoader',
    './SpatialFilterByDrawing',
    'jimu/dijit/SpatialFilterByFeatures',
    'esri/tasks/query'
  ],
  function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented, template, on, Deferred,
    lang, html, array, all, FilterUtils, FilterParameters, queryUtils, jimuUtils, SingleQueryLoader,
    SpatialFilterByDrawing, SpatialFilterByFeatures, EsriQuery) {

    //This dijit provides UI to let user configure where and geometry for one query task.
    //This dijit doesn't handle layer and doesn't load data.
    //currentAttrs.resultLayer is null
    var clazz = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {

      baseClass: 'query-task-setting',
      templateString: template,
      askForValues: false,
      _defaultRelationship: 'SPATIAL_REL_INTERSECTS',

      //options:
      nls: null,
      map: null,
      currentAttrs: null,//we should only read values from it and should not write it
      layerInfosObj: null,

      //public methods:
      //run
      //getWhere
      //getGeometry
      //canAutoRunning

      postCreate:function(){
        this.inherited(arguments);
        this._initSelf();
      },

      run: function(){
        var clonedCurrentAttrs = this._getCleanClonedCurrentAttrs(this.currentAttrs);

        clonedCurrentAttrs.query.relationship = this._getRestRelationship();
        var defWhere = this.getWhere();
        var defGeometry = this.getGeometry();

        all([defWhere, defGeometry]).then(lang.hitch(this, function(results){
          this.deactivate();
          //this.clearAllGraphics();
          clonedCurrentAttrs.query.where = results[0];
          clonedCurrentAttrs.query.geometry = results[1];
          if(!clonedCurrentAttrs.query.geometry){
            console.log("Don't use geometry to query.");
          }
          //this._tryResetSpatialFilterByDrawing();
          //this._tryResetSpatialFilterByFeatures();
          if(typeof this.onApply === 'function'){
            this.onApply(clonedCurrentAttrs);
          }
        }), lang.hitch(this, function(err){
          console.error(err);
        }));
      },

      hideTempLayers: function(){
        if(this.spatialFilterByDrawing){
          this.spatialFilterByDrawing.hideTempLayers();
        }
        if(this.spatialFilterByFeatures){
          this.spatialFilterByFeatures.hideTempLayers();
        }
      },

      showTempLayers: function(){
        if(this.spatialFilterByDrawing){
          this.spatialFilterByDrawing.showTempLayers();
        }
        if(this.spatialFilterByFeatures){
          this.spatialFilterByFeatures.showTempLayers();
        }
      },

      _getCleanClonedCurrentAttrs: function(currentAttrs){
        var clonedCurrentAttrs = SingleQueryLoader.getCleanCurrentAttrsTemplate();
        var fieldValue = null;
        for(var fieldName in currentAttrs){
          //we must keep 'query' clean
          //queryTr is a tr dom node, so it can't be cloned
          if(fieldName !== 'queryTr' && fieldName !== 'query'){
            fieldValue = currentAttrs[fieldName];
            clonedCurrentAttrs[fieldName] = lang.clone(fieldValue);
          }
        }
        clonedCurrentAttrs.queryTr = currentAttrs.queryTr;
        clonedCurrentAttrs.query.maxRecordCount = currentAttrs.query.maxRecordCount;
        return clonedCurrentAttrs;
      },

      onGetQueryResponse: function(){
        this.deactivate();
        this._tryResetSpatialFilterByDrawing();
        this._tryResetSpatialFilterByFeatures();
      },

      //return a Deferred object which resolves a sql
      //if resolved, it means we can get a valid sql, including "1=1"
      //if rejected, it means we should get a sql but user doesn't provide valid parameters
      getWhere: function(){
        var def = new Deferred();
        var whereInfo = this._getWhereInfo();
        if(whereInfo.status === 1){
          var webMapLayerId = this.currentAttrs.config.webMapLayerId;
          if(webMapLayerId){
            var jimuLayerInfo = null;
            if(queryUtils.isTable(this.currentAttrs.layerInfo)){
              jimuLayerInfo = this.layerInfosObj.getTableInfoById(webMapLayerId);
            }else{
              jimuLayerInfo = this.layerInfosObj.getLayerInfoById(webMapLayerId);
            }
            var baseExpr = "";
            if(jimuLayerInfo){
              baseExpr = jimuLayerInfo.getFilter();
            }
            var finalExpr = whereInfo.where;
            if(baseExpr){
              finalExpr = "(" + baseExpr + ") AND " + "(" + whereInfo.where + ")";
            }
            def.resolve(finalExpr);
            // var layerInfo = this.layerInfosObj.getLayerInfoById();
            // if(layerInfo){
            //   layerInfo.getLayerObject().then(lang.hitch(this, function(layer){
            //     var finalExpr = whereInfo.where;
            //     var baseExpr = layer.getDefinitionExpression();
            //     if(baseExpr){
            //       finalExpr = "(" + baseExpr + ") AND " + "(" + whereInfo.where + ")";
            //     }
            //     def.resolve(finalExpr);
            //   }), lang.hitch(this, function(err){
            //     def.reject(err);
            //   }));
            // }else{
            //   def.resolve(whereInfo.where);
            // }
          }else{
            def.resolve(whereInfo.where);
          }
        }else{
          def.reject("Can't get a valid sql");
        }
        return def;
      },

      //return {status,where}
      //status 1 means we can get a valid sql, including "1=1"
      //status -1 means we should get a sql but user doesn't provide valid parameters
      _getWhereInfo: function(){
        var result = {
          status: 0,
          where: ""
        };
        if(this.askForValues){
          var newExpr = this.filterParams.getFilterExpr();
          var validExpr = newExpr && typeof newExpr === 'string';
          if(validExpr){
            result.status = 1;
            result.where = newExpr;
          }else{
            result.status = -1;
            result.where = null;
          }
        }else{
          result.status = 1;
          result.where = this.currentAttrs.config.filter.expr;
        }
        if(result.status === 1 && !result.where){
          result.where = "1=1";
        }
        return result;
      },

      _updateExecuteButtonStatus: function(){
        var isValid = this._isValidWhereToExecute() && this._isValidGeometryToExecute();
        if(isValid){
          html.removeClass(this.btnExecute, 'disabled');
        }else{
          html.addClass(this.btnExecute, 'disabled');
        }
        return isValid;
      },

      _isValidWhereToExecute: function(){
        return this._getWhereInfo().status > 0;
      },

      _isValidGeometryToExecute: function(){
        var spatialType = this.spatialTypeSelect.get('value');
        if(spatialType === 'currentMapExtent'){
          return true;
        }else if(spatialType === 'drawing'){
          var geometryInfo = this.spatialFilterByDrawing.getGeometryInfo();
          return !!geometryInfo.geometry;
        }else if(spatialType === 'useFeatures'){
          return this.spatialFilterByFeatures.isValidSearchDistance();
        }else if(spatialType === 'fullLayerExtent'){
          return true;
        }
        return true;
      },

      //return a Deferred object which resolves a geometry
      //if resolves null, it means we don't use geometry to do a query
      //if resolves a geometry, it means we use this geometry to do a query
      //if rejected, it means we should get a geometry but user doesn't provide valid parameters
      // we should not save the value to this.currentAttrs.query.geometry
      getGeometry: function(){
        var def = new Deferred();
        var spatialType = this.spatialTypeSelect.get('value');
        if(spatialType === 'currentMapExtent'){
          def.resolve(this.map.extent);
        }else if(spatialType === 'drawing'){
          var geometryInfo = this.spatialFilterByDrawing.getGeometryInfo();
          if(geometryInfo.status < 0){
            def.reject("Invalid search distance");
          }else{
            if(geometryInfo.status === 0){
              console.log("User doesn't draw anything");
            }
            //geometry maybe null
            def.resolve(geometryInfo.geometry);
          }
        }else if(spatialType === 'useFeatures'){
          this.spatialFilterByFeatures.getGeometryInfo().then(lang.hitch(this, function(response){
            //response: {status,geometry}
            if(response.status === -2){
              def.reject("Invalid search distance");
            }else{
              if(response.status === -1){
                console.log("User doesn't select a layer");
              }else if(response.status === 0){
                console.log("User doesn't select any features");
              }
              //geometry maybe null
              def.resolve(response.geometry);
            }
          }), lang.hitch(this, function(err){
            def.reject(err);
          }));
        }else if(spatialType === 'fullLayerExtent'){
          def.resolve(null);
        }else{
          def.resolve(null);
        }
        return def;
      },

      deactivate: function(){
        if(this.spatialFilterByDrawing){
          this.spatialFilterByDrawing.deactivate();
        }
        if(this.spatialFilterByFeatures){
          this.spatialFilterByFeatures.deactivate();
        }
      },

      clearAllGraphics: function(){
        if(this.spatialFilterByDrawing){
          this.spatialFilterByDrawing.clearAllGraphics();
        }
        if(this.spatialFilterByFeatures){
          this.spatialFilterByFeatures.clearAllGraphics();
        }
      },

      canAutoRunning: function(){
        return this._canAttributeFilterAutoRunning() && this._canSpatialFilterAutoRunning();
      },

      _canAttributeFilterAutoRunning: function(){
        var whereInfo = this._getWhereInfo();
        return whereInfo.status > 0 && !this.askForValues;
      },

      _canSpatialFilterAutoRunning: function(){
        var options = this.spatialTypeSelect.getOptions() || [];
        if(options.length === 0){
          return true;
        }else if(options.length === 1){
          var value = this.spatialTypeSelect.get('value');
          return value !== 'drawing' && value !== 'useFeatures';
        }else{
          return false;
        }
      },

      // _onSingleFilterParameterChanged:function(sqlOption){
      //   this.filterParams.emit('change', this.filterParams.getFilterExpr(sqlOption));
      // },

      _initSelf: function(){
        var config = this.currentAttrs.config;
        var layerInfo = this.currentAttrs.layerInfo;

        //task name
        var name = config.name || "";
        name = jimuUtils.sanitizeHTML(name);
        this.taskNameDiv.innerHTML = name;
        this.taskNameDiv.title = this.taskNameDiv.innerHTML;

        //init FilterParameters
        this.filterParams = new FilterParameters();
        this.filterParams.placeAt(this.sqlDiv, 'before');
        //display sql option
        var sqlOption = {ifDisplaySQL:true};

        // this.filterParams._onSingleFilterParameterChanged = lang.hitch(this, this._onSingleFilterParameterChanged, sqlOption);
        this.own(on(this.filterParams, 'change', lang.hitch(this, this._updateExecuteButtonStatus)));
        var partsObj = lang.clone(config.filter);
        this.filterParams.build(config.url, layerInfo, partsObj, config.webMapLayerId);

        var filterUtils = new FilterUtils();
        var _filter = this.currentAttrs.config.filter;
        this.askForValues = filterUtils.isAskForValues(_filter);
        var shouldShowAttributeSection = true;
        if(this.askForValues){
          shouldShowAttributeSection = true;
          if(_filter.displaySQL){
            this.sqlDiv.innerHTML = _filter.displaySQL;
          }else if(_filter.expr){
            this.sqlDiv.innerHTML = _filter.expr;
          }
          // var displaySQL = this.filterParams.getFilterExpr();
          var displaySQL = this.filterParams.getFilterExpr(sqlOption);
          if (displaySQL) {
            this.sqlDiv.innerHTML = displaySQL;
          }

          this.own(on(this.filterParams, 'change', lang.hitch(this, function(){ //newExpr
            this.sqlDiv.innerHTML = "";
            var displaySQL = this.filterParams.getFilterExpr(sqlOption); //getFilterExpr() will execute twice in this way
            if (displaySQL) {
              this.sqlDiv.innerHTML = displaySQL;
            }
          })));
        }else{
          if(this.currentAttrs.config.showSQL){
            // shouldShowAttributeSection = true;
            shouldShowAttributeSection = _filter.expr !== "1=1";
          }else{
            shouldShowAttributeSection = false;
          }
          this.sqlDiv.innerHTML = _filter.displaySQL ? _filter.displaySQL : _filter.expr;
        }

        if(this.currentAttrs.config.showSQL){
          html.removeClass(this.sqlDiv, 'not-visible');
        }else{
          html.addClass(this.sqlDiv, 'not-visible');
        }

        if(shouldShowAttributeSection){
          html.removeClass(this.attributesSectionDiv, 'not-visible');
        }else{
          html.addClass(this.attributesSectionDiv, 'not-visible');
        }

        //init spatialTypeSelect
        var spatialFilter = this.currentAttrs.config.spatialFilter;
        var spatialOption = null;
        if(!spatialFilter){
          spatialFilter = {};
        }
        if(queryUtils.isTable(layerInfo)){
          spatialFilter = {};
        }

        //currentMapExtent
        if(spatialFilter.currentMapExtent){
          spatialOption = {
            value: "currentMapExtent",
            label: this.nls.useCurrentExtentTip
          };
          this.spatialTypeSelect.addOption(spatialOption);
          if(spatialFilter.currentMapExtent["default"]){
            this.spatialTypeSelect.set('value', spatialOption.value);
          }
        }

        //drawing
        if(spatialFilter.drawing){
          spatialOption = {
            value: "drawing",
            label: this.nls.useDrawGraphicTip
          };
          this.spatialTypeSelect.addOption(spatialOption);
          if(spatialFilter.drawing["default"]){
            this.spatialTypeSelect.set('value', spatialOption.value);
          }

          //init SpatialFilterByDrawing
          var drawingGeoTypes = spatialFilter.drawing.geometryTypes;
          var drawingBufferOption = spatialFilter.drawing.buffer;
          this.spatialFilterByDrawing = new SpatialFilterByDrawing({
            drawBoxOption: {
              map: this.map,
              geoTypes: drawingGeoTypes
            },
            nls: this.nls,
            enableBuffer: !!drawingBufferOption,
            distance: lang.getObject("defaultDistance", false, drawingBufferOption) || 0,
            unit: lang.getObject("defaultUnit", false, drawingBufferOption) || ""
          });
          this.own(on(
            this.spatialFilterByDrawing, 'change', lang.hitch(this, this._updateExecuteButtonStatus)
          ));
          this.spatialFilterByDrawing.placeAt(this.drawingSection);
        }

        //useFeatures
        if(spatialFilter.useFeatures){
          spatialOption = {
            value: "useFeatures",
            label: this.nls.useFeaturesTip
          };
          this.spatialTypeSelect.addOption(spatialOption);
          if(spatialFilter.useFeatures["default"]){
            this.spatialTypeSelect.set('value', spatialOption.value);
          }
          var featuresBufferOption = spatialFilter.useFeatures.buffer;
          var ignoredFeaturelayerIds = [];
          if(config.webMapLayerId){
            ignoredFeaturelayerIds.push(config.webMapLayerId);
          }
          this.spatialFilterByFeatures = new SpatialFilterByFeatures({
            map: this.map,
            nls: this.nls,
            enableBuffer: !!featuresBufferOption,
            distance: lang.getObject("defaultDistance", false, featuresBufferOption) || 0,
            unit: lang.getObject("defaultUnit", false, featuresBufferOption) || "",
            showLoading: false,
            ignoredFeaturelayerIds: ignoredFeaturelayerIds
          });
          if(this.spatialFilterByFeatures.tipNode){
            html.setStyle(this.spatialFilterByFeatures.tipNode, 'display', 'block');
          }
          this.spatialFilterByFeatures.placeAt(this.featuresSection);
          this.own(on(this.spatialFilterByFeatures, 'loading', lang.hitch(this, function(){
            if(this.domNode){
              this.shelter.show();
            }
          })));
          this.own(on(this.spatialFilterByFeatures, 'unloading', lang.hitch(this, function(){
            if(this.domNode){
              this.shelter.hide();
            }
          })));
          this.own(on(
            this.spatialFilterByFeatures, 'search-distance-change', lang.hitch(this, this._updateExecuteButtonStatus)
          ));

          //init relationshipSelect
          //[{relationship,label}...], such as
          /*[{
              "relationship": "SPATIAL_REL_INTERSECTS",
              "label": "intersect"
            }, {
              "relationship": "SPATIAL_REL_CROSSES",
              "label": "cross"
            }, {
              "relationship": "SPATIAL_REL_ENVELOPEINTERSECTS",
              "label": "envelope intersect"
            }]*/
          var relationships = spatialFilter.useFeatures.relationships;
          if(relationships && relationships.length > 0){
            array.forEach(relationships, lang.hitch(this, function(relationshipInfo){
              this.relationshipSelect.addOption({
                value: relationshipInfo.relationship,
                label: relationshipInfo.label
              });
            }));
          }else{
            this.relationshipSelect.addOption({
              value: this._defaultRelationship,
              label: this._defaultRelationship
            });
          }
        }

        //fullLayerExtent
        if(spatialFilter.fullLayerExtent){
          spatialOption = {
            value: "fullLayerExtent",
            label: this.nls.noSpatialLimitTip
          };
          this.spatialTypeSelect.addOption(spatialOption);
          if(spatialFilter.fullLayerExtent["default"]){
            this.spatialTypeSelect.set('value', spatialOption.value);
          }
        }

        var shouldShowSpatialSection = true;
        var spatialTypeOptions = this.spatialTypeSelect.getOptions() || [];
        if(spatialTypeOptions.length === 0){
          shouldShowSpatialSection = false;
          this.spatialFilterTip.innerHTML = this.nls.noSpatialLimitTip;
        }else if(spatialTypeOptions.length === 1){
          shouldShowSpatialSection = spatialTypeOptions[0].value !== "fullLayerExtent";
          this.spatialFilterTip.innerHTML = spatialTypeOptions[0].label;
          html.addClass(this.spatialTypeSelect.domNode, 'not-visible');
        }else{
          shouldShowSpatialSection = true;
        }
        if(queryUtils.isTable(layerInfo)){
          shouldShowSpatialSection = false;
        }
        if(shouldShowSpatialSection){
          html.removeClass(this.spatialSectionDiv, 'not-visible');
        }else{
          html.addClass(this.spatialSectionDiv, 'not-visible');
        }
        this._onSpatialTypeSelectChanged();

        if(!shouldShowAttributeSection && !shouldShowSpatialSection){
          html.removeClass(this.noFilterTip, 'not-visible');
        }
      },

      //return "SPATIAL_REL_OVERLAPS"
      _getConstantRelationship: function(){
        var relationship = this._defaultRelationship;
        var spatialType = this.spatialTypeSelect.get('value');
        if(spatialType === 'useFeatures'){
          relationship = this.relationshipSelect.get('value');
        }
        return relationship;
      },

      //return "esriSpatialRelOverlaps"
      _getRestRelationship: function(){
        var apiRelationship = this._getConstantRelationship();
        return EsriQuery[apiRelationship];
      },

      _onSpatialTypeSelectChanged: function(){
        var spatialType = this.spatialTypeSelect.get('value');

        if(spatialType === "drawing"){
          html.setStyle(this.drawingSection, 'display', 'block');
        }else{
          html.setStyle(this.drawingSection, 'display', 'none');
          this._tryResetSpatialFilterByDrawing();
        }

        if(spatialType === 'useFeatures'){
          html.setStyle(this.featuresSection, 'display', 'block');
        }else{
          html.setStyle(this.featuresSection, 'display', 'none');
          this._tryResetSpatialFilterByFeatures();
        }

        this.spatialTypeSelect.domNode.title = "";
        if(spatialType){
          var option = this.spatialTypeSelect.getOptions(spatialType);
          if(option){
            this.spatialTypeSelect.domNode.title = option.label;
          }
        }

        this._updateExecuteButtonStatus();
      },

      _tryResetSpatialFilterByDrawing: function(){
        if(this.spatialFilterByDrawing){
          this.spatialFilterByDrawing.reset();
        }
      },

      _tryResetSpatialFilterByFeatures: function(){
        if(this.spatialFilterByFeatures){
          this.spatialFilterByFeatures.reset();
        }
      },

      _onBtnParamsBackClicked:function(){
        this._tryResetSpatialFilterByDrawing();
        this._tryResetSpatialFilterByFeatures();

        if(typeof this.onBack === 'function'){
          this.onBack();
        }
      },

      //start to query
      _onBtnApplyClicked:function(){
        if(this._updateExecuteButtonStatus()){
          this.run();
        }
      }

    });

    return clazz;
  });