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
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    /* jshint -W117 */
    module.exports = factory();
    /* jshint +W117 */
  } else {
    // Browser globals (root is window)
    root.rasterFunctions = factory();
  }
}(this, function () {

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {

    createColormapParams: function(options) {
      if (!options) {
        options = {};
      }
      var args = {
        'Raster': options.raster || '$$',
        'Colormap': options.colormap || []
      };
      return {
        'rasterFunction': 'Colormap',
        'rasterFunctionArguments': args
      };
    },

    createRemapParams: function(options) {
      if (!options) {
        options = {};
      }
      var args = {
        'Raster': options.Raster || '$$',
        'UseTable': false,
        'InputRanges': options.InputRanges || [],
        'OutputValues': options.OutputValues || [],
        'NoDataRanges': options.NoDataRanges || [],
        'AllowUnmatched': true
      };
      return {
        'rasterFunction': 'Remap',
        'rasterFunctionArguments': args
      };
    },

    /* jshint ignore:start */
    // see http://resources.arcgis.com/en/help/arcobjects-net/componenthelp/index.html#//004000000149000000
    /* jshint ignore:end */
    // for the complete enum of operations
    createLocalParams: function(operation, options) {
      if (!options) {
        options = {};
      }
      var args = {
        'Operation': operation,
        'ExtentType': 0,
        'CellsizeType': 1,
        'Rasters': options.rasters || []
      };
      var localFuncObject = {
        'rasterFunction': 'Local',
        'rasterFunctionArguments': args
      };
      if (options.outputPixelType) {
        localFuncObject.outputPixelType = options.outputPixelType;
      }
      return localFuncObject;
    },

    // loop through raster infos, and for each:
    //   create a remap function object from input ranges / output values
    //   wrap the remap function in a local multiply by weight
    // and then create a sum function of the above
    // wrap the sum in a round down with a converstion to U8
    // finally return a colormap of the rounded down sum
    createWeightedSumParams: function(rasterInfos, colormap) {
      var rasters = rasterInfos.map(function(rasterInfo) {
        var remapParams = this.createRemapParams(rasterInfo);
        return this.createLocalParams(3, {
          rasters: [
            remapParams,
            rasterInfo.weight
          ]
        });
      }, this);
      var sumParams = this.createLocalParams(55, {
        rasters: rasters
      });
      var roundUpParams = this.createLocalParams(49, {
        rasters: [sumParams],
        outputPixelType: 'U8'
      });
      return this.createColormapParams({
        raster: roundUpParams,
        colormap: colormap
      });
    }

  };
}));
