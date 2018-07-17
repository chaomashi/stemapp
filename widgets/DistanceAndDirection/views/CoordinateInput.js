define([
  'dojo/_base/declare',
  'dijit/form/ValidationTextBox',
  '../models/Coordinate'
], function (
  dojoDeclare,
  dijitValidationTextBox,
  Coord
) {
  var mo = dojoDeclare('test', dijitValidationTextBox, {
    required: true,

    inputCoordinate: null,

    invalidMessage: '',

    validateOnInput: true,
    _validateOnInputSetter: function (value) {
        this.validateOnInput = (value === 'true');
      },

    clear: function () {
      this.set('validateOnInput', true);
      this.set('value', '');
      this.inputCoordinate.coordinateEsriGeometry = null;
    },
    /**
     *
     **/
    constructor: function (args) {
        dojoDeclare.safeMixin(this, args);
        this.inherited(arguments);
        this.inputCoordinate = new Coord({appConfig: arguments[0].appConfig, nls: this.nls});
      },

    /**
     *
     **/
    validator: function (value) {

      if (!this.validateOnInput) {return true;}
      //if (this.get('value').length < 4) return false;

      this.inputCoordinate.set('inputString', value);

      //this.inputCoordinate.set('formatString', 'YN XE');

      this.set('invalidMessage', this.inputCoordinate.message);
      this.set('promptMessage', this.inputCoordinate.message);

      return true;
    }
  });

  return mo;
});
