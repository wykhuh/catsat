'use strict';

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


var createMap = function(name, lat,long){
  return L.map(name, {
          center: [lat, long],
          zoom: 2,
          maxZoom: 8,
          crs: EPSG4326,
          maxBounds: [
              [-120, -220],
              [120, 220]
          ]
  });
};

// create map
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


angular.module('spaceappApp')
  .controller('VoteNewestCtrl', function ($scope, api){
    var maps, map;

    // api.getNewest().then(
    //   function(res) {
    //     for(var i = 0; i < 5; i++) {
    //       var map;
    //       map = createMap('map'+i, 0,0);
    //     }
    //   }
    // )
  })

  .controller('VoteMostVotesCtrl', function ($scope, api){

    
  })

  .controller('VoteCtrl', function ($scope, Auth, api) {


    var addMarker = function (tag){
      var icon, url, id, user, data = {};

      icon = L.icon({
          iconUrl: '/assets/images/' + tag.tag + '_icon.png',
          iconSize:  [50, 50], // size of the icon
          className: 'data-id-'+tag.id
      });

      L.marker([tag.latitude, tag.longitude], {icon: icon}).addTo(map)
        .on('click', function(e){

          url = e.target.options.icon.options.className;
          data.id = url.replace('data-id-','');
          data.user = Auth.getCurrentUser().name;

          api.castVote(data);

        });
    };


    var map = createMap('map', 0,0);


    // get tags information
    var tags = [
      {latitude: 90, longitude: 40, voters: 4, tag: 'cloud', id: 1},
      {latitude: 0, longitude: 0, voters: 1, tag: 'cloud', id:2}
    ];

    tags.forEach(function(tag){
      console.log(tag.voters);
      addMarker(tag);

    });


    map.addLayer(layer);


  });
