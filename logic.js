// Getting data
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson';

d3.json(url).then(function (data) {
  //createFeatures(data.features);
  console.log(data.features);
});

/*
function createFeatures(earthquakeData) {
  // Create a circle for each feature in the features array
  // The circle sizes should be related to earthquake magnitude

  // Create a GeoJSON layer, insert the features
  var earthquakes = L.geoJSON(earthquakeData, )
}
*/

// Base layers
var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

var topogMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

/*
L.tileLayer('https://api.mapbox.com/v4/{tileset_id}/{zoom}/{x}/{y}{@2x}.{format}', {
  attribution: `© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>`
});
*/

// baseMaps object
var baseMaps = {
  'Street Map': streetMap,
  'Topographic Map': topogMap
};

// Map object
var map = L.map('map', {
    center: [40.367, -13.431],
    zoom: 3,
    layers: streetMap
});

// Layer control
L.control.layers(baseMaps).addTo(map);