const Weather = (data) => {
  const lon = data.coord.lon;
  const lat = data.coord.lat;
  const cityName = `${data.name}, ${data.sys.country}`;
  const weatherData = data.weather[0];
  const icon = weatherData.icon;
  const weatherDesr = weatherData.description;
  const temp = KtoF(data.main.temp);
  const tempFeelLike = data.main.feels_like;
  const humidity = data.main.humidity;
  const tempMin = KtoF(data.main.temp_min);
  const tempMax = KtoF(data.main.temp_max);
  const pressure = data.main.pressure;
  const windSpeed = data.wind.speed;

  const sunrise = new Date(data.sys.sunrise * 1000)
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .slice(0, 5);
  const sunset = new Date(data.sys.sunset * 1000)
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    })
    .slice(0, 5);
  const date = new Date(data.dt * 1000).toDateString(); //new Date().toISOString().slice(0, 10);
  return {
    date,
    cityName,
    lon,
    lat,
    icon,
    weatherDesr,
    temp,
    tempFeelLike,
    tempMin,
    tempMax,
    humidity,
    pressure,
    windSpeed,
    sunrise,
    sunset,
  };
};

const KtoF = (temp) => {
  return ((temp - 273.15) * (9 / 5) + 32).toFixed(2);
};

export default Weather;
