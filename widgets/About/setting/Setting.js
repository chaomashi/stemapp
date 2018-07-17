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
    'dojo/_base/html',
    'dojo/sniff',
    'dojo/query',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/Editor',
    'jimu/utils',
    '../common',
    'jimu/BaseWidgetSetting',
    'dojo/NodeList-manipulate',
    'dijit/_editor/plugins/LinkDialog',
    'dijit/_editor/plugins/ViewSource',
    'dijit/_editor/plugins/FontChoice',
    'dojox/editor/plugins/Preview',
    'dijit/_editor/plugins/TextColor',
    'dojox/editor/plugins/ToolbarLineBreak',
    'dijit/ToolbarSeparator',
    'dojox/editor/plugins/FindReplace',
    'dojox/editor/plugins/PasteFromWord',
    'dojox/editor/plugins/InsertAnchor',
    'dojox/editor/plugins/Blockquote',
    'dojox/editor/plugins/UploadImage',
    'jimu/dijit/EditorChooseImage',
    'jimu/dijit/EditorTextColor',
    'jimu/dijit/EditorBackgroundColor'
  ],
  function(
    declare,
    lang,
    html,
    has,
    query,
    _WidgetsInTemplateMixin,
    Editor,
    utils,
    common,
    BaseWidgetSetting) {
    /*jscs: disable maximumLineLength*/
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      //these two properties is defined in the BaseWidget
      baseClass: 'jimu-widget-about-setting',

      postCreate: function() {
        this.inherited(arguments);
      },

      startup: function() {
        this.inherited(arguments);
        if (!this.config.about) {
          this.config.about = {};
        }

        this.initEditor();
        this.setConfig(this.config);

        this.resize();
      },

      initEditor: function() {
        var head = document.getElementsByTagName('head')[0];
        var tcCssHref = window.apiUrl + "dojox/editor/plugins/resources/css/TextColor.css";
        var tcCss = query('link[href="' + tcCssHref + '"]', head)[0];
        if (!tcCss) {
          utils.loadStyleLink("editor_plugins_resources_TextColor", tcCssHref);
        }
        var epCssHref = window.apiUrl + "dojox/editor/plugins/resources/editorPlugins.css";
        var epCss = query('link[href="' + epCssHref + '"]', head)[0];
        if (!epCss) {
          utils.loadStyleLink("editor_plugins_resources_editorPlugins", epCssHref);
        }
        var pfCssHref = window.apiUrl + "dojox/editor/plugins/resources/css/PasteFromWord.css";
        var pfCss = query('link[href="' + pfCssHref + '"]', head)[0];
        if (!pfCss) {
          utils.loadStyleLink("editor_plugins_resources_PasteFromWord", pfCssHref);
        }

        this.editor = new Editor({
          plugins: [
            'bold', 'italic', 'underline',
            utils.getEditorTextColor("about"), utils.getEditorBackgroundColor("about"),
            '|', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
            '|', 'insertOrderedList', 'insertUnorderedList', 'indent', 'outdent'
          ],
          extraPlugins: [
            '|', 'createLink', 'unlink', 'pastefromword', '|', 'undo', 'redo',
            '|', 'chooseImage', '|', 'viewsource', 'toolbarlinebreak',
            {
              name: "dijit._editor.plugins.FontChoice",
              command: "fontName",
              custom: "Arial;Comic Sans MS;Courier New;Garamond;Tahoma;Times New Roman;Verdana".split(";")
            }, 'fontSize', 'formatBlock'
          ],
          style: "font-family:Verdana;"
        }, this.editor);
        html.setStyle(this.editor.domNode, {
          width: '100%',
          height: '100%'
        });
        this.editor.startup();

        if (has('ie') !== 8) {
          this.editor.resize({
            w: '100%',
            h: '100%'
          });
        }
      },

      setConfig: function(config) {
        this.config = config;

        if (common.isDefaultContent(config)) {
          config.about.aboutContent = common.setDefaultContent(config, this.nls);
        }

        this.editor.set('value', config.about.aboutContent || this.nls.defaultContent);

        this.resize();
        setTimeout(lang.hitch(this, function () {
          this.resize();
        }), 200);
      },

      getConfig: function() {
        this.config.about.aboutContent = this.editor.get('value');
        return this.config;
      },

      destroy: function() {
        var head = document.getElementsByTagName('head')[0];
        query('link[id^="editor_plugins_resources"]', head).remove();

        this.inherited(arguments);
      },

      resize: function() {
        var wapperBox = html.getContentBox(this.editorContainer);
        var iFrame = query('.dijitEditorIFrameContainer', this.editorContainer)[0];
        var headBox;
        if (this.editor && this.editor.header) {
          headBox = html.getContentBox(this.editor.header);
        }
        if (iFrame && wapperBox && headBox) {
          html.setStyle(iFrame, 'height', wapperBox.h - headBox.h - 4 + "px");
        }
      }
    });
  });