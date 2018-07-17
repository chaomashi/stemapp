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
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/Deferred',
  'jimu/dijit/LayerChooserFromMap',
  'jimu/dijit/QueryableLayerChooserFromMap'
],
function(declare, lang, Deferred, LayerChooserFromMap, QueryableLayerChooserFromMap) {

  return declare([QueryableLayerChooserFromMap], {

    //public methods:
    //getSelectedItems return [{name, url, layerInfo}]

    postMixInProperties:function(){
      this.inherited(arguments);
      this.filter = lang.hitch(
        this,
        LayerChooserFromMap.andCombineFilters([this.filter, lang.hitch(this, this._customFilter)])
      );
      this.displayTooltipForTreeNode = true;
    },

    _customFilter: function(layerInfo){
      var def = new Deferred();
      if(layerInfo.isTable){
        def.resolve(false);
      }else{
        layerInfo.getLayerObject().then(lang.hitch(this, function(layer) {
          if (layer.declaredClass === 'esri.layers.ArcGISDynamicMapServiceLayer') {
            //https://developers.arcgis.com/javascript/3/jsapi/arcgisdynamicmapservicelayer-amd.html#layerdefinitions
            def.resolve(layer.version >= 10);
          }else if(layer.declaredClass === 'esri.layers.ArcGISTiledMapServiceLayer'){
            //Can't set filter for ArcGISTiledMapServiceLayer no matter it supports query or not.
            def.resolve(false);
          } else {
            def.resolve(true);
          }
        }), lang.hitch(this, function(err) {
          console.error(err);
          def.resolve(false);
        }));
      }

      return def;
    }

  });
});
