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
  "dojo/_base/declare",
  'dojo/_base/lang',
  "dojo/_base/array",
  'dojo/string',
  'dojo/number',
  "esri/request",
  "esri/layers/RasterFunction",
  "./rasterFunctions"],
function(declare, lang, array, string, number, esriRequest, RasterFunction,
  rasterFunctionUtils) {

  // are 2 arrays exactly the same?
  var compareArrays = function (a1, a2) {
    var len;
    // if the other array is a falsy value, return
    if (!a1 || !a2) {
      return false;
    }
    // compare lengths - can save a lot of time
    len = a1.length;
    if (len !== a2.length) {
      return false;
    }
    for (var i = 0; i < len; i++) {
      // Check if we have nested arrays
      if (a1[i] instanceof Array && a2[i] instanceof Array) {
        // recurse into the nested arrays
        if (!a1[i].compare(a2[i])) {
          return false;
        }
      }
      else if (a1[i] !== a2[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
      }
    }
    return true;
  };

  // parse a raster layer object out of feature attributes
  var featureToRasterLayer = function(feature) {

    // TODO: **** This is temporary, don't show forest fragmentation (Urban)
    try {
      if (feature.attributes &&
         (feature.attributes.Name === "ForestFragmentation_US_USFS_2002") &&
         (feature.attributes.Title === "Forest Fragmentation") &&
         (feature.attributes.OBJECTID === 49)) {
        //console.warn("******** Ignoring ForestFragmentation_US_USFS_2002");
        return null;
      }
    } catch(ex0) {}

    var attr = feature.attributes,
      inputRanges,
      outputValues,
      noDataRanges,
      labels,
      noDataLabels,
      rasterLayer;
    if (attr) {
      rasterLayer = {
        id: attr.OBJECTID,
        name: attr.Name,
        title: attr.Title,
        url: attr.Url,
        metadata: attr.Metadata
      };
      if (attr.InputRanges && attr.InputRanges.split &&
         (typeof attr.OutputValues !== 'undefined') && attr.OutputValues.split) {
        // set remap ranges
        inputRanges = array.map(attr.InputRanges.split(','), function(val) {
          return parseFloat(val.trim()); // Changed from parseInt(val.trim(), 10);
        });
        outputValues = array.map(attr.OutputValues.split(','), function(val) {
          return parseInt(val.trim(), 10);
        });
        if (attr.RangeLabels && attr.RangeLabels.split) {
          labels = array.map(attr.RangeLabels.split(','), function(val) {
            return val.trim();
          });
        }
      }
      if (attr.NoDataRanges && attr.NoDataRanges.split) {
        noDataRanges = array.map(attr.NoDataRanges.split(','), function(val) {
          return parseFloat(val.trim()); // Changed from parseInt(val.trim(), 10);
        });
        if (attr.NoDataRangeLabels && attr.NoDataRangeLabels.split) {
          noDataLabels = array.map(attr.NoDataRangeLabels.split(','), function(val) {
            return val.trim();
          });
        }
      }
      rasterLayer.remapRanges = remapRangeUtils.createRemapRanges(
        inputRanges, outputValues, noDataRanges, {
          labels: labels,
          noDataLabels: noDataLabels
        }
      );
    }
    return rasterLayer;
  };

  // get a colormap (nested array)
  // from a colormap definition object
  var colormapDefinitionToColormap = function(colormapDefinition) {
    return array.map(colormapDefinition.colors, function(color) {
      return [color.value].concat(color.rgb);
    });
  };

  // validate a model and
  // return an array of errors (if any)
  var getModelValidationErrors = function(model,i18n) {
    var errs = [];
    var totalWeight = 0;
    if (model && model.overlayLayers && model.overlayLayers.push) {
      if (model.overlayLayers.length > 0) {
        array.forEach(model.overlayLayers, function(overlayLayer, index) {
          totalWeight += overlayLayer.weight;
          if (overlayLayer.remapRanges && overlayLayer.remapRanges.push &&
              overlayLayer.remapRanges.length > 0) {
            array.forEach(overlayLayer.remapRanges, function(remapRange, index2) {
              if (isNaN(remapRange.outputValue) || remapRange.outputValue === null) {
                errs.push(string.substitute(i18n.wro.validation.overlayLayerOutputInvalid,
                  [index, index2]));
              }
              if (isNaN(remapRange.inputMin) || remapRange.inputMin === null ||
                  isNaN(remapRange.inputMax) || remapRange.inputMax === null ||
                  remapRange.inputMin > remapRange.inputMax) {
                errs.push(string.substitute(i18n.wro.validation.overlayLayerInputInvalid,
                  [index,index2]));
              }
            });
          } else {
            errs.push(string.substitute(i18n.wro.validation.overlayLayerRangesMissing,
              [index]));
          }
        });
        if (totalWeight !== 100) {
          errs.push(i18n.wro.validation.overlayLayerWeight);
        }
      } else {
        errs.push(i18n.wro.validation.overlayLayerRequired);
      }
    } else {
      errs.push(i18n.wro.validation.overlayLayerNotDefined);
    }
    return errs;
  };

  // call image service compute histograms method
  var computeHistograms = function(serviceUrl, geometry, options) {
    // TODO: check geom for type
    // >>> geometry.type
    // "polygon"
    // >>> geometry.getExtent().type
    // "extent"
    var url = serviceUrl + "/computeHistograms";
    var content = {
      // TODO: base on the type of the geometry arg
      geometryType: "esriGeometryPolygon",
      f: "json"
    };
    content.geometry = window.JSON.stringify(geometry);
    if (options) {
      // serialize options
      if (options.renderingRule) {
        content.renderingRule = window.JSON.stringify(options.renderingRule);
      }
      if (options.pixelSize) {
        content.pixelSize = window.JSON.stringify(options.pixelSize);
      }
    }
    return esriRequest({
      url: url,
      content: content,
      handleAs: "json",
      callbackParamName: "callback"
    });
  };

  // NOTE: move this to it's own file/module
  // once it's possible to do a dojo build
  // and/or it is needed by other classes
  var remapRangeUtils = {

    // parse array of remap range objects out of raster function arguments
    rasterFunctionArgumentsToRemapRanges: function(rasterFunctionArguments, options) {
      var remapRanges,
        opts,
        inputRanges,
        outputValues,
        noDataRanges,
        labels,
        noDataLabels;
      if (rasterFunctionArguments) {
        opts = lang.mixin({
          inputRangesArgumentName: 'InputRanges',
          outputValuesArgumentName: 'OutputValues',
          noDataRangesArgumentName: 'NoDataRanges',
          labelsArgumentName: 'Labels',
          noDataLabelsArgumentName: 'NoDataLabels'
        }, options);
        inputRanges = rasterFunctionArguments[opts.inputRangesArgumentName];
        outputValues = rasterFunctionArguments[opts.outputValuesArgumentName];
        noDataRanges = rasterFunctionArguments[opts.noDataRangesArgumentName];
        labels = rasterFunctionArguments[opts.labelsArgumentName];
        noDataLabels = rasterFunctionArguments[opts.noDataLabelsArgumentName];

        remapRanges = this.createRemapRanges(inputRanges, outputValues, noDataRanges, {
          labels: labels,
          noDataLabels: noDataLabels,
          sortBy: 'inputMin'
        });
      }
      return remapRanges;
    },

    // combine arrays of remap range arguments
    // into a single array of remap range objects
    createRemapRanges: function(inputRanges, outputValues, noDataRanges, options) {
      var remapRanges = [],
        hasValidLabels = false,
        labels, noDataLabels, sortBy;
      if (options) {
        labels = options.labels;
        noDataLabels = options.noDataLabels;
        sortBy = options.sortBy;
      }
      // check for and add input ranges and output values
      if (inputRanges && inputRanges.push && outputValues && outputValues.push &&
          inputRanges.length === outputValues.length * 2) {
        hasValidLabels = (labels && labels.push && labels.length === outputValues.length);
        // console.log(hasValidLabels);
        // console.log(outputValues);
        array.forEach(outputValues, function(outputValue, index) {

          var inputRangeMinIndex = index * 2;
          var range = {
            inputMin: inputRanges[inputRangeMinIndex],
            inputMax: inputRanges[inputRangeMinIndex + 1],
            outputValue: outputValue,
            originalOutputValue: outputValue
          };
          if (hasValidLabels) {
            range.label = labels[index];
          } else {
            range.label = this.getRangeString(range.inputMin, range.inputMax);
          }
          remapRanges.push(range);
        }, this);
      }
      // check for and add no data ranges
      if (noDataRanges && noDataRanges.push && noDataRanges.length > 0) {
        hasValidLabels = (noDataLabels && noDataLabels.push &&
          noDataLabels.length === noDataRanges.length / 2);
        array.forEach(noDataRanges, function(noDataRangeBound, index) {
          // even numbered elements represent range min
          if (index % 2 === 0) {
            var range = {
              inputMin: noDataRangeBound,
              inputMax: noDataRanges[index + 1],
              // NOTE: using 0 for no data range values
              outputValue: 0,
              originalOutputValue: 0
            };
            if (hasValidLabels) {
              range.label = noDataLabels[index];
            } else {
              range.label = this.getRangeString(range.inputMin, range.inputMax);
            }
            remapRanges.push(range);
          }
        }, this);
      }
      if (remapRanges.length > 0) {
        if (sortBy) {
          // sort by property
          remapRanges.sort(function(a, b) {
            if (a[sortBy] < b[sortBy]) {
              return -1;
            }
            if (a[sortBy] > b[sortBy]) {
              return 1;
            }
            return 0;
          });
        }
        return remapRanges;
      } else {
        return undefined;
      }
    },

    // string that reperents the range min/max
    getRangeString: function(min, max) {
      if (min === max) {
        return min + '';
      } else {
        return min + ' - ' + max;
      }
    },

    // build raster function arguments from remap ranges
    remapRangesToRasterFunctionArguments: function(remapRanges, options) {
      var rasterFunctionArguments,
        opts,
        inputRanges,
        outputValues,
        noDataRanges,
        labels,
        noDataLabels;
      if (remapRanges) {
        rasterFunctionArguments = {};
        opts = lang.mixin({
          includeLabels: true,
          inputRangesArgumentName: 'InputRanges',
          outputValuesArgumentName: 'OutputValues',
          noDataRangesArgumentName: 'NoDataRanges',
          labelsArgumentName: 'Labels',
          noDataLabelsArgumentName: 'NoDataLabels'
        }, options);
        inputRanges = [];
        outputValues = [];
        noDataRanges = [];
        labels = [];
        noDataLabels = [];
        array.forEach(remapRanges, function(remapRange) {
          var label = remapRange.label ||
            this.getRangeString(remapRange.inputMin, remapRange.inputMax);
          if (remapRange.outputValue) {
            // here outputValue === 0  will be treated as noDataRanges, thus listed at the bottom?
            inputRanges.push(remapRange.inputMin);
            inputRanges.push(remapRange.inputMax);
            outputValues.push(remapRange.outputValue);
            labels.push(label);
          } else {
            noDataRanges.push(remapRange.inputMin);
            noDataRanges.push(remapRange.inputMax);
            noDataLabels.push(label);
          }
        }, this);
        if (outputValues.length > 0) {
          rasterFunctionArguments[opts.inputRangesArgumentName] = inputRanges;
          rasterFunctionArguments[opts.outputValuesArgumentName] = outputValues;
          if (opts.includeLabels) {
            rasterFunctionArguments[opts.labelsArgumentName] = labels;
          }
        }
        if (noDataRanges.length > 0) {
          rasterFunctionArguments[opts.noDataRangesArgumentName] = noDataRanges;
          if (opts.includeLabels) {
            rasterFunctionArguments[opts.noDataLabelsArgumentName] = noDataLabels;
          }
        }
      }
      return rasterFunctionArguments;
    },

    // find the remap range that contains a value
    getRemapRangeByValue: function(remapRanges, inputValue) {
      var range;
      if (inputValue || inputValue === 0) {
        array.some(remapRanges, function(remapRange) {
          // NOTE: range min is inclusive but range max is EXclusive, see:
          // http://resources.arcgis.com/en/help/main/10.2/index.html#//009t000001zv000000
          // however, it's also valid to specify a single value range (i.e 3,3)
          if ((inputValue === remapRange.inputMin && inputValue === remapRange.inputMax) ||
              (inputValue >= remapRange.inputMin && inputValue < remapRange.inputMax)) {
            range = remapRange;
            return true;
          } else {
            return false;
          }
        });
      }
      return range;
    },

    // find remap range
    findRemapRange: function(ranges, query) {
      var isMatch, matchedRange;
      if (!ranges || !query) {
        return;
      }
      array.some(ranges, function(range) {
        if ((query.inputMin || query.inputMin === 0) && (query.inputMax || query.inputMax === 0))  {
          isMatch = range.inputMin === query.inputMin && range.inputMax === query.inputMax;
          if (isMatch) {
            matchedRange = range;
          }
          return isMatch;
        }
      });
      return matchedRange;
    }

  };

  // begin class
  var WroService = declare([], {

    context: null,
    i18n: null,

    // set reference to image service layer
    // set default object/array and property values
    constructor: function(imageServiceLayer, options) {
      var opts = options || {};
      this.imageServiceLayer = imageServiceLayer;
      this.rasterFunctionName = opts.rasterFunctionName || "";
      this.histogramRasterFunctionName = opts.histogramRasterFunctionName || "";
      this.rastersInFunction = opts.rastersInFunction || 0;
      this.variableName = opts.variableName || "Raster";
      this.colorMapArgName = opts.colorMapArgName || "Colormap";
      this.dummyRasterId = opts.dummyRasterId || 1;
      this.colormapDefinitions = opts.colormapDefinitions || [];
      this.argumentNamePrefixes = lang.mixin({
        id: "Raster",
        weight: "Weight_Raster",
        inputRanges: "InputRanges_Raster",
        outputValues: "OutputValues_Raster",
        noDataRanges: "NoDataRanges_Raster",
        labels: "Labels_Raster",
        noDataLabels: 'NoDataLabels'
      }, opts.argumentNamePrefixes);
      this.queryParameters = lang.mixin({
        where: "1=1",
        outFields: ["*"],
        returnGeometry: false
      }, opts.queryParameters);
      this.rasterLayers = opts.rasterLayers || [];
    },

    // query rasters from image service
    // sort them (default to title ascending)
    // for each result, create a raster layer object
    initRasterLayers: function(options) {
      var self = this;
      return this.queryRasters().then(function(queryResults) {
        return self._initRasterLayers(queryResults.features, options);
      });
    },

    // query rasters in mosaic using specified parameters
    queryRasters: function(queryParameters) {
      //console.warn("queryParameters",queryParameters,this.queryParameters);
      var url = this.imageServiceLayer.url + "/query";
      // TODO issue here (token was being appended to other services)
      //var content = lang.mixin(this.queryParameters, queryParameters, {f:"json"});
      var content = lang.mixin(lang.mixin({f:"json"},queryParameters),this.queryParameters);
      if (content.outFields && content.outFields.join) {
        content.outFields = content.outFields.join(",");
      }
      return esriRequest({
        url: url,
        content: content,
        handleAs: "json",
        callbackParamName: "callback"
      });
    },

    // check array of features, if valid then
    // clear current array of raster layers
    // sort features and create a raster for each feature
    _initRasterLayers: function (features, options) {
      var context = this.context;

      // TODO: **** This is temporary, don't show forest fragmentation (Urban)
      try {
        this.dummyRasterId = 1;
        if (this.imageServiceLayer && this.imageServiceLayer.url &&
           (this.imageServiceLayer.url.indexOf("//landscape3.arcgis.com") !== -1)) {
          this.dummyRasterId = 53;
          //console.warn("******** Set dummyRasterId to 53");
        }
      } catch(ex0) {}

      var self = this;
      var rasterLayer;
      var opts = options || {};
      var compareFunc = opts.featureCompareFunc || function(a,b) {
        if (a.attributes.Title < b.attributes.Title) {
          return -1;
        } else if (a.attributes.Title > b.attributes.Title) {
          return 1;
        } else {
          return 0;
        }
      };

      if (features && features.length && features.length > 0 && features[0].attributes) {
        // clear current raster layers if any
        if (self.rasterLayers && self.rasterLayers.push) {
          self.rasterLayers.length = 0;
        } else {
          self.rasterLayers = [];
        }
        if (compareFunc) {
          // sort the features
          features.sort(compareFunc);
        }
        // get raster layer from each feature
        array.forEach(features, function(feature) {
          rasterLayer = featureToRasterLayer(feature);
          if (rasterLayer) {
            rasterLayer.url = context.checkMixedContent(rasterLayer.url);
            self.rasterLayers.push(rasterLayer);
          }
        });

      }
      return self.rasterLayers;
    },

    // create a new model with the default colormap
    createNewModel: function() {
      var model = {
        overlayLayers: []
      };
      if (this.colormapDefinitions && this.colormapDefinitions instanceof Array &&
          this.colormapDefinitions.length > 0) {
        model.colormapDefinition = this.colormapDefinitions[0];
      }
      return model;
    },

    // get a raster layer by id
    getRasterLayer: function(id) {
      var rasterLayer;
      array.some(this.rasterLayers, function(layer) {
        if (layer.id === id) {
          rasterLayer = layer;
          return false;
        }
      });
      return rasterLayer;
    },

    setOverlayLayerDefaults: function(overlayLayer, layerDefaults) {
      if (!layerDefaults) {
        return;
      }
      if (layerDefaults.remapRanges && overlayLayer.remapRanges) {
        array.forEach(layerDefaults.remapRanges, function(defaultRange) {
          var overlayLayerRange;
          if (defaultRange.label) {
            overlayLayerRange = remapRangeUtils.findRemapRange(overlayLayer.remapRanges, {
              inputMin: defaultRange.inputMin,
              inputMax: defaultRange.inputMax
            });
            if (overlayLayerRange) {
              overlayLayerRange.label = defaultRange.label;
            }
          }
        }, this);
      }

      // TODO: only set title if it's not defined?
      // if (!overlayLayer.title) {
      overlayLayer.title = layerDefaults.title;
      // }
    },

    // extract a model out of an array of
    // opertaional layers (i.e. from a web map)
    operationalLayersToModel: function(operationalLayers) {
      var modelLayer, s = this.rasterFunctionName;
      if (s) {
        // get the layer w/ the raster function
        array.some(operationalLayers, function(l) {
          // TODO: check for client-side weighted overlay signature
          if(l.renderingRule && l.renderingRule && l.renderingRule.rasterFunction === s) {
            modelLayer = l;
            return true;
          } else {
            return false;
          }
        }, this);
      }
      return this.imageServiceLayerToModel(modelLayer);
    },

    // create a model from image server layer JSON
    imageServiceLayerToModel: function(modelLayer) {
      // init model
      var self = this, v;
      var model;
      var overlayLayer;
      var idArgNameRegExp;
      var rasterFunctionArguments;
      var rasterArgIndex;
      var renderingRule = modelLayer.renderingRule;
      if (!modelLayer || !renderingRule) {
        return;
      }
      model = {
        overlayLayers: []
      };
      // is this using a server-side raster function?
      if (this.rasterFunctionName === renderingRule.rasterFunction) {
        // parse raster function arguments from layer JSON
        idArgNameRegExp = new RegExp('^' + this.argumentNamePrefixes.id + '[1-9]+$');
        rasterFunctionArguments = renderingRule.rasterFunctionArguments;
        // mixin the labels if any
        if (modelLayer.remapRangeLabels) {
          lang.mixin(rasterFunctionArguments, modelLayer.remapRangeLabels);
        }
        if (modelLayer.noDataRangeLabels) {
          lang.mixin(rasterFunctionArguments, modelLayer.noDataRangeLabels);
        }
        for(var arg in rasterFunctionArguments) {
          // check if this is an id argument
          if (arg.match(idArgNameRegExp)) {
            rasterArgIndex = arg.replace(this.argumentNamePrefixes.id, '');
            overlayLayer = {
              id: parseInt(rasterFunctionArguments[arg].replace('$', ''), 10)
            };
            // get weight
            v = this.argumentNamePrefixes.weight + rasterArgIndex;
            overlayLayer.weight = rasterFunctionArguments[v];
            if (overlayLayer.weight && overlayLayer.weight > 0) {
              // convert from decimal weight to percent
              overlayLayer.weight = overlayLayer.weight * 100;
              // look up raster in this service by id
              // and get the url, title, name, etc
              overlayLayer = lang.mixin(this.getRasterLayer(overlayLayer.id) || {}, overlayLayer);
              // get remap ranges
              overlayLayer.remapRanges = remapRangeUtils.rasterFunctionArgumentsToRemapRanges(
                rasterFunctionArguments, {
                  inputRangesArgumentName: this.argumentNamePrefixes.inputRanges + rasterArgIndex,
                  outputValuesArgumentName: this.argumentNamePrefixes.outputValues + rasterArgIndex,
                  noDataRangesArgumentName: this.argumentNamePrefixes.noDataRanges + rasterArgIndex,
                  labelsArgumentName: this.argumentNamePrefixes.labels + rasterArgIndex,
                  noDataLabelsArgumentName: this.argumentNamePrefixes.noDataLabels + rasterArgIndex
                }
              );
              model.overlayLayers.push(overlayLayer);
            }
          } else if(arg === this.colorMapArgName) {
            model.colormapDefinition = this.findColormapDefinition(rasterFunctionArguments[arg]);
          }
        }
      } else {
        // parse client-side functions
        // start w/ outtermost function (the rendering rule)
        var nextFunction = renderingRule;
        rasterFunctionArguments = nextFunction.rasterFunctionArguments;
        // check for colormap
        if (nextFunction.rasterFunction === 'Colormap') {
          model.colormapDefinition = this.findColormapDefinition(rasterFunctionArguments.Colormap);
          nextFunction = rasterFunctionArguments.Raster;
          rasterFunctionArguments = nextFunction.rasterFunctionArguments;
        }
        // check for round function
        if (nextFunction.rasterFunction === 'Local' &&
            rasterFunctionArguments.Operation === 49) {
          nextFunction = rasterFunctionArguments.Rasters[0];
          rasterFunctionArguments = nextFunction.rasterFunctionArguments;
        } else if (nextFunction.rasterFunction === 'Local' &&
            rasterFunctionArguments.Operation === 48) {
          rasterFunctionArguments.Operation = 49;
          nextFunction = rasterFunctionArguments.Rasters[0];
          rasterFunctionArguments = nextFunction.rasterFunctionArguments;
        }
        // check for sum function
        if (nextFunction.rasterFunction === 'Local' &&
            rasterFunctionArguments.Operation === 55) {
          model.overlayLayers = array.map(rasterFunctionArguments.Rasters,
            function(multiplyFunction) {
              var olyr = {};
              array.forEach(multiplyFunction.rasterFunctionArguments.Rasters, function(raster) {
                if (isNaN(raster)) {
                  // this is the remap function
                  // get id
                  olyr.id = parseInt(raster.rasterFunctionArguments.Raster.substr(1), 10);
                  // look up raster in this service by id
                  // and get the url, title, name, etc
                  olyr = lang.mixin(self.getRasterLayer(olyr.id) || {}, olyr);
                  // get remap ranges
                  olyr.remapRanges = remapRangeUtils.rasterFunctionArgumentsToRemapRanges(
                    raster.rasterFunctionArguments);
                } else {
                  olyr.weight = raster * 100.00;
                }
              });
              return olyr;
            }
          );
        }
      }
      return model;
    },

    // find a colormap definiton that matches the colormap
    findColormapDefinition: function(colormap) {
      var colormapDefinition;
      array.some(this.colormapDefinitions, function(def) {
        var match = false;
        match = array.every(def.colors, function(color, index) {
          return compareArrays([color.value].concat(color.rgb), colormap[index]);
        });
        if (match) {
          colormapDefinition = def;
          return true;
        } else {
          return false;
        }
      });
      return colormapDefinition;
    },

    // create an array of operational layers
    // (i.e. for a web map) from a model
    modelToOperationalLayers: function(model, options) {
      // create operational layer for the model
      var modelLayer = this.modelToImageServiceLayer(model, options);
      // TODO: if (options.includeOverlayLayers)
      //   add a layer for each individual overlay layer
      //   in addition to the model layer
      return [modelLayer];
    },

    // create image service layer JSON
    // (i.e. for a web map) from a model
    modelToImageServiceLayer: function(model, options) {
      var modelLayer = {
        id: this.imageServiceLayer.id,
        url: this.imageServiceLayer.url,
        opacity: this.imageServiceLayer.opacity,
        title: "Weighted Overlay Model"
      };
      // get raster function
      var rasterFunction = this.getRasterFunction(model.overlayLayers, model.colormapDefinition, {
        includeLabels: true
      });
      // generating range labels in raster function arguments,
      // then adding them to an array of labels to be injected into
      // the layer's JSON and then removing them from the arguments

      var remapRangeLabels = {},
        noDataRangeLabels = {};
      for (var arg in rasterFunction["arguments"]) {
        if (arg.indexOf(this.argumentNamePrefixes.labels) === 0) {
          remapRangeLabels[arg] = rasterFunction["arguments"][arg];
          delete rasterFunction["arguments"][arg];
        } else if (arg.indexOf(this.argumentNamePrefixes.noDataLabels) === 0) {
          noDataRangeLabels[arg] = rasterFunction["arguments"][arg];
          delete rasterFunction["arguments"][arg];
        }
      }
      modelLayer.renderingRule = rasterFunction.toJson();
      // now inject range labels into the layer's JSON
      // NOTE: this is a hack and not supported by web map spec:
      // http://resources.arcgis.com/en/help/main/10.2/index.html#//0154000004w8000000
      modelLayer.remapRangeLabels = remapRangeLabels;
      modelLayer.noDataRangeLabels = noDataRangeLabels;
      if (options && options.modelTitle) {
        modelLayer.title = options.modelTitle;
      }
      return modelLayer;
    },

    // create a raster function from a model's layers and clormap defintion
    getRasterFunction: function (overlayLayersIn, colormapDefinition, options) {
      //Do not include layers with zero weight
      var overlayLayers = [];
      array.forEach(overlayLayersIn, function (overlayLayer) {
        if (overlayLayer.weight > 0) {
          overlayLayers.push(overlayLayer);
        }
      });

      if (this.imageServiceLayer.version >= 10.3) {
        var rasterInfos = array.map(overlayLayers, function(overlayLayer) {
          var rasterInfo = remapRangeUtils.remapRangesToRasterFunctionArguments(
            overlayLayer.remapRanges);
          rasterInfo.Raster = '$' + overlayLayer.id;
          rasterInfo.weight = overlayLayer.weight / 100;
          return rasterInfo;
        });
        var cmap;
        if (colormapDefinition) {
          cmap = colormapDefinitionToColormap(colormapDefinition);
        }
        var rasterFunctionJson = rasterFunctionUtils.createWeightedSumParams(rasterInfos, cmap);
        return new RasterFunction(rasterFunctionJson);
      }
      var rasterFunction = new RasterFunction();
      var layerCount = overlayLayers.length;
      var args = {};
      var opts = lang.mixin({
        rasterFunctionName: this.rasterFunctionName,
        rastersInFunction: this.rastersInFunction,
        argumentNamePrefixes: this.argumentNamePrefixes,
        variableName: this.variableName,
        dummyRasterId: this.dummyRasterId,
        includeLabels: false
      }, options);
      var remapRangeArgs;
      var layer;
      var colorMap;
      rasterFunction.functionName = opts.rasterFunctionName;
      if (opts.variableName) {
        rasterFunction.variableName = opts.variableName;
      }
      // NOTE: when more model layers than rasters in function
      // only the first X model layers will be added
      // and weights may not add up to 100
      for (var i = 1; i <= opts.rastersInFunction; i++) {
        if (i <= layerCount) {
          layer = overlayLayers[i - 1];
        } else {
          layer = {id: opts.dummyRasterId, weight: 0};
        }
        args[opts.argumentNamePrefixes.id + i] = '$' + layer.id;
        args[opts.argumentNamePrefixes.weight + i] = number.round(layer.weight / 100, 2);
        if (layer.weight > 0 && layer.remapRanges) {
          remapRangeArgs = remapRangeUtils.remapRangesToRasterFunctionArguments(layer.remapRanges, {
            includeLabels: opts.includeLabels,
            inputRangesArgumentName: opts.argumentNamePrefixes.inputRanges + i,
            outputValuesArgumentName: opts.argumentNamePrefixes.outputValues + i,
            noDataRangesArgumentName: opts.argumentNamePrefixes.noDataRanges + i,
            labelsArgumentName: opts.argumentNamePrefixes.labels + i,
            noDataLabelsArgumentName: opts.argumentNamePrefixes.noDataLabels + i
          });
          lang.mixin(args, remapRangeArgs);
        }
      }
      if (this.colorMapArgName) {
        if (colormapDefinition) {
          colorMap = colormapDefinitionToColormap(colormapDefinition);
        }
        if (!colorMap) {
          throw this.i18n.wro.validation.requiresColormap;
        }
        args[this.colorMapArgName] = colorMap;
      }
      rasterFunction["arguments"] = args;
      return rasterFunction;
    },

    // validate a model against this service
    validateModel: function(model) {
      var errs = getModelValidationErrors(model,this.i18n);
      return {
        isValid: errs.length < 1,
        modelErrors: errs
      };
    },

    // validate a model then generate and apply
    // a raster function to the service
    // based on model parameters
    runModel: function(model) {
      var errs;
      if (this.imageServiceLayer) {
        errs = getModelValidationErrors(model,this.i18n);
        if (errs.length < 1) {
          this.imageServiceLayer.setRenderingRule(this.getRasterFunction(
            model.overlayLayers, model.colormapDefinition)
          );
        } else {
          this.context.showMessages(this.i18n.wro.validation.createModelError,"",errs);
          throw(this.wro.validation.invalidModel + ":\n\n" + errs.join("\n"));
        }
      } else {
        throw (this.i18n.wro.validation.imageServiceNotDefined);
      }
    },

    // clear the applied raster function (if any)
    clearModel: function() {
      if (this.imageServiceLayer && this.imageServiceLayer.renderingRule !== null) {
        this.imageServiceLayer.setRenderingRule(null);
      }
    },

    // generate a raster function from model parameters
    // and then apply it to a histogram of pixels
    // within a geometry
    getHistogram: function(model, geometry, options) {
      var errs;
      var opts = lang.mixin({}, options);
      if (this.histogramRasterFunctionName) {
        if (this.imageServiceLayer) {
          errs = getModelValidationErrors(model,this.i18n);
          if (errs.length < 1) {
            opts.renderingRule = this.getRasterFunction(
              model.overlayLayers, model.colormapDefinition, {
                rasterFunctionName: this.histogramRasterFunctionName
              }
            ).toJson();
            return computeHistograms(this.imageServiceLayer.url, geometry, opts).then(
              function(response) {
                return response.histograms[0];
              }
            );
          } else {
            throw(this.i18n.wro.validation.invalidModel + ":\n\n" + errs.join("\n"));
          }
        } else {
          throw (this.i18n.wro.validation.imageLayerNotDefined);
        }
      } else {
        throw this.i18n.wro.validation.histogramNotDefined;
      }
    },

    // get the pixel size for a model at a given extent
    getModelPixelSize: function(extent, options) {
      var imgLayer = this.imageServiceLayer;
      var opts = lang.mixin({
        width: imgLayer.maxImageWidth,
        height: imgLayer.maxImageHeight
      }, options);
      var minPixelSizeX = Math.max(imgLayer.pixelSizeX,Math.ceil(extent.getWidth() / opts.width));
      var minPixelSizeY = Math.max(imgLayer.pixelSizeY,Math.ceil(extent.getHeight() / opts.height));
      var pixelSize;
      if (opts.forceSquare) {
        // return a square pixel
        pixelSize = {
          x: Math.max(minPixelSizeX, minPixelSizeY)
        };
        pixelSize.y = pixelSize.x;
      } else {
        // return min x and y
        pixelSize = {
          x: minPixelSizeX,
          y: minPixelSizeY
        };
      }
      return pixelSize;
    },

    // get a colormap definition by id
    getColormapDefinition: function(id) {
      var colormapDefinition;
      array.some(this.colormapDefinitions, function(definition) {
        if (definition.id === id) {
          colormapDefinition = definition;
          return false;
        }
      });
      return colormapDefinition;
    }

  });

  return WroService;
});
