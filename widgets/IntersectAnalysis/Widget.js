/**
 * created by dpf
 * 图斑分析
 */

define(['dojo/_base/declare',
        'dojo/_base/html',
        'dojo/query',
        "dojo",
        "dojo/aspect",
        'dojo/on',
        'dojo/dom',
        'dojo/dom-style',
        'dojo/_base/Color',
        'dojo/_base/lang',
        'dojo/_base/xhr',
        'dojo/_base/array',
        "dojo/dom-construct",
        'dojo/_base/json',
        'dojo/data/ItemFileWriteStore',
        'dojox/grid/DataGrid',
        './common',
        'esri/toolbars/draw',
        'esri/graphic',
        'esri/layers/GraphicsLayer',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleMarkerSymbol',
        "esri/geometry/Point",
        "esri/geometry/Multipoint",
        "esri/geometry/Polygon",
        "esri/SpatialReference",
        'dijit/_WidgetsInTemplateMixin',
        "dijit/layout/TabContainer",
        "dijit/layout/ContentPane",
        'dijit/form/Button',
        "dijit/registry",
        'jimu/BaseWidget',
        'jimu/dijit/Message',
        'jimu/dijit/AppStatePopup',
        './LoadingIndicator',
        "libs/echarts/echarts",
        "libs/proj4js/dist/proj4",

    ],
    function (declare, html, query, dojo, aspect, on, dom, domStyle, Color, lang, xhr, array, domConstruct, json,
              ItemFileWriteStore, DataGrid, common, Draw, Graphic, GraphicsLayer, SimpleLineSymbol, SimpleFillSymbol,
              SimpleMarkerSymbol, Point, Multipoint, Polygon, SpatialReference, _WidgetsInTemplateMixin, TabContainer,
              ContentPane, Button, registry, BaseWidget, Message, AppStatePopup, LoadingIndicator, echarts, proj4) {
        var clazz = declare([BaseWidget, _WidgetsInTemplateMixin], {
                baseClass: 'jimu-widget-analysis',
                toolbar: null,
                map: null,
                lyrIncidents: null,
                incident: null,
                resEchart: null,
                names: [],
                nameDataes: [],
                dictionaryTable: [],
                echart: undefined,
                loading: null,
                tableData: {
                    identifier: "id",
                    items: []
                },
                loadingNode: null,
                graphicPiont: null,
                incidentPiont: null,
                num: 0,
                GPSPionts: [],
                symPoly: null,
                incidentPoly: [],
                graphicPolyon: null,
                polyGraphic: null,
                button2: null,
                button1: null,
                coordsList: {
                    identifier: "id",
                    items: []
                },
                rowData: null,
                containerTab: null,
                appConfig: null,
                projection: [
                    {
                        wkid: 4326,
                        proj4: "+proj=longlat +datum=WGS84 +no_def"
                    },
                    {
                        wkid: 4490,
                        proj4: "+proj=longlat +ellps=GRS80 +no_defs"
                    },
                    {
                        wkid: 3857,
                        proj4: "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"
                    }
                ],
                proj: null,
                url: "http://172.24.24.159:9011/resp/2c98981f63af2e5a0163affa9aad000b/proxy/gis/analysis/intersect",
                coordsStore: null,
                coordsGrid: null,
                option: null,
                tabEchart: null,
                echartDom: null,

                postCreate: function () {
                    this.inherited(arguments);
                }
                ,
                constructor: function (/*Object*/ options, mapDivId) {
                    this.appConfig = options.appConfig;
                    this._getProjection();
                }
                ,
                startup: function () {
                    // this.map.getExen
                    this.inherited(arguments);
                    this.map.centerAndZoom([119.83974090990513, 32.901301675348726], 6);
                    this.containerTab = dom.byId("containerTab");
                    var $that = this;
                    // select echart tab event
                    var tabEchart = registry.byId("tabEchart");

                    aspect.after(tabEchart, "_onShow", function () {
                        $that._clearEcharts();
                        if ($that.incident !== null) {
                            $that._doIntersectAnalysis($that.incident.geometry)
                        } else if (this.polyGraphic !== null) {
                            $that._doIntersectAnalysis($that.polyGraphic.geometry)
                        }
                    });
                    this.tabEchart = dom.byId("tabEchart");

                    this.echartDom = dom.byId("echartDom");
                    this._loadUI();
                    this.dictionaryTable = this.getDictionaryTable();
                    this.symPoly = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                            new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25])
                    );
                    this.graphicPolyon = new GraphicsLayer();
                    this.graphicPiont = new GraphicsLayer();
                }
                ,
                // 节点的渲染
                _loadUI: function () {
                    // 绑定监听事件

                    this.toolbar = new Draw(this.map, {
                        tooltipOffset: 20,
                        drawTime: 90
                    });
                    this.toolbar.on("draw-end", lang.hitch(this, this._drawIncident));
                    domStyle.set(this.containerTab, "display", "none");
                }
                ,
                // 手绘面
                _drawPolygon: function () {
                    this.toolbar.activate(Draw.POLYGON);
                    this.disableWebMapPopup();
                }
                ,
                // GPS绘面 todo
                _GPSDrawPolygon: function () {
                    var $that = this;
                    this.num++;
                    var position = [
                        {
                            longitude: 120.36817026956395,
                            latitude: 33.08389514195505,
                        },
                        {
                            longitude: 120.37765456064061,
                            latitude: 33.08681338536325,
                        },
                        {
                            longitude: 120.38220358712987,
                            latitude: 33.07964652287546,
                        },
                        {
                            longitude: 120.37928534372166,
                            latitude: 33.07385295140329,
                        },
                        {
                            longitude: 120.37314844949559,
                            latitude: 33.069947655077605,
                        },
                        {
                            longitude: 120.36782694681004,
                            latitude: 33.07183593022409,
                        },
                        {
                            longitude: 120.36649657113865,
                            latitude: 33.0780157397944,
                        },
                        {
                            longitude: 120.36817026956395,
                            latitude: 33.08389514195505,
                        }
                    ];

                    if ("geolocation" in navigator) {
                        $that._addPiont(position[this.num - 1]);
                        // navigator.geolocation.getCurrentPosition(function (position) {
                        //     $that._addPiontToMap(position.coords);
                        //     console.log(position.coords);
                        // });
                    } else {
                        var appStatePopup = new AppStatePopup({
                            nls: {
                                title: this.nls.appState.title,
                                restoreMap: this.nls.appState.restoreMap
                            }
                        });
                        appStatePopup.placeAt('main-page');
                        appStatePopup.startup();
                        appStatePopup.show();
                        console.error('不能访问地理位置');
                    }
                }
                ,
                _addPiont(latlng) {
                    if (this.incidentPiont !== null) {
                        this.incidentPiont = null;
                    }
                    this.GPSPionts.push([latlng.longitude, latlng.latitude]);
                    var point = new Point(latlng.longitude, latlng.latitude, new SpatialReference({wkid: this.proj[0].wkid}));
                    this.map.centerAt(point);
                    this._addPiontToMap();
                }
                ,
                _addPiontToMap: function () {
                    var mpJson = {"points": this.GPSPionts, "spatialReference": ({" wkid": this.proj[0].wkid})};
                    var multipoint = new Multipoint(mpJson);
                    var cls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([236, 58, 4, 1]), 1);
                    var symPoint = new SimpleMarkerSymbol(
                        SimpleMarkerSymbol.STYLE_CIRCLE, 10, cls, new Color([236, 58, 4, 1]));
                    this.incidentPiont = new Graphic(multipoint, symPoint);
                    this.graphicPiont.add(this.incidentPiont);
                    this.map.addLayer(this.graphicPiont);
                    this.map.setZoom(17);
                    this._coordsList(this.GPSPionts, 'gps');
                    if (this.GPSPionts.length > 2) {
                        this._structurePolygon();
                    }
                }
                ,
                _structurePolygon: function () {
                    domStyle.set(this.containerTab, "display", "block");
                    if (this.graphicPolyon !== null) {
                        this._clearPoly();
                    }
                    var singleRingPolygon = new Polygon({wkid: this.proj[0].wkid});
                    singleRingPolygon.addRing(this.GPSPionts);
                    this.polyGraphic = new Graphic(singleRingPolygon, this.symPoly);
                    this.graphicPolyon.add(this.polyGraphic);
                    this.map.addLayer(this.graphicPolyon);
                    this.map.setExtent(this.polyGraphic._extent);
                    if (this.graphicPolyon !== null) {
                        this._doIntersectAnalysis(this.polyGraphic.geometry);
                    }
                }
                ,
                /**
                 * 坐标点列表
                 * @param data
                 * @param type
                 * @private
                 */
                _coordsList(data, type) {
                    var $that = this;
                    var coordsGrid;

                    dom.byId("gridCoords").innerHTML = "";

                    this.coordsList.items = [];

                    var isDisabled = false;

                    for (var i = 0; i < data.length; i++) {
                        this.coordsList.items.push(lang.mixin(
                            {id: i + 1},
                            {longitude: data[i][0].toFixed(8)},
                            {latitude: data[i][1].toFixed(8)},
                            {remove: ''}));
                    }

                    this.coordsStore = new ItemFileWriteStore({data: this.coordsList});
                    var layout;
                    if (type === 'gps') {
                        layout = [[
                            {'name': '序号', 'field': 'id', 'width': '40px'},
                            {'name': 'X坐标', 'field': 'longitude', 'width': '90px'},
                            {'name': 'Y坐标', 'field': 'latitude', 'width': '90px'},
                            {
                                'name': '删除', 'disabled': 'remove', 'width': '60px', formatter: function () {

                                    return new dijit.form.Button(
                                        {
                                            label: "删除",
                                            onClick: function (id) {
                                                if (coordsGrid !== undefined && $that.coordsStore !== undefined) {
                                                    var items = coordsGrid.selection.getSelected();
                                                    if (items.length) {
                                                        array.forEach(items, function (selectedItem) {
                                                            var latlng = [selectedItem.longitude, selectedItem.latitude];
                                                            try {
                                                                $that.coordsStore.deleteItem(selectedItem);
                                                                $that.GPSPionts.splice(
                                                                    $that.GPSPionts.forEach(function (point) {
                                                                        if (latlng === point) {
                                                                            return latlng;
                                                                        }
                                                                    }), 1);
                                                                if ($that.graphicPolyon !== null) {
                                                                    $that._clearPoly();
                                                                }
                                                                $that._addPiontToMap();
                                                            } catch (e) {
                                                                console.error(e.toString())
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    )
                                }
                            }
                        ]];
                    } else {
                        layout = [[
                            {'name': '序号', 'field': 'id', 'width': '50px'},
                            {'name': 'X坐标', 'field': 'longitude', 'width': '120px'},
                            {'name': 'Y坐标', 'field': 'latitude', 'width': '120px'}
                        ]];
                    }
                    coordsGrid = new DataGrid({
                        store: this.coordsStore,
                        structure: layout,
                        rowSelector: '20px',
                        autoWidth: true,
                        autoHeight: true
                    });

                    coordsGrid.on("RowClick", function (evt) {
                        var idx = evt.rowIndex;
                        $that.rowData = coordsGrid.getItem(idx);
                        if (isDisabled === true) {
                            coordsGrid.removeSelectedRows();
                            coordsGrid.update();
                        }


                    }, true);

                    coordsGrid.placeAt("gridCoords");

                    coordsGrid.startup();

                }
                ,
                _clearEcharts() {
                    if (this.echart !== undefined) {
                        this.resEchart.remove();
                        this.resEchart.innerHTML = "";
                        this.echart.dispose();
                        this.names = [];
                        this.nameDataes = [];
                        this.options = {};
                        dojo.destroy("resEchart");
                    }
                },
                /**
                 * 清除绘面
                 * @private
                 */
                _clearPoly: function () {
                    this.map.graphics.clear();

                    if (this.lyrIncidents !== null) {
                        this.lyrIncidents.clear();
                        this.incident = null;
                        this.toolbar.deactivate();
                    }

                    if (this.graphicPolyon !== null) {
                        this.graphicPolyon.clear();
                        this.polyGraphic = null;
                    }

                    // table clear
                    this._clearEcharts();
                    // table clear
                    this.tableData.items = [];
                    dom.byId("gridDiv").innerHTML = "";

                    this.loading = null;
                }
                ,
                /**
                 * 清除事件
                 * @private
                 */
                _clear: function () {
                    this.GPSPionts = [];
                    this.num = 0;
                    if (this.graphicPiont !== null) {
                        this.graphicPiont.clear();
                        this.incidentPiont = null;
                    }

                    dom.byId("gridCoords").innerHTML = "";
                    this._clearPoly();
                    domStyle.set(this.containerTab, "display", "none");
                }
                ,
                /**
                 * draw incidents
                 * @param evt
                 * @private
                 */
                _drawIncident: function (evt) {
                    this.lyrIncidents = new GraphicsLayer();
                    this.incident = new Graphic(evt.geometry, this.symPoly);
                    this.lyrIncidents.add(this.incident);
                    try {
                        this.map.addLayer(this.lyrIncidents);
                        // this.map.setExtent(this.incident._extent);
                        this._doIntersectAnalysis(this.incident.geometry);
                        this._coordsList(this.incident.geometry.rings[0], 'draw');
                    } catch (e) {
                        console.error(e);
                    }
                    this.toolbar.deactivate();
                }
                ,
                disableWebMapPopup: function () {
                    if (this.map) {
                        this.map.setInfoWindowOnClick(false);
                    }
                }
                ,
                /**
                 * 相交分析
                 * @param geom
                 * @private
                 */
                _doIntersectAnalysis(geom) {
                    var node = domConstruct.create("div");
                    // var loading = domConstruct.create("div");

                    domStyle.set(node, {
                        "min-height": "450px",
                        "max-width": "300px"
                    });
                    // loading.id="loadingNode";
                    node.id = 'resEchart';
                    this.tabEchart.appendChild(node);
                    this.resEchart = dom.byId("resEchart");
                    // this.loadingNode = dom.byId("loadingNode");
                    this.loading = new LoadingIndicator();
                    // this.loading.placeAt(this.loadingNode);

                    this.loading.show();
                    var geometry = dojo.toJson(this._assembleData(geom));
                    var options = {
                        layerName: "TDYTQ_E_2020",
                        outFields: "*",
                        dataSource: "TDGH",
                        geometry: geometry
                    };

                    xhr.post({
                        url: this.url,
                        postData: options,
                        load: lang.hitch(this, function (data) {
                            let results = JSON.parse(JSON.parse(data).result);
                            domStyle.set(this.containerTab, "display", "block");
                            this._assembleEchats(results);
                            this._setResultsToEcharts();
                            this._assembleTabel();
                            this.loading.hide();
                        }),
                        error: function (response, ioArgs) {
                            console.error(response.toString());
                        }
                    });
                }
                ,
                /**
                 * table拼装
                 * @private
                 */
                _assembleTabel() {
                    if (this.nameDataes.length > 0) {
                        this.tableData.items = [];

                        for (var i = 0; i < this.nameDataes.length; i++) {
                            this.tableData.items.push(lang.mixin({id: i + 1}, this.nameDataes[i]));
                        }
                        var store = new ItemFileWriteStore({data: this.tableData});

                        var layout = [[
                            {'name': '序号', 'field': 'id', 'width': '40px'},
                            {'name': '名称', 'field': 'name', 'width': '115px'},
                            {'name': '面积', 'field': 'value', 'width': '115px'},
                        ]];

                        var grid = new DataGrid({
                            store: store,
                            structure: layout,
                            rowSelector: '20px'
                        });
                        grid.placeAt("gridDiv");

                        grid.startup();
                    }
                }
                ,
                /**
                 * 拼装geojson
                 * @param geometry
                 * @returns {{type: string, features: {geometry: {type: string, coordinates: Array[]}, type: string, properties: {title: string}}[], crs: {type: string, properties: {name: string}}}}
                 * @private
                 */
                _assembleData(geometry) {
                    var $that = this;
                    var arr = [];
                    // 坐标系转换
                    array.forEach(geometry.rings[0], function (coord) {
                        arr.push($that.transformTo4490(coord));
                    });
                    var geometryCollection = {
                        type: "FeatureCollection",
                        features: [{
                            geometry: {
                                type: "Polygon",
                                coordinates: [arr]
                            },
                            type: "Feature",
                            properties: {
                                title: "手绘地块"
                            }
                        }],
                        crs: {
                            type: "name",
                            properties: {
                                name: "EPSG:4490"
                            }
                        }
                    };
                    return geometryCollection;
                }
                ,
                /**
                 * show echart
                 * @private
                 */
                _setResultsToEcharts() {
                    this.options = {};
                    if (this.echart !== undefined) {
                        this.echart.dispose();
                        this.echart = undefined;
                    }
                    this.echart = echarts.init(this.resEchart);

                    this.option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data: this.names
                        },
                        series: [{
                            name: '访问来源',
                            type: 'pie',
                            radius: [0, '80%'],
                            selectedMode: 'single',
                            label: {
                                normal: {
                                    position: 'inner',
                                    // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    // backgroundColor: '#eee',
                                    // borderColor: '#aaa',
                                    // borderWidth: 1,
                                    // borderRadius: 4,
                                    // shadowBlur: 3,
                                    // shadowOffsetX: 2,
                                    // shadowOffsetY: 2,
                                    // shadowColor: '#999',
                                    // padding: [0, 7],
                                    // rich: {
                                    //     a: {
                                    //         color: '#999',
                                    //         lineHeight: 20,
                                    //         align: 'center'
                                    //     },
                                    //     hr: {
                                    //         borderColor: '#aaa',
                                    //         width: '100%',
                                    //         borderWidth: 0.5,
                                    //         height: 0
                                    //     },
                                    //     b: {
                                    //         fontSize: 10,
                                    //         lineHeight: 20
                                    //     },
                                    //     per: {
                                    //         color: '#eee',
                                    //         backgroundColor: '#334455',
                                    //         padding: [2, 4],
                                    //         borderRadius: 2
                                    //     }
                                    // }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: this.nameDataes
                        }]
                    };
                    this.echart.setOption(this.option);
                }
                ,
                /**
                 * 构造echart数据
                 * @param value
                 * @private
                 */
                _assembleEchats(value) {
                    var $that = this;
                    var data = $that._mergeData(value);
                    array.forEach(data, function (fea) {
                        array.forEach($that.dictionaryTable, function (colum) {
                            if (fea.properties.TDYTQLXDM.toString() === colum.number) {
                                $that.names.push(colum.label);
                                $that.nameDataes.push({
                                    value: fea.properties.SHAPE_AREA.toFixed(3),
                                    name: colum.label
                                });
                            }
                        });
                    });
                }
                ,
                /**
                 * 相同数据转换
                 * @param val
                 * @returns {Array}
                 * @private
                 */
                _mergeData(val) {
                    var data = val.features;
                    if (val.type === "FeatureCollection") {
                        var map = {};
                        var arr = [];
                        for (var i = 0; i < data.length; i++) {
                            var di = data[i];
                            var n = di.properties.TDYTQLXDM;
                            if (!map[n]) {
                                map[n] = di.properties.SHAPE_AREA;
                                arr.push(di);
                            } else {
                                for (var j = 0; j < arr.length; j++) {
                                    var aj = arr[j];
                                    if (aj.properties.TDYTQLXDM === n) {
                                        aj.properties.SHAPE_AREA += di.properties.SHAPE_AREA;
                                        break;
                                    }
                                }
                            }
                        }
                        return arr;
                    }
                }
                ,
                /**
                 * 字典表
                 * @returns {*[]}
                 */
                getDictionaryTable() {
                    return [{
                        number: '010',
                        label: '基本农田保护区'
                    },
                        {
                            number: '020',
                            label: '一般农地区'
                        },
                        {
                            number: '030',
                            label: '城镇建设用地区'
                        },
                        {
                            number: '040',
                            label: '村镇建设用地区'
                        },
                        {
                            number: '050',
                            label: '独立工矿用地区'
                        },
                        {
                            number: '060',
                            label: '风景旅游用地区'
                        },
                        {
                            number: '070',
                            label: '生态环境安全控制区'
                        },
                        {
                            number: '080',
                            label: '自然与文化遗产保护区'
                        },
                        {
                            number: '090',
                            label: '林业用地区'
                        },
                        {
                            number: '100',
                            label: '牧业用地区'
                        },
                        {
                            number: '990',
                            label: '其他用地区'
                        }
                    ]
                }
                ,
                /**
                 * 获取坐标系
                 * @private
                 */
                _getProjection() {
                    var wkid = this.appConfig.map.mapOptions.extent.spatialReference.wkid;
                    this.proj = array.filter(this.projection, function (crs) {
                        return wkid === crs.wkid;
                    });
                }
                ,
                /**
                 * 坐标转换
                 * @param coord
                 * @returns {*}
                 */
                transformTo4490: function (coord) {
                    var proj = this.proj[0].proj4;
                    var proj4490 = '+proj=longlat +ellps=GRS80 +no_defs';
                    return proj4(proj, proj4490, coord);
                }
            })
        ;
        return clazz;
    });