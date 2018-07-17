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
    _inputControl: null,

    //================================================================================================================//

    /**
     * Constructor for class.
     * @param {string} name Name for component
     * @param {string} divClasses Class(es) to apply to created div
     * @param {string} dropdownClasses Class(es) to use for dropdown
     * @param {array} options List of objects containing `label` and
     *        'value'--one for each option in the dropdown; see example below
     * @example
     *   'options': [
     *     {label: "Feet", value: "Feet"},
     *     {label: "Yards", value: "Yards"},
     *     {label: "Meters", value: "Meters", selected: true},
     *     {label: "Kilometers", value: "Kilometers"},
     *     {label: "Miles", value: "Miles"}
     *   ]
     * @memberOf SettingDropdown#
     * @constructor
     */
    constructor: function (name, divClasses, dropdownClasses, options) {
      /*jshint unused:false*/
      var subcomponent = settingComponents.dropdownCtl(divClasses, dropdownClasses, options);
      this._mainDiv = subcomponent.div;
      this._inputControl = subcomponent.ctl;
      this.own(on(this._inputControl, 'change', lang.hitch(this, this._onChange)));
    },

    /**
     * Sets the component's value.
     * @param {any} value Dropdown item to select
     * @memberOf SettingDropdown#
     */
    setValue: function (value) {
      if (this._inputControl) {
        this._inputControl.set('value', value);
      }
    },

    /**
     * Gets the component's value.
     * @return {any} Dropdown's value
     * @memberOf SettingDropdown#
     */
    getValue: function () {
      if (this._inputControl) {
        return this._inputControl.get('value');
      }
      return null;
    },

    /**
     * Sets the component's configuration using the property matching the component's name.
     * @param {object} config Configuration item; if the component does not have a name, the component is not changed;
     *        otherwise, the component's name is used to get the property with its configuration
     * @memberOf SettingDropdown#
     */
    setConfig: function () {
      if (this._inputControl && this._config) {
        this.setValue(this._config);
      }
    },

    /**
     * Gets the component's configuration using the property matching the component's name.
     * @param {object} config Configuration item; if the component does not have a name, config is not changed;
     *        otherwise, the component's name is used to create a property in config with the component's
     *        configuration
     * @param {array} problems List of problems found so far in the widget; if this component has a problem,
     *        it should push a string onto the list with a description
     * @memberOf SettingDropdown#
     */
    getConfig: function (config, problems) {
      if (this._inputControl) {
        this._config = this.getValue();
      }
    },

    /**
     * Updates the component's configured value based on a change event.
     * @param {string} newValue Value to set
     * @memberOf SettingDropdown#
     */
    _onChange: function (newValue) {
      this._config = newValue;
    }

    //================================================================================================================//
  });
});
