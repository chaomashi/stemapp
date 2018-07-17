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
    'dojo/_base/query',
    'dojo/_base/html',
    'dojo/_base/array',
    'dojo/_base/fx',
    'dojo/on',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidget',
    'jimu/dijit/Message',
    'jimu/dijit/DrawBox',
    'jimu/utils',
    'jimu/filterUtils',
    'esri/layers/FeatureLayer',
    'esri/renderers/SimpleRenderer',
    'esri/symbols/jsonUtils',
    'jimu/dijit/StatisticsChart',
    './Query',
    'jimu/LayerInfos/LayerInfos',
    'jimu/ServiceDefinitionManager',
    'jimu/dijit/Popup',
    'jimu/dijit/LoadingShelter'
  ],
  function(declare, lang, query, html, array, fx, on, _WidgetsInTemplateMixin,
    BaseWidget, Message, DrawBox, jimuUtils, FilterUtils, FeatureLayer, SimpleRenderer,
    symbolJsonUtils, StatisticsChart, Query, LayerInfos, ServiceDefinitionManager, Popup) {

    return declare([BaseWidget, _WidgetsInTemplateMixin], {
      name: 'Chart',
      baseClass: 'jimu-widget-chart',
      isValidConfig:false,
      currentAttrs: null,
      tempResultLayer: null,
      previewArgs: null,
      previewPopup: null,
      layerInfosObj: null,

      //test:
      //http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer
      //http://map.floridadisaster.org/GIS/rest/services/Events/FL511_Feeds/MapServer/4
      //http://maps.usu.edu/ArcGIS/rest/services/MudLake/MudLakeMonitoringSites/MapServer/0
      //http://sampleserver6.arcgisonline.com/arcgis/rest/services/SampleWorldCities/MapServer/1

      constructor:function(){
        this.cachePopUpInfos = {};
      },

      _resetCurrentAttrs: function(){
        this.currentAttrs = {
          chartTr: null,
          config: null,
          layerInfo: null
        };
      },

      postMixInProperties: function() {
        this.inherited(arguments);
        this.nls.colorful = this.nls.colorful || "Colorful";
        this.nls.monochromatic = this.nls.monochromatic || "Monochromatic";
        this.nls.clearResults = window.jimuNls.drawBox.clear;
        this.layerInfosObj = LayerInfos.getInstanceSync();
        this.serviceDefinitionManager = ServiceDefinitionManager.getInstance();
        if(this.config){
          this._setUrlForConfig();
          this._updateConfig();
        }
      },

      _updateConfig: function() {
        if (this.config && this.config.charts && this.config.charts.length > 0) {
          array.forEach(this.config.charts, lang.hitch(this, function(singleConfig) {
            this._rebuildFilter(singleConfig.url, singleConfig.filter);
          }));
        }
      },

      _setUrlForConfig: function(){
        //set url attribute of config if webMapLayerId is set
        if(this.config && this.config.charts && this.config.charts.length > 0){
          array.forEach(this.config.charts, lang.hitch(this, function(singleConfig){
            if(singleConfig.webMapLayerId){
              var layerInfoOrTableInfo = this.layerInfosObj.getLayerOrTableInfoById(singleConfig.webMapLayerId);
              if(layerInfoOrTableInfo){
                singleConfig.url = layerInfoOrTableInfo.getUrl();
              }
            }
          }));
        }
      },

      _rebuildFilter: function(url, filter) {
        try {
          if (filter) {
            delete filter.expr;
            var filterUtils = new FilterUtils();
            filterUtils.isHosted = jimuUtils.isHostedService(url);
            //make sure filter.expr is correct
            filterUtils.getExprByFilterObj(filter);
          }
        } catch (e) {
          console.log(e);
        }
      },

      postCreate: function(){
        this.inherited(arguments);
        jimuUtils.combineRadioCheckBoxWithLabel(this.cbxUseSpatial, this.labelUseSpatial);
        jimuUtils.combineRadioCheckBoxWithLabel(this.cbxUseMapExtent, this.labelUseMapExtent);
        jimuUtils.combineRadioCheckBoxWithLabel(this.cbxDrawGraphic, this.labelDrawGraphic);
        this._initDrawBox();
        this._initPreview();
        // this._resetAndAddTempResultLayer();
        this._initSelf();
      },

      onOpen: function(){
        if(this.tempResultLayer){
          this.tempResultLayer.show();
        }
      },

      // onActive: function(){
      //   this.map.setInfoWindowOnClick(false);
      // },

      onDeActive: function(){
        //deactivate method of DrawBox dijit will call this.map.setInfoWindowOnClick(true) inside
        this.drawBox.deactivate();
      },

      onClose: function(){
        if(this.tempResultLayer){
          this.tempResultLayer.hide();
        }
        this._hideInfoWindow();
        this.drawBox.clear();
        // this.preview.onClose();
        this.inherited(arguments);
      },

      resize: function(){
        //.box-frame in BoxTheme uses 1s to do transition.
        var time = this.appConfig.theme.name === "BoxTheme" ? 1100 : 100;
        setTimeout(lang.hitch(this, function(){
          this._updatePreviewHeight();
          this.preview.resize();
        }), time);
      },

      destroy: function(){
        this._clickClearButton(true);
        this.inherited(arguments);
      },

      _isConfigValid:function(){
        return this.config && typeof this.config === 'object';
      },

      _initDrawBox: function(){
        this.drawBox = new DrawBox({
          types: ['point', 'polyline', 'polygon'],
          map: this.map,
          showClear: true,
          keepOneGraphic: true
        });
        this.drawBox.placeAt(this.drawBoxDiv);
        this.drawBox.startup();
      },

      _createBigPreview: function(){
        if(!this.previewArgs){
          return;
        }
        //60 75
        var windowWidth = document.body.clientWidth;
        var windowHeight = document.body.clientHeight;
        var margin = 20;
        var width = windowWidth - 2 * margin;
        var height = windowHeight - 2 * margin;
        if(width < 100 || height < 100){
          return;
        }
        var fontColor = this._getDefaultFontColor();
        var initialChartIndex = 0;
        if(this.preview && this.preview.currentChartIndex >= 0){
          initialChartIndex = this.preview.currentChartIndex;
        }
        var bigPreview = new StatisticsChart({
          map: this.map,
          fontColor: fontColor,
          isBigPreview: true,
          showSettingIcon: true,
          showZoomIcon: false,
          zoomToFeaturesWhenClick: true,
          initialChartIndex: initialChartIndex,
          style: "width:100%;height:100%;"
        });
        this.previewPopup = new Popup({
          width: width,
          height: height,
          titleLabel: this.nls._widgetLabel,
          content: bigPreview,
          onClose: lang.hitch(this, function(){
            bigPreview.destroy();
            bigPreview = null;
            this.previewPopup = null;
          })
        });
        //popupInfos
        var popupFieldInfosObj = this._getPopupFieldInfo() || {};
        setTimeout(lang.hitch(this, function(){
          bigPreview.createClientCharts(this.preview.featureLayer, this.preview.features, this.preview.config,
            popupFieldInfosObj);
        }), 100);
      },

      _getPopupFieldInfo: function() {
        var popupFieldInfosObj = null;
        if (this.currentAttrs.config && typeof this.currentAttrs.config.webMapLayerId !== 'undefined') {
          var layerId = this.currentAttrs.config.webMapLayerId;
          if (typeof this.cachePopUpInfos[layerId] !== 'undefined') {
            popupFieldInfosObj = this.cachePopUpInfos[layerId];
          } else {
            var layerInfo = this.layerInfosObj.getLayerInfoById(layerId);
            if (layerInfo) {
              popupFieldInfosObj = layerInfo.getPopupInfo();
              if (popupFieldInfosObj) {
                this.cachePopUpInfos[layerId] = popupFieldInfosObj;
              }
            }
          }
        }
        return popupFieldInfosObj;
      },

      _initPreview: function(){
        var fontColor = this._getDefaultFontColor();
        this.preview = new StatisticsChart({
          map: this.map,
          fontColor: fontColor,
          isBigPreview: false,
          showSettingIcon: true,
          showZoomIcon: true,
          zoomToFeaturesWhenClick: true
        });
        this.preview.placeAt(this.resultsContainer);
        this.preview.startup();
        this.own(on(this.preview, 'zoomin', lang.hitch(this, this._createBigPreview)));
      },

      _getDefaultFontColor: function(){
        var color = "#333333";
        if (this.appConfig.theme.name === 'DashboardTheme' &&
          (this.appConfig.theme.styles[0] === 'default' || this.appConfig.theme.styles[0] === 'style3')) {
          // bgColor = '#222222';
          color = '#fff';
        } else if (this.appConfig.theme.name === 'DartTheme') {
          // bgColor = '#4c4c4c';
          color = '#fff';
        }
        return color;
      },

      _initSelf: function(){
        var uniqueId = jimuUtils.getRandomString();
        var cbxName = "Chart_" + uniqueId;
        this.cbxUseMapExtent.name = cbxName;
        this.cbxDrawGraphic.name = cbxName;

        this.isValidConfig = this._isConfigValid();
        if(!this.isValidConfig){
          html.setStyle(this.chartsNode, 'display', 'none');
          html.setStyle(this.invalidConfigNode, {
            display: 'block',
            left: 0
          });
          return;
        }

        var charts = this.config.charts;

        if(charts.length === 0){
          html.setStyle(this.chartsNode, 'display', 'none');
          html.setStyle(this.noChartTipSection, 'display', 'block');
          return;
        }

        array.forEach(charts, lang.hitch(this, function(singleConfig, index){
          var name = singleConfig.name;
          var strTr = '<tr class="single-chart jimu-table-row">' +
          '<td class="first-td"></td>' +
          '<td class="second-td">' +
            '<div class="chart-name-div"></div>' +
          '</td>' +
          '<td class="third-td">' +
            '<div class="arrow"></div>' +
          '</td>' +
          '</tr>';
          var tr = html.toDom(strTr);
          var chartNameDiv = query(".chart-name-div", tr)[0];
          chartNameDiv.innerHTML = jimuUtils.stripHTML(name);
          html.place(tr, this.chartsTbody);
          tr.singleConfig = singleConfig;
          if (index % 2 === 0) {
            html.addClass(tr, 'even');
          } else {
            html.addClass(tr, 'odd');
          }
        }));
      },

      _clickClearButton: function(/*optional*/ dontSlide){
        this._hideInfoWindow();
        this.drawBox.clear();
        this._removeTempResultLayer();
        this._clearResultPage();
        //the default value of dontSlide is false.
        //if true, it means the widgte will destroy and it needn't slide.
        if(!dontSlide){
          this._fromCurrentPageToChartList();
        }
      },

      _slide: function(dom, startLeft, endLeft){
        html.setStyle(dom, 'display', 'block');
        html.setStyle(dom, 'left', startLeft + "%");
        fx.animateProperty({
          node: dom,
          properties:{
            left:{
              start: startLeft,
              end: endLeft,
              units: '%'
            }
          },
          duration: 500,
          onEnd: lang.hitch(this, function(){
            html.setStyle(dom, 'left', endLeft);
            if(endLeft === 0){
              html.setStyle(dom, 'display', 'block');
            }
            else{
              html.setStyle(dom, 'display', 'none');
            }
          })
        }).play();
      },

      _onChartListClicked: function(event){
        var target = event.target || event.srcElement;
        var tr = jimuUtils.getAncestorDom(target, lang.hitch(this, function(dom){
          return html.hasClass(dom, 'single-chart');
        }), 10);
        if(!tr){
          return;
        }

        var singleConfig = tr.singleConfig;
        this._resetCurrentAttrs();
        this.currentAttrs.chartTr = tr;
        this.currentAttrs.config = lang.clone(singleConfig);
        this.currentAttrs.layerInfo = this.currentAttrs.chartTr.layerInfo;//may be null

        query('tr.single-chart', this.chartsTbody).removeClass('jimu-state-active');
        html.addClass(this.currentAttrs.chartTr, 'jimu-state-active');

        var callback = lang.hitch(this, function() {
          this.currentAttrs.layerInfo = this.currentAttrs.chartTr.layerInfo;
          this._fromChartListToChartParams();
        });

        if(this.currentAttrs.chartTr.layerInfo){
          callback();
        }
        else{
          this.shelter.show();

          var layerInfo = null;
          if (this.currentAttrs.config && typeof this.currentAttrs.config.webMapLayerId !== 'undefined') {
            var layerId = this.currentAttrs.config.webMapLayerId;
            layerInfo = this.layerInfosObj.getLayerInfoById(layerId);
          }

          if (layerInfo) {
            layerInfo.getServiceDefinition().then(lang.hitch(this, function(response) {
              if (!this.domNode) {
                return;
              }
              this.shelter.hide();
              this.currentAttrs.chartTr.layerInfo = response;
              this.currentAttrs.layerInfo = this.currentAttrs.chartTr.layerInfo;
              callback();
            }), lang.hitch(this, function(err) {
              console.error(err);
              if (!this.domNode) {
                return;
              }
              this.shelter.hide();
              var errMsg = "";
              if (err && err.httpCode === 403) {
                errMsg = this.nls.noPermissionsMsg;
              }
              this._showQueryErrorMsg(errMsg);
            }));
          } else {
            var layerUrl = this.currentAttrs.config.url;
            this.serviceDefinitionManager.getServiceDefinition(layerUrl)
              .then(lang.hitch(this, function(response) {
                if (!this.domNode) {
                  return;
                }
                this.shelter.hide();
                this.currentAttrs.chartTr.layerInfo = response;
                this.currentAttrs.layerInfo = this.currentAttrs.chartTr.layerInfo;
                callback();
              }), lang.hitch(this, function(err) {
                console.error(err);
                if (!this.domNode) {
                  return;
                }
                this.shelter.hide();
                var errMsg = "";
                if (err && err.httpCode === 403) {
                  errMsg = this.nls.noPermissionsMsg;
                }
                this._showQueryErrorMsg(errMsg);
              }));
          }
        }
      },

      _fromCurrentPageToChartList: function(){
        html.setStyle(this.chartList, 'display', 'block');

        if(html.getStyle(this.chartParams, 'display') === 'block'){
          this._slide(this.chartList, -100, 0);
          this._slide(this.chartParams, 0, 100);
        }
        else if(html.getStyle(this.chartResults, 'display') === 'block'){
          this._slide(this.chartList, -100, 0);
          this._slide(this.chartResults, 0, 100);
        }
      },

      _onCbxUseSpatialClicked: function(){
        if(this.cbxUseSpatial.checked){
          html.setStyle(this.selectSpatialDiv, 'display', 'block');
        }
        else{
          html.setStyle(this.selectSpatialDiv, 'display', 'none');
        }

        if (this.cbxUseMapExtent.checked) {
          this._onCbxUseMapExtentClicked();
        } else {
          this._onCbxDrawGraphicClicked();
        }

        this._resetDrawBox();
      },

      _onCbxUseMapExtentClicked: function(){
        if(this.cbxUseMapExtent.checked){
          this._resetDrawBox();
          html.setStyle(this.drawBoxDiv, 'display', 'none');
        }
      },

      _onCbxDrawGraphicClicked: function(){
        if(this.cbxDrawGraphic.checked){
          html.setStyle(this.drawBoxDiv, 'display', 'block');
        }
      },

      _onBtnClearAllClicked: function(){
        if(this.chartsTbody.childElementCount === 0){
          return;
        }

        var isChartListVisible = this.chartList.style.display !== 'none';
        var dontSlide = isChartListVisible;
        this._clickClearButton(dontSlide);
      },

      _resetDrawBox: function(){
        this.drawBox.deactivate();
        this.drawBox.clear();
      },

      _resetChartParamsPage: function(){
        this.cbxUseSpatial.checked = false;
        this._onCbxUseSpatialClicked();
        this._resetDrawBox();
      },

      _fromChartListToChartParams: function(){
        //reset UI of params page
        this._resetChartParamsPage();
        //var layerUrl = this.currentAttrs.config.url;

        //slide
        var showDom = this.chartParams;
        var hideDom = this.chartResults;

        html.setStyle(this.chartList, {
          left: 0,
          display: 'block'
        });

        html.setStyle(showDom, {
          left: '100%',
          display: 'block'
        });

        html.setStyle(hideDom, 'display', 'none');
        this._slide(this.chartList, 0, -100);
        this._slide(showDom, 100, 0);
      },

      _onBtnParamsBackClicked: function(){
        this._resetDrawBox();
        html.setStyle(this.chartList, 'display', 'block');
        html.setStyle(this.chartParams, 'display', 'block');
        html.setStyle(this.chartResults, 'display', 'none');
        this._slide(this.chartList, -100, 0);
        this._slide(this.chartParams, 0, 100);
      },

      //start to query
      _onBtnApplyClicked: function(){
        //reset result page
        this._clearResultPage();
        //var layerInfo = this.currentAttrs.layerInfo;

        var where = this.currentAttrs.config.filter.expr;
        var geometry = null;

        if(this.cbxUseSpatial.checked){
          if(this.cbxUseMapExtent.checked){
            geometry = this.map.extent;
          }
          else{
            var gs = this.drawBox.drawLayer.graphics;
            if(gs.length > 0){
              var g = gs[0];
              geometry = g.geometry;
            }
          }
          if(!geometry){
            new Message({message: this.nls.specifySpatialFilterMsg});
            return;
          }
        }

        if(this.tempResultLayer){
          this.map.removeLayer(this.tempResultLayer);
        }
        this.tempResultLayer = null;

        //set query.resultLayer
        this._createChartResultLayer();

        this._resetDrawBox();

        html.setStyle(this.chartList, 'display', 'none');
        html.setStyle(this.chartParams, 'display', 'block');
        html.setStyle(this.chartResults, 'display', 'block');
        this._slide(this.chartParams, 0, -100);
        this._slide(this.chartResults, 100, 0);

        var singleConfig = this.currentAttrs.config;
        var outFields = [];
        var mode = singleConfig.mode;
        if(mode === 'feature'){
          outFields = lang.clone(singleConfig.valueFields);
          if(outFields.indexOf(singleConfig.labelField) < 0){
            outFields.push(singleConfig.labelField);
          }
        }
        else if(mode === 'category'){
          outFields = lang.clone(singleConfig.valueFields);
          if(outFields.indexOf(singleConfig.categoryField) < 0){
            outFields.push(singleConfig.categoryField);
          }
        }
        else if(mode === 'count'){
          outFields = [singleConfig.categoryField];
        }
        else if(mode === 'field'){
          outFields = lang.clone(singleConfig.valueFields);
        }

        this.shelter.show();
        //popupInfos
        var popupFieldInfosObj = this._getPopupFieldInfo() || {};
        var baseExpr = this._getBaseExpression(this.currentAttrs.config.webMapLayerId);
        if(baseExpr){
          where = "(" + baseExpr + ") AND " + "(" + where + ")";
        }
        this._query(where, outFields, geometry).then(lang.hitch(this, function(response){
          //response: {status,count,features}
          if(!this.domNode){
            return;
          }
          this.shelter.hide();
          if(response.status > 0){
            // var url = this.currentAttrs.config.url;
            // var args = {
            //   config: singleConfig,
            //   features: response.features,
            //   layerDefinition: this.currentAttrs.layerInfo,
            //   resultLayer: this.tempResultLayer
            // };

            var args = {
              featureLayer: this.tempResultLayer,
              features: response.features,
              config: singleConfig
            };

            this.previewArgs = args;

            //update preview height
            this._updatePreviewHeight();

            //preview will filter features
            // this.preview.createClientCharts(args);
            this.preview.createClientCharts(args.featureLayer, args.features, args.config, popupFieldInfosObj);


            //add the filtered features to layer
            array.forEach(response.features, lang.hitch(this, function(feature) {
              var geometry = feature.geometry;
              if(!geometry){
                return;
              }
              //if geometry.type is not point, return true
              if (geometry.type === 'point') {
                //if geometry.type is point, check its geometry is vaild or not
                if(jimuUtils.isVaildPointGeometry(geometry)){
                  this.tempResultLayer.add(feature);
                }
              } else {
                this.tempResultLayer.add(feature);
              }
            }));

            this._zoomToLayer(this.tempResultLayer);
          }
        }), lang.hitch(this, function(err){
          console.error(err);
          if(!this.domNode){
            return;
          }
          this.shelter.hide();
          this._removeTempResultLayer();
        }));
      },

      _getBaseExpression: function(webMapLayerId){
        var baseExpr = "";
        //var webMapLayerId = this.currentAttrs.config.webMapLayerId;
        if(webMapLayerId){
          var info = null;
          if(this.currentAttrs.layerInfo.type === 'Table'){
            info = this.layerInfosObj.getTableInfoById(webMapLayerId);
          }else{
            info = this.layerInfosObj.getLayerInfoById(webMapLayerId);
          }
          if(info){
            baseExpr = info.getFilter();
          }
        }
        return baseExpr;
      },

      _updatePreviewHeight: function() {
        var box = html.getContentBox(this.domNode);
        var h = Math.max(box.h - 120, 150);

        //update preview height
        html.setStyle(this.preview.domNode, 'height', h + 'px');
      },

      _createChartResultLayer: function(){
        this._removeTempResultLayer();
        var layerInfo = lang.clone(this.currentAttrs.layerInfo);

        //override layerInfo
        // layerInfo.name = queryName;
        //ImageServiceLayer doesn't have drawingInfo
        if (!layerInfo.drawingInfo) {
          layerInfo.drawingInfo = {};
        }

        layerInfo.drawingInfo.transparency = 0;
        layerInfo.minScale = 0;
        layerInfo.maxScale = 0;
        layerInfo.effectiveMinScale = 0;
        layerInfo.effectiveMaxScale = 0;
        layerInfo.defaultVisibility = true;
        delete layerInfo.extent;

        //only keep necessary fields
        // var singleQueryLoader = new SingleQueryLoader(this.map, currentAttrs);
        // var necessaryFieldNames = singleQueryLoader.getOutputFields();
        // layerInfo.fields = array.filter(layerInfo.fields, lang.hitch(this, function(fieldInfo) {
        //   return necessaryFieldNames.indexOf(fieldInfo.name) >= 0;
        // }));
        var featureCollection = {
          layerDefinition: layerInfo,
          featureSet: null
        };

        //For now, we should not add the FeatureLayer into map.
        this.tempResultLayer = new FeatureLayer(featureCollection);
        this.map.addLayer(this.tempResultLayer);

        var symbol = symbolJsonUtils.fromJson(this.currentAttrs.config.symbol);
        var renderer = new SimpleRenderer(symbol);

        //set renderer
        this.tempResultLayer.setRenderer(renderer);
      },

      _removeTempResultLayer: function(){
        if(this.tempResultLayer){
          this.map.removeLayer(this.tempResultLayer);
        }
        this.tempResultLayer = null;
      },

      //resovle {status,count,features}
      _query: function(where, outFields, /*optional*/ geometry){
        if(!where){
          where = "1=1";
        }

        var options = {};
        options.url = this.currentAttrs.config.url;
        options.layerInfo = this.currentAttrs.layerInfo;
        options.limit = 10 * 1000;
        options.spatialReference = this.map.spatialReference;
        options.where = where;
        options.geometry = geometry;
        options.outFields = outFields;

        var query = new Query(options);
        return query.getFeatures();
      },

      _clearResultPage: function(){
        if(this.previewPopup){
          this.previewPopup.close();
          this.previewPopup = null;
        }
        this.previewArgs = null;
        this.preview.clear();
        this._hideInfoWindow();
      },

      _zoomToLayer: function(gl) {
        var graphics;
        if (gl.graphics && gl.graphics.length > 0) {
          //some graphics maybe don't have geometry or have invaild geometry,
          //so need to filter graphics here by geometry
          graphics = gl.graphics.filter(function(g) {
            var geometry = g.geometry;
            //if geometry.type is not point, return true
            if(geometry.type !== 'point'){
              return true;
            }else{
              return jimuUtils.isVaildPointGeometry(geometry);
            }
          }.bind(this));
        }
        if (graphics && graphics.length > 0) {
          var featureSet = jimuUtils.toFeatureSet(graphics);
          try {
            jimuUtils.zoomToFeatureSet(this.map, featureSet);
          } catch (e) {
            console.error(e);
          }
        }
      },

      _showQueryErrorMsg: function(/* optional */ msg){
        new Message({message: msg || this.nls.queryError});
      },

      _hideInfoWindow: function(){
      },

      _onBtnResultsBackClicked: function(){
        var showDom, hideDom;

        showDom = this.chartParams;
        hideDom = this.chartList;

        html.setStyle(hideDom, 'display', 'none');
        html.setStyle(showDom, {
          display: 'block',
          left: '-100%'
        });
        this._slide(showDom, -100, 0);
        this._slide(this.chartResults, 0, 100);
      }

    });
  });