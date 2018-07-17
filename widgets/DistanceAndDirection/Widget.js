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
  'dojo/_base/array',
  'dojo/aspect',
  'dojo/query',
  'dojo/topic',
  'dojo/dom-style',
  'dojo/dom-attr',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/registry',
  'jimu/BaseWidget',
  'jimu/dijit/TabContainer3',
  'dijit/layout/ContentPane',
  './views/TabLine',
  './views/TabCircle',
  './views/TabEllipse',
  './views/TabRange'
], function (
  dojoDeclare,
  dojoArray,
  dojoAspect,
  dojoQuery,
  dojoTopic,
  domStyle,
  domAttr,
  dijitWidgetsInTemplate,
  dijitRegistry,
  jimuBaseWidget,
  JimuTabContainer3,
  ContentPane,
  TabLine,
  TabCircle,
  TabEllipse,
  TabRange
) {
  'use strict';
  var clz = dojoDeclare([jimuBaseWidget, dijitWidgetsInTemplate], {
      baseClass: 'jimu-widget-DistanceAndDirection',

      /**
       *
       **/
      postCreate: function () {
        dojoDeclare.safeMixin(this.nls, window.jimuNls);
        if (!this.config.feedback) {
          this.config.feedback = {};
        }

        if (this.config.feedback.lineSymbol.showTab) {
          this.lineTab = new TabLine({
            map: this.map,
            appConfig: this.appConfig,
            lineSymbol: this.config.feedback.lineSymbol || {
              type: 'esriSLS',
              style: 'esriSLSSolid',
              color: [255, 50, 50, 255],
              width: 1.25
            },
            pointSymbol: this.config.feedback.pointSymbol || {
              'color': [255, 255, 255, 64],
              'size': 12,
              'type': 'esriSMS',
              'style': 'esriSMSCircle',
              'outline': {
                'color': [0, 0, 0, 255],
                'width': 1,
                'type': 'esriSLS',
                'style': 'esriSLSSolid'
              }
            },
            labelSymbol: this.config.feedback.labelSymbol || {
              'type': 'esriTS',
              'color': [0, 0, 0, 255],
              'verticalAlignment': 'middle',
              'horizontalAlignment': 'center',
              'xoffset': 0,
              'yoffset': 0,
              'kerning': true,
              'font': {
                'family': 'arial',
                'size': 12,
                'style': 'normal',
                'weight': 'normal',
                'decoration': 'none'
              }
            },
            nls: this.nls
          },
            this.lineTabNode
          );
        }

        if (this.config.feedback.circleSymbol.showTab) {
          this.circleTab = new TabCircle({
            map: this.map,
            appConfig: this.appConfig,
            circleSymbol: this.config.feedback.circleSymbol || {
              type: 'esriSFS',
              style: 'esriSFSNull',
              color: [255, 0, 0, 0],
              outline: {
                color: [255, 50, 50, 255],
                width: 1.25,
                type: 'esriSLS',
                style: 'esriSLSSolid'
              }
            },
            pointSymbol: this.config.feedback.pointSymbol || {
              'color': [255, 255, 255, 64],
              'size': 12,
              'type': 'esriSMS',
              'style': 'esriSMSCircle',
              'outline': {
                'color': [0, 0, 0, 255],
                'width': 1,
                'type': 'esriSLS',
                'style': 'esriSLSSolid'
              }
            },
            labelSymbol: this.config.feedback.labelSymbol || {
              'type': 'esriTS',
              'color': [0, 0, 0, 255],
              'verticalAlignment': 'middle',
              'horizontalAlignment': 'center',
              'xoffset': 0,
              'yoffset': 0,
              'kerning': true,
              'font': {
                'family': 'arial',
                'size': 12,
                'style': 'normal',
                'weight': 'normal',
                'decoration': 'none'
              }
            },
            nls: this.nls
          },
            this.circleTabNode
          );
        }

        if (this.config.feedback.ellipseSymbol.showTab) {
          this.ellipseTab = new TabEllipse({
            map: this.map,
            appConfig: this.appConfig,
            ellipseSymbol: this.config.feedback.ellipseSymbol || {
              type: 'esriSFS',
              style: 'esriSFSNull',
              color: [255, 0, 0, 125],
              outline: {
                color: [255, 50, 50, 255],
                width: 1.25,
                type: 'esriSLS',
                style: 'esriSLSSolid'
              }
            },
            pointSymbol: this.config.feedback.pointSymbol || {
              'color': [255, 255, 255, 64],
              'size': 12,
              'type': 'esriSMS',
              'style': 'esriSMSCircle',
              'outline': {
                'color': [0, 0, 0, 255],
                'width': 1,
                'type': 'esriSLS',
                'style': 'esriSLSSolid'
              }
            },
            labelSymbol: this.config.feedback.labelSymbol || {
              'type': 'esriTS',
              'color': [0, 0, 0, 255],
              'verticalAlignment': 'middle',
              'horizontalAlignment': 'center',
              'xoffset': 0,
              'yoffset': 0,
              'kerning': true,
              'font': {
                'family': 'arial',
                'size': 12,
                'style': 'normal',
                'weight': 'normal',
                'decoration': 'none'
              }
            },
            nls: this.nls
          },
            this.ellipseTabNode
          );
        }

        if (this.config.feedback.rangeRingSymbol.showTab) {
          this.rangeTab = new TabRange({
            map: this.map,
            appConfig: this.appConfig,
            pointSymbol: this.config.feedback.pointSymbol || {
              'color': [255, 255, 255, 64],
              'size': 12,
              'type': 'esriSMS',
              'style': 'esriSMSCircle',
              'outline': {
                'color': [0, 0, 0, 255],
                'width': 1,
                'type': 'esriSLS',
                'style': 'esriSLSSolid'
              }
            },
            circleSymbol: {
              type: 'esriSFS',
              style: 'esriSFSNull',
              color: [255, 0, 0, 0],
              outline: {
                color: [255, 50, 50, 255],
                width: 1.25,
                type: 'esriSLS',
                style: 'esriSLSSolid'
              }
            },
            lineSymbol: this.config.feedback.rangeRingSymbol || {
              type: 'esriSLS',
              style: 'esriSLSSolid',
              color: [255, 50, 50, 255],
              width: 1.25
            },
            labelSymbol: this.config.feedback.labelSymbol || {
              'type': 'esriTS',
              'color': [0, 0, 255, 255],
              'verticalAlignment': 'middle',
              'horizontalAlignment': 'center',
              'xoffset': 0,
              'yoffset': 0,
              'kerning': true,
              'font': {
                'family': 'arial',
                'size': 6,
                'style': 'normal',
                'weight': 'normal',
                'decoration': 'none'
              }
            },
            nls: this.nls
          }, this.RangeTabContainer);
        }

        var tabs = [];

        if (this.config.feedback.lineSymbol.showTab) {
          tabs.push({
            title: this.nls.tabLineTitle,
            content: this.lineTab
          });
        }

        if (this.config.feedback.circleSymbol.showTab) {
          tabs.push({
            title: this.nls.tabCircleTitle,
            content: this.circleTab
          });
        }
        if (this.config.feedback.ellipseSymbol.showTab) {
          tabs.push({
            title: this.nls.tabEllipseTitle,
            content: this.ellipseTab
          });
        }
        if (this.config.feedback.rangeRingSymbol.showTab) {
          tabs.push({
            title: this.nls.tabRingsTitle,
            content: this.rangeTab
          });
        }

        this.tab = new JimuTabContainer3({
          tabs: tabs
        }, this.DDTabContainer);

        var tabContainer1 = dijitRegistry.byId('DDTabContainer');

        // create an empty spacer tab so that we can control the width of the other tabs
        var pane = new ContentPane({
          title: "",
          href: ""
        });
        tabContainer1.addTab(pane);

        // set width of other tabs to 60px and hide the spacer tab
        this.setTabWidths(tabContainer1);

        dojoAspect.after(tabContainer1, "selectTab", function () {
          dojoTopic.publish('TAB_SWITCHED');
        });

        this.setTabTitle(tabContainer1.domNode);
      },

      setTabWidths: function (tabContainer) {
        for (var i = 0; i < tabContainer.tabTr.cells.length - 1; i++) {
          tabContainer.tabTr.cells[i].width = '60px';
        }
        domStyle.set(tabContainer.tabTr.cells[tabContainer.tabTr.cells.length - 1], {
          "display": 'inline-block'
        });
      },

      setTabTitle: function(parentNode) {
        var nl = dojoQuery(".tab-item-div", parentNode);
        dojoArray.forEach(nl, function(node) {
          domAttr.set(node, "title", node.innerHTML);
        });
      }
    });
  return clz;
});
