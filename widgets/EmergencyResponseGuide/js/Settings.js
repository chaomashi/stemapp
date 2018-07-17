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
  'dojo/_base/array',
  'dojo/_base/html',
  'dojo/on',
  './ColorPickerEditor',
  'jimu/BaseWidget',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!../templates/Settings.html',
  'dojo/_base/lang',
  'dojo/Evented',
  'dojo/dom-class',
  'dojo/query',
  'dijit/registry',
  'dijit/form/Select',
  'jimu/dijit/SymbolChooser'  
],
  function (
    declare,
    array,
    html,
    on,
    ColorPickerEditor,
    BaseWidget,
    _WidgetsInTemplateMixin,
    SettingsTemplate,
    lang,
    Evented,
    domClass,
    query,
    dijitRegistry
  ) {
    return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'jimu-widget-ERG-Settings',
      templateString: SettingsTemplate,
      selectedSettings: {}, //Holds selected Settings      
      colorPickerNodes: [], //Holds an array of color pickers populated at start up      
      
      constructor: function (options) {
        lang.mixin(this, options);
      },

      //Load all the options on startup
      startup: function () {     
       
      this.colorPickerNodes = query('.colorPicker',this.domNode); 
      
      array.forEach(this.colorPickerNodes,lang.hitch(this, function(node, i){
          node = new ColorPickerEditor({
            nls: this.nls,
            type: domClass.contains(node,'Line')?'line':'fill'
          }, node);
          node.setValues({
              "color": this.config.erg.symbology[node.id].color,
              "transparency": this.config.erg.symbology[node.id].transparency
            });
          node.startup();          
          node.dropdown.set('value',
            this.config.erg.symbology[node.id].type);
        }));
        
        //send by default updated parameters
        this.onSettingsChanged();
      },

      postCreate: function () {
        this.inherited(arguments);
        //set class to main container
        domClass.add(this.domNode, "ERGSettingsContainer ERGFullWidth");
        this._handleClickEvents();
      },
      
      /**
      * Handle click events for different controls
      * @memberOf widgets/ERG/Widget
      **/
      _handleClickEvents: function () {
        //handle spill location button clicked
        this.own(on(this.spillLocationSettingsButton, "click", lang.hitch(this, function () {
          this._openCloseNodes(this.spillLocationSettingsButton,this.spillLocationContainer);
        })));
        //handle Initial Isolation Zone button clicked
        this.own(on(this.IISettingsButton, "click", lang.hitch(this, function () {
          this._openCloseNodes(this.IISettingsButton,this.IIZoneContainer);
        })));
        //handle Protective Action Zone button clicked
        this.own(on(this.PASettingsButton, "click", lang.hitch(this, function () {
          this._openCloseNodes(this.PASettingsButton,this.PAZoneContainer);
        })));
        //handle down wind button clicked
        this.own(on(this.downwindSettingsButton, "click", lang.hitch(this, function () {
          this._openCloseNodes(this.downwindSettingsButton,this.downwindZoneContainer);
        })));
        //handle Fire Isolation Zone button clicked
        this.own(on(this.fireSettingsButton, "click", lang.hitch(this, function () {
          this._openCloseNodes(this.fireSettingsButton,this.fireZoneContainer);
        })));
        //handle BLEVE Zone button clicked
        this.own(on(this.bleveSettingsButton, "click", lang.hitch(this, function () {
          this._openCloseNodes(this.bleveSettingsButton,this.bleveZoneContainer);
        })));
      },
      
      _openCloseNodes: function (node,container) {
        var containers = query('.container',this.domNode);
        var buttons = query('.ERGSettingsButtonIcon',this.domNode);
        var nodeOpen = false;
        
        if(node){
          if(domClass.contains(node,'ERGLabelSettingsRightButton')) {nodeOpen = true;}
        }
        //close all dropdowns
        array.forEach(containers,lang.hitch(this, function(otherContainer){
          html.addClass(otherContainer, 'controlGroupHidden');          
        }));
        array.forEach(buttons,lang.hitch(this, function(otherNode){
          html.removeClass(otherNode, 'ERGLabelSettingsDownButton');
          html.addClass(otherNode, 'ERGLabelSettingsRightButton');          
        }));
        
        if(nodeOpen) {
          //in closed state - so open and change arrow to up
          html.removeClass(container, 'controlGroupHidden');
          html.removeClass(node, 'ERGLabelSettingsRightButton');
          html.addClass(node, 'ERGLabelSettingsDownButton');
        }       
      },
            
      /**
      * Update's Settings on close of the widget
      * @memberOf widgets/ERG/Settings
      **/
      onClose: function () {
        this.onSettingsChanged();
        this._openCloseNodes();
      },

      /**
      * Set's the selected Settings on any value change
      * @memberOf widgets/ERG/Settings
      **/
      onSettingsChanged: function () {
        array.forEach(this.colorPickerNodes,lang.hitch(this, function(node, i){
          var json = {'color': dijitRegistry.byId(node.id).getValues().color,
                      'transparency': dijitRegistry.byId(node.id).getValues().transparency,
                      'type': dijitRegistry.byId(node.id).dropdown.getValue()};
          this.selectedSettings[node.id] = json;
        }));        
        this.emit("settingsChanged", this.selectedSettings);
      }
    });
  });