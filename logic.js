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
  var legend = L.control({position: 'bottomright', collapsed: false});
  legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'info-legend'),
      labels = ['<strong>Earthquake Depth</strong>'],
      depths = ['5','5-20','20-40','40+']
      div.innerHTML = labels.join('<br>')
    for (var i = 0; i < depths.length; i++) {
      div.innerHTML += '<i style="background:' + depths[i] +'"></i> ' + depths[i] + '<br>'
    }
    return div;
  };
  legend.addTo(map);

}

// Function to define features
function createFeatures(response) {
  //console.log(response.features);

  // Generates popups at each data point
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}</p><hr><p>Date of Occurrence: ${new Date(feature.properties.time)}</p>`);
  }
  
  // Generates circle markers with properties dependent on earthquake magnitude
  function pointToLayer(feature, latlng) {

    //Defining variables
    var mag = feature.properties.mag;
    var depth = feature.geometry.coordinates[2];
    var color = '';
    var fillColor = '';
    var radius;

    // Conditionals to define size of circle
    if (mag >= 6) {
      radius = mag * 2.5;
    }
    else if (mag < 6 && mag >= 4.5) {
      radius = mag * 2;
    }
    else if (mag < 4.5 && mag >= 3) {
      radius = mag * 1.5;
    }
    else if (mag < 3) {
      radius = mag;
    }

    // Conditionals to define colors
    if (depth >= 40) {
      color = 'red';
      fillColor = '#ff2b1c';
    }
    else if (depth < 40 && depth >= 20) {
      color = 'orange';
      fillColor = '#fc8803';
    }
    else if (depth < 20 && depth >= 5) {
      color = 'yellow';
      fillColor = '#ffca1c';
    }
    else if (depth < 5) {
      color = 'green';
      fillColor = '#1ef50f';
    }
    
    // Create circle marker at location of earthquake
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
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson';

d3.json(url).then(createFeatures);