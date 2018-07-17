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

define([
  'dojo/on',
  'dojo/_base/lang',
  'jimu/utils'
], function (on, lang, utils) {
  var mo = {};
  //1. background
  mo.background = {
    setStyle: function (config, style, that) {
      if (!config) {
        return {};
      }
      if (!style) {
        style = {};
      }

      mo.background.setBackgroundColor(config, style);
      mo.background.setAlignment(config, style);
      mo.background.setLink(config, style, that);
    },
    setBackgroundColor: function (config, style) {
      if (config.backgroundColor) {
        style.backgroundColor = config.backgroundColor;
      }
    },
    setAlignment: function (config, style) {
      if (config.alignment) {
        if (config.alignment.horizontal) {
          switch (config.alignment.horizontal) {
            case "left": {
              style.textAlign = "left"; break;
            } case "center": {
              style.textAlign = "center"; break;
            } case "right": {
              style.textAlign = "right"; break;
            } default: {
              style.textAlign = "center";
            }
          }
        }

        if (config.alignment.vertical) {
          style.display = "table-cell";//for vertical alignment
          switch (config.alignment.vertical) {
            case "top": {
              style.verticalAlign = "top"; break;
            } case "middle": {
              style.verticalAlign = "middle"; break;
            } case "bottom": {
              style.verticalAlign = "bottom"; break;
            } default: {
              style.verticalAlign = "middle";
            }
          }
        }
      }
    },
    setLink: function (config, style, that) {
      if (that.clickHanlder) {
        if (that.clickHanlder[0]) {
          that.clickHanlder[0].remove();
        }
        that.clickHanlder = null;
        style.cursor = "auto";
      }
      if (config.link) {
        that.clickHanlder = that.own(on(that.domNode, 'click', lang.hitch(that, function () {
          window.open(config.link);
        })));
        style.cursor = "pointer";
      }
    }
  };
  //2. font
  mo.font = {
    setText: function (config, that) {
      var text = "";//the default value in nls.stringsInTemplate
      if (config.text) {
        text = config.text;
      }
      that.innerDom.innerHTML = text;
    },
    setStyle: function (config, style) {
      if (!config) {
        return {};
      }
      if (!style) {
        style = {};
      }

      mo.font.setFont(config, style);
      mo.font.setTextColor(config, style);
      mo.font.setFontSize(config, style);
    },
    setFont: function (config, style) {
      //clean
      style.fontWeight = "normal";
      style.fontStyle = "normal";
      style.textDecoration = "none";

      if (config.font) {
        if (config.font.fontFamily) {
          style.fontFamily = config.font.fontFamily;
        }

        if (config.font.bold) {
          style.fontWeight = "bold";//normal
        }
        if (config.font.italic) {
          style.fontStyle = "italic";//font-style: normal;
        }
        if (config.font.underline) {
          style.textDecoration = "underline";//text-decoration: none
        }
      }
    },
    setTextColor: function (config, style) {
      if (config.textColor) {
        style.color = config.textColor;
      }
    },
    setFontSize: function (config, style) {
      if (config.fontSize) {
        style.fontSize = config.fontSize + "px";
      }
    }
  };
  //3. image
  mo.image = {
    setStyle: function (config, style, that) {
      if (!config) {
        return {};
      }
      if (!style) {
        style = {};
      }

      mo.image.setBackgroundImg(config, style, that);
      mo.image.setAlignment(config, style);
    },
    setBackgroundImg: function (config, style, that) {
      var url = "";
      if (config && !config.image && that && that.folderUrl) {
        url = "url(" + that.folderUrl + "/images/default_image.png)";
      } else {
        url = "url(" + utils.processUrlInWidgetConfig(config.image, that.folderUrl) + ")";
      }
      if (url) {
        style.backgroundImage = url;
        style.backgroundRepeat = "no-repeat";
        style.backgroundSize = "contain";
      }
    },
    setAlignment: function (config, style) {
      if (!config || !config.background) {
        return;
      }

      var horizontal = "center",
        vertical = "center";
      if (config.background.alignment) {
        if (config.background.alignment.horizontal) {
          horizontal = config.background.alignment.horizontal;
        }
        if (config.background.alignment.vertical) {
          switch (config.background.alignment.vertical) {
            case "top": {
              vertical = "top"; break;
            } case "middle": {
              vertical = "center"; break;
            } case "bottom": {
              vertical = "bottom"; break;
            } default: {
              style.verticalAlign = "center";
            }
          }
        }

        style.backgroundPosition = horizontal + " " + vertical;
      }
    }
  };

  //4. dataFormat
  mo.dataFormat = {
    getText: function (config, value) {
      var text = "";
      if (config.dataFormat) {
        text = value ? value : config.text;
        text = mo.dataFormat.setDataFomat(config, text);

        if (config.dataFormat.prefix) {
          text = config.dataFormat.prefix + " " + text;
        }
        if (config.dataFormat.suffix) {
          text = text + " " + config.dataFormat.suffix;
        }
      }
      return text;
    },
    setDataFomat: function (config, text) {
      var unit = config.dataFormat.unit;
      if ("none" === config.dataFormat.unit) {
        unit = "";
      } else if (config.dataFormat.unit === "percentage") {
        unit = "%";
      }
      text = text + unit + "(" + config.dataFormat.decimalPlaces + ") ";
      return text;
    }
  };
  return mo;
});