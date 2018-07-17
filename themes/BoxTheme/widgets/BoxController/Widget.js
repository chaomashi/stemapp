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
    'dojo/query',
    'dojo/on',
    'dojo/dom',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dojo/dom-style',
    'dojo/Deferred',
    'jimu/BaseWidget',
    'jimu/PoolControllerMixin',
    'jimu/utils'
  ],
  function(declare, array, lang, html, query, on,
    dom, domClass, domConstruct, domGeometry, domStyle, Deferred,
    BaseWidget, PoolControllerMixin, utils) {
    /* global jimuConfig */
    /* jshint scripturl:true */

    var clazz = declare([BaseWidget, PoolControllerMixin], {

      baseClass: 'box-controller',
      height: 50,

      // post create
      postCreate: function() {
        this.inherited(arguments);
        this.titleNode.innerHTML =
          utils.sanitizeHTML(this.appConfig.title ? this.appConfig.title : '');
        on(this.toggleNode, "click", lang.hitch(this, this._toggleBox));
        on(this.menuNode, "click", lang.hitch(this, this._closeMenu));
      },

      // startup
      startup: function() {
        this.inherited(arguments);
        this._createIconNodes();
        query(".jimu-widget-zoomslider").forEach(function(node){
          domClass.add(node, "jimu-main-background");
        });
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
        query(".jimu-widget-zoomslider").forEach(function(node){
          domClass.remove(node, "jimu-main-background");
        });
        this.inherited(arguments);
      },

      // on app config changed
      onAppConfigChanged: function(appConfig, reason, changedData) {
        switch (reason) {
          case 'attributeChange':
            this._onAttributeChange(appConfig, changedData);
            break;
          case 'layoutChange':
            if (this.openedId && this.openedId !== '') {
              setTimeout(lang.hitch(this, this._switchNodeToOpen), 1000, this.openedId);
            }
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
        return ids;
      },

      setOpenedIds: function(ids) {
        console.log("SETTING OPEN IDS", ids);
        this._closeMenu();
        if (ids.length > 0) {
          var id = ids[0];
          this.openedId = id;
          this._switchNodeToOpen(id);
        }
      },

      // get widget position
      _getWidgetPosition: function() {
        console.log(jimuConfig);
        var wPos = {
          bottom: 60,
          right: 10
        };
        var b = domStyle.get(this.domNode, "bottom");
        if (b !== "0px") {
          wPos = {
            bottom: 10,
            right: 10
          };
        }
        return wPos;
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

        var i, iconConfig, allIconConfigs = this.getAllConfigs();

        var containerStyle = {
          width: allIconConfigs.length * this.height + 'px'
        };
        html.setStyle(this.containerNode, containerStyle);

        var openAtStartNode;
        for (i = 0; i < allIconConfigs.length; i++) {
          iconConfig = allIconConfigs[i];
          var node = this._createIconNode(iconConfig);
          if (iconConfig.openAtStart) {
            openAtStartNode = node;
          }
        }

        this._createPages(allIconConfigs.length);

        //open the first openatstart widget
        if (openAtStartNode && !this.openAtStartWidget) {
          this._onIconClick(openAtStartNode);
          this.openAtStartWidget = openAtStartNode.config.name;
          this.openedId = openAtStartNode.config.id;
        }
      },

      // create icon node
      _createIconNode: function(iconConfig) {
        var node, iconUrl;
        iconUrl = iconConfig.icon;

        node = html.create('div', {
          'class': 'icon-node',
          title: iconConfig.label,
          settingId: iconConfig.id,
          style: {
            width: this.height + 'px',
            height: this.height + 'px'
          }
        }, this.containerNode);

        html.create('img', {
          src: iconUrl
        }, node);

        on(node, 'click', lang.hitch(this, function() {
          this._onIconClick(node);
        }));
        node.config = iconConfig;

        return node;
      },

      // create pages
      _createPages: function(iconCount) {
        var w = iconCount * this.height;
        this.pageCount = Math.ceil(w / 300);
        var list = dom.byId("pages");
        list.innerHTML = "";
        if (this.pageCount > 1) {
          for (var i = 0; i < this.pageCount; i++) {
            var id = "page" + i;
            var link = domConstruct.create("li", {
              id: id
            }, list);
            this.own(on(link, "click", lang.hitch(this, this._setPage, i)));
          }
          domClass.add("page0", "active");
        }
        this.page = 0;
      },

      // set page
      _setPage: function(num) {
        domClass.remove("page" + this.page, "active");
        this.page = num;
        domClass.add("page" + this.page, "active");
        var pos = 0 - (num * 300) + 'px';
        var prop = "left";
        if (window.isRTL) {
          prop = "right";
        }
        domStyle.set(this.containerNode, prop, pos);
      },

      // toggle box
      _toggleBox: function() {
        domClass.toggle(this.domNode, "box-controller-open");
      },

      switchNode: function(id) {
        var node = this._getIconNodeById(id);
        if (node) {
          this._closeMenu();
          this._onIconClick(node);
        }
      },

      // on icon click
      _onIconClick: function(node) {
        if (this.openedId) {
          this._lastOpenId = this.openedId;
        }
        if (this.openedId && this.openedId === node.config.id) {
          this.openedId = '';
          this._switchNodeToClose(this._lastOpenId);
          return;
        } else {
          if (this.openedId) {
            this._switchNodeToClose(this.openedId);
          }
          this.openedId = node.config.id;
          this._switchNodeToOpen(node.config.id);
        }
      },

      // switch node to open
      _switchNodeToOpen: function(id) {
        var node = this._getIconNodeById(id);
        domClass.add(node, "icon-node-active");
        this.labelNode.innerHTML = utils.sanitizeHTML(node.config.label ? node.config.label : '');
        domStyle.set(this.titleNode, "display", "none");
        domStyle.set(this.labelNode, "display", "block");
        this._showIconContent(node.config);
      },

      // switch node to close
      _switchNodeToClose: function(id) {
        var node = this._getIconNodeById(id);
        domClass.remove(this.domNode, "box-controller-open");
        domClass.remove(node, "icon-node-active");
        domStyle.set(this.toggleNode, "display", "none");
        domStyle.set(this.titleNode, "display", "block");
        domStyle.set(this.labelNode, "display", "none");
        if (node.config.inPanel === false) {
          this.widgetManager.closeWidget(id);
          this.openedId = '';
          var def = new Deferred();
          def.resolve();
          return def;
        } else {
          if (node.config.name === "Measurement" || node.config.name === "SmartEditor") {
            return this.panelManager.destroyPanel(id + '_panel');
          } else {
            return this.panelManager.closePanel(id + '_panel');
          }
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
          domClass.add(this.domNode, "box-controller-widget");
          var br = query(".esriControlsBR")[0];
          domStyle.set(br, "display", "none");
          this.widgetManager.loadWidget(iconConfig).then(lang.hitch(this, function(widget) {
            this.openedId = iconConfig.id;
            html.setStyle(widget.domNode, 'zIndex', 101);
            widget.setPosition(this._getWidgetPosition(), this.map.id);
            this.widgetManager.openWidget(widget);
            domStyle.set(widget.domNode, "display", null);
          }));
        } else {
          domStyle.set(this.toggleNode, "display", "block");
          domClass.add(this.domNode, "box-controller-open");
          this.panelManager.showPanel(iconConfig).then(lang.hitch(this, function(panel) {
            panel.setPosition(panel.position, this.panelNode);
            if (iconConfig.name === "Measurement") {
              setTimeout(lang.hitch(this, this._restartMeasurement), 1000);
            }
            this.openedId = iconConfig.id;
          }));
        }

      },

      // restart measurement
      _restartMeasurement: function() {
        array.forEach(this.widgetManager.loaded, function(w) {
          if (w.name === "Measurement") {
            w.startup();
          }
        });
      },

      // close menu
      _closeMenu: function() {
        if (this.openedId && this.openedId !== '') {
          this._switchNodeToClose(this.openedId);
          this.openedId = '';
        }
        var br = query(".esriControlsBR")[0];
        domStyle.set(br, "display", "block");
        domClass.remove(this.domNode, "box-controller-widget");
      }


    });
    return clazz;
  });
