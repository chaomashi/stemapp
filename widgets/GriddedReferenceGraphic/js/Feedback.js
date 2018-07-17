
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
//
///////////////////////////////////////////////////////////////////////////

define([
  "dojo/_base/declare",
  "dojo/Stateful",
  "esri/toolbars/draw",
  "esri/graphic"
], function (
  dojoDeclare,
  dojoStateful,
  esriDraw,
  EsriGraphic
  ) {
    var w = dojoDeclare([esriDraw,dojoStateful], {
    startPoint: null,
    _setStartPoint: function (p) {
      this._set("startPoint", p);
    },

    addStartGraphic: function (fromGeometry, withSym, targetLayer) {
      this.removeStartGraphic(targetLayer);
      this.startGraphic = new EsriGraphic(fromGeometry, withSym);
      targetLayer.add(this.startGraphic);
    },

    removeStartGraphic: function (targetLayer) {
      if (this.startGraphic) {
        targetLayer.remove(this.startGraphic);
      }
      this.startGraphic = null;
    }
  });

  return w;
});
