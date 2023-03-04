// updating date and time
let dateElement = document.querySelector("#time-now");
let currentTime = new Date();

dateElement.innerHTML = formatDate(currentTime);

function formatDate(date) {
  let hours = date.getHours();
  hours = hours <= 9 ? "0" + hours : hours;
  let minutes = date.getMinutes();
  minutes = minutes <= 9 ? "0" + minutes : minutes;
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
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
    response.data.weather[0].main;
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
  search(city);
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

function celsius(event) {
  event.preventDefault();
  let Cellink = document.querySelector("#temp-now");
  Cellink.innerHTML = 9;
}

function fahrenheit(event) {
  event.preventDefault();
  let Fahrlink = document.querySelector("#temp-now");
  Fahrlink.innerHTML = 48;
}

// Feature 3 - temp changes on click w/ fake data eventually real

let CelLink = document.querySelector("#celsius-link");
CelLink.addEventListener("click", celsius);

let FahrLink = document.querySelector("#fahr-link");
FahrLink.addEventListener("click", fahrenheit);

searchCity("New York");
