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
    'dojo/_base/html',
    'dojo/query',
    'dojo/on',
    'dojo/_base/lang',
    './common',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidget'
  ],
  function(declare, html, query, on, lang, common, _WidgetsInTemplateMixin, BaseWidget) {
    var clazz = declare([BaseWidget, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-about',
      // clasName: 'esri.widgets.About',

      _hasContent: null,

      postCreate: function () {
        this.inherited(arguments);
      },

      startup: function () {
        this.inherited(arguments);

        if (common.isDefaultContent(this.config)) {
          this.config.about.aboutContent = common.setDefaultContent(this.config, this.nls);
        }
        this.resize();
      },

      resize: function () {
        this._resizeContentImg();
      },

      _resizeContentImg: function () {
        html.empty(this.customContentNode);

        var aboutContent = html.toDom(this.config.about.aboutContent);
        html.place(aboutContent, this.customContentNode);
        // single node only(no DocumentFragment)
        if (this.customContentNode.nodeType && this.customContentNode.nodeType === 1) {
          var contentImgs = query('img', this.customContentNode);
          if (contentImgs && contentImgs.length) {
            contentImgs.forEach(lang.hitch(this, function (img) {
              var isNotLoaded = ("undefined" !== typeof img.complete && false === img.complete) ? true : false;
              if (isNotLoaded) {
                this.own(on(img, 'load', lang.hitch(this, function () {
                  this._resizeImg(img);
                })));
              } else {
                this._resizeImg(img);
              }
            }));
          }
        }
      },
      _resizeImg: function(img) {
        var customBox = html.getContentBox(this.customContentNode);
        var imgSize = html.getContentBox(img);
        if (imgSize && imgSize.w && imgSize.w >= customBox.w) {
          html.setStyle(img, {
            maxWidth: (customBox.w - 20) + 'px', // prevent x scroll
            maxHeight: (customBox.h - 40) + 'px'
          });
        }
      }
    });
    return clazz;
  });