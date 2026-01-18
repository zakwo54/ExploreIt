document.addEventListener("DOMContentLoaded", function () {

  // ----------------------------
  // 1. Initialize map
  // ----------------------------
  var map = L.map("map").setView([20, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // ----------------------------
  // 2. Departure city marker
  // ----------------------------
  var departureCity = {
    name: "New York",
    lat: 40.7128,
    lon: -74.0060
  };

  L.marker([departureCity.lat, departureCity.lon])
    .addTo(map)
    .bindPopup("Departure: " + departureCity.name)
    .openPopup();

  // ----------------------------
  // 3. Example filter logic
  // Countries NOT in this list are greyed out
  // ----------------------------
  var allowedCountries = ["USA", "FRA"];

  // ----------------------------
  // 4. Style function for countries
  // ----------------------------
  function countryStyle(feature) {
    var iso = feature.properties.ISO_A3;
    var isAllowed = allowedCountries.includes(iso);

    return {
      fillColor: isAllowed ? "#2ecc71" : "#bdc3c7",
      weight: 1,
      opacity: 1,
      color: "#555",
      fillOpacity: isAllowed ? 0.7 : 0.3
    };
  }

  // ----------------------------
  // 5. Load and draw countries
  // ----------------------------
  fetch("data/countries.geojson")
    .then(response => response.json())
    .then(data => {

      L.geoJSON(data, {
        style: countryStyle,
        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.ADMIN);
        }
      }).addTo(map);

    })
    .catch(error => {
      console.error("Error loading GeoJSON:", error);
    });

  console.log("Country polygons loaded.");

});





