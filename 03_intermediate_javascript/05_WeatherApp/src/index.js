import Favicon from "./modules/Favicon";
import Footer from "./modules/Footer";
import SearchBar from "./modules/SearchBar";
import { showLoading, displayWeather, loadSearchResult } from "./modules/DOM";
import { getCoordinates } from "./modules/services";

require("./modules/Styles/style.css");

document.head.appendChild(Favicon(require("./images/weather.png")));

document.body.appendChild(SearchBar(require("./images/search.png")));

document.body.appendChild(
  Footer(
    "https://github.com/sophie3101/the_odin_project/tree/main/03_intermediate_javascript/05_WeatherApp"
  )
);

//get current location, if cannot default is Austin
const options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  displayWeather({ lat: `${crd.latitude}`, lon: `${crd.longitude}` });
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  displayWeather({ lat: 30.2711286, lon: -97.7436995 });
}

navigator.geolocation.getCurrentPosition(success, error, options);

document.querySelector(".searchButton").onclick = (e) => {
  e.preventDefault();
  const searchCityName = document.querySelector(".searchTerm").value;
  if (searchCityName.length !== 0) {
    try {
      getCoordinates(searchCityName)
        .then((data) => {
          console.log(data);
          loadSearchResult(data);
        })
        .then(() => {
          document.querySelectorAll(".result").forEach(
            (resultLink) =>
              (resultLink.onclick = (e) => {
                e.preventDefault();
                const coordinate = {
                  lat: e.target.dataset.lat,
                  lon: e.target.dataset.lon,
                };
                displayWeather(coordinate);
              })
          );
        });
    } catch {
      console.error("ERROR");
    }
  }
};

// switch temperature
document.querySelector("#togBtn").onchange = (e) => {
  // false: F, uncheck, and Celsius is checked
  console.log(e.target.checked);
  const temps = Array.from(document.querySelectorAll(".temp"));
  if (temps.length !== 0) {
    temps.forEach((element) => {
      const temp = element.innerHTML.slice(0, -1);
      if (e.target.checked) {
        // convert from F to C
        const convertedTemp = ((temp - 32) * 5) / 9;
        element.innerHTML = `${convertedTemp.toFixed(2)} &#8451`;
      } else {
        console.log(element, element.dataset);
        element.innerHTML = `${element.dataset.tempf} &#8457`;
      }
    });
  }
};
