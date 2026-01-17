// Initialize the map
var map = L.map('map').setView([20, 0], 2); // Center on [lat, lon], zoom level 2

// Add OpenStreetMap tile layer (free)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Optional test marker
L.marker([0, 0]).addTo(map)
    .bindPopup('Equator / Prime Meridian')
    .openPopup();

console.log("Leaflet map loaded.");

