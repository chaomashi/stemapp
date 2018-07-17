define([
    'dojo/_base/declare',
    'dojo/text!./CustomColorItem.html',
    'dojo/Evented',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/dijit/ColorPickerPopup',
    'dojo/_base/Color',
    'jimu/utils',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dijit/form/ValidationTextBox'
  ],
  function(declare, templateString, Evented, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
    ColorPickerPopup, Color, jimuUtils, on, lang, html) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'infographic-custom-color-item',
      templateString: templateString,
      // config
      // text
      // label
      // color
      postCreate: function() {
        this.inherited(arguments);
        this._initDom();
        this._initEvents();
      },

      startup: function() {
        this.inherited(arguments);

        if (this.config) {
          if (typeof this.config.uniqueID !== 'undefined') {
            this.uniqueID = this.config.uniqueID;
          } else {
            this.uniqueID = jimuUtils.getRandomString();
          }
        } else {
          this.uniqueID = jimuUtils.getRandomString();
        }
        html.setAttr(this.domNode, "data-id", this.uniqueID);

        this.setConfig(this.config);
      },

      highLight: function() {
        if (!html.hasClass(this.domNode, 'high-light')) {
          html.addClass(this.domNode, 'high-light');
        }
        setTimeout(function() {
          this._removeHighLight();
        }.bind(this), 2000);
      },

      _removeHighLight: function() {
        if (!this.domNode) {
          return;
        }
        if (html.hasClass(this.domNode, 'high-light')) {
          html.removeClass(this.domNode, 'high-light');
        }
      },

      setConfig: function(config) {
        if (!config) {
          return;
        }
        if (config.color) {
          this.colorPicker.setColor(new Color(config.color));
        }
        if (typeof config.text !== 'undefined') {
          this.textDiv.innerHTML = config.text;
          this.textDiv.title = config.text;
        }
        if (typeof config.label !== 'undefined') {
          this.labelDiv.innerHTML = config.label;
          this.editInput.set('value', config.label);
        }
        if (typeof config.id !== 'undefined') {
          this._colorItemId = config.id;
        }
      },

      setColor: function(color) {
        this.colorPicker.setColor(new Color(color));
      },

      setCategoryType: function(categoryTypes) {
        this.categoryTypes = categoryTypes;
      },

      lestenDocumentMousemove: function() {
        this._shouldCareMousemove = true;
      },

      _initDom: function() {
        this.colorPicker = new ColorPickerPopup({
          appearance: {
            showTransparent: false,
            showColorPalette: true,
            showCoustom: true,
            showCoustomRecord: true
          }
        });
        this.colorPicker.placeAt(this.colorDiv);
        this.colorPicker.startup();
        this.colorPicker.setColor(new Color('#68D2E0'));
      },

      _initEvents: function() {
        this.own(on(this.colorPicker, 'change', lang.hitch(this, function() {
          this.onChange();
        })));
        this.own(on(document.body, 'click', lang.hitch(this, function(e) {
          e.stopPropagation();
          var target = e.target;
          var a = html.isDescendant(target, this.editPart);
          if (!a) {
            this._hideEditInput();
          }
        })));
        this._hasHideEditInput = true;
      },

      hideDeleteButton: function() {
        html.addClass(this.deleteBtn, 'hidden');
      },

      hideLabelPart: function() {
        html.addClass(this.labelContainer, 'hidden');
      },

      isValid: function() {
        var label = this.labelDiv.innerHTML;
        var text = this.textDiv.innerHTML.trim();
        return !!label && !!text && this.editInput.isValid();
      },

      getConfig: function() {
        if (!this.isValid()) {
          return;
        }
        var label = this.labelDiv.innerHTML;
        var text = this.textDiv.innerHTML.trim();
        var color = this.colorPicker.getColor();
        if (color.toHex) {
          color = color.toHex();
        }
        var neededConvert = this.categoryTypes && this.categoryTypes.isNumberType;

        var config = {
          uniqueID: this.uniqueID,
          text: text,
          label: label,
          color: color
        };

        if (typeof this._colorItemId !== 'undefined') {
          var id = this._colorItemId;
          if (neededConvert) {
            id = Number(id);
          }
          config.id = id;
        }
        return config;
      },

      onChange: function() {
        var config = this.getConfig();
        if (config) {
          this.emit('change', config);
        }
      },

      _onEditClicked: function(event) {
        if (event && event.stopPropagation) {
          event.stopPropagation();
        }
        var text = this.labelDiv.innerHTML;
        this._showEditInput();
        this.editInput.set('value', text);
        this.editInput.focus();
      },

      _showEditInput: function() {
        if (this._hasHideEditInput) {
          this._hideLabelPart();
          this._showEditPart();
          this._hasHideEditInput = false;
        }
      },

      _hideEditInput: function() {
        if (!this._hasHideEditInput && this.editInput.isValid()) {
          this._hideEditPart();
          this._showLabelPart();
          this._hasHideEditInput = true;
        }
      },

      _onEditInputBlured: function() {
        var text = this.editInput.get('value');
        text = jimuUtils.stripHTML(text);
        this._hideEditInput();
        if (this.labelDiv.innerHTML !== text) {
          this.labelDiv.innerHTML = text;
          this.onChange();
        }
      },

      _onEditCancled: function(event) {
        if (event && event.stopPropagation) {
          event.stopPropagation();
        }
        this._hideEditPart();
        this._showLabelPart();
      },

      _onDeleteClick: function(event) {
        if (event && event.stopPropagation) {
          event.stopPropagation();
        }
        this.emit('delete', this.uniqueID);
        this.destroy();
      },

      destroy: function() {
        if (this.colorPicker) {
          this.colorPicker.destroy();
        }
        this.inherited(arguments);
      },

      _showLabelPart: function() {
        html.removeClass(this.labelPart, 'hide');
      },

      _hideLabelPart: function() {
        html.addClass(this.labelPart, 'hide');
      },

      _showEditPart: function() {
        html.removeClass(this.editPart, 'hide');
      },

      _hideEditPart: function() {
        html.addClass(this.editPart, 'hide');
      }

    });
  });