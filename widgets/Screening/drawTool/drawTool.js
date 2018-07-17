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
  'dojo/text!./drawTool.html',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/_base/lang',
  'dojo/Evented',
  'dojo/on',
  'dojo/dom-construct',
  'dojo/query',
  'dojo/dom-class',
  'dojo/_base/array',
  'jimu/BaseWidget',
  'jimu/dijit/DrawBox',
  'jimu/dijit/FeatureSetChooserForMultipleLayers',
  'jimu/SelectionManager',
  'esri/geometry/geometryEngine',
  'dojo/_base/html',
  'dojo/_base/array',
  './SelectableLayerItem',
  'jimu/dijit/Message'
], function (
  declare,
  template,
  _WidgetsInTemplateMixin,
  lang,
  Evented,
  on,
  domConstruct,
  query,
  domClass,
  arrayUtils,
  BaseWidget,
  DrawBox,
  FeatureSetChooserForMultipleLayers,
  SelectionManager,
  GeometryEngine,
  html,
  array,
  SelectableLayerItem,
  Message
) {
  return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
    // Set base class for custom draw tool widget
    baseClass: 'jimu-widget-screening-drawTool',

    // Set base template to templateString parameter
    templateString: template,

    _drawTool: null, // To store the instance of DrawBox (Draw Tool)
    _filteredLayerArray: [], // to store layer needed to pass to select tool
    selectTool: null, // To store the instance of FeatureSetChooserForMultipleLayers (Select Tool)
    layerItems: null, // To store all the selectable layer item

    constructor: function (options) {
      this._drawTool = null;
      this._filteredLayerArray = [];
      this.selectTool = null;
      this.layerItems = null;
      lang.mixin(this, options);
    },

    postCreate: function () {
      this.layerItems = [];
      this._createFeatureLayerArr();
      this._initializeDrawBoxTools();
      this._initializeSelectTool();
      this._setFeatureLayersForSelectTool();
      //for displaying list of layers
      this._initLayers();
      this.own(on(this.layerSectionIcon, 'click',
        lang.hitch(this, this._showOrHideLayerDetailsContainer)));
      this.own(on(this.impactSummaryLayerTitle, 'click',
        lang.hitch(this, this._showOrHideLayerDetailsContainer)));
      this.own(on(this.selectAllLayers, 'click', lang.hitch(this, this._selectAllLayers)));
      this.own(on(this.singleLayerSelectionWarning, 'click', lang.hitch(this, function () {
        this._showMessage(this.nls.drawToolWidget.layerSelectionWarningTooltip);
      })));
    },

    /**
     * This function to is used to initialize the layers that could be considered in selection list
     * @memberOf drawTool/drawTool
     */
    _initLayers: function () {
      html.empty(this.layerItemsNode);
      array.forEach(this._filteredLayerArray, lang.hitch(this, function (layerObject) {
        // hide from the layer list if layerobject is undefined or there is no objectIdField
        if (layerObject && layerObject.objectIdField && layerObject.geometryType) {

          var layerInfo, item;

          array.forEach(this.layerInfoArray, lang.hitch(this, function (layerInfoDetail) {
            if (layerInfoDetail.id === layerObject.id) {
              layerInfo = layerInfoDetail;
            }
          }));

          item = new SelectableLayerItem({
            layerInfo: layerInfo,
            checked: true,
            layerVisible: true,
            map: this.map,
            nls: this.nls
          });

          this.own(on(item, 'stateChange', lang.hitch(this, function () {
            this.emit("clearExistingSelection");
            this.selectTool.setFeatureLayers(this._getSelectableLayers());
            this._updateSelectAllState();
          })));
          item.init(layerObject);
          html.place(item.domNode, this.layerItemsNode);
          item.startup();
          this.layerItems.push(item);
        }
      }));
    },

    /**
     * This function to is used to get all the selectable layers
     * @memberOf drawTool/drawTool
     */
    _getSelectableLayers: function () {
      var layers = [];
      array.forEach(this.layerItems, function (layerItem) {
        if (layerItem.isLayerVisible() && layerItem.isChecked()) {
          layers.push(layerItem.featureLayer);
        }
      }, this);
      return layers;
    },

    /**
     * This function is used to show/hide the layer list
     * @memberOf Screening/drawTool/drawTool
     */
    _showOrHideLayerDetailsContainer: function () {
      if (domClass.contains(this.layerSectionIcon, "esriCTLayerPanelCollapseIcon")) {
        domClass.add(this.entireLayerParentContainer, "esriCTHidden");
        domClass.replace(this.layerSectionIcon, "esriCTLayerPanelExpandIcon",
          "esriCTLayerPanelCollapseIcon");
      } else {
        domClass.remove(this.entireLayerParentContainer, "esriCTHidden");
        domClass.replace(this.layerSectionIcon, "esriCTLayerPanelCollapseIcon",
          "esriCTLayerPanelExpandIcon");
      }
    },

    /**
     * This function to is used to select all the layers
     * @memberOf drawTool/drawTool
     */
    _selectAllLayers: function () {
      var isSelectAll;
      html.toggleClass(this.selectAllLayers, 'checked');
      isSelectAll = domClass.contains(this.selectAllLayers, "checked");
      array.forEach(this.layerItems, function (layerItem) {
        if (isSelectAll) {
          if (!domClass.contains(layerItem.selectableCheckBox, "checked")) {
            layerItem.selectableCheckBox.click();
          }
        } else {
          if (domClass.contains(layerItem.selectableCheckBox, "checked")) {
            layerItem.selectableCheckBox.click();
          }
        }

      });
    },

    /**
     * This function to is used to update the state of select all checkbox
     * @memberOf drawTool/drawTool
     */
    _updateSelectAllState: function () {
      var isSelectAll, hasAnyUnchecked, hasAllUnchecked;
      hasAllUnchecked = true;
      isSelectAll = domClass.contains(this.selectAllLayers, "checked");
      array.forEach(this.layerItems, function (layerItem) {
        if (!domClass.contains(layerItem.selectableCheckBox, "checked")) { // un-check
          hasAnyUnchecked = true;
        } else {
          hasAllUnchecked = false;
        }
      });
      if (hasAnyUnchecked) {
        domClass.remove(this.selectAllLayers, 'checked');
      } else {
        if (!isSelectAll) {
          domClass.add(this.selectAllLayers, 'checked');
        }
      }
      if (hasAllUnchecked) {
        domClass.remove(this.singleLayerSelectionWarning, 'esriCTHidden');
      } else {
        domClass.add(this.singleLayerSelectionWarning, 'esriCTHidden');
      }
    },

    /**
     * This function to is used to create array of valid feature needed to pass to select tool
     * @memberOf drawTool/drawTool
     */
    _createFeatureLayerArr: function () {
      var layerId;
      for (layerId in this.filteredLayerObj) {
        if (this.filteredLayerObj.hasOwnProperty(layerId)) {
          this._filteredLayerArray.push(this.filteredLayerObj[layerId]);
        }
      }
    },

    /**
     * This function to initialize jimu dijit Draw Box
     * @memberOf drawTool/drawTool
     */
    _initializeDrawBoxTools: function () {
      var geometry;
      // Initialize draw box
      this._drawTool = new DrawBox({
        geoTypes: ["POINT", "POLYLINE", "EXTENT", "POLYGON"],
        map: this.map,
        pointSymbol: this.pointSymbol,
        polylineSymbol: this.polylineSymbol,
        polygonSymbol: this.polygonSymbol
      }, this.drawToolIconsParentDiv);
      this._drawTool.startup();
      // On draw tool activated, deactivate select tool if selected
      this.own(on(this._drawTool, "draw-activate", lang.hitch(this, function (tool) {
        if (this.selectTool.isActive()) {
          this.selectTool.deactivate();
          this._drawTool.drawToolBar.activate(tool);
        }
        if (tool === "extent") {
          this.map.disablePan();
        }
        this.map.setInfoWindowOnClick(false);
      })));
      // On draw complete by the draw tool
      this.own(on(this._drawTool, "draw-end", lang.hitch(this, function (graphics) {
        this._drawTool.drawLayer.clear();
        this.map.enablePan();
        // Simplify geometry if it is of type 'polygon'
        if (graphics.geometry.type === "polygon") {
          geometry = GeometryEngine.simplify(graphics.geometry);
        } else {
          geometry = graphics.geometry;
        }
        // Check that is geometry is available to create AOI buffer
        if (geometry) {
          this.emit("onDrawComplete", [graphics]);
        } else {
          this._drawTool.drawLayer.clear();
        }
        this.map.setInfoWindowOnClick(true);
      })));
    },

    /**
     * This function to initialize jimu dijit feature set chooser from multiple layers
     * @memberOf drawTool/drawTool
     */
    _initializeSelectTool: function () {
      var clearButton, selectButton;
      // Initialize select tool
      this.selectTool = new FeatureSetChooserForMultipleLayers({
        map: this.map,
        updateSelection: true,
        fullyWithin: false
      }, this.selectToolDiv);
      clearButton = query(".btn-clear", this.selectTool.domNode)[0];
      // Hide clear button of the dijit
      domClass.add(clearButton, "esriCTHidden");
      selectButton = query(".btn-select", this.selectTool.domNode)[0];
      // On select is activated, deactivate any draw tool if selected
      this.own(on(selectButton, "click", lang.hitch(this, function () {
        if (this._drawTool.isActive()) {
          this._drawTool.deactivate();
        }
        if (this.selectTool.isActive()) {
          this.map.disablePan();
        }
      })));
      // On selection complete
      this.own(on(this.selectTool, 'unloading', lang.hitch(this, function () {
        var graphics;
        graphics = this._getSelectedFeature();
        this.emit("onSelectionComplete", graphics);
      })));
      //place select tool inline with draw tools
      domConstruct.place(this.selectToolParent, query(".draw-items", this.domNode)[0], "last");
    },

    /**
     * This function to deactivate tools if active
     * @memberOf drawTool/drawTool
     */
    deactivateTools: function () {
      // Deactivate draw tool, if active
      if (this._drawTool && this._drawTool.isActive()) {
        this._drawTool.deactivate();
      }
      // Deactivate select tool, if active
      if (this.selectTool && this.selectTool.isActive()) {
        this.selectTool.deactivate();
      }
      this.map.enablePan();
    },

    /**
     * This function to set feature layers for select tool
     * @memberOf drawTool/drawTool
     */
    _setFeatureLayersForSelectTool: function () {
      this.selectTool.setFeatureLayers(this._filteredLayerArray);
    },

    /**
     * This function to fetch selected features from the layers on
     * selection complete by select tool
     * @memberOf drawTool/drawTool
     */
    _getSelectedFeature: function () {
      var selectionLayerResponse;
      selectionLayerResponse = [];
      arrayUtils.forEach(this._filteredLayerArray, lang.hitch(this, function (layer) {
        selectionLayerResponse = selectionLayerResponse.concat(layer.getSelectedFeatures());
      }));
      return selectionLayerResponse;
    },

    /**
     * This function to deselect all features from all layers for select tool
     * @memberOf drawTool/drawTool
     */
    clearAllSelections: function () {
      var selectionMgr;
      selectionMgr = SelectionManager.getInstance();
      arrayUtils.forEach(this._filteredLayerArray, lang.hitch(this, function (layerObject) {
        selectionMgr.clearSelection(layerObject);
      }));
    },

    /**
     * This function is used to display error/warning/info message.
     * @memberOf drawTool/drawTool
     */
    _showMessage: function (msg) {
      var alertMessage = new Message({
        message: msg
      });
      alertMessage.message = msg;
    }
  });
});