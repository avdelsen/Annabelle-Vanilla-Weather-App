function formattedDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let number = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let formattedDate = `${day} ${number} ${month} ${year}, ${hour}:${minute}`;
  return formattedDate;
}
let now = new Date();
let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = formattedDate(now);

function displayCurrentWeatherConditions(response) {
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#current-min-temp").innerHTML = Math.round(
    response.data.temperature.minimum
  );
  document.querySelector("#current-max-temp").innerHTML = Math.round(
    response.data.temperature.miximum
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let apiKey = "abda35122eo2d00bt2f4d92b2a100fa2";
let city = "Lisbon";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayCurrentWeatherConditions);

function searchCity(city) {
  let apiKey = "abda35122eo2d00bt2f4d92b2a100fa2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeatherConditions);
}

function retrieveValues(event) {
  event.preventDefault();
  let city = document.querySelector("#searchbar-city").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "abda35122eo2d00bt2f4d92b2a100fa2";
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${currentLon}&lat=${currentLat}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherConditions);
}
function giveCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", retrieveValues);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", giveCurrentLocation);
