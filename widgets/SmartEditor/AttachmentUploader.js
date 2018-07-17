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

// jscs:disable validateIndentation

define(
  [
    "dojo/Evented",
    "dojo",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    'dojo/dom-construct',
    'dojo/dom-style',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./AttachmentUploader.html",
    'dojo/i18n!esri/nls/jsapi'
  ], function (
    Evented,
    dojo,
    declare,
    lang,
    on,
    domConstruct,
    domStyle,
    _WidgetBase,
    _TemplatedMixin,
    widgetTemplate,
    esriBundle

  ) {
  return declare([_WidgetBase, Evented, _TemplatedMixin], {
    declaredClass: "jimu-widget-smartEditor-attachmentuploader",
    templateString: widgetTemplate,
    widgetsInTemplate: true,
    _inputCount: 0,
    _inputIndex: 1,
    currentAction: null,
    constructor: function () {
      this.nls = lang.mixin(this.nls, esriBundle.widgets.attachmentEditor);
    },
    _fileSelected: function (source) {

      var target = source.target || source.srcElement;
      if (target.value.length > 0) {
        dojo.style(target.parentNode.childNodes[0], "display", "inline-block");


        this._addInput();
        //Remove required message if one or more attachments are added
        if (domStyle.get(this.attachmentsRequiredMsg, "display") === "block") {
          domStyle.set(this.attachmentsRequiredMsg, "display", "none");
          this.emit("attachmentAdded");
        }
      }

    },
    clear: function () {
      if (this._attachmentList !== undefined && this._attachmentList !== null) {
        while (this._attachmentList.firstChild) {
          this._attachmentList.removeChild(this._attachmentList.firstChild);
        }
        this._addInput();
      }
    },
    _deleteAttachment: function (source) {
      var target = source.target || source.srcElement;
      target.parentNode.parentNode.removeChild(target.parentNode);
      if (!this._hasAddedAnyAttachments() && this.currentAction === "Required") {
        //Remove required message if one or more attachments are added
        if (domStyle.get(this.attachmentsRequiredMsg, "display") === "none") {
          domStyle.set(this.attachmentsRequiredMsg, "display", "block");
          this.emit("attachmentDeleted");
        }
      }
    },
    _reflect: function (promise) {
      return promise.then(function (v) { return { state: "fulfilled", value: v }; },
        function (e) { return { state: "rejected", error: e }; });
    },
    _addInput: function () {
      for (var i = 0; i < this._attachmentList.childNodes.length; i++) {
        if (this._attachmentList.childNodes[i].childNodes[this._inputIndex].value) {
          if (this._attachmentList.childNodes[i].childNodes[this._inputIndex].value.length === 0) {
            return;
          }
        } else {
          return;
        }
      }
      var newDelete = domConstruct.create("div", {
        "id": 'delInput' + String(this._inputCount),
        "class": 'deleteAttachment'

      });
      newDelete.innerHTML = 'X';
      dojo.style(newDelete, "display", "none");
      this.own(on(newDelete, "click", lang.hitch(this, this._deleteAttachment)));
      var newForm = domConstruct.create("form", {
        "id": 'formInput' + String(this._inputCount)

      });

      var newInput = domConstruct.create("input", {
        "id": 'fileInput' + String(this._inputCount),
        "type": 'file',
        "class": 'attInput',
        "name": 'attachment'
      });
      newForm.appendChild(newDelete);
      newForm.appendChild(newInput);
      this._attachmentList.appendChild(newForm);

      this.own(on(newInput, "change", lang.hitch(this, this._fileSelected)));
      this._inputCount = this._inputCount + 1;

    },
    startup: function () {
      this._addInput();
    },

    destroy: function () {
      this.inherited(arguments);
    },
    postAttachments: function (featureLayer, oid) {

      if (!featureLayer) {
        return;
      }
      if (featureLayer.declaredClass !== "esri.layers.FeatureLayer" ||
        !featureLayer.getEditCapabilities) {

        return;
      }
      if (!featureLayer.addAttachment) {
        return;
      }

      var defs = [];
      for (var i = 0; i < this._attachmentList.childNodes.length; i++) {
        if (this._attachmentList.childNodes[i].childNodes[this._inputIndex].value.length > 0) {

          //if (defs === null) {
          //  defs = {}
          //}

          defs.push(featureLayer.addAttachment(oid, this._attachmentList.childNodes[i]));
        }
      }
      if (defs.length === 0) {
        return null;
      }
      return defs.map(this._reflect);
    },

    _hasAddedAnyAttachments: function () {
      var hasAttachments = false;
      for (var i = 0; i < this._attachmentList.childNodes.length; i++) {
        if (this._attachmentList.childNodes[i].childNodes[this._inputIndex].value) {
          if (this._attachmentList.childNodes[i].childNodes[this._inputIndex].value.length > 0) {
            hasAttachments = true;
            break;
          }
        }
      }
      return hasAttachments;
    }
  });
});
