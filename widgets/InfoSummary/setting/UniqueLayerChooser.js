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
  'jimu/dijit/LayerChooserFromMap'
],
  function (declare, lang, Deferred, LayerChooserFromMap) {
    return declare([LayerChooserFromMap], {

      //public methods:
      //getSelectedItems return [{name, url, layerInfo}]

      //attributes
      //parent: the parent widget
      // expects the parent to store a list called 'used_layers' that will contain all
      // layerIds that have already been used
      //row: the row that stores the chooser
      // The row must maintain a 'layerID' value for the layer that is currently selected in its chooser
      // (Not implemented...does not work if layer is not subLayer)The row must maintain a 'rowOpened' property that indicates if the chooser has been expaned.

      parent: null,
      row: null,

      constructor: function (options) {
        lang.mixin(this, options);
      },

      postMixInProperties: function () {
        this.inherited(arguments);
        this.filter = lang.hitch(
          this,
          LayerChooserFromMap.andCombineFilters([this.filter, lang.hitch(this, this._customFilter)])
        );
      },

      _customFilter: function (layerInfo) {
        //The values have been filtered if this function runs
        // and need to be refiltered when a new layer is chosen for another row
        //This allows us to ensure that the same layer cannot be chosen for multiple rows
        var unSupportedLayerTypes = ["WMSLayer", "ArcGISImageServiceLayer",
          "ArcGISImageServiceVectorLayer", "ArcGISTiledMapServiceLayer", "ClusterLayer"];

        //This concept does not work when the layers are not subLayers
        //this.row.rowOpened = true;
        var def = new Deferred();
        if (layerInfo.isTable) {
          def.resolve(false);
        } else {
          var res = true;
          if (this.parent && this.parent.used_layers) {
            //show the layer if it's the id for this row
            // this value needs to be set on the row each time the layer changes
            //This also allows for a given parent to not be empty
            layerInfo.getLayerType().then(lang.hitch(this, function (type) {
              if (unSupportedLayerTypes.indexOf(type) > -1) {
                res = false;
              } else {
                if (this.row.layerID !== layerInfo.id) {
                  res = this.parent.used_layers.indexOf(layerInfo.id) === -1 &&
                    this.parent.unsupported_ids.indexOf(layerInfo.id) === -1;
                }
              }
              def.resolve(res);
            }));
          }
        }
        return def;
      }
    });
  });
