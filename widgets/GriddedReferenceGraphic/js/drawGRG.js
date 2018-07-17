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
  "esri/geometry/Point",
  "esri/geometry/Polygon",
  "esri/geometry/geometryEngine",
  "esri/graphic",
  "esri/geometry/webMercatorUtils",
  "esri/SpatialReference",
  "esri/geometry/Circle",
  "esri/request",
  "dojo/json",
  "./geometryUtils"
], function(
  Point,
  Polygon,
  geometryEngine,
  Graphic,
  webMercatorUtils,
  SpatialReference,
  EsriCircle,
  esriRequest,
  JSON,
  geometryUtils
) {

  var grg = {};

  grg.createGRG = function(HorizontalCells, VerticalCells,centerPoint,
    cellWidth,cellHeight,angle,labelStartPosition,labelStyle,
    labelDirection,gridStyle,gridOrigin,geodesic,map) {

    //set up variables
    var letterIndex,secondLetterIndex,number;
    var BL, BR, TL, TR, P1, P2, P3, P4, P5, P6;
    var features = [];
    var startX = 0;
    var startY = 0;
    var radius = (cellWidth/2)/Math.cos(30* Math.PI/180);
    var startPoint;
    var nextStartPoint;
    var hexHorizontalCells = HorizontalCells;

    switch (labelStartPosition) {
      case "upperLeft":
        if(labelDirection === "horizontal") {
          letterIndex = VerticalCells - 1;
          secondLetterIndex = -1;
          if(labelStyle !== "numeric") {
            number = 0;
          } else {
            number = (VerticalCells - 1) * HorizontalCells;
            if(gridStyle === "hexagon") {
              number = number + Math.floor(VerticalCells / 2);
            }
          }
        } else {
          letterIndex = -1;
          secondLetterIndex = VerticalCells - 1;
          if(labelStyle !== "numeric") {
            number = VerticalCells;
          }
        }
        break;
      case "upperRight":
        if(labelDirection === "horizontal") {
          letterIndex = VerticalCells - 1;
          secondLetterIndex = HorizontalCells;
          if(labelStyle !== "numeric") {
            number = HorizontalCells + 1;
          } else {
            number = (VerticalCells * HorizontalCells) + 1;
            if(gridStyle === "hexagon") {
              number = number + Math.floor(VerticalCells / 2);
            }
          }
        } else {
          if(labelStyle !== "numeric") {
            number = VerticalCells;
          } else {
            number = (VerticalCells * (HorizontalCells + 1));
          }
          letterIndex = HorizontalCells;
          secondLetterIndex = VerticalCells - 1;
        }
        break;
      case "lowerRight":
        if(labelDirection === "horizontal") {
          letterIndex = 0;
          secondLetterIndex = HorizontalCells;
          number = HorizontalCells + 1;
        } else {
          letterIndex = HorizontalCells;
          secondLetterIndex = 0;
          number = 1;
        }
        break;
      case "lowerLeft":
        if(labelDirection === "horizontal") {
          letterIndex = 0;
          number = 0;
          secondLetterIndex = -1;
        } else {
          letterIndex = -1;
          number = 1;
          secondLetterIndex = 0;
        }
        break;
    }

    // work out required off set for first point
    // always draw grid from lower left corner
    var offsetX = (HorizontalCells*cellWidth)/2;
    var offsetY;
    if(gridStyle === "hexagon") {
      if(VerticalCells%2 === 1){
        offsetY = ((((VerticalCells-1)/2) * (radius*3)) + radius)/2;
      } else {
        offsetY = (((VerticalCells/2) * (radius*3)) - (radius/2))/2;
      }
    }else{
      offsetY = (VerticalCells*cellHeight)/2;
    }

    for (var i = 1; i <= VerticalCells; i++)
    {
      for (var j = 1; j <= HorizontalCells; j++)
      {
        if(geodesic) {
          var polygon = new Polygon();
          //always draw grid from lower left corner
          if(i === 1 && j === 1){
            // the center point needs to be in geographics
            if(centerPoint.spatialReference.wkid === 102100){
              centerPoint = webMercatorUtils.webMercatorToGeographic(centerPoint);
            }

            switch (gridOrigin) {
              case "center":
                startPoint = geometryUtils.getDestinationPoint(centerPoint, 180 + angle, offsetY);
                startPoint = geometryUtils.getDestinationPoint(startPoint, 270 + angle, offsetX);
                break;
              case "upperLeft":
                startPoint = geometryUtils.getDestinationPoint(centerPoint, 180 + angle, offsetY*2);
                break;
              case "upperRight":
                startPoint = geometryUtils.getDestinationPoint(centerPoint, 180 + angle, offsetY*2);
                startPoint = geometryUtils.getDestinationPoint(startPoint, 270 + angle, offsetX*2);
                break;
              case "lowerRight":
                startPoint = geometryUtils.getDestinationPoint(centerPoint, 270 + angle, offsetX*2);
                break;
              case "lowerLeft":
                startPoint = centerPoint;
                break;
            }
          }

          if(gridStyle === "default") {
            BL = startPoint;
            TL = geometryUtils.getDestinationPoint(BL, 0 + angle, cellHeight);
            TR = geometryUtils.getDestinationPoint(TL, 90 + angle, cellWidth);
            BR = geometryUtils.getDestinationPoint(TR, 180 + angle, cellHeight);
            polygon.addRing([[BL.x,BL.y],[TL.x,TL.y],[TR.x,TR.y],[BR.x,BR.y]]);
            startPoint = BR;
          } else {
            P1 = startPoint;
            P2 = geometryUtils.getDestinationPoint(P1, 0 + angle, radius);
            P3 = geometryUtils.getDestinationPoint(P2, 60 + angle, radius);
            P4 = geometryUtils.getDestinationPoint(P3, 120 + angle, radius);
            P5 = geometryUtils.getDestinationPoint(P4, 180 + angle, radius);
            P6 = geometryUtils.getDestinationPoint(P5, 240 + angle, radius);
            polygon.addRing([[P1.x,P1.y],[P2.x,P2.y],
              [P3.x,P3.y],[P4.x,P4.y],[P5.x,P5.y],[P6.x,P6.y]]);
            startPoint  = geometryUtils.getDestinationPoint(startPoint, 90 + angle, cellWidth);
          }

          /*
          For some reason if the angle is over below -45 or over 45 then the label will not show
          running the polygon through a simplify operation fixes this
          */
          polygon = geometryEngine.simplify(polygon);

          //project the geometry to the same spatial reference as the map
          if(map.spatialReference.wkid !== 4326){
            polygon = webMercatorUtils.geographicToWebMercator(polygon);
          }
          var graphic = new Graphic(polygon);

          if(j === 1){
            if(gridStyle === "hexagon") {
              if(hexHorizontalCells === HorizontalCells){
                nextStartPoint = geometryUtils.getDestinationPoint(P2, 300 + angle, radius);
              } else {
                nextStartPoint = P3;
              }

            } else {
              nextStartPoint = TL;
            }
          }

        } else {
          var polygon = new Polygon(new SpatialReference({wkid:102100}));

          if(centerPoint.spatialReference.wkid === 4326){
            centerPoint = webMercatorUtils.geographicToWebMercator(centerPoint);
          }

          switch (gridOrigin) {
            case "center":
              startX = centerPoint.x - offsetX;
              startY = centerPoint.y - offsetY;
              break;
            case "upperLeft":
              startX = centerPoint.x;
              startY = centerPoint.y - (offsetY * 2);
              break;
            case "upperRight":
              startX = centerPoint.x - (offsetX * 2);
              startY = centerPoint.y - (offsetY * 2);
              break;
            case "lowerRight":
              startX = centerPoint.x - (offsetX*2);
              startY = centerPoint.y;
              break;
            case "lowerLeft":
              startX = centerPoint.x;
              startY = centerPoint.y;
              break;
          }

          if(gridStyle === "default") {
            polygon.addRing([
                 [startX + ((j-1) * cellWidth) , startY + ((i-1) * cellHeight)],
                 [startX + ((j-1) * cellWidth) , startY + (i * cellHeight)],
                 [startX + (j * cellWidth) , startY + (i * cellHeight)],
                 [startX + (j * cellWidth) , startY + ((i-1) * cellHeight)],
                 [startX + ((j-1) * cellWidth) , startY + ((i-1) * cellHeight)]
            ]);
          } else {
            hexHorizontalCells === HorizontalCells?
              startX = startX + ((j-1) * (cellWidth)) + (cellWidth/2):
              startX = startX + ((j-1) * (cellWidth));
            startY = (startY + radius) + ((i-1) * (radius*1.5));
            var hexagonCenter = new Point([startX,startY],new SpatialReference({ wkid:102100 }));
            var hexagon = new EsriCircle(hexagonCenter, {radius: radius,numberOfPoints: 6});
            var hexagonRotated =  geometryEngine.rotate(hexagon,90,hexagonCenter);
            polygon.addRing(hexagonRotated.rings[0]);
          }

          //rotate the graphics as required
          var polygonRotated =  geometryEngine.rotate(polygon, (angle * -1),  centerPoint);

          //project the geometry to the same spatial reference as the map
          if(map.spatialReference.wkid !== 102100){
            polygonRotated = webMercatorUtils.webMercatorToGeographic(polygonRotated);
          }
          graphic = new Graphic(polygonRotated);
        }

        switch (labelStartPosition) {
          case "upperLeft":
            if(labelDirection === "horizontal") {
              secondLetterIndex += 1;
              number += 1;
            } else {
              letterIndex += 1;
              if(labelStyle === "numeric"){
                number =  (VerticalCells * j) - (i-1);
              }
            }
            break;
          case "lowerLeft":
            if(labelDirection === "horizontal") {
              secondLetterIndex += 1;
              number += 1;
            } else {
              letterIndex += 1;
              if(labelStyle === "numeric"){
                number = (VerticalCells * (j-1)) + i;
              }
            }
            break;
          case "upperRight":
            if(labelDirection === "horizontal") {
               number = number - 1;
               secondLetterIndex = secondLetterIndex - 1;
            } else {
              letterIndex = letterIndex - 1;
              if(labelStyle === "numeric"){
                number = number - HorizontalCells;
              }
            }
            break;
          case "lowerRight":
            if(labelDirection === "horizontal") {
               number = number - 1;
               secondLetterIndex = secondLetterIndex - 1;
            } else {
              letterIndex = letterIndex - 1;
              if(labelStyle === "numeric"){
                number = (VerticalCells * (HorizontalCells-j)) + i;
              }
            }
            break;
        }
        features.push(grg.addGraphicLabel(graphic,labelStyle,number,letterIndex,secondLetterIndex));
      }

      startPoint = nextStartPoint;

      if(gridStyle === "hexagon"){
        hexHorizontalCells === HorizontalCells?HorizontalCells++:HorizontalCells--;
      }

      switch (labelStartPosition) {
          case "upperLeft":
            if(labelDirection === "horizontal") {
              letterIndex = letterIndex - 1;
              if(labelStyle !== "numeric") {
                number = 0;
              } else {
                if(gridStyle === "hexagon") {
                  number = (number - (2 * hexHorizontalCells)) - 1;
                } else {
                  number = (number - (2 * HorizontalCells));
                }
              }
              secondLetterIndex = -1;
            } else {
              letterIndex = -1;
              secondLetterIndex = (VerticalCells - (i+1));
              if(labelStyle !== "numeric") {
                number = VerticalCells - i;
              }
            }
            break;
          case "upperRight":
            if(labelDirection === "horizontal") {
              letterIndex = letterIndex - 1;
              if (labelStyle !== "numeric")
              {
                number = HorizontalCells + 1;
              }
              secondLetterIndex = HorizontalCells;
            } else {
              if (labelStyle !== "numeric") {
                number = number - 1;
              } else {
                number = (VerticalCells * (HorizontalCells + 1)) - i;
              }
              letterIndex = HorizontalCells;
              secondLetterIndex = secondLetterIndex - 1;

            }
            break;
          case "lowerRight":
            if(labelDirection === "horizontal") {
              letterIndex += 1;
              if(labelStyle !== "numeric") {
                number = HorizontalCells + 1;
              } else {
                if(gridStyle === "hexagon") {
                  number = (number + (2 * hexHorizontalCells)) + 1;
                } else {
                  number = (number + (2 * HorizontalCells));
                }
              }
              secondLetterIndex = HorizontalCells;
            } else {
              letterIndex = HorizontalCells;
              secondLetterIndex += 1;
              if(labelStyle !== "numeric") {
                number += 1;
              } else {
                number = HorizontalCells * i;
              }
            }
            break;
          case "lowerLeft":
            if(labelDirection === "horizontal") {
              letterIndex += 1;
              if (labelStyle !== "numeric") {
                number = 0;
              }
              secondLetterIndex = -1;
            } else {
              letterIndex = -1;
              if (labelStyle !== "numeric") {
                number += 1;
              }
              secondLetterIndex = i;
            }
            break;
        }
    }
    return features;
  },

  grg.convertNumberToLetters = function (n) {
    var ordA = "A".charCodeAt(0);
    var ordZ = "Z".charCodeAt(0);
    var len = ordZ - ordA + 1;
    var s = "";
    while(n >= 0) {
        s = String.fromCharCode(n % len + ordA) + s;
        n = Math.floor(n / len) - 1;
    }
    return s;
  },

  grg.checkGridSize = function (numCellsHorizontal,numCellsVertical) {
    var totalNumber = numCellsHorizontal*numCellsVertical;
    return totalNumber < 2000;
  },

  grg.getFeatureServiceParams = function (featureServiceName, map) {
    return {
     "name" : featureServiceName,
     "serviceDescription" : "",
     "hasStaticData" : false,
     "maxRecordCount" : 1000,
     "supportedQueryFormats" : "JSON",
     "capabilities" : "Create,Delete,Query,Update,Editing",
     "tags" : "GRG",
     "description" : "",
     "copyrightText" : "",
     "spatialReference" : {
        "wkid" : 102100
        },
     "initialExtent" : {
        "xmin": map.extent.xmin,
        "ymin": map.extent.ymin,
        "xmax": map.extent.xmax,
        "ymax": map.extent.ymax,
        "spatialReference":{
          "wkid":102100
        }
      },
     "allowGeometryUpdates" : true,
     "units" : "esriMeters",
     "xssPreventionInfo" : {
        "xssPreventionEnabled" : true,
        "xssPreventionRule" : "InputOnly",
        "xssInputRule" : "rejectInvalid"
      }
    };
  },

  grg.getLayerParams = function (layerName, map, textSymbol, gridSymbol) {
    return {
      "layers": [
        {
          "adminLayerInfo": {
            "geometryField": {
              "name": "Shape"
            },
            "xssTrustedFields": ""
          },
          "id": 0,
          "name": layerName,
          "type": "Feature Layer",
          "displayField": "",
          "description": "A GRG (Gridded Reference Graphic) is a grid overlay used for a common" +
           "reference point in many situations - from cordon and search operations to security" +
           "for presidential inaugurations.",
          "tags" : "GRG",
          "copyrightText": "",
          "defaultVisibility": true,
          "ownershipBasedAccessControlForFeatures" : {
            "allowOthersToQuery" : false,
            "allowOthersToDelete" : false,
            "allowOthersToUpdate" : false
          },
          "relationships": [],
          "isDataVersioned" : false,
          "supportsCalculate" : true,
          "supportsAttachmentsByUploadId" : true,
          "supportsRollbackOnFailureParameter" : true,
          "supportsStatistics" : true,
          "supportsAdvancedQueries" : true,
          "supportsValidateSql" : true,
          "supportsCoordinatesQuantization" : true,
          "supportsApplyEditsWithGlobalIds" : true,
          "advancedQueryCapabilities" : {
            "supportsPagination" : true,
            "supportsQueryWithDistance" : true,
            "supportsReturningQueryExtent" : true,
            "supportsStatistics" : true,
            "supportsOrderBy" : true,
            "supportsDistinct" : true,
            "supportsQueryWithResultType" : true,
            "supportsSqlExpression" : true,
            "supportsReturningGeometryCentroid" : true
          },
          "useStandardizedQueries" : false,
          "geometryType": "esriGeometryPolygon",
          "minScale" : 0,
          "maxScale" : 0,
          "extent": {
            "xmin": map.extent.xmin,
            "ymin": map.extent.ymin,
            "xmax": map.extent.xmax,
            "ymax": map.extent.ymax,
            "spatialReference":{
              "wkid":102100
            }
          },
          "drawingInfo": {
            "renderer": {
             "type": "simple",
             "symbol": gridSymbol
            },
            "transparency": 0,
            "labelingInfo": [
               {
                "labelExpression": "[grid]",
                "labelExpressionInfo": {"value": "{grid}"},
                "format": null,
                "fieldInfos": null,
                "useCodedValues": false,
                "maxScale": 0,
                "minScale": 0,
                "where": null,
                "sizeInfo": null,
                "labelPlacement": "esriServerPolygonPlacementAlwaysHorizontal",
                "symbol": textSymbol
              }
            ]
          },
          "allowGeometryUpdates": true,
          "hasAttachments": false,
          "htmlPopupType": "esriServerHTMLPopupTypeNone",
          "hasM": false,
          "hasZ": false,
          "objectIdField": "OBJECTID",
          "globalIdField": "",
          "typeIdField": "",
          "fields": [
            {
              "name": "OBJECTID",
              "type": "esriFieldTypeOID",
              "actualType": "int",
              "alias": "OBJECTID",
              "sqlType": "sqlTypeOther",
              "nullable": false,
              "editable": false,
              "domain": null,
              "defaultValue": null
            },
            {
              "name": "grid",
              "type": "esriFieldTypeString",
              "alias": "grid",
              "actualType": "nvarchar",
              "nullable": true,
              "editable": true,
              "domain": null,
              "defaultValue": null,
              "sqlType": "sqlTypeNVarchar",
              "length": 256
            }
          ],
          "indexes": [],
          "types": [],
          "templates": [
            {
              "name": "New Feature",
              "description": "",
              "drawingTool": "esriFeatureEditToolPolygon",
              "prototype": {
                "attributes": {
                  "grid": ""
                }
              }
            }
          ],
          "supportedQueryFormats": "JSON",
          "hasStaticData": false,
          "maxRecordCount": 10000,
          "standardMaxRecordCount" : 4000,
          "tileMaxRecordCount" : 4000,
          "maxRecordCountFactor" : 1,
          "exceedsLimitFactor" : 1,
          "capabilities": "Query,Editing,Create,Update,Delete"
        }
      ]
    };
  },

  grg.isNameAvailable = function (serviceName, token, featureServiceName) {
    //Check for the layer name
    var def = esriRequest({
      url: serviceName,
      content: {
        name: featureServiceName,
        type: "Feature Service",
        token: token,
        f: "json"
      },
      handleAs: "json",
      callbackParamName: "callback"
    },{usePost: true});
    return def;
  },

  grg.createFeatureService = function (serviceUrl, token, createParams) {
    //create the service
    var def = esriRequest({
      url: serviceUrl,
      content: {
        f: "json",
        token: token,
        typeKeywords: "ArcGIS Server,Data,Feature Access,Feature Service,Service,Hosted Service",
        createParameters: JSON.stringify(createParams),
        outputType: "featureService"
      },
      handleAs: "json",
      callbackParamName: "callback"
    },{usePost: true});
    return def;
  },

  grg.addDefinitionToService = function (serviceUrl, token, defParams) {
    var def = esriRequest({
      url: serviceUrl,
      content: {
        token: token,
        addToDefinition: JSON.stringify(defParams),
        f: "json"
      },
      handleAs: "json",
      callbackParamName: "callback"
    },{usePost: true});
    return def;
  },

  grg.labelReferenceGrid = function (features, labelType, startPos, gridSize) {
    var letterIndex = -1;
    var number = 1;
    var secondLetterIndex;
    var newLine = true;
    var currentFeature = null;
    var labeledFeatures = [];
    var extent;

    while (features.length > 0) {
      if (newLine) {
        letterIndex++;
        if(labelType === "alphaNumeric") {
          number = 1;
        } else if(labelType === "alphaAlpha") {
          secondLetterIndex = 0;
        }
        //union all the features that are currently in the features array
        var union = geometryEngine.union(features);
        //get the start corner of the union extent
        extent = union.getExtent();
        var startCorner;
        switch(startPos){
          case "lowerLeft":
            startCorner = geometryEngine.nearestCoordinate(
              union, new Point(extent.xmin,extent.ymin,extent.spatialReference));
            break;
          case "lowerRight":
            startCorner = geometryEngine.nearestCoordinate(
              union, new Point(extent.xmax,extent.ymin,extent.spatialReference));
            break;
          case "upperLeft":
            startCorner = geometryEngine.nearestCoordinate(
              union, new Point(extent.xmin,extent.ymax,extent.spatialReference));
            break;
          case "upperRight":
            startCorner = geometryEngine.nearestCoordinate(
              union, new Point(extent.xmax,extent.ymax,extent.spatialReference));
            break;
        }
        //find the feature that shares the startCorner geometry
        for(var i = 0;i < features.length; i++ ) {
          if(geometryEngine.touches(features[i],startCorner.coordinate)) {
            currentFeature = features[i];
            labeledFeatures.push(grg.addGraphicLabel(
              new Graphic(features[i]),labelType,number,letterIndex,secondLetterIndex));
            number++;
            secondLetterIndex++;
            //remove item from features
            var index = features.indexOf(features[i]);
            features.splice(index, 1);
            newLine = false;
            break;
          }
        }
      } else {
        newLine = true;
        //get the extent of the current feature
        extent = currentFeature.getExtent();
        var oppositeCorner;
        //get the opposite corner of the current feature extent
        switch(startPos){
          case "lowerLeft":
            // get BR
            oppositeCorner = geometryEngine.nearestCoordinate(
              currentFeature, new Point(extent.xmax,extent.ymin,extent.spatialReference));
            break;
          case "lowerRight":
            // get BL
            oppositeCorner = geometryEngine.nearestCoordinate(
              currentFeature, new Point(extent.xmin,extent.ymin,extent.spatialReference));
            break;
          case "upperLeft":
            // get TR
            oppositeCorner = geometryEngine.nearestCoordinate(
              currentFeature, new Point(extent.xmax,extent.ymax,extent.spatialReference));
            break;
          case "upperRight":
            // get TL
            oppositeCorner = geometryEngine.nearestCoordinate(
              currentFeature, new Point(extent.xmin,extent.ymax,extent.spatialReference));
            break;
        }

        //find the feature that shares the opposite corner geometry
        for(var j = 0;j < features.length; j++ ) {
          extent = features[j].getExtent();
          var newCorner;
          switch(startPos){
            case "lowerLeft":
              newCorner = geometryEngine.nearestCoordinate(
                features[j], new Point(extent.xmin,extent.ymin,extent.spatialReference));
              break;
            case "lowerRight":
              newCorner = geometryEngine.nearestCoordinate(
                features[j], new Point(extent.xmax,extent.ymin,extent.spatialReference));
              break;
            case "upperLeft":
              newCorner = geometryEngine.nearestCoordinate(
                features[j], new Point(extent.xmin,extent.ymax,extent.spatialReference));
              break;
            case "upperRight":
              newCorner = geometryEngine.nearestCoordinate(
                features[j], new Point(extent.xmax,extent.ymax,extent.spatialReference));
              break;
          }

          // newCorner is not always the correct coord so just do an
          // slight buffer on the geometry and use contains
          var buffer = geometryEngine.buffer(
            newCorner.coordinate, gridSize === "UTM"?10000:gridSize/5, 9001);

          if(geometryEngine.contains(buffer,oppositeCorner.coordinate)) {
            currentFeature = features[j];
            labeledFeatures.push(grg.addGraphicLabel(
              new Graphic(features[j]),labelType,number,letterIndex,secondLetterIndex));
            number++;
            secondLetterIndex++;
            //remove item from features
            var newIndex = features.indexOf(features[j]);
            features.splice(newIndex, 1);
            newLine = false;
            break;
          }
        }
      }
    }
    return labeledFeatures;
  },

  grg.addGraphicLabel = function (graphic, labelType, number, letterIndex, secondLetterIndex) {
    var letter = grg.convertNumberToLetters(letterIndex);
    var secondLetter = grg.convertNumberToLetters(secondLetterIndex);var attr = {};
    switch (labelType) {
      case "alphaNumeric":
        attr.grid = letter.toString() + number.toString();
        break;
      case "alphaAlpha":
        attr.grid = letter.toString() + "-" + secondLetter.toString();
        break;
       case "numeric":
        attr.grid = number.toString();
        break;
    }
    graphic.setAttributes(attr);
    return graphic;
  },

  grg.checkPolarRegion = function(geometry) {
    //used to check if GRG from Ref System falls within Polar Regions
    var polarRegions = new Polygon({"rings":[
                             [[-180,84],[-180,90],[180,90],[180,84],[-180,84]],
                             [[-180,-90],[-180,-80],[180,-80],[180,-90],[-180,-90]]],
                             "spatialReference":{"wkid":4326}});

    return geometryEngine.intersects(geometry,polarRegions);
  };

  return grg;
});

