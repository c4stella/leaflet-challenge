// Base layers
var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

// Map object
var map = L.map('map', {
    center: [40.367, -13.431],
    zoom: 3,
    layers: streetMap
});