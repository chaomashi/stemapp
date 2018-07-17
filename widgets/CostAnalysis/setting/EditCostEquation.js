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
  'jimu/dijit/Popup',
  'jimu/BaseWidget',
  'dojo/Evented',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./EditCostEquation.html',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/dom-class',
  'dojo/query',
  'dojo/dom-attr'
], function (
  declare,
  Popup,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  lang,
  on,
  domClass,
  query,
  domAttr
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    popup: null,
    baseClass: 'jimu-widget-cost-analysis-edit-equation',
    constructor: function (options) {
      lang.mixin(this, options);
    },

    postMixInProperties: function () {
      this.nls.common = {};
      lang.mixin(this.nls.common, window.jimuNls.common);
    },

    postCreate: function () {
      this.popup = null;
      this.inherited(arguments);
      this._init();
    },

    /**
   * Initializing the widget
   * @memberOf CostAnalysis/setting/EditCostEquation
   */
    _init: function () {
      this._createEditLayerRowPopup();

    },

    /**
   * Create Edit Cost Equation popup dialog
   * @memberOf CostAnalysis/setting/EditCostEquation
   */
    _createEditLayerRowPopup: function () {
      var popupTitleDiv;
      //initializing popup with default configuration
      this.popup = new Popup({
        titleLabel: this.layerTitle + ": " + this.existingRowValues.featureTemplateValue,
        content: this.domNode,
        width: 600,
        height: 515,
        autoHeight: true,
        "class": this.baseClass,
        buttons: [{
          label: this.nls.common.ok,
          onClick: lang.hitch(this, 'onOkButtonClicked')
        }, {
          label: this.nls.common.cancel,
          classNames: ['jimu-btn-vacation'],
          onClick: lang.hitch(this, 'onCancelButtonClicked')
        }]
      });
      // to set tooltip to popup title
      popupTitleDiv = query('.title-label', this.popup.domNode)[0];
      domAttr.set(popupTitleDiv, "title",
      this.layerTitle + ": " + this.existingRowValues.featureTemplateValue);
      this._setRowPopupValues();
    },

    /**
   * Emit the event edit popup ok clicked
   * @memberOf CostAnalysis/setting/EditCostEquation
   */
    onOkButtonClicked: function () {
      if (domClass.contains(this.costEquationValue.domNode, "esriCTCostEquationError")) {
        /* It does */
        alert(this.nls.costingInfo.validCostEquationMessage);
      }
      else {
        (this.currentRow.costEquationInput).set("value", this.costEquationValue.getValue());
        this.popup.close();

      }
    },

    /**
   * Emit the event edit popup cancel clicked
   * @memberOf CostAnalysis/setting/EditCostEquation
   */
    onCancelButtonClicked: function () {
      this.popup.close();
    },

    /**
     * This function is used to set layer and asset name as title
     * @memberOf setting/EditCostEquation
     */
    _setRowPopupValues: function () {
      var geographyRowValue, scenarioRowValue;
      geographyRowValue = this.existingRowValues.geographyValue === "" ?
        this.nls.costingInfo.noneValue : this.existingRowValues.geographyValue;
      scenarioRowValue = this.existingRowValues.scenarioValue === "" ?
        this.nls.costingInfo.noneValue : this.existingRowValues.scenarioValue;
      this.geographyValue.set("value", geographyRowValue);
      this.scenarioValue.set("value", scenarioRowValue);
      this.costEquationValue.set("value", this.existingRowValues.costEquationValue);
      // key up event fot textarea
      on(this.costEquationValue, "KeyUp", lang.hitch(this, function (e) {
        this._costEquationKeyUp(e);
      }));
      this.costEquationHint.innerHTML = this.nls.costingInfo.hintText;
    },

    /**
     * This function is used to handle costEquationKeyUp
     * @memberOf setting/EditCostEquation
     */
    _costEquationKeyUp: function (event) {
      var costAnalysisDomNode, validateCostEquationERes;
      costAnalysisDomNode = this.costEquationValue.domNode;
      if (domClass.contains(costAnalysisDomNode, "esriCTCostEquationError")) {
        domClass.remove(costAnalysisDomNode, "esriCTCostEquationError");
      }
      validateCostEquationERes = this.validateCostEquation(event.currentTarget.value);
      if (!validateCostEquationERes) {
        domClass.add(costAnalysisDomNode, "esriCTCostEquationError");
      }
    }
  });
});