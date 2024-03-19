import { getLocationInfo } from './getLocation';
import './style.css'
import typescriptLogo from './typescript.svg'
import { LocationInfo } from "/Users/caesber/Documents/repos/weatherapp/weatherapp/location.ts";
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

// let inputField = document.querySelector<HTMLInputElement>('#inputField')?.value!;
// inputField = inputField.trim().toLowerCase();
// let locationInfo: LocationInfo;
// let locationName = inputField;



let div = document.createElement('div');

const submitButton = document.querySelector<HTMLButtonElement>('#submitButton')!; 
submitButton.addEventListener('click', async() => { 

let inputField = document.querySelector<HTMLInputElement>('#inputField')?.value! ?? 'Denver'; 
const locationName = inputField.trim().toLowerCase(); 
 
  const resolvedData = await getDisplayNameAndUnits(locationName); 
  const { displayName, units } = resolvedData; // destructuring the resolvedData object

  // window.open('', '_blank'); 
  div.textContent = `Location: ${displayName}, Temperature: ${units}`; 
  document.body.appendChild(div); 

})

async function getDisplayNameAndUnits(location: string): Promise<{displayName: string, units: string}> {

  try {
    
      const locationInfo = await getLocationInfo(location);
    
      const { display_name, lat, lon } = locationInfo;
      const temperatureData = await fetchWeatherData(lat, lon);
      console.log(temperatureData)
      const { current_weather: { temperature }  } = temperatureData;
     const units = temperatureData.current_weather_units.temperature;

      return { displayName: display_name, units: `${temperature} ${units}`};
  } catch (error) {
      console.error(error);
      throw new Error('Error retrieving weather data');
  }
}
// getDisplayNameAndUnits().catch((err) => console.error(err));


// Homework: 2/29/24
// create a function for lines 49-51 that will bring back display name and temperature units
// create a function for lines 54-57  
// this will enable clearing data after each entry