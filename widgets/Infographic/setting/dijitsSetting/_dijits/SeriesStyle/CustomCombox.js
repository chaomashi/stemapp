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
    'dojo/_base/html',
    'dojo/query',
    'dijit/form/ComboBox'
  ],
  function(declare, html, query, ComboBox) {
    return declare([ComboBox], {

      postCreate: function() {
        this.inherited(arguments);
        var downArrowNode = null;
        if (this._buttonNode) {
          downArrowNode = this._buttonNode;
        } else {
          downArrowNode = query('.dijitButtonNode.dijitArrowButton.dijitDownArrowButton', this.domNode)[0];
        }
        this.downArrowNode = downArrowNode;
      },

      disableInput: function() {
        if (this.focusNode) {
          this.focusNode.disabled = true;
        }
      },

      enableInput: function() {
        if (this.focusNode) {
          this.focusNode.disabled = false;
        }
      },

      showDownArrow: function() {
        if (this.downArrowNode) {
          html.removeClass(this.downArrowNode, 'hide');
        }
      },

      hideDownArrow: function() {
        if (this.downArrowNode) {
          html.addClass(this.downArrowNode, 'hide');
        }
      }

    });
  });