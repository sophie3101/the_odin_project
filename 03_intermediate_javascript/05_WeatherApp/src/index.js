import Favicon from "./modules/Favicon";
import Footer from "./modules/Footer";
import SearchBar from "./modules/SearchBar";
import WeatherDisplay from "./modules/WeatherDisplay";
import Weather from "./modules/Weather";
import { getCoordinates, getWeatherData } from "./modules/services";

require("./modules/Styles/style.css");
const icons = {
  highTemp: require("./images/high-temperature.png"),
  lowTemp: require("./images/low-temperature.png"),
  sunset: require("./images/sunset.png"),
  sunrise: require("./images/sunrise.png"),
  wind: require("./images/wind.png"),
  humidity: require("./images/humidity.png"),
};
document.head.appendChild(Favicon(require("./images/weather.png")));

document.body.appendChild(SearchBar(require("./images/search.png")));

document.body.appendChild(
  Footer(
    "https://github.com/sophie3101/the_odin_project/tree/main/03_intermediate_javascript/05_WeatherApp"
  )
);

document.querySelector(".searchButton").onclick = (e) => {
  e.preventDefault();
  const searchCityName = document.querySelector(".searchTerm").value;
  if (searchCityName.length !== 0) {
    try {
      displayWeather(searchCityName);
    } catch {
      console.error("ERROR");
    }
  }
};
const displayWeather = (cityName) => {
  console.log("city name ", cityName);
  getCoordinates(cityName)
    .then((coordinate) => getWeatherData(coordinate))
    .then((data) => {
      console.log(data);
      const weatherObj = Weather(data);
      // console.log(weatherObj);
      const weatherSection = WeatherDisplay(weatherObj, icons);
      const currrentWeatherSection = document.querySelector("#current-weather");
      if (currrentWeatherSection !== null) {
        currrentWeatherSection.replaceWith(weatherSection);
      } else document.body.appendChild(weatherSection);
    });
};

displayWeather("Houston");
