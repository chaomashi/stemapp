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
  'dojo/query',
  'dojo/Evented',
  'dojo/Deferred',
  'dojo/_base/lang',
  'dojo/_base/html',
  'dijit/_WidgetBase',
  'dojo/_base/declare',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./SingleQuerySetting.html',
  'jimu/utils',
  'jimu/dijit/Popup',
  'jimu/dijit/CheckBox',
  'jimu/dijit/TabContainer3',
  'jimu/dijit/Message',
  'jimu/LayerInfos/LayerInfos',
  // 'jimu/dijit/DataSource',
  // 'jimu/dijit/_DataSourcePopup',
  'jimu/dijit/_QueryableLayerSourcePopup',
  '../utils',
  './PopupConfig',
  './SpatialFilterConfig',
  'esri/request',
  'esri/symbols/jsonUtils',
  'jimu/dijit/Filter',
  'jimu/dijit/SymbolPicker',
  'jimu/dijit/LoadingShelter',
  'jimu/dijit/ImageChooser',
  'dijit/form/ValidationTextBox'
],
function(on, query, Evented, Deferred, lang, html, _WidgetBase, declare,  _TemplatedMixin, _WidgetsInTemplateMixin,
  template, jimuUtils, Popup, CheckBox, TabContainer3, Message, LayerInfos, _QueryableLayerSourcePopup, queryUtils,
  PopupConfig, SpatialFilterConfig, esriRequest, esriSymbolJsonUtils, Filter) {

  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
    baseClass: 'jimu-widget-single-query-setting',
    templateString: template,
    popupConfig: null,
    spatialFilterConfig: null,
    jimuNls: null,
    _webMapLayerId: null,//the layerId in web map, maybe null
    _defaultTaskIcon: null,

    //options
    map: null,
    nls: null,
    target: null,
    tr: null,
    appConfig: null,
    folderUrl: null,
    _layerDefinition: null,//include url

    //public methods:
    //setNewLayerDefinition
    //setConfig
    //getConfig

    //events:
    //loading
    //unloading

    postMixInProperties:function(){
      this.inherited(arguments);
      this._defaultTaskIcon = this.folderUrl + "css/images/default_task_icon.png";
      this.jimuNls = window.jimuNls;
    },

    postCreate: function(){
      this.inherited(arguments);
      this._initSelf();
    },

    destroy: function(){
      this.target = null;
      this.emit('before-destroy');
      this.inherited(arguments);
    },

    /*----------------------------------public methods-------------------------------------------*/

    setConfig: function(config){
      if(config.webMapLayerId){
        //get url by webMapLayerId
        var layerId = config.webMapLayerId;
        var layerInfosObj = LayerInfos.getInstanceSync();
        var layerInfo = layerInfosObj.getLayerInfoById(layerId);
        if(!layerInfo){
          layerInfo = layerInfosObj.getTableInfoById(layerId);
        }
        if(!layerInfo){
          return;
        }
        var url = layerInfo.getUrl();
        config.url = url;
        this._setConfig(config);
      }else{
        this._setConfig(config);
      }
    },

    _setConfig: function(config){
      this.config = config;
      if(!this._isObject(this.config)){
        return;
      }
      var url = config.url || '';
      var validUrl = url && typeof url === 'string';
      if(!validUrl){
        return;
      }

      this.showBigShelter();
      this.tab.showShelter();

      if(this._layerDefinition && this._layerDefinition.url === url){
        this._resetByConfig(this.config, this._layerDefinition)
        .promise.always(lang.hitch(this, function(){
          this.hideBigShelter();
          this.tab.hideShelter();
        }));
      }else{
        this._layerDefinition = null;
        var def = esriRequest({
          url: url,
          handAs: 'json',
          content:{f:'json'},
          callbackParamName:'callback'
        });
        def.then(lang.hitch(this, function(response){
          if(!this.domNode){
            return;
          }
          this._layerDefinition = response;
          this._layerDefinition.url = url;
          this._resetByConfig(this.config, this._layerDefinition).promise.always(lang.hitch(this, function(){
            this.hideBigShelter();
            this.tab.hideShelter();
          }));
        }), lang.hitch(this, function(err){
          console.error(err);
          if(!this.domNode){
            return;
          }
          this.hideBigShelter();
        }));
      }
    },

    getConfig: function () {
      var config = {
        url:'',//if webMapLayerId is set, url will be set to empty because we can get url at rumtime
        name:'',
        icon: '',
        filter: null,
        showSQL: false,
        spatialFilter: null,
        popupInfo: '',
        orderByFields: [],
        useLayerSymbol: true,
        resultsSymbol:'',
        canModifySymbol: this.cbxModifySymbol.getValue(),
        enableExport: false,
        singleResultLayer: true,
        webMapLayerId: this._webMapLayerId
      };

      //url
      if(!this._layerDefinition){
        this.scrollToDom(this.generalTable);
        new Message({message: this.nls.setSourceTip});
        return null;
      }
      config.url = this._layerDefinition.url;

      //name
      if(!this.queryNameTextBox.validate()){
        jimuUtils.showValidationErrorTipForFormDijit(this.queryNameTextBox);
        return null;
      }
      var name = this.queryNameTextBox.get('value');
      name = jimuUtils.sanitizeHTML(name);
      config.name = name;

      //icon
      var icon = this.imageChooser.getImageData();
      if(icon === this._defaultTaskIcon){
        icon = '';
      }
      config.icon = icon;

      //attribute filter
      var filterObj = this.filter.toJson();
      if (!filterObj) {
        new Message({
          message: this.nls.setFilterTip
        });
        return null;
      }
      config.filter = filterObj;
      config.showSQL = this.cbxShowSQL.getValue();

      //spatial filter
      if(queryUtils.isTable(this._layerDefinition)){
        config.spatialFilter = null;
      }else{
        var spatialFilter = this.spatialFilterConfig.getConfig();
        if(!spatialFilter){
          return null;
        }
        config.spatialFilter = spatialFilter;
      }

      //{popupInfo,orderByFields}
      var popupConfig = this.popupConfig.getConfig();
      if(!popupConfig){
        return null;
      }
      config.orderByFields = popupConfig.orderByFields;
      //delete popupConfig.orderByFields;
      config.popupInfo = popupConfig.popupInfo;

      //symbol
      var sym = null;
      if(queryUtils.isTable(this._layerDefinition)){
        config.useLayerSymbol = false;
        config.resultsSymbol = null;
      }else if(queryUtils.isImageServiceLayer(this._layerDefinition)){
        config.useLayerSymbol = false;
        sym = this.layerSymbolPicker.getSymbol();
        if(sym){
          config.resultsSymbol = sym.toJson();
        }else{
          console.error("Can't get symbol from SymbolPicker");
          return null;
        }
      }else{
        if(this.radioCustomSymbol.checked){
          config.useLayerSymbol = false;
          sym = this.layerSymbolPicker.getSymbol();
          if(sym){
            config.resultsSymbol = sym.toJson();
          }else{
            console.error("Can't get symbol from SymbolPicker");
            return null;
          }
        }else{
          config.useLayerSymbol = true;
          config.resultsSymbol = null;
        }
      }

      //options
      config.singleResultLayer = this.radioOneLayerPerTask.checked;
      config.enableExport = this.cbxExport.getValue();

      this.target._layerDefinition = this._layerDefinition;
      this.target.singleConfig = config;

      if(config.webMapLayerId){
        config.url = '';
      }

      return config;
    },

    scrollToDom: function(_dom){
      var y1 = html.coords(_dom).y;
      var y2 = html.coords(this.domNode).y;
      var value = y1 - y2;
      this.domNode.parentNode.scrollTop = value;
    },

    showBigShelter: function(){
      this.emit("loading");
    },

    hideBigShelter: function(){
      this.emit("unloading");
    },

    showQueryDefinition: function(){
      this.tab.selectTab(this.nls.queryDefinition);
    },

    showResultsSetting: function(){
      this.tab.selectTab(this.nls.results);
    },

    _initSelf: function(){
      this._initTabs();
      this._initInfoTab();
      this._initFilterTab();
      this._initResultSettingTab();
      this._initOptionsTab();
    },

    _initTabs: function(){
      var tabInfo = {
        title: this.nls.infoText,
        content: this.infoTabNode
      };

      var tabDefinition = {
        title: this.nls.filters,
        content: this.definitionTabNode
      };

      var tabResults = {
        title: this.nls.results,
        content: this.resultsTabNode
      };

      var tabOptions = {
        title: this.nls.optionsText,
        content: this.optionsTabNode
      };

      var tabs = [tabInfo, tabDefinition, tabResults, tabOptions];
      var args = {
        tabs: tabs
      };
      this.tab = new TabContainer3(args);
      this.tab.placeAt(this.detailSection);
      this.tab.showShelter();

      this.own(on(this.tab, 'tabChanged', lang.hitch(this, function(title){
        if(title === this.nls.filters){
          this._updateSqlDivByFilter();
        }
      })));
    },

    /*---------------------------------info tab-----------------------------------------*/
    _initInfoTab: function(){
      this._setDefaultTaskIcon();
    },

    _onImageChooserDivClicked: function(evt){
      if(!this.imageChooser.mask){
        return;
      }

      var target = evt.target || evt.srcElement;
      if(target !== this.imageChooser.mask && target !== this.imageChooser.fileInput){
        jimuUtils.simulateClickEvent(this.imageChooser.mask);
      }
    },

    /*---------------------------------filters tab-----------------------------------------*/
    _initFilterTab: function(){
      //init attribute filter
      this.filter = new Filter({
        enableAskForValues: true,
        noFilterTip: this.nls.noFilterTip,
        style: "width:100%;"
      });
      this.filter.placeAt(this.filterDiv);
      this.cbxShowSQL = new CheckBox({label: this.nls.displaySQLTip});
      if(this.cbxShowSQL.labelNode){
        html.addClass(this.cbxShowSQL.labelNode, 'light-stress');
      }
      this.cbxShowSQL.check();
      this.cbxShowSQL.placeAt(this.showSQLSection);

      //init spatial filter config
      this._initSpatialFilterConfig();
    },

    _resetAttributeFilter: function(){
      this.filter.reset();
      this._updateSqlDivByFilter();
    },
    _updateSqlDivByFilter: function(){
      var tip = "";
      var partsObj = this.filter.toJson();
      if(partsObj){
        if(partsObj.expr){
          if(partsObj.displaySQL){
            tip = partsObj.displaySQL;
          }else if(partsObj.expr === "1=1"){
            tip = this.nls.noExpressionDefinedTip;
          }else{
            tip = partsObj.expr;
          }
        }else{
          tip = this.nls.specifyFilterAtRuntimeTip;
        }
      }else{
        console.log("can't get partsObj from filter");
      }
      if(tip){
        this.sqlDiv.innerHTML = tip;
      }
    },
    _onBtnFilterClicked: function(){
      var popup = new Popup({
        width: 680,
        height: 485,
        content: this.filter,
        buttons: [{
          label: this.nls.ok,
          onClick: lang.hitch(this, function(){
            var partsObj = this.filter.toJson();
            if(!partsObj){
              new Message({
                message: this.nls.setFilterTip
              });
              return;
            }
            this._updateSqlDivByFilter();
            popup.close();
          })
        }, {
          label: this.nls.cancel,
          onClick: lang.hitch(this, function(){
            popup.close();
          })
        }],
        onClose: lang.hitch(this, function(){
            popup.content = null;
            html.place(this.filter.domNode, this.filterDiv);
          })
      });
    },

    _initSpatialFilterConfig: function(){
      var args = {
        nls: this.nls
      };
      this.spatialFilterConfig = new SpatialFilterConfig(args);
      this.spatialFilterConfig.placeAt(this.spatialFilterDiv);
    },

    /*-------------------------------result setting tab-----------------------------------------*/

    _initResultSettingTab: function(){
      //init popup
      this._initPopupConfig();

      //init symbol section
      jimuUtils.combineRadioCheckBoxWithLabel(this.radioServiceSymbol, this.labelServiceSymbol);
      jimuUtils.combineRadioCheckBoxWithLabel(this.radioCustomSymbol, this.labelCustomSymbol);
      jimuUtils.groupRadios([this.radioServiceSymbol, this.radioCustomSymbol]);
      this.cbxModifySymbol.setLabel(this.nls.changeSymbolAtRuntime);
      this.cbxModifySymbol.uncheck();
    },

    _initPopupConfig: function(){
      var args = {
        nls: this.nls,
        sqs: this
      };
      this.popupConfig = new PopupConfig(args);
      this.popupConfig.placeAt(this.popupContainer);
    },

    _showSymbolSection: function(){
      html.removeClass(this.symbolSection, 'not-visible');
    },

    _hideSymbolSection: function(){
      html.addClass(this.symbolSection, 'not-visible');
    },

    /*----------------------------------options tab-------------------------------------------*/

    _initOptionsTab: function(){
      this.cbxExport = new CheckBox({label: this.nls.exportTip});
      this.cbxExport.placeAt(this.exportSection);
      html.addClass(this.cbxExport.domNode, 'small-font-size');

      //init raidos
      jimuUtils.combineRadioCheckBoxWithLabel(this.radioOneLayerPerTask,
                                              this.labelOneLayerPerTask);
      jimuUtils.combineRadioCheckBoxWithLabel(this.radioMultipleLayerPerTask,
                                              this.labelMultipleLayerPerTask);
      jimuUtils.groupRadios([this.radioOneLayerPerTask, this.radioMultipleLayerPerTask]);
    },

    /*----------------------------update UI by config or new layer source------------------------*/

    _onQueryNameChanged: function(){
      // this.emit('name-change', this.queryNameTextBox.get('value'));
      var labelNode = query('.label', this.target)[0];
      var name = this.queryNameTextBox.get('value');
      name = jimuUtils.sanitizeHTML(name);
      labelNode.innerHTML = name;
      labelNode.title = name;
    },

    _clear: function(){
      this.urlTextBox.set('value', '');
      this._layerDefinition = null;

      //reset info tab
      this.queryNameTextBox.set('value', '');
      this._setDefaultTaskIcon();

      //_reset filter tab
      this._resetAttributeFilter();
      html.removeClass(this.spatialFilterDiv, 'not-visible');
      this.spatialFilterConfig.reset();
      this.cbxShowSQL.check();

      this.tab.showShelter();

      //reset result tab
      //this.popupConfig.clear();
      this.popupConfig.onLayerChange(true);
      this.radioServiceSymbol.disabled = false;
      this.radioCustomSymbol.checked = true;
      this.layerSymbolPicker.reset();
      this.cbxModifySymbol.uncheck();

      //reset options tab
      //this.cbxKeepResults.uncheck();
      this.radioOneLayerPerTask.checked = true;
      this.cbxExport.uncheck();
    },

    _onBtnSetSourceClicked: function(){
      var args = {
        titleLabel: this.nls.setDataSource,

        dijitArgs: {
          style: {
            height: '100%'
          },
          multiple: false,
          createMapResponse: this.map.webMapResponse,
          portalUrl: this.appConfig.portalUrl
        }
      };

      var sourcePopup = new _QueryableLayerSourcePopup(args);
      this.own(on(sourcePopup, 'ok', lang.hitch(this, function(item){
        //item: {name, url, definition}
        var layerSourceType = sourcePopup.getSelectedRadioType();
        sourcePopup.close();
        sourcePopup = null;
        var queryName = null;
        //we don't save current layer's definition expression, we just read it at runtime
        this.setNewLayerDefinition(item, layerSourceType, queryName);
      })));
      this.own(on(sourcePopup, 'cancel', lang.hitch(this, function(){
        sourcePopup.close();
        sourcePopup = null;
      })));

      sourcePopup.startup();
    },

    setNewLayerDefinition: function(layerSourceItem, layerSourceType, /*optional*/ queryName){
      //layerSourceItem: {name,url,definition,...}
      layerSourceItem.definition.name = layerSourceItem.name;
      layerSourceItem.definition.url = layerSourceItem.url;
      var oldUrl = this._layerDefinition && this._layerDefinition.url;
      if (layerSourceItem.url !== oldUrl) {
        this._resetByNewLayerDefinition(layerSourceItem, layerSourceType, queryName);
      }
    },

    //reset UI by updating data souce
    _resetByNewLayerDefinition: function(sourceItem, sourceType, /*optional*/ queryName){
      var definition = sourceItem.definition;

      this._clear();
      if(!definition){
        return;
      }
      var webMapLayerId = null;
      if(sourceType === 'map'){
        if(sourceItem.layerInfo){
          webMapLayerId = sourceItem.layerInfo.id;
        }
      }
      this._layerDefinition = definition;
      this._webMapLayerId = webMapLayerId;
      var url = definition.url;

      //reset info tab
      this.urlTextBox.set('value', url);
      this.queryNameTextBox.set('value', queryName || definition.name);
      this.tab.hideShelter();

      //reset attribute filter
      this._resetAttributeFilter();
      if(this._layerDefinition){
        var filterOptions = {
          url: url,
          expr: '1=1',
          layerDefinition: this._layerDefinition,
          featureLayerId: this._webMapLayerId
        };
        this.filter.build(filterOptions).promise.always(
          lang.hitch(this, function(){
          this._updateSqlDivByFilter();
        }));
      }

      //reset spatial filter
      if(queryUtils.isTable(this._layerDefinition)){
        html.addClass(this.spatialFilterDiv, 'not-visible');
      }else{
        html.removeClass(this.spatialFilterDiv, 'not-visible');
      }

      //reset popupConfig
      this.popupConfig.onLayerChange(!!this._webMapLayerId);
      if(this._webMapLayerId){
        this.popupConfig.setConfig({
          popupInfo: {
            readFromWebMap: true
          },
          orderByFields: []
        });
      }

      //reset symbol
      this._handleSymbolSection(definition);
      this.cbxModifySymbol.uncheck();
    },

    _handleSymbolSection: function(layerInfo, /*optional*/ symbol){
      var symType = '';
      this._showSymbolSection();

      if(queryUtils.isTable(layerInfo)){
        this.radioServiceSymbol.disabled = true;
        this._hideSymbolSection();
        this.layerSymbolPicker.reset();
      }else if(queryUtils.isImageServiceLayer(layerInfo)){
        this.radioServiceSymbol.disabled = true;
        this.radioCustomSymbol.checked = true;
        symType = 'fill';
      }else{
        this.radioServiceSymbol.disabled = false;
        if(layerInfo.geometryType){
          var geoType = jimuUtils.getTypeByGeometryType(layerInfo.geometryType);

          if(geoType === 'point'){
            symType = 'marker';
          }
          else if(geoType === 'polyline'){
            symType = 'line';
          }
          else if(geoType === 'polygon'){
            symType = 'fill';
          }
        }
      }
      if(symType){
        //if the layer is feature layer or image service layer, we should let user to configure result symbol
        this.layerSymbolPicker.showByType(symType);
        if(symbol){
          this.layerSymbolPicker.showBySymbol(symbol);
        }
      }
    },

    _setDefaultTaskIcon: function(){
      this.imageChooser.setDefaultSelfSrc(this._defaultTaskIcon);
    },

    //restore UI by config
    _resetByConfig: function(cfg, layerDefinition){
      var def = new Deferred();
      var config = lang.clone(cfg);
      this._upgradeConfigForLowerVersion(layerDefinition, config);
      this._webMapLayerId = config.webMapLayerId;
      this.urlTextBox.set('value', config.url);
      this.queryNameTextBox.set('value', config.name || '');
      if(config.icon){
        this.imageChooser.setDefaultSelfSrc(jimuUtils.processUrlInWidgetConfig(config.icon, this.folderUrl));
      }else{
        this._setDefaultTaskIcon();
      }

      //reset attribute filter
      var filterInfo = config.filter;
      this._resetAttributeFilter();

      var defFilter = null;
      var filterOptions = {
        url: layerDefinition.url,
        layerDefinition: layerDefinition,
        featureLayerId: this._webMapLayerId
      };
      if(this._isObject(filterInfo)){
        filterOptions.partsObj = filterInfo;
      }else{
        filterOptions.expr = '1=1';
      }
      defFilter = this.filter.build(filterOptions);
      defFilter.promise.always(lang.hitch(this, function(){
        this._updateSqlDivByFilter();
        def.resolve();
      }));

      this.cbxShowSQL.setValue(config.showSQL);

      //reset spatial filter
      this.spatialFilterConfig.reset();
      if(queryUtils.isTable(this._layerDefinition)){
        html.addClass(this.spatialFilterDiv, 'not-visible');
      }else{
        html.removeClass(this.spatialFilterDiv, 'not-visible');
        if(config.spatialFilter){
          this.spatialFilterConfig.setConfig(config.spatialFilter);
        }
      }

      //reset popupConfig
      this.popupConfig.onLayerChange(!!this._webMapLayerId);
      this.popupConfig.setConfig({
        popupInfo: config.popupInfo,
        orderByFields: config.orderByFields
      });

      //reset symbol
      var symbol = null;
      if(config.resultsSymbol){
        try{
          symbol = esriSymbolJsonUtils.fromJson(config.resultsSymbol);
        }catch(e){
          console.error(e);
        }
      }
      this._handleSymbolSection(layerDefinition, symbol);
      if(config.useLayerSymbol){
        this.radioServiceSymbol.checked = true;
      }
      this.cbxModifySymbol.setValue(config.canModifySymbol);

      //reset options
      if(config.singleResultLayer){
        this.radioOneLayerPerTask.checked = true;
      }else{
        this.radioMultipleLayerPerTask.checked = true;
      }
      this.cbxExport.setValue(config.enableExport);

      return def;
    },

    _upgradeConfigForLowerVersion: function(layerDefinition, config){
      if(config.popup && !config.popupInfo){
        //the config's version < 2.1
        config.popupInfo = queryUtils.upgradePopupToPopupInfo(layerDefinition, config.popup);
      }
    },

    _isObject: function(o){
      return o && typeof o === 'object';
    }

  });
});