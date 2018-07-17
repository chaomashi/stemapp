///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
    'dojo/_base/declare',
    "jimu/BaseWidgetSetting",
    "dijit/_WidgetsInTemplateMixin",
    'dojo/text!./FieldSelector.html',
    'dijit/TooltipDialog',
    'dijit/popup',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/on',
    'dojo/dom-style',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/_base/array'
  ],
  function (declare, BaseWidgetSetting, _WidgetsInTemplateMixin,
    FieldSelectorTemplate, TooltipDialog, dojoPopup, lang, html, on, domStyle,
    domAttr, domConstruct, array) {

    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-RelatedTableCharts-setting',
      templateString: FieldSelectorTemplate,
      /*Array's to store dataType keywords*/
      _stringFieldType: 'esriFieldTypeString',
      _oidFieldType: 'esriFieldTypeOID',
      _numberFieldTypes: ['esriFieldTypeSmallInteger',
        'esriFieldTypeInteger',
        'esriFieldTypeSingle',
        'esriFieldTypeDouble'
      ],
      //flag to mantain the dialog open state
      _isTooltipDialogOpened: false,
      //options
      fields: [],
      hideOnSelect: false,
      showOnlyNumericFields: false,

      //events generated
      //onSelect

      startup: function () {
        this.inherited(arguments);
      },

      postCreate: function () {
        this._createTooltipDialog(this.domNode);
        this._hideTooltipDialog();
      },

      destroy: function () {
        dojoPopup.close(this.tooltipDialog);
        this.tooltipDialog.destroy();
        this.inherited(arguments);
      },

      /**
      * Function to check if the target node is part of the popup or not
      * @memberOf widgets/RelatedTableCharts/settings/FieldSelector.js
      **/
      isPartOfPopup: function (target) {
        var node, isInternal;
        node = this.tooltipDialog.domNode;
        isInternal = target === node || html.isDescendant(target,
          node);
        return isInternal;
      },

      /**
      * Event which will be generated on selecting any field
      * @memberOf widgets/RelatedTableCharts/settings/FieldSelector.js
      **/
      onSelect: function (selectedField) { /*jshint unused: false*/ },

      /**
      * Function to show the dialog
      * @memberOf widgets/RelatedTableCharts/settings/FieldSelector.js
      **/
      _showTooltipDialog: function () {
        dojoPopup.open({
          parent: this.getParent(),
          popup: this.tooltipDialog,
          around: this.domNode
        });
        this._isTooltipDialogOpened = true;
      },

      /**
      * Function to hide the dialog
      * @memberOf widgets/RelatedTableCharts/settings/FieldSelector.js
      **/
      _hideTooltipDialog: function () {
        dojoPopup.close(this.tooltipDialog);
        this._isTooltipDialogOpened = false;
      },

      /**
      * Function create's dialog to show field's list
      * @memberOf widgets/RelatedTableCharts/settings/FieldSelector.js
      **/
      _createTooltipDialog: function () {
        var popupContent = this._createFieldList();
        this.tooltipDialog = new TooltipDialog({
          content: popupContent
        });
        //handle dom click and show tooltip dialog
        this.own(on(this.domNode, 'click', lang.hitch(this, function (
          event) {
          //stop event from propagation
          event.stopPropagation();
          event.preventDefault();
          //based on the dialog state show/hide the tooltip dialog
          if (this._isTooltipDialogOpened) {
            this._hideTooltipDialog();
          } else {
            this._showTooltipDialog();
          }
        })));
        //hide tooltip dialog clicked anywhere in the body
        this.own(on(document.body, 'click', lang.hitch(this, function (
          event) {
          var target = event.target || event.srcElement;
          if (!this.isPartOfPopup(target)) {
            this._hideTooltipDialog();
          }
        })));

      },

      /**
      * Function create's field list to show in dialog
      * and binds events to each field, to notify on select
      * @memberOf widgets/RelatedTableCharts/settings/FieldSelector.js
      **/
      _createFieldList: function () {
        var fieldInfos, selectedFieldValue, fieldList;
        fieldList = domConstruct.create("div", {
          style: {
            "max-height": "150px",
            "overflow": "auto"
          }
        });
        if (this.fields) {
          fieldInfos = lang.clone(this.fields);
          selectedFieldValue = '';
          //loop through all the fields and create node for each field
          array.forEach(fieldInfos, lang.hitch(this, function (fieldInfo) {
            var fieldDiv, fieldInnerHTML, addField = true;
            //filter other fields if show only numeric fields flag is set to true
            if (this.showOnlyNumericFields) {
              if (this._numberFieldTypes.indexOf(fieldInfo.type) <
                0) {
                addField = false;
              }
            }
            if (addField) {
              fieldInnerHTML = fieldInfo.alias + " {" + fieldInfo
                .name + "}";
              fieldDiv = domConstruct.create("div", {
                "innerHTML": fieldInnerHTML,
                "style": {
                  cursor: "pointer",
                  padding: "4px 2px"
                }
              }, fieldList);
              domAttr.set(fieldDiv, "name", fieldInfo.name);
              domAttr.set(fieldDiv, "alias", fieldInfo.alias);
              //show hover effect
              on(fieldDiv, "mouseover", lang.hitch(this, function () {
                domStyle.set(fieldDiv, "background-color",
                  "#e4e4e4");
              }));
              //hide hover effect
              on(fieldDiv, "mouseout", lang.hitch(this, function () {
                domStyle.set(fieldDiv, "background-color",
                  "#FFFFFF");
              }));
              //handle click event and notify the selected field
              on(fieldDiv, "click", lang.hitch(this, function () {
                var selectedField = {};
                selectedField.name = domAttr.get(fieldDiv,
                  "name");
                selectedField.alias = domAttr.get(fieldDiv,
                  "alias");
                this.onSelect(selectedField);
                if (this.hideOnSelect) {
                  this._hideTooltipDialog();
                }
              }));
            }
          }));
        }
        return fieldList;
      }

    });
  });