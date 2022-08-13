'use strict';


const weather = document.querySelector("#weather span");
const city = document.querySelector("#weather h3");
const API_KEY = "6bc8791961c1d561525e083b23165e7f";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `날씨: ${data.weather[0].main} / 기온: ${parseInt(data.main.temp - 273.15)}℃`;
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);