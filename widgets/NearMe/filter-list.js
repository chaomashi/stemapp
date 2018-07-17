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
  'dojo/text!./filter-list.html',
  'dojo/_base/array',
  'dojo/_base/html',
  'dojo/_base/lang',
  'dojo/query',
  'dojo/on',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/dom-class',
  'jimu/utils',
  'jimu/BaseWidget',
  'jimu/filterUtils',
  'jimu/dijit/FilterParameters',
  'jimu/LayerInfos/LayerInfos',
  'jimu/FilterManager',
  'esri/request',
  'dojo/NodeList',
  'dojo/NodeList-dom'
],
  function (declare, FilterListTemplate, array, html, lang, query, on, _WidgetsInTemplateMixin, domClass,
    jimuUtils, BaseWidget, FilterUtils, FilterParameters, LayerInfos, FilterManager,
    esriRequest) {

    return declare([BaseWidget, _WidgetsInTemplateMixin], {
      name: 'NearMeFilter',
      templateString: FilterListTemplate,
      baseClass: 'jimu-widget-nearme-filter',
      //style="display:${hasValue}"

      _itemTemplate: '<li class="filter-item" data-index="${index}">' +
        '<div class="header jimu-leading-padding1" >' +
        '<span class="arrow jimu-float-leading jimu-trailing-margin05" title="${toggleTip}" ></span>' +
        '<span class="icon">' +
        '<img src="${icon}" />' +
        '</span>' +
        '<span class="item-title">${title}</span>' +
        '<span class="cando jimu-float-trailing jimu-leading-margin1 jimu-trailing-margin1 "></span>' +
        '<span class="doing jimu-float-trailing jimu-leading-margin1 jimu-trailing-margin1 "></span>' +
        '<span class="done jimu-float-trailing jimu-leading-margin1 jimu-trailing-margin1 "></span>' +
        '</div>' +
        '<div class="body">' +
        '<div class="parameters"></div>' +
        '<span class="jimu-btn apply jimu-float-trailing jimu-trailing-margin25">${apply}</span>' +
        '</div>' +
        '</li>',

      _layerTitleTemplate: '<div class="esriCTGroupFilterLayerName">${layerTitle}</div>',
      _store: null,
      totalAppliedFilters: 0,

      postCreate: function () {
        this.inherited(arguments);
        this.totalAppliedFilters = 0;
        this._updateClearAllButtonState();
        //handle clear all filters click
        this.own(on(this.clearAllButton, "click", lang.hitch(this, this._clearAllFilters)));
        this._store = {};
        this.layerInfosObj = LayerInfos.getInstanceSync();
        this.filterUtils = new FilterUtils();
        this.filterManager = FilterManager.getInstance();
        var filters = this.config.filters;
        var groupsByLayer = {};
        var groupIds = [];
        if (this.config.groupFiltersByLayer) {
          array.forEach(filters, function (filterObj, idx) {
            if (!groupsByLayer[filterObj.layerId]) {
              groupsByLayer[filterObj.layerId] = [];
              groupIds.push(filterObj.layerId);
            }
            filterObj.index = idx;
            groupsByLayer[filterObj.layerId].push(filterObj);
          });
          array.forEach(groupIds, lang.hitch(this, function (layerId) {
            var layerInfo = this.layerInfosObj.getLayerInfoById(layerId);
            var parse = {
              layerTitle: layerInfo.layerObject.name
            };
            var template = lang.replace(this._layerTitleTemplate, parse, /\$\{([^\}]+)\}/ig);
            var node = html.toDom(template);
            html.place(node, this.filterList);
            for (var i = 0; i < groupsByLayer[layerId].length; i++){
              this._addFilterInList(groupsByLayer[layerId][i], groupsByLayer[layerId][i].index);
            }
          }));


        } else {
          array.forEach(filters, lang.hitch(this, function (filterObj, idx) {
            this._addFilterInList(filterObj, idx);
          }));
        }

      },

      _addFilterInList: function (filterObj, idx) {
        var isAskForValue = this.filterUtils.isAskForValues(filterObj.filter);

        var parse = {
          icon: filterObj.icon ? jimuUtils.processUrlInWidgetConfig(filterObj.icon, this.folderUrl) :
            this.folderUrl + '/css/images/default_task_icon.png',
          index: idx,
          title: filterObj.name,
          toggleTip: this.nls.toggleTip,
          hasValue: isAskForValue ?
            (window.appInfo.isRunInMobile ? 'block !important' : '') : 'none',
          isAskForValue: isAskForValue,
          apply: lang.getObject('jimuNls.common.apply', false, window) || 'Apply'
        };

        if (!this._store[filterObj.layerId]) {
          this._store[filterObj.layerId] = {
            mapFilterControls: {}
            // filter_item_idx
          }; // filter_item_idx, mapFilterControls
        }

        var template = lang.replace(this._itemTemplate, parse, /\$\{([^\}]+)\}/ig);
        var node = html.toDom(template);
        html.place(node, this.filterList);
        this.own(
          query('.header', node)
            .on('click', lang.hitch(this, 'enableFilter', node, filterObj, parse))
        );
        if (isAskForValue) {
          html.addClass(node, 'has-ask-for-value');
        } else {
          html.addClass(node, 'not-has-ask-for-value');
        }
        if (parse.hasValue !== 'none') {
          // add parameters
          this.own(
            query('.arrow', node)
              .on('click', lang.hitch(this, 'configFilter', node, filterObj))
          );
          this.own(
            query('.apply', node)
              .on('click', lang.hitch(this, 'applyFilterValues', node, filterObj))
          );
          html.addClass(node, 'requesting');
          this.configFilter(node, filterObj, null, lang.hitch(this, function () {
            if (this.config.collapse) {
              html.removeClass(node, 'config-parameters');
            }
          }));
        }
      },

      startup: function () {
        this.inherited(arguments);
        this.resize();
      },

      _getPriorityOfMapFilter: function (layerId) {
        var mapFilterControls = lang.getObject(layerId + '.mapFilterControls', false, this._store);
        var count = 0;
        for (var p in mapFilterControls) {
          var control = mapFilterControls[p];
          if (control.priority > count) {
            count = control.priority;
          }
        }

        return count;
      },

      _getMapFilterControl: function (layerId) {
        var mapFilterControls = lang.getObject(layerId + '.mapFilterControls', false, this._store);
        var count = 0;
        var enable = true;
        for (var p in mapFilterControls) {
          var control = mapFilterControls[p];
          if (control.priority > count) {
            enable = !!control.enable;
          }
        }

        return enable;
      },

      _setItemFilter: function (layerId, idx, expr, enableMapFilter) {
        this._store[layerId]['filter_item_' + idx] = expr;

        var priority = this._getPriorityOfMapFilter(layerId);
        lang.setObject(layerId + '.mapFilterControls.filter_item_' + idx, {
          enable: enableMapFilter,
          priority: priority + 1
        }, this._store);
      },

      _removeItemFilter: function (layerId, idx) {
        delete this._store[layerId]['filter_item_' + idx];
        delete this._store[layerId].mapFilterControls['filter_item_' + idx];
      },

      _getExpr: function (layerId) {
        if (!this._store[layerId]) {
          return null;
        }

        var parts = [];
        var exprs = this._store[layerId];

        for (var p in exprs) {
          var expr = exprs[p];
          if (expr && p !== 'mapFilterControls') {
            parts.push('(' + expr + ')');
          }
        }

        return parts.join(' AND ');
      },

      _bindMapUpdateEvents: function (node, needApply) {
        on.once(this.map, 'update-start', lang.hitch(this, function () {
          html.addClass(node, 'applying');
          html.removeClass(node, 'applied');
        }));
        on.once(this.map, 'update-end', lang.hitch(this, function () {
          if (!needApply) {
            html.removeClass(node, 'applied');
          } else {
            html.addClass(node, 'applied');
          }
          html.removeClass(node, 'applying');
        }));
      },

      enableFilter: function (node, filterObj, parse) {
        if (html.hasClass(node, 'config-parameters') &&
          !(node.filterParams && node.filterParams.getFilterExpr())) {
          return;
        }
        if (parse.isAskForValue && !(node.filterParams && node.filterParams.getFilterExpr())) {
          this.configFilter(node, filterObj);
          return;
        }
        var layerId = filterObj.layerId;
        var idx = html.getAttr(node, 'data-index');
        var layerFilterExpr = null;

        var layerInfo = this.layerInfosObj.getLayerInfoById(layerId);
        var applied = html.hasClass(node, 'applied');
        if (layerInfo.isShowInMap() && layerInfo.isInScale()) {
          this._bindMapUpdateEvents(node, !applied ? true : false);
        } else {
          if (applied) {
            html.removeClass(node, 'applied');
          } else {
            html.addClass(node, 'applied');
          }
        }

        var enableMapFilter = null;
        if (!applied) {
          this._setItemFilter(layerId, idx, node.filterParams ?
            node.filterParams.getFilterExpr() : filterObj.filter.expr, filterObj.enableMapFilter);
          layerFilterExpr = this._getExpr(layerId);
          enableMapFilter = this._getMapFilterControl(layerId);
          this.filterManager.applyWidgetFilter(layerId, this.id, layerFilterExpr, enableMapFilter);
          this.totalAppliedFilters++;
        } else {
          this._removeItemFilter(layerId, idx);
          layerFilterExpr = this._getExpr(layerId);
          enableMapFilter = this._getMapFilterControl(layerId);
          this.filterManager.applyWidgetFilter(layerId, this.id, layerFilterExpr, enableMapFilter);
          this.totalAppliedFilters--;
        }
        //once filters are enable/disabled update the flag
        this.filtersUpdated = true;
        this._updateClearAllButtonState();
      },

      configFilter: function (node, filterObj, evt, cb) {
        if (!node.filterParams) {
          esriRequest({
            url: filterObj.url,
            content: {
              f: 'json'
            },
            handleAs: 'json',
            callbackPrams: 'callback'
          }).then(lang.hitch(this, function (definition) {
            html.addClass(node, 'config-parameters');
            html.removeClass(node, 'requesting');
            var pamDiv = query('.parameters', node)[0];
            node.handles = [];
            node.filterParams = new FilterParameters();
            var partsObj = lang.clone(filterObj.filter);

            var layerId = null;
            if (filterObj.enableMapFilter) {
              //if enableMapFilter is true, pass layerId to filterParams,
              //so filterParams can get the layer expr defined in webmap
              layerId = filterObj.layerId;
            }

            node.filterParams.build(filterObj.url, definition, partsObj, layerId);

            this.own(on(node.filterParams, 'change', lang.hitch(this, function (expr) {
              if (expr) {
                query('.apply', node).removeClass('disable-apply');
                node.expr = expr;
              } else {
                delete node.expr;
                query('.apply', node).addClass('disable-apply');
              }
            })));

            node.expr = node.filterParams.getFilterExpr();
            if (node.expr) {
              query('.apply', node).removeClass('disable-apply');
            } else {
              delete node.expr;
              query('.apply', node).addClass('disable-apply');
            }
            node.filterParams.placeAt(pamDiv);
            this._changeItemTitleWidth(node, 60);
            if (cb) {
              cb();
            }
          }));
        } else {
          if (!html.hasClass(node, 'config-parameters')) {
            html.addClass(node, 'config-parameters');
            this._changeItemTitleWidth(node, 60);
          } else {
            html.removeClass(node, 'config-parameters');
            this._changeItemTitleWidth(node, window.appInfo.isRunInMobile ? 60 : 45);
          }
          if (cb) {
            cb();
          }
        }

        if (evt && evt.target) {
          evt.stopPropagation();
        }
      },

      applyFilterValues: function (node, filterObj, evt) {
        var expr = node.filterParams && (node.expr || node.filterParams.getFilterExpr());
        if (expr) {
          node.expr = expr;
          // getFilterExpr
          var layerId = filterObj.layerId;
          var idx = html.getAttr(node, 'data-index');
          var layerInfo = this.layerInfosObj.getLayerInfoById(layerId);
          if (layerInfo.isShowInMap() && layerInfo.isInScale()) {
            this._bindMapUpdateEvents(node, true);
          } else {
            html.addClass(node, 'applied');
          }
          this._setItemFilter(layerId, idx, node.expr, filterObj.enableMapFilter);
          var layerFilterExpr = this._getExpr(layerId);
          var enableMapFilter = this._getMapFilterControl(layerId);
          this.filterManager.applyWidgetFilter(layerId, this.id, layerFilterExpr, enableMapFilter);
          //once filters are applied update the flag
          this.filtersUpdated = true;
          this.totalAppliedFilters++;
          this._updateClearAllButtonState();
        }

        evt.stopPropagation();
      },

      resize: function () {
        this.inherited(arguments);
        this._changeItemTitleWidth(this.domNode, window.appInfo.isRunInMobile ? 60 : 45);
      },

      _changeItemTitleWidth: function (node, tolerace) {
        var itemHeader = query('.header', node)[0];
        if (itemHeader) {
          var contentBox = html.getContentBox(itemHeader);
          var maxWidth = contentBox.w - tolerace;// width of header minus others width
          if (maxWidth > 0) {
            query('.header .item-title', node).style({
              'maxWidth': maxWidth + 'px'
            });
          }
        }
      },

      destroy: function () {
        query('.filter-item', this.filterList).forEach(function (node) {
          delete node.filterParams;
          delete node.expr;
        });
        if (this._store) {
          for (var p in this._store) {
            if (p) {
              this.filterManager.applyWidgetFilter(p, this.id, "", null);
            }
          }
        }
        this.inherited(arguments);
      },

      filterListShown: function () {
        this.filtersUpdated = false;
      },

      /**
       * Based on number of filters applied
       */
      _updateClearAllButtonState: function () {
        if (this.totalAppliedFilters > 0) {
          domClass.add(this.clearAllButton, "esriCTClearAllFilterActive");
        } else {
          domClass.remove(this.clearAllButton, "esriCTClearAllFilterActive");
        }
      },

      /**
       * Clears all applied filters
       */
      _clearAllFilters: function () {
        if (domClass.contains(this.clearAllButton, "esriCTClearAllFilterActive")) {
          //get all applied filters list
          if (this.filterList) {
            var appliedList = query(".applied", this.filterList);
            array.forEach(appliedList, function (eachFilter) {
              //for each applied filter and get the header node and call click to remove filter
              var headerNode = query(".header", eachFilter);
              if (headerNode && headerNode.length > 0) {
                headerNode[0].click();
              }
            });
            //once all filters are removed update the filter button state
            this._updateClearAllButtonState();
          }
        }
      }
    });
  });