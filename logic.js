// Getting data
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson';

d3.json(url).then(function (data) {
  createFeatures(data.features);
  console.log(data.features);

});

function createFeatures(earthquakeData) {
  // Create a circle for each feature in the features array
  // The circle sizes should be related to earthquake magnitude
  function eachFeature(features, layer) {
    layer.bindPopup(`<h3>${features.properties.place}</h3><hr><p>${features.properties.mag}</p><hr><p>${new Date(features.properties.time)}</p>`);
  }

  // Create a GeoJSON layer, insert the features
  var earthquakes = L.geoJSON(earthquakeData, {
    eachFeature: eachFeature
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {
  // Base layers
  var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  var topogMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // baseMaps object
  var baseMaps = {
    'Street Map': streetMap,
    'Topographic Map': topogMap
    //'MapTiles': mtilesMap
  };

  // overlay object
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Map object
  var map = L.map('map', {
      center: [40.367, -13.431],
      zoom: 3,
      layers: [streetMap, earthquakes]
  });

  // Layer control
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

}
