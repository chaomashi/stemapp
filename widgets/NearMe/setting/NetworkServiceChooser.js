///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  'dojo/_base/declare',
  'jimu/BaseWidgetSetting',
  "dijit/_WidgetsInTemplateMixin",
  "dojo/_base/lang",
  "dojo/on",
  "dojo/dom-class",
  "dojo/text!./NetworkServiceChooser.html",
  "jimu/dijit/ItemSelector",
  "dijit/Tree",
  "dojo/query",
  "esri/request",
  "dojo/store/Memory",
  "dojo/dom-construct",
  "dijit/tree/ObjectStoreModel",
  "jimu/dijit/LoadingIndicator",
  "dojox/validate/regexp",
  "jimu/dijit/Message",
  "dojo/domReady!"
], function (
  declare,
  BaseWidgetSetting,
  _WidgetsInTemplateMixin,
  lang,
  on,
  domClass,
  NetworkServiceChooserTemplate,
  ItemSelector,
  Tree,
  query,
  esriRequest,
  Memory,
  domConstruct,
  ObjectStoreModel,
  LoadingIndicator,
  regexp,
  Message
) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-nearme-setting',
    templateString: NetworkServiceChooserTemplate,
    selectRouteURL: null,
    agolFlag: false,
    serviceFlag: false,
    startup: function () {
      this.inherited(arguments);
    },

    postCreate: function () {
      var routeSearch, args = {
        portalUrl: this.portalUrl,
        itemTypes: ["Network analysis service"]
      };
      //initialize item selector  to dispay route URL options
      this.routeChooser = new ItemSelector(args);
      this.routeChooser.placeAt(this.itemSelectDiv);
      //provide handler on clicking of 'OK' button
      this.own(on(this.okButton, 'click', lang.hitch(this, function (evt) {
        if (!domClass.contains(this.okButton, "jimu-state-disabled")) {
          this.onOkClick(evt);
        }
      })));
      //provide handler on clicking of 'cancel' button
      this.own(on(this.cancelButton, 'click', lang.hitch(this, function (evt) {
        this.onCancelClick(evt);
      })));
      //enable 'next' button on selecting any route URL item
      this.own(on(this.routeChooser, 'item-selected', lang.hitch(this, function () {
        domClass.remove(this.btnNext, "jimu-state-disabled");
      })));
      //disable 'next' button on removing selection from route URL item
      this.own(on(this.routeChooser, 'none-item-selected', lang.hitch(this, function () {
        domClass.add(this.btnNext, "jimu-state-disabled");
      })));
      //on 'keyup' check whether text box contains value
      this.own(on(this.serviceURL, 'keyup', lang.hitch(this, function () {
        if (lang.trim(this.serviceURL.get("value")) === "") {
          //disable 'validate' button if text box gets emptied
          domClass.add(this.validateRouteURL, "jimu-state-disabled");
        } else {
          //enable 'validate' button if any value is entered in text-box
          domClass.remove(this.validateRouteURL, "jimu-state-disabled");
        }
      })));
      //attach 'click' event on 'validate' button to validate the input string
      this.own(on(this.validateRouteURL, 'click', lang.hitch(this, function () {
        if (!domClass.contains(this.validateRouteURL, "jimu-state-disabled")) {
          this.serviceFlag = true;
          this._fetchRouteLayer(this.routeLayerList);
        }
      })));
      //fetch the route URL from the selected route URL item
      this.own(on(this.btnNext, 'click', lang.hitch(this, function () {
        if (!domClass.contains(this.btnNext, "jimu-state-disabled")) {
          this.agolFlag = true;
          this._fetchRouteLayer(this.agolRouteLayerList);
        }
      })));
      routeSearch = query('.routeSearchRadio', this.routeSearch);
      this.own(on(routeSearch, 'change', lang.hitch(this, function () {
        //check whether search option is selected to search with in the organization
        if (this.organizationRadio && this.organizationRadio.checked) {
          domClass.add(this.serviceUrlDiv, "esriCTHidden");
          if (this.agolFlag) {
            domClass.add(this.itemSelectDiv, "esriCTHidden");
            domClass.remove(this.agolRouteLayerList, "esriCTHidden");
            domClass.add(this.btnBack, "esriCTHidden");
          } else {
            domClass.remove(this.itemSelectDiv, "esriCTHidden");
            domClass.add(this.agolRouteLayerList, "esriCTHidden");
            domClass.remove(this.btnNext, "esriCTHidden");
            domClass.add(this.okButton, "jimu-state-disabled");
          }
        } else {
          domClass.add(this.itemSelectDiv, "esriCTHidden");
          domClass.remove(this.serviceUrlDiv, "esriCTHidden");
          domClass.add(this.btnNext, "esriCTHidden");
          domClass.add(this.btnBack, "esriCTHidden");
          domClass.add(this.agolRouteLayerList, "esriCTHidden");
        }
      })));
      this._initLoading();
    },

    /**
    * This function used for loading indicator
    * @memberOf widgets/NearMe/settings/NetworkServiceChooser
    */
    _initLoading: function () {
      this.loading = new LoadingIndicator({
        hidden: true
      });
      this.loading.placeAt(this.domNode);
      this.loading.startup();
    },

    onOkClick: function (evt) {
      return evt;
    },

    onCancelClick: function (evt) {
      return evt;
    },

    /**
    * This function used for querying route layer form Service URL
    * @memberOf widgets/NearMe/settings/NetworkServiceChooser
    */
    _fetchRouteLayer: function (routeTreeNode) {
      var requestArgs, routeUrl;
      routeUrl = this._getValidRouteURL();
      this.loading.show();
      requestArgs = {
        url: routeUrl,
        content: {
          f: "json"
        },
        handleAs: "json",
        callbackParamName: "callback"
      };
      esriRequest(requestArgs).then(lang.hitch(this, function (response) {
        var hasValidRouteLayers = false;
        // if response returned from the queried request
        if (response.hasOwnProperty("routeLayers")) {
          // if name value exist in response object
          if (response.routeLayers !== null) {
            if (response.routeLayers.length > 0) {
              domClass.add(this.itemSelectDiv, "esriCTHidden");
              if (this.serviceFlag) {
                domClass.remove(this.serviceUrlDiv, "esriCTHidden");
                domClass.add(this.agolRouteLayerList, "esriCTHidden");
                domClass.add(this.btnNext, "esriCTHidden");
                domClass.add(this.btnBack, "esriCTHidden");
                this.serviceFlag = false;
              } else {
                domClass.add(this.serviceUrlDiv, "esriCTHidden");
                domClass.remove(this.agolRouteLayerList, "esriCTHidden");
                domClass.add(this.btnNext, "esriCTHidden");
                domClass.remove(this.btnBack, "esriCTHidden");
                this.agolFlag = false;
              }
              //create tree to display route URL options
              this._createTree(routeUrl, response.routeLayers, routeTreeNode);
              hasValidRouteLayers = true;
            }
          }
        }
        //if invalid route service
        if (!hasValidRouteLayers) {
          this._resetRouteSearch(routeTreeNode, this.nls.networkServiceChooser
              .invalidRouteServiceURL);
          this.loading.hide();
        }
      }), lang.hitch(this, function (err) {
        if (err && err.message === "Rate limit exceeded. Please try again later.") {
          this._resetRouteSearch(routeTreeNode, this.nls.networkServiceChooser
          .rateLimitExceeded);
        } else if (err && err.message === "Error invoking service") {
          this._resetRouteSearch(routeTreeNode, this.nls.networkServiceChooser
          .errorInvokingService);
        } else {
          this._resetRouteSearch(routeTreeNode, this.nls.networkServiceChooser
          .invalidRouteServiceURL);
        }
        this.loading.hide();
      }));
    },

    /**
    * This function used for calculation valid route URL
    * @memberOf widgets/NearMe/settings/NetworkServiceChooser
    */
    _getValidRouteURL: function () {
      var validURL, item, itemURL, lastIndex, layer;
      if (this.routeChooser && this.agolFlag) {
        item = this.routeChooser.getSelectedItem();
        itemURL = item.url;
      } else {
        itemURL = this.serviceURL.value;
      }
      lastIndex = itemURL.lastIndexOf('/');
      layer = itemURL.substr(0, lastIndex + 1);
      validURL = this._urlValidator(layer);
      this.routeName = "";
      if (validURL) {
        this.routeName = itemURL.substring(lastIndex + 1, itemURL.length + 1);
        itemURL = layer;
      }
      return itemURL;
    },

    /**
    * This function used for create tree list of route URL's
    * @memberOf widgets/NearMe/settings/NetworkServiceChooser
    */
    _createTree: function (itemURL, data, node) {
      var self = this, tree, memoryData, i, myStore, myModel;
      domConstruct.empty(node);
      // Create test store, adding the getChildren() method required by ObjectStoreModel
      memoryData = {
        data: [{
          id: 1,
          name: 'Route Layers',
          url: itemURL,
          root: true
        }],
        getChildren: function (object) {
          return this.query({
            parent: object.id
          });
        }
      };
      if (this.routeName) {
        for (i = 0; i < data.length; i++) {
          if (this.routeName === data[i]) {
            memoryData.data.push({
              id: data[i],
              name: data[i],
              url: itemURL + data[i],
              parent: 1
            });
          }
        }
      } else {
        for (i = 0; i < data.length; i++) {
          memoryData.data.push({
            id: data[i],
            name: data[i],
            url: itemURL + "/" + data[i],
            parent: 1
          });
        }
      }
      myStore = new Memory(memoryData);
      // Create the model
      myModel = new ObjectStoreModel({
        store: myStore,
        query: {
          root: true
        }
      });
      // Create the Tree, specifying an onClick method
      tree = new Tree({
        model: myModel,
        onClick: function (item) {
          // Get the route URL from the selected item
          if (item.id === 1) {
            domClass.add(self.okButton, "jimu-state-disabled");
          } else {
            domClass.remove(self.okButton, "jimu-state-disabled");
            self.selectRouteURL = item.url;
          }
        },
        getIconStyle: lang.hitch(this, function (item) {
          var iconStyle = null, imageName, styles;
          if (!item || item.id === 'root') {
            return null;
          }
          styles = {
            width: "20px",
            height: "20px",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: ''
          };
          if (item.id === 1) {
            imageName = "group-layer.png";
          } else {
            imageName = "route-layer.png";
          }
          if (imageName) {
            styles.backgroundImage = "url(" + this.folderUrl + "images/" + imageName + ")";
            iconStyle = styles;
          }
          return iconStyle;
        })
      });
      tree.placeAt(node).startup();
      //select first route URL  if only one item is available in route URL list
      if (this.routeName && memoryData.data.length > 1) {
        tree.set('paths', [
          ['1', this.routeName]
        ]);
        domClass.remove(this.okButton, "jimu-state-disabled");
        this.selectRouteURL = memoryData.data[1].url;
      }
      this.loading.hide();
    },

    /**
    * This function used for reseting the route layer search in case error occurs
    * @memberOf widgets/NearMe/settings/NetworkServiceChooser
    */
    _resetRouteSearch: function (node, error) {
      this._errorMessage(error);
      domConstruct.empty(node);
      this.loading.hide();
      this.agolFlag = false;
      this.serviceFlag = false;
    },

    _onBtnBackClicked: function () {
      domClass.remove(this.itemSelectDiv, "esriCTHidden");
      domClass.add(this.serviceUrlDiv, "esriCTHidden");
      domClass.add(this.agolRouteLayerList, "esriCTHidden");
      domClass.remove(this.btnNext, "esriCTHidden");
      domClass.add(this.btnBack, "esriCTHidden");
    },

    /**
    * This function create error alert.
    * @param {string} err
    * @memberOf widgets/NearMe/settings/NetworkServiceChooser
    **/
    _errorMessage: function (err) {
      var errorMessage = new Message({
        message: err
      });
      errorMessage.message = err;
    },

    /**
    * @return {object} returns the URL validator object
    * @memberOf widgets/NearMe/settings/NetworkServiceChooser
    **/
    _urlValidator: function (value) {
      var strReg, regexValue, regexValueForTest, regexValueForService, finalValue;
      // Checking for regex expression for URL validation
      strReg = '^' + regexp.url({
        allowNamed: true,
        allLocal: false
      });
      // Checking for regex value
      regexValue = new RegExp(strReg, 'g');
      regexValueForTest = regexValue.test(value);
      regexValueForService = /\/Route\/NAServer/gi;
      finalValue = regexValueForService.test(value);
      return regexValueForTest && finalValue;
    }
  });
});