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
define(["dojo/_base/declare",
  "dojo/dom-class",
  "dojo/Deferred",
  "jimu/portalUrlUtils",
  "jimu/portalUtils",
  "jimu/tokenUtils",
  "jimu/BaseWidget",
  "dijit/_WidgetsInTemplateMixin",
  "./WroContext",
  "./wro/PortalUtil",
  "./wro/WeightedOverlayWidget",
  "./wro/wroUtil",
  "./chart/Chart",
  "./SaveModel",
  "esri/layers/ArcGISImageServiceLayer",
  "jimu/dijit/TabContainer3"],
function(declare, domClass, Deferred,
  portalUrlUtils, portalUtils, tokenUtils, BaseWidget,
  _WidgetsInTemplateMixin, WroContext, WroPortalUtil, WeightedOverlayWidget, wroUtil,
  Chart, SaveModel, ArcGISImageServiceLayer, TabContainer3) {

  var oThisClass = declare([BaseWidget, _WidgetsInTemplateMixin], {

    name: "SuitabilityModeler",
    baseClass: "jimu-widget-suitability-modeler",
    _chart: null,
    _wroWidget: null,

    postCreate: function() {
      this.inherited(arguments);
    },

    onClose: function() {
      this.inherited(arguments);
      if (this._wroWidget) {
        this._wroWidget.onClose();
      }
    },

    onDeActive: function(){
      this.inherited(arguments);
      if (this._chart && this._chart._isActive) {
        this._chart._activatePan();
      }
    },

    onOpen: function() {
      this.inherited(arguments);
      if (this._wroWidget) {
        this._wroWidget.onOpen();
      }
    },

    startup: function() {
      if (this._started) {
        return;
      }
      this.inherited(arguments);
      this._checkConfig();
      var self = this;
      var portalUrl = this.appConfig.portalUrl;
      var allowSaveAs = !!this.config.allowSaveAs && !!tokenUtils.userHaveSignInPortal(portalUrl);
      if (allowSaveAs) {
        this._getUser().then(function(user){
          if (!user) {
            allowSaveAs = false;
          } else if (user && user.level === "1") {
            allowSaveAs = false;
          }
          self._init(allowSaveAs,user);
        });
      } else {
        this._init(allowSaveAs,null);
      }

      this.resize();
    },

    resize: function() {
      var widgetWidth = this.domNode.clientWidth;
      if (widgetWidth < 350) {
        domClass.add(this.domNode, "width-smaller-than-350");
      } else {
        domClass.remove(this.domNode, "width-smaller-than-350");
      }
    },

    _checkConfig: function() {
      if (!this.config) {
        this.config = {};
      }
    },

    _getUser: function() {
      var dfd = new Deferred();
      var portalUrl = this.appConfig.portalUrl;
      if (tokenUtils.userHaveSignInPortal(portalUrl)) {
        portalUtils.getPortal(portalUrl).getUser().then(function(user) {
          dfd.resolve(user);
        }).otherwise(function(error) {
          console.warn("WeighterRasterOverlay._getUser error:", error);
          dfd.resolve(null);
        });
      } else {
        dfd.resolve(null);
      }
      return dfd;
    },

    _init: function(allowSaveAs,user) {
      var self = this, item;
      var cfgItem = this.config.modelItem;
      if (cfgItem &&
        (typeof cfgItem.id === "string" && cfgItem.id.length > 0) &&
        (typeof cfgItem.url === "string" && cfgItem.url.length > 0)) {
        this.config.imageServiceUrl = cfgItem.url;
        var portal = portalUtils.getPortal(this.appConfig.portalUrl);
        var portalUtil = new WroPortalUtil({
          portal: portal,
          portalUser: user,
          userContentUrl: null
        });
        portalUtil.readItem(cfgItem.id).then(function(portalItem){
          item = portalItem;
          return portalUtil.readItemJsonData(cfgItem.id);
        }).then(function(itemData){
          self._load(allowSaveAs,user,item,itemData);
        }).otherwise(function(err){
          console.warn("Error loading WRO item",cfgItem.id);
          console.error(err);
          self._load(allowSaveAs,user);
        });
      } else {
        this._load(allowSaveAs,user);
      }
    },

    _load: function(allowSaveAs,user,item,itemData) {
      var self = this, i18n = this.nls;

      var portal = portalUtils.getPortal(this.appConfig.portalUrl);
      var context = new WroContext({
        allowSaveAs: allowSaveAs,
        getMap: function() {
          return self.map;
        }
      });
      this._chart = new Chart({
        map: this.map
      });
      this._wroWidget = new WeightedOverlayWidget({
        chart: this._chart,
        context: context,
        i18n: i18n
      },this.widgetNode);
      this._wroWidget.startup();
      this._chart.wroWidget = this._wroWidget;
      this._chart.placeAt(this._wroWidget.chartNode);
      this._wroWidget.initializeTabs(TabContainer3);

      var url, layer, errors = [], wroInfo = wroUtil.newWROInfo();
      var caption = i18n.wro.validation.invalidItemCaption;
      if (typeof this.config.imageServiceUrl === "string") {
        url = this.config.imageServiceUrl.trim();
        url = context.checkMixedContent(url);
        layer = new ArcGISImageServiceLayer(url,{id:context.generateRandomId()});
        layer.setVisibility(false);
        if (item) {
          layer._wabProperties =  {
            itemLayerInfo: {
              itemId: item.id,
              itemUrl: portal + "/sharing/rest/content/items/" + encodeURIComponent(item.id),
              portalUrl: portal.portalUrl
            }
          };
        }
        wroUtil.waitForLayer(layer,i18n).then(function() {
          return wroUtil.validateWROLayer(i18n,layer,wroInfo,errors,false);
        }).then(function(){
          if (errors.length > 0) {
            context.showMessages(caption,url,errors);
          } else {
            wroUtil.applyItemDataRenderingRule(layer,wroInfo,itemData);
            self.map.addLayer(layer);
            self._wroWidget.set("imageServiceLayer",layer);
          }
        }).otherwise(function(err){
          console.warn("Error loading WRO layer",url);
          console.error(err);
          if (err.message) {
            context.showMessages(caption,url,[err.message]);
          } else {
            context.showMessages(caption,url,[i18n.wro.validation.inaccessible]);
          }
        });
      }

      this.own(this._wroWidget.designModelView.on("model-run", function(params) {
        if (allowSaveAs && params && params.options && params.options.saveAs) {
          var modelData = wroUtil.makeItemData(self._wroWidget,params.model);
          var contentUrl = portalUrlUtils.getUserContentUrl(portal.portalUrl,user.username);
          var d = new SaveModel({
            itemData: modelData,
            layer: layer,
            portal: portal,
            portalUser: user,
            saveAs: true,
            userContentUrl: contentUrl,
            username: user.username,
            wabWidget: self,
            wroWidget: self._wroWidget
          });
          d.show();
        }
      }));
    }

  });

  return oThisClass;
});
