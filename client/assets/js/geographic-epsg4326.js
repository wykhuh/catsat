/**
 * GIBS Web Examples
 *
 * Copyright 2013 - 2014 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

window.onload = function() {
    var markers = [], // an array containing all the markers added to the map
    markersCount = 0; // the number of the added markers

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

    // Dragging and dropping the markers to the map
    var addMarkers = function () {
      var url, icon_src;
      // The position of the marker icon
      var posTop = $( '.draggable-marker' ).css( 'top' ),
      posLeft = $( '.draggable-marker' ).css( 'left' );

      $( '.draggable-marker' ).draggable({
        stop: function ( e, ui ) {
          console.log(e.target.src)
          url = e.target.src;
          icon_src=  url.replace(/http:\/\/.*?\//, '')
          console.log('icon',icon_src)
          // returning the icon to the menu
          $( '.draggable-marker' ).css( 'top', posTop );
          $( '.draggable-marker' ).css( 'left', posLeft );

          var coordsX = event.clientX - 50, // 50 is the width of the menu
            coordsY = event.clientY + 20, // 20 is the half of markers height
            point = L.point( coordsX, coordsY ), // createing a Point object with the given x and y coordinates
            markerCoords = map.containerPointToLatLng( point ), // getting the geographical coordinates of the point

            // Creating a custom icon
            myIcon = L.icon({
              iconUrl: icon_src, // the url of the img
              iconSize: [40, 40],
              iconAnchor: [10, 40] // the coordinates of the "tip" of the icon ( in this case must be ( icon width/ 2, icon height )
            });

          // Creating a new marker and adding it to the map
          markers[ markersCount ] = L.marker( [ markerCoords.lat, markerCoords.lng ], {
            draggable: true,
            icon: myIcon
          }).addTo( map );

          markersCount++;
        }
      });
    }

    // initMap();
    addMarkers();

    map.addLayer(layer);
};
