import APP_API from "./env";

// FUNCTIONS
export const getCoordinates = async (cityName) => {
  const link = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=${APP_API}`;
  // console.log(link);
  const response = await fetch(link); //.then((data) => console.log(data));
  const data = await response.json();

  return data;
};

export const getWeatherData = async ({ lat, lon }) => {
  const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APP_API}`;
  // console.log(link);
  const response = await fetch(link);
  const data = await response.json();

  return data;
};

export const getForcastData = async ({ lat, lon }) => {
  const link = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APP_API}`;
  // console.log(link);
  const response = await fetch(link);
  const data = await response.json();

  return data;
};
