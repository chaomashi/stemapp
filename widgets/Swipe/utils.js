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

define(['dojo/_base/lang', 'dojo/_base/Color', 'dojo/_base/html'],
  function (lang, Color, html) {

    var mo = {};
    mo.defaultColor = "#dadada";//handler default color

    mo.zoomToCurrentLayer = function (that) {
      var isZoom = that.config.isZoom,
        layerInfosObj = that.layerInfosObj,
        currentLayerId = that._currentLayerId;

      if (isZoom && currentLayerId) {
        var layerInfo = layerInfosObj.getLayerInfoById(currentLayerId);
        if (!layerInfo || !layerInfo.zoomTo) {
          return;//can't get layer
        }

        layerInfo.zoomTo();//zoom to layer
      }
    };

    //whether has layerConfig after setting
    mo.isTherePreconfiguredLayer = function (config, currentLayerId) {
      if (currentLayerId) {
        return true;
      }

      if (config && config.layerState) {
        var layerOptions = config.layerState;
        for (var key in layerOptions) {
          if (layerOptions.hasOwnProperty(key)) {
            var layer = layerOptions[key];
            if (true === layer.selected) {//selected in config
              return true;
            }
          }
        }
      }

      return false;//all disselected
    };

    mo.processColor = function (configColor) {
      if (!configColor) {
        return new Color(mo.defaultColor);
      }

      return new Color(configColor);
    };

    //put swipe bar to center
    mo.getScreenMiddle = function (map) {
      var left = 0,
        top = 0;
      if (map) {
        if (map.root) {
          var mapBox = html.getMarginBox(map.root);
          left = mapBox.w / 2;
          top = mapBox.h / 2;
        } else if (map.width && map.height) {
          left = map.width / 2;
          top = map.height / 2;
        }
      }

      return {
        left: left,
        top: top
      };
    };

    //show or hide chooser
    mo.hideSelectorPopup = function (domNode) {
      html.addClass(domNode, "hide");
    };
    mo.showSelectorPopup = function (domNode) {
      html.removeClass(domNode, "hide");
    };

    //hack to refresh: sometimes need to drag the bar to see the other half
    mo.hackToRefreshSwipe = function (that) {
      setTimeout(lang.hitch(that, function () {
        if (that.swipeDijit.swipe) {
          that.swipeDijit.swipe();
        }
      }), 200);
    };

    return mo;
  });