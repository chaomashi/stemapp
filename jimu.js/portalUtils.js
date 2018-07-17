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
    'dojo/_base/config',
    'dojo/Deferred',
    'dojo/topic',
    'dojo/json',
    'dojo/request/xhr',
    'esri/request',
    './Role',
    './utils',
    './portalUrlUtils',
    './tokenUtils',
    './ServiceDefinitionManager'
  ],
  function(declare, lang, array, dojoConfig, Deferred, topic, dojoJson, xhr, esriRequest, Role, jimuUtils,
    portalUrlUtils, tokenUtils, ServiceDefinitionManager) {

    //important attributes of portal relevant classes
    //attributes: portalUrl,credential,portal

    //portal relevant classes
    var PortalClass = declare([], {
      declaredClass: 'jimu.Portal',
      selfUrl: null,
      user: null, //PortalUser,not selfInfo.user
      selfInfo: null,
      portalUrl: null,
      credential: null,

      constructor: function(_portalUrl) {
        this.portalUrl = portalUrlUtils.getStandardPortalUrl(_portalUrl);
        this.selfUrl = portalUrlUtils.getPortalSelfInfoUrl(_portalUrl);
      },

      loadSelfInfo: function() {
        var url = this.selfUrl;

        if(this.isValidCredential()){
          if(url.indexOf('?') > -1){
            url += '&token=' + this.credential.token;
          }else{
            url += '?token=' + this.credential.token;
          }
        }

        return ServiceDefinitionManager.getInstance().getServiceDefinition(url)
        .then(lang.hitch(this, function(response) {
          var user = response.user;
          //This is important. Otherwise response.user will override this.user(PortalUser).
          delete response.user;
          lang.mixin(this, response);
          response.user = user;
          //this.selfInfo = lang.mixin({}, response);
          return response;
        }));
      },

      _checkCredential: function() {
        var isValid = tokenUtils.isValidCredential(this.credential);
        if (!isValid) {
          this.clearCredentialAndUser();
        }
        return isValid;
      },

      isValidCredential: function() {
        this.updateCredential();
        return this._checkCredential();
      },

      updateCredential: function() {
        if (!this._checkCredential()) {
          this.credential = tokenUtils.getPortalCredential(this.portalUrl);
        }
      },

      signIn: function() {
        var def = new Deferred();

        this.updateCredential();

        if (this.isValidCredential()) {
          setTimeout(lang.hitch(this, function() {
            def.resolve(this.credential);
          }), 0);
        } else {
          def = tokenUtils.signInPortal(this.portalUrl);
        }

        return def;
      },

      haveSignIn: function() {
        return tokenUtils.userHaveSignInPortal(this.portalUrl);
      },

      clearCredentialAndUser: function() {
        this.credential = null;
        this.user = null;
      },

      getUser: function() {
        this.updateCredential();

        var def = new Deferred();

        if (this.user && this.user.declaredClass === 'jimu.PortalUser') {
          setTimeout(lang.hitch(this, function() {
            this.user.updateCredential();
            def.resolve(this.user);
          }), 0);
        } else {
          if (this.isValidCredential()) {
            if (this.credential.userId) {
              this._getUser(this.credential.userId).then(lang.hitch(this, function(user) {
                this.user = user;
                def.resolve(this.user);
              }), lang.hitch(this, function(err) {
                console.error(err);
                def.reject(err);
              }));
            } else {
              tokenUtils.getUserIdByToken(this.credential.token, this.portalUrl).then(
                lang.hitch(this, function(userId) {
                this.credential.userId = userId;
                this._getUser(this.credential.userId).then(lang.hitch(this, function(user) {
                  this.user = user;
                  def.resolve(this.user);
                }), lang.hitch(this, function(err) {
                  console.error(err);
                  def.reject(err);
                }));
              }), lang.hitch(this, function(err) {
                console.error(err);
                def.reject(err);
              }));
            }
          } else {
            setTimeout(lang.hitch(this, function() {
              def.reject('credential is null.');
            }), 0);
          }
        }
        return def;
      },

      //params: {q,sortField,sortOrder,num,start}
      queryItems: function(params) {
        this.updateCredential();

        var def = new Deferred();

        var searchUrl = portalUrlUtils.getBaseSearchUrl(this.portalUrl);
        var content = {
          f: 'json'
        };
        if (params) {
          content = lang.mixin(content, params);
        }

        if (this.isValidCredential()) {
          content.token = this.credential.token;
        }

        if (!content.sortField && !content.sortOrder) {
          content.sortField = 'title';
          content.sortOrder = 'asc';
        }

        esriRequest({
          url: searchUrl,
          handleAs: 'json',
          content: content,
          callbackParamName: 'callback'
        }).then(lang.hitch(this, function(response) {
          response.results = array.map(response.results, lang.hitch(this, function(item) {
            item.portalUrl = this.portalUrl;
            item.credential = this.credential;
            item.portal = this;
            return new PortalItem(item);
          }));
          def.resolve(response);
        }), lang.hitch(this, function(err) {
          console.error(err);
          def.reject(err);
        }));

        return def;
      },

      getItemData: function(itemId) {
        this.updateCredential();

        var itemDataUrl = portalUrlUtils.getItemDataUrl(this.portalUrl, itemId);
        var args = {
          url: itemDataUrl,
          handleAs: 'json',
          content: {
            f: 'json'
          },
          callbackParamName: 'callback'
        };

        // if (this.isValidCredential()) {
        //   args.content.token = this.credential.token;
        // }

        return esriRequest(args);
      },

      _getItemById: function(_itemId, /*optional*/ token) {
        var url = portalUrlUtils.getItemUrl(this.portalUrl, _itemId);
        var args = {
          url: url,
          handleAs: 'json',
          content: {
            f: 'json'
          },
          callbackParamName: 'callback'
        };

        if(token){
          args.content.token = token;
        }

        return esriRequest(args).then(lang.hitch(this, function(item) {
          item.portalUrl = this.portalUrl;
          item.credential = this.credential;
          item.portal = this;
          var portalItem = new PortalItem(item);
          return portalItem;
        }));
      },

      getItemById: function(_itemId, /*optional*/ carryToken) {
        this.updateCredential();

        return this._getItemById(_itemId).then(lang.hitch(this, function(item){
          if(carryToken && item.owner && this.isValidCredential() &&
             this.credential && this.credential.userId === item.owner){
            return this._getItemById(_itemId, this.credential.token);
          }
          return item;
        }));
      },

      getAppById: function(appId) {
        var def = new Deferred();

        this.updateCredential();

        if (this.isValidCredential()) {
          var appIdUrl = portalUrlUtils.getAppIdUrl(this.portalUrl, appId);
          def = esriRequest({
            url: appIdUrl,
            handleAs: 'json',
            content: {
              f: 'json',
              token: this.credential.token
            }
          });
        } else {
          setTimeout(lang.hitch(this, function() {
            def.reject("token is null.");
          }), 0);
        }

        return def;
      },

      queryGroups: function(params) {
        this.updateCredential();

        var def = new Deferred();
        var groupUrl = portalUrlUtils.getBaseGroupUrl(this.portalUrl);
        var content = {
          f: 'json'
        };
        if (params) {
          content = lang.mixin(content, params);
        }

        if (this.isValidCredential()) {
          content.token = this.credential.token;
        }

        esriRequest({
          url: groupUrl,
          handleAs: 'json',
          content: content,
          callbackParamName: 'callback'
        }).then(lang.hitch(this, function(groupsResponse) {
          groupsResponse.results = array.map(groupsResponse.results,
            lang.hitch(this, function(group){
            group.portalUrl = this.portalUrl;
            group.credential = this.credential;
            group.portal = this;
            return new PortalGroup(group);
          }));
          def.resolve(groupsResponse);
        }), lang.hitch(this, function(err) {
          console.error(err);
          def.reject(err);
        }));
        return def;
      },

      registerApp: function(itemId, appType, redirect_uris) {
        var def = new Deferred();

        this.updateCredential();

        if (this.isValidCredential()) {
          var token = this.credential && this.credential.token;
          var oauth2Url = portalUrlUtils.getOAuth2Url(this.portalUrl);
          def = esriRequest({
            url: oauth2Url + '/registerApp',
            content: {
              itemId: itemId,
              appType: appType,
              redirect_uris: dojoJson.stringify(redirect_uris),
              token: token,
              f: 'json'
            },
            handleAs: 'json'
          }, {
            usePost: true
          });
        } else {
          setTimeout(lang.hitch(this, function() {
            def.reject("token is null.");
          }), 0);
        }

        return def;
      },

      createAndRegisterApp: function(redirect_uris) {
        var def = new Deferred();

        this.updateCredential();

        if (this.isValidCredential()) {
          this.getUser().then(lang.hitch(this, function(user) {
            var args = {
              title: "Web AppBuilder for ArcGIS",
              type: "Web Mapping Application",
              //typeKeywords: "Web AppBuilder",
              text: '',
              snippet: '',
              tags: 'Registered App for OAuth'
            };
            user.addItem(args, '').then(lang.hitch(this, function(response) {
              if (response.success) {
                var itemId = response.id;
                var appType = "browser";
                this.registerApp(itemId, appType, redirect_uris).then(
                  lang.hitch(this, function(res){
                  //{itemId,client_id,client_secret,appType,redirect_uris,registered,modified}
                  def.resolve(res);
                }), lang.hitch(this, function(err) {
                  console.error(err);
                  def.reject(err);
                }));
              } else {
                def.reject("create app failed");
              }
            }), lang.hitch(this, function(err) {
              console.error(err);
              def.reject(err);
            }));
          }), lang.hitch(this, function(err) {
            console.error(err);
            def.reject(err);
          }));
        } else {
          setTimeout(lang.hitch(this, function() {
            def.reject("token is null.");
          }), 0);
        }

        return def;
      },

      _getUser: function(userId) {
        this.updateCredential();

        var def = new Deferred();
        var userUrl = portalUrlUtils.getUserUrl(this.portalUrl, userId);
        var args = {
          url: userUrl,
          content: {
            f: 'json'
          },
          handleAs: 'json',
          callbackParamName: 'callback'
        };
        if(this.isValidCredential()){
          args.content.token = this.credential && this.credential.token;
        }
        esriRequest(args).then(lang.hitch(this, function(user) {
          user.portalUrl = this.portalUrl;
          user.credential = this.credential;
          user.portal = this;
          this.user = new PortalUser(user);

          def.resolve(this.user);
        }), lang.hitch(this, function(err) {
          console.error(err);
          def.reject(err);
        }));
        return def;
      }
    });

    var PortalUser = declare([], {
      declaredClass: "jimu.PortalUser",

      portalUrl: null,
      credential: null,
      portal: null,

      constructor: function(args) {
        if (args) {
          lang.mixin(this, args);
        }
      },

      _checkCredential: function() {
        var isValid = tokenUtils.isValidCredential(this.credential);
        if (!isValid) {
          this.credential = null;
        }
        return isValid;
      },

      isValidCredential: function() {
        this.updateCredential();
        return this._checkCredential();
      },

      updateCredential: function() {
        if (!this._checkCredential()) {
          this.portal.updateCredential();
          this.credential = this.portal.credential;
        }
      },

      canCreateItem: function(){
        var userRole = new Role({
          id: this.roleId ? this.roleId : this.role,
          role: this.role
        });

        if (this.privileges) {
          userRole.setPrivileges(this.privileges);
        }

        return userRole.canCreateItem();
      },

      getGroups: function() {
        var groups = [];
        if (this.groups) {
          groups = array.map(this.groups, lang.hitch(this, function(group) {
            group.portalUrl = this.portalUrl;
            group.credential = this.credential;
            group.portal = this.portal;
            return new PortalGroup(group);
          }));
        }
        return groups;
      },

      getItemsByKeywords: function(typeKeywords, /*optional*/ start) {
        //must use double quotation marks around typeKeywords
        //such as typekeywords:"Web AppBuilder" or typekeywords:"Web AppBuilder,Web Map"
        var q = 'owner:' + this.username + ' AND typekeywords:"' + typeKeywords + '"';
        var params = {
          start: start || 1,
          num: 100,
          q: q
        };
        return this.portal.queryItems(params);
      },

      getContent: function() {
        this.updateCredential();

        var contentUrl = portalUrlUtils.getUserContentUrl(this.portalUrl, this.username);
        var args = {
          url: contentUrl,
          handleAs: 'json',
          content: {
            f: 'json'
          },
          callbackParamName: 'callback'
        };

        if (this.isValidCredential) {
          args.content.token = this.credential.token;
        }

        return esriRequest(args);
      },

      getTags: function() {
        this.updateCredential();

        var userTagsUrl = portalUrlUtils.getUserTagsUrl(this.portalUrl, this.username);
        var args = {
          url: userTagsUrl,
          handleAs: 'json',
          content: {
            f: 'json'
          },
          callbackParamName: 'callback'
        };

        if (this.isValidCredential()) {
          args.content.token = this.credential.token;
        }

        return esriRequest(args);
      },

      addItem: function(args, folderId) {
        this.updateCredential();

        var def = new Deferred();

        if (this.isValidCredential()) {
          var content = {
            f: 'json',
            token: this.credential.token
          };
          if (args) {
            content = lang.mixin(content, args);
          }
          esriRequest({
            url: portalUrlUtils.getAddItemUrl(this.portalUrl, this.username, folderId),
            handleAs: 'json',
            callbackParamName: 'callback',
            content: content
          }, {
            usePost: true
          }).then(lang.hitch(this, function(res) {
            def.resolve(res);
          }), lang.hitch(this, function(err) {
            console.error(err);
            def.reject(err);
          }));
        } else {
          setTimeout(lang.hitch(this, function() {
            def.reject('token is null.');
          }), 0);
        }

        return def;
      },

      deleteItem: function(itemId) {
        this.updateCredential();

        var def = new Deferred();

        if (this.isValidCredential()) {
          var deleteUrl = portalUrlUtils.getDeleteItemUrl(this.portalUrl, this.username, itemId);
          //resolve {success,itemId}
          def = esriRequest({
            url: deleteUrl,
            content: {
              token: this.credential.token,
              f: 'json'
            },
            handleAs: 'json'
          }, {
            usePost: true
          });
        } else {
          setTimeout(lang.hitch(this, function() {
            def.reject('token is null.');
          }), 0);
        }

        return def;
      },

      getItemById: function(_itemId, folderId) {
        this.updateCredential();

        var def = new Deferred();
        var url = portalUrlUtils.getUserItemsUrl(this.portalUrl, this.username, folderId);
        var args = {
          url: url + '/' + _itemId,
          handleAs: 'json',
          content: {
            f: 'json'
          },
          callbackParamName: 'callback'
        };

        // if (this.isValidCredential()) {
        //   args.content.token = this.credential.token;
        // }

        esriRequest(args).then(lang.hitch(this, function(item) {
          item.portalUrl = this.portalUrl;
          item.credential = this.credential;
          item.portal = this;
          var portalItem = new PortalItem(item);
          def.resolve(portalItem);
        }), lang.hitch(this, function(err) {
          console.error(err);
          def.reject(err);
        }));

        return def;
      },

      shareItem: function(args, _itemId, folderId) {
        this.updateCredential();

        var def = new Deferred();

        if (this.isValidCredential()) {
          var params = {
            url: portalUrlUtils.shareItemUrl(this.portalUrl, this.username, _itemId, folderId),
            handleAs: 'json',
            callbackParamName: 'callback',
            content: {
              f: 'json',
              token: this.credential.token
            }
          };

          if (args) {
            params.content = lang.mixin(params.content, args);
          }

          esriRequest(params, {
            usePost: true
          }).then(lang.hitch(this, function(response) {
            def.resolve(response);
          }), lang.hitch(this, function(err) {
            console.error(err);
            def.reject(err);
          }));
        } else {
          setTimeout(lang.hitch(this, function() {
            def.reject('token is null.');
          }), 0);
        }

        return def;
      },

      updateItem: function(itemId, args) {
        this.updateCredential();

        var def = new Deferred();

        if (this.isValidCredential()) {
          this.portal.getItemById(itemId).then(lang.hitch(this, function(item) {
            var content = {
              f: 'json',
              token: this.credential.token
            };
            if (args) {
              content = lang.mixin(content, args);
            }
            var folder = item.ownerFolder;
            var userName = item.owner;
            esriRequest({
              url: portalUrlUtils.getUpdateItemUrl(this.portalUrl, userName, itemId, folder),
              handleAs: 'json',
              callbackParamName: 'callback',
              timeout: 100000,
              content: content
            }, {
              usePost: true
            }).then(lang.hitch(this, function(res) {
              def.resolve(res);
            }), lang.hitch(this, function(err) {
              console.error(err);
              def.reject(err);
            }));
          }), lang.hitch(this, function(err) {
            console.error(err);
            def.reject(err);
          }));
        } else {
          setTimeout(lang.hitch(this, function() {
            def.reject('token is null.');
          }), 0);
        }

        return def;
      },

      isAdminRole: function(){
        //use account_admin for back compability
        return this.role === 'org_admin' || this.role === 'account_admin';
      },

      isPublisherRole: function(){
        //use account_publisher for back compability
        return this.role === 'org_publisher' || this.role === 'account_publisher';
      },

      isUserRole: function(){
        //use account_user for back compability
        return this.role === 'org_user' || this.role === 'account_user';
      },

      getRegisteredAppInfo: function(itemId, folderId) {
        var def = new Deferred();

        this.updateCredential();
        var userItemsUrl = portalUrlUtils.getUserItemsUrl(this.portalUrl, this.username, folderId);
        var getRegisteredAppInfoUrl = userItemsUrl + "/" + itemId + "/registeredAppInfo";
        def = esriRequest({
          url: getRegisteredAppInfoUrl,
          content: {
            token: this.credential.token,
            f: 'json'
          },
          handleAs: 'json'
        }, {
          usePost: true
        });

        return def;
      },

      getRegisteredAppInfoWithXhr: function(itemId, folderId) {
        var def = new Deferred();

        this.updateCredential();
        var userItemsUrl = portalUrlUtils.getUserItemsUrl(this.portalUrl, this.username, folderId);
        var getRegisteredAppInfoUrl = userItemsUrl + "/" + itemId + "/registeredAppInfo";
        def = xhr(getRegisteredAppInfoUrl, {
          data: {
            token: this.credential.token,
            f: 'json'
          },
          method: 'POST',
          handleAs: 'json'
        });
        return def;
      }
    });

    var PortalGroup = declare([], {
      declaredClass: "jimu.PortalGroup",

      portalUrl: null,
      credential: null,
      portal: null,

      constructor: function(args) {
        if (args) {
          lang.mixin(this, args);
        }
      },

      _checkCredential: function() {
        var isValid = tokenUtils.isValidCredential(this.credential);
        if (!isValid) {
          this.credential = null;
        }
        return isValid;
      },

      isValidCredential: function() {
        this.updateCredential();
        return this._checkCredential();
      },

      updateCredential: function() {
        if (!this._checkCredential()) {
          this.portal.updateCredential();
          this.credential = this.portal.credential;
        }
      },

      queryItems: function(args) {
        args.q = 'group:' + this.id + ' AND ' + args.q;
        return this.portal.queryItems(args);
      }
    });

    var PortalItem = declare([], {
      declaredClass: "jimu.PortalItem",
      itemUrl: null,
      detailsPageUrl: null,
      ownerPageUrl: null,

      portalUrl: null,
      credential: null,
      portal: null,
      token: null,

      constructor: function(args) {
        if (args) {
          lang.mixin(this, args);
        }
        this.itemUrl = portalUrlUtils.getItemUrl(this.portalUrl, this.id);
        if (!this.thumbnailUrl && this.thumbnail && this.itemUrl) {
          this.thumbnailUrl = this.itemUrl + '/info/' + this.thumbnail;
        }
        this.token = this.credential && this.credential.token;
        if (this.thumbnailUrl && this.token) {
          this.thumbnailUrl += '?token=' + this.token;
        }
        if (this.portalUrl && this.id) {
          this.detailsPageUrl = portalUrlUtils.getItemDetailsPageUrl(this.portalUrl, this.id);
        }
        if (this.portalUrl && this.owner) {
          this.ownerPageUrl = portalUrlUtils.getUserProfilePageUrl(this.portalUrl, this.owner);
        }
      },

      _checkCredential: function() {
        var isValid = tokenUtils.isValidCredential(this.credential);
        if (!isValid) {
          this.credential = null;
        }
        return isValid;
      },

      isValidCredential: function() {
        this.updateCredential();
        return this._checkCredential();
      },

      updateCredential: function() {
        if (!this._checkCredential()) {
          this.portal.updateCredential();
          this.credential = this.portal.credential;
        }
      },

      getItemData: function() {
        return this.portal.getItemData(this.id);
      },

      getItemGroups: function() {
        this.updateCredential();

        var itemGroupsUrl = portalUrlUtils.getItemGroupsUrl(this.portalUrl, this.id);
        var args = {
          url: itemGroupsUrl,
          handleAs: 'json',
          content: {
            f: 'json'
          },
          callbackParamName: 'callback'
        };

        if (this.isValidCredential()) {
          args.content.token = this.credential.token;
        }

        return esriRequest(args);
      }
    });

    //return a function
    var mo = {
      portals: [],
      webMapQueryStr: ' ' + jimuUtils.getItemQueryStringByTypes(['Web Map']) + ' ',
      webSceneQueryStr: ' ' + jimuUtils.getItemQueryStringByTypes(['Web Scene']) + ' ',

      _findPortal: function(portalUrl) {
        for (var i = 0; i < this.portals.length; i++) {
          var portal = this.portals[i];
          var isSame = portalUrlUtils.isSamePortalUrl(portalUrl, portal.portalUrl);
          if (isSame) {
            portal.updateCredential();
            return portal;
          }
        }
        return null;
      },

      getPortal: function(portalUrl) {
        var validPortalUrl = portalUrl && typeof portalUrl === 'string' && lang.trim(portalUrl);
        if (!validPortalUrl) {
          return null;
        }

        portalUrl = portalUrlUtils.getStandardPortalUrl(portalUrl);

        var portal = this._findPortal(portalUrl);

        if (!portal) {
          portal = new PortalClass(portalUrl);
          portal.credential = tokenUtils.getPortalCredential(portal.portalUrl);
          portal.updateCredential();
          this.portals.push(portal);
        }

        return portal;
      },

      getPortalSelfInfo: function(_portalUrl) {
        var portal = this.getPortal(_portalUrl);
        return portal.loadSelfInfo();
      },

      getBasemapGalleryGroup: function(_portalUrl) {
        return this._getPortalSelfGroup(_portalUrl, 'basemapGalleryGroupQuery');
      },

      getTemplatesGroup: function(_portalUrl) {
        return this._getPortalSelfGroup(_portalUrl, 'templatesGroupQuery');
      },

      getUnits: function(_portalUrl) {
        var units = "english",
          _culture = "",
          def = new Deferred();
        this.getPortal(_portalUrl).getUser().then(lang.hitch(this, function(profile) {
          if (profile && profile.units) {
            units = profile.units;
          } else {
            _culture = dojoConfig.locale;

            if (_culture.startWith("en")) {
              units = "english";
            } else {
              units = "metric";
            }
          }

          def.resolve(units);
        }), lang.hitch(this, function(err) {
          console.warn(err);
          this.getPortalSelfInfo(_portalUrl).then(lang.hitch(this, function(selfInfo) {
            var units = null;
            if (selfInfo && selfInfo.units) {
              units = selfInfo.units;
            } else {
              _culture = (selfInfo && selfInfo.culture) || dojoConfig.locale;
              if (_culture.startWith("en")) {
                units = "english";
              } else {
                units = "metric";
              }
            }
            def.resolve(units);
          }), lang.hitch(this, function(err) {
            console.warn(err);
            _culture = dojoConfig.locale;
            if (_culture.startWith("en")) {
              units = "english";
            } else {
              units = "metric";
            }
            def.resolve(units);
          }));
        }));

        return def.promise;
      },

      _getPortalSelfGroup: function(_portalUrl, groupName) {
        var def = new Deferred();
        var portal = this.getPortal(_portalUrl);
        if (!portal) {
          setTimeout(lang.hitch(this, function() {
            def.reject();
          }), 0);
        }
        this.getPortalSelfInfo(_portalUrl).then(lang.hitch(this, function(portalSelf) {
          portal.queryGroups({
            f: 'json',
            q: portalSelf[groupName]
          }).then(lang.hitch(this, function(groupsResponse) {
            if (groupsResponse.results.length > 0) {
              var jsonGroup = groupsResponse.results[0];
              jsonGroup.portalUrl = portal.portalUrl;
              jsonGroup.credential = portal.credential;
              jsonGroup.portal = portal;
              var group = new PortalGroup(jsonGroup);

              def.resolve(group);
            } else {
              //can't find group
              def.reject("Can't find portal self group.");
            }
          }), lang.hitch(this, function(err) {
            console.error(err);
            def.reject(err);
          }));
        }), lang.hitch(this, function(err) {
          console.error(err);
          def.reject(err);
        }));
        return def;
      },

      getWebMapsFromBasemapGalleryGroup: function(_portalUrl) {
        var def = new Deferred();
        this.getBasemapGalleryGroup(_portalUrl).then(lang.hitch(this, function(galleryGroup) {
          if (galleryGroup) {
            var queryStr = this.webMapQueryStr;
            galleryGroup.queryItems({
              start: 1,
              num: 100,
              f: 'json',
              q: queryStr
            }).then(lang.hitch(this, function(searchResponse) {
              def.resolve(searchResponse);
            }), lang.hitch(this, function(err) {
              console.error(err);
              def.reject(err);
            }));
          } else {
            def.reject();
          }
        }), lang.hitch(this, function(err) {
          console.error(err);
          def.reject(err);
        }));
        return def;
      },

      getDefaultWebScene: function(_portalUrl){
        var portalUrl = portalUrlUtils.getStandardPortalUrl(_portalUrl);
        return this._searchWABDefaultWebScene(portalUrl).then(lang.hitch(this, function(webSceneId){
          if(webSceneId){
            return webSceneId;
          }else{
            return this._createWABDefaultWebScene(portalUrl).
            then(lang.hitch(this, function(webSceneId){
              var portal = this.getPortal(portalUrl);
              return portal.getUser().then(lang.hitch(this, function(user){
                var canShareToPublic = false;
                if(user && user.privileges && user.privileges.length > 0){
                  canShareToPublic = array.some(user.privileges, function(privilege){
                    return privilege.indexOf("shareToPublic") >= 0;
                  });
                }
                if(canShareToPublic){
                  //If user has "shareToPublic" privilege,
                  //we should share this newly created web scene to everyone.
                  var args = {
                    everyone: true
                  };
                  return user.shareItem(args, webSceneId).then(lang.hitch(this, function(){
                    return webSceneId;
                  }), lang.hitch(this, function(){
                    return webSceneId;
                  }));
                }else{
                  return webSceneId;
                }
              }), lang.hitch(this, function(err){
                console.error(err);
                return webSceneId;
              }));
            }));
          }
        }));
      },

      //resolve the default web scene id which has typekeywords "WABDefaultWebScene"
      _searchWABDefaultWebScene: function(_portalUrl){
        var def = new Deferred();
        var portalUrl = portalUrlUtils.getStandardPortalUrl(_portalUrl);
        var portal = this.getPortal(portalUrl);

        // step 1: get `portalSelf`
        this.getPortalSelfInfo(_portalUrl).then(lang.hitch(this, function(portalSelf){
          // step 2: search org webscene when getting `portalSelf` failed
          if(!portalSelf || !portalSelf.livingAtlasGroupQuery){
            this._searchWABCreatedWebScene(_portalUrl, def);
            return;
          }

          var livingAtlasGroupQuery = portalSelf.livingAtlasGroupQuery;

          // step 2: query `livingAtlasGroupQuery` to get `livingAtlasGroupId`
          portal.queryGroups({"q": livingAtlasGroupQuery})
          .then(lang.hitch(this, function(response){

            // step 3: pass '' to next `then` method when there is no response
            if(!response || !response.results || !response.results.length ||  response.results.length <= 0){
              return '';
            }

            // step 3: pass `livingAtlasGroupId` to next `then` method when there is response
            var results = response.results;
            var livingAtlasGroup = [];
            livingAtlasGroup = results.filter(function(res){
              return res.title && res.title === 'Living Atlas';
            });

            return livingAtlasGroup[0] && livingAtlasGroup[0].id;
          }))
          .then(lang.hitch(this, function(livingAtlasGroupId){

            // step 4: search org webscene when there is no livingAtlasGroupId
            if(!livingAtlasGroupId || livingAtlasGroupId === ''){
              this._searchWABCreatedWebScene(_portalUrl, def);
              return;
            }

            // step 4: query items to get webscenes using `livingAtlasGroupId`
            portal.queryItems({
              "q": "(group:\"" + livingAtlasGroupId +
                  "\" AND type:\"Web Scene\" AND tags:\"scenes\" AND -tags:\"mature support\")",
              "sortField": "numViews",
              "sortOrder": "desc"
            })
            .then(lang.hitch(this, function(res){
              // step 5: search org webscene when there is no response
              if(!res || !res.results || !res.results.length || res.results.length <= 0){
                this._searchWABCreatedWebScene(_portalUrl, def);
                return;
              }
              // step 5: search org webscene when there is response
              def.resolve(res.results[0].id);
            }), lang.hitch(this, function(){
              // step 5: search org webscene when getting webscenes (step 4) failed
              this._searchWABCreatedWebScene(_portalUrl, def);
            }));

          }), lang.hitch(this, function(){

            // step 4: search org webscene when passing `livingAtlasGroupId` (step 3) failed
            this._searchWABCreatedWebScene(_portalUrl, def);

          }));

        }), lang.hitch(this, function(){

          // step 2: search org webscene when getting `portalSelf` (step 1) failed
          this._searchWABCreatedWebScene(_portalUrl, def);

        }));

        return def;
      },

      _searchWABCreatedWebScene: function(_portalUrl, def){
        var portalUrl = portalUrlUtils.getStandardPortalUrl(_portalUrl);
        var portal = this.getPortal(portalUrl);
        //must use double quotation marks around typeKeywords
        //such as typekeywords:"Web AppBuilder" or typekeywords:"Web AppBuilder,Web Map"
        var q = 'typekeywords:"WABDefaultWebScene" orgid:' + portal.user.orgId + ' access:public ' + this.webSceneQueryStr;
        var args = {
          q: q
        };
        portal.queryItems(args).then(lang.hitch(this, function(response){
          if(response && response.results && response.results.length > 0){
            def.resolve(response.results[0].id);
          }else{
            def.resolve(null);
          }
        }), lang.hitch(this, function(err){
          console.error("_searchWABDefaultWebScene error:", err);
          def.reject(err);
        }));
      },

      //resolve newly created web scene id
      _createWABDefaultWebScene: function(portalUrl){
        var def = new Deferred();
        portalUrl = portalUrlUtils.getStandardPortalUrl(portalUrl);
        var portal = this.getPortal(portalUrl);
        portal.getUser().then(lang.hitch(this, function(user){
          var data = {
            "operationalLayers": [],
            "baseMap": {
              "id": "basemap",
              "title": "Topographic",
              "baseMapLayers": [{
                  "url": "https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer",
                  "id": "worldTopoBase",
                  "layerType": "ArcGISTiledMapServiceLayer",
                  "title": "Topo"
                }
              ],
              "elevationLayers": [{
                  "url": "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
                  "id": "globalElevation",
                  "listMode": "hide",
                  "layerType": "ArcGISTiledElevationServiceLayer",
                  "title": "Elevation"
                }
              ]
            },
            "ground": {
              "layers": [{
                  "url": "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
                  "id": "globalElevation",
                  "listMode": "hide",
                  "layerType": "ArcGISTiledElevationServiceLayer",
                  "title": "Elevation"
                }
              ]
            },
            "viewingMode": "global",
            "spatialReference": {
              "latestWkid": 3857,
              "wkid": 102100
            },
            "version": "1.10",
            "authoringApp": "WebAppBuilder",
            "authoringAppVersion": "2.8"
          };
          var text = dojoJson.stringify(data);
          var args = {
            title: "Default Web Scene",
            type: "Web Scene",
            typeKeywords: "WABDefaultWebScene",
            tags: "default",
            text: text,
            snippet: ""
          };
          user.addItem(args, "").then(lang.hitch(this, function(response){
            if (response.success) {
              def.resolve(response.id);
            }else{
              console.error("Can't create default web scene:", response);
              def.reject();
            }
          }));
        }), lang.hitch(this, function(err){
          console.error("Can't create default web scene");
          def.reject(err);
        }));

        return def;
      },

      getDefaultWebMap: function(_portalUrl) {
        var def = new Deferred();
        this.getPortalSelfInfo(_portalUrl).then(lang.hitch(this, function(portalSelf) {
          var id = portalSelf.defaultBasemap && portalSelf.defaultBasemap.id;
          if (id) {
            def.resolve(id);
          } else {
            this._getDefaultWebMapByBasemapGallery(_portalUrl, portalSelf).then(
              lang.hitch(this, function(id) {
              if (id) {
                def.resolve(id);
              } else {
                this._getMostNumViewsWebMap(_portalUrl).then(lang.hitch(this, function(id) {
                  if (id) {
                    def.resolve(id);
                  } else {
                    def.reject();
                  }
                }), lang.hitch(this, function(err) {
                  console.error(err);
                  def.reject(err);
                }));
              }
            }), lang.hitch(this, function(err) {
              console.error(err);
              def.reject(err);
            }));
          }
        }), lang.hitch(this, function(err) {
          console.error(err);
          def.reject(err);
        }));
        return def;
      },

      _getDefaultWebMapByBasemapGallery: function(_portalUrl, _portalSelfInfo) {
        var def = new Deferred();
        var portal = this.getPortal(_portalUrl);
        var title = _portalSelfInfo.defaultBasemap && _portalSelfInfo.defaultBasemap.title;
        portal.queryGroups({
          f: 'json',
          q: _portalSelfInfo.basemapGalleryGroupQuery
        }).then(lang.hitch(this, function(groupsResponse) {
          var groups = groupsResponse.results;
          if (groups.length > 0) {
            var group = groups[0];
            var queryStr = this.webMapQueryStr + ' AND group:' + group.id + ' AND title:' + title;
            portal.queryItems({
              start: 1,
              num: 1,
              f: 'json',
              q: queryStr
            }).then(lang.hitch(this, function(searchResponse) {
              var items = searchResponse.results;
              items = array.filter(items, lang.hitch(this, function(item) {
                return item.type && item.type.toLowerCase() === 'web map';
              }));
              if (items.length > 0) {
                var item = items[0];
                def.resolve(item.id);
              } else {
                console.log("Can't find web map under basemapGalleryGroupQuery.");
                //def.resolve(null);//should not reject
                var queryStr2 = this.webMapQueryStr + ' AND title:' + title;
                portal.queryItems({
                  start: 1,
                  num: 1,
                  f: 'json',
                  q: queryStr2
                }).then(lang.hitch(this, function(searchResponse2) {
                  var items = searchResponse2.results;
                  items = array.filter(items, lang.hitch(this, function(item) {
                    return item.type && item.type.toLowerCase() === 'web map';
                  }));
                  if (items.length > 0) {
                    var item = items[0];
                    //need to verify the item exist or not
                    portal.getItemData(item.id).then(lang.hitch(this, function(res){
                      if(res && (res.operationalLayers || res.baseMap || res.version)){
                        def.resolve(item.id);
                      }
                      else{
                        def.resolve(null);
                      }
                    }), lang.hitch(this, function(){
                      def.resolve(null);
                    }));
                  } else {
                    console.log("Can't find web map by defaultBasemap.title.");
                    def.resolve(null);
                  }
                }), lang.hitch(this, function(err) {
                  console.error(err);
                  def.reject(err);
                }));
              }
            }), lang.hitch(this, function(err) {
              console.error(err);
              def.reject(err);
            }));
          } else {
            //find none group
            console.log("Can't find group by basemapGalleryGroupQuery.");
            def.resolve(null); //should not reject
          }
        }), lang.hitch(this, function(err) {
          console.error(err);
          def.reject(err);
        }));
        return def;
      },

      _getMostNumViewsWebMap: function(_portalUrl) {
        var def = new Deferred();
        var portal = this.getPortal(_portalUrl);
        var params = {
          start: 1,
          num: 1,
          f: 'json',
          q: this.webMapQueryStr + " AND access:public AND owner:esri_en",
          sortField: 'numViews',
          sortOrder: 'desc'
        };
        portal.queryItems(params).then(lang.hitch(this, function(response) {
          var items = response.results;
          items = array.filter(items, lang.hitch(this, function(item) {
            return item.type && item.type.toLowerCase() === 'web map';
          }));
          if (items.length > 0) {
            var item = items[0];
            def.resolve(item.id);
          } else {
            def.reject("Can't find most-num-views web map.");
          }
        }), lang.hitch(this, function(err) {
          console.error(err);
          def.reject(err);
        }));
        return def;
      },

      //if return 0, means strPortalVersion1 == strPortalVersion2
      //if return 1, means strPortalVersion1 > strPortalVersion2
      //if return -1, means strPortalVersion1 < strPortalVersion2
      comparePortalVersion: function(strPortalVersion1, strPortalVersion2){
        var result;

        var splits1 = strPortalVersion1.split(".");
        var majorVersion1 = parseInt(splits1[0], 10);
        var minorVersion1 = splits1.length > 1 ? parseInt(splits1[1], 10) : 0;

        var splits2 = strPortalVersion2.split(".");
        var majorVersion2 = parseInt(splits2[0], 10);
        var minorVersion2 = splits2.length > 1 ? parseInt(splits2[1], 10) : 0;

        if(majorVersion1 > majorVersion2){
          result = 1;
        }else if(majorVersion1 < majorVersion2){
          result = -1;
        }else{
          if(minorVersion1 > minorVersion2){
            result = 1;
          }else if(minorVersion1 < minorVersion2){
            result = -1;
          }else{
            result = 0;
          }
        }

        return result;
      },
      getItemResources: function(portalUrl, appId, num) {
        //num: Maximum number of resources
        if (!num) {
          num = 100;
        }
        portalUrl = portalUrlUtils.getStandardPortalUrl(portalUrl);
        var resourcesUrl = portalUrlUtils.getItemResourceUrl(portalUrl, appId);
        return esriRequest({
          url: resourcesUrl,
          content: {
            f: 'json',
            num: num
          }
        }).then(function(result) {
          if (result && result.resources) {
            return result.resources;
          }
        });
      },
      addResource: function(portalUrl, itemId, blobFile, _resourceName, _prefixName) {
        // _resourceName example: abc.jpg,must have a file name suffix
        portalUrl = portalUrlUtils.getStandardPortalUrl(portalUrl);
        var portal = this.getPortal(portalUrl);

        var formData = new FormData();
        formData.append("file", blobFile, _resourceName);
        formData.append("fileName", _resourceName);
        formData.append("f", 'json');

        var customResUrl = '';
        if (_prefixName) {
          formData.append("resourcesPrefix", _prefixName);
          customResUrl = _prefixName + '/' + _resourceName;
        } else {
          customResUrl = _resourceName;
        }
        return portal.getItemById(itemId, true).then(function(item) {
          var UserContentItemUrl = portalUrlUtils.getUserContentItemUrl(portalUrl, item.owner, itemId);
          var addReourcesUrl = UserContentItemUrl + '/addResources';
          return esriRequest({
            url: addReourcesUrl,
            form: formData
          }).then(function(result) {
            var resUrl = '';
            if (result && result.success) {
              resUrl = portalUrlUtils.getItemResourceUrl(portalUrl, '${itemId}', customResUrl);
            }
            return resUrl;
          }, function(err) {
            console.error(err.message || err);
            return err;
          });
        });
      },
      removeResources: function(portalUrl, appId, _resourceName, _prefixName) {
        var customResUrl = '';
        if (_prefixName) {
          customResUrl = _prefixName + '/' + _resourceName;
        } else {
          customResUrl = _resourceName;
        }
        var data = {
          resource: customResUrl,
          f: 'json'
        };
        portalUrl = portalUrlUtils.getStandardPortalUrl(portalUrl);
        var portal = this.getPortal(portalUrl);
        return portal.getItemById(appId, true).then(function(item) {
          var UserContentItemUrl = portalUrlUtils.getUserContentItemUrl(portalUrl, item.owner, appId);
          var removeResourcesUrl = UserContentItemUrl + '/removeResources';
          return esriRequest({
            url: removeResourcesUrl,
            content: data
          }, {
            usePost: true
          }).then(function(result) {
            return result;
          }, function(err) {
            console.error(err.message || err);
            return err;
          });
        });
      }
    };

    topic.subscribe('userSignOut', function(portalUrl) {
      var portal = mo._findPortal(portalUrl);
      if (portal) {
        //should not invoke method portal.signOut
        //avoid invoke tokenUtils.signOutPortal recursively
        portal.clearCredentialAndUser();
      }
    });

    return mo;
  });
