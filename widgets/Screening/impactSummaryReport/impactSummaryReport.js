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
  'dojo/text!./impactSummaryReport.html',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/Evented',
  'jimu/BaseWidget',
  'dojo/on',
  'dojo/dom-class',
  'dojo/dom-attr',
  'esri/geometry/geometryEngine',
  'esri/geometry/Polyline',
  'esri/SpatialReference',
  'esri/graphic',
  'dojo/dom-construct',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'dojo/Deferred',
  '../geometryUtils',
  '../conversionUtils',
  '../highlightSymbolUtils',
  '../fieldSelectorPopup/fieldSelectorPopup',
  'esri/lang',
  'jimu/utils',
  'dojo/query',
  'dojo/number',
  'dojo/promise/all'
], function (
  declare,
  template,
  _WidgetsInTemplateMixin,
  lang,
  array,
  Evented,
  BaseWidget,
  on,
  domClass,
  domAttr,
  GeometryEngine,
  Polyline,
  SpatialReference,
  Graphic,
  domConstruct,
  Query,
  QueryTask,
  Deferred,
  geometryUtils,
  conversionUtils,
  highlightSymbolUtils,
  fieldSelectorPopup,
  esriLang,
  jimuUtils,
  query,
  dojoNumber,
  all
) {
  return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {

    // Set base class for custom impactSummaryReport widget
    baseClass: 'jimu-widget-screening-impactSummaryReport',

    templateString: template,

    _feetUnitData: [], // to store standard feet/sq. feet of intersected feature
    _milesUnitData: [], // to store miles/acres of intersected feature
    _metersUnitData: [], // to store meter/square-meter of intersected feature
    _kilometersUnitData: [], // to store area/squarekilometers of intersected feature
    _hectaresUnitData: [], // to store area/hectares of intersected feature
    _printCompleteData: {}, // to store complete data needed for print dijit
    _printData: {}, // to store filtered data needed for print dijit
    _feetUnitInfo: [], // to store area of features in feet unit
    _milesUnitInfo: [], // to store area of features in mile unit
    _metersUnitInfo: [], // to store area of features in meters unit
    _kilometersUnitInfo: [], // to store area of features in kilometer unit
    _hectaresUnitInfo: [], // to store area of features in kilometer/hectares unit
    _intersectFeatureCount: 0, //to store the count of features intersected to AOI
    isExceedingMaxRecordCount: false, //flag to set if intersecting features exceeds maxRecordCount
    // to store array of ids intersecting to tolerance graphics
    intersectingFeatureIdsToTolerance: [],
    intersectingFeatureIds: [], // to store array of ids intersecting to tolerance graphics
    _analysisUnitsArray: [], //to get reports in defined units
    _aggregatedFeatureGeometries: [], //to store all geometries which will be used for highlighting
    _featureIntersectResultArr: [], //to store all features

    constructor: function (options) {
      this._feetUnitData = [];
      this._milesUnitData = [];
      this._metersUnitData = [];
      this._kilometersUnitData = [];
      this._hectaresUnitData = [];
      this._printCompleteData = {};
      this._printData = {};
      this._feetUnitInfo = [];
      this._milesUnitInfo = [];
      this._metersUnitInfo = [];
      this._kilometersUnitInfo = [];
      this._hectaresUnitInfo = [];
      this._intersectFeatureCount = 0;
      this.isExceedingMaxRecordCount = false;
      this.intersectingFeatureIdsToTolerance = [];
      this.intersectingFeatureIds = [];
      this._analysisUnitsArray = [];
      this._aggregatedFeatureGeometries = [];
      this._featureIntersectResultArr = [];
      lang.mixin(this, options);
    },

    postCreate: function () {
      this._analysisUnitsArray = ["Feet", "Miles", "Meters", "Kilometers", "Hectares"];
      this.own(on(this.impactSummaryLayerMaxRecordHint, "click", lang.hitch(this, function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (this.isExceedingMaxRecordCount) {
          this.emit("showMessage", this.nls.reportsTab.unableToAnalyzeText);
        } else {
          this.emit("showMessage", this.nls.reportsTab.layerNotVisibleText);
        }
      })));
    },

    /**
     * This function is used to display following things when layer is not visible
     * 1. Display message as layer not analyzed
     * 2. Display exclamation icon
     * 3. Hide the count
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _displayLayerNotVisibleText: function () {
      domClass.add(this.impactSummaryLayerFeatureCount, "esriCTHidden");
      domClass.remove(this.layerTitleAndFieldParentContainer, "esriCTLayerSectionDisabled");
      domAttr.set(this.impactSummaryLayerMaxRecordHint, "title",
        this.nls.reportsTab.layerNotVisibleText);
      domClass.remove(this.impactSummaryLayerMaxRecordHint, "esriCTHidden");
      domClass.add(this.impactSummaryLayerTitle, "esriCTLayerTitleOverrideWidth");
      this._showMessage(this.nls.reportsTab.layerNotVisibleText);
    },

    /**
     * This function is used to set the layer title, attach events
     * and generate layer details by calling its functions
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    generateReport: function (bufferGeometry, completeToleranceGeometry, allPointGeometries) {
      var deferred, cutterPolylineArr, featureLayerInfo;
      deferred = new Deferred();
      this._setAttributeToFeatureLayerContainer();
      this._setFeatureLayerTitle();
      this._attachEventToLayerTitle();
      this._aggregatedFeatureGeometries = [];
      this._featureIntersectResultArr = [];
      featureLayerInfo = this.layerInfosObj.getLayerInfoById(this.featureLayer.id);
      if ((featureLayerInfo && featureLayerInfo.isVisible() && featureLayerInfo.isInScale()) ||
        (featureLayerInfo && !featureLayerInfo.isVisible() && !this.config.allowVisibleLayerAnalysisOnly) ||
        (featureLayerInfo && !featureLayerInfo.isInScale() && !this.config.allowVisibleLayerAnalysisOnly) ||
        (this.isFeatureCollectionLayer)) {
        //first get intersecting features to only point geometries
        this._getIntersectingFeaturesCount(allPointGeometries).then(lang.hitch(this,
          function (intersectingIdsToPoint) {
            //Second get intersecting features to tolerance geometries
            //If tolerance is set all point/line graphics will be considered here
            this._getIntersectingFeaturesCount(completeToleranceGeometry).then(lang.hitch(this,
              function (intersectingIdsToTolerance) {
                //get unique ids for point and line
                this.intersectingFeatureIdsToTolerance =
                  this._getUniqueIds(intersectingIdsToPoint, intersectingIdsToTolerance);
                //Third get all intersecting features to polygon
                //this function is used to get the array of feature object id within AOI
                this._getIntersectingFeaturesCount(bufferGeometry).then(lang.hitch(this,
                  function (intersectingFeatureIds) {
                    var geometryToGetChunks;
                    this.intersectingFeatureIds = lang.clone(intersectingFeatureIds);
                    intersectingFeatureIds = this._getUniqueIds(intersectingIdsToTolerance,
                      intersectingFeatureIds);
                    //Don't analyze if exceedingMaxRecordCount
                    if (this.isExceedingMaxRecordCount) {
                      //Set the count of all intersecting features
                      this._setFeatureLayerIntersectFeatureCount(intersectingFeatureIds.length);
                      this._pushDataInPrintDataObj(this.configuredLayerLabel, null, null);
                      this._printData = {};
                      this._printData = lang.clone(this._printCompleteData);
                      this._showMessage(this.nls.reportsTab.unableToAnalyzeText);
                      //remove disable class from layer section container
                      domClass.remove(this.layerTitleAndFieldParentContainer,
                        "esriCTLayerSectionDisabled");
                      // Once all the geometry operations are performed and
                      // report is generated resolve the deferred.
                      this._showReport();
                      deferred.resolve(this._getReportLayerDetails([]));
                    } else {
                      geometryToGetChunks = bufferGeometry || completeToleranceGeometry;
                      // this function is used to get the features in chunks within AOI
                      this._getFeatureByChunks(intersectingFeatureIds, geometryToGetChunks).then(
                        lang.hitch(this, function (intersectFeatureArr) {
                          var filteredIntersectedFeature, featureIntersectResultArr;
                          filteredIntersectedFeature = [];
                          this._featureIntersectResultArr = [];
                          array.forEach(intersectFeatureArr,
                            lang.hitch(this, function (intersectedFeature) {
                              if ((!bufferGeometry) ||
                                (!(GeometryEngine.touches(intersectedFeature.geometry,
                                  bufferGeometry)))) {
                                filteredIntersectedFeature.push(intersectedFeature);
                              }
                            }));
                          featureIntersectResultArr = [];
                          //Set the count of all intersecting features
                          this._setFeatureLayerIntersectFeatureCount(
                            filteredIntersectedFeature.length);
                          // Check if any features are intersecting else set no result found
                          if (filteredIntersectedFeature.length > 0) {
                            // In case of polygon and polyline get cut/within geometry features
                            // and for points directly used the intersected features
                            if ((this.featureLayer.geometryType === "esriGeometryPolyline" ||
                              this.featureLayer.geometryType === "esriGeometryPolygon") &&
                              bufferGeometry) {
                              cutterPolylineArr = this._polygonToPolyline(bufferGeometry);
                              featureIntersectResultArr =
                                this._getCutOrWithInFeatures(cutterPolylineArr,
                                  filteredIntersectedFeature, bufferGeometry);
                            } else {
                              featureIntersectResultArr = filteredIntersectedFeature;
                            }
                            //create detailed report
                            this._createLayerDetails(featureIntersectResultArr,
                              this.featureLayer.geometryType);
                            this._filterPrintDataObjAccToConfiguredFields(this.configuredField);
                            // remove disable class from layer field icon container which
                            // indicates that layer has finished processing
                            domClass.remove(this.impactSummaryLayerField,
                              "esriCTImpactSummaryLayerFieldIconDisabled");
                          } else {
                            this._pushDataInPrintDataObj(this.configuredLayerLabel, null, null);
                            this._printData = {};
                            this._printData = lang.clone(this._printCompleteData);
                            this._showMessage(this.nls.reportsTab.noDetailsAvailableText);
                          }
                          //remove disable class from layer section container
                          domClass.remove(this.layerTitleAndFieldParentContainer,
                            "esriCTLayerSectionDisabled");
                          this._featureIntersectResultArr = featureIntersectResultArr;
                          // Once all the geometry operations are performed and
                          // report is generated resolve the deferred.
                          this._showReport();
                          deferred.resolve(this._getReportLayerDetails(featureIntersectResultArr));
                        }));
                    }
                  }));
              }));
          }));
      } else {
        this._displayLayerNotVisibleText();
        deferred.resolve();
      }

      return deferred.promise;
    },

    /**
     * This function returns the reportDetails object
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getReportLayerDetails: function (featureIntersectResultArr) {
      var reportLayerDetails = {};
      reportLayerDetails.id = this.id;
      reportLayerDetails.featureLayerId = this.featureLayer.id;
      reportLayerDetails.features = featureIntersectResultArr;
      //set info for printing/reporting
      reportLayerDetails.printInfo = {};
      reportLayerDetails.printInfo.isExceedingMaxRecordCount = this.isExceedingMaxRecordCount;
      reportLayerDetails.printInfo.featureCount = this._intersectFeatureCount;
      reportLayerDetails.printInfo.info = this._printData;
      reportLayerDetails.printInfo.feetUnitInfo = this._feetUnitInfo;
      reportLayerDetails.printInfo.milesUnitInfo = this._milesUnitInfo;
      reportLayerDetails.printInfo.metersUnitInfo = this._metersUnitInfo;
      reportLayerDetails.printInfo.kilometersUnitInfo = this._kilometersUnitInfo;
      reportLayerDetails.printInfo.hectaresUnitInfo = this._hectaresUnitInfo;
      reportLayerDetails.printInfo.geometryType = this.featureLayer.geometryType;
      return reportLayerDetails;
    },

    /**
     * This function is used to set the featureLayerID attr in parent container of layer row
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _setAttributeToFeatureLayerContainer: function () {
      domAttr.set(this.impactSummaryLayerContainer, "featureLayerID", this.featureLayer.id);
    },

    /**
     * This function is used to set the name of layer
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _setFeatureLayerTitle: function () {
      if (!this.configuredLayerLabel) {
        this.configuredLayerLabel = this.featureLayer.name;
      }
      domAttr.set(this.impactSummaryLayerTitle, "innerHTML", this.configuredLayerLabel);
      domAttr.set(this.impactSummaryLayerTitle, "title", this.configuredLayerLabel);
    },

    /**
     * This function is used to attach click event to layer row
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _attachEventToLayerTitle: function () {
      this.own(on(this.layerTitleAndFieldParentContainer, "click",
        lang.hitch(this, function (evt) {
          if (domClass.contains(evt.target, "esriCTImpactSummaryLayerFieldIcon")) {
            //open field selector widget if the icon is not disabled
            if (!domClass.contains(this.impactSummaryLayerField,
              "esriCTImpactSummaryLayerFieldIconDisabled")) {
              this._createFieldSelectorPopupWidget();
            }
          } else {
            //open layer details section only if layer has finished processing
            if (!domClass.contains(this.layerTitleAndFieldParentContainer,
              "esriCTLayerSectionDisabled")) {
              this._showOrHideLayerDetailsContainer();
            }
          }
        })));
    },

    /**
     * This function is used create field selector widget for layer section
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _createFieldSelectorPopupWidget: function () {
      if (!this._fieldSelectorWidget) {
        this._fieldSelectorWidget = new fieldSelectorPopup({
          outFields: this.configuredField,
          popupTitle: this.configuredLayerLabel,
          fieldTitle: this.nls.reportsTab.selectReportFieldTitle,
          nls: this.nls,
          appConfig: this.appConfig
        });
        on(this._fieldSelectorWidget, "onFieldSelectComplete", lang.hitch(this,
          function (selectedFields) {
            this._filterFieldsForReport(selectedFields);
          }));
        this._fieldSelectorWidget.startup();
      } else {
        this._fieldSelectorWidget.onFieldsSelectorClick();
      }
      // Dart Theme change
      if (this.appConfig.theme.name === "DartTheme") {
        domClass.add(this._fieldSelectorWidget.fieldsPopup.domNode, "esriCTDartPanel");
      }
    },

    /**
     * This function is used filter the configured fields array as per user selection
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _filterFieldsForReport: function (selectedFields) {
      var cloneFields = lang.clone(this.configuredField), fieldName;
      for (fieldName in this.configuredField) {
        if (selectedFields.indexOf(fieldName) <= -1) {
          delete cloneFields[fieldName];
        }
      }
      this._filterPrintDataObjAccToConfiguredFields(cloneFields);
      //Remove highlight if fields are filtered for the layer in which some features are highlighted
      var prevSelectedNode = query(".esriCTAttrTableHighlighted", this.domNode.parentElement);
      if (prevSelectedNode && prevSelectedNode.length > 0) {
        if (domAttr.get(prevSelectedNode[0], "esriCTLayerId") === this.featureLayer.id) {
          domClass.remove(prevSelectedNode[0], "esriCTAttrTableHighlighted");
          this.highlightGraphicsLayer.clear();
        }
      }
      //after fields selection change show updated report for selected fields only
      this._showReport();
      this.emit("printDataUpdated",
        { "id": this.id, "printData": this._printData });
    },

    /**
     * This function is used to show/hide the layer details
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _showOrHideLayerDetailsContainer: function () {
      domClass.toggle(this.layerTitleAndFieldParentContainer, "esriCTBoldFont");
      domClass.toggle(this.impactSummaryLayerDetailContainer, "esriCTHidden");
      if (domClass.contains(this.layerSectionIcon, "esriCTLayerPanelExpand")) {
        domClass.replace(this.layerSectionIcon, "esriCTLayerPanelCollapse",
          "esriCTLayerPanelExpand");
      } else {
        domClass.replace(this.layerSectionIcon, "esriCTLayerPanelExpand",
          "esriCTLayerPanelCollapse");
      }
    },

    /**
     * This function is used to get the features count that intersects the AOI
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getIntersectingFeaturesCount: function (bufferGeometry) {
      var deferred, shapeFileIntersectFeatureArr, intersectGeometry, i;
      deferred = new Deferred();
      if (bufferGeometry) {
        if (this.isFeatureCollectionLayer) {
          shapeFileIntersectFeatureArr = [];
          if (this.featureLayer.graphics.length > 0) {
            for (i = 0; i < this.featureLayer.graphics.length; i++) {
              if (this.featureLayer.graphics[i].geometry) {
                intersectGeometry =
                  GeometryEngine.intersects(bufferGeometry,
                    this.featureLayer.graphics[i].geometry);
              } else {
                intersectGeometry = null;
              }
              if (intersectGeometry) {
                shapeFileIntersectFeatureArr.push(i);
              }
            }
          }
          deferred.resolve(shapeFileIntersectFeatureArr);
        } else {
          var queryObj, queryTask, appliedFilters;
          queryObj = new Query();
          queryTask = new QueryTask(this.featureLayer.url);
          appliedFilters = this.featureLayer.getDefinitionExpression();
          if (appliedFilters) {
            queryObj.where = appliedFilters;
          }
          queryObj.geometry = bufferGeometry;
          queryTask.executeForIds(queryObj, lang.hitch(this, function (objectIDArr) {
            if (!objectIDArr || objectIDArr.length === 0) {
              deferred.resolve([]);
            } else {
              // If length of features exceeding maxRecordCount than
              // show icon indicating unable to analyze
              if (objectIDArr.length > this.maxFeaturesForAnalysis) {
                domClass.remove(this.impactSummaryLayerMaxRecordHint, "esriCTHidden");
                domClass.add(this.impactSummaryLayerTitle, "esriCTLayerTitleOverrideWidth");
                this.isExceedingMaxRecordCount = true;
                this.emit("exceedingMaxRecordCount");
              }
              deferred.resolve(objectIDArr);
            }
          }));
        }
      } else {
        deferred.resolve([]);
      }
      return deferred.promise;
    },

    /**
     * This function is used to get the features in chunks
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getFeatureByChunks: function (intersectingFeatureIds, bufferGeometry) {
      var deferredList, deferred, chunkArr, chunkSize;
      deferred = new Deferred();
      deferredList = [];
      chunkArr = [];
      chunkSize = this.featureLayer.maxRecordCount;
      if (this.isFeatureCollectionLayer) {
        deferredList.push(this._getIntersectFeature(intersectingFeatureIds, bufferGeometry));
      } else {
        while (intersectingFeatureIds.length > 0) {
          deferredList.push(this._getIntersectFeature(intersectingFeatureIds.splice(0, chunkSize),
            bufferGeometry));
        }
      }
      all(deferredList).then(lang.hitch(this, function (featuresArr) {
        var intersectingFeatures;
        intersectingFeatures = [];
        array.forEach(featuresArr, lang.hitch(this, function (features) {
          intersectingFeatures = intersectingFeatures.concat(features);
        }));
        deferred.resolve(intersectingFeatures);
      }));
      return deferred.promise;
    },

    /**
     * This function is used to get the features that intersects the AOI
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getIntersectFeature: function (intersectingFeatureIds, bufferGeometry) {
      var deferred, shapeFileIntersectFeatureArr, i, intersectGeometry, queryTask,
        queryObj;
      deferred = new Deferred();
      if (this.isFeatureCollectionLayer) {
        shapeFileIntersectFeatureArr = [];
        if (this.featureLayer.graphics.length > 0) {
          for (i = 0; i < this.featureLayer.graphics.length; i++) {
            if (this.featureLayer.graphics[i].geometry) {
              intersectGeometry =
                GeometryEngine.intersects(bufferGeometry,
                  this.featureLayer.graphics[i].geometry);
            } else {
              intersectGeometry = null;
            }
            if (intersectGeometry) {
              shapeFileIntersectFeatureArr.push(this.featureLayer.graphics[i]);
            }
          }
        }
        deferred.resolve(shapeFileIntersectFeatureArr.splice(0, this.maxFeaturesForAnalysis));
      } else {
        queryObj = new Query();
        queryObj.outFields = ["*"];
        queryObj.returnGeometry = true;
        queryObj.objectIds = intersectingFeatureIds;
        queryObj.outSpatialReference = bufferGeometry.spatialReference;
        queryTask = new QueryTask(this.featureLayer.url);
        queryTask.execute(queryObj, lang.hitch(this, function (featureSet) {
          if (featureSet.features) {
            deferred.resolve(featureSet.features);
          } else {
            deferred.resolve([]);
          }
        }), lang.hitch(this, function () {
          deferred.resolve([]);
        }));
      }
      return deferred.promise;
    },

    /**
     * This function is used to set the count of features that intersects the AOI
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _setFeatureLayerIntersectFeatureCount: function (intersectFeatureLength) {
      this._intersectFeatureCount = dojoNumber.format(intersectFeatureLength);
      //remove the loading icon from count div and set the features count
      domClass.remove(this.impactSummaryLayerFeatureCount, "esriCTLoadingIcon");
      domAttr.set(this.impactSummaryLayerFeatureCount,
        "innerHTML", "(" + this._intersectFeatureCount + ")");
      domAttr.set(this.impactSummaryLayerFeatureCount,
        "title", "(" + this._intersectFeatureCount + ")");
    },

    /**
     * This function is used to detect polygon feature is a donut polygon
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _isDonutPolygon: function (geometry) {
      var isRingAntiClockWise;
      isRingAntiClockWise = false;
      if (geometry.type === "polygon") {
        if (geometry.rings.length > 1) {
          array.forEach(geometry.rings, lang.hitch(this, function (ring) {
            if (!geometry.isClockwise(ring)) {
              isRingAntiClockWise = true;
            }
          }));
        }
      }
      return isRingAntiClockWise;
    },

    /**
     * This function is used to get feature that cuts the AOI
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getCutOrWithInFeatures: function (cutterPolylineArr, intersectFeatureArr, bufferGeometry) {
      var featureIntersectResultArr, graphic;
      featureIntersectResultArr = [];
      for (var j = 0; j < cutterPolylineArr.length; j++) {
        for (var i = 0; i < intersectFeatureArr.length; i++) {
          var cutFeatureArr =
            GeometryEngine.cut(intersectFeatureArr[i].geometry, cutterPolylineArr[j]);
          if (cutFeatureArr.length > 0) {
            featureIntersectResultArr = this._getWithinFeature({
              "cutFeatureArr": cutFeatureArr,
              "bufferGeometry": bufferGeometry,
              "featureIntersectResultArr": featureIntersectResultArr,
              "intersectFeatureArr": intersectFeatureArr,
              "index": i
            });
          } else {
            if (GeometryEngine.within(intersectFeatureArr[i].geometry, bufferGeometry)) {
              graphic = new Graphic(intersectFeatureArr[i].geometry, null, intersectFeatureArr[i].attributes);
              featureIntersectResultArr.push(graphic);
            }
          }
        }
      }
      return featureIntersectResultArr;
    },

    /**
     * This function is used to get within feature from cut feature array
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getWithinFeature: function (data) {
      var cutFeatureArr, bufferGeometry, intersectFeatureArr, i, featureIntersectResultArr, graphic;
      cutFeatureArr = data.cutFeatureArr;
      bufferGeometry = data.bufferGeometry;
      intersectFeatureArr = data.intersectFeatureArr;
      featureIntersectResultArr = data.featureIntersectResultArr;
      i = data.index;
      array.forEach(cutFeatureArr, lang.hitch(this, function (cutFeature) {
        if (GeometryEngine.within(cutFeature, bufferGeometry)) {
          graphic = new Graphic(cutFeature, null, intersectFeatureArr[i].attributes);
          featureIntersectResultArr.push(graphic);
        }
      }));
      return featureIntersectResultArr;
    },

    /**
     * This function is used to convert polygon AOI to polyline
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _polygonToPolyline: function (polygon) {
      var cutterPolylineArr, polyline, i, pathArr, j;
      cutterPolylineArr = [];
      // Set spatial reference of the polygon
      polyline = new Polyline(new SpatialReference({
        wkid: 102100
      }));
      for (j = 0; j < polygon.rings.length; j++) {
        pathArr = [];
        for (i = 0; i < polygon.rings[j].length; i++) {
          pathArr.push(polygon.rings[j][i]);
        }
        polyline.addPath(pathArr);
      }
      cutterPolylineArr.push(polyline);
      return cutterPolylineArr;
    },

    /**
     * This function is used to get the formatted attribute
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _updateFormattedAttribute: function (intersectFeatureArr) {
      array.forEach(intersectFeatureArr, lang.hitch(this, function (intersectedFeature, i) {
        var formatedAttrs, unitData, objectId, hideMeasurementDetails, layerInfosObj,
          layerInfosPopupInfo;
        objectId = intersectedFeature.attributes[this.featureLayer.objectIdField];
        layerInfosPopupInfo = null;
        //if feature is not intersecting to polygons hide their measurement info
        if (this.intersectingFeatureIds.indexOf(objectId) === -1) {
          hideMeasurementDetails = true;
        }
        if (!this.isFeatureCollectionLayer) {
          layerInfosObj = this.layerInfosObj.getLayerInfoById(this.featureLayer.id);
          layerInfosPopupInfo = layerInfosObj.originOperLayer.popupInfo;
        }
        formatedAttrs = this._getFormatedAttrs(
          lang.clone(intersectedFeature.attributes),
          this.featureLayer.fields,
          this.featureLayer.typeIdField,
          this.featureLayer.types,
          layerInfosPopupInfo
        );
        intersectFeatureArr[i].setAttributes(formatedAttrs);
        array.forEach(this.featureLayer.fields, lang.hitch(this, function (field) {
          var fieldValue;
          if (!(intersectFeatureArr[i].attributes.hasOwnProperty(field.name))) {
            intersectFeatureArr[i].attributes[field.name] =
              this.nls.reportsTab.noDataText;
          }
          if (intersectFeatureArr[i].attributes.hasOwnProperty(field.name)) {
            fieldValue = intersectFeatureArr[i].attributes[field.name];
            if (fieldValue === undefined || fieldValue === "" || fieldValue === null) {
              intersectFeatureArr[i].attributes[field.name] =
                this.nls.reportsTab.noDataText;
            } else if (lang.trim(fieldValue.toString()) === "") {
              intersectFeatureArr[i].attributes[field.name] =
                this.nls.reportsTab.noDataText;
            }
          }
        }));
        //hide measurement details if not intersecting to polygons
        if (hideMeasurementDetails &&
          (this.featureLayer.geometryType === "esriGeometryPolygon" ||
            this.featureLayer.geometryType === "esriGeometryPolyline")) {
          this._feetUnitData.push(0);
          this._milesUnitData.push(0);
          this._metersUnitData.push(0);
          this._kilometersUnitData.push(0);
          this._hectaresUnitData.push(0);
        }
        else {
          switch (this.featureLayer.geometryType) {
            case "esriGeometryPolygon":
              unitData = geometryUtils.getAreaOfGeometry(intersectedFeature.geometry);
              this._feetUnitData.push(unitData.squareFeet);
              this._milesUnitData.push(unitData.acres);
              this._metersUnitData.push(unitData.squareMeters);
              this._kilometersUnitData.push(unitData.squareKilometer);
              this._hectaresUnitData.push(unitData.hectares);
              break;
            case "esriGeometryPolyline":
              unitData = geometryUtils.getLengthOfGeometry(intersectedFeature.geometry);
              this._feetUnitData.push(unitData.feet);
              this._milesUnitData.push(unitData.miles);
              this._metersUnitData.push(unitData.meters);
              this._kilometersUnitData.push(unitData.kilometers);
              this._hectaresUnitData.push(unitData.kilometers);
              break;
          }
        }
      }));
      return intersectFeatureArr;
    },

    /**
     * This function is used to get the field text
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getFieldText: function (currentFieldObj, fieldName) {
      if (currentFieldObj.label) {
        return currentFieldObj.label;
      } else if (currentFieldObj.alias) {
        return currentFieldObj.alias;
      } else {
        return fieldName;
      }
    },

    /**
     * This function is used to create layer details
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _createLayerDetails: function (intersectFeatureArr, geometryType) {
      var j, fieldData, currentFieldObj,
        currentFieldText, fieldName, configuredFieldLength;

      configuredFieldLength = Object.keys(this.configuredField).length;
      intersectFeatureArr = this._updateFormattedAttribute(intersectFeatureArr);
      this._pushDataInPrintDataObj(this.configuredLayerLabel, null, null);

      for (fieldName in this.configuredField) {
        currentFieldObj = this.configuredField[fieldName];
        currentFieldText = this._getFieldText(currentFieldObj, fieldName);
        this._printCompleteData.cols.push(currentFieldText);
        for (j = 0; j < intersectFeatureArr.length; j++) {
          fieldData = intersectFeatureArr[j].attributes[fieldName];
          if (fieldData || fieldData === 0) {
            this._pushDataInPrintDataObj(null, j, fieldData);
          } else {
            this._pushDataInPrintDataObj(null, j, "");
          }
          //Add data in unit info array
          switch (geometryType) {
            case "esriGeometryPolygon":
            case "esriGeometryPolyline":
              if (this._printCompleteData.cols.length === configuredFieldLength) {
                this._feetUnitInfo.push(this._feetUnitData[j]);
                this._milesUnitInfo.push(this._milesUnitData[j]);
                this._metersUnitInfo.push(this._metersUnitData[j]);
                this._kilometersUnitInfo.push(this._kilometersUnitData[j]);
                this._hectaresUnitInfo.push(this._hectaresUnitData[j]);
              }
              break;
            case "esriGeometryPoint":
              if (this._printCompleteData.cols.length === configuredFieldLength) {
                this._feetUnitInfo.push(1);
                this._milesUnitInfo.push(1);
                this._metersUnitInfo.push(1);
                this._kilometersUnitInfo.push(1);
                this._hectaresUnitInfo.push(1);
              }
              break;
          }
        }
      }
    },

    /**
     * This function is used to push data in print data obj needed for print dijit
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _pushDataInPrintDataObj: function (featureTitle, rowIndex, fieldData) {
      if (featureTitle) {
        this._printCompleteData = {};
        this._feetUnitInfo = [];
        this._milesUnitInfo = [];
        this._metersUnitInfo = [];
        this._kilometersUnitInfo = [];
        this._hectaresUnitInfo = [];
        this._printCompleteData.title = featureTitle;
        this._printCompleteData.rows = [];
        this._printCompleteData.cols = [];
      } else {
        if (fieldData === this.nls.reportsTab.noDataText) {
          fieldData = "<i>" + fieldData + "</i>";
        }
        if (this._printCompleteData.rows[rowIndex]) {
          this._printCompleteData.rows[rowIndex].push(fieldData);
        } else {
          this._printCompleteData.rows.push([]);
          this._printCompleteData.rows[rowIndex].push(fieldData);
        }
      }
    },

    /**
     * This function is used to filter the print data object acc to configured fields
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _filterPrintDataObjAccToConfiguredFields: function (configuredField) {
      var i, k, isFieldConfigured, fieldName;
      this._printData = {};
      this._printData = lang.clone(this._printCompleteData);
      for (i = this._printData.cols.length - 1; i >= 0; --i) {
        isFieldConfigured = false;
        for (fieldName in configuredField) {
          switch (this._printData.cols[i]) {
            case configuredField[fieldName].label:
              isFieldConfigured = true;
              break;
            case configuredField[fieldName].alias:
              isFieldConfigured = true;
              break;
            case fieldName:
              isFieldConfigured = true;
              break;
          }
        }
        if (!isFieldConfigured) {
          this._printData.cols.splice(i, 1);
          for (k = 0; k < this._printData.rows.length; k++) {
            this._printData.rows[k].splice(i, 1);
          }
        }
      }
    },

    /**
     * This function is used to get the formatted attributes
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getFormatedAttrs: function (attrs, fields, typeIdField, types, popupInfo) {
      function getFormatInfo(fieldName) {
        if (popupInfo && esriLang.isDefined(popupInfo.fieldInfos)) {
          for (var i = 0, len = popupInfo.fieldInfos.length; i < len; i++) {
            var f = popupInfo.fieldInfos[i];
            if (f.fieldName === fieldName) {
              return f.format;
            }
          }
        }
        return null;
      }
      var aliasAttrs = {};
      array.forEach(fields, lang.hitch(this, function (_field, i) {
        if (!attrs[_field.name]) {
          return;
        }
        var isCodeValue = !!(_field.domain && _field.domain.type === 'codedValue');
        var isDate = _field.type === "esriFieldTypeDate";
        var isTypeIdField = typeIdField && (_field.name === typeIdField);
        var fieldAlias = _field.name;

        if (fields[i].type === "esriFieldTypeDate") {
          aliasAttrs[fieldAlias] = jimuUtils.fieldFormatter.getFormattedDate(
            attrs[_field.name], getFormatInfo(_field.name)
          );
        } else if (fields[i].type === "esriFieldTypeDouble" ||
          fields[i].type === "esriFieldTypeSingle" ||
          fields[i].type === "esriFieldTypeInteger" ||
          fields[i].type === "esriFieldTypeSmallInteger") {
          aliasAttrs[fieldAlias] = this._getFormattedNumber(
            attrs[_field.name], getFormatInfo(_field.name)
          );
        }
        if (isCodeValue) {
          aliasAttrs[fieldAlias] = jimuUtils.fieldFormatter.getCodedValue(
            _field.domain, attrs[_field.name]
          );
        } else if (isTypeIdField) {
          aliasAttrs[fieldAlias] = jimuUtils.fieldFormatter.getTypeName(
            attrs[_field.name], types
          );
        } else if (!isCodeValue && !isDate && !isTypeIdField) {
          // Not A Date, Domain or Type Field
          // Still need to check for codedType value
          aliasAttrs[fieldAlias] = fieldAlias in aliasAttrs ?
            aliasAttrs[fieldAlias] : attrs[_field.name];
          aliasAttrs[fieldAlias] = this._getCodeValueFromTypes(
            _field,
            typeIdField,
            types,
            attrs,
            aliasAttrs
          );
        }
      }));
      return aliasAttrs;
    },

    /**
     * This function is used to get the formatted number
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getFormattedNumber: function (num, format) {
      if (typeof num === 'number') {
        var decimalStr = num.toString().split('.')[1] || "",
          decimalLen = decimalStr.length;
        num = jimuUtils.localizeNumberByFieldInfo(num, {
          format: {
            places: (format && typeof format.places === 'number') ?
              parseInt(format.places, 10) : decimalLen,
            digitSeparator: format && format.digitSeparator
          }
        });
        return num || "";
      }
      return num;
    },

    /**
     * This function is used to get the coded value from types
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getCodeValueFromTypes: function (field, typeIdField, types, obj, aliasAttrs) {
      var codeValue = null;
      if (typeIdField && types && types.length > 0) {
        var typeChecks = array.filter(types, lang.hitch(this, function (item) {
          // value of typeIdField has been changed above
          return item.name === obj[typeIdField];
        }));
        var typeCheck = (typeChecks && typeChecks[0]) || null;
        if (typeCheck && typeCheck.domains &&
          typeCheck.domains[field.name] && typeCheck.domains[field.name].codedValues) {
          codeValue = jimuUtils.fieldFormatter.getCodedValue(
            typeCheck.domains[field.name],
            obj[field.name]
          );
        }
      }
      var fieldAlias = field.name;
      var _value = codeValue !== null ? codeValue : aliasAttrs[fieldAlias];
      return _value || isFinite(_value) ? _value : "";
    },

    /**
     * This function is used to get index of array
     * @memberOf Screening/Widget
     */
    _getArrayIndex: function (arrayOfRows, arrayToBeSearched) {
      var i, j, current, matchedIndex = [];
      for (i = 0; i < arrayOfRows.length; ++i) {
        if (arrayToBeSearched.length === arrayOfRows[i].length) {
          current = arrayOfRows[i];
          j = 0;
          while (j < arrayToBeSearched.length && arrayToBeSearched[j] === current[j]) {
            ++j;
          }
          if (j === arrayToBeSearched.length) {
            matchedIndex.push(i);
          }
        }
      }
      return matchedIndex;
    },

    /**
     * This function is used to perform the aggregation of rows which contains same data
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    getSum: function (arrayOfValues, arrayOfIndex) {
      var sum, filteredArr;
      //filter selected index
      if (arrayOfIndex && arrayOfIndex.length > 0) {
        filteredArr = array.filter(arrayOfValues, function (item, index) { // jshint unused: true
          return arrayOfIndex.indexOf(index) > -1;
        });
      } else {
        filteredArr = arrayOfValues;
      }
      //add values of filteredArr
      sum = filteredArr.reduce(function (prevValue, currentValue) {
        return prevValue + currentValue;
      }, 0);
      if (sum > 0.01) {
        return conversionUtils.honourPopupRounding(2, sum);
      } else {
        return sum;
      }
    },

    /**
     * This function is used to get the units column title based on geometry type
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getAggregatedColTitle: function (geometryType) {
      var colTitle;
      switch (geometryType) {
        case "esriGeometryPoint":
          colTitle = this.nls.reportsTab.featureCountText;
          break;
        case "esriGeometryPolyline":
          colTitle = this.nls.reportsTab.featureLengthText;
          break;
        case "esriGeometryPolygon":
          colTitle = this.nls.reportsTab.featureAreaText;
          break;
      }
      return colTitle;
    },

    /**
     * Based on geometry type and unit selected from analysis setting returns unit text from nls.
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getUnitsForGeometry: function (geometryType, analysisUnit) {
      var unit;
      switch (geometryType) {
        case "esriGeometryPoint":
          unit = "";
          break;
        case "esriGeometryPolyline":
          unit = this._getAnalysisUnitForGeometry(analysisUnit, geometryType);
          break;
        case "esriGeometryPolygon":
          unit = this._getAnalysisUnitForGeometry(analysisUnit, geometryType);
          break;
      }
      return unit;
    },

    /**
     * Based on config analysis unit value return unit for Length and Area
     * @memberOf Screening/Widget
     */
    _getAnalysisUnitForGeometry: function (analysisUnit, geometryType) {
      var analysisResultUnit, supText;
      supText = '2';
      switch (analysisUnit) {
        case "Feet":
          analysisResultUnit = (geometryType === "esriGeometryPolygon") ?
            this.nls.units.feetAbbr + supText.sup() : this.nls.units.feetAbbr;
          break;
        case "Miles":
          analysisResultUnit = (geometryType === "esriGeometryPolygon") ?
            this.nls.units.acresAbbr : this.nls.units.milesAbbr;
          break;
        case "Meters":
          analysisResultUnit = (geometryType === "esriGeometryPolygon") ?
            this.nls.units.metersAbbr + supText.sup() : this.nls.units.metersAbbr;
          break;
        case "Kilometers":
          analysisResultUnit = (geometryType === "esriGeometryPolygon") ?
            this.nls.units.kilometersAbbr + supText.sup() : this.nls.units.kilometersAbbr;
          break;
        case "Hectares":
          analysisResultUnit = (geometryType === "esriGeometryPolygon") ?
            this.nls.reportsTab.hectaresAbbr : this.nls.units.kilometersAbbr;
          break;
      }
      return analysisResultUnit;
    },

    /**
     * Shows message in layer details panel
     */
    _showMessage: function (message) {
      domConstruct.empty(this.impactSummaryLayerDetails);
      domAttr.set(this.impactSummaryLayerDetailsMsg, "innerHTML", message);
      domClass.add(this.impactSummaryLayerDetailsMsg, "esriCTLayerDetailCenterText");
    },

    /**
     * Function aggregates and shows report in panel.
     */
    _showReport: function () {
      var data, matchedIndex, temp, aggregatedObj, aggregatedId, measurementUnitColTitle,
        aggregatedData, matchedGeometries = [];
      data = this._printData;
      domConstruct.empty(this.impactSummaryLayerDetails);
      //if no field is selected
      if (!data.cols.length && data.rows.length > 0) {
        this._showMessage(this.nls.reportsTab.noFieldsSelected);
        return;
      }
      if (data.rows && data.rows.length > 0) {
        //if has valid rows empty the message
        domAttr.set(this.impactSummaryLayerDetailsMsg, "innerHTML", "");
        domClass.remove(this.impactSummaryLayerDetailsMsg, "esriCTLayerDetailCenterText");
        matchedIndex = [];
        aggregatedObj = {};
        //aggregate info for showing unique set of attribute values
        for (var i = 0; i < data.rows.length; i++) {
          //if current index is not found in matched index then search array of that index
          if (matchedIndex.indexOf(i) < 0) {
            temp = this._getArrayIndex(data.rows, data.rows[i]);
            aggregatedObj[i] = temp;
            matchedIndex = matchedIndex.concat(temp);
          }
          //if all index are matched break loop
          if (matchedIndex.length === data.rows.length) {
            break;
          }
        }
        aggregatedData = {
          "rows": [],
          "cols": lang.clone(data.cols)
        };
        //based on feature layers geometry type show area/length/count as title for col
        measurementUnitColTitle = this._getAggregatedColTitle(this.featureLayer.geometryType);
        aggregatedData.cols.push(measurementUnitColTitle); //for feets (feet)
        aggregatedData.cols.push(measurementUnitColTitle); //for acres col (miles)
        aggregatedData.cols.push(measurementUnitColTitle); //for sq meters col (meters)
        aggregatedData.cols.push(measurementUnitColTitle);  //for sq kilometers col (kilometers)
        aggregatedData.cols.push(measurementUnitColTitle);  //for hectares col (kilometers)
        for (aggregatedId in aggregatedObj) {
          var newRowInAggregatedData = lang.clone(data.rows[parseInt(aggregatedId, 10)]);
          //add feet unit info in data
          newRowInAggregatedData.push(
            this.getSum(this._feetUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]));
          //add mile unit info in data
          newRowInAggregatedData.push(
            this.getSum(this._milesUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]));
          //add meters unit info in data
          newRowInAggregatedData.push(
            this.getSum(this._metersUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]));
          aggregatedData.rows.push(newRowInAggregatedData);
          //add kilometer unit info in data
          newRowInAggregatedData.push(
            this.getSum(this._kilometersUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]));
          //add kilometer/hectores unit info in data
          var hectorsInfo =
            this.getSum(this._hectaresUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]);
          newRowInAggregatedData.push(hectorsInfo);
          //Create geometries according to the aggregation of the attributes
          if (this._featureIntersectResultArr) {
            matchedGeometries.push({
              "features": this._getAggregatedFeatures(aggregatedObj[aggregatedId]),
              "sortValue": hectorsInfo
            });
          }
        }
        //once data is aggregated render report
        this._renderReport(aggregatedData, matchedGeometries);
      }
    },

    /**
     * Returns features according to attributes aggregation
     */
    _getAggregatedFeatures: function (aggregatedObj) {
      var newGeometriesArray = [];
      array.forEach(aggregatedObj, lang.hitch(this, function (index) {
        newGeometriesArray.push(this._featureIntersectResultArr[index]);
      }));
      return newGeometriesArray;
    },

    /**
     * Sorts the data based on last col values
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _sortFeatureArray: function (a, b) {
      var lastIndex = a.length - 1;
      if (a[lastIndex] < b[lastIndex]) { return 1; }
      if (a[lastIndex] > b[lastIndex]) { return -1; }
      return 0;
    },

    /**
     * Sorts the data based on last col values
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _sortArrayByKey: function (a, b) {
      if (a.sortValue < b.sortValue) { return 1; }
      if (a.sortValue > b.sortValue) { return -1; }
      return 0;
    },

    /**
     * This function is used to create template node for rendering report info
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _createTemplateNode: function () {
      var templateNode;
      //create table to show info
      templateNode = domConstruct.create("table", {
        "class": "esriCTAttrTable esriCTCursorPointer",
        "cellpadding": "0px",
        "cellspacing": "0px"
      }, this.impactSummaryLayerDetails);
      //add separator after ech table
      domConstruct.create("div", {
        "class": "esriCTInfoDataSeparator"
      }, this.impactSummaryLayerDetails);
      //handle click event to select and highlight the group and its features
      this.own(on(templateNode, "click", lang.hitch(this, this._highlightSelection)));
      return templateNode;
    },

    /**
     * Using the aggregated data render report info
     */
    _renderReport: function (aggregatedData, intersectingFeaturesArr) {
      //loop through all the rows and create table for each unique set
      if (aggregatedData.rows && aggregatedData.rows.length > 0) {
        //sort data so that rows for which measurement are not to be shown will be shifted top
        aggregatedData.rows = aggregatedData.rows.sort(this._sortFeatureArray);
        //as data is sorted we also need to sort the features accordingly
        intersectingFeaturesArr = intersectingFeaturesArr.sort(this._sortArrayByKey);
        // once after sorting set the features in _aggregatedFeatureGeometries array
        this._aggregatedFeatureGeometries = intersectingFeaturesArr;
        array.forEach(aggregatedData.rows, lang.hitch(this, function (eachRow, index) {
          var infoTable, valuesTr;
          infoTable = this._createTemplateNode();
          //set the attribute to identify the selected table and layer
          domAttr.set(infoTable, "esriCTTableIndex", index);
          domAttr.set(infoTable, "esriCTLayerId", this.featureLayer.id);
          //Loop through all the rows and create td for each col data
          array.forEach(eachRow, lang.hitch(this, function (rowValue, index) {
            var formattedRowValue, attrName, attrValue, valuesTd, nameTd;
            valuesTr = domConstruct.create("tr", { "valign": "top" }, infoTable);
            //Add attrName and value td to row
            nameTd = domConstruct.create("td", { "class": "esriCTAttrName" }, valuesTr);
            valuesTd = domConstruct.create("td", { "class": "esriCTAttrValue" }, valuesTr);
            //Format value so that url in value will appear as link.
            formattedRowValue = jimuUtils.fieldFormatter.getFormattedUrl(rowValue);
            attrName = aggregatedData.cols[index] + ": ";
            attrValue = formattedRowValue;
            //Last five col values are for analysis report unit info
            if (index >= eachRow.length - 5) {
              var currUnitIndex;
              currUnitIndex = index - (eachRow.length - 5);
              //Append unit to the valid value
              //In case of geometries intersecting to only point/line hide the row
              if (formattedRowValue >= 0.01) {
                if (this.featureLayer.geometryType !== "esriGeometryPoint") {
                  formattedRowValue = dojoNumber.format(formattedRowValue, { places: 2 });
                } else {
                  formattedRowValue = dojoNumber.format(formattedRowValue);
                }
                attrValue = attrName + formattedRowValue + " " +
                  this._getUnitsForGeometry(this.featureLayer.geometryType,
                    this._analysisUnitsArray[currUnitIndex]);
              } else if (formattedRowValue < 0.01 && formattedRowValue !== 0) {
                attrValue = attrName + " " + " < " + dojoNumber.format(0.01) + " " +
                  this._getUnitsForGeometry(this.featureLayer.geometryType,
                    this._analysisUnitsArray[currUnitIndex]);
              }
              else {
                attrValue = attrName + " " + this.nls.reportsTab.notApplicableText;
              }
              attrName = "";
              //align measurement info to right & remove padding from analysis results
              domClass.add(nameTd, "esriCTReportsTabInfoData");
              domClass.add(valuesTd,
                "esriCTInfoDataMeasurement esriCTReportsTabInfoData esriCTFieldDistinct" +
                this._analysisUnitsArray[currUnitIndex] + "UnitData");
              if (this.config.areaUnits !== (this._analysisUnitsArray[currUnitIndex])) {
                domClass.add(valuesTd, "esriCTHidden");
              }
            }
            domAttr.set(nameTd, "innerHTML", attrName);
            domAttr.set(valuesTd, "innerHTML", attrValue);
          }));
        }));
      }
    },

    /**
     * This function returns unique values from two arrays
     */
    _getUniqueIds: function (arr1, arr2) {
      if (arr1.length === 0) {
        return arr2;
      }
      if (arr2.length === 0) {
        return arr1;
      }
      array.forEach(arr1, lang.hitch(this, function (value) {
        var indexInArr2 = arr2.indexOf(value);
        if (indexInArr2 !== -1) {
          arr2.splice(indexInArr2, 1);
        }
      }));
      return arr1.concat(arr2);
    },

    /**
     * On group row click in widget panel,
     * Highlight row in widget panel and features for that group on map
     */
    _highlightSelection: function (evt) {
      var prevSelectedNode, node, tableIndex, features;
      node = evt.currentTarget;
      //If current node is already selected then deselect it and remove the highlight
      if (domClass.contains(node, "esriCTAttrTableHighlighted")) {
        domClass.remove(node, "esriCTAttrTableHighlighted");
        this.highlightGraphicsLayer.clear();
        return;
      }
      //Remove highlights of previous selection
      prevSelectedNode = query(".esriCTAttrTableHighlighted", this.domNode.parentElement);
      if (prevSelectedNode && prevSelectedNode.length > 0) {
        domClass.remove(prevSelectedNode[0], "esriCTAttrTableHighlighted");
      }
      //Clear the Graphics Layer before adding any new
      this.highlightGraphicsLayer.clear();
      //Highlight the selected group row in widget panel
      domClass.add(node, "esriCTAttrTableHighlighted");
      //Get features of the selected group
      tableIndex = domAttr.get(node, "esriCTTableIndex");
      features = this._aggregatedFeatureGeometries[parseInt(tableIndex, 10)].features;
      //Highlight each individual feature on map
      array.forEach(features, lang.hitch(this, function (feature) {
        //get the graphics with the highlight
        var graphic = highlightSymbolUtils.getHighLightSymbol(feature, this.featureLayer);
        //add the highlight graphics on map
        this.highlightGraphicsLayer.add(graphic);
      }));
    }
  });
});