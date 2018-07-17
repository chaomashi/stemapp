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
    'dojo/query',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/_base/declare',
    'dojo/_base/xhr',
    'dojo/_base/Color',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidgetSetting',
    'jimu/LayerInfos/LayerInfos',
    'dijit/form/ValidationTextBox',
    'dijit/form/CheckBox',
    'jimu/dijit/Popup',
    'jimu/dijit/SimpleTable',
    'jimu/dijit/ImageChooser',
    'jimu/utils',
    'jimu/dijit/Message',
    'jimu/dijit/LayerChooserFromMapWithDropbox',
    'jimu/dijit/LoadingShelter',
    'esri/request',
    'dijit/popup',
    'dojo/_base/lang',
    'dojo/DeferredList',
    'dojo/Deferred',
    'dojo/on',
    'dojo/dom-style',
    'dojo/_base/html',
    'dojo/_base/array',
    './MySymbolPicker',
    './UniqueLayerChooser',
    'dojox/form/FileUploader'
],
  function (
    query,
    domConstruct,
    domClass,
    declare,
    xhr,
    dojoColor,
    _WidgetsInTemplateMixin,
    BaseWidgetSetting,
    LayerInfos,
    ValidationTextBox,
    CheckBox,
    Popup,
    Table,
    ImageChooser,
    utils,
    Message,
    LayerChooserFromMapSelect,
    LoadingShelter,
    esriRequest,
    dijitPopup,
    lang,
    DeferredList,
    Deferred,
    on,
    domStyle,
    html,
    array,
    SymbolPicker,
    UniqueLayerChooser
    ) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-InfoSummary-setting',
      _layerInfos: null,
      mpi: null,
      layer_options: [],
      refreshLayers: [],
      displayPanelIcon: false,
      used_layers: [],
      unsupported_ids: [],

      postCreate: function () {
        this.inherited(arguments);

        this.opLayers = this.map.itemInfo.itemData.operationalLayers;
        if (this.opLayers.length === 0) {
          domStyle.set(this.btnAddLayer, "display", "none");
          domStyle.set(this.optionsContainer, "display", "none");
          domStyle.set(this.displayOptionsContainer, "display", "none");
          this._disableOk();
          new Message({
            message: this.nls.missingLayerInWebMap
          });
          return;
        }
        this.shelter = new LoadingShelter({
          hidden: true
        });
        this.setupLayerTable();
        this.setupRefreshInterval();
        this._getAllLayers();
        this.own(on(this.btnAddLayer, 'click', lang.hitch(this, this._addLayerRow)));
        this.own(on(this.hidePanelOptions, 'change', lang.hitch(this, function (v) {
          this.hidePanel = v;
          this.panelCountOptions.set('disabled', v);
          this.panelIconOptions.set('disabled', v);
          this.expandListOptions.set('disabled', v);
          this.showAllFeaturesOptions.set('disabled', v);
          var previewContainer;
          if (v) {
            html.addClass(this.panelIconOptionsLabel, 'text-disabled');
            html.addClass(this.panelCountOptionsLabel, 'text-disabled');
            html.addClass(this.expandListOptionsLabel, 'text-disabled');
            html.addClass(this.showAllFeaturesOptionsLabel, 'text-disabled');
            this.displayPanelIcon = false;
            previewContainer = query('.mainPanelPreviewContainerOn', this.mainPanelPreviewContainer.domNode)[0];
            if (previewContainer) {
              html.removeClass(previewContainer, "mainPanelPreviewContainerOn");
              html.addClass(previewContainer, "mainPanelPreviewContainerOff");
            }
            if (domClass.contains(this.hidePanelHelpText, 'help-off')) {
              html.removeClass(this.hidePanelHelpText, 'help-off');
            }
            html.addClass(this.hidePanelHelpText, 'help-on');
          } else {
            html.removeClass(this.panelIconOptionsLabel, 'text-disabled');
            html.removeClass(this.panelCountOptionsLabel, 'text-disabled');
            html.removeClass(this.expandListOptionsLabel, 'text-disabled');
            html.removeClass(this.showAllFeaturesOptionsLabel, 'text-disabled');
            if (this.panelIconOptions.checked) {
              this.displayPanelIcon = true;
              previewContainer = query('.mainPanelPreviewContainerOff', this.mainPanelPreviewContainer.domNode)[0];
              if (previewContainer) {
                html.removeClass(previewContainer, "mainPanelPreviewContainerOff");
                html.addClass(previewContainer, "mainPanelPreviewContainerOn");
              }
            }
            if (domClass.contains(this.hidePanelHelpText, 'help-on')) {
              html.removeClass(this.hidePanelHelpText, 'help-on');
            }
            html.addClass(this.hidePanelHelpText, 'help-off');
          }
        })));
        this.own(on(this.panelCountOptions, 'change', lang.hitch(this, function (v) {
          this.countEnabled = v;
        })));
        this.own(on(this.panelIconOptions, 'change', lang.hitch(this, function () {
          var previewContainer;
          if (this.panelIconOptions.checked) {
            this.displayPanelIcon = true;
            previewContainer = query('.mainPanelPreviewContainerOff', this.mainPanelPreviewContainer.domNode)[0];
            html.removeClass(previewContainer, "mainPanelPreviewContainerOff");
            html.addClass(previewContainer, "mainPanelPreviewContainerOn");
          } else {
            this.displayPanelIcon = false;
            previewContainer = query('.mainPanelPreviewContainerOn', this.mainPanelPreviewContainer.domNode)[0];
            html.removeClass(previewContainer, "mainPanelPreviewContainerOn");
            html.addClass(previewContainer, "mainPanelPreviewContainerOff");
          }
        })));
      },

      startup: function () {
        this.inherited(arguments);
        this.refreshLayers = [];

        this.imageChooser = new ImageChooser({
          format: [ImageChooser.GIF, ImageChooser.JPEG, ImageChooser.PNG],
          label: this.nls.uploadImage,
          cropImage: false,
          showTip: false,
          goldenWidth: 10,
          goldenHeight: 15
        });

        domStyle.set(this.imageChooser.domNode, "font-size", "14px");
        html.place(this.imageChooser.domNode, this.mainPanelPreviewButton, 'replace');

        this.connect(this.imageChooser, "onImageChange", "uploadImage");
        this.isInitalLoad = false;
      },

      setupRefreshInterval: function () {
        this.refreshInterval.invalidMessage = this.nls.invalidInterval;
        this.refreshInterval.missingMessage = this.nls.missingRefreshValue;
      },

      setupLayerTable: function () {
        var fields = [{
          name: "layer",
          title: this.nls.layerName,
          "class": "label",
          type: "empty",
          width: "320px"
        }, {
          name: "label",
          "class": "label",
          title: this.nls.layerLabel,
          type: "empty",
          width: "255px"
        }, {
          name: "image",
          "class": "label",
          title: this.nls.iconColumnText + " " + this.nls.optionsText,
          width: "110px",
          actions: ["edit"],
          type: "actions"
        }, {
          name: "refresh",
          "class": "label",
          title: this.nls.layerRefresh,
          type: "empty",
          width: "80px"
        }, {
          name: "actions",
          "class": "label",
          title: this.nls.actions,
          type: "actions",
          actions: ["up", "down", "delete"],
          width: "93px"
        }];

        this.displayLayerTable = new Table({
          fields: fields,
          selectable: false,
          autoHeight: true
        });

        this.displayLayerTable.placeAt(this.layerTable);
        this.displayLayerTable.startup();
        this.own(on(this.displayLayerTable, 'actions-edit', lang.hitch(this, this._pickSymbol)));
        this.own(on(this.displayLayerTable, 'row-delete', lang.hitch(this, this._rowDeleted)));
      },

      _getAllLayers: function () {
        if (this.map.itemId) {
          LayerInfos.getInstance(this.map, this.map.itemInfo)
            .then(lang.hitch(this, function (operLayerInfos) {
              this.operLayerInfos = operLayerInfos;
              this.wmLayerInfos = operLayerInfos.getLayerInfoArrayOfWebmap();
              this.configLayerInfos = this.config.layerInfos;
              this._updateLayerIDs();
              if (this.config.upgradeFields) {
                this._upgradeFields();
              }
              this.shelter.placeAt(this.domNode);
              this.shelter.startup();
              this.shelter.show();
              this._setLayers(operLayerInfos.getLayerInfoArray()).then(lang.hitch(this, function () {
                this.setConfig(this.config);
                this.shelter.hide();
              }));
            }));
        }
      },

      _updateLayerIDs: function () {
        var removeIDs = [];
        config_layer_loop:
        for (var i = 0; i < this.configLayerInfos.length; i++) {
          var configLayer = this.configLayerInfos[i];
          var jimuLayerInfo = this.operLayerInfos.getLayerInfoById(configLayer.id);

          //If we cannot find the jimu layer info based on the stored ID we need to determine it
          if (!jimuLayerInfo) {
            var updated = false;
            wm_layer_loop:
            for (var ii = 0; ii < this.wmLayerInfos.length; ii++) {
              var _opLayer = this.wmLayerInfos[ii];
              //var opLayer = this.layerInfos[ii];
              var originOpLayer = _opLayer ? _opLayer.originOperLayer : undefined;

              var urlId = this._compareURL(originOpLayer, configLayer);
              var itemId = this._compareItemID(originOpLayer, configLayer);
              var subId = this._compareSubId(_opLayer, configLayer);

              var id = urlId ? urlId : itemId ? itemId : subId ? subId : undefined;
              jimuLayerInfo = id ? this.operLayerInfos.getLayerInfoById(id) : jimuLayerInfo;

              if (jimuLayerInfo) {
                this.configLayerInfos[i].id = jimuLayerInfo.id;
                this.configLayerInfos[i].layer = jimuLayerInfo.id;
                updated = true;
                break wm_layer_loop;
              }
            }

            if (!updated && !jimuLayerInfo) {
              removeIDs.push(i);
            }
          }
        }

        if (removeIDs.length > 0) {
          //removeIDs.sort((a, b) => (b - a));
          removeIDs.sort(function (a, b) { return b - a; });
          array.forEach(removeIDs, lang.hitch(this, function (id) {
            this.configLayerInfos.splice(id, 1);
          }));
        }
      },

      _compareSubId: function (opLayer, configLayer) {
        if (opLayer && opLayer.subId && opLayer.subId.indexOf(configLayer.id) > -1) {
          if (opLayer.layerObject) {
            var geomMatch = this._compareGeom(opLayer.layerObject, configLayer);
            var fieldMatch = this._compareFields(opLayer.layerObject, configLayer);
            if (geomMatch && fieldMatch) {
              return opLayer.subId;
            }
          }
        }
        return undefined;
      },

      _compareItemID: function (originOpLayer, configLayer) {
        if (originOpLayer && originOpLayer.itemId && originOpLayer.itemId === configLayer.itemId) {
          if (originOpLayer.featureCollection && originOpLayer.featureCollection.layers &&
            originOpLayer.featureCollection.layers.hasOwnProperty('length')) {
            var fcLayers = originOpLayer.featureCollection.layers;
            for (var i = 0; i < fcLayers.length; i++) {
              var fcLayer = fcLayers[i];
              if (this._compareGeom(fcLayer, configLayer)) {
                if (this._compareFields(fcLayer, configLayer)) {
                  return fcLayer.id;
                }
              }
            }
            return undefined;
          }
        }
      },

      _compareURL: function (originOpLayer, configLayer) {
        return (originOpLayer && originOpLayer.url && configLayer.url && originOpLayer.url === configLayer.url) ?
          originOpLayer.id : undefined;
      },

      _compareGeom: function (layerObject, configLayer) {
        return (layerObject && layerObject.geometryType && configLayer.geometryType) ?
          layerObject.geometryType === configLayer.geometryType : undefined;
      },

      _compareFields: function (layerObject, configLayer) {
        var fieldMatch;
        if (layerObject && layerObject.fields && configLayer.fields &&
          layerObject.fields.length === configLayer.fields.length) {
          //test if Names match
          var matchingFields = layerObject.fields.filter(function (f) {
            for (var fn = 0; fn < configLayer.fields.length; fn++) {
              var configField = configLayer.fields[fn];
              if (f.name === configField.name) {
                return f;
              }
            }
          });
          fieldMatch = matchingFields.length === layerObject.fields.length;
        }
        return fieldMatch;
      },

      /*jshint loopfunc:true */
      _setLayers: function (layerInfos) {
        var def = new Deferred();
        var unSupportedLayerTypes = ["esri.layers.WMSLayer", "esri.layers.ArcGISImageServiceLayer",
          "esri.layers.ArcGISImageServiceVectorLayer", "esri.layers.ArcGISTiledMapServiceLayer", "ClusterLayer"];
        this.gtQueries = [];
        this.gtQueryUrls = [];
        var options = [];
        var rootLayerIDs = [];
        for (var i = 0; i < layerInfos.length; i++) {
          var layerInfo = layerInfos[i];
          var supportsDL = layerInfo.layerObject.hasOwnProperty('supportsDynamicLayers') ?
            layerInfo.layerObject.supportsDynamicLayers : true;
          var type = layerInfo.layerObject.declaredClass;
          var itemId = this._checkItemId(layerInfo, type);
          if (unSupportedLayerTypes.indexOf(type) === -1) {
            var rootLayerInfo = layerInfo.getRootLayerInfo();
            if (rootLayerIDs.indexOf(rootLayerInfo.id) === -1) {
              rootLayerIDs.push(rootLayerInfo.id);
              var parentLayerIDs = [];
              var parentLayerTitles = [];
              rootLayerInfo.traversal(lang.hitch(this, function (subLayerInfo) {
                //check if this is a parent layer
                if (subLayerInfo.newSubLayers && subLayerInfo.newSubLayers.length > 0) {
                  //may not need to do this if we can use the layerInfo object to control
                  // layer visibility up the chain...but may need to keep the parent Layer ID in case of duplicate child names
                  // so we can show...oh...wait if we use the jimu layer chooser it has a tree and this would also not be necessary!!
                  if (parentLayerIDs.indexOf(rootLayerInfo.id) === -1) {
                    parentLayerIDs.push(rootLayerInfo.id);
                  }
                  if (parentLayerIDs.indexOf(subLayerInfo.id) === -1) {
                    parentLayerIDs.push(subLayerInfo.id);
                    parentLayerTitles.unshift(subLayerInfo.title);
                  }
                } else {
                  //geomType is necessary for getting and showing symbol options
                  var geomType = subLayerInfo.layerObject.geometryType;
                  if (typeof (geomType) === 'undefined') {
                    geomType = this.setGeometryType(subLayerInfo.layerObject);
                  }

                  var url = subLayerInfo.getUrl();

                  var lyrType;
                  if (url) {
                    lyrType = url.indexOf('MapServer') > -1 ? "Map Service Layer" : "";
                  } else if (type === "esri.layers.FeatureCollection" || type === "Feature Collection" || itemId) {
                    lyrType = "Feature Collection";
                  } else {
                    lyrType = "";
                  }

                  //changed from unshift to push
                  options.push({
                    label: parentLayerTitles.length > 0 ?
                      (parentLayerTitles.join("-") + "-" + subLayerInfo.title) : subLayerInfo.title,
                    value: subLayerInfo.id,
                    url: url,
                    imageData: subLayerInfo.imageData,
                    id: subLayerInfo.id,
                    geometryType: geomType,
                    fields: subLayerInfo.layerObject.fields,
                    _type: type, //NEW type is set...check BC
                    renderer: subLayerInfo.layerObject.renderer,
                    itemId: itemId,
                    infoTemplate: subLayerInfo.getInfoTemplate(),
                    lyrType: lyrType,
                    panelImageData: subLayerInfo.panelImageData,
                    supportsDynamic: supportsDL,
                    oidFieldName: subLayerInfo.layerObject.objectIdField, //NEW...check BC
                    parentLayerID: rootLayerInfo.id, //keeping for BC
                    subLayerId: url ? parseInt(url.substr(url.lastIndexOf('/') + 1), 10) : undefined,
                    scaleRange: subLayerInfo.getScaleRange(),//NEW...check BC
                    selfType: subLayerInfo.originOperLayer.selfType//NEW...check BC
                  });
                }
              }));
            }
          }
        }

        //execute the setGeomType queries
        if (this.gtQueries.length > 0) {
          var queryList = new DeferredList(this.gtQueries);
          //disable add
          html.removeClass(this.btnAddLayer, "btn-add-section enable");
          html.addClass(this.btnAddLayer, "btn-add-section-disabled");
          queryList.then(lang.hitch(this, function (queryResults) {
            var deleteIds = [];
            if (queryResults) {
              if (queryResults.length > 0) {
                for (var q = 0; q < queryResults.length; q++) {
                  var resultInfo = queryResults[q][1];
                  var url = this.gtQueryUrls[q];
                  var lIdx;
                  for (var i = 0; i < this.layer_options.length; i++) {
                    if (url === this.layer_options[i].url) {
                      lIdx = i;
                      break;
                    }
                  }
                  if (typeof (lIdx) !== 'undefined') {
                    if (resultInfo.geometryType) {
                      this.layer_options[lIdx].geometryType = resultInfo.geometryType;
                      if (typeof (resultInfo.drawingInfo) !== 'undefined') {
                        this.layer_options[lIdx].renderer = resultInfo.drawingInfo.renderer;
                        this.layer_options[lIdx].drawingInfo = resultInfo.drawingInfo;
                        this.layer_options[lIdx].fields = resultInfo.fields;

                        var f;
                        for (var ii = 0; ii < resultInfo.fields.length; ii++) {
                          f = resultInfo.fields[ii];
                          if (f.type === "esriFieldTypeOID") {
                            break;
                          }
                        }
                        this.layer_options[lIdx].oidFieldName = f.name;
                      }
                    } else {
                      //some layers from the traffic service don't have a geom type or fields
                      deleteIds.push(lIdx);
                    }
                  }
                }
                //enable add
                html.removeClass(this.btnAddLayer, "btn-add-section-disabled");
                html.addClass(this.btnAddLayer, "btn-add-section enable");
              }
            }
            array.forEach(deleteIds.reverse(), lang.hitch(this, function (id) {
              this.unsupported_ids.push(this.layer_options[id].id);
              this.layer_options.splice(id, 1);
            }));
            def.resolve();
          }));
        } else {
          def.resolve();
        }
        this.layer_options = lang.clone(options);
        return def;
      },

      _checkItemId: function (layerInfo, type) {
        var itemId;
        //some FC return this others return FeatureLayer
        if (type === "esri.layers.FeatureCollection") {
          itemId = layerInfo.isItemLayer();
          itemId = itemId.itemId || itemId;
        } else if (type === "esri.layers.FeatureLayer" || type === 'FeatureLayer') {
          op_layer_loop:
          for (var b = 0; b < this.opLayers.length; b++) {
            var opLayer = this.opLayers[b];
            if (opLayer && opLayer.id && (opLayer.id === layerInfo.id || layerInfo.id.indexOf(opLayer.id) > -1)) {
              type = opLayer.type;
              if (type === 'Feature Collection') {
                itemId = opLayer.itemId;
              }
              break op_layer_loop;
            }
          }
        }
        return itemId;
      },

      setConfig: function (config) {
        this.config = config;

        if (!this.config.mapID || (this.config.mapID && this.config.mapID === this.map.itemId)) {
          this.oldConfig = !this.config.mapID;

          if (this.config.mainPanelText) {
            this.mainPanelText.set('value', this.config.mainPanelText);
          }
          if (this.config.mainPanelIcon) {
            this.panelMainIcon.innerHTML = this.config.mainPanelIcon;
          }

          if (this.config.refreshInterval) {
            this.refreshInterval.set('value', this.config.refreshInterval);
          }

          if (this.config.loadStaticData) {
            this.chkStatic.set('value', this.config.loadStaticData);
          }

          if (this.config.countEnabled) {
            this.panelCountOptions.set('checked', this.config.countEnabled);
          }

          if (typeof (this.config.hidePanel) !== 'undefined') {
            this.hidePanel = this.config.hidePanel;
          } else {
            this.hidePanel = false;
          }
          this.hidePanelOptions.set('checked', this.hidePanel);
          this.panelCountOptions.set('disabled', this.hidePanel);
          this.panelIconOptions.set('disabled', this.hidePanel);
          this.expandListOptions.set('disabled', this.hidePanel);
          this.showAllFeaturesOptions.set('disabled', this.hidePanel);

          if (this.hidePanel) {
            html.addClass(this.panelIconOptionsLabel, 'text-disabled');
            html.addClass(this.panelCountOptionsLabel, 'text-disabled');
            html.addClass(this.expandListOptionsLabel, 'text-disabled');
            html.addClass(this.showAllFeaturesOptionsLabel, 'text-disabled');
            if (domClass.contains(this.hidePanelHelpText, 'help-off')) {
              html.removeClass(this.hidePanelHelpText, 'help-off');
            }
            html.addClass(this.hidePanelHelpText, 'help-on');
          } else {
            html.removeClass(this.panelIconOptionsLabel, 'text-disabled');
            html.removeClass(this.panelCountOptionsLabel, 'text-disabled');
            html.removeClass(this.expandListOptionsLabel, 'text-disabled');
            html.removeClass(this.showAllFeaturesOptionsLabel, 'text-disabled');
            if (domClass.contains(this.hidePanelHelpText, 'help-on')) {
              html.removeClass(this.hidePanelHelpText, 'help-on');
            }
            html.addClass(this.hidePanelHelpText, 'help-off');
          }

          if (this.config.displayPanelIcon) {
            this.panelIconOptions.set('checked', this.config.displayPanelIcon);
          }
          if (this.config.expandList) {
            this.expandListOptions.set('checked', this.config.expandList);
          }

          var showAllFeatures = typeof (this.config.showAllFeatures) === 'undefined' ?
            false : this.config.showAllFeatures;
          this.showAllFeaturesOptions.set('checked', showAllFeatures);

          this.displayLayerTable.clear();
          this.isInitalLoad = true;
          for (var i = 0; i < this.config.layerInfos.length; i++) {
            var lyrInfo = this.config.layerInfos[i];
            this._populateLayerRow(lyrInfo, i);
          }
          this._updateLayerLists();
          var rows = this.displayLayerTable.getRows();
          for (var r = 0; r < rows.length; r++) {
            this._updateRefresh(rows[r]);
          }
          if (this.displayLayerTable.getRows().length < this.layer_options.length) {
            html.removeClass(this.btnAddLayer, "btn-add-section-disabled");
            html.addClass(this.btnAddLayer, "btn-add-section enable");
          } else {
            html.addClass(this.btnAddLayer, "btn-add-section-disabled");
            html.removeClass(this.btnAddLayer, "btn-add-section enable");
          }
        }
      },

      //added for backwards compatability
      //could not handle directly in VersionManager as some stored layerInfos
      // do not have a valid infoTemplate saved
      _upgradeFields: function () {
        if (this.config.layerInfos) {
          for (var i = 0; i < this.config.layerInfos.length; i++) {
            var li = this.config.layerInfos[i];
            if (li && li.symbolData && li.symbolData.featureDisplayOptions) {
              var lyrInfo = this.operLayerInfos.getLayerInfoById(li.id);
              var fields = li.symbolData.featureDisplayOptions.fields;
              //At previous releases we would use the first field from the infoTemplate or
              //the first non-OID field from the layer if no fields were selected by the user
              if (typeof (fields) === 'undefined' || (fields.hasOwnProperty('length') && fields.length === 0)) {
                //check layer fields
                var layerObject = (lyrInfo && lyrInfo.layerObject) ? lyrInfo.layerObject : undefined;
                var oidFieldName = (layerObject && layerObject.objectIdField) ? layerObject.objectIdField : undefined;
                var firstLayerFieldName = "";
                var firstLayerFieldAlias = "";
                var layerFields = li.fields ? li.fields : layerObject ? layerObject.fields : undefined;
                if (layerFields && layerFields.length > 0) {
                  layer_field_loop:
                  for (var _i = 0; _i < layerFields.length; _i++) {
                    var f = layerFields[_i];
                    if (firstLayerFieldName === "" && f.type !== "esriFieldTypeOID" &&
                      f.type !== "esriFieldTypeGeometry" && f.name !== oidFieldName) {
                      firstLayerFieldName = f.name;
                      firstLayerFieldAlias = f.alias || f.name;
                    }
                    if (!oidFieldName) {
                      oidFieldName = f.type === "esriFieldTypeOID" ? f.name : undefined;
                    }
                    if (oidFieldName && firstLayerFieldName !== "") {
                      break layer_field_loop;
                    }
                  }
                }

                //check popup fields
                var keyFieldName = "";
                var keyFieldAlias = "";
                var infoTemplate = li.infoTemplate && li.infoTemplate.info && li.infoTemplate.info.fieldInfos ?
                  li.infoTemplate : lyrInfo ? lyrInfo.getInfoTemplate() : undefined;
                if (!infoTemplate) {
                  var subLayers = lyrInfo.getSubLayers();
                  sub_layers_loop:
                  for (var sli = 0; sli < subLayers.length; sli++) {
                    var sl = subLayers[sli];
                    if (sl.title && sl.layerObject && sl.layerObject.name && sl.title === sl.layerObject.name) {
                      infoTemplate = sl.getInfoTemplate ? sl.getInfoTemplate() : infoTemplate;
                      break sub_layers_loop;
                    }
                  }
                }
                var popupFields = infoTemplate ? infoTemplate.info.fieldInfos : [];
                popup_field_loop:
                for (var j = 0; j < popupFields.length; j++) {
                  var popupField = popupFields[j];
                  if (popupField && popupField.visible) {
                    if (!oidFieldName || oidFieldName !== popupField.fieldName) {
                      keyFieldName = popupField.fieldName;
                      keyFieldAlias = popupField.label || popupField.fieldName;
                      break popup_field_loop;
                    }
                  }
                }

                //update the config
                this.config.layerInfos[i].symbolData.featureDisplayOptions.fields = [{
                  name: keyFieldName ? keyFieldName : firstLayerFieldName,
                  label: keyFieldName ? keyFieldAlias : firstLayerFieldAlias
                }];
              }
            }
          }
        }
      },

      _updateStyleColor: function (changedData) {
        var tName = this.appConfig.theme.name;
        var sName = changedData;
        var appId = this.appConfig.appId;
        if (appId === "") {
          appId = window.location.href.split('id=')[1];
        }
        var url = "./apps/" + appId + "/themes/" + tName + "/manifest.json";
        xhr.get({
          url: url,
          sync: true,
          handleAs: "json",
          load: lang.hitch(this, function (data) {
            var styles = data.styles;
            for (var i = 0; i < styles.length; i++) {
              var st = styles[i];
              if (st.name === sName) {
                this._styleColor = st.styleColor;
                this._styleColorName = st.name;
                break;
              }
            }
          })
        });
      },

      updateThemeClusterSymbol: function (lyrInfo, i) {
        var sd = lyrInfo.symbolData;
        if (this.appConfig.theme.styles && this.appConfig.theme.styles[0]) {
          if (typeof (this._styleColor) === 'undefined') {
            this._updateStyleColor(this.appConfig.theme.styles[0]);
          }
        }
        if (this._styleColor) {
          var _rgb = dojoColor.fromHex(this._styleColor);
          var x = i + 1;
          var xx = x > 0 ? x * 30 : 30;
          var evenOdd = x % 2 === 0;
          var r = _rgb.r;
          var g = _rgb.g;
          var b = _rgb.b;

          var rr = r - xx;
          if (evenOdd) {
            if (rr > 255) {
              rr = rr - 255;
            }
            else if (rr < 0) {
              rr = rr + 255;
            }
          }

          var bb = b - xx;
          if (x % 3 === 0) {
            if (evenOdd) {
              if (bb > 255) {
                bb = bb - 255;
              }
              else if (bb < 0) {
                bb = bb + 255;
              }
            }
          }

          var gg = g - xx;
          if (x % 5 === 0) {
            if (evenOdd) {
              if (gg > 255) {
                gg = gg - 255;
              }
              else if (gg < 0) {
                gg = gg + 255;
              }
            }
          }
          sd.clusterType = 'CustomCluster';
          sd.clusterSymbol = {
            color: [rr, gg, bb, 128],
            outline: {
              color: [0, 0, 0, 255],
              width: 0,
              type: "esriSLS",
              style: "esriSLSSolid"
            },
            type: "esriSFS",
            style: "esriSFSSolid"
          };

          lyrInfo.symbolData = sd;
        }
        return lyrInfo;
      },

      _rowDeleted: function(r){
        if(r){
          var layerItem = r.selectLayers.getSelectedItem();
          if (layerItem && layerItem.layerInfo && layerItem.layerInfo.id) {
            this._removeRefreshLayer(layerItem.layerInfo.id);
          }
        }
        this._updateLayerLists();
        if (this.displayLayerTable.getRows().length < this.layer_options.length) {
          html.removeClass(this.btnAddLayer, "btn-add-section-disabled");
          html.addClass(this.btnAddLayer, "btn-add-section enable");
        }
      },

      _addLayerRow: function () {
        this.isInitalLoad = false;
        if (this.displayLayerTable.getRows().length >= this.layer_options.length) {
          return;
        }
        this.shelter.show();
        var result = this.displayLayerTable.addRow({});
        if (result.success && result.tr) {
          var tr = result.tr;
          html.addClass(tr.cells[2], "displayOptions");
          this._addLayersOption(tr);
          this._addLabelOption(tr);
          this._addRefreshOption(tr);
          //get the first layer that is not already selected
          this._setNextLayer(tr.selectLayers);
          this._updateLayerLists();
        }
        this.shelter.hide();
        if (this.displayLayerTable.getRows().length >= this.layer_options.length) {
          html.removeClass(this.btnAddLayer, "btn-add-section enable");
          html.addClass(this.btnAddLayer, "btn-add-section-disabled");
          return;
        }
      },

      _setNextLayer: function(selectBox){
        var id;
        for (var i = 0; i < this.layer_options.length; i++) {
          var lo = this.layer_options[i];
          if(this.used_layers.indexOf(lo.id) === -1){
            id = lo.id;
            break;
          }
        }

        if(id){
          var layerInfo = this.operLayerInfos.getLayerInfoById(id);
          if (layerInfo) {
            layerInfo.getLayerObject().then(lang.hitch(this, function (layer) {
              selectBox.setSelectedLayer(layer);
            }));
          }
        }
      },

      _populateLayerRow: function (lyrInfo, i) {
        var result = this.displayLayerTable.addRow({});
        if (result.success && result.tr) {
          var tr = result.tr;
          html.addClass(tr.cells[2], "displayOptions");
          this._addLayersOption(tr);
          this._addLabelOption(tr);
          this._addRefreshOption(tr);

          var jimuLayerInfo = this.operLayerInfos.getLayerInfoById(lyrInfo.id);
          jimuLayerInfo.getLayerObject().then(lang.hitch(this, function (layer) {
            tr.selectLayers.setSelectedLayer(layer).then(lang.hitch(this, function () {
              if (lyrInfo.symbolData.clusterType === 'ThemeCluster') {
                lyrInfo = this.updateThemeClusterSymbol(lyrInfo, i);
              }
              var cLo = this._getLayerOptionByValue(tr);
              cLo.filter = lyrInfo.filter;
              cLo.imageData = lyrInfo.imageData;
              cLo.symbolData = lyrInfo.symbolData;
              tr.symbolData = lyrInfo.symbolData;
              this.validateFields(tr.symbolData, tr);
            }));
          }));
          tr.labelText.set("value", lyrInfo.label);
          tr.refreshBox.set("checked", lyrInfo.refresh);
          tr.imageData = lyrInfo.panelImageData;

          var s = query('.imageDataGFX', tr.cells[2])[0];
          if (s) {
            tr.cells[2].removeChild(s);
          }

          domConstruct.create("div", {
            'class': "imageDataGFX margin2",
            innerHTML: [lyrInfo.imageData],
            title: this.nls.iconColumnText
          }, tr.cells[2]);
        }
      },

      _addLayersOption: function (tr) {
        var selectBox = this._createLayerChooserSelect(tr);
        if (selectBox) {
          selectBox.tr = tr;
          selectBox.parent = this;
          tr.selectLayers = selectBox;
        }
      },

      _createLayerChooserSelect: function (tr) {
        var td = query('.simple-table-cell', tr)[0];
        var layerChooserSelect;
        if (td) {
          var layerChooserFromMap = new UniqueLayerChooser({
            showTable: false,
            onlyShowVisible: false,
            createMapResponse: this.map.webMapResponse,
            parent: this,
            row: tr
          });
          layerChooserFromMap.startup();

          layerChooserSelect = new LayerChooserFromMapSelect({
            layerChooser: layerChooserFromMap
          });
          layerChooserSelect.placeAt(td);
          layerChooserSelect.startup();
          this.own(on(layerChooserSelect, 'selection-change', this._onLayerChanged));
        }
        return layerChooserSelect;
      },

      _onLayerChanged: function () {
        var item = this.getSelectedItem();
        if (!item) {
          return;
        }
        var layerID = item && item.layerInfo && item.layerInfo.id ? item.layerInfo.id : undefined;
        if (this.tr.layerID && layerID && layerID !== this.tr.layerID) {
          this.parent._removeRefreshLayer(this.tr.layerID);
          this.tr.refreshBox.set('checked', false);
        }
        this.tr.layerID = layerID;
        if (!this.parent.isInitalLoad) {
          lang.hitch(this.parent, this.parent._updateRefresh(this.tr));
          lang.hitch(this.parent, this.parent._updateLayerLists());
          lang.hitch(this.parent, this.parent._addDefaultSymbol(this.tr));
          this.tr.labelText.set('value', "");
        }
      },

      _updateLayerLists: function () {
        this.used_layers = [];
        var rows = this.displayLayerTable.getRows();
        //rebuild the used_layers list
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          var item = row.selectLayers.getSelectedItem();
          if (item && item.layerInfo && item.layerInfo.id) {
            this.used_layers.push(item.layerInfo.id);
            //used as a part of the LayerChoosers filter function so it will always
            // show the chosen layer for a row
            row.layerID = item.layerInfo.id;
          }
        }
        //update the other layer chooser instances so they will not show
        // layer instances that have been used in other rows
        for (var _i = 0; _i < rows.length; _i++) {
          var _row = rows[_i];
          //This concept does not work when the layers are not subLayers
          //if (_row.rowOpened) {
          _row.selectLayers.layerChooser._onLayerInfosChanged();
          //_row.rowOpened = false;
          //}
        }
      },

      _addLabelOption: function (tr) {
        var td = query('.simple-table-cell', tr)[1];
        html.setStyle(td, "verticalAlign", "middle");
        html.setStyle(td, "line-height", "inherit");
        var labelTextBox = new ValidationTextBox({
          style: {
            width: "100%",
            height: "28px"
          }
        });
        labelTextBox.placeAt(td);
        labelTextBox.startup();
        tr.labelText = labelTextBox;
      },

      _addRefreshOption: function (tr) {
        var td = query('.simple-table-cell', tr)[3];
        html.setStyle(td, "verticalAlign", "middle");
        html.setStyle(td, "line-height", "inherit");
        var refreshCheckBox = new CheckBox({
          "class": "checkBox",
          onChange: function (v) {
            var layerItem = this.tr.selectLayers.getSelectedItem();
            if (layerItem && layerItem.layerInfo && layerItem.layerInfo.id) {
              if (v) {
                this.parent._addRefreshLayer(layerItem.layerInfo.id);
              } else {
                this.parent._removeRefreshLayer(layerItem.layerInfo.id);
              }
            }
          }
        });
        refreshCheckBox.placeAt(td);
        refreshCheckBox.startup();
        refreshCheckBox.parent = this;
        refreshCheckBox.tr = tr;
        tr.refreshBox = refreshCheckBox;
        this._updateRefresh(tr);
      },

      _addRefreshLayer: function (layerId) {
        this.refreshLayers.push(layerId);
        var rO = query('.refreshOff', this.refreshOptions.domNode)[0];
        if (rO) {
          html.removeClass(rO, 'refreshOff');
          html.addClass(rO, 'refreshOn');
        }
        if (!this.refreshInterval.isValid()) {
          this._disableOk();
        }
      },

      _removeRefreshLayer: function (layerId) {
        var i = this.refreshLayers.indexOf(layerId);
        if (i > -1) {
          this.refreshLayers.splice(i, 1);
          if (this.refreshLayers.length === 0) {
            var rO = query('.refreshOn', this.refreshOptions.domNode)[0];
            if (rO) {
              html.removeClass(rO, 'refreshOn');
              html.addClass(rO, 'refreshOff');
            }
            this._enableOk();
          }
        }
      },

      _updateRefresh: function (tr) {
        var lInfo = this._getLayerOptionByValue(tr);

        if (tr && tr.refreshBox) {
          var refreshCheckBox = tr.refreshBox;
          if (lInfo && lInfo.lyrType === 'Feature Collection' && typeof (lInfo.itemId) !== 'undefined') {
            refreshCheckBox.set('disabled', false);
            refreshCheckBox.set('title', this.nls.enableRefresh);
          } else {
            refreshCheckBox.set('disabled', true);
            refreshCheckBox.set('title', this.nls.disableRefresh);
          }
        }
      },

      _updateOK: function () {
        if (this.refreshInterval.isValid()) {
          this._enableOk();
        } else {
          this._disableOk();
        }
      },

      _disableOk: function () {
        var s = query(".button-container")[0];
        domStyle.set(s.children[2], "display", "none");
        domStyle.set(s.children[3], "display", "inline-block");
      },

      _enableOk: function () {
        var s = query(".button-container")[0];
        domStyle.set(s.children[2], "display", "inline-block");
        domStyle.set(s.children[3], "display", "none");
      },

      _addDefaultSymbol: function (tr) {
        var td = query('.simple-table-cell', tr)[0];
        this.curRow = tr;
        if (td) {
          html.setStyle(td, "line-height", "inherit");
          html.setStyle(td, "margin-left", "0px");
          var lo = this._getLayerOptionByValue(tr);
          var item = tr.selectLayers.getSelectedItem();
          if(item && item.layerInfo){
            var selectLayersValue = item.layerInfo.id;
            var hasSymbolData = false;
            var sd;
            if (typeof (this.curRow.symbolData) !== 'undefined') {
              sd = this.curRow.symbolData;
              hasSymbolData = sd.userDefinedSymbol && (sd.layerId === selectLayersValue);
            }
            var a;
            var s;
            if (!hasSymbolData || typeof (lo.symbolData) === 'undefined') {
              var options = {
                nls: this.nls,
                callerRow: tr,
                layerInfo: lo,
                value: selectLayersValue,
                symbolInfo: hasSymbolData ? this.curRow.symbolData : lo.symbolData,
                map: this.map,
                ac: this.appConfig,
                hidePanel: this.hidePanel
              };
              var sourceDijit = new SymbolPicker(options);
              sourceDijit._setSymbol();
              s = query(".imageDataGFX", this.curRow.cells[2])[0];
              if (s) {
                this.curRow.cells[2].removeChild(s);
              }
              this.curRow.symbolData = sourceDijit.symbolInfo;
              this.validateFields(this.curRow.symbolData, this.curRow);
              a = domConstruct.create("div", { 'class': "imageDataGFX margin2" }, this.curRow.cells[2]);
              if (this.curRow.symbolData.svg !== null &&
                typeof (this.curRow.symbolData.svg) !== 'undefined') {
                a.appendChild(this.curRow.symbolData.svg);
              }
              this.curRow.imageData = this.curRow.symbolData.panelHTML;
              this.curRow = null;
              sourceDijit.destroy();
              sourceDijit = null;
            } else {
              s = query(".imageDataGFX", this.curRow.cells[2])[0];
              if (s) {
                this.curRow.cells[2].removeChild(s);
              }
              this.curRow.symbolData = lo.symbolData;
              this.validateFields(this.curRow.symbolData, this.curRow);
              a = domConstruct.create("div", { 'class': "imageDataGFX margin2" }, this.curRow.cells[2]);
              a.appendChild(this.curRow.symbolData.svg);
              this.curRow.imageData = this.curRow.symbolData.panelHTML;
            }
          }
        }
      },

      _getLayerOptionByValue: function (tr) {
        var item = tr.selectLayers.getSelectedItem();
        var id = (item && item.layerInfo) ? item.layerInfo.id : undefined;
        if (id) {
          for (var i = 0; i < this.layer_options.length; i++) {
            var lo = this.layer_options[i];
            if (lo.id === id) {
              return lo;
            }
          }
        }
      },

      validateFields: function (symbolData, tr) {
        var isValid;
        if (symbolData && symbolData.featureDisplayOptions && symbolData.featureDisplayOptions.fields) {
          isValid = symbolData.featureDisplayOptions.fields.length > 0;
        } else {
          isValid = false;
        }
        var td = query('.simple-table-cell', tr)[4];
        if (td && !isValid) {
          if (!tr.errorDiv) {
            tr.errorDiv = domConstruct.create("div", {
              'class': "field-error"
            }, td);
            tr.errorSpan = domConstruct.create("span", {
              'class': "jimu-icon jimu-icon-error",
              title: this.nls.fieldsWarning
            }, tr.errorDiv);
          } else {
            domStyle.set(tr.errorSpan, 'display', 'inline-block');
          }
        } else if (isValid && tr.errorSpan) {
          domStyle.set(tr.errorSpan, 'display', 'none');
        }
      },

      _pickSymbol: function (tr) {
        //var selectLayersValue = tr.selectLayers;
        var lo = this._getLayerOptionByValue(tr);
        this.curRow = tr;

        var options = {
          nls: this.nls,
          callerRow: tr,
          layerInfo: lo,
          value: lo.id,
          symbolInfo: typeof (this.curRow.symbolData) !== 'undefined' ? this.curRow.symbolData : lo.symbolData,
          map: this.map,
          ac: this.appConfig,
          hidePanel: this.hidePanel
        };
        var sourceDijit = new SymbolPicker(options);

        var popup = new Popup({
          width: 420,
          autoHeight: true,
          content: sourceDijit,
          titleLabel: this.nls.sympolPopupTitle
        });

        this.own(on(sourceDijit, 'ok', lang.hitch(this, function (data) {
          var s = query(".imageDataGFX", this.curRow.cells[2])[0];
          if (s) {
            this.curRow.cells[2].removeChild(s);
          }
          this.curRow.symbolData = data;
          this.validateFields(this.curRow.symbolData, this.curRow);
          var a = domConstruct.create("div", { 'class': "imageDataGFX margin2" }, this.curRow.cells[2]);
          a.appendChild(data.svg);
          this.curRow.imageData = data.panelHTML;
          this.curRow = null;
          sourceDijit.destroy();
          sourceDijit = null;
          popup.close();
        })));

        this.own(on(sourceDijit, 'cancel', lang.hitch(this, function () {
          this.curRow = null;
          sourceDijit.destroy();
          sourceDijit = null;
          popup.close();
        })));
      },

      setGeometryType: function (OpLayer) {
        var match = true;
        var type;
        if (OpLayer.url && OpLayer.url.indexOf) {
          if (OpLayer.url.indexOf("MapServer") > -1) {
            this.gtQueries.push(esriRequest({ "url": OpLayer.url + "?f=json" }));
            this.gtQueryUrls.push(OpLayer.url);
          }
        } else if(OpLayer.featureInfos && OpLayer.featureInfos.hasOwnProperty('length')){
          var validGeomTypes = ['esriGeometryPoint', 'esriGeometryLine', 'esriGeometryPolygon'];
          array.forEach(OpLayer.featureInfos, function (fi) {
            if (fi.type && validGeomTypes.indexOf(fi.type) > -1) {
              type = fi.type;
              if (type !== fi.type) {
                match = false;
              }
            }
          });
        }
        return match && type ? type : undefined;
      },

      uploadImage: function (i) {
        this.panelMainIcon.innerHTML = "";
        this.mpi = i;
        domConstruct.create("div", {
          "class" : "innerMainPanelIcon",
          style: 'background-image: url(' + i + ');',
          title: this.nls.mainPanelIcon
        }, this.panelMainIcon);
      },

      getConfig: function () {
        dijitPopup.close();

        var rows = this.displayLayerTable.getRows();
        var table = [];
        var lInfo;
        array.forEach(rows, lang.hitch(this, function (tr) {
          var selectLayersValue;
          var layerItem = tr.selectLayers.getSelectedItem();
          if (layerItem && layerItem.layerInfo && layerItem.layerInfo.id) {
            selectLayersValue = layerItem.layerInfo.id;
          }

          var labelTextValue = utils.stripHTML(tr.labelText.value);
          var refreshBox = tr.refreshBox;
          var lo = this._getLayerOptionByValue(tr);
          var symbolData = tr.symbolData ? tr.symbolData : lo.symbolData;

          lInfo = {
            layer: selectLayersValue,
            label: labelTextValue !== "" ? labelTextValue : lo.label,
            refresh: refreshBox.checked,
            url: lo.url,
            type: lo.type,
            id: lo.id,
            symbolData: symbolData,
            geometryType: lo.geometryType,
            itemId: lo.itemId,
            parentLayerID: lo.parentLayerID,
            renderer: lo.renderer,
            drawingInfo: lo.drawingInfo,
            fields: lo.fields,
            oidFieldName: lo.oidFieldName,
            subLayerId: lo.subLayerId,
            infoTemplate: lo.infoTemplate
          };

          if (tr.imageData) {
            lInfo.panelImageData = tr.imageData;
          }

          var td = query('.imageDataGFX', tr)[0];
          lInfo.imageData = typeof (td) !== 'undefined' ? td.innerHTML : "<div></div>";
          table.push(lInfo);
        }));

        this.config.mapID = this.map.itemId;

        this.config.layerInfos = table;
        this.config.mainPanelText = utils.stripHTML(this.mainPanelText.value);
        this.config.mainPanelIcon = this.panelMainIcon.innerHTML;
        this.config.refreshInterval = utils.stripHTML(this.refreshInterval.value);
        this.config.refreshEnabled = this.refreshLayers.length > 0 ? true : false;
        this.config.countEnabled = this.countEnabled;
        this.config.displayPanelIcon = this.displayPanelIcon;
        this.config.hidePanel = this.hidePanel;
        this.config.continuousRefreshEnabled = this.hidePanel;
        this.config.expandList = this.expandListOptions.checked;
        this.config.showAllFeatures = this.showAllFeaturesOptions.checked;
        this.config.upgradeFields = false;

        return this.config;
      },

      destroy: function () {
        dijitPopup.close();
        this.inherited(arguments);
      }
    });
  });
