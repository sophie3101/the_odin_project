import Favicon from "./Favicon";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import WeatherDisplay from "./WeatherDisplay";

require("./style.css");

const defaultCity = "Houston";
document.head.appendChild(Favicon(require("./images/weather.png")));

document.body.appendChild(SearchBar(require("./images/search.png")));

document.body.appendChild(WeatherDisplay());

document.body.appendChild(
  Footer(
    "https://github.com/sophie3101/the_odin_project/tree/main/03_intermediate_javascript/05_WeatherApp"
  )
);
