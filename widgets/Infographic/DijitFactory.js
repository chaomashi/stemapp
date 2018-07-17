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
  'dojo/aspect',
  'dojo/_base/lang',
  './dijits/TextDijit',
  './dijits/ImageDijit',
  './dijits/ChartDijit',
  './dijits/GaugeDijit',
  './dijits/NumberDijit'
], function(aspect, lang, TextDijit, ImageDijit, ChartDijit, GaugeDijit, NumberDijit) {
  var mo = {};
  var dijits = {};
  var nls = null;
  var map = null;
  var inSettingPage = null;
  var appConfig = null;
  var context = {};

  mo._dijits = dijits;

  mo.createDijit = function(dijitJson) {
    if (dijits[dijitJson.id]) {
      return dijits[dijitJson.id];
    }

    var clazz;
    switch (dijitJson.type) {
      case 'text':
        clazz = TextDijit;
        break;
      case 'image':
        clazz = ImageDijit;
        break;
      case 'chart':
        clazz = ChartDijit;
        break;
      case 'gauge':
        clazz = GaugeDijit;
        break;
      case 'number':
        clazz = NumberDijit;
        break;
      default:
    }

    if (!clazz) {
      console.error('Unknow type:', dijitJson.type);
      return null;
    }

    var params = {
      nls: nls,
      config: dijitJson.config,
      map: map,
      inSettingPage: inSettingPage,
      appConfig: appConfig,
      jsonId: dijitJson.id
    };
    lang.mixin(params, context);
    var dijit = new clazz(params);
    aspect.after(dijit, 'destroy', function() {
      delete dijits[dijitJson.id];
    });

    dijits[dijitJson.id] = dijit;
    return dijit;
  };
  mo.setNls = function(_nls) {
    nls = _nls;
  };
  mo.setMap = function(_map) {
    map = _map;

    Object.keys(dijits).forEach(function(dijitId) {
      dijits[dijitId].setMap(map);
    });
  };

  mo.setInSettingPage = function(_inSettingPgae) {
    inSettingPage = _inSettingPgae;
    Object.keys(dijits).forEach(function(dijitId) {
      dijits[dijitId].setInSettingPage(inSettingPage);
    });
  };

  mo.setAppConfig = function(_appConfig) {
    appConfig = _appConfig;
    Object.keys(dijits).forEach(function(dijitId) {
      dijits[dijitId].setAppConfig(appConfig);
    });
  };

  mo.setContext = function(_context) {
    context = _context;
    Object.keys(dijits).forEach(function(dijitId) {
      lang.mixin(dijits[dijitId], context);
    });
  };

  return mo;
});