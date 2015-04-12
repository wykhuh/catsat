'use strict';

angular.module('spaceappApp')
  .controller('IdentifyCtrl', function ($scope) {

      var EPSG4326 = new L.Proj.CRS(
          "EPSG:4326",
          "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs", {
              origin: [-180, 90],
              resolutions: [
                  0.5625,
                  0.28125,
                  0.140625,
                  0.0703125,
                  0.03515625,
                  0.017578125,
                  0.0087890625,
                  0.00439453125,
                  0.002197265625
              ],
              // Values are x and y here instead of lat and long elsewhere.
              bounds: [
                 [-180, -90],
                 [180, 90]
              ]
          }
      );

      var map = L.map("map", {
          center: [0, 0],
          zoom: 2,
          maxZoom: 8,
          crs: EPSG4326,
          maxBounds: [
              [-120, -220],
              [120, 220]
          ]
      });

      var template =
          "//map1{s}.vis.earthdata.nasa.gov/wmts-geo/" +
          "{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg";

      var layer = L.tileLayer(template, {
          layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
          tileMatrixSet: "EPSG4326_250m",
          time: "2013-11-04",
          tileSize: 512,
          subdomains: "abc",
          noWrap: true,
          continuousWorld: true,
          // Prevent Leaflet from retrieving non-existent tiles on the
          // borders.
          bounds: [
              [-89.9999, -179.9999],
              [89.9999, 179.9999]
          ]

      });

      map.addLayer(layer);

  });
