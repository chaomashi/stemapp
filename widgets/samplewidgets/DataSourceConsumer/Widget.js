define(['dojo/_base/declare', 'jimu/BaseWidget', 'jimu/DataSourceManager'],
function(declare, BaseWidget, DataSourceManager) {
  return declare([BaseWidget], {

    baseClass: 'jimu-widget-dsc',

    startup: function() {
      var data = DataSourceManager.getInstance().getData(this.config.dataSourceId);
      if(data){
        this._updateUI(data);
      }
    },

    onDataSourceDataUpdate: function(dsId, data){
      if(dsId !== this.config.dataSourceId){
        return;
      }

      this._updateUI(data);
    },

    _updateUI: function(data){
      this.countNode.innerText = data.features? data.features.length: 0;
      this.sumNode.innerText = data.features? data.features.reduce((function(acc, val){
        return acc + val.attributes[this.config.summaryField];
      }).bind(this), 0): 0;
    }
  });
});