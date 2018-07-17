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
  "dijit/_WidgetBase",
  "dojo/Evented",
  "dojo/_base/lang",
  "dojo/_base/array",
  "esri/dijit/Search",
  "esri/tasks/locator",
  "esri/layers/FeatureLayer",
  "jimu/utils",
  "dojo/dom-construct",
  "jimu/LayerInfos/LayerInfos",
  "./searchSourceUtils",
  "dojo/when",
  "dojo/Deferred",
  "dojo/promise/all",
  "dojo/on",
  "esri/InfoTemplate",
  "dojo/keys"
], function (
  declare,
  _WidgetBase,
  Evented,
  lang,
  array,
  SearchWidget,
  Locator,
  FeatureLayer,
  jimuUtils,
  domConstruct,
  LayerInfos,
  utils,
  when,
  Deferred,
  all,
  on,
  InfoTemplate,
  dojoKeys
) {
  return declare([_WidgetBase, Evented], {
    config: null,
    map: null,
    searchOptions: null,
    layerInfosObj: null,
    _urlParams: {},
    constructor: function (options) {
      lang.mixin(this, options);
    },

    postCreate: function () {
      this._urlParams = {};
    },

    startup: function () {
      this.inherited(arguments);
      //get the instance of layer infos
      LayerInfos.getInstance(this.map, this.map.itemInfo)
        .then(lang.hitch(this, function (layerInfosObj) {
          this.layerInfosObj = layerInfosObj;
          //handle for filter changed event so that we can update the filters on search layers
          this.own(this.layerInfosObj.on('layerInfosFilterChanged',
            lang.hitch(this, this.onLayerInfosFilterChanged)));
          //set properties of utils
          utils.setMap(this.map);
          utils.setLayerInfosObj(this.layerInfosObj);
          utils.setAppConfig(this.appConfig);
          /*
          * This will get the config for search, and for supporting backward compatibility if
          * searchSourceSettings are not found it will fetch all the searchable layers from
          * web-map and geocoders form organization properties.
          */
          when(utils.getConfigInfo(this.config.searchSourceSettings)).then(
            lang.hitch(this, function (config) {
              //Backward compatibility:
              //searchSourceSettings will not be available in config add default sources
              if (!this.config.searchSourceSettings) {
                this.config.searchSourceSettings = config;
              }
              return all(this._convertConfig(config)).then(function (searchSources) {
                return array.filter(searchSources, function (source) {
                  return source;
                });
              });
            })).then(lang.hitch(this, function (searchSources) {
              if (!this.domNode) {
                return;
              }
              //once search sources are available initialize the search dijit
              this._init(searchSources);
            }));
        }));
    },

    /**
    * This function will create the sources for search dijit according to the configuration.
    **/
    _convertConfig: function (config) {
      var sourceDefs = array.map(config.sources, lang.hitch(this, function (source) {
        var def = new Deferred();
        //if selected source is geocoder create geocoder source else feature layer
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
          //add properties required for local search if localSearch is enabled in configuration
          if (source.enableLocalSearch) {
            _source.localSearchOptions = {
              minScale: source.localSearchMinScale,
              distance: source.localSearchDistance
            };
          }
          def.resolve(_source);
        } else if (source && source.url && source.type === 'query') {
          var searchLayer = new FeatureLayer(source.url || null, { outFields: ["*"] });
          //after layer is loaded create layer source using layer properties
          this.own(on(searchLayer, 'load', lang.hitch(this, function (result) {
            var flayer, template, searchFields, convertedSource;
            flayer = result.layer;
            template = this._getInfoTemplate(flayer, source, source.displayField);
            searchFields = null;
            //if search fields are configured add them for search else add all the fields from layer
            if (source.searchFields && source.searchFields.length > 0) {
              searchFields = source.searchFields;
            } else {
              searchFields = [];
              array.forEach(flayer.fields, function (field) {
                //add all fields from layer except objectId and geometry
                if (field.type !== "esriFieldTypeOID" && field.name !== flayer.objectIdField &&
                  field.type !== "esriFieldTypeGeometry") {
                  searchFields.push(field.name);
                }
              });
            }
            convertedSource = {
              featureLayer: flayer,
              outFields: ["*"],
              searchFields: searchFields,
              displayField: source.displayField || "",
              exactMatch: !!source.exactMatch,
              name: jimuUtils.stripHTML(source.name || ""),
              placeholder: jimuUtils.stripHTML(source.placeholder || ""),
              maxSuggestions: source.maxSuggestions || 6,
              maxResults: source.maxResults || 6,
              zoomScale: source.zoomScale || 50000,
              infoTemplate: template,
              useMapExtent: !!source.searchInCurrentMapExtent,
              _featureLayerId: source.layerId
            };
            //remove if template is invalid
            if (!template) {
              delete convertedSource.infoTemplate;
            }
            //Set the definition expression
            if (convertedSource._featureLayerId) {
              var layerInfo = this.layerInfosObj
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

    /**
    * This function will return the template for featureLayer instances
    **/
    _getInfoTemplate: function (fLayer, source, displayField) {
      var layerInfo, template, validTemplate;
      layerInfo = this.layerInfosObj.getLayerInfoById(source.layerId);
      template = layerInfo && layerInfo.getInfoTemplate();
      validTemplate = layerInfo && template;

      if (layerInfo && !validTemplate) { // doesn't enabled pop-up
        return null;
      } else if (validTemplate) { // configured media or attachments
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

    /**
    * This function will create search widget instance, & add the options according to configuration
    **/
    _init: function (searchSources) {
      var options, activeSource;
      //set active source index to all if multiple sources found
      activeSource = searchSources.length === 1 ? 0 : 'all';
      options = {
        map: this.map,
        addLayersFromMap: false,
        autoNavigate: false,
        autoComplete: true,
        minCharacters: 0,
        searchDelay: 100,
        enableInfoWindow: true,
        enableHighlight: this.config.searchSourceSettings.showInfoWindowOnSelect,
        showInfoWindowOnSelect: this.config.searchSourceSettings.showInfoWindowOnSelect,
        allPlaceholder: jimuUtils.stripHTML(this.config.searchSourceSettings.allPlaceholder),
        sources: searchSources,
        activeSourceIndex: activeSource
      };
      lang.mixin(options, this.searchOptions);
      //get url parameters
      this._urlParams = this._getUrlParams();
      //create search dijit
      this.search = new SearchWidget(options, domConstruct.create("div", {
        "class": "searchControl"
      }, this.domNode));
      this.own(this.search.on("load", lang.hitch(this, this._load)));
      this.own(this.search.on("select-result", lang.hitch(this, this._selectResult)));
      this.own(this.search.on("clear-search", lang.hitch(this, this._clear)));
      this.own(this.search.on("search-results", lang.hitch(this, this._results)));
      this.own(this.search.on("suggest-results", lang.hitch(this, this._results)));
      //On enter click in search textbox or click on search icon emit init-attribute-search event
      this.own(on(this.search.inputNode, "keyup", lang.hitch(this, function (evt) {
        if (evt.keyCode === dojoKeys.ENTER) {
          this.emit("init-attribute-search");
        }
      })));
      this.own(on(this.search.submitNode, "click", lang.hitch(this, function () {
        this.emit("init-attribute-search");
      })));

      this.search.startup();
    },

    /**
    * get URL parameters
    **/
    _getUrlParams: function () {
      var urlObject = jimuUtils.urlToObject(document.location.href);
      urlObject.query = urlObject.query || {};
      return urlObject.query;
    },

    /**
    * Set search box text
    **/
    setSearchText: function (searchText) {
      this.search.set('value', searchText);
    },

    /**
    * Get the entered text in search textbox
    **/
    getSearchText: function () {
      return this.search.get('value');
    },

    /**
    * Get active source for search dijit
    **/
    getActiveSource: function () {
      return this.search.activeSource;
    },

    /**
    * Clear search box text
    **/
    clearSearchText: function () {
      if (this.search) {
        this.search.clear();
      }
    },

    /**
    * Set search string if available in url parameters
    **/
    _setSearchString: function () {
      if (this._urlParams.find) {
        this.search.set('value', this._urlParams.find);
        // search for URL's find parameter after sometime to avoid the suggestion list
        setTimeout(lang.hitch(this, function () {
          this.search.search();
        }), 1000);
      }
    },

    /**
    * This function will be triggered on filterChange
    * and updates the definition expression in the search layers
    **/
    onLayerInfosFilterChanged: function (changedLayerInfos) {
      array.some(changedLayerInfos, lang.hitch(this, function (info) {
        if (this.search && this.search.sources && this.search.sources.length > 0) {
          array.forEach(this.search.sources, function (s) {
            if (s._featureLayerId === info.id) {
              s.featureLayer.setDefinitionExpression(info.getFilter());
            }
          });
        }
      }));
    },

    /* ----------------------- */
    /* Event handler functions */
    /* ----------------------- */
    _load: function (evt) {
      this.emit("search-loaded", evt);
      //set default search string if available in url parameters
      this._setSearchString();
    },

    _results: function (evt) {
      this.emit("search-results", evt);
    },

    _clear: function (evt) {
      this.emit("clear-search", evt);
    },

    _selectResult: function (evt) {
      //code to focus out the textbox (issue with android tab)
      this.search.blur();
      this.emit("select-result", evt);
    }
  });
});