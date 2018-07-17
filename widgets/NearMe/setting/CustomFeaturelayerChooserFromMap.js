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
], function (
  declare,
  lang,
  Deferred,
  LayerChooserFromMap,
  QueryableLayerChooserFromMap
) {
  return declare([QueryableLayerChooserFromMap], {
    selectedSearchLayers: [],
    //public methods:
    //getSelectedItems return [{name, url, layerInfo}]

    postMixInProperties: function () {
      this.inherited(arguments);
      this.filter = lang.hitch(
        this,
        LayerChooserFromMap.andCombineFilters([this.filter, lang.hitch(this, this._customFilter)])
      );
    },

    _customFilter: function (layerInfo) {
      var def = new Deferred();
      if (layerInfo.isTable) {
        def.resolve(false);
      } else {
        layerInfo.getLayerObject().then(lang.hitch(this, function (layer) {
          if (layer.type !== "Feature Layer" || this.selectedSearchLayers.indexOf(layer.id) > -1) {
            def.resolve(true);
          } else {
            def.resolve(false);
          }
        }), lang.hitch(this, function () {
          def.resolve(false);
        }));
      }
      return def;
    }

  });
});