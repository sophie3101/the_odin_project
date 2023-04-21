import Weather from "./Weather";
import WeatherDisplay from "./WeatherDisplay";
import { getWeatherData } from "./services";

const icons = {
  highTemp: require("../images/high-temperature.png"),
  lowTemp: require("../images/low-temperature.png"),
  sunset: require("../images/sunset.png"),
  sunrise: require("../images/sunrise.png"),
  wind: require("../images/wind.png"),
  humidity: require("../images/humidity.png"),
};

export const showLoading = () => {
  const spin = document.createElement("div");
  spin.id = "loading";
  document.querySelector("#search-section").appendChild(spin);
  return spin;
};

export const displayWeather = (coordinate) => {
  try {
    const currrentWeatherSection = document.querySelector("#current-weather");
    if (currrentWeatherSection !== null) {
      currrentWeatherSection.classList.add("hide");
      document.querySelector(".result-dropdown").classList.add("hide");
      const spin = showLoading();
      setTimeout(() => {
        getWeatherData(coordinate)
          .then((data) => {
            // console.log(data);
            const weatherObj = Weather(data);
            const weatherSection = WeatherDisplay(weatherObj, icons);
            currrentWeatherSection.replaceWith(weatherSection);
          })
          .then(() => spin.remove());
      }, 1000);
    } else {
      // for initial loading
      getWeatherData(coordinate).then((data) => {
        // console.log(data);
        const weatherObj = Weather(data);
        const weatherSection = WeatherDisplay(weatherObj, icons);
        document.body.appendChild(weatherSection);
      });
    }
  } catch {
    console.error("ERROR in display weather");
  }
};

export const displayWeather_deprecated = (coordinate) => {
  try {
    const currrentWeatherSection = document.querySelector("#current-weather");

    getWeatherData(coordinate).then((data) => {
      // console.log(data);
      const weatherObj = Weather(data);
      const weatherSection = WeatherDisplay(weatherObj, icons);
      const currrentWeatherSection = document.querySelector("#current-weather");
      if (currrentWeatherSection !== null) {
        currrentWeatherSection.replaceWith(weatherSection);
      } else document.body.appendChild(weatherSection);
    });
  } catch {
    console.error("ERROR in display weather");
  }
};

export const loadSearchResult = (data) => {
  const resultsDiv = document.querySelector(".result-dropdown");

  if (data.length == 0) {
    resultsDiv.classList.add("error");
    resultsDiv.innerHTML = `No results`;
    return;
  }
  resultsDiv.classList.remove("hide");
  resultsDiv.innerHTML = "";
  data.forEach((res) => {
    const state = res.state !== undefined ? `, ${res.state}` : "";
    const oneResult = `
    <a href="#" class="result" data-lat="${res.lat}" data-lon="${res.lon}">
      ${res.name} ${state}, ${res.country}
    </a>`;
    resultsDiv.insertAdjacentHTML("beforeend", oneResult);
  });
};
