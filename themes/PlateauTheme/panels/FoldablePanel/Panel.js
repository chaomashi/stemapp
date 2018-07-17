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

define(['dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/_base/array',
    'dojo/on',
    'dojo/aspect',
    'dojo/topic',
    'jimu/BaseWidgetPanel',
    'jimu/BaseWidgetFrame',
    'jimu/utils',
    'dojo/query',
    'dojo/dom-class',
    './FoldableDijit',
    './FoldableWidgetFrame',
    'dijit/registry'
  ],
  function (
    declare, lang, html, array, on, aspect, topic, BaseWidgetPanel,
    BaseWidgetFrame, utils, query, domClass, FoldableDijit, FoldableWidgetFrame, registry
  ) {
    var borderRadius = '0px';

    /* global jimuConfig */

    return declare([BaseWidgetPanel, FoldableDijit], {
      baseClass: 'jimu-panel jimu-foldable-dijit jimu-foldable-panel',

      closeTolerance: 30,

      openAnimation: 'fadeIn',
      closeAnimation: 'fadeOut',
      animationDuration: 500,

      startup: function () {
        this.titleHeight = 35;
        this.inherited(arguments);
        this._switchParentNode();
        html.addClass(this.titleNode, 'jimu-panel-title');
        this.createCloseBtn();
        this.createMaxBtn();
        this.createFoldableBtn();
        this.panelManager.normalizePanel(this);
      },

      getPanelPosition: function () {
        var panelPosition;
        if (window.appInfo.isRunInMobile) {
          if (this.panelManager.getPositionOnMobile(this).top === 0) {
            panelPosition = this.panelManager.getPositionOnMobile(this);
            panelPosition.top = '39px';
          } else {
            panelPosition = this.panelManager.getPositionOnMobile(this);
          }
          return panelPosition;
        } else {
          var pos = lang.clone(this.position);
          if (typeof pos.width === 'undefined') {
            pos.width = 360;
          }
          if (this.windowState === 'minimized') {
            pos.bottom = 'auto';
            pos.height = this.titleHeight;
            pos.borderRadiusStyle = {
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0
            };
          } else {
            pos.bottom = this.position.bottom;
            pos.height = 'auto';
            pos.borderRadiusStyle = {
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
              borderBottomLeftRadius: borderRadius,
              borderBottomRightRadius: borderRadius
            };
          }

          return pos;
        }
      },

      onNormalize: function () {
        this.resize();
        if (domClass.contains(this.foldableNode, "folded")) {
          domClass.remove(this.foldableNode, "folded");
        }
      },

      onMaximize: function () {
        this.resize();
        if (domClass.contains(this.foldableNode, "folded")) {
          domClass.remove(this.foldableNode, "folded");
        }
      },

      onMinimize: function () {
        this.resize();
        if (!domClass.contains(this.foldableNode, "folded")) {
          domClass.add(this.foldableNode, "folded");
        }
      },

      resize: function () {
        this._switchMaxBtn();

        var pos = this.getPanelPosition();
        //Changes For showing panel below header in mobile devices
        // if Panel is maximize or normalized then place panel just below the title
        if (this.windowState === 'maximized' && window.appInfo.isRunInMobile) {
          pos.top = '39px';
        }

        // Adjust map canvas area on opening and closing of panels and window resizing
        this._setMapCanvasArea(pos.top);

        //Changes For showing panel below header in mobile devices  */
        if (!window.appInfo.isRunInMobile) {
          pos.top = '39px';
          pos.right = '0';
          pos.bottom = '0';
        }
        if (this.position.zIndex) {
          pos.zIndex = this.position.zIndex;
        }
        var style = utils.getPositionStyle(pos);

        if (window.appInfo.isRunInMobile) {
          // apply following styles if app is running in small screen device
          // (mobile and tablet devices)
          if (window.innerWidth <= 760 || window.innerHeight <= 600) {
            //styles for mobile if panel is maximized then resize the panel width to 100%
            //else keep it to the width of 360px;
            if (this.windowState === 'maximized') {
              style.width = "100%";
            } else {
              // if window width is less than 760px then resize
              //  the panel width to 100% else keep it to the width of 360px;
              if (window.innerWidth <= 760) {
                style.width = "100%";
              } else {
                style.width = "360px";
              }
            }
            if (window.isRTL) {
              style.left = "0px";
            } else {
              style.left = "auto";
            }
            style.right = style.left === "0px" ? "auto" : style.right;

          } else {
            //styles for tablet
            style.width = "360px";

            if (window.isRTL) {
              style.left = "0px";
            } else {
              style.left = "auto";
            }
            style.right = style.left === "0px" ? "auto" : style.right;
          }
        } else {
          //styles for desktop browsers
          style.width = "360px";

          if (window.isRTL) {
            style.left = "0px";
          } else {
            style.left = "auto";
          }
          style.right = style.left === "0px" ? "auto" : style.right;
        }

        lang.mixin(style, pos.borderRadiusStyle);
        html.setStyle(this.domNode, style);

        if (this.getChildren().length > 1) {
          this._setFrameSize(pos.contentHeight);
        }

        this.inherited(arguments);
      },

      reloadWidget: function (widgetConfig) {
        this.inherited(arguments);
        if (!this.isWidgetInPanel(widgetConfig)) {
          return;
        }
        if (!Array.isArray(this.config.widgets)) {
          this.setTitleLabel(widgetConfig.label);
        }
      },

      /*
      * set the position of widget panel
      * @String top: position in pixels from top
      * @memberOf themes/PlateauTheme/FoldablePanel/panel.js
      */
      _setMapCanvasArea: function (postionTop) {
        // if application is running in mobile device then adjust map bottom positioning
        // else for desktop devices adjust map right positioning right
        if (window.appInfo.isRunInMobile) {
          var attributeTableHeight = 0;
          if (query(".jimu-widget-attributetable")[0]) {
            attributeTableHeight = query(".jimu-widget-attributetable")[0].clientHeight;
          }
          // if panel state is minimized then keep map bottom position to 35px
          // else if it is maximized then resize bottom position to zero
          // else change it by top position to the panel
          if (this.windowState === 'minimized') {
            // if attribute table widget height is greater than 35px
            // then set bottom position to attributeTableHeight
            // else keep bottom position to 35px
            if ((attributeTableHeight > 0) && attributeTableHeight > 35) {
              topic.publish('changeMapPosition', {
                bottom: attributeTableHeight
              });
            } else {
              // if it is touch devices or browser width is less than 760px
              // then set bottom position to 35px else set it to zero
              if (window.hasOwnProperty("ontouchstart") ||
               window.ontouchstart !== undefined || window.innerWidth <= 760) {
                topic.publish('changeMapPosition', {
                  bottom: '35px'
                });
              } else {
                topic.publish('changeMapPosition', {
                  bottom: '0px'
                });
              }
            }
          } else if (this.windowState === 'maximized') {
            topic.publish('changeMapPosition', {
              bottom: "0px"
            });
          } else {
            // if attribute table widget height is greater than postionTop
            // then set bottom equal attributeTableHeight
            // else keep bottom as postionTop
            if ((attributeTableHeight > 0) && attributeTableHeight > postionTop) {
              topic.publish('changeMapPosition', {
                bottom: attributeTableHeight
              });
            } else {
              // if it is touch devices or browser width is less than 760px
              // then set bottom position dynamically else set it to zero
              if (window.hasOwnProperty("ontouchstart") ||
               window.ontouchstart !== undefined || window.innerWidth <= 760) {
                topic.publish('changeMapPosition', {
                  bottom: postionTop
                });
              } else {
                topic.publish('changeMapPosition', {
                  bottom: '0px'
                });
              }
            }
          }
        } else if (!window.appInfo.isRunInMobile) {
          // if browser state is minimized the adjust map right position to the zero
          // change it to 360px from right
          if (this.windowState === 'minimized') {
            topic.publish('changeMapPosition', {
              right: '0px'
            });
          } else {
            topic.publish('changeMapPosition', {
              right: '360px'
            });

            this._resizeAttributeTableinRTL();
          }
        }
      },

      /*
      * resizes the attribute table widget in case of RTL layout
      * after opening or closing, panel or other widgets
      * @memberOf widgets/HeaderController/widget.js
      */
      _resizeAttributeTableinRTL: function () {
        // if attribute table widget is available in the dom
        if (query(".jimu-widget-attributetable")[0]) {
          if (window.isRTL) {
            html.setStyle(query(".jimu-widget-attributetable")[0], 'right', '0px');
          } else {
            html.setStyle(query(".jimu-widget-attributetable")[0], 'left', '0px');
          }
          // if tab Container is  of attribute table widget is created in the dom
          if (query(".dijitTabContainer", query(".jimu-widget-attributetable")[0])[0]) {
            registry.byId(query(".dijitTabContainer",
            query(".jimu-widget-attributetable")[0])[0].id).resize();
          }
        }
      },

      updateConfig: function (_config) {
        this.inherited(arguments);
        this.setTitleLabel(_config.label);
      },

      _switchMaxBtn: function () {
        // if window width is less than 760px or window innerHeight is less than
        // 600px then show the maximize button else hide the maximize button
        if (window.appInfo.isRunInMobile && (window.innerWidth <= 760 ||
         window.innerHeight <= 600)) {
          html.setStyle(this.maxNode, 'display', '');
        } else {
          html.setStyle(this.maxNode, 'display', 'none');
        }
      },

      _switchParentNode: function () {
        html.place(this.domNode, jimuConfig.layoutId);
      },

      _setFrameSize: function (contentHeight) {
        var h, openedPaneCount = 0;

        //openedPaneCount should >= 1
        array.forEach(this.getChildren(), function (frame) {
          if (!frame.folded) {
            openedPaneCount++;
          }
        }, this);

        if (typeof contentHeight === 'undefined') {
          contentHeight = html.getContentBox(this.containerNode).h;
        }

        h = (contentHeight - (this.getChildren().length - openedPaneCount) *
          this.getChildren()[0].titleHeight) / openedPaneCount;
        array.forEach(this.getChildren(), function (frame) {
          if (frame.folded) {
            html.setStyle(frame.domNode, {
              height: frame.titleHeight + 'px'
            });
          } else {
            html.setStyle(frame.domNode, {
              height: h + 'px'
            });
          }
          frame.resize();
        }, this);
      },

      createCloseBtn: function () {
        this.closeNode = html.create('div', {
          'class': 'close-btn jimu-float-trailing'
        }, this.titleNode);

        this.own(on(this.closeNode, 'click', lang.hitch(this, function (evt) {
          evt.stopPropagation();
          /* New Changes For showing panel below header in mobile devices  */
          query('.widget-open-symbol').addClass('esriCTHidden');
          /* New Changes For showing panel below header in mobile devices  */
          this.panelManager.closePanel(this);
        })));
      },

      createMaxBtn: function () {
        this.maxNode = html.create('div', {
          'class': 'max-btn jimu-float-trailing'
        }, this.titleNode);

        this.own(on(this.maxNode, 'click', lang.hitch(this, function (evt) {
          evt.stopPropagation();
          html.removeClass(this.titleNode, 'esriCTBorderBottom');
          this.onMaxNodeClick();
        })));
      },

      createFrame: function (widgetConfig) {
        var frame;
        if (this.config.widgets && this.config.widgets.length === 1 || !this.config.widgets) {
          frame = new BaseWidgetFrame();
        } else {
          frame = new FoldableWidgetFrame({
            label: widgetConfig.label,
            widgetManager: this.widgetManager
          });

          aspect.after(frame, 'onFoldStateChanged', lang.hitch(this, function () {
            var openedPaneCount = 0;

            this._setFrameSize();
            array.forEach(this.getChildren(), function (frame) {
              if (!frame.folded) {
                openedPaneCount++;
              }
            }, this);

            array.forEach(this.getChildren(), function (frame) {
              if (!frame.folded && openedPaneCount === 1) {
                frame.foldEnable = false;
              } else {
                frame.foldEnable = true;
              }
            }, this);
          }));
        }

        return frame;
      },

      onFoldableNodeClick: function () {
        this.inherited(arguments);

        if (this.windowState === 'minimized') {
          html.removeClass(this.titleNode, 'esriCTBorderBottom');
          this.panelManager.normalizePanel(this);
        } else {
          this.panelManager.minimizePanel(this);
        }
      },

      onMaxNodeClick: function () {
        html.removeClass(this.titleNode, 'esriCTBorderBottom');
        if (this.windowState === 'maximized') {
          this.panelManager.normalizePanel(this);
        } else {
          this.panelManager.maximizePanel(this);
        }
      },

      moveTitle: function () {
        if (this.isFull) {
          if (this.folded) {
            html.setStyle(this.domNode, {
              top: (html.getMarginBox(jimuConfig.layoutId).h - this.titleHeight) + 'px'
            });
          } else {
            html.setStyle(this.domNode, {
              top: '0px'
            });
          }
        } else {
          html.setStyle(this.domNode, {
            top: this.position.top + 'px'
          });
        }
      }
    });
  });