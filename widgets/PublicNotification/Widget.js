/* jshint unused:true */
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
define([
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/_base/Color',
  'dojo/_base/lang',
  'dojo/dom',
  'dojo/dom-class',
  'dojo/dom-construct',
  'dojo/dom-geometry',
  'dojo/dom-style',
  'dojo/Evented',
  'dojo/keys',
  'dojo/on',
  'dojo/query',
  'dojo/string',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/ProgressBar',
  'esri/geometry/geometryEngineAsync',
  'esri/layers/GraphicsLayer',
  'esri/tasks/BufferParameters',
  'esri/tasks/GeometryService',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'esri/tasks/RelationshipQuery',
  'jimu/dijit/DrawBox',
  'jimu/dijit/SearchDistance',
  'jimu/dijit/FeatureSetChooserForMultipleLayers',
  'jimu/BaseWidget',
  'jimu/LayerInfos/LayerInfos',
  './Download_Avery',
  './Download_CSV',
  './Highlighter',
  './labelFormatUtils',
  './Queryer',
  './SearchLayers',
  'dojo/domReady!'
  ], function (
    declare,
    array,
    Color,
    lang,
    dom,
    domClass,
    domConstruct,
    domGeom,
    domStyle,
    Evented,
    keys,
    on,
    query,
    string,
    _WidgetsInTemplateMixin,
    ProgressBar,
    geometryEngineAsync,
    GraphicsLayer,
    BufferParameters,
    GeometryService,
    Query,
    QueryTask,
    RelationshipQuery,
    DrawBox,
    SearchDistance,
    FeatureSetChooserForMultipleLayers,
    BaseWidget,
    LayerInfos,
    Download_Avery,
    Download_CSV,
    Highlighter,
    labelFormatUtils,
    Queryer,
    SearchLayers
  ) {
    return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'jimu-widget-public-notification',

      _origin: undefined,
      _bufferDistanceMeters: 0,
      _drawToolOption: {},
      _formatCodeHandlers: {
        'AVERY': './Download_Avery',
        'CSV': './Download_CSV'
      },
      _formatCodeHandlerInstances: {
        'AVERY': null,
        'CSV': null
      },

      _bufferGeometry: null,
      _searchResultSymbology:
      {
        point: {
          lineColor: new Color('aqua'),
          lineWidth: 2,
          fillColor: new Color([0, 255, 255, 0.1])
        },
        line: {
          lineColor: new Color('aqua'),
          lineWidth: 2
        },
        polygon: {
          lineColor: new Color('aqua'),
          lineWidth: 2,
          fillColor: new Color([0, 255, 255, 0.1])
        }
      },
      _bufferSymbology:
      {
        point: {
          lineColor: new Color('green'),
          lineWidth: 3,
          fillColor: new Color([0, 255, 0, 0.1])
        },
        line: {
          lineColor: new Color('green'),
          lineWidth: 3
        },
        polygon: {
          lineColor: new Color('green'),
          lineWidth: 3,
          fillColor: new Color([0, 255, 0, 0.1])
        }
      },
      _addresseeSymbology:
      {
        point: {
          lineColor: new Color('blue'),
          lineWidth: 2,
          fillColor: new Color([0, 0, 255, 0.1])
        },
        line: {
          lineColor: new Color('blue'),
          lineWidth: 2
        },
        polygon: {
          lineColor: new Color('blue'),
          lineWidth: 2,
          fillColor: new Color([0, 0, 255, 0.1])
        }
      },

      _addresseeSources: [],
      _foundAddressees: [],
      _foundLabels: [],

      //========== jimu/BaseWidget overrides ==========

      /**
       * Dijit lifecycle: "it will be invoked before rendering occurs, and before any dom nodes are created.
       * If you need to add or change the instance’s properties before the widget is rendered - this is the
       * place to do it."
       */
      postMixInProperties: function () {
        //mixin default nls with widget nls
        this.nls.common = {};
        lang.mixin(this.nls.common, window.jimuNls.common);
      },

      /**
       * Dijit lifecycle: "This is fired after all properties of a widget are defined, and the document
       * fragment representing the widget is created—but before the fragment itself is added to the main document."
       */
      postCreate: function () {
        this.inherited(arguments);

        this._checkDownloadBtnEnable();
      },

      /**
       * Dijit lifecycle: "This method is designed to handle processing after any DOM fragments have been
       * actually added to the document; it is not fired until after any potential child widgets have been
       * created and started as well."
       */
      startup: function () {
        this.inherited(arguments);

        this._init();
      },

      //========== jimu/BaseWidget implementations ==========

      /**
       * Called every time widget is opened.
       */
      onOpen: function () {
        // description from jimu/BaseWidget:
        //    state has been changed to "opened" when call this method.
        //    this function will be called in two cases:
        //      1. after widget's startup
        //      2. if widget is closed, use re-open the widget
        if (this._searchComponent) {
          this._searchComponent.setFocus();
        }
        this._dblClickZoom = this.map.isDoubleClickZoom;
      },

      /**
       * Called every time widget is closed.
       */
      onClose: function () {
        // description from jimu/BaseWidget:
        //    state has been changed to "closed" when call this method.
        this._clearAll();
      },

      /**
       * Dijit lifecycle: "Implement destroy if you have special tear-down work to do (the superclasses
       * will take care of most of it for you."
       */
      destroy: function () {
        if (this._drawTool) {
          this._drawTool.destroyRecursive();
          this._drawTool = null;
        }

        this.inherited(arguments);
      },

      //========== Custom content ==========

      /**
       * Initializes the widget during startup.
       */
      _init: function () {
        var flags, drawTools, labelFormats, drawToolsChildren, updatedDrawToolsChildren = [];

        // Search and addressee layers
        LayerInfos.getInstance(this.map, this.map.itemInfo)
          .then(lang.hitch(this, function (layerInfosObj) {
            var selectToolParentDiv, selectToolDiv, selectLayerIds,
              selectButton, selectArrowButton, selectClearButton,
              searchOptions = lang.clone(this.config.searchSourceSettings.search);

            // Select by drawing tools
            flags = this.config.searchSourceSettings.drawing.tools[0];
            drawTools = array.filter(this.config.searchSourceSettings.drawing.tools.slice(1), function (tool, i) {
              return flags[i] === '1';
            });

            // Search for features by map drawing
            if (drawTools.length > 0) {
              this._drawToolOption.map = this.map;
              this._drawToolOption.geoTypes = drawTools;
              this._drawToolOption.showClear = true;
              this._drawToolOption.keepOneGraphic = true;
              this._drawTool = new DrawBox(this._drawToolOption);

              // Reorder options to match configuration
              drawToolsChildren = this._drawTool.domNode.childNodes[1].children;
              array.forEach(drawTools, function (toolName) {
                array.some(drawToolsChildren, function (toolDom) {
                  // We have a match if the DOM item has a matching geotype
                  if (toolDom.attributes["data-geotype"].nodeValue === toolName) {
                    updatedDrawToolsChildren.push(toolDom);
                    return true;
                  }
                  return false;
                });
              });
              updatedDrawToolsChildren.push(drawToolsChildren[drawToolsChildren.length - 1]);  // add the clear button
              this._replaceChildren(this._drawTool.domNode.childNodes[1], updatedDrawToolsChildren);
              this._drawTool.placeAt(this.drawBoxDiv);

              this.own(this._drawTool.on('icon-selected', lang.hitch(this, this._onDrawIconSelected)));
              this.own(this._drawTool.on('draw-end', lang.hitch(this, this._onDrawEnd)));
              this.own(this._drawTool.on('clear', lang.hitch(this, this._onDrawClear)));
              this.own(this._drawTool.on('user-clear', lang.hitch(this, this._onDrawClear)));
            }

            // Search for features by map selection
            if (this.config.searchSourceSettings.drawing.select) {
              selectToolParentDiv = domConstruct.create('div', {
                width: '100%'
              });
              selectToolDiv = domConstruct.create('div', null, selectToolParentDiv);

              this._selectTool = new FeatureSetChooserForMultipleLayers({
                geoTypes: drawTools.length > 0 ? drawTools : ['EXTENT'],
                map: this.map,
                updateSelection: true,
                fullyWithin: false
              }, selectToolDiv);
              this._selectTool.startup();


              this.mapSelectionLayers = array.filter(
                array.map(layerInfosObj.getLayerInfoArray(), function (layerInfo) {
                  return layerInfo.layerObject;
                }), function (layer) {
                  return layer;
                }
              );
              selectLayerIds = array.filter(
                array.map(searchOptions.sources, function (source) {
                  return source.layerId;
                }), function (layerId) {
                  return layerId;
                }
              );
              this.mapSelectionLayers = array.filter(this.mapSelectionLayers, function (layer) {
                return selectLayerIds.indexOf(layer.id) >= 0;
              });
              if (this.mapSelectionLayers.length > 0) {
                this._selectTool.setFeatureLayers(this.mapSelectionLayers);
              }

              // On select is activated, deactivate any draw tool if selected
              selectButton = query('.draw-item-btn', this._selectTool.domNode)[0];
              this.own(on(selectButton, 'click', lang.hitch(this, this._onSelectSelected)));
              selectArrowButton = query('.arrow', this._selectTool.domNode)[0];
              this.own(on(selectArrowButton, 'click', lang.hitch(this, this._onSelectSelected)));
              selectClearButton = query('.btn-clear', this._selectTool.domNode)[0];
              this.own(on(selectClearButton, 'click', lang.hitch(this, this._onSelectClear)));

              // On selection complete
              this.own(on(this._selectTool, 'unloading', lang.hitch(this, function () {
                var selectedFeatures = [];
                array.forEach(this.mapSelectionLayers, lang.hitch(this, function (layer) {
                  selectedFeatures = selectedFeatures.concat(layer.getSelectedFeatures());
                }));
                this._origin = array.map(selectedFeatures, function (feature) {
                  return feature.geometry;
                });
                this._doBufferSearch();
              })));

              // Place select tool inline with draw tools
              domConstruct.place(selectToolParentDiv, this.drawBoxDiv, 'last');
            }

            // Search for features by name
            searchOptions.map = this.map;
            this._searchComponent = new SearchLayers(searchOptions,
              this.appConfig.portalUrl, layerInfosObj, domConstruct.create('div', null, this.searchNode));

            this._searchComponent.searchDijit().then(lang.hitch(this, function (searchDijit) {
              this._searchDijit = searchDijit;
              this.own(on(searchDijit, 'search-results', lang.hitch(this, this._onSearchResults)));
              this.own(on(searchDijit, 'clear-search', lang.hitch(this, this._onClearSearch)));
            }));

            // Filter out any addressee layers not selected to be visible
            flags = this.config.addresseeSourceSettings.sources[0];
            this._addresseeSources =
              array.filter(this.config.addresseeSourceSettings.sources.slice(1), function (source, i) {
                return flags[i] === '1';
              });

            // Amend the addressee source descriptions by using the layer popups as the label definitions
            array.forEach(this._addresseeSources, function (addresseeSource, i) {
              array.some(layerInfosObj._operLayers, function(operLayer) {
                if (addresseeSource.name === operLayer.title &&
                  operLayer.popupInfo && operLayer.popupInfo.description) {
                  addresseeSource.labelLineTemplates =
                    labelFormatUtils.convertPopupToLabelSpec(operLayer.popupInfo.description);
                  addresseeSource.labelLineTemplates.parsedExpressions =
                    labelFormatUtils.parseArcadeExpressions(operLayer.popupInfo.expressionInfos);
                  addresseeSource.url = operLayer.url;
                  if (addresseeSource.useRelatedRecords) {
                    addresseeSource.labelLineTemplates.relationships = this._createRelationshipQueries(operLayer);
                  }

                  this.addresseeSelect.addOption({
                    value: i,
                    label: addresseeSource.name
                  });
                  return true;
                }
                return false;
              }, this);
            }, this);
          })
        );

        if (this.addresseeSelect.options.length > 0) {
          domStyle.set('activeWidgetSection', 'display', '');
          this.own(this.addresseeSelect.on('change', lang.hitch(this, this._updateAddresseesFromBufferGeometry)));
        } else {
          domStyle.set('nothingConfiguredSection', 'display', 'block');
          return;
        }

        // Buffered query tool
        this._queryer = new Queryer(this.map, this.config.searchSourceSettings.geometryServiceURL);

        // Layer to draw buffer
        this._bufferLayer = new GraphicsLayer();
        this.map.addLayer(this._bufferLayer);

        // Highlighter
        this._highlighter = new Highlighter(100);

        // Size of buffer around searched or drawn features
        this._createSearchDistanceDisplay();

        // "Format" option
        flags = this.config.notificationSettings.labelFormats[0];
        labelFormats = array.filter(this.config.notificationSettings.labelFormats.slice(1),
          lang.hitch(this, function (format, i) {
            var keep = flags[i] === '1';
            if (keep) {
              this.formatSelect.addOption({
                value: i,
                label: '<span' + (format.hint ? ' title="' + format.hint + '"' : '') + '>' + format.name +  '</span>'
              });
            }
            return keep;
          }));

        // Text for download button
        this.downloadBtn.innerHTML = window.jimuNls.layerInfosMenu.itemDownload;

        this.resize();
      },

      /**
       * Customizes the buffer distance UI element.
       * @param {string|number} searchDistanceSource Either 'all' for all sources or the 0-based index into the
       *        list of search sources
       */
      _createSearchDistanceDisplay: function (searchDistanceSource) {
        var isEnabled = false, bufferInfo, flags,  bufferUnits, currentOptions, filteredUnitsOptions = [];

        // Replace the search distance display because it doesn't handle changes to its menu
        if (this._searchDistance) {
          isEnabled = this._searchDistance.isEnabled();
          this._searchDistance.destroy();
          this._searchDistance = null;
        }
        domConstruct.empty(this.searchDistanceDiv);

        // Use the config to filter and order the units list
        this._searchDistanceSource = searchDistanceSource;
        if (typeof this._searchDistanceSource === 'undefined') {
          bufferInfo = this.config.searchSourceSettings.drawing.buffer;
        } else {
          bufferInfo = this.config.searchSourceSettings.search.sources[this._searchDistanceSource].buffer;
        }

        flags = bufferInfo.bufferUnitsMenu[0];
        bufferUnits =
          array.filter(bufferInfo.bufferUnitsMenu.slice(1), function (units, i) {
            return flags[i] === '1';
          });

        // Create the distance display and replace its menu to match the menu configured for the layer/geocoder
        this._searchDistance = new SearchDistance({
          distance: bufferInfo.bufferDistance,
          unit: bufferInfo.bufferUnits
        });

        currentOptions = this._searchDistance.unitSelect.options;
        array.forEach(bufferUnits, function (units) {
          array.some(currentOptions, function (option) {
            if (option.value === units) {
              filteredUnitsOptions.push(option);
              return true;
            }
            return false;
          }, this);
        }, this);

        if (filteredUnitsOptions.length > 0) {
          this._searchDistance.unitSelect.options = filteredUnitsOptions;
        }

        this._searchDistance.placeAt(this.searchDistanceDiv);
        if (isEnabled) {
          this._searchDistance.enable();  // default is disabled but editable; this makes it enabled
        } else {
          this._searchDistance.disable();  // default is disabled but editable; this makes it disabled and uneditable
        }

        // Update the displayed buffer
        this._updateDisplayedBuffer(this._searchDistance.getData());

        // Event handlers
        this.own(this._searchDistance.numberTextBox.on('keyup', lang.hitch(this, this._onBufferDistanceKeyup)));
        this.own(on(this._searchDistance, 'change', lang.hitch(this, this._onSearchDistanceChanged)));
      },

      /**
       * Updates the currently-displayed buffer.
       * @param {object} data Distance information from the search distance dijit; contains properties isEnabled
       *        and meters indicating that the buffer is enabled and its distance
       */
      _updateDisplayedBuffer: function (data) {
        this._bufferDistanceMeters = 0;
        if (data && data.isEnabled && data.meters >= 0) {
          this._bufferDistanceMeters = data.meters;
        }

        if (Array.isArray(this._origin) && this._origin.length > 0) {
          this._doBufferSearch();
        }
      },

      /**
       * Replaces the children in the specified node with a new set of children.
       * @param {DOM element} node Parent node to have its children replaced
       * @param {array} newChildren List of children to append to node
       */
      _replaceChildren: function (node, newChildren) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
        array.forEach(newChildren, function (newChild) {
          node.appendChild(newChild);
        });
      },

      /**
       * Creates relationship queries for each relationship flag in a popup.
       * @param {feature layer} operLayer Layer whose popup is to be examined
       * @return {object} Hash of relationships by their id, or null if there are no relationship flags in the
       *        popup; each relationship has the properties operLayer and relatedQuery for the related layer
       *        and the query for that layer
       */
      _createRelationshipQueries: function (operLayer) {
        var hasRelationships = false, relationships = {}, relationshipFieldPattern = /\{relationships\/\d+\//gm,
          relationshipIdPattern = /\d+/, matches;

        matches = operLayer.popupInfo.description.match(relationshipFieldPattern);
        if (matches) {
          hasRelationships = true;
          array.forEach(matches, function (match) {
            var relatedQuery, id = match.match(relationshipIdPattern)[0];
            if (!relationships.hasOwnProperty(id)) {
              relatedQuery = new RelationshipQuery();
              relatedQuery.outFields = ['*'];
              relatedQuery.relationshipId = id;
              relatedQuery.returnGeometry = false;
              relationships[id] = {
                operLayer: operLayer,
                relatedQuery: relatedQuery
              };
            }
          });
        }

        return hasRelationships? relationships : null;
      },

      /**
       * Enables and disables the UI for searching for or drawing the features to be used as well as for
       * specifying the buffer enablement and distance; disable is done by displaying a scrim over the UI.
       * @param {boolean} enable Whether the UI should be available (scrim is hidden) or not (scrim is visible)
       */
      _enableSourceInputs: function (enable) {
        var scrim = dom.byId('sourceInputsSectionScrim');
        if (enable) {
          domClass.add(scrim, 'hidden');
        } else {
          var sourceInputsSectionBox = domGeom.getMarginBox(dom.byId('sourceInputsSection'));
          domGeom.setMarginBox(scrim, sourceInputsSectionBox);
          domClass.remove(scrim, 'hidden');
        }
      },

      /**
       * Updates the list of found addressees after re-performing buffering using the source item(s).
       */
      _doBufferSearch: function () {
        this._onStartBuffer();

        this._queryer.createBufferFromGeometries(this._origin, this._bufferDistanceMeters)
          .then(lang.hitch(this, function (bufferedGeomUnion) {
            // We have a single polygon representing the buffer of the union of the input geometries
            this._bufferGeometry = bufferedGeomUnion;

            // Update the set of addressees based on the new buffer
            this._updateAddresseesFromBufferGeometry();

          }), lang.hitch(this, function (error) {
            this._onEndBuffer();
            console.log(error);
          }));
      },

      /**
       * Updates the list of found addressees after re-performing buffering using the current buffer.
       */
      _updateAddresseesFromBufferGeometry: function () {
        this._onStartBuffer();

        if (this._bufferGeometry) {
          // Start an indeterminate progress bar
          this.indeterminateProgress.set({value: Number.POSITIVE_INFINITY});
          domStyle.set(this.indeterminateProgress.domNode, 'display', 'block');

          // Highlight the buffered source
          this._createAndAddGraphic(this._bufferGeometry, this._bufferSymbology, this._bufferLayer);

          // Use the selectors to find the addressees
          this._queryer.find(this._bufferGeometry,
            this._addresseeSources[this.addresseeSelect.value].url, ['*'], 'addressee')
            .then(lang.hitch(this, function (findResults) {
              if (findResults.features && Array.isArray(findResults.features) && findResults.features.length > 0) {
                this._foundAddressees = findResults.features;

                // Done with indeterminate progress bar
                domStyle.set(this.indeterminateProgress.domNode, 'display', 'none');

                // Highlight the addressees
                this._highlighter.highlightFeatures(this._foundAddressees,
                  lang.hitch(this, this._createAndAddGraphic), this._addresseeSymbology,
                  this._bufferLayer, lang.hitch(this, this._setProgressPercentage));
              }
              this._onEndBuffer();
            }), lang.hitch(this, function (error) {
              this._onEndBuffer();
              console.log(error);
            }));
        } else {
          this._onEndBuffer();
        }
      },

      /**
       * Shows the current progress on a scale of 0 to 100, making the `determinateProgress` progress bar
       * visible when its value is between 0 and 100, exclusively.
       * @param {number} value Progress percent, 0..100
       */
      _setProgressPercentage: function (value) {
        if (value <= 0) {
          this.determinateProgress.set({value: 0});
          domStyle.set(this.determinateProgress.domNode, 'display', 'block');
        } else if (value >= 100) {
          this.determinateProgress.set({value: 100});
          domStyle.set(this.determinateProgress.domNode, 'display', 'none');
        } else {
          this.determinateProgress.set({value: value});
        }
      },

      /**
       * Creates a graphic and adds it to the specified layer.
       * @param {object} symbol Symbol to use for geometry
       * @param {object} geometry Geometry for the symbol
       * @memberOf Queryer#
       */
      _createAndAddGraphic: function (item, symbology, layer) {
        var graphic = this._highlighter.createGraphic(item, symbology);
        if (graphic) {
          layer.add(graphic);
        }
      },

      /**
       * Updates the currently-displayed buffer upon the ENTER key event.
       * @param {object} event Key event
       */
      _onBufferDistanceKeyup: function (event) {
        // If the enter key was used, accept it as the conclusion of the distance
        // update rather than waiting for the loss of focus
        if (event.keyCode === keys.ENTER) {
          this._updateDisplayedBuffer(this._searchDistance.getData());
        }
      },

      /**
       * Updates the currently-displayed buffer upon the change event from the search distance dijit.
       * @param {object} data Event data, which includes properties distance and unit
       */
      _onSearchDistanceChanged: function (data) {
        // Update the current config for this source
        var bufferInfo;

        if (typeof this._searchDistanceSource === 'undefined') {
          bufferInfo = this.config.searchSourceSettings.drawing.buffer;
        } else {
          bufferInfo = this.config.searchSourceSettings.search.sources[this._searchDistanceSource].buffer;
        }
        bufferInfo.bufferDistance = data.distance;
        bufferInfo.bufferUnits = data.unit;

        // Update the displayed buffer
        this._updateDisplayedBuffer(data);
      },

      /**
       * Updates the currently-displayed buffer upon the search-results event from the search dijit.
       * @param {object} event Event data, which includes properties numResults, results, and activeSourceIndex
       */
      _onSearchResults: function (event) {
        var results = event.results, searchSourceIndex = event.activeSourceIndex;

        this._clearAll();
        if (event.numResults > 0 && results) {
          // Use the first result from any source
          labelFormatUtils.objEach(results, function (result, iResult) {
            if (result && result.length > 0) {
              // Use the first result in this source
              this._origin = [result[0].feature.geometry];

              this._createAndAddGraphic(result[0].feature, this._searchResultSymbology, this.map.graphics);

              // Match the buffer display to the feature layer
              this._createSearchDistanceDisplay(searchSourceIndex === 'all' ? iResult : searchSourceIndex);

              // Buffer the item
              this._doBufferSearch();
            }
          }, this);
        }
      },

      /**
       * Clears the search UI upon the clear-search event from the search dijit.
       */
      _onClearSearch: function () {
        this._clearAll();
      },

      /**
       * Clears the search UI and rebuilds the search distance UI upon the icon-selected event from the draw box dijit.
       */
      _onDrawIconSelected: function () {
        if (this._selectTool && this._selectTool.isActive()) {
          this._selectTool.deactivate();
        }

        this.map.disableDoubleClickZoom();
        this.map.navigationManager.setImmediateClick(true);
        this.map.setInfoWindowOnClick(false);
        this._clearAll();
        this._createSearchDistanceDisplay();
      },

      /**
       * Updates the currently-displayed buffer upon the draw-end event from the draw box dijit.
       */
      _onDrawEnd: function (graphic) {
        if (this._dblClickZoom) {
          this.map.enableDoubleClickZoom();
        }
        this.map.navigationManager.setImmediateClick(false);
        this._origin = [graphic.geometry];
        this._doBufferSearch();
      },

      /**
       * Clears the search UI upon the clear or user-clear events from the draw box dijit.
       */
      _onDrawClear: function () {
        this.map.setInfoWindowOnClick(true);
        this._clearAll();
      },

      /**
       * Clears the search UI and rebuilds the search distance UI upon the icon-selected event from the draw box dijit.
       */
      _onSelectSelected: function () {
        this._onSelectClear();
      },

      /**
       * Clears the search UI upon the clear or user-clear events from the draw box dijit.
       */
      _onSelectClear: function () {
        this._clearAll();
        this._createSearchDistanceDisplay();
      },

      /**
       * Disables the source UI, removes buffer graphics, and shows an indeterminate progress bar for the
       * start of the buffering process.
       */
      _onStartBuffer: function () {
        this._enableSourceInputs(false);
        this._clearBufferGraphics();

        // Start an indeterminate progress bar
        this.indeterminateProgress.set({value: Number.POSITIVE_INFINITY});
        domStyle.set(this.indeterminateProgress.domNode, 'display', 'block');
      },

      /**
       * Enables the source UI and hides an indeterminate progress bar for the conclusion of the buffering process.
       */
      _onEndBuffer: function () {
        this._enableSourceInputs(true);

        // Done with indeterminate progress bar
        domStyle.set(this.indeterminateProgress.domNode, 'display', 'none');

        this._checkDownloadBtnEnable();
      },

      /**
       * Clears the search UI and buffer graphics.
       */
      _clearAll: function () {
        this._origin = undefined;
        this._foundAddressees = [];
        this._foundLabels = [];

        // Clear selection graphics
        this._clearSelections();

        // Search result graphics
        this.map.graphics.clear();

        // Draw box graphics
        if (this._drawTool && this._drawTool.drawLayer) {
          this._drawTool.drawLayer.clear();
        }

        // Buffer graphics and found addressees
        this._clearBufferGraphics();

        this._checkDownloadBtnEnable();
      },

      /**
       * Clears the selections from all layers used for selecting from the map.
       */
      _clearSelections: function () {
        array.forEach(this.mapSelectionLayers, function (layer) {
          layer.clearSelection();
        });
      },

      /**
       * Clears the buffer graphics.
       */
      _clearBufferGraphics: function () {
        this._foundAddressees = [];
        this._foundLabels = [];

        if (this._bufferLayer) {
          this._bufferLayer.clear();
        }

        this._checkDownloadBtnEnable();
      },

      /**
       * Updates the download button's visibility based on the presence of (make visible) or absence of
       * (make invisible) addressees.
       */
      _checkDownloadBtnEnable: function () {
        if (this._addresseeSources.length > 0) {
          // Get the address labels using the found addresses directly or their related addresses. Slows down the
          // reporting of addresses found, but we need to know the related addresses count if applicable--the
          // found addresses are misleading in that case.
          labelFormatUtils.createLabelsFromFeatures(this._foundAddressees,
            this._addresseeSources[this.addresseeSelect.value].labelLineTemplates)
            .then(lang.hitch(this, function (content) {
            var countEcho = dom.byId('numAddresseesFound'), message = '';

            this._foundLabels = content;
            if (this._foundLabels.length > 0) {
              message = string.substitute(this.nls.numAddresseesFound, {count: this._foundLabels.length});
              domClass.remove(this.downloadBtn, 'hidden');
            } else {
              domClass.add(this.downloadBtn, 'hidden');
            }
            countEcho.innerHTML = message;
          }));
        }
      },

      /**
       * Creates and saves addressee labels upon the click event from the download button.
       */
      _onDownloadBtnClicked: function () {
        var labelFormat, labelPageOptions;
        labelPageOptions = lang.clone(this.config.notificationSettings.labelPageOptions);

        // Label configuration
        labelFormat = this.config.notificationSettings.labelFormats[this.formatSelect.value + 1];
        switch (labelFormat.labelSpec.type) {
          case 'AVERY':
            this._formatCodeHandlerInstances[labelFormat.labelSpec.type] = new Download_Avery();
            labelPageOptions.guidance.printSuggestion = this.nls.tooltips.printSuggestion;
            break;
          case 'CSV':
            this._formatCodeHandlerInstances[labelFormat.labelSpec.type] = new Download_CSV();
            break;
        }

        this._doSave(this._formatCodeHandlerInstances[labelFormat.labelSpec.type],
          labelFormat.labelSpec, labelPageOptions);
      },

      /**
       * Creates and saves addressee labels.
       * @param {function} downloadHandler Function to perform label creation and saving
       * @param {object} labelSpec Collection of label and page configurations; see example below
       * @param {object} labelPageOptions Collection of display options; see example below
       * @example
       *   labelSpec = {
       *     fontSizePx: 11,
       *     horizGapIn: 0.125,
       *     insetIn: 0.1,
       *     labelHeightIn: 1,
       *     labelWidthIn: 2.625,
       *     maxNumLabelLines: 4,
       *     numLabelsAcross: 3,
       *     numLabelsDown: 10,
       *     pageBottomIn: 0.5,
       *     pageHeightIn: 11,
       *     pageLeftIn: 0.1875,
       *     pageRightIn: 0.1875,
       *     pageTopIn: 0.5,
       *     pageWidthIn: 8.5,
       *     type: 'AVERY',
       *     vertGapIn: 0
       *   };
       *   labelPageOptions = {
       *     guidance: {
       *       gridBlackPercent: 25,
       *       labelBorderBlackPercent: 100,
       *       leftIn: 0.167,
       *       majorTickIn: 1,
       *       minorTickIn: 0.1,
       *       noteFontSizePx: 7,
       *       printSuggestion: 'Print using Adobe® Reader®\'s "Actual size" setting',
       *       rightIn: 0.167,
       *       showGrid: false,
       *       showLabelOutlines: false
       *     },
       *     rasterResolutionPxPerIn: 150,
       *     showGuidance: false,
       *     useVectorFonts: true
       *   };
       */
      _doSave: function (downloadHandler, labelSpec, labelPageOptions) {
        var filename;

        if (!downloadHandler ||  this._foundLabels.length === 0) {
          return;
        }
        filename = this._addresseeSources[this.addresseeSelect.value].name;

        // Start a determinate progress bar
        this.determinateProgress.set({value: 0});
        domStyle.set(this.determinateProgress.domNode, 'display', 'block');

        // Use a timeout so that the UI gets time to paint the progress bar
        console.log('Downloading ', this._foundLabels.length, ' labels');
        setTimeout(lang.hitch(this, function () {
          downloadHandler.save(this._foundLabels, filename,
            labelSpec, labelPageOptions, this.domNode, this.determinateProgress).then(
              lang.hitch(this, function (ok) {
                console.log('PDF document(s) ' + (ok? '' : 'not ') + 'created');

                // Done with determinate progress bar
                this.determinateProgress.set({value: 100});
                domStyle.set(this.determinateProgress.domNode, 'display', 'none');
              })
            );
        }), 10);
      }

    });
  }
);
