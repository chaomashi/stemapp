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
  './SettingDropdown',
  './SettingInputLabeled',
  './SettingObject'
], function (
  declare,
  SettingDropdown,
  SettingInputLabeled,
  SettingObject
) {
  return declare(SettingObject, {
    _inputControl: null,
    _inputModifier: null,

    //================================================================================================================//

    /**
     * Constructor for class.
     * @param {string} name Name for component
     * @param {boolean} constrainToNumbers Constrain text input to numbers or permit any text
     * @param {string?} widthClass Class(es) to use for overall width of component
     * @param {string?} leftColWidthClass Class(es) to use for left column
     * @param {string?} rightColWidthClass Class(es) to use for right column
     * @param {string} label Component's label
     * @param {string} placeholder Example text to display inside component's input area
     * @param {string?} hint Hint text to display in component
     * @param {DOM element?|string?} prefixDiv Div or string to insert inline before input item
     * @param {string} dropdownClasses Class(es) to use for dropdown
     * @param {string} dropdownElemClass Class(es) to use for dropdown elements
     * @param {string} dropdownOptions List of objects containing `label` and
     *        'value'--one for each option in the dropdown; see example below
     * @param {object?} numberConstraints Dojo NumberTextBox constraints item,
     *        e.g., {min: -20000, max: 20000, places: 2}; only used if constrainToNumbers is true
     * @example
     *   'options': [
     *     {label: "Feet", value: "Feet"},
     *     {label: "Yards", value: "Yards"},
     *     {label: "Meters", value: "Meters", selected: true},
     *     {label: "Kilometers", value: "Kilometers"},
     *     {label: "Miles", value: "Miles"}
     *   ]
     * @memberOf SettingInputWithDropdownLabeled#
     * @constructor
     */
    constructor: function (name, constrainToNumbers, widthClass, leftColWidthClass, rightColWidthClass,
      label, placeholder, hint, prefixDiv, dropdownClass, dropdownElemClass, dropdownOptions, numberConstraints) {
      /*jshint unused:false*/
      this._inputModifier = new SettingDropdown(null, dropdownClass, dropdownElemClass, dropdownOptions);
      this._inputControl =
        new SettingInputLabeled(null, constrainToNumbers, widthClass, leftColWidthClass, rightColWidthClass,
        label, placeholder, hint, prefixDiv, this._inputModifier, numberConstraints);
      this._mainDiv = this._inputControl.div();
    },

    /**
     * Sets the component's value.
     * @param {any} value Value to put into input subcomponent
     * @memberOf SettingInputWithDropdownLabeled#
     */
    setValue: function (value) {
      if (this._inputControl) {
        this._inputControl.setValue(value);
      }
    },

    /**
     * Sets the component's value.
     * @param {any} value Dropdown item to select
     * @memberOf SettingInputWithDropdownLabeled#
     */
    setModifier: function (value) {
      if (this._inputModifier) {
        this._inputModifier.setValue(value);
      }
    },

    /**
     * Gets the component's value.
     * @return {any} Value in input subcomponent
     * @memberOf SettingInputWithDropdownLabeled#
     */
    getValue: function () {
      if (this._inputControl) {
        return this._inputControl.getValue();
      }
      return null;
    },

    /**
     * Gets the component's value.
     * @return {any} Dropdown's value
     * @memberOf SettingInputWithDropdownLabeled#
     */
    getModifier: function () {
      if (this._inputModifier) {
        return this._inputModifier.getValue();
      }
      return null;
    },

    /**
     * Sets the component's configuration using the property matching the component's name.
     * @param {object} config Configuration item; if the component does not have a name, the component is not changed;
     *        otherwise, the component's name is used to get the property with its configuration
     * @memberOf SettingInputWithDropdownLabeled#
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
     * @memberOf SettingInputWithDropdownLabeled#
     */
    getConfig: function (config, problems) {
      if (this._inputControl) {
        this._config = this.getValue();
      }
    }

    //================================================================================================================//
  });
});
