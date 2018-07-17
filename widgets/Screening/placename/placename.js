///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  'dojo/_base/declare',
  'dojo/dom-construct',
  'dojo/query',
  'dojo/text!./placename.html',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/_base/lang',
  'dojo/Evented',
  'jimu/BaseWidget',
  '../search',
  'dojo/dom-geometry'
], function (
  declare,
  domConstruct,
  query,
  template,
  _WidgetsInTemplateMixin,
  lang,
  Evented,
  BaseWidget,
  SearchInstance,
  domGeom
) {
  return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
    // Set base class for custom placename widget
    baseClass: 'jimu-widget-screening-placename',
    _hasMultipleSourcesInSearch : true,

    // Set base template to templateString parameter
    templateString: template,

    _windowResizeTimer: null,

    constructor: function (options) {
      this._windowResizeTimer = null;
      lang.mixin(this, options);
    },

    postCreate: function () {
      this._createSearchInstance();
    },

    /**
     * This function initialize the search widget
     * @memberOf Screening/placename/placename
     */
    _createSearchInstance: function () {
      var searchOptions;
      //set search options
      searchOptions = {
        addLayersFromMap: false,
        autoNavigate: false,
        autoComplete: true,
        minCharacters: 0,
        maxLocations: 5,
        searchDelay: 100,
        enableHighlight: false
      };
      // create an instance of search widget
      this._searchInstance = new SearchInstance({
        searchOptions: searchOptions,
        config: this.config,
        appConfig: this.appConfig,
        nls: this.nls,
        map: this.map
      }, domConstruct.create("div", {}, this.searchWidgetContainer));
      //handle search widget events
      this.own(this._searchInstance.on("select-result", lang.hitch(this, function (evt) {
        this.emit("onSearchComplete", evt);
      })));
      this.own(this._searchInstance.on("clear-search", lang.hitch(this, this._clearResults)));
      this.own(this._searchInstance.on("search-loaded", lang.hitch(this, function () {
        setTimeout(lang.hitch(this, function () {
          //get search container node to resize the search control
          this._searchContainerNodeElement = query(
            ".arcgisSearch .searchGroup .searchInput", this.domNode
          )[0];
          //set _hasMultipleSourcesInSearch to false if multiple sources are not present
          if (this._searchInstance.search.sources.length < 2) {
            this._hasMultipleSourcesInSearch = false;
          }
          this.onWindowResize();
        }), 1000);
      })));
      // once widget is created call its startup method
      this._searchInstance.startup();
    },

    /**
     * This function used to clear results from graphicsLayer, result panel and directions
     * @memberOf Screening/placename/placename
     */
    _clearResults: function (showInfoWindow) {
      if (!showInfoWindow) {
        this.map.infoWindow.hide();
      }
    },

    /**
      * Clear search box text
      * @memberOf Screening/placename/placename
      */
    clearSearchText: function () {
      if (this._searchInstance && this._searchInstance.search) {
        this._searchInstance.search.clear();
      }
    },

    /**
     * Window resize handler
     * @memberOf Screening/placename/placename
     */
    onWindowResize: function () {
      if (this._windowResizeTimer) {
        clearTimeout(this._windowResizeTimer);
      }
      this._windowResizeTimer = setTimeout(lang.hitch(this, this._resetComponents), 500);
    },

    /**
     * Resets the components of the widgets according to updated size
     * @memberOf Screening/placename/placename
     */
    _resetComponents: function () {
      var containerGeom, calculatedWidth, searchGroup;
      //get search group to override max width overridden by some themes
      searchGroup = query(
        ".arcgisSearch .searchGroup", this.domNode
      )[0];
      if (!this._searchContainerNodeElement) {
        this._searchContainerNodeElement = query(
          ".arcgisSearch .searchGroup .searchInput", this.domNode
        )[0];
      }
      //reset the width of search control to fit in available panel width
      if (this.widgetMainContainer && this._searchContainerNodeElement) {
        containerGeom = domGeom.position(this.widgetMainContainer);
        if (containerGeom && containerGeom.w) {
          // detect if div has a scroll & decrease more space accordingly
          calculatedWidth = (containerGeom.w - 162);
          //if search is not having multiple sources it will not display arrow
          if (!this._hasMultipleSourcesInSearch) {
            calculatedWidth += 32;
          }
          if (calculatedWidth > 0) {
            //As some of the themes have overridden width of search widget,
            //and have applied important priority to it,
            //we need to use style.setProperty method instead of dojo domStyle.
            this._searchContainerNodeElement.style.setProperty('width',
              calculatedWidth + "px", 'important');
            if (searchGroup) {
              searchGroup.style.setProperty('max-width', "100%", 'important');
            }
          }
        }
      }
    },

    /**
     * Reset searched text of placename widget
     * @memberOf Screening/placename/placename
     */
    resetPlaceNameWidgetValues: function () {
      this.clearSearchText();
    }
  });
});