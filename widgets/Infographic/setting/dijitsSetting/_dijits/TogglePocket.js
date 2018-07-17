define([
    'dojo/_base/declare',
    "dojo/_base/lang",
    'dojo/on',
    'dojo/_base/html',
    'dojo/Evented',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin'
  ],
  function(declare, lang, on, html, Evented, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'infographic-toggle-pocket',
      templateString: '<div>' +
        '<div class="toggle-header">' +
        '<div data-dojo-attach-point="label" class="title"></div>' +
        '<div data-dojo-attach-point="toggle" class="toggle"></div>' +
        '</div><div class="horizontal-line"></div>' +
        '<div data-dojo-attach-point="pocket" class="pocket"></div></div>',
      //config
      // titleLabel
      // state
      // content //domNode

      state: false,

      //events:
      //change

      postCreate: function() {
        this.inherited(arguments);
        this._initUI();
        this._initEvent();
        html.addClass(this.domNode, this.baseClass);
      },

      setState: function(state) {
        this.state = !!state;
        this._switchState(this.state);
      },

      getState: function() {
        return !!this.state;
      },

      hide:function(){
        html.setStyle(this.domNode, 'display', 'none');
      },

      show:function(){
        html.setStyle(this.domNode, 'display', 'flex');
      },

      _initEvent: function() {
        this.own(on(this.toggle, 'click', lang.hitch(this, function() {
          this.state = !this.state;
          this._switchState(this.state);
          this.emit('change', this.state);
        })));
      },

      _initUI: function() {
        if (this.titleLabel) {
          this.label.innerHTML = this.titleLabel;
        }
        if (this.content) {
          html.place(this.content, this.pocket);
        }
        this._switchState(this.state);
      },

      _switchState: function(state) {
        if (state) {
          this._openPocket();
        } else {
          this._closePocket();
        }
      },

      _openPocket: function() {
        html.removeClass(this.toggle, 'toggle-off');
        html.addClass(this.toggle, 'toggle-on');
        html.setStyle(this.pocket, 'display', '');
      },

      _closePocket: function() {
        html.removeClass(this.toggle, 'toggle-on');
        html.addClass(this.toggle, 'toggle-off');
        html.setStyle(this.pocket, 'display', 'none');
      }
    });
  });