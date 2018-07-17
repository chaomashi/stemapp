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

define(['dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom-style',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dojo/_base/fx',
    'dojo/dnd/move',
    'dojox/layout/ResizeHandle',
    'jimu/utils',
    'jimu/BaseWidgetPanel',
    'dijit/_TemplatedMixin',
    'dojo/text!./Panel.html'
  ],
  function(declare, lang, on, domStyle, domClass, domConstruct, domGeometry, baseFx, Move,
    ResizeHandle, utils, BaseWidgetPanel, _TemplatedMixin, template) {
    /* global jimuConfig*/
    var borderRadius = '4px',
      DEFAULT_WIDTH = 320,
      DEFAULT_HEIGHT = 450;

    return declare([BaseWidgetPanel, _TemplatedMixin], {
      baseClass: 'dart-panel dart-bgcolor jimu-main-background shadow',
      templateString: template,
      titleHeight: 60,
      normalPosition: null,
      lastWindowState: null,
      openAnimation: 'fadeIn',
      closeAnimation: 'fadeOut',
      animationDuration: 400,
      moving: false,

      postCreate: function() {
        this.inherited(arguments);
        this._makeOriginalBox();
      },

      startup: function() {
        this.inherited(arguments);
        this.panelManager.normalizePanel(this);
      },

      _makeOriginalBox: function() {
        this._originalBox = {
          w: this.position.width || DEFAULT_WIDTH,
          h: this.position.height || DEFAULT_HEIGHT,
          l: this.position.left || 0,
          t: this.position.top || 0
        };
      },

      makeMoveable: function(handleNode, width, tolerance) {
        this.disableMoveable();
        var containerBox = domGeometry.getMarginBox(jimuConfig.layoutId);
        containerBox.l = containerBox.l - width + tolerance;
        containerBox.w = containerBox.w + 2 * (width - tolerance);

        this.moveable = new Move.boxConstrainedMoveable(this.domNode, {
          box: containerBox,
          handle: handleNode || this.handleNode,
          within: true
        });
        this.own(on(this.moveable, 'MoveStart', lang.hitch(this, this.onMoveStart)));
        this.own(on(this.moveable, 'Moving', lang.hitch(this, this.onMoving)));
        this.own(on(this.moveable, 'MoveStop', lang.hitch(this, this.onMoveStop)));
      },

      disableMoveable: function() {
        if (this.moveable) {
          this.moveable.destroy();
          this.moveable = null;
        }
      },

      makeResizable: function() {
        this.disableResizable();
        this.resizeHandle = new ResizeHandle({
          targetId: this,
          minWidth: this._originalBox.w,
          minHeight: this._originalBox.h,
          activeResize: false
        }).placeAt(this.domNode);
        this.resizeHandle.startup();
      },

      disableResizable: function() {
        if (this.resizeHandle) {
          this.resizeHandle.destroy();
          this.resizeHandle = null;
        }
      },

      onMoveStart: function(mover) {
        if (window.isRTL) {
          var containerBox = domGeometry.getMarginBox(jimuConfig.layoutId),
            domBox = domGeometry.getMarginBox(this.domNode),
            rightPx = domStyle.get(mover.node, 'right');
          domStyle.set(mover.node, 'left',
           (containerBox.w - domBox.w - parseInt(rightPx, 10)) + 'px');
          domStyle.set(mover.node, 'right', '');
        }
      },

      onMoving: function(mover) {
        domStyle.set(mover.node, 'opacity', 0.9);
        this.moving = true;
      },

      onMoveStop: function(mover) {
        domStyle.set(mover.node, 'opacity', 1);
        var panelBox = domGeometry.getMarginBox(mover.node);
        this.position.left = panelBox.l;
        this.position.top = panelBox.t;
        setTimeout(lang.hitch(this, function() {
          this.moving = false;
        }), 500);
      },

      _getLayoutBox: function() {
        var pid = jimuConfig.layoutId;
        if (this.position.relativeTo === 'map') {
          pid = jimuConfig.mapId;
        } else {
          pid = jimuConfig.layoutId;
        }
        return domGeometry.getMarginBox(pid);
      },

      _onMinClick: function(evt) {
        if (this.windowState === 'minimized') {
          this.panelManager.normalizePanel(this);
        } else {
          this.panelManager.minimizePanel(this);
        }
        evt.stopPropagation();
      },

      _onCloseClick: function(evt) {
        this.panelManager.closePanel(this, 'wipe');
        evt.stopPropagation();
      },

      _onHandleClick: function(evt) {
        if (this.windowState === 'minimized' && !this.moving) {
          this.panelManager.normalizePanel(this);
        }
        evt.stopPropagation();
      },

      _calculatePanelPosition: function() {
        if (this.windowState === 'minimized') {
          this._minimize();
        } else {
          this._normalize();
        }
      },

      _minimize: function() {
        this.disableResizable();
        domClass.add(this.closeNode, 'minimized');
        domClass.add(this.minNode, 'minimized');
        domClass.add(this.handleNode, 'minimized');
        baseFx.animateProperty({
          node: this.domNode,
          properties: {
            width: {
              start: this.normalPosition.w,
              end: this.titleHeight
            },
            height: {
              start: this.normalPosition.h,
              end: this.titleHeight
            }
          },
          duration: 400
        }).play();
      },

      _normalize: function() {
        this._onResponsible();
        domClass.remove(this.closeNode, 'minimized');
        domClass.remove(this.minNode, 'minimized');
        domClass.remove(this.handleNode, 'minimized');
        var pos;

        if (this.normalPosition) {
          pos = {
            left: this.normalPosition.x,
            top: this.normalPosition.y,
            width: this.normalPosition.w,
            bottom: 'auto',
            height: this.normalPosition.h,
            borderRadiusStyle: {
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0
            }
          };
          baseFx.animateProperty({
            node: this.domNode,
            properties: {
              width: {
                end: this.normalPosition.w,
                start: this.titleHeight
              },
              height: {
                end: this.normalPosition.h,
                start: this.titleHeight
              }
            },
            duration: 400
          }).play();
        } else {
          pos = lang.clone(this.position);
          if (typeof pos.width === 'undefined') {
            pos.width = DEFAULT_WIDTH;
          }
          if (typeof pos.height === 'undefined') {
            pos.height = DEFAULT_HEIGHT;
          }
          pos.borderRadiusStyle = {
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius
          };
          this._setPositionStyle(pos);
        }
      },

      _setPositionStyle: function(pos) {
        var style;

        if (this.position.zIndex) {
          pos.zIndex = this.position.zIndex;
        }
        this.position.left = pos.left;
        this.position.top = pos.top;
        this.position.width = pos.width;
        this.position.height = pos.height;

        style = utils.getPositionStyle(pos);
        lang.mixin(style, pos.borderRadiusStyle);

        if (style.zIndex === 'auto') {
          style.zIndex = 0;
        }
        domStyle.set(this.domNode, style);
      },

      /**
       * @override
       * @param {[type]} position      [description]
       * @param {[type]} containerNode [description]
       */
      setPosition: function(position, containerNode) {
        var style, box, row, col, margin = 10;

        if (!containerNode) {
          if (position.relativeTo === 'map') {
            containerNode = this.map.id;
          } else {
            containerNode = window.jimuConfig.layoutId;
          }
        }

        box = domGeometry.getMarginBox(containerNode);
        if (window.appInfo.isRunInMobile) {
          position.left = 0;
          position.top = 0;
          position.width = box.w;
          position.height = box.h - 220;
        }

        if (position.left + position.width > box.w) {
          row = Math.ceil((position.left + position.width - box.w) / box.w);
          col = Math.floor((position.left + position.width - box.w * row) / position.width);
          position.left = (row + 1) * margin + col * (position.width + margin);
          position.top -= margin * row;
        }

        this.position = position;
        style = utils.getPositionStyle(this.position);
        style.position = 'absolute';
        if (window.appInfo.isRunInMobile) {
          style.width = '100%';
        }
        if (style.zIndex === 'auto') {
          style.zIndex = 0;
        }
        domConstruct.place(this.domNode, containerNode);
        domStyle.set(this.domNode, style);

        if (this.windowState === 'minimized') {
          this.panelManager.normalizePanel(this);
        }

        this._onResponsible();
      },

      /**
       * @override
       * @return {[type]} [description]
       */
      onNormalize: function() {
        this._calculatePanelPosition();
      },

      /**
       * @override
       * @return {[type]} [description]
       */
      onMinimize: function() {
        this.normalPosition = domGeometry.position(this.domNode);
        this._calculatePanelPosition();
      },

      /**
       * @override
       * @return {[type]} [description]
       */
      resize: function(tmp) {
        if (!tmp) {
          return;
        }
        var pos, style;
        var zIndex = this.position.zIndex;
        pos = {
          left: tmp.l ? tmp.l : this.position.left,
          top: tmp.t ? tmp.t : this.position.top,
          width: tmp.w ? tmp.w : this.position.width,
          height: tmp.h ? tmp.h : this.position.height
        };
        this.position = pos;
        style = utils.getPositionStyle(this.position);
        style.zIndex = zIndex;
        if(window.isRTL && 'right' in style){
          style.left = style.right;
          style.right = '';
        }
        domStyle.set(this.domNode, style);
        this._onResponsible();
        this.inherited(arguments);
      },

      _onResponsible: function() {
        if (window.appInfo.isRunInMobile) {
          this.disableMoveable();
          this.disableResizable();
        } else {
          this.makeResizable();
          this.makeMoveable(this.handleNode, this.position.w, this.position.w * 0.25);
        }
      }

    });
  });
