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
  'jimu/BaseWidget',
  'dojo/Evented',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./project-overview.html',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/dom-attr',
  'dojo/string',
  'dojo/on',
  'dojo/Deferred',
  'esri/graphic',
  'esri/geometry/Point',
  'esri/tasks/BufferParameters',
  'esri/geometry/geometryEngine',
  'esri/tasks/GeometryService',
  'esri/geometry/Polygon',
  'dojo/dom-construct',
  'jimu/dijit/LoadingIndicator',
  './advance-item-list'
], function (
  declare,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  lang,
  array,
  domAttr,
  string,
  on,
  Deferred,
  Graphic,
  Point,
  BufferParameters,
  geometryEngine,
  GeometryService,
  Polygon,
  domConstruct,
  LoadingIndicator,
  AdvanceItemList
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    baseClass: 'jimu-widget-cost-analysis-project-overview',

    postCreate: function () {
      this.inherited(arguments);
      //Initialize array's and object
      this.listData = [{
        "title": this.nls.projectOverview.assetItemsTitle,
        "content": this.assetSummaryInfo,
        "icon": "",
        "actionIcon": "",
        "isOpen": true
      }, {
        "title": this.nls.projectOverview.assetStatisticsTitle,
        "content": "",
        "icon": "",
        "actionIcon": "esriCTAssetActionIcon",
        "actionIconTitle": this.nls.statisticsSettings.addNewStatisticsText,
        "isOpen": false
      }];
      //check if project layer is configured
      if (this.config.projectSettings.projectLayer) {
        //Create instance of project layer if configured
        this.projectLayer =
          this.layerInfosObj.getLayerInfoById(this.config.projectSettings.projectLayer).layerObject;
        this.updateProjectInfo(this.projectInfo);
        //if project layers is configured then only show project attribute editor(project summary item)
        this.listData.push(
          {
            "title": this.nls.projectOverview.projectSummaryTitle,
            "content": this.projectSummaryInfo,
            "icon": "",
            "actionIcon": "",
            "actionIconTitle": this.nls.projectAttribute.projectAttributeText,
            "isOpen": true
          }
        );
      }
      this._initLoadingIndicator();
    },

    /**
     * Updates the project info object and projectName in workbench panel
     * @memberOf widgets/CostAnalysis/project-overview
     */
    updateProjectInfo: function (projectInfo) {
      var projectName;
      this.projectInfo = projectInfo;
      //check if project layer is configured
      if (this.config.projectSettings.projectLayer) {
        projectName = string.substitute(this.nls.projectOverview.projectName,
          { "name": this.projectInfo.name });
        domAttr.set(this.projectNameDiv, "innerHTML", projectName);
      }
    },

    /**
     * This function used for initializing the loading indicator
     * @memberOf widgets/CostAnalysis/project-overview
     * */
    _initLoadingIndicator: function () {
      this._loadingIndicator = new LoadingIndicator({
        hidden: true
      });
      this._loadingIndicator.placeAt(this.domNode.parentNode.parentNode.parentNode);
      this._loadingIndicator.startup();
    },

    startup: function () {
      this.inherited(arguments);
      this._initProjectOverview();
    },

    /**
    * Create item list based on configuration
    * @memberOf widgets/CostAnalysis/project-overview
    */
    _initProjectOverview: function () {
      var projectOverviewList = new AdvanceItemList({
        "itemList": this.listData,
        "showArrow": true,
        "togglePanels": false,
        "openMultiple": true
      }, domConstruct.create("div", {}, this.projectOverviewNode));
      this.own(on(projectOverviewList, "onActionButtonClicked",
        lang.hitch(this, function (selectedIndex) {
          this.emit("actionClicked", selectedIndex);
        })));
      this.own(on(projectOverviewList, "onTitleClicked",
        lang.hitch(this, function (selectedIndex) {
          this.emit("titleClicked", selectedIndex);
        })));
      projectOverviewList.startup();
    },

    /**
    * Update the contents asset summary
    * @memberOf widgets/CostAnalysis/project-overview
    */
    showAssetItemSummary: function (assetItemSummary, updateProjectBoundary) {
      var totalCost = 0;
      domConstruct.empty(this.assetSummaryDiv);
      //If new features are added through templates then show them
      if (Object.keys(assetItemSummary).length > 0) {
        var layerId, summaryContainer, assetTable, assetTableBody, tableHeaderRow, tableRow,
          currentTemplate, templateName, unitsValue, unitsAbbr;
        summaryContainer = domConstruct.create("div", {}, this.assetSummaryDiv);
        assetTable = domConstruct.create("table",
          { "style": { "width": "100%" }, "class": "esriCTTable" },
          summaryContainer);
        assetTableBody = domConstruct.create("tbody", {}, assetTable);
        //Loop through each layers
        for (layerId in assetItemSummary) {
          tableHeaderRow = domConstruct.create("tr", {
          }, assetTableBody);
          domConstruct.create("td", {
            "innerHTML": assetItemSummary[layerId].layerName,
            "class": "esriCTSummaryLayerTitle",
            "colspan": 3
          }, tableHeaderRow);
          //Show all the added features from different templates
          for (templateName in assetItemSummary[layerId].templates) {
            currentTemplate = assetItemSummary[layerId].templates[templateName];
            tableRow = domConstruct.create("tr", {}, assetTableBody);
            unitsValue = currentTemplate.units;
            //show polygon and polyline units with 2 decimals only, dont apply rounding for points
            if (assetItemSummary[layerId].geometryType !== "esriGeometryPoint") {
              unitsValue = this.appUtils.applyRounding(unitsValue);
              unitsAbbr = this.appUtils.getUnitsAbbreviation(assetItemSummary[layerId].geometryType,
                this.config.generalSettings.measurementUnit);
            } else { //in case of point show abbr from nls as unit(s)
              unitsAbbr = this.nls.workBench.units;
            }
            domConstruct.create("td", { "innerHTML": templateName }, tableRow);
            domConstruct.create("td", {
              "innerHTML": unitsValue + " " + unitsAbbr
            }, tableRow);
            domConstruct.create("td", {
              "class":"esriCTAssetItemsCost",
              "innerHTML": this.config.generalSettings.currency + " " +
              this.appUtils.applyRounding(currentTemplate.cost)
            }, tableRow);
            //add all costs to show total cost
            totalCost += currentTemplate.cost;
          }
        }
      } else {
        domConstruct.create("div", {
          "style": "padding: 10px 0; text-align : center; font-weight : bold",
          "innerHTML": this.nls.workBench.noAssetAddedMsg
        }, this.assetSummaryDiv);
      }
      this._updateProjectCost(totalCost);
      if (updateProjectBoundary) {
        this._getProjectBoundary(assetItemSummary);
      }
    },

    /**
    * Updates the project grosCost in the layer
    * @memberOf widgets/CostAnalysis/project-overview
    */
    grossCostUpdated: function (grossCost) {
      var roundedGrossCost =
        this.appUtils.roundProjectCostValue(this.config.generalSettings.roundCostType, grossCost);
      roundedGrossCost = this.config.generalSettings.currency + " " + roundedGrossCost;
      domAttr.set(this.grossCost, "innerHTML", roundedGrossCost);
      this._saveProjectAttributes(this._projectTotalCost, grossCost);
    },

    /**
    * Update the project cost
    * @memberOf widgets/CostAnalysis/project-overview
    */
    _updateProjectCost: function (totalCost) {
      var totalRoundedCost;
      this._projectTotalCost = totalCost;
      //show rounded total cost in widget panel
      totalRoundedCost = this.appUtils.roundProjectCostValue(
        this.config.generalSettings.roundCostType, this._projectTotalCost);
      totalRoundedCost = this.config.generalSettings.currency + " " + totalRoundedCost;
      domAttr.set(this.totalCost, "innerHTML", totalRoundedCost);
      //emit event to calculate gross cost
      this.emit("totalCostCalculated", this._projectTotalCost);
    },

    /**
    * Update project boundary as new features are added/deleted
    * @memberOf widgets/CostAnalysis/project-overview
    */
    _getProjectBoundary: function (assetItemSummary) {
      var featurePoints;
      //If no features are added/present in the object, save project with 0 cost
      if (Object.keys(assetItemSummary).length === 0) {
        this._saveProjectGeometry(new Polygon());
        return;
      }
      this._loadingIndicator.show();
      if (this.config.generalSettings.projectAreaType === "outline") {
        featurePoints = this._convertFeatureStoredToPoints(assetItemSummary);
        this.geometryService.convexHull(featurePoints, lang.hitch(this, function (result) {
          this._loadingIndicator.hide();
          this._onConvexHullComplete(result);
        }), lang.hitch(this, function () {
          this._loadingIndicator.show();
        }));
      } else {
        this._createBufferOnAssets(assetItemSummary).then(lang.hitch(this, function (result) {
          this._loadingIndicator.hide();
          if (result) {
            this._saveProjectGeometry(result);
          }
        }));
      }
    },

    /**
    * Takes all features in storage and converts them into points.
    * returns a list of points that make up all the features.
    * @memberOf widgets/CostAnalysis/project-overview
    */
    _convertFeatureStoredToPoints: function (assetItemSummary) {
      var geometryResultArray = [], layerId, templates, features;
      for (layerId in assetItemSummary) {
        if (assetItemSummary.hasOwnProperty(layerId)) {
          templates = assetItemSummary[layerId].templates;
          for (template in templates) {
            features = assetItemSummary[layerId].templates[template].features;
            geometryResultArray = geometryResultArray.concat(this._getFeatureGeometry(features));
          }
        }
      }
      return geometryResultArray;
    },

    /**
    * code to get features geometry
    * @memberOf widgets/CostAnalysis/project-overview
    */
    _getFeatureGeometry: function (features) {
      var result = [];
      array.forEach(features, function (feature) {
        // get points of only those features which are new
        var type = feature.geometry.type;
        var geometry = feature.geometry;
        if (type === 'point') {
          result.push(geometry);

        } else { //polyline - polygon
          var pieces;
          if (type === 'polyline') {
            pieces = geometry.paths;
          } else {
            pieces = geometry.rings;
          }
          array.forEach(pieces, function (piece) {
            array.forEach(piece, function (point) {
              var pointGeom = new Point(point[0], point[1], geometry.spatialReference);
              result.push(pointGeom);
            });
          });
        }
      });
      return result;
    },

    /**
    * Listen for convexHull complete event
    * @memberOf widgets/CostAnalysis/project-overview
    */
    _onConvexHullComplete: function (result) {
      //If return geometry is not polygon, update project boundary as EMPTY polygon
      if (result.type !== "polygon") {
        result = new Polygon();
      }
      this._saveProjectGeometry(result);
    },

    /**
    * Apply buffer with configured values on all the project assets
    * @memberOf widgets/CostAnalysis/project-overview
    */
    _createBufferOnAssets: function (assetItemSummary) {
      var featuresGeomArray = [], polygon, layerId, templates, template, features, geomDeferred;
      geomDeferred = new Deferred();
      for (layerId in assetItemSummary) {
        if (assetItemSummary.hasOwnProperty(layerId)) {
          templates = assetItemSummary[layerId].templates;
          for (template in templates) {
            features = assetItemSummary[layerId].templates[template].features;
            featuresGeomArray = featuresGeomArray.concat(this._getBufferGeometry(features));
          }
        }
      }
      var bufferParameters, bufferUnit;
      bufferUnit = this.appUtils.units[this.config.generalSettings.measurementUnit].bufferUnit;
      // Initialize buffer parameter
      bufferParameters = new BufferParameters();
      bufferParameters.distances = [this.config.generalSettings.bufferDistance];
      bufferParameters.outSpatialReference = this.map.spatialReference;
      bufferParameters.unit = GeometryService[bufferUnit];
      bufferParameters.geometries = featuresGeomArray;
      if (this.map.spatialReference.isWebMercator() || this.map.spatialReference
        .wkid === 4326) {
        // If spatial reference is web mercator, do GEODESIC BUFFER
        polygon = geometryEngine.geodesicBuffer(bufferParameters
          .geometries, bufferParameters.distances,
          bufferParameters.unit, true);
        geomDeferred.resolve(polygon[0]);
      } else {
        // If spatial reference is NON web mercator, do BUFFER
        this.geometryService.buffer(bufferParameters,
          // Callback for geodesic buffer
          lang.hitch(this, function (bufferGeometry) {
            geomDeferred.resolve(bufferGeometry);
          }),
          // Error while buffer
          lang.hitch(this, function () {
            geomDeferred.resolve(null);
          }));
      }
      return geomDeferred.promise;
    },

    /**
    * Get geometry values for configured values on all the project assets
    * @memberOf widgets/CostAnalysis/project-overview
    */
    _getBufferGeometry: function (features) {
      var featuresGeom = [];
      array.forEach(features, lang.hitch(this, function (feature) {
        var geometry = feature.geometry;
        if (geometry.type === 'polygon') {
          geometry = geometryEngine.simplify(geometry);
        }
        featuresGeom.push(geometry);
      }));
      return featuresGeom;
    },

    /**
   * Save necessary fields on project layer
   * @memberOf widgets/CostAnalysis/project-overview
   */
    _saveProjectGeometry: function (geometry) {
      //If project layer is not configured, do nothing
      if (!this.projectLayer) {
        return;
      }
      this._loadingIndicator.show();
      var featureData;
      featureData = new Graphic();
      featureData.attributes = {};
      featureData.attributes[this.projectLayer.objectIdField] = this.projectInfo.objectId;
      featureData.geometry = geometry;
      this.projectLayer.applyEdits(null, [featureData], null, lang.hitch(this,
        function () {
          this.projectLayer.refresh();
          this._loadingIndicator.hide();
        }),
        lang.hitch(this, function () {
          this.appUtils.showMessage(this.nls.projectOverview.unableToSaveProjectBoundary);
          this._loadingIndicator.hide();
        }));
    },

    /**
    * Save necessary fields on project layer
    * @memberOf widgets/CostAnalysis/project-overview
    */
    _saveProjectAttributes: function (projectTotalCost, grossCost) {
      //If project layer is not configured, do nothing
      if (!this.projectLayer) {
        return;
      }
      this._loadingIndicator.show();
      var featureData;
      featureData = new Graphic();
      featureData.attributes = {};
      featureData.attributes[this.projectLayer.objectIdField] = this.projectInfo.objectId;
      array.forEach(this.projectLayer.fields, lang.hitch(this, function (field) {
        if (field.name.toUpperCase() === "TOTALASSETCOST") {
          featureData.attributes[field.name] = projectTotalCost;
        } else if (field.name.toUpperCase() === "GROSSPROJECTCOST") {
          featureData.attributes[field.name] = grossCost;
        }
      }));
      this.projectLayer.applyEdits(null, [featureData], null, lang.hitch(this,
        function () {
          this.projectLayer.refresh();
          this._loadingIndicator.hide();
        }),
        lang.hitch(this, function () {
          this.appUtils.showMessage(this.nls.projectOverview.unableToSaveProjectCost);
          this._loadingIndicator.hide();
        }));
    }
  });
});