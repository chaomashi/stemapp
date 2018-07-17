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
/* jshint -W098 */
/*global define*/
define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/topic',
  'dojo/dom-class',
  'dojo/string',
  'dojo/mouse',
  'dojo/number',
  'dojo/keys',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/TooltipDialog',
  'dijit/popup',
  'jimu/dijit/Message',
  'jimu/LayerInfos/LayerInfos',
  'jimu/utils',
  'esri/layers/FeatureLayer',
  'esri/layers/LabelClass',
  'esri/tasks/FeatureSet',
  'esri/geometry/geometryEngine',
  'esri/geometry/Polyline',
  'esri/geometry/Circle',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/symbols/TextSymbol',
  'esri/graphic',
  '../models/LineFeedback',
  '../models/ShapeModel',
  '../views/CoordinateInput',
  '../views/EditOutputCoordinate',
  '../models/DirectionalLineSymbol',
  'dojo/text!../templates/TabLine.html',
  'dijit/form/NumberTextBox',
  'dijit/form/Select',
  'jimu/dijit/CheckBox'
], function (
  dojoDeclare,
  dojoLang,
  dojoOn,
  dojoTopic,
  dojoDomClass,
  dojoString,
  dojoMouse,
  dojoNumber,
  dojoKeys,
  dijitWidgetBase,
  dijitTemplatedMixin,
  dijitWidgetsInTemplate,
  DijitTooltipDialog,
  DijitPopup,
  Message,
  jimuLayerInfos,
  jimuUtils,
  EsriFeatureLayer,
  EsriLabelClass,
  EsriFeatureSet,
  EsriGeometryEngine,
  EsriPolyline,
  EsriCircle,
  EsriSimpleMarkerSymbol,
  EsriTextSymbol,
  EsriGraphic,
  DrawFeedBack,
  ShapeModel,
  CoordInput,
  EditOutputCoordinate,
  DirectionalLineSymbol,
  templateStr
) {
  'use strict';
  return dojoDeclare([dijitWidgetBase, dijitTemplatedMixin, dijitWidgetsInTemplate], {
      templateString: templateStr,
      baseClass: 'jimu-widget-TabLine',

      constructor: function (args) {
        dojoDeclare.safeMixin(this, args);
      },

      postCreate: function () {

        this.currentLengthUnit = this.lengthUnitDD.get('value');

        this.currentAngleUnit = this.angleUnitDD.get('value');

        //Create the directional line symbol with basic polyline params
        var basicOptions = {
          directionSymbol: "arrow1",
          directionPixelBuffer: 100000,
          showStartSymbol: true,
          showEndSymbol: true
        };
        basicOptions = dojoLang.mixin(basicOptions, this.lineSymbol);
        this._lineSym = new DirectionalLineSymbol(basicOptions);

        this._ptSym = new EsriSimpleMarkerSymbol(this.pointSymbol);

        this._labelSym = new EsriTextSymbol(this.labelSymbol);

        this.map.addLayer(this.getLayer());

        //must ensure the layer is loaded before we can access it to turn on the labels
        if (this._gl.loaded) {
          var featureLayerInfo =
            jimuLayerInfos.getInstanceSync().getLayerInfoById('Distance & Direction - Line Graphics');
          featureLayerInfo.showLabels();
          featureLayerInfo.enablePopup();
        } else {
          this._gl.on("load", dojoLang.hitch(this, function () {
            var featureLayerInfo =
              jimuLayerInfos.getInstanceSync().getLayerInfoById('Distance & Direction - Line Graphics');
            featureLayerInfo.showLabels();
            featureLayerInfo.enablePopup();
          }));
        }

        this.coordToolStart = new CoordInput({ appConfig: this.appConfig, nls: this.nls }, this.startPointCoordsLine);

        this.coordToolStart.inputCoordinate.formatType = 'DD';

        this.coordToolEnd = new CoordInput({ appConfig: this.appConfig, nls: this.nls }, this.endPointCoordsLine);

        this.coordToolEnd.inputCoordinate.formatTyp = 'DD';

        this.coordinateFormatStart = new DijitTooltipDialog({
          content: new EditOutputCoordinate({ nls: this.nls}),
          style: 'width: 400px'
        });

        if (this.appConfig.theme.name === 'DartTheme') {
          dojoDomClass.add(this.coordinateFormatStart.domNode, 'dartThemeClaroDijitTooltipContainerOverride');
        }

        this.coordinateFormatEnd = new DijitTooltipDialog({
          content: new EditOutputCoordinate({ nls: this.nls }),
          style: 'width: 400px'
        });

        if (this.appConfig.theme.name === 'DartTheme') {
          dojoDomClass.add(this.coordinateFormatEnd.domNode, 'dartThemeClaroDijitTooltipContainerOverride');
        }

        // add start and endpoint toolbars
        this.dtStart = new DrawFeedBack({
          map: this.map,
          coordTool: this.coordToolStart.inputCoordinate.util,
          nls: this.nls
        });
        this.dtEnd = new DrawFeedBack({
          map: this.map,
          coordTool: this.coordToolStart.inputCoordinate.util,
          nls: this.nls
        });

        this.dtStart.setLineSymbol(this._lineSym);

        this.lineTypeDDDidChange();
        this.syncEvents();

        this.lengthInput.invalidMessage = this.nls.numericInvalidMessage;
        this.lengthInput.rangeMessage = this.nls.lineLengthErrorMessage;

        this.angleInput.invalidMessage = this.nls.numericInvalidMessage;
        this.angleInput.rangeMessage = this.nls.orientationErrorMessage;
      },

      /*
       * upgrade graphicslayer so we can use the label params
       */
      getLayer: function () {
        if (!this._gl) {
          var layerDefinition = {
            'geometryType': 'esriGeometryPolyline',
            'objectIdField': 'ObjectID',
            'fields': [
              {
                "name": "ObjectID",
                "alias": "ObjectID",
                "type": "esriFieldTypeOID"
              }, {
                'name': 'GeoLength',
                'type': 'esriFieldTypeString',
                'alias': 'Length'
              }, {
                'name': 'LineAngle',
                'type': 'esriFieldTypeString',
                'alias': 'Angle'
              }]
          };

          var lblexp = {
            'labelExpressionInfo': {
              'value': this.nls.lengthLabel + ': {GeoLength}, ' +
              this.nls.angleLabel + ': {LineAngle}'
            }
          };
          var lblClass = new EsriLabelClass(lblexp);
          lblClass.labelPlacement = 'above-along';
          lblClass.where = "GeoLength > 0";
          lblClass.symbol = this._labelSym;

          var featureCollection = {
            layerDefinition: layerDefinition,
            featureSet: new EsriFeatureSet()
          };

          this._gl = new EsriFeatureLayer(featureCollection, {
            id: 'Distance & Direction - Line Graphics',
            outFields: ["*"],
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

        dojoTopic.subscribe('TAB_SWITCHED', dojoLang.hitch(this, this.tabSwitched));
        dojoTopic.subscribe(DrawFeedBack.drawnLineLengthDidChange, dojoLang.hitch(this, this.lineLengthDidChange));
        dojoTopic.subscribe(DrawFeedBack.drawnLineAngleDidChange, dojoLang.hitch(this, this.lineAngleDidChange));

        this.dtStart.watch('startPoint', dojoLang.hitch(this, function (r, ov, nv) {
          this.coordToolStart.inputCoordinate.set('coordinateEsriGeometry', nv);
          this.coordToolStart.inputCoordinate.set('inputType', this.coordToolStart.inputCoordinate.formatType);
          this.dtStart.addStartGraphic(nv, this._ptSym);
        }));

        this.dtStart.watch('endPoint', dojoLang.hitch(this, function (r, ov, nv) {
          this.coordToolStart.inputCoordinate.set('coordinateEsriGeometry', nv);
        }));

        this.dtStart.watch('currentEndPoint', dojoLang.hitch(this, function (r, ov, nv) {
          this.coordToolStart.inputCoordinate.set('coordinateEsriGeometry', nv);
        }));

        this.dtStart.on('draw-complete', dojoLang.hitch(this, this.feedbackDidCompleteStart));

        this.coordToolStart.inputCoordinate.watch('outputString', dojoLang.hitch(this, function (r, ov, nv) {
          if (!this.coordToolStart.manualInput) { this.coordToolStart.set('value', nv); }
        }));

        this.coordToolStart.on('keyup', dojoLang.hitch(this, this.coordToolStartKeyWasPressed));

        this.dtEnd.watch('startPoint', dojoLang.hitch(this, function (r, ov, nv) {
          this.coordToolEnd.inputCoordinate.set('coordinateEsriGeometry', nv);
          this.coordToolEnd.inputCoordinate.set('inputType', this.coordToolEnd.inputCoordinate.formatType);
          this.dtEnd.addStartGraphic(nv, this._ptSym);
        }));

        this.dtEnd.watch('endPoint', dojoLang.hitch(this, function (r, ov, nv) {
          this.coordToolEnd.inputCoordinate.set('coordinateEsriGeometry', nv);
        }));

        this.dtEnd.watch('currentEndPoint', dojoLang.hitch(this, function (r, ov, nv) {
          this.coordToolEnd.inputCoordinate.set('coordinateEsriGeometry', nv);
        }));

        this.dtEnd.on('draw-complete', dojoLang.hitch(this, this.feedbackDidCompleteEnd));

        this.coordToolEnd.inputCoordinate.watch('outputString', dojoLang.hitch(this, function (r, ov, nv) {
          if (!this.coordToolEnd.manualInput) { this.coordToolEnd.set('value', nv); }
        }));

        this.coordToolEnd.on('keyup', dojoLang.hitch(this, this.coordToolEndKeyWasPressed));

        this.lengthUnitDD.on('change', dojoLang.hitch(this, this.lengthUnitDDDidChange));

        this.angleUnitDD.on('change', dojoLang.hitch(this, this.angleUnitDDDidChange));

        this.lineTypeDD.on('change', dojoLang.hitch(this, this.lineTypeDDDidChange));

        this.own(
          dojoOn(this.coordinateFormatButtonStart, 'click',
            dojoLang.hitch(this, this.coordinateFormatButtonStartClicked)),
          dojoOn(this.coordinateFormatStart.content.applyButton, 'click', dojoLang.hitch(this, function () {
            var fs = this.coordinateFormatStart.content.formats[this.coordinateFormatStart.content.ct];
            var cfs = fs.defaultFormat;
            var fv = this.coordinateFormatStart.content.frmtSelect.get('value');
            if (fs.useCustom) { cfs = fs.customFormat; }
            this.coordToolStart.inputCoordinate.set(
              'formatPrefix',
              this.coordinateFormatStart.content.addSignChkBox.checked
            );
            this.coordToolStart.inputCoordinate.set('formatString', cfs);
            this.coordToolStart.inputCoordinate.set('formatType', fv);
            this.setCoordLabelStart(fv);
            DijitPopup.close(this.coordinateFormatStart);
          })),

          dojoOn(this.coordinateFormatStart.content.cancelButton, 'click', dojoLang.hitch(this, function () {
            DijitPopup.close(this.coordinateFormatStart);
          })),

          dojoOn(this.coordinateFormatButtonEnd, 'click', dojoLang.hitch(this, this.coordinateFormatButtonEndClicked)),

          dojoOn(this.coordinateFormatEnd.content.applyButton, 'click', dojoLang.hitch(this, function () {
            var fs = this.coordinateFormatEnd.content.formats[this.coordinateFormatEnd.content.ct];
            var cfs = fs.defaultFormat;
            var fv = this.coordinateFormatEnd.content.frmtSelect.get('value');
            if (fs.useCustom) { cfs = fs.customFormat; }
            this.coordToolEnd.inputCoordinate.set(
              'formatPrefix',
              this.coordinateFormatEnd.content.addSignChkBox.checked
            );
            this.coordToolEnd.inputCoordinate.set('formatString', cfs);
            this.coordToolEnd.inputCoordinate.set('formatType', fv);
            this.setCoordLabelEnd(fv);
            DijitPopup.close(this.coordinateFormatEnd);
          })),

          dojoOn(this.coordinateFormatEnd.content.cancelButton, 'click', dojoLang.hitch(this, function () {
            DijitPopup.close(this.coordinateFormatEnd);
          })),

          dojoOn(this.addPointBtnStart, 'click', dojoLang.hitch(this, this.addStartPointButtonClicked)),

          dojoOn(this.addPointBtnEnd, 'click', dojoLang.hitch(this, this.addEndPointButtonClicked)),

          dojoOn(this.interactiveLine, 'change', dojoLang.hitch(this, this.interactiveCheckBoxChanged)),

          dojoOn(this.lengthInputDiv, dojoMouse.leave, dojoLang.hitch(this, this.checkValidInputs)),

          dojoOn(this.angleInputDiv, dojoMouse.leave, dojoLang.hitch(this, this.checkValidInputs))

        );
      },

      /*
       * length value change
       */
      lineLengthDidChange: function (r) {
        var frmtdLength = dojoNumber.format(r, { places: 2 });
        this.lengthInput.set('value', frmtdLength);
      },

      /*
       * angle value change
       */
      lineAngleDidChange: function (r) {
        this.angleInput.set('value', r);
      },

      /*
       * checkbox changed
       */
      interactiveCheckBoxChanged: function () {
        this.tabSwitched();
        this.coordToolEnd.set('disabled', this.interactiveLine.checked);
        if (this.interactiveLine.checked) {
          dojoDomClass.add(this.addPointBtnEndDiv, 'controlGroupHidden');
          this.addPointBtnStart.title = this.nls.drawLineLabel;
          this.addPointBtnEnd.hidden = true;
        } else {
          this.coordToolEnd.clear();
          this.addPointBtnStart.title = this.nls.addPointLabel;
          dojoDomClass.remove(this.addPointBtnEndDiv, 'controlGroupHidden');
          this.addPointBtnEnd.hidden = false;
        }
        this.checkValidInputs();
      },

      /*
      * update the UI to reflect current state
      */
      lineTypeDDDidChange: function () {
        if (this.lineTypeDD.get('value') === 'Points') {
          this.addPointBtnStart.title = this.nls.addPointLabel;
          this.coordToolEnd.set('disabled', false);
          this.angleInput.set('disabled', true);
          this.lengthInput.set('disabled', true);
          this.interactiveLine.disabled = false;
          dojoDomClass.remove(this.addPointBtnEndDiv, 'controlGroupHidden');
          dojoDomClass.remove(this.interactiveLabel, 'disabledLabel');
          this.addPointBtnEnd.hidden = false;
        } else {
          this.addPointBtnStart.title = this.nls.addPointLabel;
          this.interactiveLine.disabled = true;
          if (this.interactiveLine.checked) {
            this.interactiveLine.checked = false;
          }
          this.coordToolEnd.set('value', '');
          this.coordToolEnd.set('disabled', true);
          this.angleInput.set('disabled', false);
          this.lengthInput.set('disabled', false);
          dojoDomClass.add(this.addPointBtnEndDiv, 'controlGroupHidden');
          dojoDomClass.add(this.interactiveLabel, 'disabledLabel');
          this.addPointBtnEnd.hidden = true;
        }
        this.checkValidInputs();
      },

      /*
       *
       */
      coordinateFormatButtonStartClicked: function () {
        this.coordinateFormatStart.content.set('ct', this.coordToolStart.inputCoordinate.formatType);
        DijitPopup.open({
          popup: this.coordinateFormatStart,
          around: this.coordinateFormatButtonStart
        });
      },

      /*
       *
       */
      coordinateFormatButtonEndClicked: function () {
        this.coordinateFormatEnd.content.set('ct', this.coordToolEnd.inputCoordinate.formatType);
        DijitPopup.open({
          popup: this.coordinateFormatEnd,
          around: this.coordinateFormatButtonEnd
        });
      },

      /*
       * catch key press in start point
       */
      coordToolStartKeyWasPressed: function (evt) {
        this.dtStart.removeStartGraphic();
        if (evt.keyCode === dojoKeys.ENTER) {
          this.coordToolStart.inputCoordinate.getInputType().then(dojoLang.hitch(this, function (r) {
            if (r.inputType === "UNKNOWN") {
              var alertMessage = new Message({
                message: this.nls.invalidCoordinateTypeMessage
              });
              this.coordToolStart.inputCoordinate.coordinateEsriGeometry = null;
              this.checkValidInputs();
            } else {
              this.dtStart.onLineStartManualInputHandler(this.coordToolStart.inputCoordinate.coordinateEsriGeometry);
              this.setCoordLabelStart(r.inputType);
              var fs = this.coordinateFormatStart.content.formats[r.inputType];
              this.coordToolStart.inputCoordinate.set('formatString', fs.defaultFormat);
              this.coordToolStart.inputCoordinate.set('formatType', r.inputType);
              this.dtStart.addStartGraphic(r.coordinateEsriGeometry, this._ptSym);
              this.checkValidInputs();
            }
          }));
        }
      },

      /*
       * catch key press in end point
       */
      coordToolEndKeyWasPressed: function (evt) {
        this.dtEnd.removeStartGraphic();
        if (evt.keyCode === dojoKeys.ENTER) {
          this.coordToolEnd.inputCoordinate.getInputType().then(dojoLang.hitch(this, function (r) {
            if (r.inputType === "UNKNOWN") {
              var alertMessage = new Message({
                message: this.nls.invalidCoordinateTypeMessage
              });
              this.coordToolEnd.inputCoordinate.coordinateEsriGeometry = null;
              this.checkValidInputs();
            } else {
              this.dtEnd.onLineStartManualInputHandler(this.coordToolEnd.inputCoordinate.coordinateEsriGeometry);
              this.setCoordLabelEnd(r.inputType);
              var fs = this.coordinateFormatEnd.content.formats[r.inputType];
              this.coordToolEnd.inputCoordinate.set('formatString', fs.defaultFormat);
              this.coordToolEnd.inputCoordinate.set('formatType', r.inputType);
              this.dtEnd.addStartGraphic(r.coordinateEsriGeometry, this._ptSym);
              this.checkValidInputs();
            }
          }));
        }
      },

      /*
       *
       */
      setCoordLabelStart: function (toType) {
        this.lineStartPointLabel.innerHTML = jimuUtils.sanitizeHTML(dojoString.substitute(
          this.nls.startPointLabel + ' (${crdType})', {
            crdType: toType
          }
        ));
      },

      /*
       *
       */
      setCoordLabelEnd: function (toType) {
        this.lineEndPointLabel.innerHTML = jimuUtils.sanitizeHTML(dojoString.substitute(
          this.nls.endPointLabel + ' (${crdType})', {
            crdType: toType
          }
        ));
      },

      /*
       * Activate the ok button if all the requried inputs are valid
       */
      checkValidInputs: function () {
        dojoDomClass.add(this.okButton, 'jimu-state-disabled');
        if (!this.interactiveLine.checked) {
          if (this.lineTypeDD.get('value') === 'DistAndBearing') {
            if (this.coordToolStart.inputCoordinate.coordinateEsriGeometry !== null &&
              this.lengthInput.isValid() && this.angleInput.isValid()) {
              dojoDomClass.remove(this.okButton, 'jimu-state-disabled');
            }
          } else {
            if (!this.interactiveLine.checked) {
              if (this.coordToolStart.inputCoordinate.coordinateEsriGeometry !== null &&
                this.coordToolEnd.inputCoordinate.coordinateEsriGeometry !== null) {
                dojoDomClass.remove(this.okButton, 'jimu-state-disabled');
              }
            }
          }
        }
      },

      /*
       * Add start button click event, activate feedback tool
       */
      addStartPointButtonClicked: function () {
        if(dojoDomClass.contains(this.addPointBtnStart,'drawPointBtn-active')) {
          //already selected so deactivate draw tool
          this.dtStart.deactivate();
          this.map.enableMapNavigation();
        } else {
          this.tabSwitched();
          this.coordToolStart.manualInput = false;
          this.coordToolEnd.manualInput = false;
          this.map.disableMapNavigation();
          if (this.lineTypeDD.get('value') === 'Points' && this.interactiveLine.checked) {
            this.dtStart.activate('polyline');
          } else {
            this.dtStart.activate('point');
          }
        }
        dojoDomClass.toggle(this.addPointBtnStart, 'drawPointBtn-active');
      },

      /*
       * Button click event, activate feedback tool
       */
      addEndPointButtonClicked: function () {
        if(dojoDomClass.contains(this.addPointBtnEnd,'drawPointBtn-active')) {
          //already selected so deactivate draw tool
          this.dtEnd.deactivate();
          this.map.enableMapNavigation();
        } else {
          this.tabSwitched();
          this.coordToolStart.manualInput = false;
          this.coordToolEnd.manualInput = false;
          this.map.disableMapNavigation();
          this.dtEnd.activate('point');
        }
        dojoDomClass.toggle(this.addPointBtnEnd, 'drawPointBtn-active');
      },

      /*
       *
       */
      lengthUnitDDDidChange: function () {
        this.currentLengthUnit = this.lengthUnitDD.get('value');
        this.dtStart.set('lengthUnit', this.currentLengthUnit);
      },

      /*
       *
       */
      angleUnitDDDidChange: function () {
        this.currentAngleUnit = this.angleUnitDD.get('value');
        this.dtStart.set('angleUnit', this.currentAngleUnit);
        if (this.currentAngleUnit === "degrees") {
          this.angleInput.constraints.max = 360;
          this.angleInput.rangeMessage = this.nls.degreesRangeMessage;

        } else {
          this.angleInput.constraints.max = 6400;
          this.angleInput.rangeMessage = this.nls.millsRangeMessage;
        }
      },

      /*
       *
       */
      feedbackDidCompleteStart: function (results) {
        if (results.geometry.type === 'polyline') {
          if (this.lengthInput.get('value') !== undefined || this.angleInput.get('value') !== undefined) {
            this.currentLine = new ShapeModel(results);
            var geom = null;
            geom = new EsriPolyline({
              paths: this.map.spatialReference.wkid === 4326 ?
                        this.currentLine.geographicGeometry.paths :
                        this.currentLine.wmGeometry.paths,
              spatialReference: this.map.spatialReference
            });

            if (this.map.spatialReference.wkid === 4326) {
              geom = EsriGeometryEngine.geodesicDensify(geom, 10000);
            }
            this.currentLine.graphic = new EsriGraphic(
              geom,
              this._lineSym, {
                'GeoLength': this.lengthInput.get('displayedValue').toString() + " " +
                  this.lengthUnitDD.get('displayedValue'),
                'LineAngle': this.angleInput.get('displayedValue').toString() + " " +
                  this.angleUnitDD.get('displayedValue')
              }
            );
            this._gl.add(this.currentLine.graphic);
            this._gl.refresh();
            this.dtEnd.onLineStartManualInputHandler(this.currentLine.endPoint);
            this.dtStart.onLineStartManualInputHandler(this.currentLine.startPoint);
            this.dtStart.removeStartGraphic();
            this.dtEnd.removeStartGraphic();
            var ext = (this.map.spatialReference.wkid === 4326) ?
              this.currentLine.geographicGeometry.getExtent().expand(3) :
              this.currentLine.wmGeometry.getExtent().expand(3);
            this.map.setExtent(ext);
            if (this.interactiveLine.checked) {
              dojoDomClass.toggle(this.addPointBtnStart, 'drawPointBtn-active');
            }
          }
        } else {
          dojoDomClass.toggle(this.addPointBtnStart, 'drawPointBtn-active');
        }
        this.checkValidInputs();
        this.map.enableMapNavigation();
        this.dtStart.deactivate();
      },

      /*
       *
       */
      feedbackDidCompleteEnd: function (results) {
        this.checkValidInputs();
        this.map.enableMapNavigation();
        this.dtEnd.deactivate();
        dojoDomClass.toggle(this.addPointBtnEnd, 'drawPointBtn-active');
      },

      /*
      *
      */
      createManualGraphic: function () {

        var stPt = this.coordToolStart.inputCoordinate.coordinateEsriGeometry;
        var endPt = this.coordToolEnd.inputCoordinate.coordinateEsriGeometry;

        var newLine = new EsriPolyline();
        newLine.addPath([stPt, endPt]);

        var lineLengthMeters = EsriGeometryEngine.geodesicLength(newLine, 9001);
        this.lengthInput.set('value', this.dtStart.coordTool.convertMetersToUnits(lineLengthMeters,
          this.lengthUnitDD.get('value')));
        this.angleInput.set('value', this.dtStart.getAngle(stPt, endPt));

        this.map.setExtent(newLine.getExtent().expand(3));

        this.feedbackDidCompleteStart({ geometry: newLine, geographicGeometry: newLine });

        this.dtStart.clearPoints();
        this.dtEnd.clearPoints();
      },

      /*
      *
      */
      okButtonClicked: function (evt) {
        if (!dojoDomClass.contains(this.okButton, "jimu-state-disabled")) {
          if (this.lineTypeDD.get('value') === 'Points') {
            this.createManualGraphic();
          } else {

            var stPt = this.coordToolStart.inputCoordinate.coordinateEsriGeometry;

            var l = this.coordToolStart.inputCoordinate.util.convertToMeters(this.lengthInput.get('value'),
              this.lengthUnitDD.get('value'));

            var tempcircle = new EsriCircle(stPt, {
              geodesic: true,
              radius: l,
              numberOfPoints: 64000
            });

            var currentAngle = this.angleInput.get('value');
            currentAngle = (this.currentAngleUnit === 'degrees') ? parseInt(10 * currentAngle * 17.777777778, 10) :
              parseInt(10 * currentAngle, 10);
            var fpc = tempcircle.getPoint(0, currentAngle);

            var newLine = new EsriPolyline();
            newLine.addPath([stPt, fpc]);

            this.feedbackDidCompleteStart({
              geometry: newLine,
              geographicGeometry: newLine
            });

            this.coordToolEnd.inputCoordinate.set('coordinateEsriGeometry', fpc);
          }
        }
      },

      /*
       *
       */
      clearGraphics: function () {
        if (this._gl) {
          this._gl.clear();
          this.dtStart.removeStartGraphic();
          this.dtEnd.removeStartGraphic();
          this.coordToolStart.clear();
          this.coordToolEnd.clear();
          this.tabSwitched();
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
       * Make sure any active tools are deselected to prevent multiple actions being performed
       */
      tabSwitched: function () {
        this.dtStart.deactivate();
        this.dtEnd.deactivate();
        this.map.enableMapNavigation();
        dojoDomClass.remove(this.addPointBtnStart, 'drawPointBtn-active');
        dojoDomClass.remove(this.addPointBtnEnd, 'drawPointBtn-active');
      }
    });
});