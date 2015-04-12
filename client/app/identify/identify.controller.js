'use strict';

angular.module('spaceappApp')
  .controller('IdentifyCtrl', function ($scope) {
    $scope.message = 'Hello';

    var dragX, dragY, icon, dragging, positionY, positionX;




    //Start the dragging process
    //Trigger with mousedown event
    function startDrag(){
        console.log('start drag')
        dragX = event.clientX;
        dragY = event.clientY;
        dragging = true;
    }
    //Make each element Draggable
    //Trigger with mousemove event
    function drag(){
                    console.log('dragging', dragging)

        if(dragging){
            console.log('dragging')
            positionY = parseFloat(this.style.marginTop.substr(0,this.style.marginTop.length-1));
            positionX = parseFloat(this.style.marginLeft.substr(0,this.style.marginLeft.length-1));
            positionX+=100*(event.clientX-dragX)/window.innerWidth;
            positionY+=100*(event.clientY-dragY)/window.innerWidth;
            this.style.marginTop = positionY+'%';
            this.style.marginLeft = positionX+'%';
            dragX = event.clientX;
            dragY = event.clientY;
        }
    }
    //End the dragging process
    //Trigger with mouseup event
    function endDrag(){
        dragging = false
        if(this.id == 'menu'){
            localStorage.menuY = JSON.stringify(this.style.marginTop);
            localStorage.menuX = JSON.stringify(this.style.marginLeft);
        }else if(this.id == 'title'){
            localStorage.titleY = JSON.stringify(this.style.marginTop);
            localStorage.titleX = JSON.stringify(this.style.marginLeft);
        }else if(this.id == 'login'){
            localStorage.loginY = JSON.stringify(this.style.marginTop);
            localStorage.loginX = JSON.stringify(this.style.marginLeft);
        }else if(this.id == 'preferences'){
            localStorage.preferencesY = JSON.stringify(this.style.marginTop);
            localStorage.preferencesX = JSON.stringify(this.style.marginLeft);
        }else if(this.id == 'highscore'){
            localStorage.highscoreY = JSON.stringify(this.style.marginTop);
            localStorage.highscoreX = JSON.stringify(this.style.marginLeft);
        }
    }

    icon = document.querySelector('.draggable-marker');
    icon.addEventListener('mousedown', startDrag);
    icon.addEventListener('mousemove', drag);
    icon.addEventListener('mouseup', function(e) {
        console.log('end');
        endDrag();
    });



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
        center: [37.74, 10.94],
        zoom: 3,
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
        // The position of the marker icon
        var posTop = $( '.draggable-marker' ).css( 'top' ),
        posLeft = $( '.draggable-marker' ).css( 'left' );
     
        $( '.draggable-marker' ).draggable({
            stop: function ( e, ui ) {
                // returning the icon to the menu
                $( '.draggable-marker' ).css( 'top', posTop );
                $( '.draggable-marker' ).css( 'left', posLeft );
     
                var coordsX = event.clientX - 50, // 50 is the width of the menu
                    coordsY = event.clientY + 20, // 20 is the half of markers height
                    point = L.point( coordsX, coordsY ), // createing a Point object with the given x and y coordinates
                    markerCoords = map.containerPointToLatLng( point ), // getting the geographical coordinates of the point
     
                    // Creating a custom icon
                    myIcon = L.icon({
                        iconUrl: 'images/marker-icon.png', // the url of the img
                        iconSize: [20, 40],
                        iconAnchor: [10, 40] // the coordinates of the &amp;amp;quot;tip&amp;amp;quot; of the icon ( in this case must be ( icon width/ 2, icon height )
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

    map.addLayer(layer);

  });
