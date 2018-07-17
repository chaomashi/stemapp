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
  "dojo/_base/declare",
  "dojo/Evented",
  "dojo/on",
  "dojo/string",
  "dojo/dom-attr",
  "dojo/dom-style",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/dom-construct",
  "esri/graphic",
  "jimu/dijit/Message",
  "dijit/_WidgetBase",
  "./presetUtils"
],
  function (declare, Evented, on, String, domAttr, domStyle, lang, array, domConstruct, Graphic, Message, _WidgetBase, presetUtils) {
    return declare([_WidgetBase, Evented], {
      newRelatedFeature: {},
      isSaveEnable: false,
      postCreate: function () {
        this._createTable();
      },

      /**
      * The function will create table for valid relationships
      */
      _createTable: function () {
        var contentWrapper;
        contentWrapper = domConstruct.create("div", {
          "class": "relatedTablesContainer"
        }, this.domNode);
        array.forEach(this.relationshipInfo, lang.hitch(this, function (relationship) {
          if (relationship.featureLayer && relationship.hasOwnProperty('relationshipId')) {
            this._createRelatedTableItem(relationship, contentWrapper);
          }
        }));
      },

      /**
      * The function will create individual item
      */
      _createRelatedTableItem: function (relationship, contentWrapper) {
        var titleContainer, tableTitle, arrowIcon, createNewFeature, tableInfo, currentFeature;
        tableInfo = this.layerInfosObj.getLayerOrTableInfoById(relationship.featureLayer.id);
        titleContainer = domConstruct.create("div", {
          "class": "relatedTableTitleContainer"
        }, contentWrapper);
        domAttr.set(titleContainer, "layerId", tableInfo.id);
        domAttr.set(titleContainer, "relationshipId", relationship.relationshipId);
        domAttr.set(titleContainer, "parentFeatureOID",
          this.parentFeature.attributes[this.parentFeature._layer.objectIdField]);
        //click handler for title container
        on(titleContainer, "click", lang.hitch(this, function () {
          this.emit("titleClicked",
            tableInfo.id, relationship.relationshipId, false,
            this.parentFeatureIndexInAI, this.parentFeature.attributes[this.parentFeature._layer.objectIdField],
            this.newRelatedFeature[relationship.relationshipId].foreignKeyField);
        }));
        tableTitle = domConstruct.create("div", {
          "class": "relatedTableTitle esriCTEllipsis",
          "innerHTML": tableInfo.title,
          "title": tableInfo.title
        }, titleContainer);

        this._createNewGraphics(relationship.relationshipId, tableInfo.id);
        //Show create new feature button if layer has create capabilities and it is of type table
        if (this._canAddFeatures(relationship, tableInfo) && tableInfo.layerObject.type === "Table") {
          //create add new feature button based on layer/table config and capabilities
          createNewFeature = domConstruct.create("div", {
            "class": "relatedTableIcons itemTitleCreateNew",
            "title": this.nls.addNewFeature
          }, titleContainer);
          domAttr.set(createNewFeature, "tableId", tableInfo.id);
          //click handler for creating new feature
          on(createNewFeature, "click", lang.hitch(this, function (evt) {
            evt.stopPropagation();
            currentFeature = this.newRelatedFeature[relationship.relationshipId];
            if (this.isSaveEnable) {
              Message({
                message: this.nls.pendingFeatureSaveMsg
              });
              return;
            }
            if (this.parentFeature.attributes[currentFeature.primaryKeyField] === undefined ||
              this.parentFeature.attributes[currentFeature.primaryKeyField] === null) {
              //Fetch field alias or field name from the field for showing the warning message
              var fieldInfo = presetUtils.getFieldInfoByFieldName(this.parentFieldInfos,
                currentFeature.primaryKeyField);
              var fieldAlias = fieldInfo.label || currentFeature.primaryKeyField;
              var errorMsg = String.substitute(this.nls.invalidRelationShipMsg,
                { parentKeyField: fieldAlias });
              Message({
                message: errorMsg
              });
              return;
            }
            //CT - Update the related feature instance with parent features foreign and primary key attribute
            //This will make sure the newly created related feature has valid key field
            this.newRelatedFeature[relationship.relationshipId].attributes[
              this.newRelatedFeature[relationship.relationshipId].foreignKeyField] =
              this.parentFeature.attributes[
              this.newRelatedFeature[relationship.relationshipId].primaryKeyField];
            this.emit("addRelatedRecord",
              this.newRelatedFeature[relationship.relationshipId], titleContainer,
              tableInfo.id, this.parentFeatureIndexInAI,
              this.newRelatedFeature[relationship.relationshipId].foreignKeyField);
          }));
          domStyle.set(tableTitle, "width", "calc(100% - 55px)");
        } else {
          domStyle.set(tableTitle, "width", "calc(100% - 30px)");
        }
        //create arrow icon div
        arrowIcon = domConstruct.create("div", {
          "class": "relatedTableIcons itemTitleNextArrow"
        }, titleContainer);
      },

      /**
      * Check if new feature creation is enable in particular table
      */
      _canAddFeatures: function (tableConfig, tableInfo) {
        var editingCapabilities;
        //get capabilities of table/layer
        editingCapabilities = tableInfo.layerObject.getEditCapabilities();
        if (!tableConfig.allowUpdateOnly && tableConfig._editFlag && editingCapabilities.canCreate) {
          return true;
        } else {
          return false;
        }
      },

      /**
      * Create new graphics for respective table/layer
      */
      _createNewGraphics: function (relationshipId, tableId) {
        var tableInfo, newGraphic, primaryKeyField, foreignKeyField,
          parentLayerRelation, relatedLayerRelation, featureAttributes = {};
        tableInfo = this.layerInfosObj.getLayerOrTableInfoById(tableId);
        //check for valid template
        if (tableInfo.layerObject.templates.length > 0) {
          featureAttributes = tableInfo.layerObject.templates[0].prototype.attributes;
        } else if (tableInfo.layerObject.types.length > 0) {
          featureAttributes = tableInfo.layerObject.types[0].templates[0].prototype.attributes;
        }
        newGraphic = new Graphic(null, null, lang.clone(featureAttributes));
        //get parent and related layers relations
        parentLayerRelation = this._getRelationShipById(this.parentFeature._layer, relationshipId);
        relatedLayerRelation = this._getRelationShipById(tableInfo.layerObject, relationshipId);
        // add valid relationship value in related table/layer
        primaryKeyField = parentLayerRelation.keyField;
        foreignKeyField = relatedLayerRelation.keyField;
        if (newGraphic.attributes.hasOwnProperty(foreignKeyField)) {
          newGraphic.attributes[foreignKeyField] = this.parentFeature.attributes[primaryKeyField];
        }
        this.newRelatedFeature[relationshipId] = newGraphic;
        this.newRelatedFeature[relationshipId].primaryKeyField = primaryKeyField;
        this.newRelatedFeature[relationshipId].foreignKeyField = foreignKeyField;
        this.newRelatedFeature[relationshipId].featureLayer = tableInfo;
      },

      /**
      * Get relationship of layer or table
      */
      _getRelationShipById: function (layer, relationshipId) {
        var relation;
        array.some(layer.relationships, lang.hitch(this, function (relationship) {
          //Return relationship
          if (relationship.id === relationshipId) {
            relation = relationship;
            return true;
          }
        }));
        return relation;
      },
      updateFeatureInstance: function (updatedAttributes) {
        if (this.parentFeature) {
          this.parentFeature.attributes = lang.clone(updatedAttributes);
        }
      }
    });
  });