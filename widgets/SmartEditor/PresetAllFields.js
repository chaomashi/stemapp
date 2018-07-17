define(
  ["dojo/_base/declare",
    "dojo/Evented",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/dom-attr",
    'dojo/dom-construct',
    'dojo/on',
    "./utils",
    './presetUtils',
    'dijit/_TemplatedMixin',
    'jimu/BaseWidgetSetting',
    "jimu/dijit/Popup"
  ],
  function (
    declare,
    Evented,
    lang,
    array,
    domAttr,
    domConstruct,
    on,
    editUtils,
    presetUtils,
    _TemplatedMixin,
    BaseWidgetSetting,
    Popup
  ) {
    return declare([BaseWidgetSetting, Evented, _TemplatedMixin], {
      baseClass: "jimu-widget-smartEditor-setting-preset",
      dijitCollection: {},
      actionsCollection: {},
      presetFieldInfos: {},
      _deletedFields: [],

      postCreate: function () {
        this.inherited(arguments);
        this.dijitCollection = {};
        this.actionsCollection = {};
        this.presetFieldInfos = {};
        this._deletedFields = [];
        this.presetContainer = domConstruct.create("div", {
          "class": "esriCTPresetContent"
        });
        //create field infos for all layers
        this._createPresetFieldInfos();
        //based on presetFieldInfos create dijits in popup
        if (!this.showingInWidget) {
          this.createContent();
        }

      },

      _getRelatedLayersInfo: function (relations, relatedLayersInfo) {
        var newRelations = [];
        for (var i = 0; i < relations.length; i++) {
          var relatedInfo = {};
          for (var key in relations[i]) {
            if (relations[i].hasOwnProperty(key) && key !== 'featureLayer' && key !== 'layerInfo') {
              //Get recursive relationship info's
              if (key === "relationshipInfos") {
                newRelations.push(this._getRelatedLayersInfo(relations[i][key], relatedLayersInfo));
              } else if (key === "fieldValues" || key === "allowUpdateOnly") {
                relatedInfo[key] = relations[i][key];
              } else if (key === "fieldInfos") {
                //layer info will not have complete field info for related layer
                //so get the complete field info
                if (!relations[i][key].hasOwnProperty("name")) {
                  var layerInfo = this._jimuLayerInfos.getLayerOrTableInfoById(relations[i].featureLayer.id);
                  var layerConfig = editUtils.getConfigInfo(layerInfo, {});
                  relatedInfo[key] = layerConfig[key];
                } else {
                  relatedInfo[key] = relations[i][key];
                }
              }
            }
          }
          if (relatedInfo.hasOwnProperty("fieldValues")) {
            relatedLayersInfo.push(relatedInfo);
          }
        }
        return newRelations;
      },

      _getPresetFieldsForLayers: function (allLayersInfo) {
        var presetFields = [];
        for (var i = 0; i < allLayersInfo.length; i++) {
          var currentConfig = allLayersInfo[i];
          if (!currentConfig.allowUpdateOnly && currentConfig.fieldValues) {
            for (var fieldName in currentConfig.fieldValues) {
              for (var j = 0; j < currentConfig.fieldValues[fieldName].length; j++) {
                var copyAction = currentConfig.fieldValues[fieldName][j];
                if (copyAction.actionName === "Preset" && copyAction.enabled) {
                  if (!this.actionsCollection[fieldName]) {
                    this.actionsCollection[fieldName] = [];
                  }
                  this.actionsCollection[fieldName].push(copyAction);
                  presetFields.push(fieldName);
                }
              }
            }
            if (presetFields.length > 0) {
              for (var k = 0; k < presetFields.length; k++) {
                var fName = presetFields[k];
                //Get field info for the selected field name
                var fieldInfo = presetUtils.getFieldInfoByFieldName(currentConfig.fieldInfos, fName);
                if (this.presetFieldInfos.hasOwnProperty(fName)) {
                  this.presetFieldInfos[fName] =
                    presetUtils.changeFieldToMostRestrictive(this.presetFieldInfos[fName], fieldInfo);
                } else {
                  this.presetFieldInfos[fName] = fieldInfo;
                }
              }
            }
          }
        }
        return presetFields;
      },

      _createPresetFieldInfos: function () {
        this.presetFieldInfos = {};
        array.forEach(this.configInfos, lang.hitch(this, function (currentConfig) {
          var relatedLayersInfo = [];
          if (currentConfig.relationshipInfos) {
            //get related layer info for current layer
            this._getRelatedLayersInfo(currentConfig.relationshipInfos, relatedLayersInfo);
          }
          //get preset info for current layer
          this._getPresetFieldsForLayers([currentConfig]);
          //if layer has related layer info then get its preset info
          if (relatedLayersInfo.length > 0) {
            this._getPresetFieldsForLayers(relatedLayersInfo);
          }
        }));
      },

      _disableActionsForDeletedFields: function () {
        array.forEach(this._deletedFields, lang.hitch(this, function (fieldName) {
          //update in all fields action to disable preset
          for (var i = 0; i < this.actionsCollection[fieldName].length; i++) {
            lang.mixin(this.actionsCollection[fieldName][i],
              { "enabled": false });
          }
        }));
      },

      _deleteField: function (evt) {
        var fieldName;
        //get the field name from the stored attributes
        fieldName = domAttr.get(evt.currentTarget, "fieldName");
        this._deletedFields.push(fieldName);
        //remove from preset popup
        domConstruct.destroy(evt.currentTarget.parentElement);
        //delete from collection
        delete this.dijitCollection[fieldName];
      },

      createContent: function () {
        //Set the hint in preset all fields popup
        domConstruct.create("div", {
          "innerHTML": this.nls.presetAll.hintMsg,
          "class": "esriCTPresetHint"
        }, this.presetContainer);
        for (var fieldName in this.presetFieldInfos) {
          var fieldInfo = this.presetFieldInfos[fieldName];
          //Set the field label in preset popup
          var fieldNode = domConstruct.create("div", {
          }, this.presetContainer);
          //Set the field label in preset popup
          domConstruct.create("div", {
            "innerHTML": fieldInfo.label,
            "class": "esriCTFieldTitle"
          }, fieldNode);
          var deletePreset = domConstruct.create("div", {
            "class": "esriCTDeletePreset close-btn jimu-icon jimu-icon-close",
            "title": this.nls.presetAll.deleteTitle
          }, fieldNode);
          domAttr.set(deletePreset, "fieldName", fieldName);
          this.own(on(deletePreset, "click", lang.hitch(this, this._deleteField)));
          //Create nodes for selected field based on the type and popup configuration
          var nodes = presetUtils.createPresetFieldContentNode(fieldInfo);
          this.dijitCollection[fieldName] = nodes;
          //Add all node for the field in preset popup
          for (var index = 0; index < nodes.length; index++) {
            var node = nodes[index];
            var fieldValues;
            var container = domConstruct.create("div", { "class": "fieldContentNode" });
            node.placeAt(container);
            fieldNode.appendChild(container);
            //get field values if previously configured for same field
            if (this._configuredPresetInfos && this._configuredPresetInfos[fieldName]) {
              fieldValues = this._configuredPresetInfos[fieldName];
            }
            if (fieldValues && fieldValues.length > 0) {
              /**
               * After updating the preset approach and removed caonfigure values from preset popup,
               * we will now always store only one value.
               * so in case of dates with multiple nodes for date and time use 0th index value only.
               */
              var value = fieldValues[0];
              if (node.declaredClass === "dijit.form.DateTextBox" ||
                node.declaredClass === "dijit.form.TimeTextBox") {
                value = (value === "" || value === null) ? null : new Date(value);
              }
              node.set('value', value);
            }
          }
        }
        this.showDialog();
      },

      showDialog: function () {
        //create & show popup
        var fieldsPopup = new Popup({
          titleLabel: this.nls.presetAll.popupTitle,
          width: 400,
          maxHeight: 600,
          autoHeight: true,
          content: this.presetContainer,
          'class': this.baseClass,
          buttons: [{
            label: this.nls.ok,
            onClick: lang.hitch(this, function () {
              if (this._savePresetValues()) {
                if (this._deletedFields && this._deletedFields.length > 0) {
                  this._disableActionsForDeletedFields();
                }
                this.emit("PrestInfoUpdated", this._configuredPresetInfos);
                fieldsPopup.close();
              }
            })
          }, {
            label: this.nls.cancel,
            classNames: ['jimu-btn-vacation'],
            onClick: lang.hitch(this, function () {
              fieldsPopup.close();
            })
          }],
          onClose: lang.hitch(this, function () {
          })
        });
      },

      _savePresetValues: function () {
        var isValid = true, presetInfos = {};
        for (var fieldName in this.dijitCollection) {
          var values = [];
          var nodes = this.dijitCollection[fieldName];
          if (!presetUtils.isValidPresetValue(nodes)) {
            isValid = false;
            break;
          }
          var fieldInfo = this.presetFieldInfos[fieldName];
          //Get the values from nodes
          //In case if date field get the value of date and time using utils method
          if (fieldInfo.type === "esriFieldTypeDate") {
            var selectedValue = presetUtils.getDateFieldValue(fieldInfo, nodes);
            //in case of date field with time
            for (var index = 0; index < nodes.length; index++) {
              values.push(selectedValue);
            }
          } else {
            //get values for each node
            for (var i = 0; i < nodes.length; i++) {
              var node = nodes[i];
              var value = node.get("value");
              //Incase of numeric field check for a valid value
              if (presetUtils.integerFields.indexOf(fieldInfo.type) !== -1) {
                if (isNaN(value)) {
                  values.push("");
                } else {
                  values.push(value);
                }
              }
              else {
                values.push(value);
              }
            }
          }
          //update the values in _configuredPresetInfos
          presetInfos[fieldName] = values;
        }
        if (isValid) {
          this._configuredPresetInfos = presetInfos;
        }
        return isValid;
      }
    });
  });