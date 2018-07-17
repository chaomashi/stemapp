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
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/dom-class',
  'dojo/dom-construct',
  "esri/request"
], function(
  declare,
  lang,
  domClass,
  domConstruct,
  esriRequest
) {

  var weatherInfo = declare('WeatherInfo', null, {

    constructor: function(container, URL, parent) {
      this.container = container;
      this.parent = parent;
      this.weatherURL = URL;
      this.weatherDict = {
        119: ["Cloudy", "cloudy5.png", "cloudy5.png"],
        377: ["Moderate or heavy showers of ice pellets", "hail.png", "hail.png"],
        374: ["Light showers of ice pellets", "hail.png", "hail.png"],
        350: ["Ice pellets", "hail.png", "hail.png"],
        353: ["Light rain shower", "light_rain.png", "light_rain.png"],
        302: ["Moderate rain", "light_rain.png", "light_rain.png"],
        296: ["Light rain", "light_rain.png", "light_rain.png"],
        293: ["Patchy light rain", "light_rain.png", "light_rain.png"],
        266: ["Light drizzle", "light_rain.png", "light_rain.png"],
        263: ["Patchy light drizzle", "light_rain.png", "light_rain.png"],
        122: ["Overcast", "overcast.png", "overcast.png"],
        359: ["Torrential rain shower", "shower3.png", "shower3.png"],
        308: ["Heavy rain", "shower3.png", "shower3.png"],
        365: ["Moderate or heavy sleet showers", "sleet.png", "sleet.png"],
        362: ["Light sleet showers", "sleet.png", "sleet.png"],
        320: ["Moderate or heavy sleet", "sleet.png", "sleet.png"],
        317: ["Light sleet", "sleet.png", "sleet.png"],
        314: ["Moderate or Heavy freezing rain", "sleet.png", "sleet.png"],
        311: ["Light freezing rain", "sleet.png", "sleet.png"],
        284: ["Heavy freezing drizzle", "sleet.png", "sleet.png"],
        281: ["Freezing drizzle", "sleet.png", "sleet.png"],
        185: ["Patchy freezing drizzle nearby", "sleet.png", "sleet.png"],
        182: ["Patchy sleet nearby", "sleet.png", "sleet.png"],
        395: ["Moderate or heavy snow in area with thunder", "snow4.png", "snow4.png"],
        335: ["Patchy heavy snow", "snow4.png", "snow4.png"],
        230: ["Blizzard", "snow4.png", "snow4.png"],
        227: ["Blowing snow", "snow4.png", "snow4.png"],
        371: ["Moderate or heavy snow showers", "snow5.png", "snow5.png"],
        338: ["Heavy snow", "snow5.png", "snow5.png"],
        389: ["Moderate or heavy rain in area with thunder", "tstorm3.png", "tstorm3.png"],
        392: ["Patchy light snow in area with thunder", "snow2.png", "snow2_night.png"],
        386: ["Patchy light rain in area with thunder", "tstorm1.png", "tstorm1_night.png"],
        368: ["Light snow showers", "snow2.png", "snow2_night.png"],
        356: ["Moderate or heavy rain shower", "shower2.png", "shower2_night.png"],
        332: ["Moderate snow", "snow3.png", "snow3_night.png"],
        329: ["Patchy moderate snow", "snow2.png", "snow2_night.png"],
        326: ["Light snow", "snow1.png", "snow1_night.png"],
        323: ["Patchy light snow", "snow1.png", "snow1_night.png"],
        305: ["Heavy rain at times", "shower2.png", "shower2_night.png"],
        299: ["Moderate rain at times", "shower2.png", "shower2_night.png"],
        260: ["Freezing fog", "fog.png", "fog_night.png"],
        248: ["Fog", "fog.png", "fog_night.png"],
        200: ["Thundery outbreaks in nearby", "tstorm1.png", "tstorm1_night.png"],
        179: ["Patchy snow nearby", "snow1.png", "snow1_night.png"],
        176: ["Patchy rain nearby", "shower1.png", "shower1_night.png"],
        143: ["Mist", "mist.png", "mist_night.png"],
        116: ["Partly Cloudy", "cloudy3.png", "cloudy3_night.png"],
        113: ["Clear/Sunny", "sunny.png", "sunny_night.png"]
      };
    },

    // update for Incident
    updateForIncident: function(incident) {
      this.container.innerHTML = "";
      domClass.add(this.container, "loading");
      var geom = incident;
      var loc = incident;
      if (geom.type !== "point") {
        loc = geom.getExtent().getCenter();
      }
      var coords = loc.y + "," + loc.x;
      var query = 'select wind,item.condition from weather.forecast where woeid in' +
        ' (select woeid from geo.places(1) where text="(' + coords + ')")&format=json';
      var requestURL;
      if(this.parent._weatherSource === 'Yahoo') {
        requestURL = this.weatherURL + "&q=" + query;
      } else {
        requestURL = this.weatherURL + "&q=" + coords + "&callbackNode=LocalPerspective";
      }

      var weatherDeferred = esriRequest({
        url: requestURL,
        callbackParamName: "callback"
      }, {
        useProxy: false
      });
      weatherDeferred.then(lang.hitch(this, function(response) {
        var info;
        if(this.parent._weatherSource === 'Yahoo') {
          info = this._resultsHandlerYahoo(response);
        } else {
          info = this._resultsHandlerDarkSky(response);
        }
        return info;
      }), lang.hitch(this, function() {
      }));
    },

    // results handler Yahoo
    _resultsHandlerYahoo: function(response) {
      var info;
      var tpc, div, div2;
      domClass.remove(this.container, "loading");
      if(response.query.results) {
        var code, temp;
        var condition = response.query.results.channel.item.condition;
        var wind = response.query.results.channel.wind;

        this.container.innerHTML = "";


        tpc = domConstruct.create("div", {
          id: "tpc",
          style: "width: 100%;"
        }, this.container);
        domClass.add(tpc, "IMT_tabPanelContent");

        if (condition) {
          // time info
          var timeInfo = 1;
          var obs = condition.date.split(" ");
          var ampm = obs[5];
          var hrArray = obs[4].split(":");
          var hr = parseInt(hrArray[0], 10);
          if (ampm === "AM") {
            if ((hr < 6) || (hr === 12)) {
              timeInfo = 2;
            }
          } else {
            if ((hr > 6) && (hr < 12)) {
              timeInfo = 2;
            }
          }

          if(timeInfo === 1) {
            this.parent.spillTime.setValue('DY');
          } else {
            this.parent.spillTime.setValue('NTE');
          }

          // current
          temp = condition.temp;
          code = parseInt(condition.code, 10);
          info = this.parent.nls.temperature + "<br/><img style='height:45px' src='" +
            this.parent.folderUrl + "images/w/yahoo/" + code + ".png' /><br/>" + temp + "&deg;";
          if (this.parent.config.celsius) {
            info = info + " " + this.parent.nls.c;
          } else {
            info = info + " " + this.parent.nls.f;
          }
          div = domConstruct.create("div", {
            innerHTML: info
          }, tpc);
          domClass.add(div, "ERGcolSmall");

          // wind
          // calculate the wind direction as a compass point
          var val = Math.floor((wind.direction / 22.5) + 0.5);
          var arr = ["N", "NNE", "NE", "ENE", "E", "ESE",
            "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
          var winddir16Point = arr[(val % 16)];

          var windSpeedUnits = " MPH";

          info = this.parent.nls.wind + "<br/><span style='font-size: 30px; line-height:47px'>" +
            winddir16Point + "</span><br/>" + wind.speed + windSpeedUnits;
          div2 = domConstruct.create("div", {
            innerHTML: info
          }, tpc);
          domClass.add(div2, "ERGcolSmall");

          this.parent.windDirection.setValue(parseFloat(wind.direction));

          if(wind.speed <= 6){
            this.parent.windSpeed.setValue('LOW');
          } else if (wind.speed > 6 && wind.speed <= 12) {
            this.parent.windSpeed.setValue('MOD');
          } else {
            this.parent.windSpeed.setValue('HI');
          }

          // credits
          this._addCredits(this.parent._weatherSource);
        }
      } else {
        this._resetWeatherInfo(this.parent._weatherSource,this.parent.nls.weatherErrorMessage);
      }
    },

    // results handler DarkSky
    _resultsHandlerDarkSky: function(response) {
      var data = response.data;
      var current = data.current_condition;

      this.container.innerHTML = "";
      domClass.remove(this.container, "loading");

      var tpc = domConstruct.create("div", {
        id: "tpc",
        style: "width: 100%;"
      }, this.container);
      domClass.add(tpc, "IMT_tabPanelContent");

      var cur, code, temp, w, info;
      if (current.length > 0) {
        cur = current[0];

        // time info
        var timeInfo = 1;
        var obs = cur.localObsDateTime.split(" ");
        var ampm = obs[2];
        var hrArray = obs[1].split(":");
        var hr = parseInt(hrArray[0], 10);
        if (ampm === "AM") {
          if ((hr < 6) || (hr === 12)) {
            timeInfo = 2;
          }
        } else {
          if ((hr > 6) && (hr < 12)) {
            timeInfo = 2;
          }
        }

        if(timeInfo === 1) {
          this.parent.spillTime.setValue('DY');
        } else {
          this.parent.spillTime.setValue('NTE');
        }

        // current
        temp = cur.temp_F;
        if (this.parent.config.celsius) {
          temp = cur.temp_C;
        }
        code = cur.weatherCode;
        w = this.weatherDict[parseInt(code, 10)];
        info = this.parent.nls.temperature + "<br/><img style='height:45px' src='" +
          this.parent.folderUrl + "images/w/" + w[timeInfo] + "' /><br/>" + temp + "&deg;";
        if (this.parent.config.celsius) {
          info = info + " " + this.parent.nls.c;
        } else {
          info = info + " " + this.parent.nls.f;
        }
        var div = domConstruct.create("div", {
          innerHTML: info
        }, tpc);
        domClass.add(div, "ERGcolSmall");

        // wind
        var windSpeed = cur.windspeedMiles;
        var windSpeedUnits = " MPH";
        if (this.parent.config.celsius) {
          windSpeed = cur.windspeedKmph;
          windSpeedUnits = " KMPH";
        }
        var windDir = cur.winddir16Point;

        info = this.parent.nls.wind + "<br/><span style='font-size: 30px; line-height:47px'>" +
          windDir + "</span><br/>" + windSpeed + windSpeedUnits;
        var div2 = domConstruct.create("div", {
          innerHTML: info
        }, tpc);
        domClass.add(div2, "ERGcolSmall");

        switch(windDir){
          case 'N':
            this.parent.windDirection.setValue('180.0');
            break;
          case 'NNE':
            this.parent.windDirection.setValue('202.5');
            break;
          case 'NE':
            this.parent.windDirection.setValue('225.0');
            break;
          case 'ENE':
            this.parent.windDirection.setValue('247.5');
            break;
          case 'E':
            this.parent.windDirection.setValue('270.0');
            break;
          case 'ESE':
            this.parent.windDirection.setValue('292.5');
            break;
          case 'SE':
            this.parent.windDirection.setValue('315.0');
            break;
          case 'SSE':
            this.parent.windDirection.setValue('337.5');
            break;
          case 'S':
            this.parent.windDirection.setValue('0.0');
            break;
          case 'SSW':
            this.parent.windDirection.setValue('22.5');
            break;
          case 'SW':
            this.parent.windDirection.setValue('45.0');
            break;
          case 'WSW':
            this.parent.windDirection.setValue('67.5');
            break;
          case 'W':
            this.parent.windDirection.setValue('90.0');
            break;
          case 'WNW':
            this.parent.windDirection.setValue('112.5');
            break;
          case 'NW':
            this.parent.windDirection.setValue('135.0');
            break;
          case 'NNW':
            this.parent.windDirection.setValue('157.5');
            break;
        }

        if(cur.windspeedMiles <= 6){
          this.parent.windSpeed.setValue('LOW');
        } else if (windSpeed > 6 && windSpeed <= 12) {
          this.parent.windSpeed.setValue('MOD');
        } else {
          this.parent.windSpeed.setValue('HI');
        }
      }

      // credits
      this._addCredits(this.parent._weatherSource);
    },

    /**
    * reset the weather info
    **/
    _resetWeatherInfo: function (source,message) {
      var info;
      this.container.innerHTML = "";
      var tpc = domConstruct.create("div", {
        id: "tpc",
        style: "width: 100%;"
      }, this.container);
      domClass.add(tpc, "IMT_tabPanelContent");

      // current
      info = "<img style='height:76px' src='" + this.parent.folderUrl + "images/w/dunno.png' />";
      var div = domConstruct.create("div", {
        innerHTML: info
      }, tpc);
      domClass.add(div, "ERGcolSmallUnknown");

      info = '<span>' + message + '</span>';

      var div2 = domConstruct.create("div", {
        innerHTML: info
      }, tpc);
      domClass.add(div2, "ERGcolSmall");

      // credits
      this._addCredits(source);
    },

    _addCredits: function (source) {
      var txt;
      // credits
      if(source === 'Yahoo') {
        txt = "<a style='color:#6e6e6e;text-decoration:none'" +
         "href='https://www.yahoo.com/news/weather/' title='Yahoo Weather' target='_blank'>"+
         "<img style='height:36px;margin-top: 10px;' src='" +
          this.parent.folderUrl  + "images/yahoo.png' />" +
          '<br /><span style="font-size:11px;color:#6e6e6e">Powered by<br/>' +
          'Yahoo</a></span>';
      } else {
        txt = "<a style='color:#6e6e6e;text-decoration:none'" +
         "href='https://darksky.net/poweredby/' title='Dark Sky' target='_blank'>"+
         "<img style='height:36px;margin-top: 10px;' src='" +
          this.parent.folderUrl  + "images/darksky.png' />" +
          '<br /><span style="font-size:11px;color:#6e6e6e">Powered by<br/>' +
          'Dark Sky</a></span>';
      }
      var divCredit  = domConstruct.create("div", {
        innerHTML: txt
      }, tpc);
      domClass.add(divCredit, "ERGcolSmall");
      domClass.add(divCredit, "ERGcolLast");
    },

    // error handler
    _errorHandler: function() {
      domClass.remove(this.container, "loading");
    }
  });

  return weatherInfo;

});