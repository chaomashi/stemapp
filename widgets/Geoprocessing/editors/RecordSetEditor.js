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

define(['dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  '../BaseEditor',
  '../PopupConfig'
],
function(declare, lang, array, BaseEditor, PopupConfig) {
  var clazz = declare([BaseEditor], {
    baseClass: 'jimu-gp-editor-base jimu-gp-editor-rse',
    editorName: 'RecordSetEditor',

    popupConfig:null,
    args:null,

    constructor:function(o){
      this.args = lang.mixin({}, o);
    },

    postCreate: function(){
      this.inherited(arguments);
      this.value = {};

      var popupArgs = {showTitle: false};
      if(this.args && this.args.param && this.args.param.defaultValue){
        this.value = lang.clone(this.args.param.defaultValue);
        var fields = this.value.fields;
        if(this.value.output && this.value.output.fields){
          // back compatible, popup of old version only contain the selected fields
          if (this.value.output.fields.length !== fields.length) {
            var selectedNameArray = array.map(this.value.output.fields, function(f){
              return f.name;
            });
            array.forEach(fields, function(f){
              if(selectedNameArray.indexOf(f.name) >= 0){
                f.visible = true;
              }else{
                f.visible = false;
              }
            });
          } else { // new version of popup contains all fields
            fields = this.value.output.fields;
          }
        }
        popupArgs.fields = fields;
        this.popupConfig = new PopupConfig(popupArgs);
        this.popupConfig.placeAt(this.domNode);
        this.popupConfig.startup();
      }else{
        this.domNode.innerHTML = 'table';
      }
    },

    destroy:function(){
      if(this.popupConfig){
        this.popupConfig.destroy();
        this.popupConfig = null;
      }
      this.inherited(arguments);
    },

    getValue:function(){
      if(this.popupConfig){
        var config = this.popupConfig.getConfig();
        this.value.output = {
          title: config.title,
          fields: config.fields
        };
        this.value.fields = this.args.param.defaultValue.fields;
        return this.value;
      }else{
        return this.value;
      }
    }
  });
  return clazz;
});
