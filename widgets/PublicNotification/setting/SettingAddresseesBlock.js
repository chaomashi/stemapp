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
  'dojo/dom-class',
  './settingComponents',
  './SettingCheckbox',
  './SettingContainer',
  './SettingObject',
  './SettingOptionsTable',
  './SettingStaticText'
], function (
  array,
  declare,
  lang,
  domClass,
  settingComponents,
  SettingCheckbox,
  SettingContainer,
  SettingObject,
  SettingOptionsTable,
  SettingStaticText
) {
  return declare(SettingObject, {
    _inputControl: null,
    _detailsDiv: null,
    _detailsTitle: null,
    _detailsCheckbox: null,
    _iCurrentDetails: -1,
    _menuItems: [],

    //================================================================================================================//

    /**
     * Constructor for class.
     * @param {string} name Name for component
     * @param {object} nls The terms in the current language
     * @param {string?} widthClass Class(es) to use for overall width of component
     * @memberOf SettingAddresseesBlock#
     * @constructor
     */
    constructor: function (name, nls, widthClass) {
      /*jshint unused:false*/
      var valueItems = [];
      this.nls = nls;

      this._inputControl = new SettingOptionsTable(null, 'half-width', '', nls.propertyLabels.name, null,
          nls.hints.selectionListOfOptionsToDisplay, lang.hitch(this, this._onRowSelected));

      this._detailsTitle = new SettingStaticText();
      this._detailsCheckbox =
        new SettingCheckbox(null, nls.propertyLabels.useRelatedRecords, '', lang.hitch(this, this._checkboxChanged));
      this._detailsDiv = settingComponents.container('half-width optionsTableHeaderHeight', 'majorTrailingVertGap', [
        this._detailsTitle.div(),
        this._detailsCheckbox.div()
      ]);

      this._mainDiv = new SettingContainer(null, 'flexbox ' + (widthClass || ''), 'majorTrailingHorizGap',
        nls.groupingLabels.addressSources, 'full-width', [
          this._inputControl,
          this._detailsDiv
        ]).div();
    },

    /**
     * Sets the component's configuration using the property matching the component's name.
     * @param {object} config Configuration item; if the component does not have a name, the component is not changed;
     *        otherwise, the component's name is used to get the property with its configuration
     * @memberOf SettingAddresseesBlock#
     */
    setConfig: function () {
      var formatFlags, formats;

      // Extract the sources menu from the source descriptions
      formatFlags = [this._config[0]];
      formats = this._config.slice(1);
      this._menuItems = array.map(formats, function (sourceFormat) {
        return sourceFormat.name;
      });

      if (this._menuItems.length > 0) {
        this._menuItems = [].concat(formatFlags, this._menuItems);
      } else {
        this._menuItems = [formatFlags];
      }

      // And set the menu
      this._inputControl.setValue(this._menuItems);

      // Pick the first item for the details
      this._setDetails(0);
    },

    /**
     * Gets the component's configuration using the property matching the component's name.
     * @param {object} config Configuration item; if the component does not have a name, config is not changed;
     *        otherwise, the component's name is used to create a property in config with the component's
     *        configuration
     * @param {array} problems List of problems found so far in the widget; if this component has a problem,
     *        it should push a string onto the list with a description
     * @memberOf SettingAddresseesBlock#
     */
    getConfig: function (config, problems) {
      /*jshint unused:false*/
      var origConfigItems = this._config.slice(1), updatedConfig;

      // Rearrange the configuration based on the current state of the menu
      this._menuItems = this._inputControl.getValue();
      updatedConfig = [this._menuItems[0]];

      array.forEach(this._menuItems.slice(1), function (menuItem) {
        array.some(origConfigItems, function (configItem) {
          if (menuItem === configItem.name) {
            updatedConfig.push(configItem);
          }
        });
      });

      this._config = updatedConfig;

      // Check the configuration
      if (this._config[0].indexOf('1') < 0) { // check bit flags
        problems.push(this.nls.problems.noAddresseeLayers);
      }
    },

    /*----------------------------------------------------------------------------------------------------------------*/

    /**
     * Sets the item from the left-hand list whose details are to be displayed in the right-hand column.
     * @param {number} itemNum 0-based index into list
     * @memberOf SettingAddresseesBlock#
     */
    _setDetails: function (itemNum) {
      var numMenuItems = this._config.length - 1;  // subtract 1 for flags in first array position

      if (0 <= itemNum && itemNum < numMenuItems && typeof this._config[itemNum + 1].useRelatedRecords === 'boolean') {
        // Show & set the details
        domClass.remove(this._detailsDiv, 'hidden');
        this._detailsTitle.setValue(this._config[itemNum + 1].name);
        this._iCurrentDetails = itemNum;

        // Init the related-records checkbox
        this._detailsCheckbox.setValue(this._config[itemNum + 1].useRelatedRecords);

      } else {
        // No table item or no related records: hide details
        domClass.add(this._detailsDiv, 'hidden');
        this._iCurrentDetails = -1;
      }
    },

    /**
     * Handles selection of a list item by updating the right-hand column of details.
     * @param {event} evt Event item with innerText property providing name of selected list item
     * @memberOf SettingAddresseesBlock#
     */
    _onRowSelected: function (evt) {
      var selectedItemTitle = evt.innerText.trim();  // event title comes with trailing CRLF
      array.some(this._menuItems, lang.hitch(this, function (menuItem, itemNum) {
        if (menuItem === selectedItemTitle) {
          this._setDetails(itemNum - 1);  // subtract 1 for flags in first array position
          return true;
        }
        return false;
      }));
    },

    /**
     * Handles click in checkbox indicating if a layer's related records should be used instead of the layer itself.
     * @param {boolean} newValue If true, use the layer's related records
     * @memberOf SettingAddresseesBlock#
     */
    _checkboxChanged: function (newValue) {
      if (this._iCurrentDetails >= 0) {
        this._config[this._iCurrentDetails + 1].useRelatedRecords = newValue;
      }
    }

    //================================================================================================================//
  });
});
