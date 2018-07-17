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
  'jimu/BaseWidget',
  "esri/map",
  "esri/dijit/ObliqueViewer",
  "dojo/_base/lang",
  "dojo/dom",
  "dijit/form/Button",
  "dojo/_base/array",
  "esri/dijit/ImageServiceMeasure",
  "dijit/form/DropDownButton",
  "dijit/TooltipDialog",
  "dijit/form/ToggleButton",
  "esri/layers/ArcGISImageServiceLayer",
  "esri/symbols/PictureMarkerSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/CartographicLineSymbol",
  "esri/Color",
  "esri/graphic",
  "esri/geometry/geometryEngine",
  "esri/geometry/Point",
  "dojo/dom-style",
  "dojo/dom-class",
  "esri/IdentityManager"
],

  function(declare, BaseWidget, Map, ObliqueViewer,
    lang, dom, Button, array, ImageServiceMeasure,
    DropDownButton, TooltipDialog, ToggleButton,
    ArcGISImageServiceLayer, PictureMarkerSymbol,
    SimpleFillSymbol, SimpleLineSymbol, CartographicLineSymbol, Color,
    Graphic, geometryEngine, Point, domStyle, domClass) {

    var clazz = declare([BaseWidget], {
      baseClass: "jimu-widget-ObliqueViewer",
      name: "ObliqueViewer",
      imageServiceMeasureWidget: null,
      imageLayer: "",
      ovMap: null,
      startAzimuthAngle: 0,
      startup: function() {
        this.inherited(arguments);

        var layerUrl = this._getLayerUrl(this.config.ObliqueViewer.layerTitle);
        this.imageLayer = new ArcGISImageServiceLayer(layerUrl);

        this.setImageLayerProperties();

        this.ovMap = new Map("ovMap");

        this.own(this.imageLayer.on("load", lang.hitch(this, this._addObliqueViewerWidget)));

        this.ovMap.addLayer(this.imageLayer);

        this.nativePointSymbol = new PictureMarkerSymbol({
          "angle": 0,
          "xoffset": 2,
          "yoffset": 4,
          "type": "esriPMS",
          "url": "./widgets/ObliqueViewer/images/BlueShinyPin.png",
          "contentType": "image/png",
          "width": 24,
          "height": 24
        });

        this.noImageExtentSymbol = new SimpleFillSymbol()
        .setOutline(new CartographicLineSymbol(CartographicLineSymbol.STYLE_LONGDASH)
        .setColor(new Color("green")).setWidth(2))
        .setColor(new Color([0, 0, 0, 0]));

        this.obliqueExtentSymbol = new SimpleFillSymbol()
          .setOutline(new SimpleLineSymbol().setColor(new Color("red")).setWidth(2))
          .setColor(new Color([0, 0, 0, 0]));

      },

      setImageLayerProperties: function() {
        if (this.renderingRule) {
          this.imageLayer.setRenderingRule(this.renderingRule, true);
        }
        if (this.mosaicRule) {
          this.imageLayer.setMosaicRule(this.mosaicRule, true);
        }
        if (this.imageFormat) {
          this.imageLayer.setImageFormat(this.imageFormat, true);
        }
        if (this.compressionQuality) {
          this.imageLayer.setCompressionQuality(this.compressionQuality, true);
        }
        this.imageLayer.refresh();
      },

      onOpen: function() {
        if (this.oblique) {
          var polygon = geometryEngine.buffer(this.map.extent.getCenter(), 100, "meters"),
                 newExtent = polygon.getExtent();
          this.oblique.locate(newExtent);
        } else {
          this._setInitialExtent();
        }
      },

      _getRasterInfoFieldsObj: function() {
        var rasterInfoFieldsObj = [],
                allFields = this.imageLayer.fields;

        array.forEach(this.config.ObliqueViewer.rasterInfoFields, function(rasterInfoFieldName) {
          array.forEach(allFields, function(fieldObj) {
            if (fieldObj.name === rasterInfoFieldName || fieldObj.alias === rasterInfoFieldName) {
              fieldObj.display = true;
              rasterInfoFieldsObj.push(lang.clone(fieldObj));
            }
          });
        }, this);

        return rasterInfoFieldsObj;
      },
      _setInitialExtent: function() {
        var intialExtent = this.map.extent,
                x = (intialExtent.xmax + intialExtent.xmin) / 2,
                y = (intialExtent.ymax + intialExtent.ymin) / 2,
                center = new Point(x, y, intialExtent.spatialReference),
                polygon = geometryEngine.buffer(center, 100, "meters"),
                newExtent = polygon.getExtent();

        if (this.oblique) {
          this.oblique.setExtent(newExtent);
        } else {
          this.ovMap.setExtent(newExtent);
        }

        //this.oblique.setExtent(newExtent);
      },
      _addObliqueViewerWidget: function() {

        this._addLocateButton();
        this._addClearButton();
        this._addZoomButton();
        this._addSyncButton();
        this._addTitlePane();

        //this.ovMap.setExtent(this.imageLayer.initialExtent);
        //this._setInitialExtent();

        this.oblique = new ObliqueViewer({
          map: this.ovMap,
          imageServiceLayer: this.imageLayer,
          azimuthField: this.config.ObliqueViewer.azimuthField,
          elevationField: this.config.ObliqueViewer.elevationField,
          showThumbnail: this.config.ObliqueViewer.showThumbnail,
          searchRadius: this.config.ObliqueViewer.searchRadius,
          searchUnit: this.config.ObliqueViewer.searchUnit,
          rasterInfoFields: this._getRasterInfoFieldsObj(),
          rotationDiv: this.obliqueRotationDiv,
          azimuthAngle: this.startAzimuthAngle,
          rasterListDiv: dom.byId("rasterListDiv"),
          rasterListRefresh: this.dropDown.dropDown.open
        });

        var displayOperations = ["esriMensurationHeightFromBaseAndTop",
        "esriMensurationHeightFromTopAndTopShadow",
        "esriMensurationHeightFromBaseAndTopShadow"];

        if(this.config.ObliqueViewer.showDistanceTools) {
          displayOperations.push("esriMensurationDistanceAndAngle", "esriMensurationAreaAndPerimeter");
        }

        this.measureWidget = new ImageServiceMeasure({
          layer: this.imageLayer,
          map: this.ovMap,
          'class': "measureWidget",
          title: this.nls.measureWidgetLabel,
          displayOperations: displayOperations
        }, this.measureWidget);
        this.measureWidget.startup();

        this.own(
        this.measureWidget.measureToolbar.on("measure-end", lang.hitch(this, this.publishMeasureResult)),
        this.measureWidget.measureToolbar.on("unit-change", lang.hitch(this, this.publishMeasureResult)),

        this.zoomButton.on("click", lang.hitch(this, function() {
          this.oblique.zoomToSelectedImage();
        })),

        this.locateButton.on("change", lang.hitch(this, this._locateClick)),
        this.clearButton.on("click", lang.hitch(this, this._clearAll)),
        this.oblique.on("raster-select", lang.hitch(this, this._closeDropDown)),
        this.oblique.on("azimuth-change", lang.hitch(this, this._handleZoomButton)),
        this.oblique.on("azimuth-change", lang.hitch(this, this._showAzimuthChangeNotification)),
        this.oblique.on("extent-change", lang.hitch(this, this._updateExtentOnNadirMap)),
        this.oblique.on("no-records", lang.hitch(this, this._showNoImageNotification)),
        this.oblique.on("records-found", lang.hitch(this, this._hideNoImageNotification)),
        this.oblique.on("add-point", lang.hitch(this, this._showPoint))
        );

        this._addClassesToMenus();

        if (this.syncButton) {
          this.own(this.syncButton.on("click", lang.hitch(this, this._updateNadirExtent, true)));
        }
      },

      _showAzimuthChangeNotification: function(evt) {
        if (evt.noDataSwitch) {
          domStyle.set(this.notificationDiv, "display", "block");
          domStyle.set(this.notificationDiv, "opacity", 1);
          setTimeout(lang.hitch(this, function() {
            this._hideAzimuthChangeNotification();
          }), 3000);
        } else {
          this._hideAzimuthChangeNotification();
        }
      },

      _hideAzimuthChangeNotification: function() {
        domStyle.set(this.notificationDiv, "opacity", "0");
      },

      _addClassesToMenus: function() {
        if (!this.measureWidget) {
          return;
        }
        if (this.measureWidget._menu) {
          domClass.add(this.measureWidget._menu.domNode, "obliqueViewerWidgetDiv");
        }
        if (this.measureWidget.linearUnitMenu) {
          domClass.add(this.measureWidget.linearUnitMenu.domNode, "obliqueViewerWidgetDiv");
        }
      },

      publishMeasureResult: function(measureResponse) {
        this.publishData({
          measureResult: measureResponse.measureResult
        });
      },

      // _showNoRecordExtent: function(extent) {
      //   if (this.obliqueExtentGraphic) {
      //    this.obliqueExtentGraphic.hide();
      //   }
      //   if (this.noImageExtentGraphic) {
      //     this.noImageExtentGraphic.setGeometry(extent);
      //     this.noImageExtentGraphic.show();
      //   } else {
      //     this.noImageExtentGraphic = this.map.graphics.add(new Graphic(extent, this.noImageExtentSymbol));
      //   }
      //   if (this.map.extent.contains(extent) || !this.config.ObliqueViewer.autoSync) {
      //     return;
      //   }
      //   this._updateNadirExtent(false, extent);
      // },

      _updateExtentOnNadirMap: function(evt) {
        var simplifiedGeometry = (evt.geometry !== null) ? geometryEngine.simplify(evt.geometry) : evt.geometry;
        if (this.noImageExtentGraphic) {
          this.noImageExtentGraphic.hide();
        }
        if (this.obliqueExtentGraphic) {
          this.obliqueExtentGraphic.setGeometry(simplifiedGeometry);
          this.obliqueExtentGraphic.show();
        } else {
          this.obliqueExtentGraphic = this.map.graphics.add(new Graphic(simplifiedGeometry, this.obliqueExtentSymbol));
        }
        //to hide the graphic in oblique map when the point is not in the viewed extent
        if (this.locatePoint && simplifiedGeometry) {
         this.ovMap.graphics.show();
         if (!geometryEngine.within(this.locatePoint,simplifiedGeometry)) {
            this.ovMap.graphics.clear();
          }
        } else {
          this.ovMap.graphics.clear();
        }
        if (this.map.extent.contains(simplifiedGeometry) || !this.config.ObliqueViewer.autoSync) {
          return;
        }
        if (evt.geometry) {
          this._updateNadirExtent(false, evt.geometry.getExtent());
        }
      },

      _updateNadirExtent: function(center, extent) {
        if (center) {
          this.map.setExtent(this.map.extent.centerAt(this.oblique.nadirExtent.getCenter()));
        } else {
          if (extent) {
            this.map.setExtent(this._getAdjustedExtent(this.map.extent, extent));
          }
        }
      },

      _getAdjustedExtent: function(mapExtent, containedExtent) {
        if (!mapExtent || !containedExtent) {
          return;
        }
        var dx = 0, dy = 0;
        mapExtent = lang.clone(mapExtent);
        if (containedExtent.xmax > mapExtent.xmax) {
          dx = containedExtent.xmax - mapExtent.xmax;
        } else if (containedExtent.xmin < mapExtent.xmin) {
          dx = containedExtent.xmin - mapExtent.xmin;
        }

        if (containedExtent.ymax > mapExtent.ymax) {
          dy = containedExtent.ymax - mapExtent.ymax;
        } else if (containedExtent.ymin < mapExtent.ymin) {
          dy = containedExtent.ymin - mapExtent.ymin;
        }

        return mapExtent.offset(dx, dy);
      },

      _handleZoomButton: function(evt) {
        var azimuth = evt.azimuth;
        if (azimuth === null || typeof azimuth === "undefined") {
          this.zoomButton.set("disabled", true);
        } else {
          this.zoomButton.set("disabled", false);
        }
      },
      _closeDropDown: function() {
        this.dropDown.closeDropDown();
      },
      //added to show overlay error message
      _showNoImageNotification: function(event) {
        this.ovMap.graphics.clear();
        domStyle.set(this.infoDiv, "display", "block");
        this.imageLayer.hide();
        //this._showNoRecordExtent(event.extent);
        if (this.obliqueExtentGraphic) {
          this.obliqueExtentGraphic.hide();
         }
      },
      _hideNoImageNotification: function() {
        domStyle.set(this.infoDiv, "display", "none");
        this.imageLayer.show();
      },
      _locateClick: function(state) {
        var mapLocateEvt;

        if (state) {
          this.map.setMapCursor("crosshair");
          this.map.disableMapNavigation();
          this.map.setInfoWindowOnClick(false);
          this.own(mapLocateEvt = this.map.on("click", lang.hitch(this, function(evt) {
            mapLocateEvt.remove();
            this.map.enableMapNavigation();
            this.map.setInfoWindowOnClick(true);

            this.locateButton.set("checked", false);
            this.map.setMapCursor("default");
            this._clearAll();
            this._addPoint(evt.mapPoint);
          })));
        } else {
          this.map.setMapCursor("default");
          this.map.enableMapNavigation();
          this.map.setInfoWindowOnClick(true);
          if (mapLocateEvt) {
            mapLocateEvt.remove();
          }
        }
      },
      _clearAll: function() {
        this.map.graphics.clear();
        this.ovMap.graphics.clear();
        delete this.obliqueExtentGraphic;
        delete this.noImageExtentGraphic;
      },
      _addPoint: function(point) {
       var geometry;
       if (this.config.ObliqueViewer.searchRadius > 0) {
        var polygon = geometryEngine.buffer(point, this.config.ObliqueViewer.searchRadius, this.config.ObliqueViewer.searchUnit);
        geometry = polygon;
       } else {
        geometry = point;
       }
        this.locatePoint = point;
        this.oblique.locate(geometry);
        this.map.graphics.add(new Graphic(point, this.nativePointSymbol));
      },
      _showPoint: function(event) {
        this.ovMap.graphics.clear();
        this.ovMap.graphics.add(new Graphic(event.point, this.nativePointSymbol));
      },
      _addTitlePane: function() {
        var myDialog = new TooltipDialog({
          content: '<div id="rasterListDiv"></div>'
        });

        this.dropDown = new DropDownButton({
          label: this.nls.rasterListLabel,
          showLabel: false,
          iconClass: 'rastersListIcon',
          dropDown: myDialog
        }, this.listTitlePaneDiv);

        this.own(
        myDialog.on("open", lang.hitch(this, this._enableRasterList)),
        myDialog.on("close", lang.hitch(this, this._disableRasterList))
        );

        this.dropDown.startup();

        domClass.add(myDialog.domNode, "obliqueViewerWidgetDiv");
      },

      _disableRasterList: function() {
        this.oblique.set("rasterListRefresh", false);
      },

      _enableRasterList: function() {
        this.oblique.set("rasterListRefresh", true);
      },

      _addZoomButton: function() {
        this.zoomButton = new Button({
          showLabel: false,
          iconClass: 'zoomIcon',
          label: this.nls.zoomButtonLabel,
          disabled: false,
          'class': 'zoomButtonContainer'
        }, this.zoomButtonContainer);
      },
      _addLocateButton: function() {
        this.locateButton = new ToggleButton({
          showLabel: false,
          iconClass: 'locateIcon',
          label: this.nls.locateButtonLabel,
          'class': 'locateButtonContainer'
        }, this.locateButtonContainer);
      },
      _addClearButton: function() {
        this.clearButton = new Button({
          showLabel: false,
          iconClass: 'clearIcon',
          label: this.nls.clearButtonLabel,
          'class': 'clearButtonContainer'
        }, this.clearButtonContainer);
      },

      _addSyncButton: function() {
        if (!this.config.ObliqueViewer.autoSync) {
          this.syncButton = new Button({
            showLabel: false,
            iconClass: 'syncIcon',
            label: this.nls.syncButtonLabel,
            'class': 'syncButtonContainer'
          }, this.syncButtonContainer);
        } else {
          domStyle.set(this.syncButtonContainer, "display", "none");
        }
      },

      onClose: function() {
        this._clearAll();
      },
      _getLayerUrl: function(layerTitle) {
        var operLayers = this.map.itemInfo.itemData.operationalLayers,
                layer,
                layerUrl, obliqueServiceLayer;

        for (layer in operLayers) {
          if (operLayers.hasOwnProperty(layer)) {
            if (operLayers[layer].title === layerTitle) {
              obliqueServiceLayer = operLayers[layer];
              var layerObject = obliqueServiceLayer.layerObject;
              layerUrl = obliqueServiceLayer.url;
              this.renderingRule = layerObject.renderingRule;
              this.mosaicRule = layerObject.mosaicRule;
              this.imageFormat = layerObject.format;
              this.compressionQuality = layerObject.compressionQuality;
            }
          }
        }

        return layerUrl;
      }
    });

    return clazz;
  });