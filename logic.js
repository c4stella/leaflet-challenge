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

  // Legend object
  /*
  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'info-legend'),
      grades = [],
      labels = [];
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += '<i style="background:' + '"></i>'
    }
  };
  legend.addTo(map);
  */

}

// Function to define features
function createFeatures(response) {

  // Generates popups at each data point
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${feature.properties.mag}</p><hr><p>${new Date(feature.properties.time)}</p>`);
  }
  
  // Generates circle markers with properties dependent on earthquake magnitude
  function pointToLayer(feature, latlng) {

    var mag = feature.properties.mag;
    var color = '';
    var fillColor = '';
    var radius;

    if (mag >= 5) {
      color = 'red';
      fillColor = '#ff2b1c';
      radius = mag * 1.8;
    }
    else if (mag < 5 && mag >= 4.6) {
      color = 'yellow';
      fillColor = '#ffca1c';
      radius = mag * 1.4;
    }
    
    else if (mag < 4.6) {
      color = 'green';
      fillColor = '#1ef50f';
      radius = mag;
    }

    return L.circleMarker(latlng, {
      radius: radius,
      color: color,
      fillColor: fillColor,
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    })

  }

  // Create a GeoJSON layer, insert the features
  var earthquakes = L.geoJSON(response, {
    onEachFeature: onEachFeature,
    pointToLayer: pointToLayer
  });

  // Create the map
  createMap(earthquakes);
}

// Getting data
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson';
d3.json(url).then(createFeatures);