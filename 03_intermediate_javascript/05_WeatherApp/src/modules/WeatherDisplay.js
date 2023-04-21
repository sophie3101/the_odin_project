require("./Styles/weather.css");

const WeatherDisplay = (curWeather, icons) => {
  //weather is an object
  const section = document.createElement("section");
  section.id = "current-weather";
  section.appendChild(CurrentWeatherHeader(curWeather));
  section.insertAdjacentHTML("beforeend", CurrentWeatherTemp(curWeather));
  section.insertAdjacentHTML(
    "beforeend",
    CurrentWeatherInfo(curWeather, icons)
  );
  return section;
};

const CurrentWeatherHeader = (weather) => {
  const header = document.createElement("div");
  header.classList.add("weather-header", "flex-col");
  header.innerHTML = `
  <div class="city-name">${weather.cityName} </div>
  <div class="date">${weather.date} </div>
  </div>`;
  //   header.innerHTML = `
  //   <div class="title flex-col">
  //     <div class="city-name">${weather.cityName} </div>
  //     <div class="date">${weather.date} </div>
  //   </div>

  //   <label class="switch">
  //     <input type="checkbox" id="togBtn">
  //     <div class="slider round"></div>
  //   </label>
  //  `;

  return header;
};

const CurrentWeatherTemp = (weather) => {
  const div = ` <div class="weather-status flex-row">
  <div class='img-container'>
    <img class="weather-icon"
    src="https://openweathermap.org/img/wn/${weather.icon}@2x.png"
    />  
  </div>
  <div class="weather-temp flex-col">
    <div class="temp current-temp" data-tempf="${weather.temp}">${weather.temp} &#8457</div>
    <div class='condition'>${weather.weatherDesr}</div>
  </div>
</div>`;
  return div;
};

const CurrentWeatherInfo = (weather, icons) => {
  const div = `  
  <div class="weather-info flex-col">
    <div id="weather-low" class="flex-col">
      <div class="icon-container">
        <img src="${icons.lowTemp}" alt="highTemp">
      </div>
      <p class="info-r1 temp" data-tempf="${weather.tempMin}">${weather.tempMin} &#8457</p>      
      <p class="info-r2">Low</p>
    </div>

    <div id="wind-speed" class="flex-col">
      <div class="icon-container">
        <img src="${icons.wind}" alt="highTemp">
      </div>
      <p class="info-r1">${weather.windSpeed}mph</p>
      <p class="info-r2">Wind</p>
    </div>  

    <div id="sunrise" class="flex-col">
      <div class="icon-container">
        <img src="${icons.sunrise}" alt="highTemp">
      </div>
      <p class="info-r1">${weather.sunrise}</p>
      <p class="info-r2">Sunrise</p>
    </div>

    <div id="weather-high" class="flex-col">
      <div class="icon-container">
        <img src="${icons.highTemp}" alt="highTemp">
      </div>
      <p class="info-r1 temp" data-tempf="${weather.tempMax}">${weather.tempMax} &#8457</p>     
      <p class="info-r2">High</p>
    </div>

    <div id="humidity" class="flex-col">
      <div class="icon-container">
        <img src="${icons.humidity}" alt="highTemp">
      </div> 
      <p class="info-r1">${weather.humidity}</p>
      <p class="info-r2">Humidity</p>
    </div>

    <div id="sunset" class="flex-col">
      <div class="icon-container">
        <img src="${icons.sunset}" alt="highTemp">
      </div> 
      <p class="info-r1"> ${weather.sunset}</p>
      <p class="info-r2">Sunset</p>
    </div>

  </div>`;
  return div;
};

const CurrentWeatherByHour = () => {};

const ForcastWeather = () => {};

export default WeatherDisplay;
