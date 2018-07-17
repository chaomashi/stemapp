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

define(['dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/Evented',
  'dojo/query',
  'dojo/dom-class',
  'dojo/dom-construct',
  'dojo/Deferred',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/on',
  'dojox/gfx/fx',
  'dojo/text!./templates/FeatureToolbar.html',
  'esri/toolbars/edit',
  'jimu/dijit/Message',
  'jimu/dijit/Popup',
  'jimu/utils',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/symbols/SimpleLineSymbol',
  'esri/Color',
  'esri/graphic',
  'esri/geometry/webMercatorUtils'
],
  function (declare,
    lang,
    array,
    Evented,
    query,
    domClass,
    domConstruct,
    Deferred,
    _WidgetBase,
    _TemplatedMixin,
    on,
    fx,
    template,
    Edit,
    Message,
    Popup,
    jimuUtils,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    Color,
    Graphic,
    webMercatorUtils) {
    return declare([_WidgetBase, _TemplatedMixin, Evented], {
      templateString: template,

      'baseClass': 'cf-feature-toolbar',
      declaredClass: 'FeatureToolbar',
      label: "FeatureToolbar",

      parent: null,
      nls: null,
      map: null,
      appConfig: null,
      config: null,
      feature: null,
      layer: null,
      theme: '',
      isDarkTheme: '',
      locators: [],
      styleColor: '',
      featureView: null,
      _editToolbar: null,
      csvStore: null,
      _isAddressFeature: true,
      _stageLayer: null,

      //TODO should this support the option to reset values to defaults if they have made temp changes?
      //TODO need to test/handle situations where the address is not located sucessfully on locate calls

      //TODO if you toggle edit off in duplicate after a save it should retain the file switch if one has occured

      constructor: function (options) {
        lang.mixin(this, options);

        //enable editing when pencil is clicked
        this._editDisabled = true;

        //enable save when change to geometry or attributes
        this._saveDisabled = true;

        //enable cancel when change to geometry or attributes
        this._cancelDisabled = true;

        //enable locate when change to address
        this._locateDisabled = true;

        //enable when address is re-located
        this._syncDisabled = true;

        //Used to store and listen when a change occurs
        this._hasAttributeEdit = false;
        this.own(on(this.featureView, 'attribute-change', lang.hitch(this, this._attributeChange)));

        this._hasAddressEdit = false;
        this.own(on(this.featureView, 'address-change', lang.hitch(this, this._addressChange)));

        this._hasGeometryEdit = false;
        this.own(on(this._editToolbar, 'graphic-move-stop', lang.hitch(this, this._graphicMoveStop)));
        this.own(on(this.featureView, 'address-located', lang.hitch(this, this._graphicMoveStop)));

        //TODO this should be done once earlier in the process rather than on every single view
        this.locator = this._getLocator(0);

        //get the original field and location values for comparison and possibly to support a reset
        this._initOriginalValues();
      },

      postCreate: function () {
        this.inherited(arguments);
        this._darkThemes = ['DartTheme', 'DashboardTheme'];
        this.updateImageNodes();
      },

      startup: function () {
        this.inherited(arguments);
        this._started = true;
        this.featureView._toggleEditControls(this._editDisabled);
      },

      _getLocator: function (_i) {
        //TODO need to have a backup if none of the locators support location to address
        var locator;
        for (var i = _i; i < this.csvStore._geocodeSources.length; i++) {
          this.locatorSource = this.csvStore._geocodeSources[i];
          if (this.locatorSource.locator.locationToAddress) {
            locator = this.locatorSource.locator;
            this._locatorIndex = i;
            break;
          }
        }
        if (locator) {
          locator.outSpatialReference = this.featureView.parent.editLayer.spatialReference;
          locator.countryCode = this.locatorSource.countryCode;
        }
        return locator;
      },

      _initOriginalValues: function () {
        //These could be used for comparison or to support reset
        this._originalValues = lang.clone(this.featureView.feature);
      },

      _attributeChange: function (v) {
        this._hasAttributeEdit = v;
        if (this.featureView.isDuplicate && this.featureView._useGeomFromLayer) {
          this._updateSaveAndCancel(!(this._hasAttributeEdit));
        } else {
          this._updateSaveAndCancel(!(this._hasAttributeEdit || this._hasGeometryEdit));
        }
        this._updateSync(!this.featureView._validateAddressDifference());
      },

      _addressChange: function (v) {
        this._hasAddressEdit = v;
        this._updateLocate(!v);
      },

      _graphicMoveStop: function (result) {
        if (this.featureView.isShowing) {
          this._hasGeometryEdit = true;
          if (this.featureView.isDuplicate && this.featureView._useGeomFromLayer) {
            this._updateSaveAndCancel(!(this._hasAttributeEdit));
          } else {
            this._updateSaveAndCancel(!(this._hasAttributeEdit || this._hasGeometryEdit));
          }
          this.map.infoWindow.setFeatures(this.featureView._feature);
          this.map.infoWindow.select(0);

          //I fire graphicMoveStop when locating...in that case it's based off of the address the user entered
          //no need to reverse geocode again
          if (result) {
            this._reverseLocate(result.graphic.geometry).then(lang.hitch(this, function () {
              this._hasAddressEdit = true;
              //when the user moves the graphic no need for locate to stay enabled
              this._updateLocate(true);
              if (this.featureView._validateAddressDifference()) {
                this._updateSync(false);
              }
              this.locator = this._getLocator(0);
            }), function (msg) {
              this.locator = this._getLocator(0);
              new Message(msg);
            });
          } else {
            if (this.featureView._validateAddressDifference()) {
              this._updateSync(false);
            }
          }
        }
      },

      _reverseLocate: function (geometry) {
        var def = new Deferred();
        if (this._isAddressFeature) {
          this.locator.locationToAddress(geometry, 100, lang.hitch(this, function (result) {
            //TODO should this honor the configured match score limit...if
            this.featureView._updateAddressFields(result.address, false);
            def.resolve({ address: result.address });
          }), lang.hitch(this, function (err) {
            if (this._getNextLocator()) {
              this._reverseLocate(geometry).then(function (r) {
                def.resolve(r);
              });
            } else {
              this.featureView._updateAddressFields({}, false);
              def.reject({ message: err.message });
            }
          }));
        } else {
          var geoGeom;
          if (geometry.spatialReference.isWebMercator && geometry.spatialReference.isWebMercator()) {
            geoGeom = webMercatorUtils.webMercatorToGeographic(geometry);
          }
          this.featureView._updateAddressFields(geoGeom || geometry, false);
          def.resolve({ geometry: geometry });
        }
        return def;
      },

      _disableEdit: function () {
        this._editDisabled = false;
        this._toggleEdit();
      },

      _toggleEdit: function () {
        this._editDisabled = !this._editDisabled;
        this._updateEdit(this._editDisabled);

        this.featureView._toggleEditControls(this._editDisabled);

        if (this.map.infoWindow.isShowing) {
          this.map.infoWindow.hide();
        }

        if (!this._editDisabled) {
          if (this.featureView.isDuplicate) {
            this._flashFeatures([this.featureView._useGeomFromFile ?
              this.featureView._feature : this.featureView._editFeature]);
            if (this.featureView._useGeomFromFile) {
              this._enableEdit(true);
              this._updateSaveAndCancel(!(this._hasAttributeEdit || this._hasGeometryEdit));
            } else {
              this._updateSaveAndCancel(!(this._hasAttributeEdit));
            }
          } else {
            this._enableEdit(true);
            this._flashFeatures([this.featureView._feature]);
            this._updateSaveAndCancel(!(this._hasAttributeEdit || this._hasGeometryEdit));
          }
          this._updateLocate(!this._hasAddressEdit);
          if ((this._hasGeometryEdit && this._locateDisabled) ||
            (this.featureView.isDuplicate && this.featureView._useValuesFromLayer)) {
            this._updateSync(!this.featureView._validateAddressDifference());
          } else {
            this._updateSync(true);
          }
        } else {
          this._enableEdit(false);
          this._undoEdits();
          this._updateSaveAndCancel(true);
          this._updateSync(true);
          this.map.infoWindow.clearFeatures();
        }
      },

      _enableEdit: function (enable) {
        if (enable) {
          this._editToolbar.activate(Edit.MOVE, this.featureView._feature);
        } else {
          this._editToolbar.refresh();
          this._editToolbar.deactivate();
        }
      },

      _undoEdits: function () {
        if (this._hasAttributeEdit) {
          this.featureView.resetAttributeValues();
          this._hasAttributeEdit = false;
        }

        if (this._hasAddressEdit) {
          this.featureView.resetAddressValues(this._originalValues);
          this._hasAddressEdit = false;
        }

        if (this._hasGeometryEdit){
          this.featureView.resetGeometry(this._originalValues.geometry);
          this._hasGeometryEdit = false;
        } else {
          this.featureView.resetFromLayerRows();
        }
        this._updateSync(!this.featureView._validateAddressDifference());
        this._updateLocate(true);
      },

      _locate: function () {
        if (!this._locateDisabled) {
          //locate feature
          this._locateFeature().then(lang.hitch(this, function () {
            //disable locate
            this._hasAddressEdit = false;
            this._updateLocate(true);
          }));
        }
      },

      _cancel: function () {
        //confirm cancel
        if (!this._cancelDisabled) {
          var cancelPopup = new Popup({
            titleLabel: this.nls.featureToolbar.cancelTitle,
            width: 400,
            autoHeight: true,
            content: domConstruct.create('div', {
              innerHTML: this.nls.featureToolbar.cancelMessage,
              style: "padding-bottom: 10px;"
            }),
            buttons: [{
              label: this.nls.yes,
              onClick: lang.hitch(this, function () {
                cancelPopup.close();
                cancelPopup = null;
                this._undoEdits();
                this._updateSaveAndCancel(true);
                this._panToAndSelectFeature((this.featureView.isDuplicate && this.featureView._useGeomFromLayer) ?
                  this.featureView._editFeature : this.featureView._feature);
              })
            }, {
              label: this.nls.no,
              onClick: lang.hitch(this, function () {
                cancelPopup.close();
              })
            }],
            onClose: lang.hitch(this, function () {
              cancelPopup = null;
            })
          });
        }
      },

      _save: function (forceSave) {
        //forceSave === true bypasses _saveDisabled check
        // allows a duplicate record to be saved in pretty much the same way as an unmatched record
        var updateFeature = this.featureView._feature;
        if (!this._saveDisabled || forceSave === true) {
          if (forceSave !== true) {
            //update the feature instances based on changes in user controls
            this._setFieldValues(this.featureView);
            this._setAddressValues(this.featureView);
            this.featureView.feature.geometry = updateFeature.geometry;
            this._originalValues.geometry = updateFeature.geometry;
            if (this.featureView.isDuplicate) {
              this._originalValues.duplicateGeometry = updateFeature.geometry;
            }
          }

          if (this.featureView.label.indexOf('UnMatched') === -1 &&
            this.featureView.label.indexOf('DuplicateFeatures') === -1) {
            //matched features will remain in the matched layer on save
            this._updateLayer(this._stageLayer, null, [updateFeature], null, true, false)
              .then(lang.hitch(this, function (r) {
                if (r && r.status === 'success') {
                  this._updateFeatureListLabel(updateFeature);
                }
              }));
          } else if (this.featureView.isDuplicate && forceSave !== true) {
            //duplicate features will remain in the duplicate layer on save
            //the hasUpdate attributes will be reviewed on submit to understand when update vs add should occur
            this.featureView._updateDuplicateAttributes(null, true);
            this._updateLayer(this.layer, null, [updateFeature], null, true, false)
              .then(lang.hitch(this, function (r) {
                if (r && r.status === 'success') {
                  this._updateFeatureListLabel(updateFeature);
                }
              }));
          } else {
            //unmatched features will be saved to the matched layer when they can be located or after the graphic is moved on save
            // the feature and view should be removed from the unmatched layer and list
            var oid = updateFeature.attributes[this.layer.objectIdField];

            //delete from un-matched layer
            this._updateLayer(this.layer, null, null, [updateFeature], true, false).then(lang.hitch(this, function (r) {
              if (r && r.status === 'success') {
                var list = this.featureView._parentFeatureList;
                list.removeFeature(this.featureView.feature, oid).then(lang.hitch(this, function () {
                  array.forEach(this.featureView._skipFields, lang.hitch(this, function (sf) {
                    delete updateFeature.attributes[sf];
                  }));

                  //Add the new
                  this._updateLayer(this._stageLayer, [updateFeature], null, null, true, false)
                    .then(lang.hitch(this, function (result) {
                      if (result && result.status === 'success') {
                        if (result.hasOwnProperty('objectId')) {
                          //update the feature view feature OID with the new OID prior to adding the feature to the list
                          var oidField = this.featureView.feature.fieldInfo.filter(lang.hitch(this, function (field) {
                            return field.name === this._stageLayer.objectIdField;
                          }))[0];
                          oidField.value = result.objectId;
                        }
                        this.featureView.feature.label = updateFeature.attributes[this.csvStore.labelField];
                        //update matched list
                        //need to get review and then _matchedListView from it
                        var reviewView = this.parent._pageContainer.getViewByTitle('Review');
                        reviewView.matchedFeatureList.addFeature(this.featureView.feature);
                        reviewView.matchedFeatureList.resetFeatureList();
                        reviewView._updateReviewRows((forceSave === true) ? 'duplicate' : 'unmatched');
                      }
                    }));

                }));
              }
            }));
          }

          if (forceSave !== true) {
            //disable save
            this._updateSaveAndCancel(true);
            //toggle edit
            this._toggleEdit();
          }
        }
      },

      _updateFeatureListLabel: function (updateFeature) {
        if (updateFeature.attributes[this.csvStore.labelField] !== this.featureView.featureListLabel.innerHTML) {
          var newValue = jimuUtils.stripHTML(updateFeature.attributes[this.csvStore.labelField]);
          this.featureView.featureListLabel.innerHTML = newValue;
        }
      },

      _updateLayer: function (layer, adds, updates, deletes, setFlags, bypassSubmitCheck) {
        //bypassSubmitCheck allows update to occur without changing the submit button state when edits are cancelled
        var def = new Deferred();
        layer.applyEdits(adds, updates, deletes).then(lang.hitch(this, function (addRes) {
          var result = { status: "success" };

          if (this.featureView.isDuplicate) {
            if (this._hasGeometryEdit && this.featureView._useGeomFromFile) {
              this._fileGeometryModified = true;
            }

            if (this._hasAttributeEdit && this.featureView._useValuesFromFile) {
              this._fileValuesModified = true;
            }
          }

          if (setFlags) {
            this._hasGeometryEdit = false;
            this._hasAttributeEdit = false;
          }

          if (addRes && addRes.hasOwnProperty('length') && addRes.length > 0 && addRes[0].hasOwnProperty('objectId')) {
            result.objectId = addRes[0].objectId;
          }

          if (!bypassSubmitCheck && updates && updates.hasOwnProperty('length') && updates.length > 0) {
            //enable submit
            var reviewView = this.featureView.parent._pageContainer.getViewByTitle('Review');
            reviewView._updateNode(reviewView.submitButton, true);
          }
          def.resolve(result);
        }), lang.hitch(this, function (err) {
          new Message({
            message: this.nls.warningsAndErrors.saveError
          });
          def.resolve({ status: "error", error: err });
        }));
        return def;
      },

      _setFieldValues: function (featureView) {
        var useFile = featureView._useValuesFromFile;
        var editIndexes = useFile ? featureView._changedFileAttributeRows : featureView._changedLayerAttributeRows;
        var _feature = featureView._feature;
        var feature = featureView.feature;
        array.forEach(featureView.featureControlTable.rows, function (row) {
          if (row.isEditRow && editIndexes.indexOf(row.rowIndex) > -1) {
            var control = (row.parent.isDuplicate && !useFile) ? row.layerValueTextBox : row.fileValueTextBox;
            _feature.attributes[row.fieldName] = control.value;
            var fieldInfo = feature.fieldInfo.filter(function (f) {
              return f.name === row.fieldName;
            })[0];
            fieldInfo.value = control.value;

            if (row.parent.isDuplicate && !useFile) {
              row.layerValue = control.value;
            } else {
              row.fileValue = control.value;
            }
            control.textbox.title = control.value;
          }
        });
      },

      _setAddressValues: function (featureView) {
        var addr = featureView._getAddress();
        var matchFieldPrefix = this.csvStore.matchFieldPrefix;
        array.forEach(featureView.addressFields, function (addrField) {
          var matchField = matchFieldPrefix + addrField.keyField;
          var field = featureView.feature.fieldInfo.filter(function (fi) {
            return fi.name === matchField;
          })[0];
          field.value = addr[matchField];

          var row = Array.from(featureView.locationControlTable.rows).filter(function (r) {
            return r.isAddressRow ? r.keyField === addrField.keyField : false;
          })[0];
          row.addressValueTextBox.textbox.title = addr[matchField];
          row.addressValue = addr[matchField];
        });
      },

      _updateFeature: function (location, skipApplyEdits, bypassSubmitCheck) {
        var fv = this.featureView;
        fv.feature.geometry = location;
        fv._feature.geometry = location;

        var features = [fv._feature];

        if (fv.isDuplicate) {
          this._hasGeometryEdit = ((fv._editFeature.geometry.x !== fv._feature.geometry.x) ||
            (fv._editFeature.geometry.y !== fv._feature.geometry.y));
        }

        if (!skipApplyEdits) {
          this._updateLayer(fv.layer, null, features, null, false, bypassSubmitCheck)
            .then(lang.hitch(this, function (result) {
              if (result && result.status === 'success') {
                this._panToAndSelectFeature(fv._feature);
                fv.emit('address-located');
              }
            }));
        }
      },

      _locateFeature: function (skipApplyEdits) {
        //skipApplyEdits is used to bypass applyEdits call to local layer when locating a
        // feature that was identified as a potential duplicate and the user then said it was not
        // a duplicate
        var def = new Deferred();
        var address = this.featureView._getAddressFieldsValues();
        if (this._isAddressFeature) {
          this._addressToLocation({
            address: address,
            countryCode: this.locatorSource.countryCode,
            outFields: ["ResultID", "Score"]
          }).then(lang.hitch(this, function (locationItem) {
            //reset the locator
            this.locator = this._getLocator(0);
            this._updateFeature(locationItem.location, skipApplyEdits, true);
            def.resolve({
              feature: this.featureView.feature,
              address: locationItem.address
            });
          }), function (err) {
            new Message({
              message: err.message
            });
          });
        } else {
          var geometry = this.csvStore._getGeometry(address[this.xField], address[this.yField]);
          this._updateFeature(geometry, skipApplyEdits, true);
          def.resolve({
            feature: this.featureView.feature,
            geometry: geometry
          });
        }
        return def;
      },

      _addressToLocation: function (address) {
        var def = new Deferred();
        address.maxLocations = 1;
        this.locator.addressToLocations(address, lang.hitch(this, function (result) {
          var minScore = this.csvStore.minScore;
          var highestScoreItem;
          if (result && result.length > 0) {
            array.forEach(result, function (item) {
              if (typeof (highestScoreItem) === 'undefined' && item.score >= minScore) {
                highestScoreItem = item;
              }
              if (highestScoreItem && item.score > highestScoreItem.score) {
                highestScoreItem = item;
              }
            });
            if (highestScoreItem) {
              def.resolve(highestScoreItem);
            } else {
              if (this._getNextLocator()) {
                this._addressToLocation(address).then(function (r) {
                  def.resolve(r);
                });
              } else {
                def.reject({ message: this.nls.warningsAndErrors.cannotLocate });
              }
            }
          } else {
            if (this._getNextLocator()) {
              this._addressToLocation(address).then(function (r) {
                def.resolve(r);
              });
            } else {
              def.reject({ message: this.nls.warningsAndErrors.cannotLocate });
            }
          }
        }), function (err) {
          def.reject(err);
        });
        return def;
      },

      _getNextLocator: function () {
        var newLocator = false;
        var _nextIndex = this._locatorIndex + 1;
        if (_nextIndex < this.csvStore._geocodeSources.length) {
          this.locator = this._getLocator(_nextIndex);
          newLocator = typeof(this.locator) !== 'undefined';
        }
        return newLocator;
      },

      _flashFeatures: function (features) {
        var layer;
        var _feature;
        array.forEach(features, lang.hitch(this, function (feature) {
          if (feature.geometry) {
            var color = Color.fromHex(this.styleColor);
            var color2 = lang.clone(color);
            color2.a = 0.4;
            var symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 15,
              new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, color, 1), color2);

            var g = new Graphic(feature.geometry, symbol);
            this.map.graphics.add(g);
            layer = g.getLayer ? g.getLayer() : layer;
            var dShape = g.getDojoShape();
            if (dShape) {
              fx.animateStroke({
                shape: dShape,
                duration: 900,
                color: {
                  start: dShape.strokeStyle.color,
                  end: dShape.strokeStyle.color
                },
                width: {
                  start: 25,
                  end: 0
                }
              }).play();
            }
            _feature = feature;
          }
        }));
        setTimeout(lang.hitch(this, function (layer) {
          if (layer && layer.clear) {
            layer.clear();
            if (features) {
              if ((features[0]._layer && features[0]._layer.infoTemplate) || features[0].infoTemplate) {
                this.map.infoWindow.setFeatures(features);
                this.map.infoWindow.select(0);
              }
            }
          }
        }), 1200, layer);
      },

      _panToAndSelectFeature: function (feature) {
        if (feature && feature.geometry) {
          var maxZoom = this.map.getMaxZoom();
          var factor = Math.round(maxZoom * 0.25);
          var zoom = (maxZoom - factor) > 0 ? (maxZoom - factor) : maxZoom;
          this.map.centerAndZoom(feature.geometry, zoom).then(lang.hitch(this, function () {
            this._flashFeatures([feature]);
          }));
        }
      },

      setStyleColor: function (styleColor) {
        this.styleColor = styleColor;
      },

      _updateEdit: function (disabled) {
        this._editDisabled = disabled;
        this._updateImageNode('bg-edit', 'bg-edit-white', 'bg-edit-disabled',
          this._editDisabled, this.domNode);
      },

      _updateCancel: function (disabled) {
        this._cancelDisabled = disabled;
        this._updateImageNode('bg-cancel', 'bg-cancel-white', 'bg-cancel-disabled',
          this._cancelDisabled, this.domNode);
      },

      _updateSaveAndCancel: function (disabled) {
        //update save
        this._updateSave(disabled);

        //update cancel
        this._updateCancel(disabled);
      },

      _updateSave: function (disabled) {
        //update save
        this._saveDisabled = disabled;
        this._updateImageNode('bg-save', 'bg-save-white', 'bg-save-disabled',
          this._saveDisabled, this.domNode);
      },

      _updateLocate: function (disabled) {
        this._locateDisabled = disabled;
        this._updateImageNode('bg-locate', 'bg-locate-white', 'bg-locate-disabled',
          this._locateDisabled, this.featureView.locateButton.domNode);
      },

      _updateSync: function (disabled) {
        this._syncDisabled = disabled;
        if (this.featureView.syncFields) {
          this._updateImageNode('bg-sync', 'bg-sync-white', 'bg-sync-disabled',
            this._syncDisabled, this.featureView.syncFields.domNode);
        }
      },

      updateImageNodes: function () {
        //toggle all images
        this._updateImageNode('bg-edit', 'bg-edit-white', 'bg-edit-disabled',
          this._editDisabled, this.domNode);
        this._updateImageNode('bg-cancel', 'bg-cancel-white', 'bg-cancel-disabled',
          this._cancelDisabled, this.domNode);
        this._updateImageNode('bg-save', 'bg-save-white', 'bg-save-disabled',
          this._saveDisabled, this.domNode);
        this._updateImageNode('bg-locate', 'bg-locate-white', 'bg-locate-disabled',
          this._locateDisabled, this.domNode);
        this._updateImageNode('bg-sync', 'bg-sync-white', 'bg-sync-disabled',
          this._syncDisabled, this.featureView.syncFields.domNode);
      },

      _updateImageNode: function (img, imgWhite, imgDisabled, isDisabled, node) {
        var isDark = this._darkThemes.indexOf(this.theme) > -1;
        var addClass = isDisabled ? imgDisabled : isDark ? imgWhite : img;

        //var removeClass = isDark ? img : imgWhite;
        var removeClass = imgWhite;
        var nodesFound = false;
        var imageNodes = query('.' + img, node);
        if (imageNodes.hasOwnProperty('length') && imageNodes.length === 0) {
          imageNodes = query('.' + imgDisabled, node);
        } else {
          nodesFound = true;
          removeClass = img;
        }

        if (!nodesFound && imageNodes.hasOwnProperty('length') && imageNodes.length === 0) {
          imageNodes = query('.' + imgWhite, node);
        } else {
          if (!nodesFound) {
            nodesFound = true;
            removeClass = imgDisabled;
          }
        }
        array.forEach(imageNodes, function (node) {
          domClass.remove(node, removeClass);
          domClass.add(node, addClass);
        });
      },

      updateTheme: function (theme) {
        this.theme = theme;
      }
    });
  });