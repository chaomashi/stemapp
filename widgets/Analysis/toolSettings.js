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
  'dojo/_base/array'
], function(lang, array) {
  var mo = {};

  var toolId = 0;

  var _toolParams = [{
    id: toolId++,
    dijitID: 'esri/dijit/analysis/AggregatePoints',
    name: 'AggregatePoints',
    title: 'aggregateTool',
    imgDisplay:'images/aggregate-points.png',
    usage: 'aggregatePointsUsage',
    analysisLayer:{
      name: 'pointLayer',
      geomTypes: ['esriGeometryPoint', 'esriGeometryMultipoint']
    },
    requiredParam:{
      name: 'polygonLayers',
      isArray: true,
      geomTypes: ['esriGeometryPolygon']
    },
    icon: "images/AggregatePoints32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/CalculateDensity',
    name: 'CalculateDensity',
    title: 'calculateDensity',
    imgDisplay:"images/calculate-density.png",
    usage: 'calculateDensityUsage',
    analysisLayer:{
      name: 'inputLayer',
      geomTypes: ['esriGeometryPoint', 'esriGeometryMultipoint', 'esriGeometryPolyline']
    },
    optionalParams:[{
      name:'boundingPolygonLayers',
      isArray: true,
      geomTypes: ['esriGeometryPolygon']
    }],
    icon: "images/CreateDensitySurface32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/ChooseBestFacilities',
    name: 'ChooseBestFacilities',
    title: 'chooseBestFacilities',
    imgDisplay:"images/choose-best-facilities.png",
    analysisLayer:{
      name: 'demandLocationLayer',
      geomTypes: ['esriGeometryPoint', 'esriGeometryMultipoint']
    },
    optionalParams:[{
      name:'demandLocationLayers',
      isArray: true,
      geomTypes: ['esriGeometryPoint', 'esriGeometryMultipoint']
    }, {
      name:'featureLayers',
      isArray: true,
      geomTypes: ['*']
    }],
    icon: "images/ChooseBestFacilities32.png",
    privileges:['loc']
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/ConnectOriginsToDestinations',
    name: 'ConnectOriginsToDestinations',
    title: 'connectOriginsToDestinations',
    imgDisplay:"images/connect-origins-to-destinations.png",
    usage: 'connectOriginsToDestinationsUsage',
    analysisLayer:{
      name: 'originsLayer',
      geomTypes: ['esriGeometryPoint']
    },
    requiredParam:{
      name: 'featureLayers',
      isArray: true,
      geomTypes: ['esriGeometryPoint']
    },
    icon: "images/ConnectOriginstoDestinations32.png",
    privileges:['od']
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/CreateBuffers',
    name: 'CreateBuffers',
    title: 'createBuffers',
    imgDisplay:"images/create-buffers.png",
    usage: 'createBuffersUsage',
    analysisLayer:{
      name: 'inputLayer',
      geomTypes: ['*']
    },
    icon: "images/CreateBuffers32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/CreateDriveTimeAreas',
    name: 'CreateDriveTimeAreas',
    title: 'createDriveTimeAreas',
    imgDisplay:"images/create-drivetime.png",
    usage: 'createDriveTimeAreasUsage',
    analysisLayer:{
      name: 'inputLayer',
      geomTypes: ['esriGeometryPoint']
    },
    icon: "images/CreateDriveTimeAreas32.png",
    cannotCancel:true,
    privileges:['drivetimearea']
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/CreateViewshed',
    name: 'CreateViewshed',
    title: 'createViewshed',
    imgDisplay:"images/create-viewshed.png",
    usage: 'createViewshedUsage',
    analysisLayer:{
      name: 'inputLayer',
      geomTypes: ['esriGeometryPoint']
    },
    icon: "images/Viewshed32.png",
    privileges:['elevation']
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/CreateWatersheds',
    name: 'CreateWatersheds',
    title: 'createWatershed',
    imgDisplay:"images/create-watersheds.png",
    usage: 'createWatershedsUsage',
    analysisLayer:{
      name: 'inputLayer',
      geomTypes: ['esriGeometryPoint']
    },
    icon: "images/Watershed32.png",
    privileges:['hydro']
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/DeriveNewLocations',
    name: 'DeriveNewLocations',
    title:'deriveNewLocations',
    imgDisplay:"images/derive-new-locations.png",
    usage: 'deriveNewLocationsUsage',
    analysisLayer:{
      name: 'analysisLayer',
      geomTypes: ['*']
    },
    optionalParams:[{
      name: 'inputLayers',
      isArray: true,
      geomTypes: ['*']
    }],
    icon: "images/FindNewLocations32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/DissolveBoundaries',
    name: 'DissolveBoundaries',
    title: 'dissolveBoundaries',
    imgDisplay:"images/dissolve-boundaries.png",
    usage: 'dissolveBoundariesUsage',
    analysisLayer:{
      name: 'inputLayer',
      geomTypes: ['esriGeometryPolygon']
    },
    icon: "images/DissolveBoundaries32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/EnrichLayer',
    name: 'EnrichLayer',
    title: 'enrichLayer',
    imgDisplay:"images/enrich-layer.png",
    usage: 'enrichLayerUsage',
    analysisLayer:{
      name: 'inputLayer',
      geomTypes: ['*']
    },
    icon: "images/GeoenrichFeatures32.png",
    privileges:['geoenrichment']
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/ExtractData',
    name: 'ExtractData',
    title: 'extractData',
    imgDisplay:"images/extract-data.png",
    usage: 'extractDataDesc',
    optionalParams:[{
      name: 'featureLayers',
      isArray: true,
      geomTypes: ['*']
    }],
    icon: 'images/ClipAndShip32.png'
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/FindExistingLocations',
    name: 'FindExistingLocations',
    title: 'findExistingLocations',
    imgDisplay:"images/find-existing-locations.png",
    usage: 'findExistingLocationsUsage',
    analysisLayer:{
      name: 'analysisLayer',
      geomTypes: ['*']
    },
    optionalParams:[{
      name: 'inputLayers',
      isArray: true,
      geomTypes: ['*']
    }],
    icon: "images/FindExistingLocations32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/FindHotSpots',
    name: 'FindHotSpots',
    title: 'findHotSpots',
    imgDisplay:"images/find-hot-spots.png",
    usage: 'findHotSpotsUsage',
    analysisLayer:{
      name: 'analysisLayer',
      geomTypes: ['esriGeometryPoint', 'esriGeometryMultipoint', 'esriGeometryPolygon']
    },
    optionalParams:[{
      name: 'aggregationPolygonLayers',
      isArray: true,
      geomTypes: ['esriGeometryPolygon']
    }, {
      name: 'boundingPolygonLayers',
      isArray: true,
      geomTypes: ['esriGeometryPolygon']
    }],
    icon: "images/FindHotSpots32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/FindNearest',
    name: 'FindNearest',
    title: 'findNearest',
    imgDisplay:"images/find-nearest.png",
    usage: 'findNearestUsage',
    analysisLayer:{
      name: 'analysisLayer',
      geomTypes: ['*']
    },
    requiredParam:{
      name: 'nearLayers',
      isArray: true,
      geomTypes: ['*']
    },
    icon: "images/FindNearest32.png",
    cannotCancel:true
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/FindOutliers',
    name: 'FindOutliers',
    title: 'findOutliers',
    imgDisplay:"images/find-outliers.png",
    usage: 'findOutliersUsage',
    analysisLayer:{
      name: 'analysisLayer',
      geomTypes: ['esriGeometryPoint', 'esriGeometryMultipoint', 'esriGeometryPolygon']
    },
    optionalParams:[{
      name: 'aggregationPolygonLayers',
      isArray: true,
      geomTypes: ['esriGeometryPolygon']
    }, {
      name: 'boundingPolygonLayers',
      isArray: true,
      geomTypes: ['esriGeometryPolygon']
    }],
    icon: "images/FindOutliers32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/FindSimilarLocations',
    name: 'FindSimilarLocations',
    title: 'findSimilarLocations',
    imgDisplay:"images/find-similar-locations.png",
    usage: 'findSimilarLocationsUsage',
    analysisLayer:{
      name: 'inputLayer',
      geomTypes: ['*']
    },
    optionalParams:[{
      name: 'searchLayers',
      isArray: true,
      geomTypes: ['*']
    }],
    icon: "images/FindSimilarLocations32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/InterpolatePoints',
    name: 'InterpolatePoints',
    title: 'interpolatePoints',
    imgDisplay:"images/interpolate-points.png",
    usage: 'interpolatePointsUsage',
    analysisLayer:{
      name: 'inputLayer',
      geomTypes: ['esriGeometryPoint', 'esriGeometryMultipoint']
    },
    optionalParams:[{
      name: 'boundingPolygonLayers',
      isArray: true,
      geomTypes: ['esriGeometryPolygon']
    }, {
      name: 'predictAtPointLayers',
      isArray: true,
      geomTypes: ['esriGeometryPoint']
    }],
    icon: "images/CreateInterpolatedSurface32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/JoinFeatures',
    name: 'JoinFeatures',
    title: 'joinFeatures',
    imgDisplay:"images/join-features.png",
    usage: 'joinFeaturesUsage',
    analysisLayer:{
      name: 'targetLayer',
      geomTypes: ['*']
    },
    optionalParams:[{
      name: 'targetLayers',
      isArray: true,
      geomTypes: ['*']
    }, {
      name: 'joinLayers',
      isArray: true,
      geomTypes: ['*']
    }],
    icon: "images/JoinFeatures32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/MergeLayers',
    name: 'MergeLayers',
    title: 'mergeLayers',
    imgDisplay:"images/merge-layers.png",
    usage: 'mergeLayersUsage',
    analysisLayer:{
      name: 'inputLayer',
      geomTypes: ['*']
    },
    requiredParam:{
      name: 'mergeLayers',
      isArray: true,
      geomTypes: ['*']
    },
    icon: "images/MergeLayers32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/OverlayLayers',
    name: 'OverlayLayers',
    title: 'overlayLayers',
    imgDisplay:"images/overlay-layers.png",
    usage: 'overlayLayersUsage',
    analysisLayer:{
      name: 'inputLayer',
      geomTypes: ['*']
    },
    requiredParam:{
      name: 'overlayLayer',
      isArray: true,
      geomTypes: ['*']
    },
    icon: "images/OverlayLayers32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/PlanRoutes',
    name: 'PlanRoutes',
    title: 'planRoutes',
    imgDisplay:"images/plan-routes.png",
    usage: 'planRoutesUsage',
    analysisLayer:{
      name: 'stopsLayer',
      geomTypes: ['esriGeometryPoint']
    },
    optionalParams:[{
      name: 'featureLayers',
      isArray: true,
      geomTypes: ['esriGeometryPoint']
    }],
    icon: "images/PlanRoutes32.png",
    cannotCancel:true,
    privileges:['planroutes']
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/SummarizeNearby',
    name: 'SummarizeNearby',
    title: 'summarizeNearby',
    imgDisplay:"images/summarize-nearby.png",
    usage: 'summarizeNearbyUsage',
    analysisLayer:{
      name: 'sumNearbyLayer',
      geomTypes: ['*']
    },
    requiredParam:{
      name: 'summaryLayers',
      isArray: true,
      geomTypes: ['*']
    },
    icon: "images/SummarizeNearby32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/SummarizeWithin',
    name: 'SummarizeWithin',
    title: 'summarizeWithin',
    imgDisplay:"images/summarize-within.png",
    usage: 'summarizeWithinUsage',
    analysisLayer:{
      name: 'sumWithinLayer',
      geomTypes: ['esriGeometryPolygon']
    },
    requiredParam:{
      name: 'summaryLayers',
      isArray: true,
      geomTypes: ['*']
    },
    icon: "images/SummarizeWithin32.png"
  },
  {
    id: toolId++,
    dijitID: 'esri/dijit/analysis/TraceDownstream',
    name: 'TraceDownstream',
    title: 'traceDownstream',
    imgDisplay:"images/trace-downstream.png",
    usage: 'traceDownstreamUsage',
    analysisLayer:{
      name: 'inputLayer',
      geomTypes: ['esriGeometryPoint']
    },
    optionalParams:[{
      name: 'boundingPolygonLayers',
      isArray: true,
      geomTypes: ['esriGeometryPolygon']
    }],
    icon: "images/TraceDownstream32.png",
    privileges:['hydro']
  }];

  mo.findToolSetting = function(toolName){
    var rs = null;
    array.some(_toolParams, function(item) {
      if (item.name === toolName) {
        rs = item;
        return true;
      }
    });
    return rs;
  };

  mo.getAllSettings = function(){
    return lang.clone(_toolParams);
  };

  return mo;
});
