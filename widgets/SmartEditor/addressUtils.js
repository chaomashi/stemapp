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
  "dojo/_base/lang",
  'dojo/Deferred',
  "dojo/on",
  "esri/tasks/locator",
  "dijit/_WidgetBase"
],
  function (
    declare,
    lang,
    Deferred,
    on,
    Locator,
    _WidgetBase
  ) {
    return declare([_WidgetBase], {
      _locatorInstance: null,

      postCreate: function () {
        this._initReverseGeocoder();
      },

      _initReverseGeocoder: function () {
        if (this.config.geocoderSettings && this.config.geocoderSettings.url) {
          //create the locator instance to reverse geocode the address
          this._locatorInstance = new Locator(this.config.geocoderSettings.url);
          this.own(on(this._locatorInstance, "location-to-address-complete",
            lang.hitch(this, this._onLocationToAddressComplete)));
          this.own(on(this._locatorInstance, "error",
            lang.hitch(this, function () {
              this._onLocationToAddressComplete({});
            })));
        }
      },

      locateAddress: function (geometry) {
        this.returnDef = new Deferred();
        if (this._locatorInstance) {
          this._locatorInstance.locationToAddress(geometry, 100);
        } else {
          this._onLocationToAddressComplete({});
        }
        return this.returnDef.promise;
      },

      _onLocationToAddressComplete: function (result) {
        //check if address available
        if (result && result.address && result.address.address) {
          result = result.address.address;
        }
        if (this.returnDef) {
          this.returnDef.resolve(result);
        }
      }
    });
  });
