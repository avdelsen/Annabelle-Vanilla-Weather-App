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
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayCurrentWeatherConditions);
