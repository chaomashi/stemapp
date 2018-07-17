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
    "dojo/_base/lang",
    'dojo/on',
    'dojo/_base/html',
    'dojo/query',
    //'dojo/keys',
    'esri/lang',
    //'./ColorPickerEditor',
    'esri/tasks/locator',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./PresetDestinations.html',
    'esri/dijit/Search',
    'jimu/dijit/RadioBtn'
  ],
  function(declare, lang, on, html, query, /*keys,*/esriLang,
           Locator,
           _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, Search) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
      templateString: template,
      _defaultLocations: null,
      _startSearchResults: null,
      _endSearchResults: null,
      _isSearchResultsShown: false,

      _ERROR_CLASS: "have-error",

      constructor: function(options) {
        if (!options) {
          return;
        }
        this._defaultLocations = options.defaultLocations;
        this.nls = options.nls;
      },

      postCreate: function() {
        this.inherited(arguments);
      },
      startup: function() {
        this.startSearch = new Search({
          enableSuggestions: false,
          enableButtonMode: false,
          theme: 'arcgisSearch'
        });
        this.startSearch.placeAt(this.startSearchDom);
        this.own(on(this.startSearch, 'search-results', lang.hitch(this, '_onStartSearchResults')));
        this.own(on(this.startSearchResultsNode, 'li:click', lang.hitch(this, '_onSelectStartSearchResult')));
        this.own(on(this.startSearch.inputNode, "focus", lang.hitch(this, '_onCleanStartError')));
        this.own(on(this.startSearch.inputNode, "blur", lang.hitch(this, function() {
          if (false === this._isSearchResultsShown && this.startSearch && this.startSearch.search) {
            this.startSearch.search();
          }
        })));

        this.endSearch = new Search({
          enableSuggestions: false,
          enableButtonMode: false,
          theme: 'arcgisSearch'
        });
        this.endSearch.placeAt(this.endSearchDom);
        this.own(on(this.endSearch, 'search-results', lang.hitch(this, '_onEndSearchResults')));
        this.own(on(this.endSearchResultsNode, 'li:click', lang.hitch(this, '_onSelectEndSearchResult')));
        this.own(on(this.endSearch.inputNode, "focus", lang.hitch(this, '_onCleanEndError')));
        this.own(on(this.endSearch.inputNode, "blur", lang.hitch(this, function() {
          if (false === this._isSearchResultsShown && this.endSearch && this.endSearch.search) {
            this.endSearch.search();
          }
        })));


        this.own(
          on(window.document, 'click', lang.hitch(this, function(e) {
            if (!html.isDescendant(e.target, this.searchResultsNode)) {
              this._hideResultMenu();
            }
          }))
        );

        //set values
        if (this._defaultLocations && this._defaultLocations.length && this._defaultLocations.length > 0) {
          for (var i = 0, len = this._defaultLocations.length; i < len; i++) {
            if (0 === i) {
              this.startSearch.set('value', this.defaultLocations[i]);
            } else if (1 === i) {
              this.endSearch.set('value', this.defaultLocations[i]);
            }
          }
        }
        this.inherited(arguments);
      },

      getValue: function() {
        var locations = [];
        var startValue = this.startSearch.get('value');
        locations.push(startValue);

        var endValue = this.endSearch.get('value');
        locations.push(endValue);
        return locations;
      },
      setValue: function(defaultLocations) {
        if (defaultLocations && defaultLocations.length > 0) {
          this._defaultLocations = defaultLocations;
        }
      },
      validate: function() {
        var isSearchLoading = false;
        query(".searchLoading", this.domNode).forEach(lang.hitch(this, function() {
          isSearchLoading = true;
          return;
        }));

        if (false === isSearchLoading &&
          !html.hasClass(this.startSearch, this._ERROR_CLASS) &&
          !html.hasClass(this.endSearch, this._ERROR_CLASS)) {
          return true;
        } else {
          return false;
        }
      },

      //source.singleLineFieldName is necessary, or can't get results
      //(online can't get results without singleLineFieldName)
      setSources: function(source) {
        if (source && source.url && source.singleLineFieldName) {
          var sources = {
            locator: new Locator(source.url || ""),
            outFields: ["*"],
            singleLineFieldName: source.singleLineFieldName
          };
          this.startSearch.set("sources", [sources]);
          this.endSearch.set("sources", [sources]);
        } else {
          this.startSearch.set("sources", []);
          this.endSearch.set("sources", []);
        }
      },

      _onCleanError: function(searchDijit) {
        html.removeClass(searchDijit, this._ERROR_CLASS);
      },
      _onCleanStartError: function() {
        this._onCleanError(this.startSearch);
      },
      _onCleanEndError: function() {
        this._onCleanError(this.endSearch);
      },

      _onStartSearchResults: function(evt) {
        this._onSearchResults(evt, {
          searchDijit: this.startSearch,
          searchResultsNode: this.startSearchResultsNode,
          searchError: this.startSearchError,
          results: "start"
        });
      },
      _onEndSearchResults: function(evt) {
        this._onSearchResults(evt, {
          searchDijit: this.endSearch,
          searchResultsNode: this.endSearchResultsNode,
          searchError: this.endSearchError,
          results: "end"
        });
      },
      _onSearchResults: function(evt, option) {
        var sources = option.searchDijit.get('sources');
        var activeSourceIndex = option.searchDijit.get('activeSourceIndex');
        var value = option.searchDijit.get('value');
        var htmlContent = "";
        var results = evt.results;
        var _activeSourceNumber = null;

        //allow blank value
        if ("" === value) {
          return;
        }

        if (results && evt.numResults > 0) {
          if ("start" === option.results) {
            this._startSearchResults = results;
          } else if ("end" === option.results) {
            this._endSearchResults = results;
          }
          //htmlContent += '<div class="show-all-results jimu-ellipsis" title="' +
          //  this.nls.showAll + '">' +
          // this.nls.showAllResults + '<strong >' + value + '</strong></div>';
          htmlContent += '<div class="searchMenu searchResultsMenu" role="menu">';
          for (var i in results) {
            if (results[i] && results[i].length) {
              var name = sources[parseInt(i, 10)].name;
              if (sources.length > 1 && activeSourceIndex === 'all') {
                htmlContent += '<div title="' + name + '" class="menuHeader">' + name + '</div>';
              }
              htmlContent += "<ul>";
              var partialMatch = value;
              var r = new RegExp("(" + partialMatch + ")", "gi");
              var maxResults = sources[i].maxResults || 5;

              for (var j = 0, len = results[i].length; j < len && j < maxResults; j++) {
                var text = esriLang.isDefined(results[i][j].name) ?
                  results[i][j].name : this.nls.untitled;
                htmlContent += '<li title="' + text + '" data-index="' + j +
                  '" data-source-index="' + i + '" role="menuitem" tabindex="0">' +
                  text.toString().replace(r, "<strong >$1</strong>") + '</li>';
              }
              htmlContent += '</url>';

              if (evt.numResults === 1) {
                _activeSourceNumber = i;
              }
            }
          }
          htmlContent += "</div>";
          option.searchResultsNode.innerHTML = htmlContent;

          this._showResultMenu(option.searchDijit, option.searchResultsNode);
          this._resetSelectorPosition(option.searchDijit, '.searchResultsMenu');
        } else {
          html.addClass(option.searchDijit, this._ERROR_CLASS);
          this._resetSelectorPosition(option.searchDijit, '.noResultsMenu');
        }
      },


      _onSelectStartSearchResult: function(evt) {
        this._onSelectSearchResult(evt, this.startSearch, this._startSearchResults);
      },
      _onSelectEndSearchResult: function(evt) {
        this._onSelectSearchResult(evt, this.endSearch, this._endSearchResults);
      },

      _onSelectSearchResult: function(evt, searchDijit, _results) {
        var target = evt.target;
        while (!(html.hasAttr(target, 'data-source-index') && html.getAttr(target, 'data-index'))) {
          target = target.parentNode;
        }
        var result = null;
        var dataSourceIndex = html.getAttr(target, 'data-source-index');
        var dataIndex = parseInt(html.getAttr(target, 'data-index'), 10);
        // var sources = this.searchDijit.get('sources');
        if (dataSourceIndex !== 'all') {
          dataSourceIndex = parseInt(dataSourceIndex, 10);
        }
        if (_results && _results[dataSourceIndex] &&
          _results[dataSourceIndex][dataIndex]) {
          result = _results[dataSourceIndex][dataIndex];
          searchDijit.select(result);

          if (result.name) {
            searchDijit.set("value", result.name);
          }
        }
      },

      _showResultMenu: function(searchDijit, searchResultsNode) {
        html.setStyle(searchResultsNode, 'display', 'block');
        //query('.show-all-results', searchResultsNode).style('display', 'none');
        query('.searchMenu', searchResultsNode).style('display', 'block');
        this._isSearchResultsShown = true;

        var groupNode = query('.searchInputGroup', searchDijit.domNode)[0];
        if (groupNode) {
          var groupBox = html.getMarginBox(groupNode);
          var style = {
            width: groupBox.w + 'px'
          };
          query('.searchMenu', searchResultsNode).style(style);
        }
      },
      _resetSelectorPosition: function(searchDijit, cls) {
        var layoutBox = html.getMarginBox(this.domNode.offsetParent);
        query(cls, this.domNode).forEach(lang.hitch(this, function(menu) {
          var menuPosition = html.position(menu);
          var dijitPosition = html.position(searchDijit.domNode);

          var fixH = (cls === ".noResultsMenu" ? 0 : dijitPosition.h);
          var turnUp = menuPosition.y + menuPosition.h > layoutBox.h;
          if (turnUp) {
            html.setStyle(
              menu,
              'top',
              -( menuPosition.h + fixH) - 4 + 'px'
            );
          }
        }));
      },
      _hideResultMenu: function() {
        query('.searchMenu', this.domNode).style('display', 'none');
        this._isSearchResultsShown = false;
      }
    });
  });