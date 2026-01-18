document.addEventListener("DOMContentLoaded", function() {
    // Initialize map
    var map = L.map('map').setView([20, 0], 2);

    // OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    console.log("Leaflet map loaded.");

    // Load countries dataset
    fetch('data/countries.json')
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                // Add a marker at each country's lat/lon
                L.circleMarker([country.lat, country.lon], {
                    radius: 5,
                    color: 'blue',
                    fillColor: 'blue',
                    fillOpacity: 0.5
                }).addTo(map)
                .bindPopup(country.name);
            });
        });
});



