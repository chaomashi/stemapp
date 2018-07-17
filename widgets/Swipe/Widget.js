define([
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/_base/html',
  'dojo/query',
  'dojo/on',
  'dojo/Deferred',
  './utils',
  'jimu/BaseWidget',
  'jimu/LayerInfos/LayerInfos',
  'dijit/_WidgetsInTemplateMixin',
  'esri/dijit/LayerSwipe',
  'dijit/form/Select'
], function (declare, array, lang, html, query, on, Deferred, utils,
  BaseWidget, LayerInfos, _WidgetsInTemplateMixin, LayerSwipe) {
  return declare([BaseWidget, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-swipe',

    swipeDijit: null,
    layerInfosObj: null,

    _currentLayerId: null,
    _loadDef: null,

    _obtainedLabelLayers: [],//label layer independent with main-label-layer

    postCreate: function () {
      this.inherited(arguments);

      this.own(on(this.swipeLayers, 'Change', lang.hitch(this, this.onSwipeLayersChange)));
      this.own(on(this.swipeLayers, 'Click', lang.hitch(this, this.onSwipeLayersClick)));
      this.own(on(
        this.swipeLayers.dropDown.domNode,
        'mouseenter',
        lang.hitch(this, this.onDropMouseEnter)
      ));
      this.own(on(
        this.swipeLayers.dropDown.domNode,
        'mouseleave',
        lang.hitch(this, this.onDropMouseLeave)
      ));
      this.own(on(this.map, 'layer-add', lang.hitch(this, this._onMainMapBasemapChange)));
    },

    _loadLayerInfos: function () {
      var def = new Deferred();
      this._loadDef = def;
      if (!this._loadDef.isResolved()) {
        LayerInfos.getInstance(this.map, this.map.itemInfo)
          .then(lang.hitch(this, function (layerInfosObj) {
            if (!def.isCanceled()) {
              this.layerInfosObj = layerInfosObj;
              this.own(on(layerInfosObj,
                'layerInfosChanged',
                lang.hitch(this, this.onLayerInfosChanged)));
              this.own(on(
                layerInfosObj,
                'layerInfosIsShowInMapChanged',
                lang.hitch(this, this.onLayerInfosIsShowInMapChanged)));

              if (this.config.style === 'scope') {
                this.hintNode.innerHTML = this.nls.spyglassText;
              } else {
                this.hintNode.innerHTML = this.nls.swipeText;
              }
              html.addClass(this.swipeIcon, 'swipe-icon-loaded');

              def.resolve();
            }
          }));
      } else {
        def.resolve();
      }

      return def;
    },

    _getVisibleLayerInfos: function (exception) {
      var infos = this.layerInfosObj.getLayerInfoArray();
      return array.filter(infos, function (info) {
        return info.isShowInMap() || (exception && exception === info.id);//showing or layerId=exception
      });
    },

    _isNewAddedLayer: function (layerInfo) {
      var webmapLayerInfoArray = this.layerInfosObj.getLayerInfoArrayOfWebmap();
      for (var i = 0, len = webmapLayerInfoArray.length; i < len; i++) {
        var webmapLayerInfo = webmapLayerInfoArray[i];
        if (webmapLayerInfo.id === layerInfo.id) {
          return false;
        }
      }

      return true;
    },

    _setOptionsOfSwipeLayers: function (layerInfos) {
      var data = [];
      if (!this.config.layerState) {
        //1 for old config:
        data = array.map(layerInfos, lang.hitch(this, function (info) {
          var mapInfo = {
            label: info.title,
            value: info.id
          };
          return mapInfo;//use all layers in layerInfo
        }));
      } else {
        //2 for new config:
        //2.1 layers in config or map
        if (utils.isTherePreconfiguredLayer(this.config, this._currentLayerId)) {
          var layerOptions = this.config.layerState;
          for (var key in layerOptions) {
            if (layerOptions.hasOwnProperty(key)) {
              var layer = layerOptions[key];
              if (true === layer.selected) {//selected in config
                var layerInfo = this.layerInfosObj.getLayerInfoById(key);
                if (layerInfo) {
                  if (layerInfo.isShowInMap()) {
                    var title = layerInfo.title;
                    data.push({ value: key, label: title });//add option
                  } else {
                    //invisible ignore
                  }
                } else {
                  //be removed, ignore
                }
              }
            }
          }
        }
        //2.2 new added layers(such as GP)
        for (var i = 0, len = layerInfos.length; i < len; i++) {
          var info = layerInfos[i];

          if (this._isNewAddedLayer(info) && info.isShowInMap()) {
            var layerTitle = info.title;
            data.push({ value: info.id, label: layerTitle });//add option
          }
        }
      }

      this.swipeLayers.set('options', data);

      //show / hide selector by layer number
      utils.showSelectorPopup(this.domNode);
      if (data && data.length > 0) {

        if (this._currentLayerId) {
          //use this._currentLayerId first, must set this._currentLayerId befor _setOptionsOfSwipeLayers
          this.swipeLayers.set('value', this._currentLayerId);
        } else if (!utils.isTherePreconfiguredLayer(this.config, this._currentLayerId) &&
          this.swipeLayers.options && "undefined" !== this.swipeLayers.options.length &&
          this.swipeLayers.options.length > 0 && this.swipeLayers.options[0].value) {
          //auto select the 1st new added layer, when no preconfig layer
          this.swipeLayers.set('value', this.swipeLayers.options[0].value);
        } else {
          this.swipeLayers.set('value', null);
        }

        if (1 === data.length) {
          utils.hideSelectorPopup(this.domNode);//hide chooser, when there is only one layer to swipe
        }
      } else {
        this.swipeLayers.set('options', [{ value: "", label: "" }]);//set a empty list to select
        this.swipeLayers.reset();

        utils.hideSelectorPopup(this.domNode);//hide chooser
      }
    },

    _loadSwipeDijit: function (layerInfos) {
      var config = lang.clone(this.config);
      if (!config.style) {
        config.style = 'vertical';
      }

      var isBasemap = false;

      if (utils.isTherePreconfiguredLayer(this.config, this._currentLayerId)) {
        //get _currentLayerId
        if (!this._currentLayerId) {
          var layer = this.map.getLayer(config.layer);
          if (!layer) {
            var layerId = null;
            if (layerInfos.length > 0) {
              layerId = layerInfos[0].id;
            } else {
              isBasemap = true;
            }
            config.layer = layerId;
          } // esle don't change

          this._currentLayerId = config.layer;
        } else {
          //already set _currentLayerId, keep it
        }
      }

      this.createSwipeDijit(this._currentLayerId, isBasemap);
    },

    _enableSwipe: function () {
      if (this._obtainedLabelLayers &&
        this._obtainedLabelLayers.length && this._obtainedLabelLayers.length > 0) {
        this._obtainedLabelLayers = [];

        var layerId = this.swipeLayers.get('value');
        var isBasemap = !(!!layerId);
        var layerParams = this._getLayerParams(layerId, isBasemap);
        this.swipeDijit.set('layers', layerParams);
      }

      this.swipeDijit.enable();
    },

    _disableSwipe: function () {
      if (this.swipeDijit && this.swipeDijit.disable) {
        this.swipeDijit.disable();

        array.forEach(this._obtainedLabelLayers, lang.hitch(this, function (labelLayer) {
          labelLayer.restoreLabelControl();
        }));
      }
    },

    onOpen: function () {
      if (true === this._isTestSizeFlag) {
        return;//skip first on-open(1st open called from jimu)
      }

      // if (this.swipeDijit && false === this.swipeDijit.enabled) {
      //   this._enableSwipe();
      //   return;//just enable, on need to re-create
      // }

      //re-create
      this._loadLayerInfos().then(lang.hitch(this, function () {
        var infos = this._getVisibleLayerInfos();

        //swipe dijit
        this._loadSwipeDijit(infos);

        //options
        this.swipeLayers.set('disabled', true);//set disabled=true to escape events

        this._setOptionsOfSwipeLayers(infos);
        this.swipeLayers.set('disabled', false);

        this.swipeLayers.set('value', this._currentLayerId);
      }));
    },

    onClose: function () {
      if (true === this._isTestSizeFlag) {
        return;//skip first on-open(1st open from jimu)
      }

      if (this._loadDef.isResolved()) {
        this._disableSwipe();
      } else if (!this._loadDef.isFulfilled()) {
        this._loadDef.cancel();
      }
    },

    onDropMouseEnter: function () {
      this._mouseOnDropDown = true;
    },

    onDropMouseLeave: function () {
      this._mouseOnDropDown = false;
      this.swipeLayers.dropDown.onCancel();
    },

    onMenuMouseLeave: function () {
      setTimeout(lang.hitch(this, function () {
        if (!this._mouseOnDropDown) {
          this.swipeLayers.dropDown.onCancel();
        }
      }), 10);
    },

    onSwipeLayersChange: function () {
      if (!this.swipeDijit) {
        return;
      }
      //this.destroySwipeDijit();
      var layerId = this.swipeLayers.get('value');
      this._currentLayerId = layerId;
      var isBasemap = !(!!layerId);
      this.createSwipeDijit(layerId, isBasemap);

      var lastLayerInfo = this.layerInfosObj.getLayerInfoById(this._currentLayerId);
      if (lastLayerInfo && !lastLayerInfo.isShowInMap()) {
        this.swipeLayers.removeOption(this._currentLayerId);
      }

      utils.zoomToCurrentLayer(this);

      // change the width of swipe menu to wrapping Select dijit
      var selectBox = html.getMarginBox(this.swipeLayers.domNode);
      // padding of swipeLayersMenu is 14, max-width of domNode is 350
      if (selectBox.w + 14 * 2 > 350) {
        html.setStyle(this.domNode, 'maxWidth', (selectBox.w + 28) + 'px');
      } else {
        html.setStyle(this.domNode, 'maxWidth', '');
      }
    },

    onSwipeLayersClick: function () {
      if (!this.swipeLayers.disabled) {
        var box = html.getMarginBox(this.swipeLayers.dropDown.domNode);
        //console.log(box);
        // padding of swipeLayersMenu is 14, max-width of domNode is 350
        if (box.w + 14 * 2 > 350) {
          html.setStyle(this.domNode, 'maxWidth', (box.w + 28) + 'px');
        }
      }
    },

    createSwipeDijit: function (layerId, isBasemap) {
      this.destroySwipeDijit();

      var layerParams = this._getLayerParams(layerId, isBasemap);

      var options = {
        type: this.config.style || 'vertical',
        map: this.map,
        layers: layerParams
      };
      if (this.config.style !== "scope") {
        var middlePosition = utils.getScreenMiddle(this.map);
        options.top = middlePosition.top;//hack for spyglass mode: can't center it when set top/left
        options.left = middlePosition.left;
      }

      this.swipeDijit = new LayerSwipe(options, this.layerSwipe);
      this.swipeDijit.startup();

      this._setHandleColor();

      this._enableSwipe();

      html.place(this.swipeDijit.domNode, this.map.root, 'before');
      var hideInfoWindow = this._shouldHideInfoWindow(layerParams);
      if (hideInfoWindow) {
        this.map.infoWindow.hide();
      }
      this.swipeDijit.on('swipe', lang.hitch(this, function (evt) {
        var swipeLayers = array.map(evt.layers, function (l) {
          return l.layer;
        });
        var inSwipeLayers = this._shouldHideInfoWindow(swipeLayers);
        if (inSwipeLayers) {
          this.map.infoWindow.hide();
        }
      }));

      utils.hackToRefreshSwipe(this);//force refresh ui
    },

    _shouldHideInfoWindow: function (swipeLayers) {
      if (!this.map.infoWindow.isShowing) {
        return false;
      }
      var sf = this.map.infoWindow.getSelectedFeature();
      var inSwipeLayers = swipeLayers && array.some(swipeLayers, function (l) {
        var sfLayer = sf && sf.getLayer && sf.getLayer();
        var layerInfo = this.layerInfosObj.getLayerInfoById(l.id);
        var isSubLayer = sfLayer && layerInfo &&
          layerInfo.traversal(function (linfo) {
            return linfo.id === sfLayer.id;
          });
        return sfLayer === l || isSubLayer;
      }, this);

      return inSwipeLayers;
    },

    _getLayerParams: function (layerId, isBasemap) {
      if (false === utils.isTherePreconfiguredLayer(this.config, this._currentLayerId)) {
        layerId = null;
      }

      var info = this.layerInfosObj.getLayerInfoById(layerId);
      var layerParams = [];
      if (isBasemap) {
        //1.can't swipe any layer, so swipe basemaps
        var basemaps = this.layerInfosObj.getBasemapLayers();
        array.forEach(basemaps, lang.hitch(this, function (basemap) {
          layerParams.push(this.map.getLayer(basemap.id));
        }));
      } else {
        if (info && info.traversal) {
          //2.swipe layer that in layerInfos
          info.traversal(lang.hitch(this, function (_info) {
            var layer = this.map.getLayer(_info.id);
            if (layer) {
              layerParams.push(layer);
              this._obtainLabelControl(_info, layerParams);
            }
          }));
        } else {
          //3.for change map: should be empty, so should swipe basemaps
          var basemaps2 = this.layerInfosObj.getBasemapLayers();
          array.forEach(basemaps2, lang.hitch(this, function (basemap) {
            layerParams.push(this.map.getLayer(basemap.id));
          }));
        }
      }
      return layerParams;
    },
    /*
    _getLayerParams: function (layerIds, isBasemap) {
      var layerParams = [];

      layerIds = ["mapNotes_2635","NOAA_Tracks_1851_2007_82","EarthquakesFromLastSevenDays_3784"];
      array.forEach(layerIds, lang.hitch(this, function (layerId) {
        var info = this.layerInfosObj.getLayerInfoById(layerId);
        if (isBasemap) {
          //1.can't swipe any layer, so swipe basemaps
          var basemaps = this.layerInfosObj.getBasemapLayers();
          array.forEach(basemaps, lang.hitch(this, function (basemap) {
            layerParams.push(this.map.getLayer(basemap.id));
          }));
        } else {
          if (info && info.traversal) {
            //2.swipe layer that in layerInfos
            info.traversal(lang.hitch(this, function (_info) {
              var layer = this.map.getLayer(_info.id);
              if (layer) {
                layerParams.push(layer);
                this._obtainLabelControl(_info, layerParams);
              }
            }));
          } else {
            //3.for change map: should be empty, so should swipe basemaps
            var basemaps2 = this.layerInfosObj.getBasemapLayers();
            array.forEach(basemaps2, lang.hitch(this, function (basemap) {
              layerParams.push(this.map.getLayer(basemap.id));
            }));
          }
        }
      }));

      return layerParams;
    },
    */
    destroySwipeDijit: function () {
      if (this.swipeDijit && this.swipeDijit.destroy) {
        this.swipeDijit.destroy();
        this.swipeDijit = null;

        this._restoreAllLabelControl();

        this.layerSwipe = html.create('div', {}, this.swipeLayersMenu, 'after');
      }
    },

    //layer added / removed
    onLayerInfosChanged: function (layerInfo, changedType, layerInfoSelf) {
      if (!this.swipeDijit || !this.swipeDijit.enabled) {
        return;
      }

      var _currentId = this.swipeLayers.get('value');
      var newLayerId = null;

      this._currentLayerId = layerInfoSelf && layerInfoSelf.id === _currentId ?
        null : // _currentLayerId be removed
        (_currentId || this._currentLayerId);

      var infos = this._getVisibleLayerInfos(this._currentLayerId);
      this._setOptionsOfSwipeLayers(infos || layerInfo);
      if (changedType === 'removed') {
        if (_currentId === layerInfoSelf.id) { // remove currentLayer
          if (this._currentLayerId || (infos[0] && infos[0].id)) {
            newLayerId = this._currentLayerId || infos[0].id;
          } else { // only the basemap
            this.createSwipeDijit(null, true);
          }
        } // remove others do nothing
      } else if (changedType === 'added') {
        newLayerId = this.swipeDijit.layers[0].id;
      }
      this.swipeLayers.set('value', newLayerId);
    },
    //layer visible / inVisible
    onLayerInfosIsShowInMapChanged: function () {
      if (!this.swipeDijit || !this.swipeDijit.enabled) {
        return;
      }

      var infos = this._getVisibleLayerInfos(this._currentLayerId);
      this._setOptionsOfSwipeLayers(infos);

      var currentLayers = this.swipeDijit.layers;
      var basemaps = this.layerInfosObj.getBasemapLayers();
      var swipeBasemap = array.every(basemaps, function (bm) {
        return array.some(currentLayers, function (cl) {
          return cl.id === bm.id;
        });
      });
      if (swipeBasemap && infos && infos[0] && infos[0].id) {
        this.swipeLayers.set('value', infos[0].id);
        // there have a bug in Select dijit,so call this method manually
        this.onSwipeLayersChange();
      }

    },

    _onMainMapBasemapChange: function (evt) {
      if (!(evt.layer && evt.layer._basemapGalleryLayerType)) {
        return;
      }
      var options = this.swipeLayers.get('options');
      if (options && options.length > 0) {
        return;
      } else if (this._loadDef.isResolved()) {
        //this.destroySwipeDijit();
        this.createSwipeDijit(null, true);
      }
    },

    destroy: function () {
      this.destroySwipeDijit();
      this.inherited(arguments);
    },

    //swipe label layer
    _obtainLabelControl: function (info, layerParams) {
      var labelLayer = info.obtainLabelControl();
      if (labelLayer) {
        layerParams.push(labelLayer);

        this._obtainedLabelLayers.push(info);
      }
    },
    _restoreAllLabelControl: function () {
      array.forEach(this._obtainedLabelLayers, lang.hitch(this, function (labelLayer) {
        labelLayer.restoreLabelControl();
      }));
      this._obtainedLabelLayers = [];
    },

    //handle color
    _setHandleColor: function () {
      if (!this.swipeDijit || this.config.style === "scope") {
        return;
      }

      var moveable = this.swipeDijit.moveable.node;
      var container = query(".handleContainer", this.esriTimeSlider)[0];
      var handle = query(".handle", container)[0];

      if (moveable) {
        html.setStyle(moveable, "backgroundColor", utils.processColor(this.config.handleColor).toHex());
      }
      if (container) {
        html.setStyle(container, "backgroundColor", utils.processColor(this.config.handleColor).toHex());
      }
      if (handle) {
        html.setStyle(handle, "backgroundColor", utils.processColor(this.config.handleColor).toHex());
      }
    }
  });
});