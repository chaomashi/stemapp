define([
  'dojo/Evented',
  'dojo/_base/declare',
  'dojo/has',
  'dojo/_base/lang',
  'jimu/utils',
  'jimu/dijit/Message'
],
function (Evented, declare, has, lang, utils, Message) {
return declare([Evented], {
  declaredClass : 'readJSON',
  config : null,
  jsonFile: null,

  constructor: function(/*Object*/args) {
    declare.safeMixin(this, args);
  },

  checkFileReader: function() {
    if (this.supportHTML5()) {
      console.log('HTML 5 loader');
      this._processFiles(this.jsonFile);
    }
    else if (!this.supportHTML5() && !has('safari') && this.isEnabledFlash()) {
      utils.file.loadFileAPI().then(lang.hitch(this, function() {
        console.log('loading FileAPI');
        //domClass.add(this.csvFileInput, 'fileInputNonHTML5, js-fileapi-wrapper');
      }));
    } else {
      console.log('no loader');
      //domClass.add(this.csvFileInput, 'fileInputHTML5');
      //domClass.remove(this.showFileDialogBtn, 'hide');
    }
  },

  _processFiles : function(files) {
    if (files.length > 0) {
      var file = files[0];
      if (file.name.indexOf('.json') !== -1) {
        if (file) {
          this.handleJson(file);
        }
      } else {
        new Message({
          message : 'Not a json file'
        });
      }
    }
  },

  handleJson : function(file) {
    //console.log('Reading CSV: ', file, ', ', file.name, ', ', file.type, ', ', file.size);
    if (this.supportHTML5()) {
      var reader = new FileReader();
      reader.onload = (function(context) {
        return function() {
          if(reader.result.indexOf("groups") > -1) {
            context.completePrompt(reader.result);
          } else {
            new Message({
              message : 'json file is Invalid'
            });
            context.errorPrompt('error');
          }

        };
      })(this);
      reader.readAsText(file);
    } else {
      window.FileAPI.readAsText(file, lang.hitch(this, function (evt) {
        if (evt.type === 'load') {
          //this._processCSVData(evt.result);
        }
      }));
    }
  },






  supportHTML5: function() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      return true;
    } else {
      return false;
    }
  },
  supportFileAPI: function() {
    if (has('safari') && has('safari') < 6) {
      return false;
    }
    if (window.FileAPI && window.FileAPI.readAsDataURL) {
      return true;
    }
    return false;
  },
  isEnabledFlash: function(){
    var swf = null;
    if (document.all) {
      try{
        /* jshint ignore:start */
        swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        /* jshint ignore:end */
      }catch(e) {
        swf = null;
      }
    } else {
      if (navigator.plugins && navigator.plugins.length > 0) {
        swf = navigator.plugins["Shockwave Flash"];
      }
    }
    return !!swf;
  },

  completePrompt: function(pSettings) {
    this.emit("complete", {'UserSettings':pSettings});
  },

  errorPrompt: function() {
    this.emit("error", {'UserSettings':'error'});
  }

});
});