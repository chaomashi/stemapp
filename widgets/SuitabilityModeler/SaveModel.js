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
  "dojo/_base/array",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!./SaveModel.html",
  "./wro/PortalUtil",
  "dojo/i18n!./nls/strings"],
function(declare, array, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
  template, PortalUtil, i18n) {

  var oThisClass = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

    baseClass: "jimu-widget-suitability-modeler-save-model",
    i18n: i18n,
    templateString: template,

    dialog: null,
    itemData: null,
    layer: null,
    portal: null,
    portalUser: null,
    saveAs: false,
    userContentUrl: null,
    username: null,
    wabWidget: null,

    postCreate: function() {
      this.inherited(arguments);
    },

    allowFolders: function() {
      if (!this.saveAs && this.layer.xtnWroItem && this.layer.xtnWroItem.id) {
        return false;
      }
      return true;
    },

    cancelClicked: function() {
      this.hide();
    },

    checkTags: function(tags) {
      var sb = "";
      tags.split(",").forEach(function(v){
        v = v.trim();
        if (v.length > 0) {
          if (sb.length > 0) {
            sb += ",";
          }
          sb += v;
        }
      });
      return sb;
    },

    hide: function() {
      // if (this.dialog) {
      //   this.dialog.hide();
      // }
      var self = this;
      this.wroWidget.hideSavePanel().then(function() {
        self.destroyRecursive(false);
      });
    },

    initUI: function(item) {
      if (!item || this.saveAs) { return; }
      this.summaryNode.value = item.snippet;
      this.descriptionNode.value = item.description;
      this.tagsNode.value = item.tags;
      this.titleNode.value = item.title;
    },

    okClicked: function() {
      this.validateAndSave();
    },

    populateFolders: function(portal, item) {
      var self = this;
      if (this.allowFolders()) {
        var user = portal.user;
        var content = user.getContent();
        content.then(function(results){
          var folders = results.folders;
          var emptyOption = new Option();
          emptyOption.value = "";
          emptyOption.text = self.i18n.saveModel.homeFolderPattern.replace(
            "{username}",self.username);
          self.folderSelect.add(emptyOption);
          array.forEach(folders, function(folder) {
            var option = new Option();
            option.value = folder.id;
            option.text = folder.title;
            self.folderSelect.add(option);
          });
          if (item && typeof item.folderId === "string" && item.folderId.length > 0) {
            self.folderSelect.value = item.folderId;
          }
        });
      } else {
        this.folderDiv.style.display = "none";
      }
    },

    show: function() {
      var parentNode = this.wabWidget._wroWidget.savePanelNode;
      var item = this.layer.xtnWroItem;
      this.populateFolders(this.portal,item);
      this.initUI(item);
      parentNode.appendChild(this.domNode);
      this.wroWidget.showSavePanel();
    },

    validateAndSave: function() {
      this.okButton.disabled = true;
      var layer = this.layer;
      var itemId = null, owner = this.username;
      var folderId = this.folderSelect.value || "";
      this.messageNode.innerHTML = "";

      var tags = this.checkTags(this.tagsNode.value.trim());
      if (tags === null || tags.length === 0) {
        tags = "weightedOverlayModel";
      }

      var props = {};
      props.type = "Image Service";
      props.text = window.JSON.stringify(this.itemData);
      props.url = layer.url;
      props.snippet = this.summaryNode.value.trim();
      props.description = this.descriptionNode.value.trim();
      props.tags = tags;
      props.typeKeywords = "geodesignModelerLayer";
      props.clearEmptyFields = true;

      props.title = this.titleNode.value.trim();
      if (props.title.length === 0) {
        this.okButton.disabled = false;
        return;
      }

      var currentFolderId = "";
      if(layer.xtnWroItem && !this.saveAs) {
        itemId = layer.xtnWroItem.id;
        currentFolderId = layer.xtnWroItem.folderId;
        folderId = layer.xtnWroItem.folderId;
      }

      var wroItem = {
        id: itemId,
        title: props.title,
        snippet: props.snippet,
        description: props.description,
        tags: props.tags,
        folderId: folderId
      };

      var self = this;
      var portalUtil = new PortalUtil({
        portal: this.portal,
        portalUser: this.portalUser,
        userContentUrl: this.userContentUrl
      });
      portalUtil.saveItem(itemId,props,folderId,owner).then(function(result){
        wroItem.id = result.id;
        layer.xtnWroItem = wroItem;
        self.hide();
      }).otherwise(function(error){
        console.warn("Save Model failed.");
        console.warn(error);
        self.okButton.disabled = false;
        self.messageNode.innerHTML = self.i18n.saveModel.failed;
      });

    }

  });

  return oThisClass;
});
