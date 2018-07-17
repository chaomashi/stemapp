define([
  "dojo/Evented",
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array'
],
function (Evented, declare, lang, array) {
  return declare([Evented], {
    declaredClass: 'layerSyncDetails',
    layerID: null,
    numberOfRequest: 0,
    requestComplete: 0,
    totalRecordsToSync: 0,
    recordsSynced: 0,
    recordsErrors: 0,
    deferreds: [],
    complete: false,
    hasError: false,
    constructor: function (/*Object*/args) {
      declare.safeMixin(this, args);
    },
    addDeferred: function (def) {
      def.then(lang.hitch(this, function (added, updated, deleted) {
        //Hande any errors in the update
        array.forEach(updated, function (updateItem) {
          if (updateItem && updateItem.hasOwnProperty('success') && updateItem.success === false) {
            if (updateItem && updateItem.hasOwnProperty('error')) {
              this.recordsErrors = this.recordsErrors + 1;
              console.info(updateItem.error);
            }
          }
        }, this);
        this.recordsSynced = this.recordsSynced + updated.length;
        this.requestComplete = this.requestComplete + 1;
        this.emit("requestComplete", {
          'layerID': this.layerID,
          'countRequest': updated.length,
          'countSoFar': this.recordsSynced,
          'totalToSync': this.totalRecordsToSync,
          'addded': added,
          'removed': deleted,
          'errors': this.recordsErrors
        });
        if (this.isComplete()) {
          this.emit("complete", {});
        }
      }), lang.hitch(this, function (err) {
        this.hasError = true;
        console.log('error: ' + err.message + "\nLayer: " + err.layer.title + "\ndetails: " + err.details);
        this.requestComplete = this.requestComplete + 1;
        this.recordsSynced = this.recordsSynced + err.chunk.length;
        this.recordsErrors = this.recordsErrors + err.chunk.length;
        this.emit("requestComplete", {
          'layerID': this.layerID,
          'countRequest': err.chunk.length,
          'countSoFar': this.recordsSynced,
          'totalToSync': this.totalRecordsToSync,
          'addded': null,
          'removed': null,
          'errors': this.recordsErrors
        });
        if (this.isComplete()) {
          this.emit("complete", {});
        }
      }));
      this.deferreds.push(def);
    },
    isComplete: function () {
      if (this.numberOfRequest === this.requestComplete) {
        this.complete = true;
      } else {
        this.complete = false;
      }
      return this.complete;
    }
  });
});