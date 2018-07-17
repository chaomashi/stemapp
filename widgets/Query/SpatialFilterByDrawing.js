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
  'dojo/on',
  'dojo/Evented',
  'dojo/_base/html',
  'dojo/_base/lang',
  'jimu/symbolUtils',
  'jimu/dijit/DrawBox',
  'jimu/dijit/SearchDistance',
  'esri/graphic',
  'esri/symbols/jsonUtils',
  'esri/layers/GraphicsLayer',
  'esri/renderers/SimpleRenderer',
  'esri/geometry/geometryEngine'
],
function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, on, Evented, html, lang,
  jimuSymbolUtils, DrawBox, SearchDistance, Graphic, symbolJsonUtils, GraphicsLayer, SimpleRenderer,
  geometryEngine) {

  //1. draw a geometry
  //2. clear bufferLayer
  //3. create a new buffer immediately (if enable SearchDistance)
  //4. if SearchDistance disabled, clear bufferLayer
  //5. if SearchDistance enabled and value changed, create a new buffer
  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
    baseClass: 'jimu-query-spatial-filter-drawing',
    templateString: '<div>' +
      '<div data-dojo-attach-point="drawBoxDiv"></div>' +
      '<div class="search-distance-div" data-dojo-attach-point="searchDistanceDiv"></div>' +
    '</div>',
    map: null,
    bufferLayer: null,

    //constructor options:
    drawBoxOption: null,
    nls: null,
    enableBuffer: true,
    distance: 0,
    unit: '',

    //public methods:
    //reset
    //deactivate
    //getGeometry

    //events:
    //change
    //search-distance-change

    postCreate:function(){
      this.inherited(arguments);

      //init bufferLayer
      this.map = this.drawBoxOption.map;
      this.bufferLayer = new GraphicsLayer();
      var bufferSymbol = symbolJsonUtils.fromJson({
        "style": "esriSFSSolid",
        "color": [79, 129, 189, 77],
        "type": "esriSFS",
        "outline": {
          "style": "esriSLSSolid",
          "color": [54, 93, 141, 255],
          "width": 1.5,
          "type": "esriSLS"
        }
      });
      var renderer = new SimpleRenderer(bufferSymbol);
      this.bufferLayer.setRenderer(renderer);
      this.map.addLayer(this.bufferLayer);

      // init DrawBox
      this.drawBoxOption.showClear = true;
      this.drawBoxOption.keepOneGraphic = true;
      this.drawBox = new DrawBox(this.drawBoxOption);
      this.drawBox.setPolygonSymbol(bufferSymbol);
      var pinSymbol = jimuSymbolUtils.getGreyPinMarkerSymbol();
      this.drawBox.setPointSymbol(pinSymbol);
      this.drawBox.setLineSymbol(symbolJsonUtils.fromJson({
        "color": [79, 129, 189, 255],
        "width": 1.5,
        "type": "esriSLS",
        "style": "esriSLSDash"
      }));
      this.drawBox.placeAt(this.drawBoxDiv);
      this.own(on(this.drawBox, 'user-clear', lang.hitch(this, this._onDrawBoxClear)));
      this.own(on(this.drawBox, 'draw-end', lang.hitch(this, this._onDrawEnd)));
      if(this.drawBox.btnClear){
        html.removeClass(this.drawBox.btnClear, 'jimu-float-trailing');
      }else{
        html.addClass(this.drawBox.btnClear, 'jimu-float-leading');
      }

      // init SearchDistance
      this.searchDistance = new SearchDistance({
        distance: this.distance,
        unit: this.unit
      });
      this.searchDistance.placeAt(this.searchDistanceDiv);
      if(this.enableBuffer){
        this.searchDistance.enable();
        this.own(on(this.searchDistance, 'change', lang.hitch(this, this._onSearchDistanceChange)));
      }else{
        this.searchDistance.disable();
        html.setStyle(this.searchDistanceDiv, 'display', 'none');
      }
    },

    reset: function(resetSearchDistance){
      this.drawBox.reset();
      this.clearAllGraphics();
      if(resetSearchDistance){
        this.searchDistance.reset();
        this.searchDistance.setDistance(this.distance);
        this.searchDistance.setUnit(this.unit);
      }
    },

    clearAllGraphics: function(){
      this.drawBox.clear();
      this._clearBufferLayer();
    },

    hideTempLayers: function(){
      if(this.bufferLayer){
        this.bufferLayer.hide();
      }
      if(this.drawBox){
        this.drawBox.hideLayer();
      }
    },

    showTempLayers: function(){
      if(this.bufferLayer){
        this.bufferLayer.show();
      }
      if(this.drawBox){
        this.drawBox.showLayer();
      }
    },

    deactivate: function(){
      if(this.drawBox){
        this.drawBox.deactivate();
      }
    },

    isValidSearchDistance: function(){
      return this._getStatusOfSearchDistance() >= 0;
    },

    //return {status,geometry}
    //status -1 means invalid search distance
    //status 0 means user doesn't draw anything
    //status 1 means geometry is not null
    getGeometryInfo: function(){
      var result = {
        status: 0,
        geometry: null
      };
      var status = this._getStatusOfSearchDistance();
      if(status < 0){
        //invalid search distance
        result.status = -1;
        result.geometry = null;
        this.searchDistance.tryShowValidationError();
      }else if(status === 0){
        //SearchDistance is disabled or enabled with distance 0 needn't buffer
        result.geometry = this._getGeometryFromDrawBox();
        if(result.geometry){
          result.status = 1;
        }else{
          //user doesn't draw anything
          // new Message({
          //   message: this.nls.specifySpatialFilterMsg
          // });
          result.status = 0;
        }
      }else if(status > 0){
        //SearchDistance is enabled with a positive distance
        if(this.bufferLayer.graphics.length > 0){
          result.geometry = this.bufferLayer.graphics[0].geometry;
        }

        if(result.geometry){
          result.status = 1;
        }else{
          //user doesn't draw anything
          result.status = 0;
        }
      }

      return result;
    },

    _getGeometryFromDrawBox: function(){
      var geometry = null;
      var graphic = this.drawBox.getFirstGraphic();
      if(graphic){
        geometry = graphic.geometry;
      }
      return geometry;
    },

    _getGeometryFromBufferLayer: function(){
      var geometry = null;
      if(this.bufferLayer.graphics.length > 0){
        geometry = this.bufferLayer.graphics[0].geometry;
      }
      return geometry;
    },

    //-1 means SearchDistance is enabled with invalid distance number
    //0 means SearchDistance is not enabled or enabled with distance 0
    //1 means SearchDistance is enabled with valid distance number
    _getStatusOfSearchDistance: function(){
      return this.searchDistance.getStatus();
    },

    _onSearchDistanceChange: function(){
      this._updateBuffer();
    },

    _onDrawBoxClear: function(){
      this._clearBufferLayer();
    },

    _onDrawEnd: function(){
      this._updateBuffer();
    },

    _clearBufferLayer: function(){
      if(this.bufferLayer){
        this.bufferLayer.clear();
      }
      this.emit("change");
    },

    _updateBuffer: function(){
      this._clearBufferLayer();
      var status = this._getStatusOfSearchDistance();

      if(status > 0){
        var geometry = this._getGeometryFromDrawBox();
        if(geometry){
          var data = this.searchDistance.getData();
          geometry = geometryEngine.simplify(geometry);
          var sr = geometry.spatialReference;
          var bufferGeometry = null;
          if(sr.isWebMercator() || sr.wkid === 4326){
            bufferGeometry = geometryEngine.geodesicBuffer(geometry, data.distance, data.bufferUnit, true);
          }else{
            bufferGeometry = geometryEngine.buffer(geometry, data.distance, data.bufferUnit, true);
          }
          var bufferGraphic = new Graphic(bufferGeometry);
          this.bufferLayer.add(bufferGraphic);
        }
      }
      this.emit("change");
    },

    destroy: function(){
      if(this.bufferLayer){
        this.map.removeLayer(this.bufferLayer);
      }
      this.bufferLayer = null;
      this.inherited(arguments);
    }

  });
});