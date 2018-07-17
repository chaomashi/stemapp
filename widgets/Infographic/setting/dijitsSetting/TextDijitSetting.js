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
  'dojo/on',
  'dojo/_base/lang',
  './BaseDijitSetting',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  "./_dijits/BackgroundSetting",
  "./_dijits/FontSetting",
  'dojo/text!./TextDijitSetting.html',
  'jimu/dijit/Message'
], function (declare, on, lang, BaseDijitSetting,
  _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
  BackgroundSetting, FontSetting, template, Message) {
  var clazz = declare([BaseDijitSetting, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    templateString: template,
    type: 'text',
    nls: null,

    postMixInProperties: function () {
      lang.mixin(this.nls, window.jimuNls.common);
    },

    postCreate: function () {
      //1. text
      this._initText();
      //2. background
      this.backgroundSetting = new BackgroundSetting({
        config: this.config.background,
        nls: this.nls
      });
      this.backgroundSetting.placeAt(this.backgroundSettingNode);
      this.backgroundSetting.startup();
      this.own(on(this.backgroundSetting, 'change', lang.hitch(this, function ( /*config*/) {
        this._update();
      })));
      //3. font
      this.fontSetting = new FontSetting({
        config: this.config.font,
        nls: this.nls
      });
      this.fontSetting.placeAt(this.fontSettingNode);
      this.fontSetting.startup();
      this.own(on(this.fontSetting, 'change', lang.hitch(this, function ( /*config*/) {
        this._update();
      })));

      this._update();//refresh
    },

    _initText: function () {
      if (this.config.text) {
        this.textNode.setValue(this.config.text);
      }
      this.own(on(this.textNode, 'change', lang.hitch(this, function () {
        if (this.config.text === this.textNode.getValue() || false === this._validText()) {
          return;
        }
        this._update();
      })));
      this.own(on(this.textNode, 'blur', lang.hitch(this, function () {
        if (this.config.text === this.textNode.getValue() || false === this._validText()) {
          return;
        }
        this._update();
      })));
    },
    _validText: function () {
      if (false === this.textNode.isValid()) {
        if (!this.message) {
          this.message = new Message({
            message: this.nls.requiredFieldWarning + this.nls.text,
            buttons: [{
              label: this.nls.ok,
              onClick: lang.hitch(this, function () {
                this.message.content = null;
                this.message.close();
                this.message = null;
              })
            }]
          });
        }

        return false;
      } else {
        return true;
      }
    },
    _update: function () {
      if (this.textNode && this._validText()) {
        this.config.text = this.textNode.getValue();
      }
      if (this.backgroundSetting && this.backgroundSetting.isValid()) {
        this.config.background = this.backgroundSetting.getConfig();
      }
      if (this.fontSetting && this.fontSetting.isValid()) {
        this.config.font = this.fontSetting.getConfig();
      }
      this.updateDijit();
    },
    getConfig: function () {
      if (this._validText() &&
        this.backgroundSetting.isValid() && this.fontSetting.isValid()) {
        return this.config;
      } else {
        return false;//error
      }
    }
  });
  return clazz;
});