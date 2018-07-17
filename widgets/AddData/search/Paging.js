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
define(["dojo/_base/declare",
    "dojo/dom-class",
    "./SearchComponent",
    "dojo/text!./templates/Paging.html",
    "dojo/i18n!../nls/strings",
    "./util"
  ],
  function(declare, domClass, SearchComponent, template, i18n, util) {

    return declare([SearchComponent], {

      i18n: i18n,
      templateString: template,

      hasLess: false,
      hasMore: false,
      nextStart: -1,
      numPerPage: null,
      previousStart: -1,
      start: 1,

      postCreate: function() {
        this.inherited(arguments);
        if (this.numPerPage === null) {
          this.numPerPage = 30;
        }
        this.enableOrDisable();
      },

      startup: function() {
        if (this._started) {
          return;
        }
        this.inherited(arguments);

        try {
          var numPer = this.getConfig().numPerPage;
          var v = Number(numPer);
          if (typeof v === "number" && !isNaN(v)) {
            v = Math.floor(v);
            if (v >= 1 && v <= 100) {
              this.numPerPage = v;
            }
          }
        } catch (ex) {
          console.warn("Error setting numPerPage:");
          console.warn(ex);
        }
        if (this.numPerPage === null) {
          this.numPerPage = 30;
        }
      },

      enableOrDisable: function() {
        if (this.hasLess) {
          domClass.remove(this.firstButton.parentNode, "disabled");
          domClass.remove(this.previousButton.parentNode, "disabled");
        } else {
          domClass.add(this.firstButton.parentNode, "disabled");
          domClass.add(this.previousButton.parentNode, "disabled");
        }
        if (this.hasMore) {
          domClass.remove(this.nextButton.parentNode, "disabled");
        } else {
          domClass.add(this.nextButton.parentNode, "disabled");
        }
      },

      /* events ========================================================== */

      firstButtonClicked: function() {
        if (this.hasLess) {
          this.start = 1;
          this.search();
        }
      },
      previousButtonClicked: function() {
        if (this.hasLess) {
          this.start = this.previousStart;
          this.search();
        }
      },
      nextButtonClicked: function() {
        if (this.hasMore) {
          this.start = this.nextStart;
          this.search();
        }
      },

      /* SearchComponent API ============================================= */

      appendQueryParams: function(params) {
        params.start = this.start;
        params.num = this.numPerPage;
      },

      processResults: function(searchResponse) {
        this.start = 1;
        var nPer = this.numPerPage;
        var nHits = searchResponse.total;
        var nStart = searchResponse.queryParams.start;
        if (nStart < 1) {
          nStart = 1;
        }

        this.hasLess = false;
        this.previousStart = -1;
        if (nStart > 1) {
          this.hasLess = true;
          this.previousStart = nStart - searchResponse.queryParams.num;
          if (this.previousStart < 1) {
            this.previousStart = 1;
          }
        }

        this.hasMore = false;
        this.nextStart = -1;
        if (searchResponse.nextQueryParams && searchResponse.nextQueryParams.start > 1) {
          this.hasMore = true;
          this.nextStart = searchResponse.nextQueryParams.start;
        }

        var sPage = "";
        if (nHits > nPer) {
          var nPage = 1;
          if (nStart > 1) {
            nPage = Math.floor(nStart / nPer) + 1;
          }
          sPage = this.i18n.search.paging.pagePattern;
          sPage = sPage.replace("{page}", "" + nPage);
        } else {
          sPage = this.i18n.search.paging.pagePattern;
          sPage = sPage.replace("{page}", "" + 1);
        }
        util.setNodeText(this.pageNode, sPage);
        this.enableOrDisable();
      }

    });
  });
