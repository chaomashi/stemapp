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
define([],function(){
  var oThisObject = {

    getOptions: function(i18n) {
      var options = {
        rasterFunctionName: "WeightedOverlay_7_1_9_colormap",
        histogramRasterFunctionName: "WeightedOverlay_7_0_9_histogram",
        rastersInFunction: 15,

        colorMapArgName: "Colormap",

        colormapDefinitions: [
          {
            name: "1_9_green_yellow_red",
            label: i18n.wro.colorRampLabel["Green Yellow Red"],
            colors: [
              {label: i18n.util.colorRamp["1"], value: 1, rgb: [38,115,0]},
              {label: i18n.util.colorRamp["2"], value: 2, rgb: [86,148,0]},
              {label: i18n.util.colorRamp["3"], value: 3, rgb: [39,181,0]},
              {label: i18n.util.colorRamp["4"], value: 4, rgb: [197,219,0]},
              {label: i18n.util.colorRamp["5"], value: 5, rgb: [255,255,0]},
              {label: i18n.util.colorRamp["6"], value: 6, rgb: [255,195,0]},
              {label: i18n.util.colorRamp["7"], value: 7, rgb: [250,142,0]},
              {label: i18n.util.colorRamp["8"], value: 8, rgb: [242,85,0]},
              {label: i18n.util.colorRamp["9"], value: 9, rgb: [230,0,0]}
            ]
          }, {
            name: "1_9_red_yellow_green",
            label: i18n.wro.colorRampLabel["Red Yellow Green"],
            colors: [
              {label: i18n.util.colorRamp["1"], value: 1, rgb: [230,0,0]},
              {label: i18n.util.colorRamp["2"], value: 2, rgb: [242,85,0]},
              {label: i18n.util.colorRamp["3"], value: 3, rgb: [250,142,0]},
              {label: i18n.util.colorRamp["4"], value: 4, rgb: [255,195,0]},
              {label: i18n.util.colorRamp["5"], value: 5, rgb: [255,255,0]},
              {label: i18n.util.colorRamp["6"], value: 6, rgb: [197,219,0]},
              {label: i18n.util.colorRamp["7"], value: 7, rgb: [39,181,0]},
              {label: i18n.util.colorRamp["8"], value: 8, rgb: [86,148,0]},
              {label: i18n.util.colorRamp["9"], value: 9, rgb: [38,115,0]}
            ]
          }, {
            name: "1_9_yellow_to_dark_red",
            label: i18n.wro.colorRampLabel["Yellow to Dark Red"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[255,255,128]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[252,233,106]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[250,209,85]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[247,190,67]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[242,167,46]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[207,122,31]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[173,83,19]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[138,46,10]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[107,0,0]}
            ]
          }, {
            name: "1_9_dark_red_to_yellow",
            label: i18n.wro.colorRampLabel["Dark Red to Yellow"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[107,0,0]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[138,46,10]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[173,83,19]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[207,122,31]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[242,167,46]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[247,190,67]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[250,209,85]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[252,233,106]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[255,255,128]}
            ]
          }, {
            name: "1_9_light_gray_to_dark_gray",
            label: i18n.wro.colorRampLabel["Light Gray to Dark Gray"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[219,219,219]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[196,196,196]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[176,176,176]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[156,156,156]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[135,135,135]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[117,117,117]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[99,99,99]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[84,84,84]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[69,69,69]}
            ]
          }, {
            name: "1_9_dark_gray_to_light_gray",
            label: i18n.wro.colorRampLabel["Dark Gray to Light Gray"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[69,69,69]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[84,84,84]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[99,99,99]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[117,117,117]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[135,135,135]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[156,156,156]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[176,176,176]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[196,196,196]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[219,219,219]}
            ]
          }, {
            name: "1_9_light_brown_to_dark_brown",
            label: i18n.wro.colorRampLabel["Light Brown to Dark Brown"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[250,233,212]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[242,208,184]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[235,187,160]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[224,163,135]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[217,144,113]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[207,124,91]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[194,103,70]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[184,84,53]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[171,65,36]}
            ]
          }, {
            name: "1_9_dark_brown_to_light_brown",
            label: i18n.wro.colorRampLabel["Dark Brown to Light Brown"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[171,65,36]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[184,84,53]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[194,103,70]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[207,124,91]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[217,144,113]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[224,163,135]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[235,187,160]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[242,208,184]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[250,233,212]}
            ]
          }, {
            name: "1_9_full_spectrum_bright_red_to_blue",
            label: i18n.wro.colorRampLabel["Full Spectrum - Bright Red to Blue"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[255,0,0]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[255,119,0]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[255,200,0]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[238,255,56]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[182,255,143]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[89,255,225]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[51,194,255]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[56,106,255]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[0,0,255]}
            ]
          }, {
            name: "1_9_full_spectrum_bright_blue_to_red",
            label: i18n.wro.colorRampLabel["Full Spectrum - Bright Blue to Red"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[0,0,255]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[56,106,255]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[51,194,255]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[89,255,225]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[182,255,143]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[238,255,56]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[255,200,0]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[255,119,0]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[255,0,0]}
            ]
          }, {
            name: "1_9_partial_spectrum_yellow_to_blue",
            label: i18n.wro.colorRampLabel["Partial Spectrum - Yellow to Blue"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[242,241,162]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[252,250,98]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[255,255,0]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[255,149,0]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[255,0,0]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[245,5,189]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[176,7,237]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[99,24,204]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[7,29,173]}
            ]
          }, {
            name: "1_9_partial_spectrum_blue_to_yellow",
            label: i18n.wro.colorRampLabel["Partial Spectrum - Blue to Yellow"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[7,29,173]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[99,24,204]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[176,7,237]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[245,5,189]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[255,0,0]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[255,149,0]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[255,255,0]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[252,250,98]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[242,241,162]}
            ]
          }, {
            name: "1_9_yellow_green_to_dark_blue",
            label: i18n.wro.colorRampLabel["Yellow-Green to Dark Blue"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[255,255,128]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[182,245,88]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[113,235,47]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[59,214,45]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[61,184,104]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[42,156,154]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[33,110,158]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[31,62,140]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[12,16,120]}
            ]
          }, {
            name: "1_9_dark_blue_to_yellow_green",
            label: i18n.wro.colorRampLabel["Dark Blue to Yellow-Green"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[12,16,120]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[31,62,140]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[33,110,158]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[42,156,154]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[61,184,104]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[59,214,45]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[113,235,47]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[182,245,88]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[255,255,128]}
            ]
          }, {
            name: "1_9_cold_to_hot_diverging",
            label: i18n.wro.colorRampLabel["Cold to Hot Diverging"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[40,146,199]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[109,169,179]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[160,194,155]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[206,222,129]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[250,250,100]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[252,196,76]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[250,141,52]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[242,89,34]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[232,16,20]}
            ]
          }, {
            name: "1_9_hot_to_cold_diverging",
            label: i18n.wro.colorRampLabel["Hot to Cold Diverging"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[232,16,20]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[242,89,34]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[250,141,52]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[252,196,76]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[250,250,100]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[206,222,129]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[160,194,155]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[109,169,179]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[40,146,199]}
            ]
          }, {
            name: "1_9_surface_low_to_high",
            label: i18n.wro.colorRampLabel["Surface - Low to High"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[112,153,89]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[176,196,124]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[242,238,162]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[242,224,150]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[242,206,133]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[217,169,130]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[194,140,124]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[255,184,193]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[255,242,255]}
            ]
          }, {
            name: "1_9_surface_high_to_low",
            label: i18n.wro.colorRampLabel["Surface - High to Low"],
            colors: [
              {label: i18n.util.colorRamp["1"], value:1, rgb:[255,242,255]},
              {label: i18n.util.colorRamp["2"], value:2, rgb:[255,184,193]},
              {label: i18n.util.colorRamp["3"], value:3, rgb:[194,140,124]},
              {label: i18n.util.colorRamp["4"], value:4, rgb:[217,169,130]},
              {label: i18n.util.colorRamp["5"], value:5, rgb:[242,206,133]},
              {label: i18n.util.colorRamp["6"], value:6, rgb:[242,224,150]},
              {label: i18n.util.colorRamp["7"], value:7, rgb:[242,238,162]},
              {label: i18n.util.colorRamp["8"], value:8, rgb:[176,196,124]},
              {label: i18n.util.colorRamp["9"], value:9, rgb:[112,153,89]}
            ]
          }
        ]
      };
      return options;
    }

  };
  return oThisObject;
});
