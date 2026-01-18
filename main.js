document.addEventListener("DOMContentLoaded", function () {

  var map = L.map("map").setView([20, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  L.marker([40.7128, -74.0060])
    .addTo(map)
    .bindPopup("New York")
    .openPopup();

});


