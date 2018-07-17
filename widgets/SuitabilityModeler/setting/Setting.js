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
  "jimu/BaseWidgetSetting",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/_base/lang",
  "dojo/on",
  "dojo/dom-class",
  "dojo/dom-construct",
  "dojo/i18n!../nls/strings",
  "../WroContext",
  "../wro/wroUtil",
  "esri/layers/ArcGISImageServiceLayer",
  "jimu/dijit/Popup",
  "jimu/dijit/ItemSelector",
  "dijit/form/Form",
  "dijit/form/ValidationTextBox",
  "dijit/form/CheckBox",
  "dijit/form/RadioButton"],
function(declare, BaseWidgetSetting, _WidgetsInTemplateMixin, lang, on,
  domClass, domConstruct, i18n, WroContext, wroUtil, ArcGISImageServiceLayer,
  Popup, ItemSelector) {

  var oThisClass = declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {

    baseClass: "jimu-widget-suitability-modeler-setting",
    _modelItem: null,
    _url: "http://doc.arcgis.com/en/geoplanner/documentation/find-the-best-place-using-weighted-overlay.htm", // jshint ignore:line

    postCreate: function() {
      this.inherited(arguments);
      var self = this;
      this.modelNameBox.set("disabled",true);
      this.own(
        on(this.byUrlRadio,"click",function () {
          self.updateSection();
        }),
        on(this.byItemRadio,"click",function () {
          self.updateSection();
        })
      );
    },

    startup: function() {
      if (this._started) {
        return;
      }
      this.inherited(arguments);
      // this._addAboutLink();
      this.setConfig(this.config);
    },

    getConfig: function() {
      if (!this.settingsForm.validate()) {
        return false;
      }
      if (this.byItemRadio.checked) {
        if (!this._modelItem || this.modelNameBox.get("value").length === 0) {
          return false;
        }
      }
      if (!this.config) {
        this.config = {};
      }
      this.config.allowSaveAs = !!this.allowSaveAsCheckBox.get("checked");
      this.config.imageServiceUrl = this.serviceUrlBox.get("value");
      if (this.byUrlRadio.checked) {
        this.config.imageServiceUrl = this.serviceUrlBox.get("value");
        this.config.modelItem = null;
      } else {
        this.config.imageServiceUrl = this._modelItem.url;
        this.config.modelItem = this._modelItem;
      }
      //console.warn("getConfig",this.config);
      return this.config;
    },

    setConfig: function(config) {
      this.config = config || {};
      //console.warn("setConfig",this.config);
      this.allowSaveAsCheckBox.set("checked",!!this.config.allowSaveAs);
      this._modelItem = null;
      var item = config.modelItem;
      if (item &&
        (typeof item.id === "string" && item.id.length > 0) &&
        (typeof item.url === "string" && item.url.length > 0) &&
        (typeof item.title === "string" && item.title.length > 0)) {
        this._modelItem = lang.clone(item);
        this.byItemRadio.set("checked", true);
        this.modelNameBox.set("value",item.title);
      } else {
        var v = config.imageServiceUrl;
        if (typeof v === "string") {
          v = v.trim();
          if (v.length > 0) {
            this.serviceUrlBox.set("value",v);
          }
        }
        this.byUrlRadio.set("checked", true);
      }
      this.updateSection();
    },

    selectModelClicked: function() {
      var self = this;
      var options = {
        portalUrl: this.appConfig.portalUrl,
        itemTypes: ["Image Service"],
        typeKeywords: ["geodesignModelerLayer"]
      };
      var content = domConstruct.create("div",{
        "class": this.baseClass,
        style: {width: "100%", height: "100%"}
      });
      var selectorNode = domConstruct.create("div",{
        style: {height: "460px"}
      },content);
      var btnBar = domConstruct.create("div",{
        "class": "popup-button-bar"
      },content);
      var btnOk = domConstruct.create("span",{
        "class": "btn-ok jimu-btn jimu-state-disabled",
        "innerHTML": this.nls.ok
      },btnBar);
      var btnCancel = domConstruct.create("span",{
        "class": "jimu-btn jimu-btn-vacation",
        "innerHTML": this.nls.cancel
      },btnBar);

      var itemSelector = new ItemSelector(options);
      var popup = new Popup({
        titleLabel: this.nls.itemSelectorTitle,
        content: content,
        width: 830,
        height: 600
      });
      itemSelector.placeAt(selectorNode);

      this.own(on(itemSelector,"item-selected",function () {
        domClass.remove(btnOk,"jimu-state-disabled");
      }));

      this.own(on(itemSelector,"none-item-selected",function () {
        console.warn("none-item-selected"); // TODO not firing when a new search executes
        domClass.add(btnOk,"jimu-state-disabled");
      }));

      this.own(on(btnOk,"click",function () {
        var item = itemSelector.getSelectedItem();
        if (item && !domClass.contains(btnOk,"jimu-state-disabled")) {
          self.validateService(item.url,btnOk,true,function(){
            self.modelNameBox.set("value",item.title);
            self._modelItem = {
              id: item.id,
              url: item.url,
              title: item.title
            };
            popup.close();
          });
        }
      }));

      this.own(on(btnCancel,"click",function () {
        popup.close();
      }));
    },

    updateSection: function() {
      if (this.byUrlRadio.checked) {
        this.byUrlSection.style.display = "block";
        this.byItemSection.style.display = "none";
        this.serviceUrlBox.set("required",true);
        this.modelNameBox.set("required",false);
      } else {
        this.byUrlSection.style.display = "none";
        this.byItemSection.style.display = "block";
        this.serviceUrlBox.set("required",false);
        this.modelNameBox.set("required",true);
      }
    },

    validateClicked: function() {
      var url = this.serviceUrlBox.get("value").trim();
      this.validateService(url,this.validateNode,false,null);
    },

    validateService: function(url,buttonNode,fromPopup,okCallback) {
      var self = this;
      if (domClass.contains(buttonNode,"jimu-state-disabled")) {
        return;
      }

      var disable = function() {
        buttonNode.innerHTML = self.nls.validating;
        domClass.add(buttonNode,"jimu-state-disabled");
      };
      var enable = function() {
        domClass.remove(buttonNode,"jimu-state-disabled");
        if (fromPopup) {
          buttonNode.innerHTML = self.nls.ok;
        } else {
          buttonNode.innerHTML = self.nls.validate;
        }
      };
      disable();

      var context = new WroContext({i18n: i18n});
      var layer, errors = [], wroInfo = wroUtil.newWROInfo();
      var caption = i18n.wro.validation.invalidItemCaption;
      if (url.length > 0) {
        url = context.checkMixedContent(url);
        layer = new ArcGISImageServiceLayer(url,{id:context.generateRandomId()});
        layer.setVisibility(false);
        wroUtil.waitForLayer(layer,i18n).then(function() {
          return wroUtil.validateWROLayer(i18n,layer,wroInfo,errors,false);
        }).then(function(){
          if (errors.length > 0) {
            context.showMessages(caption,url,errors);
          } else {
            if (typeof okCallback === "function") {
              okCallback();
            } else {
              context.showMessages(self.nls.imageServiceUrl,url,[self.nls.validated]);
            }
          }
          enable();
        }).otherwise(function(err){
          console.warn("Error loading WRO layer",url);
          console.error(err);
          if (err.message) {
            context.showMessages(caption,url,[err.message]);
          } else {
            context.showMessages(caption,url,[i18n.wro.validation.inaccessible]);
          }
          enable();
        });
      } else {
        enable();
      }
    },

    _addAboutLink: function() {
      var p = this.getParent();
      var v = this.nls.description3;
      var u = this._url,
          a;
      //v = lang.replace(v,{link: a});
      if(p && p.helpNode) {
        p.helpNode.style.display = "inline-block";
        p.helpNode.setAttribute("href", u);
        domClass.add(p.helpNode, "jimu-widget-suitability-modeler-setting-help-link");
      } else {
        a = "<a target='_blank' href='" + u + "'>" + v + "</a>";
        this.descriptionNode3.innerHTML = a;
      }
    }

  });

  return oThisClass;
});
