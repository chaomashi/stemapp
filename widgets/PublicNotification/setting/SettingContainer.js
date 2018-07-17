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
  'dojo/_base/lang',
  './settingComponents',
  './SettingObject'
], function (
  array,
  declare,
  lang,
  settingComponents,
  SettingObject
) {
  return declare(SettingObject, {
    _contents: [],

    //================================================================================================================//

    /**
     * Constructor for class.
     * @param {string} name Name for component
     * @param {string?} classes Class(es) to apply to created div
     * @param {string?} gapClass Class(es) to apply to gap between contained components
     * @param {string?} a See note in example section below
     * @param {string?} b See note in example section below
     * @param {string?} c See note in example section below
     * @example
     * Arguments a, b, and c adjust to varible argument list:
     *   Simple container: (classes, gapClass, contents)
     *   Bordered container: (classes, gapClass, groupLabel, groupClasses, contents)
     * Done this way because contents could be an array constructed in the calling parameter list, which would put
     * any arguments after it far out of sight.
     * @memberOf SettingContainer#
     * @constructor
     */
    constructor: function (name, classes, gapClass, a, b, c) {
      /*jshint unused:false*/
      var groupLabel, groupClasses, contents;

      if (Array.isArray(a)) {
        contents = a;
        this._contents = contents;
        this._mainDiv = settingComponents.container(classes || '', gapClass, this._getContentDivs(this._contents));
      } else {
        groupLabel = a;
        groupClasses = b;
        contents = c;
        this._contents = contents;
        this._mainDiv = settingComponents.fieldsetContainer(groupLabel, groupClasses, classes || '', gapClass,
          this._getContentDivs(this._contents));
      }
    },

    /**
     * Sets the component's configuration using the property matching the component's name.
     * @param {object} config Configuration item; if the component does not have a name, the component is not changed;
     *        otherwise, the component's name is used to get the property with its configuration
     * @memberOf SettingContainer#
     */
    setConfig: function (config) {
      array.forEach(this._contents, lang.hitch(this, function (item) {
        item.setConfig(this._config || config);
      }));
    },

    /**
     * Gets the component's configuration using the property matching the component's name.
     * @param {object} config Configuration item; if the component does not have a name, config is not changed;
     *        otherwise, the component's name is used to create a property in config with the component's
     *        configuration
     * @param {array} problems List of problems found so far in the widget; if this component has a problem,
     *        it should push a string onto the list with a description
     * @memberOf SettingContainer#
     */
    getConfig: function (config, problems) {
      if (this._name) {  // Only named items have configuration
        this._config = {};
      }
      array.forEach(this._contents, lang.hitch(this, function (item) {
        item.getConfig(this._config || config, problems);
      }));
    },

    /**
     * Filters a list of divs and/or components to extract only the divs and the components' divs.
     * @param {array} contents List of divs and/or components
     * @return {array} List of divs for each item in contents
     * @memberOf SettingContainer#
     */
    _getContentDivs: function (contents) {
      return array.map(contents, function (contentItem) {
        return contentItem.div ? contentItem.div() : contentItem;
      });
    }

    //================================================================================================================//
  });
});
