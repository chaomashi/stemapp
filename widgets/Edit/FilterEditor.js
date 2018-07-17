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
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/_base/html",
  "dojo/dom-construct",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetBase"
],
  function (declare, lang, array, html, domConstruct,
            _TemplatedMixin, _WidgetBase) {
    return declare([_WidgetBase, _TemplatedMixin], {
      name: "FilterEditor",
      baseClass: "jimu-widget-FilterEditor",
      declaredClass: 'jimu.dijit.FilterEditor',
      templateString: "<div style='width:100%'>" +
        "<div data-dojo-attach-point='filterEditorDiv'></div></div>",
      _settings: null,
      _editWidget: null,
      _origGetItemsFromLayerFunc: null,

      postCreate: function () {
        this.nls = this._editWidget.nls;
        this._createFilterTool();
      },

      _createFilterTool: function() {
        // label for select
        var flLabel = domConstruct.create("label", {
          innerHTML: this.nls.featureLayers
        });
        domConstruct.place(flLabel, this.filterEditorDiv);

        this._createLayerFilter();
        this._createTemplateFilter();
      },

      _createLayerFilter: function() {
        // DropDown of select feature layer.
        this.selectDropDown = domConstruct.create("select", {
          'class': 'jimu-input flDropDown'
        });
        domConstruct.place(this.selectDropDown, this.filterEditorDiv);
        this.selectDropDown.onchange = lang.hitch(this, function () {
          this._onLayerFilterChanged();
        });

        var optionAll = domConstruct.create("option", {
          value: "all",
          innerHTML: window.jimuNls.common.all
        });
        domConstruct.place(optionAll, this.selectDropDown);
        var layerObject;
        for (var i = 0; i < this._editWidget._layerObjectsParaForTempaltePicker.length; i++) {
          layerObject = this._editWidget._layerObjectsParaForTempaltePicker[i];
          var option = domConstruct.create("option", {
            value: layerObject.id,
            innerHTML: layerObject.name
          });
          domConstruct.place(option, this.selectDropDown);
        }
      },

      _createTemplateFilter: function() {
        // textBox filter
        this.filterTextBox = domConstruct.create("input", {
          'class': "jimu-input searchtextbox",
          type: "text",
          placeholder: this.nls.searchTemplates
        }, this.filterEditorDiv);
        this.filterTextBox.onkeyup = lang.hitch(this, function () {
          this._onTempalteFilterChanged();
        });

        var templatePicker = this._editWidget.editor.templatePicker;
        this._origGetItemsFromLayerFunc = templatePicker._getItemsFromLayer;

        templatePicker._getItemsFromLayer = lang.hitch(this, function () {
          var items;
          items = this._origGetItemsFromLayerFunc.apply(templatePicker, arguments);
          var filterText = this.filterTextBox.value;
          if (filterText) {
            items = array.filter(items, function (item) {
              var match = false;
              var regex = new RegExp(filterText, "ig");
              // Search using item label
              if (item.hasOwnProperty("label")) {
                if (item.label.match(regex)) {
                  if (item.label.match(regex).length > 0) {
                    match = true;
                  }
                }
              }
              // Search using the name from the
              // item template property
              if (item.hasOwnProperty("template")) {
                if (item.template.hasOwnProperty("name")) {
                  if (item.template.name.match(regex)) {
                    if (item.template.name.match(regex).length > 0) {
                      match = true;
                    }
                  }
                }
              }
              return match;
            });
          }

          if (items.length === 0) {
            this._editWidget.editor.templatePicker.grid.noDataMessage =
              this.nls.noAvailableTempaltes;
          }
          return items;
        });
      },

      show: function() {
        html.setStyle(this.domNode, 'display', 'block');
      },

      hide: function() {
        html.setStyle(this.domNode, 'display', 'none');
      },

      selectLayerFilterByValue: function(value) {
        array.forEach(this.selectDropDown.options, function(option, index) {
          if(option.value === value) {
            this.selectDropDown.selectedIndex = index;
          }
        }, this);
      },

      setTemplateFilter: function(text) {
        this.filterTextBox.value = text;
      },

      disableLayerFilter: function() {
        html.setAttr(this.selectDropDown, 'disabled', true);
      },

      enableLayerFilter: function() {
        html.setAttr(this.selectDropDown, 'disabled', false);
      },

      /**************************
       * Events
       *************************/
      /**
       * Updates the template picker based on selection in dropdown
       **/
      _onLayerFilterChanged: function (grouping) {
        // Clear any selections from previous selection
        var templatePicker = this._editWidget.editor.templatePicker;
        templatePicker.clearSelection();

        var val = this.selectDropDown.options[this.selectDropDown.selectedIndex].text;

        if (val !== "") {
          if (val === "All") {
            templatePicker.attr("featureLayers",
                                this._editWidget._layerObjectsParaForTempaltePicker);
            if (this.filterTextBox.value === "") {
              templatePicker.attr("grouping", true);
            }
            else {
              templatePicker.attr("grouping", false);
            }
          } else {
            var layerObject = this._editWidget.map.getLayer(this.selectDropDown.value);
            templatePicker.attr("featureLayers", [layerObject]);
            templatePicker.attr("grouping", false);
          }

          if(grouping) {
            templatePicker.attr("grouping", true);
          }

          templatePicker.update(true);
        }
      },

      _onTempalteFilterChanged: function(grouping) {
        var val = this.selectDropDown.options[this.selectDropDown.selectedIndex].text;
        var filterText = this.filterTextBox.value;
        this._editWidget.editor.templatePicker.clearSelection();
        if (val === "All" && filterText === "") {
          this._editWidget.editor.templatePicker.attr("grouping", true);
        } else {
          this._editWidget.editor.templatePicker.attr("grouping", false);
        }
        if(grouping) {
          this._editWidget.editor.templatePicker.attr("grouping", true);
        }
        this._editWidget.editor.templatePicker.update(true);
      }
    });
  });
