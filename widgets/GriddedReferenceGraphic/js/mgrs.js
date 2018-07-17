//// ***************************************************************************
// *  usng.js  (U.S. National Grid functions)
// *  Module to calculate National Grid Coordinates
// ****************************************************************************/
//
// Copyright (c) 2009 Larry Moore, jane.larry@gmail.com
// Released under the MIT License; see
// http://www.opensource.org/licenses/mit-license.php
// or http://en.wikipedia.org/wiki/MIT_License
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
//
//*****************************************************************************
define([
  "esri/geometry/Point"
], function(
  Point
) {
  var k0 = 0.9996; // scale factor of central meridian
  var er; // equatorial radius
  var e2; // eccentricity squared = 2f - f^2 (f = flattening)
  var e2ps; // eccentricity prime squared = e2 / (1-e2)
  // WGS84
  er = 6378137.0; // WGS_1984
  e2 = 0.006694379990;
  // NAD83
  //er    = 6378137.0; // GRS_1980
  //e2 = 0.006694380023;
  // NAD27
  //er    = 6378206.4  // Clarke_1866
  //e2 = 0.006768658;
  e2ps = e2 / (1 - e2);
  // variable used in inverse formulas (UTMtoLL function)
  var E1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));
  return {
    setSpheroid: function(id) {
      id = id.toUpperCase();
      switch (id) {
        case "AIRY 1830": er = 6377563.396; e2 = 0.00667053999998536; break;
        case "AIRY MODIFIED": er = 6377340.189; e2 = 0.00667053999998536; break;
        case "AVERAGE TERRESTRIAL SYSTEM 1977": er = 6378135; e2 = 0.00669438499958795; break;
        case "AUSTRALIAN NATIONAL": er = 6378160; e2 = 0.00669454185458764; break;
        case "BESSEL 1841": er = 6377397.155; e2 = 0.00667437223180214; break;
        case "BESSEL MODIFIED": er = 6377492.018; e2 = 0.00667437223180214; break;
        case "BESSEL NAMIBIA": er = 6377483.865; e2 = 0.00667437223180214; break;
        case "CLARKE 1858": er = 6378293.639; e2 = 0.00678514600473303; break;
        case "NAD27":
        case "CLARKE 1866": er = 6378206.4; e2 = 0.00676865799760964; break;
        case "CLARKE 1866 MICHIGAN": er = 6378450.047; e2 = 0.00676865830738507; break;
        case "CLARKE 1880": er = 6378249.138; e2 = 0.00680348101883452; break;
        case "CLARKE 1880 (ARC)": er = 6378249.145; e2 = 0.00680348101883452; break;
        case "CLARKE 1880 (BENOIT)": er = 6378300.79; e2 = 0.00680348271028565; break;
        case "CLARKE 1880 (IGN)": er = 6378249.2; e2 = 0.00680348767623919; break;
        case "CLARKE 1880 (RGS)": er = 6378249.145; e2 = 0.00680351128284906; break;
        case "CLARKE 1880 (SGA)": er = 6378249.2; e2 = 0.00680348860198551; break;
        case "EVEREST 1830 (DEFINITION)": er = 6377299.36; e2 = 0.00663784663019969; break;
        case "EVEREST 1830 (MODIFIED)": er = 6377304.063; e2 = 0.00663784663019969; break;
        case "EVEREST (ADJUSTMENT 1937)": er = 6377276.345; e2 = 0.00663784663019969; break;
        case "EVEREST (DEFINITION 1962)": er = 6377301.243; e2 = 0.00663784606842344; break;
        case "EVEREST (DEFINITION 1967)": er = 6377298.556; e2 = 0.00663784663019969; break;
        case "EVEREST (DEFINITION 1975)": er = 6377299.151; e2 = 0.00663784606842344; break;
        case "NAD83":
        case "GEM GRAVITY POTENTIAL MODEL":
        case "GRS 1980": er = 6378137; e2 = 0.00669438002290079; break;
        case "GRS 1967 = INTERNATIONAL 1967": er = 6378160; e2 = 0.00669460532856765; break;
        case "HELMERT 1906": er = 6378200; e2 = 0.00669342162296594; break;
        case "INDONESIAN NATIONAL": er = 6378160; e2 = 0.0066946090804091; break;
        case "INTERNATIONAL 1924": er = 6378388; e2 = 0.00672267002233332; break;
        case "INTERNATIONAL 1967": er = 6378160; e2 = 0.00669454185458764; break;
        case "KRASOVSKY 1940": er = 6378245; e2 = 0.00669342162296594; break;
        case "TRANSIT PRECISE EPHEMERIS": er = 6378145; e2 = 0.00669454185458764; break;
        case "OSU 1986 GEOIDAL MODEL": er = 6378136.2; e2 = 0.00669438006997852; break;
        case "OSU 1991 GEOIDAL MODEL": er = 6378136.3; e2 = 0.00669438006997852; break;
        case "PLESSIS 1817": er = 6376523; e2 = 0.00646954373789485; break;
        case "STRUVE 1860": er = 6378298.3; e2 = 0.00677435980080942; break;
        case "WAR OFFICE": er = 6378300.583; e2 = 0.00674534331628926; break;
        case "NWL-10D == WGS 1972": er = 6378135; e2 = 0.00669431777826672; break;
        case "WGS 1972": er = 6378135; e2 = 0.00669431777826672; break;
        case "WGS84":
        case "WGS 1984": er = 6378137; e2 = 0.00669437999014132; break;
        case "WGS 1966": er = 6378145; e2 = 0.00669454185458764; break;
        case "FISCHER 1960": er = 6378166; e2 = 0.00669342162296594; break;
        case "FISCHER 1968": er = 6378150; e2 = 0.00669342162296594; break;
        case "FISCHER MODIFIED": er = 6378155; e2 = 0.00669342162296594; break;
        case "HOUGH 1960": er = 6378270; e2 = 0.00672267002233332; break;
        case "EVEREST MODIFIED 1969": er = 6377295.664; e2 = 0.00663784663019969; break;
        case "WALBECK": er = 6376896; e2 = 0.00659454809414964; break;
        case "GRS 1967 TRUNCATED": er = 6378160; e2 = 0.00669454185458764; break;
      }
      e2ps = e2 / (1 - e2);
      // variable used in inverse formulas (UTMtoLL function)
      E1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));
    },
    getSpheroidList: function() {
      return [
        "AIRY 1830",
        "AIRY MODIFIED",
        "AUSTRALIAN NATIONAL",
        "AVERAGE TERRESTRIAL SYSTEM 1977",
        "BESSEL 1841",
        "BESSEL MODIFIED",
        "BESSEL NAMIBIA",
        "CLARKE 1858",
        "CLARKE 1866 MICHIGAN",
        "CLARKE 1866",
        "CLARKE 1880 (ARC)",
        "CLARKE 1880 (BENOIT)",
        "CLARKE 1880 (IGN)",
        "CLARKE 1880 (RGS)",
        "CLARKE 1880 (SGA)",
        "CLARKE 1880",
        "EVEREST (ADJUSTMENT 1937)",
        "EVEREST (DEFINITION 1962)",
        "EVEREST (DEFINITION 1967)",
        "EVEREST (DEFINITION 1975)",
        "EVEREST 1830 (DEFINITION)",
        "EVEREST 1830 (MODIFIED)",
        "EVEREST MODIFIED 1969",
        "FISCHER 1960",
        "FISCHER 1968",
        "FISCHER MODIFIED",
        "GEM GRAVITY POTENTIAL MODEL",
        "GRS 1967 = INTERNATIONAL 1967",
        "GRS 1967 TRUNCATED",
        "GRS 1980",
        "HELMERT 1906",
        "HOUGH 1960",
        "INDONESIAN NATIONAL",
        "INTERNATIONAL 1924",
        "INTERNATIONAL 1967",
        "KRASOVSKY 1940",
        "NWL-10D == WGS 1972",
        "OSU 1986 GEOIDAL MODEL",
        "OSU 1991 GEOIDAL MODEL",
        "PLESSIS 1817",
        "STRUVE 1860",
        "TRANSIT PRECISE EPHEMERIS",
        "WALBECK",
        "WAR OFFICE",
        "WGS 1966",
        "WGS 1972",
        "WGS 1984"
      ];
    },
    getZoneNumber: function(lat, lon) {
      lat = parseFloat(lat);
      lon = parseFloat(lon);
      // check input
      if (lon > 360 || lon < -180) {
        while (lon < -180) {lon += 360;}
        while (lon > 180) {lon -= 360;}
      }
      if (lon > 360 || lon < -180 || lat > 90 || lat < -90) {
        //debugger;
      }
      // convert 0-360 to [-180 to 180] range
      // FIXED: var lonTemp = (lon + 180) - parseInt((lon + 180) / 360, 10) * 360 - 180;
      var lonTemp = (lon + 180) - Math.floor((lon + 180) / 360) * 360 - 180;
      // FIXED: var zoneNumber = parseInt((lonTemp + 180) / 6, 10) + 1;
      var zoneNumber = Math.floor((lonTemp + 180) / 6) + 1;
      // There are special UTM zones between 0 degrees and 36 degrees longitude above 72
      // degrees latitude and a special zone 32 between 56 degrees and 64 degrees north latitude:
      //  -UTM Zone 32 has been widened to 9° (at the expense of zone 31) between
      //   latitudes 56° and 64° (band V) to accommodate southwest Norway. Thus
      //   zone 32 it extends westwards to 3°E in the North Sea.
      //  -Similarly, between 72° and 84° (band X), zones 33 and 35 have been widened
      //   to 12° to accommodate Svalbard. To compensate for these 12° wide zones,
      //   zones 31 and 37 are widened to 9° and zones 32, 34, and 36 are eliminated.
      //   Thus the W and E boundaries of zones are
      //     31: 0 - 9 E
      //     33: 9 - 21 E
      //     35: 21 - 33 E
      //     37: 33 - 42 E
      //
      // Handle special case of west coast of Norway
      if (lat >= 56.0 && lat < 64.0 && lonTemp >= 3.0 && lonTemp < 12.0) {
        zoneNumber = 32;
      }
      // Special zones for Svalbard
      if (lat >= 72.0 && lat < 84.0) {
        if (lonTemp >= 0.0 && lonTemp < 9.0) {
          zoneNumber = 31;
        } else if (lonTemp >= 9.0 && lonTemp < 21.0) {
          zoneNumber = 33;
        } else if (lonTemp >= 21.0 && lonTemp < 33.0) {
          zoneNumber = 35;
        } else if (lonTemp >= 33.0 && lonTemp < 42.0) {
          zoneNumber = 37;
        }
      }
      return zoneNumber;
    },
    LLtoUTM: function(lat, lon, zone) {
      // Converts lat/lon to UTM coords
      //
      // Output is in the input array utmcoords
      //  utmcoords[0] = easting
      //  utmcoords[1] = northing (NEGATIVE value in southern hemisphere)
      //  utmcoords[2] = zone
      //
      lat = parseFloat(lat);
      lon = parseFloat(lon);
      // Constrain reporting USNG coords to the latitude range [80S .. 84N]
      if (lat > 84.0 || lat < -80.0) {
        return "undefined, ensure 84N > Lat > 80S";
      }
      // sanity check on input - turned off when testing with Generic Viewer
      if (lon > 360 || lon < -180) {
        while (lon < -180) {lon += 360;}
        while (lon > 180) {lon -= 360;}
      }
      if (lon > 360 || lon < -180 || lat > 90 || lat < -90) {
        //debugger;
      }
      // Make sure the longitude is between -180.00 .. 179.99..
      // Convert values on 0-360 range to this range.
      // FIXED:
      var lonTemp, latRad, lonRad, zoneNumber, lonOrigin, lonOriginRad, UTMZone, N, T, C, A, M;
      // FIXED: lonTemp = (lon + 180) - parseInt((lon + 180) / 360, 10) * 360 - 180;
      lonTemp = (lon + 180) - Math.floor((lon + 180) / 360) * 360 - 180;
      latRad = lat * Math.PI / 180;
      lonRad = lonTemp * Math.PI / 180;
      // user-supplied zone number will force coordinates to be computed in a particular zone
      if (!zone) {
        zoneNumber = this.getZoneNumber(lat, lon);
      } else {
        zoneNumber = zone;
      }
      lonOrigin = (zoneNumber - 1) * 6 - 180 + 3; // +3 puts origin in middle of zone
      lonOriginRad = lonOrigin * Math.PI / 180;
      // compute the UTM Zone from the latitude and longitude
      UTMZone = zoneNumber + "" + this.UTMLetterDesignator(lat) + " ";
      N = er / Math.sqrt(1 - e2 * Math.sin(latRad) * Math.sin(latRad));
      T = Math.tan(latRad) * Math.tan(latRad);
      C = e2ps * Math.cos(latRad) * Math.cos(latRad);
      A = Math.cos(latRad) * (lonRad - lonOriginRad);
      // Note that the term Mo drops out of the "M" equation, because phi
      // (latitude crossing the central meridian, lambda0, at the origin of the
      //  x,y coordinates), is equal to zero for UTM.
      M = er * ((1 - e2 / 4 - 3 * (e2 * e2) / 64 - 5 * (e2 * e2 * e2) / 256) *
        latRad - (3 * e2 / 8 + 3 * e2 * e2 / 32 + 45 * e2 * e2 * e2 / 1024) *
        Math.sin(2 * latRad) + (15 * e2 * e2 / 256 + 45 * e2 * e2 * e2 / 1024) *
        Math.sin(4 * latRad) - (35 * e2 * e2 * e2 / 3072) * Math.sin(6 * latRad));
      var UTMEasting = (k0 * N * (A + (1 - T + C) * (A * A * A) / 6 +
        (5 - 18 * T + T * T + 72 * C - 58 * e2ps) * (A * A * A * A * A) / 120) + 500000.0);
      var UTMNorthing = (k0 * (M + N * Math.tan(latRad) * ((A * A) / 2 +
        (5 - T + 9 * C + 4 * C * C) * (A * A * A * A) / 24 + (61 - 58 * T +
          T * T + 600 * C - 330 * e2ps) * (A * A * A * A * A * A) / 720)));
      var UTMcoordinates = UTMZone + " " + Math.round(UTMEasting);
      if (UTMNorthing < 0) {
        UTMcoordinates = UTMcoordinates + "mE " + Math.round(10000000 + UTMNorthing) + "mN";
      } else {
        UTMcoordinates = UTMcoordinates + "mE " + Math.round(UTMNorthing) + "mN";
      }
      return [UTMEasting, UTMNorthing, zoneNumber];
    },
    LLtoUSNG: function(lat, lon, precision, zone) {
      // Converts lat/lon to USNG coordinates
      precision = precision || 5; // 5 = 1m precision
      // user-supplied zone number will force coordinates to be computed in a particular zone
      // FIXED:
      var zoneNumber;
      if (!zone) {
        zoneNumber = this.getZoneNumber(lat, lon);
      } else {
        zoneNumber = zone;
      }
      lat = parseFloat(lat);
      lon = parseFloat(lon);
      // convert lat/lon to UTM coordinates
      var coords = this.LLtoUTM(lat, lon, zoneNumber);
      var UTMEasting = coords[0];
      var UTMNorthing = coords[1];
      // then convert UTM to USNG
      // southern hemisphere case
      if (lat < 0) {
        // Use offset for southern hemisphere
        UTMNorthing += 10000000.0;
      }
      var USNGLetters = this.findGridLetters(zoneNumber, UTMNorthing, UTMEasting);
      var USNGNorthing = Math.round(UTMNorthing) % 100000;
      var USNGEasting = Math.round(UTMEasting) % 100000;
      // added... truncate digits to achieve specified precision
      USNGNorthing = Math.floor(USNGNorthing / Math.pow(10, (5 - precision)));
      USNGEasting = Math.floor(USNGEasting / Math.pow(10, (5 - precision)));
      var USNG = this.getZoneNumber(lat, lon) + 
        this.UTMLetterDesignator(lat) + " " + USNGLetters + " ";
      // REVISIT: Modify to incorporate dynamic precision ?
      for (var i = String(USNGEasting).length; i < precision; i++) {
        USNG += "0";
      }
      USNG += USNGEasting + " ";
      for (i = String(USNGNorthing).length; i < precision; i++) {
        USNG += "0";
      }
      USNG += USNGNorthing;
      return USNG;
    },
    UTMLetterDesignator: function(lat) {
      // determines the correct UTM letter designator for the given
      // latitude ('C' to 'X'; 'Z' if latitude is outside the UTM limits of 84N to 80S)
      lat = parseFloat(lat);
      var letterDesignator;
      if ((84 >= lat) && (lat >= 72)) {
        letterDesignator = "X";
      } else if ((72 > lat) && (lat >= 64)) {
        letterDesignator = "W";
      } else if ((64 > lat) && (lat >= 56)) {
        letterDesignator = "V";
      } else if ((56 > lat) && (lat >= 48)) {
        letterDesignator = "U";
      } else if ((48 > lat) && (lat >= 40)) {
        letterDesignator = "T";
      } else if ((40 > lat) && (lat >= 32)) {
        letterDesignator = "S";
      } else if ((32 > lat) && (lat >= 24)) {
        letterDesignator = "R";
      } else if ((24 > lat) && (lat >= 16)) {
        letterDesignator = "Q";
      } else if ((16 > lat) && (lat >= 8)) {
        letterDesignator = "P";
      } else if ((8 > lat) && (lat >= 0)) {
        letterDesignator = "N";
      } else if ((0 > lat) && (lat >= -8)) {
        letterDesignator = "M";
      } else if ((-8 > lat) && (lat >= -16)) {
        letterDesignator = "L";
      } else if ((-16 > lat) && (lat >= -24)) {
        letterDesignator = "K";
      } else if ((-24 > lat) && (lat >= -32)) {
        letterDesignator = "J";
      } else if ((-32 > lat) && (lat >= -40)) {
        letterDesignator = "H";
      } else if ((-40 > lat) && (lat >= -48)) {
        letterDesignator = "G";
      } else if ((-48 > lat) && (lat >= -56)) {
        letterDesignator = "F";
      } else if ((-56 > lat) && (lat >= -64)) {
        letterDesignator = "E";
      } else if ((-64 > lat) && (lat >= -72)) {
        letterDesignator = "D";
      } else if ((-72 > lat) && (lat >= -80)) {
        letterDesignator = "C";
      } else {
        letterDesignator = "Z"; // error flag
      }
      return letterDesignator;
    },
    findSet: function(zoneNum) {
      // There are six unique sets, corresponding to individual grid numbers in
      // sets 1-6, 7-12, 13-18, etc. Set 1 is the same as sets 7, 13, ..;
      // Set 2 is the same as sets 8, 14, ..
      zoneNum = parseInt(zoneNum, 10);
      zoneNum = zoneNum % 6;
      switch (zoneNum) {
        case 0:
          return 6;
        case 1:
          return 1;
        case 2:
          return 2;
        case 3:
          return 3;
        case 4:
          return 4;
        case 5:
          return 5;
        default:
          return -1;
      }
    },
    findGridLetters: function(zoneNum, northing, easting) {
      //Retrieve the square identification for a given coordinate pair & zone
      //See "lettersHelper" function documentation for more details.
      zoneNum = parseInt(zoneNum, 10);
      northing = parseFloat(northing);
      easting = parseFloat(easting);
      var row = 1;
      // northing coordinate to single-meter precision
      var north_1m = Math.round(northing);
      // Get the row position for the square identifier that contains the point
      while (north_1m >= 100000) {
        north_1m = north_1m - 100000;
        row++;
      }
      // cycle repeats (wraps) after 20 rows
      row = row % 20;
      var col = 0;
      // easting coordinate to single-meter precision
      var east_1m = Math.round(easting);
      // Get the column position for the square identifier that contains the point
      while (east_1m >= 100000) {
        east_1m = east_1m - 100000;
        col++;
      }
      // cycle repeats (wraps) after 8 columns
      col = col % 8;
      return this.lettersHelper(this.findSet(zoneNum), row, col);
    },
    lettersHelper: function(set, row, col) {
      // Retrieve the Square Identification (two-character letter code), for the
      // given row, column and set identifier
      // handle case of last row
      if (row === 0) {
        row = 20 - 1;
      } else {
        row--;
      }
      // handle case of last column
      if (col === 0) {
        col = 8 - 1;
      } else {
        col--;
      }
      var l1, l2;
      switch (set) {
        case 1:
          l1 = "ABCDEFGH"; // column ids
          l2 = "ABCDEFGHJKLMNPQRSTUV"; // row ids
          return l1.charAt(col) + l2.charAt(row);
        case 2:
          l1 = "JKLMNPQR";
          l2 = "FGHJKLMNPQRSTUVABCDE";
          return l1.charAt(col) + l2.charAt(row);
        case 3:
          l1 = "STUVWXYZ";
          l2 = "ABCDEFGHJKLMNPQRSTUV";
          return l1.charAt(col) + l2.charAt(row);
        case 4:
          l1 = "ABCDEFGH";
          l2 = "FGHJKLMNPQRSTUVABCDE";
          return l1.charAt(col) + l2.charAt(row);
        case 5:
          l1 = "JKLMNPQR";
          l2 = "ABCDEFGHJKLMNPQRSTUV";
          return l1.charAt(col) + l2.charAt(row);
        case 6:
          l1 = "STUVWXYZ";
          l2 = "FGHJKLMNPQRSTUVABCDE";
          return l1.charAt(col) + l2.charAt(row);
      }
    },
    UTMtoLL: function(UTMNorthing, UTMEasting, UTMZoneNumber) {
      // convert UTM coords to decimal degrees
      //    Expected Input args:
      //      UTMNorthing   : northing-m (numeric), eg. 432001.8
      //    southern hemisphere NEGATIVE from equator ('real' value - 10,000,000)
      //      UTMEasting    : easting-m  (numeric), eg. 4000000.0
      //      UTMZoneNumber : 6-deg longitudinal zone (numeric), eg. 18
      //
      // remove 500,000 meter offset for longitude
      var xUTM = parseFloat(UTMEasting) - 500000.0;
      var yUTM = parseFloat(UTMNorthing);
      var zoneNumber = parseInt(UTMZoneNumber, 10);
      // origin longitude for the zone (+3 puts origin in zone center)
      var lonOrigin = (zoneNumber - 1) * 6 - 180 + 3;
      // M is the "true distance along the central meridian from the Equator to phi
      // (latitude)
      var M = yUTM / k0;
      var mu = M / (er * (1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256));
      // phi1 is the "footprint latitude" or the latitude at the central meridian which
      // has the same y coordinate as that of the point (phi (lat), lambda (lon) ).
      var phi1Rad = mu + (3 * E1 / 2 - 27 * E1 * E1 * E1 / 32) *
      Math.sin(2 * mu) + (21 * E1 * E1 / 16 - 55 * E1 * E1 * E1 * E1 / 32) *
      Math.sin(4 * mu) + (151 * E1 * E1 * E1 / 96) * Math.sin(6 * mu);
      //var phi1 = phi1Rad * 180.0 / Math.PI;
      // Terms used in the conversion equations
      var N1 = er / Math.sqrt(1 - e2 * Math.sin(phi1Rad) * Math.sin(phi1Rad));
      var T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
      var C1 = e2ps * Math.cos(phi1Rad) * Math.cos(phi1Rad);
      var R1 = er * (1 - e2) / Math.pow(1 - e2 * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
      var D = xUTM / (N1 * k0);
      // Calculate latitude, in decimal degrees
      var lat = phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (D * D / 2 -
        (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * e2ps) *
        D * D * D * D / 24 + (61 + 90 *
        T1 + 298 * C1 + 45 * T1 * T1 - 252 * e2ps - 3 * C1 * C1) * D * D * D * D * D * D / 720);
      lat = lat * 180.0 / Math.PI;
      // Calculate longitude, in decimal degrees
      var lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 *
        C1 * C1 + 8 * e2ps + 24 * T1 * T1) * D * D * D * D * D / 120) /
        Math.cos(phi1Rad);
      lon = lonOrigin + lon * 180.0 / Math.PI;
      var ret = {};
      ret.lat = lat;
      ret.lon = lon;
      return ret;
    },
    USNGtoUTM: function(zone, ltr, sq1, sq2, east, north) {
      //Starts (southern edge) of N-S zones in millons of meters
      var zoneBase = [
        1.1, 2.0, 2.9, 3.8, 4.7, 5.6, 6.5,
        7.3, 8.2, 9.1, 0, 0.8, 1.7, 2.6,
        3.5, 4.4, 5.3, 6.2, 7.0, 7.9
      ];//Starts of 2 million meter segments, indexed by zone
      var segBase = [0, 2, 2, 2, 4, 4, 6, 6, 8, 8, 0, 0, 0, 2, 2, 4, 4, 6, 6, 6];
      // convert easting to UTM
      var eSqrs = "ABCDEFGHJKLMNPQRSTUVWXYZ".indexOf(sq1);
      var appxEast = 1 + eSqrs % 8;
      // convert northing to UTM
      var letNorth = "CDEFGHJKLMNPQRSTUVWX".indexOf(ltr);
      var nSqrs;
      if (zone % 2) {//odd number zone
        nSqrs = "ABCDEFGHJKLMNPQRSTUV".indexOf(sq2);
      } else {// even number zone
        nSqrs = "FGHJKLMNPQRSTUVABCDE".indexOf(sq2);
      }
      var zoneStart = zoneBase[letNorth];
      var appxNorth = Number(segBase[letNorth]) + nSqrs / 10;
      if (appxNorth < zoneStart) {
        appxNorth += 2;
      }
      var ret = {};
      ret.N = appxNorth * 1000000 + Number(north) * Math.pow(10, 5 - north.length);
      ret.E = appxEast * 100000 + Number(east) * Math.pow(10, 5 - east.length);
      ret.zone = zone;
      ret.letter = ltr;
      return ret;
    },
    USNGtoLL: function(usngStr_input) {
      // parse a USNG string and feed results to USNGtoUTM, then the results of that to UTMtoLL
      var usngp = this.parseUSNG_str(usngStr_input);
      // convert USNG coords to UTM; this routine counts digits and sets precision
      var coords = this.USNGtoUTM(usngp.zone, usngp.ltr,
        usngp.sq1, usngp.sq2, usngp.east, usngp.north);
      // southern hemisphere case
      if (usngp.ltr < "N") {
        coords.N -= 10000000.0;
      }
      coords = this.UTMtoLL(coords.N, coords.E, usngp.zone);
      return [coords.lat, coords.lon];
    },
    parseUSNG_str: function(usngStr_input) {
      // convert lower-case characters to upper case, remove space delimeters,
      // separate string into parts
      var usngStr = [];
      // FIXED:
      var usngStr_temp = usngStr_input.toUpperCase();
      // put usng string in 'standard' form with no space delimiters
      var regexp = /%20/g;
      usngStr = usngStr_temp.replace(regexp, "");
      regexp = / /g;
      usngStr = usngStr_temp.replace(regexp, "");
      if (usngStr.length < 7) {
        return 0;
      }
      // break usng string into its component pieces
      var parts = {};
      var j = 0;
      parts.zone = usngStr.charAt(j++) * 10 + usngStr.charAt(j++) * 1;
      parts.ltr = usngStr.charAt(j++);
      parts.sq1 = usngStr.charAt(j++);
      parts.sq2 = usngStr.charAt(j++);
      parts.precision = (usngStr.length - j) / 2;
      parts.east = "";
      parts.north = "";
      for (var k = 0; k < parts.precision; k++) {
        parts.east += usngStr.charAt(j++);
      }
      if (usngStr[j] === " ") {
        j++;
      }
      for (k = 0; k < parts.precision; k++) {
        parts.north += usngStr.charAt(j++);
      }
      return parts;
    },
    isUSNG: function(inputStr) {
      // checks a string to see if it is valid USNG;
      //  if so, returns the string in all upper case, no delimeters
      //  if not, returns 0
      //var j = 0;
      //var k;
      var strregexp;
      // convert all letters to upper case
      var usngStr = inputStr.toUpperCase();
      // get rid of space delimeters
      var regexp = /%20/g;
      usngStr = usngStr.replace(regexp, "");
      regexp = / /g;
      usngStr = usngStr.replace(regexp, "");
      if (usngStr.length > 15) {
        return 0;
      }
      strregexp = new RegExp("^[0-9]{2}[CDEFGHJKLMNPQRSTUVWX]$");
      if (usngStr.match(strregexp)) {
        return 0;
      }
      strregexp = new RegExp(
        "^[0-9]{2}[CDEFGHJKLMNPQRSTUVWX]" +
        "[ABCDEFGHJKLMNPQRSTUVWXYZ][ABCDEFGHJKLMNPQRSTUV]([0-9][0-9]){0,5}");
      if (!usngStr.match(strregexp)) {
        return 0;
      }
      if (usngStr.length < 7) {
        return 0;
      }
      return usngStr;
    },
    LLtoMGRS: function(lat, lon, precision) {
      // remove spaces from USNG string to produce MGRS string
      precision = precision || 5; // 5 = 1m precision
      var usng_str = this.LLtoUSNG(lat, lon, precision);
      return usng_str.replace(/ /g, "");
    },
    USNGtoPoint: function(str) {
      // wrapper function specific to Esri ArcGIS JS API
      // makes a conversion from USNG string to lat/lng, return a esri.geometry.Point
      var latlng = this.USNGtoLL(str);
      return new Point(latlng[1], latlng[0]);
    },
    pointToUSNG: function(pt, precision) {
      var lat = pt.getLatitude();
      var lon = pt.getLongitude();
      return this.LLtoUSNG(lat,lon,precision);
    },
    LLtoUSNG_nad27: function(lat, lon, precision) {
      precision = precision || 5; // 5 = 1m precision
      var usngstr;
      // set to NAD27
      // FIXED:
      var er, e2;
      er = 6378206.4; // Clarke_1866
      e2 = 0.006768658;
      usngstr = this.LLtoUSNG(lat, lon, precision);
      // reset back to WGS84
      er = 6378137.0; // WGS_1984
      e2 = 0.006694379990;
      return usngstr + " (NAD27)";
    }
  };
});
