/*
 | Copyright © 2014 - 2018 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
//====================================================================================================================//
define([
  'dojo/_base/array',
  'dojo/_base/declare',
  'dojo/Deferred'
  ], function (
    array,
    declare,
    Deferred
  ) {
    return declare(null, {

      /**
       * Creates and optionally downloads CSV content.
       * @param {array} contentArray Array of labels; each label is an array of
       *         label line strings
       * @param {string?} filenameRoot Filename without the extension; function adds '.csv'. If omitted,
       *         blob is not saved to the file system
       * @return {object} Created blob
       * @memberOf Download_CSV#
       */
      save: function(contentArray, filenameRoot) {
        var labels, done = new Deferred();

        labels = array.map(contentArray, function (labelLines) {
          return '"' + labelLines.join('","') + '"\n';
        });

        // Save the content
        var blob = this._createAndSaveCSV(labels, filenameRoot);
        done.resolve(blob);

        return done;
      },

      /**
       * Performs the download.
       * @param {array} contentArray Array of labels; each label is an array of
       *         label line strings
       * @param {string?} filenameRoot Filename without the extension; function adds '.csv'. If omitted,
       *         blob is not saved to the file system
       * @return {object} Created blob
       * @memberOf Download_CSV#
       */
      _createAndSaveCSV: function(contentArray, filenameRoot) {
        // Supports Chrome, Firefox, Edge, IE 11, Mac Safari
        var blob = new Blob(contentArray, {type: 'text/csv'});

        if (filenameRoot) {
          if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filenameRoot + '.csv');
          }
          else{
            var elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filenameRoot + '.csv';
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
            window.URL.revokeObjectURL(blob);
          }
        }

        return blob;
      }

    });
  }
);
