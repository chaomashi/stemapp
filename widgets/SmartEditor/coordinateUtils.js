/*
// Copyright © 2014 - 2018 Esri. All rights reserved.

TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
Unpublished material - all rights reserved under the
Copyright Laws of the United States and applicable international
laws, treaties, and conventions.

For additional information, contact:
Attn: Contracts and Legal Department
Environmental Systems Research Institute, Inc.
380 New York Street
Redlands, California, 92373
USA

email: contracts@esri.com
*/

define([
  'dojo/_base/lang',
  'dojo/Deferred',
  'esri/geometry/webMercatorUtils',
  'esri/SpatialReference'
],
  function (
    lang,
    Deferred,
    webMercatorUtils,
    SpatialReference
  ) {

    var mo = {};

    mo.getProjectedGeometry = function (geometry, outSR, geometryService) {
      var deferred, result;
      deferred = new Deferred();
      //if can be projected using webMercatorUtil do it else use geometry service
      if (webMercatorUtils.canProject(geometry, outSR)) {
        result = webMercatorUtils.project(geometry, outSR);
        deferred.resolve(result);
      } else {
        geometryService.project([geometry], outSR, function (projectedGeometries) {
          result = projectedGeometries[0];
          deferred.resolve(result);
        });
      }
      return deferred.promise;
    };

    mo.getMapCoordinates = function (geometry) {
      var mapCoordinate;
      switch (geometry.type) {
        case "polygon":
          //get centroid of the polygon as x and y
          mapCoordinate = geometry.getCentroid();
          break;
        case "polyline":
          //get first point of the polyline as x and y
          mapCoordinate = geometry.getPoint(0, 0);
          break;
        case "point":
          //use the point itself
          mapCoordinate = geometry;
          break;
      }
      return mapCoordinate;
    };

    mo.getCoordinatesData = function (geometry, geometryService) {
      var def, coordinatesInfo = {}, latLongSpatialRef;
      def = new Deferred();
      latLongSpatialRef = new SpatialReference(4326);
      coordinatesInfo.MapSpatialReference = mo.getMapCoordinates(geometry);
      mo.getProjectedGeometry(
        coordinatesInfo.MapSpatialReference, latLongSpatialRef, geometryService).then(
        lang.hitch(this, function (latLongCoordinates) {
          coordinatesInfo.LatLong = latLongCoordinates;
          def.resolve(coordinatesInfo);
        }));
      return def.promise;
    };

    return mo;
  });
