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
  'jimu/BaseWidget',
  'dojo/Evented',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./asset-statistics.html',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/_base/array',
  'dojo/dom-construct',
  'dijit/form/TextBox'
], function (
  declare,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  lang,
  on,
  array,
  domConstruct,
  TextBox
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    baseClass: 'jimu-widget-cost-analysis-asset-statistics',
    //Properties
    _layerNamesObj: {},
    _statTypeNames: {},

    postCreate: function () {
      this.inherited(arguments);
      this._layerNamesObj = {};
      this._statTypeNames = {
        "count": this.nls.statisticsType.countLabel,
        "area": this.nls.statisticsType.areaLabel,
        "length": this.nls.statisticsType.lengthLabel,
        "avg": this.nls.statisticsType.averageLabel,
        "sum": this.nls.statisticsType.summationLabel,
        "max": this.nls.statisticsType.maxLabel,
        "min": this.nls.statisticsType.minLabel
      };

    },

    startup: function () {
      this.inherited(arguments);
      this._getLayerNames();
      this._initAssetStatistics();
      this.own(on(this.okButton, "click", lang.hitch(this, function () {
        this.emit("onOkButtonClicked");
      })));
    },

    /**
     * Initialize asset statistics
     * @memberOf widgets/CostAnalysis/Widget
     */
    _initAssetStatistics: function () {
      this.displayStatisticsDetail(this.config.statisticsSettings);
    },

    /**
     * This function is to display statistics details
     * @memberOf widgets/CostAnalysis/Widget
     */
    displayStatisticsDetail: function (statisticDetailDataArray) {
      domConstruct.empty(this.assetsListNode);
      if (statisticDetailDataArray.length === 0) {
        domConstruct.create("div", {
          innerHTML: this.nls.detailStatistics.noDetailStatisticAvailable,
          "class": "esriCTNoDetailStatisticMessage"
        }, this.assetsListNode);
      }
      else {
        array.forEach(statisticDetailDataArray, lang.hitch(this, function (statisticAsset) {
          this._addStatisticEntry(statisticAsset);
        }));
      }

    },

    /**
     * This function is to add statistic entry
     * @memberOf widgets/CostAnalysis/Widget
     */
    _addStatisticEntry: function (statisticAsset) {
      var assetLabel, assetStatValue, unitsAbbr = "", layer;
      assetLabel = "";
      layer = this.layerInfosObj.getLayerInfoById(statisticAsset.id);
      //Check if valid layer and layer object exist
      if (layer && layer.layerObject) {
        unitsAbbr = this.appUtils.getUnitsAbbreviation(
          layer.layerObject.geometryType,
          this.config.generalSettings.measurementUnit);
      }
      assetStatValue = this._getFeatureValue(statisticAsset);
      //Format the number in all cases except count
      if (statisticAsset.type !== "count") {
        assetStatValue = this.appUtils.applyRounding(assetStatValue);
      }
      //Add configured units for values in case of area and length
      if (statisticAsset.type === "length" || statisticAsset.type === "area") {
        assetStatValue += " " + unitsAbbr;
      }
      if (statisticAsset.label) {
        assetLabel = statisticAsset.label;
      }
      else {
        assetLabel = this._layerNamesObj[statisticAsset.id] +
          " (" + this._statTypeNames[statisticAsset.type] + ")";
      }
      if (assetStatValue === "NaN") {
        assetStatValue = 0;
      }
      this._createStatisticsDetailUI(assetLabel, assetStatValue);
    },

    /**
     * This function is to create statistic detail UI
     * @memberOf widgets/CostAnalysis/Widget
     */
    _createStatisticsDetailUI: function (assetLabel, assetStatValue) {
      var assetWrapper, assetValueWrapper;
      // code for adding divs for each statistic asset entry
      assetWrapper = domConstruct.create("div", { "class": "esriCTStatisticWrapper" },
        this.assetsListNode);
      domConstruct.create("div", {
        "class": "esriCTStatisticLabel esriCTEllipsis",
        "title": assetLabel, "innerHTML": assetLabel
      }, assetWrapper);
      assetValueWrapper = domConstruct.create("div", {}, assetWrapper);
      new TextBox({
        value: assetStatValue,
        "class": "esriCTFullwidth esriCTEllipsis esriCTAssetDetailTextBox",
        "disabled": true
      }, assetValueWrapper);
    },

    /**
     * This function is to get layer names from layer Id
     * @memberOf widgets/CostAnalysis/Widget
     */
    _getLayerNames: function () {
      var operationalLayers;
      operationalLayers = this.map.itemInfo.itemData.operationalLayers;
      array.forEach(operationalLayers, lang.hitch(this, function (layer) {
        this._layerNamesObj[layer.id] = layer.title;
      }));
    },

    /**
     * This function is to get traverse assetItemSummary to calculate feature value
     * @memberOf widgets/CostAnalysis/Widget
     */
    _getFeatureValue: function (statisticAsset) {
      var templates, field, type;
      if (Object.keys(this.assetItemSummary).length > 0) {
        // calculate
        if (this.assetItemSummary[statisticAsset.id]) {
          templates = this.assetItemSummary[statisticAsset.id].templates;
          field = statisticAsset.field;
          type = statisticAsset.type;
          return this._calculateFeatureValue(templates, field, type);
        }
        else {
          return "0";
        }
      }
      else {
        return "0";
      }
    },

    /**
     * This function is to calculate feature value
     * @memberOf widgets/CostAnalysis/Widget
     */
    _calculateFeatureValue: function (templates, field, type) {
      switch (type) {
        case "count":
          return this._calculateCountOfFeatures(templates);
        case "area":
          return this._calculateAreaLengthOfFeatures(templates);
        case "length":
          return this._calculateAreaLengthOfFeatures(templates);
        case "avg":
          return this._calculateAvgSumOfFeatures(templates, field, type);
        case "sum":
          return this._calculateAvgSumOfFeatures(templates, field, type);
        case "max":
          return this._calculateMinMaxOfFeatures(templates, field, type);
        case "min":
          return this._calculateMinMaxOfFeatures(templates, field, type);
        case "default":
          return "";
      }
    },

    /**
     * This function is to calculate count of features added
     * @memberOf widgets/CostAnalysis/Widget
     */
    _calculateCountOfFeatures: function (templates) {
      var totalCount = 0;
      for (template in templates) {
        totalCount += templates[template].features.length;
      }
      return totalCount;
    },

    /**
     * This function is to loop templates for area / length of feature value
     * @memberOf widgets/CostAnalysis/Widget
     */
    _calculateAreaLengthOfFeatures: function (templates) {
      var totalAreaLengthOfFeature = 0;
      for (template in templates) {
        totalAreaLengthOfFeature += this._getFeatureDimension(templates[template]);
      }
      return totalAreaLengthOfFeature;
    },

    /**
     * This function is to sum area / length of feature value
     * @memberOf widgets/CostAnalysis/Widget
     */
    _getFeatureDimension: function (templateArray) {
      var totalFeatureDimension = 0;
      array.forEach(templateArray.features, function (feature) {
        totalFeatureDimension += feature.featureDimension;
      });
      return totalFeatureDimension;
    },

    /**
     * This function is to calculate avg / sum of feature value
     * @memberOf widgets/CostAnalysis/Widget
     */
    _calculateAvgSumOfFeatures: function (templates, field, type) {
      var featureSumCountObj = { total: 0, count: 0 };
      if (field === "") {
        return "";
      }
      for (template in templates) {
        featureSumCountObj.count += this._getSumAndCountOfFields(templates[template].features,
          field).count;
        featureSumCountObj.total += this._getSumAndCountOfFields(templates[template].features,
          field).total;
      }
      if (type === "avg") {
        return featureSumCountObj.total / featureSumCountObj.count;
      }
      else {
        return featureSumCountObj.total;
      }
    },

    /**
     * This function is to get area / length of feature value
     * @memberOf widgets/CostAnalysis/Widget
     */
    _getSumAndCountOfFields: function (templateFeatureArray, field) {
      var totalOfField = 0, featureCount = 0;
      array.forEach(templateFeatureArray, function (feature) {
        if (feature.attributes[field]) {
          totalOfField += feature.attributes[field];
          featureCount++;
        }
      });
      return { total: totalOfField, count: featureCount };
    },

    /**
     * This function is to calculate min / max of feature value
     * @memberOf widgets/CostAnalysis/Widget
     */
    _calculateMinMaxOfFeatures: function (templates, field, type) {
      if (field === "") {
        return "";
      }
      var fieldValuesArray, featureFieldValuesArray;
      fieldValuesArray = [];
      featureFieldValuesArray = [];
      for (template in templates) {
        fieldValuesArray = this._getFeatureAttributesArray(templates[template].features,
          field, featureFieldValuesArray);
      }
      if (type === "max") {
        return Math.max.apply(null, fieldValuesArray);
      }
      else {
        return Math.min.apply(null, fieldValuesArray);
      }
    },

    /**
    * This function is to get array of attribute feature value
    * @memberOf widgets/CostAnalysis/Widget
    */
    _getFeatureAttributesArray: function (templateFeatureArray, field, featureFieldValuesArray) {
      array.forEach(templateFeatureArray, function (feature) {
        if (feature.attributes[field]) {
          featureFieldValuesArray.push(feature.attributes[field]);
        }
        else {
          featureFieldValuesArray.push("");
        }
      });
      return featureFieldValuesArray;
    }
  });
});