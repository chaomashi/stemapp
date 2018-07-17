///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
/**
 *  @fileOverview Contains constants used by GridOverlay widgets.
 *  @author Esri
 */

/**
 *  @module constants
 *  @description Contains constants used by GridOverlay widgets.
 *  @author Esri
 */

define([], function() {

  /** @namespace */
  return {

    /**
     * MGRS zones are 6 degrees wide
     * @instance
     * @default
     */
    "ZONE_WIDTH_DEGREES": 6,

    /**
     * MGRS zones are 8 degrees tall
     * @instance
     * @default
     */
    "ZONE_HEIGHT_DEGREES": 8,

    /**
     * MGRS is only valid between -80 -> 84 degrees latitude
     * @instance
     * @default
     */
    "MIN_MGRS_LATITUDE": -80,

    /**
     * MGRS is only valid between -80 -> 84 degrees latitude
     * @instance
     * @default
     */
    "MAX_MGRS_LATITUDE": 84,

    /**
     * Used to convert 180 to a slightly smaller number since it
     * causes problems when drawing graphics
     * @instance
     * @default
     */
    "POSITIVE_180": 179.99999999,

    /**
     * Used to convert -180 to a slightly larger number since
     * it causes problems when drawing graphics
     * @instance
     * @default
     */
    "NEGATIVE_180": -179.99999999,

    /**
     * The westernmost, normalized Geographic longitude
     * (i.e. the International Date Line; longitude 180°W)
     * @instance
     * @default
     */
    "WEST_GEOGRAPHIC_LIMIT": -180,

    /**
     * The easternmost, normalized Geographic longitude
     * (i.e. the International Date Line; longitude 180°E)
     * @instance
     * @default
     */
    "EAST_GEOGRAPHIC_LIMIT": 180,

    /**
     * The westernmost, normalized Web Mercator x
     * (i.e. the International Date Line; longitude 180°W)
     * @instance
     * @default
     */

    /**
     * The entire span of the X axis in Geographics degrees (360° of longitude)
     * @instance
     * @default
     */
    "GEOGRAPHIC_360": 360,

    "WEST_WEBMERCATOR_LIMIT": -20037508.342789244,

    /**
     * The easternmost, normalized Web Mercator x
     * (i.e. the International Date Line; longitude 180°E)
     * @instance
     * @default
     */
    "EAST_WEBMERCATOR_LIMIT": 20037508.342789244,

    /**
     * The entire span of the X axis in web mercator units (equivalent to 360° of longitude)
     * @instance
     * @default
     */
    "WEBMERCATOR_360": 40075016.68557849,

    /**
     * Defined by the equation: 360° / (2 * Math.PI)
     * @instance
     * @default
     */
    "DEGREES_PER_RADIAN": 57.29577951308232,

    /**
     * Defined by the equation: (2 * Math.PI) / 360°
     * @instance
     * @default
     */
    "RADIANS_PER_DEGREE": 0.017453292519943295,

    /**
     * The equatorial radius of the earth, using reference earth model WGS84
     * @instance
     * @default
     */
    "WGS84_EQUATORIAL_RADIUS": 6378137.0,

    /**
     * One half of the WGS84_EQUATORIAL_RADIUS,
     * used to slightly speed up conversion to web mercator
     * @instance
     * @default
     */
    "WGS84_HALF_EQUATORIAL_RADIUS": 3189068.5,

    /**
     * One half of Math.PI, used to slightly speed up conversion to web mercator
     * @instance
     * @default
     */
    "HALF_PI": 1.5707963267948966

  };
});
