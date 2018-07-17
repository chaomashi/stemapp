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
// jscs:disable validateIndentation
define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/dom-construct",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetBase"
],
  function (declare, lang, array, domConstruct,
            _TemplatedMixin, _WidgetBase) {
    return declare([_WidgetBase, _TemplatedMixin], {
      name: "SEFilterEditor",
      baseClass: "jimu-widget-sefilterEditor",
      declaredClass: 'jimu.dijit.SEFilterEditor',
      templateString: "<div style='width:100%'>" +
        "<div data-dojo-attach-point='filterEditorDiv'></div></div>",
      _templatePicker: null,
      _layers: null,
      map: null,
      nls: null,
      _origGetItemsFromLayerFunc: null,

      postCreate: function () {
        this._createFilterTool();
      },

      _createFilterTool: function () {
        // label for select
        //var flLabel = domConstruct.create("label", {
        //  innerHTML: "Feature Layers"
        //});
        //domConstruct.place(flLabel, this.filterEditorDiv);

        this._createLayerFilter();
        this._createTemplateFilter();
        this._loadTemplates();
      },

      _createLayerFilter: function () {
        // DropDown of select feature layer.
        this.selectDropDown = domConstruct.create("select", {
          'class': 'flDropDown templatePicker'
        });
        domConstruct.place(this.selectDropDown, this.filterEditorDiv);
        this.selectDropDown.onchange = lang.hitch(this, function () {
          this._onLayerFilterChanged();
        });

      },
      removeOptions: function (selectbox) {
        var i;
        for (i = selectbox.options.length - 1 ; i >= 0 ; i--) {
          selectbox.remove(i);
        }
      },
      _loadTemplates: function () {
        var selectedValue = (this.selectDropDown.value === this.nls.filterEditor.all ||
          this.selectDropDown.value === "") ? null : this.selectDropDown.value;
        var filterText = this.filterTextBox.value;
        var selectedValueExist = false;
        this.removeOptions(this.selectDropDown);
        var optionAll = domConstruct.create("option", {
          value: this.nls.filterEditor.all,
          innerHTML: this.nls.filterEditor.all
        });

        domConstruct.place(optionAll, this.selectDropDown);
        var layerObject;
        for (var i = 0; i < this._layers.length; i++) {
          layerObject = this._layers[i];
          if (layerObject.visible === true && layerObject.visibleAtMapScale === true) {
            if (selectedValue !== null && layerObject.id === selectedValue) {
              selectedValueExist = true;
            }
            var option = domConstruct.create("option", {
              value: layerObject.id,
              innerHTML: layerObject.name
            });

            domConstruct.place(option, this.selectDropDown);
          }
        }
        if (selectedValueExist === true) {
          this.selectDropDown.value = selectedValue;
          this._onLayerFilterChanged();
        }
        if (filterText !== null && filterText !== "") {
          this.filterTextBox.value = filterText;
          this._onTemplateFilterChanged();
        }
      },
      setTemplatePicker: function (templatePicker, layers) {
        this._layers = layers;
        this._templatePicker = templatePicker;
        this._overrideTemplatePicker();
        this._loadTemplates();
      },
      _createTemplateFilter: function () {
        // textBox filter
        this.filterTextBox = domConstruct.create("input", {
          'class': "searchtextbox templatePicker",
          type: "text",
          placeholder: this.nls.filterEditor.searchTemplates
        }, this.filterEditorDiv);
        this.filterTextBox.onkeyup = lang.hitch(this, function () {
          this._onTemplateFilterChanged();
        });

        this._overrideTemplatePicker();
      },

      _overrideTemplatePicker: function () {
        this._origGetItemsFromLayerFunc = this._templatePicker._getItemsFromLayer;

        this._templatePicker._getItemsFromLayer = lang.hitch(this, function () {
          var items;
          items = this._origGetItemsFromLayerFunc.apply(this._templatePicker, arguments);
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
            this._templatePicker.grid.noDataMessage =
              this.nls.filterEditor.noAvailableTempaltes;
          }
          return items;
        });
      },
      /**************************
       * Events
       *************************/
      /**
       * Updates the template picker based on selection in dropdown
       **/
      _onLayerFilterChanged: function () {
        // Clear any selections from previous selection
        this._templatePicker.clearSelection();
        var val = this.selectDropDown.options[this.selectDropDown.selectedIndex].text;
        if (val !== "") {
          if (val === this.nls.filterEditor.all) {
            var visLayers = array.filter(this._layers, function (layer) {
              return (layer.visible === true && layer.visibleAtMapScale === true);
            });
            this._templatePicker.attr("featureLayers",
                                visLayers);
            if (this.filterTextBox.value === "") {
              this._templatePicker.attr("grouping", true);
            }
            else {
              this._templatePicker.attr("grouping", false);
            }
          } else {
            var layerObject = this.map.getLayer(this.selectDropDown.value);
            this._templatePicker.attr("featureLayers", [layerObject]);
            this._templatePicker.attr("grouping", false);
          }
          this._templatePicker.update();
        }
      },

      _onTemplateFilterChanged: function () {
        var val = this.selectDropDown.options[this.selectDropDown.selectedIndex].text;
        var filterText = this.filterTextBox.value;
        if (val === this.nls.filterEditor.all && filterText === "") {
          this._templatePicker.attr("grouping", true);
        } else {
          this._templatePicker.attr("grouping", false);
        }
        this._templatePicker.update();
      }
    });
  });