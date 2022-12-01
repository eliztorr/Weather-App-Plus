let now = new Date();
let dateTime = document.querySelector("#current-date-time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

dateTime.innerHTML = `${day} ${hours}:${minutes}`;

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${response.data.name}`;
  h2.innerHTML = `${temperature}°`;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + "km/h";
  document.querySelector("#feels_like").innerHTML =
    Math.round(response.data.main.feels_like) + "º";
}

let form = document.querySelector("#city-search-bar");
function changeCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  let cityInput = document.querySelector("#city-input");
  cityName.innerHTML = cityInput.value;

  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let units = "metric";
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showWeather);
}
form.addEventListener("submit", changeCity);

let currentCityButton = document.querySelector("#current-city");
function showLocalWeather() {
  function getCurrentPosition(geolocation) {
    let latitude = geolocation.coords.latitude;
    let longitude = geolocation.coords.longitude;
    let apiKey = "2ff29bed3181c3526c35cc5408037f85";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

    axios.get(apiUrl).then(showWeather);
  }

  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}
currentCityButton.addEventListener("click", showLocalWeather);

changeCity("Barcelona");
