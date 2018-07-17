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
  'dojo/_base/html',
  'dojo/_base/lang',
  './BaseDijitSetting',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  "./_dijits/BackgroundSetting",
  'dojo/text!./ImageDijitSetting.html',
  'jimu/dijit/ImageChooser'
], function (declare, on, html, lang, BaseDijitSetting,
  _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
  BackgroundSetting, template, ImageChooser) {
  var clazz = declare([BaseDijitSetting, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    templateString: template,
    type: 'image',
    nls: null,

    postMixInProperties: function () {
      lang.mixin(this.nls, window.jimuNls.common);
    },

    postCreate: function () {
      //1. background
      this.backgroundSetting = new BackgroundSetting({
        config: this.config.background,
        nls: this.nls
      });
      this.backgroundSetting.placeAt(this.backgroundSettingNode);
      this.backgroundSetting.startup();
      this.own(on(this.backgroundSetting, 'change', lang.hitch(this, function (/*config*/) {
        this._update();
      })));

      //2. image
      this.imageChooser = new ImageChooser({
        label: this.nls.upload,
        cropImage: false,
        showSelfImg: false,
        format: [ImageChooser.GIF, ImageChooser.JPEG, ImageChooser.PNG],
        goldenWidth: 30,
        goldenHeight: 30,
        maxSize: 1024
      });
      html.place(this.imageChooser.domNode, this.imageChooserNode);
      this.own(on(this.imageChooser, 'imageChange', lang.hitch(this, '_onImgChoosed')));

      this._update();//refresh
    },
    _update: function () {
      if (this.backgroundSetting) {
        this.config.background = this.backgroundSetting.getConfig();
      }
      this.updateDijit();
    },
    _onImgChoosed: function (fileData) {
      this.config.image = fileData;
      this._update();
    },

    getConfig: function () {
      return this.config;
    }
  });
  return clazz;
});