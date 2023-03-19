// updating date and time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  hours = hours <= 9 ? "0" + hours : hours;
  let minutes = date.getMinutes();
  minutes = minutes <= 9 ? "0" + minutes : minutes;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="row gx-1 gy-2 row-margin align-items-center">
        <div class="col-4">
          <span class="conditions-label-day">${formatDay(forecastDay.dt)}</span>
        </div>
        <div class="col-4">
          <span class="weather-icon-mini">
            <img src="resources/${
              forecastDay.weather[0].icon
            }.png" alt="" id="icon" />
          </span>
        </div>
        <div class="col-2">
          <span class="conditions-label-high">${Math.round(
            forecastDay.temp.max
          )}°</span>
        </div>
        <div class="col-2">
          <span class="conditions-label-low">${Math.round(
            forecastDay.temp.min
          )}°</span>
        </div>
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "97f8e93f00107773f88eafd933ce86b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

// replace city name by search & current temp with real data
function displayWeatherConditions(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#time-now").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute("src", `resources/${response.data.weather[0].icon}.png`);

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "97f8e93f00107773f88eafd933ce86b7";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "97f8e93f00107773f88eafd933ce86b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Update location with button

let button = document.querySelector("#update-city-btn");
button.addEventListener("click", getCurrentLocation);

//switch from cel to fahr

function displayFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-now");
  celLink.classList.remove("active");
  fahrLink.classList.add("active");
  let fahrTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-now");
  celLink.classList.add("active");
  fahrLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", displayFahrenheit);

let celLink = document.querySelector("#celsius-link");
celLink.addEventListener("click", displayCelsius);

searchCity("New York");
