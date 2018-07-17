define(['dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/html',
  'dojo/_base/array',
  'dojo/on',
  'jimu/BaseWidget',
  'esri/tasks/query',
  'esri/tasks/QueryTask'],
function(declare, lang, html, array, on, BaseWidget, Query, QueryTask) {
  return declare([BaseWidget], {

    baseClass: 'jimu-widget-dsp',

    cityService: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/SampleWorldCities/MapServer/0',

    startup: function() {
      this._createFilterNodes(this.config.filters);
    },

    _createFilterNodes: function(filters){
      array.forEach(filters, function(f){
        this._createFilterNode(f);
      }, this);
    },

    _createFilterNode: function(filter){
      var node = html.create('div', {
        'class': 'filter',
        style: {
          cursor: 'pointer'
        },
        innerHTML: 'City name start with:' + filter
      }, this.filterListNode);

      this.own(on(node, 'click', lang.hitch(this, this._onFilterClick, filter)));
    },

    _onFilterClick: function(filter, evt){
      var queryTask = new QueryTask(this.cityService);
      var query = new Query();
      query.where = "upper(CITY_NAME) like upper('" + filter + "%')";
      query.returnGeometry = true;
      query.outFields = ["*"];
      queryTask.execute(query, lang.hitch(this, this._onFilterReturn, filter));

      html.setStyle(evt.target, {
        backgroundColor: 'yellow'
      });
    },

    _onFilterReturn: function(filter, featureSet){
      this.updateDataSourceData('filter-' + filter, {
        features: featureSet.features
      });
    }

  });
});