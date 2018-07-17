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
  "./wro/Context",
  "jimu/dijit/Message"],
function(declare, Context, Message) {

  var oThisClass = declare([Context], {

    showError: function(title,error) {
      //console.warn("WroContext.showError",title,error);
      if (error && error.message) {
        this.showMessage(title,error.message);
      } else {
        this.showMessage(title,error);
      }
    },

    showMessage: function(title,message) {
      //console.warn("WroContext.showMessage",title,message);
      new Message({
        titleLabel: title,
        message: message
      });
    },

    showMessages: function(title,subTitle,messages) {
      //console.warn("WroContext.showMessages",title,subTitle,messages);
      var i, nd, nd1, nd2;
      nd = document.createElement("div");
      if (typeof subTitle === "string" && subTitle.length > 0) {
        nd1 = document.createElement("p");
        nd1.appendChild(document.createTextNode(subTitle));
        nd.appendChild(nd1);
      }
      nd1 = document.createElement("ul");
      nd.appendChild(nd1);
      for (i = 0; i < messages.length; i++) {
        nd2 = document.createElement("li");
        nd2.appendChild(document.createTextNode(messages[i]));
        nd1.appendChild(nd2);
      }
      new Message({
        titleLabel: title,
        message: nd
      });
    }

  });

  return oThisClass;
});
