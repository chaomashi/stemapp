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
define(["dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/dom-class",
  "dojo/on",
  "dojo/query",
  "dojo/string",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!./Chart.html",
  "dojo/i18n!../nls/strings",
  "./chart-util",
  "libs/echarts/echarts",
  "esri/Color",
  "esri/graphic",
  "esri/layers/FeatureLayer",
  "esri/layers/GraphicsLayer",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/tasks/query",
  "esri/toolbars/draw",
  "dijit/form/RadioButton",
  "dijit/form/Select"],
function(declare, lang, array, domClass, on, query, djString, _WidgetBase,
  _TemplatedMixin, _WidgetsInTemplateMixin, template, i18n, chartUtil, echarts,
  Color, Graphic, FeatureLayer, GraphicsLayer, SimpleLineSymbol, SimpleFillSymbol,
  Query, Draw) {

  var _def = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

    baseClass: "jimu-widget-suitability-modeler-chart",
    i18n: i18n,
    templateString: template,

    map: null,
    wroWidget: null,

    _activeDfd: null,
    _activeMode: null,
    _activeTool: null,
    _draw: null,
    _echart: null,
    _graphicsLayer: null,
    _isActive: false,
    _polygonSymbol: null,
    _polygonSelectionSymbol: null,
    _seriesData: null,
    _subjectLayerId: null,

    postCreate: function() {
      this.inherited(arguments);
      this._seriesData = {};
      this.promptNode.innerHTML = i18n.chart.prompt;
      this.workingNode.title = i18n.chart.working;
      this.polygonTool.title = i18n.chart.polygonTool;
      this.freehandPolygonTool.title = i18n.chart.freehandPolygonTool;
      this.selectTool.title = i18n.chart.selectTool;
      this.panTool.title = i18n.chart.panTool;
      this.clearButton.innerHTML = i18n.chart.clearButton;
      this.clearButton.title = i18n.chart.clearButton;
      this.noModelLayerNode.innerHTML = i18n.chart.noModelLayer;
      this.noSubjectLayersNode.innerHTML = i18n.chart.noSubjectLayers;
    },

    startup: function() {
      if (this._started) {
        return;
      }
      this.inherited(arguments);
      this._init();
    },

    destroy: function() {
      try {
        if (this._graphicsLayer) {
          this._graphicsLayer.clear();
          if (this.map) {
            this.map.removeLayer(this._graphicsLayer);
          }
        }
        this._clearImageLayerHandles();
        this._clearSubjectLayerHandles();
      } catch(ex) {
        console.warn("Error destroying SuitabilityChart");
        console.error(ex);
      }
      this.inherited(arguments);
    },

    activate: function() {
      this._isActive = true;
      this._deactivateDraw();
      var modelLayer = this._getModelLayer();
      if (!modelLayer) {
        this.headerNode.style.display = "none";
        this.noModelLayerNode.style.display = "";
        this._updateSeries();
      } else {
        this._watchImageLayer(modelLayer);
        this.headerNode.style.display = "";
        this.noModelLayerNode.style.display = "none";
        if (!this._echart) {
          this._initEChart();
        }
        this._populateSubjectLayers();
        if (this._activeMode === "draw") {
          this._activateDraw();
        } else if (this._activeMode === "select") {
          this._activateSelect();
        }
        this._reorderGraphicsLayer();
        this._refreshChartIfRequired();
      }
    },

    deactivate: function() {
      this._isActive = false;
      this._deactivateDraw();
    },

    /* ............................................................... */

    _activateDraw: function() {
      if (!this._activeTool) {
        this._activeTool = "polygon";
      }
      if (this._activeTool === "polygon") {
        this._activateDrawPolygon();
      } else if (this._activeTool === "freehandPolygon") {
        this._activateDrawFreehandPolygon();
      } else if (this._activeTool === "pan") {
        this._activatePan();
      }
      this._activeMode = "draw";
    },

    _activateDrawFreehandPolygon: function() {
      this._clearSelectionIf();
      this._toggleSelect(false);
      this._draw.activate(Draw.FREEHAND_POLYGON);
      this._disableInfoWindow();
      this._highlightTool("freehandPolygon");
      this._activeTool = "freehandPolygon";
      this._updateMode("draw");
    },

    _activateDrawPolygon: function() {
      this._clearSelectionIf();
      this._toggleSelect(false);
      this._draw.activate(Draw.POLYGON);
      this._disableInfoWindow();
      this._highlightTool("polygon");
      this._activeTool = "polygon";
      this._updateMode("draw");
    },

    _activatePan: function() {
      this._deactivateDraw();
      this._highlightTool("pan");
      this._activeTool = "pan";
    },

    _activateSelect: function() {
      this._toggleSelect(true);
      this._draw.activate(Draw.EXTENT);
      this._disableInfoWindow();
      this._highlightTool("select");
      this._activeTool = "select";
      this._updateMode("select");
    },

    _clearGraphics: function() {
      if (this._activeMode === "draw") {
        if (this._graphicsLayer) {
          this._graphicsLayer.clear();
          this._refreshChart();
        }
      } else if (this._activeMode === "select") {
        var subjectLayer = this._getSubjectLayer();
        if (subjectLayer && typeof subjectLayer.clearSelection === "function") {
          subjectLayer.clearSelection();
          this._refreshChart();
        }
      }
      this._toggleWorking(false);
    },

    _clearHandles: function(handles) {
      if (handles) {
        if (lang.isArray(handles)) {
          array.forEach(handles,function(h){
            h.remove();
          });
        } else {
          handles.remove();
        }
      }
    },

    _clearImageLayerHandles: function() {
      this._clearHandles(this._imageLayerHandles);
      this._watchingImageLayer = null;
      this._imageLayerHandles = null;
    },

    _clearSelectionIf: function() {
      if (this._activeMode !== "select") {
        return;
      }
      try {
        var subjectLayer = null;
        var id = this._subjectLayerId;
        if (this.map && typeof id === "string" && id.length > 0) {
          subjectLayer = this.map.getLayer(id);
        }
        if (subjectLayer &&
            typeof subjectLayer.clearSelection === "function" &&
            typeof subjectLayer.getSelectedFeatures === "function") {
          var graphics = subjectLayer.getSelectedFeatures();
          if (graphics && graphics.length > 0) {
            subjectLayer.clearSelection();
          }
        }
      } catch(ex) {
        console.warn("SuitabilityModeler: Error clearing selection");
        console.error(ex);
      }
    },

    _clearSubjectLayerHandles: function() {
      this._clearHandles(this._subjectLayerHandles);
      this._watchingSubjectLayer = null;
      this._subjectLayerHandles = null;
    },

    _deactivateDraw: function() {
      if (this._draw) {
        this._draw.deactivate();
      }
      this._enableInfoWindow();
    },

    _disableInfoWindow: function() {
      if (this.map) {
        this.map.setInfoWindowOnClick(false);
      }
    },

    _enableInfoWindow: function() {
      if (this.map) {
        this.map.setInfoWindowOnClick(true);
      }
    },

    _getGraphics: function() {
      if (this._activeMode === "draw") {
        if (this._graphicsLayer) {
          return this._graphicsLayer.graphics;
        }
      } else if (this._activeMode === "select") {
        var graphics;
        var subjectLayer = this._getSubjectLayer();
        if (subjectLayer) {
          this._subjectLayerId = subjectLayer.id;
          if (typeof subjectLayer.getSelectedFeatures === "function") {
            graphics = subjectLayer.getSelectedFeatures();
            if (graphics && graphics.length > 0) {
              return graphics;
            }
          }
        } else {
          this._subjectLayerId = null;
        }
      }
      return null;
    },

    _getLayerName: function(layer) {
      /*
      if (layer._wabProperties &&
          typeof layer._wabProperties.originalLayerName === "string" &&
          layer._wabProperties.originalLayerName.length > 0) {
        if (layer.name !== layer._wabProperties.originalLayerName) {
          console.log("layer.name",layer.name);
          console.log("originalLayerName",layer._wabProperties.originalLayerName);
          return layer._wabProperties.originalLayerName;
        }
      }
      */
      return layer.name;
    },

    _getModelLayer: function() {
      if (this.wroWidget) {
        var layer = this.wroWidget.imageServiceLayer;
        if (layer && chartUtil.isWROModelLayer(layer)) {
          return layer;
        }
      }
      return null;
    },

    _getSeriesItem:function(item){
      if (!item.hex){
        item.hex = "transparent";
      }
      var seriesItem = {
        name: item.value,
        value: item.count,
        pct: item.pct,
        label: item.label,
        itemValue: item.value,
        hex: item.hex,
        itemStyle: {
          normal: {
            color: item.hex
          },
          emphasis: {
            color: item.hex
          }
        }
      };
      return seriesItem;
    },

    _getSubjectLayer: function() {
      if (this.map) {
        var id = this.subjectLayerSelect.get("value");
        if (typeof id === "string" && id.length > 0) {
          return this.map.getLayer(id);
        }
      }
      return null;
    },

    _highlightTool: function(name) {
      query(".icon",this.toolsSection).forEach(function(nd){
        if (nd.getAttribute("data-tool") === name) {
          domClass.add(nd,"selected");
        } else {
          domClass.remove(nd,"selected");
        }
      });
    },

    _init: function() {
      var self = this;
      this._polygonSymbol = new SimpleFillSymbol(
        "solid",
        new SimpleLineSymbol("solid", new Color([0,0,0,0.6]), 2),
        new Color([0,255,255,0.4])
      );
      this._polygonSelectionSymbol = new SimpleFillSymbol(
        "solid",
        new SimpleLineSymbol("solid", new Color([0,0,0,0.6]), 2),
        new Color([0,255,255,0.4])
      );
      this._graphicsLayer = new GraphicsLayer();
      this.map.addLayer(this._graphicsLayer);

      this._draw = new Draw(this.map,{});
      this.own(this._draw.on("draw-complete",function(result){
        if (result && result.geometry) {
          self._whenDrawComplete(result.geometry);
        }
      }));

      this._toggleWorking(false);
      this._activeMode = "draw";

      this.own(on(this.subjectLayerSelect,"change",function(){
        self._clearSelectionIf();
        self._seriesData.select = null;
        self._watchSubjectLayer(self._getSubjectLayer());
        if (self._activeMode === "select") {
          self._refreshChart(); // only if necessary?
        }
      }));

      this.own(this.map.on("layer-add",function(params){
        //console.log("layer-add",params);
        if (params && chartUtil.isPolygonLayer(params.layer)) {
          self._populateSubjectLayers();
        }
      }));

      this.own(this.map.on("layer-remove",function(params){
        //console.log("layer-remove",params);
        if (params && chartUtil.isPolygonLayer(params.layer)) {
          var layer = self._getSubjectLayer();
          self._populateSubjectLayers();
          if (!layer || layer === params.layer) {
            self._seriesData.select = null;
            if (self._activeMode === "select") {
              self._refreshChart();
            }
          }
        }
      }));
    },

    _initEChart: function() {
      var msg;
      var option = {
        title: {
          show: false
        },
        tooltip : {
          trigger: 'item',
          confine: true,
          formatter: function(params) {
            if (params && params.data && typeof params.data.label === "string") {
              msg = i18n.chart.tipPattern;
              msg = djString.substitute(msg,{
                category: params.data.itemValue,
                label: params.data.label,
                percent: params.data.pct
              });
              return msg;
            }
            msg = i18n.chart.tipPattern2;
            msg = djString.substitute(msg,{
              category: params.name,
              percent: params.percent
            });
            return msg;
          }
        },
        series : [
          {
            name: "Series",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: []
          }
        ]
      };
      this._echart = echarts.init(this.echartDiv,"light");
      this._echart.setOption(option,true);
    },

    _populateSubjectLayers: function() {
      var self = this, map = this.map, options = [], selId = this._subjectLayerId;
      if (map) {
        var ids = map.graphicsLayerIds.slice(0).reverse();
        array.forEach(ids,function(id) {
          var layer = map.getLayer(id);
          if (chartUtil.isPolygonLayer(layer)) {
            var option = {
              label: self._getLayerName(layer),
              value: layer.id
            };
            if (selId === layer.id) {
              option.selected = "selected";
            }
            options.push(option);
          }
        });
        this.subjectLayerSelect.removeOption(this.subjectLayerSelect.getOptions());
        this.subjectLayerSelect.addOption(options);
      }
      if (map && options.length > 0) {
        this.subjectLayerSelect.domNode.style.display = "";
        this.noSubjectLayersNode.style.display = "none";
      } else {
        this.subjectLayerSelect.domNode.style.display = "none";
        this.noSubjectLayersNode.style.display = "";
      }
      this._watchSubjectLayer(this._getSubjectLayer());
    },

    _refreshChart: function() {
      if (!this._isActive) {
        return;
      }
      var self = this, data = [], labels = [];
      var mode = this._activeMode || "unknown";
      var layer = this._getModelLayer();
      var graphics = this._getGraphics();
      this._seriesData[mode] = null;
      if (layer && graphics && graphics.length > 0) {
        this._toggleWorking(true);
        var dfd = this._activeDfd = chartUtil.computeHistograms(i18n,layer,graphics);
        dfd.then(function(result){
          //console.log("_refreshChart result",result);
          if (!dfd.isCanceled() && dfd === self._activeDfd) {
            self._toggleWorking(false);
            // noData?
            array.forEach(result.colorCounts,function(item){
              if (item.count > 0) {
                data.push(self._getSeriesItem(item));
                labels.push(item.label);
              }
            });
            self._seriesData[mode] = data;
            self._updateSeries(data,labels);
          }
        }).otherwise(function(error){
          // show this error?
          console.warn("SuitabilityChart: Error computing histograms");
          console.error(error);
          if (!dfd.isCanceled() && dfd === self._activeDfd) {
            self._toggleWorking(false);
            self._updateSeries(); // clear the chart
          }
        });
      } else {
        this._updateSeries(); // clear the chart
      }
    },

    _refreshChartIfRequired: function() {
      var mode = this._activeMode || "_";
      if (this._seriesData[mode]) {
        this._updateSeries(this._seriesData[mode]);
      } else {
        this._refreshChart();
      }
    },

    _reorderGraphicsLayer: function() {
      if (this.map && this._graphicsLayer) {
        var idx = this.map.graphicsLayerIds.length;
        this.map.reorderLayer(this._graphicsLayer,idx);
      }
    },

    _toggleSelect: function(show) {
      if (show) {
        //this.selectContainer.style.display = "";
        this.selectContainer.style.visibility = "visible";
        this._graphicsLayer.setVisibility(false);
      } else {
        //this.selectContainer.style.display = "none";
        this.selectContainer.style.visibility = "hidden";
        this._graphicsLayer.setVisibility(true);
      }
    },

    _toggleWorking: function(show) {
      if (show) {
        this.workingNode.style.visibility = "visible";
      } else {
        this.workingNode.style.visibility = "hidden";
      }
    },

    _updateMode: function(mode) {
      if (this._activeMode !== mode) {
        this._activeMode = mode;
        this._refreshChartIfRequired();
      }
    },

    _updateSeries: function(data) {
      data = data || [];
      if (this._echart) {
        var series = [{data: data}];
        this._echart.setOption({series: series});
      }
      var line, lines, v;
      lines = "<table class='series-table'><tbody>";
      array.forEach(data,function(item){
        v = djString.substitute(i18n.chart.labelPattern,{
          category: item.itemValue,
          label: item.label
        });
        line = "<tr>";
        line += "<td class='color-cell'";
        line += " style='background-color:"+item.hex+";'";
        line += "></td>";
        line += "<td>"+v+"</td>";
        line += "<td class='num'>"+item.pct+"%</td>";
        line += "</tr>";
        lines += line;
      });
      lines += "</tbody></table>";
      this.tableNode.innerHTML = lines;
    },

    _watchImageLayer: function(layer) {
      if (layer && layer === this._watchingImageLayer) {
        return;
      }
      var self = this;
      this._clearImageLayerHandles();
      if (layer) {
        this._watchingImageLayer = layer;
        this._imageLayerHandles = [];
        this._imageLayerHandles.push(layer.on("rendering-change",function(){
          //console.log("Chart: rendering-change",new Date());
          self._seriesData = {};
        }));
      } else {
        this._watchingImageLayer = null;
      }
    },

    _watchSubjectLayer: function(layer) {
      if (layer && layer === this._watchingSubjectLayer) {
        return;
      }
      var self = this;
      this._clearSubjectLayerHandles();
      if (layer) {
        this._watchingSubjectLayer = layer;
        this._subjectLayerHandles = [];
        this._subjectLayerHandles.push(layer.on("selection-complete",function(){
          //console.log("Chart: selection-complete",new Date());
          self._seriesData.select = null;
          if (self._activeMode === "select") {
            self._refreshChart();
          }
        }));
        this._subjectLayerHandles.push(layer.on("selection-clear",function(){
          //console.log("Chart: selection-clear",new Date());
          self._seriesData.select = null;
          if (self._activeMode === "select") {
            self._refreshChart();
          }
        }));
        this._subjectLayerHandles.push(layer.on("edits-complete",function(){
          //console.log("Chart: edits-complete",new Date());
          self._seriesData.select = null;
          if (self._activeMode === "select") {
            self._refreshChart();
          }
        }));
        /*
        this._subjectLayerHandles.push(layer.on("graphic-remove",function(){
          //console.log("Chart: graphic-remove",new Date());
        }));
        this._subjectLayerHandles.push(layer.on("graphics-clear",function(){
          //console.log("Chart: graphics-clear",new Date());
        }));
        */
      } else {
        this._watchingSubjectLayer = null;
      }
    },

    _whenDrawComplete: function(geometry) {
      if (this._activeMode === "draw") {
        var symbol = this._polygonSymbol;
        var graphic = new Graphic(geometry, symbol);
        this._graphicsLayer.add(graphic);
        this._refreshChart();
      } else if (this._activeMode === "select") {
        var subjectLayer = this._getSubjectLayer();
        if (subjectLayer && typeof subjectLayer.selectFeatures === "function") {
          if (!subjectLayer.getSelectionSymbol()) {
            subjectLayer.setSelectionSymbol(this._polygonSelectionSymbol);
          }
          var selMode = FeatureLayer.SELECTION_NEW;
          var q = new Query();
          q.geometry = geometry;
          subjectLayer.selectFeatures(q,selMode).then(function(){
            // handled by "selection-complete" event
          }).otherwise(function(err){
            // show this error?
            console.warn("Error selecting features.");
            console.error(err);
          });
        }
      }
    }

  });

  return _def;
});
