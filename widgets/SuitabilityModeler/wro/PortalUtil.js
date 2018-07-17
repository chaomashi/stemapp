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
define(["dojo/_base/declare",
  "dojo/_base/lang",
  "esri/request"],
function(declare, lang, esriRequest) {

  var oThisClass = declare([], {

    portal: true,
    portalUser: null,
    userContentUrl: null,

    constructor: function(args) {
      lang.mixin(this, args);
    },

    getItemUrl: function(itemId) {
      // TODO consistent between WAB and JSAPI?
      var restBaseUrl = this.portal.portalUrl + "/sharing/rest";
      return restBaseUrl + "/content/items/" + encodeURIComponent(itemId);
    },

    getSaveItemUrl: function(itemId,folderId,owner) {
      var url = this.getUserContentUrl(owner);
      if (itemId) {
        if (folderId) {
          url += "/" + encodeURIComponent(folderId);
        }
        url += "/items/" + encodeURIComponent(itemId) + "/update";
      } else {
        if (folderId) {
          url += "/" + encodeURIComponent(folderId);
        }
        url += "/addItem";
      }
      return url;
    },

    getUserContentUrl: function() {
      // if (typeof owner === "string" && owner.length > 0) {
      // 	if (this.isAdmin() && (this.portalUser.getUsername() !== owner)) {
      // 		return  this.getPortalRestUrl()+"content/users/"+encodeURIComponent(owner);
      // 	}
      // }
      return this.userContentUrl;
    },

    makeMultiPartFormData: function(props) {
      var k, v, data = new FormData();
      for (k in props) {
        if (props.hasOwnProperty(k)) {
          v = props[k];
          if (k === "snippet" || k === "description" || k === "text") {
            if (v === null) {
              v = "";
            }
          }
          data.append(k,v);
        }
      }
      return data;
    },

    saveItem: function(itemId,itemProperties,folderId,owner) {
      var url = this.getSaveItemUrl(itemId,folderId,owner);
      itemProperties.f = "json";
      var data = this.makeMultiPartFormData(itemProperties);
      var options = {usePost:true};
      return esriRequest({url:url,form:data,handleAs:"json"},options);
    },

    readItem: function(itemId) {
      var sUrl = this.getItemUrl(itemId);
      var content = {f:"json"}, options = {};
      return esriRequest({url:sUrl,content:content,handleAs:"json"},options);
    },

    readItemJsonData: function(itemId) {
      var sUrl = this.getItemUrl(itemId) + "/data";
      var content = {f:"json"}, options = {};
      return esriRequest({url:sUrl,content:content,handleAs:"json"},options);
    }

  });

  return oThisClass;
});
