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
  './settingComponents',
  './SettingObject'
], function (
  declare,
  settingComponents,
  SettingObject
) {
  return declare(SettingObject, {
    _inputControl: null,

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
     * @param {DOM element?|string?} suffixDiv Div or string to insert inline after input item
     * @param {object?} numberConstraints Dojo NumberTextBox constraints item,
     *        e.g., {min: -20000, max: 20000, places: 2}; only used if constrainToNumbers is true
     * @memberOf SettingInputLabeled#
     * @constructor
     */
    constructor: function (name, constrainToNumbers, widthClass, leftColWidthClass, rightColWidthClass,
      label, placeholder, hint, prefixDiv, suffixDiv, numberConstraints) {
      /*jshint unused:false*/
      var valueItems = [], valueLineItems = [], subcomponent;

      // Assemble value column
      if (prefixDiv || suffixDiv) {
        // Prefix
        if (prefixDiv) {
          if (typeof prefixDiv === 'string') {
            valueLineItems.push(settingComponents.text('static-text', prefixDiv));
          } else {
            valueLineItems.push(prefixDiv.div());
          }
        }

        // Input area
        subcomponent = constrainToNumbers ?
          settingComponents.numberInputCtl('variable-width inline-block', placeholder, numberConstraints) :
          settingComponents.textInputCtl('variable-width inline-block', placeholder);
        valueLineItems.push(subcomponent.div);
        this._inputControl = subcomponent.ctl;

        // Suffix
        if (suffixDiv) {
          if (typeof suffixDiv === 'string') {
            valueLineItems.push(settingComponents.text('static-text', suffixDiv));
          } else {
            valueLineItems.push(suffixDiv.div());
          }
        }
        valueItems.push(settingComponents.container('full-width flexbox', 'minorTrailingHorizGap', valueLineItems));

      } else {
        // Input area only
        subcomponent = constrainToNumbers ?
          settingComponents.numberInputCtl('full-width inline-block', placeholder, numberConstraints) :
          settingComponents.textInputCtl('full-width inline-block', placeholder);
        valueItems.push(subcomponent.div);
        this._inputControl = subcomponent.ctl;
      }

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
     * @param {string} value Text to insert
     * @memberOf SettingInputLabeled#
     */
    setValue: function (value) {
      if (this._inputControl) {
        this._inputControl.set('value', value);
      }
    },

    /**
     * Gets the component's value.
     * @return {string} Component's text
     * @memberOf SettingInputLabeled#
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
     * @memberOf SettingInputLabeled#
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
     * @memberOf SettingInputLabeled#
     */
    getConfig: function (config, problems) {
      if (this._inputControl) {
        this._config = this.getValue();
      }
    }

    //================================================================================================================//
  });
});
