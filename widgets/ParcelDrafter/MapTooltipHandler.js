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
  'dijit/_WidgetBase',
  'dojo/_base/lang',
  'dojo/Evented',
  'dojo/dom-style',
  'dojo/dom-construct',
  'dojo/on'
],
  function (
    declare,
    _WidgetBase,
    lang,
    Evented,
    domStyle,
    domConstruct,
    on
  ) {
    return declare([_WidgetBase, Evented], {
      baseClass: 'jimu-widget-ParcelDrafter-MapTooltipHandler',
      map: null, //map object
      handleClickFor: null, //object to hold layer/map object for which click events need to be handled
      _mapTooltip: null, // MapTooltip Container
      _mapMoveHandler: null, // Map move handler
      _mapClickHandler: null, // Map click handler
      _mouseDragHandler: null, // Mouse drag handler,

      constructor: function (options) {
        lang.mixin(this, options);
      },

      startup: function () {
        //check if handleClickFor is assigned if not set handle click for as map
        if (!this.handleClickFor) {
          this.handleClickFor = this.map;
        }
        this._createTooltip();
      },

      /**
      * This function will connect the events
      * @memberOf widgets/ParcelDrafter/MapTooltipHandler
      **/
      connectEventHandler: function (tooltipText) {
        if (tooltipText) {
          this.updateTooltip(tooltipText);
        }
        this._disableWebMapPopup();
        this._mapClickHandler = this.own(on(this.handleClickFor, "click",
          lang.hitch(this, function (evt) {
            this._clicked(evt);
          })))[0];
        //handle mouse move on map to show tooltip only on non-touch devices
        if ("ontouchstart" in document.documentElement) {
          domStyle.set(this._mapTooltip, "display", "none");
        } else {
          this._mapMoveHandler = this.own(this.map.on("mouse-move", lang.hitch(
            this, this._onMapMouseMove)))[0];
          this.own(this.map.on("mouse-out", lang.hitch(this, function () {
            domStyle.set(this._mapTooltip, "display", "none");
          })));
        }
      },

      /**
      * This function will disconnects the events
      * @memberOf widgets/ParcelDrafter/MapTooltipHandler
      **/
      disconnectEventHandler: function () {
        this._enableWebMapPopup();
        if (this._mapClickHandler) {
          this._mapClickHandler.remove();
        }
        if (this._mapMoveHandler) {
          this._mapMoveHandler.remove();
          this._mapTooltip.style.display = "none";
        }
        this.disconnectMouseDragHandler();
      },

      /**
      * Attach mouse drag handler
      * @memberOf widgets/ParcelDrafter/MapTooltipHandler
      **/
      connectMouseDragHandler: function (tooltipText) {
        if (tooltipText) {
          this.updateTooltip(tooltipText);
        }
        this._disableWebMapPopup();
        if (this._mapClickHandler) {
          this._mapClickHandler.remove();
        }
        this.map.disableMapNavigation();
        this._mouseDragHandler =
          this.own(this.map.on("mouse-drag", lang.hitch(this, function (evt) {
            this._onDragging(evt);
          })))[0];
      },

      /**
      * Disconnect mouse drag handler
      * @memberOf widgets/ParcelDrafter/MapTooltipHandler
      **/
      disconnectMouseDragHandler: function () {
        if (this._mouseDragHandler) {
          this._mouseDragHandler.remove();
          this._mapTooltip.style.display = "none";
        }
        this.map.enableMapNavigation();
      },

      /**
      * This function will create map tooltip.
      * @memberOf widgets/ParcelDrafter/MapTooltipHandler
      **/
      _createTooltip: function () {
        //create tool-tip to be shown on map move
        this._mapTooltip = domConstruct.create("div", {
          "class": "tooltip",
          "innerHTML": this.toolTipText
        }, this.map.container);
        domStyle.set(this._mapTooltip, "position", "fixed");
        domStyle.set(this._mapTooltip, "display", "none");
      },

      /**
      * This function will enable the web map popup.
      * @memberOf widgets/ParcelDrafter/MapTooltipHandler
      **/
      _enableWebMapPopup: function () {
        if (this.map) {
          this.map.infoWindow.hide();
          this.map.setInfoWindowOnClick(true);
        }
      },

      /**
      * This function will disable the web map popup.
      * @memberOf widgets/ParcelDrafter/MapTooltipHandler
      **/
      _disableWebMapPopup: function () {
        if (this.map) {
          this.map.infoWindow.hide();
          this.map.setInfoWindowOnClick(false);
        }
      },

      /**
      * On map mouse move update the toolTip position
      * @memberOf widgets/ParcelDrafter/MapTooltipHandler
      **/
      _onMapMouseMove: function (evt) {
        // update the tooltip as the mouse moves over the map
        var px, py;
        if (evt.clientX || evt.pageY) {
          px = evt.clientX;
          py = evt.clientY;
        } else {
          px = evt.clientX + document.body.scrollLeft -
            document.body.clientLeft;
          py = evt.clientY + document.body.scrollTop - document
            .body.clientTop;
        }
        domStyle.set(this._mapTooltip, "display", "none");
        domStyle.set(this._mapTooltip, {
          left: (px + 15) + "px",
          top: (py) + "px"
        });
        domStyle.set(this._mapTooltip, "display", "");
        this._onMoving(evt);
      },

      /**
      * Emit's cick event of the layer/map
      * @memberOf widgets/ParcelDrafter/MapTooltipHandler
      **/
      _clicked: function (evt) {
        this.emit("clicked", evt);
      },

      /**
      * Emit's map drag event
      * @memberOf widgets/ParcelDrafter/MapTooltipHandler
      **/
      _onDragging: function (evt) {
        this.emit("dragging", evt);
      },

      /**
      * Emit's map move event
      * @memberOf widgets/ParcelDrafter/MapTooltipHandler
      **/
      _onMoving: function (evt) {
        this.emit("moving", evt);
      },

      /**
      * Update's the tooltip to be shown on move
      * @memberOf widgets/ParcelDrafter/MapTooltipHandler
      **/
      updateTooltip: function (newTooltip) {
        this.toolTipText = newTooltip;
        this._mapTooltip.innerHTML = this.toolTipText;
      }
    });
  });