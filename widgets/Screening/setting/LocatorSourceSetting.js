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
  'dojo/_base/html',
  'dojo/on',
  'dojo/Evented',
  'dojo/Deferred',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'jimu/portalUrlUtils',
  'jimu/dijit/Message',
  'jimu/dijit/_GeocodeServiceChooserContent',
  'jimu/dijit/Popup',
  'jimu/dijit/LoadingShelter',
  'esri/request',
  'esri/lang',
  '../searchSourceUtils',
  'jimu/utils',
  'dojo/text!./LocatorSourceSetting.html',
  'jimu/dijit/CheckBox',
  'dijit/form/ValidationTextBox',
  'dijit/form/NumberTextBox'
], function (
  declare,
  lang,
  html,
  on,
  Evented,
  Deferred,
  _WidgetBase,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  portalUrlUtils,
  Message,
  _GeocodeServiceChooserContent,
  Popup,
  LoadingShelter,
  esriRequest,
  esriLang,
  utils,
  jimuUtils,
  template,
  CheckBox
) {
  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {

    baseClass: "jimu-widget-screening-locator-source-setting",
    templateString: template,

    _clickSet: false, // to store the trace the locator url click
    _suggestible: false, // to store the capabilities
    _locatorDefinition: null, // to store the locator definition
    // to store the regular expression for validating locator URL
    _esriLocatorRegExp: /http(s)?:\/\/geocode(.){0,3}\.arcgis.com\/arcgis\/rest\/services\/World\/GeocodeServer/g,
    tr: null, // to store the object of table row
    nls: null, // to store the object of nls
    config: null, // to store the object of configuration
    geocoderPopup: null, // to store the object of geocoder popup
    singleLineFieldName: null, // to store the field name
    serviceChooserContent: null, // to store the content of service chooser

    constructor: function (options) {
      this._clickSet = false;
      this._suggestible = false;
      this._locatorDefinition = null;
      this._esriLocatorRegExp = /http(s)?:\/\/geocode(.){0,3}\.arcgis.com\/arcgis\/rest\/services\/World\/GeocodeServer/g;
      this.tr = null;
      this.nls = null;
      this.config = null;
      this.geocoderPopup = null;
      this.singleLineFieldName = null;
      this.serviceChooserContent = null;
      lang.mixin(this, options);
    },

    postCreate: function () {
      this.inherited(arguments);
      this.exampleHint = this.nls.locatorExample +
        ": http://&lt;myServerName&gt;/arcgis/rest/services/World/GeocodeServer";
      this.own(on(this.setButtonNode, 'click', lang.hitch(this, this._onSetLocatorUrlClick)));
      this.own(on(this.locatorName, 'Blur', lang.hitch(this, this._onLocatorNameBlur)));
      this.own(on(this.placeholder, 'Blur', lang.hitch(this, this._onPlaceholderBlur)));
      this.own(on(this.countryCode, 'Blur', lang.hitch(this, this._onCountryCodeBlur)));
      this.searchInCurrentMapExtent = new CheckBox({
        checked: false,
        label: this.nls.searchInCurrentMapExtent
      }, this.searchInCurrentMapExtent);
      this.enableLocalSearch = new CheckBox({
        checked: false,
        label: this.nls.enableLocalSearch
      }, this.enableLocalSearch);
      this._processLocalSearchTable(false);
      this.own(on(this.enableLocalSearch, 'change', lang.hitch(this, function () {
        this._processLocalSearchTable(this.enableLocalSearch.getValue());
      })));
      html.setStyle(this.enableLocalSearch.domNode, 'display', 'none');
      this._setMessageNodeContent(this.exampleHint);
      this.config = this.config ? this.config : {};
      this.setConfig(this.config);
    },

    /**
     * This function is used to set the related table row object
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    setRelatedTr: function (tr) {
      this.tr = tr;
    },

    /**
     * This function is used to get the related table row
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    getRelatedTr: function () {
      return this.tr;
    },

    /**
     * This function is used to set the locator definition
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    setDefinition: function (definition) {
      this._locatorDefinition = definition || {};
    },

    /**
     * This function is used to get the locator definition
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    getDefinition: function () {
      return this._locatorDefinition;
    },

    /**
     * This function is used to set the configuration
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    setConfig: function (config) {
      if (Object.prototype.toString.call(config) !== "[object Object]") {
        return;
      }
      var url = config.url;
      if (!url) {
        return;
      }
      this.config = config;
      this.shelter.show();
      if (this._locatorDefinition.url !== url) {
        this._getDefinitionFromRemote(url).then(lang.hitch(this, function (response) {
          if (url && (response && response.type !== 'error')) {
            this._locatorDefinition = response;
            this._locatorDefinition.url = url;
            this._setSourceItems();
            this._setMessageNodeContent(this.exampleHint);
          } else if (url && (response && response.type === 'error')) {
            this._setSourceItems();
            this._disableSourceItems();
            this._setMessageNodeContent(esriLang.substitute({
              'URL': response.url
            }, lang.clone(this.nls.invalidUrlTip)), true);
          }
          this.shelter.hide();
        }));
      } else {
        this._setSourceItems();
        this._setMessageNodeContent(this.exampleHint);
        this.shelter.hide();
      }
    },

    /**
     * This function is used to validate the configuration
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    isValidConfig: function () {
      var config = this.getConfig();
      if (config.url && config.name && config.singleLineFieldName) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * This function is used to show the validation tip
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    showValidationTip: function () {
      this._showValidationErrorTip(this.locatorUrl);
      this._showValidationErrorTip(this.locatorName);
    },

    /**
     * This function is used to get the configuration
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    getConfig: function () {
      var geocode = {
        url: this.locatorUrl.get('value'),
        name: jimuUtils.stripHTML(this.locatorName.get('value')),
        singleLineFieldName: this.singleLineFieldName,
        placeholder: jimuUtils.stripHTML(this.placeholder.get('value')),
        countryCode: jimuUtils.stripHTML(this.countryCode.get('value')),
        zoomScale: this.zoomScale.get('value') || 50000,
        maxSuggestions: this.maxSuggestions.get('value') || 6,
        maxResults: this.maxResults.get('value') || 6,
        searchInCurrentMapExtent: this.searchInCurrentMapExtent.checked,
        enableLocalSearch: this.enableLocalSearch.getValue(),
        localSearchMinScale: this.localSearchMinScale.get('value'),
        localSearchDistance: this.localSearchDistance.get('value'),
        type: "locator"
      };
      return geocode;
    },

    /**
     * This function is used to set the locator name
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _onLocatorNameBlur: function () {
      this.locatorName.set('value', jimuUtils.stripHTML(this.locatorName.get('value')));
    },

    /**
     * This function is used to set the locator placeholder
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _onPlaceholderBlur: function () {
      this.placeholder.set('value', jimuUtils.stripHTML(this.placeholder.get('value')));
    },

    /**
     * This function is used to set the country code
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _onCountryCodeBlur: function () {
      this.countryCode.set('value', jimuUtils.stripHTML(this.countryCode.get('value')));
    },

    /**
     * This function is used to disable the configuration elements
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _disableSourceItems: function () {
      this.locatorName.set('disabled', true);
      this.placeholder.set('disabled', true);
      this.countryCode.set('disabled', true);
      this.maxSuggestions.set('disabled', true);
      this.maxResults.set('disabled', true);
      this.zoomScale.set('disabled', true);
    },

    /**
     * This function is used to enable the configuration elements
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _enableSourceItems: function () {
      this.locatorName.set('disabled', false);
      this.placeholder.set('disabled', false);
      this.countryCode.set('disabled', false);
      this.maxSuggestions.set('disabled', false);
      this.maxResults.set('disabled', false);
      this.zoomScale.set('disabled', false);
    },

    /**
     * This function is used to set the existing configuration settings
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _setSourceItems: function () {
      var config = this.config;
      if (config.url) {
        // this.validService = true;
        this.locatorUrl.set('value', config.url);
        this._processCountryCodeRow(config.url);
      }
      if (config.name) {
        this.locatorName.set('value', jimuUtils.stripHTML(config.name));
      }
      if (config.singleLineFieldName) {
        this.singleLineFieldName = config.singleLineFieldName;
      }
      if (config.placeholder) {
        this.placeholder.set('value', jimuUtils.stripHTML(config.placeholder));
      }
      if (config.countryCode) {
        this.countryCode.set('value', jimuUtils.stripHTML(config.countryCode));
      }
      if ('capabilities' in this._locatorDefinition) {
        html.setStyle(this.enableLocalSearch.domNode, 'display', '');
        this._processLocalSearchTable(config.enableLocalSearch);
        this.enableLocalSearch.setValue(config.enableLocalSearch);
        if (config.localSearchMinScale && config.enableLocalSearch) {
          this.localSearchMinScale.set('value', config.localSearchMinScale);
        }
        if (config.localSearchDistance && config.enableLocalSearch) {
          this.localSearchDistance.set('value', config.localSearchDistance);
        }
      } else {
        this.enableLocalSearch.setValue(false);
        html.setStyle(this.enableLocalSearch.domNode, 'display', 'none');
      }
      this._suggestible = this._locatorDefinition && this._locatorDefinition.capabilities &&
        this._locatorDefinition.capabilities.indexOf("Suggest") > -1;
      if (!this._suggestible) {
        this._showSuggestibleTips();
      } else {
        this._hideSuggestibleTips();
      }
      this.searchInCurrentMapExtent.setValue(!!config.searchInCurrentMapExtent);
      this.zoomScale.set('value', config.zoomScale || 50000);
      this.maxSuggestions.set('value', config.maxSuggestions || 6);
      this.maxResults.set('value', config.maxResults || 6);
      this._enableSourceItems();
    },

    /**
     * This function is used to check the type of locator
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _isEsriLocator: function (url) {
      this._esriLocatorRegExp.lastIndex = 0;
      return this._esriLocatorRegExp.test(url);
    },

    /**
     * This function is used to get the definition expression
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _getDefinitionFromRemote: function (url) {
      var resultDef = new Deferred();
      if (this._isEsriLocator(url)) {
        // optimize time
        resultDef.resolve({
          singleLineAddressField: {
            name: "SingleLine",
            type: "esriFieldTypeString",
            alias: "Single Line Input",
            required: false,
            length: 200,
            localizedNames: {},
            recognizedNames: {}
          },
          capabilities: "Geocode,ReverseGeocode,Suggest"
        });
      } else {
        var def = esriRequest({
          url: url,
          content: {
            f: 'json'
          },
          handleAs: 'json',
          callbackParamName: 'callback'
        });
        this.own(def);
        def.then(lang.hitch(this, function (response) {
          resultDef.resolve(response);
        }), lang.hitch(this, function (err) {
          console.error(err);
          resultDef.resolve({
            type: 'error',
            url: this._getRequestUrl(url)
          });
        }));
      }
      return resultDef.promise;
    },

    /**
     * This function is used to set the style to message node content
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _setMessageNodeContent: function (content, err) {
      html.empty(this.messageNode);
      if (!content.nodeType) {
        content = html.toDom(content);
      }
      html.place(content, this.messageNode);
      if (err) {
        html.addClass(this.messageNode, 'esriCTErrorMessage');
      } else {
        html.removeClass(this.messageNode, 'esriCTErrorMessage');
      }
    },

    /**
     * This function is used to get the protocol URL
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _getRequestUrl: function (url) {
      var protocol = window.location.protocol;
      if (protocol === 'http:') {
        return portalUrlUtils.setHttpProtocol(url);
      } else if (protocol === 'https:') {
        return portalUrlUtils.setHttpsProtocol(url);
      } else {
        return url;
      }
    },

    /**
     * This function is used to set the locator URL
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _onSetLocatorUrlClick: function () {
      this._clickSet = true;
      this._openServiceChooser();
    },

    /**
     * This function is used to open the locator chooser
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _openLocatorChooser: function () {
      this._clickSet = false;
      this._openServiceChooser();
    },

    /**
     * This function is used to open the service chooser
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _openServiceChooser: function () {
      this.serviceChooserContent = new _GeocodeServiceChooserContent({
        url: this.locatorUrl.get('value') || ""
      });
      this.shelter = new LoadingShelter({
        hidden: true
      });
      this.geocoderPopup = new Popup({
        titleLabel: this.nls.setGeocoderURL,
        autoHeight: true,
        content: this.serviceChooserContent.domNode,
        container: window.jimuConfig.layoutId,
        width: 640
      });
      this.shelter.placeAt(this.geocoderPopup.domNode);
      html.setStyle(this.serviceChooserContent.domNode, 'width', '580px');
      html.addClass(
        this.serviceChooserContent.domNode,
        'override-geocode-service-chooser-content'
      );
      this.serviceChooserContent.own(
        on(this.serviceChooserContent, 'validate-click', lang.hitch(this, function () {
          html.removeClass(
            this.serviceChooserContent.domNode,
            'override-geocode-service-chooser-content'
          );
        }))
      );
      this.serviceChooserContent.own(on(this.serviceChooserContent, 'ok',
        lang.hitch(this, '_onSelectLocatorUrlOk'))
      );
      this.serviceChooserContent.own(on(this.serviceChooserContent, 'cancel',
        lang.hitch(this, '_onSelectLocatorUrlCancel'))
      );
    },

    /**
     * This function is used to set the locator URL
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _onSelectLocatorUrlOk: function (evt) {
      if (!(evt && evt[0] && evt[0].url && this.domNode)) {
        return;
      }
      this.shelter.show();
      esriRequest({
        url: evt[0].url,
        content: {
          f: 'json'
        },
        handleAs: 'json',
        callbackParamName: 'callback'
      }).then(lang.hitch(this, function (response) {
        this.shelter.hide();
        if (response &&
          response.singleLineAddressField &&
          response.singleLineAddressField.name) {
          this._enableSourceItems();
          this.locatorUrl.set('value', evt[0].url);
          if (!this.locatorName.get('value')) {
            this.locatorName.set('value', utils.getGeocoderName(evt[0].url));
          }
          if ('capabilities' in response) {
            html.setStyle(this.enableLocalSearch.domNode, 'display', '');
            if (this._isEsriLocator(evt[0].url)) {
              this.enableLocalSearch.setValue(true);
            } else {
              this.enableLocalSearch.setValue(false);
            }
          } else {
            this.enableLocalSearch.setValue(false);
            html.setStyle(this.enableLocalSearch.domNode, 'display', 'none');
          }
          this.singleLineFieldName = response.singleLineAddressField.name;
          this._processCountryCodeRow(evt[0].url);
          this._locatorDefinition = response;
          this._locatorDefinition.url = evt[0].url;
          this._suggestible = response.capabilities &&
            this._locatorDefinition.capabilities.indexOf("Suggest") > -1;
          if (!this._suggestible) {
            this._showSuggestibleTips();
          } else {
            this._hideSuggestibleTips();
          }
          if (this._clickSet) {
            this.emit('reselect-locator-url-ok', this.getConfig());
          } else {
            this.emit('select-locator-url-ok', this.getConfig());
          }
          if (this.geocoderPopup) {
            this.geocoderPopup.close();
            this.geocoderPopup = null;
          }
          this._setMessageNodeContent(this.exampleHint);
        } else {
          new Message({
            'message': this.nls.locatorWarning
          });
        }
      }), lang.hitch(this, function (err) {
        console.error(err);
        this.shelter.hide();
        new Message({
          'message': esriLang.substitute({
            'URL': this._getRequestUrl(evt[0].url)
          }, lang.clone(this.nls.invalidUrlTip))
        });
      }));
    },

    /**
     * This function is used to close the geocoder popup &
     * emit the event on click of cancel button
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _onSelectLocatorUrlCancel: function () {
      if (this.geocoderPopup) {
        this.geocoderPopup.close();
        this.geocoderPopup = null;
        this.emit('select-locator-url-cancel');
      }
    },

    /**
     * This function is used to show/hide the min scale & radius node
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _processLocalSearchTable: function (enable) {
      if (enable) {
        html.removeClass(this.minScaleNode, 'esriCTHidden');
        html.removeClass(this.radiusNode, 'esriCTHidden');
        this.emit("enable-local-search");
      } else {
        html.addClass(this.minScaleNode, 'esriCTHidden');
        html.addClass(this.radiusNode, 'esriCTHidden');
        this.emit("disable-local-search");
      }
    },

    /**
     * This function is used to show/hide the country row
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _processCountryCodeRow: function (url) {
      if (this._isEsriLocator(url)) {
        this.countryCode.set('value', "");
        html.removeClass(this.countryCodeRow, 'hide-country-code-row');
      } else {
        html.addClass(this.countryCodeRow, 'hide-country-code-row');
      }
    },

    /**
     * This function is used to show the suggestible tip
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _showSuggestibleTips: function () {
      html.removeClass(this.tipsNode, 'esriCTHidden');
      html.setStyle(this.maxSuggestions.domNode, 'display', 'none');
    },

    /**
     * This function is used to hide the suggestible tip
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _hideSuggestibleTips: function () {
      html.addClass(this.tipsNode, 'esriCTHidden');
      html.setStyle(this.maxSuggestions.domNode, 'display', 'block');
    },

    /**
     * This function is used to show the validation error tip.
     * @memberOf Screening/setting/LocatorSourceSetting
     */
    _showValidationErrorTip: function (_dijit) {
      if (!_dijit.validate() && _dijit.domNode) {
        if (_dijit.focusNode) {
          var _disabled = _dijit.get('disabled');
          if (_disabled) {
            _dijit.set('disabled', false);
          }
          _dijit.focusNode.focus();
          setTimeout(lang.hitch(this, function () {
            _dijit.focusNode.blur();
            if (_disabled) {
              _dijit.set('disabled', true);
            }
            _dijit = null;
          }), 100);
        }
      }
    }
  });
});