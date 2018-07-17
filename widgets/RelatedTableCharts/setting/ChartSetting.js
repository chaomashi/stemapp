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
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/Evented',
    'dojo/text!./ChartSetting.html',
    'jimu/dijit/TabContainer3',
    './ChartThemeSelector',
    './FieldSelector',
    'jimu/dijit/ColorPicker',
    'dojo/dom-class',
    'dojo/query',
    'dojo/_base/Color',
    'dojo/_base/array',
    'esri/tasks/query',
    'esri/tasks/QueryTask',
    'dojo/dom-style',
    'jimu/dijit/Message',
    '../ChartLayout',
    'dijit/popup',
    'dojox/charting/themes/GreySkies',
    'jimu/dijit/SimpleTable',
    'jimu/utils',
    'jimu/dijit/Popup',
    'dijit/_editor/plugins/LinkDialog',
    'dijit/_editor/plugins/ViewSource',
    'dijit/_editor/plugins/FontChoice',
    'dojox/editor/plugins/Preview',
    'dijit/_editor/plugins/TextColor',
    'dojox/editor/plugins/ToolbarLineBreak',
    'dojox/editor/plugins/FindReplace',
    'dojox/editor/plugins/PasteFromWord',
    'dojox/editor/plugins/InsertAnchor',
    'dojox/editor/plugins/Blockquote',
    'dojox/editor/plugins/UploadImage',
    'jimu/dijit/CheckBox',
    'jimu/dijit/EditorTextColor',
    'jimu/dijit/EditorBackgroundColor'
  ],
  function (_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, domAttr,
    domConstruct, declare, lang, on, Evented, template, TabContainer3,
    ChartThemeSelector, FieldSelector, ColorPicker, domClass,
    dojoQuery, Color, array, Query, QueryTask, domStyle, Message, ChartLayout,
    popup, GreySkiesTheme, SimpleTable, utils, Popup) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {

      baseClass: 'jimu-widget-RelatedTableCharts-setting',
      templateString: template,

      _widgets: [],
      _stringFieldType: 'esriFieldTypeString',
      _oidFieldType: 'esriFieldTypeOID',
      _numberFieldTypes: ['esriFieldTypeSmallInteger',
        'esriFieldTypeInteger',
        'esriFieldTypeSingle',
        'esriFieldTypeDouble'
      ],
      tr: null,
      layerDetails: null,
      config: {},
      _chartColorType: {
        singleColor: "SingleColor",
        byThemeColor: "ColorByTheme",
        byFieldValue: "ColorByFieldValue"
      },
      selectedNode: null, //to store selected node from the table
      fieldColorPicker: null, //to store the instance of color picker
      defaultColor: "#000000", //to set default color in color picker
      _editor: null, //to contain editor instance
      _displayFieldsTable: null, //to contain fields table fro polar graph
      constructor: function () {
        //reinitialize array
        this._widgets = [];
      },
      startup: function () {
        this.inherited(arguments);
      },

      postCreate: function () {
        this._createColorByFieldTable();
        this._initSelf();
        this._initChartDescInput();
      },

      destroy: function () {
        this.tr = null;
        delete this.tr;
        // destroy all widgets
        array.forEach(this._widgets, function (w) {
          w.destroy();
        });
        this._widgets = [];
        this.inherited(arguments);
      },

      /**
      * this function returns the new configured settings for ElectionResult widget
      * @param {boolean} showError
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      getConfig: function (showError) {
        var config = {
          sectionTitle: '',
          chartTitle: '',
          description: '',
          chartType: '',
          dataSeriesField: '',
          labelField: '',
          chartColor: {},
          labelXAxis: '',
          labelYAxis: ''
        };
        // validate if section title is not empty
        if (showError && this.sectionTitleTextBox.get('value') === "") {
          this._errorMessage(this.nls.errMsgSectionTitle);
          return false;
        } else {
          config.sectionTitle = this.sectionTitleTextBox.get('value');
        }
        config.chartTitle = this.chartTitleTextBox.get('value');
        config.description = this.chartDescriptionInput.value;
        config.chartType = this._getChartType();
        // validate if color by field value is not empty
        if (showError && this.rdoColorByFieldValue.checked && this.ColorByFieldValueDropdown
          .value === "esriCTEmptyOption") {
          this._errorMessage(this.nls.errMsgFieldByValue);
          return false;
        } else {
          config.chartColor = lang.clone(this._getChartColorConfig());
        }
        if (config.chartType !== "PolarChart") {
          config.dataSeriesField = this.dataSeriesFieldDropdown.get(
          'value');
          config.labelField = this.labelSeriesFieldDropdown.get('value');

          config.labelXAxis = this.xAxisTextBox.get('value');
          config.labelYAxis = this.yAxisTextBox.get('value');
        } else {
          var field, fieldInfos = {}, i, count = 0, data;
          data = this._displayFieldsTable.getData();
          config.polarChartConfig = {};
          for (i = 0; i < data.length; i++) {
            field = {};
            if (data[i].isVisible) {
              field.fieldName = data[i].fieldName;
              field.alias = data[i].alias;
              field.isVisible = data[i].isVisible;
              fieldInfos[data[i].fieldName] = field;
              count++;
            }
          }
          if (count < 3) {
            this._errorMessage(this.nls.errMsgPolarFieldsRequired);
            return false;
          }
          config.showPolygonFill = this.polarChartFillColor.getValue();
          config.polarChartConfig = fieldInfos;
        }
        return config;
      },

      /**
      * this function sets setting UI of different field values
      * @param {string} config contains the previously set configuration
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      setConfig: function (config) {
        // this.textNode.value = config.configText;
        if (config) {
          //set section title in textbox if configured else set the polygon layer name as section title
          if (config.sectionTitle && config.sectionTitle !== '') {
            this.sectionTitleTextBox.set('value', config.sectionTitle);
          } else {
            this.sectionTitleTextBox.set("value", this.layerDetails.polygonLayerInfo
              .title);
          }

          //set chart title in textbox
          if (config.chartTitle) {
            this.chartTitleTextBox.set('value', config.chartTitle);
          }

          //set description
          if (config.description) {
            var desc;
            desc = config.description.replace(/&quot;/g, '');
            this.chartDescriptionInput.value = utils.stripHTML(desc);
          }

          //set chart type if available else set default chart type to bar chart
          if (config.chartType) {
            this._setChartType(config.chartType);
          } else {
            this._setChartType("BarChart");
          }

          //set dataseriesfield in dropdown
          if (config.dataSeriesField) {
            this.dataSeriesFieldDropdown.set('value', config.dataSeriesField);
          }

          //set labelfield in dropdown
          if (config.labelField) {
            this.labelSeriesFieldDropdown.set('value', config.labelField);
          }

          //set chart type and color
          if (config.chartColor) {
            this._setChartColorType(config.chartColor, config.chartType);
          }

          // set polygon fill visibility
          this.polarChartFillColor.setValue(config.showPolygonFill);

          //set x-axis label of the chart
          if (config.labelXAxis) {
            this.xAxisTextBox.set('value', config.labelXAxis);
          }
          //set y-axis label of the chart
          if (config.labelYAxis) {
            this.yAxisTextBox.set('value', config.labelYAxis);
          }
          this._onChartTypeChanged();
        } else {
          //by default set layer title in section title textbox
          this.sectionTitleTextBox.set("value", this.layerDetails.polygonLayerInfo
            .title);
        }
      },

      /**create table to display color picker and configured field value
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _createColorByFieldTable: function () {
        //create fields object for table
        var tableFields = [{
          name: this.nls.fieldColorColor,
          title: this.nls.fieldColorColor,
          "class": "label",
          type: "empty",
          width: "60px"
        }, {
          name: this.nls.fieldColorLabel,
          title: this.nls.fieldColorLabel,
          "class": "label",
          type: "empty"
        }];

        //initialize table to display configure field's distinct values with color picker
        this.colorByFieldTable = new SimpleTable({
          fields: tableFields
        }, this.colorByFieldTablePanel);
        this.colorByFieldTable.startup();
      },
      /**
      * This function create error alert.
      * @param {string} err contains error message
      * @memberOf widgets/RelatedTableCharts/settings/ChartSetting
      **/
      _errorMessage: function (err) {
        var errorMessage = new Message({
          message: err
        });
        errorMessage.message = err;
      },

      /**
      * This function returns selected chart type
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _getChartType: function () {
        var chartType;
        //return selected chart type
        if (this.rdoBarChart.get('checked')) {
          chartType = "BarChart";
        } else if (this.rdoPieChart.get('checked')) {
          chartType = "PieChart";
        } else if (this.rdoPolarChart.get('checked')) {
          chartType = "PolarChart";
        }
        return chartType;
      },

      /**
      * This function returns set the selected chart type
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _setChartType: function (chartType) {
        if (chartType === "BarChart") {
          this.rdoBarChart.set('checked', true);
        } else if (chartType === "PieChart") {
          this.rdoPieChart.set('checked', true);
        } else {
          this.rdoPolarChart.set('checked', true);
        }
      },

      /**
      * This function initializes the chartSetting widget components
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _initSelf: function () {
        //set default value for single color picker
        this.colorPicker.setColor(new Color(this.defaultColor));
        //init field selectors for selecting fields to be shown in labels/title/description etc.
        this._initFieldSelectors();

        //Create options to be shown in data field (numeric fields from related table will be shown)
        this._createRelatedLayerFieldOptions(this.dataSeriesFieldDropdown,
          false, this._numberFieldTypes);
        //Create options to be shown in label field (all fields from related table will be shown, with select option)
        this._createRelatedLayerFieldOptions(this.labelSeriesFieldDropdown,
          true, null);
        //create color picker to set the color of table node
        this._createFieldColorPicker();
        //create chart theme selector
        if (!this.chartThemeSelector) {
          this.chartThemeSelector = this._createThemeSelector(this.themeSelectorDiv);
        }
        // check radio buttons on selecting controls
        on(this.colorPicker, "click", lang.hitch(this, function () {
          this.rdoSingleColor.set("checked", true);
        }));
        on(this.themeSelectorDiv, "click", lang.hitch(this, function () {
          this.rdoColorByTheme.set("checked", true);
        }));
        on(this.ColorByFieldValueDropdown, "click", lang.hitch(this, function () {
          this.rdoColorByFieldValue.set("checked", true);
        }));
        //show color by field option only if layer support distinct query
        if (this.layerDetails.polygonLayerInfo.supportsDistinct) {
          domClass.remove(this.colorByFieldContainer, "esriCTHidden");
          //create options for dropdown ColorByFields
          this._createColorByFieldSelector();
        }
        this._createPolarChartFieldsGrid();
      },

      /**
      * create table for polar chart fields
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _createPolarChartFieldsGrid: function () {
        var args, fields = [{
          name: 'isVisible',
          title: this.nls.visibilityText,
          type: 'checkbox',
          'class': 'update',
          width: '100px'
        }, {
          name: 'fieldName',
          title: this.nls.fieldNameText,
          type: 'text',
          width: '230px'
        }, {
          name: 'alias',
          title: this.nls.aliasNameText,
          type: 'text',
          editable: 'true',
          width: '230px'
        }];
        args = {
          fields: fields,
          selectable: false
        };
        this._displayFieldsTable = new SimpleTable(args);
        this._displayFieldsTable.placeAt(this.polarChartFieldInfos);
        this._displayFieldsTable.startup();
        this._createFieldsRows();
      },

      /**
      * create rows for polar chart fields in table
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _createFieldsRows: function () {
        var fieldsArray, polarChartConfig, i, isVisible = "", aliasName = "";
        fieldsArray = this.layerDetails.relatedLayerInfo.fields;
        polarChartConfig = this.config && this.config.polarChartConfig;
        for (i = 0; i < fieldsArray.length; i++) {
          if (this._numberFieldTypes.indexOf(fieldsArray[i].type) !== -1) {
            if (polarChartConfig && polarChartConfig.hasOwnProperty(fieldsArray[i].name)) {
              isVisible = polarChartConfig[fieldsArray[i].name].isVisible;
              aliasName = polarChartConfig[fieldsArray[i].name].alias;
            } else {
              isVisible = fieldsArray[i].isVisible;
              aliasName = fieldsArray[i].alias;
            }
            this._displayFieldsTable.addRow({
              isVisible: (isVisible === "") ? false : isVisible,
              fieldName: fieldsArray[i].name,
              alias: (aliasName === "") ? fieldsArray[i].name : aliasName
            });
          }
        }
      },

      /**
     * Creates a color picker popup
     * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
     **/
      _createFieldColorPicker: function () {
        //initialize color picker
        this.fieldColorPicker = new ColorPicker();
        this.fieldColorPicker.startup();
        //on closing color picker dialog deselect selected rows
        on(this.fieldColorPicker.tooltipDialog, "close", lang.hitch(this, function () {
          var trs;
          if (domClass.contains(this.selectedNode.parentElement.parentElement,
                "jimu-state-active")) {
            trs = dojoQuery('.jimu-state-active', this.colorByFieldTableContainer);
            if (trs.length > 0) {
              trs.removeClass('jimu-state-active');
            }
          }
        }));
        on(this.fieldColorPicker, "change", lang.hitch(this, function () {
          var tableRows, selectedColor = this.fieldColorPicker.color.toHex();
          //get all selected rows from table
          tableRows = dojoQuery('.jimu-state-active .fieldColorPicker',
            this.colorByFieldTableContainer);
          //check whether any row is selected
          if (tableRows.length > 0) {
            //check if selected node's row is selected
            if (domClass.contains(this.selectedNode.parentElement.parentElement,
                "jimu-state-active")) {
              array.forEach(tableRows, lang.hitch(this, function (node) {
                //set the color to the selected row's div
                domStyle.set(node, "backgroundColor", selectedColor);
                domAttr.set(node.parentElement.parentElement,
                  "field_Color", selectedColor);
              }));
            } else {
              //if no row is selected then set the color to the selected div
              domStyle.set(this.selectedNode, "backgroundColor",
                selectedColor);
              domAttr.set(this.selectedNode.parentElement.parentElement,
                "field_Color", selectedColor);
            }
          } else {
            //if no row is selected then set the color to the selected div
            domStyle.set(this.selectedNode, "backgroundColor",
              selectedColor);
            domAttr.set(this.selectedNode.parentElement.parentElement,
              "field_Color", selectedColor);
          }
        }));
      },

      /**
      * disable/enable polygon fill checkbox on changing chart color option
      * show/hide field values on changing chart color option
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _onChartColorChanged: function () {
        if (this.rdoColorByFieldValue.get('checked')) {
          //show field values if any option is selected in dropdown
          if (this.ColorByFieldValueDropdown.value !== "esriCTEmptyOption") {
            domClass.remove(this.colorByFieldTableContainer,
              "esriCTHidden");
          }
          //enable check box
          this.polarChartFillColor.setStatus(true);
        } else {
          //disable checkbox if chart theme is selected
          if (this.rdoColorByTheme.get('checked')) {
            //disable check box and set it to true
            this.polarChartFillColor.check();
            this.polarChartFillColor.setStatus(false);
          } else {
            this.polarChartFillColor.setStatus(true);
          }
          //hide field values if color by field option is not selected
          domClass.add(this.colorByFieldTableContainer,
            "esriCTHidden");
        }
      },

      /**
      * This function sets selected colors to the field color div
      * @param{string} config chart color by field value is saved in the configuration file
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _setChartColorType: function (config) {
        // if chart color value available and also chart color type is given
        if (config && config.colorType) {
          this.rdoSingleColor.set('checked', false);
          // if chart color type is SingleColor
          if (config.colorType === this._chartColorType.singleColor) {
            this.rdoSingleColor.set('checked', true);
            this.colorPicker.setColor(new Color(config.colorInfo));
          } else if (config.colorType === this._chartColorType.byThemeColor) {
            // if chart color type is ColorByTheme
            this.rdoColorByTheme.set('checked', true);
            //If color by type is theme then set the selected theme in theme selector widget
            if (this.config.chartColor && this.config.chartColor.colorType ===
              this._chartColorType.byThemeColor && this.chartThemeSelector
            ) {
              setTimeout(lang.hitch(this, function () {
                this.chartThemeSelector.selectTheme(config.colorInfo);
              }), 500);
            }
          } else if (config.colorType === this._chartColorType.byFieldValue) {
            // if chart color type is ColorByFieldValue
            this.rdoColorByFieldValue.set('checked', true);
            this.ColorByFieldValueDropdown.set("value", config.colorInfo
              .layerField);
            domClass.remove(this.colorByFieldTableContainer,
              "esriCTHidden");
          }
        }
      },

      /**
      * This function the initializes jimu tab for setting and layout
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _initTabs: function () {
        var tabSettings, tabPreview, tabs;
        //create object to display chart setting in tab container
        tabSettings = {
          title: this.nls.settingTabTitle,
          content: this.settingsTabNode
        };
        //create object to display chart preview in tab container
        tabPreview = {
          title: this.nls.layoutTabTitle,
          content: this.layoutTabNode
        };

        tabs = [tabSettings, tabPreview];
        this.tab = new TabContainer3({
          tabs: tabs
        });
        this.tab.placeAt(this.tabDiv);
        this.own(on(this.tab, 'tabChanged', lang.hitch(this, function (
          title) {
          //show updated charts with updated configuration
          if (title === tabPreview.title) {
            this._updatePreview();
          }
        })));
      },

      /**
      * This function the updates the chart layout(preview)
      * according to the newly set settings different parameters
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _updatePreview: function () {
        var chartDetails, chartLayoutObj, chartpopup;
        chartDetails = { "chartConfig": this.getConfig(), "isPreview": true };
        //check if valid chart settings then only update preview
        if (chartDetails.chartConfig) {
          //if any label is not selected then set the value to empty string
          if (chartDetails.chartConfig.labelField === "esriCTEmptyOption") {
            chartDetails.chartConfig.labelField = " ";
          }
          //get static data for preview
          chartDetails.chartData = this._createStaticDataForLayout(
            chartDetails.chartConfig.chartType,
            chartDetails.chartConfig.labelField,
            chartDetails.chartConfig.dataSeriesField
          );
          chartLayoutObj = new ChartLayout({
            config: chartDetails
          });
          chartLayoutObj.startup();
          chartpopup = new Popup({
            titleLabel: this.nls.viewLayoutLabel,
            width: 800,
            height: 450,
            content: chartLayoutObj
          });
        }
      },

      /**
      * This function creates static data for the layout(preview) chart
      * @param {string} : chartType (BarChart, PieChart, PolarChart)
      * @param {string} : labelField
      * @param {string} : dataSeriesField
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _createStaticDataForLayout: function (chartType, labelField, dataSeriesField) {
        var chartData = { chartSeries: [], chartLabels: [], selectedTheme: GreySkiesTheme };
        switch (chartType) {
          case "BarChart":
            chartData.chartSeries = [
              { "y": 65 },
              { "y": 35 },
              { "y": 40 },
              { "y": 55 },
              { "y": 50 }
            ];
            chartData.chartLabels = [
              { "value": 1, "y": 65, "text": "" },
              { "value": 2, "y": 35, "text": "" },
              { "value": 3, "y": 40, "text": "" },
              { "value": 4, "y": 55, "text": "" },
              { "value": 5, "y": 50, "text": "" }
            ];
            chartData.fill = "#7989a0";
            break;
          case "PieChart":
            chartData.chartSeries = [
              { "y": 65, "text": "{" + dataSeriesField + " %}" },
              { "y": 35, "text": "{" + labelField + "}" }
            ];
            chartData.chartLabels = [{ "value": 1, "y": 65 }, { "value": 2, "y": 35}];
            break;
          case "PolarChart":
            var i, j, value = 10, dataObj, data = this._displayFieldsTable.getData(), obj;
            chartData.chartSeries = [];
            for (j = 0; j < 5; j++) {
              dataObj = {};
              obj = {};
              for (i = 0; i < data.length; i++) {
                if (data[i].isVisible) {
                  dataObj[data[i].alias] = value + 10;
                }
              }
              obj[j] = { "data": dataObj };
              chartData.chartSeries.push(obj);
            }
            break;
        }
        return chartData;
      },


      /**
      * This function the updates the chart layout preview
      * according to the newly set settings different parameters
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _initFieldSelectors: function () {
        //create titleFieldSelector
        this._createFieldSelector(this.titleFieldSelectorDiv, this.chartTitleTextBox,
          this.layerDetails.polygonLayerInfo.fields);

        //create descriptionFieldSelector
        this._createFieldSelector(this.descriptionFieldSelectorDiv, this.chartDescriptionInput,
          this.layerDetails.polygonLayerInfo.fields);

        //create x-axis label field selector
        this._createFieldSelector(this.xAxisFieldSelectorDiv, this
          .xAxisTextBox, this.layerDetails.polygonLayerInfo.fields
        );

        //create y-axis label field selector
        this._createFieldSelector(this.yAxisFieldSelectorDiv,
          this.yAxisTextBox, this.layerDetails.polygonLayerInfo
          .fields);

      },

      /**
      * This function the creates FieldSelector for respective fields
      * @param {string} container FieldSelector container Node
      * @param {string} textNode FieldSelector text content Node
      * @param {array} fieldsArray array of field selector values
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _createFieldSelector: function (container, textNode, fieldsArray) {
        var fieldSelector = new FieldSelector({
          "fields": fieldsArray,
          "showOnlyNumericFields": false,
          "hideOnSelect": true
        }, domConstruct.create("div", {}, container));
        fieldSelector.onSelect = lang.hitch(this, function (sectedField) {
          var newLabel;
          newLabel = domAttr.get(textNode, "value") + "{" + sectedField.name + "}";
          if (textNode.set) {
            textNode.set("value", newLabel);
          } else {
            domAttr.set(textNode, "value", newLabel);
          }
        });
        //add to the widgets array
        this._widgets.push(fieldSelector);
        return fieldSelector;
      },

      /**
      * This function the creates ThemeSelector
      * @param {string} container node where theme selector created
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _createThemeSelector: function (container) {
        var themSelectorObj = new ChartThemeSelector({
          "nls": this.nls
        }, domConstruct.create("div", {}, container));
        //add to the widgets array
        this._widgets.push(themSelectorObj);
        themSelectorObj.startup();
        return themSelectorObj;
      },

      /* Events */
      _onSectionTitleChanged: function () {
        this.emit('sectionTitleChanged', this.sectionTitleTextBox.get(
          'value'));
      },

      showMainLoadingIndicator: function () {
        this.emit("showLoadingIndicator");
      },

      hideMainLoadingIndicator: function () {
        this.emit("hideLoadingIndicator");
      },

      _onChartTypeChanged: function () {
        if (this.rdoPolarChart.get('checked')) {
          //display polar chart configuration setting and hide other charts setting
          domClass.add(this.labelSection, "esriCTHidden");
          domClass.add(this.axisSection, "esriCTHidden");
          domClass.remove(this.polarChartSection, "esriCTHidden");
        } else {
          //hide polar chart configuration setting and display other charts setting
          domClass.remove(this.labelSection, "esriCTHidden");
          domClass.add(this.polarChartSection, "esriCTHidden");
          if (this.rdoPieChart.get('checked')) {
            domClass.add(this.axisSection, "esriCTHidden");
          } else {
            domClass.remove(this.axisSection, "esriCTHidden");
          }
        }
      },

      /* Color by field value code*/

      /**
      * This function the creates Related Layer Field Options
      * @param {string} dropDown node where Field drop down created
      * @param {boolean} addFirstValueAsSelect flag value which decides default option
      * @param {array} showFieldsArray array of integer data types
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _createRelatedLayerFieldOptions: function (dropDown,
        addFirstValueAsSelect, showFieldsArray) {
        var option = {},
          fieldsArray, addField, i;
        fieldsArray = this.layerDetails.relatedLayerInfo.fields;
        if (fieldsArray && fieldsArray.length > 0) {
          if (addFirstValueAsSelect) {
            dropDown.addOption({
              value: "esriCTEmptyOption",
              label: this.nls.defaultFieldSelectLabel,
              selected: true
            });
          }
          for (i = 0; i < fieldsArray.length; i++) {
            addField = true;
            if (showFieldsArray && showFieldsArray.indexOf(fieldsArray[
                i].type) <
              0) {
              addField = false;
            }
            if (addField) {
              option = {
                value: fieldsArray[i].name,
                label: fieldsArray[i].name,
                selected: false
              };
              // by default show first field as selected
              if (i === 0 && !addFirstValueAsSelect) {
                option.selected = true;
              }
              dropDown.addOption(option);
            }
          }
        }
      },

      /**
      * This function populates options in layer Field Drop Down
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _createColorByFieldSelector: function () {
        this._createRelatedLayerFieldOptions(this.ColorByFieldValueDropdown,
          true);
        // binding on change event on drop down value change
        on(this.ColorByFieldValueDropdown, "change", lang.hitch(this,
          function (selectedField) {
            this.showMainLoadingIndicator();
            // if default select is selected then remove all the rows from the color picker table
            if (selectedField === "esriCTEmptyOption") {
              this._removeTableRows();
              domClass.add(this.colorByFieldTableContainer,
                "esriCTHidden");
              this.hideMainLoadingIndicator();
            } else {
              this._getDistintValueForLayerField(selectedField);
            }
          }));
      },

      /**
      * This function creates field color table for setting
      * different colors for fields
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _getDistintValueForLayerField: function (selectedField) {
        var queryTaskValue, queryField;
        this._selectedUniqueValues = [];
        queryTaskValue = new QueryTask(this.layerDetails.relatedLayerInfo.url);
        queryField = new Query();
        queryField.where = "1=1";
        queryField.returnDistinctValues = true;
        queryField.returnGeometry = false;
        queryField.outFields = [selectedField];
        queryTaskValue.execute(queryField, lang.hitch(this, function (
          response) {
          var selectedFieldDetails;
          //push selected attributes's value of all the features into an array
          array.forEach(response.features, lang.hitch(this, function (feature) {
            this._selectedUniqueValues.push(feature.attributes[selectedField]);
          }));
          if (this._selectedUniqueValues.length > 0 && response.fields && response.fields
                .length > 0 && response.fields[0].type) {
            // get the fieldTypeof selected fields
            selectedFieldDetails = lang.clone(response.fields[0]);
            // Sort data in ascending order based on the dataType
            if (this._selectedUniqueValues.length > 1) {
              this._sortUniqueValueData(selectedFieldDetails.type);
            }
            //create table rows for distinct value of the layer field
            this._createTableRows(selectedFieldDetails);
          } else {
            this._errorMessage(this.nls.errMsgFieldValuesNotFound);
            this.hideMainLoadingIndicator();
          }
        }), lang.hitch(this, function () {
          this._errorMessage(this.nls.errMsgFieldValuesNotFound);
          this.hideMainLoadingIndicator();
        }));
      },

      /**
      * This function removes all the rows from the table
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _removeTableRows: function () {
        var rows, i;
        // loop for creating rows for fields available in the layer
        rows = this.colorByFieldTable.getRows();
        if (rows && rows.length > 0) {
          // loop for deleting all the rows if already exist for different field value
          for (i = 0; i < rows.length; i++) {
            this.colorByFieldTable.deleteRow(rows[i]);
          }
        }
      },

      /**
      * This function creates field color table for setting
      * different colors for fields
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _createTableRows: function (selectedFieldDetails) {
        var tr, tds;
        this._removeTableRows();
        domClass.remove(this.colorByFieldTableContainer, "esriCTHidden");
        // if unique values array for the field is available
        array.forEach(this._selectedUniqueValues, lang.hitch(this, function (selectedValue) {
          var result, displayValue;
          result = this.colorByFieldTable.addRow({});
          displayValue = selectedValue;
          // if row is created successfully and tr is exist
          if (result.success && result.tr) {
            //Update display lable based on data type and domain
            if (selectedFieldDetails.type === "esriFieldTypeDate") {
              displayValue = this._getLocaleFormatedDate(selectedValue);
            }
            tr = result.tr;
            //query for all columns of created row
            tds = dojoQuery('.simple-table-cell', tr);
            // creates color picker for the field value row
            this._createColorPicker(tr, selectedValue, tds[0]);

            // creates label for the field value row
            this._createLabelFields(displayValue, tds[1]);
          }
          if (tr) {
            on(tr, "click", lang.hitch(this, function (e) {
              this._toggleRowSelection(e.currentTarget);
            }));
          }
        }));
        this.hideMainLoadingIndicator();
      },

      /**
      * This function select and de select the color by field values from table rows
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _toggleRowSelection: function (tr) {
        if (!domClass.contains(tr, "jimu-state-active")) {
          domClass.add(tr, 'jimu-state-active');
        } else {
          domClass.remove(tr, 'jimu-state-active');
        }
      },

      /**
      * This function create field label DOM for every fields in table row
      * {string} value distinct value of layer Field
      * {object} td column field
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _createLabelFields: function (value, td) {
        var fields;
        fields = domConstruct.create("label", {
          "innerHTML": value,
          "title": value
        }, td);
      },

      /**
      * This function create field color div for every fields in table row
      * sets the default color or previously saved color from this.config
      * @param {object} tr instance of created row and
      * @param {string} value distinct value of layer Field
      * @param {object} td instance of created column
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _createColorPicker: function (tr, value, td) {
        var fieldColorNode, color;
        fieldColorNode = domConstruct.create("div", { "class": "fieldColorPicker" }, td);
        //check whether current value is configured with color
        if (this.config && this.config.chartColor && this.config.chartColor.colorInfo &&
          this.config.chartColor.colorInfo.layerFieldValues && this.config.chartColor
          .colorInfo.layerFieldValues[value]) {
          color = this.config.chartColor.colorInfo.layerFieldValues[value];
        } else {
          color = this.defaultColor;
        }
        domStyle.set(fieldColorNode, "backgroundColor", color);
        domAttr.set(tr, "fieldVal", value);
        domAttr.set(tr, "field_Color", color);
        on(fieldColorNode, "click", lang.hitch(this, function (event) {
          event.stopPropagation();
          event.preventDefault();
          this.selectedNode = event.currentTarget;
          //set selected node's current color in color picker
          var nodeColor = domAttr.get(this.selectedNode.parentElement.parentElement, "field_Color");
          this.fieldColorPicker.setColor(new Color(nodeColor));
          //set the color of the picker
          this.fieldColorPicker.picker.setColor(new Color(nodeColor).toHex(), true);
          //display color picker popup
          popup.open({
            popup: this.fieldColorPicker.tooltipDialog,
            around: event.currentTarget
          });
        }));
      },

      /**
      * This function gets color of field values
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _getColorByFieldValue: function () {
        var i, getColorOfFieldsDistinctValue = {}, distinctValueArr = {}, trs;
        //get all the rows from color by Field table list
        trs = this.colorByFieldTable.getRows();
        //iterates through all the rows and get value name and configured color for value,
        //and push into distinctValueArr array
        for (i = 0; i < trs.length; i++) {
          distinctValueArr[domAttr.get(trs[i], "fieldVal")] = domAttr.get(trs[i], "field_Color");
        }
        getColorOfFieldsDistinctValue.layerFieldValues = distinctValueArr;
        getColorOfFieldsDistinctValue.layerField = this.ColorByFieldValueDropdown.value;
        return getColorOfFieldsDistinctValue;
      },

      /**
      * This function returns selected chart color type and its color information
      * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
      **/
      _getChartColorConfig: function () {
        var chartColor = {};
        //if single color is selected
        if (this.rdoSingleColor.checked) {
          chartColor.colorType = this._chartColorType.singleColor;
          chartColor.colorInfo = this.colorPicker.getColor().toHex();
        } else if (this.rdoColorByTheme.checked) {
          //if color by theme is selected
          chartColor.colorType = this._chartColorType.byThemeColor;
          chartColor.colorInfo = this.chartThemeSelector.selectedTheme;
        } else if (this.rdoColorByFieldValue.checked) {
          //if color by Fields distinct value
          chartColor.colorType = this._chartColorType.byFieldValue;
          chartColor.colorInfo = this._getColorByFieldValue();
        }
        return chartColor;
      },

      /**
      * This function sort the list for chart color by field value
      * @param {string} data type of selected field value
      * @memberOf widgets/RelatedTableCharts/setting/settings
      **/
      _sortUniqueValueData: function (dataType) {
        if (dataType === "esriFieldTypeString") {
          // if data is of string type
          this._selectedUniqueValues.sort();
        } else {
          // if data is of numeric type
          this._selectedUniqueValues.sort(lang.hitch(this, function (a,
              b) {
            return a - b;
          }));
        }
      },

      /**
      * This function return a locale date value
      * @param {number} UTC date format value
      * @memberOf widgets/RelatedTableCharts/setting/settings
      **/
      _getLocaleFormatedDate: function (dateFieldValue) {
        var dateValue = new Date(dateFieldValue);
        return dateValue.toLocaleDateString();
      },
      /*Code for color by field value ends here*/

      /**
      * This function to dynamically change height of description textarea
      * @memberOf widgets/RelatedTableCharts/setting/settings
      **/
      _initChartDescInput: function(){
        //updates the size of text area as user enters any text in it
        this.own(on(this.chartDescriptionInput, "keydown, change", lang.hitch(this, function () {
          this.chartDescriptionInput.style.height = 'auto';
          this.chartDescriptionInput.style.height = this.chartDescriptionInput.scrollHeight + 'px';
        })));
      }
    });
  });