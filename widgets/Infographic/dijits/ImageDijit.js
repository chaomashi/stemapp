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
  'dojo/_base/html',
  './BaseDijit',
  "./styleUtils"
], function (declare, html, BaseDijit, styleUtils) {
  var clazz = declare([BaseDijit], {
    templateString: '<div></div>',
    type: 'image',
    config: null,

    constructor: function (options) {
      this.config = options.config;
    },

    postCreate: function () {
      this.setConfig(this.config);
    },

    setConfig: function (config) {
      this.config = config;
      this.domNode.innerHTML = "";
      html.addClass(this.domNode, "table-layout-container");
      //html.addClass(this.domNode, "image-node");

      this.innerDom = html.create('div', {
        "class": "image-node"
      }, this.domNode);
      html.place(this.innerDom, this.domNode);

      var style = {};
      styleUtils.background.setStyle(this.config.background, style, this);
      styleUtils.image.setStyle(this.config, style, this);

      html.setStyle(this.innerDom, style);
    }
  });
  return clazz;
});