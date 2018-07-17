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
/* jshint -W117 */
/*global define*/
define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/topic',
  'dojo/dom-attr',
  'dojo/dom-class',
  'dojo/string',
  'dojo/mouse',
  'dojo/keys',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/TooltipDialog',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/popup',
  'jimu/dijit/Message',
  'jimu/LayerInfos/LayerInfos',
  'jimu/utils',
  'esri/layers/FeatureLayer',
  'esri/layers/LabelClass',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/symbols/SimpleFillSymbol',
  'esri/symbols/TextSymbol',
  'esri/graphic',
  'esri/tasks/FeatureSet',
  '../models/EllipseFeedback',
  '../views/CoordinateInput',
  '../views/EditOutputCoordinate',
  'dojo/text!../templates/TabEllipse.html',
  'dijit/form/NumberTextBox',
  'dijit/form/Select',
  'jimu/dijit/CheckBox'
], function (
  dojoDeclare,
  dojoLang,
  dojoOn,
  dojoTopic,
  dojoDomAttr,
  dojoDomClass,
  dojoString,
  dojoMouse,
  dojoKeys,
  dijitWidgetBase,
  dijitTemplatedMixin,
  DijitTooltipDialog,
  dijitWidgetsInTemplate,
  DijitPopup,
  Message,
  jimuLayerInfos,
  jimuUtils,
  EsriFeatureLayer,
  EsriLabelClass,
  EsriSimpleMarkerSymbol,
  EsriSimpleFillSymbol,
  EsriTextSymbol,
  EsriGraphic,
  EsriFeatureSet,
  DrawFeedBack,
  CoordInput,
  EditOutputCoordinate,
  templateStr
) {
  'use strict';
  return dojoDeclare([dijitWidgetBase, dijitTemplatedMixin, dijitWidgetsInTemplate], {
      templateString: templateStr,
      baseClass: 'jimu-widget-TabEllipse',

      centerPointGraphic: null,

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
        this.currentAngleUnit = this.angleUnitDD.get('value');
        this.currentLengthUnit = this.lengthUnitDD.get('value');

        this._labelSym = new EsriTextSymbol(this.labelSymbol);
        this._ptSym = new EsriSimpleMarkerSymbol(this.pointSymbol);
        this._ellipseSym = new EsriSimpleFillSymbol(this.ellipseSymbol);

        this.map.addLayer(this.getLayer());

        //must ensure the layer is loaded before we can access it to turn on the labels
        if (this._gl.loaded) {
          var featureLayerInfo =
            jimuLayerInfos.getInstanceSync().getLayerInfoById('Distance & Direction - Ellipse Graphics');
          featureLayerInfo.showLabels();
          featureLayerInfo.enablePopup();
        } else {
          this._gl.on("load", dojoLang.hitch(this, function () {
            var featureLayerInfo =
              jimuLayerInfos.getInstanceSync().getLayerInfoById('Distance & Direction - Ellipse Graphics');
            featureLayerInfo.showLabels();
            featureLayerInfo.enablePopup();
          }));
        }

        this.coordTool = new CoordInput({ appConfig: this.appConfig, nls: this.nls }, this.startPointCoords);

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
        this.dt.setLineSymbol(this._ellipseSym);
        this.dt.set('lengthUnit', 'kilometers');
        this.dt.set('angle', 0);
        this.dt.set('ellipseType', 'semi');

        this.syncEvents();

        this.checkValidInputs();

        this.majorAxisInput.invalidMessage = this.nls.numericInvalidMessage;
        this.majorAxisInput.rangeMessage = this.nls.axisErrorMessage;

        this.minorAxisInput.invalidMessage = this.nls.numericInvalidMessage;
        this.minorAxisInput.rangeMessage = this.nls.axisErrorMessage;

        this.angleInput.invalidMessage = this.nls.numericInvalidMessage;
        this.angleInput.rangeMessage = this.nls.orientationErrorMessage;
      },

      /*
       * upgrade graphicslayer so we can use the label params
       */
      getLayer: function () {
        if (!this._gl) {
          var layerDefinition = {
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
            'geometryType': 'esriGeometryPolygon',
            'objectIdField': 'ObjectID',
            'fields': [
              {
                "name": "ObjectID",
                "alias": "ObjectID",
                "type": "esriFieldTypeOID"
              }, {
                'name': 'MAJOR',
                'type': 'esriFieldTypeText',
                'alias': 'Major Axis'
              }, {
                'name': 'MINOR',
                'type': 'esriFieldTypeText',
                'alias': 'Minor Axis'
              }, {
                'name': 'ORIENTATION_ANGLE',
                'type': 'esriFieldTypeText',
                'alias': 'Orientation Angle'
              }
            ]
          };

          var lblexp = {
            'labelExpressionInfo': {
              'value': this.nls.ellipseMajorAxis + ' {MAJOR}; ' + this.nls.ellipseMinorAxis + ' {MINOR}; ' +
                this.nls.angleLabel + ': {ORIENTATION_ANGLE}'
            }
          };
          var lblClass = new EsriLabelClass(lblexp);
          lblClass.symbol = this._labelSym;

          var fs = new EsriFeatureSet();

          var featureCollection = {
            layerDefinition: layerDefinition,
            featureSet: fs
          };

          this._gl = new EsriFeatureLayer(featureCollection, {
            id: 'Distance & Direction - Ellipse Graphics',
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
        dojoTopic.subscribe(DrawFeedBack.DD_ELLIPSE_MINOR_LENGTH_CHANGE,
          dojoLang.hitch(this, this.minorLengthDidChange));
        dojoTopic.subscribe(DrawFeedBack.DD_ELLIPSE_MAJOR_LENGTH_CHANGE,
          dojoLang.hitch(this, this.majorLengthDidChange));
        dojoTopic.subscribe(DrawFeedBack.DD_ELLIPSE_ANGLE_CHANGE,
          dojoLang.hitch(this, this.angleDidChange));

        this.dt.watch('startPoint', dojoLang.hitch(this, function (r, ov, nv) {
          this.coordTool.inputCoordinate.set('coordinateEsriGeometry', nv);
          this.dt.addStartGraphic(nv, this._ptSym);
        }));

        this.coordTool.inputCoordinate.watch('outputString', dojoLang.hitch(this, function (r, ov, nv) {
          if (!this.coordTool.manualInput) { this.coordTool.set('value', nv); }
        }));

        this.own(
          this.dt.on('draw-complete', dojoLang.hitch(this, this.feedbackDidComplete)),

          this.ellipseType.on('change', dojoLang.hitch(this, this.ellipseTypeDDDidChange)),

          this.angleUnitDD.on('change', dojoLang.hitch(this, this.angleUnitDDDidChange)),

          this.lengthUnitDD.on('change', dojoLang.hitch(this, this.lengthUnitDDDidChange)),

          dojoOn(this.coordinateFormatButton, 'click', dojoLang.hitch(this, this.coordinateFormatButtonWasClicked)),

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

          dojoOn(this.addPointBtn, 'click', dojoLang.hitch(this, this.pointButtonWasClicked)),

          dojoOn(this.interactiveEllipse, 'change', dojoLang.hitch(this, this.interactiveCheckBoxChanged)),

          dojoOn(this.coordTool, 'keyup', dojoLang.hitch(this, this.coordToolKeyWasPressed)),

          dojoOn(this.angleInput, 'change', dojoLang.hitch(this, this.angleDidChange)),

          dojoOn(this.coordinateFormat.content.cancelButton, 'click', dojoLang.hitch(this, function () {
            DijitPopup.close(this.coordinateFormat);
          })),

          dojoOn(this.clearGraphicsButton, 'click', dojoLang.hitch(this, this.clearGraphics)),

          dojoOn(this.majorAxisInputDiv, dojoMouse.leave, dojoLang.hitch(this, this.checkValidInputs)),

          dojoOn(this.minorAxisInputDiv, dojoMouse.leave, dojoLang.hitch(this, this.checkValidInputs)),

          dojoOn(this.angleInputDiv, dojoMouse.leave, dojoLang.hitch(this, this.checkValidInputs))
        );
      },

      okButtonClicked: function () {
        if (!dojoDomClass.contains(this.okButton, "jimu-state-disabled")) {
          if (dojoDomAttr.get(this.ellipseType, 'value') === "full") {
            dojoTopic.publish('create-manual-ellipse',
              this.majorAxisInput.get('value') / 2,
              this.minorAxisInput.get('value') / 2,
              this.angleInput.get('value'),
              this.coordTool.inputCoordinate.coordinateEsriGeometry);
          } else {
            dojoTopic.publish('create-manual-ellipse',
              this.majorAxisInput.get('value'),
              this.minorAxisInput.get('value'),
              this.angleInput.get('value'),
              this.coordTool.inputCoordinate.coordinateEsriGeometry);
          }
        }
      },

      /*
       * update the gui with the major axis length
       */
      majorLengthDidChange: function (number) {
        if (dojoDomAttr.get(this.ellipseType, 'value') === "full") {
          number *= 2;
        }
        this.majorAxisInput.setValue(number);
      },

      /*
       * update the gui with the min axis length
       */
      minorLengthDidChange: function (number) {
        if (dojoDomAttr.get(this.ellipseType, 'value') === "full") {
          number *= 2;
        }
        this.minorAxisInput.setValue(number);
      },

      /*
       * update the gui with angle
       */
      angleDidChange: function (number) {
        this.angleInput.setValue(number);
        this.dt.set('angle', number);
      },

      /*
       * checkbox changed
       */
      interactiveCheckBoxChanged: function () {
        this.tabSwitched();
        if (this.interactiveEllipse.checked) {
          this.majorAxisInput.set('disabled', true);
          this.minorAxisInput.set('disabled', true);
          this.angleInput.set('disabled', true);
        } else {
          this.majorAxisInput.set('disabled', false);
          this.minorAxisInput.set('disabled', false);
          this.angleInput.set('disabled', false);
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
              var alertMessage = new Message({
                message: this.nls.invalidCoordinateTypeMessage
              });
              this.coordTool.inputCoordinate.coordinateEsriGeometry = null;
              this.checkValidInputs();
            } else {
              dojoTopic.publish(
                'manual-ellipse-center-point-input',
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
          if (this.interactiveEllipse.checked) {
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
      lengthUnitDDDidChange: function () {
        this.currentLengthUnit = this.lengthUnitDD.get('value');
        this.dt.set('lengthUnit', this.currentLengthUnit);
      },

      /*
       *
       */
      ellipseTypeDDDidChange: function () {
        this.majorAxisLabel.textContent = (dojoDomAttr.get(this.ellipseType, 'value') === "full") ?
          'Major (Diameter)' : 'Major (Radius)';
        this.minorAxisLabel.textContent = (dojoDomAttr.get(this.ellipseType, 'value') === "full") ?
          'Minor (Diameter)' : 'Minor (Radius)';
      },

      /*
       *
       */
      angleUnitDDDidChange: function () {
        this.currentAngleUnit = this.angleUnitDD.get('value');
        this.dt.set('angleUnit', this.currentAngleUnit);

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
      feedbackDidComplete: function (results) {
        if (results.geometry.type === 'polygon') {
          var currentEllipse = new EsriGraphic(results.geometry.geometry, this._ellipseSym);

          var type = this.majorAxisLabel.textContent.split(" ")[1];

          currentEllipse.setAttributes({
            'MINOR': type + ": " + this.minorAxisInput.get('displayedValue') + " " +
              this.lengthUnitDD.get('displayedValue'),
            'MAJOR': type + ": " + this.majorAxisInput.get('displayedValue') + " " +
              dijit.byId('lengthUnitDD').get('displayedValue'),
            'ORIENTATION_ANGLE': this.angleInput.get('displayedValue') + " " +
              this.angleUnitDD.get('displayedValue')
          });

          this._gl.add(currentEllipse);
          this.map.setExtent(currentEllipse.geometry.getExtent().expand(3));
          this._gl.refresh();
        } else {
          this.checkValidInputs();
        }
        this.map.enableMapNavigation();
        this.dt.deactivate();
        //this.dt.removeStartGraphic();
        dojoDomClass.remove(this.addPointBtn, 'drawPointBtn-active');
      },

      /*
       *
       */
      clearGraphics: function () {
        if (this._gl) {
          this._gl.clear();
          this.coordTool.clear();
        }
        dojoDomClass.remove(this.addPointBtn, 'drawPointBtn-active');
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
       * Creates a temporary center point on the map
       */
      createCenterPointGraphic: function () {
        if (this.centerPointGraphic !== null) {
          this._gl.remove(this.centerPointGraphic);
        }
        var centerPoint = this.coordTool.inputCoordinate.coordinateEsriGeometry;
        if (centerPoint) {
          this.centerPointGraphic = new EsriGraphic(
            centerPoint, new EsriSimpleMarkerSymbol()
          );
          this._gl.add(this.centerPointGraphic);
        }
      },

      /*
       * Removes the center point graphic
       */
      removeCenterPointGraphic: function () {
        if (this.centerPointGraphic) {
          this._gl.remove(this.centerPointGraphic);
        }
      },

      /*
      *
      */
      setCoordLabel: function (toType) {
        this.coordInputLabel.innerHTML = jimuUtils.sanitizeHTML(dojoString.substitute(
          this.nls.centerPointLabel + ' (${crdType})', {
            crdType: toType
          }
        ));
      },

      /*
      * Activate the ok button if all the requried inputs are valid
      */
      checkValidInputs: function () {
        dojoDomClass.add(this.okButton, 'jimu-state-disabled');
        if (!this.interactiveEllipse.checked) {
          if (this.coordTool.inputCoordinate.coordinateEsriGeometry !== null &&
            this.majorAxisInput.isValid() && this.minorAxisInput.isValid() && this.angleInput.isValid()) {
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
        this.dt.disconnectOnMouseMoveHandler();
        this.map.enableMapNavigation();
        this.dt.removeStartGraphic();
        dojoDomClass.remove(this.addPointBtn, 'drawPointBtn-active');
      }
    });
});