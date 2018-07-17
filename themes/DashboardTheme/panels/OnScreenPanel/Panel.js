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
  'jimu/BaseWidgetPanel',
  'dijit/_TemplatedMixin',
  'dojo/text!./Panel.html',
  'jimu/utils'
],
function(declare, html, BaseWidgetPanel, _TemplatedMixin, template, utils) {

  return declare([BaseWidgetPanel, _TemplatedMixin], {
    baseClass: 'jimu-panel jimu-dashboard-panel',
    templateString: template,
    titleHeight: 33,

    postCreate: function(){
      this.inherited(arguments);
    },

    _onCloseBtnClicked: function(evt) {
      evt.stopPropagation();
      this.panelManager.closePanel(this, 'wipe');
    },

    setPosition: function(position, resizeOnly){
      this.position = position;
      var style = utils.getPositionStyle(this.position);
      style.position = 'absolute';

      if(this.started){
        this.resize();
      }
      if (resizeOnly !== true || !html.isDescendant(this.domNode, html.byId(window.jimuConfig.layoutId))) {
        html.place(this.domNode, window.jimuConfig.layoutId);
      }
      html.setStyle(this.domNode, style);
    }
  });
});
