define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Evented',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/_base/query',
    'jimu/dijit/Popup',
    'jimu/utils',
    'dojo/json',
    'dojo/text!./templates.json'
  ],
  function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented, on,
    lang, html, query, Popup, jimuUtils, JSON, _templates) {

    var templateChooser = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'jimu-widget-infographic-setting-template-popup',
      templateString: '' +
        '<div>' +
        '<div class="chooser-container" data-dojo-attach-event="click:_onTemplateClick"' +
        'data-dojo-attach-point="chooserDiv"></div>' +
        '<div class="footer">' +
        '<div class="jimu-btn jimu-float-trailing jimu-btn-vacation cancel"' +
        'data-dojo-attach-point="btnCancel">${nls.cancel}</div>' +
        '<div class="jimu-btn jimu-float-trailing ok jimu-trailing-margin1 jimu-state-disabled"' +
        ' data-dojo-attach-point="btnOk">${nls.ok}</div>' +
        '</div>' +
        '</div>',

      postMixInProperties: function() {},

      postCreate: function() {
        this.inherited(arguments);

        _templates = jimuUtils.replacePlaceHolder(_templates, this.nls.stringsInTemplate);

        this._initTemplates();

        this.own(on(this.btnOk, 'click', lang.hitch(this, function() {
          if (this.getSelectedItem()) {
            this.emit('ok', this.getSelectedItem());
          }
        })));
        this.own(on(this.btnCancel, 'click', lang.hitch(this, function() {
          this.emit('cancel');
        })));
      },

      _initTemplates: function() {
        var templates = JSON.parse(_templates);
        var tr = null;
        var trStr = '<div class="template-tr">' + '</div>';

        templates.forEach(lang.hitch(this, function(item, index) {

          if (index % 6 === 0) {
            tr = null;
            tr = html.toDom(trStr);
            html.place(tr, this.chooserDiv);
          }

          var simpleTemplate = this._getSimpleTemplate(item);

          html.place(simpleTemplate, tr);
        }));
      },

      _onTemplateClick: function(e) {
        var target = e.target;
        if (html.hasClass(target, 'imgDiv')) {
          if (html.hasClass(target, 'selected')) {
            html.removeClass(target, 'selected');
          } else {
            query('.tempDiv .imgDiv.selected', this.domNode).removeClass('selected');
            html.addClass(target, 'selected');
          }
          var selectedTemplate = this.getSelectedItem();
          if (selectedTemplate) {
            html.removeClass(this.btnOk, 'jimu-state-disabled');
          } else {
            html.addClass(this.btnOk, 'jimu-state-disabled');
          }
        }
      },

      _getSimpleTemplate: function(item) {

        var templateDiv = '<div class="tempDiv">' +
          '<div class="imgDiv ' + item.name + '">' +
          '<div class="select-icon">' + '</div>' + '</div>' +
          '<div class="labelDiv" title="' + item.label + '">' + item.label + '</div>' +
          '</div>';

        var templateDom = html.toDom(templateDiv);
        var imgDiv = query('.imgDiv', templateDom)[0];
        imgDiv.config = item.config;
        imgDiv.config.name = item.name;
        return templateDom;
      },

      getSelectedItem: function() {
        var selected = query('.tempDiv .imgDiv.selected', this.domNode)[0];
        if (selected) {
          return selected.config;
        }
      }
    });

    return declare([Popup, Evented], {
      width: 970,
      height: 560,
      titleLabel: '',

      dijitArgs: null, //refer to the parameters of dijit templateChooser

      postCreate: function() {
        this.inherited(arguments);
        html.addClass(this.domNode, 'jimu-widget-card-setting-template-popup');
        this.dijitArgs = {
          nls: this.nls
        };
        this.tc = new templateChooser(this.dijitArgs);
        this.tc.placeAt(this.contentContainerNode);
        this.tc.startup();

        this.own(on(this.tc, 'ok', lang.hitch(this, function(template) {
          this.emit('ok', template);
        })));

        this.own(on(this.tc, 'cancel', lang.hitch(this, function() {
          try {
            this.emit('cancel');
          } catch (e) {
            console.error(e);
          }
        })));
      }
    });
  });