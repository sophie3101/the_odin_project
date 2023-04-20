const WeatherDisplay = () => {
  const section = document.createElement("section");
  section.id = "weather-display";
  const currentWeatherDiv = CurrentWeather(22, "Houston", "10d");
  section.appendChild(currentWeatherDiv);
  return section;
};

const CardTemplate = (fn) => {
  const container = document.createElement("div");
  container.classList.add("card", "current-weather");
  const div = fn();
  container.appendChild(div);
  return container;
};

const CurrentWeather = (temp, location, weatherIcon) => {
  const container = document.createElement("div");
  container.classList.add("card", "current-weather");

  const div = document.createElement("div");
  div.classList.add("card-inner");
  div.innerHTML = `
  <div class="col-6">
    <div class="temp">${temp}&deg;</div>
    <div class="location">${location}</div>
  </div>
  <div >
    <img class="weather-icon"
      src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"
    />
  </div>
  `;
  container.appendChild(div);
  return container;
};

const CurrentWeatherByHour = () => {};

const ForcastWeather = () => {};

export default WeatherDisplay;
