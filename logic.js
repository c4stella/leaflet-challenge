// Function to define map
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

// Function to define features
function createFeatures(response) {
  // Create a circle for each feature in the features array
  // The circle sizes should be related to earthquake magnitude
  ///*

  // this section probably not needed
  var allEarthquakes = response.features;
  console.log(allEarthquakes);

  /*
  var eqMarkers = [];

  for (var i = 0; i < allEarthquakes.length; i++) {
    var quake = allEarthquakes[i];

    var coord = quake.geometry.coordinates;
    var lat = coord[0];
    var lng = coord[1];

    var mag = quake.properties.mag;

    eqMarkers.push(
      L.circle([lat, lng], {
        radius: mag * 100
      })
    );
  }
  */

  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${feature.properties.mag}</p><hr><p>${new Date(feature.properties.time)}</p>`);
  }
  
  // TEST pointToLayer FUNCTION
  /*
  function pointToLayer(feature, latlng) {

    feature.length;
    feature.properties.mag

    for (var i = 0; i < allEarthquakes.length; i++) {
      var quake = allEarthquakes[i];
      var mag = quake.properties.mag;
      var color = '';
      var fillColor = '';
      var radius;

      if (mag >= 7) {
        color = 'red';
        fillColor: '#ff2b1c';
      }
      else if (mag >= 5) {
        color = 'yellow';
        fillColor: '#ffca1c';
      }
      else {
        color = 'green';
        fillColor: '#1ef50f';
      }

      return L.circleMarker(latlng, {
        radius: mag * 100,
        color: color,
        fillColor: fillColor,
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      })

    }

  }
  */

  // Create a GeoJSON layer, insert the features
  var earthquakes = L.geoJSON(response, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 10,
        color: 'blue',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      })

    }
  });

  createMap(earthquakes);
}

// Getting data
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson';

d3.json(url).then(createFeatures);