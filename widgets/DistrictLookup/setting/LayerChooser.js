///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  'dojo/_base/declare',
  'jimu/BaseWidgetSetting',
  "dijit/_WidgetsInTemplateMixin",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/promise/all",
  "dojo/Deferred",
  "dojo/on",
  "dojo/dom-class",
  "dojo/text!./LayerChooser.html",
  "jimu/dijit/LayerChooserFromMap",
  "jimu/dijit/LayerChooserFromMapWithDropbox",
  "esri/request",
  "jimu/dijit/LoadingIndicator",
  "jimu/dijit/Message",
  "dojo/domReady!"
], function (
  declare,
  BaseWidgetSetting,
  _WidgetsInTemplateMixin,
  lang,
  array,
  all,
  Deferred,
  on,
  domClass,
  layerChooserTemplate,
  LayerChooserFromMap,
  LayerChooserFromMapWithDropbox,
  esriRequest,
  LoadingIndicator,
  Message
) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-districtlookup-setting',
    templateString: layerChooserTemplate,
    selectRouteURL: null,
    agolFlag: false,
    serviceFlag: false,

    startup: function () {
      this.inherited(arguments);
    },

    postCreate: function () {
      //Create layer chooser
      this._createPrecinctChooserArgs();

      this.own(on(this.cancelButton, 'click', lang.hitch(this,
        function (evt) {
          this.onCancleClick(evt);
        })));
      this.own(on(this.okButton, 'click', lang.hitch(this, this._onOKButtonClicked)));
      this._initLoading();
    },

    _onNextButtonClicked: function () {
      if (!domClass.contains(this.btnNext, "jimu-state-disabled")) {
        //Hide layer selector
        domClass.add(this.itemSelectDiv, "esriCTHidden");
        //Show Related layer selector
        domClass.remove(this.relatedLayerSelectDiv, "esriCTHidden");
        //Hide Next button
        domClass.add(this.btnNext, "esriCTHidden");
        //Show Back button
        domClass.remove(this.btnBack, "esriCTHidden");
        if (this.relationshipSelect.value === "") {
          this._errorMessage(this.nls.layerSelector.polygonLayerNotHavingRelatedLayer);
          //Disable the ok button
          domClass.add(this.okButton, "jimu-state-disabled");
        } else {
          //Enable the ok button
          domClass.remove(this.okButton, "jimu-state-disabled");
        }

      }
    },

    _onOKButtonClicked: function () {
      var selectedLayerDetails;
      //check if ok button is enabled
      if (!domClass.contains(this.okButton, "jimu-state-disabled")) {
        //if invalid polygon layer info return error
        //if invalid related layer info return error
        //if both the infos are valid return the data
        if (!this.precinctLayerInfo) {
          this._errorMessage(this.nls.layerSelector.errorInSelectingPolygonLayer);
          return false;
        } else if (this.relationshipSelect.value === "") {
          this._errorMessage(this.nls.layerSelector.errorInSelectingRelatedLayer);
          return false;
        } else {
          selectedLayerDetails = {
            "polygonLayerInfo": this.precinctLayerInfo,
            "relatedLayerInfo": this.pollingPlaceInfo[this.relationshipSelect
              .value]
          };
          this.onOkClick(selectedLayerDetails);
        }
      }
    },
    /**
    * This function is used to create precinct layer drop down.
    * @memberOf widgets/ElectionPolling/settings/Settings
    **/
    _createPrecinctChooserArgs: function () {
      var args, templayerChooserFromMap, layerChooserFromMap, types, featureLayerFilter,
       queryableLayerFilter, filters;
      types = ['polygon'];
      featureLayerFilter = LayerChooserFromMap.createFeaturelayerFilter(types, false);
      queryableLayerFilter = LayerChooserFromMap.createQueryableLayerFilter();
      filters = [featureLayerFilter, queryableLayerFilter];
      args = {
        multiple: false,
        createMapResponse: this.map.webMapResponse,
        showLayerTypes: ['FeatureLayer'],
        filter: LayerChooserFromMap.andCombineFilters(filters)
      };
      templayerChooserFromMap = new LayerChooserFromMap(args);
      layerChooserFromMap = new LayerChooserFromMapWithDropbox({
        layerChooser: templayerChooserFromMap
      });
      layerChooserFromMap.placeAt(this.itemSelectDiv);
      layerChooserFromMap.startup();
      this.own(on(layerChooserFromMap, 'selection-change', lang.hitch(
        this, this._createPollingPlaceLayerOptions)));
    },

    /**
    * This function used for loading indicator
    * @memberOf widgets/DistrictLookup/settings/networkAnalysisChooser.js
    */
    _initLoading: function () {
      this.loading = new LoadingIndicator({
        hidden: true
      });
      this.loading.placeAt(this.domNode);
      this.loading.startup();
    },

    onOkClick: function (evt) {
      return evt;
    },

    onCancleClick: function (evt) {
      return evt;
    },

    /**
    * This function is used to create Polling Place drop down from selected precinct layer.
    * @memberOf widgets/ElectionPolling/settings/Settings
    **/
    _createPollingPlaceLayerOptions: function (selectedPrecinctLayer) {
      var options = [],
        deferredLayerInfoArray;
      if (selectedPrecinctLayer && selectedPrecinctLayer.length > 0) {
        this.precinctLayer = selectedPrecinctLayer[0];
        this.precinctLayerInfo = {
          "url": this.precinctLayer.url,
          "geometryType": "esriGeometryPolygon",
          "id": selectedPrecinctLayer[0].id
        };
        if (this.precinctLayer.layerId) {
          this.precinctLayerInfo.layerId = this.precinctLayer.layerId;
        } else {
          this.precinctLayerInfo.layerId = this.precinctLayer.url
            .substr(this.precinctLayer.url.lastIndexOf('/') + 1,
              this.precinctLayer.url.length);
        }
        var baseURL = this.precinctLayer.url.substr(0, this.precinctLayer
          .url.lastIndexOf('/') + 1);
        this.precinctLayerInfo.baseURL = baseURL;
        this.pollingPlaceInfo = [];
        deferredLayerInfoArray = [];
        array.forEach(this.precinctLayer.relationships, lang.hitch(
          this,
          function (item) {
            var selectedDeferred = new Deferred();
            deferredLayerInfoArray.push(selectedDeferred);
            esriRequest({
              url: baseURL + item.relatedTableId,
              content: {
                f: 'json'
              },
              handleAs: 'json'
            }).then(lang.hitch(this, function (response) {
              selectedDeferred.resolve(response);
            }), lang.hitch(this, function () {
              selectedDeferred.resolve();
            }));
          }));
        all(deferredLayerInfoArray).then(lang.hitch(this, function (
          result) {
          var pollingPlaceInfo;
          //create new options for polling place layer selector according to selected precinct layer
          for (var i = 0; i < result.length; i++) {
            if (result[i] && result[i].geometryType ===
              "esriGeometryPoint") {
              pollingPlaceInfo = {
                "url": baseURL + result[i].id,
                "baseURL": baseURL,
                "relationShipId": this.precinctLayer.relationships[
                  i].id,
                "layerId": result[i].id,
                "geometryType": "esriGeometryPoint",
                "title": result[i].name
              };
              if (pollingPlaceInfo.title) {
                this.pollingPlaceInfo[options.length] =
                  pollingPlaceInfo;
                options.push({
                  label: this.pollingPlaceInfo[options.length]
                    .title,
                  value: options.length
                });
              }
            }
          }
          //set new options according to selected precinct layer
          if (options.length > 0) {
            //remove previous options
            this.relationshipSelect.options.length = 0;
            //set first option by default
            options[0].selected = true;
            //set new options in polling place selector
            this.relationshipSelect.addOption(options);
            //Enable ok button
            domClass.remove(this.okButton,
              "jimu-state-disabled");
          } else {
            //remove previous options
            this._resetRelatedLayerSelector();
          }
        }), lang.hitch(this, function () {
          this._resetRelatedLayerSelector();
        }));
      } else {
        //remove previous options
        this._resetRelatedLayerSelector();
      }
    },

    /**
    * This function is used to reset the Polling Place drop down.
    * @memberOf widgets/DistrictLookup/settings/Settings
    **/
    _resetRelatedLayerSelector: function () {
      this.relationshipSelect.value = "";
      this.relationshipSelect.options.length = 0;
      this.relationshipSelect.addOption({
        value: "",
        label: "",
        selected: true
      });
      //Disable OK button
      domClass.add(this.okButton, "jimu-state-disabled");
      //Show error as the selected polygon layer is not having any valid related point layers
      this._errorMessage(this.nls.layerSelector.polygonLayerNotHavingRelatedLayer);
    },

    _onBtnBackClicked: function () {
      domClass.remove(this.itemSelectDiv, "esriCTHidden");
      domClass.add(this.relatedLayerSelectDiv, "esriCTHidden");
      domClass.remove(this.btnNext, "esriCTHidden");
      domClass.add(this.btnBack, "esriCTHidden");
    },

    /**
    * This function create error alert.
    * @param {string} err
    * @memberOf widgets/DistrictLookup/settings/networkAnalysisChooser.js
    **/
    _errorMessage: function (err) {
      var errorMessage = new Message({
        message: err
      });
      errorMessage.message = err;
    }

  });
});