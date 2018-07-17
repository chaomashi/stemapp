///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/dom-construct',
  'dojo/on',
  'jimu/BaseWidget',
  'jimu/utils',
  './GridSetting'
], function(
  declare,
  lang,
  domConstruct,
  on,
  BaseWidget,
  utils,
  GridSetting
) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here
    baseClass: 'grid-overlay-widget',
    // this property is set by the framework when widget is loaded.
    name: 'GridOverlayWidget',
    // add additional properties here

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      this.gridSetting = new GridSetting({
        map: this.map,
        config: this.config
      });
      domConstruct.place(this.gridSetting.domNode, this.gridOverlayNode);
      this.gridSetting.startup();
      this.resetButton.title = window.jimuNls.common.reset;
      this.resetButton.innerText = window.jimuNls.common.reset;
      this.own(on(this.resetButton, "click", lang.hitch(this, function() {
        this.gridSetting.setConfig(this.config);
      })));
    },

    destroy: function() {
      this.inherited(arguments);
      this.gridSetting.gridOverlayCtrl.disable();
    },

    startup: function() {
      this.inherited(arguments);
      this._setTheme();
    },

    onOpen: function(){
      this.gridSetting.gridOverlayCtrl.enable();
      this.gridSetting.setConfig();
      if(this.appConfig.theme.name === "DashboardTheme" && !this.hasOwnProperty('closeable')) {
        this.gridSetting.alterToggleSwitch();
        this.gridSetting.cbxShowGrid.set('checked',true);
      }
    },

    onClose: function(){
      this.gridSetting._saveConfig();
      if (!this.gridSetting.getConfig().enableGridOnClose) {
        this.gridSetting.gridOverlayCtrl.disable();
      }
    },

    //source:
    //https://stackoverflow.com/questions/9979415/dynamically-load-and-unload-stylesheets
    _removeStyleFile: function (filename, filetype) {
      //determine element type to create nodelist from
      var targetelement = null;
      if (filetype === "js") {
        targetelement = "script";
      } else if (filetype === "css") {
        targetelement = "link";
      } else {
        targetelement = "none";
      }
      //determine corresponding attribute to test for
      var targetattr = null;
      if (filetype === "js") {
        targetattr = "src";
      } else if (filetype === "css") {
        targetattr = "href";
      } else {
        targetattr = "none";
      }
      var allsuspects = document.getElementsByTagName(targetelement);
      //search backwards within nodelist for matching elements to remove
      for (var i = allsuspects.length; i >= 0; i--) {
        if (allsuspects[i] &&
          allsuspects[i].getAttribute(targetattr) !== null &&
          allsuspects[i].getAttribute(targetattr).indexOf(filename) !== -1) {
          //remove element by calling parentNode.removeChild()
          allsuspects[i].parentNode.removeChild(allsuspects[i]);
        }
      }
    },

    _setTheme: function () {
      //Check if DartTheme
      if (this.appConfig.theme.name === "DartTheme") {
        //Load appropriate CSS for dart theme
        utils.loadStyleLink('darkOverrideCSS', this.folderUrl + "css/dartTheme.css", null);
      } else {
        this._removeStyleFile(this.folderUrl + "css/dartTheme.css", 'css');
      }
    }

  });

});
