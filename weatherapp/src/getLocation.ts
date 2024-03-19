// The getLocationInfo function is responsible for fetching location data

import { fetchLocationData } from "./location";
const GEOCODE_API_URL = "https://geocode.maps.co/search";
import { LocationInfo } from "./location";


// create a function to get location information
// this function will make a request to the geocode API
// it will return the location information as a LocationInfo object
// if there is an error, it will return a number

export async function getLocationInfo(location: string): Promise<LocationInfo | number | any> {  
    try {
      const locationInfo = await fetchLocationData(GEOCODE_API_URL, location);
   
      return locationInfo;
    } catch (err) {
      console.error(err);
      return 1;
    }
  }


  // create function to transform location data into a location object that matches LocationInfo
  // create test by mocking fetchLocationData function
  // this should return a location object that matches LocationInfo 

  // stretch goal: create an end to end test (using cypress) that would test the entire process of the app from entering a location to displaying the weather forecast



