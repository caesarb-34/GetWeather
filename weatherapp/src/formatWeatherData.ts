
export const formatWeatherData = (weatherData) => {
  const { display_name, temperature, temperatureUnits } = weatherData;
  return    `Location: ${display_name}, Temperature: ${temperature}, ${temperatureUnits}`;      
}