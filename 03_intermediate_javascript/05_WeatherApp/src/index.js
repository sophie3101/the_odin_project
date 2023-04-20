import Favicon from "./modules/Favicon";
import Footer from "./modules/Footer";
import SearchBar from "./modules/SearchBar";
import WeatherDisplay from "./modules/WeatherDisplay";
import { getCoordinates, getWeatherData } from "./modules/services";

require("./style.css");

document.head.appendChild(Favicon(require("./images/weather.png")));

document.body.appendChild(SearchBar(require("./images/search.png")));

document.body.appendChild(WeatherDisplay());

document.body.appendChild(
  Footer(
    "https://github.com/sophie3101/the_odin_project/tree/main/03_intermediate_javascript/05_WeatherApp"
  )
);

getCoordinates("Houston")
  .then((coordinate) => getWeatherData(coordinate))
  .then((data) => console.log(data));
