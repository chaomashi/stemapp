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
  'dojo/_base/array',
  'dojo/Deferred',
  'dojo/on',
  'dojo/when',
  'dojo/promise/all',
  'jimu/BaseWidget',
  'jimu/portalUtils',
  'jimu/utils',
  'esri/lang',
  'esri/request',
  'esri/dijit/Search',
  'esri/tasks/locator',
  'esri/layers/FeatureLayer',
  'esri/InfoTemplate'
], function(declare, lang, array, Deferred, on, when, all, BaseWidget, portalUtils, jimuUtils, esriLang, esriRequest,
  Search, Locator, FeatureLayer, InfoTemplate) {

  return declare([BaseWidget], {
    baseClass: 'jimu-search-layers',
    declaredClass: 'jimu.dijit.SearchLayers',

    _searchDijitReady: null,
    _searchDijit: null,
    _layerInfosObj: null,
    _esriLocatorRegExp: /geocode(.){0,3}\.arcgis.com\/arcgis\/rest\/services\/World\/GeocodeServer/g,

    //----------------------------------------------------------------------------------------------------------------//

    constructor: function(searchOptions, portalUrl, layerInfosObj, container) {
      this._searchDijitReady = new Deferred();
      this._layerInfosObj = layerInfosObj;
      this.own(layerInfosObj.on('layerInfosFilterChanged',
        lang.hitch(this, this._onLayerInfosFilterChanged)));

      when(this._getConfigInfo(searchOptions, portalUrl)).then(lang.hitch(this, function(searchOptions) {
        return all(this._convertConfig(searchOptions)).then(function(searchSources) {
          return array.filter(searchSources, function(source) {
            return source;
          });
        });
      })).then(lang.hitch(this, function(searchSources) {
        searchOptions.sources = searchSources;
        this._searchDijit = new Search(searchOptions, container);
        this._searchDijit.startup();
        this.setFocus();
        this._searchDijitReady.resolve(this._searchDijit);
      }));
    },

    searchDijit: function () {
      return this._searchDijitReady;
    },

    setFocus: function () {
      if (this._searchDijit) {
        this._searchDijit.inputNode.focus();
      }
    },

    destroy: function () {
      if (this._searchDijit) {
        this._searchDijit.destroy();
        this._searchDijit = null;
      }

      this.inherited(arguments);
    },

    //----------------------------------------------------------------------------------------------------------------//

    _onLayerInfosFilterChanged: function(changedLayerInfos) {
      array.some(changedLayerInfos, lang.hitch(this, function(info) {
        if (this._searchDijit && this._searchDijit.sources && this._searchDijit.sources.length > 0) {
          array.forEach(this._searchDijit.sources, function(s) {
            if (s._featureLayerId === info.id) {
              s.featureLayer.setDefinitionExpression(info.getFilter());
            }
          });
        }
      }));
    },

    _getConfigInfo: function(searchOptions, portalUrl) {
      if (searchOptions && searchOptions.sources && searchOptions.sources.length > 0) {
        var searchInfo = null;
        if (this._searchLayer(searchOptions.map) && searchOptions.upgradeFromGeocoder) {
          // back compatibility for searchOptions which come from geocoders
          searchInfo = searchOptions.map.itemInfo.itemData.applicationProperties.viewing.search;
          var defs = array.map(searchInfo.layers, lang.hitch(this, function(hintText, layer) {
            layer.hintText = hintText;
            return this._getQueryTypeGeocoder(searchOptions.map, layer);
          }, searchInfo.hintText));
          return all(defs).then(lang.hitch(this, function(results) {
            searchOptions.sources = [].concat(results).concat(searchOptions.sources);
            return searchOptions;
          }));
        } else {
          return searchOptions;
        }
      } else {
        return when(this._getSourcesFromPortalAndWebmap(searchOptions.map, portalUrl))
          .then(lang.hitch(this, function(sources) {
            return {
              "allPlaceholder": "",
              "showInfoWindowOnSelect": false,
              "sources": sources
            };
          }));
      }
    },

    _convertConfig: function(searchOptions) {
      var sourceDefs = array.map(searchOptions.sources, lang.hitch(this, function(source) {
        var def = new Deferred();
        if (source && source.url && source.type === 'locator') {
          var _source = {
            locator: new Locator(source.url || ""),
            outFields: ["*"],
            singleLineFieldName: source.singleLineFieldName || "",
            name: jimuUtils.stripHTML(source.name || ""),
            placeholder: jimuUtils.stripHTML(source.placeholder || ""),
            countryCode: source.countryCode || "",
            maxSuggestions: source.maxSuggestions,
            maxResults: source.maxResults || 6,
            zoomScale: source.zoomScale || 50000,
            useMapExtent: !!source.searchInCurrentMapExtent
          };

          if (source.enableLocalSearch) {
            _source.localSearchOptions = {
              minScale: source.localSearchMinScale,
              distance: source.localSearchDistance
            };
          }

          def.resolve(_source);
        } else if (source && source.url && source.type === 'query') {
          var searchLayer = new FeatureLayer(source.url || null, {
            outFields: ["*"]
          });

          this.own(on(searchLayer, 'load', lang.hitch(this, function(result) {
            var flayer = result.layer;
            var template = this._getInfoTemplate(flayer, source, source.displayField);
            var fNames = null;
            if (source.searchFields && source.searchFields.length > 0) {
              fNames = source.searchFields;
            } else {
              fNames = [];
              array.forEach(flayer.fields, function(field) {
                if (field.type !== "esriFieldTypeOID" && field.name !== flayer.objectIdField &&
                  field.type !== "esriFieldTypeGeometry") {
                  fNames.push(field.name);
                }
              });
            }
            var convertedSource = {
              featureLayer: flayer,
              outFields: ["*"],
              searchFields: fNames,
              displayField: source.displayField || "",
              exactMatch: !!source.exactMatch,
              name: jimuUtils.stripHTML(source.name || ""),
              placeholder: jimuUtils.stripHTML(source.placeholder || ""),
              maxSuggestions: source.maxSuggestions || 6,
              maxResults: source.maxResults || 6,
              zoomScale: source.zoomScale || 50000,
              infoTemplate: template,
              useMapExtent: !!source.searchInCurrentMapExtent,
              _featureLayerId: source.layerId,
              enableHighlight: true,
              showInfoWindowOnSelect: searchOptions.showInfoWindowOnSelect,
              enableInfoWindow: searchOptions.showInfoWindowOnSelect
            };
            if (!template) {
              delete convertedSource.infoTemplate;
            }
            if (convertedSource._featureLayerId) {
              var layerInfo = this._layerInfosObj
                .getLayerInfoById(convertedSource._featureLayerId);
              flayer.setDefinitionExpression(layerInfo.getFilter());
            }
            def.resolve(convertedSource);
          })));

          this.own(on(searchLayer, 'error', function () {
            def.resolve(null);
          }));
        } else {
          def.resolve(null);
        }
        return def;
      }));

      return sourceDefs;
    },

    _getInfoTemplate: function(fLayer, source, displayField) {
      var layerInfo = this._layerInfosObj.getLayerInfoById(source.layerId);
      var template = layerInfo && layerInfo.getInfoTemplate();
      var validTemplate = layerInfo && template;

      if (layerInfo && !validTemplate) { // doesn't enabled pop-up
        return null;
      } else if (validTemplate) {
        // configured media or attachments
        return template;
      } else { // (added by user in setting) or (only configured fieldInfo)
        template = new InfoTemplate();
        template.setTitle('&nbsp;');
        template.setContent(
          lang.hitch(this, '_formatContent', source.name, fLayer, displayField)
        );

        return template;
      }
    },

    _getSourcesFromPortalAndWebmap: function(map, portalUrl) {
      var defs = [];
      var searchInfo = null;
      if (this._searchLayer(map)) {
        searchInfo = map.itemInfo.itemData.applicationProperties.viewing.search;
        array.forEach(searchInfo.layers, lang.hitch(this, function(hintText, layer) {
          layer.hintText = hintText;
          defs.push(this._getQueryTypeGeocoder(map, layer));
        }, searchInfo.hintText));
      } // else do nothing

      return portalUtils.getPortalSelfInfo(portalUrl)
        .then(lang.hitch(this, function(response) {
          var geocoders = response.helperServices && response.helperServices.geocode;

          if (geocoders && geocoders.length > 0) {
            for (var i = 0, len = geocoders.length; i < len; i++) {
              var geocoder = geocoders[i];
              if (geocoder) {
                defs.push(this._processSingleLine(geocoder));
              }
            }
          }

          return all(defs).then(lang.hitch(this, function(results) {
            var validSources = [];
            for (var i = 0; i < results.length; i++) {
              var geocode = results[i];
              if (!geocode) {
                continue;
              } else if (geocode && geocode.type === 'query') {
                validSources.push(geocode);
              } else {
                var json = {
                  name: geocode.name || this._getGeocodeName(geocode.url),
                  url: geocode.url,
                  singleLineFieldName: geocode.singleLineFieldName,
                  placeholder: geocode.placeholder ||
                    geocode.name || this._getGeocodeName(geocode.url),
                  maxResults: 6,
                  searchInCurrentMapExtent: false,
                  type: "locator"
                };
                json.enableLocalSearch = this._isEsriLocator(json.url);
                json.localSearchMinScale = 300000;
                json.localSearchDistance = 50000;

                validSources.push(json);
              }
            }

            return validSources;
          }));
        }));
    },

    _getQueryTypeGeocoder: function(map, item) {
      var layer = map.getLayer(item.id);
      var url = null;
      var _layerInfo = null;
      var _layerId = null;

      if (esriLang.isDefined(item.subLayer)) {
        _layerId = item.id + "_" + item.subLayer;
      } else {
        _layerId = item.id;
      }

      var isInMap = this._layerInfosObj.traversal(function(layerInfo) {
        if (layerInfo.id === _layerId) {
          _layerInfo = layerInfo;
          return true;
        }

        return false;
      });

      if (layer && isInMap && _layerInfo) {
        if (esriLang.isDefined(item.subLayer)) {
          url = _layerInfo.url || (layer.url + "/" + item.subLayer);
        } else {
          url = _layerInfo.url || layer.url;
        }

        return {
          name: _layerInfo.title,
          layerId: _layerId,
          url: url,
          placeholder: item.hintText,
          searchFields: [item.field.name],
          displayField: item.field.name,
          exactMatch: item.field.exactMatch || false,
          maxResults: 6,
          searchInCurrentMapExtent: false,
          type: "query"
        };
      } else {
        return null;
      }
    },

    _isEsriLocator: function(url) {
      this._esriLocatorRegExp.lastIndex = 0;
      return this._esriLocatorRegExp.test(url);
    },

    _processSingleLine: function(geocode) {
      if (geocode.singleLineFieldName) {
        return geocode;
      } else if (this._isEsriLocator(geocode.url)) {
        geocode.singleLineFieldName = 'SingleLine';
        return geocode;
      } else {
        var def = new Deferred();
        esriRequest({
          url: geocode.url,
          content: {
            f: "json"
          },
          handleAs: "json",
          callbackParamName: "callback"
        }).then(lang.hitch(this, function(response) {
          if (response.singleLineAddressField && response.singleLineAddressField.name) {
            geocode.singleLineFieldName = response.singleLineAddressField.name;
            def.resolve(geocode);
          } else {
            console.warn(geocode.url + "has no singleLineFieldName");
            def.resolve(null);
          }
        }), lang.hitch(this, function(err) {
          console.error(err);
          def.resolve(null);
        }));

        return def.promise;
      }
    },

    _getGeocodeName: function(geocodeUrl) {
      if (typeof geocodeUrl !== "string") {
        return "geocoder";
      }
      var strs = geocodeUrl.split('/');
      return strs[strs.length - 2] || "geocoder";
    },

    _getGeocoderName: function(url) {
      return this._getGeocodeName(url);
    },

    _hasAppSearchInfo: function(map) {
      return map.itemInfo && map.itemInfo.itemData &&
        map.itemInfo.itemData.applicationProperties &&
        map.itemInfo.itemData.applicationProperties.viewing &&
        map.itemInfo.itemData.applicationProperties.viewing.search;
    },

    _searchLayer: function(map) {
      if (!this._hasAppSearchInfo(map)) {
        return false;
      }
      var search = map.itemInfo.itemData.applicationProperties.viewing.search;
      if (!search.enabled) {
        return false;
      }
      if (search.layers.length === 0) {
        return false;
      }

      return true;
    }

  });
});