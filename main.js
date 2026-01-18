document.addEventListener("DOMContentLoaded", function () {

  // ----------------------------
  // Initialize map
  // ----------------------------
  var map = L.map("map").setView([20, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // Departure marker
  var departureCity = { name: "New York", lat: 40.7128, lon: -74.0060 };
  L.marker([departureCity.lat, departureCity.lon])
    .addTo(map)
    .bindPopup("Departure: " + departureCity.name)
    .openPopup();

  // ----------------------------
  // Load GeoJSON for countries
  // ----------------------------
  var geoLayer;
  fetch("data/countries.geojson")
    .then(res => res.json())
    .then(geoData => {
      geoLayer = L.geoJSON(geoData, {
        style: defaultStyle,
        onEachFeature: function(feature, layer) {
          layer.bindPopup(feature.properties.name);
        }
      }).addTo(map);
    })
    .catch(err => console.error("Failed to load countries.geojson", err));

  function defaultStyle(feature) {
    return {
      fillColor: "#bdc3c7",
      weight: 1,
      color: "#555",
      fillOpacity: 0.3
    };
  }

  // ----------------------------
  // Apply filters and update map
  // ----------------------------
  function applyFilters() {
    var month = document.getElementById("month").value;
    var climate = document.getElementById("climate").value;

    fetch("data/country_temperatures.json")
      .then(res => res.json())
      .then(countries => {

        // Filter based on thresholds
        var matching = countries.filter(c => {
          var temp = c.temperatures[month];
          if (climate === "hot") return temp >= 20;
          if (climate === "mild") return temp >= 10 && temp < 20;
          if (climate === "cold") return temp < 10;
        });

        // Update map colors
        geoLayer.setStyle(feature => {
          var iso = feature.properties["ISO3166-1-Alpha-3"];
          var isMatch = matching.some(c => c.country === iso);
          return {
            fillColor: isMatch ? "#2ecc71" : "#bdc3c7",
            weight: 1,
            color: "#555",
            fillOpacity: isMatch ? 0.7 : 0.3
          };
        });

        // Update recommendations
        var mainRec = matching[0] || null;
        document.getElementById("mainRecommendation").innerText = mainRec ? mainRec.name : "None";

        var altList = document.getElementById("alternatives");
        altList.innerHTML = "";
        matching.slice(1, 4).forEach(c => {
          var li = document.createElement("li");
          li.innerText = c.name;
          altList.appendChild(li);
        });

        // Zoom to main recommendation
        if (mainRec && mainRec.cities && mainRec.cities.length > 0) {
          var city = mainRec.cities[0];
          map.setView([city.lat, city.lon], 5);
        }

      })
      .catch(err => console.error("Failed to load country_temperatures.json", err));
  }

  document.getElementById("applyFilters").addEventListener("click", applyFilters);

});






