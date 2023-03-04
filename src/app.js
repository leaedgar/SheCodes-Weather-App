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
function showTemp(results) {
  let temperature = document.querySelector("#temp-now");
  let degree = Math.round(results.data.main.temp);
  temperature.innerHTML = `${degree}`;
}

function getTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let cityTag = document.querySelector("#city");
  cityTag.innerHTML = city.value;

  let apiKey = "97f8e93f00107773f88eafd933ce86b7";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}

function getCity(result) {
  result.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h5 = document.querySelector("h5");
  if (searchInput.value) {
    h5.innerHTML = `${searchInput.value}`;
  }
  navigator.geolocation.getCurrentPosition(getTemp);
}

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", getTemp);

//Update location with button

//let button = document.querySelector("button");
//button.addEventListener("click", refreshCurrentPosition);

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
