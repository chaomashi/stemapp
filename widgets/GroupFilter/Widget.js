define([
  'dojo/_base/declare',
  'dijit/_WidgetsInTemplateMixin',
  'jimu/BaseWidget',
  'dijit',
  'jimu/dijit/FilterParameters',
  'dojo/dom',
  'dojo/dom-construct',
  'dojo/dom-class',
  'dojo/dom-attr',
  'dojo/dom-style',
  'dojo/on',
  'dojo/query',
  'dojo/string',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/date/locale',
  'dijit/form/Select',
  'dijit/form/TextBox',
  'dijit/form/DateTextBox',
  'dijit/form/NumberTextBox',
  'dijit/registry',
  'jimu/LayerInfos/LayerInfos',
  'jimu/utils',
  'jimu/FilterManager',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'esri/geometry/geometryEngine',
  'esri/layers/FeatureLayer',
  './SaveJSON',
  './ReadJSON',
  './LayersHandler',
  'dojox/html/entities',
  'dijit/form/CheckBox'
],
function(declare, _WidgetsInTemplateMixin, BaseWidget, dijit, FilterParameters, dom,
  domConstruct, domClass, domAttr, domStyle, on, query, string, lang, array, locale, Select, TextBox,
  DateTextBox, NumberTextBox, registry, LayerInfos, utils, FilterManager, Query, QueryTask,
  geometryEngine, FeatureLayer, saveJson, readJson, LayersHandler, entities) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget, _WidgetsInTemplateMixin], {

    baseClass: 'jimu-widget-map-filter',

    layerList: null,
    msLayersDesc: null,
    grpSelect: null,
    groupCounter: 0,
    groupCurrVal: null,
    defaultDef: null,
    runTimeConfig: null,
    useDomain: null,
    useDate: null,
    useValue: null,
    useCaseSearch: null,
    runInitial: false,
    graphicsHolder: null,
    slAppendChoice: null,
    chkAppendToDef: null,
    persistOnClose: true,
    filterExt: null,
    isHosted: null,
    firstOpen: true,
    bypassActive: false,
    dayInMS: (24 * 60 * 60 * 1000) - 1000, // 1 sec less than 1 day

    postCreate: function() {
      this.inherited(arguments);
      this.defaultDef = [];
      this.graphicsHolder = [];
    },

    startup: function() {
      this.inherited(arguments);
      //this._setTheme();
      if(this.config.optionsMode) {
        domClass.add(this.optionsIcon, "hide-items");
      }

      if(this.config.groups[0].defaultVal !== "" && this.config.groups[0].operator !== "") {
        this.runInitial = true;
      }

      if(typeof(this.config.webmapAppendMode) !== 'undefined') {
        this.chkAppendToDef.checked = this.config.webmapAppendMode;
        this.slAppendChoice.value = this.config.slAppendChoice;
      }

      if(typeof(this.config.persistOnClose) !== 'undefined') {
        this.persistOnClose = this.config.persistOnClose;
        this.chkPersistDef.set('checked', this.persistOnClose);
      } else {
        //if key does not exist, take the default value of the wisget
        this.config.persistOnClose = this.persistOnClose;
        this.chkPersistDef.set('checked', this.persistOnClose);
      }

      this.createMapLayerList();

    },

    /*
    _setTheme: function () {
      if (this.appConfig.theme.name === "BoxTheme" ||
          this.appConfig.theme.name === "DartTheme") {
        utils.loadStyleLink('dartOverrideCSS', this.folderUrl + "/css/dartTheme.css", null);
      } else if (this.appConfig.theme.name === "LaunchpadTheme") {
        utils.loadStyleLink('luanchOverrideCSS', this.folderUrl + "/css/launchPadTheme.css", null);
      } else {

      }
    },
    */

    btnNewRowAction: function() {
      var defaultVal = this.checkDefaultValue(this.config.groups[0]);
      var defaultOp = this.checkDefaultOperator(this.config.groups[0]);
      this.createNewRow({operator:defaultOp, value:defaultVal, conjunc:"OR", state:"new"});
    },

    createMapLayerList: function() {
      LayerInfos.getInstance(this.map, this.map.itemInfo)
        .then(lang.hitch(this, function(operLayerInfos) {
          if(operLayerInfos._layerInfos && operLayerInfos._layerInfos.length > 0) {
            this.layerList = operLayerInfos._layerInfos;
            this._pullMapServiceFields(operLayerInfos._layerInfos);

            array.forEach(this.layerList, lang.hitch(this, function(layer) {
              if((layer.originOperLayer.layerType !== "ArcGISTiledMapServiceLayer" &&
                layer.originOperLayer.layerType !== "VectorTileLayer"
              ) &&
                typeof(layer.originOperLayer.featureCollection) === 'undefined') {

                //this.own(on(layer, "update-end", this.onLayerUpdate()));

                if(typeof(layer.layerObject._defnExpr) !== 'undefined') {
                  this.defaultDef.push({
                    layer: layer.id,
                    definition: layer.layerObject._defnExpr,
                    visible: layer.layerObject.visible
                  });
                }
                else if(typeof(layer.layerObject.defaultDefinitionExpression) !== 'undefined' &&
                  typeof(layer.layerObject.getDefinitionExpression()) === 'function' ) {
                  this.defaultDef.push({
                    layer: layer.id,
                    definition: layer.layerObject.getDefinitionExpression(),
                    visible: layer.layerObject.visible
                  });
                }
                else if(typeof(layer.layerObject.layerDefinitions) !== 'undefined') {
                  this.defaultDef.push({
                    layer: layer.id,
                    definition: layer.layerObject.layerDefinitions,
                    visible: layer._visible
                  });
                }
                else {
                  this.defaultDef.push({layer: layer.id, definition: "", visible: layer.layerObject.visible});
                }
              }

            }));
            //this.createGroupSelection();
          }
        }));
    },

    _pullMapServiceFields: function(pLayerInfos) {
      this.msLayersDesc = [];
      var layerHandle =  new LayersHandler({
        "layers": pLayerInfos
      });
      this.own(on(layerHandle, "complete", lang.hitch(this, function(results) {
        var layerInfos = results.data.items;
        array.forEach(layerInfos, lang.hitch(this, function(layer) {
          if(layer.children.length > 0) {
            this.msLayersDesc.push(layer);
          }
        }));
        this.createGroupSelection();
      })));
      this.own(on(layerHandle, "error", lang.hitch(this, function() {
        console.log("error");
      })));
      layerHandle.getAllMapLayers();
    },


    checkDomainUse: function(pParam) {
      this.useDomain = null;
      this.useValue = null;
      array.forEach(this.config.groups, lang.hitch(this, function(group) {
        if(group.name === pParam.group) {
          array.forEach(group.layers, lang.hitch(this, function(grpLayer) {
            array.forEach(this.layerList, lang.hitch(this, function(layer) {
              if(typeof(layer.newSubLayers) !== 'undefined') {
                if(layer.newSubLayers.length > 0) {
                  array.forEach(this.msLayersDesc, lang.hitch(this, function(msLayer) {
                    array.forEach(msLayer.children, lang.hitch(this, function(child) {
                      if(child.id === grpLayer.layer) {
                        array.forEach(child.children, lang.hitch(this, function(childField) {
                          if(childField.name === grpLayer.field) {
                            if(grpLayer.useDomain !== "") {
                              this.useValue = grpLayer.useDomain;
                            }
                          }
                        }));
                      }
                    }));
                  }));
                } else {
                  if(grpLayer.layer === layer.id) {
                    array.forEach(layer.layerObject.fields, lang.hitch(this, function(field) {
                      if(field.name === grpLayer.field) {
                        if(grpLayer.useDomain !== "") {
                          this.useValue = grpLayer.useDomain;
                          if(typeof(field.domain) !== 'undefined') {
                            this.useDomain = field.domain;
                          }
                        }
                      }
                    }));
                  }
                }
              }
            }));
          }));
        }
      }));
    },

    checkDateUse: function(pParam) {
      this.useDate = null;
      array.forEach(this.config.groups, lang.hitch(this, function(group) {
        if(group.name === pParam.group) {
          array.forEach(group.layers, lang.hitch(this, function(grpLayer) {
            array.forEach(this.layerList, lang.hitch(this, function(layer) {
              if(grpLayer.layer === layer.id) {
                array.forEach(layer.layerObject.fields, lang.hitch(this, function(field) {
                  if(field.name === grpLayer.field) {
                    if((field.type).indexOf("Date") >= 0) {
                      this.useDate = true;
                    }
                  }
                }));
              }
            }));
          }));
        }
      }));
    },

    checkCaseSearch: function(pParam) {
      this.useCaseSearch = null;
      array.forEach(this.config.groups, lang.hitch(this, function(group) {
        if(group.name === pParam.group) {
          this.useCaseSearch = group.caseSearch;
        }
      }));
    },

    checkIsHosted: function(pParam) {
      this.isHosted = false;
      if(utils.isHostedService(pParam.url)) {
        this.isHosted = true;
      }
    },

    createGroupSelection: function() {
      var ObjList = [];
      var descLabel = '';
      array.forEach(this.config.groups, lang.hitch(this, function(group) {
        var grpObj = {};
        grpObj.value = group.name;
        grpObj.label = group.name;
        grpObj.selected = false;
        ObjList.push(grpObj);
      }));

      domConstruct.empty("groupPicker");
      this.removeAllRows();
      this.grpSelect = new Select({
        options: ObjList
      }).placeAt(this.groupPicker);

      this.grpSelect.startup();
      this.own(on(this.grpSelect, "change", lang.hitch(this, function(val) {
        this.resetLayerDef({group: this.groupCurrVal});
        this.removeAllRows();
        this.checkDomainUse({group: val});
        this.checkDateUse({group: val});
        this.checkCaseSearch({group: val});
        this.reconstructRows(val);
        this.updateGroupDesc(val);
        this.groupCurrVal = val;
        setTimeout(lang.hitch(this, this.setFilterLayerDef), 1000);
      })));
      this.checkDomainUse({group: this.grpSelect.value});
      this.checkDateUse({group: this.grpSelect.value});
      this.checkCaseSearch({group: this.grpSelect.value});
      this.groupCurrVal = this.grpSelect.value;

      if(typeof(this.config.groups[0]) !== 'undefined') {
        descLabel = this.config.groups[0].desc;
        this.groupDesc.innerHTML = descLabel;
      }

      var defaultVal = this.checkDefaultValue(this.config.groups[0]);
      var defaultOp = this.checkDefaultOperator(this.config.groups[0]);
      this.createNewRow({operator:defaultOp, value:defaultVal, conjunc:"OR", state:"new"});
    },

    createNewRow: function(pValue) {
      var table = dom.byId("tblPredicates");

      var prevRowConjunTable;
      var prevRowConjunCell;

      if(pValue.state === "new") {
        if(table.rows.length > 1) {
          prevRowConjunTable = table.rows[(table.rows.length - 1)].cells[0].firstChild;
          prevRowConjunCell = prevRowConjunTable.rows[2].cells[0];
          this.createConditionSelection(prevRowConjunCell, pValue);
        } else {
          if(table.rows.length === 1) {
            prevRowConjunTable = table.rows[(table.rows.length - 1)].cells[0].firstChild;
            prevRowConjunCell = prevRowConjunTable.rows[2].cells[0];
            this.createConditionSelection(prevRowConjunCell, pValue);
          }
        }
      }

      var row = table.insertRow(-1);
      var subTableNode = row.insertCell(0);
      var deleteNode = row.insertCell(1);
      domClass.add(subTableNode, "criteriaCellSize");
      domClass.add(deleteNode, "deleteCellSize");

      var subTable = domConstruct.create("table", {border: "0", width: "100%"}, subTableNode);

      var rowOperator = subTable.insertRow(-1);
      var cell_operator = rowOperator.insertCell(0);

      var rowValue = subTable.insertRow(-1);
      var cell_value = rowValue.insertCell(0);

      var rowConjunc = subTable.insertRow(-1);
      var cell_conjunc = rowConjunc.insertCell(0);

      domStyle.set(cell_conjunc, {paddingLeft: "3px", paddingRight: "3px"});
      domClass.add(rowOperator, "operator-class");

      this.colorRows();

      this.createOperatorSelection(cell_operator, pValue);
      this.removeTableRow(deleteNode, row, table.rows.length);
      this.createInputFilter(cell_value, pValue);

      this.resize();

      //check simple mode
      if(this.config.simpleMode) {
        domClass.add(this.btnCriteria, "hide-items");
        domClass.add(rowOperator, "hide-items");
        query(".container").style("borderTop", "0px");
        domStyle.set(cell_value, {paddingLeft: "0px", paddingRight: "0px"});
      }

      if(pValue.state === "reload") {
        if(pValue.conjunc !== "") {
          prevRowConjunTable = table.rows[(table.rows.length - 1)].cells[0].firstChild;
          prevRowConjunCell = prevRowConjunTable.rows[2].cells[0];
          this.createConditionSelection(prevRowConjunCell, pValue);
        }
      } else {
        if(this.runInitial) {
          this.runInitial = false;
          setTimeout(lang.hitch(this, this.setFilterLayerDef), 1000);
        }
      }

    },

    colorRows: function() {
      var table = dom.byId("tblPredicates");
      var rows = table.rows;
      array.forEach(rows, function(row, i) {
        if(i % 2 === 0) {
          domClass.remove(row, "tableRow");

        } else {
          domClass.add(row, "tableRow");
        }
      });
    },

    createOperatorSelection: function(pCell, pValue) {
      var ObjList = [
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
        "class": "operatorSelect"
      }).placeAt(pCell);
      opSelect.startup();
      opSelect.set('value', entities.decode(pValue.operator));
      this.own(on(opSelect, "click", lang.hitch(this, function() {

      })));
      this.own(on(opSelect, "change", lang.hitch(this, function() {

      })));

    },

    createInputFilter: function(pCell, pValue) {
      domConstruct.empty(pCell);
      if(this.useDomain !== null) {
        if(typeof(this.useDomain.codedValues) !== 'undefined') {
          /*
          var ObjList = [];
          array.forEach(this.useDomain.codedValues, lang.hitch(this, function(codedVal) {
            ObjList.push({'value': codedVal.code, 'label': codedVal.name});
          }));
          var domainSelect = new Select({
            options: ObjList,
            "class": "userInputNormal"
          }).placeAt(pCell);
          domainSelect.startup();
          domainSelect.set('value', pValue.value);
          */
          var domainSelect = new FilterParameters();
          domainSelect.placeAt(pCell);
          domainSelect.startup();
          this.createValueList(pValue, domainSelect);
        } else {
          var defaultNum = "";
          if(pValue.value !== "") {
            defaultNum = Number(pValue.value);
          }
          var txtRange = new NumberTextBox({
            value: defaultNum,
            placeHolder: string.substitute(this.nls.inputs.textboxNumber, {
              0 : this.useDomain.minValue,
              1 : this.useDomain.maxValue
            }),
            "class": "userInputNormal",
            constraints: {min:this.useDomain.minValue, max:this.useDomain.maxValue}
          }).placeAt(pCell);
          txtRange.startup();
          this.formatSpacing(pCell);
        }
      } else if(this.useValue === true) {
        var paramsDijit = new FilterParameters();
        paramsDijit.placeAt(pCell);
        paramsDijit.startup();
        this.createValueList(pValue, paramsDijit);
      } else if(this.useDate === true) {
        var d;
        var defaultDate;
        if(pValue.value !== "") {
          d = new Date(pValue.value);
          defaultDate = locale.format(d, { selector: 'date', fullYear: true });
        }
        else {
          d = new Date();
          defaultDate = locale.format(d, { selector: 'date', fullYear: true });
        }
        var txtDate = new DateTextBox({
          value: defaultDate,
          placeHolder: defaultDate,
          "class": "userInputNormal"
        }).placeAt(pCell);
        txtDate.startup();
        txtDate.set("displayedValue",defaultDate);
        this.formatSpacing(pCell);
      } else {
        var txtFilterParam = new TextBox({
          value: pValue.value /* no or empty value! */,
          placeHolder: this.nls.inputs.textboxText,
          "class": "userInputNormal"
        }).placeAt(pCell);
        txtFilterParam.startup();
        this.formatSpacing(pCell);
      }
    },

    createValueList: function(pValue, pDijit) {
      var filter = {};
      var parts = [];
      var holder = "";
      array.forEach(this.config.groups, lang.hitch(this, function(group) {
        if(group.name === this.grpSelect.value) {
          array.forEach(group.layers, lang.hitch(this, function(grpLayer) {
            holder = "";
            array.forEach(this.layerList, lang.hitch(this, function(layer) {
              if(layer.newSubLayers.length > 0) {
                array.forEach(this.msLayersDesc, lang.hitch(this, function(msLayer) {
                  array.forEach(msLayer.children, lang.hitch(this, function(child) {
                    if(child.id === grpLayer.layer) {
                      if(holder !== child.id) {
                        if(grpLayer.useDomain === true) {
                          var newFL = new FeatureLayer(child.url);
                          this.own(on(newFL, "load", lang.hitch(this, function() {
                            this._callFilterDijit(grpLayer, pValue, child.url, newFL, parts, filter, pDijit);
                          })));
                        }
                      }
                      holder = child.id; //if same layer added x times with sublayers, only get the 1 instance.
                    }
                  }));
                }));
              } else {
                if(grpLayer.layer === layer.id) {
                  if(grpLayer.useDomain === true) {
                    this._callFilterDijit(grpLayer, pValue, layer.layerObject.url,
                      layer.layerObject, parts, filter, pDijit);
                  }
                }
              }
            }));
          }));
        }
      }));
    },

    _callFilterDijit: function(pGroupLayer, pValue, pUrl, pLayerObject, pParts, pFilter, pDijit) {
      var partsObj = {};
      partsObj.fieldObj = {};
      partsObj.fieldObj.name = pGroupLayer.field;
      partsObj.fieldObj.label = pGroupLayer.field;
      partsObj.fieldObj.shortType = ((pGroupLayer.dataType).replace("esriFieldType", "")).toLowerCase();
      if(partsObj.fieldObj.shortType !== "guid" || partsObj.fieldObj.shortType !== "globalid") {
        partsObj.fieldObj.shortType = "string";
      }
      if(partsObj.fieldObj.shortType !== "date" && partsObj.fieldObj.shortType !== "string") {
        partsObj.fieldObj.shortType = "number";
      }
      partsObj.fieldObj.type = pGroupLayer.dataType;
      partsObj.operator = partsObj.fieldObj.shortType + "OperatorIs";
      partsObj.valueObj = {};
      partsObj.valueObj.isValid = true;
      partsObj.valueObj.type = "unique";
      if((pGroupLayer.dataType).indexOf("Integer") > -1 || (pGroupLayer.dataType).indexOf("Double") > -1 ||
        (pGroupLayer.dataType).indexOf("Short") > -1) {
        if(this.useDomain) {
          partsObj.valueObj.value = Number(pValue.value);
        } else {
          partsObj.valueObj.value = pValue.value;
        }
      } else {
        partsObj.valueObj.value = pValue.value;
      }
      partsObj.interactiveObj = {};
      partsObj.interactiveObj.prompt = "";
      partsObj.interactiveObj.hint = "";
      partsObj.caseSensitive = false;
      pParts.push(partsObj);
      pFilter.logicalOperator = "OR";
      pFilter.expr = "";
      pFilter.parts = pParts;
      if(this.config.webmapAppendMode) {
        if(typeof(pLayerObject.id) !== null) {
          if(pLayerObject.id !== null) {
            pDijit.build(pUrl, pLayerObject, pFilter, pLayerObject.id);
          } else {
            var mapLayerId = pGroupLayer.layer.replace(/.([^.]*)$/,'_$1');
            pDijit.build(pUrl, pLayerObject, pFilter, mapLayerId);
          }
        }
      } else {
        if(typeof(pLayerObject.id) !== null) {
          if(pLayerObject.id !== null) {
            pDijit.build(pUrl, pLayerObject, pFilter, pLayerObject.id);
          } else {
            var mapLayerId = pGroupLayer.layer.replace(/.([^.]*)$/,'_$1');
            pDijit.build(pUrl, pLayerObject, pFilter, mapLayerId);
          }
        } else {
          pDijit.build(pUrl, pLayerObject, pFilter);
        }
      }

      var nodes = query(".jimu-single-filter-parameter");
      array.forEach(nodes, function(node) {
        var tableNode = query("table", node);
        array.forEach(tableNode, function(table) {
          domAttr.set(table, "cellpadding", "1");
          domAttr.set(table, "cellspacing", "1");
        });
        var hintNode = query("colgroup", node);
        if(hintNode.length > 0) {
          domAttr.set(hintNode[0].childNodes[1], "width", "0px");
        }
      });
    },


    formatSpacing: function(pCell) {
      domStyle.set(pCell, {paddingLeft: "2px", paddingRight: "2px"});
    },

    createConditionSelection: function(pCell, pValue) {
      domConstruct.empty(pCell);
      var ObjList = [
        {'value': 'OR', 'label': this.nls.inputs.optionOR},
        {'value': 'AND', 'label': this.nls.inputs.optionAND}
      ];
      var grpSelect = new Select({
        options: ObjList,
        "class": "conjuncSelect"
      }).placeAt(pCell);
      grpSelect.startup();
      grpSelect.set('value', pValue.conjunc);
    },

    removeTableRow: function(pCell, pRow, pCount) {
      if(pCount > 1) {
        var dsNode = domConstruct.create("div", {
          'class': 'deleteCell',
          innerHTML: ''
        });
        this.own(on(dsNode, 'click', lang.hitch(this, function() {
          domConstruct.destroy(pRow);
          var table = dom.byId("tblPredicates");
          if(table.rows.length >= 1) {
            var prevRowConjunTable = table.rows[(table.rows.length - 1)].cells[0].firstChild;
            var prevRowConjunCell = prevRowConjunTable.rows[2].cells[0];
            domConstruct.empty(prevRowConjunCell);
          }
          this.colorRows();
        })));
        domConstruct.place(dsNode, pCell);
      }
    },

    removeAllRows: function() {
      var table = dom.byId("tblPredicates");
      if(table.rows.length >= 1) {
        var subTable = table.rows[0].cells[0].firstChild;
        var isDijit = registry.byNode(subTable.rows[1].cells[0].childNodes[0]);
        if(typeof isDijit !== 'undefined') {
          dijit.byId(isDijit.id).destroyRecursive(true);
        }
        domConstruct.destroy(table.rows[0]);
        this.removeAllRows();
      }
    },

    reconstructRows: function(pValue) {
      if(pValue !== "") {
        array.forEach(this.config.groups, lang.hitch(this, function(group) {
          if (group.name === pValue) {
            var defaultVal = "";
            var defaultOp = "=";
            if(typeof(group.def) !== 'undefined') {
              if(group.def.length > 0) {
                array.forEach(group.def, lang.hitch(this, function(def) {
                  this.createNewRow({value: def.value, operator: def.operator, conjunc: def.conjunc, state:"reload"});
                }));
              } else {
                defaultVal = this.checkDefaultValue(group);
                defaultOp = this.checkDefaultOperator(group);

                this.createNewRow({operator:defaultOp, value:defaultVal, conjunc:"OR", state:"new"});
              }
            } else {
              defaultVal = this.checkDefaultValue(group);
              defaultOp = this.checkDefaultOperator(group);

              this.createNewRow({operator:defaultOp, value:defaultVal, conjunc:"OR", state:"new"});
            }
          }
        }));
      } else {
        this.createNewRow({operator:"=", value:"", conjunc:"OR", state:"new"});
      }
    },

    checkDefaultValue: function(pGroup) {
      var defaultVal = "";
      if(pGroup.defaultVal !== "") {
        defaultVal = pGroup.defaultVal;
      }
      return defaultVal;
    },

    checkDefaultOperator: function(pGroup) {
      var defaultOp = "=";
      if(pGroup.operator !== "") {
        defaultOp = pGroup.operator;
      }
      return defaultOp;
    },

    parseTable: function() {
      var sqlParams = [];
      var rows = dom.byId("tblPredicates").rows;
      array.forEach(rows, lang.hitch(this, function(row, i){
        if(i >= 0) {
          var subTable = row.cells[0].firstChild;
          var cell_operator = registry.byNode(subTable.rows[0].cells[0].childNodes[0]);
          var cell_value = registry.byNode(subTable.rows[1].cells[0].childNodes[0]);
          var cell_conjunc = {};
          if(typeof(subTable.rows[2].cells[0].childNodes[0]) !== 'undefined') {
            cell_conjunc = registry.byNode(subTable.rows[2].cells[0].childNodes[0]);
          } else {
            cell_conjunc.value = '';
          }
          var userInput = "";
          if(typeof cell_value.partsObj !== "undefined") {
            // if(cell_value.getFilterExpr() !== null) {
            //   userInput = cell_value.partsObj.parts[0].valueObj.value;
            // }
            var valueProviders = cell_value.getValueProviders();
            var firstValueProvider = valueProviders[0];
            var valueObj = firstValueProvider.getValueObject();
            if(valueObj){
              userInput = valueObj.value;
            }
          }
          else {
            userInput = cell_value.value;
          }

          //Edge browser hack to bypass the issue with X clearing in select boxes.
          var valueInput = query(".dijitReset.dijitInputInner", subTable.rows[1].cells[0].childNodes[0]);
          if (valueInput.length > 0) {
            if(valueInput[0].value === "") {
              userInput = "";
            }
          }
          //End Edge hack

          sqlParams.push({
            operator: cell_operator.value,
            userValue: userInput,
            conjunc: cell_conjunc.value
          });
        }
      }));
      return sqlParams;
    },


    formatDate: function(value){
      // see also parseDate()
      // to bypass the locale dependent connector character format date and time separately
      value = new Date(value);
      var s1 = locale.format(value, {
        datePattern: "yyyy-MM-dd",
        selector: "date"
      });
      var s2 = locale.format(value, {
        selector: "time",
        timePattern: "HH:mm:ss"
      });
      return s1 + " " + s2;

      /* contains comma '2013-03-01, 00:00:00' for locale 'en'
      return dojo.date.locale.format(value, {
        datePattern: "yyyy-MM-dd",
        timePattern: "HH:mm:ss"
      });
      */
    },

    addSecond: function(date) {
      var dt = new Date(date);
      return new Date(dt.setSeconds(59));
    },

    substractSecond: function(date) {
      var dt = new Date(date);
      dt.setSeconds(dt.getSeconds() - 1);
      return dt;
    },

    addDay: function(date){
      date = new Date(date);
      return new Date(date.getTime() + this.dayInMS);
    },

    subtractDay: function(date){
      date = new Date(date);
      return new Date(date.getTime() - this.dayInMS);
    },

    createQuery: function(isNum, field, op, value, junc, dataType, layer) {
      // escape all single quotes
      // decode sanitized input
      if(isNaN(value)) {
        value = entities.decode(value.replace(/'/g, "''"));
      }
      // special case of empty value
      if (value === '') {
        if(op === '<>' || op === 'NOT LIKE') {
          if(dataType.indexOf("Double") > -1 || dataType.indexOf("Single") > -1) {
            return [field, "IS NOT NULL", junc].join(" ") + " ";
          } else {
            return [field, "<> '' OR", field, "IS NOT NULL", junc].join(" ") + " ";
          }
        } else {
          if(dataType.indexOf("Double") > -1 || dataType.indexOf("Single") > -1) {
            return [field, "IS NULL", junc].join(" ") + " ";
          } else {
            return [field, "= '' OR", field, "IS NULL", junc].join(" ") + " ";
          }
        }
      }
      if (op === 'LIKE' || op === 'NOT LIKE') {
        if (isNum === false) {
          if(this.useCaseSearch){
            value = "'%" + value + "%'";
            field = field;
          } else {
            value = "UPPER('%" + value + "%')";
            field = "UPPER(" + field + ")";
          }
        } else {
          value = "'%" + value + "%'";
        }
      } else if (op === 'START') {
        op = 'LIKE';
        if (isNum === false) {
          if(this.useCaseSearch){
            value = "'" + value + "%'";
            field = field;
          } else {
            value = "UPPER('" + value + "%')";
            field = "UPPER(" + field + ")";
          }
        } else {
          value = value + "%";
        }
      } else if (op === 'END') {
        op = 'LIKE';
        if (isNum === false) {
          if(this.useCaseSearch){
            value = "'%" + value + "'";
            field = field;
          } else {
            value = "UPPER('%" + value + "')";
            field = "UPPER(" + field + ")";
          }
        } else {
          value = "%" + value;
        }
      } else if (isNum === false) { // wrap string fields if not already
        if(dataType.indexOf("Date") > -1) {
          if(typeof(layer.layerObject) !== 'undefined') {
            this.checkIsHosted(layer.layerObject);
          } else {
            this.checkIsHosted(layer);
          }
          // The date entry dijit only permits whole dates, so our value is at the beginning (00:00:00) of the
          // entered day. We'll make ranges as needed to cover times during the day.
          if(op === "=" || op === "<>") {
            if(op === "=") {
              op = "BETWEEN";
            } else {
              op = "NOT BETWEEN";
            }
            // Make a range from the beginning of the day to the last second of the day
            if(this.isHosted) {
              value = "'" + this.formatDate(value) + "' AND '" + this.formatDate(this.addDay(value)) + "'";
            } else {
              value = "timestamp '" + this.formatDate(this.substractSecond(value)) + "' AND timestamp '" + this.formatDate(this.addDay(value)) + "'";
            }
          } else if(op === ">") {
            // Move comparison to the last second of the day
            if(this.isHosted) {
              value = "'" + this.formatDate(this.addDay(value)) + "'";
            } else {
              value = "timestamp '" + this.formatDate(this.addDay(value)) + "'";
            }
          } else {
            // Trim flag from aliases of less than or equal and greater than or equal
            if (op === 'd<=' || op === 'd>=') {
              op = op.substr(1);
            }

            // Move comparison to the last second of the day
            if(op === "<=") {
              value = this.addDay(value);
            }

            if(this.isHosted) {
              value = "'" + this.formatDate(value) + "'";
            } else {
              value = "timestamp '" + this.formatDate(value) + "'";
            }
          }
        } else {
          if(this.useCaseSearch){
            value = "'" + value + "'";
            field = field;
          } else {
            value = "UPPER('" + value + "')";
            field = "UPPER(" + field + ")";
          }
        }
      } else {

      }

      return [field, op, value, junc].join(" ") + " ";
    },

    setFilterLayerDef: function() {
      this.filterExt = null;
      this.graphicsHolder = [];
      var sqlParams = this.parseTable();
      array.forEach(this.config.groups, lang.hitch(this, function(group) {
        if(this.grpSelect.value === group.name) {
          var w2wData = [];
          array.forEach(this.layerList, lang.hitch(this, function(layer) {
            //if(this.grpSelect.value === group.name) {
            var msExpr = [];
            //group.def = [];
            var expr = '';
            var layerHolder = '';
            var filterType = "";
            array.forEach(group.layers, lang.hitch(this, function(grpLayer, i) {
              if(typeof(group.appendSameLayer) !== 'undefined' && group.appendSameLayer === true) {
                if(layerHolder !== grpLayer.layer) {
                  if (expr !== "") {
                    this.setupFilterToApply(layer, filterType, expr, msExpr);
                    expr = '';
                  }
                } else {
                  if (layerHolder !== "") {
                    expr = expr + " " + group.appendSameLayerConjunc + " ";
                    if(expr === (" " + group.appendSameLayerConjunc + " ")) {
                      expr = '';
                    }
                  }
                }
              } else {
                expr = '';
              }
              //var expr = '';
              if(layer.id === grpLayer.layer) {
                group.def = [];
                filterType = "FeatureLayer";
                array.forEach(sqlParams, lang.hitch(this, function(p) {
                  array.forEach(layer.layerObject.fields, lang.hitch(this, function(field) {
                    if(field.name === grpLayer.field) {
                      if(((field.type).indexOf("Integer") > -1) || (field.type).indexOf("Double") > -1 ||
                        (field.type).indexOf("Single") > -1) {
                        //using modulus to check if it is Int or Float
                        var userVal = utils.sanitizeHTML(p.userValue);
                        if(isNaN(userVal) === false) {
                          if(utils.sanitizeHTML(p.userValue) % 1 !== 0) {
                            var numArray = userVal.split('.');
                            if(numArray[1].length > 6) {
                              numArray[1] = numArray[1].substring(0,6);
                              userVal = numArray[0] + "." + numArray[1];
                            }
                            if(p.operator === '=') {
                              p.operator = 'LIKE';
                            } else if(p.operator === '<>') {
                              p.operator = 'NOT LIKE';
                            } else {
                              //nothing, leave existing operator
                            }

                          }
                          expr = expr + this.createQuery(
                            true,
                            grpLayer.field,
                            p.operator,
                            userVal,
                            p.conjunc,
                            field.type,
                            layer
                          );
                        } else {
                          console.log("Not a Number");
                        }
                      }
                      else if ((field.type).indexOf("Date") > -1) {
                        if(p.userValue !== "") {
                          var newDate = new Date(utils.sanitizeHTML(p.userValue));
                          var format;
                          if((field.type).indexOf("Time") > -1) {
                            format = locale.format(newDate, { fullYear: true, datePattern: "yyyy-MM-dd, HH:mm:ss a" });
                          } else {
                            format = locale.format(newDate, { fullYear: true, datePattern: "yyyy-MM-dd" });
                          }
                          expr = expr + this.createQuery(
                            false,
                            grpLayer.field,
                            p.operator,
                            newDate,
                            //locale.format(newDate, { selector: 'date', fullYear: true }),
                            //locale.format(newDate, {datePattern: "MMMM d, yyyy", selector: "date"}),
                            p.conjunc,
                            field.type,
                            layer
                          );
                        }
                        else {
                          expr = expr + this.createQuery(
                            false,
                            grpLayer.field, p.operator,
                            utils.sanitizeHTML(p.userValue),
                            p.conjunc,
                            field.type,
                            layer
                          );
                        }
                      }
                      else {
                        expr = expr + this.createQuery(
                          false,
                          grpLayer.field,
                          p.operator,
                          utils.sanitizeHTML(p.userValue),
                          p.conjunc,
                          field.type,
                          layer
                        );
                      }
                      group.def.push({
                        field: grpLayer.field,
                        value: utils.sanitizeHTML(p.userValue),
                        operator: p.operator,
                        conjunc: p.conjunc
                      });
                      w2wData.push({
                        field: grpLayer.field,
                        value: utils.sanitizeHTML(p.userValue),
                        operator: p.operator,
                        conjunc: p.conjunc
                      });
                    }
                  }));
                }));
              }
              else if(grpLayer.layer.indexOf(layer.id) >= 0) {  //if it's a map service, sublayers .x is appended. so check if the root layerID is there
                group.def = [];
                filterType = "MapService";
                var msSubs = (grpLayer.layer).split(".");
                array.forEach(sqlParams, lang.hitch(this, function(p) {
                  if(p.userValue !== "") {
                    if(((grpLayer.dataType).indexOf("Integer") > -1) || (grpLayer.dataType).indexOf("Double") > -1) {
                      expr = expr + this.createQuery(
                        true,
                        grpLayer.field,
                        p.operator,
                        utils.sanitizeHTML(p.userValue),
                        p.conjunc,
                        grpLayer.dataType,
                        layer
                      );
                    }
                    else if ((grpLayer.dataType).indexOf("Date") > -1) {
                      if(p.userValue !== "") {
                        var newDate = new Date(utils.sanitizeHTML(p.userValue));
                        var format;
                        if((grpLayer.dataType).indexOf("Time") > -1) {
                          format = locale.format(newDate, { fullYear: true, datePattern: "yyyy-MM-dd, HH:mm:ss a" });
                        } else {
                          format = locale.format(newDate, { fullYear: true, datePattern: "yyyy-MM-dd" });
                        }
                        expr = expr + this.createQuery(
                          false,
                          grpLayer.field,
                          p.operator,
                          format,
                          //locale.format(newDate, { selector: 'date', fullYear: true }),
                          //locale.format(newDate, {datePattern: "MMMM d, yyyy", selector: "date"}),
                          p.conjunc,
                          grpLayer.dataType,
                          layer
                        );
                      } else {
                        expr = expr + this.createQuery(
                          false,
                          grpLayer.field,
                          p.operator,
                          utils.sanitizeHTML(p.userValue),
                          p.conjunc,
                          grpLayer.dataType,
                          layer
                        );
                      }
                    }
                    else {
                      expr = expr + this.createQuery(
                        false,
                        grpLayer.field,
                        p.operator,
                        utils.sanitizeHTML(p.userValue),
                        p.conjunc,
                        grpLayer.dataType,
                        layer
                      );
                    }
                    group.def.push({
                      field: grpLayer.field,
                      value: utils.sanitizeHTML(p.userValue),
                      operator: p.operator,
                      conjunc: p.conjunc});
                    w2wData.push({
                      field: grpLayer.field,
                      value: utils.sanitizeHTML(p.userValue),
                      operator: p.operator,
                      conjunc: p.conjunc});
                  }
                  else {
                    expr = expr + this.createQuery(
                      false,
                      grpLayer.field,
                      p.operator,
                      utils.sanitizeHTML(p.userValue),
                      p.conjunc,
                      grpLayer.dataType,
                      layer
                    );
                    group.def.push({
                      field: grpLayer.field,
                      value: utils.sanitizeHTML(p.userValue),
                      operator: p.operator,
                      conjunc: p.conjunc});
                    w2wData.push({
                      field: grpLayer.field,
                      value: utils.sanitizeHTML(p.userValue),
                      operator: p.operator,
                      conjunc: p.conjunc});
                  }
                }));
                if(expr !== "") {
                  msExpr[msSubs[1]] = expr.trim();
                }
              }
              else {

              }

              layerHolder = grpLayer.layer;
              if(typeof(group.appendSameLayer) !== 'undefined' && group.appendSameLayer === false) {
                this.setupFilterToApply(layer, filterType, expr, msExpr);
              } else {
                if(i === (group.layers.length - 1)) {
                  this.setupFilterToApply(layer, filterType, expr, msExpr);
                }
              }

            }));

          }));
          if(typeof(w2wData) !== 'undefined' && w2wData.length > 0) {
            this._publishData(w2wData);
          }
        }
      }));

    },

    setupFilterToApply: function(layer, filterType, expr, msExpr) {
      //if(expr !== "" || msExpr.length > 0) {
      if(filterType === "FeatureLayer") {
        if(expr !== "") {
          /*
          if(this.chkAppendToDef.checked) {
            array.forEach(this.defaultDef, lang.hitch(this, function(def) {
              if(def.layer === layer.id ) {
                var compositeDef = "(" + def.definition + ") "  + this.slAppendChoice.value +  " " + expr.trim();
                // layer.layerObject.setDefinitionExpression(compositeDef);
                this._applyFilter(layer.layerObject, compositeDef, zoomOnFilter);
              }
            }));
          }
          else {
          */
          // layer.layerObject.setDefinitionExpression(expr.trim());
          this._applyFilter(layer.layerObject, expr.trim(), false);
          //}
          //layer.layerObject.setVisibility(true);
        }
      } else if(filterType === "MapService") {
        if(msExpr.length > 0) {
          if(this.chkAppendToDef.checked) {
            array.forEach(this.defaultDef, lang.hitch(this, function(def) {
              if(def.layer === layer.id ) {
                for(slot in msExpr) {
                  for(var key in def.definition) {
                    if(slot === key) {
                      msExpr[slot] = "(" + def.definition[key] + ") "  +
                      this.slAppendChoice.value +  " " + expr;
                    } else {
                      if(msExpr[slot] === "") {
                        msExpr[slot] = expr;
                      }
                    }
                  }
                }
                layer.layerObject.setLayerDefinitions(msExpr);
                this._zoomOnFilter(layer.layerObject);
              }
            }));
          } else {
            var temp = layer;
            layer.layerObject.setLayerDefinitions(msExpr);
            this._zoomOnFilter(layer.layerObject);
          }
          //layer.layerObject.setVisibility(true);
        }
      } else {
        //do nothing, not a valid service
      }
      //}


    },
    resetLayerDef: function(pParam) {
      if(typeof(pParam.group) === 'undefined') {
        pParam.group = this.grpSelect.value;
      }
      array.forEach(this.config.groups, lang.hitch(this, function(group) {
        if(group.name === pParam.group) {
          array.forEach(group.layers, lang.hitch(this, function(grpLayer) {
            array.forEach(this.layerList, lang.hitch(this, function(layer) {
                array.forEach(this.defaultDef, lang.hitch(this, function(def) {
                  if(def.layer === layer.id ) {
                    if(typeof(layer.layerObject.defaultDefinitionExpression) !== 'undefined'){
                      // layer.layerObject.setDefinitionExpression(def.definition);

                      this._applyFilter(layer.layerObject, def.definition, true);
                    }
                    else if(typeof(layer.layerObject.layerDefinitions) !== 'undefined') {
                      //layer.layerObject.setDefaultLayerDefinitions();
                      layer.layerObject.setLayerDefinitions(def.definition);
                    }
                    else {
                      // layer.layerObject.setDefinitionExpression(def.definition);

                      this._applyFilter(layer.layerObject, def.definition, true);
                    }

                    layer.layerObject.setVisibility(def.visible);
                    //this.defaultDef.push({layer: layer.id, definition: layer.layerObject.defaultDefinitionExpression});
                  }
                }));

            }));
          }));
        }
      }));
    },

    updateGroupDesc: function(pParam) {
      array.forEach(this.config.groups, lang.hitch(this, function(group) {
        if(group.name === pParam) {
          this.groupDesc.innerHTML = group.desc;
        }
      }));
    },

    //START: saving/reading functions
    toggleSaveFilter: function() {
      var containerNode;
      var saveNode = query(".saveTD");
      if(saveNode.length > 0) {
        containerNode = query(".container");
        if(containerNode.length > 0) {
          domClass.replace(dom.byId("saveTD"), "saveTDClose", "saveTD");
          containerNode.style("display", "none");
          query(".saveContainer").style("display", "block");
          query(".groupContainer").style("display", "none");
          query(".buttonContainer").style("display", "none");
        }
      } else {
        var basicNode = query(".saveTDClose");
        if(basicNode.length > 0) {
          domClass.replace(basicNode[0], "saveTD", "saveTDClose");
          containerNode = query(".container");
          if(containerNode.length > 0) {
            domClass.replace(dom.byId("saveTD"), "saveTD", "saveTDClose");
            containerNode.style("display", "block");
            query(".saveContainer").style("display", "none");
            query(".groupContainer").style("display", "block");
            query(".buttonContainer").style("display", "block");
            domClass.replace("refreshDiv", "refresh-icon", "refresh-done-icon");
          }
        }
      }
    },

    saveJsonToFile: function() {
      var saveDef = new saveJson({
        "config" : this.config
      });
      this.own(on(saveDef, "complete", lang.hitch(this, function() {
        console.log("save done");
      })));
      saveDef.exportsJson(this.nls.files.jsonFile + ".json", this.config);
    },

    readJsonToConfig: function() {
      query(".loadProgressHeader").style("display", "block");
      query(".loadProgressShow").style("display", "block");

      var readDef =  new readJson({
        "config": this.config,
        "jsonFile": this.jsonFileInput.files
      });
      this.own(on(readDef, "complete", lang.hitch(this, function(results) {
        this.config = JSON.parse(results.UserSettings);
        this.resetLayerDef({group: this.grpSelect.value});
        this.removeAllRows();
        this.checkDomainUse({group: this.grpSelect.value});
        this.checkDateUse({group: this.grpSelect.value});
        this.reconstructRows(this.grpSelect.value);
        this.updateGroupDesc(this.grpSelect.value);
        setTimeout(lang.hitch(this, this.setFilterLayerDef), 1000);
        query(".loadProgressHeader").style("display", "none");
        query(".loadProgressShow").style("display", "none");
        this.jsonFileInput.value = null;
        this.toggleSaveFilter();
      })));
      this.own(on(readDef, "error", lang.hitch(this, function() {
        this.jsonFileInput.value = null;
        query(".loadProgressHeader").style("display", "none");
        query(".loadProgressShow").style("display", "none");
      })));
      readDef.checkFileReader();
      return true;
    },
    //END: saving/reading functions

    //BEGIN: W2W communication
    _publishData: function(pValue) {
      var fieldList = [];
      var valueList = [];
      array.forEach(pValue, lang.hitch(this, function(val) {
        if(fieldList.indexOf(val.field) === -1) {
          fieldList.push(val.field);
        }
        if(valueList.indexOf(val.value) === -1) {
          valueList.push(val.value);
        }
      }));
      this.publishData({
        message: {fields: fieldList, values: valueList}
      });

    },
    //END: W2W communication

    resize: function() {
      var node = query(".jimu-single-filter-parameter");
      if(node.length > 0) {
        array.forEach(node, lang.hitch(this, function(domEl) {
          var hintNode = query("colgroup", domEl);
          if(hintNode.length > 0) {
            domAttr.set(hintNode[0].childNodes[1], "width", "0px");
          }
        }));
      }
      if(window.innerWidth <= 320) {
        //if it's small form factor, auto switch to simple mode
        domClass.add(this.btnCriteria, "hide-items");
        query(".operator-class").style("display", "none");
        query(".container").style("borderTop", "0px");
        query(".value-class").style("paddingTop", "-10px");
      } else {
        if(!this.config.simpleMode) {
          domClass.remove(this.btnCriteria, "hide-items");
          query(".operator-class").style("display", "block");
          query(".container").style("borderTop", "3px solid");
          query(".value-class").style("paddingTop", "0px");
        }
      }
    },

    _applyFilter: function(layer, exp, destory){
      var howAppend = false;
      if(this.slAppendChoice.value === "AND") {
        howAppend = true;
      }
      FilterManager.getInstance().applyWidgetFilter(layer.id, this.id, exp, this.chkAppendToDef.checked, howAppend);
      if(!destory) {
        this._zoomOnFilter(layer);
      }
    },

    _zoomOnFilter: function(layer) {
      if(this.config.zoomMode) {
        if(typeof(layer.layerDefinitions) !== "undefined" && layer.layerDefinitions.length > 0) {
          //map services
          var zoomEvt = on(this.map, "update-end", lang.hitch(this, function() {
            var query = new Query();
            query.outFields = [ "*" ];
            for (var key in layer.layerDefinitions) {
              if (layer.layerDefinitions.hasOwnProperty(key)) {
                var url = layer.url + "/" + key;
                query.where = layer.layerDefinitions[key];
                query.returnGeometry = true;
                query.outSpatialReference = this.map.spatialReference;
                var qryTask = new QueryTask(url);
                qryTask.executeForExtent(query, lang.hitch(this, this._queryExtentToZoom));
              }
            }
            zoomEvt.remove();
          }));
        } else {
          //var zoomEvt = on(layer, "update-end", lang.hitch(this, function() {
          var query = new Query();
          query.outFields = [ "*" ];
          if(layer.type === "ArcGISImageServiceLayer") {
            var url = layer.url;
            query.where = layer.getDefinitionExpression();
            query.returnGeometry = true;
            query.outSpatialReference = this.map.spatialReference;
            var qryTask = new QueryTask(url);
            qryTask.executeForExtent(query, lang.hitch(this, this._queryExtentToZoom));
          } else {
            //feature layer query
            layer.queryExtent(query, lang.hitch(this, this._queryExtentToZoom));
          }
          //zoomEvt.remove();
          //}));
          /*
          layer.queryFeatures(query, lang.hitch(this, function(featureSet) {
            if(featureSet.features.length > 0) {
              var newExtent = graphicsUtils.graphicsExtent(featureSet.features);
              if(featureSet.features.length === 1) {
                newExtent = (geometryEngine.geodesicBuffer(newExtent, 100, 9002, false)).getExtent();
              }
              this.map.setExtent(newExtent);
            }
          }));
          */
        }

      }
    },

    _queryExtentToZoom: function(results) {
      if(typeof(results.extent) !== 'undefined' && results.extent !== null) {
        var newExt;
        if(results.extent.spatialReference.wkid !== 102100 &&
          results.extent.spatialReference.wkid !== 102113 &&
          results.extent.spatialReference.wkid !== 3857 &&
          results.extent.spatialReference.wkid !== 4326
        ) {
          newExt = (geometryEngine.buffer(results.extent, 10, 9002, false)).getExtent();
        } else {
          newExt = (geometryEngine.geodesicBuffer(results.extent, 10, 9002, false)).getExtent();
        }
        if(this.filterExt === null) {
          this.filterExt = newExt;
        }
        var newMaxX = ((this.filterExt.xmax > newExt.xmax) ? this.filterExt.xmax : newExt.xmax);
        var newMinX = ((this.filterExt.xmin < newExt.xmin) ? this.filterExt.xmin : newExt.xmin);
        var newMaxY = ((this.filterExt.ymax > newExt.ymax) ? this.filterExt.ymax : newExt.ymax);
        var newMinY = ((this.filterExt.ymin < newExt.ymin) ? this.filterExt.ymin : newExt.ymin);
        newExt = newExt.update(newMinX, newMinY, newMaxX, newMaxY, newExt.spatialReference);
        if(results.extent.spatialReference.wkid !== 102100 &&
          results.extent.spatialReference.wkid !== 102113 &&
          results.extent.spatialReference.wkid !== 3857 &&
          results.extent.spatialReference.wkid !== 4326
        ) {
          newExt = (geometryEngine.buffer(newExt, 200, 9002, false)).getExtent();
        } else {
          newExt = (geometryEngine.geodesicBuffer(newExt, 200, 9002, false)).getExtent();
        }
        this.filterExt = newExt;
        this.map.setExtent(newExt);
      }
    },

    refreshData: function() {
      this.onLayerUpdate();
      domClass.replace("refreshDiv", "refresh-done-icon", "refresh-icon");
    },

    onLayerUpdate: function() {
      if(this.grpSelect) {
        this.removeAllRows();
        this.reconstructRows(this.grpSelect.value);
      }
    },

    onOpen: function(){
      if(!this.firstOpen) {
        this.bypassActive = true;
        this.onLayerUpdate();
      }
    },

    onActive: function(){
      if(!this.firstOpen) {
        if(!this.bypassActive) {
          this.onLayerUpdate();
        }
      }
    },

    onDeActive: function() {
      this.bypassActive = false;
    },

    onClose: function(){
      if(!this.chkPersistDef.checked) {
        this.resetLayerDef({group: this.grpSelect.value});
        this.removeAllRows();
        this.reconstructRows(this.grpSelect.value);
      }
      this.firstOpen = false;
      this.bypassActive = false;
    },

    onMinimize: function(){
      //console.log('onMinimize');
    },

    onMaximize: function(){
      //console.log('onMaximize');
    },

    onSignIn: function(credential){
      /* jshint unused:false*/
      //console.log('onSignIn');
    },

    onSignOut: function(){
      //console.log('onSignOut');
    }
  });
});