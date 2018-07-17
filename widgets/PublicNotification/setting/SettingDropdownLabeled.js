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
    _inputControlDiv: null,
    _inputControlOnChange: null,
    _disableNextOnChange: false,

    //================================================================================================================//

    /**
     * Constructor for class.
     * @param {string} name Name for component
     * @param {string?} widthClass Class(es) to use for overall width of component
     * @param {string?} leftColWidthClass Class(es) to use for left column
     * @param {string?} rightColWidthClass Class(es) to use for right column
     * @param {string} label Component's label
     * @param {string?} hint Hint text to display in component
     * @param {array} options List of objects containing `label` and
     *        'value'--one for each option in the dropdown; see example below
     * @param {function} onChange Function to call when component changes
     * @example
     *   'options': [
     *     {label: "Feet", value: "Feet"},
     *     {label: "Yards", value: "Yards"},
     *     {label: "Meters", value: "Meters", selected: true},
     *     {label: "Kilometers", value: "Kilometers"},
     *     {label: "Miles", value: "Miles"}
     *   ]
     * @memberOf SettingDropdownLabeled#
     * @constructor
     */
    constructor: function (name, widthClass, leftColWidthClass, rightColWidthClass,
      label, hint, options, onChange) {
      /*jshint unused:false*/
      var valueItems = [], subcomponent;

      // Assemble value column
      subcomponent = settingComponents.dropdownCtl(null, 'full-width', options);
      valueItems.push(subcomponent.div);
      this._inputControl = subcomponent.ctl;
      this._inputControlDiv = subcomponent.div;
      this._inputControlOnChange = onChange;
      this.own(on(this._inputControl, 'change', lang.hitch(this, this._onChange)));

      if (hint) {
        valueItems.push(settingComponents.text('hint', hint));
      }

      // Assemble label/value pair
      this._mainDiv = settingComponents.container('flexbox ' + (widthClass || ''), 'minorTrailingHorizGap', [
        settingComponents.container('inline-block ' + (leftColWidthClass ? leftColWidthClass : ''), '', [
          settingComponents.text('static-text', label)
        ]),
        settingComponents.container('inline-block ' + (rightColWidthClass ? rightColWidthClass : ''),
          'minorTrailingVertGap', valueItems)
      ]);
    },

    /**
     * Sets the component's value.
     * @param {any} value Dropdown item to select
     * @memberOf SettingDropdownLabeled#
     */
    setValue: function (value) {
      if (this._inputControl) {
        this._inputControl.set('value', value);
      }
    },

    /**
     * Gets the component's value.
     * @return {any} Dropdown's value
     * @memberOf SettingDropdownLabeled#
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
     * @memberOf SettingDropdownLabeled#
     */
    setConfig: function () {
      if (this._inputControl && this._config && this._config !== this.getValue()) {
        this._disableNextOnChange = true;
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
     * @memberOf SettingDropdownLabeled#
     */
    getConfig: function (config, problems) {
      if (this._inputControl) {
        this._config = this.getValue();
      }
    },

    /**
     * Sets the options in the dropdown
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
     * @memberOf SettingDropdownLabeled#
     */
    setOptions: function (options) {
      if (this._inputControl) {
        this._inputControl.destroy();
      }
      this._inputControl =
       settingComponents.dropdown(this._inputControlDiv, 'full-width', options, this._inputControlOnChange);
    },

    /**
     * Forwards a change event, but only if forwarding is permitted; setConfig() disables the event forwarding
     * once to prevent an infinite event loop.
     * @memberOf SettingDropdownLabeled#
     */
    _onChange: function (evt) {
      if (!this._disableNextOnChange) {
        this._inputControlOnChange(evt);
      } else {
        this._disableNextOnChange = false;
      }
    }

    //================================================================================================================//
  });
});
