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
  'dojo/on',
  'dojo/Evented',
  'dojo/_base/html',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/_base/Color',
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./ChartColorSetting.html',
  'jimu/dijit/ColorPickerPopup',
  'require',
  'dijit/form/Select'
],
  function (on, Evented, html, lang, array, Color, declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
    template, ColorPickerPopup, require) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      templateString: template,

      baseClass: 'chart-color-setting',

      jimuUrl: require.toUrl("jimu"),

      colors:{
        c0:['#68D2E0', '#087E92', '#47BCF5', '#FBE66A', '#F29157', '#C8501D'],
        c1:['#5d9cd3', '#eb7b3a', '#a5a5a5', '#febf29', '#4673c2', '#72ad4c'],
        c2:['#5d9cd3', '#a5a5a5', '#4673c2', '#285f8f', '#636363', '#274577'],
        c3:['#eb7b3a', '#febf29', '#72ad4c', '#9c4618', '#987214', '44682e'],
        c4:['#72ad4c', '#4673c2', '#febf29', '#44682e', '#274577', '#987214'],
        g1:['#43729b', '#c4d5ea'],
        g2:['#ac5928', '#f5ccbf'],
        g3:['#787878', '#d8d8d8'],
        g4:['#bb8b1b', '#fee1be'],
        g5:['#30538d', '#c0c9e3'],
        g6:['#517e36', '#c9dbc2'],
        g7:['#c4d5ea', '#43729b'],
        g8:['#f5ccbf', '#ac5928'],
        g9:['#d8d8d8', '#787878'],
        g10:['#fee1be', '#bb8b1b'],
        g11:['#c0c9e3', '#30538d'],
        g12:['#c9dbc2', '#517e36']
      },

      //options:
      nls: null,

      singleColor: true,

      //events:
      //change

      postCreate: function () {
        this.inherited(arguments);
        this.singleColorPicker = new ColorPickerPopup({
          appearance: {
            showTransparent: false,
            showColorPalette: true,
            showCoustom: true,
            showCoustomRecord: true
          }
        });
        this.singleColorPicker.placeAt(this.singleColorSection);
        this.own(on(this.singleColorPicker, 'change', lang.hitch(this, this._onColorPickChange)));
        this.setMode(this.singleColor);
      },

      setMode: function(singleColor){
        this.singleColor = singleColor;
        if(this.singleColor){
          html.removeClass(this.singleColorSection, 'hide');
          html.addClass(this.colorSelect.domNode, 'hide');
        }else{
          html.addClass(this.singleColorSection, 'hide');
          html.removeClass(this.colorSelect.domNode, 'hide');
        }
      },

      setColorsAutomatically: function(colors){
        if(!colors){
          return;
        }

        if(typeof colors === 'string'){
          this.setSingleColor(colors);
        }else{
          if(colors.length > 0){
            if(colors.length === 1){
              this.setSingleColor(colors[0]);
            }else{
              this.setMultipleColor(colors);
            }
          }
        }
      },

      disable:function(){
        if(this.singleColor){
          if(this.singleColorPicker.disable){
            this.singleColorPicker.disable();
          }
        }else{
          html.setStyle(this.colorSelect, 'cursor', 'not-allowed');
          this.cacheColor = this.getColors();
          this.colorSelect.set('value', 'c0');
          this.colorSelect.disabled = true;
        }
      },

      enable:function(){
        if(this.singleColor){
          if(this.singleColorPicker.enable){
            this.singleColorPicker.enable();
          }
        }else{
          html.setStyle(this.colorSelect, 'cursor', 'pointer');
          this.colorSelect.disabled = false;
          if(this.cacheColor){
            this.setMultipleColor(this.cacheColor);
          }
        }
      },

      setSingleColor: function(hexColor){
        this.setMode(true);
        if(!hexColor){
          return;
        }
        var color = new Color(hexColor);
        this.singleColorPicker.setColor(color);
      },

      setMultipleColor: function(hexColors){
        this.setMode(false);
        if(!hexColors){
          return;
        }
        var colorNames = Object.keys(this.colors);
        var colorName = 'c1';
        array.some(colorNames, lang.hitch(this, function(cName){
          var isSame = false;
          var colorValues = this.colors[cName];
          if (colorValues.length === hexColors.length) {
            isSame = array.every(colorValues, lang.hitch(this, function(colorValue, i) {
              var c1 = new Color(colorValue);
              var c2 = new Color(hexColors[i]);
              return c1.toHex().toLowerCase() === c2.toHex().toLowerCase();
            }));
            if (isSame) {
              colorName = cName;
            }
          }
          return isSame;
        }));
        this.colorSelect.set('value', colorName);
      },

      getColors: function(){
        if(this.singleColor){
          return [this.getSingleColor()];
        }else{
          return this.getMultipleColors();
        }
      },

      getSingleColor: function(){
        return this.singleColorPicker.getColor().toHex();
      },

      getMultipleColors: function(){
        return this.colors[this.colorSelect.get('value')];
      },

      _onColorPickChange: function(color){
        this.emit('change', color.toHex());
      },

      _onColorSelectChanged: function(){
        var color = this.getMultipleColors();
        this.emit('change', color);
      }
    });

  });