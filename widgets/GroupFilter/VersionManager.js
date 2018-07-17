define(['jimu/shared/BaseVersionManager'],
function(BaseVersionManager) {
  function VersionManager(){
    this.versions = [{
      version: '2.1',
      upgrader: function(oldConfig){
        return oldConfig;
      }
    },{
      version: '2.2',
      upgrader: function(oldConfig){
        var newConfig = oldConfig;
        newConfig.webmapAppendMode = false;
        newConfig.slAppendChoice = 'OR';
        newConfig.zoomMode = true;
        for (var i = 0; i < newConfig.groups.length; i++) {
          newConfig.groups[i].appendSameLayer = false;
          newConfig.groups[i].appendSameLayerConjunc = 'OR';
          for (var z = 0; z < newConfig.groups[i].layers.length; z++) {
            newConfig.groups[i].layers[z].useZoom = false;
          }
        }
        return newConfig;
      }
    },{
      version: '2.5',
      upgrader: function(oldConfig){
        var newConfig = oldConfig;
        newConfig.persistOnClose = true;
        return newConfig;
      }
    }];
  }

  VersionManager.prototype = new BaseVersionManager();
  VersionManager.prototype.constructor = VersionManager;
  return VersionManager;
});