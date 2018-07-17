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
  'dojo/on',
  'dojo/text!./FeatureSetResultEditor.html',
  'dijit/_TemplatedMixin',
  '../BaseEditor',
  './FeatureSetRendererEditor',
  '../PopupConfig',
  'jimu/dijit/TabContainer',
  'jimu/dijit/CheckBox'
],
function(declare, lang, array, on, template, _TemplatedMixin, BaseEditor,
  FeatureSetRendererEditor, PopupConfig, TabContainer, CheckBox) {
  var clazz = declare([BaseEditor, _TemplatedMixin], {
    baseClass: 'jimu-gp-editor-base jimu-gp-editor-fsrse',
    editorName: 'FeatureSetResultEditor',

    templateString: template,
    featureSetRendererEditor:null,
    popupConfig:null,
    tab:null,
    args:null,

    constructor:function(o){
      this.args = lang.mixin({}, o);
    },

    postCreate: function(){
      this.inherited(arguments);
      var tabs = [{title: this.nls.renderer, content: this.rendererTab},
      {title: this.nls.popup, content: this.popupConfigTab}];
      this.tab = new TabContainer({tabs:tabs, isNested:true});
      this.tab.placeAt(this.domNode);
      this.tab.startup();
      this.featureSetRendererEditor = new FeatureSetRendererEditor(this.args);
      this.featureSetRendererEditor.placeAt(this.rendererTab);
      this.featureSetRendererEditor.startup();
      var popupArgs = {};
      if(this.args && this.args.param){
        if(this.args.param.defaultValue){
          popupArgs.fields = lang.clone(this.args.param.defaultValue.fields || []);
        }
        var popup = this.args.param.popup;
        if(popup){
          // back compatible, popup of old version only contain the selected fields
          if (popup.fields.length !== popupArgs.fields.length) {
            var fieldNames = array.map(popup.fields, function(item){
              return item.name;
            });
            popupArgs.fields = array.map(popupArgs.fields, function(fieldInfo){
              var visible = array.indexOf(fieldNames, fieldInfo.name) >= 0;
              fieldInfo.visible = visible;
              // update alias if necessary
              array.some(popup.fields, function(item) {
                if(item.name === fieldInfo.name) {
                  fieldInfo.alias = item.alias || fieldInfo.alias;
                  return true;
                }
              });
              return fieldInfo;
            });
          } else { // new version of popup contains all fields
            popupArgs.fields = popup.fields;
          }

          popupArgs.title = popup.title;
        }
      }
      this.popupConfig = new PopupConfig(popupArgs);
      this.popupConfig.placeAt(this.popupConfigTab);
      this.popupConfig.startup();

      this.own(on(this.popupConfig, 'noVisibleField', lang.hitch(this, function() {
        this.enablePopup.setValue(false);
        this.enablePopup.setStatus(false);
      })));

      this.own(on(this.popupConfig, 'hasVisibleField', lang.hitch(this, function() {
        this.enablePopup.setStatus(true);
      })));

      this.enablePopup = new CheckBox({
        checked: !this.args.param.popup ||
          this.args.param.popup && this.args.param.popup.enablePopup
      }, this.enablePopupNode);
      this.enablePopup.startup();
    },

    destroy:function(){
      if(this.featureSetRendererEditor){
        this.featureSetRendererEditor.destroy();
        this.featureSetRendererEditor = null;
      }
      if(this.popupConfig){
        this.popupConfig.destroy();
        this.popupConfig = null;
      }
      this.inherited(arguments);
    },

    getValue:function(){
      var result = {
        renderer:null,
        popup:this.popupConfig.getConfig()
      };
      if(this.enablePopup.checked){
        result.popup.enablePopup = true;
      }else{
        result.popup.enablePopup = false;
      }
      var rendererInfo = this.featureSetRendererEditor.getValue();
      if(rendererInfo){
        result.renderer = rendererInfo.renderer;
      }
      return result;
    }
  });
  return clazz;
});
