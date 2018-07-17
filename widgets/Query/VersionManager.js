define(['jimu/shared/BaseVersionManager'],
function(BaseVersionManager) {

  function VersionManager(){
    this.versions = [{
      version: '1.0',
      upgrader: function(oldConfig){
        return oldConfig;
      }
    }, {
      version: '1.1',
      upgrader: function(oldConfig){
        return oldConfig;
      }
    }, {
      version: '1.2',
      upgrader: function(oldConfig){
        return oldConfig;
      }
    }, {
      version: '1.3',
      upgrader: function(oldConfig){
        var newConfig = oldConfig;
        var query = null;
        for(var i = 0; i < newConfig.queries.length; i++){
          query = newConfig.queries[i];
          query.orderByFields = [];
          query.popup.fields = this._updatePopupFields(query.popup.fields);
        }
        return newConfig;
      },

      _updatePopupFields: function(popupFields){
        var result = [];
        var item = null;
        for(var i = 0; i < popupFields.length; i++){
          item = popupFields[i];
          if(item.showInInfoWindow){
            result.push({
              name: item.name,
              alias: item.alias,
              specialType: item.specialType
            });
          }
        }
        return result;
      }
    }, {
      version: '1.4',
      upgrader: function(oldConfig){
        return oldConfig;
      }
    }, {
      version: '2.0Beta',
      upgrader: function(oldConfig){
        return oldConfig;
      }
    }, {
      version: '2.0',
      upgrader: function(oldConfig){
        return oldConfig;
      }
    }, {
      version: '2.0.1',
      upgrader: function(oldConfig){
        return oldConfig;
      }
    }, {
      version: '2.1',
      upgrader: function(oldConfig){
        var newConfig = oldConfig;
        var query = null;
        for(var i = 0; i < newConfig.queries.length; i++){
          query = newConfig.queries[i];
          delete query.objectIdField;
          query.icon = "";
          query.showSQL = true;
          query.useLayerSymbol = false;
          query.keepResultsOnMapAfterCloseWidget = false;
          query.enableExport = false;
          query.singleResultLayer = true;
          query.webMapLayerId = "";

          if(query.resultsSymbol){
            //FeatureLayer or ImageServiceLayer
            query.spatialFilter = {
              currentMapExtent: {
                "default": false
              },
              drawing: {
                "default": false,
                "geometryTypes": [
                  "POINT",
                  "LINE",
                  "POLYLINE",
                  "FREEHAND_POLYLINE",
                  "TRIANGLE",
                  "EXTENT",
                  "CIRCLE",
                  "ELLIPSE",
                  "POLYGON",
                  "FREEHAND_POLYGON"
                ],
                "buffer": null
              },
              useFeatures: null,
              fullLayerExtent: {
                "default": true
              }
            };
          }else{
            //Table
            query.spatialFilter = null;
          }
        }
        return newConfig;
      }
    }, {
      version: '2.2',
      upgrader: function(oldConfig){
        var newConfig = oldConfig;
        newConfig.hideLayersAfterWidgetClosed = true;
        var query = null;
        for(var i = 0; i < newConfig.queries.length; i++){
          query = newConfig.queries[i];
          delete query.keepResultsOnMapAfterCloseWidget;
        }
        return newConfig;
      }
    }, {
      version: '2.3',
      upgrader: function(oldConfig){
        var newConfig = oldConfig;
        var query = null;
        for(var i = 0; i < newConfig.queries.length; i++){
          query = newConfig.queries[i];
          query.canModifySymbol = false;
        }
        return newConfig;
      }
    }, {
      version: '2.4',
      upgrader: function(oldConfig){
        var newConfig = oldConfig;
        newConfig.labelTasks = '';
        newConfig.labelResults = '';
        return newConfig;
      }
    }];
  }

  VersionManager.prototype = new BaseVersionManager();
  VersionManager.prototype.constructor = VersionManager;
  return VersionManager;
});