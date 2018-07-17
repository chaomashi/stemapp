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
    'dojo/_base/lang',
    'dojo/on',
    'dojo/_base/html',
    'dojo/_base/config',
    'dojo/Deferred',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidgetSetting',
    'jimu/utils',
    'jimu/portalUtils',
    './PresetDestinations',
    'jimu/dijit/Message',
    //'esri/request',
    'jimu/dijit/CheckBox',
    'jimu/dijit/ServiceURLComboBox',
    'jimu/dijit/ServiceURLInput',
    'dijit/form/NumberSpinner',
    'dijit/form/ValidationTextBox',
    'dijit/form/Select'
  ],
  function(declare, lang, on, html, dojoConfig, Deferred, _WidgetsInTemplateMixin, BaseWidgetSetting,
           jimuUtils, portalUtils, PresetDestinations, Message, /*esriRequest,*/ CheckBox) {

    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-directions-setting',
      _ROUTE_WORLD: "Route_World",
      _serviceUrlInputInvalidClass: "jimu-serviceurl-input-invalid",
      _routeTaskUrl:'http://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/',//Route_World',
      _locatorUrl:'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer',
      _travelModesUrl: "http://logistics.arcgis.com/arcgis/rest/services/World/Utilities/GPServer",
      _trafficLayerUrl: "http://traffic.arcgis.com/arcgis/rest/services/World/Traffic/MapServer",

      postMixInProperties: function(){
        if(!this.nls.complete){
          this.nls.complete = 'Complete';
        }
        if(!this.nls.completeNoEvents){
          this.nls.completeNoEvents = 'Complete No Events';
        }
        if(!this.nls.instructionsOnly){
          this.nls.instructionsOnly = 'Instructions Only';
        }
        if(!this.nls.standard){
          this.nls.standard = 'Standard';
        }
        if(!this.nls.summaryOnly){
          this.nls.summaryOnly = 'Summary Only';
        }
        if(!this.nls.travelModesUrl){
          this.nls.travelModesUrl = "Travel Modes URL";
        }
        if (!this.nls.example) {
          this.nls.example = this.nls.optional + " " + window.jimuNls.basicServiceChooser.example + " : ";
        }
      },

      postCreate: function() {
        this.inherited(arguments);
        this.autoComplete = new CheckBox();
        this.autoComplete.placeAt(this.autoCompleteTd, 'first');
        html.addClass(this.autoComplete.domNode, 'class', 'jimu-float-leading');

        this.portal = portalUtils.getPortal(this.appConfig.portalUrl);

        this.routeUrl.setProcessFunction(lang.hitch(this, function(result) {
          var isRouteLayer = false;
          if (result && result.data) {
            isRouteLayer = result.data.layerType === 'esriNAServerRouteLayer';
          }

          if (true === isRouteLayer) {
            //if it is a isRouteLayer, use it as is
            return isRouteLayer;
          } else {
            //not a isRouteLayer, select a layer form data.routeLayers
            this._setRouteUrl(result);
            //this.routeUrl.focus();
            //this.routeUrl.openDropDown();
            var url = this._getHandledUrlFromServiceUrlInput(this.routeUrl);
            var reg = /\/rest\/services\/.+\/NAServer/i;
            return reg.test(url);
          }
        }));

        this.locatorUrl.setProcessFunction(lang.hitch(this, function(){
          var url = this._getHandledUrlFromServiceUrlInput(this.locatorUrl);
          var reg = /\/rest\/services\/.+\/GeocodeServer/gi;
          return reg.test(url);
        }));

        this.travelModesUrl.setProcessFunction(lang.hitch(this, function(){
          var url = this._getHandledUrlFromServiceUrlInput(this.travelModesUrl);
          var reg = /\/rest\/services\/.+\/GPServer/gi;
          return reg.test(url);
        }), lang.hitch(this, function(){
          if(!this.travelModesUrl.get('value')){
            html.removeClass(this.travelModesUrl.domNode, this._serviceUrlInputInvalidClass);
          }
        }));

        this.trafficLayerUrl.setProcessFunction(lang.hitch(this, function(){
           var url = this._getHandledUrlFromServiceUrlInput(this.trafficLayerUrl);
           var reg = /\/rest\/services\/.+\/MapServer/gi;
           return reg.test(url);
         }), lang.hitch(this, function(){
           if(!this.trafficLayerUrl.get('value')){
             html.removeClass(this.trafficLayerUrl.domNode, this._serviceUrlInputInvalidClass);
           }
         }));

        this.portal.loadSelfInfo().then(lang.hitch(this, function(portalSelf){
          var routeUrlFromPortal = this._getRouteUrlFromPortalSelf(portalSelf);
          if(routeUrlFromPortal){
            this.routeUrl.set('placeHolder', routeUrlFromPortal);
          }
          var locatorUrlFromPortal = this._getLocatorUrlFromPortalSelf(portalSelf);
          if(locatorUrlFromPortal){
            this.locatorUrl.set('placeHolder', locatorUrlFromPortal);
          }
          var travelModesUrlFromPortal = this._getTravelModesUrlFromPortalSelf(portalSelf);
          if (travelModesUrlFromPortal) {
            this.travelModesUrl.set('placeHolder', this.nls.example + travelModesUrlFromPortal);
          } else {
            this.travelModesUrl.set('placeHolder', this.nls.example + this._travelModesUrl);
          }

          var trafficLayerUrlFromPortal = this._getTrafficLayerUrlFromPortalSelf(portalSelf);
          if(trafficLayerUrlFromPortal){
            this.trafficLayerUrl.set('placeHolder', this.nls.example + trafficLayerUrlFromPortal);
          } else {
            this.trafficLayerUrl.set('placeHolder', this.nls.example + this._trafficLayerUrl);
          }
        }));

        this.presetDestinations = new PresetDestinations({
          nls: this.nls,
          defaultLocations: this.config.defaultLocations
        }, this.presetDestinations);
        this.presetDestinations.startup();
      },

      _getHandledUrlFromServiceUrlInput: function(dijit){
        var value = dijit.get('value');
        var url = jimuUtils.removeSuffixSlashes(value);
        return url;
      },

      startup: function(){
        this.inherited(arguments);
        this._setPresetDestinationsSources();

        this.setConfig(this.config);
      },

      setConfig: function(config) {
        this.config = config;
        if(!this.config){
          return;
        }

        var geocoderOptions = this.config.geocoderOptions;
        if(geocoderOptions && typeof geocoderOptions === 'object'){
          this.autoComplete.setValue(geocoderOptions.autoComplete === true);
          this.maximumSuggestions.set('value', geocoderOptions.maxLocations);
          this.minCharacters.set('value', geocoderOptions.minCharacters);
          this.searchDelay.set('value', geocoderOptions.searchDelay);
          var geocoders = geocoderOptions.geocoders;
          if(geocoders && geocoders.length > 0){
            var geocodeArgs = geocoders[0];
            this.placeholder.set('value', geocodeArgs.placeholder || '');
          }
        }

        var routeOptions = this.config.routeOptions;
        if(routeOptions && typeof routeOptions === 'object'){
          var language = routeOptions.directionsLanguage || dojoConfig.locale || "en_us";
          this.directionsLanguage.set('value', language);
          this.directionsLengthUnits.set('value', routeOptions.directionsLengthUnits);
          this.directionsOutputType.set('value', routeOptions.directionsOutputType);
          this.impedanceAttribute.set('value', routeOptions.impedanceAttribute);
        }

        this._getRouteTaskUrl().then(lang.hitch(this, function(routeTaskUrl){
          this.routeUrl.set('value', routeTaskUrl);
        }));

        this._getLocatorUrl().then(lang.hitch(this, function(locatorUrl){
          this.locatorUrl.set('value', locatorUrl);
        }));

        if (this.config.travelModesUrl) {
          this.travelModesUrl.set('value', this.config.travelModesUrl);
        }

        if(!this.config.routeTaskUrl){
          //it's the first time to open the setting page
          if(!this.placeholder.get('value')){
            this.placeholder.set('value', this.nls.searchPlaceholder);
          }
        }

        if(this.config.trafficLayerUrl){
          this.trafficLayerUrl.set('value', this.config.trafficLayerUrl);
        }
      },

      _getRouteTaskUrl: function(){
        var def = new Deferred();
        if (this.config.routeTaskUrl) {
          def.resolve(this.config.routeTaskUrl);
        }
        else {
          this.portal.loadSelfInfo().then(lang.hitch(this, function(response) {
            var url = this._getRouteUrlFromPortalSelf(response);
            if (url) {
              def.resolve(url);
            } else {
              def.resolve(this._routeTaskUrl);
            }
          }), lang.hitch(this, function(err) {
            console.error(err);
            def.resolve(this._routeTaskUrl);
          }));
        }
        return def;
      },

      _suffixWithSlant: function(url, suffix) {
        if (this._endsWith(url, "/")) {
          url += suffix;
        } else {
          url += ("/" + suffix);
        }
        return url;
      },
      _endsWith: function(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
      },

      _getRouteUrlFromPortalSelf: function(portalSelf){
        var url = "";
        if(portalSelf && portalSelf.helperServices){
          var route = portalSelf.helperServices.route;
          if(route && route.url){
            url = route.url;
          }
        }
        return url;
      },

      _getLocatorUrl: function(){
        var def = new Deferred();
        var geocodeArgs = this.config.geocoderOptions &&
         this.config.geocoderOptions.geocoders &&
          this.config.geocoderOptions.geocoders[0];
        var url = geocodeArgs && geocodeArgs.url;
        if(url){
          def.resolve(url);
        }
        else{
          this.portal.loadSelfInfo().then(lang.hitch(this, function(response){
            var urlFromPortal = this._getLocatorUrlFromPortalSelf(response);
            if(urlFromPortal){
              def.resolve(urlFromPortal);
            }else{
              def.resolve(this._locatorUrl);
            }
          }), lang.hitch(this, function(err){
            console.error(err);
            def.resolve(this._locatorUrl);
          }));
        }
        return def;
      },

      _getLocatorUrlFromPortalSelf: function (portalSelf) {
        var url = "";
        if (portalSelf && portalSelf.helperServices) {
          var geocodes = portalSelf.helperServices.geocode;
          //GeocoderURL options from portalSelf
          for (var i = 0, len = geocodes.length; i < len; i++) {
            var geocode = geocodes[i];
            var itme = {
              id: i,
              name: geocode.url,
              value: geocode.url
            };
            this.locatorUrl.store.put(itme);
          }
        }
        return url;
      },

      /*_getTravelModesUrl: function(){
        var def = new Deferred();
        if(this.config.travelModesUrl){
          def.resolve(this.config.travelModesUrl);
        }else{
          if(this.config.routeTaskUrl){
            //it's not the first time to open the setting page
            def.resolve(this.config.travelModesUrl);
          }else{
            //only get the default travelModesUrl first time
            this.portal.loadSelfInfo().then(lang.hitch(this, function(response){
              var urlFromPortal = this._getTravelModesUrlFromPortalSelf(response);
              if(urlFromPortal){
                def.resolve(urlFromPortal);
              }else{
                def.resolve("");
              }
            }), lang.hitch(this, function(err){
              console.error(err);
              def.reject(err);
            }));
          }
        }
        return def;
      },*/

      _getTravelModesUrlFromPortalSelf: function(portalSelf){
        var url = "";
        if(portalSelf && portalSelf.helperServices){
          var routingUtilities = portalSelf.helperServices.routingUtilities;
          if(routingUtilities && routingUtilities.url){
            url = routingUtilities.url;
          }
        }
        return url;
      },

      _getTrafficLayerUrlFromPortalSelf: function(portalSelf){
        var url = "";
        if(portalSelf && portalSelf.helperServices){
          var traffic = portalSelf.helperServices.traffic;
          if(traffic && traffic.url){
            url = traffic.url;
          }
        }
        return url;
      },

      getConfig: function() {
        if(this.routeUrl.getStatus() !== 'valid'){
          this._showValidationErrorTip(this.routeUrl);
          this._showParametersTip();
          return false;
        }

        if(this.locatorUrl.getStatus() !== 'valid'){
          this._showValidationErrorTip(this.locatorUrl);
          this._showParametersTip();
          return false;
        }

        if(this.travelModesUrl.get('value') && this.travelModesUrl.getStatus() !== 'valid'){
          this._showValidationErrorTip(this.travelModesUrl);
          this._showParametersTip();
          return false;
        }

        if(this.trafficLayerUrl.get('value') && this.trafficLayerUrl.getStatus() !== 'valid'){
          this._showValidationErrorTip(this.trafficLayerUrl);
          this._showParametersTip();
          return false;
        }

        if(!this.searchDelay.validate()){
          this._showValidationErrorTip(this.searchDelay);
          this._showParametersTip();
          return false;
        }

        if(!this.maximumSuggestions.validate()){
          this._showValidationErrorTip(this.maximumSuggestions);
          this._showParametersTip();
          return false;
        }

        if(!this.minCharacters.validate()){
          this._showValidationErrorTip(this.minCharacters);
          this._showParametersTip();
          return false;
        }

        if(!this.directionsLanguage.validate()){
          this._showValidationErrorTip(this.directionsLanguage);
          this._showParametersTip();
          return false;
        }

        if (this.presetDestinations && false === this.presetDestinations.validate()) {
          return false;
        }

        this.config = {
          routeTaskUrl: this._getHandledUrlFromServiceUrlInput(this.routeUrl),
          travelModesUrl: this._getHandledUrlFromServiceUrlInput(this.travelModesUrl),
          trafficLayerUrl: this._getHandledUrlFromServiceUrlInput(this.trafficLayerUrl),
          routeOptions: {
            directionsLanguage: this.directionsLanguage.get('value'),
            directionsLengthUnits: this.directionsLengthUnits.get('value'),
            directionsOutputType: this.directionsOutputType.get('value'),
            impedanceAttribute: this.impedanceAttribute.get('value')
          },
          geocoderOptions: {
            autoComplete: this.autoComplete.getValue(),
            maxLocations: this.maximumSuggestions.get('value'),
            minCharacters: this.minCharacters.get('value'),
            searchDelay: this.searchDelay.get('value'),
            arcgisGeocoder: false,
            geocoders: [{
              url: this._getHandledUrlFromServiceUrlInput(this.locatorUrl),
              placeholder: this.placeholder.get('value')
            }]
          },
          defaultLocations: this.presetDestinations.getValue()
        };

        return this.config;
      },

      _showValidationErrorTip:function(_dijit){
        if (!_dijit.validate() && _dijit.domNode) {
          if (_dijit.focusNode) {
            _dijit.focusNode.focus();
            setTimeout(lang.hitch(this, function() {
              _dijit.focusNode.blur();
            }), 100);
          }
        }
      },

      _showParametersTip: function(){
        new Message({
          message: this.nls.parametersTip
        });
      },

      _setRouteUrl: function(result) {
        if (result && result.data && result.data.routeLayers) {
          var rawUrl = this.routeUrl.getValue(),
            hasRouteWorldFlag = false;

          for (var i = 0, len = result.data.routeLayers.length; i < len; i++) {
            var routeLayer = result.data.routeLayers[i];
            var itme = {
              id: routeLayer,
              name: this._suffixWithSlant(rawUrl, routeLayer),
              value: this._suffixWithSlant(rawUrl, routeLayer)
            };
            if (routeLayer === this._ROUTE_WORLD) {
              hasRouteWorldFlag = true;
            }
            this.routeUrl.store.put(itme);
          }

          if (hasRouteWorldFlag) {
            this.routeUrl.setValue(this._suffixWithSlant(rawUrl, this._ROUTE_WORLD));
          }
        }
      },

      _setPresetDestinationsSources: function() {
        this.own(on(this.locatorUrl, 'Fetch', lang.hitch(this, function(val) {
          if (val && val.url) {
            var singleLineFieldName = "";
            if (val.data && val.data.singleLineAddressField && val.data.singleLineAddressField.name) {
              singleLineFieldName = val.data.singleLineAddressField.name;
            }
            var source = {
              url: val.url,
              singleLineFieldName: singleLineFieldName
            };
            this.presetDestinations.setSources(source);
          }
        })));
      }
    });
  });