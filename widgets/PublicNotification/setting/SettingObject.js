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
  'dijit/Destroyable'
], function (
  declare,
  Destroyable
) {
  return declare(Destroyable, {
    '-chains-': {  // how to call subclasses relative to superclass
      setConfig: 'after',  // after superclass
      getConfig: 'before'  // before superclass
    },
    _name: null,
    _config: null,
    _mainDiv: null,

    //================================================================================================================//

    /**
     * Constructor for class.
     * @param {string} name Name for component
     * @memberOf SettingObject#
     * @constructor
     */
    constructor: function (name) {
      this._name = name;
    },

    /**
     * Returns the component's DOM element.
     * @return {DOM element}
     * @memberOf SettingObject#
     */
    div: function () {
      return this._mainDiv;
    },

    /**
     * Sets the component's configuration using the property matching the component's name.
     * @param {object} config Configuration item; if the component does not have a name, the component is not changed;
     *        otherwise, the component's name is used to get the property with its configuration
     * @memberOf SettingObject#
     */
    setConfig: function (config) {
      if (this._name) {  // Only named items have configuration
        this._config = config[this._name];
      }
    },

    /**
     * Gets the component's configuration using the property matching the component's name.
     * @param {object} config Configuration item; if the component does not have a name, config is not changed;
     *        otherwise, the component's name is used to create a property in config with the component's
     *        configuration
     * @param {array} problems List of problems found so far in the widget; if this component has a problem,
     *        it should push a string onto the list with a description
     * @memberOf SettingObject#
     */
    getConfig: function (config, problems) {
      if (this._name) {  // Only named items have configuration
        config[this._name] = this._config;
      }
    }

    //================================================================================================================//
  });
});
