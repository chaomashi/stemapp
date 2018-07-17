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
  '../DijitFactory',
  './dijitsSetting/TextDijitSetting',
  './dijitsSetting/ImageDijitSetting',
  './dijitsSetting/ChartDijitSetting',
  './dijitsSetting/GaugeDijitSetting',
  './dijitsSetting/NumberDijitSetting'
], function(aspect, lang, DijitFactory, TextDijitSetting, ImageDijitSetting,
  ChartDijitSetting, GaugeDijitSetting, NumberDijitSetting) {
  var mo = {};
  var dijitsSetting = {};
  var nls = null;
  var map = null;
  var appConfig = null;
  var context = {};

  mo._dijitsSetting = dijitsSetting;

  mo.getDijitSetting = function(dijitJson) {
    return dijitsSetting[dijitJson.id];
  };

  mo.createDijitSetting = function(dijitJson, templateName) {
    if (dijitsSetting[dijitJson.id]) {
      return dijitsSetting[dijitJson.id];
    }

    var clazz;
    switch (dijitJson.type) {
      case 'text':
        clazz = TextDijitSetting;
      break;
      case 'image':
        clazz = ImageDijitSetting;
      break;
      case 'chart':
        clazz = ChartDijitSetting;
      break;
      case 'gauge':
        clazz = GaugeDijitSetting;
      break;
      case 'number':
        clazz = NumberDijitSetting;
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
      appConfig: appConfig,
      dijit: DijitFactory.createDijit(dijitJson)
    };
    params.templateName = templateName;
    lang.mixin(params, context);

    var settingDijit = new clazz(params);

    aspect.after(settingDijit, 'destroy', function() {
      delete dijitsSetting[dijitJson.id];
    }, dijitJson);

    dijitsSetting[dijitJson.id] = settingDijit;
    return settingDijit;
  };

  mo.setNls = function(_nls) {
    nls = _nls;
  };
  mo.setMap = function(_map) {
    map = _map;
  };
  mo.setContext = function(_context) {
    context = _context;
    Object.keys(dijitsSetting).forEach(function(dijitsSettingId) {
      lang.mixin(dijitsSetting[dijitsSettingId], context);
    });
  };
  mo.setAppConfig = function(_appConfig) {
    appConfig = _appConfig;
  };
  return mo;
});