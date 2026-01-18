document.addEventListener("DOMContentLoaded", function () {

  // ----------------------------
  // 1. Initialize the map
  // ----------------------------
  var map = L.map("map").setView([20, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // ----------------------------
  // 2. Departure city marker
  // (hardcoded for now)
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
  // Countries in this list are ALLOWED
  // All others will be greyed out
  // ----------------------------
  var allowedCountries = ["USA", "FRA"];

  // ----------------------------
  // 4. Load countries dataset
  // ----------------------------
  fetch("data/countries.json")
    .then(response => response.json())
    .then(countries => {

      countries.forEach(country => {

        var isAllowed = allowedCountries.includes(country.iso);

        var color = isAllowed ? "green" : "grey";

        L.circleMarker([country.lat, country.lon], {
          radius: 6,
          color: color,
          fillColor: color,
          fillOpacity: 0.6
        })
          .addTo(map)
          .bindPopup(country.name);
      });

    })
    .catch(error => {
      console.error("Error loading countries.json:", error);
    });

  console.log("Map, countries, and departure marker loaded.");

});




