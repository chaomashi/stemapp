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
  'dojo/_base/array',
  'dojo/_base/declare',
  './SettingContainer',
  './SettingObject',
  './SettingOptionsTable'
], function (
  array,
  declare,
  SettingContainer,
  SettingObject,
  SettingOptionsTable
) {
  return declare(SettingObject, {
    _inputControl: null,

    //================================================================================================================//

    /**
     * Constructor for class.
     * @param {string} name Name for component
     * @param {object} nls The terms in the current language
     * @param {string} widthClass Class(es) to use for overall width of component
     * @memberOf SettingLabelFormats#
     * @constructor
     */
    constructor: function (name, nls, widthClass) {
      /*jshint unused:false*/
      this.nls = nls;

      this._inputControl = new SettingOptionsTable(null, 'half-width', '', nls.propertyLabels.description, null,
          nls.hints.selectionListOfOptionsToDisplay);

      this._mainDiv = new SettingContainer(null, 'flexbox ' + (widthClass || ''), 'majorTrailingHorizGap',
        nls.groupingLabels.labelFormats, 'full-width', [this._inputControl]).div();
    },

    /**
     * Sets the component's configuration using the property matching the component's name.
     * @param {object} config Configuration item; if the component does not have a name, the component is not changed;
     *        otherwise, the component's name is used to get the property with its configuration
     * @memberOf SettingLabelFormats#
     */
    setConfig: function () {
      var formatFlags, formats, menuItems;

      // Extract the label menu from the format descriptions
      formatFlags = [this._config[0]];
      formats = this._config.slice(1);
      menuItems = array.map(formats, function (labelFormat) {
        return labelFormat.name;
      });

      if (menuItems.length > 0) {
        menuItems = [].concat(formatFlags, menuItems);
      } else {
        menuItems = [formatFlags];
      }

      // And set the menu
      this._inputControl.setValue(menuItems);
    },

    /**
     * Gets the component's configuration using the property matching the component's name.
     * @param {object} config Configuration item; if the component does not have a name, config is not changed;
     *        otherwise, the component's name is used to create a property in config with the component's
     *        configuration
     * @param {array} problems List of problems found so far in the widget; if this component has a problem,
     *        it should push a string onto the list with a description
     * @memberOf SettingLabelFormats#
     */
    getConfig: function (config, problems) {
      var menuItems, origConfigItems = this._config.slice(1), updatedConfig;

      // Rearrange the configuration based on the current state of the menu
      menuItems = this._inputControl.getValue();
      updatedConfig = [menuItems[0]];

      array.forEach(menuItems.slice(1), function (menuItem) {
        array.some(origConfigItems, function (configItem) {
          if (menuItem === configItem.name) {
            updatedConfig.push(configItem);
          }
        });
      });

      this._config = updatedConfig;

      // Check the configuration
      if (this._config[0].indexOf('1') < 0) { // check bit flags
        problems.push(this.nls.problems.noNotificationLabelFormats);
      }
    }

    //================================================================================================================//
  });
});
