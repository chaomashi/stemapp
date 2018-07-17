///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dojo/_base/lang',
  'dojo/Evented',
  'dojo/dom-construct',
  'dojo/_base/html',
  'dojo/_base/array',
  'dojo/query',
  'dojo/on',
  'dojo/dom-style',
  'jimu/dijit/Popup',
  'jimu/dijit/CheckBox',
  'dojo/NodeList-data'
], function (
  declare,
  _WidgetBase,
  lang,
  Evented,
  domConstruct,
  html,
  array,
  query,
  on,
  domStyle,
  Popup,
  CheckBox
) {
  return declare([_WidgetBase, Evented], {
    baseClass: 'jimu-widget-screening',

    selectedFields: [],
    fieldsPopup: null,

    constructor: function (options) {
      this.selectedFields = [];
      this.fieldsPopup = null;
      lang.mixin(this, options);
    },

    startup: function () {
      this._populateConfiguredFields();
      this.onFieldsSelectorClick();
      on(window, "resize", lang.hitch(this, function () {
        this._setFieldPopupDimensions();
      }));
    },

    /**
     * Populate all the fields on widget load
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _populateConfiguredFields: function () {
      var fieldName;
      for (fieldName in this.outFields) {
        this.selectedFields.push(fieldName);
      }
    },

    /**
     * Show field selector popup with selected options
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    onFieldsSelectorClick: function () {
      var fieldName, parentContainer, contentDom, count = 0;
      parentContainer = html.create('div', {});
      //Create label to add dialog header instruction text
      domConstruct.create("div", {
        "class": "esriCTSelectFieldReportLabel",
        "innerHTML": this.fieldTitle
      }, parentContainer);

      contentDom = html.create('div', {
        "class": "esriCTSelectFieldParentContainer",
        style: {
          maxHeight: '350px'
        }
      }, parentContainer);

      this._fieldsCheckBox = [];
      for (fieldName in this.outFields) {
        var chk = new CheckBox({
          checked: this._isSearchable(this.outFields[fieldName]),
          label: this.outFields[fieldName].label ||
          this.outFields[fieldName].alias || fieldName
        });
        html.addClass(chk.domNode, 'esriCTLayerFieldCheckbox');
        html.addClass(chk.labelNode, 'jimu-ellipsis');
        html.setAttr(chk.domNode, {
          'title': this.outFields[fieldName].label ||
          this.outFields[fieldName].alias || fieldName
        });
        //Add background color to checkbox in Dart Theme
        //This will resolve the issue of checkbox not showing checked images
        if (this.appConfig.theme.name === "DartTheme") {
          domStyle.set(chk.domNode.children[0], "backgroundColor", "#4c4c4c");
        }
        if (count % 3 === 0) {
          if (window.isRTL) {
            html.setStyle(chk.domNode, 'marginRight', 0);
          } else {
            html.setStyle(chk.domNode, 'marginLeft', 0);
          }
        }
        chk.placeAt(contentDom);
        query(chk.domNode).data('fieldName', fieldName);
        this._fieldsCheckBox.push(chk);
        count++;
      }

      this.fieldsPopup = new Popup({
        titleLabel: this.popupTitle,
        autoHeight: true,
        content: parentContainer,
        container: window.jimuConfig.layoutId,
        width: 640,
        maxHeight: 600,
        buttons: [{
          label: this.nls.common.ok,
          onClick: lang.hitch(this, '_onSearchFieldsOk')
        }, {
          label: this.nls.common.cancel
        }],
        onClose: lang.hitch(this, function () {
          this.fieldsPopup = null;
        })
      });
      html.addClass(this.fieldsPopup.domNode, this.appConfig.theme.name + "  " + this.baseClass);
      this._setFieldPopupDimensions();
    },

    /**
     * Set popup fields dimensions
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _setFieldPopupDimensions: function () {
      if (this.fieldsPopup) {
        //If app is running in mobile mode, change the field selector popup dimensions
        if (window.appInfo.isRunInMobile) {
          this.fieldsPopup.set("width", window.innerWidth - 100);
          query(".esriCTLayerFieldCheckbox").addClass("esriCTLayerFieldWithoutMargin");
          domStyle.set(query(".esriCTSelectFieldParentContainer")[0], "height", "200px");
        } else {
          //Reset the field selector popup dimensions to default
          this.fieldsPopup.set("width", 640);
          this.fieldsPopup.set("maxHeight", 600);
          query(".esriCTLayerFieldCheckbox").removeClass("esriCTLayerFieldWithoutMargin");
        }
      }
    },

    /**
     * Set previously selected fields checkbox to true
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _isSearchable: function (field) {
      return array.some(this.selectedFields, lang.hitch(this, function (sf) {
        if (field.hasOwnProperty("name")) {
          return field.name === sf;
        } else if (field.hasOwnProperty("fieldName")) {
          return field.fieldName === sf;
        }
        return false;
      }));
    },

    /**
     * Store selected checkbox values
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _onSearchFieldsOk: function () {
      var _fields = [];
      array.forEach(this._fieldsCheckBox, function (chk) {
        if (chk.getValue()) {
          var _data = query(chk.domNode).data('fieldName');
          _fields.push(_data[0]);
          query(chk.domNode).removeData();
        }
      });
      this._setSearchFields(_fields);
      this.fieldsPopup.close();
      this.emit("onFieldSelectComplete", this.selectedFields);
    },

    /**
     * Get selected fields
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _getSearchFields: function () {
      return this.selectedFields;
    },

    /**
     * Set selected fields
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _setSearchFields: function (fields) {
      this.selectedFields = fields;
    }
  });
});