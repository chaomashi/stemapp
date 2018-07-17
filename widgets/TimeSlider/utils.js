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

define(['dojo/_base/html', 'dojo/dom-geometry'],
  function (html, domGeometry) {

    var mo = {};

    //TODO not sure
    mo.isLayerEnabledTime = function (layer, layerInfosObj) {
      var layerInfo = layerInfosObj.getLayerInfoById(layer.id);
      if (!layerInfo) {
        return;
      }
      //1
      var layerObjet = layerInfo.layerObject;
      var isTimeEnabled = layerObjet.timeInfo && layerObjet.timeInfo.timeExtent; //&& !parameterList.layer.timeInfo.hasLiveData;
      var usesTime = true;
      //2
      var originLayer = layerInfo.originOperLayer;
      if ("undefined" !== typeof originLayer.itemProperties.timeAnimation) {
        usesTime = false;// arcgis-portal-app-master\src\js\arcgisonline\map\itemData.js Line#205
      }
      if (false === originLayer.timeAnimation) {
        usesTime = false;
      }
      if (true === originLayer.timeAnimation) {
        usesTime = true;
      }
      if ("undefined" !== typeof originLayer.itemProperties.timeAnimation &&
        "undefined" !== typeof originLayer.timeAnimation) {
        usesTime = true;
      }

      return !!(usesTime && isTimeEnabled);
    };

    mo.initPositionForTheme = {
      "DartTheme": {
        bottom: 140
      },
      'LaunchpadTheme': {
        bottom: 120
      }
    };

    mo.isRunInMobile = function () {
      return window.appInfo.isRunInMobile;
    };
    mo.isOutOfScreen = function (map, position) {
      var containerBox = domGeometry.getMarginBox(map.root);
      var mapWidth = containerBox.w;
      var mapHeight = containerBox.h;

      if (position &&
        (position.top >= mapHeight || position.left >= mapWidth)) {

        return true;
      } else {
        return false;
      }
    };
    mo.initPosition = function(map,domNode,position){
      var appConfig = window.getAppConfig();
      var theme;
      if(appConfig && appConfig.theme && appConfig.theme.name){
        theme = appConfig.theme.name;
      }

      var top = mo.getInitTop(map, theme);
      var left = mo.getInitLeft(map, domNode);
      position.top = top;
      position.left = left;
      html.setStyle(domNode, 'top', position.top + 'px');
      html.setStyle(domNode, 'left', position.left + 'px');
    };
    mo.getInitTop = function (map,/*domNode,*/theme) {
      var top = 0;
      var containerBox = domGeometry.getMarginBox(map.root);
      // var sliderContentBox = html.getContentBox(domNode);
      // var popupHeight = sliderContentBox.h;
      var popupHeight = 35;//height of mini mode

      var marginBottom = mo.initPositionForTheme[theme] ? mo.initPositionForTheme[theme].bottom : 60;
      top = containerBox.h - marginBottom - popupHeight;

      return top;
    };
    mo.getInitLeft = function (map, domNode/*, theme*/) {
      var left = 0;
      var containerBox = domGeometry.getMarginBox(map.root);
      var sliderContentBox = html.getContentBox(domNode);

      var middleOfScreenWidth = containerBox.w / 2;
      var middleOfPopupWidth = sliderContentBox.w / 2;
      left = middleOfScreenWidth - middleOfPopupWidth;

      return left;
    };


    return mo;
  });