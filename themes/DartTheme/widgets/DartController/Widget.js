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
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/aspect',
    'dojo/query',
    'dojo/on',
    'dojo/dom-attr',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dojo/dom-style',
    'jimu/BaseWidget',
    'jimu/PoolControllerMixin',
    'jimu/utils'
  ],
  function(declare, array, lang, html, aspect, query, on,
    domAttr, domClass, domConstruct, domGeometry, domStyle,
    BaseWidget, PoolControllerMixin, utils) {
    /* jshint scripturl:true */

    var clazz = declare([BaseWidget, PoolControllerMixin], {

      baseClass: 'dart-controller dart-bgcolor jimu-main-background shadow',
      height: 54,
      minimized: false,
      collapsed: false,
      iconCount: 0,
      wPos: {
        bottom: 78,
        right: 0
      },
      panelCount: 0,
      openedId: '',
      openedIds: [],

      // post create
      postCreate: function() {
        this.inherited(arguments);
        this.titleNode.innerHTML =
          utils.sanitizeHTML(this.appConfig.title ? this.appConfig.title : '');
        on(this.toggleNode, "click", lang.hitch(this, this._toggleController));
        on(this.collapseNode, "click", lang.hitch(this, this._collapseController));
        this.own(on(this.widgetManager, 'widget-created',
          lang.hitch(this, this._onWidgetCreation)));
        on(window, "resize", lang.hitch(this, this._resizeWindow));
      },

      // startup
      startup: function() {
        this.inherited(arguments);
        this._createIconNodes();
      },

      // on action
      onAction: function(action, data) {
        /*jshint unused: false*/
        if (action === 'highLight' && data) {
          var node = query('div[settingid="' + data.widgetId + '"]', this.domNode)[0];
          this._highLight(node);
        }
        if (action === 'removeHighLight') {
          this._removeHighLight();
        }
      },

      // destroy
      destroy: function() {
        if (this.timeoutHandle) {
          clearTimeout(this.timeoutHandle);
          this.timeoutHandle = null;
        }
        this.inherited(arguments);
      },

      // on app config changed
      onAppConfigChanged: function(appConfig, reason, changedData) {
        switch (reason) {
          case 'attributeChange':
            this._onAttributeChange(appConfig, changedData);
            break;
          case 'layoutChange':
            break;
          default:
            return;
        }
      },

      getOpenedIds: function() {
        this.inherited(arguments);
        var ids = [];
        if (this.openedId && this.openedId !== '') {
          ids.push(this.openedId);
        }
        array.forEach(this.openedIds, function(id) {
          ids.push(id);
        });
        return ids;
      },

      setOpenedIds: function(ids) {
        var interval = 0;
        for (var i = 0; i < ids.length; i++) {
          interval += 600;
          setTimeout(lang.hitch(this, this._switchNodeToOpen), interval, ids[i]);
        }
      },

      _onWidgetCreation: function(widget) {
        if (widget.name === 'Search') {
          this._resizeWindow();
        }
      },

      // resize window
      _resizeWindow: function() {
        if (this.resizeTimer) {
          clearTimeout(this.resizeTimer);
          this.resizeTimer = null;
        }
        this.resizeTimer = setTimeout(lang.hitch(this, this._resizeController), 600);
      },

      // resize controller
      _resizeController: function() {
        if (!this.minimized) {
          try {
            var box = domGeometry.getContentBox(this.domNode);
            var boxTools = domGeometry.getContentBox(this.toolsNode);
            var balance = (box.w - boxTools.w - 35);
            var count = Math.floor(balance / this.height);
            var w = this.height * count;
            domStyle.set(this.barNode, "width", w + 'px');
            domStyle.set(this.pagesNode, "width", w + 'px');
            this._createPages();
            domClass.remove(this.toolsNode, "dart-controller-tools-anim");
          } catch (ex) {
            console.log(ex);
          }
        }
      },

      // toggle controller
      _toggleController: function() {
        if (this.minimized) {
          this._maximizeController();
        } else {
          this._minimizeController();
        }
      },

      // maximize controller
      _maximizeController: function() {
        this.minimized = false;
        domClass.remove(this.domNode, "dart-controller-minimized");
        if (this.openedId) {
          var node = this._getIconNodeById(this.openedId);
          if (node.config.inPanel === false) {
            this._switchNodeToClose(this.openedId);
          }
        }
        setTimeout(lang.hitch(this, this._resizeController), 600);
      },

      // minimize controller
      _minimizeController: function() {
        this.minimized = true;
        domClass.add(this.domNode, "dart-controller-minimized");
        if (this.collapsed) {
          this._expand();
        }
      },

      // collapse controller
      _collapseController: function() {
        if (this.collapsed) {
          this._expand();
        } else {
          this._collapse();
        }
      },

      // collapse
      _collapse: function() {
        this.collapsed = true;
        domClass.add(this.toolsNode, "dart-controller-tools-anim");
        domClass.add(this.toolsNode, "dart-controller-tools-collapsed");
        setTimeout(lang.hitch(this, this._resizeController), 600);
      },

      // expand
      _expand: function() {
        this.collapsed = false;
        domClass.add(this.toolsNode, "dart-controller-tools-anim");
        domClass.remove(this.toolsNode, "dart-controller-tools-collapsed");
        setTimeout(lang.hitch(this, this._resizeController), 600);
      },

      // highlight
      _highLight: function(node) {
        if (this.hlDiv) {
          this._removeHighLight();
        }
        if (!node) {
          return;
        }
        var position = domGeometry.getMarginBox(node);
        var hlStyle = {
          position: 'absolute',
          left: (position.l) + 'px',
          top: (position.t) + 'px',
          width: (position.w) + 'px',
          height: (position.h) + 'px'
        };
        this.hlDiv = domConstruct.create('div', {
          "style": hlStyle,
          "class": 'icon-highlight'
        }, node, 'before');
      },

      // remove highlight
      _removeHighLight: function() {
        if (this.hlDiv) {
          domConstruct.destroy(this.hlDiv);
          this.hlDiv = null;
        }
      },

      // on attribute change
      _onAttributeChange: function(appConfig, changedData) {
        /*jshint unused: false*/
        if (changedData.title !== undefined && changedData.title !== this.appConfig.title) {
          this.titleNode.innerHTML = utils.sanitizeHTML(changedData.title ? changedData.title : '');
        }
      },

      // create icon nodes
      _createIconNodes: function() {
        html.empty(this.containerNode);
        this.openedIds = [];
        var i, iconConfig, name, allIconConfigs = this.getAllConfigs();
        var defaultSearch = true;
        var openAtStartNode;
        this.iconCount = 0;
        for (i = 0; i < allIconConfigs.length; i++) {
          iconConfig = allIconConfigs[i];
          name = iconConfig.name;
          if (name === "ZoomSlider" || name === "HomeButton" || name === "MyLocation" || name === "ExtentNavigate") {
            this._createChildWidget(iconConfig);
          } else if (name === "Search" && defaultSearch) {
            defaultSearch = false;
            this._createChildWidget(iconConfig);
          } else {
            this.iconCount += 1;
            var node = this._createIconNode(iconConfig);
            if (iconConfig.openAtStart) {
              openAtStartNode = node;
            }
          }
        }

        var containerStyle = {
          width: this.iconCount * this.height + 'px'
        };
        html.setStyle(this.containerNode, containerStyle);

        //open the first openatstart widget
        if (openAtStartNode && !this.openAtStartWidget) {
          this._onIconClick(openAtStartNode);
          this.openAtStartWidget = openAtStartNode.config.name;
        }
      },

      // create pages
      _createPages: function() {
        var visW = domGeometry.getContentBox(this.barNode).w;
        if (visW > 0) {
          var w = this.iconCount * this.height;
          var pageCount = Math.ceil(w / visW);
          var list = this.pageListNode;
          list.innerHTML = "";
          if (pageCount > 1) {
            for (var i = 0; i < pageCount; i++) {
              var id = "page" + i;
              var link = domConstruct.create("li", {
                id: id
              }, list);
              this.own(on(link, "click", lang.hitch(this, this._setPage, i)));
            }
            if (!this.page || this.page >= pageCount) {
              this.page = 0;
            }
            this._setPage(this.page);
          } else {
            domStyle.set(this.containerNode, "left", "0px");
          }
        }
      },

      // set page
      _setPage: function(num) {
        var visW = domGeometry.getContentBox(this.barNode).w;
        domClass.remove("page" + this.page, "active");
        this.page = num;
        domClass.add("page" + this.page, "active");
        var pos = 0 - (num * visW) + 'px';
        var prop = "left";
        if (window.isRTL) {
          prop = "right";
        }
        domStyle.set(this.containerNode, prop, pos);
      },

      // create child widget
      _createChildWidget: function(iconConfig) {
        this.widgetManager.loadWidget(iconConfig).then(lang.hitch(this, function(widget) {
          var name = iconConfig.name;
          switch (name) {
            case "ZoomSlider":
              domConstruct.place(widget.domNode, this.navNode);
              domAttr.set(this.navNode, "settingId", iconConfig.id);
              domStyle.set(this.navNode, "display", "block");
              break;
            case "HomeButton":
              domConstruct.place(widget.domNode, this.homeNode);
              domAttr.set(this.homeNode, "settingId", iconConfig.id);
              domStyle.set("homeNode", "display", "block");
              break;
            case "MyLocation":
              domConstruct.place(widget.domNode, this.locateNode);
              domAttr.set(this.locateNode, "settingId", iconConfig.id);
              domStyle.set("locateNode", "display", "block");
              break;
            case "ExtentNavigate":
              widget.setOrientation(false);
              domConstruct.place(widget.domNode, this.extentNavigateNode);
              domAttr.set(this.extentNavigateNode, "settingId", iconConfig.id);
              domStyle.set(this.extentNavigateDiv, "display", "block");
              break;
            case "Search":
              domConstruct.place(widget.domNode, this.searchNode);
              domAttr.set(this.searchNode, "settingId", iconConfig.id);
              domStyle.set("searchNode", "display", "block");
              break;

          }
          this.widgetManager.openWidget(widget);
        }));
      },

      // create icon node
      _createIconNode: function(iconConfig) {
        var node, iconUrl;
        iconUrl = iconConfig.icon;

        node = html.create('div', {
          'class': 'icon-node',
          title: iconConfig.label,
          settingId: iconConfig.id
        }, this.containerNode);

        html.create('img', {
          src: iconUrl
        }, node);

        node.config = iconConfig;

        on(node, 'click', lang.hitch(this, this._onIconClick, node));

        return node;
      },

      // on icon click
      _onIconClick: function(node) {
        var id = node.config.id;
        if (this.openedIds.indexOf(id) !== -1) {
          this._switchNodeToClose(id);
        } else {
          this._switchNodeToOpen(id);
        }
      },

      // switch node to open
      _switchNodeToOpen: function(id) {
        var node = this._getIconNodeById(id);
        if (!node) {
          return;
        }
        if (node.config.widgets && node.config.widgets.length > 1) {
          var interval = 0;
          array.forEach(node.config.widgets, lang.hitch(this, function(w) {
            setTimeout(lang.hitch(this, this._showIconContent), interval, w);
            interval += 600;
          }));
        } else {
          this._showIconContent(node.config);
          if (node.config.inPanel) {
            domClass.add(node, "icon-node-active");
          }
        }
      },

      // switch node to close
      _switchNodeToClose: function(id) {
        var node = this._getIconNodeById(id);
        if (!node) {
          return;
        }
        if (node.config.inPanel === false) {
          this.openedId = '';
          this.widgetManager.closeWidget(id);
        } else {
          var idx = this.openedIds.indexOf(id);
          if (idx !== -1) {
            this.openedIds.splice(idx, 1);
          }
          this._updatePanelCount(-1);
          domClass.remove(node, "icon-node-active");
          this.panelManager.closePanel(id + '_panel');
        }
      },

      // get icon node by id
      _getIconNodeById: function(id) {
        var node = query('.icon-node[settingId="' + id + '"]', this.domNode);
        if (node.length === 0) {
          return;
        }
        return node[0];
      },

      // show icon content
      _showIconContent: function(iconConfig) {
        if (iconConfig.inPanel === false) {
          var name = iconConfig.name;
          this.widgetManager.loadWidget(iconConfig).then(lang.hitch(this, function(widget) {
            this.openedId = iconConfig.id;
            html.setStyle(widget.domNode, 'zIndex', 0);
            if (name !== "OverviewMap") {
              widget.setPosition(this.wPos, this.map.id);
            }
            this.widgetManager.openWidget(widget);
            domStyle.set(widget.domNode, "display", null);
            this._minimizeController();
          }));
        } else {
          var pid = iconConfig.id + '_panel';
          var panel = this.panelManager.getPanelById(pid);
          var pos = this._getNextPosition();
          if (panel) {
            pos = panel.position;
          }
          iconConfig.panel.position = pos;
          this.openedIds.push(iconConfig.id);
          this.panelManager.showPanel(iconConfig).then(lang.hitch(this, function(panel) {
            aspect.after(panel, 'onClose', lang.hitch(this, function() {
              this._switchNodeToClose(iconConfig.id);
            }));
          }));
        }
      },

      // get next position
      _getNextPosition: function() {
        this._updatePanelCount(1);
        var offset = (this.panelCount - 1) * 10 + 10;
        var pos = {
          top: offset,
          left: offset,
          width: 320,
          height: 450,
          relativeTo: 'map'
        };
        return pos;
      },

      // update panel count
      _updatePanelCount: function(value) {
        this.panelCount += value;
        if (this.panelCount < 0) {
          this.panelCount = 0;
        }
      }


    });
    return clazz;
  });
