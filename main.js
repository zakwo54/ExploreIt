document.addEventListener("DOMContentLoaded", function () {

  // Initialize map
  var map = L.map("map").setView([20, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // Departure marker
  L.marker([40.7128, -74.0060])
    .addTo(map)
    .bindPopup("Departure: New York")
    .openPopup();

  // Allowed countries
  var allowedCountries = ["USA", "FRA"]; // should match ISO3166-1-Alpha-3 in full GeoJSON
  var geoLayer;

  // Style function
  function countryStyle(feature) {
    var iso = feature.properties["ISO3166-1-Alpha-3"];
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
      geoLayer = L.geoJSON(data, {
        style: countryStyle,
        onEachFeature: function(feature, layer) {
          layer.bindPopup(feature.properties.name);
        }
      }).addTo(map);
    })
    .catch(err => console.error("Failed to load countries.geojson", err));

});




