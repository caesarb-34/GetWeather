import { getLocationInfo } from './getLocation';
import './style.css'
import typescriptLogo from './typescript.svg'
import { LocationInfo } from "./location";
import { checkLocationDataOrThrow } from "/Users/caesber/Documents/repos/weatherapp/weatherapp/src/transformLocation.ts";
import { fetchWeatherData } from './weatherData';


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <img src="${typescriptLogo}" alt="TypeScript logo" />
    <h1>Weather App</h1>
    <p class="read-the-docs">
      Enter a city name to get the weather forecast
    </p>
    <div class="card">
      <input id="inputField" type="text" placeholder="Enter city name" />
      <button id="submitButton" type="button">Submit</button>
    </div>
  </div>

  
`



// create a function to handle the main logic of the app
// this function will be called when the page loads
// it will add an event listener to the submit button
// when the submit button is clicked, it will get the value of the input field

// Homework: 2/22/24
// add error logic e.g. if not able to retrieve weather data, display error message (see weatherData.ts for example that uses try/catch block)
// break this out into own module (see weatherData.ts for example that uses try/catch block)
// return data and clear / replace previous data



async function main(): Promise<number | void> {
  const submitButton = document.querySelector<HTMLButtonElement>('#submitButton')!;
  submitButton.addEventListener('click', async () => {
    let inputField = document.querySelector<HTMLInputElement>('#inputField')?.value!;
    inputField = inputField.trim().toLowerCase();

    let locationInfo: LocationInfo;
    let location = inputField;

    try {
      locationInfo = await getLocationInfo(location);
      const { lat, lon, display_name } = checkLocationDataOrThrow(locationInfo);
      const temperatureData = await fetchWeatherData(lat, lon);
      console.log(temperatureData.current_weather);

      let div = document.createElement('div');
      div.textContent = `Location: ${display_name}, Temperature: ${temperatureData.current_weather.temperature}, ${temperatureData.current_weather_units.temperature}`;
      document.body.appendChild(div);
      return locationInfo;
    } catch (error) {
      console.error(error);
      let errorDiv = document.createElement('div');
      errorDiv.textContent = 'Error retrieving weather data';
      document.body.appendChild(errorDiv);
    }
  });
}

main().catch((err) => console.error(err));


// Homework: 2/29/24
// create a function for lines 49-51 that will bring back display name and temperature units
// create a function for lines 54-57  
// this will enable clearing data after each entry