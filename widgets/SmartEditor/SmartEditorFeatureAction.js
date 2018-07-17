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
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/Deferred',
  'jimu/BaseFeatureAction',
  'jimu/Role',
  'jimu/WidgetManager',
  'dojo/query',
  'jimu/PopupManager',
  'dojo/aspect'
], function (
  declare,
  array,
  lang,
  Deferred,
  BaseFeatureAction,
  Role,
  WidgetManager,
  query,
  PopupManager,
  aspect
) {
  var clazz = declare(BaseFeatureAction, {

    _viewedFeatureIdArr: [], // to store the feature of a layer and table that is being viewed in info-window
    _widgetInstance: null, // to store widget instance
    _config: null, // to store widget config
    _layerFoundDetail: {}, // to store the details of layer that are traversed/viewed by user in info-window
    _isInfoWindowBackBtnClickHandle: false, // to raise a flag that states that back button of info
    _viewedFeatureDetailedArr: [],
    _viewedFeatureArr: [], // to store the feature as traversed in info-window

    map: null,
    iconClass: 'icon-edit',

    /**
     * This function detects that related record is displayed in info-window in open state
     */
    _isRelatedRecordDisplayed: function () {
      // info-window is open -> shows loading text -> related records is displayed : consider as open
      var relatedRecordContainer = query(".related-records-popup-projector", this.map.infoWindow.domNode);
      if (relatedRecordContainer && relatedRecordContainer.length > 0) {
        return true;
      }
      return false;
    },

    /**
     * This function is used to check whether layer of feature that is currently in info-window is configured or not
     */
    _isLayerConfigured: function (layerId) {
      var showOption;
      showOption = false;

      // when user traverse from no results found of related records to some layer, layerid is undefined
      if (!layerId) {
        return false;
      }

      this._viewedFeatureDetailedArr = [];

      array.forEach(this._viewedFeatureIdArr, lang.hitch(this, function (viewedFeatureId, index) {
        if (!(this._layerFoundDetail[viewedFeatureId])) {
          // from here onwards search should be in relationship info
          if (index > 0) {
            // find in all the relationship info
            // this._layerFoundDetail[this._viewedFeatureIdArr[index - 1]] -> table is detected and search should be in its immediate parent
            if (this._layerFoundDetail[this._viewedFeatureIdArr[index - 1]] &&
              this._layerFoundDetail[this._viewedFeatureIdArr[index - 1]].relationshipInfos) {
              showOption =
                this._showWidgetFeatureAction(
                  this._layerFoundDetail[this._viewedFeatureIdArr[index - 1]].relationshipInfos,
                  viewedFeatureId);
            } else {
              showOption = false;
            }
            this._viewedFeatureDetailedArr.push(showOption);
            // once layer is found store its details to continue from this info further while searching next traversed layer
            if (showOption) {
              this._layerFoundDetail[viewedFeatureId] = showOption;
            }
          } else {
            // find in all the feature layer
            // this._config.editor.layerInfos -> this is initial search and hence layerinfos of config is used
            showOption = this._showWidgetFeatureAction(this._config.editor.layerInfos, viewedFeatureId);
            this._viewedFeatureDetailedArr.push(showOption);
            // once layer is found store its details to continue from this info further while searching next traversed layer
            if (showOption) {
              this._layerFoundDetail[viewedFeatureId] = showOption;
            }
          }
        } else if (index > 0) {
          // if layer is available in webmap but it is not available in traverse
          // For e.g. if configured traverse is Layer1->Table1->Layer1 and user is viewing feature of
          // Layer1->Table1->Layer1->Table1 in info-window than feature of last Table1 should not display the smarteditor option
          if (this._layerFoundDetail[this._viewedFeatureIdArr[index - 1]] &&
            this._layerFoundDetail[this._viewedFeatureIdArr[index - 1]].relationshipInfos) {
            showOption =
              this._showWidgetFeatureAction(
                this._layerFoundDetail[this._viewedFeatureIdArr[index - 1]].relationshipInfos,
                viewedFeatureId);
          } else {
            showOption = false;
          }
          this._viewedFeatureDetailedArr.push(showOption);
          if (showOption) {
            this._layerFoundDetail[viewedFeatureId] = showOption;
          }
          // consider configuration as layer1->table1->layer1
          // when user is viewing layer1, info-window displays list of related table as table1 and others
          // to access the record of table user needs to click on table1 and than its record
          // in this case on both click same layer is returned in traverse array, and due to this option was not getting displayed for second click feature
          // hence, we check if previous layer is same as current layer and consider it as a true and display its option
          if (this._viewedFeatureIdArr[index - 1] === viewedFeatureId) {
            if (this._viewedFeatureDetailedArr[index - 1]) {
              showOption = true;
            } else {
              showOption = false;
            }
          }
        } else if (index === 0) {
          // when user traverse back again to first layer
          showOption = this._showWidgetFeatureAction(this._config.editor.layerInfos, viewedFeatureId);
          this._viewedFeatureDetailedArr.push(showOption);
          if (showOption) {
            this._layerFoundDetail[viewedFeatureId] = showOption;
          }
        }
      }));
      // detects whether smarteditor option should be displayed or not
      if (showOption) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * This function detects whether info-window is opened, closed or in closing state
     */
    _isInfoWindowShowing: function () {
      // here map object gets available with the help of BaseFeatureAction class
      if (this.map.infoWindow.isShowing) {
        // after switching from one feature to another, this function gets executed when info-window is still closing
        // hence, we need to handle following cases
        // info-window is open -> shows loading text : consider as close
        var statusContainer = query(".statusSection", this.map.infoWindow.domNode);
        if (statusContainer && statusContainer.length > 0) {
          // info-window is open -> shows loading text -> related records is displayed : consider as open
          if (this._isRelatedRecordDisplayed()) {
            return true;
          }
          // info-window is open -> shows loading text : consider as close
          return false;
        }
        // info-window is open -> related records is displayed : consider as open
        if (this._isRelatedRecordDisplayed()) {
          return true;
        }
        return true;
      } else {
        // if info-window is closed
        return false;
      }
      // default
      return false;
    },

    /**
     * This function is used to get the configuration of a widget
     */
    _getWidgetConfig: function () {
      if (!this._widgetInstance) {
	    this._widgetInstance = this.appConfig.getConfigElementById(this.widgetId);  
      }
      if (!this._config && this._widgetInstance) {
        // once widget is found get its config
        this._config = this._widgetInstance.config;
      }
      if (this._config) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * This function is used to detect that back button of info-window is clicked
     */
    _detectInfoWindowBackBtnClick: function () {
      var popupManagerInstance, relatedRecordsPopupProjectorInstance;
      //remove if previous handle available
      if (this._isInfoWindowBackBtnClickHandle) {
        this._isInfoWindowBackBtnClickHandle.remove();
        this._isInfoWindowBackBtnClickHandle = null;
      }
      // get the current instance of popup manager
      popupManagerInstance = PopupManager.getInstance(this);
      if (popupManagerInstance) {
        // get the current instance of related records popup projector
        relatedRecordsPopupProjectorInstance = popupManagerInstance._relatedRecordsPopupProjector;
        if (relatedRecordsPopupProjectorInstance) {
          this._isInfoWindowBackBtnClickHandle = aspect.before(relatedRecordsPopupProjectorInstance,
            "_onPreviouBtnClick", lang.hitch(this, function () {
              this._isInfoWindowBackBtnClicked = true;
            }));
        }
      }
    },

    /**
     * This function detects whether to display smartEditor option in info-window or not
     */
    isFeatureSupported: function (featureSet, layerParam) {
      var currentLayerId;
      // detects that back button of info-window is clicked
      this._detectInfoWindowBackBtnClick();
      // when no records are displayed in info-window layerparam is undefined
      currentLayerId = layerParam && layerParam.id ? layerParam.id : layerParam;
      // get config
      var hasValidConfig = this._getWidgetConfig();
      if (!hasValidConfig) {
        return false;
      }
      // clear this array when user switches from one feature to another of same/different layer
      if (!this._isInfoWindowShowing()) {
        this._viewedFeatureIdArr = [];
        this._layerFoundDetail = {};
        this._viewedFeatureDetailedArr = [];
        this._viewedFeatureArr = [];
      }
      // detects the linage of features viewed in info-window
      if (this._isInfoWindowBackBtnClicked) {
        this._isInfoWindowBackBtnClicked = false;
        // if back button is clicked than remove the layer from this array
        this._viewedFeatureIdArr.pop();
        // if user is traversing further than remove feature of that layer in this array
        this._viewedFeatureArr.pop();
      } else {
        // if user is traversing further than add the layer in this array
        this._viewedFeatureIdArr.push(currentLayerId);
        // if user is traversing further than add feature of that layer in this array
        this._viewedFeatureArr.push(featureSet.features);
      }
      // checks layer is configured or not
      if (!this._isLayerConfigured(currentLayerId)) {
        return false;
      }
      return true;
    },

    /**
     * This function gets executed when user clicks on smart editor option in info-window
     */
    onExecute: function (featureSet, layerParam) {
      //jshint unused:false
      var layer = layerParam ||
        lang.getObject('_wabProperties.popupInfo.layerForActionWithEmptyFeatures', false, this.map.infoWindow);
      var def = new Deferred();
      WidgetManager.getInstance().triggerWidgetOpen(this.widgetId).then(lang.hitch(this, function (smartEditor) {
        smartEditor.beginEditingByFeatures(
          featureSet.features, layer, this._viewedFeatureIdArr, this._viewedFeatureArr);
      }));
      return def.promise;
    },

    _checkEditPrivilege: function (user) {
      var hasEditPrivilege = true;
      if (user) {
        var userRole = new Role({
          id: (user.roleId) ? user.roleId : user.role,
          role: user.role
        });
        if (user.privileges) {
          userRole.setPrivileges(user.privileges);
        }

        hasEditPrivilege = userRole.canEditFeatures();
      }
      return hasEditPrivilege;
    },

    _hasAnyEditableLayerInRelation: function (layerInfos) {
      var showLayer = false;
      array.forEach(layerInfos, lang.hitch(this, function (layer) {
        if (layer._editFlag === true) {
          showLayer = true;
        } else if (layer.relationshipInfos && layer.relationshipInfos.length > 0) {
          showLayer = this._hasAnyEditableLayerInRelation(layer.relationshipInfos);
        }
        if (showLayer) {
          return true;
        }
      }));
      return showLayer;
    },

    _showWidgetFeatureAction: function (layerInfos, viewedFeatureId) {
      var showOption = false;
      //return false if layer/relationship does not exist
      if (!layerInfos) {
        return showOption;
      }
      array.some(layerInfos, lang.hitch(this, function (detailsObj) {
        if (detailsObj.featureLayer.id === viewedFeatureId) {
          showOption = detailsObj;
          return true;
        }
      }));
      //if show option is valid and has relations,
      //check if it has atleast one editable relation then only show it
      if (showOption) {
        var showRelatedLayer;
        //In case if backward compatibility "_editFlag" will not be available in config
        //and only layers were allowed to configure, so no need to check for relations
        if (showOption.hasOwnProperty("_editFlag")) {
          showRelatedLayer = showOption._editFlag;
          if (!showOption._editFlag &&
            showOption.relationshipInfos && showOption.relationshipInfos.length > 0) {
            showRelatedLayer =
              this._hasAnyEditableLayerInRelation(showOption.relationshipInfos);
          }
          if (!showRelatedLayer) {
            showOption = false;
          }
        }
      }
      return showOption;
    }
  });
  return clazz;
});