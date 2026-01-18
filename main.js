document.addEventListener("DOMContentLoaded", function () {

  console.log("JS loaded");

  // Map
  var map = L.map("map").setView([20, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // Marker
  L.marker([40.7128, -74.0060])
    .addTo(map)
    .bindPopup("Departure: New York");

  var geoLayer;

  // Initial style: ALL GREY
  function greyStyle() {
    return {
      fillColor: "#bdc3c7",
      weight: 1,
      color: "#555",
      fillOpacity: 0.3
    };
  }

  // Second style: ONLY USA GREEN
  function usaStyle(feature) {
    var iso = feature.properties.ISO_A3;

    return {
      fillColor: iso === "USA" ? "#2ecc71" : "#bdc3c7",
      weight: 1,
      color: "#555",
      fillOpacity: iso === "USA" ? 0.7 : 0.3
    };
  }

  // Load countries
  fetch("data/countries.geojson")
    .then(res => res.json())
    .then(data => {
      console.log("GeoJSON loaded");

      geoLayer = L.geoJSON(data, {
        style: greyStyle,
        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.ADMIN);
        }
      }).addTo(map);

      // FORCE style change after 2 seconds
      setTimeout(function () {
        console.log("Applying USA style");
        geoLayer.setStyle(usaStyle);
      }, 2000);
    })
    .catch(err => console.error(err));

});


});

