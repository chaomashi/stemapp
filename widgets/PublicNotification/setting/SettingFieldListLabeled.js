/* global jimuNls */
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
  'dojo/dom-attr',
  'dojo/dom-class',
  'dojo/dom-construct',
  'dojo/dom-style',
  'dojo/on',
  'dojo/query',
  'jimu/dijit/CheckBox',
  'jimu/dijit/Popup',
  './settingComponents',
  './SettingObject'
], function (
  array,
  declare,
  lang,
  domAttr,
  domClass,
  domConstruct,
  domStyle,
  on,
  query,
  CheckBox,
  Popup,
  settingComponents,
  SettingObject
) {
  return declare(SettingObject, {
    _echoArea: null,
    _fieldMenuItems: [],
    _fieldsCheckBoxes: [],
    _fieldsPopup: null,
    _nls: null,
    _label: '',

    //================================================================================================================//

    /**
     * Constructor for class.
     * @param {string} name Name for component
     * @param {object} nls The terms in the current language
     * @param {string?} widthClass Class(es) to use for overall width of component
     * @param {string?} leftColWidthClass Class(es) to use for left column
     * @param {string?} rightColWidthClass Class(es) to use for right column
     * @param {string} label Component's label
     * @param {string?} hint Hint text to display in component
     * @param {array} fieldMenuItems List of field descriptions containing value and label properties
     * @memberOf SettingFieldListLabeled#
     * @constructor
     */
    constructor: function (name, nls, widthClass, leftColWidthClass, rightColWidthClass,
      label, hint, fieldMenuItems) {
      /*jshint unused:false*/
      var valueItems = [], valueLineItems = [], subcomponent, fieldSelectorButton;
      this._nls = nls;
      this._label = label;
      this._fieldMenuItems = fieldMenuItems;

      // Assemble value column
      // Echo area
      this._echoArea = settingComponents.text('variable-width inline-block readOnlyTextField');
      valueLineItems.push(this._echoArea);

      // Button for field selector
      fieldSelectorButton = settingComponents.iconButton('edit-button', nls.tooltips.openFieldSelector);
      this.own(on(fieldSelectorButton, 'click', lang.hitch(this, this._onFieldsSelectorClick)));
      valueLineItems.push(fieldSelectorButton);

      valueItems.push(settingComponents.container('full-width flexbox', 'minorTrailingHorizGap', valueLineItems));

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
     * Sets the display to show a list of aliases.
     * @param {array} aliases
     * @memberOf SettingFieldListLabeled#
     */
    setDisplay: function (aliases) {
      if (this._echoArea) {
        this._echoArea.innerHTML = Array.isArray(aliases) && aliases.length > 0 ? aliases.join(',') : '';
      }
    },

    /**
     * Sets the component's configuration using the property matching the component's name.
     * @param {object} config Configuration item; if the component does not have a name, the component is not changed;
     *        otherwise, the component's name is used to get the property with its configuration
     * @memberOf SettingFieldListLabeled#
     */
    setConfig: function () {
      var aliases = [];
      if (Array.isArray(this._config) && this._config.length > 0) {
        // Use config and this._fieldMenuItems to generate an equivalent list of aliases
        array.forEach(this._config, lang.hitch(this, function (field) {
          array.some(this._fieldMenuItems, function(fieldAliasPair) {
            if (field === fieldAliasPair.value) {
              aliases.push(fieldAliasPair.label);
              return true;
            }
            return false;
          });
        }));
      }
      this.setDisplay(aliases);
    },

    /**
     * Updates the component's list of fields.
     * @param {array} fieldMenuItems List of field descriptions containing value and label properties
     * @memberOf SettingFieldListLabeled#
     */
    setFieldList: function (fieldMenuItems) {
      this._fieldMenuItems = fieldMenuItems;
    },

    //----------------------------------------------------------------------------------------------------------------//

    /**
     * Displays the fields-selector dialog.
     * @memberOf SettingFieldListLabeled#
     */
    _onFieldsSelectorClick: function () {
      var contentDom = domConstruct.create('div', {
        style: {
          maxHeight: '480px'
        }
      });

      /*this._fieldMenuItems = [{
        'label': field.alias || field.name,
        'value': field.name
      }];*/
      this._fieldsCheckBoxes = [];
      array.forEach(this._fieldMenuItems, lang.hitch(this, function(fieldAliasPair, idx) {
        var chk = new CheckBox({
          checked: this._arrayContains(this._config, fieldAliasPair.value),
          label: fieldAliasPair.label
        });
        domClass.add(chk.domNode, 'fields-checkbox');
        domClass.add(chk.labelNode, 'jimu-ellipsis');
        domAttr.set(chk.domNode, 'title', fieldAliasPair.label);
        if (idx % 3 === 0) {
          if (window.isRTL) {
            domStyle.set(chk.domNode, 'marginRight', 0);
          } else {
            domStyle.set(chk.domNode, 'marginLeft', 0);
          }
        }
        chk.placeAt(contentDom);
        query(chk.domNode).data('fieldName', fieldAliasPair.value);
        this._fieldsCheckBoxes.push(chk);
      }));

      this._fieldsPopup = new Popup({
        titleLabel: this._label,
        autoHeight: true,
        content: contentDom,
        container: window.jimuConfig.layoutId,
        width: 640,
        maxHeight: 600,
        buttons: [{
          label: jimuNls.common.ok,
          onClick: lang.hitch(this, '_onSearchFieldsOk')
        }, {
          label: jimuNls.common.cancel,
          classNames: ['jimu-btn-vacation']
        }],
        onClose: lang.hitch(this, function () {
          this._fieldsPopup = null;
        })
      });
      domClass.add(this._fieldsPopup.domNode, 'jimu-widget-public-notification-setting-fields');
    },

    /**
     * Reports if an array contains a value.
     * @param {array} list
     * @param {any} value
     * @return {boolean}
     * @memberOf SettingFieldListLabeled#
     */
    _arrayContains: function (list, value) {
      return array.some(list, function (element) {
        return element === value;
      });
    },

    /**
     * Updates list of selected fields.
     * @memberOf SettingFieldListLabeled#
     */
    _onSearchFieldsOk: function () {
      var fields = [], aliases = [];
      array.forEach(this._fieldsCheckBoxes, function(chk) {
        if (chk.getValue()) {
          var data = query(chk.domNode).data('fieldName');
          fields.push(data[0]);
          query(chk.domNode).removeData();
          aliases.push(chk.label);
        }
      });
      this._config = fields;
      this.setDisplay(aliases);
      this._fieldsPopup.close();
    }

    //================================================================================================================//
  });
});
