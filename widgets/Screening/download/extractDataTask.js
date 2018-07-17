///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/Evented',
  'jimu/BaseWidget',
  'esri/tasks/Geoprocessor',
  'dojo/Deferred',
  'esri/tasks/FeatureSet',
  'esri/graphic'
], function (
  declare,
  lang,
  Evented,
  BaseWidget,
  Geoprocessor,
  Deferred,
  FeatureSet,
  Graphic
) {
  return declare([BaseWidget, Evented], {
    // Set base class for custom widget
    baseClass: 'jimu-widget-screening-extract-data-task',

    _extractDataTaskGPService: null,
    choiceList: {
      "filegdb": "File Geodatabase - GDB - .gdb",
      "shapefile": "Shapefile - SHP - .shp"
    },

    constructor: function (options) {
      this._extractDataTaskGPService = null;
      this.choiceList = {
        "filegdb": "File Geodatabase - GDB - .gdb",
        "shapefile": "Shapefile - SHP - .shp"
      };
      lang.mixin(this, options);
    },

    startup: function () {
      this._extractDataTaskGPService = new Geoprocessor(this.url);
      this._init();
    },

    /**
     * Initialize extract data process based in configuration settings
     * @memberOf download/extractDataTask
     */
    _init: function () {
      var params, deferred = new Deferred();
      var graphic = new Graphic(), features = [], featureSet = new FeatureSet();
      graphic.geometry = this.aoi.geometry;
      features.push(graphic);
      featureSet = new FeatureSet();
      featureSet.features = features;
      featureSet.displayFieldName = "";
      featureSet.geometryType = "esriGeometryPolygon";
      featureSet.spatialReference = this.map.spatialReference;
      featureSet.fields = [];
      featureSet.exceededTransferLimit = false;
      params = {
        "Area_of_Interest": featureSet,
        "Feature_Format": this.choiceList[this.fileFormat]
      };
      this._extractDataTaskGPService.submitJob(params, lang.hitch(this, function (
        jobInfo) {
        this._extractDataTaskGPService.getResultData(jobInfo.jobId, "Output_Zip_File",
          lang.hitch(this, this.onGPTaskSuccess),
          lang.hitch(this, this.onGPTaskFailed));
      }),
        lang.hitch(this, this.onGPTaskStatusUpdate),
        lang.hitch(this, this.onGPTaskFailed)
      );
      return deferred.promise;
    },

    /**
     * Success callback
     * @memberOf download/extractDataTask
     */
    onGPTaskSuccess: function (response) {
      this.emit("onGPTaskSuccess", response.value.url);
    },

    /**
     * Status update callback
     * @memberOf download/extractDataTask
     */
    onGPTaskStatusUpdate: function (status) {
      this.emit("onGPTaskStatusUpdate", status);
    },

    /**
     * Failure callback
     * @memberOf download/extractDataTask
     */
    onGPTaskFailed: function (err) {
      this.emit("onGPTaskFailed", err);
    }
  });
});