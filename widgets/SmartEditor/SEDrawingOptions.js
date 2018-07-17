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

// jscs:disable validateIndentation

define([
   "esri/toolbars/draw"
], function (
  Draw
) {

  var SEDrawingOptions = {
    select: [
      {
        id: "seNewSelection",
        iconClass: "seToolbarIcon seNewSelectionIcon",
        label: window.apiNls.widgets.editor.tools.NLS_selectionNewLbl
      }
    ],
    esriGeometryPoint: [
      {
        id: "sePointTool",
        iconClass: "seToolbarIcon sePointIcon",
        _disabledIcon: "seToolbarIcon sePointIconDisabled",
        _drawType: Draw.POINT,
        label: window.apiNls.widgets.editor.tools.NLS_pointLbl
      }
    ],
    esriGeometryPolyline: [
      {
        id: "seDrawPolyline",
        iconClass: "seToolbarIcon sePolylineIcon",
        _disabledIcon: "seToolbarIcon sePolylineIconDisabled",
        _drawType: Draw.POLYLINE,
        label: window.apiNls.widgets.editor.tools.NLS_polylineLbl
      },
      {
        id: "seDrawFreehandPolyline",
        iconClass: "seToolbarIcon seFreehandPolylineIcon",
        _disabledIcon: "seToolbarIcon seFreehandPolylineIcon",
        _drawType: Draw.FREEHAND_POLYLINE,
        label: window.apiNls.widgets.editor.tools.NLS_freehandPolylineLbl
      },
      {
        id: "seDrawRectPolyline",
        iconClass: "seToolbarIcon seRectangleIcon",
        _disabledIcon: "seToolbarIcon seRectangleIcon",
        _drawType: Draw.RECTANGLE,
        label: window.apiNls.widgets.editor.tools.NLS_rectangleLbl
      },
      {
        id: "seDrawArrowPolyline",
        iconClass: "seToolbarIcon seArrowIcon",
        _disabledIcon: "seToolbarIcon seArrowIcon",
        _drawType: Draw.ARROW,
        label: window.apiNls.widgets.editor.tools.NLS_arrowLbl
      },
      {
        id: "seDrawArrowUpPolyline",
        iconClass: "seToolbarIcon seArrowUpIcon",
        _disabledIcon: "seToolbarIcon seArrowUpIcon",
        _drawType: Draw.UP_ARROW,
        label: window.apiNls.widgets.editor.tools.NLS_arrowUpLbl
      },
      {
        id: "seDrawDownArrowPolyline",
        iconClass: "seToolbarIcon seArrowDownIcon",
        _disabledIcon: "seToolbarIcon seArrowDownIcon",
        _drawType: Draw.DOWN_ARROW,
        label: window.apiNls.widgets.editor.tools.NLS_arrowDownLbl
      },
      {
        id: "seDrawLeftArrowPolyline",
        iconClass: "seToolbarIcon seArrowLeftIcon",
        _disabledIcon: "seToolbarIcon arrowLeftIcon",
        _drawType: Draw.LEFT_ARROW,
        label: window.apiNls.widgets.editor.tools.NLS_arrowLeftLbl
      },
      {
        id: "seDrawRightArrowPolyline",
        iconClass: "seToolbarIcon seArrowIcon",
        _disabledIcon: "seToolbarIcon seArrowIcon",
        _drawType: Draw.RIGHT_ARROW,
        label: window.apiNls.widgets.editor.tools.NLS_arrowRightLbl
      },
      {
        id: "seDrawCirclePolyline",
        iconClass: "seToolbarIcon seCircleIcon",
        _disabledIcon: "seToolbarIcon seCircleIcon",
        _drawType: Draw.CIRCLE,
        label: window.apiNls.widgets.editor.tools.NLS_circleLbl
      },
      {
        id: "seDrawEllipsePolyline",
        iconClass: "seToolbarIcon seEllipseIcon",
        _disabledIcon: "seToolbarIcon seEllipseIcon",
        _drawType: Draw.ELLIPSE,
        label: window.apiNls.widgets.editor.tools.NLS_ellipseLbl
      },
      {
        id: "seDrawTrianglePolyline",
        iconClass: "seToolbarIcon seTriangleIcon",
        _disabledIcon: "seToolbarIcon seTriangleIcon",
        _drawType: Draw.TRIANGLE,
        label: window.apiNls.widgets.editor.tools.NLS_triangleLbl
      }
    ],
    esriGeometryPolygon: [
      {
        id: "seDrawPolygon",
        iconClass: "seToolbarIcon sePolygonIcon",
        _disabledIcon: "seToolbarIcon sePolygonIconDisabled",
        _drawType: Draw.POLYGON,
        label: window.apiNls.widgets.editor.tools.NLS_polygonLbl
      },
      {
        id: "seDrawFreehandPolygon",
        iconClass: "seToolbarIcon seFreehandPolygonIcon",
        _disabledIcon: "seToolbarIcon seFreehandPolygonIconDisabled",
        _drawType: Draw.FREEHAND_POLYGON,
        label: window.apiNls.widgets.editor.tools.NLS_freehandPolygonLbl

      },
      {
        id: "seDrawRect",
        iconClass: "seToolbarIcon seRectangleIcon",
        _disabledIcon: "seToolbarIcon seRectangleIcon",
        _drawType: Draw.RECTANGLE,
        label: window.apiNls.widgets.editor.tools.NLS_rectangleLbl
      },
      {
        id: "seDrawArrow",
        iconClass: "seToolbarIcon seArrowIcon",
        _disabledIcon: "seToolbarIcon seArrowIcon",
        _drawType: Draw.ARROW,
        label: window.apiNls.widgets.editor.tools.NLS_arrowLbl
      },
      {
        id: "seDrawArrowUp",
        iconClass: "seToolbarIcon seArrowUpIcon",
        _disabledIcon: "seToolbarIcon seArrowUpIcon",
        _drawType: Draw.UP_ARROW,
        label: window.apiNls.widgets.editor.tools.NLS_arrowUpLbl
      },
      {
        id: "seDrawDownArrow",
        iconClass: "seToolbarIcon seArrowDownIcon",
        _disabledIcon: "seToolbarIcon seArrowDownIcon",
        _drawType: Draw.DOWN_ARROW,
        label: window.apiNls.widgets.editor.tools.NLS_arrowDownLbl
      },
      {
        id: "seDrawLeftArrow",
        iconClass: "seToolbarIcon seArrowLeftIcon",
        _disabledIcon: "seToolbarIcon arrowLeftIcon",
        _drawType: Draw.LEFT_ARROW,
        label: window.apiNls.widgets.editor.tools.NLS_arrowLeftLbl
      },
      {
        id: "seDrawRightArrow",
        iconClass: "seToolbarIcon seArrowIcon",
        _disabledIcon: "seToolbarIcon seArrowIcon",
        _drawType: Draw.RIGHT_ARROW,
        label: window.apiNls.widgets.editor.tools.NLS_arrowRightLbl
      },
      {
        id: "seDrawCircle",
        iconClass: "seToolbarIcon seCircleIcon",
        _disabledIcon: "seToolbarIcon seCircleIcon",
        _drawType: Draw.CIRCLE,
        label: window.apiNls.widgets.editor.tools.NLS_circleLbl
      },
      {
        id: "seDrawEllipse",
        iconClass: "seToolbarIcon seEllipseIcon",
        _disabledIcon: "seToolbarIcon seEllipseIcon",
        _drawType: Draw.ELLIPSE,
        label: window.apiNls.widgets.editor.tools.NLS_ellipseLbl
      },
      {
        id: "seDrawTriangle",
        iconClass: "seToolbarIcon seTriangleIcon",
        _disabledIcon: "seToolbarIcon seTriangleIcon",
        _drawType: Draw.TRIANGLE,
        label: window.apiNls.widgets.editor.tools.NLS_triangleLbl
      }
    ]
  };
  return SEDrawingOptions;
});
