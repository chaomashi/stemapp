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
  'jimu/utils',
  'dojo/_base/array',
  './resultrenderers/simpleResultRenderers'
],
function(utils, array, simpleResultRenderers) {
  var mo = {}, map, nls;

  mo.createResultRenderer = function(param, value, options) {
    //summary:
    //  create result renderer depends on the parameter type.
    //  renderer can't be in setting page
    var resultRenderer;
    var rendererName = getRendererNameFromParam(param);
    var o = {
      param: param,
      widgetUID: options.uid,
      map: map,
      nls: nls,
      config: options.config
    };
    if(rendererName === 'DrawResultFeatureSet'){
      o.value = value.value;
      resultRenderer = new simpleResultRenderers.DrawResultFeatureSet(o);
    }else if(rendererName === 'RecordSetTable'){
      o.value = value.value;
      resultRenderer = new simpleResultRenderers.RecordSetTable(o);
    }else if(rendererName === 'SimpleResultRenderer'){
      var text = "";
      var values = value.value;
      if (!Array.isArray(values)){
        values = [values];
      }
      array.forEach(values, function (val) {
        if (text !== "") {
          text += '<br>';
        }
        if (['GPLong', 'GPDouble', 'GPString', 'GPBoolean']
          .some(function (s) { return param.dataType.indexOf(s) >= 0; })) {
          text += utils.sanitizeHTML(val);
        } else if (param.dataType.indexOf('GPLinearUnit') >= 0) {
          text += val.distance + '&nbsp;' + val.units;
        } else if (param.dataType.indexOf('GPDate') >= 0) {
          text += new Date(val).toLocaleTimeString();
        } else if (param.dataType.indexOf('GPRecordSet') >= 0) {
          text += 'table';
        } else if (param.dataType.indexOf('GPDataFile') >= 0 ||
          param.dataType.indexOf('GPRasterDataLayer') >= 0) {
          if (val.url) {
            text += '<a target="_blank" href="' + val.url + '">' + val.url + '</a>';
          } else {
            text += param.paramName + ': null';
          }
        }
      });
      o.message = text;
      resultRenderer = new simpleResultRenderers.SimpleResultRenderer(o);
    }else if(rendererName === 'AddResultImageLayer'){
      o.layer = value;
      resultRenderer = new simpleResultRenderers.AddResultImageLayer(o);
    }else if(rendererName === 'UnsupportRenderer'){
      o.message = 'type ' + param.dataType + ' is not supported for now.';
      resultRenderer = new simpleResultRenderers.UnsupportRenderer(o);
    }else if(rendererName === 'Error'){
      o.message = nls.error;
      resultRenderer = new simpleResultRenderers.ErrorResultRenderer(o);
    }else{
      o.message = 'unknown renderer name: ' + rendererName;
      resultRenderer = new simpleResultRenderers.UnsupportRenderer(o);
    }

    return resultRenderer;
  };

  mo.setMap = function(_map){
    map = _map;
  };

  mo.setNls = function(_nls){
    nls = _nls;
  };

  function getRendererNameFromParam(param){
    if(param.dataType === 'result map service'){
      return 'AddResultImageLayer';
    }
    //for now, we don't support config renderer in setting page
    if(param.dataType === 'GPFeatureRecordSetLayer'){
      return 'DrawResultFeatureSet';
    }else if(param.dataType === 'GPRecordSet'){
      return 'RecordSetTable';
    }else if(param === 'error'){
      return 'Error';
    }else{
      return 'SimpleResultRenderer';
    }
  }

  return mo;
});
