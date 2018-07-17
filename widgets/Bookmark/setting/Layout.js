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
  'dojo/_base/html',
  "jimu/BaseWidgetSetting",
  "dijit/_WidgetsInTemplateMixin",
  'dojo/on',
  "dojo/text!./Layout.html",
  '../utils'
],
  function (declare, lang, html,
    BaseWidgetSetting, _WidgetsInTemplateMixin,
    on, template, utils) {
    var clazz = declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      templateString: template,

      startup: function () {
        //checkboxes
        this.own(on(this.layoutCards_checkBox, 'change', lang.hitch(this, function () {
          this._fixLayoutModeByCheckBoxChanged("cards");
          this._keepLayoutSelected(this.layoutCards_checkBox);
        })));
        this.own(on(this.layoutList_checkBox, 'change', lang.hitch(this, function () {
          this._fixLayoutModeByCheckBoxChanged("list");
          this._keepLayoutSelected(this.layoutList_checkBox);
        })));

        //icon block
        this.own(on(this.layoutCards, 'click', lang.hitch(this, function () {
          utils.toogleCheckboxChecked(this.layoutCards_checkBox);
          this._keepLayoutSelected(this.layoutCards_checkBox);
        })));
        this.own(on(this.layoutList, 'click', lang.hitch(this, function () {
          utils.toogleCheckboxChecked(this.layoutList_checkBox);
          this._keepLayoutSelected(this.layoutList_checkBox);
        })));

        //default layout setting
        this.own(on(this.layoutCards, 'mouseover', lang.hitch(this, function () {
          if (this._isCardAndListChecked()) {
            html.removeClass(this.cardsDefaultSetting, "transparent");
          }
        })));
        this.own(on(this.layoutCards, 'mouseout', lang.hitch(this, function () {
          if ("list" === this.config.layout.defaultMode) {
            html.addClass(this.cardsDefaultSetting, "transparent");
          }
        })));
        this.own(on(this.layoutList, 'mouseover', lang.hitch(this, function () {
          if (this._isCardAndListChecked()) {
            html.removeClass(this.listDefaultSetting, "transparent");
          }
        })));
        this.own(on(this.layoutList, 'mouseout', lang.hitch(this, function () {
          if ("cards" === this.config.layout.defaultMode) {
            html.addClass(this.listDefaultSetting, "transparent");
          }
        })));
        this.own(on(this.cardsDefaultSetting, "click", lang.hitch(this, function (evt) {
          if (evt && evt.stopPropagation && evt.preventDefault) {
            evt.stopPropagation();
            evt.preventDefault();
          }
          if (this._whetherToggleDefaultLayout("cards")) {
            this.config.layout.defaultMode = "cards";
            this._setDefault("cards");
          }
        })));
        this.own(on(this.listDefaultSetting, "click", lang.hitch(this, function (evt) {
          if (evt && evt.stopPropagation && evt.preventDefault) {
            evt.stopPropagation();
            evt.preventDefault();
          }
          if (this._whetherToggleDefaultLayout("list")) {
            this.config.layout.defaultMode = "list";
            this._setDefault("list");
          }
        })));

        this.inherited(arguments);
      },

      setConfig: function (config) {
        this.config.layout = config.layout;

        if (this.config.layout) {
          if (true === this.config.layout.cards) {
            this.layoutCards_checkBox.setValue(true);
          }
          if (true === this.config.layout.list) {
            this.layoutList_checkBox.setValue(true);
          }
        }

        //ui
        this._setDefault(this.config.layout.defaultMode);
      },
      getConfig: function () {
        if (true === this.layoutCards_checkBox.checked) {
          this.config.layout.cards = true;
        } else {
          this.config.layout.cards = false;
        }
        if (true === this.layoutList_checkBox.checked) {
          this.config.layout.list = true;
        } else {
          this.config.layout.list = false;
        }

        return this.config.layout;
      },
      _keepLayoutSelected: function (dijit) {
        if (false === this.layoutCards_checkBox.checked && false === this.layoutList_checkBox.checked) {
          utils.toogleCheckboxChecked(dijit);
        }
      },


      //default layout setting
      _setDefault: function (type) {
        var otherType = "";
        if (type === "cards") {
          otherType = "list";
        } else {
          otherType = "cards";
        }
        //1 target block
        html.removeClass(this[type + "DefaultSetting"], "transparent");
        var setDefaultNode = this[type + "_makeAsDefault"];
        if (setDefaultNode) {
          html.addClass(setDefaultNode, "hide");
        }
        var defaultNode = this[type + "_default"];
        if (defaultNode) {
          html.removeClass(defaultNode, "hide");
        }
        //2 other block
        html.addClass(this[otherType + "DefaultSetting"], "transparent");
        setDefaultNode = this[otherType + "_makeAsDefault"];
        if (setDefaultNode) {
          html.removeClass(setDefaultNode, "hide");
        }
        defaultNode = this[otherType + "_default"];
        if (defaultNode) {
          html.addClass(defaultNode, "hide");
        }

        //transparent when choose only 1
        if (this._isCardAndListChecked()) {

        } else {
          html.addClass(this[type + "DefaultSetting"], "transparent");
          html.addClass(this[otherType + "DefaultSetting"], "transparent");
        }
      },
      //whether set defaultLayout, after label clicked
      _whetherToggleDefaultLayout: function (type) {
        var checkBox;
        if (type === "cards") {
          checkBox = this.layoutCards_checkBox;
        } else {
          checkBox = this.layoutList_checkBox;
        }
        var otherType = "";//TODO
        if (type === "cards") {
          otherType = "list";
        } else {
          otherType = "cards";
        }

        if (otherType === this.config.layout.defaultMode && true === checkBox.checked) {
          return true;
        } else {
          return false;
        }
      },
      //fix defaultLayout, when checkbox status changed
      _fixLayoutModeByCheckBoxChanged: function (type) {
        //transparent when choose only 1
        if (this._isCardAndListChecked()) {
          if(this.config.layout.defaultMode === "list"){
            html.removeClass(this.listDefaultSetting, "transparent");
          } else {
            html.removeClass(this.cardsDefaultSetting, "transparent");
          }
        } else {
          html.addClass(this.listDefaultSetting, "transparent");
          html.addClass(this.cardsDefaultSetting, "transparent");
        }

        if ("cards" === type) {
          if (false === this.layoutCards_checkBox.checked && true === this.layoutList_checkBox.checked &&
            "cards" === this.config.layout.defaultMode) {
            this.config.layout.defaultMode = "list";
            this._setDefault("list");
          }
        } else {
          if (false === this.layoutList_checkBox.checked && true === this.layoutCards_checkBox.checked &&
            "list" === this.config.layout.defaultMode) {
            this.config.layout.defaultMode = "cards";
            this._setDefault("cards");
          }
        }
      },
      _isCardAndListChecked: function(){
        if (true === this.layoutCards_checkBox.getValue() && true === this.layoutList_checkBox.getValue()) {
          return true;
        } else {
          return false;
        }
      }
    });
    return clazz;
  });