/*
 | Copyright © 2014 - 2018 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
//====================================================================================================================//
define([
  'dojo/_base/array',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/Deferred',
  'esri/graphic',
  'esri/symbols/SimpleFillSymbol',
  'esri/symbols/SimpleLineSymbol',
  'esri/symbols/SimpleMarkerSymbol'
  ], function (
    array,
    declare,
    lang,
    Deferred,
    Graphic,
    SimpleFillSymbol,
    SimpleLineSymbol,
    SimpleMarkerSymbol
  ) {
    return declare([], {

      /**
       * Constructor for class.
       * @param {object} graphicsLayer Layer to which to add created graphics
       * @memberOf Highlighter#
       * @constructor
       */
      constructor: function (chunkSize) {
        this._drawingChunkSize = typeof chunkSize === 'number' ? chunkSize : 100;
      },

      /**
       * Creates a graphic that can be used for highlighting.
       * @param {object} item Graphic or geometry to be used to create highlight graphic
       * @param {json} symbology Structure containing specifications for graphic to be created depending on type
       *        of graphic or geometry; see example below
       * @return {object} Created graphic; only contains geometry of item
       * @example
       *   symbology = {
       *     point: {
       *       lineColor: new Color('aqua'),
       *       lineWidth: 2,
       *       fillColor: new Color([0, 255, 255, 0.1])
       *     },
       *     line: {
       *       lineColor: new Color('aqua'),
       *       lineWidth: 2
       *     },
       *     polygon: {
       *       lineColor: new Color('aqua'),
       *       lineWidth: 2,
       *       fillColor: new Color([0, 255, 255, 0.1])
       *     }
       *   }
       * @memberOf Highlighter#
       */
      createGraphic: function (item, symbology) {
        var type, geometry, graphic = null, outlineSquareSize = 10;

        // Normalize graphic versus geometry
        if (!item) {
          return null;
        } else if (item.geometry) {
          geometry = item.geometry;
          type = geometry.type;
        } else {
          geometry = item;
          if (geometry.hasOwnProperty('x') && geometry.hasOwnProperty('y')) {
            type = 'point';
          } else if (geometry.hasOwnProperty('paths')) {
            type = 'polyline';
          } else if (geometry.hasOwnProperty('rings')) {
            type = 'polygon';
          } else if (geometry.hasOwnProperty('points')) {
            type = 'multipoint';
          } else {
            return null;
          }
        }

        /**
        * Gets a square bounding box that is one larger than the larger dimension of an item's symbol
        * @param {object} item Item whose layer symbol is to be retrieved and bounded
        * @param {number} defaultSize Pixel dimension of square bounding box if item does not have a layer
        * @return {number} Pixel dimension of square bounding box
        */
        function getPointSymbolSquareSize(item, defaultSize) {
          var itemLayer, graphic, outlineSquareSize = defaultSize;
          if (item.getLayer) {
            itemLayer = item.getLayer();
            if (itemLayer) {
              graphic = item.getLayer()._getSymbol(item);
              if (graphic && !isNaN(graphic.width) && !isNaN(graphic.height)) {
                outlineSquareSize = 1 + Math.max(graphic.width, graphic.height);
              }
            }
          }
          return outlineSquareSize;
        }

        switch (type) {
          case 'point':
            // JSAPI does not want NaN coordinates
            if (isNaN(geometry.x) || isNaN(geometry.y)) {
              return null;
            }

            // Update the outline size based on a graphic's symbol
            outlineSquareSize = getPointSymbolSquareSize(item, outlineSquareSize);

            // Create the graphic
            graphic = new Graphic(geometry,
              new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, outlineSquareSize,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                  symbology.point.lineColor, symbology.point.lineWidth),
                symbology.point.fillColor
              )
            );
            break;

          case 'polyline':
            graphic = new Graphic(geometry,
              new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                symbology.line.lineColor, symbology.line.lineWidth
              )
            );
            break;

          case 'polygon':
            graphic = new Graphic(geometry,
              new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                  symbology.polygon.lineColor, symbology.polygon.lineWidth),
                symbology.polygon.fillColor
              )
            );
            break;

          case 'multipoint':
            // Update the outline size based on a graphic's symbol
            outlineSquareSize = getPointSymbolSquareSize(item, outlineSquareSize);

            // Create the graphic
            graphic = new Graphic(geometry,
              new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, outlineSquareSize,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                  symbology.point.lineColor, symbology.point.lineWidth),
                symbology.point.fillColor
              )
            );
            break;
        }

        return graphic;
      },

      /**
       * Highlights features in chunks to reduce impact on UI.
       * @param {array} features Features to highlight
       * @param {function} createAndAddGraphic Function to call to create a graphic and to add it to a layer
       * @param {json} symbology Structure containing specifications for graphic to be created depending on type
       *        of graphic or geometry; see example below
       * @param {object} layer Layer to receive graphics
       * @param {function} setProgressPercentage Function to call with progress percentage
       * @return {Deferred} Highlighting is done upon resolution
       * @example
       *   symbology = {
       *     point: {
       *       lineColor: new Color('aqua'),
       *       lineWidth: 2,
       *       fillColor: new Color([0, 255, 255, 0.1])
       *     },
       *     line: {
       *       lineColor: new Color('aqua'),
       *       lineWidth: 2
       *     },
       *     polygon: {
       *       lineColor: new Color('aqua'),
       *       lineWidth: 2,
       *       fillColor: new Color([0, 255, 255, 0.1])
       *     }
       *   }
       * @memberOf Highlighter#
       */
      highlightFeatures: function (features, createAndAddGraphic, symbology, layer, setProgressPercentage) {
        var iChunk = 0, iFeatureStart = 0, numChunks, deferred = new Deferred();

        if (features.length > 0) {
          if (features.length <= this._drawingChunkSize) {
            this._highlightFeatures(features, createAndAddGraphic, symbology, layer).then(function () {
              deferred.resolve(true);
            });

          } else {
            // Start a determinate progress bar
            setProgressPercentage(0);

            numChunks = Math.ceil(features.length / this._drawingChunkSize);
            setTimeout(lang.hitch(this, function () {
              this._highlightFeaturesContinuation(features,
                createAndAddGraphic, symbology, layer, setProgressPercentage,
                this._drawingChunkSize, numChunks,
                iChunk, iFeatureStart).then(function () {
                deferred.resolve(true);
              });
            }), 50);
          }
        } else {
          deferred.resolve(true);
        }

        return deferred;
      },

      /**
       * Highlights features in chunks to reduce impact on UI.
       * @param {array} features Features to highlight
       * @param {function} createAndAddGraphic Function to call to create a graphic and to add it to a layer
       * @param {json} symbology Structure containing specifications for graphic to be created depending on type
       *        of graphic or geometry; see example below
       * @param {object} layer Layer to receive graphics
       * @param {function} setProgressPercentage Function to call with progress percentage
       * @param {number} chunkSize Number of features to highlight per chunk
       * @param {number} numChunks Total number of chunks of features to highlight
       * @param {number} iChunk 0-based chunk number
       * @param {number} iFeatureStart 0-based index into list of features for this chunk to use
       * @return {Deferred} Highlighting is done upon resolution
       * @example
       *   symbology = {
       *     point: {
       *       lineColor: new Color('aqua'),
       *       lineWidth: 2,
       *       fillColor: new Color([0, 255, 255, 0.1])
       *     },
       *     line: {
       *       lineColor: new Color('aqua'),
       *       lineWidth: 2
       *     },
       *     polygon: {
       *       lineColor: new Color('aqua'),
       *       lineWidth: 2,
       *       fillColor: new Color([0, 255, 255, 0.1])
       *     }
       *   }
       * @memberOf Highlighter#
       */
      _highlightFeaturesContinuation: function (features, createAndAddGraphic, symbology, layer, setProgressPercentage,
        chunkSize, numChunks, iChunk, iFeatureStart) {
        var iFeatureEnd, deferred = new Deferred();

        if (iFeatureStart >= features.length) {
          deferred.resolve(true);
          return deferred;
        }

        iFeatureEnd = Math.min(iFeatureStart + chunkSize, features.length);
        this._highlightFeatures(features.slice(iFeatureStart, iFeatureEnd),
          createAndAddGraphic, symbology, layer).then(lang.hitch(this, function () {
          ++iChunk;
          setProgressPercentage(100 * iChunk / numChunks);

          setTimeout(lang.hitch(this, function () {
            this._highlightFeaturesContinuation(features,
              createAndAddGraphic, symbology, layer, setProgressPercentage,
              this._drawingChunkSize, numChunks,
              iChunk, iFeatureEnd).then(function () {
              deferred.resolve(true);
            });
          }), 10);
        }));

        return deferred;
      },

      /**
       * Highlights a set of feature geometries.
       * @param {array} features Features to highlight
       * @param {function} createAndAddGraphic Function to call to create a graphic and to add it to a layer
       * @param {json} symbology Structure containing specifications for graphic to be created depending on type
       *        of graphic or geometry; see example below
       * @param {object} layer Layer to receive graphics
       * @param {function} setProgressPercentage Function to call with progress percentage
       * @return {Deferred} Highlighting of set of features is done upon resolution
       * @example
       *   symbology = {
       *     point: {
       *       lineColor: new Color('aqua'),
       *       lineWidth: 2,
       *       fillColor: new Color([0, 255, 255, 0.1])
       *     },
       *     line: {
       *       lineColor: new Color('aqua'),
       *       lineWidth: 2
       *     },
       *     polygon: {
       *       lineColor: new Color('aqua'),
       *       lineWidth: 2,
       *       fillColor: new Color([0, 255, 255, 0.1])
       *     }
       *   }
       * @memberOf Highlighter#
       */
      _highlightFeatures: function (features, createAndAddGraphic, symbology, layer) {
        var deferred = new Deferred();

        array.forEach(features, function (feature) {
          createAndAddGraphic(feature, symbology, layer);
        }, this);
        deferred.resolve(true);

        return deferred;
      }

    });
  }
);
