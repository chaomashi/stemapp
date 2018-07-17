define(
  ["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/Deferred",
    "jimu/BaseWidgetSetting",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    "esri/geometry/Extent"
  ],
  function (
    declare,
    lang,
    Deferred,
    BaseWidgetSetting,
    Query,
    QueryTask,
    Extent
  ) {
    return declare([BaseWidgetSetting], {
      baseClass: "jimu-widget-smartEditor-widgets-intersection",
      completeDef: null,
      layerFieldsObj: {},
      queriedLayers: [],
      postCreate: function () {
        this.startup();
        this.completeDef = null;
        this.layerFieldsObj = {};
        this.queriedLayers = [];
      },

      startup: function () {
      },

      getDistinctLayers: function (selectedLayerInfo, featureGeometry) {
        var allDef = new Deferred(), distinctLayers = {};
        this.completeDef = null;
        this.layerFieldsObj = {};
        this.queriedLayers = [];
        this.completeDef = new Deferred();
        //Loop through all the field values
        if (selectedLayerInfo.fieldValues) {
          for (var fieldName in selectedLayerInfo.fieldValues) {
            distinctLayers[fieldName] = [];
            for (var i = 0; i < selectedLayerInfo.fieldValues[fieldName].length; i++) {
              var copyAction = selectedLayerInfo.fieldValues[fieldName][i];
              if (copyAction.actionName === "Intersection" && copyAction.enabled) {
                for (var j = 0; j < copyAction.fields.length; j++) {
                  var field = copyAction.fields[j];
                  if (distinctLayers[fieldName].indexOf(field.layerId) === -1) {
                    distinctLayers[fieldName].push(field.layerId);
                  }
                }
              }
            }
          }
          this._getIntersectionsForEachField(distinctLayers, featureGeometry);
        } else {
          this.completeDef.resolve({});
        }
        //Deferred object listening for entire process completion
        this.completeDef.then(lang.hitch(this, function () {
          allDef.resolve(this.layerFieldsObj);
        }));
        return allDef.promise;
      },

      _getIntersectionsForEachField: function (distinctLayers, featureGeometry) {
        var allFieldForSelectedLayer;
        allFieldForSelectedLayer = Object.keys(distinctLayers);
        //Fire intersection request for all the valid layers in field values
        if (allFieldForSelectedLayer.length > 0) {
          var fieldName = allFieldForSelectedLayer[0];
          var promise = this._syncIntersectionRequests(distinctLayers[fieldName], featureGeometry);
          promise.then(lang.hitch(this, function () {
            delete distinctLayers[fieldName];
            this._getIntersectionsForEachField(distinctLayers, featureGeometry);
          }));
        } else {
          this.completeDef.resolve();
        }
      },

      _filterQueriedLayers: function (distinctLayers) {
        var layerId;
        //Filter already queried layers
        //This will reduce the server load and improve the response time
        for (layerId in this.layerFieldsObj) {
          var index = distinctLayers.indexOf(layerId);
          if (index > -1) {
            distinctLayers.splice(index, 1);
          }
        }
        return distinctLayers;
      },
      _syncIntersectionRequests: function (distinctLayers, geometry, fieldDef) {
        if (!fieldDef) {
          fieldDef = new Deferred();
        }
        distinctLayers = this._filterQueriedLayers(distinctLayers);
        if (distinctLayers.length > 0) {
          var promise = this._getIntersectedFeatures(distinctLayers[0], geometry);
          promise.then(lang.hitch(this, function (result) {
            if (result.features.length > 0) {
              this._intersectionResult(result, fieldDef);
            } else {
              distinctLayers.splice(0, 1);
              if (distinctLayers.length > 0) {
                this._syncIntersectionRequests(distinctLayers, geometry, fieldDef);
              } else {
                this._intersectionResult(result, fieldDef);
              }
            }
          }));
        } else {
          fieldDef.resolve();
        }
        return fieldDef.promise;
      },

      _intersectionResult: function (result, fieldDef) {
        //Store the data for further use
        if (result.layerId) {
          this.layerFieldsObj[result.layerId] =
            result.features && result.features.length > 0 ? result.featuresAttributes : {};
        }
        fieldDef.resolve();
      },

      //ref: https://blogs.esri.com/esri/arcgis/2010/02/08/find-graphics-under-a-mouse-click-with-the-arcgis-api-for-javascript/
      pointToExtent: function (map, point, toleranceInPixel) {
        //calculate map coords represented per pixel
        var pixelWidth = map.extent.getWidth() / map.width;
        //calculate map coords for tolerance in pixel
        var toleraceInMapCoords = toleranceInPixel * pixelWidth;
        //calculate & return computed extent
        return new Extent(point.x - toleraceInMapCoords,
          point.y - toleraceInMapCoords,
          point.x + toleraceInMapCoords,
          point.y + toleraceInMapCoords,
          map.spatialReference);
      },

      _getAppropriateGeometryForQuery: function (featureGeometry) {
        var returGeometry;
        returGeometry = featureGeometry;
        if (featureGeometry.type === "point") {
          returGeometry = this.pointToExtent(this.map, featureGeometry, 20);
        }
        return returGeometry;
      },

      _getIntersectedFeatures: function (layerId, featureGeometry) {
        var layerDef, query, queryTask, attributes, layerObject, objectIdField;
        layerObject = this._jimuLayerInfos.getLayerOrTableInfoById(layerId).layerObject;
        objectIdField = layerObject.objectIdField;
        layerDef = new Deferred();
        query = new Query();
        queryTask = new QueryTask(layerObject.url);
        query.geometry = this._getAppropriateGeometryForQuery(featureGeometry);
        query.outFields = ["*"];
        query.returnGeometry = false;
        queryTask.execute(query, lang.hitch(this, function (result) {
          if (result && result.features && result.features.length > 0) {
            //sort the feature and take the feature with latest OID
            result.features.sort(function (firstFeature, secondFeature) {
              var firstFeatureOID, secondFeatureOID;
              firstFeatureOID = parseInt(firstFeature.attributes[objectIdField], 10);
              secondFeatureOID = parseInt(secondFeature.attributes[objectIdField], 10);
              if (firstFeatureOID < secondFeatureOID) {
                return 1;
              }
              return 0;
            });
            attributes = result.features[0].attributes;
          } else {
            result = {
              "features": []
            };
            attributes = {};
          }
          layerDef.resolve({
            "layerId": layerId,
            "features": result.features,
            "featuresAttributes": attributes
          });
        }), function () {
          layerDef.resolve({
            "layerId": layerId,
            "features": [],
            "featuresAttributes": {}
          });
        });
        return layerDef.promise;
      }
    });
  });