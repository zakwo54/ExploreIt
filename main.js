document.addEventListener("DOMContentLoaded", function () {

  var map = L.map("map").setView([20, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  L.marker([40.7128, -74.0060])
    .addTo(map)
    .bindPopup("Departure: New York");

  var geoLayer;
  var countryData;

  function getAllowedCountries() {
    var climate = document.getElementById("climate").value;

    if (climate === "warm") {
      return ["BRA", "THA", "IDN", "ESP", "MEX"];
    }

    if (climate === "cold") {
      return ["NOR", "SWE", "CAN", "FIN"];
    }

    return []; // empty = all grey for now
  }

  function styleCountry(feature) {
    var allowed = getAllowedCountries().includes(feature.properties.ISO_A3);

    return {
      fillColor: allowed ? "#2ecc71" : "#bdc3c7",
      weight: 1,
      color: "#555",
      fillOpacity: allowed ? 0.7 : 0.3
    };
  }

  fetch("data/countries.geojson")
    .then(res => res.json())
    .then(data => {
      countryData = data;

      geoLayer = L.geoJSON(countryData, {
        style: styleCountry,
        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.ADMIN);
        }
      }).addTo(map);
    });

  document.getElementById("climate").addEventListener("change", function () {
    geoLayer.setStyle(styleCountry);
  });

});
