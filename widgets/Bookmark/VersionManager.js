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
        return oldConfig;
      }
    }, {
      version: '1.4',
      upgrader: function(oldConfig){
        return oldConfig;
      }
    }, {
      version: '2.0Beta',
      upgrader: function(oldConfig) {
        return oldConfig;
      }
    }, {
      version: '2.0',
      upgrader: function(oldConfig) {
        return oldConfig;
      }
    }, {
      version: '2.0.1',
      upgrader: function(oldConfig) {
        return oldConfig;
      }
    }, {
      version: '2.1',
      upgrader: function(oldConfig) {
        return oldConfig;
      }
    }, {
      version: '2.2',
      upgrader: function (oldConfig) {
        return oldConfig;
      }
    }, {
      version: '2.3',
      upgrader: function (oldConfig) {
        return oldConfig;
      }
    }, {
      version: '2.4',
      upgrader: function (oldConfig) {
        return oldConfig;
      }
    }, {
      version: '2.5',
      upgrader: function (oldConfig) {
        var newConfig = oldConfig;

        if (newConfig) {
          newConfig.needToUpdateFlag = true;
          if ("undefined" === typeof newConfig.layout) {
            newConfig.layout = {
              cards: true,
              list: false,
              defaultMode: "cards"
            };
          }
          if ("undefined" === typeof newConfig.editable) {
            newConfig.editable = true;
          }
          if ("undefined" === typeof newConfig.syncMode) {
            if (Array.isArray(newConfig.bookmarks2D) && newConfig.bookmarks2D.length > 0) {
              newConfig.syncMode = {
                webmap: false,
                custom: true//just display custom bookmark, if oldConfig with old custom bookmark(avoid repetition)
              };
            } else {
              newConfig.syncMode = {
                webmap: true,
                custom: true
              };
            }
          }
          //utils.setDefaultConfigForUpdate(newConfig);
          //utils.completeUpdateConfig
          delete newConfig.needToUpdateFlag;//complete update
        }

        return newConfig;
      }
    }, {
      version: '2.6',
      upgrader: function (oldConfig) {
        return oldConfig;
      }
    }, {
      version: '2.7',
      upgrader: function (oldConfig) {
        var newConfig = oldConfig;
        if (newConfig) {
          newConfig.isSaveLayerVisibility = false;
        }
        return newConfig;
      }
    }];
  }

  VersionManager.prototype = new BaseVersionManager();
  VersionManager.prototype.constructor = VersionManager;
  return VersionManager;
});