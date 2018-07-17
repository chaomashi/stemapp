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
  'jimu/utils'
], function (
  jimuUtils
) {
  var mo = {};

  /**
   * Removes HTML tags from string.
   * @param {string} taggedText String to clean
   * @return {string} Cleaned string
   */
  mo.sanitizeNoTags = function (taggedText) {
    var cleanedText, replacer;

    cleanedText = jimuUtils.sanitizeHTML(taggedText);

    // Remove remaining tags
    replacer = new RegExp(
        '<(?:' +
        // Comment body.
        '!--(?:(?:-*[^->])*--+|-?)' +
        // Special "raw text" elements whose content should be elided.
        '|script\\b' + '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*' + '>[\\s\\S]*?</script\\s*' +
        '|style\\b' + '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*' + '>[\\s\\S]*?</style\\s*' +
        // Regular name
        '|/?[a-z]' +
        '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*' +
        ')>',
        'gi');

    function removeTags(html) {
      // Replace using RegExp until we can't replace anymore
      var savedHTML;
      do {
        savedHTML = html;
        html = html.replace(replacer, '');
      } while (html !== savedHTML);

      // Escape open brackets
      return html.replace(/</g, '&lt;');
    }

    cleanedText = removeTags(cleanedText).trim();
    return cleanedText;
  };

  /*------------------------------------------------------------------------------------------------------------------*/
  return mo;
});
