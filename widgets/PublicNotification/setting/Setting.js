/* global jimuNls */
/*
 | Copyright © 2014 - 2018 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define([
  'dojo/_base/array',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/dom-class',
  'dojo/dom-construct',
  'dojo/on',
  'dojo/string',
  'jimu/BaseWidgetSetting',
  'jimu/dijit/Message',
  'jimu/dijit/TabContainer3',
  'jimu/LayerInfos/LayerInfos',
  './convert',
  './SettingAddresseesBlock',
  './SettingBufferBlock',
  './SettingCheckbox',
  './SettingCheckboxLabeled',
  './SettingContainer',
  './SettingInputLabeled',
  './SettingLabelFormats',
  './SettingOptionsTable',
  './SettingSearchSourcesBlock',
  './SettingStaticText',
  'dojo/domReady!'
], function (
  array,
  declare,
  lang,
  domClass,
  domConstruct,
  on,
  string,
  BaseWidgetSetting,
  Message,
  TabContainer3,
  LayerInfos,
  convert,
  SettingAddresseesBlock,
  SettingBufferBlock,
  SettingCheckbox,
  SettingCheckboxLabeled,
  SettingContainer,
  SettingInputLabeled,
  SettingLabelFormats,
  SettingOptionsTable,
  SettingSearchSourcesBlock,
  SettingStaticText
) {
  return declare([BaseWidgetSetting], {
    //================================================================================================================//
    baseClass: 'jimu-widget-public-notification-setting',
    _descriptions: [],
    _guidance: null,
    _webmapFeatureLayers: [],

    //========== Widget life cycle overrides ==========

    /**
     * Dijit lifecycle: "This is fired after all properties of a widget are defined, and the document
     * fragment representing the widget is created—but before the fragment itself is added to the main document."
     * @memberOf widgets/PublicNotification/setting/Setting
     */
    postCreate: function () {
      this.inherited(arguments);

      // Get the webmap's layers
      LayerInfos.getInstance(this.map, this.map.itemInfo)
        .then(lang.hitch(this, function (layerInfosObj) {
        // Update the list of search sources with the available op layers in the current webmap
        this._webmapFeatureLayers = this._getWebmapFeatureLayers(layerInfosObj);

        // Create tab pages
        this._descriptions = [];
        this._descriptions.push(this._createSearchSourceSettings());
        this._descriptions.push(this._createAddressSourceSettings());
        this._descriptions.push(this._createNotificationSettings());

        // Update the configured list of addressee sources based on the current webmap
        this._updateAddresseeSources(layerInfosObj);

        // Configure them
        this.setConfig(this.config);

        // Initialize tabbed control with pages
        this._initTabs(this.tabsContainer, this._descriptions);
      }));
    },

    /**
    * Provides the setting widget the widget's configuration.
    * @param {object} config Widget configuration
    * @memberOf widgets/PublicNotification/setting/Setting
    **/
    setConfig: function(config) {
      this.config = lang.mixin({}, (config || {}), this.config);

      // Convert keywords to i18n forms
      this.config.searchSourceSettings.drawing.tools =
        convert.toolCodesToLabels(this.nls.propertyLabels, this.config.searchSourceSettings.drawing.tools);
      this.config.searchSourceSettings.drawing.buffer.bufferUnitsMenu =
        convert.unitCodesToLabels(jimuNls.units, this.config.searchSourceSettings.drawing.buffer.bufferUnitsMenu);

      // If there are no label formats defined, create the default set using the browser language
      this.config.notificationSettings.labelFormats =
        this._initializeLabelFormats(this.config.notificationSettings.labelFormats, this.config.labelFormatTemplates);

      // Update items using configuration
      array.forEach(this._descriptions, lang.hitch(this, function (description) {
        description.content.setConfig(this.config);
      }));
    },

    //----------

    /**
    * Returns the setting widget's configuration.
    * @return {object} Object of config
    * @memberOf widgets/PublicNotification/setting/Setting
    **/
    getConfig: function () {
      var problems = [];

      // Update configuration from items
      array.forEach(this._descriptions, lang.hitch(this, function (description) {
        description.content.getConfig(this.config, problems);
      }));

      // Check the configuration
      if (!this.config.searchSourceSettings.geometryServiceURL) {
        problems.push(this.nls.problems.noGeometryServiceURL);
      }
      if (this.config.searchSourceSettings.drawing.buffer.bufferUnitsMenu[0].indexOf('1') < 0) { // check bit flags
        problems.push(this.nls.problems.noBufferUnitsForDrawingTools);
      }

      // Convert i18n forms to keywords
      this.config.searchSourceSettings.drawing.tools =
        convert.labelsToToolCodes(this.nls.propertyLabels, this.config.searchSourceSettings.drawing.tools);
      this.config.searchSourceSettings.drawing.buffer.bufferUnitsMenu =
        convert.labelsToUnitCodes(jimuNls.units, this.config.searchSourceSettings.drawing.buffer.bufferUnitsMenu);

      // If components reported a problem, tell the user and interrupt the save
      if(problems.length > 0){
        new Message({
          message: '<ul><li>' + problems.join('</li><li>') + '</li></ul>'
        });
        return false;
      }

      return this.config;
    },

    /**
     * Returns the data sources that this widget generates.
     * @return {object} Data sources
     * @memberOf widgets/PublicNotification/setting/Setting
     */
    getDataSources: function (){
    },

    //----------

    /**
     * Dijit lifecycle: "Implement destroy if you have special tear-down work to do (the superclasses
     * will take care of most of it for you."
     * @memberOf widgets/PublicNotification/setting/Setting
     */
    destroy: function () {
      array.forEach(this._descriptions, function (description) {
        if (description.node) {
          domConstruct.destroy(description.node);
        }
      });
      this._descriptions = [];

      this.inherited(arguments);
    },

    //========== Supporting routines ==========

    /**
     * Initializes the set of available label formats if a set is not found in the widget's configuration.
     * @param {array?} configuredFormats Custom configuration of label formats
     * @param {array} formatTemplates Default set of label formats if configuredFormats missing or empty
     * @return {array} List of formats from configuration or from defaults
     * @memberOf widgets/PublicNotification/setting/Setting
     */
    _initializeLabelFormats: function (configuredFormats, formatTemplates) {
      var updatedConfiguredFormats;

      // If the configured formats have at least one format, just use it
      if (Array.isArray(configuredFormats) && configuredFormats.length >= 2) {  // allow for flag in first position
        return configuredFormats;
      }

      // Otherwise, create a new set from the templates

      // None of the template strings are initially selected
      updatedConfiguredFormats = [string.rep('0', formatTemplates.length)];

      // Copy each template, creating the language-specific description and hint
      array.forEach(formatTemplates, function (template) {
        var format = {
          'hint': ''
        };
        if (template.labelSpec.type === 'CSV') {
          format.name = this.nls.placeholders.descriptionCSV;
        } else {
          format.name = string.substitute(this.nls.placeholders.descriptionPDF, template.descriptionPDF);
          if (template.descriptionPDF.averyPartNumber) {
            format.hint = string.substitute(this.nls.placeholders.averyExample, template.descriptionPDF);
          }
        }

        format.labelSpec = lang.clone(template.labelSpec);
        updatedConfiguredFormats.push(format);
      }, this);

      return updatedConfiguredFormats;
    },

    /**
     * Extracts the ArcGISFeatureLayers from the supplied layerInfos object.
     * @param {object} layerInfosObj Object from LayerInfos.getInstance() call on a map
     * @return {array} Extracted layers
     * @memberOf widgets/PublicNotification/setting/Setting
     */
    _getWebmapFeatureLayers: function (layerInfosObj) {
      var webmapLayerInfos, webmapLayers = [];

      // Get the feature layers in the webmap
      webmapLayerInfos = layerInfosObj.getLayerInfoArray();
      array.forEach(webmapLayerInfos, function(layer) {
        if (layer.originOperLayer.layerType === 'ArcGISFeatureLayer') {
          webmapLayers.push({
            'name': layer.title,
            'layerId': layer.id,
            'url': layer.originOperLayer.url,
            'displayField': layer.originOperLayer.layerObject.displayField,
            'fields': layer.originOperLayer.layerObject.fields
          });
        }
      });

      return webmapLayers;
    },

    /**
     * Updates the widget's configuration's list of addressee sources from the supplied layerInfos object.
     * @param {object} layerInfosObj Object from LayerInfos.getInstance() call on a map
     * @memberOf widgets/PublicNotification/setting/Setting
     */
    _updateAddresseeSources: function (layerInfosObj) {
      var webmapLayerInfos, webmapLayers = [], addresseeSourceSettingsToShow = [''], configSourceFlags, configSources;

      // Get the layers in the webmap that have popups with descriptions--where the label templates are
      webmapLayerInfos = layerInfosObj.getLayerInfoArray();
      array.forEach(webmapLayerInfos, function(layer) {
        if (layer.originOperLayer.popupInfo && layer.originOperLayer.popupInfo.description) {
          webmapLayers.push(layer);
        }
      });

      // Build the list of addressee source settings: show all webmap layers that have popup descriptions and
      // check the ones that are checked in the configuration
      this.config.addresseeSourceSettings.sources = this.config.addresseeSourceSettings.sources || [''];
      configSourceFlags = this.config.addresseeSourceSettings.sources[0];
      configSources = this.config.addresseeSourceSettings.sources.slice(1);

      array.forEach(configSources, function(addresseeSource, i) {
        // Only keep addressee source if it's in the current webmap
        var iFoundLayer = -1;
        if (array.some(webmapLayers, function(layer, j) {
          if (layer.title === addresseeSource.name) {
            iFoundLayer = j;
            return true;
          }
          return false;
        })) {
          // Found the title in the webmap, so we'll keep this configured source
          addresseeSourceSettingsToShow[0] += configSourceFlags[i];
          addresseeSourceSettingsToShow.push(addresseeSource);

          // Remove the webmap layer from the list of layers so that we can keep track of unconfigured webmap layers
          webmapLayers.splice(iFoundLayer, 1);
        }
      });

      // Use a default configuration for any remaining webmap layers
      array.forEach(webmapLayers, function(layer) {
        addresseeSourceSettingsToShow[0] += '0';
        addresseeSourceSettingsToShow.push({
          name: layer.title,
          useRelatedRecords: layer.layerObject.relationships.length === 0 ? null : false
        });
      });

      // Set the addressee source settings to the generated list; the builder will catch if there's been a change
      this.config.addresseeSourceSettings.sources = addresseeSourceSettingsToShow;
    },

    /**
    * Initializes jimu tab controller and adds the content nodes to it.
    * @param {DOM element} tabsContainerNode Parent for tab DOM elements
    * @param {array} descriptions Three description objects--one per tab to be created--containing properties
    *         title and node (the DOM node that contains the tab contents)
    * @memberOf widgets/PublicNotification/setting/Setting
    **/
    _initTabs: function (tabsContainerNode, descriptions) {
      var tabContents = [], tabContainer;

      // Build the DOM for the widget
      array.forEach(descriptions, function (description) {
        tabContents.push({
          title: description.title,
          content: description.node
        });
      });

      tabContainer = new TabContainer3({
        'tabs': tabContents,
        'class': 'full-height'
      });

      // Add it into the page's DOM
      tabContainer.placeAt(tabsContainerNode);

      // Handle tabChanged event and set the scroll position to top
      this.own(on(tabContainer, 'tabChanged', lang.hitch(this, function () {
        tabContainer.containerNode.scrollTop = 0;
      })));
    },

    //================================================================================================================//

    /**
    * Initializes search source setting tab container.
    * @memberOf widgets/PublicNotification/setting/Setting
    **/
    _createSearchSourceSettings: function () {
      var description, nls = this.nls;

      description = {
        title: nls.searchSourceSetting.title,
        node: domConstruct.create('div', {'class': 'tab-contents'}),
        content: null
      };

      description.content = new SettingContainer('searchSourceSettings', '', 'majorTrailingVertGap', [
        new SettingStaticText(null, 'full-width hint', nls.searchSourceSetting.mainHint),

        new SettingInputLabeled('geometryServiceURL', false, 'full-width', 'details-label', 'details-value',
          nls.propertyLabels.urlToGeometryService),

        new SettingSearchSourcesBlock('search', nls, '', this._webmapFeatureLayers),

        new SettingContainer('drawing', 'flexbox', 'majorTrailingHorizGap',
          nls.groupingLabels.drawingTools, 'full-width', [

          new SettingContainer('', '', 'majorTrailingVertGap', [
            new SettingOptionsTable('tools', 'category-panel', '', nls.propertyLabels.tool, null,
              nls.hints.selectionListOfOptionsToDisplay),
            new SettingCheckbox('select', nls.propertyLabels.useSelectionDrawTools)
          ]),

          new SettingBufferBlock('buffer', nls, 'details-panel', 'details-label', 'details-value',
            this.config.bufferTemplate, nls.propertyLabels.bufferDefaultDistance, '100')
        ])
      ]);

      domConstruct.place(description.content.div(), description.node);

      return description;
    },

    //================================================================================================================//

    /**
    * Initializes search source setting tab container.
    * @memberOf widgets/PublicNotification/setting/Setting
    **/
    _createAddressSourceSettings: function () {
      var description, nls = this.nls;

      description = {
        title: nls.addressSourceSetting.title,
        node: domConstruct.create('div', {'class': 'tab-contents'}),
        content: null
      };

      description.content = new SettingContainer('addresseeSourceSettings', '', 'majorTrailingVertGap', [
        new SettingStaticText(null, 'full-width hint', nls.addressSourceSetting.mainHint),
        new SettingAddresseesBlock('sources', nls)
      ]);

      domConstruct.place(description.content.div(), description.node);

      return description;
    },

    //================================================================================================================//

    /**
    * Initializes search source setting tab container.
    * @memberOf widgets/PublicNotification/setting/Setting
    **/
    _createNotificationSettings: function () {
      var description, nls = this.nls, showGuidance;

      description = {
        title: nls.notificationSetting.title,
        node: domConstruct.create('div', {'class': 'tab-contents'}),
        content: null
      };

      showGuidance = this.config.notificationSettings.labelPageOptions.showGuidance;
      this._guidance =
        new SettingContainer('guidance',
          'inline-block indented' + (showGuidance ? '' : ' hiddenEmpty'), 'majorTrailingVertGap', [

          new SettingCheckboxLabeled('showLabelOutlines', 'full-width', 'half-width', 'half-width',
            nls.propertyLabels.showLabelOutlines),
          new SettingCheckboxLabeled('showGrid', 'full-width', 'half-width', 'half-width',
            nls.propertyLabels.showGridTickMarks),

          new SettingInputLabeled('noteFontSizePx', true, 'full-width', 'half-width', 'half-width',
            nls.propertyLabels.fontSizeAlignmentNote, '7',
            '', '', nls.propertyLabels.pixels, {min: 4, max: 12, places: 0}),
          new SettingInputLabeled('gridBlackPercent', true, 'full-width', 'half-width', 'half-width',
            nls.propertyLabels.gridDarkness, '25',
            '', '', nls.propertyLabels.percentBlack, {min: 0, max: 100, places: 0}),
          new SettingInputLabeled('labelBorderBlackPercent', true, 'full-width', 'half-width', 'half-width',
            nls.propertyLabels.labelBorderDarkness, '100',
            '', '', nls.propertyLabels.percentBlack, {min: 0, max: 100, places: 0}),
          new SettingInputLabeled('leftIn', true, 'full-width', 'half-width', 'half-width',
            nls.propertyLabels.gridlineLeftInset, '0.1667',
            '', '', jimuNls.units.inches, {min: 0}),
          new SettingInputLabeled('rightIn', true, 'full-width', 'half-width', 'half-width',
            nls.propertyLabels.gridlineRightInset, '0.1667',
            '', '', jimuNls.units.inches, {min: 0}),
          new SettingInputLabeled('majorTickIn', true, 'full-width', 'half-width', 'half-width',
            nls.propertyLabels.gridlineMajorTickMarksGap, '1',
            '', '', jimuNls.units.inches, {min: 0.039}),
          new SettingInputLabeled('minorTickIn', true, 'full-width', 'half-width', 'half-width',
            nls.propertyLabels.gridlineMinorTickMarksGap, '0.1',
            '', '', jimuNls.units.inches, {min: 0.039})
        ]);

      description.content = new SettingContainer('notificationSettings', '', 'majorTrailingVertGap', [
        new SettingStaticText(null, 'full-width hint', nls.notificationSetting.mainHint),

        new SettingLabelFormats('labelFormats', nls, ''),

        new SettingContainer('labelPageOptions', 'flexbox', 'majorTrailingHorizGap',
          nls.groupingLabels.printingOptions, 'full-width', [
          new SettingContainer(null, 'half-width inline-block', 'majorTrailingVertGap', [

            // Hidden until rasterResolutionPxPerIn default & wording determined
            new SettingInputLabeled('rasterResolutionPxPerIn', true, 'full-width hiddenEmpty', '', 'full-width',
              nls.propertyLabels.rasterResolution, '150',
              nls.hints.rasterResolution, '', nls.propertyLabels.pixelsPerInch, {min: 100, max: 200, places: 0}),

            new SettingCheckbox('useVectorFonts', nls.propertyLabels.useVectorFonts)
          ]),
          new SettingContainer(null, 'half-width inline-block', 'majorTrailingVertGap', [
            new SettingCheckbox('showGuidance', nls.propertyLabels.showAlignmentAids, '',
              lang.hitch(this, this._showHideGuidance)),
            this._guidance
          ])
        ])
      ]);

      domConstruct.place(description.content.div(), description.node);

      return description;
    },

    //================================================================================================================//

    /**
     * Shows or hides the guidance options by changing the visibility of their div.
     * @param {boolean} show Whether to show the options or not
     */
    _showHideGuidance: function (show) {
      if (show) {
        domClass.remove(this._guidance._mainDiv, 'hiddenEmpty');
      } else {
        domClass.add(this._guidance._mainDiv, 'hiddenEmpty');
      }
    }

    //================================================================================================================//
  });
});
