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
  '../utils'
], function(declare, _WidgetBase, _TemplatedMixin, igUtils){
  var clazz = declare([_WidgetBase, _TemplatedMixin], {
    templateString: '<div>Please create a sub class</div>',

    type: 'BaseDijit',
    config: null,
    inSettingPage: true,
    appConfig: null,

    constructor: function(options){
      this.config = options.config;
    },

    setInSettingPage: function(inSettingPage){
      this.inSettingPage = inSettingPage;
    },

    //Whenever the config is changed, this method will be called.
    //so, please update dijit UI in this function.
    setConfig: function(config){
      this.config = config;
    },

    setMap: function(map){
      this.map = map;
    },

    //dataSource is widget.config.dataSource
    setDataSource: function(dataSource){
      if(igUtils.checkDataSourceIsVaild(dataSource, this.map, this.appConfig)){
        this.dataSource = dataSource;
      }
    },

    resize: function(){

    },

    setAppConfig: function(appConfig){
      this.appConfig = appConfig;
    },

    //when framework data changed, this method will be called with data
    //data: {features: []}
    onDataSourceDataUpdate: function(data){
      this.data = data;
    },

    isDarkTheme: function(){
      var isDark = false;
      if(this.appConfig){
        if (this.appConfig.theme.name === 'DashboardTheme' &&
          (this.appConfig.theme.styles[0] === 'default' || this.appConfig.theme.styles[0] === 'style3')) {
          isDark = true;
        } else if (this.appConfig.theme.name === 'DartTheme') {
          isDark = true;
        }
      }
      return isDark;
    }
  });
  return clazz;
});