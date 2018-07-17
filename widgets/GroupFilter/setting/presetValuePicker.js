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
  'jimu/BaseWidgetSetting',
  'jimu/dijit/FilterParameters',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/on',
  'dojo/dom-construct',
  'dojo/dom-attr',
  'dojo/query',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dijit/form/Select',
  'esri/layers/FeatureLayer',
  'dojo/text!./presetValuePicker.html'
],
  function(declare, BaseWidgetSetting, FilterParameters, _WidgetsInTemplateMixin,
    on, domConstruct, domAttr, query, lang, array, Select, FeatureLayer, template) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {

      //these two properties is defined in the BaseWidget
      baseClass: 'jimu-widget-map-filter-preset',
      templateString: template,

      layerList: null,
      map: null,
      nls: null,
      valueParam: null,

      postCreate: function() {
        this.inherited(arguments);
        this.startup();
      },

      startup: function() {
        this.inherited(arguments);
        this.createLayerSelection();
      },

      createLayerSelection: function() {
        var ctlLayerList = [];
        array.forEach(this.layerList, lang.hitch(this, function(layer) {
          if(layer.children.length > 0) {
            array.forEach(layer.children, lang.hitch(this, function(child) {
              var lryObject = {};
              lryObject.value = child.id;
              lryObject.label = child.label;
              lryObject.selected = false;
              ctlLayerList.push(lryObject);
            }));
          } else {
            var lryObject = {};
            lryObject.value = layer.id;
            lryObject.label = layer.label;
            lryObject.selected = false;
            ctlLayerList.push(lryObject);
          }
        }));

        var lyrSelect = new Select({
          options: ctlLayerList
        }).placeAt(this.layerLevel);
        lyrSelect.startup();

        this.own(on(lyrSelect, "change", lang.hitch(this, function(val) {
          this.createFieldSelection(val);
        })));

        this.createFieldSelection(lyrSelect.value);

      },

      createFieldSelection: function(pLayer) {
        var ctlfieldList = [];
        var restricted = "esriFieldTypeBlob,esriFieldTypeOID";
        array.forEach(this.layerList, lang.hitch(this, function(layer) {
          if(layer.children.length > 0) {
            array.forEach(layer.children, lang.hitch(this, function(child) {
              if(child.id === pLayer) {
                array.forEach(child.children, lang.hitch(this, function(field) {
                  if(restricted.indexOf(field.fieldType) === -1) {
                    var fieldObject = {};
                    fieldObject.value = field.name;
                    fieldObject.label = field.label;
                    fieldObject.selected = false;
                    ctlfieldList.push(fieldObject);
                  }
                }));
              }
            }));
          } else {
            if(layer.id === pLayer) {
              array.forEach(layer.layer.fields, lang.hitch(this, function(field) {
                if(restricted.indexOf(field.type) === -1) {
                  var fieldObject = {};
                  fieldObject.value = field.name;
                  if(field.alias === "") {
                    fieldObject.label = field.name;
                  } else {
                    fieldObject.label = field.alias;
                  }
                  fieldObject.selected = false;
                  ctlfieldList.push(fieldObject);
                }
              }));
            }
          }

        }));

        domConstruct.empty(this.fieldLevel);
        var fieldSelect = new Select({
          options: ctlfieldList
        }).placeAt(this.fieldLevel);
        fieldSelect.startup();

        this.own(on(fieldSelect, "change", lang.hitch(this, function(val) {
          this.createValueList(val, pLayer);
        })));

        this.createValueList(fieldSelect.value, pLayer);
      },

      createValueList: function(pVal, pLayer) {
        domConstruct.empty(this.valueLevel);
        this.valueParam = new FilterParameters();
        this.valueParam.placeAt(this.valueLevel);
        this.valueParam.startup();

        setTimeout(function() {
          var node = query(".jimu-single-filter-parameter");
          var hintNode = query("colgroup", node[0]);
          if(hintNode.length > 0) {
            domAttr.set(hintNode[0].childNodes[1], "width", "0px");
          }
        }, 200);

        array.forEach(this.layerList, lang.hitch(this, function(layer) {
          if(layer.children.length > 0) {
            array.forEach(layer.children, lang.hitch(this, function(child) {
              //console.log(pLayer);
              if(child.id === pLayer) {
                array.forEach(child.children, lang.hitch(this, function(field) {
                  if(field.name !== "Shape") {
                    if(field.name === pVal) {
                      var newFL = new FeatureLayer(child.url);
                      this.own(on(newFL, "load", lang.hitch(this, function() {
                        var params = {name: field.name, label: field.label, type: field.fieldType};
                        var filterObj = this._makefilterObject(params);
                        this.valueParam.build(child.url, newFL, filterObj);
                        var node = query(".jimu-single-filter-parameter");
                        var hintNode = query("colgroup", node[0]);
                        domAttr.set(hintNode[0].childNodes[1], "width", "0px");
                      })));
                    }
                  }
                }));
              }
            }));
          } else {
            if(layer.id === pLayer) {
              array.forEach(layer.layer.fields, lang.hitch(this, function(field) {
                if(field.name === pVal) {
                  var params = {name: field.name, label: field.alias, type: field.type};
                  var filterObj = this._makefilterObject(params);
                  this.valueParam.build(layer.layer.url, layer.layer, filterObj);

                  var node = query(".jimu-single-filter-parameter");
                  var hintNode = query("colgroup", node[0]);
                  if(hintNode.length > 0) {
                    domAttr.set(hintNode[0].childNodes[1], "width", "0px");
                  }
                }
              }));
            }
          }
        }));

      },

      _makefilterObject: function(fieldObj) {
        var filter = {};
        var parts = [];
        var partsObj = {};
        partsObj.fieldObj = {};
        partsObj.fieldObj.name = fieldObj.name;
        if(typeof fieldObj.alias === 'undefined') {
          partsObj.fieldObj.label = fieldObj.name;
        } else {
          partsObj.fieldObj.label = fieldObj.alias;
        }
        partsObj.fieldObj.shortType = ((fieldObj.type).replace("esriFieldType", "")).toLowerCase();
        if(partsObj.fieldObj.shortType !== "guid" || partsObj.fieldObj.shortType !== "globalid") {
          partsObj.fieldObj.shortType = "string";
        }
        if(partsObj.fieldObj.shortType !== "date" && partsObj.fieldObj.shortType !== "string") {
          partsObj.fieldObj.shortType = "number";
        }
        partsObj.fieldObj.type = fieldObj.type;
        partsObj.operator = partsObj.fieldObj.shortType + "OperatorIs";
        partsObj.valueObj = {};
        partsObj.valueObj.isValid = true;
        partsObj.valueObj.type = "unique";
        partsObj.valueObj.value = "";
        partsObj.interactiveObj = {};
        partsObj.interactiveObj.prompt = "";
        partsObj.interactiveObj.hint = "";
        partsObj.caseSensitive = false;
        parts.push(partsObj);
        filter.logicalOperator = "OR";
        filter.expr = "";
        filter.parts = parts;
        return filter;
      }

    });
  });
