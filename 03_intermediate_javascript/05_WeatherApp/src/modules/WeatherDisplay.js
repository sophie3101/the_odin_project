require("./Styles/weather.css");

const WeatherDisplay = (curWeather, icons) => {
  //weather is an object
  const section = document.createElement("section");
  section.id = "current-weather";
  // const currentWeatherDiv = CurrentWeather(curWeather);
  // section.appendChild(currentWeatherDiv);
  // const currentWeatherCard = CurrentWeather(curWeather);
  // section.appendChild(currentWeatherCard);

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
  header.classList.add("title", "flex-col");
  header.innerHTML = `
  <div class="city-name">${weather.cityName} </div>
  <div class="date">${weather.date} </div>
  </div>`;

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
    <div class="temp">${weather.temp}&deg;</div>
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
      <p class="info-r1">${weather.tempMin}&deg;</p>      
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
      <p class="info-r1">${weather.tempMax}&deg;</p>     
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

const CurrentWeather = (weather) => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "current-weather", "flex-col");
  cardDiv.innerHTML = `  <div class="title flex-row">
  <h3>Current Weather </h3>
  <label for="">C or F</label>
</div>`;

  const div = document.createElement("div");
  div.classList.add("card-inner", "flex-row");
  div.innerHTML = `
  <div class="weather-status flex-col">
    <h3>${weather.cityName}</h3>
    <div class="flex-row">
      <img class="weather-icon"
        src="https://openweathermap.org/img/wn/${weather.icon}@2x.png"
      />
      <div class="temp">${weather.temp}&deg;</div>
    </div>
    <div class='condition'>${weather.weatherDesr}</div>
  </div>

  <div class="weather-info flex-col">
    <div id="weather-feellike">${weather.tempFeelLike}</div>
    <div id="weather-low-high">
      <p id="temp-high">${weather.tempMax}</p>
      <p id="temp-low">${weather.tempMin}</p>
    </div>
    <div id="humidity">${weather.humidity}</div>
    <div id="wind-speed">${weather.windSpeed}</div>
    <div id="pressure">${weather.pressure}</div>
  </div>
  `;
  cardDiv.appendChild(div);
  return cardDiv;
};

const CurrentWeatherByHour = () => {};

const ForcastWeather = () => {};

export default WeatherDisplay;
