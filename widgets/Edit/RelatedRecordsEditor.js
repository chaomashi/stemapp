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
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  'dojo/_base/html',
  'dojo/on',
  'dojo/Deferred',
  'dojo/query',
  "./utils",
  "dijit/form/Button",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetBase",
  'esri/undoManager',
  'esri/OperationBase',
  'esri/graphic',
  "esri/tasks/query",
  "esri/tasks/QueryTask",
  'esri/tasks/RelationshipQuery',
  'esri/layers/FeatureLayer',
  "esri/dijit/AttributeInspector",
  "esri/dijit/Popup",
  'esri/dijit/PopupTemplate',
  'jimu/portalUrlUtils',
  'jimu/SelectionManager',
  'jimu/ConfigManager',
  'jimu/dijit/DropdownMenu',
  'jimu/dijit/LoadingIndicator',
  'jimu/LayerInfos/LayerInfos'
],
function (declare, lang, array, html, on, Deferred, domQuery, editUtils, Button,
  _TemplatedMixin, _WidgetBase, UndoManager, operationBase, Graphic,
  Query, QueryTask, RelationshipQuery, FeatureLayer, AttributeInspector, Popup,
  PopupTemplate, portalUrlUtils, SelectionManager, ConfigManager, DropdownMenu, LoadingIndicator, jimuLayerInfos) {
  var Clazz = declare([_WidgetBase, _TemplatedMixin], {
    baseClass: "related-records-editor",
    //templateString: template,
    templateString: "<div>" +
                      "<div class='operation-box' data-dojo-attach-point='operationBox'>" +
                        "<div class='previos-btn feature-action' data-dojo-attach-point='previouBtn'" +
                            "data-dojo-attach-event='click:_onPreviouBtnClick'>" +
                        "</div>" +
                        "<div class='operation-title' data-dojo-attach-point='operationTitle'></div>" +
                        "<div class='add-new-btn' data-dojo-attach-point='addNewBtn'></div>" +
                      "</div>" +
                      "<div class='content-box' data-dojo-attach-point='contentBox'></div>" +
                    "</div>",
    editorATI: null,
    originalFeature: null,
    originalLayer: null,
    originalJimuLayerInfo: null,
    layerInfosObj: null,
    undoManager: null,
    refDomNode: null,
    _temporaryData: null,
    tableInfosParam: null,

    postCreate: function () {
      // init
      this._init();
      // place domNode
      html.place(this.domNode, this.refDomNode, "after");
      if(window.isRTL) {
        html.addClass(this.previouBtn, 'icon-arrow-forward');
      } else {
        html.addClass(this.previouBtn, 'icon-arrow-back');
      }

      // create loading indicator
      this.loading = new LoadingIndicator({
        hidden: true
      }).placeAt(this.domNode);

      //  show first page
      this._clearPage();
      this.showFirstPage({
        feature: this.originalFeature,
        oriJimuLayerInfo:  this.originalJimuLayerInfo
      });
    },

    _init: function() {
      this.refDomNode = this.editorATI.domNode;
      this.originalLayer = this.originalFeature.getLayer();
      this.layerInfosObj = jimuLayerInfos.getInstanceSync();
      this.originalJimuLayerInfo = this.layerInfosObj.getLayerOrTableInfoById(this.originalLayer.id);
      this.undoManager = new UndoManager();
      this._temporaryData = {
        eventHandles: [],
        dijits: []
      };
      this._tempPopup = new Popup({/*titleInBody: false*/}, html.create('div'));
      this._tempPopup.show();
    },

    destroy: function() {
      this._clearPage();
      this._tempPopup.destroy();
      this.inherited(arguments);
    },

    /***************************
     * Methods for prepare data
     **************************/
    _getRelatedTableInfoArray: function(oriJimuLayerInfo) {
      var def = new Deferred();
      var relatedTableInfoArray = [];
      oriJimuLayerInfo.getRelatedTableInfoArray("esriRelRoleOrigin")
      .then(lang.hitch(this, function(layerInfoArray) {
        array.forEach(layerInfoArray, function(layerInfo) {
          if(this._findTableInfoFromTableInfosParam(layerInfo)) {
            relatedTableInfoArray.push(layerInfo);
          }
        }, this);
        def.resolve(relatedTableInfoArray);
      }));
      return def;
    },

    _getRelatedRecordsByQuery: function(operationData) {
      var def = new Deferred();
      var query = new Query();
      var queryTask = new QueryTask(operationData.destJimuLayerInfo.getUrl());
      var relatedKeyField = operationData.destJimuLayerInfo.layerObject.relationships.keyField;
      var oriLayerObjectIdField = operationData.oriJimuLayerInfo.layerObject.objectIdField;
      if(relatedKeyField) {
        query.where = relatedKeyField + " = " +
                      operationData.feature.attributes[relatedKeyField];
      } else {
        query.where =  oriLayerObjectIdField + " = " +
                       operationData.feature.attributes[oriLayerObjectIdField];
      }
      //query.outSpatialReference = ?
      query.outFields = ["*"];
      queryTask.execute(query, lang.hitch(this, function(relatedRecords) {
        def.resolve(relatedRecords);
      }));
      return def;
    },

    _getRelatedRecordsByRelatedQuery: function(operationData) {
      var def = new Deferred();
      var relatedQuery = new RelationshipQuery();
      var queryRelationship = this._getOriRelationshipByDestLayer(operationData);
      // todo...
      relatedQuery.outFields = ["*"];
      relatedQuery.relationshipId = queryRelationship.id;
      var objectId =
        operationData.feature.attributes[operationData.oriJimuLayerInfo.layerObject.objectIdField];
      relatedQuery.objectIds = [objectId];

      operationData.oriJimuLayerInfo.layerObject.queryRelatedFeatures(
        relatedQuery,
        lang.hitch(this, function(relatedRecords) {
          var features = relatedRecords[objectId] && relatedRecords[objectId].features;
          if(features) {
            def.resolve(features);
          } else {
            def.resolve([]);
          }
        }), lang.hitch(this, function() {
          def.resolve([]);
        })
      );

      return def;
    },

    _getOriRelationshipByDestLayer: function(operationData) {
      var queryRelationship = null;
      // compatible with arcgis service 10.0.
      array.some(operationData.oriJimuLayerInfo.layerObject.relationships, function(relationship) {
        if (relationship.relatedTableId === operationData.destJimuLayerInfo.layerObject.layerId) {//************
          queryRelationship = relationship;
          return true;
        }
      }, this);
      return queryRelationship;
    },


    _getDestRelationshipByDestLayer: function(operationData) {
      var destRelationship = null;
      // compatible with arcgis service 10.0.
      array.some(operationData.destJimuLayerInfo.layerObject.relationships, function(relationship) {
        if (relationship.relatedTableId === operationData.oriJimuLayerInfo.layerObject.layerId) {
          destRelationship = relationship;
          return true;
        }
      }, this);
      return destRelationship;
    },

    _createATI: function(operationData) {
      var handle;
      var relatedJimuLayerInfo = operationData.destJimuLayerInfo;
      var attributeInspector = null;
      // find tableInfo
      var tableInfoResult =  this._findTableInfoFromTableInfosParam(relatedJimuLayerInfo);
      if(tableInfoResult) {
        attributeInspector = new Clazz.ATI({
          layerInfos: [tableInfoResult],
          hideNavButtons: true
        }, html.create("div"));
        attributeInspector.startup();
        this._temporaryData.dijits.push(attributeInspector);
      }



      // bindEvent
      if(this._editWidget._configEditor.usingSaveButton) {
        var saveButton = attributeInspector.addButton(this.nls.save,"save-button related-record disable", "after");
        handle = on(saveButton, 'click', lang.hitch(this, this._onSaveBtnClick, operationData, attributeInspector));
        this._temporaryData.eventHandles.push(handle);
      }

      var closeButton = attributeInspector.addButton(this.nls.close, "close-button related-record", "before");
      handle = on(closeButton, 'click', lang.hitch(this, this._onCloseBtnClick));
      this._temporaryData.eventHandles.push(handle);

      handle = on(attributeInspector, 'delete', lang.hitch(this, this._onDeleteBtnClick, operationData));
      this._temporaryData.eventHandles.push(handle);
      handle = on(attributeInspector, 'attribute-change', lang.hitch(this, this._onAttributeChange, operationData));
      this._temporaryData.eventHandles.push(handle);

      return attributeInspector;
    },

    _findTableInfoFromTableInfosParam: function(jimuLayerInfo) {
      var tableInfoResult = null;
      array.some(this.tableInfosParam, function(tableInfo) {
        if(tableInfo.featureLayer.id === jimuLayerInfo.id) {
          tableInfoResult = tableInfo;
          return true;
        }
      }, this);
      return tableInfoResult;
    },

    _keepReferentialIntegrity: function(operationData) {
      var oriRelationship = this._getOriRelationshipByDestLayer(operationData);
      var destRelationship = this._getDestRelationshipByDestLayer(operationData);
      var oriKeyField, destKeyField;
      var integrityField = {
        key: "",
        value: "",
        hasRelationshipTable: false,
        originKeyFieldInRelationshipTable: "",
        originValueInRelationshipTable: "",
        destKeyFieldInRelationshipTable: "",
        destValueInRelationshipTable: ""
      };

      if(oriRelationship.keyField && destRelationship && destRelationship.keyField) {
        oriKeyField = editUtils.ignoreCaseToGetFieldKey(operationData.oriJimuLayerInfo.layerObject,
                                                            oriRelationship.keyField);
        destKeyField = editUtils.ignoreCaseToGetFieldKey(operationData.destJimuLayerInfo.layerObject,
                                                            destRelationship.keyField);
        if(oriKeyField && destKeyField) {
          //attr[destKeyField] = operationData.feature.attributes[oriKeyField];
          /*
          integrityField = {
            key: destKeyField,
            value: operationData.feature.attributes[oriKeyField]
          };
          */
          integrityField.key = destKeyField;
          integrityField.value = operationData.feature.attributes[oriKeyField];
        }
      } else if (oriRelationship.keyField) {
        // destRelattionship does not exist.
        oriKeyField = editUtils.ignoreCaseToGetFieldKey(operationData.oriJimuLayerInfo.layerObject,
                                                            oriRelationship.keyField);
        if(oriKeyField) {
          //attr[oriKeyField] = operationData.feature.attributes[oriKeyField];
          /*
          integrityField = {
            key: oriKeyField,
            value: operationData.feature.attributes[oriKeyField]
          };
          */
          integrityField.key = oriKeyField;
          integrityField.value = operationData.feature.attributes[oriKeyField];
        }
      }

      if(oriRelationship &&
         oriRelationship.relationshipTableId != null && // jshint ignore:line
         destRelationship &&
         destRelationship.relationshipTableId != null) { // jshint ignore:line
        integrityField.hasRelationshipTable = true;

        integrityField.originKeyFieldInRelationshipTable = oriRelationship.keyFieldInRelationshipTable;
        //editUtils.ignoreCaseToGetFieldKey(operationData.oriJimuLayerInfo.layerObject,
        //                                                    oriRelationship.keyFieldInRelationshipTable);

        integrityField.destKeyFieldInRelationshipTable = destRelationship.keyFieldInRelationshipTable;
        //editUtils.ignoreCaseToGetFieldKey(operationData.destJimuLayerInfo.layerObject,
        //                                                    destRelationship.keyFieldInRelationshipTable);

        integrityField.originValueInRelationshipTable =
          operationData.feature.attributes[oriKeyField];

        if(operationData.relatedFeature) {
          integrityField.destValueInRelationshipTable =
            operationData.relatedFeature.attributes[destKeyField || oriKeyField];
        }
      }
      return integrityField;
    },

    _prepareNewRelatedRecord: function(operationData) {
      var newRelatedRecordTemplate = this._getTemplateFromLayerObject(operationData.destJimuLayerInfo.layerObject);
      var attr = lang.mixin({}, (newRelatedRecordTemplate ? newRelatedRecordTemplate.prototype.attributes : {}));
      // // set current date/time for Date field
      // array.forEach(layerObject.fields, function(field) {
      //   if(field.type === "esriFieldTypeDate") {
      //     var dateObj = new Date();
      //     attr[field.name] = dateObj.valueOf();
      //   }
      // }, this);

      // keep referential integrity.
      var integrityField = this._keepReferentialIntegrity(operationData);
      if(!integrityField.hasRelationshipTable) {
        attr[integrityField.key] = integrityField.value;
      }
      var newRelatedRecord = new Graphic(null, null, attr, null);
      return newRelatedRecord;
    },

    _prepareNewRelationshipRecord: function(operationData, newRelatedRecord) {
      var newRelationshipRecord = null;
      var attr = {};
      // keep referential integrity.
      var integrityField = this._keepReferentialIntegrity(this._createOperationData(operationData.feature,
                               operationData.oriJimuLayerInfo,
                               operationData.destJimuLayerInfo,
                               newRelatedRecord));
      if(integrityField.hasRelationshipTable) {
        attr[integrityField.originKeyFieldInRelationshipTable] = integrityField.originValueInRelationshipTable;
        attr[integrityField.destKeyFieldInRelationshipTable] = integrityField.destValueInRelationshipTable;
        newRelationshipRecord = new Graphic(null, null, attr, null);
      }

      return newRelationshipRecord;
    },

    _prepareRelationshipTableInfo: function(operationData) {
      var oriRelationship = this._getOriRelationshipByDestLayer(operationData);
      var relationshipTableId = oriRelationship.relationshipTableId;
      var relationshipTableInfo = null;
      if(relationshipTableId == null) { // jshint ignore:line
        return null;
      }

      var layerObject = operationData.oriJimuLayerInfo.layerObject;
      var index = layerObject.url.lastIndexOf('/');
      var serverUrl = layerObject.url.slice(0, index);
      var url = serverUrl + '/' + relationshipTableId.toString();

      array.some(this.tableInfosParam, function(tableInfoPara) {
        if(lang.getObject("featureLayer.url", false, tableInfoPara) &&
           (portalUrlUtils.removeProtocol(url.toString().toLowerCase()).replace(/\/+/g, '/') ===
           portalUrlUtils.removeProtocol(
                         tableInfoPara.featureLayer.url.toString().toLowerCase()).replace(/\/+/g, '/'))
        ) {
          relationshipTableInfo = this.layerInfosObj.getLayerOrTableInfoById(tableInfoPara.featureLayer.id);
          return true;
        }
      }, this);

      return relationshipTableInfo;
    },

    _addNewRelationshipReocrd: function(newRelatedRecord, operationData) {
      var retDef = new Deferred();
      var relationshipTableInfo = null;
      var newRelationshipRecord = this._prepareNewRelationshipRecord(operationData, newRelatedRecord);
      if(newRelationshipRecord) {
        relationshipTableInfo = this._prepareRelationshipTableInfo(operationData);
      }
      if(relationshipTableInfo && relationshipTableInfo.layerObject) {
        relationshipTableInfo.layerObject.applyEdits([newRelationshipRecord], null, null,
                                                     lang.hitch(this, function() {
          retDef.resolve();
        }), lang.hitch(this, function() {
          console.warn("Failed to add relationship record.");
          retDef.resolve();
        }));
      } else {
        retDef.resolve();
      }
      return retDef;
    },

    _addNewRelatedRecord: function(newRelatedRecordPara, operationData) {
      var retDef = new Deferred();
      var layerObject = operationData.destJimuLayerInfo.layerObject;

      // add to related table
      layerObject.applyEdits([newRelatedRecordPara], null, null, lang.hitch(this, function(evt) {
        var addedResult = evt[0];
        if(addedResult.success && addedResult.objectId) {
          var query = new Query();
          var queryTask = new QueryTask(layerObject.url);
          var objectIdField = layerObject.objectIdField;
          query.where = objectIdField + " = " + addedResult.objectId;
          query.outFields = ["*"];
          queryTask.execute(query, lang.hitch(this, function(resultFeatureSet) {
            var newRelatedRecord = resultFeatureSet.features[0];
            /*
            if(newRelatedRecord) {
              retDef.resolve(newRelatedRecord);
            } else {
              // This is a guarantee for cannot find newRelatedRecord,
              // newRelatedRecordPara does not have complete attribtes,
              // this result cannot continue to add relatedRecord by related table chain.
              newRelatedRecordPara.attributes[layerObject.objectIdField] = addedResult.objectId;
              retDef.resolve(newRelatedRecordPara);
            }
            */

            // This is a guarantee for cannot find newRelatedRecord,
            // newRelatedRecordPara does not have complete attribtes,
            // this result cannot continue to add relatedRecord by related table chain.
            if(!newRelatedRecord) {
              newRelatedRecordPara.attributes[layerObject.objectIdField] = addedResult.objectId;
              newRelatedRecord = newRelatedRecordPara;
            }

            this._addNewRelationshipReocrd(newRelatedRecord, operationData).then(lang.hitch(this, function() {
              retDef.resolve(newRelatedRecord);
            }));

          }), lang.hitch(this, function() {
            retDef.reject();
          }));
        } else {
          retDef.reject();
        }
      }), lang.hitch(this, function() {
        retDef.reject();
      }));
      return retDef;
    },

    _deleteRelatedRecord: function(operationData) {
      var retDef = new Deferred();
      var relatedLayerObject = operationData.destJimuLayerInfo.layerObject;
      relatedLayerObject.applyEdits(null,
                                    null,
                                    [operationData.relatedFeature],
                                    lang.hitch(this, function() {
        retDef.resolve();
      }), lang.hitch(this, function() {
        retDef.reject();
      }));
      return retDef;
    },

    _updateRelatedRecordOnSave: function(operationData) {
      this.loading.show();
      this._updateRelatedRecord(operationData).then(lang.hitch(this, function(){
        this.loading.hide();
      }), lang.hitch(this, function() {
        this.loading.hide();
      }));
    },

    _updateRelatedRecordOnClient: function(operationData, attributeChangeEvt) {
      this._editWidget._startEditingSession();
      operationData.relatedFeature.attributes[attributeChangeEvt.fieldName] = attributeChangeEvt.fieldValue;
      // update current selectedFeature of ATI.
      var attributeInspector = attributeChangeEvt.target;
      if(attributeInspector && attributeInspector.updateCurrentSelectdFeature) {
        attributeInspector.updateCurrentSelectdFeature([operationData.relatedFeature],
                                                       operationData.destJimuLayerInfo.layerObject,
                                                       attributeChangeEvt.fieldName,
                                                       attributeChangeEvt.fieldValue);
      }
    },

    _updateRelatedRecordDirectly: function(operationData, attributeChangeEvt) {
      this.loading.show();
      operationData.relatedFeature.attributes[attributeChangeEvt.fieldName] = attributeChangeEvt.fieldValue;
      this._updateRelatedRecord(operationData).then(lang.hitch(this, function(){
        this.loading.hide();

        // update current selectedFeature of ATI.
        var attributeInspector = attributeChangeEvt.target;
        if(attributeInspector && attributeInspector.updateCurrentSelectdFeature) {
          attributeInspector.updateCurrentSelectdFeature([operationData.relatedFeature],
                                                         operationData.destJimuLayerInfo.layerObject,
                                                         attributeChangeEvt.fieldName,
                                                         attributeChangeEvt.fieldValue);
        }

      }), lang.hitch(this, function() {
        this.loading.hide();
      }));
    },

    _updateRelatedRecord: function(operationData) {
      var retDef = new Deferred();
      var relatedLayerObject = operationData.destJimuLayerInfo.layerObject;
      relatedLayerObject.applyEdits(null,
                                    [operationData.relatedFeature],
                                    null,
                                    lang.hitch(this, function() {
        retDef.resolve();
      }), lang.hitch(this, function() {
        retDef.reject();
      }));

      return retDef;
    },

    /*
    _updateRelatedRecord: function(operationData, attributeChangeEvt) {
      var retDef = new Deferred();
      var relatedLayerObject = operationData.destJimuLayerInfo.layerObject;
      var relatedFeature = operationData.relatedFeature;
      relatedFeature.attributes[attributeChangeEvt.fieldName] = attributeChangeEvt.fieldValue;
      relatedLayerObject.applyEdits(null,
                                    [relatedFeature],
                                    null,
                                    lang.hitch(this, function() {

        // update current selectedFeature of ATI.
        if(attributeChangeEvt.target &&
           attributeChangeEvt.target._selection &&
           attributeChangeEvt.target._selection[0]) {
          var selectedFeature = attributeChangeEvt.target._selection[0];
          selectedFeature.attributes[attributeChangeEvt.fieldName] = attributeChangeEvt.fieldValue;

          if(attributeChangeEvt.fieldName === relatedLayerObject.typeIdField) {
            relatedLayerObject.ownershipBasedAccessControlForFeatures = true;
            attributeChangeEvt.target.refresh();
            relatedLayerObject.ownershipBasedAccessControlForFeatures = false;
          }
        }
        retDef.resolve();
      }), lang.hitch(this, function() {
        retDef.reject();
      }));

      return retDef;
    },
    */

    /*
    _getDisplayTitleOfRelatedRecord: function(relatedLayerInfo, relatedRecord, displayFieldKey) {
      var displayTitle;
      var popupInfoTemplate = relatedLayerInfo.getInfoTemplate();
      if(displayFieldKey === "popupTitle" && popupInfoTemplate) {
        if(typeof popupInfoTemplate.title === "function") {
          displayTitle = popupInfoTemplate.title(relatedRecord);
        } else {
          displayTitle = popupInfoTemplate.title;
        }
      } else {
        displayTitle = editUtils.getAttrByFieldKey(relatedRecord, displayFieldKey);
      }

      if(displayTitle) {
        var displayFieldObject =
            editUtils.ignoreCaseToGetFieldObject(relatedLayerInfo.layerObject, displayFieldKey);
        if(displayFieldObject &&
           displayFieldObject.type &&
           displayFieldObject.type === "esriFieldTypeDate") {
          displayTitle = editUtils.getLocaleDateTime(displayTitle);
        }
        //todo... supports coded value
      } else {
        displayTitle = "";
      }

      return displayTitle;
    },
    */
    _getDisplayTitleOfRelatedRecord: function(relatedLayerInfo, relatedRecord, displayFieldKey) {
      var displayTitle;
      var popupInfoTemplate = relatedLayerInfo.getInfoTemplate();
      if(displayFieldKey === "popupTitle" && popupInfoTemplate) {
        if(typeof popupInfoTemplate.title === "function") {
          displayTitle = popupInfoTemplate.title(relatedRecord);
        } else {
          displayTitle = popupInfoTemplate.title;
        }
      } else {
        displayTitle = this._getDisplayTitleFromPopup(relatedLayerInfo, relatedRecord, displayFieldKey);
      }

      return displayTitle ? displayTitle : "";
    },

    _getDisplayTitleFromPopup: function(relatedLayerInfo, relatedRecord, displayFieldKey) {
      var displayTitle;
      var popupTemplate = this._getPopupTemplateWithOnlyDisplayField(relatedLayerInfo, displayFieldKey);
      if(popupTemplate) {
        //temporary set infoTemplate to relatedRecord.
        relatedRecord.setInfoTemplate(popupTemplate);
        this._tempPopup.setFeatures([relatedRecord]);
        var attrValueTdDomNode = domQuery("td.attrValue", this._tempPopup.domNode)[0];
        //var attrValueTdDomNode = domQuery(".esriViewPopup", this._tempPopup.domNode)[0];
        displayTitle = attrValueTdDomNode && attrValueTdDomNode.innerHTML;
        // clear infoTemplate for relatedRecord;
        relatedRecord.setInfoTemplate(null);
      } else {
        displayTitle = editUtils.getAttrByFieldKey(relatedRecord, displayFieldKey);
      }
      return displayTitle;
    },

    _getPopupTemplateWithOnlyDisplayField: function(relatedLayerInfo, displayFieldKey) {
      var popupInfo = relatedLayerInfo._getCustomPopupInfo(relatedLayerInfo.layerObject, [displayFieldKey]);
      var popupTemplate = new PopupTemplate(popupInfo);
      return popupTemplate;
    },

    _getTemplateFromLayerObject: function(layerObject) {
      // return null means that Edit cannot add the feature to RT.
      var template = null;
      if(layerObject.templates && layerObject.templates[0]) {
        template = layerObject.templates[0];
      } else if(layerObject.types && layerObject.types[0] && layerObject.types[0].templates[0]) {
        template = layerObject.types[0].templates[0];
      }
      return template;
    },

    /*************************
     * Methods for operations
     *************************/
    showRelatedRecords: function(operationData) {
      this._changeRefDomNode();
      // set operation title
      var destLayerObject = operationData.destJimuLayerInfo.layerObject;
      var relatedLayerName =
        lang.getObject('_wabProperties.originalLayerName', false, destLayerObject) ||
        operationData.destJimuLayerInfo.title;
      this._setOperationTitle(relatedLayerName);

      this._clearPage();
      this.loading.show();
      this._getRelatedRecordsByRelatedQuery(operationData)
      .then(lang.hitch(this, function(relatedRecords) {
        // show add new button
        this._showAddNewBtn(operationData);
        // show title
        if(relatedRecords.length > 0) {
          this._setTitle(window.jimuNls.popup.relatedRecords);
        } else {
          this._setTitle(window.jimuNls.popup.noRelatedRecotds, 'font-normal');
        }

        // show fieldSelector
        var displayFieldName = this._showFieldSelector(operationData.destJimuLayerInfo);

        // show related records
        array.forEach(relatedRecords, function(relatedRecord, index) {
          // Working around for a bug of queryRelatedFeatures.
          relatedRecord._layer = operationData.destJimuLayerInfo.layerObject;

          var displayTitle = this._getDisplayTitleOfRelatedRecord(operationData.destJimuLayerInfo,
                                                                  relatedRecord,
                                                                  displayFieldName);

          var backgroundClass = (index % 2 === 0) ? 'oddLine' : 'evenLine';
          var recordItem = html.create('div', {
            'class': 'item record-item ' + backgroundClass,
            innerHTML: displayTitle
          }, this.contentBox);
          recordItem.relatedRecord = relatedRecord;

          var handle = on(recordItem, 'click', lang.hitch(this, function() {
            this._addOperation(Clazz.OPERATION_SHOW_RELATED_RECORDS, operationData);
            // show inspector
            this.showInspector(this._createOperationData(operationData.feature,
                               operationData.oriJimuLayerInfo,
                               operationData.destJimuLayerInfo,
                               relatedRecord));
          }));
          this._temporaryData.eventHandles.push(handle);
        }, this);

        this.loading.hide();
      }));
    },

    showInspector: function(operationData) {
      var disableRelatedTable = false;
      this._changeRefDomNode();
      // set operation title
      var destLayerObject = operationData.destJimuLayerInfo.layerObject;
      var relatedLayerName =
        lang.getObject('_wabProperties.originalLayerName', false, destLayerObject) ||
        operationData.destJimuLayerInfo.title;

      var relatedsListDisplayFieldName =
        lang.getObject("_wabProperties.popupInfo.displayFieldOfRelatedRecordList", false, destLayerObject);

      var operationTitle = this._getDisplayTitleOfRelatedRecord(operationData.destJimuLayerInfo,
                                                                operationData.relatedFeature,
                                                                relatedsListDisplayFieldName);

      if(relatedsListDisplayFieldName !== "popupTitle") {
        operationTitle = relatedLayerName + ": " + operationTitle;
      }

      this._setOperationTitle(operationTitle);

      // clear page
      this._clearPage();

      // create ATI for relatedLayer
      var attributeInspector = this._createATI(operationData);
      if(attributeInspector) {
        html.place(attributeInspector.domNode, this.contentBox);
      }
      // edit related feature
      // related feature is correspond to operationData.destJimuLayerInfo
      var objectIdField = operationData.destJimuLayerInfo.layerObject.objectIdField;
      var objectId = operationData.relatedFeature.attributes[objectIdField];

      if(objectId === null || objectId === undefined) {
        // show inspector for creating a new related record
        attributeInspector.showFeature(operationData.relatedFeature, operationData.destJimuLayerInfo.layerObject);
        // disable relatedTable lines until the new relatedRecord has been applied.
        disableRelatedTable = true;
        // gray delete button
        domQuery(".atiButton.atiDeleteButton", attributeInspector.domNode).addClass("disable");
        // enter editing session when first add a new related record
        this._editWidget._startEditingSession();
        // disable attachment
      } else {
        // show inspector for editing an related record that exist already.
        this.loading.show();
        var tableQuery = new Query();
        tableQuery.where = objectIdField + " = " + objectId;
        operationData.destJimuLayerInfo.layerObject.selectFeatures(tableQuery,
                                                                   FeatureLayer.SELECTION_NEW,
                                                                   lang.hitch(this, function() {
          this.loading.hide();
          var selectedFeatues = operationData.destJimuLayerInfo.layerObject.getSelectedFeatures();
          if(selectedFeatues && selectedFeatues[0] && selectedFeatues[0].geometry) {
            this._activeGraphicEdit(selectedFeatues[0], operationData.oriJimuLayerInfo);
          }
        }));
      }

      this.showRelatedTables(this._createOperationData(operationData.relatedFeature,
                                                       operationData.destJimuLayerInfo,
                                                       null,
                                                       null),
                                                       operationData, disableRelatedTable);
    },

    showRelatedTables: function(operationData, previouOperationData, disableAccess) {
      this._getRelatedTableInfoArray(operationData.oriJimuLayerInfo)
      .then(lang.hitch(this, function(layerInfoArray) {
        if(layerInfoArray.length > 0) {
          this._setTitle(window.jimuNls.popup.relatedTables);
        }
        array.forEach(layerInfoArray, function(relatedLayerInfo, index) {
          var backgroundClass = (index % 2 === 0) ? 'oddLine ' : 'evenLine ';
          var disableAccessClass = disableAccess ? 'disable ' : 'enable ';
          var tableItem = html.create('div', {
            'class': 'item table-item ' + backgroundClass + disableAccessClass,
            innerHTML: relatedLayerInfo.title
          }, this.contentBox);

          if(!disableAccess) {
            var handle = on(tableItem, 'click', lang.hitch(this, function() {

              var processDef;
              if(this._editWidget._configEditor.usingSaveButton) {
                processDef = this._editWidget._popupConfirmDialog();
              } else {
                processDef = new Deferred();
                processDef.resolve(true);
              }

              processDef.then(lang.hitch(this, function(result) {
                if(result) {
                  relatedLayerInfo.getLayerObject().then(lang.hitch(this, function() {
                    if(previouOperationData) {
                      this._addOperation(Clazz.OPERATION_SHOW_INSPECTOR, previouOperationData);
                    } else {
                      this._addOperation(Clazz.OPERATION_FIRST, operationData);
                    }
                    //this._changeRefDomNode();
                    this.showRelatedRecords(this._createOperationData(operationData.feature,
                                                                      operationData.oriJimuLayerInfo,
                                                                      relatedLayerInfo,
                                                                      null));
                  }));
                }
              }));

            }));
            this._temporaryData.eventHandles.push(handle);
          }
        }, this);
      }));
    },

    showFirstPage: function(operationData, undoFlag) {
      this._clearPage();
      this._revertRefDomNode();
      this.showRelatedTables(operationData);

      if(undoFlag) {
        array.forEach(this._editWidget._jimuLayerInfos.getLayerInfoArray(), function(jimuLayerInfo) {
          if(jimuLayerInfo.layerObject &&
            jimuLayerInfo.layerObject.clearSelection &&
            jimuLayerInfo.id !== this.originalJimuLayerInfo.id) {
            SelectionManager.getInstance().clearSelection(jimuLayerInfo.layerObject);
            //jimuLayerInfo.layerObject.clearSelection();
          }
        }, this);
        this.originalFeature.setSymbol(this.originalLayer.getSelectionSymbol());
        this._activeGraphicEdit(this.originalFeature /*operationData.destJimuLayerInfo.layerObject*/);
      }

    },

    _activeGraphicEdit: function(feature, deselectedLayerInfo) {
      if (deselectedLayerInfo) {
        if (deselectedLayerInfo.id === this.originalJimuLayerInfo.id) {
          this.originalFeature.setSymbol(null, true);
        } else {
          SelectionManager.getInstance().clearSelection(deselectedLayerInfo.layerObject);
        }
      }
      var ponit;
      this._editWidget.editor._editVertices = true;
      this._editWidget.editor._activateEditToolbar(feature);
      if(feature.geometry) {
        if(feature.geometry.type === 'point') {
          ponit = feature.geometry;
        } else {
          ponit = feature.geometry.getExtent().getCenter();
        }
      }
      this._editWidget.map.infoWindow.show(ponit);
    },

    /*************************
     * methods for events
     ************************/
    _createOperationData: function(feature,
                                   oriJimuLayerInfo,
                                   destJimuLayerInfo,
                                   relatedFeature) {
      var newOperationData = {
        feature: feature,
        oriJimuLayerInfo: oriJimuLayerInfo,
        destJimuLayerInfo: destJimuLayerInfo,
        relatedFeature: relatedFeature
      };
      return newOperationData;
    },

    _addOperation: function(operationName, operationData) {
      this.undoManager.add(new Clazz.Operation(
        operationName,
        operationData,
        this
      ));
    },

    _onPreviouBtnClick: function() {
      var processDef;
      if(this._editWidget._configEditor.usingSaveButton) {
        processDef = this._editWidget._popupConfirmDialog();
      } else {
        processDef = new Deferred();
        processDef.resolve(true);
      }
      processDef.then(lang.hitch(this, function(result) {
        if(result) {
          this.undoManager.undo();
        }
      }));
    },

    _onAddNewBtnClick: function(operationData) {
      //prepare new related records.
      var relatedLayerObject = operationData.destJimuLayerInfo.layerObject;
      var newRelatedRecordPara = this._prepareNewRelatedRecord(operationData);
      var integrityField = this._keepReferentialIntegrity(operationData);

      if(relatedLayerObject.type !== "Table") {
        this._editWidget._startEditingRelatedGraphic(operationData, integrityField);
      }else if(this._editWidget._configEditor.usingSaveButton) {
        // add previou operation
        this._addOperation(Clazz.OPERATION_SHOW_RELATED_RECORDS, operationData);
        // first time to show a temporary inspector
        this.showInspector(this._createOperationData(operationData.feature,
                           operationData.oriJimuLayerInfo,
                           operationData.destJimuLayerInfo,
                           newRelatedRecordPara));
      } else {
        this.loading.show();
        // add new related record
        this._addNewRelatedRecord(newRelatedRecordPara, operationData)
        .then(lang.hitch(this, function(newRelatedRecord) {
          this.loading.hide();
          // add previou operation
          this._addOperation(Clazz.OPERATION_SHOW_RELATED_RECORDS, operationData);
          // show inspector
          this.showInspector(this._createOperationData(operationData.feature,
                             operationData.oriJimuLayerInfo,
                             operationData.destJimuLayerInfo,
                             newRelatedRecord));
        }), lang.hitch(this, function() {
          this.loading.hide();
        }));
      }
    },

    _onCloseBtnClick: function() {
      this._editWidget.editPopup.hide();
    },

    _onDeleteBtnClick: function(operationData) {
      var objectIdField = operationData.destJimuLayerInfo.layerObject.objectIdField;
      var objectId = operationData.relatedFeature.attributes[objectIdField];
      if(objectId === null || objectId === undefined) {
        return;
      }

      if(this._editWidget._configEditor.usingSaveButton) {
        this._editWidget._stopEditingSession();
      }

      this.loading.show();
      this._deleteRelatedRecord(operationData).then(lang.hitch(this, function() {
        this.loading.hide();
        this._onPreviouBtnClick();
      }), lang.hitch(this, function() {
        this.loading.hide();
      }));
    },

    _onSaveBtnClick: function(operationData) {
      if(!this._editWidget._isEditingSession) {
        return;
      }

      var objectIdField = operationData.destJimuLayerInfo.layerObject.objectIdField;
      var objectId = operationData.relatedFeature.attributes[objectIdField];
      if(objectId === null || objectId === undefined) {
        // create a new related record
        var newRelatedRecordPara = operationData.relatedFeature;
        this.loading.show();
        // add new related record
        this._addNewRelatedRecord(newRelatedRecordPara, operationData)
        .then(lang.hitch(this, function(newRelatedRecord) {
          this.loading.hide();
          // second time show the inspector
          // do not need to add previou operation, the operation has been added by first time show the inspector
          this.showInspector(this._createOperationData(operationData.feature,
                             operationData.oriJimuLayerInfo,
                             operationData.destJimuLayerInfo,
                             newRelatedRecord));
        }), lang.hitch(this, function() {
          this.loading.hide();
        }));
      } else {
        // update the relate record
        this._updateRelatedRecordOnSave(operationData);
      }
      // means can switch edit page or close popup.
      this._editWidget._stopEditingSession();
    },

    _onAttributeChange: function(operationData, evt) {
      if(this._editWidget._configEditor.usingSaveButton) {
        this._updateRelatedRecordOnClient(operationData, evt);
      } else {
        this._updateRelatedRecordDirectly(operationData, evt);
      }
    },

    /*************************
     * Methods for control dom
     *************************/
    _clearPage: function() {
      html.empty(this.contentBox);
      // hide addNewBtn
      html.setStyle(this.addNewBtn, 'display', 'none');

      array.forEach(this._temporaryData.eventHandles, function(handle) {
        if(handle && handle.remove) {
          handle.remove();
        }
      }, this);
      this._temporaryData.eventHandles = [];
      array.forEach(this._temporaryData.dijits, function(dijit) {
        if(dijit && dijit.destroy) {
          dijit.destroy();
        }
      }, this);
      this._temporaryData.dijits = [];
    },

    _changeRefDomNode: function() {
      html.setStyle(this.refDomNode, 'display', 'none');
      html.setStyle(this.operationBox, 'display', 'block');
      html.addClass(this.domNode, 'fix-height-mode');
      this.previouBtn.title = window.jimuNls.common.back;
      this.addNewBtn.title = window.jimuNls.common.newText;
      // just for open edit from popup
      if(this.undoManager.peekUndo()) {
        html.setStyle(this.previouBtn, 'display', 'block');
      } else {
        html.setStyle(this.previouBtn, 'display', 'none');
      }
    },

    _revertRefDomNode: function() {
      html.setStyle(this.refDomNode, 'display', 'block');
      html.setStyle(this.operationBox, 'display', 'none');
      html.removeClass(this.domNode, 'fix-height-mode');
    },

    _showAddNewBtn: function(operationData) {
      var relatedLayerObject = operationData.destJimuLayerInfo.layerObject;
      if(relatedLayerObject.getEditCapabilities &&
         relatedLayerObject.getEditCapabilities().canCreate) {

        // show addNewBtn
        html.setStyle(this.addNewBtn, 'display', 'block');
        var handle = on(this.addNewBtn, 'click', lang.hitch(this, this._onAddNewBtnClick, operationData));
        this._temporaryData.eventHandles.push(handle);
      }
    },

    _setTitle: function(title, className) {
      if(title) {
        html.create('div', {
          'class': 'title-box ' + (className ? className : ''),
          innerHTML: title
        }, this.contentBox);
      }
    },

    _setOperationTitle: function(title) {
      html.setAttr(this.operationTitle, 'innerHTML', title);
      html.setAttr(this.operationTitle, 'title', title);
    },

    //get field selector
    _showFieldSelector: function(relatedLayerInfo) {
      var defaultDisplayFieldName = "objecid";
      var titleBox = domQuery(".title-box", this.contentBox)[0];
      var relatedLayer = relatedLayerInfo.layerObject;
      var items = [];

      if(!titleBox || !relatedLayerInfo) {
        return defaultDisplayFieldName;
      }

      var popupInfo = relatedLayerInfo.getPopupInfo();
      if(popupInfo && popupInfo.title) {
        items.push({
          label: window.jimuNls.popup.saveAsPopupTitle,
          value: "popupTitle"
        });
      }

      array.forEach(relatedLayer.fields, function(field){
        if(field.name.toLowerCase() !== "globalid" &&
          field.name.toLowerCase() !== "shape"){
          items.push({
            label: field.alias || field.name,
            value: field.name
          });
        }
      });

      var fieldSelector = new DropdownMenu({
        items: items
      }).placeAt(titleBox);
      fieldSelector.domNode.title = window.jimuNls.popup.chooseFieldTip;

      // get default display field name
      var oldDefaultDisplayFieldName =
        lang.getObject("_wabProperties.popupInfo.displayFieldOfRelatedRecordList", false, relatedLayer);
      var displayOrObjectField = editUtils.ignoreCaseToGetFieldObject(relatedLayerInfo.layerObject,
        relatedLayerInfo.layerObject.displayField ||
        relatedLayerInfo.layerObject.objectIdField);
      var appConfig = ConfigManager.getInstance().getAppConfig();
      if(oldDefaultDisplayFieldName) {
        defaultDisplayFieldName = oldDefaultDisplayFieldName;
      } else if(appConfig.configWabVersion === "2.3" && displayOrObjectField && displayOrObjectField.name) {
        // back compatibility for online4.4
        defaultDisplayFieldName = displayOrObjectField.name;
      } else if(popupInfo && popupInfo.title) {
        defaultDisplayFieldName = "popupTitle";
      } else if(displayOrObjectField && displayOrObjectField.name) {
        defaultDisplayFieldName = displayOrObjectField.name;
      } else if(items.length > 0) {
        defaultDisplayFieldName = items[0].value;
      }

      if(defaultDisplayFieldName) {
        // hilight item
        fieldSelector.setHighlightValue(defaultDisplayFieldName);
        lang.setObject("_wabProperties.popupInfo.displayFieldOfRelatedRecordList",
                       defaultDisplayFieldName,
                       relatedLayer);
      }
      this._temporaryData.dijits.push(fieldSelector);

      // listen on selcector change
      var fieldSelectorChangeHandle = on(fieldSelector,
                                         'click-item',
                                         lang.hitch(this,function(relatedLayerInfo, newValue) {
        domQuery(".item.record-item", this.contentBox).forEach(lang.hitch(this, function(node) {
          lang.setObject("_wabProperties.popupInfo.displayFieldOfRelatedRecordList", newValue, relatedLayer);
          var displayTitle = this._getDisplayTitleOfRelatedRecord(relatedLayerInfo,
                                                                  node.relatedRecord,
                                                                  newValue);
          node.innerHTML = displayTitle;
        }));
      }, relatedLayerInfo));
      this._temporaryData.eventHandles.push(fieldSelectorChangeHandle);
      return defaultDisplayFieldName;
    }

  });

  // operation class
  Clazz.Operation = declare([operationBase], {
    constructor: function(operationName, operationData, relatedRecordsEditor) {
      this.operationName = operationName;
      this.operationData = operationData;
      this.relatedRecordsEditor = relatedRecordsEditor;
    },

    performUndo: function() {
      switch (this.operationName) {
        case Clazz.OPERATION_SHOW_RELATED_TABLES:
          return this.relatedRecordsEditor.showRelatedTables(this.operationData);
        case Clazz.OPERATION_SHOW_RELATED_RECORDS:
          return this.relatedRecordsEditor.showRelatedRecords(this.operationData);
        case Clazz.OPERATION_SHOW_INSPECTOR:
          return this.relatedRecordsEditor.showInspector(this.operationData);
        default:
          return this.relatedRecordsEditor.showFirstPage(this.operationData, true);
      }
    }
  });

  // Working around for bug of AttributeInspector. Incorrect behavior with
  // multiple instances of AttributeInspector.
  Clazz.ATI = declare([AttributeInspector], {
    constructor: function() {
      this._aiConnects = [];
      this._selection = [];
      this._toolTips = [];
    },

    addButton: function(label, classPara, domPositionPara) {
      var domPosition = domPositionPara ? domPositionPara : "before";
      var button = new Button({
        "label": label,
        "class": " atiButton " + classPara
      }, html.create("div"));

      html.place(button.domNode, this.deleteBtn.domNode, domPosition);
      return button;
    },

    updateCurrentSelectdFeature: function(features, layer, changedFiledName, changedFiledValue) {
      /*jshint unused: false*/
      /*
      // update current selectedFeature of ATI.
      if(attributeChangeEvt.target &&
         attributeChangeEvt.target._selection &&
         attributeChangeEvt.target._selection[0]) {
        var selectedFeature = attributeChangeEvt.target._selection[0];
        selectedFeature.attributes[attributeChangeEvt.fieldName] = attributeChangeEvt.fieldValue;

        if(attributeChangeEvt.fieldName === relatedLayerObject.typeIdField) {
          relatedLayerObject.ownershipBasedAccessControlForFeatures = true;
          attributeChangeEvt.target.refresh();
          relatedLayerObject.ownershipBasedAccessControlForFeatures = false;
        }
      }
      */

      /*
      layer.ownershipBasedAccessControlForFeatures = true;
      this._updateSelection(features, layer);
      layer.ownershipBasedAccessControlForFeatures = false;
      */


      if(this._selection &&
         this._selection[0] &&
         changedFiledName) {
        var selectedFeature = this._selection[0];
        selectedFeature.attributes[changedFiledName] = changedFiledValue;

        layer.ownershipBasedAccessControlForFeatures = true;
        this.refresh();
        layer.ownershipBasedAccessControlForFeatures = false;
      }
    }
  });

  lang.mixin(Clazz, {
    OPERATION_SHOW_RELATED_TABLES: "showRelatedTables",
    OPERATION_SHOW_RELATED_RECORDS: "showRelatedRecords",
    OPERATION_SHOW_INSPECTOR: "showInspector",
    OPERATION_FIRST: "first"
  });

  return Clazz;
});
