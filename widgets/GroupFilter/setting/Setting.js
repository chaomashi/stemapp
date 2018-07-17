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
  'jimu/BaseWidgetSetting',
  'dijit/_WidgetsInTemplateMixin',
  'jimu/dijit/SimpleTable',
  'dojo/dom',
  'dojo/dom-construct',
  'dojo/dom-class',
  'dojo/on',
  'dojo/query',
  'dojo/dom-attr',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dijit/form/Select',
  'dijit/form/TextBox',
  'dijit/form/ValidationTextBox',
  'dijit/form/CheckBox',
  'jimu/utils',
  'jimu/LayerInfos/LayerInfos',
  'jimu/dijit/Message',
  'jimu/dijit/Popup',
  'dojox/html/entities',
  '../LayersHandler',
  './presetValuePicker'
],
  function(declare, BaseWidgetSetting, _WidgetsInTemplateMixin, SimpleTable, dom, domConstruct,
    domClass, on, query, domAttr, lang, array, Select, TextBox, ValidationTextBox, CheckBox,
    utils, LayerInfos, Message, Popup, entities, LayersHandler, presetValuePicker) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {

      //these two properties is defined in the BaseWidget
      baseClass: 'jimu-widget-map-filter',

      groupCounter: 0,
      groupLayerContainer: [],
      groupLayerName: [],
      groupLayerDesc: [],
      groupLayerOperator: [],
      groupLayerDefault: [],
      //groupAppendSame: [],
      groupAppendSameConjunc: [],
      groupCaseSearch: [],
      layerCounter: 0,
      layerList: null,

      postMixInProperties: function() {
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
        this.nls = lang.mixin(this.nls, window.jimuNls.spatialFilterByFeatures);
      },

      postCreate: function() {
        this.inherited(arguments);
      },

      startup: function() {
        this.inherited(arguments);
        this.setConfig(this.config);
      },

      setConfig: function(config) {
        this.config = config;
        this.groupLayerContainer = [];
        this.groupLayerName = [];
        this.groupLayerDesc = [];
        this.groupLayerOperator = [];
        this.groupLayerDefault = [];
        //this.groupAppendSame = [];
        this.groupAppendSameConjunc = [];
        this.groupCaseSearch = [];
        this.chkSimpleMode.set('checked', this.config.simpleMode);
        this.chkOptionsMode.set('checked', this.config.optionsMode);
        this.chkWebmapAppendMode.set('checked', this.config.webmapAppendMode);
        this.slAppendChoice.set('value', this.config.slAppendChoice);
        this.chkZoomMode.set('checked', this.config.zoomMode);
        this.chkPersistOnClose.set('checked', this.config.persistOnClose);
        this.createMapLayerList();
      },

      getConfig: function() {
        if(this.layerList === null) {
          new Message({
            message : this.nls.errors.noLayers
          });
          return false;
        }
        else if(this.layerList.length > 0) {
          var validGroups = this.validateNoGroups();
          var validGroupsNames = this.validateNoGroupsName();
          var validDuplicates = this.validateDuplicateGroupsName();
          var validTables = this.validateTableRows();


          if(validGroups && validGroupsNames && validDuplicates && validTables) {
            this.config.simpleMode = this.chkSimpleMode.checked;
            this.config.optionsMode = this.chkOptionsMode.checked;
            this.config.webmapAppendMode = this.chkWebmapAppendMode.checked;
            this.config.slAppendChoice = this.slAppendChoice.get('value');
            this.config.zoomMode = this.chkZoomMode.checked;
            this.config.persistOnClose = this.chkPersistOnClose.checked;
            this.config.groups = [];
            array.forEach(this.groupLayerName, lang.hitch(this, function(groupName, i) {
              if(groupName !== null) {
                if(this.groupLayerContainer[i] !== null) {
                  var groupObj = {};
                  groupObj.name = utils.sanitizeHTML(groupName.value);
                  groupObj.desc = utils.sanitizeHTML(this.groupLayerDesc[i].value);
                  groupObj.operator = utils.sanitizeHTML(this.groupLayerOperator[i].value);
                  groupObj.defaultVal = utils.sanitizeHTML(this.groupLayerDefault[i].value);
                  groupObj.appendSameLayer = true;
                  groupObj.appendSameLayerConjunc = this.groupAppendSameConjunc[i].value;
                  groupObj.caseSearch = this.groupCaseSearch[i].get('checked');
                  groupObj.layers = [];

                  array.forEach(this.groupLayerContainer[i].getRows(), lang.hitch(this, function(row) {
                    var layerStruct = {};
                    var valueRadio = row.cells[2].childNodes[0];
                    //var zoomRadio = row.cells[3].childNodes[0];
                    layerStruct.layer = row.layerCol.value;
                    layerStruct.field = row.fieldCol.value;
                    layerStruct.dataType = row.dataTypeCol.attr('displayedValue');
                    if(valueRadio.checked) {
                      layerStruct.useDomain = valueRadio.checked;
                    } else {
                      layerStruct.useDomain = '';
                    }
                    /*
                    if(zoomRadio.checked) {
                      layerStruct.useZoom = zoomRadio.checked;
                    } else {
                      layerStruct.useZoom = '';
                    }*/
                    groupObj.layers.push(layerStruct);
                  }));
                  this.config.groups.push(groupObj);
                }
              }
            }));
            return this.config;
          } else {
            return false;
          }
        } else {
          new Message({
            message : this.nls.errors.noLayers
          });
          return false;
        }
      },

      createMapLayerList: function() {
        LayerInfos.getInstance(this.map, this.map.itemInfo)
          .then(lang.hitch(this, function(operLayerInfos) {
            if(operLayerInfos._layerInfos && operLayerInfos._layerInfos.length > 0) {
              var layerHandle =  new LayersHandler({
                "layers": operLayerInfos._layerInfos
              });
              this.own(on(layerHandle, "complete", lang.hitch(this, function(results) {
                this.layerList = results.data.items;
                if(this.config.groups.length > 0) {
                  array.forEach(this.config.groups, lang.hitch(this, function(group) {
                    this.createGroupBlock({group: group});
                  }));
                } else {
                  this.createGroupBlock({group: null});
                }
              })));
              this.own(on(layerHandle, "error", lang.hitch(this, function() {
                console.log("error");
              })));
              layerHandle.getAllMapLayers();


            }
          }));

      },

      createGroupBlock: function(pParam) {
        this.groupCounter++;

        var dsNode = domConstruct.create("div", {
          id: 'grpDiv_' + this.groupCounter,
          'class': 'group-block'
        });
        domConstruct.place(dsNode, this.layerMappingBlock);

        var groupSettingTable = domConstruct.create("table", {
          'class': 'group-setting-table'
        });
        domConstruct.place(groupSettingTable, dsNode);

        var rowName = groupSettingTable.insertRow(-1);
        var cellNameLabel = rowName.insertCell(0);
        domAttr.set(cellNameLabel, 'title', this.nls.labels.groupNameTip);
        var cellNameInput = rowName.insertCell(1);
        var cellDescLabel = rowName.insertCell(2);
        domAttr.set(cellDescLabel, 'title', this.nls.labels.groupDescTip);
        var cellDescInput = rowName.insertCell(3);
        var cellDelete = rowName.insertCell(4);

        var rowPreset = groupSettingTable.insertRow(-1);
        var cellOperatorLabel = rowPreset.insertCell(0);
        domAttr.set(cellOperatorLabel, 'title', this.nls.labels.groupOperatorTip);
        var cellOperatorInput = rowPreset.insertCell(1);
        var cellDefaultLabel = rowPreset.insertCell(2);
        domAttr.set(cellDefaultLabel, 'title', this.nls.labels.groupDefaultTip);
        var cellDefaultInput = rowPreset.insertCell(3);
        var cellSpacer = rowPreset.insertCell(4);

        var rowAppend = groupSettingTable.insertRow(-1);
        var cellSameLayerAppend = rowAppend.insertCell(0);
        domAttr.set(cellSameLayerAppend, "colspan", "3");
        var cellAppendConjun = rowAppend.insertCell(1);
        rowAppend.insertCell(2);
        domAttr.set(rowAppend, 'id', 'appendLayers_' + this.groupCounter);

        var rowCaseSearch = groupSettingTable.insertRow(-1);
        var cellCaseSearchLabel = rowCaseSearch.insertCell(0);
        domAttr.set(cellCaseSearchLabel, "colspan", "3");
        var cellCaseSearchRadio = rowCaseSearch.insertCell(1);
        rowCaseSearch.insertCell(2);
        domAttr.set(rowCaseSearch, 'id', 'caseSearch_' + this.groupCounter);

        cellNameLabel.innerHTML = this.nls.labels.groupName;
        cellDescLabel.innerHTML = this.nls.labels.groupDesc;
        cellOperatorLabel.innerHTML = this.nls.labels.groupOperator;
        cellDefaultLabel.innerHTML = this.nls.labels.groupDefault;
        cellSameLayerAppend.innerHTML = this.nls.labels.sameLayerAppend;
        cellCaseSearchLabel.innerHTML = this.nls.labels.caseSearch;
        //cellAppendUsing.innerHTML = this.nls.labels.sameLayerConjunc;

        var groupName = '';
        var groupDesc = '';
        var groupOper = '';
        var groupDef = '';
        var groupAppend = false;
        var groupAppendConjunc = '';
        var groupCaseSearch = false;
        if(typeof(pParam.group) !== 'undefined' && pParam.group !== null) {
          groupName = pParam.group.name;
          groupDesc = pParam.group.desc;
          groupOper = pParam.group.operator;
          groupDef = pParam.group.defaultVal;
          if(typeof(pParam.group.appendSameLayer) !== 'undefined') {
            groupAppend = pParam.group.appendSameLayer;
          }
          if(typeof(pParam.group.appendSameLayerConjunc) !== 'undefined') {
            groupAppendConjunc = pParam.group.appendSameLayerConjunc;
          }
          if(typeof(pParam.group.caseSearch) !== 'undefined') {
            groupCaseSearch = pParam.group.caseSearch;
          }
        }

        var txtGroupName = new ValidationTextBox({
          name: "txtGroupName",
          value: groupName,
          'class': 'groupName-textbox',
          placeHolder: this.nls.inputs.groupName,
          required: "true"
        });
        domConstruct.place(txtGroupName.domNode, cellNameInput);
        this.groupLayerName.push(txtGroupName);

        var txtGroupDesc = new TextBox({
          name: "txtGroupDesc",
          value: groupDesc,
          'class': 'groupName-Desctextbox',
          placeHolder: this.nls.inputs.groupDesc
        });
        domConstruct.place(txtGroupDesc.domNode, cellDescInput);
        this.groupLayerDesc.push(txtGroupDesc);

        var txtGroupDefault = new TextBox({
          name: "txtGroupDefault",
          value: groupDef,
          'class': 'groupName-Defaulttextbox',
          placeHolder: this.nls.inputs.groupDefault
        });
        domConstruct.place(txtGroupDefault.domNode, cellDefaultInput);
        this.groupLayerDefault.push(txtGroupDefault);

        var pickerNode = domConstruct.create("div", {
          'class': 'groupName-defaultPicker'
        });
        domConstruct.place(pickerNode, cellSpacer);
        this.own(on(pickerNode, "click", lang.hitch(this, function() {
          this.presetPickerPopup(txtGroupDefault);
        })));

        var deleteNameNode = domConstruct.create("div", {
          id: 'addGroupDelete_' + this.groupCounter,
          'class': 'group-block-delete'
        });
        var deleteAction = on(deleteNameNode, "click", lang.hitch(this, function() {
          deleteAction.remove();
          this.removeGroup(deleteNameNode.id);
        }));
        domConstruct.place(deleteNameNode, cellDelete);

        this.createOperatorSelection({cell:cellOperatorInput, value:groupOper});

        /*
        var chkAppendSame = new CheckBox({
          name: "chkAppendSame",
          value: '',
          checked: groupAppend
        });
        domConstruct.place(chkAppendSame.domNode, cellAppendInput);
        this.groupAppendSame.push(chkAppendSame);
        */

        this.createAppendConjunc({cell:cellAppendConjun, value:groupAppendConjunc});

        this.createCaseSearch({cell:cellCaseSearchRadio, value:groupCaseSearch});

        this.createTableObject(pParam);

        var addLayerNode = domConstruct.create("div", {
          id: 'addLyrDiv_' + this.groupCounter,
          'class': 'jimu-btn group-block-add-layer',
          title: this.nls.buttons.addLayerTip
        });
        this.own(on(addLayerNode, "click", lang.hitch(this, function() {
          this.addLayerRow(addLayerNode.id);
        })));
        domConstruct.place(addLayerNode, dom.byId('grpDiv_' + this.groupCounter));
        dom.byId('addLyrDiv_' + this.groupCounter).innerHTML = this.nls.buttons.addLayer;

      },

      createOperatorSelection: function(params) {
        var ObjList = [
          {'value': '', 'label': this.nls.inputs.optionNONE},
          {'value': '=', 'label': this.nls.inputs.optionEQUAL},
          {'value': '<>', 'label': this.nls.inputs.optionNOTEQUAL},
          {'value': '>', 'label': this.nls.inputs.optionGREATERTHAN},
          {'value': '>=', 'label': this.nls.inputs.optionGREATERTHANEQUAL},
          {'value': '<', 'label': this.nls.inputs.optionLESSTHAN},
          {'value': '<=', 'label': this.nls.inputs.optionLESSTHANEQUAL},
          {'value': 'START', 'label': this.nls.inputs.optionSTART},
          {'value': 'END', 'label': this.nls.inputs.optionEND},
          {'value': 'LIKE', 'label': this.nls.inputs.optionLIKE},
          {'value': 'NOT LIKE', 'label': this.nls.inputs.optionNOTLIKE},
          {'value': 'd<=', 'label': this.nls.inputs.optionONORBEFORE},
          {'value': 'd>=', 'label': this.nls.inputs.optionONORAFTER}
        ];
        var opSelect = new Select({
          options: ObjList,
          "class": "operator-select"
        }).placeAt(params.cell);
        opSelect.startup();
        opSelect.set('value', entities.decode(params.value));
        this.groupLayerOperator.push(opSelect);
      },

      createAppendConjunc: function(params) {
        var ObjList = [
          {'value': 'OR', 'label': this.nls.inputs.sameLayerAny},
          {'value': 'AND', 'label': this.nls.inputs.sameLayerAll}
        ];
        var opSelect = new Select({
          options: ObjList,
          "class": "operator-append-select"
        }).placeAt(params.cell);
        opSelect.startup();
        opSelect.set('value', entities.decode(params.value));
        this.groupAppendSameConjunc.push(opSelect);
      },

      createCaseSearch: function(params) {
        var opCkbx = new CheckBox({
          "class": "operator-append-select"
        }).placeAt(params.cell);
        opCkbx.startup();

        opCkbx.set('checked', params.value);
        this.groupCaseSearch.push(opCkbx);
      },

      createTableObject: function(pParam) {
        var fields = null;
        fields = [{
          name: "layerCol",
          title: this.nls.tables.layer,
          "class": "label",
          type: "empty",
          width: "375px"
        }, {
          name: "fieldCol",
          title: this.nls.tables.field,
          "class": "label",
          type: "empty",
          width: "350px"
        }, {
          name: "domainCol",
          title: this.nls.tables.value,
          "class": "label",
          type: "radio",
          width: "100px"
        }, /*{
          name: "zoomCol",
          title: this.nls.zoomTo,
          "class": "label",
          type: "radio",
          width: "150px"
        },*/ {
          name: "actions",
          title: this.nls.tables.action,
          type: "actions",
          actions: ["delete"],
          width: "100px"
        }, {
          name : 'dataTypeCol',
          type : 'empty',
          hidden : true,
          width : 0
        }];

        var args = {
          fields: fields,
          'class': 'layer-tables'
        };
        var layerTable = new SimpleTable(args);
        layerTable.placeAt(dom.byId('grpDiv_' + this.groupCounter));
        this.groupLayerContainer.push(layerTable);

        if(typeof(pParam.group) !== 'undefined' && pParam.group !== null) {
          array.forEach(pParam.group.layers, lang.hitch(this, function(layer) {
            this.addLayerRow(dom.byId('grpDiv_' + this.groupCounter).id, layer);
          }));
        } else {
          this.addLayerRow(dom.byId('grpDiv_' + this.groupCounter).id, pParam);
        }

        //this.createLayerSelection();
      },

      addLayerRow: function(pBlock, pParam) {
        var numPart = pBlock.substring(pBlock.indexOf('_') + 1);
        var result = this.groupLayerContainer[numPart - 1].addRow({});
        if (result.success && result.tr) {
          var tr = result.tr;
          this.createLayerSelection(tr, pParam, numPart);
          // if (domClass.contains(this.btnOk, 'jimu-state-disabled')) {
          //   html.removeClass(this.btnOk, 'jimu-state-disabled');
          // }
          var valueRadio = tr.cells[2].childNodes[0];
          var radioState = valueRadio.checked;
          this.own(on(valueRadio, "click", lang.hitch(this, function() {
            if(radioState) {
              valueRadio.checked = false;
              radioState = false;
            } else {
              valueRadio.checked = true;
              radioState = true;
            }
          })));

          /*
          var zoomRadio = tr.cells[3].childNodes[0];
          var zoomState = zoomRadio.checked;
          this.own(on(zoomRadio, "click", lang.hitch(this, function() {
            if(zoomState) {
              zoomRadio.checked = false;
              zoomState = false;
            } else {
              zoomRadio.checked = true;
              zoomState = true;
            }
          })));
          */
        }
      },

      createLayerSelection: function(tr, pParam, pCounter) {
        var ctlLayerList = [];
        array.forEach(this.layerList, lang.hitch(this, function(layer) {
          if(layer.children.length > 0) {
            array.forEach(layer.children, lang.hitch(this, function(child) {
              var lryObject = {};
              lryObject.value = child.id;
              lryObject.label = child.label;
              lryObject.selected = false;
              ctlLayerList.push(lryObject);
            }));
          } else {
            var lryObject = {};
            lryObject.value = layer.id;
            lryObject.label = layer.label;
            lryObject.selected = false;
            ctlLayerList.push(lryObject);
          }
        }));

        var td = query('.simple-table-cell', tr)[0];
        var lyrSelect;
        if (td) {
          lyrSelect = new Select({
            options: ctlLayerList
          }).placeAt(td);

          lyrSelect.startup();
          tr.layerCol = lyrSelect;
          this.own(on(lyrSelect, "change", lang.hitch(this, function(val) {
            //this.checkSameLayer(pCounter);
            this.createFieldSelection(val, tr, pParam, pCounter);
          })));

          if(typeof(pParam) !== 'undefined') {
            lyrSelect.set('value', pParam.layer);
          }

        }

        this.createFieldSelection(lyrSelect.value, tr, pParam, pCounter);

      },

      createFieldSelection: function(pLayer, pTR, pParam, pCounter) {
        var ctlfieldList = [];
        var ctlfieldDataType = [];
        var restricted = "esriFieldTypeBlob,esriFieldTypeOID";
        array.forEach(this.layerList, lang.hitch(this, function(layer) {
          if(layer.children.length > 0) {
            array.forEach(layer.children, lang.hitch(this, function(child) {
              if(child.id === pLayer) {
                array.forEach(child.children, lang.hitch(this, function(field) {
                  if(restricted.indexOf(field.fieldType) === -1) {
                    var fieldObject = {};
                    fieldObject.value = field.name;
                    fieldObject.label = field.label;
                    fieldObject.selected = false;
                    ctlfieldList.push(fieldObject);

                    var fieldDataType = {};
                    fieldDataType.value = field.name;
                    fieldDataType.label = field.fieldType;
                    fieldDataType.selected = false;
                    ctlfieldDataType.push(fieldDataType);
                  }
                }));
              }
            }));
          } else {
            if(layer.id === pLayer) {
              array.forEach(layer.layer.fields, lang.hitch(this, function(field) {
                if(restricted.indexOf(field.type) === -1) {
                  var fieldObject = {};
                  fieldObject.value = field.name;
                  if(field.alias === "") {
                    fieldObject.label = field.name;
                  } else {
                    fieldObject.label = field.alias;
                  }
                  fieldObject.selected = false;
                  ctlfieldList.push(fieldObject);

                  var fieldDataType = {};
                  fieldDataType.value = field.name;
                  fieldDataType.label = field.type;
                  fieldDataType.selected = false;
                  ctlfieldDataType.push(fieldDataType);
                }
              }));
            }
          }

        }));

        var td = query('.simple-table-cell', pTR)[1];
        var dataID = query('.simple-table-cell', pTR)[4];
        if (td) {
          domConstruct.empty(td);
          var fieldSelect = new Select({
            options: ctlfieldList
          }).placeAt(td);
          fieldSelect.startup();
          pTR.fieldCol = fieldSelect;

          domConstruct.empty(dataID);
          var dataTypeSelect = new Select({
            options: ctlfieldDataType
          }).placeAt(dataID);
          dataTypeSelect.startup();
          pTR.dataTypeCol = dataTypeSelect;

          this.own(on(fieldSelect, "change", lang.hitch(this, function(val) {
            this.resetRadio({layer: pLayer, field: val, row: pTR, param: pParam, counter: pCounter});
            this.dataTypeSync({layer: pLayer, field: val, row: pTR, param: pParam, select: dataTypeSelect});
          })));

          if(typeof(pParam) !== 'undefined') {
            this.resetRadio({layer: pLayer, row: pTR, param: pParam, counter: pCounter});
            fieldSelect.set('value', pParam.field);
            dataTypeSelect.set('value', pParam.field);
          }

        }
      },

      /*
      checkSameLayer: function(pCounter) {
        var dupeList = [];
        var dupeFlag = false;
        array.forEach(this.groupLayerContainer[pCounter - 1].getRows(), lang.hitch(this, function(row) {
          var layer = row.layerCol.value;
          if(dupeList.indexOf(layer) !== -1) {
            dupeFlag = true;
          } else {
            dupeList.push(layer);
          }

        }));
        if(dupeFlag)  {
          domStyle.set('appendLayers_' + pCounter, 'display', 'table-row');
        } else {
          domStyle.set('appendLayers_' + pCounter, 'display', 'none');
          var chkbkCell = dom.byId('appendLayers_' + pCounter).cells[1];
          var isDijit = registry.byNode(chkbkCell.childNodes[0]);
          isDijit.set('checked', false);
        }
      },
      */

      dataTypeSync: function(pParam) {
        var dtSelection = pParam.select;
        dtSelection.set('value', pParam.field);
      },

      resetRadio: function(pParam) {
        var row = pParam.row;
        var valueRadio = row.cells[2].childNodes[0];
        if(typeof(pParam.param) !== 'undefined') {
          if (pParam.param.hasOwnProperty("useDomain")) {
            if(pParam.param.useDomain !== "") {
              valueRadio.checked = true;
            } else {
              valueRadio.checked = false;
            }
          } else {
            valueRadio.checked = false;
          }
        }

        /*
        var zoomRadio = row.cells[3].childNodes[0];
        if(typeof(pParam.param) !== 'undefined') {
          if (pParam.param.hasOwnProperty("useZoom")) {
            if(pParam.param.useZoom !== "") {
              zoomRadio.checked = true;
            } else {
              zoomRadio.checked = false;
            }
          } else {
            zoomRadio.checked = false;
          }
        }
        */
      },


      validateNoGroups: function(){
        var validForm = false;
        var message = this.nls.errors.noGroups;
        array.forEach(this.groupLayerName, lang.hitch(this, function(groupName) {
          if(groupName !== null) {
            validForm = true;
          }
        }));
        if(!validForm) {
          new Message({
            message : message
          });
          return false;
        } else {
          return true;
        }
      },

      validateNoGroupsName: function(){
        var validForm = true;
        var message = this.nls.errors.noGroupName;
        array.forEach(this.groupLayerName, lang.hitch(this, function(groupName) {
          if(groupName !== null) {
            if(!groupName.get('value')) {
              validForm = false;
            }
          }
        }));
        if(validForm === false) {
          new Message({
            message : message
          });
        }
        return validForm;
      },

      validateDuplicateGroupsName: function(){
        var validForm = true;
        var message = this.nls.errors.noDuplicates;
        var names = [];
        array.forEach(this.groupLayerName, lang.hitch(this, function(groupName) {
          if(groupName !== null) {
            if(groupName.get('value')) {
              names.push(groupName.get('value'));
            }
          }
        }));
        // determine if the array contains duplicate values
        if(names.length > 1 && names.sort().filter(function(v, i, o){return v !== o[i - 1];}).length !== names.length) {
          validForm = false;
        }
        if(validForm === false) {
          new Message({
            message : message
          });
        }
        return validForm;
      },

      validateTableRows: function() {
        var validForm = true;
        array.forEach(this.groupLayerContainer, lang.hitch(this, function(group) {
          if(group !== null) {
            if((group.getRows()).length <= 0) {
              validForm = false;
            }
          }
        }));
        if(validForm === false) {
          new Message({
            message : this.nls.errors.noRows
          });
        }
        return validForm;
      },

      presetPickerPopup: function(pInput) {
        var valuePicker = new presetValuePicker({
          map: this.map,
          nls: this.nls,
          layerList: this.layerList
        });
        var filterPopup = new Popup({
          titleLabel : this.nls.popup.label,
          width : 500,
          height : 420,
          content : valuePicker,
          buttons : [{
            label : window.jimuNls.common.ok,
            onClick : lang.hitch(this, function() {
              var userInput = "";
              if(typeof valuePicker.valueParam !== "undefined") {
                if(valuePicker.valueParam.getFilterExpr() !== null) {
                  var valueProviders = valuePicker.valueParam.getValueProviders();
                  var firstValueProvider = valueProviders[0];
                  var valueObj = firstValueProvider.getValueObject();
                  if(valueObj){
                    userInput = valueObj.value;
                  }

                  pInput.set("value", userInput);
                }
              }
              filterPopup.close();
              filterPopup = null;
            })
          }, {
            label : window.jimuNls.common.cancel,
            classNames: ['jimu-btn-vacation']
          }]
        });
      },


      removeGroup: function(pBlock) {
        var numPart = pBlock.substring(pBlock.indexOf('_') + 1);
        this.groupLayerContainer[numPart - 1] = null;
        this.groupLayerName[numPart - 1] = null;
        this.groupLayerDesc[numPart - 1] = null;
        this.groupLayerOperator[numPart - 1] = null;
        this.groupLayerDefault[numPart - 1] = null;
        //this.groupAppendSame[numPart - 1] = null;
        this.groupAppendSameConjunc[numPart - 1] = null;
        //dijit.byId('addGroupName_' + numPart).destroyRecursive(true);
        //dijit.byId('addGroupDesc_' + numPart).destroyRecursive(true);
        domConstruct.destroy(dom.byId('addGroupDelete_' + numPart));
        domConstruct.destroy(dom.byId('addLyrDiv_' + numPart));
        domConstruct.destroy(dom.byId('grpDiv_' + numPart));
      }

    });
  });
