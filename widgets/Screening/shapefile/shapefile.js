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
  'dojo/text!./shapefile.html',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/json',
  'dojo/Evented',
  'esri/layers/FeatureLayer',
  'esri/request',
  'jimu/BaseWidget',
  'jimu/dijit/Message'
], function (
  declare,
  template,
  _WidgetsInTemplateMixin,
  lang,
  on,
  JSON,
  Evented,
  FeatureLayer,
  request,
  BaseWidget,
  Message
) {
  return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
    // Set base class for custom placename widget
    baseClass: 'jimu-widget-screening-shapefile',

    // Set base template to templateString parameter
    templateString: template,

    // Values of the following variables need to be set before using the widget
    _uploadFormChange: null, // Change event handler of form to upload shapefile
    nls: null, //to store nls strings
    config: null, //to store widget configuration
    map: null, //to store map instance

    constructor: function (options) {
      this._uploadFormChange = null;
      this.nls = null;
      this.config = null;
      this.map = null;
      lang.mixin(this, options);
    },

    postCreate: function () {
      this._attachEventsToUploadShapefileButton();
      // Attach file input change event
      this._attachFileInputOnChangeEvent();
    },

    /**
     * This function is to attach click event to shapefile button div container
     * @memberOf Screening/shapefile/shapefile
     */
    _attachEventsToUploadShapefileButton: function () {
      this.own(on(this.uploadShapefileButton, "click", lang.hitch(this, function () {
        this.shapefileInput.click();
      })));
    },

    /**
     * This function is to attach shapefile clear AOI button click event
     * @memberOf Screening/shapefile/shapefile
     */
    _attachFileInputOnChangeEvent: function () {
      var generateFeatureCollectionParameter;
      if (this._uploadFormChange) {
        this._uploadFormChange.remove();
      }
      // On selecting file input
      this._uploadFormChange = this.own(on.pausable(this.uploadForm, "change", lang.hitch(this,
        function (event) {
          // Show loading indicator
          this.loadingIndicator.show();
          // Set parameter generate feature collection
          generateFeatureCollectionParameter = {
            "filename": event.target.value.toLowerCase()
          };
          // This function will generate feature collection from shapefile
          this._generateFeatureCollection(
            generateFeatureCollectionParameter);
        })));
    },

    /**
     * This function will generate feature collection from shapefile
     * @param{object} contains key as listed below,
     * 1. 'filename' of the input file selected
     * @memberOf Screening/shapefile/shapefile
     */
    _generateFeatureCollection: function (
      generateFeatureCollectionParameter) {
      var name, params, requestFeatureCollectionParameter;
      name = generateFeatureCollectionParameter.filename.split(".");
      // Chrome and IE add c:\fakepath to the value - we need to remove it
      name = name[0].replace("c:\\fakepath\\", "");
      // Define the input params for generate see the rest doc for details
      params = {
        'name': name,
        'targetSR': this.map.spatialReference,
        'maxRecordCount': this.config.maxFeaturesForAnalysis
      };
      requestFeatureCollectionParameter = {
        "params": params
      };
      // This function will request to get feature collection
      this._requestFeatureCollection(
        requestFeatureCollectionParameter);
    },

    /**
     * This function will request to get feature collection
     * @param{object} contains key as listed below
     * 1. 'params' contains parameter to generate JSON
     * @memberOf Screening/shapefile/shapefile
     */
    _requestFeatureCollection: function (
      requestFeatureCollectionParameter) {
      var content, layer, featureLayer;
      // Set content parameter for requesting feature collection
      content = {
        'filetype': 'shapefile',
        'publishParameters': JSON.stringify(
          requestFeatureCollectionParameter.params),
        'f': 'json'
      };
      // Use the rest generate operation to generate a feature collection from the zipped shapefile
      request({
        url: this.config.generateFeatureCollectionURL,
        content: content,
        form: this.uploadForm,
        handleAs: 'json',
        load: lang.hitch(this, function (response) {
          if (response.error) {
            // Hide loading indicator
            this.loadingIndicator.hide();
            this._showMessage(this.nls.shapefileWidget.unableToUploadShapefileMessage);
            return;
          }
          layer = response.featureCollection.layers[0];
          this._uploadFormChange[0].pause();
          featureLayer = new FeatureLayer(layer);
          this.shapefileInput.value = "";
          this._uploadFormChange[0].resume();
          // On success of uploading a shapefile emit onShapefileUpload event
          this.emit("onShapefileUpload", featureLayer);
          // Hide loading indicator
          this.loadingIndicator.hide();
        }),
        error: lang.hitch(this, function (err) {
          this._uploadFormChange[0].pause();
          this.shapefileInput.value = "";
          this._uploadFormChange[0].resume();
          // Hide loading indicator
          this.loadingIndicator.hide();
          if (err.code === 400) {
            if (err.details && err.details.length > 0) {
              this._showMessage(this.nls.shapefileWidget.unableToUploadShapefileMessage + " " + err.details[0]);
            } else {
              this._showMessage(this.nls.shapefileWidget.unableToUploadShapefileMessage + " " + err.message);
            }
          } else {
            this._showMessage(this.nls.shapefileWidget.unableToUploadShapefileMessage + " " + err.message);
          }
        })
      });
    },

    /**
     * Create and show alert message.
     * @param {string} msg
     * @memberOf Screening/shapefile/shapefile
     **/
    _showMessage: function (msg) {
      var alertMessage = new Message({
        message: msg
      });
      alertMessage.message = msg;
    }
  });
});