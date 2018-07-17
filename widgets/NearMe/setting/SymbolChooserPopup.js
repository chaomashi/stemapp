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
  'jimu/BaseWidgetSetting',
  "dijit/_WidgetsInTemplateMixin",
  "dojo/_base/lang",
  "dojo/dom-class",
  "dojo/dom-construct",
  "dojo/on",
  "dojo/text!./SymbolChooserPopup.html",
  "jimu/dijit/SymbolChooser",
  "jimu/dijit/Popup",
  "dojo/domReady!"
], function (
  declare,
  BaseWidgetSetting,
  _WidgetsInTemplateMixin,
  lang,
  domClass,
  domConstruct,
  on,
  SymbolChooserTemplate,
  SymbolChooser,
  Popup
) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    templateString: SymbolChooserTemplate,
    baseClass: 'jimu-widget-nearme-setting',

    postCreate: function () {
      //attach 'click' event
      this.own(on(this.okButton, 'click', lang.hitch(this, this._onOKButtonClicked)));
      //initialize symbol chooser widget
      this._initSymbolChooser();
      //initialize popup dialog
      this._createSymbolChooserPopup();
    },

    /**
    * Initialize symbol chooser
    * @memberOf widgets/NearMe/setting/SymbolChooserPopup
    **/
    _initSymbolChooser: function () {
      this.symbolChooser = new SymbolChooser(this.symbolParams,
          domConstruct.create("div", {}, this.symbolData));
      this.symbolChooser.startup();
    },

    /**
    * create and display popup for symbol chooser
    * @memberOf widgets/NearMe/setting/SymbolChooserPopup
    **/
    _createSymbolChooserPopup: function () {
      this.popup = new Popup({
        titleLabel: this.symbolChooserTitle,
        width: 420,
        height: 400,
        content: this.domNode
      });
    },

    /**
    * handle click event for disabled buttons
    * @memberOf widgets/NearMe/setting/SymbolChooserPopup
    **/
    _onOKButtonClicked: function () {
      //check if ok button is enabled
      if (!domClass.contains(this.okButton, "jimu-state-disabled")) {
        this.onOkClick();
      }
    },

    onOkClick: function (evt) {
      return evt;
    }
  });
});