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
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/on',
    '../js/ColorPickerEditor',
    '../js/FontSetting',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/utils',
    'jimu/BaseWidgetSetting',
    'jimu/dijit/CheckBox',
    'jimu/dijit/TabContainer',
    'jimu/dijit/LoadingShelter'
  ],
  function(declare, lang, html, on, ColorPickerEditor, FontSetting, _WidgetsInTemplateMixin,
           utils, BaseWidgetSetting, CheckBox, TabContainer, LoadingShelter) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-grg-setting',
      _defaultCellOutlineColor: "#1a299c",
      _defaultCellFillColor: "#ffffff",

      postMixInProperties: function() {
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
      },
      postCreate: function() {
        //LoadingShelter
        this.shelter = new LoadingShelter({
          hidden: true
        });
        this.shelter.placeAt(this.domNode);
        this.shelter.startup();

        this.tab = new TabContainer({
          tabs: [{
            title: this.nls.gridTabLabel,
            content: this.gridTab
          }, {
            title: this.nls.labelTabLabel,
            content: this.labelTab
          }, {
            title: this.nls.referenceSystemTabLabel,
            content: this.referenceSystemTab
          }],
          selected: this.nls.gridTabLabel
        });
        this.tab.placeAt(this.tabsContainer);
        this.tab.startup();
        this.inherited(arguments);

        //Handle change event of draw extent icon
        this.own(on(this.cellShapeDropDown, 'change', lang.hitch(this, function () {
          if(this.cellShapeDropDown.get('value') == 'hexagon') {
            this.labelDirectionDropDown.set('disabled',true);
            this.labelDirectionDropDown.setValue('horizontal');
          } else {
            this.labelDirectionDropDown.set('disabled',false);
          }
        })));
      },

      initGridTab: function() {
        this.cellOutlineColorPicker = new ColorPickerEditor({nls: this.nls}, this.cellOutlineColorPickerEditor);
        this.cellOutlineColorPicker.startup();

        this.cellFillColorPicker = new ColorPickerEditor({nls: this.nls}, this.cellFillColorPickerEditor);
        this.cellFillColorPicker.startup();
      },

      initLabelTab: function() {
        this.fontSetting = new FontSetting({config: this.config.grg.font, nls: this.nls}, this.fontSettingNode);
        this.fontSetting.startup();
      },

      initReferenceSystemTab: function() {

      },

      startup: function() {
        this.inherited(arguments);
        this.shelter.show();
        if (!this.config.grg) {
          this.config.grg = {};
        }
        this.initGridTab();
        this.initLabelTab();
        this.initReferenceSystemTab();
        this.setConfig(this.config);
      },

      setConfig: function(config) {

        this.config = config;

        this.cellOutlineColorPicker.setValues({
          "color": config.grg.cellOutline.color,
          "transparency": config.grg.cellOutline.transparency
        });

        this.cellFillColorPicker.setValues({
          "color": config.grg.cellFill.color,
          "transparency": config.grg.cellFill.transparency
        });

        this.cellShapeDropDown.setValue(this.config.grg.cellShape);

        this.cellUnitsDropDown.setValue(this.config.grg.cellUnits);

        this.gridOriginDropDown.setValue(this.config.grg.gridOrigin);

        this.fontSetting.config = this.config.grg.font;

        this.labelTypeDropDown.setValue(this.config.grg.labelType);

        this.labelDirectionDropDown.setValue(this.config.grg.labelDirection);

        this.labelOriginDropDown.setValue(this.config.grg.labelOrigin);

        this.referenceSystemDropDown.setValue(this.config.grg.referenceSystem);

        this.lockSettings.set("checked",this.config.grg.lockSettings);

        this.shelter.hide();
      },

      getConfig: function() {

        var cellOutlineColor = this.cellOutlineColorPicker.getValues();
        if (cellOutlineColor) {
          this.config.grg.cellOutline.color = cellOutlineColor.color;
          this.config.grg.cellOutline.transparency = cellOutlineColor.transparency;
        }

        var cellFillColor = this.cellFillColorPicker.getValues();
        if (cellFillColor) {
          this.config.grg.cellFill.color = cellFillColor.color;
          this.config.grg.cellFill.transparency = cellFillColor.transparency;
        }

        this.config.grg.cellShape = this.cellShapeDropDown.getValue();

        this.config.grg.cellUnits = this.cellUnitsDropDown.getValue();

        this.config.grg.gridOrigin = this.gridOriginDropDown.getValue();

        this.config.grg.font = this.fontSetting.config;

        this.config.grg.labelType = this.labelTypeDropDown.getValue();

        this.config.grg.labelDirection = this.labelDirectionDropDown.getValue();

        this.config.grg.labelOrigin = this.labelOriginDropDown.getValue();

        this.config.grg.referenceSystem = this.referenceSystemDropDown.getValue();

        this.config.grg.lockSettings = this.lockSettings.checked;

        return this.config;
      },

      destroy: function(){
        this.inherited(arguments);
      }

    });
  });