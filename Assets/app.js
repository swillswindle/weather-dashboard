let apiKey = "ab2d4cc2d733b26518e0c51a8bc25223";
let city = "San Diego";
let temp = document.getElementById("temp");
let wind = document.getElementById("wind");
let hum = document.getElementById("hum");
let uv = document.getElementById("uv");
// console.log(locationURL);

let today = new Date();

let cards = Array.from(document.getElementsByClassName("card"));

console.log(cards);

// function getCity(event) {
//     event.preventDefault()
//   let form = document.getElementById("searchfield");
//   city = form.value;

// }

async function getLocation() {
    event.preventDefault()
  let form = document.getElementById("searchfield").value;
  city = form;
  let locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
  let location = await (await fetch(locationURL)).json();
  console.log(location);
  lat = location[0].lat;
  lon = location[0].lon;
  let queryURL =
    "http://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey +
    "&units=imperial&exclude=minutely,hourly,alerts";

  let weather = await (await fetch(queryURL)).json();
  console.log(weather);
  let cityName = document.getElementById("city-name");
  cityName.innerHTML =
    weather.timezone +
    " (" +
    (today.getMonth() + 1) +
    "/" +
    today.getDate() +
    "/" +
    today.getFullYear() +
    ")";

  let iconID = weather.current.weather[0].icon;
  let iconURL = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";
  console.log(iconURL);
  document.getElementById("icon").src = iconURL;

  temp.innerHTML = "Temp: " + weather.current.temp + "&#176;F";
  wind.innerHTML = "Wind: " + weather.current.wind_speed + " MPH";
  hum.innerHTML = "Humidity: " + weather.current.humidity + "%";
  uv.innerHTML = "UV Index: " + weather.current.uvi;
  let i = 0;
  cards.forEach((card) => {
    var day = new Date(weather.daily[i].dt * 1000);
    console.log(weather.daily[i].dt);
    console.log(i);
    var date =
      day.getMonth() + 1 + "/" + day.getDate() + "/" + day.getFullYear();

    var icon = weather.daily[i].weather[0].icon;
    var temp = weather.daily[i].temp.day;
    var wind = weather.daily[i].wind_speed;
    var hum = weather.daily[i].humidity;

    card.innerHTML = `<h4>${date}</h4>
    <img src="http://openweathermap.org/img/wn/${icon}@2x.png"" alt="">
    <p>Temp: ${temp}&#176;F</p>
    <p>Wind: ${wind} MPH</p>
    <p>Humidity: ${hum}%</p>`;
    i++;
  });
  localStorage.city1 = city
}

getLocation();

form.addEventListener("submit", getLocation);

// function writeHistory

// console.log(queryURL);

// async function getWeather() {
//   let weather = await (await fetch(queryURL)).json();
//   console.log(weather);
//   let cityName = document.getElementById("city-name");
//   cityName.innerHTML =
//     weather.timezone +
//     " (" +
//     (today.getMonth() + 1) +
//     "/" +
//     today.getDate() +
//     "/" +
//     today.getFullYear() +
//     ")";

//   let iconID = weather.current.weather[0].icon;
//   let iconURL = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";
//   console.log(iconURL);
//   document.getElementById("icon").src = iconURL;

//   temp.innerHTML = "Temp: " + weather.current.temp + "&#176;F";
//   wind.innerHTML = "Wind: " + weather.current.wind_speed + " MPH";
//   hum.innerHTML = "Humidity: " + weather.current.humidity + "%";
//   uv.innerHTML = "UV Index: " + weather.current.uvi;
//   let i = 0;
//   cards.forEach((card) => {
//     var day = new Date(weather.daily[i].dt * 1000);
//     console.log(weather.daily[i].dt);
//     console.log(i);
//     var date =
//       day.getMonth() + 1 + "/" + day.getDate() + "/" + day.getFullYear();

//     var icon = weather.daily[i].weather[0].icon;
//     var temp = weather.daily[i].temp.day;
//     var wind = weather.daily[i].wind_speed;
//     var hum = weather.daily[i].humidity;

//     card.innerHTML = `<h4>${date}</h4>
//     <img src="http://openweathermap.org/img/wn/${icon}@2x.png"" alt="">
//     <p>Temp: ${temp}&#176;F</p>
//     <p>Wind: ${wind} MPH</p>
//     <p>Humidity: ${hum}%</p>`;
//     i++;
//   });
// }