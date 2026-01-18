document.addEventListener("DOMContentLoaded", function () {

  // ----------------------------
  // Map setup
  // ----------------------------
  var map = L.map("map").setView([20, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // Departure marker
  L.marker([40.7128, -74.0060])
    .addTo(map)
    .bindPopup("Departure: New York");

  // ----------------------------
  // State
  // ----------------------------
  var allowedCountries = [];
  var geoLayer;

  // ----------------------------
  // Country style
  // ----------------------------
  function countryStyle(feature) {
    var iso = feature.properties.ISO_A3;
    var allowed = allowedCountries.length === 0 || allowedCountries.includes(iso);

    return {
      fillColor: allowed ? "#2ecc71" : "#bdc3c7",
      weight: 1,
      color: "#555",
      fillOpacity: allowed ? 0.7 : 0.3
    };
  }

  // ----------------------------
  // Load GeoJSON
  // ----------------------------
  fetch("data/countries.geojson")
    .then(res => res.json())
    .then(data => {
      geoLayer = L.geoJSON(data, {
        style: countryStyle,
        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.ADMIN);
        }
      }).addTo(map);
    });

  // ----------------------------
  // Filter logic
  // ----------------------------
  document.getElementById("climate").addEventListener("change", function () {
    var value = this.value;

    if (value === "warm") {
      allowedCountries = ["BRA", "THA", "IDN", "ESP", "MEX"];
    } else if (value === "cold") {
      allowedCountries = ["NOR", "SWE", "CAN", "FIN"];
    } else {
      allowedCountries = []; // empty = allow all
    }

    geoLayer.setStyle(countryStyle);
  });

});

