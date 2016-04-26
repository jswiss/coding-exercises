var myMap = L.map('mapid').setView([-4.3001, 15.2795], 13);

var tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoianN3aXNzIiwiYSI6ImNpbjVwbmtiYzAwdjh2cG0xM2JzeDd6MWkifQ.7_yacqyKAOejNInPvmmaew'
});


var marker = L.marker([-4.3044, 15.3142]);

var circle = L.circle([-4.3044, 15.3142], 500, {
  color: 'red',
  fillColor: '##f03',
  fillOpacity: 0.5
});

var popUp = L.popup();

function onMapClick(e) {
    popUp
        .setLatLng(e.latlng)
        .setContent("You clicked the map at  " + e.latlng.toString())
        .openOn(myMap);
}



tileLayer.addTo(myMap);
marker.addTo(myMap);
circle.addTo(myMap);


myMap.on('click', onMapClick);
