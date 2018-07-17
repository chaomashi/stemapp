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
  'dojo/_base/array',
  'dijit/_WidgetBase',
  'dojo/dom-construct',
  'dojo/dom-geometry',
  'dojo/dom-style',
  'dojo/dom-class',
  'dojo/on',
  'dojo/Deferred',
  'dojo/query',
  'dojo/debounce',
  'dojo/Evented',
  'dojo/dnd/move',
  'dojo/_base/fx',
  'dojo/fx',
  'dijit/_TemplatedMixin',
  'dojo/text!./Panel.html'
],
function(declare, lang, array, _WidgetBase, domConstruct, domGeometry, domStyle, domClass,
  on, Deferred, query, debounce, Evented, Move, baseFx, coreFx, _TemplatedMixin, template) {
  var ANIMATION_DURATION = 300;
  var PORTRAIT_MODE = 1, LANDSCAPE_MODE = 2;
  var THRESHOLD = 150; // If swipe more than 150px, trigger the action.
  var WIDGET_NORMAL = 0, WIDGET_MINIMIZED = 1, WIDGET_MAXIMIZED = 2;
  var MAP_RATIO_PORTRAIT = 0.5, WIDGET_MIN_WIDTH = 320, SPLITTER_HEIGHT = 16;

  return declare([_WidgetBase, _TemplatedMixin, Evented], {
    baseClass: 'jimu-dnd-mobile-panel',
    templateString: template,
    mobileLayout: PORTRAIT_MODE,
    layoutId: '',
    mapId: '',
    widgetIds: null,
    panels: null,
    currentIndex: 0,
    leftPos: 0,
    count: '',
    title: '',
    widgetMode: WIDGET_NORMAL,
    layoutManager: null, // instance of GridLayoutManager

    _moveStartX: 0,
    _moveStartY: 0,

    postCreate: function(){
      this.inherited(arguments);

      this.setMobileLayout(this.mobileLayout);
      domConstruct.place(this.mapId, this.mapNode);

      this.own(on(this.previousArrow, 'click', lang.hitch(this, this._switchPrevious)));
      this.own(on(this.nextArrow, 'click', lang.hitch(this, this._switchNext)));

      this._initSplitter();
      domStyle.set(this.footerNode, 'opacity', '0');
      this.resize();
    },

    clearPanels: function() {
      this.widgetIds = [];
      this.panels = [];
      domConstruct.empty(this.containerNode);
      domStyle.set(this.containerNode, 'left', 0);
      this.currentIndex = 0;
      this._updateHeader(this.currentIndex - 1, this.currentIndex);
    },

    setPanels: function(widgetIds, panels) {
      this.widgetIds = widgetIds;
      this.panels = panels || {};
      this.currentIndex = 0;
      if (this.widgetIds.length <= 1) {
        domStyle.set(this.previousArrow, 'display', 'none');
        domStyle.set(this.nextArrow, 'display', 'none');
      } else {
        domStyle.set(this.previousArrow, 'display', 'block');
        domStyle.set(this.nextArrow, 'display', 'block');
      }
      domStyle.set(this.footerNode, 'opacity', '0');
      this._openPanel();
      this._updateHeader(this.currentIndex - 1, this.currentIndex);
    },

    _resizeActivePanel: function() {
      if (this.widgetIds && this.panels) {
        var widgetId = this.widgetIds[this.currentIndex];
        var activePanel = this.panels[widgetId];
        if (activePanel && typeof activePanel.resize === 'function') {
          activePanel.resize();
        }
      }
    },

    _openPanel: function() {
      var widgetId = this.widgetIds[this.currentIndex];
      var activePanel = this.panels[widgetId], otherPanel;
      if (!activePanel || !activePanel.domNode) {
        this.layoutManager._loadDashboardWidget(this.widgetIds[this.currentIndex])
          .then(lang.hitch(this, function(panel) {
            if(panel) {
              var div = domConstruct.create('div', {
                'data-widgetId': widgetId,
                'class': 'dnd-mobile-container'
              }, this.containerNode);
              panel.placeAt(div);
              this.panels[widgetId] = panel;
              this.layoutManager.panelManager.openPanel(panel);

              this.labelNode.innerHTML = panel.config.label;
            }
          }));
      } else {
        var numOfPanels = query('div[data-widgetId="' + widgetId + '"]', this.containerNode);
        if (numOfPanels.length === 0) {
          var div = domConstruct.create('div', {
            'data-widgetId': widgetId,
            'class': 'dnd-mobile-container'
          }, this.containerNode);
          activePanel.placeAt(div);
        }
        this.layoutManager.panelManager.openPanel(activePanel);
      }

      // Close all other panels
      array.forEach(this.widgetIds, lang.hitch(this, function(wid) {
        if (wid !== widgetId) {
          otherPanel = this.panels[wid];
          if (otherPanel) {
            this.layoutManager.panelManager.closePanel(otherPanel);
          }
        }
      }));
    },

    _initSplitter: function() {
      if(this.moveable){
        this.moveable.destroy();
      }
      this.moveable = new Move.parentConstrainedMoveable(this.splitterNode, {
        area: 'content',
        within: true
      });
      this.own(on(this.moveable, 'MoveStart', lang.hitch(this, this.onMoveStart)));
      this.own(on(this.moveable, 'Moving', debounce(lang.hitch(this, this.onMoving), 50)));
      this.own(on(this.moveable, 'MoveStop', lang.hitch(this, this.onMoveStop)));
    },

    destroy: function() {
      if(this.moveable){
        this.moveable.destroy();
        this.moveable = null;
      }
      var widgetId = this.widgetIds[this.currentIndex];
      var activePanel = this.panels[widgetId];
      if (activePanel) {
        this.layoutManager.panelManager.closePanel(activePanel);
      }
      domConstruct.empty(this.containerNode);
      this.inherited(arguments);
    },

    setMobileLayout: function(mode) {
      if (mode === LANDSCAPE_MODE) {
        this.mobileLayout = LANDSCAPE_MODE;
        domClass.remove(this.domNode, 'portrait');
        domClass.add(this.domNode, 'landscape');
      } else {
        this.mobileLayout = PORTRAIT_MODE;
        domClass.remove(this.domNode, 'landscape');
        domClass.add(this.domNode, 'portrait');
      }
    },

    resize: function() {
      var deferred;
      if (this.mobileLayout === LANDSCAPE_MODE) {
        deferred = this._restoreLandscapeLayout();
      } else {
        deferred = this._restorePortraitLayout();
      }
      // trigger the resized event after the animation finished
      deferred.then(lang.hitch(this, function() {
        // may have been destroyed after animation finished because of layout changes from
        // mobile to desktop.
        if (this.domNode) {
          var containerSize = domGeometry.getMarginBox(this.widgetContainerNode);
          if (window.isRTL) {
            this.emit('resized', {
              right: containerSize.l,
              top: containerSize.t,
              width: containerSize.w,
              height: containerSize.h
            });
          } else {
            this.emit('resized', {
              left: containerSize.l,
              top: containerSize.t,
              width: containerSize.w,
              height: containerSize.h
            });
          }
        }
      }));
    },

    _updateHeader: function(previousIndex, currentIndex) {
      if (this.widgetIds && this.widgetIds.length > 0) {
        var currentWidgetId = this.widgetIds[currentIndex],
          previousWidgetId = this.widgetIds[previousIndex];
        var currentPanel = this.panels[currentWidgetId],
          previousPanel = this.panels[previousWidgetId];
        var currentWidget, previousWidget;

        this.countNode.innerHTML = (currentIndex + 1) + '/' + this.widgetIds.length;
        if(previousIndex && previousPanel) {
          previousWidget = previousPanel.getWidgetById(previousWidgetId);
          previousWidget.onDeActive();
        }
        if (currentPanel) {
          currentWidget = currentPanel.getWidgetById(currentWidgetId);
          if (currentWidget) { // may be undefined because widgets in panel is loaded async
            currentWidget.onActive();
            this.labelNode.innerHTML = currentWidget.label;
          }
        } else {
          this.labelNode.innerHTML = '';
        }
      } else {
        this.labelNode.innerHTML = '';
        this.countNode.innerHTML = '';
      }

      if (currentIndex === 0) {
        domClass.add(this.previousArrow, 'disabled');
      } else {
        domClass.remove(this.previousArrow, 'disabled');
      }
      if (currentIndex === this.widgetIds.length - 1) {
        domClass.add(this.nextArrow, 'disabled');
      } else {
        domClass.remove(this.nextArrow, 'disabled');
      }
    },

    _switchPrevious: function() {
      if (this.currentIndex > 0) {
        this._updateHeader(this.currentIndex, this.currentIndex - 1);
        this.currentIndex--;
        this._play();
      }
    },

    _switchNext: function() {
      if (this.currentIndex < this.widgetIds.length - 1) {
        this._updateHeader(this.currentIndex, this.currentIndex + 1);
        this.currentIndex++;
        this._play();
      }
    },

    _play: function() {
      var size = domGeometry.getMarginBox(this.containerNode);
      var props;
      if (window.isRTL) {
        props = {
          right: -this.currentIndex * size.w
        };
      } else {
        props = {
          left: -this.currentIndex * size.w
        };
      }

      baseFx.animateProperty({
        node: this.containerNode,
        duration: ANIMATION_DURATION,
        properties: props,
        onEnd: lang.hitch(this, function() {
          domStyle.set(this.footerNode, 'opacity', '1');
          baseFx.animateProperty({
            node: this.footerNode,
            duration: ANIMATION_DURATION * 7,
            properties: {
              opacity: 0
            }
          }).play();
        })
      }).play();
      this._openPanel();
    },

    onMoveStart: function(mover){
      if (window.isRTL) {
        var size = domGeometry.getMarginBox(this.layoutId);
        var right = parseFloat(domStyle.get(mover.node, 'right'));
        this._moveStartX = size.w - right;
        domStyle.set(this.splitterNode, {
          left: this._moveStartX + 'px',
          right: 'auto'
        });
      } else {
        this._moveStartX = domStyle.get(mover.node, 'left');
      }
      this._moveStartY = domStyle.get(mover.node, 'top');
    },

    onMoving: function(mover){
      if (!mover || !mover.node) {
        return;
      }
      var dx = domStyle.get(mover.node, 'left') - this._moveStartX,
      dy = domStyle.get(mover.node, 'top') - this._moveStartY;

      if (this.mobileLayout === PORTRAIT_MODE) { // Move horizontally
        domStyle.set(this.widgetContainerNode, 'top', (this._moveStartY + dy +
          SPLITTER_HEIGHT) + 'px');
        domStyle.set(this.splitterNode, 'top', (this._moveStartY + dy) + 'px');
        domStyle.set(this.splitterNode, 'left', '0');
      } else if (this.mobileLayout === LANDSCAPE_MODE) {
        // Move horizontally
        domStyle.set(this.widgetContainerNode, {
          left: (this._moveStartX + dx + SPLITTER_HEIGHT) + 'px',
          right: 'auto'
        });
        domStyle.set(this.splitterNode, {
          left: (this._moveStartX + dx) + 'px',
          right: 'auto',
          top: 0
        });
      }
    },

    onMoveStop: function(mover){
      var dx = domStyle.get(mover.node, 'left') - this._moveStartX,
      dy = domStyle.get(mover.node, 'top') - this._moveStartY;
      if (this.mobileLayout === PORTRAIT_MODE) {
        this._resizeWidgetVertically(dy);
      } else if (this.mobileLayout === LANDSCAPE_MODE) {
        this._resizeWidgetHorizontally(dx);
      }
    },

    _resizeWidgetVertically: function(dy) {
      var size = domGeometry.getMarginBox(this.layoutId);
      var containerSize = domGeometry.getMarginBox(this.containerNode);
      var threshold = containerSize.h / 3, changed = false, animArray = [], animation;
      threshold = threshold > THRESHOLD ? THRESHOLD : threshold;

      var splitterTop, mapTop, mapHeight, widgetHeight;
      if (this.widgetMode === WIDGET_NORMAL && dy < -threshold) { // normal to maximize
        this.widgetMode = WIDGET_MAXIMIZED;
        splitterTop = 0;
        mapTop = -size.h * MAP_RATIO_PORTRAIT;
        mapHeight = size.h * MAP_RATIO_PORTRAIT;
        widgetHeight = size.h - SPLITTER_HEIGHT;
        changed = true;
        this.emit('resized', {
          left: 0,
          top: splitterTop + SPLITTER_HEIGHT,
          width: size.w,
          height: widgetHeight
        });
      } else if(this.widgetMode === WIDGET_NORMAL && dy > threshold) { // normal to minimize
        this.widgetMode = WIDGET_MINIMIZED;
        splitterTop = size.h - SPLITTER_HEIGHT;
        mapHeight = size.h - SPLITTER_HEIGHT;
        mapTop = 0;
        widgetHeight = size.h * (1 - MAP_RATIO_PORTRAIT) - SPLITTER_HEIGHT;
        changed = true;
        this.emit('resized', {
          left: 0,
          top: splitterTop + SPLITTER_HEIGHT,
          width: size.w,
          height: widgetHeight
        });
      } else if(this.widgetMode === WIDGET_MINIMIZED && dy < -threshold || // minimize to normal
        this.widgetMode === WIDGET_MAXIMIZED && dy > threshold) { // maximize to normal
        this.widgetMode = WIDGET_NORMAL;
        splitterTop = size.h * MAP_RATIO_PORTRAIT;
        mapHeight = size.h * MAP_RATIO_PORTRAIT;
        mapTop = 0;
        widgetHeight = size.h * (1 - MAP_RATIO_PORTRAIT) - SPLITTER_HEIGHT;
        changed = true;
        this.emit('resized', {
          left: 0,
          top: splitterTop + SPLITTER_HEIGHT,
          width: size.w,
          height: widgetHeight
        });
      }
      if (changed) {
        animArray.push(baseFx.animateProperty({
          node: this.widgetContainerNode,
          duration: ANIMATION_DURATION,
          properties: {
            top: splitterTop + SPLITTER_HEIGHT,
            height: widgetHeight
          }
        }));

        animArray.push(baseFx.animateProperty({
          node: this.containerNode,
          duration: ANIMATION_DURATION,
          properties: {
            left: -this.currentIndex * size.w,
            width: size.w
          }
        }));

        animArray.push(baseFx.animateProperty({
          node: this.splitterNode,
          duration: ANIMATION_DURATION,
          properties: {
            top: splitterTop
          }
        }));

        animArray.push(baseFx.animateProperty({
          node: this.mapNode,
          duration: ANIMATION_DURATION,
          properties: {
            height: mapHeight,
            top: mapTop
          }
        }));

        animation = coreFx.combine(animArray);
        animation.onEnd = lang.hitch(this, this._resizeActivePanel);
        animation.play();
      } else {
        this._restorePortraitLayout();
      }
    },

    _resizeWidgetHorizontally: function(dx) {
      var size = domGeometry.getMarginBox(this.layoutId);
      var containerSize = domGeometry.getMarginBox(this.containerNode);
      var threshold = containerSize.w / 3, changed = false, animArray = [], animation;
      threshold = threshold > THRESHOLD ? THRESHOLD : threshold;

      var splitterLeft, mapLeft, splitterRight, mapRight, mapWidth, widgetWidth;
      if (window.isRTL) {
        if (this.widgetMode === WIDGET_NORMAL && dx > threshold) { // normal to maximize
          this.widgetMode = WIDGET_MAXIMIZED;
          splitterRight = 0;
          mapWidth = size.w - WIDGET_MIN_WIDTH - SPLITTER_HEIGHT;
          mapRight = -mapWidth;
          widgetWidth = size.w - SPLITTER_HEIGHT;
          changed = true;
          this.emit('resized', {
            left: splitterRight + SPLITTER_HEIGHT,
            right: 'auto',
            top: 0,
            width: widgetWidth,
            height: size.h
          });
        } else if(this.widgetMode === WIDGET_NORMAL && dx < -threshold) { // normal to minimize
          this.widgetMode = WIDGET_MINIMIZED;
          mapWidth = size.w - SPLITTER_HEIGHT;
          splitterRight = mapWidth;
          mapRight = 0;
          widgetWidth = WIDGET_MIN_WIDTH;
          changed = true;
          this.emit('resized', {
            left: splitterRight + SPLITTER_HEIGHT,
            right: 'auto',
            top: 0,
            width: widgetWidth,
            height: size.h
          });
        } else if((this.widgetMode === WIDGET_MINIMIZED && dx > threshold) || // minimize to normal
        (this.widgetMode === WIDGET_MAXIMIZED && dx < -threshold)) { // maximize to normal
          this.widgetMode = WIDGET_NORMAL;
          mapWidth = size.w - WIDGET_MIN_WIDTH - SPLITTER_HEIGHT;
          splitterRight = mapWidth;
          mapRight = 0;
          widgetWidth = WIDGET_MIN_WIDTH;
          changed = true;
          this.emit('resized', {
            left: splitterRight + SPLITTER_HEIGHT,
            right: 'auto',
            top: 0,
            width: widgetWidth,
            height: size.h
          });
        }
        if (changed) {
          animArray.push(baseFx.animateProperty({
            node: this.widgetContainerNode,
            duration: ANIMATION_DURATION,
            properties: {
              left: 'auto',
              right: splitterRight + SPLITTER_HEIGHT,
              width: widgetWidth
            }
          }));

          animArray.push(baseFx.animateProperty({
            node: this.containerNode,
            duration: ANIMATION_DURATION,
            properties: {
              left: 'auto',
              right: -this.currentIndex * widgetWidth,
              width: widgetWidth
            }
          }));

          animArray.push(baseFx.animateProperty({
            node: this.splitterNode,
            duration: ANIMATION_DURATION,
            properties: {
              left: 'auto',
              right: splitterRight
            }
          }));

          animArray.push(baseFx.animateProperty({
            node: this.mapNode,
            duration: ANIMATION_DURATION,
            properties: {
              left: 'auto',
              width: mapWidth,
              right: mapRight
            }
          }));

          animation = coreFx.combine(animArray);
          animation.onEnd = lang.hitch(this, this._resizeActivePanel);
          animation.play();
        } else {
          this._restoreLandscapeLayout();
        }
      } else {
        if (this.widgetMode === WIDGET_NORMAL && dx < -threshold) { // normal to maximize
          this.widgetMode = WIDGET_MAXIMIZED;
          splitterLeft = 0;
          mapWidth = size.w - WIDGET_MIN_WIDTH - SPLITTER_HEIGHT;
          mapLeft = -mapWidth;
          widgetWidth = size.w - SPLITTER_HEIGHT;
          changed = true;
          this.emit('resized', {
            left: splitterLeft + SPLITTER_HEIGHT,
            top: 0,
            width: widgetWidth,
            height: size.h
          });
        } else if(this.widgetMode === WIDGET_NORMAL && dx > threshold) { // normal to minimize
          this.widgetMode = WIDGET_MINIMIZED;
          mapWidth = size.w - SPLITTER_HEIGHT;
          splitterLeft = mapWidth;
          mapLeft = 0;
          widgetWidth = WIDGET_MIN_WIDTH;
          changed = true;
          this.emit('resized', {
            left: splitterLeft + SPLITTER_HEIGHT,
            top: 0,
            width: widgetWidth,
            height: size.h
          });
        } else if(this.widgetMode === WIDGET_MINIMIZED && dx < -threshold || // minimize to normal
        this.widgetMode === WIDGET_MAXIMIZED && dx > threshold) { // maximize to normal
          this.widgetMode = WIDGET_NORMAL;
          mapWidth = size.w - WIDGET_MIN_WIDTH - SPLITTER_HEIGHT;
          splitterLeft = mapWidth;
          mapLeft = 0;
          widgetWidth = WIDGET_MIN_WIDTH;
          changed = true;
          this.emit('resized', {
            left: splitterLeft + SPLITTER_HEIGHT,
            top: 0,
            width: widgetWidth,
            height: size.h
          });
        }
        if (changed) {
          animArray.push(baseFx.animateProperty({
            node: this.widgetContainerNode,
            duration: ANIMATION_DURATION,
            properties: {
              left: splitterLeft + SPLITTER_HEIGHT,
              width: widgetWidth
            }
          }));

          animArray.push(baseFx.animateProperty({
            node: this.containerNode,
            duration: ANIMATION_DURATION,
            properties: {
              left: -this.currentIndex * widgetWidth,
              width: widgetWidth
            }
          }));

          animArray.push(baseFx.animateProperty({
            node: this.splitterNode,
            duration: ANIMATION_DURATION,
            properties: {
              left: splitterLeft
            }
          }));

          animArray.push(baseFx.animateProperty({
            node: this.mapNode,
            duration: ANIMATION_DURATION,
            properties: {
              width: mapWidth,
              left: mapLeft
            }
          }));

          animation = coreFx.combine(animArray);
          animation.onEnd = lang.hitch(this, this._resizeActivePanel);
          animation.play();
        } else {
          this._restoreLandscapeLayout();
        }
      }
    },

    _restorePortraitLayout: function() {
      var size = domGeometry.getMarginBox(this.layoutId);
      var animArray = [], animation, deferred = new Deferred();

      var splitterTop, mapTop, mapHeight, widgetHeight;
      if (this.widgetMode === WIDGET_NORMAL) { // normal
        splitterTop = size.h * MAP_RATIO_PORTRAIT;
        mapHeight = size.h * MAP_RATIO_PORTRAIT;
        mapTop = 0;
        widgetHeight = size.h - mapHeight - SPLITTER_HEIGHT;
      } else if(this.widgetMode === WIDGET_MAXIMIZED) { // maximize
        splitterTop = 0;
        mapTop = -size.h * MAP_RATIO_PORTRAIT;
        mapHeight = size.h * MAP_RATIO_PORTRAIT;
        widgetHeight = size.h - SPLITTER_HEIGHT;
      } else if(this.widgetMode === WIDGET_MINIMIZED) { // minimized
        splitterTop = size.h - SPLITTER_HEIGHT;
        mapHeight = size.h - SPLITTER_HEIGHT;
        mapTop = 0;
        widgetHeight = size.h * (1 - MAP_RATIO_PORTRAIT) - SPLITTER_HEIGHT;
      }
      animArray.push(baseFx.animateProperty({
        node: this.widgetContainerNode,
        duration: ANIMATION_DURATION,
        properties: {
          left: 0,
          right: 0,
          top: splitterTop + SPLITTER_HEIGHT,
          height: widgetHeight,
          width: size.w
        }
      }));

      var containerProps;
      if(window.isRTL) {
        containerProps = {
          right: -this.currentIndex * size.w,
          width: size.w
        }
      } else {
        containerProps = {
          left: -this.currentIndex * size.w,
          width: size.w
        };
      }
      animArray.push(baseFx.animateProperty({
        node: this.containerNode,
        duration: ANIMATION_DURATION,
        properties: containerProps
      }));

      animArray.push(baseFx.animateProperty({
        node: this.splitterNode,
        duration: ANIMATION_DURATION,
        properties: {
          top: splitterTop,
          left: 0,
          right: 0,
          width: size.w,
          height: SPLITTER_HEIGHT
        }
      }));

      animArray.push(baseFx.animateProperty({
        node: this.mapNode,
        duration: ANIMATION_DURATION,
        properties: {
          height: mapHeight,
          width: size.w,
          top: mapTop,
          left: 0,
          right: 0
        }
      }));

      animation = coreFx.combine(animArray);
      animation.onEnd = lang.hitch(this, function() {
        this._resizeActivePanel();
        deferred.resolve();
      });
      animation.play();

      return deferred;
    },

    _restoreLandscapeLayout: function() {
      var size = domGeometry.getMarginBox(this.layoutId);
      var animArray = [], animation, deferred = new Deferred();
      var splitterLeft, mapLeft, splitterRight, mapRight, mapWidth, widgetWidth;

      if (window.isRTL) {
        if (this.widgetMode === WIDGET_NORMAL) { // normal
          mapWidth = size.w - WIDGET_MIN_WIDTH - SPLITTER_HEIGHT;
          splitterRight = mapWidth;
          mapRight = 0;
          widgetWidth = WIDGET_MIN_WIDTH;
        } else if(this.widgetMode === WIDGET_MAXIMIZED) { // maximize
          splitterRight = 0;
          mapWidth = size.w - WIDGET_MIN_WIDTH - SPLITTER_HEIGHT;
          mapRight = -mapWidth;
          widgetWidth = size.w - SPLITTER_HEIGHT;
        } else if(this.widgetMode === WIDGET_MINIMIZED) { // minimize
          mapWidth = size.w - SPLITTER_HEIGHT;
          splitterRight = mapWidth;
          mapRight = 0;
          widgetWidth = WIDGET_MIN_WIDTH;
        }

        animArray.push(baseFx.animateProperty({
          node: this.widgetContainerNode,
          duration: ANIMATION_DURATION,
          properties: {
            top: 0,
            right: splitterRight + SPLITTER_HEIGHT,
            width: widgetWidth,
            height: size.h
          }
        }));

        animArray.push(baseFx.animateProperty({
          node: this.containerNode,
          duration: ANIMATION_DURATION,
          properties: {
            right: -this.currentIndex * widgetWidth,
            width: widgetWidth
          }
        }));

        animArray.push(baseFx.animateProperty({
          node: this.splitterNode,
          duration: ANIMATION_DURATION,
          properties: {
            right: splitterRight,
            top: 0,
            height: size.h,
            width: SPLITTER_HEIGHT
          }
        }));

        animArray.push(baseFx.animateProperty({
          node: this.mapNode,
          duration: ANIMATION_DURATION,
          properties: {
            width: mapWidth,
            height: size.h,
            right: mapRight,
            top: 0
          }
        }));
      } else {
        if (this.widgetMode === WIDGET_NORMAL) { // normal
          mapWidth = size.w - WIDGET_MIN_WIDTH - SPLITTER_HEIGHT;
          splitterLeft = mapWidth;
          mapLeft = 0;
          widgetWidth = WIDGET_MIN_WIDTH;
        } else if(this.widgetMode === WIDGET_MAXIMIZED) { // maximize
          splitterLeft = 0;
          mapWidth = size.w - WIDGET_MIN_WIDTH - SPLITTER_HEIGHT;
          mapLeft = -mapWidth;
          widgetWidth = size.w - SPLITTER_HEIGHT;
        } else if(this.widgetMode === WIDGET_MINIMIZED) { // minimize
          mapWidth = size.w - SPLITTER_HEIGHT;
          splitterLeft = mapWidth;
          mapLeft = 0;
          widgetWidth = WIDGET_MIN_WIDTH;
        }

        animArray.push(baseFx.animateProperty({
          node: this.widgetContainerNode,
          duration: ANIMATION_DURATION,
          properties: {
            top: 0,
            left: splitterLeft + SPLITTER_HEIGHT,
            width: widgetWidth,
            height: size.h
          }
        }));

        animArray.push(baseFx.animateProperty({
          node: this.containerNode,
          duration: ANIMATION_DURATION,
          properties: {
            left: -this.currentIndex * widgetWidth,
            width: widgetWidth
          }
        }));

        animArray.push(baseFx.animateProperty({
          node: this.splitterNode,
          duration: ANIMATION_DURATION,
          properties: {
            left: splitterLeft,
            top: 0,
            height: size.h,
            width: SPLITTER_HEIGHT
          }
        }));

        animArray.push(baseFx.animateProperty({
          node: this.mapNode,
          duration: ANIMATION_DURATION,
          properties: {
            width: mapWidth,
            height: size.h,
            left: mapLeft,
            top: 0
          }
        }));
      }

      animation = coreFx.combine(animArray);
      animation.onEnd = lang.hitch(this, function() {
        this._resizeActivePanel();
        deferred.resolve();
      });
      animation.play();

      return deferred;
    }
  });
});
