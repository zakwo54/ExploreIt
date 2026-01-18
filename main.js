document.addEventListener("DOMContentLoaded", function () {

  // Initialize map
  var map = L.map("map").setView([20, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // Departure city marker
  L.marker([40.7128, -74.0060])
    .addTo(map)
    .bindPopup("Departure: New York")
    .openPopup();

  // Allowed countries (example)
  var allowedCountries = ["USA", "FRA"];

  // Country styling
  function countryStyle(feature) {
    var iso = feature.properties.ISO_A3;
    var allowed = allowedCountries.includes(iso);

    return {
      fillColor: allowed ? "#2ecc71" : "#bdc3c7",
      weight: 1,
      color: "#555",
      fillOpacity: allowed ? 0.7 : 0.3
    };
  }

  // Load GeoJSON
  fetch("data/countries.geojson")
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        style: countryStyle,
        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.ADMIN);
        }
      }).addTo(map);
    })
    .catch(err => console.error("GeoJSON load failed", err));

});






