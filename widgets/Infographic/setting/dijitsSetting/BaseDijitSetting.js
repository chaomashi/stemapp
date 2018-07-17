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
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin'
], function(declare, lang, _WidgetBase, _TemplatedMixin){
  var clazz = declare([_WidgetBase, _TemplatedMixin], {
    templateString: '<div>Please create a sub class</div>',
    type: 'BaseDijit',
    config: null,
    dijit: null,

    constructor: function(options){
      this.config = lang.clone(options.config);
      this.dijit = options.dijit;
    },

    setDataSource: function(dataSource){
      this.dataSource = dataSource;
    },

    getConfig: function(){
      return this.config;
    },

    //Whenever you need to update dijit UI, please call this function.
    updateDijit: function(){
      this.dijit.setConfig(this.config);
    }
  });
  return clazz;
});