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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 text-center">
        <div class="weather-forecast-date">${formatForecastDay(
          forecastDay.time
        )}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temperature.minimum
          )}°</span
          ><span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}°</span>
        </div>
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayCurrentWeatherConditions(response) {
  let currentTempElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let currentIconElement = document.querySelector("#current-icon");

  celciusTemperature = response.data.temperature.current;

  currentTempElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  currentIconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  currentIconElement.setAttribute("alt", response.data.condition.description);
}

let apiKey = "abda35122eo2d00bt2f4d92b2a100fa2";
let city = "Lisbon";
let apiUrlCurrent = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
axios.get(apiUrlCurrent).then(displayCurrentWeatherConditions);
axios.get(apiUrlForecast).then(displayForecast);

function searchCity(city) {
  let apiKey = "abda35122eo2d00bt2f4d92b2a100fa2";
  let apiUrlCurrent = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrlCurrent).then(displayCurrentWeatherConditions);
  axios.get(apiUrlForecast).then(displayForecast);
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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${currentLon}&lat=${currentLat}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayCurrentWeatherConditions);
}
function giveCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", retrieveValues);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", giveCurrentLocation);
