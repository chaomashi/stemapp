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
  'dojo/_base/array',
  'dojo/_base/html',
  'dojo/aspect',
  'dojo/query',
  'dojo/on',
  'dojo/Deferred',
  'dojo/mouse',
  'dojo/topic',
  'dojo/dom-construct',
  'dojo/dom-geometry',
  'jimu/BaseWidget',
  'jimu/PoolControllerMixin',
  'jimu/tokenUtils',
  'jimu/portalUtils',
  'jimu/portalUrlUtils',
  'jimu/utils',
  'jimu/dijit/Message',
  './PopupTileNodes',
  'dijit/registry',
  'dojo/NodeList-manipulate'
],
  function (declare, lang, array, html, aspect, query, on, Deferred, mouse, topic,
    domConstruct, domGeometry, BaseWidget, PoolControllerMixin, tokenUtils, portalUtils,
    portalUrlUtils, utils, Message, PopupTileNodes, registry) {
    /* global jimuConfig */
    /* jshint scripturl:true */
    var clazz = declare([BaseWidget, PoolControllerMixin], {

      baseClass: 'jimu-widget-header-controller jimu-main-background',

      maxIconCount: -1,

      //whether need to create more icon
      createMoreIcon: false,

      //title, links are switchable depends the browser width
      switchableElements: {},

      //the default height of the widget
      height: 40,

      //the opened group/widget's id
      openedId: '',

      moveTopOnActive: false,

      postCreate: function () {
        this.inherited(arguments);

        this._processGroupSetting();

        this.switchableElements.title = this.titleNode;

        if (this.position && this.position.height) {
          this.height = this.position.height;
        }

        html.setStyle(this.signInSectionNode, 'display', 'none');

        if (this.appConfig && this.appConfig.logo) {
          this.logoNode.src = this.appConfig.logo;
          html.removeClass(this.logoNode, 'hide-logo');
        } else {
          this.logoNode.src = "";
          html.addClass(this.logoNode, 'hide-logo');
        }
        // If app title is not null then sanitize the title text
        if (this.appConfig.title) {
          this.appConfig.title = utils.sanitizeHTML(this.appConfig.title);
        }
        // If app title is not null then sanitize the subtitle text
        if (this.appConfig.subtitle) {
          this.appConfig.subtitle = utils.sanitizeHTML(this.appConfig.subtitle);
        }

        this.switchableElements.title.innerHTML = this.appConfig.title ? this.appConfig
          .title : '';
        this.switchableElements.title.title = this.appConfig.title ? this.appConfig
          .title : '';
        //If subtitle is valid them only add it to switchable elements and set its innerHTML
        //else empty the subtitle and don't add it in switchable elements
        if (this.appConfig.subtitle && lang.trim(this.appConfig.subtitle) !== "") {
          this.switchableElements.subtitle = this.subtitleNode;
          this.switchableElements.subtitle.innerHTML = this.appConfig.subtitle;
        } else {
          this.subtitleNode.innerHTML = '';
          html.setStyle(this.subtitleNode, 'display', 'none');
        }
        //creates links according to configuration
        this._createDynamicLinks(this.appConfig.links);

        this._setElementsSize();
        /* New Changes For showing panel below header in mobile devices  */
        this.own(on(this.domNode, mouse.enter, lang.hitch(this, function () {
          var title = '';
          var portalUrl = this.appConfig && this.appConfig.portalUrl || '';
          var server = portalUrlUtils.getServerByUrl(portalUrl);
          if (portalUrlUtils.isArcGIScom(server)) {
            server = 'ArcGIS.com';
          }
          if (server) {
            title = this.nls.signInTo + ' ' + server;
          }
          this.signinLinkNode.title = title;
        })));
        this._handleLogoLink(this.appConfig);
      },

      startup: function () {
        this.inherited(arguments);
        this.resize();
      },

      onAction: function (action, data) {
        /*jshint unused: false*/
        if (action === 'highLight' && data) {
          var node = query('div[settingid="' + data.widgetId + '"]', this.domNode)[0];
          this._highLight(node);
        }
        if (action === 'removeHighLight') {
          this._removeHighLight();
        }
      },

      onSignIn: function (credential) {
        this.inherited(arguments);

        html.setStyle(this.signinLinkNode, 'display', 'none');
        html.setStyle(this.userNameLinkNode, 'display', '');
        html.setStyle(this.signoutLinkNode, 'display', '');

        this.userNameLinkNode.innerHTML = credential.userId;
        html.setAttr(this.userNameLinkNode, 'href', this.appConfig.portalUrl + 'home/user.html');

        //popup
        if (this.popupLinkNode) {
          html.setStyle(this.popupSigninNode, 'display', 'none');
          html.setStyle(this.popupUserNameNode, 'display', '');
          html.setStyle(this.popupSignoutNode, 'display', '');

          query('a', this.popupUserNameNode).html(credential.userId)
            .attr('href', this.appConfig.portalUrl + 'home/user.html');
        }
        this.resize();
      },

      onSignOut: function () {
        this.inherited(arguments);

        this._onSignOut(this.nls.signin);

        var portal = portalUtils.getPortal(this.appConfig.portalUrl);
        portal.loadSelfInfo().then(lang.hitch(this, function (selfInfo) {
          var name = selfInfo.name;
          var signInTip = this.nls.signInTo + ' ' + name;
          this._onSignOut(signInTip);
        }), lang.hitch(this, function (err) {
          console.error(err);
        }));
      },

      _onSignOut: function (signInTip) {
        html.setStyle(this.signinLinkNode, 'display', '');
        html.setAttr(this.signinLinkNode, 'innerHTML', signInTip);
        html.setStyle(this.userNameLinkNode, 'display', 'none');
        html.setStyle(this.signoutLinkNode, 'display', 'none');

        this.userNameLinkNode.innerHTML = '';

        //popup
        if (this.popupLinkNode) {
          html.setStyle(this.popupSigninNode, 'display', '');
          html.setAttr(this.popupSigninNode, 'innerHTML', signInTip);
          html.setStyle(this.popupUserNameNode, 'display', 'none');
          html.setStyle(this.popupSignoutNode, 'display', 'none');

          query('a', this.popupUserNameNode).html('');
        }

        this.resize();
      },

      resize: function () {
        var attributeTableHeight = 0;
        var headerNodeFloat = html.getStyle(this.headerNode, 'float');
        var logoNodeFloat = html.getStyle(this.logoNode, 'float');
        var titlesNodeFloat = html.getStyle(this.titlesNode, 'float');
        var linksNodeFloat = html.getStyle(this.linksNode, 'float');
        var allHasFloatStyle = (headerNodeFloat && headerNodeFloat !== 'none') &&
          (logoNodeFloat && logoNodeFloat !== 'none') &&
          (titlesNodeFloat && titlesNodeFloat !== 'none') &&
          (linksNodeFloat && linksNodeFloat !== 'none');

        if (allHasFloatStyle) {
          this._resize();
        } else {
          setTimeout(lang.hitch(this, this.resize), 200);
        }

        if (query(".jimu-widget-attributetable")[0]) {
          attributeTableHeight = query(".jimu-widget-attributetable")[0].clientHeight;
        }
        if (attributeTableHeight) {
          topic.publish('changeMapPosition', {
            bottom: attributeTableHeight
          });
        } else {
          topic.publish('changeMapPosition', {
            bottom: "0px"
          });
        }
      },

      _resize: function () {
        var box = html.getContentBox(this.domNode);

        //by default, we show all elements
        this._showSwitchableElements(['title', 'links', 'subtitle']);
        //as after showing all the elements title width may changed so update its width to fit other elements
        this._updateTitleNodeWidth();
        this._getTitleContainerWidth(box);
        this._createIconNodes(box);
        //again after changing/creating icon nodes title width may change so update its width to fit other elements
        this._updateTitleNodeWidth();
        if (this.morePane) {
          this.morePane.resize();
        }
        if (this.popupLinkNode) {
          html.setStyle(jimuConfig.layoutId, {
            left: html.getContentBox(this.popupLinkNode).w + 'px'
          });
        }
      },

      //Calculates and sets the Title Node Width
      _updateTitleNodeWidth: function () {
        var box, maxWidth, spaceLeft, containerWidth;
        box = html.getContentBox(this.domNode);
        //get complete header container width
        containerWidth = this._getHeaderContainerWidth(box);
        //calculate the available left space
        spaceLeft = containerWidth - this._getLogoWidth() - this._getTitlesWidth() -
          this._getSubtitleWidth() - this._getLinkWidth();
        //set the max width of the title by adding left space also extra 40px considering margins
        maxWidth = this._getTitlesWidth() + spaceLeft + 40;
        //if subtitle is not available increase the title's width by 20
        if (html.getStyle(this.subtitleNode, 'display') === "none") {
          maxWidth += 20;
          //if links are not available increase the title's width by 20
          if (html.getStyle(this.linksNode, 'display') === "none") {
            maxWidth += 20;
          }
        }
        //if calculated maxWidth is less tha 150 set max width as 15 else set the calculated max width
        if (maxWidth < 150) {
          html.setStyle(this.titleNode, 'max-width', '150px');
        } else {
          html.setStyle(this.titleNode, 'max-width', maxWidth + 'px');
        }
      },

      destroy: function () {
        if (this.timeoutHandle) {
          clearTimeout(this.timeoutHandle);
          this.timeoutHandle = null;
        }
        if (this.morePane) {
          this.morePane.destroy();
        }
        if (this.moreIconPaneCoverNode) {
          html.destroy(this.moreIconPaneCoverNode);
          this.moreIconPaneCoverNode = null;
        }
        if (this.popupLinkNode && this.popupLinksVisible) {
          this._hidePopupLink();
        }
        html.destroy(this.popupLinkNode);
        this.inherited(arguments);
      },

      onAppConfigChanged: function (appConfig, reason, changedData) {
        switch (reason) {
          case 'attributeChange':
            this._onAttributeChange(appConfig, changedData);
            break;
          default:
            return;
        }
        this.appConfig = appConfig;
        this.resize();
      },

      getOpenedIds: function () {
        this.inherited(arguments);
        if (this.openedId === '') {
          return [];
        }
        return [this.openedId];
      },

      setOpenedIds: function (ids) {
        if (ids.length === 0) {
          return;
        }
        var config = this.getConfigById(ids[0]);
        if (!config) {
          return;
        }
        this.openedId = ids[0];
        if (config.widgets && config.openType === 'openAll') {
          this._showIconContent(config);
        } else if (!config.widgets) {
          this._showIconContent(config);
        }
      },

      _onLogoLoad: function () {
        this.resize();
      },

      _highLight: function (node) {
        if (this.hlDiv) {
          this._removeHighLight();
        }
        if (!node) {
          return;
        }
        var position = domGeometry.getMarginBox(node);
        var hlStyle = {
          position: 'absolute',
          left: (position.l) + 'px',
          top: (position.t) + 'px',
          width: (position.w) + 'px',
          height: (position.h) + 'px'
        };
        this.hlDiv = domConstruct.create('div', {
          "style": hlStyle,
          "class": 'icon-highlight'
        }, node, 'before');
      },

      _removeHighLight: function () {
        if (this.hlDiv) {
          domConstruct.destroy(this.hlDiv);
          this.hlDiv = null;
        }
      },


      _onAttributeChange: function (appConfig, changedData) {
        /*jshint unused: false*/
        var appTitle;
        if ('title' in changedData && changedData.title !== this.appConfig.title) {
          appTitle = utils.sanitizeHTML(changedData.title);
          this.titleNode.innerHTML = appTitle;
          this.titleNode.title = appTitle;
        }
        if ('subtitle' in changedData && changedData.subtitle !== this.appConfig.subtitle) {
          this.subtitleNode.innerHTML = utils.sanitizeHTML(changedData.subtitle);
        }
        if ('logo' in changedData && changedData.logo !== this.appConfig.logo) {
          if (changedData.logo) {
            html.setAttr(this.logoNode, 'src', changedData.logo);
            html.removeClass(this.logoNode, 'hide-logo');
          } else {
            html.removeAttr(this.logoNode, 'src');
            html.addClass(this.logoNode, 'hide-logo');
          }
        }

        if ('links' in changedData) {
          this._createDynamicLinks(changedData.links);
        }
        this._handleLogoLink(appConfig);
      },

      _handleLogoLink: function(appConfig){
        if(appConfig.logoLink){
          html.setAttr(this.logoLinkNode, 'href', appConfig.logoLink);
          html.setStyle(this.logoNode, 'cursor', 'pointer');
        }else{
          html.setAttr(this.logoLinkNode, 'href', 'javascript:void(0)');
          html.setStyle(this.logoNode, 'cursor', 'default');
        }
      },

      _setElementsSize: function () {
        html.setStyle(this.logoNode, {
          height: '30px',
          marginTop: ((this.height - 30) / 2) + 'px'
        });

        html.setStyle(this.titleNode, {
          lineHeight: this.height + 'px'
        });

        html.setStyle(this.subtitleNode, {
          lineHeight: this.height + 'px'
        });

        query('.jimu-link', this.domNode).style({
          lineHeight: this.height + 'px'
        });
      },

      _processGroupSetting: function () {
        // Sets the map canvas area according to area
        // remained after opening and closing of widget panel
        this._setMapCanvasAreaToDefault();
        function getOpenType(gLabel) {
          if (this.config.groupSetting) {
            for (var i = 0; i < this.config.groupSetting.length; i++) {
              if (this.config.groupSetting[i].label === gLabel) {
                return this.config.groupSetting[i].type;
              }
            }
          }
          //this is the default open type
          return 'openAll';
        }
        array.forEach(this.appConfig.widgetPool.groups, function (g) {
          g.openType = getOpenType.call(this, g.label);
        }, this);
      },

      _createDynamicLinks: function (links) {
        if (window.isRTL) {
          var _links = [];
          array.forEach(links, function (link) {
            _links.unshift(link);
          });
          links = _links;
        }
        html.empty(this.dynamicLinksNode);
        //if no links are configured hide the link node else create configured links
        if (links.length <= 0) {
          html.setStyle(this.linksNode, 'display', 'none');
          //If dynamicLinks already exist in switchable elements remove it as links length is 0
          if (this.switchableElements.hasOwnProperty("links")) {
            delete this.switchableElements.links;
          }
        } else {
          //As dynamicLinks exist add linksNode to switchable elements
          this.switchableElements.links = this.linksNode;
          array.forEach(links, function (link) {
            html.create('a', {
              href: link.url,
              target: '_blank',
              innerHTML: utils.sanitizeHTML(link.label),
              'class': "jimu-link jimu-align-leading jimu-leading-margin1",
              style: {
                lineHeight: this.height + 'px'
              }
            }, this.dynamicLinksNode);
          }, this);
        }
      },

      _showSwitchableElements: function (showElement) {
        var es = this.switchableElements;

        for (var p in es) {
          if (es.hasOwnProperty(p)) {
            if (showElement.indexOf(p) > -1) {
              html.setStyle(es[p], 'display', 'block');
              es[p].visible = true;
            } else {
              html.setStyle(es[p], 'display', 'none');
              es[p].visible = false;
            }
          }
        }
        //links is hidden
        if (this.logoClickHandle) {
          this.logoClickHandle.remove();
        }

        if (showElement.indexOf('links') < 0) {
          this.logoClickHandle = on(this.logoNode, 'click', lang.hitch(this, this._onLogoClick));
        } else {
          if (this.popupLinksVisible) {
            this._hidePopupLink();
          }
          if(this.appConfig.logoLink){
            html.setStyle(this.logoNode, 'cursor', 'pointer');
          }else{
            html.setStyle(this.logoNode, 'cursor', 'default');
          }
        }
      },

      _switchSignin: function () {
        var credential = tokenUtils.getPortalCredential(this.appConfig.portalUrl);
        if (credential) {
          this.onSignIn(credential);
        } else {
          this.onSignOut();
        }
      },

      _onLogoClick: function () {
        // return;
        if (this.popupLinkNode) {
          html.destroy(this.popupLinkNode);

        }
        this.popupLinkNode = this._createPopupLinkNode();

        if (this.popupLinksVisible) {
          this._hidePopupLink();
        } else {
          this._showPopupLink();
        }
      },

      _hidePopupLink: function () {
        html.setStyle(this.popupLinkNode, 'display', 'none');

        if (window.isRTL) {
          html.setStyle(jimuConfig.layoutId, {
            right: 0
          });
        } else {
          html.setStyle(jimuConfig.layoutId, {
            left: 0
          });
        }

        this.popupLinksVisible = false;
      },

      _showPopupLink: function () {
        html.setStyle(this.popupLinkNode, 'display', '');

        if (window.isRTL) {
          html.setStyle(jimuConfig.layoutId, {
            right: html.getContentBox(this.popupLinkNode).w + 'px'
          });
        } else {
          html.setStyle(jimuConfig.layoutId, {
            left: html.getContentBox(this.popupLinkNode).w + 'px'
          });
        }

        this.popupLinksVisible = true;
      },

      _createPopupLinkNode: function () {
        var node, titleNode, box;
        box = html.getContentBox(jimuConfig.mainPageId);

        node = html.create('div', {
          'class': 'popup-links jimu-main-background',
          style: {
            position: 'absolute',
            zIndex: 100,
            top: 0,
            bottom: 0
          }
        }, jimuConfig.mainPageId);

        if (window.isRTL) {
          html.setStyle(node, {
            right: 0,
            left: '50px'
          });
        } else {
          html.setStyle(node, {
            left: 0,
            right: '50px'
          });
        }

        titleNode = html.create('div', {
          'class': 'popup-title',
          style: {
            height: this.height + 'px',
            width: '100%'
          }
        }, node);

        html.create('img', {
          'class': 'logo jimu-float-leading jimu-leading-margin1',
          src: this.appConfig.logo ? this.appConfig.logo : this.folderUrl + 'images/app-logo.png',
          style: {
            width: '30px',
            height: '30px',
            marginTop: ((this.height - 30) / 2) + 'px'
          }
        }, titleNode);

        html.create('div', {
          'class': 'title jimu-float-leading jimu-leading-margin1',
          innerHTML: utils.sanitizeHTML(this.appConfig.title),
          style: {
            lineHeight: this.height + 'px'
          }
        }, titleNode);

        array.forEach(this.appConfig.links, function (link) {
          this._createLinkNode(node, link, false);
        }, this);

        this._createLinkNode(node, {
          label: '',
          url: '#'
        }, false);
        return node;
      },

      _createLinkNode: function (containerNode, link, isSign) {
        var node, lineNode, linkSectionNode, className;

        node = html.place('<div class="jimu-link"></div>', containerNode);

        lineNode = html.place('<div class="line"></div>', node);
        if (isSign) {
          className = 'link-section signin';
        } else {
          className = 'link-section';
        }
        linkSectionNode = html.place('<div class="' + className + '"></div>', node);
        html.create('a', {
          href: link.url,
          'class': 'jimu-ellipsis',
          target: '_blank',
          innerHTML: utils.sanitizeHTML(link.label),
          title: utils.sanitizeHTML(link.label),
          style: {
            lineHeight: '66px'
          }
        }, linkSectionNode);

        return node;
      },

      _onSigninClick: function () {
        tokenUtils.signInPortal(this.appConfig.portalUrl, this.appConfig.appId);
      },

      _onSignoutClick: function () {
        var isDepolyedApp = !this.appConfig.mode;

        if (isDepolyedApp) {
          tokenUtils.signOutAll();
        } else {
          new Message({
            message: this.nls.cantSignOutTip
          });
        }
      },

      _onUserNameClick: function () {

      },

      /*
      * Calculates the width of header section div
      * @memberOf widgets/HeaderController/widget.js
      */
      _getHeaderSectionWidth: function () {
        var width;
        width = html.getMarginBox(this.headerNode).w;
        return width;
      },

      /*
      * Calculate width for titles and subtitles
      * @memberOf widgets/HeaderController/widget.js
      */
      _getIconContainerWidth: function () {
        var iconContainerWidth;
        //the container width
        iconContainerWidth = html.getMarginBox(this.containerNode).w;
        return iconContainerWidth;
      },

      /*
      * Calculates the width of header title div
      * @memberOf widgets/HeaderController/widget.js
      */
      _getTitlesWidth: function () {
        var titlseWidth;
        titlseWidth = html.getMarginBox(this.titlesNode).w;
        return titlseWidth;
      },

      /*
      * Calculates the width of header link div
      * @memberOf widgets/HeaderController/widget.js
      */
      _getLinkWidth: function () {
        var linkWidth;
        linkWidth = html.getMarginBox(this.linksNode).w;
        return linkWidth;
      },

      /*
      * Calculates the width of header logo div
      * @memberOf widgets/HeaderController/widget.js
      */
      _getLogoWidth: function () {
        var width;
        width = html.getMarginBox(this.logoNode).w + 12;
        return width;
      },

      /*
      * Calculates the width of header Subtitle div
      * @memberOf widgets/HeaderController/widget.js
      */
      _getSubtitleWidth: function () {
        var subTitleWidth;
        subTitleWidth = html.getMarginBox(this.subtitleNode).w;
        return subTitleWidth;
      },

      /*
      * Calculates the header container which contains
      * app-logo, title, subtitle, links etc
      * @memberOf widgets/HeaderController/widget.js
      */
      _getHeaderContainerWidth: function (box) {
        var headSectionWidth = this._getIconContainerWidth();
        var logosectionWidth = this._getLogoWidth();
        //the container width
        var containerWidth = box.w - headSectionWidth - logosectionWidth;
        return containerWidth;
      },

      /*
      * Hide and show title, subtitle, link
      * according to the width of the there text
      * title is in first priority then subtitle and links subsequently
      * @memberOf widgets/HeaderController/widget.js
      */
      _getTitleContainerWidth: function (box) {
        var containerWidth = this._getHeaderContainerWidth(box);
        var tileswidth = this._getTitlesWidth();
        var linkWidth = this._getLinkWidth();
        // if the header container containing title, subtitle, link width is less
        // than titles and subtitle width then only
        if (containerWidth < (tileswidth + linkWidth)) {
          // if link div is visible then only
          if (this.switchableElements.hasOwnProperty("links") &&
            this.switchableElements.links.visible) {
            //hidden link first
            this._showSwitchableElements(['title', 'subtitle']);
            tileswidth = this._getTitlesWidth();
            if (containerWidth < tileswidth) {
              //hidden Subtitle first
              this._showSwitchableElements(['title']);
            }
          } else {
            //hiden the title, subtitle, links
            this._showSwitchableElements(['title']);
          }
        }
      },

      _createIconNodes: function (box, openingWidgetId) {
        query('.icon-node', this.containerNode).remove();
        this._closeDropMenu();

        var i, iconConfig, ret, allIconConfigs = this.getAllConfigs(), moveToHeader;
        //by default, the icon is square
        this.iconWidth = box.h;
        ret = this._getTitleContainerWidth(box);

        var iconContainerWidth = 360;
        if (window.innerWidth <= 760) {
          iconContainerWidth = 90;
        } else {
          iconContainerWidth = 360;
        }

        var containerStyle = {
          width: iconContainerWidth + 'px'
        };

        /* New Changes For showing panel below header in mobile devices  */
        html.setStyle(this.containerNode, containerStyle);

        if (window.innerWidth <= 760) {
          this.maxIconCount = 2;
        } else {
          this.maxIconCount = Math.floor(360 / 45);
        }
        if (this.maxIconCount >= allIconConfigs.length) {
          this.headerIconCount = allIconConfigs.length;
          this.createMoreIcon = false;
        } else {
          this.headerIconCount = this.maxIconCount - 1;
          this.createMoreIcon = true;
        }
        if (this.createMoreIcon) {
          this._createIconNode({
            label: this.nls.more
          });
          /*Move open widget to header icon List -
          *If any openAtStart/alreadyOpen widget goes into more panel this will bring it to header *icon list
          */
          if (!this.openAtStartWidget) {
            for (i = 0; i < allIconConfigs.length; i++) {
              if (allIconConfigs[i].openAtStart) {
                moveToHeader = allIconConfigs[i];
              }
            }
          }
          //if not opening widget from more list and and some widget is already opened,
          //show the opened widget icon in header icon list
          if (!openingWidgetId && this.openedId && this.getConfigById(this.openedId)) {
            moveToHeader = this.getConfigById(this.openedId);
          }
          if (moveToHeader) {
            this._moveConfigToHeader(moveToHeader);
          }
          /* End Move open widget to header icon List */
        }

        var openAtStartNode;
        for (i = this.headerIconCount - 1; i >= 0; i--) {
          iconConfig = allIconConfigs[i];
          var node = this._createIconNode(iconConfig);

          if (iconConfig.openAtStart) {
            openAtStartNode = node;
          }
        }
        //open the first openatstart widget
        if (openAtStartNode && !this.openAtStartWidget) {
          this._onIconClick(openAtStartNode);
          this.openAtStartWidget = openAtStartNode.config.name;
        }

        if (this.openedId && this.getConfigById(this.openedId) &&
          this.getConfigById(this.openedId).inPanel === false) {
          var openedIconNode = this._getIconNodeById(this.openedId);
          var openedWidget = this.widgetManager.getWidgetById(this.openedId);
          if (openedIconNode && openedWidget) {
            this._setOffPanelWidgetPosition(openedIconNode, openedWidget);
          } else {
            this.widgetManager.closeWidget(this.openedId);
            this.openedId = '';
          }
        }
      },

      _createIconNode: function (iconConfig) {
        var node, iconUrl, iconParent, iconSelectedDiv;
        if (iconConfig.label === this.nls.more) {
          iconUrl = this.folderUrl + 'images/more_icon.png';
        } else {
          iconUrl = iconConfig.icon;
        }

        node = html.create('div', {
          'class': 'icon-node jimu-float-trailing',
          title: iconConfig.label,
          settingId: iconConfig.id,
          style: {
            width: 45 + 'px',
            height: this.height + 'px',
            textAlign: 'center'
          }
        }, this.containerNode);
        /* New Changes For showing panel below header in mobile devices  */
        iconParent = html.create('div', {
          'class': 'widget-symbol-div',
          style: {
            width: 100 + '%'
          }
        }, node);

        html.create('img', {
          src: iconUrl,
          style: {
            marginTop: ((this.height - 30) / 2 + 3) + 'px',
            marginBottom: 3 + 'px'
          }
        }, iconParent);

        iconSelectedDiv = html.create('div', {
          'class': 'widget-open-symbol esriCTHidden'
        }, node);

        /* New Changes For showing panel below header in mobile devices  */
        if (iconConfig.label === this.nls.more) {
          on(node, 'click', lang.hitch(this, this._showMorePane, iconConfig));
        } else {
          on(node, 'click', lang.hitch(this, function () {
            this._onIconClick(node);
          }));
        }
        node.config = iconConfig;
        if (node.config.widgets && node.config.widgets.length > 1 &&
          node.config.openType === 'dropDown') {
          this._createDropTriangle(node);
        }

        //set current open node
        if (this.openedId === iconConfig.id) {
          html.addClass(node, 'jimu-state-selected');
          //Hide widget open symbol of all widgets
          query('.widget-open-symbol', this.domNode).addClass('esriCTHidden');
          //Show widget open symbol of the current open widget only
          html.removeClass(iconSelectedDiv, 'esriCTHidden');
          if (node.config.widgets && node.config.widgets.length > 1 &&
            node.config.openType === 'dropDown') {
            this._openDropMenu(node);
          }
        }
        return node;
      },

      _createDropTriangle: function (node) {
        var box = html.getMarginBox(node);
        var triangleLeft = box.l + box.w / 2 - 4;
        html.create('div', {
          'class': 'drop-triangle',
          style: {
            left: triangleLeft + 'px'
          }
        }, node);
      },

      _onIconClick: function (node) {
        if (!node.config.widgets || node.config.widgets.length === 1 ||
          node.config.openType === 'openAll') {
          //widget or group with 'openAll' open type
          if (this.openedId && this.openedId === node.config.id) {
            this._switchNodeToClose(this.openedId);
            return;
          } else {
            if (this.openedId) {
              this._switchNodeToClose(this.openedId).then(lang.hitch(this, function () {
                this._closeDropMenu();
                this._switchNodeToOpen(node.config.id);
              }));
            } else {
              this._switchNodeToOpen(node.config.id);
            }
          }
        } else {
          if (this.dropMenuNode) {
            this._closeDropMenu();
          } else {
            this._openDropMenu(node);
          }
        }
      },

      _closeDropMenu: function () {
        if (this.dropMenuNode) {
          html.destroy(this.dropMenuNode);
          this.dropMenuNode = null;
        }
      },

      _openDropMenu: function (pnode) {
        this.dropMenuNode = html.create('div', {
          'class': 'jimu-drop-menu jimu-main-background',
          title: pnode.config.label,
          style: {
            position: 'absolute',
            zIndex: '101'
          }
        });

        html.place(this.dropMenuNode, this.containerNode);

        array.forEach(pnode.config.widgets, function (widgetConfig) {
          this._createDropMenuItem(widgetConfig);
        }, this);

        this._setDropMenuPosition(pnode);

        if (this.morePane) {
          this.morePane.hide();
        }
      },

      _createDropMenuItem: function (sconfig) {
        var node = html.create('div', {
          'class': 'menu-item',
          title: utils.sanitizeHTML(sconfig.label),
          style: {
            height: this.height + 'px'
          }
        }, this.dropMenuNode);

        html.create('img', {
          'class': 'jimu-float-leading',
          src: sconfig.icon
        }, node);

        html.create('div', {
          'class': 'label jimu-float-leading',
          innerHTML: utils.sanitizeHTML(sconfig.label)
        }, node);

        this.own(on(node, 'click', lang.hitch(this, function () {
          this._closeDropMenu();
          if (this.openedId) {
            this._switchNodeToClose(this.openedId).then(lang.hitch(this, function () {
              this._showIconContent(node.config);
            }));
          } else {
            this._showIconContent(node.config);
          }
        })));
        node.config = sconfig;
        return node;
      },

      _setDropMenuPosition: function (pnode) {
        var position = {};
        var menuBox = html.getMarginBox(this.dropMenuNode);

        position = this._getDropdownPosition(pnode, menuBox);
        position.zIndex = 101;
        html.setStyle(this.dropMenuNode, utils.getPositionStyle(position));
      },

      _getDropdownPosition: function (pnode, sbox) {
        var position = {},
          pbox = html.getMarginBox(pnode),
          thisBox = html.getMarginBox(this.domNode);

        position.top = this.height + 1;

        if (window.isRTL) {
          if (pbox.l + pbox.w - sbox.w < 0) {
            position.right = 0;
          } else {
            position.right = pbox.l + pbox.w - sbox.w;
          }
        } else {
          if (pbox.l + sbox.w > thisBox.w) {
            position.right = 0;
          } else {
            position.left = pbox.l;
          }
        }
        return position;
      },

      _switchNodeToOpen: function (id) {
        var node = this._getIconNodeById(id);
        query('.icon-node', this.domNode).removeClass('jimu-state-selected');
        /* New Changes For showing panel below header in mobile devices  */
        query('.widget-open-symbol', this.domNode).addClass('esriCTHidden');
        html.addClass(node, 'jimu-state-selected');
        html.removeClass(node.children[1], 'esriCTHidden');
        /* New Changes For showing panel below header in mobile devices  */
        this._showIconContent(node.config);
      },

      _switchNodeToClose: function (id) {
        query('.icon-node', this.domNode).removeClass('jimu-state-selected');
        // Sets the map canvas area according to area
        // remained after opening and closing of widget panel
        this._setMapCanvasAreaToDefault();

        /* New Changes For showing panel below header in mobile devices  */
        query('.widget-open-symbol', this.domNode).addClass('esriCTHidden');
        var iconJson = this.appConfig.getConfigElementById(id);
        var def;
        if (iconJson) {
          if (iconJson.inPanel === false) {
            this.widgetManager.closeWidget(id);
            this.openedId = '';
            def = new Deferred();
            def.resolve();
            return def;
          } else {
            return this.panelManager.closePanel(id + '_panel');
          }
        } else {
          def = new Deferred();
          def.resolve();
          return def;
        }
      },

      /*
      * Sets map canvas area to default position
      * @memberOf widgets/HeaderController/widget.js
      */
      _setMapCanvasAreaToDefault: function () {
        // if application is running in desktop device then keep right zero
        // else for mobile devices keep bottom zero
        if (!window.appInfo.isRunInMobile) {
          topic.publish('changeMapPosition', {
            right: "0px"
          });
        } else {
          var attributeTableHeight = 0;
          if (query(".jimu-widget-attributetable")[0]) {
            attributeTableHeight = query(".jimu-widget-attributetable")[0].clientHeight;
          }
          // if attribute table widget height is greater than zero
          // then set bottom equal attributeTableHeight
          // else keep bottom as zero
          if (attributeTableHeight) {
            topic.publish('changeMapPosition', {
              bottom: attributeTableHeight
            });
          } else {
            topic.publish('changeMapPosition', {
              bottom: "0px"
            });
          }
        }
      },

      /*
      * Adjusts the map canvas area according to remaining area
      * after opening or closing, panel or other widgets
      * @memberOf widgets/HeaderController/widget.js
      */
      _setMapCanvasArea: function () {
        // if application is running in desktop device
        if (!window.appInfo.isRunInMobile) {
          // if browser is minimized the change map right position to zero
          // else change it by 360px
          if (this.panelManager && this.panelManager.activePanel &&
            this.panelManager.activePanel.windowState === "minimized") {
            topic.publish('changeMapPosition', {
              right: "0px"
            });
          } else {
            topic.publish('changeMapPosition', {
              right: "360px"
            });

            this._resizeAttributeTableinRTL();
          }
        } else {
          // if application is running in mobile devices and panel resizing state is
          // normal then set the bottom positioning of the map equal to the panel top
          // position so that map content pane can be visible in that remaining area only
          // else keep bottom position 36px for folded mode
          var attributeTableHeight = 0;
          if (query(".jimu-widget-attributetable")[0]) {
            attributeTableHeight = query(".jimu-widget-attributetable")[0].clientHeight;
          }
          if (this.panelManager && this.panelManager.panels && this.panelManager.panels[0] &&
            this.panelManager.panels[0].windowState === "normal") {
            var panelPosition = this.panelManager.getPositionOnMobile(this);
            // if attribute table widget height is greater than panelPosition.top
            // then set bottom equal attributeTableHeight
            // else keep bottom as panelPosition.top
            if (attributeTableHeight && attributeTableHeight > panelPosition.top) {
              topic.publish('changeMapPosition', {
                bottom: attributeTableHeight
              });
            } else {
              topic.publish('changeMapPosition', {
                bottom: panelPosition.top
              });
            }
          } else {
            // if attribute table widget height is greater than 36px
            // then set bottom position to attributeTableHeight
            // else keep bottom position to 36px
            if (attributeTableHeight > 36) {
              topic.publish('changeMapPosition', {
                bottom: attributeTableHeight
              });
            } else {
              // if it is touch devices or browser width is less than 760px
              // then set bottom position to 36px else set it to zero
              if (window.hasOwnProperty("ontouchstart") ||
                window.ontouchstart !== undefined || window.innerWidth <= 760) {
                topic.publish('changeMapPosition', {
                  bottom: "36px"
                });
              } else {
                topic.publish('changeMapPosition', {
                  bottom: "0px"
                });
              }
            }
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

      _getIconNodeById: function (id) {
        var node = query('.icon-node[settingId="' + id + '"]', this.domNode);
        if (node.length === 0) {
          return;
        }
        return node[0];
      },

      _unSelectIcon: function (id) {
        query('.icon-node[settingId="' + id + '"]', this.domNode)
          .removeClass('jimu-state-selected');
        this.openedId = '';
      },

      _showIconContent: function (iconConfig) {
        if (iconConfig.inPanel === false) {
          this.widgetManager.loadWidget(iconConfig).then(lang.hitch(this, function (widget) {
            this.openedId = iconConfig.id;
            var iconNode = this._getIconNodeById(iconConfig.id);

            //we don't call widget.startup because getWidgetMarginBox has started widget
            //widget.startup();

            html.setStyle(widget.domNode, 'zIndex', 101);

            this._setOffPanelWidgetPosition(iconNode, widget);
            this.widgetManager.openWidget(widget);

            this.own(aspect.after(widget, 'onClose', lang.hitch(this, function () {
              query('.widget-open-symbol', this.domNode).addClass('esriCTHidden');
              // Sets the map canvas area according to area
              // remained after opening and closing of widget panel
              this._setMapCanvasAreaToDefault();
              // ST: Added to listen for out of panel widgets that can be closed
              this._unSelectIcon(iconConfig.id);
            })));
          }));
        } else {
          // Sets the map canvas area according to area
          // remained after opening and closing of widget panel
          this._setMapCanvasArea();
          this.panelManager.showPanel(iconConfig).then(lang.hitch(this, function (panel) {
            var node;
            this.openedId = iconConfig.id;
            node = this._getIconNodeById(this.openedId);
            query('.icon-node', this.domNode).removeClass('jimu-state-selected');
            /* New Changes For showing panel below header in mobile devices  */
            query('.widget-open-symbol', this.domNode).addClass('esriCTHidden');
            html.addClass(node, 'jimu-state-selected');
            html.removeClass(node.children[1], 'esriCTHidden');

            this.own(aspect.after(panel, 'onClose', lang.hitch(this, function () {
              this._unSelectIcon(iconConfig.id);
              // Sets the map canvas area according to area
              // remained after opening and closing of widget panel
              this._setMapCanvasAreaToDefault();
            })));
          }));
        }
      },

      _setOffPanelWidgetPosition: function (iconNode, widget) {
        var position = this._getDropdownPosition(iconNode,
          this.widgetManager.getWidgetMarginBox(widget));
        widget.setPosition(position, this.containerNode);
      },

      _showMorePane: function () {
        var i, iconConfig, moreItems = [],
          allIconConfigs = this.getAllConfigs();

        for (i = this.headerIconCount; i < allIconConfigs.length; i++) {
          iconConfig = allIconConfigs[i];
          if (iconConfig.id !== this.openedId) {
            moreItems.push(iconConfig);
          }
        }
        if (this.morePane) {
          this.morePane.destroy();
        }
        if (this.moreIconPaneCoverNode) {
          html.destroy(this.moreIconPaneCoverNode);
        }

        this._closeDropMenu();

        this.morePane = new PopupTileNodes({
          openedId: this.openedId,
          items: moreItems,
          numWidget: allIconConfigs
        });
        this._createCoverNode();
        html.place(this.morePane.domNode, jimuConfig.mapId);
        this.morePane.startup();

        aspect.after(this.morePane, 'onNodeClicked', lang.hitch(this, function (node) {
          this._moveConfigToHeader(node.config);
          this._createIconNodes(html.getContentBox(this.domNode), node.config.id);
          this._onIconClick(this._getIconNodeById(node.config.id));
        }), true);
        aspect.after(this.morePane, 'hide', lang.hitch(this, function () {
          html.destroy(this.moreIconPaneCoverNode);
        }), true);
      },

      _moveConfigToHeader: function (config) {
        var allIconConfigs = this.getAllConfigs();

        var tempIndex = config.index;
        config.index = allIconConfigs[this.headerIconCount - 1].index;
        allIconConfigs[this.headerIconCount - 1].index = tempIndex;
      },

      _createCoverNode: function () {
        this.moreIconPaneCoverNode = html.create('div', {
          'class': 'jimu-more-icon-cover'
        }, jimuConfig.layoutId);
      }
    });
    return clazz;
  });