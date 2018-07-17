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
/*global define*/
define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/dom-construct',
  'dojo/on',
  'dojo/dom-class',
  'dojo/topic',
  'dojo/string',
  'dojo/mouse',
  'dojo/keys',
  'dojo/number',
  'dijit/registry',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/TooltipDialog',
  'dijit/popup',
  'dijit/form/NumberTextBox',
  'jimu/dijit/Message',
  'jimu/dijit/SimpleTable',
  'jimu/LayerInfos/LayerInfos',
  'jimu/utils',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!../templates/TabRange.html',
  'esri/geometry/Circle',
  'esri/geometry/Polyline',
  'esri/geometry/geometryEngine',
  'esri/graphic',
  'esri/layers/FeatureLayer',
  'esri/layers/LabelClass',
  'esri/tasks/FeatureSet',
  'esri/symbols/TextSymbol',
  'esri/symbols/SimpleFillSymbol',
  'esri/symbols/SimpleLineSymbol',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/geometry/webMercatorUtils',
  '../views/CoordinateInput',
  '../views/EditOutputCoordinate',
  '../models/RangeRingFeedback',
  'dijit/form/Select',
  'jimu/dijit/CheckBox'
], function (
  dojoDeclare,
  dojoLang,
  dojoArray,
  domConstruct,
  dojoOn,
  dojoDomClass,
  dojoTopic,
  dojoString,
  dojoMouse,
  dojoKeys,
  dojoNumber,
  dijitRegistry,
  dijitWidgetBase,
  dijitTemplatedMixin,
  DijitTooltipDialog,
  DijitPopup,
  NumberTextBox,
  Message,
  SimpleTable,
  jimuLayerInfos,
  jimuUtils,
  dijitWidgetsInTemplate,
  templateStr,
  EsriCircle,
  EsriPolyline,
  EsriGeometryEngine,
  EsriGraphic,
  EsriFeatureLayer,
  EsriLabelClass,
  EsriFeatureSet,
  EsriTextSymbol,
  EsriSimpleFillSymbol,
  EsriSimpleLineSymbol,
  EsriSimpleMarkerSymbol,
  EsriWMUtils,
  CoordInput,
  EditOutputCoordinate,
  DrawFeedBack
) {
  'use strict';
  return dojoDeclare([dijitWidgetBase, dijitTemplatedMixin, dijitWidgetsInTemplate], {
      templateString: templateStr,
      baseClass: 'jimu-widget-TabRange',

      startPoint: null,
      firstDistance: true,

      _setStartPointAttr: function () {
        this._set('startPoint');
      },
      _getStartPointAttr: function () {
        return this.startPoint;
      },

      /*
       * class constructor
       */
      constructor: function (args) {
        dojoDeclare.safeMixin(this, args);
      },

      /*
       * dijit post create
       */
      postCreate: function () {
        this._ptSym = new EsriSimpleMarkerSymbol(this.pointSymbol);
        this._circleSym = new EsriSimpleFillSymbol(this.circleSymbol);
        this._lineSym = new EsriSimpleLineSymbol(this.lineSymbol);
        this._labelSym = new EsriTextSymbol(this.labelSymbol);

        this.map.addLayer(this.getLayer());

        this._initDistanceTable();

        //must ensure the layer is loaded before we can access it to turn on the labels
        if (this._gl.loaded) {
          var featureLayerInfo =
            jimuLayerInfos.getInstanceSync().getLayerInfoById('Distance & Direction - Range Graphics');
          featureLayerInfo.showLabels();
          featureLayerInfo.enablePopup();
        } else {
          this._gl.on("load", dojoLang.hitch(this, function () {
            var featureLayerInfo =
              jimuLayerInfos.getInstanceSync().getLayerInfoById('Distance & Direction - Range Graphics');
            featureLayerInfo.showLabels();
            featureLayerInfo.enablePopup();
          }));
        }

        this.coordTool = new CoordInput({ appConfig: this.appConfig, nls: this.nls }, this.rangeCenter);

        this.coordTool.inputCoordinate.formatType = 'DD';

        this.coordinateFormat = new DijitTooltipDialog({
          content: new EditOutputCoordinate({ nls: this.nls }),
          style: 'width: 400px'
        });

        if (this.appConfig.theme.name === 'DartTheme') {
          dojoDomClass.add(this.coordinateFormat.domNode, 'dartThemeClaroDijitTooltipContainerOverride');
        }

        // add extended toolbar
        this.dt = new DrawFeedBack({
          map: this.map,
          coordTool: this.coordTool.inputCoordinate.util,
          nls: this.nls
        });
        this.dt.setFillSymbol(this._circleSym);
        this.dt.set('lengthLayer', this._lengthLayer);

        this.syncEvents();

        this._distanceTable.addRow({});

        this.checkValidInputs();

        this.numRingsInput.invalidMessage = this.nls.ringsErrorMessage;
        this.numRingsInput.rangeMessage = this.nls.ringsErrorMessage;

        this.numRadialsInput.invalidMessage = this.nls.radialsErrorMessage;
        this.numRadialsInput.rangeMessage = this.nls.radialsErrorMessage;
      },

      _initDistanceTable: function () {
        var fields = [{
          name: 'Value',
          title: this.nls.valueLabel,
          type: 'extension',
          'class': 'label',
          create: dojoLang.hitch(this, this._createValueField),
          getValue: dojoLang.hitch(this, this._getValueFieldValue)
        }, {
          name: 'actions',
          title: this.nls.actionLabel,
          width: "65px",
          type: 'actions',
          actions: ['up', 'down', 'delete'],
          'class': 'label'
        }];
        this._distanceTable = new SimpleTable({
          fields: fields,
          autoHeight: true
        });
        this._distanceTable.placeAt(this.distanceTable);
        this._distanceTable.startup();
      },

      _createValueField: function (td) {
        var numberField = new NumberTextBox({
          style: 'height: 24px;',
          id: dijitRegistry.getUniqueId('ntb'),
          required: "true",
          placeHolder: this.nls.valueText,
          invalidMessage: this.nls.numericInvalidMessage,
          value: this.firstDistance?'':0,
          constraints: {
            places: 2
          },
          'class': 'numberTextBox'
        });
        domConstruct.place(numberField.domNode, td);
        this.own(
          dojoOn(numberField, 'focus', dojoLang.hitch(this, function(){
            if(numberField.get('value') === 0) {
              numberField.set('value','');
            }
          })),

          dojoOn(numberField, 'blur', dojoLang.hitch(this, function(){
            var rows = this._distanceTable.getRows();
            dojoArray.forEach(rows, dojoLang.hitch(this, function(tr) {
              var currentValue = this._distanceTable.getRowData(tr);
              if(!currentValue.Value.valid && rows.length > 1){
                this._distanceTable.deleteRow(tr);
              }
            }))
          }))
        );
        numberField.focus();
        this.firstDistance = false;
      },

      _getValueFieldValue: function (td) {
        var numberTextBox = dijitRegistry.byNode(td.childNodes[0]);
        return {
          value: numberTextBox.get('value'),
          valid: numberTextBox.isValid()
        };
      },

      /*
       * upgrade graphicslayer so we can use the label params
       */
      getLayer: function () {
        if (!this._gl) {
          var layerDefinition = {
            'geometryType': 'esriGeometryPolyline',
            'extent': {
              'xmin': 0,
              'ymin': 0,
              'xmax': 0,
              'ymax': 0,
              'spatialReference': {
                'wkid': 102100,
                'latestWkid': 102100
              }
            },
            'objectIdField': 'ObjectID',
            'fields': [
              {
                "name": "ObjectID",
                "alias": "ObjectID",
                "type": "esriFieldTypeOID"
              }, {
                'name': 'Interval',
                'type': 'esriFieldTypeString',
                'alias': 'Interval'
              }
            ]
          };

          var lblexp = { 'labelExpressionInfo': { 'value': '{Interval}' } };
          var lblClass = new EsriLabelClass(lblexp);
          lblClass.labelPlacement = 'center-end';
          lblClass.symbol = this._labelSym;
          //lblClass.where = 'Interval > 0';

          var fs = new EsriFeatureSet();

          var featureCollection = {
            layerDefinition: layerDefinition,
            featureSet: fs
          };

          this._gl = new EsriFeatureLayer(featureCollection, {
            id: 'Distance & Direction - Range Graphics',
            showLabels: true
          });

          this._gl.setLabelingInfo([lblClass]);

          return this._gl;
        }
      },

      /*
       * Start up event listeners
       */
      syncEvents: function () {
        //commented out as we want the graphics to remain when the widget is closed
        /*dojoTopic.subscribe('DD_WIDGET_OPEN',dojoLang.hitch(this, this.setGraphicsShown));
        dojoTopic.subscribe('DD_WIDGET_CLOSE',dojoLang.hitch(this, this.setGraphicsHidden));*/
        dojoTopic.subscribe('TAB_SWITCHED', dojoLang.hitch(this, this.tabSwitched));

        this.dt.watch('startPoint', dojoLang.hitch(this, function (r, ov, nv) {
          r = ov = null;
          this.coordTool.inputCoordinate.set('coordinateEsriGeometry', nv);
          this.dt.addStartGraphic(nv, this._ptSym);
        }));

        this.coordTool.inputCoordinate.watch('outputString', dojoLang.hitch(this, function (r, ov, nv) {
          r = ov = null;
          if (!this.coordTool.manualInput) { this.coordTool.set('value', nv); }
        }));

        this.own(
          dojoOn(this.coordTool, 'keyup', dojoLang.hitch(this, this.coordToolKeyWasPressed)),

          this.dt.on('draw-complete', dojoLang.hitch(this, this.feedbackDidComplete)),

          dojoOn(this.rangeType, 'change', dojoLang.hitch(this, this.rangeTypeDropDownChanged)),

          dojoOn(this.ringIntervalUnitsDD, 'change', dojoLang.hitch(this, this.ringIntervalUnitsDidChange)),

          dojoOn(this.coordinateFormatButton, 'click', dojoLang.hitch(this, this.coordinateFormatButtonWasClicked)),

          dojoOn(this.addPointBtn, 'click', dojoLang.hitch(this, this.pointButtonWasClicked)),

          dojoOn(this.coordinateFormat.content.applyButton, 'click', dojoLang.hitch(this, function () {
            var fs = this.coordinateFormat.content.formats[this.coordinateFormat.content.ct];
            var cfs = fs.defaultFormat;
            var fv = this.coordinateFormat.content.frmtSelect.get('value');
            if (fs.useCustom) {
              cfs = fs.customFormat;
            }
            this.coordTool.inputCoordinate.set(
              'formatPrefix',
              this.coordinateFormat.content.addSignChkBox.checked
            );
            this.coordTool.inputCoordinate.set('formatString', cfs);
            this.coordTool.inputCoordinate.set('formatType', fv);
            this.setCoordLabel(fv);

            DijitPopup.close(this.coordinateFormat);
          })),

          dojoOn(this.coordinateFormat.content.cancelButton, 'click', dojoLang.hitch(this, function () {
            DijitPopup.close(this.coordinateFormat);
          })),

          dojoOn(this.clearGraphicsButton, 'click', dojoLang.hitch(this, this.clearGraphics)),

          dojoOn(this.numRingsDiv, dojoMouse.leave, dojoLang.hitch(this, this.checkValidInputs)),

          dojoOn(this.ringIntervalDiv, dojoMouse.leave, dojoLang.hitch(this, this.checkValidInputs)),

          dojoOn(this.numRadialsInputDiv, dojoMouse.leave, dojoLang.hitch(this, this.checkValidInputs)),

          dojoOn(this.btnAddDistance, 'click', dojoLang.hitch(this, function() {
              var rows = this._distanceTable.getRows();
              var isAbleToAddRow = false;
              dojoArray.forEach(rows, dojoLang.hitch(this, function(tr) {
                var currentValue = this._distanceTable.getRowData(tr);
                if(currentValue.Value.valid){
                  isAbleToAddRow = true;
                }
              }))
              if (isAbleToAddRow) {
                this._distanceTable.addRow({});
              }
            }
          )),

          dojoOn(this._distanceTable.tbody, 'keyup', dojoLang.hitch(this, function(evt){
            if (evt.keyCode === dojoKeys.ENTER) {
              this._distanceTable.addRow({});
            }
          }))
        );
      },

      /*
       *
       */
      setCoordLabel: function (toType) {
        this.rangeCenterLabel.innerHTML = jimuUtils.sanitizeHTML(dojoString.substitute(
          this.nls.centerPointLabel + ' (${crdType})', {
            crdType: toType
          }
        ));
      },

      /*
      * Range Type dropdown changed
      */
      rangeTypeDropDownChanged: function () {
        this.tabSwitched();
        switch (this.rangeType.get('value')) {
          case 'Interactive':
            dojoDomClass.add(this.numRingsContainer, 'controlGroupHidden');
            dojoDomClass.add(this.distancebetweenRingsContainer, 'controlGroupHidden');
            dojoDomClass.add(this.distanceTableContainer, 'controlGroupHidden');
            dojoDomClass.remove(this.distanceUnitsContainer, 'controlGroupHidden');
            break;
          case 'Fixed':
            dojoDomClass.remove(this.numRingsContainer, 'controlGroupHidden');
            dojoDomClass.remove(this.distancebetweenRingsContainer, 'controlGroupHidden');
            dojoDomClass.add(this.distanceUnitsContainer, 'controlGroupHidden');
            dojoDomClass.add(this.distanceTableContainer, 'controlGroupHidden');
            break;
          case 'Origin':
          case 'Cumulative':
            dojoDomClass.add(this.numRingsContainer, 'controlGroupHidden');
            dojoDomClass.add(this.distancebetweenRingsContainer, 'controlGroupHidden');
            dojoDomClass.remove(this.distanceUnitsContainer, 'controlGroupHidden');
            dojoDomClass.remove(this.distanceTableContainer, 'controlGroupHidden');
            break;
        }
        this.checkValidInputs();
      },

      /*
       * catch key press in start point
       */
      coordToolKeyWasPressed: function (evt) {
        this.dt.removeStartGraphic();
        if (evt.keyCode === dojoKeys.ENTER) {
          this.coordTool.inputCoordinate.getInputType().then(dojoLang.hitch(this, function (r) {
            if (r.inputType === "UNKNOWN") {
              new Message({
                message: this.nls.invalidCoordinateTypeMessage
              });
              this.coordTool.inputCoordinate.coordinateEsriGeometry = null;
              this.checkValidInputs();
            } else {
              dojoTopic.publish(
                'manual-rangering-center-point-input',
                this.coordTool.inputCoordinate.coordinateEsriGeometry
              );
              this.setCoordLabel(r.inputType);
              var fs = this.coordinateFormat.content.formats[r.inputType];
              this.coordTool.inputCoordinate.set('formatString', fs.defaultFormat);
              this.coordTool.inputCoordinate.set('formatType', r.inputType);
              this.dt.addStartGraphic(r.coordinateEsriGeometry, this._ptSym);
              this.checkValidInputs();
            }
          }));
        }
      },

      /*
       *
       */
      coordinateFormatButtonWasClicked: function () {
        this.coordinateFormat.content.set('ct', this.coordTool.inputCoordinate.formatType);
        DijitPopup.open({
          popup: this.coordinateFormat,
          around: this.coordinateFormatButton
        });
      },

      /*
       * Button click event, activate feedback tool
       */
      pointButtonWasClicked: function () {
        if(dojoDomClass.contains(this.addPointBtn,'drawPointBtn-active')) {
          //already selected so deactivate draw tool
          this.dt.deactivate();
          this.map.enableMapNavigation();
        } else {
          this.coordTool.manualInput = false;
          dojoTopic.publish('clear-points');
          this.map.disableMapNavigation();
          if (this.rangeType.get('value') === 'Interactive') {
            this.dt.activate('polyline');
          } else {
            this.dt.activate('point');
          }
        }
        dojoDomClass.toggle(this.addPointBtn, 'drawPointBtn-active');
      },

      /*
       *
       */
      ringIntervalUnitsDidChange: function () {
        this.ringIntervalUnit = this.ringIntervalUnitsDD.get('value');
      },

      /*
       *
       */
      okButtonClicked: function () {
        // validate input
        if (!dojoDomClass.contains(this.okButton, "jimu-state-disabled")) {
          var numRings;
          var ringInterval;
          var ringIntervalUnits;

          switch (this.rangeType.get('value')) {
            case 'Fixed':
              ringInterval = this.ringIntervalInput.get('value');
              numRings = this.numRingsInput.get('value');
              ringIntervalUnits = this.ringIntervalUnitsDD.get('value');
              break;
            case 'Origin':
            case 'Cumulative':
              ringIntervalUnits = this.distanceUnitsDD.get('value');
              if (this.checkTableValues()) {
                var tableRows = this._distanceTable.getRows();
                if (this.rangeType.get('value') === 'Origin') {
                  ringInterval = dojoArray.map(tableRows, dojoLang.hitch(this, function (tr) {
                    var data = this._distanceTable.getRowData(tr);
                    return data.Value.value;
                  }));
                } else {
                  var totalDistance = 0;
                  ringInterval = dojoArray.map(tableRows, dojoLang.hitch(this, function (tr) {
                    var data = this._distanceTable.getRowData(tr);
                    totalDistance = totalDistance + data.Value.value;
                    return totalDistance;
                  }));
                }
              } else {
                new Message({
                  message: this.nls.distanceTableErrorMessage
                });
                return;
              }
              break;
          }
          var params = {
            centerPoint: this.dt.get('startPoint') || this.coordTool.inputCoordinate.coordinateEsriGeometry,
            numRings: numRings,
            numRadials: this.numRadialsInput.get('value'),
            radius: 0,
            circle: null,
            circles: [],
            lastCircle: null,
            r: 0,
            c: 0,
            radials: 0,
            ringInterval: ringInterval,
            ringIntervalUnitsDD: ringIntervalUnits,
            circleSym: this._circleSym
          };
          this.createRangeRings(params);
          this.coordTool.clear();
        }
      },

      checkTableValues: function () {
        var tableRows = this._distanceTable.getRows();
        return tableRows.length > 0;
      },

      /*
       *
       */
      createRangeRings: function (params) {
        if (params.centerPoint) {
          if (params.centerPoint.spatialReference.wkid !== this.map.spatialReference.wkid) {
            params.centerPoint = EsriWMUtils.geographicToWebMercator(
              params.centerPoint
            );
          }

          if (params.ringInterval && params.ringIntervalUnitsDD) {
            if (params.ringInterval.constructor === Array) {
              for (i = 0; i < params.ringInterval.length; i++) {
                params.ringInterval[i] = this.coordTool.inputCoordinate.util.convertToMeters(
                  parseFloat(params.ringInterval[i]), params.ringIntervalUnitsDD);
              }
            } else {
              params.ringDistance = this.coordTool.inputCoordinate.util.convertToMeters(
                parseFloat(params.ringInterval), params.ringIntervalUnitsDD);
            }
          }

          this.dt.removeStartGraphic();
          // create rings
          if (params.circles.length === 0) {
            if (params.ringInterval.constructor === Array) {
              for (i = 0; i < params.ringInterval.length; i++) {
                params.radius += params.ringDistance;
                params.circle = new EsriCircle({
                  center: params.centerPoint,
                  geodesic: true,
                  radius: params.ringInterval[i],
                  numberOfPoints: 360
                });
                params.circles.push(params.circle);
              }
            } else {
              for (params.r = 0; params.r < params.numRings; params.r++) {
                params.radius += params.ringDistance;
                params.circle = new EsriCircle({
                  center: params.centerPoint,
                  geodesic: true,
                  radius: params.radius,
                  numberOfPoints: 360
                });
                params.circles.push(params.circle);
              }
            }
          }

          var u = params.ringIntervalUnitsDD;
          for (params.c = 0; params.c < params.circles.length; params.c++) {
            var p = {
              'paths': [params.circles[params.c].rings[0]],
              'spatialReference': this.map.spatialReference
            };
            var circlePath = new EsriPolyline(p);
            var cGraphic = new EsriGraphic(circlePath,
              this._lineSym,
              {
                'Interval': dojoNumber.round(this.coordTool.inputCoordinate.util.convertMetersToUnits(
                  params.circles[params.c].radius, u), 2) + " " + params.ringIntervalUnitsDD
              }
            );
            this._gl.add(cGraphic);
          }

          // create radials

          //need to find largest radius
          params.largestRadius = 0;
          for (var i = 0; i < params.circles.length; i++) {
            if (params.circles[i].radius > params.largestRadius) {
              params.largestRadius = params.circles[i].radius;
            }
          }

          //create a new geodesic circle with the radius the same as the largest circle and only the same
          //amount of points as radials
          //if radials are 0 this will create a circle with the default value of 60
          var radialCircle = new EsriCircle({
            center: params.centerPoint,
            geodesic: true,
            radius: params.largestRadius,
            numberOfPoints: params.numRadials
          });

          //if no radials we dont need to draw

          if (params.numRadials !== 0) {
            //loop through each of the points of the new circle creating a line from the center point
            for (var j = 0; j < radialCircle.rings[0].length - 1; j++) {
              var pLine = new EsriPolyline(params.centerPoint.spatialReference);
              pLine.addPath([dojoLang.clone(params.centerPoint), radialCircle.getPoint(0, j)]);
              var newline = new EsriPolyline(EsriGeometryEngine.geodesicDensify(pLine, 10000),
                params.centerPoint.spatialReference);
              this._gl.add(new EsriGraphic(newline, this._lineSym, { 'Interval': '' }));
            }
          }

          this._gl.redraw();
          this.map.setExtent(radialCircle.getExtent().expand(3));
        }
      },

      /*
       *
       */
      feedbackDidComplete: function (results) {
        var centerPoint = null;
        if (results.geometry.hasOwnProperty('circlePoints')) {
          centerPoint = results.geometry.circlePoints[0];
          var params = {
            centerPoint: centerPoint,
            numRadials: this.numRadialsInput.get('value'),
            circles: [],
            circleSym: this._circleSym,
            r: 0,
            c: 0,
            radials: 0,
            ringIntervalUnitsDD: this.distanceUnitsDD.get('displayedValue'),
            intervalUnits: this.distanceUnitsDD.get('value')
          };
          var circle, radius;
          for (var i = 1; i < results.geometry.circlePoints.length; i++) {
            var pLine = new EsriPolyline(results.geometry.spatialReference);
            pLine.addPath([centerPoint, results.geometry.circlePoints[i]]);
            radius = EsriGeometryEngine.geodesicLength(pLine, 9001);
            circle = new EsriCircle({
              center: centerPoint,
              geodesic: true,
              radius: radius,
              numberOfPoints: 360
            });
            params.circles.push(circle);
          }

          this.createRangeRings(params);
        } else {
          centerPoint = results.geometry;
          this.checkValidInputs();
        }

        dojoDomClass.remove(this.addPointBtn, 'drawPointBtn-active');
        //this.coordTool.clear();
        this.dt.deactivate();
        this.map.enableMapNavigation();
      },

      /*
       * Remove graphics and reset values
       */
      clearGraphics: function () {
        if (this._gl) {
          // graphic layers
          this._gl.clear();
          this._gl.refresh();
          this.dt.removeStartGraphic();
          this.coordTool.clear();
        }
        this.checkValidInputs();
        //refresh each of the feature/graphic layers to enusre labels are removed
        for (var j = 0; j < this.map.graphicsLayerIds.length; j++) {
          this.map.getLayer(this.map.graphicsLayerIds[j]).refresh();
        }
      },

      /*
       *
       */
      setGraphicsHidden: function () {
        if (this._gl) {
          this._gl.hide();
        }
      },

      /*
       *
       */
      setGraphicsShown: function () {
        if (this._gl) {
          this._gl.show();
        }
      },

      /*
      * Activate the ok button if all the requried inputs are valid
      */
      checkValidInputs: function () {
        dojoDomClass.add(this.okButton, 'jimu-state-disabled');
        if (this.rangeType.get('value') !== 'Interactive') {
          if (this.coordTool.inputCoordinate.coordinateEsriGeometry !== null &&
            this.numRingsInput.isValid() && this.ringIntervalInput.isValid() && this.numRadialsInput.isValid()) {
            dojoDomClass.remove(this.okButton, 'jimu-state-disabled');
          }
        }
      },

      /*
       * Make sure any active tools are deselected to prevent multiple actions being performed
       */
      tabSwitched: function () {
        this.dt.deactivate();
        this.dt.cleanup();
        this.dt.disconnectOnMouseMoveHandlers();
        this.map.enableMapNavigation();
        this.dt.removeStartGraphic();
        dojoDomClass.remove(this.addPointBtn, 'drawPointBtn-active');
      }
    });
});