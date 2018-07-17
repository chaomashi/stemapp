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
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./SearchDistance.html',
  'dojo/_base/lang',
  'jimu/utils',
  'dijit/form/Select',
  'dijit/form/NumberTextBox'
],
function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, lang,
  jimuUtils) {

  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-query-setting-searchdistance',
    templateString: template,
    _allUnitInfos: null,

    //options:
    nls: null,
    config:null,//{defaultDistance,defaultUnit}

    //methods:
    //setConfig
    //getConfig
    //reset

    postCreate:function(){
      this.inherited(arguments);
      this.reset();
      if(this.config){
        this.setConfig(this.config);
      }
    },

    setConfig:function(config){
      this.reset();

      this.config = lang.clone(config);

      this.numberTextBox.set('value', this.config.defaultDistance);
      this.defaultUnitSelect.set('value', this.config.defaultUnit);
    },

    getConfig:function(){
      var config = {
        defaultDistance: 0,
        defaultUnit: ''
      };

      if(!this.numberTextBox.validate()){
        jimuUtils.showValidationErrorTipForFormDijit(this.numberTextBox);
        return;
      }

      config.defaultDistance = this.numberTextBox.get('value');

      config.defaultUnit = this.defaultUnitSelect.get('value');

      return config;
    },

    reset: function(){
      this.numberTextBox.set('value', 0);
      this.defaultUnitSelect.set('value', "MILES");
    },

    enable: function(){
      this.numberTextBox.set('disabled', false);
      this.defaultUnitSelect.set('disabled', false);
    },

    disable: function(){
      this.numberTextBox.set('disabled', true);
      this.defaultUnitSelect.set('disabled', true);
    }

  });
});