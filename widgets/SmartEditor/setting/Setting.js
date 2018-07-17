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
// jscs:disable validateIndentation
define([
  'dojo/_base/declare',
  'dijit/_WidgetsInTemplateMixin',
  'jimu/BaseWidgetSetting',
  'jimu/dijit/SimpleTable',
  'jimu/LayerInfos/LayerInfos',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/query',
  'dijit/registry',
  'dojo/_base/array',
  "./EditFields",
  "../PresetAllFields",
  "./EditDescription",
  "../utils",
  'dijit/Editor',
  'dojo/dom-style',
  'dojo/dom-attr',
  'dojo/dom-class',
  'dojo/sniff',
  'jimu/utils',
  'dojo/_base/html',
  "jimu/dijit/_GeocodeServiceChooserContent",
  "jimu/dijit/Popup",
  "esri/request",
  "esri/lang",
  'jimu/dijit/Message',
  "jimu/dijit/LoadingShelter",
  'jimu/dijit/LoadingIndicator',
  'jimu/dijit/TabContainer3',
  'dojo/dom-construct',
  'dojo/promise/all',
  'dojo/Deferred',
  'jimu/portalUtils',
  'dijit/_editor/plugins/LinkDialog',
  'dijit/_editor/plugins/ViewSource',
  'dijit/_editor/plugins/FontChoice',
  'dojox/editor/plugins/Preview',
  'dijit/_editor/plugins/TextColor',
  'dojox/editor/plugins/ToolbarLineBreak',
  'dojox/editor/plugins/FindReplace',
  'dojox/editor/plugins/PasteFromWord',
  'dojox/editor/plugins/InsertAnchor',
  'dojox/editor/plugins/Blockquote',
  'dojox/editor/plugins/UploadImage',
  'jimu/dijit/EditorChooseImage',
  'jimu/dijit/EditorTextColor',
  'jimu/dijit/EditorBackgroundColor'
],
  function (
    declare,
    _WidgetsInTemplateMixin,
    BaseWidgetSetting,
    Table,
    LayerInfos,
    lang,
    on,
    query,
    registry,
    array,
    EditFields,
    PresetAllFields,
    EditDescription,
    editUtils,
    Editor,
    domStyle,
    domAttr,
    domClass,
    has,
    utils,
    html,
    _GeocodeServiceChooserContent,
    Popup,
    esriRequest,
    esriLang,
    Message,
    LoadingShelter,
    LoadingIndicator,
    TabContainer3,
    domConstruct,
    all,
    Deferred,
    portalUtils
  ) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      //these two properties is defined in the BaseWidget
      baseClass: 'jimu-widget-smartEditor-setting',
      _jimuLayerInfos: null,
      _layersTable: null,
      _configInfos: null,
      _editFields: null,
      _currentTableIds: [],
      _currentConfigInfoInTable: null,
      _configuredGeocoderSettings: {},
      _configuredPresetInfos: {},

      postCreate: function () {
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
        this._configuredGeocoderSettings = {};
        this._configuredPresetInfos = {};
        this._currentTableIds = [];
        //Backward compatibility. If canPresetValue flag is present and it is set to true
        this._processConfig();
        this._initTabs();
      },

      _processConfig: function () {
        var configInfos;
        if (!this.config.editor.hasOwnProperty("presetInfos") &&
          this.config.editor.layerInfos) {
          configInfos = this.config.editor.layerInfos;
          array.forEach(configInfos, lang.hitch(this, function (configInfo) {
            configInfo.fieldValues = {};
            array.forEach(configInfo.fieldInfos, lang.hitch(this, function (fieldInfo) {
              var actionObj;
              //Check for "canPresetValue" key and handle it for backward compatibility
              if (fieldInfo.hasOwnProperty("canPresetValue") && fieldInfo.canPresetValue) {
                actionObj = [{
                  "actionName": "Intersection",
                  "enabled": false
                }, {
                  "actionName": "Address",
                  "enabled": false
                }, {
                  "actionName": "Coordinates",
                  "enabled": false
                }, {
                  "actionName": "Preset",
                  "enabled": true
                }];
                configInfo.fieldValues[fieldInfo.fieldName] = lang.clone(actionObj);
                this._configuredPresetInfos[fieldInfo.fieldName] = [];
              }
            }));
          }));
          //Update presetInfos object
          this.config.editor.presetInfos = this._configuredPresetInfos;
        }
      },

      startup: function () {
        this.inherited(arguments);
        LayerInfos.getInstance(this.map, this.map.itemInfo)
          .then(lang.hitch(this, function (operLayerInfos) {
            this._jimuLayerInfos = operLayerInfos;
            this._init();
            this.setConfig();
            this._initEditor();
          }));
      },

      destroy: function () {
        this._jimuLayerInfos = null;
        delete this._jimuLayerInfos;
        this._layersTable = null;
        delete this._layersTable;
        this._configInfos = null;
        delete this._configInfos;
        this._editFields = null;
        delete this._editFields;
        this._editDescriptions = null;
        delete this._editDescriptions;
        this.inherited(arguments);
      },

      _init: function () {
        this._initSettings();
        this._initLayersTable();
      },

      /**
      * This function the initializes jimu tab for setting and layout
      **/
      _initTabs: function () {
        var layerSettingTab, generalSettingTab, tabs;
        layerSettingTab = {
          title: this.nls.layersPage.layerSettings,
          content: this.layerSettingTabNode
        };
        generalSettingTab = {
          title: this.nls.layersPage.generalSettings,
          content: this.generalSettingTabNode
        };
        tabs = [layerSettingTab, generalSettingTab];
        this.tab = new TabContainer3({
          "tabs": tabs
        });
        // Handle tabChanged event and set the scroll position to top
        this.own(on(this.tab, "tabChanged", lang.hitch(this, function () {
          this.tab.containerNode.scrollTop = 0;
        })));
        this.tab.placeAt(this.tabDiv);
        //Handle geocoder settings button click evet
        this.own(on(this.geocoderSettings, "click", lang.hitch(this, function () {
          this._openServiceChooser(true);
        })));
        this.own(on(this.presetSettings, "click", lang.hitch(this, this._showPresetDialog)));
      },

      _initLayersTable: function () {
        var fields = [{
          name: 'edit',
          title: this.nls.layersPage.layerSettingsTable.edit,
          type: 'checkbox',
          'class': 'editable'
        }, {
          name: 'label',
          title: this.nls.layersPage.layerSettingsTable.label,
          type: 'text',
          'class': 'layer'
        }, {
          name: 'allowUpdateOnly',
          title: this.nls.layersPage.layerSettingsTable.allowUpdateOnly,
          type: 'checkbox',
          'class': 'update'
        }, {
          name: 'allowDelete',
          title: this.nls.layersPage.layerSettingsTable.allowDelete,
          type: 'checkbox',
          'class': 'update'
        },
        {
          name: 'disableGeometryUpdate',
          title: this.nls.layersPage.layerSettingsTable.update,
          type: 'checkbox',
          'class': 'disable'
        },
        {
          name: 'specialType',
          type: "extension",
          title: this.nls.layersPage.layerSettingsTable.description,
          create: lang.hitch(this, this._createSpecialType),
          setValue: lang.hitch(this, this._setValue4SpecialType),
          getValue: lang.hitch(this, this._getValueOfSpecialType),
          'class': 'description'
        },
        {
          name: 'actions',
          title: this.nls.actions,
          type: 'actions',
          'class': 'actions',
          actions: ['edit']//'up','down',
        },
        {
          name: 'allowUpdateOnlyHidden',
          type: 'checkbox',
          hidden: true
        },
        {
          name: 'allowDeleteHidden',
          type: 'checkbox',
          hidden: true
        },
        {
          name: 'disableGeometryUpdateHidden',
          type: 'checkbox',
          hidden: true
        }];
        var args = {
          fields: fields,
          selectable: false
        };
        this._layersTable = new Table(args);
        this._layersTable.placeAt(this.tableLayerInfos);
        this._layersTable.startup();

        this._addBreadCrumb(this.nls.layersPage.allLayers, true);
        var nl = query("th.simple-table-field", this._layersTable.domNode);
        nl.forEach(function (node) {
          var scrubText = (node.innerText === undefined || node.innerText === "") ?
            "" : node.innerText.replace(/(\r\n|\n|\r)/gm, "");
          switch (scrubText) {
            case this.nls.layersPage.layerSettingsTable.edit:
              node.title = this.nls.layersPage.layerSettingsTable.editTip;
              node.alt = this.nls.layersPage.layerSettingsTable.editTip;
              break;
            case this.nls.layersPage.layerSettingsTable.label:
              node.title = this.nls.layersPage.layerSettingsTable.labelTip;
              node.alt = this.nls.layersPage.layerSettingsTable.labelTip;
              break;
            case this.nls.layersPage.layerSettingsTable.allowUpdateOnly:
              node.title = this.nls.layersPage.layerSettingsTable.allowUpdateOnlyTip;
              node.alt = this.nls.layersPage.layerSettingsTable.allowUpdateOnlyTip;
              break;
            case this.nls.layersPage.layerSettingsTable.allowDelete:
              node.title = this.nls.layersPage.layerSettingsTable.allowDeleteTip;
              node.alt = this.nls.layersPage.layerSettingsTable.allowDeleteTip;
              break;
            case this.nls.layersPage.layerSettingsTable.update:
              node.title = this.nls.layersPage.layerSettingsTable.updateTip;
              node.alt = this.nls.layersPage.layerSettingsTable.updateTip;
              break;
            case this.nls.layersPage.layerSettingsTable.description:
              node.title = this.nls.layersPage.layerSettingsTable.descriptionTip;
              node.alt = this.nls.layersPage.layerSettingsTable.descriptionTip;
              break;
            case this.nls.actions:
              node.title = this.nls.layersPage.layerSettingsTable.actionsTip;
              node.alt = this.nls.layersPage.layerSettingsTable.actionsTip;
              break;

          }

        }, this);

        this.own(on(this._layersTable,
          'actions-edit',
          lang.hitch(this, this._onEditFieldInfoClick)));
      },
      _createSpecialType: function (td) {
        var img = html.create('a', { 'class': 'attDescrip' }, td);
        this.own(on(img, 'click', lang.hitch(this, function () {
          this._onDescriptionClick(td.parentNode);
        })));
      },

      _setValue4SpecialType: function () {
        //var select = query('select', td)[0];
        //select.value = value;
      },

      _getValueOfSpecialType: function () {
        //var select = query('select', td)[0];
        //return select.value;
      },
      _initSettings: function () {
        //this.showDeleteButton.set('checked', this.config.editor.showDeleteButton);
        this.useFilterEditor.set('checked', this.config.editor.useFilterEditor);
        if (this.config.editor.hasOwnProperty("displayShapeSelector")) {
          this.displayShapeSelector.set('checked', this.config.editor.displayShapeSelector);
        }
        else {
          this.displayShapeSelector.set('checked', false);
        }
        if (this.config.editor.hasOwnProperty("displayPresetTop")) {
          this.displayPresetTop.set('checked', this.config.editor.displayPresetTop);
        }
        else {
          this.displayPresetTop.set('checked', false);
        }
        this.displayPromptOnSave.set('checked', this.config.editor.displayPromptOnSave);
        this.displayPromptOnDelete.set('checked', this.config.editor.displayPromptOnDelete);
        this.removeOnSave.set('checked', this.config.editor.removeOnSave);
        if (this.config.editor.hasOwnProperty("listenToGF")) {
          this.listenToGF.set('checked', this.config.editor.listenToGF);
        }
        else {
          this.listenToGF.set('checked', false);
        }
        if (this.config.editor.hasOwnProperty("keepTemplateSelected")) {
          this.keepTemplateSelected.set('checked', this.config.editor.keepTemplateSelected);
        }
        else {
          this.keepTemplateSelected.set('checked', false);
        }
        if (this.config.editor.hasOwnProperty("editGeometryDefault")) {
          this.editGeometryDefault.set('checked', this.config.editor.editGeometryDefault);
        }
        else {
          this.editGeometryDefault.set('checked', false);
        }
        if (this.config.editor.hasOwnProperty("autoSaveEdits")) {
          this.autoSaveEdits.set('checked', this.config.editor.autoSaveEdits);
          //if(this.autoSaveEdits.get('checked')) {
          //  this.removeOnSave.set('checked', true);
          //}
        }
        else {
          this.autoSaveEdits.set('checked', false);
        }
        if (this.config.editor.hasOwnProperty("enableAttributeUpdates")) {
          this.enableAttributeUpdates.set('checked', this.config.editor.enableAttributeUpdates);
        }
        else {
          this.enableAttributeUpdates.set('checked', false);
        }
        this.own(on(this.autoSaveEdits, 'click', lang.hitch(this, function () {
          if (this.autoSaveEdits.get('checked')) {
            this.removeOnSave.set('checked', true);
          } else {
            this.removeOnSave.set('checked', false);
          }
        })));
        //this.clearSelectionOnClose.set('checked', false);
      },

      setConfig: function () {
        //create and show loading indicator on load
        var loading = new LoadingIndicator({ hidden: false }).placeAt(this.tableInfosLoading);
        //fetch orgs first geocoder
        this._fetchDefaultGeocoder().then(lang.hitch(this, function (defaultGeocoder) {
          //Get table infos so that all the tables layer objects are loaded
          //This will help in getting the capablities and other layer infos
          this._getTableInfos().then(lang.hitch(this, function () {
            this._configInfos = editUtils.getConfigInfos(this._jimuLayerInfos,
              this.config.editor.layerInfos, false, false);
            var prevConfiguredLayerIds = {};
            //Get previously configured layer ids and thier editable state
            if (this.config.editor.layerInfos &&
              this.config.editor.layerInfos.length > 0) {
              array.forEach(this.config.editor.layerInfos, function (configInfo) {
                //for backward compatibility as we were not storing _editFlag in prev versions
                if (!configInfo.hasOwnProperty('_editFlag')) {
                  configInfo._editFlag = true;
                }
                prevConfiguredLayerIds[configInfo.featureLayer.id] = configInfo._editFlag;
              });
              array.forEach(this._configInfos, function (configInfo) {
                //if the current layer id is available in previously configured layer
                //then set the edit flag using prev value, if not found then set to false
                if (prevConfiguredLayerIds.hasOwnProperty(configInfo.featureLayer.id)) {
                  configInfo._editFlag = prevConfiguredLayerIds[configInfo.featureLayer.id];
                } else {
                  configInfo._editFlag = false;
                }
              });
            }

            //set previously configured geocoder settings
            if (this.config.geocoderSettings) {
              this._configuredGeocoderSettings = lang.clone(this.config.geocoderSettings);
            } else {
              //if no geocoder settings available use first geocoder from orgs geocoders list
              this._configuredGeocoderSettings = defaultGeocoder;
            }
            //set previously configured preset infos
            if (this.config.editor.presetInfos) {
              this._configuredPresetInfos = lang.clone(this.config.editor.presetInfos);
            } else {
              this._configuredPresetInfos = {};
            }
            //set current config as all layers config on load
            this._currentConfigInfoInTable = this._configInfos;
            this._setLayersTable(this._configInfos, false);
            setTimeout(lang.hitch(this, function () {
              this.resize();
              //destroy loading indicator
              loading.destroy();
            }), 200);
          }));
        }));
      },

      _fetchOrgsHelperServiecs: function () {
        var def = new Deferred();
        //check whether portal url is available then try to fetch helper services
        if (this.appConfig.portalUrl && lang.trim(this.appConfig.portalUrl) !== "") {
          //get portal info to fetch geometry service Url
          portalUtils.getPortalSelfInfo(this.appConfig.portalUrl).then(lang.hitch(
            this,
            function (portalInfo) {
              // get helper-services from portal object
              var helperServices = portalInfo && portalInfo.helperServices;
              var geocodeURL = "";
              //use first geocode service from the org
              if (helperServices && helperServices.geocode && helperServices.geocode.length > 0 &&
                helperServices.geocode[0].url) {
                geocodeURL = helperServices.geocode[0].url;
              }
              def.resolve(geocodeURL);
            }), lang.hitch(this, function () {
              def.resolve("");
            }));
        } else {
          def.resolve("");
        }
        return def.promise;
      },

      _fetchDefaultGeocoder: function () {
        var def = new Deferred();
        this._fetchOrgsHelperServiecs().then(lang.hitch(this, function (geocodeURL) {
          var defaultGeocoderSettings = {};
          esriRequest({
            url: geocodeURL,
            content: {
              f: 'json'
            },
            handleAs: 'json',
            callbackParamName: 'callback'
          }).then(lang.hitch(this, function (response) {
            if (response && response.candidateFields) {
              defaultGeocoderSettings.url = geocodeURL;
              defaultGeocoderSettings.fields = lang.clone(response.candidateFields);
            }
            def.resolve(defaultGeocoderSettings);
          }), lang.hitch(this, function () {
            def.resolve(defaultGeocoderSettings);
          }));
        }));
        return def.promise;
      },

      _getTableInfos: function () {
        var defs = [];
        var tableInfoArray = this._jimuLayerInfos.getTableInfoArray();
        array.forEach(tableInfoArray, function (jimuTableInfo) {
          defs.push(jimuTableInfo.getLayerObject());
        }, this);
        return all(defs);
      },

      _setLayersTable: function (configuredLayerInfos, isRelatedInfo) {
        var nl = null, isAtLeastOneTable = false;
        if (isRelatedInfo) {
          //if showing layers list for related layers/table
          //update object ref in this._configInfos so the editField settings will be stored properly
          if (this._currentTableIds && this._currentTableIds.length > 0) {
            var currentConfig;
            currentConfig = this._configInfos;
            array.forEach(this._currentTableIds, function (layerId, index) {
              array.some(currentConfig, function (info) {
                if (info.featureLayer.id === layerId) {
                  currentConfig = info;
                  return true;
                }
              });
              //if current table is not of all-layers and the index is not last then consider the next relations
              if (this._currentTableIds.length > 1 && index + 1 < this._currentTableIds.length) {
                currentConfig = currentConfig.relationshipInfos;
              }
            }, this);
            //set the relation infos for the appropriate layer/table
            currentConfig.relationshipInfos = configuredLayerInfos;
          }
        }
        //set current config which will be used to store the configuration settings regarding layers
        this._currentConfigInfoInTable = configuredLayerInfos;
        //loop through each layer info and add row in the table
        array.forEach(configuredLayerInfos, function (configInfo) {
          var tdEdit;
          var addRowResult = this._layersTable.addRow({
            label: configInfo.layerInfo.title,
            edit: configInfo._editFlag ? true : false,
            allowUpdateOnly: configInfo.allowUpdateOnly,
            allowUpdateOnlyHidden: configInfo.allowUpdateOnly === null ?
              false : configInfo.allowUpdateOnly,
            allowDelete: configInfo.allowDelete,
            allowDeleteHidden: configInfo.allowDelete === null ?
              false : configInfo.allowDelete,
            //if showing related info disable geometry editing
            disableGeometryUpdate: isRelatedInfo ? true : configInfo.disableGeometryUpdate,
            disableGeometryUpdateHidden: configInfo.disableGeometryUpdate === null ?
              false : configInfo.disableGeometryUpdate
          });
          //Check if at least one related item is table and accordingly update the flag
          if (configInfo.layerInfo.isTable) {
            isAtLeastOneTable = true;
          }
          //Add ref to configInfo in each row
          addRowResult.tr._configInfo = configInfo;
          //add layer id to uniquely identify the row
          addRowResult.tr._layerId = configInfo.layerInfo.layerObject.id;
          if (configInfo.featureLayer.layerAllowsDelete === false) {
            nl = query(".allowDelete", addRowResult.tr);
            nl.forEach(function (node) {

              var widget = registry.getEnclosingWidget(node.childNodes[0]);

              widget.setStatus(false);
            });
          }
          if (configInfo.featureLayer.layerAllowsCreate === false) {
            nl = query(".allowUpdateOnly", addRowResult.tr);
            nl.forEach(function (node) {

              var widget = registry.getEnclosingWidget(node.childNodes[0]);

              widget.setStatus(false);
            });
          }
          //fetch update only check boxes
          nl = query(".allowUpdateOnly", addRowResult.tr);
          nl.forEach(function (node) {
            var widget = registry.getEnclosingWidget(node.childNodes[0]);
            if (configInfo.featureLayer.layerAllowsUpdate === false) {
              widget.setStatus(false);
            }
            //if related item is accessed and it is layer, then disable and check the checkbox
            if (isRelatedInfo && !configInfo.layerInfo.isTable) {
              widget.setValue(true);
              widget.setStatus(false);
            }
          });

          //fetch disable geometry check boxes
          nl = query(".disableGeometryUpdate", addRowResult.tr);
          nl.forEach(function (node) {
            var widget = registry.getEnclosingWidget(node.childNodes[0]);
            if (configInfo.featureLayer.layerAllowGeometryUpdates === false) {
              widget.setStatus(false);
            }
            if (isRelatedInfo) {
              widget.setValue(true);
              widget.setStatus(false);
            }
          });

          //if layer don't allow updating & creating of features
          //disable editable & geometryUpdate checkbox
          if (configInfo.featureLayer.layerAllowsUpdate === false &&
            configInfo.featureLayer.layerAllowsCreate === false) {
            nl = query(".edit, .disableGeometryUpdate", addRowResult.tr);
            nl.forEach(function (node) {
              var widget = registry.getEnclosingWidget(node.childNodes[0]);
              widget.setValue(false);
              widget.setStatus(false);
            });
          }
          //Geometry update is disabled for related tables then disable the parent checkbox also
          var thCbx = this._layersTable._getThCheckBox("disableGeometryUpdate");
          if (thCbx) {
            if (isRelatedInfo) {
              thCbx.setValue(false);
              thCbx.setStatus(false);
            } else {
              thCbx.setStatus(true);
            }
          }
          //Show warning icon if related item is layer
          if (isRelatedInfo && !configInfo.layerInfo.isTable) {
            var checkBoxRow = query(".edit, .editable", addRowResult.tr)[0];
            var warningIcon = domConstruct.create("div", {
              "class": "warningIcon",
              "style": "display:none",
              "title": this.nls.layersPage.layerSettingsTable.allowUpdateOnly
            });
            domConstruct.place(warningIcon, checkBoxRow, "first");
            var widget = registry.getEnclosingWidget(checkBoxRow.childNodes[1]);
            //control the visibility of warning icon based on checkbox
            this.own(on(widget, "change", lang.hitch(this, function (checked) {
              if (checked) {
                domStyle.set(warningIcon, "display", "block");
              } else {
                domStyle.set(warningIcon, "display", "none");
              }
            })));
            if (configInfo._editFlag === true) {
              domStyle.set(warningIcon, "display", "block");
            }
          }
          var relationshipInfo;
          //if relation info is not configured then create default relation info
          //else use the configured one
          if (!configInfo.relationshipInfos || configInfo.relationshipInfos.length === 0) {
            //get relation info
            relationshipInfo = this._getRelatedTableInfo(configInfo.layerInfo.layerObject);
            configInfo.relationshipInfos = relationshipInfo;
            //also by default set edit flag to false for related layers/table
            array.forEach(configInfo.relationshipInfos, function (configInfo) {
              configInfo._editFlag = false;
            });
          } else {
            relationshipInfo = configInfo.relationshipInfos;
          }

          //if has valid relations show table icon in the last col
          if (relationshipInfo.length > 0) {
            //if related layer/table dont have layer info call getConfigInfos method to add layer infos
            if (!relationshipInfo[0].layerInfo) {
              //updates the relation infos
              relationshipInfo = editUtils.getConfigInfos(this._jimuLayerInfos,
                relationshipInfo, false, true, true);
              //if edit flag not found in related layers/table add & set it to false
              array.forEach(configInfo.relationshipInfos, function (configInfo) {
                if (!configInfo.hasOwnProperty("_editFlag")) {
                  configInfo._editFlag = false;
                }
              });
            }
            //Now add the icon in last col to access the related layer/tables
            this._addTableFieldActionIcon(addRowResult.tr, relationshipInfo);
          }
          // set tooltip for edit icon
          tdEdit = query('.jimu-icon-edit', addRowResult.tr)[0];
          tdEdit.title = this.nls.layersPage.layerSettingsTable.fieldsTip;
          //check if all the related items are layer, if yes then disable
          //the "Allow Updates" header checkbox
          var allowUpdatesHeaderChkBox = this._layersTable._getThCheckBox("allowUpdateOnly");
          if (allowUpdatesHeaderChkBox) {
            //If all the related items are of type layer then disable "Allow Updates" checkbox
            if (isRelatedInfo && !isAtLeastOneTable) {
              allowUpdatesHeaderChkBox.setValue(false);
              allowUpdatesHeaderChkBox.setStatus(false);
            } else {
              allowUpdatesHeaderChkBox.setStatus(true);
            }
          }
        }, this);
      },

      _onDescriptionClick: function (tr) {
        var rowData = this._layersTable.getRowData(tr);
        if (rowData && rowData.edit) {
          this._editDescriptions = new EditDescription({
            nls: this.nls,
            _configInfo: tr._configInfo,
            _layerName: rowData.label
          });
          this._editDescriptions.popupEditDescription();
        }
      },
      _onEditFieldInfoClick: function (tr) {
        var rowData = this._layersTable.getRowData(tr);
        if (rowData && rowData.edit) {
          this._editFields = new EditFields({
            nls: this.nls,
            _configInfo: tr._configInfo,
            _layerName: rowData.label,
            _geocoderSettings: this._configuredGeocoderSettings,
            _configuredPresetInfos: this._configuredPresetInfos,
            layerInfos: this._jimuLayerInfos,
            isRelatedLayer: this._currentTableIds.length >= 1 ? true : false,
            map: this.map
          });
          this._editFields.popupEditPage();
          this.own(on(this._editFields, "SetGeocoder", lang.hitch(this, this._openServiceChooser)));
        }
        else {
          new Message({
            message: this.nls.layersPage.editFieldError
          });
        }
      },

      _getText: function () {
        var editorText;
        editorText = this._editorObj.focusNode.innerHTML;
        return editorText;
      },
      _initEditor: function () {

        if (!this._editorObj) {
          this._initEditorPluginsCSS();
          this._editorObj = new Editor({
            plugins: [
              'bold', 'italic', 'underline',
              utils.getEditorTextColor("smartEditor"), utils.getEditorBackgroundColor("smartEditor"),
              '|', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
              '|', 'insertOrderedList', 'insertUnorderedList', 'indent', 'outdent'
            ],
            extraPlugins: [
              '|', 'createLink', 'unlink', 'pastefromword', '|', 'undo', 'redo',
              '|', 'toolbarlinebreak',//'chooseImage', 'uploadImage',
              {
                name: "dijit._editor.plugins.FontChoice",
                command: "fontName",
                custom: "Arial;Comic Sans MS;Courier New;Garamond;Tahoma;Times New Roman;Verdana".split(";")
              }, 'fontSize', 'formatBlock'
            ],
            style: "font-family:Verdana;"
          }, this.editorDescription);
          domStyle.set(this._editorObj.domNode, {
            "width": '100%',
            "height": '100%'
          });

          if (this.config.editor.editDescription === undefined || this.config.editor.editDescription === null) {
            this._editorObj.set("value", this.nls.layersPage.title);
          }
          else {
            this._editorObj.set("value", this.config.editor.editDescription);
          }
          this._editorObj.startup();
          if (has('ie') !== 8) {
            this._editorObj.resize({
              w: '100%',
              h: '100%'
            });
          } else {
            var box = html.getMarginBox(this.editorDescription);
            this._editorObj.resize({
              w: box.w,
              h: box.h
            });
          }
        }
      },
      /**
      * this function loads the editor tool plugins CSS
      **/
      _initEditorPluginsCSS: function () {
        var head, tcCssHref, tcCss, epCssHref, epCss, pfCssHref, pfCss;
        head = document.getElementsByTagName('head')[0];
        tcCssHref = window.apiUrl + "dojox/editor/plugins/resources/css/TextColor.css";
        tcCss = query('link[href="' + tcCssHref + '"]', head)[0];
        if (!tcCss) {
          utils.loadStyleLink("editor_plugins_resources_TextColor", tcCssHref);
        }
        epCssHref = window.apiUrl + "dojox/editor/plugins/resources/editorPlugins.css";
        epCss = query('link[href="' + epCssHref + '"]', head)[0];
        if (!epCss) {
          utils.loadStyleLink("editor_plugins_resources_editorPlugins", epCssHref);
        }
        pfCssHref = window.apiUrl + "dojox/editor/plugins/resources/css/PasteFromWord.css";
        pfCss = query('link[href="' + pfCssHref + '"]', head)[0];
        if (!pfCss) {
          utils.loadStyleLink("editor_plugins_resources_PasteFromWord", pfCssHref);
        }
      },

      _resetSettingsConfig: function () {

        this.config.editor.displayPromptOnSave =
          this.displayPromptOnSave.checked === undefined ?
            false : this.displayPromptOnSave.checked;
        this.config.editor.displayPromptOnDelete =
          this.displayPromptOnDelete.checked === undefined ?
            false : this.displayPromptOnDelete.checked;
        this.config.editor.removeOnSave =
          this.removeOnSave.checked === undefined ?
            false : this.removeOnSave.checked;

        this.config.editor.useFilterEditor =
          this.useFilterEditor.checked === undefined ?
            false : this.useFilterEditor.checked;

        this.config.editor.displayShapeSelector =
          this.displayShapeSelector.checked === undefined ?
            false : this.displayShapeSelector.checked;
        this.config.editor.displayPresetTop =
          this.displayPresetTop.checked === undefined ?
            false : this.displayPresetTop.checked;
        this.config.editor.listenToGF =
          this.listenToGF.checked === undefined ?
            false : this.listenToGF.checked;

        this.config.editor.keepTemplateSelected =
          this.keepTemplateSelected.checked === undefined ?
            false : this.keepTemplateSelected.checked;

        this.config.editor.editGeometryDefault =
          this.editGeometryDefault.checked === undefined ?
            false : this.editGeometryDefault.checked;

        this.config.editor.autoSaveEdits =
          this.autoSaveEdits.checked === undefined ?
            false : this.autoSaveEdits.checked;

        this.config.editor.enableAttributeUpdates =
          this.enableAttributeUpdates.checked === undefined ?
            false : this.enableAttributeUpdates.checked;
      },

      _getConfigForCurrentDisplayedLayers: function () {
        if (!this._currentConfigInfoInTable) {
          return;
        }
        var layersTableData = this._layersTable.getData();
        array.forEach(this._currentConfigInfoInTable, function (configInfo, index) {
          configInfo._editFlag = layersTableData[index].edit;
          configInfo.allowUpdateOnly = (layersTableData[index].allowUpdateOnly === null ?
            layersTableData[index].allowUpdateOnlyHidden : layersTableData[index].allowUpdateOnly);
          configInfo.allowDelete = (layersTableData[index].allowDelete === null ?
            layersTableData[index].allowDeleteHidden : layersTableData[index].allowDelete);
          configInfo.disableGeometryUpdate =
            (layersTableData[index].disableGeometryUpdate === null ?
              layersTableData[index].disableGeometryUpdateHidden :
              layersTableData[index].disableGeometryUpdate);
        }, this);
      },

      _getCurrentConfigInfo: function (configInfos) {
        var checkedLayerInfos = [];
        array.forEach(configInfos, function (configInfo) {
          if (configInfo.hasOwnProperty("featureLayer")) {
            if (configInfo.featureLayer.hasOwnProperty("layerAllowsCreate")) {
              delete configInfo.featureLayer.layerAllowsCreate;
            }
            if (configInfo.featureLayer.hasOwnProperty("layerAllowsUpdate")) {
              delete configInfo.featureLayer.layerAllowsUpdate;
            }
            if (configInfo.featureLayer.hasOwnProperty("layerAllowsDelete")) {
              delete configInfo.featureLayer.layerAllowsDelete;
            }
            if (configInfo.featureLayer.hasOwnProperty("layerAllowGeometryUpdates")) {
              delete configInfo.featureLayer.layerAllowGeometryUpdates;
            }
          }
          configInfo.fieldInfos = this._resetFieldInfos(configInfo.fieldInfos);
          if (configInfo.hasOwnProperty("fieldValidations")) {
            for (var k in configInfo.fieldValidations) {
              if (configInfo.fieldValidations.hasOwnProperty(k)) {
                array.forEach(configInfo.fieldValidations[k], function (fieldValidation) {
                  if (fieldValidation.hasOwnProperty("expression")) {
                    delete fieldValidation.expression;
                  }
                });

              }
            }
          }
          if (configInfo.layerInfo) {
            delete configInfo.layerInfo;
          }
          //now push all the layers regardless of editable or not
          checkedLayerInfos.push(configInfo);
          //If has valid relationshipInfos then get config info for related items as well
          if (configInfo.relationshipInfos && configInfo.relationshipInfos.length > 0) {
            configInfo.relationshipInfos =
              this._getCurrentConfigInfo(configInfo.relationshipInfos);
          }
        }, this);
        return checkedLayerInfos;
      },

      getConfig: function () {
        this._resetSettingsConfig();
        this.config.editor.editDescription = this._getText();
        //first get the settings from current displayed layer/tables
        this._getConfigForCurrentDisplayedLayers();
        // get layerInfos config
        var checkedLayerInfos = this._getCurrentConfigInfo(this._configInfos);
        if (checkedLayerInfos.length === 0) {
          new Message({
            message: this.nls.layersPage.noConfigedLayersError
          });
          return false;
        } else {
          this.config.editor.layerInfos = checkedLayerInfos;
        }
        //store geocoder settings
        if (this._configuredGeocoderSettings && this._configuredGeocoderSettings.hasOwnProperty("url")) {
          this.config.geocoderSettings = lang.clone(this._configuredGeocoderSettings);
        } else {
          this.config.geocoderSettings = null;
        }
        //store prest infos in config
        if (this._configuredPresetInfos) {
          this.config.editor.presetInfos = lang.clone(this._configuredPresetInfos);
        } else {
          this.config.editor.presetInfos = {};
        }
        return this.config;
      },

      _resetFieldInfos: function (fieldInfos) {
        return array.map(fieldInfos, function (fieldInfo) {
          var fldInfo = {};
          fldInfo.fieldName = fieldInfo.fieldName === undefined ? '' : fieldInfo.fieldName;
          fldInfo.isEditable = fieldInfo.isEditable === undefined ? true : fieldInfo.isEditable;
          fldInfo.visible = fieldInfo.visible === undefined ? true : fieldInfo.visible;
          return fldInfo;
        });
      },

      /**
       * Function to get layer/table info of the related items
       * @memberOf setting/Settings
       **/
      _getRelatedTableInfo: function (layer) {
        var tableInfos = [], baseURL, relationships, relationShipsWithoutDestination;
        if (layer) {
          //get base url of the layer/table
          baseURL = layer.url.substr(0, layer.url.lastIndexOf('/') + 1);
          //get relationships of the layer
          relationships = lang.clone(layer.relationships);
          //consider only those relationships where the role is not esriRelRoleDestination
          relationShipsWithoutDestination = array.filter(relationships,
            function (relationInfo) {
              return relationInfo.role !== "esriRelRoleDestination";
            });
          //get layer Or table info of the related items
          array.forEach(relationShipsWithoutDestination, lang.hitch(this, function (table) {
            var foundInTables = false;
            //first check in tables if not found in tables search in layers
            array.forEach(this.map.webMapResponse.itemInfo.itemData.tables,
              lang.hitch(this, function (tableData) {
                var jimuTableInfo;
                //once the url matches get its layer/table info using _jimuLayerInfos
                if (tableData.url.replace(/.*?:\/\//g, "") ===
                  (baseURL + table.relatedTableId).replace(/.*?:\/\//g, "")) {
                  jimuTableInfo = this._jimuLayerInfos.getLayerOrTableInfoById(tableData.id);
                  if (jimuTableInfo) {
                    jimuTableInfo = editUtils.getConfigInfo(jimuTableInfo, {});
                    jimuTableInfo.relationshipId = table.id;
                    tableInfos.push(jimuTableInfo);
                    foundInTables = true;
                  }
                }
              }));
            if (!foundInTables) {
              array.forEach(this.map.webMapResponse.itemInfo.itemData.operationalLayers,
                lang.hitch(this, function (layerData) {
                  var jimuLayerInfo;
                  //once the url matches get its layer/table info using _jimuLayerInfos
                  if (layerData.url.replace(/.*?:\/\//g, "") ===
                    (baseURL + table.relatedTableId).replace(/.*?:\/\//g, "")) {
                    jimuLayerInfo = this._jimuLayerInfos.getLayerOrTableInfoById(layerData.id);
                    if (jimuLayerInfo) {
                      jimuLayerInfo = editUtils.getConfigInfo(jimuLayerInfo, {});
                      jimuLayerInfo.relationshipId = table.id;
                      tableInfos.push(jimuLayerInfo);
                    }
                  }
                }));
            }
          }));
        }
        return tableInfos;
      },

      /**
       * Function to add table field icon in actions column
       * @memberOf setting/Settings
       **/
      _addTableFieldActionIcon: function (tableRow, relationshipInfo) {
        var tableFieldRowtd, tdEdit, actionFieldColumn;
        tableFieldRowtd = query('.action-item-parent', tableRow)[0];
        tdEdit = query('.jimu-icon-edit', tableRow)[0];
        if (query(".action-item-parent", tableRow)[0]) {
          domStyle.set(query(".action-item-parent", tableRow)[0], "width", "60px");
        }
        actionFieldColumn = query('.actions-td.simple-table-cell', tableRow);
        tableRow.tableFieldDiv = domConstruct.create("div", {
          'class': "action-item jimu-float-leading row-edit-div jimu-icon table-field-icon",
          title: this.nls.layersPage.layerSettingsTable.relationTip
        }, tableFieldRowtd);
        domConstruct.place(tableRow.tableFieldDiv, tdEdit, "after");
        this.own(on(tableRow.tableFieldDiv, 'click',
          lang.hitch(this, function () {
            //get row data for the current showing layer(Parent)
            var selectedRowData = this._layersTable.getRowData(tableRow);
            //first save the settings for current displayed layer/tables(Parent)
            this._getConfigForCurrentDisplayedLayers();
            //add bread crumb for current selected layer/table title
            this._addBreadCrumb(selectedRowData.label);
            //push current table/layers(Parent) id so that it can be used for bread crumbs
            this._currentTableIds.push(tableRow._layerId);
            //clear currently showing layers table
            //so that related layer/tables of the selected parent layer can be shown
            this._layersTable.clear();
            //show related layers & tables of the selected parent layer
            this._setLayersTable(relationshipInfo, true);
          })));
      },

      _addBreadCrumb: function (newTitle, isFirstLink) {
        var arrowIcon, selectedLayerTitle, contentWrapper, activeLinks;
        contentWrapper = domConstruct.create("div", {}, this.breadCrumbContainer);
        on(contentWrapper, "click", lang.hitch(this, function (evt) {
          this._onBreadCrumbSectionClick(contentWrapper, evt);
        }));
        //query all the title div and remove the active class
        activeLinks = query(".breadCrumbTitle", this.domNode);
        if (activeLinks && activeLinks.length > 0) {
          domClass.add(activeLinks[activeLinks.length - 1], "breadCrumbTitleActive");
        }
        //Check for the first link and accordingly add active class
        if (!isFirstLink) {
          arrowIcon = domConstruct.create("div", {
            "class": "nextArrowIcon"
          }, contentWrapper);
          domAttr.set(contentWrapper, "breadIndex", this._currentTableIds.length);
        } else {
          domAttr.set(contentWrapper, "breadIndex", -1);
        }
        //add selected layer/table name
        selectedLayerTitle = domConstruct.create("div", {
          "class": "breadCrumbTitle",
          "innerHTML": newTitle
        }, contentWrapper);
      },

      _onBreadCrumbSectionClick: function (contentWrapper, evt) {
        var index, breadCrumbLength, i, titleNode;
        titleNode = query(".breadCrumbTitle", contentWrapper)[0];
        //return if selected breadCrumb is not active
        if (!domClass.contains(titleNode, "breadCrumbTitleActive")) {
          return;
        }
        //take out the index of selected section and remove all right side bread crumb parts
        index = parseInt(domAttr.get(evt.currentTarget, "breadIndex"), 10);
        breadCrumbLength = query("div[breadIndex]").length;
        //remove active class
        domClass.remove(titleNode, "breadCrumbTitleActive");
        for (i = index + 1; i <= breadCrumbLength; i++) {
          domConstruct.destroy(query("div[breadIndex=" + i + "]")[0]);
        }
        //get the config info of the selected breadcrumb and display its table
        if (this._currentTableIds && this._currentTableIds.length > 0) {
          var currentConfig;
          currentConfig = this._configInfos;
          array.some(this._currentTableIds, function (layerId, layerIndex) {
            if (index + 1 === layerIndex) {
              return true;
            }
            array.some(currentConfig, function (info) {
              if (info.featureLayer.id === layerId) {
                currentConfig = info;
                return true;
              }
            });
            //if current table is not of all-layers and the index is not last then consider the next relations
            if (this._currentTableIds.length > 1 && layerIndex + 1 < this._currentTableIds.length) {
              currentConfig = currentConfig.relationshipInfos;
            }

          }, this);
          //first save the settings for current displayed layer/tables(Parent)
          this._getConfigForCurrentDisplayedLayers();
          //push current table/layers(Parent) id so that it can be used for bread crumbs
          this._currentTableIds.splice(index + 1, this._currentTableIds.length);
          //clear currently showing layers table
          //so that related layer/tables of the selected parent layer can be shown
          this._layersTable.clear();
          //show related layers & tables of the selected parent layer
          //Index -1 means 'show all layers' hence pass ieRelatedInfo (2nd parameter) as false
          this._setLayersTable(currentConfig, index === -1 ? false : true);
        }
      },

      _openServiceChooser: function (isGeocoderBtnClicked) {
        var contentDiv, prevConfiguredURL = "";
        //get prev configured url
        if (this._configuredGeocoderSettings && this._configuredGeocoderSettings.url) {
          prevConfiguredURL = this._configuredGeocoderSettings.url;
        }
        //create jimu geocoder services chooser instance
        this.serviceChooserContent = new _GeocodeServiceChooserContent({
          url: prevConfiguredURL
        });
        //create loading indicator for geocoder popup
        this.geocoderPopupShelter = new LoadingShelter({
          hidden: true
        });
        //create geocoder popup contents
        contentDiv = domConstruct.create("div");
        //add notes - update fields used form prev geocoder manually
        domConstruct.create("div", {
          "innerHTML": this.nls.geocoderPage.hintMsg,
          "style": { "font-size": "14px", "padding-bottom": "5px" }
        }, contentDiv);
        //add services chooser as a content
        contentDiv.appendChild(this.serviceChooserContent.domNode);
        //create a pop to choose url for geocoder
        this.geocoderPopup = new Popup({
          titleLabel: this.nls.geocoderPage.setGeocoderURL,
          autoHeight: true,
          content: contentDiv,
          container: window.jimuConfig.layoutId,
          width: 640
        });
        this.geocoderPopupShelter.placeAt(this.geocoderPopup.domNode);
        html.setStyle(this.serviceChooserContent.domNode, 'width', '580px');
        html.addClass(
          this.serviceChooserContent.domNode,
          'override-geocode-service-chooser-content'
        );
        //Handle events of geocoder service chooser
        this.serviceChooserContent.own(
          on(this.serviceChooserContent, 'validate-click', lang.hitch(this, function () {
            html.removeClass(
              this.serviceChooserContent.domNode,
              'override-geocode-service-chooser-content'
            );
          }))
        );
        this.serviceChooserContent.own(
          on(this.serviceChooserContent, 'ok', lang.hitch(this, function (evt) {
            this._onSelectLocatorUrlOk(evt, isGeocoderBtnClicked);
          })));
        this.serviceChooserContent.own(
          on(this.serviceChooserContent, 'cancel', lang.hitch(this, '_onSelectLocatorUrlCancel'))
        );
      },

      _showPresetDialog: function () {
        var presetAllFields = new PresetAllFields({
          nls: this.nls,
          configInfos: this._configInfos,
          _jimuLayerInfos: this._jimuLayerInfos,
          _configuredPresetInfos: this._configuredPresetInfos
        });
        this.own(on(presetAllFields, "PrestInfoUpdated", lang.hitch(this,
          function (configuredPresetInfos) {
            this._configuredPresetInfos = configuredPresetInfos;
          })));
      },
      _onSelectLocatorUrlOk: function (evt, isGeocoderBtnClicked) {
        if (!(evt && evt[0] && evt[0].url && this.domNode)) {
          return;
        }
        this.geocoderPopupShelter.show();
        esriRequest({
          url: evt[0].url,
          content: {
            f: 'json'
          },
          handleAs: 'json',
          callbackParamName: 'callback'
        }).then(lang.hitch(this, function (response) {
          this.geocoderPopupShelter.hide();
          if (response && response.candidateFields) {
            this._configuredGeocoderSettings.url = evt[0].url;
            this._configuredGeocoderSettings.fields = lang.clone(response.candidateFields);
            if (this.geocoderPopup) {
              this.geocoderPopup.close();
              this.geocoderPopup = null;
            }
            if (!isGeocoderBtnClicked) {
              this._editFields.geocoderConfigured();
            }
          } else {
            new Message({
              'message': this.nls.locatorWarning
            });
          }
        }), lang.hitch(this, function () {
          this.geocoderPopupShelter.hide();
          new Message({
            'message': esriLang.substitute({
              'URL': this._getRequestUrl(evt[0].url)
            }, lang.clone(this.nls.invalidUrlTip))
          });
        }));
      },

      _onSelectLocatorUrlCancel: function () {
        if (this.geocoderPopup) {
          this.geocoderPopup.close();
          this.geocoderPopup = null;
        }
      }
    });
  });