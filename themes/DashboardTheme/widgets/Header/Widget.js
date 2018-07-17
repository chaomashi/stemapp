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
    'dojo/query',
    'dojo/on',
    'dojo/mouse',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'jimu/BaseWidget',
    'jimu/tokenUtils',
    'jimu/portalUtils',
    'jimu/portalUrlUtils',
    'jimu/utils',
    'jimu/dijit/Message'
  ],
  function(declare, lang, array, html, query, on, mouse,
    domConstruct, domGeometry, BaseWidget, tokenUtils, portalUtils,
    portalUrlUtils, utils, Message) {
    /* global jimuConfig */
    /* jshint scripturl:true */
    var clazz = declare([BaseWidget], {

      baseClass: 'jimu-widget-dnd-header',

      //title, links are switchable depends the browser width
      switchableElements: {},

      //the default height of the widget
      height: 80,

      moveTopOnActive: false,

      postCreate: function() {
        this.inherited(arguments);

        this.switchableElements.title = this.titleNode;
        this.switchableElements.links = this.linksNode;
        this.switchableElements.subtitle = this.subtitleNode;

        if (this.position && this.position.height) {
          this.height = this.position.height;
        }

        this._handleTitleColorAndLogoLink(this.appConfig);

        // if (!this.appConfig.portalUrl) {
        html.setStyle(this.signInSectionNode, 'display', 'none');
        // } else {
        //   html.setStyle(this.signInSectionNode, 'display', '');
        // }

        if (this.appConfig && this.appConfig.logo) {
          this.logoIconNode.src = this.appConfig.logo;
          html.removeClass(this.logoNode, 'hidden');
        } else {
          this.logoIconNode.src = "";
          html.addClass(this.logoNode, 'hidden');
        }

        this.switchableElements.title.innerHTML =
          utils.sanitizeHTML(this.appConfig.title ? this.appConfig.title : '');
        this.switchableElements.subtitle.innerHTML =
          utils.sanitizeHTML(this.appConfig.subtitle ? this.appConfig.subtitle : '');

        this._createDynamicLinks(this.appConfig.links);

        this._setElementsSize();

        this.own(on(this.domNode, mouse.enter, lang.hitch(this, function() {
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
      },

      startup: function() {
        this.inherited(arguments);
        this.resize();
        // this.timeoutHandle = setTimeout(lang.hitch(this, this.resize), 100);
      },

      onAction: function(action, data) {
        /*jshint unused: false*/
        if (action === 'highLight' && data) {
          var node = query('div[settingid="' + data.widgetId + '"]', this.domNode)[0];
          this._highLight(node);
        }
        if (action === 'removeHighLight') {
          this._removeHighLight();
        }
      },

      onSignIn: function(credential) {
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

      onSignOut: function() {
        this.inherited(arguments);

        this._onSignOut(this.nls.signin);

        var portal = portalUtils.getPortal(this.appConfig.portalUrl);
        portal.loadSelfInfo().then(lang.hitch(this, function(selfInfo) {
          var name = selfInfo.name;
          var signInTip = this.nls.signInTo + ' ' + name;
          this._onSignOut(signInTip);
        }), lang.hitch(this, function(err) {
          console.error(err);
        }));
      },

      _onSignOut: function(signInTip) {
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

      resize: function() {
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
      },

      _resize: function() {
        //by default, we show all elements
        this._showSwitchableElements(['title', 'links', 'subtitle']);
      },

      destroy: function() {
        if (this.timeoutHandle) {
          clearTimeout(this.timeoutHandle);
          this.timeoutHandle = null;
        }
        this.inherited(arguments);
      },

      onAppConfigChanged: function(appConfig, reason, changedData) {
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

      _onLogoLoad: function() {
        this.resize();
      },

      _highLight: function(node) {
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

      _removeHighLight: function() {
        if (this.hlDiv) {
          domConstruct.destroy(this.hlDiv);
          this.hlDiv = null;
        }
      },

      _onAttributeChange: function(appConfig, changedData) {
        /*jshint unused: false*/
        if ('title' in changedData && changedData.title !== this.appConfig.title) {
          this.titleNode.innerHTML =  utils.sanitizeHTML(changedData.title);
        }
        if ('subtitle' in changedData && changedData.subtitle !== this.appConfig.subtitle) {
          this.subtitleNode.innerHTML = utils.sanitizeHTML(changedData.subtitle);
        }
        if ('logo' in changedData && changedData.logo !== this.appConfig.logo) {
          if(changedData.logo){
            html.setAttr(this.logoIconNode, 'src', changedData.logo);
            html.removeClass(this.logoNode, 'hidden');
          }else{
            html.removeAttr(this.logoIconNode, 'src');
            html.addClass(this.logoNode, 'hidden');
          }
        }

        if ('links' in changedData) {
          this._createDynamicLinks(changedData.links);
        }

        this._handleTitleColorAndLogoLink(appConfig);
      },

      _handleTitleColorAndLogoLink: function(appConfig){
        if(appConfig.titleColor){
          html.setStyle(this.titleNode, 'color', appConfig.titleColor);
        }else{
          html.setStyle(this.titleNode, 'color', '');
        }

        if(appConfig.logoLink){
          html.setAttr(this.logoLinkNode, 'href', appConfig.logoLink);
          html.setStyle(this.logoIconNode, 'cursor', 'pointer');
        }else{
          html.setAttr(this.logoLinkNode, 'href', 'javascript:void(0)');
          html.setStyle(this.logoIconNode, 'cursor', 'default');
        }
      },

      _setElementsSize: function() {
        query('.jimu-link', this.domNode).style({
          lineHeight: this.height + 'px'
        });
      },

      _createDynamicLinks: function(links) {
        if (window.isRTL) {
          var _links = [];
          array.forEach(links, function(link) {
            _links.unshift(link);
          });
          links = _links;
        }
        html.empty(this.dynamicLinksNode);
        array.forEach(links, function(link) {
          html.create('a', {
            href: link.url,
            target: '_blank',
            rel: 'noopener noreferrer',
            innerHTML: utils.sanitizeHTML(link.label),
            'class': "jimu-link jimu-align-leading jimu-leading-margin1",
            style: {
              lineHeight: this.height + 'px'
            }
          }, this.dynamicLinksNode);
        }, this);
      },

      _showSwitchableElements: function(showElement) {
        //links is hidden
        if (this.logoClickHandle) {
          this.logoClickHandle.remove();
        }

        if (showElement.indexOf('links') < 0) {
          this.logoClickHandle = on(this.logoNode, 'click', lang.hitch(this, this._onLogoClick));
          // html.setStyle(this.logoNode, {
          //   cursor: 'pointer'
          // });
        } else {
          html.setStyle(this.logoNode, {
            cursor: 'default'
          });
        }
      },

      _switchSignin: function() {
        var credential = tokenUtils.getPortalCredential(this.appConfig.portalUrl);
        if (credential) {
          this.onSignIn(credential);
        } else {
          this.onSignOut();
        }
      },

      _onLogoClick: function() {
        // return;
        if (this.popupLinkNode) {
          html.destroy(this.popupLinkNode);
          // this._switchSignin();
        }
        this.popupLinkNode = this._createPopupLinkNode();

        if (this.popupLinksVisible) {
          this._hidePopupLink();
        } else {
          this._showPopupLink();
        }
      },

      _hidePopupLink: function() {
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

      _showPopupLink: function() {
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

      _createPopupLinkNode: function() {
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

        var logoNode = html.create('img', {
          'class': 'logo jimu-float-leading jimu-leading-margin1',
          src: this.appConfig.logo ? this.appConfig.logo : this.folderUrl + 'images/app-logo.png',
          style: {
            width: '30px',
            height: '30px',
            marginTop: ((this.height - 30) / 2) + 'px'
          }
        }, titleNode);

        var textNode = html.create('div', {
          'class': 'title jimu-float-leading jimu-leading-margin1 jimu-ellipsis',
          innerHTML: utils.sanitizeHTML(this.appConfig.title),
          style: {
            lineHeight: this.height + 'px'
          }
        }, titleNode);

        var titleWidth = 'auto';
        try{
          titleWidth = html.getMarginBox(titleNode).w -
            html.getMarginBox(logoNode).w -
            html.getMarginExtents(textNode).w + 'px';
        } catch(err) {
          console.error(err);
          titleWidth = 'auto';
        }
        html.setStyle(textNode, 'width', titleWidth);

        array.forEach(this.appConfig.links, function(link) {
          this._createLinkNode(node, link, false);
        }, this);

        // this.popupSigninNode = this._createLinkNode(node, {
        //   label: 'SignIn',
        //   url: '#'
        // }, true);
        // this.popupUserNameNode = this._createLinkNode(node, {
        //   label: '',
        //   url: '#'
        // }, true);
        // this.popupSignoutNode = this._createLinkNode(node, {
        //   label: 'SignOut',
        //   url: '#'
        // }, true);

        // this.own(on(this.popupSigninNode, 'click', lang.hitch(this, '_onSigninClick')));
        // this.own(on(this.popupSignoutNode, 'click', lang.hitch(this, '_onSignoutClick')));

        //empty
        this._createLinkNode(node, {
          label: '',
          url: '#'
        }, false);
        return node;
      },

      _createLinkNode: function(containerNode, link, isSign) {
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
          rel: "noopener noreferrer",
          innerHTML: utils.sanitizeHTML(link.label),
          title: link.label,
          style: {
            lineHeight: '66px'
          }
        }, linkSectionNode);

        return node;
      },

      _onSigninClick: function() {
        tokenUtils.signInPortal(this.appConfig.portalUrl, this.appConfig.appId);
      },

      _onSignoutClick: function() {
        var isDepolyedApp = !this.appConfig.mode;

        if (isDepolyedApp) {
          //tokenUtils.signOutPortal(this.appConfig.portalUrl);
          tokenUtils.signOutAll();
        } else {
          new Message({
            message: this.nls.cantSignOutTip
          });
        }
      },

      _onUserNameClick: function(){

      }
    });
    return clazz;
  });