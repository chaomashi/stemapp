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
  'dojo/text!./PopupConfig.html',
  'dojo/_base/lang',
  'dojo/_base/html',
  'dojo/_base/array',
  'dojo/on',
  'dojo/query',
  'jimu/utils',
  'jimu/dijit/SimpleTable',
  'jimu/dijit/Popup',
  'dijit/TooltipDialog',
  'dijit/Menu',
  'dijit/MenuItem',
  'dijit/popup',
  './SortFields',
  '../utils'
],
function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, lang, html, array, on,
  query, jimuUtils, SimpleTable, Popup, TooltipDialog, Menu, MenuItem, dojoPopup, SortFields, queryUtils) {

  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-query-setting-popup-config',
    templateString: template,

    _currentOrderByFields: null,
    _validSortFieldTypes: ['esriFieldTypeOID',
                           'esriFieldTypeString',
                           'esriFieldTypeDate',
                           'esriFieldTypeSmallInteger',
                           'esriFieldTypeInteger',
                           'esriFieldTypeSingle',
                           'esriFieldTypeDouble'],

    //options:
    nls: null,
    sqs: null,

    //methods:
    //onLayerChange
    //setConfig
    //getConfig

    postCreate:function(){
      this.inherited(arguments);
      jimuUtils.combineRadioCheckBoxWithLabel(this.portalRadio, this.portalLabel);
      jimuUtils.combineRadioCheckBoxWithLabel(this.customRadio, this.customLabel);
      var handles = jimuUtils.groupRadios([this.portalRadio, this.customRadio],
        lang.hitch(this, this._updateClassWhenRadioChanged));
      array.forEach(handles, lang.hitch(this, function(handle){
        this.own(handle);
      }));
      this._currentOrderByFields = [];
      this._initFieldsTable();
      this._initAddFields();
      this.onLayerChange(true);
      this._updateClassWhenRadioChanged();
    },

    onLayerChange: function(enableWebMapRadio){
      this._clear();
      if(enableWebMapRadio){
        this.portalRadio.disabled = false;
      }else{
        this.portalRadio.disabled = true;
      }
      this._updateClassWhenRadioChanged();
      var layerDefinition = this._getLayerDefinition();
      if(!layerDefinition){
        return;
      }

      //build default UI
      this._clear();
      var defaultConfig = {
        popupInfo: null,
        orderByFields: []
      };
      defaultConfig.popupInfo = this._getDefaultPopupInfo();
      this.setConfig(defaultConfig);

      //update sorting icon
      this._updateSortingIcon(layerDefinition);
    },

    //config: {popupInfo,orderByFields}
    //popupInfo: {readFromWebMap,title,fieldInfos,description,showAttachments,mediaInfos}
    setConfig:function(config){
      this._clear();
      this.config = lang.clone(config);
      var layerDefinition = this._getLayerDefinition();
      if(!layerDefinition){
        return;
      }
      this._updateSortingIcon(layerDefinition);
      this._setPopupInfoForUI(config.popupInfo);
      this._setOrderByFields(config.orderByFields);
    },

    //{title,fields,orderByFields} => {popupInfo,orderByFields}
    getConfig:function(){
      var config = {
        popupInfo: this._getPopupInfoByUI(),
        orderByFields: this._getOrderByFields()
      };

      if(!config.popupInfo){
        return null;
      }

      return config;
    },

    destroy:function(){
      this.sqs = null;
      this.titleTextBox.focusNode.blur();
      this.inherited(arguments);
    },

    _clear:function(){
      html.addClass(this.sortFieldsIcon, 'jimu-state-disabled');
      this._currentOrderByFields = [];
      this.titleTextBox.set('value', '');
      this.displayFieldsTextBox.set('value', '');
      this.fieldsTable.clear();
      this._resetMenu();
      this._addEmptyMenuItem();
    },

    _getLayerDefinition: function(){
      return this.sqs._layerDefinition;
    },

    _updateClassWhenRadioChanged: function(){
      if(!this.portalRadio.disabled && this.portalRadio.checked){
        html.addClass(this.domNode, 'portal-radio-selected');
      }else{
        html.removeClass(this.domNode, 'portal-radio-selected');
      }
    },

    /*-----------------------------popupInfo-------------------------------------*/

    //{readFromWebMap,title,fieldInfos,description,showAttachments,mediaInfos}
    _setPopupInfoForUI: function(popupInfo){
      var defaultPopupInfo = this._getDefaultPopupInfo();
      this._setCustomPopupInfoForUI(defaultPopupInfo);
      if(!this.portalRadio.disabled && popupInfo.readFromWebMap){
        this.customRadio.checked = false;
        this.portalRadio.checked = true;
      }else{
        this.portalRadio.checked = false;
        this.customRadio.checked = true;
        this._setCustomPopupInfoForUI(popupInfo);
      }
      this._updateClassWhenRadioChanged();
    },

    //{title,fieldInfos,description,showAttachments,mediaInfos}
    _setCustomPopupInfoForUI: function(popupInfo){
      //remove Shape field
      var layerDefinition = this._getLayerDefinition();
      var portalFieldInfos = queryUtils.getPortalFieldInfosWithoutShape(layerDefinition, popupInfo.fieldInfos);

      //update titleTextBox
      var validTitle = popupInfo.title && typeof popupInfo.title === 'string';
      if(validTitle){
        this.titleTextBox.set('value', popupInfo.title || '');
      }else{
        this.titleTextBox.set('value', '');
      }

      //update displayFieldsTextBox
      this._updateDisplayFieldsTextBox(portalFieldInfos);

      //image type fields
      var imageTypeFields = [];
      var allFieldNames = array.map(layerDefinition.fields, lang.hitch(this, function(serviceFieldInfo){
        return serviceFieldInfo.name;
      }));
      array.forEach(popupInfo.mediaInfos, lang.hitch(this, function(mediaInfo){
        if(allFieldNames.length > 0 && mediaInfo.type === 'image' && mediaInfo.value){
          // if(mediaInfo.caption){
          //   //mediaInfo.caption is not field name, it can be label
          //   var fieldName = mediaInfo.caption;
          //   imageTypeFields.push(fieldName);
          // }
          var sourceURL = mediaInfo.value.sourceURL;
          var imageFieldName = null;
          array.some(allFieldNames, lang.hitch(this, function(fieldName){
            var url = "{" + fieldName + "}";
            if(url === sourceURL){
              imageFieldName = fieldName;
              return true;
            }else{
              return false;
            }
          }));
          if(imageFieldName){
            imageTypeFields.push(imageFieldName);
          }
        }
      }));

      //update menu and fieldsTable
      this._resetMenu();
      this.fieldsTable.clear();
      if (portalFieldInfos.length > 0) {
        array.forEach(portalFieldInfos, lang.hitch(this, function(portalFieldInfo) {
          this._addMenuItem(portalFieldInfo);
          var isImage = imageTypeFields.indexOf(portalFieldInfo.fieldName) >= 0;
          this._addRow(portalFieldInfo, isImage);
        }));
      } else {
        this._addEmptyMenuItem();
      }
    },

    _updateDisplayFieldsTextBox: function(portalFieldInfos){
      var visiblePortalFieldInfos = array.filter(portalFieldInfos, lang.hitch(this, function(item){
        return item.visible;
      }));
      var labels = array.map(visiblePortalFieldInfos, function(item) {
        return item.label;
      });
      var str = labels.join(";  ");
      this.displayFieldsTextBox.set('value', str);
    },

    _addRow:function(portalFieldInfo, isImage){
      //{fieldName,label,visible}
      var rowData = lang.clone(portalFieldInfo);
      if(isImage){
        rowData.specialType = 'image';
      }else{
        rowData.specialType = 'none';
      }

      this.fieldsTable.addRow(rowData);
    },

    _addMenuItem:function(portalFieldInfo){
      var label = portalFieldInfo.fieldName + " {" + portalFieldInfo.fieldName + "}";
      var menuItem = new MenuItem({
        label:label,
        onClick:lang.hitch(this, function(){
          var a = this.titleTextBox.get('value');
          var b = a + "{" + portalFieldInfo.fieldName + "}";
          this.titleTextBox.set('value', b);
          var dialog = this.menu.getParent();
          html.setStyle(dialog.domNode.parentNode, 'display', 'none');
        })
      });
      this.menu.addChild(menuItem);
    },

    _addEmptyMenuItem:function(){
      var menuItem = new MenuItem({
        label:this.nls.noField,
        onClick:lang.hitch(this, function(){
          var dialog = this.menu.getParent();
          html.setStyle(dialog.domNode.parentNode, 'display', 'none');
        })
      });
      this.menu.addChild(menuItem);
    },

    //{readFromWebMap,title,fieldInfos,description,showAttachments,mediaInfos}
    _getPopupInfoByUI: function(){
      var popupInfo = null;
      if(this.customRadio.checked){
        popupInfo = this._getCustomPopupInfoByUI();
        if(popupInfo){
          popupInfo.readFromWebMap = false;
        }
      }else{
        popupInfo = {
          readFromWebMap: true
        };
      }
      return popupInfo;
    },

    //return {title,fieldInfos,description,showAttachments,mediaInfos}
    _getCustomPopupInfoByUI: function(){
      var popupInfo = {
        title:'',
        fieldInfos:[],
        description: null,
        showAttachments: false,
        mediaInfos: []
      };

      var layerDefinition = this._getLayerDefinition();

      if(!this.titleTextBox.validate()){
        this.sqs.showResultsSetting();
        this.sqs.scrollToDom(this.titleTextBox.domNode);
        jimuUtils.showValidationErrorTipForFormDijit(this.titleTextBox);
        return null;
      }

      popupInfo.title = this.titleTextBox.get('value');
      popupInfo.showAttachments = !!layerDefinition.hasAttachments;
      var fieldInfosAndMediaInfos = this._getPortalFieldInfosAndMediaInfosByUI();
      popupInfo.fieldInfos = fieldInfosAndMediaInfos.portalFieldInfos;
      popupInfo.mediaInfos = fieldInfosAndMediaInfos.mediaInfos;

      return popupInfo;
    },

    _getPortalFieldInfosAndMediaInfosByUI: function(){
      var data = this.fieldsTable.getData();
      var mediaInfos = [];
      var portalFieldInfos = array.map(data, lang.hitch(this, function(rowData){
        var fieldName = rowData.fieldName;
        var item = this._getDefaultPortalFieldInfo(fieldName);
        item.label = rowData.label || item.label;
        item.visible = rowData.visible;
        if(rowData.visible && rowData.specialType === 'image'){
          var url = "{" + fieldName + "}";
          mediaInfos.push({
            title: '',
            type: 'image',
            caption: fieldName,
            value: {
              sourceURL: url,
              linkURL: url
            }
          });
        }
        return item;
      }));
      var result = {
        portalFieldInfos: portalFieldInfos,
        mediaInfos: mediaInfos
      };
      return result;
    },

    //return {title,fieldInfos,description,showAttachments,mediaInfos}
    _getDefaultPopupInfo: function(){
      var layerDefinition = this._getLayerDefinition();
      return queryUtils.getDefaultPopupInfo(layerDefinition, false);
    },

    //return {fieldName,label,tooltip,visible,format,stringFieldOption}
    _getDefaultPortalFieldInfo: function(fieldName){
      var serviceFieldInfo = this._getServiceFildInfo(fieldName);
      return jimuUtils.getDefaultPortalFieldInfo(serviceFieldInfo);
    },

    //return {name,alias,type,domain,...}
    _getServiceFildInfo: function(fieldName){
      var fieldInfo = null;
      var layerDefinition = this._getLayerDefinition();
      fieldInfo = jimuUtils.getFieldInfoByFieldName(layerDefinition.fields, fieldName);
      return fieldInfo;
    },

    _getSortedFieldInfos: function(fieldNames, allFieldInfos){
      var result = [];
      var allFieldInfosHash = {};
      array.forEach(allFieldInfos, lang.hitch(this, function(fieldInfo){
        allFieldInfosHash[fieldInfo.name] = fieldInfo;
      }));
      var sortedAllFieldNames = [];
      sortedAllFieldNames = sortedAllFieldNames.concat(fieldNames);
      array.forEach(allFieldInfos, lang.hitch(this, function(fieldInfo){
        var fieldName = fieldInfo.name;
        if(sortedAllFieldNames.indexOf(fieldName) < 0){
          sortedAllFieldNames.push(fieldName);
        }
      }));
      result = array.map(sortedAllFieldNames, lang.hitch(this, function(fieldName){
        return allFieldInfosHash[fieldName];
      }));
      return result;
    },

    _onBtnSetDisplayFieldsClicked: function(){
      var popup = new Popup({
        width: 640,
        height: 380,
        titleLabel: this.nls.setDisplayFields,
        content: this.displayFieldsDiv,
        onClose: lang.hitch(this, function(){
          html.place(this.displayFieldsDiv, this.displayFieldsSection);
          popup.content = "";
        }),
        buttons: [{
          label: this.nls.ok,
          onClick: lang.hitch(this, function(){
            var fieldInfosAndMediaInfos = this._getPortalFieldInfosAndMediaInfosByUI();
            var portalFieldInfos = fieldInfosAndMediaInfos.portalFieldInfos;
            this._updateDisplayFieldsTextBox(portalFieldInfos);
            popup.close();
          })
        }, {
          label: this.nls.cancel,
          onClick: lang.hitch(this, function(){
            popup.close();
          })
        }]
      });
    },

    /*--------------------------orderByFields-------------------------------*/

    _setOrderByFields: function(orderByFields){
      //such as ["STATE_NAME DESC"]

      orderByFields = orderByFields || [];

      //clear UI
      this.sortFieldsDiv.innerHTML = "";

      var sortFieldInnerHTML = "";

      orderByFields = array.map(orderByFields, lang.hitch(this, function(item, i){
        var splits = item.split(' ');
        var fieldName = splits[0];
        var sortType = 'ASC';
        if(splits[1] && typeof splits[1] === 'string'){
          splits[1] = splits[1].toUpperCase();
          if(splits[1] === 'DESC'){
            sortType = 'DESC';
          }
        }

        var className = sortType.toLowerCase();

        //update UI
        var str = '<span>' + fieldName + '</span>' +
        '<span class="sort-arrow ' + className + '"></span>';
        if(i !== orderByFields.length - 1){
          str += "<span>,&nbsp;</span>";
        }

        sortFieldInnerHTML += str;

        var result = fieldName + " " + sortType;
        return result;
      }));

      if(sortFieldInnerHTML){
        sortFieldInnerHTML = "<span>&nbsp;&nbsp;</span>" + sortFieldInnerHTML;
      }

      this.sortFieldsDiv.innerHTML = sortFieldInnerHTML;

      this._currentOrderByFields = orderByFields;
    },

    _getOrderByFields: function(){
      var layerDefinition = this._getLayerDefinition();
      if(this._shouldEnableSorting(layerDefinition)){
        return this._currentOrderByFields;
      }
      return [];
    },

    _updateSortingIcon: function(layerInfo){
      if(this._shouldEnableSorting(layerInfo)){
        html.removeClass(this.sortFieldsIcon, 'jimu-state-disabled');
      }else{
        html.addClass(this.sortFieldsIcon, 'jimu-state-disabled');
      }
    },

    _shouldEnableSorting: function(layerInfo){
      return this._isServiceSupportsPagination(layerInfo) &&
      this._isServiceSupportsOrderBy(layerInfo);
    },

    _onBtnSortFieldsClicked: function(){
      var layerDefinition = this._getLayerDefinition();
      if(!layerDefinition){
        return;
      }

      if(!this._shouldEnableSorting(layerDefinition)){
        return;
      }

      var sortFields = new SortFields({
        nls: this.nls,
        layerDefinition: layerDefinition,
        orderByFields: lang.clone(this._currentOrderByFields),
        validSortFieldTypes: this._validSortFieldTypes
      });
      var popup = new Popup({
        width: 640,
        height: 380,
        titleLabel: this.nls.setSortingFields,
        content: sortFields,
        onClose: lang.hitch(this, function(){
          sortFields.destroy();
        }),
        buttons: [{
          label: this.nls.ok,
          onClick: lang.hitch(this, function(){
            var orderByFields = sortFields.getOrderByFields();
            this._setOrderByFields(orderByFields);
            popup.close();
          })
        }, {
          label: this.nls.cancel,
          onClick: lang.hitch(this, function(){
            popup.close();
          })
        }]
      });
    },

    /*-----------------------------------init---------------------------------------*/

    _initFieldsTable: function(){
      var args = {
        autoHeight: false,
        style: "height:187px",
        fields: [{
          name: "visible",
          title: this.nls.visibility,
          type: "checkbox"
        }, {
          name: "fieldName",
          title: this.nls.name,
          type: "text",
          editable: false
        }, {
          name: "label",
          title: this.nls.alias,
          type: "text",
          editable: true
        }, {
          name: "specialType",
          title: this.nls.specialType,
          type: "extension",
          create: lang.hitch(this, this._createSpecialType),
          setValue: lang.hitch(this, this._setValue4SpecialType),
          getValue: lang.hitch(this, this._getValueOfSpecialType)
        }, {
          name: "actions",
          title: this.nls.actions,
          type: "actions",
          actions: ["up", "down"]
        }]
      };
      this.fieldsTable = new SimpleTable(args);
      this.fieldsTable.placeAt(this.fieldsContainer);
      this.fieldsTable.startup();
    },

    _createSpecialType: function(td){
      var select = html.create('select', {}, td);
      html.create('option', {
        value: 'none',
        label: this.nls.none,
        selected: true,
        innerHTML: this.nls.none
      }, select);
      html.create('option', {
        value: 'image',
        label: this.nls.image,
        innerHTML: this.nls.image
      }, select);
    },

    _setValue4SpecialType: function(td, value){
      var select = query('select', td)[0];
      select.value = value;
    },

    _getValueOfSpecialType:function(td){
      var select = query('select', td)[0];
      return select.value;
    },

    _initAddFields:function(){
      var ttdContent = html.create("div");
      this.tooltipDialog = new TooltipDialog({
        style: "cursor:pointer",
        content: ttdContent
      });
      this.menu = new Menu();
      this.menu.placeAt(ttdContent);
      this.own(on(document.body, 'click', lang.hitch(this, function(){
        dojoPopup.close(this.tooltipDialog);
      })));
    },

    _onAddClicked:function(event){
      event.stopPropagation();
      event.preventDefault();
      dojoPopup.close(this.tooltipDialog);
      dojoPopup.open({
        popup: this.tooltipDialog,
        around: this.btnAddFields
      });
    },

    _resetMenu:function(){
      var menuItems = this.menu.getChildren();
      array.forEach(menuItems, lang.hitch(this, function(menuItem){
        this.menu.removeChild(menuItem);
      }));
    },

    _isServiceSupportsPagination: function(layerInfo){
      var isSupport = false;
      if(layerInfo.advancedQueryCapabilities){
        if(layerInfo.advancedQueryCapabilities.supportsPagination){
          isSupport = true;
        }
      }
      return isSupport;
    },

    _isServiceSupportsOrderBy: function(layerInfo) {
      var isSupport = false;
      if (layerInfo.advancedQueryCapabilities) {
        if (layerInfo.advancedQueryCapabilities.supportsOrderBy) {
          isSupport = true;
        }
      }
      return isSupport;
    }

  });
});