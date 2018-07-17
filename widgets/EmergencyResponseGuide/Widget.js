///////////////////////////////////////////////////////////////////////////
// Copyright © 2017 Esri. All Rights Reserved.
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
/*globals $:false */
define([
  'dojo',
  'dojo/_base/declare',
  'jimu/BaseWidget',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/dom-class',
  'dojo/dom-construct',
  'dojo/json',
  'dojo/on',
  'dojo/keys',  
  'dojo/string',
  'dojo/topic',
  'dojo/text!./guide/materials.json',
  
  'dijit/_WidgetBase',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/TooltipDialog',
  'dijit/popup',
  
  'jimu/dijit/Message',
  'jimu/dijit/LoadingIndicator',
  'jimu/LayerInfos/LayerInfos',
  'jimu/utils',
  
  'esri/IdentityManager',
  'esri/arcgis/Portal',
  'esri/Color',
  'esri/dijit/util/busyIndicator',
  'esri/graphic',
  'esri/geometry/geometryEngine',
  'esri/geometry/Point',  
  'esri/geometry/Polygon',
  'esri/geometry/Circle',
  'esri/geometry/webMercatorUtils',
  'esri/graphicsUtils',
  'esri/layers/FeatureLayer',
  'esri/layers/GraphicsLayer',
  'esri/SpatialReference',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/renderers/UniqueValueRenderer',
  'esri/request',
  
  './js/Settings',
  './js/CoordinateInput',
  './js/DrawFeedBack',
  './js/EditOutputCoordinate',  
  './js/portal-utils',
  './js/WeatherInfo',
  './js/jquery.easy-autocomplete',
  
  'dijit/form/NumberTextBox',
  'dijit/form/RadioButton',
  'dijit/form/NumberSpinner'
],
  function (
    dojo,
    declare,
    BaseWidget,
    array,
    lang,
    domClass,
    domConstruct,
    JSON,
    on,
    keys,
    dojoString,
    topic,
    materials,
    dijitWidgetBase,    
    dijitWidgetsInTemplate,
    dijitTooltipDialog,
    dijitPopup,      
    Message,
    LoadingIndicator,
    jimuLayerInfos,
    utils,
    esriId,
    esriPortal,
    Color,
    busyIndicator,
    Graphic,
    GeometryEngine,
    Point,
    Polygon,
    Circle,
    WebMercatorUtils,
    graphicsUtils,
    FeatureLayer,
    GraphicsLayer,
    SpatialReference,
    SimpleMarkerSymbol,
    UniqueValueRenderer,
    esriRequest,
    Settings,
    coordInput,
    drawFeedBackPoint,
    editOutputCoordinate,
    portalutils,    
    WeatherInfo
  ) {
    return declare([BaseWidget, dijitWidgetBase, dijitWidgetsInTemplate], {
      baseClass: 'jimu-widget-ERG',
      
      _selectedMaterial: null, //holds the current value of the selected material
      _materialsData: null, //a JSON object holding all the information about materials
      _weatherInfo: null,
      _windSpeed: 0, //
      _lastOpenPanel: "ergMainPage", //Flag to hold last open panel, default will be main page
      _currentOpenPanel: "ergMainPage", //Flag to hold last open panel, default will be main page
      _useWeather: false, //Flag to hold if weather is to be used
      _weatherURL: '', //Weather URL for Yahoo
      _weatherSource: 'Yahoo', //options Yahoo or DarkSky
      _SettingsInstance: null, //Object to hold Settings instance
      _spillLocationSym: null, //Object to hold spill Location Symbol
      _IIZoneSym: null, //Object to hold II Zone Symbol
      _PAZoneSym: null, //Object to hold PA Zone Symbol
      _downwindZoneSym: null, //Object to hold Downwind Zone Symbol
      _fireZoneSym: null, //Object to hold FIRE Zone Symbol
      _bleveZoneSym: null, //Object to hold BLEVE Zone Symbol      
      _renderer: null, // renderer to be used on the ERG Feature Service
     
      
      postMixInProperties: function () {
        //mixin default nls with widget nls
        this.nls.common = {};
        lang.mixin(this.nls.common, window.jimuNls.common);
      },
      
      constructor: function (args) {
        declare.safeMixin(this, args);
      },

      postCreate: function () {
        //modify String's prototype so we can format a string using .format requried for IE
        if (!String.prototype.format) {
          String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) { 
              return typeof args[number] !== 'undefined'? args[number]: match
              ;
            });
          };
        }
        
        //modify String's prototype so we can search a string using .includes requried for IE
         if (!String.prototype.includes) {
             String.prototype.includes = function() {
                 'use strict';
                 return String.prototype.indexOf.apply(this, arguments) !== -1;
             };
         }
        
        // determine if weather URL can be reached 
        if(this._weatherURL){
          var requestURL;
          if(this._weatherSource === 'Yahoo') {
            requestURL = this._weatherURL + 
              "q=select wind,item.condition from weather.forecast" + 
              " where woeid = 56570399&format=json";
          } else {
            requestURL = this._weatherURL + "&q=45,45&callbackNode=LocalPerspective";
          }
          var weatherDeferred = esriRequest({
            url: requestURL,
            callbackParamName: "callback"
          }, {
            useProxy: false
          });
          weatherDeferred.then(lang.hitch(this, function() {
            this._useWeather = true;
            dojo.removeClass(this.weatherContainer, 'ERGHidden');
            this._weatherInfo = new WeatherInfo(this.weather, this._weatherURL, this);
            //set up blank weather info        
            this._weatherInfo._resetWeatherInfo(this._weatherSource,this.nls.weatherIntialText); 
          }), lang.hitch(this, function() {
            this._useWeather = false;
            dojo.addClass(this.weatherContainer, 'ERGHidden');
          }));
        }
        
        this.inherited(arguments);
        
        //set up the symbology used for the interactive point draw tools        
        this.pointSymbol = {
          'color': [255, 0, 0, 255],
          'size': 8,
          'type': 'esriSMS',
          'style': 'esriSMSCircle',
          'outline': {
            'color': [255, 0, 0, 255],
            'width': 1,
            'type': 'esriSLS',
            'style': 'esriSLSSolid'
          }
        };        
        
        //create graphics layer for spill location and add to map
        this._spillLocation = new GraphicsLayer({id: "spillLocation"});        
        
        //set up symbology for point input
        this._ptSym = new SimpleMarkerSymbol(this.pointSymbol);
        
        //create a feature collection for the drawn ERG to populate 
        var featureCollection = {
          "layerDefinition": {
            "geometryType": "esriGeometryPolygon",
            "objectIdField": "ObjectID",
            "fields": [{
              "name": "ObjectID",
              "alias": "ObjectID",
              "type": "esriFieldTypeOID"
              }, {
              "name": "type",
              "alias": "type",
              "type": "esriFieldTypeString"
            }],            
            "extent": this.map.extent
          }
        };
        
        //create a the ERG feature layer
        this.ERGArea = new FeatureLayer(featureCollection,{
          id: "ERG-Graphic",
          outFields: ["*"]
        });
        
        //add the ERG feature layer and the ERG extent graphics layer to the map 
        this.map.addLayers([this.ERGArea,this._spillLocation]);
        
        var featureLayerInfo;
        //must ensure the layer is loaded before we can access it to turn on the labels if required
        if(this.ERGArea.loaded){
          // show or hide labels
          featureLayerInfo = 
            jimuLayerInfos.getInstanceSync().getLayerInfoById("ERG-Graphic");
          featureLayerInfo.enablePopup();          
        } else {
          this.ERGArea.on("load", lang.hitch(this, function () {
            // show or hide labels
            featureLayerInfo = 
              jimuLayerInfos.getInstanceSync().getLayerInfoById("ERG-Graphic");
            featureLayerInfo.enablePopup();
          }));
        }
        
        //set up coordinate input dijit for ERG Spill Location
        this.ERGCoordTool = new coordInput({
          nls: this.nls, 
          appConfig: this.appConfig
        }, this.newERGPointOriginCoords);      
        this.ERGCoordTool.inputCoordinate.formatType = 'DD';
        this.ERGCoordinateFormat = new dijitTooltipDialog({
          content: new editOutputCoordinate({nls: this.nls}),
          style: 'width: 400px'
        });
        
        //we need an extra class added the the coordinate format node for the Dart theme 
        if(this.appConfig.theme.name === 'DartTheme')
        {
          domClass.add(
            this.ERGCoordinateFormat.domNode,
            'dartThemeClaroDijitTooltipContainerOverride'
          );
        }
        
        // add extended toolbar for drawing ERG Spill Location
        this.dt = new drawFeedBackPoint(this.map,this.ERGCoordTool.inputCoordinate.util);
                                     
        this._initLoading();
        
        //set up all the handlers for the different click events
        this._handleClickEvents();
        
        this._createSettings();
      },

      startup: function () {        
        this.inherited(arguments);
        this.busyIndicator = busyIndicator.create({
          target: this.domNode.parentNode.parentNode.parentNode, 
          backgroundOpacity: 0
        });
        this._setTheme(); 
        
        //load in the materials json file
        this._materialsData = JSON.parse(materials);
        
        //set up the options for the material input selector
        var options = {
          data: this._materialsData,
          placeholder: this.nls.materialPlaceholder,
          getValue: function(element) {
            return element.IDNum === 0?element.Material: element.IDNum + " | " + element.Material;
          },
          template: {
            type: "custom",
            method: lang.hitch(this, function(value, item) {
              return "<a href='" + this.folderUrl + "guide/" + item.GuideNum + 
                ".pdf' target='_blank'><img height='18px' src='" + 
                this.folderUrl + "images/pdf.png' /></a>  " + value;
            })
          },
          list: {
            match: {
              enabled: true
            },
            onChooseEvent: lang.hitch(this, function() {
              var index = $(this.materialType).getSelectedItemIndex();
              this._selectedMaterial = 
                $(this.materialType).getSelectedItemData(index);
              if (this._selectedMaterial.TABLE2){
                new Message({
                  message: this.nls.table2Message + this._selectedMaterial.TIH.replace(/\,/g,"\n")
                });                
              }                
              if (this._selectedMaterial.TABLE3 && this.spillSize.getValue() === 'LG'){
                new Message({
                  message: this.nls.table3Message
                });
                this.windSpeed.set('disabled', false);
                this.transportContainer.set('disabled', false);
                dojo.removeClass(this.table3Container, 'ERGHidden');                
                this._resetTransportContainerOptions();
              } else {
                this.windSpeed.set('disabled', true);
                this.transportContainer.set('disabled', true);
              }              
              if (this._selectedMaterial.BLEVE){
                new Message({
                  message: this.nls.bleveMessage
                });
                this.useBleve.set('disabled', false);
                this.tankCapacity.set('disabled', false);
                dojo.removeClass(this.bleveContainer, 'ERGHidden');
              } else {
                this.useBleve.set('disabled', true);
                this.tankCapacity.set('disabled', true);
              }              
              if(this._selectedMaterial.Material.includes('Substances')) {
                this.spillSize.setValue('SM');
                this.spillSize.set('disabled', true);
              }              
              if(this.ERGCoordTool.inputCoordinate.coordinateEsriGeometry) {
                dojo.removeClass(this.CreateERGButton, 'jimu-state-disabled');
              }
            }),            
            onShowListEvent: lang.hitch(this, function() {
              this._selectedMaterial = null;
              this.spillSize.set('disabled', false);              
              dojo.addClass(this.table3Container, 'ERGHidden');              
              dojo.addClass(this.bleveContainer, 'ERGHidden');
              dojo.addClass(this.CreateERGButton, 'jimu-state-disabled');
            })            
          }          
        };
        $(this.materialType).easyAutocomplete(options);
      },

      /**
      * The transport conatiner dropdown list changes depending on material
      */
      _resetTransportContainerOptions: function () {
        //first of all reomve all options
        for (var i = this.transportContainer.options.length - 1; i >= 0 ; i--) {
          this.transportContainer.removeOption(i);
        }
        // rail and semi are common to all materials
        var dropDownOptions = ["rail", "semi"];
        // add other container options depending on material id 
        switch(this._selectedMaterial.IDNum){
          case 1005:
            dropDownOptions.push("ag","msm");              
            break;
          case 1017:
          case 1050:
          case 2186:
          case 1079:
            dropDownOptions.push("mton","ston");              
            break;
          case 1040:
          case 1052:
            dropDownOptions.push("ston");              
            break;
        }
                
        var options = [], singleOption;
        //Add options for selected dropdown
        array.forEach(dropDownOptions, lang.hitch(this, function (type) {
          singleOption = { value: type.toUpperCase(), label: this.nls[type]};   
          options.push(singleOption);
        }));
        this.transportContainer.addOption(options);
      },
                
      /**
      * Performs activities like resizing widget components, connect map click etc on widget open
      */
      onOpen: function () {
      },

      /**
      * Performs activities like disconnect map handlers, close popup etc on widget close
      */
      onClose: function () {
      },        

      /**
      * This function used for loading indicator
      */
      _initLoading: function () {
        this.loading = new LoadingIndicator({hidden: true});
        this.loading.placeAt(this.domNode);
        this.loading.startup();
      },

      /**
      * Handle click events for different controls
      **/
      _handleClickEvents: function () {
        /**
        * ERG panel
        **/        
            //handle Settings button
            if(!this.config.erg.lockSettings) {
              //handle Settings button
              this.own(on(this.ERGSettingsButton, "click", lang.hitch(this, function () {
                this._showPanel("settingsPage");
              })));
            } else {
              this.ERGSettingsButton.title = this.nls.lockSettings;
              //html.addClass(this.ERGSettingsButton, 'controlGroupHidden');
            }
            
            //Handle click event of create ERG button        
            this.own(on(this.CreateERGButton, 'click', lang.hitch(this, 
              this._CreateERGButtonClicked)));
              
            //Handle click event of clear ERG button        
            this.own(on(this.ClearERGButton, 'click', lang.hitch(this, function () {
              this.materialType.value = '';
              this.windSpeed.set('disabled', true);
              this.transportContainer.set('disabled', true);
              dojo.addClass(this.table3Container, 'ERGHidden');
              this.useBleve.set('disabled', true);
              this.useBleve.set('checked', false);
              dojo.addClass(this.bleveContainer, 'ERGHidden');
              this.fire.set('checked', false);
              this.tankCapacity.set('disabled', true);
              this._selectedMaterial = null;
              this._clearLayers(true);
            })));
            
            //Handle click event of Add ERG draw button
            this.own(on(this.ERGAddPointBtn, 'click', lang.hitch(this, 
              this._ERGDrawButtonClicked)));
              
            //Handle completion of ERG drawing
            this.own(on(this.dt, 'draw-complete', lang.hitch(this,
              this._dt_Complete)));
              
            //Handle change in coord input      
            this.own(this.ERGCoordTool.inputCoordinate.watch('outputString', lang.hitch(this,
              function (r, ov, nv) {
                r = ov = null;
                if(!this.ERGCoordTool.manualInput){
                  this.ERGCoordTool.set('value', nv);
                }
              }
            )));

            //Handle change in start point and update coord input
            this.own(this.dt.watch('startPoint', lang.hitch(this, 
              function (r, ov, nv) {
                r = ov = null;
                this.ERGCoordTool.inputCoordinate.set('coordinateEsriGeometry', nv);
                this.dt.addStartGraphic(nv, this._ptSym, this._spillLocation);
                if(this._useWeather) {
                  this._weatherInfo.updateForIncident(
                    this.ERGCoordTool.inputCoordinate.coordinateEsriGeometry);
                }
              }
            )));
            
            //Handle key up events in coord input
            this.own(on(this.ERGCoordTool, 'keyup', lang.hitch(this, 
              this._ERGCoordToolKeyWasPressed)));
            
            //Handle click event on coord format button
            this.own(on(this.ERGFormatButton, 'click', lang.hitch(this, 
              this._ERGFormatButtonClicked)));
            
            //Handle click event on apply button of the coord format popup        
            this.own(on(this.ERGCoordinateFormat.content.applyButton, 'click', lang.hitch(this,
              this._ERGFormatPopupApplyButtonClicked)));
            
            //Handle click event on cancel button of the coord format popup         
            this.own(on(this.ERGCoordinateFormat.content.cancelButton, 'click', lang.hitch(this, 
              function () {
                dijitPopup.close(this.ERGCoordinateFormat);
              }
            )));
            
            //Handle spill size dropdown change
            this.own(on(this.spillSize, 'change', lang.hitch(this, function () { 
              if(this._selectedMaterial) {
                if (this._selectedMaterial.TABLE3 && this.spillSize.getValue() === 'LG'){
                  new Message({
                    message: this.nls.table3Message
                  });
                  this.windSpeed.set('disabled', false);
                  this.transportContainer.set('disabled', false);
                  dojo.removeClass(this.table3Container, 'ERGHidden');
                  this._resetTransportContainerOptions();
                } else {
                  this.windSpeed.set('disabled', true);
                  this.transportContainer.set('disabled', true);
                  dojo.addClass(this.table3Container, 'ERGHidden');
                }
              }
            })));
            
        /**
        * Settings panel
        **/        
            //Handle click event of settings back button
            this.own(on(this.SettingsPanelBackButton, "click", lang.hitch(this, function () {
              this._SettingsInstance.onClose();          
              this._showPanel(this._lastOpenPanel);
            })));        
        
        /**
        * Publish panel
        **/
            //Handle click event back button
            this.own(on(this.resultsPanelBackButton, "click", lang.hitch(this, function () {
              //remove any messages
              this.publishMessage.innerHTML = '';
              //clear layer name
              this.addERGNameArea.setValue('');
              this._spillLocation.show();
              this._showPanel(this._lastOpenPanel);              
            })));
            
            //Handle click event of publish ERG to portal button
            this.own(on(this.ERGAreaBySizePublishERGButton, 'click', lang.hitch(this, function () {
              if(this.addERGNameArea.isValid()) {
                this.publishMessage.innerHTML = '';
                this._initSaveToPortal(this.addERGNameArea.value);
              } else {
                // Invalid entry
                this.publishMessage.innerHTML = this.nls.missingLayerNameMessage;
              }
            })));            
      },
      
      /**
      * Get panel node from panel name
      **/
      _getNodeByName: function (panelName) {
        var node;
        switch (panelName) {
          case "ergMainPage":
            node = this.ergMainPageNode;
            break;          
          case "settingsPage":
            node = this.settingsPageNode;
            break;
          case "resultsPage":
            node = this.resultsPageNode;
            break;
        }
        return node;
      },
      
      _reset: function () {
        this._clearLayers(true);
        
        //ensure all toolbars are deactivated
        this.dt.deactivate();
        
        //enable map navigation if disabled due to a tool being in use
        this.map.enableMapNavigation();
        
        //remove any active classes from the tool icons
        dojo.removeClass(this.ERGAddPointBtn, 'jimu-edit-active');
      },

      _clearLayers: function (includeExtentLayer) {
        this.ERGArea.clear();
        //refresh ERG layer to make sure any labels are removed
        this.ERGArea.refresh();        
        //sometimes we only want to clear the ERG overlay and not the spill location 
        if(includeExtentLayer) {
          this.dt.removeStartGraphic(this._spillLocation);                    
          dojo.addClass(this.CreateERGButton, 'jimu-state-disabled');
          this.ERGCoordTool.clear();
          if(this._useWeather) {
            this._weatherInfo._resetWeatherInfo(this._weatherSource,this.nls.weatherIntialText);
          }
        }
      },

      /**
      * Creates settings
      **/
      _createSettings: function () {
        //Create Settings Instance
        this._SettingsInstance = new Settings({
          nls: this.nls,
          config: this.config,
          appConfig: this.appConfig
        }, domConstruct.create("div", {}, this.SettingsNode));        
        
        //add a listener for a change in settings
        this.own(this._SettingsInstance.on("settingsChanged",
          lang.hitch(this, function (updatedSettings) {
            
            var spillLocationFillColor = 
              new Color(updatedSettings.spillLocationFillColor.color); 
            var spillLocationFillTrans = 
              (1 - updatedSettings.spillLocationFillColor.transparency) * 255;
            var spillLocationOutlineColor = 
              new Color(updatedSettings.spillLocationOutlineColor.color);            
            var spillLocationOutlineTrans = 
              (1 - updatedSettings.spillLocationOutlineColor.transparency) * 255;
            
            var IIZoneFillColor = 
              new Color(updatedSettings.IIZoneFillColor.color);            
            var IIZoneFillTrans = 
              (1 - updatedSettings.IIZoneFillColor.transparency) * 255;
            var IIZoneOutlineColor = 
              new Color(updatedSettings.IIZoneOutlineColor.color);            
            var IIZoneOutlineTrans = 
              (1 - updatedSettings.IIZoneOutlineColor.transparency) * 255;
            
            var PAZoneFillColor = 
              new Color(updatedSettings.PAZoneFillColor.color);            
            var PAZoneFillTrans = 
              (1 - updatedSettings.PAZoneFillColor.transparency) * 255;
            var PAZoneOutlineColor = 
              new Color(updatedSettings.PAZoneOutlineColor.color);            
            var PAZoneOutlineTrans = 
              (1 - updatedSettings.PAZoneOutlineColor.transparency) * 255;
            
            var downwindZoneFillColor = 
              new Color(updatedSettings.downwindZoneFillColor.color);            
            var downwindZoneFillTrans = 
              (1 - updatedSettings.downwindZoneFillColor.transparency) * 255;
            var downwindZoneOutlineColor = 
              new Color(updatedSettings.downwindZoneOutlineColor.color);            
            var downwindZoneOutlineTrans = 
              (1 - updatedSettings.downwindZoneOutlineColor.transparency) * 255;
            
            var fireZoneFillColor = 
              new Color(updatedSettings.fireZoneFillColor.color);            
            var fireZoneFillTrans = 
              (1 - updatedSettings.fireZoneFillColor.transparency) * 255;
            var fireZoneOutlineColor = 
              new Color(updatedSettings.fireZoneOutlineColor.color);            
            var fireZoneOutlineTrans = 
              (1 - updatedSettings.fireZoneOutlineColor.transparency) * 255;
            
            var bleveZoneFillColor = 
              new Color(updatedSettings.bleveZoneFillColor.color);            
            var bleveZoneFillTrans = 
              (1 - updatedSettings.bleveZoneFillColor.transparency) * 255;
            var bleveZoneOutlineColor = 
              new Color(updatedSettings.bleveZoneOutlineColor.color);            
            var bleveZoneOutlineTrans = 
              (1 - updatedSettings.bleveZoneOutlineColor.transparency) * 255;
            
            var uvrJson = {"type": "uniqueValue",
              "field1": "Type",
              "defaultSymbol": {
                "color": [255, 153, 0, 128],
                "outline": {
                  "color": [255, 153, 0, 255],
                  "width": 1,
                  "type": "esriSLS",
                  "style": "esriSLSSolid"
                },
                "type": "esriSFS",
                "style": "esriSFSSolid"
              },
              "uniqueValueInfos": [{
                "value": "Spill Location",
                "symbol": {
                  "color": [spillLocationFillColor.r,
                    spillLocationFillColor.g,
                    spillLocationFillColor.b,
                    spillLocationFillTrans],
                  "outline": {
                    "color": [spillLocationOutlineColor.r,
                      spillLocationOutlineColor.g,
                      spillLocationOutlineColor.b,
                      spillLocationOutlineTrans],
                    "width": 1,
                    "type": "esriSLS",
                    "style": updatedSettings.spillLocationOutlineColor.type
                  },
                  "type": "esriSFS",
                  "style": updatedSettings.spillLocationFillColor.type
                }
              }, {
                "value": "II Zone",
                "symbol": {
                  "color": [IIZoneFillColor.r,IIZoneFillColor.g,IIZoneFillColor.b,IIZoneFillTrans],
                  "outline": {
                    "color": [IIZoneOutlineColor.r,
                      IIZoneOutlineColor.g,
                      IIZoneOutlineColor.b,
                      IIZoneOutlineTrans],
                    "width": 1,
                    "type": "esriSLS",
                    "style": updatedSettings.IIZoneOutlineColor.type
                  },
                  "type": "esriSFS",
                  "style": updatedSettings.IIZoneFillColor.type
                }
              }, {
                "value": "Protective Action Area",
                "symbol": {
                  "color": [PAZoneFillColor.r,PAZoneFillColor.g,PAZoneFillColor.b,PAZoneFillTrans],
                  "outline": {
                    "color": [PAZoneOutlineColor.r,
                      PAZoneOutlineColor.g,
                      PAZoneOutlineColor.b,
                      PAZoneOutlineTrans],
                    "width": 1,
                    "type": "esriSLS",
                    "style": updatedSettings.PAZoneOutlineColor.type
                  },
                  "type": "esriSFS",
                  "style": updatedSettings.PAZoneFillColor.type
                }
              }, {
                "value": "Downwind",
                "symbol": {
                  "color": [downwindZoneFillColor.r,
                    downwindZoneFillColor.g,
                    downwindZoneFillColor.b,
                    downwindZoneFillTrans],
                  "outline": {
                    "color": [downwindZoneOutlineColor.r,
                      downwindZoneOutlineColor.g,
                      downwindZoneOutlineColor.b,
                      downwindZoneOutlineTrans],
                    "width": 1,
                    "type": "esriSLS",
                    "style": updatedSettings.downwindZoneOutlineColor.type
                  },
                  "type": "esriSFS",
                  "style": updatedSettings.downwindZoneFillColor.type
                }
              }, {
                "value": "Fire",
                "symbol": {
                  "color": [fireZoneFillColor.r,
                    fireZoneFillColor.g,
                    fireZoneFillColor.b,
                    fireZoneFillTrans],
                  "outline": {
                    "color": [fireZoneOutlineColor.r,
                      fireZoneOutlineColor.g,
                      fireZoneOutlineColor.b,
                      fireZoneOutlineTrans],
                    "width": 1,
                    "type": "esriSLS",
                    "style": updatedSettings.fireZoneOutlineColor.type
                  },
                  "type": "esriSFS",
                  "style": updatedSettings.fireZoneFillColor.type
                }
              }, {
                "value": "Bleve",                
                "symbol": {
                  "color": [bleveZoneFillColor.r,
                    bleveZoneFillColor.g,
                    bleveZoneFillColor.b,
                    bleveZoneFillTrans],
                  "outline": {
                    "color": [bleveZoneOutlineColor.r,
                      bleveZoneOutlineColor.g,
                      bleveZoneOutlineColor.b,
                      bleveZoneOutlineTrans],
                    "width": 1,
                    "type": "esriSLS",
                    "style": updatedSettings.bleveZoneOutlineColor.type
                  },
                  "type": "esriSFS",
                  "style": updatedSettings.bleveZoneFillColor.type
                }
              }]
            };
            
            // create a renderer for the ERG layer to override default symbology
            this._renderer = new UniqueValueRenderer(uvrJson);
            this.ERGArea.setRenderer(this._renderer);
           
            //refresh the layer to apply the settings
            this.ERGArea.refresh();              
          })));
        this._SettingsInstance.startup();
      },

      /**
      * Displays selected panel
      **/
      _showPanel: function (currentPanel) {
        var prevNode, currentNode;
        //check if previous panel exist and hide it
        if (this._currentOpenPanel) {
          prevNode = this._getNodeByName(this._currentOpenPanel);
          domClass.add(prevNode, "ERGHidden");
        }
        //get current panel to be displayed and show it
        currentNode = this._getNodeByName(currentPanel);
        domClass.remove(currentNode, "ERGHidden");
        //set the current panel and previous panel
        this._lastOpenPanel = this._currentOpenPanel;
        this._currentOpenPanel = currentPanel;
      },
      
      /**
      * Handle the draw point icon being clicked on the ERG Panel
      **/
      _ERGDrawButtonClicked: function () {
        if(domClass.contains(this.ERGAddPointBtn,'jimu-edit-active')) {
          //already selected so deactivate draw tool
          this.dt.deactivate();
          this.map.enableMapNavigation();
        } else {
          this.dt.removeStartGraphic(this._spillLocation);
          this._clearLayers(true); 
          this.ERGCoordTool.manualInput = false;        
          this.dt._setTooltipMessage(0);        
          this.map.disableMapNavigation();          
          this.dt.activate('point');
          var tooltip = this.dt._tooltip;
          if (tooltip) {
            tooltip.innerHTML = this.nls.drawPointToolTip;
          }          
        }
        domClass.toggle(this.ERGAddPointBtn, 'jimu-edit-active');
      },
      
      /**
      * Handle the completion of the draw spill location
      **/      
      _dt_Complete: function () {          
        domClass.remove(this.ERGAddPointBtn, 'jimu-edit-active');
        this.dt.deactivate();
        this.map.enableMapNavigation();
        if(this._selectedMaterial) {
          dojo.removeClass(this.CreateERGButton, 'jimu-state-disabled');
        }
      },
      
      /**
      * catch key press in spill location input
      **/
      _ERGCoordToolKeyWasPressed: function (evt) {
        this.ERGCoordTool.manualInput = true;
        if (evt.keyCode === keys.ENTER) {
          this.ERGCoordTool.inputCoordinate.getInputType().then(lang.hitch(this, 
            function (r) {
              if(r.inputType === "UNKNOWN"){
                new Message({
                  message: this.nls.parseCoordinatesError
                });
              } else {
                topic.publish(
                  'ERG-center-point-input',
                  this.ERGCoordTool.inputCoordinate.coordinateEsriGeometry
                );
                this._ERGSetCoordLabel(r.inputType);
                var fs = this.ERGCoordinateFormat.content.formats[r.inputType];
                this.ERGCoordTool.inputCoordinate.set('formatString', fs.defaultFormat);
                this.ERGCoordTool.inputCoordinate.set('formatType', r.inputType);
                this.dt.addStartGraphic(r.coordinateEsriGeometry, this._ptSym, this._spillLocation);
              }
            }
          ));
        }
      },
      
      /**
      * Reformat coordinate label depend on what reference system is chosen
      **/
      _ERGSetCoordLabel: function (toType) {
        this.ERGCoordInputLabel.innerHTML = dojoString.substitute(
          this.nls.coordInputLabel + ' (${crdType})', {
              crdType: toType
          });
      },
      
      /**
      * Handle the format coordinate input popup opening
      * Point by Size Panel
      **/
      _ERGFormatButtonClicked: function () {
        this.ERGCoordinateFormat.content.set('ct', this.ERGCoordTool.inputCoordinate.formatType);
        dijitPopup.open({
            popup: this.ERGCoordinateFormat,
            around: this.ERGFormatButton
        });
      },
      
      /**
      * Handle the format coordinate input being applied
      **/
      _ERGFormatPopupApplyButtonClicked: function () {
        var fs = this.ERGCoordinateFormat.content.formats[this.ERGCoordinateFormat.content.ct];
        var cfs = fs.defaultFormat;
        var fv = this.ERGCoordinateFormat.content.frmtSelect.get('value');
        if (fs.useCustom) {
            cfs = fs.customFormat;
        }
        this.ERGCoordTool.inputCoordinate.set(
          'formatPrefix',
          this.ERGCoordinateFormat.content.addSignChkBox.checked
        );
        this.ERGCoordTool.inputCoordinate.set('formatString', cfs);
        this.ERGCoordTool.inputCoordinate.set('formatType', fv);
        this._ERGSetCoordLabel(fv);
        dijitPopup.close(this.ERGCoordinateFormat);        
      },
      
      /**
      * Handle the create ERG button being clicked
      **/
      _CreateERGButtonClicked: function () {
        if(this._selectedMaterial && this.ERGCoordTool.inputCoordinate.coordinateEsriGeometry) {
          var IIAttributeValue, PAAttributeValue, bleveAttributeValue, IIDistance, PADistance;
          var features = [];          
          var spatialReference = new SpatialReference({wkid:102100});
          
          //get the spill location
          var spillLocation = WebMercatorUtils.geographicToWebMercator(
            this.ERGCoordTool.inputCoordinate.coordinateEsriGeometry);
          
          // clear any existing ERG overlays
          this._clearLayers(true);
          
          //check if you need to refer to table 3
          if(!this._selectedMaterial.TABLE3) {
            IIAttributeValue = this.spillSize.getValue() + "_ISO";
            PAAttributeValue = this.spillSize.getValue() + "_" + this.spillTime.getValue();
          } else {
            IIAttributeValue = this.transportContainer.getValue() + "_ISO";
            PAAttributeValue = this.transportContainer.getValue() + 
              this.spillTime.getValue() + this.windSpeed.getValue();
          }
          
          //set the IA and PA distances
          IIDistance = this._selectedMaterial[IIAttributeValue];
          PADistance = this._selectedMaterial[PAAttributeValue];
          
          // determine the initial isolation zone
          var IIZone = new Circle({
            center: spillLocation,
            radius: IIDistance,
            geodesic: true,
            numberOfPoints: 360
          });
          
          // show BLEVE zone
          if(this.useBleve.checked && this._selectedMaterial.BLEVE){            
            bleveAttributeValue = this.tankCapacity.getValue();
            var bleveZone = GeometryEngine.geodesicBuffer(spillLocation,
              this._selectedMaterial[bleveAttributeValue],'meters');
            var bleveZoneGraphic = new Graphic(bleveZone);
            bleveZoneGraphic.setAttributes({"type": "Bleve"});
            features.push(bleveZoneGraphic);
          }
          
          // show Fire evaction zone
          if(this.fire.checked){
            var fireZone = GeometryEngine.geodesicBuffer(spillLocation,
              this._selectedMaterial.FIRE_ISO,'meters');
            var fireZoneGraphic = new Graphic(fireZone);
            fireZoneGraphic.setAttributes({"type": "Fire"});
            features.push(fireZoneGraphic);
          }

          if(this._selectedMaterial.IDNum === 0 ||
            this._selectedMaterial.BLEVE) {
            // Materials with the word Substances in their title or BLEVE 
            // values do not have any PA distances
            // warn the user to this then zoom to the II Zone
            new Message({
              message: this.nls.noPAZoneMessage
            }); 
          } else {          
            // create a circle from the spill location that we can use to calculate
            // the center point that will be used for the Protective Action (PA) Zone
            var PACircle = new Circle({
                center: spillLocation,
                radius: PADistance/2,
                geodesic: true,
                numberOfPoints: 360
            });
            
            // Get the center point for the PA Zone (first point of the circle due north)
            var PACenter = PACircle.getPoint(0,0);
            
            // Create another circle from this center point, the extent of which will be the PA Zone
            var PAZone = new Circle({
                center: PACenter,
                radius: PADistance/2,
                geodesic: true
            });
            
            // get the two bottom corners of the PA Zone - these will be swapped out below
            var PAZoneExtent = PAZone.getExtent();
            var PAPoint1 = new Point(PAZoneExtent.xmin,PAZoneExtent.ymin,spatialReference);
            var PAPoint2 = new Point(PAZoneExtent.xmax,PAZoneExtent.ymin,spatialReference);
            
            // Compute the "protective action arc" - 
            // the arc at the limit of the protective action zone
            var paBuffer = GeometryEngine.geodesicBuffer(spillLocation,PADistance,'meters');
            var protectiveActionArc = GeometryEngine.intersect(
              paBuffer,Polygon.fromExtent(PAZoneExtent));
                      
            // get the 2 coordinates where the initial isolation zone intersects with
            // the protective action distance
            var iiPoint1 = IIZone.getPoint(0,270);
            var iiPoint2 = IIZone.getPoint(0,90);
            
            // Swap out the two bottom corners to create the fan
            array.forEach(protectiveActionArc.rings[0],lang.hitch(this, function(point, i){
              if(point[0] === PAPoint1.x && point[1] === PAPoint1.y) {
                protectiveActionArc.setPoint(0, i, iiPoint1);
              } else if(point[0] === PAPoint2.x && point[1] === PAPoint2.y) {
                protectiveActionArc.setPoint(0, i, iiPoint2);
              }
            }));
            
            var protectiveActionArea = GeometryEngine.difference(protectiveActionArc,IIZone);
            // all geometry so far is orientated north so rotate what we need to the wind direction
            protectiveActionArea = GeometryEngine.rotate(protectiveActionArea,
              this.windDirection.getValue() * -1,spillLocation);         
            var PAZoneArea = GeometryEngine.rotate(Polygon.fromExtent(PAZoneExtent),
              this.windDirection.getValue() * -1,spillLocation);
                      
            var PAAGraphic = new Graphic(protectiveActionArea);
            PAAGraphic.setAttributes({"type": "Downwind"});
            var PAZoneGraphic = new Graphic(PAZoneArea);
            PAZoneGraphic.setAttributes({"type": "Protective Action Area"});
            
            features.push(PAZoneGraphic,PAAGraphic);
            }

          // draw the II Zone
          var IIGraphic = new Graphic(IIZone);
          IIGraphic.setAttributes({"type": "II Zone"});
          features.push(IIGraphic);            

          // draw a small polygon to show spill location
          var spillLocationPoly = GeometryEngine.geodesicBuffer(spillLocation,10,'meters');
          var spillLocationGraphic = new Graphic(spillLocationPoly);
          spillLocationGraphic.setAttributes({"type": "Spill Location"}); 
          features.push(spillLocationGraphic);
          
          this.ERGArea.applyEdits(features, null, null);
          this.map.setExtent(graphicsUtils.graphicsExtent(this.ERGArea.graphics).expand(2),false);
          this._showPanel("resultsPage");
        }
      },
        
      /**
      * Handle different theme styles
      **/
      //source:
      //https://stackoverflow.com/questions/9979415/dynamically-load-and-unload-stylesheets
      _removeStyleFile: function (filename, filetype) {
        //determine element type to create nodelist from
        var targetelement = null;
        if (filetype === "js") {
          targetelement = "script";
        } else if (filetype === "css") {
          targetelement = "link";
        } else {
          targetelement = "none";
        }
        //determine corresponding attribute to test for
        var targetattr = null;
        if (filetype === "js") {
          targetattr = "src";
        } else if (filetype === "css") {
          targetattr = "href";
        } else {
          targetattr = "none";
        }
        var allsuspects = document.getElementsByTagName(targetelement);
        //search backwards within nodelist for matching elements to remove
        for (var i = allsuspects.length; i >= 0; i--) {
          if (allsuspects[i] &&
            allsuspects[i].getAttribute(targetattr) !== null &&
            allsuspects[i].getAttribute(targetattr).indexOf(filename) !== -1) {
            //remove element by calling parentNode.removeChild()
            allsuspects[i].parentNode.removeChild(allsuspects[i]);
          }
        }
      },

      _setTheme: function () {
        //Check if DartTheme
        if (this.appConfig.theme.name === "DartTheme") {
          //Load appropriate CSS for dart theme
          utils.loadStyleLink('darkOverrideCSS', this.folderUrl + "css/dartTheme.css", null);
        } else {
          this._removeStyleFile(this.folderUrl + "css/dartTheme.css", 'css');
        }
        //Check if DashBoardTheme
        if (this.appConfig.theme.name === "DashboardTheme" && 
          this.appConfig.theme.styles[0] === "default"){
          //Load appropriate CSS for dashboard theme
          utils.loadStyleLink('darkDashboardOverrideCSS', 
            this.folderUrl + "css/dashboardTheme.css", null);
        } else {
          this._removeStyleFile(this.folderUrl + "css/dashboardTheme.css", 'css');
        }
      },
      
      /**
      * Handle widget being destroyed
      * Primarly needed when in WAB configuration mode
      **/
      destroy: function() {        
        this.inherited(arguments);        
        this.map.removeLayer(this._spillLocation);
        this.map.removeLayer(this.ERGArea);
      },
      
      /**
      * Handle publish ERG to portal
      **/
      _initSaveToPortal: function(layerName) {        
        esriId.registerOAuthInfos();        
        var featureServiceName = layerName;
        esriId.getCredential(this.appConfig.portalUrl + 
          "/sharing", { oAuthPopupConfirmation: false }).then(lang.hitch(this, function() {
          //sign in
          new esriPortal.Portal(
            this.appConfig.portalUrl).signIn().then(lang.hitch(this, function(portalUser) {
           //Get the token
            var token = portalUser.credential.token;
            var orgId = portalUser.orgId;
            var userName = portalUser.username;
            //check the user is not just a publisher
            if(portalUser.role === "org_user") {
              this.publishMessage.innerHTML = this.nls.createService.format(this.nls.userRole);
              return;
            }
            var checkServiceNameUrl = this.appConfig.portalUrl + 
              "sharing/rest/portals/" + orgId + "/isServiceNameAvailable";
            var createServiceUrl = this.appConfig.portalUrl + 
              "sharing/content/users/" + userName + "/createService";
            portalutils.isNameAvailable(checkServiceNameUrl, token,
              featureServiceName).then(lang.hitch(this, function(response0) {
              if (response0.available) {
                //set the widget to busy
                this.busyIndicator.show();
                //create the service
                portalutils.createFeatureService(createServiceUrl, token, 
                  portalutils.getFeatureServiceParams(featureServiceName, 
                    this.map)).then(lang.hitch(this, function(response1) {
                  if (response1.success) {
                    var addToDefinitionUrl = response1.serviceurl.replace(
                      new RegExp('rest', 'g'), "rest/admin") + "/addToDefinition";
                    portalutils.addDefinitionToService(addToDefinitionUrl, token,
                      portalutils.getLayerParams(featureServiceName, this.map,
                      this._renderer)).then(lang.hitch(this, 
                        function(response2) {
                      if (response2.success) {
                        //Push features to new layer
                        var newFeatureLayer = 
                          new FeatureLayer(response1.serviceurl + "/0?token=" + token, {
                            id: featureServiceName,
                            outFields: ["*"]                           
                          });                        
                        this.map.addLayers([newFeatureLayer]);
                        
                        // must ensure the layer is loaded before we can access 
                        // it to turn on the labels if required
                        var featureLayerInfo;                        
                        if(newFeatureLayer.loaded){
                          featureLayerInfo = 
                            jimuLayerInfos.getInstanceSync().getLayerInfoById(featureServiceName);
                          featureLayerInfo.enablePopup();                         
                        } else {
                          newFeatureLayer.on("load", lang.hitch(this, function () {
                            featureLayerInfo = 
                              jimuLayerInfos.getInstanceSync().getLayerInfoById(featureServiceName);
                            featureLayerInfo.enablePopup();                            
                          }));
                        }
                        
                        var newGraphics = [];
                        array.forEach(this.ERGArea.graphics, function (g) {
                          newGraphics.push(new Graphic(g.geometry, null, 
                            {type: g.attributes.type}));
                        }, this);
                        newFeatureLayer.applyEdits(newGraphics, null, null).then(
                          lang.hitch(this, function(){
                          this._reset();                                
                        })).otherwise(lang.hitch(this,function(){
                          this._reset();
                        })); 
                        this.busyIndicator.hide();
                        var newURL = '<br /><a href="' + this.appConfig.portalUrl + 
                          "home/item.html?id=" + response1.itemId + '" target="_blank">';
                        this.publishMessage.innerHTML = 
                          this.nls.successfullyPublished.format(newURL) + '</a>';
                        
                      }                      
                    }), lang.hitch(this, function(err2) {
                      this.busyIndicator.hide();
                      this.publishMessage.innerHTML = 
                        this.nls.addToDefinition.format(err2.message); 
                    }));                    
                  } else {
                    this.busyIndicator.hide();
                    this.publishMessage.innerHTML = 
                      this.nls.unableToCreate.format(featureServiceName);                    
                  }
                }), lang.hitch(this, function(err1) {
                  this.busyIndicator.hide();
                  this.publishMessage.innerHTML = 
                    this.nls.createService.format(err1.message);                  
                }));
              } else {
                  this.busyIndicator.hide();
                  this.publishMessage.innerHTML = 
                    this.nls.publishingFailedLayerExists.format(featureServiceName); 
                  
              }
            }), lang.hitch(this, function(err0) {
              this.busyIndicator.hide();
              this.publishMessage.innerHTML = this.nls.checkService.format(err0.message);
            }));
          }), lang.hitch(this, function(err) {
              this.publishMessage.innerHTML = err.message;
            }));
        }));
        esriId.destroyCredentials();        
      }     
    });
  });