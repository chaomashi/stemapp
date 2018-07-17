/*
 | Copyright © 2014 - 2018 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
//====================================================================================================================//
define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/on',
  './settingComponents',
  './SettingObject'
], function (
  declare,
  lang,
  on,
  settingComponents,
  SettingObject
) {
  return declare(SettingObject, {
    _callback: null,

    //================================================================================================================//

    /**
     * Constructor for class.
     * @param {string} name Name for component
     * @param {string} classes Class(es) to apply to created div
     * @param {string} tooltip Button's tooltip
     * @param {function} onClick Event handler to call when button
     *        is clicked; preserves 'this' context
     * @param {boolean} provideCallback If true, calls callback defined in component
     * @param {string} label Component's label
     * @memberOf SettingButton#
     * @constructor
     */
    constructor: function (name, classes, tooltip, onClick, provideCallback, label) {
      /*jshint unused:false*/
      // Two argument lists:
      //   Icon button: (classes, tooltip, onClick, provideCallback)
      //   Text button: (classes, tooltip, onClick, provideCallback, label)
      var clickHandler = onClick;
      if (provideCallback) {
        clickHandler = lang.hitch(this, function () {
          var value = onClick();
          if (this._callback) {
            this._callback(value);
          }
        });
      }
      if (label) {
        this._mainDiv = settingComponents.textButton(classes, label, tooltip);
      } else {
        this._mainDiv = settingComponents.iconButton(classes, tooltip);
      }
      this.own(on(this._mainDiv, 'click', lang.hitch(this, clickHandler)));
    },

    /**
     * Sets the function to be used for the component's callback
     * @param {function} callback
     * @memberOf SettingButton#
     */
    setCallback: function (callback) {
      this._callback = callback;
    }

    //================================================================================================================//
  });
});
