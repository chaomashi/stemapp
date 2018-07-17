define([
    'dojo/_base/declare',
    "dojo/_base/lang",
    'dojo/on',
    'dojo/_base/html',
    'dojo/Evented',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    "dojo/store/Memory",
    "dijit/form/HorizontalSlider",
    "../../utils",
    "dijit/form/ComboBox"
  ],
  function(declare, lang, on, html, Evented, _WidgetBase, _TemplatedMixin,
    _WidgetsInTemplateMixin, Memory, HorizontalSlider, igUtils) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'infographic-visible-sliderbar',
      templateString: '<div>' +
        '<div style="justify-content:space-between" class="lr-flex">' +
        '<div data-dojo-attach-point="vsbSelect" data-dojo-props="style:\'width:35%;\'"' +
        'data-dojo-type="dijit/form/ComboBox" ></div>' +
        '<div data-dojo-attach-point="vsbSlider" style:"width:57%;"></div>' +
        '</div>',
      // options
      // min
      // max
      // step
      // value

      //public methods
      //setValue
      //getValue

      //events:
      //change

      postCreate: function() {
        this.inherited(arguments);
        this._initDefaultValue();
        this._initUI();
        this._initEvent();
        html.addClass(this.domNode, this.baseClass);
      },

      _initDefaultValue: function() {
        if (typeof this.min === 'undefined') {
          this.min = 0;
        }
        if (typeof this.max === 'undefined') {
          this.min = 100;
        }
        if (typeof this.step === 'undefined') {
          this.step = 1;
        }
        if (typeof this.value === 'undefined') {
          this.value = 50;
        }
      },

      isValid:function(){
        return this.vsbSelect.isValid();
      },

      getValue: function() {
        return this.value;
      },

      setValue: function(value) {
        this.value = value;
        this.vsbSliderbar.set('value', value);
      },

      _initEvent: function() {

        this.own(on(this.vsbSelect, 'change', lang.hitch(this, function(value) {
          if (!this.vsbSelect.isValid()) {
            return;
          }
          value = Number(value);
          this.vsbSliderbar.set('value', value);
          this.emit('change', value);
          this.value = value;
        })));

        this.own(on(this.vsbSliderbar, 'change', lang.hitch(this, function(value) {
          value = Number(value);
          if (!igUtils.isInteger(value)) {
            value = parseFloat(value, 10).toFixed(1);
          }
          this.vsbSelect.set('value', value);

        })));

      },

      _initUI: function() {
        //vsb select
        var vsbSelectStore = new Memory({});
        for (var i = this.min, max = this.max; i <= max; i += this.step) {
          vsbSelectStore.put({
            id: i,
            name: i
          });
        }
        this.vsbSelect.store = vsbSelectStore;
        this.vsbSelect.set('value', this.value);
        this.vsbSelect.validator = lang.hitch(this, function() {
          var s = this.vsbSelect.get('value');
          if (s > this.max || s < this.min) {
            return false;
          }
          if (s !== null && s !== "") {
            return !isNaN(s);
          }
          return false;
        });
        //vsb slider
        this.vsbSliderbar = new HorizontalSlider({
          name: "slider",
          value: this.value,
          minimum: this.min,
          maximum: this.max,
          discreteValues: this.max / this.step,
          intermediateChanges: false,
          showButtons: false,
          style: "width:57%;margin:auto 0 auto 5px"
        }, this.vsbSlider);
        this.vsbSliderbar.startup();
      }
    });
  });